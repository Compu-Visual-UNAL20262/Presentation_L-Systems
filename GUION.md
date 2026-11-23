# **Guion y Estructura de Presentación: L-Systems (≈ 55 Minutos)**

# **Enfoque intuitivo para Computación Visual con demostraciones en vivo en p5.js**

# **Sección 1: Arquitectura General y Dinámica de Relevos (≈ 55 Minutos)**

Para evitar la monotonía de una exposición secuencial, la presentación se divide en 6 secciones temáticas. En cada sección participan varios integrantes mediante relevos ágiles de 1.5 a 4 minutos, alternando entre analogías visuales en diapositivas minimalistas y demostraciones interactivas.

> **Nota de implementación:** la presentación es una **aplicación web propia (React + p5.js)** desplegada, no el editor de p5.js. Se navega con las flechas ← →, swipe en móvil, el menú ≡ MENU o los botones ◄ ► del HUD. Los **12 sketches** están embebidos como slides interactivos con sus propios controles en pantalla (botones, sliders, campos editables, presets). No hay que abrir pestañas ni pulsar "Play". Toda la interfaz es responsiva: en móvil los paneles de control se colapsan (botón ⚙/✎ CONTROLES) y los lienzos se reescalan solos. Hay **dos videos embebidos** que arrancan **en silencio** al pulsar ▶ (pensados como fondo mientras el expositor habla): "La belleza de la geometría fractal" (Wild Math · SoME2) en el Slide 08 y el trailer de No Man's Sky (clip 0:17–0:42) en el Slide 27.

> **Nota de interfaz (público):** la aplicación ya **no muestra la palabra «Acto»** en pantalla. Cada sección se identifica con una etiqueta temática corta (ORIGEN · INGREDIENTES · LA TORTUGA · NATURALEZA VIVA · DETRÁS DE CÁMARAS · IMPACTO REAL) y los sketches con una etiqueta «Demo · …» o «Concepto · …». La estructura de 6 secciones de este guion es interna, solo para coordinar los relevos del equipo.

> **Actualización de contenido (v3 · ≈55 min):** sobre la v2 se añadieron cinco piezas interactivas para profundizar y ampliar el tiempo con valor: (1) **¿Qué es un fractal?** con zoom de autosimilitud (Slide 09); (2) **Fractales en la naturaleza** con el helecho de Barnsley (Slide 11); (3) **Laboratorio abierto** donde el público escribe su propio axioma/regla (Slide 15); (4) **Determinista vs. azar** lado a lado (Slide 19); y (5) **El doble cuaderno en vivo**, la reescritura paralela paso a paso (Slide 24). Además se definen explícitamente los conceptos *fractal*, *dimensión fractal* y *gramática*.

| Integrante | Rol Principal en Escena | Intervenciones | Tiempo Total aprox. |
| :---- | :---- | :---- | :---- |
| Nicolas Bolaños | **Anfitrión y Operador de Demos Base:** Abre con el impacto visual, opera los sketches de crecimiento, el laboratorio abierto y conecta con videojuegos. | Secciones 1, 2, 3, 4 y 6 | ~14 min |
| Ariadna Rueda | **Narrador Histórico y Operador de Variación:** Explica el origen biológico, los fractales y su dimensión, los bosques aleatorios y el cierre. | Secciones 1, 3, 4, 5 y 6 | ~13 min |
| Farid Ardila | **Especialista en Espacio y 3D:** Explica el paralelismo, la ramificación con memoria, la comunicación celular, el grosor paramétrico, el salto al 3D y ciudades. | Secciones 1, 3, 4, 5 y 6 | ~15 min |
| Angel Beltrán | **Arquitecto de Reglas y Rendimiento:** Traduce el "ADN" (axioma/reglas), explica el azar, el doble cuaderno en vivo y aplicaciones científicas. | Secciones 2, 3, 4, 5 y 6 | ~13 min |

# **Sección 2: Estructura de las Diapositivas (23 slides + navegador)**

**Regla de oro:** Ninguna diapositiva supera las 15 palabras. Cada slide es un ancla visual; la explicación vive en la voz del equipo y en los sketches interactivos embebidos.

