import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  getStorage,
} from "firebase/storage";
import { getFirebaseApp } from "./config";

const getStorageInstance = () => getStorage(getFirebaseApp());

export const uploadImage = (
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileName = `${Date.now()}-${file.name}`;
    const storageRef = ref(getStorageInstance(), `images/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress?.(progress);
      },
      (error) => reject(error),
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(url);
      }
    );
  });
};

export const deleteImage = async (url: string) => {
  const storageRef = ref(getStorageInstance(), url);
  await deleteObject(storageRef);
};

export const getImageUrl = async (path: string) => {
  const storageRef = ref(getStorageInstance(), path);
  return getDownloadURL(storageRef);
};
