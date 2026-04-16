"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useShouldAnimate } from "@/hooks/useShouldAnimate";
import { Reveal } from "@/components/ui/Reveal";

type Item = { id: string; name: string; description: string };

export function Industries() {
  const t = useTranslations("Industries");
  const animated = useShouldAnimate();
  const items = t.raw("items") as Item[];

  return (
    <section className="relative bg-zinc-50 py-24 lg:py-32">
      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-10 2xl:px-14">
        {/* Header bar */}
        <motion.div
          initial={animated ? { opacity: 0, y: 12 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-12 gap-x-4 lg:gap-x-6 border-t border-zinc-300 pt-4 mb-12 lg:mb-16"
        >
          <div className="col-span-6 md:col-span-3">
            <span className="hud-sm text-signal-600">{t("kicker")}</span>
          </div>
          <div className="col-span-6 md:col-span-3 md:col-start-10 text-right">
            <span className="hud-sm text-zinc-400">{`{ sectors } / 0.4`}</span>
          </div>
        </motion.div>

        {/* Big H2 */}
        <motion.div
          initial={animated ? { opacity: 0, y: 16 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 0.7, 0.2, 1] }}
          className="grid grid-cols-12 gap-x-4 lg:gap-x-6 mb-12 lg:mb-16"
        >
          <h2
            className="display text-zinc-900 col-span-12 lg:col-span-10"
            style={{ fontSize: "clamp(2.5rem, 6vw, 6.5rem)" }}
          >
            <Reveal>{t("title")}</Reveal>
          </h2>
        </motion.div>

        {/* Items list — massive sans entries */}
        <ul>
          {items.map((item, i) => (
            <motion.li
              key={item.id}
              initial={animated ? { opacity: 0, y: 12 } : false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: 0.04 * i, ease: [0.22, 0.7, 0.2, 1] }}
              className="grid grid-cols-12 gap-x-4 lg:gap-x-6 border-t border-zinc-300 py-7 lg:py-9 group"
            >
              <div className="col-span-12 lg:col-span-7">
                <h3
                  className="display text-zinc-900 leading-[0.95]"
                  style={{ fontSize: "clamp(2rem, 5vw, 5.5rem)" }}
                >
                  {item.name}
                </h3>
              </div>
              <div className="col-span-12 lg:col-span-4 lg:col-start-8 mt-4 lg:mt-0 lg:self-end">
                <p className="text-base lg:text-lg text-zinc-600 leading-relaxed max-w-md">
                  {item.description}
                </p>
              </div>
              <div className="col-span-12 lg:col-span-1 lg:col-start-12 lg:text-right mt-3 lg:mt-0 lg:self-end">
                <span className="hud text-signal-600">{item.id}</span>
              </div>
            </motion.li>
          ))}
          <li className="border-t border-zinc-300" />
        </ul>
      </div>
    </section>
  );
}
