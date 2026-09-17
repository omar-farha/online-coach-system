import { notFound } from "next/navigation";
import Image from "next/image";
import { Clock, Repeat, Layers } from "lucide-react";
import { getWorkoutPlanByClientSlug } from "@/lib/data/workouts";
import { getClientBySlug } from "@/lib/data/clients";
import { getTranslator } from "@/lib/i18n/server";

export default async function ClientWorkoutPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [client, { t }] = await Promise.all([getClientBySlug(slug), getTranslator()]);
  if (!client) notFound();

  const plan = await getWorkoutPlanByClientSlug(slug);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
          {t("clientPortal.yourTraining")}
        </p>
        <h1 className="font-display mt-1 text-3xl sm:text-4xl">
          {plan?.title ?? t("clientPortal.workoutPlanFallback")}
        </h1>
      </div>

      {!plan || plan.days.length === 0 ? (
        <p className="rounded-2xl border border-border bg-surface p-8 text-center text-sm text-muted">
          {t("clientPortal.noWorkoutPlan")}
        </p>
      ) : (
        <div className="space-y-10">
          {plan.days.map((day) => (
            <div key={day.id}>
              <div className="mb-4 flex items-baseline gap-3">
                <span className="font-display text-2xl text-accent">{day.day_label}</span>
                <h2 className="text-lg font-semibold">{day.title}</h2>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {day.exercises.map((exercise, i) => (
                  <div
                    key={exercise.id}
                    className="overflow-hidden rounded-2xl border border-border bg-surface"
                  >
                    <div className="relative aspect-video bg-surface-2">
                      {exercise.gif_url && (
                        <Image
                          src={exercise.gif_url}
                          alt={exercise.name}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      )}
                      <span className="absolute start-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                        {i + 1}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold">{exercise.name}</h3>
                      <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted">
                        <span className="flex items-center gap-1.5">
                          <Layers size={14} className="text-accent" /> {exercise.sets} {t("clientPortal.sets")}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Repeat size={14} className="text-accent" /> {exercise.reps} {t("clientPortal.reps")}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={14} className="text-accent" /> {exercise.rest_seconds}
                          {t("common.secUnit")} {t("clientPortal.restSec")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
