"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "@/context/LocaleContext";

const staff = [
    { key: "security", image: "/Staff/security_guarde.png" },
    { key: "cleaning", image: "/Staff/cleaning_women.png" },
    { key: "camera", image: "/Staff/camera_technicien.png" },
    { key: "elevator", image: "/Staff/elevator_technicien.png" },
];

export default function StaffSection() {
    const { t } = useTranslation();

    return (
        <section className="py-24 px-6 bg-brand-navy relative overflow-hidden" id="staff">
            {/* Background Degradation */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] bg-brand-electric/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-electric/10 border border-brand-electric/20 text-brand-electric text-[10px] font-black uppercase tracking-[0.2em] mb-6"
                    >
                        {t("staff.badge")}
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
                        {t("staff.titlePrefix")}{" "}
                        <span className="text-brand-electric">{t("staff.titleSuffix")}</span>
                    </h2>
                    <p className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed">
                        {t("staff.description")}
                    </p>
                </div>

                {/* Staff Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {staff.map((member, i) => (
                        <motion.div
                            key={member.key}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative text-center"
                        >
                            {/* Photo Container */}
                            <div className="relative w-48 h-48 mx-auto mb-6 rounded-[2rem] overflow-hidden border-2 border-white/10 group-hover:border-brand-electric/50 transition-all shadow-2xl">
                                <Image
                                    src={member.image}
                                    alt={t(`staff.roles.${member.key}.title`)}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>

                            {/* Info */}
                            <h3 className="text-lg font-black text-white mb-2">
                                {t(`staff.roles.${member.key}.title`)}
                            </h3>
                            <p className="text-white/30 text-sm leading-relaxed max-w-[200px] mx-auto">
                                {t(`staff.roles.${member.key}.desc`)}
                            </p>

                            {/* Decorative dot */}
                            <div className="flex justify-center mt-4">
                                <div className="w-1.5 h-1.5 rounded-full bg-brand-electric/50" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
