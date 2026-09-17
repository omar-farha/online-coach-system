"use client";

import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";
import { STOCK_IMAGES } from "@/lib/images";
import { useLocale } from "@/lib/i18n/context";

const GALLERY = [
  { src: STOCK_IMAGES.training1, span: "row-span-2" },
  { src: STOCK_IMAGES.womanTraining1, span: "" },
  { src: STOCK_IMAGES.barbellClose, span: "" },
  { src: STOCK_IMAGES.training3, span: "" },
  { src: STOCK_IMAGES.womanTraining3, span: "row-span-2" },
  { src: STOCK_IMAGES.gymEquipment, span: "" },
];

export function FitnessExperience() {
  const { t } = useLocale();

  return (
    <section className="relative bg-surface py-28">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel className="justify-center">{t("fitnessExperience.label")}</SectionLabel>
          <h2 className="font-display mt-4 text-4xl sm:text-5xl">
            {t("fitnessExperience.titleLine1")}
            <span className="text-accent"> {t("fitnessExperience.titleHighlight")}</span>
          </h2>
          <p className="mt-4 text-muted">{t("fitnessExperience.subtitle")}</p>
        </Reveal>

        <div className="mt-16 grid auto-rows-[160px] grid-cols-2 gap-4 sm:auto-rows-[200px] lg:grid-cols-3">
          {GALLERY.map((item, i) => (
            <Reveal
              key={i}
              delay={i * 0.06}
              className={`relative overflow-hidden rounded-2xl border border-border ${item.span}`}
            >
              <Image
                src={item.src}
                alt="Fitness training moment"
                fill
                className="object-cover transition-transform duration-700 hover:scale-110"
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
