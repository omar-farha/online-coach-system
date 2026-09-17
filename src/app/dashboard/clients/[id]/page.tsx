import { notFound } from "next/navigation";
import Link from "next/link";
import { Pencil, Dumbbell, Utensils, TrendingUp, ExternalLink } from "lucide-react";
import { getClientById } from "@/lib/data/clients";
import { getWorkoutPlanByClientId } from "@/lib/data/workouts";
import { getNutritionPlanByClientId } from "@/lib/data/nutrition";
import { Avatar } from "@/components/ui/avatar";
import { Badge, statusTone } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { CopyLinkButton } from "@/components/dashboard/copy-link-button";
import { DeleteClientButton } from "@/components/dashboard/delete-client-button";
import { formatDate } from "@/lib/utils";
import { getTranslator } from "@/lib/i18n/server";

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [client, { t, locale }] = await Promise.all([getClientById(id), getTranslator()]);
  if (!client) notFound();

  const [workoutPlan, nutritionPlan] = await Promise.all([
    getWorkoutPlanByClientId(id),
    getNutritionPlanByClientId(id),
  ]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-border bg-surface p-6 lg:flex-row lg:items-center">
        <div className="flex items-center gap-4">
          <Avatar src={client.avatar_url} name={client.full_name} size={64} />
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold">{client.full_name}</h2>
              <Badge tone={statusTone(client.status)}>{t(`statuses.${client.status}`)}</Badge>
            </div>
            <p className="mt-1 text-sm text-muted">
              {client.phone} {client.email && `• ${client.email}`}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <CopyLinkButton slug={client.slug} />
          <Link
            href={`/client/${client.slug}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <ExternalLink size={13} /> {t("clients.openPortal")}
          </Link>
          <ButtonLink href={`/dashboard/clients/${id}/edit`} variant="secondary" size="sm" className="gap-1.5">
            <Pencil size={13} /> {t("common.edit")}
          </ButtonLink>
          <DeleteClientButton clientId={id} clientName={client.full_name} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <InfoCard label={t("clients.age")} value={client.age ? `${client.age} ${t("common.yrsUnit")}` : "—"} />
        <InfoCard label={t("clients.height")} value={client.height_cm ? `${client.height_cm} ${t("common.cmUnit")}` : "—"} />
        <InfoCard label={t("clients.weight")} value={client.weight_kg ? `${client.weight_kg} ${t("common.kgUnit")}` : "—"} />
        <InfoCard label={t("clients.goal")} value={client.goal ?? "—"} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <InfoCard label={t("clients.package_")} value={client.package?.name ?? t("clients.noPackage")} />
        <InfoCard
          label={t("clients.subscriptionStart")}
          value={client.subscription_start ? formatDate(client.subscription_start, locale) : "—"}
        />
        <InfoCard
          label={t("clients.subscriptionEnd")}
          value={client.subscription_end ? formatDate(client.subscription_end, locale) : "—"}
        />
        <InfoCard label={t("clients.privateSlug")} value={`/client/${client.slug}`} />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <PlanCard
          icon={Dumbbell}
          title={t("clients.workoutPlanTitle")}
          summary={
            workoutPlan
              ? `${workoutPlan.title} — ${workoutPlan.days.length} ${t("clients.dayCount")}`
              : t("clients.noWorkoutPlan")
          }
          href={`/dashboard/workouts/${id}`}
          cta={workoutPlan ? t("clients.editPlan") : t("clients.createPlan")}
        />
        <PlanCard
          icon={Utensils}
          title={t("clients.nutritionPlanTitle")}
          summary={
            nutritionPlan
              ? `${nutritionPlan.title} — ${nutritionPlan.meals.length} ${t("clients.mealCount")}`
              : t("clients.noNutritionPlan")
          }
          href={`/dashboard/nutrition/${id}`}
          cta={nutritionPlan ? t("clients.editPlan") : t("clients.createPlan")}
        />
        <PlanCard
          icon={TrendingUp}
          title={t("clients.progressTitle")}
          summary={t("clients.viewProgressDesc")}
          href={`/dashboard/progress/${id}`}
          cta={t("clients.viewProgress")}
        />
      </div>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <p className="text-xs uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-2 truncate text-lg font-semibold">{value}</p>
    </div>
  );
}

function PlanCard({
  icon: Icon,
  title,
  summary,
  href,
  cta,
}: {
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  summary: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-surface p-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
        <Icon size={20} />
      </div>
      <h3 className="mt-4 font-semibold">{title}</h3>
      <p className="mt-1 flex-1 text-sm text-muted">{summary}</p>
      <ButtonLink href={href} variant="outline" size="sm" className="mt-4 self-start">
        {cta}
      </ButtonLink>
    </div>
  );
}
