# DR 6 · Tres rendijas en un líquido, la central tapada, dos láminas; luego se destapa

Origen: recuperatorio 2P 21/11/2023, ejercicio 1 (2,5 puntos). Verificación numérica: `DR6.py`.

## 1. Datos y qué se pide

| Dato | Valor | SI |
|---|---|---|
| Índice del líquido | n = 1,32 | — |
| Número de rendijas | 3 | — |
| Ancho de cada rendija | a = 2 µm | 2·10⁻⁶ m |
| Separación entre rendijas vecinas | d = 8 µm | 8·10⁻⁶ m |
| Longitud de onda en vacío | λ₀ = 600 nm = 0,6 µm | 6·10⁻⁷ m |
| Incidencia | normal | θ_i = 0 |
| Lámina 1 | e₁ = 4 µm, n₁ = 1,5 | 4·10⁻⁶ m |
| Lámina 2 | e₂ = ?, n₂ = 1,2 | — |
| Pantalla | 30 cm de ancho, a 65 cm, centrada con la rendija tapada | W = 0,30 m, D = 0,65 m |

La rendija central está tapada. Con la lámina 1 frente a una rendija y después la lámina 2, el orden 0 queda en el centro de la pantalla.

Qué se pide:

- **a)** El espesor e₂ de la segunda lámina.
- **b)** Se sacan las dos láminas y se destapa la rendija central: ¿cuántos mínimos de intensidad se registran en la pantalla?

Conviene trabajar en µm: en ΔCO/λ₀ las unidades se cancelan.

## 2. Molde en la hoja

Para a), el molde es el **ejercicio 17 de la hoja v6, "Láminas en gas, luego líquido" (1C 2026)**. Qué se repite:

- cada lámina suma e(n_l − n_medio), con el n del medio, no 1;
- una lámina con n_l < n_medio **resta** camino;
- por eso, para compensar, tiene que ir en la **misma** rendija. La hoja lo dice: "Para que b) tenga solución va en la misma rendija".

Del **ejercicio 16** (vidrio + acrílico) se repite que el orden 0 está donde ΔCO = 0.

Para b), la referencia es la **nota "Rendijas tapadas" de la "Receta doble rendija / redes"**: "las abiertas forman una red con otro d y otro N". También la fórmula de la red, I = I₀(sen Nγ/sen γ)²(senβ/β)². (La v7 tiene el ejercicio completo de N rendijas: 19, Recu 30/5/26.)

Qué cambia:

- Acá el medio es un **líquido** (n = 1,32), no aire ni un gas: todos los "n − 1" pasan a ser "n_l − 1,32".
- Con la central tapada, las abiertas son las de los **extremos**: una doble rendija de separación **2d = 16 µm**.
- En b) se cuentan **mínimos** de un patrón de **N = 3** en una pantalla finita, chequeando dónde cae el primer mínimo de difracción.

## 3. Teoría que se usa

**Camino óptico.** La fase que acumula la luz depende del camino óptico CO = n·(longitud). La diferencia entre los dos haces tiene dos partes:

ΔCO = n·d_ab·sen θ (parte geométrica) + Σ e(n_l − n) (láminas)

- **Por qué e(n_l − n).** La lámina **reemplaza** un espesor e de líquido. Antes había un camino óptico n·e y ahora hay n_l·e: la diferencia es e(n_l − n).
- Si n_l > n, la lámina **atrasa** ese haz y el orden 0 se corre hacia el lado de la lámina.
- Si n_l < n, lo **adelanta**: es camino negativo.

**Orden 0.** Es donde ΔCO = 0. El centro de la pantalla está alineado con la rendija tapada, que es el punto medio entre las dos abiertas. Ahí θ = 0, así que la parte geométrica es nula: **las láminas tienen que compensarse entre sí**.

**N rendijas.** La intensidad es:

I = I₀ (sen Nγ / sen γ)² (sen β / β)²

- γ = π·ΔCO/λ₀, con ΔCO = n d sen θ **entre rendijas vecinas**. Es la interferencia.
- β = π n a sen θ / λ₀. Es la difracción de cada rendija, y usa a.

Cómo leerla:

- **Máximos principales:** γ = mπ, o sea ΔCO = mλ₀. Ahí la interferencia vale N².
- **Ceros de interferencia:** Nγ = pπ con p **no múltiplo de N**, o sea ΔCO = (p/N)λ₀. Entre dos máximos principales hay N − 1 ceros y N − 2 máximos secundarios. Con N = 3: **2 ceros y 1 secundario** entre cada par de principales.
- **Ceros de difracción:** β = qπ, o sea n a sen θ = qλ₀. Medidos en ΔCO entre vecinas, caen en ΔCO = q(d/a)λ₀ y apagan los máximos principales m = q·d/a (los órdenes faltantes).

