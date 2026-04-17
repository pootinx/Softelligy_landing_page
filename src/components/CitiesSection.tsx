"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useTranslation } from "@/context/LocaleContext";

const cities = [
    { key: "beniMellal", image: "/residences/Residence1.jpg" },
    { key: "temara", image: "/residences/Residence2.png" },
    { key: "casablanca", image: "/residences/Residence3.jpg" },
    { key: "marrakech", image: "/residences/Residence4.jpg" },
];

export default function CitiesSection() {
    const { t } = useTranslation();

    return (
        <section className="py-24 px-6 bg-white relative overflow-hidden" id="cities">
            {/* Background Degradation */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:5rem_5rem]" />
                <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 12, repeat: Infinity }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-brand/5 rounded-full blur-[120px]"
                />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/5 border border-brand/10 text-brand text-[10px] font-black uppercase tracking-[0.2em] mb-6"
                    >
                        <MapPin className="w-3 h-3" />
                        {t("cities.badge")}
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-black text-brand-navy leading-tight mb-6">
                        {t("cities.titlePrefix")}{" "}
                        <span className="text-brand">{t("cities.titleSuffix")}</span>
                    </h2>
                    <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
                        {t("cities.description")}
                    </p>
                </div>

                {/* Cities Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cities.map((city, i) => (
                        <motion.div
                            key={city.key}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative rounded-[2rem] overflow-hidden bg-white border border-slate-100 hover:shadow-2xl hover:shadow-brand/10 transition-all"
                        >
                            {/* Image */}
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={city.image}
                                    alt={t(`cities.list.${city.key}`)}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/20 to-transparent" />

                                {/* City name overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-2 h-2 rounded-full bg-brand-electric animate-pulse" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-electric">
                                            {t("cities.active")}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-black text-white">
                                        {t(`cities.list.${city.key}`)}
                                    </h3>
                                </div>
                            </div>

                            {/* Bottom info */}
                            <div className="p-5 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
                                    <MapPin className="w-3 h-3 text-brand" />
                                    {t("cities.morocco")}
                                </div>
                                <div className="w-8 h-8 rounded-lg bg-brand/5 flex items-center justify-center group-hover:bg-brand group-hover:text-white text-brand transition-all">
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                    </svg>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