| Slide | Título en Pantalla | Contenido Visual (Apoyo Minimalista) | Transición / Acción |
| :---- | :---- | :---- | :---- |
| 01 | (Sin título — Sketch 1 a pantalla completa) | Árbol frondoso de p5.js. Pista "▶ CLICK / ESPACIO PARA CRECER". | Arranca en vivo: clic o ESPACIO en 00:00. |
| 02 | L-Systems: El ADN de las Formas | Subtítulo "Programar el crecimiento…" + los 4 nombres del equipo (Gaymers) con su color P1–P4. | Entra tras el gancho visual. |
| 03 | 1968: Aristid Lindenmayer | **Foto real** de *Anabaena catenula* al microscopio + diagrama del filamento (A → B). | Apoyo narrativo histórico. |
| 04 | Uno a la Vez vs. Todos al Tiempo | Dos columnas: gramática secuencial vs. L-System paralelo + meme. | Contraste conceptual (define «gramática»). |
| 05 | Los 3 Ingredientes | Alfabeto `{A,B}` · Axioma `A` · Reglas `A → AB · B → A` (valores visibles). | Presenta la receta básica. |
| 06 | El Alga que Sabe Contar | Reglas `A → AB` / `B → A` arriba + filas A → AB → ABA → ABAAB (1,2,3,5). | Ancla la regla antes del Sketch 2. |
| 07 | Sketch 2: Fibonacci emergente + φ | Botón + GENERACIÓN (n=0..7), contador Fibonacci **y cociente A:B → φ ≈ 1.618**. | Demo en vivo. |
| 08 | De Letras a Píxeles: La Tortuga | **Video de fondo** "La belleza de la geometría fractal" (Wild Math · SoME2, desde 0:50, en silencio) + comandos F (avanza), + (gira +δ), − (gira −δ). | Introduce la tortuga. |
| 09 | ¿Qué es un Fractal? | **Zoom de autosimilitud** sobre la curva de Koch: la misma forma reaparece a cada escala + definición en pantalla. Botón ⏸/▶. | **(NUEVO)** Define «fractal» antes de usarlo. |
| 10 | Sketch 3: Fractales de tortuga | Mini-editor (iteraciones/ángulo) + lienzo. Selector **KOCH / SIERPINSKI / DRAGÓN** + **dimensión fractal D**. Arranca pequeño (iter 1, 60°). | Demo en vivo. |
| 11 | Fractales en la Naturaleza | **Helecho de Barnsley** que emerge punto a punto + ejemplos reales (brócoli romanesco, costas, rayos, pulmones). Botón ⟳. | **(NUEVO)** Conecta fractal ↔ mundo real. |
| 12 | El Superpoder de Recordar: \[ y \] | Diagrama de pila LIFO con pin de ubicación. | Diagrama clave de ramificación. |
| 13 | Crecer por Tallos vs. por Yemas | Aristas (F→…) vs. nodos (X→…), con reglas visibles. | Contraste de reescritura. |
| 14 | Sketch 4: Planta ramificada | Sliders δ / longitud / iteraciones + presets CIPRÉS 15° y ARBUSTO 35°. | Demo en vivo. |
| 15 | Laboratorio: construye tu L-System | **Editor abierto**: campos de Axioma, Regla F→, Regla X→, ángulo e iteraciones + plantillas; render en vivo. | **(NUEVO)** Momento participativo. |
| 16 | Los 5 Niveles de Realismo | Escalera de 5 peldaños (D0L · S0L · IL · Paramétrico · Open). | Guía la sección NATURALEZA VIVA. |
| 17 | El Bosque de los Dados | Clon idéntico vs. variación estocástica. | Introduce el azar. |
| 18 | Sketch 5: Bosque estocástico | 5 árboles + botón REGENERAR (arranca en iteración 4). | Demo en vivo. |
| 19 | Sketch: Determinista vs. azar | **Dos mini-bosques lado a lado**: D0L (clones idénticos) vs. S0L (cada árbol único). Botón ⟳ solo afecta al lado del dado. | **(NUEVO)** Aísla el papel del azar. |
| 20 | Sketch 6: Señal sensible a contexto | Tallo de células; una señal hormonal sube de la raíz a la punta. Regla `S < a → S`. Botón ▶ LANZAR SEÑAL. | Demo en vivo (Nivel 3 · IL). |
| 21 | Sketch 7: Grosor paramétrico (da Vinci) | **L-System paramétrico**: grosor por ley de áreas de da Vinci. Menú FRÁGIL e=1.5 / CLÁSICO e=2 / GRUESO e=3 + sliders. | Demo en vivo (Nivel 4). |
| 22 | Cuando la Planta Mira al Sol | Planta curvándose hacia la luz / esquivando obstáculo. | Contexto y entorno (Nivel 5). |
| 23 | El Peligro Exponencial y el Doble Cuaderno | Curva exponencial + dos buffers (Sₙ → Sₙ₊₁). | Prepara el doble cuaderno y la estrés. |
| 24 | Sketch: El doble cuaderno en vivo | **Reescritura paralela paso a paso** (A→AB, B→A): cabeza lectora en HOY (Sₙ), escritura en MAÑANA (Sₙ₊₁) y swap. Controles ⏸/⏩/⟳. | **(NUEVO)** Visualiza el double buffering. |
| 25 | Sketch 5: Prueba de estrés | Selector de iteraciones + telemetría Segmentos/FPS (arranca en 4). | Demo en vivo. |
| 26 | Del Plano 2D al Mundo 3D | Tortuga 3D **en movimiento** (ejes H/L/U, yaw/pitch/roll) + línea→cilindro + **render real**. | Explica geometría 3D. |
| 27 | Mundos Infinitos en Pocos Kilobytes | **Trailer de No Man's Sky** (0:17–0:42, en silencio) + 3 tarjetas: flora de videojuego, ciudad procedural (Parish & Müller) y galería de fractales. | Cierre e impacto real. |
| 28 | Cierre: Reglas Simples, Mundos Infinitos | **Bosque estocástico diverso** que crece en ola (auto-arranca) + emblema Gaymers. | Conclusión final. |

# **Sección 3: Los 12 Sketches Interactivos (embebidos en la app)**

Los 12 sketches ya están integrados como slides interactivos con controles en pantalla; **no hay que escribir código ni abrir pestañas**. Estados iniciales y controles:

