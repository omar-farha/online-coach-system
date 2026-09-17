import type {
  ClientWithPackage,
  WorkoutPlanFull,
  NutritionPlanFull,
  ProgressRecord,
} from "@/types/database";
import { MOCK_PACKAGES } from "./mock-packages";

const now = new Date().toISOString();
const daysAgo = (n: number) =>
  new Date(Date.now() - n * 86400000).toISOString().slice(0, 10);
const daysFromNow = (n: number) =>
  new Date(Date.now() + n * 86400000).toISOString().slice(0, 10);

/**
 * Demo dataset shown across the Dashboard and Client Portal until Supabase
 * is connected, so the product looks and feels complete out of the box.
 * Every data-fetch helper in src/lib/data falls back to this when Supabase
 * isn't configured or a query fails.
 */
export const MOCK_CLIENTS: ClientWithPackage[] = [
  {
    id: "c1",
    slug: "ahmed-40213",
    full_name: "Ahmed Hassan",
    phone: "+1 555 201 3344",
    email: "ahmed@example.com",
    age: 28,
    height_cm: 178,
    weight_kg: 82,
    goal: "Build muscle & strength",
    avatar_url: null,
    package_id: MOCK_PACKAGES[1].id,
    package: MOCK_PACKAGES[1],
    subscription_start: daysAgo(40),
    subscription_end: daysFromNow(50),
    status: "active",
    created_at: now,
    updated_at: now,
  },
  {
    id: "c2",
    slug: "sara-77820",
    full_name: "Sara Khoury",
    phone: "+1 555 402 1190",
    email: "sara@example.com",
    age: 32,
    height_cm: 165,
    weight_kg: 63,
    goal: "Fat loss & toning",
    avatar_url: null,
    package_id: MOCK_PACKAGES[2].id,
    package: MOCK_PACKAGES[2],
    subscription_start: daysAgo(90),
    subscription_end: daysFromNow(90),
    status: "active",
    created_at: now,
    updated_at: now,
  },
  {
    id: "c3",
    slug: "marcus-19938",
    full_name: "Marcus Johnson",
    phone: "+1 555 887 2201",
    email: null,
    age: 41,
    height_cm: 182,
    weight_kg: 95,
    goal: "General fitness & health",
    avatar_url: null,
    package_id: MOCK_PACKAGES[0].id,
    package: MOCK_PACKAGES[0],
    subscription_start: daysAgo(25),
    subscription_end: daysFromNow(5),
    status: "active",
    created_at: now,
    updated_at: now,
  },
  {
    id: "c4",
    slug: "lena-56010",
    full_name: "Lena Fischer",
    phone: "+1 555 664 9021",
    email: "lena@example.com",
    age: 26,
    height_cm: 170,
    weight_kg: 68,
    goal: "Marathon prep & conditioning",
    avatar_url: null,
    package_id: MOCK_PACKAGES[1].id,
    package: MOCK_PACKAGES[1],
    subscription_start: daysAgo(120),
    subscription_end: daysAgo(10),
    status: "expired",
    created_at: now,
    updated_at: now,
  },
  {
    id: "c5",
    slug: "omar-88231",
    full_name: "Omar Siddiqui",
    phone: "+1 555 331 7742",
    email: "omar@example.com",
    age: 35,
    height_cm: 175,
    weight_kg: 88,
    goal: "Strength & powerlifting",
    avatar_url: null,
    package_id: MOCK_PACKAGES[2].id,
    package: MOCK_PACKAGES[2],
    subscription_start: daysAgo(15),
    subscription_end: daysFromNow(165),
    status: "paused",
    created_at: now,
    updated_at: now,
  },
];

