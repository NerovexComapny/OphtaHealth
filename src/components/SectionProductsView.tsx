"use client";

import Link from "next/link";
import { useAdminData } from "@/lib/store";
import { getSection } from "@/data/categories";
import { ProductCard } from "./ProductCard";
import { PageHeader } from "./PageHeader";
import { ArrowRight, EyeIcon, TagIcon } from "./Icons";
import { t } from "@/i18n/ui";

const icons = { eye: EyeIcon, tag: TagIcon } as const;

interface Props {
  /** Section slug ("optique" | "occasion"). */
  section: string;
  title: string;
  /** Intro shown under the page title (always visible). */
  subtitle?: string;
  /** Icon shown in the empty state. */
  icon: keyof typeof icons;
}

/** Shared "Nous contacter" call-to-action button. */
function ContactCTA() {
  return (
    <Link href="/support" className="btn-solid">
      {t("contactUs")}
      <ArrowRight className="h-5 w-5" />
    </Link>
  );
}

export function SectionProductsView({ section, title, subtitle, icon }: Props) {
  const Icon = icons[icon];
  const data = useAdminData();
  const meta = getSection(section);
  const items = data.products.filter((p) => p.section === section);
  // Avoid a redundant eyebrow when it would just repeat the title.
  const eyebrow = meta && meta.label !== title ? meta.label : undefined;

  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />

      {!data.ready ? (
        <div className="container-max py-24 text-center text-on-surface-variant">Chargement...</div>
      ) : items.length === 0 ? (
        // Empty: the intro already lives in the subtitle above — just invite contact.
        <section className="container-max flex flex-col items-center py-24 text-center">
          <span className="mb-8 grid h-20 w-20 place-items-center rounded-full bg-primary-container/10 text-primary-container">
            <Icon className="h-10 w-10" />
          </span>
          <ContactCTA />
        </section>
      ) : (
        <>
          <div className="container-max py-12">
            <p className="mb-6 font-mono text-label-caps uppercase text-on-surface-variant">
              {items.length} produit{items.length > 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 xl:grid-cols-3">
              {items.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
          {/* Products present → contact CTA sits just before the footer. */}
          <section className="border-t border-outline-variant bg-surface-gray">
            <div className="container-max flex flex-col items-center gap-4 py-12 text-center">
              <p className="text-on-surface-variant">
                Une question sur l&apos;un de ces équipements ?
              </p>
              <ContactCTA />
            </div>
          </section>
        </>
      )}
    </>
  );
}
