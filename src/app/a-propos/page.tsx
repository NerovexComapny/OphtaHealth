"use client";

import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { brands } from "@/data/brands";
import { products } from "@/data/products";
import { sections } from "@/data/categories";
import { CheckIcon } from "@/components/Icons";
import { useLang, pick } from "@/i18n/LanguageProvider";
import { t } from "@/i18n/ui";

export default function AboutPage() {
  const { lang } = useLang();

  const values = [
    {
      title: pick(lang, "Précision clinique", "Clinical precision"),
      text: pick(
        lang,
        "Des instruments de diagnostic de haute fidélité pour des résultats fiables et reproductibles.",
        "High-fidelity diagnostic instruments for reliable, reproducible results."
      ),
    },
    {
      title: pick(lang, "Marques de confiance", "Trusted brands"),
      text: pick(
        lang,
        "Nous représentons des fabricants de renommée mondiale, sélectionnés pour leur qualité.",
        "We represent world-renowned manufacturers, selected for their quality."
      ),
    },
    {
      title: pick(lang, "Support technique", "Technical support"),
      text: pick(
        lang,
        "Une équipe d'ingénieurs dédiée à l'installation, la maintenance et la formation.",
        "A team of engineers dedicated to installation, maintenance and training."
      ),
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow={pick(lang, "Qui sommes-nous", "Who we are")}
        title={pick(lang, "À Propos d'OphtaHealth", "About OphtaHealth")}
        subtitle={pick(
          lang,
          "Spécialiste de la distribution d'équipements médicaux ophtalmiques pour les professionnels de la santé visuelle.",
          "Specialist in the distribution of ophthalmic medical equipment for eye care professionals."
        )}
      />

      {/* Mission */}
      <section className="container-max grid grid-cols-1 items-center gap-12 py-16 md:grid-cols-2">
        <div>
          <h2 className="mb-6 font-display text-headline-lg text-primary-container">{pick(lang, "Notre Mission", "Our Mission")}</h2>
          <p className="mb-4 leading-relaxed text-on-surface-variant">
            {pick(
              lang,
              "OphtaHealth est une société spécialisée dans la distribution d'équipements médicaux ophtalmiques. Nous représentons plusieurs marques partenaires de renom et proposons un catalogue structuré d'appareils destinés aux professionnels de la santé visuelle.",
              "OphtaHealth is a company specialized in the distribution of ophthalmic medical equipment. We represent several renowned partner brands and offer a structured catalog of devices for eye care professionals."
            )}
          </p>
          <p className="leading-relaxed text-on-surface-variant">
            {pick(
              lang,
              "Notre engagement : faire le lien entre l'ingénierie technologique de pointe et la pratique clinique quotidienne, afin de garantir précision, fiabilité et de meilleurs résultats pour les patients.",
              "Our commitment: to bridge cutting-edge engineering and everyday clinical practice, ensuring precision, reliability and better patient outcomes."
            )}
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <Stat value={`${brands.length}+`} label={pick(lang, "Marques", "Brands")} />
          <Stat value={`${products.length}`} label={pick(lang, "Produits", "Products")} />
          <Stat value={`${sections.length}`} label={pick(lang, "Sections", "Sections")} />
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-outline-variant bg-surface-gray px-margin-edge py-16">
        <div className="mx-auto max-w-container-max">
          <h2 className="section-title mb-12">{pick(lang, "Nos Valeurs", "Our Values")}</h2>
          <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="rounded-lg border border-outline-variant bg-clinical-white p-6">
                <span className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-primary-container/10 text-primary-container">
                  <CheckIcon className="h-6 w-6" />
                </span>
                <h3 className="mb-2 font-display text-lg font-semibold text-on-surface">{v.title}</h3>
                <p className="text-on-surface-variant">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="container-max py-16">
        <h2 className="section-title mb-12">{t(lang, "partnerBrands")}</h2>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {brands.map((b) => (
            <div key={b.slug} className="flex h-28 items-center justify-center rounded-lg border border-outline-variant bg-clinical-white p-4">
              {b.logo ? (
                <Image src={b.logo} alt={b.name} width={150} height={70} className="max-h-full w-auto object-contain" />
              ) : (
                <span className="font-mono text-label-caps uppercase text-primary-container">{b.name}</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-outline-variant bg-surface-gray px-margin-edge py-16 text-center">
        <h2 className="mb-4 font-display text-headline-lg text-primary-container">
          {pick(lang, "Vous avez un projet d'équipement ?", "Have an equipment project?")}
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-on-surface-variant">
          {pick(
            lang,
            "Notre équipe est à votre disposition pour vous conseiller et vous accompagner.",
            "Our team is available to advise and support you."
          )}
        </p>
        <Link href="/support" className="btn-solid">{t(lang, "contactUs")}</Link>
      </section>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-outline-variant bg-surface-gray py-8">
      <span className="font-display text-display-md font-bold text-primary-container">{value}</span>
      <span className="text-sm text-on-surface-variant">{label}</span>
    </div>
  );
}
