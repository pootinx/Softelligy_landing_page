// CityDetailModal.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { CityDetails, Residence } from "./mockData";
import ResidenceGrid from "./ResidenceGrid";
import ResidenceDetails from "./ResidenceDetails";

interface CityDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  city: { key: string; image: string } | null;
  t: (key: string) => string;
  locale: string;
  cityDetails: CityDetails | undefined;
}

export default function CityDetailModal({
  isOpen,
  onClose,
  city,
  t,
  locale = "fr",
  cityDetails
}: CityDetailModalProps) {
  // State 1: selectedResidence (null = grid mode, Residence = detail mode)
  const [selectedResidence, setSelectedResidence] = useState<Residence | null>(null);

  // Prevent background scrolling when view is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Reset selected residence when the modal is closed
  useEffect(() => {
    if (!isOpen) {
      setSelectedResidence(null);
    }
  }, [isOpen]);

  if (!city || !cityDetails) return null;

  const isAr = locale === "ar";
  const responseTime = isAr ? cityDetails.avgResponseTimeAr : cityDetails.avgResponseTimeFr;

  // Click handler to go back step-by-step
  const handleBack = () => {
    if (selectedResidence) {
      // Step 2 -> Step 1 (Go back to Residences Grid of the city)
      setSelectedResidence(null);
    } else {
      // Step 1 -> Exit (Go back to homepage cities)
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "100%" }}
      transition={{ type: "tween", duration: 0.45, ease: "easeInOut" }}
      className={`fixed inset-0 w-screen h-screen bg-slate-50 z-50 overflow-y-auto ${
        isOpen ? "block" : "hidden"
      }`}
    >
      {/* Top Navigation Bar */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-md z-30 border-b border-slate-100 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-3 text-slate-600 hover:text-slate-900 group transition-all"
          >
            <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center bg-slate-50 group-hover:bg-slate-100 transition-colors">
              <ArrowLeft className={`w-5 h-5 group-hover:-translate-x-0.5 transition-transform ${isAr ? "rotate-180" : ""}`} />
            </div>
            <span className="text-sm font-black tracking-wide">
              {selectedResidence
                ? isAr ? "الرجوع لقائمة الإقامات" : "Retour aux résidences"
                : isAr ? "الرجوع للرئيسية" : "Retour à l'accueil"
              }
            </span>
          </button>

          {/* Breadcrumbs path */}
          <div className="hidden md:flex items-center gap-2 text-xs font-bold text-slate-400">
            <span>{isAr ? "الرئيسية" : "Accueil"}</span>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className={!selectedResidence ? "text-brand" : "text-slate-500"}>
              {isAr ? cityDetails.titleAr : cityDetails.titleFr}
            </span>
            {selectedResidence && (
              <>
                <ChevronRight className="w-3 h-3 text-slate-300" />
                <span className="text-brand">{selectedResidence.name}</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-brand/5 border border-brand/10 text-brand text-[11px] font-black uppercase tracking-wider">
              {selectedResidence 
                ? (isAr ? "تفاصيل الإقامة" : "Détails Résidence") 
                : (isAr ? "إقامات الجهة" : "Résidences Gérées")
              }
            </span>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!selectedResidence ? (
          <ResidenceGrid
            cityDetails={cityDetails}
            isAr={isAr}
            responseTime={responseTime}
            onSelectResidence={setSelectedResidence}
          />
        ) : (
          <ResidenceDetails residence={selectedResidence} isAr={isAr} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
