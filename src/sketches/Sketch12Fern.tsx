import { useEffect, useMemo, useRef, useState } from 'react'
import type p5 from 'p5'
import P5Canvas from '../components/P5Canvas'
import type { SketchFn } from '../components/P5Canvas'
import PixelGlyph from '../components/PixelGlyph'
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

const FERN = '#15803D'
// Verde de las puntas: solo un matiz más claro que la base (no un color
// aparte), para dar profundidad sin que parezca "otra zona".
const FERN_LIGHT = '#22A54A'

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
      // Lienzo transparente: se ve el gradiente real del slide, sin un celeste
      // plano que no encaja. El helecho se acumula punto a punto encima.
      p.clear()
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
        // Borra a transparente (no a un color plano) al "volver a crecer".
        p.clear()
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
        // Puntas (parte alta) un matiz más claras para dar profundidad.
        p.fill(y > 8.2 ? FERN_LIGHT : FERN)
        p.circle(px, py, 1.6)
        drawn++
      }
    }
  }
}

/**
 * Iconos pixel-art (grilla 16×16) dibujados con <rect> de 1px sobre
 * `shapeRendering="crispEdges"`, en línea con las nubes y el HUD 16-bit del
 * resto de la presentación. Nada de curvas suaves ni bordes redondeados.
 */
const PX = 1 // tamaño de "pixel" en el viewBox 16×16

function PixelIcon({
  cells,
  title,
}: {
  cells: Array<[number, number, string]> // [x, y, color]
  title: string
}) {
  return (
    <svg viewBox="0 0 16 16" className="h-5 w-5 sm:h-6 sm:w-6" shapeRendering="crispEdges" role="img" aria-label={title}>
      {cells.map(([x, y, fill], i) => (
        <rect key={i} x={x} y={y} width={PX} height={PX} fill={fill} />
      ))}
    </svg>
  )
}

// Paleta pixel coherente con tailwind.config.js
const C = {
  ink: '#0F172A',
  lime: '#A3E635',
  limeDk: '#65A30D',
  cyan: '#0284C7',
  cyanDk: '#075985',
  amber: '#FACC15',
  amberDk: '#B45309',
  pink: '#DB2777',
  pinkDk: '#9D174D',
}

/** Brócoli romanesco: cono de floretes escalonados (pirámide bumpy verde). */
const BROCCOLI: Array<[number, number, string]> = [
  // Punta
  [7, 2, C.lime], [8, 2, C.lime],
  [7, 3, C.limeDk], [8, 3, C.lime],
  // Nivel 2
  [6, 4, C.lime], [7, 4, C.lime], [8, 4, C.lime], [9, 4, C.lime],
  [6, 5, C.limeDk], [7, 5, C.lime], [8, 5, C.lime], [9, 5, C.limeDk],
  // Nivel 3 (floretes salientes)
  [5, 6, C.lime], [6, 6, C.lime], [7, 6, C.lime], [8, 6, C.lime], [9, 6, C.lime], [10, 6, C.lime],
  [5, 7, C.lime], [6, 7, C.limeDk], [7, 7, C.lime], [8, 7, C.lime], [9, 7, C.limeDk], [10, 7, C.lime],
  // Nivel 4 (base ancha con protuberancias)
  [4, 8, C.lime], [5, 8, C.lime], [6, 8, C.lime], [7, 8, C.lime], [8, 8, C.lime], [9, 8, C.lime], [10, 8, C.lime], [11, 8, C.lime],
  [4, 9, C.limeDk], [5, 9, C.lime], [6, 9, C.lime], [9, 9, C.lime], [10, 9, C.lime], [11, 9, C.limeDk],
  // Tallo
  [7, 10, C.limeDk], [8, 10, C.limeDk],
  [7, 11, C.limeDk], [8, 11, C.limeDk],
]

/** Costas y ríos: línea de costa dentada que se ramifica (fractal de litoral). */
const COAST: Array<[number, number, string]> = [
  [2, 3, C.cyan], [3, 3, C.cyan],
  [3, 4, C.cyan], [4, 4, C.cyan],
  [4, 5, C.cyan], [5, 5, C.cyanDk],
  [5, 6, C.cyan], [6, 6, C.cyan], [8, 6, C.cyan], [9, 6, C.cyan],
  [6, 7, C.cyan], [7, 7, C.cyanDk], [9, 7, C.cyan],
  [7, 8, C.cyan], [8, 8, C.cyan], [9, 8, C.cyanDk], [10, 8, C.cyan],
  [8, 9, C.cyan], [10, 9, C.cyan], [11, 9, C.cyan],
  [8, 10, C.cyanDk], [11, 10, C.cyan], [12, 10, C.cyan],
  [8, 11, C.cyan], [12, 11, C.cyan], [13, 11, C.cyan],
]

