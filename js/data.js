/**
 * SolanumAtlas RCL — Dataset
 *
 * Fuente primaria: Informe final del proyecto "Evaluación de la diversidad
 * genética del tomate silvestre (Solanum spp.) en las cuencas de los ríos
 * Lurín, Rímac y Chillón, Lima, Perú" — RCU 125-2024-UNTELS-CU.
 *
 * Permiso de colecta: SERFOR AUT-IFL-2025-076 (RD 000148-2025-MIDAGRI-SERFOR-DGGSPFFS-DGSPF).
 * Grupo de investigación: BIOPROSGEN (UNTELS).
 *
 * Estructura de cada punto: [lat, lng, alt, cuenca, especie, fecha, este_utm, norte_utm]
 *   cuenca: 'r' = Rímac, 'ch' = Chillón, 'l' = Lurín
 *   especie: 'c' = corneliomulleri, 'h' = habrochaites,
 *            'p' = pimpinellifolium, 'n' = pennellii
 *   fecha:  cadena ISO 8601 (YYYY-MM-DD) de la jornada de muestreo
 *   este_utm, norte_utm: coordenadas UTM 18L (datum WGS84) en metros
 *
 * Procedencia de las fechas:
 *   - Puntos 1-60: XLSX validado por Rubén Daga López (mayo 2026).
 *   - Puntos 61-88 (Chillón oct): Anexo 2 del informe final
 *     RCU 125-2024-UNTELS-CU firmado por Vertiz Osores (30-12-2025).
 */

const CHILTU_VERSION = '1.0.0';
const CHILTU_PROJECT = {
  title: 'Evaluación de la diversidad genética del tomate silvestre (Solanum spp.) en las cuencas de los ríos Lurín, Rímac y Chillón',
  institution: 'Universidad Nacional Tecnológica de Lima Sur',
  group: 'BIOPROSGEN — Bioprospección en Salud y Metagenómica Ambiental',
  resolution: 'RCU 125-2024-UNTELS-CU',
  permit: 'AUT-IFL-2025-076 SERFOR',
  year: 2025,
  area: 'Cuencas Rímac, Chillón y Lurín — Lima, Perú',
  scope: '25 distritos · provincias de Huarochirí y Canta'
};

const SPECIES = {
  c: {
    code: 'c',
    name: 'Solanum corneliomulleri',
    authority: 'J.F. Macbr.',
    group: 'Eriopersicon',
    relation: 'pariente silvestre distante',
    habit: 'Arbustivo, 15 cm – 2.8 m',
    altitude: '1200 – 3300 m s.n.m.',
    terrain: 'Laderas rocosas, acantilados, huaycos. Terrenos secos.',
    indument: 'Pubescencia larga y densa',
    leaves: 'Variable, sin patrón determinado',
    flowers: 'Anteras curvadas y soldadas',
    fruit: 'Baya globosa, verde con bandas oscuras, pilosa. Morado oscuro en plantas muy expuestas al sol.',
    resistome: 'Sequía / cutícula (vía MYB) — ~3095 genes. Estrategia de aislamiento estructural mediante engrosamiento cuticular.',
    individuals: 575,
    percentage: 72.2,
    color: '#3B6D11',
    colorLight: '#C0DD97',
    colorDark: '#173404'
  },
  h: {
    code: 'h',
    name: 'Solanum habrochaites',
    authority: 'S. Knapp & D.M. Spooner',
    group: 'Eriopersicon',
    relation: 'pariente silvestre con uso para mejoramiento',
    habit: 'Rastrero, 0.85 – 5.7 m',
    altitude: '750 – 2800 m s.n.m.',
    terrain: 'Terrenos inclinados y planos con cobertura vegetal que aporta humedad al suelo.',
    indument: 'Muy hirsuto, tricomas glandulares, olor fuerte al contacto',
    leaves: '3 hojas por simpodio',
    flowers: 'Anteras soldadas',
    fruit: 'Baya pequeña, verde con pubescencia moderada.',
    resistome: 'Reservorio de genes de resistencia a insectos. Relevante para mejoramiento de cultivos.',
    individuals: 114,
    percentage: 14.3,
    color: '#BA7517',
    colorLight: '#FAC775',
    colorDark: '#412402'
  },
  p: {
    code: 'p',
    name: 'Solanum pimpinellifolium',
    authority: 'L.',
    group: 'Lycopersicon',
    relation: 'ancestro directo del tomate domesticado',
    habit: 'Arbustiva erecta, 15 cm – 1.2 m',
    altitude: '550 – 1350 m s.n.m.',
    terrain: 'Zonas costeras secas de los ríos.',
    indument: 'Escasa pubescencia',
    leaves: 'Variable, sin patrón determinado',
    flowers: 'Corola estrellada, anteras soldadas',
    fruit: 'Baya pequeña, roja al madurar, sin pubescencia.',
    resistome: 'Tolerancia al estrés hídrico, calidad de fruto y sabor. Alta relevancia agronómica.',
    individuals: 87,
    percentage: 10.9,
    color: '#A32D2D',
    colorLight: '#F7C1C1',
    colorDark: '#501313'
  },
  n: {
    code: 'n',
    name: 'Solanum pennellii',
    authority: 'Correll',
    group: 'Neolycopersicon',
    relation: 'pariente genéticamente distante',
    habit: 'Arbustivo, 0.55 – 1.2 m',
    altitude: '550 – 2200 m s.n.m.',
    terrain: 'Zonas áridas, cuencas secas de quebradas.',
    indument: 'Escasa a moderada pubescencia',
    leaves: 'Variable, sin patrón determinado',
    flowers: 'Corola asimétrica, anteras separadas y porales',
    fruit: 'Baya pequeña, verde claro, sin pubescencia.',
    resistome: 'Donante universal de tolerancia a salinidad y sequía extrema. Expansión de genes DREB y NAC.',
    individuals: 20,
    percentage: 2.5,
    color: '#6B5B95',
    colorLight: '#CECBF6',
    colorDark: '#26215C'
  }
};

