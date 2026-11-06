# Ond 6 · Propagante en una cuerda fija–fija: estacionaria, energía y se libera un extremo

Origen: 1P 28/9/2019, ejercicio 1 (casi igual al 1P 1C 2016). Verificación numérica: `Ond6.py`.

## 1. Datos y qué se pide

| Dato | Valor | SI |
|---|---|---|
| Masa de la cuerda | 15 g | m = 0,015 kg |
| Tensión | 36 N | T = 36 N |
| Extremos | fijo–fijo | — |
| Onda propagante | y = A cos(kx − ωt) | — |
| Amplitud | A = 2,3 mm | 2,3·10⁻³ m |
| Número de onda | k = 2π m⁻¹ | 2π m⁻¹ |
| Frecuencia angular | ω = 120π s⁻¹ | 120π s⁻¹ |
| Instantes | t' = 25 ms, t'' = 12,5 ms | 0,025 s, 0,0125 s |
| Tramo | [0,5 m ; 1,25 m] | — |

El largo L **no es dato**: hay que sacarlo de la masa y de μ.

Qué se pide:

- **a)** La expresión de la onda estacionaria, sabiendo que en t = 0 la cuerda está horizontal. ¿En qué armónico vibra?
- **b)** El gráfico de la densidad de energía cinética a lo largo de la cuerda en t' = 25 ms, con las escalas.
- **c)** La energía potencial elástica del tramo [0,5 ; 1,25] m en t'' = 12,5 ms.
- **d)** Si se libera un extremo, ¿lo que queda es una estacionaria? Si lo es, ¿en qué armónico?

## 2. Molde en la hoja

Se parece sobre todo al **ejercicio 5 de la hoja v6, "Estacionaria fijo–fijo: tensión y % de energía" (1C 2025)**, completado con los ejercicios **7** y **6**.

Del ejercicio 5 se repite la estructura:

- identificar el armónico con L = nλ/2;
- escribir y = A sen(kx)·(…), porque x = 0 es un nodo;
- usar "horizontal en t = 0" ⇒ sen(ωt);
- calcular la energía de un tramo integrando cos² o sen², y ver que da Δx/2 cuando el tramo abarca cuartos de onda enteros;
- un último ítem sobre lo que pasa si un extremo queda libre.

Del ejercicio 7, "Propagante → estacionaria", y del 6: los datos vienen como una **propagante** (A, k, ω), así que la estacionaria tiene amplitud **2A**.

Qué cambia:

- L no es dato: sale de μ = T/v² y L = m/μ.
- Se pide graficar u_K **en función de x**, en un instante fijo. En los ejercicios 6 y 7 de la hoja era en función de t, en un punto.
- En d) la frecuencia **queda fija**: es la misma onda. En el ejercicio 5 c) daban los nodos y pedían la nueva frecuencia; acá hay que ver si L encaja en la condición fijo–libre, y no encaja.

## 3. Teoría que se usa

**Velocidad, μ y largo.** La velocidad sale de la tensión y de la densidad lineal: v = √(T/μ). También sale de la onda: v = ω/k = λf. Igualando, μ = T/v². Con la masa total: L = m/μ.

**De propagante a estacionaria.** La onda que manda la fuente, y₁ = A cos(kx − ωt), se refleja en el extremo fijo **invertida** (el extremo no puede moverse) y vuelve: y₂ = −A cos(kx + ωt). La suma es:

y = A[cos(kx − ωt) − cos(kx + ωt)] = **2A sen(kx) sen(ωt)**

(se usa cos a − cos b = −2 sen((a+b)/2) sen((a−b)/2)).

- Vale 0 en x = 0 para todo t: es un **nodo**.
- Vale 0 en t = 0 para todo x: la cuerda está horizontal.
- La amplitud en los vientres es **2A**, el doble de la de la propagante.
- La forma general es y = 2A sen(kx) cos(ωt + φ). "Horizontal en t = 0" pide cos φ = 0, o sea φ = ±π/2, y queda ±2A sen(kx) sen(ωt).

**Armónico fijo–fijo.** Tiene que haber nodos en x = 0 y en x = L, así que sen(kL) = 0. Eso da L = nλ/2, o sea n = 2L/λ. Los nodos están en x = pλ/2.

**Densidades de energía.**

- Cinética: u_K = ½ μ (∂y/∂t)². Es la energía de movimiento de cada pedacito: ½(μ dx)v².
- Elástica: u_U = ½ T (∂y/∂x)². Es la energía por estirar la cuerda, y crece con la pendiente.

Con y = 2A sen(kx) sen(ωt), y usando T k² = μ ω² (porque v² = T/μ = ω²/k²):

- u_K = ½ μ ω² (2A)² **sen²(kx) cos²(ωt)**: máxima en los vientres, cuando la cuerda pasa por la posición horizontal.
- u_U = ½ μ ω² (2A)² **cos²(kx) sen²(ωt)**: máxima en los nodos (donde la pendiente es mayor), cuando la cuerda está en su máxima elongación.

Entonces:

