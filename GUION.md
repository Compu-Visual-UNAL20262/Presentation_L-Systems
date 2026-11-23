# **Guion y Estructura de Presentación: L-Systems (45 Minutos)**

# **Enfoque intuitivo para Computación Visual con demostraciones en vivo en p5.js**

# **Sección 1: Arquitectura General y Dinámica de Relevos (45 Minutos)**

Para evitar la monotonía de una exposición secuencial de 11 minutos por persona, la presentación se divide en 6 actos narrativos. En cada acto participan varios integrantes mediante relevos ágiles de 1.5 a 4 minutos, alternando entre analogías visuales en diapositivas minimalistas y demostraciones interactivas.

> **Nota de implementación:** la presentación es una **aplicación web propia (React + p5.js)** desplegada, no el editor de p5.js. Se navega con las flechas ← →, swipe en móvil, el menú ≡ MENU o los botones ◄ ► del HUD. Los **7 sketches** están embebidos como slides interactivos con sus propios controles en pantalla (botones, sliders, presets). No hay que abrir pestañas ni pulsar "Play". Toda la interfaz es responsiva: en móvil los paneles de control se colapsan (botón ⚙ CONTROLES) y los lienzos se reescalan solos. Hay **dos videos embebidos** que arrancan **en silencio** al pulsar ▶ (pensados como fondo mientras el expositor habla): "La belleza de la geometría fractal" (Wild Math · SoME2) en el Slide 08 y el trailer de No Man's Sky (clip 0:17–0:42) en el Slide 22.

> **Nota de interfaz (público):** la aplicación ya **no muestra la palabra «Acto»** en pantalla. Cada sección se identifica con una etiqueta temática corta (ORIGEN · INGREDIENTES · LA TORTUGA · NATURALEZA VIVA · DETRÁS DE CÁMARAS · IMPACTO REAL) y los sketches con una etiqueta «Demo · …». La estructura de 6 secciones de este guion es interna, solo para coordinar los relevos del equipo.

> **Actualización de contenido (v2 · 45 min):** respecto a la versión de 30 minutos se añadieron (1) el cociente áureo A:B → φ en el Sketch 2; (2) la dimensión fractal y dos familias fractales nuevas (Sierpinski y curva del dragón) en el Sketch 3; (3) un **nuevo Sketch 6** de L-System sensible al contexto (señal hormonal que viaja célula a célula); (4) un **nuevo Sketch 7** paramétrico con la regla de grosor de da Vinci; y (5) la tortuga 3D en movimiento real (yaw/pitch/roll) en el Slide 21.

| Integrante | Rol Principal en Escena | Intervenciones | Tiempo Total aprox. |
| :---- | :---- | :---- | :---- |
| Nicolas Bolaños | **Anfitrión y Operador de Demos Base:** Abre con el impacto visual, opera los sketches de crecimiento y conecta con videojuegos. | Actos 1, 2, 3, 4 y 6 | ~11 min |
| Ariadna Rueda | **Narrador Histórico y Operador de Variación:** Explica el origen biológico, la tortuga de Koch y los fractales, los bosques aleatorios y el cierre. | Actos 1, 3, 4, 5 y 6 | ~11 min |
| Farid Ardila | **Especialista en Espacio y 3D:** Explica el paralelismo, la ramificación con memoria, la comunicación celular, el grosor paramétrico, el salto al 3D y ciudades. | Actos 1, 3, 4, 5 y 6 | ~13 min |
| Angel Beltrán | **Arquitecto de Reglas y Rendimiento:** Traduce el "ADN" (axioma/reglas), explica el azar, el double buffering y aplicaciones científicas. | Actos 2, 4, 5 y 6 | ~10 min |

# **Sección 2: Estructura de las Diapositivas (23 slides + navegador)**

**Regla de oro:** Ninguna diapositiva supera las 15 palabras. Cada slide es un ancla visual; la explicación vive en la voz del equipo y en los sketches interactivos embebidos.

