export interface ExerciseDbExercise {
  id: string;
  name: string;
  gifUrl: string;
  bodyPart: string;
  target: string;
  equipment: string;
  secondaryMuscles?: string[];
  instructions?: string[];
}

export interface ExerciseSearchParams {
  query?: string;
  bodyPart?: string;
  target?: string;
  equipment?: string;
  limit?: number;
  offset?: number;
}

export interface ExerciseSearchResult {
  exercises: ExerciseDbExercise[];
  /** Whether another page is likely available (the API doesn't report a total). */
  hasMore: boolean;
  offset: number;
  limit: number;
  source: "live" | "mock";
}
