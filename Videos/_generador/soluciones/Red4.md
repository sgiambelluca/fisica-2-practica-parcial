# Red 4 · Tres λ: ¿qué ancho de pantalla deja ver exactamente 21 líneas?

Origen: 2P 11/11/2023, ej. 2 (el PDF trae la resolución de un alumno). Números verificados con `Red4.py`.

## 1. Datos y qué se pide

| Dato | Valor | En SI / unidades cómodas |
|---|---|---|
| Longitudes de onda | 510 nm; 599,9 nm; 600,1 nm | $\lambda_1$, $\lambda_2$, $\lambda_3$ |
| Incidencia | normal | $\theta_i = 0$ |
| Red | 40 rendijas/mm | $d = \dfrac{1\ \text{mm}}{40} = 25$ µm $= 2{,}5\cdot10^{-5}$ m |
| Ancho de cada rendija | 10 µm | $a = 10^{-5}$ m ⇒ $d/a = 2{,}5$ |
| Ancho iluminado | 3 cm | $N = 30\ \text{mm}\cdot40/\text{mm} = 1200$ rendijas |
| Pantalla | ancho $D$ (incógnita), a 3,6 m, centrada | distancia $L = 3{,}6$ m; semiancho $D/2$ |

Se pide el **intervalo de $D$** con el que se ven **exactamente 21 líneas espectrales** en la pantalla.

Ojo: en este enunciado $D$ es el **ancho** de la pantalla. La distancia red–pantalla (3,6 m) la llamamos $L$.

## 2. Molde en la hoja (v6)

- **Ejercicio 20, "Red con pantalla finita y λ cercana" (1C 2026)** y **ejercicio 19, "Red: ¿cuántas líneas se ven?" (1C 2025)**. Se repite la receta completa:
  1. $d$ y $N$;
  2. órdenes faltantes $m = p\,d/a$;
  3. resolución $mN \ge \lambda/\Delta\lambda$;
  4. ordenar las líneas de un lado por $\sen\theta$;
  5. $y = L\tg\theta$;
  6. total = $2\cdot$lado + 1.
- **Qué cambia:** es el problema **inverso**. En el 20 se conoce la pantalla y se cuentan las líneas; acá se conoce la cantidad de líneas y se busca la pantalla. Hay que encontrar la última línea que **tiene** que entrar (la 10ª de cada lado) y la primera que **no** tiene que entrar (la 11ª). El ancho queda entre esas dos posiciones.
- Receta de doble rendija / redes, paso 5.

## 3. Teoría que se usa

**Máximos principales de la red.**

- Se cumplen con $d\sen\theta = m\lambda$, o sea $\sen\theta = m\lambda/d$ (en la cátedra, $\sen\theta = m\lambda K$ con $K = 1/d$).
- Cada $\lambda$ va a otro ángulo, salvo en $m = 0$: ahí van todas juntas y se ve **una sola** línea central.

**Órdenes faltantes.**

- Cada rendija tiene ancho $a$ y difracta: su envolvente se anula en $a\sen\theta = p\lambda$.
- Si un máximo principal cae justo ahí ($m\lambda/d = p\lambda/a$), ese orden **no se ve**: $m = p\,d/a$.
- La condición **no depende de $\lambda$**: si falta el orden 5, falta para todas las longitudes de onda.

**Poder resolutivo.**

- Dos longitudes de onda cercanas se ven como líneas separadas en el orden $m$ si
$$mN \ge \frac{\lambda}{\Delta\lambda}.$$
- La idea: cuantas más rendijas iluminadas ($N$) y más alto el orden ($m$), más finos son los máximos y más separados quedan.
- Si no se resuelven, se cuentan como **una** línea.

**Posición en la pantalla.**

- $y = L\tg\theta$ (exacto). La aproximación $y \approx L\sen\theta$ vale solo para ángulos chicos.
- La pantalla centrada muestra lo que cumple $|y| \le D/2$.

**Conteo.** Se cuentan las líneas de un lado ordenadas por $\sen\theta$, y el total es $2\cdot(\text{lado}) + 1$ (la central).

## 4. Resolución paso a paso

### Paso 1: datos de la red

- $d = 25$ µm.
- $N = 1200$.
- $d/a = 2{,}5$, así que faltan $m = 2{,}5\,p$ entero: **$m = 5, 10, \dots$**

  Con $p = 1$ el cero cae entre los órdenes 2 y 3, así que no se pierde ninguno.

### Paso 2: resolución

- **λ₂ y λ₃:** $\Delta\lambda = 0{,}2$ nm y $\lambda \approx 600$ nm, así que $\lambda/\Delta\lambda = 3000$.
$$mN \ge 3000 \;\Rightarrow\; m \ge \frac{3000}{1200} = 2{,}5 \;\Rightarrow\; m \ge 3.$$
  - En $m = 1$ ($mN = 1200$) y en $m = 2$ ($mN = 2400$) forman **una sola línea**.
  - Desde $m = 3$, **dos líneas**.
  - Da lo mismo usar 599,9 o 600,1: $m \ge 2{,}4996$ o $m \ge 2{,}5004$.
- **λ₁ con las otras:** $\lambda/\Delta\lambda \approx 6$. Siempre se separan.

### Paso 3: líneas de un lado, ordenadas

Con $\sen\theta = m\lambda/d$ (las $\lambda$ en µm y $d = 25$ µm) e $y = 3{,}6\tg\theta$:

