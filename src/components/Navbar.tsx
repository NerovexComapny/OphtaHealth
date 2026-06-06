"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { sections, sectionName } from "@/data/categories";
import { useLang } from "@/i18n/LanguageProvider";
import { t } from "@/i18n/ui";
import { ChevronDown, ChevronRight, SearchIcon, MenuIcon, CloseIcon } from "./Icons";

export function Navbar() {
  const pathname = usePathname();
  const { lang } = useLang();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCatOpen, setMobileCatOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const navLinks = [
    { href: "/services", label: t(lang, "services") },
    { href: "/blog", label: t(lang, "blog") },
    { href: "/a-propos", label: t(lang, "about") },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-outline-variant bg-clinical-white">
      <div className="container-max flex h-20 items-center justify-between">
        <Logo />

        {/* Desktop nav */}
        <div className="hidden h-full items-center gap-8 md:flex">
          <Link
            href="/"
            className={`flex h-full items-center transition-colors ${
              isActive("/") ? "border-b-2 border-primary pb-1 text-primary" : "text-on-surface-variant hover:text-primary"
            }`}
          >
            {t(lang, "home")}
          </Link>

          {/* Categories dropdown */}
          <div className="group relative flex h-full items-center">
            <button
              className={`flex h-full items-center gap-1 transition-colors ${
                isActive("/catalogue") ? "text-primary" : "text-on-surface-variant hover:text-primary"
              }`}
            >
              {t(lang, "categories")}
              <ChevronDown className="h-4 w-4" />
            </button>
            <div className="invisible absolute left-0 top-full z-50 min-w-[220px] rounded border border-primary-container bg-white opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
              {sections.map((section, i) => (
                <div key={section.slug} className="group/sub relative">
                  <Link
                    href={`/catalogue?section=${section.slug}`}
                    className={`flex w-full items-center justify-between px-4 py-3 text-left text-on-surface transition-colors hover:bg-surface hover:text-primary ${
                      i > 0 ? "border-t border-surface-dim" : ""
                    }`}
                  >
                    {sectionName(section, lang).toUpperCase()}
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                  <div className="invisible absolute left-full top-0 z-50 min-w-[280px] rounded border border-primary-container bg-white opacity-0 shadow-lg transition-all group-hover/sub:visible group-hover/sub:opacity-100">
                    {section.subcategories.map((sub) => (
                      <Link
                        key={sub.slug}
                        href={`/catalogue?section=${section.slug}&sub=${sub.slug}`}
                        className="block px-4 py-2.5 text-on-surface transition-colors hover:bg-surface hover:text-primary"
                      >
                        {lang === "en" ? sub.nameEn ?? sub.name : sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`flex h-full items-center transition-colors ${
                isActive(l.href) ? "border-b-2 border-primary pb-1 text-primary" : "text-on-surface-variant hover:text-primary"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right cluster */}
        <div className="flex items-center gap-4">
          <div className="hidden items-center rounded-full border border-outline-variant bg-surface-gray px-4 py-2 lg:flex">
            <SearchIcon className="mr-2 h-5 w-5 text-outline" />
            <input
              type="text"
              placeholder={t(lang, "search")}
              aria-label={t(lang, "search")}
              className="w-32 border-none bg-transparent text-body-md outline-none transition-all focus:w-48"
            />
          </div>
          <Link href="/support" className="hidden btn-outline sm:inline-flex">
            {t(lang, "contact")}
          </Link>
          <Link href="/admin" className="hidden btn-solid sm:inline-flex">
            {t(lang, "admin")}
          </Link>
          <button
            className="text-on-surface md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? t(lang, "closeMenu") : t(lang, "openMenu")}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <CloseIcon className="h-7 w-7" /> : <MenuIcon className="h-7 w-7" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-outline-variant bg-clinical-white md:hidden">
          <div className="container-max flex flex-col py-4">
            <Link href="/" onClick={() => setMobileOpen(false)} className="py-3 text-on-surface-variant hover:text-primary">
              {t(lang, "home")}
            </Link>
            <button
              className="flex items-center justify-between py-3 text-on-surface-variant hover:text-primary"
              onClick={() => setMobileCatOpen((o) => !o)}
            >
              {t(lang, "categories")}
              <ChevronDown className={`h-4 w-4 transition-transform ${mobileCatOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileCatOpen && (
              <div className="flex flex-col pl-4">
                {sections.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/catalogue?section=${s.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="py-2 text-sm text-on-surface-variant hover:text-primary"
                  >
                    {sectionName(s, lang)}
                  </Link>
                ))}
              </div>
            )}
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 text-on-surface-variant hover:text-primary"
              >
                {l.label}
              </Link>
            ))}
            <Link href="/support" onClick={() => setMobileOpen(false)} className="btn-outline mt-3 justify-center">
              {t(lang, "contact")}
            </Link>
            <Link href="/admin" onClick={() => setMobileOpen(false)} className="btn-solid mt-2 justify-center">
              {t(lang, "admin")}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
