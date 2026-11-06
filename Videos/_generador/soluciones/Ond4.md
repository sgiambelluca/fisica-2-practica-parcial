# Ond 4 · Cuerda de guitarra: ¿misma nota?, amplitud por la energía de un tramo, gráfico de $u_U(x)$

Origen: 1P 14/9/2024, ej. 2 (el PDF trae la resolución de un alumno). Números verificados con `Ond4.py`.

## 1. Datos y qué se pide

| Dato | Valor | En SI |
|---|---|---|
| Largo de la cuerda | 64 cm | $L = 0{,}64$ m |
| Masa | 1,92 g | $m = 1{,}92\cdot10^{-3}$ kg ⇒ $\mu = m/L = 3\cdot10^{-3}$ kg/m |
| 4º armónico | LA, 440 Hz | $f_4 = 440$ Hz |
| Coordenada (figura) | $x = 0$ en la cejuela (cabeza), $x = L$ en el puente | — |
| b) dedo en | 40 cm | $x = 0{,}40$ m |
| b) frecuencia | LA una octava arriba | $f = 880$ Hz |
| b) $t = 0$ | cuerda horizontal | — |
| b) energía cinética del tramo [8 cm; 20 cm] en $t_1 = \frac{11}{8}T$ | 0,22 J | $E_K = 0{,}22$ J, tramo $[0{,}08;\ 0{,}20]$ m |
| c) instante | $t_2 = 2t_1 = \frac{11}{4}T$ | — |
| c) amplitud | 1 mm | $A' = 10^{-3}$ m |

Se pide:

- **a)** ¿se puede escuchar la misma nota (440 Hz) apretando la cuerda en $x = 40$ cm?
- **b)** con el dedo ahí y sonando 880 Hz, la amplitud $A$ de la oscilación;
- **c)** graficar la densidad de energía elástica en el tramo [8; 20] cm en el instante $t_2$, con amplitud 1 mm.

## 2. Molde en la hoja (v6)

- **Ejercicio 5, "Estacionaria fijo–fijo: tensión y % de energía" (1C 2025).** Se repite la cadena de pasos:
  1. armónico ⇒ $v$ ⇒ $\lambda$, $k$, $\omega$;
  2. nodo en $x = 0$ ⇒ $\sen(kx)$;
  3. "horizontal en $t = 0$" ⇒ $\varphi = -\pi/2$;
  4. mirar la fase temporal en el instante pedido;
  5. integrar $\sen^2$ o $\cos^2$ en el tramo.
- **Qué cambia:**
  - **a)** es una pregunta nueva: ¿440 Hz es un armónico de la cuerda acortada?;
  - **b)** es el problema **inverso** del ej. 5: dan la energía del tramo y se despeja la amplitud;
  - **c)** pide un gráfico **en función de $x$** en un instante fijo. En el ej. 6 (fijo–libre) el gráfico era en función de $t$ en un punto fijo.
- Receta de ondas, pasos 1, 3, 4 ("mirar la fase temporal: horizontal ⇒ todo cinética; máxima elongación ⇒ toda elástica") y 6 (gráfico).

## 3. Teoría que se usa

**Cuerda fija en los dos extremos.**

- Los extremos son nodos, así que entran medias longitudes de onda enteras:
$$L = n\frac{\lambda}{2},\qquad f_n = n\frac{v}{2L} = n f_1.$$
- Los armónicos son **múltiplos enteros** de la fundamental. Una frecuencia $f$ "se puede tocar" con una cuerda de largo $L'$ solo si $f/f_1'$ es entero.
- **La velocidad depende solo de la cuerda:** $v = \sqrt{F/\mu}$, con $F$ la tensión. Apretar con el dedo **no cambia** $v$ (ni la tensión ni $\mu$). Cambia el largo de la parte que vibra, que en una guitarra va **del dedo al puente**.

**Onda estacionaria.**

- La cátedra la escribe $y = A\cos(kx + \varphi_x)\cos(\omega t + \varphi_t)$, donde $A = 2A'$ es la amplitud de los antinodos y $A'$ la de cada propagante.
- Con un nodo en $x = 0$ queda $y = A\sen(kx)\cos(\omega t + \varphi)$.
- "Horizontal en $t = 0$" quiere decir que $y(x, 0) = 0$ para todo $x$. Entonces $\cos\varphi = 0$, $\varphi = \pm\pi/2$, y queda $y = \pm A\sen(kx)\sen(\omega t)$.

