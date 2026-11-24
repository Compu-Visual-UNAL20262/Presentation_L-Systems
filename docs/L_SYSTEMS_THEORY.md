# Fundamentos Teóricos y Matemáticos de los L-Systems

Este documento expone con rigor formal y pedagógico los fundamentos matemáticos, biológicos y computacionales de los **Sistemas de Lindenmayer (L-Systems)**.

---

## 1. Introducción y Contexto Histórico

Los **L-Systems** fueron formulados en 1968 por el biólogo teórico y botánico húngaro **Aristid Lindenmayer** (1925–1989) en su célebre trabajo en dos partes: *Mathematical models for cellular interactions in development*. 

El propósito original de Lindenmayer no era generar gráficos por computadora (disciplina incipiente en esa década), sino proporcionar un marco matemático riguroso para formalizar el desarrollo morfogénico de organismos multicelulares simples, tales como las algas filamentosas (*Anabaena catenula*), musgos y el crecimiento apical de plantas vasculares.

En la década de 1980, el informático teórico polaco **Przemyslaw Prusinkiewicz** reconoció el potencial visual de los L-Systems al acoplar sus cadenas generadas con la geometría de la tortuga (*Turtle Graphics*). Esta convergencia culminó en 1990 con la publicación de la obra seminal:

> **Prusinkiewicz, P., & Lindenmayer, A. (1990).** *The Algorithmic Beauty of Plants (ABOP)*. Springer-Verlag.

---

## 2. L-Systems vs. Gramáticas de la Jerarquía de Chomsky

En la teoría clásica de lenguajes formales y autómatas de Noam Chomsky, una gramática genera cadenas mediante transformaciones secuenciales de símbolos. Sin embargo, los L-Systems operan bajo premisas biológicamente divergentes:

```
Gramática de Chomsky (Secuencial)
S ──► aSb ──► aaSbb ──► aabb
(Un solo símbolo no terminal reemplazado en cada paso)

L-System (Paralelo Simultáneo)
(Generación n)   :  A      B      A
                     │      │      │
                     ▼      ▼      ▼
(Generación n+1) : [A B]   [A]   [A B]
(Todos los símbolos se reescriben al mismo instante)
```

| Criterio | Gramáticas de Chomsky | L-Systems (Lindenmayer) |
| :--- | :--- | :--- |
| **Derivación** | **Secuencial:** Se aplica una sola regla a un único símbolo no terminal por paso temporal. | **Paralela:** En cada ciclo discreto $n \to n+1$, todas las reglas aplicables se evalúan **simultáneamente** en todos los símbolos de la palabra. |
| **Justificación ontológica** | Procesamiento sintáctico textual o análisis de compiladores (un cursor o parser que avanza linealmente). | Biología celular: durante un intervalo de tiempo biológico, las células de un tejido se dividen al unísono. |
| **Conjunto Terminal** | Distinción estricta entre símbolos terminales $V_T$ y no terminales $V_N$. Solo las cadenas puramente terminales pertenecen al lenguaje $L(G)$. | No existe distinción funcional terminal / no terminal; **todas las cadenas intermedias** $S_n$ describen el fenotipo completo del organismo vivo en el instante $t=n$. |

---

## 3. Definición Formal de un D0L-System

Un **D0L-System** (*Deterministic 0-Context Lindenmayer System*) es la variante determinista y libre de contexto más elemental. Formalmente, se define como una tripleta ordenada:

$$G = (V, \omega, P)$$

Donde:
1. **$V$ (Alfabeto):** Conjunto finito de símbolos disjuntos. Si una letra posee una regla explícita en $P$, se considera *variable*; si carece de regla explícita, se considera *constante*, asumiendo la regla identidad implícita $c \to c$.
2. **$\omega \in V^+$ (Axioma o Semilla):** Cadena inicial de longitud finita no nula que define el estado morfológico en la generación $n=0$.
3. **$P \subset V \times V^*$ (Conjunto de Producciones):** Conjunto finito de reglas de reescritura expresadas de la forma:
   $$a \to \chi \quad \text{donde } a \in V, \; \chi \in V^*$$
   - $a$ es el *predecesor*.
   - $\chi$ es el *sucesor*. Si $\chi = \varepsilon$ (la cadena vacía), el símbolo desaparece (muerte o poda celular).

