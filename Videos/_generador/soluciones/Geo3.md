# Geo 3 · Convergente con imagen derecha + espejo cóncavo: dos imágenes en el mismo lugar (1P 16/9/2023, ej. 2)

Verificado con `Geo3.py`: ecuaciones de la cátedra y, aparte, matrices de rayos ABCD.

## 1. Datos y qué se pide

Sobre una regla graduada de 0 a 100 cm hay un objeto en x = 50 cm y un observador en x = 100 cm, que mira hacia la izquierda. La luz va del objeto al observador, en el sentido +x.

| Dato | Valor (SI) |
|---|---|
| Posición del objeto | x_obj = 50 cm = 0,50 m |
| Posición del observador | x_obs = 100 cm = 1,00 m |
| Lente convergente | f' = +30 cm = 0,30 m |
| Imagen buscada en a) | derecha (no invertida), a 40 cm = 0,40 m del objeto |
| Espejo cóncavo | radio de curvatura \|R\| = 20 cm = 0,20 m (foco a 10 cm) |

Qué se pide:

- **a)** En qué posición de la regla va la lente para que el observador vea una imagen derecha a 40 cm del objeto.
- **b)** Con la lente donde se encontró en a), en qué posición va un espejo cóncavo de 20 cm de radio para que la persona vea **dos imágenes en la misma posición**.

(Como la regla está en cm, los resultados se dan en cm.)

## 2. Molde en la hoja (v6)

- **Ej. 12 · Espejo + lente: dos imágenes en la pantalla (Recu 30/5/26)** es casi el mismo ejercicio.
  - Lo que se repite: un objeto entre un espejo cóncavo y una lente; la lente forma una sola imagen de cada "objeto", así que para que las dos imágenes coincidan, la imagen del espejo tiene que caer sobre el objeto ⇒ **objeto en el centro de curvatura, s = R, A_esp = −1**. Por eso una imagen sale derecha y la otra invertida.
  - Lo que cambia: en el ej. 12 la imagen es real, sobre una pantalla (A < 0), y el dato es el aumento. Acá la imagen es **virtual** (la ve un observador, derecha, A > 0) y el dato es la distancia objeto–imagen. Además, el ej. 12 pide R y acá R es dato y se pide la posición del espejo.
- **Ej. 10 · Aumento dado** para la parte a): una sola lente, con una condición sobre la imagen que se traduce en una relación entre s y s'. Receta de óptica, paso 8: "una lente con objeto real: imagen en pantalla ⇒ real, A < 0". Acá vale el caso contrario: **derecha ⇒ virtual**.

## 3. Teoría que se usa

**Convención de la cátedra.**

- El origen va en el vértice de cada elemento, y el sentido + es el de la luz que llega a ESE elemento.
- Un objeto real (antes del elemento) tiene s < 0.
- En una lente, s' > 0 es una imagen real (del otro lado) y s' < 0, una imagen virtual (del mismo lado que el objeto).

**Lente delgada.** 1/s' − 1/s = 1/f', con A = s'/s.

