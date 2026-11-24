# Guía del Desarrollador y Extensibilidad

Esta guía proporciona las instrucciones técnicas necesarias para configurar el entorno de trabajo, extender la presentación con nuevos sketches y diapositivas, y desplegar la aplicación en producción.

---

## 1. Configuración del Entorno de Desarrollo

### Requisitos del Sistema
- **Node.js:** Versión `18.0.0` o superior (se recomienda Node 20 LTS o 22 LTS).
- **npm:** Versión `9.0.0` o superior.

### Comandos de Instalación y Scripts de npm

```bash
# 1. Clonar el repositorio y acceder a la carpeta
git clone https://github.com/tu-usuario/Presentation_L-Systems.git
cd Presentation_L-Systems

# 2. Instalar dependencias exactas
npm install

# 3. Iniciar servidor de desarrollo local con recarga en caliente (HMR)
npm run dev
# Disponible en: http://localhost:5173

# 4. Compilar y validar tipos para producción
npm run build

# 5. Previsualizar localmente el paquete optimizado generado en dist/
npm run preview

# 6. Compilar paquete para GitHub Pages (configura base relativa /Presentation_L-Systems/)
npm run build:ghpages
```

---

## 2. Cómo Crear y Registrar un Nuevo Sketch Interactivo

Para agregar un nuevo sketch interactivo en [p5.js](https://p5js.org/) a la plataforma, sigue estos **cinco pasos**:

### Paso 1: Crear el Componente del Sketch
Crea el archivo en `src/sketches/` (ej. `src/sketches/SketchMiEjemplo.tsx`). Asegúrate de implementarlo como una función en **Instance Mode**:

```tsx
import { useMemo, useRef, useState } from 'react'
import type p5 from 'p5'
import P5Canvas from '../components/P5Canvas'
import type { SketchFn } from '../components/P5Canvas'

interface SketchState {
  iterations: number
  angle: number
}

function makeSketch(stateRef: { current: SketchState }): SketchFn {
  return (p: p5, size: { width: number; height: number }) => {
    p.setup = () => {
      p.createCanvas(size?.width || window.innerWidth, size?.height || window.innerHeight)
    }

    p.draw = () => {
      p.background('#C7ECFF')
      const { iterations, angle } = stateRef.current
      
      // Dibujado de la tortuga...
      p.stroke('#15803D')
      p.strokeWeight(2)
      p.line(p.width / 2, p.height, p.width / 2, p.height - 100)
    }
  }
}

export default function SketchMiEjemplo() {
  const [iterations, setIterations] = useState(3)
  const [angle, setAngle] = useState(25)
  const stateRef = useRef({ iterations, angle })
  stateRef.current = { iterations, angle }

  const sketch = useMemo(() => makeSketch(stateRef), [])

  return (
    <div className="relative h-full w-full">
      <P5Canvas sketch={sketch} />
      
      {/* Panel de Controles: marcar SIEMPRE con data-no-swipe="true" */}
      <div
        data-no-swipe="true"
        className="absolute top-4 right-4 z-20 pixel-bevel bg-white/95 p-3 flex flex-col gap-2"
      >
        <span className="font-pixel text-[10px] text-[#0F172A]">CONTROLES</span>
        <button
          onClick={() => setIterations((i) => Math.min(6, i + 1))}
          className="arcade-btn text-xs"
        >
          Iteración: {iterations}
        </button>
      </div>
    </div>
  )
}
```

### Paso 2: Registrar el Identificador en `slidesConfig.ts`
Abre [`src/data/slidesConfig.ts`](file:///home/acbel/Documents/Proyectos/Visual/Presentation_L-Systems/src/data/slidesConfig.ts):

1. Agrega el nuevo ID al tipo `SlideComponentId`:
   ```typescript
   export type SlideComponentId =
     | 'sketch-hook'
     | 'mi-ejemplo' // <- Nuevo ID
     // ...
   ```
2. Añade la diapositiva en el array `SLIDES` indicando su número, acto temático, acento cromático y título:
   ```typescript
   {
     n: 29,
     act: 4,
     accent: 'magenta',
     title: 'Sketch: mi nuevo experimento',
     component: 'mi-ejemplo'
   }
   ```

### Paso 3: Crear el Envoltorio en `sketchSlides.tsx`
Abre [`src/slides/sketchSlides.tsx`](file:///home/acbel/Documents/Proyectos/Visual/Presentation_L-Systems/src/slides/sketchSlides.tsx) y crea la función contenedora que superpone las etiquetas arcade retro:

```tsx
import SketchMiEjemplo from '../sketches/SketchMiEjemplo'

export function SlideMiEjemplo() {
  return (
    <div className="relative h-full w-full">
      <SketchMiEjemplo />
      <CornerBadge text="Demo · Mi nuevo experimento" className="absolute bottom-16 left-4" />
    </div>
  )
}
```

### Paso 4: Registrar el Componente en `SlideView.tsx`
Abre [`src/slides/SlideView.tsx`](file:///home/acbel/Documents/Proyectos/Visual/Presentation_L-Systems/src/slides/SlideView.tsx) y mapea el identificador en el registro constante `REGISTRY`:

```typescript
import { SlideMiEjemplo } from './sketchSlides'

const REGISTRY: Record<SlideComponentId, ComponentType> = {
  // ...
  'mi-ejemplo': SlideMiEjemplo,
}
```

---

## 3. Buenas Prácticas y Reglas de Oro

1. **Atributo `data-no-swipe="true"`:**
   Todo elemento interactivo flotante (deslizadores, paneles de botones, modales, menús o canvas) **debe** incluir `data-no-swipe="true"`. De lo contrario, en dispositivos táctiles, arrastrar el dedo sobre un control cambiará de diapositiva.

2. **Cero Fugas de Memoria en p5.js:**
   Nunca declares variables en el ámbito global ni utilices variables de módulo para almacenar estados mutables de lienzos p5. Usa referencias `useRef` pasadas a una función fábrica `makeSketch(stateRef)`.

3. **No generar cadenas dentro de `draw()`:**
   La reescritura de cadenas de L-Systems debe ocurrir dentro de callbacks de eventos (`onClick`, `onChange`) o funciones memoizadas (`useMemo`), nunca en cada llamada a `draw()`, para garantizar 60 FPS sin bloqueos de microsegundos (*frame drops*).

4. **Escala Relativa y Responsividad:**
   Diseña los sketches considerando relaciones de aspecto tanto 16:9 de proyector como 9:16 de teléfono móvil vertical. Basa las posiciones en `p.width` y `p.height`, o ejecuta una pasada preliminar de *bounding box* para adaptar la longitud `len`.

---

## 4. Estilos y Sistema de Diseño

El proyecto utiliza un tema arcade retro de alta nitidez configurado en [`tailwind.config.js`](file:///home/acbel/Documents/Proyectos/Visual/Presentation_L-Systems/tailwind.config.js):

### Clases de Utilidad Personalizadas:
- `.pixel-bevel`: Aplica un borde biselado en relieve 3D retro con sombras negras sólidas (`box-shadow: 3px 3px 0px #0F172A`).
- `.pixel-bevel-sm`: Variante pequeña para badges y etiquetas compactas (`box-shadow: 2px 2px 0px #0F172A`).
- `.arcade-btn`: Estilo para botones arcade interactivos con efecto activo de hundimiento al hacer clic.
- `.font-display`: Tipografía **Space Grotesk** para encabezados principales.
- `.font-pixel`: Tipografía **Silkscreen** para insignias temáticas, HUD y botones de acción.
- `.font-mono`: Tipografía **JetBrains Mono** para axiomas, producciones gramaticales y telemetría numérica.

---

## 5. Despliegue en Producción

### Despliegue en Vercel
El repositorio incluye el archivo [`vercel.json`](file:///home/acbel/Documents/Proyectos/Visual/Presentation_L-Systems/vercel.json) configurado para resolver cualquier ruta como Single Page Application:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```
Solo es necesario conectar el repositorio en la consola de Vercel; el build se ejecuta automáticamente en cada push a la rama `main`.

### Despliegue en GitHub Pages
El flujo de trabajo en [`.github/workflows/deploy-pages.yml`](file:///home/acbel/Documents/Proyectos/Visual/Presentation_L-Systems/.github/workflows/deploy-pages.yml) compila la aplicación con la base relativa `/Presentation_L-Systems/` al hacer push a la rama `main`, genera el archivo `404.html` de respaldo y sube el bundle resultante al entorno de Pages.
