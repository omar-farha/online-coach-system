import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

// Note: we intentionally don't parameterize these clients with a generated
// Database type — matching @supabase/supabase-js's generic Table shape by
// hand is brittle. App code casts query results to the domain types in
// src/types/database.ts instead (see src/lib/data/*).

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // called from a Server Component with no write access; safe to ignore
            // because middleware refreshes the session on every request.
          }
        },
      },
    }
  );
}

/**
 * Service-role client for trusted server-only operations (e.g. resolving a
 * client's private link without exposing other clients via RLS-scoped auth).
 * Never import this into client components or expose the key to the browser.
 */
export function createServiceRoleClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
