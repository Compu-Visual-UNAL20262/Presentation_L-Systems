import { useEffect, useMemo, useRef, useState } from 'react'
import type p5 from 'p5'
import P5Canvas from '../components/P5Canvas'
import type { SketchFn } from '../components/P5Canvas'
import PixelGlyph from '../components/PixelGlyph'
import { onSlideKey } from './keyboard'

/**
 * Sketch 10 — Determinista vs. estocástico, lado a lado.
 *
 * Dos mini-bosques de la MISMA especie generativa, comparados en vivo:
 *   Izquierda (D0L): regla única → los 3 árboles son clones idénticos.
 *   Derecha  (S0L): la regla tira un "dado" en cada yema → los 3 son únicos.
 *
 * Al pulsar ⟳ REGENERAR, el lado determinista no cambia (siempre igual) y el
 * estocástico nace distinto cada vez. Aísla el papel del azar en la variación
 * natural, que es el salto conceptual del nivel 1 al nivel 2.
 */

const AXIOM = 'X'
const BG = '#C7ECFF'
const INK = '#0F172A'
const BRANCH = '#4A2C11'
const BUD = '#16A34A'
const ANGLE = 22

/** Regla determinista fija: todos los árboles salen idénticos. */
function expandDeterministic(iterations: number): string {
  let current = AXIOM
  for (let i = 0; i < iterations; i++) {
    let next = ''
    for (const ch of current) {
      if (ch === 'F') next += 'FF'
      else if (ch === 'X') next += 'F[-X][+X]FX'
      else next += ch
    }
    current = next
  }
  return current
}

/** Regla estocástica: en cada X se elige una de 3 variantes con probabilidad. */
function expandStochastic(iterations: number): string {
  let current = AXIOM
  for (let i = 0; i < iterations; i++) {
    let next = ''
    for (const ch of current) {
      if (ch === 'F') next += 'FF'
      else if (ch === 'X') {
        const r = Math.random()
        if (r < 0.4) next += 'F[-X][+X]FX'
        else if (r < 0.8) next += 'F[+X][-X]FX'
        else next += 'FF[+X]X'
      } else next += ch
    }
    current = next
  }
  return current
}

function measureHeight(path: string): number {
  let x = 0, y = 0, heading = -90, minY = 0
  const stack: { x: number; y: number; heading: number }[] = []
  for (const c of path) {
    if (c === 'F') {
      y += Math.sin((heading * Math.PI) / 180)
      x += Math.cos((heading * Math.PI) / 180)
      minY = Math.min(minY, y)
    } else if (c === '+') heading += ANGLE
    else if (c === '-') heading -= ANGLE
    else if (c === '[') stack.push({ x, y, heading })
    else if (c === ']') {
      const s = stack.pop()
      if (s) ({ x, y, heading } = s)
    }
  }
  return Math.max(1, -minY)
}

interface CompareParams {
  det: string[]
  sto: string[]
  iterations: number
}

