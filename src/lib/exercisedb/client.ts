import "server-only";
import type {
  ExerciseDbExercise,
  ExerciseSearchParams,
  ExerciseSearchResult,
} from "./types";
import {
  MOCK_EXERCISES,
  MOCK_BODY_PARTS,
  MOCK_TARGETS,
  MOCK_EQUIPMENT,
} from "./mock-data";

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST || "exercisedb.p.rapidapi.com";
const BASE_URL = `https://${RAPIDAPI_HOST}`;

// This RapidAPI plan has a very small monthly request quota, and the data
// (names, body parts, gifs) never changes — cache aggressively to protect it.
const LIST_CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24h
const FILTERS_CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7d

// The API silently caps every page at 10 results regardless of a higher
// requested `limit` — request no more than that so pagination stays honest.
const UPSTREAM_MAX_PAGE_SIZE = 10;

const cache = new Map<string, { expires: number; data: unknown }>();

async function rapidFetchJson<T>(path: string, ttlMs: number): Promise<T> {
  const cached = cache.get(path);
  if (cached && cached.expires > Date.now()) {
    return cached.data as T;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      headers: {
        "x-rapidapi-key": RAPIDAPI_KEY ?? "",
        "x-rapidapi-host": RAPIDAPI_HOST,
      },
      signal: controller.signal,
    });

    if (!res.ok) {
      throw new Error(`ExerciseDB request failed: ${res.status}`);
    }

    const data = (await res.json()) as T;
    cache.set(path, { expires: Date.now() + ttlMs, data });
    return data;
  } finally {
    clearTimeout(timeout);
  }
}

interface RawExerciseDbExercise {
  id?: string;
  _id?: string;
  exerciseId?: string;
  name?: string;
  gifUrl?: string;
  bodyPart?: string;
  target?: string;
  equipment?: string;
  secondaryMuscles?: string[];
  instructions?: string[];
}

function normalize(raw: RawExerciseDbExercise): ExerciseDbExercise {
  const id = String(raw.id ?? raw._id ?? raw.exerciseId ?? "");
  return {
    id,
    name: raw.name ?? "",
    // This plan doesn't return a gif URL directly — the binary endpoint
    // requires our secret key, so we proxy it through our own API route
    // instead of ever exposing that key to the browser.
    gifUrl: raw.gifUrl ?? (id ? `/api/exercises/gif?id=${encodeURIComponent(id)}` : "/exercise-placeholder.svg"),
    bodyPart: raw.bodyPart ?? "",
    target: raw.target ?? "",
    equipment: raw.equipment ?? "",
    secondaryMuscles: raw.secondaryMuscles ?? [],
    instructions: raw.instructions ?? [],
  };
}

function filterMock(params: ExerciseSearchParams): ExerciseDbExercise[] {
  const { query, bodyPart, target, equipment } = params;
  return MOCK_EXERCISES.filter((ex) => {
    if (bodyPart && ex.bodyPart !== bodyPart) return false;
    if (target && ex.target !== target) return false;
    if (equipment && ex.equipment !== equipment) return false;
    if (query && !ex.name.toLowerCase().includes(query.toLowerCase()))
      return false;
    return true;
  });
}

function paginate<T>(items: T[], offset: number, limit: number) {
  return items.slice(offset, offset + limit);
}

/**
 * Search ExerciseDB exercises, isolated behind this service so the provider
 * can be swapped later without touching the Workout Builder. Falls back to
 * curated mock data if no API key is configured or the request fails, so
 * the UI never crashes and existing workouts keep working.
 *
 * This API only supports filtering by a single facet per request
 * (bodyPart, target, equipment or name), so when several filters are set
 * we pick one to query upstream (in that priority) and apply the rest as a
 * light client-side refinement over that page.
 */
