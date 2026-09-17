"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Dumbbell } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { STOCK_IMAGES } from "@/lib/images";
import { useLocale } from "@/lib/i18n/context";

export function Hero() {
  const { t } = useLocale();

  const STATS = [
    { value: "300+", label: t("hero.statClients") },
    { value: "8", label: t("hero.statYears") },
    { value: "94%", label: t("hero.statSuccess") },
  ];

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-background pt-20">
      <div className="absolute inset-0">
        <Image
          src={STOCK_IMAGES.heroBackdrop}
          alt="Athlete training in a premium gym"
          fill
          priority
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/3 h-[420px] w-[420px] rounded-full bg-accent/20 blur-[140px] rtl:right-auto rtl:-left-24"
      />

      <Container className="relative grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent"
          >
            <Dumbbell size={14} /> {t("hero.badge")}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-balance text-[13vw] leading-[0.92] sm:text-7xl lg:text-8xl"
          >
            {t("hero.titleLine1")}
            <br />
            <span className="text-accent">{t("hero.titleLine2")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-md text-lg text-muted"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <ButtonLink href="#packages" size="lg">
              {t("hero.ctaPrimary")}
            </ButtonLink>
            <ButtonLink href="#contact" variant="outline" size="lg">
              {t("hero.ctaSecondary")}
            </ButtonLink>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-8"
          >
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl text-foreground sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-wide text-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden aspect-[3/4] lg:block"
        >
          <div className="absolute -inset-4 rounded-[2rem] border border-accent/20" />
          <Image
            src={STOCK_IMAGES.heroAthlete}
            alt="Coach ready to train"
            fill
            priority
            className="rounded-[2rem] object-cover"
          />
          <div className="absolute -bottom-6 -left-6 rounded-2xl border border-border bg-surface/90 px-6 py-4 backdrop-blur rtl:left-auto rtl:-right-6">
            <p className="font-display text-2xl text-accent">4.9/5</p>
            <p className="text-xs uppercase tracking-wide text-muted">
              {t("hero.satisfaction")}
            </p>
          </div>
        </motion.div>
      </Container>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted"
      >
        <ArrowDown size={22} />
      </motion.div>
    </section>
  );
}
