"use client";

import { useLocale } from "@/lib/i18n/context";

export function Marquee() {
  const { t } = useLocale();

  const WORDS = [
    t("marquee.strength"),
    t("marquee.discipline"),
    t("marquee.nutrition"),
    t("marquee.progress"),
    t("marquee.consistency"),
    t("marquee.results"),
  ];

  const items = [...WORDS, ...WORDS];

  return (
    <div className="relative overflow-hidden border-y border-border bg-surface py-5">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {[...items, ...items].map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="font-display flex items-center gap-10 text-xl text-muted/70 sm:text-2xl"
          >
            {word}
            <span className="text-accent">&bull;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
