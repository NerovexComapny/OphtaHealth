"use client";

import Link from "next/link";
import { type Product, products, productDescription } from "@/data/products";
import { getBrand } from "@/data/brands";
import { getSection, getSubcategoryName, sectionName } from "@/data/categories";
import { ProductActions } from "./ProductActions";
import { ProductCard } from "./ProductCard";
import { ProductImage } from "./ProductImage";
import { ChevronRight } from "./Icons";
import { useLang, pick } from "@/i18n/LanguageProvider";
import { t } from "@/i18n/ui";

export function ProductView({ product }: { product: Product }) {
  const { lang } = useLang();
  const brand = getBrand(product.brand);
  const section = getSection(product.section);
  const related = products
    .filter((p) => p.section === product.section && p.slug !== product.slug)
    .slice(0, 3);

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-outline-variant bg-surface-gray">
        <nav className="container-max flex flex-wrap items-center gap-2 py-4 font-mono text-label-caps uppercase text-on-surface-variant">
          <Link href="/catalogue" className="hover:text-primary">{pick(lang, "Catalogue", "Catalog")}</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href={`/catalogue?section=${product.section}`} className="hover:text-primary">
            {section ? sectionName(section, lang) : product.section}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-primary-container">{product.name}</span>
        </nav>
      </div>

      <article className="container-max py-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Image */}
          <div className="flex items-center justify-center rounded-lg border border-outline-variant bg-surface-container-low p-8">
            <ProductImage
              src={product.image}
              alt={product.name}
              width={560}
              height={560}
              priority
              className="max-h-[460px] w-auto object-contain"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <p className="mb-2 font-mono text-label-caps uppercase tracking-wide text-on-surface-variant">
              {section ? sectionName(section, lang) : product.section} / {getSubcategoryName(product.subcategory, lang)}
            </p>
            <h1 className="mb-3 font-display text-display-md text-primary-container">{product.name}</h1>
            <p className="mb-4 text-on-surface-variant">
              {t(lang, "brand")} :{" "}
              <Link href={`/catalogue?brand=${product.brand}`} className="font-medium text-primary-container hover:text-primary">
                {brand?.name}
              </Link>
            </p>

            <span
              className={`mb-6 w-fit rounded-full px-3 py-1 font-mono text-label-caps uppercase ${
                product.inStock ? "bg-status-success/10 text-status-success" : "bg-error/10 text-error"
              }`}
            >
              {product.inStock ? t(lang, "inStock") : t(lang, "outOfStock")}
            </span>

            <p className="mb-6 leading-relaxed text-on-surface">{productDescription(product, lang)}</p>

            {/* Specs */}
            <div className="mb-8 grid grid-cols-2 gap-4">
              {product.specs.map((spec) => (
                <div key={spec.label} className="rounded-lg border border-outline-variant bg-surface-gray p-4">
                  <p className="font-mono text-label-caps uppercase text-on-surface-variant">{spec.label}</p>
                  <p className="mt-1 font-display font-semibold text-on-surface">{spec.value}</p>
                </div>
              ))}
            </div>

            <ProductActions
              productName={product.name}
              productSlug={product.slug}
              brandName={brand?.name ?? product.brand}
              brochure={product.brochure}
            />
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-8 font-display text-headline-lg text-primary-container">
              {pick(lang, "Produits similaires", "Related products")}
            </h2>
            <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
