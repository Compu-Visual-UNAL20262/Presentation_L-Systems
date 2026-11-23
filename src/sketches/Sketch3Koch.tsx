import { useEffect, useMemo, useRef, useState } from 'react'
import type p5 from 'p5'
import P5Canvas from '../components/P5Canvas'
import type { SketchFn } from '../components/P5Canvas'
import { onSlideKey } from './keyboard'

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

/**
 * Presets de curvas fractales que comparten el mismo motor de tortuga.
 * Cada preset define su axioma, sus reglas y el ángulo canónico. El motor
 * trata como "avance con trazo" cualquier símbolo dibujable (F o G o A o B).
 *
 * Dimensión fractal D (autosimilitud): D = ln(N) / ln(1/r), con N = nº de
 * copias y r = factor de escala de cada copia.
 *   Koch:       N = 4, r = 1/3  → D = ln4/ln3 ≈ 1.262
 *   Sierpinski: N = 3, r = 1/2  → D = ln3/ln2 ≈ 1.585
 *   Dragón:     curva que llena el plano → D = 2 (teórico)
 */
interface CurvePreset {
  id: string
  label: string
  axiom: string
  /** Reglas por símbolo; los símbolos sin regla son constantes. */
  rules: Record<string, string>
  /** Símbolos que dibujan un segmento al interpretarse. */
  drawSymbols: string[]
  angle: number
  name: string
  /** Dimensión fractal teórica, ya calculada, para el indicador. */
  dimension: number
  /** Rango razonable de iteraciones para que no se dispare el conteo. */
  maxIter: number
}

const PRESETS: Record<string, CurvePreset> = {
  koch: {
    id: 'koch',
    label: '60° KOCH',
    axiom: AXIOM,
    rules: { F: RULE },
    drawSymbols: ['F'],
    angle: 60,
    name: 'Koch',
    dimension: Math.log(4) / Math.log(3), // ≈ 1.262
    maxIter: 5,
  },
  sierpinski: {
    id: 'sierpinski',
    label: 'SIERPINSKI',
    // Flecha de Sierpinski: A y B son ambos segmentos dibujables.
    axiom: 'A',
    rules: { A: 'B-A-B', B: 'A+B+A' },
    drawSymbols: ['A', 'B'],
    angle: 60,
    name: 'Sierpinski',
    dimension: Math.log(3) / Math.log(2), // ≈ 1.585
    maxIter: 7,
  },
  dragon: {
    id: 'dragon',
    label: 'DRAGÓN',
    axiom: 'F',
    rules: { F: 'F+G', G: 'F-G' },
    drawSymbols: ['F', 'G'],
    angle: 90,
    name: 'Dragón',
    dimension: 2, // llena el plano
    maxIter: 12,
  },
}

const BG = '#E6F7FF'
const GRID_COLOR = '#BAE6FD'
const STROKE_MAIN = '#0F172A'
const FILL_ICE = 'rgba(56, 189, 248, 0.28)'

const MIN_ITER = 0
const MIN_ANGLE = 15
const MAX_ANGLE = 120

function expand(preset: CurvePreset, iterations: number): string {
  let current = preset.axiom
  for (let i = 0; i < iterations; i++) {
    let next = ''
    for (const ch of current) next += preset.rules[ch] ?? ch
    current = next
  }
  return current
}

/** Cuenta los segmentos dibujables según los símbolos de trazo del preset. */
function countSegments(preset: CurvePreset, path: string): number {
  const draw = new Set(preset.drawSymbols)
  let c = 0
  for (const ch of path) if (draw.has(ch)) c++
  return c
}

interface KochParams {
  preset: CurvePreset
  iterations: number
  angle: number
  /** Token de ejecución: al cambiar, dispara la animación de entrada. */
  runToken: number
}

