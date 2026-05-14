import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  query,
  orderBy,
  serverTimestamp,
  onSnapshot,
  getFirestore,
} from "firebase/firestore";
import { getFirebaseApp } from "./config";

const getDb = () => getFirestore(getFirebaseApp());

export const getCollection = async (collectionName: string) => {
  const q = query(collection(getDb(), collectionName), orderBy("lastUpdated", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getDocument = async (collectionName: string, docId: string) => {
  const docRef = doc(getDb(), collectionName, docId);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as any;
};

export const setDocument = async (
  collectionName: string,
  docId: string,
  data: any
) => {
  const docRef = doc(getDb(), collectionName, docId);
  await setDoc(docRef, { ...data, lastUpdated: serverTimestamp() }, { merge: true });
};

export const addDocument = async (collectionName: string, data: any) => {
  const docRef = await addDoc(collection(getDb(), collectionName), {
    ...data,
    lastUpdated: serverTimestamp(),
  });
  return docRef.id;
};

export const updateDocument = async (
  collectionName: string,
  docId: string,
  data: any
) => {
  const docRef = doc(getDb(), collectionName, docId);
  await updateDoc(docRef, { ...data, lastUpdated: serverTimestamp() });
};

export const deleteDocument = async (collectionName: string, docId: string) => {
  await deleteDoc(doc(getDb(), collectionName, docId));
};

export const subscribeToCollection = (
  collectionName: string,
  callback: (data: any[]) => void
) => {
  const q = query(collection(getDb(), collectionName));
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  });
};

export const getPageSections = async (pageId: string) => {
  const data = await getDocument("pages", pageId);
  return data?.sections || {};
};

export const updateSection = async (
  pageId: string,
  sectionKey: string,
  sectionData: any
) => {
  const docRef = doc(getDb(), "pages", pageId);
  await updateDoc(docRef, {
    [`sections.${sectionKey}`]: sectionData,
    lastUpdated: serverTimestamp(),
  });
};
