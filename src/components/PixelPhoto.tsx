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
  className?: string
}

export default function PixelPhoto({
  src,
  alt,
  caption,
  credit,
  aspect = '16 / 9',
  mobileMaxH,
  className = '',
}: PixelPhotoProps) {
  return (
    <figure className={`pixel-bevel overflow-hidden bg-white ${className}`}>
      <div
        className={`w-full overflow-hidden ${mobileMaxH ? `${mobileMaxH} sm:max-h-none` : ''}`}
        style={{ aspectRatio: aspect }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover"
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
