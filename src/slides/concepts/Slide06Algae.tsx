import { ConceptFrame } from './shared'

/**
 * Slide 06 — El Alga que Sabe Contar.
 * 4 filas con cápsulas coloreadas (A ámbar, B cian), recreando el esquema de
 * generaciones del Sketch 2: A(1) → AB(2) → ABA(3) → ABAAB(5).
 */

const AMBER = '#F39C12'
const CYAN = '#38BDF8'

const ROWS: { str: string; count: number }[] = [
  { str: 'A', count: 1 },
  { str: 'AB', count: 2 },
  { str: 'ABA', count: 3 },
  { str: 'ABAAB', count: 5 },
]

function Capsule({ letter }: { letter: string }) {
  const bg = letter === 'A' ? AMBER : CYAN
  return (
    <span
      className="flex h-8 w-8 items-center justify-center rounded-md font-mono text-sm font-bold text-base sm:h-10 sm:w-10"
      style={{ backgroundColor: bg }}
    >
      {letter}
    </span>
  )
}

export default function Slide06Algae() {
  return (
    <ConceptFrame badge="ACTO II" accent="emerald" title="El Alga que Sabe Contar">
      <div className="w-full max-w-2xl space-y-3">
        {ROWS.map((row, i) => (
          <div
            key={i}
            className="flex items-center gap-4 pixel-bevel bg-surface px-4 py-2.5 animate-fade-up"
            style={{ animationDelay: `${0.1 + i * 0.12}s` }}
          >
            <span className="w-10 shrink-0 font-mono text-xs text-slate-300">n={i}</span>
            <div className="flex flex-1 flex-wrap gap-1.5">
              {row.str.split('').map((ch, j) => (
                <Capsule key={j} letter={ch} />
              ))}
            </div>
            <span className="w-8 shrink-0 text-right font-mono text-lg text-neon-emerald">
              {row.count}
            </span>
          </div>
        ))}
        <p className="pt-1 text-center font-mono text-xs text-slate-300">
          1, 2, 3, 5 … Fibonacci emergente
        </p>
      </div>
    </ConceptFrame>
  )
}
