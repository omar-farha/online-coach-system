import { notFound } from "next/navigation";
import { Dumbbell, Moon } from "lucide-react";
import { getClientBySlug } from "@/lib/data/clients";
import { getWorkoutPlanByClientSlug } from "@/lib/data/workouts";
import { getTranslator } from "@/lib/i18n/server";

const WEEK_KEYS = [
  "weekdays.monday",
  "weekdays.tuesday",
  "weekdays.wednesday",
  "weekdays.thursday",
  "weekdays.friday",
  "weekdays.saturday",
  "weekdays.sunday",
] as const;

export default async function ClientSchedulePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [client, { t }] = await Promise.all([getClientBySlug(slug), getTranslator()]);
  if (!client) notFound();

  const plan = await getWorkoutPlanByClientSlug(slug);
  const days = plan?.days ?? [];

  const weekSlots = WEEK_KEYS.map((weekdayKey, i) => ({
    weekday: t(weekdayKey),
    day: days[i] ?? null,
  }));

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
          {t("clientPortal.thisWeek")}
        </p>
        <h1 className="font-display mt-1 text-3xl sm:text-4xl">{t("clientPortal.trainingSchedule")}</h1>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
        {weekSlots.map((slot) => (
          <div
            key={slot.weekday}
            className={`rounded-2xl border p-5 ${
              slot.day ? "border-accent/30 bg-accent/5" : "border-border bg-surface"
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              {slot.weekday}
            </p>
            {slot.day ? (
              <>
                <div className="mt-3 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent">
                  <Dumbbell size={16} />
                </div>
                <p className="mt-3 text-sm font-semibold">{slot.day.title || slot.day.day_label}</p>
                <p className="text-xs text-muted">{slot.day.exercises.length} {t("clientPortal.exercisesCount")}</p>
              </>
            ) : (
              <>
                <div className="mt-3 flex h-9 w-9 items-center justify-center rounded-lg bg-surface-2 text-muted">
                  <Moon size={16} />
                </div>
                <p className="mt-3 text-sm font-semibold text-muted">{t("clientPortal.restDay")}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
