import {
  getPopularMovies,
  getTrendingMovies,
  isTmdbConfigured,
} from "@/lib/tmdb/client";
import { withCache } from "@/lib/cache/memory-cache";

export interface HomePoster {
  tmdbId: number;
  title: string;
  posterPath: string;
}

const POSTERS_TTL = 1000 * 60 * 60 * 6; // 6 h

/** Mezcla estable por día: “aleatorio” sin cambiar en cada request. */
function shuffleForToday<T>(items: T[]): T[] {
  const seed = Number(
    new Date().toISOString().slice(0, 10).replaceAll("-", ""),
  );
  const copy = [...items];
  let state = seed || 1;
  for (let i = copy.length - 1; i > 0; i -= 1) {
    state = (state * 1664525 + 1013904223) % 4294967296;
    const j = state % (i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function getHomePosters() {
  return withCache<{ top: HomePoster[]; bottom: HomePoster[] }>(
    "home:posters",
    POSTERS_TTL,
    async () => {
      if (!isTmdbConfigured()) {
        return { top: [], bottom: [] };
      }

      const [popular, trending] = await Promise.all([
        getPopularMovies(1),
        getTrendingMovies(),
      ]);

      const posters = shuffleForToday(
        [...popular.results, ...trending.results]
          .filter((movie) => movie.poster_path)
          .map((movie) => ({
            tmdbId: movie.id,
            title: movie.title,
            posterPath: movie.poster_path as string,
          })),
      );

      // Deduplicar por id manteniendo el orden mezclado.
      const seen = new Set<number>();
      const unique = posters.filter((poster) => {
        if (seen.has(poster.tmdbId)) return false;
        seen.add(poster.tmdbId);
        return true;
      });

      const half = Math.ceil(unique.length / 2);
      return {
        top: unique.slice(0, half).slice(0, 14),
        bottom: unique.slice(half).slice(0, 14),
      };
    },
  );
}
