import { ConceptFrame } from './shared'

/**
 * Slide 19 — Del Plano 2D al Mundo 3D.
 * Tortuga/avión con los 3 ejes de rotación + transición línea → cilindro.
 */

function AxisChip({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="pixel-bevel bg-base px-2.5 py-1 font-pixel text-[10px] uppercase tracking-widest"
      style={{ color }}
    >
      {label}
    </span>
  )
}

export default function Slide19ThreeD() {
  return (
    <ConceptFrame badge="ACTO V" accent="cyan" title="Del Plano 2D al Mundo 3D">
      <div className="flex w-full max-w-4xl flex-col items-center gap-8">
        <div className="grid w-full gap-4 sm:grid-cols-2">
          {/* Avión/tortuga 3D con ejes */}
          <div className="pixel-bevel bg-surface p-5 text-center">
            <svg viewBox="0 0 160 120" className="mx-auto h-36 animate-float-y">
              {/* Avión de papel */}
              <path d="M80 30 L120 90 L80 72 L40 90 Z" fill="#38BDF8" opacity="0.9" />
              <path d="M80 30 L80 72" stroke="#070A12" strokeWidth="1.5" />
              {/* Ejes */}
              <path d="M80 72 L80 20" stroke="#2ECC71" strokeWidth="2" strokeDasharray="3 3" />
              <path d="M80 72 L140 72" stroke="#F39C12" strokeWidth="2" strokeDasharray="3 3" />
              <path d="M80 72 L30 100" stroke="#EC4899" strokeWidth="2" strokeDasharray="3 3" />
            </svg>
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              <AxisChip label="Yaw" color="#2ECC71" />
              <AxisChip label="Pitch" color="#F39C12" />
              <AxisChip label="Roll" color="#EC4899" />
            </div>
          </div>

          {/* Línea 1D → cilindro con hojas */}
          <div className="pixel-bevel bg-surface p-5 text-center">
            <svg viewBox="0 0 160 120" className="mx-auto h-36">
              {/* línea delgada */}
              <line x1="30" y1="100" x2="30" y2="24" stroke="#94A3B8" strokeWidth="1.5" />
              {/* flecha */}
              <path d="M58 62 H78" stroke="#38BDF8" strokeWidth="2" />
              <path d="M78 56 l8 6 l-8 6" fill="none" stroke="#38BDF8" strokeWidth="2" />
              {/* cilindro */}
              <path d="M104 100 L104 30 a12 5 0 0 0 24 0 L128 100 a12 5 0 0 1 -24 0" fill="#8C6239" />
              <ellipse cx="116" cy="30" rx="12" ry="5" fill="#84CC16" />
              {/* hojas instanciadas */}
              {[
                [100, 36],
                [132, 44],
                [102, 58],
              ].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="5" fill="#2ECC71" className="animate-float-y" style={{ animationDelay: `${i * 0.4}s` }} />
              ))}
            </svg>
            <p className="mt-2 font-display text-xs text-slate-300">Líneas → cilindros + hojas instanciadas</p>
          </div>
        </div>
      </div>
    </ConceptFrame>
  )
}
