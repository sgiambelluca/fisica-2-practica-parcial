# Ond 3 · Propagante → estacionaria: y(x,t), K de un tramo, gráfico de u_U(t) (1P 20/4/2024, ej. 4)

Verificado con `Ond3.py` (fórmulas cerradas + integral numérica).

## 1. Datos y qué se pide

Por una cuerda viaja una onda que se refleja en los extremos y forma una onda estacionaria. El dato de un punto en un instante permite decidir el modelo de extremos y la fase.

| Dato | Valor (SI) |
|---|---|
| Rapidez de propagación | v = 400 m/s |
| Largo de la cuerda | L = 50 cm = 0,50 m |
| Masa de la cuerda | m = 2 g = 2·10⁻³ kg |
| Período | T = 1 ms = 10⁻³ s |
| Dato de la estacionaria | en t₁ = 3T/4 = 0,75 ms, el punto x = 0,2 m tiene su desplazamiento máximo, y = +2 mm = +2·10⁻³ m |

Qué se pide:

- **a)** La función de onda estacionaria y(x,t) y su gráfico en t₁.
- **b)** La energía cinética del tramo [5 cm; 25 cm] en t₂ = 1,5 ms.
- **c)** El gráfico de la densidad de energía elástica u_U(t) del punto x = 0,3 m, entre 0,75 ms y 1,75 ms, con las escalas.

## 2. Molde en la hoja (v6)

- **Ej. 6 · Estacionaria fijo–libre y gráfico de u_U(t) (1C 2026)** es el molde principal: misma clase de cuerda (un extremo fijo y otro libre), misma fórmula u_U = ½F(∂y/∂x)² en un punto y el mismo tipo de gráfico (período T/2, marcar máximos y ceros, escalas). Lo que cambia:
  - Acá **el modelo no está dado**: se deduce de L y λ.
  - El extremo libre queda en x = 0, así que va **cos(kx)** y no sen(kx).
  - La amplitud se da directamente como el desplazamiento del antinodo (2 mm): **no hay que duplicarla**.
- **Ej. 7 · Propagante → estacionaria: modelo, energía, gráfico.** De ahí sale cómo decidir el modelo y cómo sacar la fase φ con un dato "en tal instante, tal punto…".
- **Ej. 5 · Estacionaria fijo–fijo: % de energía.** El truco de la integral: un tramo de largo λ/2 da ∫cos² = Δx/2. Y la regla de la receta de ondas (paso 4): "horizontal ⇒ toda la energía es cinética".

## 3. Teoría que se usa

**Datos de la onda.**

- μ = m/L es la masa por unidad de largo.
- v = √(F/μ), donde F es la tensión; de ahí F = μv².
- λ = vT, k = 2π/λ y ω = 2π/T.

La onda propagante y la estacionaria tienen la misma λ y la misma ω: la estacionaria es la suma de la propagante con su reflejada.

**Estacionaria.** Dos ondas de amplitud A' que viajan en sentidos opuestos suman

  y(x,t) = 2A' · cos(kx) · cos(ωt + φ)  (o con sen(kx)).

- Cada punto hace un MAS, con amplitud |2A' cos(kx)| que depende de dónde está.
- Hay **nodos**, que no se mueven, y **antinodos**, que se mueven con amplitud máxima.
- Todos los puntos pasan juntos por y = 0 (la cuerda horizontal) y llegan juntos a su extremo (la máxima elongación).

**Extremos y modelo.**

- Un extremo fijo es un **nodo** (y = 0 siempre). Un extremo libre es un **antinodo** (pendiente nula, ∂y/∂x = 0).
- Entre nodo y antinodo hay λ/4. Por eso:
  - fijo–fijo y libre–libre: L = n·λ/2, un número entero de medias longitudes de onda;
  - fijo–libre: L = (2n−1)·λ/4, un número **impar** de cuartos.
- Para elegir sen o cos: nodo en x = 0 ⇒ sen(kx); antinodo en x = 0 ⇒ cos(kx).

**Densidades de energía (energía por unidad de largo, J/m).**

