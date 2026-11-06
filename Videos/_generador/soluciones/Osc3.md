# Osc 3 · Amortiguado + forzado; se apaga el motor (1P 23/4/2022, ej. 1)

Verificado con `Osc3.py` (fórmulas cerradas + simulación numérica RK4 del forzado y de la libre).

## 1. Datos y qué se pide

Un bloque cuelga de un resorte dentro de una atmósfera viscosa (amortiguado). Un motor en la habitación de al lado lo fuerza con una fuerza armónica. En cierto instante se apaga el motor.

| Dato | Valor (SI) |
|---|---|
| Masa | m = 12 kg |
| Constante del resorte | k = 3070 N/m |
| Energía disipada en cada oscilación | 59,3 % ⇒ queda el 40,7 % |
| Fuerza del motor | F(t) = F₀ cos(ωt), F₀ = 15 N, ω = 19 rad/s |
| Instante en que se apaga el motor (nuevo t = 0) | v = +0,157 m/s, resorte "estirado (no por completo)" |
| Sentido positivo | el sentido en que el resorte se estira (hacia abajo) |

Qué se pide:

- **a)** El factor de calidad Q del sistema.
- **b)** La expresión x(t) para t > 0, después de apagar el motor.

## 2. Molde en la hoja (v6)

- **Ej. 4 · Cambio de régimen: forzado → libre (18/10/25).** Es la misma situación: un forzado al que le sacan la fuerza y sigue libre amortiguado, y la regla clave es la misma: **x y v no saltan, y γ es el mismo** (receta de oscilaciones, paso 5). Lo que cambia: en el ej. 4 se conoce la libre y se reconstruye el forzado; acá es al revés, se conoce el forzado y se pide la libre. Además, acá el forzado **no** está en resonancia (ω = 19 ≠ ω₀ ≈ 16), así que hay que usar la fórmula general de A(ω).
- **Ej. 3 · Forzado: Q (Recu 30/5/26).** Mismo primer paso: sacar γ de "disipa tanto % de su energía en tantos ciclos" con e^{−2γT'}. Ahí son 2 ciclos; acá es 1.
- **Ej. 1 · Se despega una masa.** Mismas fórmulas para las constantes de la libre a partir de x₀ y v₀: A = √(x₀² + ((v₀+γx₀)/ω')²) y tg φ = −(v₀+γx₀)/(x₀ω'). Ahí v₀ = 0; acá v₀ ≠ 0.

## 3. Teoría que se usa

**Origen y gravedad.** Si el resorte cuelga, se mide x desde la posición de equilibrio *con* el peso. Medido así, el peso y el estiramiento estático (mg/k ≈ 3,8 cm) se cancelan y la ecuación queda m x'' + b x' + k x = F(t), igual que si el resorte fuera horizontal. Por eso "resorte estirado" en el enunciado tiene que leerse como **x > 0 respecto del equilibrio**: respecto de su largo natural el resorte está siempre estirado, porque la amplitud (≈ 1 cm) es menor que 3,8 cm.

**Amortiguado (subamortiguado).** Sin fuerza externa, la solución es

  x(t) = A e^{−γt} cos(ω't + φ), con γ = b/2m y ω' = √(ω₀² − γ²), ω₀ = √(k/m).

- La amplitud decae como e^{−γt}.
- La energía es proporcional a la amplitud al cuadrado, así que decae como **e^{−2γt}**.
- En un ciclo (T' = 2π/ω') la energía se multiplica por e^{−2γT'}. "Disipa el 59,3 % por ciclo" quiere decir que queda el 40,7 %: e^{−2γT'} = 0,407.

**Factor de calidad.** Q = ω₀/(2γ). Mide cuántas oscilaciones hace antes de apagarse: un Q grande es poco rozamiento. Con T' = 2π/ω' y ω'² = ω₀² − γ² sale la relación exacta γT' = π/√(Q² − ¼). La aproximación "fracción perdida por ciclo ≈ 2π/Q" **solo vale si Q ≫ 1**, o sea si se pierde poco por ciclo. Acá se pierde casi el 60 %, así que no sirve.

**Forzado, régimen estacionario.** Con F = F₀ cos(ωt), cuando el transitorio ya se apagó (decae como e^{−γt}, con 1/γ ≈ 0,9 s), la masa oscila **a la frecuencia del motor ω**, no a la propia:

  x = A cos(ωt − δ), con A = (F₀/m) / √((ω₀² − ω²)² + (2γω)²) y tg δ = 2γω/(ω₀² − ω²).

La fuerza adelanta a x en δ. Como es un MAS de frecuencia ω, en cualquier instante vale **x² + (v/ω)² = A²**: es la conservación de la energía de un MAS, dividida por ½mω². Esa relación es la que da x cuando conocemos v.

**Cambio de régimen.** Cuando se apaga el motor, la posición y la velocidad no pueden saltar (haría falta una fuerza infinita). Desde ese instante el movimiento es libre amortiguado, con el **mismo γ** (el aire viscoso sigue estando) y con la **frecuencia propia ω'**, no la del motor. Las constantes salen de x(0) = x₀ y v(0) = v₀:

- x(0) = A' cos φ = x₀.
- v(t) = A' e^{−γt} [−γ cos(ω't+φ) − ω' sen(ω't+φ)] ⇒ v₀ = −γx₀ − ω'A' sen φ ⇒ **A' sen φ = −(v₀ + γx₀)/ω'**.