const BASINS = {
  r: {
    code: 'r',
    name: 'Rímac',
    points: 26,
    individuals: 276,
    speciesCount: 2,
    indices: {
      taxa: 2,
      dominance: 0.9037,
      simpson: 0.0963,
      shannon: 0.2006,
      evenness: 0.6111,
      margalef: 0.1779,
      menhinick: 0.1204,
      fisher: 0.2918,
      bergerParker: 0.9493,
      chao1: 2
    },
    note: 'Comunidad empobrecida y fuertemente dominada por S. corneliomulleri. Alta intervención antrópica.',
    color: '#185FA5',
    colorLight: '#B5D4F4'
  },
  ch: {
    code: 'ch',
    name: 'Chillón',
    points: 39,
    individuals: 338,
    speciesCount: 4,
    indices: {
      taxa: 4,
      dominance: 0.508,
      simpson: 0.492,
      shannon: 0.8528,
      evenness: 0.5866,
      margalef: 0.5152,
      menhinick: 0.2176,
      fisher: 0.6374,
      bergerParker: 0.6509,
      chao1: 4
    },
    note: 'Diversidad intermedia. Las cuatro especies presentes; fisiografía pronunciada y microclimas.',
    color: '#378ADD',
    colorLight: '#85B7EB'
  },
  l: {
    code: 'l',
    name: 'Lurín',
    points: 23,
    individuals: 182,
    speciesCount: 4,
    indices: {
      taxa: 4,
      dominance: 0.3954,
      simpson: 0.6046,
      shannon: 1.069,
      evenness: 0.7284,
      margalef: 0.5765,
      menhinick: 0.2965,
      fisher: 0.723,
      bergerParker: 0.511,
      chao1: 4
    },
    note: 'Cuenca más diversa y equilibrada. Menor intervención antrópica. Refugio prioritario para conservación.',
    color: '#1D9E75',
    colorLight: '#9FE1CB'
  }
};

// Distribución por piso altitudinal (Tabla 3 del informe)
const ALTITUDE_DISTRIBUTION = {
  bands: ['2800–3500 m', '1800–2799 m', '550–1799 m'],
  data: {
    r: { c: [79, 69, 114], p: [0, 0, 14], h: [0, 0, 0], n: [0, 0, 0] },
    l: { c: [32, 15, 46], p: [0, 0, 64], h: [0, 17, 0], n: [0, 0, 8] },
    ch: { c: [76, 92, 52], p: [0, 0, 9], h: [0, 82, 15], n: [0, 0, 12] }
  }
};

// Abundancia por cuenca (Tabla 7 del informe)
const ABUNDANCE_BY_BASIN = {
  c: { r: 262, ch: 220, l: 93 },
  h: { r: 0, ch: 97, l: 17 },
  p: { r: 14, ch: 9, l: 64 },
  n: { r: 0, ch: 12, l: 8 }
};

