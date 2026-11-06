# Geo 8 · Lente plano-convexa en un tubo que se llena con líquido

Origen: recuperatorio 1P 1C 2022, ejercicio 2. Números verificados con `Geo8.py`.

## 1. Datos y qué se pide

**Datos**

| Magnitud | Valor |
|---|---|
| lente L | plano-convexa, n_L = 1,6 |
| luz incidente | haz de rayos paralelos, que llega desde afuera (aire, a la izquierda) |
| tubo vacío (aire) | la imagen se enfoca en la pantalla translúcida P con L–P = 15 cm = 0,15 m |
| tubo lleno de líquido de índice n | la distancia L–P debe ser 21 cm = 0,21 m |

**Lo que muestra la figura (y que importa):**

- La lente está en la punta izquierda del tubo, con la **cara convexa hacia afuera**, hacia el aire y la luz que llega, y la **cara plana hacia adentro**.
- El líquido llena el tubo, **entre la cara plana y la pantalla P** (la pared derecha). Solo un lado de la lente queda en contacto con el líquido.

**Qué se pide**

- a) El radio R de la superficie curva.
- b) El índice n del líquido.

## 2. Molde en la hoja (v6)

- **Ej. 13 a) (lente sumergida):** despeja R con la ecuación del fabricante, pero ahí la lente está **toda** dentro del líquido y se usa n_L/n − 1. Acá eso **no** vale.
- **"Fórmulas de óptica geométrica" (lente con medios distintos):** es la herramienta justa para b):

  n'/s' − n/s = (n_L − n)/R₁ + (n' − n_L)/R₂

- **Ej. 15 (barra con dos dioptras):** hace la misma cuenta que b), dioptra por dioptra.

**Qué se repite:** rayos paralelos ⇒ imagen en el foco imagen, y el fabricante con una cara plana (R = ∞).

**Qué cambia:** a cada lado de la lente hay un medio distinto (aire y líquido). El paso 7 de la receta ("lente en un medio: usar n_L/n − 1") llevaría a un resultado equivocado.

## 3. Teoría que se usa

**Convención:** el origen va en el vértice de cada cara y el sentido positivo es el de la luz (hacia la pantalla). R > 0 si el centro de curvatura queda hacia donde va la luz.

**Objeto en el infinito.** Con rayos paralelos, s = −∞ y la imagen se forma en el foco imagen: s' = f'. La distancia lente–pantalla con la imagen enfocada **es** la focal imagen.

**Fabricante en aire:** 1/f' = (n_L − 1)(1/R₁ − 1/R₂).

- La cara convexa mira hacia la luz, así que su centro queda del lado de adentro: R₁ = +R. La cara plana tiene R₂ = ∞.
- Queda 1/f' = (n_L − 1)/R.

**Dioptra:** n₂/s' − n₁/s = (n₂ − n₁)/R.

