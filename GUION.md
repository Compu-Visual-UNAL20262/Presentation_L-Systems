# **Guion y Estructura de Presentación: L-Systems (45 Minutos)**

# **Enfoque intuitivo para Computación Visual con demostraciones en vivo en p5.js**

# **Sección 1: Arquitectura General y Dinámica de Relevos (45 Minutos)**

Para evitar la monotonía de una exposición secuencial de 11 minutos por persona, la presentación se divide en 6 actos narrativos. En cada acto participan varios integrantes mediante relevos ágiles de 1.5 a 3 minutos (5 intervenciones por persona), alternando entre analogías visuales en diapositivas minimalistas y demostraciones interactivas en el editor web de p5.js.

| Integrante | Rol Principal en Escena | Intervenciones | Tiempo Total |
| :---- | :---- | :---- | :---- |
| Nicolas Bolaños | **Anfitrión y Operador de Demos Base:** Abre con el impacto visual, opera los sketches de crecimiento y conecta con videojuegos. | Actos 1, 2, 3, 4 y 6 (5 turnos) | 11:15 min |
| Ariadna Rueda (I2) | **Narrador Histórico y Operador de Variación:** Explica el origen biológico, la tortuga de Koch, los bosques aleatorios y el cierre. | Actos 1, 3, 4, 5 y 6 (5 turnos) | 10:45 min |
| Farid Ardila | **Especialista en Espacio y 3D:** Explica el paralelismo, la ramificación con memoria, la comunicación celular, el salto al 3D y ciudades. | Actos 1, 3, 4, 5 y 6 (5 turnos) | 12:00 min |
| Angel Beltrán (I4) | **Arquitecto de Reglas y Rendimiento:** Traduce el "ADN" (axioma/reglas), explica el azar, el double buffering y aplicaciones científicas. | Actos 2, 4, 5 y 6 (5 turnos) | 11:00 min |

# **Sección 2: Estructura de las Diapositivas (15 Slides Minimalistas \+ Navegador)**

**Regla de oro:** Ninguna diapositiva supera las 15 palabras. Cada slide es un ancla visual; la explicación vive en la voz del equipo y en las pestañas de p5.js abiertas previamente en el navegador.

| Slide | Título en Pantalla | Contenido Visual (Apoyo Minimalista) | Transición / Acción |
| :---- | :---- | :---- | :---- |
| 01 | (Sin título — Pantalla negra) | Ninguno; se proyecta directamente el Sketch 1 de p5.js ejecutándose. | Arranca en vivo en 00:00. |
| 02 | L-Systems: El ADN de las Formas | Subtítulo: Cómo programar el crecimiento en lugar de esculpirlo. \+ Nombres del equipo. | Entra tras el gancho visual. |
| 03 | 1968: Aristid Lindenmayer | Fotografía de un alga filamentosa (*Anabaena*) junto a una ilustración botánica. | Apoyo narrativo histórico. |
| 04 | Uno a la Vez vs. Todos al Tiempo | Diagrama comparativo de dos columnas: Cocina paso a paso vs. División celular simultánea. | Contraste conceptual. |
| 05 | Los 3 Ingredientes | Tres iconos grandes con una palabra cada uno: Alfabeto (piezas) · Axioma (semilla) · Reglas (evolución). | Presenta la receta básica. |
| 06 | El Alga que Sabe Contar | Esquema limpio de 4 filas mostrando A → AB → ABA → ABAAB (1, 2, 3, 5). | Salta al Sketch 2 (p5.js). |
| 07 | De Letras a Píxeles: La Tortuga | Un cursor con flecha direccional y tres etiquetas: F (avanza), \+ (izquierda), \- (derecha). | Salta al Sketch 3 (p5.js). |
| 08 | El Superpoder de Recordar: \[ y \] | Mapa con un pin de ubicación: Guardar posición → Explorar rama → Volver al tronco. | Diagrama clave de ramificación. |
| 09 | Crecer por Tallos vs. por Yemas | Dos siluetas comparadas: segmentos que se parten vs. brotes en las puntas. | Salta al Sketch 4 (p5.js). |
| 10 | Los 5 Niveles de Realismo | Escalera visual de 5 peldaños: Exacto → Aleatorio → Vecinos → Con Medidas → Con Entorno. | Guía el Acto 4\. |
| 11 | El Bosque de los Dados | Un mismo árbol clonado 3 veces vs. 3 árboles distintos con variaciones ligeras. | Salta al Sketch 5 (p5.js). |
| 12 | Cuando la Planta Mira al Sol | Silueta de planta curvándose hacia una bombilla y esquivando un bloque. | Explica contexto y entorno. |
| 13 | El Peligro Exponencial y el Doble Cuaderno | Gráfico de curva disparada hacia arriba \+ icono de dos libretas (Hoy → Mañana). | Salta al Sketch 5 (estrés). |
| 14 | Del Plano 2D al Mundo 3D | Avión de papel con 3 flechas de giro \+ flecha hacia un tronco cilíndrico con hojas. | Explica geometría 3D. |
| 15 | Mundos Infinitos en Pocos Kilobytes | Collage de 3 imágenes: árbol de videojuego, mapa vial de ciudad y cultivo agrícola. | Cierre e impacto real. |

