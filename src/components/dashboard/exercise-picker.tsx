"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { X, Search, Loader2, Plus, AlertTriangle } from "lucide-react";
import type { ExerciseDbExercise, ExerciseSearchResult } from "@/lib/exercisedb/types";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n/context";
import { translateExerciseTerm } from "@/lib/exercisedb/terms-ar";

interface Filters {
  bodyParts: string[];
  targets: string[];
  equipment: string[];
}

export function ExercisePicker({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (exercise: ExerciseDbExercise) => void;
}) {
  const { t, locale } = useLocale();
  const [query, setQuery] = useState("");
  const [bodyPart, setBodyPart] = useState("");
  const [target, setTarget] = useState("");
  const [equipment, setEquipment] = useState("");
  const [filters, setFilters] = useState<Filters>({ bodyParts: [], targets: [], equipment: [] });
  const [result, setResult] = useState<ExerciseSearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [offset, setOffset] = useState(0);
  const [items, setItems] = useState<ExerciseDbExercise[]>([]);
  const [preview, setPreview] = useState<ExerciseDbExercise | null>(null);

  const LIMIT = 24;

  const fetchExercises = useCallback(
    async (nextOffset: number, replace: boolean) => {
      setLoading(true);
      setError(false);
      try {
        const params = new URLSearchParams();
        if (query) params.set("query", query);
        if (bodyPart) params.set("bodyPart", bodyPart);
        if (target) params.set("target", target);
        if (equipment) params.set("equipment", equipment);
        params.set("limit", String(LIMIT));
        params.set("offset", String(nextOffset));

        const res = await fetch(`/api/exercises?${params.toString()}`);
        if (!res.ok) throw new Error("Request failed");
        const data: ExerciseSearchResult = await res.json();
        setResult(data);
        setItems((prev) => (replace ? data.exercises : [...prev, ...data.exercises]));
        setOffset(nextOffset);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    },
    [query, bodyPart, target, equipment]
  );

  useEffect(() => {
    if (!open) return;
    fetch("/api/exercises/filters")
      .then((res) => res.json())
      .then(setFilters)
      .catch(() => {});
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const timeout = setTimeout(() => fetchExercises(0, true), 250);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, query, bodyPart, target, equipment]);

  if (!open) return null;

  const hasMore = result?.hasMore ?? false;
  const pageSize = result?.limit ?? LIMIT;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative flex h-[92vh] w-full max-w-4xl flex-col rounded-t-3xl border border-border bg-surface sm:h-[85vh] sm:rounded-3xl">
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h3 className="font-display text-xl">{t("exercisePicker.title")}</h3>
          <button onClick={onClose} className="text-muted hover:text-foreground">
            <X size={22} />
          </button>
        </div>

        <div className="space-y-3 border-b border-border px-6 py-4">
          <div className="relative">
            <Search size={16} className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("exercisePicker.searchPlaceholder")}
              className="w-full rounded-full border border-border bg-background py-2.5 ps-10 pe-4 text-sm outline-none focus:border-accent"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <FilterSelect
              label={t("exercisePicker.bodyPart")}
              value={bodyPart}
              onChange={setBodyPart}
              options={filters.bodyParts}
              locale={locale}
            />
            <FilterSelect
              label={t("exercisePicker.targetMuscle")}
              value={target}
              onChange={setTarget}
              options={filters.targets}
              locale={locale}
            />
            <FilterSelect
              label={t("exercisePicker.equipment")}
              value={equipment}
              onChange={setEquipment}
              options={filters.equipment}
              locale={locale}
            />
          </div>
          {result?.source === "mock" && (
            <p className="flex items-center gap-1.5 text-xs text-amber-400">
              <AlertTriangle size={13} /> {t("exercisePicker.mockNotice")}
            </p>
          )}
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {error && items.length === 0 ? (
            <p className="py-12 text-center text-sm text-muted">{t("exercisePicker.loadError")}</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {items.map((exercise) => (
                <button
                  key={exercise.id}
                  onClick={() => setPreview(exercise)}
                  className="group flex flex-col overflow-hidden rounded-xl border border-border bg-background text-start transition-colors hover:border-accent/50"
                >
                  <div className="relative aspect-square bg-surface-2">
                    <Image src={exercise.gifUrl} alt={exercise.name} fill unoptimized className="object-cover" />
                  </div>
                  <div className="p-3">
                    <p className="line-clamp-2 text-xs font-medium">{exercise.name}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-wide text-muted">
                      {translateExerciseTerm(exercise.bodyPart, locale)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {loading && (
            <div className="flex justify-center py-8">
              <Loader2 className="animate-spin text-accent" size={22} />
            </div>
          )}

          {!loading && hasMore && (
            <div className="flex justify-center pt-4">
              <button
                onClick={() => fetchExercises(offset + pageSize, false)}
                className="rounded-full border border-border px-5 py-2 text-xs font-semibold uppercase tracking-wide text-muted hover:border-accent hover:text-accent"
              >
                {t("exercisePicker.loadMore")}
              </button>
            </div>
          )}

          {!loading && !error && items.length === 0 && (
            <p className="py-12 text-center text-sm text-muted">{t("exercisePicker.noResults")}</p>
          )}
        </div>
      </div>

      {preview && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80" onClick={() => setPreview(null)} />
          <div className="relative w-full max-w-md rounded-2xl border border-border bg-surface p-6">
            <div className="relative aspect-video overflow-hidden rounded-xl bg-surface-2">
              <Image src={preview.gifUrl} alt={preview.name} fill unoptimized className="object-cover" />
            </div>
            <h4 className="mt-4 text-lg font-semibold">{preview.name}</h4>
            <div className="mt-2 flex flex-wrap gap-2">
              <Tag>{translateExerciseTerm(preview.bodyPart, locale)}</Tag>
              <Tag>{translateExerciseTerm(preview.target, locale)}</Tag>
              <Tag>{translateExerciseTerm(preview.equipment, locale)}</Tag>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setPreview(null)}
                className="rounded-full border border-border px-4 py-2 text-sm text-muted hover:text-foreground"
              >
                {t("exercisePicker.previewCancel")}
              </button>
              <button
                onClick={() => {
                  onSelect(preview);
                  setPreview(null);
                  onClose();
                }}
                className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent-2"
              >
                <Plus size={15} /> {t("exercisePicker.addToWorkout")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
  locale,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  locale: "en" | "ar";
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "rounded-full border bg-background px-3.5 py-1.5 text-xs capitalize outline-none",
        value ? "border-accent text-accent" : "border-border text-muted"
      )}
    >
      <option value="">{label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt} className="capitalize">
          {translateExerciseTerm(opt, locale)}
        </option>
      ))}
    </select>
  );
}

function Tag({ children }: { children: string }) {
  return (
    <span className="rounded-full bg-surface-2 px-2.5 py-1 text-[11px] capitalize text-muted">
      {children}
    </span>
  );
}
