"use client";

import { useState } from "react";
import { BrochureModal } from "./BrochureModal";
import { DownloadIcon, WhatsAppIcon } from "./Icons";
import { whatsappLink, site } from "@/lib/site";
import { useLang } from "@/i18n/LanguageProvider";
import { t } from "@/i18n/ui";

export function ProductActions({
  productName,
  productSlug,
  brandName,
  brochure,
}: {
  productName: string;
  productSlug: string;
  brandName: string;
  brochure?: string;
}) {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);

  const message =
    lang === "en"
      ? `Hello ${site.name}, I would like to order the product "${productName}" (brand ${brandName}). Please get back to me.`
      : `Bonjour ${site.name}, je souhaite commander le produit "${productName}" (marque ${brandName}). Merci de me recontacter.`;
  const waHref = whatsappLink(message);

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button onClick={() => setOpen(true)} className="btn-outline flex-1">
          <DownloadIcon className="h-5 w-5" />
          {t(lang, "downloadBrochure")}
        </button>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded bg-whatsapp px-6 py-2.5 font-medium text-white transition-colors hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp focus-visible:ring-offset-2"
        >
          <WhatsAppIcon className="h-5 w-5" />
          {t(lang, "orderWhatsApp")}
        </a>
      </div>
      <BrochureModal
        productName={productName}
        productSlug={productSlug}
        brochure={brochure}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
