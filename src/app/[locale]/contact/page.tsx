"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useShouldAnimate } from "@/hooks/useShouldAnimate";
import { useState } from "react";

type Item = { id: string; name: string; description?: string };

export default function ContactPage() {
  const t = useTranslations("Contact");
  const cap = useTranslations("Capabilities");
  const animated = useShouldAnimate();
  const [submitted, setSubmitted] = useState(false);

  const interests = (cap.raw("items") as Item[]).map((i) => i.name);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="bg-white">
      <section className="relative pt-32 pb-12 lg:pt-40 lg:pb-16">
        <div className="relative mx-auto max-w-[1600px] px-6 lg:px-10 2xl:px-14">
          {/* HUD bar */}
          <motion.div
            initial={animated ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-12 gap-x-4 lg:gap-x-6 border-t border-zinc-300 pt-4 mb-12 lg:mb-16"
          >
            <div className="col-span-6 md:col-span-3">
              <span className="hud-sm text-signal-600 flex items-center gap-1.5">
                <span aria-hidden className="live-dot" />
                <span>{t("kicker")}</span>
              </span>
            </div>
            <div className="col-span-6 md:col-span-3 md:col-start-10 text-right">
              <span className="hud-sm text-zinc-400">{`{ contact } / 2.0`}</span>
            </div>
          </motion.div>

          {/* Big title */}
          <motion.div
            initial={animated ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 0.7, 0.2, 1] }}
            className="grid grid-cols-12 gap-x-4 lg:gap-x-6"
          >
            <h1
              className="display text-zinc-900 col-span-12"
              style={{ fontSize: "clamp(3rem, 8vw, 9rem)" }}
            >
              {t("title")}
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={animated ? { opacity: 0, y: 16 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-12 gap-x-4 lg:gap-x-6 mt-12 pt-6 border-t border-zinc-200"
          >
            <div className="col-span-12 lg:col-start-4 lg:col-span-6">
              <p className="text-base lg:text-lg text-zinc-600 leading-relaxed max-w-2xl">
                {t("subtitle")}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Form + Sidebar */}
      <section className="relative pb-32 lg:pb-40">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10 2xl:px-14">
          <div className="grid grid-cols-12 gap-x-4 lg:gap-x-6 border-t border-zinc-300 pt-12 lg:pt-16">
            {/* Sidebar */}
            <aside className="col-span-12 lg:col-span-3 mb-12 lg:mb-0">
              <ContactBlock label={t("office.label")} value={t("office.value")} />
            </aside>

            {/* Form */}
            <div className="col-span-12 lg:col-span-9">
              {submitted ? (
                <motion.div
                  initial={animated ? { opacity: 0, y: 12 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="border-t border-zinc-300 pt-8"
                >
                  <span className="hud text-signal-600 flex items-center gap-1.5">
                    <span aria-hidden className="live-dot" />
                    <span>↳ Received</span>
                  </span>
                  <p
                    className="mt-4 display text-zinc-900 leading-[0.95]"
                    style={{ fontSize: "clamp(1.75rem, 3.6vw, 3.5rem)" }}
                  >
                    {t("success")}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
                    <Field label={t("name")} required name="name" type="text" />
                    <Field label={t("company")} name="company" type="text" />
                    <Field label={t("email")} required name="email" type="email" />
                    <Field label={t("phone")} name="phone" type="tel" />
                  </div>

                  <div className="mt-2">
                    <SelectField label={t("interest")} name="interest" options={interests} />
                  </div>

                  <div className="mt-2">
                    <TextareaField label={t("message")} name="message" required />
                  </div>

                  <div className="mt-10 flex items-center justify-between border-t border-zinc-200 pt-6">
                    <span className="hud-sm text-zinc-400">
                      We respond personally — no auto-reply.
                    </span>
                    <button
                      type="submit"
                      className="group hud text-signal-600 hover:text-signal-700 transition-colors flex items-center gap-2"
                    >
                      <span>↳</span>
                      <span>{t("submit")}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  name,
  type,
  required,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}) {
  return (
    <label className="block border-t border-zinc-200 py-5">
      <div className="flex items-baseline justify-between mb-3">
        <span className="hud-sm text-zinc-500">{label}</span>
        {required && <span className="hud-sm text-signal-600">*</span>}
      </div>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full bg-transparent border-0 border-b border-transparent focus:border-signal-500 focus:outline-none text-base text-zinc-900 placeholder-zinc-400 pb-1 transition-colors"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <label className="block border-t border-zinc-200 py-5">
      <div className="mb-3">
        <span className="hud-sm text-zinc-500">{label}</span>
      </div>
      <select
        name={name}
        defaultValue=""
        className="w-full bg-transparent border-0 border-b border-transparent focus:border-signal-500 focus:outline-none text-base text-zinc-900 pb-1 transition-colors appearance-none"
      >
        <option value="">—</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextareaField({
  label,
  name,
  required,
}: {
  label: string;
  name: string;
  required?: boolean;
}) {
  return (
    <label className="block border-t border-zinc-200 py-5">
      <div className="flex items-baseline justify-between mb-3">
        <span className="hud-sm text-zinc-500">{label}</span>
        {required && <span className="hud-sm text-signal-600">*</span>}
      </div>
      <textarea
        name={name}
        required={required}
        rows={5}
        className="w-full bg-transparent border-0 border-b border-transparent focus:border-signal-500 focus:outline-none text-base text-zinc-900 placeholder-zinc-400 pb-1 resize-none transition-colors"
      />
    </label>
  );
}

function ContactBlock({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="border-t border-zinc-200 py-5">
      <p className="hud-sm text-signal-600 mb-2">{label}</p>
      {href ? (
        <a href={href} className="text-sm text-zinc-900 hover:text-zinc-500 transition-colors break-all">
          {value}
        </a>
      ) : (
        <p className="text-sm text-zinc-900">{value}</p>
      )}
    </div>
  );
}
