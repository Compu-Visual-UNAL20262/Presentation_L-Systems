import type { SketchId } from '../sketches'

/**
 * Configuración declarativa de la presentación.
 *
 * 6 Actos narrativos · 21 slides. Cada slide declara a qué Acto pertenece,
 * su tipo de layout y el contenido mínimo (regla de oro: ≤ 15 palabras
 * visibles; la explicación vive en la voz del equipo). No hay notas de
 * presentador ni guion en pantalla: la interfaz es 100 % limpia.
 */

/** Acentos neón disponibles por Acto. */
export type Accent = 'cyan' | 'emerald' | 'amber' | 'magenta'

/** Tipos de layout que el renderizador de slides sabe dibujar. */
export type SlideKind =
  | 'cover' // Portada / título grande
  | 'statement' // Título + subtítulo centrado
  | 'sketch' // Lienzo p5 a pantalla completa (con overlay opcional)
  | 'compare' // Dos columnas enfrentadas
  | 'list' // Lista de ingredientes / pasos / niveles
  | 'rule' // Reglas L-System en monoespaciado
  | 'closing' // Cierre

export interface Act {
  id: number
  /** Número romano para el badge pixel. */
  label: string
  title: string
  accent: Accent
}

export interface ColumnItem {
  title: string
  body?: string
}

export interface ListItem {
  key: string
  title: string
  body?: string
}

export interface Slide {
  /** Número de slide 1..21. */
  n: number
  /** Acto al que pertenece (1..6). */
  act: number
  kind: SlideKind
  accent: Accent
  /** Badge pixel corto (p. ej. "ACTO I"). */
  badge?: string
  title?: string
  subtitle?: string
  /** Sketch a montar en slides de tipo "sketch". */
  sketch?: SketchId
  /** Arranca Sketch1 directamente en modo bosque (3 árboles) para el cierre. */
  initialForestMode?: boolean
  /** Texto breve superpuesto sobre el sketch. */
  overlay?: string
  /** Columnas para kind "compare". */
  columns?: [ColumnItem, ColumnItem]
  /** Elementos para kind "list". */
  items?: ListItem[]
  /** Reglas / código para kind "rule". */
  rule?: {
    lines: string[]
    caption?: string
  }
  /** Equipo (solo portada). */
  team?: string[]
}

export const ACTS: Act[] = [
  { id: 1, label: 'I', title: 'El Enganche Visual y el Origen Biológico', accent: 'cyan' },
  { id: 2, label: 'II', title: 'Los 3 Ingredientes del ADN Digital', accent: 'emerald' },
  { id: 3, label: 'III', title: 'La Tortuga y el Poder de Recordar', accent: 'amber' },
  { id: 4, label: 'IV', title: 'De Clones Perfectos a Naturaleza Viva', accent: 'magenta' },
  { id: 5, label: 'V', title: 'Detrás de Cámaras en Computación Visual', accent: 'cyan' },
  { id: 6, label: 'VI', title: 'Impacto Real y Cierre', accent: 'emerald' },
]

export const TEAM = [
  'Nicolas Bolaños',
  'Ariadna',
  'Farid Ardila',
  'Angel Beltran',
]

