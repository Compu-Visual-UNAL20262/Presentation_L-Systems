import { ConceptFrame } from './shared'
import PixelPhoto from '../../components/PixelPhoto'
import gameFlora from '../../assets/game-flora.webp'
import cityProcedural from '../../assets/city-procedural.webp'

/**
 * Slide 20 — Mundos Infinitos en Pocos Kilobytes.
 * 3 tarjetas 16-bit de día. Videojuegos y Ciudades usan capturas reales;
 * Agronomía & Arte mantiene ícono vectorial (sin imagen disponible).
 */

function CropIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12">
      <path d="M24 42 V18" stroke="#14532D" strokeWidth="3" />
      <path d="M24 28 q-10 -4 -12 -14 q10 2 12 12 Z" fill="#22C55E" stroke="#0F172A" strokeWidth="2" />
      <path d="M24 24 q10 -4 12 -14 q-10 2 -12 12 Z" fill="#A3E635" stroke="#0F172A" strokeWidth="2" />
    </svg>
  )
}

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

        {/* STAGE 03 — Agronomía & Arte (sin imagen: ícono vectorial) */}
        <div className="pixel-bevel bg-white overflow-hidden text-center animate-fade-up" style={{ animationDelay: '0.34s' }}>
          <div className="border-b-2 border-[#0F172A] bg-[#FACC15] py-1 font-pixel text-[9px] font-bold text-[#0F172A]">
            STAGE 03
          </div>
          <div className="p-3 sm:p-5">
            <div className="flex justify-center animate-float-y" style={{ animationDelay: '0.8s' }}>
              <CropIcon />
            </div>
            <div className="mt-2 font-display text-base font-extrabold text-[#0F172A] sm:mt-3 sm:text-lg">
              Agronomía &amp; Arte
            </div>
            <div className="mt-0.5 font-display text-xs font-semibold text-[#334155]">
              Cultivos y música fractal
            </div>
          </div>
        </div>
      </div>
    </ConceptFrame>
  )
}
