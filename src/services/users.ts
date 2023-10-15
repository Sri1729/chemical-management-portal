import { db } from "@/firebase";
import { collection, doc, getDoc } from "firebase/firestore";

export const isSuperUser = async (id: string) => {
  try {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch {}
};
