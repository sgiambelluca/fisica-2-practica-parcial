# Osc 5 · Forzado: ω_RA, ω_RP y A(0); después cesa la fuerza

Fuente: 1P 1C 2016, ejercicio 4. Verificado con `Osc5.py`.

## 1. Datos y qué se pide

**Datos**

| Dato | Valor | En SI |
|---|---|---|
| Fuerza | F(t) = F₀ cos(ωt) (no dan F₀) | — |
| Resonancia de amplitud | ω_RA = 3,99 s⁻¹ | 3,99 rad/s |
| Resonancia de potencia | ω_RP = 4 s⁻¹ | 4 rad/s |
| Amplitud estática | A₀ = A(ω = 0) = 4 cm | 0,04 m |

No dan m, k, b ni F₀, y no hacen falta: todo sale en cocientes (γ, F₀/m).

**Qué se pide**

- **a)** La máxima amplitud que puede alcanzar el sistema en régimen estacionario ("una vez superado el régimen transitorio").
- **b)** En cierto momento cesa la fuerza: cuánto tiempo pasa desde ese momento hasta que la energía disminuye un 70%.

## 2. Molde en la hoja

**Ejercicio 3 de la v6** ("Forzado: Q, ancho de banda, estacionario", Recu 30/5/26). Su nota final es justamente este ejercicio: *"Si cesa la fuerza: E = E₀e^{−2γt} (cae 70% ⇒ 0,3 = e^{−2γt}). Si dan ω_RA y ω_RP: ω₀ = ω_RP, ω_RA² = ω₀² − 2γ²; A(0) = F₀/(mω₀²)."* También sirve el bloque "Resonancia de amplitud" de la **Receta oscilaciones**: A_max = F₀/(bω').

- **Se repite:**
  - ω₀ sale de la resonancia de potencia;
  - con ω₀ y un segundo dato se saca γ;
  - la amplitud estacionaria se calcula con A(ω);
  - al cesar la fuerza, la energía decae como e^{−2γt}.
- **Cambia:**
  - En el ej. 3, γ salía de la energía perdida en 2 ciclos. Acá sale de la diferencia entre ω_RA y ω_RP.
  - No dan m ni F₀, sino A(0), que da directamente F₀/m.
  - Piden la amplitud en ω_RA (máxima amplitud), no en ω₀.
- El paso b) es el "cambio de régimen forzado → libre" del **ejercicio 4**: al sacar la fuerza sigue libre amortiguado con el mismo γ. Acá solo importa cómo decae la energía, no hacen falta las constantes.

## 3. Teoría que se usa

**Ecuación del forzado.** m ẍ + b ẋ + k x = F₀ cos(ωt). Dividiendo por m:

  ẍ + 2γ ẋ + ω₀² x = (F₀/m) cos(ωt), con γ = b/(2m) y ω₀² = k/m.

La solución es la suma de dos partes:

- un **transitorio**, que es la oscilación libre amortiguada y se apaga como e^{−γt};
- un **estacionario**, x = A(ω) cos(ωt − δ), que oscila a la frecuencia de la fuerza.

"Superado el régimen transitorio" quiere decir que solo queda el estacionario.

**Amplitud estacionaria.**

  A(ω) = (F₀/m) / √[(ω₀² − ω²)² + 4γ²ω²]

- **De dónde sale:** al reemplazar x = A cos(ωt − δ) en la ecuación aparecen dos términos a 90° entre sí. Uno es (ω₀² − ω²)A (resorte menos inercia) y el otro es 2γωA (rozamiento). Su suma vectorial tiene que dar F₀/m: es Pitágoras.
- **ω = 0** (fuerza constante): A(0) = (F₀/m)/ω₀² = F₀/k. Es Hooke: el resorte se estira F₀/k y se queda quieto. Por eso el dato **A(0) da F₀/m = A(0)·ω₀²**.

**Las tres frecuencias "parecidas a ω₀" (no confundirlas).**

| Nombre | Fórmula | Qué es |
|---|---|---|
| ω₀ | √(k/m) | natural, y también la de **resonancia de potencia** (ω_RP = ω₀) |
| ω' | √(ω₀² − γ²) | con la que oscila el sistema **libre** amortiguado |
| ω_RA | √(ω₀² − 2γ²) | la de **máxima amplitud** del forzado |

