import { useEffect, useState } from 'react'
import { ConceptFrame } from './shared'

/**
 * Tokens de la regla de ramificación en orden de ejecución:
 * F (tronco) -> [ (push) -> +F (rama) -> ] (pop) -> F (continúa)
 */
const TOKENS = [
  { sym: 'F', label: 'tronco' },
  { sym: '[', label: 'push' },
  { sym: '+F', label: 'rama' },
  { sym: ']', label: 'pop' },
  { sym: 'F', label: 'continúa' },
]

/**
 * Slide 10 — El Superpoder de Recordar: [ y ].
 *
 * Estructura simplificada y directa:
 * - Columna Izquierda: Recorrido de la tortuga en el árbol con espaciado sin superposiciones.
 * - Columna Derecha:
 *   1. Título "Memoria de la regla" y división.
 *   2. Código "F [ +F ] F" limpio sin bloques encerrándolo.
 *   3. Riel con la animación paso a paso del código.
 *   4. Pila de 5 slots contiguos con delineado negro + cuadrito de información a la derecha.
 *      - En PUSH (amarillo): "Información guardada" con posición y rumbo.
 *      - En POP (azul): "Restaurando estado" con la misma información.
 *      - En reposo: "Pila vacía".
 */
export default function Slide10Stack() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    // 1.4 segundos por paso para acompasar el ritmo de la explicación
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % 6)
    }, 1400)
    return () => clearInterval(timer)
  }, [])

  // Visibilidad de elementos en el árbol
  const showPin = step >= 1
  const showBranch = step >= 2
  const showTeleport = step >= 3
  const showContinuation = step >= 4

  // Token activo en la lectura
  const activeTokenIndex = step <= 4 ? step : null

  // Estado de la memoria LIFO
  const isPushed = step >= 1 && step <= 2
  const isPopped = step === 3

  return (
    <ConceptFrame badge="ACTO III" accent="amber" title="El Superpoder de Recordar: [ y ]">
      <div className="w-full max-w-4xl pixel-bevel bg-white p-5 sm:p-7">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-0 sm:divide-x-2 sm:divide-[#E2E8F0]">
          {/* =========================================================
              COLUMNA IZQUIERDA: Solo Recorrido de la Tortuga (Árbol)
             ========================================================= */}
          <div className="flex flex-col justify-start sm:pr-6">
            <div className="border-b-2 border-[#E2E8F0] pb-2 text-center">
              <h3 className="font-display text-xl font-extrabold text-[#0F172A] sm:text-2xl leading-tight">
                Recorrido de la Tortuga
              </h3>
            </div>

            {/* Diagrama SVG del Árbol centrado y espacioso */}
            <div className="mt-6 flex items-center justify-center">
              <svg
                viewBox="0 0 280 185"
                className="w-full max-w-[310px] sm:max-w-[340px]"
                role="img"
                aria-label="Animación del árbol con pin y teletransporte"
              >
                <defs>
                  <marker
                    id="teleport-arrow"
                    viewBox="0 0 10 10"
                    refX="6"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#0284C7" />
                  </marker>
                  <marker
                    id="trunk-arrow"
                    viewBox="0 0 10 10"
                    refX="6"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#15803D" />
                  </marker>
                </defs>

                {/* 1. Tronco inferior en x=90 */}
                <line
                  x1="90"
                  y1="172"
                  x2="90"
                  y2="102"
                  stroke="#78350F"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <text
                  x="72"
                  y="146"
                  textAnchor="end"
                  fill="#78350F"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="bold"
                  fontSize="10"
                >
                  Tronco
                </text>

                {/* 2. Pin 📍 en la bifurcación (Paso 1 en adelante) */}
                {showPin && (
                  <g>
                    <g transform="translate(78, 72)">
                      <path
                        d="M12 2 a8 8 0 0 1 8 8 c0 6 -8 15 -8 15 s-8 -9 -8 -15 a8 8 0 0 1 8 -8 Z"
                        fill="#F43F5E"
                        stroke="#0F172A"
                        strokeWidth="2"
                        style={{ filter: 'drop-shadow(2px 2px 0 #0F172A)' }}
                      />
                      <circle cx="12" cy="10" r="3" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.2" />
                    </g>
                    <text
                      x="66"
                      y="92"
                      textAnchor="end"
                      fill="#E11D48"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight="bold"
                      fontSize="10"
                    >
                      [ Pin
                    </text>
                  </g>
                )}

                {/* 3. Rama lateral (Paso 2 en adelante) */}
                {showBranch && (
                  <g>
                    <line
                      x1="90"
                      y1="102"
                      x2="190"
                      y2="48"
                      stroke="#0284C7"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    <circle cx="190" cy="48" r="4.5" fill="#38BDF8" stroke="#0F172A" strokeWidth="1.5" />
                    <text
                      x="200"
                      y="52"
                      textAnchor="start"
                      fill="#0284C7"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight="bold"
                      fontSize="10"
                    >
                      Rama
                    </text>
                  </g>
                )}

                {/* 4. Curva de teletransporte (Paso 3 en adelante) */}
                {showTeleport && (
                  <g>
                    <path
                      d="M 186 56 C 195 96, 138 108, 110 105"
                      fill="none"
                      stroke="#0284C7"
                      strokeWidth="2.5"
                      strokeDasharray="4 3"
                      markerEnd="url(#teleport-arrow)"
                    />
                    {/* Texto posicionado limpiamente debajo de la curva sin superposiciones */}
                    <text
                      x="162"
                      y="126"
                      textAnchor="middle"
                      fill="#0284C7"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight="bold"
                      fontSize="9.5"
                    >
                      ] Teletransporte
                    </text>
                  </g>
                )}

                {/* 5. Continuación del tronco hacia arriba (Paso 4 en adelante) */}
                {showContinuation && (
                  <g>
                    <line
                      x1="90"
                      y1="102"
                      x2="90"
                      y2="26"
                      stroke="#15803D"
                      strokeWidth="4"
                      strokeLinecap="round"
                      markerEnd="url(#trunk-arrow)"
                    />
                    <text
                      x="72"
                      y="46"
                      textAnchor="end"
                      fill="#15803D"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight="bold"
                      fontSize="10"
                    >
                      Continúa ↑
                    </text>
                  </g>
                )}
              </svg>
            </div>
          </div>

          {/* =========================================================
              COLUMNA DERECHA: Memoria de la regla -> Código -> Pasos -> Slots
             ========================================================= */}
          <div className="flex flex-col justify-start sm:pl-6">
            <div>
              {/* 1. Título */}
              <div className="border-b-2 border-[#E2E8F0] pb-2 text-center">
                <h3 className="font-display text-xl font-extrabold text-[#0F172A] sm:text-2xl leading-tight">
                  Memoria de la regla
                </h3>
              </div>

              {/* 2. Código de la regla limpio sin bloque encerrándolo */}
              <div className="mt-3 text-center">
                <span className="font-mono text-base sm:text-lg font-black text-[#0F172A] tracking-widest">
                  F [ +F ] F
                </span>
              </div>

              {/* 3. Animación de cada paso del código */}
              <div className="mt-4 flex items-center justify-between gap-1 p-1 bg-[#F1F5F9] rounded border-2 border-[#CBD5E1]">
                {TOKENS.map((tok, i) => {
                  const isActive = activeTokenIndex === i || step === 5
                  return (
                    <div
                      key={i}
                      className={`flex-1 flex flex-col items-center py-1.5 px-0.5 rounded transition-all duration-200 ${
                        isActive
                          ? 'pixel-bevel-sm bg-[#FACC15] text-[#0F172A] scale-105 shadow-sm'
                          : 'bg-transparent text-[#64748B]'
                      }`}
                    >
                      <span className="font-mono text-xs sm:text-sm font-black">
                        {tok.sym}
                      </span>
                      <span className="font-mono text-[8px] font-bold uppercase tracking-tight">
                        {tok.label}
                      </span>
                    </div>
                  )
                })}
              </div>

              {/* 4. Slots de memoria contiguos (5 slots) + cuadrito a la derecha */}
              <div className="mt-5 flex items-center gap-3">
                {/* 5 Rectángulos apilados y pegados con delineado negro */}
                <div className="w-24 border-2 border-[#0F172A] rounded overflow-hidden divide-y-2 divide-[#0F172A] bg-white shadow-sm shrink-0">
                  <div className="h-6 flex items-center justify-center font-mono text-[9px] font-bold text-[#94A3B8] bg-white">
                    slot 4
                  </div>
                  <div className="h-6 flex items-center justify-center font-mono text-[9px] font-bold text-[#94A3B8] bg-white">
                    slot 3
                  </div>
                  <div className="h-6 flex items-center justify-center font-mono text-[9px] font-bold text-[#94A3B8] bg-white">
                    slot 2
                  </div>
                  <div className="h-6 flex items-center justify-center font-mono text-[9px] font-bold text-[#94A3B8] bg-white">
                    slot 1
                  </div>
                  {/* Slot 0 (abajo): cambia a amarillo en PUSH y a azul en POP */}
                  <div
                    className={`h-6 flex items-center justify-center font-mono text-[9px] font-extrabold transition-colors duration-200 ${
                      isPushed
                        ? 'bg-[#FACC15] text-[#0F172A]'
                        : isPopped
                        ? 'bg-[#38BDF8] text-[#0F172A]'
                        : 'bg-white text-[#94A3B8]'
                    }`}
                  >
                    slot 0
                  </div>
                </div>

                {/* Cuadrito aparte a la derecha con la información */}
                <div className="flex-1 h-[120px] flex items-center">
                  {isPushed ? (
                    <div className="w-full h-full pixel-bevel-sm bg-[#FEF9C3] border-2 border-[#0F172A] p-3 text-left flex flex-col justify-center">
                      <span className="font-mono text-[9.5px] font-bold text-[#854D0E] uppercase tracking-wider block border-b border-[#0F172A]/20 pb-1.5">
                        Información guardada
                      </span>
                      <div className="mt-2 font-mono text-xs font-bold text-[#0F172A] space-y-1">
                        <div>Posición: <span className="text-[#0369A1]">(x, y)</span></div>
                        <div>Rumbo: <span className="text-[#15803D]">θ (ángulo)</span></div>
                      </div>
                    </div>
                  ) : isPopped ? (
                    <div className="w-full h-full pixel-bevel-sm bg-[#BAE6FD] border-2 border-[#0F172A] p-3 text-left flex flex-col justify-center">
                      <span className="font-mono text-[9.5px] font-bold text-[#0369A1] uppercase tracking-wider block border-b border-[#0F172A]/20 pb-1.5">
                        Restaurando estado
                      </span>
                      <div className="mt-2 font-mono text-xs font-bold text-[#0F172A] space-y-1">
                        <div>Posición: <span className="text-[#0369A1]">(x, y)</span></div>
                        <div>Rumbo: <span className="text-[#15803D]">θ (ángulo)</span></div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full rounded border-2 border-dashed border-[#CBD5E1] p-3 flex items-center justify-center text-center text-[#94A3B8]">
                      <p className="font-mono text-xs font-bold">
                        Pila vacía
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ConceptFrame>
  )
}