1. **Sketch 1 (Slide 01):** Árbol frondoso. Crece al hacer **clic** o pulsar **ESPACIO**; botón ▶ REPLAY y toggle 1 ÁRBOL / BOSQUE (3).
2. **Sketch 2 (Slide 07):** Alga y Fibonacci. Botón **+ GENERACIÓN** (n=0 a 7) y **REINICIAR**; a la derecha de cada fila, el contador de letras (Fibonacci) y una segunda píldora con el **cociente A:B**, que converge al número áureo φ ≈ 1.618.
3. **Sketch 3 (Slide 10):** Fractales de tortuga. **Arranca pequeño y ligero** (`iteraciones=1`, `angulo=60`); botones +/−, presets 60° KOCH / 85° MUTACIÓN, selector de familia fractal **KOCH / SIERPINSKI / DRAGÓN** y ▶ REPETIR TRAZO. El indicador inferior muestra iteraciones, ángulo, segmentos y la **dimensión fractal D** de la curva activa.
4. **Sketch 8 — ¿Qué es un fractal? (Slide 09):** zoom continuo sobre la curva de Koch; como es autosimilar, la misma forma reaparece a cada escala, con un recuadro que la señala. Botón ⏸/▶ (también ESPACIO). Define el concepto antes de usarlo.
5. **Sketch 12 — Fractales en la naturaleza (Slide 11):** el **helecho de Barnsley** emerge punto a punto (miles de puntos por frame) y, al lado, íconos de fractales reales (brócoli romanesco, costas, rayos, pulmones). Botón ⟳ VOLVER A CRECER.
6. **Sketch 4 (Slide 14):** Planta ramificada. Sliders de ángulo (δ), longitud e iteraciones + presets **CIPRÉS 15°** y **ARBUSTO 35°**. En móvil, botón ⚙ CONTROLES.
7. **Sketch 9 — Laboratorio abierto (Slide 15):** el público escribe su **propio** L-System. Campos editables de **Axioma**, **Regla F→**, **Regla X→**, controles de **ángulo** e **iteraciones** y plantillas (Arbusto, Helecho, Matorral, Ramo). Render en vivo con pila `[ ]` y tope de seguridad de segmentos. En móvil, botón ✎ EDITOR.
8. **Sketch 5 (Slides 18 y 25):** Bosque estocástico + estrés. Botón **⟳ REGENERAR BOSQUE** y selector de iteraciones (4–8). **Ambos modos arrancan en iteración 4**; telemetría de Segmentos y FPS con semáforo.
9. **Sketch 10 — Determinista vs. azar (Slide 19):** dos mini-bosques lado a lado. El izquierdo (D0L) son clones idénticos; el derecho (S0L) tira un dado en cada yema. El botón **⟳ REGENERAR** solo cambia el lado estocástico (el determinista queda fijo).
10. **Sketch 6 (Slide 20):** L-System sensible al contexto (IL). Señal hormonal que sube de la raíz a la punta; cada célula **mira a su vecina** antes de activarse (regla `S < a → S`). Botón **▶ LANZAR SEÑAL** (también ESPACIO / R).
11. **Sketch 7 (Slide 21):** L-System paramétrico (grosor de da Vinci). Grosor por la ley de áreas `r_padre^e = r_hija1^e + r_hija2^e`. Menú **Ley de grosor** (FRÁGIL e=1.5 / **CLÁSICO e=2** / GRUESO e=3) + sliders de exponente y grosor. En móvil, botón ⚙ CONTROLES.
12. **Sketch 11 — El doble cuaderno (Slide 24):** reescritura paralela paso a paso con el alga (A→AB, B→A). Una cabeza lee HOY (Sₙ) y escribe los sucesores en MAÑANA (Sₙ₊₁); al terminar, intercambia los cuadernos. Controles ⏸ PAUSA / ⏩ RÁPIDO / ⟳ REINICIAR (ESPACIO pausa).
13. **Sketch de Cierre (Slide 28):** Bosque estocástico **diverso** (cada árbol único) que **auto-arranca** y crece en ola; botón ▶ REPLAY. La cantidad de árboles se adapta al ancho (4 en móvil, 6-8 en proyector).

# **Sección 4: Guion Completo de la Presentación (≈ 55 Minutos)**

Los tiempos son una guía de ritmo; conviene cronometrar en el ensayo. Para ajustar, ver la **Sección 5: Notas de Ritmo y Recortes** al final.

# **ORIGEN — El Enganche Visual y el Origen Biológico (00:00 – 07:30)**

## **\[00:00 – 02:30 \| Nicolas Bolaños\] — \[EN VIVO: SKETCH 1 (SLIDE 01)\] → \[SLIDE 02\]**

* **Acción en pantalla:** En el Slide 01 (árbol a pantalla completa) haz **clic en el lienzo** o pulsa **ESPACIO** antes de saludar. El árbol crece frente a todos en 4 segundos. Tras presentar la tesis, pulsa el toggle **BOSQUE (3)** para mostrar que la *misma* gramática produce tres árboles distintos; luego vuelve a **1 ÁRBOL**. (El botón ▶ REPLAY relanza la animación cuando quieras.)
* **Guion:** "Imaginen que tienen que entregar mañana un videojuego con un bosque de diez mil árboles. Si se sientan en Blender a modelar rama por rama y hoja por hoja, no duermen en seis meses y el archivo pesaría gigabytes. Lo que acaban de ver en pantalla no es un modelo 3D guardado ni una imagen: son literalmente **dos reglas de reescritura** ejecutándose en tiempo real. Y miren esto —cambio a modo bosque— con las mismas reglas aparecen tres árboles y ninguno es idéntico. Hoy vamos a entender cómo funciona esa magia detrás de los L-Systems o Sistemas de Lindenmayer: el arte de programar el crecimiento en lugar de esculpir objetos. Y esto no es solo para videojuegos: es cómo la biología, la arquitectura y el cine generan complejidad infinita a partir de reglas simples. En el título pueden ver nuestro lema: no esculpimos formas, programamos su ADN y dejamos que el código crezca. La pregunta es cómo unas pocas reglas pueden producir una forma que parece haber sido cultivada."

## **\[02:30 – 05:00 \| Ariadna\] — \[SLIDE 03\]**

* **Guion:** "Lo curioso es que esta herramienta fundamental de la computación visual no nació en un laboratorio de gráficos por computadora, sino en un laboratorio de biología. En 1968, un biólogo húngaro llamado Aristid Lindenmayer estudiaba algo aparentemente sencillo: cómo crecen las algas filamentosas bajo el microscopio. Lo que ven en pantalla es precisamente eso: el alga real *Anabaena*, dividiéndose célula a célula, igual que la miraba Lindenmayer. Él notó que las plantas no se construyen como una casa donde pones un ladrillo encima de otro, sino siguiendo instrucciones celulares repetitivas. Lindenmayer inventó un lenguaje para escribir esas recetas biológicas, y décadas después los artistas digitales descubrieron que ese mismo lenguaje servía para cultivar mundos virtuales enteros. Por eso, antes de hablar de videojuegos, empezamos observando cómo una sola célula puede ser el punto inicial de una estructura completa. La clave es que Lindenmayer encontró un patrón común de crecimiento, no solo una apariencia específica."

