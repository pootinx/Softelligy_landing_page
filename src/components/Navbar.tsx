"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/context/LocaleContext";
import { useFirestoreDoc } from "@/lib/hooks/useDoc";

export default function Navbar() {
    const { t, locale, setLocale, dir } = useTranslation();
    const { data, loading } = useFirestoreDoc("site_config", "navbar");
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [langMenuOpen, setLangMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const defaultNavLinks = [
        { name: t("nav.itSolutions"), href: "#tech" },
        { name: t("nav.syndicServices"), href: "#syndic-process" },
        { name: t("nav.platform"), href: "#platform" },
        { name: t("nav.about"), href: "#about" },
    ];

    const navLinks = data?.links && data.links.length > 0 ? data.links : defaultNavLinks;

    const languages = [
        { code: "fr", label: "Français" },
        { code: "en", label: "English" },
        { code: "ar", label: "العربية" },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6",
                isScrolled ? "py-4" : "py-8"
            )}
        >
            <div className={cn(
                "max-w-7xl mx-auto flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500",
                isScrolled
                    ? "bg-brand-navy/60 backdrop-blur-xl border border-white/10 shadow-2xl"
                    : "bg-transparent border border-transparent"
            )}>
                <Link href="/" className="flex items-center gap-2 group">
                    <Image
                        src={data?.logoUrl || "/logo-horizontal-white.png"}
                        alt="Softeligy Logo"
                        width={140}
                        height={40}
                        className="h-8 w-auto object-contain brightness-110 group-hover:scale-105 transition-transform"
                    />
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link: any) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-4">
                    {/* Language Switcher */}
                    <div className="relative">
                        <button
                            onClick={() => setLangMenuOpen(!langMenuOpen)}
                            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-white px-4 border-r border-white/10 transition-colors"
                        >
                            <Globe className="w-3 h-3 text-brand-electric" />
                            {locale}
                        </button>

                        <AnimatePresence>
                            {langMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute top-10 right-0 bg-brand-navy border border-white/10 rounded-xl p-2 min-w-[120px] shadow-3xl"
                                >
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => {
                                                setLocale(lang.code as "fr" | "en" | "ar");
                                                setLangMenuOpen(false);
                                            }}
                                            className={cn(
                                                "w-full text-left px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-colors",
                                                locale === lang.code ? "bg-brand text-white" : "text-white/40 hover:bg-white/5 hover:text-white"
                                            )}
                                        >
                                            {lang.label}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {data?.showLogin !== false && (
                        data?.loginUrl ? (
                            <Link href={data.loginUrl} className="text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-white px-4">
                                {loading ? <span className="inline-block w-12 h-3 bg-white/20 animate-pulse rounded" /> : (data?.loginText || t("common.login"))}
                            </Link>
                        ) : (
                            <button className="text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-white px-4">
                                {loading ? <span className="inline-block w-12 h-3 bg-white/20 animate-pulse rounded" /> : (data?.loginText || t("common.login"))}
                            </button>
                        )
                    )}

                    {data?.showCta !== false && (
                        data?.ctaUrl ? (
                            <Link href={data.ctaUrl} className="bg-brand text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-white hover:text-brand-navy transition-all group scale-100 hover:scale-105 shadow-xl shadow-brand/20">
                                {loading ? <span className="inline-block w-24 h-3 bg-white/20 animate-pulse rounded" /> : (data?.ctaText || t("common.getConsultation"))}
                                <ArrowRight className={cn("w-3 h-3 group-hover:translate-x-1 transition-transform", dir === "rtl" && "rotate-180")} />
                            </Link>
                        ) : (
                            <button className="bg-brand text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-white hover:text-brand-navy transition-all group scale-100 hover:scale-105 shadow-xl shadow-brand/20">
                                {loading ? <span className="inline-block w-24 h-3 bg-white/20 animate-pulse rounded" /> : (data?.ctaText || t("common.getConsultation"))}
                                <ArrowRight className={cn("w-3 h-3 group-hover:translate-x-1 transition-transform", dir === "rtl" && "rotate-180")} />
                            </button>
                        )
                    )}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white p-2 bg-white/5 rounded-lg border border-white/10"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="absolute top-24 left-6 right-6 bg-brand-navy/95 backdrop-blur-2xl rounded-3xl border border-white/10 p-8 md:hidden flex flex-col gap-6 shadow-3xl overflow-hidden"
                    >
                        {navLinks.map((link: any) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-2xl font-black text-white/70 hover:text-white"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <hr className="border-white/10" />

                        {/* Mobile Lang Switcher */}
                        <div className="flex gap-4">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => setLocale(lang.code as "fr" | "en" | "ar")}
                                    className={cn(
                                        "flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all",
                                        locale === lang.code ? "bg-brand border-brand text-white" : "border-white/10 text-white/40"
                                    )}
                                >
                                    {lang.label}
                                </button>
                            ))}
                        </div>

                        {data?.showCta !== false && (
                            data?.ctaUrl ? (
                                <Link href={data.ctaUrl} className="bg-brand text-white w-full py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl flex items-center justify-center mt-2">
                                    {data?.ctaText || t("common.getConsultation")}
                                </Link>
                            ) : (
                                <button className="bg-brand text-white w-full py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl mt-2">
                                    {data?.ctaText || t("common.getConsultation")}
                                </button>
                            )
                        )}
                        {data?.showLogin !== false && (
                            data?.loginUrl ? (
                                <Link href={data.loginUrl} className="bg-white/5 border border-white/10 text-white w-full py-5 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center hover:bg-white/10 transition-colors">
                                    {data?.loginText || t("common.login")}
                                </Link>
                            ) : (
                                <button className="bg-white/5 border border-white/10 text-white w-full py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-colors">
                                    {data?.loginText || t("common.login")}
                                </button>
                            )
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
