# DR 5 · Doble rendija: d y a desde la foto; lámina que lleva el máximo 2 al 6º mínimo

Fuente: 2P del 26/6/2023, ejercicio 1. Hay una resolución de nash en `Resoluciones de alumnos/Segundos parciales 2022-2023 - resoluciones (nash).pdf`, pp. 6–7. Verificado con `DR5.py`.

## 1. Datos y qué se pide

**Datos**

| Dato | Valor | En SI |
|---|---|---|
| Láser, incidencia normal | λ = 612 nm | 6,12·10⁻⁷ m |
| Distancia rendijas–pantalla | D = 1,75 m | 1,75 m |
| Separación entre puntos brillantes (interfranja) | Δy = 1,53 mm | 1,53·10⁻³ m |
| Foto del patrón | ver abajo | — |
| Lámina delante de una rendija | e = 7 µm, índice n (incógnita) | 7·10⁻⁶ m |
| Medio | aire | n_medio = 1 |
| Intensidad de cada rendija en dirección normal | I₀ = 1 | — |

**Qué muestra la foto.** Contando desde el punto central (m = 0), a cada lado se ven los puntos 1, 2, 3, 4, 5 y 6. Después hay un hueco, y siguen el 8 y el 9. **Falta el máximo m = ±7**, a los dos lados.

**Qué se pide**

- **a)** La separación d entre rendijas y el ancho a de cada una.
- **b)** El índice n de la lámina, sabiendo que con ella el máximo de orden 2 se desplaza adonde estaba el 6º mínimo de interferencia (del mismo lado), y un esquema de dónde va la lámina.
- **c)** La intensidad en el centro de la pantalla, y dónde está ahora el máximo m = 2 (y su intensidad).
- **d)** Cuántos máximos se ven en la campana principal de difracción.

## 2. Molde en la hoja

- **Ejercicio 17 de la v6** ("Láminas en gas, luego líquido"): una lámina corre N franjas ⇒ e(n_l − n_medio) = Nλ₀. Con eso sale una incógnita, y después se calcula la intensidad en el centro con cos²γ.
- **Ejercicio 18 b)**: intensidad en un máximo corrido, usando β con a/d.
- **Receta doble rendija / redes:**
  - pasos 1 a 4;
  - las fórmulas "Franjas de Young: Δy ≈ λ₀D/(nd)" y "Campana central: 2λ/a de ancho, con 2d/a − 1 máx.";
  - la regla "Interfranja, sin cuentas": la lámina corre el patrón pero no cambia Δy.

**Qué se repite:**

- ΔCO = d sen θ − e(n − 1);
- "corrimiento de N franjas ⇔ e(n − 1) = Nλ";
- I = 4I₀ cos²γ (sen β/β)²;
- β no incluye la lámina.

**Qué cambia:**

- d y a se leen de una foto: la interfranja y el orden que falta.
- El corrimiento viene disfrazado ("el máximo 2 va al 6º mínimo"), y hay que traducirlo a 3,5 franjas.
- La incógnita es n, no e.
- Al ser semientero el corrimiento, cambia la cuenta de máximos en la campana.

## 3. Teoría que se usa

**Interferencia de Young.**

- Las dos rendijas son fuentes coherentes separadas d. Hasta un punto de la pantalla a ángulo θ, el camino desde una rendija es d sen θ más largo que desde la otra.
- **Máximo** (llegan en fase): ΔCO = mλ.
- **Mínimo** (llegan en contrafase): ΔCO = (m + ½)λ.
- En la pantalla, y = D tg θ ≈ Dθ. Con ángulos chicos, dos máximos consecutivos están separados por la **interfranja Δy = λD/d**, que no depende de m.

**Cómo se numeran los mínimos.** El 1º mínimo está en ΔCO = λ/2, el 2º en 3λ/2… El k-ésimo está en (k − ½)λ. Entonces **el 6º mínimo está en ΔCO = 5,5λ**, a 5,5 interfranjas del centro.

**Difracción de cada rendija (ancho a).**

- Cada rendija sola da una campana (sen β/β)², con β = π a sen θ/λ, que vale cero en a sen θ = pλ (p = ±1, ±2…).
- Si un cero de la campana cae justo donde había un máximo de interferencia (d sen θ = mλ y a sen θ = pλ), ese máximo **no aparece**: m = p·d/a.
- El primer orden que falta da d/a.

**Lámina delante de una rendija.**

- La luz que pasa por la lámina recorre e dentro del material en lugar de e en aire, así que su camino óptico crece en **e(n − 1)**: es "n − medio", no "n".
- Con la lámina en la rendija de arriba (lado +), en un punto a ángulo θ:

  ΔCO = d sen θ − e(n − 1)

- El orden 0 (ΔCO = 0) queda en d sen θ = e(n − 1) > 0: **todo el patrón se corre hacia el lado de la lámina**, en e(n − 1)/λ franjas, sin cambiar la interfranja.

**Intensidad.**

  I = 4I₀ cos²γ (sen β/β)²

