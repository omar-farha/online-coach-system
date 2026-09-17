import type { ExerciseDbExercise } from "./types";

const PLACEHOLDER_GIF = "/exercise-placeholder.svg";

/**
 * Realistic fallback data used when RAPIDAPI_KEY is missing or ExerciseDB is
 * unreachable, so the Workout Builder and Client Workout view stay
 * functional during development or a provider outage.
 */
export const MOCK_EXERCISES: ExerciseDbExercise[] = [
  { id: "m001", name: "Barbell Bench Press", gifUrl: PLACEHOLDER_GIF, bodyPart: "chest", target: "pectorals", equipment: "barbell" },
  { id: "m002", name: "Incline Dumbbell Press", gifUrl: PLACEHOLDER_GIF, bodyPart: "chest", target: "pectorals", equipment: "dumbbell" },
  { id: "m003", name: "Cable Chest Fly", gifUrl: PLACEHOLDER_GIF, bodyPart: "chest", target: "pectorals", equipment: "cable" },
  { id: "m004", name: "Push Up", gifUrl: PLACEHOLDER_GIF, bodyPart: "chest", target: "pectorals", equipment: "body weight" },
  { id: "m005", name: "Dips", gifUrl: PLACEHOLDER_GIF, bodyPart: "chest", target: "triceps", equipment: "body weight" },
  { id: "m006", name: "Lat Pulldown", gifUrl: PLACEHOLDER_GIF, bodyPart: "back", target: "lats", equipment: "cable" },
  { id: "m007", name: "Barbell Bent Over Row", gifUrl: PLACEHOLDER_GIF, bodyPart: "back", target: "upper back", equipment: "barbell" },
  { id: "m008", name: "Seated Cable Row", gifUrl: PLACEHOLDER_GIF, bodyPart: "back", target: "upper back", equipment: "cable" },
  { id: "m009", name: "Pull Up", gifUrl: PLACEHOLDER_GIF, bodyPart: "back", target: "lats", equipment: "body weight" },
  { id: "m010", name: "Deadlift", gifUrl: PLACEHOLDER_GIF, bodyPart: "back", target: "spine", equipment: "barbell" },
  { id: "m011", name: "Barbell Back Squat", gifUrl: PLACEHOLDER_GIF, bodyPart: "upper legs", target: "quads", equipment: "barbell" },
  { id: "m012", name: "Leg Press", gifUrl: PLACEHOLDER_GIF, bodyPart: "upper legs", target: "quads", equipment: "leverage machine" },
  { id: "m013", name: "Romanian Deadlift", gifUrl: PLACEHOLDER_GIF, bodyPart: "upper legs", target: "hamstrings", equipment: "barbell" },
  { id: "m014", name: "Walking Lunge", gifUrl: PLACEHOLDER_GIF, bodyPart: "upper legs", target: "glutes", equipment: "dumbbell" },
  { id: "m015", name: "Leg Extension", gifUrl: PLACEHOLDER_GIF, bodyPart: "upper legs", target: "quads", equipment: "leverage machine" },
  { id: "m016", name: "Seated Calf Raise", gifUrl: PLACEHOLDER_GIF, bodyPart: "lower legs", target: "calves", equipment: "leverage machine" },
  { id: "m017", name: "Standing Calf Raise", gifUrl: PLACEHOLDER_GIF, bodyPart: "lower legs", target: "calves", equipment: "body weight" },
  { id: "m018", name: "Overhead Barbell Press", gifUrl: PLACEHOLDER_GIF, bodyPart: "shoulders", target: "delts", equipment: "barbell" },
  { id: "m019", name: "Dumbbell Lateral Raise", gifUrl: PLACEHOLDER_GIF, bodyPart: "shoulders", target: "delts", equipment: "dumbbell" },
  { id: "m020", name: "Face Pull", gifUrl: PLACEHOLDER_GIF, bodyPart: "shoulders", target: "delts", equipment: "cable" },
  { id: "m021", name: "Rear Delt Fly", gifUrl: PLACEHOLDER_GIF, bodyPart: "shoulders", target: "delts", equipment: "dumbbell" },
  { id: "m022", name: "Barbell Curl", gifUrl: PLACEHOLDER_GIF, bodyPart: "upper arms", target: "biceps", equipment: "barbell" },
  { id: "m023", name: "Dumbbell Hammer Curl", gifUrl: PLACEHOLDER_GIF, bodyPart: "upper arms", target: "biceps", equipment: "dumbbell" },
  { id: "m024", name: "Triceps Pushdown", gifUrl: PLACEHOLDER_GIF, bodyPart: "upper arms", target: "triceps", equipment: "cable" },
  { id: "m025", name: "Skullcrusher", gifUrl: PLACEHOLDER_GIF, bodyPart: "upper arms", target: "triceps", equipment: "barbell" },
  { id: "m026", name: "Hanging Leg Raise", gifUrl: PLACEHOLDER_GIF, bodyPart: "waist", target: "abs", equipment: "body weight" },
  { id: "m027", name: "Cable Crunch", gifUrl: PLACEHOLDER_GIF, bodyPart: "waist", target: "abs", equipment: "cable" },
  { id: "m028", name: "Plank", gifUrl: PLACEHOLDER_GIF, bodyPart: "waist", target: "abs", equipment: "body weight" },
  { id: "m029", name: "Russian Twist", gifUrl: PLACEHOLDER_GIF, bodyPart: "waist", target: "abs", equipment: "body weight" },
  { id: "m030", name: "Treadmill Run", gifUrl: PLACEHOLDER_GIF, bodyPart: "cardio", target: "cardiovascular system", equipment: "machine" },
  { id: "m031", name: "Rowing Machine", gifUrl: PLACEHOLDER_GIF, bodyPart: "cardio", target: "cardiovascular system", equipment: "machine" },
  { id: "m032", name: "Kettlebell Swing", gifUrl: PLACEHOLDER_GIF, bodyPart: "cardio", target: "glutes", equipment: "kettlebell" },
];

export const MOCK_BODY_PARTS = Array.from(
  new Set(MOCK_EXERCISES.map((e) => e.bodyPart))
).sort();

export const MOCK_TARGETS = Array.from(
  new Set(MOCK_EXERCISES.map((e) => e.target))
).sort();

export const MOCK_EQUIPMENT = Array.from(
  new Set(MOCK_EXERCISES.map((e) => e.equipment))
).sort();
