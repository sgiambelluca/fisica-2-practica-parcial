# Generador de videos de Física II

Arma los videos "Ejercicios práctica parcial - Tanda N" a partir de decks en JavaScript: diapositivas HTML animadas, voz neural y subtítulos. Está basado en el generador de Protocolos (`E:\Facultad\2Q 2026\protos teoria\_generador`), con estos agregados:

- fórmulas con KaTeX;
- dos voces;
- animaciones de física.

## Comandos (desde esta carpeta)

```bash
node make.js tanda1 preview          # captura el estado final de cada diapositiva en out/tanda1/preview (rápido, sin audio)
STEPS=1 ONLY=5,6 node make.js tanda1 preview   # además, una captura por paso, solo esas diapositivas
node make.js tanda1                  # TTS + render + video + PDF  ->  ../<file>.mp4, .srt y "- Diapositivas.pdf"
python -I assets.py                  # (desde la raíz del repo) regenera assets/<Código>.jpg con los enunciados recortados
```

Necesita lo siguiente:

- **Node:** `node_modules` copiado del generador de Protocolos (`msedge-tts` y `puppeteer-core`).
- **Chrome.**
- **FFmpeg** de winget.
- **Internet** para la voz, que es el TTS de Microsoft Edge.

El audio de cada oración se guarda en `cache/`, así que volver a generar un video solo sintetiza lo que cambió.

## Estructura de un deck

`decks/tandaN.js` exporta lo siguiente:

```js
{ title, file, footer, slides: [portada(N, [...], steps), ...require('./tN/ond1'), ...] }
```

Cada ejercicio va en su propio archivo (`decks/tN/<código>.js`), que exporta un array de diapositivas: primero `seccion(...)` y después las normales.

```js
{ sec: 'Ond 1 · a) Modelo', title: '¿Qué modelo…?', cls: 'b-ond', chapter: 'Ond 1 · Propagante → estacionaria',
  css: '...', html: '...', steps: [[narración, códigoJS], ...] }
```

- `cls` da el color del bloque: `b-osc`, `b-ond`, `b-geo`, `b-fis` (doble rendija) o `b-red`.
- `chapter` tiene que ser igual en todas las diapositivas de un ejercicio: así queda un capítulo por ejercicio.
- **Área útil de `main`:** 1728 × 734 px. `preview` avisa si algo se desborda.
- **Aparición por pasos:** un elemento con `data-s="n"` (o `s: n` en los helpers) aparece en el paso `n`.
- **Código de cada paso:** corre al empezar el paso (`show`, `hl`, `draw`, `sweep`, `standing`, `animFn`, etc.).
- **Duración de la narración:** `talk()` devuelve los ms que dura la narración del paso. Sirve para que una animación dure lo mismo que lo que se dice.

## Narración

- Es texto hablado, no fórmulas.
  - Escribí los números y las unidades como se dicen: "cuatrocientos metros por segundo", "cero coma quince metros", "diez pi por metro".
  - Las letras griegas van con su nombre: lambda, omega, mu, fi.
- Por defecto habla la **profe**. `[A]` pasa a la voz del **alumno** y `[P]` vuelve a la profe. La pregunta del alumno aparece en pantalla en un globo.
- Una o dos preguntas del alumno por diapositiva, como mucho. Tienen que ser las dudas reales de alguien que está aprendiendo, por ejemplo:
  - "¿por qué el aumento es negativo?";
  - "¿de dónde sale esa fórmula?";
  - "¿hace falta pasar a kilos?".
- Usá oraciones cortas, en rioplatense (voseo) y sin muletillas. `make.js` sintetiza cada oración por separado y les cambia apenas el tono, la velocidad y las pausas, para que no suene monótono.
- **Duración:** cada ejercicio, entre 7 y 10 minutos; unas 140 palabras por minuto.

## Contenido de cada ejercicio (orden sugerido)

1. `seccion(código, título, fuente, presentación)`.
2. **Enunciado:** `img('<Código>.jpg')` con los datos como fichas (`datos([...])`), que aparecen a medida que se leen.
3. **Molde en la hoja:** qué ejercicio de la hoja v6 sirve de modelo, qué se repite y qué cambia.
4. **Teoría necesaria, con una animación:**
   - onda: `cuerda` + `standing`, o `animFn`;
   - curvas: `plot` + `sweep`;
   - rayos: `draw` sobre paths;
   - etc.
5. **Cada ítem:** planteo → fórmula → reemplazo → resultado (`eqs`, `res`), explicando por qué se hace cada paso.
6. **Dónde es fácil equivocarse:** las trampas.
7. **Receta y resultados.**

Todos los números se verifican con Python antes de escribir el deck. Dejá los resultados verificados en el comentario de la primera línea del archivo.

## Helpers

`lib.js` (generan HTML):

- `md(texto)`: `$…$`, `$$…$$`, `**negrita**`, `==resaltado==` y `{c1|color}`.
- `ul([...'@2 texto'])`, `card(t, body, o)`, `callout(t, o)` y `table(rows, o)`.
- `eqs([{t: 'LaTeX', s, note, cls: 'ok'|'hl'|'bad', id}], {title})`: pizarra de cuentas.
- `res(t)`: resultado destacado.
- `datos([...])`: fichas de datos.
- `img('Ond1.jpg', {style})`: enunciado.
- `molde(t)`: caja "Molde en la hoja".
- `plot({w,h,x:[a,b],y:[c,d],ticksX,ticksY,xl,yl,curves:[{f,from,to,area,cls,id,n}],extra:(px,py)=>svg})`.
- `cuerda({id,L,n,model:'ff'|'ll'|'fl',ticks,A,extra,sNodes})`: cuerda con soportes y nodos.

`runtime.js` (animan dentro de la página):

- **Aparecer, ocultar y resaltar:** `show`, `hide`, `hl`, `flash` y `pulse`.
- **Trazos y revelado:** `draw(sel)` dibuja trazos SVG; `sweep(sel)` revela de izquierda a derecha; `grow(sel)` hace crecer barras.
- **Ondas en la cuerda:** `standing('#id', {dur, per, phase, end: 'max'|'flat'})` hace vibrar una cuerda; `snapshot('#id', c)` la deja quieta en `cos(ωt+φ) = c`.
- **Curvas y movimiento:** `animFn('#path', {x0,x1,y,L}, (x,t) => despl_px, {dur})` anima cualquier curva y(x,t); `along(sel, puntos, {dur})` mueve un elemento por un camino.