**Pantalla finita.** Lo que entra está limitado por tg θ_max = (W/2)/D. Hay que pasar a sen θ_max y comparar los sen θ de cada máximo o mínimo. Usar y = D tg θ, no y = D sen θ, salvo que el enunciado diga que vale la aproximación paraxial.

## 4. Resolución paso a paso

### a) Espesor e₂

**Paso 1: rendijas abiertas.** Quedan las dos de los extremos, separadas 2d = 16 µm. El centro de la pantalla, θ = 0, está a igual distancia de las dos.

**Paso 2: lo que agrega la lámina 1.**

- e₁(n₁ − n) = 4 · (1,5 − 1,32) = 4 · 0,18 = **0,72 µm**, o sea 1,2λ₀.
- Con esa lámina sola, el orden 0 se corre 1,2 franjas hacia el lado de la lámina: n·2d·sen θ = 0,72 ⇒ sen θ = 0,0341 ⇒ y = 2,22 cm, con una interfranja de 1,85 cm.

**Paso 3: lo que agrega la lámina 2.**

- e₂(n₂ − n) = e₂ · (1,2 − 1,32) = **−0,12 e₂**. Es negativo: n₂ es **menor** que el índice del líquido.

**Paso 4: ¿en qué rendija va?**

- **En la otra rendija:** ΔCO(θ = 0) = 0,72 − (−0,12e₂) = 0,72 + 0,12e₂. Es siempre mayor que 0: empeora el corrimiento. Así **no** se puede.
- **En la misma rendija (encimada):** 0,72 − 0,12 e₂ = 0 ⇒ **e₂ = 6 µm**.

**Resultado a): e₂ = 6 µm**, frente a la **misma** rendija que la primera lámina.

### b) Tres rendijas, sin láminas: mínimos en la pantalla

Ahora N = 3, d = 8 µm, a = 2 µm, n = 1,32, con incidencia normal y sin láminas. El patrón es simétrico respecto del centro.

**Paso 1: borde de la pantalla.**

- tg θ_max = 15/65 = 0,2308 ⇒ θ_max = 13,0° ⇒ sen θ_max = **0,2249**
- En el borde, ΔCO entre vecinas = n d sen θ_max / λ₀ = 1,32 · 8 · 0,2249 / 0,6 = **3,957 λ₀**

**Paso 2: máximos principales.** Están en ΔCO = mλ₀, así que entran m = 0, ±1, ±2, ±3. El m = ±4 caería en 4 > 3,957: afuera, y además falta porque d/a = 4.

**Paso 3: ceros de interferencia (N = 3).** Están en ΔCO = (p/3)λ₀ con p no múltiplo de 3 y p/3 < 3,957:

- p = 1, 2, 4, 5, 7, 8, 10, 11 (11/3 = 3,667 entra; 13/3 = 4,33 no) ⇒ **8 por lado**.

**Paso 4: ceros de difracción.**

- El primero está en n a sen θ = λ₀ ⇒ sen θ = 0,6/(1,32 · 2) = **0,2273**, que es mayor que 0,2249.
- En la pantalla: y = 65 · tg(13,14°) = **15,17 cm**, mayor que 15 cm. **Queda afuera, por 1,7 mm.**
- Es el mismo lugar donde estaría el máximo principal m = 4, el faltante.

**Paso 5: total.** 2 · 8 = **16 mínimos**. El chequeo numérico, contando los ceros de I(θ) en la pantalla, da 16.

Posiciones de cada lado (y = D tg θ):

| | ΔCO/λ₀ | sen θ | y (cm) |
|---|---|---|---|
| máx. m = 0 | 0 | 0 | 0 (I = 9I₀) |
| mín. | 1/3 | 0,0189 | 1,23 |
| mín. | 2/3 | 0,0379 | 2,46 |
| máx. m = 1 | 1 | 0,0568 | 3,70 (I = 7,30 I₀) |
| mín. | 4/3 | 0,0758 | 4,94 |
| mín. | 5/3 | 0,0947 | 6,18 |
| máx. m = 2 | 2 | 0,1136 | 7,44 (I = 3,65 I₀) |
| mín. | 7/3 | 0,1326 | 8,69 |
| mín. | 8/3 | 0,1515 | 9,96 |
| máx. m = 3 | 3 | 0,1705 | 11,24 (I = 0,81 I₀) |
| mín. | 10/3 | 0,1894 | 12,54 |
| mín. | 11/3 | 0,2083 | 13,85 |
| borde | 3,957 | 0,2249 | 15,00 |
| (1er mín. de difracción) | 4 | 0,2273 | 15,17: afuera |

