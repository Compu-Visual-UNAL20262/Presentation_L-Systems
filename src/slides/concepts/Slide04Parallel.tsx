import { ConceptFrame } from './shared'

/**
 * Slide 04 — Uno a la Vez vs. Todos al Tiempo.
 * Dos columnas animadas: Chomsky (secuencial) vs. L-System (paralelo).
 */
export default function Slide04Parallel() {
  const tokens = Array.from({ length: 5 })
  return (
    <ConceptFrame badge="ACTO I" accent="cyan" title="Uno a la Vez vs. Todos al Tiempo">
      <div className="grid w-full max-w-4xl gap-4 sm:grid-cols-2">
        {/* Chomsky: una ficha activa a la vez (secuencial) */}
        <div className="pixel-bevel border-t-2 border-slate-400 bg-surface p-5 sm:p-6">
          <h3 className="font-display text-lg font-semibold text-slate-200 sm:text-xl">
            Chomsky · secuencial
          </h3>
          <div className="mt-5 flex items-center justify-center gap-2">
            {tokens.map((_, i) => (
              <span
                key={i}
                className="h-7 w-7 pixel-bevel bg-base"
                style={{
                  animation: 'pulse-soft 2.5s ease-in-out infinite',
                  animationDelay: `${i * 0.5}s`,
                  outline: '1px solid rgba(148,163,184,0.4)',
                }}
              />
            ))}
          </div>
          <p className="mt-4 text-center font-display text-xs text-slate-300 sm:text-sm">
            Una regla, una ficha, por turnos.
          </p>
        </div>

        {/* L-System: todas las fichas cambian a la vez (paralelo) */}
        <div className="pixel-bevel border-t-2 border-neon-cyan bg-surface p-5 sm:p-6">
          <h3 className="font-display text-lg font-semibold text-slate-200 sm:text-xl">
            L-System · paralelo
          </h3>
          <div className="mt-5 flex items-center justify-center gap-2">
            {tokens.map((_, i) => (
              <span
                key={i}
                className="h-7 w-7 pixel-bevel bg-neon-cyan animate-pulse-soft"
                style={{ boxShadow: '0 0 10px -2px #38BDF8' }}
              />
            ))}
          </div>
          <p className="mt-4 text-center font-display text-xs text-slate-300 sm:text-sm">
            Todas las células, cada latido.
          </p>
        </div>
      </div>
    </ConceptFrame>
  )
}
