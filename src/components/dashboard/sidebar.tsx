"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Dumbbell,
  Utensils,
  Package,
  TrendingUp,
  Settings,
  Dumbbell as Logo,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n/context";

export function Sidebar() {
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

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-e border-border bg-surface lg:flex">
      <div className="flex h-20 items-center gap-2 border-b border-border px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground">
          <Logo size={18} />
        </div>
        <span className="font-display text-xl">FORGE</span>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {NAV.map((item) => {
          const active =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
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
    </aside>
  );
}