| Slide | Título en Pantalla | Contenido Visual (Apoyo Minimalista) | Transición / Acción |
| :---- | :---- | :---- | :---- |
| 01 | (Sin título — Sketch 1 a pantalla completa) | Árbol frondoso de p5.js. Pista "▶ CLICK / ESPACIO PARA CRECER". | Arranca en vivo: clic o ESPACIO en 00:00. |
| 02 | L-Systems: El ADN de las Formas | Subtítulo "Programar el crecimiento…" + los 4 nombres del equipo (Gaymers) con su color P1–P4. | Entra tras el gancho visual. |
| 03 | 1968: Aristid Lindenmayer | **Foto real** de *Anabaena catenula* al microscopio + diagrama del filamento (A → B). | Apoyo narrativo histórico. |
| 04 | Uno a la Vez vs. Todos al Tiempo | Dos columnas: Chomsky secuencial vs. L-System paralelo + meme. | Contraste conceptual. |
| 05 | Los 3 Ingredientes | Alfabeto `{A,B}` · Axioma `A` · Reglas `A → AB · B → A` (valores visibles). | Presenta la receta básica. |
| 06 | El Alga que Sabe Contar | Reglas `A → AB` / `B → A` arriba + filas A → AB → ABA → ABAAB (1,2,3,5). | Ancla la regla antes del Sketch 2. |
| 07 | Sketch 2: Fibonacci emergente + φ | Sketch interactivo: botón + GENERACIÓN (n=0..7), contador Fibonacci **y cociente A:B → φ ≈ 1.618**. | Demo en vivo. |
| 08 | De Letras a Píxeles: La Tortuga | **Video de fondo** "La belleza de la geometría fractal" (Wild Math · SoME2, desde 0:50, en silencio) + comandos F (avanza), + (gira +δ), − (gira −δ). | Introduce la tortuga. |
| 09 | Sketch 3: Fractales de tortuga | Mini-editor (iteraciones/ángulo) + lienzo. Selector **KOCH / SIERPINSKI / DRAGÓN** + indicador de **dimensión fractal D**. **Arranca pequeño (iter 1, 60°).** | Demo en vivo. |
| 10 | El Superpoder de Recordar: \[ y \] | Diagrama de pila LIFO con pin de ubicación. | Diagrama clave de ramificación. |
| 11 | Crecer por Tallos vs. por Yemas | Aristas (F→…) vs. nodos (X→…), con reglas visibles. | Contraste de reescritura. |
| 12 | Sketch 4: Planta ramificada | Sliders δ / longitud / iteraciones + presets CIPRÉS 15° y ARBUSTO 35°. | Demo en vivo. |
| 13 | Los 5 Niveles de Realismo | Escalera de 5 peldaños (D0L · S0L · IL · Paramétrico · Open). | Guía el Acto 4. |
| 14 | El Bosque de los Dados | Clon idéntico vs. variación estocástica. | Introduce el azar. |
| 15 | Sketch 5: Bosque estocástico | 5 árboles + botón REGENERAR (arranca en iteración 4). | Demo en vivo. |
| 16 | Sketch 6: Señal sensible a contexto | Tallo de células; una **señal hormonal** sube de la raíz a la punta y florece a su paso. Regla `S < a → S`. Botón ▶ LANZAR SEÑAL. | Demo en vivo (Nivel 3 · IL). |
| 17 | Sketch 7: Grosor paramétrico (da Vinci) | **L-System paramétrico**: árbol cuyo grosor de ramas sigue la ley de áreas de da Vinci `r_padre^e = r_hija1^e + r_hija2^e` (factor `q=(1/2)^(1/e)`). Menú Ley de grosor: FRÁGIL e=1.5 / CLÁSICO e=2 / GRUESO e=3 + slider de exponente y grosor. | Demo en vivo (Nivel 4). |
| 18 | Cuando la Planta Mira al Sol | Planta curvándose hacia la luz / esquivando obstáculo. | Contexto y entorno (Nivel 5). |
| 19 | El Peligro Exponencial y el Doble Cuaderno | Curva exponencial + dos buffers (Sₙ → Sₙ₊₁). | Prepara la prueba de estrés. |
| 20 | Sketch 5: Prueba de estrés | Selector de iteraciones + telemetría Segmentos/FPS (**arranca en 4**). | Demo en vivo. |
| 21 | Del Plano 2D al Mundo 3D | Tortuga 3D **en movimiento** mostrando los ejes H/L/U (yaw/pitch/roll) + línea→cilindro + **render real** (wireframe → malla con hojas). | Explica geometría 3D. |
| 22 | Mundos Infinitos en Pocos Kilobytes | **Trailer de No Man's Sky** (clip 0:17–0:42, flora procedural en vivo) + 3 tarjetas con capturas reales: flora de videojuego, ciudad procedural (Parish & Müller) y galería de fractales (arte/ciencia). | Cierre e impacto real. |
| 23 | Cierre: Reglas Simples, Mundos Infinitos | **Bosque estocástico diverso** que crece en ola (auto-arranca) + emblema Gaymers. | Conclusión final. |

# **Sección 3: Los 7 Sketches Interactivos (embebidos en la app)**

Los 7 sketches ya están integrados como slides interactivos con controles en pantalla; **no hay que escribir código ni abrir pestañas**. Estados iniciales y controles:

