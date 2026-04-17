"use client";

import { motion } from "framer-motion";
import { Layout, Database, Shield } from "lucide-react";
import PremiumDashboard from "./PremiumDashboard";
import { useTranslation } from "@/context/LocaleContext";

export default function SoftwareShowcase() {
    const { t } = useTranslation();

    const features = [
        { title: t("platform.features.0.title"), desc: t("platform.features.0.desc"), icon: Layout },
        { title: t("platform.features.1.title"), desc: t("platform.features.1.desc"), icon: Shield },
        { title: t("platform.features.2.title"), desc: t("platform.features.2.desc"), icon: Database },
    ];

    return (
        <section className="py-24 px-6 bg-brand-navy relative overflow-hidden" id="platform">
            {/* Background Degradation: Tech Grid & Data Streams */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {/* Deep Tech Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem]" />

                {/* Animated Data Streams (Horizontal Lines) */}
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ x: "-100%", opacity: 0 }}
                        animate={{ x: "200%", opacity: [0, 0.2, 0] }}
                        transition={{
                            duration: 8 + i * 2,
                            repeat: Infinity,
                            ease: "linear",
                            delay: i * 3,
                        }}
                        className="absolute h-px bg-gradient-to-r from-transparent via-brand-electric to-transparent w-1/2"
                        style={{ top: `${20 + i * 15}%` }}
                    />
                ))}

                {/* Background Glows */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[80%] bg-brand-electric/10 blur-[150px] rounded-full opacity-30" />
            </div>

            <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">
                <div className="text-center max-w-3xl mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-electric/10 border border-brand-electric/20 text-brand-electric text-[10px] font-black uppercase tracking-[0.2em] mb-6"
                    >
                        {t("platform.badge")}
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                        {t("platform.titlePrefix")} <span className="text-brand-electric">{t("platform.titleSuffix")}</span>
                    </h2>
                    <p className="text-white/40 text-lg leading-relaxed">
                        {t("platform.description")}
                    </p>
                </div>

                {/* Premium Code-Based Dashboard with Enhanced Context */}
                <div className="w-full relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-brand-electric/20 to-transparent blur opacity-25 group-hover:opacity-40 transition-opacity" />
                    <PremiumDashboard />

                    {/* Absolute Decorative Overlays */}
                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className="absolute -top-10 -right-10 hidden lg:block p-6 bg-white/5 backdrop-blur-3xl rounded-[2rem] border border-white/10 shadow-3xl z-20"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-3 h-3 rounded-full bg-brand-electric animate-ping" />
                            <span className="text-[10px] font-black text-white uppercase tracking-widest">LIVE DATA SYNC</span>
                        </div>
                    </motion.div>

                    {/* Corner Decorative Dots */}
                    <div className="absolute -bottom-6 -left-6 grid grid-cols-4 gap-2 opacity-20">
                        {[...Array(16)].map((_, i) => (
                            <div key={i} className="w-1 h-1 bg-white rounded-full" />
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mt-24 w-full">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            className="flex gap-6 p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-brand-electric/30 transition-all relative overflow-hidden"
                        >
                            {/* Item Background Degradation */}
                            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-brand-electric/5 rounded-full blur-xl" />

                            <feature.icon className="w-10 h-10 text-brand-electric shrink-0" />
                            <div>
                                <h4 className="text-xl font-bold text-white mb-2 tracking-tight">{feature.title}</h4>
                                <p className="text-white/40 text-[13px] leading-relaxed">{feature.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
