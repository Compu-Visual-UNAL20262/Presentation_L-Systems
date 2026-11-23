import { useEffect, useMemo, useRef } from 'react'
import type p5 from 'p5'
import P5Canvas from '../components/P5Canvas'
import type { SketchFn } from '../components/P5Canvas'
import PixelGlyph from '../components/PixelGlyph'
import { onSlideKey } from './keyboard'

/**
 * Sketch 6 — L-System sensible al contexto (IL-System).
 *
 * Nivel 3 de realismo: las reglas ya no dependen solo del símbolo, sino de sus
 * vecinos. Modela una SEÑAL HORMONAL que viaja célula a célula por un tallo y
 * dispara la floración a su paso. Producción sensible a contexto:
 *
 *   S < a  →  S        (una célula 'a' con una señal 'S' a su izquierda
 *                       recibe la señal: se activa y la propaga)
 *
 * En notación de Prusinkiewicz, `izq < centro > der → sucesor`. Aquí mostramos
 * el caso acrópeto (la señal sube de la raíz hacia la punta).
 *
 * El objetivo es visual: cada clic/▶ lanza una señal desde la base; la celda
 * iluminada contagia a su vecina superior en el siguiente paso, y al pasar la
 * señal la celda "florece". Es el contraste con los niveles sin contexto, donde
 * cada símbolo decide a ciegas sin mirar a sus vecinos.
 */

const BG = '#C7ECFF' // mismo celeste del deck, para integración visual
const INK = '#0F172A'
const STEM = '#15803D'
const CELL_IDLE = '#E0F2FE' // célula en reposo (celeste muy claro)
const CELL_ACTIVE = '#FACC15' // señal pasando (amarillo)
const CELL_BLOOM = '#F472B6' // célula que ya floreció (rosa)
const SIGNAL = '#F59E0B'

const N_CELLS = 9
/** Frames por salto de la señal de una célula a la siguiente (~0.4 s a 60 FPS). */
const STEP_FRAMES = 24

interface ContextParams {
  /** Índice de la célula donde está la señal (-1 = sin señal aún). */
  runToken: number
}

