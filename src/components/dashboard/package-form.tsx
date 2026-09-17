"use client";

import { useActionState } from "react";
import type { Package } from "@/types/database";
import { Button } from "@/components/ui/button";
import type { PackageFormState } from "@/app/dashboard/packages/actions";
import { useLocale } from "@/lib/i18n/context";

const inputClass =
  "w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-accent";
const labelClass = "mb-2 block text-xs uppercase tracking-wide text-muted";

export function PackageForm({
  action,
  initial,
  submitLabel,
}: {
  action: (state: PackageFormState, formData: FormData) => Promise<PackageFormState>;
  initial?: Package;
  submitLabel?: string;
}) {
  const [state, formAction, pending] = useActionState(action, { error: null });
  const { t } = useLocale();

  return (
    <form action={formAction} className="max-w-xl space-y-5">
      <div>
        <label className={labelClass}>{t("packagesAdmin.name")}</label>
        <input
          name="name"
          required
          defaultValue={initial?.name}
          className={inputClass}
          placeholder={t("packagesAdmin.namePlaceholder")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>{t("packagesAdmin.price")}</label>
          <input
            name="price"
            type="number"
            step="0.01"
            required
            defaultValue={initial?.price}
            className={inputClass}
            placeholder={t("packagesAdmin.pricePlaceholder")}
          />
        </div>
        <div>
          <label className={labelClass}>{t("packagesAdmin.durationLabel")}</label>
          <input
            name="duration_label"
            required
            defaultValue={initial?.duration_label}
            className={inputClass}
            placeholder={t("packagesAdmin.durationLabelPlaceholder")}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>{t("packagesAdmin.durationDays")}</label>
        <input
          name="duration_days"
          type="number"
          required
          defaultValue={initial?.duration_days ?? 30}
          className={inputClass}
          placeholder={t("packagesAdmin.durationDaysPlaceholder")}
        />
      </div>

      <div>
        <label className={labelClass}>{t("packagesAdmin.description")}</label>
        <textarea
          name="description"
          rows={2}
          defaultValue={initial?.description ?? ""}
          className={inputClass}
          placeholder={t("packagesAdmin.descriptionPlaceholder")}
        />
      </div>

      <div>
        <label className={labelClass}>{t("packagesAdmin.features")}</label>
        <textarea
          name="features"
          rows={5}
          defaultValue={initial?.features?.join("\n") ?? ""}
          className={inputClass}
          placeholder={t("packagesAdmin.featuresPlaceholder")}
        />
      </div>

      {state?.error && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {state.error}
        </p>
      )}

      <Button type="submit" disabled={pending}>
        {pending ? t("common.saving") : submitLabel ?? t("common.save")}
      </Button>
    </form>
  );
}
