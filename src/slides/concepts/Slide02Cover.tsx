import { ActBadge } from './shared'
import { TEAM_MEMBERS, TEAM_NAME } from '../../data/slidesConfig'

/** Slide 02 — Portada 16-bit de día: identidad Team Gaymers + 4 integrantes. */
export default function Slide02Cover() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-4 pb-14 pt-10 text-center sm:px-6">
      <div className="animate-fade-up flex max-w-4xl flex-col items-center">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <ActBadge label="ORIGEN" accent="cyan" />
          <span className="pixel-bevel-sm bg-[#F472B6] px-3 py-1 font-pixel text-[10px] font-bold tracking-widest text-[#0F172A]">
            ♥ TEAM {TEAM_NAME}
          </span>
        </div>

        <div className="mt-4 pixel-bevel bg-white px-6 py-5 sm:mt-6 sm:px-10 sm:py-7">
          <h1
            className="font-display text-3xl font-extrabold leading-tight text-[#0F172A]
              sm:text-5xl lg:text-6xl"
          >
            L-Systems: El ADN de las Formas
          </h1>
          <p className="mx-auto mt-3 max-w-xl font-display text-sm font-semibold text-[#334155] sm:text-xl">
            Programar el crecimiento en lugar de esculpirlo.
          </p>
        </div>

        {/* Los 4 integrantes (etiqueta de color + nombre, sin rol) */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 sm:mt-7">
          {TEAM_MEMBERS.map((member) => (
            <span
              key={member.player}
              className="pixel-bevel-sm flex items-center gap-2 bg-white px-3 py-1.5 font-mono text-xs font-bold text-[#0F172A] sm:text-sm"
            >
              <span
                className={`inline-block border border-[#0F172A] px-1.5 py-0.5 font-pixel text-[9px] font-bold text-[#0F172A] ${member.color}`}
              >
                {member.player}
              </span>
              <span>{member.name}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
