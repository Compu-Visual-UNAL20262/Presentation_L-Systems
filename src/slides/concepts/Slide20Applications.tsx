import { ConceptFrame } from './shared'

/**
 * Slide 20 — Mundos Infinitos en Pocos Kilobytes.
 * 3 tarjetas 16-bit de día: Videojuegos, Ciudades Procedurales, Agronomía & Arte.
 */

function GameIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12">
      <rect x="6" y="16" width="36" height="20" rx="8" fill="#38BDF8" stroke="#0F172A" strokeWidth="2.5" />
      <circle cx="32" cy="24" r="2.5" fill="#FACC15" stroke="#0F172A" strokeWidth="1.5" />
      <circle cx="36" cy="28" r="2.5" fill="#F472B6" stroke="#0F172A" strokeWidth="1.5" />
      <path d="M16 22 v8 M12 26 h8" stroke="#0F172A" strokeWidth="2.5" />
    </svg>
  )
}

function CityIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12">
      <rect x="8" y="8" width="32" height="32" rx="4" fill="#ECFCCB" stroke="#0F172A" strokeWidth="2.5" />
      <path d="M8 24 H40 M24 8 V40 M16 8 V24 M32 24 V40" stroke="#15803D" strokeWidth="2.5" />
    </svg>
  )
}

function CropIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12">
      <path d="M24 42 V18" stroke="#14532D" strokeWidth="3" />
      <path d="M24 28 q-10 -4 -12 -14 q10 2 12 12 Z" fill="#22C55E" stroke="#0F172A" strokeWidth="2" />
      <path d="M24 24 q10 -4 12 -14 q-10 2 -12 12 Z" fill="#A3E635" stroke="#0F172A" strokeWidth="2" />
    </svg>
  )
}

const CARDS = [
  { icon: <GameIcon />, title: 'Videojuegos', note: 'SpeedTree · No Man\'s Sky', headerBg: 'bg-[#38BDF8]' },
  { icon: <CityIcon />, title: 'Ciudades', note: 'Redes viales procedurales', headerBg: 'bg-[#A3E635]' },
  { icon: <CropIcon />, title: 'Agronomía & Arte', note: 'Cultivos y música fractal', headerBg: 'bg-[#FACC15]' },
]

export default function Slide20Applications() {
  return (
    <ConceptFrame badge="ACTO VI" accent="emerald" title="Mundos Infinitos en Pocos Kilobytes">
      <div className="grid w-full max-w-4xl gap-4 sm:grid-cols-3">
        {CARDS.map((c, i) => (
          <div
            key={c.title}
            className="pixel-bevel bg-white overflow-hidden text-center animate-fade-up"
            style={{ animationDelay: `${0.1 + i * 0.12}s` }}
          >
            <div className={`border-b-2 border-[#0F172A] py-1 font-pixel text-[9px] font-bold text-[#0F172A] ${c.headerBg}`}>
              STAGE 0{i + 1}
            </div>
            <div className="p-5">
              <div className="flex justify-center animate-float-y" style={{ animationDelay: `${i * 0.4}s` }}>
                {c.icon}
              </div>
              <div className="mt-3 font-display text-lg font-extrabold text-[#0F172A]">{c.title}</div>
              <div className="mt-1 font-display text-xs font-semibold text-[#334155]">{c.note}</div>
            </div>
          </div>
        ))}
      </div>
    </ConceptFrame>
  )
}
