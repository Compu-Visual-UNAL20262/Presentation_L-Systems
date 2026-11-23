import { useEffect, useMemo, useRef, useState } from 'react'
import type p5 from 'p5'
import P5Canvas from '../components/P5Canvas'
import type { SketchFn } from '../components/P5Canvas'
import PixelGlyph from '../components/PixelGlyph'

/**
 * Sketch 5 — Bosque estocástico (S0L-System) + prueba de estrés.
 *
 * S0L-System:
 *   Axioma ω = "X"
 *   F -> FF
 *   X -> (40%) F[-X][+X]FX | (40%) F[+X][-X]FX | (20%) FF[+X]X
 *
 * 5 árboles independientes. HUD de telemetría (segmentos + FPS con semáforo).
 * En iteración 8 el dibujo evita operaciones costosas extra para que la caída
 * de FPS sea real e ilustrativa sin congelar el navegador.
 */

const AXIOM = 'X'
const TREE_SCALES = [0.78, 1.04, 0.88, 1.12, 0.82]
const TREE_ANGLES = [19, 25, 21, 27, 20]
const TREE_LEANS = [-5, 3, -2, 6, -4]

const BG = '#C7ECFF'
const GROUND_GRASS = '#22C55E'
const GROUND_DIRT = '#854D0E'
const BRANCH = '#4A2C11'
const BUD = '#16A34A'

const EMERALD = '#15803D'
const YELLOW = '#D97706'
const RED = '#DC2626'

const ITER_OPTIONS = [4, 5, 6, 7, 8] as const

/** Expande un árbol estocástico. Cada expansión produce una silueta distinta. */
function expandStochastic(iterations: number): string {
  let current = AXIOM
  for (let i = 0; i < iterations; i++) {
    let next = ''
    for (const ch of current) {
      if (ch === 'F') {
        next += 'FF'
      } else if (ch === 'X') {
        const r = Math.random()
        if (r < 0.4) next += 'F[-X][+X]FX'
        else if (r < 0.8) next += 'F[+X][-X]FX'
        else next += 'FF[+X]X'
      } else {
        next += ch
      }
    }
    current = next
  }
  return current
}

/** Cuenta los símbolos 'F' (segmentos dibujables) de una cadena. */
function countF(s: string): number {
  let c = 0
  for (const ch of s) if (ch === 'F') c++
  return c
}

function measureTreeHeight(path: string, angle: number, lean: number): number {
  let x = 0
  let y = 0
  let heading = -90 + lean
  let minY = 0
  const stack: { x: number; y: number; heading: number }[] = []

  for (const c of path) {
    switch (c) {
      case 'F':
        x += Math.cos((heading * Math.PI) / 180)
        y += Math.sin((heading * Math.PI) / 180)
        minY = Math.min(minY, y)
        break
      case '+':
        heading += angle
        break
      case '-':
        heading -= angle
        break
      case '[':
        stack.push({ x, y, heading })
        break
      case ']': {
        const state = stack.pop()
        if (state) ({ x, y, heading } = state)
        break
      }
      default:
        break
    }
  }

  return Math.max(1, -minY)
}

interface ForestParams {
  trees: string[]
  iterations: number
  /** Telemetría que el sketch publica de vuelta a React. */
  onTelemetry: (segments: number, fps: number) => void
}