# **Sección 3: Preparación Previa de los 5 Sketches en p5.js (Antes de Exponer)**

Para garantizar la fluidez de la exposición, **no se debe escribir código desde cero en vivo**. Se deben tener 5 pestañas listas en el editor web de p5.js con variables o sliders visibles en la parte superior del código para modificarlos en segundos:

1. **Sketch 1 (Gancho inicial):** Un árbol frondoso con hojas verdes que se dibuja animado rama por rama al dar Play.  
2. **Sketch 2 (Alga y Fibonacci):** Muestra en el lienzo el texto de cada generación (n=0 hasta n=7) y al lado el conteo de letras (1, 2, 3, 5, 8, 13, 21).  
3. **Sketch 3 (Copo de Koch):** Un triángulo base con dos variables arriba del código: `let iteraciones = 1;` y `let angulo = 60;`.  
4. **Sketch 4 (Planta ramificada con corchetes):** Planta con sliders en pantalla para mover en tiempo real el ángulo de apertura (\$\\delta\$), la longitud del paso y las iteraciones (1 a 6).  
5. **Sketch 5 (Bosque estocástico \+ estrés):** Botón en pantalla "Regenerar Bosque" (que activa reglas con probabilidad) y un selector de iteraciones (4 hasta 8\) con un contador visible de segmentos dibujados y FPS.

# **Sección 4: Guion Completo de la Presentación (45 Minutos)**

# **Acto 1: El Enganche Visual y el Origen Biológico (00:00 – 07:00)**

## **\[00:00 – 02:00 \| Nicolas Bolaños\] — \[EN VIVO: P5.JS \- SKETCH 1\] → \[SLIDE 02\]**

* **Acción en pantalla:** Presiona Play en p5.js antes de saludar. El árbol crece frente a todos en 4 segundos.  
* **Guion:** "Imaginen que tienen que entregar mañana un videojuego con un bosque de diez mil árboles. Si se sientan en Blender a modelar rama por rama y hoja por hoja, no duermen en seis meses y el archivo pesaría gigabytes. Lo que acaban de ver en pantalla no es un modelo 3D guardado ni una imagen: son literalmente cuatro líneas de texto ejecutándose en tiempo real. Hoy vamos a entender cómo funciona esa magia detrás de los L-Systems o Sistemas de Lindenmayer: el arte de programar el crecimiento en lugar de esculpir objetos."

## **\[02:00 – 04:30 \| Ariadna\] — \[SLIDE 03\]**

* **Guion:** "Lo curioso es que esta herramienta fundamental de la computación visual no nació en un laboratorio de gráficos por computadora, sino en un laboratorio de biología. En 1968, un biólogo húngaro llamado Aristid Lindenmayer estudiaba algo aparentemente sencillo: cómo crecen las algas filamentosas bajo el microscopio. Él notó que las plantas no se construyen como una casa donde pones un ladrillo encima de otro, sino siguiendo instrucciones celulares repetitivas. Lindenmayer inventó un lenguaje para escribir esas recetas biológicas, y décadas después los artistas digitales descubrieron que ese mismo lenguaje servía para cultivar mundos virtuales enteros."

## **\[04:30 – 07:00 \| Farid Ardila\] — \[SLIDE 04\]**

