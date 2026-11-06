# Red 2 · Espectro continuo de 400 a 1500 nm: máximo orden completo y % de solapamiento

Origen: recuperatorio 1/11/2025, ejercicio 5 (2,5 puntos). Verificación numérica: `Red2.py`.

> Un haz de luz de espectro continuo en el rango [~~450~~ **400** nm; 1500 nm] (contiene todas las longitudes de onda del intervalo) incide normalmente sobre una red de difracción de 2000 rendijas por cm, cada una de ancho a = 2,5 µm. Se registra el espectro en un detector de 50 cm de ancho, ubicado a 50 cm de la red y centrado con la misma, sensible a todas las longitudes de onda del espectro de trabajo.
> a) ¿Cuál es el máximo orden en el que se detecta el espectro completo de la luz transmitida?
> b) Determine en qué porcentaje del detector se registra solapamiento.
>
> En el enunciado impreso dice 450 nm; alguien lo corrigió a mano a 400 nm. El catálogo lo toma como 400–1500 nm. Abajo se resuelve con 400 nm y al final se muestra qué cambia con 450 nm.

---

## 1. Datos y qué se pide

**Datos (en SI)**

| Dato | Valor |
|---|---|
| Espectro | λ ∈ [400 nm; 1500 nm] = [4·10⁻⁷ m; 1,5·10⁻⁶ m], continuo, incidencia normal |
| Red | 2000 rendijas/cm ⇒ **d = 1/2000 cm = 5·10⁻⁴ cm = 5·10⁻⁶ m = 5 µm** |
| Ancho de cada rendija | a = 2,5 µm = 2,5·10⁻⁶ m ⇒ **d/a = 2** |
| Detector | ancho W = 50 cm = 0,5 m; distancia D = 50 cm = 0,5 m; centrado ⇒ cubre y ∈ [−0,25 m; +0,25 m] |

**Qué se pide**
- **a)** El orden m más alto cuyo espectro **entero** (de 400 a 1500 nm) cae en el detector.
- **b)** El porcentaje del ancho del detector en el que se superponen dos órdenes distintos.

## 2. Molde en la hoja (v6)

**Ejercicio más parecido:** el **22, "Luz blanca: solapamiento"**, segunda parte (recuperatorio 30/5/26), junto con el paso 5 de la **Receta doble rendija / redes**. Aquel caso tenía 2000 rendijas/cm, a = 1,25 µm y un detector de 180 cm a 2 m, y daba 9,9 %.

**Qué se repite**
- d a partir de las rendijas por cm.
- Órdenes que faltan: m = p·d/a.
- La banda de cada orden en sen θ = mλ/d.
- Borde del detector: tg θ_max = (W/2)/D.
- Intervalos de solapamiento, pasados a y = D tg θ.
- Porcentaje = 2·(suma de anchos de un lado)/W.

**Qué cambia**
- El rango llega a **1500 nm** (no 400–700): cada banda es 3,75 veces más larga en sen θ y se pisan órdenes lejanos.
- **d/a = 2:** faltan **todos los órdenes pares**, no solo el 4º. Por eso se solapan el 1 con el 3 y el 3 con el 5, no órdenes vecinos.
- El detector está **cerca** (D = W): los ángulos llegan a 26,6° y la aproximación paraxial no sirve.
- Hay un ítem a) nuevo: el máximo orden completo.

## 3. Teoría que se usa

**Máximos principales de una red:** d sen θ = mλ. Es la condición para que la luz de **todas** las rendijas llegue en fase: entre vecinas, la diferencia de camino es un número entero de λ.
- Con un espectro continuo, cada orden m ≠ 0 es una **banda** (un "arcoíris") que va de sen θ = mλ_min/d a sen θ = mλ_max/d.
- El orden 0 junta todas las λ en θ = 0, sin dispersión.

**Órdenes que faltan.**
- Si el máximo principal de orden m cae donde cada rendija tiene un cero de difracción (a sen θ = pλ), ese máximo no aparece.
- Igualando, queda **m = p·d/a**, que **no depende de λ**: para d/a = 2 faltan m = 2, 4, 6… para **todas** las longitudes de onda a la vez.
- O sea, desaparece la banda entera de cada orden par.

