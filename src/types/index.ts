export type TitleKind = "movie" | "tv";

export interface StreamingProvider {
  providerId: number;
  name: string;
  logoPath: string | null;
  type: "flatrate" | "rent" | "buy" | "free" | "ads";
}

export interface Title {
  id: string;
  tmdbId: number;
  kind: TitleKind;
  title: string;
  overview: string;
  releaseDate: string;
  runtime: number | null;
  posterPath: string | null;
  chronologicalOrder: number;
  releaseOrder: number;
  providers: StreamingProvider[];
}

export interface Franchise {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  backdropPath: string | null;
  /** País (ISO 3166-1 alpha-2) con el que se resolvió la disponibilidad. */
  country: string;
  titles: Title[];
}

export interface LoreCap {
  titleId: string;
  bullets: string[];
  generatedAt: string;
}

export interface Recommendation {
  tmdbId: number;
  title: string;
  posterPath: string | null;
  reason: string;
}
