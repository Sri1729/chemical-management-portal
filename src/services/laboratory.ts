import { db } from "@/firebase";
import {
  Batch,
  Chemical,
  CreateLab,
  LabDetails,
  Laboratory,
  UpdateActions,
  updateIndividualLabChemicalRequest,
} from "@/types";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { processLogs } from ".";
import { v4 as uuidv4 } from "uuid";

export const getRealTimeLabUpdates = (
  setData: (data: Laboratory[]) => void
) => {
  const unsubscribe = onSnapshot(
    query(collection(db, "laboratories")),
    (snapshot) => {
      const newData = snapshot.docs.map((doc) => {
        const values = doc.data();
        return {
          id: values.id,
          name: values.name,
          roomNumber: values.roomNumber,
          createdBy: values.createdBy,
          createdAt: values.createdAt,
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

export const createLaboratory = async ({
  id,
  name,
  roomNumber,
  createdBy,
  createdAtTime,
  createdAtDate,
}: CreateLab) => {
  const ref = await addDoc(collection(db, "laboratories"), {
    id: id,
    name: name,
    roomNumber: roomNumber,
    createdBy: createdBy,
    createdAt: new Date(`${createdAtDate}T${createdAtTime}`),
  });
  // Create a labStore
  await setDoc(doc(db, "labChemicals", id), {});
};

export const getAllLaboratory = async (): Promise<Laboratory[]> => {
  const querySnapshot = await getDocs(collection(db, "laboratories"));
  const arr: Laboratory[] = [];
  querySnapshot.forEach((doc) => {
    const values = doc.data();
    arr.push({
      id: values.id,
      name: values.name,
      roomNumber: values.roomNumber,
      createdBy: values.createdBy,
      createdAt: values.createdAt,
    });
  });
  return arr;
};

// Individual labs
export const getRealTimeIndividualLabUpdates = (
  id: string,
  setData: (data: Chemical[]) => void
) => {
  const chemicalsRef = collection(db, "labChemicals", id, "chemicals");
  const unsubscribe = onSnapshot(
    chemicalsRef,
    (snapshot) => {
      const newData = snapshot?.docs.map((doc) => {
        const values = doc.data();
        return {
          id: doc.id,
          name: values?.name,
          units: values?.units,
          quantity: getOverallQuantity(values?.batches),
          batches: processBatches(values?.batches),
          overallCost: parseFloat(getOverallCost(values?.batches)).toFixed(2),
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

export const getOverallCost = (batches: any[]) => {
  let sum = 0;
  batches?.forEach((batch) => {
    sum += parseFloat(batch?.cost);
  });
  return `${sum}`;
};

export const getOverallQuantity = (batches: any[]) => {
  let sum = 0;
  batches?.forEach((batch) => {
    sum += parseInt(batch?.quantity);
  });
  return `${sum}`;
};

export const processBatches = (batches: any[]): Batch[] => {
  return batches?.map((batch) => {
    return {
      quantity: batch.quantity,
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
      initialQuantity: batch?.initialQuantity,
    };
  });
};

export const getIndividualLabDetails = async (
  id: string
): Promise<LabDetails | null> => {
  const labRef = query(collection(db, "laboratories"), where("id", "==", id));
  const labSnaps = await getDocs(labRef);
  const arr: LabDetails[] = [];
  labSnaps.forEach((snap) => {
    const lab = snap.data();
    arr.push({
      id: lab.id,
      name: lab.name,
      createdBy: lab.createdBy,
      createdAt: new Date(lab?.createdAt?.seconds * 1000).toLocaleString(),
    });
  });
  return arr?.[0];
};

export const updateIndividualLabChemical = async ({
  lab,
  id,
  quantity,
  timestamp,
  batchId,
}: updateIndividualLabChemicalRequest) => {
  const labRef = doc(db, "labChemicals", lab || "", "chemicals", id);
  const docSnap = await getDoc(labRef);
  const uuidKey = uuidv4();
  if (docSnap?.exists()) {
    const existingData = docSnap.data();
    if (existingData?.batches) {
      const existingBatchIndex = existingData.batches.findIndex(
        (batch: any) => batch.batchNo === `${parseInt(batchId || "0") + 1}`
      );

      if (existingBatchIndex !== -1) {
        const updatedBatches = [...existingData.batches];
        const selectedBatch = { ...updatedBatches[existingBatchIndex] };
        selectedBatch.logs = [
          ...selectedBatch.logs,
          {
            id: uuidKey,
            timestamp: timestamp,
            action: UpdateActions.DELETE,
            quantity: quantity,
          },
        ];

        selectedBatch.quantity = `${
          parseInt(selectedBatch.quantity) - parseInt(quantity)
        }`;

        updatedBatches[existingBatchIndex] = selectedBatch;

        await updateDoc(labRef, { batches: updatedBatches });
      }
    }
  }
};
