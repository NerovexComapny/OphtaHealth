"use client";

import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import {
  articles,
  blogCategories,
  formatDate,
  articleTitle,
  articleExcerpt,
  articleCategory,
} from "@/data/blog";
import { ArrowRight } from "@/components/Icons";
import { useLang, pick } from "@/i18n/LanguageProvider";

export function BlogView() {
  const { lang } = useLang();
  const [featured, ...rest] = articles;

  return (
    <>
      <PageHeader
        eyebrow={pick(lang, "Le blog OphtaHealth", "The OphtaHealth blog")}
        title={pick(lang, "Actualités & Innovation en Ophtalmologie", "News & Innovation in Ophthalmology")}
        subtitle={pick(
          lang,
          "Découvrez les dernières avancées technologiques, conseils cliniques et analyses du secteur pour les professionnels de la vision.",
          "Discover the latest technology advances, clinical tips and industry analysis for vision professionals."
        )}
      />

      <div className="container-max grid grid-cols-1 gap-10 py-12 lg:grid-cols-[1fr_300px]">
        <div>
          {/* Featured */}
          <Link
            href={`/blog/${featured.slug}`}
            className="group mb-10 grid grid-cols-1 overflow-hidden rounded-lg border border-outline-variant bg-clinical-white transition-shadow hover:shadow-md md:grid-cols-2"
          >
            <div className="relative h-64 overflow-hidden bg-surface-container-low md:h-full">
              <Image src={featured.cover} alt={articleTitle(featured, lang)} fill className="object-contain p-6" />
            </div>
            <div className="flex flex-col p-8">
              <span className="mb-3 w-fit rounded-full bg-primary-container/10 px-3 py-1 font-mono text-label-caps uppercase text-primary-container">
                {articleCategory(featured, lang)}
              </span>
              <h2 className="mb-3 font-display text-headline-md text-on-surface group-hover:text-primary">
                {articleTitle(featured, lang)}
              </h2>
              <p className="mb-4 flex-grow text-on-surface-variant">{articleExcerpt(featured, lang)}</p>
              <span className="text-sm text-on-surface-variant">{formatDate(featured.date, lang)}</span>
            </div>
          </Link>

          <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2">
            {rest.map((a) => (
              <Link
                key={a.slug}
                href={`/blog/${a.slug}`}
                className="group flex flex-col overflow-hidden rounded-lg border border-outline-variant bg-clinical-white transition-shadow hover:shadow-md"
              >
                <div className="relative h-44 overflow-hidden border-b border-outline-variant bg-surface-container-low">
                  <Image src={a.cover} alt={articleTitle(a, lang)} fill className="object-contain p-4" />
                  <span className="absolute left-3 top-3 rounded-full bg-clinical-white/90 px-3 py-1 font-mono text-label-caps uppercase text-primary-container">
                    {articleCategory(a, lang)}
                  </span>
                </div>
                <div className="flex flex-grow flex-col p-5">
                  <h3 className="mb-2 font-display text-lg font-semibold text-on-surface group-hover:text-primary">
                    {articleTitle(a, lang)}
                  </h3>
                  <p className="mb-4 flex-grow text-sm text-on-surface-variant">{articleExcerpt(a, lang)}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-on-surface-variant">{formatDate(a.date, lang)}</span>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary-container">
                      {pick(lang, "Lire", "Read")} <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="flex h-fit flex-col gap-6">
          <div className="rounded-lg border border-outline-variant bg-surface-gray p-6">
            <h3 className="mb-3 font-display text-lg font-semibold text-primary-container">{pick(lang, "Recherche", "Search")}</h3>
            <input
              type="text"
              placeholder={pick(lang, "Rechercher un article…", "Search an article…")}
              aria-label={pick(lang, "Rechercher un article", "Search an article")}
              className="w-full rounded border border-outline-variant bg-clinical-white px-3 py-2.5 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="rounded-lg border border-outline-variant bg-surface-gray p-6">
            <h3 className="mb-3 font-display text-lg font-semibold text-primary-container">{pick(lang, "Catégories", "Categories")}</h3>
            <ul className="flex flex-col gap-2">
              {blogCategories(lang).map((c) => (
                <li key={c}>
                  <span className="cursor-pointer text-on-surface-variant transition-colors hover:text-primary">{c}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-outline-variant bg-surface-gray p-6">
            <h3 className="mb-3 font-display text-lg font-semibold text-primary-container">{pick(lang, "Articles récents", "Recent articles")}</h3>
            <ul className="flex flex-col gap-3">
              {articles.slice(0, 3).map((a) => (
                <li key={a.slug}>
                  <Link href={`/blog/${a.slug}`} className="text-sm text-on-surface-variant hover:text-primary">
                    {articleTitle(a, lang)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
