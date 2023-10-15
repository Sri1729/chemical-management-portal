import { db } from "@/firebase";
import { addStoreChemicalRequest } from "@/types";
import { collection, addDoc } from "firebase/firestore";

export const addStoreChemical = async ({
  name,
  formula,
  quantity,
  timestamp,
  action,
}: addStoreChemicalRequest) => {
  await addDoc(collection(db, "storeChemicals"), {
    name: name,
    formula: formula,
    quantity: quantity,
    logs: {
      timestamp: timestamp,
      action: action,
      quantity: quantity,
    },
  });
};
