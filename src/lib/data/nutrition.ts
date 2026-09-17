import { createClient } from "@/lib/supabase/server";
import { MOCK_NUTRITION_PLANS } from "@/lib/mock-data";
import type { NutritionPlanFull } from "@/types/database";

const SUPABASE_CONFIGURED = !!process.env.NEXT_PUBLIC_SUPABASE_URL;

export async function getNutritionPlanByClientId(
  clientId: string
): Promise<NutritionPlanFull | null> {
  if (!SUPABASE_CONFIGURED) return MOCK_NUTRITION_PLANS[clientId] ?? null;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("nutrition_plans")
      .select("*, meals:nutrition_meals(*, foods:nutrition_foods(*))")
      .eq("client_id", clientId)
      .order("order_index", { referencedTable: "nutrition_meals", ascending: true })
      .single();

    if (error || !data) return null;
    return data as unknown as NutritionPlanFull;
  } catch {
    return null;
  }
}

export async function getNutritionPlanByClientSlug(
  slug: string
): Promise<NutritionPlanFull | null> {
  if (!SUPABASE_CONFIGURED) {
    const { MOCK_CLIENTS } = await import("@/lib/mock-data");
    const client = MOCK_CLIENTS.find((c) => c.slug === slug);
    return client ? MOCK_NUTRITION_PLANS[client.id] ?? null : null;
  }

  try {
    const { createServiceRoleClient } = await import("@/lib/supabase/server");
    const supabase = createServiceRoleClient();
    const { data: client } = await supabase
      .from("clients")
      .select("id")
      .eq("slug", slug)
      .single();

    if (!client) return null;

    const { data, error } = await supabase
      .from("nutrition_plans")
      .select("*, meals:nutrition_meals(*, foods:nutrition_foods(*))")
      .eq("client_id", client.id)
      .single();

    if (error || !data) return null;
    return data as unknown as NutritionPlanFull;
  } catch {
    return null;
  }
}

export function nutritionTotals(plan: NutritionPlanFull) {
  return plan.meals.reduce(
    (totals, meal) => {
      for (const food of meal.foods) {
        totals.calories += Number(food.calories) || 0;
        totals.protein += Number(food.protein_g) || 0;
        totals.carbs += Number(food.carbs_g) || 0;
        totals.fats += Number(food.fats_g) || 0;
      }
      return totals;
    },
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );
}
