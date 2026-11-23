import { useEffect, useMemo, useRef, useState } from 'react'
import type p5 from 'p5'
import P5Canvas from '../components/P5Canvas'
import type { SketchFn } from '../components/P5Canvas'
import PixelGlyph from '../components/PixelGlyph'
import { onSlideKey } from './keyboard'

/**
 * Sketch 8 — ¿Qué es un fractal? (autosimilitud profunda por zoom).
 *
 * Apoyo visual que DEFINE el concepto de fractal antes de usarlo en la charla:
 * una figura hecha de copias más pequeñas de sí misma a cualquier escala.
 *
 * Mejoras:
 *   - Mayor profundidad matemática: Nivel 7 (78.126 puntos de resolución pura),
 *     permitiendo zooms profundos hasta ×81 con detalle microscópico nítido.
 *   - Renderizado nativo directo en Canvas 2D (Zero Allocations): dibuja los
 *     78.126 puntos a 60 FPS estables sin tirones, sin sobrecarga de memoria
 *     y sin ningún artefacto ni tintileo.
 *   - Eliminación total de recuadros o líneas punteadas: lienzo limpio, elegante
 *     y centrado en la geometría pura del fractal.
 *   - Auto-zoom continuo de respiración que viaja desde ×1 hasta ×81 y regresa
 *     suavemente, sin saltos abruptos.
 */

const BG = '#E6F7FF'
const GRID = '#BAE6FD'
const CURVE_COLOR = '#0284C7'
const CURVE_SHADOW = '#0F172A'

const AXIOM = 'F'
const RULE = 'F+F-F-F+F' // Curva cuadrática de Koch (factor de escala exacto 3)
const ANGLE = 90
const DEPTH = 7 // 78.126 puntos: resolución ultra-profunda hasta zoom ×81

/** Niveles de zoom fijos correspondientes a potencias exactas de 3. */
export const ZOOM_LEVELS = [1, 3, 9, 27, 81] as const

/** Expande la curva y devuelve los puntos de la tortuga (paso = 1). */
function buildPoints(): { x: number; y: number }[] {
  let path = AXIOM
  for (let i = 0; i < DEPTH; i++) {
    let next = ''
    for (const ch of path) next += ch === 'F' ? RULE : ch
    path = next
  }
  const pts: { x: number; y: number }[] = []
  let x = 0
  let y = 0
  let heading = 0
  pts.push({ x, y })
  for (const c of path) {
    if (c === 'F') {
      x += Math.cos((heading * Math.PI) / 180)
      y += Math.sin((heading * Math.PI) / 180)
      pts.push({ x: Math.round(x * 100) / 100, y: Math.round(y * 100) / 100 })
    } else if (c === '+') heading -= ANGLE
    else if (c === '-') heading += ANGLE
  }
  return pts
}

interface ZoomParams {
  playing: boolean
  fixedZoom: number | null
}

