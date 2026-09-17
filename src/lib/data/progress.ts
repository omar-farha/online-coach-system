import { createClient } from "@/lib/supabase/server";
import { MOCK_PROGRESS } from "@/lib/mock-data";
import type { ProgressRecord } from "@/types/database";

const SUPABASE_CONFIGURED = !!process.env.NEXT_PUBLIC_SUPABASE_URL;

export async function getProgressByClientId(
  clientId: string
): Promise<ProgressRecord[]> {
  if (!SUPABASE_CONFIGURED) return MOCK_PROGRESS[clientId] ?? [];

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("progress_records")
      .select("*")
      .eq("client_id", clientId)
      .order("recorded_at", { ascending: true });

    if (error || !data) return [];
    return data as ProgressRecord[];
  } catch {
    return [];
  }
}

export async function getProgressByClientSlug(
  slug: string
): Promise<ProgressRecord[]> {
  if (!SUPABASE_CONFIGURED) {
    const { MOCK_CLIENTS } = await import("@/lib/mock-data");
    const client = MOCK_CLIENTS.find((c) => c.slug === slug);
    return client ? MOCK_PROGRESS[client.id] ?? [] : [];
  }

  try {
    const { createServiceRoleClient } = await import("@/lib/supabase/server");
    const supabase = createServiceRoleClient();
    const { data: client } = await supabase
      .from("clients")
      .select("id")
      .eq("slug", slug)
      .single();

    if (!client) return [];

    const { data, error } = await supabase
      .from("progress_records")
      .select("*")
      .eq("client_id", client.id)
      .order("recorded_at", { ascending: true });

    if (error || !data) return [];
    return data as ProgressRecord[];
  } catch {
    return [];
  }
}
