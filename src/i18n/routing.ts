import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // First entry is the canonical default. Order matters for some next-intl
  // helpers, so we list "en" first to keep that intent obvious.
  locales: ["en", "zh"],
  // English serves at "/" with no prefix (localePrefix: "as-needed");
  // Traditional Chinese is reachable at "/zh".
  defaultLocale: "en",
  localePrefix: "as-needed",
  // Accept-Language sniffing OFF — every visitor lands on English first
  // (the brand prefers English as the front door). Visitors with Chinese
  // browsers see a soft suggestion pill (LocaleSuggest component) asking
  // whether they want to switch to /zh; everyone else just sees English.
  localeDetection: false,
});
