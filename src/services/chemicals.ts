import { db } from "@/firebase";
import { v4 as uuidv4 } from "uuid";
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
  getDoc,
  updateDoc,
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
  formula,
  name,
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

  await setDoc(
    docRef,
    {
      quantity: remainingQuantity,
      logs: arrayUnion(log),
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
        formula: formula,
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
