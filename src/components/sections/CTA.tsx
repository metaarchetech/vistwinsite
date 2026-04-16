"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useShouldAnimate } from "@/hooks/useShouldAnimate";
import { Reveal } from "@/components/ui/Reveal";
import { Link } from "@/i18n/navigation";

export function CTA() {
  const t = useTranslations("CTA");
  const animated = useShouldAnimate();

  return (
    <section className="relative bg-zinc-900 text-zinc-100 py-24 lg:py-40 overflow-hidden">
      {/* Tactical grid */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #FAFAFA 1px, transparent 1px), linear-gradient(to bottom, #FAFAFA 1px, transparent 1px)`,
          backgroundSize: "8.333333% 12.5vh",
        }}
      />
      <div className="noise absolute inset-0 pointer-events-none" />

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-10 2xl:px-14">
        {/* HUD bar */}
        <motion.div
          initial={animated ? { opacity: 0 } : false}
          whileInView={{ opacity: 1 }}
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
          <div className="hidden md:block md:col-span-3 md:col-start-10 text-right">
            <span className="hud-sm text-zinc-500">{`{ contact } / 0.5`}</span>
          </div>
        </motion.div>

        {/* Massive headline */}
        <motion.div
          initial={animated ? { opacity: 0, y: 20 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 0.7, 0.2, 1] }}
          className="grid grid-cols-12 gap-x-4 lg:gap-x-6"
        >
          <h2
            className="display text-zinc-100 col-span-12"
            style={{ fontSize: "clamp(3rem, 9vw, 11rem)" }}
          >
            <Reveal>{t("headline")}</Reveal>
            <Reveal delay={0.1} className="text-zinc-500">
              {t("headlineB")}
            </Reveal>
          </h2>
        </motion.div>

        {/* Bottom row — description + CTA */}
        <motion.div
          initial={animated ? { opacity: 0, y: 16 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-12 gap-x-4 lg:gap-x-6 mt-16 lg:mt-24 pt-6 border-t border-zinc-700"
        >
          <div className="col-span-12 md:col-span-6 lg:col-start-4 lg:col-span-5">
            <p className="text-base lg:text-lg text-zinc-400 leading-relaxed max-w-xl">
              {t("description")}
            </p>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-3 mt-8 md:mt-0 flex md:flex-col md:items-end gap-6 md:gap-3">
            <Link
              href="/contact"
              className="group hud text-signal-400 hover:text-signal-300 transition-colors flex items-center gap-2"
            >
              <span data-arrow>↳</span>
              <span className="link-underline">{t("button")}</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
