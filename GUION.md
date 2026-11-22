# **Guion y Estructura de Presentación: L-Systems (45 Minutos)**

# **Enfoque intuitivo para Computación Visual con demostraciones en vivo en p5.js**

# **Sección 1: Arquitectura General y Dinámica de Relevos (45 Minutos)**

Para evitar la monotonía de una exposición secuencial de 11 minutos por persona, la presentación se divide en 6 actos narrativos. En cada acto participan varios integrantes mediante relevos ágiles de 1.5 a 3 minutos (5 intervenciones por persona), alternando entre analogías visuales en diapositivas minimalistas y demostraciones interactivas.

> **Nota de implementación:** la presentación es una **aplicación web propia (React + p5.js)** desplegada, no el editor de p5.js. Se navega con las flechas ← →, swipe en móvil, el menú ≡ MENU o los botones ◄ ► del HUD. Los 5 sketches están embebidos como slides interactivos con sus propios controles en pantalla (botones, sliders, presets). No hay que abrir pestañas ni pulsar "Play".

| Integrante | Rol Principal en Escena | Intervenciones | Tiempo Total |
| :---- | :---- | :---- | :---- |
| Nicolas Bolaños | **Anfitrión y Operador de Demos Base:** Abre con el impacto visual, opera los sketches de crecimiento y conecta con videojuegos. | Actos 1, 2, 3, 4 y 6 (5 turnos) | 11:15 min |
| Ariadna Rueda (I2) | **Narrador Histórico y Operador de Variación:** Explica el origen biológico, la tortuga de Koch, los bosques aleatorios y el cierre. | Actos 1, 3, 4, 5 y 6 (5 turnos) | 10:45 min |
| Farid Ardila | **Especialista en Espacio y 3D:** Explica el paralelismo, la ramificación con memoria, la comunicación celular, el salto al 3D y ciudades. | Actos 1, 3, 4, 5 y 6 (5 turnos) | 12:00 min |
| Angel Beltrán (I4) | **Arquitecto de Reglas y Rendimiento:** Traduce el "ADN" (axioma/reglas), explica el azar, el double buffering y aplicaciones científicas. | Actos 2, 4, 5 y 6 (5 turnos) | 11:00 min |

# **Sección 2: Estructura de las Diapositivas (21 slides + navegador)**

**Regla de oro:** Ninguna diapositiva supera las 15 palabras. Cada slide es un ancla visual; la explicación vive en la voz del equipo y en los sketches interactivos embebidos.

