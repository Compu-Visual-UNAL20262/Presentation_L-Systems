/**
 * Glifos pixel-art para los controles de reproducción/avance.
 *
 * Reemplazan los emojis del sistema (▶ ⏸ ⏩ ⟳ …) que renderizan distinto en
 * cada SO/navegador y chocan con la tipografía Silkscreen. Se dibujan con
 * <rect> de 1px sobre una grilla, con `shapeRendering="crispEdges"`, en línea
 * con las nubes y los iconos 16-bit del resto de la presentación.
 *
 * Diseñados para ir dentro de los botones arcade: heredan el color del texto
 * (`fill="currentColor"`) y se alinean con la etiqueta vía flex en el botón.
 */

type GlyphName = 'play' | 'pause' | 'fast' | 'replay' | 'prev' | 'next'

/** Celdas [x, y] (y opcional ancho/alto) en viewBox 12×12 por glifo. */
type Cell = [number, number, number?, number?]

const GLYPHS: Record<GlyphName, Cell[]> = {
  // Triángulo "play" apuntando a la derecha.
  play: [
    [3, 2, 1, 8],
    [4, 3, 1, 6],
    [5, 4, 1, 4],
    [6, 5, 1, 2],
    [7, 5, 1, 2],
  ],
  // Dos barras "pausa".
  pause: [
    [3, 2, 2, 8],
    [7, 2, 2, 8],
  ],
  // Doble triángulo "avance rápido".
  fast: [
    [1, 3, 1, 6],
    [2, 4, 1, 4],
    [3, 5, 1, 2],
    [6, 3, 1, 6],
    [7, 4, 1, 4],
    [8, 5, 1, 2],
  ],
  // Flecha circular "reiniciar/repetir": anillo pixelado abierto por arriba a
  // la derecha, con una punta de flecha clara que apunta hacia la abertura.
  replay: [
    // Arco superior (deja hueco a la derecha para la flecha)
    [4, 2, 4, 1],
    [3, 3, 1, 1],
    // Lados
    [2, 4, 1, 4],
    [9, 5, 1, 3],
    // Arco inferior
    [3, 8, 1, 1],
    [4, 9, 5, 1],
    // Punta de flecha apuntando hacia arriba-derecha, entrando al hueco
    [7, 1, 1, 1],
    [8, 1, 1, 3],
    [9, 2, 1, 1],
    [7, 3, 1, 1],
  ],
  prev: [
    [4, 5, 1, 2],
    [5, 4, 1, 4],
    [6, 3, 1, 6],
    [7, 2, 1, 8],
  ],
  next: [
    [4, 2, 1, 8],
    [5, 3, 1, 6],
    [6, 4, 1, 4],
    [7, 5, 1, 2],
  ],
}

interface PixelGlyphProps {
  name: GlyphName
  /** Tamaño en px del lado del SVG. Por defecto 14 (encaja con text-[11px]). */
  size?: number
  className?: string
}

export default function PixelGlyph({ name, size = 14, className }: PixelGlyphProps) {
  const cells = GLYPHS[name]
  return (
    <svg
      viewBox="0 0 12 12"
      width={size}
      height={size}
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={`inline-block shrink-0 align-[-0.15em] ${className ?? ''}`}
      style={{ fill: 'currentColor' }}
    >
      {cells.map(([x, y, w = 1, h = 1], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} />
      ))}
    </svg>
  )
}