* **Guion:** "En ciencias de la computación ya conocemos las gramáticas tradicionales, como las que usan los compiladores para revisar si escribimos bien un código. Pero esas gramáticas funcionan como una línea de ensamblaje: un trabajador hace un cambio a la vez, paso por paso. Un ser vivo no funciona así. En una planta, cuando sale el sol, todas las células de las raíces, el tallo y las hojas se dividen al mismo tiempo. Esa es la gran diferencia de los L-Systems: aplican las reglas en paralelo sobre toda la estructura en cada latido de tiempo."

# **Acto 2: Los 3 Ingredientes del ADN Digital (07:00 – 14:00)**

## **\[07:00 – 09:30 \| Angel Beltran\] — \[SLIDE 05\] → \[SLIDE 06\]**

* **Guion:** "Para crear uno de estos sistemas no necesitamos matemáticas intimidantes; solo necesitamos tres ingredientes, igual que en la genética. Primero, un Alfabeto: las piezas o fichas con las que jugamos, por ejemplo las letras A y B. Segundo, un Axioma: la semilla inicial con la que arranca todo en el segundo cero, digamos una sola letra A. Y tercero, las Reglas: qué le pasa a cada ficha en el siguiente turno. En el experimento original del alga, la regla dice: cada A se transforma en AB, y cada B madura y se vuelve A."

## **\[09:30 – 11:30 \| Nicolas Bolaños\] — \[EN VIVO: P5.JS \- SKETCH 2\]**

* **Acción en pantalla:** Cambia a p5.js y avanza generación por generación (n=0 hasta n=7) haciendo clic en el lienzo.  
* **Guion:** "Veámoslo correr en vivo. Empezamos con A. En el primer paso, A se convierte en AB. En el segundo paso, recordemos que todo ocurre al tiempo: la A se vuelve AB y la B se vuelve A, así que obtenemos ABA. Si sigo advancing, miren los números de la derecha: 1, 2, 3, 5, 8, 13, 21... Nadie programó aquí la serie de Fibonacci, pero emerge sola de dos reglas diminutas. Esa es la esencia de la complejidad emergente en computación visual."

## **\[11:30 – 14:00 \| Angel Beltran\] — \[SLIDE 06\]**

* **Guion:** "Ahora, como estudiantes de computación visual tenemos un problema evidente: una fila infinita de letras A y B todavía no se parece a un árbol ni a un fractal. Es solo texto en una dimensión. Necesitábamos un traductor que convirtiera esas letras en trazos sobre un lienzo. Y ahí es donde entra uno de los conceptos más intuitivos de la historia de la programación."

# **Acto 3: La Tortuga y el Poder de Recordar el Camino (14:00 – 22:30)**

## **\[14:00 – 16:30 \| Ariadna\] — \[SLIDE 07\] → \[EN VIVO: P5.JS \- SKETCH 3\]**

* **Acción en pantalla:** Muestra el triángulo inicial en p5.js y sube iteraciones de 1 a 2, 3 y 4\. Luego cambia angulo de 60 a 85\.  
* **Guion:** "En los años ochenta, Przemyslaw Prusinkiewicz tuvo una idea brillante: conectar el texto del L-System a una tortuga virtual con un lápiz en la cola. Si la tortuga lee una F, camina hacia adelante dibujando una línea; si lee un \+, gira a la izquierda; si lee un \-, gira a la derecha. Miren lo que pasa en p5.js con una sola regla: avanza, gira izquierda, avanza, gira derecha, avanza. En una iteración es un pico; en cuatro iteraciones es el famoso copo de nieve de Koch. Y si aquí mismo cambio el ángulo de 60 a 85 grados, la geometría muta al instante."

## **\[16:30 – 19:30 \| Farid Ardila\] — \[SLIDE 08\] → \[SLIDE 09\]**

* **Guion:** "La tortuga ya dibuja figuras continuas, pero un árbol no es una sola línea continua: un árbol tiene ramas que nacen del tronco y luego regresan al tronco para sacar otra rama. ¿Cómo hace la tortuga para no perderse? Usando dos símbolos mágicos: los corchetes \[ y \]. Piénsenlo como poner un pin en Google Maps. Cuando la tortuga lee abrir corchete \[, guarda en su memoria exactamente dónde está parada y hacia dónde mira. Luego se va a dibujar una rama lateral; y en cuanto lee cerrar corchete \], se teletransporta de vuelta al pin guardado para seguir subiendo por el tronco. Además, podemos diseñar reglas que alargan los tallos existentes o reglas con 'yemas' invisibles en las puntas para controlar cómo envejece cada rama."

