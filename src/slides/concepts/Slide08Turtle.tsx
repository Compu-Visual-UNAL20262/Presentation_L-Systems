import { ConceptFrame } from './shared'
import YouTubeEmbed from '../../components/YouTubeEmbed'

/**
 * Slide 08 — De Letras a Píxeles: La Tortuga.
 * Video de fondo sobre la belleza de la geometría fractal (Wild Math · SoME2,
 * desde 0:50) + los 3 comandos de la tortuga: F (avanza), + (gira +δ), - (−δ).
 */

function CommandCard({
  sym,
  label,
  pillBg,
  children,
}: {
  sym: string
  label: string
  pillBg: string
  children: React.ReactNode
}) {
  return (
    <div className="pixel-bevel bg-white p-3 text-center sm:p-4">
      <div className="flex justify-center">{children}</div>
      <div className="mt-2">
        <span className={`inline-block pixel-bevel-sm ${pillBg} px-3 py-0.5 font-pixel text-lg font-bold text-[#0F172A]`}>
          {sym}
        </span>
      </div>
      <div className="mt-1.5 font-display text-xs font-bold text-[#0F172A] sm:text-sm">{label}</div>
    </div>
  )
}

export default function Slide08Turtle() {
  return (
    <ConceptFrame badge="LA TORTUGA" accent="amber" title="De Letras a Píxeles: La Tortuga">
      <div className="grid w-full max-w-5xl items-center gap-3 overflow-y-auto sm:grid-cols-5 sm:gap-5 sm:overflow-visible">
        {/* Video de fondo: la belleza de la geometría fractal (SoME2) */}
        <div className="sm:col-span-3">
          <YouTubeEmbed
            videoId="YkApFcYsP30"
            title="The Beauty of Fractal Geometry — Wild Math (SoME2)"
            start={50}
            caption="La belleza de la geometría fractal · Wild Math (SoME2)"
            badgeLabel="VIDEO · FRACTALES"
            cornerLabel="▶ SoME2"
          />
        </div>

        {/* Comandos de la tortuga + crédito */}
        <div className="flex flex-col gap-3 sm:col-span-2">
          <div className="pixel-bevel-sm flex flex-wrap items-center justify-center gap-x-2 gap-y-1 bg-[#FEF9C3] px-3 py-1.5 text-center">
            <span className="font-pixel text-[9px] font-bold uppercase tracking-widest text-[#B45309]">
              Idea de
            </span>
            <span className="font-display text-xs font-extrabold text-[#0F172A] sm:text-sm">
              Przemysław Prusinkiewicz
            </span>
            <span className="font-mono text-[10px] font-bold text-[#334155]">· años 1980</span>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <CommandCard sym="F" label="avanza" pillBg="bg-[#FACC15]">
              <svg viewBox="0 0 48 48" className="h-9 w-9 sm:h-11 sm:w-11">
                <path d="M24 40 L24 10" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M24 10 l-6 8 M24 10 l6 8" stroke="#0F172A" strokeWidth="3.5" fill="none" />
              </svg>
            </CommandCard>
            <CommandCard sym="+" label="gira +δ" pillBg="bg-[#A3E635]">
              <svg viewBox="0 0 48 48" className="h-9 w-9 sm:h-11 sm:w-11">
                <path d="M34 34 A18 18 0 0 1 14 20" fill="none" stroke="#15803D" strokeWidth="3.5" />
                <path d="M14 20 l-2 9 l9 -2 Z" fill="#15803D" />
              </svg>
            </CommandCard>
            <CommandCard sym="−" label="gira −δ" pillBg="bg-[#F472B6]">
              <svg viewBox="0 0 48 48" className="h-9 w-9 sm:h-11 sm:w-11">
                <path d="M14 34 A18 18 0 0 0 34 20" fill="none" stroke="#BE185D" strokeWidth="3.5" />
                <path d="M34 20 l2 9 l-9 -2 Z" fill="#BE185D" />
              </svg>
            </CommandCard>
          </div>
        </div>
      </div>
    </ConceptFrame>
  )
}
