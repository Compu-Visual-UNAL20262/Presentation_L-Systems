import { useState } from 'react'
import { ConceptFrame } from './shared'
import PixelPhoto from '../../components/PixelPhoto'
import YouTubeEmbed from '../../components/YouTubeEmbed'
import WebEmbed from '../../components/WebEmbed'
import gameFlora from '../../assets/game-flora.webp'
import cityProcedural from '../../assets/city-procedural.webp'
import artFractal from '../../assets/art-fractal.webp'
import qrMusicalator from '../../assets/qr-musicalator.svg'

/**
 * Slide 26 — Mundos Infinitos en Pocos Kilobytes.
 * Reproductor del trailer de No Man's Sky (en bucle desde 0:18) como pieza
 * central + 3 tarjetas 16-bit con capturas reales: Videojuegos, Ciudades
 * (Parish & Müller) y Arte & Ciencia. Esta última abre, a demanda, el generador
 * de música fractal "Musicalator" (iframe perezoso) o su QR como recomendación.
 */

export default function Slide20Applications() {
  const [musicOpen, setMusicOpen] = useState(false)

  return (
    <ConceptFrame badge="IMPACTO REAL" accent="emerald" title="Mundos Infinitos en Pocos Kilobytes">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-3 overflow-y-auto sm:overflow-visible">
        <div className="grid w-full place-items-center gap-3 sm:grid-cols-5 sm:items-center sm:gap-4">
        {/* Pieza central: trailer de No Man's Sky en bucle desde 0:18 */}
        <div className="w-full sm:col-span-3">
          <YouTubeEmbed
            videoId="nLtmEjqzg7M"
            title="No Man's Sky — flora generada proceduralmente (en bucle desde 0:18)"
            start={18}
            loop
            caption="No Man's Sky: cada planeta cultiva su flora con una semilla + L-System"
          />
        </div>

        {/* Columna de aplicaciones (3 tarjetas compactas) */}
        <div className="grid w-full gap-3 sm:col-span-2 sm:gap-3">
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

          {/* STAGE 03 — Arte & Ciencia. Botón: abre el generador de música
              fractal (Musicalator) o su QR como recomendación. */}
          <button
            type="button"
            data-no-swipe="true"
            onClick={() => setMusicOpen((o) => !o)}
            aria-expanded={musicOpen}
            className="pixel-bevel bg-white overflow-hidden text-center animate-fade-up transition-colors hover:bg-[#FEF9C3]"
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
                <div className="mt-0.5 font-pixel text-[8px] font-bold uppercase tracking-widest text-[#BE185D]">
                  {musicOpen ? '▾ ocultar música fractal' : '▸ música fractal en vivo'}
                </div>
              </div>
            </div>
          </button>
        </div>
        </div>

        {/* Panel desplegable: generador de música fractal (Musicalator). */}
        {musicOpen && (
          <div className="w-full max-w-3xl animate-fade-up">
            <WebEmbed
              url="https://icefractal.com/musicalator/"
              title="MUSICALATOR · ICE FRACTAL"
              hook="Genera música a partir de fractales binarios (triángulo de Pascal): patrones musicales autosimilares. Mismo principio que vimos, pero en sonido."
              qrSrc={qrMusicalator}
              cornerLabel="MÚSICA FRACTAL"
              openLabel="ABRIR EN VIVO"
              className="w-full"
            />
          </div>
        )}
      </div>
    </ConceptFrame>
  )
}

