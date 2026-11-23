/**
 * Configuración declarativa del flujo de la presentación.
 *
 * 6 secciones temáticas · 23 slides en orden lineal. Cada entrada declara su
 * número, la sección a la que pertenece, su acento neón, un título corto (para
 * el menú y el HUD) y el identificador del componente que lo renderiza.
 *
 * Regla de oro: cada slide muestra ≤ 15 palabras; la explicación vive en la
 * voz del equipo. Interfaz 100 % limpia, sin notas ni guion en pantalla.
 */

/** Acentos neón disponibles por sección. */
export type Accent = 'cyan' | 'emerald' | 'amber' | 'magenta'

/**
 * Identificador del componente que dibuja cada slide. Los `sketch*` montan un
 * <P5Canvas>; el resto son slides conceptuales con SVG + CSS.
 */
export type SlideComponentId =
  | 'sketch-hook'
  | 'cover'
  | 'history'
  | 'parallel'
  | 'ingredients'
  | 'algae-diagram'
  | 'sketch-algae'
  | 'sketch-rewrite' // doble cuaderno / reescritura paralela (Sketch11)
  | 'turtle'
  | 'fractal-zoom' // ¿qué es un fractal? autosimilitud (Sketch8)
  | 'sketch-koch' // Sketch3 fractales de tortuga
  | 'fern' // fractales en la naturaleza: helecho de Barnsley (Sketch12)
  | 'stack'
  | 'edge-node'
  | 'sketch-plant' // Sketch4
  | 'sketch-sandbox' // laboratorio abierto: construye tu L-System (Sketch9)
  | 'levels'
  | 'dice'
  | 'sketch-forest' // Sketch5 stochastic
  | 'sketch-compare' // determinista vs. estocástico (Sketch10)
  | 'sketch-context' // Sketch6 IL (sensible a contexto)
  | 'sketch-parametric' // Sketch7 paramétrico (da Vinci)
  | 'phototropism'
  | 'exponential'
  | 'sketch-stress' // Sketch5 stress
  | 'three-d'
  | 'applications'
  | 'closing' // SketchClosing bosque

export interface Act {
  id: number
  /** Número romano (uso interno para agrupar; ya no se muestra al público). */
  label: string
  title: string
  /** Etiqueta corta visible para el público (sin la palabra «Acto»). */
  tag: string
  accent: Accent
}

export interface Slide {
  /** Número de slide en orden lineal. */
  n: number
  /** Sección temática a la que pertenece (1..6, uso interno). */
  act: number
  accent: Accent
  /** Título corto para el menú / HUD (no es necesariamente el texto en pantalla). */
  title: string
  /** Componente que renderiza el slide. */
  component: SlideComponentId
}

export const ACTS: Act[] = [
  { id: 1, label: 'I', title: 'El Enganche Visual y el Origen Biológico', tag: 'ORIGEN', accent: 'cyan' },
  { id: 2, label: 'II', title: 'Los 3 Ingredientes del ADN Digital', tag: 'INGREDIENTES', accent: 'emerald' },
  { id: 3, label: 'III', title: 'La Tortuga y el Poder de Recordar', tag: 'LA TORTUGA', accent: 'amber' },
  { id: 4, label: 'IV', title: 'De Clones Perfectos a Naturaleza Viva', tag: 'NATURALEZA VIVA', accent: 'magenta' },
  { id: 5, label: 'V', title: 'Detrás de Cámaras en Computación Visual', tag: 'DETRÁS DE CÁMARAS', accent: 'cyan' },
  { id: 6, label: 'VI', title: 'Impacto Real y Cierre', tag: 'IMPACTO REAL', accent: 'emerald' },
]

export const TEAM_NAME = 'GAYMERS'

export const TEAM_MOTTO =
  '«En computación visual no esculpimos formas: programamos su ADN y dejamos que el código crezca.»'

export const TEAM = [
  'Nicolás Bolaños',
  'Ariadna Rueda',
  'Farid Ardila',
  'Angel Beltrán',
]

export interface TeamMember {
  player: string
  name: string
  role: string
  color: string
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    player: 'P1',
    name: 'Nicolás Bolaños',
    role: 'Demos & Gameloop',
    color: 'bg-[#38BDF8]',
  },
  {
    player: 'P2',
    name: 'Ariadna Rueda',
    role: 'Bio-Origen & Variación',
    color: 'bg-[#F472B6]',
  },
  {
    player: 'P3',
    name: 'Farid Ardila',
    role: 'Paralelismo & 3D',
    color: 'bg-[#A3E635]',
  },
  {
    player: 'P4',
    name: 'Angel Beltrán',
    role: 'Reglas & Rendimiento',
    color: 'bg-[#FACC15]',
  },
]

