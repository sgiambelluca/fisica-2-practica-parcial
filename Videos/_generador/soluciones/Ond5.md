# Ond 5 · Propagante → estacionaria fijo–fijo: armónico y gráfico de u_K(t)

Fuente: recuperatorio del 1P, 18/6/2024, ejercicio 3. Verificado con `Ond5.py`.

## 1. Datos y qué se pide

**Datos**

| Dato | Valor | En SI |
|---|---|---|
| Masa de la cuerda | 10 g | m = 0,010 kg |
| Extremos | fijo–fijo | — |
| Tensión | 18 N | F = 18 N |
| Onda propagante | y = A cos(kx − ωt) | — |
| Amplitud | A = 2 cm | 0,02 m |
| Número de onda | k = 2,5π m⁻¹ | 7,854 m⁻¹ |
| Frecuencia angular | ω = 150π s⁻¹ | 471,2 rad/s |
| Condición inicial | en t = 0 la cuerda está horizontal | — |
| Punto | x = 60 cm | 0,60 m |
| Intervalo | t_i = 0,04 s, t_f = 0,07 s | — |

**Ojo:** no dan el largo L. Sale de la masa y de μ.

A la tensión la llamo F, como en la hoja, para no confundirla con el período T.

**Qué se pide**

- **a)** Qué armónico es la onda estacionaria que se forma en la cuerda.
- **b)** Graficar la densidad de energía cinética u_K(t) del punto x = 60 cm entre 0,04 s y 0,07 s, indicando las escalas.

## 2. Molde en la hoja

**Ejercicio 6 de la v6** ("Estacionaria fijo–libre: masa y gráfico de u_U(t)", 1C 2026). Es casi el mismo ejercicio: dan una propagante A cos(kx − ωt) y la tensión, y piden graficar una densidad de energía en un punto entre dos instantes, con la cuerda horizontal en t = 0. El gráfico de u_K(t) también aparece en el **ejercicio 7 c)**, y los pasos están en la **Receta ondas** (1, 3, 4 y 6).

- **Se repite:**
  - v = ω/k y μ = F/v²;
  - amplitud estacionaria 2A;
  - nodo en x = 0 ⇒ y = 2A sen(kx) sen(ωt);
  - la densidad de energía tiene período T/2;
  - el gráfico marca máximos y ceros.
- **Cambia:**
  - acá los dos extremos son fijos (L = nλ/2, no (2n−1)λ/4);
  - la incógnita del a) es el armónico, y para eso hay que sacar L de la masa;
  - se grafica la energía **cinética** u_K (factor cos²(ωt)), no la elástica u_U (factor sen²(ωt)).

## 3. Teoría que se usa

**Velocidad de la onda en la cuerda.**

- La da la mecánica de la cuerda: v = √(F/μ), con μ = m/L la masa por unidad de largo.
- La da la onda misma: v = ω/k = λf.
- Si conozco la onda (ω, k) y la tensión, despejo μ = F/v², y con la masa total el largo: L = m/μ.

**Fijo–fijo.**

- Los extremos no se mueven, así que son nodos. Entre nodos consecutivos hay λ/2, así que en L entra un número entero de medias longitudes de onda: **L = nλ/2**, y f_n = n·v/(2L).
- n es el armónico: tiene n "panzas" y n − 1 nodos internos.

**De propagante a estacionaria.**

- La onda A cos(kx − ωt) viaja hacia +x. En un extremo fijo se refleja invertida y vuelve como −A cos(kx + ωt). Como 2kL = 10π es múltiplo de 2π, da lo mismo pensar la reflexión en x = 0 o en x = L. La suma es:

  y = A cos(kx − ωt) − A cos(kx + ωt) = 2A sen(kx) sen(ωt)

  Se usa cos a − cos b = −2 sen((a+b)/2) sen((a−b)/2).
- La amplitud en los antinodos es **2A**: las dos ondas se suman.
- La forma sen(kx) da nodo en x = 0, como corresponde al extremo fijo.

**"Horizontal en t = 0".**

- Que la cuerda esté horizontal quiere decir que y(x, 0) = 0 en todos lados, así que el factor temporal es sen(ωt).
- En general sería sen(ωt + φ) con sen φ = 0. El signo no importa, porque la energía va al cuadrado.
- Justo esa forma es la que sale de la suma de arriba.

**Densidad de energía cinética.**

