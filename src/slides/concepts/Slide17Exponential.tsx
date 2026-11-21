import { ConceptFrame } from './shared'

/**
 * Slide 17 — El Peligro Exponencial y el Doble Cuaderno.
 * Curva exponencial O(bⁿ) + diagrama de dos buffers (Hoy → Mañana).
 */
export default function Slide17Exponential() {
  return (
    <ConceptFrame
      badge="ACTO V"
      accent="cyan"
      title="El Peligro Exponencial y el Doble Cuaderno"
    >
      <div className="grid w-full max-w-4xl gap-4 sm:grid-cols-2">
        {/* Curva exponencial */}
        <div className="pixel-bevel border-t-2 border-neon-magenta bg-surface p-5">
          <svg viewBox="0 0 160 120" className="w-full" role="img" aria-label="Crecimiento exponencial">
            <line x1="20" y1="100" x2="150" y2="100" stroke="#94A3B8" strokeWidth="1.5" />
            <line x1="20" y1="100" x2="20" y2="12" stroke="#94A3B8" strokeWidth="1.5" />
            <path
              d="M20 100 C70 99 95 92 115 60 C128 38 135 22 142 14"
              fill="none"
              stroke="#EC4899"
              strokeWidth="3"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray="1"
              className="animate-draw"
            />
            <text x="150" y="112" textAnchor="end" className="fill-slate-300" fontSize="9">
              n
            </text>
          </svg>
          <p className="mt-2 text-center font-mono text-xs text-neon-magenta">O(bⁿ)</p>
        </div>

        {/* Doble cuaderno (double buffering) */}
        <div className="pixel-bevel border-t-2 border-neon-cyan bg-surface p-5">
          <div className="flex items-center justify-center gap-3">
            <div className="pixel-bevel bg-base px-3 py-4 text-center">
              <div className="font-pixel text-[9px] text-slate-300">HOY</div>
              <div className="mt-1 font-mono text-sm text-slate-300">Sₙ</div>
              <div className="font-mono text-[10px] text-slate-300">solo lectura</div>
            </div>
            <svg viewBox="0 0 40 24" className="h-5 w-10 text-neon-cyan animate-slide-right">
              <path d="M2 12 H30" stroke="currentColor" strokeWidth="2" />
              <path d="M30 6 l8 6 l-8 6" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
            <div className="pixel-bevel bg-base px-3 py-4 text-center">
              <div className="font-pixel text-[9px] text-slate-300">MAÑANA</div>
              <div className="mt-1 font-mono text-sm text-neon-cyan">Sₙ₊₁</div>
              <div className="font-mono text-[10px] text-slate-300">buffer limpio</div>
            </div>
          </div>
          <p className="mt-3 text-center font-mono text-xs text-slate-300">swap al terminar</p>
        </div>
      </div>
    </ConceptFrame>
  )
}
