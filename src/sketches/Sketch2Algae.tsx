import { useEffect, useMemo, useRef, useState } from 'react'
import type p5 from 'p5'
import P5Canvas from '../components/P5Canvas'
import type { SketchFn } from '../components/P5Canvas'
import { onSlideKey } from './keyboard'

/**
 * Sketch 2 — El alga que sabe contar (Fibonacci emergente).
 *
 * D0L-System de Anabaena catenula:
 *   Axioma ω = "A"
 *   Reglas P = { A -> AB, B -> A }  (aplicadas en paralelo)
 *
 * Muestra filas progresivas de n=0 a n=7 en 3 columnas responsivas:
 *   izquierda  → "n = X"
 *   centro     → letras como cápsulas (A=#F39C12, B=#38BDF8), tamaño dinámico
 *                para que las 34 letras de n=7 no se desborden ni en móvil
 *   derecha    → "Letras: N" (#2ECC71), que sigue a Fibonacci (1,2,3,5,…,34)
 */

const AXIOM = 'A'
const RULES: Record<string, string> = { A: 'AB', B: 'A' }
const MAX_GEN = 7

const BG = '#D8F3FF'
const INK = '#0F172A'
const AMBER = '#FACC15' // A (amarillo moneda)
const CYAN = '#38BDF8' // B (azul cielo intenso)
const LIME = '#A3E635'
const EMERALD = '#15803D'
const SLATE = '#334155'

/** Genera todas las generaciones una sola vez. */
function buildGenerations(): string[] {
  const gens: string[] = []
  let current = AXIOM
  gens.push(current)
  for (let i = 0; i < MAX_GEN; i++) {
    let next = ''
    for (const ch of current) next += RULES[ch] ?? ch
    current = next
    gens.push(current)
  }
  return gens
}

interface AlgaeParams {
  gen: number
}

function makeSketch(generations: string[], paramsRef: { current: AlgaeParams }): SketchFn {
  const maxLen = generations[MAX_GEN].length // 34

  return (p: p5) => {
    p.setup = () => {
      p.createCanvas(p.width || 800, p.height || 600)
      p.textFont('monospace')
    }

    // Clic avanza una generación (hasta n=7, luego se queda).
    p.mousePressed = () => {
      paramsRef.current.gen = Math.min(MAX_GEN, paramsRef.current.gen + 1)
    }

    p.draw = () => {
      p.background(BG)
      const gen = paramsRef.current.gen
      const rows = gen + 1

      const padX = p.width * 0.04
      // Anchos de columna: izquierda y derecha fijas, centro flexible.
      const colLeft = Math.min(70, p.width * 0.16)
      const colRight = Math.min(130, p.width * 0.26)
      const centerX = padX + colLeft
      const centerW = p.width - padX * 2 - colLeft - colRight

      const topY = p.height * 0.08
      const availH = p.height * 0.84
      const rowH = availH / (MAX_GEN + 1)

      // Tamaño de cápsula: cabe la fila más larga (34 letras) en centerW.
      const capGap = 2
      const capSize = Math.max(
        6,
        Math.min(rowH * 0.6, (centerW - (maxLen - 1) * capGap) / maxLen),
      )
      const capFont = Math.max(5, capSize * 0.62)

      for (let i = 0; i < rows; i++) {
        const y = topY + i * rowH + rowH / 2
        const str = generations[i]
        const isCurrent = i === gen

        // ── Carril / tarjeta horizontal 16-bit por generación ──
        p.rectMode(p.CORNER)
        p.stroke(INK)
        p.strokeWeight(isCurrent ? 2.2 : 1.5)
        p.fill(isCurrent ? '#FFFFFF' : '#F0F9FF')
        const cardH = Math.min(rowH * 0.84, 52)
        p.rect(padX * 0.65, y - cardH / 2, p.width - padX * 1.3, cardH, 4)

        // ── Columna izquierda: n = X ──
        p.noStroke()
        p.fill(isCurrent ? '#BE185D' : SLATE)
        p.textStyle(p.BOLD)
        p.textSize(Math.min(16, rowH * 0.42))
        p.textAlign(p.LEFT, p.CENTER)
        p.text(`n = ${i}`, padX, y)

        // ── Columna central: cápsulas con borde oscuro nítido ──
        const totalW = str.length * capSize + (str.length - 1) * capGap
        let x = centerX + (centerW - totalW) / 2 // centradas en la columna
        for (const ch of str) {
          const col = ch === 'A' ? AMBER : CYAN
          p.stroke(INK)
          p.strokeWeight(Math.max(1.2, capSize * 0.08))
          p.fill(col)
          p.rectMode(p.CENTER)
          p.rect(x + capSize / 2, y, capSize, capSize * 1.05, capSize * 0.25)
          // Letra oscura sobre la cápsula luminosa
          p.noStroke()
          p.fill(INK)
          p.textAlign(p.CENTER, p.CENTER)
          p.textSize(capFont)
          p.textStyle(p.BOLD)
          p.text(ch, x + capSize / 2, y + 0.5)
          x += capSize + capGap
        }

        // ── Columna derecha: conteo (Fibonacci) ──
        p.fill(isCurrent ? LIME : '#DCFCE7')
        p.stroke(INK)
        p.strokeWeight(1.5)
        p.rectMode(p.CORNER)
        const badgeW = Math.min(118, colRight * 0.92)
        const badgeH = Math.min(cardH * 0.72, 30)
        p.rect(p.width - padX - badgeW, y - badgeH / 2, badgeW, badgeH, 4)

        p.noStroke()
        p.fill(isCurrent ? INK : EMERALD)
        p.textStyle(p.BOLD)
        p.textAlign(p.CENTER, p.CENTER)
        p.textSize(Math.min(14, rowH * 0.38))
        p.text(`Letras: ${str.length}`, p.width - padX - badgeW / 2, y)
        p.textStyle(p.NORMAL)
      }

      p.rectMode(p.CORNER)
      p.textAlign(p.LEFT, p.BASELINE)
    }
  }
}

export default function Sketch2Algae() {
  const generations = useMemo(() => buildGenerations(), [])
  const [gen, setGen] = useState(0)
  const paramsRef = useRef<AlgaeParams>({ gen: 0 })

  const sketch = useMemo(
    () => makeSketch(generations, paramsRef),
    [generations],
  )

  const advance = () => {
    const next = Math.min(MAX_GEN, gen + 1)
    setGen(next)
    paramsRef.current.gen = next
  }
  const reset = () => {
    setGen(0)
    paramsRef.current.gen = 0
  }

  // Tecla 'R' reinicia (atajo acotado al slide; ignora campos editables).
  useEffect(() => onSlideKey((e) => {
    if (e.key === 'r' || e.key === 'R') reset()
  }), [])

  return (
    <div className="relative h-full w-full">
      <P5Canvas sketch={sketch} />

      <div
        data-no-swipe="true"
        className="absolute right-4 top-14 z-20 flex flex-col items-end gap-2 sm:top-16"
      >
        <button
          type="button"
          onClick={advance}
          disabled={gen >= MAX_GEN}
          className="arcade-btn disabled:opacity-30 disabled:cursor-not-allowed"
        >
          + GENERACIÓN
        </button>
        <button type="button" onClick={reset} className="arcade-btn">
          REINICIAR
        </button>
      </div>
    </div>
  )
}
