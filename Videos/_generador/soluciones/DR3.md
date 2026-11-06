# DR 3 · Doble rendija sumergida, oblicua, lámina + gota de aire (2P 11/11/2023, ej. 1)

Verificado con `DR3.py`: fórmulas de la cátedra y, aparte, una suma numérica de los campos de cada rendija.

## 1. Datos y qué se pide

Todo el dispositivo (haz incidente, placa con rendijas y espacio hasta la pantalla) está dentro de un líquido.

| Dato | Valor (SI) |
|---|---|
| Índice del líquido | n_L = 1,2 (incide en el líquido y la luz sigue en el líquido) |
| Ancho de cada rendija | a = 2,25 µm = 2,25·10⁻⁶ m |
| Separación entre rendijas | d = 6 µm = 6·10⁻⁶ m |
| Longitud de onda en el vacío | λ₀ = 600 nm = 0,6 µm = 6·10⁻⁷ m |
| Lámina frente a la rendija **superior** | espesor e = 4 µm, índice n = 1,5 |
| Gota de aire frente a la **otra** rendija (inferior) | diámetro 3e = 12 µm, índice 1 |
| Ángulo de incidencia | α, desconocido (positivo antihorario) |
| Condición | con la lámina y la gota, el **orden 0 queda en el centro de la pantalla** (θ = 0) |
| Intensidad de referencia | I₀ = 1 W/m² |

Qué se pide:

- El ángulo de incidencia α.
- La intensidad en el centro de la pantalla.

## 2. Molde en la hoja (v6)

- **Ej. 16 · Doble rendija: dos láminas + incidencia oblicua (Recu 7/6/25).** Es el molde de la estructura: las láminas corren el orden 0 y se inclina el haz para devolverlo al centro (n_i d sen θ_i = lo que agregan las láminas). Después, I en el centro con cos²γ = 1 y un β que **no es cero**, porque incluye sen θ_i.
  - Lo que se repite: la regla "el haz llega primero a la rendija de la lámina que agrega más" y el cálculo de β con el ángulo de incidencia.
  - Lo que cambia: acá todo está **sumergido** (n_L multiplica a d sen α y a β, y las láminas restan n_L), y uno de los dos "agregados" es una gota de aire, que **resta** camino óptico. En el ej. 16 β daba −π e I = 0; acá β = 9π/4 e I ≠ 0.
- **Ej. 18 · Cámara de aceite + gota de aire (1C 2025).** De ahí sale cómo tratar la gota: cambia líquido por aire en un espesor igual a su diámetro, con un aporte de (diámetro)·(1 − n_medio) < 0. Allá la gota estaba en la misma rendija que la cámara; acá está en la otra.

## 3. Teoría que se usa

**Camino óptico.** La fase que acumula la luz depende de CO = n · (longitud). Dos rayos que llegan al mismo punto con una diferencia ΔCO tienen una diferencia de fase Δφ = (2π/λ₀)·ΔCO. Con λ₀ de vacío, porque los n ya están dentro de CO.

**Diferencia de camino en la doble rendija.** Rendija superior en y = +d/2, inferior en y = −d/2, ángulos positivos antihorarios. Se toma ΔCO = CO(inferior) − CO(superior):

  ΔCO = n_L d sen θ − n_L d sen α + [aportes en la inferior] − [aportes en la superior]

- **n_L d sen θ** (después de las rendijas): hacia un punto de la pantalla en θ > 0 (arriba), el rayo de la rendija de abajo recorre d sen θ más.
- **−n_L d sen α** (antes de las rendijas): si el haz sube (α > 0), llega primero a la rendija de abajo, y es el de arriba el que recorre d sen α más. Con α < 0 (el haz baja) es al revés.
- **Láminas:** una lámina de espesor e cambia medio por lámina en ese tramo y suma **e(n_lámina − n_medio)**. La gota de aire suma 3e(1 − n_L), que es **negativo**: en aire la luz "va más rápido" y acumula menos fase.

**Orden 0.** Es el punto donde ΔCO = 0: los dos caminos ópticos son iguales. "Orden 0 en el centro" ⇒ ΔCO(θ = 0) = 0.

Regla práctica: el orden 0 se corre hacia el lado de la rendija que tiene más camino óptico agregado. Para traerlo al centro hay que inclinar el haz para que llegue **primero** a esa rendija.

**Intensidad.** I = 4I₀ cos²γ (sen β/β)².

- γ = πΔCO/λ₀ es la interferencia **entre** las rendijas: usa d, el ángulo de incidencia y las láminas.
- β = (πa/λ₀)(n senθ − n_i sen θ_i) es la difracción **dentro** de cada rendija: usa a y el ángulo de incidencia.
- Las láminas **no** entran en β, porque cubren toda la rendija y le suman la misma fase a cada punto. La inclinación **sí** entra: con incidencia oblicua, cada punto de la rendija recibe la onda con un retraso distinto.
- El máximo de la envolvente (β = 0) apunta en la dirección del haz incidente (sen θ = sen α), **no** al centro de la pantalla.

## 4. Resolución paso a paso

### Aportes de la lámina y de la gota

- Lámina (rendija superior): e(n − n_L) = 4 · (1,5 − 1,2) = **+1,2 µm**.
- Gota de aire (rendija inferior): 3e(1 − n_L) = 12 · (1 − 1,2) = **−2,4 µm**.

Los dos efectos van para el mismo lado: el camino de arriba tiene 1,2 µm de más y el de abajo, 2,4 µm de menos. La rendija superior queda "atrasada" 3,6 µm = **6λ₀**. Con incidencia normal, el orden 0 se habría corrido 6 franjas hacia arriba.

