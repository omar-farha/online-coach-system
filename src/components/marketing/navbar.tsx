"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useLocale } from "@/lib/i18n/context";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { t } = useLocale();

  const LINKS = [
    { href: "#about", label: t("nav.about") },
    { href: "#services", label: t("nav.coaching") },
    { href: "#packages", label: t("nav.packages") },
    { href: "#how-it-works", label: t("nav.process") },
    { href: "#results", label: t("nav.results") },
    { href: "#faq", label: t("nav.faq") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      )}
    >
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="font-display text-2xl tracking-wide">
          FORGE<span className="text-accent">.</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium uppercase tracking-wide text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <ButtonLink href="#contact" size="sm">
            {t("nav.startCoaching")}
          </ButtonLink>
        </div>

        <button
          className="text-foreground lg:hidden"
          aria-label={t("common.toggleMenu")}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </Container>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium uppercase tracking-wide text-muted hover:bg-surface hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex items-center justify-between gap-3 px-3">
              <LanguageSwitcher />
            </div>
            <ButtonLink href="#contact" className="mt-2" onClick={() => setOpen(false)}>
              {t("nav.startCoaching")}
            </ButtonLink>
          </Container>
        </div>
      )}
    </header>
  );
}
