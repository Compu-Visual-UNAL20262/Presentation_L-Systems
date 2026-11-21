import { ConceptFrame } from './shared'

/**
 * Slide 20 — Mundos Infinitos en Pocos Kilobytes.
 * 3 tarjetas: Videojuegos, Ciudades Procedurales, Agronomía & Arte.
 */

function GameIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12">
      <rect x="6" y="18" width="36" height="18" rx="9" fill="#38BDF8" />
      <circle cx="16" cy="27" r="3" fill="#070A12" />
      <path d="M30 24 v6 M27 27 h6" stroke="#070A12" strokeWidth="2" />
    </svg>
  )
}

function CityIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12">
      <path d="M8 40 L24 8 L40 40" fill="none" stroke="#2ECC71" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M24 8 V40 M16 24 H32 M12 32 H36" stroke="#2ECC71" strokeWidth="2" opacity="0.7" />
    </svg>
  )
}

function CropIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12">
      <path d="M24 42 V18" stroke="#84CC16" strokeWidth="2.5" />
      <path d="M24 26 q-10 -4 -12 -14 q10 2 12 12 Z" fill="#2ECC71" />
      <path d="M24 22 q10 -4 12 -14 q-10 2 -12 12 Z" fill="#4ADE80" />
    </svg>
  )
}

const CARDS = [
  { icon: <GameIcon />, title: 'Videojuegos', note: 'SpeedTree · No Man\'s Sky', accent: 'border-neon-cyan' },
  { icon: <CityIcon />, title: 'Ciudades', note: 'Redes viales procedurales', accent: 'border-neon-emerald' },
  { icon: <CropIcon />, title: 'Agronomía & Arte', note: 'Cultivos y música fractal', accent: 'border-neon-amber' },
]

export default function Slide20Applications() {
  return (
    <ConceptFrame badge="ACTO VI" accent="emerald" title="Mundos Infinitos en Pocos Kilobytes">
      <div className="grid w-full max-w-4xl gap-4 sm:grid-cols-3">
        {CARDS.map((c, i) => (
          <div
            key={c.title}
            className={`pixel-bevel border-t-2 ${c.accent} bg-surface p-6 text-center animate-fade-up`}
            style={{ animationDelay: `${0.1 + i * 0.12}s` }}
          >
            <div className="flex justify-center animate-float-y" style={{ animationDelay: `${i * 0.4}s` }}>
              {c.icon}
            </div>
            <div className="mt-4 font-display text-lg font-semibold text-slate-100">{c.title}</div>
            <div className="mt-1 font-display text-xs text-slate-300">{c.note}</div>
          </div>
        ))}
      </div>
    </ConceptFrame>
  )
}
