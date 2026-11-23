import { useEffect, useMemo, useRef, useState } from 'react'
import type p5 from 'p5'
import P5Canvas from '../components/P5Canvas'
import type { SketchFn } from '../components/P5Canvas'
import PixelGlyph from '../components/PixelGlyph'
import { onSlideKey } from './keyboard'

/**
 * Sketch 8 — ¿Qué es un fractal? (autosimilitud por zoom).
 *
 * No es un L-System en sí, sino el apoyo visual que DEFINE el concepto de
 * fractal antes de usarlo en el resto de la charla: una figura hecha de copias
 * más pequeñas de sí misma. Hace zoom hacia una esquina de la curva de Koch;
 * como la curva es autosimilar, al ampliar reaparece la MISMA forma una y otra
 * vez. Un marcador recuadra "la misma forma" en cada escala.
 *
 * Controles:
 *   - Auto-zoom continuo (play/pausa, también ESPACIO).
 *   - Niveles de zoom discretos ×1 / ×2 / ×3 / ×6 / ×9 (teclas 1..5): fijan la
 *     ampliación para comparar escalas lado a lado sin movimiento.
 * El zoom hace loop suave: cada vez que triplica la escala reinicia sin salto,
 * porque la curva de Koch es exactamente autosimilar con factor 3.
 */

const BG = '#E6F7FF'
const GRID = '#BAE6FD'
const INK = '#0F172A'
const CURVE = '#0369A1'
const MARK = '#DB2777'

const AXIOM = 'F'
const RULE = 'F+F-F-F+F' // curva de Koch cuadrática (factor de escala 3)
const ANGLE = 90
const DEPTH = 5

/** Niveles de zoom fijos ofrecidos al público. */
export const ZOOM_LEVELS = [1, 2, 3, 6, 9] as const

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
      pts.push({ x, y })
    } else if (c === '+') heading -= ANGLE
    else if (c === '-') heading += ANGLE
  }
  return pts
}

interface ZoomParams {
  playing: boolean
  /** Zoom fijo elegido (null = continuo controlado por auto-zoom). */
  fixedZoom: number | null
}

function makeSketch(paramsRef: { current: ZoomParams }, pts: { x: number; y: number }[]): SketchFn {
  return (p: p5, size: { width: number; height: number }) => {
    // Rango horizontal total de la curva (empieza en 0 y avanza en +x).
    const spanX = pts[pts.length - 1].x - pts[0].x || 1
    let zoom = 1 // factor de ampliación actual (hace loop entre 1 y 3)

    p.setup = () => {
      p.createCanvas(size?.width || window.innerWidth, size?.height || window.innerHeight)
    }

    p.draw = () => {
      p.background(BG)

      // Cuadrícula técnica suave (se adapta a la densidad del lienzo)
      p.stroke(GRID)
      p.strokeWeight(1)
      const step = p.width < 640 ? 28 : 40
      for (let gx = 0; gx < p.width; gx += step) p.line(gx, 0, gx, p.height)
      for (let gy = 0; gy < p.height; gy += step) p.line(0, gy, p.width, gy)

      const fixed = paramsRef.current.fixedZoom
      if (fixed != null) {
        // Zoom fijo: acercamiento suave al nivel elegido, sin loop.
        zoom += (fixed - zoom) * 0.12
      } else if (paramsRef.current.playing) {
        // Crece exponencialmente; al triplicar reinicia (autosimilitud x3).
        zoom *= 1.006
        if (zoom >= 3) zoom = 1
      }

      // El fractal ocupa casi todo el ancho y buena parte del alto disponible.
      // Dejamos margen arriba para el título y abajo para los controles/HUD.
      const margin = p.width < 640 ? 0.92 : 0.88
      const baseScale = (p.width * margin) / spanX
      const scale = baseScale * zoom

      // Punto focal del zoom: una esquina característica a 1/3 del ancho, donde
      // la autosimilitud es evidente. Lo mantenemos centrado al ampliar.
      const focus = pts[Math.floor(pts.length / 3)]
      const cx = p.width / 2
      const cy = p.height * 0.54

      p.push()
      p.translate(cx, cy)
      p.scale(1, -1)
      // Dibuja la curva centrada en el punto focal.
      p.noFill()
      p.stroke(CURVE)
      p.strokeWeight(Math.max(1.8, Math.min(4, scale * 0.025)))
      p.beginShape()
      for (const pt of pts) {
        p.vertex((pt.x - focus.x) * scale, (pt.y - focus.y) * scale)
      }
      p.endShape()
      p.pop()

      // Recuadro "la misma forma": un marco que señala una copia a la escala
      // actual, para subrayar que lo que vemos se repite idéntico.
      const boxSize = (spanX / 3) * baseScale // tamaño de una copia a zoom 1
      p.push()
      p.translate(cx, cy)
      p.noFill()
      p.stroke(MARK)
      p.strokeWeight(2.5)
      p.drawingContext.setLineDash([8, 6])
      p.rectMode(p.CENTER)
      p.rect(0, -boxSize * 0.12, boxSize, boxSize * 0.75, 4)
      p.drawingContext.setLineDash([])
      p.pop()

      // Etiqueta de escala
      p.noStroke()
      p.fill(INK)
      p.textAlign(p.CENTER, p.CENTER)
      p.textStyle(p.BOLD)
      p.textSize(Math.max(12, Math.min(p.width * 0.018, 18)))
      p.text(`Zoom ×${zoom.toFixed(2)} · la misma forma reaparece`, p.width / 2, p.height * 0.9)
    }
  }
}