| Factor | Fórmula | Qué es |
|---|---|---|
| γ | Δφ/2 = π·ΔCO/λ | interferencia entre las dos rendijas; usa d e **incluye la lámina** |
| β | π a sen θ/λ | difracción dentro de cada rendija; usa a y **no incluye la lámina** (la lámina retrasa por igual a toda la rendija) |

I₀ es lo que da cada rendija en la dirección normal. Por eso el máximo posible es 4I₀ = 4.

**Campana principal.**

- Es la zona |a sen θ| < λ, o sea |d sen θ| < (d/a)·λ.
- Sin lámina, entran los máximos m = −(d/a − 1)…(d/a − 1): son **2d/a − 1**, porque los de los bordes caen en los ceros y faltan.

## 4. Resolución paso a paso

**a) d y a**

1. **Interfranja:**

   Δy = λD/d ⇒ d = λD/Δy = (612·10⁻⁹ · 1,75)/(1,53·10⁻³) = 1,071·10⁻⁶/1,53·10⁻³ = **7,00·10⁻⁴ m = 0,700 mm = 700 µm**

   Ángulo de la 1ª franja: Δy/D = 8,7·10⁻⁴ rad. La aproximación de ángulos chicos es impecable.
2. **Orden que falta.** En la foto falta m = ±7 ⇒ 7 = p·d/a con p = 1 ⇒ d/a = 7 ⇒ **a = d/7 = 100 µm = 0,1 mm**.
   - Control: el 1er cero de difracción queda en y = λD/a = 10,71 mm = 7,00 interfranjas ✓.
   - ¿Por qué p = 1 y no, por ejemplo, d/a = 3,5? Con d/a = 3,5, el primer cero caería entre los máximos 3 y 4, y esos dos se verían muy débiles. En la foto se ven bien. El primer hueco es el primer cero de la campana.

**b) Índice de la lámina**

1. **Máximos con lámina.** Con la lámina en la rendija de arriba, el máximo de orden m está en d sen θ = mλ + e(n − 1). El de orden 2 queda en d sen θ = 2λ + e(n − 1).
2. **Adónde tiene que llegar.** Al lugar del 6º mínimo original, d sen θ = 5,5λ:

   2λ + e(n − 1) = 5,5λ ⇒ e(n − 1) = 3,5λ = 3,5 · 0,612 µm = 2,142 µm

   El patrón se corrió **3,5 franjas**, o sea 3,5 · 1,53 = 5,36 mm.
3. **Despeje:** n − 1 = 2,142/7 = 0,306 ⇒ **n = 1,306**.
4. **Esquema.**
   - El máximo 2 se fue **hacia afuera**, de 2 a 5,5 interfranjas. Entonces el patrón se corrió hacia ese lado, y la lámina va en la rendija de **ese mismo lado**: en la de arriba, si se mira el máximo 2 de arriba.
   - Es la única opción posible. Con la lámina en la otra rendija, el patrón se correría para el otro lado y el máximo 2 iría hacia el centro: nunca llegaría al 6º mínimo de su lado.
   - Da igual si la lámina está antes o después de la rendija.

**c) Centro y máximo m = 2**

1. **Centro (θ = 0):**
   - ΔCO = −e(n − 1) = −3,5λ ⇒ γ = π·ΔCO/λ = −3,5π ⇒ cos²γ = 0;
   - β = 0 ⇒ (sen β/β)² = 1, pero no alcanza:

   **I(centro) = 4 · 1 · 0 · 1 = 0**. En el centro ahora hay un mínimo de interferencia: oscuro.
2. **Dónde está el máximo m = 2:**

   d sen θ = 5,5λ ⇒ sen θ = 5,5 · 612·10⁻⁹ / 7·10⁻⁴ = 4,809·10⁻³
   y = D tg θ = 1,75 · 4,809·10⁻³ = **8,42·10⁻³ m = 8,42 mm** del centro, del lado de la lámina (= 5,5 · 1,53 mm)

3. **Intensidad en ese máximo.** Ahí cos²γ = 1, porque es un máximo de interferencia.

   β = π a sen θ/λ = π·(a/d)·(d sen θ/λ) = π · (1/7) · 5,5 = 5,5π/7 = 0,7857π = 2,468 rad
   sen β = 0,6235 ⇒ sen β/β = 0,2526 ⇒ (sen β/β)² = 0,0638
   **I = 4 · 1 · 1 · 0,0638 ≈ 0,255** (nash da 0,26, redondeando)

   Para comparar: sin lámina, el máximo 2 estaba en y = 3,06 mm y valía I = 4(sen(2π/7)/(2π/7))² = 3,03. Al correrse hacia el borde de la campana se apagó mucho.

Detalle fino, que no hace falta en el examen. Como la campana baja rápido ahí, el pico real de I(y) queda un poquito más cerca del centro: y ≈ 8,31 mm, con I ≈ 0,269. La cátedra toma la posición de cos²γ = 1 (8,42 mm).

