/** Central site configuration — edit contact details and brand info here. */
export const site = {
  name: "OphtaHealth",
  tagline: "Clinical Excellence in Ophthalmology",
  taglineFr: "L'excellence clinique en ophtalmologie",
  // International format without "+" or spaces, used to build wa.me links.
  whatsappNumber: "21622255629",
  phonePrimary: "+216 22 255 629",
  phoneSecondary: "+216 99 255 688",
  email: "contact@ophtahealth.com",
  emailSupport: "info@ophtahealth.com",
  address: "Tunis, Tunisie",
  developer: "Amiri Hamza",
} as const;

/** Build a WhatsApp deep link with a pre-filled message. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Pre-filled order message for a product (FR). */
export function productOrderMessage(productName: string, brandName: string): string {
  return `Bonjour OphtaHealth, je souhaite commander le produit "${productName}" (marque ${brandName}). Merci de me recontacter.`;
}
