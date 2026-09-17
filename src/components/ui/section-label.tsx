import { cn } from "@/lib/utils";

export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="h-[2px] w-8 bg-accent" />
      <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
        {children}
      </span>
    </div>
  );
}
