import { useEffect, useRef, useState } from 'react'
import { ACTS, SLIDES, TEAM_NAME } from '../data/slidesConfig'
import { ACCENT } from '../data/accent'

interface ActMenuProps {
  index: number // 0-based
  onJump: (index: number) => void
}

/**
 * Menú desplegable estilo botón "MENU" amarillo moneda (16-bit de día) para
 * saltar directo a cualquiera de las 6 secciones o las slides de la charla.
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
    <div ref={ref} data-no-swipe="true" className="fixed top-3.5 left-4 z-40 select-none">
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
          className="thin-scroll mt-2 max-h-[74vh] w-80 overflow-y-auto pixel-bevel
            bg-white p-3.5"
        >
          <div className="mb-3 flex items-center justify-between border-b-2 border-[#0F172A] pb-2">
            <span className="font-pixel text-[10px] font-bold tracking-wider text-[#0F172A]">
              ★ {TEAM_NAME} · SELECT STAGE
            </span>
            <span className="font-mono text-[10px] font-bold text-[#15803D]">
              {SLIDES.length} LVLS
            </span>
          </div>

          {ACTS.map((act) => {
            const accent = ACCENT[act.accent]
            const slidesOfAct = SLIDES.filter((s) => s.act === act.id)
            return (
              <div key={act.id} className="mb-3.5 last:mb-0">
                <div className="mb-1.5 flex items-center gap-2">
                  <span
                    className={`font-pixel text-[10px] font-bold tracking-widest uppercase px-2 py-0.5
                      pixel-bevel-sm ${accent.bg} text-[#0F172A]`}
                  >
                    {act.tag}
                  </span>
                  <span className="font-display text-xs font-semibold text-[#0F172A] truncate">
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
                        className={`font-pixel text-[11px] font-bold h-8 w-8 pixel-bevel-sm transition-colors
                          ${
                            active
                              ? 'bg-[#A3E635] text-[#0F172A]'
                              : 'bg-[#F8FAFC] text-[#0F172A] hover:bg-[#FACC15]'
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
