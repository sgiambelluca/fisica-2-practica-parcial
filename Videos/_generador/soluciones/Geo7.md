# Geo 7 · Banco óptico: convergente + divergente plano-cóncava

Origen: 1P 23/4/2022, ejercicio 4 (figura: objeto en 0, lente 1 en 60 cm, lente 2 en 90 cm). Números verificados con `Geo7.py`.

## 1. Datos y qué se pide

**Datos.** En óptica se puede trabajar en cm porque todas las longitudes van en la misma unidad; entre paréntesis está el valor en SI.

| Magnitud | Valor |
|---|---|
| objeto | x = 0 |
| lente 1 (convergente) | x = 60 cm (0,60 m); f'₁ = 12 cm (0,12 m) |
| lente 2 (divergente, una cara plana) | x = 90 cm (0,90 m); n₂ = 1,5, en aire |
| separación entre lentes | D = 30 cm (0,30 m) |
| imagen que ve el observador (a la derecha) | x = 78 cm (0,78 m) |

**Qué se pide**

- a) El radio de curvatura de la cara esférica de la lente 2 y un esquema del perfil. ¿La cara esférica mira hacia la lente 1, hacia el observador, o es indistinto?
- b) La distancia focal imagen f'₁ que debería tener la lente 1 para que el haz salga de la lente 2 como rayos paralelos. El objeto y la lente 2 quedan como en a).

## 2. Molde en la hoja (v6)

- **Ej. 14 (convergente + divergente, Recu 1/11/25):** el mismo sistema, con la convergente primero y la divergente después. Usa s₂ = s₁' − D y "paralelos ⇒ el objeto de la 2ª está en su foco, s₂ = +|f'₂| (virtual)".
- **Ej. 13 a):** usa la ecuación del fabricante para despejar un radio a partir de f'.

**Qué se repite:** la cadena lente por lente y la condición de rayos paralelos.

**Qué cambia:**

1. En a) la incógnita es la lente 2. Su f'₂ sale de la ecuación de lentes, con objeto e imagen conocidos, y su radio, del fabricante con una cara plana (R = ∞).
2. La imagen final es **virtual** y su posición es un dato.
3. En b) la incógnita es la focal de la **primera** lente, no una distancia.

## 3. Teoría que se usa

**Convención de la cátedra.**

- El origen va en el vértice de cada lente y el sentido positivo es el de la luz (hacia la derecha).
- Objeto real a la izquierda de la lente: s < 0.
- Imagen a la derecha: s' > 0, **real**. A la izquierda: s' < 0, **virtual**. Una imagen virtual se ve mirando a través de la lente: los rayos parecen salir de ahí.

**Lente delgada:** 1/s' − 1/s = 1/f'.

- f' > 0: convergente; f' < 0: divergente.
- Foco imagen: si s = −∞, entonces s' = f'.
- Foco objeto: si s = −f', la imagen se va al infinito y los rayos salen paralelos.

**Dos lentes.** La imagen de la primera es el objeto de la segunda, medido desde la segunda: **s₂ = s₁' − D**. Si s₂ > 0, el objeto es **virtual**: la luz llega a la lente 2 todavía convergiendo hacia un punto que queda detrás de ella.

**Lente del fabricante (en aire):** 1/f' = (n_L − 1)(1/R₁ − 1/R₂).

- R₁ es la cara por la que entra la luz y R₂ la de salida.
- R > 0 si el centro de curvatura queda a la derecha, donde va la luz.
- Una cara plana tiene R = ∞, o sea 1/R = 0. **No es R = 0.**

**¿Por qué da lo mismo dar vuelta la lente?** Al girarla, la cara 1 pasa a ser la 2 y los centros cambian de lado: R₁ → −R₂ y R₂ → −R₁. Entonces 1/R₁ − 1/R₂ → −1/R₂ + 1/R₁, que es lo mismo. En la aproximación de lente delgada, la focal no depende de qué cara mira a la luz.

**"Rayos paralelos al salir".** La imagen final está en el infinito: s₂' = ∞ ⇒ 1/s₂ = −1/f'₂ ⇒ s₂ = −f'₂. En una divergente (f'₂ < 0) eso da s₂ > 0: un objeto virtual ubicado en el foco objeto, que en una divergente queda **detrás** de la lente.

## 4. Resolución paso a paso

### a)

**Paso 1: lente 1.** s₁ = 0 − 60 = −60 cm.

  1/s₁' = 1/f'₁ + 1/s₁ = 1/12 − 1/60 = 5/60 − 1/60 = 4/60 ⇒ **s₁' = +15 cm**

La imagen es real y queda en x = 75 cm.

**Paso 2: objeto de la lente 2.** s₂ = s₁' − D = 15 − 30 = **−15 cm**: objeto real, 15 cm a la izquierda de la lente 2 (x = 75 cm).

**Paso 3: imagen final.** La imagen está en x = 78 cm ⇒ s₂' = 78 − 90 = **−12 cm**. Es virtual: queda a la izquierda de la lente 2, y el observador la ve a través de ella.

**Paso 4: focal de la lente 2.**

  1/f'₂ = 1/s₂' − 1/s₂ = −1/12 − (−1/15) = (−5 + 4)/60 = −1/60 ⇒ **f'₂ = −60 cm**

