# Red 1 · Red con tres λ y pantalla finita; ¿el ojo resuelve las dos λ cercanas?

Origen: examen intermedio 18/10/2025, ejercicio 5. Verificación numérica: `Red1.py`.

## 1. Datos y qué se pide

**Datos**

| Dato | Valor SI |
|---|---|
| Rendijas por cm | $K=800\ \text{cm}^{-1}=8\cdot10^4\ \text{m}^{-1}$ ⇒ $d=\frac1K=1{,}25\cdot10^{-5}$ m $=12{,}5\ \mu$m |
| Ancho de cada rendija | $a=5\ \mu\text{m}=5\cdot10^{-6}$ m |
| Ancho del haz (incidencia normal) | $W=7{,}5\text{ cm}=0{,}075$ m |
| Longitudes de onda | $\lambda_1=450$ nm, $\lambda_2=520$ nm, $\lambda_3=520{,}02$ nm ($\Delta\lambda=0{,}02\text{ nm}=2\cdot10^{-11}$ m) |
| Pantalla | ancho 0,65 m, centrada ⇒ llega hasta $y_{max}=0{,}325$ m a cada lado; distancia $D=1$ m |
| Observador | a $L=0{,}10$ m de la pantalla; pupila $D_p=4\text{ mm}=4\cdot10^{-3}$ m; vale la aproximación paraxial |

**Qué se pide**

- **a)** El número máximo de líneas espectrales que se ven en la pantalla.
- **b)** Si el observador, a 10 cm de la pantalla, puede ver separadas $\lambda_2$ y $\lambda_3$ en algún orden.

## 2. Molde en la hoja (v6)

- **Ejercicio 19 · "Red: ¿cuántas líneas se ven?" (1C 2025).** Red con tres colores, dos casi iguales.
  - **Se repite el procedimiento:** $d$ y $N$ → $m_{max}$ de cada $\lambda$ → órdenes que faltan ($m=p\,d/a$) → desde qué orden se separan las dos $\lambda$ cercanas ($mN\ge\lambda/\Delta\lambda$, redondeando hacia arriba y saltando los que faltan) → tabla por orden → total $=2\cdot\text{lado}+1$.
  - **Cambia:** ahí el límite era $\sen\theta<1$; acá lo pone la **pantalla**.
- **Ejercicio 20 · "Red con pantalla finita y λ cercana" (1C 2026).** El borde de la pantalla da $\tg\theta_{max}=\frac{y_{max}}D$.
- **Ejercicio 23 · Rayleigh** (pupila de 2,44 mm): $\theta_{min}=1{,}22\,\lambda/D_p$. La novedad de la parte b) es combinar las dos resoluciones:
  - la **red** separa las dos líneas en ángulo;
  - el **ojo** tiene que llegar a verlas separadas desde 10 cm.

## 3. Teoría que se usa

**Máximos principales de la red** (incidencia normal):

$$d\sen\theta=m\lambda\ \Longrightarrow\ \sen\theta=\frac{m\lambda}{d}$$

- Son las direcciones en las que los rayos de **todas** las rendijas llegan en fase: el camino entre rendijas vecinas difiere en un número entero de $\lambda$.
- Cada $\lambda$ tiene sus propios ángulos, y por eso la red separa los colores.
- El orden $m=0$ ($\theta=0$) es común a todas las $\lambda$: es una sola línea.

**Rendijas iluminadas:** $N=\dfrac{W}{d}$, truncado (cuentan solo las rendijas enteras que toca el haz).

**Órdenes que faltan.** Cada rendija tiene ancho $a$ y difracta con ceros en $a\sen\theta=p\lambda$. Si un máximo principal cae justo en uno de esos ceros, ese orden no aparece. Pasa cuando $\frac{m\lambda}d=\frac{p\lambda}a$, o sea en $m=p\,\frac da$ entero, y vale para **todas** las $\lambda$ a la vez.

**Pantalla plana a distancia $D$.**

- Exacto: $y=D\tg\theta$.
- Con la **aproximación paraxial** ($\theta$ chico): $\tg\theta\approx\sen\theta\approx\theta$, así que $y\approx D\,\dfrac{m\lambda}{d}$.
- Una línea se ve si $|y|\le y_{max}$.

**Resolución cromática de la red.**

$$\frac{\lambda}{\Delta\lambda}\le mN$$

