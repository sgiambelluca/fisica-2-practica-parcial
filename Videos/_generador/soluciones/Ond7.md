# Ond 7 · Oscilador y anillo: energía de un tramo y propagante

Origen: 1P 24/9/2015, ejercicio 1 (con figura). Números verificados con `Ond7.py`.

## 1. Datos y qué se pide

**Datos (SI)**

| Magnitud | Valor |
|---|---|
| masa de la cuerda | m = 720 g = 0,720 kg |
| largo | L = 1,8 m |
| tensión | F = 640 N (la llamo F para no confundirla con el período T) |
| extremo x = 0 | unido a un oscilador, "prácticamente fijo" ⇒ **nodo** |
| extremo x = L | anillo sin peso que desliza sin fricción por una varilla ⇒ **libre** (antinodo) |
| figura | la cuerda vibra en un armónico n que hay que contar en el dibujo |
| instante t_E | la cuerda está **horizontal** y su energía cinética (de toda la cuerda) es K = 180 J |
| tramo | x₁ = 0,4 m, x₂ = 1 m |
| instantes | t_A = t_E + 0,1 s; t_B = t_E + 0,032 s |
| b) | t = 0 cuando el punto x = 0,2 m llega a su **máxima posición superior** |

**Qué se pide**

- a) La energía cinética del tramo [0,4 m; 1 m] en t_A, y la energía mecánica (K + U) del mismo tramo en t_B.
- b) La función y(x,t) de la **onda propagante generada por el oscilador**, con el t = 0 definido arriba.

## 2. Molde en la hoja (v6)

Es una mezcla de tres ejercicios de ondas de la hoja:

- **Ej. 5 b) (fijo–fijo, % de energía de un tramo):** da el mismo procedimiento para la parte a). Primero se mira la fase temporal: si la cuerda está horizontal, toda la energía es cinética. Después se integra sen² o cos² en un tramo que empieza y termina en nodos o antinodos, y la integral da Δx/2.
- **Ej. 6 (fijo–libre, 1C 2026):** tiene el mismo modelo de extremos, con L = (2n−1)λ/4 y nodo en x = 0, y dice que la estacionaria tiene el doble de amplitud que la propagante.
- **Ej. 7 (propagante → estacionaria, Recu 1/11/25):** saca la fase a partir de lo que hace un punto en un instante, y usa A_est = 2A'.

**Qué se repite:** v = √(F/μ); el modelo fijo–libre; y = A_e sen(kx) cos(ωt+φ); E_total = ¼ μω²A_e²L; las integrales que dan Δx/2.

**Qué cambia:**

1. El dato de energía es la cinética **total** en el instante horizontal. Con eso se saca la amplitud, que en el ej. 5 no hacía falta porque se pedía un porcentaje.
2. En t_B, que cae en 1,6 períodos, la cuerda no está ni horizontal ni en máxima elongación. La clave es que el tramo va de un nodo a un antinodo, así que su energía no cambia con el tiempo.
3. La b) es el camino inverso del ej. 6: se parte de la estacionaria y se llega a la propagante, con la mitad de amplitud y viajando hacia +x.

## 3. Teoría que se usa

**Velocidad y parámetros de la onda.** La velocidad depende solo de la cuerda: v = √(F/μ), con μ = m/L. Después v = λf, k = 2π/λ, ω = 2πf y T = 1/f.

**Modelo de extremos.**

- **Oscilador "prácticamente fijo":** mueve la punta con una amplitud muchísimo menor que la de los antinodos, así que se trata como un nodo: y(0,t) = 0.
- **Anillo sin peso y sin fricción:** la varilla solo lo empuja en horizontal. La fuerza vertical sobre él es −F ∂y/∂x, y tiene que valer 0: si no, un anillo de masa cero tendría aceleración infinita. Por lo tanto ∂y/∂x = 0 en x = L: la cuerda llega "plana", y ese punto es un **antinodo** (extremo libre).
- **Fijo–libre:** entre un nodo y un antinodo entra un número impar de cuartos de onda, L = (2n−1)λ/4. El modo n tiene n nodos contando el del extremo fijo, y su frecuencia es f = (2n−1)·v/(4L): solo aparecen los armónicos impares de f₁ = v/(4L).

