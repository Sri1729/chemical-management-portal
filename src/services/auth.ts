import { auth, authWorkerAuth } from "@/firebase";
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const signIn = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const credentialUser = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return credentialUser?.user;
  } catch (error) {
    throw error;
  }
};

export const createUserSignIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<User> => {
  const user = await createUserWithEmailAndPassword(
    authWorkerAuth,
    email,
    password
  );
  return user.user;
};

export const userSignOut = async () => {
  await signOut(auth);
};
