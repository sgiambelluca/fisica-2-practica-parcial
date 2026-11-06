# Osc 2 · Adorno colgante en un auto: forzado por las ruedas, después libre

Origen: 1P 14/9/2024, ejercicio 4 (3 puntos). Verificación numérica: `Osc2.py`.

> Un vehículo tiene un adorno colgante (resorte k = 6,27 N/m, masa m = 1 kg). Por un defecto en los rodamientos, el vehículo hace una oscilación vertical completa por cada vuelta de las ruedas (D = 72 cm), lo que fuerza al adorno con una fuerza armónica de la misma frecuencia. A v = 0,9 m/s, en régimen estacionario, el adorno alcanza su **máxima amplitud** de oscilación, A_MAX = 6 cm.
> a) ¿Cuál será la amplitud A' si el vehículo avanza con v' = 0,792 m/s?
> b) En t = 0, con el resorte en su **mínima longitud**, el vehículo se detiene y cesa la vibración. Escribir y(t) para t > 0.

---

## 1. Datos y qué se pide

**Datos (en SI)**

| Dato | Valor |
|---|---|
| Constante del resorte | k = 6,27 N/m |
| Masa | m = 1 kg |
| Diámetro de la rueda | D = 72 cm = 0,72 m (radio r = 0,36 m) |
| Velocidad 1 | v = 0,9 m/s → estacionario con la **máxima amplitud posible**, A_MAX = 6 cm = 0,06 m |
| Velocidad 2 | v' = 0,792 m/s |
| Fuerza | armónica, F = F₀ cos(ωt), con F₀ desconocida; una oscilación por vuelta de rueda |

**Qué se pide**

- **a)** La amplitud A' del régimen estacionario cuando el auto va a v' = 0,792 m/s.
- **b)** La función y(t) del adorno para t > 0. En t = 0 el resorte está en su mínima longitud y el auto frena; desde ahí el adorno oscila libre, amortiguado.

## 2. Molde en la hoja (v6)

**Ejercicio más parecido:** el **4, "Cambio de régimen: forzado → libre" (18/10/25)**, junto con la **Receta oscilaciones**: bloques "Cualquier ω", "Resonancia de amplitud" y paso 5.

**Qué se repite**

- En el cambio de régimen la posición y la velocidad **no saltan**, y γ es el mismo antes y después.
- Si la fuerza cesa en un extremo de la oscilación: x(0) = ±A_est y v(0) = 0.
- Después del corte, el sistema oscila libre con su propia ω' = √(ω₀² − γ²), y ya no con la ω de la fuerza.
- La fórmula de A(ω) para "cualquier ω" (ejercicio 3 y receta).

**Qué cambia**

- **Tipo de resonancia.** En el 4 el forzado estaba en resonancia de **potencia** (ω = ω₀, δ = π/2). Acá está en resonancia de **amplitud** ("máxima amplitud"): ω_RA = √(ω₀² − 2γ²) y δ < π/2.
- **De dónde sale γ.** No se lee de una x(t) libre: sale de comparar ω_RA con ω₀.
- **La frecuencia de la fuerza** hay que sacarla de la rueda.
- **El sentido del ejercicio.** En el 4 se reconstruía el forzado a partir de la oscilación libre. Acá se va al revés: del forzado (conocido) se arma la libre.

## 3. Teoría que se usa

**Ecuación del forzado.** Fuerzas sobre la masa: resorte −ky, rozamiento −bẏ y fuerza externa F₀cos(ωt).

  m ÿ + b ẏ + k y = F₀ cos(ωt)  ⇒  ÿ + 2γ ẏ + ω₀² y = (F₀/m) cos(ωt),  con γ = b/(2m) y ω₀² = k/m.

y se mide **desde el equilibrio**. El peso solo corre el equilibrio (estira el resorte mg/k) y no cambia ω₀. Por eso se puede ignorar si se mide desde ahí.

**Régimen estacionario.** La solución general es la parte transitoria (libre amortiguada, que decae como e^(−γt)) más una solución particular que oscila con la ω de la **fuerza**. "Al llegar al régimen estacionario" quiere decir que el transitorio ya se murió y queda:

  y(t) = A(ω) cos(ωt − δ),  A(ω) = (F₀/m) / √[(ω₀² − ω²)² + (2γω)²],  tg δ = 2γω / (ω₀² − ω²)

(δ es lo que el desplazamiento atrasa respecto de la fuerza).

