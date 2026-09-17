-- Online Coach System — database schema
-- Single-coach system: any authenticated user is treated as "the Coach".
-- Client Portal pages never use the anon/authenticated role — they read
-- through a server-only service-role client, always filtered by client
-- slug/id, so RLS below only needs to grant access to the Coach.

create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────────────────────────────────────
-- coach_profile
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists coach_profile (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users (id) on delete cascade,
  full_name text not null default 'Your Name',
  bio text,
  phone text,
  email text,
  avatar_url text,
  instagram_url text,
  facebook_url text,
  tiktok_url text,
  youtube_url text,
  website_headline text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────
-- packages
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists packages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price numeric(10, 2) not null default 0,
  duration_label text not null, -- e.g. "1 Month", "3 Months"
  duration_days integer not null default 30,
  description text,
  features text[] not null default '{}',
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────
-- clients
-- ─────────────────────────────────────────────────────────────────────────
create type client_status as enum ('active', 'expired', 'paused');

create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique, -- private URL segment, e.g. "ahmed-12345"
  full_name text not null,
  phone text not null,
  email text,
  age integer,
  height_cm numeric(5, 1),
  weight_kg numeric(5, 1),
  goal text,
  avatar_url text,
  package_id uuid references packages (id) on delete set null,
  subscription_start date,
  subscription_end date,
  status client_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists clients_slug_idx on clients (slug);
create index if not exists clients_status_idx on clients (status);

-- ─────────────────────────────────────────────────────────────────────────
-- workout_plans / workout_days / workout_exercises
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists workout_plans (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null unique references clients (id) on delete cascade,
  title text not null default 'Workout Plan',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists workout_days (
  id uuid primary key default gen_random_uuid(),
  workout_plan_id uuid not null references workout_plans (id) on delete cascade,
  day_label text not null, -- e.g. "Day 1" or "Monday"
  title text not null, -- e.g. "Chest + Triceps"
  order_index integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists workout_exercises (
  id uuid primary key default gen_random_uuid(),
  workout_day_id uuid not null references workout_days (id) on delete cascade,
  exercise_source_id text, -- ExerciseDB exercise id
  name text not null,
  gif_url text,
  body_part text,
  target_muscle text,
  equipment text,
  sets integer not null default 3,
  reps text not null default '10', -- text to allow ranges like "8-12"
  rest_seconds integer not null default 60,
  order_index integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists workout_days_plan_idx on workout_days (workout_plan_id);
create index if not exists workout_exercises_day_idx on workout_exercises (workout_day_id);

-- ─────────────────────────────────────────────────────────────────────────
-- nutrition_plans / nutrition_meals / nutrition_foods
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists nutrition_plans (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null unique references clients (id) on delete cascade,
  title text not null default 'Nutrition Plan',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists nutrition_meals (
  id uuid primary key default gen_random_uuid(),
  nutrition_plan_id uuid not null references nutrition_plans (id) on delete cascade,
  name text not null, -- e.g. "Breakfast"
  order_index integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists nutrition_foods (
  id uuid primary key default gen_random_uuid(),
  nutrition_meal_id uuid not null references nutrition_meals (id) on delete cascade,
  name text not null,
  quantity text not null default '',
  calories numeric(6, 1) not null default 0,
  protein_g numeric(6, 1) not null default 0,
  carbs_g numeric(6, 1) not null default 0,
  fats_g numeric(6, 1) not null default 0,
  order_index integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists nutrition_meals_plan_idx on nutrition_meals (nutrition_plan_id);
create index if not exists nutrition_foods_meal_idx on nutrition_foods (nutrition_meal_id);

-- ─────────────────────────────────────────────────────────────────────────
-- progress_records
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists progress_records (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients (id) on delete cascade,
  recorded_at date not null default current_date,
  weight_kg numeric(5, 1),
  chest_cm numeric(5, 1),
  waist_cm numeric(5, 1),
  hips_cm numeric(5, 1),
  arms_cm numeric(5, 1),
  thighs_cm numeric(5, 1),
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists progress_records_client_idx on progress_records (client_id, recorded_at);

-- ─────────────────────────────────────────────────────────────────────────
-- updated_at triggers
-- ─────────────────────────────────────────────────────────────────────────
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at before update on coach_profile
  for each row execute function set_updated_at();
create trigger set_updated_at before update on packages
  for each row execute function set_updated_at();
create trigger set_updated_at before update on clients
  for each row execute function set_updated_at();
create trigger set_updated_at before update on workout_plans
  for each row execute function set_updated_at();
create trigger set_updated_at before update on nutrition_plans
  for each row execute function set_updated_at();

-- ─────────────────────────────────────────────────────────────────────────
-- Row Level Security
-- Only the authenticated Coach (any authenticated user, since there is
-- exactly one account) may read/write. The Client Portal never uses the
-- authenticated/anon roles — it reads via a server-only service-role
-- client scoped explicitly by slug, so no policy grants public access.
-- ─────────────────────────────────────────────────────────────────────────
alter table coach_profile enable row level security;
alter table packages enable row level security;
alter table clients enable row level security;
alter table workout_plans enable row level security;
alter table workout_days enable row level security;
alter table workout_exercises enable row level security;
alter table nutrition_plans enable row level security;
alter table nutrition_meals enable row level security;
alter table nutrition_foods enable row level security;
alter table progress_records enable row level security;

create policy "coach full access" on coach_profile for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "coach full access" on packages for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "coach full access" on clients for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "coach full access" on workout_plans for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "coach full access" on workout_days for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "coach full access" on workout_exercises for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "coach full access" on nutrition_plans for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "coach full access" on nutrition_meals for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "coach full access" on nutrition_foods for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "coach full access" on progress_records for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Public (anon) may read active packages for the marketing website.
create policy "public read active packages" on packages for select
  to anon
  using (is_active = true);
