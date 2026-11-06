# Red 6 · Red con incidencia oblicua de 12°: máximo orden y líneas en la pantalla

Origen: recuperatorio 2P 29/6/2022, ejercicio 2 (2 puntos). Verificación numérica: `Red6.py`.

## 1. Datos y qué se pide

| Dato | Valor | SI |
|---|---|---|
| Longitudes de onda | λ₁ = 595,05 nm, λ₂ = 594,95 nm | 5,9505·10⁻⁷ m; 5,9495·10⁻⁷ m |
| Ángulo de incidencia | θ_i = 12° (respecto de la normal a la red) | sen 12° = 0,2079 |
| Rendijas por cm | 400 /cm | K = 4·10⁴ m⁻¹ ⇒ d = 25 µm |
| Ancho de cada rendija | a = 6,25 µm | 6,25·10⁻⁶ m |
| Ancho iluminado | 1,25 cm | ⇒ N = 1,25 · 400 = 500 rendijas |
| Pantalla | 1,2 m de ancho, a 2 m, centrada con la red | y ∈ [−0,6 ; 0,6] m, D = 2 m |

Qué se pide:

- **a)** El máximo orden, en valor absoluto, que se puede observar en la pantalla.
- **b)** Cuántas líneas se pueden observar en total en la pantalla.

## 2. Molde en la hoja

El molde principal es el **ejercicio 20 de la hoja v6, "Red con pantalla finita y λ cercana" (1C 2026)**, junto con el **19, "¿cuántas líneas se ven?" (1C 2025)**. Se sigue el paso 5 de la "Receta doble rendija / redes":

1. N = W/d;
2. órdenes que entran por la pantalla (tg θ_max = (W/2)/D);
3. órdenes faltantes m = p·d/a;
4. resolución, con mN ≥ λ/Δλ (redondear m hacia arriba);
5. armar la tabla y sumar las líneas.

Qué cambia:

- **La incidencia es oblicua.** La condición pasa a ser d(sen θ − sen θ_i) = mλ. Es lo mismo que en el **ejercicio 16** de la hoja (doble rendija con incidencia oblicua), aplicado a una red.
- **El patrón no está centrado en la pantalla.** El orden 0 sigue derecho, a 12°, y cae en y = +42,5 cm. De un lado del orden 0 entran solo 3 órdenes; del otro, 20.
- **Los "lados" son asimétricos.** No vale "total = 2 · (un lado) + 1": hay que contar cada lado por separado, como con el detector corrido del ejercicio 21.
- **Las dos λ están muy cerca** (Δλ = 0,1 nm). Se separan recién en órdenes altos, que justamente solo existen del lado largo.

## 3. Teoría que se usa

**Ecuación de la red con incidencia oblicua.** Entre dos rendijas vecinas, el haz que llega inclinado ya trae una diferencia de camino **antes** de la red: d sen θ_i, porque un rayo llega antes que el otro. Después de la red se agrega la diferencia d sen θ hacia la dirección θ. Los dos ángulos se miden desde la normal y son positivos del mismo lado, así que la diferencia neta es d(sen θ − sen θ_i). Los máximos principales están donde esa diferencia es un número entero de λ:

**d (sen θ − sen θ_i) = m λ** ⇒ sen θ = sen θ_i + m λ/d

- m = 0 es θ = θ_i: la luz sigue derecho, sin desviarse.
- m > 0 se abre hacia el lado del haz; m < 0, hacia el otro lado.

**Órdenes faltantes.** La difracción de cada rendija usa la misma diferencia de senos:

β = (π a/λ)(sen θ − sen θ_i)

En un máximo principal, eso da β = π (a/d) m. Si m = p·d/a, β = pπ y la difracción vale cero: el orden **falta**. La incidencia oblicua **no cambia** qué órdenes faltan. Acá d/a = 25/6,25 = 4, así que faltan m = ±4, ±8, ±12, ±16, ±20.

