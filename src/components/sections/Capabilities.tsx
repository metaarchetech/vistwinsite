"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useShouldAnimate } from "@/hooks/useShouldAnimate";
import { Reveal } from "@/components/ui/Reveal";

type Spec = { label: string; value: string };
type Item = {
  id: string;
  name: string;
  description: string;
  specs: Spec[];
};

export function Capabilities() {
  const t = useTranslations("Capabilities");
  const animated = useShouldAnimate();
  const items = t.raw("items") as Item[];

  return (
    <section id="capabilities" className="relative bg-white py-24 lg:py-32">
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
            <span className="hud-sm text-zinc-400">{`{ ${items.length} } / capabilities`}</span>
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
            className="display text-zinc-900 col-span-12 lg:col-span-10"
            style={{ fontSize: "clamp(2.5rem, 6vw, 6.5rem)" }}
          >
            <Reveal>{t("title")}</Reveal>
          </h2>
          <p className="col-span-12 lg:col-start-4 lg:col-span-6 mt-8 text-base lg:text-lg text-zinc-600 leading-relaxed max-w-2xl">
            {t("intro")}
          </p>
        </motion.div>

        {/* Items list */}
        <div>
          {items.map((item, i) => (
            <motion.article
              key={item.id}
              initial={animated ? { opacity: 0, y: 24 } : false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.04 * i, ease: [0.22, 0.7, 0.2, 1] }}
              className="grid grid-cols-12 gap-x-4 lg:gap-x-6 border-t border-zinc-200 py-12 lg:py-16 group"
            >
              {/* Item name — sized to read as a sub-element of the section title,
                  not to compete with it. Was clamp(3rem, 8vw, 8.5rem) which made
                  the h3 (~116px) bigger than the section h2 (~87px) and visually
                  swallowed the title. Now sits just under H2 size. */}
              <div className="col-span-12 lg:col-span-7">
                <h3
                  className="display text-zinc-900 group-hover:text-zinc-700 transition-colors leading-[0.95]"
                  style={{ fontSize: "clamp(2.25rem, 5.5vw, 6rem)" }}
                >
                  {item.name}
                </h3>
                <p className="mt-6 max-w-xl text-base text-zinc-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Specs table + id */}
              <div className="col-span-12 lg:col-span-4 lg:col-start-9 mt-8 lg:mt-2">
                <div className="flex items-baseline justify-between mb-4">
                  <span className="hud-sm text-zinc-400">Specs</span>
                  <span className="hud text-signal-600">{item.id}</span>
                </div>
                <dl>
                  {item.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-baseline justify-between border-t border-zinc-200 py-2.5"
                    >
                      <dt className="hud-sm text-zinc-500">{spec.label}</dt>
                      <dd className="hud text-zinc-900">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </motion.article>
          ))}
          <div className="border-t border-zinc-200" />
        </div>
      </div>
    </section>
  );
}
