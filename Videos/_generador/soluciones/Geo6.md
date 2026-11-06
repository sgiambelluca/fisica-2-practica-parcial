# Geo 6 · Sistema delgado de dos piezas (n₁ y n₂): R para que los haces emerjan paralelos

Origen: recuperatorio 1P 18/6/2024, ejercicio 2 (2 puntos). Verificación numérica: `Geo6.py`.

## 1. Datos y qué se pide

| Dato | Valor | SI |
|---|---|---|
| Índice de la pieza izquierda | n₁ = 1,2 | — |
| Índice de la pieza derecha | n₂ = 1,5 | — |
| Radio de las interfases curvas | \|R\| = 20 cm | 0,20 m |
| Medio exterior | aire, n = 1 | — |
| Espesor | despreciable (sistema delgado) | — |
| Objeto | 20 cm a la izquierda | s = −20 cm = −0,20 m |

Conviene trabajar en cm: las potencias salen en cm⁻¹ y los números quedan limpios.

**Qué muestra la figura** (mirada ampliada desde el PDF original):

- **Pieza izquierda, n₁.** Es un rectángulo. Su cara izquierda está dibujada **recta**, y desde ella sale un rótulo **"R"** con una línea indicadora. Su cara derecha es la cara curva que encaja con la pieza n₂.
- **Pieza derecha, n₂.** Es una elipse, o sea una lente **biconvexa**. Su cara izquierda es la interfase n₁|n₂, abombada hacia la izquierda. Su cara derecha da al aire y está abombada hacia la derecha.
- Hay otro "R" a la derecha cuya línea sale de la foto (la imagen está cortada), y unas líneas finas de lápiz que parecen rayos dibujados por el alumno.

Entonces hay tres interfases: (1) aire | n₁, la cara "R"; (2) n₁ | n₂, curva; (3) n₂ | aire, curva.

**Qué se pide:** cuánto debe valer el radio R para que los haces que salen de un objeto a 20 cm a la izquierda emerjan paralelos.

## 2. Molde en la hoja

El molde es el **ejercicio 15 de la hoja v6, "Barra con dos caras esféricas: imagen en la ubicación verdadera" (1P 14/9/24)**. La nota del final de ese ejercicio menciona justamente este recuperatorio: "1P 20/4/24 y Recu 18/6/24 piden que salgan paralelos ⇒ s'_final = ∞".

Qué se repite:

- encadenar dioptras con n'/s' − n/s = (n'−n)/R;
- la imagen de una es el objeto de la siguiente;
- sacar el signo de cada R del dibujo;
- el radio que falta sale de la última ecuación.

Qué cambia:

- Hay **tres** interfases y la distancia entre ellas es **cero** (espesor despreciable). Entonces s_{k+1} = s'_k, sin restar L.
- La condición final es **s' = ∞** ("emergen paralelos"), no "imagen en el lugar del objeto".
- La incógnita es la **primera** cara. Por eso conviene ir hacia atrás desde el infinito y hacia adelante desde el objeto, hasta encontrarse en el medio.
- También sirve la fórmula de lentes delgadas pegadas de "Fórmulas de óptica geométrica": las potencias se suman.

## 3. Teoría que se usa

**Dioptra esférica.** Para el pasaje de un medio n a un medio n':

n'/s' − n/s = (n' − n)/R

Convención de la cátedra:

- el origen está en el vértice de la superficie;
- el sentido positivo es el de la luz (hacia la derecha);
- s < 0: objeto real, a la izquierda;
- s' > 0: imagen real, a la derecha; s' < 0: imagen virtual, a la izquierda;
- **R > 0 si el centro de curvatura está del lado de la luz saliente** (a la derecha).

**Cómo leer el signo de R en el dibujo.** Una cara **abombada hacia la izquierda** (convexa hacia la luz que llega) tiene el centro a la derecha, así que R > 0. Una cara **abombada hacia la derecha** tiene el centro a la izquierda, así que R < 0. En la figura:

- interfase n₁|n₂: lado izquierdo de la elipse, abombado hacia la izquierda ⇒ **R₂ = +20 cm**;
- cara n₂|aire: lado derecho de la elipse, abombado hacia la derecha ⇒ **R₃ = −20 cm**.

**Encadenar.** La imagen de la dioptra k es el objeto de la dioptra k+1. El "n" de la siguiente es el "n'" de la anterior. Con espesor nulo, s_{k+1} = s'_k. Una imagen virtual (s' < 0, a la izquierda) sirve de objeto **real** para la siguiente: la luz realmente viene de ese lado.

**"Emergen paralelos".** Los rayos salen paralelos cuando la imagen final está en el infinito: n'/s'_final = 0. Equivale a decir que el objeto está en el foco objeto del sistema.

**Atajo de potencias.** En un sistema delgado, cada dioptra aporta una "potencia" (n'−n)/R, y las potencias se suman:

1/s'_final − 1/s = P_total = Σ (n'−n)/R   (con aire a los dos lados)

Para lentes delgadas pegadas, P = Σ (n_L − 1)(1/R_a − 1/R_b). Si salen paralelos, 0 − 1/s = P, es decir **P = 1/20 cm⁻¹** (f' = 20 cm).

**Menisco de caras paralelas.** Una pieza delgada con las dos caras del mismo radio y curvadas hacia el mismo lado tiene potencia (n−1)(1/R − 1/R) = 0: no desvía.

## 4. Resolución paso a paso

### Interpretación principal (la más probable): R es la cara izquierda (aire | n₁)

Las "interfases curvas" de |R| = 20 cm son las dos caras de la elipse (n₁|n₂ y n₂|aire): las dos dibujadas curvas, y "interfases" está en plural. La incógnita es la cara izquierda, la que señala el rótulo "R".

**Paso 1: signos.** R₂ = +20 cm, R₃ = −20 cm, R₁ = R (incógnita), s₁ = −20 cm.

**Paso 2: desde el final hacia atrás.** Última dioptra, n₂ = 1,5 → aire, con s₃' = ∞:

- 1/∞ − 1,5/s₃ = (1 − 1,5)/(−20) = +0,025 cm⁻¹
- s₃ = −1,5/0,025 = **−60 cm**

Dentro de n₂, los rayos tienen que divergir desde un punto que está 60 cm a la izquierda.

**Paso 3: dioptra del medio**, n₁ = 1,2 → n₂ = 1,5. Su imagen tiene que ser s₂' = s₃ = −60 cm:

- 1,5/(−60) − 1,2/s₂ = (1,5 − 1,2)/(+20) = 0,015
- −0,025 − 0,015 = 1,2/s₂ ⇒ 1,2/s₂ = −0,040 ⇒ s₂ = **−30 cm**

**Paso 4: primera dioptra**, aire → n₁ = 1,2, con objeto s₁ = −20 cm e imagen s₁' = s₂ = −30 cm:

- 1,2/(−30) − 1/(−20) = (1,2 − 1)/R
- −0,040 + 0,050 = 0,010 = 0,2/R
- **R = +20 cm**

**Chequeo hacia adelante.**

- 1,2/s₁' = 0,2/20 − 1/20 ⇒ s₁' = −30 cm
- 1,5/s₂' = 0,015 + 1,2/(−30) ⇒ s₂' = −60 cm
- 1/s₃' = 0,025 + 1,5/(−60) = 0 ⇒ s₃' = ∞ ✓

**Chequeo con potencias.** 0,2/20 + 0,3/20 + 0,5/20 = 0,010 + 0,015 + 0,025 = 0,050 cm⁻¹ = 1/20 ✓

**Qué significa.** R = +20 cm tiene el centro a la derecha: la cara izquierda está **abombada hacia el objeto**, paralela a la interfase n₁|n₂.

- La pieza n₁ queda como un menisco de espesor uniforme, con potencia (1,2 − 1)(1/20 − 1/20) = **0**.
- La biconvexa n₂ sola tiene P = 0,5·(1/20 + 1/20) = 0,05 cm⁻¹, o sea **f' = 20 cm**. El objeto ya estaba en su foco.

Si la cara izquierda fuera plana, como está dibujada:

- la pieza n₁ sería plano-cóncava y le restaría potencia (P = 0,04 cm⁻¹, f' = 25 cm);
- la imagen final quedaría en s' = −100 cm (virtual), con los rayos todavía divergiendo.

Si fuera cóncava (R = −20 cm), P = 0,03 cm⁻¹ y tampoco salen paralelos.

(Si se lee que las **dos caras externas** tienen el mismo radio R desconocido, con R₁ = +R y R₃ = −R, sale 0,2/R + 0,015 + 0,5/R = 0,05 ⇒ 0,7/R = 0,035 ⇒ **R = 20 cm**. Es el mismo sistema.)

### Interpretación alternativa: la cara izquierda es plana y R es la cara derecha (n₂ | aire)

Solo la interfase n₁|n₂ tiene |R| = 20 (R₂ = +20) y la incógnita es R₃.

- Cara plana, aire → n₁: 1,2/s₁' − 1/(−20) = 0 ⇒ s₁' = **−24 cm**. Una cara plana no tiene potencia, pero igual mueve la imagen.
- n₁ → n₂: 1,5/s₂' = 0,015 + 1,2/(−24) = 0,015 − 0,050 = −0,035 ⇒ s₂' = **−42,86 cm**
- n₂ → aire, con s₃' = ∞: 0 − 1,5/(−42,86) = (1 − 1,5)/R₃ ⇒ 0,035 = −0,5/R₃ ⇒ **R₃ = −14,3 cm**. Es convexa hacia afuera, con el centro a la izquierda.

**¿Cuál es la más probable?** La principal (R = +20 cm), por tres razones:

1. el rótulo "R" de la figura apunta a la cara izquierda;
2. el enunciado habla de "las interfases curvas", en plural, para el dato de 20 cm;
3. los números cierran justo: la biconvexa n₂ tiene f' = 20 cm, igual a la distancia del objeto. Parece pensado para que la pieza n₁ no tenga que aportar potencia.

En el examen conviene escribir qué cara se toma como incógnita y, si hay dudas, dar las dos.

## 5. Resultados finales

- Signos según la figura: R₂ (n₁|n₂) = +20 cm; R₃ (n₂|aire) = −20 cm.
- Condición: s'_final = ∞, o sea P_total = 1/20 cm⁻¹.
- **Interpretación principal (cara izquierda = R): R = +20 cm.** Cara convexa hacia el objeto; la pieza n₁ es un menisco de potencia nula. Imágenes intermedias: s₁' = −30 cm, s₂' = −60 cm, s₃' = ∞.
- Interpretación alternativa (cara izquierda plana, R = cara derecha): R = −14,3 cm (|R| = 14,3 cm, convexa hacia la derecha).

## 6. Dónde es fácil equivocarse

- **El signo de R.** Las dos caras de la biconvexa tienen el mismo |R| pero signos opuestos: +20 la izquierda y −20 la derecha. Si se ponen los dos iguales, la biconvexa "pierde" potencia.
- **Confundir los índices en la interfase del medio.** Ahí n = 1,2 y n' = 1,5, no 1 y 1,5. La diferencia n' − n = 0,3 es chica, y es fácil escribir 0,5.
- **Tratar n₁ y n₂ como una sola lente,** con un solo n.
- **"Paralelos" ⇒ s' = 0.** No: es s' = ∞, es decir n'/s' = 0.
- **Restar un espesor.** Es despreciable: s_{k+1} = s'_k.
- **La cara plana.** En la variante alternativa no hay que olvidarse de la cara plana: aunque no tiene potencia, cambia s (de −20 a −24 cm dentro de n₁).
- **Dar solo |R|** sin decir hacia dónde está abombada la cara o dónde está el centro.
- **Mezclar unidades.** Si se pasa a m, todo en m: 1/20 cm⁻¹ = 5 m⁻¹.
- **Contestar R = ∞,** creyendo que la pieza n₁ no influye porque "su cara es plana". Con la cara plana, la pieza n₁ es plano-cóncava y sí influye: f' = 25 cm.

## 7. Ideas de animación

1. **La figura a escala exagerada.** Las dos piezas separadas un poco para ver las tres caras, con los centros de curvatura como puntos:
   - C₂ a 20 cm a la derecha de la interfase n₁|n₂;
   - C₃ a 20 cm a la izquierda de la cara derecha.

   Al lado de cada R, una flecha "centro → del lado de la luz saliente ⇒ +".
2. **Abanico de rayos desde el objeto** a 20 cm, refractándose cara por cara. Después de cada cara, prolongar los rayos hacia atrás con línea punteada para mostrar la imagen virtual que "ve" la siguiente: −30 cm, después −60 cm, y al final rayos paralelos. El punto imagen se va corriendo a la izquierda hasta "irse al infinito".
3. **"Encontrarse en el medio".** Dos flechas animadas:
   - una sale del objeto (s₁ = −20) hacia adelante;
   - otra sale del infinito (s₃' = ∞) hacia atrás y llega a s₃ = −60 y después a s₂ = −30.

   Se juntan en la primera cara, y ahí se despeja R.
4. **Interruptor de la cara izquierda: plana / R = +20 / R = −20.** Con plana, los rayos salen divergiendo (imagen virtual a 100 cm). Con +20, paralelos. Con −20, más divergentes (imagen virtual a 50 cm).
5. **Barras de potencia.** Tres barras que se apilan: 0,010 + 0,015 + 0,025 = 0,050 cm⁻¹, junto a una línea objetivo "1/20". Con la cara plana, la primera barra desaparece y no se llega.
6. **Idea física.** La biconvexa sola, con su foco a 20 cm; el objeto justo en el foco; el menisco n₁ "transparente" (potencia 0) que no cambia nada.