- Cinética: u_K = ½ μ (∂y/∂t)². Es ½·(masa del pedacito)·(velocidad)², dividido por dx.
- Elástica: u_U = ½ F (∂y/∂x)². El pedacito inclinado está estirado, y eso cuesta energía proporcional a la pendiente al cuadrado.

En una estacionaria con y = A cos(kx) sen(ωt):

- u_K ∝ cos²(kx)·cos²(ωt): es máxima en los **antinodos**, cuando la cuerda pasa por **horizontal**.
- u_U ∝ sen²(kx)·sen²(ωt): es máxima en los **nodos**, donde la pendiente es máxima, cuando la cuerda está en **máxima elongación**.
- Como F·k² = μv²·k² = μω², los dos coeficientes valen lo mismo: ½μω²A².

**Integral de un tramo.** ∫cos²(kx)dx = x/2 + sen(2kx)/(4k). Si el tramo mide un múltiplo de λ/2, los senos se cancelan y la integral es Δx/2: el promedio de cos² es ½.

## 4. Resolución paso a paso

### Datos derivados

- μ = m/L = 2·10⁻³/0,5 = **4·10⁻³ kg/m**; tensión F = μv² = 4·10⁻³·400² = **640 N** (se usa en c).
- λ = vT = 400·10⁻³ = **0,4 m** ⇒ k = 2π/0,4 = **5π m⁻¹** (15,71 m⁻¹).
- ω = 2π/T = **2000π rad/s** (6283 rad/s); f = 1000 Hz.

### a) Modelo, función de onda y gráfico

**Modelo.**

- L/(λ/2) = 0,5/0,2 = 2,5. No es entero: no es fijo–fijo ni libre–libre.
- L/(λ/4) = 0,5/0,1 = **5**, impar ⇒ **un extremo fijo y otro libre**, con L = 5λ/4. Es el 5º armónico del fijo–libre (f₁ = v/4L = 200 Hz y f = 5f₁).

**¿Qué extremo es cuál?** Se prueban los dos casos.

- Si x = 0 fuera fijo: y ∝ sen(5πx), y en x = 0,2 sen(π) = 0. Sería un nodo, pero el enunciado dice que ese punto se desplaza 2 mm. ✗
- Si x = 0 es libre: y ∝ cos(5πx), y en x = 0,2 cos(π) = −1: es un antinodo ✓. En x = L = 0,5, cos(2,5π) = 0: nodo, el extremo fijo ✓.
- Nodos en x = 0,1; 0,3 y 0,5 m (3 nodos). Antinodos en x = 0; 0,2 y 0,4 m.

**Amplitud.** x = 0,2 m es antinodo y su desplazamiento máximo es 2 mm ⇒ **A = 2 mm** es la amplitud de la estacionaria (cada propagante tiene 1 mm).

**Fase.** Se plantea y(x,t) = A cos(kx) cos(ωt + φ) y se pone el dato:

- y(0,2; 3T/4) = A · cos(π) · cos(3π/2 + φ) = −A cos(3π/2 + φ) = +A
- ⇒ cos(3π/2 + φ) = −1 ⇒ 3π/2 + φ = π ⇒ **φ = −π/2**
- cos(ωt − π/2) = sen(ωt)

**Resultado:** **y(x,t) = 2 mm · cos(5πx) · sen(2000πt)**  (x en m, t en s). En SI: y = 2·10⁻³ cos(5πx) sen(2000πt) m.

Chequeo: y(0,2; 0,75 ms) = 2·cos(π)·sen(1,5π) = 2·(−1)·(−1) = +2 mm ✓, y en ese instante su velocidad es 0 (está en el máximo) ✓.

**Gráfico en t₁.** sen(ωt₁) = sen(1,5π) = −1 ⇒ **y(x, t₁) = −2 mm · cos(5πx)**. Toda la cuerda está en su máxima elongación y quieta.

| x (m) | 0 | 0,05 | 0,1 | 0,15 | 0,2 | 0,25 | 0,3 | 0,35 | 0,4 | 0,45 | 0,5 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| y (mm) | −2 | −1,41 | 0 | +1,41 | +2 | +1,41 | 0 | −1,41 | −2 | −1,41 | 0 |

