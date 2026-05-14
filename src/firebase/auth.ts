import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  getAuth,
} from "firebase/auth";
import { getFirebaseApp } from "./config";

const getAuthInstance = () => getAuth(getFirebaseApp());

export const loginWithEmail = async (email: string, password: string) => {
  return signInWithEmailAndPassword(getAuthInstance(), email, password);
};

export const logout = async () => {
  return signOut(getAuthInstance());
};

export const onAuthChange = (callback: (user: any) => void) => {
  return onAuthStateChanged(getAuthInstance(), callback);
};

export const changePassword = async (
  currentPassword: string,
  newPassword: string
) => {
  const user = getAuthInstance().currentUser;
  if (!user || !user.email) throw new Error("No authenticated user");

  const credential = EmailAuthProvider.credential(user.email, currentPassword);
  await reauthenticateWithCredential(user, credential);
  await updatePassword(user, newPassword);
};
