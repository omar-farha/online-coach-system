"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getTranslator } from "@/lib/i18n/server";

const packageSchema = z.object({
  name: z.string().min(2),
  price: z.coerce.number().nonnegative(),
  duration_label: z.string().min(1),
  duration_days: z.coerce.number().int().positive(),
  description: z.string().optional(),
  features: z.string().optional(),
});

export type PackageFormState = { error: string | null };

function parseFeatures(raw?: string) {
  return (raw ?? "")
    .split("\n")
    .map((f) => f.trim())
    .filter(Boolean);
}

export async function createPackageAction(
  _prev: PackageFormState,
  formData: FormData
): Promise<PackageFormState> {
  const { t } = await getTranslator();
  const parsed = packageSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { error: t("common.invalidInput") };
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return { error: t("common.supabaseNotConfigured") };
  }

  const data = parsed.data;
  const supabase = await createClient();
  const { error } = await supabase.from("packages").insert({
    name: data.name,
    price: data.price,
    duration_label: data.duration_label,
    duration_days: data.duration_days,
    description: data.description || null,
    features: parseFeatures(data.features),
    is_active: true,
  });

  if (error) return { error: error.message };

  revalidatePath("/dashboard/packages");
  revalidatePath("/");
  redirect("/dashboard/packages");
}

export async function updatePackageAction(
  packageId: string,
  _prev: PackageFormState,
  formData: FormData
): Promise<PackageFormState> {
  const { t } = await getTranslator();
  const parsed = packageSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { error: t("common.invalidInput") };
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return { error: t("common.supabaseNotConfigured") };
  }

  const data = parsed.data;
  const supabase = await createClient();
  const { error } = await supabase
    .from("packages")
    .update({
      name: data.name,
      price: data.price,
      duration_label: data.duration_label,
      duration_days: data.duration_days,
      description: data.description || null,
      features: parseFeatures(data.features),
    })
    .eq("id", packageId);

  if (error) return { error: error.message };

  revalidatePath("/dashboard/packages");
  revalidatePath("/");
  redirect("/dashboard/packages");
}

export async function deletePackageAction(packageId: string) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return;
  const supabase = await createClient();
  await supabase.from("packages").delete().eq("id", packageId);
  revalidatePath("/dashboard/packages");
  revalidatePath("/");
}

export async function togglePackageActiveAction(packageId: string, isActive: boolean) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return;
  const supabase = await createClient();
  await supabase.from("packages").update({ is_active: isActive }).eq("id", packageId);
  revalidatePath("/dashboard/packages");
  revalidatePath("/");
}
