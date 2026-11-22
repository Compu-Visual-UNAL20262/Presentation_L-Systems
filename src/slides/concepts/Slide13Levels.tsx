import { ConceptFrame } from './shared'

/**
 * Slide 13 — Los 5 Niveles de Realismo.
 * Escalera ascendente de 5 peldaños 16-bit de máximo contraste para proyector.
 */

const LEVELS = [
  { n: '1', name: 'Exacto', tag: 'D0L', color: '#38BDF8' },
  { n: '2', name: 'Aleatorio', tag: 'S0L', color: '#A3E635' },
  { n: '3', name: 'Vecinos', tag: 'IL', color: '#FACC15' },
  { n: '4', name: 'Con Medidas', tag: 'Paramétrico', color: '#F472B6' },
  { n: '5', name: 'Con Entorno', tag: 'Open', color: '#C084FC' },
]

export default function Slide13Levels() {
  return (
    <ConceptFrame badge="ACTO IV" accent="magenta" title="Los 5 Niveles de Realismo">
      <div className="flex w-full max-w-4xl items-end justify-center gap-2 sm:gap-3.5">
        {LEVELS.map((lvl, i) => (
          <div
            key={lvl.n}
            className="flex flex-1 flex-col items-center animate-fade-up"
            style={{ animationDelay: `${0.1 + i * 0.12}s` }}
          >
            {/* Nombre del nivel con contraste forzado */}
            <span
              className="mb-1 text-center font-display text-xs font-black text-[#0F172A] sm:text-base"
              style={{ color: '#0F172A' }}
            >
              {lvl.name}
            </span>
            {/* Tag técnico (D0L, S0L, etc.) en paleta daylight 16-bit: caja blanca con tinta oscura */}
            <span
              className="mb-2 pixel-bevel-sm bg-white px-2 py-0.5 font-mono text-[9px] font-black text-[#0F172A] sm:text-[10px]"
              style={{ color: '#0F172A', backgroundColor: '#FFFFFF' }}
            >
              {lvl.tag}
            </span>
            {/* Peldaño 16-bit con número oscuro de alto contraste */}
            <div
              className="flex w-full items-center justify-center pixel-bevel"
              style={{
                height: `${54 + i * 26}px`,
                backgroundColor: lvl.color,
              }}
            >
              <span
                className="pixel-bevel-sm bg-white px-2.5 py-1 font-pixel text-sm font-black text-[#0F172A] sm:text-base"
                style={{ color: '#0F172A', backgroundColor: '#FFFFFF' }}
              >
                0{lvl.n}
              </span>
            </div>
          </div>
        ))}
      </div>
    </ConceptFrame>
  )
}
