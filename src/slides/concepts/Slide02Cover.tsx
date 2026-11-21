import { ActBadge } from './shared'
import { TEAM, TEAM_MOTTO, TEAM_NAME } from '../../data/slidesConfig'

const PLAYER_COLORS = ['bg-[#38BDF8]', 'bg-[#F472B6]', 'bg-[#A3E635]', 'bg-[#FACC15]']

/** Slide 02 — Portada 16-bit de día: identidad Team Gaymers + lema + 4 jugadores. */
export default function Slide02Cover() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-5 pb-16 pt-14 text-center">
      <div className="animate-fade-up flex max-w-4xl flex-col items-center">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <ActBadge label="ACTO I" accent="cyan" />
          <span className="pixel-bevel-sm bg-[#F472B6] px-3 py-1.5 font-pixel text-[10px] font-bold tracking-widest text-[#0F172A]">
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

          {/* Lema inspirado en el Equipo Rocket adaptado a L-Systems */}
          <div className="mt-4 inline-block pixel-bevel-sm bg-[#FFFBEB] px-3.5 py-1.5 font-mono text-[11px] font-bold text-[#BE185D] sm:text-xs">
            🚀 &ldquo;{TEAM_MOTTO}&rdquo;
          </div>
        </div>

        {/* Selector de los 4 integrantes (P1 - P4) */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 sm:mt-7">
          {TEAM.map((name, idx) => (
            <span
              key={name}
              className="pixel-bevel-sm flex items-center gap-1.5 bg-white px-3 py-1.5 font-mono text-xs font-bold text-[#0F172A] sm:text-sm"
            >
              <span
                className={`inline-block border border-[#0F172A] px-1.5 py-0.5 font-pixel text-[9px] text-[#0F172A] ${PLAYER_COLORS[idx % PLAYER_COLORS.length]}`}
              >
                P{idx + 1}
              </span>
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
