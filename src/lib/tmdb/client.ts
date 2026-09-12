import type {
  TmdbCollection,
  TmdbCollectionSearchResult,
  TmdbMovieDetails,
  TmdbMovieSummary,
  TmdbPaginated,
} from "@/lib/tmdb/types";

const BASE_URL = "https://api.themoviedb.org/3";
const REVALIDATE_SECONDS = 60 * 60 * 24; // 24 h

export { backdropUrl, posterUrl } from "@/lib/tmdb/images";
export type { BackdropSize, PosterSize } from "@/lib/tmdb/images";

export function isTmdbConfigured(): boolean {
  return Boolean(process.env.TMDB_API_KEY);
}

export function getDefaultCountry(): string {
  return (process.env.TMDB_DEFAULT_COUNTRY ?? "AR").toUpperCase();
}

export function getTmdbLanguage(): string {
  return process.env.TMDB_LANGUAGE ?? "es-ES";
}

export class TmdbError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "TmdbError";
  }
}

// TMDB acepta la API key v3 por query string o el token v4 como Bearer.
function buildRequest(path: string, params: Record<string, string>) {
  const key = process.env.TMDB_API_KEY;
  if (!key) throw new TmdbError("Falta la variable de entorno TMDB_API_KEY", 500);

  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set("language", getTmdbLanguage());
  for (const [name, value] of Object.entries(params)) {
    url.searchParams.set(name, value);
  }

  const isV4Token = key.startsWith("eyJ");
  const headers: HeadersInit = { accept: "application/json" };
  if (isV4Token) {
    headers.Authorization = `Bearer ${key}`;
  } else {
    url.searchParams.set("api_key", key);
  }

  return { url, headers };
}

async function tmdbFetch<T>(
  path: string,
  params: Record<string, string> = {},
): Promise<T> {
  const { url, headers } = buildRequest(path, params);

  const response = await fetch(url, {
    headers,
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new TmdbError(
      `TMDB respondió ${response.status} en ${path}`,
      response.status,
    );
  }

  return response.json() as Promise<T>;
}

export function searchCollections(query: string) {
  return tmdbFetch<TmdbPaginated<TmdbCollectionSearchResult>>("/search/collection", {
    query,
  });
}

export function getCollection(collectionId: number) {
  return tmdbFetch<TmdbCollection>(`/collection/${collectionId}`);
}

export function getMovieDetails(movieId: number) {
  return tmdbFetch<TmdbMovieDetails>(`/movie/${movieId}`, {
    append_to_response: "watch/providers",
  });
}

export function getMovieRecommendations(movieId: number) {
  return tmdbFetch<TmdbPaginated<TmdbMovieSummary>>(`/movie/${movieId}/recommendations`);
}

export function getMovieGenres() {
  return tmdbFetch<{ genres: { id: number; name: string }[] }>("/genre/movie/list");
}

export function getPopularMovies(page = 1) {
  return tmdbFetch<TmdbPaginated<TmdbMovieSummary>>("/movie/popular", {
    page: String(page),
  });
}

export function getTrendingMovies() {
  return tmdbFetch<TmdbPaginated<TmdbMovieSummary>>("/trending/movie/week");
}
