/**
 * ¿El foco está en un campo editable (input, textarea, select o
 * contentEditable)? Los atajos de teclado de los sketches deben ignorarse en
 * ese caso para no interferir con la edición directa (p. ej. los inputs
 * numéricos del Mini-Editor del Sketch 3).
 */
export function isEditableTarget(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null
  if (!el) return false
  const tag = el.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true
  if (el.isContentEditable) return true
  return false
}

/**
 * Registra un atajo de teclado acotado al ciclo de vida del slide. Como el
 * SlideDeck desmonta el slide inactivo (key por número), el listener se
 * elimina automáticamente al salir; además ignora el evento si se está
 * escribiendo en un campo editable o si llega repetido por mantener la tecla.
 */
export function onSlideKey(
  handler: (e: KeyboardEvent) => void,
): () => void {
  const listener = (e: KeyboardEvent) => {
    if (e.repeat) return
    if (isEditableTarget(e.target)) return
    handler(e)
  }
  window.addEventListener('keydown', listener)
  return () => window.removeEventListener('keydown', listener)
}
