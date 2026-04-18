"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import fr from "../dictionaries/fr.json";
import en from "../dictionaries/en.json";
import ar from "../dictionaries/ar.json";

type Locale = "fr" | "en" | "ar";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Dictionary = any;

interface LocaleContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    t: (keyPath: string) => any;
    dir: "ltr" | "rtl";
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const dictionaries: Record<Locale, Dictionary> = { fr, en, ar };

export function LocaleProvider({ children }: { children: React.ReactNode }) {
    const [locale, setLocale] = useState<Locale>("fr");

    useEffect(() => {
        const savedLocale = localStorage.getItem("softeligy-locale") as Locale;
        if (savedLocale && ["fr", "en", "ar"].includes(savedLocale)) {
            setLocale(savedLocale);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("softeligy-locale", locale);
        document.documentElement.lang = locale;
        document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    }, [locale]);

    const t = (keyPath: string) => {
        const keys = keyPath.split(".");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let result: any = dictionaries[locale];

        for (const key of keys) {
            if (result && result[key] !== undefined) {
                result = result[key];
            } else {
                console.warn(`Translation key not found: ${keyPath}`);
                return keyPath;
            }
        }
        return result;
    };

    const dir = locale === "ar" ? "rtl" : "ltr";

    return (
        <LocaleContext.Provider value={{ locale, setLocale, t, dir }}>
            <div dir={dir}>{children}</div>
        </LocaleContext.Provider>
    );
}

export function useTranslation() {
    const context = useContext(LocaleContext);
    if (!context) {
        throw new Error("useTranslation must be used within a LocaleProvider");
    }
    return context;
}
