"use client";

import { useWatchProgressContext } from "@/components/watch/WatchProgressProvider";

export function ProgressPanel({ titleIds }: { titleIds: string[] }) {
  const { watchedIds, reset } = useWatchProgressContext();

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

      <div className="bg-cinema-surface border-cinema-border mt-4 flex min-w-0 gap-1 overflow-hidden rounded-full border p-1 text-xs font-medium">
        <span className="bg-cinema-accent text-cinema-bg min-w-0 flex-1 truncate rounded-full px-3 py-1.5 text-center">
          Cronológico
        </span>
        <span className="text-cinema-muted min-w-0 flex-1 truncate rounded-full px-3 py-1.5 text-center">
          Por estreno
        </span>
      </div>
    </div>
  );
}
