"use client";

/**
 * LanguageSwitcher — HUD-styled dropdown that swaps locale while preserving
 * the current pathname.
 *
 * Uses the next-intl navigation `useRouter` so locale switches go through the
 * routing layer (which strips/adds the `/en` prefix per `localePrefix`).
 */
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useEffect, useRef, useState, useTransition } from "react";

const LOCALES = [
  { code: "zh", short: "中", label: "中文" },
  { code: "en", short: "EN", label: "English" },
] as const;

type LocaleCode = (typeof LOCALES)[number]["code"];

export function LanguageSwitcher({ onDark = false }: { onDark?: boolean }) {
  const locale = useLocale() as LocaleCode;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [, startTransition] = useTransition();
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  // Close on Esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const select = (code: LocaleCode) => {
    setOpen(false);
    if (code === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: code });
    });
  };

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`hud inline-flex items-center gap-1.5 transition-colors ${
          onDark ? "text-zinc-300 hover:text-zinc-100" : "text-zinc-600 hover:text-zinc-900"
        }`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={onDark ? "text-signal-400" : "text-signal-600"}>
          {current.short}
        </span>
        <span className="opacity-60">▾</span>
      </button>

      {open && (
        <ul
          role="listbox"
          // Mobile (in the bottom row of the mobile menu where this sits on
          // the LEFT), open the dropdown rightward — `right-0` would push
          // the panel off the left edge of the viewport. On sm+ (desktop
          // header where the switcher sits on the RIGHT), revert to
          // right-aligned so the dropdown doesn't run off the right edge.
          className={`absolute left-0 sm:left-auto sm:right-0 top-full mt-2 min-w-[140px] overflow-hidden rounded-md border shadow-lg ${
            onDark
              ? "bg-zinc-900 border-zinc-700"
              : "bg-white border-zinc-200"
          }`}
        >
          {LOCALES.map((l) => {
            const isActive = l.code === locale;
            return (
              <li key={l.code}>
                <button
                  onClick={() => select(l.code)}
                  role="option"
                  aria-selected={isActive}
                  className={`flex w-full items-center justify-between px-3 py-2 text-left transition-colors ${
                    onDark
                      ? isActive
                        ? "bg-zinc-800 text-zinc-100"
                        : "text-zinc-300 hover:bg-zinc-800"
                      : isActive
                      ? "bg-zinc-100 text-zinc-900"
                      : "text-zinc-700 hover:bg-zinc-50"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="hud-sm w-6 text-signal-600">
                      {l.short}
                    </span>
                    <span className="text-[13px]">{l.label}</span>
                  </span>
                  {isActive && (
                    <span className="text-signal-500 text-xs">●</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