## **\[19:30 – 22:30 \| Nicolas Bolaños\] — \[EN VIVO: P5.JS \- SKETCH 4\]**

* **Acción en pantalla:** Muestra la planta ramificada en p5.js y mueve suavemente los sliders de ángulo (\$\\delta\$) e iteraciones.  
* **Guion:** "Probemos esos corchetes en vivo. Aquí tenemos una regla con tres pares de corchetes, o sea, tres bifurcaciones por ciclo. Miren qué ocurre cuando muevo el slider del ángulo de giro: con 15 grados tenemos un ciprés cerrado y alto; si lo abro a 35 grados, se transforma en un arbusto frondoso; y si subo las iteraciones, cada ramita hija repite exactamente la misma arquitectura de su madre."

# **Acto 4: De Clones Perfectos a Naturaleza Viva — Los 5 Niveles (22:30 – 31:30)**

## **\[22:30 – 25:00 \| Angel Beltran\] — \[SLIDE 10\] → \[SLIDE 11\]**

* **Guion:** "Si ustedes ponen diez árboles generados con el código que acaba de mostrar mi compañero uno al lado del otro, van a notar algo raro de inmediato: parecen soldados de plástico. Todos son clones idénticos porque el sistema es determinista, siempre elige la misma regla. En la naturaleza, el viento, la genética y el azar hacen que dos semillas hermanas crezcan distinto. Para romper esa perfección artificial pasamos al segundo nivel: los L-Systems estocásticos, donde a cada letra le damos varias reglas posibles con un porcentaje de probabilidad, como lanzar un dado en cada rama."

## **\[25:00 – 27:30 \| Ariadna\] — \[EN VIVO: P5.JS \- SKETCH 5\]**

* **Acción en pantalla:** Pulsa varias veces el botón "Regenerar Bosque" en p5.js para mostrar cinco árboles lado a lado cambiando de forma orgánica.  
* **Guion:** "Aquí tenemos exactamente la misma especie de árbol, pero ahora la regla dice: 40 % de probabilidad de ramificar a la izquierda, 40 % a la derecha y 20 % de seguir recto. Cada vez que pulso regenerar, nace un bosque completamente natural donde ningún árbol repite la silueta del vecino."

## **\[27:30 – 29:30 \| Farid Ardila\] — \[SLIDE 10\]**

* **Guion:** "Pero la naturaleza va todavía más lejos, y por eso existen tres niveles más sofisticados. En el tercer nivel, los sistemas sensibles al contexto, las letras miran quién está a su izquierda y a su derecha antes de cambiar; así se simulan hormonas vegetales que viajan desde la raíz hasta la copa para avisar cuándo florecer. En el cuarto nivel, los paramétricos, cada letra carga una mochila con números —como grosor o edad—, lo que permite aplicar la famosa regla de Leonardo da Vinci: que el tronco se vaya adelgazando proporcionalmente cada vez que se divide en ramas más finas."

## **\[29:30 – 31:30 \| Nicolas Bolaños\] — \[SLIDE 12\]**

* **Guion:** "Y el quinto nivel es el más inteligente: los L-Systems abiertos o sensibles al entorno. Aquí la planta deja de crecer a ciegas y empieza a hacerle preguntas al mundo 3D que la rodea: ¿Hay una pared enfrente? ¿De dónde viene la luz del sol? Si una rama detecta sombra o un obstáculo, detiene su crecimiento o curva su ángulo buscando claridad. Es literalmente simular el fototropismo vegetal dentro de un motor gráfico."

# **Acto 5: Detrás de Cámaras en Computación Visual (31:30 – 38:00)**

## **\[31:30 – 33:30 \| Ariadna\] — \[SLIDE 13\] → \[EN VIVO: P5.JS \- SKETCH 5\]**

