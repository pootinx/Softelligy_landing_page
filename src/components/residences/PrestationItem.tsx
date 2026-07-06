// components/residences/PrestationItem.tsx
"use client";

import { LucideIcon } from "lucide-react";

interface PrestationItemProps {
  icon: LucideIcon;
  iconBgClass: string;
  iconBorderClass: string;
  iconColorClass: string;
  title: string;
  description: string;
}

export default function PrestationItem({
  icon: Icon,
  iconBgClass,
  iconBorderClass,
  iconColorClass,
  title,
  description,
}: PrestationItemProps) {
  return (
    <div className="flex gap-4">
      <div
        className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 ${iconBgClass} ${iconBorderClass} ${iconColorClass}`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h4 className="font-bold text-slate-800 text-sm mb-1">{title}</h4>
        <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
