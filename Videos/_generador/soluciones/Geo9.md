# Geo 9 · Telescopio con lente y espejo

Origen: recuperatorio (parcial único) 7/6/2025, ejercicio 4. Números verificados con `Geo9.py`. Coinciden con la versión anterior de la hoja v7 (commit `5690a67~1`) y con el cuadernillo de parciales resueltos.

## 1. Datos y qué se pide

**Datos (SI)**

| Magnitud | Valor |
|---|---|
| largo del telescopio (lente–espejo) | L = 5 m |
| lente | biconvexa convergente, f' = 8 m, n = 1,5, caras de igual radio en módulo (simétrica) |
| espejo | esférico, de radio R, en el otro extremo |
| objeto | estrellas, en el infinito |
| imagen | la luz pasa por la lente, se refleja en el espejo y forma una **imagen real** a d = \|R\|/4 (del espejo) |

**Qué se pide**

- a) R, y si el espejo es cóncavo o convexo.
- b) Se cambia la lente por otra con las mismas caras (mismo radio) e índice n'. ¿Cuánto vale n' para que los haces **emerjan paralelos del espejo**?

## 2. Molde en la hoja (v6)

**Ej. 11 (lente + espejo, haces salen paralelos, 1C 2026)** y su nota del 1C 2025.

**Qué se repite:**

- Se encadena lente → espejo con s₂ = s₁' − D.
- Se prueban cóncavo y convexo (receta 5).
- "Paralelos ⇒ objeto en el foco" (receta 4).
- Un objeto detrás del espejo es virtual (receta 3).

**Qué cambia:**

1. El objeto está en el infinito, así que la lente forma la imagen en su foco (receta 11).
2. Esa imagen cae **detrás del espejo**: el espejo recibe un objeto virtual.
3. La luz no vuelve a pasar por la lente.
4. En b) la incógnita es el **índice** de la lente, y hay que usar el fabricante como en el ej. 13.
5. El dato "d = |R|/4" deja R como incógnita a ambos lados de la ecuación.

## 3. Teoría que se usa

**Lente delgada:** 1/s' − 1/s = 1/f', con objeto en el infinito (s = −∞) ⇒ s' = f'. La luz de una estrella llega en rayos paralelos y se junta en el foco imagen.

**Fabricante (en aire):** 1/f' = (n − 1)(1/R₁ − 1/R₂).

- En una biconvexa simétrica, la primera cara tiene el centro hacia adelante (R₁ = +r) y la segunda hacia atrás (R₂ = −r).
- Queda **1/f' = (n − 1)·2/r**.
- "Las mismas caras" quiere decir el mismo r. Con otro n, la focal cambia.

**Espejo (convención de la cátedra):** 1/s' + 1/s = 2/R.

- El sentido positivo es el de la luz que **llega** al espejo: "+" es detrás del espejo.
- **Cóncavo: R < 0**, con el centro del lado de donde viene la luz. **Convexo: R > 0**.
- El foco está en s = R/2.
- **Imagen real ⇒ s' < 0**: se forma delante del espejo, donde va la luz reflejada.
- **Objeto virtual ⇒ s > 0**: la luz llega convergiendo hacia un punto detrás del espejo.

**¿Un espejo convexo puede dar una imagen real?**

- Con un objeto real, nunca.
- Con un objeto virtual ubicado entre el espejo y su foco (0 < s < R/2), sí: 1/s' = 2/R − 1/s < 0.
- La cátedra pregunta justamente esto en los finales del 12/2/2019 y del 11/12/2023: telescopio con lente y espejo **convexo**, "¿es posible una imagen real?".

**Haces paralelos a la salida:** s' = ∞ ⇒ 1/s = 2/R ⇒ **s = R/2**. El objeto del espejo tiene que estar en su foco.

## 4. Resolución paso a paso

### a)

**Paso 1: radio de las caras de la lente.** 1/8 = (1,5 − 1)·(1/r + 1/r) = 0,5·2/r = 1/r ⇒ **r = 8 m**.

**Paso 2: imagen de la lente.** Estrellas ⇒ s₁' = f' = **8 m**.

**Paso 3: objeto del espejo.** El espejo está a 5 m: s_e = s₁' − L = 8 − 5 = **+3 m**. Es un objeto virtual: la luz converge hacia un punto 3 m detrás del espejo.

**Paso 4: imagen real a |R|/4.** Se plantea s' = −|R|/4:

  −4/|R| + 1/3 = 2/R

No se sabe el signo de R, así que **se prueban los dos**:

- **Cóncavo (R = −|R|):**
  - −4/|R| + 1/3 = −2/|R| ⇒ 1/3 = 2/|R| ⇒ |R| = 6 m ⇒ **R = −6 m**.
  - Chequeo: 1/s' = 2/(−6) − 1/3 = −2/3 ⇒ s' = −1,5 m = −6/4 ✓.
  - La imagen queda 1,5 m delante del espejo, a 3,5 m de la lente.
- **Convexo (R = +|R|):**
  - −4/|R| + 1/3 = +2/|R| ⇒ 1/3 = 6/|R| ⇒ **R = +18 m**.
  - Chequeo: 1/s' = 2/18 − 1/3 = −2/9 ⇒ s' = −4,5 m = −18/4 ✓.
  - El objeto (s = 3 m) está entre el espejo y su foco (9 m), así que da una imagen real. Queda 4,5 m delante del espejo, a 0,5 m de la lente.

