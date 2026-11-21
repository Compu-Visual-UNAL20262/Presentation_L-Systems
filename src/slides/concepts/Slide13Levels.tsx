import { ConceptFrame } from './shared'

/**
 * Slide 13 — Los 5 Niveles de Realismo.
 * Escalera ascendente de 5 peldaños.
 */

const LEVELS = [
  { n: '1', name: 'Exacto', tag: 'D0L', color: '#38BDF8' },
  { n: '2', name: 'Aleatorio', tag: 'S0L', color: '#2ECC71' },
  { n: '3', name: 'Vecinos', tag: 'IL', color: '#F39C12' },
  { n: '4', name: 'Con Medidas', tag: 'Paramétrico', color: '#EC4899' },
  { n: '5', name: 'Con Entorno', tag: 'Open', color: '#A78BFA' },
]

export default function Slide13Levels() {
  return (
    <ConceptFrame badge="ACTO IV" accent="magenta" title="Los 5 Niveles de Realismo">
      <div className="flex w-full max-w-4xl items-end justify-center gap-1.5 sm:gap-3">
        {LEVELS.map((lvl, i) => (
          <div
            key={lvl.n}
            className="flex flex-1 flex-col items-center animate-fade-up"
            style={{ animationDelay: `${0.1 + i * 0.12}s` }}
          >
            <span className="mb-1 font-display text-[10px] font-semibold text-slate-200 sm:text-sm">
              {lvl.name}
            </span>
            <span className="mb-1.5 hidden font-mono text-[10px] text-slate-300 sm:block">
              {lvl.tag}
            </span>
            <div
              className="flex w-full items-center justify-center pixel-bevel"
              style={{
                height: `${48 + i * 26}px`,
                backgroundColor: lvl.color,
                boxShadow: `0 0 14px -5px ${lvl.color}`,
              }}
            >
              <span className="font-pixel text-base text-base">{lvl.n}</span>
            </div>
          </div>
        ))}
      </div>
    </ConceptFrame>
  )
}
