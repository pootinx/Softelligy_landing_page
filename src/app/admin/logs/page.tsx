"use client";

import React, { useEffect, useState } from "react";
import { collection, query, orderBy, limit, getDocs, getFirestore } from "firebase/firestore";
import { getFirebaseApp } from "@/firebase/config";
import AuditTable from "@/components/admin/AuditTable";
import toast from "react-hot-toast";

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const db = getFirestore(getFirebaseApp());
        const logsRef = collection(db, "audit_logs");
        const q = query(logsRef, orderBy("timestamp", "desc"), limit(100));
        
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setLogs(data);
      } catch (error: any) {
        toast.error(`Failed to load logs: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Activity Logs</h1>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
        >
          Refresh
        </button>
      </div>
      
      <p className="text-gray-500 mb-6 text-sm">Showing the latest 100 admin actions.</p>
      
      <AuditTable logs={logs} loading={loading} />
    </div>
  );
}
