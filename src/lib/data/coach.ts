import { createClient } from "@/lib/supabase/server";
import { SITE_CONFIG } from "@/lib/site-config";
import type { CoachProfile } from "@/types/database";

const SUPABASE_CONFIGURED = !!process.env.NEXT_PUBLIC_SUPABASE_URL;

const MOCK_PROFILE: CoachProfile = {
  id: "mock-coach",
  user_id: "mock-user",
  full_name: SITE_CONFIG.coachName,
  bio: "Certified strength & conditioning coach helping people build real, lasting results through personalized training and nutrition.",
  phone: SITE_CONFIG.phone,
  email: SITE_CONFIG.email,
  avatar_url: null,
  instagram_url: SITE_CONFIG.instagram,
  facebook_url: null,
  tiktok_url: SITE_CONFIG.tiktok,
  youtube_url: SITE_CONFIG.youtube,
  website_headline: "Build Your Best Body",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export async function getCoachProfile(): Promise<CoachProfile> {
  if (!SUPABASE_CONFIGURED) return MOCK_PROFILE;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("coach_profile")
      .select("*")
      .limit(1)
      .maybeSingle();

    if (error || !data) return MOCK_PROFILE;
    return data as CoachProfile;
  } catch {
    return MOCK_PROFILE;
  }
}
