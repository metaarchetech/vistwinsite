"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useShouldAnimate } from "@/hooks/useShouldAnimate";
import { Reveal } from "@/components/ui/Reveal";

type Axis = {
  id: string;
  label: string;
  name: string;
  examples: string;
  description: string;
};

// Architecture section ─────────────────────────────────────────────────────
// The central narrative of the site, framed as Building Lifecycle Management
// (BLMS) per the Visustwin brochure: dissolve the design-phase silos
// (BIM / ESG / WELL / Passive House) and operation-phase silos
// (FM / CAFM / CMMS / BMS / IoT) into one shared spatial ontology.
//
// The diagram is a 3 + 1 framing:
//   • Three INPUT AXES — Data, Logic, System — write into the central
//     VisTwin Ontology block.
//   • One WRAPPING FRAME — Spatial / USD Prim binding — encloses the whole
//     diagram. Spatial is not a fourth axis, it's the envelope every
//     property sits inside (its USD Prim address). This is what other
//     ontology platforms structurally cannot do, so the wrapper carries the
//     signal-green accent.
//
// Visually: thin signal-green bordered frame containing the 3 axis cards
// + arrows + ontology band, with a SPATIAL header strip up top and a
// lifecycle footnote strip at bottom. No SVG, all grid + borders + HUD
// labels.
// ───────────────────────────────────────────────────────────────────────────
export function Architecture() {
  const t = useTranslations("Architecture");
  const animated = useShouldAnimate();
  const axes = t.raw("axes") as Axis[];

  return (
    <section
      id="architecture"
      className="relative bg-white py-24 lg:py-32 overflow-hidden"
    >
      {/* faint vertical grid backdrop — same DNA as Position section */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #18181B 1px, transparent 1px)`,
          backgroundSize: "8.333333% 100%",
        }}
      />

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-10 2xl:px-14">
        {/* Section header bar */}
        <motion.div
          initial={animated ? { opacity: 0, y: 12 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-12 gap-x-4 lg:gap-x-6 border-t border-zinc-300 pt-4 mb-16 lg:mb-24"
        >
          <div className="col-span-6 md:col-span-3">
            <span className="hud-sm text-signal-600">{t("kicker")}</span>
          </div>
          <div className="col-span-6 md:col-span-3 md:col-start-10 text-right">
            <span className="hud-sm text-zinc-400">{`{ architecture } / 0.3`}</span>
          </div>
        </motion.div>

        {/* Big H2 + intro */}
        <motion.div
          initial={animated ? { opacity: 0, y: 16 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 0.7, 0.2, 1] }}
          className="grid grid-cols-12 gap-x-4 lg:gap-x-6 mb-20 lg:mb-28"
        >
          <h2
            className="display text-zinc-900 col-span-12 lg:col-span-10"
            style={{ fontSize: "clamp(2.5rem, 6vw, 6.5rem)" }}
          >
            <Reveal>{t("title")}</Reveal>
          </h2>
          <p className="col-span-12 lg:col-start-4 lg:col-span-7 mt-8 text-base lg:text-lg text-zinc-600 leading-relaxed max-w-3xl">
            {t("intro")}
          </p>
        </motion.div>

        {/* SPATIAL wrapping frame — encloses all 3 axes + the ontology band.
            The header strip names the wrapper (SPATIAL · USD Prim binding);
            the footer strip carries the "every property has a place across
            the whole lifecycle" message. Both strips use the signal-green
            accent on a tinted background to read as ENVELOPE, not as one
            more axis. */}
        <motion.div
          initial={animated ? { opacity: 0, y: 16 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 0.7, 0.2, 1] }}
          className="relative border border-signal-500/30 bg-white"
        >
          {/* Top strip — SPATIAL label + examples */}
          <div className="grid grid-cols-12 gap-x-4 lg:gap-x-6 px-3 sm:px-4 lg:px-8 py-3 sm:py-4 border-b border-signal-500/20 bg-signal-500/[0.04]">
            <div className="col-span-12 md:col-span-7 flex items-baseline gap-3">
              <span className="hud-sm text-signal-700 flex items-center gap-1.5">
                <span aria-hidden className="live-dot" />
                <span>{t("spatial.label")}</span>
              </span>
            </div>
            <div className="col-span-12 md:col-span-5 mt-2 md:mt-0 md:text-right">
              <span className="hud-sm text-signal-700/80">{t("spatial.examples")}</span>
            </div>
          </div>

          {/* Inner: 3 axis cards + ontology band */}
          <div className="px-3 sm:px-4 lg:px-8 py-6 sm:py-8 lg:py-10">
            {/* Three axis cards */}
            <div className="grid grid-cols-12 gap-x-4 lg:gap-x-6 border-t border-zinc-200">
              {axes.map((axis, i) => (
                <motion.div
                  key={axis.id}
                  initial={animated ? { opacity: 0, y: 20 } : false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.6,
                    delay: 0.06 * i,
                    ease: [0.22, 0.7, 0.2, 1],
                  }}
                  className={`col-span-12 md:col-span-6 lg:col-span-4 pt-6 pb-10 lg:pb-14 ${
                    i > 0 ? "lg:border-l border-zinc-200" : ""
                  } px-0 lg:px-5`}
                >
                  {/* index + axis-type tag */}
                  <div className="flex items-baseline justify-between mb-5">
                    <span className="hud text-zinc-700">{axis.id}</span>
                    <span className="hud-sm text-zinc-400">{t("inputAxisLabel")}</span>
                  </div>

                  {/* short layer label, e.g. DATA / LOGIC / SYSTEM */}
                  <p className="hud-sm text-zinc-500">{axis.label}</p>

                  {/* axis name */}
                  <h3
                    className="display text-zinc-900 mt-2 leading-[1.0]"
                    style={{ fontSize: "clamp(1.5rem, 2vw, 2rem)" }}
                  >
                    {axis.name}
                  </h3>

                  {/* concrete examples — the architect-buyer recognises
                      MQTT / BMS / WELL / EEWH / CMMS by name */}
                  <p className="hud-sm text-zinc-500 mt-3">{axis.examples}</p>

                  {/* description */}
                  <p className="mt-5 text-sm text-zinc-600 leading-relaxed">
                    {axis.description}
                  </p>

                  {/* arrow into ontology */}
                  <div className="mt-8 flex items-center gap-2">
                    <span className="hud-sm text-zinc-400">↓</span>
                    <span className="hud-sm text-zinc-400">{t("writesToOntology")}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Convergence band — the Ontology layer itself */}
            <motion.div
              initial={animated ? { opacity: 0, y: 24 } : false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 0.7, 0.2, 1] }}
              className="relative mt-2 border-t-2 border-signal-500"
            >
              <div className="grid grid-cols-12 gap-x-4 lg:gap-x-6 bg-zinc-50 py-10 lg:py-14 px-4 lg:px-8 rounded-b-sm">
                <div className="col-span-12 md:col-span-3">
                  <span className="hud-sm text-signal-600 flex items-center gap-1.5">
                    <span aria-hidden className="live-dot" />
                    <span>{t("centerKicker")}</span>
                  </span>
                </div>
                <div className="col-span-12 md:col-span-6 mt-4 md:mt-0">
                  <h3
                    className="display text-zinc-900 leading-[0.95]"
                    style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
                  >
                    {t("centerTitle")}
                  </h3>
                  <p className="hud-sm text-zinc-500 mt-3">
                    {t("centerSubtitle")}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-3 mt-4 md:mt-0 md:text-right">
                  <span className="hud-sm text-zinc-500">{t("footnote")}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom strip — spatial wrapper footnote (lifecycle message) */}
          <div className="px-3 sm:px-4 lg:px-8 py-3 sm:py-4 border-t border-signal-500/20 bg-signal-500/[0.04]">
            <span className="hud-sm text-signal-700/90">{t("spatial.footnote")}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
