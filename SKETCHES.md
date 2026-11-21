# **Asignación Final de Sketches**

## Distribución completa de desarrollo e implementación interactiva en p5.js

| Sketch | Tema y Propósito en la Charla | Responsable de Desarrollo | Quién lo Opera en Vivo |
| :---- | :---- | :---- | :---- |
| **Sketch 1** | Gancho inicial: árbol frondoso animado rama por rama | **Farid Ardila** | Nicolas Bolaños (Acto 1\) y Ariadna (Acto 6\) |
| **Sketch 2** | Crecimiento del alga *Anabaena* y emergencia de Fibonacci | **Ariadna***(selección aleatoria)* | Nicolas Bolaños (Acto 2\) |
| **Sketch 3** | Tortuga LOGO y mutación del copo de nieve de Koch | **Nicolas Bolaños** | Ariadna (Acto 3\) |
| **Sketch 4** | Planta ramificada con corchetes \[ \] y *sliders* en vivo | **Ariadna** | Nicolas Bolaños (Acto 3\) |
| **Sketch 5** | Bosque estocástico (probabilidades) \+ prueba de estrés FPS | **Angel Beltran** | Ariadna (Actos 4 y 5\) |

# **Sketch 1: Árbol Frondoso Animado (Gancho Inicial y Cierre)**

* **Responsable de código:** Farid Ardila  
* **Momento en el guion:** Acto 1 (00:00 – 02:00, antes de saludar, tras la pantalla negra de Slide 01\) y Acto 6 (43:45 – 45:00, cierre final).

## **1\. Reglas del L-System (D0L-System con Reescritura de Nodos)**

* **Alfabeto ($V$):**{ X, F, \+, \-, \[, \] }  
* **Axioma ($\omega$):**"X"  
* **Reglas de producción ($P$):**  
  * X \-\> F+\[\[X\]-X\]-F\[-FX\]+X  
  * F \-\> FF  
  * \+, \-, \[, \]$\rightarrow$ constantes (permanecen iguales en cada iteración).  
* **Parámetros geométricos:**  
  * **Iteraciones ($n$):** 5 (produce una estructura densa y orgánica sin afectar fluidez).  
  * **Ángulo de giro ($\delta$):** 25° (radians(25)).  
  * **Longitud de paso (len):** 145 \* pow(0.5, n) (en n \= 5 equivale a \~4.53 px por segmento F, garantizando que el árbol ocupe \~80 % de la altura del lienzo).  
* **Diccionario de la tortuga:**  
  * **F**: dibuja un segmento hacia arriba de longitud len y traslada el origen al extremo final.  
  * **\+**: gira a la derecha $+\delta$ (rotate(radians(25))).  
  * **\-**: gira a la izquierda $-\delta$ (rotate(radians(-25))).  
  * **\[**: guarda posición, ángulo y profundidad en la pila (push()).  
  * **\]**: dibuja una hoja verde en la punta antes de restaurar el estado guardado (pop()).

## **2\. Diseño e Implementación en p5.js**

