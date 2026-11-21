import Sketch1Tree from '../sketches/Sketch1Tree'
import Sketch2Algae from '../sketches/Sketch2Algae'
import Sketch3Koch from '../sketches/Sketch3Koch'
import Sketch4Plant from '../sketches/Sketch4Plant'
import Sketch5Forest from '../sketches/Sketch5Forest'

/**
 * Envoltorios de los slides basados en sketch. Cada uno monta el componente de
 * sketch (que incluye su propio <P5Canvas> en Instance Mode y sus controles) y
 * añade un badge/overlay discreto cuando el guion lo pide.
 */

/** Badge pixel pequeño y discreto para superponer sobre un sketch. */
function CornerBadge({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span
      className={`pointer-events-none font-pixel text-[9px] uppercase tracking-widest
        text-slate-200 bg-[#070A12]/85 backdrop-blur-sm border border-white/15 rounded px-2 py-1
        drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)] ${className}`}
    >
      {text}
    </span>
  )
}

/** Slide 01 — Árbol inmersivo, sin título, con pista de interacción. */
export function Slide01Hook() {
  return (
    <div className="relative h-full w-full">
      <Sketch1Tree initialForestMode={false} />
      <div className="pointer-events-none absolute bottom-16 left-1/2 -translate-x-1/2">
        <span className="font-pixel text-[10px] uppercase tracking-widest text-neon-emerald bg-[#070A12]/85 backdrop-blur-sm border border-white/15 rounded px-2.5 py-1.5 animate-pulse-soft">
          CLICK / ESPACIO PARA CRECER
        </span>
      </div>
    </div>
  )
}

/** Slide 07 — Alga Anabaena (Fibonacci). */
export function Slide07AlgaeSketch() {
  return (
    <div className="relative h-full w-full">
      <Sketch2Algae />
      <CornerBadge text="ACTO II · Sketch 2" className="absolute bottom-16 left-4" />
    </div>
  )
}

/** Slide 09 — Copo de Koch. */
export function Slide09KochSketch() {
  return (
    <div className="relative h-full w-full">
      <Sketch3Koch />
    </div>
  )
}

/** Slide 12 — Planta ramificada. */
export function Slide12PlantSketch() {
  return (
    <div className="relative h-full w-full">
      <Sketch4Plant />
      <CornerBadge text="ACTO III · Sketch 4" className="absolute bottom-16 left-4" />
    </div>
  )
}

/** Slide 15 — Bosque estocástico. */
export function Slide15ForestSketch() {
  return (
    <div className="relative h-full w-full">
      <Sketch5Forest mode="stochastic" />
      <CornerBadge text="ACTO IV · Sketch 5" className="absolute bottom-16 right-4" />
    </div>
  )
}

/** Slide 18 — Prueba de estrés (FPS). */
export function Slide18StressSketch() {
  return (
    <div className="relative h-full w-full">
      <Sketch5Forest mode="stress" />
      <CornerBadge text="ACTO V · Prueba de estrés" className="absolute bottom-16 right-4" />
    </div>
  )
}

/**
 * Slide 21 — Cierre: bosque completo con título discreto superpuesto.
 * El botón de reinicio del propio Sketch1 (REPLAY) vuelve a lanzar la
 * animación del bosque; aquí añadimos un título de cierre arriba.
 */
export function Slide21Closing() {
  return (
    <div className="relative h-full w-full">
      <Sketch1Tree initialForestMode={true} />
      <div className="pointer-events-none absolute inset-x-0 top-14 flex flex-col items-center px-6 text-center sm:top-20">
        <span className="font-pixel text-[10px] uppercase tracking-widest text-neon-emerald bg-[#070A12]/85 backdrop-blur-sm border border-white/15 rounded px-2.5 py-1.5">
          ACTO VI · CIERRE
        </span>
        <h2 className="mt-2 font-display text-2xl font-bold text-slate-100 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] sm:text-4xl">
          Reglas Simples. Mundos Infinitos.
        </h2>
      </div>
    </div>
  )
}
