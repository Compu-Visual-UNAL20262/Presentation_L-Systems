import type { ReactNode } from 'react'
import type { Accent } from '../../data/slidesConfig'
import { ACCENT } from '../../data/accent'

/**
 * Marco común de una slide conceptual: título grande en tinta oscura de máximo
 * contraste y, debajo, el apoyo visual. La sección (ORIGEN, INGREDIENTES, …) ya
 * se muestra en el HUD inferior izquierdo, así que aquí no se repite.
 *
 * El prop `badge` se conserva en la firma por compatibilidad con las slides que
 * lo pasan, pero ya no se renderiza.
 */
export function ConceptFrame({
  badge: _badge,
  accent: _accent,
  title,
  subtitle,
  children,
  scrollable = false,
}: {
  badge?: string
  accent: Accent
  title: ReactNode
  subtitle?: ReactNode
  children: ReactNode
  scrollable?: boolean
}) {
  return (
    <div
      className={`flex h-full w-full flex-col items-center px-4 pb-16 pt-10 sm:px-8 sm:pt-12 ${
        scrollable ? 'overflow-hidden justify-start' : 'overflow-hidden justify-center'
      }`}
    >
      <div className="animate-fade-up flex h-full min-h-0 w-full max-w-5xl flex-col items-center">
        <h2
          className="shrink-0 text-center font-display text-2xl font-extrabold leading-tight
            text-[#0F172A] drop-shadow-[0_2px_0_rgba(255,255,255,0.9)] sm:text-4xl lg:text-5xl"
        >
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 shrink-0 text-center font-display text-base font-bold text-[#0369A1] sm:text-xl">
            {subtitle}
          </p>
        )}
        {/*
          Holgura (p-1.5) para que la sombra dura de 4px y el borde de las
          tarjetas pixel-bevel interiores no queden al ras del recorte
          y se vean completos en todos los lados.
        */}
        <div
          {...(scrollable ? { 'data-no-swipe': 'true' } : {})}
          className={`mt-3 flex w-full p-1.5 sm:mt-4 ${
            scrollable
              ? 'flex-1 min-h-0 flex-col items-center justify-start overflow-y-auto overflow-x-hidden thin-scroll pr-1 pb-16 scroll-smooth'
              : 'min-h-0 flex-1 items-center justify-center overflow-hidden'
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

/** Tarjeta blanca pixel-bevel reutilizable con barra superior de color. */
export function Card({
  accent,
  className = '',
  children,
}: {
  accent?: Accent
  className?: string
  children: ReactNode
}) {
  const border = accent ? ACCENT[accent].border : 'border-[#0F172A]'
  return (
    <div className={`pixel-bevel bg-white border-t-4 ${border} ${className}`}>{children}</div>
  )
}

/**
 * Píldora monoespaciada para mostrar una regla o fórmula del L-System con la
 * notación uniforme de la charla (p. ej. `A → AB`). Fondo crema 16-bit.
 */
export function RuleBadge({
  className = '',
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <code
      className={`inline-block pixel-bevel-sm bg-[#FEF9C3] px-2.5 py-0.5 font-mono
        text-sm font-bold text-[#0F172A] ${className}`}
    >
      {children}
    </code>
  )
}
