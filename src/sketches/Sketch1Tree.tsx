import { useMemo, useRef, useState } from 'react'
import type p5 from 'p5'
import P5Canvas from '../components/P5Canvas'
import type { SketchFn } from '../components/P5Canvas'

/**
 * Sketch 1 — Árbol frondoso animado (gancho inicial y cierre).
 *
 * D0L-System con reescritura de nodos:
 *   Alfabeto V = { X, F, +, -, [, ] }
 *   Axioma  ω = "X"
 *   Reglas  P = { X -> F+[[X]-X]-F[-FX]+X,  F -> FF }
 *   n = 5, ángulo δ = 25°.
 *
 * La longitud de paso se escala según la altura del contenedor para que el
 * árbol ocupe ~78 % del alto en cualquier relación de aspecto (16:9 o móvil
 * vertical). Crecimiento animado de ~4 s mediante límite de caracteres por
 * frame; la cadena final se calcula una sola vez (double buffering) y se
 * memoiza, de modo que cambiar de modo 1↔3 árboles no la recalcula.
 */

const AXIOM = 'X'
const RULES: Record<string, string> = {
  X: 'F+[[X]-X]-F[-FX]+X',
  F: 'FF',
}
const ITERATIONS = 5
const ANGLE_DEG = 25

const BARK = '#5C3A21'
const OLIVE = '#365314'
const BG_SKY = '#C7ECFF'
const GROW_FRAMES = 240 // ~4 s a 60 FPS

/** Expande el axioma con double buffering (leer actual, escribir siguiente). */
function expandString(): string {
  let current = AXIOM
  for (let i = 0; i < ITERATIONS; i++) {
    let next = ''
    for (const ch of current) next += RULES[ch] ?? ch
    current = next
  }
  return current
}

/**
 * Simula la tortuga con paso=1 para medir el bounding box de la geometría.
 * Permite escalar `len` de modo que el árbol ocupe una fracción exacta del
 * alto del contenedor en cualquier relación de aspecto.
 */
function measureBounds(path: string) {
  let x = 0
  let y = 0
  let heading = -90 // apunta hacia arriba (−Y)
  let minX = 0
  let maxX = 0
  let minY = 0
  let maxY = 0
  const stack: { x: number; y: number; heading: number }[] = []
  for (const c of path) {
    switch (c) {
      case 'F':
        x += Math.cos((heading * Math.PI) / 180)
        y += Math.sin((heading * Math.PI) / 180)
        minX = Math.min(minX, x)
        maxX = Math.max(maxX, x)
        minY = Math.min(minY, y)
        maxY = Math.max(maxY, y)
        break
      case '+':
        heading += ANGLE_DEG
        break
      case '-':
        heading -= ANGLE_DEG
        break
      case '[':
        stack.push({ x, y, heading })
        break
      case ']': {
        const s = stack.pop()
        if (s) {
          x = s.x
          y = s.y
          heading = s.heading
        }
        break
      }
      default:
        break
    }
  }
  return {
    width: maxX - minX || 1,
    height: maxY - minY || 1,
    minX,
    maxX,
    minY,
    maxY,
  }
}

/** Parámetros vivos que el sketch lee cada frame sin remontar p5. */
interface TreeParams {
  forest: boolean
  /** Señal de reinicio: al incrementarse, el sketch reinicia la animación. */
  replayToken: number
}

