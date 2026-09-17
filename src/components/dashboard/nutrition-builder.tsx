"use client";

import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";
import { Plus, Trash2, Save, Flame } from "lucide-react";
import type { NutritionPlanFull } from "@/types/database";
import { Button } from "@/components/ui/button";
import { saveNutritionPlanAction, type NutritionMealInput } from "@/app/dashboard/nutrition/actions";
import { useLocale } from "@/lib/i18n/context";
import type { TranslationKey } from "@/lib/i18n/translate";

interface BuilderFood {
  id: string;
  name: string;
  quantity: string;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fats_g: number;
}

interface BuilderMeal {
  id: string;
  name: string;
  foods: BuilderFood[];
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function emptyFood(): BuilderFood {
  return { id: uid(), name: "", quantity: "", calories: 0, protein_g: 0, carbs_g: 0, fats_g: 0 };
}

function fromPlan(
  plan: NutritionPlanFull | null,
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string
): { title: string; meals: BuilderMeal[] } {
  if (!plan) {
    return {
      title: t("nutrition.newPlanTitle"),
      meals: [{ id: uid(), name: t("nutrition.defaultMealName"), foods: [emptyFood()] }],
    };
  }
  return {
    title: plan.title,
    meals: plan.meals.map((m) => ({
      id: uid(),
      name: m.name,
      foods: m.foods.map((f) => ({
        id: uid(),
        name: f.name,
        quantity: f.quantity,
        calories: Number(f.calories),
        protein_g: Number(f.protein_g),
        carbs_g: Number(f.carbs_g),
        fats_g: Number(f.fats_g),
      })),
    })),
  };
}

export function NutritionBuilder({
  clientId,
  initialPlan,
}: {
  clientId: string;
  initialPlan: NutritionPlanFull | null;
}) {
  const { t } = useLocale();
  const initial = fromPlan(initialPlan, t);
  const [title, setTitle] = useState(initial.title);
  const [meals, setMeals] = useState<BuilderMeal[]>(initial.meals);
  const [pending, startTransition] = useTransition();

  const totals = useMemo(() => {
    return meals.reduce(
      (acc, meal) => {
        for (const food of meal.foods) {
          acc.calories += Number(food.calories) || 0;
          acc.protein += Number(food.protein_g) || 0;
          acc.carbs += Number(food.carbs_g) || 0;
          acc.fats += Number(food.fats_g) || 0;
        }
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fats: 0 }
    );
  }, [meals]);

  function addMeal() {
    setMeals((m) => [
      ...m,
      { id: uid(), name: t("nutrition.mealLabelDefault", { n: m.length + 1 }), foods: [emptyFood()] },
    ]);
  }

  function removeMeal(mealId: string) {
    setMeals((m) => m.filter((meal) => meal.id !== mealId));
  }

  function updateMealName(mealId: string, name: string) {
    setMeals((m) => m.map((meal) => (meal.id === mealId ? { ...meal, name } : meal)));
  }

  function addFood(mealId: string) {
    setMeals((m) =>
      m.map((meal) =>
        meal.id === mealId ? { ...meal, foods: [...meal.foods, emptyFood()] } : meal
      )
    );
  }

  function removeFood(mealId: string, foodId: string) {
    setMeals((m) =>
      m.map((meal) =>
        meal.id === mealId
          ? { ...meal, foods: meal.foods.filter((f) => f.id !== foodId) }
          : meal
      )
    );
  }

  function updateFood(mealId: string, foodId: string, patch: Partial<BuilderFood>) {
    setMeals((m) =>
      m.map((meal) =>
        meal.id === mealId
          ? {
              ...meal,
              foods: meal.foods.map((f) => (f.id === foodId ? { ...f, ...patch } : f)),
            }
          : meal
      )
    );
  }

  function handleSave() {
    const payload: NutritionMealInput[] = meals.map((meal) => ({
      name: meal.name,
      foods: meal.foods.map((f) => ({
        name: f.name,
        quantity: f.quantity,
        calories: f.calories,
        protein_g: f.protein_g,
        carbs_g: f.carbs_g,
        fats_g: f.fats_g,
      })),
    }));

    startTransition(async () => {
      const result = await saveNutritionPlanAction(clientId, title, payload);
      if (result.success) toast.success(t("nutrition.saved"));
      else toast.error(result.error ?? t("nutrition.saveFailed"));
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="font-display w-full max-w-md rounded-xl border border-border bg-surface px-4 py-3 text-xl outline-none focus:border-accent"
          placeholder={t("nutrition.planTitlePlaceholder")}
        />
        <Button onClick={handleSave} disabled={pending} className="gap-2">
          <Save size={16} /> {pending ? t("common.saving") : t("nutrition.savePlan")}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <TotalCard label={t("nutrition.calories")} value={Math.round(totals.calories)} icon={Flame} />
        <TotalCard label={t("nutrition.protein")} value={Math.round(totals.protein)} />
        <TotalCard label={t("nutrition.carbs")} value={Math.round(totals.carbs)} />
        <TotalCard label={t("nutrition.fats")} value={Math.round(totals.fats)} />
      </div>

      <div className="space-y-6">
        {meals.map((meal) => (
          <div key={meal.id} className="rounded-2xl border border-border bg-surface p-5">
            <div className="flex items-center gap-3">
              <input
                value={meal.name}
                onChange={(e) => updateMealName(meal.id, e.target.value)}
                className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm font-semibold uppercase tracking-wide outline-none focus:border-accent"
              />
              <button
                onClick={() => removeMeal(meal.id)}
                className="rounded-full border border-border p-2 text-muted hover:border-red-500/50 hover:text-red-400"
              >
                <Trash2 size={15} />
              </button>
            </div>

            <div className="mt-4 space-y-2 overflow-x-auto">
              <div className="hidden min-w-[600px] grid-cols-[2fr_1fr_0.8fr_0.8fr_0.8fr_0.8fr_auto] gap-2 px-1 text-[11px] uppercase tracking-wide text-muted sm:grid">
                <span>{t("nutrition.food")}</span>
                <span>{t("nutrition.quantity")}</span>
                <span>{t("nutrition.caloriesShort")}</span>
                <span>{t("nutrition.proteinShort")}</span>
                <span>{t("nutrition.carbsShort")}</span>
                <span>{t("nutrition.fatsShort")}</span>
                <span />
              </div>
              {meal.foods.map((food) => (
                <div
                  key={food.id}
                  className="grid min-w-[600px] grid-cols-[2fr_1fr_0.8fr_0.8fr_0.8fr_0.8fr_auto] items-center gap-2"
                >
                  <input
                    value={food.name}
                    onChange={(e) => updateFood(meal.id, food.id, { name: e.target.value })}
                    placeholder={t("nutrition.foodNamePlaceholder")}
                    className="rounded-lg border border-border bg-background px-2.5 py-2 text-sm outline-none focus:border-accent"
                  />
                  <input
                    value={food.quantity}
                    onChange={(e) => updateFood(meal.id, food.id, { quantity: e.target.value })}
                    placeholder={t("nutrition.quantityPlaceholder")}
                    className="rounded-lg border border-border bg-background px-2.5 py-2 text-sm outline-none focus:border-accent"
                  />
                  <input
                    type="number"
                    value={food.calories}
                    onChange={(e) => updateFood(meal.id, food.id, { calories: Number(e.target.value) })}
                    className="rounded-lg border border-border bg-background px-2 py-2 text-center text-sm outline-none focus:border-accent"
                  />
                  <input
                    type="number"
                    value={food.protein_g}
                    onChange={(e) => updateFood(meal.id, food.id, { protein_g: Number(e.target.value) })}
                    className="rounded-lg border border-border bg-background px-2 py-2 text-center text-sm outline-none focus:border-accent"
                  />
                  <input
                    type="number"
                    value={food.carbs_g}
                    onChange={(e) => updateFood(meal.id, food.id, { carbs_g: Number(e.target.value) })}
                    className="rounded-lg border border-border bg-background px-2 py-2 text-center text-sm outline-none focus:border-accent"
                  />
                  <input
                    type="number"
                    value={food.fats_g}
                    onChange={(e) => updateFood(meal.id, food.id, { fats_g: Number(e.target.value) })}
                    className="rounded-lg border border-border bg-background px-2 py-2 text-center text-sm outline-none focus:border-accent"
                  />
                  <button
                    onClick={() => removeFood(meal.id, food.id)}
                    className="text-muted hover:text-red-400"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => addFood(meal.id)}
              className="mt-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-accent hover:text-accent-2"
            >
              <Plus size={14} /> {t("nutrition.addFood")}
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={addMeal}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-border py-4 text-sm font-semibold uppercase tracking-wide text-muted hover:border-accent hover:text-accent"
      >
        <Plus size={18} /> {t("nutrition.addMeal")}
      </button>
    </div>
  );
}

function TotalCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon?: React.ComponentType<{ size?: number }>;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted">
        {Icon && <Icon size={13} />} {label}
      </div>
      <p className="font-display mt-1 text-2xl">{value}</p>
    </div>
  );
}