### Homomorfismo de Reescritura
Dado que la sustitución es paralela y libre de contexto, la derivación en un D0L-System es un **homomorfismo libre** $h: V^* \to V^*$. Para cualquier cadena compuesta por símbolos $w = a_1 a_2 \dots a_k$ (con $a_i \in V$), el estado de la siguiente generación es:

$$h(w) = h(a_1) h(a_2) \dots h(a_k) = \chi_1 \chi_2 \dots \chi_k$$

La secuencia de formas generadas por el sistema es la órbita $\{ \omega, h(\omega), h^2(\omega), h^3(\omega), \dots \}$.

---

## 4. El Caso Canónico: *Anabaena catenula* y la Emergencia de Fibonacci

Lindenmayer empleó la siguiente gramática para describir el alargamiento y la alternancia de divisiones en los filamentos de la cianobacteria *Anabaena catenula*:

- **Alfabeto:** $V = \{ A, B \}$
- **Axioma:** $\omega = A$
- **Reglas de Producción:**
  $$\begin{cases} A \to AB & \text{(Célula madura } A \text{ se divide en una madura y una joven)} \\ B \to A & \text{(Célula joven } B \text{ madura y pasa al estado } A) \end{cases}$$

### Evolución de Cadenas

| Generación ($n$) | Cadena Generada | Longitud ($L_n$) | Conteo $A$ | Conteo $B$ | Cociente $\#(A)/\#(B)$ |
| :---: | :--- | :---: | :---: | :---: | :---: |
| **0** | `A` | 1 | 1 | 0 | $\infty$ |
| **1** | `AB` | 2 | 1 | 1 | 1.000000 |
| **2** | `ABA` | 3 | 2 | 1 | 2.000000 |
| **3** | `ABAAB` | 5 | 3 | 2 | 1.500000 |
| **4** | `ABAABABA` | 8 | 5 | 3 | 1.666667 |
| **5** | `ABAABABAABAAB` | 13 | 8 | 5 | 1.600000 |
| **6** | `ABAABABAABAABABAABABA` | 21 | 13 | 8 | 1.625000 |
| **7** | `ABAABABAABAABABAABABAABAABABAABAAB` | 34 | 21 | 13 | 1.615385 |

### Demostración de Fibonacci y el Número Áureo
Sean $N_A(n)$ y $N_B(n)$ el número de símbolos $A$ y $B$ en la iteración $n$. Por las reglas:
- Cada $A$ en $n-1$ produce un $A$ y un $B$ en $n$.
- Cada $B$ en $n-1$ produce un $A$ en $n$.

Por tanto:
$$N_A(n) = N_A(n-1) + N_B(n-1)$$
$$N_B(n) = N_A(n-1)$$

Sustituyendo $N_B(n-1) = N_A(n-2)$, obtenemos la relación de recurrencia clásica de Fibonacci:
$$N_A(n) = N_A(n-1) + N_A(n-2)$$

La longitud total $L_n = N_A(n) + N_B(n) = N_A(n+1)$ coincide con la sucesión de Fibonacci. Resolviendo la ecuación característica $r^2 - r - 1 = 0$, obtenemos la raíz positiva:
$$\phi = \frac{1 + \sqrt{5}}{2} \approx 1.6180339887...$$

En consecuencia:
$$\lim_{n \to \infty} \frac{N_A(n)}{N_B(n)} = \lim_{n \to \infty} \frac{N_A(n)}{N_A(n-1)} = \phi$$

---

## 5. Interpretación Geométrica: Gráficos de Tortuga

Para traducir una cadena unidimensional abstracta a una estructura espacial bidimensional o tridimensional, se utiliza un intérprete gráfico basado en la metáfora de la **tortuga** (*Turtle Graphics*).

### Estado de la Tortuga en 2D
En el plano euclidiano $\mathbb{R}^2$, el estado de la tortuga se define por la tupla:

$$(x, y, \alpha)$$

Donde $(x, y)$ representan las coordenadas cartesianas y $\alpha$ es la orientación angular en radianes respecto al semieje positivo de las abscisas.