export const SLIDES: Slide[] = [
  // ── Sección 1 · ORIGEN ──
  { n: 1, act: 1, accent: 'emerald', title: 'Gancho: árbol en vivo', component: 'sketch-hook' },
  { n: 2, act: 1, accent: 'cyan', title: 'L-Systems: El ADN de las Formas', component: 'cover' },
  { n: 3, act: 1, accent: 'cyan', title: '1968: Aristid Lindenmayer', component: 'history' },
  { n: 4, act: 1, accent: 'cyan', title: 'Uno a la Vez vs. Todos al Tiempo', component: 'parallel' },

  // ── Sección 2 · INGREDIENTES ──
  { n: 5, act: 2, accent: 'emerald', title: 'Los 3 Ingredientes', component: 'ingredients' },
  { n: 6, act: 2, accent: 'emerald', title: 'El Alga que Sabe Contar', component: 'algae-diagram' },
  { n: 7, act: 2, accent: 'emerald', title: 'Sketch: Fibonacci emergente', component: 'sketch-algae' },

  // ── Sección 3 · LA TORTUGA ──
  { n: 8, act: 3, accent: 'amber', title: 'De Letras a Píxeles: La Tortuga', component: 'turtle' },
  { n: 9, act: 3, accent: 'amber', title: '¿Qué es un Fractal?', component: 'fractal-zoom' },
  { n: 10, act: 3, accent: 'amber', title: 'Sketch: fractales de tortuga', component: 'sketch-koch' },
  { n: 11, act: 3, accent: 'amber', title: 'Fractales en la Naturaleza', component: 'fern' },
  { n: 12, act: 3, accent: 'amber', title: 'El Superpoder de Recordar: [ y ]', component: 'stack' },
  { n: 13, act: 3, accent: 'amber', title: 'Crecer por Tallos vs. por Yemas', component: 'edge-node' },
  { n: 14, act: 3, accent: 'amber', title: 'Sketch: planta ramificada', component: 'sketch-plant' },
  { n: 15, act: 3, accent: 'amber', title: 'Laboratorio: construye tu L-System', component: 'sketch-sandbox' },

  // ── Sección 4 · NATURALEZA VIVA ──
  { n: 16, act: 4, accent: 'magenta', title: 'Los 5 Niveles de Realismo', component: 'levels' },
  { n: 17, act: 4, accent: 'magenta', title: 'El Bosque de los Dados', component: 'dice' },
  { n: 18, act: 4, accent: 'magenta', title: 'Sketch: bosque estocástico', component: 'sketch-forest' },
  { n: 19, act: 4, accent: 'magenta', title: 'Sketch: determinista vs. azar', component: 'sketch-compare' },
  { n: 20, act: 4, accent: 'magenta', title: 'Sketch: señal sensible a contexto', component: 'sketch-context' },
  { n: 21, act: 4, accent: 'magenta', title: 'Sketch: grosor paramétrico (da Vinci)', component: 'sketch-parametric' },
  { n: 22, act: 4, accent: 'magenta', title: 'Cuando la Planta Mira al Sol', component: 'phototropism' },

  // ── Sección 5 · DETRÁS DE CÁMARAS ──
  { n: 23, act: 5, accent: 'cyan', title: 'Peligro Exponencial y Doble Cuaderno', component: 'exponential' },
  { n: 24, act: 5, accent: 'cyan', title: 'Sketch: el doble cuaderno en vivo', component: 'sketch-rewrite' },
  { n: 25, act: 5, accent: 'cyan', title: 'Sketch: prueba de estrés', component: 'sketch-stress' },
  { n: 26, act: 5, accent: 'cyan', title: 'Del Plano 2D al Mundo 3D', component: 'three-d' },

  // ── Sección 6 · IMPACTO REAL ──
  { n: 27, act: 6, accent: 'emerald', title: 'Mundos Infinitos en Pocos Kilobytes', component: 'applications' },
  { n: 28, act: 6, accent: 'emerald', title: 'Cierre: reglas simples, mundos infinitos', component: 'closing' },
]

/** Devuelve la sección a la que pertenece un slide. */
export function actForSlide(n: number): Act {
  const slide = SLIDES.find((s) => s.n === n)
  const actId = slide?.act ?? 1
  return ACTS.find((a) => a.id === actId) ?? ACTS[0]
}
