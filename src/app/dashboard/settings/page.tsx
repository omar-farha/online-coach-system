import { getCoachProfile } from "@/lib/data/coach";
import { SettingsForm } from "./settings-form";
import { getTranslator } from "@/lib/i18n/server";

export default async function SettingsPage() {
  const [profile, { t }] = await Promise.all([getCoachProfile(), getTranslator()]);

  return (
    <div>
      <p className="mb-6 max-w-2xl text-sm text-muted">{t("settingsPage.hint")}</p>
      <SettingsForm profile={profile} />
    </div>
  );
}
