import { titleIdFromTmdb } from "@/lib/tmdb/mappers";
import type { Franchise, LoreCap, Recommendation } from "@/types";

const NETFLIX = { providerId: 8, name: "Netflix", logoPath: null } as const;
const MAX = { providerId: 1899, name: "Max", logoPath: null } as const;
const PRIME = { providerId: 119, name: "Prime Video", logoPath: null } as const;

// Fallback para desarrollar sin TMDB_API_KEY. Los ids coinciden con los de TMDB.
export const mockFranchise: Franchise = {
  id: "fr_lotr",
  slug: "el-senor-de-los-anillos",
  name: "La Tierra Media",
  tagline: "De la aventura de Bilbo a la caída de Sauron",
  backdropPath: null,
  country: "AR",
  titles: [
    {
      id: titleIdFromTmdb(49051),
      tmdbId: 49051,
      kind: "movie",
      title: "El Hobbit: Un viaje inesperado",
      overview:
        "Bilbo Bolsón se une a Gandalf y trece enanos para recuperar el reino de Erebor.",
      releaseDate: "2012-12-14",
      runtime: 169,
      posterPath: null,
      chronologicalOrder: 1,
      releaseOrder: 4,
      providers: [{ ...MAX, type: "flatrate" }],
    },
    {
      id: titleIdFromTmdb(57158),
      tmdbId: 57158,
      kind: "movie",
      title: "El Hobbit: La desolación de Smaug",
      overview:
        "La compañía cruza el Bosque Negro y llega a la Montaña Solitaria, donde duerme el dragón.",
      releaseDate: "2013-12-13",
      runtime: 161,
      posterPath: null,
      chronologicalOrder: 2,
      releaseOrder: 5,
      providers: [
        { ...MAX, type: "flatrate" },
        { ...PRIME, type: "rent" },
      ],
    },
    {
      id: titleIdFromTmdb(122917),
      tmdbId: 122917,
      kind: "movie",
      title: "El Hobbit: La batalla de los cinco ejércitos",
      overview:
        "El tesoro recuperado desata la codicia y cinco ejércitos convergen en Erebor.",
      releaseDate: "2014-12-12",
      runtime: 144,
      posterPath: null,
      chronologicalOrder: 3,
      releaseOrder: 6,
      providers: [{ ...MAX, type: "flatrate" }],
    },
    {
      id: titleIdFromTmdb(120),
      tmdbId: 120,
      kind: "movie",
      title: "La Comunidad del Anillo",
      overview:
        "Frodo hereda el Anillo Único y parte de la Comarca junto a una comunidad de nueve miembros.",
      releaseDate: "2001-12-19",
      runtime: 178,
      posterPath: null,
      chronologicalOrder: 4,
      releaseOrder: 1,
      providers: [
        { ...MAX, type: "flatrate" },
        { ...NETFLIX, type: "flatrate" },
      ],
    },
    {
      id: titleIdFromTmdb(121),
      tmdbId: 121,
      kind: "movie",
      title: "Las dos torres",
      overview:
        "La comunidad dividida enfrenta a Saruman mientras Frodo y Sam avanzan hacia Mordor.",
      releaseDate: "2002-12-18",
      runtime: 179,
      posterPath: null,
      chronologicalOrder: 5,
      releaseOrder: 2,
      providers: [{ ...MAX, type: "flatrate" }],
    },
    {
      id: titleIdFromTmdb(122),
      tmdbId: 122,
      kind: "movie",
      title: "El retorno del Rey",
      overview:
        "Aragorn reclama su trono y Frodo llega al Monte del Destino para destruir el Anillo.",
      releaseDate: "2003-12-17",
      runtime: 201,
      posterPath: null,
      chronologicalOrder: 6,
      releaseOrder: 3,
      providers: [
        { ...MAX, type: "flatrate" },
        { ...PRIME, type: "buy" },
      ],
    },
  ],
};

// Bullets de ejemplo hasta que el endpoint de IA esté conectado.
export const mockLoreCaps: Record<string, LoreCap> = {
  [titleIdFromTmdb(57158)]: {
    titleId: titleIdFromTmdb(57158),
    generatedAt: "2026-01-01T00:00:00.000Z",
    bullets: [
      "Bilbo aceptó unirse a Thorin y sus enanos para recuperar Erebor.",
      "Gandalf sospecha que un mal antiguo está regresando al este.",
      "Bilbo encontró un anillo que lo vuelve invisible y no lo mencionó a nadie.",
      "Los enanos sobrevivieron a trolls, orcos y a la ciudad de Rivendel.",
    ],
  },
  [titleIdFromTmdb(121)]: {
    titleId: titleIdFromTmdb(121),
    generatedAt: "2026-01-01T00:00:00.000Z",
    bullets: [
      "Gandalf cayó en Moria enfrentando al Balrog.",
      "Boromir murió defendiendo a los hobbits de los uruk-hai.",
      "Merry y Pippin fueron capturados por las tropas de Saruman.",
      "Frodo y Sam siguieron solos hacia Mordor con el Anillo.",
    ],
  },
};

export const mockRecommendations: Recommendation[] = [
  { tmdbId: 438631, title: "Dune", posterPath: null, reason: "Ciencia ficción · Aventura" },
  { tmdbId: 400, title: "Willow", posterPath: null, reason: "Fantasía · Aventura" },
  { tmdbId: 1399, title: "Game of Thrones", posterPath: null, reason: "Drama · Fantasía" },
  { tmdbId: 71912, title: "The Witcher", posterPath: null, reason: "Fantasía · Acción" },
  { tmdbId: 71914, title: "La Rueda del Tiempo", posterPath: null, reason: "Fantasía" },
];