# Geo 4 · Reflexión total: cubo abierto en un planeta con $n' = 1{,}2$

Origen: 1P 14/9/2024, ej. 1 (el PDF trae la resolución de un alumno). Números verificados con `Geo4.py`.

## 1. Datos y qué se pide

| Dato | Valor |
|---|---|
| Índice de la atmósfera | $n' = 1{,}2$ |
| Recipiente | cubo de arista $a$, abierto arriba, lleno al ras con un líquido de índice $n$ |
| Fuente | puntual, en el **centro del fondo** ⇒ está a $h = a$ de la superficie |
| Lo que se ve | la superficie oscura, salvo un **disco iluminado** en el centro |
| Condición | área iluminada **como máximo el 60 %** de la superficie: $A_{ilum} \le 0{,}6\,a^2$ |

Se pide el **intervalo de valores de $n$** que cumple la condición. No hace falta el valor de $a$: se simplifica.

## 2. Molde en la hoja (v6)

- **Ejercicio 8, "Reflexión total: superficie iluminada" (1C 2025).** Es el mismo dispositivo: cubo lleno al ras con la fuente en el fondo, $n' = 1{,}14$ y 53 % iluminado ⇒ $n \approx 3{,}0$. Se repiten estos pasos:
  - $h = a$;
  - $r = a\tg\theta_L$;
  - $\pi r^2/a^2$ igual a la fracción;
  - chequear que $r < a/2$;
  - $\sen\theta_L = n'/n$.
- **Qué cambia:**
  - la atmósfera tiene $n' = 1{,}2$ y no es aire;
  - "**como máximo** el 60 %" pide una **desigualdad**. Hay que razonar hacia qué lado va: más $n$ ⇒ disco más chico. La respuesta es un intervalo, no un valor.

## 3. Teoría que se usa

**Snell y ángulo límite.**

