import { auth } from "@/firebase";
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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
  const user = await createUserWithEmailAndPassword(auth, email, password);
  return user.user;
};
