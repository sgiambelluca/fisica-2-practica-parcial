# Osc 6 · Objeto colgado en un fluido que se rompe y pierde el 80% de su masa

Origen: recuperatorio 1P 1C 2022, ejercicio 4 (3,5 puntos). Verificación numérica: `Osc6.py`.

## 1. Datos y qué se pide

| Dato | Valor | SI |
|---|---|---|
| Masa inicial | M = 0,2 kg | 0,2 kg |
| Constante del resorte | k = 25 N/m | 25 N/m |
| Largo del resorte en equilibrio con M | 28 cm | 0,28 m |
| Constante de amortiguamiento del fluido | b = 0,55 kg/s | 0,55 kg/s |
| Gravedad | g = 10 m/s² | 10 m/s² |
| Se desprende | 80% de la masa | queda m = 0,2 · 0,2 = **0,04 kg** |

Qué se pide:

- **a)** La función de oscilación x(t), indicando claramente el sistema de referencia (origen y sentido).
- **b)** La longitud del resorte después de una oscilación, y la fracción de energía perdida en ese tiempo.

## 2. Molde en la hoja

Es el **ejercicio 1 de la hoja v6, "Amortiguado: se despega una masa" (Recu 7/6/25)**. Hasta los números se parecen: el mismo resorte de k = 25 N/m, que mide 28 cm con 0,2 kg colgados.

Qué se repite:

- calcular el largo natural con la masa total;
- calcular el nuevo equilibrio con la masa que queda;
- poner el origen en ese nuevo equilibrio, con x positivo hacia abajo;
- x₀ = 28 cm − nuevo equilibrio, v₀ = 0;
- usar x = A e^{−γt} cos(ω't + φ);
- para b), aprovechar que en t = T' el coseno vuelve a la misma fase: x(T') = x₀ e^{−γT'}.

Qué cambia:

- **Queda la masa chica.** En la hoja se suelta la de 40 g y queda la de 160 g. Acá se desprende el 80% y **queda la de 40 g**. Por eso el nuevo equilibrio sube mucho (21,6 cm contra 26,4 cm) y la amplitud inicial es 6,4 cm, no 1,6 cm.
- **γ sale directo de b**, con γ = b/(2m). En la hoja salía del "27% de amplitud por ciclo".
- **El amortiguamiento es fuerte.** γ/ω' = 0,29, contra 0,05 en la hoja. Entonces la fase φ = −0,279 rad no es despreciable y A = 6,66 cm ≠ x₀.
- **Se pide además la fracción de energía perdida**, que se calcula con e^{−2γT'}.

## 3. Teoría que se usa

**Por qué el origen va en el equilibrio.** Con el eje x hacia abajo, la segunda ley para la masa colgada dice:

m ẍ = mg − k(estiramiento) − b ẋ

Si medimos x desde la posición de equilibrio, donde k·(estiramiento de equilibrio) = mg, el peso y la parte constante de la fuerza del resorte se cancelan. Queda m ẍ = −kx − bẋ, que es la ecuación del oscilador amortiguado de siempre. La gravedad **solo corre el punto de equilibrio**: no cambia ω₀ ni γ.

Cuando cambia la masa colgada, cambia el equilibrio: el nuevo estiramiento es mg/k. Por eso el origen se toma en el **nuevo** equilibrio.

**Amortiguado en un fluido.** La fuerza de rozamiento viscoso es −bv. Se definen:

- ω₀ = √(k/m), la frecuencia sin rozamiento;
- γ = b/(2m), la constante de amortiguamiento.

El régimen sale de comparar γ con ω₀:

- **subamortiguado** si γ < ω₀: oscila;
- **crítico** si γ = ω₀;
- **sobreamortiguado** si γ > ω₀: no oscila.

Si es subamortiguado:

x(t) = A e^{−γt} cos(ω't + φ), con ω' = √(ω₀² − γ²)

**Constantes.** Se obtienen de x(0) = x₀ y v(0) = v₀:

- x₀ = A cos φ
- v₀ = −A(γ cos φ + ω' sen φ)

Con v₀ = 0 queda tg φ = −γ/ω'. En general:

- A = √(x₀² + ((v₀ + γx₀)/ω')²)
- tg φ = −(v₀ + γx₀)/(x₀ω')

El cuadrante de φ sale del signo de cos φ = x₀/A. Si x₀ > 0, φ está en el 4º cuadrante.

**"Una oscilación".** Una oscilación dura un período amortiguado, T' = 2π/ω' (no 2π/ω₀). Después de T', el coseno y el seno vuelven a valer lo mismo, y solo cambia el factor exponencial. Por eso:

- x(t + T') = e^{−γT'} x(t)
- v(t + T') = e^{−γT'} v(t)

**Energía.** E = ½kx² + ½mv², medida desde el equilibrio, ya incluye la energía potencial gravitatoria. Como x y v se multiplican por e^{−γT'}, después de un período la energía queda multiplicada **exactamente** por e^{−2γT'}.

- Amplitud: factor e^{−γt}.
- Energía: factor e^{−2γt}, porque es cuadrática en la amplitud.

## 4. Resolución paso a paso

**Paso 1: largo natural ℓ₀.** Con M colgada el resorte mide 28 cm y está en equilibrio:

- k(ℓ − ℓ₀) = Mg ⇒ ℓ − ℓ₀ = Mg/k = 0,2 · 10 / 25 = 0,08 m = 8 cm
- ℓ₀ = 28 − 8 = **20 cm**

**Paso 2: nuevo equilibrio.** Se desprende el 80%, así que queda m = 0,2 · 0,2 = 0,04 kg:

- estiramiento = mg/k = 0,04 · 10 / 25 = 0,016 m = 1,6 cm
- ℓ_eq = 20 + 1,6 = **21,6 cm**

**Paso 3: sistema de referencia y condiciones iniciales.**

- **Origen:** la posición del objeto cuando el resorte mide 21,6 cm (el nuevo equilibrio).
- **Sentido:** x positivo hacia abajo.
- x₀ = 28 − 21,6 = **+6,4 cm** = 0,064 m. Justo después de romperse, el objeto sigue en el mismo lugar.
- v₀ = **0**. Estaba en reposo, y la rotura no le da velocidad.

**Paso 4: parámetros y régimen.**

- ω₀ = √(k/m) = √(25/0,04) = √625 = **25 s⁻¹**
- γ = b/(2m) = 0,55 / (2 · 0,04) = **6,875 s⁻¹**. Como γ < ω₀, es subamortiguado.
- ω' = √(ω₀² − γ²) = √(625 − 47,27) = √577,73 = **24,04 s⁻¹**
- (Q = ω₀/(2γ) = 1,82: un amortiguamiento fuerte.)

**Paso 5: A y φ.**

- tg φ = −(v₀ + γx₀)/(x₀ω') = −γ/ω' = −6,875 / 24,036 = −0,2860
- Como x₀ > 0, cos φ > 0, así que φ = **−0,279 rad** (≈ −15,96°).
- A = x₀ / cos φ = 6,4 / 0,9615 = **6,66 cm**
- Chequeo con la fórmula de la raíz: (v₀ + γx₀)/ω' = 6,875 · 6,4 / 24,036 = 1,831 cm, y A = √(6,4² + 1,831²) = √44,31 = 6,657 cm ✓

**Resultado a):**

x(t) = 6,66 cm · e^{−6,875 t} · cos(24,04 t − 0,279)   (t en s)

- origen en el nuevo equilibrio (resorte de 21,6 cm);
- x positivo hacia abajo.

(Con x positivo hacia arriba es la misma función cambiada de signo: x₀ = −6,4 cm.)

**Paso 6: largo después de una oscilación.**

- T' = 2π/ω' = 2π / 24,036 = **0,2614 s**
- γT' = 6,875 · 0,2614 = 1,797
- e^{−γT'} = 0,1658
- En t = T' la fase vuelve a −0,279 rad, así que x(T') = x₀ e^{−γT'} = 6,4 · 0,1658 = **1,06 cm** (por debajo del equilibrio). En ese instante v = 0 otra vez.
- Largo = 21,6 + 1,06 = **22,66 cm**

**Paso 7: fracción de energía perdida.**

- E(T')/E(0) = e^{−2γT'} = 0,1658² = **0,0275**
- Se pierde 1 − 0,0275 = **0,9725, o sea el 97,3 %**
- En números: E(0) = ½kx₀² = ½ · 25 · 0,064² = 51,2 mJ y E(T') = ½ · 25 · 0,01061² = 1,41 mJ.

## 5. Resultados finales

- ℓ₀ = 20 cm; nuevo equilibrio en 21,6 cm.
- ω₀ = 25 s⁻¹, γ = 6,875 s⁻¹, ω' = 24,04 s⁻¹ (subamortiguado; Q ≈ 1,8).
- **a)** x(t) = 6,66 cm · e^{−6,875t} cos(24,04t − 0,279), con el origen en el nuevo equilibrio (21,6 cm) y x positivo hacia abajo.
- **b)** T' = 0,261 s.
  - Largo del resorte después de una oscilación: **22,66 cm**.
  - Energía perdida: **97,3 %** (queda el 2,75 %).

## 6. Dónde es fácil equivocarse

- **Quedarse con el 80%.** Queda el 20%, o sea 0,04 kg. Con 0,16 kg el ejercicio se transforma en el de la hoja (equilibrio en 26,4 cm, x₀ = 1,6 cm).
- **No mover el origen.** Si se pone el origen en 28 cm, en el largo natural (20 cm) o en el equilibrio viejo, la x(t) no es la de un oscilador alrededor de 0, porque la gravedad no se cancela.
- **γ = b/m.** Falta el 2: es γ = b/(2m). Otro error: usar M = 0,2 kg en lugar de la masa que queda.
- **Usar T = 2π/ω₀ en lugar de T' = 2π/ω'.** Con este amortiguamiento la diferencia se nota: x(T₀) = 1,03 cm, contra 1,06 cm.
- **Despreciar φ.** En el ejercicio de la hoja φ = −0,05 rad y A ≈ x₀. Acá φ = −0,279 rad y A = 6,66 cm. Escribir A = 6,4 cm y φ = 0 da una v(0) distinta de 0.
- **Elegir mal el cuadrante de φ.** La arctg da −0,279 rad. Como cos φ tiene que ser positivo (x₀ > 0 y A > 0), ese valor está bien. Si el eje fuera hacia arriba, x₀ < 0: entonces φ = π − 0,279 o, lo que es lo mismo, A negativa.
- **Energía con e^{−γT'}.** Ese es el factor de la amplitud; la energía va con e^{−2γT'}. También ojo con contestar lo que queda (2,75%) en lugar de lo que se pierde (97,3%).
- **Sumar x(T') al largo natural.** Se suma al nuevo equilibrio: 21,6 + 1,06 = 22,66 cm, no 20 + 1,06.
- **Empuje del fluido.** No hay datos para calcularlo. Los 28 cm ya están medidos en el fluido, y la cátedra no lo considera.
- **Calculadora en grados.** ω't + φ va en radianes.

## 7. Ideas de animación

1. **La escena.** Un resorte vertical dentro de un tanque con líquido y una regla al costado, con tres marcas punteadas:
   - 20 cm: largo natural;
   - 21,6 cm: nuevo equilibrio;
   - 28 cm: largo inicial.

   El bloque de 0,2 kg cuelga quieto en 28 cm. Se parte: el 80% cae al fondo y queda un trocito de 40 g.
2. **Diagrama de fuerzas.**
   - Antes: el peso Mg (flecha larga) equilibra la fuerza del resorte, que se estira 8 cm.
   - Después: el peso mg es una flecha cinco veces más corta. El resorte ya no está en equilibrio y el bloque sube hacia la marca de 21,6 cm.
3. **El eje.** Una flecha "x+ hacia abajo" que nace en 21,6 cm, con x₀ = +6,4 cm marcado.
4. **Fasor de las constantes.** Un triángulo rectángulo:
   - cateto horizontal: x₀ = 6,4 cm;
   - cateto vertical: (v₀ + γx₀)/ω' = 1,83 cm;
   - hipotenusa: A = 6,66 cm;
   - ángulo: |φ| = 0,279 rad.
5. **Gráfico x(t) sincronizado con el bloque.** La curva amortiguada, con la envolvente ±6,66 e^{−6,875t} en punteado.
   - El bloque baja y sube al ritmo de la curva.
   - En T'/2 el resorte llega a medir 18,99 cm: queda apenas comprimido, porque pasa por debajo de los 20 cm.
   - En T' = 0,261 s, una marca con x = 1,06 cm y el texto "largo = 22,66 cm".
6. **Barra de energía.** Una barra que se vacía con e^{−2γt}. En T' le queda el 2,75%, con un rótulo grande: "se perdió el 97,3%".
7. **Comparación con la hoja.** Las dos x(t) superpuestas: el ejercicio 1 de la hoja (queda M = 160 g, poco amortiguado) y este (queda m = 40 g, muy amortiguado). Así se ve por qué acá φ ya no es despreciable.