Dados los parámetros de longitud de avance $d$ e incremento angular $\delta$:
- **Comando `F`:** Avanzar dibujando un trazo lineal:
  $$x' = x + d \cdot \cos(\alpha), \quad y' = y + d \cdot \sin(\alpha)$$
- **Comando `+`:** Girar a la izquierda (en sentido antihorario):
  $$\alpha' = \alpha + \delta$$
- **Comando `-`:** Girar a la derecha (en sentido horario):
  $$\alpha' = \alpha - \delta$$

### Estado de la Tortuga en 3D
En el espacio tridimensional $\mathbb{R}^3$, el estado se representa por una posición vectorial $\vec{P} \in \mathbb{R}^3$ y una base ortonormal que describe su triedro móvil:

$$(\vec{P}, \vec{H}, \vec{L}, \vec{U})$$

- $\vec{H}$ (*Heading*): Vector director frontal (hacia dónde avanza la tortuga).
- $\vec{L}$ (*Left*): Vector director hacia la izquierda local de la tortuga.
- $\vec{U}$ (*Up*): Vector director superior normal al plano de avance local, verificando:
  $$\vec{H} \times \vec{L} = \vec{U}, \quad \|\vec{H}\| = \|\vec{L}\| = \|\vec{U}\| = 1$$

Las transformaciones espaciales se calculan multiplicando los vectores directores por matrices de rotación 3D alrededor de los ejes locales:

1. **Yaw (giro alrededor de $\vec{U}$):** Operadores `+` y `-`
   $$R_{\vec{U}}(\pm \delta) = \begin{bmatrix} \cos(\pm \delta) & \sin(\pm \delta) & 0 \\ -\sin(\pm \delta) & \cos(\pm \delta) & 0 \\ 0 & 0 & 1 \end{bmatrix}$$
2. **Pitch (inclinación alrededor de $\vec{L}$):** Operadores `&` y `^`
   $$R_{\vec{L}}(\pm \delta) = \begin{bmatrix} \cos(\pm \delta) & 0 & -\sin(\pm \delta) \\ 0 & 1 & 0 \\ \sin(\pm \delta) & 0 & \cos(\pm \delta) \end{bmatrix}$$
3. **Roll (balanceo sobre el eje de avance $\vec{H}$):** Operadores `\` y `/`
   $$R_{\vec{H}}(\pm \delta) = \begin{bmatrix} 1 & 0 & 0 \\ 0 & \cos(\pm \delta) & -\sin(\pm \delta) \\ 0 & \sin(\pm \delta) & \cos(\pm \delta) \end{bmatrix}$$

---

## 6. Ramificación con Pila (Bracketed L-Systems)

Las estructuras vegetales presentan ramificaciones jerárquicas recurrentes. Para capturar esta topología arbórea sin perder la naturaleza lineal de las cadenas, Prusinkiewicz introdujo los delimitadores de corchetes `[` y `]`.

El intérprete implementa una **Pila LIFO** (*Last In, First Out*):

```
       Pila (Stack)
   ┌──────────────────┐
   │ (P, H, L, U, w)  │  ◄── Top (Restaurado en ']')
   ├──────────────────┤
   │ (P, H, L, U, w)  │
   └──────────────────┘
```

- **`[` (Push):** Guarda una copia exacta del estado completo de la tortuga en la cima de la pila (posición, orientación, color y grosor). Permite comenzar a trazar una rama secundaria.
- **`]` (Pop):** Extrae el estado más reciente de la cima de la pila y lo asigna a la tortuga. La tortuga se reubica instantáneamente en el punto de bifurcación con su orientación original previa, lista para continuar el eje principal o trazar otra rama.

### Patrones de Diseño: Aristas vs. Nodos
1. **Reescritura de Aristas (*Edge-Rewriting*):**
   Las reglas actúan sobre los símbolos geométricos directos `F`. Cada segmento se fractura en sub-segmentos y brotes laterales.
   *Ejemplo:* $F \to F[+F]F[-F]F$.
2. **Reescritura de Nodos (*Node-Rewriting*):**
   Se utilizan símbolos no dibujables que representan meristemos o yemas de crecimiento (`X`, `Y`).
   *Ejemplo:* $X \to F[+X][-X]FX, \; F \to FF$.
   Esta formulación separa la elongación de la corteza ($F \to FF$) de la proliferación apical ($X$), emulando con mayor fidelidad la botánica real.

---

## 7. Taxonomía: Los 5 Niveles de Realismo

Para modelar la complejidad biológica, la teoría clasifica los L-Systems en cinco niveles evolutivos:

```
  [ Nivel 5: Open L-Systems ] ─────────► Fototropismo, sombras, obstáculos 3D
              ▲
  [ Nivel 4: L-Systems Paramétricos ] ──► Ley de Leonardo da Vinci, grosor variable
              ▲
  [ Nivel 3: IL-Systems ] ──────────────► Señalización hormonal celular (contexto)
              ▲
  [ Nivel 2: S0L-Systems ] ─────────────► Azar estocástico, biodiversidad forestal
              ▲
  [ Nivel 1: D0L-Systems ] ─────────────► Deterministas puros, fractales ideales