**Estacionaria = suma de dos propagantes.** Con nodo en x = 0:

  A sen(kx − ωt) + A sen(kx + ωt) = 2A sen(kx) cos(ωt)

- La onda que va (−ωt, viaja hacia +x) y la que vuelve (+ωt, viaja hacia −x) tienen amplitud A. La estacionaria tiene amplitud **A_e = 2A** en los antinodos.
- Con fase general: y = A_e sen(kx) cos(ωt + φ).
- ¿Por qué kx − ωt viaja hacia +x? Para seguir un punto de fase constante, si t aumenta, x también tiene que aumentar.

**Densidades de energía (J/m).**

  u_K = ½ μ (∂y/∂t)² = ½ μω²A_e² · sen²(kx) · sen²(ωt+φ)
  u_U = ½ F (∂y/∂x)² = ½ μω²A_e² · cos²(kx) · cos²(ωt+φ)

- En la segunda se usó F k² = μv²k² = μω², así que las dos tienen el mismo prefactor ½μω²A_e².
- **Cuerda horizontal** (cos(ωt+φ) = 0): u_U = 0 en todos lados y toda la energía es cinética.
- **Máxima elongación** (sen(ωt+φ) = 0): u_K = 0 y toda la energía es elástica.

**Integrales de un tramo.**

  ∫ sen²(kx) dx = x/2 − sen(2kx)/(4k)    ∫ cos²(kx) dx = x/2 + sen(2kx)/(4k)

- Si los dos extremos del tramo caen en nodos o antinodos (múltiplos de λ/4), el término sen(2kx) vale 0 en ambos. Entonces cada integral vale **Δx/2**.
- Aplicado a toda la cuerda: E = ½μω²A_e²·(L/2) = **¼ μω²A_e²L**, constante en el tiempo.

**Energía de un tramo de nodo a antinodo: constante.** La energía de un tramo es

  E_tramo = ½μω²A_e² [ I_s sen²(ωt+φ) + I_c cos²(ωt+φ) ]

con I_s = ∫sen² e I_c = ∫cos². Si I_s = I_c = Δx/2, queda ½μω²A_e²(Δx/2)·(sen² + cos²), que es constante. Físicamente, la potencia que cruza un punto es P = −F ∂y/∂x · ∂y/∂t:

- en un nodo ∂y/∂t = 0;
- en un antinodo ∂y/∂x = 0.

Por los bordes no entra ni sale energía, que solo pasa de cinética a elástica adentro del tramo.

**Saltos de tiempo.** Si Δt es un número entero de períodos, la cuerda está igual que antes. Las energías (sen², cos²) tienen período T/2.

## 4. Resolución paso a paso

**Paso 1: cuerda.**

- μ = m/L = 0,720 kg / 1,8 m = **0,4 kg/m**.
- v = √(F/μ) = √(640/0,4) = √1600 = **40 m/s**.

**Paso 2: armónico (figura).**

- Contando los cruces por el eje de la figura, hay **5 nodos** con el del oscilador (x = 0), y el anillo queda en un antinodo.
- Son 4 medias ondas más un cuarto: L = 9λ/4, o sea, 2n − 1 = 9 ⇒ **n = 5**. En la notación de armónicos impares es el "9º armónico": f = 9f₁.
- λ = 4L/9 = 4·1,8/9 = **0,8 m** ⇒ k = 2π/0,8 = **2,5π rad/m ≈ 7,854 rad/m**.
- f = v/λ = 40/0,8 = **50 Hz** (f₁ = 40/7,2 = 5,556 Hz; 9f₁ = 50 Hz ✓).
- ω = 2πf = **100π rad/s ≈ 314,16 rad/s**; T = 1/f = **0,02 s = 20 ms**.
- Nodos en x = 0; 0,4; 0,8; 1,2; 1,6 m. Antinodos en x = 0,2; 0,6; 1,0; 1,4; 1,8 m (el anillo).

**Paso 3: amplitud (hace falta para b).**

