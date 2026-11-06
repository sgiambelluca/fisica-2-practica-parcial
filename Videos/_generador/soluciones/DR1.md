# DR 1 · Doble rendija con incidencia oblicua: una lámina, después otra lámina y líquido

Origen: examen intermedio 18/10/2025, ejercicio 4. Verificación numérica: `DR1.py`.

## 1. Datos y qué se pide

**Datos**

| Dato | Valor SI |
|---|---|
| Ancho de cada rendija | $a=6\ \mu\text{m}=6\cdot10^{-6}$ m |
| Separación entre rendijas | $d=36\ \mu\text{m}=3{,}6\cdot10^{-5}$ m ($d/a=6$) |
| Longitud de onda en el vacío | $\lambda_0=600\text{ nm}=6\cdot10^{-7}$ m $=0{,}6\ \mu$m |
| Ángulo de incidencia | $\theta_i=30°$, desde el aire ($n_i=1$) |
| Intensidad de cada rendija | $I_0=1$ UA |
| 1ra parte | lámina $n=1{,}5$, espesor $e$ (incógnita); todo en aire |
| 2da parte | se **agrega** una lámina $n'=1{,}1$, espesor $e'$ (incógnita), y se llena **entre la placa y la pantalla** con líquido $n_L=1{,}4$ |

**Qué se pide**

- **1ra parte:** el espesor $e$ para que el orden 0 quede en el centro C de la pantalla, y la intensidad en C.
- **2da parte:** el espesor $e'$ para que, con la segunda lámina y el líquido, el orden 0 siga en C, y la intensidad en C.
- **Esquema:** de dónde viene el haz y detrás de qué rendija va cada lámina.

## 2. Molde en la hoja (v6)

- **Ejercicio 16 · "Doble rendija: dos láminas + incidencia oblicua" (Recu 7/6/25).**
  - **Se repite:**
    - una lámina compensa el camino extra $d\sen\theta_i$ de la incidencia oblicua;
    - la regla de la rendija: el haz llega primero a la rendija cuya lámina agrega más camino;
    - en C la intensidad da 0 aunque C sea el orden 0, porque $\beta$ lleva $\theta_i$ y cae en un mínimo de difracción.
  - **Cambia:** el orden de los pasos. En el 16 las láminas corren el patrón y después se inclina el haz para corregirlo. Acá el haz ya viene inclinado y la lámina lo corrige.
- **Ejercicio 17 · "Láminas en gas, luego líquido" (1C 2026).**
  - **Se repite:** cambiar el medio cambia lo que aporta cada lámina, $e(n_l-n_{medio})$. Una lámina con $n_l<n_{medio}$ **resta** camino.
  - **Cambia:** acá el líquido está solo **entre la placa y la pantalla**, así que el término de la incidencia (antes de la placa) sigue en aire. Además, el que devuelve el orden 0 a C es el espesor de la segunda lámina, no el índice del líquido.
- **Receta "Doble rendija / redes"**, pasos 1 a 4: $\Delta CO$, cuál rendija, $\gamma$ y $\beta$, e $I=4I_0\cos^2\gamma\,(\sen\beta/\beta)^2$.

## 3. Teoría que se usa

**Diferencia de camino óptico.** La convención es la del apunte "Desfasaje general para doble rendija con láminas". Rendija 1 arriba y rendija 2 abajo; $\Delta CO=CO_2-CO_1$, y $P$ es el punto de la pantalla en la dirección $\theta$:

$$\Delta CO=\underbrace{n\,d\sen\theta}_{\text{después de la placa}}-\underbrace{n_i\,d\sen\theta_i}_{\text{antes de la placa}}+\sum_{\text{rendija 2}}e\,(n_l-n)-\sum_{\text{rendija 1}}e\,(n_l-n)$$

- **Antes de la placa:** el haz oblicuo llega antes a una rendija. Si viene desde abajo, llega primero a la 2, y el rayo que va a la 1 recorre $d\sen\theta_i$ de más en el medio $n_i$.
- **Después de la placa:** hacia un punto de la pantalla en la dirección $\theta$, uno de los rayos recorre $d\sen\theta$ de más en el medio $n$. En el centro C ($\theta=0$) este término es **cero**.
- **Lámina:** reemplaza un tramo $e$ del medio $n$ por material $n_l$. Así le suma $e(n_l-n)$ al camino óptico de **su** rayo, que puede ser negativo si $n_l<n$. Como es delgada, el tramo adentro mide $\approx e$ aunque el rayo vaya inclinado.
- Si cambia el medio que rodea a la lámina, cambia lo que aporta: en aire $e(n_l-1)$, en líquido $e(n_l-n_L)$.

