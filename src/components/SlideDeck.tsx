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

  const goTo = useCallback((i: number) => {
    setIndex((prev) => {
      const next = Math.max(0, Math.min(TOTAL - 1, i))
      return next === prev ? prev : next
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

  return (
    <main
      className="relative h-[100dvh] w-screen overflow-hidden bg-base"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <ActMenu index={index} onJump={goTo} />

      {/* Solo el slide activo está montado: key fuerza remount y limpieza p5. */}
      <section key={slide.n} className="h-full w-full">
        <SlideView slide={slide} />
      </section>

      <NavigationHUD index={index} total={TOTAL} onPrev={prev} onNext={next} />
    </main>
  )
}
