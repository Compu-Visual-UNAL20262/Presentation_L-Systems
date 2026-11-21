import { ConceptFrame } from './shared'

/**
 * Slide 14 — El Bosque de los Dados.
 * 3 árboles clonados idénticos vs. 3 distintos, con un dado pixelado.
 */

function TreeGlyph({ d, color }: { d: string; color: string }) {
  return (
    <svg viewBox="0 0 60 80" className="h-20">
      <path d="M30 78 L30 50" stroke="#8C6239" strokeWidth="3" strokeLinecap="round" />
      <path d={d} stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}

function Die() {
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10 animate-spin-slow">
      <rect x="6" y="6" width="36" height="36" rx="6" fill="#EC4899" />
      {[
        [15, 15],
        [33, 15],
        [24, 24],
        [15, 33],
        [33, 33],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3.2" fill="#162033" />
      ))}
    </svg>
  )
}

const CLONE = 'M30 50 L18 38 M30 50 L42 38 M30 46 L30 30'
const VARIANTS = [
  'M30 50 L16 40 M30 50 L40 36 M30 44 L30 28',
  'M30 50 L20 34 M30 50 L44 42 M30 46 L28 30',
  'M30 50 L18 44 M30 50 L38 32 M30 42 L34 28',
]

export default function Slide14Dice() {
  return (
    <ConceptFrame badge="ACTO IV" accent="magenta" title="El Bosque de los Dados">
      <div className="grid w-full max-w-4xl gap-4 sm:grid-cols-2">
        <div className="pixel-bevel border-t-2 border-slate-400 bg-surface p-5 text-center">
          <div className="flex justify-center gap-3">
            {[0, 1, 2].map((i) => (
              <TreeGlyph key={i} d={CLONE} color="#94A3B8" />
            ))}
          </div>
          <p className="mt-3 font-display text-sm text-slate-300">Determinista · clones idénticos</p>
        </div>

        <div className="pixel-bevel border-t-2 border-neon-magenta bg-surface p-5 text-center">
          <div className="flex items-center justify-center gap-3">
            {VARIANTS.map((d, i) => (
              <TreeGlyph key={i} d={d} color="#2ECC71" />
            ))}
            <Die />
          </div>
          <p className="mt-3 font-display text-sm text-slate-300">Estocástico · cada árbol único</p>
        </div>
      </div>
    </ConceptFrame>
  )
}