function makeSketch(paramsRef: { current: ForestParams }): SketchFn {
  return (p: p5, size: { width: number; height: number }) => {
    let telemetryTick = 0
    let measuredTrees: string[] | null = null
    let measuredHeight = 0
    let fittedStepLength = 0

    p.setup = () => {
      p.createCanvas(size?.width || window.innerWidth, size?.height || window.innerHeight)
    }

    const drawTree = (path: string, len: number, heavy: boolean, angle: number) => {
      // Dibujo minimalista: solo líneas y brotes, sin alpha ni sombras, para
      // que el coste sea representativo del número de segmentos.
      p.stroke(BRANCH)
      let depth = 0
      for (const c of path) {
        switch (c) {
          case 'F':
            p.strokeWeight(Math.max(1.1, (heavy ? 2.1 : 2.8) - depth * 0.18))
            p.line(0, 0, 0, -len)
            p.translate(0, -len)
            break
          case '+':
            p.rotate(p.radians(angle))
            break
          case '-':
            p.rotate(p.radians(-angle))
            break
          case '[':
            p.push()
            depth++
            break
          case ']':
            p.pop()
            depth--
            break
          default:
            break
        }
      }
    }

    // Brotes dibujados en una segunda pasada ligera (se omiten en n=8).
    const drawBuds = (path: string, len: number, angle: number) => {
      p.stroke('#0F172A')
      p.strokeWeight(0.9)
      p.fill(BUD)
      const leafSize = Math.max(4, Math.min(12, len * 0.5))
      for (const c of path) {
        switch (c) {
          case 'F':
            p.translate(0, -len)
            break
          case '+':
            p.rotate(p.radians(angle))
            break
          case '-':
            p.rotate(p.radians(-angle))
            break
          case '[':
            p.push()
            break
          case ']':
            p.noStroke()
            p.rectMode(p.CORNER)
            p.fill('#166534')
            p.rect(-leafSize, -leafSize * 0.3, leafSize, leafSize)
            p.rect(leafSize * 0.35, -leafSize * 1.1, leafSize, leafSize)
            p.fill('#22C55E')
            p.rect(-leafSize * 0.2, -leafSize * 1.15, leafSize, leafSize)
            p.rect(leafSize * 0.8, -leafSize * 0.25, leafSize, leafSize)
            p.fill('#A3E635')
            p.rect(-leafSize * 0.7, -leafSize * 0.95, leafSize * 0.65, leafSize * 0.65)
            p.pop()
            break
          default:
            break
        }
      }
    }

    p.draw = () => {
      p.background(BG)
      const { trees, iterations } = paramsRef.current
      const heavy = iterations >= 8 // safeguard: modo ligero sin extras

      // Franja de suelo 16-bit (pasto + tierra).
      const groundY = p.height - p.height * 0.08
      const groundH = p.height - groundY
      p.noStroke()
      p.fill(GROUND_DIRT)
      p.rect(0, groundY, p.width, groundH)
      p.fill(GROUND_GRASS)
      p.rect(0, groundY, p.width, Math.max(8, groundH * 0.35))
      p.stroke('#0F172A')
      p.strokeWeight(2.5)
      p.line(0, groundY, p.width, groundY)

      if (trees !== measuredTrees || p.height !== measuredHeight) {
        measuredTrees = trees
        measuredHeight = p.height
        let tallestTree = 1
        for (let i = 0; i < trees.length; i++) {
          const angle = TREE_ANGLES[i % TREE_ANGLES.length]
          const lean = TREE_LEANS[i % TREE_LEANS.length]
          const scale = TREE_SCALES[i % TREE_SCALES.length]
          tallestTree = Math.max(
            tallestTree,
            measureTreeHeight(trees[i], angle, lean) * scale,
          )
        }
        const topMargin = p.height * 0.18
        const foliageMargin = 20
        fittedStepLength = Math.max(0, (groundY - topMargin - foliageMargin) / tallestTree)
      }

      // Reserva espacio para los controles y la insignia inferior derecha.
      const n = trees.length || 5
      const leftInset = Math.min(240, p.width * 0.34)
      const rightInset = Math.min(230, p.width * 0.33)
      for (let i = 0; i < n; i++) {
        const x = n === 1
          ? p.width / 2
          : leftInset + ((p.width - leftInset - rightInset) * i) / (n - 1)
        const treeLen = fittedStepLength * TREE_SCALES[i % TREE_SCALES.length]
        const angle = TREE_ANGLES[i % TREE_ANGLES.length]
        const lean = TREE_LEANS[i % TREE_LEANS.length]
        p.push()
        p.translate(x, groundY)
        p.rotate(p.radians(lean))
        drawTree(trees[i], treeLen, heavy, angle)
        p.pop()
        // Brotes solo cuando no estamos en el modo pesado (n < 8).
        if (!heavy) {
          p.push()
          p.translate(x, groundY)
          p.rotate(p.radians(lean))
          drawBuds(trees[i], treeLen, angle)
          p.pop()
        }
      }

      // Publica telemetría ~6 veces/seg para no saturar React.
      telemetryTick++
      if (telemetryTick % 10 === 0) {
        const segments = trees.reduce((acc, t) => acc + countF(t), 0)
        paramsRef.current.onTelemetry(segments, Math.round(p.frameRate()))
      }
    }
  }
}