/** Rayo / relámpago: zigzag ramificado pixelado. */
const BOLT: Array<[number, number, string]> = [
  [8, 1, C.amber], [9, 1, C.amber],
  [7, 2, C.amber], [8, 2, C.amberDk],
  [7, 3, C.amber], [8, 3, C.amber],
  [6, 4, C.amber], [7, 4, C.amberDk],
  [6, 5, C.amber], [7, 5, C.amber], [8, 5, C.amber], [9, 5, C.amber],
  [8, 6, C.amberDk], [9, 6, C.amber], [10, 6, C.amber],
  [8, 7, C.amber], [9, 7, C.amberDk],
  [7, 8, C.amber], [8, 8, C.amber],
  [6, 9, C.amber], [7, 9, C.amberDk],
  [6, 10, C.amber], [7, 10, C.amber],
  [5, 11, C.amber], [6, 11, C.amberDk],
  [5, 12, C.amber],
]

/** Vasos y pulmones: árbol bronquial que se bifurca (autosimilitud biológica). */
const LUNGS: Array<[number, number, string]> = [
  [7, 2, C.pink], [8, 2, C.pink],
  [7, 3, C.pinkDk], [8, 3, C.pink],
  [7, 4, C.pink], [8, 4, C.pink],
  [5, 5, C.pink], [7, 5, C.pink], [8, 5, C.pink], [10, 5, C.pink],
  [4, 6, C.pink], [6, 6, C.pink], [9, 6, C.pink], [11, 6, C.pink],
  [3, 7, C.pink], [4, 7, C.pinkDk], [11, 7, C.pinkDk], [12, 7, C.pink],
  [2, 8, C.pink], [5, 8, C.pink], [10, 8, C.pink], [13, 8, C.pink],
  [2, 9, C.pinkDk], [5, 9, C.pinkDk], [10, 9, C.pinkDk], [13, 9, C.pinkDk],
  [3, 10, C.pink], [6, 10, C.pink], [9, 10, C.pink], [12, 10, C.pink],
  [3, 11, C.pink], [12, 11, C.pink],
]

/** Ejemplo real de fractal: ícono pixel-art + etiqueta. */
function RealChip({ label, cells }: { label: string; cells: Array<[number, number, string]> }) {
  return (
    <div className="pixel-bevel-sm flex items-center gap-2 bg-white px-2 py-1.5 sm:px-2.5">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center">
        <PixelIcon cells={cells} title={label} />
      </span>
      <span className="font-display text-[10px] font-bold leading-tight text-[#0F172A] sm:text-xs">
        {label}
      </span>
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
        className="pointer-events-none absolute inset-x-0 top-14 z-10 flex justify-center px-4 sm:top-16"
      >
        <span className="pixel-bevel-sm max-w-[52vw] bg-white px-3 py-1.5 text-center font-mono text-[10px] font-bold text-[#0F172A] sm:max-w-[70vw] sm:text-sm">
          Helecho de Barnsley · cada hoja es una{' '}
          <span className="text-[#15803D]">copia del helecho entero</span>
        </span>
      </div>

      {/* Ejemplos reales de fractales. En móvil: fila compacta de iconos
          abajo del título; en ≥sm: columna a la derecha. Nunca pisa el HUD. */}
      <div
        data-no-swipe="true"
        className="pointer-events-none absolute right-2 top-[6.5rem] z-20 flex max-w-[44vw] flex-col gap-1.5
          sm:right-3 sm:top-24 sm:max-w-[13rem]"
      >
        <RealChip label="Brócoli romanesco" cells={BROCCOLI} />
        <RealChip label="Costas y ríos" cells={COAST} />
        <RealChip label="Rayos / relámpagos" cells={BOLT} />
        <RealChip label="Vasos y pulmones" cells={LUNGS} />
      </div>

      {/* Botón regenerar */}
      <div
        data-no-swipe="true"
        className="absolute bottom-14 left-1/2 z-20 flex max-w-[94vw] -translate-x-1/2 justify-center sm:bottom-6"
      >
        <button type="button" onClick={regrow} className="arcade-btn-lime inline-flex items-center gap-1.5">
          <PixelGlyph name="replay" />
          VOLVER A CRECER
        </button>
      </div>
    </div>
  )
}