### Ángulo de incidencia

**Planteo.** Orden 0 en el centro ⇒ ΔCO(θ = 0) = 0:

  n_L d sen 0 − n_L d sen α + 3e(1 − n_L) − e(n − n_L) = 0

**Reemplazo.** −1,2 · 6 · sen α + (−2,4) − 1,2 = 0 ⇒ sen α = (−2,4 − 1,2)/(1,2 · 6) = −3,6/7,2 = **−0,5**

**Resultado:** **α = −30°**: 30° en sentido horario. El haz baja (viene de arriba a la izquierda) y llega primero a la rendija superior, la de la lámina. Así el rayo de abajo recorre n_L d |sen α| = 3,6 µm más antes de la placa y compensa exactamente.

Chequeo de signo: con α = +30°, ΔCO(0) = −7,2 µm = −12λ₀, y en el centro caería el orden −12, no el 0. La resolución del alumno da lo mismo, −30° ("inciden de arriba hacia abajo").

### Intensidad en el centro

1. **Interferencia.** En θ = 0, ΔCO = 0 (es el orden 0) ⇒ γ = 0 ⇒ cos²γ = 1.
2. **Difracción.** β = (πa/λ₀)(n_L sen 0 − n_L sen α) = (π · 2,25/0,6) · (0 − 1,2 · (−0,5)) = 3,75π · 0,6 = **2,25π = 9π/4** (7,069 rad).
   sen(9π/4) = sen(π/4) = √2/2 = 0,7071 ⇒ (sen β/β)² = 0,5/(9π/4)² = 8/(81π²) = **0,010007**.
3. **I(centro) = 4 · 1 W/m² · 1 · 0,010007 = 0,0400 W/m² ≈ 0,04 W/m²**.

Interpretación: en el centro hay una franja brillante, la del orden 0, pero la envolvente de difracción está centrada en la dirección del haz (θ = −30°). El centro cae en β = 2,25π, entre el 2º cero de la envolvente (2π) y el 3º (3π), en un lóbulo lateral. Por eso tiene solo el 1 % del máximo posible (4 W/m²).

La suma numérica de los campos (`.py`) da 0,04003 W/m² en θ = 0 y 4,000 W/m² en θ = −30°. Coincide con la resolución del alumno (0,04 W/m²).

## 5. Resultados finales

- **α = −30°**: 30° en sentido horario; el haz baja y llega primero a la rendija de la lámina.
- **I(centro) = 32/(81π²) W/m² ≈ 0,040 W/m²**, con γ = 0 y β = 9π/4.

## 6. Dónde es fácil equivocarse

- **Lámina sumergida.** Lleva (n − n_L), no (n − 1). Con 0,5 en lugar de 0,3 sale α = −37,7°.
- **Signo de la gota.** La gota de aire resta camino: 3e(1 − n_L) = −2,4 µm. Con el signo cambiado sale α = +9,6°.
- **Espesor de la gota.** Es su diámetro, 3e = 12 µm, no e. Con e sale α = −16,1°.
- **n_L en la parte de incidencia.** El haz incide en el líquido: el término es n_L d sen α. Sin n_L sale sen α = −0,6 y α = −36,9°.
- **Signo de α.** Va con la convención antihoraria. Las dos correcciones atrasan a la rendija superior, así que el haz tiene que llegar antes a ella: tiene que bajar, α < 0. Con +30° se suman en lugar de compensarse (ΔCO = −12λ₀).
- **Tomar β = 0 en el centro.** Con incidencia oblicua el centro de la envolvente se va con el haz. Con β = 0 sale I = 4 W/m², mal.
- **n_L en β.** Si se olvida, β = 1,875π e I = 0,017 W/m².
- **Láminas en β.** No van: solo cambian γ.
- **Calculadora en RAD** para sen(9π/4). En grados, sen 30° sí va en DEG.

## 7. Ideas de animación

1. **Esquema.** Una pecera (líquido celeste) con la placa de dos rendijas. Delante de la de arriba, un rectángulo azul (la lámina, n = 1,5); delante de la de abajo, un círculo blanco (la gota de aire, de diámetro 3e). A la derecha, la pantalla con el centro O marcado.
2. **Camino óptico como "demora".** Dos pulsos que salen juntos. El de arriba se frena al cruzar la lámina; el de abajo se adelanta al cruzar la gota. Una barra de "demora" muestra +1,2 µm arriba y −2,4 µm abajo: diferencia de 3,6 µm = 6λ₀.
3. **El orden 0 se escapa.** Con incidencia normal, el patrón de franjas en la pantalla se desliza 6 franjas hacia arriba y el orden 0 queda lejos de O.
4. **Inclinar el haz.** Frentes de onda planos que giran 30° en sentido horario: ahora tocan primero la rendija de arriba. Un triangulito entre las dos rendijas muestra el cateto d sen 30° = 3 µm, que en el líquido son 3,6 µm de camino óptico. El orden 0 vuelve a O.
5. **Balance en una recta numérica.** +1,2 (lámina), +2,4 (lo que resta la gota, del lado de abajo), −3,6 (incidencia) ⇒ 0.
6. **Intensidad.** Gráfico de I(θ): franjas cos² bajo la envolvente (sen β/β)², centrada en θ = −30°. Un cursor en θ = 0 cae en el segundo lóbulo lateral (β = 2,25π): franja brillante pero baja, 0,04 W/m².
7. **Contraste con el ej. 16 de la hoja.** Allá β = −π (en un cero) e I = 0; acá β = 9π/4 e I ≈ 0,04 W/m².
