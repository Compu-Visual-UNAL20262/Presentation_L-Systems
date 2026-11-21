import { ConceptFrame } from './shared'

/**
 * Slide 13 — Los 5 Niveles de Realismo.
 * Escalera ascendente de 5 peldaños 16-bit de alto contraste.
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
            <span className="mb-1 text-center font-display text-[11px] font-extrabold text-[#0F172A] sm:text-base">
              {lvl.name}
            </span>
            <span className="mb-2 hidden pixel-bevel-sm bg-white px-2 py-0.5 font-mono text-[10px] font-bold text-[#0F172A] sm:block">
              {lvl.tag}
            </span>
            <div
              className="flex w-full items-center justify-center pixel-bevel"
              style={{
                height: `${54 + i * 26}px`,
                backgroundColor: lvl.color,
              }}
            >
              <span className="pixel-bevel-sm bg-white px-2.5 py-1 font-pixel text-base font-bold text-[#0F172A]">
                0{lvl.n}
              </span>
            </div>
          </div>
        ))}
      </div>
    </ConceptFrame>
  )
}
