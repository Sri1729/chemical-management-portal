import { db } from "@/firebase";
import {
  Chemical,
  AddStoreChemicalRequest,
  ChemicalResponseLog,
  ChemicalLogUI,
  UpdateActions,
  UpdateStoreChemicalRequest,
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
} from "firebase/firestore";

export const addStoreChemical = async ({
  name,
  formula,
  quantity,
  timestamp,
  action,
}: AddStoreChemicalRequest) => {
  await addDoc(collection(db, "storeChemicals"), {
    name: name,
    formula: formula,
    quantity: quantity,
    logs: [
      {
        timestamp: timestamp,
        action: action,
        quantity: quantity,
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

const processLogs = (logs: ChemicalResponseLog[]): ChemicalLogUI[] => {
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
}: UpdateStoreChemicalRequest) => {
  const docRef = await doc(db, "storeChemicals", id);

  const log =
    action === UpdateActions.ADD
      ? {
          timestamp: timestamp,
          action: action,
          quantity: quantity,
        }
      : {
          timestamp: timestamp,
          action: action,
          quantity: quantity,
          lab: lab,
        };
  await setDoc(
    docRef,
    {
      quantity: remainingQuantity,
      logs: arrayUnion(log),
    },
    { merge: true }
  );
};
