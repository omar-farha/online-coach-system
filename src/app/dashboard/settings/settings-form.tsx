"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import type { CoachProfile } from "@/types/database";
import { Button } from "@/components/ui/button";
import { updateCoachProfileAction, type ProfileFormState } from "./actions";
import { useLocale } from "@/lib/i18n/context";

const inputClass =
  "w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-accent";
const labelClass = "mb-2 block text-xs uppercase tracking-wide text-muted";

export function SettingsForm({ profile }: { profile: CoachProfile }) {
  const [state, formAction, pending] = useActionState<ProfileFormState, FormData>(
    updateCoachProfileAction,
    { error: null }
  );
  const { t } = useLocale();

  useEffect(() => {
    if (state.success) toast.success(t("settingsPage.saved"));
  }, [state.success, t]);

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      <div>
        <label className={labelClass}>{t("settingsPage.coachName")}</label>
        <input name="full_name" required defaultValue={profile.full_name} className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>{t("settingsPage.websiteHeadline")}</label>
        <input
          name="website_headline"
          defaultValue={profile.website_headline ?? ""}
          className={inputClass}
          placeholder={t("settingsPage.websiteHeadlinePlaceholder")}
        />
      </div>

      <div>
        <label className={labelClass}>{t("settingsPage.bio")}</label>
        <textarea name="bio" rows={4} defaultValue={profile.bio ?? ""} className={inputClass} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>{t("settingsPage.phone")}</label>
          <input name="phone" defaultValue={profile.phone ?? ""} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{t("settingsPage.email")}</label>
          <input name="email" type="email" defaultValue={profile.email ?? ""} className={inputClass} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>{t("settingsPage.instagram")}</label>
          <input name="instagram_url" defaultValue={profile.instagram_url ?? ""} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{t("settingsPage.tiktok")}</label>
          <input name="tiktok_url" defaultValue={profile.tiktok_url ?? ""} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{t("settingsPage.youtube")}</label>
          <input name="youtube_url" defaultValue={profile.youtube_url ?? ""} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{t("settingsPage.facebook")}</label>
          <input name="facebook_url" defaultValue={profile.facebook_url ?? ""} className={inputClass} />
        </div>
      </div>

      {state?.error && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {state.error}
        </p>
      )}

      <Button type="submit" disabled={pending}>
        {pending ? t("common.saving") : t("settingsPage.saveSettings")}
      </Button>
    </form>
  );
}
