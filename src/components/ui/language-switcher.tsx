"use client";

import { useLocale } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useLocale();

  return (
    <div
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border border-border bg-surface p-1 text-xs font-semibold",
        className
      )}
    >
      <button
        onClick={() => setLocale("ar")}
        className={cn(
          "rounded-full px-3 py-1.5 transition-colors",
          locale === "ar" ? "bg-accent text-accent-foreground" : "text-muted hover:text-foreground"
        )}
        aria-current={locale === "ar"}
      >
        العربي
      </button>
      <button
        onClick={() => setLocale("en")}
        className={cn(
          "rounded-full px-3 py-1.5 transition-colors",
          locale === "en" ? "bg-accent text-accent-foreground" : "text-muted hover:text-foreground"
        )}
        aria-current={locale === "en"}
      >
        English
      </button>
    </div>
  );
}
