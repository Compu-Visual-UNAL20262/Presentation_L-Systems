import { useEffect, useMemo, useRef, useState } from 'react'
import type p5 from 'p5'
import P5Canvas from '../components/P5Canvas'
import type { SketchFn } from '../components/P5Canvas'
import { onSlideKey } from './keyboard'

/**
 * Sketch 11 — El doble cuaderno (reescritura paralela paso a paso).
 *
 * Visualiza el mecanismo interno que el guion solo narraba: cómo se pasa de la
 * generación Sₙ a la Sₙ₊₁ SIN modificar la cadena mientras se lee. Se usa el
 * alga de Lindenmayer (A→AB, B→A):
 *   - Arriba: cuaderno de HOY (Sₙ), de solo lectura; una cabeza lee símbolo a
 *     símbolo y resalta el que procesa.
 *   - Abajo: cuaderno de MAÑANA (Sₙ₊₁), limpio; se van escribiendo los
 *     sucesores (A→AB, B→A) a medida que la cabeza avanza.
 *   - Al terminar, los cuadernos se INTERCAMBIAN y empieza la siguiente
 *     generación. Así todas las reglas parten del mismo estado (paralelismo).
 */

const BG = '#E6F7FF'
const INK = '#0F172A'
const AMBER = '#FACC15' // A
const CYAN = '#38BDF8' // B
const READ = '#F59E0B'

const RULES: Record<string, string> = { A: 'AB', B: 'A' }
const MAX_LEN = 34 // n=7 del alga; suficiente para ilustrar sin saturar
const STEP_FRAMES = 22 // ~0.37 s por símbolo

function successor(ch: string): string {
  return RULES[ch] ?? ch
}

interface RewriteParams {
  playing: boolean
  speed: number
  runToken: number
}

function makeSketch(paramsRef: { current: RewriteParams }): SketchFn {
  return (p: p5, size: { width: number; height: number }) => {
    let today = 'A' // Sₙ
    let tomorrow = '' // Sₙ₊₁ en construcción
    let readIdx = 0 // símbolo que lee la cabeza
    let frames = 0
    let swapping = 0 // temporizador de animación de swap
    let lastToken = paramsRef.current.runToken

    const reset = () => {
      today = 'A'
      tomorrow = ''
      readIdx = 0
      frames = 0
      swapping = 0
    }

    p.setup = () => {
      p.createCanvas(size?.width || window.innerWidth, size?.height || window.innerHeight)
      reset()
    }

    const drawRibbon = (
      str: string,
      activeIdx: number,
      y: number,
      title: string,
      subtitle: string,
      titleColor: string,
    ) => {
      const cell = Math.max(16, Math.min(40, (p.width * 0.8) / MAX_LEN))
      const totalW = Math.min(str.length, MAX_LEN) * (cell + 3)
      const x0 = (p.width - totalW) / 2

      // Rótulo del cuaderno
      p.noStroke()
      p.fill(titleColor)
      p.textAlign(p.LEFT, p.BOTTOM)
      p.textStyle(p.BOLD)
      p.textSize(Math.max(12, Math.min(18, p.width * 0.02)))
      p.text(title, x0, y - cell * 0.75)
      p.fill('#64748B')
      p.textSize(Math.max(9, Math.min(12, p.width * 0.013)))
      p.text(subtitle, x0, y - cell * 0.75 + 16)

      for (let i = 0; i < str.length && i < MAX_LEN; i++) {
        const cx = x0 + i * (cell + 3)
        const isActive = i === activeIdx
        p.stroke(INK)
        p.strokeWeight(isActive ? 3 : 1.6)
        p.fill(str[i] === 'A' ? AMBER : CYAN)
        p.rectMode(p.CORNER)
        p.rect(cx, y, cell, cell, 4)
        p.noStroke()
        p.fill(INK)
        p.textAlign(p.CENTER, p.CENTER)
        p.textStyle(p.BOLD)
        p.textSize(cell * 0.5)
        p.text(str[i], cx + cell / 2, y + cell / 2 + 1)
        if (isActive) {
          // Cabeza lectora
          p.noFill()
          p.stroke(READ)
          p.strokeWeight(3)
          p.rect(cx - 3, y - 3, cell + 6, cell + 6, 5)
        }
      }
      return { x0, cell, totalW }
    }

    p.draw = () => {
      if (paramsRef.current.runToken !== lastToken) {
        lastToken = paramsRef.current.runToken
        reset()
      }

      p.background(BG)

      const topY = p.height * 0.26
      const botY = p.height * 0.58
      const cellApprox = Math.max(16, Math.min(40, (p.width * 0.8) / MAX_LEN))

      // Avance temporal
      if (paramsRef.current.playing && swapping === 0) {
        frames += paramsRef.current.speed
        if (frames >= STEP_FRAMES) {
          frames = 0
          if (readIdx < today.length) {
            tomorrow += successor(today[readIdx])
            readIdx++
          }
          if (readIdx >= today.length) {
            // Fin de la generación: dispara animación de swap.
            swapping = 1
          }
        }
      }

      // Panel de HOY (Sₙ)
      drawRibbon(today, swapping ? -1 : readIdx, topY, 'HOY  ·  Sₙ', 'solo lectura', '#B45309')
      // Panel de MAÑANA (Sₙ₊₁)
      drawRibbon(tomorrow, -1, botY, 'MAÑANA  ·  Sₙ₊₁', 'buffer limpio (se escribe)', '#15803D')

      // Flecha de sucesor del símbolo activo
      if (!swapping && readIdx < today.length) {
        p.stroke('#0284C7')
        p.strokeWeight(3)
        const midX = p.width / 2
        p.line(midX, topY + cellApprox + 6, midX, botY - cellApprox * 0.9)
        p.noStroke()
        p.fill('#0284C7')
        p.textAlign(p.CENTER, p.CENTER)
        p.textStyle(p.BOLD)
        p.textSize(Math.max(11, Math.min(15, p.width * 0.016)))
        p.text(
          `${today[readIdx]} → ${successor(today[readIdx])}`,
          midX,
          (topY + botY) / 2 + cellApprox * 0.1,
        )
      }

      // Animación de intercambio de cuadernos
      if (swapping > 0) {
        swapping++
        p.noStroke()
        p.fill(INK)
        p.textAlign(p.CENTER, p.CENTER)
        p.textStyle(p.BOLD)
        p.textSize(Math.max(14, Math.min(22, p.width * 0.024)))
        p.text('⇄ intercambio de cuadernos', p.width / 2, p.height * 0.86)
        if (swapping > 55) {
          // Mañana pasa a ser hoy; empezar nueva generación (si no es muy larga).
          today = tomorrow.length <= MAX_LEN ? tomorrow : today
          tomorrow = ''
          readIdx = 0
          swapping = 0
        }
      } else {
        p.noStroke()
        p.fill('#334155')
        p.textAlign(p.CENTER, p.CENTER)
        p.textStyle(p.BOLD)
        p.textSize(Math.max(11, Math.min(15, p.width * 0.016)))
        p.text(
          'Se lee HOY y se escribe MAÑANA; nunca se edita la cadena que se está leyendo.',
          p.width / 2,
          p.height * 0.86,
        )
      }
    }
  }
}