## **\[05:00 – 07:30 \| Farid Ardila\] — \[SLIDE 04\]**

* **Guion:** "En ciencias de la computación ya conocemos las **gramáticas**: conjuntos de reglas que dicen cómo transformar unos símbolos en otros, como las que usan los compiladores para revisar si escribimos bien un programa. Pero esas gramáticas tradicionales funcionan como una línea de ensamblaje: un trabajador hace un cambio a la vez, paso por paso, un símbolo por turno. Un ser vivo no funciona así. En una planta, cuando sale el sol, todas las células de las raíces, el tallo y las hojas se dividen al mismo tiempo. Esa es la gran diferencia de los L-Systems: aplican las reglas en paralelo sobre toda la estructura en cada latido de tiempo. En esta comparación vemos a la derecha una operación simultánea, mientras que el modelo tradicional avanza de izquierda a derecha como en una línea de producción. Cada símbolo de la cadena recibe su transformación durante la misma generación. Para nosotros es un cambio de estado global; para una planta, es el crecimiento coordinado de todo el organismo."

# **INGREDIENTES — Los 3 Ingredientes del ADN Digital (07:30 – 15:30)**

## **\[07:30 – 10:00 \| Angel Beltran\] — \[SLIDE 05\] → \[SLIDE 06\]**

* **Guion:** "Para crear uno de estos sistemas no necesitamos matemáticas intimidantes; solo necesitamos tres ingredientes, igual que en la genética. Primero, un Alfabeto: las piezas o fichas con las que jugamos, por ejemplo las letras A y B. Segundo, un Axioma: la semilla inicial con la que arranca todo en el segundo cero, digamos una sola letra A. Y tercero, las Reglas: qué le pasa a cada ficha en el siguiente turno. En el experimento original del alga, la regla dice: cada A se transforma en AB, y cada B madura y se vuelve A. La diapositiva conserva estos tres elementos como una receta visible: el alfabeto define las piezas, el axioma arranca la cadena y las reglas describen su crecimiento. Los ingredientes son simples, pero su combinación establece toda la historia de generaciones futuras. Cambiar una sola parte puede alterar completamente la estructura, aunque las otras dos permanezcan igual."

## **\[10:00 – 13:00 \| Nicolas Bolaños\] — \[EN VIVO: SKETCH 2 (SLIDE 07)\]**

* **Acción en pantalla:** Navega al Slide 07 y pulsa el botón **+ GENERACIÓN** (o clic en el lienzo) para avanzar de n=0 hasta n=7. Señala la columna derecha: la píldora verde cuenta las letras (Fibonacci) y la píldora violeta muestra el **cociente A:B**. El botón **REINICIAR** vuelve a n=0.
* **Guion:** "Veámoslo correr en vivo. Empezamos con A. En el primer paso, A se convierte en AB. En el segundo paso, recordemos que todo ocurre al tiempo: la A se vuelve AB y la B se vuelve A, así que obtenemos ABA. Si sigo avanzando, miren los números verdes de la derecha: 1, 2, 3, 5, 8, 13, 21, 34... Nadie programó aquí la serie de Fibonacci, pero emerge sola de dos reglas diminutas. Y hay un segundo regalo escondido: miren la píldora violeta, el cociente entre las letras A y las letras B. Va dando 1, 2, 1.5, 1.66, 1.6, 1.625... y se va acercando a un número muy especial: 1.618, el **número áureo**, la misma proporción que aparece en las conchas de caracol, los girasoles y hasta en el arte renacentista. De dos reglas de una línea emergen a la vez Fibonacci y la razón áurea. Esa es la esencia de la complejidad emergente en computación visual: ninguna letra conoce la serie completa, solo aplica su propia regla y el patrón aparece globalmente."

## **\[13:00 – 15:30 \| Angel Beltran\] — \[SLIDE 08\]**

* **Guion:** "Ahora, como estudiantes de computación visual tenemos un problema evidente: una fila infinita de letras A y B todavía no se parece a un árbol ni a un fractal. Es solo texto en una dimensión. Necesitábamos un traductor que convirtiera esas letras en trazos sobre un lienzo. Y ahí es donde entra uno de los conceptos más intuitivos de la historia de la programación. En el siguiente paso, una cadena abstracta se convertirá en movimiento espacial mediante símbolos de avance y giro. Esta separación es importante: las reglas producen una cadena y la interpretación geométrica convierte esa cadena en imagen. Podemos cambiar el dibujo sin alterar el crecimiento, o viceversa."

# **LA TORTUGA — La Tortuga, los Fractales y el Poder de Recordar (15:30 – 29:30)**

## **\[15:30 – 18:30 \| Ariadna\] — \[SLIDE 08\] → \[SLIDE 09: ¿QUÉ ES UN FRACTAL?\]**

