import type { SketchFn } from '../components/P5Canvas'
import { PALETTE } from './palette'

/**
 * Sketch 4 — Planta ramificada con corchetes [ ] y control en vivo.
 *
 * PLACEHOLDER: L-System ramificado (F -> FF[+F][-F]) con ángulo de apertura
 * animado para ilustrar el efecto del parámetro δ. Clic alterna entre δ
 * cerrado (ciprés) y δ abierto (arbusto). En producción se reemplaza por una
 * versión con sliders en pantalla (marcados data-no-swipe).
 */
const sketch4: SketchFn = (p) => {
  const axiom = 'F'
  const rule = 'FF[+F][-F]'
  const iterations = 4
  let angleDeg = 22

  const expand = () => {
    let current = axiom
    for (let i = 0; i < iterations; i++) {
      let next = ''
      for (const ch of current) next += ch === 'F' ? rule : ch
      current = next
    }
    return current
  }

  let path = ''

  p.setup = () => {
    p.createCanvas(p.width || 800, p.height || 600)
    path = expand()
  }

  p.mousePressed = () => {
    angleDeg = angleDeg < 30 ? 38 : 22
  }

  p.draw = () => {
    p.background(PALETTE.base)
    const len = (Math.min(p.width, p.height) * 0.9) / Math.pow(2, iterations)

    p.push()
    p.translate(p.width / 2, p.height - p.height * 0.06)
    p.stroke(PALETTE.emerald)
    p.strokeWeight(1.4)
    for (const c of path) {
      switch (c) {
        case 'F':
          p.line(0, 0, 0, -len)
          p.translate(0, -len)
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

    p.noStroke()
    p.fill(PALETTE.slate)
    p.textFont('monospace')
    p.textSize(12)
    p.text(`δ=${angleDeg}°  ·  n=${iterations}`, 14, 24)
    p.textSize(11)
    p.text('SKETCH 4 · ramificación [ ] · clic = abrir/cerrar δ', 14, p.height - 14)
  }
}

export default sketch4