- Es el criterio de Rayleigh aplicado a la red: el máximo de una $\lambda$ tiene que caer, por lo menos, en el primer cero del máximo de la otra.
- El ancho angular de cada máximo baja con $N$, y la separación entre las dos $\lambda$ crece con $m$.
- Si en un orden no se cumple, las dos $\lambda$ forman **una** línea; si se cumple, forman **dos**.
- El $m$ que sale se redondea **hacia arriba**, y si ese orden falta se pasa al siguiente.

**Rayleigh para el ojo** (abertura circular de diámetro $D_p$):

$$\theta_{min}=1{,}22\,\frac{\lambda}{D_p}$$

- Dos puntos separados $s$, vistos desde una distancia $L$, forman un ángulo $\alpha\approx s/L$ (paraxial).
- Se ven separados si $\alpha\ge\theta_{min}$.

**Separación en la pantalla entre dos $\lambda$ cercanas** en el orden $m$ (paraxial): $\Delta y=D\,\dfrac{m\,\Delta\lambda}{d}$. Sin aproximar es un poco mayor: $\Delta y=\dfrac{D\,m\,\Delta\lambda}{d\cos^3\theta}$.

## 4. Resolución paso a paso

### Paso 1 · Datos de la red

- $d=\dfrac1K=\dfrac{1\text{ cm}}{800}=12{,}5\ \mu$m.
- $N=\dfrac Wd=\dfrac{7{,}5\text{ cm}}{12{,}5\ \mu\text{m}}=7{,}5\cdot800=6000$ rendijas.
- $\dfrac da=\dfrac{12{,}5}{5}=2{,}5$ ⇒ faltan $m=2{,}5\,p$ entero: $m=5,\ 10,\ \dots$

### Paso 2 · Borde de la pantalla

$y_{max}=32{,}5$ cm ⇒ $\tg\theta_{max}=\dfrac{0{,}325}{1}=0{,}325$ ⇒ $\theta_{max}=18{,}00°$.

- **Exacto:** $\sen\theta_{max}=\dfrac{0{,}325}{\sqrt{1+0{,}325^2}}=0{,}309$.
- **Paraxial:** $\sen\theta_{max}\approx\tg\theta_{max}=0{,}325$.

### Paso 3 · Orden máximo de cada λ

$\sen\theta=m\dfrac\lambda d$:

| $\lambda$ | $\lambda/d$ | $m_{max}$ paraxial ($0{,}325/(\lambda/d)$) | $m_{max}$ exacto ($0{,}309/(\lambda/d)$) |
|---|---|---|---|
| 450 nm | 0,0360 | 9,03 → **9** | 8,59 → **8** |
| 520 y 520,02 nm | 0,0416 | 7,81 → **7** | 7,43 → **7** |

### Paso 4 · Resolución de 520 y 520,02 nm

- **Planteo:** $mN\ge\dfrac{\lambda}{\Delta\lambda}=\dfrac{520}{0{,}02}=26\,000$.
- **Reemplazo:** $m\ge\dfrac{26\,000}{6000}=4{,}33$ ⇒ $m=5$, pero el 5 **falta** ⇒ se separan **desde $m=6$**.
- **Chequeo:** con $m=4$, $mN=24\,000<26\,000$ (no se separan); con $m=6$, $mN=36\,000\ge26\,000$ (sí).

### Paso 5 · Coincidencias entre 450 y 520

$450\,m_1=520\,m_2$ ⇒ $45\,m_1=52\,m_2$ pide $m_1$ múltiplo de 52: no pasa con estos órdenes. No hay líneas superpuestas de colores distintos.

### Paso 6 · Tabla por orden (un lado)

**Con la aproximación paraxial** ($y=D\,m\lambda/d$), posiciones en cm:

| $m$ | 450 nm | 520 / 520,02 nm | líneas |
|---|---|---|---|
| 1 | 3,60 | 4,16 (sin separar) | 2 |
| 2 | 7,20 | 8,32 (sin separar) | 2 |
| 3 | 10,80 | 12,48 (sin separar) | 2 |
| 4 | 14,40 | 16,64 (sin separar) | 2 |
| 5 | falta | falta | 0 |
| 6 | 21,60 | 24,960 / 24,961 (separadas) | 3 |
| 7 | 25,20 | 29,120 / 29,121 (separadas) | 3 |
| 8 | 28,80 | 33,28 → afuera | 1 |
| 9 | 32,40 (< 32,5: entra por 1 mm) | — | 1 |