**Solapamiento.** El orden m y el orden m' > m se pisan si el final de uno pasa el comienzo del otro: m·λ_max > m'·λ_min. La zona pisada va de m'λ_min/d hasta el menor de mλ_max/d y el borde del detector.

**Posición en el detector.** El detector es plano, perpendicular al eje y a distancia D, así que **y = D tg θ** (exacta).
- La versión paraxial, y ≈ D sen θ, vale solo para ángulos chicos.
- Para pasar de sen θ a y: tg θ = sen θ/√(1 − sen²θ).

**Espectro completo de un orden.** Todo el intervalo [mλ_min/d; mλ_max/d] tiene que caer dentro del detector, y el orden no tiene que faltar.

## 4. Resolución paso a paso

### Paso 1. Datos de la red
- d = 1/2000 cm = 5 µm.
- d/a = 5/2,5 = 2: **faltan los órdenes 2, 4, 6…**
- λ/d va de 0,4/5 = **0,08** a 1,5/5 = **0,30**.

### Paso 2. Borde del detector

  tg θ_max = 0,25/0,5 = 0,5  ⇒  θ_max = 26,57°  ⇒  **sen θ_max = 0,4472**

### Paso 3. Banda de cada orden (sen θ = mλ/d)

| m | sen θ (400 → 1500 nm) | ¿En el detector? | y (cm) |
|---|---|---|---|
| 1 | 0,08 → 0,30 | **completo** | 4,01 → 15,72 |
| 2 | 0,16 → 0,60 | **falta** (m = 1·d/a) | — |
| 3 | 0,24 → 0,90 | cortado en 0,4472: llega solo hasta λ = 0,4472·5/3 µm = **745,4 nm** | 12,36 → 25,00 |
| 4 | 0,32 → 1,20 | **falta** (m = 2·d/a) | — |
| 5 | 0,40 → 1,50 | cortado: llega solo hasta λ = 0,4472·5/5 µm = **447,2 nm** | 21,82 → 25,00 |
| 6 | — | falta | — |
| 7 | 0,56 → … | empieza afuera (0,56 > 0,447) | — |

### Paso 4. a) Máximo orden completo
- El orden 1 entra entero: de 4,01 cm a 15,72 cm de cada lado.
- El 2 falta; aunque no faltara, se cortaría en λ = 0,4472·5/2 µm = 1118 nm.
- El 3 se corta en 745 nm.

**a) m = 1.**

### Paso 5. b) Zonas de solapamiento (de un lado; del otro es simétrico)
**Órdenes 1 y 3:** sen θ ∈ [0,24; 0,30].
- y = 0,5·0,24/√(1 − 0,24²) = 0,5·0,24723 = **12,36 cm**.
- y = 0,5·0,30/√(1 − 0,30²) = 0,5·0,31449 = **15,72 cm**.
- Ancho: **3,363 cm**.
- Ahí llegan a la vez λ de 1200 a 1500 nm (orden 1) y de 400 a 500 nm (orden 3).

**Órdenes 3 y 5:** sen θ ∈ [0,40; 0,4472].
- y = 0,5·0,40/√(1 − 0,40²) = 0,5·0,43644 = **21,82 cm**, hasta el borde, **25,00 cm**.
- Ancho: **3,178 cm**.
- Ahí llegan λ de 666,7 a 745,4 nm (orden 3) y de 400 a 447,2 nm (orden 5).

**Órdenes 1 y 5:** no se tocan (0,30 < 0,40).

**Total**
- Un lado: 3,363 + 3,178 = **6,541 cm**.
- Los dos lados: 13,08 cm.

  **b) 13,08/50 = 26,2 %** del detector registra solapamiento.

