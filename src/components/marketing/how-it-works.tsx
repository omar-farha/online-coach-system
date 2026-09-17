"use client";

import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";
import { useLocale } from "@/lib/i18n/context";

export function HowItWorks() {
  const { t } = useLocale();

  const STEPS = [
    { number: "01", title: t("howItWorks.step1Title"), description: t("howItWorks.step1Desc") },
    { number: "02", title: t("howItWorks.step2Title"), description: t("howItWorks.step2Desc") },
    { number: "03", title: t("howItWorks.step3Title"), description: t("howItWorks.step3Desc") },
    { number: "04", title: t("howItWorks.step4Title"), description: t("howItWorks.step4Desc") },
  ];

  return (
    <section id="how-it-works" className="bg-surface py-28">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel className="justify-center">{t("howItWorks.label")}</SectionLabel>
          <h2 className="font-display mt-4 text-4xl sm:text-5xl">
            {t("howItWorks.titleLine1")}
            <span className="text-accent"> {t("howItWorks.titleHighlight")}</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.1} className="relative">
              <span className="font-display text-6xl text-border">
                {step.number}
              </span>
              <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.description}</p>
              {i < STEPS.length - 1 && (
                <span className="absolute end-[-1rem] top-6 hidden h-px w-8 bg-border lg:block" />
              )}
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