- En la superficie, $n\sen\theta = n'\sen\theta'$.
- Si la luz va de un medio más refringente a uno menos refringente ($n > n'$), el rayo refractado se abre ($\theta' > \theta$).
- El ángulo de incidencia con el que el refractado sale rasante ($\theta' = 90°$) es el **ángulo límite**:
$$\sen\theta_L = \frac{n'}{n}\qquad(\text{solo existe si } n > n').$$
- Para $\theta > \theta_L$ hay **reflexión total**: no sale luz.

**Disco iluminado.**

- La fuente puntual emite en todas direcciones. Los rayos que llegan a la superficie con $\theta < \theta_L$ salen; los demás se reflejan.
- Los rayos con $\theta = \theta_L$ forman un cono de semiángulo $\theta_L$ con vértice en la fuente, que corta la superficie en un círculo de radio
$$r = h\tg\theta_L,\qquad h = \text{distancia de la fuente a la cara} = a.$$
- Va con **tangente** porque $r$ es el cateto opuesto y $h$ el adyacente.

**Hacia dónde va la desigualdad.** Si $n$ aumenta:

- $\sen\theta_L = n'/n$ disminuye;
- entonces $\theta_L$ disminuye, $r$ disminuye y el área iluminada disminuye.

Así que "como máximo 60 %" equivale a "$n$ mayor o igual que el valor que da 60 % justo".

**Que el disco entre en la cara.** El modelo de "disco entero" vale si $r \le a/2$. Si el círculo es más grande que el cuadrado, lo iluminado es el círculo recortado (o toda la cara).

## 4. Resolución paso a paso

1. **Área iluminada en función de $\theta_L$:**
$$A_{ilum} = \pi r^2 = \pi a^2\tg^2\theta_L.$$
2. **Condición:**
$$\pi a^2\tg^2\theta_L \le 0{,}6\,a^2 \;\Rightarrow\; \tg\theta_L \le \sqrt{\frac{0{,}6}{\pi}} = \sqrt{0{,}19099} = 0{,}4370.$$
3. **Chequeo:** $r/a \le 0{,}437 < 0{,}5$, así que el disco entra entero en la cara ✓.
4. **Ángulo límite máximo:** $\theta_L \le \arctg(0{,}4370) = 23{,}61°$ ($= 0{,}412$ rad), y $\sen(23{,}61°) = 0{,}4004$.
5. **Pasar a $n$:**
$$\sen\theta_L = \frac{n'}{n} \le 0{,}4004 \;\Rightarrow\; n \ge \frac{1{,}2}{0{,}4004} = 2{,}997.$$
En forma cerrada: $n_{min} = n'\sqrt{1 + \pi/0{,}6} = 1{,}2\cdot2{,}4972 = 2{,}997$.
6. **Resultado:**
$$\boxed{n \ge 2{,}997\ (\approx 3{,}0)}$$
No hay cota superior: cuanto mayor es $n$, más chico es el disco.

**Chequeos numéricos:**

| $n$ | $\theta_L$ | $r/a$ | % iluminado |
|---|---|---|---|
| 2,997 | 23,61° | 0,437 | 60,0 % |
| 3,0 | 23,58° | 0,436 | 59,8 % |
| 4,0 | 17,46° | 0,315 | 31,1 % |

**Panorama completo** (sirve para la animación y para explicar el "disco"):

| Rango de $n$ | Qué se ve | % iluminado |
|---|---|---|
| $n \le 1{,}2$ | no hay ángulo límite: sale luz por toda la superficie | 100 % |
| $1{,}2 < n < 2{,}078$ ($= n'\sqrt3$) | el círculo ya cubre hasta las esquinas | 100 % |
| $2{,}078 < n < 2{,}683$ ($= n'\sqrt5$) | círculo recortado por los bordes, con esquinas oscuras | entre 100 % y 78,5 % |
| $n > 2{,}683$ | disco entero, como en la figura | menos del 78,5 % |
| $n \ge 2{,}997$ | se cumple la condición | $\le 60$ % |

## 5. Resultados finales

- $\tg\theta_L \le \sqrt{0{,}6/\pi} = 0{,}437$ ⇒ $\theta_L \le 23{,}6°$.
- **$n \ge 2{,}997 \approx 3{,}0$.** Con $n = 2{,}997$ el disco ocupa justo el 60 %, y para $n$ mayor ocupa menos.

## 6. Dónde es fácil equivocarse

- **$h = a$, no $a/2$.** La fuente está "en el fondo, justo en el centro": en el centro **del fondo**, a una arista de la superficie. Con $h = a/2$, que sería el caso de la fuente en el centro del cubo, todo cambia.
- **$r = h\tg\theta_L$**, no $h\sen\theta_L$.
- **$n' = 1{,}2$, no 1.** La atmósfera del planeta no es aire. Con $n' = 1$ darías $n \ge 2{,}497$.
- **$\sen\theta_L = n'/n$** (el de afuera arriba). Si lo invertís da un seno mayor que 1.
- **Sentido de la desigualdad.** Más $n$ ⇒ menos área. Poner $n \le 2{,}997$ es el error típico de despejar sin pensar.
- **Chequear que el disco entra** ($r < a/2$). Acá entra; si pidieran, por ejemplo, 80 % (más que $\pi/4 = 78{,}5$ %), ya no sería un disco entero.
- **Calculadora.** $\arctg(0{,}437)$ da 0,412 en RAD o 23,6° en DEG. No mezcles los dos modos al tomar el seno.

## 7. Ideas de animación

- **Corte del cubo.**
  - Una fuente en el fondo emite un abanico de rayos.
  - Los que llegan con $\theta < \theta_L$ cruzan la superficie y se doblan alejándose de la normal.
  - El de $\theta_L$ sale rasante.
  - Los de $\theta > \theta_L$ rebotan hacia abajo, en otro color.
  - El cono de semiángulo $\theta_L$ queda sombreado.
- **Triángulo rectángulo.** Con cateto vertical $a$, cateto horizontal $r$ y el ángulo $\theta_L$ en la fuente, para mostrar por qué va $\tg$.
- **Deslizador de $n$** con dos vistas a la vez: el corte y la vista superior (el cuadrado de lado $a$ con el disco).
  - Al subir $n$, el cono se cierra y el disco se achica, con un contador de "% iluminado".
  - El umbral del 60 % se marca en $n = 2{,}997$, y la zona $n \ge 2{,}997$ del eje se pinta de verde.
- **Panorama.** Para $n$ chicos (1,3; 2,3) se muestra el círculo más grande que el cuadrado (todo iluminado, o con las esquinas oscuras), y se contrasta con la figura del enunciado, donde se ve un disco entero.