**Orden 0.** El orden $m$ es el lugar donde $\Delta CO=m\lambda_0$. El orden 0 es donde los dos caminos ópticos son iguales.

- Sin láminas y con el haz oblicuo, el orden 0 sale en la dirección del haz: $n\sen\theta=n_i\sen\theta_i$.
- Para llevarlo a C, la lámina tiene que agregar camino al rayo que viene "ganando", el de la rendija a la que el haz llega primero.

**Intensidad.**

$$\gamma=\frac{\pi}{\lambda_0}\Delta CO\qquad\beta=\frac{\pi a}{\lambda_0}\,(n\sen\theta-n_i\sen\theta_i)\qquad I=4I_0\cos^2\gamma\left(\frac{\sen\beta}{\beta}\right)^2$$

- **$\gamma$** es la mitad del desfasaje entre las dos rendijas: es la parte de **interferencia** y usa $d$. Las láminas entran acá.
- **$\beta$** es la mitad del desfasaje entre los bordes de **una** rendija: es la parte de **difracción** y usa $a$.
  - Tiene la misma estructura que la parte geométrica de $\Delta CO$, cambiando $d$ por $a$.
  - Las láminas **no** entran: una lámina cubre toda la rendija y les suma lo mismo a todos sus puntos, así que no cambia cómo se reparten las fases adentro de la rendija.
  - Con una o con dos rendijas, $\beta$ es el mismo.
- **La campana de difracción sigue al haz:** su centro ($\beta=0$) está donde $n\sen\theta=n_i\sen\theta_i$, no en $\theta=0$. Sus ceros están en $\beta=p\pi$ ($p\neq0$ entero), y ahí $I=0$ aunque haya un máximo de interferencia.
- **$I_0$** es la intensidad de cada rendija sola en el centro de su campana. El enunciado dice "en dirección normal" porque la frase viene de los ejercicios con incidencia normal. La cátedra la mantiene en los de incidencia oblicua y calcula igual con $\beta$ incluyendo $\theta_i$ (Recu 7/6/25, resuelto en el ejercicio 16 de la hoja, y 2P 2024, resuelto por un alumno con $I=0$).
- Calculadora en **RAD** para $\gamma$ y $\beta$.

## 4. Resolución paso a paso

**Esquema elegido.** Rendija 1 arriba, rendija 2 abajo. El haz llega desde abajo a la izquierda, con los rayos subiendo hacia la derecha, como en el apunte. Llega primero a la rendija 2, y el rayo que va a la 1 recorre de más, antes de la placa:

$$n_i\,d\sen\theta_i=1\cdot36\ \mu\text{m}\cdot0{,}5=18\ \mu\text{m}=30\,\lambda_0$$

Si el haz viniera desde arriba, todo se refleja: la lámina 1 va siempre en la rendija a la que el haz llega **primero**, y la lámina 2 en la otra.

### 1ra parte (todo en aire, $n=1$)

**Planteo.** Sin lámina, en C: $\Delta CO=0-18\ \mu$m $=-30\lambda_0$. En C estaría el orden $-30$, y el orden 0 estaría en $\theta=30°$, en la dirección del haz. Para que el orden 0 quede en C, la lámina tiene que sumarle 18 µm al rayo 2, el que llegó primero.

**Fórmula.** $\Delta CO(C)=-n_i\,d\sen\theta_i+e(n-1)=0$

**Reemplazo.** $-18\ \mu\text{m}+e\,(1{,}5-1)=0$, o sea $0{,}5\,e=18\ \mu$m.

**Resultado.** $\boxed{e=36\ \mu\text{m}}$, **en la rendija a la que el haz llega primero**.

Si la lámina fuera en la otra rendija: $\Delta CO=-18-18=-36\ \mu$m $=-60\lambda_0$. El orden 0 se iría todavía más lejos.

**Intensidad en C.**

- Interferencia: $\Delta CO=0$ ⇒ $\gamma=0$ ⇒ $\cos^2\gamma=1$.
- Difracción: $\beta=\dfrac{\pi a}{\lambda_0}(1\cdot\sen0-1\cdot\sen30°)=\dfrac{\pi\cdot6}{0{,}6}\cdot(-0{,}5)=10\pi\cdot(-0{,}5)=-5\pi$ ⇒ $\sen\beta=0$.

$$\boxed{I(C)=4\cdot1\cdot1\cdot\left(\frac{\sen(-5\pi)}{-5\pi}\right)^2=0}$$

C es el orden 0 de interferencia, pero cae justo en el **5º mínimo de difracción**: la campana está centrada en $\theta=30°$.

