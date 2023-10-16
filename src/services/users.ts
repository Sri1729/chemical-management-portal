import { db } from "@/firebase";
import { CreateUserReq, UserI } from "@/types";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";

export const isSuperUser = async (id: string) => {
  try {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch {}
};

export const getRealTimeUserUpdates = (setData: (data: UserI[]) => void) => {
  const unsubscribe = onSnapshot(
    query(collection(db, "users")),
    (snapshot) => {
      const newData = snapshot.docs.map((doc) => {
        const values = doc.data();
        return {
          id: doc.id,
          email: values?.email,
          isSuperUser: values?.isSuperUser,
          labAccess: values.labAccess,
          createdBy: values.createdBy,
          createdAt: new Date(values?.createdAt * 1000).toLocaleString(),
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

export const createUser = async ({
  email,
  labAccess,
  isSuperUser,
  createdBy,
  id,
}: CreateUserReq) => {
  await setDoc(doc(db, "users", id), {
    email,
    isSuperUser,
    labAccess,
    createdBy: createdBy,
    createdAt: new Date(),
  });
};
