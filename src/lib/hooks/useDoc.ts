import { useState, useEffect } from "react";
import { doc, onSnapshot, getFirestore } from "firebase/firestore";
import { getFirebaseApp } from "@/firebase/config";

interface UseDocResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useFirestoreDoc<T = any>(
  collectionName: string,
  docId: string
): UseDocResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!collectionName || !docId) {
      setLoading(false);
      return;
    }

    try {
      const db = getFirestore(getFirebaseApp());
      const docRef = doc(db, collectionName, docId);

      const unsubscribe = onSnapshot(
        docRef,
        (snapshot) => {
          if (snapshot.exists()) {
            setData({ id: snapshot.id, ...snapshot.data() } as unknown as T);
          } else {
            setData(null);
          }
          setLoading(false);
        },
        (err) => {
          console.error(`Error fetching document ${collectionName}/${docId}:`, err);
          setError(err);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error(`Error setting up document listener for ${collectionName}/${docId}:`, err);
      setError(err as Error);
      setLoading(false);
    }
  }, [collectionName, docId]);

  return { data, loading, error };
}
