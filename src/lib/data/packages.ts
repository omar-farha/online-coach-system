import { createClient } from "@/lib/supabase/server";
import { MOCK_PACKAGES } from "@/lib/mock-packages";
import type { Package } from "@/types/database";

/**
 * Active packages for public display. Falls back to mock packages when
 * Supabase isn't configured yet (e.g. during initial setup) so the
 * marketing site never breaks.
 */
export async function getActivePackages(): Promise<Package[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return MOCK_PACKAGES;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("packages")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) return MOCK_PACKAGES;
    return data as Package[];
  } catch {
    return MOCK_PACKAGES;
  }
}

/** All packages (active and inactive) for the Coach Dashboard. */
export async function getAllPackages(): Promise<Package[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return MOCK_PACKAGES;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("packages")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data) return MOCK_PACKAGES;
    return data as Package[];
  } catch {
    return MOCK_PACKAGES;
  }
}

export async function getPackageById(id: string): Promise<Package | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return MOCK_PACKAGES.find((p) => p.id === id) ?? null;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("packages")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) return null;
    return data as Package;
  } catch {
    return null;
  }
}
