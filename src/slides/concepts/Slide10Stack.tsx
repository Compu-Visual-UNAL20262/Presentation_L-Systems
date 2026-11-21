import { ConceptFrame } from './shared'

/**
 * Slide 10 — El Superpoder de Recordar: [ y ].
 * Diagrama de pila LIFO con pin de ubicación: Guardar [ → Explorar → Volver ].
 */

function Step({
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
    <div className="flex flex-col items-center gap-2">
      <div
        className="flex h-16 w-16 items-center justify-center pixel-bevel bg-surface"
        style={{ boxShadow: `0 0 14px -4px ${color}` }}
      >
        {children}
      </div>
      <span className="font-pixel text-lg" style={{ color }}>
        {sym}
      </span>
      <span className="font-display text-xs text-slate-400">{label}</span>
    </div>
  )
}

function Arrow() {
  return (
    <svg viewBox="0 0 40 24" className="h-5 w-10 text-slate-600 animate-slide-right">
      <path d="M2 12 H30" stroke="currentColor" strokeWidth="2" />
      <path d="M30 6 l8 6 l-8 6" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

export default function Slide10Stack() {
  return (
    <ConceptFrame badge="ACTO III" accent="amber" title="El Superpoder de Recordar: [ y ]">
      <div className="flex w-full max-w-3xl flex-col items-center gap-8">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <Step sym="[" label="guardar" color="#F39C12">
            {/* Pin de ubicación */}
            <svg viewBox="0 0 32 32" className="h-8 w-8">
              <path d="M16 3 a9 9 0 0 1 9 9 c0 7 -9 17 -9 17 s-9 -10 -9 -17 a9 9 0 0 1 9 -9 Z" fill="#F39C12" />
              <circle cx="16" cy="12" r="3.5" fill="#131A2A" />
            </svg>
          </Step>
          <Arrow />
          <Step sym="↳" label="explorar rama" color="#2ECC71">
            <svg viewBox="0 0 32 32" className="h-8 w-8">
              <path d="M16 28 V14" stroke="#2ECC71" strokeWidth="2.5" />
              <path d="M16 18 l8 -8 M16 16 l-7 -6" stroke="#6B8E23" strokeWidth="2.5" />
            </svg>
          </Step>
          <Arrow />
          <Step sym="]" label="volver al tronco" color="#38BDF8">
            <svg viewBox="0 0 32 32" className="h-8 w-8">
              <path d="M24 16 A8 8 0 1 1 16 8" fill="none" stroke="#38BDF8" strokeWidth="2.5" />
              <path d="M16 8 l-1 6 l6 -1 Z" fill="#38BDF8" />
            </svg>
          </Step>
        </div>

        {/* Pila LIFO */}
        <div className="flex flex-col items-center">
          <span className="mb-1 font-pixel text-[10px] tracking-widest text-slate-500">PILA LIFO</span>
          <div className="flex flex-col-reverse gap-1">
            {['estado 1', 'estado 2', 'estado 3'].map((s, i) => (
              <div
                key={s}
                className="pixel-bevel bg-base px-6 py-1.5 font-mono text-xs text-slate-400 animate-fade-up"
                style={{ animationDelay: `${i * 0.15}s`, width: `${160 - i * 24}px` }}
              >
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>
    </ConceptFrame>
  )
}
