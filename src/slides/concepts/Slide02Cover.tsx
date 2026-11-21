import { ActBadge } from './shared'
import { TEAM } from '../../data/slidesConfig'

/** Slide 02 — Portada: título, subtítulo y badges del equipo. */
export default function Slide02Cover() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-6 text-center">
      <div className="animate-fade-up">
        <ActBadge label="ACTO I" accent="cyan" />
        <h1
          className="mt-6 font-display text-4xl font-bold leading-tight text-neon-cyan
            sm:text-6xl lg:text-7xl"
        >
          L-Systems: El ADN de las Formas
        </h1>
        <p className="mx-auto mt-5 max-w-xl font-display text-base text-slate-300 sm:text-xl">
          Programar el crecimiento en lugar de esculpirlo.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {TEAM.map((name) => (
            <span
              key={name}
              className="pixel-bevel bg-surface px-2.5 py-1 font-mono text-xs text-slate-400 sm:text-sm"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
