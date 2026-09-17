"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getTranslator } from "@/lib/i18n/server";

export interface NutritionFoodInput {
  name: string;
  quantity: string;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fats_g: number;
}

export interface NutritionMealInput {
  name: string;
  foods: NutritionFoodInput[];
}

export interface SaveNutritionPlanResult {
  success: boolean;
  error?: string;
}

export async function saveNutritionPlanAction(
  clientId: string,
  title: string,
  meals: NutritionMealInput[]
): Promise<SaveNutritionPlanResult> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const { t } = await getTranslator();
    return { success: false, error: t("nutrition.notConfigured") };
  }

  const supabase = await createClient();

  const { data: existingPlan } = await supabase
    .from("nutrition_plans")
    .select("id")
    .eq("client_id", clientId)
    .maybeSingle();

  let planId = existingPlan?.id as string | undefined;

  if (planId) {
    const { error: updateError } = await supabase
      .from("nutrition_plans")
      .update({ title })
      .eq("id", planId);
    if (updateError) return { success: false, error: updateError.message };

    await supabase.from("nutrition_meals").delete().eq("nutrition_plan_id", planId);
  } else {
    const { data: created, error: createError } = await supabase
      .from("nutrition_plans")
      .insert({ client_id: clientId, title })
      .select("id")
      .single();
    if (createError || !created) {
      return { success: false, error: createError?.message ?? "Failed to create plan" };
    }
    planId = created.id;
  }

  for (let i = 0; i < meals.length; i++) {
    const meal = meals[i];
    const { data: createdMeal, error: mealError } = await supabase
      .from("nutrition_meals")
      .insert({ nutrition_plan_id: planId, name: meal.name, order_index: i })
      .select("id")
      .single();

    if (mealError || !createdMeal) {
      return { success: false, error: mealError?.message ?? "Failed to save meal" };
    }

    if (meal.foods.length > 0) {
      const { error: foodsError } = await supabase.from("nutrition_foods").insert(
        meal.foods.map((food, index) => ({
          nutrition_meal_id: createdMeal.id,
          name: food.name,
          quantity: food.quantity,
          calories: food.calories,
          protein_g: food.protein_g,
          carbs_g: food.carbs_g,
          fats_g: food.fats_g,
          order_index: index,
        }))
      );
      if (foodsError) return { success: false, error: foodsError.message };
    }
  }

  revalidatePath(`/dashboard/nutrition/${clientId}`);
  revalidatePath(`/dashboard/clients/${clientId}`);
  return { success: true };
}
