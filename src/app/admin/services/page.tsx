"use client";

import React, { useState } from "react";
import { useFirestoreCollection } from "@/lib/hooks/useCollection";
import FormField from "@/components/admin/FormField";
import SaveButton from "@/components/admin/SaveButton";
import { getFirestore, doc, setDoc, addDoc, collection, deleteDoc } from "firebase/firestore";
import { getFirebaseApp } from "@/firebase/config";
import { logAdminAction } from "@/lib/auditLog";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "@/context/LocaleContext";
import toast from "react-hot-toast";
import { Edit2, Trash2, Plus, DatabaseBackup } from "lucide-react";

export default function AdminServicesPage() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { items, loading } = useFirestoreCollection("services", "order");
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: "", description: "", order: 0 });
  const [saving, setSaving] = useState(false);

  const resetForm = () => {
    setEditingId(null);
    setFormData({ title: "", description: "", order: items.length });
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setFormData({ title: item.title || "", description: item.description || "", order: item.order || 0 });
  };

  const handleDelete = async (item: any) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      const db = getFirestore(getFirebaseApp());
      await deleteDoc(doc(db, "services", item.id));
      await logAdminAction("DELETE_SERVICE", user?.email, item, null);
      toast.success("Service deleted");
    } catch (err: any) {
      toast.error(`Error deleting: ${err.message}`);
    }
  };

  const seedDefaults = async () => {
    if (!confirm("Add default services to database?")) return;
    setSaving(true);
    try {
      const db = getFirestore(getFirebaseApp());
      const collRef = collection(db, "services");
      const defaultSteps = [
        { title: t("syndicFlow.steps.0.title"), description: t("syndicFlow.steps.0.desc"), order: 0 },
        { title: t("syndicFlow.steps.1.title"), description: t("syndicFlow.steps.1.desc"), order: 1 },
        { title: t("syndicFlow.steps.2.title"), description: t("syndicFlow.steps.2.desc"), order: 2 },
        { title: t("syndicFlow.steps.3.title"), description: t("syndicFlow.steps.3.desc"), order: 3 },
      ];
      for (const step of defaultSteps) {
        await addDoc(collRef, step);
      }
      toast.success("Default services seeded!");
    } catch (err: any) {
      toast.error(`Error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const db = getFirestore(getFirebaseApp());
      const dataToSave = { ...formData, order: Number(formData.order) };
      
      if (editingId) {
        const itemRef = doc(db, "services", editingId);
        await setDoc(itemRef, dataToSave, { merge: true });
        await logAdminAction("UPDATE_SERVICE", user?.email, { id: editingId }, dataToSave);
        toast.success("Service updated");
      } else {
        const collRef = collection(db, "services");
        await addDoc(collRef, dataToSave);
        await logAdminAction("ADD_SERVICE", user?.email, null, dataToSave);
        toast.success("Service added");
      }
      resetForm();
    } catch (error: any) {
      toast.error(`Failed to save: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">Manage Services (Syndic Flow)</h1>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <form onSubmit={handleSave} className="bg-white rounded-lg shadow p-6 space-y-4">
            <h2 className="font-bold text-lg mb-4">{editingId ? "Edit Service" : "Add New Service"}</h2>
            <FormField label="Title" name="title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
            <FormField label="Description" name="description" type="textarea" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
            <FormField label="Order (Number)" name="order" type="number" value={formData.order.toString()} onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})} />
            
            <div className="flex gap-2 pt-4">
              <SaveButton loading={saving} label={editingId ? "Update" : "Add"} />
              {editingId && (
                <button type="button" onClick={resetForm} className="px-4 py-2 border rounded-md text-sm">Cancel</button>
              )}
            </div>
          </form>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Existing Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((item: any) => (
                <div key={item.id} className="relative bg-gray-50 rounded-xl border border-gray-200 p-4 flex flex-col gap-3 group">
                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
                      {item.order + 1}
                    </div>
                    <h3 className="font-bold text-gray-900 leading-tight">{item.title}</h3>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-3">{item.description}</p>
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(item)} className="p-2 text-red-600 hover:bg-red-50 rounded-full transition">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {items.length === 0 && !loading && (
                <div className="col-span-full text-center py-12 bg-gray-50 rounded-xl border border-gray-200 border-dashed">
                  <p className="mb-4 text-gray-500">No services found.</p>
                  <button onClick={seedDefaults} disabled={saving} className="inline-flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-md text-sm hover:bg-brand-navy transition">
                    <DatabaseBackup className="w-4 h-4" /> Seed Default Services
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