* **Acción en pantalla (Slide 08):** Al entrar al Slide 08, pulsa ▶ en el **video de fondo "La belleza de la geometría fractal"** (Wild Math · SoME2, arranca en 0:50, en silencio): déjalo correr mientras presentas la tortuga y sus 3 comandos (F, +, −). Luego pasa al Slide 09.
* **Acción en pantalla (Slide 09):** El Slide 09 hace un **zoom continuo** sobre la curva de Koch; el recuadro rosa señala cómo la misma forma reaparece a cada escala. Deja correr el zoom mientras defines el concepto; ⏸ para congelar una escala concreta.
* **Guion:** "En los años ochenta, Przemyslaw Prusinkiewicz tuvo una idea brillante: adaptar la 'tortuga' del lenguaje LOGO a los L-Systems, conectando el texto a una tortuga virtual con un lápiz en la cola. Si lee una F, camina hacia adelante dibujando; si lee un \+, gira a un lado; si lee un \-, gira al otro. Antes de usarla, aclaremos una palabra que repetiremos mucho: ¿qué es un **fractal**? Miren la pantalla: es una figura hecha de **copias más pequeñas de sí misma**. Hago zoom y... aparece otra vez la misma forma; y otra; y otra. A eso se le llama *autosimilitud*: se ve igual a cualquier escala. No es un invento de las matemáticas abstractas: un brócoli romanesco, la orilla de una costa, un rayo o un árbol tienen esa misma propiedad. Guarden esta idea, porque todo lo que dibuje la tortuga a partir de ahora será exactamente eso: un fractal construido con reglas simples."

## **\[18:30 – 22:00 \| Ariadna\] — \[EN VIVO: SKETCH 3 (SLIDE 10)\] → \[SLIDE 11: FRACTALES EN LA NATURALEZA\]**

* **Acción en pantalla (Slide 10):** El Slide 10 **arranca pequeño y ligero**: `iteraciones = 1`, `ángulo = 60` (un triángulo). Con **+/−** sube a 2, 3 y 4 para ver cómo evoluciona el copo paso a paso; señala la **dimensión fractal D ≈ 1.262** del indicador. Pulsa **85° MUTACIÓN**, y luego el selector **SIERPINSKI** (D ≈ 1.585) y **DRAGÓN** (D ≈ 2).
* **Acción en pantalla (Slide 11):** El Slide 11 hace emerger el **helecho de Barnsley** punto a punto; cuando esté formado, señala los íconos de la derecha (brócoli, costas, rayos, pulmones). Botón ⟳ para volver a crecer.
* **Guion:** "Veámoslo en vivo. Una sola regla sobre un triángulo: en cada iteración cada lado se quiebra en un pico, y en cuatro pasos tenemos el copo de nieve de Koch. Fíjense en el dato de abajo: su **dimensión fractal** es ≈ 1.26. ¿Qué quiere decir? Una línea tiene dimensión 1 y una superficie llena, dimensión 2; este fractal es tan rugoso que se queda *entre* ambas. Y el mismo motor, con otra regla, me da el triángulo de Sierpinski (1.585) o la curva del dragón, que casi llena el plano (≈ 2). La tortuga solo ejecuta símbolos en orden; cambiando la receta, aparece una familia entera de fractales. Y esto no es solo matemática de pizarra: miren este helecho —el helecho de Barnsley—. Nace de puro azar guiado por cuatro reglas, y cada hoja es una copia del helecho completo. La naturaleza está llena de fractales: el brócoli romanesco, las costas, los rayos, nuestros propios pulmones. Por eso los L-Systems se ven tan vivos: hablan el mismo idioma que la naturaleza."

## **\[22:00 – 24:30 \| Farid Ardila\] — \[SLIDE 12\] → \[SLIDE 13\]**

* **Acción en pantalla:** Sobre el Slide 12 (pila LIFO), narra un recorrido concreto `[ ... ]` señalando cómo se apila la posición al abrir corchete y cómo se recupera al cerrar.
* **Guion:** "La tortuga ya dibuja figuras continuas, pero un árbol no es una sola línea: tiene ramas que nacen del tronco y luego regresan a él para sacar otra. ¿Cómo hace la tortuga para no perderse? Con dos símbolos mágicos: los corchetes \[ y \]. Piénsenlo como poner un pin en Google Maps. Al leer abrir corchete \[, guarda dónde está y hacia dónde mira —un *push* a la pila—. Dibuja una rama lateral; y al leer cerrar corchete \], hace *pop* y se teletransporta de vuelta al pin para seguir subiendo. La pila es LIFO porque la última rama abierta es la primera en cerrarse. Además, podemos alargar tallos existentes (reescritura de aristas) o usar 'yemas' invisibles en las puntas (reescritura de nodos) para controlar cómo envejece cada rama. Con esta memoria representamos la jerarquía real de ramas y subramas."

## **\[24:30 – 27:00 \| Nicolas Bolaños\] — \[EN VIVO: SKETCH 4 (SLIDE 14)\]**

* **Acción en pantalla:** El Slide 14 arranca simple (iteración baja). Pulsa **CIPRÉS 15°** y luego **ARBUSTO 35°**; recalca que es la misma gramática con distinto parámetro. Sube el slider de **Iteraciones n** para que cada ramita hija repita la arquitectura de la madre.
* **Guion:** "Probemos esos corchetes en vivo. La regla tiene tres pares de corchetes: tres ramas laterales por ciclo. Miren el slider del ángulo: con 15 grados tenemos un ciprés cerrado y alto; si lo abro a 35, se vuelve un arbusto frondoso. Misma regla, mismo 'ADN': cambié un número y nació otra especie. Y si subo las iteraciones, cada ramita repite la arquitectura de su madre —autosimilitud otra vez—. El ángulo controla la silueta; las iteraciones añaden detalle, pero multiplican las instrucciones, y de ahí viene el reto de rendimiento que veremos más adelante."

## **\[27:00 – 29:30 \| Nicolas Bolaños + público\] — \[EN VIVO: SKETCH 9 — LABORATORIO (SLIDE 15)\]**

