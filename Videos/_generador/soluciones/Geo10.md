# Geo 10 · Rayo en un cubo: n máximo sin reflexión total

Origen: 1P 24/9/2015, ejercicio 4 (con figura). Números verificados con `Geo10.py`.

## 1. Datos y qué se pide

**Datos**

| Magnitud | Valor |
|---|---|
| cubo | material transparente de índice n, inmerso en aire (n' = 1) |
| rayo | incide sobre la cara superior; en la figura forma **60° con la superficie** (el arco va del rayo a la cara superior) |
| ángulo de incidencia | θ₁ = 90° − 60° = **30°** (medido desde la normal) |
| recorrido | adentro del cubo, el rayo llega a la **cara lateral** (en la figura, la izquierda) |

**Qué se pide:** el máximo valor de n para que **no** haya reflexión total en la cara lateral.

## 2. Molde en la hoja (v6)

- **Ej. 9 (reflexión total de un rayo: espejo sumergido y prisma)** y la receta de óptica, paso 10: "rayo suelto con reflexión total: seguirlo cara por cara". Sobre todo, la nota del ej. 9 "(1P 2021: con φ = 26°, reflexión total si n ≥ 1/sen52° = 1,269)", que también pide un rango de n.
- El ej. 8 (superficie iluminada) usa el mismo ángulo límite, pero con un disco de luz y no con un solo rayo.

**Qué se repite:**

- Se sigue un solo rayo.
- La geometría da el ángulo de incidencia en la cara que importa.
- Se compara con el ángulo límite, senθ_L = n'/n.

**Qué cambia:** antes de llegar a la cara lateral el rayo se refracta al entrar, y esa refracción también depende de n. Entonces n aparece dos veces: en Snell de entrada y en el ángulo límite. Además, las dos caras son perpendiculares, así que los ángulos son complementarios.

## 3. Teoría que se usa

**Snell:** n₁ senθ₁ = n₂ senθ₂, con los ángulos medidos **desde la normal**. Si el dibujo da el ángulo con la superficie, hay que restarlo de 90°.

**Reflexión total:**

- Solo pasa al ir de un medio de índice mayor a uno menor (acá, del cubo al aire).
- Ocurre si el ángulo de incidencia es ≥ θ_L, con **senθ_L = n'/n = 1/n**.
- Dicho de otra forma: Snell en la cara de salida pediría sen(θ_salida) = n·senθ_inc. Si eso da > 1, no hay rayo refractado y la luz se refleja toda.

**Geometría del cubo.** La normal de la cara superior es vertical y la de la cara lateral es horizontal: son perpendiculares. En el triángulo que forma el rayo con las dos normales, el ángulo con la normal lateral es **θ_lat = 90° − θ₂**, donde θ₂ es el ángulo refractado en la cara superior. Por eso senθ_lat = cosθ₂.

**Por qué buscamos un n máximo.**

- Al crecer n, el rayo refractado se acerca a la vertical (θ₂ baja), así que θ_lat sube.
- Al mismo tiempo θ_L baja, porque senθ_L = 1/n.
- Las dos cosas empujan hacia la reflexión total, así que hay un n a partir del cual siempre hay reflexión total.

**Fórmula general.** Si no hay reflexión total, n² < 1 + sen²θ₁. Con θ₁ → 90° (rayo rasante), el máximo posible es √2 ≈ 1,414. Por eso con un cubo de vidrio (n = 1,5) la luz que entra por la cara superior nunca sale por una cara lateral.

## 4. Resolución paso a paso

**Paso 1: ángulo de incidencia.** El rayo forma 60° con la superficie ⇒ θ₁ = 30° ⇒ senθ₁ = 0,5.

**Paso 2: Snell en la cara superior** (aire → cubo).

  1·sen30° = n·senθ₂ ⇒ senθ₂ = 1/(2n)

**Paso 3: incidencia en la cara lateral.**

  θ_lat = 90° − θ₂ ⇒ senθ_lat = cosθ₂ = √(1 − sen²θ₂) = √(1 − 1/(4n²))

**Paso 4: condición de que NO haya reflexión total.** Snell en la cara lateral: sen(θ_salida) = n·senθ_lat < 1.

  n·√(1 − 1/(4n²)) < 1 ⇒ √(n² − 1/4) < 1 ⇒ n² < 5/4 ⇒ **n < √5/2 ≈ 1,118**

**Paso 5: chequeo en el borde (n = 1,118).**

- θ₂ = arcsen(1/2,236) = 26,57°.
- θ_lat = 63,43°.
- θ_L = arcsen(1/1,118) = 63,43° ✓, el mismo valor. El rayo sale rasante, a 90°.

**Barrido (en el .py):**

| n | Qué pasa en la cara lateral |
|---|---|
| 1,05 | sale a 67,4° |
| 1,10 | sale a 78,5° |
| 1,12 | reflexión total |
| 1,20 | reflexión total |

**Respuesta:** **n_max = √5/2 ≈ 1,118**. Con n menor que eso, el rayo sale por la cara lateral; justo en ese valor sale rasante.

**Ambigüedad:** el 60° de la figura.

- El arco se dibuja entre el rayo y la cara superior, así que es el ángulo con la **superficie**: θ₁ = 30°. Es la lectura correcta.
- Si alguien lo toma como ángulo de incidencia (con la normal), obtiene n_max = √(1 + sen²60°) = √1,75 ≈ 1,323. Eso no corresponde al dibujo.

## 5. Resultados finales

- θ₁ = 30°; senθ₂ = 1/(2n); θ_lat = 90° − θ₂.
- Condición: n² < 1 + sen²30° = 1,25.
- **n_max = √5/2 ≈ 1,118** (para n ≥ 1,118 hay reflexión total en la cara lateral).

## 6. Dónde es fácil equivocarse

- **Usar 60° como ángulo de incidencia:** da 1,323. Los ángulos de Snell se miden desde la **normal**.
- **Usar θ₂ como ángulo de incidencia en la cara lateral.** Las caras son perpendiculares, así que el ángulo es el complementario, 90° − θ₂.
- **Invertir el ángulo límite** (senθ_L = n en lugar de 1/n).
- **El sentido de la desigualdad.** Más n trae más reflexión total, así que se busca un máximo.
- **Probar valores sueltos** sin plantear la desigualdad: se llega más rápido y seguro con álgebra (sen² + cos² = 1).
- **Calculadora en DEG** para estos ángulos, que están dados en grados.

## 7. Ideas de animación

1. **El cubo.** Un cuadrado con el rayo entrando por arriba a 60° de la superficie. Se dibujan la normal punteada y el arco de 30°.
2. **Normales que giran.** Al llegar a la cara lateral aparece su normal (horizontal). Se marca el triángulo rectángulo con θ₂ arriba y 90° − θ₂ abajo, y se ilumina "ángulos complementarios".
3. **Deslizador de n de 1 a 1,5.**
   - El rayo refractado se hace más vertical.
   - En la cara lateral, el rayo que sale se acerca a la superficie, se vuelve rasante en n = 1,118 y después desaparece: aparece el rayo reflejado punteado, como en la figura del enunciado.
   - Un indicador muestra "sale" en verde y "reflexión total" en rojo.
4. **Dos curvas.** Gráfico de θ_lat(n), creciente, y θ_L(n), decreciente, que se cruzan en n = 1,118. Se sombrea la zona permitida, 1 < n < 1,118.
5. **Cierre.** Si el rayo entrara rasante (θ₁ → 90°), el límite sería √2: "un cubo de vidrio no deja salir por el costado la luz que entra por arriba".