```

### Nivel 1: D0L-Systems (Deterministas y Libres de Contexto)
- Cada símbolo posee una única regla fija de derivación.
- Produce estructuras 100% simétricas o fractales ideales (Curva de Koch, Dragón de Heighway, Alfombra de Sierpinski). Dos instancias con los mismos parámetros son geométricamente indistinguibles.

### Nivel 2: S0L-Systems (Estocásticos)
- A un mismo símbolo predecesor se le asocian múltiples producciones posibles, cada una con una probabilidad asignada $p_i$, cumpliendo:
  $$\sum_{i=1}^k p_i = 1$$
- *Ejemplo en el Sketch 5:*
  $$X \xrightarrow{0.40} F[-X][+X]FX, \quad X \xrightarrow{0.40} F[+X][-X]FX, \quad X \xrightarrow{0.20} FF[+X]X$$
- Permite generar bosques completos donde todos los árboles comparten la misma filogenia y reglas morfológicas, pero cada individuo desarrolla una silueta única debido al azar microclimático.

### Nivel 3: IL-Systems (Sensibles al Contexto)
- La sustitución de un símbolo $a$ depende de sus vecinos en la cadena:
  $$A_L < a > A_R \to \chi$$
  $a$ se sustituye por $\chi$ si y solo si su vecino inmediato a la izquierda es $A_L$ y a la derecha es $A_R$.
- **Algoritmo de Omisión de Ramas:** En estructuras ramificadas `[ ... ]`, el vecino izquierdo de un nodo puede no ser el carácter contiguo en la cadena, sino el nodo padre donde se abrió el corchete. El algoritmo de parsing debe descartar sub-ramas colaterales para localizar el nodo biológicamente conectado.
- **Aplicación morfogénica:** Simulación del flujo de fitohormonas como las auxinas (transporte acrópeta desde la raíz o basípeta desde el ápice), controlando la dominancia apical y la floración coordinada.

### Nivel 4: L-Systems Paramétricos
- Los símbolos transportan tuplas de números reales como atributos: $A(r, l, \theta)$. Las reglas incorporan expresiones aritméticas continuas y predicados booleanos (*guardas*):
  $$A(w, l) : w > 2.0 \to F(w, l) \; [ + A(w \cdot q, l \cdot 0.8) ] \; [ - A(w \cdot q, l \cdot 0.8) ]$$
- **Ley de Áreas de Leonardo da Vinci:** Da Vinci observó empíricamente que en cualquier bifurcación de un árbol, la suma de las áreas transversales de las ramas hijas equivale al área del tronco padre:
  $$r_{padre}^2 = r_{hija1}^2 + r_{hija2}^2$$
  Generalizado a un exponente arbitrario $e$:
  $$r_{padre}^e = \sum_{i=1}^m r_{hija_i}^e \implies r_{hija} = r_{padre} \cdot \left(\frac{1}{m}\right)^{1/e}$$
  - $e = 2$: Conservación exacta de área hidráulica (tronco robusto natural).
  - $e < 2$: Las ramas se afinan aceleradamente (aspecto frágil / sauce).
  - $e > 2$: Las ramas retienen volumen relativo (aspecto craso / baobab).

### Nivel 5: Open L-Systems (Sensibles al Entorno)
- Incorporan símbolos especiales de consulta ambiental (e.g. `?P` para consultar posición espacial absoluta).
- En cada paso generativo, el intérprete interactúa con el motor 3D de la escena para consultar mapas de iluminación, oclusión ambiental o polígonos de colisión.
- Modela fenómenos biológicos externos:
  - **Fototropismo:** Curvatura hacia los gradientes máximos de radiación lumínica.
  - **Topotropismo:** Evasión de colisiones contra muros o ramas adyacentes.
  - **Poda ambiental:** Muerte celular de ramas sombreadas por el dosel superior.

---

## 8. Geometría Fractal y Dimensión de Hausdorff

Cuando el número de iteraciones en un D0L-System tiende a infinito ($n \to \infty$), el trazado vectorial converge a un conjunto fractal autosimilar.

### Dimensión de Autosimilitud (Hausdorff-Besicovitch)
Si un objeto geométrico se compone de $N$ copias exactas de sí mismo, cada una escalada por un factor de reducción $s \in (0, 1)$, su dimensión fractal $D$ se define formalmente como:

$$D = \frac{\ln(N)}{\ln(1/s)}$$

| Objeto Fractal | Gramática D0L ($\omega, P, \delta$) | Parámetros ($N, s$) | Dimensión Fractal $D$ | Interpretación Visual |
| :--- | :--- | :---: | :---: | :--- |
| **Curva de Koch** | $\omega = F$, $F \to F+F--F+F$, $\delta = 60^\circ$ | $N = 4, \; s = 1/3$ | $D = \frac{\ln 4}{\ln 3} \approx 1.2619$ | Una línea rugosa intermedia entre 1D (línea) y 2D (plano). Longitud infinita encerrando área finita. |
| **Flecha de Sierpinski** | $\omega = A$, $A \to B-A-B, \; B \to A+B+A$, $\delta = 60^\circ$ | $N = 3, \; s = 1/2$ | $D = \frac{\ln 3}{\ln 2} \approx 1.5850$ | Encaje bidimensional con área euclidiana nula en el límite. |
| **Curva del Dragón** | $\omega = F$, $F \to F+G, \; G \to F-G$, $\delta = 90^\circ$ | $N = 2, \; s = 1/\sqrt{2}$ | $D = \frac{\ln 2}{\ln \sqrt{2}} = 2.0$ | Fractal de Peano: una curva 1D continua que llena densamente el plano 2D sin auto-solaparse. |
| **Helecho de Barnsley** | Transformaciones afines estocásticas (IFS) | 4 funciones contractivas | $D \approx 1.70$ | Autosimilitud natural donde cada foliolo replica el helecho madre completo. |

---

## 9. Algoritmos de Ingeniería de Software

### A. Complejidad Asintótica y Tasa de Explosión $O(b^n)$
Si el promedio de símbolos en el sucesor de las producciones es $b$ (factor de ramificación), la longitud de la palabra generada en la generación $n$ crece a una tasa estrictamente exponencial:

$$|S_n| = |\omega| \cdot b^n$$

Esto impone dos retos:
1. **Memoria Heap:** Cadenas de texto excesivamente grandes causan recolección de basura (*Garbage Collection*) costosa en JavaScript.
2. **GPU Draw Calls:** Renderizar millones de llamadas `p.line()` en el bucle principal de un navegador satura el hilo de composición. En producción, se deben emplear técnicas de *GPU Instancing* o buffers de vértices `WebGL`.

### B. Implementación de Semántica Paralela (Double Buffering)
Para cumplir con la derivación simultánea, nunca se debe manipular el buffer de caracteres en memoria *in-place*. La implementación utiliza dos buffers alternantes:

```typescript
function expandParallel(axiom: string, rules: Record<string, string>, iterations: number): string {
  let today = axiom // S_n (Buffer de lectura)
  for (let i = 0; i < iterations; i++) {
    let tomorrow = '' // S_{n+1} (Buffer de escritura)
    for (let j = 0; j < today.length; j++) {
      const char = today[j]
      tomorrow += rules[char] ?? char // Reemplazo simultáneo
    }
    today = tomorrow // Swap de referencias
  }
  return today
}
```
Este principio de doble cuaderno garantiza que ningún símbolo generado en el turno $n+1$ sea reinterpretado prematuramente dentro del mismo ciclo temporal.