interface Sketch5ForestProps {
  mode?: 'stochastic' | 'stress'
}

export default function Sketch5Forest({ mode = 'stochastic' }: Sketch5ForestProps) {
  const [iterations, setIterations] = useState(4)
  const [telemetry, setTelemetry] = useState({ segments: 0, fps: 0 })

  const genForest = (n: number) => [
    expandStochastic(n),
    expandStochastic(n),
    expandStochastic(n),
    expandStochastic(n),
    expandStochastic(n),
  ]

  const [trees, setTrees] = useState<string[]>(() => genForest(4))

  const paramsRef = useRef<ForestParams>({
    trees,
    iterations: 4,
    onTelemetry: (segments, fps) => setTelemetry({ segments, fps }),
  })

  // Mantener el ref vivo sincronizado.
  paramsRef.current.trees = trees
  paramsRef.current.iterations = iterations
  paramsRef.current.onTelemetry = (segments, fps) => setTelemetry({ segments, fps })

  const sketch = useMemo(() => makeSketch(paramsRef), [])

  const regenerate = () => setTrees(genForest(iterations))

  const chooseIterations = (n: number) => {
    setIterations(n)
    setTrees(genForest(n))
  }

  // En modo "stress" arranca en iteración 4 (igual que el estocástico) para
  // que el expositor muestre la progresión completa 4 → 5 → 6 → 7 y la caída
  // de FPS desde un punto fluido. Antes arrancaba en 7 y se perdía el "antes".
  useEffect(() => {
    if (mode === 'stress') {
      chooseIterations(4)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode])

  const fpsColor =
    telemetry.fps >= 50 ? EMERALD : telemetry.fps >= 25 ? YELLOW : RED

  return (
    <div className="relative h-full w-full">
      <P5Canvas sketch={sketch} />

      {/* Telemetría HUD 16-bit de día (esquina superior derecha). En móvil baja
          a top-24 para no solaparse con el badge centrado del slide (top-14). */}
      <div
        data-no-swipe="true"
        className="absolute right-3 top-24 z-20 w-40 space-y-2 pixel-bevel
          bg-white p-2.5 sm:top-16 sm:w-48 sm:p-3"
      >
        {mode === 'stress' ? (
          <div className="pixel-bevel-sm bg-[#FEE2E2] px-2 py-1 text-center font-pixel text-[9px] font-black text-[#DC2626] tracking-wider">
            ⚠️ MODO ESTRÉS GPU
          </div>
        ) : (
          <div className="pixel-bevel-sm bg-[#DCFCE7] px-2 py-0.5 text-center font-pixel text-[8px] font-bold text-[#15803D]">
            🌱 S0L-SYSTEM
          </div>
        )}
        <div>
          <div className="font-pixel text-[9px] font-bold uppercase tracking-widest text-[#334155]">
            Segmentos
          </div>
          <div className="font-mono text-lg font-bold text-[#B45309]">
            {telemetry.segments.toLocaleString('es')}
          </div>
        </div>
        <div className="border-t-2 border-[#0F172A] pt-2">
          <div className="font-pixel text-[9px] font-bold uppercase tracking-widest text-[#334155]">
            FPS
          </div>
          <div className="font-mono text-lg font-bold" style={{ color: fpsColor }}>
            {telemetry.fps}
          </div>
        </div>
      </div>

      {/* Controles (esquina inferior izquierda; por encima del HUD inferior) */}
      <div
        data-no-swipe="true"
        className="absolute bottom-24 left-4 z-20 flex flex-col gap-2 pixel-bevel bg-white/95 p-2 sm:bottom-16"
      >
        <button type="button" onClick={regenerate} className="arcade-btn inline-flex items-center gap-1.5">
          <PixelGlyph name="replay" />
          REGENERAR BOSQUE
        </button>
        <div className="flex gap-1.5">
          {ITER_OPTIONS.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => chooseIterations(n)}
              className={`font-pixel text-[11px] font-bold h-8 w-8 pixel-bevel-sm transition-colors ${
                iterations === n
                  ? 'bg-[#A3E635] text-[#0F172A]'
                  : 'bg-white text-[#0F172A] hover:bg-[#FACC15]'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
