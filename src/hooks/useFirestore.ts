"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getDocument,
  addDocument,
  updateDocument,
  deleteDocument,
  subscribeToCollection,
} from "@/firebase/firestore";

export const useCollection = (collectionName: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToCollection(collectionName, (newData) => {
      setData(newData);
      setLoading(false);
    });
    return unsubscribe;
  }, [collectionName]);

  const add = useCallback(
    async (item: any) => {
      try {
        const id = await addDocument(collectionName, item);
        return id;
      } catch (err: any) {
        setError(err.message);
        throw err;
      }
    },
    [collectionName]
  );

  const update = useCallback(
    async (id: string, item: any) => {
      try {
        await updateDocument(collectionName, id, item);
      } catch (err: any) {
        setError(err.message);
        throw err;
      }
    },
    [collectionName]
  );

  const remove = useCallback(
    async (id: string) => {
      try {
        await deleteDocument(collectionName, id);
      } catch (err: any) {
        setError(err.message);
        throw err;
      }
    },
    [collectionName]
  );

  return { data, loading, error, add, update, remove };
};

export const useDocument = (collectionName: string, docId: string | null) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!docId) {
      setLoading(false);
      return;
    }
    getDocument(collectionName, docId).then((result) => {
      setData(result);
      setLoading(false);
    });
  }, [collectionName, docId]);

  return { data, loading };
};
