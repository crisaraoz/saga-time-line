import Image from "next/image";
import { RecommendationCarousel } from "@/components/recommendations/RecommendationCarousel";
import { Timeline } from "@/components/timeline/Timeline";
import { ProgressPanel } from "@/components/watch/ProgressPanel";
import { WatchProgressProvider } from "@/components/watch/WatchProgressProvider";
import { isTmdbConfigured } from "@/lib/tmdb/client";
import { backdropUrl } from "@/lib/tmdb/images";
import type { Franchise, LoreCap, Recommendation } from "@/types";

interface FranchiseViewProps {
  franchise: Franchise;
  recommendations: Recommendation[];
  loreCaps: Record<string, LoreCap>;
}

export function FranchiseView({
  franchise,
  recommendations,
  loreCaps,
}: FranchiseViewProps) {
  const { name, tagline, backdropPath, slug, titles } = franchise;
  const backdrop = backdropUrl(backdropPath, "w780");

  return (
    <main className="mx-auto w-full max-w-md flex-1 overflow-x-hidden pb-16 md:max-w-2xl lg:max-w-6xl lg:px-8 lg:pt-8">
      <WatchProgressProvider slug={slug}>
        <div className="min-w-0 lg:grid lg:grid-cols-[minmax(280px,360px)_minmax(0,1fr)] lg:items-start lg:gap-8">
          <aside className="lg:self-start">
            <div className="lg:border-cinema-border lg:bg-cinema-surface lg:overflow-hidden lg:rounded-2xl lg:border">
              {backdrop && (
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={backdrop}
                    alt={name}
                    fill
                    priority
                    sizes="(min-width: 1024px) 360px, 100vw"
                    className="object-cover"
                  />
                  <div className="from-cinema-bg via-cinema-bg/70 absolute inset-0 bg-gradient-to-t to-transparent lg:from-cinema-surface lg:via-cinema-surface/40" />
                </div>
              )}

              <div
                className={
                  backdrop
                    ? "relative -mt-6 px-4 lg:mt-0 lg:px-4 lg:pb-4 lg:pt-3"
                    : "px-4 pt-5 lg:px-4 lg:pb-4 lg:pt-4"
                }
              >
                <p className="text-cinema-accent max-w-full text-[11px] font-semibold uppercase tracking-widest">
                  Ruta de visualización
                </p>
                <h1 className="mt-1 max-w-full text-2xl font-bold tracking-tight break-words lg:text-[1.75rem] lg:leading-tight">
                  {name}
                </h1>
                {tagline && (
                  <p className="text-cinema-muted mt-1 text-sm">{tagline}</p>
                )}

                {!isTmdbConfigured() && (
                  <p className="border-cinema-accent/30 bg-cinema-accent-soft/40 text-cinema-accent mt-3 rounded-lg border px-3 py-2 text-[11px]">
                    Datos de ejemplo. Agregá <code>TMDB_API_KEY</code> en{" "}
                    <code>.env.local</code> para traer la info real.
                  </p>
                )}

                <ProgressPanel titleIds={titles.map((title) => title.id)} />
              </div>
            </div>
          </aside>

          <div className="mt-6 min-w-0 px-4 lg:mt-0 lg:px-0">
            <Timeline franchise={franchise} loreCaps={loreCaps} />
          </div>
        </div>

        <RecommendationCarousel items={recommendations} />
      </WatchProgressProvider>
    </main>
  );
}
