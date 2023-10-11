import { auth } from "@/firebase/config";
import { User, signInWithEmailAndPassword } from "firebase/auth";

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