- Convergente: f' > 0.
- Si el objeto está **entre el foco y la lente** (|s| < f'), la imagen es **virtual, derecha y mayor**, del mismo lado que el objeto y **más lejos** de la lente que él. Es la lupa.
- Si el objeto está más allá del foco, la imagen es real e invertida.

Por eso "imagen derecha" con una sola lente convergente obliga a que la imagen sea virtual y quede del lado del objeto.

**Espejo.** 1/s' + 1/s = 2/R, con A = −s'/s; cóncavo ⇒ R < 0, porque el centro está del lado de donde viene la luz.

- Si el objeto está en el centro de curvatura (s = R), la imagen cae sobre el objeto: s' = R, A = −1, real, invertida y del mismo tamaño. Los rayos que salen del centro llegan perpendiculares al espejo y vuelven sobre sí mismos.
- Después del espejo, el + pasa a ser el sentido de la luz reflejada, y para el elemento siguiente se usa s₂ = s₁' − D.

**Sistemas.** La imagen de un elemento es el objeto del siguiente, y A_total = A₁·A₂.

"Dos imágenes en la misma posición" quiere decir que al observador le llegan dos caminos de luz:

- el directo: objeto → lente;
- el reflejado: objeto → espejo → lente.

La lente manda a un mismo lugar solo los rayos que salen de un mismo punto. Entonces los dos "objetos" de la lente (el objeto real y la imagen que forma el espejo) tienen que estar en el mismo lugar.

## 4. Resolución paso a paso

### a) Posición de la lente

1. **Tipo de imagen.** Una lente convergente con objeto real da imagen derecha solo si es virtual: queda del lado del objeto, más lejos de la lente. La lente tiene que estar entre el objeto y el observador (50 < x_L < 100), así que la imagen virtual queda a la izquierda del objeto: **x_img = 50 − 40 = 10 cm**.
2. **Planteo.** Con + hacia la derecha (+x) y el origen en la lente:
   - s = 50 − x_L (negativo);
   - s' = 10 − x_L (negativo);
   - s − s' = 40 cm.
3. **Ecuación de la lente.** 1/s' − 1/s = 1/30 ⇒ (s − s')/(s·s') = 1/30 ⇒ s·s' = 40·30 = 1200 cm².
   (x_L − 10)(x_L − 50) = 1200 ⇒ x_L² − 60x_L + 500 − 1200 = 0 ⇒ **x_L² − 60x_L − 700 = 0**.
4. **Raíces.** x_L = (60 ± √(3600 + 2800))/2 = (60 ± 80)/2 ⇒ x_L = 70 cm o x_L = −10 cm. La segunda está fuera de la regla y del lado contrario al observador: se descarta.
   Con la incógnita s, como hace el alumno, queda s² − 40s − 1200 = 0, con s = −20 o s = 60. Un objeto real tiene s < 0, así que s = −20.
5. **Resultado:** **lente en x_L = 70 cm**.
   - s = −20 cm y s' = −60 cm. Chequeo: 1/(−60) − 1/(−20) = 2/60 = 1/30 ✓.
   - A = s'/s = (−60)/(−20) = **+3**: derecha, virtual (s' < 0) y tres veces mayor. Está en x = 70 − 60 = 10 cm ✓.
6. **¿Y si la imagen estuviera a la derecha del objeto (x = 90)?** (x_L − 90)(x_L − 50) = −1200 no tiene solución real (discriminante −3200). Confirma que la imagen derecha va en x = 10.

### b) Posición del espejo cóncavo

1. **Condición.** El observador ve una imagen directa en x = 10 cm. Para ver la segunda en el mismo lugar, la luz que rebota en el espejo tiene que llegar a la lente como si saliera de x = 50: **la imagen que forma el espejo tiene que coincidir con el objeto**.
2. **Dónde va el espejo.** No puede ir entre el objeto y la lente, porque taparía el camino directo, ni del lado del observador. Va **a la izquierda del objeto**, con la cara cóncava hacia el objeto (hacia +x).
3. **Ecuación del espejo.** La luz llega al espejo yendo hacia −x, así que ese es el +. Imagen sobre el objeto ⇒ s' = s:
   1/s + 1/s = 2/R ⇒ **s = R**: el objeto tiene que estar en el centro de curvatura.
   Con R = −20 cm (cóncavo), s = −20 cm: el objeto está 20 cm delante del espejo.
   - s' = −20 cm: imagen real, delante del espejo, justo sobre el objeto.
   - A_esp = −s'/s = −1: invertida y del mismo tamaño.
4. **Resultado:** **espejo en x_e = 50 − 20 = 30 cm**.
5. **Chequeo con la lente (vuelta).** Ahora el + es el de la luz reflejada (+x). La imagen del espejo está a +20 cm de él y la distancia espejo–lente es D = 70 − 30 = 40 cm.
   - s₂ = s₁' − D = 20 − 40 = −20 cm ⇒ s₂' = −60 cm ⇒ x = 10 cm ✓.
   - A_total = A_esp · A_lente = (−1)(+3) = **−3**.