**Densidades de energía.**

- Cinética: $u_K = \tfrac12\mu(\partial_t y)^2 = \tfrac12\mu\omega^2A^2\sen^2(kx)\cos^2(\omega t)$. Es máxima en los **antinodos**, que es donde la cuerda se mueve más.
- Elástica: $u_U = \tfrac12 F(\partial_x y)^2 = \tfrac12 F k^2A^2\cos^2(kx)\sen^2(\omega t)$. Es máxima en los **nodos**, que es donde la cuerda está más inclinada.
- Como $F k^2 = \mu v^2 k^2 = \mu\omega^2$, los dos coeficientes son iguales: $\tfrac12\mu\omega^2A^2$.
- **Factor temporal:**
  - cuando la cuerda está horizontal, $\sen(\omega t) = 0$ y toda la energía es cinética;
  - en la máxima elongación, $\cos(\omega t) = 0$ y toda la energía es elástica.

**Integral en un tramo.** $\displaystyle\int\sen^2(kx)\,dx = \frac x2 - \frac{\sen(2kx)}{4k}$. Si los extremos del tramo caen en nodos o antinodos, el término del seno se anula y la integral vale $\Delta x/2$: cada cuarto de longitud de onda aporta $\lambda/8$.

## 4. Resolución paso a paso

### Datos derivados

1. **Densidad lineal:** $\mu = \dfrac{1{,}92\cdot10^{-3}}{0{,}64} = 3\cdot10^{-3}$ kg/m.
2. **Fundamental:** el 4º armónico es 440 Hz, así que $f_1 = 440/4 = 110$ Hz.
3. **Velocidad:** $v = 2Lf_1 = 2\cdot0{,}64\cdot110 = 140{,}8$ m/s.
4. **Tensión** (no se pide, pero sirve en c): $F = \mu v^2 = 3\cdot10^{-3}\cdot140{,}8^2 = 59{,}47$ N.

### a) ¿Misma nota apretando en $x = 40$ cm?

1. **Qué parte vibra.** Del dedo al puente: $L' = 64 - 40 = 24$ cm $= 0{,}24$ m. La velocidad sigue siendo 140,8 m/s.
2. **Fundamental de esa parte:** $f_1' = \dfrac{v}{2L'} = \dfrac{140{,}8}{0{,}48} = 293{,}3$ Hz.
3. **Armónicos posibles:** 293,3; 586,7; **880**; 1173,3 Hz… El cociente $440/293{,}3 = 1{,}5$ **no es entero**.
4. **Conclusión:** **No se puede.**