**Resonancia de amplitud (la que pide este ejercicio).** A(ω) es máxima cuando el radicando del denominador es mínimo. Derivando respecto de ω²:

  −2(ω₀² − ω²) + 4γ² = 0  ⇒  **ω_RA² = ω₀² − 2γ²**.

Reemplazando, el radicando vale 4γ²(ω₀² − γ²), y queda:

  **A_MAX = F₀ / (2mγ√(ω₀² − γ²)) = F₀ / (2mγω')**,  con ω' = √(ω₀² − γ²).

"Máxima amplitud" o "máxima amplitud posible" quiere decir resonancia de amplitud. No hay que confundirla con la **resonancia de potencia** ("máxima potencia"), que está en ω = ω₀.

**Frecuencia que impone la rueda.** En una vuelta de la rueda el auto avanza una circunferencia, πD. Si eso tarda un período T, entonces πD = vT, así que T = πD/v y ω = 2π/T = 2v/D. Es la velocidad angular de la rueda, v/r.

**Oscilación libre amortiguada (subamortiguada, γ < ω₀).**

  y(t) = C e^(−γt) cos(ω't + φ),  ω' = √(ω₀² − γ²)

Las constantes salen de las condiciones iniciales y₀ y v₀:

  C cos φ = y₀  y  v(0) = C(−γ cos φ − ω' sen φ) = v₀

y de ahí:

  **tg φ = −(v₀ + γy₀) / (y₀ω')**,  **C = √[y₀² + ((v₀ + γy₀)/ω')²]**

Son las mismas fórmulas del ejercicio 1 de la hoja.

**Cambio de régimen.** Cuando la fuerza desaparece, la posición y la velocidad son continuas: ninguna fuerza finita cambia v de golpe. γ y ω₀ son propiedades del adorno (masa, resorte, rozamiento con el aire), así que no cambian. Lo único que cambia es que, desde t = 0, la ecuación pasa a tener cero del lado derecho.

**En un extremo, v = 0.** En el estacionario y = A cos(ωt − δ). En los extremos (y = ±A) el seno vale 0, así que la velocidad es nula.

**Convención de esta resolución.** El origen está en el equilibrio y el eje y es **positivo hacia arriba**. El resorte cuelga del espejo y la masa está abajo, así que la mínima longitud del resorte corresponde a la masa en su punto **más alto**: y₀ = +A.

## 4. Resolución paso a paso

### Paso 1. Frecuencia natural
ω₀² = k/m = 6,27/1 = **6,27 s⁻²**, así que ω₀ = **2,504 s⁻¹** (2,50400).
Conviene guardar ω₀² = 6,27 tal cual, sin redondear ω₀ (ver trampas).

### Paso 2. Frecuencia de la fuerza en cada velocidad
- v = 0,9 m/s: T₁ = πD/v = π·0,72/0,9 = 2,513 s, así que ω₁ = 2v/D = 2·0,9/0,72 = **2,5 s⁻¹**.
- v' = 0,792 m/s: ω₂ = 2·0,792/0,72 = **2,2 s⁻¹** (T₂ = 2,856 s).

### Paso 3. γ, de la resonancia de amplitud
A 0,9 m/s la amplitud es la máxima posible, así que ω₁ = ω_RA:

  ω₁² = ω₀² − 2γ²  ⇒  γ² = (ω₀² − ω₁²)/2 = (6,27 − 6,25)/2 = 0,02/2 = 0,01 s⁻²  ⇒  **γ = 0,1 s⁻¹**

γ = 0,1 es mucho menor que ω₀ = 2,504, así que es **subamortiguado**. La frecuencia propia amortiguada es:

  ω' = √(ω₀² − γ²) = √(6,27 − 0,01) = √6,26 = **2,502 s⁻¹**

(Como extra: Q = ω₀/(2γ) = 12,5, una resonancia bastante aguda.)

### Paso 4. Amplitud de la fuerza (F₀)

  A_MAX = F₀/(2mγω')  ⇒  F₀ = A_MAX · 2mγω' = 0,06 · 2 · 1 · 0,1 · 2,502 = **0,0300 N** (0,030024 N)

Chequeo con la fórmula general en ω₁:
- denominador = √[(6,27 − 6,25)² + (2·0,1·2,5)²] = √(0,0004 + 0,25) = √0,2504 = 0,5004;
- F₀/m = 0,06 · 0,5004 = 0,030024 ✓.

### Paso 5. a) Amplitud a v' = 0,792 m/s (ω₂ = 2,2 s⁻¹)

  A' = (F₀/m) / √[(ω₀² − ω₂²)² + (2γω₂)²]

- ω₀² − ω₂² = 6,27 − 4,84 = 1,43, y 1,43² = 2,0449.
- 2γω₂ = 2·0,1·2,2 = 0,44, y 0,44² = 0,1936.
- Suma: 2,2385; raíz: 1,4962.

  A' = 0,030024 / 1,4962 = 0,02007 m ⇒ **A' ≈ 2,0 cm** (2,007 cm)

**Camino corto, sin F₀.** F₀/m es la misma en las dos velocidades, así que se cancela en el cociente:

  A_MAX/A' = √[(1,43² + 0,44²)/(0,02² + 0,5²)] = √(2,2385/0,2504) = √8,940 = 2,990  ⇒  A' = 6/2,990 = 2,007 cm.

**Fases (no se piden, sirven para el video).**
- δ(ω₁) = arctg(0,5/0,02) = 87,7° (1,531 rad): casi π/2, pero no exacto, porque esto es resonancia de amplitud y no de potencia.
- δ(ω₂) = arctg(0,44/1,43) = 17,1° (0,299 rad).

### Paso 6. b) Condiciones iniciales cuando el auto se detiene
- En t = 0 el resorte está en su mínima longitud, así que la masa está en el **extremo superior** de su oscilación estacionaria: **y₀ = +A_est**.
- En un extremo la velocidad es cero: **v₀ = 0**.
- Al desaparecer la fuerza, ni y ni v saltan. El sistema sigue **libre amortiguado** con el mismo γ = 0,1 s⁻¹ y con ω' = 2,502 s⁻¹, y ya no con la ω de la fuerza.

### Paso 7. Constantes de la oscilación libre

  tg φ = −(v₀ + γy₀)/(y₀ω') = −γ/ω' = −0,1/2,502 = −0,03997  ⇒  **φ = −0,0399 rad ≈ −0,040 rad**

La fase no depende de y₀. La amplitud inicial de la envolvente es:

  C = √[y₀² + (γy₀/ω')²] = y₀·√(1 + 0,03997²) = **1,0008·y₀**

### Paso 8. ¿Con qué amplitud venía? Las dos lecturas del enunciado

**Lectura 1 (literal; la más probable).** El auto del enunciado avanza a 0,9 m/s, y el ítem a) es un "¿qué pasaría si…?" (verbo en condicional: "¿cuál *será* la amplitud *si* avanza con v'?"). Entonces:
- al detenerse, y₀ = A_MAX = 6 cm, así que C = 1,0008·6 = 6,005 cm;
- **y(t) = 6,005 e^(−0,1t) cos(2,502t − 0,040)  [y en cm, t en s; y hacia arriba desde el equilibrio]**.

**Lectura 2 (seguida del a); la que usa la resolución del alumno del PDF).** El auto venía a v', así que:
- y₀ = A' = 2,007 cm, y C = 2,008 cm;
- **y(t) = 2,008 e^(−0,1t) cos(2,502t − 0,040)  [cm, s]**;
- con A' redondeado a 2 cm, como en el PDF, sale C = 2,002 cm. El PDF escribe y(t) = 0,02001 e^(−0,1t) cos(2,502t − 0,04) [SI]; la diferencia en la cuarta cifra es de redondeo.

**Cuál tomar.** El procedimiento es idéntico y solo cambia la amplitud. En el examen hay que **escribir explícitamente cuál se toma**. Si sobra tiempo, conviene dar las dos: es una línea más.

**Si se elige y positivo hacia abajo**, y₀ = −A y queda y(t) = −6,005 e^(−0,1t) cos(2,502t − 0,040) cm, o lo mismo con fase φ + π = 3,102 rad.

**Chequeos (los hace `Osc2.py`)**
- y(0) = C cos(−0,040) = y₀ ✓ y v(0) = 0 ✓.
- Período libre: T' = 2π/ω' = 2,511 s.
- La amplitud se reduce a la mitad en ln2/γ = 6,93 s.

## 5. Resultados finales

| Magnitud | Resultado |
|---|---|
| ω₀ | 2,504 s⁻¹ |
| ω de la fuerza | ω₁ = 2,5 s⁻¹ (a 0,9 m/s); ω₂ = 2,2 s⁻¹ (a 0,792 m/s) |
| γ | 0,1 s⁻¹ (subamortiguado) |
| ω' | 2,502 s⁻¹ |
| F₀ | 0,030 N |
| **a) A'** | **≈ 2,0 cm** (2,007 cm) |
| **b) y(t), lectura literal** | **6,005 e^(−0,1t) cos(2,502t − 0,040) cm** |
| b) y(t), si venía a v' | 2,008 e^(−0,1t) cos(2,502t − 0,040) cm |

En b), y se mide desde el equilibrio y es positivo hacia arriba.