- En t_E la cuerda está horizontal ⇒ U = 0 ⇒ E_total = K = 180 J.
- E = ¼ μω²A_e²L.
- ¼ μω²L = ¼·0,4·(100π)²·1,8 = 17 765 J/m².
- A_e² = 180/17 765 = 0,010132 m² ⇒ **A_e = 0,1007 m ≈ 10,07 cm** (amplitud de la estacionaria en los antinodos).
- Propagante: **A = A_e/2 = 0,0503 m ≈ 5,03 cm**.

**Paso 4: a) energía cinética del tramo en t_A.**

- t_A − t_E = 0,1 s = 0,1/0,02 = **5 T** (períodos enteros) ⇒ en t_A la cuerda vuelve a estar horizontal: U = 0 y toda la energía del tramo es cinética.
- Extremos del tramo: 2k·0,4 = 2π y 2k·1 = 5π, y sen(2π) = sen(5π) = 0. Además, 0,4 m es un nodo y 1 m es un antinodo; el tramo mide 0,6 m = 3λ/4.
- ∫₀,₄¹ sen²(kx) dx = Δx/2 = 0,6/2 = **0,3 m**.
- K_tramo = ½μω²A_e² · 0,3 = 19 739 · 0,010132 · 0,3 = **60 J**.
- Atajo sin la amplitud: K_tramo/K_total = 0,3/(L/2) = 0,3/0,9 = 1/3 ⇒ K_tramo = 180/3 = 60 J.

**Paso 5: a) energía mecánica del tramo en t_B.**

- t_B − t_E = 0,032 s = **1,6 T** ⇒ la fase avanzó 3,2π: la cuerda no está horizontal ni en máxima elongación, así que hay cinética y elástica a la vez.
- **Forma rápida:** el tramo va de un nodo (0,4 m) a un antinodo (1 m), así que I_s = I_c = 0,3 m y su energía es constante. Por eso **E_mec(t_B) = 60 J**, lo mismo que en t_A, donde era toda cinética.
- **Detalle, para el video:**
  - En t_E, cos(ωt_E + φ) = 0 ⇒ ωt_E + φ = π/2 (módulo π).
  - En t_B la fase es π/2 + 3,2π ⇒ sen²(fase) = cos²(3,2π) = cos²(0,2π) = cos²36° = 0,6545 y cos²(fase) = 0,3455.
  - K_B = 60·0,6545 = **39,27 J** y U_B = 60·0,3455 = **20,73 J** ⇒ K_B + U_B = 60 J ✓.

**Paso 6: b) la propagante del oscilador.**

- x = 0,2 m es un antinodo: sen(k·0,2) = sen(π/2) = 1 ⇒ y(0,2; t) = A_e cos(ωt + φ).
- "Máxima posición superior en t = 0" pide cos(φ) = +1 ⇒ **φ = 0**.
- Estacionaria: y = 0,1007 sen(2,5πx) cos(100πt) [m, s].
- Se separa en dos propagantes:

  0,1007 sen(2,5πx) cos(100πt) = 0,0503 sen(2,5πx − 100πt) + 0,0503 sen(2,5πx + 100πt)

- El oscilador está en x = 0 y emite hacia el anillo, o sea, hacia +x. Su onda es la del signo menos:

  **y(x,t) = 0,0503 sen(2,5π x − 100π t)  [m, s]**  (≈ 0,0503 sen(7,854x − 314,2t))

- Formas equivalentes: 0,0503 cos(2,5πx − 100πt − π/2) = 0,0503 sen(100πt − 2,5πx + π).
- **Chequeos:**
  - En x = 0,2 y t = 0 da 0,0503·sen(π/2) = +A: también es un máximo de la propagante sola. Así que, ya sea que la condición "x = 0,2 m arriba en t = 0" se lea sobre la estacionaria o sobre la propagante, el resultado es el mismo y no hay ambigüedad.
  - En t = T/4 la cresta pasó de x = 0,2 a x = 0,4 m: viaja hacia +x ✓.
  - La onda reflejada es 0,0503 sen(2,5πx + 100πt). La suma vale 0 en x = 0 (nodo) y tiene pendiente nula en x = 1,8 m (anillo) ✓.

