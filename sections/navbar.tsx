"use client";

const logo = "/assets/logo.png";
import { useState } from "react";
import { useT } from "@/app/i18n/I18nProvider";
import { navHref, LOCALE_CODES } from "@/app/i18n/config";
import LanguageMenu from "@/app/i18n/LanguageMenu";
import ThemeToggle from "@/app/theme/ThemeToggle";
import { ChromeCTA } from "@/app/_components/cta";

interface NavbarProps {
  currentPage?: string; // Optional prop to indicate current page
  minimal?: boolean; // Logo-only header (e.g. uninstall page) — no nav links or CTA
}

const Navbar = ({ currentPage = "/", minimal = false }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, locale } = useT();

  // Minimal mode: just the logo, centered. Used on focused pages (uninstall).
  if (minimal) {
    return (
      <header
        className="sticky top-0 z-50 w-full backdrop-blur-[16px] border-b"
        style={{ background: "var(--nav)", borderColor: "var(--border)" }}
      >
        <div className="flex items-center justify-center max-w-[1240px] mx-auto px-[34px] py-[15px]">
          <a href={navHref("/", locale)}>
            <img src={logo} alt="Funlingo" className="h-12 sm:h-14 w-auto block" />
          </a>
        </div>
      </header>
    );
  }

  // Normalize current page by stripping any locale prefix, so the active state
  // matches whether the caller passes "/blog" or a localized "/fr/blog".
  const segs = currentPage.split("/").filter(Boolean);
  const current =
    segs.length && LOCALE_CODES.includes(segs[0])
      ? `/${segs.slice(1).join("/")}`
      : currentPage;

  const navItems = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.roadmap"), href: "/roadmap" },
    { label: t("nav.blog"), href: "/blog" },
    { label: t("nav.about"), href: "/about" },
  ].map((item) => ({
    label: item.label,
    href: navHref(item.href, locale),
    active:
      current === item.href ||
      (item.href === "/blog" && current.startsWith("/blog")),
  }));

  return (
    <header
      className="sticky top-0 z-[100] w-full backdrop-blur-[16px] border-b"
      style={{ background: "var(--nav)", borderColor: "var(--border)" }}
    >
      <div className="flex items-center justify-between max-w-[1240px] mx-auto px-5 sm:px-[34px] py-[15px]">
        {/* Logo */}
        <a href={navHref("/", locale)} className="block shrink-0">
          <img src={logo} alt="Funlingo" className="h-12 sm:h-14 w-auto block" />
        </a>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item, i) => (
            <a
              key={i}
              href={item.href}
              className="text-[15px] no-underline transition-colors"
              style={{
                fontWeight: item.active ? 700 : 600,
                color: item.active ? "var(--text)" : "var(--text-dim)",
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-[10px]">
          <div className="hidden sm:block">
            <LanguageMenu />
          </div>
          <ThemeToggle />
          <div className="hidden sm:block">
            <ChromeCTA label={t("cta.short")} variant="navPill" glyphSize={17} />
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden w-[42px] h-[42px] rounded-full border flex flex-col items-center justify-center gap-[5px] cursor-pointer"
            style={{ borderColor: "var(--border)", background: "var(--chip)" }}
            onClick={() => setIsMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span
              className="w-[18px] h-[2px] rounded transition-all"
              style={{
                background: "var(--text)",
                transform: isMenuOpen ? "rotate(45deg) translateY(5px)" : "none",
              }}
            />
            <span
              className="w-[18px] h-[2px] rounded transition-all"
              style={{ background: "var(--text)", opacity: isMenuOpen ? 0 : 1 }}
            />
            <span
              className="w-[18px] h-[2px] rounded transition-all"
              style={{
                background: "var(--text)",
                transform: isMenuOpen
                  ? "rotate(-45deg) translateY(-5px)"
                  : "none",
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300 border-t"
        style={{
          maxHeight: isMenuOpen ? 420 : 0,
          opacity: isMenuOpen ? 1 : 0,
          borderColor: isMenuOpen ? "var(--border)" : "transparent",
          background: "var(--bg2)",
        }}
      >
        <nav className="flex flex-col items-start gap-1 px-5 py-4">
          {navItems.map((item, i) => (
            <a
              key={i}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="w-full py-3 text-[17px] no-underline"
              style={{
                fontWeight: item.active ? 700 : 600,
                color: item.active ? "var(--text)" : "var(--text-dim)",
              }}
            >
              {item.label}
            </a>
          ))}
          <div className="flex items-center gap-3 pt-3">
            <LanguageMenu />
            <ChromeCTA label={t("cta.short")} variant="navPill" glyphSize={17} />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
