"use client";

import { useSyncExternalStore } from "react";
import { brands as seedBrands, type Brand } from "@/data/brands";
import { sections as seedSections, type Section, type SubCategory, type SectionSlug } from "@/data/categories";
import { products as seedProducts, type Product } from "@/data/products";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  productSlug: string;
  productName: string;
  date: string; // ISO
}

export interface AdminData {
  brands: Brand[];
  sections: Section[];
  products: Product[];
  leads: Lead[];
}

const KEY = "oh-admin-data";
const VERSION = 2;
const VERSION_KEY = "oh-admin-data-version";

function seed(): AdminData {
  return {
    brands: structuredClone(seedBrands),
    sections: structuredClone(seedSections),
    products: structuredClone(seedProducts),
    leads: [],
  };
}

// Stable server snapshot (no persistence on the server).
const serverData = seed();

let cache: AdminData | null = null;
const listeners = new Set<() => void>();

function persist() {
  if (typeof window === "undefined" || !cache) return;
  localStorage.setItem(KEY, JSON.stringify(cache));
  localStorage.setItem(VERSION_KEY, String(VERSION));
}

function load(): AdminData {
  if (cache) return cache;
  if (typeof window === "undefined") return serverData;
  const ver = Number(localStorage.getItem(VERSION_KEY));
  const raw = localStorage.getItem(KEY);
  if (raw && ver === VERSION) {
    try {
      cache = JSON.parse(raw) as AdminData;
      return cache;
    } catch {
      /* fall through to reseed */
    }
  }
  cache = seed();
  persist();
  return cache;
}

function commit(next: AdminData) {
  cache = next;
  persist();
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

/** Reactive read of the whole admin dataset. */
export function useAdminData(): AdminData {
  return useSyncExternalStore(subscribe, load, () => serverData);
}

export const id = () => Math.random().toString(36).slice(2, 10);

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/* ───────────────── Products ───────────────── */
export function saveProduct(p: Product, originalSlug?: string) {
  const data = load();
  const products = [...data.products];
  const idx = originalSlug ? products.findIndex((x) => x.slug === originalSlug) : -1;
  if (idx >= 0) products[idx] = p;
  else products.unshift(p);
  commit({ ...data, products });
}

export function deleteProduct(slug: string) {
  const data = load();
  commit({ ...data, products: data.products.filter((p) => p.slug !== slug) });
}

export function toggleStock(slug: string) {
  const data = load();
  commit({
    ...data,
    products: data.products.map((p) => (p.slug === slug ? { ...p, inStock: !p.inStock } : p)),
  });
}

export function setBrochure(slug: string, brochure: string) {
  const data = load();
  commit({
    ...data,
    products: data.products.map((p) => (p.slug === slug ? { ...p, brochure } : p)),
  });
}

/* ───────────────── Brands ───────────────── */
export function saveBrand(b: Brand, originalSlug?: string) {
  const data = load();
  const brands = [...data.brands];
  const idx = originalSlug ? brands.findIndex((x) => x.slug === originalSlug) : -1;
  if (idx >= 0) brands[idx] = b;
  else brands.push(b);
  commit({ ...data, brands });
}

export function deleteBrand(slug: string) {
  const data = load();
  commit({ ...data, brands: data.brands.filter((b) => b.slug !== slug) });
}

/* ───────────────── Categories (sections) ───────────────── */
export function saveCategory(section: Section, originalSlug?: string) {
  const data = load();
  const sections = [...data.sections];
  const idx = originalSlug ? sections.findIndex((s) => s.slug === originalSlug) : -1;
  if (idx >= 0) sections[idx] = section;
  else sections.push(section);
  commit({ ...data, sections });
}

export function deleteCategory(slug: string) {
  const data = load();
  commit({ ...data, sections: data.sections.filter((s) => s.slug !== slug) });
}

/* ───────────────── Types (subcategories) ───────────────── */
export function addType(sectionSlug: string, sub: SubCategory) {
  const data = load();
  commit({
    ...data,
    sections: data.sections.map((s) =>
      s.slug === sectionSlug ? { ...s, subcategories: [...s.subcategories, sub] } : s
    ),
  });
}

export function deleteType(sectionSlug: string, subSlug: string) {
  const data = load();
  commit({
    ...data,
    sections: data.sections.map((s) =>
      s.slug === sectionSlug
        ? { ...s, subcategories: s.subcategories.filter((x) => x.slug !== subSlug) }
        : s
    ),
  });
}

/* ───────────────── Leads ───────────────── */
export function addLead(lead: Omit<Lead, "id" | "date">) {
  const data = load();
  const full: Lead = { ...lead, id: id(), date: new Date().toISOString() };
  commit({ ...data, leads: [full, ...data.leads] });
  return full;
}

export function deleteLead(leadId: string) {
  const data = load();
  commit({ ...data, leads: data.leads.filter((l) => l.id !== leadId) });
}

export function resetStore() {
  commit(seed());
}

export type { Product, Brand, Section, SubCategory, SectionSlug };
