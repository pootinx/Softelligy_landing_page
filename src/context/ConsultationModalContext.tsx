"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ConsultationModalContextType {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

const ConsultationModalContext = createContext<ConsultationModalContextType | undefined>(undefined);

export function ConsultationModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <ConsultationModalContext.Provider value={{ isOpen, openModal, closeModal }}>
            {children}
        </ConsultationModalContext.Provider>
    );
}

export function useConsultationModal() {
    const context = useContext(ConsultationModalContext);
    if (!context) {
        throw new Error("useConsultationModal khass ykon jowa ConsultationModalProvider");
    }
    return context;
}