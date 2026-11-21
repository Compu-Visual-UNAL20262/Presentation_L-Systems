import { ConceptFrame } from './shared'

/**
 * Slide 08 — De Letras a Píxeles: La Tortuga.
 * Cursor vectorial SVG + 3 comandos: F (avanza), + (izquierda), - (derecha).
 */

function CommandCard({
  sym,
  label,
  color,
  children,
}: {
  sym: string
  label: string
  color: string
  children: React.ReactNode
}) {
  return (
    <div className="pixel-bevel bg-surface p-5 text-center">
      <div className="flex justify-center">{children}</div>
      <div className="mt-3 font-pixel text-2xl" style={{ color }}>
        {sym}
      </div>
      <div className="mt-1 font-display text-sm text-slate-400">{label}</div>
    </div>
  )
}

export default function Slide08Turtle() {
  return (
    <ConceptFrame badge="ACTO III" accent="amber" title="De Letras a Píxeles: La Tortuga">
      <div className="flex w-full max-w-4xl flex-col items-center gap-8">
        {/* Cursor vectorial (tortuga con lápiz) */}
        <svg viewBox="0 0 120 80" className="h-24 animate-float-y">
          <path d="M20 60 L60 60" stroke="#F39C12" strokeWidth="3" strokeLinecap="round" />
          <circle cx="60" cy="60" r="5" fill="#2ECC71" />
          {/* flecha de rumbo */}
          <path d="M60 60 L92 34" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
          <path d="M92 34 l-10 1 l4 9 Z" fill="#38BDF8" />
        </svg>

        <div className="grid w-full gap-4 sm:grid-cols-3">
          <CommandCard sym="F" label="avanza" color="#F39C12">
            <svg viewBox="0 0 48 48" className="h-12 w-12">
              <path d="M24 40 L24 10" stroke="#F39C12" strokeWidth="3" strokeLinecap="round" />
              <path d="M24 10 l-6 8 M24 10 l6 8" stroke="#F39C12" strokeWidth="3" fill="none" />
            </svg>
          </CommandCard>
          <CommandCard sym="+" label="izquierda" color="#2ECC71">
            <svg viewBox="0 0 48 48" className="h-12 w-12">
              <path d="M34 34 A18 18 0 0 1 14 20" fill="none" stroke="#2ECC71" strokeWidth="3" />
              <path d="M14 20 l-2 9 l9 -2 Z" fill="#2ECC71" />
            </svg>
          </CommandCard>
          <CommandCard sym="−" label="derecha" color="#EC4899">
            <svg viewBox="0 0 48 48" className="h-12 w-12">
              <path d="M14 34 A18 18 0 0 0 34 20" fill="none" stroke="#EC4899" strokeWidth="3" />
              <path d="M34 20 l2 9 l-9 -2 Z" fill="#EC4899" />
            </svg>
          </CommandCard>
        </div>
      </div>
    </ConceptFrame>
  )
}
