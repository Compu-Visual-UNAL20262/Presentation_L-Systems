/**
 * Marco pixel 16-bit para una imagen raster (foto o captura). Mantiene la
 * estética de la charla: borde oscuro nítido (pixel-bevel), pie de foto con
 * fuente pixel y crédito opcional de la fuente. La imagen se recorta con
 * object-cover dentro de una relación de aspecto fija para que no rompa el
 * layout en móvil ni en proyector.
 */
interface PixelPhotoProps {
  src: string
  alt: string
  /** Pie de foto breve (qué muestra). */
  caption?: string
  /** Crédito / fuente de la imagen. */
  credit?: string
  /** Relación de aspecto CSS (ej. '16 / 9', '4 / 3'). Por defecto 16/9. */
  aspect?: string
  /**
   * Clase de altura máxima aplicada SOLO en móvil (< sm) para evitar que una
   * foto de aspecto alto empuje el resto del slide fuera del viewport. En
   * desktop se ignora y manda `aspect`. Ej.: 'max-h-36'.
   */
  mobileMaxH?: string
  /**
   * Clase de altura máxima aplicada en TODOS los breakpoints (no solo móvil).
   * Combinada con `aspect`, evita que una foto de aspecto alto crezca sin
   * límite en desktop y empuje el slide fuera del viewport. Ej.: 'max-h-56'.
   */
  maxH?: string
  /**
   * Modo "llenar altura": en lugar de imponer una relación de aspecto fija,
   * la figura ocupa el alto disponible de su contenedor flex (min-h-0) y la
   * imagen se ajusta con object-contain. Útil cuando el slide debe caber
   * entero sin scroll y la foto es el elemento que cede altura.
   */
  fill?: boolean
  className?: string
}

export default function PixelPhoto({
  src,
  alt,
  caption,
  credit,
  aspect = '16 / 9',
  mobileMaxH,
  maxH,
  fill = false,
  className = '',
}: PixelPhotoProps) {
  return (
    <figure
      className={`pixel-bevel overflow-hidden bg-white ${fill ? 'flex min-h-0 flex-col' : ''} ${className}`}
    >
      <div
        className={`w-full overflow-hidden ${
          fill ? 'min-h-0 flex-1' : mobileMaxH ? `${mobileMaxH} sm:max-h-none` : ''
        } ${maxH ?? ''}`}
        style={fill ? undefined : { aspectRatio: aspect }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={`h-full w-full ${fill ? 'object-contain' : 'object-cover'}`}
          draggable={false}
        />
      </div>
      {(caption || credit) && (
        <figcaption className="flex items-center justify-between gap-2 border-t-2 border-[#0F172A] bg-white px-2.5 py-1">
          {caption && (
            <span className="font-pixel text-[10px] font-bold uppercase tracking-wider text-[#0F172A] sm:text-[10px]">
              {caption}
            </span>
          )}
          {credit && (
            <span className="shrink-0 font-mono text-[8px] font-semibold text-[#64748B] sm:text-[9px]">
              {credit}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  )
}