* **Acción en pantalla:** Sube el selector de iteraciones de 4 a 5, 6 y 7 (con precaución de no llegar al bloqueo total) señalando el contador de segmentos y FPS.  
* **Guion:** "Como ingenieros y artistas visuales, hay una trampa en la que todos caemos la primera vez que programamos un L-System: entusiasmarse subiendo las iteraciones. Miren el contador de líneas arriba en p5.js. En la iteración 4 tenemos unos cientos de segmentos y vamos a 60 cuadros por segundo. En la 6 ya son decenas de miles. Si pongo iteración 10, pasamos a millones de líneas y congelamos el navegador. El crecimiento exponencial es el principal reto de rendimiento que debemos controlar."

## **\[33:30 – 35:30 \| Angel Beltran\] — \[SLIDE 13\]**

* **Guion:** "El segundo truco técnico detrás de cámaras es cómo evitamos hacer trampa al reescribir. Si intentamos modificar la cadena de texto sobre sí misma mientras la vamos leyendo de izquierda a derecha, las letras nuevas que acabamos de crear se volverían a transformar antes de tiempo, rompiendo el paralelismo biológico. Por eso siempre usamos la técnica del doble cuaderno: leemos el estado completo de hoy en una lista de solo lectura, escribimos el resultado de mañana en una lista limpia, y al terminar el ciclo intercambiamos los cuadernos."

## **\[35:30 – 38:00 \| Farid Ardila\] — \[SLIDE 14\]**

* **Guion:** "Finalmente, ¿cómo pasamos de estas líneas planas en p5.js a los árboles volumétricos de un videojuego? Primero, nuestra tortuga deja de moverse en una mesa 2D y pasa a pilotar como un avión en 3D: ahora puede girar izquierda-derecha, subir-bajar la nariz y rotar sobre su propio eje. Segundo, en lugar de pintar líneas delgadas sin grosor, envolvemos cada tramo con cilindros conectados que se estrechan hacia la punta, y en los extremos pegamos hojas reutilizando una sola geometría en la tarjeta gráfica miles de veces."

# **Acto 6: Impacto Real y Cierre (38:00 – 45:00)**

## **\[38:00 – 40:15 \| Nicolas Bolaños\] — \[SLIDE 15\]**

* **Guion:** "¿Dónde vemos todo esto fuera del aula? En prácticamente toda la industria del entretenimiento. Herramientas estándar de cine y videojuegos como SpeedTree —usada desde Avatar hasta The Witcher— se basan en L-Systems paramétricos. Y en juegos de exploración espacial como No Man's Sky, donde existen trillones de planetas, sería imposible guardar los árboles en el disco duro; en cambio, el juego guarda una pequeña semilla numérica y un L-System cultiva la flora de cada planeta en tiempo real frente al jugador."

## **\[40:15 – 42:15 \| Farid Ardila\] — \[SLIDE 15\]**

* **Guion:** "Pero los L-Systems no solo sirven para plantas. En 2001, investigadores de gráficos por computadora demostraron que una ciudad crece igual que una raíz buscando agua. Extendieron los L-Systems para trazar redes viales completas: las avenidas principales avanzan buscando conectar centros poblados, mientras las calles secundarias se ramifican en cuadrículas y se detienen automáticamente si chocan contra un río o una montaña. Hoy este enfoque se usa en planificación urbana y entornos virtuales masivos."

## **\[42:15 – 43:45 \| Angel Beltran\] — \[SLIDE 15\]**

* **Guion:** "Incluso la ciencia pura los utiliza: en agronomía existen modelos virtuales de cultivos que combinan L-Systems con simulación de luz solar para predecir cuánto va a producir una cosecha antes de sembrar una sola semilla. Y en el arte generativo, los mismos símbolos de giro y avance se traducen a notas y duraciones para componer música algorítmica con estructura fractal."

## **\[43:45 – 45:00 \| Ariadna\] — \[EN VIVO: P5.JS \- SKETCH 1\]**

* **Acción en pantalla:** Vuelve a la primera pestaña de p5.js, limpia el lienzo y lanza una última generación del bosque completo.  
* **Guion:** "Al final, la lección más poderosa de los L-Systems para la computación visual es un cambio de mentalidad: dejar de pensar en los objetos como formas estáticas que tenemos que dibujar píxel a píxel, y empezar a verlos como sistemas vivos gobernados por reglas simples. Con un alfabeto diminuto, una semilla y la capacidad de recordar de dónde venimos, podemos hacer que la computadora cultive mundos enteros. Muchas gracias."

