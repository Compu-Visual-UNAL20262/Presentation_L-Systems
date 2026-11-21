import { ConceptFrame, Card } from './shared'

/**
 * Slide 16 — Cuando la Planta Mira al Sol.
 * Planta curvándose hacia la luz y esquivando un obstáculo (fototropismo) en 16-bit de día.
 */
export default function Slide16Phototropism() {
  return (
    <ConceptFrame badge="ACTO IV" accent="magenta" title="Cuando la Planta Mira al Sol">
      <Card accent="magenta" className="w-full max-w-2xl p-6 sm:p-8">
        <svg viewBox="0 0 320 180" className="w-full" role="img" aria-label="Fototropismo">
          <rect x="4" y="4" width="312" height="172" rx="6" fill="#E0F2FE" stroke="#0F172A" strokeWidth="2" />
          {/* Sol 16-bit */}
          <g className="animate-pulse-soft">
            <circle cx="268" cy="42" r="20" fill="#FACC15" stroke="#0F172A" strokeWidth="2.5" />
            {Array.from({ length: 8 }).map((_, i) => {
              const a = (i * Math.PI) / 4
              return (
                <line
                  key={i}
                  x1={268 + Math.cos(a) * 25}
                  y1={42 + Math.sin(a) * 25}
                  x2={268 + Math.cos(a) * 34}
                  y2={42 + Math.sin(a) * 34}
                  stroke="#D97706"
                  strokeWidth="2.5"
                />
              )
            })}
          </g>

          {/* Obstáculo (bloque de ladrillo/piedra 16-bit) */}
          <rect x="148" y="88" width="38" height="62" rx="3" fill="#94A3B8" stroke="#0F172A" strokeWidth="2.5" />
          <text x="167" y="164" textAnchor="middle" fill="#0F172A" fontWeight="bold" fontSize="9.5">
            muro 3D
          </text>

          {/* Tallo que esquiva el muro y se curva hacia el sol */}
          <path
            d="M60 156 C60 120 90 110 120 108 C150 106 146 68 200 54 C232 45 246 44 256 48"
            fill="none"
            stroke="#15803D"
            strokeWidth="5"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray="1"
            className="animate-draw"
          />
          {/* Hojas con borde oscuro hacia la luz */}
          <circle cx="200" cy="54" r="6" fill="#A3E635" stroke="#0F172A" strokeWidth="2" />
          <circle cx="235" cy="46" r="6" fill="#A3E635" stroke="#0F172A" strokeWidth="2" />
        </svg>
        <p className="mt-4 text-center font-display text-sm font-bold text-[#0F172A] sm:text-lg">
          Sistemas abiertos: la planta consulta su entorno 3D.
        </p>
      </Card>
    </ConceptFrame>
  )
}