export const MOCK_WORKOUT_PLANS: Record<string, WorkoutPlanFull> = {
  c1: {
    id: "wp1",
    client_id: "c1",
    title: "Ahmed's 4 Day Program",
    created_at: now,
    updated_at: now,
    days: [
      {
        id: "wd1",
        workout_plan_id: "wp1",
        day_label: "Day 1",
        title: "Chest + Triceps",
        order_index: 0,
        created_at: now,
        exercises: [
          { id: "we1", workout_day_id: "wd1", exercise_source_id: "0025", name: "Barbell Bench Press", gif_url: "/exercise-placeholder.svg", body_part: "chest", target_muscle: "pectorals", equipment: "barbell", sets: 4, reps: "8-10", rest_seconds: 90, order_index: 0, created_at: now },
          { id: "we2", workout_day_id: "wd1", exercise_source_id: "0327", name: "Incline Dumbbell Press", gif_url: "/exercise-placeholder.svg", body_part: "chest", target_muscle: "pectorals", equipment: "dumbbell", sets: 3, reps: "10-12", rest_seconds: 60, order_index: 1, created_at: now },
          { id: "we3", workout_day_id: "wd1", exercise_source_id: "0651", name: "Triceps Pushdown", gif_url: "/exercise-placeholder.svg", body_part: "upper arms", target_muscle: "triceps", equipment: "cable", sets: 3, reps: "12-15", rest_seconds: 60, order_index: 2, created_at: now },
        ],
      },
      {
        id: "wd2",
        workout_plan_id: "wp1",
        day_label: "Day 2",
        title: "Back + Biceps",
        order_index: 1,
        created_at: now,
        exercises: [
          { id: "we4", workout_day_id: "wd2", exercise_source_id: "0113", name: "Lat Pulldown", gif_url: "/exercise-placeholder.svg", body_part: "back", target_muscle: "lats", equipment: "cable", sets: 4, reps: "10", rest_seconds: 90, order_index: 0, created_at: now },
          { id: "we5", workout_day_id: "wd2", exercise_source_id: "0288", name: "Barbell Bent Over Row", gif_url: "/exercise-placeholder.svg", body_part: "back", target_muscle: "upper back", equipment: "barbell", sets: 4, reps: "8-10", rest_seconds: 90, order_index: 1, created_at: now },
          { id: "we6", workout_day_id: "wd2", exercise_source_id: "0042", name: "Barbell Curl", gif_url: "/exercise-placeholder.svg", body_part: "upper arms", target_muscle: "biceps", equipment: "barbell", sets: 3, reps: "10-12", rest_seconds: 60, order_index: 2, created_at: now },
        ],
      },
      {
        id: "wd3",
        workout_plan_id: "wp1",
        day_label: "Day 3",
        title: "Legs",
        order_index: 2,
        created_at: now,
        exercises: [
          { id: "we7", workout_day_id: "wd3", exercise_source_id: "0043", name: "Barbell Back Squat", gif_url: "/exercise-placeholder.svg", body_part: "upper legs", target_muscle: "quads", equipment: "barbell", sets: 4, reps: "8", rest_seconds: 120, order_index: 0, created_at: now },
          { id: "we8", workout_day_id: "wd3", exercise_source_id: "0159", name: "Romanian Deadlift", gif_url: "/exercise-placeholder.svg", body_part: "upper legs", target_muscle: "hamstrings", equipment: "barbell", sets: 3, reps: "10", rest_seconds: 90, order_index: 1, created_at: now },
        ],
      },
      {
        id: "wd4",
        workout_plan_id: "wp1",
        day_label: "Day 4",
        title: "Shoulders",
        order_index: 3,
        created_at: now,
        exercises: [
          { id: "we9", workout_day_id: "wd4", exercise_source_id: "0378", name: "Overhead Barbell Press", gif_url: "/exercise-placeholder.svg", body_part: "shoulders", target_muscle: "delts", equipment: "barbell", sets: 4, reps: "8-10", rest_seconds: 90, order_index: 0, created_at: now },
          { id: "we10", workout_day_id: "wd4", exercise_source_id: "0396", name: "Dumbbell Lateral Raise", gif_url: "/exercise-placeholder.svg", body_part: "shoulders", target_muscle: "delts", equipment: "dumbbell", sets: 3, reps: "12-15", rest_seconds: 45, order_index: 1, created_at: now },
        ],
      },
    ],
  },
};