1. **Sketch 1 (Slide 01):** Árbol frondoso. En el Slide 01 crece al hacer **clic** o pulsar **ESPACIO**; botón ▶ REPLAY y toggle 1 ÁRBOL / BOSQUE (3).
2. **Sketch 2 (Slide 07):** Alga y Fibonacci. Botón **+ GENERACIÓN** (n=0 a 7) y **REINICIAR**; a la derecha de cada fila, el contador de letras (Fibonacci) y una segunda píldora con el **cociente A:B**, que converge al número áureo φ ≈ 1.618.
3. **Sketch 3 (Slide 09):** Fractales de tortuga. **Arranca pequeño y ligero** (`iteraciones=1`, `angulo=60`); botones +/−, presets 60° KOCH / 85° MUTACIÓN, selector de familia fractal **KOCH / SIERPINSKI / DRAGÓN** y ▶ REPETIR TRAZO. El indicador inferior muestra iteraciones, ángulo, segmentos y la **dimensión fractal D** de la curva activa.
4. **Sketch 4 (Slide 12):** Planta ramificada. Sliders de ángulo (δ), longitud e iteraciones + presets **CIPRÉS 15°** y **ARBUSTO 35°**. En móvil, botón ⚙ CONTROLES para colapsar el panel.
5. **Sketch 5 (Slides 15 y 20):** Bosque estocástico + estrés. Botón **⟳ REGENERAR BOSQUE** y selector de iteraciones (4–8). **Ambos modos arrancan en iteración 4**; la telemetría muestra Segmentos y FPS con semáforo de color.
6. **Sketch 6 (Slide 16):** L-System sensible al contexto (IL). Un tallo de células con una señal hormonal que sube de la raíz a la punta; cada célula **mira a su vecina** antes de activarse (regla `S < a → S`) y florece al paso de la señal. Botón **▶ LANZAR SEÑAL HORMONAL** (también ESPACIO / R).
7. **Sketch 7 (Slide 17):** L-System paramétrico (grosor de da Vinci). Árbol frondoso cuyo grosor de ramas sigue la ley de áreas de da Vinci `r_padre^e = r_hija1^e + r_hija2^e` (factor `q=(1/2)^(1/e)`, visible arriba). El menú **Ley de grosor** fija el exponente (FRÁGIL e=1.5 / **CLÁSICO e=2** resaltado / GRUESO e=3) y hay sliders de **exponente e** (1.2–3) y **grosor base**. En móvil, botón ⚙ CONTROLES.
8. **Sketch de Cierre (Slide 23):** Bosque estocástico **diverso** (cada árbol único) que **auto-arranca** y crece en ola de izquierda a derecha; botón ▶ REPLAY. La cantidad de árboles se adapta al ancho (4 en móvil, 6-8 en proyector).

# **Sección 4: Guion Completo de la Presentación (45 Minutos)**

Los tiempos son una guía de ritmo; conviene cronometrar en el ensayo y recortar primero las aplicaciones (Acto 6) o el segundo fractal del Sketch 3 si la charla se alarga.

# **Acto 1: El Enganche Visual y el Origen Biológico (00:00 – 07:30)**

## **\[00:00 – 02:30 \| Nicolas Bolaños\] — \[EN VIVO: SKETCH 1 (SLIDE 01)\] → \[SLIDE 02\]**

* **Acción en pantalla:** En el Slide 01 (árbol a pantalla completa) haz **clic en el lienzo** o pulsa **ESPACIO** antes de saludar. El árbol crece frente a todos en 4 segundos. Tras presentar la tesis, pulsa el toggle **BOSQUE (3)** para mostrar que la *misma* gramática produce tres árboles distintos; luego vuelve a **1 ÁRBOL**. (El botón ▶ REPLAY relanza la animación cuando quieras.)
* **Guion:** "Imaginen que tienen que entregar mañana un videojuego con un bosque de diez mil árboles. Si se sientan en Blender a modelar rama por rama y hoja por hoja, no duermen en seis meses y el archivo pesaría gigabytes. Lo que acaban de ver en pantalla no es un modelo 3D guardado ni una imagen: son literalmente **dos reglas de reescritura** ejecutándose en tiempo real. Y miren esto —cambio a modo bosque— con las mismas reglas aparecen tres árboles y ninguno es idéntico. Hoy vamos a entender cómo funciona esa magia detrás de los L-Systems o Sistemas de Lindenmayer: el arte de programar el crecimiento en lugar de esculpir objetos. Y esto no es solo para videojuegos: es cómo la biología, la arquitectura y el cine generan complejidad infinita a partir de reglas simples. En el título pueden ver nuestro lema: no esculpimos formas, programamos su ADN y dejamos que el código crezca. La pregunta es cómo unas pocas reglas pueden producir una forma que parece haber sido cultivada."

## **\[02:30 – 05:00 \| Ariadna\] — \[SLIDE 03\]**

* **Guion:** "Lo curioso es que esta herramienta fundamental de la computación visual no nació en un laboratorio de gráficos por computadora, sino en un laboratorio de biología. En 1968, un biólogo húngaro llamado Aristid Lindenmayer estudiaba algo aparentemente sencillo: cómo crecen las algas filamentosas bajo el microscopio. Lo que ven en pantalla es precisamente eso: el alga real *Anabaena*, dividiéndose célula a célula, igual que la miraba Lindenmayer. Él notó que las plantas no se construyen como una casa donde pones un ladrillo encima de otro, sino siguiendo instrucciones celulares repetitivas. Lindenmayer inventó un lenguaje para escribir esas recetas biológicas, y décadas después los artistas digitales descubrieron que ese mismo lenguaje servía para cultivar mundos virtuales enteros. Por eso, antes de hablar de videojuegos, empezamos observando cómo una sola célula puede ser el punto inicial de una estructura completa. La clave es que Lindenmayer encontró un patrón común de crecimiento, no solo una apariencia específica."

