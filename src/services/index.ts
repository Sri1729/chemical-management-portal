import { db } from "@/firebase/config";
import {
  addDoc,
  collection,
  getFirestore,
  getDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";

export const addTodo = async () => {
  console.log("function called");
  try {
    console.log("inside try");
    const docRef = await addDoc(collection(db, "users"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getTodos = async () => {
  console.log("in the get call");
  const querySnapshot = await getDocs(collection(db, "users"));
  console.log(querySnapshot, "query");
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
};
