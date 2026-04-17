"use client";

import Navbar from "@/components/Navbar";
import UnifiedHero from "@/components/UnifiedHero";
import StatsSection from "@/components/StatsSection";
import SegmentationSection from "@/components/SegmentationSection";
import SyndicFlow from "@/components/SyndicFlow";
import CitiesSection from "@/components/CitiesSection";
import SoftwareShowcase from "@/components/SoftwareShowcase";
import Footer from "@/components/Footer";
import { ArrowRight, Cpu, Globe, Shield, Database, Zap, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/context/LocaleContext";

export default function Home() {
  const { t, dir } = useTranslation();

  const services = [
    { title: t("techServices.services.0.title"), icon: Cpu, color: "text-brand-electric", desc: t("techServices.services.0.desc") },
    { title: t("techServices.services.1.title"), icon: Globe, color: "text-brand-electric", desc: t("techServices.services.1.desc") },
    { title: t("techServices.services.2.title"), icon: Shield, color: "text-brand-electric", desc: t("techServices.services.2.desc") },
    { title: t("techServices.services.3.title"), icon: Database, color: "text-brand-electric", desc: t("techServices.services.3.desc") },
    { title: t("techServices.services.4.title"), icon: Zap, color: "text-brand-electric", desc: t("techServices.services.4.desc") },
    { title: t("techServices.services.5.title"), icon: CheckCircle2, color: "text-brand-electric", desc: t("techServices.services.5.desc") },
  ];

  return (
    <main className="min-h-screen">
      <Navbar />
      <UnifiedHero />
      <StatsSection />

      {/* Delayed Split */}
      <SegmentationSection />

      {/* Operational Depth */}
      <SyndicFlow />

      {/* Active Cities */}
      <CitiesSection />

      {/* Software Differentiation */}
      <SoftwareShowcase />

      {/* Modern Tech Services Grid */}
      <section className="py-24 px-6 bg-brand-navy border-t border-white/5" id="tech">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
                {t("techServices.titlePrefix")} <br />
                <span className="text-brand-electric">{t("techServices.titleSuffix")}</span>
              </h2>
              <p className="text-white/40 text-lg">
                {t("techServices.description")}
              </p>
            </div>
            <button className="bg-brand-electric text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-white hover:text-brand-navy transition-all">
              {t("common.getConsultation")} <ArrowRight className={cn("w-5 h-5", dir === "rtl" && "rotate-180")} />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div key={i} className="group p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/5 hover:border-brand-electric/30 hover:bg-white/[0.05] transition-all relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-electric/5 blur-3xl rounded-full" />
                <service.icon className={cn("w-12 h-12 mb-8 transition-transform group-hover:scale-110", service.color)} />
                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-white/40 leading-relaxed mb-8 text-sm">{service.desc}</p>
                <div className="flex items-center gap-2 text-brand-electric font-bold text-sm cursor-pointer hover:gap-4 transition-all uppercase tracking-widest text-xs">
                  {t("common.learnMore")} <ArrowRight className={cn("w-4 h-4", dir === "rtl" && "rotate-180")} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