Con esas dos proyecciones salen A' (Pitágoras) y φ (el cuadrante lo dan los signos de cos φ y sen φ).

## 4. Resolución paso a paso

### a) Factor de calidad

1. **Frecuencia propia.** ω₀ = √(k/m) = √(3070/12) = √255,83 = **15,995 rad/s** (≈ 16).
2. **Lo que queda de energía por ciclo.** e^{−2γT'} = 1 − 0,593 = 0,407 ⇒ 2γT' = −ln 0,407 = 0,8989 ⇒ **γT' = 0,4495**.
3. **Despejar γ.** Con T' = 2π/ω': γ/ω' = 0,4495/(2π) = 0,07154. Como ω'² = ω₀² − γ²:
   γ = 0,07154 · ω₀ / √(1 + 0,07154²) = 0,07154 · 15,995 / 1,00255 = **1,141 s⁻¹**.
   De paso: ω' = √(15,995² − 1,141²) = **15,954 rad/s**, T' = 2π/ω' = 0,394 s, b = 2mγ = 27,4 kg/s.
4. **Q.** Q = ω₀/(2γ) = 15,995/2,283 = **7,01 ≈ 7**.
   Chequeo: Q = √((π/γT')² + ¼) = √((π/0,4495)² + 0,25) = 7,01 ✓. Con Q = 7 exacto se disiparía el 59,34 % por ciclo: el número del enunciado está armado para que dé Q = 7.

### b) x(t) después de apagar el motor

**Paso 1: amplitud del forzado estacionario** (el motor funcionó bastante tiempo, así que el transitorio ya se apagó).

- ω₀² − ω² = 255,83 − 361 = −105,17 s⁻²
- 2γω = 2 · 1,141 · 19 = 43,37 s⁻²
- √((−105,17)² + 43,37²) = 113,76 s⁻²
- A = (F₀/m)/113,76 = 1,25/113,76 = **0,010988 m ≈ 1,10 cm**

Fase (no la piden, pero ayuda a entender): tg δ = 43,37/(−105,17) = −0,412. Como el denominador es negativo (ω > ω₀), δ está en el 2º cuadrante: δ = 157,6° = 2,75 rad. El bloque oscila casi en contrafase con la fuerza.

**Paso 2: posición en el instante en que se apaga el motor.** En el estacionario es un MAS de frecuencia ω = 19 rad/s:

- v_max = Aω = 0,010988 · 19 = 0,2088 m/s. Como 0,157 < 0,2088, el dato es posible: v está al 75 % del máximo.
- v/ω = 0,157/19 = 0,008263 m
- x₀² = A² − (v/ω)² = 1,2074·10⁻⁴ − 0,6828·10⁻⁴ = 0,5246·10⁻⁴ m²
- Resorte estirado ⇒ x₀ > 0 ⇒ **x₀ = +0,007243 m = +0,724 cm**. "No por completo" confirma que no está en el extremo (x₀ < A).

**Paso 3: constantes de la libre** (t = 0 es el instante de apagado; γ = 1,141 s⁻¹, ω' = 15,954 rad/s).

- A' cos φ = x₀ = 0,007243 m
- v₀ + γx₀ = 0,157 + 1,141 · 0,007243 = 0,157 + 0,00827 = 0,16527 m/s
- A' sen φ = −0,16527/15,954 = −0,010359 m
- A' = √(0,007243² + 0,010359²) = **0,01264 m = 1,26 cm**
- tg φ = −0,010359/0,007243 = −1,430. Con cos φ > 0 y sen φ < 0, φ está en el 4º cuadrante: **φ = −0,961 rad** (−55,0°).

**Resultado:**

  **x(t) = 1,26 cm · e^{−1,14 t} · cos(15,95 t − 0,96)**  [x en cm, t en s; origen en el equilibrio, + hacia donde se estira el resorte]

En SI: x(t) = 0,0126 e^{−1,14t} cos(15,95t − 0,96) m.

Chequeos:

- x(0) = 1,264 · cos(−0,961) = 0,724 cm ✓ y x'(0) = +0,157 m/s ✓ (derivada numérica en el `.py`).
- Una simulación numérica del forzado (desde el reposo, 25 s), cortando la fuerza cuando v = +0,157 m/s con x > 0, coincide con la fórmula: error < 0,001 mm en 3 s.
- Tras un ciclo libre la amplitud baja a 1,264 · 0,638 = 0,806 cm (0,638 = √0,407).

¿Por qué A' (1,26 cm) es mayor que la amplitud del forzado (1,10 cm)? Porque ahora oscila más lento (ω' ≈ 16 en lugar de 19). Con la misma velocidad, a menor frecuencia le corresponde una amplitud mayor.

**Ambigüedad.** Si "estirado" se leyera como x₀ < 0 (no tiene sentido físico, ver la teoría), quedaría A' = 1,18 cm y φ = −2,23 rad. La lectura de la cátedra, por la nota "defina el sentido positivo cuando el resorte se estira", es **x₀ > 0**.

## 5. Resultados finales

- **a)** Q ≈ 7,0 (γ = 1,14 s⁻¹, ω₀ = 16,0 rad/s).
- **b)** Forzado: A = 1,10 cm, δ = 2,75 rad; al apagar, x₀ = +0,724 cm y v₀ = +0,157 m/s.
  **x(t) = 1,26 cm · e^{−1,14t} cos(15,95t − 0,96)**, con t en s, origen en el equilibrio y + hacia abajo.

## 6. Dónde es fácil equivocarse

- **Energía y amplitud.** El 59,3 % es de *energía*: e^{−2γT'} = 0,407. Si se lo aplica a la amplitud (e^{−γT'} = 0,407), sale Q = 3,5, mal.
- **La aproximación 2π/Q.** 0,593 ≈ 2π/Q da Q = 10,6, mal: esa aproximación es para Q ≫ 1 (pérdidas chicas por ciclo).
- **Frecuencia del forzado.** En el forzado estacionario la masa oscila a ω = 19 (la del motor), no a ω₀ ni a ω'. La relación x² + (v/ω)² = A² va con ω = 19.
- **Fórmula de A.** No es F₀/k (eso es para ω → 0), ni la de resonancia: hay que usar la fórmula general con ω = 19.
- **Frecuencia de la libre.** Después de apagar, la frecuencia pasa a ser ω' = 15,95. Si se sigue con 19, sale de nuevo A = 1,10 cm, que es la amplitud del forzado, no la de la libre.
- **El término γx₀.** Si se olvida en A' sen φ = −(v₀ + γx₀)/ω', sale A' = 1,22 cm.
- **Cuadrante de φ.** tg φ = −1,43 tiene dos soluciones: −0,96 y π − 0,96 = 2,18. Se elige por el signo de cos φ = x₀/A' > 0.
- **Signo de x₀.** Lo da "estirado" (x₀ > 0); el cálculo solo da x₀².
- **Origen.** Va en el equilibrio con el peso, no en el largo natural.
- **Calculadora en RAD** para ω't + φ y para el arctg.

