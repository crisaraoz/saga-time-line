import { CheckIcon, ChevronDownIcon } from "@/components/ui/icons";
import { Poster } from "@/components/ui/Poster";
import { LoreCapPanel } from "@/components/timeline/LoreCapPanel";
import { StreamingBadges } from "@/components/timeline/StreamingBadges";
import { cn } from "@/lib/utils/cn";
import { countryName } from "@/lib/utils/country";
import type { LoreCap, Title } from "@/types";

interface TimelineItemProps {
  title: Title;
  watched: boolean;
  isLast: boolean;
  country: string;
  loreCap?: LoreCap | null;
  onToggleWatched: (titleId: string) => void;
}

function formatRuntime(minutes: number | null) {
  if (!minutes) return null;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest === 0 ? `${hours} h` : `${hours} h ${rest} min`;
}

export function TimelineItem({
  title,
  watched,
  isLast,
  country,
  loreCap,
  onToggleWatched,
}: TimelineItemProps) {
  const runtime = formatRuntime(title.runtime);
  const year = title.releaseDate.slice(0, 4);
  const place = countryName(country);

  return (
    <li className="relative pb-3 pl-12 lg:pb-4">
      {!isLast && (
        <span
          aria-hidden
          className={cn(
            "absolute bottom-0 left-[19px] top-12 w-0.5",
            watched ? "bg-cinema-done/40" : "bg-cinema-border",
          )}
        />
      )}

      <button
        type="button"
        onClick={() => onToggleWatched(title.id)}
        aria-pressed={watched}
        aria-label={
          watched
            ? `Marcar ${title.title} como no vista`
            : `Marcar ${title.title} como vista`
        }
        className={cn(
          "focus-visible:ring-cinema-accent absolute left-0 top-2 flex size-10 items-center justify-center rounded-full border-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 active:scale-95",
          watched
            ? "border-cinema-done bg-cinema-done/15 text-cinema-done"
            : "border-cinema-border bg-cinema-surface text-cinema-muted hover:border-cinema-muted",
        )}
      >
        {watched ? <CheckIcon className="size-4" /> : title.chronologicalOrder}
      </button>

      <details className="group bg-cinema-surface border-cinema-border hover:border-cinema-muted/40 overflow-hidden rounded-2xl border transition-colors">
        <summary className="flex cursor-pointer items-center gap-3 p-3 active:opacity-80 lg:gap-4 lg:p-4">
          <Poster
            path={title.posterPath}
            alt={title.title}
            size="w185"
            sizes="(min-width: 1024px) 64px, 44px"
            className={cn("w-11 lg:w-16", watched && "opacity-60")}
          />
          <div className="min-w-0 flex-1">
            <p
              className={cn(
                "text-sm font-semibold leading-snug lg:text-base",
                watched && "text-cinema-muted line-through decoration-1",
              )}
            >
              {title.title}
            </p>
            <p className="text-cinema-muted mt-0.5 text-xs lg:text-sm">
              {year}
              {runtime && ` · ${runtime}`}
              {` · #${title.releaseOrder} por estreno`}
            </p>
          </div>
          <ChevronDownIcon className="text-cinema-muted size-5 shrink-0 transition-transform group-open:rotate-180" />
        </summary>

        <div className="border-cinema-border space-y-3 border-t px-3.5 pb-4 pt-3 lg:px-5 lg:pb-5 lg:pt-4">
          <p className="text-cinema-muted text-sm leading-relaxed">{title.overview}</p>

          {/* En desktop hay ancho de sobra: plataformas y LoreCap van al lado */}
          <div className="gap-5 lg:flex lg:items-start">
            <div className="lg:w-64 lg:shrink-0">
              <p className="text-cinema-muted mb-2 text-[11px] font-semibold uppercase tracking-wide">
                Dónde ver en {place}
              </p>
              <StreamingBadges providers={title.providers} country={place} />
            </div>

            <div className="mt-3 flex-1 space-y-3 lg:mt-0">
              <LoreCapPanel loreCap={loreCap} />

              <button
                type="button"
                onClick={() => onToggleWatched(title.id)}
                className={cn(
                  "w-full rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors",
                  watched
                    ? "border-cinema-border text-cinema-muted hover:bg-cinema-elevated"
                    : "border-cinema-done/40 text-cinema-done hover:bg-cinema-done/10",
                )}
              >
                {watched ? "Desmarcar" : "Marcar como vista"}
              </button>
            </div>
          </div>
        </div>
      </details>
    </li>
  );
}
