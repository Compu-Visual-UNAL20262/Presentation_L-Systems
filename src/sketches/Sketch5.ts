import type { SketchFn } from '../components/P5Canvas'
import { PALETTE } from './palette'

/**
 * Sketch 5 — Bosque estocástico + prueba de estrés (FPS / segmentos).
 *
 * PLACEHOLDER: genera varios árboles con una regla estocástica (ramifica a la
 * izquierda ~40 %, a la derecha ~40 %, recto ~20 %). Clic = "Regenerar bosque".
 * Muestra un contador de segmentos dibujados y FPS para ilustrar el coste
 * exponencial. En producción se añaden botón y selector de iteraciones
 * (marcados data-no-swipe).
 */
const sketch5: SketchFn = (p) => {
  const iterations = 5
  const angleDeg = 22
  let strings: string[] = []
  let segmentCount = 0

  const expandStochastic = () => {
    let current = 'F'
    for (let i = 0; i < iterations; i++) {
      let next = ''
      for (const ch of current) {
        if (ch === 'F') {
          const r = p.random()
          if (r < 0.4) next += 'FF[+F]'
          else if (r < 0.8) next += 'FF[-F]'
          else next += 'F[+F][-F]'
        } else {
          next += ch
        }
      }
      current = next
    }
    return current
  }

  const regenerate = () => {
    strings = [expandStochastic(), expandStochastic(), expandStochastic()]
  }

  p.setup = () => {
    p.createCanvas(p.width || 800, p.height || 600)
    regenerate()
  }

  p.mousePressed = () => regenerate()

  const drawTree = (path: string, x: number, len: number) => {
    p.push()
    p.translate(x, p.height - p.height * 0.08)
    p.stroke(PALETTE.olive)
    p.strokeWeight(1.2)
    for (const c of path) {
      switch (c) {
        case 'F':
          p.line(0, 0, 0, -len)
          p.translate(0, -len)
          segmentCount++
          break
        case '+':
          p.rotate(p.radians(angleDeg))
          break
        case '-':
          p.rotate(p.radians(-angleDeg))
          break
        case '[':
          p.push()
          break
        case ']':
          p.pop()
          break
        default:
          break
      }
    }
    p.pop()
  }

  p.draw = () => {
    p.background(PALETTE.base)
    segmentCount = 0
    const len = (Math.min(p.width, p.height) * 0.7) / Math.pow(2, iterations)
    const slots = [p.width * 0.25, p.width * 0.5, p.width * 0.75]
    strings.forEach((s, i) => drawTree(s, slots[i], len))

    // HUD de métricas (estilo prueba de estrés).
    p.noStroke()
    p.fill(PALETTE.amber)
    p.textFont('monospace')
    p.textSize(12)
    p.text(`segmentos: ${segmentCount}`, 14, 24)
    p.fill(p.frameRate() > 50 ? PALETTE.emerald : PALETTE.magenta)
    p.text(`FPS: ${p.frameRate().toFixed(0)}`, 14, 42)
    p.fill(PALETTE.slate)
    p.textSize(11)
    p.text('SKETCH 5 · bosque estocástico · clic = regenerar', 14, p.height - 14)
  }
}

export default sketch5