// 88 puntos de muestreo del Anexo 1
const POINTS = [

  // Cuenca del Rímac — 26 puntos
  [-11.77087, -76.30516, 3028, 'r', 'c', '2025-09-05', 357792, 8698453],
  [-11.77061, -76.30505, 3060, 'r', 'c', '2025-09-05', 357803, 8698481],
  [-11.76962, -76.30394, 3020, 'r', 'c', '2025-09-05', 357924, 8698592],
  [-11.77117, -76.30449, 3006, 'r', 'c', '2025-09-05', 357864, 8698419],
  [-11.77132, -76.30455, 3005, 'r', 'c', '2025-09-05', 357858, 8698403],
  [-11.77588, -76.30524, 2984, 'r', 'c', '2025-09-05', 357786, 8697898],
  [-11.84393, -76.38693, 2420, 'r', 'c', '2025-09-05', 348920, 8690329],
  [-11.84772, -76.38934, 2381, 'r', 'c', '2025-09-05', 348660, 8689908],
  [-11.84831, -76.38991, 2383, 'r', 'c', '2025-09-05', 348598, 8689843],
  [-11.84872, -76.39057, 2422, 'r', 'c', '2025-09-05', 348526, 8689797],
  [-11.84879, -76.39104, 2386, 'r', 'c', '2025-09-05', 348475, 8689789],
  [-11.84874, -76.39106, 2386, 'r', 'c', '2025-09-05', 348473, 8689795],
  [-11.84985, -76.39343, 2473, 'r', 'c', '2025-09-05', 348215, 8689670],
  [-11.85137, -76.39843, 2372, 'r', 'c', '2025-09-05', 347671, 8689500],
  [-11.8829, -76.46695, 1813, 'r', 'c', '2025-09-06', 340225, 8685974],
  [-11.88523, -76.48068, 1729, 'r', 'c', '2025-09-06', 338730, 8685709],
  [-11.88839, -76.49224, 1665, 'r', 'c', '2025-09-06', 337472, 8685352],
  [-11.83846, -76.62768, 1379, 'r', 'c', '2025-09-06', 322685, 8690793],
  [-11.8145, -76.62609, 1590, 'r', 'c', '2025-09-06', 322844, 8693443],
  [-11.8145, -76.62609, 1590, 'r', 'p', '2025-09-06', 322844, 8693443],
  [-11.80964, -76.63051, 1684, 'r', 'c', '2025-09-06', 322358, 8693978],
  [-11.80952, -76.63104, 1720, 'r', 'c', '2025-09-06', 322301, 8693991],
  [-11.81651, -76.63113, 1622, 'r', 'c', '2025-09-06', 322295, 8693218],
  [-11.821, -76.62464, 1627, 'r', 'c', '2025-09-06', 323006, 8692725],
  [-11.821, -76.62464, 1627, 'r', 'p', '2025-09-06', 323006, 8692725],
  [-11.83258, -76.61529, 1674, 'r', 'c', '2025-09-06', 324031, 8691451],

  // Cuenca del Lurín — 23 puntos
  [-12.15101, -76.41982, 3090, 'l', 'c', '2025-11-13', 345512, 8656345],
  [-12.15049, -76.41993, 3077, 'l', 'c', '2025-11-13', 345499, 8656403],
  [-12.13699, -76.41572, 2972, 'l', 'c', '2025-11-13', 345950, 8657898],
  [-12.12703, -76.41878, 2902, 'l', 'c', '2025-11-13', 345611, 8658998],
  [-12.12059, -76.42021, 2787, 'l', 'c', '2025-11-13', 345452, 8659709],
  [-12.12059, -76.42021, 2787, 'l', 'h', '2025-11-13', 345452, 8659709],
  [-12.11625, -76.42895, 2776, 'l', 'c', '2025-11-13', 344498, 8660184],
  [-12.12196, -76.43644, 2393, 'l', 'h', '2025-11-13', 343687, 8659548],
  [-12.12202, -76.43663, 2030, 'l', 'c', '2025-11-13', 343666, 8659542],
  [-12.10039, -76.4774, 1719, 'l', 'c', '2025-11-13', 339215, 8661911],
  [-12.08637, -76.50291, 1563, 'l', 'p', '2025-11-14', 336429, 8663446],
  [-12.05072, -76.56752, 1296, 'l', 'n', '2025-11-14', 329374, 8667350],
  [-12.04764, -76.56934, 1240, 'l', 'p', '2025-11-14', 329174, 8667690],
  [-12.02455, -76.63292, 995, 'l', 'p', '2025-11-14', 322236, 8670203],
  [-12.02455, -76.63292, 995, 'l', 'p', '2025-11-14', 322236, 8670203],
  [-12.02603, -76.66149, 867, 'l', 'n', '2025-11-14', 319125, 8670021],
  [-12.07634, -76.50128, 1626, 'l', 'c', '2025-11-14', 336601, 8664557],
  [-12.07677, -76.50143, 1630, 'l', 'c', '2025-11-14', 336585, 8664509],
  [-12.07631, -76.50218, 1618, 'l', 'c', '2025-11-14', 336503, 8664559],
  [-12.07718, -76.50437, 1601, 'l', 'p', '2025-11-14', 336265, 8664462],
  [-12.03597, -76.71756, 628, 'l', 'c', '2025-11-14', 313027, 8668884],
  [-12.03659, -76.71668, 638, 'l', 'p', '2025-11-14', 313124, 8668816],
  [-12.03609, -76.71677, 633, 'l', 'p', '2025-11-14', 313113, 8668872],

  // Cuenca del Chillón — 39 puntos
  [-11.48734, -76.6448, 2353, 'ch', 'h', '2025-11-15', 320595, 8729622],
  [-11.48734, -76.6448, 2353, 'ch', 'c', '2025-11-15', 320595, 8729622],
  [-11.47837, -76.6386, 2516, 'ch', 'h', '2025-11-15', 321265, 8730617],
  [-11.47877, -76.64148, 2571, 'ch', 'c', '2025-11-15', 320952, 8730571],
  [-11.48881, -76.65871, 2690, 'ch', 'h', '2025-11-15', 319078, 8729450],
  [-11.49537, -76.65403, 2395, 'ch', 'c', '2025-11-15', 319593, 8728727],
  [-11.5243, -76.68941, 1969, 'ch', 'c', '2025-11-15', 315751, 8725504],
  [-11.56376, -76.72366, 1638, 'ch', 'h', '2025-11-15', 312041, 8721117],
  [-11.58711, -76.74746, 1533, 'ch', 'c', '2025-11-15', 309461, 8718518],
  [-11.69813, -76.84637, 958, 'ch', 'n', '2025-11-15', 298753, 8706169],
  [-11.69923, -76.87005, 892, 'ch', 'p', '2025-11-15', 296172, 8706030],
  [-11.620833, -76.773611, 1647, 'ch', 'c', '2025-10-20', 306632, 8714770],
  [-11.619444, -76.772778, 1651, 'ch', 'c', '2025-10-20', 306722, 8714924],
  [-11.646111, -76.778889, 1177, 'ch', 'c', '2025-10-20', 306074, 8711970],
  [-11.634722, -76.775278, 1255, 'ch', 'c', '2025-10-20', 306459, 8713232],
  [-11.505556, -76.775833, 2306, 'ch', 'h', '2025-10-20', 306310, 8727521],
  [-11.403056, -76.523333, 3694, 'ch', 'c', '2025-10-20', 333797, 8739017],
  [-11.4075, -76.563056, 3541, 'ch', 'c', '2025-10-20', 329465, 8738502],
  [-11.4525, -76.6, 3270, 'ch', 'c', '2025-10-20', 325460, 8733502],
  [-11.463889, -76.605278, 3143, 'ch', 'c', '2025-10-20', 324891, 8732239],
  [-11.474444, -76.623056, 2870, 'ch', 'c', '2025-10-20', 322958, 8731061],
  [-11.475, -76.623333, 2871, 'ch', 'c', '2025-10-21', 322928, 8730999],
  [-11.470833, -76.625833, 2818, 'ch', 'c', '2025-10-21', 322653, 8731458],
  [-11.463333, -76.631111, 2570, 'ch', 'h', '2025-10-21', 322072, 8732285],
  [-11.464167, -76.631944, 2561, 'ch', 'h', '2025-10-21', 321982, 8732192],
  [-11.468333, -76.633056, 2558, 'ch', 'h', '2025-10-21', 321863, 8731731],
  [-11.468889, -76.632778, 2553, 'ch', 'h', '2025-10-21', 321894, 8731669],
  [-11.468333, -76.633056, 2558, 'ch', 'h', '2025-10-21', 321863, 8731731],
  [-11.468333, -76.633056, 2558, 'ch', 'c', '2025-10-21', 321863, 8731731],
  [-11.469167, -76.632778, 2555, 'ch', 'h', '2025-10-21', 321894, 8731639],
  [-11.469167, -76.632778, 2555, 'ch', 'c', '2025-10-21', 321894, 8731639],
  [-11.469444, -76.632778, 2551, 'ch', 'h', '2025-10-21', 321894, 8731608],
  [-11.469444, -76.632778, 2551, 'ch', 'c', '2025-10-21', 321894, 8731608],
  [-11.4775, -76.635, 2477, 'ch', 'h', '2025-10-21', 321657, 8730715],
  [-11.4775, -76.635, 2477, 'ch', 'c', '2025-10-21', 321657, 8730715],
  [-11.479722, -76.636667, 2455, 'ch', 'h', '2025-10-21', 321477, 8730469],
  [-11.479722, -76.636667, 2455, 'ch', 'c', '2025-10-21', 321477, 8730469],
  [-11.480556, -76.6375, 2445, 'ch', 'c', '2025-10-21', 321386, 8730376],
  [-11.480556, -76.638333, 2440, 'ch', 'c', '2025-10-21', 321295, 8730375]
];

// Bounding box geográfico para proyección del mapa
const MAP_BOUNDS = {
  latMin: -12.20, latMax: -11.38,
  lngMin: -76.90, lngMax: -76.27
};