**Resultado b): 16 mínimos** (8 a cada lado del centro).

**Ambigüedad: la aproximación paraxial.** Si se usa sen θ ≈ tg θ = 15/65:

- ΔCO_max = 4,06λ₀;
- el primer cero de difracción cae en y = D sen θ = 14,77 cm (o 14,90 cm con y = Dθ), adentro de la pantalla;
- se suma un mínimo por lado: **18 mínimos**.

La cuenta exacta (y = D tg θ), que es la que usa la hoja para pantallas finitas, da **16**, y es la más probable. El enunciado no habilita la aproximación paraxial, mientras que el ejercicio 2 del mismo examen sí lo hace explícitamente. Como el mínimo cae a 1,7 mm del borde, conviene justificar con los sen θ comparados.

## 5. Resultados finales

- **a)** e₂ = **6 µm**, frente a la misma rendija que la lámina 1. Las láminas agregan +0,72 µm y −0,72 µm.
- **b)** Entran los máximos principales m = 0, ±1, ±2, ±3. El primer mínimo de difracción (ΔCO = 4λ₀, y = 15,17 cm) queda justo afuera.
  - **16 mínimos** (8 por lado), en ΔCO = λ₀/3, 2λ₀/3, …, 11λ₀/3.
  - Con aproximación paraxial serían 18.

## 6. Dónde es fácil equivocarse

- **Usar n_l − 1 como si fuera aire.** Así, la lámina 1 daría 2 µm y la lámina 2, puesta en la otra rendija, e₂ = 2/0,2 = 10 µm: mal. El medio es el líquido: n_l − 1,32.
- **Poner la segunda lámina en la otra rendija "porque sí".** Con n₂ < n, la lámina 2 adelanta el haz: tiene que ir en la misma rendija para compensar a la primera.
- **Usar d en lugar de 2d para la doble rendija.** En a) no cambia nada, porque es θ = 0, pero sí cambia el corrimiento y la interfranja.
- **Olvidar el n del líquido en γ y β.** Sin n, ΔCO_max = 3,0λ₀ y salen 12 mínimos.
- **Contar mal los ceros de N = 3.** Son 2 entre cada par de principales, más los que caen entre el último principal (m = 3) y el borde: 10/3 y 11/3. Contar solo "2 por orden" da 6 por lado.
- **No chequear el mínimo de difracción.** Con d/a = 4 cae en ΔCO = 4λ₀. Acá queda afuera por muy poco: 15,17 cm contra 15 cm.
- **Mezclar unidades.** 600 nm = 0,6 µm; la pantalla, en cm.
- **Confundir "mínimos" con máximos secundarios.** Con N = 3 hay uno entre cada par de principales, pero no son ceros.

## 7. Ideas de animación

1. **El dispositivo.** Un tanque con líquido (n = 1,32), la placa con tres rendijas y la del medio tapada con una "cinta". La pantalla de 30 cm a 65 cm, con su centro alineado con la rendija tapada.
2. **Barras de camino óptico.** Sobre cada rendija abierta, una barra que crece:
   - con la lámina 1, la barra de esa rendija sube +0,72 µm y el patrón en la pantalla se corre 1,2 franjas (2,2 cm) hacia ese lado;
   - la lámina 2 aparece primero en la **otra** rendija: su barra baja (−0,12e₂) y el patrón se corre **más**, con una cruz roja;
   - después se mueve a la **misma** rendija, encima de la primera: con e₂ = 6 µm la barra vuelve a 0 y el orden 0 regresa al centro.
3. **De doble rendija a tres rendijas.** Se quita la cinta y se sacan las láminas. El patrón de la doble rendija de 2d se transforma en el de N = 3:
   - picos principales más finos, de altura 9I₀ (modulada por la envolvente);
   - entre cada par, dos ceros y un secundario chico.
4. **Fasores.** Tres flechas iguales, cada una girada γ respecto de la anterior.
   - Con γ = 0 se alinean: intensidad 9.
   - Con γ = 2π/3 forman un triángulo cerrado: cero.
   - Con γ = π, dos se cancelan y queda una: el secundario, I₀.
   - Con γ = 4π/3, el triángulo se cierra de nuevo: cero.
5. **Conteo en la pantalla.** Un cursor que recorre la curva I(y) desde el centro hacia el borde, marcando cada cero con un número del 1 al 8 en cada lado.
6. **Zoom al borde.** Primero aparece la envolvente de difracción (sen β/β)² punteada. Después, un zoom en y = 14–16 cm: la pantalla termina en 15 cm, el cero de difracción está en 15,17 cm, y una flecha marca "1,7 mm afuera". Al lado, la variante paraxial, que lo mete adentro y da 18.
