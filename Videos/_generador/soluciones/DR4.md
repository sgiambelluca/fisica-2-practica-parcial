# DR 4 · Doble rendija: vidrio + acrílico, se cambia el vidrio; intensidad en O; Rayleigh

Origen: 2P 2C 2024, ej. 2. Números verificados con `DR4.py`.

## 1. Datos y qué se pide

| Dato | Valor | En SI |
|---|---|---|
| Separación de las rendijas | 60 µm | $d = 6\cdot10^{-5}$ m |
| Ancho de cada rendija | $d/6$ | $a = 10$ µm $= 10^{-5}$ m ($d/a = 6$) |
| Longitud de onda (en el vacío/aire) | 600 nm | $\lambda_0 = 0{,}6$ µm $= 6\cdot10^{-7}$ m |
| Rendijas–pantalla | 20 cm | $D = 0{,}20$ m |
| Medio | aire, $n = 1$; incidencia normal | — |
| Lámina 1 (una rendija) | vidrio, espesor $e$ | $n_1 = 1{,}5$ |
| Lámina 2 (la otra) | acrílico, mismo espesor $e$ | $n_2 = 1{,}4$ |
| Con las dos láminas | O queda ocupado por el **segundo máximo** | $\Delta CO(O) = 2\lambda_0$ |
| Después | el vidrio se cambia por una lámina de $n_3 < n_1$ y espesor $e/2$ ⇒ **nuevo** desplazamiento de **8 franjas** | — |
| Intensidad de cada rendija en dirección normal | — | $I_0 = 1$ |
| c) observador | a 4 m de la pantalla, pupila de 2 mm | $L = 4$ m, $D_p = 2\cdot10^{-3}$ m |

Se pide:

- **a)** $n_3$ y un esquema con la ubicación de las láminas;
- **b)** la intensidad en O en la situación final;
- **c)** ¿el observador ve resueltos dos máximos consecutivos cerca de O? (vale la aproximación paraxial).

## 2. Molde en la hoja (v6)

- **Ejercicio 16, "Doble rendija: dos láminas + incidencia oblicua" (Recu 7/6/25).** Allá hay vidrio en una rendija y acrílico en la otra, y "corre 4 franjas" ⇒ $\Delta CO_{láminas} = 4\lambda_0$, de donde sale $e$. También se repite $I = 4I_0\cos^2\gamma\,(\sen\beta/\beta)^2$ en el centro.
- **Ejercicios 17 y 18 ("Láminas en gas, luego líquido" y "Cámara de aceite + gota de aire").** Se cambia o se agrega una lámina y hay un **nuevo corrimiento**, que se mide desde la situación anterior.
- **Ejercicio 23, "Rayleigh"**: $\theta_{min} = 1{,}22\lambda/D$ y la separación que se resuelve.
- **Qué cambia:**
  - no hay incidencia oblicua, así que en O $\beta = 0$;
  - el dato viene como "O ocupado por el 2º máximo" y no como "corre N franjas", aunque es lo mismo;
  - la lámina nueva tiene **otro espesor** ($e/2$), así que el "−1" del aire **no se cancela**;
  - c) junta la interfranja con Rayleigh.
- Receta de doble rendija, pasos 1–4, y "Interfranja, sin cuentas" (una lámina corre el patrón pero no cambia $\Delta y$).

## 3. Teoría que se usa

**Camino óptico que agrega una lámina.**

- Una lámina de espesor $e$ e índice $n_l$, puesta en un medio de índice $n$, reemplaza un trozo $e$ de medio por un trozo $e$ de lámina. El camino óptico de ese haz cambia en $e\,(n_l - n)$; en aire, $e\,(n_l - 1)$.
- La diferencia de camino óptico entre los dos haces que llegan a un punto P es
$$\Delta CO(P) = \underbrace{n\,d\sen\theta}_{\text{geométrica}} + \underbrace{e_1(n_1-1) - e_2(n_2-1)}_{\text{láminas}}.$$
- En O ($\theta = 0$) la parte geométrica es cero: solo cuentan las láminas.

