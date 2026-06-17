"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Loader2, Building, ShieldCheck } from "lucide-react";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getFirebaseApp } from "@/firebase/config";
import { useTranslation } from "@/context/LocaleContext";

export default function ConsultationSection() {
  const { t } = useTranslation();
  const [serviceType, setServiceType] = useState<"syndic" | "other">("syndic");
  
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    city: "",
    address: "",
    residenceName: "",
    apartmentsCount: "",
    otherServiceType: "House keeping",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Phone validation (10 digits starting with 06 or 07)
    const phoneRegex = /^0[67]\d{8}$/;
    if (!phoneRegex.test(formData.phone)) {
      setErrorMsg("Veuillez entrer un numéro valide à 10 chiffres (ex: 0612345678).");
      return;
    }

    setLoading(true);
    try {
      const db = getFirestore(getFirebaseApp());
      const payload: any = {
        type: serviceType,
        fullName: formData.fullName,
        phone: formData.phone,
        city: formData.city,
        address: formData.address,
        createdAt: serverTimestamp(),
        status: "new"
      };

      if (serviceType === "syndic") {
        payload.residenceName = formData.residenceName;
        payload.apartmentsCount = Number(formData.apartmentsCount);
      } else {
        payload.serviceRequested = formData.otherServiceType;
      }

      await addDoc(collection(db, "consultations"), payload);
      setSuccess(true);
    } catch (err: any) {
      setErrorMsg("Une erreur s'est produite lors de l'envoi. Veuillez réessayer.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-brand-navy relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-brand-electric/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-electric/10 border border-brand-electric/20 text-brand-electric text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              Contact
            </div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6">
              Prêt à transformer la gestion de <span className="text-brand-electric">votre résidence ?</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-8">
              Remplissez le formulaire de consultation. Notre équipe d'experts vous contactera dans les plus brefs délais pour analyser vos besoins et vous proposer la meilleure solution.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-brand-electric border border-white/10">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold">Service Syndic Professionnel</h4>
                  <p className="text-white/40 text-sm">Gestion complète, transparente et digitale.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-brand-electric border border-white/10">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold">Services Annexes</h4>
                  <p className="text-white/40 text-sm">Sécurité, nettoyage, maintenance technique.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl relative"
          >
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Demande Envoyée !</h3>
                  <p className="text-gray-500">
                    Merci pour votre confiance. Notre équipe vous contactera très prochainement.
                  </p>
                  <button
                    onClick={() => {
                      setSuccess(false);
                      setFormData({ ...formData, phone: "", residenceName: "", apartmentsCount: "" });
                    }}
                    className="mt-8 px-6 py-2 text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition"
                  >
                    Envoyer une autre demande
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold text-gray-900">Demander une Consultation</h3>
                  
                  {/* Service Type Toggle */}
                  <div className="flex bg-gray-100 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setServiceType("syndic")}
                      className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${serviceType === "syndic" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                    >
                      Service Syndic
                    </button>
                    <button
                      type="button"
                      onClick={() => setServiceType("other")}
                      className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${serviceType === "other" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                    >
                      Autres Services
                    </button>
                  </div>

                  {errorMsg && (
                    <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 md:col-span-1">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nom Complet</label>
                      <input required type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900 placeholder-gray-400" placeholder="Jean Dupont" />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Téléphone</label>
                      <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900 placeholder-gray-400" placeholder="0612345678" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 md:col-span-1">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Ville</label>
                      <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900 placeholder-gray-400" placeholder="Casablanca" />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Adresse</label>
                      <input required type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900 placeholder-gray-400" placeholder="Quartier, Rue..." />
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-6">
                    {serviceType === "syndic" ? (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 md:col-span-1">
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nom de la Résidence</label>
                          <input required type="text" name="residenceName" value={formData.residenceName} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900 placeholder-gray-400" placeholder="Les Jasmins" />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nombre d'Appartements</label>
                          <input required type="number" min="1" name="apartmentsCount" value={formData.apartmentsCount} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900 placeholder-gray-400" placeholder="Ex: 24" />
                        </div>
                      </div>
                    ) : (
                      <div className="col-span-2">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Service Souhaité</label>
                        <select required name="otherServiceType" value={formData.otherServiceType} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900">
                          <option value="House keeping">House keeping (Nettoyage)</option>
                          <option value="Vidéosurveillance">Vidéosurveillance</option>
                          <option value="Agent de Sécurité">Agent de Sécurité</option>
                          <option value="Maintenance ascenseur">Maintenance ascenseur</option>
                        </select>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-brand text-white rounded-xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:bg-brand-navy transition-all shadow-xl shadow-brand/20 disabled:opacity-70"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                    {loading ? "Envoi en cours..." : "Envoyer la demande"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
