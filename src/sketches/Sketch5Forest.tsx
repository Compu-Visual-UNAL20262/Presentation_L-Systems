import { useEffect, useMemo, useRef, useState } from 'react'
import type p5 from 'p5'
import P5Canvas from '../components/P5Canvas'
import type { SketchFn } from '../components/P5Canvas'

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
const ANGLE_DEG = 22

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

interface ForestParams {
  trees: string[]
  iterations: number
  /** Telemetría que el sketch publica de vuelta a React. */
  onTelemetry: (segments: number, fps: number) => void
}

function makeSketch(paramsRef: { current: ForestParams }): SketchFn {
  return (p: p5) => {
    let telemetryTick = 0

    p.setup = () => {
      p.createCanvas(p.width || 800, p.height || 600)
    }

    const drawTree = (path: string, len: number, heavy: boolean) => {
      // Dibujo minimalista: solo líneas y brotes, sin alpha ni sombras, para
      // que el coste sea representativo del número de segmentos.
      p.stroke(BRANCH)
      p.strokeWeight(heavy ? 1.1 : 1.7)
      for (const c of path) {
        switch (c) {
          case 'F':
            p.line(0, 0, 0, -len)
            p.translate(0, -len)
            break
          case '+':
            p.rotate(p.radians(ANGLE_DEG))
            break
          case '-':
            p.rotate(p.radians(-ANGLE_DEG))
            break
          case '[':
            p.push()
            break
          case ']':
            p.pop()
            break
          default:
            break
        }
      }
    }

    // Brotes dibujados en una segunda pasada ligera (se omiten en n=8).
    const drawBuds = (path: string, len: number) => {
      p.stroke('#0F172A')
      p.strokeWeight(0.9)
      p.fill(BUD)
      for (const c of path) {
        switch (c) {
          case 'F':
            p.translate(0, -len)
            break
          case '+':
            p.rotate(p.radians(ANGLE_DEG))
            break
          case '-':
            p.rotate(p.radians(-ANGLE_DEG))
            break
          case '[':
            p.push()
            break
          case ']':
            p.circle(0, 0, 4.4)
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

      // Longitud escalada por iteraciones y altura del lienzo.
      const len = Math.pow(0.5, iterations) * p.height * 0.9

      // 5 árboles distribuidos; el espaciado se adapta al ancho (móvil incl.).
      const n = trees.length || 5
      for (let i = 0; i < n; i++) {
        const x = (p.width * (i + 0.5)) / n
        p.push()
        p.translate(x, groundY)
        drawTree(trees[i], len, heavy)
        p.pop()
        // Brotes solo cuando no estamos en el modo pesado (n < 8).
        if (!heavy) {
          p.push()
          p.translate(x, groundY)
          drawBuds(trees[i], len)
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

  // En modo "stress" arranca ya con iteraciones altas (7) para ilustrar coste.
  useEffect(() => {
    if (mode === 'stress') {
      chooseIterations(7)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode])

  const fpsColor =
    telemetry.fps >= 50 ? EMERALD : telemetry.fps >= 25 ? YELLOW : RED

  return (
    <div className="relative h-full w-full">
      <P5Canvas sketch={sketch} />

      {/* Telemetría HUD 16-bit de día (esquina superior derecha) */}
      <div
        data-no-swipe="true"
        className="absolute right-3 top-14 z-20 w-44 space-y-2 pixel-bevel
          bg-white p-3 sm:top-16"
      >
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

      {/* Controles (esquina inferior izquierda, sobre el suelo) */}
      <div
        data-no-swipe="true"
        className="absolute bottom-16 left-4 z-20 flex flex-col gap-2"
      >
        <button type="button" onClick={regenerate} className="arcade-btn">
          ⟳ REGENERAR BOSQUE
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
