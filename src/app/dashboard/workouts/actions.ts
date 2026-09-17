"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getTranslator } from "@/lib/i18n/server";

export interface WorkoutExerciseInput {
  exercise_source_id: string | null;
  name: string;
  gif_url: string | null;
  body_part: string | null;
  target_muscle: string | null;
  equipment: string | null;
  sets: number;
  reps: string;
  rest_seconds: number;
}

export interface WorkoutDayInput {
  day_label: string;
  title: string;
  exercises: WorkoutExerciseInput[];
}

export interface SaveWorkoutPlanResult {
  success: boolean;
  error?: string;
}

/**
 * Replaces the client's entire workout plan structure in one transaction-like
 * sequence. Simpler and safer than diffing nested days/exercises client-side.
 */
export async function saveWorkoutPlanAction(
  clientId: string,
  title: string,
  days: WorkoutDayInput[]
): Promise<SaveWorkoutPlanResult> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const { t } = await getTranslator();
    return { success: false, error: t("workouts.notConfigured") };
  }

  const supabase = await createClient();

  const { data: existingPlan } = await supabase
    .from("workout_plans")
    .select("id")
    .eq("client_id", clientId)
    .maybeSingle();

  let planId = existingPlan?.id as string | undefined;

  if (planId) {
    const { error: updateError } = await supabase
      .from("workout_plans")
      .update({ title })
      .eq("id", planId);
    if (updateError) return { success: false, error: updateError.message };

    await supabase.from("workout_days").delete().eq("workout_plan_id", planId);
  } else {
    const { data: created, error: createError } = await supabase
      .from("workout_plans")
      .insert({ client_id: clientId, title })
      .select("id")
      .single();
    if (createError || !created) {
      return { success: false, error: createError?.message ?? "Failed to create plan" };
    }
    planId = created.id;
  }

  for (let i = 0; i < days.length; i++) {
    const day = days[i];
    const { data: createdDay, error: dayError } = await supabase
      .from("workout_days")
      .insert({
        workout_plan_id: planId,
        day_label: day.day_label,
        title: day.title,
        order_index: i,
      })
      .select("id")
      .single();

    if (dayError || !createdDay) {
      return { success: false, error: dayError?.message ?? "Failed to save day" };
    }

    if (day.exercises.length > 0) {
      const { error: exercisesError } = await supabase.from("workout_exercises").insert(
        day.exercises.map((ex, index) => ({
          workout_day_id: createdDay.id,
          exercise_source_id: ex.exercise_source_id,
          name: ex.name,
          gif_url: ex.gif_url,
          body_part: ex.body_part,
          target_muscle: ex.target_muscle,
          equipment: ex.equipment,
          sets: ex.sets,
          reps: ex.reps,
          rest_seconds: ex.rest_seconds,
          order_index: index,
        }))
      );
      if (exercisesError) return { success: false, error: exercisesError.message };
    }
  }

  revalidatePath(`/dashboard/workouts/${clientId}`);
  revalidatePath(`/dashboard/clients/${clientId}`);
  return { success: true };
}