function makeSketch(paramsRef: { current: ContextParams }): SketchFn {
  return (p: p5, size: { width: number; height: number }) => {
    let signalPos = -1 // célula actual de la señal
    let frames = 0
    let lastToken = paramsRef.current.runToken
    const bloomed: boolean[] = new Array(N_CELLS).fill(false)

    const launch = () => {
      signalPos = 0
      frames = 0
      for (let i = 0; i < N_CELLS; i++) bloomed[i] = false
    }

    p.setup = () => {
      p.createCanvas(size?.width || window.innerWidth, size?.height || window.innerHeight)
      launch()
    }

    p.draw = () => {
      if (paramsRef.current.runToken !== lastToken) {
        lastToken = paramsRef.current.runToken
        launch()
      }

      p.background(BG)

      // Geometría responsiva: tallo vertical centrado. Reservamos margen
      // superior amplio para el banner de la regla (overlay HTML en top-14/16)
      // y margen inferior para el botón ▶ LANZAR (bottom-6/16), de modo que las
      // células nunca queden debajo de esos elementos.
      const marginTop = Math.max(p.height * 0.26, 170)
      const marginBottom = Math.max(p.height * 0.2, 120)
      const usableH = Math.max(40, p.height - marginTop - marginBottom)
      const gap = usableH / (N_CELLS - 1)
      const cellSize = Math.max(12, Math.min(gap * 0.72, p.width * 0.08, 48))
      const cx = p.width / 2

      // Posición Y de cada célula (0 = base abajo, N-1 = punta arriba).
      const cellY = (i: number) => p.height - marginBottom - i * gap

      // ── Tallo que une las células ──
      p.stroke(STEM)
      p.strokeWeight(Math.max(3, cellSize * 0.16))
      p.line(cx, cellY(0), cx, cellY(N_CELLS - 1))

      // Avance temporal de la señal
      if (signalPos >= 0 && signalPos < N_CELLS) {
        frames++
        // La célula por la que pasa la señal queda marcada como floreciente.
        bloomed[signalPos] = true
        if (frames >= STEP_FRAMES) {
          frames = 0
          signalPos++
        }
      }

      // ── Células ──
      for (let i = 0; i < N_CELLS; i++) {
        const y = cellY(i)
        const isSignal = i === signalPos
        let fill = CELL_IDLE
        if (isSignal) fill = CELL_ACTIVE
        else if (bloomed[i]) fill = CELL_BLOOM

        p.stroke(INK)
        p.strokeWeight(Math.max(1.6, cellSize * 0.08))
        p.fill(fill)
        p.rectMode(p.CENTER)
        p.rect(cx, y, cellSize, cellSize, cellSize * 0.28)

        // Hoja/flor cuando la célula ya floreció
        if (bloomed[i] && !isSignal) {
          const side = i % 2 === 0 ? 1 : -1
          const lx = cx + side * cellSize * 0.95
          p.fill('#A3E635')
          p.stroke(INK)
          p.strokeWeight(Math.max(1.4, cellSize * 0.06))
          p.ellipse(lx, y, cellSize * 0.7, cellSize * 0.45)
          p.line(cx + (side * cellSize) / 2, y, lx - (side * cellSize) / 4, y)
        }

        // Halo de señal
        if (isSignal) {
          p.noFill()
          p.stroke(SIGNAL)
          p.strokeWeight(Math.max(2, cellSize * 0.12))
          const pulse = cellSize * (1.3 + 0.18 * Math.sin(p.frameCount * 0.25))
          p.circle(cx, y, pulse)
        }
      }

      // ── Etiquetas raíz / punta (fuera del tallo, en los márgenes reservados) ──
      p.noStroke()
      p.fill(INK)
      p.textStyle(p.BOLD)
      const labelSize = Math.max(11, Math.min(cellSize * 0.5, 17))
      p.textSize(labelSize)
      // "punta" centrada encima de la célula superior (zona libre bajo el banner).
      p.textAlign(p.CENTER, p.CENTER)
      p.text('▲ punta', cx, cellY(N_CELLS - 1) - cellSize * 0.85)
      // "raíz" a la izquierda de la célula base (la hoja de esa célula sale a la
      // derecha, así el texto no la tapa) y lejos del botón central.
      p.textAlign(p.RIGHT, p.CENTER)
      p.text('raíz · aquí nace la señal ►', cx - cellSize * 0.9, cellY(0))

      p.rectMode(p.CORNER)
    }
  }
}

export default function Sketch6Context() {
  const paramsRef = useRef<ContextParams>({ runToken: 0 })
  const sketch = useMemo(() => makeSketch(paramsRef), [])

  const launch = () => {
    paramsRef.current.runToken += 1
  }

  useEffect(
    () =>
      onSlideKey((e) => {
        if (e.key === ' ' || e.key === 'r' || e.key === 'R') {
          e.preventDefault()
          launch()
        }
      }),
    [],
  )

  return (
    <div className="relative h-full w-full">
      <P5Canvas sketch={sketch} />

      {/* Regla de contexto (overlay nítido, responsivo) */}
      <div
        data-no-swipe="true"
        className="pointer-events-none absolute inset-x-0 top-14 z-20 flex justify-center px-4 sm:top-16"
      >
        <span className="pixel-bevel-sm bg-white px-3 py-1.5 text-center font-mono text-[11px] font-bold text-[#0F172A] sm:text-sm">
          Regla sensible a contexto:{' '}
          <span className="text-[#7C3AED]">S &lt; a → S</span>
          <span className="hidden sm:inline"> · la célula mira a su vecino antes de cambiar</span>
        </span>
      </div>

      {/* Botón lanzar señal */}
      <div
        data-no-swipe="true"
        className="absolute bottom-14 left-1/2 z-20 flex max-w-[94vw] -translate-x-1/2 justify-center sm:bottom-6"
      >
        <button type="button" onClick={launch} className="arcade-btn-lime inline-flex items-center gap-1.5">
          <PixelGlyph name="play" />
          LANZAR SEÑAL HORMONAL
        </button>
      </div>
    </div>
  )
}
