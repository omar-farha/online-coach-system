import { createClient } from "@/lib/supabase/server";
import { MOCK_CLIENTS } from "@/lib/mock-data";
import type { ClientWithPackage } from "@/types/database";

const SUPABASE_CONFIGURED = !!process.env.NEXT_PUBLIC_SUPABASE_URL;

export async function getClients(): Promise<ClientWithPackage[]> {
  if (!SUPABASE_CONFIGURED) return MOCK_CLIENTS;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("clients")
      .select("*, package:packages(*)")
      .order("created_at", { ascending: false });

    if (error || !data) return MOCK_CLIENTS;
    return data as unknown as ClientWithPackage[];
  } catch {
    return MOCK_CLIENTS;
  }
}

export async function getClientById(id: string): Promise<ClientWithPackage | null> {
  if (!SUPABASE_CONFIGURED) {
    return MOCK_CLIENTS.find((c) => c.id === id) ?? null;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("clients")
      .select("*, package:packages(*)")
      .eq("id", id)
      .single();

    if (error || !data) return null;
    return data as unknown as ClientWithPackage;
  } catch {
    return null;
  }
}

/**
 * Resolves a client strictly by their private slug for the Client Portal.
 * Uses the service-role client so the lookup never depends on RLS/session
 * state, but always filters by slug so no other client's data can leak.
 */
export async function getClientBySlug(slug: string): Promise<ClientWithPackage | null> {
  if (!SUPABASE_CONFIGURED) {
    return MOCK_CLIENTS.find((c) => c.slug === slug) ?? null;
  }

  try {
    const { createServiceRoleClient } = await import("@/lib/supabase/server");
    const supabase = createServiceRoleClient();
    const { data, error } = await supabase
      .from("clients")
      .select("*, package:packages(*)")
      .eq("slug", slug)
      .single();

    if (error || !data) return null;
    return data as unknown as ClientWithPackage;
  } catch {
    return null;
  }
}
