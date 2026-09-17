"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";
import { STOCK_IMAGES } from "@/lib/images";
import { useLocale } from "@/lib/i18n/context";

export function About() {
  const { t } = useLocale();

  const POINTS = [
    t("about.point1"),
    t("about.point2"),
    t("about.point3"),
    t("about.point4"),
  ];

  return (
    <section id="about" className="relative bg-background py-28">
      <Container className="grid items-center gap-16 lg:grid-cols-2">
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-border">
            <Image
              src={STOCK_IMAGES.aboutCoach}
              alt="Coach portrait in the gym"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute -right-6 -top-6 hidden rounded-2xl border border-border bg-surface/95 p-5 backdrop-blur sm:block rtl:right-auto rtl:-left-6">
            <p className="font-display text-3xl text-accent">300+</p>
            <p className="text-xs uppercase tracking-wide text-muted">
              {t("about.statBadge")}
            </p>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <SectionLabel>{t("about.label")}</SectionLabel>
            <h2 className="font-display mt-4 text-4xl sm:text-5xl">
              {t("about.titleLine1")}
              <span className="text-accent"> {t("about.titleHighlight")}</span>
            </h2>
            <p className="mt-6 max-w-lg text-muted">{t("about.description")}</p>
          </Reveal>

          <ul className="mt-8 space-y-4">
            {POINTS.map((point, i) => (
              <Reveal key={point} delay={i * 0.08}>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-accent" size={20} />
                  <span className="text-foreground/90">{point}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
