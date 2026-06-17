"use client";

import React, { useState, useEffect } from "react";
import { useFirestoreDoc } from "@/lib/hooks/useDoc";
import FormField from "@/components/admin/FormField";
import SaveButton from "@/components/admin/SaveButton";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getFirebaseApp } from "@/firebase/config";
import { logAdminAction } from "@/lib/auditLog";
import { useAuth } from "@/context/AuthContext";
import { useSiteContent } from "@/context/SiteContentContext";
import toast from "react-hot-toast";

export default function AdminFooterPage() {
  const { user } = useAuth();
  const { getContentBlock } = useSiteContent();
  const { data, loading } = useFirestoreDoc("site_config", "footer");
  
  const [formData, setFormData] = useState({
    phone1: "",
    phone2: "",
    email: "",
    address: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) {
      setFormData({
        phone1: data.phone1 || "",
        phone2: data.phone2 || "",
        email: data.email || "",
        address: data.address || "",
      });
    } else if (!loading) {
      setFormData({
        phone1: getContentBlock("company-phone") || "+212 670 977 483",
        phone2: getContentBlock("company-phone-2") || "+212 682 086 521",
        email: getContentBlock("company-email") || "contact@softelligy.com",
        address: getContentBlock("company-address") || "Casablanca, Morocco",
      });
    }
  }, [data, loading, getContentBlock]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const db = getFirestore(getFirebaseApp());
      const footerRef = doc(db, "site_config", "footer");
      await setDoc(footerRef, formData, { merge: true });
      await logAdminAction("UPDATE_FOOTER", user?.email, data, formData);
      toast.success("Footer details updated successfully");
    } catch (error: any) {
      toast.error(`Failed to update footer: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Edit Contact & Footer</h1>
      
      <form onSubmit={handleSave} className="bg-white rounded-lg shadow p-6 space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Primary Phone" name="phone1" value={formData.phone1} onChange={handleChange} />
          <FormField label="Secondary Phone" name="phone2" value={formData.phone2} onChange={handleChange} />
        </div>
        
        <FormField label="Contact Email" name="email" type="email" value={formData.email} onChange={handleChange} />
        <FormField label="Company Address" name="address" type="textarea" value={formData.address} onChange={handleChange} />
        
        <div className="flex justify-end pt-4 border-t">
          <SaveButton loading={saving} />
        </div>
      </form>
    </div>
  );
}