## 7. Ideas de animación

1. **Enunciado → esquema.** Resorte vertical colgado del techo, bloque, flecha + hacia abajo y origen en la línea de equilibrio. Una nube de "aire viscoso" alrededor.
2. **Energía por ciclo (a).** Bloque oscilando libre, con una barra de energía al costado que en cada ciclo cae al 40,7 % (escalones 1 → 0,407 → 0,166 → …). Abajo, la curva E(t) = E₀e^{−2γt} con un punto marcado en cada T'. Remarcar "energía ⇒ 2γ".
3. **De γT' a Q.** Animar la cadena γT' = 0,4495 → γ = 1,141 → Q = 7, y mostrar al lado la aproximación 2π/Q = 0,593 tachada con un globo "solo si Q ≫ 1".
4. **Forzado.** Un motor que vibra (flecha F(t) que crece y decrece) y el bloque que responde a ω = 19. Diagrama de fasores girando: F adelante, x atrasado 157,6°, casi en contrafase.
5. **Círculo de fase (la mejor para b).** Plano (x, v/ω) con el círculo de radio A = 1,10 cm. Un punto lo recorre; se congela donde v/ω = 0,826 cm, con x > 0 (dos candidatos: x = ±0,724; se tacha el negativo con el cartel "estirado ⇒ x > 0").
6. **Se apaga el motor.** En ese instante el punto deja el círculo y empieza a describir una **espiral** hacia el origen: libre amortiguada, ahora en el plano (x, v/ω'). Al cambiar de ω a ω' el punto "se corre" afuera: A' = 1,26 cm > 1,10 cm.
7. **Gráfico x(t).** Sinusoide del forzado para t < 0 (amplitud 1,10, período 0,33 s); en t = 0, una línea vertical y la curva libre con la envolvente ±1,26 e^{−1,14t} (período 0,394 s). Resaltar que en t = 0 coinciden el valor y la pendiente: x y v no saltan.
8. **Cuadrante de φ.** Circunferencia trigonométrica con cos φ > 0 y sen φ < 0 ⇒ 4º cuadrante, φ = −0,96 rad.
