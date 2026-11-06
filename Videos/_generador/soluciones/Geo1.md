# Geo 1 · Divergente + espejo cóncavo: imagen en el mismo lugar del objeto

Origen: examen intermedio 18/10/2025, ejercicio 3. Verificación numérica: `Geo1.py`.

## 1. Datos y qué se pide

**Datos** (radios y focales vienen en módulo; el signo lo ponemos nosotros con la convención de la cátedra):

| Dato | Valor | En la convención |
|---|---|---|
| Objeto real, 20 cm a la izquierda de la lente | 0,20 m | $s_1=-0{,}20$ m $=-20$ cm |
| Lente **divergente**, focal 80 cm | 0,80 m | $f'=-0{,}80$ m $=-80$ cm |
| Espejo **cóncavo**, radio 60 cm | 0,60 m | $R=-0{,}60$ m $=-60$ cm |
| Distancia lente–espejo | incógnita | $d$ |
| Observador | a la izquierda del objeto | ve la luz que **vuelve** |

Todas las ecuaciones de óptica geométrica son homogéneas en longitudes: se puede trabajar en cm y pasar a m al final.

**Qué se pide**

- **a)** El valor de $d$ para que el observador vea la imagen final (la luz que pasa por la lente, rebota en el espejo y vuelve a pasar por la lente) **en el mismo lugar que el objeto**.
- **b)** Caracterizar esa imagen: aumento total, si está invertida o derecha, y si es real o virtual.

## 2. Molde en la hoja (v6)

- **Ejercicio 11 · "Lente + espejo: haces salen paralelos" (1C 2026).** Mismo sistema: objeto → lente → espejo → vuelve por la lente.
  - **Se repite:** las tres pasadas (lente de ida, espejo, lente de vuelta), $s_2=s_1'-D$, y que después del espejo el sentido positivo es hacia la izquierda.
  - **Cambia:** la condición final. En el 11 los rayos tienen que salir paralelos (el objeto de la vuelta en el foco, $s_3'=\infty$). Acá la imagen final tiene que caer sobre el objeto ($s_3'=+20$ cm). Además, el tipo de espejo ya está dado (cóncavo) y la incógnita es la distancia $d$.
- **Este mismo ejercicio está como nota al pie del 11** ("18/10/25, imagen en el mismo lugar del objeto … $D=60-16=44$ cm; $A=0{,}8\cdot(-1)\cdot1{,}25=-1$").
- La condición "mismo lugar / ubicación verdadera ⇒ imagen final = objeto" es el paso 4 de la receta de óptica. Aparece también en el ejercicio 15 (barra con dos caras esféricas).

## 3. Teoría que se usa

**Convención de signos (guía, p. 23).**

- Cada elemento (lente, espejo, dioptra) tiene su propio origen, en su vértice.
- El sentido positivo es el de la luz que **le llega a ese elemento**.
- Antes del espejo la luz va hacia la derecha, así que $+$ es hacia la derecha. Después del espejo la luz vuelve hacia la izquierda: para la lente en la vuelta, $+$ es hacia la izquierda.

**Lente delgada en aire.**

