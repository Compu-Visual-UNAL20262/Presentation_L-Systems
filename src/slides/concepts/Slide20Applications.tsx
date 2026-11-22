import { ConceptFrame } from './shared'
import PixelPhoto from '../../components/PixelPhoto'
import gameFlora from '../../assets/game-flora.webp'
import cityProcedural from '../../assets/city-procedural.webp'
import artFractal from '../../assets/art-fractal.webp'

/**
 * Slide 20 — Mundos Infinitos en Pocos Kilobytes.
 * 3 tarjetas 16-bit de día con capturas reales: Videojuegos (flora procedural),
 * Ciudades (Parish & Müller) y Arte generativo fractal (galería de L-systems).
 */

export default function Slide20Applications() {
  return (
    <ConceptFrame badge="ACTO VI" accent="emerald" title="Mundos Infinitos en Pocos Kilobytes">
      <div className="grid w-full max-w-4xl gap-3 overflow-y-auto sm:grid-cols-3 sm:gap-4 sm:overflow-visible">
        {/* STAGE 01 — Videojuegos (captura de flora procedural) */}
        <div className="pixel-bevel bg-white overflow-hidden text-center animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <div className="border-b-2 border-[#0F172A] bg-[#38BDF8] py-1 font-pixel text-[9px] font-bold text-[#0F172A]">
            STAGE 01
          </div>
          <PixelPhoto
            src={gameFlora}
            alt="Flora alienígena generada proceduralmente en un juego de exploración"
            aspect="16 / 9"
            mobileMaxH="max-h-28"
            className="!border-0 !shadow-none !rounded-none"
          />
          <div className="p-2.5 sm:p-3">
            <div className="font-display text-base font-extrabold text-[#0F172A] sm:text-lg">Videojuegos</div>
            <div className="mt-0.5 font-display text-xs font-semibold text-[#334155]">
              SpeedTree · No Man&apos;s Sky
            </div>
          </div>
        </div>

        {/* STAGE 02 — Ciudades procedurales (Parish & Müller, 2001) */}
        <div className="pixel-bevel bg-white overflow-hidden text-center animate-fade-up" style={{ animationDelay: '0.22s' }}>
          <div className="border-b-2 border-[#0F172A] bg-[#A3E635] py-1 font-pixel text-[9px] font-bold text-[#0F172A]">
            STAGE 02
          </div>
          <PixelPhoto
            src={cityProcedural}
            alt="Ciudad virtual con ~26000 edificios generada con L-Systems"
            aspect="16 / 9"
            mobileMaxH="max-h-28"
            className="!border-0 !shadow-none !rounded-none"
          />
          <div className="p-2.5 sm:p-3">
            <div className="font-display text-base font-extrabold text-[#0F172A] sm:text-lg">Ciudades</div>
            <div className="mt-0.5 font-display text-xs font-semibold text-[#334155]">
              Parish &amp; Müller · redes viales
            </div>
          </div>
        </div>

        {/* STAGE 03 — Arte generativo fractal (galería de L-systems, CC0) */}
        <div className="pixel-bevel bg-white overflow-hidden text-center animate-fade-up" style={{ animationDelay: '0.34s' }}>
          <div className="border-b-2 border-[#0F172A] bg-[#FACC15] py-1 font-pixel text-[9px] font-bold text-[#0F172A]">
            STAGE 03
          </div>
          <PixelPhoto
            src={artFractal}
            alt="Galería de plantas y fractales generados con L-systems"
            aspect="16 / 9"
            mobileMaxH="max-h-28"
            className="!border-0 !shadow-none !rounded-none"
          />
          <div className="p-2.5 sm:p-3">
            <div className="font-display text-base font-extrabold text-[#0F172A] sm:text-lg">Arte &amp; Ciencia</div>
            <div className="mt-0.5 font-display text-xs font-semibold text-[#334155]">
              Fractales · agronomía · música
            </div>
          </div>
        </div>
      </div>
    </ConceptFrame>
  )
}