function makeSketch(paramsRef: { current: KochParams }): SketchFn {
  return (p: p5, size: { width: number; height: number }) => {
    let path = ''
    let cachedKey = ''
    // Puntos precalculados (en unidades de paso=1) y su bounding box.
    let pts: { x: number; y: number }[] = []
    let bbox = { minX: 0, maxX: 0, minY: 0, maxY: 0 }
    let anim = 1 // 0..1 progreso de entrada
    let lastRunToken = paramsRef.current.runToken

    const rebuild = () => {
      const { preset, iterations, angle } = paramsRef.current
      path = expand(preset, iterations)
      const draw = new Set(preset.drawSymbols)

      // Simula la tortuga con paso=1 para obtener geometría normalizada.
      pts = []
      let x = 0
      let y = 0
      let heading = 0 // grados
      pts.push({ x, y })
      for (const c of path) {
        if (draw.has(c)) {
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
      cachedKey = `${preset.id}:${iterations}:${angle}`
    }

    p.setup = () => {
      p.createCanvas(size?.width || window.innerWidth, size?.height || window.innerHeight)
      rebuild()
    }

    p.draw = () => {
      // ¿Cambió la ejecución (botón EJECUTAR)? Reinicia animación.
      if (paramsRef.current.runToken !== lastRunToken) {
        lastRunToken = paramsRef.current.runToken
        rebuild()
        anim = 0
      }
      // ¿Cambió iter/ángulo/preset sin pulsar ejecutar? Reconstruye sin animar.
      const key = `${paramsRef.current.preset.id}:${paramsRef.current.iterations}:${paramsRef.current.angle}`
      if (key !== cachedKey) rebuild()

      p.background(BG)

      // Cuadrícula técnica 16-bit sobre fondo claro
      p.stroke(GRID_COLOR)
      p.strokeWeight(1)
      const step = 36
      for (let gx = 0; gx < p.width; gx += step) {
        p.line(gx, 0, gx, p.height)
      }
      for (let gy = 0; gy < p.height; gy += step) {
        p.line(0, gy, p.width, gy)
      }

      if (pts.length < 2) return

      const w = bbox.maxX - bbox.minX || 1
      const h = bbox.maxY - bbox.minY || 1
      const margin = 0.78
      const scale = Math.min((p.width * margin) / w, (p.height * margin) / h)
      const cx = (bbox.minX + bbox.maxX) / 2
      const cy = (bbox.minY + bbox.maxY) / 2

      // Velocidad de trazado reducida (~3.3 s a 60 FPS) para que se aprecie la tortuga
      anim = Math.min(1, anim + 0.005)
      const shown = Math.max(2, Math.floor(pts.length * anim))

      p.push()
      p.translate(p.width / 2, p.height / 2)
      p.scale(1, -1) // y hacia arriba

      // Relleno cristalino suave cuando la figura está completa
      if (shown >= pts.length) {
        p.fill(FILL_ICE)
      } else {
        p.noFill()
      }

      p.stroke(STROKE_MAIN)
      p.strokeWeight(Math.max(1.8, Math.min(3.2, scale * 0.045)))
      p.beginShape()
      for (let i = 0; i < shown; i++) {
        const pt = pts[i]
        p.vertex((pt.x - cx) * scale, (pt.y - cy) * scale)
      }
      p.endShape()

      // Tortuga LOGO pixelada en el vértice activo
      const tip = pts[shown - 1]
      if (tip) {
        const tx = (tip.x - cx) * scale
        const ty = (tip.y - cy) * scale
        p.stroke('#0F172A')
        p.strokeWeight(2)
        p.fill('#22C55E')
        p.circle(tx, ty, 11)
        p.fill('#FACC15')
        p.circle(tx, ty, 5)
      }
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
    <div className="flex items-center justify-between gap-1.5 font-mono text-[11px] sm:text-sm">
      <span className="font-bold text-[#0F172A] whitespace-pre">{prefix}</span>
      <div className="flex items-center gap-1.5">
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
          className="w-14 bg-white text-center font-bold text-[#0369A1] font-mono pixel-bevel-sm
            py-1 outline-none focus:bg-[#FEF9C3]"
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
    </div>
  )
}

export default function Sketch3Koch() {
  const [presetId, setPresetId] = useState<string>('koch')
  const [iterations, setIterations] = useState(1)
  const [angle, setAngle] = useState(60)

  const preset = PRESETS[presetId]

  const paramsRef = useRef<KochParams>({
    preset: PRESETS.koch,
    iterations: 1,
    angle: 60,
    runToken: 0,
  })

  // Reflejar estado en el ref vivo (sin remontar p5).
  paramsRef.current.preset = preset
  paramsRef.current.iterations = iterations
  paramsRef.current.angle = angle

  const sketch = useMemo(() => makeSketch(paramsRef), [])

  const run = () => {
    paramsRef.current.runToken += 1
  }

  /** Carga un preset: fija su axioma, ángulo canónico y una iteración suave. */
  const loadPreset = (id: string) => {
    const pr = PRESETS[id]
    setPresetId(id)
    setAngle(pr.angle)
    setIterations((prev) => Math.min(prev, pr.maxIter))
    paramsRef.current.runToken += 1
  }

  const segments = useMemo(
    () => countSegments(preset, expand(preset, iterations)),
    [preset, iterations],
  )

  // Tecla 'R' reinicia parámetros a Koch estándar. El guard de onSlideKey
  // evita que se dispare mientras se escribe en los inputs del mini-editor.
  useEffect(() => onSlideKey((e) => {
    if (e.key === 'r' || e.key === 'R') {
      setPresetId('koch')
      setIterations(1)
      setAngle(60)
      paramsRef.current.runToken += 1
    }
  }), [])

  return (
    <div className="flex h-full w-full flex-col lg:flex-row">
      {/* ── Mini-Editor de código 16-bit de día ── */}
      <aside
        data-no-swipe="true"
        className="order-2 flex max-h-[42vh] shrink-0 flex-col gap-3 overflow-y-auto border-t-[3px]
          border-[#0F172A] bg-white p-3 lg:order-1 lg:max-h-none lg:w-[370px] lg:overflow-visible
          lg:border-r-[3px] lg:border-t-0 lg:p-6 lg:pt-16"
      >
        <div className="flex items-center justify-between pixel-bevel-sm bg-[#F472B6] px-3 py-1.5">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 border-2 border-[#0F172A] bg-[#FACC15]" />
            <span className="h-3 w-3 border-2 border-[#0F172A] bg-[#A3E635]" />
            <span className="ml-1 font-pixel text-[10px] font-bold tracking-widest text-[#0F172A]">
              KOCH_TURTLE.JS
            </span>
          </div>
          <span className="font-pixel text-[9px] font-bold text-[#0F172A]">LOGO 16-BIT</span>
        </div>

        <pre className="pixel-bevel-sm bg-[#FFFBEB] p-3 font-mono text-[11px] font-bold leading-relaxed text-[#0F172A] sm:text-xs">
{`// ${preset.name} · L-System
axioma = "${preset.axiom}";
${Object.entries(preset.rules)
  .map(([k, v]) => `${k}  →  ${v}`)
  .join('\n')}`}
        </pre>

        {/* Selector de curva fractal: el mismo motor de tortuga, 3 familias */}
        <div className="pixel-bevel-sm bg-[#FEF3F8] p-2.5">
          <div className="mb-1.5 font-pixel text-[9px] font-bold uppercase tracking-wider text-[#0F172A]">
            ★ Familia fractal
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {Object.values(PRESETS).map((pr) => (
              <button
                key={pr.id}
                type="button"
                onClick={() => loadPreset(pr.id)}
                aria-pressed={pr.id === presetId}
                className={`pixel-bevel-sm px-1.5 py-1.5 font-pixel text-[9px] font-bold uppercase tracking-wider transition-colors
                  ${
                    pr.id === presetId
                      ? 'bg-[#A3E635] text-[#0F172A]'
                      : 'bg-white text-[#0F172A] hover:bg-[#FACC15]'
                  }`}
              >
                {pr.name}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2.5 pixel-bevel-sm bg-[#F0F9FF] p-3">
          <EditorRow
            prefix="let iteraciones ="
            value={iterations}
            onChange={(v) => setIterations(Math.min(v, preset.maxIter))}
            min={MIN_ITER}
            max={preset.maxIter}
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

        {/* Mutación angular: solo tiene sentido sobre el copo de Koch */}
        {presetId === 'koch' && (
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
        )}

        <button
          type="button"
          onClick={run}
          className="arcade-btn-lime mt-1 w-full text-center"
        >
          ▶ REPETIR TRAZO ANIMADO
        </button>
        <span className="text-center font-mono text-[9px] font-semibold text-[#475569]">
          ⚡ Parámetros en tiempo real · Pulsa para ver el recorrido
        </span>
      </aside>

      {/* ── Lienzo ── */}
      <div className="order-1 relative min-h-0 flex-1 lg:order-2">
        <P5Canvas sketch={sketch} />
        {/* Indicador inferior */}
        <div
          data-no-swipe="true"
          className="pointer-events-none absolute inset-x-0 bottom-16 sm:bottom-4 flex justify-center p-2"
        >
          <span className="pixel-bevel-sm bg-white px-3 py-1 font-mono text-[11px] font-bold text-[#0F172A] sm:text-sm">
            Iteraciones: {iterations} | Ángulo: {angle}° | Segmentos: {segments.toLocaleString('es')} |{' '}
            <span className="text-[#7C3AED]">
              Dimensión D ≈ {preset.dimension.toFixed(3)}
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}
