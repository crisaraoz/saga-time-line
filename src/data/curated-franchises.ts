export interface CuratedFranchise {
  slug: string;
  name: string;
  tagline: string | null;
  /** Colecciones de TMDB que componen la franquicia. */
  collectionIds: number[];
  /**
   * Películas sueltas (sin colección o fuera de las collectionIds)
   * que igual deben entrar a la ruta.
   */
  extraMovieIds?: number[];
  /** IDs a excluir (datos rotos o cuts alternativos en TMDB). */
  excludeMovieIds?: number[];
  /**
   * Orden de la historia. Los que falten en esta lista se agregan al final por estreno.
   */
  chronologicalOrder?: number[];
  /** Título del que se piden las recomendaciones finales. */
  recommendationSeedId?: number;
  /** Términos extra para que la búsqueda las encuentre. */
  searchAliases?: string[];
  /** Categoría para filtrar en /sagas (se asigna vía CATEGORY_BY_SLUG). */
  category?: FranchiseCategory;
}

export type FranchiseCategory =
  | "terror"
  | "ciencia-ficcion"
  | "accion"
  | "superheroes"
  | "fantasia"
  | "aventura"
  | "animacion"
  | "bizarro";

export const FRANCHISE_CATEGORY_LABELS: Record<FranchiseCategory, string> = {
  terror: "Terror",
  "ciencia-ficcion": "Ciencia ficción",
  accion: "Acción",
  superheroes: "Superhéroes",
  fantasia: "Fantasía",
  aventura: "Aventura",
  animacion: "Animación",
  bizarro: "Bizarro / camp",
};

export const FRANCHISE_CATEGORIES = Object.keys(
  FRANCHISE_CATEGORY_LABELS,
) as FranchiseCategory[];

/** Categoría por slug. Si falta, cae en aventura. */
const CATEGORY_BY_SLUG: Record<string, FranchiseCategory> = {
  // Terror
  halloween: "terror",
  "texas-chainsaw": "terror",
  "viernes-13": "terror",
  "pesadilla-elm-street": "terror",
  scream: "terror",
  saw: "terror",
  chucky: "terror",
  hellraiser: "terror",
  "expediente-warren": "terror",
  insidious: "terror",
  "paranormal-activity": "terror",
  "destino-final": "terror",
  "evil-dead": "terror",
  exorcista: "terror",
  it: "terror",
  candyman: "terror",
  "ultimo-verano": "terror",
  purge: "terror",
  "lugar-tranquilo": "terror",
  smile: "terror",
  m3gan: "terror",
  leprechaun: "terror",
  "puppet-master": "terror",
  "resident-evil": "terror",
  underworld: "terror",
  blade: "terror",
  "van-helsing": "terror",
  terrifier: "terror",
  "wrong-turn": "terror",
  "colinas-tienen-ojos": "terror",
  "cabin-fever": "terror",
  joker: "terror",
  constantine: "terror",

  // Ciencia ficción
  alien: "ciencia-ficcion",
  "star-wars": "ciencia-ficcion",
  matrix: "ciencia-ficcion",
  terminator: "ciencia-ficcion",
  "volver-al-futuro": "ciencia-ficcion",
  "blade-runner": "ciencia-ficcion",
  dune: "ciencia-ficcion",
  predator: "ciencia-ficcion",
  transformers: "ciencia-ficcion",
  "men-in-black": "ciencia-ficcion",
  monsterverse: "ciencia-ficcion",
  "star-trek": "ciencia-ficcion",
  "planeta-simios": "ciencia-ficcion",
  avatar: "ciencia-ficcion",
  "pacific-rim": "ciencia-ficcion",
  jurassic: "ciencia-ficcion",
  ghostbusters: "ciencia-ficcion",

  // Acción
  "fast-furious": "accion",
  "john-wick": "accion",
  "mission-impossible": "accion",
  "james-bond": "accion",
  rocky: "accion",
  "mad-max": "accion",
  bourne: "accion",
  taken: "accion",
  transporter: "accion",
  equalizer: "accion",
  "die-hard": "accion",
  rambo: "accion",
  oceans: "accion",
  kingsman: "accion",

  // Superhéroes
  batman: "superheroes",
  "spider-man": "superheroes",
  mcu: "superheroes",
  "x-men": "superheroes",
  dceu: "superheroes",
  "dcu-superman": "superheroes",
  superman: "superheroes",

  // Fantasía
  "el-senor-de-los-anillos": "fantasia",
  "harry-potter": "fantasia",
  narnia: "fantasia",
  crepusculo: "fantasia",
  wicked: "fantasia",

  // Aventura
  "indiana-jones": "aventura",
  "piratas-del-caribe": "aventura",
  "juegos-del-hambre": "aventura",
  jumanji: "aventura",
  "karate-kid": "aventura",
  "king-kong": "aventura",
  "sherlock-holmes": "aventura",

  // Animación
  "como-entrenar-a-tu-dragon": "animacion",
  shrek: "animacion",
  "toy-story": "animacion",
  "ice-age": "animacion",

  // Bizarro / camp
  sharknado: "bizarro",
  "mega-shark": "bizarro",
  sharktopus: "bizarro",
  lavalantula: "bizarro",
  piranha: "bizarro",
  "tomates-asesinos": "bizarro",
  birdemic: "bizarro",
  anaconda: "bizarro",
  megalodon: "bizarro",
  troll: "bizarro",
  gingerdead: "bizarro",
  "evil-bong": "bizarro",
  "vengador-toxico": "bizarro",
  "shark-attack": "bizarro",
  "ghost-shark": "bizarro",
};

