import { createClient } from "@/lib/supabase/server";
import { MOCK_WORKOUT_PLANS } from "@/lib/mock-data";
import type { WorkoutPlanFull } from "@/types/database";

const SUPABASE_CONFIGURED = !!process.env.NEXT_PUBLIC_SUPABASE_URL;

export async function getWorkoutPlanByClientId(
  clientId: string
): Promise<WorkoutPlanFull | null> {
  if (!SUPABASE_CONFIGURED) return MOCK_WORKOUT_PLANS[clientId] ?? null;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("workout_plans")
      .select(
        "*, days:workout_days(*, exercises:workout_exercises(*))"
      )
      .eq("client_id", clientId)
      .order("order_index", { referencedTable: "workout_days", ascending: true })
      .order("order_index", {
        referencedTable: "workout_days.workout_exercises",
        ascending: true,
      })
      .single();

    if (error || !data) return null;
    return data as unknown as WorkoutPlanFull;
  } catch {
    return null;
  }
}

export async function getWorkoutPlanByClientSlug(
  slug: string
): Promise<WorkoutPlanFull | null> {
  if (!SUPABASE_CONFIGURED) {
    const { MOCK_CLIENTS } = await import("@/lib/mock-data");
    const client = MOCK_CLIENTS.find((c) => c.slug === slug);
    return client ? MOCK_WORKOUT_PLANS[client.id] ?? null : null;
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
      .from("workout_plans")
      .select("*, days:workout_days(*, exercises:workout_exercises(*))")
      .eq("client_id", client.id)
      .single();

    if (error || !data) return null;
    return data as unknown as WorkoutPlanFull;
  } catch {
    return null;
  }
}