Es un coseno invertido de 1¼ longitudes de onda: empieza en −2 mm en el extremo libre, sube a +2 en 0,2, baja a −2 en 0,4 y termina en 0 en el extremo fijo.

### b) Energía cinética del tramo [0,05; 0,25] m en t₂ = 1,5 ms

1. **Mirar la fase temporal antes de integrar.** ωt₂ = 2000π·1,5·10⁻³ = 3π ⇒ sen(3π) = 0: **la cuerda está horizontal** ⇒ u_U = 0 en todos lados y toda la energía es cinética. Además cos(3π) = −1, así que las velocidades son máximas.
2. **Velocidad y densidad.** ∂y/∂t = Aω cos(kx) cos(ωt) ⇒ en t₂: ∂y/∂t = −Aω cos(kx).
   u_K = ½μ(∂y/∂t)² = ½μω²A² cos²(5πx).
3. **Coeficiente.** ½μω²A² = ½ · 4·10⁻³ · (2000π)² · (2·10⁻³)² = **0,3158 J/m**.
4. **Integral.** ∫₀,₀₅^₀,₂₅ cos²(5πx) dx = [x/2 + sen(10πx)/(20π)] entre 0,05 y 0,25 = (0,125 + 1/(20π)) − (0,025 + 1/(20π)) = **0,1 m**. Atajo: el tramo mide 0,2 m = λ/2 ⇒ integral = Δx/2.
5. **K = 0,3158 · 0,1 = 0,03158 J ≈ 31,6 mJ.** La integral numérica del `.py` da 31,58 mJ.

Dato extra: la energía total de la cuerda es E = ¼μω²A²L = 79,0 mJ, y el tramo tiene el 40 %.

### c) u_U(t) en x = 0,3 m, entre 0,75 y 1,75 ms

1. **Pendiente.** ∂y/∂x = −Ak sen(kx) sen(ωt) ⇒ u_U = ½F(∂y/∂x)² = ½FA²k² sen²(kx) sen²(ωt).
2. **En x = 0,3 m:** kx = 1,5π ⇒ sen²(kx) = 1. Ese punto es un **nodo de desplazamiento**: no se mueve, pero ahí la pendiente es máxima, así que su energía elástica es máxima (no cero).
3. **Coeficiente.** ½FA²k² = ½ · 640 · (2·10⁻³)² · (5π)² = **0,3158 J/m**. Es lo mismo que ½μω²A², porque Fk² = μω².
4. **Resultado:** **u_U(t) = 0,316 · sen²(2000πt) J/m** = 0,158·(1 − cos(4000πt)) J/m.
5. **Gráfico.** El período de sen² es T/2 = **0,5 ms**, así que el intervalo de 1 ms abarca **2 períodos completos** (ωt va de 1,5π a 3,5π).

| t (ms) | 0,75 | 0,875 | 1,0 | 1,125 | 1,25 | 1,375 | 1,5 | 1,625 | 1,75 |
|---|---|---|---|---|---|---|---|---|---|
| u_U (J/m) | 0,316 | 0,158 | 0 | 0,158 | 0,316 | 0,158 | 0 | 0,158 | 0,316 |

- Máximos (0,316 J/m) en 0,75, 1,25 y 1,75 ms: son los instantes de máxima elongación de la cuerda.
- Ceros en 1,0 y 1,5 ms: cuerda horizontal.
- Siempre ≥ 0, y los ceros son **redondeados** (tangente horizontal), no picos.
- Escalas sugeridas: horizontal, 1 cm = 0,125 ms (el intervalo ocupa 8 cm); vertical, 1 cm = 0,05 J/m (el máximo queda a 6,3 cm).

**Sobre la resolución del alumno.** a) y b) coinciden: y = 2·10⁻³ cos(5πx) sen(2000πt) y K = 31,58 mJ. En c) pone 157,91 como máximo de u_U: **está mal**, porque usó A en lugar de A² (½μω²A = 157,9). El valor correcto es 0,316 J/m. Además dibuja los ceros como picos. Ojo: el encabezado del PDF muestra 0,5/4 en este ejercicio. La resolución en tableta parece rehecha después del examen.

## 5. Resultados finales