/**
 * Franquicias donde TMDB parte mal la saga o el orden de estreno
 * no coincide con el hilo de la historia.
 */
export const CURATED_FRANCHISES: Record<string, CuratedFranchise> = {
  "el-senor-de-los-anillos": {
    slug: "el-senor-de-los-anillos",
    name: "La Tierra Media",
    tagline: "De la aventura de Bilbo a la caída de Sauron",
    collectionIds: [121938, 119],
    chronologicalOrder: [49051, 57158, 122917, 120, 121, 122],
    recommendationSeedId: 122,
  },

  alien: {
    slug: "alien",
    name: "Alien",
    tagline: "De Prometheus a Ripley",
    collectionIds: [8091, 135416, 1434946],
    chronologicalOrder: [70981, 126889, 348, 945961, 679, 8077, 8078],
    recommendationSeedId: 348,
  },

  "star-wars": {
    slug: "star-wars",
    name: "Star Wars",
    tagline: "La saga Skywalker en orden de la historia",
    collectionIds: [10],
    extraMovieIds: [12180, 330459, 348350],
    // I–III → Clone Wars → Solo → Rogue One → IV–VI → VII–IX
    chronologicalOrder: [
      1893, 1894, 1895, 12180, 348350, 330459, 11, 1891, 1892, 140607, 181808,
      181812,
    ],
    recommendationSeedId: 11,
  },

  "harry-potter": {
    slug: "harry-potter",
    name: "Harry Potter",
    tagline: "El mundo mágico desde Grindelwald hasta Hogwarts",
    collectionIds: [435259, 1241],
    chronologicalOrder: [
      259316, 338952, 338953, 671, 672, 673, 674, 675, 767, 12444, 12445,
    ],
    recommendationSeedId: 671,
  },

  jurassic: {
    slug: "jurassic",
    name: "Jurassic Park",
    tagline: "De Isla Nublar a Jurassic World",
    collectionIds: [328],
    chronologicalOrder: [329, 330, 331, 135397, 351286, 507086, 1234821],
    recommendationSeedId: 329,
  },

  "fast-furious": {
    slug: "fast-furious",
    name: "Fast & Furious",
    tagline: "La familia en orden cronológico",
    collectionIds: [9485],
    // Tokyo Drift va después de Furious 6; Hobbs & Shaw entre 8 y 9
    chronologicalOrder: [
      9799, 584, 13804, 51497, 82992, 9615, 168259, 337339, 384018, 385128,
      385687,
    ],
    recommendationSeedId: 9799,
  },

  matrix: {
    slug: "matrix",
    name: "Matrix",
    tagline: "Bienvenido al desierto de lo real",
    collectionIds: [2344],
    chronologicalOrder: [603, 604, 605, 624860],
    recommendationSeedId: 603,
  },

  terminator: {
    slug: "terminator",
    name: "Terminator",
    tagline: "Hasta la vista, baby",
    collectionIds: [528],
    chronologicalOrder: [218, 280, 296, 534, 87101, 290859],
    recommendationSeedId: 218,
  },

  "john-wick": {
    slug: "john-wick",
    name: "John Wick",
    tagline: "Consecuencias. A montones.",
    collectionIds: [404609],
    chronologicalOrder: [245891, 324552, 458156, 603692],
    recommendationSeedId: 245891,
  },

  "mission-impossible": {
    slug: "mission-impossible",
    name: "Misión Imposible",
    tagline: "Mensaje destruyéndose en 5 segundos",
    collectionIds: [87359],
    chronologicalOrder: [954, 955, 956, 56292, 177677, 353081, 575264, 575265],
    recommendationSeedId: 954,
  },

  "indiana-jones": {
    slug: "indiana-jones",
    name: "Indiana Jones",
    tagline: "La cronología de las aventuras de Indy",
    collectionIds: [84],
    // El templo maldito es la primera en la línea temporal
    chronologicalOrder: [87, 85, 89, 217, 335977],
    recommendationSeedId: 85,
  },

  batman: {
    slug: "batman",
    name: "Batman",
    tagline: "Burton, Nolan, DCEU y Reeves — cada era en orden",
    collectionIds: [120794, 263, 948485],
    extraMovieIds: [209112, 791373],
    chronologicalOrder: [
      // Burton / Schumacher
      268, 364, 414, 415,
      // Nolan
      272, 155, 49026,
      // DCEU (Snyder Cut)
      209112, 791373,
      // Reeves
      414906,
    ],
    recommendationSeedId: 155,
  },

  "spider-man": {
    slug: "spider-man",
    name: "Spider-Man",
    tagline: "Raimi, Webb, MCU, Spider-Verse y Venom",
    collectionIds: [556, 125574, 531241, 573436, 558216],
    chronologicalOrder: [
      // Raimi
      557, 558, 559,
      // Amazing
      1930, 102382,
      // MCU + Spider-Verse + Venom (hilo hacia NWH)
      315635, 324857, 335983, 429617, 580489, 634649, 569094, 912649,
    ],
    recommendationSeedId: 557,
  },

  mcu: {
    slug: "mcu",
    name: "Universo Marvel (MCU)",
    tagline: "Mega lista en orden cronológico de la historia",
    collectionIds: [
      131292, // Iron Man
      131295, // Cap
      131296, // Thor
      284433, // Guardians
      422834, // Ant-Man
      618529, // Doctor Strange
      529892, // Black Panther
      623911, // Cap Marvel
      86311, // Avengers
      531241, // Spider-Man MCU
      448150, // Deadpool (para llegar a D&W)
    ],
    extraMovieIds: [
      1724, // Incredible Hulk
      497698, // Black Widow
      566525, // Shang-Chi
      524434, // Eternals
      986056, // Thunderbolts*
      617126, // Fantastic Four: First Steps
    ],
    chronologicalOrder: [
      1771, // Cap: First Avenger
      299537, // Cap Marvel
      1726, // Iron Man
      10138, // Iron Man 2
      1724, // Incredible Hulk
      10195, // Thor
      24428, // Avengers
      68721, // Iron Man 3
      76338, // Thor Dark World
      100402, // Winter Soldier
      118340, // Guardians
      283995, // Guardians 2
      99861, // Age of Ultron
      102899, // Ant-Man
      271110, // Civil War
      497698, // Black Widow
      315635, // Homecoming
      284052, // Doctor Strange
      284053, // Ragnarok
      284054, // Black Panther
      299536, // Infinity War
      363088, // Ant-Man and the Wasp
      299534, // Endgame
      429617, // Far From Home
      566525, // Shang-Chi
      524434, // Eternals
      634649, // No Way Home
      453395, // Multiverse of Madness
      616037, // Love and Thunder
      505642, // Wakanda Forever
      640146, // Quantumania
      447365, // Guardians 3
      609681, // The Marvels
      293660, // Deadpool
      383498, // Deadpool 2
      533535, // Deadpool & Wolverine
      822119, // Brave New World
      986056, // Thunderbolts*
      617126, // Fantastic Four
    ],
    recommendationSeedId: 24428,
  },

  // ——— Terror ———

  halloween: {
    slug: "halloween",
    name: "Halloween",
    tagline: "Michael Myers, todas las eras",
    collectionIds: [91361],
    extraMovieIds: [2082, 24150],
    // Clásica → H3 (standalone) → 4–6 → H20 → Resurrection → Zombie → trilogy 2018
    chronologicalOrder: [
      948, 11281, 10676, 11357, 11361, 10987, 11675, 11442, 2082, 24150, 424139,
      610253, 616820,
    ],
    recommendationSeedId: 948,
  },

  "texas-chainsaw": {
    slug: "texas-chainsaw",
    name: "La matanza de Texas",
    tagline: "La familia Sawyer en todas sus eras",
    collectionIds: [111751, 425175],
    // Clásica (Leatherface prequel → original → secuelas) y luego el reboot 2003
    chronologicalOrder: [
      300665, 30497, 16337, 25018, 16780, 76617, 632727, 10781, 9373,
    ],
    recommendationSeedId: 30497,
  },

  "viernes-13": {
    slug: "viernes-13",
    name: "Viernes 13",
    tagline: "Jason Voorhees de principio a fin",
    collectionIds: [9735],
    extraMovieIds: [13207],
    chronologicalOrder: [
      4488, 9725, 9728, 9730, 9731, 10225, 10281, 10283, 10285, 11470, 6466,
      13207,
    ],
    recommendationSeedId: 4488,
  },

  "pesadilla-elm-street": {
    slug: "pesadilla-elm-street",
    name: "Pesadilla en Elm Street",
    tagline: "Freddy Krueger no te deja dormir",
    collectionIds: [8581],
    extraMovieIds: [6466, 23437],
    chronologicalOrder: [
      377, 10014, 10072, 10131, 10160, 11284, 11596, 6466, 23437,
    ],
    recommendationSeedId: 377,
  },

  scream: {
    slug: "scream",
    name: "Scream",
    tagline: "¿Cuál es tu película de terror favorita?",
    collectionIds: [2602],
    chronologicalOrder: [4232, 4233, 4234, 41446, 646385, 934433, 1159559],
    recommendationSeedId: 4232,
  },

  saw: {
    slug: "saw",
    name: "Saw",
    tagline: "Quiero jugar un juego",
    collectionIds: [656],
    // Saw X ocurre entre la I y la II
    chronologicalOrder: [
      176, 951491, 215, 214, 663, 11917, 22804, 41439, 298250, 602734,
    ],
    recommendationSeedId: 176,
  },

  chucky: {
    slug: "chucky",
    name: "Chucky",
    tagline: "El muñeco diabólico",
    collectionIds: [10455],
    extraMovieIds: [533642],
    chronologicalOrder: [
      10585, 11186, 11187, 11932, 11249, 167032, 393345, 533642,
    ],
    recommendationSeedId: 10585,
  },

  hellraiser: {
    slug: "hellraiser",
    name: "Hellraiser",
    tagline: "Abre la caja, si te atreves",
    collectionIds: [8917],
    extraMovieIds: [338947],
    chronologicalOrder: [
      9003, 9064, 11569, 8766, 12597, 11246, 17455, 12699, 70584, 444149,
      338947,
    ],
    recommendationSeedId: 9003,
  },

  "expediente-warren": {
    slug: "expediente-warren",
    name: "Expediente Warren / Conjuring",
    tagline: "El universo Conjuring en orden de la historia",
    collectionIds: [313086, 402074, 968052],
    extraMovieIds: [480414],
    chronologicalOrder: [
      439079, // La monja (1952)
      396422, // Annabelle Creation (1955)
      968051, // La monja II (1956)
      250546, // Annabelle (1967)
      521029, // Annabelle Comes Home (1968)
      138843, // Conjuring (1971)
      480414, // La Llorona (1973)
      259693, // Conjuring 2 (1977)
      423108, // Conjuring 3 (1981)
      1038392, // Last Rites
    ],
    recommendationSeedId: 138843,
  },

  insidious: {
    slug: "insidious",
    name: "Insidious",
    tagline: "Más allá ve lo que no deberías",
    collectionIds: [228446],
    // 3 y La última llave son precuelas
    chronologicalOrder: [280092, 406563, 49018, 91586, 614479],
    recommendationSeedId: 49018,
  },

  "paranormal-activity": {
    slug: "paranormal-activity",
    name: "Paranormal Activity",
    tagline: "Orden cronológico (no el de estreno)",
    collectionIds: [41437],
    // 146301 no siempre viene bien en la colección es-ES de TMDB
    extraMovieIds: [146301],
    excludeMovieIds: [146231], // Hybrid mal linkeado en la colección es-ES
    chronologicalOrder: [72571, 41436, 23827, 82990, 227348, 146301, 609972],
    recommendationSeedId: 23827,
  },

  "destino-final": {
    slug: "destino-final",
    name: "Destino final",
    tagline: "La muerte no negocia",
    collectionIds: [8864],
    chronologicalOrder: [9532, 9358, 9286, 19912, 55779, 574475],
    recommendationSeedId: 9532,
  },

  "evil-dead": {
    slug: "evil-dead",
    name: "Evil Dead",
    tagline: "Posesión infernal, clásica y reboot",
    collectionIds: [1960, 1725885],
    chronologicalOrder: [764, 765, 766, 109428, 713704],
    recommendationSeedId: 764,
  },

  exorcista: {
    slug: "exorcista",
    name: "El exorcista",
    tagline: "La fe puesta a prueba",
    collectionIds: [12263],
    // Dominion es cut alternativo de El comienzo
    excludeMovieIds: [12700],
    chronologicalOrder: [9552, 11586, 11587, 11026, 807172],
    recommendationSeedId: 9552,
  },

  it: {
    slug: "it",
    name: "It (Eso)",
    tagline: "Vas a flotar también",
    collectionIds: [477962],
    chronologicalOrder: [346364, 474350],
    recommendationSeedId: 346364,
  },

  // ——— Tier A ———

  "volver-al-futuro": {
    slug: "volver-al-futuro",
    name: "Volver al futuro",
    tagline: "¿Adónde vamos? ¡Al futuro!",
    collectionIds: [264],
    chronologicalOrder: [105, 165, 196],
    recommendationSeedId: 105,
    searchAliases: ["regreso al futuro", "back to the future"],
  },

  "james-bond": {
    slug: "james-bond",
    name: "James Bond 007",
    tagline: "La licencia para matar, en orden de estreno",
    collectionIds: [645],
    chronologicalOrder: [
      646, 657, 658, 660, 667, 668, 681, 253, 682, 691, 698, 699, 700, 36670,
      707, 708, 709, 710, 714, 36643, 36669, 36557, 10764, 37724, 206647, 370172,
    ],
    recommendationSeedId: 36557,
    searchAliases: ["007", "bond", "agente 007"],
  },

  rocky: {
    slug: "rocky",
    name: "Rocky / Creed",
    tagline: "De Rocky Balboa a Adonis Creed",
    collectionIds: [1575, 553717],
    chronologicalOrder: [
      1366, 1367, 1371, 1374, 1375, 1246, 312221, 480530, 677179,
    ],
    recommendationSeedId: 1366,
  },

  "mad-max": {
    slug: "mad-max",
    name: "Mad Max",
    tagline: "Trilogía clásica → Furiosa → Fury Road",
    collectionIds: [8945],
    chronologicalOrder: [9659, 8810, 9355, 786892, 76341],
    recommendationSeedId: 76341,
  },

  "blade-runner": {
    slug: "blade-runner",
    name: "Blade Runner",
    tagline: "¿Los androides sueñan con ovejas eléctricas?",
    collectionIds: [422837],
    chronologicalOrder: [78, 335984],
    recommendationSeedId: 78,
  },

  dune: {
    slug: "dune",
    name: "Dune",
    tagline: "El desierto de Arrakis",
    collectionIds: [726871],
    chronologicalOrder: [438631, 693134],
    recommendationSeedId: 438631,
  },

  predator: {
    slug: "predator",
    name: "Predator",
    tagline: "Depredador + AVP + Prey",
    collectionIds: [399, 115762],
    extraMovieIds: [1376434],
    chronologicalOrder: [
      106, 169, 395, 440, 34851, 346910, 766507, 1376434, 1242898,
    ],
    recommendationSeedId: 106,
  },

  "x-men": {
    slug: "x-men",
    name: "X-Men",
    tagline: "Timeline Fox en orden de visionado",
    collectionIds: [748, 453993],
    extraMovieIds: [293660, 383498, 340102],
    chronologicalOrder: [
      49538, // Primera Generación
      2080, // Orígenes Lobezno
      36657, // X-Men
      36658, // X2
      36668, // La decisión final
      76170, // Lobezno inmortal
      127585, // Días del futuro pasado
      293660, // Deadpool
      246655, // Apocalipsis
      263115, // Logan
      383498, // Deadpool 2
      320288, // Fénix Oscura
      340102, // Nuevos mutantes
    ],
    recommendationSeedId: 36657,
  },

  transformers: {
    slug: "transformers",
    name: "Transformers",
    tagline: "One → Bumblebee → Beasts → saga Bay",
    collectionIds: [8650],
    extraMovieIds: [698687, 424783, 667538],
    chronologicalOrder: [
      698687, // One
      424783, // Bumblebee
      667538, // Rise of the Beasts
      1858, 8373, 38356, 91314, 335988,
    ],
    recommendationSeedId: 1858,
  },

  "piratas-del-caribe": {
    slug: "piratas-del-caribe",
    name: "Piratas del Caribe",
    tagline: "Por qué es la Perla Negra",
    collectionIds: [295],
    chronologicalOrder: [22, 58, 285, 1865, 166426],
    recommendationSeedId: 22,
  },

  oceans: {
    slug: "oceans",
    name: "Ocean's",
    tagline: "Once, doce, trece… y ellas",
    collectionIds: [304],
    extraMovieIds: [402900],
    chronologicalOrder: [161, 163, 298, 402900],
    recommendationSeedId: 161,
  },

  bourne: {
    slug: "bourne",
    name: "Bourne",
    tagline: "Jason Bourne no recuerda, vos sí",
    collectionIds: [31562],
    chronologicalOrder: [2501, 2502, 2503, 49040, 324668],
    recommendationSeedId: 2501,
  },

  taken: {
    slug: "taken",
    name: "Taken (Venganza)",
    tagline: "Tengo un conjunto muy particular de habilidades",
    collectionIds: [135483],
    chronologicalOrder: [8681, 82675, 260346],
    recommendationSeedId: 8681,
  },

  transporter: {
    slug: "transporter",
    name: "Transporter",
    tagline: "Regla número uno: nunca cambies el trato",
    collectionIds: [9518],
    chronologicalOrder: [4108, 9335, 13387],
    recommendationSeedId: 4108,
  },

  equalizer: {
    slug: "equalizer",
    name: "The Equalizer",
    tagline: "El protector",
    collectionIds: [523855],
    chronologicalOrder: [156022, 345887, 926393],
    recommendationSeedId: 156022,
  },

  "die-hard": {
    slug: "die-hard",
    name: "Die Hard (Jungla de cristal)",
    tagline: "Yippee-ki-yay…",
    collectionIds: [1570],
    chronologicalOrder: [562, 1573, 1572, 1571, 47964],
    recommendationSeedId: 562,
  },

  rambo: {
    slug: "rambo",
    name: "Rambo",
    tagline: "Acorralado y todo lo que vino después",
    collectionIds: [5039],
    chronologicalOrder: [1368, 1369, 1370, 7555, 522938],
    recommendationSeedId: 1368,
  },

  crepusculo: {
    slug: "crepusculo",
    name: "Crepúsculo",
    tagline: "La saga completa",
    collectionIds: [33514],
    chronologicalOrder: [8966, 18239, 24021, 50619, 50620],
    recommendationSeedId: 8966,
  },

  "juegos-del-hambre": {
    slug: "juegos-del-hambre",
    name: "Los Juegos del Hambre",
    tagline: "Precuela + tetralogía",
    collectionIds: [131635],
    extraMovieIds: [695721],
    chronologicalOrder: [695721, 70160, 101299, 131631, 131634],
    recommendationSeedId: 70160,
  },

  narnia: {
    slug: "narnia",
    name: "Las crónicas de Narnia",
    tagline: "Las tres películas estrenadas",
    collectionIds: [420],
    chronologicalOrder: [411, 2454, 10140],
    recommendationSeedId: 411,
  },

  "como-entrenar-a-tu-dragon": {
    slug: "como-entrenar-a-tu-dragon",
    name: "Cómo entrenar a tu dragón",
    tagline: "Animada + live action",
    collectionIds: [89137, 1458864],
    chronologicalOrder: [10191, 82702, 166428, 1087192],
    recommendationSeedId: 10191,
  },

  shrek: {
    slug: "shrek",
    name: "Shrek",
    tagline: "Shrek + El gato con botas",
    collectionIds: [2150, 94602],
    chronologicalOrder: [808, 809, 810, 417859, 10192, 315162],
    recommendationSeedId: 808,
  },

  "toy-story": {
    slug: "toy-story",
    name: "Toy Story",
    tagline: "Al infinito y más allá",
    collectionIds: [10194],
    extraMovieIds: [718789], // Lightyear
    chronologicalOrder: [862, 863, 10193, 301528, 718789],
    recommendationSeedId: 862,
  },

  "ice-age": {
    slug: "ice-age",
    name: "Ice Age",
    tagline: "La era de hielo",
    collectionIds: [8354],
    chronologicalOrder: [425, 950, 8355, 57800, 278154, 774825],
    recommendationSeedId: 425,
  },

  ghostbusters: {
    slug: "ghostbusters",
    name: "Cazafantasmas",
    tagline: "Clásicas, reboot y nueva generación",
    collectionIds: [2980],
    extraMovieIds: [43074],
    chronologicalOrder: [620, 2978, 43074, 425909, 967847],
    recommendationSeedId: 620,
  },

  "men-in-black": {
    slug: "men-in-black",
    name: "Men in Black",
    tagline: "Hombres de negro",
    collectionIds: [86055],
    extraMovieIds: [479455],
    chronologicalOrder: [607, 608, 41154, 479455],
    recommendationSeedId: 607,
  },

  jumanji: {
    slug: "jumanji",
    name: "Jumanji",
    tagline: "Clásica + bienvenidos a la jungla",
    collectionIds: [495527],
    chronologicalOrder: [8844, 353486, 512200],
    recommendationSeedId: 8844,
  },

  "karate-kid": {
    slug: "karate-kid",
    name: "Karate Kid",
    tagline: "Del momento de la verdad a Legends",
    collectionIds: [8580],
    chronologicalOrder: [1885, 8856, 10495, 11231, 38575, 1011477],
    recommendationSeedId: 1885,
  },

  monsterverse: {
    slug: "monsterverse",
    name: "MonsterVerse (Godzilla / Kong)",
    tagline: "Legendary Pictures en orden de la historia",
    collectionIds: [535313, 1539140],
    chronologicalOrder: [
      293167, // Kong Skull Island (1973)
      124905, // Godzilla (2014)
      373571, // Rey de los monstruos
      399566, // Godzilla vs Kong
      823464, // Nuevo imperio
    ],
    recommendationSeedId: 124905,
    searchAliases: ["godzilla", "kong", "king kong"],
  },

  // ——— Tier B (terror) ———

  candyman: {
    slug: "candyman",
    name: "Candyman",
    tagline: "Di su nombre cinco veces",
    collectionIds: [98580],
    chronologicalOrder: [9529, 10824, 12485, 565028],
    recommendationSeedId: 9529,
  },

  "ultimo-verano": {
    slug: "ultimo-verano",
    name: "Sé lo que hicisteis el último verano",
    tagline: "El slasher de los 90 (+ remake)",
    collectionIds: [3601],
    chronologicalOrder: [3597, 3600, 3602, 1083433],
    recommendationSeedId: 3597,
    searchAliases: [
      "i know what you did last summer",
      "last summer",
      "se lo que hicisteis",
    ],
  },

  purge: {
    slug: "purge",
    name: "The Purge",
    tagline: "La noche de las bestias — precuela primero",
    collectionIds: [256322],
    chronologicalOrder: [442249, 158015, 238636, 316727, 602223],
    recommendationSeedId: 158015,
    searchAliases: ["purga", "la purga"],
  },

  "lugar-tranquilo": {
    slug: "lugar-tranquilo",
    name: "Un lugar tranquilo",
    tagline: "Día uno → 1 → 2",
    collectionIds: [521226],
    extraMovieIds: [762441],
    chronologicalOrder: [762441, 447332, 520763],
    recommendationSeedId: 447332,
    searchAliases: ["quiet place", "a quiet place"],
  },

  smile: {
    slug: "smile",
    name: "Smile",
    tagline: "No le devuelvas la sonrisa",
    collectionIds: [1100788],
    chronologicalOrder: [882598, 1100782],
    recommendationSeedId: 882598,
  },

  m3gan: {
    slug: "m3gan",
    name: "M3GAN",
    tagline: "La muñeca perfecta",
    collectionIds: [1071588],
    chronologicalOrder: [536554, 1071585],
    recommendationSeedId: 536554,
    searchAliases: ["megan"],
  },

  leprechaun: {
    slug: "leprechaun",
    name: "Leprechaun",
    tagline: "El duende asesino",
    collectionIds: [19285],
    extraMovieIds: [126172],
    chronologicalOrder: [
      11811, 18009, 19286, 19287, 18011, 19288, 126172, 518158,
    ],
    recommendationSeedId: 11811,
  },

  "puppet-master": {
    slug: "puppet-master",
    name: "Puppet Master",
    tagline: "Muñecos asesinos",
    collectionIds: [107949],
    extraMovieIds: [396321],
    chronologicalOrder: [
      26953, 26954, 26956, 26957, 26958, 26959, 26960, 26961, 27651, 139659,
      384978, 396321,
    ],
    recommendationSeedId: 26953,
  },

  "resident-evil": {
    slug: "resident-evil",
    name: "Resident Evil",
    tagline: "Live-action, animadas y reboot",
    collectionIds: [17255, 133352],
    extraMovieIds: [460458],
    chronologicalOrder: [
      1576, 1577, 7737, 35791, 71679, 173897, 13648, 133121, 400136, 1083862,
      460458,
    ],
    recommendationSeedId: 1576,
    searchAliases: ["resident evil", "racoon city", "raccoon city"],
  },

  underworld: {
    slug: "underworld",
    name: "Underworld",
    tagline: "Vampiros vs licántropos (precuela primero)",
    collectionIds: [2326],
    chronologicalOrder: [12437, 277, 834, 52520, 346672],
    recommendationSeedId: 277,
  },

  blade: {
    slug: "blade",
    name: "Blade",
    tagline: "La trilogía del cazavampiros",
    collectionIds: [735],
    chronologicalOrder: [36647, 36586, 36648],
    recommendationSeedId: 36647,
  },

  "van-helsing": {
    slug: "van-helsing",
    name: "Van Helsing",
    tagline: "El cazador de monstruos",
    collectionIds: [],
    extraMovieIds: [7131],
    chronologicalOrder: [7131],
    recommendationSeedId: 7131,
  },

  terrifier: {
    slug: "terrifier",
    name: "Terrifier",
    tagline: "Art the Clown",
    collectionIds: [727761],
    chronologicalOrder: [420634, 663712, 1034541],
    recommendationSeedId: 420634,
  },

  "wrong-turn": {
    slug: "wrong-turn",
    name: "Wrong Turn (Camino sangriento)",
    tagline: "Clásica + reboot 2021",
    collectionIds: [52985],
    extraMovieIds: [630586],
    // El origen (4) es precuela
    chronologicalOrder: [71672, 9902, 13186, 23823, 125509, 259072, 630586],
    recommendationSeedId: 9902,
    searchAliases: ["camino sangriento", "wrong turn"],
  },

  "colinas-tienen-ojos": {
    slug: "colinas-tienen-ojos",
    name: "Las colinas tienen ojos",
    tagline: "Original Wes Craven + remakes",
    collectionIds: [267922, 8918],
    chronologicalOrder: [12262, 18477, 9792, 9793],
    recommendationSeedId: 12262,
    searchAliases: ["hills have eyes"],
  },

  "cabin-fever": {
    slug: "cabin-fever",
    name: "Cabin Fever",
    tagline: "No te rasques",
    collectionIds: [201576],
    chronologicalOrder: [11547, 28739, 157424],
    recommendationSeedId: 11547,
  },

  // ——— Tier C (universos / especiales) ———

  dceu: {
    slug: "dceu",
    name: "DC Extended Universe",
    tagline: "Snyderverse y DCEU en orden de la historia",
    collectionIds: [209131, 468552, 573693, 724848, 531242],
    extraMovieIds: [
      791373, // Snyder Cut
      495764, // Birds of Prey
      436270, // Black Adam
      298618, // Flash
      565770, // Blue Beetle
    ],
    chronologicalOrder: [
      297762, // Wonder Woman (1918)
      464052, // WW84
      49521, // Man of Steel
      209112, // BvS
      297761, // Suicide Squad
      791373, // Snyder Cut
      297802, // Aquaman
      287947, // Shazam
      495764, // Birds of Prey
      436969, // The Suicide Squad
      436270, // Black Adam
      594767, // Shazam 2
      298618, // Flash
      565770, // Blue Beetle
      572802, // Aquaman 2
    ],
    recommendationSeedId: 49521,
    searchAliases: ["dc", "snyder", "justice league", "liga de la justicia"],
  },

  "dcu-superman": {
    slug: "dcu-superman",
    name: "Superman (DCU)",
    tagline: "La nueva era James Gunn",
    collectionIds: [1540907],
    chronologicalOrder: [1061474],
    recommendationSeedId: 1061474,
    searchAliases: ["dcu", "superman gunn"],
  },

  superman: {
    slug: "superman",
    name: "Superman (clásico)",
    tagline: "Donner + Superman Returns",
    collectionIds: [8537],
    extraMovieIds: [1452],
    chronologicalOrder: [1924, 8536, 9531, 11411, 1452],
    recommendationSeedId: 1924,
  },

  "star-trek": {
    slug: "star-trek",
    name: "Star Trek",
    tagline: "Original → Next Gen → Kelvin",
    collectionIds: [151, 115570, 115575],
    chronologicalOrder: [
      152, 154, 157, 168, 172, 174, 193, 199, 200, 201, 13475, 54138, 188927,
    ],
    recommendationSeedId: 152,
  },

  "planeta-simios": {
    slug: "planeta-simios",
    name: "El planeta de los simios",
    tagline: "Clásica, remake 2001 y reboot",
    collectionIds: [1709, 173710],
    extraMovieIds: [869],
    chronologicalOrder: [
      871, 1685, 1687, 1688, 1705, 869, 61791, 119450, 281338, 653346,
    ],
    recommendationSeedId: 871,
    searchAliases: ["planet of the apes", "simios"],
  },

  "king-kong": {
    slug: "king-kong",
    name: "King Kong",
    tagline: "Clásicos (el MonsterVerse está aparte)",
    collectionIds: [135495, 135498],
    extraMovieIds: [254],
    chronologicalOrder: [244, 43149, 10730, 31947, 254],
    recommendationSeedId: 244,
    searchAliases: ["kong"],
  },

  avatar: {
    slug: "avatar",
    name: "Avatar",
    tagline: "Pandora, en orden de la historia",
    collectionIds: [87096],
    chronologicalOrder: [19995, 76600, 83533],
    recommendationSeedId: 19995,
  },

  wicked: {
    slug: "wicked",
    name: "Wicked",
    tagline: "El musical de Oz en dos partes",
    collectionIds: [968080],
    chronologicalOrder: [402431, 967941],
    recommendationSeedId: 402431,
  },

  joker: {
    slug: "joker",
    name: "Joker",
    tagline: "Phillips / Phoenix",
    collectionIds: [987044],
    chronologicalOrder: [475557, 889737],
    recommendationSeedId: 475557,
  },

  constantine: {
    slug: "constantine",
    name: "Constantine",
    tagline: "Demonios en Los Ángeles",
    collectionIds: [1025281],
    chronologicalOrder: [561],
    recommendationSeedId: 561,
  },

  "pacific-rim": {
    slug: "pacific-rim",
    name: "Pacific Rim",
    tagline: "Jaegers vs kaiju",
    collectionIds: [363369],
    chronologicalOrder: [68726, 268896],
    recommendationSeedId: 68726,
  },

  kingsman: {
    slug: "kingsman",
    name: "Kingsman",
    tagline: "Precuela primero, luego el círculo",
    collectionIds: [391860],
    chronologicalOrder: [476669, 207703, 343668],
    recommendationSeedId: 207703,
  },

  "sherlock-holmes": {
    slug: "sherlock-holmes",
    name: "Sherlock Holmes (Ritchie)",
    tagline: "Downey Jr. y Jude Law",
    collectionIds: [102322],
    chronologicalOrder: [10528, 58574],
    recommendationSeedId: 10528,
    searchAliases: ["sherlock"],
  },

  // ——— Bizarro / camp ———

  sharknado: {
    slug: "sharknado",
    name: "Sharknado",
    tagline: "Tiburones. Tornados. ¿Qué más querés?",
    collectionIds: [286023],
    chronologicalOrder: [205321, 248504, 331446, 390989, 438970, 523849],
    recommendationSeedId: 205321,
  },

  "mega-shark": {
    slug: "mega-shark",
    name: "Mega Shark",
    tagline: "Megatiburón contra… lo que haya",
    collectionIds: [264481],
    chronologicalOrder: [17911, 52454, 246594, 343097],
    recommendationSeedId: 17911,
  },

  sharktopus: {
    slug: "sharktopus",
    name: "Sharktopus",
    tagline: "Tiburón + pulpo. Syfy en estado puro",
    collectionIds: [370374],
    chronologicalOrder: [46020, 284711, 344147],
    recommendationSeedId: 46020,
  },

  lavalantula: {
    slug: "lavalantula",
    name: "Lavalantula",
    tagline: "Arañas de lava en Los Ángeles",
    collectionIds: [439596],
    chronologicalOrder: [294562, 391975],
    recommendationSeedId: 294562,
  },

  piranha: {
    slug: "piranha",
    name: "Piraña",
    tagline: "Clásicas + remakes 3D",
    collectionIds: [212279, 104830],
    chronologicalOrder: [24831, 31646, 43593, 71668],
    recommendationSeedId: 24831,
  },

  "tomates-asesinos": {
    slug: "tomates-asesinos",
    name: "Tomates asesinos",
    tagline: "Attack of the Killer Tomatoes",
    collectionIds: [47983],
    chronologicalOrder: [2182, 15482, 36779, 36896],
    recommendationSeedId: 2182,
    searchAliases: ["killer tomatoes", "attack of the killer tomatoes"],
  },

  birdemic: {
    slug: "birdemic",
    name: "Birdemic",
    tagline: "Shock and Terror (sí, en serio)",
    collectionIds: [225961],
    chronologicalOrder: [40016, 188489, 724585],
    recommendationSeedId: 40016,
  },

  anaconda: {
    slug: "anaconda",
    name: "Anaconda",
    tagline: "Serpientes gigantes en la selva",
    collectionIds: [105995],
    extraMovieIds: [1234731],
    chronologicalOrder: [9360, 11237, 14863, 19543, 1234731],
    recommendationSeedId: 9360,
  },

  megalodon: {
    slug: "megalodon",
    name: "Megalodón",
    tagline: "La de Jason Statham (no las de Asylum)",
    collectionIds: [742536],
    chronologicalOrder: [345940, 615656],
    recommendationSeedId: 345940,
    searchAliases: ["the meg", "meg"],
  },

  troll: {
    slug: "troll",
    name: "Troll",
    tagline: "Incluye el legendario Troll 2",
    collectionIds: [123218],
    chronologicalOrder: [33061, 26914],
    recommendationSeedId: 33061,
  },

  gingerdead: {
    slug: "gingerdead",
    name: "Gingerdead Man",
    tagline: "La galleta asesina de Charles Band",
    collectionIds: [138968],
    chronologicalOrder: [27296, 16846, 110588, 1533971],
    recommendationSeedId: 27296,
  },

  "evil-bong": {
    slug: "evil-bong",
    name: "Evil Bong",
    tagline: "La saga más… herbal del cine B",
    collectionIds: [467577],
    chronologicalOrder: [
      10089, 20029, 74943, 231082, 337300, 393513, 453200, 519523, 810499,
      941883,
    ],
    recommendationSeedId: 10089,
  },

  "vengador-toxico": {
    slug: "vengador-toxico",
    name: "El vengador tóxico",
    tagline: "Toxie de Troma (+ reboot)",
    collectionIds: [32135],
    extraMovieIds: [338969],
    chronologicalOrder: [15239, 28165, 28169, 27601, 338969],
    recommendationSeedId: 15239,
    searchAliases: ["toxic avenger", "toxie", "troma"],
  },

  "shark-attack": {
    slug: "shark-attack",
    name: "Shark Attack",
    tagline: "TV movies de tiburones de fin de siglo",
    collectionIds: [389867],
    chronologicalOrder: [42185, 42187, 18015],
    recommendationSeedId: 42185,
  },

  "ghost-shark": {
    slug: "ghost-shark",
    name: "Ghost Shark",
    tagline: "Tiburón. Fantasma. Obvio.",
    collectionIds: [957891],
    chronologicalOrder: [216539, 204473],
    recommendationSeedId: 216539,
  },
};

export const DEFAULT_FRANCHISE_SLUG = "el-senor-de-los-anillos";

export function slugToSearchQuery(slug: string): string {
  return slug.replace(/-/g, " ");
}

/** Listado ordenado alfabéticamente para la página de sagas famosas. */
export function listCuratedFranchises(): CuratedFranchise[] {
  return Object.values(CURATED_FRANCHISES)
    .map((franchise) => ({
      ...franchise,
      category: CATEGORY_BY_SLUG[franchise.slug] ?? "aventura",
    }))
    .sort((a, b) => a.name.localeCompare(b.name, "es"));
}
