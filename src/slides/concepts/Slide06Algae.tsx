import { ConceptFrame } from './shared'

/**
 * Slide 06 — El Alga que Sabe Contar.
 * 4 filas con cápsulas 16-bit de alto contraste (A moneda, B cian) y contador LED Fibonacci.
 */

const AMBER = '#FACC15'
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
      className="flex h-8 w-8 items-center justify-center pixel-bevel-sm font-mono text-sm font-extrabold text-[#0F172A] sm:h-10 sm:w-10"
      style={{ backgroundColor: bg, color: '#0F172A' }}
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
            className="flex items-center gap-4 pixel-bevel bg-white px-4 py-2.5 animate-fade-up"
            style={{ animationDelay: `${0.1 + i * 0.12}s` }}
          >
            <span className="w-12 shrink-0 font-mono text-xs font-black text-[#0F172A]">
              n={i}
            </span>
            <div className="flex flex-1 flex-wrap gap-1.5">
              {row.str.split('').map((ch, j) => (
                <Capsule key={j} letter={ch} />
              ))}
            </div>
            {/* Contador Fibonacci: paleta daylight 16-bit con verde lima y tinta oscura de alto contraste */}
            <span
              className="pixel-bevel-sm bg-[#A3E635] px-2.5 py-1 text-right font-mono text-sm font-black text-[#0F172A] sm:text-base"
              style={{ color: '#0F172A', backgroundColor: '#A3E635' }}
            >
              #{row.count}
            </span>
          </div>
        ))}
        <p className="pt-1 text-center font-mono text-xs font-extrabold text-[#0F172A]">
          1, 2, 3, 5 … Fibonacci emergente
        </p>
      </div>
    </ConceptFrame>
  )
}
