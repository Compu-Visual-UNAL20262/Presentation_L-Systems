import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
//
// `base` se resuelve así:
// - Vercel / dominio raíz: dejar sin VITE_BASE (queda en '/').
// - GitHub Pages bajo subruta: build con `VITE_BASE=/Presentation_L-Systems/`
//   (hay un script `build:ghpages` en package.json que ya lo hace).
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [react()],
  build: {
    // p5 es grande por naturaleza; subimos el umbral del aviso ya que el
    // chunk aislado de p5 es intencional y se cachea aparte del código de app.
    chunkSizeWarningLimit: 1200,
    // Separamos p5 (la dependencia más pesada) en su propio chunk para
    // reducir el tamaño del bundle principal y mejorar la carga inicial.
    rollupOptions: {
      output: {
        manualChunks: {
          p5: ['p5'],
        },
      },
    },
  },
})