Quedan ordenadas así: ω_RA < ω' < ω₀.

- **Por qué ω_RA = √(ω₀² − 2γ²):** A(ω) es máxima donde el radicando g(u) = (ω₀² − u)² + 4γ²u (con u = ω²) es mínimo. g'(u) = −2(ω₀² − u) + 4γ² = 0 ⇒ u = ω₀² − 2γ².
- **Amplitud máxima.** Reemplazando ω_RA, el radicando queda 4γ²(ω₀² − γ²) = 4γ²ω'². Entonces **A_max = (F₀/m)/(2γω') = F₀/(bω')**.
- **Por qué ω_RP = ω₀:** la potencia media es ⟨P⟩ = ½ b ω² A², y es máxima justo en ω₀. Ahí la fuerza está en fase con la velocidad (δ = π/2).

**Factor de calidad.** Q = ω₀/(2γ). Si Q ≫ 1, A_max ≈ Q·A(0). Es un buen control: la amplitud máxima es "Q veces" la estática.

**Cuando cesa la fuerza.**

- El sistema sigue como oscilador libre amortiguado, con el mismo m, b y k, y por lo tanto el mismo γ: x = C e^{−γt} cos(ω't + φ).
- La energía es proporcional al cuadrado de la amplitud: E ∝ (C e^{−γt})² ⇒ **E(t) = E₀ e^{−2γt}**. El 2 sale de elevar al cuadrado: la amplitud decae con γ y la energía con 2γ.
- Estrictamente, esto es la energía promediada en un ciclo, es decir, la envolvente. Con Q ≈ 10 es una aproximación excelente.
- No importa en qué instante se corta la fuerza: se pide una fracción de la energía que había en ese momento.
- "Disminuya 70%" quiere decir que pierde el 70% y queda el 30%: e^{−2γt} = 0,3.

## 4. Resolución paso a paso

**Paso 1: ω₀.** Resonancia de potencia ⇒ ω₀ = ω_RP = 4 s⁻¹ (ω₀² = 16 s⁻²).

**Paso 2: γ.** De la resonancia de amplitud:

  ω_RA² = ω₀² − 2γ² ⇒ γ² = (ω₀² − ω_RA²)/2
  ω_RA² = 3,99² = 15,9201 s⁻² (hay que usar todos los decimales: la resta es chica)
  γ² = (16 − 15,9201)/2 = 0,0799/2 = 0,03995 s⁻²
  **γ = 0,19987 s⁻¹ ≈ 0,200 s⁻¹**

**Paso 3: ω'.** ω' = √(ω₀² − γ²) = √(16 − 0,03995) = √15,96005 = 3,99500 s⁻¹.

**Paso 4: F₀/m.** A(0) = (F₀/m)/ω₀² ⇒ F₀/m = A₀ ω₀² = 0,04 m · 16 s⁻² = **0,64 m/s²**.

**a) Amplitud máxima.** Es la amplitud estacionaria cuando se fuerza en ω_RA:

  A_max = (F₀/m)/(2γω') = 0,64 / (2 · 0,19987 · 3,995) = 0,64 / 1,59700 = **0,4008 m ≈ 40,1 cm**

Se puede chequear reemplazando directo en A(ω_RA):

- (ω₀² − ω_RA²)² = 0,0799² = 0,006384;
- 4γ²ω_RA² = 4 · 0,03995 · 15,9201 = 2,544032;
- la suma da 2,550416, y su raíz 1,59700: lo mismo.

Control con Q: Q = ω₀/(2γ) = 4/0,39975 = 10,006. Entonces Q·A₀ = 40,03 cm ≈ A_max ✓. La amplitud máxima es unas 10 veces la estática.

**b) Cesa la fuerza.** Queda el 30% de la energía:

  E = E₀ e^{−2γt} ⇒ e^{−2γt} = 0,3 ⇒ t = ln(1/0,3)/(2γ)
  t = 1,20397 / (2 · 0,19987) = 1,20397 / 0,39975 = **3,01 s**

**Interpretaciones de "disminuya 70%".**

- **Pierde el 70% (queda el 30%):** t = 3,01 s. Es la más probable, y es la que usa la nota del ej. 3 de la hoja.
- **Baja *hasta* el 70% (queda el 70%):** t = ln(1/0,7)/(2γ) = 0,3567/0,39975 = 0,892 s. Gramaticalmente es menos natural ("disminuir un 70%" es perder el 70%).

**Detalle fino**, que no hace falta en el examen. La energía exacta, ½mv² + ½kx², no baja en forma pareja: baja "a escalones", porque se disipa más cuando la velocidad es grande. Si se corta la fuerza en un máximo de elongación, una simulación da que E/E₀ pasa por primera vez el 0,3 en t ≈ 2,90 s. Promediada en un ciclo alrededor de 3,01 s, vale 0,31·E₀. La cátedra usa la envolvente e^{−2γt}, o sea 3,01 s.

## 5. Resultados finales

- ω₀ = 4 s⁻¹; γ = 0,200 s⁻¹ (γ² = 0,03995 s⁻²); ω' = 3,995 s⁻¹; F₀/m = 0,64 m/s²; Q ≈ 10,0.
- **a)** A_max = (F₀/m)/(2γω') ≈ **0,401 m = 40,1 cm**, forzando en ω = ω_RA = 3,99 s⁻¹.
- **b)** t = ln(1/0,3)/(2γ) ≈ **3,01 s**. Con la interpretación "queda el 70%" serían 0,89 s.

