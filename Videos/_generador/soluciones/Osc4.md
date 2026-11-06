# Osc 4 · Amortiguado → forzado en resonancia de potencia → libre

Origen: 1P 24/9/2015 (tema 2), ej. 3. Números verificados con `Osc4.py`.

## 1. Datos y qué se pide

| Dato | Valor | En SI |
|---|---|---|
| Energía disipada en 3 ciclos completos (sin fuerza) | 79,24 % | queda $E/E_0 = 0{,}2076$ |
| Fuerza | $F(t) = F_0\cos(\omega t)$ | $F_0 = 15$ N, $\omega = 6$ s⁻¹ |
| Con esa $\omega$ la potencia media es **máxima** | — | ⇒ $\omega_0 = 6$ s⁻¹ |
| Masa (recién en c) | 10 kg | $m = 10$ kg |

Se pide:

- **a)** el factor de calidad $Q$;
- **b)** un valor de $\omega$ con el que la potencia media sea la mitad de la máxima (aproximación de oscilador débilmente amortiguado);
- **c)** ya en régimen estacionario, en un instante en el que el resorte está en su **máxima elongación** (nuevo $t = 0$) se quita la fuerza: escribir $x(t)$ para $t > 0$.

## 2. Molde en la hoja (v6)

- **Ejercicio 3, "Forzado: Q, ancho de banda, estacionario" (Recu 30/5/26).** Es casi el mismo enunciado: allá "79,28 % en 2 ciclos, $\omega = 3$, $F_0 = 9$ N, $m = 10$ kg". Se repiten los pasos de a) y b): $\omega_0$ sale del máximo de potencia, $\gamma T'$ sale del porcentaje de energía, $Q = \omega_0/2\gamma$ y $\omega_\pm \approx \omega_0 \pm \gamma$.
- **Qué cambia:**
  - son **3 ciclos** y no 2: el exponente pasa a ser $6\gamma T'$;
  - c) no pide el $x_{est}(t)$, sino lo que pasa **después de sacar la fuerza**. Es el **ejercicio 4, "Cambio de régimen: forzado → libre"**, pero al revés: en el 4 dan la libre y hay que reconstruir la forzada; acá se conoce la forzada y hay que escribir la libre.
- Receta de oscilaciones, pasos 3 ("% por ciclo: energía $e^{-2\gamma T'}$") y 5 ("cambio de régimen: $x$ y $v$ no saltan; si cesa en un máximo de elongación, $A_{est} = x(t_0)$").

## 3. Teoría que se usa

**Oscilador amortiguado (subamortiguado).** La ecuación es $m\ddot x + b\dot x + kx = 0$, con $\omega_0^2 = k/m$ y $\gamma = b/2m$, y la solución es

$$x(t) = A\,e^{-\gamma t}\cos(\omega' t + \varphi_0),\qquad \omega'^2 = \omega_0^2 - \gamma^2,\qquad T' = \frac{2\pi}{\omega'}.$$

- Un **ciclo** dura $T'$. En cada ciclo la amplitud se multiplica por $e^{-\gamma T'}$.
- La **energía** es proporcional a la amplitud al cuadrado, así que se multiplica por $e^{-2\gamma T'}$. Después de 3 ciclos queda $E = E_0\,e^{-2\gamma\cdot 3T'}$.
- El dato "disipa 79,24 %" es lo que **se pierde**. Lo que queda es $1 - 0{,}7924 = 0{,}2076$.

**Factor de calidad.** La cátedra usa $Q = \dfrac{\omega_0}{2\gamma}$.

- Si el amortiguamiento es débil, en un ciclo se pierde una fracción $\Delta E/E \approx 2\gamma T \approx 2\pi/Q$. De ahí viene la forma $Q \approx 2\pi\,E/\Delta E$.
- Esa forma vale **solo si la pérdida por ciclo es chica**. Acá se pierde el 41 % por ciclo, así que hay que usar $Q = \omega_0/2\gamma$, que es la definición.

**Forzado, régimen estacionario.** Pasado el transitorio, el sistema oscila con la $\omega$ de la fuerza:

$$x = A(\omega)\cos(\omega t - \delta),\quad A(\omega) = \frac{F_0/m}{\sqrt{(\omega_0^2-\omega^2)^2 + (2\gamma\omega)^2}},\quad \tg\delta = \frac{2\gamma\omega}{\omega_0^2-\omega^2}.$$

- **Potencia media** que entrega la fuerza (igual a la que disipa el amortiguador): $\langle P\rangle = \tfrac12 b\,\omega^2 A^2$.
  - Su máximo está **exactamente** en $\omega = \omega_0$ (resonancia de potencia) y vale $\langle P\rangle_{max} = F_0^2/2b$.
  - Ahí $\delta = \pi/2$: el desplazamiento atrasa un cuarto de ciclo respecto de la fuerza, y la fuerza queda en fase con la velocidad. Por eso empuja siempre a favor y la potencia es máxima.
  - No hay que confundirlo con la resonancia de **amplitud**, en $\omega_{RA} = \sqrt{\omega_0^2 - 2\gamma^2}$.
- **Mitad de potencia.** $\langle P\rangle = \tfrac12\langle P\rangle_{max}$ cuando $(\omega_0^2-\omega^2)^2 = (2\gamma\omega)^2$, o sea en $\omega_\pm = \sqrt{\omega_0^2+\gamma^2} \pm \gamma$. Si el amortiguamiento es débil, $\omega_\pm \approx \omega_0 \pm \gamma$. El ancho de banda es $\Delta\omega = 2\gamma = \omega_0/Q$.
- En resonancia de potencia: $A(\omega_0) = \dfrac{F_0/m}{2\gamma\omega_0} = \dfrac{F_0}{b\,\omega_0}$.

**Cambio de régimen.** Cuando se quita la fuerza:

- **la posición y la velocidad no saltan** (la masa no puede teletransportarse ni cambiar de velocidad de golpe);
- el sistema es el mismo, así que sigue con los mismos $\omega_0$ y $\gamma$;
- desde ese instante oscila **libre y amortiguado**, con $\omega'$ y **no** con la $\omega$ de la fuerza.

Las constantes salen de $x(0) = x_0$ y $v(0) = v_0$:

$$A = \sqrt{x_0^2 + \left(\frac{v_0 + \gamma x_0}{\omega'}\right)^2},\qquad \tg\varphi_0 = -\frac{v_0 + \gamma x_0}{x_0\,\omega'}.$$

Esas fórmulas salen de dos ecuaciones: $x(0) = A\cos\varphi_0 = x_0$ y $\dot x(0) = -\gamma A\cos\varphi_0 - \omega' A\sin\varphi_0 = v_0$.

## 4. Resolución paso a paso

### Paso 0: $\omega_0$

Planteo: el enunciado dice que con $\omega = 6$ s⁻¹ se alcanza el máximo de potencia media. Eso pasa en $\omega = \omega_0$, así que

$$\omega_0 = 6\ \text{s}^{-1}.$$

### a) Factor de calidad

1. **Energía después de 3 ciclos:**
$$\frac{E(3T')}{E_0} = e^{-2\gamma\,(3T')} = 0{,}2076.$$
2. **Despejar $\gamma T'$:** $6\gamma T' = -\ln 0{,}2076 = 1{,}5721$, así que $\gamma T' = 0{,}26202$.
3. **Pasar de $\gamma T'$ a $\gamma$.** Con $T' = 2\pi/\omega'$:
$$\frac{\gamma}{\omega'} = \frac{0{,}26202}{2\pi} = 0{,}041702.$$
Como $\omega'^2 = \omega_0^2 - \gamma^2$, queda
$$\gamma = \frac{(\gamma/\omega')\,\omega_0}{\sqrt{1 + (\gamma/\omega')^2}} = \frac{0{,}041702\cdot 6}{1{,}000869} = 0{,}2500\ \text{s}^{-1}.$$
Además, $\omega' = \sqrt{36 - 0{,}0625} = 5{,}9948$ s⁻¹.
4. **Factor de calidad:**
$$Q = \frac{\omega_0}{2\gamma} = \frac{6}{2\cdot 0{,}25} = \boxed{12}.$$

Con $T_0 = 2\pi/\omega_0$ en lugar de $T'$ da $\gamma = 0{,}2502$ s⁻¹ y $Q = 11{,}99$: lo mismo.

Datos útiles para después: $k = m\omega_0^2 = 10\cdot 36 = 360$ N/m y $b = 2m\gamma = 2\cdot 10\cdot 0{,}25 = 5$ kg/s. Chequeo: $Q = m\omega_0/b = 60/5 = 12$ ✓.

### b) $\omega$ con la mitad de la potencia

1. **Potencia máxima:** $\langle P\rangle_{max} = \dfrac{F_0^2}{2b} = \dfrac{225}{10} = 22{,}5$ W. La mitad es 11,25 W.
2. **Aproximación de oscilador débilmente amortiguado** ($Q = 12 \gg 1$):
$$\omega \approx \omega_0 \pm \gamma = 6 \pm 0{,}25 \quad\Rightarrow\quad \boxed{\omega = 5{,}75\ \text{s}^{-1}\ \text{o}\ 6{,}25\ \text{s}^{-1}}$$
Alcanza con dar uno.
3. **Cuenta exacta** (para comparar): $\omega_\pm = \sqrt{36 + 0{,}0625} \pm 0{,}25 = 6{,}0052 \pm 0{,}25$, o sea 5,755 s⁻¹ y 6,255 s⁻¹. Con los valores aproximados, la potencia media da 48,9 % y 51,0 % de la máxima.
4. **Ancho de banda:** $2\gamma = 0{,}5$ s⁻¹ $= \omega_0/Q$ ✓.

### c) Se quita la fuerza en la máxima elongación

1. **Estacionario en $\omega_0$:**
$$A_{est} = \frac{F_0/m}{2\gamma\omega_0} = \frac{1{,}5}{2\cdot 0{,}25\cdot 6} = \frac{1{,}5}{3} = 0{,}5\ \text{m},\qquad \delta = \frac{\pi}{2}.$$
2. **Referencia y condiciones iniciales.** Origen en la posición de equilibrio, $x$ positivo en el sentido en que se estira el resorte. En la máxima elongación $x$ es máximo y la velocidad es cero:
$$x_0 = +0{,}5\ \text{m},\qquad v_0 = 0.$$
3. **Movimiento libre:** $x(t) = A\,e^{-\gamma t}\cos(\omega' t + \varphi_0)$, con $\gamma = 0{,}25$ s⁻¹ y $\omega' = 5{,}9948$ s⁻¹.
4. **Constantes:**
$$\tg\varphi_0 = -\frac{0 + 0{,}25\cdot 0{,}5}{0{,}5\cdot 5{,}9948} = -0{,}04170 \;\Rightarrow\; \varphi_0 = -0{,}0417\ \text{rad}$$
$$A = \sqrt{0{,}5^2 + \left(\frac{0{,}125}{5{,}9948}\right)^2} = 0{,}5004\ \text{m}$$
5. **Resultado:**
$$\boxed{x(t) = 0{,}5004\,e^{-0{,}25\,t}\cos(5{,}995\,t - 0{,}0417)\ \ [\text{m, s}]}$$
6. **Chequeos:**
   - $x(0) = 0{,}5004\cos(-0{,}0417) = 0{,}500$ m ✓;
   - $v(0) = 0$ ✓;
   - la energía al soltar es $E = \tfrac12 k x_0^2 = 45$ J, y tras 3 ciclos libres queda el 20,76 % (consistente con el dato de a).

Como $\varphi_0$ es chiquito, $x(t) \approx 0{,}5\,e^{-0{,}25 t}\cos(5{,}99\,t)$ también es aceptable si se aclara la aproximación.

## 5. Resultados finales

- **a)** $\omega_0 = 6$ s⁻¹, $\gamma = 0{,}25$ s⁻¹ ⇒ $Q = 12$.
- **b)** $\omega \approx \omega_0 \pm \gamma$ = **5,75 s⁻¹ o 6,25 s⁻¹** (exacto: 5,755 o 6,255 s⁻¹). $\langle P\rangle_{max} = 22{,}5$ W.
- **c)** $A_{est} = 0{,}5$ m; $x(t) = 0{,}5004\,e^{-0{,}25t}\cos(5{,}995\,t - 0{,}0417)$ m, con el origen en el equilibrio y $+$ en el sentido de estiramiento. Además, $k = 360$ N/m y $b = 5$ kg/s.