function makeSketch(
  paramsRef: { current: ZoomParams },
  pts: { x: number; y: number }[],
  onZoomChange?: (z: number) => void,
): SketchFn {
  return (p: p5, size: { width: number; height: number }) => {
    const spanX = pts[pts.length - 1].x - pts[0].x || 1
    const focusIdx = Math.floor(pts.length / 3)
    const focus = pts[focusIdx]

    let currentZoom = 1
    let zoomDir = 1 // 1: acercando, -1: alejando
    let pauseTimer = 0
    let lastReportedZoom = 1

    p.setup = () => {
      p.createCanvas(size?.width || window.innerWidth, size?.height || window.innerHeight)
    }

    // Soporte para zoom con la rueda del ratón
    p.mouseWheel = (event: WheelEvent) => {
      paramsRef.current.playing = false
      const zoomFactor = event.deltaY < 0 ? 1.15 : 0.87
      const nextZoom = Math.max(1, Math.min(85, currentZoom * zoomFactor))
      paramsRef.current.fixedZoom = nextZoom
      return false
    }

    p.draw = () => {
      p.background(BG)

      // ── Manejo de animación de Zoom suave y continuo ──
      const fixed = paramsRef.current.fixedZoom
      if (fixed != null) {
        currentZoom += (fixed - currentZoom) * 0.1
      } else if (paramsRef.current.playing) {
        if (pauseTimer > 0) {
          pauseTimer--
        } else {
          // Respiración multi-escala profunda: 1 → 81 → 1
          if (zoomDir === 1) {
            currentZoom *= 1.009
            if (currentZoom >= 81) {
              currentZoom = 81
              zoomDir = -1
              pauseTimer = 75 // Pausa de ~1.2s en la máxima profundidad (×81)
            }
          } else {
            currentZoom *= 0.991
            if (currentZoom <= 1.01) {
              currentZoom = 1
              zoomDir = 1
              pauseTimer = 50 // Pausa en la vista macro general (×1)
            }
          }
        }
      }

      // Notificar cambio de zoom para telemetría
      if (Math.abs(currentZoom - lastReportedZoom) > 0.1 && onZoomChange) {
        lastReportedZoom = currentZoom
        onZoomChange(currentZoom)
      }

      // ── Cuadrícula Blueprint suave ──
      p.stroke(GRID)
      p.strokeWeight(1)
      const step = p.width < 640 ? 30 : 42
      for (let gx = 0; gx < p.width; gx += step) p.line(gx, 0, gx, p.height)
      for (let gy = 0; gy < p.height; gy += step) p.line(0, gy, p.width, gy)

      // ── Transformación y Escala hacia el punto focal ──
      const margin = p.width < 640 ? 0.92 : 0.86
      const baseScale = (p.width * margin) / spanX
      const scale = baseScale * currentZoom

      const cx = p.width / 2
      const cy = p.height * 0.54

      // ── Renderizado Nativo Directo en Canvas 2D (Zero Allocations, 60 FPS) ──
      const ctx = p.drawingContext as CanvasRenderingContext2D
      ctx.save()
      ctx.translate(cx, cy)
      ctx.scale(1, -1)

      // 1. Delineado exterior de sombra oscura para contraste 16-bit
      ctx.beginPath()
      ctx.moveTo((pts[0].x - focus.x) * scale, (pts[0].y - focus.y) * scale)
      for (let i = 1; i < pts.length; i++) {
        ctx.lineTo((pts[i].x - focus.x) * scale, (pts[i].y - focus.y) * scale)
      }
      ctx.strokeStyle = CURVE_SHADOW
      ctx.lineWidth = Math.max(2.6, Math.min(5, scale * 0.035))
      ctx.lineJoin = 'miter'
      ctx.lineCap = 'square'
      ctx.stroke()

      // 2. Trazo interior cian eléctrico nítido
      ctx.beginPath()
      ctx.moveTo((pts[0].x - focus.x) * scale, (pts[0].y - focus.y) * scale)
      for (let i = 1; i < pts.length; i++) {
        ctx.lineTo((pts[i].x - focus.x) * scale, (pts[i].y - focus.y) * scale)
      }
      ctx.strokeStyle = CURVE_COLOR
      ctx.lineWidth = Math.max(1.8, Math.min(3.4, scale * 0.024))
      ctx.lineJoin = 'miter'
      ctx.lineCap = 'square'
      ctx.stroke()

      ctx.restore()
    }
  }
}

