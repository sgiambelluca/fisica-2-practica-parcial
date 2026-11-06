# DR 2 · Cinco rendijas con las tres centrales tapadas, después destapadas

Origen: recuperatorio 30/5/2026, ejercicio 5 (2 puntos). Está resuelto en la hoja v7, ejercicio 19. Verificación numérica: `DR2.py`.

> Se ilumina normalmente con luz de longitud de onda λ una placa con cinco rendijas iguales y equiespaciadas (separación d), aunque las tres rendijas centrales están obstruidas. Sea P un punto fijo de la pantalla donde la diferencia de caminos ópticos entre los rayos que interfieren, provenientes de las rendijas abiertas, es λ/2. Se observa que el octavo orden de interferencia es el primero que está suprimido y se sabe que el cociente entre la separación y el ancho de las rendijas es un número entero. A continuación, se destapan las ranuras obstruidas.
> a) Calcule I_P/I_max, donde I_max es la máxima intensidad observada en la pantalla e I_P la que se registra en P ahora.
> b) ¿Cuántos máximos de intensidad hay ahora en la campana principal de difracción?

---

## 1. Datos y qué se pide

**Datos.** No hay números con unidades: todo sale como cociente, en función de λ.

| Dato | Valor |
|---|---|
| Luz | λ, incidencia normal (θ_i = 0) |
| Placa | N = 5 rendijas iguales (ancho a), separación d entre vecinas |
| Configuración 1 | tapadas las 3 centrales (2, 3 y 4); abiertas la 1 y la 5 |
| Punto P | ΔCO entre los rayos de las dos rendijas abiertas = λ/2 |
| Órdenes suprimidos | el 8º orden (de la configuración 1) es el primero que falta |
| d/a | entero |
| Configuración 2 | las 5 rendijas destapadas |

**Qué se pide**
- **a)** I_P/I_max en la configuración 2. I_max es la máxima intensidad de la pantalla, la del centro.
- **b)** La cantidad de máximos de intensidad dentro de la campana central de difracción, en la configuración 2.

## 2. Molde en la hoja (v6)

**No hay un ejercicio igual en la v6** (sí en la v7: ejercicio 19, con los mismos resultados). En la v6 hay que juntar tres piezas:

- **Receta doble rendija / redes, "Fórmulas":**
  - *"Rendijas tapadas: las abiertas forman una red con otro d y otro N (Recu 30/5/26: 5 rendijas con las 3 centrales tapadas = doble rendija de 4d; destapadas, I_max = N²I₀)"*;
  - *"Red: I = I₀(sen Nγ/sen γ)²(sen β/β)²"*;
  - *"Campana central: … con 2d/a − 1 máx."*.
- **Ejercicio 19** (red): órdenes faltantes m = p·d/a.
- **Ejercicios 16 b) y 18 b):** intensidad en un punto, calculando γ y β por separado y multiplicando los factores.

**Qué cambia respecto de esos moldes**
- Las rendijas abiertas no son vecinas: la separación efectiva es 4d.
- P se define en una configuración y se evalúa en la otra.
- En a) el factor de interferencia es el de N = 5, no el cos² de la doble rendija.

## 3. Teoría que se usa

**N rendijas iguales** (ancho a, separación d, incidencia normal):

  **I(θ) = I₀ (sen Nγ / sen γ)² (sen β / β)²**,  **γ = π d sen θ/λ**,  **β = π a sen θ/λ**

- **γ** es la **mitad** del desfasaje entre dos rendijas **vecinas**: Δφ = 2π d sen θ/λ = 2γ.
- **β** es la mitad del desfasaje entre los bordes de **una** rendija.
- **I₀** es la intensidad que da una sola rendija en θ = 0.

**Factor de red (sen Nγ/sen γ)².** Es lo que hacen las N ondas al sumarse.
- **Máximos principales:** en γ = mπ (d sen θ = mλ) todas llegan en fase y el factor vale N².
- **Ceros:** en γ = jπ/N, con j no múltiplo de N.
- Entre dos principales consecutivos hay **N − 1 ceros** y **N − 2 máximos secundarios**.
- Para N = 2 se reduce a 4cos²γ, la fórmula de la doble rendija.

