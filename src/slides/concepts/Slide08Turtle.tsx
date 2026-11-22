import { ConceptFrame } from './shared'

/**
 * Slide 08 — De Letras a Píxeles: La Tortuga.
 * Cursor vectorial SVG + 3 comandos: F (avanza), + (gira +δ), - (gira −δ).
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
    <div className="pixel-bevel bg-white p-5 text-center">
      <div className="flex justify-center">{children}</div>
      <div className="mt-3">
        <span className={`inline-block pixel-bevel-sm ${pillBg} px-3 py-0.5 font-pixel text-xl font-bold text-[#0F172A]`}>
          {sym}
        </span>
      </div>
      <div className="mt-2 font-display text-sm font-bold text-[#0F172A]">{label}</div>
    </div>
  )
}

export default function Slide08Turtle() {
  return (
    <ConceptFrame badge="ACTO III" accent="amber" title="De Letras a Píxeles: La Tortuga">
      <div className="flex w-full max-w-4xl flex-col items-center gap-6">
        {/* Cursor vectorial (tortuga con lápiz en tarjeta clara) */}
        <div className="pixel-bevel-sm bg-white px-6 py-2">
          <svg viewBox="0 0 140 72" className="h-20 animate-float-y">
            <path d="M18 54 L68 54" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" strokeDasharray="5 5" />
            <circle cx="68" cy="54" r="9" fill="#22C55E" stroke="#0F172A" strokeWidth="2.5" />
            <circle cx="68" cy="54" r="4" fill="#FACC15" />
            {/* flecha de rumbo */}
            <path d="M68 54 L108 22" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
            <path d="M108 22 l-12 2 l5 10 Z" fill="#38BDF8" stroke="#0F172A" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="grid w-full gap-4 sm:grid-cols-3">
          <CommandCard sym="F" label="avanza" pillBg="bg-[#FACC15]">
            <svg viewBox="0 0 48 48" className="h-12 w-12">
              <path d="M24 40 L24 10" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M24 10 l-6 8 M24 10 l6 8" stroke="#0F172A" strokeWidth="3.5" fill="none" />
            </svg>
          </CommandCard>
          <CommandCard sym="+" label="gira +δ" pillBg="bg-[#A3E635]">
            <svg viewBox="0 0 48 48" className="h-12 w-12">
              <path d="M34 34 A18 18 0 0 1 14 20" fill="none" stroke="#15803D" strokeWidth="3.5" />
              <path d="M14 20 l-2 9 l9 -2 Z" fill="#15803D" />
            </svg>
          </CommandCard>
          <CommandCard sym="−" label="gira −δ" pillBg="bg-[#F472B6]">
            <svg viewBox="0 0 48 48" className="h-12 w-12">
              <path d="M14 34 A18 18 0 0 0 34 20" fill="none" stroke="#BE185D" strokeWidth="3.5" />
              <path d="M34 20 l2 9 l-9 -2 Z" fill="#BE185D" />
            </svg>
          </CommandCard>
        </div>
      </div>
    </ConceptFrame>
  )
}