6. **Qué ve el observador.** En x = 10 cm hay dos imágenes del mismo tamaño (3 veces el objeto), superpuestas: la directa derecha (A = +3) y la que pasa por el espejo invertida (A = −3). Las matrices ABCD del `.py` dan lo mismo: las dos en x = 10,0 cm, con aumentos +3,00 y −3,00.

**Ambigüedad.** Matemáticamente, 2/s = 2/R también se cumple en el límite s → 0, con el objeto pegado al espejo en x = 50. Eso no tiene sentido físico. La respuesta esperada, la misma que da la resolución del alumno, es **x_e = 30 cm**. La resolución del alumno coincide en a) y en b).

## 5. Resultados finales

- **a)** Lente en **x = 70 cm**. Imagen virtual y derecha en x = 10 cm, con A = +3 (s = −20 cm, s' = −60 cm).
- **b)** Espejo cóncavo en **x = 30 cm**, mirando hacia el objeto: el objeto queda en su centro de curvatura. El observador ve en x = 10 cm una imagen derecha y otra invertida, las dos 3 veces mayores.

## 6. Dónde es fácil equivocarse

- **Poner la imagen en x = 90.** "Derecha" con una convergente implica imagen virtual, que queda del lado del objeto, más lejos de la lente: x = 10.
- **Signos en la lente.** s y s' son los dos negativos (objeto real, imagen virtual). Si se pone s' = +60, la imagen sale real e invertida.
- **Quedarse con la raíz equivocada.** x_L = −10 (o s = +60, que sería un objeto virtual) se descarta.
- **Usar |R| = 20 con signo +.** En la convención de la cátedra, un cóncavo tiene R < 0. Acá el resultado s = R no cambia, pero en otros ejercicios sí importa.
- **Poner el espejo a 10 cm del objeto** (en el foco). En ese caso los rayos salen paralelos del espejo y la lente forma la imagen en su foco, del otro lado (x = 100, sobre el observador). No da dos imágenes en el mismo lugar.
- **Poner el espejo entre el objeto y la lente.** Taparía la imagen directa.
- **Olvidar que después del espejo cambia el sentido +.** Para la vuelta, s₂ = s₁' − D se mide con + hacia +x.
- **Aumento total.** No basta con decir "otra imagen": la segunda sale invertida (A = −3), y eso es lo que distingue las dos.

## 7. Ideas de animación

1. **Regla y personajes.** La regla de 0 a 100 cm, el objeto (flecha) en 50 y un ojo en 100. Una flecha de "sentido de la luz" hacia +x.
2. **¿Real o virtual?** Una lente convergente que se desliza por la regla. Cuando el objeto queda fuera del foco, la imagen sale real e invertida, en rojo con el cartel "invertida ✗". Cuando queda dentro del foco, la imagen es virtual y derecha, del lado del objeto, en verde. Se fija la imagen en x = 10 (a 40 cm a la izquierda del objeto).
3. **Cuentas de a).** Cotas s = −20 y s' = −60 sobre la regla, la cuadrática x_L² − 60x_L − 700 = 0 con sus dos raíces y −10 tachada. La lente "cae" en x = 70.
4. **Trazado de rayos de a).** Desde la punta del objeto, un rayo paralelo al eje que pasa por F' y otro que pasa por el centro de la lente. Los dos divergen hacia el ojo; sus prolongaciones (punteadas) se cortan en x = 10, en la punta de una flecha 3 veces mayor.
5. **b) El espejo.** Aparece el espejo cóncavo a la izquierda y se desliza hasta que su centro de curvatura C coincide con el objeto (x = 30). Dos rayos salen del objeto hacia el espejo, llegan perpendiculares (radios) y vuelven sobre sí mismos: la imagen invertida queda encima del objeto.
6. **Dos caminos.** El camino directo en azul y el que pasa por el espejo en naranja. Los dos pasan por la lente y sus prolongaciones convergen en x = 10. Ahí aparece una flecha derecha (azul) y otra invertida (naranja), del mismo tamaño, superpuestas.
7. **Contraejemplo.** El espejo a 10 cm del objeto (objeto en el foco): rayos paralelos, la lente los junta en x = 100 y no se forma la imagen doble.
