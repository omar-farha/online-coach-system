"use client";

import { useState, type FormEvent } from "react";
import { Mail, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/ui/social-icons";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/site-config";
import { useLocale } from "@/lib/i18n/context";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { t } = useLocale();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Coaching inquiry from ${name || "website visitor"}`);
    const body = encodeURIComponent(
      `${message}\n\n— ${name}\n${email}`
    );
    window.location.href = `mailto:${SITE_CONFIG.email}?subject=${subject}&body=${body}`;
  }

  return (
    <section id="contact" className="bg-surface py-28">
      <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <SectionLabel>{t("contact.label")}</SectionLabel>
          <h2 className="font-display mt-4 text-4xl sm:text-5xl">
            {t("contact.titleLine1")}
            <span className="text-accent"> {t("contact.titleHighlight")}</span>
          </h2>
          <p className="mt-6 max-w-md text-muted">{t("contact.subtitle")}</p>

          <div className="mt-10 space-y-4">
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="flex items-center gap-3 text-sm text-foreground/90 hover:text-accent"
            >
              <Mail size={18} className="text-accent" /> {SITE_CONFIG.email}
            </a>
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="flex items-center gap-3 text-sm text-foreground/90 hover:text-accent"
            >
              <Phone size={18} className="text-accent" /> {SITE_CONFIG.phone}
            </a>
            <a
              href={SITE_CONFIG.instagram}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-sm text-foreground/90 hover:text-accent"
            >
              <InstagramIcon size={18} className="text-accent" /> @forgecoaching
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-3xl border border-border bg-background p-8"
          >
            <div>
              <label className="mb-2 block text-xs uppercase tracking-wide text-muted">
                {t("contact.nameLabel")}
              </label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                placeholder={t("contact.namePlaceholder")}
              />
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-wide text-muted">
                {t("contact.emailLabel")}
              </label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                placeholder={t("contact.emailPlaceholder")}
              />
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-wide text-muted">
                {t("contact.goalLabel")}
              </label>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full resize-none rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                placeholder={t("contact.goalPlaceholder")}
              />
            </div>
            <Button type="submit" className="w-full">
              {t("contact.send")}
            </Button>
          </form>
        </Reveal>
      </Container>
    </section>
  );
}
