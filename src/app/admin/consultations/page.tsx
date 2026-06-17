"use client";

import React, { useState } from "react";
import { useFirestoreCollection } from "@/lib/hooks/useCollection";
import { getFirestore, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { getFirebaseApp } from "@/firebase/config";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { MessageSquare, CheckCircle2, Circle, Trash2, Calendar, Phone, MapPin, Building, ShieldCheck, Clock } from "lucide-react";

export default function AdminConsultationsPage() {
  const { user } = useAuth();
  const { items, loading } = useFirestoreCollection("consultations", "createdAt");

  const handleMarkStatus = async (item: any, newStatus: string) => {
    try {
      const db = getFirestore(getFirebaseApp());
      await updateDoc(doc(db, "consultations", item.id), { status: newStatus });
      toast.success(`Marked as ${newStatus}`);
    } catch (err: any) {
      toast.error(`Error updating: ${err.message}`);
    }
  };

  const handleDelete = async (item: any) => {
    if (!confirm("Are you sure you want to delete this consultation request?")) return;
    try {
      const db = getFirestore(getFirebaseApp());
      await deleteDoc(doc(db, "consultations", item.id));
      toast.success("Request deleted");
    } catch (err: any) {
      toast.error(`Error deleting: ${err.message}`);
    }
  };

  if (loading) return <div className="p-8">Loading requests...</div>;

  const sortedItems = [...items].sort((a: any, b: any) => {
    const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
    const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
    return timeB - timeA;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Consultation Requests</h1>
            <p className="text-gray-500 mt-1">Manage client requests for Syndic and other services.</p>
          </div>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-200">
          <span className="text-2xl font-black text-blue-600">{sortedItems.length}</span>
          <span className="text-sm text-gray-500 ml-2 font-medium">Total Requests</span>
        </div>
      </div>

      <div className="grid gap-6">
        {sortedItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-1">No consultation requests yet</h3>
            <p className="text-gray-500">When clients fill out the contact form, they will appear here.</p>
          </div>
        ) : (
          sortedItems.map((req: any) => (
            <div key={req.id} className={`bg-white rounded-2xl border p-6 shadow-sm flex flex-col md:flex-row gap-6 transition-all ${req.status === 'resolved' ? 'border-gray-200 opacity-60' : 'border-blue-200 hover:border-blue-400'}`}>
              
              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      {req.type === "syndic" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-lg">
                          <Building className="w-3.5 h-3.5" /> Service Syndic
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider rounded-lg">
                          <ShieldCheck className="w-3.5 h-3.5" /> Autre Service
                        </span>
                      )}
                      <span className="text-sm text-gray-400 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {req.createdAt?.toDate ? new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(req.createdAt.toDate()) : "À l'instant"}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">{req.fullName}</h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <a href={`tel:${req.phone}`} className="font-medium hover:text-blue-600 transition">{req.phone}</a>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="font-medium">{req.city} - {req.address}</span>
                  </div>
                  
                  {req.type === "syndic" ? (
                    <>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Building className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">Résidence: {req.residenceName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <div className="w-4 h-4 text-gray-400 font-bold flex justify-center items-center">#</div>
                        <span className="font-medium">{req.apartmentsCount} Appartements</span>
                      </div>
                    </>
                  ) : (
                    <div className="col-span-1 sm:col-span-2 flex items-center gap-2 text-gray-700">
                      <ShieldCheck className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">Service souhaité: <span className="text-purple-700 font-bold">{req.serviceRequested}</span></span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex md:flex-col justify-end gap-3 md:pl-6 md:border-l border-gray-100">
                {req.status === "resolved" ? (
                  <button onClick={() => handleMarkStatus(req, "new")} className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition text-sm font-medium w-full md:w-32">
                    <CheckCircle2 className="w-4 h-4 text-green-600" /> Resolved
                  </button>
                ) : (
                  <button onClick={() => handleMarkStatus(req, "resolved")} className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-md shadow-blue-600/20 text-sm font-bold w-full md:w-32">
                    <Circle className="w-4 h-4" /> Mark Resolved
                  </button>
                )}
                <button onClick={() => handleDelete(req)} className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 text-red-600 rounded-xl hover:bg-red-50 hover:border-red-200 transition text-sm font-medium w-full md:w-32">
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}
