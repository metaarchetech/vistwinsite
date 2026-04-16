"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useShouldAnimate } from "@/hooks/useShouldAnimate";

export function Hero() {
  const t = useTranslations("Hero");
  const hud = useTranslations("Hud");
  const animated = useShouldAnimate();

  return (
    <section className="relative min-h-screen bg-white text-zinc-900 overflow-hidden flex flex-col">
      {/* Tactical grid backdrop — hairline on white */}
      <div
        className="absolute inset-0 opacity-[0.55] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ECECEE 1px, transparent 1px), linear-gradient(to bottom, #ECECEE 1px, transparent 1px)`,
          backgroundSize: "8.333333% 8.333333vh",
          maskImage:
            "radial-gradient(ellipse at center, #000 0%, #000 35%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, #000 0%, #000 35%, transparent 90%)",
        }}
      />

      {/* HUD top bar — runs under the fixed Header */}
      <motion.div
        initial={animated ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative pt-24 lg:pt-28"
      >
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10 2xl:px-14">
          <div className="grid grid-cols-12 gap-x-4 lg:gap-x-6 border-t border-zinc-300 pt-4">
            <HudCell
              className="col-span-6 md:col-span-3"
              label={hud("youAreEntering")}
              value={t("wordmark")}
              live
            />
            <HudCell
              className="col-span-6 md:col-span-2"
              label={hud("estLabel")}
              value={hud("estValue")}
            />
            <HudCell
              className="hidden md:block md:col-span-2"
              label={hud("scrollLabel")}
              value={hud("scrollValue")}
            />
            <HudCell
              className="hidden md:block md:col-span-3"
              label={hud("operatingSystemFor")}
              value={hud("operatingSystemForB")}
            />
            <HudCell
              className="hidden md:block md:col-span-2 text-right"
              label="Copyright"
              value={hud("copyright")}
            />
          </div>
        </div>
      </motion.div>

      {/* Massive wordmark */}
      <div className="relative flex-1 flex items-center justify-center">
        <motion.h1
          initial={animated ? { opacity: 0, y: 24 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 0.7, 0.2, 1] }}
          className="display text-zinc-900 text-center w-full px-6"
          style={{ fontSize: "clamp(4rem, 18vw, 22rem)" }}
        >
          {t("wordmark")}
        </motion.h1>
      </div>

      {/* Bottom rail — chapter index + bracket brand + scroll cue + CTA */}
      <motion.div
        initial={animated ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="relative pb-10 lg:pb-12"
      >
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10 2xl:px-14">
          <div className="grid grid-cols-12 gap-x-4 lg:gap-x-6 border-t border-zinc-300 pt-5 items-end">
            {/* Left chapter index */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex flex-col gap-1.5 hud-sm text-zinc-400">
                <span className="text-zinc-900">A</span>
                <span>B</span>
                <span>C</span>
                <span>D</span>
              </div>
            </div>

            {/* Center — bracket brand + scroll cue */}
            <div className="col-span-8 md:col-span-7 lg:col-span-6 lg:col-start-4 flex flex-col items-center text-center gap-3">
              <span className="hud text-zinc-500">
                {"{ "}
                <span className="text-zinc-900">{t("wordmark").toUpperCase()}</span>
                {" }"}
              </span>
              <span className="hud-sm text-zinc-500 flex items-center gap-2">
                <span aria-hidden className="live-dot" />
                <span>{t("scrollCue")}</span>
              </span>
            </div>

            {/* Right CTA cluster */}
            <div className="col-span-2 md:col-span-4 lg:col-span-2 lg:col-start-11 flex flex-col items-end gap-2">
              <a
                href="/#capabilities"
                className="group hud text-zinc-500 hover:text-signal-600 transition-colors flex items-center gap-1.5"
              >
                <span data-arrow>↳</span>
                <span className="link-underline">{t("ctaPrimary")}</span>
              </a>
              <a
                href="/#architecture"
                className="group hud text-zinc-500 hover:text-signal-600 transition-colors flex items-center gap-1.5"
              >
                <span data-arrow>↳</span>
                <span className="link-underline">{t("ctaSecondary")}</span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function HudCell({
  label,
  value,
  className = "",
  live = false,
}: {
  label: string;
  value: string;
  className?: string;
  live?: boolean;
}) {
  return (
    <div className={className}>
      <div className="hud-sm text-zinc-500 leading-tight flex items-center gap-1.5">
        {live && <span aria-hidden className="live-dot" />}
        <span>{label}</span>
      </div>
      <div className="hud text-zinc-900 leading-tight mt-1">{value}</div>
    </div>
  );
}