## **\[05:00 – 07:30 \| Farid Ardila\] — \[SLIDE 04\]**

* **Guion:** "En ciencias de la computación ya conocemos las gramáticas tradicionales, como las que usan los compiladores para revisar si escribimos bien un código. Pero esas gramáticas funcionan como una línea de ensamblaje: un trabajador hace un cambio a la vez, paso por paso. Un ser vivo no funciona así. En una planta, cuando sale el sol, todas las células de las raíces, el tallo y las hojas se dividen al mismo tiempo. Esa es la gran diferencia de los L-Systems: aplican las reglas en paralelo sobre toda la estructura en cada latido de tiempo. En esta comparación vemos a la derecha una operación simultánea, mientras que el modelo tradicional avanza de izquierda a derecha como en una línea de producción. Cada símbolo de la cadena recibe su transformación durante la misma generación. Para nosotros es un cambio de estado global; para una planta, es el crecimiento coordinado de todo el organismo."

# **Acto 2: Los 3 Ingredientes del ADN Digital (07:30 – 15:30)**

## **\[07:30 – 10:00 \| Angel Beltran\] — \[SLIDE 05\] → \[SLIDE 06\]**

* **Guion:** "Para crear uno de estos sistemas no necesitamos matemáticas intimidantes; solo necesitamos tres ingredientes, igual que en la genética. Primero, un Alfabeto: las piezas o fichas con las que jugamos, por ejemplo las letras A y B. Segundo, un Axioma: la semilla inicial con la que arranca todo en el segundo cero, digamos una sola letra A. Y tercero, las Reglas: qué le pasa a cada ficha en el siguiente turno. En el experimento original del alga, la regla dice: cada A se transforma en AB, y cada B madura y se vuelve A. La diapositiva conserva estos tres elementos como una receta visible: el alfabeto define las piezas, el axioma arranca la cadena y las reglas describen su crecimiento. Los ingredientes son simples, pero su combinación establece toda la historia de generaciones futuras. Cambiar una sola parte puede alterar completamente la estructura, aunque las otras dos permanezcan igual."

## **\[10:00 – 13:00 \| Nicolas Bolaños\] — \[EN VIVO: SKETCH 2 (SLIDE 07)\]**

* **Acción en pantalla:** Navega al Slide 07 y pulsa el botón **+ GENERACIÓN** (o clic en el lienzo) para avanzar de n=0 hasta n=7. Señala la columna derecha: la píldora verde cuenta las letras (Fibonacci) y la píldora violeta muestra el **cociente A:B**. El botón **REINICIAR** vuelve a n=0.
* **Guion:** "Veámoslo correr en vivo. Empezamos con A. En el primer paso, A se convierte en AB. En el segundo paso, recordemos que todo ocurre al tiempo: la A se vuelve AB y la B se vuelve A, así que obtenemos ABA. Si sigo avanzando, miren los números verdes de la derecha: 1, 2, 3, 5, 8, 13, 21, 34... Nadie programó aquí la serie de Fibonacci, pero emerge sola de dos reglas diminutas. Y hay un segundo regalo escondido: miren la píldora violeta, el cociente entre las letras A y las letras B. Va dando 1, 2, 1.5, 1.66, 1.6, 1.625... y se va acercando a un número muy especial: 1.618, el **número áureo**, la misma proporción que aparece en las conchas de caracol, los girasoles y hasta en el arte renacentista. De dos reglas de una línea emergen a la vez Fibonacci y la razón áurea. Esa es la esencia de la complejidad emergente en computación visual: ninguna letra conoce la serie completa, solo aplica su propia regla y el patrón aparece globalmente."

## **\[13:00 – 15:30 \| Angel Beltran\] — \[SLIDE 08\]**

* **Guion:** "Ahora, como estudiantes de computación visual tenemos un problema evidente: una fila infinita de letras A y B todavía no se parece a un árbol ni a un fractal. Es solo texto en una dimensión. Necesitábamos un traductor que convirtiera esas letras en trazos sobre un lienzo. Y ahí es donde entra uno de los conceptos más intuitivos de la historia de la programación. En el siguiente paso, una cadena abstracta se convertirá en movimiento espacial mediante símbolos de avance y giro. Esta separación es importante: las reglas producen una cadena y la interpretación geométrica convierte esa cadena en imagen. Podemos cambiar el dibujo sin alterar el crecimiento, o viceversa."

# **Acto 3: La Tortuga y el Poder de Recordar el Camino (15:30 – 25:00)**

