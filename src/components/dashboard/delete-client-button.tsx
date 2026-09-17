"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteClientAction } from "@/app/dashboard/clients/actions";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n/context";

export function DeleteClientButton({
  clientId,
  clientName,
}: {
  clientId: string;
  clientName: string;
}) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const { t } = useLocale();

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
        className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-red-500/50 hover:text-red-400"
      >
        <Trash2 size={13} /> {t("common.delete")}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-sm rounded-2xl border border-border bg-surface p-6">
            <h3 className="text-lg font-semibold">{t("clients.deleteTitle", { name: clientName })}</h3>
            <p className="mt-2 text-sm text-muted">{t("clients.deleteBody")}</p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="rounded-full border border-border px-4 py-2 text-sm text-muted hover:text-foreground"
              >
                {t("common.cancel")}
              </button>
              <Button
                variant="primary"
                className="bg-red-500 text-white hover:bg-red-600"
                disabled={pending}
                onClick={() =>
                  startTransition(() => {
                    deleteClientAction(clientId);
                  })
                }
              >
                {pending ? t("clients.deleting") : t("common.delete")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