### 2da parte (líquido $n_L=1{,}4$ entre placa y pantalla)

**Qué cambia.**

- El término de incidencia sigue igual, porque antes de la placa sigue habiendo aire: $-18\ \mu$m.
- La lámina 1 (en la rendija 2) ahora está rodeada de líquido: aporta $e(1{,}5-1{,}4)=36\cdot0{,}1=3{,}6\ \mu$m, en lugar de 18 µm.
- Solo con eso, en C quedaría $\Delta CO=-18+3{,}6=-14{,}4\ \mu$m $=-24\lambda_0$: el orden 0 se iría de C.

**Lámina 2.** $n'=1{,}1<n_L=1{,}4$, así que aporta $e'(1{,}1-1{,}4)=-0{,}3\,e'$ al camino de su rayo: le **resta** camino. Para compensar, hay que restarle camino al rayo 1, el que viene "perdiendo" 14,4 µm.

**Fórmula.** Con la lámina 2 en la rendija 1 (entra con signo menos en $\Delta CO$):

$$\Delta CO(C)=-n_i\,d\sen\theta_i+e(n-n_L)-e'(n'-n_L)=0$$

**Reemplazo.** $-18+3{,}6-e'(1{,}1-1{,}4)=-14{,}4+0{,}3\,e'=0$

**Resultado.** $\boxed{e'=48\ \mu\text{m}}$, **en la otra rendija** (la que el haz alcanza último).

- Si la lámina 2 fuera en la misma rendija que la 1: $-14{,}4-0{,}3e'=0$ ⇒ $e'=-48\ \mu$m, imposible.
- **Chequeo con los caminos de cada rayo:**
  - el rayo 1 tiene 18 µm de más antes de la placa y la lámina 2 le resta $0{,}3\cdot48=14{,}4\ \mu$m: le quedan 3,6 µm de más;
  - el rayo 2 recibe 3,6 µm de la lámina 1.
  - Quedan empatados. ✓

**Intensidad en C.**

- $\Delta CO=0$ ⇒ $\cos^2\gamma=1$.
- $\beta=\dfrac{\pi a}{\lambda_0}(n_L\sen0-n_i\sen30°)=-5\pi$, igual que antes: en $\theta=0$ el término de después de la placa se anula, y el de antes sigue en aire.

$$\boxed{I(C)=0}$$

El líquido sí corre la campana: su centro pasa a $1{,}4\sen\theta=\sen30°$, o sea $\sen\theta=0{,}357$ y $\theta=20{,}9°$. Pero C sigue siendo el 5º cero de difracción.

### Esquemas (lo que hay que dibujar)

- **1ra parte:**
  - haz desde abajo a la izquierda, a 30° de la normal a la placa;
  - el segmento $d\sen\theta_i=18\ \mu$m marcado en el rayo que va a la rendija 1;
  - lámina $n=1{,}5$, $e=36\ \mu$m, pegada a la salida de la **rendija 2** (la de abajo, alcanzada primero);
  - pantalla con C en el eje.
- **2da parte:**
  - lo mismo, más el líquido $n_L=1{,}4$ entre la placa y la pantalla (no antes de la placa);
  - la lámina 1 sigue en la rendija 2;
  - lámina $n'=1{,}1$, $e'=48\ \mu$m, en la **rendija 1** (la de arriba).

## 5. Resultados finales

- **1ra parte:** $e=36\ \mu$m, en la rendija a la que el haz llega primero. $I(C)=0$, porque $\gamma=0$ pero $\beta=-5\pi$.
- **2da parte:** $e'=48\ \mu$m, en la otra rendija. $I(C)=0$, porque $\gamma=0$ y $\beta=-5\pi$ otra vez.
- Centro de la campana de difracción: en $\theta=30°$ (1ra parte) y en $\theta=20{,}9°$ (2da parte). En las dos partes C es el 5º mínimo de difracción.

**Ambigüedad: qué es $I_0$ "en dirección normal".**

- **(A) Lectura de la cátedra (la más probable).** $I_0$ es la intensidad de cada rendija en el centro de su campana, y se usa la fórmula completa con $\beta$ incluyendo $\theta_i$. Da $I(C)=0$ en las dos partes. Es lo que hace la cátedra con el mismo enunciado en el Recu 7/6/25 (hoja, ej. 16) y en el 2P 2024 (resolución del alumno).
- **(B) Lectura literal.** $I_0=1$ sería lo que manda cada rendija justo hacia $\theta=0$. Entonces no habría que poner el factor de difracción, y quedaría $I(C)=4I_0\cos^2\gamma=4$ UA en las dos partes. Es inconsistente: con $\beta=-5\pi$, cada rendija manda intensidad **cero** hacia $\theta=0$, así que no puede valer 1.
- **Recomendación:** contestar 0, explicar que C cae en el 5º mínimo de difracción y, si sobra tiempo, aclarar la otra lectura.

## 6. Dónde es fácil equivocarse

- **Lámina en la rendija equivocada.** Va en la rendija a la que el haz llega primero: ese rayo viene "ganando" y hay que sumarle camino. En la otra, el orden 0 se va a 60 franjas.
- **Usar $(n_l-1)$ en la 2da parte.** Con líquido, cada lámina aporta $e(n_l-n_L)$. La lámina 1 baja de 18 µm a 3,6 µm, y por eso el orden 0 se iría de C.
- **Meter el líquido en el término de incidencia.** El líquido está entre la placa y la pantalla; el haz incide desde el aire, así que $n_i=1$. Si se pone 1,4 ahí, el término daría 25,2 µm y todo cambia.
- **Signo de la lámina 2.** $n'<n_L$ ⇒ **resta** camino. Por eso va en la rendija "atrasada", la otra, y no en la misma que la lámina 1 (ahí da $e'<0$).
- **Interpretar mal "se agrega otra lámina".** La lámina 1 sigue puesta: no se reemplaza.
- **$\beta$ sin la incidencia.** Si se usa $\beta=\frac{\pi a}{\lambda_0}n\sen\theta$, en C da $\beta=0$ e $I=4$. La campana sigue al haz: hay que poner $-n_i\sen\theta_i$.
- **Meter las láminas en $\beta$.** No entran.
- **Calculadora en DEG** para $\sen(-5\pi)$: da un número cualquiera. En RAD, $\sen(-5\pi)=0$.
- **"Es el orden 0, entonces es máximo."** El orden 0 es máximo de **interferencia** ($\cos^2\gamma=1$), pero la intensidad también depende de la envolvente de difracción.

