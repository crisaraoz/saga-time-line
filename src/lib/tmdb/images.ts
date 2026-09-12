const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export type PosterSize = "w92" | "w154" | "w185" | "w342" | "w500" | "original";
export type BackdropSize = "w300" | "w780" | "w1280" | "original";
export type LogoSize = "w45" | "w92" | "w154" | "w185" | "original";

export function posterUrl(path: string | null, size: PosterSize = "w185") {
  return path ? `${IMAGE_BASE_URL}/${size}${path}` : null;
}

export function backdropUrl(path: string | null, size: BackdropSize = "w780") {
  return path ? `${IMAGE_BASE_URL}/${size}${path}` : null;
}

export function logoUrl(path: string | null, size: LogoSize = "w92") {
  return path ? `${IMAGE_BASE_URL}/${size}${path}` : null;
}
