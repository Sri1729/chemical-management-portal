import { db } from "@/firebase";
import { CreateLab, Laboratory } from "@/types";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";

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
  await addDoc(collection(db, "laboratories"), {
    id: id,
    name: name,
    roomNumber: roomNumber,
    createdBy: createdBy,
    createdAt: new Date(`${createdAtDate}T${createdAtTime}`),
  });
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
