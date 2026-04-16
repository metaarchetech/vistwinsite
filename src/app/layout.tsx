import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { getLocale } from "next-intl/server";
import "./globals.css";

// JetBrains Mono — used for HUD labels (.hud / .hud-sm).
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-jb",
  display: "swap",
});

// Space Grotesk — locked Latin choice. Geometric retro-future grotesque.
// Exposed as --font-space-grotesk; consumed by --latin-font in globals.css.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VisTwin",
  description: "Digital twin infrastructure for the built environment.",
};

// Map next-intl locale codes to BCP 47 lang attribute values that the
// `:lang(zh)` CSS selector and screen readers understand.
const localeToHtmlLang: Record<string, string> = {
  zh: "zh-Hant",
  en: "en",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const htmlLang = localeToHtmlLang[locale] ?? locale;

  return (
    <html
      lang={htmlLang}
      className={`${jetbrainsMono.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <head>
        {/* Anti-FOUC theme script. Runs synchronously BEFORE first paint so
            the persisted user preference (light/dark) is applied to <html>
            before any CSS resolves. Without this you'd see a brief flash of
            light theme on every navigation when the user has dark selected.

            Reads 'theme' from localStorage; if 'dark', sets data-theme="dark"
            on the document element. The CSS variable overrides in globals.css
            under `[data-theme="dark"]` then take effect immediately. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.setAttribute('data-theme','dark');}catch(e){}",
          }}
        />
      </head>
      {/* Font choice locked at the CSS level (see globals.css body{} block):
          CJK = Chiron Hei HK (千鳥), Latin = Space Grotesk, display weight 700.
          The runtime FontSwitcher dev tool that previously needed swap classes
          here is gone — ChatDock now occupies the bottom-right surface. */}
      <body className="min-h-screen bg-white text-zinc-900">
        {children}
      </body>
    </html>
  );
}
