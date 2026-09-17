"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SITE_CONFIG } from "@/lib/site-config";
import { InstagramIcon, TiktokIcon, YoutubeIcon } from "@/components/ui/social-icons";
import { useLocale } from "@/lib/i18n/context";

export function Footer() {
  const { t } = useLocale();

  const LINKS = [
    { href: "#about", label: t("nav.about") },
    { href: "#services", label: t("nav.coaching") },
    { href: "#packages", label: t("nav.packages") },
    { href: "#faq", label: t("nav.faq") },
    { href: "#contact", label: t("contact.label") },
  ];

  return (
    <footer className="border-t border-border bg-background py-14">
      <Container className="flex flex-col items-start justify-between gap-10 lg:flex-row">
        <div>
          <Link href="/" className="font-display text-2xl">
            FORGE<span className="text-accent">.</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted">{t("footer.tagline")}</p>
          <div className="mt-5 flex gap-4">
            <a href={SITE_CONFIG.instagram} target="_blank" rel="noreferrer" className="text-muted hover:text-accent">
              <InstagramIcon size={18} />
            </a>
            <a href={SITE_CONFIG.tiktok} target="_blank" rel="noreferrer" className="text-muted hover:text-accent">
              <TiktokIcon size={18} />
            </a>
            <a href={SITE_CONFIG.youtube} target="_blank" rel="noreferrer" className="text-muted hover:text-accent">
              <YoutubeIcon size={18} />
            </a>
          </div>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-3">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </Container>

      <Container className="mt-10 border-t border-border pt-6">
        <p className="text-xs text-muted">
          &copy; {new Date().getFullYear()} {SITE_CONFIG.brandName}. {t("footer.rights")}
        </p>
      </Container>
    </footer>
  );
}
