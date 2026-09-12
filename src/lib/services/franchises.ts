import {
  CURATED_FRANCHISES,
  slugToSearchQuery,
  type CuratedFranchise,
} from "@/data/curated-franchises";
import { withCache } from "@/lib/cache/memory-cache";
import {
  getCollection,
  getDefaultCountry,
  getMovieDetails,
  getMovieGenres,
  getMovieRecommendations,
  isTmdbConfigured,
  searchCollections,
} from "@/lib/tmdb/client";
import { titleIdFromTmdb, toTitle } from "@/lib/tmdb/mappers";
import type { TmdbCollection } from "@/lib/tmdb/types";
import { mockFranchise, mockLoreCaps, mockRecommendations } from "@/mocks/franchises";
import type { Franchise, LoreCap, Recommendation, Title } from "@/types";

const FRANCHISE_TTL = 1000 * 60 * 60 * 24; // 24 h
const RECS_TTL = 1000 * 60 * 60 * 24; // 24 h
const LORECAP_TTL = 1000 * 60 * 60 * 24 * 30; // 30 días
const GENRES_TTL = 1000 * 60 * 60 * 24 * 7; // 7 días

async function resolveCollections(
  slug: string,
  curated: CuratedFranchise | undefined,
): Promise<TmdbCollection[]> {
  if (curated) {
    return Promise.all(curated.collectionIds.map(getCollection));
  }

  // Un slug numérico es directamente el id de colección de TMDB.
  if (/^\d+$/.test(slug)) {
    return [await getCollection(Number(slug))];
  }

  // Si no, buscamos la colección en TMDB por el slug.
  const search = await searchCollections(slugToSearchQuery(slug));
  const first = search.results[0];
  if (!first) return [];
  return [await getCollection(first.id)];
}

function sortMovieIds(
  collections: TmdbCollection[],
  curated: CuratedFranchise | undefined,
): number[] {
  const parts = collections
    .flatMap((collection) => collection.parts)
    .filter((part) => part.release_date);

  const byReleaseDate = [...new Map(parts.map((p) => [p.id, p])).values()].sort((a, b) =>
    a.release_date.localeCompare(b.release_date),
  );

  if (!curated?.chronologicalOrder) {
    return byReleaseDate.map((part) => part.id);
  }

  const ordered = curated.chronologicalOrder.filter((id) =>
    byReleaseDate.some((part) => part.id === id),
  );
  const extras = byReleaseDate
    .map((part) => part.id)
    .filter((id) => !ordered.includes(id));

  return [...ordered, ...extras];
}

async function buildFranchiseFromTmdb(slug: string): Promise<Franchise | null> {
  const curated = CURATED_FRANCHISES[slug];
  const collections = await resolveCollections(slug, curated);
  if (collections.length === 0) return null;

  const movieIds = sortMovieIds(collections, curated);
  if (movieIds.length === 0) return null;

  const country = getDefaultCountry();
  const details = await Promise.all(movieIds.map(getMovieDetails));

  // El orden de estreno se calcula sobre las fechas reales, no sobre el de la colección.
  const releaseRank = new Map(
    [...details]
      .sort((a, b) => (a.release_date ?? "").localeCompare(b.release_date ?? ""))
      .map((movie, index) => [movie.id, index + 1]),
  );

  const titles: Title[] = details.map((movie, index) =>
    toTitle(movie, {
      chronologicalOrder: index + 1,
      releaseOrder: releaseRank.get(movie.id) ?? index + 1,
      country,
    }),
  );

  const primary = collections[collections.length - 1];

  return {
    id: `tmdb_collection_${collections.map((c) => c.id).join("_")}`,
    slug,
    name: curated?.name ?? primary.name,
    tagline: curated?.tagline ?? null,
    backdropPath: primary.backdrop_path,
    country,
    titles,
  };
}

