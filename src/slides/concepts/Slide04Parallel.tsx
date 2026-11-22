import { useEffect, useState } from 'react'
import { ConceptFrame } from './shared'

/**
 * Flecha indicadora superior que señala qué célula está siendo procesada.
 * Espacio fijo reservado (h-7) para evitar cualquier movimiento en el layout.
 */
function ArrowIndicator({ active }: { active: boolean }) {
  return (
    <div className="flex h-7 w-full items-center justify-center">
      {active ? (
        <svg
          viewBox="0 0 20 20"
          className="h-5 w-5 text-[#0F172A]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="10" y1="3" x2="10" y2="15" />
          <polyline points="5 10 10 15 15 10" />
        </svg>
      ) : (
        <div className="h-5 w-5" />
      )}
    </div>
  )
}

/**
 * Representación visual de una célula biológica:
 * - isEight === false: Célula esférica en reposo (círculo verde con 1 núcleo).
 * - isEight === true:  Célula dividida (forma de ocho azul con 2 núcleos y surco).
 * Sólida, nítida, sin efectos de parpadeo ni desvanecimiento.
 */
function Cell({ isEight }: { isEight: boolean }) {
  return (
    <div className="flex h-20 w-12 items-center justify-center sm:h-24 sm:w-14">
      {isEight ? (
        <svg
          viewBox="0 0 64 96"
          className="h-20 w-12 sm:h-24 sm:w-14"
          style={{ filter: 'drop-shadow(2px 2px 0 #0F172A)' }}
          role="img"
          aria-label="Célula dividida en forma de ocho"
        >
          {/* Membrana amagollada (forma de ocho) */}
          <path
            d="M 32 14 
               C 46 14 54 23 54 34 
               C 54 43 45 46 41 48 
               C 45 50 54 53 54 62 
               C 54 73 46 82 32 82 
               C 18 82 10 73 10 62 
               C 10 53 19 50 23 48 
               C 19 46 10 43 10 34 
               C 10 23 18 14 32 14 Z"
            fill="#38BDF8"
            stroke="#0F172A"
            strokeWidth="2.5"
          />
          {/* Dos núcleos */}
          <circle cx="32" cy="32" r="5" fill="#FACC15" stroke="#0F172A" strokeWidth="1.8" />
          <circle cx="32" cy="64" r="5" fill="#FACC15" stroke="#0F172A" strokeWidth="1.8" />
          {/* Surco de división celular */}
          <line
            x1="23"
            y1="48"
            x2="41"
            y2="48"
            stroke="#0F172A"
            strokeWidth="2"
            strokeDasharray="2 2"
          />
        </svg>
      ) : (
        <svg
          viewBox="0 0 64 96"
          className="h-20 w-12 sm:h-24 sm:w-14"
          style={{ filter: 'drop-shadow(2px 2px 0 #0F172A)' }}
          role="img"
          aria-label="Célula esférica en reposo"
        >
          {/* Célula esférica */}
          <circle cx="32" cy="48" r="22" fill="#22C55E" stroke="#0F172A" strokeWidth="2.5" />
          {/* Núcleo único central */}
          <circle cx="32" cy="48" r="6" fill="#A3E635" stroke="#0F172A" strokeWidth="1.8" />
        </svg>
      )}
    </div>
  )
}

/**
 * Slide 04 — Uno a la Vez vs. Todos al Tiempo.
 *
 * Un único contenedor consolidado dividido en dos secciones (Chomsky vs. L-System).
 * Secuencia temporal de 6 pasos (0 a 5):
 * - Paso 0: Inicio/Reset. Ambos lados tienen 4 células esféricas en reposo.
 * - Paso 1: Chomsky transforma la Célula 0 a ocho. L-System transforma las 4 células a ocho juntas.
 * - Paso 2: Chomsky transforma la Célula 1 (0 y 1 en ocho). L-System ya terminó y espera.
 * - Paso 3: Chomsky transforma la Célula 2 (0, 1 y 2 en ocho). L-System sigue en espera.
 * - Paso 4: Chomsky transforma la Célula 3 (todas en ocho). L-System sigue en espera.
 * - Paso 5: Pausa breve mostrando ambas filas completadas, antes de reiniciar.
 */
export default function Slide04Parallel() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % 6)
    }, 1250)
    return () => clearInterval(timer)
  }, [])

  return (
    <ConceptFrame badge="ACTO I" accent="cyan" title="Uno a la Vez vs. Todos al Tiempo">
      <div className="w-full max-w-4xl pixel-bevel bg-white p-5 sm:p-7">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-0 sm:divide-x-2 sm:divide-[#E2E8F0]">
          {/* Columna Izquierda: Chomsky (secuencial) */}
          <div className="flex flex-col justify-between sm:pr-6">
            <div>
              {/* Título en dos líneas sin punto */}
              <div className="border-b-2 border-[#E2E8F0] pb-2 text-center">
                <h3 className="font-display text-xl font-extrabold text-[#0F172A] sm:text-2xl leading-tight">
                  Chomsky
                </h3>
                <span className="mt-0.5 block font-mono text-xs font-semibold text-[#64748B] tracking-wider uppercase">
                  secuencial
                </span>
              </div>

              {/* Riel de células */}
              <div className="mt-5 flex items-center justify-around px-2">
                {[0, 1, 2, 3].map((i) => {
                  const isEight = step >= 1 && i < step
                  const isCurrentTarget = step >= 1 && step <= 4 && i === step - 1

                  return (
                    <div key={i} className="flex flex-col items-center">
                      <ArrowIndicator active={isCurrentTarget} />
                      <Cell isEight={isEight} />
                    </div>
                  )
                })}
              </div>
            </div>

            <p className="mt-6 text-center font-display text-xs font-bold text-[#334155] sm:text-sm">
              Una regla, una célula a la vez.
            </p>
          </div>

          {/* Columna Derecha: L-System (paralelo) */}
          <div className="flex flex-col justify-between sm:pl-6">
            <div>
              {/* Título en dos líneas sin punto */}
              <div className="border-b-2 border-[#E2E8F0] pb-2 text-center">
                <h3 className="font-display text-xl font-extrabold text-[#0F172A] sm:text-2xl leading-tight">
                  L-System
                </h3>
                <span className="mt-0.5 block font-mono text-xs font-semibold text-[#0284C7]/70 tracking-wider uppercase">
                  paralelo
                </span>
              </div>

              {/* Riel de células */}
              <div className="mt-5 flex items-center justify-around px-2">
                {[0, 1, 2, 3].map((i) => {
                  const isEight = step >= 1
                  const showPulseArrow = step === 1

                  return (
                    <div key={i} className="flex flex-col items-center">
                      <ArrowIndicator active={showPulseArrow} />
                      <Cell isEight={isEight} />
                    </div>
                  )
                })}
              </div>
            </div>

            <p className="mt-6 text-center font-display text-xs font-bold text-[#0369A1] sm:text-sm">
              Todas las células al mismo latido.
            </p>
          </div>
        </div>
      </div>
    </ConceptFrame>
  )
}
