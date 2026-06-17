import type { Metadata } from "next";
import { Inter, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  weight: ["400", "500", "600", "700"],
  subsets: ["arabic"],
  variable: "--font-arabic",
});

export const metadata: Metadata = {
  title: "Softeligy | Syndic de Copropriété & Gestion Immobilière",
  description: "Services de gestion immobilière transparents et modernes, alimentés par notre plateforme numérique propriétaire.",
};

import { LocaleProvider } from "@/context/LocaleContext";
import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={`${inter.className} ${ibmPlexArabic.variable} antialiased`}>
        <LocaleProvider>
          {children}
        </LocaleProvider>
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  );
}

