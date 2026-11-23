import { useEffect, useMemo, useRef, useState } from 'react'
import type p5 from 'p5'
import P5Canvas from '../components/P5Canvas'
import type { SketchFn } from '../components/P5Canvas'
import { onSlideKey } from './keyboard'

/**
 * Sketch 7 — L-System paramétrico y la regla de Leonardo da Vinci.
 *
 * Nivel 4 de la taxonomía: cada símbolo transporta parámetros numéricos. Aquí
 * el parámetro es el GROSOR de la rama y el sistema es un L-System paramétrico
 * real, con axioma y una regla de reescritura que se muestran en pantalla:
 *
 *   Axioma:  A(w)                      (w = grosor inicial del tronco)
 *   Regla:   A(w) → F(w) [ +A(w·q) ] [ -A(w·q) ]
 *            con q = (1/2)^(1/e)       (factor de adelgazamiento da Vinci)
 *
 * F(w) dibuja un segmento de grosor w; A(w) es una yema que se bifurca en dos
 * ramas hijas, cada una con grosor w·q. El factor q sale de imponer la ley de
 * da Vinci sobre el ÁREA de sección al ramificarse:
 *
 *   w_padre^e = w_hija1^e + w_hija2^e          (e = 2 en la ley clásica de áreas)
 *
 * Para dos hijas iguales:  w_hija = w_padre · (1/2)^(1/e).
 *   e = 2  → ley de área clásica (tronco realista).
 *   e < 2  → las ramas se adelgazan más rápido (aspecto frágil).
 *   e > 2  → las ramas conservan más grosor (aspecto grueso/suculento).
 *
 * Implementación: se expande la cadena del L-System paramétrico (lista de
 * instrucciones con su parámetro) y luego se interpreta con la tortuga, igual
 * que en los demás sketches (axioma → reglas → cadena → geometría). Responsivo.
 */

const BG = '#C7ECFF'
const INK = '#0F172A'

/** Nº de iteraciones de reescritura (profundidad del árbol paramétrico). */
const ITER = 7
const BRANCH_ANGLE = 26 // grados de apertura de cada bifurcación

/** Un módulo de la cadena paramétrica: símbolo + parámetro de grosor w. */
interface Module {
  sym: 'F' | 'A' | '+' | '-' | '[' | ']'
  w: number
}

interface ParamState {
  exponent: number // e de da Vinci
  baseRadius: number // grosor del tronco en px (w inicial del axioma)
}

/**
 * Expande el L-System paramétrico ITER veces.
 *   Axioma: A(w0)
 *   Regla:  A(w) → F(w) [ +A(w·q) ] [ -A(w·q) ]
 * donde q = (1/2)^(1/e). Solo 'A' se reescribe; el resto son constantes.
 */
function expandParametric(w0: number, e: number): Module[] {
  const q = Math.pow(0.5, 1 / e)
  let chain: Module[] = [{ sym: 'A', w: w0 }]
  for (let i = 0; i < ITER; i++) {
    const next: Module[] = []
    for (const m of chain) {
      if (m.sym === 'A') {
        const wc = m.w * q
        next.push({ sym: 'F', w: m.w })
        next.push({ sym: '[', w: wc })
        next.push({ sym: '+', w: wc })
        next.push({ sym: 'A', w: wc })
        next.push({ sym: ']', w: wc })
        next.push({ sym: '[', w: wc })
        next.push({ sym: '-', w: wc })
        next.push({ sym: 'A', w: wc })
        next.push({ sym: ']', w: wc })
      } else {
        next.push(m)
      }
    }
    chain = next
  }
  return chain
}

/** Interpola el color de corteza (marrón) a hoja (verde) según el grosor. */
function branchColor(p: p5, w: number, w0: number) {
  const t = 1 - Math.min(1, w / w0) // ramas finas → más verde
  const r = p.lerp(92, 107, t)
  const g = p.lerp(64, 142, t)
  const b = p.lerp(51, 35, t)
  return p.color(r, g, b)
}

