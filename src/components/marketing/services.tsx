"use client";

import { Dumbbell, Utensils, LineChart, MessageCircleHeart } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";
import { useLocale } from "@/lib/i18n/context";

export function Services() {
  const { t } = useLocale();

  const SERVICES = [
    { icon: Dumbbell, title: t("services.workoutTitle"), description: t("services.workoutDesc") },
    { icon: Utensils, title: t("services.nutritionTitle"), description: t("services.nutritionDesc") },
    { icon: LineChart, title: t("services.progressTitle"), description: t("services.progressDesc") },
    {
      icon: MessageCircleHeart,
      title: t("services.accountabilityTitle"),
      description: t("services.accountabilityDesc"),
    },
  ];

  return (
    <section id="services" className="bg-background py-28">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel className="justify-center">{t("services.label")}</SectionLabel>
          <h2 className="font-display mt-4 text-4xl sm:text-5xl">
            {t("services.titleLine1")}
            <span className="text-accent"> {t("services.titleHighlight")}</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.08}>
              <div className="group h-full rounded-2xl border border-border bg-surface p-7 transition-colors hover:border-accent/40">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <service.icon size={22} />
                </div>
                <h3 className="mt-6 text-lg font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {service.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
