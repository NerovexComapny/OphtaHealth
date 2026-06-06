"use client";

import Image from "next/image";
import Link from "next/link";
import { type Article, articles, formatDate, articleTitle, articleExcerpt, articleCategory } from "@/data/blog";
import { ArrowRight } from "@/components/Icons";
import { useLang, pick } from "@/i18n/LanguageProvider";

export function ArticleView({ article }: { article: Article }) {
  const { lang } = useLang();
  const more = articles.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <article className="container-max max-w-3xl py-12">
      <Link href="/blog" className="mb-6 inline-flex items-center gap-1 text-sm text-primary-container hover:text-primary">
        ← {pick(lang, "Retour au blog", "Back to blog")}
      </Link>

      <span className="mb-4 block w-fit rounded-full bg-primary-container/10 px-3 py-1 font-mono text-label-caps uppercase text-primary-container">
        {articleCategory(article, lang)}
      </span>
      <h1 className="mb-3 font-display text-[40px] font-bold leading-tight text-primary-container">
        {articleTitle(article, lang)}
      </h1>
      <p className="mb-8 text-sm text-on-surface-variant">
        {pick(lang, "Publié le", "Published on")} {formatDate(article.date, lang)}
      </p>

      <div className="relative mb-8 h-72 overflow-hidden rounded-lg border border-outline-variant bg-surface-container-low">
        <Image src={article.cover} alt={articleTitle(article, lang)} fill className="object-contain p-6" />
      </div>

      <div className="space-y-5 leading-relaxed text-on-surface">
        <p className="text-lg text-on-surface-variant">{articleExcerpt(article, lang)}</p>
        <p>
          {pick(
            lang,
            "Cet article est un contenu de démonstration. Le contenu éditorial complet sera rédigé par l'administrateur via l'éditeur de texte riche du tableau de bord, dans l'objectif principal d'améliorer le référencement naturel (SEO) du site OphtaHealth.",
            "This article is placeholder content. The full editorial content will be written by the administrator through the dashboard's rich-text editor, primarily to improve the SEO of the OphtaHealth website."
          )}
        </p>
        <p>
          {pick(
            lang,
            "Chaque article publié comprend un titre, une image de couverture, un contenu riche et une date de publication, et reste entièrement géré depuis l'espace administrateur.",
            "Each published article includes a title, a cover image, rich content and a publication date, and is fully managed from the admin area."
          )}
        </p>
      </div>

      <section className="mt-16 border-t border-outline-variant pt-8">
        <h2 className="mb-6 font-display text-headline-md text-primary-container">{pick(lang, "À lire également", "Also read")}</h2>
        <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2">
          {more.map((a) => (
            <Link
              key={a.slug}
              href={`/blog/${a.slug}`}
              className="group flex items-center justify-between gap-4 rounded-lg border border-outline-variant bg-surface-gray p-5 transition-shadow hover:shadow-md"
            >
              <span className="font-display font-semibold text-on-surface group-hover:text-primary">{articleTitle(a, lang)}</span>
              <ArrowRight className="h-5 w-5 shrink-0 text-primary-container" />
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
