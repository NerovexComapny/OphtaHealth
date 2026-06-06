"use client";

import { PageHeader } from "@/components/PageHeader";
import { site } from "@/lib/site";
import { useLang, pick } from "@/i18n/LanguageProvider";

export default function PrivacyPage() {
  const { lang } = useLang();

  const sections = [
    {
      title: pick(lang, "1. Introduction", "1. Introduction"),
      body: [
        pick(
          lang,
          "Chez OphtaHealth, nous nous engageons à protéger la confidentialité et la sécurité de nos clients et utilisateurs. Cette politique décrit nos pratiques concernant la collecte, l'utilisation et la divulgation de vos informations lorsque vous utilisez nos équipements médicaux et plateformes numériques associées.",
          "At OphtaHealth, we are committed to protecting the privacy and security of our clients and users. This policy describes our practices regarding the collection, use and disclosure of your information when you use our medical equipment and associated digital platforms."
        ),
      ],
    },
    {
      title: pick(lang, "2. Collecte des données", "2. Data collection"),
      body: [pick(lang, "Nous collectons les informations que vous nous fournissez directement, notamment :", "We collect the information you provide directly, including:")],
      list: [
        pick(lang, "Données professionnelles : coordonnées de la clinique, du praticien et de contact.", "Professional data: clinic, practitioner and contact details."),
        pick(lang, "Données de diagnostic : mesures de télémétrie et de performance anonymisées issues des appareils.", "Diagnostic data: anonymized telemetry and performance metrics from the devices."),
        pick(lang, "Journaux d'utilisation : données d'interaction avec nos interfaces logicielles pour améliorer votre expérience.", "Usage logs: interaction data with our software interfaces to improve your experience."),
      ],
    },
    {
      title: pick(lang, "3. Utilisation des informations", "3. Use of information"),
      body: [pick(lang, "Les informations collectées sont utilisées strictement aux fins suivantes :", "The information collected is used strictly for the following purposes:")],
      list: [
        pick(lang, "Maintenir, calibrer et améliorer nos dispositifs médicaux.", "Maintain, calibrate and improve our medical devices."),
        pick(lang, "Fournir un support technique et répondre aux demandes de service.", "Provide technical support and respond to service requests."),
        pick(lang, "Surveiller les performances du système et détecter les anomalies.", "Monitor system performance and detect anomalies."),
        pick(lang, "Respecter les obligations réglementaires du secteur de la santé.", "Comply with healthcare regulatory requirements."),
      ],
    },
    {
      title: pick(lang, "4. Sécurité des données", "4. Data security"),
      body: [pick(lang, "Nous mettons en œuvre des mesures de sécurité de niveau professionnel pour protéger vos données :", "We implement enterprise-grade security measures to protect your data:")],
      list: [
        pick(lang, "Chiffrement de bout en bout pour les données transmises entre les appareils et nos serveurs.", "End-to-end encryption for data transmitted between devices and our servers."),
        pick(lang, "Contrôles d'accès stricts et mécanismes d'authentification pour le personnel technique.", "Strict access controls and authentication mechanisms for technical staff."),
        pick(lang, "Audits de sécurité réguliers et contrôles de conformité.", "Regular security audits and compliance checks."),
      ],
    },
    {
      title: pick(lang, "5. Politique relative aux cookies", "5. Cookie policy"),
      body: [
        pick(
          lang,
          "Nos plateformes numériques utilisent des cookies strictement nécessaires au fonctionnement du site ainsi que des cookies analytiques. Nous n'utilisons pas de cookies de publicité ciblée.",
          "Our digital platforms use strictly necessary cookies for the site to function, as well as analytics cookies. We do not use targeted advertising cookies."
        ),
        pick(
          lang,
          "Vous pouvez configurer votre navigateur pour refuser les cookies. Dans ce cas, certaines parties du service pourraient ne plus être disponibles.",
          "You can configure your browser to refuse cookies. In that case, some parts of the service may no longer be available."
        ),
      ],
    },
  ];

  const updated = new Date().toLocaleDateString(lang === "en" ? "en-US" : "fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <PageHeader
        eyebrow={pick(lang, `Dernière mise à jour : ${updated}`, `Last updated: ${updated}`)}
        title={pick(lang, "Politique de confidentialité", "Privacy Policy")}
      />

      <div className="container-max max-w-3xl py-12">
        <div className="flex flex-col gap-6">
          {sections.map((s) => (
            <section key={s.title} className="rounded-lg border border-outline-variant bg-surface-gray p-6">
              <h2 className="mb-3 font-display text-headline-md text-primary-container">{s.title}</h2>
              {s.body.map((p, i) => (
                <p key={i} className="mb-3 leading-relaxed text-on-surface-variant">{p}</p>
              ))}
              {s.list && (
                <ul className="ml-5 list-disc space-y-1.5 text-on-surface-variant">
                  {s.list.map((li, i) => (
                    <li key={i}>{li}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-on-surface-variant">
          {pick(lang, "Pour toute question relative à cette politique, contactez", "For any questions about this policy, contact")}{" "}
          <a href={`mailto:${site.email}`} className="text-primary-container hover:text-primary">{site.email}</a>.
        </p>
      </div>
    </>
  );
}
