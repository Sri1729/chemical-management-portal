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
  console.log("chemicals adding", {
    name,
    quantity,
    timestamp,
    action,
    units,
    expDate,
    mfgDate,
    cost,
  });
  // Get the collection reference for chemicals
  const chemicalsCollection = collection(db, "storeChemicals");

  // Add a new document with an auto-generated ID
  await addDoc(chemicalsCollection, {
    name: name,
    units: units,
    batches: [
      {
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
          batches: processBatches(values?.batches),
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

// Process batches for a single chemical
export const processBatches = (batches: any[]): Batch[] => {
  return batches?.map((batch) => {
    return {
      quantity: batch.quantity,
      units: batch.units,
      cost: batch.cost,
      manufacturingDate: new Date(
        batch?.manufacturingDate?.seconds * 1000
      ).toLocaleDateString("en-GB"),
      expiryDate: new Date(
        batch?.expiryDate?.seconds * 1000
      ).toLocaleDateString("en-GB"),
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
}: UpdateStoreChemicalRequest) => {
  const docRef = await doc(db, "storeChemicals", id);
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

  const batch = {
    quantity: quantity,
    manufacturingDate: mfgDate,
    cost: cost,
    ...(expDate !== undefined && { expiryDate: expDate }),
    logs: [
      {
        id: uuidKey,
        timestamp: timestamp,
        action: action,
        quantity: quantity,
        ...(lab?.name && { lab: lab?.name }),
      },
    ],
  };
  console.log("batch", batch);
  await setDoc(
    docRef,
    {
      batches: arrayUnion(batch),
    },
    { merge: true }
  );

  // add this to the labChemicals
  if (action === UpdateActions.DELETE) {
    const labRef = doc(db, "labChemicals", lab?.id || "", "chemicals", id);
    const docSnap = await getDoc(labRef);
    if (docSnap.exists()) {
      // The document exists, increase the quantity and add a log
      await updateDoc(labRef, {
        quantity: `${Number(docSnap?.data()?.quantity) + Number(quantity)}`, // replace with your increment value
        logs: arrayUnion({
          id: uuidKey,
          timestamp: timestamp,
          action: UpdateActions.ADD,
          quantity: quantity,
        }),
      });
    } else {
      // The document does not exist, create a new document
      await setDoc(labRef, {
        name: name,
        quantity: quantity,
        logs: [
          {
            id: uuidKey,
            timestamp: timestamp,
            action: UpdateActions.ADD,
            quantity: quantity,
          },
        ],
      });
    }
  }
};