$$\frac1{s'}-\frac1s=\frac1{f'}\qquad A=\frac{s'}s$$

- Convergente: $f'>0$. Divergente: $f'<0$.
- $s<0$: objeto real (los rayos salen de un punto que está antes de la lente). $s>0$: objeto virtual (los rayos llegan **convergiendo** hacia un punto que queda detrás de la lente, y la lente los corta antes).
- $s'>0$: imagen real (los rayos se cruzan de verdad del lado de salida). $s'<0$: imagen virtual (solo se cruzan las prolongaciones).
- La lente funciona igual en los dos sentidos: en la vuelta se usa el mismo $f'=-80$ cm.

**Espejo esférico.**

$$\frac1{s'}+\frac1s=\frac2R\qquad A=-\frac{s'}s$$

- Con la convención de la guía, $s$ y $s'$ se miden con $+$ en el sentido de la luz que llega al espejo.
- **Cóncavo:** el centro de curvatura está del lado de donde viene la luz, así que **$R<0$**.
- **Ojo con el signo de la imagen:** como el espejo da vuelta la luz, la imagen real queda **delante** del espejo. Eso da **$s'<0$ = real** y $s'>0$ = virtual (detrás del espejo), al revés que en las lentes. Así lo dibuja también `Teoria/07`.
- El signo menos de $A$ hace que una imagen real de un objeto real salga invertida.

**Sistemas de varios elementos.** La imagen de un elemento es el objeto del siguiente: $s_{k+1}=s_k'-D$, con todo medido en el sentido de la luz que llega al elemento $k+1$. El aumento total es el producto: $A=A_1A_2A_3$.

**La idea física: la luz es reversible.**

- Si un rayo hace un camino, el rayo que va al revés hace exactamente el mismo camino.
- Si el espejo devuelve cada rayo **sobre sí mismo**, la luz desanda todo el recorrido y termina donde empezó: la imagen final cae sobre el objeto.
- Un espejo esférico devuelve un rayo sobre sí mismo cuando el rayo le llega en la dirección de un radio, o sea **pasando por (o apuntando a) su centro de curvatura $C$**.
- Entonces la imagen que forma la lente en la ida tiene que estar en $C$. En fórmulas: $s_2=R$ ⇒ $s_2'=R$ y $A_2=-1$.

## 4. Resolución paso a paso

### Paso 1 · Lente, ida (+ hacia la derecha)

- **Planteo:** objeto real a 20 cm, lente divergente.
- **Fórmula:** $\dfrac1{s_1'}=\dfrac1{f'}+\dfrac1{s_1}$
- **Reemplazo:** $\dfrac1{s_1'}=\dfrac1{-80}+\dfrac1{-20}=-0{,}0125-0{,}05=-0{,}0625\ \text{cm}^{-1}$
- **Resultado:** $s_1'=-16$ cm. Es una imagen **virtual**, 16 cm a la izquierda de la lente (entre el objeto y la lente). Su aumento es $A_1=\dfrac{s_1'}{s_1}=\dfrac{-16}{-20}=0{,}8$: derecha y más chica.

### Paso 2 · Qué tiene que pasar en la vuelta (+ hacia la izquierda)

- **Planteo:** la imagen final tiene que estar donde está el objeto, 20 cm a la izquierda de la lente. En la vuelta $+$ es hacia la izquierda, así que $s_3'=+20$ cm.
- **Fórmula:** $\dfrac1{s_3}=\dfrac1{s_3'}-\dfrac1{f'}$
- **Reemplazo:** $\dfrac1{s_3}=\dfrac1{20}-\dfrac1{-80}=0{,}05+0{,}0125=0{,}0625\ \text{cm}^{-1}$
- **Resultado:** $s_3=+16$ cm. El objeto de la lente en la vuelta tiene que estar 16 cm a su izquierda, justo donde estaba la imagen 1. Es lo que dice la reversibilidad.

### Paso 3 · Espejo: tiene que devolver ese punto sobre sí mismo

- **Planteo:** el objeto del espejo es la imagen 1, que está a $d+16$ cm a su izquierda: $s_2=-(d+16)$. Su imagen tiene que caer en ese mismo punto, para que la lente lo reciba a 16 cm: $s_2'=s_2$.
- **Fórmula:** $\dfrac1{s_2'}+\dfrac1{s_2}=\dfrac2R$. Con $s_2'=s_2$ queda $\dfrac2{s_2}=\dfrac2R$, o sea $s_2=R$: el punto tiene que estar en el centro de curvatura.
- **Reemplazo:** $-(d+16)=-60$
- **Resultado:** $\boxed{d=44\text{ cm}=0{,}44\text{ m}}$

El único otro punto que un espejo devuelve sobre sí mismo es su vértice ($s_2=0$). Eso pediría $d=-16$ cm, que es imposible. El barrido numérico de `Geo1.py` (con $0<d<400$ cm) también encuentra una sola solución.

### Paso 4 · Verificación completa con $d=44$ cm

**Espejo:**

- $s_2=-(44+16)=-60$ cm.
- $\dfrac1{s_2'}=\dfrac2{-60}-\dfrac1{-60}=-0{,}0333+0{,}0167=-0{,}0167$ ⇒ $s_2'=-60$ cm.
- Es una imagen **real** (para el espejo, $s'<0$ es real), en el centro $C$.
- $A_2=-\dfrac{s_2'}{s_2}=-\dfrac{-60}{-60}=-1$.

**Lente, vuelta:**

- Los rayos reflejados van convergiendo hacia un punto 60 cm a la izquierda del espejo. La lente está a 44 cm del espejo y los corta antes.
- Ese punto queda $60-44=16$ cm **más allá** de la lente, en el sentido en que viaja la luz. Es un objeto **virtual**: $s_3=+16$ cm.
- $\dfrac1{s_3'}=\dfrac1{-80}+\dfrac1{16}=-0{,}0125+0{,}0625=0{,}05$ ⇒ $s_3'=+20$ cm.
- La imagen es **real** y queda 20 cm a la izquierda de la lente, sobre el objeto. ✓
- $A_3=\dfrac{s_3'}{s_3}=\dfrac{20}{16}=1{,}25$.

**Aumento total:** $A=A_1A_2A_3=0{,}8\cdot(-1)\cdot1{,}25=-1$.

### b) Caracterización

- **Real:** $s_3'>0$ en la última lente, así que los rayos se cruzan de verdad en la posición del objeto. Después siguen hacia la izquierda, divergiendo, hasta el ojo del observador.
- **Invertida:** $A<0$.
- **Del mismo tamaño:** $|A|=1$.

El observador ve, superpuesta al objeto, una copia del mismo tamaño y cabeza abajo.

## 5. Resultados finales

- **a)** $d=44$ cm $=0{,}44$ m (la imagen de la lente tiene que caer en el centro de curvatura del espejo).
- **b)** Aumento total $A=0{,}8\cdot(-1)\cdot1{,}25=-1$: imagen **real, invertida y del mismo tamaño**, en la posición del objeto.
- Imágenes intermedias:
  - lente (ida): $s_1'=-16$ cm, virtual, derecha, $A_1=0{,}8$;
  - espejo: $s_2'=-60$ cm, en $C$, $A_2=-1$ (no llega a formarse, porque la lente corta los rayos antes);
  - lente (vuelta): $s_3=+16$ cm (objeto virtual) → $s_3'=+20$ cm, $A_3=1{,}25$.

## 6. Dónde es fácil equivocarse

- **Pedir que la imagen del *espejo* caiga sobre el objeto** ($d+20=60$ ⇒ $d=40$ cm). Así se olvida que la luz vuelve a pasar por la lente, que la mueve. Con $d=40$ cm la imagen final quedaría a 35,6 cm de la lente, no a 20 cm. Lo que tiene que caer en $C$ es la **imagen de la lente** (a 16 cm), no el objeto.
- **Signo de la focal:** divergente ⇒ $f'=-80$ cm. Con $+80$ la imagen 1 da $-26{,}7$ cm y todo lo demás sale mal.
- **Signo del radio:** cóncavo ⇒ $R=-60$ cm. Con $R=+60$ queda $d+16=-60$, imposible.
- **Leer el espejo con la regla de las lentes:** para el espejo, $s_2'=-60$ cm es **real**.
- **Sentido positivo en la vuelta:** después del espejo, $+$ es hacia la izquierda. El objeto de la vuelta está *más allá* de la lente en el sentido de la luz, así que es virtual ($s_3=+16$, no $-16$).
- **Confundir centro con foco:**
  - objeto en el **centro** ($s=R$): la luz vuelve sobre sí misma;
  - objeto en el **foco** ($s=R/2$): sale paralela.
  - Acá el foco del espejo está a 30 cm de él, o sea 14 cm a la derecha de la lente.
- **Aumento de la vuelta:** $A_3=1{,}25$, no 1. Con eso el producto da justo $-1$: el $0{,}8$ de la ida se compensa con el $1{,}25$ de la vuelta.
- **"Está del lado del objeto ⇒ virtual":** no. Es real, porque los rayos se cruzan ahí de verdad.

## 7. Ideas de animación

1. **Banco óptico.** Un eje horizontal con el objeto (flecha) en $-20$, la lente divergente en $0$ y el espejo cóncavo en $+d$. Arriba, un control deslizante para $d$. Marcar $C$ y $F$ del espejo (se mueven junto con el espejo).
2. **Ida por la lente.** Dos rayos desde la punta del objeto: uno paralelo al eje (sale abriéndose como si viniera del foco $F'$, a 80 cm a la izquierda) y uno por el centro. Las prolongaciones punteadas se juntan en la imagen virtual 1, en $-16$, con altura 0,8.
3. **Buscar $d$.** Mover el espejo con el control. Al lado, graficar la curva $s_3'(d)$ con los valores de `Geo1.py` (d = 40 → 35,6; 42 → 26,9; 44 → 20; 46 → 14,3; 50 → 5,3) y una línea horizontal en 20 cm. Cuando la curva la cruza ($d=44$), el centro $C$ del espejo se superpone con la imagen 1: hacer que "encastren" con un destello.
4. **Rayos que desandan el camino.** Con $d=44$, los rayos que salen de la lente parecen venir de $C$, así que llegan al espejo perpendiculares y vuelven **por la misma línea** (animar el rayo de vuelta superpuesto al de ida, en otro color). Al cruzar la lente de vuelta convergen en $-20$ y forman una flecha **invertida y del mismo tamaño** sobre el objeto.
5. **Cambio de sentido positivo.** Después de la reflexión, la flecha de "+" del eje gira 180° y queda apuntando a la izquierda. Mostrar $s_3=+16$ como "detrás de la lente, en el sentido de la luz".
6. **Los aumentos multiplicándose.** Tres fichas, $\times0{,}8$, $\times(-1)$ y $\times1{,}25$, que se juntan en $-1$. La flecha cambia de tamaño y se da vuelta en cada etapa.
7. **Animación de la trampa.** Poner el espejo en $d=40$ (imagen del espejo sobre el objeto) y mostrar que la imagen final aparece en $-35{,}6$ cm, lejos del objeto.