**Pantalla finita.** La pantalla va de −0,6 a 0,6 m, a D = 2 m, así que |tg θ| ≤ 0,3. Pasado a seno, |sen θ| ≤ 0,2873. La posición de cada línea es y = D tg θ.

**Resolución (criterio de Rayleigh para redes).** Dos λ muy cercanas se ven separadas en el orden m si

λ/Δλ ≤ |m| N

La razón es que el ancho de cada línea baja con N y la separación entre las dos λ crece con m. Esto vale igual con incidencia oblicua. Si no se resuelven, las dos λ forman **una** línea; si se resuelven, **dos**. El orden 0 siempre es una sola línea, porque todas las λ caen ahí.

## 4. Resolución paso a paso

**Paso 1: datos de la red.**

- d = 1/(400 /cm) = 0,0025 cm = **25 µm**
- d/a = 25/6,25 = **4** ⇒ faltan los múltiplos de 4.
- N = 1,25 cm · 400 /cm = **500** rendijas
- λ/d = 0,595/25 = **0,0238**. Las dos λ dan lo mismo con 3 cifras: 0,023802 y 0,023798.

**Paso 2: límites de la pantalla.**

- tg θ_max = 0,6/2 = 0,3 ⇒ θ_max = 16,70° ⇒ sen θ_max = **0,2873**
- sen 12° = **0,2079**. El orden 0 cae en y = 2 · tg 12° = **42,5 cm**: está adentro, pero cerca del borde de arriba.

**Paso 3: órdenes que entran.** Se pide −0,2873 ≤ 0,2079 + 0,0238 m ≤ 0,2873.

- Lado de m > 0: m ≤ (0,2873 − 0,2079)/0,0238 = 3,34 ⇒ **m ≤ 3**. El m = +3 cae en y = 58,2 cm; el +4 caería en 63,6 cm, afuera.
- Lado de m < 0: m ≥ (−0,2873 − 0,2079)/0,0238 = −20,81 ⇒ **m ≥ −20**. El m = −20 cae en −55,7 cm; el −21 caería en −61,0 cm, afuera.

**Paso 4: a) máximo orden.**

- Geométricamente entra hasta |m| = 20, **pero m = −20 falta** (20 = 5 · 4).
- El máximo orden observable es **|m| = 19** (m = −19, en y = −50,4 cm).

**Paso 5: resolución.**

- λ/Δλ = 595,00/0,10 = **5950**
- |m| · 500 ≥ 5950 ⇒ |m| ≥ 11,9 ⇒ **|m| ≥ 12**
- El 12 falta, así que el primer orden visible resuelto es el 13.

**Paso 6: tabla de órdenes visibles** (y = D tg θ, calculado con λ₁):

| m | y (cm) | líneas |
|---|---|---|
| +3 | +58,2 | 1 |
| +2 | +52,9 | 1 |
| +1 | +47,6 | 1 |
| **0** | **+42,5** | **1** |
| −1 | +37,5 | 1 |
| −2 | +32,5 | 1 |
| −3 | +27,6 | 1 |
| −4 | (falta) | 0 |
| −5 | +17,9 | 1 |
| −6 | +13,1 | 1 |
| −7 | +8,3 | 1 |
| −8 | (falta) | 0 |
| −9 | −1,3 | 1 |
| −10 | −6,0 | 1 |
| −11 | −10,8 | 1 (11·500 = 5500 < 5950: no resuelto) |
| −12 | (falta) | 0 |
| −13 | −20,4 | 2 |
| −14 | −25,3 | 2 |
| −15 | −30,2 | 2 |
| −16 | (falta) | 0 |
| −17 | −40,1 | 2 |
| −18 | −45,2 | 2 |
| −19 | −50,4 | 2 |
| −20 | (falta) | 0 |

**Paso 7: b) total de líneas.**

- Orden 0: **1**.
- Órdenes no nulos sin resolver: −1, −2, −3, −5, −6, −7, −9, −10, −11, +1, +2, +3. Son 12 órdenes ⇒ **12 líneas**.
- Órdenes resueltos: −13, −14, −15, −17, −18, −19. Son 6 órdenes ⇒ **12 líneas**.
- **Total = 1 + 12 + 12 = 25 líneas.**

