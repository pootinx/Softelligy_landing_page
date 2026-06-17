"use client";

import React, { useState, useEffect } from "react";
import { useFirestoreDoc } from "@/lib/hooks/useDoc";
import FormField from "@/components/admin/FormField";
import SaveButton from "@/components/admin/SaveButton";
import ImageUploader from "@/components/admin/ImageUploader";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getFirebaseApp } from "@/firebase/config";
import { logAdminAction } from "@/lib/auditLog";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "@/context/LocaleContext";
import toast from "react-hot-toast";

export default function AdminHeroPage() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { data, loading } = useFirestoreDoc("site_config", "hero");
  
  const [formData, setFormData] = useState({
    titlePrefix: "",
    titleSuffix: "",
    tagline: "",
    description: "",
    ctaText: "",
    backgroundImageUrl: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) {
      setFormData({
        titlePrefix: data.titlePrefix || "",
        titleSuffix: data.titleSuffix || "",
        tagline: data.tagline || "",
        description: data.description || "",
        ctaText: data.ctaText || "",
        backgroundImageUrl: data.backgroundImageUrl || "",
      });
    } else if (!loading) {
      setFormData({
        titlePrefix: t("hero.headlinePrefix"),
        titleSuffix: t("hero.headlineSuffix"),
        tagline: t("hero.tagline"),
        description: t("hero.description"),
        ctaText: t("common.getConsultation"),
        backgroundImageUrl: "/hero-bg.png",
      });
    }
  }, [data, loading, t]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageSuccess = (url: string) => {
    setFormData({ ...formData, backgroundImageUrl: url });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const db = getFirestore(getFirebaseApp());
      const heroRef = doc(db, "site_config", "hero");
      
      // We use setDoc with merge: true to act like updateDoc but safely create if missing
      await setDoc(heroRef, formData, { merge: true });
      
      await logAdminAction("UPDATE_HERO", user?.email, data, formData);
      toast.success("Hero section updated successfully");
    } catch (error: any) {
      toast.error(`Failed to update hero: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Edit Hero Section</h1>
      
      <form onSubmit={handleSave} className="bg-white rounded-lg shadow p-6 space-y-6">
        <ImageUploader 
          currentUrl={formData.backgroundImageUrl}
          storagePath="images/hero"
          onUploadSuccess={handleImageSuccess}
          label="Background Image"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Title Prefix" name="titlePrefix" value={formData.titlePrefix} onChange={handleChange} />
          <FormField label="Title Suffix (Highlight)" name="titleSuffix" value={formData.titleSuffix} onChange={handleChange} />
        </div>
        
        <FormField label="Tagline" name="tagline" value={formData.tagline} onChange={handleChange} />
        
        <FormField 
          label="Description" 
          name="description" 
          type="textarea"
          value={formData.description} 
          onChange={handleChange} 
        />
        
        <FormField label="CTA Button Text" name="ctaText" value={formData.ctaText} onChange={handleChange} />

        <div className="flex justify-end pt-4 border-t">
          <SaveButton loading={saving} />
        </div>
      </form>
    </div>
  );
}
