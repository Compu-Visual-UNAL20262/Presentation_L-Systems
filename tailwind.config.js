/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Base oscura tipo hackathon/tech
        base: '#0B0F19',
        surface: '#131A2A',
        // Acentos neón
        neon: {
          cyan: '#38BDF8',
          emerald: '#2ECC71',
          amber: '#F39C12',
          magenta: '#EC4899',
        },
      },
      fontFamily: {
        // Títulos y texto principal
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        // Badges de Acto, botones arcade, numeración, HUD
        pixel: ['"Silkscreen"', 'monospace'],
        // Reglas L-System, código, métricas
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'neon-cyan': '0 0 18px -2px rgba(56, 189, 248, 0.55)',
        'neon-emerald': '0 0 18px -2px rgba(46, 204, 113, 0.5)',
        'neon-magenta': '0 0 18px -2px rgba(236, 72, 153, 0.5)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'blink': {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        'blink': 'blink 1.1s step-end infinite',
      },
    },
  },
  plugins: [],
}