## 5. Resultados finales

- μ = 0,4 kg/m; v = 40 m/s; fijo–libre con n = 5 (L = 9λ/4); λ = 0,8 m; f = 50 Hz; ω = 100π rad/s; T = 20 ms.
- Amplitud de la estacionaria A_e = 10,07 cm; de la propagante, A = 5,03 cm.
- **a)** K del tramo [0,4; 1] m en t_A: **60 J** (toda la energía es cinética). Energía mecánica del tramo en t_B: **60 J** (K = 39,3 J y U = 20,7 J).
- **b)** **y(x,t) = 0,0503 sen(2,5πx − 100πt)** [m, s].

## 6. Dónde es fácil equivocarse

- **Contar mal el modo.** El anillo es un antinodo, así que no vale L = nλ/2. Hay que contar los nodos, incluido el del oscilador: 5 nodos ⇒ L = 9λ/4. Si se dice "9º armónico" también está bien; lo importante es λ = 0,8 m.
- **Usar 180 J como energía del tramo.** 180 J es la de toda la cuerda; el tramo tiene un tercio.
- **Olvidar que 0,1 s son 5 períodos.** Sin eso no se sabe que en t_A todo es cinética.
- **Creer que en t_B "hay que calcular todo".** Se puede, pero el tramo de nodo a antinodo conserva su energía. Al revés, en un tramo que no termina en nodo o antinodo la energía sí cambia: por ejemplo, en [0,3; 0,5] m pasa de 32,7 J a 7,3 J en un cuarto de período.
- **Confundir sen² y cos².** Con nodo en x = 0, la cinética lleva sen²(kx) y la elástica cos²(kx).
- **La amplitud de la propagante es la mitad.** Escribir 0,1007 en la propagante es el error típico.
- **Signo de la dirección.** La onda del oscilador va hacia +x: kx − ωt (o ωt − kx), nunca kx + ωt.
- **Signo de la fase.** "Máxima posición superior" es y = +A_e, o sea, cos = +1 y no −1.
- **Calculadora en RAD** para ωt y kx. Unidades: 720 g = 0,72 kg.

## 7. Ideas de animación

1. **La cuerda viva.** Oscilador a la izquierda, varilla con el anillo a la derecha y la cuerda vibrando en el modo 5. Aparecen puntos rojos en los nodos y una marca en el anillo (antinodo). Sobre la regla se rellenan 9 "cuartos de onda" de 0,2 m hasta completar L = 1,8 m.
2. **El anillo libre.** Zoom al anillo: la cuerda llega plana, y una flecha de fuerza vertical F·∂y/∂x se achica a cero.
3. **Barras de energía de toda la cuerda.** K y U oscilan con período T/2 y su suma (180 J) queda fija. Se marca el instante horizontal (todo K).
4. **Reloj de fase.** Un fasor que gira: de t_E a t_A da 5 vueltas exactas y vuelve al mismo lugar; de t_E a t_B da 1,6 vueltas y queda en 36° de la horizontal.
5. **Tramo coloreado.** Se resalta [0,4; 1] m sobre la cuerda (nodo → antinodo → nodo → antinodo). Abajo, gráficos de u_K(x) y u_U(x) con el área del tramo sombreada: en t_A toda el área es cinética (60 J); en t_B el área se reparte, 39,3 J y 20,7 J, y aparece un candado con "60 J".
6. **Bordes sin flujo.** En los bordes del tramo, flechas de potencia P = −F ∂y/∂x ∂y/∂t que valen cero: en el nodo, porque no se mueve; en el antinodo, porque la pendiente es nula. Para contrastar, un tramo [0,3; 0,5] m con flechas que sí bombean energía.
7. **Descomposición.** Una onda roja viajando hacia la derecha y una azul hacia la izquierda, cada una de 5 cm, se suman en la estacionaria de 10 cm. En t = 0 se marca la cresta de la roja en x = 0,2 m, y se ve que se corre a 0,4 m en t = T/4.
