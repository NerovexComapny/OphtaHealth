"use client";

import Link from "next/link";
import { type Product, productTagline } from "@/data/products";
import { getBrand } from "@/data/brands";
import { ProductImage } from "./ProductImage";
import { ArrowRight } from "./Icons";
import { useLang } from "@/i18n/LanguageProvider";
import { t } from "@/i18n/ui";

export function ProductCard({ product }: { product: Product }) {
  const { lang } = useLang();
  const brand = getBrand(product.brand);
  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-outline-variant bg-clinical-white transition-shadow hover:shadow-md">
      <Link href={`/produits/${product.slug}`} className="relative block">
        <div className="relative flex h-52 items-center justify-center overflow-hidden border-b border-outline-variant bg-surface-container-low">
          <ProductImage
            src={product.image}
            alt={product.name}
            width={400}
            height={300}
            className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 font-mono text-label-caps uppercase ${
            product.inStock
              ? "bg-status-success/10 text-status-success"
              : "bg-error/10 text-error"
          }`}
        >
          {product.inStock ? t(lang, "inStock") : t(lang, "outOfStock")}
        </span>
      </Link>
      <div className="flex flex-grow flex-col p-5">
        <p className="mb-1 font-mono text-label-caps uppercase tracking-wide text-on-surface-variant">
          {brand?.name ?? product.brand}
        </p>
        <h3 className="mb-2 font-display text-lg font-semibold text-on-surface">{product.name}</h3>
        <p className="mb-4 flex-grow text-sm text-on-surface-variant">{productTagline(product, lang)}</p>
        <Link
          href={`/produits/${product.slug}`}
          className="inline-flex items-center gap-1 font-medium text-primary-container transition-colors hover:text-primary"
        >
          {t(lang, "seeProduct")}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
