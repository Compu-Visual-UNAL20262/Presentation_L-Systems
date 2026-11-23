import { useEffect, useMemo, useRef, useState } from 'react'
import type p5 from 'p5'
import P5Canvas from '../components/P5Canvas'
import type { SketchFn } from '../components/P5Canvas'
import { onSlideKey } from './keyboard'

/**
 * Sketch 7 — L-System paramétrico y la regla de Leonardo da Vinci.
 *
 * Nivel 4 de realismo: cada símbolo transporta parámetros numéricos. El más
 * famoso es el GROSOR de las ramas. Da Vinci observó que el área de un tronco
 * se conserva al ramificarse:
 *
 *   r_padre^e = r_hija1^e + r_hija2^e        (con e = 2 en la ley clásica)
 *
 * Al bifurcarse en 2 ramas iguales:  r_hija = r_padre · (1/2)^(1/e).
 *
 * El exponente `e` es editable en vivo:
 *   e = 2  → ley de área clásica (tronco realista).
 *   e < 2  → las ramas se adelgazan más rápido (aspecto frágil).
 *   e > 2  → las ramas conservan más grosor (aspecto grueso/suculento).
 *
 * El árbol se genera recursivamente (no por cadena, para centrar el foco en el
 * parámetro de grosor). Es responsivo: profundidad y escala dependen del lienzo.
 */

const BG = '#C7ECFF'
const INK = '#0F172A'

const DEPTH = 7
const BRANCH_ANGLE = 26 // grados de apertura de cada bifurcación

interface ParamState {
  exponent: number // e de da Vinci
  baseRadius: number // grosor del tronco en px
}

/** Interpola el color de corteza (marrón) a hoja (verde) según profundidad. */
function branchColor(p: p5, depth: number, maxDepth: number) {
  const t = depth / maxDepth
  const r = p.lerp(92, 107, t)
  const g = p.lerp(64, 142, t)
  const b = p.lerp(51, 35, t)
  return p.color(r, g, b)
}

function makeSketch(paramsRef: { current: ParamState }): SketchFn {
  return (p: p5, size: { width: number; height: number }) => {
    p.setup = () => {
      p.createCanvas(size?.width || window.innerWidth, size?.height || window.innerHeight)
    }

    /** Dibuja una rama y recursivamente sus dos hijas con grosor da Vinci. */
    const branch = (len: number, radius: number, depth: number) => {
      const col = branchColor(p, DEPTH - depth, DEPTH)
      p.stroke(col)
      p.strokeWeight(Math.max(1, radius))
      p.line(0, 0, 0, -len)
      p.translate(0, -len)

      if (depth <= 0) {
        // Hoja en la punta
        p.noStroke()
        p.fill('#22C55E')
        p.circle(0, 0, Math.max(4, radius * 2.4))
        return
      }

      // Regla de da Vinci: radio hija = radio padre * (1/2)^(1/e)
      const e = paramsRef.current.exponent
      const childRadius = radius * Math.pow(0.5, 1 / e)
      const childLen = len * 0.76

      p.push()
      p.rotate(p.radians(BRANCH_ANGLE))
      branch(childLen, childRadius, depth - 1)
      p.pop()

      p.push()
      p.rotate(p.radians(-BRANCH_ANGLE))
      branch(childLen, childRadius, depth - 1)
      p.pop()
    }

    p.draw = () => {
      p.background(BG)

      // Suelo 16-bit
      const baseY = p.height - p.height * 0.08
      const groundH = p.height - baseY
      p.noStroke()
      p.fill('#854D0E')
      p.rect(0, baseY, p.width, groundH)
      p.fill('#22C55E')
      p.rect(0, baseY, p.width, Math.max(8, groundH * 0.34))
      p.stroke(INK)
      p.strokeWeight(2.5)
      p.line(0, baseY, p.width, baseY)

      // Longitud del tronco escalada al alto del lienzo.
      const trunkLen = Math.min(p.height * 0.17, p.width * 0.12)
      const baseRadius = paramsRef.current.baseRadius * (p.height / 650)

      p.push()
      p.translate(p.width / 2, baseY)
      branch(trunkLen, baseRadius, DEPTH)
      p.pop()
    }
  }
}

