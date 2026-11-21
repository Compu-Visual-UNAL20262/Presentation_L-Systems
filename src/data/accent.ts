import type { Accent } from './slidesConfig'

/** Mapea cada acento a sus clases y valores de color para el tema 16-bit de día. */
export const ACCENT: Record<
  Accent,
  {
    text: string
    border: string
    bg: string
    pillBg: string
    shadow: string
    hex: string
  }
> = {
  cyan: {
    text: 'text-[#0369A1]',
    border: 'border-[#0284C7]',
    bg: 'bg-[#38BDF8]',
    pillBg: 'bg-[#E0F2FE]',
    shadow: 'shadow-pixel',
    hex: '#0284C7',
  },
  emerald: {
    text: 'text-[#15803D]',
    border: 'border-[#16A34A]',
    bg: 'bg-[#A3E635]',
    pillBg: 'bg-[#ECFCCB]',
    shadow: 'shadow-pixel',
    hex: '#16A34A',
  },
  amber: {
    text: 'text-[#B45309]',
    border: 'border-[#D97706]',
    bg: 'bg-[#FACC15]',
    pillBg: 'bg-[#FEF9C3]',
    shadow: 'shadow-pixel',
    hex: '#D97706',
  },
  magenta: {
    text: 'text-[#BE185D]',
    border: 'border-[#DB2777]',
    bg: 'bg-[#F472B6]',
    pillBg: 'bg-[#FCE7F3]',
    shadow: 'shadow-pixel',
    hex: '#DB2777',
  },
}
