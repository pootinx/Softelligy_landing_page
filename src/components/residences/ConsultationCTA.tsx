// components/residences/ConsultationCTA.tsx
"use client";

import { Sparkles, Send, CheckCircle2 } from "lucide-react";
import { useConsultationModal } from "@/context/ConsultationModalContext";

interface ConsultationCTAProps {
  residenceName: string;
  isAr: boolean;
}

export default function ConsultationCTA({ residenceName, isAr }: ConsultationCTAProps) {
  const { openModal } = useConsultationModal();

  return (
    <div className="sticky top-28 relative">
      <div className="absolute -top-10 -right-8 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-8 w-40 h-40 bg-brand/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-white shadow-[0_30px_90px_-15px_rgba(15,23,42,0.15)]">
        <div className="h-1.5 w-full bg-gradient-to-r from-brand via-blue-500 to-indigo-600" />

        <div className="p-8 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 text-[10px] font-black uppercase tracking-wider mb-4">
            <Sparkles className="w-3 h-3" />
            {isAr ? "استشارة مجانية" : "Consultation gratuite"}
          </span>

          <h3 className="text-2xl font-black text-brand-navy leading-tight tracking-tight mb-3">
            {isAr ? "مهتم بهاد الإقامة ؟" : "Intéressé par cette résidence ?"}
          </h3>

          <p className="text-slate-500 text-sm leading-relaxed font-semibold mb-6">
            {isAr
              ? `تواصل معنا بخصوص "${residenceName}" وسيتصل بك مستشارنا في أقرب وقت ممكن.`
              : `Contactez-nous au sujet de "${residenceName}" et notre conseiller vous répondra rapidement.`}
          </p>

          <button
            onClick={openModal}
            className="w-full h-12 rounded-xl font-black text-white text-xs uppercase tracking-wide transition-all duration-300 flex items-center justify-center gap-2 bg-gradient-to-r from-brand to-blue-600 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.99]"
          >
            <Send className="w-4 h-4" />
            {isAr ? "طلب استشارة" : "Demander une consultation"}
          </button>

          <div className="flex items-center justify-center gap-2 mt-5 text-[11px] font-bold text-slate-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            {isAr ? "رد سريع بدون التزام" : "Réponse rapide, sans engagement"}
          </div>
        </div>
      </div>
    </div>
  );
}
