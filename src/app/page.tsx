"use client";

import Link from "next/link";
import Image from "next/image";
import { HeroCarousel } from "@/components/HeroCarousel";
import { BrandStrip } from "@/components/BrandStrip";
import { ProductCard } from "@/components/ProductCard";
import { featuredProducts, products } from "@/data/products";
import { sections, sectionName, sectionDesc } from "@/data/categories";
import { brands } from "@/data/brands";
import { ArrowRight, SupportIcon } from "@/components/Icons";
import { useLang, pick } from "@/i18n/LanguageProvider";
import { t } from "@/i18n/ui";

export default function HomePage() {
  const { lang } = useLang();
  const highlights = products.filter((p) => p.inStock).slice(0, 4);

  return (
    <>
      <HeroCarousel products={featuredProducts} />

      <BrandStrip />

      {/* Categories */}
      <section className="border-b border-outline-variant bg-clinical-white px-margin-edge py-16">
        <div className="mx-auto max-w-container-max">
          <h2 className="section-title mb-12">
            {pick(lang, "Nos Catégories de Produits", "Our Product Categories")}
          </h2>
          <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
            {sections.map((section) => (
              <div
                key={section.slug}
                className="flex flex-col overflow-hidden rounded-lg border border-outline-variant bg-surface-gray transition-shadow hover:shadow-md"
              >
                <div className="relative h-48 overflow-hidden border-b border-outline-variant bg-surface-container-low">
                  <Image
                    src={section.cover}
                    alt={sectionName(section, lang)}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="flex flex-grow flex-col p-6">
                  <p className="mb-1 font-mono text-label-caps uppercase text-on-surface-variant">
                    {section.label}
                  </p>
                  <h3 className="mb-3 font-display text-headline-md text-on-surface">{sectionName(section, lang)}</h3>
                  <p className="mb-6 flex-grow text-on-surface-variant">{sectionDesc(section, lang)}</p>
                  <Link href={`/catalogue?section=${section.slug}`} className="btn-outline w-full">
                    {t(lang, "seeProducts")}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products grid */}
      <section className="border-b border-outline-variant bg-surface-gray px-margin-edge py-16">
        <div className="mx-auto max-w-container-max">
          <div className="mb-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <h2 className="font-display text-headline-lg text-primary-container">
              {pick(lang, "Produits en vedette", "Featured products")}
            </h2>
            <Link href="/catalogue" className="inline-flex items-center gap-1 font-medium text-primary-container hover:text-primary">
              {t(lang, "seeAllCatalog")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* About / stats */}
      <section className="bg-clinical-white px-margin-edge py-16">
        <div className="mx-auto max-w-container-max">
          <div className="mb-12 grid grid-cols-2 gap-4 rounded-lg border border-outline-variant bg-surface-gray p-6 text-center md:grid-cols-4">
            <Stat value={`${brands.length}+`} label={pick(lang, "Marques Partenaires", "Partner Brands")} />
            <Stat value={`${products.length}`} label={pick(lang, "Produits", "Products")} />
            <Stat value={`${sections.length}`} label={pick(lang, "Catégories", "Categories")} />
            <div className="flex flex-col items-center">
              <SupportIcon className="mb-1 h-8 w-8 text-primary-container" />
              <span className="text-sm text-on-surface-variant">{pick(lang, "Support Technique", "Technical Support")}</span>
            </div>
          </div>
          <div className="grid grid-cols-1 items-center gap-gutter md:grid-cols-2">
            <div>
              <h2 className="mb-6 font-display text-headline-lg text-primary-container">{t(lang, "about")}</h2>
              <p className="mb-6 leading-relaxed text-on-surface-variant">
                {pick(
                  lang,
                  "OphtaHealth équipe les professionnels de la santé visuelle avec des technologies de pointe. Notre engagement : fournir des outils de diagnostic de haute fidélité et des instruments chirurgicaux garantissant précision, fiabilité et de meilleurs résultats pour les patients.",
                  "OphtaHealth equips eye care professionals with cutting-edge technology. Our commitment: to provide high-fidelity diagnostic tools and surgical instruments that ensure precision, reliability and better patient outcomes."
                )}
              </p>
              <Link href="/a-propos" className="btn-outline">
                {t(lang, "learnMore")}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
            <div className="h-[360px] overflow-hidden rounded-lg border border-outline-variant">
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

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-display text-[32px] font-bold text-primary-container">{value}</span>
      <span className="text-sm text-on-surface-variant">{label}</span>
    </div>
  );
}
