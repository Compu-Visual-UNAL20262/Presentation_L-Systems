import { ConceptFrame } from './shared'

/**
 * Slide 11 — Crecer por Tallos vs. por Yemas.
 * Dos siluetas SVG sobre tarjetas claras: reescritura de aristas (F) vs. de nodos (X).
 */
export default function Slide11EdgeNode() {
  return (
    <ConceptFrame badge="ACTO III" accent="amber" title="Crecer por Tallos vs. por Yemas">
      <div className="grid w-full max-w-4xl gap-4 sm:grid-cols-2">
        {/* Reescritura de aristas: el segmento F se subdivide */}
        <div className="pixel-bevel border-t-4 border-[#D97706] bg-white p-6 text-center">
          <svg viewBox="0 0 120 120" className="mx-auto h-40">
            <rect x="6" y="6" width="108" height="100" rx="6" fill="#FFFBEB" stroke="#0F172A" strokeWidth="2" />
            <g stroke="#B45309" strokeWidth="3.5" fill="none" strokeLinecap="round">
              <path d="M60 98 L60 66" />
              <path d="M60 66 L42 46 M60 66 L78 46" />
              <path d="M60 66 L60 32" />
              <path d="M42 46 L30 32 M78 46 L90 32" />
            </g>
            <text x="60" y="116" textAnchor="middle" fill="#0F172A" fontWeight="bold" fontSize="8.5">
              F se subdivide
            </text>
          </svg>
          <h3 className="mt-2 font-display text-lg font-bold text-[#0F172A]">
            Reescritura de aristas
          </h3>
          <p className="mt-1 inline-block pixel-bevel-sm bg-[#FEF9C3] px-2.5 py-0.5 font-mono text-xs font-bold text-[#0F172A]">
            F → F[+F]F[-F]F
          </p>
        </div>

        {/* Reescritura de nodos: yemas X en las puntas */}
        <div className="pixel-bevel border-t-4 border-[#16A34A] bg-white p-6 text-center">
          <svg viewBox="0 0 120 120" className="mx-auto h-40">
            <rect x="6" y="6" width="108" height="100" rx="6" fill="#F0FDF4" stroke="#0F172A" strokeWidth="2" />
            <g stroke="#14532D" strokeWidth="3.5" fill="none" strokeLinecap="round">
              <path d="M60 98 L60 62" />
              <path d="M60 62 L38 38 M60 62 L82 38" />
            </g>
            {/* Yemas (nodos X) con borde oscuro */}
            {[
              [38, 38],
              [82, 38],
              [60, 62],
            ].map(([cx, cy], i) => (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r="6"
                fill="#A3E635"
                stroke="#0F172A"
                strokeWidth="2"
                className="animate-pulse-soft"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            ))}
            <text x="60" y="116" textAnchor="middle" fill="#0F172A" fontWeight="bold" fontSize="8.5">
              yemas X en las puntas
            </text>
          </svg>
          <h3 className="mt-2 font-display text-lg font-bold text-[#0F172A]">
            Reescritura de nodos
          </h3>
          <p className="mt-1 inline-block pixel-bevel-sm bg-[#ECFCCB] px-2.5 py-0.5 font-mono text-xs font-bold text-[#0F172A]">
            X → F[+X][-X]FX
          </p>
        </div>
      </div>
    </ConceptFrame>
  )
}
