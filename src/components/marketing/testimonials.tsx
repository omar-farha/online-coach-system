"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";
import { STOCK_IMAGES } from "@/lib/images";
import { useLocale } from "@/lib/i18n/context";

export function Testimonials() {
  const { t } = useLocale();

  const TESTIMONIALS = [
    {
      name: t("testimonialsData.t1Name"),
      result: t("testimonialsData.t1Result"),
      quote: t("testimonialsData.t1Quote"),
      image: STOCK_IMAGES.testimonial1,
    },
    {
      name: t("testimonialsData.t2Name"),
      result: t("testimonialsData.t2Result"),
      quote: t("testimonialsData.t2Quote"),
      image: STOCK_IMAGES.testimonial2,
    },
    {
      name: t("testimonialsData.t3Name"),
      result: t("testimonialsData.t3Result"),
      quote: t("testimonialsData.t3Quote"),
      image: STOCK_IMAGES.testimonial3,
    },
  ];

  return (
    <section id="results" className="bg-background py-28">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel className="justify-center">{t("testimonials.label")}</SectionLabel>
          <h2 className="font-display mt-4 text-4xl sm:text-5xl">
            {t("testimonials.titleLine1")}
            <span className="text-accent"> {t("testimonials.titleHighlight")}</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, i) => (
            <Reveal key={testimonial.name} delay={i * 0.1}>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-7">
                <div className="flex gap-0.5 text-accent">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-foreground/90">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="relative h-11 w-11 overflow-hidden rounded-full border border-border">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-accent">{testimonial.result}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
