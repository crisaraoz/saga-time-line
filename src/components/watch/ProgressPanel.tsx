"use client";

import {
  useWatchProgressContext,
  type TimelineDensity,
} from "@/components/watch/WatchProgressProvider";
import { cn } from "@/lib/utils/cn";

const OPTIONS: { value: TimelineDensity; label: string }[] = [
  { value: "list", label: "Vista lista" },
  { value: "compact", label: "Vista compacta" },
];

export function ProgressPanel({ titleIds }: { titleIds: string[] }) {
  const { watchedIds, reset, density, setDensity } = useWatchProgressContext();

  const total = titleIds.length;
  const watched = titleIds.filter((id) => watchedIds.has(id)).length;
  const progress = total > 0 ? Math.round((watched / total) * 100) : 0;

  return (
    <div className="mt-4">
      <div className="text-cinema-muted mb-1.5 flex items-center justify-between text-xs">
        <span>
          {watched} de {total} vistas
        </span>
        <span className="flex items-center gap-2">
          {watched > 0 && (
            <button
              type="button"
              onClick={reset}
              className="hover:text-cinema-text underline underline-offset-2"
            >
              Reiniciar
            </button>
          )}
          <span className="tabular-nums">{progress}%</span>
        </span>
      </div>
      <div className="bg-cinema-elevated h-1.5 overflow-hidden rounded-full">
        <div
          className="bg-cinema-accent h-full rounded-full transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div
        role="group"
        aria-label="Densidad de la lista"
        className="bg-cinema-surface border-cinema-border mt-4 grid grid-cols-2 gap-1 rounded-full border p-1 text-xs font-medium"
      >
        {OPTIONS.map((option) => {
          const active = density === option.value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => setDensity(option.value)}
              className={cn(
                "rounded-full px-3 py-1.5 text-center transition-colors",
                active
                  ? "text-cinema-accent bg-cinema-accent/15"
                  : "text-cinema-muted hover:text-cinema-text",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
