"use client";

import { useState, useEffect } from "react";
import {
  doc,
  collection,
  onSnapshot,
  getFirestore,
} from "firebase/firestore";
import { getFirebaseApp } from "@/firebase/config";

export function useContent(pageId: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const db = getFirestore(getFirebaseApp());
      const unsub = onSnapshot(doc(db, "pages", pageId), (snap) => {
        if (snap.exists()) {
          setData({ id: snap.id, ...snap.data() });
        }
        setLoading(false);
      }, () => setLoading(false));
      return unsub;
    } catch {
      setLoading(false);
      return;
    }
  }, [pageId]);

  return { data, loading };
}

export function useContentBlocks() {
  const [blocks, setBlocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const db = getFirestore(getFirebaseApp());
      const unsub = onSnapshot(collection(db, "content"), (snap) => {
        setBlocks(snap.docs.map((d: any) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      }, () => setLoading(false));
      return unsub;
    } catch {
      setLoading(false);
      return;
    }
  }, []);

  const getValue = (key: string) => {
    const block = blocks.find((b: any) => b.key === key);
    return block?.value || "";
  };

  return { blocks, loading, getValue };
}
