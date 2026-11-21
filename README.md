# L-Systems · Presentación interactiva (Computación Visual)

Presentación slide por slide a pantalla completa sobre Sistemas de Lindenmayer,
con demos interactivas en p5.js. Construida con React + Vite + Tailwind CSS.

## Stack

- **React 18** + **TypeScript**
- **Vite 5** (dev server y build)
- **Tailwind CSS 3** (tema oscuro hackathon + detalles pixel-arcade)
- **p5.js** en Instance Mode para los sketches

## Scripts

```bash
npm install        # instalar dependencias
npm run dev        # servidor de desarrollo (http://localhost:5173)
npm run build      # type-check + build de producción -> dist/  (base '/')
npm run build:ghpages  # build para GitHub Pages (base /Presentation_L-Systems/)
npm run preview    # previsualizar el build
```

## Despliegue

### Vercel
Proyecto listo sin configuración extra. Vercel detecta Vite; `vercel.json`
fija `buildCommand: npm run build`, `outputDirectory: dist` y un rewrite SPA.
Base por defecto `/`.

### GitHub Pages
El workflow `.github/workflows/deploy-pages.yml` publica en cada push a `main`:
ejecuta `npm run build:ghpages` (que fija la base a `/Presentation_L-Systems/`,
copia `index.html` a `404.html` y añade `.nojekyll`) y sube `dist/`.
Activa Pages en Settings → Pages → Source: GitHub Actions.
Si el repositorio cambia de nombre, ajusta `VITE_BASE` en el script
`build:ghpages`.


## Uso durante la charla

- **Navegación:** flechas ← / → del teclado, botones ◄ / ► (esquina inferior
  derecha) o swipe izquierda/derecha en móvil.
- **Saltar de slide:** botón `≡ MENU` (esquina superior izquierda) para ir
  directo a cualquiera de los 6 Actos o 21 slides.
- El swipe táctil se **desactiva** sobre lienzos, botones, inputs de rango y
  cualquier elemento con `data-no-swipe="true"`, para no interferir con las
  demos interactivas.

## Estructura

```
src/
  components/
    SlideDeck.tsx      Motor de presentación: índice, teclado, swipe
    NavigationHUD.tsx  Barra de progreso + numeración + botones
    ActMenu.tsx        Menú desplegable de Actos / slides
    P5Canvas.tsx       Wrapper p5 Instance Mode (ResizeObserver + remove())
  sketches/            Sketch1..Sketch5 (placeholders) + registro
  slides/              Renderizador de slides (SlideView)
  data/
    slidesConfig.ts    6 Actos · 21 slides (configuración declarativa)
    accent.ts          Mapa de acentos neón
```

## Fuentes (Google Fonts)

Cargadas desde `index.html` y configuradas en Tailwind:

- `font-display` → **Space Grotesk** (títulos y texto principal)
- `font-pixel` → **Silkscreen** (badges de Acto, botones arcade, numeración, HUD)
- `font-mono` → **JetBrains Mono** (reglas L-System, código, métricas)

## Sketches

`src/sketches/Sketch1..5` son **placeholders** funcionales listos para
reemplazar por las versiones finales. Cada uno usa el `P5Canvas`, es
responsivo (ResizeObserver) y se desmonta al salir del slide (`p.remove()`),
de modo que un slide inactivo consume 0 CPU y no deja fugas de memoria.

| Sketch | Tema |
| :----- | :--- |
| Sketch1 | Árbol frondoso animado (gancho / cierre) |
| Sketch2 | Alga *Anabaena* y Fibonacci emergente |
| Sketch3 | Tortuga LOGO y copo de nieve de Koch |
| Sketch4 | Planta ramificada con corchetes `[ ]` |
| Sketch5 | Bosque estocástico + prueba de estrés (FPS) |
# Presentation_L-Systems
