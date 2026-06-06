import type { Lang } from "./LanguageProvider";

/** Shared UI strings (navigation, footer, buttons, forms) used across components. */
export const ui = {
  fr: {
    // Nav
    home: "Accueil",
    categories: "Catégories",
    services: "Services",
    blog: "Blog",
    about: "À Propos",
    contact: "Contact",
    admin: "Admin",
    search: "Rechercher...",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    // Sections (nav dropdown / cards)
    consultation: "Consultation",
    exploration: "Exploration",
    santeOculaire: "Santé Oculaire",
    // Common buttons / labels
    seeProducts: "Voir les produits",
    seeProduct: "Voir le produit",
    seeAllCatalog: "Voir tout le catalogue",
    learnMore: "En savoir plus",
    knowMore: "Savoir plus",
    contactUs: "Nous contacter",
    inStock: "En stock",
    outOfStock: "Hors stock",
    brand: "Marque",
    featuredProduct: "Produit phare",
    // Footer
    privacyPolicy: "Politique de confidentialité",
    faq: "FAQ",
    support: "Support",
    rightsReserved: "Tous droits réservés.",
    developedBy: "Développé par",
    // Brochure modal
    downloadBrochure: "Télécharger la brochure",
    downloadStarted: "Téléchargement lancé",
    brochureIntro: "Renseignez vos coordonnées pour télécharger la brochure technique de",
    fullName: "Nom complet",
    email: "E-mail",
    phone: "Téléphone",
    organization: "Établissement",
    brochureSuccess: "Merci ! Le téléchargement de la brochure a démarré automatiquement.",
    clickHere: "cliquez ici",
    ifNothing: "Si rien ne se passe,",
    close: "Fermer",
    orderWhatsApp: "Commander via WhatsApp",
    // Cookie banner
    cookieText:
      "Nous utilisons des cookies strictement nécessaires au fonctionnement du site ainsi que des cookies analytiques pour améliorer votre expérience.",
    essentialOnly: "Nécessaires uniquement",
    acceptAll: "Tout accepter",
    // Misc
    partnerBrands: "Nos Marques Partenaires",
    loading: "Chargement…",
  },
  en: {
    home: "Home",
    categories: "Categories",
    services: "Services",
    blog: "Blog",
    about: "About",
    contact: "Contact",
    admin: "Admin",
    search: "Search...",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    consultation: "Consultation",
    exploration: "Exploration",
    santeOculaire: "Eye Health",
    seeProducts: "View products",
    seeProduct: "View product",
    seeAllCatalog: "View the full catalog",
    learnMore: "Learn more",
    knowMore: "Learn more",
    contactUs: "Contact us",
    inStock: "In stock",
    outOfStock: "Out of stock",
    brand: "Brand",
    featuredProduct: "Featured product",
    privacyPolicy: "Privacy Policy",
    faq: "FAQ",
    support: "Support",
    rightsReserved: "All rights reserved.",
    developedBy: "Developed by",
    downloadBrochure: "Download brochure",
    downloadStarted: "Download started",
    brochureIntro: "Enter your details to download the technical brochure for",
    fullName: "Full name",
    email: "Email",
    phone: "Phone",
    organization: "Organization",
    brochureSuccess: "Thank you! Your brochure download has started automatically.",
    clickHere: "click here",
    ifNothing: "If nothing happens,",
    close: "Close",
    orderWhatsApp: "Order via WhatsApp",
    cookieText:
      "We use strictly necessary cookies for the site to function, plus analytics cookies to improve your experience.",
    essentialOnly: "Essential only",
    acceptAll: "Accept all",
    partnerBrands: "Our Partner Brands",
    loading: "Loading…",
  },
} as const;

export type UIKey = keyof typeof ui.fr;

export function t(lang: Lang, key: UIKey): string {
  return ui[lang][key];
}
