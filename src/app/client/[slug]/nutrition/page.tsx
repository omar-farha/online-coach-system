import { notFound } from "next/navigation";
import { Flame } from "lucide-react";
import { getClientBySlug } from "@/lib/data/clients";
import { getNutritionPlanByClientSlug, nutritionTotals } from "@/lib/data/nutrition";
import { getTranslator } from "@/lib/i18n/server";
import type { TranslationKey } from "@/lib/i18n/translate";

export default async function ClientNutritionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [client, { t }] = await Promise.all([getClientBySlug(slug), getTranslator()]);
  if (!client) notFound();

  const plan = await getNutritionPlanByClientSlug(slug);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
          {t("clientPortal.yourFuel")}
        </p>
        <h1 className="font-display mt-1 text-3xl sm:text-4xl">
          {plan?.title ?? t("clientPortal.nutritionPlanFallback")}
        </h1>
      </div>

      {!plan || plan.meals.length === 0 ? (
        <p className="rounded-2xl border border-border bg-surface p-8 text-center text-sm text-muted">
          {t("clientPortal.noNutritionPlan")}
        </p>
      ) : (
        <>
          <DailyTotals plan={plan} t={t} />

          <div className="space-y-6">
            {plan.meals.map((meal) => {
              const mealCalories = meal.foods.reduce((sum, f) => sum + Number(f.calories), 0);
              return (
                <div key={meal.id} className="overflow-hidden rounded-2xl border border-border bg-surface">
                  <div className="flex items-center justify-between border-b border-border bg-surface-2 px-6 py-4">
                    <h2 className="font-display text-lg tracking-wide">{meal.name}</h2>
                    <span className="flex items-center gap-1.5 text-sm text-accent">
                      <Flame size={15} /> {Math.round(mealCalories)} {t("nutrition.kcalUnit")}
                    </span>
                  </div>
                  <div className="divide-y divide-border">
                    {meal.foods.map((food) => (
                      <div
                        key={food.id}
                        className="flex flex-wrap items-center justify-between gap-2 px-6 py-4"
                      >
                        <div>
                          <p className="font-medium">{food.name}</p>
                          <p className="text-xs text-muted">{food.quantity}</p>
                        </div>
                        <div className="flex gap-4 text-xs text-muted">
                          <span>{food.calories} {t("nutrition.kcalUnit")}</span>
                          <span>{food.protein_g}g {t("nutrition.pAbbr")}</span>
                          <span>{food.carbs_g}g {t("nutrition.cAbbr")}</span>
                          <span>{food.fats_g}g {t("nutrition.fAbbr")}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function DailyTotals({
  plan,
  t,
}: {
  plan: NonNullable<Awaited<ReturnType<typeof getNutritionPlanByClientSlug>>>;
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
}) {
  const totals = nutritionTotals(plan);
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <TotalTile label={t("nutrition.calories")} value={Math.round(totals.calories)} />
      <TotalTile label={t("nutrition.protein")} value={Math.round(totals.protein)} />
      <TotalTile label={t("nutrition.carbs")} value={Math.round(totals.carbs)} />
      <TotalTile label={t("nutrition.fats")} value={Math.round(totals.fats)} />
    </div>
  );
}

function TotalTile({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 text-center">
      <p className="font-display text-3xl text-accent">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-wide text-muted">{label}</p>
    </div>
  );
}
