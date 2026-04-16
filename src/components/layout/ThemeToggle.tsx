"use client";

import { useEffect, useState } from "react";

// ThemeToggle ─ light/dark switch.
//
// Reads/writes `theme` from localStorage and toggles `data-theme="dark"` on
// <html>. CSS in globals.css does the actual color swap (zinc scale inversion
// + bg-white override). Signal greens stay untouched per brand spec.
//
// FOUC prevention is handled separately by an inline <script> in app/layout.tsx
// that runs BEFORE React hydrates — this hook is just for runtime toggling.
//
// After flipping the theme we dispatch a synthetic scroll event so the Header's
// own onDark luminance probe re-samples and updates the floating-pill colors.

type Mode = "light" | "dark";

function readMode(): Mode {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem("theme");
  if (stored === "dark" || stored === "light") return stored;
  return "light";
}

function applyMode(mode: Mode) {
  const root = document.documentElement;
  if (mode === "dark") root.setAttribute("data-theme", "dark");
  else root.removeAttribute("data-theme");
  // Nudge the Header's bg-luminance probe so the pill chrome refreshes.
  window.dispatchEvent(new Event("scroll"));
}

export function ThemeToggle({ onDark = false }: { onDark?: boolean }) {
  // Start in "light" to match SSR; the inline anti-FOUC script has already
  // applied the persisted mode to <html> before this component mounts.
  const [mode, setMode] = useState<Mode>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMode(readMode());
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Mode = mode === "dark" ? "light" : "dark";
    setMode(next);
    window.localStorage.setItem("theme", next);
    applyMode(next);
  };

  // Render a stable placeholder pre-hydration so SSR markup matches.
  // Once mounted we know the real persisted mode and can render the right icon.
  const isDark = mounted && mode === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`hud transition-colors flex items-center justify-center w-7 h-7 rounded-full ${
        onDark
          ? "text-zinc-400 hover:text-zinc-100"
          : "text-zinc-500 hover:text-zinc-900"
      }`}
    >
      {/* Sun (light mode active) / Moon (dark mode active). Inline SVG so
          icon weight matches the rest of the HUD typography (1px stroke). */}
      <span aria-hidden suppressHydrationWarning>
        {isDark ? (
          // Sun — shown in dark mode (click to switch to light)
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
        ) : (
          // Moon — shown in light mode (click to switch to dark)
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </span>
    </button>
  );
}
