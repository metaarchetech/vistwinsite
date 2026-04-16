"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useShouldAnimate } from "@/hooks/useShouldAnimate";
import { Reveal } from "@/components/ui/Reveal";

export function OneLiner() {
  const t = useTranslations("OneLiner");
  const animated = useShouldAnimate();

  return (
    <section className="relative bg-white py-20 lg:py-28">
      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-10 2xl:px-14">
        {/* Header bar */}
        <motion.div
          initial={animated ? { opacity: 0 } : false}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-12 gap-x-4 lg:gap-x-6 border-t border-zinc-300 pt-4 mb-12 lg:mb-16"
        >
          <div className="col-span-6 md:col-span-3">
            <span className="hud-sm text-signal-600">{`{ ${t("kicker")} }`}</span>
          </div>
          <div className="col-span-6 md:col-span-3 md:col-start-10 text-right">
            <span className="hud-sm text-zinc-400">{`{ note } / 0.0`}</span>
          </div>
        </motion.div>

        {/* The line */}
        <motion.div
          initial={animated ? { opacity: 0, y: 16 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 0.7, 0.2, 1] }}
          className="grid grid-cols-12 gap-x-4 lg:gap-x-6"
        >
          <div className="col-span-12 lg:col-span-11">
            <p
              className="display display-cjk text-zinc-900 leading-[1.0]"
              style={{ fontSize: "clamp(1.75rem, 4.6vw, 5rem)" }}
            >
              <Reveal duration={1.05}>{t("text")}</Reveal>
            </p>
          </div>
          <div className="col-span-12 lg:col-span-3 lg:col-start-4 mt-6 lg:mt-8">
            <span className="hud text-zinc-500">{t("byline")}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
