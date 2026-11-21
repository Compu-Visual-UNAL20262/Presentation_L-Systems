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
 * - Responsivo: un ResizeObserver redimensiona el lienzo con el contenedor
 *   y llama a `p.windowResized()` si el sketch la define.
 * - Cero fugas: al desmontar (o cambiar de slide) se llama `p.remove()`, que
 *   detiene el loop de dibujo, libera la GPU y elimina el <canvas> del DOM.
 *   Un slide inactivo no consume CPU porque su instancia deja de existir.
 *
 * El <canvas> lleva `data-no-swipe` para que el motor de gestos táctiles
 * ignore los arrastres que ocurren sobre él (sketches interactivos).
 */
export default function P5Canvas({ sketch, className }: P5CanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let instance: p5 | null = null

    // Medida inicial del contenedor.
    const initialSize = {
      width: container.clientWidth || 1,
      height: container.clientHeight || 1,
    }

    // Fábrica del sketch: inyectamos `p` y el tamaño del contenedor.
    const factory = (p: p5) => {
      // Tamaño vivo que el sketch puede leer vía p.width / p.height tras resize.
      sketch(p, initialSize)
    }

    instance = new p5(factory, container)

    // Marcamos el <canvas> generado para que el swipe táctil lo ignore.
    const markCanvas = () => {
      const canvas = container.querySelector('canvas')
      if (canvas) canvas.setAttribute('data-no-swipe', 'true')
    }
    markCanvas()

    // Responsividad: observamos el tamaño del contenedor.
    const ro = new ResizeObserver((entries) => {
      if (!instance) return
      const entry = entries[0]
      if (!entry) return
      const { width, height } = entry.contentRect
      if (width <= 0 || height <= 0) return
      instance.resizeCanvas(Math.floor(width), Math.floor(height))
      markCanvas()
      // Si el sketch definió windowResized, dejamos que reaccione.
      const maybeResize = (instance as unknown as { windowResized?: () => void })
        .windowResized
      if (typeof maybeResize === 'function') maybeResize.call(instance)
    })
    ro.observe(container)

    // Limpieza: 0 fugas, 0 CPU en slides inactivos.
    return () => {
      ro.disconnect()
      if (instance) {
        instance.remove()
        instance = null
      }
    }
    // Re-montamos si cambia la función del sketch (p. ej. al navegar de slide).
  }, [sketch])

  return (
    <div
      ref={containerRef}
      data-no-swipe="true"
      className={`relative h-full w-full overflow-hidden ${className ?? ''}`}
    />
  )
}
