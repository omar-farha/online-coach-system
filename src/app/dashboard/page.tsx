import Link from "next/link";
import {
  Users,
  UserCheck,
  AlertTriangle,
  UserPlus,
  Dumbbell,
  Utensils,
  Package,
} from "lucide-react";
import { getClients } from "@/lib/data/clients";
import { StatCard } from "@/components/dashboard/stat-card";
import { Avatar } from "@/components/ui/avatar";
import { Badge, statusTone } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { formatDate, daysUntil } from "@/lib/utils";
import { getTranslator } from "@/lib/i18n/server";

export default async function DashboardPage() {
  const [clients, { t, locale }] = await Promise.all([getClients(), getTranslator()]);

  const active = clients.filter((c) => c.status === "active");
  const newThisMonth = clients.filter(
    (c) => daysUntil(c.created_at) > -30
  );
  const expiring = clients
    .filter((c) => c.subscription_end && daysUntil(c.subscription_end) <= 7 && daysUntil(c.subscription_end) >= 0)
    .sort((a, b) => daysUntil(a.subscription_end!) - daysUntil(b.subscription_end!));
  const recent = [...clients]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label={t("dashboardHome.totalClients")} value={clients.length} icon={Users} tone="accent" />
        <StatCard label={t("dashboardHome.activeClients")} value={active.length} icon={UserCheck} />
        <StatCard
          label={t("dashboardHome.expiringSoon")}
          value={expiring.length}
          icon={AlertTriangle}
          tone="warning"
        />
        <StatCard label={t("dashboardHome.newThisMonth")} value={newThisMonth.length} icon={UserPlus} />
      </div>

      <div>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
          {t("dashboardHome.quickActions")}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <ButtonLink href="/dashboard/clients/new" variant="secondary" className="justify-start gap-3">
            <UserPlus size={16} /> {t("dashboardHome.addClient")}
          </ButtonLink>
          <ButtonLink href="/dashboard/workouts" variant="secondary" className="justify-start gap-3">
            <Dumbbell size={16} /> {t("dashboardHome.createWorkout")}
          </ButtonLink>
          <ButtonLink href="/dashboard/nutrition" variant="secondary" className="justify-start gap-3">
            <Utensils size={16} /> {t("dashboardHome.createNutrition")}
          </ButtonLink>
          <ButtonLink href="/dashboard/packages" variant="secondary" className="justify-start gap-3">
            <Package size={16} /> {t("dashboardHome.createPackage")}
          </ButtonLink>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
              {t("dashboardHome.recentClients")}
            </h2>
            <Link href="/dashboard/clients" className="text-xs text-accent hover:underline">
              {t("common.viewAll")}
            </Link>
          </div>
          <div className="space-y-4">
            {recent.map((client) => (
              <Link
                key={client.id}
                href={`/dashboard/clients/${client.id}`}
                className="flex items-center justify-between rounded-xl px-2 py-2 transition-colors hover:bg-surface-2"
              >
                <div className="flex items-center gap-3">
                  <Avatar src={client.avatar_url} name={client.full_name} />
                  <div>
                    <p className="text-sm font-medium">{client.full_name}</p>
                    <p className="text-xs text-muted">
                      {client.package?.name ?? t("dashboardHome.noPackage")}
                    </p>
                  </div>
                </div>
                <Badge tone={statusTone(client.status)}>{t(`statuses.${client.status}`)}</Badge>
              </Link>
            ))}
            {recent.length === 0 && (
              <p className="text-sm text-muted">{t("dashboardHome.noClientsYet")}</p>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
            {t("dashboardHome.upcomingExpirations")}
          </h2>
          <div className="space-y-4">
            {expiring.map((client) => (
              <Link
                key={client.id}
                href={`/dashboard/clients/${client.id}`}
                className="flex items-center justify-between rounded-xl px-2 py-2 transition-colors hover:bg-surface-2"
              >
                <div className="flex items-center gap-3">
                  <Avatar src={client.avatar_url} name={client.full_name} />
                  <div>
                    <p className="text-sm font-medium">{client.full_name}</p>
                    <p className="text-xs text-muted">
                      {t("dashboardHome.endsOn")} {formatDate(client.subscription_end!, locale)}
                    </p>
                  </div>
                </div>
                <Badge tone="warning">
                  {daysUntil(client.subscription_end!)} {t("common.days")} {t("dashboardHome.daysLeftShort")}
                </Badge>
              </Link>
            ))}
            {expiring.length === 0 && (
              <p className="text-sm text-muted">{t("dashboardHome.noExpirations")}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
