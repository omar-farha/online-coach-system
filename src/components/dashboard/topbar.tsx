"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LogOut } from "lucide-react";
import {
  LayoutDashboard,
  Users,
  Dumbbell,
  Utensils,
  Package,
  TrendingUp,
  Settings,
} from "lucide-react";
import { signOut } from "@/app/login/actions";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useLocale } from "@/lib/i18n/context";

export function Topbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLocale();

  const NAV = [
    { href: "/dashboard", label: t("dashboardNav.dashboard"), icon: LayoutDashboard },
    { href: "/dashboard/clients", label: t("dashboardNav.clients"), icon: Users },
    { href: "/dashboard/workouts", label: t("dashboardNav.workoutPlans"), icon: Dumbbell },
    { href: "/dashboard/nutrition", label: t("dashboardNav.nutritionPlans"), icon: Utensils },
    { href: "/dashboard/packages", label: t("dashboardNav.packages"), icon: Package },
    { href: "/dashboard/progress", label: t("dashboardNav.progress"), icon: TrendingUp },
    { href: "/dashboard/settings", label: t("dashboardNav.settings"), icon: Settings },
  ];

  const TITLES: Record<string, string> = {
    "/dashboard": t("dashboardNav.dashboard"),
    "/dashboard/clients": t("dashboardNav.clients"),
    "/dashboard/workouts": t("dashboardNav.workoutPlans"),
    "/dashboard/nutrition": t("dashboardNav.nutritionPlans"),
    "/dashboard/packages": t("dashboardNav.packages"),
    "/dashboard/progress": t("dashboardNav.progress"),
    "/dashboard/settings": t("dashboardNav.settings"),
  };

  function pageTitle(path: string) {
    if (TITLES[path]) return TITLES[path];
    const match = Object.keys(TITLES).find(
      (key) => key !== "/dashboard" && path.startsWith(key)
    );
    return match ? TITLES[match] : TITLES["/dashboard"];
  }

  return (
    <>
      <header className="flex h-20 items-center justify-between border-b border-border bg-background px-6">
        <div className="flex items-center gap-3">
          <button
            className="text-foreground lg:hidden"
            onClick={() => setOpen(true)}
            aria-label={t("common.openMenu")}
          >
            <Menu size={24} />
          </button>
          <h1 className="font-display text-xl sm:text-2xl">{pageTitle(pathname)}</h1>
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitcher className="hidden sm:flex" />
          <form action={signOut}>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <LogOut size={14} /> {t("common.signOut")}
            </button>
          </form>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 start-0 w-72 bg-surface p-4">
            <div className="mb-6 flex items-center justify-between px-2">
              <span className="font-display text-xl">FORGE</span>
              <button onClick={() => setOpen(false)} aria-label={t("common.closeMenu")}>
                <X size={22} />
              </button>
            </div>
            <nav className="space-y-1">
              {NAV.map((item) => {
                const active =
                  item.href === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium",
                      active
                        ? "bg-accent text-accent-foreground"
                        : "text-muted hover:bg-surface-2 hover:text-foreground"
                    )}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-4 px-2">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