| Slide | Título en Pantalla | Contenido Visual (Apoyo Minimalista) | Transición / Acción |
| :---- | :---- | :---- | :---- |
| 01 | (Sin título — Sketch 1 a pantalla completa) | Árbol frondoso de p5.js. Pista "▶ CLICK / ESPACIO PARA CRECER". | Arranca en vivo: clic o ESPACIO en 00:00. |
| 02 | L-Systems: El ADN de las Formas | Subtítulo + nombres del equipo (Gaymers). | Entra tras el gancho visual. |
| 03 | 1968: Aristid Lindenmayer | **Foto real** de *Anabaena catenula* al microscopio + diagrama del filamento (A → B). | Apoyo narrativo histórico. |
| 04 | Uno a la Vez vs. Todos al Tiempo | Dos columnas: Chomsky secuencial vs. L-System paralelo + meme. | Contraste conceptual. |
| 05 | Los 3 Ingredientes | Alfabeto `{A,B}` · Axioma `A` · Reglas `A → AB · B → A` (valores visibles). | Presenta la receta básica. |
| 06 | El Alga que Sabe Contar | Reglas `A → AB` / `B → A` arriba + filas A → AB → ABA → ABAAB (1,2,3,5). | Ancla la regla antes del Sketch 2. |
| 07 | Sketch 2: Fibonacci emergente | Sketch interactivo: botón + GENERACIÓN (n=0..7) y contador Fibonacci. | Demo en vivo. |
| 08 | De Letras a Píxeles: La Tortuga | Cursor + F (avanza), + (gira +δ), − (gira −δ). | Introduce la tortuga. |
| 09 | Sketch 3: Copo de Koch | Mini-editor (iteraciones/ángulo) + lienzo. **Arranca pequeño (iter 1, 60°).** | Demo en vivo. |
| 10 | El Superpoder de Recordar: \[ y \] | Diagrama de pila LIFO con pin de ubicación. | Diagrama clave de ramificación. |
| 11 | Crecer por Tallos vs. por Yemas | Aristas (F→…) vs. nodos (X→…), con reglas visibles. | Contraste de reescritura. |
| 12 | Sketch 4: Planta ramificada | Sliders δ / longitud / iteraciones + presets CIPRÉS 15° y ARBUSTO 35°. | Demo en vivo. |
| 13 | Los 5 Niveles de Realismo | Escalera de 5 peldaños. | Guía el Acto 4. |
| 14 | El Bosque de los Dados | Clon idéntico vs. variación estocástica. | Introduce el azar. |
| 15 | Sketch 5: Bosque estocástico | 5 árboles + botón REGENERAR (arranca en iteración 4). | Demo en vivo. |
| 16 | Cuando la Planta Mira al Sol | Planta curvándose hacia la luz / esquivando obstáculo. | Contexto y entorno. |
| 17 | El Peligro Exponencial y el Doble Cuaderno | Curva exponencial + dos buffers (Sₙ → Sₙ₊₁). | Prepara la prueba de estrés. |
| 18 | Sketch 5: Prueba de estrés | Selector de iteraciones + telemetría Segmentos/FPS (**arranca en 4**). | Demo en vivo. |
| 19 | Del Plano 2D al Mundo 3D | 3 ejes de rotación + línea→cilindro + **render real** (wireframe → malla con hojas). | Explica geometría 3D. |
| 20 | Mundos Infinitos en Pocos Kilobytes | **Capturas reales**: flora de videojuego + ciudad procedural (Parish & Müller) + agronomía/arte. | Cierre e impacto real. |
| 21 | Cierre: Reglas Simples, Mundos Infinitos | **Bosque estocástico diverso** que crece en ola (auto-arranca) + emblema Gaymers. | Conclusión final. |

# **Sección 3: Los 5 Sketches Interactivos (embebidos en la app)**

Los 5 sketches ya están integrados como slides interactivos con controles en pantalla; **no hay que escribir código ni abrir pestañas**. Estados iniciales y controles:

1. **Sketch 1 (Slide 01):** Árbol frondoso. En el Slide 01 crece al hacer **clic** o pulsar **ESPACIO**; botón ▶ REPLAY y toggle 1 ÁRBOL / BOSQUE (3).
6. **Sketch de Cierre (Slide 21):** Bosque estocástico **diverso** (cada árbol único) que **auto-arranca** y crece en ola de izquierda a derecha; botón ▶ REPLAY. La cantidad de árboles se adapta al ancho (4 en móvil, 6-8 en proyector).
2. **Sketch 2 (Slide 07):** Alga y Fibonacci. Botón **+ GENERACIÓN** (n=0 a 7) y **REINICIAR**; contador de letras a la derecha.
3. **Sketch 3 (Slide 09):** Copo de Koch. **Arranca pequeño y ligero** (`iteraciones=1`, `angulo=60`) para mostrar la evolución paso a paso; botones +/−, presets 60° KOCH / 85° MUTACIÓN y ▶ REPETIR TRAZO.
4. **Sketch 4 (Slide 12):** Planta ramificada. Sliders de ángulo (δ), longitud e iteraciones + presets **CIPRÉS 15°** y **ARBUSTO 35°**. En móvil, botón ⚙ CONTROLES para colapsar el panel.
5. **Sketch 5 (Slides 15 y 18):** Bosque estocástico + estrés. Botón **⟳ REGENERAR BOSQUE** y selector de iteraciones (4–8). **Ambos modos arrancan en iteración 4**; la telemetría muestra Segmentos y FPS con semáforo de color.

# **Sección 4: Guion Completo de la Presentación (45 Minutos)**

# **Acto 1: El Enganche Visual y el Origen Biológico (00:00 – 07:00)**

## **\[00:00 – 02:00 \| Nicolas Bolaños\] — \[EN VIVO: SKETCH 1 (SLIDE 01)\] → \[SLIDE 02\]**

