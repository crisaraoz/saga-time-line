import type {
  TmdbMovieDetails,
  TmdbWatchProvider,
  TmdbWatchProviderCountry,
} from "@/lib/tmdb/types";
import type { StreamingProvider, Title } from "@/types";

const PROVIDER_TYPES = ["flatrate", "free", "ads", "rent", "buy"] as const;

export function titleIdFromTmdb(tmdbId: number): string {
  return `tmdb_${tmdbId}`;
}

function mapProviders(
  country: TmdbWatchProviderCountry | undefined,
): StreamingProvider[] {
  if (!country) return [];

  const seen = new Set<number>();
  const providers: StreamingProvider[] = [];

  for (const type of PROVIDER_TYPES) {
    const list = country[type] as TmdbWatchProvider[] | undefined;
    if (!list) continue;
    for (const provider of list) {
      // Un mismo proveedor puede aparecer como flatrate y rent; mostramos la mejor opción.
      if (seen.has(provider.provider_id)) continue;
      seen.add(provider.provider_id);
      providers.push({
        providerId: provider.provider_id,
        name: provider.provider_name,
        logoPath: provider.logo_path,
        type,
      });
    }
  }

  return providers;
}

export function toTitle(
  details: TmdbMovieDetails,
  options: { chronologicalOrder: number; releaseOrder: number; country: string },
): Title {
  const countryProviders = details["watch/providers"]?.results?.[options.country];

  return {
    id: titleIdFromTmdb(details.id),
    tmdbId: details.id,
    kind: "movie",
    title: details.title || details.original_title,
    overview: details.overview,
    releaseDate: details.release_date ?? "",
    runtime: details.runtime ?? null,
    posterPath: details.poster_path,
    chronologicalOrder: options.chronologicalOrder,
    releaseOrder: options.releaseOrder,
    providers: mapProviders(countryProviders),
  };
}
