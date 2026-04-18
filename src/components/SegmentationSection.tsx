"use client";

import { motion } from "framer-motion";
import { Building2, ArrowRight, Globe } from "lucide-react";
import { useTranslation } from "@/context/LocaleContext";

export default function SegmentationSection() {
    const { t } = useTranslation();

    return (
        <section className="py-24 px-6 bg-brand-navy" id="expertise">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                        {t("expertise.title")}
                    </h2>
                    <p className="text-white/40 max-w-2xl mx-auto text-lg">
                        {t("expertise.subtitle")}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Tech Card */}
                    <motion.div
                        whileHover={{ y: -10 }}
                        className="group relative p-10 rounded-[2.5rem] bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/5 hover:border-brand-electric/50 transition-all overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Globe className="w-32 h-32 text-brand-electric" />
                        </div>

                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-brand-electric/10 rounded-2xl flex items-center justify-center mb-8 border border-brand-electric/20">
                                <Globe className="w-8 h-8 text-brand-electric" />
                            </div>
                            <h3 className="text-3xl font-black text-white mb-4">{t("expertise.tech.title")}</h3>
                            <p className="text-white/50 mb-8 leading-relaxed">
                                {t("expertise.tech.desc")}
                            </p>
                            <ul className="space-y-3 mb-10 text-sm font-semibold text-white/70">
                                {t("expertise.tech.features").map((feature: string, i: number) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-electric" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button className="flex items-center gap-2 text-brand-electric font-bold hover:gap-4 transition-all group/btn">
                                {t("common.startProject")} <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>

                    {/* Syndic Card */}
                    <motion.div
                        whileHover={{ y: -10 }}
                        className="group relative p-10 rounded-[2.5rem] bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/5 hover:border-brand-electric/50 transition-all overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Building2 className="w-32 h-32 text-brand-electric" />
                        </div>

                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-brand-electric/10 rounded-2xl flex items-center justify-center mb-8 border border-brand-electric/20">
                                <Building2 className="w-8 h-8 text-brand-electric" />
                            </div>
                            <h3 className="text-3xl font-black text-white mb-4">{t("expertise.syndic.title")}</h3>
                            <p className="text-white/50 mb-8 leading-relaxed">
                                {t("expertise.syndic.desc")}
                            </p>
                            <ul className="space-y-3 mb-10 text-sm font-semibold text-white/70">
                                {t("expertise.syndic.features").map((feature: string, i: number) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-electric" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button className="flex items-center gap-2 text-brand-electric font-bold hover:gap-4 transition-all group/btn">
                                {t("common.requestQuote")} <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
