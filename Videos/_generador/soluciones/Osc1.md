# Osc 1 · Péndulo forzado en máxima amplitud: se apaga el motor

Origen: 1P 16/9/2023, ejercicio 4. Verificación numérica: `Osc1.py`.

## 1. Datos y qué se pide

**Datos**

| Dato | Valor SI |
|---|---|
| Masa | $m=100\text{ g}=0{,}1$ kg (no hace falta para $\theta(t)$) |
| Largo del péndulo | $L=1{,}6$ m |
| Gravedad | $g=10\ \text{m/s}^2$ |
| Frecuencia del motor | $\omega=2{,}496\ \text{s}^{-1}$, con la que se logra "la máxima amplitud posible" ⇒ $\omega=\omega_{RA}$ |
| En $t=0$ | el péndulo está en su máxima elongación: $\theta(0)=+0{,}2$ rad y $\dot\theta(0)=0$. En ese instante se apaga el motor. |
| Pequeñas oscilaciones | $\sen\theta\approx\theta$ (ángulos en rad) |

**Qué se pide**

- **a)** La función $\theta(t)$ desde $t=0$, con el péndulo ya libre y amortiguado.
- **b)** El instante $t_2$ en que la velocidad se anula por segunda vez después de $t=0$.

## 2. Molde en la hoja (v6)

- **Ejercicio 4 · "Cambio de régimen: forzado → libre" (18/10/25).**
  - **Se repite:**
    - en $t=0$ se apaga la fuerza en un **máximo de elongación**;
    - la posición y la velocidad no saltan;
    - $\gamma$ es el mismo antes y después (paso 5 de la receta: "si cesa en un máximo de elongación, $A_{est}=x(t_0)$").
  - **Cambia el sentido de la cuenta.** En el 4 dan la oscilación libre y hay que reconstruir la forzada. Acá dan la forzada (su frecuencia y su amplitud) y hay que escribir la libre.