**Ambigüedad del c).** "¿…y en donde se encuentra ahora el máximo m = 2?" puede leerse de dos maneras: "dónde está" (8,42 mm) o "cuál es la intensidad en donde está" (0,255). Conviene dar las dos cosas.

**d) Máximos en la campana principal**

La campana principal va de a sen θ = −λ a +λ, o sea −7λ < d sen θ < 7λ. No depende de la lámina, porque β no la incluye.

- **Sin lámina** (patrón de la foto): máximos en d sen θ = mλ con m = −6…6. Los ±7 caen en los ceros y faltan. **2d/a − 1 = 13 máximos.** Es lo que muestra la foto: 6 por lado más el central.
- **Con la lámina puesta** (la situación de b y c):
  - los máximos están en d sen θ = (m + 3,5)λ: ±0,5λ; ±1,5λ; …; ±6,5λ;
  - ninguno cae en ±7λ, así que no se suprime ninguno: **14 máximos**, 7 a cada lado del centro de la pantalla (órdenes m = −10…3);
  - los de las puntas (±6,5λ, y = ±9,95 mm) son muy débiles (I ≈ 0,023), pero están.

**Cuál es la más probable.** El ítem d) viene después de poner la lámina, y el corrimiento semientero (3,5 franjas) es justo lo que hace que la cuenta cambie de 13 a 14. Por eso lo más probable es que esperen **14**: es la respuesta de la resolución de nash. Si la pregunta apuntara al patrón original, sería 2d/a − 1 = 13. En el examen conviene escribir las dos: "sin lámina 13; con la lámina, 14, porque ningún máximo coincide con un cero de difracción".

## 5. Resultados finales

- **a)** d = 0,700 mm (700 µm); falta el orden 7 ⇒ d/a = 7 ⇒ a = 0,100 mm (100 µm).
- **b)** e(n − 1) = 3,5λ ⇒ **n ≈ 1,306**. La lámina va en la rendija del lado hacia el que se corrió el máximo 2 (el patrón se corre hacia la lámina, 3,5 franjas = 5,36 mm).
- **c)**
  - **I(centro) = 0**;
  - el máximo m = 2 está ahora a **8,42 mm** del centro, del lado de la lámina;
  - ahí I ≈ **0,255**.
- **d)** Con la lámina, **14 máximos** en la campana central. Sin lámina, 13 (2d/a − 1).

## 6. Dónde es fácil equivocarse

- **Numerar mal los mínimos.** El 6º mínimo está en 5,5λ, no en 6,5λ. Con 6,5λ sale n = 1,393, mal.
- **Contar mal los puntos de la foto.** El central es m = 0. El primer hueco es el 7º a cada lado, no el 6º ni el 8º.
- **Poner e·n en vez de e(n − 1).** La lámina reemplaza aire, así que agrega solo la diferencia.
- **Poner la lámina en la rendija equivocada.** El patrón se corre **hacia** la lámina.
- **Meter la lámina en β.** β solo depende del ángulo y de a. La lámina entra solo en γ.
- **Unidades.** 3,5 · 612 nm = 2142 nm = 2,142 µm. No mezclar nm con µm al dividir por e = 7 µm.
- **Centro con I = 4 "porque β = 0".** La campana vale 1, pero cos²γ = 0, así que I = 0.
- **I₀ = 1 es por rendija.** El máximo posible es 4, no 1 ni 2.
- **En el d), repetir 2d/a − 1 sin mirar la lámina.** Con el corrimiento semientero no se suprime ningún máximo y son 14.
- **Calculadora en grados** al calcular sen β: β = 2,468 rad.

## 7. Ideas de animación

1. **La foto con números:**
   - sobre la foto del enunciado, numerar los puntos 0, ±1…±9;
   - resaltar los huecos en ±7;
   - superponer la campana (sen β/β)², con sus ceros justo en los huecos;
   - la cuenta d/a = 7 aparece al lado.
2. **Geometría de Young:** las dos rendijas y el triangulito de la diferencia de camino d sen θ; después, la interfranja Δy = λD/d en la pantalla, con la cuenta de d.
3. **Aparece la lámina:**
   - se apoya delante de la rendija de arriba;
   - todo el patrón de franjas se desliza hacia arriba 3,5 franjas, mientras la campana de difracción queda quieta (punteada);
   - un marcador fijo en el "6º mínimo viejo" (5,5 interfranjas) muestra cómo el máximo 2 llega justo ahí;
   - en el centro queda un mínimo.
4. **Gráfico I(y) antes y después:**
   - antes, un pico central de 4 y el máximo 2 en 3,06 mm con 3,03;
   - después, un cero en el centro y el máximo 2 en 8,42 mm con 0,255, debajo de la campana.
5. **Conteo en la campana central:**
   - sin lámina, 13 máximos (los de ±7 se "apagan" contra el cero);
   - con lámina, 14 máximos en posiciones semienteras, ninguno sobre el cero;
   - los dos de las puntas, chiquitos pero presentes.
6. **Recta de "mínimos numerados"**: 1º en 0,5λ, 2º en 1,5λ… 6º en 5,5λ, para fijar la regla (k − ½)λ.
