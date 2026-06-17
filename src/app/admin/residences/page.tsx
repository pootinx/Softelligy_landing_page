"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useFirestoreCollection } from "@/lib/hooks/useCollection";
import FormField from "@/components/admin/FormField";
import SaveButton from "@/components/admin/SaveButton";
import ImageUploader from "@/components/admin/ImageUploader";
import { getFirestore, doc, setDoc, addDoc, collection, deleteDoc } from "firebase/firestore";
import { getFirebaseApp } from "@/firebase/config";
import { logAdminAction } from "@/lib/auditLog";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "@/context/LocaleContext";
import toast from "react-hot-toast";
import { Edit2, Trash2, DatabaseBackup } from "lucide-react";

export default function AdminResidencesPage() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { items, loading } = useFirestoreCollection("residences", "order");
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ city: "", country: "Morocco", status: "active", order: 0, imageUrl: "" });
  const [saving, setSaving] = useState(false);

  const resetForm = () => {
    setEditingId(null);
    setFormData({ city: "", country: "Morocco", status: "active", order: items.length, imageUrl: "" });
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    let healedUrl = item.imageUrl || "";
    if (healedUrl.includes("casablanca.png")) healedUrl = "/residences/Residence3.jpg";
    if (healedUrl.includes("rabat.png")) healedUrl = "/residences/Residence1.jpg";
    if (healedUrl.includes("marrakech.png")) healedUrl = "/residences/Residence4.jpg";
    if (healedUrl.includes("agadir.png")) healedUrl = "/residences/Residence2.png";
    if (healedUrl.includes("tanger.png")) healedUrl = "/residences/Residence1.jpg";

    setFormData({
      city: item.city || "", 
      country: item.country || "Morocco", 
      status: item.status || "active", 
      order: item.order || 0,
      imageUrl: healedUrl
    });
  };

  const handleDelete = async (item: any) => {
    if (!confirm("Are you sure you want to delete this residence?")) return;
    try {
      const db = getFirestore(getFirebaseApp());
      await deleteDoc(doc(db, "residences", item.id));
      await logAdminAction("DELETE_RESIDENCE", user?.email, item, null);
      toast.success("Residence deleted");
    } catch (err: any) {
      toast.error(`Error deleting: ${err.message}`);
    }
  };

  const handleToggleStatus = async (item: any) => {
    try {
      const db = getFirestore(getFirebaseApp());
      const newStatus = item.status === "active" ? "inactive" : "active";
      await setDoc(doc(db, "residences", item.id), { status: newStatus }, { merge: true });
      await logAdminAction("TOGGLE_RESIDENCE_STATUS", user?.email, item, { ...item, status: newStatus });
      toast.success(`Status changed to ${newStatus}`);
    } catch (err: any) {
      toast.error(`Error toggling status: ${err.message}`);
    }
  };

  const seedDefaults = async () => {
    if (!confirm("Add default residences to database?")) return;
    setSaving(true);
    try {
      const db = getFirestore(getFirebaseApp());
      const collRef = collection(db, "residences");
      const defaults = [
        { city: "Casablanca", country: "Morocco", status: "active", order: 0, imageUrl: "/residences/Residence3.jpg" },
        { key: "rabat", city: "Rabat", country: "Morocco", status: "active", order: 1, imageUrl: "/residences/Residence1.jpg" },
        { city: "Marrakech", country: "Morocco", status: "active", order: 2, imageUrl: "/residences/Residence4.jpg" },
        { city: "Agadir", country: "Morocco", status: "inactive", order: 3, imageUrl: "/residences/Residence2.png" },
        { city: "Tanger", country: "Morocco", status: "inactive", order: 4, imageUrl: "/residences/Residence1.jpg" },
      ];
      for (const res of defaults) {
        await addDoc(collRef, res);
      }
      toast.success("Default residences seeded!");
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
        const itemRef = doc(db, "residences", editingId);
        await setDoc(itemRef, dataToSave, { merge: true });
        await logAdminAction("UPDATE_RESIDENCE", user?.email, { id: editingId }, dataToSave);
        toast.success("Residence updated");
      } else {
        const collRef = collection(db, "residences");
        await addDoc(collRef, dataToSave);
        await logAdminAction("ADD_RESIDENCE", user?.email, null, dataToSave);
        toast.success("Residence added");
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
      <h1 className="text-2xl font-bold mb-6">Manage Residences</h1>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <form onSubmit={handleSave} className="bg-white rounded-lg shadow p-6 space-y-4">
            <h2 className="font-bold text-lg mb-4">{editingId ? "Edit Residence" : "Add New Residence"}</h2>
            
            <ImageUploader 
              currentUrl={formData.imageUrl}
              storagePath="images/residences"
              onUploadSuccess={(url) => setFormData({...formData, imageUrl: url})}
              label="Residence Image"
            />

            <FormField label="City" name="city" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} />
            <FormField label="Country" name="country" value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})} />
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select 
                value={formData.status} 
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full px-3 py-2 border rounded-md shadow-sm border-gray-300"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <FormField label="Order" name="order" type="number" value={formData.order.toString()} onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})} />
            
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
            <h2 className="text-lg font-bold text-gray-900 mb-4">Existing Residences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((item: any) => {
                let healedUrl = item.imageUrl || "";
                if (healedUrl.includes("casablanca.png")) healedUrl = "/residences/Residence3.jpg";
                if (healedUrl.includes("rabat.png")) healedUrl = "/residences/Residence1.jpg";
                if (healedUrl.includes("marrakech.png")) healedUrl = "/residences/Residence4.jpg";
                if (healedUrl.includes("agadir.png")) healedUrl = "/residences/Residence2.png";
                if (healedUrl.includes("tanger.png")) healedUrl = "/residences/Residence1.jpg";

                return (
                <div key={item.id} className="relative bg-gray-50 rounded-xl border border-gray-200 p-4 flex flex-col gap-3 group">
                  <div className="flex gap-4 items-center">
                    {healedUrl ? (
                      <img src={healedUrl} alt={item.city} className="w-16 h-16 rounded-lg object-cover" />
                    ) : (
                      <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center text-gray-400 text-xs">No img</div>
                    )}
                    <div>
                      <h3 className="font-bold text-gray-900">{item.city}</h3>
                      <p className="text-sm text-gray-500">{item.country}</p>
                      <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${item.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-800'}`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(item)} className="p-2 text-red-600 hover:bg-red-50 rounded-full transition">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )})}
              {items.length === 0 && !loading && (
                <div className="col-span-full text-center py-12 bg-gray-50 rounded-xl border border-gray-200 border-dashed">
                  <p className="mb-4 text-gray-500">No residences found.</p>
                  <button onClick={seedDefaults} disabled={saving} className="inline-flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-md text-sm hover:bg-brand-navy transition">
                    <DatabaseBackup className="w-4 h-4" /> Seed Default Residences
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