## **\[15:30 – 19:30 \| Ariadna\] — \[SLIDE 08\] → \[EN VIVO: SKETCH 3 (SLIDE 09)\]**

* **Acción en pantalla (Slide 08):** Al entrar al Slide 08, pulsa ▶ en el **video de fondo "La belleza de la geometría fractal"** (Wild Math · SoME2, arranca en 0:50, en silencio): déjalo correr mientras recuerdas los 3 comandos de la tortuga (F, +, −). Luego avanza al Slide 09 para la demo en vivo.
* **Acción en pantalla (Slide 09):** El Slide 09 **arranca pequeño y ligero**: `iteraciones = 1`, `ángulo = 60` (un triángulo). Con los botones **+/−** sube iteraciones a 2, 3 y 4 para que la audiencia vea cómo evoluciona el copo paso a paso; señala el indicador inferior donde aparece la **dimensión fractal D ≈ 1.262**. Luego pulsa el preset **85° MUTACIÓN**. Para cerrar, usa el selector de familia fractal: pulsa **SIERPINSKI** (D ≈ 1.585) y **DRAGÓN** (D ≈ 2) para mostrar que el **mismo motor de tortuga** genera fractales muy distintos. El botón ▶ REPETIR TRAZO reanima el recorrido.
* **Guion:** "En los años ochenta, Przemyslaw Prusinkiewicz tuvo una idea brillante: adaptar la 'tortuga' del lenguaje LOGO a los L-Systems, conectando el texto a una tortuga virtual con un lápiz en la cola. Si la tortuga lee una F, camina hacia adelante dibujando una línea; si lee un \+, gira hacia un lado; si lee un \-, gira hacia el otro. Miren lo que pasa con una sola regla aplicada a un triángulo: en la iteración cero es un triángulo; con cada iteración cada lado se quiebra en un pico, y en cuatro iteraciones tenemos el famoso copo de nieve de Koch. Fíjense en el dato de abajo: su **dimensión fractal** es aproximadamente 1.26. No es una línea, que sería dimensión 1, ni una superficie, que sería 2: vive *entre* dimensiones, y por eso es un fractal. Y lo mejor: este mismo motor no solo dibuja Koch. Si cambio la regla —miren— obtengo el triángulo de Sierpinski, con dimensión 1.585; y con otra regla más, la curva del dragón, que tiende a llenar el plano con dimensión 2. La tortuga no toma decisiones creativas: ejecuta cada símbolo en el orden exacto de la cadena. Cambiando la receta de texto, el mismo intérprete produce una familia entera de fractales."

## **\[19:30 – 22:00 \| Farid Ardila\] — \[SLIDE 10\] → \[SLIDE 11\]**

* **Acción en pantalla:** Sobre el Slide 10 (pila LIFO), narra un recorrido concreto `[ ... ]` señalando cómo se apila la posición al abrir corchete y cómo se recupera al cerrar.
* **Guion:** "La tortuga ya dibuja figuras continuas, pero un árbol no es una sola línea continua: un árbol tiene ramas que nacen del tronco y luego regresan al tronco para sacar otra rama. ¿Cómo hace la tortuga para no perderse? Usando dos símbolos mágicos: los corchetes \[ y \]. Piénsenlo como poner un pin en Google Maps. Cuando la tortuga lee abrir corchete \[, guarda en su memoria exactamente dónde está parada y hacia dónde mira —eso es un *push* a la pila—. Luego se va a dibujar una rama lateral; y en cuanto lee cerrar corchete \], hace *pop* y se teletransporta de vuelta al pin guardado para seguir subiendo por el tronco. La pila es LIFO precisamente porque la última rama abierta es la primera que debe cerrarse. Además, podemos diseñar reglas que alargan los tallos existentes (reescritura de aristas) o reglas con 'yemas' invisibles en las puntas (reescritura de nodos) para controlar cómo envejece cada rama. Con esta memoria, podemos representar la estructura jerárquica real de ramas y subramas."

## **\[22:00 – 25:00 \| Nicolas Bolaños\] — \[EN VIVO: SKETCH 4 (SLIDE 12)\]**

* **Acción en pantalla:** El Slide 12 arranca en un estado simple (iteración baja). Usa los **presets visibles**: pulsa **CIPRÉS 15°** (silueta alta y cerrada) y luego **ARBUSTO 35°** (frondoso). Recalca que es la misma gramática con distinto parámetro. Después mueve el slider de **Iteraciones n** hacia arriba para que cada ramita hija repita la arquitectura de la madre. En móvil, el botón **⚙ CONTROLES** oculta/muestra el panel.
* **Guion:** "Probemos esos corchetes en vivo. Aquí la regla tiene tres pares de corchetes, es decir, tres ramas laterales que salen del tallo en cada ciclo. Miren qué ocurre cuando muevo el slider del ángulo de giro: con 15 grados tenemos un ciprés cerrado y alto; si lo abro a 35 grados, se transforma en un arbusto frondoso. Es la misma regla, el mismo 'ADN': solo cambié un número y nació otra especie. Y si subo las iteraciones, cada ramita hija repite exactamente la misma arquitectura de su madre —eso es autosimilitud—. El ángulo controla la silueta general de la planta; las iteraciones añaden detalle, pero también multiplican la cantidad de instrucciones que debemos interpretar, y de ahí viene el reto de rendimiento que veremos más adelante."

