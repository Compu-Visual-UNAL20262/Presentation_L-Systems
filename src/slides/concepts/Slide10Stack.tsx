import { ConceptFrame } from './shared'

/**
 * Slide 10 — El Superpoder de Recordar: [ y ].
 * Diagrama de pila LIFO con pin de ubicación: Guardar [ → Explorar → Volver ].
 */

function Step({
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
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-16 w-16 items-center justify-center pixel-bevel bg-white">
        {children}
      </div>
      <span className={`pixel-bevel-sm ${pillBg} px-2.5 py-0.5 font-pixel text-base font-bold text-[#0F172A]`}>
        {sym}
      </span>
      <span className="font-display text-xs font-bold text-[#0F172A]">{label}</span>
    </div>
  )
}

function Arrow() {
  return (
    <svg viewBox="0 0 40 24" className="h-5 w-10 text-[#0F172A] animate-slide-right">
      <path d="M2 12 H30" stroke="currentColor" strokeWidth="3" />
      <path d="M28 5 l9 7 l-9 7" fill="none" stroke="currentColor" strokeWidth="3" />
    </svg>
  )
}

const STACK_COLORS = ['bg-[#FACC15]', 'bg-[#A3E635]', 'bg-[#38BDF8]']

export default function Slide10Stack() {
  return (
    <ConceptFrame badge="ACTO III" accent="amber" title="El Superpoder de Recordar: [ y ]">
      <div className="flex w-full max-w-3xl flex-col items-center gap-6">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <Step sym="[" label="guardar (push)" pillBg="bg-[#FACC15]">
            <svg viewBox="0 0 32 32" className="h-8 w-8">
              <path
                d="M16 3 a9 9 0 0 1 9 9 c0 7 -9 17 -9 17 s-9 -10 -9 -17 a9 9 0 0 1 9 -9 Z"
                fill="#F43F5E"
                stroke="#0F172A"
                strokeWidth="2"
              />
              <circle cx="16" cy="12" r="3.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
            </svg>
          </Step>
          <Arrow />
          <Step sym="↳" label="explorar rama" pillBg="bg-[#A3E635]">
            <svg viewBox="0 0 32 32" className="h-8 w-8">
              <path d="M16 28 V14" stroke="#14532D" strokeWidth="3" />
              <path d="M16 18 l8 -8 M16 16 l-7 -6" stroke="#16A34A" strokeWidth="3" />
            </svg>
          </Step>
          <Arrow />
          <Step sym="]" label="volver (pop)" pillBg="bg-[#38BDF8]">
            <svg viewBox="0 0 32 32" className="h-8 w-8">
              <path d="M24 16 A8 8 0 1 1 16 8" fill="none" stroke="#0284C7" strokeWidth="3" />
              <path d="M16 8 l-1 6 l6 -1 Z" fill="#0284C7" />
            </svg>
          </Step>
        </div>

        {/* Pila LIFO estilo bloques 16-bit */}
        <div className="pixel-bevel bg-white px-6 py-4 flex flex-col items-center">
          <span className="mb-2 font-pixel text-[10px] font-bold tracking-widest text-[#0F172A]">
            ★ PILA LIFO (CHECKPOINTS)
          </span>
          <div className="flex flex-col-reverse gap-1.5">
            {['estado 1 (tronco)', 'estado 2 (rama)', 'estado 3 (brote)'].map((s, i) => (
              <div
                key={s}
                className={`pixel-bevel-sm ${STACK_COLORS[i]} px-5 py-1 text-center font-mono text-xs font-extrabold text-[#0F172A] animate-fade-up`}
                style={{ animationDelay: `${i * 0.15}s`, width: `${200 - i * 18}px` }}
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
