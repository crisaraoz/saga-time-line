const cache = new Map<string, string>();
const FALLBACK = "tu país";

/** Convierte un código ISO 3166-1 alpha-2 en el nombre del país en español. */
export function countryName(code: string | null | undefined): string {
  if (!code) return FALLBACK;

  const upper = code.toUpperCase();
  const cached = cache.get(upper);
  if (cached) return cached;

  let name = upper;
  try {
    name = new Intl.DisplayNames(["es"], { type: "region" }).of(upper) ?? upper;
  } catch {
    // Runtime sin datos de ICU: dejamos el código.
  }

  cache.set(upper, name);
  return name;
}
