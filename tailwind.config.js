/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Estética 16-bit de día (alto contraste para proyector de salón)
        canvas: '#C7ECFF',
        sky: {
          light: '#E6F7FF',
          DEFAULT: '#C7ECFF',
          deep: '#8CD7FF',
        },
        surface: '#FFFFFF',
        cream: '#FFFBEB',
        ink: {
          DEFAULT: '#0F172A',
          soft: '#1E293B',
          muted: '#334155',
        },
        arcade: {
          coin: '#FACC15',
          lime: '#A3E635',
          pink: '#F472B6',
          cyan: '#38BDF8',
          grass: '#22C55E',
          dirt: '#854D0E',
        },
        // Acentos calibrados para legibilidad sobre fondo claro
        neon: {
          cyan: '#0369A1',
          emerald: '#15803D',
          amber: '#B45309',
          magenta: '#BE185D',
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
        'pixel': '4px 4px 0 0 #0F172A',
        'pixel-sm': '2px 2px 0 0 #0F172A',
        'pixel-lg': '6px 6px 0 0 #0F172A',
        'neon-cyan': '4px 4px 0 0 #0369A1',
        'neon-emerald': '4px 4px 0 0 #15803D',
        'neon-magenta': '4px 4px 0 0 #BE185D',
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
        'float-y': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.45' },
        },
        'draw': {
          '0%': { 'stroke-dashoffset': '1' },
          '100%': { 'stroke-dashoffset': '0' },
        },
        'slide-right': {
          '0%': { transform: 'translateX(0)', opacity: '0.3' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateX(14px)', opacity: '0.3' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        // Tortuga 3D: recorre yaw → pitch → roll para ilustrar los 3 ejes.
        'turtle-3d': {
          '0%, 100%': { transform: 'rotateY(0deg) rotateX(0deg) rotateZ(0deg)' },
          '25%': { transform: 'rotateY(50deg) rotateX(0deg) rotateZ(0deg)' },
          '50%': { transform: 'rotateY(0deg) rotateX(45deg) rotateZ(0deg)' },
          '75%': { transform: 'rotateY(0deg) rotateX(0deg) rotateZ(55deg)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        'blink': 'blink 1.1s step-end infinite',
        'float-y': 'float-y 3.5s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2.2s ease-in-out infinite',
        'draw': 'draw 2s ease-out forwards',
        'slide-right': 'slide-right 1.8s ease-in-out infinite',
        'spin-slow': 'spin-slow 14s linear infinite',
        'turtle-3d': 'turtle-3d 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
