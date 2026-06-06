"use client";

import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { SupportIcon, ArrowRight } from "@/components/Icons";
import { useLang, pick } from "@/i18n/LanguageProvider";
import { t } from "@/i18n/ui";

export default function ServicesPage() {
  const { lang } = useLang();
  return (
    <>
      <PageHeader eyebrow={pick(lang, "Bientôt disponible", "Coming soon")} title={t(lang, "services")} />

      <section className="container-max flex flex-col items-center py-24 text-center">
        <span className="mb-6 grid h-20 w-20 place-items-center rounded-full bg-primary-container/10 text-primary-container">
          <SupportIcon className="h-10 w-10" />
        </span>
        <h2 className="mb-4 font-display text-headline-lg text-primary-container">
          {pick(lang, "Page en cours d'implémentation", "Page under construction")}
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-on-surface-variant">
          {pick(
            lang,
            "Cette section est en cours de préparation. Nos services (installation, maintenance, formation et support technique) y seront détaillés prochainement. En attendant, notre équipe reste à votre disposition.",
            "This section is being prepared. Our services (installation, maintenance, training and technical support) will be detailed here soon. In the meantime, our team remains at your disposal."
          )}
        </p>
        <Link href="/support" className="btn-solid">
          {t(lang, "contactUs")}
          <ArrowRight className="h-5 w-5" />
        </Link>
      </section>
    </>
  );
}
