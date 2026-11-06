# AGENTS.md

This file provides guidance to Codex (claude.ai/code) when working with code in this repository.

## Qué es esto

No es un repositorio de código: es material de estudio de **Física II (ITBA)**. El objetivo de las sesiones es ayudar al usuario a entender los temas y prepararse para el **parcial único**. Respondé en español rioplatense (voseo), como el material.

Situación del usuario: ya leyó toda la teoría, pero casi no hizo práctica. Por eso le conviene llevar ejercicios resueltos con su procedimiento, para poder seguirlos si toman algo parecido.

### Entregables a armar (cuando el usuario lo pida)

- Al examen se puede llevar **una hoja A4 doble faz**. Puede llevar cualquier contenido, y puede ir impresa, pero tiene que estar **escrita a mano** (en papel o con tableta gráfica, nunca tipeada).
- Se van a hacer **dos archivos separados**:
  1. **Hoja de fórmulas:** solo fórmulas, en el estilo de las de `Hojas de formulas encontradas/`. Va **sin termodinámica**.
  2. **Hoja de ejercicios resueltos:** los tipos de ejercicio que más se repiten (ver "Formato de los parciales recientes"), con un procedimiento corto que se pueda copiar.
- **Versiones:** según el usuario, la cátedra aceptó hojas compuestas con una fuente hecha con su letra. Cada archivo se arma en cuatro versiones: tipeada, para calcar (semitransparente), con su letra, y con su letra para calcar.

## `Hojas propias/`: cómo se arman las hojas

- `src/formulas.html` y `src/ejercicios.html` son el contenido: HTML con fórmulas KaTeX entre `$...$` o `$$...$$`. Cada `<div class="page">` es una cara A4 y se configura con `--cols` y `--fs`. El estilo está en `src/hoja.css`.
- Los macros `\sen`, `\tg` y `\arctg` están definidos en `tools/build.mjs`. Dentro de las fórmulas, `<` va como `&lt;`.
- No uses `\mathbb`, `\mathcal`, `\prod` ni dígitos en círculo: la fuente manuscrita no los cubre.
- Todos los resultados numéricos de `ejercicios.html` se verificaron con Python. Si agregás ejercicios, verificalos de la misma forma.

Comandos (desde `Hojas propias/`; las librerías de Python están en `.venv`, KaTeX está en `vendor/` y el PDF lo imprime Google Chrome sin interfaz):

```bash
node tools/build.mjs                                # tipeado + calco de las dos hojas -> salida/
node tools/build.mjs ejercicios --variantes=tipeado # una sola hoja o variante
.venv/bin/python tools/png.py salida/formulas-calco.pdf   # PNG por cara, para la tableta
.venv/bin/python tools/plantilla.py                 # plantilla para escribir la letra + build/plantilla.json
.venv/bin/python tools/fuente.py hoja1.png hoja2.png hoja3.png  # (o un PDF) -> build/fuente/HW-1..6.otf + build/letra-head.html
node tools/build.mjs --variantes=letra,letra-calco  # versiones con la letra del usuario
```

- `fuente.py` hace lo siguiente:
  - encuentra los 4 marcadores negros de la plantilla devuelta;
  - recorta cada cuadro según `build/plantilla.json`;
  - vectoriza el trazo con potrace;
  - arma 6 caras: 3 versiones de cada carácter × 2 juegos de deformaciones chicas al azar.
- Revisá siempre `build/fuente/recortes.png`: ahí se ven los cuadros leídos y los que quedaron vacíos.
- La plantilla escrita por el usuario (exportada de Krita) está en la raíz del proyecto. Para regenerar la fuente: `.venv/bin/python tools/fuente.py "../plantilla-letra-pag1v2.png" "../plantilla-letra pag 2.png" "../plantilla-letra pag 3.png" --descartar a3`. La "a 3" se descarta porque sale cortada y se lee como "o.".
- `tools/letra.js` elige al azar una cara para cada carácter y le agrega un pequeño corrimiento vertical y una variación de tamaño.
- `tools/ajustar.js` corre en todas las variantes:
  - busca el tamaño de letra más grande con el que cada cara entra en su página;
  - aplica el menor de esos tamaños a todas las caras;
  - `build.mjs` informa el tamaño final de cada cara.
  - Por eso el `--fs` de cada página es solo un punto de partida.
  - Una fórmula `$$…$$` demasiado ancha se desborda de su columna; si pasa, partila en renglones.
