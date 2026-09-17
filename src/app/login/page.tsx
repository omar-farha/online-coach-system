"use client";

import { useActionState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Dumbbell } from "lucide-react";
import { signIn, type SignInState } from "./actions";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { STOCK_IMAGES } from "@/lib/images";
import { useLocale } from "@/lib/i18n/context";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState<SignInState, FormData>(signIn, {
    error: null,
  });
  const { t } = useLocale();

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col justify-center px-8 py-16 sm:px-16">
        <div className="mb-12 flex items-center justify-between">
          <Link href="/" className="font-display text-2xl">
            FORGE<span className="text-accent">.</span>
          </Link>
          <LanguageSwitcher />
        </div>

        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
            <Dumbbell size={22} />
          </div>
          <h1 className="font-display text-3xl">{t("login.title")}</h1>
          <p className="mt-2 text-sm text-muted">{t("login.subtitle")}</p>

          <form action={formAction} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-xs uppercase tracking-wide text-muted">
                {t("login.emailLabel")}
              </label>
              <input
                name="email"
                type="email"
                required
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                placeholder="coach@forgecoaching.com"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-wide text-muted">
                {t("login.passwordLabel")}
              </label>
              <input
                name="password"
                type="password"
                required
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                placeholder="••••••••"
              />
            </div>

            {state?.error && (
              <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {state.error}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? t("login.submitting") : t("login.submit")}
            </Button>
          </form>
        </div>
      </div>

      <div className="relative hidden lg:block">
        <Image
          src={STOCK_IMAGES.gymInterior}
          alt="Premium gym interior"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
      </div>
    </div>
  );
}
