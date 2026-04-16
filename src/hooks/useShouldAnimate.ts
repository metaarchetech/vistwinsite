"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

// useShouldAnimate ────────────────────────────────────────────────────────────
// Returns `true` only when entrance/scroll animations are guaranteed to play
// to completion. Returns `false` in three cases:
//
//   1. SSR / first render        — `false` so the server-rendered HTML matches
//                                  the visible final state. No hydration flash.
//   2. prefers-reduced-motion     — accessibility opt-out.
//   3. document.visibilityState   — the tab is hidden (e.g. background tab,
//      === "hidden"                 headless preview frames). Chromium pauses
//                                  rAF / WAAPI / CSS transitions in hidden
//                                  tabs, which leaves any element rendered at
//                                  its `initial` state stuck there forever.
//                                  Refusing to enter the animated branch keeps
//                                  the page legible in those environments.
//
// Components consume this to decide whether to render the dramatic initial
// state (clip-mask down, opacity 0, translated) or the plain final state.
// If the answer is `false`, render the final state directly — no animation,
// but always visible.
//
// Subsequent visibility changes (user switches back to the tab) flip the
// hook to `true`. A component that already mounted in static mode WILL
// re-render into animated mode at that point, but since it was already
// showing the final state, the re-render keeps the same visible output —
// no jarring flash.

export function useShouldAnimate(): boolean {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setEnabled(false);
      return;
    }

    const compute = () =>
      typeof document !== "undefined" && document.visibilityState === "visible";

    setEnabled(compute());

    const onVisibility = () => setEnabled(compute() && !reduceMotion);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [reduceMotion]);

  return enabled;
}
