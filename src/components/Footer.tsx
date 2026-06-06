"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { site } from "@/lib/site";
import { useLang } from "@/i18n/LanguageProvider";
import { t } from "@/i18n/ui";

export function Footer() {
  const { lang } = useLang();
  const footerLinks = [
    { href: "/confidentialite", label: t(lang, "privacyPolicy") },
    { href: "/faq", label: t(lang, "faq") },
    { href: "/support", label: t(lang, "contact") },
    { href: "/support", label: t(lang, "support") },
  ];

  return (
    <footer className="border-t border-outline-variant bg-surface-gray px-margin-edge py-12">
      <div className="mx-auto max-w-container-max">
        <div className="mb-8 flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          <div className="flex flex-col items-center gap-4 md:items-start">
            <Logo />
            <p className="text-center text-sm text-on-surface-variant md:text-left">
              © {new Date().getFullYear()} {site.name}. {t(lang, "rightsReserved")}
              <br /> {lang === "en" ? "Clinical Excellence in Ophthalmology" : site.taglineFr}.
            </p>
          </div>
          <nav className="flex flex-wrap justify-center gap-6 text-on-surface-variant">
            {footerLinks.map((l, i) => (
              <Link key={i} href={l.href} className="transition-colors hover:text-primary-container">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-col items-center justify-between gap-2 border-t border-outline-variant pt-6 text-sm text-on-surface-variant md:flex-row">
          <p>
            {site.phonePrimary} · {site.email}
          </p>
          <p>
            {t(lang, "developedBy")} {site.developer}
          </p>
        </div>
      </div>
    </footer>
  );
}
