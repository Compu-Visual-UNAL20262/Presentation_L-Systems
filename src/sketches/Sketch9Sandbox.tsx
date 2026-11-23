import { useEffect, useMemo, useRef, useState } from 'react'
import type p5 from 'p5'
import P5Canvas from '../components/P5Canvas'
import type { SketchFn } from '../components/P5Canvas'
import { onSlideKey } from './keyboard'

/**
 * Sketch 9 — Laboratorio abierto de L-Systems (sandbox).
 *
 * El espectador escribe su PROPIO axioma y su regla F→… , ajusta ángulo e
 * iteraciones, y ve el resultado al instante. Es el momento participativo:
 * reúne todo lo aprendido (alfabeto, axioma, regla, tortuga, corchetes) en una
 * sola herramienta donde "reglas simples → formas infinitas" se vuelve tangible.
 *
 * Alfabeto soportado por la tortuga:
 *   F  avanza dibujando    + gira +δ    - gira -δ    [ push    ] pop
 * Cualquier otra letra (p. ej. X) es una variable: puede reescribirse con su
 * propia regla y, al dibujar, no hace nada (permite separar crecimiento de
 * trazo, como en la reescritura de nodos).
 */

const BG = '#C7ECFF'
const INK = '#0F172A'
const STEM = '#15803D'
const TIP = '#F472B6'

const MAX_SEGMENTS = 200000 // tope de seguridad para no congelar el navegador

interface Preset {
  name: string
  axiom: string
  rule: string // regla para F (y opcionalmente X vía ruleX)
  ruleX?: string
  angle: number
  iterations: number
}

const PRESETS: Preset[] = [
  { name: 'Arbusto', axiom: 'X', rule: 'FF', ruleX: 'F[+X]F[-X]+X', angle: 20, iterations: 5 },
  { name: 'Helecho', axiom: 'X', rule: 'FF', ruleX: 'F[-X][+X]FX', angle: 25, iterations: 5 },
  { name: 'Matorral', axiom: 'F', rule: 'F[+F]F[-F]F', angle: 25, iterations: 4 },
  { name: 'Ramo', axiom: 'F', rule: 'F[+F]F[-F][F]', angle: 22, iterations: 4 },
]

interface Pt {
  x: number
  y: number
}

interface SandboxParams {
  axiom: string
  rule: string
  ruleX: string
  angle: number
  iterations: number
  runToken: number
  onInfo: (segments: number, capped: boolean) => void
}

/** Expande la cadena aplicando F→rule y X→ruleX; corta si explota. */
function expand(params: SandboxParams): { path: string; capped: boolean } {
  let current = params.axiom || 'F'
  let capped = false
  for (let i = 0; i < params.iterations; i++) {
    let next = ''
    for (const ch of current) {
      if (ch === 'F') next += params.rule
      else if (ch === 'X') next += params.ruleX
      else next += ch
      if (next.length > MAX_SEGMENTS * 3) {
        capped = true
        break
      }
    }
    current = next
    if (capped) break
  }
  return { path: current, capped }
}

