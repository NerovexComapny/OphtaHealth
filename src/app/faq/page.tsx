"use client";

import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Accordion, type QA } from "@/components/Accordion";
import { useLang, pick } from "@/i18n/LanguageProvider";

export default function FAQPage() {
  const { lang } = useLang();

  const calibration: QA[] = [
    {
      q: pick(lang, "À quelle fréquence le système OCT doit-il être calibré ?", "How often should the OCT system be calibrated?"),
      a: pick(
        lang,
        "Nous recommandons une calibration annuelle par un technicien agréé, ou selon les préconisations du fabricant indiquées dans la documentation de l'appareil.",
        "We recommend annual calibration by an authorized technician, or as specified by the manufacturer in the device documentation."
      ),
    },
    {
      q: pick(lang, "Quelle est la tolérance acceptable pour l'alignement laser ?", "What is the acceptable tolerance for laser alignment?"),
      a: pick(
        lang,
        "La tolérance dépend du modèle. Nos ingénieurs vérifient l'alignement lors de chaque intervention de maintenance préventive.",
        "Tolerance depends on the model. Our engineers verify alignment during every preventive maintenance visit."
      ),
    },
  ];

  const support: QA[] = [
    {
      q: pick(lang, "Comment exporter les fichiers DICOM pour une analyse externe ?", "How do I export DICOM files for external analysis?"),
      a: pick(
        lang,
        "La plupart de nos appareils permettent l'export DICOM via le menu d'exportation. Notre équipe peut vous accompagner dans la configuration.",
        "Most of our devices support DICOM export through the export menu. Our team can assist you with the configuration."
      ),
    },
    {
      q: pick(lang, "Fournissez-vous un support technique à distance ?", "Do you provide remote technical support?"),
      a: pick(
        lang,
        "Oui. Nos ingénieurs cliniques proposent un support à distance ainsi qu'une assistance sur site pour les interventions plus complexes.",
        "Yes. Our clinical engineers offer remote support as well as on-site assistance for more complex interventions."
      ),
    },
  ];

  const logistics: QA[] = [
    {
      q: pick(lang, "Quels sont vos délais de livraison et d'installation ?", "What are your delivery and installation times?"),
      a: pick(
        lang,
        "Les délais varient selon la disponibilité du produit. Le statut En stock / Hors stock est indiqué sur chaque fiche produit.",
        "Times vary depending on product availability. The In stock / Out of stock status is shown on each product page."
      ),
    },
    {
      q: pick(lang, "Proposez-vous des contrats de maintenance ?", "Do you offer maintenance contracts?"),
      a: pick(
        lang,
        "Oui, nous proposons des contrats de service incluant maintenance préventive, pièces de rechange et interventions prioritaires.",
        "Yes, we offer service contracts including preventive maintenance, spare parts and priority interventions."
      ),
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow={pick(lang, "Support & documentation", "Support & documentation")}
        title={pick(lang, "Foire aux Questions", "Frequently Asked Questions")}
        subtitle={pick(
          lang,
          "Documentation technique et réponses aux questions fréquentes sur nos systèmes de diagnostic et d'imagerie.",
          "Technical documentation and answers to common questions about our diagnostic and imaging systems."
        )}
      />

      <div className="container-max flex flex-col gap-12 py-12">
        <Group title={pick(lang, "Calibration des équipements", "Equipment calibration")} items={calibration} />
        <Group title={pick(lang, "Support technique", "Technical support")} items={support} />
        <Group title={pick(lang, "Livraison & maintenance", "Delivery & maintenance")} items={logistics} />
      </div>

      <section className="border-t border-outline-variant bg-surface-gray px-margin-edge py-16 text-center">
        <h2 className="mb-3 font-display text-headline-lg text-primary-container">
          {pick(lang, "Vous ne trouvez pas votre réponse ?", "Can't find your answer?")}
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-on-surface-variant">
          {pick(
            lang,
            "Nos ingénieurs de support clinique sont disponibles pour vous assister.",
            "Our clinical support engineers are available to assist you."
          )}
        </p>
        <Link href="/support" className="btn-solid">
          {pick(lang, "Contacter le support", "Contact support")}
        </Link>
      </section>
    </>
  );
}

function Group({ title, items }: { title: string; items: QA[] }) {
  return (
    <section>
      <h2 className="mb-5 font-display text-headline-md text-primary-container">{title}</h2>
      <Accordion items={items} />
    </section>
  );
}
