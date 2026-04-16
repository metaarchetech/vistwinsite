"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { useShouldAnimate } from "@/hooks/useShouldAnimate";
import { Reveal } from "@/components/ui/Reveal";

// Surface section ─ "this is the actual product, today". The previous
// sections (Capabilities, Position, Architecture) are conceptual; this one
// is photographic evidence. One wide anchor (the full suite running inside
// Omniverse Kit) plus three detail tiles for the headline modules.
//
// The brochure (Visustwin_Guide.pdf) frames the product as a 16-module
// Building Lifecycle Management System (BLMS). We don't list all 16 here —
// that's what /cases is for — but we DO use the brochure's actual numbers
// in the captions (1200 particles, 180 units, NOAA SPA ±0.0003°, etc.) so
// the reader feels the engineering depth, not just the marketing surface.
//
// Tile design: thin zinc-900 frame, image fills 16/9, hud-sm caption below
// with kicker (family) + numeric specs. Hover lifts the frame on a slight
// scale + signal-green caption color shift. Identical aesthetic to the
// Work table rows, so the section reads as "evidence beneath the roadmap".
//
// Image filenames are placeholders — drop into public/screenshots/:
//   suite.png         (~1980×845, the multi-window Omniverse Kit dashboard)
//   wind-tunnel.png   (~1635×867, particle streamlines around buildings)
//   solar-heatmap.png (~1645×975, ground irradiance heatmap + tower model)
//   wind-vector.png   (~1290×665, wind speed distribution + analysis params)
// If a file is missing, Next/Image will 404 it but the layout stays intact.

type Tile = {
  src: string;
  /** Module family kicker, e.g. "AIR", "SUN". */
  family: string;
  /** Module name. */
  name: string;
  /** Compact spec line under the title. */
  specs: string;
};

export function Surface() {
  const t = useTranslations("Surface");
  const animated = useShouldAnimate();
  const tiles = t.raw("tiles") as Tile[];

  return (
    <section id="surface" className="relative bg-white py-24 lg:py-32">
      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-10 2xl:px-14">
        {/* HUD bar */}
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
            <span className="hud-sm text-zinc-400">{`{ surface } / 0.5`}</span>
          </div>
        </motion.div>

        {/* Title + intro */}
        <motion.div
          initial={animated ? { opacity: 0, y: 16 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 0.7, 0.2, 1] }}
          className="grid grid-cols-12 gap-x-4 lg:gap-x-6 mb-16 lg:mb-20"
        >
          <h2
            className="display text-zinc-900 col-span-12 lg:col-span-10"
            style={{ fontSize: "clamp(2.5rem, 6vw, 6.5rem)" }}
          >
            <Reveal>{t("title")}</Reveal>
          </h2>
          <p className="col-span-12 lg:col-start-4 lg:col-span-6 mt-8 text-base lg:text-lg text-zinc-600 leading-relaxed max-w-2xl">
            {t("intro")}
          </p>
        </motion.div>

        {/* Anchor image — full suite */}
        <motion.figure
          initial={animated ? { opacity: 0, y: 20 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.85, ease: [0.22, 0.7, 0.2, 1] }}
          className="mb-16 lg:mb-20"
        >
          <div className="relative aspect-[1980/845] w-full overflow-hidden border border-zinc-900/90 bg-zinc-900 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.18)] group">
            <Image
              src={`/screenshots/${t("anchor.src")}`}
              alt={t("anchor.alt")}
              fill
              priority
              sizes="(min-width: 1600px) 1568px, 100vw"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.015]"
            />
          </div>
          <figcaption className="mt-4 grid grid-cols-12 gap-x-4 lg:gap-x-6">
            <div className="col-span-12 md:col-span-6 flex items-baseline gap-3">
              {/* t.raw() bypasses ICU MessageFormat parsing — these strings
                  contain literal "{ suite }" / "{ AIR }" hud-style brackets
                  that next-intl would otherwise treat as variable placeholders
                  and throw FORMATTING_ERROR on. */}
              <span className="hud-sm text-signal-600">{t.raw("anchor.family") as string}</span>
              <span className="hud text-zinc-900">{t.raw("anchor.name") as string}</span>
            </div>
            <div className="col-span-12 md:col-span-6 mt-2 md:mt-0 md:text-right">
              <span className="hud-sm text-zinc-500">{t.raw("anchor.specs") as string}</span>
            </div>
          </figcaption>
        </motion.figure>

        {/* Detail tiles — 3 columns */}
        <div className="grid grid-cols-12 gap-x-4 gap-y-12 lg:gap-x-6">
          {tiles.map((tile, i) => (
            <motion.figure
              key={tile.src}
              initial={animated ? { opacity: 0, y: 24 } : false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.05 * i, ease: [0.22, 0.7, 0.2, 1] }}
              className="col-span-12 md:col-span-6 lg:col-span-4 group"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden border border-zinc-900/90 bg-zinc-900 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.15)]">
                <Image
                  src={`/screenshots/${tile.src}`}
                  alt={`${tile.name} — ${tile.specs}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
                />
              </div>
              <figcaption className="mt-4">
                <div className="flex items-baseline justify-between">
                  <span className="hud-sm text-signal-600">{tile.family}</span>
                  <span className="hud-sm text-zinc-400">{`/0.${i + 1}`}</span>
                </div>
                <div className="mt-1.5 hud text-zinc-900 group-hover:text-signal-600 transition-colors duration-300">
                  {tile.name}
                </div>
                <div className="mt-1 hud-sm text-zinc-500">{tile.specs}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* Footer rule + brochure link */}
        <motion.div
          initial={animated ? { opacity: 0 } : false}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-16 lg:mt-20 pt-6 border-t border-zinc-200 grid grid-cols-12 gap-x-4 lg:gap-x-6 items-baseline"
        >
          <div className="col-span-12 md:col-span-6">
            <span className="hud-sm text-zinc-500">{t("footnote")}</span>
          </div>
          <div className="col-span-12 md:col-span-6 mt-3 md:mt-0 md:text-right">
            <a
              href="/#architecture"
              className="group hud text-zinc-500 hover:text-signal-600 transition-colors inline-flex items-center gap-2"
            >
              <span data-arrow>↳</span>
              <span className="link-underline">{t("seeAll")}</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
