import type { Metadata } from "next";
import { BlogView } from "@/components/BlogView";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Actualités, innovations et conseils cliniques en ophtalmologie par OphtaHealth. Analyses du secteur pour les professionnels de la vision.",
};

export default function BlogPage() {
  return <BlogView />;
}
