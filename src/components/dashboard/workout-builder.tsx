"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { toast } from "sonner";
import {
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  RefreshCw,
  Save,
  GripVertical,
} from "lucide-react";
import type { WorkoutPlanFull } from "@/types/database";
import type { ExerciseDbExercise } from "@/lib/exercisedb/types";
import { ExercisePicker } from "./exercise-picker";
import { Button } from "@/components/ui/button";
import { saveWorkoutPlanAction, type WorkoutDayInput } from "@/app/dashboard/workouts/actions";
import { useLocale } from "@/lib/i18n/context";
import type { TranslationKey } from "@/lib/i18n/translate";
import { translateExerciseTerm } from "@/lib/exercisedb/terms-ar";

interface BuilderExercise {
  id: string;
  exercise_source_id: string | null;
  name: string;
  gif_url: string | null;
  body_part: string | null;
  target_muscle: string | null;
  equipment: string | null;
  sets: number;
  reps: string;
  rest_seconds: number;
}

interface BuilderDay {
  id: string;
  day_label: string;
  title: string;
  exercises: BuilderExercise[];
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function fromPlan(
  plan: WorkoutPlanFull | null,
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string
): { title: string; days: BuilderDay[] } {
  if (!plan) {
    return {
      title: t("workouts.newPlanTitle"),
      days: [{ id: uid(), day_label: t("workouts.dayLabelDefault", { n: 1 }), title: "", exercises: [] }],
    };
  }
  return {
    title: plan.title,
    days: plan.days.map((d) => ({
      id: uid(),
      day_label: d.day_label,
      title: d.title,
      exercises: d.exercises.map((e) => ({
        id: uid(),
        exercise_source_id: e.exercise_source_id,
        name: e.name,
        gif_url: e.gif_url,
        body_part: e.body_part,
        target_muscle: e.target_muscle,
        equipment: e.equipment,
        sets: e.sets,
        reps: e.reps,
        rest_seconds: e.rest_seconds,
      })),
    })),
  };
}

export function WorkoutBuilder({
  clientId,
  initialPlan,
}: {
  clientId: string;
  initialPlan: WorkoutPlanFull | null;
}) {
  const { t, locale } = useLocale();
  const initial = fromPlan(initialPlan, t);
  const [title, setTitle] = useState(initial.title);
  const [days, setDays] = useState<BuilderDay[]>(initial.days);
  const [pickerTarget, setPickerTarget] = useState<
    { dayId: string; exerciseId?: string } | null
  >(null);
  const [pending, startTransition] = useTransition();

  function addDay() {
    setDays((d) => [
      ...d,
      { id: uid(), day_label: t("workouts.dayLabelDefault", { n: d.length + 1 }), title: "", exercises: [] },
    ]);
  }

  function removeDay(dayId: string) {
    setDays((d) => d.filter((day) => day.id !== dayId));
  }

  function moveDay(index: number, dir: -1 | 1) {
    setDays((d) => {
      const next = [...d];
      const target = index + dir;
      if (target < 0 || target >= next.length) return d;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function updateDay(dayId: string, patch: Partial<BuilderDay>) {
    setDays((d) => d.map((day) => (day.id === dayId ? { ...day, ...patch } : day)));
  }

  function removeExercise(dayId: string, exerciseId: string) {
    setDays((d) =>
      d.map((day) =>
        day.id === dayId
          ? { ...day, exercises: day.exercises.filter((e) => e.id !== exerciseId) }
          : day
      )
    );
  }

  function moveExercise(dayId: string, index: number, dir: -1 | 1) {
    setDays((d) =>
      d.map((day) => {
        if (day.id !== dayId) return day;
        const next = [...day.exercises];
        const target = index + dir;
        if (target < 0 || target >= next.length) return day;
        [next[index], next[target]] = [next[target], next[index]];
        return { ...day, exercises: next };
      })
    );
  }

  function updateExercise(dayId: string, exerciseId: string, patch: Partial<BuilderExercise>) {
    setDays((d) =>
      d.map((day) =>
        day.id === dayId
          ? {
              ...day,
              exercises: day.exercises.map((e) =>
                e.id === exerciseId ? { ...e, ...patch } : e
              ),
            }
          : day
      )
    );
  }

  function handlePickerSelect(exercise: ExerciseDbExercise) {
    if (!pickerTarget) return;
    const { dayId, exerciseId } = pickerTarget;

    if (exerciseId) {
      updateExercise(dayId, exerciseId, {
        exercise_source_id: exercise.id,
        name: exercise.name,
        gif_url: exercise.gifUrl,
        body_part: exercise.bodyPart,
        target_muscle: exercise.target,
        equipment: exercise.equipment,
      });
    } else {
      const newExercise: BuilderExercise = {
        id: uid(),
        exercise_source_id: exercise.id,
        name: exercise.name,
        gif_url: exercise.gifUrl,
        body_part: exercise.bodyPart,
        target_muscle: exercise.target,
        equipment: exercise.equipment,
        sets: 3,
        reps: "10",
        rest_seconds: 60,
      };
      setDays((d) =>
        d.map((day) =>
          day.id === dayId ? { ...day, exercises: [...day.exercises, newExercise] } : day
        )
      );
    }
    setPickerTarget(null);
  }

  function handleSave() {
    const payload: WorkoutDayInput[] = days.map((day) => ({
      day_label: day.day_label,
      title: day.title,
      exercises: day.exercises.map((e) => ({
        exercise_source_id: e.exercise_source_id,
        name: e.name,
        gif_url: e.gif_url,
        body_part: e.body_part,
        target_muscle: e.target_muscle,
        equipment: e.equipment,
        sets: e.sets,
        reps: e.reps,
        rest_seconds: e.rest_seconds,
      })),
    }));

    startTransition(async () => {
      const result = await saveWorkoutPlanAction(clientId, title, payload);
      if (result.success) toast.success(t("workouts.saved"));
      else toast.error(result.error ?? t("workouts.saveFailed"));
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="font-display w-full max-w-md rounded-xl border border-border bg-surface px-4 py-3 text-xl outline-none focus:border-accent"
          placeholder={t("workouts.planTitlePlaceholder")}
        />
        <Button onClick={handleSave} disabled={pending} className="gap-2">
          <Save size={16} /> {pending ? t("common.saving") : t("workouts.savePlan")}
        </Button>
      </div>

      <div className="space-y-6">
        {days.map((day, dayIndex) => (
          <div key={day.id} className="rounded-2xl border border-border bg-surface p-5">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => moveDay(dayIndex, -1)}
                  disabled={dayIndex === 0}
                  className="text-muted hover:text-accent disabled:opacity-30"
                >
                  <ChevronUp size={16} />
                </button>
                <button
                  onClick={() => moveDay(dayIndex, 1)}
                  disabled={dayIndex === days.length - 1}
                  className="text-muted hover:text-accent disabled:opacity-30"
                >
                  <ChevronDown size={16} />
                </button>
              </div>

              <input
                value={day.day_label}
                onChange={(e) => updateDay(day.id, { day_label: e.target.value })}
                className="w-28 rounded-lg border border-border bg-background px-3 py-2 text-sm font-semibold outline-none focus:border-accent"
              />
              <input
                value={day.title}
                onChange={(e) => updateDay(day.id, { title: e.target.value })}
                placeholder={t("workouts.dayLabelPlaceholder")}
                className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
              />
              <button
                onClick={() => removeDay(day.id)}
                className="rounded-full border border-border p-2 text-muted hover:border-red-500/50 hover:text-red-400"
              >
                <Trash2 size={15} />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {day.exercises.map((exercise, exIndex) => (
                <div
                  key={exercise.id}
                  className="flex flex-col gap-3 rounded-xl border border-border bg-background p-3 sm:flex-row sm:items-center"
                >
                  <div className="flex items-center gap-3">
                    <GripVertical size={14} className="hidden shrink-0 text-muted sm:block" />
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-surface-2">
                      {exercise.gif_url && (
                        <Image
                          src={exercise.gif_url}
                          alt={exercise.name}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{exercise.name}</p>
                      <p className="truncate text-xs capitalize text-muted">
                        {exercise.body_part && translateExerciseTerm(exercise.body_part, locale)}
                        {exercise.body_part && exercise.equipment && " • "}
                        {exercise.equipment && translateExerciseTerm(exercise.equipment, locale)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-wrap items-center gap-2 sm:justify-end">
                    <NumberField
                      label={t("workouts.sets")}
                      value={exercise.sets}
                      onChange={(v) => updateExercise(day.id, exercise.id, { sets: v })}
                    />
                    <TextField
                      label={t("workouts.reps")}
                      value={exercise.reps}
                      onChange={(v) => updateExercise(day.id, exercise.id, { reps: v })}
                    />
                    <NumberField
                      label={t("workouts.rest")}
                      value={exercise.rest_seconds}
                      onChange={(v) => updateExercise(day.id, exercise.id, { rest_seconds: v })}
                    />

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => moveExercise(day.id, exIndex, -1)}
                        disabled={exIndex === 0}
                        className="text-muted hover:text-accent disabled:opacity-30"
                      >
                        <ChevronUp size={15} />
                      </button>
                      <button
                        onClick={() => moveExercise(day.id, exIndex, 1)}
                        disabled={exIndex === day.exercises.length - 1}
                        className="text-muted hover:text-accent disabled:opacity-30"
                      >
                        <ChevronDown size={15} />
                      </button>
                      <button
                        onClick={() => setPickerTarget({ dayId: day.id, exerciseId: exercise.id })}
                        title={t("workouts.replaceExercise")}
                        className="ms-1 text-muted hover:text-accent"
                      >
                        <RefreshCw size={14} />
                      </button>
                      <button
                        onClick={() => removeExercise(day.id, exercise.id)}
                        title={t("workouts.removeExercise")}
                        className="text-muted hover:text-red-400"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={() => setPickerTarget({ dayId: day.id })}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border py-3 text-sm font-medium text-muted hover:border-accent hover:text-accent"
              >
                <Plus size={16} /> {t("workouts.addExercise")}
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addDay}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-border py-4 text-sm font-semibold uppercase tracking-wide text-muted hover:border-accent hover:text-accent"
      >
        <Plus size={18} /> {t("workouts.addDay")}
      </button>

      <ExercisePicker
        open={pickerTarget !== null}
        onClose={() => setPickerTarget(null)}
        onSelect={handlePickerSelect}
      />
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="flex items-center gap-1.5 text-xs text-muted">
      {label}
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-16 rounded-lg border border-border bg-surface px-2 py-1.5 text-center text-sm text-foreground outline-none focus:border-accent"
      />
    </label>
  );
}

function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex items-center gap-1.5 text-xs text-muted">
      {label}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-16 rounded-lg border border-border bg-surface px-2 py-1.5 text-center text-sm text-foreground outline-none focus:border-accent"
      />
    </label>
  );
}
