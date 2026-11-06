# Red 3 · Luz blanca: % del detector con solapamiento (Recu 30/5/2026, ej. 6)

Verificado con `Red3.py`: cuentas por orden y, aparte, un barrido de fuerza bruta de 1,8 millones de puntos del detector, contando cuántos órdenes llegan a cada punto.

## 1. Datos y qué se pide

| Dato | Valor (SI) |
|---|---|
| Luz | blanca, 400–700 nm (convención de la cátedra), incidencia normal |
| Red | 2000 rendijas/cm ⇒ d = 1 cm/2000 = 5·10⁻⁶ m = 5 µm |
| Ancho de cada rendija | a = 1,25 µm = 1,25·10⁻⁶ m |
| Detector | W = 180 cm = 1,80 m de ancho, centrado, a D = 2 m de la red ⇒ llega hasta y = ±0,90 m |

Qué se pide: en qué porcentaje del detector hay **solapamiento**, es decir, puntos a los que llega luz de dos órdenes distintos.

## 2. Molde en la hoja (v6)

- **Ej. 22 · Luz blanca: solapamiento, parte "(Recu 30/5/26)"** es este mismo ejercicio. Repite el método: sacar d y d/a, ver qué órdenes faltan, poner el límite del detector con tg θ_max = (W/2)/D, listar sen θ = mλ/d para 400 y 700 nm en cada orden, encontrar los intervalos que se pisan y pasarlos a y = D tg θ.
  - **Lo que hay que corregir:** la hoja da ≈ 9,9 % porque solo cuenta el solapamiento del 2º con el 3º. **Se olvida el 5º orden.** Falta el 4º, pero el 5º no (5 no es múltiplo de 4), y su violeta entra en el borde del detector (sen θ = 0,40 < 0,410), encima del 3º. Con ese tramo, el resultado es **12,9 %**.
- **Ej. 19–21 (redes)** para el paso de los órdenes faltantes (m = p·d/a) y para el borde de una pantalla finita (tg θ_max = semiancho/D, como en el ej. 20).
- **Ej. 22, parte "(Recu 7/6/25)"**: la idea de que el 2º y el 3º siempre se pisan con luz blanca (2·700 = 1400 > 3·400 = 1200).

## 3. Teoría que se usa

**Red de difracción.** Con incidencia normal, los máximos principales están donde los rayos de rendijas vecinas llegan con una diferencia de camino de un número entero de λ:

  **d sen θ = m λ**, con d = 1/K (K = rendijas por unidad de largo).

- Cada λ tiene su ángulo. Con luz blanca, cada orden m ≥ 1 es un **arcoíris**: violeta (400 nm) adentro, rojo (700 nm) afuera, entre sen θ = m·0,4/d y m·0,7/d.
- El ancho angular de cada orden crece con m, así que los órdenes altos se pisan.
- El 1º y el 2º no se pisan (700 < 2·400). El 2º y el 3º sí, siempre (2·700 > 3·400).
- El orden 0 es blanco y está en el centro: no hay solapamiento.

**Órdenes faltantes.** Cada rendija tiene ancho a y difracta, con mínimos en a sen θ = pλ. Si un máximo de la red cae justo en un mínimo de difracción, desaparece: m = p·d/a.

- Si d/a es entero, la condición **no depende de λ**: falta el orden **completo**, para todos los colores.
- Acá d/a = 4 ⇒ faltan m = 4, 8, …, pero **el 5º está**.
- Es débil: su intensidad relativa es (sen β/β)² con β = 5π/4, o sea 0,032, contra 0,090 del 3º. Igual el detector lo registra.

**Detector plano.** Un punto a altura y del centro corresponde a tg θ = y/D. Con ángulos de hasta 24° **no** sirve la aproximación paraxial: hay que usar y = D tg θ.

El borde del detector da el ángulo máximo: tg θ_max = (W/2)/D.

**Porcentaje.** Se suman los largos de todas las zonas con dos órdenes, de los dos lados (el patrón es simétrico), y se dividen por W.

## 4. Resolución paso a paso

1. **Red.** d = 1/(2000 cm⁻¹) = 5·10⁻⁴ cm = **5 µm**. d/a = 5/1,25 = **4** ⇒ faltan los órdenes 4, 8, … completos.
2. **Borde del detector.** tg θ_max = 0,90/2 = 0,45 ⇒ θ_max = 24,23° ⇒ **sen θ_max = 0,4104**.
3. **Rango de cada orden** (sen θ = mλ/d, con λ/d = 0,08 para 400 nm y 0,14 para 700 nm):

| m | sen θ (400 → 700 nm) | y = D tg θ (cm) | ¿Qué pasa? |
|---|---|---|---|
| 1 | 0,08 → 0,14 | 16,05 → 28,28 | entero |
| 2 | 0,16 → 0,28 | 32,42 → 58,33 | entero |
| 3 | 0,24 → 0,42 | 49,45 → 90 | el detector lo corta en 0,4104 (λ = 684 nm) |
| 4 | 0,32 → 0,56 | — | **falta** (m = 4 = 1·d/a) |
| 5 | 0,40 → 0,70 | 87,29 → 90 | **entra**: solo 400–410 nm, hasta el borde |
| 6 | 0,48 → … | > 90 | fuera del detector |

