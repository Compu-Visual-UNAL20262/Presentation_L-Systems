# Catálogo y Referencia Técnica de Sketches en p5.js

Esta guía describe exhaustivamente los **13 sketches interactivos** implementados en el proyecto, documentando para cada uno su gramática formal, parámetros geométricos, controles de usuario y arquitectura en [p5.js](https://p5js.org/).

---

## Índice de Sketches

| # | Módulo | Slide(s) | Concepto Principal | Categoría |
| :-: | :--- | :-: | :--- | :--- |
| **01** | [`Sketch1Tree.tsx`](#sketch-1--árbol-frondoso-animado) | Slide 01 | Crecimiento progresivo y reescritura de nodos | D0L-System |
| **02** | [`Sketch2Algae.tsx`](#sketch-2--alga-anabaena-y-fibonacci) | Slide 07 | División celular, Fibonacci y convergencia áurea | D0L-System |
| **03** | [`Sketch3Koch.tsx`](#sketch-3--fractales-de-tortuga) | Slide 10 | Tortuga LOGO, familias Koch/Sierpinski/Dragón y dimensión fractal $D$ | D0L-System |
| **04** | [`Sketch4Plant.tsx`](#sketch-4--planta-ramificada-con-pila) | Slide 14 | Pila LIFO `[ ]`, bifurcaciones múltiples y sliders en vivo | Bracketed D0L |
| **05** | [`Sketch5Forest.tsx`](#sketch-5--bosque-estocástico-y-prueba-de-estrés) | Slides 18 y 24 | Variación probabilística (S0L) y cuello de botella exponencial FPS | S0L / Rendimiento |
| **06** | [`Sketch6Context.tsx`](#sketch-6--señal-sensible-al-contexto-il) | Slide 19 | Señal hormonal acrópeta ($S < a \to S$) y floración celular | IL-System |
| **07** | [`Sketch7Parametric.tsx`](#sketch-7--grosor-paramétrico-da-vinci) | Slide 20 | Ley de áreas de Leonardo da Vinci ($r_0^e = \sum r_i^e$) | Paramétrico |
| **08** | [`Sketch8FractalZoom.tsx`](#sketch-8--zoom-de-autosimilitud-fractal) | Slide 09 | Invarianza de escala y autosimilitud continua en Koch | Fractal / Zoom |
| **09** | [`Sketch9Sandbox.tsx`](#sketch-9--laboratorio-abierto-sandbox) | Slide 15 | Intérprete en vivo de gramáticas arbitrarias y topes de seguridad | Sandbox Abierto |
| **10** | [`Sketch10Compare.tsx`](#sketch-10--comparador-determinista-vs-estocástico) | Slide 17 | Comparación lado a lado de clones idénticos (D0L) vs. azar (S0L) | D0L vs. S0L |
| **11** | [`Sketch11Rewrite.tsx`](#sketch-11--reescritura-paralela-y-doble-cuaderno) | Slide 23 | Visualización de cabeza lectora y buffer de escritura (*Double Buffering*) | Algorítmico |
| **12** | [`Sketch12Fern.tsx`](#sketch-12--helecho-de-barnsley-ifs) | Slide 11 | Renderizado estocástico punto a punto y fractales biológicos | IFS / Caos |
| **13** | [`SketchClosing.tsx`](#sketch-de-cierre--bosque-en-ola) | Slide 27 | Ecosistema multiespecie con crecimiento procedural en ola | Cierre / S0L |

---

## Sketch 1 · Árbol Frondoso Animado

- **Archivo:** [`src/sketches/Sketch1Tree.tsx`](file:///home/acbel/Documents/Proyectos/Visual/Presentation_L-Systems/src/sketches/Sketch1Tree.tsx)
- **Propósito:** Actúa como el gancho de entrada al inicio de la presentación. Demuestra cómo una regla textual abstracta se traduce en un árbol frondoso orgánico en 4 segundos sin modelos 3D manuales.

### Especificación Formal:
- **Alfabeto ($V$):** $\{ X, F, +, -, [, ] \}$
- **Axioma ($\omega$):** `"X"`
- **Reglas de Producción ($P$):**
  - $X \to \text{FF-[+FFX-X]+[+FFX]-[-FFX+X]}$
  - $F \to \text{FF}$
- **Iteraciones ($n$):** $4$
- **Ángulo de giro ($\delta$):** $20^\circ$

### Lógica de Implementación y Gráficos:
- **Normalización de Bounding Box:** Antes del dibujado, la función `measureBounds()` ejecuta una pasada invisible de la tortuga para determinar el alto y ancho máximos. La longitud de paso (`len`) se calibra automáticamente para ocupar el 78% del alto disponible.
- **Animación Progresiva:** La cadena final se precalcula con *double buffering*. Un cursor de longitud (`charLimit`) avanza `cadena.length / 240` caracteres por frame (240 frames a 60 FPS = 4 segundos exactos).
- **Gradiente y Hojas:** Las ramas interpolan su color desde marrón corteza (`#5C3A21`) en el tronco hasta verde oliva (`#365314`) en los ápices. En cada cierre de corchete `]`, se dibuja una hoja elipsoidal verde esmeralda.
- **Controles:** Tecla `Espacio` o clic para crecer; botón `▶ REPLAY`; botón toggle para alternar entre `1 ÁRBOL` y `BOSQUE (3)`.

---

## Sketch 2 · Alga Anabaena y Fibonacci

- **Archivo:** [`src/sketches/Sketch2Algae.tsx`](file:///home/acbel/Documents/Proyectos/Visual/Presentation_L-Systems/src/sketches/Sketch2Algae.tsx)
- **Propósito:** Evidenciar la derivación simultánea paralela paso a paso y la emergencia espontánea de la serie de Fibonacci y el número áureo ($\phi$).

### Especificación Formal:
- **Alfabeto ($V$):** $\{ A, B \}$
- **Axioma ($\omega$):** `"A"`
- **Reglas ($P$):**
  - $A \to \text{AB}$ (Célula madura se divide)
  - $B \to \text{A}$ (Célula joven madura)
- **Rango de generaciones:** $n = 0 \dots 7$ (longitudes de $1$ a $34$).

### Lógica de Implementación y Gráficos:
- **Matriz de Columnas:** Renderiza las generaciones en filas horizontales alineadas con tipografía monoespaciada.
- **Distinción Celular:** Las células maduras $A$ se colorean en naranja brillante (`#F39C12`) y las células jóvenes $B$ en cian (`#38BDF8`).
- **Telemetría Dual:** Cada fila incluye dos cápsulas informativas:
  1. Contador de células verde esmeralda (sucesión de Fibonacci: 1, 2, 3, 5, 8, 13, 21, 34).
  2. Píldora violeta que calcula en vivo el cociente $\#(A)/\#(B)$, convergiendo visualmente hacia $\phi \approx 1.618$.
- **Controles:** Botón `+ GENERACIÓN`, botón `REINICIAR`, o clics en el lienzo.

---

## Sketch 3 · Fractales de Tortuga

- **Archivo:** [`src/sketches/Sketch3Koch.tsx`](file:///home/acbel/Documents/Proyectos/Visual/Presentation_L-Systems/src/sketches/Sketch3Koch.tsx)
- **Propósito:** Acoplar la tortuga LOGO a gramáticas fractales clásicas, demostrando que un solo motor gráfico puede trazar familias fractales totalmente dispares y calcular su dimensión de Hausdorff $D$.

### Presets Integrados:
1. **Copo de Koch:**
   - Axioma: `F--F--F` (triángulo cerrado), Regla: $F \to \text{F+F--F+F}$, $\delta = 60^\circ$.
   - Dimensión teórica: $D = \frac{\ln 4}{\ln 3} \approx 1.262$.
2. **Flecha de Sierpinski:**
   - Axioma: `A`, Reglas: $A \to \text{B-A-B}$, $B \to \text{A+B+A}$, $\delta = 60^\circ$.
   - Símbolos dibujables: `A` y `B`.
   - Dimensión teórica: $D = \frac{\ln 3}{\ln 2} \approx 1.585$.
3. **Curva del Dragón (Heighway Dragon):**
   - Axioma: `F`, Reglas: $F \to \text{F+G}$, $G \to \text{F-G}$, $\delta = 90^\circ$.
   - Dimensión teórica: $D = 2.0$ (curva continua que llena el plano).

### Controles y UI:
- Selector de familias: `KOCH`, `SIERPINSKI`, `DRAGÓN`.
- Botones de paso de iteración `+` e `-`.
- Botón preset de mutación angular `85° MUTACIÓN`.
- Panel inferior de métricas: muestra Iteraciones, Ángulo, Segmentos dibujados y la Dimensión Fractal teórica $D$.

---

## Sketch 4 · Planta Ramificada con Pila

- **Archivo:** [`src/sketches/Sketch4Plant.tsx`](file:///home/acbel/Documents/Proyectos/Visual/Presentation_L-Systems/src/sketches/Sketch4Plant.tsx)
- **Propósito:** Mostrar cómo los corchetes `[` y `]` generan ramificaciones biológicas realistas y cómo la modificación de un parámetro continuo altera radicalmente el fenotipo vegetal.

### Especificación Formal:
- **Alfabeto ($V$):** $\{ F, +, -, [, ] \}$
- **Axioma ($\omega$):** `"F"`
- **Regla ($P$):** $F \to \text{F[+F][-F]F[+F]}$
  *(Tres pares de corchetes = tres ramas laterales por ciclo; 5 símbolos F por iteración).*
- **Rango interactivo:** Iteraciones $n \in [1, 6]$, Ángulo $\delta \in [5^\circ, 60^\circ]$, Longitud $d \in [4, 30]\text{ px}$.

### Optimizaciones y Presets:
- **Cálculo Desacoplado:** La cadena solo se regenera cuando cambia el slider de iteraciones ($n$). Los deslizadores de ángulo y longitud escalan la geometría en caliente durante `draw()` a 60 FPS sin recalcular cadenas de texto.
- **Presets Inmediatos:**
  - `CIPRÉS (15°)`: Estructura vertical cerrada y espigada.
  - `ARBUSTO (35°)`: Copa abierta, densa y frondosa.

---

## Sketch 5 · Bosque Estocástico y Prueba de Estrés

- **Archivo:** [`src/sketches/Sketch5Forest.tsx`](file:///home/acbel/Documents/Proyectos/Visual/Presentation_L-Systems/src/sketches/Sketch5Forest.tsx)
- **Propósito:** Cumple una doble función según el modo asignado (`mode="stochastic"` en Slide 18 o `mode="stress"` en Slide 24).

### Especificación Formal (S0L-System):
- **Axioma ($\omega$):** `"X"`
- **Producciones Probabilísticas:**
  - $X \xrightarrow{0.40} \text{F[-X][+X]FX}$ (Bifurcación sesgada hacia la izquierda)
  - $X \xrightarrow{0.40} \text{F[+X][-X]FX}$ (Bifurcación sesgada hacia la derecha)
  - $X \xrightarrow{0.20} \text{FF[+X]X}$ (Crecimiento apical recto)
  - $F \to \text{FF}$

### Modos Operativos:
1. **Modo Bosque Estocástico (`stochastic`):**
   - Dibuja 5 árboles alineados con sus propias semillas de aleatoriedad.
   - El botón `⟳ REGENERAR BOSQUE` re-evalúa las reglas estocásticas; los 5 árboles adquieren siluetas orgánicas únicas manteniendo la misma taxonomía botánica.
2. **Modo Prueba de Estrés (`stress`):**
   - Selector de iteraciones de 4 a 8.
   - Demuestra la explosión exponencial $O(b^n)$. En iteración 4 el sistema dibuja cientos de segmentos a 60 FPS estables; al subir a 7 u 8, supera los $100\,000$ segmentos.
   - **Telemetría FPS:** El indicador cambia dinámicamente de verde ($\ge 50$ FPS) a amarillo ($25-49$ FPS) y rojo ($< 25$ FPS), ilustrando empíricamente los límites de cómputo en la GPU/CPU del navegador.

---

## Sketch 6 · Señal Sensible al Contexto (IL)

- **Archivo:** [`src/sketches/Sketch6Context.tsx`](file:///home/acbel/Documents/Proyectos/Visual/Presentation_L-Systems/src/sketches/Sketch6Context.tsx)
- **Propósito:** Ilustrar el Nivel 3 de realismo (IL-Systems): las células vegetales no toman decisiones aisladas, sino que se comunican mediante gradientes hormonales coordinados.

### Especificación Formal:
- **Producción con contexto:**
  $$S < a \to S$$
  *(Una célula inactiva $a$ se transforma en activa $S$ si y solo si su vecina inferior izquierda ya posee la señal).*
- **Comportamiento:** Simula una onda acrópeta que viaja a lo largo de un tallo de 9 células.

### Dinámica Gráfica:
- Cada célula presenta tres estados visuales:
  1. **Reposo:** Color lila / celeste claro (`#E0F2FE`).
  2. **Señal Activa:** Amarillo vibrante (`#FACC15`) con pulso luminoso exterior.
  3. **Florecida:** Rosa (`#F472B6`) con una hoja verde lateral permanente.
- La señal se propaga a una velocidad regulada de 1 célula cada 24 frames (~0.4 s).
- Controles: Botón `▶ LANZAR SEÑAL HORMONAL`, tecla `Espacio` o tecla `R`.

---

## Sketch 7 · Grosor Paramétrico da Vinci

- **Archivo:** [`src/sketches/Sketch7Parametric.tsx`](file:///home/acbel/Documents/Proyectos/Visual/Presentation_L-Systems/src/sketches/Sketch7Parametric.tsx)
- **Propósito:** Ejemplificar el Nivel 4 de realismo (L-Systems Paramétricos), aplicando la ley alométrica de conservación de área formulada por Leonardo da Vinci.

### Formulación Matemática:
$$r_{padre}^e = r_{hija1}^e + r_{hija2}^e \implies r_{hija} = r_{padre} \cdot \left(\frac{1}{2}\right)^{1/e}$$

### Presets y Controles:
- **`CLÁSICO (e = 2.0)`:** Ley clásica de conservación de área de da Vinci. La silueta del árbol resulta fisiológicamente equilibrada y robusta.
- **`FRÁGIL (e = 1.5)`:** El radio decrece a una tasa supercuadrática; las ramas se afilan de golpe, otorgando aspecto quebradizo o desértico.
- **`GRUESO (e = 3.0)`:** El radio decae lentamente; las ramas conservan masa, emulando plantas suculentas o corales.
- Deslizadores en tiempo real para el exponente $e \in [1.2, 3.0]$ y el radio base del tronco en píxeles.

---

## Sketch 8 · Zoom de Autosimilitud Fractal

- **Archivo:** [`src/sketches/Sketch8FractalZoom.tsx`](file:///home/acbel/Documents/Proyectos/Visual/Presentation_L-Systems/src/sketches/Sketch8FractalZoom.tsx)
- **Propósito:** Demostrar intuitivamente qué es un fractal y qué significa la propiedad de **autosimilitud** antes de avanzar a la geometría de la tortuga.

### Características Técnicas:
- Renderiza la curva de Koch y realiza una transformación de matriz (`p.scale`, `p.translate`) continua y enfocada en uno de los vértices triangulares.
- Conforme el zoom penetra en la curva, el recuadro de enfoque resalta cómo la estructura molecular que reaparece a escalas microscópicas es idéntica a la figura macroscópica original.
- Botones de escala fijos: `×1`, `×2`, `×3`, `×6`, `×9`, junto a un botón interactivo de pausa/reanudación del zoom continuo.

---

## Sketch 9 · Laboratorio Abierto (Sandbox)

- **Archivo:** [`src/sketches/Sketch9Sandbox.tsx`](file:///home/acbel/Documents/Proyectos/Visual/Presentation_L-Systems/src/sketches/Sketch9Sandbox.tsx)
- **Propósito:** Brindar un entorno interactivo en vivo donde el usuario puede escribir cualquier axioma y regla sintáctica y observar cómo germina la forma en tiempo real.

### Gramática Abierta Soportada:
- `F`: Avanzar dibujando trazo.
- `+` / `-`: Girar $\pm\delta$.
- `[` / `]`: Push / Pop en la pila vectorial.
- `X`: Variable auxiliar no dibujable para reescritura de nodos.

### Protecciones de Estabilidad:
- **Tope de Seguridad (`MAX_SEGMENTS = 200,000`):** Si una gramática introducida por el usuario explota exponencialmente, el evaluador detiene el homomorfismo antes de agotar la memoria heap de JavaScript y muestra una advertencia visual amarilla en pantalla.
- **Plantillas Preconfiguradas:** Botones de carga rápida para `Arbusto`, `Helecho`, `Matorral` y `Ramo`.

---

## Sketch 10 · Comparador Determinista vs. Estocástico

- **Archivo:** [`src/sketches/Sketch10Compare.tsx`](file:///home/acbel/Documents/Proyectos/Visual/Presentation_L-Systems/src/sketches/Sketch10Compare.tsx)
- **Propósito:** Aislar de manera concluyente el efecto del azar en la computación gráfica.

### Mecánica Visual:
- Divide el lienzo en dos zonas enfrentadas que comparten la misma especie botánica básica:
  - **Izquierda (D0L):** Aplica la regla fija $X \to \text{F[-X][+X]FX}$. Los tres árboles son clones exactos e inmutables.
  - **Derecha (S0L):** Aplica probabilidades estocásticas en cada yema $X$.
- Al presionar el botón `⟳ REGENERAR`, únicamente se recalculan las ramas del lado derecho; el lado izquierdo permanece estático, haciendo evidente la diferencia entre el Nivel 1 y el Nivel 2.

---

## Sketch 11 · Reescritura Paralela y Doble Cuaderno

- **Archivo:** [`src/sketches/Sketch11Rewrite.tsx`](file:///home/acbel/Documents/Proyectos/Visual/Presentation_L-Systems/src/sketches/Sketch11Rewrite.tsx)
- **Propósito:** Mostrar de forma didáctica la mecánica algorítmica interna del *Double Buffering* paso a paso con el modelo del alga ($A \to AB, B \to A$).

### Animación Pedagógica:
- **Cuaderno Superior (HOY / $S_n$):** Lista de lectura de solo lectura. Una cabeza lectora de color naranja (`#F59E0B`) resalta la letra activa actual.
- **Cuaderno Inferior (MAÑANA / $S_{n+1}$):** Lista de salida limpia. A medida que la cabeza lectora avanza, los símbolos sucesores se insertan abajo.
- **Animación de Intercambio (Swap):** Cuando la cabeza alcanza el final de la cadena de entrada, un pulso visual intercambia los dos cuadernos: la cadena inferior se convierte en la nueva entrada superior y el ciclo recomienza.
- Controles: `⏸ PAUSA`, `⏩ RÁPIDO` y `⟳ REINICIAR`.

---

## Sketch 12 · Helecho de Barnsley (IFS)

- **Archivo:** [`src/sketches/Sketch12Fern.tsx`](file:///home/acbel/Documents/Proyectos/Visual/Presentation_L-Systems/src/sketches/Sketch12Fern.tsx)
- **Propósito:** Introducir los fractales naturales mediante Sistemas de Funciones Iteradas (IFS) formulados por Michael Barnsley en 1988.

### Ecuaciones de Transformación Afín:
En cada iteración, se genera un punto nuevo $(x_{n+1}, y_{n+1})$ aplicando una de cuatro transformaciones afines elegidas con probabilidad $p$:

$$f_i(x, y) = \begin{bmatrix} a_i & b_i \\ c_i & d_i \end{bmatrix} \begin{bmatrix} x \\ y \end{bmatrix} + \begin{bmatrix} e_i \\ f_i \end{bmatrix}$$

| Función | $a$ | $b$ | $c$ | $d$ | $e$ | $f$ | Probabilidad ($p$) | Estructura Generada |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **$f_1$** | $0$ | $0$ | $0$ | $0.16$ | $0$ | $0$ | $0.01$ ($1\%$) | Tallo base del helecho |
| **$f_2$** | $0.85$ | $0.04$ | $-0.04$ | $0.85$ | $0$ | $1.60$ | $0.85$ ($85\%$) | Folíolos superiores sucesivamente más pequeños |
| **$f_3$** | $0.20$ | $-0.26$ | $0.23$ | $0.22$ | $0$ | $1.60$ | $0.07$ ($7\%$) | Rama lateral izquierda más grande |
| **$f_4$** | $-0.15$ | $0.28$ | $0.26$ | $0.24$ | $0$ | $0.44$ | $0.07$ ($7\%$) | Rama lateral derecha más grande |

- Se dibujan $90\,000$ puntos progresivamente en el lienzo transparente para que el público aprecie la acumulación estocástica del fractal.

---

## Sketch de Cierre · Bosque en Ola

- **Archivo:** [`src/sketches/SketchClosing.tsx`](file:///home/acbel/Documents/Proyectos/Visual/Presentation_L-Systems/src/sketches/SketchClosing.tsx)
- **Propósito:** Cierre visual de la plataforma. Refuerza la tesis de la investigación: *"Reglas simples producen mundos infinitos"*.

### Características Técnicas:
- **Densidad Adaptativa:** Calcula la cantidad de árboles según el ancho de pantalla ($4$ en teléfonos móviles, $6$ en tablets, $8$ en pantallas de alta resolución).
- **Ola Procedural:** Los árboles inician su ciclo de crecimiento desfasados en el tiempo de izquierda a derecha (`waveOrder`).
- **Autoejecución:** Comienza a crecer automáticamente tan pronto se monta la diapositiva, complementado con un botón `▶ REPLAY` para reiniciar la animación.