- Encadenando dos dioptras pegadas (lente delgada: la imagen de la primera es el objeto de la segunda, con D ≈ 0) sale la fórmula general de la lente entre dos medios n (entrada) y n' (salida):

  n'/s' − n/s = (n_L − n)/R₁ + (n' − n_L)/R₂

- Con n = n' = 1 se recupera el fabricante en aire.
- Con n = n' (lente sumergida) se recupera (n_L/n − 1).

**¿Por qué importa la cara plana si "las caras planas no enfocan"?**

- Una cara plana no desvía los rayos paralelos al eje, pero sí los rayos que ya vienen convergiendo.
- Adentro del vidrio, después de la cara curva, los rayos convergen hacia un punto a 24 cm. Al salir por la cara plana hacia un medio de menor índice, se abren respecto de la normal, que es el eje, y convergen más rápido. El punto de convergencia pasa a estar a 24·n'/n_L, el mismo efecto que la profundidad aparente.
- En aire: 24·1/1,6 = 15 cm. En el líquido (n' > 1) se doblan menos y el foco queda más lejos, a 24·n'/1,6.

## 4. Resolución paso a paso

### a) Tubo vacío

**Paso 1.** Los rayos son paralelos, así que la imagen está en el foco imagen: **f' = 15 cm**.

**Paso 2: fabricante** (R₁ = +R, R₂ = ∞).

  1/15 = (1,6 − 1)·(1/R − 0) = 0,6/R ⇒ **R = 0,6·15 = 9 cm**

R = +9 cm: el centro está del lado del tubo.

**Chequeo dioptra por dioptra:**

- Cara curva, aire → vidrio: 1,6/s₁' = 0,6/9 ⇒ s₁' = 24 cm.
- Cara plana, vidrio → aire: 1/s' = 1,6/24 ⇒ s' = 15 cm ✓.

### b) Tubo lleno de líquido

**Paso 3: lente entre aire (n = 1, de donde viene la luz) y líquido (n', del lado de P).**

  n'/s' − 1/(−∞) = (1,6 − 1)/9 + (n' − 1,6)/∞ ⇒ n'/s' = 0,6/9 = 1/15 ⇒ **s' = 15·n'**

**Paso 4.** s' = 21 cm ⇒ 15n' = 21 ⇒ **n' = 21/15 = 1,4**.

**Chequeo dioptra por dioptra:**

- La cara curva no "ve" el líquido: s₁' = 24 cm, igual que antes.
- Cara plana, vidrio → líquido: n'/s' − 1,6/24 = 0 ⇒ s' = 24·n'/1,6 = 15n' = 21 cm con n' = 1,4 ✓.

**Lectura física.** El líquido estira la distancia focal en un factor igual a su índice: 15 cm · 1,4 = 21 cm.

### Ambigüedad: ¿cómo queda la lente respecto del líquido?

| Interpretación | Ecuación | n del líquido |
|---|---|---|
| **Según la figura:** cara curva al aire, plana al líquido | 21 = 15·n | **1,40** |
| Lente toda sumergida (receta 7: n_L/n − 1) | 21 = 9n/(1,6 − n) | 1,12 |
| Cara curva mojada y cara plana al aire | 21 = 9n/(1,6 − n) | 1,12 |

La figura es clara: la lente es la tapa del tubo, con la cara convexa hacia afuera, y el líquido solo está adentro. Lo más probable según la cátedra es **n = 1,4**, que además sale de la cuenta limpia 21/15. Las otras dos lecturas coinciden entre sí porque, con rayos paralelos, la cara plana de entrada no hace nada. Solo sirven como trampa: corresponden a otro dibujo.

## 5. Resultados finales

- **a)** f' = 15 cm ⇒ **R = 9 cm** (cara convexa hacia la luz, R₁ = +9 cm).
- **b)** s' = n·f'_aire ⇒ 21 = 15·n ⇒ **n = 1,4**.

## 6. Dónde es fácil equivocarse

- **Usar n_L/n − 1 como si la lente estuviera sumergida:** da n = 1,12. El líquido solo toca la cara plana.
- **Creer que la cara plana no cambia nada y que el foco sigue en 15 cm.** La luz sale al líquido convergiendo, y la refracción en la cara plana sí la desvía.
- **Pensar que con líquido la distancia se acorta.** Se alarga: el líquido tiene un índice más parecido al vidrio, así que los rayos se doblan menos hacia el eje.
- **Cara plana con R = 0** en vez de R = ∞.
- **Signos:** con la convexa hacia la luz, R₁ = +9. Con la convención al revés, el R da negativo y f' también, y eso es absurdo para una convergente.
- **Mezclar las dos situaciones:** la a) es toda en aire. En la b) cambia solo el medio de salida.

## 7. Ideas de animación

1. **El dispositivo.** Corte del tubo con la lente como tapa (cara curva hacia afuera) y la pantalla translúcida P al fondo. Llega un haz paralelo desde la izquierda.
2. **Tubo vacío.** Los rayos se doblan en la cara curva y apenas en la plana, y se juntan en P a 15 cm. Aparece "f' = 15 cm ⇒ R = 0,6·15 = 9 cm".
3. **Se llena el tubo.** Animación de llenado (el líquido sube con burbujitas). Al cubrir la cara plana, los rayos que salen de la lente se "aplanan" (zoom a la cara plana con los ángulos de Snell: 1,6·senθ = n·senθ') y el punto de convergencia se corre. El tubo deslizante se estira hasta que P vuelve a quedar en foco, a 21 cm.
4. **Factor de estiramiento.** Una regla que se escala: 15 cm × 1,4 = 21 cm.
5. **La trampa.** En fantasma, la lente "toda sumergida" (líquido de los dos lados) con el cartel "n = 1,12 ✗: no es lo que muestra la figura".