export default function Sketch8FractalZoom() {
  const pts = useMemo(() => buildPoints(), [])
  const [playing, setPlaying] = useState(true)
  const [fixedZoom, setFixedZoom] = useState<number | null>(null)
  const paramsRef = useRef<ZoomParams>({ playing: true, fixedZoom: null })
  paramsRef.current.playing = playing
  paramsRef.current.fixedZoom = fixedZoom

  const sketch = useMemo(() => makeSketch(paramsRef, pts), [pts])

  const toggleAuto = () => {
    // Al reanudar el auto-zoom se abandona cualquier nivel fijo.
    setFixedZoom(null)
    setPlaying((v) => !v)
  }

  const pickZoom = (z: number) => {
    setPlaying(false)
    setFixedZoom((cur) => (cur === z ? null : z))
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
        }
      }),
    [],
  )

  const autoActive = playing && fixedZoom == null

  return (
    <div className="relative h-full w-full">
      <P5Canvas sketch={sketch} />

      {/* Definición de fractal (overlay nítido, responsivo) */}
      <div
        data-no-swipe="true"
        className="pointer-events-none absolute inset-x-0 top-12 z-20 flex justify-center px-3 sm:top-16"
      >
        <div className="pixel-bevel-sm max-w-[94vw] bg-white px-3 py-1.5 text-center font-mono text-[10px] font-bold leading-snug text-[#0F172A] sm:text-sm">
          <span className="text-[#0369A1]">Fractal</span> = figura hecha de{' '}
          <span className="text-[#BE185D]">copias más pequeñas de sí misma</span>{' '}
          <span className="hidden sm:inline">· se ve igual a cualquier escala (autosimilitud)</span>
        </div>
      </div>

      {/* Controles de zoom: auto + niveles discretos. Envuelven en pantallas
          angostas y nunca pisan el HUD inferior. */}
      <div
        data-no-swipe="true"
        className="absolute bottom-14 left-1/2 z-20 flex max-w-[94vw] -translate-x-1/2 flex-wrap
          items-center justify-center gap-1.5 sm:bottom-6 sm:gap-2"
      >
        <button
          type="button"
          onClick={toggleAuto}
          aria-pressed={autoActive}
          className="arcade-btn-lime inline-flex items-center gap-1.5"
        >
          <PixelGlyph name={autoActive ? 'pause' : 'play'} size={14} />
          AUTO-ZOOM
        </button>

        <div className="flex items-center gap-1 rounded-md pixel-bevel-sm bg-white/90 px-1.5 py-1">
          {ZOOM_LEVELS.map((z) => {
            const active = fixedZoom === z
            return (
              <button
                key={z}
                type="button"
                onClick={() => pickZoom(z)}
                aria-pressed={active}
                aria-label={`Zoom fijo por ${z}`}
                className={`font-pixel text-[10px] font-bold h-7 min-w-[2rem] px-1.5 pixel-bevel-sm transition-colors
                  ${active ? 'bg-[#A3E635] text-[#0F172A]' : 'bg-[#F8FAFC] text-[#0F172A] hover:bg-[#FACC15]'}`}
              >
                ×{z}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