/** Slider 16-bit (coherente con el del Sketch 4). */
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

export default function Sketch7Parametric() {
  const [exponent, setExponent] = useState(2)
  const [baseRadius, setBaseRadius] = useState(14)
  const [panelOpen, setPanelOpen] = useState(
    () => typeof window === 'undefined' || window.innerWidth >= 640,
  )

  const paramsRef = useRef<ParamState>({ exponent: 2, baseRadius: 14 })
  paramsRef.current.exponent = exponent
  paramsRef.current.baseRadius = baseRadius

  const sketch = useMemo(() => makeSketch(paramsRef), [])

  // Presets por teclado: '2' ley clásica; 'F' frágil; 'G' grueso.
  useEffect(
    () =>
      onSlideKey((e) => {
        if (e.key === '2') setExponent(2)
        if (e.key === 'f' || e.key === 'F') setExponent(1.4)
        if (e.key === 'g' || e.key === 'G') setExponent(3)
      }),
    [],
  )

  return (
    <div className="relative h-full w-full">
      <P5Canvas sketch={sketch} />

      {/* Fórmula de da Vinci (overlay nítido, responsivo) */}
      <div
        data-no-swipe="true"
        className="pointer-events-none absolute inset-x-0 top-14 z-20 flex justify-center px-4 sm:top-16"
      >
        <span className="pixel-bevel-sm bg-white px-3 py-1.5 text-center font-mono text-[11px] font-bold text-[#0F172A] sm:text-sm">
          Regla de da Vinci:{' '}
          <span className="text-[#7C3AED]">
            r<sub>padre</sub>
            <sup>{exponent}</sup> = r<sub>hija1</sub>
            <sup>{exponent}</sup> + r<sub>hija2</sub>
            <sup>{exponent}</sup>
          </span>
        </span>
      </div>

      {/* Botón colapsar panel (móvil) */}
      <button
        type="button"
        data-no-swipe="true"
        onClick={() => setPanelOpen((o) => !o)}
        className="arcade-btn absolute right-3 top-28 z-30 sm:hidden"
      >
        {panelOpen ? '✕ CONTROLES' : '⚙ CONTROLES'}
      </button>

      {/* Panel de control */}
      <div
        data-no-swipe="true"
        className={`absolute right-3 top-40 z-20 flex w-48 flex-col gap-2 sm:top-28 sm:w-64
          ${panelOpen ? 'flex' : 'hidden'} sm:!flex`}
      >
        <div className="space-y-3 pixel-bevel bg-white p-4">
          <div className="flex items-center justify-between border-b-2 border-[#0F172A] pb-1.5">
            <span className="font-pixel text-[10px] font-bold text-[#0F172A]">★ GROSOR PARAMÉTRICO</span>
            <span className="font-mono text-[10px] font-bold text-[#BE185D]">LIVE</span>
          </div>
          <Slider
            label="Exponente e"
            value={exponent}
            display={exponent.toFixed(2)}
            min={1.2}
            max={3}
            step={0.1}
            onChange={setExponent}
          />
          <Slider
            label="Grosor del tronco"
            value={baseRadius}
            display={`${baseRadius} px`}
            min={6}
            max={24}
            step={1}
            onChange={setBaseRadius}
          />
          <div className="flex gap-2 border-t-2 border-[#0F172A] pt-2">
            <button
              type="button"
              onClick={() => setExponent(1.4)}
              className="arcade-btn flex-1 !text-[9px]"
            >
              FRÁGIL
            </button>
            <button
              type="button"
              onClick={() => setExponent(2)}
              className="arcade-btn flex-1 !text-[9px]"
            >
              CLÁSICO e=2
            </button>
            <button
              type="button"
              onClick={() => setExponent(3)}
              className="arcade-btn flex-1 !text-[9px]"
            >
              GRUESO
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
