import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-white text-zinc-600 border-t border-zinc-200">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10 2xl:px-14 pt-16 lg:pt-20 pb-10">
        {/* Top — wordmark + tagline + link columns */}
        <div className="grid grid-cols-12 gap-x-4 lg:gap-x-6 pb-16 border-b border-zinc-200">
          <div className="col-span-12 md:col-span-6 lg:col-span-5">
            <span className="hud text-zinc-900">
              {"{ "}<span>VISTWIN</span>{" }"}
            </span>
            <p className="mt-6 max-w-sm text-sm text-zinc-500 leading-relaxed">
              {t("tagline")}
            </p>
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-start-7 lg:col-span-6 mt-10 md:mt-0 grid grid-cols-3 gap-6">
            <FooterCol label={t("sections.company")}>
              <FooterLink href="/">Index</FooterLink>
              <FooterLink href="/#capabilities">Capabilities</FooterLink>
              <FooterLink href="/#architecture">Architecture</FooterLink>
            </FooterCol>
            <FooterCol label={t("sections.work")}>
              <FooterLink href="/#surface">Surface</FooterLink>
              <FooterLink href="/#architecture">Architecture</FooterLink>
            </FooterCol>
            <FooterCol label={t("sections.contact")}>
              <FooterLink href="/contact">Get in touch</FooterLink>
            </FooterCol>
          </div>
        </div>

        {/* Research collaboration — single line, sits above the colophon
            so the architectural / academic credibility lands before the
            legal boilerplate. */}
        <div className="mt-10 mb-4">
          <p className="hud-sm text-zinc-500">
            <span className="text-zinc-400">{t("collab.label")}</span>
            <span className="mx-2 text-zinc-300">↳</span>
            <span className="text-zinc-700">{t("collab.partner")}</span>
          </p>
        </div>

        {/* Bottom — colophon */}
        <div className="mt-4 grid grid-cols-12 gap-x-4 lg:gap-x-6 items-baseline">
          <div className="col-span-12 md:col-span-6">
            <p className="hud-sm text-zinc-500">
              <span>{t("company")}</span>
              <span className="mx-2 text-zinc-300">/</span>
              <span>{t("address")}</span>
            </p>
          </div>
          <div className="col-span-12 md:col-span-6 mt-3 md:mt-0 md:text-right">
            <p className="hud-sm text-zinc-500">
              <span>© {year}</span>
              <span className="mx-2 text-zinc-300">/</span>
              <span>{t("rights")}</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="hud-sm text-signal-600 mb-4">{label}</p>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  // Link from @/i18n/navigation prefixes the current locale automatically,
  // so /#capabilities on /zh becomes /zh#capabilities.
  return (
    <Link
      href={href}
      className="inline-flex text-sm text-zinc-600 hover:text-zinc-900 transition-colors break-all link-underline"
    >
      {children}
    </Link>
  );
}
