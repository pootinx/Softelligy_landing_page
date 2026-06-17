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

export default function AdminStatsPage() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { data, loading } = useFirestoreDoc("site_config", "stats");
  
  const [formData, setFormData] = useState({
    projects: "", projectsLabel: "", projectsSub: "",
    buildings: "", buildingsLabel: "", buildingsSub: "",
    residents: "", residentsLabel: "", residentsSub: "",
    satisfaction: "", satisfactionLabel: "", satisfactionSub: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) {
      setFormData({
        projects: data.projects || "", projectsLabel: data.projectsLabel || "", projectsSub: data.projectsSub || "",
        buildings: data.buildings || "", buildingsLabel: data.buildingsLabel || "", buildingsSub: data.buildingsSub || "",
        residents: data.residents || "", residentsLabel: data.residentsLabel || "", residentsSub: data.residentsSub || "",
        satisfaction: data.satisfaction || "", satisfactionLabel: data.satisfactionLabel || "", satisfactionSub: data.satisfactionSub || "",
      });
    } else if (!loading) {
      setFormData({
        projects: "200+", projectsLabel: t("stats.projects"), projectsSub: t("stats.projectsSub"),
        buildings: "150+", buildingsLabel: t("stats.buildings"), buildingsSub: t("stats.buildingsSub"),
        residents: "5,000+", residentsLabel: t("stats.residents"), residentsSub: t("stats.residentsSub"),
        satisfaction: "98%", satisfactionLabel: t("stats.satisfaction"), satisfactionSub: t("stats.satisfactionSub"),
      });
    }
  }, [data, loading, t]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const db = getFirestore(getFirebaseApp());
      const statsRef = doc(db, "site_config", "stats");
      await setDoc(statsRef, formData, { merge: true });
      await logAdminAction("UPDATE_STATS", user?.email, data, formData);
      toast.success("Stats section updated successfully");
    } catch (error: any) {
      toast.error(`Failed to update stats: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">Edit Stats Section</h1>
      
      <form onSubmit={handleSave} className="bg-white rounded-lg shadow p-6 space-y-8">
        
        {['projects', 'buildings', 'residents', 'satisfaction'].map((key) => (
          <div key={key} className="p-4 border rounded-lg bg-gray-50">
            <h3 className="font-bold mb-4 capitalize">{key} Stat</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField label="Value (e.g. 200+)" name={key} value={(formData as any)[key]} onChange={handleChange} />
              <FormField label="Label (e.g. Projects)" name={`${key}Label`} value={(formData as any)[`${key}Label`]} onChange={handleChange} />
              <FormField label="Subtext" name={`${key}Sub`} value={(formData as any)[`${key}Sub`]} onChange={handleChange} />
            </div>
          </div>
        ))}

        <div className="flex justify-end pt-4 border-t">
          <SaveButton loading={saving} />
        </div>
      </form>
    </div>
  );
}
