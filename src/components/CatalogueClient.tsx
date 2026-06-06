"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { products } from "@/data/products";
import { sections, getSection, sectionName } from "@/data/categories";
import { brands } from "@/data/brands";
import { ProductCard } from "./ProductCard";
import { PageHeader } from "./PageHeader";
import { useLang, pick } from "@/i18n/LanguageProvider";

type StockFilter = "all" | "in" | "out";

export function CatalogueClient() {
  const { lang } = useLang();
  const params = useSearchParams();
  const [section, setSection] = useState<string>("all");
  const [sub, setSub] = useState<string>("all");
  const [brand, setBrand] = useState<string>("all");
  const [stock, setStock] = useState<StockFilter>("all");

  useEffect(() => {
    setSection(params.get("section") ?? "all");
    setSub(params.get("sub") ?? "all");
  }, [params]);

  const activeSection = section !== "all" ? getSection(section) : undefined;

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (section !== "all" && p.section !== section) return false;
      if (sub !== "all" && p.subcategory !== sub) return false;
      if (brand !== "all" && p.brand !== brand) return false;
      if (stock === "in" && !p.inStock) return false;
      if (stock === "out" && p.inStock) return false;
      return true;
    });
  }, [section, sub, brand, stock]);

  const reset = () => {
    setSection("all");
    setSub("all");
    setBrand("all");
    setStock("all");
  };

  const selectClass =
    "w-full rounded border border-outline-variant bg-clinical-white px-3 py-2.5 text-on-surface outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30";

  return (
    <>
      <PageHeader
        eyebrow={pick(lang, "Équipements ophtalmiques de précision", "Precision ophthalmic equipment")}
        title={pick(lang, "Notre Catalogue", "Our Catalog")}
        subtitle={pick(
          lang,
          "Découvrez notre sélection complète d'équipements destinés aux professionnels de la santé visuelle.",
          "Explore our complete selection of equipment for eye care professionals."
        )}
      />

      <div className="container-max grid grid-cols-1 gap-8 py-12 lg:grid-cols-[260px_1fr]">
        {/* Filters */}
        <aside className="h-fit rounded-lg border border-outline-variant bg-surface-gray p-6 lg:sticky lg:top-24">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-primary-container">{pick(lang, "Filtres", "Filters")}</h2>
            <button onClick={reset} className="text-sm text-primary-container hover:text-primary">
              {pick(lang, "Réinitialiser", "Reset")}
            </button>
          </div>

          <div className="flex flex-col gap-5">
            <Filter label={pick(lang, "Section", "Section")}>
              <select
                className={selectClass}
                value={section}
                onChange={(e) => {
                  setSection(e.target.value);
                  setSub("all");
                }}
              >
                <option value="all">{pick(lang, "Toutes les sections", "All sections")}</option>
                {sections.map((s) => (
                  <option key={s.slug} value={s.slug}>{sectionName(s, lang)}</option>
                ))}
              </select>
            </Filter>

            <Filter label={pick(lang, "Catégorie", "Category")}>
              <select className={selectClass} value={sub} onChange={(e) => setSub(e.target.value)} disabled={!activeSection}>
                <option value="all">{pick(lang, "Toutes les catégories", "All categories")}</option>
                {activeSection?.subcategories.map((s) => (
                  <option key={s.slug} value={s.slug}>{lang === "en" ? s.nameEn ?? s.name : s.name}</option>
                ))}
              </select>
            </Filter>

            <Filter label={pick(lang, "Marque", "Brand")}>
              <select className={selectClass} value={brand} onChange={(e) => setBrand(e.target.value)}>
                <option value="all">{pick(lang, "Toutes les marques", "All brands")}</option>
                {brands.map((b) => (
                  <option key={b.slug} value={b.slug}>{b.name}</option>
                ))}
              </select>
            </Filter>

            <Filter label={pick(lang, "Disponibilité", "Availability")}>
              <select className={selectClass} value={stock} onChange={(e) => setStock(e.target.value as StockFilter)}>
                <option value="all">{pick(lang, "Tous", "All")}</option>
                <option value="in">{pick(lang, "En stock", "In stock")}</option>
                <option value="out">{pick(lang, "Hors stock", "Out of stock")}</option>
              </select>
            </Filter>
          </div>
        </aside>

        {/* Results */}
        <div>
          <p className="mb-6 font-mono text-label-caps uppercase text-on-surface-variant">
            {filtered.length}{" "}
            {pick(
              lang,
              `produit${filtered.length > 1 ? "s" : ""} trouvé${filtered.length > 1 ? "s" : ""}`,
              `product${filtered.length > 1 ? "s" : ""} found`
            )}
          </p>
          {filtered.length === 0 ? (
            <div className="rounded-lg border border-dashed border-outline-variant bg-surface-gray p-12 text-center text-on-surface-variant">
              {pick(lang, "Aucun produit ne correspond à ces filtres.", "No products match these filters.")}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function Filter({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block font-mono text-label-caps uppercase text-on-surface-variant">{label}</label>
      {children}
    </div>
  );
}