Un lado: $2+2+2+2+0+3+3+1+1=16$. **Total: $2\cdot16+1=33$ líneas** (el $+1$ es el orden 0, donde las tres $\lambda$ coinciden).

**Exacto** ($y=D\tg\theta$): las posiciones de 450 nm son 3,60; 7,22; 10,86; 14,55; —; 22,12; 26,04; 30,07; **34,25** (afuera). Las de 520 nm son 4,16; 8,35; 12,58; 16,88; —; 25,78; 30,44; 35,29 (afuera).

Cambia una sola cosa: el 9º orden de 450 nm cae a 34,25 cm, **fuera** de la pantalla. Un lado: 15 ⇒ **total $2\cdot15+1=31$ líneas**.

### Ambigüedad de a): ¿paraxial o exacto?

- El enunciado dice que "es válida la aproximación paraxial". Está escrito en el ítem b), pero vale para el experimento.
- Los números parecen elegidos con esa aproximación: el 9º orden de 450 nm da $y=32{,}4$ cm y el 8º de 520 nm da $y=33{,}28$ cm. La pantalla de 65 cm (borde en 32,5) cae **justo entre los dos**.
- Con $\tg\theta$ exacta, el borde queda entre 30,4 y 34,3 cm, sin nada que lo haga parecer elegido a propósito.
- **Lo más probable es que la cátedra espere 33 líneas.** En el examen conviene escribir 33 (paraxial, como pide el enunciado) y aclarar en una línea: "sin aproximar, el 9º orden de 450 nm cae a 34,2 cm, fuera de la pantalla: serían 31".

### b) ¿El ojo, a 10 cm, separa 520 y 520,02 nm?

- **Paso 1 · Resolución del ojo.** $\theta_{min}=1{,}22\dfrac{\lambda}{D_p}=1{,}22\cdot\dfrac{520\cdot10^{-9}}{4\cdot10^{-3}}=1{,}586\cdot10^{-4}$ rad.
  - Desde $L=0{,}10$ m, eso equivale a una separación mínima en la pantalla de $s_{min}=L\,\theta_{min}=0{,}10\cdot1{,}586\cdot10^{-4}=1{,}59\cdot10^{-5}$ m $=15{,}9\ \mu$m.
- **Paso 2 · Separación de las dos líneas en la pantalla** (solo en los órdenes donde la red las separa, 6 y 7): $\Delta y=D\dfrac{m\,\Delta\lambda}{d}$.
  - $m=6$: $\Delta y=\dfrac{1\cdot6\cdot2\cdot10^{-11}}{1{,}25\cdot10^{-5}}=9{,}6\cdot10^{-6}$ m $=9{,}6\ \mu$m ⇒ $\alpha=\dfrac{9{,}6\cdot10^{-6}}{0{,}10}=9{,}6\cdot10^{-5}$ rad.
  - $m=7$: $\Delta y=11{,}2\ \mu$m ⇒ $\alpha=1{,}12\cdot10^{-4}$ rad.
- **Paso 3 · Comparación.** En los dos órdenes, $\alpha<\theta_{min}=1{,}586\cdot10^{-4}$ rad. Sin aproximar, $\Delta y$ da 10,6 y 12,8 µm: tampoco alcanza.
- **Orden que haría falta:** $m\ge\dfrac{1{,}22\,\lambda\,d\,L}{D_p\,D\,\Delta\lambda}=9{,}9$, o sea $m=10$. Pero el 10 **falta** ($m=2{,}5\cdot4$), y además caería fuera de la pantalla ($\sen\theta=0{,}416>0{,}325$).
- **Respuesta:** **no**, en ningún orden. La red sí separa las dos líneas en los órdenes 6 y 7, pero en la pantalla quedan a 10–11 µm, y el ojo a 10 cm necesita unos 16 µm.

Consecuencia: el observador ve los pares de $m=\pm6$ y $\pm7$ como una sola línea cada uno. Ve $33-4=29$ líneas (o $31-4=27$ sin aproximar).

## 5. Resultados finales

- $d=12{,}5\ \mu$m; $N=6000$; faltan $m=5$ y 10; 520 y 520,02 nm se separan desde $m=6$.
- **a)** 33 líneas con la aproximación paraxial: 450 nm hasta $m=9$, 520 nm hasta $m=7$, separadas en 6 y 7. Es la respuesta más probable de la cátedra. Con $\tg\theta$ exacta: 31, porque el 9º de 450 nm queda fuera.
- **b)** No. $\theta_{min}$ del ojo $=1{,}59\cdot10^{-4}$ rad (15,9 µm a 10 cm); la mayor separación disponible es la del orden 7, $\Delta y=11{,}2\ \mu$m ($\alpha=1{,}12\cdot10^{-4}$ rad). Haría falta $m\ge10$, que falta y cae afuera.

