"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Dumbbell, Utensils, CalendarDays, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useLocale } from "@/lib/i18n/context";

export function ClientPortalNav({ slug }: { slug: string }) {
  const pathname = usePathname();
  const base = `/client/${slug}`;
  const { t } = useLocale();

  const items = [
    { href: base, label: t("clientPortal.home"), icon: Home },
    { href: `${base}/workout`, label: t("clientPortal.workout"), icon: Dumbbell },
    { href: `${base}/nutrition`, label: t("clientPortal.nutrition"), icon: Utensils },
    { href: `${base}/schedule`, label: t("clientPortal.schedule"), icon: CalendarDays },
    { href: `${base}/progress`, label: t("clientPortal.progress"), icon: TrendingUp },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 hidden border-b border-border bg-background/90 backdrop-blur lg:block">
        <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-8">
          <span className="font-display text-xl">
            FORGE<span className="text-accent">.</span>
          </span>
          <nav className="flex items-center gap-2">
            {items.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-accent text-accent-foreground"
                      : "text-muted hover:bg-surface hover:text-foreground"
                  )}
                >
                  <item.icon size={16} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <LanguageSwitcher />
        </div>
      </header>

      <div className="flex justify-end px-5 pt-4 lg:hidden">
        <LanguageSwitcher />
      </div>

      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 backdrop-blur lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <div className="flex items-center justify-around py-2">
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-xl px-3 py-1.5 text-[10px] font-medium uppercase tracking-wide transition-colors",
                  active ? "text-accent" : "text-muted"
                )}
              >
                <item.icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
