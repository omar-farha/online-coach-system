## Forge Coaching — Online Coach System

A custom system for a single online fitness coach: a premium public
marketing site, a private Coach Dashboard, and a private Client Portal
accessed through a unique link per client.

### Stack

Next.js (App Router) · TypeScript · Tailwind CSS · Supabase (auth, database) · ExerciseDB (RapidAPI) · i18n (Egyptian Arabic + English)

### Getting started

1. Install dependencies (already done if you're reading this from the repo):
   ```bash
   npm install
   ```
2. Copy the environment template and fill in your credentials:
   ```bash
   cp .env.local.example .env.local
   ```
   - `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` / `SUPABASE_SERVICE_ROLE_KEY` — from your Supabase project's API settings.
   - `RAPIDAPI_KEY` — from your ExerciseDB subscription on RapidAPI (host: `exercisedb.p.rapidapi.com`).

   **Without these set**, the app still runs fully — the Dashboard and Client
   Portal show a realistic demo dataset, and the Exercise Picker falls back
   to a curated set of sample exercises, so the UI is always usable.

3. Set up the database: run `supabase/schema.sql` against your Supabase
   project (SQL Editor, or `supabase db push` if you use the CLI). Then
   create the one Coach account in Supabase Auth (Authentication → Users →
   Add user) — this app supports exactly one Coach/Owner account.

4. Run the dev server:
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000` for the public site, `/login` to sign in
   as the Coach, and `/dashboard` for the Coach Dashboard.

### Project structure

- `src/app/(marketing pages at root)` — public website
- `src/app/dashboard` — Coach Dashboard (protected, requires sign-in)
- `src/app/client/[slug]` — private Client Portal, one per client
- `src/lib/data` — Supabase queries with graceful demo-data fallback
- `src/lib/exercisedb` — ExerciseDB service layer (isolated, swappable, cached, mock fallback)
- `src/lib/i18n` — bilingual system (Egyptian Arabic default + English), cookie-persisted, RTL/LTR aware
- `supabase/schema.sql` — full database schema + Row Level Security policies

### Notes

- There is intentionally no messaging system and no online payments in this version.
- Client private links (`/client/<slug>`) are resolved server-side with a
  service-role Supabase client, always filtered by slug, so a client can
  never see another client's data by editing the URL.