## 6. Dónde es fácil equivocarse

- **Redondear ω₀ a 2,5.** Con ω₀ = 2,5 queda ω₀² − ω₁² = 0, así que γ = 0 y la amplitud sería infinita. Todo γ sale de la diferencia 6,27 − 6,25 = 0,02. Hay que usar ω₀² = k/m = 6,27 directo, sin pasar por la raíz.
- **La frecuencia de la rueda.**
  - Es ω = 2v/D: D es el **diámetro**, así que v/D = 1,25 s⁻¹ está mal.
  - Tampoco es f = v/(πD) = 0,398 Hz usado como si fuera ω: falta el 2π.
- **Confundir resonancia de amplitud con resonancia de potencia.**
  - Si se toma ω₁ = ω₀, γ no sale; además los datos no cierran (2,5 ≠ 2,504).
  - "Máxima amplitud" lleva a ω_RA = √(ω₀² − 2γ²) y a A_MAX = F₀/(2mγω').
- **Olvidar el término de amortiguamiento en a).** (F₀/m)/|ω₀² − ω²| da 2,10 cm en lugar de 2,01 cm. Acá casi no cambia, pero el planteo es incorrecto.
- **En b), seguir usando ω = 2,5 o 2,2.** Sin fuerza, el sistema oscila con **su** ω' = 2,502 s⁻¹.
- **El signo de y₀.**
  - Mínima longitud del resorte = masa en el punto **más alto**.
  - Con y positivo hacia arriba, y₀ = +A; con y hacia abajo, y₀ = −A. Hay que decir qué eje se usó.