**Máximos y corrimiento.**

- Hay máximo de interferencia donde $\Delta CO = m\lambda_0$.
- "O ocupado por el $m$-ésimo máximo" ⇒ $\Delta CO(O) = m\lambda_0$.
- Correr el patrón **una franja** equivale a cambiar $\Delta CO$ en **un** $\lambda_0$: un desplazamiento de $N$ franjas es un cambio de $N\lambda_0$.
- **Hacia dónde se corre:** hacia el lado de la rendija cuya lámina agrega más camino. El orden 0 necesita que el camino geométrico desde la **otra** rendija sea más largo para compensar.

**Intensidad.**
$$I = 4I_0\cos^2\gamma\left(\frac{\sen\beta}{\beta}\right)^2,\qquad \gamma = \frac{\pi\,\Delta CO}{\lambda_0},\qquad \beta = \frac{\pi a}{\lambda_0}\,n\sen\theta.$$

- $\gamma$ compara **las dos rendijas** (usa $d$ y **sí** incluye las láminas).
- $\beta$ compara los rayos **dentro de una misma rendija** (usa $a$). Las láminas cubren toda la rendija y suman lo mismo a todos sus rayos, así que **no entran en $\beta$**: la envolvente de difracción no se corre.
- Los "órdenes faltantes" ($m = p\,d/a$) son los máximos de interferencia que caen en un cero de la envolvente. Si las láminas corren la interferencia, cambia **cuál** máximo cae en el cero.

**Interfranja.** Con la aproximación paraxial, $\Delta y = \dfrac{\lambda_0 D}{n\,d}$. Las láminas corren todo el patrón pero no cambian la separación entre franjas.

**Criterio de Rayleigh (pupila circular).**

- Dos fuentes puntuales se resuelven si el ángulo que forman vistas desde el ojo es mayor o igual que $\theta_{min} = 1{,}22\,\lambda/D_p$.
- Vistas a distancia $L$, dos franjas separadas $\Delta y$ forman un ángulo $\alpha \approx \Delta y/L$.

## 4. Resolución paso a paso

### a) Espesor $e$ y luego $n_3$

**Situación 1 (vidrio + acrílico, los dos de espesor $e$).**

1. **Camino que agregan las láminas:**
$$\Delta CO_{lám} = e(n_1 - 1) - e(n_2 - 1) = e(n_1 - n_2) = 0{,}1\,e.$$
2. **"O ocupado por el segundo máximo":**
$$0{,}1\,e = 2\lambda_0 = 1{,}2\ \mu\text{m} \;\Rightarrow\; \boxed{e = 12\ \mu\text{m}}$$
El vidrio agrega $12\cdot0{,}5 = 6$ µm y el acrílico $12\cdot0{,}4 = 4{,}8$ µm.
3. **Dónde quedó el orden 0:** el patrón se corrió 2 franjas hacia el lado del vidrio. El orden 0 quedó en $\sen\theta = 2\lambda_0/d = 0{,}02$, o sea a $y \approx 4$ mm de O.

**Situación 2 (el vidrio pasa a ser $n_3$ con espesor $e/2 = 6$ µm).**

4. **Nueva diferencia en O:**
$$\Delta CO'(O) = \frac e2(n_3 - 1) - e(n_2 - 1).$$
5. **Cambio respecto de la situación 1:**
$$\Delta CO' - \Delta CO = \frac e2(n_3 - 1) - e(n_1 - 1) = \frac e2\,(n_3 - 2).$$
Como $n_3 < n_1 = 1{,}5$, el cambio es negativo: el patrón vuelve hacia el lado del acrílico.
6. **8 franjas ⇒ $8\lambda_0$:**
$$\frac e2\,(2 - n_3) = 8\lambda_0 \;\Rightarrow\; 2 - n_3 = \frac{16\lambda_0}{e} = \frac{16\cdot0{,}6}{12} = 0{,}8 \;\Rightarrow\; \boxed{n_3 = 1{,}2}$$
La otra raíz, con un cambio de $+8\lambda_0$, da $n_3 = 2{,}8 > n_1$: se descarta.
7. **Chequeo:** $\Delta CO'(O) = 6\cdot0{,}2 - 12\cdot0{,}4 = 1{,}2 - 4{,}8 = -3{,}6$ µm $= -6\lambda_0$. En O pasó de estar el máximo $+2$ a estar el $-6$: son 8 franjas ✓.
8. **Dónde quedó el orden 0:** a 6 franjas del lado del acrílico, en $\sen\theta = 6\lambda_0/d = 0{,}06$, o sea $y = 1{,}20$ cm.

