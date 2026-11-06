# Geo 2 · Cubo de vidrio con reflector y agua: rapidez de la luz en el vidrio

Origen: 1P 16/9/2023, ejercicio 1 (1 punto). Es casi textual al recuperatorio 1P 1C 2022. Verificación numérica: `Geo2.py`.

> Un cubo grande de vidrio tiene un reflector metálico (espejo) en una de sus caras y agua (n_agua = 1,33) en una cara adyacente. Un haz de luz incide sobre el reflector. Se observa que para θ ≥ 48° no entra luz al agua. ¿Cuál es la rapidez del haz de luz en el vidrio?
>
> Figura: el reflector es la cara de abajo y el agua está en la cara de la derecha. θ es el ángulo entre el haz que baja y la superficie del reflector.

---

## 1. Datos y qué se pide

**Datos**

| Dato | Valor |
|---|---|
| Índice del agua | n_agua = 1,33 |
| Umbral | para θ ≥ 48° no entra luz al agua |
| Geometría | el reflector y la cara con agua son caras **adyacentes** de un cubo, o sea perpendiculares entre sí. θ se mide entre el haz y el **plano del reflector** (no desde la normal) |
| Velocidad de la luz en el vacío | c = 3·10⁸ m/s |

**Qué se pide.** La rapidez v de la luz dentro del vidrio, en m/s.

## 2. Molde en la hoja (v6)

**Ejercicio más parecido:** el **9, "Reflexión total de un rayo: espejo sumergido y prisma"**, con la **Receta óptica geométrica**, paso 10: *"Rayo suelto con reflexión total: seguirlo cara por cara"*. La idea de ángulo límite es la del ejercicio 8: sen θ_L = n'/n.

**Qué se repite**
- Se sigue **un solo rayo**.
- Con geometría se saca el ángulo con que llega a la superficie que importa.
- Se aplica: hay reflexión total ⇔ ángulo de incidencia ≥ θ_L, con sen θ_L = n_menor/n_mayor.

**Qué cambia**
- La incógnita es el **índice** (y con él la rapidez), no el ángulo. Es como la nota del 1P 2021 en el ejercicio 9: "reflexión total si n ≥ 1/sen 52°".
- El umbral θ ≥ 48° es directamente θ_L.
- En el ejercicio 9 a), el espejo inclinado φ desviaba el rayo 2φ. Acá el espejo es **perpendicular** a la cara con agua, así que el ángulo θ pasa sin cambios.

## 3. Teoría que se usa

**Reflexión en un espejo.** El ángulo de incidencia es igual al de reflexión, medidos desde la normal. Dicho de otra forma: el rayo reflejado forma con la superficie del espejo el **mismo ángulo θ** que el incidente.

**Snell.** n₁ sen θ₁ = n₂ sen θ₂, con los ángulos medidos desde la **normal** a la superficie.

**Reflexión total.**
- Si la luz pasa de un medio más denso a uno menos denso (n₁ > n₂), el rayo refractado se aleja de la normal.
- A medida que θ₁ crece, θ₂ llega a 90°. Ese θ₁ es el **ángulo límite**:

  **sen θ_L = n₂/n₁** (siempre el índice menor arriba).

- Para θ₁ ≥ θ_L no hay rayo refractado: toda la luz se refleja y **no pasa nada al otro medio**.
- Por eso, *"para θ ≥ 48° no entra luz al agua"* quiere decir que el ángulo de incidencia en la cara del agua llega a θ_L justo cuando θ = 48°.

**Índice de refracción.** Por definición n = c/v, así que **v = c/n**. Además λ = λ₀/n y la frecuencia no cambia.

**Geometría del cubo.**
- La cara con agua es perpendicular al reflector, así que **la normal a la cara del agua es paralela al reflector**.
- El rayo reflejado forma un ángulo θ con el reflector, y por lo tanto también θ con esa normal (son ángulos alternos internos entre paralelas).
- Conclusión: **el ángulo de incidencia en la cara del agua es θ**.