export function getFranchiseBySlug(slug: string) {
  return withCache<Franchise | null>(`franchise:${slug}`, FRANCHISE_TTL, async () => {
    if (!isTmdbConfigured()) {
      return slug === mockFranchise.slug ? mockFranchise : null;
    }
    return buildFranchiseFromTmdb(slug);
  });
}

function getGenreMap() {
  return withCache<Record<number, string>>(`genres`, GENRES_TTL, async () => {
    const { genres } = await getMovieGenres();
    return Object.fromEntries(genres.map((genre) => [genre.id, genre.name]));
  });
}

export function getRecommendations(slug: string) {
  return withCache<Recommendation[]>(`recs:${slug}`, RECS_TTL, async () => {
    if (!isTmdbConfigured()) {
      return slug === mockFranchise.slug ? mockRecommendations : [];
    }

    const franchise = await getFranchiseBySlug(slug);
    const seedId =
      CURATED_FRANCHISES[slug]?.recommendationSeedId ??
      franchise.value?.titles.at(-1)?.tmdbId;
    if (!seedId) return [];

    const franchiseTmdbIds = new Set(
      franchise.value?.titles.map((title) => title.tmdbId) ?? [],
    );

    const [{ results }, { value: genreMap }] = await Promise.all([
      getMovieRecommendations(seedId),
      getGenreMap(),
    ]);

    return results
      .filter((movie) => !franchiseTmdbIds.has(movie.id))
      .slice(0, 12)
      .map((movie) => ({
        tmdbId: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
        reason:
          movie.genre_ids.map((id) => genreMap[id]).filter(Boolean).slice(0, 2).join(" · ") ||
          (movie.release_date ? movie.release_date.slice(0, 4) : ""),
      }));
  });
}

export interface FranchiseSearchResult {
  /** Id de colección de TMDB, usable como slug en /api/franchises/[slug]. */
  slug: string;
  name: string;
  posterPath: string | null;
}

function curatedMatches(query: string): FranchiseSearchResult[] {
  const needle = query.toLowerCase().trim();
  return Object.values(CURATED_FRANCHISES)
    .filter(
      (franchise) =>
        franchise.name.toLowerCase().includes(needle) ||
        franchise.slug.includes(needle.replace(/\s+/g, "-")),
    )
    .map((franchise) => ({
      slug: franchise.slug,
      name: franchise.name,
      posterPath: null,
    }));
}

/** Si el id de colección pertenece a una franquicia curada, usamos su slug. */
function resolveSearchSlug(collectionId: number): string {
  const curated = Object.values(CURATED_FRANCHISES).find((franchise) =>
    franchise.collectionIds.includes(collectionId),
  );
  return curated?.slug ?? String(collectionId);
}

export function searchFranchises(query: string) {
  return withCache<FranchiseSearchResult[]>(
    `search:${query.toLowerCase()}`,
    FRANCHISE_TTL,
    async () => {
      if (query.trim().length < 2) return [];

      const curated = curatedMatches(query);
      if (!isTmdbConfigured()) return curated;

      const { results } = await searchCollections(query);
      const fromTmdb = results.slice(0, 10).map((collection) => ({
        slug: resolveSearchSlug(collection.id),
        name: collection.name,
        posterPath: collection.poster_path,
      }));

      // Curadas primero; sin duplicar por slug.
      const seen = new Set(curated.map((item) => item.slug));
      const merged = [...curated];
      for (const item of fromTmdb) {
        if (seen.has(item.slug)) continue;
        seen.add(item.slug);
        merged.push(item);
      }
      return merged.slice(0, 10);
    },
  );
}

export function getLoreCap(titleId: string) {
  return withCache<LoreCap | null>(`lorecap:${titleId}`, LORECAP_TTL, async () => {
    // Acá irá la llamada a la IA si no hay documento en MongoDB.
    return mockLoreCaps[titleId] ?? null;
  });
}

export { titleIdFromTmdb };
