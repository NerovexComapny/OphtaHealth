"use client";

import { createContext, useContext } from "react";

export type Lang = "fr" | "en";

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
}

// Site is French-only. The language is locked to "fr"; the toggle has been removed.
const LanguageContext = createContext<Ctx>({ lang: "fr", setLang: () => {} });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  return <LanguageContext.Provider value={{ lang: "fr", setLang: () => {} }}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  return useContext(LanguageContext);
}

/** Pick a value from a {fr,en} pair. Always returns French (site is FR-only). */
export function pick<T>(_lang: Lang, fr: T, _en: T): T {
  return fr;
}
