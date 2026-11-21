import { ConceptFrame } from './shared'

/**
 * Slide 11 — Crecer por Tallos vs. por Yemas.
 * Dos siluetas SVG: reescritura de aristas (F) vs. de nodos (X).
 */
export default function Slide11EdgeNode() {
  return (
    <ConceptFrame badge="ACTO III" accent="amber" title="Crecer por Tallos vs. por Yemas">
      <div className="grid w-full max-w-4xl gap-4 sm:grid-cols-2">
        {/* Reescritura de aristas: el segmento F se subdivide */}
        <div className="pixel-bevel border-t-2 border-neon-amber bg-surface p-6 text-center">
          <svg viewBox="0 0 120 120" className="mx-auto h-40">
            <g stroke="#F39C12" strokeWidth="2.5" fill="none" strokeLinecap="round">
              <path d="M60 110 L60 70" />
              <path d="M60 70 L44 52 M60 70 L76 52" />
              <path d="M60 70 L60 40" />
              <path d="M44 52 L34 40 M76 52 L86 40" />
            </g>
            <text x="60" y="118" textAnchor="middle" className="fill-slate-300" fontSize="8">
              F se subdivide
            </text>
          </svg>
          <h3 className="mt-2 font-display text-lg font-semibold text-slate-100">
            Reescritura de aristas
          </h3>
          <p className="font-mono text-xs text-slate-300">F → F[+F]F[-F]F</p>
        </div>

        {/* Reescritura de nodos: yemas X en las puntas */}
        <div className="pixel-bevel border-t-2 border-neon-emerald bg-surface p-6 text-center">
          <svg viewBox="0 0 120 120" className="mx-auto h-40">
            <g stroke="#84CC16" strokeWidth="2.5" fill="none" strokeLinecap="round">
              <path d="M60 110 L60 66" />
              <path d="M60 66 L40 44 M60 66 L80 44" />
            </g>
            {/* Yemas (nodos X) */}
            {[
              [40, 44],
              [80, 44],
              [60, 66],
            ].map(([cx, cy], i) => (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r="5"
                fill="#2ECC71"
                className="animate-pulse-soft"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            ))}
            <text x="60" y="118" textAnchor="middle" className="fill-slate-300" fontSize="8">
              yemas en las puntas
            </text>
          </svg>
          <h3 className="mt-2 font-display text-lg font-semibold text-slate-100">
            Reescritura de nodos
          </h3>
          <p className="font-mono text-xs text-slate-300">X → F[+X][-X]FX</p>
        </div>
      </div>
    </ConceptFrame>
  )
}
