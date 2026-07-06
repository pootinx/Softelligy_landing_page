"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building,
  CheckCircle2,
  Send,
  User,
  Plus,
  Minus,
  Sparkles,
  Shield,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Camera,
  Trees,
} from "lucide-react";
import { useTranslation } from "@/context/LocaleContext";
import { useDevisCalculator } from "./DevisCalculator";
import DevisResultDocument from "./DevisResultDocument";

export default function DevisPage() {
  const { t, locale, dir } = useTranslation();

  // Safely cast locale to string to avoid TypeScript literal comparison alerts
  const currentLocale = (locale as string) || "fr";
  const isAr = currentLocale === "ar";

  // Helper function to return fallback text if the translation key does not exist
  const getTxt = (key: string, fallback: string) => {
    const val = t(key);
    return val === key ? fallback : val;
  };

  const {
    step,
    handleNextStep,
    handlePrevStep,

    coproprieteName,
    setCoproprieteName,
    city,
    setCity,
    apartmentsCount,
    setApartmentsCount,
    floorsCount,
    setFloorsCount,

    menageFrequency,
    setMenageFrequency,
    hasAscenseur,
    setHasAscenseur,
    ascenseurCount,
    setAscenseurCount,
    securityLevel,
    setSecurityLevel,
    hasEspacesVerts,
    setHasEspacesVerts,
    hasCameras,
    setHasCameras,

    nom,
    setNom,
    prenom,
    setPrenom,
    phone,
    setPhone,
    email,
    setEmail,
    role,

    isSubmitting,
    isSubmitted,
    handleSubmit,
    handleReset,

    costs,
  } = useDevisCalculator();

  return (
    <main
      className="min-h-screen bg-slate-50 relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8"
      dir={dir}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-brand/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 space-y-10">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[11px] font-black uppercase tracking-wider">
            {isAr ? "طلب عرض أسعار فوري" : "Estimation en ligne gratuite"}
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-brand-navy mt-4 mb-4 leading-tight">
            {isAr ? "احسب ميزانية السنديك لإقامتك" : "Calculez votre Devis Syndic"}
          </h1>
          <p className="text-slate-500 text-sm md:text-base font-semibold leading-relaxed">
            {isAr
              ? "استخدم حاسبتنا الذكية للحصول على تقدير دقيق ومهني لمصاريف الملكية المشتركة في دقائق معدودة."
              : "Estimez instantanément le budget mensuel de fonctionnement de votre copropriété et le coût par appartement."}
          </p>
        </div>

        {/* STEPPER PROGRESS BAR */}
        {!isSubmitted && (
          <div className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Step 1 */}
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm transition-all shadow-md ${
                    step >= 1
                      ? "bg-blue-600 text-white shadow-blue-600/10"
                      : "bg-slate-50 text-slate-400 border border-slate-200"
                  }`}
                >
                  01
                </div>
                <div className="text-left">
                  <div className="text-xs font-black text-brand-navy uppercase">
                    {isAr ? "الخطوة 1" : "Étape 1"}
                  </div>
                  <div className="text-xs text-slate-500 font-bold">
                    {isAr ? "معلومات الإقامة" : "Votre Copropriété"}
                  </div>
                </div>
              </div>

              {/* Line divider */}
              <div className="hidden md:block flex-1 h-[2px] bg-slate-100 rounded-full transition-all duration-500 relative">
                <div
                  className={`absolute left-0 top-0 h-full bg-blue-600 transition-all duration-500 ${
                    step > 1 ? "w-full" : "w-0"
                  }`}
                />
              </div>

              {/* Step 2 */}
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm transition-all shadow-md ${
                    step >= 2
                      ? "bg-blue-600 text-white shadow-blue-600/10"
                      : "bg-slate-50 text-slate-400 border border-slate-200"
                  }`}
                >
                  02
                </div>
                <div className="text-left">
                  <div className="text-xs font-black text-brand-navy uppercase">
                    {isAr ? "الخطوة 2" : "Étape 2"}
                  </div>
                  <div className="text-xs text-slate-500 font-bold">
                    {isAr ? "تحديد الخدمات" : "Choix des Services"}
                  </div>
                </div>
              </div>

              {/* Line divider */}
              <div className="hidden md:block flex-1 h-[2px] bg-slate-100 rounded-full transition-all duration-500 relative">
                <div
                  className={`absolute left-0 top-0 h-full bg-blue-600 transition-all duration-500 ${
                    step > 2 ? "w-full" : "w-0"
                  }`}
                />
              </div>

              {/* Step 3 */}
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm transition-all shadow-md ${
                    step >= 3
                      ? "bg-blue-600 text-white shadow-blue-600/10"
                      : "bg-slate-50 text-slate-400 border border-slate-200"
                  }`}
                >
                  03
                </div>
                <div className="text-left">
                  <div className="text-xs font-black text-brand-navy uppercase">
                    {isAr ? "الخطوة 3" : "Étape 3"}
                  </div>
                  <div className="text-xs text-slate-500 font-bold">
                    {isAr ? "معلومات الاتصال" : "Contact & Devis"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* LEFT COLUMN: Input Forms */}
              <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-6 md:p-10 border border-slate-100 shadow-xl shadow-slate-100/50">
                {/* STEP 1: Building Profile */}
                {step === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-2xl font-black text-brand-navy mb-2 flex items-center gap-2">
                        <Building className="w-6 h-6 text-blue-600" />
                        {isAr ? "بيان العقار والمبنى" : "Décrivez votre copropriété"}
                      </h2>
                      <p className="text-xs text-slate-400 font-bold">
                        {isAr
                          ? "أدخل البيانات الأساسية لمجمعكم السكني لحساب الرسوم الإدارية"
                          : "Ces informations de base nous permettent d'évaluer le volume de gestion administrative."}
                      </p>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2">
                          {isAr ? "إسم الإقامة العقارية *" : "Nom de la Copropriété *"}
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ex: Résidence Atlas Gauthier"
                          value={coproprieteName}
                          onChange={(e) => setCoproprieteName(e.target.value)}
                          className="w-full h-12 px-5 rounded-2xl bg-slate-50 text-slate-900 placeholder:text-slate-400 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent focus:outline-none transition-all text-xs font-bold shadow-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2">
                          {isAr ? "المدينة" : "Ville"}
                        </label>
                        <select
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full h-12 px-5 rounded-2xl bg-slate-50 text-slate-900 placeholder:text-slate-400 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent focus:outline-none transition-all text-xs font-bold shadow-sm"
                        >
                          <option value="casablanca">Casablanca</option>
                          <option value="rabat">Rabat</option>
                          <option value="temara">Témara</option>
                          <option value="marrakech">Marrakech</option>
                          <option value="beniMellal">Béni Mellal</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                              {isAr ? "إجمالي عدد شقق الإقامة" : "Nombre total d'appartements"}
                            </label>
                            <span className="text-xs font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                              {apartmentsCount}
                            </span>
                          </div>
                          <div className="flex items-center border border-slate-200 rounded-2xl overflow-hidden h-12 bg-slate-50 shadow-sm">
                            <button
                              type="button"
                              onClick={() =>
                                setApartmentsCount((c) => Math.max(4, c - 2))
                              }
                              className="w-14 h-full flex items-center justify-center hover:bg-slate-100 text-slate-500 font-bold border-r border-slate-200"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <div className="flex-1 text-center font-black text-slate-800 text-sm">
                              {apartmentsCount}
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                setApartmentsCount((c) => Math.min(200, c + 2))
                              }
                              className="w-14 h-full flex items-center justify-center hover:bg-slate-100 text-slate-500 font-bold border-l border-slate-200"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                              {isAr ? "عدد الطوابق" : "Nombre d'étages"}
                            </label>
                            <span className="text-xs font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                              {floorsCount}
                            </span>
                          </div>
                          <div className="flex items-center border border-slate-200 rounded-2xl overflow-hidden h-12 bg-slate-50 shadow-sm">
                            <button
                              type="button"
                              onClick={() =>
                                setFloorsCount((f) => Math.max(1, f - 1))
                              }
                              className="w-14 h-full flex items-center justify-center hover:bg-slate-100 text-slate-500 font-bold border-r border-slate-200"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <div className="flex-1 text-center font-black text-slate-800 text-sm">
                              {floorsCount}
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                setFloorsCount((f) => Math.min(18, f + 1))
                              }
                              className="w-14 h-full flex items-center justify-center hover:bg-slate-100 text-slate-500 font-bold border-l border-slate-200"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Service Configuration Cards */}
                {step === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-2xl font-black text-brand-navy mb-2 flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-blue-600" />
                        {isAr ? "اختر الخدمات التي تحتاجها" : "Configurez vos services de copropriété"}
                      </h2>
                      <p className="text-xs text-slate-400 font-bold">
                        {isAr
                          ? "حدد مستويات صيانة المصاعد، الأمن ونظافة الممرات المشتركة"
                          : "Activez et paramétrez les prestations requises pour l'entretien de votre immeuble."}
                      </p>
                    </div>

                    <div className="space-y-6">
                      {/* Cleaning */}
                      <div className="bg-white border border-slate-100 p-5 rounded-[2rem] shadow-sm space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                              <Sparkles className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-xs font-black text-slate-800">
                                {isAr ? "خدمة التنظيف والمناولة" : "Service de Nettoyage & Ménage"}
                              </h4>
                              <p className="text-[10px] text-slate-400 font-bold">
                                {isAr ? "تنظيف الممرات والدرج" : "Balayage et lavage des escaliers et halls"}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-4 gap-2">
                          {[
                            { label: "Aucun", val: "0" },
                            { label: "2x / sem", val: "2" },
                            { label: "3x / sem", val: "3" },
                            { label: "6x (Daily)", val: "6" },
                          ].map((opt) => (
                            <button
                              key={opt.val}
                              type="button"
                              onClick={() => setMenageFrequency(opt.val)}
                              className={`h-11 text-[10px] font-black uppercase rounded-xl border transition-all ${
                                menageFrequency === opt.val
                                  ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/10"
                                  : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100/50"
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Elevator */}
                      <div className="bg-white border border-slate-100 p-5 rounded-[2rem] shadow-sm space-y-4">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                              <Building className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-xs font-black text-slate-800">
                                {isAr ? "مصاعد الإقامة" : "Maintenance Ascenseurs"}
                              </h4>
                              <p className="text-[10px] text-slate-400 font-bold">
                                {isAr ? "عقد الصيانة السنوي وفحص السلامة" : "Contrat d'assistance technique et urgences cabines"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setHasAscenseur(false);
                                setAscenseurCount(0);
                              }}
                              className={`px-4 py-2 text-[10px] font-black uppercase rounded-xl border transition-all ${
                                !hasAscenseur
                                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                                  : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                              }`}
                            >
                              {isAr ? "لا" : "Non"}
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setHasAscenseur(true);
                                setAscenseurCount(1);
                              }}
                              className={`px-4 py-2 text-[10px] font-black uppercase rounded-xl border transition-all ${
                                hasAscenseur
                                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                                  : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                              }`}
                            >
                              {isAr ? "نعم" : "Oui"}
                            </button>
                          </div>
                        </div>

                        {hasAscenseur && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="pt-2 flex items-center justify-between border-t border-slate-100"
                          >
                            <span className="text-xs font-black text-slate-500">
                              {isAr ? "كم عدد المصاعد المتواجدة ؟" : "Nombre d'ascenseurs dans l'immeuble :"}
                            </span>
                            <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden h-10 w-32 bg-slate-50 shadow-inner">
                              <button
                                type="button"
                                onClick={() =>
                                  setAscenseurCount((c) => Math.max(1, c - 1))
                                }
                                className="w-10 h-full flex items-center justify-center hover:bg-slate-200 text-slate-500"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <div className="flex-1 text-center font-black text-slate-800 text-xs">
                                {ascenseurCount}
                              </div>
                              <button
                                type="button"
                                onClick={() =>
                                  setAscenseurCount((c) => Math.min(6, c + 1))
                                }
                                className="w-10 h-full flex items-center justify-center hover:bg-slate-200 text-slate-500"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </div>

                      {/* Security */}
                      <div className="bg-white border border-slate-100 p-5 rounded-[2rem] shadow-sm space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                            <Shield className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-xs font-black text-slate-800">
                              {isAr ? "الحراسة وبوابة الإقامة" : "Gardiennage & Sécurité Commune"}
                            </h4>
                            <p className="text-[10px] text-slate-400 font-bold">
                              {isAr ? "حراسة مادية للأشخاص والممتلكات" : "Présence d'un gardien professionnel"}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-4 gap-2">
                          {[
                            { label: "Aucun", val: "none" },
                            { label: "Jour", val: "day" },
                            { label: "Nuit", val: "night" },
                            { label: "H24", val: "24h" },
                          ].map((opt) => (
                            <button
                              key={opt.val}
                              type="button"
                              onClick={() => setSecurityLevel(opt.val)}
                              className={`h-11 text-[10px] font-black uppercase rounded-xl border transition-all ${
                                securityLevel === opt.val
                                  ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/10"
                                  : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100/50"
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Extras Switch Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setHasEspacesVerts(!hasEspacesVerts)}
                          className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all shadow-sm ${
                            hasEspacesVerts
                              ? "bg-emerald-50/50 border-emerald-200 text-emerald-950"
                              : "bg-white border-slate-100 text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                              <Trees className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="text-xs font-black">
                                {isAr ? "المساحات الخضراء" : "Espaces verts"}
                              </div>
                              <div className="text-[9px] opacity-75">
                                {isAr ? "سقي وصيانة الحدائق" : "Entretien des pelouses"}
                              </div>
                            </div>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                              hasEspacesVerts
                                ? "bg-emerald-500 border-emerald-500 text-white"
                                : "border-slate-200 bg-white"
                            }`}
                          >
                            {hasEspacesVerts && <CheckCircle2 className="w-3.5 h-3.5" />}
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setHasCameras(!hasCameras)}
                          className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all shadow-sm ${
                            hasCameras
                              ? "bg-blue-50/50 border-blue-200 text-blue-950"
                              : "bg-white border-slate-100 text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                              <Camera className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="text-xs font-black">
                                {isAr ? "كاميرات المراقبة" : "Vidéosurveillance"}
                              </div>
                              <div className="text-[9px] opacity-75">
                                {isAr ? "صيانة النظام الكاميرات" : "Contrat d'entretien caméras"}
                              </div>
                            </div>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                              hasCameras
                                ? "bg-blue-500 border-blue-500 text-white"
                                : "border-slate-200 bg-white"
                            }`}
                          >
                            {hasCameras && <CheckCircle2 className="w-3.5 h-3.5" />}
                          </div>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: Contact Form */}
                {step === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-2xl font-black text-brand-navy mb-2 flex items-center gap-2">
                        <User className="w-6 h-6 text-blue-600" />
                        {isAr ? "أدخل بيانات التواصل والصفة" : "Finalisez votre demande"}
                      </h2>
                      <p className="text-xs text-slate-400 font-bold">
                        {isAr
                          ? "يرجى ملء الحقول لتوليد وثيقة العرض باسم الإقامة"
                          : "Entrez vos coordonnées pour lier ce devis à votre dossier de copropriété."}
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2">
                            {isAr ? "النسب *" : "Nom *"}
                          </label>
                          <input
                            type="text"
                            required
                            minLength={2}
                            maxLength={30}
                            pattern="[A-Za-zÀ-ÿ\u0600-\u06FF\s'-]+"
                            placeholder="Bennani"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                            className="w-full h-12 px-5 rounded-2xl bg-slate-50 text-slate-900 placeholder:text-slate-400 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent focus:outline-none transition-all text-xs font-bold shadow-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2">
                            {isAr ? "الاسم الأول *" : "Prénom *"}
                          </label>
                          <input
                            type="text"
                            required
                            minLength={2}
                            maxLength={30}
                            pattern="[A-Za-zÀ-ÿ\u0600-\u06FF\s'-]+"
                            title="Le nom doit contenir uniquement des lettres (2 à 30 caractères)."
                            placeholder="Karim"
                            value={prenom}
                            onChange={(e) => setPrenom(e.target.value)}
                            className="w-full h-12 px-5 rounded-2xl bg-slate-50 text-slate-900 placeholder:text-slate-400 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent focus:outline-none transition-all text-xs font-bold shadow-sm"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2">
                            {isAr ? "رقم الهاتف *" : "Numéro de téléphone *"}
                          </label>
                          <input
                            type="tel"
                            required
                            inputMode="numeric"
                            pattern="^(\+212|0)[5-7][0-9]{8}$"
                            maxLength={10}
                            placeholder="06 12 34 56 78"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full h-12 px-5 rounded-2xl bg-slate-50 text-slate-900 placeholder:text-slate-400 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent focus:outline-none transition-all text-xs font-bold shadow-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-2">
                            {isAr ? "البريد الإلكتروني" : "Adresse E-mail"}
                          </label>
                          <input
                            type="email"
                            placeholder="karim.bennani@exemple.com"
                            maxLength={80}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-12 px-5 rounded-2xl bg-slate-50 text-slate-900 placeholder:text-slate-400 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent focus:outline-none transition-all text-xs font-bold shadow-sm"
                          />
                        </div>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* Stepper Footer Buttons */}
                <div className="flex justify-between items-center mt-10 pt-6 border-t border-slate-100">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="h-12 px-6 rounded-2xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-black uppercase flex items-center gap-2 transition-all"
                    >
                      <ArrowLeft className="w-4.5 h-4.5" />
                      {isAr ? "الرجوع" : "Précédent"}
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      disabled={step === 1 && !coproprieteName}
                      className="h-12 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase flex items-center gap-2 transition-all ml-auto disabled:opacity-50 shadow-md shadow-blue-600/10"
                    >
                      {isAr ? "التالي" : "Suivant"}
                      <ArrowRight className="w-4.5 h-4.5" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting || !nom || !prenom || !phone}
                      className="h-12 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase flex items-center gap-2 transition-all ml-auto disabled:opacity-50 shadow-lg shadow-blue-600/10"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      ) : (
                        <>
                          {isAr ? "توليد عرض السعر" : "Soumettre & Générer"}
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* RIGHT COLUMN: Live Receipt Card */}
              <div className="lg:col-span-1">
                <div className="bg-white border border-slate-100 rounded-[2.5rem] p-6 md:p-8 shadow-xl shadow-slate-100/50 sticky top-10 space-y-6">
                  <div>
                    <h3 className="text-sm font-black text-brand-navy pb-3 border-b border-slate-100 uppercase tracking-wider">
                      {isAr ? "تفاصيل الفاتورة الفورية" : "Aperçu de l'estimation"}
                    </h3>
                  </div>

                  <div className="space-y-4 text-xs font-bold text-slate-500">
                    {coproprieteName && (
                      <div className="pb-3 border-b border-slate-100/60">
                        <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">
                          {isAr ? "اسم العقار" : "Copropriété"}
                        </span>
                        <span className="text-slate-800 font-black text-sm block">
                          {coproprieteName}
                        </span>
                        <span className="text-slate-400 text-[10px] flex items-center gap-1 mt-1 font-semibold capitalize">
                          <MapPin className="w-3 h-3 text-blue-500" /> {city}, Maroc
                        </span>
                      </div>
                    )}

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>{isAr ? "التسيير الإداري" : "Gestion admin"}</span>
                        <span className="text-slate-800 font-black">
                          {costs.admin.toLocaleString()} DH
                        </span>
                      </div>

                      {costs.menage > 0 && (
                        <div className="flex justify-between items-center">
                          <span>
                            {isAr ? "خدمة النظافة" : "Ménage"} ({menageFrequency}x/s)
                          </span>
                          <span className="text-slate-800 font-black">
                            +{costs.menage.toLocaleString()} DH
                          </span>
                        </div>
                      )}

                      {hasAscenseur && (
                        <div className="flex justify-between items-center">
                          <span>
                            {isAr ? "صيانة المصاعد" : "Ascenseur"} ({ascenseurCount}x)
                          </span>
                          <span className="text-slate-800 font-black">
                            +{costs.ascenseur.toLocaleString()} DH
                          </span>
                        </div>
                      )}

                      {securityLevel !== "none" && (
                        <div className="flex justify-between items-center">
                          <span>
                            {isAr ? "أمن وحراسة" : "Sécurité"} ({securityLevel.toUpperCase()})
                          </span>
                          <span className="text-slate-800 font-black">
                            +{costs.security.toLocaleString()} DH
                          </span>
                        </div>
                      )}

                      {hasEspacesVerts && (
                        <div className="flex justify-between items-center">
                          <span>{isAr ? "المساحات الخضراء" : "Espaces verts"}</span>
                          <span className="text-slate-800 font-black">
                            +{costs.green.toLocaleString()} DH
                          </span>
                        </div>
                      )}

                      {hasCameras && (
                        <div className="flex justify-between items-center">
                          <span>{isAr ? "كاميرات المراقبة" : "Vidéosurveillance"}</span>
                          <span className="text-slate-800 font-black">
                            +{costs.cameras.toLocaleString()} DH
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-slate-400">
                      <span>{isAr ? "المجموع الأولي" : "Sous-total"}</span>
                      <span>{costs.rawTotal.toLocaleString()} DH</span>
                    </div>

                    {costs.discount > 0 && (
                      <div className="flex justify-between items-center text-emerald-600 bg-emerald-50 p-2.5 rounded-xl border border-emerald-100">
                        <span>
                          {isAr
                            ? "خصم الحجم العقاري"
                            : `Remise volume (${costs.discountPct}%)`}
                        </span>
                        <span>-{costs.discount.toLocaleString()} DH</span>
                      </div>
                    )}

                    <div className="pt-5 border-t border-slate-200 text-center">
                      <div className="text-slate-400 text-[10px] font-black uppercase tracking-wider">
                        {isAr ? "الميزانية الشهرية الإجمالية" : "Budget Global Estimé / Mois"}
                      </div>
                      <div className="text-3xl font-black text-blue-600 mt-1">
                        {costs.total.toLocaleString()} DH
                      </div>

                      <div className="mt-3 p-3 rounded-2xl bg-blue-50 border border-blue-100 text-blue-700 inline-block w-full">
                        <div className="text-[10px] font-black uppercase opacity-75">
                          {isAr ? "مساهمة الشقة الواحدة تقديرياً" : "Quote-part par appartement"}
                        </div>
                        <div className="text-lg font-black mt-0.5">
                          {costs.perAppart.toFixed(0)} DH / {isAr ? "شهر" : "mois"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* STEP 4: Live Printable PDF Devis Document Screen */
            <DevisResultDocument
              isAr={isAr}
              prenom={prenom}
              nom={nom}
              phone={phone}
              email={email}
              role={role}
              coproprieteName={coproprieteName}
              city={city}
              apartmentsCount={apartmentsCount}
              floorsCount={floorsCount}
              menageFrequency={menageFrequency}
              hasAscenseur={hasAscenseur}
              ascenseurCount={ascenseurCount}
              securityLevel={securityLevel}
              hasEspacesVerts={hasEspacesVerts}
              hasCameras={hasCameras}
              costs={costs}
              onReset={handleReset}
            />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