**Factor de difracción (sen β/β)².** Es la "campana" de cada rendija.
- Vale 1 en el centro y 0 en a sen θ = pλ (p = ±1, ±2, …).
- La **campana principal** es |sen θ| < λ/a, o sea |β| < π.

**Máximo de la pantalla.** En θ = 0, I_max = N²I₀: N amplitudes iguales en fase dan amplitud N veces mayor, e intensidad N² veces mayor.

**Órdenes suprimidos.** Un máximo principal (separación D_ef: D_ef sen θ = mλ) cae sobre un cero de difracción (a sen θ = pλ) cuando **m = p·D_ef/a**. Ese orden no aparece.

**Rendijas tapadas.** Solo emiten las abiertas. La 1 y la 5 están a **4d**, así que con las tres del medio tapadas el sistema es una **doble rendija de separación 4d** (y el mismo a).

**Máximos principales dentro de la campana.** Hay que pedir d sen θ = mλ con |sen θ| < λ/a, o sea |m| < d/a. Hay **2d/a − 1** principales. Los m = ±d/a caen justo en el cero de difracción y se suprimen.

## 4. Resolución paso a paso

### Paso 1. Configuración tapada: d/a
- Doble rendija de separación 4d: los máximos están en 4d sen θ = mλ.
- Suprimidos: m = p·(4d/a). El primero (p = 1) es m = 4d/a = 8, así que **d/a = 2**.

¿Para qué sirve "d/a entero"? Si 4d/a fuera una fracción como 8/3, el primer suprimido también sería m = 8 (con p = 3). Pero eso da d/a = 2/3 < 1, y la separación no puede ser menor que el ancho. `DR2.py` revisa todas las fracciones con d ≥ a: la única es 4d/a = 8. El dato confirma lo mismo.

### Paso 2. El punto P en la configuración destapada
- En P: 4d sen θ_P = λ/2, así que d sen θ_P = λ/8.
- Con las 5 abiertas (N = 5, separación d):
  - γ_P = π d sen θ_P/λ = **π/8**;
  - β_P = π a sen θ_P/λ = γ_P·(a/d) = **π/16**.
- (Antes de destapar, P era un mínimo: 4I₀cos²(π/2) = 0.)

### Paso 3. a) I_P/I_max
**Factor de red:**
- sen(5π/8) = 0,92388 y sen(π/8) = 0,38268;
- cociente: 2,41421;
- al cuadrado: **5,8284**.

**Factor de difracción:**
- sen(π/16) = 0,19509 y π/16 = 0,19635;
- cociente: 0,99359;
- al cuadrado: **0,98721**.

**Intensidad en P:**
  I_P = 5,8284 · 0,98721 · I₀ = **5,754 I₀**

**Máximo:** I_max = N²I₀ = **25 I₀** (en el centro, donde los dos factores son máximos).

  **I_P/I_max = 5,754/25 = 0,230**

- Sin la envolvente daría 5,828/25 = 0,233. La diferencia es chica, pero el planteo completo lleva los dos factores.
- P queda en el flanco del pico central: γ_P = 0,125π, antes del primer cero en γ = π/5 = 0,2π.

**Con fasores.**
- Cinco flechas iguales, cada una girada Δφ = 2γ = π/4 (45°) respecto de la anterior.
- La resultante mide sen(5π/8)/sen(π/8) = 2,414 veces una flecha, contra 5 en el centro.
- (2,414/5)² = 0,233; multiplicado por la envolvente, 0,987, da 0,230.

### Paso 4. b) Máximos en la campana central
**Principales.**
- d sen θ = mλ dentro de |sen θ| < λ/a, o sea |m| < d/a = 2.
- Quedan **m = 0, ±1: 3 máximos principales**.
- Los m = ±2 caen exactamente en el primer cero de difracción y están suprimidos (2d/a − 1 = 3).
- La intensidad del orden 1 es ≈ 10,1 I₀ (en γ = π exacto: 25·(2/π)² = 10,13 I₀; el pico real está apenas corrido, en γ = 0,988π, con 10,26 I₀).