function makeSketch(paramsRef: { current: SandboxParams }): SketchFn {
  return (p: p5, size: { width: number; height: number }) => {
    let pts: Pt[] = []
    let tips: Pt[] = []
    let bbox = { minX: 0, maxX: 0, minY: 0, maxY: 0 }
    let cacheKey = ''
    let lastToken = -1

    const rebuild = () => {
      const prm = paramsRef.current
      const { path, capped } = expand(prm)

      // Interpreta la tortuga con pila para ramificar.
      pts = []
      tips = []
      let x = 0
      let y = 0
      let heading = -90 // apunta hacia arriba
      const stack: { x: number; y: number; heading: number }[] = []
      let segs = 0
      // Guardamos segmentos como pares para poder dibujar ramas discontinuas.
      const segList: [Pt, Pt][] = []
      for (const c of path) {
        if (c === 'F') {
          const nx = x + Math.cos((heading * Math.PI) / 180)
          const ny = y + Math.sin((heading * Math.PI) / 180)
          segList.push([{ x, y }, { x: nx, y: ny }])
          x = nx
          y = ny
          segs++
          if (segs > MAX_SEGMENTS) break
        } else if (c === '+') heading += prm.angle
        else if (c === '-') heading -= prm.angle
        else if (c === '[') stack.push({ x, y, heading })
        else if (c === ']') {
          tips.push({ x, y })
          const s = stack.pop()
          if (s) {
            x = s.x
            y = s.y
            heading = s.heading
          }
        }
      }

      // Bounding box de todos los puntos de segmento.
      const all: Pt[] = segList.flat()
      if (all.length === 0) all.push({ x: 0, y: 0 })
      bbox = {
        minX: Math.min(...all.map((q) => q.x)),
        maxX: Math.max(...all.map((q) => q.x)),
        minY: Math.min(...all.map((q) => q.y)),
        maxY: Math.max(...all.map((q) => q.y)),
      }
      // Guardamos la lista de segmentos aplanada en pts como pares consecutivos.
      pts = []
      for (const [a, b] of segList) {
        pts.push(a, b)
      }
      cacheKey = `${prm.axiom}|${prm.rule}|${prm.ruleX}|${prm.angle}|${prm.iterations}`
      prm.onInfo(Math.min(segs, MAX_SEGMENTS), capped || segs > MAX_SEGMENTS)
    }

    p.setup = () => {
      p.createCanvas(size?.width || window.innerWidth, size?.height || window.innerHeight)
      rebuild()
    }

    p.draw = () => {
      const prm = paramsRef.current
      const key = `${prm.axiom}|${prm.rule}|${prm.ruleX}|${prm.angle}|${prm.iterations}`
      if (key !== cacheKey || prm.runToken !== lastToken) {
        lastToken = prm.runToken
        rebuild()
      }

      p.background(BG)

      // Suelo 16-bit
      const groundY = p.height - p.height * 0.08
      const groundH = p.height - groundY
      p.noStroke()
      p.fill('#854D0E')
      p.rect(0, groundY, p.width, groundH)
      p.fill('#22C55E')
      p.rect(0, groundY, p.width, Math.max(8, groundH * 0.34))
      p.stroke(INK)
      p.strokeWeight(2.5)
      p.line(0, groundY, p.width, groundY)

      if (pts.length < 2) return

      const w = bbox.maxX - bbox.minX || 1
      const h = bbox.maxY - bbox.minY || 1
      // Deja espacio para el panel de controles (izquierda) y márgenes.
      const availW = p.width * 0.52
      const availH = groundY - p.height * 0.14
      const scale = Math.min(availW / w, availH / h)
      const cx = (bbox.minX + bbox.maxX) / 2
      // Ancla la base del dibujo al suelo.
      const originX = p.width * 0.62
      const originY = groundY - 6

      p.push()
      p.translate(originX, originY)
      p.stroke(STEM)
      p.strokeWeight(Math.max(1, Math.min(3, scale * 0.6)))
      for (let i = 0; i < pts.length; i += 2) {
        const a = pts[i]
        const b = pts[i + 1]
        if (!b) break
        p.line(
          (a.x - cx) * scale,
          (a.y - bbox.maxY) * scale,
          (b.x - cx) * scale,
          (b.y - bbox.maxY) * scale,
        )
      }
      // Brotes en las puntas (cierres de rama).
      p.noStroke()
      p.fill(TIP)
      const budSize = Math.max(3, Math.min(7, scale * 0.9))
      for (const t of tips) {
        p.circle((t.x - cx) * scale, (t.y - bbox.maxY) * scale, budSize)
      }
      p.pop()
    }
  }
}

/** Fila de control numérico +/- (coherente con el mini-editor de Koch). */
function NumRow({
  label,
  value,
  onChange,
  min,
  max,
  step,
  suffix = '',
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step: number
  suffix?: string
}) {
  const clamp = (v: number) => Math.max(min, Math.min(max, v))
  return (
    <div className="flex items-center justify-between gap-1.5 font-mono text-[11px] sm:text-xs">
      <span className="font-bold text-[#0F172A]">{label}</span>
      <div className="flex items-center gap-1.5">
        <button type="button" onClick={() => onChange(clamp(value - step))} className="arcade-btn !px-2 !py-0.5 !text-[10px]" aria-label="menos">
          −
        </button>
        <span className="w-12 bg-white text-center font-bold text-[#0369A1] pixel-bevel-sm py-0.5">
          {value}
          {suffix}
        </span>
        <button type="button" onClick={() => onChange(clamp(value + step))} className="arcade-btn !px-2 !py-0.5 !text-[10px]" aria-label="más">
          +
        </button>
      </div>
    </div>
  )
}

