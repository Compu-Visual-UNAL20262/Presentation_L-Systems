/**
 * Configuración declarativa del flujo de la presentación.
 *
 * 6 Actos narrativos · 21 slides en orden lineal. Cada entrada declara su
 * número, el Acto al que pertenece, su acento neón, un título corto (para el
 * menú y el HUD) y el identificador del componente que lo renderiza.
 *
 * Regla de oro: cada slide muestra ≤ 15 palabras; la explicación vive en la
 * voz del equipo. Interfaz 100 % limpia, sin notas ni guion en pantalla.
 */

/** Acentos neón disponibles por Acto. */
export type Accent = 'cyan' | 'emerald' | 'amber' | 'magenta'

/**
 * Identificador del componente que dibuja cada slide. Los `sketch*` montan un
 * <P5Canvas>; el resto son slides conceptuales con SVG + CSS.
 */
export type SlideComponentId =
  | 'sketch-hook' // 01 Sketch1 (árbol)
  | 'cover' // 02
  | 'history' // 03
  | 'parallel' // 04
  | 'ingredients' // 05
  | 'algae-diagram' // 06
  | 'sketch-algae' // 07 Sketch2
  | 'turtle' // 08
  | 'sketch-koch' // 09 Sketch3
  | 'stack' // 10
  | 'edge-node' // 11
  | 'sketch-plant' // 12 Sketch4
  | 'levels' // 13
  | 'dice' // 14
  | 'sketch-forest' // 15 Sketch5 stochastic
  | 'phototropism' // 16
  | 'exponential' // 17
  | 'sketch-stress' // 18 Sketch5 stress
  | 'three-d' // 19
  | 'applications' // 20
  | 'closing' // 21 Sketch1 bosque

export interface Act {
  id: number
  /** Número romano para el badge pixel. */
  label: string
  title: string
  accent: Accent
}

export interface Slide {
  /** Número de slide 1..21. */
  n: number
  /** Acto al que pertenece (1..6). */
  act: number
  accent: Accent
  /** Título corto para el menú / HUD (no es necesariamente el texto en pantalla). */
  title: string
  /** Componente que renderiza el slide. */
  component: SlideComponentId
}

export const ACTS: Act[] = [
  { id: 1, label: 'I', title: 'El Enganche Visual y el Origen Biológico', accent: 'cyan' },
  { id: 2, label: 'II', title: 'Los 3 Ingredientes del ADN Digital', accent: 'emerald' },
  { id: 3, label: 'III', title: 'La Tortuga y el Poder de Recordar', accent: 'amber' },
  { id: 4, label: 'IV', title: 'De Clones Perfectos a Naturaleza Viva', accent: 'magenta' },
  { id: 5, label: 'V', title: 'Detrás de Cámaras en Computación Visual', accent: 'cyan' },
  { id: 6, label: 'VI', title: 'Impacto Real y Cierre', accent: 'emerald' },
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
  // ── Acto I ──
  { n: 1, act: 1, accent: 'emerald', title: 'Gancho: árbol en vivo', component: 'sketch-hook' },
  { n: 2, act: 1, accent: 'cyan', title: 'L-Systems: El ADN de las Formas', component: 'cover' },
  { n: 3, act: 1, accent: 'cyan', title: '1968: Aristid Lindenmayer', component: 'history' },
  { n: 4, act: 1, accent: 'cyan', title: 'Uno a la Vez vs. Todos al Tiempo', component: 'parallel' },

  // ── Acto II ──
  { n: 5, act: 2, accent: 'emerald', title: 'Los 3 Ingredientes', component: 'ingredients' },
  { n: 6, act: 2, accent: 'emerald', title: 'El Alga que Sabe Contar', component: 'algae-diagram' },
  { n: 7, act: 2, accent: 'emerald', title: 'Sketch: Fibonacci emergente', component: 'sketch-algae' },

  // ── Acto III ──
  { n: 8, act: 3, accent: 'amber', title: 'De Letras a Píxeles: La Tortuga', component: 'turtle' },
  { n: 9, act: 3, accent: 'amber', title: 'Sketch: copo de Koch', component: 'sketch-koch' },
  { n: 10, act: 3, accent: 'amber', title: 'El Superpoder de Recordar: [ y ]', component: 'stack' },
  { n: 11, act: 3, accent: 'amber', title: 'Crecer por Tallos vs. por Yemas', component: 'edge-node' },
  { n: 12, act: 3, accent: 'amber', title: 'Sketch: planta ramificada', component: 'sketch-plant' },

  // ── Acto IV ──
  { n: 13, act: 4, accent: 'magenta', title: 'Los 5 Niveles de Realismo', component: 'levels' },
  { n: 14, act: 4, accent: 'magenta', title: 'El Bosque de los Dados', component: 'dice' },
  { n: 15, act: 4, accent: 'magenta', title: 'Sketch: bosque estocástico', component: 'sketch-forest' },
  { n: 16, act: 4, accent: 'magenta', title: 'Cuando la Planta Mira al Sol', component: 'phototropism' },

  // ── Acto V ──
  { n: 17, act: 5, accent: 'cyan', title: 'Peligro Exponencial y Doble Cuaderno', component: 'exponential' },
  { n: 18, act: 5, accent: 'cyan', title: 'Sketch: prueba de estrés', component: 'sketch-stress' },
  { n: 19, act: 5, accent: 'cyan', title: 'Del Plano 2D al Mundo 3D', component: 'three-d' },

  // ── Acto VI ──
  { n: 20, act: 6, accent: 'emerald', title: 'Mundos Infinitos en Pocos Kilobytes', component: 'applications' },
  { n: 21, act: 6, accent: 'emerald', title: 'Cierre: reglas simples, mundos infinitos', component: 'closing' },
]

/** Devuelve el Acto al que pertenece un slide. */
export function actForSlide(n: number): Act {
  const slide = SLIDES.find((s) => s.n === n)
  const actId = slide?.act ?? 1
  return ACTS.find((a) => a.id === actId) ?? ACTS[0]
}
