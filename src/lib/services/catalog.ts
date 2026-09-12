import {
  listCuratedFranchises,
  type FranchiseCategory,
} from "@/data/curated-franchises";
import { withCache } from "@/lib/cache/memory-cache";
import { getCollection, getMovieDetails, isTmdbConfigured } from "@/lib/tmdb/client";

export interface CatalogItem {
  slug: string;
  name: string;
  tagline: string | null;
  category: FranchiseCategory;
  posterPath: string | null;
}

const CATALOG_TTL = 1000 * 60 * 60 * 12; // 12 h
const FETCH_CONCURRENCY = 8;

async function mapPool<T, R>(
  items: T[],
  concurrency: number,
  mapper: (item: T) => Promise<R>,
): Promise<R[]> {
  const results = new Array<R>(items.length);
  let next = 0;

  async function worker() {
    while (next < items.length) {
      const index = next;
      next += 1;
      results[index] = await mapper(items[index]);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, () => worker()),
  );
  return results;
}

async function resolvePosterPath(franchise: {
  collectionIds: number[];
  extraMovieIds?: number[];
}): Promise<string | null> {
  try {
    if (franchise.collectionIds[0]) {
      const collection = await getCollection(franchise.collectionIds[0]);
      if (collection.poster_path) return collection.poster_path;
    }
    if (franchise.extraMovieIds?.[0]) {
      const movie = await getMovieDetails(franchise.extraMovieIds[0]);
      return movie.poster_path ?? null;
    }
  } catch {
    return null;
  }
  return null;
}

/** Catálogo curado con pósters (caché larga: muchas llamadas a TMDB). */
export function getCuratedCatalog() {
  return withCache<CatalogItem[]>("catalog:curated-v1", CATALOG_TTL, async () => {
    const franchises = listCuratedFranchises();

    if (!isTmdbConfigured()) {
      return franchises.map((franchise) => ({
        slug: franchise.slug,
        name: franchise.name,
        tagline: franchise.tagline,
        category: franchise.category!,
        posterPath: null,
      }));
    }

    return mapPool(franchises, FETCH_CONCURRENCY, async (franchise) => ({
      slug: franchise.slug,
      name: franchise.name,
      tagline: franchise.tagline,
      category: franchise.category!,
      posterPath: await resolvePosterPath(franchise),
    }));
  });
}