- si sen(ωt) = 0, la cuerda está horizontal y toda la energía es cinética;
- si cos(ωt) = 0, la cuerda está en su máxima elongación, quieta, y toda la energía es elástica.

**Integrales.**

- ∫cos²(kx)dx = x/2 + sen(2kx)/(4k)
- ∫sen²(kx)dx = x/2 − sen(2kx)/(4k)

Si el tramo empieza y termina en nodos o vientres, abarca un número entero de λ/4 y el término del seno se anula: la integral vale Δx/2. La energía de toda la cuerda es E = ¼ μ ω² (2A)² L, y es constante.

**Fijo–libre.** En el extremo libre tiene que haber un vientre, así que L = (2n−1)λ/4: un número **impar** de cuartos de onda. Las frecuencias propias son f = (2n−1)·v/(4L), solo los múltiplos impares de v/(4L).

Al soltar un extremo, la fuente sigue con la misma f. Con la misma tensión y la misma μ, v no cambia, así que λ tampoco. **Hay estacionaria solo si 4L/λ es impar.**

## 4. Resolución paso a paso

**Paso 0: datos derivados.**

- v = ω/k = 120π / 2π = **60 m/s**
- μ = T/v² = 36/3600 = **0,01 kg/m**
- L = m/μ = 0,015 / 0,01 = **1,5 m**
- λ = 2π/k = **1 m**
- f = ω/2π = **60 Hz**, y el período es 1/60 s = 16,67 ms

**a) Estacionaria y armónico.**

- n = 2L/λ = 2 · 1,5 / 1 = **3**: **tercer armónico**. Chequeo: f₁ = v/(2L) = 20 Hz y f = 3f₁ = 60 Hz.
- Amplitud: 2A = 2 · 2,3 = **4,6 mm**.
- Con el nodo en x = 0 y la cuerda horizontal en t = 0:

  **y(x,t) = 4,6 mm · sen(2πx) · sen(120πt)**   (x en m, t en s)

- Nodos en x = 0; 0,5; 1; 1,5 m. Vientres en 0,25; 0,75; 1,25 m.
- (También vale con el signo opuesto, −4,6 mm sen(2πx) sen(120πt). Es la otra fase posible, φ = +π/2.)

**b) u_K(x) en t' = 25 ms.**

- ωt' = 120π · 0,025 = **3π** ⇒ sen(3π) = 0: la cuerda está horizontal, y cos²(3π) = 1: todos los puntos tienen su velocidad máxima. **Toda la energía es cinética.**
- u_K(x, t') = ½ μ (2Aω)² sen²(kx) cos²(3π)
- (2Aω)² = (0,0046 · 120π)² = 1,734² = 3,007 m²/s²
- u_K(x, t') = ½ · 0,01 · 3,007 · sen²(2πx) = **0,01504 J/m · sen²(2πx)** = 15,0 mJ/m · sen²(2πx)

Cómo es el gráfico, entre 0 y 1,5 m:

- tres "lomas" iguales, cada una de largo λ/2 = 0,5 m;
- ceros en los nodos: 0; 0,5; 1; 1,5 m;
- máximos de **15,0 mJ/m** en los vientres: 0,25; 0,75; 1,25 m;
- a mitad de camino, en 0,125 m, 0,375 m, etc., vale 7,52 mJ/m.

Escalas sugeridas: horizontal 1 cm = 0,1 m (15 cm de gráfico); vertical 1 cm = 2 mJ/m (7,5 cm hasta el máximo).

Chequeo: el área bajo la curva es 15,04 · 1,5/2 = 11,28 mJ, que es la energía total E = ¼ μ ω² (2A)² L = **11,28 mJ** ✓.

**c) Energía elástica del tramo [0,5 ; 1,25] m en t'' = 12,5 ms.**

- ωt'' = 120π · 0,0125 = **1,5π** ⇒ sen²(1,5π) = 1: la cuerda está en su máxima elongación, quieta. **Toda la energía es elástica.**
- u_U(x, t'') = ½ T (2Ak)² cos²(kx) = ½ · 36 · (0,0046 · 2π)² cos²(2πx) = **0,01504 J/m · cos²(2πx)**. Es el mismo coeficiente que en b), porque Tk² = μω².
- E_U = 0,01504 · ∫ de 0,5 a 1,25 de cos²(2πx) dx = 0,01504 · [x/2 + sen(4πx)/(8π)] entre 0,5 y 1,25
- = 0,01504 · (0,625 − 0,25 + (sen 5π − sen 2π)/(8π)) = 0,01504 · 0,375
- **E_U = 5,64·10⁻³ J = 5,64 mJ**

Atajo: el tramo va de un nodo de y (x = 0,5) a un vientre (x = 1,25) y mide 0,75 m = 3·(λ/4). Son cuartos de onda enteros, así que la integral vale Δx/2 = 0,375 m. Es justo el **50 %** de la energía total, porque el tramo es media cuerda.

**d) Se libera un extremo.**

