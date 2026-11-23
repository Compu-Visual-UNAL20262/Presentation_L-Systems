import { useState } from 'react'

/**
 * Reproductor de YouTube embebido con estética 16-bit de día coherente con el
 * resto de la presentación (marco pixel-bevel, tinta #0F172A, acentos de la
 * paleta). Carga perezosa (lite-embed): muestra la miniatura con un botón de
 * play y solo inserta el <iframe> al hacer clic, de modo que no se descarga
 * YouTube hasta que el expositor lo pide.
 *
 * Usa el dominio youtube-nocookie.com (sin cookies de seguimiento) y permite
 * recortar el clip con `start` y `end` (en segundos).
 */
export interface YouTubeEmbedProps {
  /** ID del video de YouTube (p. ej. "nLtmEjqzg7M"). */
  videoId: string
  /** Título accesible del reproductor. */
  title: string
  /** Segundo de inicio del clip. */
  start?: number
  /** Segundo de fin del clip. */
  end?: number
  /** Etiqueta corta sobre el reproductor (sin texto denso). */
  caption?: string
  className?: string
}

export default function YouTubeEmbed({
  videoId,
  title,
  start,
  end,
  caption,
  className = '',
}: YouTubeEmbedProps) {
  const [active, setActive] = useState(false)

  const params = new URLSearchParams({
    autoplay: '1',
    // Arranca en silencio: el trailer queda de fondo mientras se exponen los
    // temas. Los navegadores además exigen mute para permitir autoplay.
    mute: '1',
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
  })
  if (start != null) params.set('start', String(start))
  if (end != null) params.set('end', String(end))

  const src = `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`
  const poster = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`

  return (
    <div className={`pixel-bevel overflow-hidden bg-[#0F172A] ${className}`}>
      {/* Barra superior tipo cartucho/consola 16-bit */}
      <div className="flex items-center justify-between border-b-2 border-[#0F172A] bg-[#38BDF8] px-2.5 py-1">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 border-2 border-[#0F172A] bg-[#FACC15]" />
          <span className="h-2.5 w-2.5 border-2 border-[#0F172A] bg-[#A3E635]" />
          <span className="ml-1 font-pixel text-[9px] font-bold tracking-widest text-[#0F172A]">
            VIDEO · NO MAN&apos;S SKY
          </span>
        </div>
        <span className="font-pixel text-[9px] font-bold text-[#0F172A]">▶ TRAILER</span>
      </div>

      <div className="relative aspect-video w-full bg-black">
        {active ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={src}
            title={title}
            loading="lazy"
            allow="accelerated-performance; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            data-no-swipe="true"
            onClick={() => setActive(true)}
            aria-label={`Reproducir: ${title}`}
            className="group absolute inset-0 h-full w-full cursor-pointer"
          >
            <img
              src={poster}
              alt={title}
              className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
              loading="lazy"
            />
            {/* Botón play pixel-art centrado */}
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span
                className="flex h-14 w-14 items-center justify-center pixel-bevel bg-[#FACC15]
                  text-xl text-[#0F172A] transition-transform group-hover:scale-110 sm:h-16 sm:w-16"
              >
                ▶
              </span>
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
