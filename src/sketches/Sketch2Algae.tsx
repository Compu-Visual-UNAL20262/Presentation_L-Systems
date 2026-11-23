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
 *   extremo d. → "A:B = r" (#C084FC), el cociente #A / #B que converge al
 *                número áureo φ ≈ 1.618 a medida que crece la generación.
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
const VIOLET = '#C084FC' // cociente A:B (converge a φ)
const PHI = 1.618

/** Cuenta cuántas 'A' y 'B' hay en una cadena. */
function countAB(str: string): { a: number; b: number } {
  let a = 0
  let b = 0
  for (const ch of str) {
    if (ch === 'A') a++
    else if (ch === 'B') b++
  }
  return { a, b }
}

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

  return (p: p5, size: { width: number; height: number }) => {
    p.setup = () => {
      p.createCanvas(size?.width || window.innerWidth, size?.height || window.innerHeight)
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

      const cardW = p.width * 0.72
      const cardX = (p.width - cardW) / 2
      const padX = Math.min(20, cardW * 0.04)
      // Anchos de columna: izquierda y derecha fijas, centro flexible.
      const colLeft = Math.min(70, cardW * 0.16)
      const colRight = Math.min(150, cardW * 0.3)
      const centerX = cardX + padX + colLeft
      const centerW = cardW - padX * 2 - colLeft - colRight

      const topY = Math.max(92, p.height * 0.13)
      const availH = p.height - topY - p.height * 0.08
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
        p.rect(cardX, y - cardH / 2, cardW, cardH, 4)

        // ── Columna izquierda: n = X ──
        p.noStroke()
        p.fill(isCurrent ? '#BE185D' : SLATE)
        p.textStyle(p.BOLD)
        p.textSize(Math.min(16, rowH * 0.42))
        p.textAlign(p.LEFT, p.CENTER)
        p.text(`n = ${i}`, cardX + padX, y)

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

        // ── Columna derecha: conteo (Fibonacci) + cociente A:B → φ ──
        const { a: countA, b: countB } = countAB(str)
        const ratio = countB > 0 ? countA / countB : null
        const badgeW = Math.min(136, colRight * 0.94)
        const rightX = cardX + cardW - padX - badgeW
        // Si hay espacio vertical, apilamos dos píldoras; si no, solo Fibonacci.
        const twoRows = cardH >= 40
        const badgeH = twoRows ? Math.min(cardH * 0.42, 22) : Math.min(cardH * 0.72, 30)
        const gapY = twoRows ? Math.min(6, cardH * 0.12) : 0
        const yTop = twoRows ? y - badgeH - gapY / 2 : y - badgeH / 2
        const yBot = y + gapY / 2

        // Píldora 1: conteo total (Fibonacci)
        p.fill(isCurrent ? LIME : '#DCFCE7')
        p.stroke(INK)
        p.strokeWeight(1.5)
        p.rectMode(p.CORNER)
        p.rect(rightX, yTop, badgeW, badgeH, 4)
        p.noStroke()
        p.fill(isCurrent ? INK : EMERALD)
        p.textStyle(p.BOLD)
        p.textAlign(p.CENTER, p.CENTER)
        p.textSize(Math.min(13, badgeH * 0.62))
        p.text(`Letras: ${str.length}`, rightX + badgeW / 2, yTop + badgeH / 2)

        // Píldora 2: cociente A:B → φ (solo si hay dos filas y existe el cociente)
        if (twoRows && ratio !== null) {
          p.fill(isCurrent ? VIOLET : '#F3E8FF')
          p.stroke(INK)
          p.strokeWeight(1.5)
          p.rectMode(p.CORNER)
          p.rect(rightX, yBot, badgeW, badgeH, 4)
          p.noStroke()
          p.fill(isCurrent ? INK : '#7C3AED')
          p.textStyle(p.BOLD)
          p.textAlign(p.CENTER, p.CENTER)
          p.textSize(Math.min(12, badgeH * 0.58))
          p.text(`A:B = ${ratio.toFixed(3)}`, rightX + badgeW / 2, yBot + badgeH / 2)
        }
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
      {/* Pista del número áureo: el cociente A:B converge a φ ≈ 1.618 */}
      <div
        data-no-swipe="true"
        className="pointer-events-none absolute inset-x-0 bottom-4 z-20 flex justify-center px-4"
      >
        <span className="pixel-bevel-sm bg-white px-3 py-1 font-mono text-[10px] font-bold text-[#0F172A] sm:text-xs">
          Longitud → <span className="text-[#15803D]">Fibonacci</span> · cociente{' '}
          <span className="text-[#7C3AED]">A:B → φ ≈ {PHI}</span> (número áureo)
        </span>
      </div>
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
          +     GENERACIÓN
        </button>
        <button type="button" onClick={reset} className="arcade-btn">
          REINICIAR
        </button>
      </div>
    </div>
  )
}
