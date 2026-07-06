// components/residences/ResidenceGrid.tsx
"use client";

import { motion } from "framer-motion";
import { Building, Star, Wrench } from "lucide-react";
import { CityDetails, Residence } from "./mockData";
import ResidenceCard from "./ResidenceCard";

interface ResidenceGridProps {
  cityDetails: CityDetails;
  isAr: boolean;
  responseTime: string;
  onSelectResidence: (residence: Residence) => void;
}

export default function ResidenceGrid({
  cityDetails,
  isAr,
  responseTime,
  onSelectResidence,
}: ResidenceGridProps) {
  return (
    <motion.div
      key="city-residences"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto px-6 md:px-12 py-10"
    >
      {/* Header info */}
      <div className="mb-10 text-center md:text-left">
        <span className="text-xs font-black uppercase tracking-[0.2em] text-brand bg-brand/5 px-4 py-1.5 rounded-full border border-brand/10">
          {isAr ? "إدارة القرب" : "Gestion Immobilière de Proximité"}
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-brand-navy mt-4 mb-3 leading-tight">
          {isAr ? cityDetails.titleAr : cityDetails.titleFr}
        </h1>
        <p className="text-slate-500 text-base md:text-lg max-w-3xl leading-relaxed">
          {isAr ? cityDetails.descriptionAr : cityDetails.descriptionFr}
        </p>
      </div>

      {/* Regional Stats Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand/5 flex items-center justify-center text-brand">
            <Building className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-brand-navy">{cityDetails.residencesCount}</div>
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              {isAr ? "إقامة مسيرة" : "Résidences Gérées"}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500">
            <Star className="w-6 h-6 fill-emerald-500" />
          </div>
          <div>
            <div className="text-2xl font-black text-brand-navy">{cityDetails.satisfactionRate}%</div>
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              {isAr ? "نسبة رضا الملاك" : "Taux de Satisfaction"}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-brand-navy">{responseTime}</div>
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              {isAr ? "سرعة الاستجابة" : "Délai de Réponse"}
            </div>
          </div>
        </div>
      </div>

      {/* List Header */}
      <div className="border-t border-slate-200/60 pt-10 mb-8">
        <h2 className="text-2xl font-black text-brand-navy flex items-center gap-2">
          <Building className="w-6 h-6 text-brand" />
          {isAr ? "إقاماتنا النموذجية بالجهة" : "Quelques Résidences sous notre Gestion"}
        </h2>
        <p className="text-slate-400 text-xs font-bold mt-1">
          {isAr
            ? "اختر إقامة للاطلاع على تفاصيل الصيانة والتسيير الخاصة بها"
            : "Cliquez sur une résidence pour consulter sa galerie, sa gestion technique et ses tarifs."}
        </p>
      </div>

      {/* Grid of Residences (Interactive cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cityDetails.residences.map((res: Residence) => (
          <ResidenceCard
            key={res.id}
            residence={res}
            isAr={isAr}
            onClick={() => onSelectResidence(res)}
          />
        ))}
      </div>
    </motion.div>
  );
}