* **Acción en pantalla:** El Slide 15 es el **laboratorio abierto**. Arranca con una plantilla (Arbusto). Cambia en vivo la **Regla X→** (por ejemplo añade o quita un `[+X]`), sube el ángulo, sube iteraciones; todo se redibuja al instante. Invita a la audiencia a proponer una regla o pide a un voluntario que la escriba. Las plantillas (Helecho, Matorral, Ramo) sirven como punto de partida rápido.
* **Guion:** "Ya tenemos todas las piezas: alfabeto, axioma, reglas, la tortuga y los corchetes. Juntémoslas en un laboratorio donde ustedes mandan. Aquí puedo escribir cualquier axioma y cualquier regla y verla crecer al instante. Miren: si a esta regla le agrego una rama más... la planta cambia por completo. Si abro el ángulo... se despeina. ¿Alguien quiere proponer una regla? Díganme símbolos: F, corchete, más, equis... —la escribo— y veamos qué planta nace. Esto es lo poderoso de los L-Systems: no dibujamos la planta, escribimos su ADN en una línea de texto y la computadora la cultiva. Con cuatro símbolos y una regla caben infinitas formas distintas."

# **NATURALEZA VIVA — De Clones Perfectos a Naturaleza Viva: Los 5 Niveles (29:30 – 41:30)**

## **\[29:30 – 31:30 \| Angel Beltran\] — \[SLIDE 16\] → \[SLIDE 17\]**

* **Guion:** "Existen cinco niveles de L-Systems para representar la naturaleza con distinto grado de realismo. Empecemos por los dos primeros. Si ponen diez árboles generados con la regla que acaban de ver uno al lado del otro, notarán algo raro: parecen soldados de plástico. Son clones idénticos porque el primer nivel es **determinista**: siempre elige la misma regla. En la naturaleza, el viento, la genética y el azar hacen que dos semillas hermanas crezcan distinto. Por eso pasamos al segundo nivel: los L-Systems **estocásticos**, donde a cada letra le damos varias reglas posibles con una probabilidad, como lanzar un dado en cada rama. La escalera resume la progresión, de exacto hasta sensible al entorno; cada peldaño conserva lo anterior y añade una capacidad nueva."

## **\[31:30 – 33:00 \| Ariadna\] — \[EN VIVO: SKETCH 5 (SLIDE 18)\]**

* **Acción en pantalla:** El Slide 18 muestra 5 árboles en iteración 4. Pulsa **⟳ REGENERAR BOSQUE** varias veces para que las 5 siluetas cambien de forma orgánica en cada clic.
* **Guion:** "Aquí tenemos la misma especie de árbol, pero la regla ya no es única: en cada punta lanzamos un dado. El 80 % de las veces la rama se bifurca y el 20 % crece más recto. Cada vez que regenero, nace un bosque natural donde ningún árbol repite la silueta del vecino. La diferencia no viene de cambiar la especie ni de dibujar cinco modelos: nace de permitir varias decisiones dentro de una misma gramática. El azar da diversidad sin perder coherencia."

## **\[33:00 – 34:30 \| Ariadna\] — \[EN VIVO: SKETCH 10 — DETERMINISTA vs. AZAR (SLIDE 19)\]**

* **Acción en pantalla:** El Slide 19 muestra dos mini-bosques lado a lado. Pulsa **⟳ REGENERAR** varias veces: el lado izquierdo (determinista) nunca cambia; el derecho (estocástico) nace distinto cada vez.
* **Guion:** "Veamos los dos niveles enfrentados en la misma pantalla. A la izquierda, un L-System determinista: por más veces que pulse regenerar, los tres árboles salen idénticos, son clones perfectos. A la derecha, el mismo árbol pero con el dado: cada clic produce tres siluetas únicas. Esta es la diferencia exacta entre el nivel 1 y el nivel 2, y es la razón por la que los bosques de los videojuegos no parecen un ejército de fotocopias. La gramática es casi la misma; lo único que cambia es si dejamos entrar el azar."

## **\[34:30 – 36:30 \| Farid Ardila\] — \[EN VIVO: SKETCH 6 (SLIDE 20)\]**

* **Acción en pantalla:** El Slide 20 muestra un tallo de células. Pulsa **▶ LANZAR SEÑAL HORMONAL**: una señal amarilla sube desde la raíz y, célula por célula, va floreciendo la rama. Repite el lanzamiento si quieres mostrarlo de nuevo.
* **Guion:** "Subamos al tercer nivel, el más sutil: los sistemas **sensibles al contexto**. Hasta ahora cada letra cambiaba mirándose solo a sí misma. Pero en la naturaleza las células hablan con sus vecinas. Miren la pantalla: lanzo una señal hormonal desde la raíz, abajo. La regla que gobierna esto se lee así: una célula solo se activa *si su vecina de abajo ya tiene la señal* —eso es lo que significa `S < a → S`, el símbolo mira a su izquierda antes de transformarse—. Así la señal sube de célula en célula, como las hormonas vegetales reales que viajan de la raíz a la copa avisando cuándo florecer. Vean cómo la floración recorre el tallo en orden: ninguna célula se adelanta, porque cada una espera a que su vecina reciba primero el mensaje. Esto es lo que permite simular comunicación interna en una planta: el crecimiento deja de ser ciego y empieza a coordinarse."

## **\[36:30 – 38:30 \| Farid Ardila / Angel Beltran\] — \[EN VIVO: SKETCH 7 (SLIDE 21)\]**

* **Acción en pantalla:** El Slide 21 muestra un árbol frondoso cuyo grosor sigue la ley de da Vinci (visible arriba en pantalla). Con el menú **Ley de grosor** fija el exponente: **CLÁSICO e=2** (tronco creíble, botón resaltado por defecto), **FRÁGIL e=1.5** (ramas que se afilan de golpe) y **GRUESO e=3** (tronco suculento). El slider de exponente permite valores intermedios y el de grosor cambia el grosor del tronco.
* **Guion:** "El cuarto nivel son los L-Systems **paramétricos**: cada símbolo ya no es solo una letra, carga un número en una mochila, como el grosor de la rama. ¿Qué número usamos para adelgazar las ramas al bifurcarse? El que descubrió Leonardo da Vinci hace 500 años: cuando un tronco se parte en ramas, el **área** se conserva. En fórmula, el grosor del padre elevado al cuadrado es igual a la suma de los grosores de las hijas al cuadrado; ese exponente 2 es la ley clásica de áreas. Con el preset CLÁSICO e=2 obtenemos este tronco que se afina de forma natural y creíble. Si bajo a FRÁGIL, las ramas se afilan demasiado rápido; si subo a GRUESO, el árbol engorda. Fíjense que no cambié el dibujo a mano: cambié el parámetro de grosor que viaja en cada símbolo y toda la ramificación se recalculó. Por eso los árboles de los videojuegos modernos se ven reales: aplican exactamente esta regla paramétrica."

