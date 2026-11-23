import { ConceptFrame } from './shared'
import PixelMeme from '../../components/PixelMeme'

/**
 * Slide 14 — El Bosque de los Dados.
 * 3 árboles clonados idénticos vs. 3 distintos, con un dado pixelado + Meme RNG.
 */

function TreeGlyph({ d, color }: { d: string; color: string }) {
  return (
    <svg viewBox="0 0 60 80" className="h-16 sm:h-20">
      <path d="M30 76 L30 48" stroke="#5C3A21" strokeWidth="4" strokeLinecap="round" />
      <path d={d} stroke={color} strokeWidth="3.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}

function Die() {
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10 animate-spin-slow">
      <rect x="6" y="6" width="36" height="36" rx="6" fill="#FACC15" stroke="#0F172A" strokeWidth="3" />
      {[
        [15, 15],
        [33, 15],
        [24, 24],
        [15, 33],
        [33, 33],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3.2" fill="#0F172A" />
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
    <ConceptFrame badge="NATURALEZA VIVA" accent="magenta" title="El Bosque de los Dados">
      <div className="flex w-full max-w-4xl flex-col items-center gap-3.5 sm:gap-4">
        <div className="grid w-full gap-3.5 sm:grid-cols-2 sm:gap-4">
          <div className="pixel-bevel border-t-4 border-[#64748B] bg-white p-4 text-center sm:p-5">
            <div className="flex justify-center gap-3">
              {[0, 1, 2].map((i) => (
                <TreeGlyph key={i} d={CLONE} color="#475569" />
              ))}
            </div>
            <p className="mt-2 font-display text-sm font-bold text-[#0F172A]">
              Determinista · clones idénticos
            </p>
          </div>

          <div className="pixel-bevel border-t-4 border-[#DB2777] bg-white p-4 text-center sm:p-5">
            <div className="flex items-center justify-center gap-3">
              {VARIANTS.map((d, i) => (
                <TreeGlyph key={i} d={d} color="#16A34A" />
              ))}
              <Die />
            </div>
            <p className="mt-2 font-display text-sm font-bold text-[#0F172A]">
              Estocástico · cada árbol único
            </p>
          </div>
        </div>

        {/* Meme narrativo: clones Spider-Man vs RNG.
            Oculto en móvil para no recortar el contenido en viewports cortos. */}
        <PixelMeme variant="clones" className="hidden w-full max-w-md sm:block" />
      </div>
    </ConceptFrame>
  )
}