**Esquema:**

```
            rendija 1: vidrio n1 = 1,5, e = 12 µm   →  (después) n3 = 1,2, 6 µm
luz →  ||
            rendija 2: acrílico n2 = 1,4, e = 12 µm (no cambia)
                                                        pantalla a 20 cm, O en el centro
```

Las láminas van del lado de la pantalla ("después de las rendijas"). Qué rendija lleva cada una no cambia los números: solo decide hacia qué lado se corre el patrón.

**Ambigüedades revisadas:**

- **"Segundo máximo" = orden $m = 2$.** Si se contara el central como el primero ($m = 1$), daría $e = 6$ µm y $n_3 = 2 - 16\cdot0{,}6/6 = 0{,}4 < 1$, que es imposible. Eso confirma $m = 2$.
- **"Nuevo desplazamiento de 8 franjas" se mide desde la situación anterior.** Si se midiera desde el patrón sin láminas ($\Delta CO' = \pm8\lambda_0$), daría $n_3 = 2{,}6$ (no cumple $n_3 < n_1$) o $n_3 = 1$ (sería "no poner lámina"). Las dos se descartan.

### b) Intensidad en O (situación final)

1. **Interferencia:** $\gamma = \dfrac{\pi\,\Delta CO'(O)}{\lambda_0} = \dfrac{\pi(-3{,}6)}{0{,}6} = -6\pi$, así que $\cos^2\gamma = 1$.
2. **Difracción:** $\beta(O) = \dfrac{\pi a}{\lambda_0}\sen 0 = 0$, así que $\left(\dfrac{\sen\beta}{\beta}\right)^2 = 1$. Las láminas no entran en $\beta$.
3. **Intensidad:**
$$I(O) = 4I_0\cdot1\cdot1 = \boxed{4}\quad(\text{con } I_0 = 1;\ \text{o sea } 4I_0).$$

**Ojo con $d/a = 6$.** Parecería que "el orden 6 falta". No es así: los órdenes faltantes son los que caen en un **cero de la envolvente**, y la envolvente está fija, centrada en $\theta = 0$, con su primer cero en $\sen\theta = \lambda_0/a = 0{,}06$ ($y = 1{,}20$ cm). Ahí cae ahora el **orden 0**, que es el que desaparece. En O la envolvente vale 1 y la franja es brillante.

En la situación 1 también daba $I(O) = 4$ ($\gamma = 2\pi$).

### c) ¿Se resuelven dos máximos consecutivos cerca de O?

1. **Interfranja** (paraxial, en aire; las láminas no la cambian):
$$\Delta y = \frac{\lambda_0 D}{d} = \frac{6\cdot10^{-7}\cdot0{,}20}{6\cdot10^{-5}} = 2\cdot10^{-3}\ \text{m} = 2\ \text{mm}.$$
2. **Ángulo que forman vistos desde el ojo**, a 4 m:
$$\alpha = \frac{\Delta y}{L} = \frac{2\cdot10^{-3}}{4} = 5\cdot10^{-4}\ \text{rad}.$$
3. **Límite de Rayleigh de la pupila:**
$$\theta_{min} = 1{,}22\frac{\lambda}{D_p} = 1{,}22\cdot\frac{6\cdot10^{-7}}{2\cdot10^{-3}} = 3{,}66\cdot10^{-4}\ \text{rad}.$$
4. **Comparación:** $\alpha = 5\cdot10^{-4} > \theta_{min} = 3{,}66\cdot10^{-4}$, así que **sí, los ve resueltos** ($\alpha/\theta_{min} = 1{,}37$).
   - Dicho de otra forma: a 4 m el ojo separa puntos a partir de $4\cdot3{,}66\cdot10^{-4} = 1{,}46$ mm, y las franjas están a 2 mm.
   - Las seguiría resolviendo hasta unos $2\cdot10^{-3}/3{,}66\cdot10^{-4} = 5{,}46$ m.

## 5. Resultados finales

- **a)** $e = 12$ µm; **$n_3 = 1{,}2$**, con espesor 6 µm en la rendija que tenía el vidrio. En O, el máximo pasa del orden $+2$ al $-6$.
- **b)** **$I(O) = 4$** ($=4I_0$): $\cos^2(-6\pi) = 1$ y $\beta = 0$.
- **c)** $\Delta y = 2$ mm, $\alpha = 5\cdot10^{-4}$ rad $> \theta_{min} = 3{,}66\cdot10^{-4}$ rad ⇒ **sí se resuelven**.

