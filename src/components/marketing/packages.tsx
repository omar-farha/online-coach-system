import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { cn, formatCurrency } from "@/lib/utils";
import { getActivePackages } from "@/lib/data/packages";
import { getTranslator } from "@/lib/i18n/server";

export async function Packages() {
  const [packages, { t }] = await Promise.all([getActivePackages(), getTranslator()]);
  const featuredIndex = Math.min(1, packages.length - 1);

  return (
    <section id="packages" className="bg-background py-28">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel className="justify-center">{t("packagesSection.label")}</SectionLabel>
          <h2 className="font-display mt-4 text-4xl sm:text-5xl">
            {t("packagesSection.titleLine1")}
            <span className="text-accent"> {t("packagesSection.titleHighlight")}</span>
          </h2>
          <p className="mt-4 text-muted">{t("packagesSection.subtitle")}</p>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {packages.map((pkg, i) => {
            const featured = i === featuredIndex;
            return (
              <Reveal key={pkg.id} delay={i * 0.1}>
                <div
                  className={cn(
                    "relative flex h-full flex-col rounded-3xl border p-8",
                    featured
                      ? "border-accent bg-gradient-to-b from-accent/10 to-surface shadow-[0_0_60px_rgba(255,90,31,0.15)]"
                      : "border-border bg-surface"
                  )}
                >
                  {featured && (
                    <span className="absolute -top-3 start-8 rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-foreground">
                      {t("packagesSection.mostPopular")}
                    </span>
                  )}

                  <h3 className="font-display text-2xl">{pkg.name}</h3>
                  <p className="mt-1 text-sm text-muted">{pkg.duration_label}</p>

                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="font-display text-5xl">
                      {formatCurrency(pkg.price)}
                    </span>
                    <span className="text-sm text-muted">{t("packagesSection.perProgram")}</span>
                  </div>

                  {pkg.description && (
                    <p className="mt-4 text-sm text-muted">{pkg.description}</p>
                  )}

                  <ul className="mt-6 flex-1 space-y-3">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm">
                        <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                        <span className="text-foreground/90">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <ButtonLink
                    href="#contact"
                    variant={featured ? "primary" : "secondary"}
                    className="mt-8 w-full"
                  >
                    {t("packagesSection.getStarted")}
                  </ButtonLink>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
