"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { type Product, productTagline } from "@/data/products";
import { ArrowRight } from "./Icons";
import { useLang } from "@/i18n/LanguageProvider";
import { t } from "@/i18n/ui";

export function HeroCarousel({ products }: { products: Product[] }) {
  const { lang } = useLang();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (products.length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % products.length), 5000);
    return () => clearInterval(id);
  }, [products.length]);

  return (
    <header className="relative w-full overflow-hidden border-b border-outline-variant bg-clinical-white">
      <div className="relative min-h-[70vh]">
        {products.map((p, i) => (
          <div
            key={p.slug}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <div className="container-max flex h-full flex-col items-center gap-8 py-12 md:flex-row">
              {/* Image — always LEFT */}
              <div className="flex w-full items-center justify-center md:w-1/2">
                <Image
                  src={p.image}
                  alt={p.name}
                  width={520}
                  height={520}
                  priority={i === 0}
                  className="max-h-[50vh] w-auto object-contain"
                />
              </div>

              {/* Text + button — always RIGHT */}
              <div className="flex w-full flex-col items-center text-center md:w-1/2 md:items-start md:pl-12 md:text-left">
                <p className="mb-3 font-mono text-label-caps uppercase tracking-widest text-on-surface-variant">
                  {t(lang, "featuredProduct")}
                </p>
                <h1 className="mb-6 font-display text-[44px] font-bold leading-tight text-primary-container md:text-display-lg">
                  {p.name}
                </h1>
                <p className="mb-8 max-w-md text-on-surface-variant">{productTagline(p, lang)}</p>
                <Link href={`/produits/${p.slug}`} className="btn-outline text-lg">
                  {t(lang, "knowMore")}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {products.map((p, i) => (
          <button
            key={p.slug}
            onClick={() => setIndex(i)}
            aria-label={`Voir ${p.name}`}
            className={`h-2.5 rounded-full transition-all ${
              i === index ? "w-8 bg-primary-container" : "w-2.5 bg-outline-variant"
            }`}
          />
        ))}
      </div>
    </header>
  );
}