Si se toma como parte que vibra la que va de $x = 0$ al dedo ($L' = 40$ cm), da $f_1' = 176$ Hz y $440/176 = 2{,}5$: **tampoco**. La respuesta no depende de esa elección.

### b) Amplitud con 880 Hz

1. **Modo.** $880/293{,}3 = 3$: es el **3er armónico** de la parte de 24 cm (o el 5º de la de 40 cm).
2. **Parámetros de la onda:**
   - $\lambda = v/f = 140{,}8/880 = 0{,}16$ m, así que $\lambda/2 = 8$ cm;
   - $k = 2\pi/\lambda = 12{,}5\pi$ m⁻¹ $= 39{,}27$ m⁻¹;
   - $\omega = 2\pi\cdot880 = 1760\pi$ s⁻¹ $= 5529$ s⁻¹;
   - $T = 1/880$ s $= 1{,}136$ ms.
3. **Dónde están los nodos.** Como 24 cm y 40 cm son múltiplos de 8 cm, los nodos caen cada 8 cm **midiendo desde cualquier extremo**. Así, $\sen^2(kx)$ describe la misma distribución de energía lo midas desde la cejuela, desde el dedo o desde el puente. En el tramo, $x = 8$ y $16$ cm son nodos y $x = 20$ cm es antinodo.
4. **Ecuación de la cuerda.** Nodo en $x = 0$ y horizontal en $t = 0$:
$$y = A\sen(kx)\sen(\omega t),\qquad \partial_t y = A\omega\sen(kx)\cos(\omega t).$$
5. **Densidad cinética:** $u_K = \tfrac12\mu\omega^2A^2\sen^2(kx)\cos^2(\omega t)$.
6. **Fase temporal en $t_1$:** $\omega t_1 = 2\pi\cdot\dfrac{11}{8} = 2{,}75\pi$, así que $\cos^2(2{,}75\pi) = \tfrac12$. Con $\varphi = +\pi/2$ también da $\tfrac12$.
7. **Integral espacial:** de $kx = \pi$ (nodo) a $kx = 2{,}5\pi$ (antinodo), el tramo mide $0{,}12$ m $= 3\lambda/4$:
$$\int_{0{,}08}^{0{,}20}\sen^2(kx)\,dx = \frac{0{,}12}{2} = 0{,}06\ \text{m}.$$
Con la fórmula: $\sen(2k\cdot0{,}20) = \sen 5\pi = 0$ y $\sen(2k\cdot0{,}08) = \sen 2\pi = 0$.
8. **Energía del tramo:**
$$E_K = \tfrac12\mu\omega^2A^2\cdot\tfrac12\cdot0{,}06,\qquad \mu\omega^2 = 3\cdot10^{-3}\cdot5529{,}2^2 = 91\,716\ \text{J/m}^3.$$
Queda $E_K = 1375{,}7\,A^2$ (J, con $A$ en m).
9. **Despejar $A$:**
$$A^2 = \frac{0{,}22}{1375{,}7} = 1{,}599\cdot10^{-4}\ \text{m}^2 \;\Rightarrow\; \boxed{A = 0{,}01265\ \text{m} \approx 1{,}26\ \text{cm}}$$

$A$ es la amplitud de los antinodos (la amplitud de oscilación de la cuerda), igual que en la teoría de la cátedra. Si se la interpretara como la amplitud de cada propagante, con $y = 2A\sen(kx)\cos(\omega t + \varphi)$, daría la mitad: 0,63 cm. La más probable es 1,26 cm, que es además lo que da la resolución del PDF.

Dato extra: la energía total de la parte de 24 cm es $\tfrac14\mu\omega^2A^2L' = 0{,}88$ J. El tramo pedido tiene, en ese instante, la cuarta parte en forma cinética.

### c) $u_U(x)$ en $t_2 = 2t_1$

1. **Fase temporal en $t_2$:** $\omega t_2 = 5{,}5\pi$, así que $\sen^2(5{,}5\pi) = 1$ y $\cos^2 = 0$. La cuerda está en su **máxima elongación**: $u_K = 0$ en todo el tramo y la energía es toda elástica.
2. **Densidad elástica:**
$$u_U(x, t_2) = \tfrac12 F k^2A'^2\cos^2(kx) = \tfrac12\cdot59{,}47\cdot39{,}27^2\cdot(10^{-3})^2\cos^2(kx)$$
$$\boxed{u_U(x) = 0{,}0459\cos^2(12{,}5\pi\,x)\ \ \text{J/m}\quad (x\ \text{en m},\ 0{,}08 \le x \le 0{,}20)}$$
3. **Tabla para graficar:**

| $x$ (cm) | 8 | 10 | 12 | 14 | 16 | 18 | 20 |
|---|---|---|---|---|---|---|---|
| $kx$ | $\pi$ | $1{,}25\pi$ | $1{,}5\pi$ | $1{,}75\pi$ | $2\pi$ | $2{,}25\pi$ | $2{,}5\pi$ |
| $u_U$ (J/m) | **0,0459** (nodo) | 0,0229 | **0** (antinodo) | 0,0229 | **0,0459** (nodo) | 0,0229 | **0** (antinodo) |

4. **Cómo es el gráfico.** El período espacial de $\cos^2$ es $\lambda/2 = 8$ cm, así que en el tramo entran 1,5 "jorobas":
   - empieza en el máximo en 8 cm, baja a 0 en 12 cm y vuelve al máximo en 16 cm;
   - termina en 0 en 20 cm.

   Escalas sugeridas: 1 cm del papel = 2 cm de cuerda; 1 cm = 0,01 J/m.
5. **Chequeo extra:** la energía elástica del tramo en $t_2$ es $0{,}0459\cdot0{,}06 = 2{,}75$ mJ.

**Sobre $A' = 1$ mm:** se toma como amplitud de los antinodos. Es un dato nuevo, y la prima solo lo distingue del $A$ de b). Si fuera la amplitud de cada propagante, la amplitud de los antinodos sería 2 mm y el máximo, 4 veces mayor: 0,183 J/m.

## 5. Resultados finales

- $\mu = 3\cdot10^{-3}$ kg/m; $f_1 = 110$ Hz; $v = 140{,}8$ m/s; $F = 59{,}5$ N.
- **a)** **No.** La parte que vibra mide 24 cm: $f_1' = 293{,}3$ Hz y $440/293{,}3 = 1{,}5$ no es entero. Con 40 cm tampoco: $440/176 = 2{,}5$.
- **b)** 3er armónico, $\lambda = 16$ cm, $k = 12{,}5\pi$ m⁻¹, $\omega = 1760\pi$ s⁻¹. **$A = 1{,}26$ cm** (antinodos).
- **c)** Máxima elongación, toda la energía es elástica: $u_U(x) = 0{,}0459\cos^2(12{,}5\pi x)$ J/m. Máximos de 0,0459 J/m en 8 y 16 cm (nodos) y ceros en 12 y 20 cm (antinodos).