## 6. Dónde es fácil equivocarse

- **Confundir cuál resonancia es ω₀:** ω₀ es la de **potencia** (4 s⁻¹), no la de amplitud.
- **Usar ω_RA² = ω₀² − γ²**, que es ω' de la oscilación libre. Así sale γ² = 0,0799 y γ = 0,283 s⁻¹: un factor √2 de más.
- **Redondear 3,99² a 16** o perder decimales en la resta. Con la diferencia 16 − 15,9201 = 0,0799 se calcula todo γ: hay que guardarla completa.
- **Creer que A(0) es F₀/m.** A(0) = F₀/k = (F₀/m)/ω₀². Si se olvida el ω₀², sale F₀/m = 0,04 y A_max = 2,5 cm, menor que la estática: absurdo.
- **Calcular la amplitud en ω₀ y no en ω_RA.** A(ω₀) = (F₀/m)/(2γω₀) = 40,03 cm. Acá casi coincide porque Q es alto, pero conceptualmente la máxima está en ω_RA y vale F₀/(bω').
- **Usar e^{−γt} para la energía** (esa es la amplitud): da t = 6,02 s, el doble.
- **Tomar "disminuye 70%" como "queda 70%".**
- **No pasar 4 cm a 0,04 m.** Control final: A_max tiene que ser mayor que A(0) y parecido a Q·A(0).

## 7. Ideas de animación

1. **Curva A(ω)** de 0 a 8 s⁻¹:
   - un punto en ω = 0 con A = 4 cm;
   - un pico angosto cerca de 4 s⁻¹ con A ≈ 40 cm;
   - un zoom al pico con una línea vertical en ω_RA = 3,99 y otra en ω₀ = 4, para mostrar que el máximo de amplitud está apenas a la izquierda;
   - al lado, la curva ⟨P⟩(ω) con el pico exactamente en ω₀.
2. **Recta de frecuencias:** ω_RA < ω' < ω₀, con flechas que digan "−2γ²" y "−γ²" (en los cuadrados).
3. **Diagrama de fasores** para A(ω): un triángulo rectángulo con catetos (ω₀² − ω²)A y 2γωA, e hipotenusa F₀/m. En ω = 0 el triángulo se aplasta y queda A = (F₀/m)/ω₀².
4. **Masa–resorte–amortiguador:**
   - se fuerza en ω_RA: la amplitud crece durante el transitorio y se estabiliza en 40 cm;
   - "se apaga la fuerza": la oscilación decae dentro de una envolvente ±C e^{−γt};
   - una barra de energía baja y marca el 30% en t ≈ 3 s.
5. **Gráfico E/E₀ = e^{−2γt}** con la recta horizontal en 0,3 y el cruce en 3,01 s. Superponer la amplitud e^{−γt}, que cruza mucho más tarde, para remarcar el factor 2.
