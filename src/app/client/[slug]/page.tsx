import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Dumbbell, Utensils, TrendingUp, Target, Flame } from "lucide-react";
import { getClientBySlug } from "@/lib/data/clients";
import { Badge, statusTone } from "@/components/ui/badge";
import { formatDate, daysUntil } from "@/lib/utils";
import { STOCK_IMAGES } from "@/lib/images";
import { getTranslator } from "@/lib/i18n/server";

export default async function ClientHomePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [client, { t, locale }] = await Promise.all([getClientBySlug(slug), getTranslator()]);
  if (!client) notFound();

  const daysLeft = client.subscription_end ? daysUntil(client.subscription_end) : null;

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-3xl border border-border">
        <div className="relative h-56 sm:h-72">
          <Image
            src={STOCK_IMAGES.clientPortalHero}
            alt="Your digital gym"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/10" />
        </div>
        <div className="relative -mt-16 px-6 pb-6 sm:-mt-20 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            {t("clientPortal.welcomeBack")}
          </p>
          <h1 className="font-display mt-1 text-4xl sm:text-5xl">{client.full_name}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Badge tone={statusTone(client.status)}>{t(`statuses.${client.status}`)}</Badge>
            {client.package && <Badge tone="neutral">{client.package.name}</Badge>}
            {daysLeft !== null && daysLeft >= 0 && (
              <Badge tone="neutral">
                {daysLeft} {t("clientPortal.daysLeft")}
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <InfoTile icon={Target} label={t("clientPortal.goal")} value={client.goal ?? t("clientPortal.goalNotSet")} />
        <InfoTile
          icon={Flame}
          label={t("clientPortal.currentWeight")}
          value={client.weight_kg ? `${client.weight_kg} ${t("common.kgUnit")}` : "—"}
        />
        <InfoTile
          icon={TrendingUp}
          label={t("clientPortal.subscriptionEnds")}
          value={client.subscription_end ? formatDate(client.subscription_end, locale) : "—"}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <QuickAccessCard
          href={`/client/${slug}/workout`}
          icon={Dumbbell}
          title={t("clientPortal.quickWorkoutTitle")}
          description={t("clientPortal.quickWorkoutDesc")}
        />
        <QuickAccessCard
          href={`/client/${slug}/nutrition`}
          icon={Utensils}
          title={t("clientPortal.quickNutritionTitle")}
          description={t("clientPortal.quickNutritionDesc")}
        />
        <QuickAccessCard
          href={`/client/${slug}/progress`}
          icon={TrendingUp}
          title={t("clientPortal.quickProgressTitle")}
          description={t("clientPortal.quickProgressDesc")}
        />
      </div>
    </div>
  );
}

function InfoTile({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
        <Icon size={18} />
      </div>
      <p className="mt-3 text-xs uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-1 text-lg font-semibold">{value}</p>
    </div>
  );
}

function QuickAccessCard({
  href,
  icon: Icon,
  title,
  description,
}: {
  href: string;
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/40"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
        <Icon size={20} />
      </div>
      <h3 className="mt-4 font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted">{description}</p>
    </Link>
  );
}
