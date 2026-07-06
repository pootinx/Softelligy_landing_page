"use client";


import Navbar from "@/components/Navbar";
import UnifiedHero from "@/components/UnifiedHero";
import StatsSection from "@/components/StatsSection";
import SyndicFlow from "@/components/SyndicFlow";
import StaffSection from "@/components/StaffSection";
import CitiesSection from "@/components/CitiesSection";
import SoftwareShowcase from "@/components/SoftwareShowcase";

import Footer from "@/components/Footer";

export default function Home() {
  return (
    
      <main className="min-h-screen">
        <Navbar />
        <UnifiedHero />
        <StatsSection />
        <SyndicFlow />
        <StaffSection />
        <CitiesSection />
        <SoftwareShowcase />
        
        <Footer />
      </main>
    
  );
}
