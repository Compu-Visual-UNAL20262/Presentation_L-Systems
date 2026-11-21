import { ConceptFrame, Card } from './shared'

/**
 * Slide 16 — Cuando la Planta Mira al Sol.
 * Planta curvándose hacia la luz y esquivando un obstáculo (fototropismo).
 */
export default function Slide16Phototropism() {
  return (
    <ConceptFrame badge="ACTO IV" accent="magenta" title="Cuando la Planta Mira al Sol">
      <Card accent="magenta" className="w-full max-w-2xl p-6 sm:p-8">
        <svg viewBox="0 0 320 180" className="w-full" role="img" aria-label="Fototropismo">
          {/* Sol */}
          <g className="animate-pulse-soft">
            <circle cx="270" cy="40" r="20" fill="#F39C12" />
            {Array.from({ length: 8 }).map((_, i) => {
              const a = (i * Math.PI) / 4
              return (
                <line
                  key={i}
                  x1={270 + Math.cos(a) * 26}
                  y1={40 + Math.sin(a) * 26}
                  x2={270 + Math.cos(a) * 34}
                  y2={40 + Math.sin(a) * 34}
                  stroke="#F39C12"
                  strokeWidth="2"
                />
              )
            })}
          </g>

          {/* Obstáculo */}
          <rect x="150" y="90" width="34" height="60" rx="3" fill="#475569" />
          <text x="167" y="165" textAnchor="middle" className="fill-slate-300" fontSize="9">
            muro
          </text>

          {/* Tallo que esquiva el muro y se curva hacia el sol */}
          <path
            d="M60 160 C60 120 90 110 120 108 C150 106 150 70 200 56 C235 46 250 44 260 50"
            fill="none"
            stroke="#2ECC71"
            strokeWidth="4"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray="1"
            className="animate-draw"
          />
          {/* Hojas hacia la luz */}
          <circle cx="200" cy="56" r="5" fill="#4ADE80" />
          <circle cx="235" cy="48" r="5" fill="#4ADE80" />
        </svg>
        <p className="mt-4 text-center font-display text-sm text-slate-300 sm:text-lg">
          Sistemas abiertos: la planta consulta su entorno 3D.
        </p>
      </Card>
    </ConceptFrame>
  )
}
