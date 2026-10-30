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
- `Para imprimir/` (en la raíz del proyecto) tiene las versiones para imprimir, tipeada y con la letra del usuario: Ejercicios (18), Ejercicios (19) y Fórmulas. Si se cambia una fuente en `src/`, recopiar desde `salida/`.
- `src/ejercicios.html` tiene 18 ejercicios. Sacó la fibra óptica (salió una sola vez, en 2023) y sumó el cambio de régimen forzado → libre (recuperatorio 18/10/25, la variante más repetida).
- `src/ejercicios-v2.html` tiene 19: los mismos 18 más MAS → sobreamortiguado (1P 2024, ej. 3; la solución manuscrita del PDF usa mal $x_0=-10$ cm).
- `src/ejercicios-v3.html` tiene 20: la v2 más "Estacionaria: energía en dos instantes" (recuperatorio 18/10/25, ej. 1: $A=1$ cm; en $t'$ la cuerda está horizontal ⇒ $U'=0$).
- `Para imprimir/` tiene Ejercicios (18), (19) y (20), y Fórmulas, cada uno tipeado y con la letra del usuario. También tiene "Ejercicios (20) - letra Mara.pdf".
- **Letra de Mara (otra persona):**
  - Su plantilla escrita está en `salida/` ("fuente a mano mara pag 1.png", "segunda pagina mara.png", "pagina 3 mara fuente.png").
  - Fuente: `.venv/bin/python tools/fuente.py "salida/fuente a mano mara pag 1.png" "salida/segunda pagina mara.png" "salida/pagina 3 mara fuente.png" --nombre mara --descartar a1,b1,b2 --usar "I=|"`. En los cuadros de la I escribió una "i" con punto, y la a1, la b1 y la b2 salieron de otro tamaño.
  - Hoja: `node tools/build.mjs ejercicios-v3 --variantes=letra --fuente=mara`, que genera `salida/ejercicios-v3-letra-mara.pdf`.
  - La fuente del usuario no se toca: va en `build/fuente/` y la de Mara en `build/fuente-mara/`.
- El criterio es un catálogo de frecuencia de los 12 exámenes: estacionaria 7, reflexión total 6, lente + espejo 6, doble rendija 6, cambio de régimen 5, red 5.
- El usuario va a llevar al examen la hoja de **ejercicios**. Pidió resoluciones un poco más desarrolladas (planteo, fórmula, reemplazo, unidades), porque casi no hizo práctica, manteniendo los 18 ejercicios en 2 caras. Cada ejercicio empieza con un párrafo `.desc` que cuenta en palabras qué sistema plantea.
- `tools/prueba_relleno.py` rellena la plantilla con una letra del sistema (`build/plantilla-prueba.pdf`). Sirve para probar todo el circuito sin la plantilla real.

## Alcance del examen

- **Antes** (en 2023 y 2024) había dos parciales: el **1P** (oscilaciones, ondas, óptica geométrica) y el **2P** (interferencia, difracción, redes y termodinámica).
- **Ahora** (por lo menos desde 1C 2025) se toma un **parcial único** (“Examen intermedio”) con todos los temas de `Teoria/` **menos termodinámica**. Entonces entra todo lo de los 1P viejos y la parte de óptica física de los 2P viejos.
- **Fuera del parcial**: `Teoria/11_Temperatura-calor_2Q2024.pdf`, las secciones 24–28 de la guía (calorimetría → segundo principio), la parte de termodinámica de las hojas de fórmulas y los ejercicios 5–6 del `Final_2025_07_07.pdf`.

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
- `Parciales viejos/`:
  - **Parciales únicos (los más representativos):** parcial 1C 2025 (`2025_1C_P con solucion.pdf` y `WhatsApp ... (1).jpeg`), recuperatorio 7/6/2025 (`WhatsApp ....jpeg`), examen intermedio 18/10/2025 (`f2-emt-recu-2c-2025.pdf`), parcial 1C 2026 (`Parcial 1er cuatri 2026.jpeg`) y recuperatorio 30/5/2026 (`f2-emt-recu-1c-2026.pdf`).
  - **Formato viejo de dos parciales:**
    - `1P 2023 1C/2C`, `2P 2023 2C`, `1P 2024 1C/2C` y `2P 2024 1C`. Todos tienen soluciones manuscritas de alumnos.
    - Del 2P solo sirven los ejercicios de óptica física. En `2P 2023 2C`, los ejercicios 3–4 son de termodinámica.
  - `Física II – Cuadernillo de parciales resueltos.pdf`: resoluciones paso a paso del recuperatorio 1C 2025 y del parcial 1C 2025, más ejercicios extra de la guía. Cada resolución dice qué sección de la guía usa.
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
