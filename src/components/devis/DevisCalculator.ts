"use client";

import { useState } from "react";

export interface DevisCosts {
  admin: number;
  menage: number;
  ascenseur: number;
  security: number;
  green: number;
  cameras: number;
  rawTotal: number;
  discount: number;
  discountPct: number;
  total: number;
  perAppart: number;
}

export function useDevisCalculator() {
  const [step, setStep] = useState(1);

  // --- Step 1: Building Details State ---
  const [coproprieteName, setCoproprieteName] = useState("");
  const [city, setCity] = useState("casablanca");
  const [apartmentsCount, setApartmentsCount] = useState(24);
  const [floorsCount, setFloorsCount] = useState(4);

  // --- Step 2: Services Config State ---
  const [menageFrequency, setMenageFrequency] = useState("3"); // days per week: "0" (none), "2", "3", "6" (daily)
  const [hasAscenseur, setHasAscenseur] = useState(true);
  const [ascenseurCount, setAscenseurCount] = useState(1);
  const [securityLevel, setSecurityLevel] = useState("24h"); // "none", "day", "night", "24h"
  const [hasEspacesVerts, setHasEspacesVerts] = useState(false);
  const [hasCameras, setHasCameras] = useState(true);

  // --- Step 3: Contact Info State ---
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("coproprietaire"); // "coproprietaire", "conseil", "promoteur"

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // --- Price Calculation Logic ---
  const calculateCosts = (): DevisCosts => {
    // 1. Base Admin Fee per apartment (35 DH/month per apartment)
    const baseAdminRate = 35;
    const totalAdmin = apartmentsCount * baseAdminRate;

    // 2. Cleaning (Ménage) Cost
    let menageRatePerAppart = 0;
    if (menageFrequency === "2") menageRatePerAppart = 30;
    if (menageFrequency === "3") menageRatePerAppart = 45;
    if (menageFrequency === "6") menageRatePerAppart = 75;
    const totalMenage = apartmentsCount * menageRatePerAppart;

    // 3. Elevator Maintenance (flat 250 DH per elevator/month + 15 DH electricity per appart)
    let totalAscenseur = 0;
    if (hasAscenseur) {
      totalAscenseur = ascenseurCount * 250 + apartmentsCount * 15;
    }

    // 4. Security (Gardiennage) Cost
    let securityFlatRate = 0;
    if (securityLevel === "day") securityFlatRate = 1200;
    if (securityLevel === "night") securityFlatRate = 1400;
    if (securityLevel === "24h") securityFlatRate = 2600;
    const totalSecurity = securityFlatRate;

    // 5. Green Spaces Cost
    const totalEspacesVerts = hasEspacesVerts ? apartmentsCount * 15 : 0;

    // 6. Cameras System Maintenance
    const totalCameras = hasCameras ? apartmentsCount * 8 : 0;

    // Sum Total
    const rawTotalMonthly =
      totalAdmin +
      totalMenage +
      totalAscenseur +
      totalSecurity +
      totalEspacesVerts +
      totalCameras;

    // Apply discount for larger buildings
    let discountPercent = 0;
    if (apartmentsCount > 50) discountPercent = 0.15; // 15% discount
    else if (apartmentsCount > 25) discountPercent = 0.08; // 8% discount

    const discountAmount = rawTotalMonthly * discountPercent;
    const finalTotalMonthly = rawTotalMonthly - discountAmount;
    const costPerApartment = finalTotalMonthly / apartmentsCount;

    return {
      admin: totalAdmin,
      menage: totalMenage,
      ascenseur: totalAscenseur,
      security: totalSecurity,
      green: totalEspacesVerts,
      cameras: totalCameras,
      rawTotal: rawTotalMonthly,
      discount: discountAmount,
      discountPct: discountPercent * 100,
      total: finalTotalMonthly,
      perAppart: costPerApartment,
    };
  };

  const costs = calculateCosts();

  const handleNextStep = () => {
    if (step === 1 && !coproprieteName) return;
    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom || !prenom || !phone) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setStep(4);
    }, 1500);
  };

  const handleReset = () => {
    setStep(1);
    setCoproprieteName("");
    setApartmentsCount(24);
    setFloorsCount(4);
    setMenageFrequency("3");
    setHasAscenseur(true);
    setAscenseurCount(1);
    setSecurityLevel("24h");
    setHasEspacesVerts(false);
    setHasCameras(true);
    setNom("");
    setPrenom("");
    setPhone("");
    setEmail("");
    setIsSubmitted(false);
  };

  return {
    // step
    step,
    setStep,
    handleNextStep,
    handlePrevStep,

    // step 1
    coproprieteName,
    setCoproprieteName,
    city,
    setCity,
    apartmentsCount,
    setApartmentsCount,
    floorsCount,
    setFloorsCount,

    // step 2
    menageFrequency,
    setMenageFrequency,
    hasAscenseur,
    setHasAscenseur,
    ascenseurCount,
    setAscenseurCount,
    securityLevel,
    setSecurityLevel,
    hasEspacesVerts,
    setHasEspacesVerts,
    hasCameras,
    setHasCameras,

    // step 3
    nom,
    setNom,
    prenom,
    setPrenom,
    phone,
    setPhone,
    email,
    setEmail,
    role,
    setRole,

    // submission
    isSubmitting,
    isSubmitted,
    handleSubmit,
    handleReset,

    // costs
    costs,
    calculateCosts,
  };
}