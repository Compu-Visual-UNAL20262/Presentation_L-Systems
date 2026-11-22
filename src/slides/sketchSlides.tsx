import Sketch1Tree from '../sketches/Sketch1Tree'
import Sketch2Algae from '../sketches/Sketch2Algae'
import Sketch3Koch from '../sketches/Sketch3Koch'
import Sketch4Plant from '../sketches/Sketch4Plant'
import Sketch5Forest from '../sketches/Sketch5Forest'
import PixelMeme from '../components/PixelMeme'
import { TEAM } from '../data/slidesConfig'

/**
 * Envoltorios de los slides basados en sketch. Cada uno monta el componente de
 * sketch (que incluye su propio <P5Canvas> en Instance Mode y sus controles) y
 * añade un badge/overlay discreto 16-bit de día cuando el guion lo pide.
 */

/** Badge pixel pequeño y nítido para superponer sobre un sketch. */
function CornerBadge({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span
      className={`pointer-events-none font-pixel text-[10px] font-bold uppercase tracking-wider
        text-[#0F172A] bg-white pixel-bevel-sm px-2.5 py-1 ${className}`}
    >
      {text}
    </span>
  )
}

/** Slide 01 — Árbol inmersivo, sin título, con pista de interacción tipo START. */
export function Slide01Hook() {
  return (
    <div className="relative h-full w-full">
      <Sketch1Tree initialForestMode={false} />
      <div className="pointer-events-none absolute bottom-16 left-1/2 -translate-x-1/2">
        <span className="font-pixel text-[10px] font-bold uppercase tracking-widest text-[#0F172A] bg-[#A3E635] pixel-bevel-sm px-3.5 py-1.5 animate-pulse-soft">
          ▶ CLICK / ESPACIO PARA CRECER
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
      <div className="pointer-events-none absolute inset-x-0 top-14 z-20 flex justify-center px-4">
        <span className="pixel-bevel-sm bg-white px-3.5 py-1 font-pixel text-[9px] font-bold text-[#0F172A] sm:text-[10px]">
          🌲 ACTO IV · BIODIVERSIDAD CON REGLAS ESTOCÁSTICAS (S0L)
        </span>
      </div>
      <Sketch5Forest mode="stochastic" />
      <CornerBadge text="ACTO IV · Sketch 5" className="absolute bottom-16 right-4" />
    </div>
  )
}

/** Slide 18 — Prueba de estrés (FPS). */
export function Slide18StressSketch() {
  return (
    <div className="relative h-full w-full">
      <div className="pointer-events-none absolute inset-x-0 top-14 z-20 flex justify-center px-4">
        <span className="pixel-bevel-sm bg-[#FFF1F2] border-2 border-[#E11D48] px-3.5 py-1 font-pixel text-[9px] font-black text-[#E11D48] sm:text-[10px]">
          ⚠️ ACTO V · PRUEBA DE ESTRÉS: EXPLOSIÓN DE SEGMENTOS Y CAÍDA DE FPS
        </span>
      </div>
      <Sketch5Forest mode="stress" />
      <CornerBadge text="ACTO V · Prueba de estrés" className="absolute bottom-16 right-4" />
    </div>
  )
}

/**
 * Slide 21 — Cierre: bosque completo con tarjeta 16-bit de cierre y emblema
 * final del equipo Gaymers.
 */
export function Slide21Closing() {
  return (
    <div className="relative h-full w-full">
      <Sketch1Tree initialForestMode={true} autoStart={true} />
      <div className="pointer-events-none absolute inset-x-0 top-12 flex flex-col items-center px-4 text-center sm:top-14">
        <div className="pixel-bevel bg-white/95 px-5 py-3 sm:px-7 sm:py-4">
          <span className="inline-block pixel-bevel-sm bg-[#FACC15] px-2.5 py-0.5 font-pixel text-[10px] font-bold uppercase tracking-widest text-[#0F172A]">
            ACTO VI · GAME CLEAR · GAYMERS
          </span>
          <h2 className="mt-2 font-display text-2xl font-bold text-[#0F172A] sm:text-4xl">
            Reglas Simples. Mundos Infinitos.
          </h2>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5">
            {TEAM.map((member) => (
              <span
                key={member}
                className="border border-[#0F172A] bg-[#ECFCCB] px-2 py-0.5 font-mono text-[10px] font-bold text-[#0F172A]"
              >
                {member}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Emblema / Meme final del Equipo Gaymers (esquina inferior izquierda sobre el HUD) */}
      <div className="absolute bottom-16 left-4 z-20 hidden w-60 sm:block">
        <PixelMeme variant="rocket" />
      </div>
    </div>
  )
}
