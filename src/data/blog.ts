import type { Lang } from "@/i18n/LanguageProvider";

export interface Article {
  slug: string;
  title: string;
  titleEn: string;
  excerpt: string;
  excerptEn: string;
  category: string;
  categoryEn: string;
  date: string; // ISO
  cover: string;
}

/** Editorial articles managed by the admin — SEO-oriented. Placeholder content. */
export const articles: Article[] = [
  {
    slug: "evolution-chirurgie-laser-2024",
    title: "L'évolution de la chirurgie au laser en 2024",
    titleEn: "The evolution of laser surgery in 2024",
    excerpt:
      "Une analyse approfondie des nouveaux systèmes de suivi oculaire intégrés aux lasers femtosecondes de dernière génération.",
    excerptEn:
      "An in-depth look at the new eye-tracking systems built into the latest femtosecond lasers.",
    category: "Technologie",
    categoryEn: "Technology",
    date: "2024-09-18",
    cover: "/catalog/os1000.jpeg",
  },
  {
    slug: "optimisation-flux-travail-clinique",
    title: "Optimisation du flux de travail en clinique",
    titleEn: "Optimizing clinical workflow",
    excerpt:
      "Stratégies pour réduire les temps d'attente tout en maintenant une qualité de diagnostic exceptionnelle lors des consultations de routine.",
    excerptEn:
      "Strategies to reduce waiting times while maintaining exceptional diagnostic quality during routine consultations.",
    category: "Conseils Cliniques",
    categoryEn: "Clinical Tips",
    date: "2024-08-05",
    cover: "/catalog/elite.jpeg",
  },
  {
    slug: "resume-congres-europeen-ophtalmologie",
    title: "Résumé : Congrès Européen d'Ophtalmologie",
    titleEn: "Recap: European Congress of Ophthalmology",
    excerpt:
      "Les points clés et annonces majeures concernant l'imagerie rétinienne présentés lors du sommet de cette année à Paris.",
    excerptEn:
      "The key takeaways and major announcements on retinal imaging from this year's summit in Paris.",
    category: "Événements",
    categoryEn: "Events",
    date: "2024-07-22",
    cover: "/catalog/retiwave-1000.jpeg",
  },
  {
    slug: "ia-detection-precoce-glaucome",
    title: "IA et détection précoce du glaucome",
    titleEn: "AI and early glaucoma detection",
    excerpt:
      "Comment les nouveaux algorithmes d'apprentissage automatique améliorent la précision du dépistage à partir des données OCT.",
    excerptEn:
      "How new machine-learning algorithms improve screening accuracy from OCT data.",
    category: "Innovation",
    categoryEn: "Innovation",
    date: "2024-06-30",
    cover: "/catalog/mocean-4000.jpeg",
  },
  {
    slug: "entretien-lampe-a-fente-bonnes-pratiques",
    title: "Entretien de la lampe à fente : bonnes pratiques",
    titleEn: "Slit lamp maintenance: best practices",
    excerpt:
      "Un guide pratique pour prolonger la durée de vie de vos instruments et garantir des mesures fiables au quotidien.",
    excerptEn:
      "A practical guide to extending your instruments' lifespan and ensuring reliable daily measurements.",
    category: "Maintenance",
    categoryEn: "Maintenance",
    date: "2024-05-14",
    cover: "/catalog/sl-1s.jpeg",
  },
  {
    slug: "biometrie-optique-calcul-implant",
    title: "Biométrie optique et calcul d'implant",
    titleEn: "Optical biometry and IOL calculation",
    excerpt:
      "Pourquoi la biométrie optique sans contact est devenue la référence pour la planification de la chirurgie de la cataracte.",
    excerptEn:
      "Why non-contact optical biometry has become the standard for cataract surgery planning.",
    category: "Technologie",
    categoryEn: "Technology",
    date: "2024-04-02",
    cover: "/catalog/colombo-iol-ii.jpeg",
  },
];

export const blogCategories = (lang: Lang = "fr") =>
  Array.from(new Set(articles.map((a) => (lang === "en" ? a.categoryEn : a.category))));

export const articleTitle = (a: Article, lang: Lang) => (lang === "en" ? a.titleEn : a.title);
export const articleExcerpt = (a: Article, lang: Lang) => (lang === "en" ? a.excerptEn : a.excerpt);
export const articleCategory = (a: Article, lang: Lang) => (lang === "en" ? a.categoryEn : a.category);

export const formatDate = (iso: string, lang: Lang = "fr") =>
  new Date(iso).toLocaleDateString(lang === "en" ? "en-US" : "fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
