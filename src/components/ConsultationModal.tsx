"use client";

import { useState } from "react";
import { useConsultationModal } from "@/context/ConsultationModalContext";

export default function ConsultationModal() {
    const { isOpen, closeModal } = useConsultationModal();

    // =====================
    // STATE
    // =====================
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [errors, setErrors] = useState<any>({});

    const [form, setForm] = useState({
        nom: "",
        prenom: "",
        phone: "",
        message: "",
    });

    // =====================
    // PHONE FORMAT ONLY
    // =====================
    const formatPhone = (value: string) => {
        return value.replace(/\D/g, "").slice(0, 10);
    };

    // =====================
    // HANDLE CHANGE
    // =====================
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        let newValue = value;

        if (name === "phone") {
            newValue = formatPhone(value);
        }

        setForm({
            ...form,
            [name]: newValue,
        });

        setErrors({
            ...errors,
            [name]: "",
        });
    };

    // =====================
    // VALIDATION
    // =====================
    const validate = () => {
        let newErrors: any = {};

        if (!form.nom.trim()) {
            newErrors.nom = "Le nom est obligatoire";
        } else if (!/^[A-Za-zÀ-ÿ\s]{2,30}$/.test(form.nom)) {
            newErrors.nom = "Nom invalide";
        }

        if (!form.prenom.trim()) {
            newErrors.prenom = "Le prénom est obligatoire";
        } else if (!/^[A-Za-zÀ-ÿ\s]{2,30}$/.test(form.prenom)) {
            newErrors.prenom = "Prénom invalide";
        }

        if (!form.phone.trim()) {
            newErrors.phone = "Le téléphone est obligatoire";
        } else if (!/^[0-9]{10}$/.test(form.phone)) {
            newErrors.phone = "Numéro doit contenir 10 chiffres";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // =====================
    // SUBMIT
    // =====================
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setSuccess("");

        if (!validate()) return;

        setLoading(true);

        try {
            await fetch("/api/consultation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            setSuccess("Merci ! Votre demande a été envoyée avec succès.");

            setForm({
                nom: "",
                prenom: "",
                phone: "",
                message: "",
            });

            setErrors({});
        } catch {
            setSuccess("");
            alert("Erreur serveur");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center px-4 py-8 animate-[fadeIn_0.25s_ease-out]">

            <div className="relative w-full max-w-2xl">

                <div className="absolute -top-24 -right-16 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -left-16 w-64 h-64 bg-brand-electric/20 rounded-full blur-3xl pointer-events-none" />

                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white shadow-[0_30px_90px_-15px_rgba(15,23,42,0.5)] animate-[scaleIn_0.25s_ease-out] max-h-[90vh] flex flex-col">

                    <div className="h-1.5 w-full bg-gradient-to-r from-brand-electric via-blue-500 to-indigo-600 shrink-0" />

                    <div className="p-8 overflow-y-auto">

                        <button
                            onClick={closeModal}
                            aria-label="Fermer"
                            className="
                            absolute
                            top-6
                            right-6
                            w-9
                            h-9
                            rounded-full
                            bg-slate-100
                            text-slate-500
                            hover:bg-blue-50
                            hover:text-blue-600
                            hover:rotate-90
                            transition-all
                            duration-300
                            flex
                            items-center
                            justify-center
                            "
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="mb-8 pr-8">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold mb-4 border border-blue-100">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2l2.4 7.2H22l-6.2 4.5 2.4 7.3L12 16.5l-6.2 4.5 2.4-7.3L2 9.2h7.6z" />
                                </svg>
                                Consultation gratuite
                            </div>

                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                                Obtenir une consultation
                            </h2>

                            <p className="text-slate-500 mt-2 leading-relaxed">
                                Remplissez le formulaire ci-dessous et notre équipe vous contactera rapidement.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* NOM */}
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="8" r="4" />
                                        <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                                    </svg>
                                </span>
                                <input
                                    name="nom"
                                    value={form.nom}
                                    onChange={handleChange}
                                    placeholder="Nom *"
                                    className={`w-full h-12 pl-11 pr-4 rounded-xl border bg-slate-50 text-black placeholder:text-slate-400 transition-all outline-none ${
                                        errors.nom
                                        ? "border-red-500 bg-red-50/50"
                                        : "border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                                        }`}
                                />
                            </div>
                            {errors.nom && <p className="text-red-500 text-sm flex items-center gap-1 pl-1">{errors.nom}</p>}

                            {/* PRENOM */}
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="8" r="4" />
                                        <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                                    </svg>
                                </span>
                                <input
                                    name="prenom"
                                    value={form.prenom}
                                    onChange={handleChange}
                                    placeholder="Prénom *"
                                    className={`w-full h-12 pl-11 pr-4 rounded-xl border bg-slate-50 text-black placeholder:text-slate-400 transition-all outline-none ${
                                    errors.prenom
                                    ? "border-red-500 bg-red-50/50"
                                    : "border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                                    }`}
                                />
                            </div>
                            {errors.prenom && <p className="text-red-500 text-sm flex items-center gap-1 pl-1">{errors.prenom}</p>}

                            {/* PHONE */}
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                </span>
                                <input
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="Téléphone *"
                                    className={`w-full h-12 pl-11 pr-4 rounded-xl border bg-slate-50 text-black placeholder:text-slate-400 transition-all outline-none ${
                                errors.phone
                                ? "border-red-500 bg-red-50/50"
                                : "border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                                }`}
                                />
                            </div>
                            {errors.phone && <p className="text-red-500 text-sm flex items-center gap-1 pl-1">{errors.phone}</p>}

                            {/* MESSAGE */}
                            <div className="relative">
                                <span className="absolute left-4 top-4 text-slate-400">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                    </svg>
                                </span>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="Message"
                                    className="w-full min-h-[120px] border border-slate-200 bg-slate-50 text-black placeholder:text-slate-400 rounded-xl pl-11 pr-4 py-3.5 resize-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                                />
                            </div>

                            {/* SUCCESS */}
                            {success && (
                                <p className="text-emerald-700 text-sm bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 flex items-center gap-2">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="shrink-0">
                                        <path d="M20 6L9 17l-5-5" />
                                    </svg>
                                    {success}
                                </p>
                            )}

                            {/* BUTTON */}
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full h-12 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                                    loading
                                    ? "bg-slate-400 cursor-not-allowed"
                                    : "bg-gradient-to-r from-brand-electric to-blue-600 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.99]"
                                    }`}
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                            <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                                            <path d="M22 12a10 10 0 0 0-10-10" />
                                        </svg>
                                        Envoi en cours...
                                    </>
                                ) : (
                                    <>
                                        Envoyer
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <path d="M5 12h14M13 5l7 7-7 7" />
                                        </svg>
                                    </>
                                )}
                            </button>

                        </form>

                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.95) translateY(10px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
            `}</style>
        </div>
    );
}