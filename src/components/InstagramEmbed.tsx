import { useState } from 'react'
import PixelGlyph from './PixelGlyph'

/**
 * Reproductor de Reel de Instagram embebido con estética 16-bit de día,
 * coherente con <YouTubeEmbed>. Carga perezosa: hasta que el expositor pulsa
 * play se muestra una tarjeta-cartucho (autor + gancho del reel) y NO se inserta
 * ningún iframe ni script de Instagram. Al pulsar, se carga el iframe oficial
 * `instagram.com/<tipo>/<id>/embed`, que no requiere el script `embed.js` ni
 * cookies de terceros hasta ese momento.
 *
 * Instagram no expone una miniatura pública sin API autenticada, por eso el
 * "póster" es una tarjeta con el texto del reel en lugar de una imagen.
 */
export interface InstagramEmbedProps {
  /** Código corto del reel/post (p. ej. "Df7IzoEPjaV"). */
  shortcode: string
  /** Tipo de contenido para la URL de embed. */
  kind?: 'reel' | 'p' | 'tv'
  /** @usuario del autor, para dar crédito en la tarjeta. */
  author: string
  /** Gancho / descripción breve que se ve antes de reproducir. */
  hook: string
  /** Pie de tarjeta corto. */
  caption?: string
  /** Texto de la barra superior (derecha). */
  cornerLabel?: string
  className?: string
}

export default function InstagramEmbed({
  shortcode,
  kind = 'reel',
  author,
  hook,
  caption,
  cornerLabel = 'REEL',
  className = '',
}: InstagramEmbedProps) {
  const [active, setActive] = useState(false)

  // El iframe oficial de embed de Instagram (sin chrome de navegación).
  const src = `https://www.instagram.com/${kind}/${shortcode}/embed/`

  return (
    <div className={`pixel-bevel overflow-hidden bg-[#0F172A] ${className}`}>
      {/* Barra superior tipo cartucho/consola 16-bit */}
      <div className="flex items-center justify-between border-b-2 border-[#0F172A] bg-[#F472B6] px-2.5 py-1">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 border-2 border-[#0F172A] bg-[#FACC15]" />
          <span className="h-2.5 w-2.5 border-2 border-[#0F172A] bg-[#A3E635]" />
          <span className="ml-1 font-pixel text-[9px] font-bold tracking-widest text-[#0F172A]">
            INSTAGRAM · {author}
          </span>
        </div>
        <span className="font-pixel text-[9px] font-bold text-[#0F172A]">{cornerLabel}</span>
      </div>

      {/* Reels son verticales (9:16); limitamos la altura para que quepan. */}
      <div className="relative w-full bg-black">
        {active ? (
          <iframe
            className="h-[60vh] max-h-[560px] w-full sm:h-[70vh]"
            src={src}
            title={`Reel de Instagram de ${author}`}
            loading="lazy"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            scrolling="no"
          />
        ) : (
          <button
            type="button"
            data-no-swipe="true"
            onClick={() => setActive(true)}
            aria-label={`Reproducir reel de ${author}`}
            className="group flex w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#1E293B] to-[#0F172A] p-5 text-center"
          >
            <span className="font-mono text-xs font-bold leading-snug text-[#E2E8F0] sm:text-sm">
              {hook}
            </span>
            <span
              className="flex h-14 w-14 items-center justify-center pixel-bevel bg-[#FACC15]
                text-[#0F172A] transition-transform group-hover:scale-110 sm:h-16 sm:w-16"
            >
              <PixelGlyph name="play" size={22} />
            </span>
            <span className="font-pixel text-[9px] font-bold uppercase tracking-widest text-[#A3E635]">
              Pulsa para ver el reel
            </span>
          </button>
        )}
      </div>

      {caption && (
        <div className="border-t-2 border-[#0F172A] bg-white px-2.5 py-1 text-center">
          <span className="font-mono text-[10px] font-bold text-[#0F172A] sm:text-xs">{caption}</span>
        </div>
      )}
    </div>
  )
}