Da negativa, como corresponde a una divergente ✓.

**Paso 5: radio (fabricante, plano-cóncava, n₂ − 1 = 0,5).**

- **Cara curva hacia la lente 1** (R₁ = R, R₂ = ∞): −1/60 = 0,5·(1/R) ⇒ **R = −30 cm**. El centro queda a la izquierda: la cara está hundida, vista desde la lente 1.
- **Cara curva hacia el observador** (R₁ = ∞, R₂ = R): −1/60 = 0,5·(0 − 1/R) ⇒ **R = +30 cm**. El centro queda a la derecha: la cara está hundida, vista desde el observador.
- En los dos casos **|R| = 30 cm** y f' = −60 cm, así que **es indistinto** (lente delgada).
- **Esquema:** una cara plana y la otra hundida. La lente es más gruesa en los bordes que en el centro, como toda divergente.

**Extra (no lo piden, pero sirve para describir la imagen):** A = A₁·A₂ = (s₁'/s₁)(s₂'/s₂) = (15/−60)·(−12/−15) = (−0,25)·(0,8) = **−0,2**. La imagen es virtual, invertida y 5 veces menor.

### b)

**Paso 6: condición de salida paralela.** La lente 2 sigue con f'₂ = −60 cm.

  s₂' = ∞ ⇒ s₂ = −f'₂ = **+60 cm**

Es un objeto virtual en x = 90 + 60 = 150 cm. La lente 1 tiene que mandar la luz convergiendo hacia ese punto.

**Paso 7: dónde debe formar la imagen la lente 1.** s₁' = s₂ + D = 60 + 30 = **90 cm**.

**Paso 8: focal de la lente 1.** El objeto sigue en x = 0 ⇒ s₁ = −60 cm.

  1/f'₁ = 1/s₁' − 1/s₁ = 1/90 + 1/60 = (2 + 3)/180 = 5/180 = 1/36 ⇒ **f'₁ = 36 cm**

**Chequeo:** con f'₁ = 36 cm, s₁' = 90 cm ⇒ s₂ = 60 cm ⇒ 1/s₂' = −1/60 + 1/60 = 0 ⇒ s₂' = ∞ ✓.

**Ambigüedades:** no hay. La única duda posible, qué cara mira a la luz, es justamente lo que pregunta a), y la respuesta es que da lo mismo.

## 5. Resultados finales

- s₁' = 15 cm (imagen intermedia en x = 75 cm); s₂ = −15 cm; s₂' = −12 cm; f'₂ = −60 cm.
- **a)** **|R| = 30 cm**: R = −30 cm si la cara curva mira a la lente 1, o R = +30 cm si mira al observador. **Es indistinto** (lente delgada). Perfil plano-cóncavo.
- Imagen final virtual, invertida y 5 veces menor (A = −0,2).
- **b)** **f'₁ = 36 cm**: la lente 1 debe formar su imagen en x = 150 cm, el foco objeto de la lente 2.

## 6. Dónde es fácil equivocarse

- **Signo del objeto.** El objeto real a la izquierda va con s₁ = −60, no +60.
- **Medir s₂' desde la lente 1 o desde 0.** s₂' se mide desde la lente 2: 78 − 90 = −12.
- **"Plana ⇒ R = 0".** Una cara plana tiene R = ∞ (1/R = 0).
- **El lado del foco de la divergente.** Para salir paralelos, el objeto de la divergente tiene que estar **detrás** de ella, en s₂ = +60. Si se toma s₂ = −60, la lente 1 tendría que formar la imagen en s₁' = −30, que es virtual, y la cuenta daría f'₁ = −60 cm: una divergente, lo que contradice el enunciado.
- **En b), cambiar la lente equivocada** o mover el objeto: lo único que cambia es f'₁.
- **Olvidar que n = 1,5 entra como (n − 1) = 0,5** en el fabricante.
- **"Distancia focal imagen"** es f' con su signo: +36 cm (convergente).

## 7. Ideas de animación

1. **Banco óptico con regla de 0 a 150 cm.** El objeto (flecha) en 0 y las dos lentes en 60 y 90. El observador a la derecha.
2. **Trazado de a).** Desde la punta del objeto salen dos rayos notables (paralelo al eje y por el centro), que se cruzan en x = 75 cm: imagen intermedia invertida, de un cuarto del tamaño.
3. **Lente 2 en acción.** Los rayos siguen y llegan divergiendo a la lente 2, que los abre más. Las prolongaciones punteadas hacia atrás se encuentran en x = 78 cm: aparece la imagen virtual "fantasma" y se ilumina el ojo del observador.
4. **Cuenta en pantalla.** La ecuación 1/f'₂ = 1/(−12) − 1/(−15) se resuelve con fichas que se reordenan hasta dar −1/60.
5. **Perfil de la lente.** La lente plano-cóncava gira 180° sobre su eje vertical, el centro de curvatura salta de lado (R = −30 → +30) y el número f' = −60 cm no cambia: "indistinto".
6. **b).** La lente 1 se "estira" (f' pasa de 12 a 36 cm) y los rayos ahora convergen hacia x = 150 cm, con un punto fantasma marcado. La lente 2 los intercepta en 90 cm y salen paralelos. Se resalta que 150 cm es el foco objeto de la lente 2, a 60 cm detrás de ella.