- **a)** Fijo–libre: x = 0 libre, x = 0,5 m fijo; nodos en 0,1, 0,3 y 0,5 m.
  **y(x,t) = 2 mm · cos(5πx) · sen(2000πt)**. En t₁: y = −2 mm · cos(5πx).
- **b)** Cuerda horizontal ⇒ **K = 31,6 mJ** (U = 0).
- **c)** **u_U(t) = 0,316 sen²(2000πt) J/m**, con período 0,5 ms: máximos en 0,75, 1,25 y 1,75 ms; ceros en 1,0 y 1,5 ms.

## 6. Dónde es fácil equivocarse

- **Duplicar la amplitud.** El "2A" se usa cuando dan la amplitud de la *propagante*. Acá los 2 mm son el desplazamiento de un punto de la estacionaria (un antinodo), así que A = 2 mm, no 4.
- **Suponer fijo–fijo por costumbre.** 2,5 medias longitudes de onda no entran en una cuerda fijo–fijo.
- **Elegir sen(kx).** Con sen(kx), x = 0,2 es un nodo y contradice el dato. Hay que probar los dos extremos.
- **Signo de la fase.** cos(kx₁) = cos(π) = −1 cambia el signo. Si se lo toma como +1, sale y = −2 mm cos(5πx) sen(ωt), el signo opuesto. Siempre conviene chequear reemplazando.
- **Unidades.** g → kg, cm → m, mm → m, ms → s. La resolución del alumno escribe "L = 50 cm = 0,4 m", un error de tipeo que, por suerte, no arrastra.
- **En b), qué energía hay.** En t₂ la cuerda está horizontal: toda la energía es cinética. No es un instante de máxima elongación.
- **El ½ de la integral.** El tramo mide λ/2 ⇒ ∫cos² = Δx/2 = 0,1 m, no 0,2 m.
- **En c), "es un nodo, entonces no tiene energía".** Falso para la elástica: en un nodo la pendiente es máxima. u_U lleva sen²(kx), no cos²(kx).
- **Elevar A al cuadrado** (el error del alumno: 157,9 en lugar de 0,316).
- **Período del gráfico.** u_U tiene período T/2 = 0,5 ms, no T. Y sen² no tiene picos en los ceros.
- **Calculadora en RAD.**

## 7. Ideas de animación

1. **De propagante a estacionaria.** Dos ondas de 1 mm que viajan en sentidos opuestos (una en azul y otra en rojo), y su suma en negro, que "late" sin avanzar, con amplitud 2 mm.
2. **¿Qué modelo?** La cuerda de 50 cm con una regla de bloques de λ/2 = 20 cm: entran 2,5 bloques, cruz roja. Después con bloques de λ/4 = 10 cm: entran 5 justos, impar, tilde verde ⇒ fijo–libre.
3. **¿Qué extremo es fijo?** Dos cuerdas lado a lado. Arriba, fijo en 0 (sen): el punto 0,2 queda clavado en un nodo y se marca en rojo. Abajo, libre en 0 (cos): el punto 0,2 oscila 2 mm, en verde.
4. **Fase con reloj.** La estacionaria animada con un reloj que avanza en fracciones de T. En t₁ = 3T/4 se congela: el punto 0,2 arriba, en +2 mm, y se dibuja y(x,t₁) = −2 cos(5πx) con la tabla de valores.
5. **b) Cuerda horizontal.** En t₂ la cuerda plana, con flechas de velocidad verticales de largo ∝ |cos(5πx)|. Debajo, la curva u_K(x) con el área sombreada entre 5 y 25 cm, y un rectángulo a media altura para mostrar que el área es la mitad: 0,316 · 0,1 = 31,6 mJ.
6. **c) Zoom en x = 0,3 m.** El punto no se mueve, pero un segmentito tangente se inclina para un lado y para el otro. Al lado, el gráfico u_U(t) se dibuja con un barrido de 0,75 a 1,75 ms, sincronizado con la cuerda: máximo cuando la cuerda está en su extremo, cero cuando pasa por horizontal.
7. **Mapa de energías.** Sobre la cuerda, colorear u_K (en antinodos) y u_U (en nodos), y mostrar cómo la energía pasa de un lugar al otro cada T/4.