- `data-flujo` en la primera `.page` hace que `ajustar.js` elija además en qué bloque cortar entre las dos caras, para maximizar la letra. Lo usan `ejercicios.html` y `ejercicios-v2.html`.
- `Para imprimir/` (en la raíz del proyecto) tiene las versiones para imprimir. Hoy: `Ejercicios v4 (23)`, `v5 (21)`, `v6 (23)` y `v7 (24)` tipeados, para que el usuario los imprima y elija según cómo se lea la letra, y Fórmulas (tipeada y con la letra del usuario). Si se cambia una fuente en `src/`, recopiar desde `salida/`.
- `src/ejercicios.html` tiene 18 ejercicios. Sacó la fibra óptica (salió una sola vez, en 2023) y sumó el cambio de régimen forzado → libre (recuperatorio 18/10/25, la variante más repetida).
- `src/ejercicios-v2.html` tiene 19: los mismos 18 más MAS → sobreamortiguado (1P 2024, ej. 3; la solución manuscrita del PDF usa mal $x_0=-10$ cm).
- `src/ejercicios-v3.html` tiene 20: la v2 más "Estacionaria: energía en dos instantes" (recuperatorio 18/10/25, ej. 1: $A=1$ cm; en $t'$ la cuerda está horizontal ⇒ $U'=0$).
- Las versiones de 18, 19 y 20 ejercicios se sacaron de `Para imprimir/`; sus PDF siguen en `salida/` y se regeneran desde `src/`, incluida la de la letra de Mara.
- `src/ejercicios-v4.html` tiene 23: la v3 más tres ejercicios del parcial 2C 2026 (9: identificar el modelo de cuerda y $E_K(t)$; 14: lente sumergida + divergente; 20: red con detector roto y corrido), y sus variantes de cambio de régimen y de láminas como notas en los ejercicios 4 y 15. La numeración cambia desde el 9 respecto de la v3. También suma recetas de oscilaciones y de ondas, las fórmulas clave dentro de cada receta y un recordatorio inicial, "En todos los ejercicios"; los bloques cortos ocupan el espacio que deja el corte entre caras, que `ajustar.js` solo hace entre bloques completos.
- `src/ejercicios-v5.html` tiene 21. Se armó el 2/11/2026 desde la v4 según la frecuencia de `Parciales viejos/catalogo-ejercicios.md`: suma propagante con ⟨P⟩ → estacionaria (7), reflexión total de un rayo con espejo sumergido y prisma (9) y convergente + divergente sin imagen (13), los tres del recuperatorio del 1/11/2025 o del 18/6/2024. Saca MAS → sobreamortiguado (su fórmula queda en la receta), la energía en dos instantes y la identificación del modelo del 2C 2026 (queda como ejemplo en la receta de ondas). La imagen en el mismo lugar y las rendijas tapadas quedan como notas. Todas las cuentas nuevas se verificaron con Python. Los ejercicios 5 y 14 quedan partidos entre columnas: forzar que no se partan dejaba huecos y bajaba la letra. Letra (sin las reglas del 3/11): 6,43 pt; con un ejercicio más baja a unos 6,2 pt y con dos a unos 6,0 pt (la v4 está en 6,09 pt).
- `src/ejercicios-v6.html` tiene 23: la v5 más "barra con dos caras esféricas, imagen en la ubicación verdadera" (15, 1P 14/9/2024; la resolución del PDF olvida el n y da mal) y "aumento dado; al acercar el objeto no hay imagen" (10, final 7/7/2025). La receta de óptica geométrica está partida en dos bloques ("Fórmulas de óptica geométrica" al final de la cara 1 y "Receta óptica geométrica" al principio de la cara 2) para que el corte entre caras quede parejo: así la letra llega a 6,07 pt, el máximo posible con ese contenido (con la receta entera quedaba en 6,01 pt y un hueco de 38 mm).
- `src/ejercicios-v7.html` tiene 24: la v6 más "N rendijas: 5 con las 3 centrales tapadas, luego destapadas" (19, recuperatorio 30/5/2026: $\frac da=2$, $\frac{I_P}{I_{max}}=0{,}230$, 3 máximos principales, o 17 contando todos los máximos: 12 secundarios y un lobulito junto a cada orden suprimido) y dos reglas sin cuentas, "Espejos" en la receta de óptica y "Interfranja" en la de doble rendija. Letra: 5,84 pt. Hasta el 4/11/2026 el ejercicio extra era el telescopio con lente y espejo (recuperatorio 7/6/2025: R = −6 m o +18 m). Se cambió porque, contando solo parciales, el telescopio salió 1 vez y N rendijas 2, una de ellas en el último recuperatorio. El usuario prefiere ponderar los parciales (primeros, segundos y únicos) por sobre los finales, porque la cátedra recicla ejercicios de parciales.
- `src/ejercicios-v6-formulas.html` es la v6 con `--kx:1.2em` en cada `.page`: las fórmulas van a 1,2 veces el texto (lo normal es 1,08, definido en `hoja.css` como `var(--kx, 1.08em)`). Texto 5,86 pt y fórmulas 7,03 pt, contra 6,07 y 6,56 de la v6. Probado: con 1,3 el texto baja a 5,57 pt y con 1,4 a 5,28 pt. Las fracciones en línea siguen chicas porque KaTeX las reduce al 70%.
- `src/ejercicios-v7-tamanos.html` (6/11/2026) es la v7 con tamaños por rol: `class="page jer"` activa las reglas `.jer` del final de `hoja.css`. La descripción va a 0,9 (`--k-desc`) y el enunciado a 0,92 (`--k-enun`) del texto; las recetas y notas (`.chico`) suben de 0,9 a 1 (`--k-chico`); las fracciones en línea de KaTeX suben del 70 % al 84 % (`--kf`, separadas de la raya con `top`), y los subíndices del 70 % al 78 % (`--k-sub`). Con `data-por-cara`, `ajustar.js` le da a cada cara su propio tamaño máximo. Resultado: pasos 5,72 pt como la v7; recetas 5,15 → 5,72 pt; fracciones ~4,1 → ~5 pt; descripción 5,15 pt y enunciado 5,26 pt. Desapareció el hueco de ~35 mm abajo a la derecha de la cara 2. El corte entre caras está fijo en el src (sin `data-flujo`): la cara 1 termina en "Receta óptica geométrica" y la cara 2 empieza en el ejercicio 10. La cara 1 tiene `data-buscar`, porque que entre no es monótono con el tamaño (5,78 pt no entra y 5,79–5,90 sí) y la bisección se quedaba corta: `ajustar.js` recorre de a 0,01 pt y toma el mayor tamaño que entra junto con los dos anteriores. Letra: cara 1 5,88 pt, cara 2 5,72 pt. PDF: `Para imprimir/Ejercicios v7 tamaños variables (24) - tipeado.pdf`.
- `src/ejercicios-v8.html` (6/11/2026) tiene 25: la v7 más el telescopio (12, recuperatorio 7/6/2025: R = −6 m o +18 m; n' = 3 o 1,29, recalculado), que es el tipo sin ejercicio con más apariciones contando parciales (1 parcial único + 2 finales). Desde el 12 la numeración corre uno respecto de la v7 (N rendijas pasa a ser el 20). Usa los tamaños por rol (`jer`) con enunciado a 0,88, fórmulas a 1,13 (`--kx`) y fracciones al 86 % (`--kf`); cada cara se llena con `data-por-cara` + `data-buscar`. El corte entre caras lo eligió `data-flujo` (cara 1 hasta "Receta óptica geométrica") y después quedó fijo en el src, para sumar al final de la cara 2 la regla "Dos redes (cocientes)" (3 renglones, en los ~10 mm que sobraban): $N=wK$, órdenes que coinciden con $m_BK_B=m_AK_A$, suprimidos, ancho de línea $\propto\lambda/w$ y el ejemplo del final 15/7/2022. Letra: cara 1 5,67 pt, cara 2 5,42 pt (5,46 sin la regla). PDF: `Para imprimir/Ejercicios v8 (25) - tipeado.pdf`.
- `src/ejercicios-v9.html` (6/11/2026) tiene los mismos 25 ejercicios que la v8, con lo que salió de revisarla:
  - **Fracciones que se pisaban.** En la v8 y en la v7 con tamaños variables, unas 25 fracciones agrandadas se pisaban con el renglón de al lado: el corrimiento con `top` no reserva lugar. `hoja.css` suma `--k-aire`, que agrega aire arriba y abajo solo en los renglones con fracciones (vale 0 por defecto, así que la v7 con tamaños y la v8 no cambian). Además, `--k-num` levanta los numeradores para que los subíndices ($F_0$, $\omega_0$, $\lambda_0$) no queden apoyados en la raya; también vale 0 por defecto. La v9 usa `--kf:0.76;--k-aire:0.12em;--k-num:0.06em` en las dos caras. Para comprobarlo, un script inyectado en Chrome compara las cajas de tinta de cada fracción con las de los otros renglones: queda solo un falso positivo, una prima en el ej. 9.
  - **Correcciones:** en un espejo, la imagen real tiene $s'&lt;0$ (receta, paso 6); en la nota del 18/10/25 del ej. 11, el espejo es $R=-60$; cóncavo $R&lt;0$, convexo $R&gt;0$, divergente $f'&lt;0$ y convergente $f'&gt;0$, sin importar de qué lado llegue la luz; "convexo: siempre virtual" vale solo con objeto real.
  - **Agregados:**
    - el índice "¿Qué ejercicio uso?" en el primer recuadro (al usuario no lo convence del todo: `src/ejercicios-v9-sin-indice.html` es la misma hoja sin él);
    - en la receta de oscilaciones: forzado → libre al revés, que el estacionario oscila a la $\omega$ del motor, $\gamma=\frac b{2m}$ y $b$ crítico;
    - en la de ondas: dos propagantes ↔ estacionaria (sin fracciones con subíndices, que quedaban tachadas por la raya), qué factor temporal llevan $u_U$ y $u_K$, la energía de un tramo de $\frac\lambda4$ y los extremos raros (anillo, polea, guitarra);
    - en óptica: rayo que entra a un cubo ($n_0\sen\theta\le\sqrt{n^2-n'^2}$), dioptra plana, caras planas y biconvexas, $v=\frac cn$, lente con medios distintos;
    - en doble rendija y redes: $k$-ésimo mínimo, lámina delgada en general, $y=D\tg\theta$, redes con incidencia oblicua y órdenes faltantes que no cortan los siguientes.
  - **Errores típicos.** Los de las 36 soluciones de `Videos/_generador/soluciones/` van en párrafos "Ojo:" (clase `trampa`, en rojo) al final de cada receta.
  - **Descripciones.** Quedan las largas de la v8: se probaron de un renglón, pero el usuario prefiere las extensas. Se sacó la nota sobre la resolución del PDF del ej. 16.
  - **Corte entre caras.** La cara 1 termina con toda la óptica, partida en "Fórmulas de óptica geométrica" (fórmulas, cubo, Ojo y espejos) y "Receta óptica geométrica" (pasos 1–11); la cara 2 empieza en el ej. 10. Con las descripciones largas fue el corte más parejo (con la receta en la cara 2: 5,14 y 4,90 pt).
  - **Letra:** cara 1 4,96 pt, cara 2 5,11 pt; sin índice, 5,07 y 5,11 pt (en la v8, 5,67 y 5,42; casi toda la diferencia es el aire de las fracciones). PDF: `Para imprimir/Ejercicios v9 (25) - tipeado.pdf` y `Ejercicios v9 sin indice (25) - tipeado.pdf`.
- El usuario elige entre v5, v6, v6 con fórmulas grandes, v7, v7 con tamaños variables, v8, v9 y v9 sin índice después de imprimirlas.
- El 3/11/2026 se sumaron a v5, v6, v6 con fórmulas grandes y v7 las reglas de la hoja de fórmulas que les faltaban: pasos 10 y 11 de la receta de óptica (rayo suelto con reflexión total; objeto en el infinito y objeto que llega al foco), "Espejos, sin cuentas", "Interfranja, sin cuentas" y "¿Propagante o estacionaria?" en la receta de ondas. La v4 quedó sin cambios, como referencia. Letra final: v5 6,22 pt; v6 5,96 pt; v6 con fórmulas grandes 5,60 pt (fórmulas 6,72 pt); v7 5,88 pt (5,84 pt desde el 4/11/2026, con N rendijas en lugar del telescopio). En v5 y v6 con fórmulas grandes la receta de óptica está partida en bloques ("Fórmulas de óptica geométrica", "Espejos, sin cuentas", "Receta óptica geométrica") para que el corte entre caras quede más parejo.
- El 4/11/2026 se sumó a v5, v6, v6 con fórmulas grandes y v7 un párrafo "Unidades" en el recuadro "En todos los ejercicios": pasar a SI (g, cm, ms, mJ), µm y nm, $d$ a partir de rendijas por cm o por mm, km/h, dm³, $\omega=2\pi f$, y calculadora en RAD para $\beta$, $\gamma$, $kx$ y $\omega t+\varphi$ (en DEG solo los ángulos dados en grados). Letra final: v5 6,14 pt (6,12 pt desde que se corrigió el solapamiento de luz blanca: 12,9 %, no 9,9 %); v6 5,92 pt; v6 con fórmulas grandes 5,58 pt (fórmulas 6,70 pt); v7 5,72 pt.
- Por ahora se modifica solo la versión tipeada: `Para imprimir/Ejercicios v5 (21) - tipeado.pdf`, `Ejercicios v6 (23) - tipeado.pdf`, `Ejercicios v7 (24) - tipeado.pdf` y `Formulas - tipeado.pdf` están al día. `Formulas - mi letra.pdf` y las demás manuscritas o para calcar son anteriores a estos cambios. Generarlas solo cuando el usuario lo pida, más cerca del examen.
- `tools/build.mjs` corre en Windows y en macOS (elige la ruta de Chrome según el sistema). En Windows no hay `.venv`.
- **Letra de Mara (otra persona):**
  - Su plantilla escrita está en `salida/` ("fuente a mano mara pag 1.png", "segunda pagina mara.png", "pagina 3 mara fuente.png").
  - Fuente: `.venv/bin/python tools/fuente.py "salida/fuente a mano mara pag 1.png" "salida/segunda pagina mara.png" "salida/pagina 3 mara fuente.png" --nombre mara --descartar a1,b1,b2 --usar "I=|"`. En los cuadros de la I escribió una "i" con punto, y la a1, la b1 y la b2 salieron de otro tamaño.
  - Hoja: `node tools/build.mjs ejercicios-v3 --variantes=letra --fuente=mara`, que genera `salida/ejercicios-v3-letra-mara.pdf`.
  - La fuente del usuario no se toca: va en `build/fuente/` y la de Mara en `build/fuente-mara/`.
- El criterio para elegir ejercicios es la frecuencia de cada tipo en los 57 exámenes de `Parciales viejos/` (7 parciales únicos, 31 primeros y segundos parciales viejos y 19 finales). Está en `Parciales viejos/catalogo-ejercicios.md`, que también indica qué ejercicio de la hoja cubre cada tipo y cuáles repite la cátedra casi textuales. Si se agregan exámenes, sumarlos ahí.
- El usuario va a llevar al examen la hoja de **ejercicios**. Pidió resoluciones un poco más desarrolladas (planteo, fórmula, reemplazo, unidades), porque casi no hizo práctica, manteniendo los 18 ejercicios en 2 caras. Cada ejercicio empieza con un párrafo `.desc` que cuenta en palabras qué sistema plantea.
- `tools/prueba_relleno.py` rellena la plantilla con una letra del sistema (`build/plantilla-prueba.pdf`). Sirve para probar todo el circuito sin la plantilla real.

## Alcance del examen

- **Antes** (en 2023 y 2024) había dos parciales: el **1P** (oscilaciones, ondas, óptica geométrica) y el **2P** (interferencia, difracción, redes y termodinámica).
- **Ahora** (por lo menos desde 1C 2025) se toma un **parcial único** (“Examen intermedio”) con todos los temas de `Teoria/` **menos termodinámica**. Entonces entra todo lo de los 1P viejos y la parte de óptica física de los 2P viejos.
- **Fuera del parcial**: `Teoria/11_Temperatura-calor_2Q2024.pdf`, las secciones 24–28 de la guía (calorimetría → segundo principio), la parte de termodinámica de las hojas de fórmulas, la polarización (aparece en finales y segundos parciales viejos) y los tubos de sonido (tubo de Kundt, abierto–cerrado: aparecen en finales, pero `Teoria/04`–`05` no los tratan).

Temas que entran, en el orden de la teoría (`Teoria/01`–`10`) y con las secciones de la guía de problemas:

| Teoría | Tema | Secciones de la guía |
|---|---|---|
| 01–03 | MAS, amortiguado, forzado/resonancia (Q, potencia media, ancho de resonancia) | 1–5 |
| 04–05 | Ondas propagantes, energía/potencia, ondas estacionarias | 6–10 |
| 06–07 | Snell, reflexión total, dioptras, lentes delgadas, espejos | 11–15 |
| 08–09 | Interferencia (láminas delgadas, Young), difracción por una y dos rendijas | 16–19, 21 |
| 10 | Resolución (Rayleigh), redes de difracción, resolución cromática | 20, 22, 23 |

## Formato de los parciales recientes

- Tienen 5 o 6 ejercicios, y casi siempre siguen este patrón:
  1. oscilador amortiguado o forzado, o una onda estacionaria en una cuerda (energía en un tramo, gráfico de la densidad de energía);
  2. reflexión total (disco iluminado en un cubo o un recipiente);
  3. sistema lente + espejo (haces que salen paralelos, imagen en el lugar del objeto, R cóncavo/convexo);
  4. doble rendija con láminas delgadas, incidencia oblicua o un líquido entre la placa y la pantalla (corrimiento de franjas, espesor e, intensidad en el centro con I₀ = 1);
  5. red de difracción (cuántas líneas se ven en una pantalla de ancho dado, si se resuelven λ cercanas, solapamiento con luz blanca) o el criterio de Rayleigh.
- Criterio de aprobación **actual**: según el usuario, alcanza con sacarse un **4**. Los criterios que figuran en los enunciados viejos ya no corren:
  - en 2023 había un mínimo por bloque de ejercicios;
  - en 2025 se podían tener como máximo dos ejercicios con cero;
  - en el recuperatorio del 30/5/2026, cada mitad tenía que sumar al menos 1 punto.
- Siempre se pide justificar con planteo, esquema o cálculo.

## Estructura de carpetas

- `Teoria/`: resúmenes de clase del 2Q2024 (`01`–`11`). `Teoria/Apuntes/` tiene apuntes complementarios por tema (subamortiguado, ancho de resonancia, energía en cuerdas, batidos, desfasaje con láminas en la doble rendija, red de N ranuras, etc.). Hay dos `.pptx` de óptica geométrica.
- `Parciales viejos/` (sin duplicados desde el 2/11/2026; nombres `<año> <cuatrimestre> - <examen> (<día-mes>)`, y los finales `<año>-<mes> Final <I, II o III>`):
  - `catalogo-ejercicios.md`: qué trae cada examen y la frecuencia de cada tipo de ejercicio.
  - `Ejercicios para practicar.pdf` (4/11/2026): 36 enunciados recortados de exámenes viejos que **no** están en la hoja v6. Están por bloque (Osc 1–6, Ond 1–7, Geo 1–10, DR 1–6, Red 1–7), con un índice y un orden sugerido por rondas (el 1 de cada bloque, después el 2, etc.). Se excluyeron los ejercicios casi textuales a los de la hoja y los del parcial 2C 2026. Se regenera con `python -I "Hojas propias/tools/practica.py" --build <carpeta temporal>`, que copia el PDF acá. Los recortes se definen en la lista `EJ` del script, en puntos PDF; `--preview` muestra cada recorte con su contexto para revisarlo.
  - `Parciales únicos/` (**los más representativos**): intermedio 24/5/2025 (con solución), recuperatorio 7/6/2025, intermedio 18/10/2025, recuperatorio 1/11/2025, parcial 1C 2026 (`.jpeg`) y recuperatorio 30/5/2026. El parcial 2C 2026, que el usuario desaprobó, está solo en el doc https://claude.ai/artifact/TssbiZfX7pVfuYX2gr92NH.
  - `Primeros parciales (formato viejo)/`: 18 exámenes, 2015–2024 (oscilaciones, ondas y óptica geométrica). Los de 2020 2C y los de 2023–2024 con "con solución" traen la resolución de un alumno.
  - `Segundos parciales (formato viejo)/`: 12 exámenes, 2016–2024. Solo sirve la óptica física; desde 2022 la otra mitad es termodinámica, y hasta 2019 había polarización.
  - `Finales/`: 19 finales, 2018–2026. Más conceptuales que los parciales.
  - `Resoluciones de alumnos/`: el cuadernillo de parciales resueltos (recuperatorio 1C 2025 y parcial 1C 2025, con la sección de la guía que usa cada resolución), las resoluciones de nash (finales 2021–2023; segundos parciales 2022–2023, con el recuperatorio del 2P 1C 2023, que no está en otro archivo) y las de rodri (finales de diciembre 2023 y julio 2024).
- `Videos/` (5/11/2026): un video por tanda del PDF de práctica (`Ejercicios practica parcial - Tanda N.mp4`, tanda N = los ejercicios número N de cada bloque; 10 tandas, de 5 a 50 min), con subtítulos y PDF de diapositivas. Los MP4, `.srt` y PDF no van a git (pesan hasta 126 MB). Se regeneran con `Videos/_generador/` (ver su README: `node make.js tandaN`, voz de Microsoft Edge con internet, Chrome y FFmpeg). `Videos/_generador/soluciones/` tiene la resolución verificada de los 36 ejercicios (`.md` + `.py`), útil para corregir la práctica sin mirar el video.
- `Hojas de formulas encontradas/`: hojas de otros alumnos. Las de “Primer/Segundo Parcial” y `Hoja de formulas.pdf` son manuscritas y escaneadas. Ojo: incluyen termodinámica.
- `guía de ejercicios F2.pdf`: guía oficial de problemas del 2C 2026 (74 páginas, secciones 1–28, con la convención de signos de óptica en la p. 23).

## Convenciones físicas que usa la cátedra

- Óptica geométrica: el origen va en el vértice de cada elemento y el sentido positivo es el de la luz incidente. Las ecuaciones son n'/s' − n/s = (n'−n)/R, con A = n s'/(n' s); para lentes, s₂ = s'₁ − D; para espejos, 1/s' + 1/s = 2/R y A = −s'/s. s' > 0 es imagen real.
- Luz blanca: 400–700 nm, salvo que el enunciado diga otra cosa.
- Interferencia: Δφ = (2π/λ₀)·ΔCO + Δφ_ref. En la doble rendija se usan γ = Δφ/2 y β = (π a/λ₀) n senθ, con I = 4I₀cos²γ (sinβ/β)². En una red, sinθ = mλK con K = 1/d. Los máximos suprimidos están en m = p·d/a.

## Cómo leer los archivos

- No hay poppler (`pdftotext`/`pdftoppm`), así que `Read` con `pages` falla. No intentes instalarlo con `brew`: en esta Mac (macOS 14) Homebrew compila todo desde el código fuente, incluido `cmake`, y tarda muchísimo.
- Usá **PyMuPDF** (`fitz`) y `pypdf` instalados con `pip install --target <scratchpad>/pylib pymupdf pypdf` y después `sys.path.insert`. Con PyMuPDF renderizá las páginas a PNG (`page.get_pixmap(dpi=110)`) y después mirá cada imagen con `Read`.
- Muchos parciales, soluciones y hojas de fórmulas son **escaneos, fotos o manuscritos de tableta**. Leelos como imagen: el texto extraído o el OCR de las soluciones manuscritas no sirven.
- Los nombres con tildes (`guía`, `Física`) están en Unicode NFD en macOS. Si una ruta literal falla, usá globs (`gu*a*.pdf`).