# **Acto 4: De Clones Perfectos a Naturaleza Viva — Los 5 Niveles (25:00 – 34:30)**

## **\[25:00 – 27:00 \| Angel Beltran\] — \[SLIDE 13\] → \[SLIDE 14\]**

* **Guion:** "Como dijimos al entrar al Acto 4, existen cinco niveles de L-Systems para representar la naturaleza con distinto grado de realismo. Vamos a comenzar por los dos primeros. Si ustedes ponen diez árboles generados con el código que acaba de mostrar mi compañero uno al lado del otro, van a notar algo raro de inmediato: parecen soldados de plástico. Todos son clones idénticos porque el primer nivel es determinista, siempre elige la misma regla. En la naturaleza, el viento, la genética y el azar hacen que dos semillas hermanas crezcan distinto. Por eso, para romper esa perfección artificial, pasamos al segundo nivel: los L-Systems estocásticos, donde a cada letra le damos varias reglas posibles con un porcentaje de probabilidad, como lanzar un dado en cada rama. Los peldaños de la escalera resumen esta progresión, desde exacto hasta con entorno. Cada peldaño conserva los principios anteriores y añade una nueva capacidad."

## **\[27:00 – 29:00 \| Ariadna\] — \[EN VIVO: SKETCH 5 (SLIDE 15)\]**

* **Acción en pantalla:** El Slide 15 muestra 5 árboles en iteración 4. Pulsa **⟳ REGENERAR BOSQUE** varias veces para que las 5 siluetas cambien de forma orgánica en cada clic.
* **Guion:** "Aquí tenemos exactamente la misma especie de árbol, pero ahora la regla ya no es única: en cada punta lanzamos un dado. El 80 % de las veces la rama se bifurca en dos, y el 20 % restante crece más recto. Cada vez que pulso regenerar, nace un bosque completamente natural donde ningún árbol repite la silueta del vecino. La diferencia no viene de cambiar la especie ni de dibujar cinco modelos distintos: nace de aplicar varias decisiones posibles dentro de una misma gramática. Las probabilidades permiten controlar cuánto varía el bosque sin perder su coherencia visual."

## **\[29:00 – 31:30 \| Farid Ardila\] — \[EN VIVO: SKETCH 6 (SLIDE 16)\]**

* **Acción en pantalla:** El Slide 16 muestra un tallo de células. Pulsa **▶ LANZAR SEÑAL HORMONAL**: una señal amarilla sube desde la raíz y, célula por célula, va floreciendo la rama. Repite el lanzamiento si quieres mostrarlo de nuevo.
* **Guion:** "Subamos al tercer nivel, el más sutil: los sistemas **sensibles al contexto**. Hasta ahora cada letra cambiaba mirándose solo a sí misma. Pero en la naturaleza las células hablan con sus vecinas. Miren la pantalla: lanzo una señal hormonal desde la raíz, abajo. La regla que gobierna esto se lee así: una célula solo se activa *si su vecina de abajo ya tiene la señal* —eso es lo que significa `S < a → S`, el símbolo mira a su izquierda antes de transformarse—. Así la señal sube de célula en célula, como las hormonas vegetales reales que viajan de la raíz a la copa avisando cuándo florecer. Vean cómo la floración recorre el tallo en orden: ninguna célula se adelanta, porque cada una espera a que su vecina reciba primero el mensaje. Esto es lo que permite simular comunicación interna en una planta: el crecimiento deja de ser ciego y empieza a coordinarse."

## **\[31:30 – 33:00 \| Farid Ardila / Angel Beltran\] — \[EN VIVO: SKETCH 7 (SLIDE 17)\]**

* **Acción en pantalla:** El Slide 17 muestra un árbol frondoso cuyo grosor sigue la ley de da Vinci (visible arriba en pantalla). Con el menú **Ley de grosor** fija el exponente: **CLÁSICO e=2** (tronco creíble, botón resaltado por defecto), **FRÁGIL e=1.5** (ramas que se afilan de golpe) y **GRUESO e=3** (tronco suculento). El slider de exponente permite valores intermedios y el de grosor cambia el grosor del tronco.
* **Guion:** "El cuarto nivel son los L-Systems **paramétricos**: cada símbolo ya no es solo una letra, carga un número en una mochila, como el grosor de la rama. ¿Qué número usamos para adelgazar las ramas al bifurcarse? El que descubrió Leonardo da Vinci hace 500 años: cuando un tronco se parte en ramas, el **área** se conserva. En fórmula, el grosor del padre elevado al cuadrado es igual a la suma de los grosores de las hijas al cuadrado; ese exponente 2 es la ley clásica de áreas. Con el preset CLÁSICO e=2 obtenemos este tronco que se afina de forma natural y creíble. Si bajo a FRÁGIL, las ramas se afilan demasiado rápido; si subo a GRUESO, el árbol engorda. Fíjense que no cambié el dibujo a mano: cambié el parámetro de grosor que viaja en cada símbolo y toda la ramificación se recalculó. Por eso los árboles de los videojuegos modernos se ven reales: aplican exactamente esta regla paramétrica."

