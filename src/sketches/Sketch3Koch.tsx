import { useEffect, useMemo, useRef, useState } from 'react'
import type p5 from 'p5'
import P5Canvas from '../components/P5Canvas'
import type { SketchFn } from '../components/P5Canvas'

/**
 * Sketch 3 — Copo de nieve de Koch (tortuga LOGO).
 *
 * D0L-System:
 *   Axioma ω = "F--F--F"
 *   Regla  F -> F+F--F+F
 *
 * Escalado automático: paso = ladoBase / 3^n, centrado geométricamente en el
 * lienzo midiendo el bounding box del trazo. Layout dividido: Mini-Editor de
 * código (IDE oscuro) + lienzo. Lado a lado en desktop, apilado en móvil.
 */

const AXIOM = 'F--F--F'
const RULE = 'F+F--F+F'

const BG = '#0F172A'
const CYAN = '#38BDF8'

const MIN_ITER = 0
const MAX_ITER = 5
const MIN_ANGLE = 15
const MAX_ANGLE = 120

function expand(iterations: number): string {
  let current = AXIOM
  for (let i = 0; i < iterations; i++) {
    let next = ''
    for (const ch of current) next += ch === 'F' ? RULE : ch
    current = next
  }
  return current
}

/** Cuenta los segmentos dibujables (símbolos F). */
function countSegments(path: string): number {
  let c = 0
  for (const ch of path) if (ch === 'F') c++
  return c
}

interface KochParams {
  iterations: number
  angle: number
  /** Token de ejecución: al cambiar, dispara la animación de entrada. */
  runToken: number
}

function makeSketch(paramsRef: { current: KochParams }): SketchFn {
  return (p: p5) => {
    let path = ''
    let cachedKey = ''
    // Puntos precalculados (en unidades de paso=1) y su bounding box.
    let pts: { x: number; y: number }[] = []
    let bbox = { minX: 0, maxX: 0, minY: 0, maxY: 0 }
    let anim = 1 // 0..1 progreso de entrada
    let lastRunToken = paramsRef.current.runToken

    const rebuild = () => {
      const { iterations, angle } = paramsRef.current
      path = expand(iterations)

      // Simula la tortuga con paso=1 para obtener geometría normalizada.
      pts = []
      let x = 0
      let y = 0
      let heading = 0 // grados
      pts.push({ x, y })
      for (const c of path) {
        if (c === 'F') {
          x += Math.cos((heading * Math.PI) / 180)
          y += Math.sin((heading * Math.PI) / 180)
          pts.push({ x, y })
        } else if (c === '+') {
          heading -= angle
        } else if (c === '-') {
          heading += angle
        }
      }
      bbox = {
        minX: Math.min(...pts.map((pt) => pt.x)),
        maxX: Math.max(...pts.map((pt) => pt.x)),
        minY: Math.min(...pts.map((pt) => pt.y)),
        maxY: Math.max(...pts.map((pt) => pt.y)),
      }
      cachedKey = `${iterations}:${angle}`
    }

    p.setup = () => {
      p.createCanvas(p.width || 800, p.height || 600)
      rebuild()
    }

    p.draw = () => {
      // ¿Cambió la ejecución (botón EJECUTAR)? Reinicia animación.
      if (paramsRef.current.runToken !== lastRunToken) {
        lastRunToken = paramsRef.current.runToken
        rebuild()
        anim = 0
      }
      // ¿Cambió iter/ángulo sin pulsar ejecutar? Reconstruye sin animar.
      const key = `${paramsRef.current.iterations}:${paramsRef.current.angle}`
      if (key !== cachedKey) rebuild()

      p.background(BG)

      if (pts.length < 2) return

      const w = bbox.maxX - bbox.minX || 1
      const h = bbox.maxY - bbox.minY || 1
      const margin = 0.82
      const scale = Math.min((p.width * margin) / w, (p.height * margin) / h)
      const cx = (bbox.minX + bbox.maxX) / 2
      const cy = (bbox.minY + bbox.maxY) / 2

      anim = Math.min(1, anim + 0.06)
      const eased = 1 - Math.pow(1 - anim, 3)
      const shown = Math.max(2, Math.floor(pts.length * eased))

      p.push()
      p.translate(p.width / 2, p.height / 2)
      p.scale(1, -1) // y hacia arriba
      p.stroke(CYAN)
      p.strokeWeight(Math.max(1, Math.min(2.2, scale * 0.04)))
      p.noFill()
      p.beginShape()
      for (let i = 0; i < shown; i++) {
        const pt = pts[i]
        p.vertex((pt.x - cx) * scale, (pt.y - cy) * scale)
      }
      p.endShape()
      p.pop()
    }
  }
}

