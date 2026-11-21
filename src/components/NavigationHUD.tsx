import { actForSlide, SLIDES, TEAM_NAME } from '../data/slidesConfig'
import { ACCENT } from '../data/accent'

interface NavigationHUDProps {
  index: number // 0-based
  total: number
  onPrev: () => void
  onNext: () => void
}

/**
 * HUD de navegación 16-bit de día:
 * - Barra de progreso superior estilo XP arcade con borde oscuro.
 * - Indicador de vida / insignia TEAM GAYMERS.
 * - Numeración pixel de alto contraste y botones táctiles amarillo moneda.
 */
export default function NavigationHUD({ index, total, onPrev, onNext }: NavigationHUDProps) {
  const current = SLIDES[index]
  const act = actForSlide(current.n)
  const accent = ACCENT[current.accent]
  const progress = ((index + 1) / total) * 100

  return (
    <>
      {/* Barra de progreso superior estilo XP 16-bit */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-30 h-2 border-b-2 border-[#0F172A] bg-white/80">
        <div
          className="h-full transition-[width] duration-300 ease-out"
          style={{
            width: `${progress}%`,
            background:
              'linear-gradient(90deg, #38BDF8 0%, #22C55E 38%, #FACC15 72%, #F472B6 100%)',
          }}
        />
      </div>

      {/* Insignia superior derecha: Corazón 16-bit + barra TEAM GAYMERS */}
      <div
        data-no-swipe="true"
        className="pointer-events-none fixed top-3.5 right-4 z-30 hidden sm:flex items-center gap-2 select-none"
      >
        <div className="flex items-center gap-1.5 pixel-bevel-sm bg-white px-2.5 py-1">
          <span className="text-xs leading-none text-[#EC4899]" aria-hidden="true">
            ♥
          </span>
          <span className="font-pixel text-[10px] font-bold tracking-wider text-[#0F172A]">
            {TEAM_NAME}
          </span>
          <span className="ml-1 inline-block h-2.5 w-12 border border-[#0F172A] bg-[#FCE7F3] overflow-hidden">
            <span
              className="block h-full bg-[#EC4899] transition-[width] duration-300"
              style={{ width: `${progress}%` }}
            />
          </span>
        </div>
      </div>

      {/* Numeración + Acto (esquina inferior izquierda, alto contraste) */}
      <div
        data-no-swipe="true"
        className="fixed bottom-3.5 left-4 z-30 flex items-center gap-2 select-none"
      >
        <span
          className={`font-pixel text-[10px] font-bold tracking-widest uppercase px-2.5 py-1.5
            pixel-bevel-sm ${accent.bg} text-[#0F172A]`}
        >
          ACTO {act.label}
        </span>
        <span className="font-pixel text-[11px] font-bold text-[#0F172A] bg-white pixel-bevel-sm px-2.5 py-1.5">
          {String(current.n).padStart(2, '0')}
          <span className="text-[#475569]"> / {String(total).padStart(2, '0')}</span>
        </span>
      </div>

      {/* Botones arcade (esquina inferior derecha) */}
      <div
        data-no-swipe="true"
        className="fixed bottom-3.5 right-4 z-30 flex items-center gap-2 select-none"
      >
        <button
          type="button"
          aria-label="Slide anterior"
          onClick={onPrev}
          disabled={index === 0}
          className="arcade-btn disabled:opacity-35 disabled:cursor-not-allowed"
        >
          ◄
        </button>
        <button
          type="button"
          aria-label="Slide siguiente"
          onClick={onNext}
          disabled={index === total - 1}
          className="arcade-btn disabled:opacity-35 disabled:cursor-not-allowed"
        >
          ►
        </button>
      </div>
    </>
  )
}