export default function Sketch9Sandbox() {
  const [axiom, setAxiom] = useState('X')
  const [rule, setRule] = useState('FF')
  const [ruleX, setRuleX] = useState('F[+X]F[-X]+X')
  const [angle, setAngle] = useState(20)
  const [iterations, setIterations] = useState(5)
  const [info, setInfo] = useState({ segments: 0, capped: false })
  const [panelOpen, setPanelOpen] = useState(
    () => typeof window === 'undefined' || window.innerWidth >= 640,
  )

  const paramsRef = useRef<SandboxParams>({
    axiom, rule, ruleX, angle, iterations, runToken: 0,
    onInfo: (segments, capped) => setInfo({ segments, capped }),
  })
  paramsRef.current.axiom = axiom
  paramsRef.current.rule = rule
  paramsRef.current.ruleX = ruleX
  paramsRef.current.angle = angle
  paramsRef.current.iterations = iterations
  paramsRef.current.onInfo = (segments, capped) => setInfo({ segments, capped })

  const sketch = useMemo(() => makeSketch(paramsRef), [])

  const applyPreset = (pr: Preset) => {
    setAxiom(pr.axiom)
    setRule(pr.rule)
    setRuleX(pr.ruleX ?? 'X')
    setAngle(pr.angle)
    setIterations(pr.iterations)
    paramsRef.current.runToken += 1
  }

  useEffect(
    () =>
      onSlideKey((e) => {
        if (e.key === 'r' || e.key === 'R') applyPreset(PRESETS[0])
      }),
    [],
  )

  return (
    <div className="relative h-full w-full">
      <P5Canvas sketch={sketch} />

      {/* Botón colapsar panel (móvil) */}
      <button
        type="button"
        data-no-swipe="true"
        onClick={() => setPanelOpen((o) => !o)}
        className="arcade-btn absolute left-3 top-14 z-30 sm:hidden"
      >
        {panelOpen ? '✕ EDITOR' : '✎ EDITOR'}
      </button>

      {/* Panel editor (izquierda) */}
      <div
        data-no-swipe="true"
        className={`absolute left-3 top-28 z-20 w-[16.5rem] max-w-[86vw] flex-col gap-2 sm:top-16 sm:flex
          ${panelOpen ? 'flex' : 'hidden'}`}
      >
        <div className="space-y-2.5 pixel-bevel bg-white p-3">
          <div className="flex items-center justify-between border-b-2 border-[#0F172A] pb-1.5">
            <span className="font-pixel text-[10px] font-bold text-[#0F172A]">★ TU L-SYSTEM</span>
            <span className="font-mono text-[9px] font-bold text-[#BE185D]">EN VIVO</span>
          </div>

          {/* Campos de texto editables */}
          <label className="block">
            <span className="font-mono text-[10px] font-bold text-[#334155]">Axioma</span>
            <input
              value={axiom}
              onChange={(e) => setAxiom(e.target.value.toUpperCase())}
              className="mt-0.5 w-full bg-[#F0F9FF] pixel-bevel-sm px-2 py-1 font-mono text-xs font-bold text-[#0369A1] outline-none focus:bg-[#FEF9C3]"
            />
          </label>
          <label className="block">
            <span className="font-mono text-[10px] font-bold text-[#334155]">Regla F →</span>
            <input
              value={rule}
              onChange={(e) => setRule(e.target.value.toUpperCase())}
              className="mt-0.5 w-full bg-[#F0F9FF] pixel-bevel-sm px-2 py-1 font-mono text-xs font-bold text-[#0369A1] outline-none focus:bg-[#FEF9C3]"
            />
          </label>
          <label className="block">
            <span className="font-mono text-[10px] font-bold text-[#334155]">Regla X →</span>
            <input
              value={ruleX}
              onChange={(e) => setRuleX(e.target.value.toUpperCase())}
              className="mt-0.5 w-full bg-[#F0F9FF] pixel-bevel-sm px-2 py-1 font-mono text-xs font-bold text-[#0369A1] outline-none focus:bg-[#FEF9C3]"
            />
          </label>

          <div className="space-y-1.5 border-t-2 border-[#0F172A] pt-2">
            <NumRow label="Ángulo δ" value={angle} onChange={setAngle} min={1} max={90} step={1} suffix="°" />
            <NumRow label="Iteraciones" value={iterations} onChange={setIterations} min={0} max={7} step={1} />
          </div>

          <div className="border-t-2 border-[#0F172A] pt-2 text-center font-mono text-[10px] font-bold text-[#0F172A]">
            Segmentos: {info.segments.toLocaleString('es')}
            {info.capped && <span className="ml-1 text-[#DC2626]">· tope</span>}
          </div>
        </div>

        {/* Presets para arrancar rápido */}
        <div className="pixel-bevel bg-white p-2.5">
          <div className="mb-1.5 font-pixel text-[9px] font-bold uppercase tracking-wider text-[#0F172A]">
            Plantillas
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {PRESETS.map((pr) => (
              <button
                key={pr.name}
                type="button"
                onClick={() => applyPreset(pr)}
                className="arcade-btn !px-1.5 !py-1 !text-[9px]"
              >
                {pr.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
