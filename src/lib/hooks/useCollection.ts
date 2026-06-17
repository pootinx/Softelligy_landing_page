import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy, getFirestore } from "firebase/firestore";
import { getFirebaseApp } from "@/firebase/config";

interface UseCollectionResult<T> {
  items: T[];
  loading: boolean;
  error: Error | null;
}

export function useFirestoreCollection<T = any>(
  collectionName: string,
  orderByField?: string
): UseCollectionResult<T> {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!collectionName) {
      setLoading(false);
      return;
    }

    try {
      const db = getFirestore(getFirebaseApp());
      let q = collection(db, collectionName);

      if (orderByField) {
        q = query(q, orderBy(orderByField)) as any;
      }

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const docs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as unknown as T[];
          setItems(docs);
          setLoading(false);
        },
        (err) => {
          console.error(`Error fetching collection ${collectionName}:`, err);
          setError(err);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error(`Error setting up collection listener for ${collectionName}:`, err);
      setError(err as Error);
      setLoading(false);
    }
  }, [collectionName, orderByField]);

  return { items, loading, error };
}
