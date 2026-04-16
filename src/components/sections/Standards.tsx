"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useShouldAnimate } from "@/hooks/useShouldAnimate";

// Standards strip ─ technical disclosure, not a logo wall.
//
// Architecture / construction / FM buyers don't trust capability claims —
// they trust standards alignment. EEWH, LEED, ISO 19650, IFC 4, EN ISO
// 7730, NOAA SPA, ASHRAE — these are the languages their review processes
// already speak. Listing them here tells the reader: "the report we
// generate will line up with the report your auditor expects."
//
// Format is deliberately spare: kicker bar + one tagline + four-column
// grid of categories with their standards listed underneath. No big H2
// (this isn't a chapter, it's an inline disclosure). Sits between Surface
// (what we're running) and Work (what's coming) — the implicit reading is
// "everything above and below is built on these."

type Group = {
  label: string;
  items: string[];
};

export function Standards() {
  const t = useTranslations("Standards");
  const animated = useShouldAnimate();
  const groups = t.raw("groups") as Group[];

  return (
    <section
      id="standards"
      className="relative bg-zinc-50 py-20 lg:py-24 border-t border-zinc-200"
    >
      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-10 2xl:px-14">
        {/* Header bar — kicker only, no big title */}
        <motion.div
          initial={animated ? { opacity: 0, y: 12 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-12 gap-x-4 lg:gap-x-6 mb-10 lg:mb-12"
        >
          <div className="col-span-12 md:col-span-4">
            <span className="hud-sm text-signal-600">{t("kicker")}</span>
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6 mt-3 md:mt-0">
            <p className="text-base lg:text-lg text-zinc-600 leading-relaxed max-w-2xl">
              {t("tagline")}
            </p>
          </div>
        </motion.div>

        {/* Four-column grid of standards by category */}
        <motion.div
          initial={animated ? { opacity: 0, y: 16 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 0.7, 0.2, 1] }}
          className="grid grid-cols-12 gap-x-4 gap-y-10 lg:gap-x-6 border-t border-zinc-300 pt-8"
        >
          {groups.map((group, i) => (
            <div
              key={group.label}
              className="col-span-12 sm:col-span-6 lg:col-span-3"
            >
              <div className="flex items-baseline justify-between mb-4">
                <span className="hud-sm text-zinc-900">{group.label}</span>
                <span className="hud-sm text-zinc-300">{`/0.${i + 1}`}</span>
              </div>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="hud-sm text-zinc-600 leading-relaxed"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
