import Sketch1Tree from '../sketches/Sketch1Tree'
import Sketch2Algae from '../sketches/Sketch2Algae'
import Sketch3Koch from '../sketches/Sketch3Koch'
import Sketch4Plant from '../sketches/Sketch4Plant'
import Sketch5Forest from '../sketches/Sketch5Forest'
import Sketch6Context from '../sketches/Sketch6Context'
import Sketch7Parametric from '../sketches/Sketch7Parametric'
import Sketch8FractalZoom from '../sketches/Sketch8FractalZoom'
import Sketch9Sandbox from '../sketches/Sketch9Sandbox'
import Sketch10Compare from '../sketches/Sketch10Compare'
import Sketch11Rewrite from '../sketches/Sketch11Rewrite'
import Sketch12Fern from '../sketches/Sketch12Fern'
import SketchClosing from '../sketches/SketchClosing'
import PixelGlyph from '../components/PixelGlyph'
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
      <div className="pointer-events-none absolute bottom-16 left-1/2 max-w-[92vw] -translate-x-1/2 px-3">
        <span className="inline-flex items-center gap-1.5 font-pixel text-[10px] font-bold uppercase tracking-widest text-[#0F172A] bg-[#A3E635] pixel-bevel-sm px-3.5 py-1.5 animate-pulse-soft">
          <PixelGlyph name="play" />
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
      <CornerBadge text="Demo · Fibonacci emergente" className="absolute bottom-16 left-4" />
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
      <CornerBadge text="Demo · Planta ramificada" className="absolute bottom-16 left-4" />
    </div>
  )
}

/** Slide — L-System sensible al contexto (señal hormonal). */
export function SlideContextSketch() {
  return (
    <div className="relative h-full w-full">
      <Sketch6Context />
      <CornerBadge text="Demo · Sensible a contexto (IL)" className="absolute bottom-16 right-4" />
    </div>
  )
}

/** Slide — L-System paramétrico (grosor de da Vinci). */
export function SlideParametricSketch() {
  return (
    <div className="relative h-full w-full">
      <Sketch7Parametric />
      <CornerBadge text="Demo · Paramétrico (da Vinci)" className="absolute bottom-16 left-4" />
    </div>
  )
}

/** Slide 15 — Bosque estocástico. */
export function Slide15ForestSketch() {
  return (
    <div className="relative h-full w-full">
      <div className="pointer-events-none absolute inset-x-0 top-14 z-20 flex justify-center px-4">
        <span className="pixel-bevel-sm bg-white px-3.5 py-1 font-pixel text-[9px] font-bold text-[#0F172A] sm:text-[10px]">
          🌲 BIODIVERSIDAD CON REGLAS ESTOCÁSTICAS (S0L)
        </span>
      </div>
      <Sketch5Forest mode="stochastic" />
      <CornerBadge text="Demo · Bosque estocástico" className="absolute bottom-16 right-4" />
    </div>
  )
}

/** Slide 18 — Prueba de estrés (FPS). */
export function Slide18StressSketch() {
  return (
    <div className="relative h-full w-full">
      <div className="pointer-events-none absolute inset-x-0 top-14 z-20 flex justify-center px-4">
        <span className="pixel-bevel-sm bg-[#FFF1F2] border-2 border-[#E11D48] px-3.5 py-1 font-pixel text-[9px] font-black text-[#E11D48] sm:text-[10px]">
          ⚠️ PRUEBA DE ESTRÉS: EXPLOSIÓN DE SEGMENTOS Y CAÍDA DE FPS
        </span>
      </div>
      <Sketch5Forest mode="stress" />
      <CornerBadge text="Demo · Prueba de estrés" className="absolute bottom-16 right-4" />
    </div>
  )
}

/** Slide — ¿Qué es un fractal? (zoom de autosimilitud). */
export function SlideFractalZoomSketch() {
  return (
    <div className="relative h-full w-full">
      <Sketch8FractalZoom />
      <CornerBadge text="Concepto · ¿Qué es un fractal?" className="absolute bottom-16 right-4" />
    </div>
  )
}

/** Slide — Fractales en la naturaleza (helecho de Barnsley). */
export function SlideFernSketch() {
  return (
    // Cielo 16-bit de día detrás del helecho. El canvas es transparente, así
    // que este gradiente es el fondo real: constante, sin "flash" ni cambio de
    // color al pulsar «volver a crecer».
    <div
      className="relative h-full w-full"
      style={{ background: 'linear-gradient(180deg, #BAE6FD 0%, #D8F3FF 60%, #E6F8FF 100%)' }}
    >
      <Sketch12Fern />
      <CornerBadge text="Demo · Fractales en la naturaleza" className="absolute bottom-16 left-4" />
    </div>
  )
}

/** Slide — Laboratorio abierto: construye tu propio L-System. */
export function SlideSandboxSketch() {
  return (
    <div className="relative h-full w-full">
      <Sketch9Sandbox />
      <CornerBadge text="Demo · Construye tu L-System" className="absolute bottom-16 right-4" />
    </div>
  )
}

/** Slide — Determinista vs. estocástico lado a lado. */
export function SlideCompareSketch() {
  return (
    <div className="relative h-full w-full">
      <Sketch10Compare />
      <CornerBadge text="Demo · Determinista vs. azar" className="absolute bottom-16 left-4" />
    </div>
  )
}

/** Slide — El doble cuaderno (reescritura paralela paso a paso). */
export function SlideRewriteSketch() {
  return (
    <div className="relative h-full w-full">
      <Sketch11Rewrite />
      <CornerBadge text="Demo · Doble cuaderno (buffers)" className="absolute bottom-16 right-4" />
    </div>
  )
}

/**
 * Slide 21 — Cierre: un bosque estocástico diverso que crece ante la audiencia
 * (payoff de la charla: reglas simples → mundos infinitos). Tarjeta 16-bit de
 * cierre y emblema del equipo Gaymers.
 */
export function Slide21Closing() {
  return (
    <div className="relative h-full w-full">
      <SketchClosing />
      <div className="pointer-events-none absolute inset-x-0 top-12 flex flex-col items-center px-4 text-center sm:top-14">
        <div className="pixel-bevel bg-white/95 px-5 py-3 sm:px-7 sm:py-4">
          <span className="inline-block pixel-bevel-sm bg-[#FACC15] px-2.5 py-0.5 font-pixel text-[10px] font-bold uppercase tracking-widest text-[#0F172A]">
            GAME CLEAR · GAYMERS
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
    </div>
  )
}