export default function Sketch11Rewrite() {
  const [playing, setPlaying] = useState(true)
  const [fast, setFast] = useState(false)
  const paramsRef = useRef<RewriteParams>({ playing: true, speed: 1, runToken: 0 })
  paramsRef.current.playing = playing
  paramsRef.current.speed = fast ? 2.4 : 1

  const sketch = useMemo(() => makeSketch(paramsRef), [])

  const restart = () => {
    paramsRef.current.runToken += 1
    setPlaying(true)
  }

  useEffect(
    () =>
      onSlideKey((e) => {
        if (e.key === ' ') {
          e.preventDefault()
          setPlaying((v) => !v)
        }
        if (e.key === 'r' || e.key === 'R') restart()
      }),
    [],
  )

  return (
    <div className="relative h-full w-full">
      <P5Canvas sketch={sketch} />

      {/* Título del mecanismo */}
      <div
        data-no-swipe="true"
        className="pointer-events-none absolute inset-x-0 top-14 z-20 flex justify-center px-4 sm:top-16"
      >
        <span className="pixel-bevel-sm max-w-[94vw] bg-white px-3 py-1.5 text-center font-mono text-[11px] font-bold text-[#0F172A] sm:text-sm">
          Doble cuaderno: reglas <span className="text-[#B45309]">A→AB</span>,{' '}
          <span className="text-[#0369A1]">B→A</span> aplicadas en paralelo
        </span>
      </div>

      {/* Controles */}
      <div
        data-no-swipe="true"
        className="absolute bottom-16 left-1/2 z-20 flex -translate-x-1/2 gap-2 sm:bottom-6"
      >
        <button type="button" onClick={() => setPlaying((v) => !v)} className="arcade-btn">
          {playing ? '⏸ PAUSA' : '▶ SEGUIR'}
        </button>
        <button type="button" onClick={() => setFast((v) => !v)} className="arcade-btn">
          {fast ? '🐢 LENTO' : '⏩ RÁPIDO'}
        </button>
        <button type="button" onClick={restart} className="arcade-btn-lime">
          ⟳ REINICIAR
        </button>
      </div>
    </div>
  )
}
