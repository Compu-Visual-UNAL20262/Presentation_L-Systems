import { ConceptFrame } from './shared'

/**
 * Slide 05 — Los 3 Ingredientes.
 * 3 tarjetas pixel-tech con íconos SVG: Alfabeto, Axioma, Reglas.
 */

function AlphabetIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12">
      <rect x="6" y="8" width="14" height="14" rx="2" fill="#F39C12" />
      <rect x="28" y="8" width="14" height="14" rx="2" fill="#38BDF8" />
      <rect x="6" y="26" width="14" height="14" rx="2" fill="#2ECC71" />
      <rect x="28" y="26" width="14" height="14" rx="2" fill="#EC4899" />
    </svg>
  )
}

function SeedIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12">
      <ellipse cx="24" cy="30" rx="9" ry="13" fill="#2ECC71" />
      <path d="M24 17 q6 -8 2 -13 q-8 4 -2 13 Z" fill="#6B8E23" />
    </svg>
  )
}

function RulesIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12">
      <circle cx="13" cy="24" r="6" fill="#EC4899" />
      <path d="M22 24 h12" stroke="#94A3B8" strokeWidth="2" />
      <path d="M30 20 l4 4 l-4 4" fill="none" stroke="#94A3B8" strokeWidth="2" />
      <circle cx="40" cy="16" r="4" fill="#38BDF8" />
      <circle cx="40" cy="32" r="4" fill="#2ECC71" />
    </svg>
  )
}

const CARDS = [
  { sym: 'V', name: 'Alfabeto', note: 'Las piezas', icon: <AlphabetIcon />, accent: 'border-neon-amber' },
  { sym: 'ω', name: 'Axioma', note: 'La semilla', icon: <SeedIcon />, accent: 'border-neon-emerald' },
  { sym: 'P', name: 'Reglas', note: 'La evolución', icon: <RulesIcon />, accent: 'border-neon-magenta' },
]

export default function Slide05Ingredients() {
  return (
    <ConceptFrame badge="ACTO II" accent="emerald" title="Los 3 Ingredientes">
      <div className="grid w-full max-w-4xl gap-4 sm:grid-cols-3">
        {CARDS.map((c, i) => (
          <div
            key={c.name}
            className={`pixel-bevel border-t-2 ${c.accent} bg-surface p-6 text-center animate-fade-up`}
            style={{ animationDelay: `${0.1 + i * 0.12}s` }}
          >
            <div className="flex justify-center animate-float-y" style={{ animationDelay: `${i * 0.4}s` }}>
              {c.icon}
            </div>
            <div className="mt-4 font-pixel text-xs text-slate-500">{c.sym}</div>
            <div className="mt-1 font-display text-xl font-semibold text-slate-100">{c.name}</div>
            <div className="font-display text-sm text-slate-400">{c.note}</div>
          </div>
        ))}
      </div>
    </ConceptFrame>
  )
}
