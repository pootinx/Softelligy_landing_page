"use client";

import React, { useState, useEffect } from "react";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { useFirestoreDoc } from "@/lib/hooks/useDoc";
import { getFirebaseApp } from "@/firebase/config";
import { logAdminAction } from "@/lib/auditLog";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "@/context/LocaleContext";
import toast from "react-hot-toast";
import ImageUploader from "@/components/admin/ImageUploader";
import { LayoutTemplate, Plus, Trash2, Eye, EyeOff, Link as LinkIcon, Settings2 } from "lucide-react";

export default function AdminNavbarPage() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { data, loading } = useFirestoreDoc("site_config", "navbar");
  
  const [formData, setFormData] = useState({
    logoUrl: "",
    links: [] as { name: string; href: string }[],
    ctaText: "",
    ctaUrl: "",
    showCta: true,
    loginText: "",
    loginUrl: "",
    showLogin: true,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) {
      setFormData({
        logoUrl: data.logoUrl || "/logo-horizontal-white.png",
        links: data.links && data.links.length > 0 ? data.links : [
          { name: t("nav.itSolutions"), href: "#tech" },
          { name: t("nav.syndicServices"), href: "#syndic-process" },
          { name: t("nav.platform"), href: "#platform" },
          { name: t("nav.about"), href: "#about" },
        ],
        ctaText: data.ctaText || t("common.getConsultation"),
        ctaUrl: data.ctaUrl || "#contact",
        showCta: data.showCta !== false,
        loginText: data.loginText || t("common.login"),
        loginUrl: data.loginUrl || "/login",
        showLogin: data.showLogin !== false,
      });
    } else if (!loading) {
      setFormData({
        logoUrl: "/logo-horizontal-white.png",
        links: [
          { name: t("nav.itSolutions"), href: "#tech" },
          { name: t("nav.syndicServices"), href: "#syndic-process" },
          { name: t("nav.platform"), href: "#platform" },
          { name: t("nav.about"), href: "#about" },
        ],
        ctaText: t("common.getConsultation"),
        ctaUrl: "#contact",
        showCta: true,
        loginText: t("common.login"),
        loginUrl: "/login",
        showLogin: true,
      });
    }
  }, [data, loading, t]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLinkChange = (index: number, field: "name" | "href", value: string) => {
    const newLinks = [...formData.links];
    newLinks[index][field] = value;
    setFormData({ ...formData, links: newLinks });
  };

  const addLink = () => {
    setFormData({ ...formData, links: [...formData.links, { name: "", href: "" }] });
  };

  const removeLink = (index: number) => {
    const newLinks = formData.links.filter((_, i) => i !== index);
    setFormData({ ...formData, links: newLinks });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const db = getFirestore(getFirebaseApp());
      await setDoc(doc(db, "site_config", "navbar"), formData, { merge: true });
      if (user?.email) {
        await logAdminAction(user.email, "UPDATE_NAVBAR", "Updated Navbar settings");
      }
      toast.success("Navbar section updated successfully!");
    } catch (err: any) {
      toast.error(`Error saving Navbar: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
          <LayoutTemplate className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Navbar Management</h1>
          <p className="text-gray-500 mt-1">Configure your global navigation structure and branding.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Brand Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-100 bg-gray-50/50 p-6">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-gray-400" />
              Brand Identity
            </h2>
          </div>
          <div className="p-6">
            <ImageUploader
              currentUrl={formData.logoUrl}
              storagePath="images/navbar"
              onUploadSuccess={(url) => setFormData({ ...formData, logoUrl: url })}
              label="Primary Logo (White/Transparent recommended)"
            />
          </div>
        </div>

        {/* Links Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-100 bg-gray-50/50 p-6 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-gray-400" />
              Navigation Links
            </h2>
            <button type="button" onClick={addLink} className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-sm font-medium transition">
              <Plus className="w-4 h-4 mr-1.5" /> Add Link
            </button>
          </div>
          <div className="p-6 space-y-3">
            {formData.links.map((link, index) => (
              <div key={index} className="flex gap-3 items-center bg-gray-50 p-3 rounded-xl border border-gray-200 group">
                <div className="flex-1">
                  <input type="text" placeholder="Display Name (e.g. About Us)" value={link.name} onChange={(e) => handleLinkChange(index, "name", e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white" />
                </div>
                <div className="flex-1">
                  <input type="text" placeholder="URL Path (e.g. /about or #about)" value={link.href} onChange={(e) => handleLinkChange(index, "href", e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white" />
                </div>
                <button type="button" onClick={() => removeLink(index)} className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition opacity-0 group-hover:opacity-100">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            {formData.links.length === 0 && (
              <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-xl">
                No navigation links added.
              </div>
            )}
          </div>
        </div>

        {/* Call to Actions Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Login Button */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-100 bg-gray-50/50 p-6 flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900">Secondary Action (Login)</h2>
              <button 
                type="button" 
                onClick={() => setFormData({...formData, showLogin: !formData.showLogin})} 
                className={`p-2 rounded-lg flex items-center gap-2 text-sm font-medium transition ${formData.showLogin ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
              >
                {formData.showLogin ? <><Eye className="w-4 h-4"/> Visible</> : <><EyeOff className="w-4 h-4"/> Hidden</>}
              </button>
            </div>
            <div className={`p-6 space-y-4 transition-opacity ${!formData.showLogin && 'opacity-50 pointer-events-none'}`}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                <input type="text" name="loginText" value={formData.loginText} onChange={handleChange} placeholder="Connexion" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target URL</label>
                <input type="text" name="loginUrl" value={formData.loginUrl} onChange={handleChange} placeholder="/login" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-100 bg-gray-50/50 p-6 flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900">Primary CTA Button</h2>
              <button 
                type="button" 
                onClick={() => setFormData({...formData, showCta: !formData.showCta})} 
                className={`p-2 rounded-lg flex items-center gap-2 text-sm font-medium transition ${formData.showCta ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
              >
                {formData.showCta ? <><Eye className="w-4 h-4"/> Visible</> : <><EyeOff className="w-4 h-4"/> Hidden</>}
              </button>
            </div>
            <div className={`p-6 space-y-4 transition-opacity ${!formData.showCta && 'opacity-50 pointer-events-none'}`}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                <input type="text" name="ctaText" value={formData.ctaText} onChange={handleChange} placeholder="Obtenir une Consultation" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target URL</label>
                <input type="text" name="ctaUrl" value={formData.ctaUrl} onChange={handleChange} placeholder="#contact" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end pt-4">
          <button type="submit" disabled={saving} className="px-8 py-3 bg-brand text-white rounded-xl font-bold shadow-lg shadow-brand/30 hover:bg-brand-navy transition disabled:opacity-50">
            {saving ? "Saving Changes..." : "Publish Navigation Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