## 6. Dónde es fácil equivocarse

- **79,24 % es lo que se pierde, no lo que queda.** Lo que queda es 0,2076.
- **Amplitud vs. energía.** La energía decae con $e^{-2\gamma t}$; si usás $e^{-\gamma t}$ te da $\gamma$ el doble y $Q = 6$.
- **Son 3 ciclos.** El exponente es $2\gamma\cdot 3T' = 6\gamma T'$.
- **"$Q = 2\pi E/\Delta E$" con la pérdida real de un ciclo.** Por ciclo queda $0{,}2076^{1/3} = 0{,}592$, o sea que se pierde el 40,8 %, y $2\pi/0{,}408 = 15{,}4$. Está **mal**, porque la pérdida no es chica. Usá $Q = \omega_0/2\gamma$.
- **Máximo de potencia ≠ máximo de amplitud.** "Máximo de potencia media" ⇒ $\omega = \omega_0$ exacto y $\delta = \pi/2$. El máximo de amplitud está en $\omega_{RA} = \sqrt{\omega_0^2 - 2\gamma^2} = 5{,}990$ s⁻¹.
- **Ancho de banda.** Cada punto de mitad de potencia está a $\gamma$ del centro, no a $2\gamma$ ni a $\gamma/2$. El ancho **total** es $2\gamma$.
- **En c), la libre oscila con $\omega'$**, no con la $\omega = 6$ de la fuerza (ni con $\omega_0$, aunque acá difieren poco).
- **$x_0 = A_{est}$ con $v_0 = 0$.** "Máxima elongación" quiere decir que la velocidad es nula. No uses la amplitud de resonancia de amplitud.
- **La fase de la libre no es cero.** Aunque $v_0 = 0$, el término $\gamma x_0$ hace que $\varphi_0 = -\arctg(\gamma/\omega') \ne 0$.
- **Calculadora en RAD** para $\varphi_0$ y para $\omega' t$.

## 7. Ideas de animación

- **Energía que se apaga.** Una masa con un resorte y un amortiguador oscila libre, con una barra de energía al costado y un contador de ciclos. Al completar 3 ciclos la barra queda en 20,76 % (se marca el 79,24 % "perdido"). Encima, la curva $E(t) = E_0e^{-2\gamma t}$, con un escalón por ciclo.
- **De $\gamma T'$ a $Q$.** Un triángulo rectángulo con catetos $\gamma$ y $\omega'$ e hipotenusa $\omega_0$ ($\omega_0^2 = \omega'^2 + \gamma^2$), para que se vea de dónde sale la fórmula de $\gamma$.
- **Curva de potencia.** $\langle P\rangle(\omega)$ con el pico en 6 s⁻¹ (22,5 W), una línea horizontal a media altura (11,25 W) y un barrido que marca 5,75 y 6,25. Una llave muestra el ancho $2\gamma = 0{,}5$ s⁻¹.
- **Fasores.** La fuerza $F$, la velocidad $v$ y el desplazamiento $x$ girando. En $\omega_0$, $F$ y $v$ van juntas y $x$ atrasa 90°.
- **Corte de la fuerza.** La sinusoide estacionaria de amplitud 0,5 m. En una cresta desaparece la flecha de la fuerza, y desde ahí la curva sigue como amortiguada dentro de la envolvente $\pm 0{,}5\,e^{-0{,}25t}$. Se resalta que la curva no salta y que la pendiente en ese punto es cero.
