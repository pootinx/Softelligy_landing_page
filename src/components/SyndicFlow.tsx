"use client";

import { motion } from "framer-motion";
import { HandCoins, Hammer, Megaphone, BarChart3, ArrowRight } from "lucide-react";
import { useTranslation } from "@/context/LocaleContext";
import { cn } from "@/lib/utils";

export default function SyndicFlow() {
    const { t, dir } = useTranslation();

    const steps = [
        {
            title: t("syndicFlow.steps.0.title"),
            desc: t("syndicFlow.steps.0.desc"),
            icon: HandCoins,
            color: "bg-blue-500/10 text-blue-500",
        },
        {
            title: t("syndicFlow.steps.1.title"),
            desc: t("syndicFlow.steps.1.desc"),
            icon: Hammer,
            color: "bg-blue-600/10 text-blue-600",
        },
        {
            title: t("syndicFlow.steps.2.title"),
            desc: t("syndicFlow.steps.2.desc"),
            icon: Megaphone,
            color: "bg-brand/10 text-brand",
        },
        {
            title: t("syndicFlow.steps.3.title"),
            desc: t("syndicFlow.steps.3.desc"),
            icon: BarChart3,
            color: "bg-blue-900/10 text-blue-900",
        },
    ];

    return (
        <section className="py-24 px-6 bg-white relative overflow-hidden" id="syndic-process">
            {/* Background Degradation Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                {/* Subtle Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem]" />

                {/* Floating 3D-like Shapes */}
                <motion.div
                    animate={{ y: [0, -30, 0], rotate: [0, 45, 0] }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute top-20 right-[5%] w-64 h-64 bg-brand/5 rounded-3xl blur-3xl"
                />
                <motion.div
                    animate={{ x: [0, 20, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 15, repeat: Infinity }}
                    className="absolute bottom-40 left-[10%] w-96 h-96 bg-brand-electric/5 rounded-full blur-[100px]"
                />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-5xl font-black text-brand-navy leading-tight mb-6">
                            {t("syndicFlow.titlePrefix")} <br />
                            <span className="text-brand">{t("syndicFlow.titleSuffix")}</span>
                        </h2>
                        <p className="text-slate-500 text-lg leading-relaxed">
                            {t("syndicFlow.description")}
                        </p>
                    </div>
                    <button className="bg-brand-navy text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-brand transition-all">
                        {t("common.scheduleVisit")} <ArrowRight className={cn("w-5 h-5", dir === "rtl" && "rotate-180")} />
                    </button>
                </div>

                <div className="grid md:grid-cols-4 gap-8 relative">
                    {/* Connector Line (Desktop) */}
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-100 -translate-y-1/2 hidden md:block z-0" />

                    {steps.map((step, i) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="relative z-10 p-8 rounded-[2rem] bg-white border border-slate-100 hover:shadow-2xl hover:shadow-brand/5 transition-all group overflow-hidden"
                        >
                            {/* Background Step Number (Degradation) */}
                            <div className={cn(
                                "absolute -bottom-10 text-[10rem] font-black text-brand/5 pointer-events-none select-none",
                                dir === "rtl" ? "-left-4" : "-right-4"
                            )}>
                                0{i + 1}
                            </div>

                            <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10`}>
                                <step.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-brand-navy mb-4 relative z-10">{step.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed relative z-10">{step.desc}</p>

                            {/* Step indicator */}
                            <div className={cn(
                                "absolute top-4 w-8 h-8 flex items-center justify-center text-[10px] font-black text-slate-200 border border-slate-100 rounded-full",
                                dir === "rtl" ? "left-4" : "right-4"
                            )}>
                                {i + 1}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