**Si se cuentan también los secundarios.**
- **Conteo "de libro" (el de la hoja v7):** N − 2 = 3 secundarios entre cada par de principales consecutivos. En la campana hay 4 tramos, (−2,−1), (−1,0), (0,1) y (1,2), así que 3 + 4·3 = **15**.
- **Conteo estricto de máximos locales (`DR2.py`, sobre la curva):** salen **17**.
  - El orden ±2 suprimido no desaparece del todo: la envolvente lo parte al medio.
  - Entre el último cero del factor de red (γ = 9π/5) y el cero de difracción (γ = 2π) queda un lobulito, en γ ≈ ±1,897π, con I ≈ 0,029 I₀.
  - Es del mismo orden que los secundarios vecinos (0,045 I₀).
  - Total: 3 principales + 12 secundarios + 2 lobulitos = 17.

**Máximos locales en |γ| < 2π (γ/π e intensidad en unidades de I₀; simétricos):**

| γ/π | 0 | ±0,289 | ±0,498 | ±0,707 | ±0,988 | ±1,284 | ±1,491 | ±1,694 | ±1,897 |
|---|---|---|---|---|---|---|---|---|---|
| I/I₀ | 25 | 1,458 | 0,811 | 1,015 | 10,26 | 0,310 | 0,092 | 0,045 | 0,029 |
| tipo | principal | sec. | sec. | sec. | principal | sec. | sec. | sec. | resto del ±2 |

**Respuesta más probable para la cátedra: 3 máximos (principales)**, que es la pregunta típica, "2d/a − 1". Si se quiere cubrir todo, agregar: "contando los secundarios, 3 por intervalo, son 15; contando todos los máximos locales, incluidos los dos lobulitos pegados al mínimo de difracción, 17".

## 5. Resultados finales

- d/a = 2.
- En P (destapadas): γ = π/8 y β = π/16.
- **a) I_P/I_max = 5,754 I₀ / 25 I₀ = 0,230.**
- **b) 3 máximos principales** (m = 0, ±1). Contando secundarios: 15 con el conteo de la hoja (N − 2 por intervalo); 17 máximos locales en sentido estricto.

## 6. Dónde es fácil equivocarse

- **Usar d en lugar de 4d en la configuración tapada.** Da d/a = 8, y todo lo demás sale mal. Las abiertas son la 1 y la 5: hay 4 separaciones entre ellas.
- **Suponer que en P el desfasaje entre vecinas es λ/2.** El λ/2 es entre la 1 y la 5. Entre vecinas, ΔCO = λ/8 y Δφ = π/4.
- **Definir mal γ.** En la fórmula de la cátedra γ = π d sen θ/λ, la **mitad** del desfasaje. Con el desfasaje completo δ = 2γ, la fórmula es sen(Nδ/2)/sen(δ/2).
- **Usar un I_max equivocado.** Es N²I₀ = 25 I₀, no 5I₀, ni 4I₀ (la doble rendija), ni 1.
- **Olvidar la envolvente** en a) (0,233 en vez de 0,230).
- **Calculadora en DEG** para sen(π/8): tiene que estar en RAD.
- **Contar m = ±2 como máximos** de la campana central: caen justo en el cero de difracción.
- **Responder 15 o 17 sin decir qué se cuenta.** Si se dan secundarios, hay que aclarar el criterio.

## 7. Ideas de animación

1. **La placa.** Cinco rendijas, tres tapadas en gris y las dos de los extremos abiertas, con una llave que marca "4d". Después se destapan con una animación.
2. **Patrón de la doble rendija de 4d** con su envolvente (sen β/β)².
   - Numerar las franjas 0, 1, 2… y mostrar que la 8 cae justo en el primer cero de la campana, así que 4d/a = 8 y d/a = 2.
3. **Fasores en P.**
   - Configuración tapada: dos flechas opuestas, resultante nula (P es un mínimo).
   - Destapadas: cinco flechas giradas 45° cada una, que forman un arco; resultante 2,41 contra 5 en el centro.
   - (2,41/5)² ≈ 0,233, y con la envolvente, 0,230.
4. **Curva I(γ) para N = 5** con la envolvente punteada.
   - Marcar P en γ = π/8, sobre el flanco del pico central.
   - Contar los máximos dentro de la campana: primero los 3 principales; después, con un zoom, los secundarios.
   - En el último zoom, el lobulito en ±1,9π, donde la envolvente "parte" al orden 2 suprimido.