export const SLIDES: Slide[] = [
  // ─── ACTO I ───────────────────────────────────────────────────────────
  {
    n: 1,
    act: 1,
    kind: 'sketch',
    accent: 'emerald',
    sketch: 'sketch1',
    overlay: 'Cuatro líneas de texto, un bosque entero.',
  },
  {
    n: 2,
    act: 1,
    kind: 'cover',
    accent: 'cyan',
    badge: 'ACTO I',
    title: 'L-Systems: El ADN de las Formas',
    subtitle: 'Programar el crecimiento en lugar de esculpirlo.',
    team: TEAM,
  },
  {
    n: 3,
    act: 1,
    kind: 'statement',
    accent: 'cyan',
    badge: 'ACTO I',
    title: '1968 · Aristid Lindenmayer',
    subtitle: 'Un biólogo estudiando algas inventó un lenguaje para el crecimiento.',
  },
  {
    n: 4,
    act: 1,
    kind: 'compare',
    accent: 'cyan',
    badge: 'ACTO I',
    title: 'Uno a la Vez vs. Todos al Tiempo',
    columns: [
      { title: 'Gramática de Chomsky', body: 'Una regla, un símbolo, por turnos. Como una línea de ensamblaje.' },
      { title: 'L-System', body: 'Todas las reglas en paralelo, cada latido. Como la división celular.' },
    ],
  },

  // ─── ACTO II ──────────────────────────────────────────────────────────
  {
    n: 5,
    act: 2,
    kind: 'list',
    accent: 'emerald',
    badge: 'ACTO II',
    title: 'Los 3 Ingredientes',
    items: [
      { key: 'V', title: 'Alfabeto', body: 'Las piezas con las que jugamos.' },
      { key: 'ω', title: 'Axioma', body: 'La semilla inicial en n=0.' },
      { key: 'P', title: 'Reglas', body: 'Qué le pasa a cada pieza en el siguiente turno.' },
    ],
  },
  {
    n: 6,
    act: 2,
    kind: 'rule',
    accent: 'emerald',
    badge: 'ACTO II',
    title: 'El Alga que Sabe Contar',
    rule: {
      lines: ['ω = A', 'A → AB', 'B → A'],
      caption: 'n: A · AB · ABA · ABAAB → 1, 2, 3, 5, 8… (Fibonacci)',
    },
  },
  {
    n: 7,
    act: 2,
    kind: 'sketch',
    accent: 'emerald',
    sketch: 'sketch2',
    overlay: 'Nadie programó Fibonacci. Emerge de dos reglas.',
  },

  // ─── ACTO III ─────────────────────────────────────────────────────────
  {
    n: 8,
    act: 3,
    kind: 'statement',
    accent: 'amber',
    badge: 'ACTO III',
    title: 'De Letras a Píxeles: La Tortuga',
    subtitle: 'F avanza · + gira a la izquierda · − gira a la derecha.',
  },
  {
    n: 9,
    act: 3,
    kind: 'sketch',
    accent: 'amber',
    sketch: 'sketch3',
    overlay: 'Una regla, cuatro iteraciones: el copo de Koch.',
  },
  {
    n: 10,
    act: 3,
    kind: 'statement',
    accent: 'amber',
    badge: 'ACTO III',
    title: 'El Superpoder de Recordar: [ y ]',
    subtitle: 'Guardar posición → explorar rama → volver al tronco. Una pila LIFO.',
  },
  {
    n: 11,
    act: 3,
    kind: 'compare',
    accent: 'amber',
    badge: 'ACTO III',
    title: 'Crecer por Tallos vs. por Yemas',
    columns: [
      { title: 'Reescritura de aristas', body: 'Los segmentos F se subdividen y brotan ramas.' },
      { title: 'Reescritura de nodos', body: 'Yemas invisibles (X) controlan la edad de cada rama.' },
    ],
  },
  {
    n: 12,
    act: 3,
    kind: 'sketch',
    accent: 'amber',
    sketch: 'sketch4',
    overlay: 'Cambia δ y el ciprés se vuelve arbusto.',
  },

  // ─── ACTO IV ──────────────────────────────────────────────────────────
  {
    n: 13,
    act: 4,
    kind: 'list',
    accent: 'magenta',
    badge: 'ACTO IV',
    title: 'Los 5 Niveles de Realismo',
    items: [
      { key: '1', title: 'Exacto', body: 'D0L determinista: fractales perfectos.' },
      { key: '2', title: 'Aleatorio', body: 'Estocástico: variación orgánica.' },
      { key: '3', title: 'Vecinos', body: 'Sensible al contexto: hormonas.' },
      { key: '4', title: 'Con medidas', body: 'Paramétrico: grosor y edad.' },
      { key: '5', title: 'Con entorno', body: 'Abierto: luz, colisiones, gravedad.' },
    ],
  },
  {
    n: 14,
    act: 4,
    kind: 'statement',
    accent: 'magenta',
    badge: 'ACTO IV',
    title: 'El Bosque de los Dados',
    subtitle: 'Tres reglas con probabilidad: 40 % izquierda, 40 % derecha, 20 % recto.',
  },
  {
    n: 15,
    act: 4,
    kind: 'sketch',
    accent: 'magenta',
    sketch: 'sketch5',
    overlay: 'Ningún árbol repite la silueta del vecino.',
  },
  {
    n: 16,
    act: 4,
    kind: 'statement',
    accent: 'magenta',
    badge: 'ACTO IV',
    title: 'Cuando la Planta Mira al Sol',
    subtitle: 'Sistemas abiertos: fototropismo y evasión de obstáculos en 3D.',
  },

  // ─── ACTO V ───────────────────────────────────────────────────────────
  {
    n: 17,
    act: 5,
    kind: 'statement',
    accent: 'cyan',
    badge: 'ACTO V',
    title: 'El Peligro Exponencial',
    subtitle: 'O(bⁿ): de cientos de segmentos a millones. El navegador se congela.',
  },
  {
    n: 18,
    act: 5,
    kind: 'rule',
    accent: 'cyan',
    badge: 'ACTO V',
    title: 'El Doble Cuaderno',
    rule: {
      lines: ['leer   Sₙ   (solo lectura)', 'escribir Sₙ₊₁ (buffer limpio)', 'swap   Sₙ ⇄ Sₙ₊₁'],
      caption: 'Double buffering: nunca reescribir la cadena in-place.',
    },
  },
  {
    n: 19,
    act: 5,
    kind: 'statement',
    accent: 'cyan',
    badge: 'ACTO V',
    title: 'Del Plano 2D al Mundo 3D',
    subtitle: 'La tortuga pilotea como un avión: yaw, pitch, roll. Líneas → cilindros.',
  },

  // ─── ACTO VI ──────────────────────────────────────────────────────────
  {
    n: 20,
    act: 6,
    kind: 'list',
    accent: 'emerald',
    badge: 'ACTO VI',
    title: 'Mundos Infinitos en Pocos Kilobytes',
    items: [
      { key: '🎮', title: 'Videojuegos', body: 'SpeedTree, No Man\'s Sky: una semilla cultiva la flora.' },
      { key: '🏙️', title: 'Ciudades', body: 'Redes viales que crecen como raíces (Parish & Müller).' },
      { key: '🌾', title: 'Ciencia y arte', body: 'Cultivos virtuales y música algorítmica fractal.' },
    ],
  },
  {
    n: 21,
    act: 6,
    kind: 'sketch',
    accent: 'emerald',
    badge: 'ACTO VI',
    sketch: 'sketch1',
    initialForestMode: true,
    overlay: 'Reglas simples, mundos enteros. Muchas gracias.',
  },
]

/** Devuelve el Acto al que pertenece un slide. */
export function actForSlide(n: number): Act {
  const slide = SLIDES.find((s) => s.n === n)
  const actId = slide?.act ?? 1
  return ACTS.find((a) => a.id === actId) ?? ACTS[0]
}