* **Acción en pantalla:** En el Slide 01 (árbol a pantalla completa) haz **clic en el lienzo** o pulsa **ESPACIO** antes de saludar. El árbol crece frente a todos en 4 segundos. (El botón ▶ REPLAY relanza la animación cuando quieras.)  
* **Guion:** "Imaginen que tienen que entregar mañana un videojuego con un bosque de diez mil árboles. Si se sientan en Blender a modelar rama por rama y hoja por hoja, no duermen en seis meses y el archivo pesaría gigabytes. Lo que acaban de ver en pantalla no es un modelo 3D guardado ni una imagen: son literalmente **dos reglas de reescritura** ejecutándose en tiempo real. Hoy vamos a entender cómo funciona esa magia detrás de los L-Systems o Sistemas de Lindenmayer: el arte de programar el crecimiento en lugar de esculpir objetos. Y esto no es solo para videojuegos: es cómo la biología, la arquitectura y el cine generan complejidad infinita a partir de reglas simples."

## **\[02:00 – 04:30 \| Ariadna\] — \[SLIDE 03\]**

* **Guion:** "Lo curioso es que esta herramienta fundamental de la computación visual no nació en un laboratorio de gráficos por computadora, sino en un laboratorio de biología. En 1968, un biólogo húngaro llamado Aristid Lindenmayer estudiaba algo aparentemente sencillo: cómo crecen las algas filamentosas bajo el microscopio. Lo que ven en pantalla es precisamente eso: el alga real *Anabaena*, dividiéndose célula a célula, igual que la miraba Lindenmayer. Él notó que las plantas no se construyen como una casa donde pones un ladrillo encima de otro, sino siguiendo instrucciones celulares repetitivas. Lindenmayer inventó un lenguaje para escribir esas recetas biológicas, y décadas después los artistas digitales descubrieron que ese mismo lenguaje servía para cultivar mundos virtuales enteros."

## **\[04:30 – 07:00 \| Farid Ardila\] — \[SLIDE 04\]**

* **Guion:** "En ciencias de la computación ya conocemos las gramáticas tradicionales, como las que usan los compiladores para revisar si escribimos bien un código. Pero esas gramáticas funcionan como una línea de ensamblaje: un trabajador hace un cambio a la vez, paso por paso. Un ser vivo no funciona así. En una planta, cuando sale el sol, todas las células de las raíces, el tallo y las hojas se dividen al mismo tiempo. Esa es la gran diferencia de los L-Systems: aplican las reglas en paralelo sobre toda la estructura en cada latido de tiempo."

# **Acto 2: Los 3 Ingredientes del ADN Digital (07:00 – 14:00)**

## **\[07:00 – 09:30 \| Angel Beltran\] — \[SLIDE 05\] → \[SLIDE 06\]**

* **Guion:** "Para crear uno de estos sistemas no necesitamos matemáticas intimidantes; solo necesitamos tres ingredientes, igual que en la genética. Primero, un Alfabeto: las piezas o fichas con las que jugamos, por ejemplo las letras A y B. Segundo, un Axioma: la semilla inicial con la que arranca todo en el segundo cero, digamos una sola letra A. Y tercero, las Reglas: qué le pasa a cada ficha en el siguiente turno. En el experimento original del alga, la regla dice: cada A se transforma en AB, y cada B madura y se vuelve A."

## **\[09:30 – 11:30 \| Nicolas Bolaños\] — \[EN VIVO: SKETCH 2 (SLIDE 07)\]**

* **Acción en pantalla:** Navega al Slide 07 y pulsa el botón **+ GENERACIÓN** (o clic en el lienzo) para avanzar de n=0 hasta n=7. El botón **REINICIAR** vuelve a n=0. Nota: el Slide 05 ya muestra en pantalla el alfabeto `{A, B}`, el axioma `A` y las reglas `A → AB · B → A`, y el Slide 06 repite las reglas sobre la secuencia.  
* **Guion:** "Veámoslo correr en vivo. Empezamos con A. En el primer paso, A se convierte en AB. En el segundo paso, recordemos que todo ocurre al tiempo: la A se vuelve AB y la B se vuelve A, así que obtenemos ABA. Si sigo avanzando, miren los números de la derecha: 1, 2, 3, 5, 8, 13, 21, 34... Nadie programó aquí la serie de Fibonacci, pero emerge sola de dos reglas diminutas. Esa es la esencia de la complejidad emergente en computación visual."

