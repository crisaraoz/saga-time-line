import { CURATED_FRANCHISES } from "@/data/curated-franchises";
import { getDefaultCountry, getMovieDetails } from "@/lib/tmdb/client";
import { toTitle } from "@/lib/tmdb/mappers";
import { withCache } from "@/lib/cache/memory-cache";
import type { Franchise } from "@/types";

const TITLE_TTL = 1000 * 60 * 60 * 24;

function curatedSlugForCollection(collectionId: number): string | undefined {
  return Object.values(CURATED_FRANCHISES).find((franchise) =>
    franchise.collectionIds.includes(collectionId),
  )?.slug;
}

/**
 * Si la película pertenece a una colección, devolvemos su id para redirigir
 * a /f/[slug]. Si no, armamos una “franquicia” de un solo título.
 */
export function resolveTitleDestination(tmdbId: number) {
  return withCache<
    | { kind: "collection"; slug: string }
    | { kind: "standalone"; franchise: Franchise }
    | null
  >(`title-dest:${tmdbId}`, TITLE_TTL, async () => {
    try {
      const details = await getMovieDetails(tmdbId);
      const collectionId = details.belongs_to_collection?.id;
      if (collectionId) {
        return {
          kind: "collection",
          slug: curatedSlugForCollection(collectionId) ?? String(collectionId),
        };
      }

      const country = getDefaultCountry();
      const title = toTitle(details, {
        chronologicalOrder: 1,
        releaseOrder: 1,
        country,
      });

      return {
        kind: "standalone",
        franchise: {
          id: `tmdb_movie_${details.id}`,
          slug: `movie-${details.id}`,
          name: details.title || details.original_title,
          tagline: null,
          backdropPath: details.backdrop_path,
          country,
          titles: [title],
        },
      };
    } catch {
      return null;
    }
  });
}
