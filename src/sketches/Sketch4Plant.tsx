import { useEffect, useMemo, useRef, useState } from 'react'
import type p5 from 'p5'
import P5Canvas from '../components/P5Canvas'
import type { SketchFn } from '../components/P5Canvas'
import { onSlideKey } from './keyboard'

/**
 * Sketch 4 — Planta ramificada con corchetes [ ] y control en vivo.
 *
 * Bracketed D0L-System:
 *   Axioma ω = "F"
 *   Regla  F -> F[+F][-F]F[+F]
 *
 * Optimización: la cadena solo se reexpande cuando cambian las iteraciones.
 * El ángulo y la longitud únicamente redibujan el lienzo cada frame (los
 * valores llegan por refs de React, sin remontar p5 → 60 FPS fluidos).
 */

const AXIOM = 'F'
const RULE = 'F[+F][-F]F[+F]'

const BG = '#1E293B'
const STEM = '#22C55E' // verde bosque
const TIP = '#86EFAC' // verde lima (puntas)

const ANGLE_MIN = 5
const ANGLE_MAX = 60
const LEN_MIN = 4
const LEN_MAX = 30
const ITER_MIN = 1
const ITER_MAX = 6

/** Expande la cadena (double buffering). Solo se llama al cambiar n. */
function expand(iterations: number): string {
  let current = AXIOM
  for (let i = 0; i < iterations; i++) {
    let next = ''
    for (const ch of current) next += ch === 'F' ? RULE : ch
    current = next
  }
  return current
}

interface PlantParams {
  angle: number
  len: number
  /** Cadena ya expandida; la actualiza React solo al cambiar n. */
  path: string
  iterations: number
}

function makeSketch(paramsRef: { current: PlantParams }): SketchFn {
  return (p: p5) => {
    p.setup = () => {
      p.createCanvas(p.width || 800, p.height || 600)
    }

    p.draw = () => {
      p.background(BG)
      const { angle, len, path, iterations } = paramsRef.current
      if (!path) return

      // Escala la longitud a la altura del lienzo para que no se salga.
      const scaled = len * Math.pow(0.55, iterations - 1)
      // Normaliza respecto a una altura de referencia de 600 px.
      const effLen = scaled * (p.height / 600) * 6

      p.push()
      p.translate(p.width / 2, p.height - p.height * 0.05)
      // Grosor según iteraciones (tallos más finos a mayor n).
      p.strokeWeight(Math.max(1, 3.4 - iterations * 0.35))
      for (const c of path) {
        switch (c) {
          case 'F':
            p.stroke(STEM)
            p.line(0, 0, 0, -effLen)
            p.translate(0, -effLen)
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
            // Punta: pequeño brote en verde lima.
            p.noStroke()
            p.fill(TIP)
            p.circle(0, 0, Math.max(2, effLen * 0.22))
            p.stroke(STEM)
            p.pop()
            break
          default:
            break
        }
      }
      p.pop()
    }
  }
}

/** Slider estilizado en Tailwind (sin createSlider nativo de p5). */
function Slider({
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
}: {
  label: string
  value: number
  display: string
  min: number
  max: number
  step: number
  onChange: (v: number) => void
}) {
  return (
    <label className="block select-none">
      <div className="mb-1 flex items-baseline justify-between">
        <span className="font-pixel text-[9px] uppercase tracking-widest text-slate-400">
          {label}
        </span>
        <span className="font-mono text-xs text-neon-emerald">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="plant-range h-1.5 w-full cursor-pointer appearance-none rounded-full
          bg-white/10 accent-neon-emerald"
      />
    </label>
  )
}

export default function Sketch4Plant() {
  const [angle, setAngle] = useState(15) // ciprés
  const [len, setLen] = useState(16)
  const [iterations, setIterations] = useState(4)

  // La cadena se memoiza por iteraciones: solo se reexpande al cambiar n.
  const path = useMemo(() => expand(iterations), [iterations])

  const paramsRef = useRef<PlantParams>({
    angle: 15,
    len: 16,
    path,
    iterations: 4,
  })

  // Reflejar valores en el ref vivo cada render (sin remontar p5).
  paramsRef.current.angle = angle
  paramsRef.current.len = len
  paramsRef.current.path = path
  paramsRef.current.iterations = iterations

  const sketch = useMemo(() => makeSketch(paramsRef), [])

  const segments = useMemo(() => {
    let c = 0
    for (const ch of path) if (ch === 'F') c++
    return c
  }, [path])

  // Preset rápido con tecla 'C' (ciprés) para volver al estado inicial.
  useEffect(() => onSlideKey((e) => {
    if (e.key === 'c' || e.key === 'C') {
      setAngle(15)
      setLen(16)
      setIterations(4)
    }
  }), [])

  return (
    <div className="relative h-full w-full">
      <P5Canvas sketch={sketch} />

      {/* Panel de control (ignora swipe) */}
      <div
        data-no-swipe="true"
        className="absolute right-3 top-14 z-20 w-56 space-y-3 pixel-bevel
          bg-surface/95 p-4 backdrop-blur-sm sm:top-16"
      >
        <Slider
          label="Ángulo δ"
          value={angle}
          display={`${angle}°`}
          min={ANGLE_MIN}
          max={ANGLE_MAX}
          step={1}
          onChange={setAngle}
        />
        <Slider
          label="Longitud de paso"
          value={len}
          display={`${len} px`}
          min={LEN_MIN}
          max={LEN_MAX}
          step={1}
          onChange={setLen}
        />
        <Slider
          label="Iteraciones n"
          value={iterations}
          display={String(iterations)}
          min={ITER_MIN}
          max={ITER_MAX}
          step={1}
          onChange={setIterations}
        />
        <div className="border-t border-white/10 pt-2 text-center font-mono text-[10px] text-slate-500">
          Segmentos: {segments.toLocaleString('es')}
        </div>
      </div>
    </div>
  )
}
