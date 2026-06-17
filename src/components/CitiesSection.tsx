"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useTranslation } from "@/context/LocaleContext";
import { useFirestoreCollection } from "@/lib/hooks/useCollection";

export default function CitiesSection() {
    const { t } = useTranslation();
    const { items: remoteResidences, loading } = useFirestoreCollection('residences', 'order');

    const fallbackCities = [
        { key: "beniMellal", city: t("cities.list.beniMellal"), country: t("cities.morocco"), status: "active", image: "/residences/Residence1.jpg" },
        { key: "temara", city: t("cities.list.temara"), country: t("cities.morocco"), status: "active", image: "/residences/Residence2.png" },
        { key: "casablanca", city: t("cities.list.casablanca"), country: t("cities.morocco"), status: "active", image: "/residences/Residence3.jpg" },
        { key: "marrakech", city: t("cities.list.marrakech"), country: t("cities.morocco"), status: "active", image: "/residences/Residence4.jpg" },
    ];

    const cities = remoteResidences && remoteResidences.length > 0
      ? remoteResidences.map((c: any, i: number) => ({
          key: c.id || i.toString(),
          city: c.city,
          country: c.country,
          status: c.status,
          image: (c.imageUrl && !c.imageUrl.includes("casablanca.png") && !c.imageUrl.includes("rabat.png") && !c.imageUrl.includes("marrakech.png") && !c.imageUrl.includes("agadir.png") && !c.imageUrl.includes("tanger.png")) ? c.imageUrl : fallbackCities[i % fallbackCities.length].image,
        }))
      : fallbackCities;

    return (
        <section className="py-24 px-6 bg-white relative overflow-hidden" id="cities">
            <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:5rem_5rem]" />
                <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 12, repeat: Infinity }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-brand/5 rounded-full blur-[120px]"
                />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
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

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cities.map((city: any, i: number) => (
                        <motion.div
                            key={city.key}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative rounded-[2rem] overflow-hidden bg-white border border-slate-100 hover:shadow-2xl hover:shadow-brand/10 transition-all"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={city.image}
                                    alt={city.city}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className={`w-2 h-2 rounded-full ${city.status === 'inactive' ? 'bg-slate-400' : 'bg-brand-electric animate-pulse'}`} />
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${city.status === 'inactive' ? 'text-slate-400' : 'text-brand-electric'}`}>
                                            {loading ? <span className="w-12 h-3 bg-brand-electric/20 animate-pulse rounded inline-block" /> : (city.status === 'inactive' ? t("cities.inactive") : t("cities.active"))}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-black text-white">
                                        {loading ? <div className="w-32 h-8 bg-white/20 animate-pulse rounded" /> : city.city}
                                    </h3>
                                </div>
                            </div>
                            <div className="p-5 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
                                    <MapPin className="w-3 h-3 text-brand" />
                                    {loading ? <span className="w-16 h-3 bg-slate-200 animate-pulse rounded inline-block" /> : city.country}
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