## 6. Dónde es fácil equivocarse

- **440 Hz no es la fundamental:** es el 4º armónico, así que $f_1 = 110$ Hz y $v = 140{,}8$ m/s. Con $f_1 = 440$, $v$ te da 4 veces más.
- **Apretar no cambia $v$:** cambia el largo que vibra. Tampoco cambia $\lambda$ para una $f$ dada: $\lambda = v/f$.
- **a) pide 440 Hz exactos.** 880 Hz sí se puede (es el 3er armónico): por eso b) dice "una octava más arriba".
- **"Horizontal en $t = 0$" ⇒ $\varphi = \pm\pi/2$**, no $\varphi = 0$. Con $\varphi = 0$ en $t_1$ te da $\sen^2 = \tfrac12$ igual (por suerte), pero en $t_2$ te da $u_U = 0$ en vez del máximo.
- **El ½ de la integral.** $\int\sen^2 = \Delta x/2 = 0{,}06$ m, no 0,12 m.
- **El ½ temporal.** En $t_1$, $\cos^2(2{,}75\pi) = \tfrac12$: la mitad de la energía del tramo está en forma cinética.
- **c): elástica ⇒ $\cos^2(kx)$**, máxima en los nodos (donde la pendiente es máxima). Si ponés $\sen^2$, el gráfico queda corrido un cuarto de onda.
- **Unidades:** g → kg, cm → m. Calculadora en RAD para $kx$ y $\omega t$.
- **Tensión vs. período.** En la teoría $F$ es la tensión; no la confundas con el período $T$.

## 7. Ideas de animación

- **Guitarra.** Una regla con $x = 0$ en la cejuela y $x = 64$ cm en el puente.
  - Primero la cuerda entera en el 4º armónico (4 vientres, 440 Hz).
  - Después aparece el dedo en 40 cm, la parte de 24 cm se resalta y vibra.
- **Peine de armónicos.** Un eje de frecuencias con las rayas 293, 587, 880, 1173 Hz y una flecha en 440 Hz que cae justo entre dos rayas (a: "no"). Después, la de 880 Hz se enciende (b).
- **Estacionaria animada en el 3er armónico.** Nodos cada 8 cm y un reloj que marca $t = 0$ (cuerda plana), $t_1 = 11T/8$ (cuerda al 71 % de su amplitud, $\cos^2 = \tfrac12$) y $t_2 = 11T/4$ (máxima elongación).
- **Área sombreada.** Sobre el tramo [8; 20] cm, la curva $u_K(x)$ en $t_1$ con el área pintada (= 0,22 J). Al lado, el despeje de $A$.
- **Gráfico de c).** La cuerda en máxima elongación arriba y $u_U(x) = 0{,}0459\cos^2(kx)$ abajo, alineados. Se ve que los máximos de energía caen donde la cuerda está más inclinada (nodos) y los ceros donde está "acostada" en la cresta (antinodos).
