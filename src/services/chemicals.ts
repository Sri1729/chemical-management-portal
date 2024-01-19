import { db } from "@/firebase";
import { v4 as uuidv4 } from "uuid";
import {
  Chemical,
  AddStoreChemicalRequest,
  ChemicalResponseLog,
  ChemicalLogUI,
  UpdateActions,
  UpdateStoreChemicalRequest,
  Batch,
} from "@/types";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  arrayUnion,
  onSnapshot,
  query,
  getDoc,
  updateDoc,
} from "firebase/firestore";

export const addStoreChemical = async ({
  name,
  quantity,
  timestamp,
  action,
  units,
  expDate,
  mfgDate,
  cost,
}: AddStoreChemicalRequest) => {
  // Get the collection reference for chemicals
  const chemicalsCollection = collection(db, "storeChemicals");

  // Add a new document with an auto-generated ID
  await addDoc(chemicalsCollection, {
    name: name,
    units: units,
    batches: [
      {
        batchNo: 1,
        initialQuantity: quantity,
        quantity: quantity,
        ...(expDate !== undefined && { expiryDate: expDate }),
        manufacturingDate: mfgDate,
        cost: cost,
        logs: [
          {
            timestamp: timestamp,
            action: action,
            quantity: quantity,
          },
        ],
      },
    ],
  });
};

export const getRealTimeUpdates = (setData: (data: Chemical[]) => void) => {
  const unsubscribe = onSnapshot(
    query(collection(db, "storeChemicals")),
    (snapshot) => {
      const newData = snapshot.docs.map((doc) => {
        const values = doc.data();
        return {
          id: doc.id,
          name: values?.name,
          units: values?.units,
          quantity: getOverallQuantity(values?.batches),
          batches: processBatches(values?.batches),
          overallCost: getOverallCost(values?.batches),
        };
      });

      setData(newData);
    },
    (error) => {
      console.log("Error getting documents:", error);
    }
  );

  return unsubscribe;
};
const getOverallQuantity = (batches: any[]) => {
  let sum = 0;
  batches?.forEach((batch) => {
    sum += parseInt(batch?.quantity);
  });
  return `${sum}`;
};

const getOverallCost = (batches: any[]) => {
  let sum = 0;
  batches?.forEach((batch) => {
    sum += parseInt(batch?.cost);
  });
  return `${sum}`;
};
// Process batches for a single chemical
const processBatches = (batches: any[]): Batch[] => {
  return batches?.map((batch) => {
    return {
      quantity: batch.quantity,
      initialQuantity: batch.initialQuantity,
      units: batch.units,
      cost: batch.cost,
      manufacturingDate: new Date(
        batch?.manufacturingDate?.seconds * 1000
      ).toLocaleDateString("en-GB"),
      expiryDate: batch?.expiryDate
        ? new Date(batch?.expiryDate?.seconds * 1000).toLocaleDateString(
            "en-GB"
          )
        : undefined,
      logs: processLogs(batch.logs),
    };
  });
};

export const processLogs = (logs: ChemicalResponseLog[]): ChemicalLogUI[] => {
  return logs?.map((item) => {
    const date = new Date(item?.timestamp.seconds * 1000); // Convert Firebase timestamp to JavaScript Date object

    const formattedDate = date.toLocaleDateString("en-GB"); // Get date (e.g., "MM/DD/YYYY")
    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }); // Get time (e.g., "HH:MM:SS AM/PM")

    return {
      action: item?.action,
      quantity: item?.quantity,
      date: formattedDate,
      time: formattedTime,
      lab: item?.lab,
    };
  });
};