## 6. Dónde es fácil equivocarse

- **Usar $e\,n$ en lugar de $e\,(n - 1)$.** Con espesores iguales da lo mismo, porque el −1 se cancela. Después del cambio los espesores son distintos ($e/2$ y $e$), y sin el −1 te da $n_3 = 2{,}2$ o $3{,}8$, ninguno menor que $n_1$.
- **Medir las 8 franjas desde el patrón original.** "Nuevo desplazamiento" se cuenta desde la situación anterior.
- **El signo del cambio.** Con $n_3 < n_1$ y la mitad de espesor, la rendija 1 agrega **menos** que antes: el patrón vuelve hacia el lado del acrílico.
- **"Como $d/a = 6$, el máximo de orden 6 falta ⇒ $I = 0$."** Error. La envolvente no se corre con las láminas: en O, $\beta = 0$ e $I = 4$. El que cae en el cero de difracción es el orden 0.
- **Meter las láminas en $\beta$.** No van: $\beta$ solo depende de $\theta$ (y de $\theta_i$ si hubiera incidencia oblicua).
- **c) mezcla dos distancias.**
  - Para la interfranja va la distancia rendijas–pantalla (0,20 m).
  - Para el ángulo en el ojo va la distancia observador–pantalla (4 m).
- **Rayleigh con pupila circular:** $1{,}22\lambda/D$, no $\lambda/a$ (ese es el de una rendija).
- **Unidades.** Trabajá en µm ($\lambda_0 = 0{,}6$ µm) o todo en m; no mezcles nm con µm.

## 7. Ideas de animación

- **Esquema de las rendijas.** Dos rendijas con una lámina celeste (vidrio) y una violeta (acrílico), y dos rayos que van hasta O.
  - Al lado, dos barras de "camino óptico extra": 6 µm y 4,8 µm. La diferencia de 1,2 µm se parte en 2 longitudes de onda.
- **Patrón deslizándose** sobre la pantalla, con O marcado:
  1. sin láminas, el central está en O;
  2. con las láminas, el patrón se corre 2 franjas hacia el vidrio;
  3. se cambia la lámina (animación del reemplazo, el espesor se reduce a la mitad) y el patrón se corre 8 franjas hacia el otro lado, con un contador de franjas que pasan por O.
- **Envolvente fija.** La envolvente de difracción, en gris, queda quieta mientras las franjas se mueven debajo. Al final, la franja de orden 0 cae justo en el primer cero (1,2 cm) y se apaga, mientras en O queda una franja brillante (I = 4).
- **Rayleigh.**
  - Un ojo a 4 m mira dos franjas separadas 2 mm. Se dibujan los dos rayos que forman el ángulo $\alpha$ y, en la retina, dos discos de Airy que se ven separados.
  - Una comparación con barras: $\alpha = 5\cdot10^{-4}$ contra $\theta_{min} = 3{,}66\cdot10^{-4}$.
  - Opcional: el ojo se aleja hasta 5,46 m y los discos se juntan.
