import { ConceptFrame, Card } from './shared'
import PixelPhoto from '../../components/PixelPhoto'
import anabaenaPhoto from '../../assets/anabaena.webp'

/**
 * Slide 03 — 1968: Aristid Lindenmayer.
 * Tarjeta histórica 16-bit de día: foto real de Anabaena catenula al
 * microscopio + diagrama SVG del filamento con la división A → B.
 */
export default function Slide03History() {
  const cells = Array.from({ length: 7 })
  return (
    <ConceptFrame badge="ACTO I" accent="cyan" title="1968 · Aristid Lindenmayer">
      <Card accent="cyan" className="w-full max-w-3xl p-5 sm:p-7">
        <div className="mb-3 flex items-center justify-between border-b-2 border-[#0F172A] pb-2">
          <span className="font-pixel text-[10px] font-bold text-[#0369A1]">
            ANABAENA CATENULA · LAB 1968
          </span>
          <span className="pixel-bevel-sm bg-[#A3E635] px-2 py-0.5 font-pixel text-[9px] font-bold text-[#0F172A]">
            BIO-ORIGEN
          </span>
        </div>

        <div className="grid items-center gap-4 sm:grid-cols-2">
          {/* Foto real al microscopio */}
          <PixelPhoto
            src={anabaenaPhoto}
            alt="Filamentos del alga Anabaena catenula al microscopio"
            caption="Anabaena catenula · microscopio"
            credit="Foto microscópica"
            aspect="353 / 318"
            mobileMaxH="max-h-36"
          />

          {/* Diagrama del filamento (células A que se dividen en B) */}
          <svg viewBox="0 0 440 120" className="w-full" role="img" aria-label="Filamento de alga Anabaena">
            <rect x="4" y="12" width="432" height="96" rx="6" fill="#F0F9FF" stroke="#0F172A" strokeWidth="2" />
            {/* Filamento: cápsulas conectadas (células) */}
            <line x1="24" y1="60" x2="416" y2="60" stroke="#0F172A" strokeWidth="14" strokeLinecap="round" />
            <line x1="24" y1="60" x2="416" y2="60" stroke="#86EFAC" strokeWidth="8" strokeLinecap="round" />
            {cells.map((_, i) => {
              const x = 44 + i * 58
              const dividing = i % 3 === 1
              return (
                <g key={i} className="animate-pulse-soft" style={{ animationDelay: `${i * 0.25}s` }}>
                  <rect
                    x={x - 23}
                    y={43}
                    width={46}
                    height={34}
                    rx={12}
                    fill={dividing ? '#38BDF8' : '#22C55E'}
                    stroke="#0F172A"
                    strokeWidth="2.5"
                  />
                  <text
                    x={dividing ? x - 10 : x}
                    y={64}
                    textAnchor="middle"
                    fill="#0F172A"
                    fontFamily="JetBrains Mono, monospace"
                    fontWeight="bold"
                    fontSize="12"
                  >
                    A
                  </text>
                  {dividing && (
                    <>
                      <line x1={x} y1={43} x2={x} y2={77} stroke="#0F172A" strokeWidth="2.5" />
                      <text
                        x={x + 11}
                        y={64}
                        textAnchor="middle"
                        fill="#0F172A"
                        fontFamily="JetBrains Mono, monospace"
                        fontWeight="bold"
                        fontSize="12"
                      >
                        B
                      </text>
                    </>
                  )}
                </g>
              )
            })}
          </svg>
        </div>

        <p className="mt-4 text-center font-display text-sm font-bold text-[#0F172A] sm:text-lg">
          Un biólogo modelando algas inventó el lenguaje del crecimiento.
        </p>
      </Card>
    </ConceptFrame>
  )
}
