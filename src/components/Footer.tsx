"use client";

import Image from "next/image";
import Link from "next/link";
import { Globe, MessageSquare, Phone, Mail, ArrowUp, ChevronRight } from "lucide-react";
import { useTranslation } from "@/context/LocaleContext";
import { useSiteContent } from "@/context/SiteContentContext";
import { useFirestoreDoc } from "@/lib/hooks/useDoc";
import { cn } from "@/lib/utils";

export default function Footer() {
    const { t, dir } = useTranslation();
    const { getContentBlock } = useSiteContent();
    const { data, loading } = useFirestoreDoc('site_config', 'footer');

    const phone1 = data?.phone1 ?? getContentBlock("company-phone") ?? "+212 670 977 483";
    const phone2 = data?.phone2 ?? getContentBlock("company-phone-2") ?? "+212 682 086 521";
    const email = data?.email ?? getContentBlock("company-email") ?? "contact@softelligy.com";
    const address = data?.address ?? getContentBlock("company-address") ?? "Casablanca, Morocco";
    const copyright = getContentBlock("footer-copyright") || "SOFTELIGY. ALL RIGHTS RESERVED.";

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="bg-[#020617] relative pt-24 pb-12 overflow-hidden">
            {/* Background Degradation Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[radial-gradient(circle_at_50%_100%,#3B82F608,transparent)] opacity-50" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Upper Section: CTA */}
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-24 pb-24 border-b border-white/5">
                    <div>
                        <h3 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                            {t("footer.ready")}
                        </h3>
                        <p className="text-white/40 text-lg leading-relaxed max-w-md">
                            {t("footer.partners")}
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
                        <Link href="#contact" className="bg-brand flex justify-center text-center text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-brand/20 hover:scale-105 transition-all">
                            {t("common.getConsultation")}
                        </Link>
                        <Link href="#contact" className="bg-white/5 flex justify-center text-center text-white border border-white/10 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all">
                            {t("common.requestQuote")}
                        </Link>
                    </div>
                </div>

                {/* Main Footer Content */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 mb-20">
                    <div className="col-span-2 lg:col-span-2 space-y-8">
                        <Link href="/" className="inline-block">
                            <Image
                                src="/logo-horizontal-white.png"
                                alt="Softeligy Logo"
                                width={180}
                                height={50}
                                className="h-10 w-auto brightness-110"
                            />
                        </Link>
                        <p className="text-white/30 text-sm leading-relaxed max-w-xs font-medium">
                            {t("footer.description")}
                        </p>
                        <div className="flex gap-4">
                            {[Globe, MessageSquare, Mail].map((Icon, i) => (
                                <Link key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-electric hover:border-brand-electric text-white/50 hover:text-white transition-all">
                                    <Icon className="w-4 h-4" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-black uppercase tracking-[.2em] text-[10px] mb-8">{t("footer.pillars")}</h4>
                        <ul className="space-y-4">
                            {[
                                { name: t("nav.itSolutions"), href: "#tech" },
                                { name: t("nav.syndicServices"), href: "#syndic" },
                                { name: t("nav.platform"), href: "#platform" },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-white/40 hover:text-brand-electric text-sm font-bold flex items-center gap-2 group">
                                        <ChevronRight className={cn("w-3 h-3 text-brand-electric/50 group-hover:translate-x-1 transition-transform", dir === "rtl" && "rotate-180")} />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-black uppercase tracking-[.2em] text-[10px] mb-8">{t("footer.company")}</h4>
                        <ul className="space-y-4">
                            {[
                                { name: t("nav.about"), href: "#about" },
                                { name: "Carrières", href: "#" },
                                { name: "Blog", href: "#" },
                                { name: "Presse", href: "#" },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-white/40 hover:text-brand-electric text-sm font-bold flex items-center gap-2 group">
                                        <ChevronRight className={cn("w-3 h-3 text-brand-electric/50 group-hover:translate-x-1 transition-transform", dir === "rtl" && "rotate-180")} />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-black uppercase tracking-[.2em] text-[10px] mb-8">{t("footer.legal")}</h4>
                        <ul className="space-y-4">
                            {[
                                { name: "Confidentialité", href: "#" },
                                { name: "Conditions", href: "#" },
                                { name: "Cookies", href: "#" },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-white/40 hover:text-brand-electric text-sm font-bold flex items-center gap-2 group">
                                        <ChevronRight className={cn("w-3 h-3 text-brand-electric/50 group-hover:translate-x-1 transition-transform", dir === "rtl" && "rotate-180")} />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Contact Strip */}
                <div className="grid md:grid-cols-3 gap-6 p-8 rounded-3xl bg-white/[0.03] border border-white/5 mb-20">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-brand-electric/10 flex items-center justify-center">
                            <Phone className="w-4 h-4 text-brand-electric" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">PHONE</p>
                            {loading ? <div className="w-32 h-4 bg-white/10 animate-pulse rounded mb-2" /> : <p className="text-sm font-bold text-white">{phone1}</p>}
                            {loading ? <div className="w-32 h-4 bg-white/10 animate-pulse rounded" /> : <p className="text-sm font-bold text-white/60">{phone2}</p>}
                        </div>
                    </div>
                    <div className="flex items-center gap-4 border-y md:border-y-0 md:border-x border-white/5 py-6 md:py-0 md:px-6">
                        <div className="w-10 h-10 rounded-xl bg-brand-electric/10 flex items-center justify-center">
                            <Mail className="w-4 h-4 text-brand-electric" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">EMAIL</p>
                            {loading ? <div className="w-40 h-4 bg-white/10 animate-pulse rounded" /> : <p className="text-sm font-bold text-white">{email}</p>}
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-brand-electric/10 flex items-center justify-center">
                            <Globe className="w-4 h-4 text-brand-electric" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">LOCATION</p>
                            {loading ? <div className="w-32 h-4 bg-white/10 animate-pulse rounded" /> : <p className="text-sm font-bold text-white">{address}</p>}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-white/5">
                    <p className="text-[10px] font-bold text-white/20 uppercase tracking-[.3em]">
                        © {new Date().getFullYear()} {copyright}
                    </p>
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{t("footer.status")}</span>
                        </div>
                        <button
                            onClick={scrollToTop}
                            className="flex items-center gap-2 text-[10px] font-black text-brand-electric uppercase tracking-widest hover:text-white transition-colors"
                        >
                            {t("footer.backToTop")} <ArrowUp className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
