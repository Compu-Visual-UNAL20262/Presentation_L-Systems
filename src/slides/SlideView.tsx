import { sketches } from '../sketches'
import { ACCENT } from '../data/accent'
import type { Slide } from '../data/slidesConfig'

interface SlideViewProps {
  slide: Slide
}

/** Badge pixel de Acto, reutilizado en varios layouts. */
function ActBadge({ label, accent }: { label: string; accent: Slide['accent'] }) {
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
 * Renderiza un slide según su `kind`. Interfaz limpia para la audiencia:
 * sin notas ni guion. Los lienzos interactivos quedan a pantalla completa.
 */
export default function SlideView({ slide }: SlideViewProps) {
  const a = ACCENT[slide.accent]

  // ── Sketch a pantalla completa con overlay opcional ──
  if (slide.kind === 'sketch' && slide.sketch) {
    const SketchComponent = sketches[slide.sketch]
    return (
      <div className="relative h-full w-full">
        <SketchComponent initialForestMode={slide.initialForestMode} />
        {slide.overlay && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6 sm:p-10">
            <div className="animate-fade-up max-w-2xl">
              {slide.badge && <ActBadge label={slide.badge} accent={slide.accent} />}
              <p
                className={`mt-3 font-display text-xl sm:text-3xl font-medium
                  text-slate-100 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]`}
              >
                {slide.overlay}
              </p>
            </div>
          </div>
        )}
      </div>
    )
  }

  // ── Portada ──
  if (slide.kind === 'cover') {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center px-6 text-center">
        <div className="animate-fade-up">
          {slide.badge && <ActBadge label={slide.badge} accent={slide.accent} />}
          <h1
            className={`mt-6 font-display text-4xl sm:text-6xl lg:text-7xl font-bold
              leading-tight ${a.text}`}
          >
            {slide.title}
          </h1>
          {slide.subtitle && (
            <p className="mx-auto mt-5 max-w-xl font-display text-base sm:text-xl text-slate-300">
              {slide.subtitle}
            </p>
          )}
          {slide.team && (
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
              {slide.team.map((name) => (
                <span
                  key={name}
                  className="font-mono text-xs sm:text-sm text-slate-400 px-2.5 py-1 pixel-bevel bg-surface"
                >
                  {name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  // ── Statement (título + subtítulo) ──
  if (slide.kind === 'statement') {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center px-6 text-center">
        <div className="animate-fade-up max-w-3xl">
          {slide.badge && <ActBadge label={slide.badge} accent={slide.accent} />}
          <h2 className={`mt-6 font-display text-3xl sm:text-5xl lg:text-6xl font-bold ${a.text}`}>
            {slide.title}
          </h2>
          {slide.subtitle && (
            <p className="mx-auto mt-6 max-w-2xl font-display text-lg sm:text-2xl text-slate-300">
              {slide.subtitle}
            </p>
          )}
        </div>
      </div>
    )
  }

  // ── Comparación de dos columnas ──
  if (slide.kind === 'compare' && slide.columns) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center px-6">
        <div className="animate-fade-up w-full max-w-5xl">
          {slide.badge && (
            <div className="mb-6 text-center">
              <ActBadge label={slide.badge} accent={slide.accent} />
            </div>
          )}
          <h2 className={`mb-10 text-center font-display text-2xl sm:text-4xl font-bold ${a.text}`}>
            {slide.title}
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {slide.columns.map((col, i) => (
              <div
                key={i}
                className={`pixel-bevel bg-surface p-6 sm:p-8 border-t-2 ${
                  i === 0 ? 'border-slate-600' : a.border
                }`}
              >
                <h3 className="font-display text-lg sm:text-2xl font-semibold text-slate-100">
                  {col.title}
                </h3>
                {col.body && (
                  <p className="mt-3 font-display text-sm sm:text-lg text-slate-400">{col.body}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ── Lista de ingredientes / niveles / pasos ──
  if (slide.kind === 'list' && slide.items) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center px-6">
        <div className="animate-fade-up w-full max-w-4xl">
          {slide.badge && (
            <div className="mb-6 text-center">
              <ActBadge label={slide.badge} accent={slide.accent} />
            </div>
          )}
          <h2 className={`mb-8 text-center font-display text-2xl sm:text-4xl font-bold ${a.text}`}>
            {slide.title}
          </h2>
          <ul className="space-y-3">
            {slide.items.map((item) => (
              <li
                key={item.key}
                className="flex items-center gap-4 pixel-bevel bg-surface px-4 py-3 sm:px-6 sm:py-4"
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center pixel-bevel
                    font-pixel text-sm ${a.text} ${a.border} border`}
                >
                  {item.key}
                </span>
                <div>
                  <span className="font-display text-base sm:text-xl font-semibold text-slate-100">
                    {item.title}
                  </span>
                  {item.body && (
                    <span className="block font-display text-xs sm:text-base text-slate-400">
                      {item.body}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  // ── Reglas / código en monoespaciado ──
  if (slide.kind === 'rule' && slide.rule) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center px-6">
        <div className="animate-fade-up w-full max-w-3xl">
          {slide.badge && (
            <div className="mb-6 text-center">
              <ActBadge label={slide.badge} accent={slide.accent} />
            </div>
          )}
          <h2 className={`mb-8 text-center font-display text-2xl sm:text-4xl font-bold ${a.text}`}>
            {slide.title}
          </h2>
          <div className={`pixel-bevel-cyan bg-surface p-6 sm:p-8`}>
            <pre className="overflow-x-auto font-mono text-sm sm:text-xl leading-relaxed text-slate-200">
              {slide.rule.lines.map((line, i) => (
                <div key={i}>
                  <span className={a.text}>{'> '}</span>
                  {line}
                </div>
              ))}
            </pre>
          </div>
          {slide.rule.caption && (
            <p className="mt-5 text-center font-mono text-xs sm:text-base text-slate-400">
              {slide.rule.caption}
            </p>
          )}
        </div>
      </div>
    )
  }

  // ── Cierre ──
  if (slide.kind === 'closing') {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center px-6 text-center">
        <div className="animate-fade-up max-w-3xl">
          {slide.badge && <ActBadge label={slide.badge} accent={slide.accent} />}
          <h2 className={`mt-6 font-display text-4xl sm:text-6xl font-bold ${a.text}`}>
            {slide.title}
          </h2>
          {slide.subtitle && (
            <p className="mx-auto mt-6 max-w-2xl font-display text-lg sm:text-2xl text-slate-300">
              {slide.subtitle}
            </p>
          )}
          <p className="mt-10 font-pixel text-xs tracking-widest text-slate-500">
            // FIN <span className="animate-blink">_</span>
          </p>
        </div>
      </div>
    )
  }

  return null
}
