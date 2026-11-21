import { ConceptFrame, Card } from './shared'

/**
 * Slide 03 — 1968: Aristid Lindenmayer.
 * Tarjeta histórica con ilustración SVG de filamentos de Anabaena dividiéndose.
 */
export default function Slide03History() {
  // Cadena de células con animación sutil de "división".
  const cells = Array.from({ length: 7 })
  return (
    <ConceptFrame badge="ACTO I" accent="cyan" title="1968 · Aristid Lindenmayer">
      <Card accent="cyan" className="w-full max-w-2xl p-6 sm:p-8">
        <svg viewBox="0 0 440 120" className="w-full" role="img" aria-label="Filamento de alga Anabaena">
          {/* Filamento: cápsulas conectadas (células) */}
          <line x1="20" y1="60" x2="420" y2="60" stroke="#1E293B" strokeWidth="18" strokeLinecap="round" />
          {cells.map((_, i) => {
            const x = 40 + i * 60
            const dividing = i % 3 === 1
            return (
              <g key={i} className="animate-pulse-soft" style={{ animationDelay: `${i * 0.25}s` }}>
                <rect
                  x={x - 24}
                  y={44}
                  width={48}
                  height={32}
                  rx={14}
                  fill={dividing ? '#38BDF8' : '#2ECC71'}
                  opacity={0.9}
                />
                {dividing && (
                  // Línea de división celular
                  <line x1={x} y1={44} x2={x} y2={76} stroke="#0B0F19" strokeWidth="2" />
                )}
              </g>
            )
          })}
        </svg>
        <p className="mt-5 text-center font-display text-sm text-slate-300 sm:text-lg">
          Un biólogo modelando algas inventó un lenguaje para el crecimiento.
        </p>
      </Card>
    </ConceptFrame>
  )
}