## **\[11:30 – 14:00 \| Angel Beltran\] — \[SLIDE 08\]**

* **Guion:** "Ahora, como estudiantes de computación visual tenemos un problema evidente: una fila infinita de letras A y B todavía no se parece a un árbol ni a un fractal. Es solo texto en una dimensión. Necesitábamos un traductor que convirtiera esas letras en trazos sobre un lienzo. Y ahí es donde entra uno de los conceptos más intuitivos de la historia de la programación."

# **Acto 3: La Tortuga y el Poder de Recordar el Camino (14:00 – 22:30)**

## **\[14:00 – 16:30 \| Ariadna\] — \[SLIDE 08\] → \[EN VIVO: SKETCH 3 (SLIDE 09)\]**

* **Acción en pantalla:** El Slide 09 **arranca pequeño y ligero**: `iteraciones = 1`, `ángulo = 60` (un triángulo). Con los botones **+/−** sube iteraciones a 2, 3 y 4 para que la audiencia vea cómo evoluciona el copo paso a paso; luego pulsa el preset **85° MUTACIÓN**. El botón ▶ REPETIR TRAZO reanima el recorrido de la tortuga.  
* **Guion:** "En los años ochenta, Przemyslaw Prusinkiewicz tuvo una idea brillante: adaptar la 'tortuga' del lenguaje LOGO a los L-Systems, conectando el texto a una tortuga virtual con un lápiz en la cola. Si la tortuga lee una F, camina hacia adelante dibujando una línea; si lee un \+, gira hacia un lado; si lee un \-, gira hacia el otro. Miren lo que pasa con una sola regla aplicada a un triángulo: en la iteración cero es un triángulo; con cada iteración cada lado se quiebra en un pico, y en cuatro iteraciones tenemos el famoso copo de nieve de Koch. Y si aquí mismo cambio el ángulo de 60 a 85 grados, la geometría muta al instante."

## **\[16:30 – 19:30 \| Farid Ardila\] — \[SLIDE 10\] → \[SLIDE 11\]**

* **Guion:** "La tortuga ya dibuja figuras continuas, pero un árbol no es una sola línea continua: un árbol tiene ramas que nacen del tronco y luego regresan al tronco para sacar otra rama. ¿Cómo hace la tortuga para no perderse? Usando dos símbolos mágicos: los corchetes \[ y \]. Piénsenlo como poner un pin en Google Maps. Cuando la tortuga lee abrir corchete \[, guarda en su memoria exactamente dónde está parada y hacia dónde mira. Luego se va a dibujar una rama lateral; y en cuanto lee cerrar corchete \], se teletransporta de vuelta al pin guardado para seguir subiendo por el tronco. Además, podemos diseñar reglas que alargan los tallos existentes o reglas con 'yemas' invisibles en las puntas para controlar cómo envejece cada rama."

## **\[19:30 – 22:30 \| Nicolas Bolaños\] — \[EN VIVO: SKETCH 4 (SLIDE 12)\]**

* **Acción en pantalla:** El Slide 12 arranca en un estado simple (iteración baja) para mostrar la planta desde su forma más básica. Usa los **presets visibles**: pulsa **CIPRÉS 15°** (silueta alta y cerrada) y luego **ARBUSTO 35°** (frondoso). Después mueve el slider de **Iteraciones n** hacia arriba para que cada ramita hija repita la arquitectura de la madre. En móvil, el botón **⚙ CONTROLES** oculta/muestra el panel.  
* **Guion:** "Probemos esos corchetes en vivo. Aquí la regla tiene tres pares de corchetes, es decir, tres ramas laterales que salen del tallo en cada ciclo. Miren qué ocurre cuando muevo el slider del ángulo de giro: con 15 grados tenemos un ciprés cerrado y alto; si lo abro a 35 grados, se transforma en un arbusto frondoso; y si subo las iteraciones, cada ramita hija repite exactamente la misma arquitectura de su madre."

