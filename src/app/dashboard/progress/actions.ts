"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getTranslator } from "@/lib/i18n/server";

const progressSchema = z.object({
  recorded_at: z.string().min(1),
  weight_kg: z.coerce.number().optional().or(z.nan()),
  chest_cm: z.coerce.number().optional().or(z.nan()),
  waist_cm: z.coerce.number().optional().or(z.nan()),
  hips_cm: z.coerce.number().optional().or(z.nan()),
  arms_cm: z.coerce.number().optional().or(z.nan()),
  thighs_cm: z.coerce.number().optional().or(z.nan()),
  notes: z.string().optional(),
});

export type ProgressFormState = { error: string | null; success?: boolean };

export async function addProgressRecordAction(
  clientId: string,
  _prev: ProgressFormState,
  formData: FormData
): Promise<ProgressFormState> {
  const parsed = progressSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const { t } = await getTranslator();
    return { error: t("common.supabaseNotConfigured") };
  }

  const data = parsed.data;
  const clean = (v: number) => (Number.isNaN(v) ? null : v);

  const supabase = await createClient();
  const { error } = await supabase.from("progress_records").insert({
    client_id: clientId,
    recorded_at: data.recorded_at,
    weight_kg: clean(data.weight_kg as number),
    chest_cm: clean(data.chest_cm as number),
    waist_cm: clean(data.waist_cm as number),
    hips_cm: clean(data.hips_cm as number),
    arms_cm: clean(data.arms_cm as number),
    thighs_cm: clean(data.thighs_cm as number),
    notes: data.notes || null,
  });

  if (error) return { error: error.message };

  revalidatePath(`/dashboard/progress/${clientId}`);
  return { error: null, success: true };
}
