import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatDock } from "@/components/layout/ChatDock";
import { LocaleSuggest } from "@/components/layout/LocaleSuggest";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      {/* Floating chat dock — placeholder for future AI assistant. Frosted
          pill matching the Header's visual language, detached from edges. */}
      <ChatDock />
      {/* Soft locale suggestion — appears bottom-left ONLY when the visitor
          is on /en AND their browser advertises a Chinese preference. */}
      <LocaleSuggest />
    </NextIntlClientProvider>
  );
}
