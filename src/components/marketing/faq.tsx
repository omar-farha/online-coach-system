"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n/context";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const { t } = useLocale();

  const FAQS = [
    { q: t("faq.q1"), a: t("faq.a1") },
    { q: t("faq.q2"), a: t("faq.a2") },
    { q: t("faq.q3"), a: t("faq.a3") },
    { q: t("faq.q4"), a: t("faq.a4") },
    { q: t("faq.q5"), a: t("faq.a5") },
  ];

  return (
    <section id="faq" className="bg-background py-28">
      <Container className="max-w-3xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel className="justify-center">{t("faq.label")}</SectionLabel>
          <h2 className="font-display mt-4 text-4xl sm:text-5xl">
            {t("faq.title")} <span className="text-accent">{t("faq.titleHighlight")}</span>
          </h2>
        </Reveal>

        <div className="mt-14 space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={faq.q} delay={i * 0.05}>
                <div className="overflow-hidden rounded-2xl border border-border bg-surface">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-start"
                  >
                    <span className="font-medium">{faq.q}</span>
                    <ChevronDown
                      size={20}
                      className={cn(
                        "shrink-0 text-accent transition-transform duration-300",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "grid transition-all duration-300 ease-in-out",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-sm text-muted">{faq.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
