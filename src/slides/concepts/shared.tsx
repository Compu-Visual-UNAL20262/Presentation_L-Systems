import type { ReactNode } from 'react'
import type { Accent } from '../../data/slidesConfig'
import { ACCENT } from '../../data/accent'

/** Badge pixel de Acto, reutilizado por todas las slides conceptuales. */
export function ActBadge({ label, accent }: { label: string; accent: Accent }) {
  const a = ACCENT[accent]
  return (
    <span
      className={`inline-block font-pixel text-[10px] tracking-widest uppercase
        px-2.5 py-1.5 pixel-bevel bg-surface ${a.text} border-l-2 ${a.border}`}
    >
      {label}
    </span>
  )
}

/**
 * Marco común de una slide conceptual: badge de Acto arriba, título grande,
 * y debajo el apoyo visual (diagrama SVG). Centrado y responsivo.
 */
export function ConceptFrame({
  badge,
  accent,
  title,
  children,
}: {
  badge: string
  accent: Accent
  title: ReactNode
  children: ReactNode
}) {
  const a = ACCENT[accent]
  return (
    <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden px-5 pb-16 pt-14 sm:px-10">
      <div className="animate-fade-up flex min-h-0 w-full max-w-5xl flex-col items-center">
        <ActBadge label={badge} accent={accent} />
        <h2
          className={`mt-4 text-center font-display text-xl font-bold leading-tight
            sm:text-3xl lg:text-5xl ${a.text}`}
        >
          {title}
        </h2>
        <div className="mt-5 flex min-h-0 w-full flex-1 items-center justify-center sm:mt-8">
          {children}
        </div>
      </div>
    </div>
  )
}

/** Tarjeta pixel-bevel reutilizable. */
export function Card({
  accent,
  className = '',
  children,
}: {
  accent?: Accent
  className?: string
  children: ReactNode
}) {
  const border = accent ? ACCENT[accent].border : 'border-white/10'
  return (
    <div className={`pixel-bevel bg-surface border-t-2 ${border} ${className}`}>{children}</div>
  )
}
