import { useEffect, useRef } from 'react'
import p5 from 'p5'

/**
 * Firma de un sketch en Instance Mode.
 *
 * Recibe la instancia `p` de p5 y el tamaño actual del contenedor.
 * El sketch define `p.setup`, `p.draw`, etc. sobre esa instancia.
 */
export type SketchFn = (p: p5, size: { width: number; height: number }) => void

interface P5CanvasProps {
  sketch: SketchFn
  /** Clase opcional para el contenedor que envuelve el lienzo. */
  className?: string
}

/**
 * Componente reutilizable que monta un sketch de p5.js en Instance Mode.
 *
 * Garantías:
 * - Instance Mode: `new p5(fn, containerRef.current)`, nunca modo global.
 * - Dimensiones garantizadas a pantalla completa desde el frame 0: previene que
 *   el canvas inicialice en 100x100 en la esquina.
 * - Responsivo: un ResizeObserver redimensiona el lienzo con el contenedor
 *   y sincroniza tras la animación de cambio de slide (200ms).
 * - Cero fugas: al desmontar se llama `p.remove()`.
 */
export default function P5Canvas({ sketch, className }: P5CanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let instance: p5 | null = null

    const getDimensions = () => {
      const rect = container.getBoundingClientRect()
      const w = Math.floor(rect.width || container.clientWidth || window.innerWidth || 800)
      const h = Math.floor(rect.height || container.clientHeight || window.innerHeight || 600)
      return { width: Math.max(w, 100), height: Math.max(h, 100) }
    }

    const initialSize = getDimensions()

    // Fábrica del sketch: inyectamos `p` y aseguramos dimensiones del contenedor.
    const factory = (p: p5) => {
      // Interceptamos createCanvas para garantizar que nunca inicialice a 100x100 por defecto
      const origCreateCanvas = p.createCanvas.bind(p)
      p.createCanvas = (w?: number, h?: number, renderer?: unknown) => {
        const cur = getDimensions()
        const targetW = !w || w === 100 ? cur.width : w
        const targetH = !h || h === 100 ? cur.height : h
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return origCreateCanvas(targetW, targetH, renderer as any)
      }
      sketch(p, initialSize)
    }

    instance = new p5(factory, container)

    const markCanvas = () => {
      const canvas = container.querySelector('canvas')
      if (canvas) canvas.setAttribute('data-no-swipe', 'true')
    }
    markCanvas()

    const syncSize = () => {
      if (!instance || !container) return
      const { width, height } = getDimensions()
      if (width > 0 && height > 0 && (instance.width !== width || instance.height !== height)) {
        instance.resizeCanvas(width, height)
        markCanvas()
        const maybeResize = (instance as unknown as { windowResized?: () => void }).windowResized
        if (typeof maybeResize === 'function') maybeResize.call(instance)
      }
    }

    syncSize()
    const rafId = requestAnimationFrame(syncSize)
    const t1 = setTimeout(syncSize, 60)
    const t2 = setTimeout(syncSize, 250)

    // Responsividad: observamos el tamaño del contenedor.
    const ro = new ResizeObserver((entries) => {
      if (!instance) return
      const entry = entries[0]
      if (!entry) return
      const { width, height } = entry.contentRect
      if (width <= 0 || height <= 0) return
      instance.resizeCanvas(Math.floor(width), Math.floor(height))
      markCanvas()
      const maybeResize = (instance as unknown as { windowResized?: () => void }).windowResized
      if (typeof maybeResize === 'function') maybeResize.call(instance)
    })
    ro.observe(container)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(t1)
      clearTimeout(t2)
      ro.disconnect()
      if (instance) {
        instance.remove()
        instance = null
      }
    }
  }, [sketch])

  return (
    <div
      ref={containerRef}
      data-no-swipe="true"
      className={`relative h-full w-full overflow-hidden ${className ?? ''}`}
    />
  )
}
