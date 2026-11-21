import { useCallback, useEffect, useRef, useState } from 'react'
import { SLIDES } from '../data/slidesConfig'
import SlideView from '../slides/SlideView'
import NavigationHUD from './NavigationHUD'
import ActMenu from './ActMenu'

const TOTAL = SLIDES.length

/** Distancia mínima (px) para considerar un swipe horizontal válido. */
const SWIPE_THRESHOLD = 55
/** Tolerancia vertical: si el gesto es más vertical que horizontal, se ignora. */
const SWIPE_RATIO = 1.3

/**
 * Determina si el elemento tocado (o alguno de sus ancestros) pide que el
 * swipe se ignore: inputs de rango, botones, canvas interactivos, campos
 * editables o cualquier nodo marcado con data-no-swipe="true".
 */
function isNoSwipeTarget(el: EventTarget | null): boolean {
  let node = el as HTMLElement | null
  while (node && node !== document.body) {
    if (node.dataset?.noSwipe === 'true') return true
    const tag = node.tagName
    if (tag === 'BUTTON' || tag === 'CANVAS' || tag === 'SELECT' || tag === 'TEXTAREA') {
      return true
    }
    if (tag === 'INPUT') {
      const type = (node as HTMLInputElement).type
      if (type === 'range' || type === 'text' || type === 'number') return true
      return true
    }
    if (node.isContentEditable) return true
    node = node.parentElement
  }
  return false
}

/**
 * Motor de presentación slide por slide a pantalla completa.
 *
 * - Pantalla completa real (100dvh, overflow hidden) en desktop y móvil.
 * - Navegación: ArrowLeft / ArrowRight, botones del HUD y swipe táctil.
 * - El swipe se desactiva sobre inputs de rango, botones, canvas, campos
 *   editables y nodos con data-no-swipe="true".
 * - Solo se monta el slide activo: los sketches inactivos se desmontan
 *   (P5Canvas llama a p.remove()), garantizando 0 CPU y 0 fugas.
 */
export default function SlideDeck() {
  const [index, setIndex] = useState(0)

  // Dirección del último cambio (1 = avanzar, -1 = retroceder) para la
  // transición: el nuevo slide entra desde el lado correspondiente.
  const dirRef = useRef<1 | -1>(1)

  const goTo = useCallback((i: number) => {
    setIndex((prev) => {
      const clamped = Math.max(0, Math.min(TOTAL - 1, i))
      if (clamped === prev) return prev
      dirRef.current = clamped > prev ? 1 : -1
      return clamped
    })
  }, [])

  const next = useCallback(() => goTo(indexRef.current + 1), [goTo])
  const prev = useCallback(() => goTo(indexRef.current - 1), [goTo])

  // Ref para leer el índice actual dentro de listeners sin recrearlos.
  const indexRef = useRef(index)
  indexRef.current = index

  // Navegación por teclado.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        next()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prev()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  // Gestos táctiles (swipe izquierda/derecha).
  const touch = useRef<{ x: number; y: number; valid: boolean } | null>(null)

  const onTouchStart = (e: React.TouchEvent) => {
    if (isNoSwipeTarget(e.target)) {
      touch.current = null
      return
    }
    const t = e.touches[0]
    touch.current = { x: t.clientX, y: t.clientY, valid: true }
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touch.current
    touch.current = null
    if (!start || !start.valid) return
    const t = e.changedTouches[0]
    const dx = t.clientX - start.x
    const dy = t.clientY - start.y
    if (Math.abs(dx) < SWIPE_THRESHOLD) return
    if (Math.abs(dx) < Math.abs(dy) * SWIPE_RATIO) return // gesto demasiado vertical
    if (dx < 0) next()
    else prev()
  }

  const slide = SLIDES[index]
  const isSketch =
    slide.component.startsWith('sketch-') || slide.component === 'closing'

  return (
    <main
      className="relative h-[100dvh] w-screen overflow-hidden bg-base"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Decoración ambiental 16-bit de día para las diapositivas conceptuales */}
      {!isSketch && (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
          {/* Nube pixel izquierda */}
          <svg
            viewBox="0 0 120 48"
            className="absolute left-[6%] top-12 h-10 w-24 opacity-85 sm:h-14 sm:w-36 animate-float-y"
          >
            <rect x="24" y="20" width="72" height="20" fill="#FFFFFF" />
            <rect x="36" y="10" width="44" height="14" fill="#FFFFFF" />
            <rect x="16" y="26" width="88" height="14" fill="#FFFFFF" />
            <rect x="16" y="36" width="88" height="4" fill="#BAE6FD" />
          </svg>

          {/* Nube pixel derecha */}
          <svg
            viewBox="0 0 120 48"
            className="absolute right-[8%] top-16 h-9 w-20 opacity-80 sm:h-12 sm:w-32 animate-float-y"
            style={{ animationDelay: '1.4s' }}
          >
            <rect x="24" y="20" width="72" height="20" fill="#FFFFFF" />
            <rect x="40" y="10" width="40" height="14" fill="#FFFFFF" />
            <rect x="16" y="26" width="88" height="14" fill="#FFFFFF" />
            <rect x="16" y="36" width="88" height="4" fill="#BAE6FD" />
          </svg>

          {/* Franja de suelo 16-bit (pasto + tierra) en la base */}
          <div className="pixel-ground-strip absolute inset-x-0 bottom-0 h-4 sm:h-5" />
        </div>
      )}

      <ActMenu index={index} onJump={goTo} />

      {/*
        Solo el slide activo está montado: `key` fuerza el remount y la
        limpieza de p5 (p.remove() cancela el loop/rAF). El remount replica la
        animación de entrada (fade + desplazamiento, 200ms) según la dirección.
      */}
      <section
        key={slide.n}
        className="relative z-10 h-full w-full"
        style={{
          animation: `slide-in-${dirRef.current === 1 ? 'right' : 'left'} 200ms cubic-bezier(0.22, 1, 0.36, 1) both`,
        }}
      >
        <SlideView slide={slide} />
      </section>

      <NavigationHUD index={index} total={TOTAL} onPrev={prev} onNext={next} />
    </main>
  )
}