export async function searchExercises(
  params: ExerciseSearchParams
): Promise<ExerciseSearchResult> {
  const { query, bodyPart, target, equipment, limit = 24, offset = 0 } = params;

  if (!RAPIDAPI_KEY) {
    const filtered = filterMock(params);
    return {
      exercises: paginate(filtered, offset, limit),
      hasMore: offset + limit < filtered.length,
      offset,
      limit,
      source: "mock",
    };
  }

  const pageSize = Math.min(limit, UPSTREAM_MAX_PAGE_SIZE);

  try {
    let path: string;
    if (bodyPart) path = `/exercises/bodyPart/${encodeURIComponent(bodyPart)}`;
    else if (target) path = `/exercises/target/${encodeURIComponent(target)}`;
    else if (equipment) path = `/exercises/equipment/${encodeURIComponent(equipment)}`;
    else if (query) path = `/exercises/name/${encodeURIComponent(query)}`;
    else path = "/exercises";

    path += `?limit=${pageSize}&offset=${offset}`;

    const raw = await rapidFetchJson<RawExerciseDbExercise[]>(path, LIST_CACHE_TTL_MS);
    let exercises = raw.map(normalize);
    const rawCount = exercises.length;

    // Refine by any secondary filters the primary endpoint didn't cover.
    // This only narrows the current page (the API can't combine facets),
    // which is an acceptable trade-off for a coach browsing exercises.
    if (bodyPart && !path.startsWith("/exercises/bodyPart/"))
      exercises = exercises.filter((e) => e.bodyPart === bodyPart);
    if (target && !path.startsWith("/exercises/target/"))
      exercises = exercises.filter((e) => e.target === target);
    if (equipment && !path.startsWith("/exercises/equipment/"))
      exercises = exercises.filter((e) => e.equipment === equipment);
    if (query && !path.startsWith("/exercises/name/"))
      exercises = exercises.filter((e) =>
        e.name.toLowerCase().includes(query.toLowerCase())
      );

    return {
      exercises,
      hasMore: rawCount === pageSize,
      offset,
      limit: pageSize,
      source: "live",
    };
  } catch {
    const filtered = filterMock(params);
    return {
      exercises: paginate(filtered, offset, limit),
      hasMore: offset + limit < filtered.length,
      offset,
      limit,
      source: "mock",
    };
  }
}

export async function getBodyPartList(): Promise<string[]> {
  if (!RAPIDAPI_KEY) return MOCK_BODY_PARTS;
  try {
    return await rapidFetchJson<string[]>("/exercises/bodyPartList", FILTERS_CACHE_TTL_MS);
  } catch {
    return MOCK_BODY_PARTS;
  }
}

export async function getTargetList(): Promise<string[]> {
  if (!RAPIDAPI_KEY) return MOCK_TARGETS;
  try {
    return await rapidFetchJson<string[]>("/exercises/targetList", FILTERS_CACHE_TTL_MS);
  } catch {
    return MOCK_TARGETS;
  }
}

export async function getEquipmentList(): Promise<string[]> {
  if (!RAPIDAPI_KEY) return MOCK_EQUIPMENT;
  try {
    return await rapidFetchJson<string[]>("/exercises/equipmentList", FILTERS_CACHE_TTL_MS);
  } catch {
    return MOCK_EQUIPMENT;
  }
}

const VALID_RESOLUTIONS = new Set(["180", "360", "720", "1080"]);

/**
 * Fetches the exercise GIF binary server-side (the endpoint requires our
 * secret RapidAPI key) so it can be streamed back through our own proxy
 * route without ever exposing that key to the browser.
 */
export async function fetchExerciseGif(
  exerciseId: string,
  resolution = "180"
): Promise<{ body: ArrayBuffer; contentType: string } | null> {
  if (!RAPIDAPI_KEY) return null;

  const safeResolution = VALID_RESOLUTIONS.has(resolution) ? resolution : "180";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(
      `${BASE_URL}/image?exerciseId=${encodeURIComponent(exerciseId)}&resolution=${safeResolution}`,
      {
        headers: {
          "x-rapidapi-key": RAPIDAPI_KEY,
          "x-rapidapi-host": RAPIDAPI_HOST,
        },
        signal: controller.signal,
      }
    );

    if (!res.ok) return null;
    const body = await res.arrayBuffer();
    return { body, contentType: res.headers.get("content-type") ?? "image/gif" };
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}
