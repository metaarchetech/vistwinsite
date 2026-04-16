"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useShouldAnimate } from "@/hooks/useShouldAnimate";

// Reveal primitives ──────────────────────────────────────────────────────────
// Two building blocks for scroll-triggered text animation.
//
//   <Reveal>   — clip-mask block. Children sit inside an overflow:hidden
//                wrapper and translate from y:110% → 0% on enter. The
//                signature "text emerges from below the line" effect, the
//                kind Palantir / Linear / Vercel use on big headlines.
//
//   <FadeUp>   — softer fade + small upward translate, no clip mask. For
//                body copy where a clip mask would be too theatrical.
//
// ── Visibility-first contract ──────────────────────────────────────────────
// Both primitives render their children VISIBLY by default. The dramatic
// "hidden until in-view" state is only applied client-side when we are sure
// the animation engine will play to completion (visible tab + no reduced
// motion preference). If the hook returns false — SSR, hidden tab, headless
// preview, reduced motion — children render plain and immediately legible.
//
// This prevents the failure mode where `initial: { opacity: 0 }` sticks
// forever because rAF / WAAPI / CSS transitions are paused (which Chromium
// does for any tab where document.visibilityState === "hidden", including
// background tabs and most preview iframes).
//
// ── IntersectionObserver placement ─────────────────────────────────────────
// The IO is attached to the static outer wrapper, NOT the transformed inner
// element. Putting it on an element that starts at `y: "110%"` shifts the
// observed bounding box off-screen, so IO never fires. The outer span has
// no transform, the inner span has the transform driven by `animate`.
// ───────────────────────────────────────────────────────────────────────────

const EASE = [0.16, 1, 0.3, 1] as const;

function useInViewOnce<T extends Element>(
  enabled: boolean,
  once = true,
  rootMargin = "0px 0px -80px 0px"
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) io.disconnect();
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { rootMargin, threshold: 0 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [enabled, once, rootMargin]);

  return [ref, inView] as const;
}

type RevealProps = {
  children: ReactNode;
  /** Stagger offset in seconds. Default 0. */
  delay?: number;
  /** Animation duration in seconds. Default 0.95. */
  duration?: number;
  /** Trigger only the first time the element scrolls into view. Default true. */
  once?: boolean;
  /** Extra classNames forwarded to the outer wrapper. */
  className?: string;
};

/**
 * Block-level clip-mask reveal. Pass any inline children — text, spans,
 * even another <Reveal>. Renders as a `<span class="block ...">` so it can
 * sit safely inside `<h1>` / `<h2>` / `<p>` etc. without breaking semantics.
 *
 * The padding-bottom / negative-margin pair gives descenders (g, q, y, etc.)
 * room to live below the baseline without being clipped at rest.
 */
export function Reveal({
  children,
  delay = 0,
  duration = 0.95,
  once = true,
  className = "",
}: RevealProps) {
  const shouldAnimate = useShouldAnimate();
  const [ref, inView] = useInViewOnce<HTMLSpanElement>(shouldAnimate, once, "0px 0px -80px 0px");

  if (!shouldAnimate) {
    // SSR + hidden tab + reduced motion path: plain visible content.
    return <span className={`block ${className}`}>{children}</span>;
  }

  return (
    <span
      ref={ref}
      className={`block overflow-hidden ${className}`}
      style={{ paddingBottom: "0.14em", marginBottom: "-0.14em" }}
    >
      <motion.span
        className="block will-change-transform"
        initial={{ y: "110%" }}
        animate={inView ? { y: "0%" } : { y: "110%" }}
        transition={{ duration, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * Soft fade + slight upward translate. No clip mask. Use for body copy,
 * subtitles, metadata — anywhere the clip-mask reveal would steal too much
 * attention from the headline above.
 */
export function FadeUp({
  children,
  delay = 0,
  duration = 0.85,
  once = true,
  className = "",
  y = 14,
}: RevealProps & { y?: number }) {
  const shouldAnimate = useShouldAnimate();
  const [ref, inView] = useInViewOnce<HTMLDivElement>(shouldAnimate, once, "0px 0px -60px 0px");

  if (!shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
