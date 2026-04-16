"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useShouldAnimate } from "@/hooks/useShouldAnimate";
import { Reveal } from "@/components/ui/Reveal";

// Work section ─ honest roadmap, not portfolio. Replaces the previous
// "What we have shipped" framing because we have not shipped enough yet to
// pretend otherwise. The shape is a status table: index, phase, item title,
// which architecture layer it serves, and a rough ETA. The /cases page
// (linked via "Full roadmap") is the longer-form version with phase filters.
//
// Phase semantics map to lifecycle:
//   Design       → being designed, not yet implemented
//   In build     → actively coded
//   Prototype    → working but not production
//   Pilot        → first commercial deployment
//
// The "Pilot" phase line gets the signal-green accent because it's the one
// outward-facing milestone — the moment "currently building" becomes "in
// the wild". Everything else stays neutral zinc.
type Item = {
  index: string;
  phase: string;
  title: string;
  layer: string;
  eta: string;
  description: string;
};

export function Work() {
  const t = useTranslations("Work");
  const animated = useShouldAnimate();
  const items = t.raw("items") as Item[];

  return (
    <section id="work" className="relative bg-white py-24 lg:py-32">
      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-10 2xl:px-14">
        {/* Header bar */}
        <motion.div
          initial={animated ? { opacity: 0, y: 12 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-12 gap-x-4 lg:gap-x-6 border-t border-zinc-300 pt-4 mb-16 lg:mb-24"
        >
          <div className="col-span-6 md:col-span-3">
            <span className="hud-sm text-signal-600 flex items-center gap-1.5">
              <span aria-hidden className="live-dot" />
              <span>{t("kicker")}</span>
            </span>
          </div>
          <div className="col-span-6 md:col-span-3 md:col-start-10 text-right">
            <span className="hud-sm text-zinc-400">{`{ convergence } / 0.4`}</span>
          </div>
        </motion.div>

        {/* Big H2 + roadmap link */}
        <motion.div
          initial={animated ? { opacity: 0, y: 16 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 0.7, 0.2, 1] }}
          className="grid grid-cols-12 gap-x-4 lg:gap-x-6 mb-16 lg:mb-20 items-end"
        >
          <h2
            className="display text-zinc-900 col-span-12 lg:col-span-9"
            style={{ fontSize: "clamp(2.5rem, 6vw, 6.5rem)" }}
          >
            <Reveal>{t("title")}</Reveal>
          </h2>
          <a
            href="/cases"
            className="group hud col-span-12 lg:col-span-3 text-zinc-500 hover:text-signal-600 transition-colors flex items-center gap-2 lg:justify-end"
          >
            <span data-arrow>↳</span>
            <span className="link-underline">{t("viewAll")}</span>
          </a>
        </motion.div>

        {/* Roadmap table */}
        <div>
          {/* Column headers */}
          <div className="hidden lg:grid grid-cols-12 gap-x-4 lg:gap-x-6 border-t border-zinc-300 pt-3 pb-3">
            <div className="col-span-1"><span className="hud-sm text-zinc-500">Idx</span></div>
            <div className="col-span-2"><span className="hud-sm text-zinc-500">Phase</span></div>
            <div className="col-span-6"><span className="hud-sm text-zinc-500">Item</span></div>
            <div className="col-span-2"><span className="hud-sm text-zinc-500">Layer</span></div>
            <div className="col-span-1 text-right"><span className="hud-sm text-zinc-500">ETA</span></div>
          </div>

          {items.map((item, i) => {
            const isPilot = item.phase === "Pilot";
            return (
              <motion.a
                key={item.index}
                href="/cases"
                initial={animated ? { opacity: 0, y: 16 } : false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.04 * i, ease: [0.22, 0.7, 0.2, 1] }}
                className="grid grid-cols-12 gap-x-4 lg:gap-x-6 border-t border-zinc-200 py-10 lg:py-12 group row-accent row-tint -mx-6 lg:-mx-10 px-6 lg:px-10"
              >
                <div className="col-span-2 lg:col-span-1">
                  <span className={`hud ${isPilot ? "text-signal-600" : "text-zinc-700"}`}>
                    {item.index}
                  </span>
                </div>
                <div className="col-span-10 lg:col-span-2">
                  <span className={`hud-sm ${isPilot ? "text-signal-600" : "text-zinc-500"}`}>
                    {item.phase}
                  </span>
                </div>
                <div className="col-span-12 lg:col-span-6 mt-3 lg:mt-0">
                  <h3
                    className="display text-zinc-900 group-hover:text-zinc-700 transition-colors leading-[0.95]"
                    style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.5rem)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-zinc-600 leading-relaxed max-w-2xl">
                    {item.description}
                  </p>
                </div>
                <div className="col-span-6 lg:col-span-2 mt-4 lg:mt-1.5">
                  <span className="hud text-zinc-700">{item.layer}</span>
                </div>
                <div className="col-span-6 lg:col-span-1 mt-4 lg:mt-1.5 text-right flex items-center justify-end gap-2">
                  <span className="hud text-zinc-500">{item.eta}</span>
                  <span
                    data-arrow
                    aria-hidden
                    className="hud text-zinc-300 group-hover:text-signal-600 transition-colors duration-300"
                  >
                    →
                  </span>
                </div>
              </motion.a>
            );
          })}
          <div className="border-t border-zinc-200" />
        </div>
      </div>
    </section>
  );
}