## 6. Dónde es fácil equivocarse

- **Pasar mal $d$:** 800 por cm ⇒ $d=\frac{10^4}{800}\ \mu$m $=12{,}5\ \mu$m (no 1,25 ni 125). $N$: 7,5 cm × 800/cm = 6000, sin pasar a metros.
- **Olvidar que falta el 5.**
  - El 5 es justo el primer orden que "pasaría" la condición de resolución. Si no se ve que falta, se dice "se separan desde $m=5$" y se cuentan 3 líneas en un orden que no existe.
  - El orden que falta también se saca de la cuenta del total.
- **Usar $\sen\theta<1$ en vez del borde de la pantalla.** Da muchísimos órdenes de más, por ejemplo hasta $m=27$ para 450 nm.
- **Mezclar paraxial y exacto:** calcular $\theta=\arcsen(0{,}324)$ y después $y=D\theta$ da 33,0 cm, ni una cosa ni la otra. Hay que elegir: $y=D\frac{m\lambda}d$ (paraxial) o $y=D\tg\theta$ (exacto).
- **El conteo:** $2\cdot\text{lado}+1$. El orden 0 es **una** línea, no tres. En los órdenes donde no se separan, 520 y 520,02 son **una** línea.
- **En b), confundir la resolución de la red con la del ojo.** $mN\ge\lambda/\Delta\lambda$ dice si la red separa los máximos. Aunque los separe, quedan a ~10 µm en la pantalla, y lo que decide es el ojo: $\alpha=\Delta y/L$ contra $1{,}22\lambda/D_p$.
- **Unidades en b):** $\Delta\lambda=0{,}02$ nm $=2\cdot10^{-11}$ m; $D_p=4\cdot10^{-3}$ m; $L=0{,}10$ m.
- **El 1,22.** Va porque la pupila es circular. Sin él, $\theta_{min}=1{,}3\cdot10^{-4}$ rad, y tampoco alcanza: la conclusión no cambia.

## 7. Ideas de animación

1. **Abanico de órdenes.**
   - La red a la izquierda, con el haz de 7,5 cm; la pantalla de 65 cm a la derecha, con los bordes en ±32,5 cm marcados.
   - Los órdenes salen en abanico, uno por uno, en dos colores: violeta-azul para 450 y verde para 520.
   - Va sumando un contador de líneas en una esquina.
2. **Orden que falta.**
   - Encima de los máximos, la campana de difracción de una rendija ($a=5\ \mu$m), con ceros en $\sen\theta=p\lambda/a$.
   - En $m=5$ la campana pasa por cero y las líneas de ese orden se apagan (aparecen y se desvanecen).
3. **Zoom ×1000 sobre la línea verde.**
   - En los órdenes 1–4 se ve una sola mancha.
   - En 6 y 7 se abre en dos picos.
   - Al lado, una barra $mN$ que crece con $m$ contra una línea en 26 000: la cruza en 4,33, el 5 está tachado y queda el 6.
4. **El borde de la pantalla.**
   - Animar el 9º orden de 450 nm llegando a 32,4 cm, a 1 mm del borde, con la etiqueta "paraxial".
   - Después, un interruptor "exacto (tg θ)" lo corre a 34,25 cm, fuera de la pantalla. El contador baja de 33 a 31.
5. **b) El ojo.**
   - Un ojo a 10 cm de la pantalla, frente a las dos líneas verdes del orden 7. Un cono finito desde la pupila a cada línea, con el ángulo $\alpha=1{,}12\cdot10^{-4}$ rad.
   - En la retina, dos discos de Airy (anillos) separados menos que su radio ($1{,}586\cdot10^{-4}$ rad): se funden en una sola mancha.
   - Comparar con dos discos separados justo $\theta_{min}$, el criterio de Rayleigh: el máximo de uno sobre el primer cero del otro.
6. **Regla del orden necesario.** Una recta $\alpha(m)=\frac{mD\Delta\lambda}{dL}$ que crece con $m$ y cruza $\theta_{min}$ en $m=9{,}9$. Marcar que $m=10$ falta y está fuera de la pantalla.
