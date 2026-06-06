import { Suspense } from "react";
import type { Metadata } from "next";
import { CatalogueClient } from "@/components/CatalogueClient";

export const metadata: Metadata = {
  title: "Catalogue",
  description:
    "Parcourez le catalogue complet des équipements ophtalmiques OphtaHealth : consultation, exploration et santé oculaire. Filtrez par section, catégorie, marque et disponibilité.",
};

export default function CataloguePage() {
  return (
    <Suspense fallback={<div className="container-max py-12 text-on-surface-variant">…</div>}>
      <CatalogueClient />
    </Suspense>
  );
}