## **\[33:00 – 34:30 \| Nicolas Bolaños\] — \[SLIDE 18\]**

* **Guion:** "Y el quinto nivel es el más inteligente: los L-Systems abiertos o sensibles al entorno. Aquí la planta deja de crecer a ciegas y empieza a hacerle preguntas al mundo 3D que la rodea: ¿Hay una pared enfrente? ¿De dónde viene la luz del sol? Si una rama detecta sombra o un obstáculo, detiene su crecimiento o curva su ángulo buscando claridad. Es literalmente simular el fototropismo vegetal dentro de un motor gráfico. La ilustración muestra dos respuestas distintas: seguir hacia la luz o modificar el recorrido para esquivar un obstáculo. El sistema ya no depende solo de su propia cadena, sino también de la escena que lo contiene. Gracias a esa interacción, dos plantas con las mismas reglas pueden crecer de forma distinta en diferentes espacios."

# **Acto 5: Detrás de Cámaras en Computación Visual (34:30 – 42:00)**

## **\[34:30 – 36:30 \| Angel Beltran\] — \[SLIDE 19\]**

* **Guion:** "El truco técnico detrás de cámaras es cómo evitamos hacer trampa al reescribir. Si intentamos modificar la cadena de texto sobre sí misma mientras la vamos leyendo de izquierda a derecha, las letras nuevas que acabamos de crear se volverían a transformar antes de tiempo, rompiendo el paralelismo biológico. Por eso siempre usamos la técnica del doble cuaderno: leemos el estado completo de hoy en una lista de solo lectura, escribimos el resultado de mañana en una lista limpia, y al terminar el ciclo intercambiamos los cuadernos. La curva ascendente representa la otra consecuencia clave: cada generación añade más símbolos, y el trabajo crece de forma exponencial, O(bⁿ). Una gramática sencilla puede pasar de cientos de símbolos en la iteración 4 a decenas de millones en la 12. Leer y escribir en buffers separados garantiza que todas las reglas comiencen desde la misma generación."

## **\[36:30 – 39:00 \| Ariadna\] — \[SLIDE 19\] → \[EN VIVO: SKETCH 5 ESTRÉS (SLIDE 20)\]**

* **Acción en pantalla:** El Slide 20 (modo estrés) **arranca en iteración 4**. Sube el selector 4 → 5 → 6 → 7 (y opcionalmente 8), señalando el contador de **Segmentos** y el indicador de **FPS** (verde → amarillo → rojo).
* **Guion:** "Como ingenieros y artistas visuales, hay una trampa en la que todos caemos la primera vez que programamos un L-System: entusiasmarse subiendo las iteraciones. Miren el contador de segmentos arriba. En la iteración 4 tenemos unos cientos de segmentos y vamos a 60 cuadros por segundo. En la 6 ya son decenas de miles. Si subo más, pasamos a cientos de miles de líneas y el navegador se arrastra. El crecimiento exponencial es el principal reto de rendimiento que debemos controlar. El semáforo verde, amarillo y rojo nos permite ver cuándo la belleza visual deja de ser viable a una velocidad interactiva. Por eso optimizar no significa eliminar detalles, sino encontrar el nivel suficiente para mantener una experiencia fluida."

## **\[39:00 – 42:00 \| Farid Ardila\] — \[SLIDE 21\]**

* **Acción en pantalla:** El Slide 21 muestra la **tortuga 3D en movimiento**: el avión de papel rota mostrando sus tres ejes —H (frontal, cian), L (izquierda, magenta) y U (arriba, verde)— recorriendo yaw, pitch y roll. A la derecha, el render real pasa de wireframe a malla con hojas.
* **Guion:** "Finalmente, ¿cómo pasamos de estas líneas planas en p5.js a los árboles volumétricos de un videojuego? Primero, nuestra tortuga deja de moverse en una mesa 2D y pasa a pilotar como un avión en 3D: miren cómo gira. Ya no basta con girar izquierda-derecha; ahora tiene tres ejes propios: puede hacer *yaw* alrededor del eje de arriba, *pitch* subiendo y bajando la nariz, y *roll* rotando sobre su propio eje frontal. Esos tres ejes, H, L y U, son una base ortonormal que viaja con la tortuga. Segundo, en lugar de pintar líneas delgadas sin grosor, envolvemos cada tramo con cilindros conectados que se estrechan hacia la punta —aplicando la regla de da Vinci que acabamos de ver— y en los extremos pegamos hojas reutilizando una sola geometría en la tarjeta gráfica miles de veces, lo que se llama *instancing*. La transición visible a la derecha es de un trazo alámbrico a una malla con volumen, sombra y cientos de hojas."

