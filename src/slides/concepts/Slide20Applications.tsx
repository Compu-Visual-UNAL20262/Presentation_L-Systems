import { ConceptFrame } from './shared'
import PixelPhoto from '../../components/PixelPhoto'
import YouTubeEmbed from '../../components/YouTubeEmbed'
import gameFlora from '../../assets/game-flora.webp'
import cityProcedural from '../../assets/city-procedural.webp'
import artFractal from '../../assets/art-fractal.webp'

/**
 * Slide 22 — Mundos Infinitos en Pocos Kilobytes.
 * Reproductor del trailer de No Man's Sky (clip 0:17–0:42, flora procedural en
 * vivo) como pieza central + 3 tarjetas 16-bit con capturas reales:
 * Videojuegos (flora procedural), Ciudades (Parish & Müller) y Arte generativo.
 */

export default function Slide20Applications() {
  return (
    <ConceptFrame badge="IMPACTO REAL" accent="emerald" title="Mundos Infinitos en Pocos Kilobytes">
      <div className="grid w-full max-w-5xl gap-3 overflow-y-auto sm:grid-cols-5 sm:items-start sm:gap-4 sm:overflow-visible">
        {/* Pieza central: trailer de No Man's Sky recortado a 0:17–0:42 */}
        <div className="sm:col-span-3">
          <YouTubeEmbed
            videoId="nLtmEjqzg7M"
            title="No Man's Sky — flora generada proceduralmente (clip 0:17–0:42)"
            start={17}
            end={42}
            caption="No Man's Sky: cada planeta cultiva su flora con una semilla + L-System"
          />
        </div>

        {/* Columna de aplicaciones (3 tarjetas compactas) */}
        <div className="grid gap-3 sm:col-span-2 sm:gap-3">
          {/* STAGE 01 — Videojuegos (captura de flora procedural) */}
          <div
            className="pixel-bevel bg-white overflow-hidden text-center animate-fade-up"
            style={{ animationDelay: '0.1s' }}
          >
            <div className="flex items-stretch">
              <PixelPhoto
                src={gameFlora}
                alt="Flora alienígena generada proceduralmente en un juego de exploración"
                aspect="1 / 1"
                mobileMaxH="max-h-20"
                className="!border-0 !shadow-none !rounded-none w-20 shrink-0 sm:w-24"
              />
              <div className="flex flex-1 flex-col justify-center border-l-2 border-[#0F172A] p-2 text-left">
                <div className="font-display text-sm font-extrabold text-[#0F172A] sm:text-base">
                  Videojuegos
                </div>
                <div className="font-display text-[11px] font-semibold text-[#334155]">
                  SpeedTree · No Man&apos;s Sky
                </div>
              </div>
            </div>
          </div>

          {/* STAGE 02 — Ciudades procedurales (Parish & Müller, 2001) */}
          <div
            className="pixel-bevel bg-white overflow-hidden text-center animate-fade-up"
            style={{ animationDelay: '0.22s' }}
          >
            <div className="flex items-stretch">
              <PixelPhoto
                src={cityProcedural}
                alt="Ciudad virtual con ~26000 edificios generada con L-Systems"
                aspect="1 / 1"
                mobileMaxH="max-h-20"
                className="!border-0 !shadow-none !rounded-none w-20 shrink-0 sm:w-24"
              />
              <div className="flex flex-1 flex-col justify-center border-l-2 border-[#0F172A] p-2 text-left">
                <div className="font-display text-sm font-extrabold text-[#0F172A] sm:text-base">
                  Ciudades
                </div>
                <div className="font-display text-[11px] font-semibold text-[#334155]">
                  Parish &amp; Müller · redes viales
                </div>
              </div>
            </div>
          </div>

          {/* STAGE 03 — Arte generativo fractal (galería de L-systems, CC0) */}
          <div
            className="pixel-bevel bg-white overflow-hidden text-center animate-fade-up"
            style={{ animationDelay: '0.34s' }}
          >
            <div className="flex items-stretch">
              <PixelPhoto
                src={artFractal}
                alt="Galería de plantas y fractales generados con L-systems"
                aspect="1 / 1"
                mobileMaxH="max-h-20"
                className="!border-0 !shadow-none !rounded-none w-20 shrink-0 sm:w-24"
              />
              <div className="flex flex-1 flex-col justify-center border-l-2 border-[#0F172A] p-2 text-left">
                <div className="font-display text-sm font-extrabold text-[#0F172A] sm:text-base">
                  Arte &amp; Ciencia
                </div>
                <div className="font-display text-[11px] font-semibold text-[#334155]">
                  Fractales · agronomía · música
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ConceptFrame>
  )
}