* **Lienzo y encuadre:** createCanvas(900, 650\) con fondo oscuro neutro (\#121417) para alto contraste en proyector. Origen inicial en la base central: translate(width / 2, height \- 30).  
* **Estética orgánica:**  
  * **Tronco y ramas:** Color interpolado según la profundidad de corchetes (depth): desde marrón corteza (\#5C4033) en el tronco hasta verde oliva (\#6B8E23) en las puntas. Grosor decreciente: strokeWeight(max(1, 7.5 \- depth \* 1.1)).  
  * **Hojas:** En cada cierre \], dibujar una elipse inclinada (ellipse(0, 0, 6, 11)) sin borde (noStroke()) en verde esmeralda (\#2ECC71, opacidad 210).  
* **Animación progresiva de 4 segundos:**  
  * En setup(), generar la cadena final completa (cadenaFinal) usando dos cadenas (double buffering: leer actual, construir siguiente y reemplazar).  
  * Mantener una variable limiteCaracteres \= 0\. En cada frame de draw(), incrementar limiteCaracteres \+= ceil(cadenaFinal.length / 240\) (a 60 FPS, 240 frames \= 4 segundos exactos) y recorrer cadenaFinal solo hasta limiteCaracteres.  
* **Controles interactivos:**  
  * **Clic en el lienzo o tecla ESPACIO:** Reinicia limiteCaracteres \= 0 para volver a animar el crecimiento desde cero (necesario para relanzar el bosque en el cierre del Acto 6).  
  * **Tecla B:** Alterna entre 1 árbol central (para el Acto 1\) y 3 árboles simultáneos en x \= \[220, 450, 680\] (para mostrar el bosque completo en 43:45).

## **3\. Qué se Planea Mostrar en Vivo**

* Al presionar *Play* en 00:00, el público observa en silencio cómo el árbol crece rama por rama y se llena de hojas verdes en 4 segundos.  
* En el cierre (43:45), se limpia el lienzo y se vuelve a ejecutar la animación del bosque completo mientras se da la conclusión final.

# **Sketch 2: El Alga que Sabe Contar (Fibonacci Emergente)**

* **Responsable de código:** Ariadna *(asignada aleatoriamente)*  
* **Momento en el guion:** Acto 2 (09:30 – 11:30), justo después de explicar Alfabeto, Axioma y Reglas (Slide 05 y Slide 06).

## **1\. Reglas del L-System (D0L-System Original de *Anabaena catenula*)**

* **Alfabeto ($V$):**{ A, B }  
* **Axioma ($\omega$):**"A"  
* **Reglas de producción simultáneas ($P$):**  
  * A \-\> AB  
  * B \-\> A  
* **Evolución exacta de n \= 0 a n \= 7:**  
  * n \= 0$\rightarrow$A (longitud: **1**)  
  * n \= 1$\rightarrow$AB (longitud: **2**)  
  * n \= 2$\rightarrow$ABA (longitud: **3**)  
  * n \= 3$\rightarrow$ABAAB (longitud: **5**)  
  * n \= 4$\rightarrow$ABAABABA (longitud: **8**)  
  * n \= 5$\rightarrow$ABAABABAABAAB (longitud: **13**)  
  * n \= 6$\rightarrow$ABAABABAABAABABAABABA (longitud: **21**)  
  * n \= 7$\rightarrow$ABAABABAABAABABAABABAABAABABAABAAB (longitud: **34**)

## **2\. Diseño e Implementación en p5.js**

* **Lienzo y tipografía:** createCanvas(1020, 620), fondo \#161920, fuente monoespaciada (textFont('Courier New')) para que las columnas queden perfectamente alineadas.  
* **Estructura de datos:**  
  * Un arreglo historial \= \["A"\] que almacena el historial de cadenas por generación, y una variable generacionVisible \= 0\.  
  * Función siguienteGeneracion(cadena): recorre cadena de principio a fin y concatena en una nueva variable nuevaCadena ("AB" si lee 'A', "A" si lee 'B').  
* **Layout visual en 3 columnas por fila (y \= 90 \+ i \* 65 para i de 0 a generacionVisible):**  
  * **Columna izquierda (x \= 50):** Etiqueta blanca n \= 0, n \= 1, etc.  
  * **Columna central (x \= 170):** Dibuja cada letra como una pequeña cápsula o carácter coloreado para diferenciar el comportamiento biológico:  
    * Letra A en naranja brillante (\#F39C12).  
    * Letra B en azul cian (\#38BDF8).  
    * Ajustar el ancho por carácter dinámicamente (espacio \= min(24, 620 / cadena.length)) para que en n \= 7 (34 letras) no invada la columna derecha.  
  * **Columna derecha (x \= 830):** Texto alineado a la izquierda en verde esmeralda (\#2ECC71): Letras: 1, Letras: 2, Letras: 3, Letras: 5, Letras: 8, Letras: 13, Letras: 21, Letras: 34\.  
* **Controles interactivos:**  
  * **Clic izquierdo en el lienzo (o tecla FLECHA DERECHA):** Si generacionVisible \< 7, calcula la siguiente cadena, la agrega a historial e incrementa generacionVisible.  
  * **Tecla R:** Reinicia historial \= \["A"\] y generacionVisible \= 0\.

## **3\. Qué se Planea Mostrar en Vivo**

* Al abrir la pestaña solo aparece la fila n \= 0 : A con contador 1\.  
* Con cada clic del expositor se revela una fila nueva, permitiendo señalar cómo todas las letras cambian simultáneamente y cómo en la columna derecha emerge la sucesión de Fibonacci sin haberla programado.

# **Sketch 3: La Tortuga y el Copo de Nieve de Koch**

* **Responsable de código:** Nicolas Bolaños  
* **Momento en el guion:** Acto 3 (14:00 – 16:30), justo después de introducir la tortuga LOGO en Slide 07\.

## **1\. Reglas del L-System (D0L-System de Koch)**

* **Alfabeto ($V$):**{ F, \+, \- }  
* **Axioma ($\omega$):**"F--F--F" (triángulo equilátero cerrado).  
* **Regla de producción ($P$):**  
  * F \-\> F+F--F+F  
  * \+ y \-$\rightarrow$ constantes.  
* **Diccionario de la tortuga:**  
  * **F**: avanza dibujando una línea de longitud paso (line(0, 0, paso, 0\) y translate(paso, 0)).  
  * **\+**: gira a la izquierda angulo grados (rotate(-radians(angulo))).  
  * **\-**: gira a la derecha angulo grados (rotate(radians(angulo))).  
* **Escalado automático (indispensable para que no salga del lienzo):**  
  * Cada iteración divide cada segmento en 3 partes iguales: paso \= ladoBase / pow(3, iteraciones), usando ladoBase \= 400\. Así el copo conserva el mismo tamaño exterior en todas las iteraciones.

## **2\. Diseño e Implementación en p5.js**

* **Variables editables en la parte superior del código:**  
  * Las dos primeras líneas del archivo deben ser exactamente:  
  * Código JavaScript:

```js
let iteraciones = 1;
let angulo = 60;
```

  * *Nota:* En el editor web de p5.js se mostrará la pantalla dividida (código a la izquierda, lienzo a la derecha) para editar esos dos números y pulsar *Play* en vivo.  
* **Lienzo y centrado geométrico:**  
  * createCanvas(600, 600), fondo azul pizarra oscuro (\#0F172A), trazo cian brillante (\#38BDF8) con strokeWeight(max(1, 2.5 \- iteraciones \* 0.35)).  
  * Centrado del triángulo equilátero antes de iniciar el dibujo: translate(width / 2 \- ladoBase / 2, height / 2 \- (ladoBase \* sqrt(3)) / 6).  
* **Indicador inferior:** Texto discreto en la esquina inferior izquierda mostrando Iteraciones: X \| Ángulo: Y° \| Segmentos: Z.

## **3\. Qué se Planea Mostrar en Vivo**

* Arranca ejecutando el triángulo inicial con iteraciones \= 1 y angulo \= 60\.  
* El expositor cambia en el código iteraciones a 2, 3 y 4 pulsando *Play* en cada cambio para revelar el copo de nieve de Koch.  
* Luego cambia angulo \= 60 por angulo \= 85 (con iteraciones \= 3 o 4\) para demostrar cómo una ligera modificación angular transforma al instante toda la geometría.

# **Sketch 4: Planta Ramificada con Corchetes y Sliders en Vivo**

* **Responsable de código:** Ariadna  
* **Momento en el guion:** Acto 3 (19:30 – 22:30), tras explicar los corchetes \[ \] (Slide 08\) y reescritura de aristas vs. nodos (Slide 09).

## **1\. Reglas del L-System (Bracketed D0L-System con 3 Bifurcaciones)**

* **Alfabeto ($V$):**{ F, \+, \-, \[, \] }  
* **Axioma ($\omega$):**"F"  
* **Regla de producción ($P$):**  
  * F \-\> F\[+F\]\[-F\]F\[+F\]  
  * *Por qué esta regla:* Contiene **exactamente tres pares de corchetes** (tres bifurcaciones por ciclo, alineado con el guion) y 5 símbolos F por regla, lo que mantiene el conteo en 15,625 segmentos en la iteración 6 para mover los *sliders* a 60 FPS sin congelar el navegador.  
* **Diccionario de la tortuga:**  
  * **F**: dibuja segmento hacia arriba (line(0, 0, 0, \-len) y translate(0, \-len)).  
  * **\+**: gira a la derecha $+\delta$ (rotate(radians(angulo))).  
  * **\-**: gira a la izquierda $-\delta$ (rotate(-radians(angulo))).  
  * **\[**: guarda estado en pila (push()).  
  * **\]**: restaura estado desde pila (pop()).

## **2\. Diseño e Implementación en p5.js**

* **Lienzo:** createCanvas(850, 650), fondo \#1E293B, tallos en verde bosque (\#22C55E) con punta en verde lima (\#86EFAC). Origen en translate(width / 2, height \- 30).  
* **3 Sliders interactivos en pantalla (createSlider):**  
  * **Ángulo de apertura ($\delta$):** sliderAngulo \= createSlider(5, 60, 15, 1\) (arranca en 15° para mostrar la silueta cerrada tipo ciprés).  
  * **Longitud del paso (len):** sliderLongitud \= createSlider(4, 30, 16, 1).  
  * **Iteraciones (n):** sliderIter \= createSlider(1, 6, 4, 1).  
* **Escalado y rendimiento:**  
  * Escalar la longitud visual según la iteración (let lenReal \= sliderLongitud.value() \* pow(0.55, n \- 1)) para que al subir hasta 6 la planta no se salga de la pantalla.  
  * Recalcular la cadena de texto **únicamente** cuando cambie sliderIter.value() (guardando ultimaIteracion), mientras que sliderAngulo y sliderLongitud se aplican en tiempo real durante el dibujado.  
  * Mostrar el valor numérico actual al lado de cada *slider* (ej. Ángulo: 15°, Longitud: 16 px, Iteraciones: 4).

## **3\. Qué se Planea Mostrar en Vivo**

* Inicia en 15° mostrando un ciprés alto y cerrado.  
* El expositor desliza suavemente el *slider* de ángulo hasta 35° para convertirlo en un arbusto frondoso, ajusta la longitud de paso y sube las iteraciones para mostrar cómo cada ramita hija replica la estructura de la planta madre.

# **Sketch 5: Bosque Estocástico y Prueba de Estrés Exponencial**

* **Responsable de código:** Angel Beltran  
* **Momento en el guion:**  
  1. Acto 4 (25:00 – 27:30): demostración de variación natural con probabilidades.  
  2. Acto 5 (31:30 – 33:30): demostración de crecimiento exponencial y caída de FPS.

## **1\. Reglas del L-System (S0L-System Estocástico)**

* **Alfabeto ($V$):**{ X, F, \+, \-, \[, \] }  
* **Axioma ($\omega$):**"X"  
* **Reglas de producción con probabilidad ($P$):**  
  * Para cada símbolo X, generar let r \= random(1); y elegir una de las 3 reglas exactas del guion:  
    * **40 % (r \< 0.40):**X \-\> F\[-X\]\[+X\]FX (ramificación con inclinación izquierda)  
    * **40 % (0.40 \<= r \< 0.80):**X \-\> F\[+X\]\[-X\]FX (ramificación con inclinación derecha)  
    * **20 % (r \>= 0.80):**X \-\> FF\[+X\]X (crecimiento recto predominante)  
  * Para F: F \-\> FF  
* **Parámetros geométricos:**  
  * **Ángulo base ($\delta$):** 22°.  
  * **Longitud de paso (len):** 120 \* pow(0.5, iteraciones).

## **2\. Diseño e Implementación en p5.js**

* **Lienzo y escena de bosque:**  
  * createCanvas(1100, 620), fondo \#181C24 con una línea de suelo en y \= height \- 50 (stroke('\#334155')).  
  * Generar **5 árboles independientes** ubicados en x \= \[140, 345, 550, 755, 960\]. Cada árbol ejecuta su propio proceso de reescritura estocástica para que los 5 tengan siluetas distintas.  
  * Colorear las ramas en tonos tierra (\#8D6E63) y dibujar pequeños brotes verdes (\#4ADE80) en los cierres \].  
* **Controles UI en pantalla:**  
  * **Botón "Regenerar Bosque" (createButton):** Vuelve a calcular las 5 cadenas estocásticas desde "X" y actualiza el conteo total de segmentos.  
  * Selector de iteraciones (4, 5, 6, 7, 8): Implementado con createSelect() o 5 botones numerados arriba a la izquierda (inicia seleccionado en 4).  
    * *Safeguard técnico:* En iteración 8 (donde se superan cientos de miles de segmentos), permitir que draw() dibuje normalmente para mostrar la caída real de FPS, pero sin usar funciones costosas como push()/pop() anidados innecesarios ni alpha en cada línea (usar stroke(74, 222, 128\) directo) para que baje de 60 FPS a \~10–15 FPS de forma ilustrativa sin colgar la pestaña del navegador.  
* **Panel de telemetría en vivo (esquina superior derecha):**  
  * **Segmentos dibujados:** Suma total de caracteres 'F' entre los 5 árboles (formateado con separador de miles, ej. Segmentos: 12,480).  
  * **FPS en vivo:** round(frameRate()) coloreado dinámicamente: verde (\#2ECC71) si \>= 50 FPS, amarillo (\#F1C40F) si 25–49 FPS, y rojo (\#EF4444) si \< 25 FPS.

## **3\. Qué se Planea Mostrar en Vivo**

* **En el Acto 4 (25:00):** Con las iteraciones en 4, el expositor pulsa *"Regenerar Bosque"* varias veces para mostrar cómo los 5 árboles cambian de forma orgánica en cada clic.

**En el Acto 5 (31:30):** El expositor cambia el selector de iteraciones de 4 $\rightarrow$ 5 $\rightarrow$ 6 $\rightarrow$ 7 (y opcionalmente 8), señalando en pantalla cómo el contador de segmentos crece exponencialmente y cómo el indicador de FPS pasa de verde a rojo.