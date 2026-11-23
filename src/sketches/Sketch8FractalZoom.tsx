import { useEffect, useMemo, useRef, useState } from 'react'
import type p5 from 'p5'
import P5Canvas from '../components/P5Canvas'
import type { SketchFn } from '../components/P5Canvas'
import { onSlideKey } from './keyboard'

/**
 * Sketch 8 — ¿Qué es un fractal? (autosimilitud por zoom infinito).
 *
 * No es un L-System en sí, sino el apoyo visual que DEFINE el concepto de
 * fractal antes de usarlo en el resto de la charla: una figura hecha de copias
 * más pequeñas de sí misma. Hace un zoom continuo hacia una esquina de la curva
 * de Koch; como la curva es autosimilar, al ampliar reaparece la MISMA forma
 * una y otra vez. Un marcador recuadra "la misma forma" en cada escala.
 *
 * Interacción: ▶ PAUSA / ZOOM para alternar; también ESPACIO. El zoom hace loop
 * suave (cada vez que triplica la escala, reinicia sin salto porque la curva de
 * Koch es exactamente autosimilar con factor 3).
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

      // Cuadrícula técnica suave
      p.stroke(GRID)
      p.strokeWeight(1)
      const step = 40
      for (let gx = 0; gx < p.width; gx += step) p.line(gx, 0, gx, p.height)
      for (let gy = 0; gy < p.height; gy += step) p.line(0, gy, p.width, gy)

      if (paramsRef.current.playing) {
        // Crece exponencialmente; al triplicar reinicia (autosimilitud x3).
        zoom *= 1.006
        if (zoom >= 3) zoom = 1
      }

      // Escala base para encuadrar toda la curva con margen, luego ampliamos.
      const margin = 0.82
      const baseScale = (p.width * margin) / spanX
      const scale = baseScale * zoom

      // Punto focal del zoom: una esquina característica a 1/3 del ancho, donde
      // la autosimilitud es evidente. Lo mantenemos centrado al ampliar.
      const focus = pts[Math.floor(pts.length / 3)]
      const cx = p.width / 2
      const cy = p.height * 0.56

      p.push()
      p.translate(cx, cy)
      p.scale(1, -1)
      // Dibuja la curva centrada en el punto focal.
      p.noFill()
      p.stroke(CURVE)
      p.strokeWeight(Math.max(1.5, Math.min(3, scale * 0.02)))
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
      p.text(`Zoom ×${zoom.toFixed(2)} · la misma forma reaparece`, p.width / 2, p.height * 0.93)
    }
  }
}

export default function Sketch8FractalZoom() {
  const pts = useMemo(() => buildPoints(), [])
  const [playing, setPlaying] = useState(true)
  const paramsRef = useRef<ZoomParams>({ playing: true })
  paramsRef.current.playing = playing

  const sketch = useMemo(() => makeSketch(paramsRef, pts), [pts])

  useEffect(
    () =>
      onSlideKey((e) => {
        if (e.key === ' ') {
          e.preventDefault()
          setPlaying((v) => !v)
        }
      }),
    [],
  )

  return (
    <div className="relative h-full w-full">
      <P5Canvas sketch={sketch} />

      {/* Definición de fractal (overlay nítido, responsivo) */}
      <div
        data-no-swipe="true"
        className="pointer-events-none absolute inset-x-0 top-14 z-20 flex justify-center px-4 sm:top-16"
      >
        <div className="pixel-bevel-sm max-w-[94vw] bg-white px-3 py-1.5 text-center font-mono text-[11px] font-bold text-[#0F172A] sm:text-sm">
          <span className="text-[#0369A1]">Fractal</span> = figura hecha de{' '}
          <span className="text-[#BE185D]">copias más pequeñas de sí misma</span>{' '}
          <span className="hidden sm:inline">· se ve igual a cualquier escala (autosimilitud)</span>
        </div>
      </div>

      {/* Botón pausa/zoom */}
      <div
        data-no-swipe="true"
        className="absolute bottom-16 left-1/2 z-20 -translate-x-1/2 sm:bottom-6"
      >
        <button type="button" onClick={() => setPlaying((v) => !v)} className="arcade-btn-lime">
          {playing ? '⏸ PAUSAR ZOOM' : '▶ REANUDAR ZOOM'}
        </button>
      </div>
    </div>
  )
}
