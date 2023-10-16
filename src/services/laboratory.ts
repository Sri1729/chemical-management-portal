import { db } from "@/firebase";
import { Chemical, CreateLab, Laboratory } from "@/types";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";
import { processLogs } from ".";

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
  const unsubscribe = onSnapshot(
    doc(db, "labChemicals", id),
    (snapshot) => {
      const values = snapshot.data();
      const logs = values?.chemicals;
      // TODO
      logs.map((item: any) => ({
        id: item?.id,
        name: item?.name,
        formula: item?.formula,
        quantity: item?.quantity,
        logs: processLogs(item?.logs),
      }));
      setData(logs);
    },
    (error) => {
      console.log("Error getting documents:", error);
    }
  );
  return unsubscribe;
};
