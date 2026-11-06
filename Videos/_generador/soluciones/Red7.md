# Red 7 · Alambre y láser (principio de Babinet)

Origen: recuperatorio 2P 21/11/2023, ejercicio 3. Números verificados con `Red7.py`.

## 1. Datos y qué se pide

**Datos (SI)**

| Magnitud | Valor |
|---|---|
| láser de He-Ne | λ₀ = 632,8 nm = 6,328·10⁻⁷ m (en aire, n = 1) |
| distancia alambre–pantalla | L = 2,65 m (pantalla centrada respecto del alambre) |
| diámetro del alambre | D = (0,127 ± 0,005) mm ⇒ D entre 0,122 mm = 1,22·10⁻⁴ m y 0,132 mm = 1,32·10⁻⁴ m |
| qué se mide | s = separación en la pantalla entre los dos **mínimos de orden 10**, uno a cada lado del máximo central (p = ±10) |

**Qué se pide:** el intervalo en el que tiene que estar s para que el diámetro esté dentro de la tolerancia.

## 2. Molde en la hoja (v6)

**Ej. 23, "Babinet" (Recu 30/5/26):** un hilo de 30 µm se trata como una rendija de 30 µm. Los mínimos están en a·senθ_p = pλ y la posición en la pantalla es y_p = f·tgθ_p.

**Qué se repite:** la equivalencia hilo ↔ rendija, la condición de mínimo y el paso de ángulo a posición en la pantalla.

**Qué cambia:**

1. No hay lente: la pantalla está a una distancia L, así que y = L·tgθ.
2. Se mide la distancia **entre** los dos mínimos de orden 10: s = 2y₁₀.
3. El diámetro viene con una tolerancia y hay que **propagarla**. Como s es inversamente proporcional a D, el D más chico da el s más grande.

## 3. Teoría que se usa

**Difracción por una rendija de ancho a:** I(θ) = I₀ (senβ/β)², con β = (πa/λ)·senθ.

- La intensidad se anula cuando β = pπ (p = ±1, ±2, …; p = 0 es el máximo central), o sea, en **a·senθ_p = pλ**.
- Idea física: si se parte la rendija en 2p franjas iguales, cada franja tiene otra vecina cuyos rayos llegan con λ/2 de diferencia de camino, y se anulan de a pares.
- Esto **no** es la doble rendija: ahí d·senθ = mλ da máximos. Acá hay una sola abertura y la fórmula da mínimos.

**Principio de Babinet.** Dos pantallas complementarias, una rendija de ancho D y un alambre opaco de ancho D, cumplen E_rendija + E_alambre = E_sin obstáculo.

- Sin obstáculo, el haz del láser llega solo al centro de la pantalla. Fuera de esa zona E_sin obstáculo = 0 ⇒ E_alambre = −E_rendija ⇒ **las intensidades son iguales**.
- El alambre produce el mismo patrón que una rendija de su mismo ancho, salvo en el centro mismo, donde además llega el haz directo.
- Por eso, con un láser y una pantalla, se puede medir el diámetro de un alambre que no se ve a simple vista.

**De ángulo a pantalla:** y = L·tgθ.

- Con ángulos chicos: tgθ ≈ senθ ≈ θ ⇒ y_p ≈ L·pλ/D, y los mínimos quedan casi equiespaciados, separados Lλ/D.
- Acá θ ≈ 3°, así que la aproximación anda muy bien (la diferencia es de unas décimas de mm), pero se puede hacer exacto con arcsen y tg.
- El patrón es simétrico: el mínimo p = −10 está a −y₁₀, así que **s = 2·y₁₀**.

## 4. Resolución paso a paso

**Paso 1: condición del mínimo de orden 10.**

  senθ₁₀ = 10·λ/D, con 10λ = 6,328·10⁻⁶ m = 6,328 µm

**Paso 2: D mínimo = 0,122 mm = 122 µm.**

- senθ₁₀ = 6,328/122 = 0,05187 ⇒ θ₁₀ = 2,973° ⇒ tgθ₁₀ = 0,05194.
- y₁₀ = 2,65 · 0,05194 = 0,13764 m ⇒ **s = 2y₁₀ = 0,2753 m = 27,53 cm**.

**Paso 3: D máximo = 0,132 mm = 132 µm.**

