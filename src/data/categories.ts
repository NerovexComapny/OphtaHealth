import type { Lang } from "@/i18n/LanguageProvider";

export type SectionSlug = "consultation" | "exploration" | "sante-oculaire";

export interface SubCategory {
  slug: string;
  name: string;
  nameEn?: string;
}

export interface Section {
  slug: SectionSlug;
  /** "Section A / B / C" label from the cahier des charges. */
  label: string;
  name: string;
  nameEn?: string;
  description: string;
  descriptionEn?: string;
  /** Representative image for the category card. */
  cover: string;
  subcategories: SubCategory[];
}

/**
 * Catalog taxonomy: 3 sections, 19 subcategories total.
 * Matches the homepage dropdown navigation from the Stitch design.
 */
export const sections: Section[] = [
  {
    slug: "consultation",
    label: "Section A",
    name: "Consultation",
    nameEn: "Consultation",
    description:
      "Unités de consultation, lampes à fente, réfractomètres, tonomètres et tout l'équipement pour votre cabinet ophtalmologique.",
    descriptionEn:
      "Consultation units, slit lamps, refractors, tonometers and all the equipment for your ophthalmology practice.",
    cover: "/brand/consultation.png",
    subcategories: [
      { slug: "unite-de-consultation", name: "Unité de consultation", nameEn: "Consultation unit" },
      { slug: "lampe-a-fente", name: "Lampe à fente", nameEn: "Slit lamp" },
      { slug: "auto-refractometre", name: "Auto-Réfractomètre", nameEn: "Auto refractor" },
      { slug: "refracteur-automatique", name: "Réfracteur Automatique", nameEn: "Automatic phoropter" },
      { slug: "tonometre-air-rebound", name: "Tonomètre à air / Rebound", nameEn: "Air / Rebound tonometer" },
      { slug: "frontofocometre", name: "Frontofocomètre", nameEn: "Lensmeter" },
      { slug: "projecteur-ecran-test", name: "Projecteur et Écran de test", nameEn: "Chart projector & test screen" },
      { slug: "chaine-refraction-courte-distance", name: "Chaîne de réfraction courte distance", nameEn: "Short-distance refraction chain" },
    ],
  },
  {
    slug: "exploration",
    label: "Section B",
    name: "Exploration",
    nameEn: "Exploration",
    description:
      "Rétinographes, OCT, biomètres, topographes cornéens, microscopes spéculaires et échographie.",
    descriptionEn:
      "Fundus cameras, OCT, biometers, corneal topographers, specular microscopes and ultrasound.",
    cover: "/brand/exploration.png",
    subcategories: [
      { slug: "retinographes", name: "Rétinographes", nameEn: "Fundus cameras" },
      { slug: "tonometre-rebound", name: "Tonomètre à Rebound", nameEn: "Rebound tonometer" },
      { slug: "microscope-speculaire", name: "Microscope spéculaire", nameEn: "Specular microscope" },
      { slug: "champ-visuel", name: "Champ visuel", nameEn: "Visual field" },
      { slug: "oct", name: "OCT", nameEn: "OCT" },
      { slug: "biometre-optique", name: "Biomètre optique", nameEn: "Optical biometer" },
      { slug: "echographie-ab", name: "Échographie AB", nameEn: "A/B ultrasound" },
      { slug: "topographe-corneen", name: "Topographe cornéen", nameEn: "Corneal topographer" },
    ],
  },
  {
    slug: "sante-oculaire",
    label: "Section C",
    name: "Santé Oculaire",
    nameEn: "Eye Health",
    description:
      "Solutions pour la sécheresse oculaire, diagnostic, soulagement et tables d'opération ophtalmique.",
    descriptionEn:
      "Solutions for dry eye — diagnosis, relief — and ophthalmic surgical tables.",
    cover: "/brand/sante-oculaire.png",
    subcategories: [
      { slug: "plateforme-secheresse-oculaire", name: "Plateforme sur la sécheresse oculaire", nameEn: "Dry eye platform" },
      { slug: "soulagement-secheresse-oculaire", name: "Soulagement de la sécheresse oculaire", nameEn: "Dry eye relief" },
      { slug: "table-operation-ophtalmique", name: "Table d'opération ophtalmique", nameEn: "Ophthalmic surgical table" },
    ],
  },
];

export const getSection = (slug: string) => sections.find((s) => s.slug === slug);

export const allSubcategories = sections.flatMap((s) =>
  s.subcategories.map((sub) => ({ ...sub, section: s.slug }))
);

export const getSubcategoryName = (slug: string, lang: Lang = "fr") => {
  const sub = allSubcategories.find((s) => s.slug === slug);
  if (!sub) return slug;
  return lang === "en" ? sub.nameEn ?? sub.name : sub.name;
};

/** Localized helpers. */
export const sectionName = (s: Section, lang: Lang) => (lang === "en" ? s.nameEn ?? s.name : s.name);
export const sectionDesc = (s: Section, lang: Lang) =>
  lang === "en" ? s.descriptionEn ?? s.description : s.description;
