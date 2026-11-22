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

const BG = '#C7ECFF'
const STEM = '#14532D' // verde bosque profundo de alto contraste
const TIP = '#F472B6' // brote floral rosa arcade 16-bit

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
  return (p: p5, size: { width: number; height: number }) => {
    p.setup = () => {
      p.createCanvas(size?.width || window.innerWidth, size?.height || window.innerHeight)
    }

    p.draw = () => {
      p.background(BG)
      const { angle, len, path, iterations } = paramsRef.current
      if (!path) return

      const baseY = p.height - p.height * 0.08
      const groundH = p.height - baseY
      // Suelo 16-bit (pasto + tierra)
      p.noStroke()
      p.fill('#854D0E')
      p.rect(0, baseY, p.width, groundH)
      p.fill('#22C55E')
      p.rect(0, baseY, p.width, Math.max(8, groundH * 0.34))
      p.stroke('#0F172A')
      p.strokeWeight(2.5)
      p.line(0, baseY, p.width, baseY)

      // Escala la longitud a la altura del lienzo para que no se salga.
      const scaled = len * Math.pow(0.55, iterations - 1)
      // Normaliza respecto a una altura de referencia de 600 px.
      const effLen = scaled * (p.height / 600) * 6

      const stemWeight = Math.max(1.4, 3.8 - iterations * 0.35)

      p.push()
      p.translate(p.width / 2, baseY)
      p.strokeWeight(stemWeight)
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
            // Punta: brote floral con borde oscuro nítido.
            p.stroke('#0F172A')
            p.strokeWeight(1.1)
            p.fill(TIP)
            p.circle(0, 0, Math.max(3.5, effLen * 0.28))
            p.stroke(STEM)
            p.strokeWeight(stemWeight)
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
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="font-pixel text-[10px] font-bold uppercase tracking-wider text-[#0F172A]">
          {label}
        </span>
        <span className="pixel-bevel-sm bg-[#ECFCCB] px-1.5 py-0.5 font-mono text-xs font-bold text-[#15803D]">
          {display}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="plant-range w-full cursor-pointer appearance-none rounded"
      />
    </label>
  )
}

export default function Sketch4Plant() {
  const [angle, setAngle] = useState(35)
  const [len, setLen] = useState(16)
  const [iterations, setIterations] = useState(1)

  // La cadena se memoiza por iteraciones: solo se reexpande al cambiar n.
  const path = useMemo(() => expand(iterations), [iterations])

  const paramsRef = useRef<PlantParams>({
    angle: 35,
    len: 16,
    path,
    iterations: 1,
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

  // Preset rápido con tecla 'C' para mostrar el ciprés.
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

      {/* Panel de control 16-bit de día (ignora swipe) */}
      <div
        data-no-swipe="true"
        className="absolute right-3 top-14 z-20 flex w-60 flex-col gap-2 sm:top-16"
      >
        <div className="space-y-3 pixel-bevel bg-white p-4">
          <div className="flex items-center justify-between border-b-2 border-[#0F172A] pb-1.5">
            <span className="font-pixel text-[10px] font-bold text-[#0F172A]">
              ★ LAB CORCHETES [ ]
            </span>
            <span className="font-mono text-[10px] font-bold text-[#BE185D]">LIVE</span>
          </div>
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
          <div className="border-t-2 border-[#0F172A] pt-2 text-center font-mono text-xs font-bold text-[#0F172A]">
            Segmentos: {segments.toLocaleString('es')}
          </div>
        </div>
        <div className="pixel-bevel bg-white p-3">
          <div className="mb-1.5 text-center font-pixel text-[10px] font-bold uppercase text-[#0F172A]">
            Regla L-System
          </div>
          <code className="block text-center font-mono text-lg font-bold text-[#0369A1] sm:text-xl">
            {RULE}
          </code>
        </div>
      </div>
    </div>
  )
}
