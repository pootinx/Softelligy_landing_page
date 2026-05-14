"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/context/LocaleContext";
import { useSiteContent } from "@/context/SiteContentContext";

export default function StatsSection() {
    const { t } = useTranslation();
    const { page } = useSiteContent();
    const stats = page?.sections?.stats;

    const items = [
        { label: t("stats.projects"), value: stats?.projects || "200+", subtext: t("stats.projectsSub") },
        { label: t("stats.buildings"), value: stats?.buildings || "150+", subtext: t("stats.buildingsSub") },
        { label: t("stats.residents"), value: stats?.residents || "5,000+", subtext: t("stats.residentsSub") },
        { label: t("stats.satisfaction"), value: stats?.satisfaction || "98%", subtext: t("stats.satisfactionSub") },
    ];

    return (
        <section className="bg-brand-navy py-20 border-y border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                    {items.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <h3 className="text-4xl md:text-5xl font-black text-white mb-2">{stat.value}</h3>
                            <p className="text-brand-electric font-bold text-xs uppercase tracking-widest mb-1">{stat.label}</p>
                            <p className="text-white/20 text-[10px] font-medium uppercase tracking-widest">{stat.subtext}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
