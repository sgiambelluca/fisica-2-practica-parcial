# Ond 2 · Estacionaria fijo–fijo: energía elástica de un tramo en otro instante

Origen: examen intermedio 18/10/2025 (tema 1), ejercicio 1 (1 punto). Verificación numérica: `Ond2.py`.

> En una cuerda de longitud L = 1,6 m y masa m = 4 g, con ambos extremos fijos, se forma la onda estacionaria y(t) = A cos(2,5πx) cos(400πt + π/2) [SI]. En el instante t = 5,625 ms, la energía cinética de la cuerda es K = 0,079 J. Calcule la energía elástica U' del tramo [0,2 m; 0,8 m] en t' = 7,5 ms.

---

## 1. Datos y qué se pide

**Datos (en SI)**

| Dato | Valor |
|---|---|
| Largo | L = 1,6 m |
| Masa | m = 4 g = 0,004 kg ⇒ μ = m/L = **0,0025 kg/m** |
| Onda | y(x,t) = A cos(kx) cos(ωt + φ), con k = 2,5π m⁻¹, ω = 400π s⁻¹, φ = π/2 y A desconocida |
| Instante 1 | t = 5,625 ms = 5,625·10⁻³ s; ahí K(toda la cuerda) = 0,079 J |
| Instante 2 | t' = 7,5 ms = 7,5·10⁻³ s |
| Tramo | x ∈ [0,2 m; 0,8 m] |

**Derivados**

| Magnitud | Cuenta | Valor |
|---|---|---|
| Longitud de onda | λ = 2π/k | 0,8 m |
| Frecuencia | f = ω/2π | 200 Hz |
| Período | T = 1/f | 5 ms |
| Velocidad | v = ω/k | 160 m/s |
| Tensión | F = μv² | 64 N |

L = 1,6 m = 4·(λ/2), así que es el **4º armónico** (fijo–fijo con n = 4: 5 nodos contando los extremos).

**Qué se pide.** Un solo ítem: U', la energía elástica (potencial) del tramo [0,2; 0,8] m en t' = 7,5 ms.

## 2. Molde en la hoja (v6)

**Ejercicio más parecido:** el **5, "Estacionaria fijo–fijo: tensión y % de energía" (1C 2025)**, ítem b), junto con la **Receta ondas**, pasos 4 y 5: *"Antes de integrar, mirar la fase temporal: horizontal ⇒ todo cinética; máx. elongación ⇒ toda elástica"* y *"Toda la cuerda: E = ¼μω²A²L"*.

