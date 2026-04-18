"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, DollarSign, Activity } from "lucide-react";
import { useTranslation } from "@/context/LocaleContext";
import { cn } from "@/lib/utils";

export default function PremiumDashboard() {
    const { t } = useTranslation();

    return (
        <div className="w-full bg-[#030816] rounded-3xl border border-white/5 overflow-hidden shadow-2xl relative">
            {/* Dashboard Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-electric/10 border border-brand-electric/20 flex items-center justify-center">
                        <Activity className="w-5 h-5 text-brand-electric" />
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-sm">{t("dashboard.header.title")}</h4>
                        <p className="text-white/30 text-[10px] uppercase tracking-widest font-bold">{t("dashboard.header.subtitle")}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-brand-electric animate-pulse" />
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                </div>
            </div>

            <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Metrics */}
                <div className="space-y-6">
                    <MetricCard icon={Users} label={t("dashboard.metrics.residents")} value="5,248" trend="+12%" color="text-brand-electric" />
                    <MetricCard icon={DollarSign} label={t("dashboard.metrics.revenue")} value="$142.5k" trend="+8.4%" color="text-white" />
                    <MetricCard icon={TrendingUp} label={t("dashboard.metrics.compliance")} value="100%" trend="Law 18-00" color="text-brand-electric" />
                </div>

                {/* Middle Column: Main Graph */}
                <div className="lg:col-span-2 bg-white/[0.02] rounded-2xl border border-white/5 p-6 relative">
                    <div className="flex items-center justify-between mb-8">
                        <h5 className="text-white font-bold text-sm">{t("dashboard.chart.title")}</h5>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-brand-electric" />
                                <span className="text-[10px] text-white/40 font-bold">{t("dashboard.chart.revenue")}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-white/20" />
                                <span className="text-[10px] text-white/40 font-bold">{t("dashboard.chart.expenses")}</span>
                            </div>
                        </div>
                    </div>

                    {/* Animated SVG Graph */}
                    <div className="h-48 w-full relative">
                        <svg viewBox="0 0 400 100" className="w-full h-full">
                            <defs>
                                <linearGradient id="gradient-blue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
                                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            {/* Grid lines */}
                            <line x1="0" y1="20" x2="400" y2="20" stroke="white" strokeOpacity="0.05" strokeWidth="0.5" />
                            <line x1="0" y1="50" x2="400" y2="50" stroke="white" strokeOpacity="0.05" strokeWidth="0.5" />
                            <line x1="0" y1="80" x2="400" y2="80" stroke="white" strokeOpacity="0.05" strokeWidth="0.5" />

                            {/* Area */}
                            <motion.path
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                                d="M0,80 Q50,40 100,60 T200,30 T300,50 T400,20 V100 H0 Z"
                                fill="url(#gradient-blue)"
                            />

                            {/* Path */}
                            <motion.path
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                                d="M0,80 Q50,40 100,60 T200,30 T300,50 T400,20"
                                fill="none"
                                stroke="#3B82F6"
                                strokeWidth="2"
                            />

                            {/* Data points */}
                            {[
                                { x: 0, y: 80 }, { x: 100, y: 60 }, { x: 200, y: 30 }, { x: 300, y: 50 }, { x: 400, y: 20 }
                            ].map((p, i) => (
                                <motion.circle
                                    key={i}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 1 + (i * 0.2) }}
                                    cx={p.x} cy={p.y} r="2" fill="#3B82F6"
                                />
                            ))}
                        </svg>
                    </div>

                    <div className="grid grid-cols-6 mt-6 pb-2 border-t border-white/5 pt-4">
                        {["JAN", "FEB", "MAR", "APR", "MAY", "JUN"].map(m => (
                            <span key={m} className="text-[10px] text-white/20 font-black text-center">{m}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Footer Detail */}
            <div className="p-4 bg-white/5 border-t border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-electric animate-pulse" />
                    <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{t("dashboard.sync")}</span>
                </div>
                <div className="text-[10px] text-white/20 font-bold">Build v4.2.0-stable</div>
            </div>
        </div>
    );
}

interface MetricCardProps {
    icon: React.ElementType;
    label: string;
    value: string;
    trend: string;
    color: string;
}

function MetricCard({ icon: Icon, label, value, trend, color }: MetricCardProps) {
    return (
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-all group">
            <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-brand-electric/10 transition-colors">
                    <Icon className="w-4 h-4 text-white/40 group-hover:text-brand-electric transition-colors" />
                </div>
                <span className="text-[10px] font-black text-brand-electric">{trend}</span>
            </div>
            <p className="text-white/30 text-[10px] uppercase tracking-widest font-bold mb-1">{label}</p>
            <h5 className={cn("text-xl font-black", color)}>{value}</h5>
        </div>
    );
}
