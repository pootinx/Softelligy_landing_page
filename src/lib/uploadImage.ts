import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirebaseApp } from "@/firebase/config";
import imageCompression from "browser-image-compression";

export interface UploadImageResult {
  url: string | null;
  error: Error | null;
}

export async function uploadImage(
  file: File,
  storagePath: string,
  onProgress?: (progress: number) => void
): Promise<UploadImageResult> {
  try {
    // Compress image before upload
    const options = {
      maxSizeMB: 1, // Max size 1MB by default, can be lower for staff/residences
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    
    let compressedFile = file;
    if (file.type.startsWith("image/")) {
      try {
        compressedFile = await imageCompression(file, options);
      } catch (compressionError) {
        console.warn("Image compression failed, using original file", compressionError);
      }
    }

    const storage = getStorage(getFirebaseApp());
    const filename = `${Date.now()}_${compressedFile.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
    const fullPath = `${storagePath.replace(/\/$/, '')}/${filename}`;
    const storageRef = ref(storage, fullPath);

    const uploadTask = uploadBytesResumable(storageRef, compressedFile);

    return new Promise((resolve) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) onProgress(progress);
        },
        (error) => {
          console.error("Upload failed", error);
          resolve({ url: null, error: error as unknown as Error });
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve({ url: downloadURL, error: null });
          } catch (urlError) {
            resolve({ url: null, error: urlError as Error });
          }
        }
      );
    });
  } catch (error) {
    return { url: null, error: error as Error };
  }
}
