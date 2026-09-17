import { notFound } from "next/navigation";
import { getClientBySlug } from "@/lib/data/clients";
import { getProgressByClientSlug } from "@/lib/data/progress";
import { ProgressChart } from "@/components/dashboard/progress-chart";
import { formatDate } from "@/lib/utils";
import { getTranslator } from "@/lib/i18n/server";

export default async function ClientProgressPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [client, { t, locale }] = await Promise.all([getClientBySlug(slug), getTranslator()]);
  if (!client) notFound();

  const records = await getProgressByClientSlug(slug);
  const sorted = [...records].sort(
    (a, b) => new Date(b.recorded_at).getTime() - new Date(a.recorded_at).getTime()
  );
  const latest = sorted[0];
  const first = sorted[sorted.length - 1];
  const weightChange =
    latest?.weight_kg && first?.weight_kg ? latest.weight_kg - first.weight_kg : null;

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
          {t("clientPortal.yourJourney")}
        </p>
        <h1 className="font-display mt-1 text-3xl sm:text-4xl">{t("clientPortal.progressTitle")}</h1>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <StatTile
          label={t("clientPortal.currentWeight")}
          value={latest?.weight_kg ? `${latest.weight_kg} ${t("common.kgUnit")}` : "—"}
        />
        <StatTile
          label={t("clientPortal.totalChange")}
          value={
            weightChange !== null
              ? `${weightChange > 0 ? "+" : ""}${weightChange.toFixed(1)} ${t("common.kgUnit")}`
              : "—"
          }
        />
        <StatTile label={t("clientPortal.entriesLogged")} value={String(records.length)} />
      </div>

      <div className="rounded-2xl border border-border bg-surface p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
          {t("progressPage.weightOverTime")}
        </h2>
        <ProgressChart records={records} />
      </div>

      <div className="rounded-2xl border border-border bg-surface p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
          {t("progressPage.history")}
        </h2>
        <div className="space-y-3">
          {sorted.map((r) => (
            <div
              key={r.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border px-4 py-3 text-sm"
            >
              <span className="text-muted">{formatDate(r.recorded_at, locale)}</span>
              <span>{r.weight_kg ? `${r.weight_kg} ${t("common.kgUnit")}` : "—"}</span>
              {r.notes && <span className="text-xs text-muted">{r.notes}</span>}
            </div>
          ))}
          {sorted.length === 0 && (
            <p className="py-8 text-center text-sm text-muted">{t("progressPage.noRecords")}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 text-center">
      <p className="font-display text-2xl text-accent">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-wide text-muted">{label}</p>
    </div>
  );
}