## **\[38:30 – 41:30 \| Nicolas Bolaños\] — \[SLIDE 22\]**

* **Guion:** "Y el quinto nivel es el más inteligente: los L-Systems abiertos o sensibles al entorno. Aquí la planta deja de crecer a ciegas y empieza a hacerle preguntas al mundo 3D que la rodea: ¿Hay una pared enfrente? ¿De dónde viene la luz del sol? Si una rama detecta sombra o un obstáculo, detiene su crecimiento o curva su ángulo buscando claridad. Es literalmente simular el fototropismo vegetal dentro de un motor gráfico. La ilustración muestra dos respuestas distintas: seguir hacia la luz o modificar el recorrido para esquivar un obstáculo. El sistema ya no depende solo de su propia cadena, sino también de la escena que lo contiene. Gracias a esa interacción, dos plantas con las mismas reglas pueden crecer de forma distinta en diferentes espacios."

# **DETRÁS DE CÁMARAS — Detrás de Cámaras en Computación Visual (41:30 – 51:00)**

## **\[41:30 – 43:30 \| Angel Beltran\] — \[SLIDE 23\]**

* **Guion:** "El truco técnico detrás de cámaras es cómo evitamos hacer trampa al reescribir. Si intentamos modificar la cadena de texto sobre sí misma mientras la vamos leyendo de izquierda a derecha, las letras nuevas que acabamos de crear se volverían a transformar antes de tiempo, rompiendo el paralelismo biológico. Por eso siempre usamos la técnica del **doble cuaderno**: leemos el estado completo de hoy en una lista de solo lectura, escribimos el resultado de mañana en una lista limpia, y al terminar el ciclo intercambiamos los cuadernos. La curva ascendente representa la otra consecuencia clave: cada generación añade más símbolos, y el trabajo crece de forma exponencial, O(bⁿ). Una gramática sencilla puede pasar de cientos de símbolos en la iteración 4 a decenas de millones en la 12."

## **\[43:30 – 46:00 \| Angel Beltran\] — \[EN VIVO: SKETCH 11 — DOBLE CUADERNO (SLIDE 24)\]**

* **Acción en pantalla:** El Slide 24 anima la reescritura paso a paso con el alga (A→AB, B→A). Deja correr; usa **⏩ RÁPIDO** para acelerar y **⏸ PAUSA** para congelar en un símbolo concreto y explicarlo. **⟳ REINICIAR** vuelve a la generación inicial.
* **Guion:** "Veamos ese doble cuaderno en acción, sin magia. Arriba está el cuaderno de HOY, la generación actual, y es de **solo lectura**. La cabeza naranja recorre símbolo por símbolo: lee una A y, según la regla A→AB, escribe AB abajo, en el cuaderno de MAÑANA, que empezó vacío. Lee una B y escribe A. Fíjense: jamás tocamos la cadena que estamos leyendo; solo escribimos en la hoja limpia. Cuando la cabeza llega al final, intercambiamos los cuadernos —lo de mañana pasa a ser lo de hoy— y arranca la siguiente generación. Gracias a esto todas las reglas parten exactamente del mismo estado: eso es lo que hace que la reescritura sea verdaderamente paralela, como la división simultánea de las células."

## **\[46:00 – 48:30 \| Ariadna\] — \[EN VIVO: SKETCH 5 ESTRÉS (SLIDE 25)\]**

* **Acción en pantalla:** El Slide 25 (modo estrés) **arranca en iteración 4**. Sube el selector 4 → 5 → 6 → 7 (y opcionalmente 8), señalando el contador de **Segmentos** y el indicador de **FPS** (verde → amarillo → rojo).
* **Guion:** "Como ingenieros y artistas visuales, hay una trampa en la que todos caemos la primera vez que programamos un L-System: entusiasmarse subiendo las iteraciones. Miren el contador de segmentos arriba. En la iteración 4 tenemos unos cientos de segmentos y vamos a 60 cuadros por segundo. En la 6 ya son decenas de miles. Si subo más, pasamos a cientos de miles de líneas y el navegador se arrastra. Ese crecimiento exponencial —el mismo O(bⁿ) de hace un momento— es el principal reto de rendimiento. El semáforo verde, amarillo y rojo nos dice cuándo la belleza visual deja de ser viable a velocidad interactiva. Optimizar no significa borrar detalles, sino encontrar el nivel suficiente para mantener fluidez."

## **\[48:30 – 51:00 \| Farid Ardila\] — \[SLIDE 26\]**

* **Acción en pantalla:** El Slide 26 muestra la **tortuga 3D en movimiento**: el avión de papel rota mostrando sus tres ejes —H (frontal, cian), L (izquierda, magenta) y U (arriba, verde)— recorriendo yaw, pitch y roll. A la derecha, el render real pasa de wireframe a malla con hojas.
* **Guion:** "Finalmente, ¿cómo pasamos de estas líneas planas en p5.js a los árboles volumétricos de un videojuego? Primero, nuestra tortuga deja de moverse en una mesa 2D y pasa a pilotar como un avión en 3D: miren cómo gira. Ya no basta con girar izquierda-derecha; ahora tiene tres ejes propios: puede hacer *yaw* alrededor del eje de arriba, *pitch* subiendo y bajando la nariz, y *roll* rotando sobre su propio eje frontal. Esos tres ejes, H, L y U, son una base ortonormal que viaja con la tortuga. Segundo, en lugar de pintar líneas delgadas sin grosor, envolvemos cada tramo con cilindros conectados que se estrechan hacia la punta —aplicando la regla de da Vinci que acabamos de ver— y en los extremos pegamos hojas reutilizando una sola geometría en la tarjeta gráfica miles de veces, lo que se llama *instancing*. La transición visible a la derecha es de un trazo alámbrico a una malla con volumen, sombra y cientos de hojas."

