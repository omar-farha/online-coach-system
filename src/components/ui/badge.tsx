import { cn } from "@/lib/utils";

type Tone = "accent" | "success" | "warning" | "danger" | "neutral";

const toneClasses: Record<Tone, string> = {
  accent: "bg-accent/15 text-accent border-accent/30",
  success: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  warning: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  danger: "bg-red-500/15 text-red-400 border-red-500/30",
  neutral: "bg-surface-2 text-muted border-border",
};

export function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

export function statusTone(status: string): Tone {
  switch (status) {
    case "active":
      return "success";
    case "expired":
      return "danger";
    case "paused":
      return "warning";
    default:
      return "neutral";
  }
}