function makeSketch(finalString: string, paramsRef: { current: TreeParams }): SketchFn {
  const bounds = measureBounds(finalString)
  return (p: p5, size: { width: number; height: number }) => {
    let charLimit = 0
    let lastReplayToken = paramsRef.current.replayToken

    const restart = () => {
      charLimit = 0
    }

    p.setup = () => {
      p.createCanvas(size?.width || window.innerWidth, size?.height || window.innerHeight)
      restart()
    }

    // Clic y ESPACIO reinician la animación.
    p.mousePressed = () => restart()
    p.keyPressed = () => {
      if (p.key === ' ') restart()
      if (p.key === 'b' || p.key === 'B') {
        paramsRef.current.forest = !paramsRef.current.forest
        restart()
      }
    }

    /** Dibuja nube pixel-art decorativa en el cielo de día. */
    const drawPixelCloud = (cx: number, cy: number, s: number) => {
      p.noStroke()
      p.fill('#FFFFFF')
      p.rect(cx - 28 * s, cy, 56 * s, 16 * s)
      p.rect(cx - 16 * s, cy - 10 * s, 32 * s, 12 * s)
      p.rect(cx - 36 * s, cy + 5 * s, 72 * s, 11 * s)
      p.fill('#93C5FD')
      p.rect(cx - 36 * s, cy + 14 * s, 72 * s, 3 * s)
    }

    /** Dibuja suelo 16-bit (pasto verde + tierra con bloques pixelados). */
    const drawPixelGround = (baseY: number) => {
      const groundH = p.height - baseY
      // Tierra
      p.noStroke()
      p.fill('#854D0E')
      p.rect(0, baseY, p.width, groundH)
      // Franja de pasto
      p.fill('#22C55E')
      p.rect(0, baseY, p.width, Math.max(8, groundH * 0.34))
      p.fill('#15803D')
      p.rect(0, baseY + Math.max(8, groundH * 0.34), p.width, 4)
      // Borde superior oscuro estilo 16-bit
      p.stroke('#0F172A')
      p.strokeWeight(2.5)
      p.line(0, baseY, p.width, baseY)
    }

    /** Dibuja un árbol completo hasta `charLimit` en el origen actual. */
    const drawTree = (len: number) => {
      // Factor relativo a la longitud de referencia para que grosor y hojas
      // escalen con el tamaño del árbol (coherente en desktop y móvil).
      const k = p.constrain(len / 9, 0.5, 2.2)
      let depth = 0
      for (let i = 0; i < charLimit; i++) {
        const c = finalString[i]
        switch (c) {
          case 'F': {
            const t = Math.min(1, depth / 7)
            p.stroke(p.lerpColor(p.color(BARK), p.color(OLIVE), t))
            p.strokeWeight(Math.max(1.6, (8.2 - depth * 1.05) * k))
            p.line(0, 0, 0, -len)
            p.translate(0, -len)
            break
          }
          case '+':
            p.rotate(p.radians(ANGLE_DEG))
            break
          case '-':
            p.rotate(p.radians(-ANGLE_DEG))
            break
          case '[':
            p.push()
            depth++
            break
          case ']':
            p.stroke('#0F172A')
            p.strokeWeight(Math.max(1, 1.1 * k))
            if (depth % 4 === 0) {
              p.fill('#A3E635') // brote verde lima luminoso
            } else {
              p.fill('#16A34A') // hoja esmeralda intensa
            }
            p.push()
            p.rotate(p.radians(depth % 2 === 0 ? 22 : -22))
            p.ellipse(0, 0, 7 * k, 12 * k) // hoja inclinada con borde oscuro nítido
            p.pop()
            p.pop()
            depth--
            break
          default:
            break
        }
      }

      // Equilibra la pila de transformación: durante el crecimiento animado el
      // bucle puede terminar con símbolos `[` abiertos sin su `]`. Si no se
      // cierran, la matriz de p5 queda contaminada y desplaza/inclina los
      // árboles siguientes en modo bosque. Cada árbol deja la pila 100 %
      // balanceada en cada frame.
      while (depth > 0) {
        p.pop()
        depth--
      }
    }

    p.draw = () => {
      // Reinicio solicitado desde React (botón REPLAY / toggle).
      if (paramsRef.current.replayToken !== lastReplayToken) {
        lastReplayToken = paramsRef.current.replayToken
        restart()
      }

      p.background(BG_SKY)
      drawPixelCloud(p.width * 0.16, p.height * 0.16, 1.15)
      drawPixelCloud(p.width * 0.82, p.height * 0.2, 0.95)

      // Avance del crecimiento: duración constante ~4 s sin importar el largo.
      charLimit = Math.min(
        finalString.length,
        charLimit + Math.ceil(finalString.length / GROW_FRAMES),
      )

      const forest = paramsRef.current.forest
      const baseY = p.height - p.height * 0.08
      drawPixelGround(baseY)

      // Escala para que el árbol ocupe ~78 % del alto del contenedor.
      // bounds.height está en unidades de paso=1; len = altura_objetivo / altura.
      const fill = forest ? 0.6 : 0.78
      const len = (p.height * fill) / bounds.height
      // Desplazamiento horizontal para centrar el bounding box sobre el origen.
      const centerOffset = -((bounds.minX + bounds.maxX) / 2) * len

      if (forest) {
        const xs = [p.width * 0.22, p.width * 0.5, p.width * 0.78]
        for (const x of xs) {
          p.push()
          p.translate(x + centerOffset, baseY)
          drawTree(len)
          p.pop()
        }
      } else {
        p.push()
        p.translate(p.width / 2 + centerOffset, baseY)
        drawTree(len)
        p.pop()
      }
    }
  }
}

interface Sketch1TreeProps {
  initialForestMode?: boolean
}

export default function Sketch1Tree({ initialForestMode = false }: Sketch1TreeProps) {
  const finalString = useMemo(() => expandString(), [])
  const [forest, setForest] = useState(initialForestMode)

  const paramsRef = useRef<TreeParams>({
    forest: initialForestMode,
    replayToken: 0,
  })

  // El sketch se memoiza por la cadena (no por estado) → p5 no se remonta.
  const sketch = useMemo(
    () => makeSketch(finalString, paramsRef),
    [finalString],
  )

  const replay = () => {
    paramsRef.current.replayToken += 1
  }

  const toggleForest = () => {
    const next = !forest
    setForest(next)
    paramsRef.current.forest = next
    paramsRef.current.replayToken += 1
  }

  return (
    <div className="relative h-full w-full">
      <P5Canvas sketch={sketch} />

      {/* Controles arcade (esquina superior derecha), ignoran el swipe */}
      <div
        data-no-swipe="true"
        className="absolute right-4 top-14 z-20 flex flex-col items-end gap-2 sm:top-16"
      >
        <button type="button" onClick={replay} className="arcade-btn">
          ▶ REPLAY
        </button>
        <button type="button" onClick={toggleForest} className="arcade-btn">
          {forest ? 'BOSQUE (3)' : '1 ÁRBOL'}
        </button>
      </div>
    </div>
  )
}