(Este mismo ejercicio estuvo en la hoja v3 como "Estacionaria: energía en dos instantes", con resultado A = 1 cm y U' = 0. Se sacó en la v5.)

**Qué se repite**
- u_U = ½F(∂y/∂x)² y u_K = ½μ(∂y/∂t)².
- Energía total de la cuerda: E = ¼μω²A²L, constante.
- Mirar primero el factor temporal en el instante pedido.

**Qué cambia**
- La función y(x,t) viene dada; no hay que armarla con nodos ni con condiciones iniciales.
- **A es desconocida** y se saca del dato de K en otro instante.
- En el ejercicio 5 el instante pedido era de **máxima elongación**: toda la energía era elástica. Acá t' es un instante en que la cuerda está **horizontal**, así que toda la energía es cinética y U' = 0.

## 3. Teoría que se usa

**Onda estacionaria.**

  y(x,t) = A · [factor espacial] · [factor temporal]

- Todos los puntos oscilan con la misma fase temporal, en fase o en contrafase según el signo del factor espacial.
- Por eso **toda la cuerda pasa por la horizontal en el mismo instante**: cuando cos(ωt + φ) = 0, y = 0 para todo x.
- A es la amplitud de los vientres (antinodos).

**Densidades de energía (energía por metro de cuerda).**
- **Cinética:** cada pedacito de masa μdx se mueve con velocidad ∂y/∂t, así que u_K = ½μ(∂y/∂t)².
- **Elástica:** para inclinarse, el pedacito se estira, y la tensión hace trabajo para estirarlo. Vale u_U = ½F(∂y/∂x)², con F la **tensión** (la cátedra la llama T; no confundirla con el período).

**Las derivadas de esta onda**, con y = A cos(kx) cos(ωt + φ):
- ∂y/∂t = −Aω cos(kx) sen(ωt + φ), así que **u_K = ½μω²A² cos²(kx) sen²(ωt + φ)**.
- ∂y/∂x = −Ak sen(kx) cos(ωt + φ), así que **u_U = ½Fk²A² sen²(kx) cos²(ωt + φ) = ½μω²A² sen²(kx) cos²(ωt + φ)** (porque F = μv² = μω²/k²).

La derivada en x **conserva** el factor temporal cos(ωt + φ); la derivada en t lo cambia por sen(ωt + φ). Por eso:
- **cos(ωt + φ) = 0** ⇒ cuerda horizontal ⇒ U = 0 en **todos** lados (toda la energía es cinética);
- **sen(ωt + φ) = 0** ⇒ máxima elongación ⇒ K = 0 (toda la energía es elástica).

**Energía de toda la cuerda.** Si L es un número entero de medias longitudes de onda, ∫cos²(kx)dx = ∫sen²(kx)dx = L/2. Entonces:

  K(t) = ¼μω²A²L · sen²(ωt + φ),  U(t) = ¼μω²A²L · cos²(ωt + φ),  **E = K + U = ¼μω²A²L** (constante)

**Energía de un tramo.** Se integra la densidad entre los extremos del tramo:

  ∫cos²(kx)dx = x/2 + sen(2kx)/(4k),  ∫sen²(kx)dx = x/2 − sen(2kx)/(4k)

Si el tramo mide un múltiplo de λ/4 y empieza en un nodo o en un vientre, la integral vale Δx/2.

## 4. Resolución paso a paso

### Paso 1. Datos derivados
- μ = 0,004/1,6 = 0,0025 kg/m.
- λ = 2π/(2,5π) = 0,8 m.
- f = 400π/(2π) = 200 Hz, así que T = 5 ms.
- v = ω/k = 160 m/s y F = μv² = 64 N.
- ω² = (400π)² = 1,579·10⁶ s⁻².

### Paso 2. Fase temporal en t = 5,625 ms

  ωt + φ = 400π·0,005625 + π/2 = 2,25π + 0,5π = **2,75π**

sen²(2,75π) = sen²(0,75π) = ½ y cos²(2,75π) = ½. En t la energía está **mitad cinética, mitad elástica**. Contado en períodos: t = 1,125T, un octavo de período después de pasar por la horizontal.

### Paso 3. Energía total y amplitud

  K(t) = E sen²(ωt + φ)  ⇒  E = 0,079/0,5 = **0,158 J**

  E = ¼μω²A²L  ⇒  A² = E/(¼μω²L) = 0,158/(¼ · 0,0025 · 1,579·10⁶ · 1,6) = 0,158/1579,1 = 1,0005·10⁻⁴ m²

  ⇒ **A = 0,0100 m = 1 cm**

### Paso 4. Fase temporal en t' = 7,5 ms (antes de integrar)

  ωt' + φ = 400π·0,0075 + π/2 = 3π + 0,5π = **3,5π**  ⇒  cos(3,5π) = 0, sen²(3,5π) = 1

Entonces y(x, t') = A cos(kx)·0 = 0 para todo x: **la cuerda está horizontal**. Contado en períodos: t' = 1,5T. Con φ = π/2 la cuerda está horizontal en t = 0, T/2, T, 3T/2… y t' = 3T/2 es uno de esos instantes.

### Paso 5. U' del tramo

  ∂y/∂x (x, t') = −Ak sen(kx) cos(3,5π) = 0  ⇒  u_U(x, t') = 0  ⇒  **U' = 0 J**

Hecho con la integral, para que se vea en el examen:

  U' = ½F A²k² cos²(3,5π) ∫₀,₂⁰,⁸ sen²(kx)dx = ½ · 64 · 10⁻⁴ · (2,5π)² · **0** · 0,3 m = 0

No depende del tramo: en t' **toda** la cuerda tiene energía elástica nula.

### Paso 6. Extras (no se piden; sirven para el video y para chequear)
- **En t', toda la energía es cinética.** La cuerda entera tiene K' = E = 0,158 J. El tramo tiene:
  - ½μω²A² = 0,1975 J/m;
  - ∫₀,₂⁰,⁸ cos²(2,5πx)dx = 0,3 m (de 0,2, que es nodo, a 0,8, que es vientre, hay 3λ/4);
  - K'_tramo = 0,1975 · 0,3 · 1 = **0,0593 J ≈ 59 mJ**.
- **En t, el tramo tiene U = K = 0,0296 J.** Entre los dos suman 0,0593 J: lo mismo, porque en este tramo ∫sen² = ∫cos² = 0,3 m.
- `Ond2.py` integra numéricamente: U' ≈ 10⁻³² J (cero numérico), y K(t) = U(t) = 0,0790 J en toda la cuerda.

### Paso 7. Una inconsistencia del enunciado (no cambia nada)
cos(2,5πx) tiene un **vientre** en x = 0, pero el enunciado dice "ambos extremos fijos". Los nodos de cos(2,5πx) están en x = …, 0,2; 0,6; 1,0; 1,4; 1,8 m. Hay dos lecturas posibles:
- el origen de x no está en un extremo, y la cuerda de 1,6 m va de x = 0,2 a x = 1,8 m (o de −0,2 a 1,4 m); en el primer caso, el tramo [0,2; 0,8] empieza justo en el extremo fijo;
- el enunciado tiene un error y la función debería ser con seno.

**Ninguna de las dos cambia el resultado:**
- E = ¼μω²A²L vale igual, porque L es un número entero de medias longitudes de onda. El script lo verifica con [0; 1,6] y con [0,2; 1,8].
- U' = 0 no depende de x.
- En el examen conviene usar la función tal como está dada y, como mucho, comentar la inconsistencia en una línea.

## 5. Resultados finales

- E (toda la cuerda) = 0,158 J; **A = 1 cm**.
- **U' (tramo [0,2; 0,8] m, en t' = 7,5 ms) = 0 J**, porque en t' la cuerda está horizontal (cos(3,5π) = 0).
- Extra: en t', K del tramo = 59 mJ y K de toda la cuerda = 0,158 J.

## 6. Dónde es fácil equivocarse

- **Integrar sin mirar la fase temporal.** Es una cuenta larga que termina en 0, o en un número falso si hay un error de signo o de seno/coseno.
- **Asignar mal sen² y cos² temporales.** u_U lleva el **mismo** factor temporal que y, al cuadrado: cos²(ωt + φ). u_K lleva el cambiado: sen²(ωt + φ). Si se invierten, sale U' máxima en lugar de cero.
- **Unidades.** Pasar ms → s y g → kg. Calculadora en **RAD**: 400π·0,0075 = 3π, no 3.
- **Creer que K = 0,079 J es la energía del tramo.** Es la de **toda la cuerda**.
- **Usar mal el factor de la energía total.** Es E = ¼μω²A²L. La de la propagante, ½μω²A'²L con amplitud A', sirve para otra cosa. Con ½, A sale dividida por √2.
- **Confundir T.** En u_U = ½T(∂y/∂x)², T es la **tensión** (64 N), no el período (5 ms).
- **Pensar que "U' = 0" es un error.** Es el resultado. El dato de K sirve para sacar A, que después no hace falta: hay que justificarlo con "en t' la cuerda está horizontal ⇒ ∂y/∂x = 0 ⇒ u_U = 0".
- **"Arreglar" la función** cambiando cos por sen para que el extremo x = 0 sea nodo: no hace falta, y no cambia el resultado.

## 7. Ideas de animación

1. **La cuerda vibrando** con 5 nodos (4º armónico) y el tramo [0,2; 0,8] pintado de otro color. Debajo, una línea de tiempo marcada en períodos (0, T/2, T, 1,125T, 1,5T).
2. **Instante t = 1,125T.**
   - La cuerda deformada a cos(π/4) ≈ 0,71 de su máximo.
   - Dos barras de energía, K y U, iguales (mitad y mitad).
   - Flechas de velocidad en los vientres y "resortitos" estirados donde la pendiente es grande, cerca de los nodos.
3. **Instante t' = 1,5T.**
   - La cuerda **plana**; la barra de U cae a cero y la de K queda llena.
   - Flechas de velocidad máximas en los vientres (en el tramo: el vientre de x = 0,8 y el de x = 0,4).
   - Texto: "pendiente cero en todos lados ⇒ U = 0".
4. **Gráficos de u_U(x) y u_K(x)** en t y en t'. En t', u_U es una línea plana en cero, y la región sombreada del tramo bajo u_K vale 59 mJ.
5. **Fasor temporal** de ωt + π/2 girando. Marcar 2,75π (a 45° de los ejes: mitad y mitad) y 3,5π (vertical: cos = 0).