**Las dos soluciones son válidas:** en los dos casos la imagen es real y cae dentro del tubo, antes de volver a la lente.

### b)

**Paso 5: condición de salida paralela.** El objeto del espejo tiene que estar en su foco, s_e = R/2. Como el espejo está a 5 m de la lente, la nueva lente tiene que formar su imagen a f'' = 5 + R/2.

- **Cóncavo (R = −6 m):** s_e = −3 m, un objeto real 3 m delante del espejo, o sea a 2 m de la lente ⇒ **f'' = 2 m**.
- **Convexo (R = +18 m):** s_e = +9 m, un objeto virtual 9 m detrás del espejo, o sea a 14 m de la lente ⇒ **f'' = 14 m**.

**Paso 6: índice.** Las caras son las mismas (r = 8 m) ⇒ 1/f'' = (n' − 1)·2/8 = (n' − 1)/4 ⇒ n' = 1 + 4/f''.

- **Cóncavo:** n' = 1 + 4/2 = **3**.
- **Convexo:** n' = 1 + 4/14 = 9/7 ≈ **1,29**.

**Chequeo:** con s = −3 (cóncavo) o s = +9 (convexo), el espejo da s' = ∞ ✓.

### Ambigüedades y cuál es la más probable

1. **¿Cóncavo o convexo?** El enunciado admite las dos soluciones; en el examen conviene presentar ambas. Si hubiera que elegir una, la más probable es la **convexa (R = +18 m, n' ≈ 1,29)**, por dos motivos:
   - la cátedra tomó este mismo telescopio con espejo convexo en dos finales (12/2/2019 y 11/12/2023), justamente para preguntar si un convexo puede dar una imagen real;
   - n' = 3 es un índice irreal para una lente común: el vidrio va de 1,5 a 1,9 y el diamante tiene 2,42.

   Es una conjetura. Lo seguro es mostrar las dos, sin descartar ninguna.
2. **¿d se mide desde el espejo o desde la lente?** Desde el espejo, que es el que forma la imagen. Si se midiera desde la lente (s' = −(5 − |R|/4)):
   - cóncavo: |R|² − 2|R| − 120 = 0 ⇒ R = −12 m;
   - convexo: no tiene solución;
   - pero entonces en b) la lente tendría que tener f'' = −1 m, y con caras biconvexas eso da n' = −3, que es imposible.

   Esta lectura queda descartada.

## 5. Resultados finales

- Lente: r = 8 m; imagen de las estrellas a 8 m, o sea 3 m detrás del espejo (objeto virtual, s = +3 m).
- **a)** **R = −6 m (cóncavo)**, con la imagen 1,5 m delante del espejo, **o R = +18 m (convexo)**, con la imagen 4,5 m delante del espejo. Las dos son válidas.
- **b)** Cóncavo: f'' = 2 m ⇒ **n' = 3**. Convexo: f'' = 14 m ⇒ **n' = 9/7 ≈ 1,29**.
- Más probable según la cátedra: **convexo, R = +18 m, n' ≈ 1,29**, pero en el examen conviene presentar ambas.

## 6. Dónde es fácil equivocarse

- **s_e = −3:** el foco de la lente está 3 m **detrás** del espejo, así que el objeto es virtual y s_e = +3.
- **s' = +|R|/4 para la imagen real.** Con esta convención, la imagen real de un espejo tiene s' < 0.
- **Descartar el convexo porque "los convexos siempre dan imágenes virtuales".** Eso vale solo para objetos reales.
- **Resolver un solo caso.** La ecuación tiene R a los dos lados, así que hay que probar los dos signos (receta 5).
- **Radios de la biconvexa:** R₂ = −r. Si se escribe (1/r − 1/r) da 0.
- **En b), usar la misma f'** en lugar del mismo r: lo que se conserva son las caras, no la focal.
- **En b) cóncavo, ubicar mal el foco del espejo.** Está 3 m delante del espejo, o sea a 2 m de la lente: f'' = 2 m, no 3 m ni 8 m.

## 7. Ideas de animación

1. **El tubo.** El telescopio en vertical, como en la figura: la lente arriba y el espejo abajo. Bajan rayos paralelos de una estrella.
2. **Foco fantasma.** Los rayos convergen hacia F' a 8 m, pero el tubo mide 5 m: el punto de convergencia queda 3 m "debajo" del espejo, marcado en gris punteado como "objeto virtual, s = +3 m".
3. **Dos espejos lado a lado.** Pantalla partida:
   - a la izquierda, un espejo cóncavo (R = −6 m), con la imagen real a 1,5 m;
   - a la derecha, uno convexo (R = +18 m), con la imagen real a 4,5 m;
   - en cada uno, una regla con |R|/4 que coincide con la distancia de la imagen.
4. **El convexo que "no debería" dar imágenes reales.** Se resalta la zona entre el vértice y el foco (9 m detrás del espejo) y se ve que el objeto virtual (3 m) cae ahí.
5. **b) Cambio de lente.** La lente cambia de color mientras varía n'. Su foco sube hasta 2 m (cóncavo: los rayos se cruzan en el foco del espejo y vuelven paralelos) o baja hasta 14 m (convexo: convergen hacia un punto 9 m detrás del espejo y salen paralelos).
6. **Escala de índices.** Agua 1,33 · vidrio 1,5 · flint 1,9 · diamante 2,42, y n' = 3 fuera de la escala con un "¿?", al lado de n' = 1,29, que está entre el agua y el vidrio.
