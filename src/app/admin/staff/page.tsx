"use client";

import React, { useState } from "react";
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

export default function AdminStaffPage() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { items, loading } = useFirestoreCollection("staff", "order");
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", role: "", description: "", order: 0, imageUrl: "" });
  const [saving, setSaving] = useState(false);

  const resetForm = () => {
    setEditingId(null);
    setFormData({ name: "", role: "", description: "", order: items.length, imageUrl: "" });
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    let healedUrl = item.imageUrl || "";
    if (healedUrl.includes("security_guarde.png")) healedUrl = "/Staff/security_guarde.png";
    if (healedUrl.includes("cleaning_women.png")) healedUrl = "/Staff/cleaning_women.png";
    if (healedUrl.includes("camera_technicien.png")) healedUrl = "/Staff/camera_technicien.png";
    if (healedUrl.includes("elevator_technicien.png")) healedUrl = "/Staff/elevator_technicien.png";

    setFormData({
      name: item.name || item.role,
      role: item.role,
      description: item.description,
      order: item.order,
      imageUrl: healedUrl,
    });
  };

  const handleDelete = async (item: any) => {
    if (!confirm("Are you sure you want to delete this staff member?")) return;
    try {
      const db = getFirestore(getFirebaseApp());
      await deleteDoc(doc(db, "staff", item.id));
      await logAdminAction("DELETE_STAFF", user?.email, item, null);
      toast.success("Staff deleted");
    } catch (err: any) {
      toast.error(`Error deleting: ${err.message}`);
    }
  };

  const seedDefaults = async () => {
    if (!confirm("Add default staff members to database?")) return;
    setSaving(true);
    try {
      const db = getFirestore(getFirebaseApp());
      const collRef = collection(db, "staff");
      const defaults = [
        { name: t("staff.roles.security.title"), role: t("staff.roles.security.title"), description: t("staff.roles.security.desc"), imageUrl: "/Staff/security_guarde.png", order: 0 },
        { name: t("staff.roles.cleaning.title"), role: t("staff.roles.cleaning.title"), description: t("staff.roles.cleaning.desc"), imageUrl: "/Staff/cleaning_women.png", order: 1 },
        { name: t("staff.roles.camera.title"), role: t("staff.roles.camera.title"), description: t("staff.roles.camera.desc"), imageUrl: "/Staff/camera_technicien.png", order: 2 },
        { name: t("staff.roles.elevator.title"), role: t("staff.roles.elevator.title"), description: t("staff.roles.elevator.desc"), imageUrl: "/Staff/elevator_technicien.png", order: 3 },
      ];
      for (const st of defaults) {
        await addDoc(collRef, st);
      }
      toast.success("Default staff seeded!");
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
        const itemRef = doc(db, "staff", editingId);
        await setDoc(itemRef, dataToSave, { merge: true });
        await logAdminAction("UPDATE_STAFF", user?.email, { id: editingId }, dataToSave);
        toast.success("Staff updated");
      } else {
        const collRef = collection(db, "staff");
        await addDoc(collRef, dataToSave);
        await logAdminAction("ADD_STAFF", user?.email, null, dataToSave);
        toast.success("Staff added");
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
      <h1 className="text-2xl font-bold mb-6">Manage Staff</h1>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <form onSubmit={handleSave} className="bg-white rounded-lg shadow p-6 space-y-4">
            <h2 className="font-bold text-lg mb-4">{editingId ? "Edit Staff" : "Add New Staff"}</h2>
            
            <ImageUploader 
              currentUrl={formData.imageUrl}
              storagePath="images/staff"
              onUploadSuccess={(url) => setFormData({...formData, imageUrl: url})}
              label="Staff Image"
            />

            <FormField label="Name" name="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            <FormField label="Role" name="role" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} />
            <FormField label="Description" name="description" type="textarea" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
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
            <h2 className="text-lg font-bold text-gray-900 mb-4">Existing Staff</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((item: any) => {
                let healedUrl = item.imageUrl || "";
                if (healedUrl.includes("security_guarde.png")) healedUrl = "/Staff/security_guarde.png";
                if (healedUrl.includes("cleaning_women.png")) healedUrl = "/Staff/cleaning_women.png";
                if (healedUrl.includes("camera_technicien.png")) healedUrl = "/Staff/camera_technicien.png";
                if (healedUrl.includes("elevator_technicien.png")) healedUrl = "/Staff/elevator_technicien.png";

                return (
                <div key={item.id} className="relative bg-gray-50 rounded-xl border border-gray-200 p-4 flex flex-col gap-3 group">
                  <div className="flex gap-4 items-center">
                    {healedUrl ? (
                      <img src={healedUrl} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                    ) : (
                      <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center text-gray-400 text-xs">No img</div>
                    )}
                    <div>
                      <h3 className="font-bold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-brand font-medium">{item.role}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2 mt-1">{item.description}</p>
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
                  <p className="mb-4 text-gray-500">No staff found.</p>
                  <button onClick={seedDefaults} disabled={saving} className="inline-flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-md text-sm hover:bg-brand-navy transition">
                    <DatabaseBackup className="w-4 h-4" /> Seed Default Staff
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
