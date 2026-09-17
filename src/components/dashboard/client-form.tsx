"use client";

import { useActionState } from "react";
import type { Client, Package } from "@/types/database";
import { Button } from "@/components/ui/button";
import type { ClientFormState } from "@/app/dashboard/clients/actions";
import { useLocale } from "@/lib/i18n/context";

const inputClass =
  "w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-accent";
const labelClass = "mb-2 block text-xs uppercase tracking-wide text-muted";

export function ClientForm({
  action,
  packages,
  initial,
  submitLabel,
}: {
  action: (state: ClientFormState, formData: FormData) => Promise<ClientFormState>;
  packages: Package[];
  initial?: Client;
  submitLabel?: string;
}) {
  const [state, formAction, pending] = useActionState(action, { error: null });
  const { t } = useLocale();

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelClass}>{t("clients.fullName")}</label>
          <input
            name="full_name"
            required
            defaultValue={initial?.full_name}
            className={inputClass}
            placeholder={t("clients.fullNamePlaceholder")}
          />
        </div>

        <div>
          <label className={labelClass}>{t("clients.phone")}</label>
          <input
            name="phone"
            required
            defaultValue={initial?.phone}
            className={inputClass}
            placeholder={t("clients.phonePlaceholder")}
          />
        </div>

        <div>
          <label className={labelClass}>{t("clients.emailOptional")}</label>
          <input
            name="email"
            type="email"
            defaultValue={initial?.email ?? ""}
            className={inputClass}
            placeholder={t("clients.emailPlaceholder")}
          />
        </div>

        <div>
          <label className={labelClass}>{t("clients.age")}</label>
          <input
            name="age"
            type="number"
            defaultValue={initial?.age ?? ""}
            className={inputClass}
            placeholder="28"
          />
        </div>

        <div>
          <label className={labelClass}>{t("clients.height")}</label>
          <input
            name="height_cm"
            type="number"
            step="0.1"
            defaultValue={initial?.height_cm ?? ""}
            className={inputClass}
            placeholder="178"
          />
        </div>

        <div>
          <label className={labelClass}>{t("clients.weight")}</label>
          <input
            name="weight_kg"
            type="number"
            step="0.1"
            defaultValue={initial?.weight_kg ?? ""}
            className={inputClass}
            placeholder="82"
          />
        </div>

        <div>
          <label className={labelClass}>{t("clients.goal")}</label>
          <input
            name="goal"
            defaultValue={initial?.goal ?? ""}
            className={inputClass}
            placeholder={t("clients.goalPlaceholder")}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass}>{t("clients.package_")}</label>
          <select
            name="package_id"
            defaultValue={initial?.package_id ?? ""}
            className={inputClass}
          >
            <option value="">{t("clients.noPackage")}</option>
            {packages.map((pkg) => (
              <option key={pkg.id} value={pkg.id}>
                {pkg.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>{t("clients.subscriptionStart")}</label>
          <input
            name="subscription_start"
            type="date"
            defaultValue={initial?.subscription_start ?? ""}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>{t("clients.subscriptionEnd")}</label>
          <input
            name="subscription_end"
            type="date"
            defaultValue={initial?.subscription_end ?? ""}
            className={inputClass}
          />
        </div>
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
