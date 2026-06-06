import type { Metadata } from "next";
import { Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CookieBanner } from "@/components/CookieBanner";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { site } from "@/lib/site";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name}`,
    template: `%s — ${site.name}`,
  },
  description:
    "OphtaHealth distribue des équipements médicaux ophtalmiques de haute précision : consultation, exploration et santé oculaire. 9 marques partenaires de renom.",
  keywords: [
    "ophtalmologie",
    "équipement médical",
    "OCT",
    "lampe à fente",
    "rétinographe",
    "tonomètre",
    "OphtaHealth",
  ],
  openGraph: {
    title: `${site.name} — Équipements Médicaux Ophtalmiques`,
    description: "Catalogue d'équipements ophtalmiques de haute précision.",
    type: "website",
    locale: "fr_FR",
    images: ["/brand/ophtahealth-logo.webp"],
  },
  icons: {
    icon: "/brand/ophtahealth-logo.webp",
    apple: "/brand/ophtahealth-logo.webp",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${hanken.variable} ${jetbrains.variable}`}>
      <body className="bg-clinical-white font-sans text-body-md text-on-surface antialiased">
        <LanguageProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <WhatsAppButton />
          <CookieBanner />
        </LanguageProvider>
      </body>
    </html>
  );
}
