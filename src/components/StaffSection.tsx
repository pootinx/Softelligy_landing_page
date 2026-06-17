"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "@/context/LocaleContext";
import { useFirestoreCollection } from "@/lib/hooks/useCollection";

export default function StaffSection() {
    const { t } = useTranslation();
    const { items: remoteStaff, loading } = useFirestoreCollection('staff', 'order');

    const fallbackStaff = [
        { key: "security", name: t("staff.roles.security.title"), role: t("staff.roles.security.title"), description: t("staff.roles.security.desc"), imageUrl: "/Staff/security_guarde.png" },
        { key: "cleaning", name: t("staff.roles.cleaning.title"), role: t("staff.roles.cleaning.title"), description: t("staff.roles.cleaning.desc"), imageUrl: "/Staff/cleaning_women.png" },
        { key: "camera", name: t("staff.roles.camera.title"), role: t("staff.roles.camera.title"), description: t("staff.roles.camera.desc"), imageUrl: "/Staff/camera_technicien.png" },
        { key: "elevator", name: t("staff.roles.elevator.title"), role: t("staff.roles.elevator.title"), description: t("staff.roles.elevator.desc"), imageUrl: "/Staff/elevator_technicien.png" },
    ];

    const staff = remoteStaff && remoteStaff.length > 0
      ? remoteStaff.map((m: any, i: number) => ({
          key: m.id || i.toString(),
          name: m.name || m.role,
          role: m.role,
          description: m.description,
          imageUrl: (m.imageUrl && !m.imageUrl.includes("security_guarde.png") && !m.imageUrl.includes("cleaning_women.png") && !m.imageUrl.includes("camera_technicien.png") && !m.imageUrl.includes("elevator_technicien.png")) ? m.imageUrl : fallbackStaff[i % fallbackStaff.length].imageUrl,
        }))
      : fallbackStaff;

    return (
        <section className="py-24 px-6 bg-brand-navy relative overflow-hidden" id="staff">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] bg-brand-electric/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
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

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {staff.map((member: any, i: number) => (
                        <motion.div
                            key={member.key}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative text-center"
                        >
                            <div className="relative w-48 h-48 mx-auto mb-6 rounded-[2rem] overflow-hidden border-2 border-white/10 group-hover:border-brand-electric/50 transition-all shadow-2xl">
                                <Image
                                    src={member.imageUrl}
                                    alt={member.role}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>

                            <h3 className="text-lg font-black text-white mb-2">
                                {loading ? <div className="w-24 h-6 bg-white/20 animate-pulse rounded mx-auto" /> : member.name}
                            </h3>
                            <p className="text-white/30 text-sm leading-relaxed max-w-[200px] mx-auto">
                                {loading ? <span className="w-full h-12 bg-white/10 animate-pulse rounded mx-auto inline-block" /> : member.description}
                            </p>

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