# **Acto 6: Impacto Real y Cierre (42:00 – 45:00+)**

## **\[42:00 – 43:15 \| Nicolas Bolaños\] — \[SLIDE 22\]**

* **Acción en pantalla:** En el Slide 22, pulsa el botón ▶ del reproductor del **trailer de No Man's Sky** (arranca en 0:17, en **silencio** y se detiene solo en 0:42): queda de fondo mientras narras los tres usos reales. Al estar muteado no compite con la voz; el clip muestra flora alienígena generada en vivo mientras el jugador explora.
* **Guion:** "¿Dónde vemos todo esto fuera del aula? En prácticamente toda la industria del entretenimiento. Miren este trailer de No Man's Sky: cada planta, cada árbol raro que ven en ese planeta no está guardado en el disco. Herramientas estándar de cine y videojuegos como SpeedTree —usada desde Avatar hasta The Witcher— se basan en L-Systems paramétricos. Y en un juego como este, donde existen trillones de planetas, sería imposible guardar los árboles uno por uno; en cambio, el juego guarda una pequeña semilla numérica y un L-System cultiva la flora de cada planeta en tiempo real frente al jugador, justo como lo están viendo. La fuerza principal no es guardar más geometría, sino guardar menos datos y generar la forma cuando se necesita. Una semilla reproduce siempre la misma planta con las mismas reglas: ahorra almacenamiento y mantiene resultados consistentes en mundos enormes."

## **\[43:15 – 44:00 \| Farid Ardila\] — \[SLIDE 22\]**

* **Guion:** "Pero los L-Systems no solo sirven para plantas. En 2001, Parish y Müller demostraron que una ciudad crece igual que una raíz buscando agua. Extendieron los L-Systems para trazar redes viales completas: las avenidas principales avanzan buscando conectar centros poblados, mientras las calles secundarias se ramifican en cuadrículas y se detienen automáticamente si chocan contra un río o una montaña. La imagen de la ciudad procedural muestra el mismo principio adaptado a calles, manzanas y restricciones del terreno. Las reglas eligen dirección según la densidad urbana, y las restricciones del entorno impiden que las calles crucen obstáculos naturales."

## **\[44:00 – 44:30 \| Angel Beltran\] — \[SLIDE 22\]**

* **Guion:** "Incluso la ciencia pura los utiliza: en agronomía existen modelos virtuales de cultivos que combinan L-Systems paramétricos con simulación de luz solar para predecir cuánto va a producir una cosecha antes de sembrar una sola semilla. Y en el arte generativo, los mismos símbolos de giro y avance se traducen a notas y duraciones para componer música algorítmica con estructura fractal. La aplicación científica anticipa resultados y reduce costos; la artística convierte un proceso geométrico en otra forma de expresión."

## **\[44:30 – 45:00+ \| Ariadna\] — \[EN VIVO: BOSQUE DE CIERRE (SLIDE 23)\]**

* **Acción en pantalla:** El Slide 23 (cierre) **arranca solo**: un **bosque estocástico diverso** crece ante la audiencia en una ola de izquierda a derecha, donde **cada árbol es único** (misma gramática + azar). El botón ▶ REPLAY vuelve a hacer crecer el bosque durante la conclusión.
* **Guion:** "Al final, la lección más poderosa de los L-Systems para la computación visual es un cambio de mentalidad: dejar de pensar en los objetos como formas estáticas que tenemos que dibujar píxel a píxel, y empezar a verlos como sistemas vivos gobernados por reglas simples. Miren la pantalla: empezamos esta charla con un solo árbol, y ahora, con el mismo puñado de reglas y una pizca de azar, nace un bosque entero donde ningún árbol se repite. Recorrimos el paralelismo, la tortuga, los fractales y su dimensión, la memoria de la pila, el azar, la comunicación entre células, el grosor de da Vinci y el salto al 3D. Con un alfabeto diminuto, una semilla y la capacidad de recordar de dónde venimos, podemos hacer que la computadora cultive mundos enteros. Muchas gracias."

# **Sección 5: Notas de Ritmo y Recortes**

Si en el ensayo la charla supera los 45 minutos, recortar en este orden:

1. En el Sketch 3, mostrar solo una familia extra (Sierpinski **o** dragón) en lugar de las dos (−45 s).
2. Comprimir la enumeración de aplicaciones del Acto 6 (ciudades + ciencia) a una sola intervención (−1 min).
3. Acortar el paso a paso de la pila en el Slide 10 (−30 s).

Si sobra tiempo, ampliar la exploración de parámetros del Sketch 7 (comparar e=2 contra e frágil lado a lado) o lanzar la señal del Sketch 6 dos veces señalando el orden estricto de floración.