export const updateStoreChemicals = async ({
  action,
  id,
  quantity,
  remainingQuantity,
  timestamp,
  lab,
  name,
  cost,
  mfgDate,
  expDate,
  batchId,
  units,
}: UpdateStoreChemicalRequest) => {
  const docRef = await doc(db, "storeChemicals", id);
  const data = (await getDoc(docRef)).data();

  const uuidKey = uuidv4();
  const log =
    action === UpdateActions.ADD
      ? {
          id: uuidKey,
          timestamp: timestamp,
          action: action,
          quantity: quantity,
        }
      : {
          id: uuidKey,
          timestamp: timestamp,
          action: action,
          quantity: quantity,
          lab: lab?.name,
        };

  if (action === UpdateActions.ADD) {
    const batch = {
      batchNo: data?.batches?.length + 1,
      initialQuantity: quantity,
      quantity: quantity,
      manufacturingDate: mfgDate,
      cost: cost,
      ...(expDate !== undefined && { expiryDate: expDate }),
      logs: [log],
    };
    await setDoc(
      docRef,
      {
        batches: arrayUnion(batch),
      },
      { merge: true }
    );
  }
  if (action === UpdateActions.DELETE) {
    const updatedBatches = [...data?.batches];
    if (batchId) {
      const selectedBatch = updatedBatches?.[parseInt(batchId)];
      selectedBatch.logs = [...selectedBatch.logs, log];
      selectedBatch.quantity = `${
        parseInt(selectedBatch.quantity) - parseInt(quantity)
      }`;
      updatedBatches[parseInt(batchId)] = selectedBatch;
      await setDoc(docRef, { batches: updatedBatches }, { merge: true });
    }
  }

  // add this to the labChemicals
  if (action === UpdateActions.DELETE) {
    // Get doc ref
    const labRef = doc(db, "labChemicals", lab?.id || "", "chemicals", id);
    const docSnap = await getDoc(labRef);
    const actualBatch = data?.batches?.[parseInt(batchId || "0")];
    const actualBatchCost = actualBatch?.cost;
    const actualBatchInitialQuantity = actualBatch?.initialQuantity;

    // check if we have the chemical
    if (docSnap.exists() && docSnap.data()) {
      const existingData = docSnap.data();

      // Check if the batch number exists, if yes we append to the logs
      if (existingData?.batches) {
        const existingBatchIndex = existingData.batches.findIndex(
          (batch: any) => batch.batchNo === `${parseInt(batchId || "0") + 1}`
        );

        if (existingBatchIndex !== -1) {
          // Batch with the given batch number already exists, add log to that batch
          const updatedBatches = [...existingData.batches];
          const selectedBatch = { ...updatedBatches[existingBatchIndex] };

          // append logs
          selectedBatch.logs = [
            ...selectedBatch.logs,
            {
              id: uuidKey,
              timestamp: timestamp,
              action: UpdateActions.ADD,
              quantity: quantity,
            },
          ];

          // update quantity
          selectedBatch.quantity = `${
            parseInt(selectedBatch.quantity) + parseInt(quantity)
          }`;

          // update cost
          selectedBatch.cost = `${
            parseFloat(selectedBatch.cost) +
            (parseFloat(actualBatchCost) * parseFloat(quantity)) /
              parseFloat(actualBatchInitialQuantity)
          }`;

          updatedBatches[existingBatchIndex] = selectedBatch;

          // update doc
          await updateDoc(labRef, {
            batches: updatedBatches,
          });
        } else {
          // Batch with the given batch number does not exist, create a new batch
          const newBatch = {
            batchNo: `${parseInt(batchId || "0") + 1}`,
            quantity: quantity,
            manufacturingDate: actualBatch?.manufacturingDate,
            cost: `${
              (parseFloat(actualBatchCost) * parseFloat(quantity)) /
              parseFloat(actualBatchInitialQuantity)
            }`,
            ...(actualBatch?.expiryDate !== undefined && {
              expiryDate: actualBatch?.expiryDate,
            }),
            logs: [
              {
                id: uuidKey,
                timestamp: timestamp,
                action: UpdateActions.ADD,
                quantity: quantity,
              },
            ],
          };

          // update the doc
          await updateDoc(labRef, {
            batches: arrayUnion(newBatch),
          });
        }
      }
    } else {
      // if no collection or doc, create one
      const newBatch = {
        batchNo: `${parseInt(batchId || "0") + 1}`,
        quantity: quantity,
        manufacturingDate: actualBatch?.manufacturingDate,
        cost: `${
          (parseFloat(actualBatchCost) * parseFloat(quantity)) /
          parseFloat(actualBatchInitialQuantity)
        }`,
        ...(actualBatch?.expiryDate !== undefined && {
          expiryDate: actualBatch?.expiryDate,
        }),
        logs: [
          {
            id: uuidKey,
            timestamp: timestamp,
            action: UpdateActions.ADD,
            quantity: quantity,
          },
        ],
      };
      // set the doc
      await setDoc(labRef, {
        name: name,
        units: units,
        batches: [newBatch],
      });
    }
  }
};
