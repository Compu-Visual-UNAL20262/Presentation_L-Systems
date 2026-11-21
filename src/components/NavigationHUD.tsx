import { actForSlide, SLIDES } from '../data/slidesConfig'
import { ACCENT } from '../data/accent'

interface NavigationHUDProps {
  index: number // 0-based
  total: number
  onPrev: () => void
  onNext: () => void
}

/**
 * HUD de navegación: barra de progreso superior ultra delgada (3px) con
 * gradiente neón, numeración pixel y botones discretos en la esquina inferior
 * derecha. Los controles llevan data-no-swipe para no disparar el gesto táctil.
 */
export default function NavigationHUD({ index, total, onPrev, onNext }: NavigationHUDProps) {
  const current = SLIDES[index]
  const act = actForSlide(current.n)
  const accent = ACCENT[current.accent]
  const progress = ((index + 1) / total) * 100

  return (
    <>
      {/* Barra de progreso superior (3px) con gradiente neón */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-30 h-[3px] bg-white/5">
        <div
          className="h-full transition-[width] duration-500 ease-out"
          style={{
            width: `${progress}%`,
            background:
              'linear-gradient(90deg, #38BDF8 0%, #2ECC71 45%, #F39C12 75%, #EC4899 100%)',
          }}
        />
      </div>

      {/* Numeración + Acto (esquina inferior izquierda, discreto) */}
      <div
        data-no-swipe="true"
        className="fixed bottom-4 left-4 z-30 flex items-center gap-2 select-none"
      >
        <span
          className={`font-pixel text-[10px] tracking-widest uppercase px-2 py-1.5
            pixel-bevel bg-surface ${accent.text} border-l-2 ${accent.border}`}
        >
          ACTO {act.label}
        </span>
        <span className="font-pixel text-[11px] text-slate-200 bg-[#070A12]/85 backdrop-blur-sm border border-white/15 rounded px-2 py-1.5">
          {String(current.n).padStart(2, '0')}
          <span className="text-slate-400"> / {String(total).padStart(2, '0')}</span>
        </span>
      </div>

      {/* Botones discretos (esquina inferior derecha) */}
      <div
        data-no-swipe="true"
        className="fixed bottom-4 right-4 z-30 flex items-center gap-2 select-none"
      >
        <button
          type="button"
          aria-label="Slide anterior"
          onClick={onPrev}
          disabled={index === 0}
          className="arcade-btn disabled:opacity-25 disabled:cursor-not-allowed"
        >
          ◄
        </button>
        <button
          type="button"
          aria-label="Slide siguiente"
          onClick={onNext}
          disabled={index === total - 1}
          className="arcade-btn disabled:opacity-25 disabled:cursor-not-allowed"
        >
          ►
        </button>
      </div>
    </>
  )
}