# **Acto 4: De Clones Perfectos a Naturaleza Viva — Los 5 Niveles (22:30 – 31:30)**

## **\[22:30 – 25:00 \| Angel Beltran\] — \[SLIDE 13\] → \[SLIDE 14\]**

* **Guion:** "Si ustedes ponen diez árboles generados con el código que acaba de mostrar mi compañero uno al lado del otro, van a notar algo raro de inmediato: parecen soldados de plástico. Todos son clones idénticos porque el sistema es determinista, siempre elige la misma regla. En la naturaleza, el viento, la genética y el azar hacen que dos semillas hermanas crezcan distinto. Para romper esa perfección artificial pasamos al segundo nivel: los L-Systems estocásticos, donde a cada letra le damos varias reglas posibles con un porcentaje de probabilidad, como lanzar un dado en cada rama."

## **\[25:00 – 27:30 \| Ariadna\] — \[EN VIVO: SKETCH 5 (SLIDE 15)\]**

* **Acción en pantalla:** El Slide 15 muestra 5 árboles en iteración 4. Pulsa **⟳ REGENERAR BOSQUE** varias veces para que las 5 siluetas cambien de forma orgánica en cada clic.  
* **Guion:** "Aquí tenemos exactamente la misma especie de árbol, pero ahora la regla ya no es única: en cada punta lanzamos un dado. El 80 % de las veces la rama se bifurca en dos, y el 20 % restante crece más recto. Cada vez que pulso regenerar, nace un bosque completamente natural donde ningún árbol repite la silueta del vecino."

## **\[27:30 – 29:30 \| Farid Ardila\] — \[SLIDE 15\]**

* **Guion:** "Pero la naturaleza va todavía más lejos, y por eso existen tres niveles más sofisticados. En el tercer nivel, los sistemas sensibles al contexto, las letras miran quién está a su izquierda y a su derecha antes de cambiar; así se simulan hormonas vegetales que viajan desde la raíz hasta la copa para avisar cuándo florecer. En el cuarto nivel, los paramétricos, cada letra carga una mochila con números —como grosor o edad—, lo que permite aplicar la famosa regla de Leonardo da Vinci: que el tronco se vaya adelgazando proporcionalmente cada vez que se divide en ramas más finas."

## **\[29:30 – 31:30 \| Nicolas Bolaños\] — \[SLIDE 16\]**

* **Guion:** "Y el quinto nivel es el más inteligente: los L-Systems abiertos o sensibles al entorno. Aquí la planta deja de crecer a ciegas y empieza a hacerle preguntas al mundo 3D que la rodea: ¿Hay una pared enfrente? ¿De dónde viene la luz del sol? Si una rama detecta sombra o un obstáculo, detiene su crecimiento o curva su ángulo buscando claridad. Es literalmente simular el fototropismo vegetal dentro de un motor gráfico."

# **Acto 5: Detrás de Cámaras en Computación Visual (31:30 – 38:00)**

## **\[31:30 – 33:30 \| Angel Beltran\] — \[SLIDE 17\]**

* **Guion:** "El segundo truco técnico detrás de cámaras es cómo evitamos hacer trampa al reescribir. Si intentamos modificar la cadena de texto sobre sí misma mientras la vamos leyendo de izquierda a derecha, las letras nuevas que acabamos de crear se volverían a transformar antes de tiempo, rompiendo el paralelismo biológico. Por eso siempre usamos la técnica del doble cuaderno: leemos el estado completo de hoy en una lista de solo lectura, escribimos el resultado de mañana en una lista limpia, y al terminar el ciclo intercambiamos los cuadernos."

## **\[33:30 – 35:30 \| Ariadna\] — \[SLIDE 17\] → \[EN VIVO: SKETCH 5 ESTRÉS (SLIDE 18)\]**

