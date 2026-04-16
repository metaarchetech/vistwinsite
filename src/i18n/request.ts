import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

import en from "../../messages/en.json";
import zh from "../../messages/zh.json";

// Static map — Turbopack/Next.js 16 chokes on the dynamic-import variant for
// JSON when it can't statically prove the file list, so we bundle explicitly.
const MESSAGES = { en, zh } as const;

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: MESSAGES[locale as keyof typeof MESSAGES],
  };
});
