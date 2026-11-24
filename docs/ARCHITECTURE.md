# Arquitectura del Sistema y Frontend

Este documento detalla el diseño técnico, la arquitectura de software y los patrones de integración utilizados en la aplicación web interactiva **Presentation L-Systems**.

---

## 1. Visión General de la Pila Tecnológica

La plataforma está diseñada como una Single Page Application (SPA) interactiva a pantalla completa (*slide-deck*), optimizada tanto para proyecciones en vivo en conferencias como para la interacción autónoma de los usuarios en dispositivos de escritorio y móviles.

- **Framework:** [React 18](https://react.dev/) + [TypeScript 5](https://www.typescriptlang.org/)
- **Empaquetador y Dev Server:** [Vite 5](https://vitejs.dev/)
- **Estilos y Sistema de Diseño:** [Tailwind CSS 3](https://tailwindcss.com/) + PostCSS + Autoprefixer
- **Motor Gráfico Interactivo:** [p5.js](https://p5js.org/) ejecutado estrictamente en **Instance Mode**
- **Tipografías:** Space Grotesk (títulos y display), Silkscreen (badges y acentos arcade 16-bit), JetBrains Mono (código y expresiones matemáticas)

---

## 2. Motor de Presentación (`SlideDeck.tsx`)

El componente [`SlideDeck.tsx`](file:///home/acbel/Documents/Proyectos/Visual/Presentation_L-Systems/src/components/SlideDeck.tsx) es el núcleo orquestador del ciclo de vida de la presentación.

```
                           ┌──────────────────────────┐
                           │      SlideDeck.tsx       │
                           │  (Estado: index, dirRef) │
                           └────────────┬─────────────┘
                                        │
           ┌────────────────────────────┼────────────────────────────┐
           ▼                            ▼                            ▼
  ┌──────────────────┐        ┌──────────────────┐        ┌──────────────────┐
  │   ActMenu.tsx    │        │  SlideView.tsx   │        │NavigationHUD.tsx │
  │ (Salto de slides)│        │(Slide activo)    │        │(Barra + Flechas) │
  └──────────────────┘        └─────────┬────────┘        └──────────────────┘
                                        │
                                        ▼
                              ┌──────────────────┐
                              │  P5Canvas.tsx    │
                              │ (Instance Mode)  │
                              └──────────────────┘
```

### Características Principales:

1. **Montaje Exclusivo del Slide Activo:**
   Solo se renderiza el slide correspondiente al índice actual (`SLIDES[index]`). Al cambiar de slide, la clave `key={slide.n}` fuerza el desmontaje del slide anterior y el montaje del nuevo. Esto asegura que:
   - Los sketches inactivos llamen inmediatamente a su rutina de limpieza (`p.remove()`).
   - El consumo de CPU y memoria GPU en segundo plano sea exactamente **0%**.
   - No existan colisiones de bucles `requestAnimationFrame` en la pestaña del navegador.

2. **Detección de Gestos Táctiles (Swipe):**
   - Umbral horizontal: `SWIPE_THRESHOLD = 55 px`.
   - Relación de aspecto del gesto: `SWIPE_RATIO = 1.3`. Si el desplazamiento vertical supera al horizontal dividido por este ratio, el gesto se descarta considerándose scroll natural del usuario.
   - **Inhibición Inteligente de Gestos (`isNoSwipeTarget`):**
     Para que el usuario pueda manipular deslizadores (`<input type="range">`), interactuar con lienzos `<canvas>`, presionar botones o seleccionar texto sin cambiar accidentalmente de diapositiva, la función analiza la jerarquía del DOM del elemento presionado hasta la raíz. Si encuentra cualquier nodo con el atributo `data-no-swipe="true"`, o elementos HTML interactivos (`BUTTON`, `CANVAS`, `SELECT`, `TEXTAREA`, `INPUT`), el evento de swipe se cancela.

3. **Navegación por Teclado:**
   Suscripción global en `window` para `ArrowRight` (siguiente slide) y `ArrowLeft` (slide anterior). Los sketches interactivos pueden capturar teclas adicionales (como `Space`, `R`, `+`, `-`) a través de un despachador local controlado (`keyboard.ts`).

4. **Transición Animada Direccional:**
   Una referencia mutable `dirRef` rastrea si el avance fue hacia adelante (+1) o hacia atrás (-1), aplicando dinámicamente animaciones CSS (`slide-in-right` o `slide-in-left`) de 200 ms con curvas cúbicas de aceleración suave.

---

## 3. Integración Segura de p5.js en React (`P5Canvas.tsx`)

Uno de los mayores retos en aplicaciones React que utilizan [p5.js](https://p5js.org/) es evitar fugas de memoria, evitar la duplicación de lienzos y garantizar que el lienzo se redimensione limpiamente sin perder nitidez.

[`P5Canvas.tsx`](file:///home/acbel/Documents/Proyectos/Visual/Presentation_L-Systems/src/components/P5Canvas.tsx) resuelve esto mediante las siguientes garantías:

### A. Prohibición de Modo Global (Instance Mode Estricto)
En lugar de registrar funciones en el objeto global `window` (`function setup()`, `function draw()`), cada sketch se define como una función pura con la firma:

```typescript
export type SketchFn = (p: p5, size: { width: number; height: number }) => void
```

Se inicializa mediante `new p5(factory, containerRef.current)`.

### B. Prevención del Defecto "100x100 Canvas"
Por defecto, si `p5.createCanvas()` se invoca antes de que el contenedor de React haya completado su reflujo en el DOM, p5 crea un lienzo de 100×100 píxeles. `P5Canvas` intercepta la llamada a `p.createCanvas`:

```typescript
const origCreateCanvas = p.createCanvas.bind(p)
p.createCanvas = (w?: number, h?: number, renderer?: unknown) => {
  const cur = getDimensions()
  const targetW = !w || w === 100 ? cur.width : w
  const targetH = !h || h === 100 ? cur.height : h
  return origCreateCanvas(targetW, targetH, renderer as any)
}
```

### C. Redimensionamiento Reactivo con `ResizeObserver`
Un `ResizeObserver` nativo escucha los cambios de tamaño del contenedor (por ejemplo, cambios de orientación en móviles o apertura de DevTools) y llama automáticamente a `instance.resizeCanvas(width, height)`. Adicionalmente, si el sketch expone un método `windowResized`, este es invocado para recalcular coordenadas relativas.

### D. Limpieza Total de Recursos al Desmontar
En la función de limpieza del hook `useEffect`:
```typescript
return () => {
  cancelAnimationFrame(rafId)
  clearTimeout(t1)
  clearTimeout(t2)
  ro.disconnect()
  if (instance) {
    instance.remove() // Destruye el canvas, cancela el draw() loop y libera listeners
    instance = null
  }
}
```

---

## 4. Enrutamiento y Mapeo Declarativo de Diapositivas

El flujo de diapositivas no está acoplado de forma rígida en la interfaz, sino que se parametriza en [`src/data/slidesConfig.ts`](file:///home/acbel/Documents/Proyectos/Visual/Presentation_L-Systems/src/data/slidesConfig.ts):

### Estructura de Datos de Diapositiva:
```typescript
export interface Slide {
  n: number                      // Número lineal (1 a 28)
  act: number                    // Acto temático (1 a 6)
  accent: 'cyan' | 'emerald' | 'amber' | 'magenta' // Tema cromático
  title: string                  // Título mostrado en HUD y Menú
  component: SlideComponentId    // ID que resuelve al componente visual
}
```

### Resolución en `SlideView.tsx`:
El componente [`SlideView.tsx`](file:///home/acbel/Documents/Proyectos/Visual/Presentation_L-Systems/src/slides/SlideView.tsx) actúa como un despachador `O(1)` a través de un registro tipado:
- Las diapositivas conceptuales provienen del submódulo [`src/slides/concepts/`](file:///home/acbel/Documents/Proyectos/Visual/Presentation_L-Systems/src/slides/concepts/).
- Las diapositivas interactivas con sketches provienen de [`src/slides/sketchSlides.tsx`](file:///home/acbel/Documents/Proyectos/Visual/Presentation_L-Systems/src/slides/sketchSlides.tsx).

---

## 5. Componentes Reutilizables de UI

El directorio [`src/components/`](file:///home/acbel/Documents/Proyectos/Visual/Presentation_L-Systems/src/components/) incluye utilidades modulares diseñadas para mantener la coherencia visual arcade y la eficiencia de carga:

1. **`ActMenu.tsx`:** Menú modal desplegable accesible desde el botón `≡ MENU` en la esquina superior izquierda. Agrupa las 28 diapositivas por actos temáticos, resaltando la diapositiva actual y permitiendo saltos directos sin recorrer diapositivas intermedias.
2. **`NavigationHUD.tsx`:** Barra de navegación fija en el borde inferior. Incluye una barra de progreso porcentual proporcional, la numeración `SLIDE XX / 28`, botones de flecha `◄ / ►` con biseles 16-bit y la etiqueta temática del acto en curso.
3. **`WebEmbed.tsx`:** Contenedor seguro para herramientas web externas (como el sintetizador fractal *Musicalator*). Utiliza carga perezosa (*lazy loading*), aislando el iframe en un entorno `sandbox` seguro y mostrando una barra de carga personalizada antes de inicializar la herramienta externa.
4. **`YouTubeEmbed.tsx`:** Envoltorio optimizado para incrustar videos de apoyo. Solo carga el script pesado de YouTube y el reproductor una vez que el usuario presiona el botón interactivo de reproducción, evitando descargas innecesarias durante la navegación rápida.
5. **`InstagramEmbed.tsx`:** Componente de despliegue perezoso para reels y material divulgativo externo, integrando enlaces de respaldo y visualización de códigos QR.
6. **`PixelGlyph.tsx`, `PixelPhoto.tsx`, `PixelMeme.tsx`:** Primitivas de renderizado visual con biseles CSS 3D estilo retro (`pixel-bevel`), bordes contrastados y tratamiento pixelado de imágenes mediante directivas CSS `image-rendering: pixelated`.

---

## 6. Rendimiento y Buenas Prácticas Gráficas

Para mantener 60 FPS estables en la web:
- **Separación de Lógica y Render:** Las cadenas de los L-Systems se expanden exclusivamente cuando cambian los parámetros estructurales (como las iteraciones `n` o el axioma), nunca en cada frame de dibujo dentro de `draw()`.
- **Bounding Box Precalculado:** Varios sketches simulan la trayectoria de la tortuga en una pasada invisible previa para calcular el rectángulo envolvente (*bounding box*) exacto de la figura. Esto permite normalizar la escala `len` y centrar la estructura de manera perfecta e instantánea en cualquier resolución de pantalla.
- **Limitadores de Seguridad (`Safety Depth Caps`):** Para proteger el navegador contra la explosión exponencial $O(b^n)$, los sketches con interacción libre (como `Sketch9Sandbox.tsx`) implementan topes de caracteres y segmentos generados ($200\,000$ segmentos máx.), notificando visualmente al usuario cuando se alcanza el límite seguro.
