"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";
import { getTranslator } from "@/lib/i18n/server";

const clientSchema = z.object({
  full_name: z.string().min(2),
  phone: z.string().min(5),
  email: z.string().email().optional().or(z.literal("")),
  age: z.coerce.number().int().positive().optional().or(z.nan()),
  height_cm: z.coerce.number().positive().optional().or(z.nan()),
  weight_kg: z.coerce.number().positive().optional().or(z.nan()),
  goal: z.string().optional(),
  package_id: z.string().optional().or(z.literal("")),
  subscription_start: z.string().optional().or(z.literal("")),
  subscription_end: z.string().optional().or(z.literal("")),
});

export type ClientFormState = { error: string | null };

function parseForm(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = clientSchema.safeParse(raw);
  return parsed;
}

export async function createClientAction(
  _prev: ClientFormState,
  formData: FormData
): Promise<ClientFormState> {
  const { t } = await getTranslator();
  const parsed = parseForm(formData);
  if (!parsed.success) {
    return { error: t("common.invalidInput") };
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return { error: t("common.supabaseNotConfigured") };
  }

  const data = parsed.data;
  const supabase = await createClient();
  const { error } = await supabase.from("clients").insert({
    full_name: data.full_name,
    phone: data.phone,
    email: data.email || null,
    age: Number.isNaN(data.age) ? null : data.age,
    height_cm: Number.isNaN(data.height_cm) ? null : data.height_cm,
    weight_kg: Number.isNaN(data.weight_kg) ? null : data.weight_kg,
    goal: data.goal || null,
    package_id: data.package_id || null,
    subscription_start: data.subscription_start || null,
    subscription_end: data.subscription_end || null,
    slug: slugify(data.full_name),
  });

  if (error) return { error: error.message };

  revalidatePath("/dashboard/clients");
  redirect("/dashboard/clients");
}

export async function updateClientAction(
  clientId: string,
  _prev: ClientFormState,
  formData: FormData
): Promise<ClientFormState> {
  const { t } = await getTranslator();
  const parsed = parseForm(formData);
  if (!parsed.success) {
    return { error: t("common.invalidInput") };
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return { error: t("common.supabaseNotConfigured") };
  }

  const data = parsed.data;
  const supabase = await createClient();
  const { error } = await supabase
    .from("clients")
    .update({
      full_name: data.full_name,
      phone: data.phone,
      email: data.email || null,
      age: Number.isNaN(data.age) ? null : data.age,
      height_cm: Number.isNaN(data.height_cm) ? null : data.height_cm,
      weight_kg: Number.isNaN(data.weight_kg) ? null : data.weight_kg,
      goal: data.goal || null,
      package_id: data.package_id || null,
      subscription_start: data.subscription_start || null,
      subscription_end: data.subscription_end || null,
    })
    .eq("id", clientId);

  if (error) return { error: error.message };

  revalidatePath("/dashboard/clients");
  revalidatePath(`/dashboard/clients/${clientId}`);
  redirect(`/dashboard/clients/${clientId}`);
}

export async function deleteClientAction(clientId: string) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return;

  const supabase = await createClient();
  await supabase.from("clients").delete().eq("id", clientId);

  revalidatePath("/dashboard/clients");
  redirect("/dashboard/clients");
}
