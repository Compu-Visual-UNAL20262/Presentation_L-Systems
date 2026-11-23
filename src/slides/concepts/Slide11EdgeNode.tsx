import { useEffect, useState } from 'react'
import { ConceptFrame } from './shared'

/**
 * Slide 11 — Crecer por Tallos vs. por Yemas.
 *
 * Contraste de reescritura de aristas (Edge) vs. nodos (Node) con animación cíclica:
 * - Paso 1: Estado inicial (axioma / brote simple).
 * - Paso 2: Crecimiento tras aplicar las reglas de producción.
 *
 * Características clave:
 * - Códigos sin bloques de fondo.
 * - En aristas, el tallo F conserva la misma longitud total en Paso 1 y Paso 2 (se subdivide en la mitad).
 * - En nodos, la madera fija inferior no se altera; solo las yemas activas en los extremos florecen.
 */
export default function Slide11EdgeNode() {
  const [gen, setGen] = useState<1 | 2>(1)

  useEffect(() => {
    // Alterna automáticamente cada 2.5 segundos para acompasar el discurso
    const timer = setInterval(() => {
      setGen((g) => (g === 1 ? 2 : 1))
    }, 2500)
    return () => clearInterval(timer)
  }, [])

  return (
    <ConceptFrame badge="LA TORTUGA" accent="amber" title="Crecer por Tallos vs. por Yemas">
      <div className="w-full max-w-4xl pixel-bevel bg-white p-5 sm:p-7">
        {/* Selector de Generación (Arcade Pills) */}
        <div className="mb-5 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setGen(1)}
            className={`px-3 py-1 font-mono text-xs font-black uppercase transition-all rounded ${
              gen === 1
                ? 'pixel-bevel-sm bg-[#0F172A] text-[#FACC15] scale-105 shadow-sm'
                : 'bg-[#F1F5F9] text-[#64748B] hover:text-[#0F172A] border border-[#CBD5E1]'
            }`}
          >
            Paso 1: Axioma
          </button>
          <span className="font-mono text-xs font-bold text-[#94A3B8]">→</span>
          <button
            type="button"
            onClick={() => setGen(2)}
            className={`px-3 py-1 font-mono text-xs font-black uppercase transition-all rounded ${
              gen === 2
                ? 'pixel-bevel-sm bg-[#0F172A] text-[#FACC15] scale-105 shadow-sm'
                : 'bg-[#F1F5F9] text-[#64748B] hover:text-[#0F172A] border border-[#CBD5E1]'
            }`}
          >
            Paso 2: Crecimiento
          </button>
        </div>

        {/* Dos Columnas con División Central */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-0 sm:divide-x-2 sm:divide-[#E2E8F0]">
          {/* =========================================================
              COLUMNA IZQUIERDA: Reescritura de Aristas (Tallos)
             ========================================================= */}
          <div className="flex flex-col justify-start sm:pr-6">
            <div className="border-b-2 border-[#E2E8F0] pb-2 text-center">
              <h3 className="font-display text-xl font-extrabold text-[#0F172A] sm:text-2xl leading-tight">
                Por Aristas
              </h3>
              <p className="mt-0.5 font-mono text-xs font-bold text-[#D97706]">
                Subdivide todo el tallo
              </p>
            </div>

            {/* Código de la regla limpio sin fondo */}
            <div className="mt-3 text-center">
              <span className="font-mono text-base sm:text-lg font-black text-[#0F172A] tracking-wider">
                F → F[+F][-F]F
              </span>
            </div>

            {/* Diagrama SVG interactivo */}
            <div className="mt-4 flex items-center justify-center">
              <svg
                viewBox="0 0 220 170"
                className="w-full max-w-[260px] sm:max-w-[290px]"
                role="img"
                aria-label="Crecimiento por aristas donde el tallo completo se subdivide"
              >
                {gen === 1 ? (
                  /* PASO 1: Un solo segmento vertical continuo F de y=155 a y=45 (longitud 110) */
                  <g>
                    <line
                      x1="110"
                      y1="155"
                      x2="110"
                      y2="45"
                      stroke="#78350F"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                    <text
                      x="90"
                      y="104"
                      textAnchor="end"
                      fill="#78350F"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight="bold"
                      fontSize="11"
                    >
                      Tallo F
                    </text>
                  </g>
                ) : (
                  /* PASO 2: Misma longitud vertical total (y=155 a y=45) dividida en la mitad exacta (y=100) */
                  <g>
                    {/* Tramo inferior: y=155 a y=100 */}
                    <line
                      x1="110"
                      y1="155"
                      x2="110"
                      y2="100"
                      stroke="#78350F"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                    <text
                      x="90"
                      y="134"
                      textAnchor="end"
                      fill="#78350F"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight="bold"
                      fontSize="10"
                    >
                      F
                    </text>

                    {/* Tramo superior: y=100 a y=45 */}
                    <line
                      x1="110"
                      y1="100"
                      x2="110"
                      y2="45"
                      stroke="#78350F"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                    <text
                      x="110"
                      y="34"
                      textAnchor="middle"
                      fill="#78350F"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight="bold"
                      fontSize="10"
                    >
                      F
                    </text>

                    {/* Ramas laterales en el centro (y=100) */}
                    <line
                      x1="110"
                      y1="100"
                      x2="60"
                      y2="65"
                      stroke="#D97706"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    <text
                      x="50"
                      y="62"
                      textAnchor="end"
                      fill="#D97706"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight="bold"
                      fontSize="10"
                    >
                      [-F]
                    </text>

                    <line
                      x1="110"
                      y1="100"
                      x2="160"
                      y2="65"
                      stroke="#D97706"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    <text
                      x="170"
                      y="62"
                      textAnchor="start"
                      fill="#D97706"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight="bold"
                      fontSize="10"
                    >
                      [+F]
                    </text>

                    {/* Punto de quiebre en la mitad exacta */}
                    <circle
                      cx="110"
                      cy="100"
                      r="4"
                      fill="#F59E0B"
                      stroke="#0F172A"
                      strokeWidth="1.5"
                    />
                  </g>
                )}
              </svg>
            </div>
          </div>

          {/* =========================================================
              COLUMNA DERECHA: Reescritura de Nodos (Yemas)
             ========================================================= */}
          <div className="flex flex-col justify-start sm:pl-6">
            <div className="border-b-2 border-[#E2E8F0] pb-2 text-center">
              <h3 className="font-display text-xl font-extrabold text-[#0F172A] sm:text-2xl leading-tight">
                Por Nodos
              </h3>
              <p className="mt-0.5 font-mono text-xs font-bold text-[#16A34A]">
                Crecimiento en puntas
              </p>
            </div>

            {/* Código de la regla limpio sin fondo */}
            <div className="mt-3 text-center">
              <span className="font-mono text-base sm:text-lg font-black text-[#0F172A] tracking-wider">
                X → F[+X][-X]X
              </span>
            </div>

            {/* Diagrama SVG interactivo */}
            <div className="mt-4 flex items-center justify-center">
              <svg
                viewBox="0 0 220 170"
                className="w-full max-w-[260px] sm:max-w-[290px]"
                role="img"
                aria-label="Crecimiento por nodos donde solo las yemas apicales florecen"
              >
                {gen === 1 ? (
                  /* PASO 1: Tallo base con yema apical X arriba */
                  <g>
                    <line
                      x1="110"
                      y1="155"
                      x2="110"
                      y2="85"
                      stroke="#14532D"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                    <text
                      x="90"
                      y="125"
                      textAnchor="end"
                      fill="#14532D"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight="bold"
                      fontSize="11"
                    >
                      Tallo F
                    </text>

                    {/* Yema X apical */}
                    <circle
                      cx="110"
                      cy="85"
                      r="9"
                      fill="#A3E635"
                      stroke="#0F172A"
                      strokeWidth="2"
                      style={{ filter: 'drop-shadow(2px 2px 0 #0F172A)' }}
                    />
                    <text
                      x="110"
                      y="89"
                      textAnchor="middle"
                      fill="#0F172A"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight="900"
                      fontSize="11"
                    >
                      X
                    </text>
                    <text
                      x="126"
                      y="89"
                      textAnchor="start"
                      fill="#15803D"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight="bold"
                      fontSize="10"
                    >
                      Yema activa
                    </text>
                  </g>
                ) : (
                  /* PASO 2: El tallo base se mantiene; la yema X se ramifica en nuevas yemas */
                  <g>
                    {/* Tallo base intacto (madera de soporte) */}
                    <line
                      x1="110"
                      y1="155"
                      x2="110"
                      y2="85"
                      stroke="#14532D"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                    <text
                      x="90"
                      y="125"
                      textAnchor="end"
                      fill="#64748B"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight="bold"
                      fontSize="10"
                    >
                      Madera fija
                    </text>

                    {/* Nodo central de la antigua yema */}
                    <circle
                      cx="110"
                      cy="85"
                      r="3.5"
                      fill="#14532D"
                      stroke="#0F172A"
                      strokeWidth="1.2"
                    />

                    {/* Nuevas ramas con yemas en los extremos */}
                    {/* Rama Izquierda */}
                    <line
                      x1="110"
                      y1="85"
                      x2="60"
                      y2="45"
                      stroke="#15803D"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="60"
                      cy="45"
                      r="8"
                      fill="#A3E635"
                      stroke="#0F172A"
                      strokeWidth="1.8"
                      style={{ filter: 'drop-shadow(1.5px 1.5px 0 #0F172A)' }}
                    />
                    <text
                      x="60"
                      y="48.5"
                      textAnchor="middle"
                      fill="#0F172A"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight="900"
                      fontSize="9"
                    >
                      X
                    </text>

                    {/* Rama Derecha */}
                    <line
                      x1="110"
                      y1="85"
                      x2="160"
                      y2="45"
                      stroke="#15803D"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="160"
                      cy="45"
                      r="8"
                      fill="#A3E635"
                      stroke="#0F172A"
                      strokeWidth="1.8"
                      style={{ filter: 'drop-shadow(1.5px 1.5px 0 #0F172A)' }}
                    />
                    <text
                      x="160"
                      y="48.5"
                      textAnchor="middle"
                      fill="#0F172A"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight="900"
                      fontSize="9"
                    >
                      X
                    </text>

                    {/* Tallo central */}
                    <line
                      x1="110"
                      y1="85"
                      x2="110"
                      y2="30"
                      stroke="#15803D"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="110"
                      cy="30"
                      r="8"
                      fill="#A3E635"
                      stroke="#0F172A"
                      strokeWidth="1.8"
                      style={{ filter: 'drop-shadow(1.5px 1.5px 0 #0F172A)' }}
                    />
                    <text
                      x="110"
                      y="33.5"
                      textAnchor="middle"
                      fill="#0F172A"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight="900"
                      fontSize="9"
                    >
                      X
                    </text>
                  </g>
                )}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </ConceptFrame>
  )
}