# **IMPACTO REAL — Impacto Real y Cierre (51:00 – 55:00+)**

## **\[51:00 – 52:15 \| Nicolas Bolaños\] — \[SLIDE 27\]**

* **Acción en pantalla:** En el Slide 27, pulsa el botón ▶ del reproductor del **trailer de No Man's Sky** (arranca en 0:17, en **silencio** y se detiene solo en 0:42): queda de fondo mientras narras los tres usos reales. Al estar muteado no compite con la voz; el clip muestra flora alienígena generada en vivo mientras el jugador explora.
* **Guion:** "¿Dónde vemos todo esto fuera del aula? En prácticamente toda la industria del entretenimiento. Miren este trailer de No Man's Sky: cada planta, cada árbol raro que ven en ese planeta no está guardado en el disco. Herramientas estándar de cine y videojuegos como SpeedTree —usada desde Avatar hasta The Witcher— se basan en L-Systems paramétricos. Y en un juego como este, donde existen trillones de planetas, sería imposible guardar los árboles uno por uno; en cambio, el juego guarda una pequeña semilla numérica y un L-System cultiva la flora de cada planeta en tiempo real frente al jugador, justo como lo están viendo. La fuerza principal no es guardar más geometría, sino guardar menos datos y generar la forma cuando se necesita. Una semilla reproduce siempre la misma planta con las mismas reglas: ahorra almacenamiento y mantiene resultados consistentes en mundos enormes."

## **\[52:15 – 53:00 \| Farid Ardila\] — \[SLIDE 27\]**

* **Guion:** "Pero los L-Systems no solo sirven para plantas. En 2001, Parish y Müller demostraron que una ciudad crece igual que una raíz buscando agua. Extendieron los L-Systems para trazar redes viales completas: las avenidas principales avanzan buscando conectar centros poblados, mientras las calles secundarias se ramifican en cuadrículas y se detienen automáticamente si chocan contra un río o una montaña. La imagen de la ciudad procedural muestra el mismo principio adaptado a calles, manzanas y restricciones del terreno. Las reglas eligen dirección según la densidad urbana, y las restricciones del entorno impiden que las calles crucen obstáculos naturales."

## **\[53:00 – 53:45 \| Angel Beltran\] — \[SLIDE 27\]**

* **Guion:** "Incluso la ciencia pura los utiliza: en agronomía existen modelos virtuales de cultivos que combinan L-Systems paramétricos con simulación de luz solar para predecir cuánto va a producir una cosecha antes de sembrar una sola semilla. Y en el arte generativo, los mismos símbolos de giro y avance se traducen a notas y duraciones para componer música algorítmica con estructura fractal. La aplicación científica anticipa resultados y reduce costos; la artística convierte un proceso geométrico en otra forma de expresión."

## **\[53:45 – 55:00+ \| Ariadna\] — \[EN VIVO: BOSQUE DE CIERRE (SLIDE 28)\]**

* **Acción en pantalla:** El Slide 28 (cierre) **arranca solo**: un **bosque estocástico diverso** crece ante la audiencia en una ola de izquierda a derecha, donde **cada árbol es único** (misma gramática + azar). El botón ▶ REPLAY vuelve a hacer crecer el bosque durante la conclusión.
* **Guion:** "Al final, la lección más poderosa de los L-Systems para la computación visual es un cambio de mentalidad: dejar de pensar en los objetos como formas estáticas que tenemos que dibujar píxel a píxel, y empezar a verlos como sistemas vivos gobernados por reglas simples. Miren la pantalla: empezamos esta charla con un solo árbol, y ahora, con el mismo puñado de reglas y una pizca de azar, nace un bosque entero donde ningún árbol se repite. Recorrimos el paralelismo, la tortuga, los fractales y su dimensión, la memoria de la pila, el azar, la comunicación entre células, el grosor de da Vinci y el salto al 3D; e incluso construimos nuestras propias reglas en vivo. Con un alfabeto diminuto, una semilla y la capacidad de recordar de dónde venimos, podemos hacer que la computadora cultive mundos enteros. Muchas gracias."

# **Sección 5: Notas de Ritmo y Recortes**

La charla está dimensionada para **≈ 55 minutos** de exposición pura (00:00 → 55:00+). Los sketches interactivos son elásticos: con poca interacción del público ronda los 50 min; con preguntas y exploración en vivo (sobre todo el laboratorio del Slide 15) se acerca o supera los 55. Cronometrar un ensayo completo.

**Si la charla se alarga**, recortar en este orden:
1. Acortar el laboratorio abierto (Slide 15) a una sola regla propuesta por el público (−1.5 min).
2. En el Sketch 3 (Slide 10), mostrar solo una familia extra (Sierpinski **o** dragón) en lugar de las dos (−45 s).
3. Comprimir la enumeración de aplicaciones del cierre (ciudades + ciencia) a una sola intervención (−1 min).
4. Omitir el modo ⏩ RÁPIDO del doble cuaderno (Slide 24) y mostrar solo una generación (−1 min).

**Si la charla se queda corta**, ampliar: más iteraciones y familias en el laboratorio (Slide 15), varias regeneraciones del comparador (Slide 19), y lanzar la señal de contexto (Slide 20) dos veces señalando el orden estricto de floración.
