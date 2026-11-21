import { useEffect, useRef, useState } from 'react'
import { ACTS, SLIDES } from '../data/slidesConfig'
import { ACCENT } from '../data/accent'

interface ActMenuProps {
  index: number // 0-based
  onJump: (index: number) => void
}

/**
 * Menú desplegable discreto (botón "MENU" estilo pixel) para saltar directo a
 * cualquiera de los 6 Actos o 21 slides. Lleva data-no-swipe para no disparar
 * el gesto táctil. Se cierra con Escape o al hacer clic fuera.
 */
export default function ActMenu({ index, onJump }: ActMenuProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const currentN = SLIDES[index].n

  const jump = (slideIndex: number) => {
    onJump(slideIndex)
    setOpen(false)
  }

  return (
    <div ref={ref} data-no-swipe="true" className="fixed top-3 left-4 z-40 select-none">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Abrir menú de navegación"
        className="arcade-btn"
      >
        {open ? '✕ MENU' : '≡ MENU'}
      </button>

      {open && (
        <div
          className="thin-scroll mt-2 max-h-[70vh] w-72 overflow-y-auto pixel-bevel
            bg-surface/95 backdrop-blur-sm p-3 shadow-xl"
        >
          {ACTS.map((act) => {
            const accent = ACCENT[act.accent]
            const slidesOfAct = SLIDES.filter((s) => s.act === act.id)
            return (
              <div key={act.id} className="mb-3 last:mb-0">
                <div className="mb-1.5 flex items-baseline gap-2">
                  <span
                    className={`font-pixel text-[10px] tracking-widest uppercase px-1.5 py-1
                      pixel-bevel bg-base ${accent.text} border-l-2 ${accent.border}`}
                  >
                    ACTO {act.label}
                  </span>
                  <span className="font-display text-[11px] text-slate-400 truncate">
                    {act.title}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 pl-1">
                  {slidesOfAct.map((s) => {
                    const i = SLIDES.findIndex((x) => x.n === s.n)
                    const active = s.n === currentN
                    return (
                      <button
                        key={s.n}
                        type="button"
                        onClick={() => jump(i)}
                        title={s.title ?? `Slide ${s.n}`}
                        className={`font-pixel text-[11px] h-8 w-8 pixel-bevel transition-colors
                          ${
                            active
                              ? `${accent.bg} text-base`
                              : 'bg-base text-slate-400 hover:text-slate-100'
                          }`}
                      >
                        {String(s.n).padStart(2, '0')}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