- Cada pedacito dx tiene masa μ dx y velocidad ∂y/∂t, así que su energía cinética es ½(μ dx)(∂y/∂t)². Por unidad de largo:

  **u_K = ½ μ (∂y/∂t)²**  [J/m]

- Con ∂y/∂t = 2Aω sen(kx) cos(ωt):

  u_K = ½ μ (2Aω)² sen²(kx) cos²(ωt)

- **sen²(kx):** dice dónde. Vale 1 en los antinodos y 0 en los nodos, que nunca se mueven.
- **cos²(ωt):** dice cuándo. Vale 1 cuando la cuerda está horizontal: todos los puntos pasan por el equilibrio a velocidad máxima.
- **Período:** cos²(ωt) se repite cada **T/2**. La energía cinética es máxima dos veces por oscilación (al pasar por el equilibrio subiendo y bajando).
- **Forma del gráfico:** siempre ≥ 0, con "lomas" redondeadas. En los ceros la curva es tangente al eje, no hace una V.

## 4. Resolución paso a paso

**a) Armónico**

1. v = ω/k = 150π/(2,5π) = **60 m/s**.
2. μ = F/v² = 18/60² = 18/3600 = **0,005 kg/m** (5 g/m).
3. L = m/μ = 0,010/0,005 = **2 m**.
4. λ = 2π/k = 2/2,5 = **0,8 m**.
5. Fijo–fijo: L = nλ/2 ⇒ n = 2L/λ = 4/0,8 = **5**. Es el **5º armónico**.

Controles:

- **Por frecuencias:** f = ω/(2π) = 75 Hz y f₁ = v/(2L) = 60/4 = 15 Hz, así que f/f₁ = 5 ✓.
- **Por nodos:** cada λ/2 = 0,4 m, en x = 0; 0,4; 0,8; 1,2; 1,6 y 2,0 m. Son 6 nodos, 4 internos (n − 1 = 4 ✓).
- **Antinodos:** en x = 0,2; 0,6; 1,0; 1,4 y 1,8 m.

Si n no hubiera dado entero, esa onda no podría formar una estacionaria fijo–fijo en esa cuerda.

**b) u_K(t) en x = 0,60 m**

1. **Estacionaria.** Nodo en x = 0 y horizontal en t = 0:

   y = 2A sen(kx) sen(ωt) = 0,04 sen(2,5πx) sen(150πt)  [m, s]

2. **Velocidad.** ∂y/∂t = 2Aω sen(kx) cos(ωt). Su amplitud es 2Aω = 0,04 · 150π = 6π ≈ 18,85 m/s.
3. **El punto.** En x = 0,6 m: kx = 2,5π · 0,6 = 1,5π ⇒ sen(1,5π) = −1 ⇒ sen² = 1. Es un **antinodo**, donde la energía cinética es la máxima posible.
4. **Densidad de energía cinética:**

   u_K = ½ μ (2Aω)² sen²(kx) cos²(ωt) = ½ · 0,005 · (6π)² · 1 · cos²(150πt)
   (6π)² = 355,31 ⇒ ½ · 0,005 · 355,31 = 0,888

   **u_K(t) = 0,888 cos²(150πt)  J/m**

5. **Período de u_K:** T = 2π/ω = 1/75 s = 13,33 ms ⇒ **T/2 = 1/150 s = 6,67 ms**. El intervalo dura 0,07 − 0,04 = 0,03 s, o sea **4,5 períodos** de u_K.
6. **Extremos del intervalo:**
   - en t_i: ωt = 150π · 0,04 = 6π ⇒ cos² = 1 ⇒ u_K = **0,888 J/m** (máximo: la cuerda está horizontal);
   - en t_f: ωt = 150π · 0,07 = 10,5π ⇒ cos² = 0 ⇒ u_K = **0** (máxima elongación).
7. **Máximos** (ωt = jπ ⇒ t = j/150), 5 en total, de 0,888 J/m: **0,0400; 0,0467; 0,0533; 0,0600; 0,0667 s**.
8. **Ceros** (ωt = (j + ½)π), 5 en total: **0,0433; 0,0500; 0,0567; 0,0633; 0,0700 s**.
9. **Valor medio:** a mitad de camino entre un máximo y un cero (por ejemplo, t = 0,0417 s o 0,045 s), u_K = 0,444 J/m.

**Gráfico.** Cinco lomas de cos²:

- empieza arriba en 0,04 s, en 0,888;
- baja a 0 en 0,0433 s, sube a 0,888 en 0,0467 s, y así sigue;
- termina en 0 en 0,07 s, después de 4,5 lomas: 4 enteras y la mitad de bajada de la quinta.

**Escalas**, por ejemplo:

- horizontal 1 cm = 2 ms, así que el intervalo ocupa 15 cm (si no entra, 1 cm = 5 ms y ocupa 6 cm);
- vertical 1 cm = 0,1 J/m, así que el máximo queda a 8,9 cm.

Hay que marcar los valores 0,04 y 0,07 s, los máximos, los ceros y el valor 0,888 J/m.

Dato de control: la energía total de la cuerda es E = ¼ μ ω² (2A)² L = 0,888 J. El número coincide con u_K,max por casualidad, pero son magnitudes distintas: J contra J/m.

**Interpretación:** no hay ambigüedad importante. El signo de y (±2A sen kx sen ωt) depende de cómo se plantee la reflexión, pero u_K va al cuadrado y no cambia.

## 5. Resultados finales

- v = 60 m/s; μ = 0,005 kg/m; L = 2 m; λ = 0,8 m; f = 75 Hz.
- **a)** **5º armónico** (n = 2L/λ = 5; 4 nodos internos).
- **b)** y = 0,04 sen(2,5πx) sen(150πt) [m, s]; en x = 0,6 m (antinodo):
  - **u_K(t) = 0,888 cos²(150πt) J/m**;
  - período 6,67 ms (4,5 períodos en el intervalo);
  - máximos de 0,888 J/m en 0,0400; 0,0467; 0,0533; 0,0600 y 0,0667 s;
  - ceros en 0,0433; 0,0500; 0,0567; 0,0633 y 0,0700 s.

## 6. Dónde es fácil equivocarse

- **Buscar L en el enunciado.** No está: sale de μ = F/v² y L = m/μ.
- **Amplitud A en vez de 2A.** La estacionaria es la suma de la incidente y la reflejada. Con A sale u_K,max = 0,222 J/m, la cuarta parte.
- **Usar sen²(ωt).** La cuerda está horizontal en t = 0, y ahí la velocidad es máxima: el factor de u_K es **cos²(ωt)**. sen²(ωt) es el de u_U.
- **Período T en vez de T/2.** Las lomas se repiten cada 6,67 ms, no cada 13,3 ms. Con T saldrían la mitad de las lomas.
- **No reconocer el antinodo.** En x = 0,6 m, sen²(kx) = 1. Si pidieran u_U en ese punto, daría 0 siempre, porque ahí la cuerda no se inclina: u_U ∝ cos²(kx) = 0.
- **Calculadora en grados.** kx = 1,5π y ωt = 6π son radianes.
- **Unidades.** g → kg, cm → m. u_K va en J/m, no en J.
- **Graficar picos en V.** En los ceros la curva es tangente al eje.
- **Confundir la tensión con el período.** Por eso conviene llamar F a la tensión.

## 7. Ideas de animación

1. **Las dos propagantes:**
   - la incidente (azul) viaja hacia la derecha y la reflejada, invertida (naranja), hacia la izquierda;
   - su suma, en blanco, es la estacionaria con 5 panzas, con los nodos marcados y fijos.
2. **"Cuántas medias λ entran"**: la cuerda de 2 m con tramos de 0,4 m que se van apilando (1, 2… 5) hasta llenarla. La etiqueta dice "n = 5".
3. **El punto x = 0,6 m** resaltado sobre la segunda panza, con una flecha de velocidad que cambia de tamaño. Cuando la cuerda pasa por horizontal, la flecha es máxima. En los extremos de la oscilación desaparece.
4. **Gráfico sincronizado:**
   - a la derecha, u_K(t) se dibuja en tiempo real mientras la cuerda oscila;
   - primero los ejes con las marcas 0,04 … 0,07 s, los máximos y los ceros;
   - después un barrido de la curva, contando las lomas: 1, 2, 3, 4 y media.
5. **Inserto de sen²(kx) a lo largo de la cuerda**, para mostrar que en los nodos u_K = 0 siempre y en los antinodos alcanza 0,888 J/m.
6. **Comparar cos² con sen²**: la curva de u_U(t) en un punto genérico, con línea punteada y desfasada un cuarto de período, para fijar cuál empieza arriba.