function makeSketch(paramsRef: { current: ParamState }): SketchFn {
  return (p: p5, size: { width: number; height: number }) => {
    // Cache de la cadena expandida: solo se recalcula si cambia e o el grosor.
    let cache: Module[] = []
    let cacheKey = ''

    p.setup = () => {
      p.createCanvas(size?.width || window.innerWidth, size?.height || window.innerHeight)
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

      const { exponent, baseRadius } = paramsRef.current
      const w0 = baseRadius * (p.height / 650)

      // Reexpandir la cadena solo cuando cambian los parámetros.
      const key = `${exponent.toFixed(3)}:${w0.toFixed(2)}`
      if (key !== cacheKey) {
        cache = expandParametric(w0, exponent)
        cacheKey = key
      }

      // Longitud de segmento base, escalada al alto del lienzo. Cada segmento
      // se acorta en proporción a su grosor (ramas finas → tramos más cortos),
      // lo que da una silueta de árbol natural además del adelgazamiento.
      const segLen = Math.min(p.height * 0.1, p.width * 0.07)

      // Interpretación de la tortuga (misma mecánica que el resto de sketches).
      p.push()
      p.translate(p.width / 2, baseY)
      for (const m of cache) {
        switch (m.sym) {
          case 'F': {
            const len = segLen * (0.35 + 0.65 * Math.min(1, m.w / w0))
            p.stroke(branchColor(p, m.w, w0))
            p.strokeWeight(Math.max(1, m.w))
            p.line(0, 0, 0, -len)
            p.translate(0, -len)
            break
          }
          case '+':
            p.rotate(p.radians(BRANCH_ANGLE))
            break
          case '-':
            p.rotate(p.radians(-BRANCH_ANGLE))
            break
          case '[':
            p.push()
            break
          case ']':
            // Yema/hoja en la punta antes de restaurar el estado.
            p.noStroke()
            p.fill('#22C55E')
            p.circle(0, 0, Math.max(4, m.w * 2.2))
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

  // Muestra el exponente sin decimales cuando es entero (2 en vez de 2.00).
  const eLabel = Number.isInteger(exponent) ? String(exponent) : exponent.toFixed(1)

  // Presets por teclado: '2' ley clásica; 'F' frágil; 'G' grueso.
  useEffect(
    () =>
      onSlideKey((e) => {
        if (e.key === '2') setExponent(2)
        if (e.key === 'f' || e.key === 'F') setExponent(1.5)
        if (e.key === 'g' || e.key === 'G') setExponent(3)
      }),
    [],
  )

  return (
    <div className="relative h-full w-full">
      <P5Canvas sketch={sketch} />

      {/* L-System paramétrico en pantalla: axioma + regla con el grosor como
          parámetro (misma notación que el resto de la charla) + ley de da Vinci. */}
      <div
        data-no-swipe="true"
        className="pointer-events-none absolute inset-x-0 top-14 z-20 flex justify-center px-4 sm:top-16"
      >
        <div className="pixel-bevel-sm max-w-[94vw] bg-white px-3 py-1.5 text-center font-mono text-[10px] font-bold text-[#0F172A] sm:text-xs">
          <div>
            <span className="text-[#334155]">Axioma</span> A(w) ·{' '}
            <span className="text-[#334155]">Regla</span>{' '}
            <span className="text-[#0369A1]">A(w) → F(w) [ +A(w·q) ] [ −A(w·q) ]</span>
          </div>
          <div className="mt-0.5">
            <span className="text-[#334155]">da Vinci (áreas):</span>{' '}
            <span className="text-[#7C3AED]">
              w<sub>padre</sub>
              <sup>e</sup> = w<sub>1</sub>
              <sup>e</sup> + w<sub>2</sub>
              <sup>e</sup>
            </span>{' '}
            <span className="hidden sm:inline">→ q = (1/2)<sup>1/e</sup> ·</span>{' '}
            <span className="text-[#BE185D]">e = {eLabel}</span>
          </div>
        </div>
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
        className={`absolute right-3 top-40 z-20 flex w-48 flex-col gap-2 sm:top-32 sm:w-64
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
            display={eLabel}
            min={1.2}
            max={3}
            step={0.1}
            onChange={(v) => setExponent(Math.round(v * 10) / 10)}
          />
          <Slider
            label="Grosor del tronco w"
            value={baseRadius}
            display={`${baseRadius} px`}
            min={6}
            max={24}
            step={1}
            onChange={setBaseRadius}
          />
          {/* Menú de presets: 3 variantes del exponente, con e=2 resaltado como
              la ley clásica (botón activo cuando el valor coincide). */}
          <div className="border-t-2 border-[#0F172A] pt-2">
            <div className="mb-1.5 font-pixel text-[9px] font-bold uppercase tracking-wider text-[#0F172A]">
              Ley de grosor
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              <PresetButton label="Frágil" sub="e=1.5" active={exponent === 1.5} onClick={() => setExponent(1.5)} />
              <PresetButton label="Clásico" sub="e=2" active={exponent === 2} onClick={() => setExponent(2)} />
              <PresetButton label="Grueso" sub="e=3" active={exponent === 3} onClick={() => setExponent(3)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/** Botón de preset con subtítulo y estado activo (resalta el valor vigente). */
function PresetButton({
  label,
  sub,
  active,
  onClick,
}: {
  label: string
  sub: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`pixel-bevel-sm px-1 py-1 font-pixel text-[9px] font-bold uppercase leading-tight transition-colors
        ${active ? 'bg-[#A3E635] text-[#0F172A]' : 'bg-white text-[#0F172A] hover:bg-[#FACC15]'}`}
    >
      {label}
      <span className="mt-0.5 block font-mono text-[8px] font-bold text-[#BE185D]">{sub}</span>
    </button>
  )
}
