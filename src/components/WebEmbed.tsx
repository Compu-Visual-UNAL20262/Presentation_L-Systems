import { useState } from 'react'
import PixelGlyph from './PixelGlyph'

/**
 * Embebido perezoso de una página web externa (iframe), con estética 16-bit
 * coherente con <YouTubeEmbed> / <InstagramEmbed>. Hasta que el expositor pulsa
 * el botón, se muestra una tarjeta-cartucho (título + gancho + QR opcional) y
 * NO se inserta ningún iframe ni se carga la página de terceros.
 *
 * Pensado para herramientas interactivas externas (p. ej. el generador de
 * música fractal "Musicalator"): si hay tiempo e internet se abre en vivo; si
 * no, la tarjeta y el QR quedan como recomendación para el público.
 *
 * Nota: muchas herramientas requieren un clic dentro del iframe para que suene
 * el audio (política de autoplay de los navegadores). Es esperable.
 */
export interface WebEmbedProps {
  /** URL de la herramienta externa. */
  url: string
  /** Título accesible / barra superior. */
  title: string
  /** Gancho breve que se ve antes de abrir. */
  hook: string
  /** QR opcional (data URI o import de SVG) hacia la misma URL. */
  qrSrc?: string
  /** Texto de la barra superior (derecha). */
  cornerLabel?: string
  /** Etiqueta del botón para abrir. */
  openLabel?: string
  className?: string
}

export default function WebEmbed({
  url,
  title,
  hook,
  qrSrc,
  cornerLabel = 'WEB',
  openLabel = 'ABRIR EN VIVO',
  className = '',
}: WebEmbedProps) {
  const [active, setActive] = useState(false)

  return (
    <div className={`pixel-bevel overflow-hidden bg-[#0F172A] ${className}`}>
      {/* Barra superior tipo cartucho/consola 16-bit */}
      <div className="flex items-center justify-between border-b-2 border-[#0F172A] bg-[#A3E635] px-2.5 py-1">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 border-2 border-[#0F172A] bg-[#FACC15]" />
          <span className="h-2.5 w-2.5 border-2 border-[#0F172A] bg-[#38BDF8]" />
          <span className="ml-1 font-pixel text-[9px] font-bold tracking-widest text-[#0F172A]">
            {title}
          </span>
        </div>
        <span className="font-pixel text-[9px] font-bold text-[#0F172A]">{cornerLabel}</span>
      </div>

      {active ? (
        <iframe
          className="h-[58vh] max-h-[560px] w-full bg-white"
          src={url}
          title={title}
          loading="lazy"
          allow="autoplay; encrypted-media"
        />
      ) : (
        <div className="flex flex-col items-center gap-3 bg-gradient-to-br from-[#1E293B] to-[#0F172A] p-4 text-center sm:flex-row sm:text-left">
          {qrSrc && (
            <img
              src={qrSrc}
              alt={`Código QR hacia ${title}`}
              width={88}
              height={88}
              className="h-20 w-20 shrink-0 bg-white p-1 [image-rendering:pixelated] sm:h-24 sm:w-24"
            />
          )}
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <span className="font-mono text-[11px] font-bold leading-snug text-[#E2E8F0] sm:text-xs">
              {hook}
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <button
                type="button"
                data-no-swipe="true"
                onClick={() => setActive(true)}
                className="arcade-btn inline-flex items-center gap-1.5"
              >
                <PixelGlyph name="play" />
                {openLabel}
              </button>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                data-no-swipe="true"
                className="font-pixel text-[9px] font-bold uppercase tracking-widest text-[#A3E635] underline-offset-2 hover:underline"
              >
                o escanea / visita ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
