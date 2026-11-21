import type { Accent } from './slidesConfig'

/** Mapea cada acento a sus clases y valores de color reutilizables. */
export const ACCENT: Record<
  Accent,
  { text: string; border: string; bg: string; shadow: string; hex: string }
> = {
  cyan: {
    text: 'text-neon-cyan',
    border: 'border-neon-cyan',
    bg: 'bg-neon-cyan',
    shadow: 'shadow-neon-cyan',
    hex: '#38BDF8',
  },
  emerald: {
    text: 'text-neon-emerald',
    border: 'border-neon-emerald',
    bg: 'bg-neon-emerald',
    shadow: 'shadow-neon-emerald',
    hex: '#2ECC71',
  },
  amber: {
    text: 'text-neon-amber',
    border: 'border-neon-amber',
    bg: 'bg-neon-amber',
    shadow: 'shadow-neon-cyan',
    hex: '#F39C12',
  },
  magenta: {
    text: 'text-neon-magenta',
    border: 'border-neon-magenta',
    bg: 'bg-neon-magenta',
    shadow: 'shadow-neon-magenta',
    hex: '#EC4899',
  },
}
