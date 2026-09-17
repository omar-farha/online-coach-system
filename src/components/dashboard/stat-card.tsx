import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  icon: Icon,
  tone = "default",
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  tone?: "default" | "accent" | "warning";
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            {label}
          </p>
          <p className="font-display mt-2 text-4xl">{value}</p>
        </div>
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl",
            tone === "accent" && "bg-accent/15 text-accent",
            tone === "warning" && "bg-amber-500/15 text-amber-400",
            tone === "default" && "bg-surface-2 text-foreground"
          )}
        >
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}
