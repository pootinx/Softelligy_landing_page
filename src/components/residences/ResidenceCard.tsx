// components/residences/ResidenceCard.tsx
"use client";

import Image from "next/image";
import { MapPin, Users, Calendar, CheckCircle2, ChevronRight } from "lucide-react";
import { Residence } from "./mockData";

interface ResidenceCardProps {
  residence: Residence;
  isAr: boolean;
  onClick: () => void;
}

export default function ResidenceCard({ residence: res, isAr, onClick }: ResidenceCardProps) {
  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-brand/5 hover:border-brand/10 transition-all duration-300 cursor-pointer flex flex-col justify-between h-full"
    >
      <div>
        <div className="relative h-56 overflow-hidden bg-slate-100">
          <Image
            src={res.image}
            alt={res.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent" />

          <span
            className={`absolute top-4 right-4 text-[9px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-white shadow-sm border ${
              res.status === "active"
                ? "text-emerald-600 border-emerald-100"
                : res.status === "maintenance"
                ? "text-amber-600 border-amber-100"
                : "text-blue-600 border-blue-100"
            }`}
          >
            {isAr ? res.statusTextAr : res.statusTextFr}
          </span>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-black text-brand-navy mb-2 group-hover:text-brand transition-colors">
            {res.name}
          </h3>
          <p className="text-xs text-slate-400 font-bold flex items-center gap-1 mb-4">
            <MapPin className="w-3.5 h-3.5 text-brand" /> {res.address}
          </p>

          <div className="grid grid-cols-2 gap-4 py-4 border-t border-slate-100 text-xs font-bold text-slate-500">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-slate-400" />
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase">
                  {isAr ? "عدد الشقق" : "Appartements"}
                </div>
                <div className="text-slate-700 font-black">{res.apartments}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase">
                  {isAr ? "سنة الانضمام" : "Syndic Depuis"}
                </div>
                <div className="text-slate-700 font-black">{res.yearJoined}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 border-t border-slate-50 bg-slate-50/50 flex items-center justify-between">
        <span className="text-emerald-600 text-xs font-black flex items-center gap-1">
          <CheckCircle2 className="w-4 h-4" />
          {res.satisfaction}% {isAr ? "رضا الساكنة" : "Satisfaction"}
        </span>
        <div className="w-8 h-8 rounded-lg bg-brand/5 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all">
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
