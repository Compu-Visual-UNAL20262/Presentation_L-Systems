import { useMemo, useRef } from 'react'
import type p5 from 'p5'
import P5Canvas from '../components/P5Canvas'
import type { SketchFn } from '../components/P5Canvas'

/**
 * Sketch de Cierre — Un bosque estocástico DIVERSO que crece ante la audiencia.
 *
 * Es el "payoff" de toda la charla: lo que empezó como un árbol (Acto 1) ahora
 * es un ecosistema entero donde cada árbol es único, generado por las mismas
 * reglas simples + azar (Acto 4). Recoge visualmente la tesis: reglas simples →
 * mundos infinitos.
 *
 * S0L-System (gramática del Sketch 5, bosque estocástico):
 *   Axioma ω = "X"
 *   F -> FF
 *   X -> (40%) F[-X][+X]FX | (40%) F[+X][-X]FX | (20%) FF[+X]X
 *
 * Los árboles crecen en una ola escalonada de izquierda a derecha para que el
 * mundo "cobre vida" mientras se da la conclusión. Responsivo: la cantidad de
 * árboles y su tamaño se adaptan al ancho del contenedor (más en proyector,
 * menos en móvil vertical).
 */

const AXIOM = 'X'
const ITERATIONS = 5
const GROW_FRAMES = 150 // ~2.5 s por árbol a 60 FPS

const BARK = '#4A2C11'
const OLIVE = '#365314'
const BG_SKY = '#C7ECFF'

/** Expande un árbol estocástico (cada llamada produce una silueta distinta). */
function expandStochastic(): string {
  let current = AXIOM
  for (let i = 0; i < ITERATIONS; i++) {
    let next = ''
    for (const ch of current) {
      if (ch === 'F') {
        next += 'FF'
      } else if (ch === 'X') {
        const r = Math.random()
        if (r < 0.4) next += 'F[-X][+X]FX'
        else if (r < 0.8) next += 'F[+X][-X]FX'
        else next += 'FF[+X]X'
      } else {
        next += ch
      }
    }
    current = next
  }
  return current
}

/** Descriptor de un árbol del bosque de cierre. */
interface ForestTree {
  path: string
  angle: number
  lean: number
  scale: number
  /** Altura de la geometría (en unidades de paso=1) para escalar al lienzo. */
  treeHeight: number
  /** Posición horizontal relativa 0..1. */
  xFrac: number
  /** Retardo de arranque del crecimiento (en "árboles de distancia"). */
  waveOrder: number
}

/** Mide la altura de la copa (en unidades de paso=1) con rumbo e inclinación. */
function measureHeight(path: string, angle: number, lean: number): number {
  let x = 0
  let y = 0
  let heading = -90 + lean
  let minY = 0
  const stack: { x: number; y: number; heading: number }[] = []
  for (const c of path) {
    switch (c) {
      case 'F':
        x += Math.cos((heading * Math.PI) / 180)
        y += Math.sin((heading * Math.PI) / 180)
        minY = Math.min(minY, y)
        break
      case '+':
        heading += angle
        break
      case '-':
        heading -= angle
        break
      case '[':
        stack.push({ x, y, heading })
        break
      case ']': {
        const s = stack.pop()
        if (s) ({ x, y, heading } = s)
        break
      }
      default:
        break
    }
  }
  return Math.max(1, -minY)
}

interface ClosingParams {
  replayToken: number
}