(Para tener una idea: en m = −19 las dos líneas quedan a 0,17 mm una de la otra en la pantalla, y alcanza para separarlas porque las líneas son muy finas, con N = 500. En m = −11 están a 0,09 mm y no alcanza.)

## 5. Resultados finales

- d = 25 µm, d/a = 4 (faltan los múltiplos de 4), N = 500, λ/Δλ = 5950 ⇒ se resuelven desde |m| = 12.
- Entran m = −20 … +3. El orden 0 está en y = +42,5 cm.
- **a)** Máximo orden observable: **|m| = 19**. El 20 entra en la pantalla, pero está suprimido.
- **b)** **25 líneas.** 1 del orden 0, 12 de órdenes sin resolver y 12 de los 6 órdenes resueltos (−13, −14, −15, −17, −18, −19).

## 6. Dónde es fácil equivocarse

- **Ignorar la incidencia oblicua.** Con sen θ = mλ/d el patrón sería simétrico: |m| ≤ 12, falta el 12, el máximo sería 11 y habría 19 líneas en total (ninguna resuelta). Está mal.
- **Centrar el patrón en la pantalla.** La pantalla está centrada con la **red**, es decir con la normal, no con el haz. El límite es |tg θ| ≤ 0,3 medido desde la normal, para los dos lados.
- **Contestar 20 en a).** El m = −20 cae adentro de la pantalla (−55,7 cm), pero falta porque d/a = 4.
- **Creer que la oblicua cambia los faltantes.** No los cambia: β también usa sen θ − sen θ_i.
- **Redondear 11,9 hacia abajo.** El orden tiene que **alcanzar** el poder resolvente: se redondea hacia arriba, a 12. Y el 12 falta.
- **Calcular N con el ancho de la pantalla** u otro número. Es el ancho **iluminado**: 1,25 cm · 400 /cm = 500.
- **Usar y = D sen θ.** Para los bordes conviene tg. El m = −21 cae en 61,0 cm, apenas afuera: con sen se podría confundir.
- **Calculadora en RAD para el 12°.** Ese ángulo va en DEG.
- **Contar "2 · lado + 1".** Los lados son distintos: 3 órdenes de un lado y 15 visibles del otro.

## 7. Ideas de animación

1. **El haz inclinado.** Un frente de onda que llega a la red a 12°. Dos rendijas vecinas resaltadas, con el tramo extra d sen θ_i antes de la red y d sen θ después. La ecuación d(sen θ − sen θ_i) = mλ se arma a partir de ese dibujo.
2. **Vista de arriba.** La red, la pantalla de 1,2 m a 2 m, la normal en línea punteada y el haz directo (m = 0) que sigue a 12° y pega en +42,5 cm, arriba del centro. Los órdenes se abren como un abanico:
   - hacia arriba entran solo +1, +2, +3 antes del borde;
   - hacia abajo bajan hasta el −20.
3. **Fantasmas de los faltantes.** Los órdenes −4, −8, −12, −16 y −20 aparecen como líneas punteadas tachadas. Debajo, la envolvente (sen β/β)², con sus ceros justo en esos órdenes.
4. **Zoom de resolución.** Dos lupas:
   - en m = −11, dos picos de λ₁ y λ₂ superpuestos, que forman una sola mancha;
   - en m = −13, dos picos separados.

   Una regla con mN = 5500, 6000 (falta), 6500 frente a la barra 5950.
5. **Contador.** Las líneas se encienden en la pantalla de arriba hacia abajo, con un contador que sube: 1 + 1 + 1 (+3, +2, +1), 1 (orden 0), … y las dobles de a dos, hasta llegar a 25.
6. **Comparación con incidencia normal.** El mismo abanico, simétrico y con 19 líneas, al lado del oblicuo con 25. Así se ve cómo inclinar el haz "regala" órdenes altos de un lado.