**Chequeo de que la lectura es la correcta.**
- Al crecer θ, el rayo sube más empinado y llega a la cara vertical más rasante, con mayor incidencia. La reflexión total aparece para θ **grandes**, que es lo que dice el enunciado (θ ≥ 48°). ✓
- Si θ se midiera desde la normal del reflector, la incidencia en la cara del agua sería 90° − θ, y la reflexión total aparecería para θ **chicos**, al revés del enunciado.

## 4. Resolución paso a paso

### Paso 1. Ángulo de incidencia en la cara del agua
El reflejado sale con θ respecto del reflector (horizontal), y la normal a la cara del agua es horizontal. Entonces **incidencia en la cara del agua = θ**.

### Paso 2. Ángulo límite
Para θ ≥ 48° no entra luz: la reflexión total empieza en θ = 48°, así que **θ_L = 48°**.

### Paso 3. Índice del vidrio

  sen θ_L = n_agua/n_v  ⇒  n_v = n_agua/sen 48° = 1,33/0,7431 = **1,790**

Chequeo: n_v = 1,79 > n_agua = 1,33, condición necesaria para que haya reflexión total del vidrio hacia el agua. ✓

### Paso 4. Rapidez en el vidrio

  v = c/n_v = c · sen 48°/n_agua = 3·10⁸ · 0,7431/1,33 = **1,676·10⁸ m/s ≈ 1,68·10⁸ m/s** (≈ 0,56c)

Con c = 2,998·10⁸ m/s sale 1,675·10⁸ m/s.

**Chequeo numérico (`Geo2.py`)**
- Con θ = 47,9°, el rayo todavía entra al agua, refractado a 86,8° (casi rasante).
- Con θ = 48° ya hay reflexión total.

**Sobre la resolución del alumno.** Plantea bien y llega a n_v = 1,79. Pero escribe v = 168,539·10⁶ m/s, que es 3·10⁸/**1,78**. Con 1,79 da 1,676·10⁸ m/s. Es un error de tipeo en la cuenta final.

## 5. Resultados finales

- θ_L (vidrio → agua) = 48°.
- n_vidrio = 1,33/sen 48° ≈ **1,79**.
- **v = c/n ≈ 1,68·10⁸ m/s** (1,676·10⁸ m/s).

## 6. Dónde es fácil equivocarse

- **Tomar 48° como ángulo desde la normal.**
  - Así la incidencia en la cara del agua sería 42°, y daría n = 1,99 y v = 1,51·10⁸ m/s.
  - Esa lectura contradice el "≥" del enunciado: daría reflexión total para θ ≤ 48°.
  - En el examen hay que dibujar la normal a la cara del agua y marcar el ángulo.
- **Invertir el cociente:** sen θ_L = n_v/n_agua es mayor que 1, imposible. El índice menor va arriba.
- **Calculadora en RAD** para sen 48°: tiene que estar en **DEG**.
- **Pensar que la luz se refracta en el reflector.** Es metálico: solo refleja.
- **Redondear n antes de dividir y arrastrar el error** (como en la resolución del alumno). Mejor usar v = c·sen θ_L/n_agua de una.
- **Olvidar las unidades** o la notación científica: v ≈ 1,68·10⁸ **m/s**.

## 7. Ideas de animación

1. **Corte del cubo.**
   - Vidrio celeste, reflector plateado abajo y agua azul a la derecha.
   - Un rayo entra desde arriba a la izquierda, rebota en el reflector y va a la cara del agua.
2. **Deslizador de θ.**
   - A medida que θ crece de 30° a 60°, el rayo refractado en el agua se va acostando hasta quedar rasante (90°) en θ = 48°.
   - Desde ahí desaparece y el reflejado interno se pone brillante: reflexión total.
   - Mostrar el número θ y el ángulo del refractado en tiempo real.
3. **Ángulos alternos internos.**
   - Dibujar la normal a la cara del agua (horizontal) paralela al reflector.
   - Resaltar los dos ángulos θ iguales: uno con el reflector y otro con la normal.
4. **Snell en el límite.** Escribir n_v sen 48° = 1,33 · sen 90° y despejar n_v.
5. **Frentes de onda.** Frentes que avanzan en el vacío y se apretujan en el vidrio (λ más corta), con el letrero "v = c/n ≈ 0,56c".