| # | Línea | $\sen\theta$ | $\theta$ | $y$ (cm) |
|---|---|---|---|---|
| 1 | λ₁, $m = 1$ | 0,0204 | 1,169° | 7,35 |
| 2 | λ₂ + λ₃, $m = 1$ (no resueltas) | 0,0240 | 1,375° | 8,64 |
| 3 | λ₁, $m = 2$ | 0,0408 | 2,338° | 14,70 |
| 4 | λ₂ + λ₃, $m = 2$ (no resueltas) | 0,0480 | 2,751° | 17,30 |
| 5 | λ₁, $m = 3$ | 0,0612 | 3,509° | 22,07 |
| 6 | λ₂, $m = 3$ | 0,071988 | 4,128° | 25,983 |
| 7 | λ₃, $m = 3$ | 0,072012 | 4,130° | 25,992 |
| 8 | λ₁, $m = 4$ | 0,0816 | 4,681° | 29,47 |
| 9 | λ₂, $m = 4$ | 0,095984 | 5,508° | 34,715 |
| **10** | **λ₃, $m = 4$** | **0,096016** | **5,510°** | **34,726** |
| — | $m = 5$: **faltan** (λ₁ en 0,102; λ₂ y λ₃ en 0,120) | — | — | — |
| **11** | **λ₁, $m = 6$** | **0,1224** | **7,031°** | **44,398** |

### Paso 4: condición de 21 líneas

1. **Líneas por lado:** $21 = 2\cdot10 + 1$, así que tiene que haber **10 por lado**.
2. **La 10ª tiene que entrar** (λ₃, $m = 4$):
$$\frac D2 \ge 0{,}34726\ \text{m} \;\Rightarrow\; D \ge 0{,}6945\ \text{m}.$$
3. **La 11ª no tiene que entrar** (λ₁, $m = 6$):
$$\frac D2 < 0{,}44398\ \text{m} \;\Rightarrow\; D < 0{,}8880\ \text{m}.$$
4. **Resultado:**
$$\boxed{0{,}6945\ \text{m} \le D < 0{,}8880\ \text{m}\quad(\approx 69{,}5\ \text{cm} \le D < 88{,}8\ \text{cm})}$$

**Chequeo por conteo:**

| $D$ | Líneas |
|---|---|
| 0,69 m | 17 |
| 0,6945 m | 21 |
| 0,80 m | 21 |
| 0,887 m | 21 |
| 0,888 m | 23 |

Entre $D = 0{,}6943$ y $0{,}6945$ m se verían 19: entra λ₂ de $m = 4$ pero no λ₃.

Con la aproximación paraxial ($y = L\sen\theta$) daría $0{,}691 \le D < 0{,}881$ m: menos de 1 % de diferencia, pero la cuenta correcta es con $\tg$.

La resolución del PDF da lo mismo: $0{,}6945 \le D < 0{,}888$ m.

## 5. Resultados finales

- $d = 25$ µm, $N = 1200$, $d/a = 2{,}5$ ⇒ falta $m = 5$ (y $10, 15, \dots$).
- λ₂ y λ₃ se resuelven desde $m = 3$; en $m = 1$ y $2$ son una sola línea.
- Por lado: 2 + 2 + 3 + 3 = 10 líneas hasta $m = 4$; la siguiente es λ₁ en $m = 6$.
- **$0{,}6945\ \text{m} \le D < 0{,}888\ \text{m}$.**

## 6. Dónde es fácil equivocarse

- **Olvidar que falta $m = 5$.** La 11ª línea parecería λ₁ en $m = 5$ ($\sen\theta = 0{,}102$) y darías $D < 0{,}738$ m.
- **Contar λ₂ y λ₃ separadas en $m = 1$ y $2$.** $mN = 1200$ y $2400$, ambos menores que 3000: no se resuelven.
- **Redondear $m \ge 2{,}5$ para abajo.** El orden tiene que ser entero y cumplir la desigualdad, así que es $m = 3$.
- **$N$** es el número de rendijas **iluminadas** (3 cm), no el de toda la red.
- **La central.** Es una sola línea (las tres λ juntas): total = 2·10 + 1. No la cuentes tres veces ni la olvides.
- **$D$ es el ancho, no la distancia.** El borde está en $D/2$; la distancia es 3,6 m.
- **$d$ a partir de 40 rendijas/mm** es $10^3/40 = 25$ µm, no 40 µm ni 2,5 µm.
- **Desigualdades en los bordes.** La 10ª línea puede estar justo en el borde ($\ge$); la 11ª tiene que quedar afuera ($<$).
- **λ₂ y λ₃ en $m = 4$ casi coinciden.** Si el borde cae entre las dos (0,12 mm de diferencia), se ven 19 líneas, no 21. Por eso el mínimo se toma con λ₃, la más alejada.

## 7. Ideas de animación

- **Red y pantalla.**
  - Un haz de tres colores llega a la red, y en la pantalla aparecen las líneas orden por orden: verde para 510 nm, naranja para 600 nm.
  - En $m = 1$ y $m = 2$, una sola raya naranja.
  - En $m = 3$, una lupa muestra que se desdobla en dos, con una barra "$mN$ vs 3000" que se llena: 1200, 2400, 3600 ✓.
- **Envolvente de difracción** superpuesta, con sus ceros en $\sen\theta = p\lambda/a$ (0,051 y 0,102 para el verde; 0,06 y 0,12 para el naranja). Las líneas de $m = 5$ caen justo en el segundo cero y se apagan con una cruz.
- **Deslizador del ancho $D$.**
  - Los dos bordes de la pantalla se abren simétricamente, con un contador de líneas: 17 → 19 → **21** (verde) → 23.
  - Se marcan $D_{min} = 69{,}45$ cm (cuando entra λ₃ de $m = 4$) y $D_{max} = 88{,}8$ cm (cuando entraría λ₁ de $m = 6$).
- **Tabla que se completa** fila por fila, en el mismo orden en que se encienden las líneas, para mostrar cómo se ordena por $\sen\theta$ y no por $m$.