- **Nota del ejercicio 3:** "Si dan $\omega_{RA}$ y $\omega_{RP}$: $\omega_0=\omega_{RP}$, $\omega_{RA}^2=\omega_0^2-2\gamma^2$". Es la fórmula que da $\gamma$.
- **Ejercicio 1:** las fórmulas de $A$ y $\varphi_0$ a partir de $x_0$ y $v_0$: $A=\sqrt{x_0^2+\left(\frac{v_0+\gamma x_0}{\omega'}\right)^2}$ y $\tg\varphi_0=-\frac{v_0+\gamma x_0}{x_0\omega'}$.
- **Receta de oscilaciones:** resonancia de amplitud ("máx. amplitud") contra resonancia de potencia ("máx. potencia"), y la del péndulo: $\omega_0=\sqrt{g/L}$.

## 3. Teoría que se usa

**Péndulo simple, oscilaciones chicas.**

- La ecuación es $\ddot\theta+\frac gL\theta=0$, así que $\omega_0=\sqrt{g/L}$.
- No depende de la masa: el peso tira con $mg$ pero también hay que mover $m$, y se cancelan.

**Libre amortiguado.**

- La ecuación es $\ddot\theta+2\gamma\dot\theta+\omega_0^2\theta=0$.
- Si $\gamma<\omega_0$ (subamortiguado), la solución es
$$\theta(t)=A\,e^{-\gamma t}\cos(\omega' t+\varphi),\qquad \omega'=\sqrt{\omega_0^2-\gamma^2}$$
- Oscila con $\omega'$, un poco menor que $\omega_0$, y con una amplitud que decae como $e^{-\gamma t}$.

**Forzado: dos "resonancias".** En régimen estacionario oscila con la frecuencia de la fuerza, con amplitud
$$A(\omega)=\frac{F_0/m}{\sqrt{(\omega_0^2-\omega^2)^2+(2\gamma\omega)^2}}$$

- **Resonancia de amplitud ("máxima amplitud posible").** La amplitud es máxima donde el denominador es mínimo. Derivando $(\omega_0^2-\omega^2)^2+4\gamma^2\omega^2$ respecto de $\omega^2$ e igualando a cero:
$$\omega_{RA}=\sqrt{\omega_0^2-2\gamma^2}$$
  Es un poco **menor** que $\omega_0$.
- **Resonancia de potencia ("máxima potencia").** Pasa en $\omega=\omega_0$, con $\delta=\pi/2$.
- Como el enunciado dice "máxima amplitud", la frecuencia del motor es $\omega_{RA}$. Comparándola con $\omega_0$ sale $\gamma$.

**Cambio de régimen.** Cuando se apaga el motor:

- el péndulo no puede cambiar de golpe ni su posición ni su velocidad (haría falta una fuerza infinita), así que $\theta$ y $\dot\theta$ son continuos en $t=0$;
- el rozamiento es el mismo, así que $\gamma$ también;
- lo que cambia es la frecuencia: deja de ser la del motor y pasa a ser la propia, $\omega'$.

**Constantes a partir de las condiciones iniciales.**

- De $\theta(0)=A\cos\varphi=\theta_0$ y $\dot\theta(0)=A(-\gamma\cos\varphi-\omega'\sen\varphi)=v_0$:
$$A=\sqrt{\theta_0^2+\left(\frac{v_0+\gamma\theta_0}{\omega'}\right)^2}\qquad \tg\varphi=-\frac{v_0+\gamma\theta_0}{\theta_0\,\omega'}$$
- Con $v_0=0$, $\varphi$ **no** es cero: el $e^{-\gamma t}$ también "frena" y corre un poco la fase.

**Cuándo la velocidad es cero.**

- $\dot\theta=-A e^{-\gamma t}\left[\gamma\cos(\omega't+\varphi)+\omega'\sen(\omega't+\varphi)\right]=0$, o sea $\tg(\omega't+\varphi)=-\gamma/\omega'$.
- Como en $t=0$ la velocidad es cero, esa misma condición se cumple en $t=0$: $\tg\varphi=-\gamma/\omega'$.
- Entonces las soluciones son $\omega' t=k\pi$, es decir $t_k=k\,\pi/\omega'$: un cero de velocidad cada medio período $T'/2$, empezando en $t=0$.

## 4. Resolución paso a paso

### Paso 1 · Frecuencia propia

- **Fórmula:** $\omega_0=\sqrt{g/L}$.
- **Reemplazo:** $\omega_0=\sqrt{10/1{,}6}=\sqrt{6{,}25}$.
- **Resultado:** $\omega_0=2{,}5\ \text{s}^{-1}$.

### Paso 2 · γ a partir de la resonancia de amplitud

- **Planteo:** $\omega=2{,}496\ \text{s}^{-1}$ es $\omega_{RA}$, un poco menor que $\omega_0=2{,}5$. Esa diferencia es la que da $\gamma$.
- **Fórmula:** $\omega_{RA}^2=\omega_0^2-2\gamma^2$ ⇒ $\gamma=\sqrt{\dfrac{\omega_0^2-\omega_{RA}^2}{2}}$.
- **Reemplazo:** $2\gamma^2=6{,}25-2{,}496^2=6{,}25-6{,}230016=0{,}019984$ ⇒ $\gamma^2=0{,}009992\ \text{s}^{-2}$.
- **Resultado:** $\gamma=0{,}09996\approx0{,}1\ \text{s}^{-1}$. El 2,496 es $\sqrt{6{,}23}$ redondeado, así que el dato está armado con $\gamma=0{,}1$.
- **Régimen:** $\gamma=0{,}1\ll\omega_0=2{,}5$ ⇒ **subamortiguado**, con $Q=\omega_0/2\gamma\approx12{,}5$.

### Paso 3 · Frecuencia de la oscilación libre

- **Fórmula:** $\omega'=\sqrt{\omega_0^2-\gamma^2}$.
- **Reemplazo:** $\omega'=\sqrt{6{,}25-0{,}009992}=\sqrt{6{,}240008}$.
- **Resultado:** $\omega'=2{,}498\ \text{s}^{-1}$, con $T'=2\pi/\omega'=2{,}515$ s.

Las tres frecuencias, ordenadas: $\omega_{RA}=2{,}496<\omega'=2{,}498<\omega_0=2{,}5$.

### Paso 4 · Condiciones iniciales

En $t=0$ el péndulo está en el extremo de su oscilación forzada, de amplitud máxima 0,2 rad:

- $\theta_0=+0{,}2$ rad;
- $\dot\theta_0=0$, porque en el extremo la velocidad es cero;
- las dos se conservan al apagarse el motor.

### Paso 5 · a) Amplitud y fase

- **Término auxiliar:** $\dfrac{v_0+\gamma\theta_0}{\omega'}=\dfrac{0+0{,}1\cdot0{,}2}{2{,}498}=0{,}008003$ rad.
- **Amplitud:** $A=\sqrt{0{,}2^2+0{,}008003^2}=\sqrt{0{,}04+6{,}4\cdot10^{-5}}=0{,}2002$ rad.
- **Fase:** $\tg\varphi=-\dfrac{0{,}1\cdot0{,}2}{0{,}2\cdot2{,}498}=-\dfrac{\gamma}{\omega'}=-0{,}0400$ ⇒ $\varphi=-0{,}0400$ rad (calculadora en RAD).
- **Resultado:**
$$\boxed{\theta(t)=0{,}2002\,e^{-0{,}1\,t}\cos(2{,}498\,t-0{,}040)\quad[\theta\text{ en rad},\ t\text{ en s}]}$$
- **Chequeo:** $\theta(0)=0{,}2002\cos(-0{,}040)=0{,}2000$ rad y $\dot\theta(0)=0$. ✓
- Como $\gamma\ll\omega'$, en la práctica $\theta(t)\approx0{,}2\,e^{-0{,}1t}\cos(2{,}498\,t)$. Igual conviene escribir la expresión completa, que cumple exactamente $\dot\theta(0)=0$.

### Paso 6 · b) Ceros de la velocidad

- **Planteo:** $\dot\theta=0$ ⇔ $\tg(\omega't+\varphi)=-\dfrac{\gamma}{\omega'}=\tg\varphi$ ⇔ $\omega't=k\pi$ ⇔ $t_k=\dfrac{k\pi}{\omega'}$.
- **Los primeros ceros:**
  - $k=0$: $t=0$, el instante inicial, que no se cuenta;
  - $k=1$: $t_1=\dfrac{\pi}{2{,}498}=1{,}258$ s, en el extremo opuesto: $\theta=-0{,}176$ rad;
  - $k=2$: $t_2=\dfrac{2\pi}{2{,}498}=T'$.
- **Resultado:** $\boxed{t_2=2{,}515\ \text{s}}$. El péndulo vuelve al lado positivo con $\theta=0{,}2\,e^{-0{,}1\cdot2{,}515}=+0{,}156$ rad.
- **Chequeo numérico** (búsqueda de cambios de signo de $\dot\theta$ en `Osc1.py`): 1,2576 s; 2,5153 s; 3,7729 s. ✓

**Ambigüedad: "por segunda vez, luego del instante inicial".**

- La lectura natural (y la del alumno que resolvió el PDF) es no contar $t=0$: primera vez en $t_1=1{,}258$ s y **segunda en $t_2=2{,}515$ s**. Es la más probable, y por eso se llama $t_2$.
- Si alguien contara $t=0$ como la primera, la "segunda" sería 1,258 s. Conviene aclarar en el examen que $t=0$ no se cuenta.

## 5. Resultados finales

- $\omega_0=2{,}5\ \text{s}^{-1}$; $\gamma=0{,}1\ \text{s}^{-1}$ (0,09996); $\omega'=2{,}498\ \text{s}^{-1}$; $T'=2{,}515$ s.
- **a)** $\theta(t)=0{,}2002\,e^{-0{,}1t}\cos(2{,}498\,t-0{,}040)$ [rad, s], con $\theta(0)=0{,}2$ rad y $\dot\theta(0)=0$.
- **b)** $t_2=2\pi/\omega'=T'=2{,}515$ s. El primer cero de velocidad está en $t_1=1{,}258$ s.

**Contraste con la resolución del PDF** (página 5, de un alumno):

- Pone $\gamma=0{,}01\ \text{s}^{-1}$: le faltó la raíz, porque 0,01 es $\gamma^2$. Por eso escribe $e^{-0{,}01t}$ y $\varphi=-0{,}004$, que están **mal**.
- Igual usa $\omega'=2{,}498$, que es el valor de $\gamma=0{,}1$, así que su $t_2=2{,}515$ s coincide.

## 6. Dónde es fácil equivocarse

- **Confundir las resonancias.** "Máxima amplitud" ⇒ $\omega_{RA}=\sqrt{\omega_0^2-2\gamma^2}$; "máxima potencia" ⇒ $\omega_0$. Si se toma $2{,}496=\omega_0$, no hay forma de sacar $\gamma$, y $\omega_0$ estaría mal: es $\sqrt{g/L}=2{,}5$.
- **Olvidar la raíz al despejar $\gamma$:** da 0,01 en vez de 0,1. Es justo el error de la resolución del PDF.
- **Usar la frecuencia equivocada en la libre.** Una vez apagado el motor, la frecuencia es $\omega'=2{,}498$. No es la del motor (2,496) ni $\omega_0$ (2,5). Con esas, $t_2$ daría 2,517 s o 2,513 s.
- **Suponer $\varphi=0$ porque $v_0=0$.** Con amortiguamiento, $\tg\varphi=-\gamma/\omega'$: es chico, pero no es cero.
- **Buscar los ceros de velocidad donde el coseno vale ±1.** Eso da $t=(2\pi-\varphi)/\omega'=2{,}531$ s. Con amortiguamiento, el extremo no coincide con el máximo del coseno; los ceros de $\dot\theta$ son exactamente $t=k\pi/\omega'$.
- **Contar $t=0$** como primera vez, o pedir $t_2$ como medio período.
- **La masa es un dato que sobra.** Solo serviría para $b=2m\gamma=0{,}02$ kg/s. $\omega_0$ del péndulo no depende de $m$.
- **Calculadora en DEG** para $\cos(2{,}498t-0{,}04)$: todo va en radianes.

## 7. Ideas de animación

1. **Curva de resonancia.**
   - Gráfico de $A(\omega)/A(0)$ con $\gamma=0{,}1$ (valores de `Osc1.py`: 2,0 → 2,7; 2,4 → 9,1; 2,496 → 12,52; 2,5 → 12,51; 2,6 → 8,6; 3,0 → 2,2).
   - Un punto que barre $\omega$ y se detiene en el pico, en 2,496. Una marca punteada en $\omega_0=2{,}5$, casi en el mismo lugar.
   - Hacer zoom para mostrar que el pico está un pelito a la izquierda de $\omega_0$: de esa diferencia sale $\gamma$.
2. **El péndulo forzado.**
   - El péndulo oscila con amplitud 0,2 rad (unos 11,5°), con el motor girando en el punto de suspensión.
   - Llega al extremo derecho, cae un rayo y el motor se apaga (cambia de color o se tacha). Congelar un instante con las etiquetas $\theta=0{,}2$ y $\dot\theta=0$.
3. **Péndulo libre + gráfico sincronizado.**
   - El péndulo sigue oscilando, con cada vez menos amplitud.
   - Al lado, $\theta(t)$ se dibuja al mismo ritmo, con la envolvente $\pm0{,}2\,e^{-0{,}1t}$ en línea punteada.
   - Usar `talk()` para que la animación dure lo que dura la narración: la escala de tiempo real es 2,5 s por oscilación.
4. **Ceros de la velocidad.**
   - Abajo, el gráfico de $\dot\theta(t)$.
   - Cada vez que cruza el cero, un punto se ilumina en los dos gráficos y el péndulo se detiene un instante en el extremo: $t_1=1{,}258$ s del lado negativo y $t_2=2{,}515$ s del lado positivo.
   - Contador "1ra vez, 2da vez" para fijar qué se cuenta.
5. **Fasor que se achica.**
   - Una flecha que gira con $\omega'$ y cuyo largo decae con $e^{-\gamma t}$, dibujando una espiral. Su proyección horizontal es $\theta(t)$.
   - Arranca en el ángulo $\varphi=-0{,}04$ rad, casi horizontal: muestra por qué la fase no es exactamente cero.
6. **La trampa del alumno.** Superponer $0{,}2e^{-0{,}01t}$ (casi sin decaer) con la envolvente correcta $0{,}2e^{-0{,}1t}$: en 10 s una queda en 0,18 rad y la otra en 0,07 rad.
