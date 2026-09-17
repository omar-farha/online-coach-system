"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addProgressRecordAction, type ProgressFormState } from "@/app/dashboard/progress/actions";
import { useLocale } from "@/lib/i18n/context";

const inputClass =
  "w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm outline-none transition-colors focus:border-accent";
const labelClass = "mb-1.5 block text-xs uppercase tracking-wide text-muted";

export function ProgressLogForm({ clientId }: { clientId: string }) {
  const boundAction = addProgressRecordAction.bind(null, clientId);
  const [state, formAction, pending] = useActionState<ProgressFormState, FormData>(
    boundAction,
    { error: null }
  );
  const { t } = useLocale();

  useEffect(() => {
    if (state.success) toast.success(t("progressPage.logged"));
  }, [state.success, t]);

  return (
    <form action={formAction} className="space-y-4 rounded-2xl border border-border bg-surface p-5">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
        {t("progressPage.logProgress")}
      </h3>

      <div>
        <label className={labelClass}>{t("progressPage.date")}</label>
        <input
          name="recorded_at"
          type="date"
          required
          defaultValue={new Date().toISOString().slice(0, 10)}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field name="weight_kg" label={t("progressPage.weightKg")} />
        <Field name="chest_cm" label={t("progressPage.chestCm")} />
        <Field name="waist_cm" label={t("progressPage.waistCm")} />
        <Field name="hips_cm" label={t("progressPage.hipsCm")} />
        <Field name="arms_cm" label={t("progressPage.armsCm")} />
        <Field name="thighs_cm" label={t("progressPage.thighsCm")} />
      </div>

      <div>
        <label className={labelClass}>{t("progressPage.notes")}</label>
        <textarea name="notes" rows={2} className={inputClass} placeholder={t("progressPage.notesPlaceholder")} />
      </div>

      {state?.error && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-400">
          {state.error}
        </p>
      )}

      <Button type="submit" size="sm" disabled={pending} className="w-full gap-2">
        <Plus size={15} /> {pending ? t("common.saving") : t("progressPage.addRecord")}
      </Button>
    </form>
  );
}

function Field({ name, label }: { name: string; label: string }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <input name={name} type="number" step="0.1" className={inputClass} />
    </div>
  );
}