/** Fila editable del mini-editor (botones -/+ e input directo). */
function EditorRow({
  prefix,
  value,
  onChange,
  min,
  max,
  step,
}: {
  prefix: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step: number
}) {
  const clamp = (v: number) => Math.max(min, Math.min(max, v))
  return (
    <div className="flex items-center gap-1.5 font-mono text-[11px] sm:text-sm">
      <span className="text-slate-500 whitespace-pre">{prefix}</span>
      <button
        type="button"
        onClick={() => onChange(clamp(value - step))}
        className="arcade-btn !px-2 !py-1 !text-[10px]"
        aria-label="disminuir"
      >
        −
      </button>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={(e) => {
          const v = parseInt(e.target.value, 10)
          if (!Number.isNaN(v)) onChange(clamp(v))
        }}
        className="w-14 bg-base text-center text-neon-cyan font-mono pixel-bevel
          py-1 outline-none focus:ring-1 focus:ring-neon-cyan"
      />
      <button
        type="button"
        onClick={() => onChange(clamp(value + step))}
        className="arcade-btn !px-2 !py-1 !text-[10px]"
        aria-label="aumentar"
      >
        +
      </button>
    </div>
  )
}

export default function Sketch3Koch() {
  const [iterations, setIterations] = useState(1)
  const [angle, setAngle] = useState(60)

  const paramsRef = useRef<KochParams>({ iterations: 1, angle: 60, runToken: 0 })

  // Reflejar estado en el ref vivo (sin remontar p5).
  paramsRef.current.iterations = iterations
  paramsRef.current.angle = angle

  const sketch = useMemo(() => makeSketch(paramsRef), [])

  const run = () => {
    paramsRef.current.runToken += 1
  }

  const segments = useMemo(() => countSegments(expand(iterations)), [iterations])

  // Tecla 'R' reinicia parámetros a Koch estándar.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'r' || e.key === 'R') {
        setIterations(1)
        setAngle(60)
        paramsRef.current.runToken += 1
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="flex h-full w-full flex-col lg:flex-row">
      {/* ── Mini-Editor de código (IDE oscuro) ── */}
      <aside
        data-no-swipe="true"
        className="order-2 flex shrink-0 flex-col gap-3 border-t border-white/10 bg-[#0b0e16]
          p-4 lg:order-1 lg:w-[360px] lg:border-r lg:border-t-0 lg:p-6"
      >
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
          <span className="ml-2 font-pixel text-[10px] tracking-widest text-slate-500">
            koch.js
          </span>
        </div>

        <pre className="font-mono text-[11px] leading-relaxed text-slate-400 sm:text-sm">
{`// Reglas del L-System
axioma = "F--F--F";
F  →  F+F--F+F`}
        </pre>

        <div className="space-y-2.5 pixel-bevel bg-base/60 p-3">
          <EditorRow
            prefix="let iteraciones ="
            value={iterations}
            onChange={setIterations}
            min={MIN_ITER}
            max={MAX_ITER}
            step={1}
          />
          <EditorRow
            prefix="let angulo ="
            value={angle}
            onChange={setAngle}
            min={MIN_ANGLE}
            max={MAX_ANGLE}
            step={5}
          />
        </div>

        {/* Presets rápidos */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setAngle(60)
              paramsRef.current.runToken += 1
            }}
            className="arcade-btn !text-[10px]"
          >
            60° KOCH
          </button>
          <button
            type="button"
            onClick={() => {
              setAngle(85)
              paramsRef.current.runToken += 1
            }}
            className="arcade-btn !text-[10px]"
          >
            85° MUTACIÓN
          </button>
        </div>

        <button
          type="button"
          onClick={run}
          className="mt-1 font-pixel text-xs uppercase tracking-widest px-4 py-3
            pixel-bevel-cyan bg-surface text-neon-cyan shadow-neon-cyan
            transition-transform active:translate-y-px"
        >
          ▶ EJECUTAR
        </button>
      </aside>

      {/* ── Lienzo ── */}
      <div className="order-1 relative min-h-0 flex-1 lg:order-2">
        <P5Canvas sketch={sketch} />
        {/* Indicador inferior */}
        <div
          data-no-swipe="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 p-3 text-center"
        >
          <span className="font-mono text-[11px] text-slate-400 sm:text-sm">
            Iteraciones: {iterations} | Ángulo: {angle}° | Segmentos: {segments}
          </span>
        </div>
      </div>
    </div>
  )
}
