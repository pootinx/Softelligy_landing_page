"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/context/LocaleContext";
import { useSiteContent } from "@/context/SiteContentContext";
import { useFirestoreDoc } from "@/lib/hooks/useDoc";

export default function StatsSection() {
    const { t } = useTranslation();
    const { page } = useSiteContent();
    const existingStats = page?.sections?.stats;
    const { data, loading } = useFirestoreDoc('site_config', 'stats');

    const items = [
        { 
            label: data?.projectsLabel ?? t("stats.projects"), 
            value: data?.projects ?? existingStats?.projects ?? "200+", 
            subtext: data?.projectsSub ?? t("stats.projectsSub") 
        },
        { 
            label: data?.buildingsLabel ?? t("stats.buildings"), 
            value: data?.buildings ?? existingStats?.buildings ?? "150+", 
            subtext: data?.buildingsSub ?? t("stats.buildingsSub") 
        },
        { 
            label: data?.residentsLabel ?? t("stats.residents"), 
            value: data?.residents ?? existingStats?.residents ?? "5,000+", 
            subtext: data?.residentsSub ?? t("stats.residentsSub") 
        },
        { 
            label: data?.satisfactionLabel ?? t("stats.satisfaction"), 
            value: data?.satisfaction ?? existingStats?.satisfaction ?? "98%", 
            subtext: data?.satisfactionSub ?? t("stats.satisfactionSub") 
        },
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
                            <h3 className="text-4xl md:text-5xl font-black text-white mb-2">
                                {loading ? <span className="w-24 h-10 bg-white/20 animate-pulse rounded mx-auto block" /> : stat.value}
                            </h3>
                            <p className="text-brand-electric font-bold text-xs uppercase tracking-widest mb-1">
                                {loading ? <span className="w-20 h-4 bg-brand-electric/20 animate-pulse rounded mx-auto block" /> : stat.label}
                            </p>
                            <p className="text-white/40 text-sm font-medium mt-1">
                                {loading ? <span className="w-32 h-3 bg-white/10 animate-pulse rounded mx-auto inline-block" /> : stat.subtext}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
