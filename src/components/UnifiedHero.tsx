"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "@/context/LocaleContext";
import { cn } from "@/lib/utils";

export default function UnifiedHero() {
    const { t, dir } = useTranslation();

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-brand-navy pt-20">
            {/* Background with 3D pattern + Degradation Layers */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero-bg.png"
                    alt="Abstract 3D Background"
                    fill
                    className="object-cover opacity-30 mix-blend-overlay"
                    priority
                />

                {/* Procedural Degradation: Tech Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />

                {/* Animated Architectural Lines */}
                <div className="absolute inset-0 opacity-10">
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ rotate: 45, x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{ duration: 15 + i * 5, repeat: Infinity, ease: "linear" }}
                            className="absolute h-[500%] w-px bg-brand-electric/50"
                            style={{ left: `${30 + i * 20}%`, top: "-100%" }}
                        />
                    ))}
                </div>

                <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/40 via-brand-navy/80 to-brand-navy" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-electric/10 border border-brand-electric/20 text-brand-electric text-[10px] font-black uppercase tracking-[0.3em] mb-10 shadow-2xl">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-electric opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-electric"></span>
                        </span>
                        {t("hero.tagline")}
                    </div>

                    <h1 className={cn(
                        "text-6xl md:text-[7rem] font-black text-white leading-[1] mb-10 tracking-tighter",
                        t("hero.lang") === "ar" && "md:text-[6rem]"
                    )}>
                        {t("hero.headlinePrefix")} <br />& <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-electric via-blue-400 to-white">{t("hero.headlineSuffix")}</span>
                    </h1>

                    <p className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto mb-16 leading-relaxed font-medium">
                        {t("hero.description")}
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                        <button className="relative group overflow-hidden bg-brand text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-xs transition-all hover:bg-white hover:text-brand-navy shadow-3xl">
                            <span className="relative z-10 flex items-center gap-4">
                                {t("common.getConsultation")}
                                <ArrowRight className={cn("w-5 h-5 group-hover:translate-x-1 transition-transform", dir === "rtl" && "rotate-180")} />
                            </span>
                        </button>

                        <button className="flex items-center gap-4 text-white font-bold px-12 py-6 rounded-2xl border border-white/10 hover:bg-white/5 transition-all uppercase tracking-widest text-xs">
                            {t("common.exploreServices")}
                            <ChevronRight className={cn("w-5 h-5 text-brand-electric", dir === "rtl" && "rotate-180")} />
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Floating 3D/Glass Elements (Degradation) */}
            <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-40 right-[15%] w-72 h-72 bg-white/5 backdrop-blur-3xl rounded-[4rem] border border-white/10 hidden lg:block -rotate-12 shadow-3xl overflow-hidden"
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#3B82F620,transparent)]" />
            </motion.div>

            <motion.div
                animate={{ y: [0, 30, 0], rotate: [0, -12, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-60 left-[10%] w-56 h-56 bg-brand-electric/5 backdrop-blur-2xl rounded-3xl border border-brand-electric/10 hidden lg:block rotate-12"
            />
        </div>
    );
}
