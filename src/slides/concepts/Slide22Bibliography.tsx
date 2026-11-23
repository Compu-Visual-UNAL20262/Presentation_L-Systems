import { ConceptFrame } from './shared'

/**
 * Slide 29 — Bibliografía y créditos.
 *
 * Reúne las fuentes consultadas para la charla: la literatura fundacional de
 * los L-Systems, el paper de ciudades procedurales y los canales de los videos
 * integrados en la presentación (con crédito explícito a sus autores).
 *
 * Objetivo: dar atribución clara y verificable. Enlaces abren en pestaña nueva
 * (`target="_blank"` + `rel="noopener noreferrer"`).
 */

interface RefItem {
  authors: string
  title: string
  where: string
  href?: string
}

/** Referencias académicas / libros. */
const SOURCES: RefItem[] = [
  {
    authors: 'Lindenmayer, A.',
    title: 'Mathematical models for cellular interactions in development, I & II',
    where: 'Journal of Theoretical Biology, 18(3), 280–315 (1968)',
    href: 'https://doi.org/10.1016/0022-5193(68)90079-9',
  },
  {
    authors: 'Prusinkiewicz, P. & Lindenmayer, A.',
    title: 'The Algorithmic Beauty of Plants (ABOP)',
    where: 'Springer-Verlag (1990) · algorithmicbotany.org',
    href: 'http://algorithmicbotany.org/papers/#abop',
  },
  {
    authors: 'Parish, Y. I. H. & Müller, P.',
    title: 'Procedural Modeling of Cities',
    where: 'SIGGRAPH 2001, 301–308',
    href: 'https://doi.org/10.1145/383259.383292',
  },
  {
    authors: 'Barnsley, M. F.',
    title: 'Fractals Everywhere (helecho de Barnsley / IFS)',
    where: 'Academic Press (1988)',
  },
]

/** Canales / autores de los videos y recursos audiovisuales integrados. */
const MEDIA: RefItem[] = [
  {
    authors: 'Mathlens (@mathlenss · YouTube @lensmath)',
    title:
      'Reel «árbol fractal por ramificación» · clases animadas de análisis numérico, cálculo y más',
    where: 'Instagram (reel del cierre) · youtube.com/@lensmath',
    href: 'https://www.youtube.com/@lensmath',
  },
  {
    authors: 'Wild Math',
    title: 'The Beauty of Fractal Geometry (SoME2)',
    where: 'YouTube · slide «La Tortuga»',
    href: 'https://www.youtube.com/watch?v=YkApFcYsP30',
  },
  {
    authors: 'Hello Games',
    title: "No Man's Sky — trailer (flora procedural)",
    where: 'YouTube · slide «Mundos Infinitos»',
    href: 'https://www.youtube.com/watch?v=nLtmEjqzg7M',
  },
  {
    authors: 'Wikimedia Commons',
    title: 'L-systems with patterns (galería de fractales, CC0)',
    where: 'Imagen · slide «Mundos Infinitos»',
    href: 'https://commons.wikimedia.org/',
  },
]

function RefRow({ item }: { item: RefItem }) {
  const body = (
    <>
      <span className="font-display text-[11px] font-extrabold text-[#0F172A] sm:text-xs">
        {item.authors}
      </span>{' '}
      <span className="font-display text-[11px] font-semibold text-[#334155] sm:text-xs">
        — {item.title}.
      </span>{' '}
      <span className="font-mono text-[10px] font-bold text-[#64748B]">{item.where}</span>
    </>
  )
  return (
    <li className="pixel-bevel-sm bg-white px-2.5 py-1.5 leading-snug">
      {item.href ? (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          data-no-swipe="true"
          className="block transition-colors hover:bg-[#FEF9C3]"
        >
          {body}
          <span className="ml-1 font-mono text-[10px] font-bold text-[#0369A1]">↗</span>
        </a>
      ) : (
        body
      )}
    </li>
  )
}

export default function Slide22Bibliography() {
  return (
    <ConceptFrame badge="IMPACTO REAL" accent="emerald" title="Bibliografía y Créditos">
      <div
        data-no-swipe="true"
        className="grid w-full max-w-5xl gap-4 overflow-y-auto pb-2 sm:grid-cols-2 sm:overflow-visible"
      >
        {/* Columna 1 — Fuentes académicas / libros */}
        <section className="flex flex-col gap-2">
          <h3 className="inline-flex w-fit items-center gap-1.5 pixel-bevel-sm bg-[#A3E635] px-2.5 py-0.5 font-pixel text-[9px] font-bold uppercase tracking-widest text-[#0F172A]">
            Fuentes académicas
          </h3>
          <ul className="flex flex-col gap-1.5">
            {SOURCES.map((s) => (
              <RefRow key={s.title} item={s} />
            ))}
          </ul>
        </section>

        {/* Columna 2 — Videos y recursos audiovisuales (créditos a canales) */}
        <section className="flex flex-col gap-2">
          <h3 className="inline-flex w-fit items-center gap-1.5 pixel-bevel-sm bg-[#F472B6] px-2.5 py-0.5 font-pixel text-[9px] font-bold uppercase tracking-widest text-[#0F172A]">
            Videos y recursos
          </h3>
          <ul className="flex flex-col gap-1.5">
            {MEDIA.map((m) => (
              <RefRow key={m.title} item={m} />
            ))}
          </ul>
          <p className="mt-1 font-mono text-[10px] font-semibold leading-snug text-[#475569]">
            Videos e imágenes se usan con fines educativos, acreditando a sus
            autores y canales originales. Los enlaces (↗) llevan a la fuente.
          </p>
        </section>
      </div>
    </ConceptFrame>
  )
}
