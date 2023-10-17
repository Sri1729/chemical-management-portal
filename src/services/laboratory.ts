import { db } from "@/firebase";
import {
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
          formula: values?.formula,
          quantity: values?.quantity,
          logs: processLogs(values?.logs),
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
}: updateIndividualLabChemicalRequest) => {
  const labRef = doc(db, "labChemicals", lab || "", "chemicals", id);
  const docSnap = await getDoc(labRef);
  const uuidKey = uuidv4();
  if (docSnap?.exists()) {
    await updateDoc(labRef, {
      quantity: `${Number(docSnap?.data()?.quantity) - Number(quantity)}`, // replace with your increment value
      logs: arrayUnion({
        id: uuidKey,
        timestamp: timestamp,
        action: UpdateActions.DELETE,
        quantity: quantity,
      }),
    });
  }
};
