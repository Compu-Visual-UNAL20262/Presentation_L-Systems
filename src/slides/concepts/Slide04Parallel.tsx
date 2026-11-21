import { ConceptFrame } from './shared'
import PixelMeme from '../../components/PixelMeme'

/**
 * Slide 04 — Uno a la Vez vs. Todos al Tiempo.
 * Dos columnas animadas: Chomsky (secuencial) vs. L-System (paralelo) + Meme 16-bit.
 */
export default function Slide04Parallel() {
  const tokens = Array.from({ length: 5 })
  return (
    <ConceptFrame badge="ACTO I" accent="cyan" title="Uno a la Vez vs. Todos al Tiempo">
      <div className="flex w-full max-w-4xl flex-col items-center gap-3.5 sm:gap-4">
        <div className="grid w-full gap-3.5 sm:grid-cols-2 sm:gap-4">
          {/* Chomsky: una ficha activa a la vez (secuencial) */}
          <div className="pixel-bevel border-t-4 border-[#64748B] bg-white p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base font-bold text-[#0F172A] sm:text-xl">
                Chomsky · secuencial
              </h3>
              <span className="pixel-bevel-sm bg-[#E2E8F0] px-2 py-0.5 font-pixel text-[9px] font-bold text-[#0F172A]">
                1 TURNO
              </span>
            </div>
            <div className="mt-4 flex items-center justify-center gap-2">
              {tokens.map((_, i) => (
                <span
                  key={i}
                  className="h-7 w-7 pixel-bevel-sm bg-[#FACC15]"
                  style={{
                    animation: 'pulse-soft 2.5s ease-in-out infinite',
                    animationDelay: `${i * 0.5}s`,
                  }}
                />
              ))}
            </div>
            <p className="mt-3 text-center font-display text-xs font-semibold text-[#334155] sm:text-sm">
              Una regla, una ficha, por turnos.
            </p>
          </div>

          {/* L-System: todas las fichas cambian a la vez (paralelo) */}
          <div className="pixel-bevel border-t-4 border-[#0284C7] bg-white p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base font-bold text-[#0F172A] sm:text-xl">
                L-System · paralelo
              </h3>
              <span className="pixel-bevel-sm bg-[#A3E635] px-2 py-0.5 font-pixel text-[9px] font-bold text-[#0F172A]">
                SIMULTÁNEO
              </span>
            </div>
            <div className="mt-4 flex items-center justify-center gap-2">
              {tokens.map((_, i) => (
                <span
                  key={i}
                  className="h-7 w-7 pixel-bevel-sm bg-[#38BDF8] animate-pulse-soft"
                />
              ))}
            </div>
            <p className="mt-3 text-center font-display text-xs font-semibold text-[#334155] sm:text-sm">
              Todas las células, cada latido.
            </p>
          </div>
        </div>

        {/* Meme narrativo del choque secuencial vs paralelo */}
        <PixelMeme variant="parallel" className="w-full max-w-md" />
      </div>
    </ConceptFrame>
  )
}