function makeSketch(paramsRef: { current: CompareParams }): SketchFn {
  return (p: p5, size: { width: number; height: number }) => {
    p.setup = () => {
      p.createCanvas(size?.width || window.innerWidth, size?.height || window.innerHeight)
    }

    const drawTree = (path: string, len: number) => {
      p.stroke(BRANCH)
      let depth = 0
      for (const c of path) {
        switch (c) {
          case 'F':
            p.strokeWeight(Math.max(1, 2.4 - depth * 0.2))
            p.line(0, 0, 0, -len)
            p.translate(0, -len)
            break
          case '+': p.rotate(p.radians(ANGLE)); break
          case '-': p.rotate(p.radians(-ANGLE)); break
          case '[': p.push(); depth++; break
          case ']':
            p.noStroke()
            p.fill(BUD)
            p.circle(0, 0, Math.max(3, len * 0.9))
            p.stroke(BRANCH)
            p.pop(); depth--
            break
          default: break
        }
      }
    }

    p.draw = () => {
      p.background(BG)
      const { det, sto } = paramsRef.current

      const groundY = p.height - p.height * 0.08
      // Suelo
      p.noStroke()
      p.fill('#854D0E')
      p.rect(0, groundY, p.width, p.height - groundY)
      p.fill('#22C55E')
      p.rect(0, groundY, p.width, Math.max(8, (p.height - groundY) * 0.34))
      p.stroke(INK)
      p.strokeWeight(2.5)
      p.line(0, groundY, p.width, groundY)

      // Línea divisoria central
      p.stroke('#94A3B8')
      p.strokeWeight(2)
      p.drawingContext.setLineDash([6, 6])
      p.line(p.width / 2, p.height * 0.16, p.width / 2, groundY)
      p.drawingContext.setLineDash([])

      // Escala para encajar el árbol más alto de ambos lados.
      const all = [...det, ...sto]
      let tallest = 1
      for (const t of all) tallest = Math.max(tallest, measureHeight(t))
      const topMargin = p.height * 0.2
      const len = Math.max(0, (groundY - topMargin) / tallest)

      const drawGroup = (trees: string[], x0: number, x1: number) => {
        const n = trees.length
        for (let i = 0; i < n; i++) {
          const x = x0 + ((x1 - x0) * (i + 0.5)) / n
          p.push()
          p.translate(x, groundY)
          drawTree(trees[i], len)
          p.pop()
        }
      }

      drawGroup(det, p.width * 0.04, p.width * 0.48)
      drawGroup(sto, p.width * 0.52, p.width * 0.96)
    }
  }
}

export default function Sketch10Compare() {
  const ITER = 4
  const [det] = useState<string[]>(() => {
    const t = expandDeterministic(ITER)
    return [t, t, t] // mismo string → clones idénticos
  })
  const [sto, setSto] = useState<string[]>(() => [
    expandStochastic(ITER),
    expandStochastic(ITER),
    expandStochastic(ITER),
  ])

  const paramsRef = useRef<CompareParams>({ det, sto, iterations: ITER })
  paramsRef.current.det = det
  paramsRef.current.sto = sto

  const sketch = useMemo(() => makeSketch(paramsRef), [])

  const regenerate = () =>
    setSto([expandStochastic(ITER), expandStochastic(ITER), expandStochastic(ITER)])

  useEffect(
    () =>
      onSlideKey((e) => {
        if (e.key === ' ' || e.key === 'r' || e.key === 'R') {
          e.preventDefault()
          regenerate()
        }
      }),
    [],
  )

  return (
    <div className="relative h-full w-full">
      <P5Canvas sketch={sketch} />

      {/* Rótulos de cada lado */}
      <div
        data-no-swipe="true"
        className="pointer-events-none absolute inset-x-0 top-14 z-20 flex justify-center gap-2 px-4 sm:top-16"
      >
        <span className="pixel-bevel-sm bg-[#E2E8F0] px-3 py-1 font-pixel text-[9px] font-bold text-[#334155] sm:text-[10px]">
          D0L · CLONES IDÉNTICOS
        </span>
        <span className="pixel-bevel-sm bg-[#DCFCE7] px-3 py-1 font-pixel text-[9px] font-bold text-[#15803D] sm:text-[10px]">
          S0L · CADA ÁRBOL ÚNICO
        </span>
      </div>

      {/* Botón regenerar (solo afecta al lado estocástico) */}
      <div
        data-no-swipe="true"
        className="absolute bottom-14 left-1/2 z-20 flex max-w-[94vw] -translate-x-1/2 justify-center sm:bottom-6"
      >
        <button type="button" onClick={regenerate} className="arcade-btn-lime inline-flex items-center gap-1.5">
          <PixelGlyph name="replay" />
          <span className="truncate">REGENERAR (SOLO EL LADO DEL DADO)</span>
        </button>
      </div>
    </div>
  )
}
