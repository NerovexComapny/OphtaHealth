import type { SectionSlug } from "./categories";

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  slug: string;
  name: string;
  brand: string; // brand slug
  section: SectionSlug;
  subcategory: string; // subcategory slug
  image: string;
  inStock: boolean;
  featured?: boolean;
  /** Optional brochure file path under /public (e.g. /brochures/os1000.pdf). */
  brochure?: string;
  /** Short tagline shown on cards. */
  taglineFr: string;
  taglineEn: string;
  /** Full technical description. NOTE: placeholder copy — client to provide final text. */
  descriptionFr: string;
  descriptionEn: string;
  specs: ProductSpec[];
}

/**
 * Authoritative catalog — 38 products, from "Catalogue_OphtaHealth_Produits".
 * Distribution: Consultation 23 / Exploration 12 / Santé Oculaire 3.
 * Descriptions are professional placeholders; per the cahier des charges the client supplies the
 * final FR copy and the EN version is integrated in parallel.
 */
export const products: Product[] = [
  // ───────────────────────── SECTION A — CONSULTATION (23) ─────────────────────────
  {
    slug: "pro500",
    name: "PRO 500",
    brand: "rodenstock",
    section: "consultation",
    subcategory: "unite-de-consultation",
    image: "/catalog/pro500.jpeg",
    inStock: true,
    taglineFr: "Unité de consultation intégrée.",
    taglineEn: "Integrated refraction unit.",
    descriptionFr:
      "Unité de consultation complète réunissant fauteuil motorisé et colonne d'instruments pour un flux de travail optimisé en cabinet.",
    descriptionEn:
      "Complete consultation unit combining a motorized chair and instrument stand for an optimized in-office workflow.",
    specs: [
      { label: "Postes instruments", value: "2–3" },
      { label: "Fauteuil", value: "Motorisé" },
    ],
  },
  {
    slug: "delta-qp",
    name: "DELTA QP",
    brand: "medinstrus",
    section: "consultation",
    subcategory: "unite-de-consultation",
    image: "/catalog/deltaqp.jpeg",
    inStock: true,
    taglineFr: "Unité de consultation modulaire.",
    taglineEn: "Modular consultation unit.",
    descriptionFr:
      "Unité de consultation modulaire conçue pour s'adapter à la configuration de chaque cabinet ophtalmologique.",
    descriptionEn:
      "Modular consultation unit designed to adapt to the layout of any ophthalmology practice.",
    specs: [
      { label: "Configuration", value: "Modulaire" },
      { label: "Postes", value: "Jusqu'à 3" },
    ],
  },
  {
    slug: "drone4",
    name: "DRONE4",
    brand: "medinstrus",
    section: "consultation",
    subcategory: "unite-de-consultation",
    image: "/catalog/drone4.jpeg",
    inStock: true,
    taglineFr: "Unité de consultation compacte.",
    taglineEn: "Compact consultation unit.",
    descriptionFr:
      "Station de consultation compacte au design ergonomique, pensée pour le confort du praticien et du patient.",
    descriptionEn:
      "Compact consultation station with an ergonomic design, built for practitioner and patient comfort.",
    specs: [
      { label: "Design", value: "Ergonomique" },
      { label: "Éclairage", value: "LED intégré" },
    ],
  },
  {
    slug: "zulu-3",
    name: "ZULU-3",
    brand: "medinstrus",
    section: "consultation",
    subcategory: "unite-de-consultation",
    image: "/catalog/zulu3.jpeg",
    inStock: true,
    taglineFr: "Unité de consultation polyvalente.",
    taglineEn: "Versatile consultation unit.",
    descriptionFr:
      "Unité de consultation polyvalente offrant un agencement flexible des instruments de diagnostic.",
    descriptionEn:
      "Versatile consultation unit offering a flexible arrangement of diagnostic instruments.",
    specs: [
      { label: "Agencement", value: "Flexible" },
      { label: "Commande", value: "Électrique" },
    ],
  },
  {
    slug: "elite",
    name: "ELITE",
    brand: "medinstrus",
    section: "consultation",
    subcategory: "unite-de-consultation",
    image: "/catalog/elite.jpeg",
    inStock: true,
    taglineFr: "Unité de consultation haut de gamme.",
    taglineEn: "Premium refraction unit.",
    descriptionFr:
      "Station de consultation premium au design épuré, offrant un positionnement précis et un grand confort d'utilisation.",
    descriptionEn:
      "Premium consultation station with a clean design, offering precise positioning and great ease of use.",
    specs: [
      { label: "Gamme", value: "Premium" },
      { label: "Fauteuil", value: "Motorisé" },
    ],
  },
  {
    slug: "rsl-2600",
    name: "RSL 2600 / 2600 Digital",
    brand: "rodenstock",
    section: "consultation",
    subcategory: "lampe-a-fente",
    image: "/catalog/rsl2600.jpeg",
    inStock: true,
    taglineFr: "Lampe à fente avec option numérique.",
    taglineEn: "Slit lamp with digital option.",
    descriptionFr:
      "Lampe à fente offrant une optique stéréoscopique nette, disponible en version numérique pour la capture d'images.",
    descriptionEn:
      "Slit lamp delivering crisp stereoscopic optics, available in a digital version for image capture.",
    specs: [
      { label: "Grossissement", value: "Multi-paliers" },
      { label: "Numérique", value: "En option" },
    ],
  },
  {
    slug: "rsl-4500",
    name: "RSL 4500 / 4500 Digital",
    brand: "rodenstock",
    section: "consultation",
    subcategory: "lampe-a-fente",
    image: "/catalog/rsl-4500-digital.jpeg",
    inStock: true,
    taglineFr: "Lampe à fente numérique avancée.",
    taglineEn: "Advanced digital slit lamp.",
    descriptionFr:
      "Lampe à fente haut de gamme avec éclairage LED régulier et imagerie numérique haute définition intégrée.",
    descriptionEn:
      "High-end slit lamp with uniform LED illumination and integrated high-definition digital imaging.",
    specs: [
      { label: "Éclairage", value: "LED" },
      { label: "Imagerie", value: "HD numérique" },
    ],
  },
  {
    slug: "sl-1s",
    name: "SL-1S",
    brand: "main-meditech",
    section: "consultation",
    subcategory: "lampe-a-fente",
    image: "/catalog/sl-1s.jpeg",
    inStock: true,
    taglineFr: "Lampe à fente de table fiable.",
    taglineEn: "Reliable tabletop slit lamp.",
    descriptionFr:
      "Lampe à fente de table offrant une optique stéréoscopique nette pour l'examen du segment antérieur.",
    descriptionEn:
      "Tabletop slit lamp delivering crisp stereoscopic optics for anterior segment examination.",
    specs: [
      { label: "Grossissement", value: "10x / 16x / 25x" },
      { label: "Éclairage", value: "LED" },
    ],
  },
  {
    slug: "dslc200",
    name: "DSLC200",
    brand: "sbm-sistemi",
    section: "consultation",
    subcategory: "lampe-a-fente",
    image: "/catalog/dslc200.jpeg",
    inStock: true,
    taglineFr: "Lampe à fente numérique connectée.",
    taglineEn: "Connected digital slit lamp.",
    descriptionFr:
      "Lampe à fente numérique permettant la capture et le partage d'images du segment antérieur en haute résolution.",
    descriptionEn:
      "Digital slit lamp enabling high-resolution capture and sharing of anterior segment images.",
    specs: [
      { label: "Capture", value: "Photo / Vidéo" },
      { label: "Connectivité", value: "Numérique" },
    ],
  },
  {
    slug: "alino",
    name: "ALINO®",
    brand: "rodenstock",
    section: "consultation",
    subcategory: "auto-refractometre",
    image: "/catalog/alino.jpeg",
    inStock: true,
    taglineFr: "Auto-réfractomètre de précision.",
    taglineEn: "Precision auto refractor.",
    descriptionFr:
      "Auto-réfractomètre de précision offrant des mesures objectives rapides et reproductibles.",
    descriptionEn:
      "Precision auto refractor offering fast, repeatable objective measurements.",
    specs: [
      { label: "Fonctions", value: "REF / KER" },
      { label: "Temps de mesure", value: "< 1 s" },
    ],
  },
  {
    slug: "rmk-700",
    name: "RMK-700",
    brand: "supore",
    section: "consultation",
    subcategory: "auto-refractometre",
    image: "/catalog/rmk-700.jpeg",
    inStock: true,
    taglineFr: "Auto-réfracto-kératomètre.",
    taglineEn: "Auto ref-keratometer.",
    descriptionFr:
      "Appareil combiné réfraction et kératométrie délivrant des mesures fiables en quelques secondes.",
    descriptionEn:
      "Combined refraction and keratometry unit delivering reliable readings within seconds.",
    specs: [
      { label: "Fonctions", value: "REF / KER" },
      { label: "Diamètre min.", value: "2.0 mm" },
    ],
  },
  {
    slug: "easyref-pro",
    name: "easyRef PRO",
    brand: "moptim",
    section: "consultation",
    subcategory: "auto-refractometre",
    image: "/catalog/easyref-pro.jpeg",
    inStock: true,
    taglineFr: "Auto-réfractomètre tout-en-un.",
    taglineEn: "All-in-one auto refractor.",
    descriptionFr:
      "Station tout-en-un réunissant réfraction, kératométrie et large écran tactile pour un usage intuitif.",
    descriptionEn:
      "All-in-one station combining refraction, keratometry and a large touchscreen for intuitive use.",
    specs: [
      { label: "Écran", value: 'Tactile 8"' },
      { label: "Fonctions", value: "REF / KER" },
    ],
  },
  {
    slug: "sw-800",
    name: "SW-800",
    brand: "suoer",
    section: "consultation",
    subcategory: "auto-refractometre",
    image: "/catalog/sw-800.jpeg",
    inStock: true,
    taglineFr: "Auto-réfractomètre rapide.",
    taglineEn: "Fast auto refractor.",
    descriptionFr:
      "Auto-réfractomètre à acquisition rapide avec suivi automatique de la pupille.",
    descriptionEn:
      "Fast-acquisition auto refractor with automatic pupil tracking.",
    specs: [
      { label: "Suivi pupille", value: "Automatique" },
      { label: "Diamètre min.", value: "2.0 mm" },
    ],
  },
  {
    slug: "phoromat-2000",
    name: "Phoromat 2000",
    brand: "rodenstock",
    section: "consultation",
    subcategory: "refracteur-automatique",
    image: "/catalog/phoromat-200.jpeg",
    inStock: false,
    taglineFr: "Réfracteur automatique de précision.",
    taglineEn: "Precision automatic phoropter.",
    descriptionFr:
      "Phoroptère numérique motorisé pour une réfraction rapide et reproductible en cabinet.",
    descriptionEn:
      "Motorized digital phoropter for fast, repeatable in-office refraction.",
    specs: [
      { label: "Type", value: "Phoroptère numérique" },
      { label: "Commande", value: "Tablette" },
    ],
  },
  {
    slug: "vt-800",
    name: "VT-800",
    brand: "supore",
    section: "consultation",
    subcategory: "refracteur-automatique",
    image: "/catalog/vt-800.jpeg",
    inStock: true,
    taglineFr: "Phoroptère numérique automatisé.",
    taglineEn: "Automated digital phoropter.",
    descriptionFr:
      "Phoroptère numérique pilotable permettant un examen de réfraction fluide et entièrement enregistrable.",
    descriptionEn:
      "Controllable digital phoropter enabling a smooth, fully recordable refraction exam.",
    specs: [
      { label: "Type", value: "Numérique" },
      { label: "Données", value: "Exportables" },
    ],
  },
  {
    slug: "topascope",
    name: "TopaScope®",
    brand: "rodenstock",
    section: "consultation",
    subcategory: "tonometre-air-rebound",
    image: "/catalog/topascope.jpeg",
    inStock: false,
    taglineFr: "Tonomètre à air sans contact.",
    taglineEn: "Non-contact air tonometer.",
    descriptionFr:
      "Tonomètre à souffle d'air mesurant la pression intraoculaire sans contact, avec alignement assisté.",
    descriptionEn:
      "Air-puff tonometer measuring intraocular pressure without contact, with assisted alignment.",
    specs: [
      { label: "Plage de mesure", value: "1–60 mmHg" },
      { label: "Alignement", value: "Assisté" },
    ],
  },
  {
    slug: "nt-700",
    name: "NT-700",
    brand: "supore",
    section: "consultation",
    subcategory: "tonometre-air-rebound",
    image: "/catalog/nt-700.jpeg",
    inStock: true,
    taglineFr: "Tonomètre à air automatique.",
    taglineEn: "Automatic air tonometer.",
    descriptionFr:
      "Tonomètre à air sans contact avec alignement automatique pour une mesure rapide de la PIO.",
    descriptionEn:
      "Non-contact air tonometer with automatic alignment for quick IOP measurement.",
    specs: [
      { label: "Plage de mesure", value: "1–60 mmHg" },
      { label: "Alignement", value: "Automatique" },
    ],
  },
  {
    slug: "al-6600",
    name: "AL 6600",
    brand: "rodenstock",
    section: "consultation",
    subcategory: "frontofocometre",
    image: "/catalog/al-6600.jpeg",
    inStock: true,
    taglineFr: "Frontofocomètre automatique.",
    taglineEn: "Automatic lensmeter.",
    descriptionFr:
      "Frontofocomètre automatique mesurant puissance, cylindre, axe et traitements UV des verres.",
    descriptionEn:
      "Automatic lensmeter measuring power, cylinder, axis and UV coatings of lenses.",
    specs: [
      { label: "Mesure UV", value: "Oui" },
      { label: "Détection PD", value: "Automatique" },
    ],
  },
  {
    slug: "vt-700a",
    name: "VT-700A",
    brand: "supore",
    section: "consultation",
    subcategory: "frontofocometre",
    image: "/catalog/vt-700a.jpeg",
    inStock: true,
    taglineFr: "Frontofocomètre numérique à écran tactile.",
    taglineEn: "Digital touchscreen lensmeter.",
    descriptionFr:
      "Frontofocomètre numérique à écran tactile mesurant puissance, axe, prisme et transmission UV des verres.",
    descriptionEn:
      "Digital touchscreen lensmeter measuring lens power, axis, prism and UV transmission.",
    specs: [
      { label: "Écran", value: "Tactile" },
      { label: "Mesure UV", value: "Oui" },
    ],
  },
  {
    slug: "cv-600",
    name: "CV 600",
    brand: "rodenstock",
    section: "consultation",
    subcategory: "projecteur-ecran-test",
    image: "/catalog/cv-600.jpeg",
    inStock: true,
    taglineFr: "Écran de test LCD multifonction.",
    taglineEn: "Multifunction LCD test chart.",
    descriptionFr:
      "Écran de test haute définition proposant une bibliothèque complète d'optotypes et de tests binoculaires.",
    descriptionEn:
      "High-definition test chart offering a complete library of optotypes and binocular tests.",
    specs: [
      { label: "Affichage", value: "LCD HD" },
      { label: "Distance", value: "2–6 m" },
    ],
  },
  {
    slug: "rodachart-422",
    name: "Rodachart 422",
    brand: "rodenstock",
    section: "consultation",
    subcategory: "projecteur-ecran-test",
    image: "/catalog/rodachart-422.jpeg",
    inStock: true,
    taglineFr: "Projecteur de tests automatique.",
    taglineEn: "Automatic chart projector.",
    descriptionFr:
      "Projecteur de tests avec télécommande et large gamme d'optotypes pour la réfraction.",
    descriptionEn:
      "Chart projector with remote control and a wide range of refraction optotypes.",
    specs: [
      { label: "Optotypes", value: "30+" },
      { label: "Télécommande", value: "Incluse" },
    ],
  },
  {
    slug: "acp-800",
    name: "ACP-800",
    brand: "supore",
    section: "consultation",
    subcategory: "projecteur-ecran-test",
    image: "/catalog/acp-800.jpeg",
    inStock: true,
    taglineFr: "Projecteur de tests compact.",
    taglineEn: "Compact chart projector.",
    descriptionFr:
      "Projecteur de tests compact à haute luminosité offrant une netteté optimale même en pièce éclairée.",
    descriptionEn:
      "Compact high-brightness chart projector offering optimal sharpness even in lit rooms.",
    specs: [
      { label: "Luminosité", value: "Élevée" },
      { label: "Programmes", value: "Personnalisables" },
    ],
  },
  {
    slug: "acp-1000",
    name: "ACP-1000",
    brand: "supore",
    section: "consultation",
    subcategory: "chaine-refraction-courte-distance",
    image: "/catalog/acp-1000.jpeg",
    inStock: false,
    taglineFr: "Chaîne de réfraction courte distance.",
    taglineEn: "Short-distance refraction chain.",
    descriptionFr:
      "Système de réfraction courte distance idéal pour les espaces réduits, sans compromis sur la précision.",
    descriptionEn:
      "Short-distance refraction system ideal for compact rooms without compromising accuracy.",
    specs: [
      { label: "Distance", value: "Courte" },
      { label: "Installation", value: "Gain de place" },
    ],
  },

  // ───────────────────────── SECTION B — EXPLORATION (12) ─────────────────────────
  {
    slug: "fundusscope",
    name: "FundusScope",
    brand: "rodenstock",
    section: "exploration",
    subcategory: "retinographes",
    image: "/catalog/fundusscope.jpeg",
    inStock: true,
    taglineFr: "Rétinographe non mydriatique.",
    taglineEn: "Non-mydriatic fundus camera.",
    descriptionFr:
      "Rétinographe non mydriatique capturant des images du fond d'œil nettes sans dilatation pupillaire.",
    descriptionEn:
      "Non-mydriatic fundus camera capturing sharp retinal images without pupil dilation.",
    specs: [
      { label: "Champ", value: "45°" },
      { label: "Mydriase", value: "Non requise" },
    ],
  },
  {
    slug: "reticam-3100",
    name: "RetiCam 3100",
    brand: "syseye",
    section: "exploration",
    subcategory: "retinographes",
    image: "/catalog/reticam-3100.jpeg",
    inStock: true,
    taglineFr: "Rétinographe numérique grand champ.",
    taglineEn: "Wide-field digital fundus camera.",
    descriptionFr:
      "Rétinographe numérique offrant un large champ d'imagerie pour le dépistage rétinien à grande échelle.",
    descriptionEn:
      "Digital fundus camera offering a wide imaging field for large-scale retinal screening.",
    specs: [
      { label: "Champ", value: "Grand angle" },
      { label: "Capteur", value: "Haute résolution" },
    ],
  },
  {
    slug: "cfc-x",
    name: "CFC-X",
    brand: "mocular-medical",
    section: "exploration",
    subcategory: "retinographes",
    image: "/catalog/cfc-x.jpeg",
    inStock: true,
    taglineFr: "Rétinographe automatisé.",
    taglineEn: "Automated fundus camera.",
    descriptionFr:
      "Rétinographe automatisé avec alignement assisté pour des acquisitions rétiniennes reproductibles.",
    descriptionEn:
      "Automated fundus camera with assisted alignment for repeatable retinal acquisitions.",
    specs: [
      { label: "Alignement", value: "Assisté" },
      { label: "Acquisition", value: "Automatique" },
    ],
  },
  {
    slug: "rb-800",
    name: "RB-800",
    brand: "visionstar",
    section: "exploration",
    subcategory: "tonometre-rebound",
    image: "/catalog/rb-800.jpeg",
    inStock: true,
    taglineFr: "Tonomètre à rebond de table.",
    taglineEn: "Tabletop rebound tonometer.",
    descriptionFr:
      "Tonomètre à rebond offrant une mesure de la PIO confortable et sans anesthésie.",
    descriptionEn:
      "Rebound tonometer offering comfortable, anesthesia-free IOP measurement.",
    specs: [
      { label: "Technologie", value: "Rebond" },
      { label: "Anesthésie", value: "Non requise" },
    ],
  },
  {
    slug: "rem-4000",
    name: "REM 4000",
    brand: "rodenstock",
    section: "exploration",
    subcategory: "microscope-speculaire",
    image: "/catalog/rem-4000.jpeg",
    inStock: false,
    taglineFr: "Microscope spéculaire endothélial.",
    taglineEn: "Endothelial specular microscope.",
    descriptionFr:
      "Microscope spéculaire automatisé pour l'analyse de la densité et de la morphologie des cellules endothéliales.",
    descriptionEn:
      "Automated specular microscope for endothelial cell density and morphology analysis.",
    specs: [
      { label: "Analyse", value: "Cellules endothéliales" },
      { label: "Capture", value: "Automatique" },
    ],
  },
  {
    slug: "mocean-4000",
    name: "Mocean 4000",
    brand: "moptim",
    section: "exploration",
    subcategory: "oct",
    image: "/catalog/mocean-4000.jpeg",
    inStock: true,
    taglineFr: "OCT haute résolution.",
    taglineEn: "High-resolution OCT.",
    descriptionFr:
      "Plateforme OCT offrant une imagerie détaillée de la rétine et du nerf optique pour un diagnostic précoce.",
    descriptionEn:
      "OCT platform offering detailed retina and optic nerve imaging for early diagnosis.",
    specs: [
      { label: "Résolution axiale", value: "5 µm" },
      { label: "Mode", value: "OCT / Angiographie" },
    ],
  },
  {
    slug: "peristat-2",
    name: "Peristat 2",
    brand: "rodenstock",
    section: "exploration",
    subcategory: "champ-visuel",
    image: "/catalog/peristat-2.jpeg",
    inStock: true,
    taglineFr: "Périmètre automatique de champ visuel.",
    taglineEn: "Automated visual field perimeter.",
    descriptionFr:
      "Périmètre automatisé pour le dépistage et le suivi du glaucome avec stratégies de test rapides.",
    descriptionEn:
      "Automated perimeter for glaucoma screening and follow-up with fast test strategies.",
    specs: [
      { label: "Coupole", value: "Standard" },
      { label: "Stratégies", value: "Seuil / Dépistage" },
    ],
  },
  {
    slug: "svf-7000",
    name: "SVF-7000",
    brand: "main-meditech",
    section: "exploration",
    subcategory: "champ-visuel",
    image: "/catalog/svf-7000.jpeg",
    inStock: true,
    taglineFr: "Analyseur de champ visuel.",
    taglineEn: "Visual field analyzer.",
    descriptionFr:
      "Analyseur de champ visuel offrant des protocoles cliniques éprouvés et des rapports automatisés.",
    descriptionEn:
      "Visual field analyzer offering proven clinical protocols and automated reporting.",
    specs: [
      { label: "Protocoles", value: "Cliniques" },
      { label: "Rapports", value: "Automatiques" },
    ],
  },
  {
    slug: "colombo-iol-ii",
    name: "Colombo IOL II",
    brand: "moptim",
    section: "exploration",
    subcategory: "biometre-optique",
    image: "/catalog/colombo-iol-ii.jpeg",
    inStock: true,
    featured: true,
    taglineFr: "Biomètre optique pour calcul d'implant.",
    taglineEn: "Optical biometer for IOL calculation.",
    descriptionFr:
      "Biomètre optique sans contact assurant des mesures axiales fiables et un calcul d'implant intraoculaire précis.",
    descriptionEn:
      "Non-contact optical biometer ensuring reliable axial measurements and accurate IOL power calculation.",
    specs: [
      { label: "Technologie", value: "Sans contact" },
      { label: "Formules IOL", value: "Multiples" },
    ],
  },
  {
    slug: "retiwave-1000",
    name: "RetiWave 1000",
    brand: "syseye",
    section: "exploration",
    subcategory: "echographie-ab",
    image: "/catalog/retiwave-1000.jpeg",
    inStock: true,
    featured: true,
    taglineFr: "Échographe ophtalmique A/B de haute précision.",
    taglineEn: "High-precision A/B ophthalmic ultrasound.",
    descriptionFr:
      "Le RetiWave intègre la précision clinique à une technologie avancée de balayage A et B. Conçu spécifiquement pour le diagnostic ophtalmologique de haute fidélité, il garantit une visualisation exceptionnelle des structures intraoculaires.",
    descriptionEn:
      "The RetiWave brings clinical precision to advanced A/B-scan technology. Purpose-built for high-fidelity ophthalmic diagnostics, it delivers exceptional visualization of intraocular structures.",
    specs: [
      { label: "Scan A — Précision", value: "± 0.05 mm" },
      { label: "Scan B — Image", value: "10 MHz / 20 MHz" },
    ],
  },
  {
    slug: "sw-21-delta",
    name: "SW-21 Delta",
    brand: "suoer",
    section: "exploration",
    subcategory: "echographie-ab",
    image: "/catalog/sw-21-delta.jpeg",
    inStock: true,
    taglineFr: "Échographe ophtalmique A/B.",
    taglineEn: "A/B ophthalmic ultrasound.",
    descriptionFr:
      "Échographe ophtalmique A/B offrant une imagerie fiable des structures intraoculaires pour le diagnostic.",
    descriptionEn:
      "A/B ophthalmic ultrasound offering reliable imaging of intraocular structures for diagnosis.",
    specs: [
      { label: "Modes", value: "A-scan / B-scan" },
      { label: "Sonde", value: "10 MHz" },
    ],
  },
  {
    slug: "os1000",
    name: "OS1000",
    brand: "sbm-sistemi",
    section: "exploration",
    subcategory: "topographe-corneen",
    image: "/catalog/os1000.jpeg",
    inStock: true,
    featured: true,
    taglineFr: "Topographe cornéen multifonction.",
    taglineEn: "Multifunction corneal topographer.",
    descriptionFr:
      "Topographe cornéen combinant cartographie de la cornée et analyse du film lacrymal pour une évaluation complète.",
    descriptionEn:
      "Corneal topographer combining corneal mapping and tear film analysis for a complete assessment.",
    specs: [
      { label: "Analyse", value: "Topographie + Film lacrymal" },
      { label: "Disques", value: "Placido" },
    ],
  },

  // ───────────────────────── SECTION C — SANTÉ OCULAIRE (3) ─────────────────────────
  {
    slug: "idra",
    name: "IDRA",
    brand: "sbm-sistemi",
    section: "sante-oculaire",
    subcategory: "plateforme-secheresse-oculaire",
    image: "/catalog/idra.jpeg",
    inStock: true,
    taglineFr: "Plateforme de diagnostic de la sécheresse oculaire.",
    taglineEn: "Dry eye diagnostic platform.",
    descriptionFr:
      "Plateforme complète de diagnostic de la sécheresse oculaire : analyse du film lacrymal, meibographie et interférométrie.",
    descriptionEn:
      "Comprehensive dry eye diagnostic platform: tear film analysis, meibography and interferometry.",
    specs: [
      { label: "Analyses", value: "Film lacrymal / Meibographie" },
      { label: "Rapport", value: "Automatisé" },
    ],
  },
  {
    slug: "activa",
    name: "ACTIVA",
    brand: "sbm-sistemi",
    section: "sante-oculaire",
    subcategory: "soulagement-secheresse-oculaire",
    image: "/catalog/activa.jpeg",
    inStock: true,
    taglineFr: "Traitement de la sécheresse oculaire.",
    taglineEn: "Dry eye treatment device.",
    descriptionFr:
      "Dispositif de traitement de la sécheresse oculaire par thermothérapie et lumière pulsée pour soulager les patients.",
    descriptionEn:
      "Dry eye treatment device using thermal therapy and pulsed light to relieve patients.",
    specs: [
      { label: "Technologie", value: "IPL / Thermothérapie" },
      { label: "Séance", value: "Courte" },
    ],
  },
  {
    slug: "pi-mabel",
    name: "PI Mabel",
    brand: "mabel",
    section: "sante-oculaire",
    subcategory: "table-operation-ophtalmique",
    image: "/catalog/pi-mabel.jpeg",
    inStock: true,
    taglineFr: "Table d'opération ophtalmique motorisée.",
    taglineEn: "Motorized ophthalmic surgical table.",
    descriptionFr:
      "Table d'opération ophtalmique motorisée offrant un positionnement précis et un confort optimal en chirurgie.",
    descriptionEn:
      "Motorized ophthalmic surgical table offering precise positioning and optimal comfort in surgery.",
    specs: [
      { label: "Commande", value: "Motorisée / Pédale" },
      { label: "Réglages", value: "Multi-axes" },
    ],
  },
];

import type { Lang } from "@/i18n/LanguageProvider";

export const productTagline = (p: Product, lang: Lang) => (lang === "en" ? p.taglineEn : p.taglineFr);
export const productDescription = (p: Product, lang: Lang) =>
  lang === "en" ? p.descriptionEn : p.descriptionFr;

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const featuredProducts = products.filter((p) => p.featured);

export const productsBySection = (section: string) =>
  products.filter((p) => p.section === section);
