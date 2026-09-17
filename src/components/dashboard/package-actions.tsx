"use client";

import { useState, useTransition } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { deletePackageAction, togglePackageActiveAction } from "@/app/dashboard/packages/actions";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n/context";

export function PackageActions({
  packageId,
  packageName,
  isActive,
}: {
  packageId: string;
  packageName: string;
  isActive: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const { t } = useLocale();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() =>
          startTransition(() => togglePackageActiveAction(packageId, !isActive))
        }
        disabled={pending}
        className={`rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors ${
          isActive
            ? "border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
            : "border-border text-muted hover:text-foreground"
        }`}
      >
        {isActive ? t("common.active") : t("common.inactive")}
      </button>
      <Link
        href={`/dashboard/packages/${packageId}/edit`}
        className="rounded-full border border-border p-2 text-muted hover:border-accent hover:text-accent"
      >
        <Pencil size={14} />
      </Link>
      <button
        onClick={() => setOpen(true)}
        className="rounded-full border border-border p-2 text-muted hover:border-red-500/50 hover:text-red-400"
      >
        <Trash2 size={14} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-sm rounded-2xl border border-border bg-surface p-6">
            <h3 className="text-lg font-semibold">
              {t("packagesAdmin.deleteTitle", { name: packageName })}
            </h3>
            <p className="mt-2 text-sm text-muted">{t("packagesAdmin.deleteBody")}</p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="rounded-full border border-border px-4 py-2 text-sm text-muted hover:text-foreground"
              >
                {t("common.cancel")}
              </button>
              <Button
                className="bg-red-500 text-white hover:bg-red-600"
                disabled={pending}
                onClick={() => startTransition(() => deletePackageAction(packageId))}
              >
                {pending ? t("clients.deleting") : t("common.delete")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