4. **Zonas con dos órdenes (de cada lado):**
   - **2º con 3º:** sen θ de 0,24 (el 3º empieza en 3·0,08) a 0,28 (el 2º termina en 2·0,14).
     - y = 2 · tg(arcsen 0,24) = 2 · 0,2472 = 0,4945 m
     - y = 2 · tg(arcsen 0,28) = 2 · 0,2917 = 0,5833 m
     - largo: **8,89 cm**
   - **3º con 5º:** sen θ de 0,40 (el 5º empieza en 5·0,08) hasta el borde, 0,4104 (el 3º sigue hasta ahí).
     - y = 2 · tg(arcsen 0,40) = 2 · 0,4364 = 0,8729 m, hasta 0,90 m
     - largo: **2,71 cm**
   - Entre 0,28 y 0,40 solo hay luz del 3º, porque el 4º falta. Sin ese faltante, ahí también se pisarían el 3º y el 4º.
5. **Total.** Por lado: 8,89 + 2,71 = 11,60 cm. Por los dos lados: 23,20 cm.
   **Porcentaje = 23,20/180 = 12,9 %**.
   El barrido de fuerza bruta del `.py` da 12,89 % ✓.

**Ambigüedad / la respuesta de la cátedra.** El 5º orden es débil y entra apenas 2,7 cm por lado. Es probable que una corrección rápida, o la propia cátedra, lo pase por alto y espere el 9,9 % de la hoja (17,78 cm / 180 cm). Pero físicamente está:

- 5 no es múltiplo de 4, así que no falta;
- 5·400/5000 = 0,40 < 0,410, así que cae dentro del detector.

En el examen conviene dar 12,9 % y aclarar que, sin el 5º orden, sería 9,9 %. Si el enunciado hubiera querido evitar el 5º, el detector tendría que medir menos de 174,6 cm (2 · 87,29).

## 5. Resultados finales

- d = 5 µm, d/a = 4 ⇒ falta el 4º orden completo; sen θ_max = 0,410.
- Solapamientos por lado: 2º–3º de 49,45 a 58,33 cm (8,89 cm); 3º–5º de 87,29 a 90 cm (2,71 cm).
- **Solapamiento: 23,2 cm de 180 cm ≈ 12,9 %** (9,9 % si se ignora el 5º, como en la hoja v6).

## 6. Dónde es fácil equivocarse

- **d.** 2000 rendijas/cm ⇒ d = 5 µm (10⁴/2000 µm), no 5 mm ni 0,5 µm.
- **Olvidar el faltante.** Si no se saca el 4º, se pisaría con el 3º desde 0,32 y daría 34,8 %.
- **Creer que "falta el 4º" corta todo lo que sigue.** El 5º vuelve a aparecer y su violeta entra en el detector. Hay que revisar todos los m con m·0,4/d < sen θ_max: acá, hasta m = 5.
- **Aproximación paraxial.** Con y = D sen θ (o D θ) los números cambian (daría 13,3 %). Con ángulos de 14° a 24° hay que usar y = D tg θ.
- **Borde del detector.** Es tg θ_max = 0,45, no sen θ_max = 0,45.
- **Contar un solo lado.** Daría 6,4 %. El patrón es simétrico: se duplica.
- **Los extremos de la zona 2º–3º.** Empieza en el violeta del 3º (0,24) y termina en el rojo del 2º (0,28), no al revés.
- **Calculadora en DEG** para arcsen y tg, o directamente tg = s/√(1−s²).

## 7. Ideas de animación

1. **Luz blanca que se abre.** Un haz blanco llega a la red (barra con rayitas) y salen abanicos de arcoíris simétricos para m = 1, 2, 3 y 5. El abanico del 4º aparece fantasma y se tacha. Todos llegan a una barra de 180 cm a 2 m.
2. **Por qué falta el 4º.** La envolvente (sen β/β)² de una rendija con sus ceros, y los máximos de la red como palitos debajo. El 4º palito cae justo en el primer cero, se apaga, y pasa lo mismo para cada color.
3. **El detector "desplegado".** Una regla horizontal de −90 a +90 cm con las bandas de colores: 1º de 16 a 28; 2º de 32 a 58; 3º de 49 a 90, cortado; 5º de 87 a 90. Las bandas se van apilando y donde hay dos se rayan: 49,45–58,33 y 87,29–90.
4. **Zoom en el borde.** El violeta del 5º "asoma" en los últimos 2,7 cm y se superpone al rojo-naranja del 3º. Cartel: "¡no te olvides del 5º!".
5. **Barra de porcentaje.** Una barra de 180 cm donde se llenan 2 × (8,89 + 2,71) = 23,2 cm ⇒ 12,9 %. Comparación con 9,9 % sin el 5º.
6. **Cuentas en línea.** sen θ → tg θ → y para 0,24, 0,28 y 0,40, en una tablita que se va completando.
