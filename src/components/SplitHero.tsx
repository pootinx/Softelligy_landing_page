"use client";

import { motion } from "framer-motion";
import { ArrowRight, Cpu, Building2 } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function SplitHero() {
    const [hovered, setHovered] = useState<"tech" | "syndic" | null>(null);

    return (
        <div className="relative h-screen w-full flex flex-col md:flex-row overflow-hidden bg-brand-navy">
            {/* Tech Side */}
            <motion.div
                onMouseEnter={() => setHovered("tech")}
                onMouseLeave={() => setHovered(null)}
                className={cn(
                    "relative flex-1 flex flex-col justify-center px-8 md:px-20 transition-all duration-700 ease-in-out cursor-pointer group border-r border-white/5",
                    hovered === "tech" ? "md:flex-[1.5] bg-brand-electric/5" : "md:flex-1",
                    hovered === "syndic" ? "md:flex-[0.5] opacity-50 grayscale" : ""
                )}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-electric/10 to-transparent pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10"
                >
                    <div className="flex items-center gap-3 text-brand-electric mb-6">
                        <div className="p-3 bg-brand-electric/10 rounded-2xl">
                            <Cpu className="w-8 h-8" />
                        </div>
                        <span className="text-sm font-bold tracking-widest uppercase italic">Logic & Innovation</span>
                    </div>

                    <h1 className="text-4xl md:text-7xl font-black text-white leading-tight mb-6">
                        Future-Proof <br />
                        <span className="text-brand-electric">Technology</span> <br />
                        Consulting.
                    </h1>

                    <p className="text-lg text-white/60 max-w-lg mb-10 leading-relaxed">
                        AI-driven digital transformation, cloud infrastructure, and enterprise-grade software engineering for the next generation of business.
                    </p>

                    <button className="flex items-center gap-3 bg-brand-electric text-white px-8 py-4 rounded-2xl font-bold hover:gap-5 transition-all w-fit">
                        Explore IT Services
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </motion.div>
            </motion.div>

            {/* Syndic Side */}
            <motion.div
                onMouseEnter={() => setHovered("syndic")}
                onMouseLeave={() => setHovered(null)}
                className={cn(
                    "relative flex-1 flex flex-col justify-center px-8 md:px-20 transition-all duration-700 ease-in-out cursor-pointer group",
                    hovered === "syndic" ? "md:flex-[1.5] bg-brand-emerald/5" : "md:flex-1",
                    hovered === "tech" ? "md:flex-[0.5] opacity-50 grayscale" : ""
                )}
            >
                <div className="absolute inset-0 bg-gradient-to-bl from-brand-emerald/10 to-transparent pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10"
                >
                    <div className="flex items-center gap-3 text-brand-emerald mb-6">
                        <div className="p-3 bg-brand-emerald/10 rounded-2xl">
                            <Building2 className="w-8 h-8" />
                        </div>
                        <span className="text-sm font-bold tracking-widest uppercase italic">Operations & Trust</span>
                    </div>

                    <h2 className="text-4xl md:text-7xl font-black text-white leading-tight mb-6">
                        Modern <br />
                        <span className="text-brand-emerald">Property</span> <br />
                        Management.
                    </h2>

                    <p className="text-lg text-white/60 max-w-lg mb-10 leading-relaxed">
                        Law 18-00 compliant managed services powered by our proprietary internal digital platform for ultimate transparency and efficiency.
                    </p>

                    <button className="flex items-center gap-3 bg-brand-emerald text-white px-8 py-4 rounded-2xl font-bold hover:gap-5 transition-all w-fit">
                        Syndic Solutions
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </motion.div>
            </motion.div>

            {/* Decorative center logo divider */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block">
                <div className="w-24 h-24 bg-brand-navy rounded-full border border-white/10 flex items-center justify-center p-4 backdrop-blur-xl">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                        <Image
                            src="/logo-s-white.png"
                            alt="Softeligy S"
                            width={48}
                            height={48}
                            className="object-contain"
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
