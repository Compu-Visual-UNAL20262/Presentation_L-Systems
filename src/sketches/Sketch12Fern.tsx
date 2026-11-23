import { useEffect, useMemo, useRef, useState } from 'react'
import type p5 from 'p5'
import P5Canvas from '../components/P5Canvas'
import type { SketchFn } from '../components/P5Canvas'
import { onSlideKey } from './keyboard'

/**
 * Sketch 12 — El helecho de Barnsley (fractal de la naturaleza).
 *
 * Un fractal clásico que aparece punto a punto con cuatro transformaciones
 * afines elegidas al azar con distinta probabilidad. Cada hoja del helecho es
 * una copia reducida del helecho entero: autosimilitud pura, igual que en los
 * L-Systems, pero mostrada aquí para conectar los fractales con formas reales
 * (helechos, brócoli romanesco, costas, rayos, pulmones).
 *
 * Se dibuja de forma incremental (miles de puntos por frame) para que la
 * audiencia vea cómo "emerge" el helecho de puro azar guiado por reglas.
 */

const BG = '#E6F7FF'
const FERN = '#15803D'
const FERN_LIGHT = '#4ADE80'

interface FernParams {
  runToken: number
}

function makeSketch(paramsRef: { current: FernParams }): SketchFn {
  return (p: p5, size: { width: number; height: number }) => {
    let x = 0
    let y = 0
    let drawn = 0
    let lastToken = paramsRef.current.runToken
    const TOTAL = 90000

    const reset = () => {
      x = 0
      y = 0
      drawn = 0
    }

    p.setup = () => {
      p.createCanvas(size?.width || window.innerWidth, size?.height || window.innerHeight)
      p.background(BG)
      reset()
    }

    const nextPoint = () => {
      const r = Math.random()
      let nx: number
      let ny: number
      if (r < 0.01) {
        nx = 0
        ny = 0.16 * y
      } else if (r < 0.86) {
        nx = 0.85 * x + 0.04 * y
        ny = -0.04 * x + 0.85 * y + 1.6
      } else if (r < 0.93) {
        nx = 0.2 * x - 0.26 * y
        ny = 0.23 * x + 0.22 * y + 1.6
      } else {
        nx = -0.15 * x + 0.28 * y
        ny = 0.26 * x + 0.24 * y + 0.44
      }
      x = nx
      y = ny
    }

    p.draw = () => {
      if (paramsRef.current.runToken !== lastToken) {
        lastToken = paramsRef.current.runToken
        p.background(BG)
        reset()
      }

      // El helecho vive en x∈[-2.2,2.7], y∈[0,10]. Escalamos al lienzo.
      const scaleY = (p.height * 0.86) / 10
      const scaleX = scaleY
      const originX = p.width / 2
      const originY = p.height - p.height * 0.06

      const perFrame = 1800
      p.noStroke()
      for (let i = 0; i < perFrame && drawn < TOTAL; i++) {
        nextPoint()
        const px = originX + x * scaleX
        const py = originY - y * scaleY
        // Puntas más claras que la base para dar profundidad.
        p.fill(y > 7 ? FERN_LIGHT : FERN)
        p.circle(px, py, 1.6)
        drawn++
      }
    }
  }
}

/** Ejemplo real de fractal: ícono SVG pixel + etiqueta. */
function RealChip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="pixel-bevel-sm flex items-center gap-2 bg-white px-2.5 py-1.5">
      <span className="flex h-7 w-7 items-center justify-center">{children}</span>
      <span className="font-display text-[11px] font-bold text-[#0F172A] sm:text-xs">{label}</span>
    </div>
  )
}

export default function Sketch12Fern() {
  const [, setTick] = useState(0)
  const paramsRef = useRef<FernParams>({ runToken: 0 })
  const sketch = useMemo(() => makeSketch(paramsRef), [])

  const regrow = () => {
    paramsRef.current.runToken += 1
    setTick((t) => t + 1)
  }

  useEffect(
    () =>
      onSlideKey((e) => {
        if (e.key === ' ' || e.key === 'r' || e.key === 'R') {
          e.preventDefault()
          regrow()
        }
      }),
    [],
  )

  return (
    <div className="relative h-full w-full">
      <P5Canvas sketch={sketch} />

      {/* Título */}
      <div
        data-no-swipe="true"
        className="pointer-events-none absolute inset-x-0 top-14 z-20 flex justify-center px-4 sm:top-16"
      >
        <span className="pixel-bevel-sm max-w-[94vw] bg-white px-3 py-1.5 text-center font-mono text-[11px] font-bold text-[#0F172A] sm:text-sm">
          Helecho de Barnsley · cada hoja es una{' '}
          <span className="text-[#15803D]">copia del helecho entero</span>
        </span>
      </div>

      {/* Ejemplos reales de fractales (columna derecha) */}
      <div
        data-no-swipe="true"
        className="pointer-events-none absolute right-3 top-28 z-20 flex w-40 flex-col gap-2 sm:top-20 sm:w-48"
      >
        <RealChip label="Brócoli romanesco">
          <svg viewBox="0 0 24 24" className="h-6 w-6">
            {[[12, 7, 5], [7, 13, 3.5], [17, 13, 3.5], [12, 16, 3]].map(([cx, cy, r], i) => (
              <circle key={i} cx={cx} cy={cy} r={r} fill="#A3E635" stroke="#0F172A" strokeWidth="1.2" />
            ))}
          </svg>
        </RealChip>
        <RealChip label="Costas y ríos">
          <svg viewBox="0 0 24 24" className="h-6 w-6">
            <path d="M3 6 q3 4 1 7 q-2 3 2 5 q3 2 1 0" fill="none" stroke="#0284C7" strokeWidth="1.6" />
          </svg>
        </RealChip>
        <RealChip label="Rayos / relámpagos">
          <svg viewBox="0 0 24 24" className="h-6 w-6">
            <path d="M13 2 L7 13 L11 13 L9 22 L18 9 L13 9 Z" fill="#FACC15" stroke="#0F172A" strokeWidth="1.2" />
          </svg>
        </RealChip>
        <RealChip label="Vasos y pulmones">
          <svg viewBox="0 0 24 24" className="h-6 w-6">
            <path d="M12 22 L12 10 M12 14 L7 9 M12 14 L17 9 M12 10 L8 5 M12 10 L16 5" fill="none" stroke="#DB2777" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </RealChip>
      </div>

      {/* Botón regenerar */}
      <div
        data-no-swipe="true"
        className="absolute bottom-16 left-1/2 z-20 -translate-x-1/2 sm:bottom-6"
      >
        <button type="button" onClick={regrow} className="arcade-btn-lime">
          ⟳ VOLVER A CRECER
        </button>
      </div>
    </div>
  )
}
