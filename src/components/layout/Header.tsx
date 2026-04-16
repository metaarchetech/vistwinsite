"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useState, useEffect } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [onDark, setOnDark] = useState(false); // hero is white by default
  const [mobileOpen, setMobileOpen] = useState(false);

  // English is the default locale (served at "/"); other locales prefix.
  // Without this prefix, clicking "/0.2 能力" on /zh would navigate to /
  // (the English root) at #capabilities — losing the user's language.
  const localePrefix = locale === "en" ? "" : `/${locale}`;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      // Sample background luminance behind the header to flip color scheme
      const probe = document.elementFromPoint(window.innerWidth / 2, 28);
      const sec = probe?.closest("section");
      if (sec) {
        const bg = getComputedStyle(sec).backgroundColor;
        const m = bg.match(/\d+/g);
        if (m) {
          const lum = (parseInt(m[0]) + parseInt(m[1]) + parseInt(m[2])) / 3;
          setOnDark(lum < 80);
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // All hrefs prefixed with the current locale so clicking a homepage anchor
  // on /zh stays on /zh (instead of jumping back to the English root).
  const home = localePrefix || "/";
  const links = [
    { href: home,                         label: t("home") },
    { href: `${localePrefix}/#capabilities`, label: t("services") },
    { href: `${localePrefix}/#surface`,      label: t("surface") },
    { href: `${localePrefix}/#architecture`, label: t("architecture") },
    { href: `${localePrefix}/contact`,       label: t("contact") },
  ] as const;

  // `usePathname` from next-intl strips the locale, so "/zh/contact" returns
  // "/contact". Anchor links also strip the prefix here for the comparison.
  const isActive = (href: string) => {
    const stripped = href.replace(localePrefix, "") || "/";
    if (stripped === "/") return pathname === "/";
    return pathname.startsWith(stripped.replace("/#", "/"));
  };

  // Smart click handler: if the home link points back to where we already
  // are (regardless of locale), scroll smoothly instead of triggering a
  // full re-navigate. Anchor hops within the same page work natively
  // thanks to `scroll-behavior: smooth` in globals.css.
  const handleNavClick = (href: string) => (e: React.MouseEvent) => {
    // pathname is locale-stripped by next-intl ("/contact" for /zh/contact,
    // "/" for /zh). Strip locale + hash from href so the comparison is
    // locale-agnostic.
    const stripped =
      (href.replace(localePrefix, "") || "/").replace(/#.*$/, "") || "/";
    if (pathname === "/" && stripped === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (window.location.hash) {
        history.pushState(null, "", home);
      }
    }
  };

  // Floating-pill design: ALWAYS frosted, ALWAYS detached from edges, ALWAYS
  // rounded. The opacity is intentionally low so the surface reads as glass,
  // not as a panel — readability comes from the heavy backdrop-blur, not from
  // background fill. We still slightly intensify on scroll for the wall-of-
  // text section where lower-contrast UI starts to fight body copy.
  const pillBg = onDark
    ? scrolled
      ? "bg-zinc-900/55 border-zinc-700/50 shadow-lg shadow-black/15"
      : "bg-zinc-900/35 border-zinc-700/30 shadow-md shadow-black/10"
    : scrolled
    ? "bg-white/45 border-zinc-200/50 shadow-lg shadow-zinc-900/5"
    : "bg-white/25 border-zinc-200/40 shadow-md shadow-zinc-900/[0.03]";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 lg:px-6 pt-3 lg:pt-4 pointer-events-none">
      <nav
        className={`mx-auto pointer-events-auto flex max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8 h-14 rounded-2xl border backdrop-blur-sm backdrop-saturate-150 transition-all duration-300 ${pillBg}`}
      >
        {/* Wordmark — bracket brand. Clicking on the home page smooth-scrolls
            to top instead of forcing a full re-navigate. */}
        <Link
          href="/"
          onClick={handleNavClick("/")}
          className={`hud transition-colors ${onDark ? "text-zinc-100" : "text-zinc-900"}`}
        >
          {"{ "}<span>VISTWIN</span>{" }"}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }, i) => {
            const active = isActive(href);
            return (
              <a
                key={href}
                href={href}
                onClick={handleNavClick(href)}
                className={`group flex items-baseline gap-1.5 hud transition-colors duration-200 ${
                  onDark
                    ? active
                      ? "text-zinc-100"
                      : "text-zinc-400 hover:text-zinc-100"
                    : active
                    ? "text-zinc-900"
                    : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                <span className={onDark ? "text-signal-400" : "text-signal-600"}>
                  /0.{i + 1}
                </span>
                <span>{label}</span>
              </a>
            );
          })}
        </div>

        {/* Right — contact link / language switch / mobile toggle */}
        <div className="flex items-center gap-5">
          <a
            href={`${localePrefix}/contact`}
            className={`hidden md:inline-flex items-center gap-1.5 hud transition-colors ${
              onDark ? "text-signal-400 hover:text-signal-300" : "text-signal-600 hover:text-signal-700"
            }`}
          >
            <span>↳</span>
            <span>{t("contact")}</span>
          </a>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle onDark={onDark} />
            <LanguageSwitcher onDark={onDark} />
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 -mr-2"
            aria-label="Toggle menu"
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span
                className={`block h-px transition-all duration-300 origin-center ${
                  onDark ? "bg-zinc-100" : "bg-zinc-900"
                } ${mobileOpen ? "rotate-45 translate-y-[4px]" : ""}`}
              />
              <span
                className={`block h-px transition-all duration-300 origin-center ${
                  onDark ? "bg-zinc-100" : "bg-zinc-900"
                } ${mobileOpen ? "-rotate-45 -translate-y-[2px]" : ""}`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu — floating panel matching the pill aesthetic */}
      {mobileOpen && (
        <div
          className={`md:hidden mt-2 mx-auto max-w-[1600px] pointer-events-auto rounded-2xl border backdrop-blur-sm backdrop-saturate-150 ${
            onDark
              ? "bg-zinc-900/70 border-zinc-700/50 shadow-lg shadow-black/20"
              : "bg-white/65 border-zinc-200/55 shadow-lg shadow-zinc-900/5"
          }`}
        >
          <div className="px-6 py-6 flex flex-col gap-4">
            {links.map(({ href, label }, i) => (
              <a
                key={href}
                href={href}
                onClick={(e) => {
                  handleNavClick(href)(e);
                  setMobileOpen(false);
                }}
                className={`flex items-baseline gap-3 hud ${
                  onDark
                    ? isActive(href)
                      ? "text-zinc-100"
                      : "text-zinc-400"
                    : isActive(href)
                    ? "text-zinc-900"
                    : "text-zinc-500"
                }`}
              >
                <span className={onDark ? "text-signal-400" : "text-signal-600"}>
                  /0.{i + 1}
                </span>
                <span>{label}</span>
              </a>
            ))}
            <a
              href={`${localePrefix}/contact`}
              onClick={() => setMobileOpen(false)}
              className={`mt-2 inline-flex items-center gap-1.5 hud ${
                onDark ? "text-signal-400" : "text-signal-600"
              }`}
            >
              <span>↳</span>
              <span>{t("contact")}</span>
            </a>
            <div className="pt-3 mt-1 border-t border-zinc-200 flex items-center justify-between">
              <LanguageSwitcher onDark={onDark} />
              <ThemeToggle onDark={onDark} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
