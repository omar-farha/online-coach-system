import { notFound } from "next/navigation";
import { getClientById } from "@/lib/data/clients";
import { getProgressByClientId } from "@/lib/data/progress";
import { ProgressChart } from "@/components/dashboard/progress-chart";
import { ProgressLogForm } from "@/components/dashboard/progress-log-form";
import { formatDate } from "@/lib/utils";
import { getTranslator } from "@/lib/i18n/server";

export default async function ClientProgressPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = await params;
  const [client, { t, locale }] = await Promise.all([getClientById(clientId), getTranslator()]);
  if (!client) notFound();

  const records = await getProgressByClientId(clientId);
  const sorted = [...records].sort(
    (a, b) => new Date(b.recorded_at).getTime() - new Date(a.recorded_at).getTime()
  );

  return (
    <div>
      <p className="mb-6 text-sm text-muted">
        {t("progressPage.forClient")} <span className="text-foreground">{client.full_name}</span>
      </p>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-surface p-5">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
              {t("progressPage.weightOverTime")}
            </h3>
            <ProgressChart records={records} />
          </div>

          <div className="rounded-2xl border border-border bg-surface p-5">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
              {t("progressPage.history")}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-start text-sm">
                <thead>
                  <tr className="text-xs uppercase tracking-wide text-muted">
                    <th className="pb-3 pe-4">{t("progressPage.date")}</th>
                    <th className="pb-3 pe-4">{t("progressPage.weight")}</th>
                    <th className="pb-3 pe-4">{t("progressPage.chest")}</th>
                    <th className="pb-3 pe-4">{t("progressPage.waist")}</th>
                    <th className="pb-3 pe-4">{t("progressPage.hips")}</th>
                    <th className="pb-3">{t("progressPage.notes")}</th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((r) => (
                    <tr key={r.id} className="border-t border-border">
                      <td className="py-3 pe-4">{formatDate(r.recorded_at, locale)}</td>
                      <td className="py-3 pe-4">{r.weight_kg ?? "—"}</td>
                      <td className="py-3 pe-4">{r.chest_cm ?? "—"}</td>
                      <td className="py-3 pe-4">{r.waist_cm ?? "—"}</td>
                      <td className="py-3 pe-4">{r.hips_cm ?? "—"}</td>
                      <td className="py-3 text-muted">{r.notes ?? "—"}</td>
                    </tr>
                  ))}
                  {sorted.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-muted">
                        {t("progressPage.noRecords")}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <ProgressLogForm clientId={clientId} />
      </div>
    </div>
  );
}
