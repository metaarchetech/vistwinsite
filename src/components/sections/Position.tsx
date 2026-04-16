"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useShouldAnimate } from "@/hooks/useShouldAnimate";
import { Reveal } from "@/components/ui/Reveal";

type Row = { ours: string; theirs: string };

export function Position() {
  const t = useTranslations("Position");
  const animated = useShouldAnimate();
  const rows = t.raw("rows") as Row[];

  return (
    <section className="relative bg-zinc-900 text-zinc-100 py-24 lg:py-32 overflow-hidden">
      {/* Tactical grid backdrop */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #FAFAFA 1px, transparent 1px)`,
          backgroundSize: "8.333333% 100%",
        }}
      />
      <div className="noise absolute inset-0 pointer-events-none" />

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-10 2xl:px-14">
        {/* Header bar */}
        <motion.div
          initial={animated ? { opacity: 0, y: 12 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-12 gap-x-4 lg:gap-x-6 border-t border-zinc-700 pt-4 mb-16 lg:mb-24"
        >
          <div className="col-span-6 md:col-span-3">
            <span className="hud-sm text-signal-400 flex items-center gap-1.5">
              <span aria-hidden className="live-dot" />
              <span>{t("kicker")}</span>
            </span>
          </div>
          <div className="col-span-6 md:col-span-3 md:col-start-10 text-right">
            <span className="hud-sm text-zinc-500">{`{ position } / 0.2`}</span>
          </div>
        </motion.div>

        {/* Big H2 */}
        <motion.div
          initial={animated ? { opacity: 0, y: 16 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 0.7, 0.2, 1] }}
          className="grid grid-cols-12 gap-x-4 lg:gap-x-6 mb-20 lg:mb-28"
        >
          <h2
            className="display text-zinc-100 col-span-12 lg:col-span-10"
            style={{ fontSize: "clamp(2.5rem, 6vw, 6.5rem)" }}
          >
            <Reveal>{t("title")}</Reveal>
          </h2>
          <p className="col-span-12 lg:col-start-4 lg:col-span-6 mt-8 text-base lg:text-lg text-zinc-400 leading-relaxed max-w-2xl">
            {t("intro")}
          </p>
        </motion.div>

        {/* Comparison table */}
        <div>
          <div className="grid grid-cols-12 gap-x-4 lg:gap-x-6 border-t border-zinc-700 pt-3 pb-3">
            <div className="col-span-1">
              <span className="hud-sm text-zinc-500">#</span>
            </div>
            <div className="col-span-11 lg:col-span-6">
              <span className="hud-sm text-zinc-500">What we build</span>
            </div>
            <div className="hidden lg:block lg:col-span-5">
              <span className="hud-sm text-zinc-500">What the rest of the market sells</span>
            </div>
          </div>

          {rows.map((row, i) => (
            <motion.div
              key={i}
              initial={animated ? { opacity: 0, y: 12 } : false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.04 * i, ease: [0.22, 0.7, 0.2, 1] }}
              className="grid grid-cols-12 gap-x-4 lg:gap-x-6 border-t border-zinc-700 py-7 lg:py-9 group"
            >
              <div className="col-span-1">
                <span className="hud text-signal-400">/{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="col-span-11 lg:col-span-6">
                <p
                  className="display text-zinc-100 leading-[0.95]"
                  style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.75rem)" }}
                >
                  {row.ours}
                </p>
              </div>
              <div className="col-span-12 lg:col-span-5 mt-4 lg:mt-2">
                <p className="text-sm text-zinc-500 leading-relaxed line-through decoration-zinc-600">
                  {row.theirs}
                </p>
              </div>
            </motion.div>
          ))}
          <div className="border-t border-zinc-700" />
        </div>
      </div>
    </section>
  );
}
