"use client";

import { PageHeader } from "@/components/PageHeader";
import { Accordion, type QA } from "@/components/Accordion";
import { site, whatsappLink } from "@/lib/site";
import { PhoneIcon, MailIcon, LocationIcon, WhatsAppIcon } from "@/components/Icons";
import { useLang, pick } from "@/i18n/LanguageProvider";

export default function SupportPage() {
  const { lang } = useLang();

  const faq: QA[] = [
    {
      q: pick(lang, "Comment planifier une maintenance de routine ?", "How do I schedule routine maintenance?"),
      a: pick(
        lang,
        "Contactez-nous par téléphone, e-mail ou WhatsApp en indiquant le modèle de votre appareil. Notre équipe planifiera l'intervention.",
        "Contact us by phone, email or WhatsApp with your device model. Our team will schedule the visit."
      ),
    },
    {
      q: pick(lang, "Quelle est votre politique pour les pièces de rechange ?", "What is your spare parts policy?"),
      a: pick(
        lang,
        "Nous fournissons des pièces d'origine pour l'ensemble des marques que nous distribuons, sous réserve de disponibilité.",
        "We provide original parts for all the brands we distribute, subject to availability."
      ),
    },
    {
      q: pick(lang, "Proposez-vous un support technique à distance ?", "Do you offer remote technical support?"),
      a: pick(
        lang,
        "Oui, nos ingénieurs cliniques assurent un support à distance et sur site selon la nature de la demande.",
        "Yes, our clinical engineers provide remote and on-site support depending on the request."
      ),
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow={pick(lang, "Nous sommes là pour vous aider", "We're here to help")}
        title={pick(lang, "Contact & Support", "Contact & Support")}
        subtitle={pick(
          lang,
          "Notre équipe est à votre disposition pour la maintenance de vos équipements, les demandes techniques et toute information générale.",
          "Our team is available for equipment maintenance, technical requests and general inquiries."
        )}
      />

      {/* Contact cards */}
      <section className="container-max grid grid-cols-1 gap-gutter py-12 md:grid-cols-3">
        <ContactCard
          icon={<PhoneIcon className="h-7 w-7" />}
          title={pick(lang, "Téléphone", "Phone")}
          subtitle={pick(lang, "Du lundi au vendredi, 9h00 – 18h00 (GMT+1)", "Monday to Friday, 9:00 AM – 6:00 PM (GMT+1)")}
        >
          <a href={`tel:${site.phonePrimary}`} className="block text-primary-container hover:text-primary">{site.phonePrimary}</a>
          <a href={`tel:${site.phoneSecondary}`} className="block text-primary-container hover:text-primary">{site.phoneSecondary}</a>
        </ContactCard>

        <ContactCard
          icon={<MailIcon className="h-7 w-7" />}
          title={pick(lang, "E-mail", "Email")}
          subtitle={pick(lang, "Pour toute demande détaillée ou non urgente.", "For detailed or non-urgent inquiries.")}
        >
          <a href={`mailto:${site.email}`} className="block text-primary-container hover:text-primary">{site.email}</a>
          <a href={`mailto:${site.emailSupport}`} className="block text-primary-container hover:text-primary">{site.emailSupport}</a>
        </ContactCard>

        <ContactCard
          icon={<WhatsAppIcon className="h-7 w-7" />}
          title="WhatsApp"
          subtitle={pick(lang, "Réponse rapide pour vos demandes commerciales.", "Fast response for your sales inquiries.")}
        >
          <a
            href={whatsappLink(pick(lang, `Bonjour ${site.name}, j'ai une question.`, `Hello ${site.name}, I have a question.`))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded bg-whatsapp px-4 py-2 text-sm font-medium text-white hover:brightness-95"
          >
            <WhatsAppIcon className="h-4 w-4" />
            {pick(lang, "Démarrer une discussion", "Start a chat")}
          </a>
        </ContactCard>
      </section>

      {/* FAQ + Location */}
      <section className="border-t border-outline-variant bg-surface-gray px-margin-edge py-16">
        <div className="mx-auto grid max-w-container-max grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 font-display text-headline-md text-primary-container">
              {pick(lang, "Questions fréquentes", "Frequently asked questions")}
            </h2>
            <Accordion items={faq} />
          </div>
          <div>
            <h2 className="mb-6 font-display text-headline-md text-primary-container">
              {pick(lang, "Nous rendre visite", "Visit us")}
            </h2>
            <p className="mb-4 flex items-center gap-2 text-on-surface-variant">
              <LocationIcon className="h-5 w-5 text-primary-container" />
              {site.address}
            </p>
            <div className="h-[320px] overflow-hidden rounded-lg border border-outline-variant">
              <iframe
                title={pick(lang, "Localisation OphtaHealth", "OphtaHealth location")}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                src="https://www.openstreetmap.org/export/embed.html?bbox=10.0%2C36.7%2C10.3%2C36.9&layer=mapnik&marker=36.8%2C10.18"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactCard({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-outline-variant bg-clinical-white p-8 text-center">
      <span className="mb-4 grid h-14 w-14 place-items-center rounded-full bg-primary-container/10 text-primary-container">{icon}</span>
      <h3 className="mb-2 font-display text-lg font-semibold text-on-surface">{title}</h3>
      <p className="mb-4 text-sm text-on-surface-variant">{subtitle}</p>
      <div className="space-y-1">{children}</div>
    </div>
  );
}
