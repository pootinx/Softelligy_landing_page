"use client";

import React, { useState, useEffect } from "react";
import { useFirestoreDoc } from "@/lib/hooks/useDoc";
import FormField from "@/components/admin/FormField";
import SaveButton from "@/components/admin/SaveButton";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getFirebaseApp } from "@/firebase/config";
import { logAdminAction } from "@/lib/auditLog";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "@/context/LocaleContext";
import toast from "react-hot-toast";

export default function AdminPlatformPage() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { data, loading } = useFirestoreDoc("site_config", "platform");
  
  const [formData, setFormData] = useState({
    titlePrefix: "",
    titleSuffix: "",
    description: "",
    features: [
      { title: "", desc: "" },
      { title: "", desc: "" },
      { title: "", desc: "" }
    ]
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) {
      setFormData({
        titlePrefix: data.titlePrefix || "",
        titleSuffix: data.titleSuffix || "",
        description: data.description || "",
        features: data.features?.length === 3 ? data.features : [
          { title: "", desc: "" },
          { title: "", desc: "" },
          { title: "", desc: "" }
        ],
      });
    } else if (!loading) {
      setFormData({
        titlePrefix: t("platform.titlePrefix"),
        titleSuffix: t("platform.titleSuffix"),
        description: t("platform.description"),
        features: [
          { title: t("platform.features.0.title"), desc: t("platform.features.0.desc") },
          { title: t("platform.features.1.title"), desc: t("platform.features.1.desc") },
          { title: t("platform.features.2.title"), desc: t("platform.features.2.desc") }
        ],
      });
    }
  }, [data, loading, t]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFeatureChange = (index: number, field: string, value: string) => {
    const updatedFeatures = [...formData.features];
    (updatedFeatures[index] as any)[field] = value;
    setFormData({ ...formData, features: updatedFeatures });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const db = getFirestore(getFirebaseApp());
      const platformRef = doc(db, "site_config", "platform");
      await setDoc(platformRef, formData, { merge: true });
      await logAdminAction("UPDATE_PLATFORM", user?.email, data, formData);
      toast.success("Platform section updated successfully");
    } catch (error: any) {
      toast.error(`Failed to update platform: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Edit Platform Section</h1>
      
      <form onSubmit={handleSave} className="bg-white rounded-lg shadow p-6 space-y-8">
        
        <div className="space-y-4">
          <h3 className="font-bold text-lg border-b pb-2">Main Text</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Title Prefix" name="titlePrefix" value={formData.titlePrefix} onChange={handleChange} />
            <FormField label="Title Suffix (Highlight)" name="titleSuffix" value={formData.titleSuffix} onChange={handleChange} />
          </div>
          <FormField label="Description" name="description" type="textarea" value={formData.description} onChange={handleChange} />
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-lg border-b pb-2">Features List (3 Items)</h3>
          {formData.features.map((feature, index) => (
            <div key={index} className="p-4 border rounded bg-gray-50 grid gap-4">
              <h4 className="font-bold">Feature {index + 1}</h4>
              <FormField 
                label="Title" 
                name={`feature_title_${index}`} 
                value={feature.title} 
                onChange={(e) => handleFeatureChange(index, 'title', e.target.value)} 
              />
              <FormField 
                label="Description" 
                name={`feature_desc_${index}`} 
                type="textarea"
                value={feature.desc} 
                onChange={(e) => handleFeatureChange(index, 'desc', e.target.value)} 
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-4 border-t">
          <SaveButton loading={saving} />
        </div>
      </form>
    </div>
  );
}