- senθ₁₀ = 6,328/132 = 0,04794 ⇒ θ₁₀ = 2,748° ⇒ tgθ₁₀ = 0,04799.
- y₁₀ = 2,65 · 0,04799 = 0,12719 m ⇒ **s = 0,2544 m = 25,44 cm**.

**Paso 4 (referencia): D nominal = 0,127 mm.** senθ₁₀ = 0,04983 ⇒ y₁₀ = 13,22 cm ⇒ s = 26,44 cm.

**Paso 5: intervalo.** s es decreciente con D (s ≈ 2L·10λ/D), así que los extremos se cruzan:

  **25,4 cm ≤ s ≤ 27,5 cm**, más precisamente 0,2544 m ≤ s ≤ 0,2753 m (ancho del intervalo ≈ 2,1 cm)

**Con ángulos chicos:** s ≈ 2·2,65·6,328·10⁻⁶/D = 3,354·10⁻⁵ m²/D ⇒ 25,41 cm y 27,49 cm. La diferencia con el cálculo exacto es menor que 0,4 mm, así que cualquiera de los dos se acepta.

**Chequeo numérico (en el .py):** se busca el 10º cero de (senβ/β)² sobre la pantalla y se obtienen las mismas posiciones (13,764 cm y 12,719 cm). El primer mínimo queda a ±1,32 cm para D nominal.

**Ambigüedades:**

- "Mínimos de décimo orden a cada lado" son p = +10 y p = −10, así que s es la distancia **entre** ellos.
- Si alguien da s como la distancia del centro a uno solo, obtiene la mitad (12,7–13,8 cm), pero el enunciado dice explícitamente "entre los dos mínimos".

## 5. Resultados finales

- Mínimos del alambre (Babinet, como una rendija de ancho D): D·senθ_p = pλ, con y_p = L·tgθ_p.
- D = 0,122 mm ⇒ s = 27,53 cm; D = 0,127 mm ⇒ s = 26,44 cm; D = 0,132 mm ⇒ s = 25,44 cm.
- **s tiene que estar entre 25,4 cm y 27,5 cm.** Si s es mayor, el alambre es demasiado fino; si es menor, demasiado grueso.

## 6. Dónde es fácil equivocarse

- **Usar la fórmula de la doble rendija o de la red** (d·senθ = mλ para máximos), o (m + ½)λ: con una sola abertura, a·senθ = pλ da **mínimos**.
- **Pensar que el alambre da el patrón "al revés"**, con oscuridad donde la rendija tiene luz. Babinet dice que el patrón es el mismo, salvo en el centro.
- **Usar 1,22λ/D:** eso es para aberturas circulares (Rayleigh). Un alambre es una "rendija".
- **Tomar s = y₁₀** en lugar de 2y₁₀.
- **Unidades:** nm y mm. 632,8 nm/0,122 mm = 632,8·10⁻⁹/1,22·10⁻⁴, o bien 0,6328 µm/122 µm.
- **Emparejar mal los extremos:** el D mínimo da el s **máximo**.
- **Calculadora:** si se hace arcsen y tg, cuidado con DEG y RAD. Más simple: tg = sen/√(1 − sen²).

## 7. Ideas de animación

1. **La máquina.** El alambre sale de la máquina, el láser lo ilumina de abajo y en la pantalla aparece el patrón: una mancha central y franjas oscuras equiespaciadas.
2. **Babinet en un truco.** El alambre se "invierte" en una rendija del mismo ancho (negativo ↔ positivo) y el patrón en la pantalla no cambia. Se muestra la suma de campos rendija + alambre = haz libre, que solo pega en el centro.
3. **Numerar los mínimos.** Se etiquetan p = ±1, ±2, …, ±10 sobre la pantalla y una llave marca s entre −10 y +10.
4. **Triángulo.** Desde el alambre hasta el mínimo 10: ángulo θ₁₀ ≈ 2,9°, cateto L = 2,65 m y cateto y₁₀ ≈ 13 cm, con la cuenta y = L·tgθ.
5. **Control de calidad.** Un deslizador de D de 0,122 a 0,132 mm: el patrón se comprime al engrosar el alambre y s baja de 27,5 a 25,4 cm. A la derecha, un gráfico s(D) (casi una hipérbola) con la banda de tolerancia proyectada sobre el eje s: semáforo verde dentro del intervalo y rojo fuera.
