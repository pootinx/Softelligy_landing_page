// components/residences/ResidenceDetails.tsx
"use client";

import { motion } from "framer-motion";
import { MapPin, Star, Shield, Sparkles, Wrench, TrendingUp, Info } from "lucide-react";
import { Residence } from "./mockData";
import ResidenceGallery from "./ResidenceGallery";
import PrestationItem from "./PrestationItem";
import ConsultationCTA from "./ConsultationCTA";

interface ResidenceDetailsProps {
  residence: Residence;
  isAr: boolean;
}

export default function ResidenceDetails({ residence: selectedResidence, isAr }: ResidenceDetailsProps) {
  return (
    <motion.div
      key="residence-details"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto px-6 md:px-12 py-10"
    >
      {/* Header / Title */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-5xl font-black text-brand-navy mb-4 leading-tight">
          {selectedResidence.name}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-slate-500">
          <span className="flex items-center gap-1 text-slate-800">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            {(selectedResidence.satisfaction / 20).toFixed(2)}
          </span>
          <span>•</span>
          <span className="text-slate-800 font-black">
            {selectedResidence.apartments} {isAr ? "شقة سكنية" : "appartements"}
          </span>
          <span>•</span>
          <span className="text-slate-600 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-brand" />
            {selectedResidence.address}
          </span>
        </div>
      </div>

      {/* 5-Image Gallery Grid */}
      <ResidenceGallery images={selectedResidence.images} residenceName={selectedResidence.name} />

      {/* Content Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-12">
          {/* Prestations */}
          <div className="space-y-6">
            <h3 className="text-lg font-black text-brand-navy">
              {isAr ? "التزامات السنديك الأساسية بالبناية" : "Prestations Syndic Assurées"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <PrestationItem
                icon={Shield}
                iconBgClass="bg-emerald-50"
                iconBorderClass="border-emerald-100"
                iconColorClass="text-emerald-600"
                title={isAr ? "حراسة وأمن H24" : "Sécurité & Gardiennage H24"}
                description={
                  isAr
                    ? "كاميرات مراقبة وحراس أمن متواجدين على مدار الساعة لضمان هدوء الإقامة."
                    : "Agents de sécurité qualifiés et systèmes de vidéosurveillance connectés pour votre sérénité."
                }
              />
              <PrestationItem
                icon={Sparkles}
                iconBgClass="bg-blue-50"
                iconBorderClass="border-blue-100"
                iconColorClass="text-blue-600"
                title={isAr ? "نظافة وصيانة مستمرة" : "Nettoyage & Propreté Pro"}
                description={
                  isAr
                    ? "تنظيف دوري للممرات، الدرج، كنس المواقف والتخلص المنتظم من النفايات."
                    : "Nettoyage rigoureux des parties communes, entretien des espaces verts et gestion écologique des déchets."
                }
              />
              <PrestationItem
                icon={Wrench}
                iconBgClass="bg-amber-50"
                iconBorderClass="border-amber-100"
                iconColorClass="text-amber-600"
                title={isAr ? "صيانة تقنية سريعة" : "Assistance Technique Réactive"}
                description={
                  isAr
                    ? "عقود صيانة للمصاعد والمضخات الكهربائية مع تدخلات طارئة سريعة."
                    : "Maintenance préventive des ascenseurs, surpresseurs d'eau, et éclairages communs avec astreinte technique."
                }
              />
              <PrestationItem
                icon={TrendingUp}
                iconBgClass="bg-indigo-50"
                iconBorderClass="border-indigo-100"
                iconColorClass="text-indigo-600"
                title={isAr ? "تدبير مالي شفاف" : "Transparence Budgétaire"}
                description={
                  isAr
                    ? "تقارير مالية شهرية واضحة، وتسهيل أداء الواجبات عبر منصتنا الرقمية."
                    : "Comptabilité analytique dédiée, consultation des comptes en ligne 24/7 et relance automatisée des impayés."
                }
              />
            </div>
          </div>

          <hr className="border-slate-100" />

          <div className="space-y-4">
            <h3 className="text-lg font-black text-brand-navy">
              {isAr ? "تفاصيل العقار" : "Description détaillée"}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {isAr ? selectedResidence.descriptionAr : selectedResidence.descriptionFr}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
              <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm text-center">
                <div className="text-lg font-black text-brand">{selectedResidence.yearJoined}</div>
                <div className="text-[9px] uppercase tracking-wider text-slate-400 font-bold mt-1">
                  {isAr ? "سنة الانضمام" : "Intégration"}
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm text-center">
                <div className="text-lg font-black text-brand-navy">{selectedResidence.apartments}</div>
                <div className="text-[9px] uppercase tracking-wider text-slate-400 font-bold mt-1">
                  {isAr ? "الشقق" : "Appartements"}
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm text-center">
                <div className="text-lg font-black text-brand">{selectedResidence.satisfaction}%</div>
                <div className="text-[9px] uppercase tracking-wider text-slate-400 font-bold mt-1">
                  {isAr ? "نسبة الرضا" : "Indice de satisfaction"}
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm text-center">
                <div className="text-lg font-black text-brand-navy">Conforme</div>
                <div className="text-[9px] uppercase tracking-wider text-slate-400 font-bold mt-1">
                  {isAr ? "الحالة الفنية" : "Statut technique"}
                </div>
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          <div className="p-5 rounded-[2rem] bg-brand/5 border border-brand/10 flex items-start gap-4">
            <Info className="w-5 h-5 text-brand shrink-0 mt-0.5" />
            <p className="text-xs text-slate-600 leading-relaxed font-semibold">
              {isAr
                ? "نحرص على توفير تقارير واضحة ومتابعة مستمرة لجميع أعمال الصيانة والتدبير، بما يضمن الشفافية وجودة الخدمات."
                : "Nous veillons à fournir des rapports clairs ainsi qu'un suivi continu de l'ensemble des opérations de maintenance et de gestion, afin de garantir la transparence et la qualité de nos services."}
            </p>
          </div>
        </div>

        {/* Right Column - CTA vers le formulaire global de consultation */}
        <div className="lg:col-span-1">
          <ConsultationCTA residenceName={selectedResidence.name} isAr={isAr} />
        </div>
      </div>
    </motion.div>
  );
}
