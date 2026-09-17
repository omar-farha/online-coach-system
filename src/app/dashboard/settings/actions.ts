"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getTranslator } from "@/lib/i18n/server";

const profileSchema = z.object({
  full_name: z.string().min(2),
  bio: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  instagram_url: z.string().optional(),
  facebook_url: z.string().optional(),
  tiktok_url: z.string().optional(),
  youtube_url: z.string().optional(),
  website_headline: z.string().optional(),
});

export type ProfileFormState = { error: string | null; success?: boolean };

export async function updateCoachProfileAction(
  _prev: ProfileFormState,
  formData: FormData
): Promise<ProfileFormState> {
  const { t } = await getTranslator();
  const parsed = profileSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { error: t("common.invalidInput") };
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return { error: t("common.supabaseNotConfigured") };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: t("common.notSignedIn") };

  const data = parsed.data;
  const { error } = await supabase.from("coach_profile").upsert(
    {
      user_id: user.id,
      full_name: data.full_name,
      bio: data.bio || null,
      phone: data.phone || null,
      email: data.email || null,
      instagram_url: data.instagram_url || null,
      facebook_url: data.facebook_url || null,
      tiktok_url: data.tiktok_url || null,
      youtube_url: data.youtube_url || null,
      website_headline: data.website_headline || null,
    },
    { onConflict: "user_id" }
  );

  if (error) return { error: error.message };

  revalidatePath("/dashboard/settings");
  revalidatePath("/");
  return { error: null, success: true };
}
