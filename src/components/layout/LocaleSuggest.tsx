"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";

// LocaleSuggest ─ a soft question pill that appears at the bottom-LEFT
// corner of the page (opposite of the ChatDock at bottom-right) when:
//
//   1. The user is currently viewing the English site (locale === "en"), AND
//   2. Their browser advertises a Chinese language preference
//      (navigator.languages contains anything starting with "zh"), AND
//   3. They haven't previously dismissed this pill (localStorage flag).
//
// We deliberately do NOT auto-redirect (per visitor request: "show English
// first, English is prettier") — we just OFFER the alternative. Clicking
// the switch button takes them to /zh; clicking the dismiss icon hides the
// pill for good (per-browser).
//
// Hidden during SSR + on first client render so SSR markup matches.

const STORAGE_KEY = "vt:locale-suggest-dismissed";

export function LocaleSuggest() {
  const locale = useLocale();
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only suggest on the English site; never on /zh itself
    if (locale !== "en") return;
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {
      // localStorage unavailable (private browsing) — don't show, don't crash
      return;
    }
    const langs = navigator.languages?.length
      ? navigator.languages
      : [navigator.language];
    const wantsZh = langs.some((l) => l.toLowerCase().startsWith("zh"));
    if (wantsZh) {
      // Tiny delay so the pill appears AFTER the page settles, not during
      // the initial paint flurry. Feels intentional, not pushy.
      const t = window.setTimeout(() => setShow(true), 700);
      return () => window.clearTimeout(t);
    }
  }, [locale]);

  if (!show) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {}
    setShow(false);
  };

  const switchToZh = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {}
    // Preserve current path under /zh
    const target = "/zh" + (pathname === "/" ? "" : pathname);
    window.location.href = target;
  };

  return (
    <div
      role="dialog"
      aria-label="Language preference"
      className="fixed bottom-4 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:bottom-auto sm:top-20 sm:max-w-fit z-40 pointer-events-auto"
    >
      {/* Soft red wash — low opacity (~20%) so the pill reads as a pink-red
          tint, not a loud red banner. Background still picks up enough of
          the page behind via backdrop-blur. Zinc text for normal contrast,
          red-700 only on the CTA "切換" so the action still pops. */}
      <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl border border-red-400/35 bg-red-500/20 backdrop-blur-sm backdrop-saturate-150 shadow-lg shadow-red-900/10">
        <span
          aria-hidden
          className="inline-block w-1.5 h-1.5 rounded-full bg-red-500"
        />
        <span className="hud-sm text-zinc-700 leading-tight">
          偵測到繁體中文 ·{" "}
          <span className="text-zinc-500">switch to Chinese?</span>
        </span>
        <button
          type="button"
          onClick={switchToZh}
          className="hud text-red-700 hover:text-red-800 transition-colors px-2 -mx-1 link-underline"
        >
          切換
        </button>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss"
          className="text-zinc-500 hover:text-zinc-800 transition-colors w-6 h-6 -mr-1 flex items-center justify-center"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M2 2l8 8M10 2l-8 8" />
          </svg>
        </button>
      </div>
    </div>
  );
}
