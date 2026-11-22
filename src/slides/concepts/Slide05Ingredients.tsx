import { ConceptFrame, RuleBadge } from './shared'

/**
 * Slide 05 — Los 3 Ingredientes.
 * 3 tarjetas 16-bit de día con íconos SVG: Alfabeto, Axioma, Reglas.
 * Cada tarjeta muestra además el valor concreto del ejemplo del alga, para
 * que la gramática formal (V, ω, P) quede visible y no solo narrada.
 */

function AlphabetIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12">
      <rect x="6" y="8" width="14" height="14" rx="2" fill="#FACC15" stroke="#0F172A" strokeWidth="2" />
      <rect x="28" y="8" width="14" height="14" rx="2" fill="#38BDF8" stroke="#0F172A" strokeWidth="2" />
      <rect x="6" y="26" width="14" height="14" rx="2" fill="#A3E635" stroke="#0F172A" strokeWidth="2" />
      <rect x="28" y="26" width="14" height="14" rx="2" fill="#F472B6" stroke="#0F172A" strokeWidth="2" />
    </svg>
  )
}

function SeedIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12">
      <ellipse cx="24" cy="30" rx="9" ry="13" fill="#22C55E" stroke="#0F172A" strokeWidth="2" />
      <path d="M24 17 q6 -8 2 -13 q-8 4 -2 13 Z" fill="#A3E635" stroke="#0F172A" strokeWidth="2" />
    </svg>
  )
}

function RulesIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12">
      <circle cx="12" cy="24" r="6" fill="#F472B6" stroke="#0F172A" strokeWidth="2" />
      <path d="M21 24 h11" stroke="#0F172A" strokeWidth="2.5" />
      <path d="M28 19 l5 5 l-5 5" fill="none" stroke="#0F172A" strokeWidth="2.5" />
      <circle cx="39" cy="15" r="5" fill="#38BDF8" stroke="#0F172A" strokeWidth="2" />
      <circle cx="39" cy="33" r="5" fill="#A3E635" stroke="#0F172A" strokeWidth="2" />
    </svg>
  )
}

const CARDS = [
  { sym: 'V', name: 'Alfabeto', note: 'Las piezas', value: '{ A, B }', icon: <AlphabetIcon />, pill: 'bg-[#FACC15]' },
  { sym: 'ω', name: 'Axioma', note: 'La semilla', value: 'A', icon: <SeedIcon />, pill: 'bg-[#A3E635]' },
  { sym: 'P', name: 'Reglas', note: 'La evolución', value: 'A → AB · B → A', icon: <RulesIcon />, pill: 'bg-[#F472B6]' },
]

export default function Slide05Ingredients() {
  return (
    <ConceptFrame badge="ACTO II" accent="emerald" title="Los 3 Ingredientes">
      <div className="grid w-full max-w-4xl gap-4 sm:grid-cols-3">
        {CARDS.map((c, i) => (
          <div
            key={c.name}
            className="pixel-bevel bg-white p-6 text-center animate-fade-up"
            style={{ animationDelay: `${0.1 + i * 0.12}s` }}
          >
            <div className="flex justify-center animate-float-y" style={{ animationDelay: `${i * 0.4}s` }}>
              {c.icon}
            </div>
            <div className="mt-4">
              <span className={`inline-block pixel-bevel-sm ${c.pill} px-2.5 py-0.5 font-pixel text-xs font-bold text-[#0F172A]`}>
                {c.sym}
              </span>
            </div>
            <div className="mt-2 font-display text-xl font-bold text-[#0F172A]">{c.name}</div>
            <div className="font-display text-sm font-semibold text-[#334155]">{c.note}</div>
            <div className="mt-3">
              <RuleBadge className="!text-xs">{c.value}</RuleBadge>
            </div>
          </div>
        ))}
      </div>
    </ConceptFrame>
  )
}