* **Acción en pantalla:** El Slide 18 (modo estrés) **arranca en iteración 4**, igual que el bosque estocástico, para que la progresión se vea completa. Sube el selector 4 → 5 → 6 → 7 (y opcionalmente 8), señalando el contador de **Segmentos** y el indicador de **FPS** (verde → amarillo → rojo).
* **Guion:** "Como ingenieros y artistas visuales, hay una trampa en la que todos caemos la primera vez que programamos un L-System: entusiasmarse subiendo las iteraciones. Miren el contador de segmentos arriba. En la iteración 4 tenemos unos cientos de segmentos y vamos a 60 cuadros por segundo. En la 6 ya son decenas de miles. Si subo más, pasamos a millones de líneas y el navegador se arrastra. El crecimiento exponencial es el principal reto de rendimiento que debemos controlar."

## **\[35:30 – 38:00 \| Farid Ardila\] — \[SLIDE 19\]**

* **Guion:** "Finalmente, ¿cómo pasamos de estas líneas planas en p5.js a los árboles volumétricos de un videojuego? Primero, nuestra tortuga deja de moverse en una mesa 2D y pasa a pilotar como un avión en 3D: ahora puede girar izquierda-derecha, subir-bajar la nariz y rotar sobre su propio eje. Segundo, en lugar de pintar líneas delgadas sin grosor, envolvemos cada tramo con cilindros conectados que se estrechan hacia la punta, y en los extremos pegamos hojas reutilizando una sola geometría en la tarjeta gráfica miles de veces."

# **Acto 6: Impacto Real y Cierre (38:00 – 45:00)**

## **\[38:00 – 40:15 \| Nicolas Bolaños\] — \[SLIDE 20\]**

* **Guion:** "¿Dónde vemos todo esto fuera del aula? En prácticamente toda la industria del entretenimiento. Herramientas estándar de cine y videojuegos como SpeedTree —usada desde Avatar hasta The Witcher— se basan en L-Systems paramétricos. Y en juegos de exploración espacial como No Man's Sky, donde existen trillones de planetas, sería imposible guardar los árboles en el disco duro; en cambio, el juego guarda una pequeña semilla numérica y un L-System cultiva la flora de cada planeta en tiempo real frente al jugador."

## **\[40:15 – 42:15 \| Farid Ardila\] — \[SLIDE 20\]**

* **Guion:** "Pero los L-Systems no solo sirven para plantas. En 2001, investigadores de gráficos por computadora demostraron que una ciudad crece igual que una raíz buscando agua. Extendieron los L-Systems para trazar redes viales completas: las avenidas principales avanzan buscando conectar centros poblados, mientras las calles secundarias se ramifican en cuadrículas y se detienen automáticamente si chocan contra un río o una montaña. Hoy este enfoque se usa en planificación urbana y entornos virtuales masivos."

## **\[42:15 – 43:45 \| Angel Beltran\] — \[SLIDE 20\]**

* **Guion:** "Incluso la ciencia pura los utiliza: en agronomía existen modelos virtuales de cultivos que combinan L-Systems con simulación de luz solar para predecir cuánto va a producir una cosecha antes de sembrar una sola semilla. Y en el arte generativo, los mismos símbolos de giro y avance se traducen a notas y duraciones para componer música algorítmica con estructura fractal."

## **\[43:45 – 45:00 \| Ariadna\] — \[EN VIVO: BOSQUE DE CIERRE (SLIDE 21)\]**

* **Acción en pantalla:** El Slide 21 (cierre) **arranca solo**: un **bosque estocástico diverso** crece ante la audiencia en una ola de izquierda a derecha, donde **cada árbol es único** (misma gramática + azar). Es el cierre visual de la charla: lo que empezó como un árbol ahora es un ecosistema entero. El botón ▶ REPLAY vuelve a hacer crecer el bosque si quieres repetirlo durante la conclusión.  
* **Guion:** "Al final, la lección más poderosa de los L-Systems para la computación visual es un cambio de mentalidad: dejar de pensar en los objetos como formas estáticas que tenemos que dibujar píxel a píxel, y empezar a verlos como sistemas vivos gobernados por reglas simples. Miren la pantalla: empezamos esta charla con un solo árbol, y ahora, con el mismo puñado de reglas y una pizca de azar, nace un bosque entero donde ningún árbol se repite. Con un alfabeto diminuto, una semilla y la capacidad de recordar de dónde venimos, podemos hacer que la computadora cultive mundos enteros. Muchas gracias."

