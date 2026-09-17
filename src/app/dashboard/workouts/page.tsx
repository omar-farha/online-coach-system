import Link from "next/link";
import { Dumbbell } from "lucide-react";
import { getClients } from "@/lib/data/clients";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getTranslator } from "@/lib/i18n/server";

export default async function WorkoutPlansPage() {
  const [clients, { t }] = await Promise.all([getClients(), getTranslator()]);

  return (
    <div>
      <p className="mb-6 max-w-2xl text-sm text-muted">{t("workouts.pageHint")}</p>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {clients.map((client) => (
          <Link
            key={client.id}
            href={`/dashboard/workouts/${client.id}`}
            className="flex items-center justify-between rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent/40"
          >
            <div className="flex items-center gap-3">
              <Avatar src={client.avatar_url} name={client.full_name} size={44} />
              <div>
                <p className="text-sm font-semibold">{client.full_name}</p>
                <p className="text-xs text-muted">{client.goal ?? t("clients.noGoalSet")}</p>
              </div>
            </div>
            <Badge tone="accent">
              <Dumbbell size={12} /> {t("clients.planBadge")}
            </Badge>
          </Link>
        ))}

        {clients.length === 0 && (
          <p className="col-span-full py-12 text-center text-sm text-muted">
            {t("workouts.noClients")}
          </p>
        )}
      </div>
    </div>
  );
}