- **Poner C = y₀ y φ = 0 exactos.** Con amortiguamiento, v₀ = 0 no da fase nula: φ = −arctg(γ/ω') y C = y₀√(1 + γ²/ω'²). Son correcciones chicas (0,08 % y 0,04 rad), pero la cátedra las pide.
- **No aclarar con qué amplitud venía** (6 cm o 2 cm). Hay que escribir la suposición.
- **Mezclar unidades.** Si F₀ está en N y m en kg, A sale en metros. Pasar 6 cm a 0,06 m antes de despejar F₀.

## 7. Ideas de animación

1. **El auto y la rueda.**
   - Un auto avanza; un punto de la rueda marca las vueltas y el adorno colgado del espejo sube y baja.
   - Contador: "1 vuelta = 1 oscilación".
   - Mostrar la circunferencia πD "desenrollada" sobre el piso para que se vea que T = πD/v y que ω = 2v/D = v/r.
2. **La curva de resonancia A(ω).**
   - Pico en ω_RA = 2,5 (6 cm), con línea punteada en ω₀ = 2,504 (casi encima) y un punto en ω₂ = 2,2 (2 cm).
   - Lupa sobre el pico: ω₀ y ω_RA difieren en 0,004 s⁻¹, y de esa diferencia mínima sale γ.
   - Un deslizador de velocidad del auto mueve el punto sobre la curva.
3. **Fasores de la fuerza y del desplazamiento.** δ ≈ 88° a 0,9 m/s contra δ ≈ 17° a 0,792 m/s.
4. **El momento del frenado.**
   - Gráfico y(t): a la izquierda de t = 0, la sinusoide forzada de amplitud constante; en t = 0 el auto frena (ícono de freno).
   - Marcar el punto: arriba de todo, con tangente horizontal (v₀ = 0).
   - A la derecha, la oscilación libre con su envolvente ±C e^(−0,1t), que se achica lentamente: se reduce a la mitad en unos 7 s.
   - En paralelo, el dibujo del resorte comprimido al máximo en t = 0.
5. **Las dos lecturas.** Dos curvas superpuestas (6 cm y 2 cm), con la misma fase y la misma envolvente relativa, para mostrar que solo cambia la escala.
