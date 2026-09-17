export type ClientStatus = "active" | "expired" | "paused";

export interface CoachProfile {
  id: string;
  user_id: string;
  full_name: string;
  bio: string | null;
  phone: string | null;
  email: string | null;
  avatar_url: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
  tiktok_url: string | null;
  youtube_url: string | null;
  website_headline: string | null;
  created_at: string;
  updated_at: string;
}

export interface Package {
  id: string;
  name: string;
  price: number;
  duration_label: string;
  duration_days: number;
  description: string | null;
  features: string[];
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Client {
  id: string;
  slug: string;
  full_name: string;
  phone: string;
  email: string | null;
  age: number | null;
  height_cm: number | null;
  weight_kg: number | null;
  goal: string | null;
  avatar_url: string | null;
  package_id: string | null;
  subscription_start: string | null;
  subscription_end: string | null;
  status: ClientStatus;
  created_at: string;
  updated_at: string;
}

export interface ClientWithPackage extends Client {
  package: Package | null;
}

export interface WorkoutPlan {
  id: string;
  client_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface WorkoutDay {
  id: string;
  workout_plan_id: string;
  day_label: string;
  title: string;
  order_index: number;
  created_at: string;
}

export interface WorkoutExercise {
  id: string;
  workout_day_id: string;
  exercise_source_id: string | null;
  name: string;
  gif_url: string | null;
  body_part: string | null;
  target_muscle: string | null;
  equipment: string | null;
  sets: number;
  reps: string;
  rest_seconds: number;
  order_index: number;
  created_at: string;
}

export interface WorkoutDayWithExercises extends WorkoutDay {
  exercises: WorkoutExercise[];
}

export interface WorkoutPlanFull extends WorkoutPlan {
  days: WorkoutDayWithExercises[];
}

export interface NutritionPlan {
  id: string;
  client_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface NutritionMeal {
  id: string;
  nutrition_plan_id: string;
  name: string;
  order_index: number;
  created_at: string;
}

export interface NutritionFood {
  id: string;
  nutrition_meal_id: string;
  name: string;
  quantity: string;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fats_g: number;
  order_index: number;
  created_at: string;
}

export interface NutritionMealWithFoods extends NutritionMeal {
  foods: NutritionFood[];
}

export interface NutritionPlanFull extends NutritionPlan {
  meals: NutritionMealWithFoods[];
}

export interface ProgressRecord {
  id: string;
  client_id: string;
  recorded_at: string;
  weight_kg: number | null;
  chest_cm: number | null;
  waist_cm: number | null;
  hips_cm: number | null;
  arms_cm: number | null;
  thighs_cm: number | null;
  notes: string | null;
  created_at: string;
}