### Paso 6. Qué cambia si el rango empieza en 450 nm (enunciado impreso)
- λ/d va de 0,09 a 0,30.
- **a) no cambia:** el orden 1, [0,09; 0,30], entra completo, y el 3 se sigue cortando en 745 nm. **m = 1.**
- **Solapamiento 1–3:** sen θ ∈ [0,27; 0,30], o sea y de 14,02 a 15,72 cm: 1,704 cm por lado.
- **El orden 5 no llega al detector:** empezaría en sen θ = 5·0,45/5 = 0,45 > 0,4472, es decir en y = 25,20 cm, apenas 2 mm afuera del borde. Desaparece el solapamiento 3–5.
- **b) con 450 nm: 2·1,704/50 = 6,8 %**, en vez de 26,2 %.

## 5. Resultados finales

- d = 5 µm; d/a = 2, así que faltan todos los órdenes pares.
- **a) El máximo orden con el espectro completo es m = 1** (con 400 o con 450 nm).
- **b) Solapamiento: 26,2 % del detector** con 400 nm. Son 13,1 cm: en cada lado, 12,36–15,72 cm (órdenes 1 y 3) y 21,82–25 cm (órdenes 3 y 5).
- Con 450 nm: **6,8 %**, solo la zona 1–3 (14,02–15,72 cm por lado), porque el orden 5 queda afuera del detector.

## 6. Dónde es fácil equivocarse

- **No ver que faltan los pares.** Si se cuentan el 2 y el 4, todo el detector desde sen θ = 0,16 (y = 8,1 cm) hasta el borde parece solapado, y sale **67,6 %**. Siempre calcular d/a primero.
- **Usar la aproximación paraxial.** Con y = D·mλ/d y el borde en 0,5, sale **32 %**; con el borde bien puesto en 0,447, **21,4 %**.
  - Con un detector tan cerca (θ hasta 26,6°) hay que usar y = D tg θ.
  - Lo mismo hizo la cátedra en el recuperatorio del 30/5/26.
- **Calcular mal d.** 2000 rendijas por **cm** dan d = 10⁻²/2000 m = 5 µm (no 0,5 µm ni 2000 µm).
- **Usar 400–700 nm por costumbre.** El enunciado da otro rango (hasta 1500 nm, infrarrojo).
- **Olvidarse del orden 5.** Es un orden alto, pero su comienzo (400–447 nm) entra en el borde y se pisa con el 3.
- **Contar un solo lado.** Da 13,1 % en vez de 26,2 %: el detector está centrado y el patrón es simétrico.
- **Creer que el orden 3 está completo porque empieza adentro.** Se corta en 745 nm.
- **Dividir por la mitad del detector.** El porcentaje es sobre el ancho total, 50 cm, sumando los dos lados.

## 7. Ideas de animación

1. **Eje de sen θ de 0 a 1.**
   - Dibujar una banda por orden, con un degradé que va de violeta (400 nm) a rojo (700 nm) y sigue en gris oscuro para el infrarrojo (hasta 1500 nm), en filas separadas: m = 1, 2, 3, 4, 5.
   - Tachar las bandas 2 y 4 con una cruz y el cartel "m = p·d/a".
   - Una línea vertical marca el borde del detector en 0,447.
2. **Superponer las bandas en una sola fila** (lo que ve el detector).
   - Sombrear las zonas donde caen dos bandas: [0,24; 0,30] y [0,40; 0,447].
   - Etiquetar qué λ llegan ahí: "1200–1500 nm del orden 1 + 400–500 nm del orden 3".
3. **Pasar de sen θ a y.**
   - Animar el "estiramiento" no lineal y = D tg θ (los tramos lejanos se alargan).
   - Mostrar las cotas en cm (12,36; 15,72; 21,82; 25) y la suma: 13,08/50 = 26,2 %.
4. **Por qué falta el orden 2.** Graficar la envolvente (sen β/β)² sobre los peines de la red: el cero de la envolvente cae justo en m = 2 para cada color.
5. **Botón 400 ↔ 450 nm.** La banda del orden 5 se corre hacia afuera y sale del detector por 2 mm, y el porcentaje baja de 26,2 % a 6,8 %.
