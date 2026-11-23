import { ConceptFrame } from './shared'
import PixelMeme from '../../components/PixelMeme'

/**
 * Slide 17 — El Peligro Exponencial y el Doble Cuaderno.
 * Curva exponencial O(bⁿ) + diagrama de dos buffers (Hoy → Mañana) + Meme GPU.
 */
export default function Slide17Exponential() {
  return (
    <ConceptFrame
      badge="DETRÁS DE CÁMARAS"
      accent="cyan"
      title="El Peligro Exponencial y el Doble Cuaderno"
    >
      <div className="flex w-full max-w-4xl flex-col items-center gap-3.5 sm:gap-4">
        <div className="grid w-full gap-3.5 sm:grid-cols-2 sm:gap-4">
          {/* Curva exponencial */}
          <div className="pixel-bevel border-t-4 border-[#DB2777] bg-white p-4">
            <svg viewBox="0 0 160 96" className="h-24 w-full" role="img" aria-label="Crecimiento exponencial">
              <line x1="20" y1="82" x2="150" y2="82" stroke="#0F172A" strokeWidth="2" />
              <line x1="20" y1="82" x2="20" y2="10" stroke="#0F172A" strokeWidth="2" />
              <path
                d="M20 82 C70 81 95 74 115 48 C128 30 135 18 142 10"
                fill="none"
                stroke="#DB2777"
                strokeWidth="3.5"
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray="1"
                className="animate-draw"
              />
              <text x="150" y="93" textAnchor="end" fill="#0F172A" fontWeight="bold" fontSize="9">
                n
              </text>
            </svg>
            <p className="mt-1 text-center font-mono text-xs font-extrabold text-[#BE185D]">
              Complejidad O(bⁿ)
            </p>
          </div>

          {/* Doble cuaderno (double buffering) */}
          <div className="pixel-bevel border-t-4 border-[#0284C7] bg-white p-4 flex flex-col justify-center">
            <div className="flex items-center justify-center gap-3">
              <div className="pixel-bevel-sm bg-[#FEF9C3] px-3 py-2.5 text-center">
                <div className="font-pixel text-[9px] font-bold text-[#0F172A]">HOY</div>
                <div className="mt-0.5 font-mono text-sm font-extrabold text-[#0F172A]">Sₙ</div>
                <div className="font-mono text-[10px] font-bold text-[#334155]">solo lectura</div>
              </div>
              <svg viewBox="0 0 40 24" className="h-5 w-10 text-[#0284C7] animate-slide-right">
                <path d="M2 12 H30" stroke="currentColor" strokeWidth="3" />
                <path d="M28 5 l9 7 l-9 7" fill="none" stroke="currentColor" strokeWidth="3" />
              </svg>
              <div className="pixel-bevel-sm bg-[#DCFCE7] px-3 py-2.5 text-center">
                <div className="font-pixel text-[9px] font-bold text-[#0F172A]">MAÑANA</div>
                <div className="mt-0.5 font-mono text-sm font-extrabold text-[#15803D]">Sₙ₊₁</div>
                <div className="font-mono text-[10px] font-bold text-[#334155]">buffer limpio</div>
              </div>
            </div>
            <p className="mt-2.5 text-center font-mono text-xs font-bold text-[#0F172A]">
              swap al terminar ciclo
            </p>
          </div>
        </div>

        {/* Meme narrativo: cuando subes a n=10 iteraciones ("This is fine").
            Oculto en móvil para no recortar el contenido en viewports cortos. */}
        <PixelMeme variant="exponential" className="hidden w-full max-w-md sm:block" />
      </div>
    </ConceptFrame>
  )
}
