"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Printer } from "lucide-react";
import type { DevisCosts } from "./DevisCalculator";

interface DevisResultDocumentProps {
  isAr: boolean;
  prenom: string;
  nom: string;
  phone: string;
  email: string;
  role: string;
  coproprieteName: string;
  city: string;
  apartmentsCount: number;
  floorsCount: number;
  menageFrequency: string;
  hasAscenseur: boolean;
  ascenseurCount: number;
  securityLevel: string;
  hasEspacesVerts: boolean;
  hasCameras: boolean;
  costs: DevisCosts;
  onReset: () => void;
}

export default function DevisResultDocument({
  isAr,
  prenom,
  nom,
  phone,
  email,
  role,
  coproprieteName,
  city,
  apartmentsCount,
  floorsCount,
  menageFrequency,
  hasAscenseur,
  ascenseurCount,
  securityLevel,
  hasEspacesVerts,
  hasCameras,
  costs,
  onReset,
}: DevisResultDocumentProps) {
  return (
    <motion.div
      key="pdf-summary"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-[2.5rem] p-6 md:p-12 shadow-2xl relative overflow-hidden space-y-8"
    >
      <div className="absolute top-0 left-0 right-0 h-3 bg-blue-600" />

      <div className="flex items-center gap-4 p-5 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-950 shadow-sm">
        <CheckCircle2 className="w-8 h-8 text-emerald-500 shrink-0" />
        <div>
          <h4 className="text-sm font-black">
            {isAr
              ? "تم إرسال وحساب عرض السعر !"
              : "Votre Devis Estimatif Syndic est disponible !"}
          </h4>
          <p className="text-[11px] opacity-80 font-bold mt-1">
            {isAr
              ? `شكراً لك ${prenom} ${nom}. لقد تم إرسال نسخة تقديرية لبيانات الإقامة ${coproprieteName} إلى الهاتف ${phone}.`
              : `Merci ${prenom} ${nom}. Notre équipe technique régionale a reçu votre demande de devis syndic.`}
          </p>
        </div>
      </div>

      {/* PDF Sheet */}
      <div className="border border-slate-200 rounded-3xl p-6 md:p-8 space-y-8 bg-white shadow-sm relative print:border-none print:p-0">
        <div className="flex justify-between items-start gap-4">
          <div>
            <div className="text-xl font-black text-brand-navy tracking-tight">
              SYNDIC IMMOBILIER
            </div>
            <div className="text-[9px] uppercase tracking-widest text-slate-400 font-bold mt-0.5">
              Gestion de Copropriété Moderne
            </div>
          </div>
          <div className="text-right text-xs text-slate-400 font-bold">
            <div>Devis N°: #SYN-DEVIS-{Math.floor(1000 + Math.random() * 9000)}</div>
            <div>Date: {new Date().toLocaleDateString()}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 text-xs border-y border-slate-100 py-4">
          <div>
            <div className="text-slate-400 font-black uppercase text-[9px] mb-1">
              {isAr ? "صاحب الطلب" : "Demandeur / Client"}
            </div>
            <div className="font-black text-slate-800">
              {prenom} {nom}
            </div>
            <div className="text-slate-500 font-bold mt-0.5">{phone}</div>
            <div className="text-slate-500 font-bold">{email || "-"}</div>
            <div className="text-slate-400 font-bold capitalize mt-1">
              Rôle: {role}
            </div>
          </div>
          <div>
            <div className="text-slate-400 font-black uppercase text-[9px] mb-1">
              {isAr ? "العقار والموقع" : "Copropriété Cible"}
            </div>

            <div className="text-slate-500 font-bold mt-0.5">
              Ville: <span className="capitalize">{city}</span>
            </div>
            <div className="text-slate-500 font-bold">
              Taille: {apartmentsCount} appartements • {floorsCount} étages
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
            {isAr
              ? "تفصيل الخدمات ومصاريف التسيير"
              : "Prestations syndic incluses"}
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100 text-xs">
            <div className="p-3.5 flex justify-between bg-slate-50/50">
              <div>
                <div className="font-black text-slate-800">
                  {isAr
                    ? "أتعاب التسيير الإداري"
                    : "Honoraires de syndic de base"}
                </div>
                <div className="text-[10px] text-slate-400 font-bold">
                  Tenue comptable, convocations AG, recouvrement impayés
                </div>
              </div>
              <div className="font-black text-slate-800">
                {costs.admin.toLocaleString()} DH
              </div>
            </div>

            {costs.menage > 0 && (
              <div className="p-3.5 flex justify-between">
                <div>
                  <div className="font-black text-slate-800">
                    {isAr
                      ? "خدمة التنظيف والمناولة"
                      : "Nettoyage & Ménage commun"}
                  </div>
                  <div className="text-[10px] text-slate-400 font-bold">
                    Fréquence : {menageFrequency} jours de passage par semaine
                  </div>
                </div>
                <div className="font-black text-slate-800">
                  +{costs.menage.toLocaleString()} DH
                </div>
              </div>
            )}

            {hasAscenseur && (
              <div className="p-3.5 flex justify-between bg-slate-50/50">
                <div>
                  <div className="font-black text-slate-800">
                    {isAr
                      ? "صيانة وتأمين المصاعد"
                      : "Contrat maintenance ascenseurs"}
                  </div>
                  <div className="text-[10px] text-slate-400 font-bold">
                    {ascenseurCount} ascenseur(s) + électricité cabine active
                  </div>
                </div>
                <div className="font-black text-slate-800">
                  +{costs.ascenseur.toLocaleString()} DH
                </div>
              </div>
            )}

            {securityLevel !== "none" && (
              <div className="p-3.5 flex justify-between">
                <div>
                  <div className="font-black text-slate-800">
                    {isAr ? "حراسة وأمن" : "Sécurité & Gardiennage d'immeuble"}
                  </div>
                  <div className="text-[10px] text-slate-400 font-bold">
                    Couverture horaire : {securityLevel.toUpperCase()}
                  </div>
                </div>
                <div className="font-black text-slate-800">
                  +{costs.security.toLocaleString()} DH
                </div>
              </div>
            )}

            {hasEspacesVerts && (
              <div className="p-3.5 flex justify-between bg-slate-50/50">
                <div>
                  <div className="font-black text-slate-800">
                    {isAr
                      ? "صيانة المساحات الخضراء"
                      : "Espaces verts & Jardins"}
                  </div>
                  <div className="text-[10px] text-slate-400 font-bold">
                    Tonte pelouses, entretien des haies et plantes
                  </div>
                </div>
                <div className="font-black text-slate-800">
                  +{costs.green.toLocaleString()} DH
                </div>
              </div>
            )}

            {hasCameras && (
              <div className="p-3.5 flex justify-between">
                <div>
                  <div className="font-black text-slate-800">
                    {isAr
                      ? "صيانة وتأمين كاميرات المراقبة"
                      : "Vidéosurveillance technique"}
                  </div>
                  <div className="text-[10px] text-slate-400 font-bold">
                    Contrat annuel de dépannage caméras
                  </div>
                </div>
                <div className="font-black text-slate-800">
                  +{costs.cameras.toLocaleString()} DH
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-col items-end gap-2 text-right">
          <div className="text-xs font-bold text-slate-400">
            {isAr ? "المجموع الأولي :" : "Sous-total :"}{" "}
            <span className="text-slate-800 font-black ml-2">
              {costs.rawTotal.toLocaleString()} DH / mois
            </span>
          </div>
          {costs.discount > 0 && (
            <div className="text-xs font-black text-emerald-600">
              {isAr
                ? "خصم المجمع السكني :"
                : `Remise volume (${costs.discountPct}%) :`}{" "}
              <span className="ml-2">-{costs.discount.toLocaleString()} DH</span>
            </div>
          )}
          <div className="mt-2 p-4 rounded-2xl bg-blue-50/60 border border-blue-100 w-full md:w-80">
            <div className="text-[10px] font-black uppercase text-slate-500 tracking-wider">
              {isAr ? "الميزانية الإجمالية التقديرية" : "Budget Global Estimé"}
            </div>
            <div className="text-2xl font-black text-blue-600 mt-1">
              {costs.total.toLocaleString()} DH / {isAr ? "شهر" : "mois"}
            </div>
            <div className="text-[10px] font-bold text-slate-500 mt-1">
              {isAr
                ? `أي ما يعادل ${costs.perAppart.toFixed(0)} درهم للشقة شهرياً`
                : `Soit environ ${costs.perAppart.toFixed(0)} DH par appartement / mois`}
            </div>
          </div>
        </div>

        <div className="text-[9px] text-slate-400 leading-relaxed font-bold border-t border-slate-100 pt-4 text-center">
          * Ce document est une estimation budgétaire de fonctionnement de
          syndic de copropriété calculée sur la base des tarifs moyens
          régionaux. Une visite technique est requise pour confirmation.
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <button
          type="button"
          onClick={() => window.print()}
          className="h-12 px-5 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-black uppercase flex items-center gap-2 transition-all"
        >
          <Printer className="w-4.5 h-4.5" />
          {isAr ? "طباعة عرض السعر" : "Imprimer le Devis"}
        </button>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onReset}
            className="h-12 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black uppercase transition-all"
          >
            {isAr ? "حساب جديد" : "Nouveau Devis"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
