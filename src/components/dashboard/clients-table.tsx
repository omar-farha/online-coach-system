"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Pencil, ExternalLink } from "lucide-react";
import type { ClientWithPackage } from "@/types/database";
import { Avatar } from "@/components/ui/avatar";
import { Badge, statusTone } from "@/components/ui/badge";
import { CopyLinkButton } from "./copy-link-button";
import { formatDate } from "@/lib/utils";
import { DeleteClientButton } from "./delete-client-button";
import { useLocale } from "@/lib/i18n/context";

const STATUS_FILTERS = ["all", "active", "expired", "paused"] as const;

export function ClientsTable({ clients }: { clients: ClientWithPackage[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<(typeof STATUS_FILTERS)[number]>("all");
  const { t, locale } = useLocale();

  const FILTER_LABELS: Record<(typeof STATUS_FILTERS)[number], string> = {
    all: t("clients.filterAll"),
    active: t("clients.filterActive"),
    expired: t("clients.filterExpired"),
    paused: t("clients.filterPaused"),
  };

  const filtered = useMemo(() => {
    return clients.filter((c) => {
      if (status !== "all" && c.status !== status) return false;
      if (
        query &&
        !c.full_name.toLowerCase().includes(query.toLowerCase()) &&
        !c.phone.includes(query)
      )
        return false;
      return true;
    });
  }, [clients, query, status]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search
            size={16}
            className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("clients.searchPlaceholder")}
            className="w-full rounded-full border border-border bg-surface py-2.5 ps-10 pe-4 text-sm outline-none focus:border-accent"
          />
        </div>
        <div className="flex gap-2">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors ${
                status === s
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-muted hover:text-foreground"
              }`}
            >
              {FILTER_LABELS[s]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((client) => (
          <div
            key={client.id}
            className="rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent/40"
          >
            <div className="flex items-start justify-between">
              <Link href={`/dashboard/clients/${client.id}`} className="flex items-center gap-3">
                <Avatar src={client.avatar_url} name={client.full_name} size={44} />
                <div>
                  <p className="text-sm font-semibold">{client.full_name}</p>
                  <p className="text-xs text-muted">{client.phone}</p>
                </div>
              </Link>
              <Badge tone={statusTone(client.status)}>{t(`statuses.${client.status}`)}</Badge>
            </div>

            <div className="mt-4 space-y-1.5 text-xs text-muted">
              <p>{t("clients.package")}: {client.package?.name ?? "—"}</p>
              {client.subscription_end && (
                <p>{t("clients.ends")}: {formatDate(client.subscription_end, locale)}</p>
              )}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
              <CopyLinkButton slug={client.slug} />
              <Link
                href={`/client/${client.slug}`}
                target="_blank"
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <ExternalLink size={13} /> {t("clients.open")}
              </Link>
              <Link
                href={`/dashboard/clients/${client.id}/edit`}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <Pencil size={13} /> {t("common.edit")}
              </Link>
              <DeleteClientButton clientId={client.id} clientName={client.full_name} />
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="col-span-full py-12 text-center text-sm text-muted">
            {t("clients.noMatch")}
          </p>
        )}
      </div>
    </div>
  );
}
