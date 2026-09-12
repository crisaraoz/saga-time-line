export interface CuratedFranchise {
  slug: string;
  name: string;
  tagline: string | null;
  /** Colecciones de TMDB que componen la franquicia. */
  collectionIds: number[];
  /**
   * Orden de visualización cuando no coincide con el de estreno.
   * Los títulos que no estén acá se agregan al final por fecha.
   */
  chronologicalOrder?: number[];
  /** Título del que se piden las recomendaciones finales. */
  recommendationSeedId?: number;
}

export const CURATED_FRANCHISES: Record<string, CuratedFranchise> = {
  "el-senor-de-los-anillos": {
    slug: "el-senor-de-los-anillos",
    name: "La Tierra Media",
    tagline: "De la aventura de Bilbo a la caída de Sauron",
    collectionIds: [121938, 119],
    chronologicalOrder: [49051, 57158, 122917, 120, 121, 122],
    recommendationSeedId: 122,
  },
};

export const DEFAULT_FRANCHISE_SLUG = "el-senor-de-los-anillos";

export function slugToSearchQuery(slug: string): string {
  return slug.replace(/-/g, " ");
}