## 7. Ideas de animación

1. **Placa con dos rendijas y un haz oblicuo.**
   - Frentes de onda como líneas paralelas inclinadas que avanzan desde abajo a la izquierda. Se ve que tocan primero la rendija 2.
   - El segmento violeta $d\sen\theta_i$ se dibuja sobre el rayo que va a la rendija 1, con la etiqueta "18 µm = 30 λ₀".
2. **"Contador de camino óptico".**
   - Dos barras, una por rayo, que se llenan a medida que el rayo avanza. Antes de la placa, la barra del rayo 1 se adelanta 18 µm.
   - Aparece la lámina en la rendija 2 y un control de $e$: la barra 2 crece $0{,}5\,e$ y empata en $e=36\ \mu$m.
   - Al mismo tiempo, en la pantalla el patrón de franjas se desliza hasta que la franja marcada "orden 0" llega a C.
3. **Campana de difracción.**
   - Sobre la pantalla, la curva $I(\theta)$: las franjas finas de $\cos^2\gamma$ (interfranja $\approx0{,}95°$) dentro de la campana $(\sen\beta/\beta)^2$ centrada en 30°.
   - Hacer zoom en C: la franja del orden 0 está, pero la campana pasa por cero justo ahí, así que la franja queda apagada.
   - Marcar los ceros vecinos de la campana: 5,74° (4º) y $-5{,}74°$ (6º).
4. **Fasores de una rendija.**
   - Partir la rendija en muchos pedacitos, cada uno con su flechita.
   - Con $\beta=-5\pi$, la fase total a lo ancho de la rendija es $2\beta=-10\pi$: la cadena de flechitas da **5 vueltas completas** y se cierra, así que la resultante es cero.
   - Las dos rendijas tienen fasores de largo cero, alineados entre sí ($\gamma=0$), y suman cero.
5. **2da parte.**
   - El espacio entre la placa y la pantalla se llena de azul (líquido 1,4).
   - La barra de la lámina 1 se encoge de 18 µm a 3,6 µm, y el patrón "se escapa" de C, unas 24 franjas.
   - Aparece la lámina 2 en la rendija 1, con un control de $e'$: la barra del rayo 1 **baja** $0{,}3e'$ y empata en 48 µm. El orden 0 vuelve a C.
   - La campana se corre de 30° a 20,9°, pero C sigue en un cero: el mismo zoom que en el punto 3 muestra la franja apagada.
6. **Cartel final** con la regla: "lámina que agrega camino → rendija a la que el haz llega primero; lámina con $n_l<n_{medio}$ resta camino → en la otra".