- La cuerda pasa a ser fijo–libre: el extremo suelto se modela como un anillo sin masa en una varilla sin rozamiento, así que la tensión no cambia.
- La fuente sigue en 60 Hz, con v = 60 m/s, así que λ sigue siendo 1 m.
- La condición fijo–libre pide L = (2n−1)λ/4 ⇒ 4L/λ = 4 · 1,5 / 1 = **6**, que es **par**.
- **No es una onda estacionaria.** El extremo libre necesita un vientre, pero con λ = 1 m en x = 1,5 m cae un nodo (sen(2π·1,5) = 0).
- Visto con frecuencias: los modos fijo–libre de esta cuerda son (2n−1)·v/(4L) = (2n−1)·10 Hz, o sea 10, 30, 50, 70, … Hz. 60 Hz sería el "6º", que no existe porque solo hay armónicos impares. Los modos más cercanos son 50 Hz (5º armónico) y 70 Hz (7º).
- (Con λ = 1 m, servirían largos de 0,25; 0,75; 1,25; 1,75 m…)

## 5. Resultados finales

- v = 60 m/s, μ = 0,01 kg/m, L = 1,5 m, λ = 1 m, f = 60 Hz.
- **a)** y(x,t) = 4,6 mm · sen(2πx) sen(120πt): **3er armónico**.
- **b)** u_K(x, 25 ms) = 15,0 mJ/m · sen²(2πx): tres lomas, máximos de 15,0 mJ/m en x = 0,25; 0,75; 1,25 m y ceros en los nodos. Toda la energía (11,28 mJ) es cinética.
- **c)** E_U[0,5 ; 1,25] (12,5 ms) = **5,64 mJ** (50 % del total).
- **d)** **No** es estacionaria: 4L/λ = 6 es par. Los modos fijo–libre son 10, 30, 50, 70… Hz, y 60 Hz no está entre ellos.

## 6. Dónde es fácil equivocarse

- **Usar A en lugar de 2A.** La estacionaria tiene amplitud 2A = 4,6 mm. Con A, todas las energías salen 4 veces más chicas: 3,76 mJ/m y 1,41 mJ.
- **No calcular L.** No es dato. Sale de μ = T/v² = 0,01 kg/m y L = m/μ = 1,5 m. Ojo con los gramos: hay que pasarlos a kg.
- **Escribir y = 2A sen(kx) cos(ωt).** Esa no es horizontal en t = 0. Con esa expresión, en t' daría u_K = 0, que está mal.
- **Calculadora en DEG.** 120π · 0,025 = 3π va en radianes.
- **Elegir mal sen² o cos².** u_K va con sen²(kx) porque se anula en los nodos. u_U va con cos²(kx) porque es máxima en los nodos. En c), por casualidad, ∫sen² y ∫cos² dan lo mismo (0,375), porque el tramo abarca cuartos de onda enteros. El número sale igual, pero el razonamiento tiene que estar bien.
- **No mirar el factor temporal.** En t' = 25 ms toda la energía es cinética, y en t'' = 12,5 ms toda es elástica. Si en c) uno se olvida de sen²(ωt''), igual da bien porque vale 1, pero hay que justificarlo.
- **En d), contestar "sí, 6º armónico".** La fórmula fijo–libre usa cuartos de onda **impares**. Tampoco hay que recalcular la frecuencia como si la cuerda pudiera elegirla: la fuente sigue en 60 Hz.
- **Escalas del gráfico.** La cátedra las pide explícitas en los dos ejes y con unidades: J/m o mJ/m, y m.

## 7. Ideas de animación

1. **Superposición.** La propagante que sale hacia la derecha (azul) y la reflejada invertida que vuelve (roja). La suma (negra) forma tres lomas fijas, con los nodos marcados como puntos que no se mueven. Un rótulo "amplitud 2A = 4,6 mm" señala un vientre.
2. **Datos que faltan.** Una "cadena" de fórmulas que se va llenando: ω/k → v = 60 → μ = T/v² = 0,01 → L = m/μ = 1,5 m. Con L, la cuerda se dibuja a escala y entran justo 3 medias longitudes de onda.
3. **Reloj de fase.** Un círculo con el ángulo ωt y la cuerda animada al lado:
   - en t = 0, horizontal;
   - en 12,5 ms (1,5π), máxima elongación, congelar;
   - en 25 ms (3π), horizontal otra vez, con flechas de velocidad máximas en los vientres.
4. **b) Gráfico de u_K(x).** Debajo de la cuerda congelada en t', la curva u_K(x) se dibuja de izquierda a derecha. Los picos quedan alineados con los vientres y los ceros con los nodos. Las escalas aparecen sobre los ejes.
5. **c) Área sombreada.** Sobre u_U(x) = 15 cos²(2πx) mJ/m, sombrear de 0,5 a 1,25 m. Partir el intervalo en 3 cuartos de onda y mostrar que el área es la mitad del rectángulo de altura 15,04 y base 0,75: 5,64 mJ.
6. **d) Se suelta el extremo.** El extremo derecho pasa a ser un anillo en una varilla. Superponer la forma que haría falta (vientre en x = L) con la que da λ = 1 m (nodo en x = 1,5): no encajan. Al lado, una regla con los largos permitidos 0,25; 0,75; 1,25; 1,75 m, y 1,5 m marcado en rojo entre 1,25 y 1,75.