export default function Sketch8FractalZoom() {
  const pts = useMemo(() => buildPoints(), [])
  const [playing, setPlaying] = useState(true)
  const [fixedZoom, setFixedZoom] = useState<number | null>(null)
  const [liveZoom, setLiveZoom] = useState(1)

  const paramsRef = useRef<ZoomParams>({ playing: true, fixedZoom: null })
  paramsRef.current.playing = playing
  paramsRef.current.fixedZoom = fixedZoom

  const sketch = useMemo(() => makeSketch(paramsRef, pts, setLiveZoom), [pts])

  const toggleAuto = () => {
    setFixedZoom(null)
    setPlaying((v) => !v)
  }

  const pickZoom = (z: number) => {
    setPlaying(false)
    setFixedZoom((cur) => (cur === z ? null : z))
  }

  const stepZoom = (factor: number) => {
    setPlaying(false)
    setFixedZoom((cur) => {
      const base = cur ?? liveZoom
      return Math.max(1, Math.min(81, base * factor))
    })
  }

  useEffect(
    () =>
      onSlideKey((e) => {
        if (e.key === ' ') {
          e.preventDefault()
          toggleAuto()
          return
        }
        const n = Number(e.key)
        if (n >= 1 && n <= ZOOM_LEVELS.length) {
          e.preventDefault()
          pickZoom(ZOOM_LEVELS[n - 1])
          return
        }
        if (e.key === '+' || e.key === '=') {
          e.preventDefault()
          stepZoom(1.3)
          return
        }
        if (e.key === '-' || e.key === '_') {
          e.preventDefault()
          stepZoom(0.77)
          return
        }
      }),
    [liveZoom],
  )

  const autoActive = playing && fixedZoom == null

  return (
    <div className="relative h-full w-full select-none">
      <P5Canvas sketch={sketch} />

      {/* Definición de fractal (overlay nítido, responsivo) */}
      <div
        data-no-swipe="true"
        className="pointer-events-none absolute inset-x-0 top-12 z-20 flex justify-center px-3 sm:top-16"
      >
        <div className="pixel-bevel-sm max-w-[94vw] bg-white px-3 py-1.5 text-center font-mono text-[10px] font-bold leading-snug text-[#0F172A] sm:text-sm shadow-sm">
          <span className="text-[#0369A1]">Fractal</span> = figura hecha de{' '}
          <span className="text-[#BE185D]">copias más pequeñas de sí misma</span>{' '}
          <span className="hidden sm:inline">· se ve idéntica a cualquier escala (autosimilitud)</span>
        </div>
      </div>

      {/* Controles de zoom: auto + niveles discretos + manual (+ / -) */}
      <div
        data-no-swipe="true"
        className="absolute bottom-14 left-1/2 z-20 flex max-w-[96vw] -translate-x-1/2 flex-wrap
          items-center justify-center gap-1.5 sm:bottom-6 sm:gap-2"
      >
        {/* Botón Play / Stop */}
        <button
          type="button"
          onClick={toggleAuto}
          aria-pressed={autoActive}
          className="arcade-btn-lime inline-flex items-center gap-1.5 shadow-sm min-w-[5.2rem] justify-center"
        >
          <PixelGlyph name={autoActive ? 'pause' : 'play'} size={14} />
          {autoActive ? 'STOP' : 'PLAY'}
        </button>

        {/* Botones de Escala Fija Potencias de 3 */}
        <div className="flex items-center gap-1 rounded-md pixel-bevel-sm bg-white/95 px-1.5 py-1 shadow-sm">
          {ZOOM_LEVELS.map((z) => {
            const active = fixedZoom === z
            return (
              <button
                key={z}
                type="button"
                onClick={() => pickZoom(z)}
                aria-pressed={active}
                aria-label={`Zoom fijo por ${z}`}
                title={`Escala ×${z}`}
                className={`font-pixel text-[10px] font-bold h-7 min-w-[2.2rem] px-1.5 pixel-bevel-sm transition-all
                  ${
                    active
                      ? 'bg-[#A3E635] text-[#0F172A] scale-105 shadow-sm'
                      : 'bg-[#F8FAFC] text-[#0F172A] hover:bg-[#FACC15]'
                  }`}
              >
                ×{z}
              </button>
            )
          })}
        </div>

        {/* Botones de Zoom Manual Fino (+ / -) */}
        <div className="flex items-center gap-1 rounded-md pixel-bevel-sm bg-white/95 px-1 py-1 shadow-sm">
          <button
            type="button"
            onClick={() => stepZoom(0.77)}
            aria-label="Alejar zoom (−)"
            title="Alejar zoom (−)"
            className="font-pixel text-xs font-bold h-7 w-7 flex items-center justify-center pixel-bevel-sm bg-[#F8FAFC] text-[#0F172A] hover:bg-[#FACC15] transition-colors"
          >
            −
          </button>
          <button
            type="button"
            onClick={() => stepZoom(1.3)}
            aria-label="Acercar zoom (+)"
            title="Acercar zoom (+)"
            className="font-pixel text-xs font-bold h-7 w-7 flex items-center justify-center pixel-bevel-sm bg-[#F8FAFC] text-[#0F172A] hover:bg-[#FACC15] transition-colors"
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}