function makeSketch(trees: ForestTree[], paramsRef: { current: ClosingParams }): SketchFn {
  return (p: p5, size: { width: number; height: number }) => {
    // Progreso global de crecimiento (en "frames equivalentes"); cada árbol
    // arranca desfasado según su waveOrder para la ola de izquierda a derecha.
    let growth = 0
    let lastReplayToken = paramsRef.current.replayToken

    const restart = () => {
      growth = 0
    }

    p.setup = () => {
      p.createCanvas(size?.width || window.innerWidth, size?.height || window.innerHeight)
      restart()
    }

    p.mousePressed = () => restart()
    p.keyPressed = () => {
      if (p.key === ' ') restart()
    }

    const drawCloud = (cx: number, cy: number, s: number) => {
      p.noStroke()
      p.fill('#FFFFFF')
      p.rect(cx - 28 * s, cy, 56 * s, 16 * s)
      p.rect(cx - 16 * s, cy - 10 * s, 32 * s, 12 * s)
      p.rect(cx - 36 * s, cy + 5 * s, 72 * s, 11 * s)
      p.fill('#93C5FD')
      p.rect(cx - 36 * s, cy + 14 * s, 72 * s, 3 * s)
    }

    const drawGround = (baseY: number) => {
      const groundH = p.height - baseY
      p.noStroke()
      p.fill('#854D0E')
      p.rect(0, baseY, p.width, groundH)
      p.fill('#22C55E')
      p.rect(0, baseY, p.width, Math.max(8, groundH * 0.34))
      p.fill('#15803D')
      p.rect(0, baseY + Math.max(8, groundH * 0.34), p.width, 4)
      p.stroke('#0F172A')
      p.strokeWeight(2.5)
      p.line(0, baseY, p.width, baseY)
    }

    /** Dibuja un árbol hasta `charLimit` caracteres en el origen actual. */
    const drawTree = (tree: ForestTree, len: number, charLimit: number) => {
      const k = p.constrain(len / 7, 0.4, 2.0)
      let depth = 0
      const n = Math.min(charLimit, tree.path.length)
      for (let i = 0; i < n; i++) {
        const c = tree.path[i]
        switch (c) {
          case 'F': {
            const t = Math.min(1, depth / 7)
            p.stroke(p.lerpColor(p.color(BARK), p.color(OLIVE), t))
            p.strokeWeight(Math.max(1.2, (6.5 - depth * 0.9) * k))
            p.line(0, 0, 0, -len)
            p.translate(0, -len)
            break
          }
          case '+':
            p.rotate(p.radians(tree.angle))
            break
          case '-':
            p.rotate(p.radians(-tree.angle))
            break
          case '[':
            p.push()
            depth++
            break
          case ']':
            p.stroke('#0F172A')
            p.strokeWeight(Math.max(1, 1.0 * k))
            p.fill(depth % 3 === 0 ? '#A3E635' : '#16A34A')
            p.push()
            p.rotate(p.radians(depth % 2 === 0 ? 20 : -20))
            p.ellipse(0, 0, 6 * k, 10 * k)
            p.pop()
            p.pop()
            depth--
            break
          default:
            break
        }
      }
      while (depth > 0) {
        p.pop()
        depth--
      }
    }

    p.draw = () => {
      if (paramsRef.current.replayToken !== lastReplayToken) {
        lastReplayToken = paramsRef.current.replayToken
        restart()
      }

      p.background(BG_SKY)
      drawCloud(p.width * 0.14, p.height * 0.14, 1.1)
      drawCloud(p.width * 0.5, p.height * 0.1, 0.8)
      drawCloud(p.width * 0.84, p.height * 0.2, 0.95)

      const baseY = p.height - p.height * 0.08
      drawGround(baseY)

      // Avance global del crecimiento (siempre; es un cierre que se auto-anima).
      growth += 1.6

      // Retardo entre árboles de la ola (en frames) según el ancho disponible.
      const waveGap = 10

      for (const tree of trees) {
        // Cada árbol arranca su crecimiento cuando `growth` supera su turno.
        const localFrames = growth - tree.waveOrder * waveGap
        if (localFrames <= 0) continue
        const progress = Math.min(1, localFrames / GROW_FRAMES)
        const charLimit = Math.floor(tree.path.length * progress)
        if (charLimit < 1) continue

        // Escala: la copa más alta ocupa ~72 % del alto disponible.
        const topMargin = p.height * 0.16
        const usableH = baseY - topMargin
        const len = (usableH * 0.95) / tree.treeHeight

        const x = p.width * tree.xFrac
        p.push()
        p.translate(x, baseY)
        p.rotate(p.radians(tree.lean))
        drawTree(tree, len, charLimit)
        p.pop()
      }
    }
  }
}

/** Genera el bosque diverso adaptando la cantidad al ancho del contenedor. */
function buildForest(width: number): ForestTree[] {
  // Más árboles en proyector/desktop; menos en móvil vertical.
  const count = width < 520 ? 4 : width < 900 ? 6 : 8
  const angles = [18, 24, 20, 27, 19, 25, 22, 21]
  const leans = [-5, 3, -2, 6, -4, 2, -3, 5]
  const scales = [0.82, 1.05, 0.9, 1.12, 0.85, 1.0, 0.95, 1.08]

  const trees: ForestTree[] = []
  for (let i = 0; i < count; i++) {
    const angle = angles[i % angles.length]
    const lean = leans[i % leans.length]
    const scale = scales[i % scales.length]
    const path = expandStochastic()
    // Reparte los árboles con un margen lateral para que no toquen los bordes.
    const xFrac = 0.08 + (0.84 * i) / (count - 1)
    trees.push({
      path,
      angle,
      lean,
      scale,
      treeHeight: measureHeight(path, angle, lean) / scale,
      xFrac,
      // Ola de crecimiento de izquierda a derecha.
      waveOrder: i,
    })
  }
  return trees
}

export default function SketchClosing() {
  // Se construye una sola vez por ancho de ventana inicial.
  const trees = useMemo(
    () => buildForest(typeof window === 'undefined' ? 1200 : window.innerWidth),
    [],
  )
  const paramsRef = useRef<ClosingParams>({ replayToken: 0 })
  const sketch = useMemo(() => makeSketch(trees, paramsRef), [trees])

  const replay = () => {
    paramsRef.current.replayToken += 1
  }

  return (
    <div className="relative h-full w-full">
      <P5Canvas sketch={sketch} />

      <div
        data-no-swipe="true"
        className="absolute right-4 top-14 z-20 flex flex-col items-end gap-2 sm:top-16"
      >
        <button type="button" onClick={replay} className="arcade-btn">
          ▶ REPLAY
        </button>
      </div>
    </div>
  )
}