export const MOCK_NUTRITION_PLANS: Record<string, NutritionPlanFull> = {
  c1: {
    id: "np1",
    client_id: "c1",
    title: "Ahmed's Nutrition Plan",
    created_at: now,
    updated_at: now,
    meals: [
      {
        id: "nm1",
        nutrition_plan_id: "np1",
        name: "Breakfast",
        order_index: 0,
        created_at: now,
        foods: [
          { id: "nf1", nutrition_meal_id: "nm1", name: "Eggs", quantity: "3 whole", calories: 210, protein_g: 18, carbs_g: 1, fats_g: 15, order_index: 0, created_at: now },
          { id: "nf2", nutrition_meal_id: "nm1", name: "Whole Wheat Toast", quantity: "2 slices", calories: 160, protein_g: 6, carbs_g: 28, fats_g: 2, order_index: 1, created_at: now },
          { id: "nf3", nutrition_meal_id: "nm1", name: "Banana", quantity: "1 medium", calories: 105, protein_g: 1, carbs_g: 27, fats_g: 0, order_index: 2, created_at: now },
        ],
      },
      {
        id: "nm2",
        nutrition_plan_id: "np1",
        name: "Lunch",
        order_index: 1,
        created_at: now,
        foods: [
          { id: "nf4", nutrition_meal_id: "nm2", name: "Grilled Chicken Breast", quantity: "200g", calories: 330, protein_g: 62, carbs_g: 0, fats_g: 7, order_index: 0, created_at: now },
          { id: "nf5", nutrition_meal_id: "nm2", name: "Jasmine Rice", quantity: "1.5 cups cooked", calories: 300, protein_g: 6, carbs_g: 66, fats_g: 1, order_index: 1, created_at: now },
          { id: "nf6", nutrition_meal_id: "nm2", name: "Mixed Vegetables", quantity: "1 cup", calories: 60, protein_g: 3, carbs_g: 12, fats_g: 0, order_index: 2, created_at: now },
        ],
      },
      {
        id: "nm3",
        nutrition_plan_id: "np1",
        name: "Dinner",
        order_index: 2,
        created_at: now,
        foods: [
          { id: "nf7", nutrition_meal_id: "nm3", name: "Salmon Fillet", quantity: "180g", calories: 370, protein_g: 40, carbs_g: 0, fats_g: 22, order_index: 0, created_at: now },
          { id: "nf8", nutrition_meal_id: "nm3", name: "Sweet Potato", quantity: "1 medium", calories: 115, protein_g: 2, carbs_g: 27, fats_g: 0, order_index: 1, created_at: now },
        ],
      },
    ],
  },
};

export const MOCK_PROGRESS: Record<string, ProgressRecord[]> = {
  c1: [
    { id: "pr1", client_id: "c1", recorded_at: daysAgo(56), weight_kg: 88, chest_cm: 104, waist_cm: 92, hips_cm: 100, arms_cm: 36, thighs_cm: 58, notes: "Starting point", created_at: now },
    { id: "pr2", client_id: "c1", recorded_at: daysAgo(42), weight_kg: 86.4, chest_cm: 104.5, waist_cm: 90, hips_cm: 99, arms_cm: 36.5, thighs_cm: 58, notes: null, created_at: now },
    { id: "pr3", client_id: "c1", recorded_at: daysAgo(28), weight_kg: 84.8, chest_cm: 105, waist_cm: 88.5, hips_cm: 98, arms_cm: 37, thighs_cm: 58.5, notes: null, created_at: now },
    { id: "pr4", client_id: "c1", recorded_at: daysAgo(14), weight_kg: 83.5, chest_cm: 106, waist_cm: 87, hips_cm: 97.5, arms_cm: 37.5, thighs_cm: 59, notes: "Good progress", created_at: now },
    { id: "pr5", client_id: "c1", recorded_at: daysAgo(1), weight_kg: 82, chest_cm: 107, waist_cm: 86, hips_cm: 97, arms_cm: 38, thighs_cm: 59.5, notes: null, created_at: now },
  ],
};
