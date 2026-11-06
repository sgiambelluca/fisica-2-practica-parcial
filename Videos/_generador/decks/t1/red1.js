// Red 1 · intermedio 18/10/2025, ej. 5: 800 rendijas/cm, a = 5 µm, haz de 7,5 cm; 450, 520 y 520,02 nm; pantalla de 65 cm a 1 m.
// Resultados verificados (soluciones/Red1.py): d = 12,5 µm, N = 6000, d/a = 2,5 ⇒ faltan m = 5, 10; resolución desde m = 6 (m ≥ 4,33);
// a) paraxial: 450 hasta m = 9 (y = 32,4 cm), 520 hasta m = 7 ⇒ 33 líneas (exacto con tg θ: 31, la 9ª de 450 cae en 34,25 cm);
// b) ojo: θmin = 1,586·10⁻⁴ rad (15,9 µm a 10 cm); Δy(m=7) = 11,2 µm ⇒ no se resuelven; haría falta m ≥ 9,9.
const { md, ul, card, callout, eqs, res, plot, table } = require('../../lib');
const { seccion } = require('../common');
const { kit, pantalla, DS_CSS } = require('../fx');

const SEC = 'Red 1 · Líneas y Rayleigh';
const B = 'b-red';
const K = kit(SEC, B);
const C450 = '#9b8cff', C520 = '#5fe08a';

// patrón de la red (N chico para que se vea) para 450 nm, en función de sen θ
const NV = 8;
const patron = s => { const g = Math.PI * s / 0.036, b = Math.PI * s / 0.09; const e = Math.abs(b) < 1e-9 ? 1 : (Math.sin(b) / b) ** 2; const sg = Math.sin(g); const r = Math.abs(sg) < 1e-9 ? 1 : (Math.sin(NV * g) / (NV * sg)) ** 2; return e * r; };
const envR = s => { const b = Math.PI * s / 0.09; return Math.abs(b) < 1e-9 ? 1 : (Math.sin(b) / b) ** 2; };

// líneas en la pantalla (paraxial: y = 100 m λ / d cm)
const lines = [];
for (const sg of [-1, 1]) for (let m = 1; m <= 9; m++) {
  if (m === 5) continue;
  lines.push({ y: sg * 3.6 * m, color: C450, cls: `r1-o${m} pending`, m: sg > 0 ? m : undefined });
  if (m <= 7) lines.push({ y: sg * 4.16 * m, color: C520, cls: `r1-o${m} pending`, pair: m >= 6 });
}
lines.push({ y: 0, color: '#ffffff', cls: 'r1-o0 pending', m: 0 });
const pant = pantalla({ id: 'r1-pant', half: 32.5, lines, ticks: [-32.5, -20, -10, 0, 10, 20, 32.5], h: 240 });

// dos discos de Airy (aprox. sinc²) separados δ, en unidades de θmin
const sinc2 = x => Math.abs(x) < 1e-9 ? 1 : (Math.sin(Math.PI * x) / (Math.PI * x)) ** 2;
const suma = d => x => sinc2(x - d / 2) + sinc2(x + d / 2);

module.exports = [
  seccion('Red 1', 'Líneas y Rayleigh', 'Examen intermedio del 18/10/2025 · ejercicio 5',
    'Ejercicio de redes número uno: examen intermedio del dieciocho de octubre de dos mil veinticinco, ejercicio cinco. Una red con tres colores, dos casi iguales: hay que contar las líneas en una pantalla y ver si un observador llega a separar los dos colores parecidos.'),

  Object.assign(K.enunciado('Red1.jpg', ['@1 800 rendijas/cm ⇒ $d=12{,}5\\ \\mu$m', '@1 $a=5\\ \\mu$m', '@1 haz de 7,5 cm', '@2 $\\lambda$: 450; 520; 520,02 nm', '@3 pantalla de 65 cm a $D=1$ m', '@4 ojo a 10 cm, pupila de 4 mm', '@4 paraxial'], [
    ['Este es el enunciado. Vamos con los datos.'],
    ['Una red de ochocientas rendijas por centímetro, cada una de cinco micrones de ancho, iluminada por un haz de siete coma cinco centímetros. Ochocientas por centímetro quiere decir que la separación es un centímetro dividido ochocientos: doce coma cinco micrones.'],
    ['La luz tiene tres longitudes de onda: cuatrocientos cincuenta, quinientos veinte, y quinientos veinte coma cero dos nanómetros. Las dos últimas son casi iguales.'],
    ['El espectro se ve en una pantalla de sesenta y cinco centímetros de ancho, a un metro de la red, centrada.'],
    ['El ítem a pide el número máximo de líneas. El b, si un observador a diez centímetros de la pantalla, con pupilas de cuatro milímetros, puede ver separadas las dos longitudes de onda parecidas. Y dice que vale la aproximación paraxial.'],
  ]), { css: DS_CSS + '.r1-bar{fill:#5a6f94}.r1-bar.r1-ok{fill:var(--accent2)}.r1-bar.r1-bad{fill:var(--bad);opacity:.45}' }),

  K.molde('Ejercicio 19 de la hoja: **red, ¿cuántas líneas se ven?** (1C 2025). El 20: **pantalla finita**. Y el 23: **Rayleigh con la pupila**.',
    ['$d$, $N$, órdenes que faltan ($m=p\\frac da$)', 'Resolución: $mN\\ge\\frac{\\lambda}{\\Delta\\lambda}$, redondeando $m$ hacia arriba', 'Total $=2\\cdot\\text{lado}+1$'],
    ['El límite lo pone la **pantalla**, no $\\sen\\theta<1$', 'b) combina la red con el **ojo**: $\\theta_{min}=1{,}22\\frac{\\lambda}{D_p}$'],
    [['El molde es el ejercicio diecinueve de la hoja: contar líneas con tres colores. Para el borde de la pantalla, el veinte. Y para el ojo, Rayleigh, del veintitrés.'],
     ['Se repite el procedimiento: d y N, los órdenes que faltan, desde qué orden se separan los colores parecidos, y el total como dos veces un lado más uno.'],
     ['Cambia que el límite lo pone la pantalla. Y en el b hay que combinar la red con el ojo: aunque la red separe dos líneas, el ojo tiene que llegar a verlas separadas.']]),

  K.S('Teoría', 'La red: máximos, órdenes que faltan y resolución', `<div style="display:grid;grid-template-columns:640px 1fr;gap:30px;align-items:center">
      ${eqs([
        { t: 'd\\sen\\theta=m\\lambda', s: 0, note: 'máximos principales' },
        { t: 'm=p\\,\\frac da', s: 2, note: 'faltan (cero de una rendija)' },
        { t: 'mN\\ge\\frac{\\lambda}{\\Delta\\lambda}', s: 3, note: 'se separan dos $\\lambda$ cercanas' },
        { t: 'y=D\\tg\\theta\\approx D\\,\\frac{m\\lambda}{d}', s: 4, note: 'paraxial' },
      ])}
      ${plot({ w: 1000, h: 500, x: [-0.01, 0.34], y: [0, 1.1], ticksX: [0, 0.09, 0.18, 0.27], ticksY: [0, 1], xl: 'sen θ', yl: 'I (450 nm)', id: 'r1-p', s: 1,
        curves: [{ f: patron, n: 4000, cls: 'c5', id: 'r1-pc' }, { f: envR, n: 800, cls: 'c3 dash', id: 'r1-pe' }],
        extra: (px, py) => [0, 1, 2, 3, 4, 6, 7, 8, 9].map(m => `<text class="lbl" x="${px(0.036 * m)}" y="${py(m === 0 ? 1.04 : patron(0.036 * m) + 0.07)}" style="text-anchor:middle;font-size:22px">${m}</text>`).join('') +
          `<text class="lbl c4" x="${px(0.18)}" y="${py(0.12)}" style="text-anchor:middle">5: falta</text>` })}</div>`, [
    ['Repasemos la red. Hay un máximo principal donde los rayos de todas las rendijas llegan en fase: d seno de theta igual a m lambda.'],
    ['Cada rendija, además, difracta: la línea punteada es su campana. Los máximos de la red quedan dentro de esa campana.', `sweep('#r1-p #r1-pc',{dur:2400}); sweep('#r1-p #r1-pe',{delay:1500,dur:1600})`],
    ['Si un máximo cae justo en un cero de la campana, ese orden falta. Pasa cuando m es p por d sobre a. Acá d sobre a es dos coma cinco, así que falta el orden cinco, y el diez.'],
    ['Para separar dos longitudes de onda cercanas, m por N tiene que ser al menos lambda sobre delta lambda. N es la cantidad de rendijas iluminadas.'],
    ['Y la posición en la pantalla es D tangente de theta; con la aproximación paraxial, D por m lambda sobre d. [A] ¿Por qué falta el orden cinco para los tres colores? [P] Porque la condición no depende de lambda: depende solo de d sobre a.'],
  ]),

  K.S('a) Pasos 1 a 3', 'Cuántas rendijas y hasta qué orden', `<div class="grid g2" style="align-items:center">
      ${eqs([
        { t: 'N=\\frac Wd=7{,}5\\cdot800=6000', s: 0 },
        { t: '\\frac da=\\frac{12{,}5}{5}=2{,}5\\ \\Rightarrow\\ \\text{faltan }m=5,\\,10', s: 1 },
        { t: '\\tg\\theta_{max}=\\frac{32{,}5}{100}=0{,}325', s: 2 },
      ])}
      ${table([
        ['$\\lambda$', '$\\lambda/d$', 'paraxial', 'exacto'],
        { cells: ['450 nm', '0,0360', '$9{,}03\\to9$', '$8{,}59\\to8$'], s: 3 },
        { cells: ['520 nm', '0,0416', '$7{,}81\\to7$', '$7{,}43\\to7$'], s: 3 },
      ], { style: 'font-size:1em;width:100%', cap: '$m_{max}=\\frac{\\sen\\theta_{max}}{\\lambda/d}$' })}</div>`, [
    ['Paso uno: las rendijas iluminadas. El haz mide siete coma cinco centímetros y hay ochocientas por centímetro: seis mil rendijas.'],
    ['Paso dos: d sobre a es dos coma cinco. Faltan los órdenes cinco y diez.'],
    ['Paso tres: el borde de la pantalla. Llega a treinta y dos coma cinco centímetros del centro, a un metro: la tangente del ángulo máximo es cero coma tres dos cinco.'],
    ['Dividimos por lambda sobre d. Con la aproximación paraxial, el seno es cero coma tres dos cinco, y cuatrocientos cincuenta llega hasta el orden nueve; quinientos veinte, hasta el siete. Sin aproximar, el seno es cero coma tres cero nueve, y cuatrocientos cincuenta llega solo hasta el ocho. [A] ¿Cuál uso? [P] Ahora lo vemos, porque justo ahí cambia el resultado.'],
  ]),

  K.S('a) Paso 4', '¿Desde qué orden se separan 520 y 520,02 nm?', `<div style="display:grid;grid-template-columns:720px 1fr;gap:30px;align-items:center">
      ${eqs([
        { t: '\\frac{\\lambda}{\\Delta\\lambda}=\\frac{520}{0{,}02}=26\\,000', s: 0 },
        { t: 'm\\ge\\frac{26\\,000}{6000}=4{,}33\\ \\Rightarrow\\ m=5', s: 1 },
        { t: 'm=5\\ \\text{falta}\\ \\Rightarrow\\ \\text{desde }m=6', s: 2, cls: 'hl' },
      ])}
      <svg class="ds-svg" viewBox="0 0 900 470" style="width:880px">
        ${[1, 2, 3, 4, 5, 6, 7].map(m => { const hh = m * 6000 / 42000 * 380, x = 60 + (m - 1) * 115; return `<rect class="r1-bar${m === 5 ? ' r1-bad' : m >= 6 ? ' r1-ok' : ''}" x="${x}" y="${420 - hh}" width="80" height="${hh}" rx="8"/><text x="${x + 40}" y="455" text-anchor="middle" style="fill:var(--muted);font-size:26px;font-weight:700">m=${m}</text>`; }).join('')}
        <line x1="40" y1="${420 - 26000 / 42000 * 380}" x2="880" y2="${420 - 26000 / 42000 * 380}" style="stroke:var(--warn);stroke-width:4;stroke-dasharray:12 8"/>
        <text x="880" y="${420 - 26000 / 42000 * 380 - 14}" text-anchor="end" style="fill:var(--warn);font-size:26px;font-weight:700">λ/Δλ = 26 000</text>
        <text id="r1-x5" class="pending" x="${60 + 4 * 115 + 40}" y="${420 - 30000 / 42000 * 380 - 20}" text-anchor="middle" style="fill:var(--bad);font-size:44px;font-weight:800">✗</text>
        <text x="60" y="30" style="fill:var(--muted);font-size:24px">m · N</text>
      </svg></div>`, [
    ['Paso cuatro: la resolución. Lambda sobre delta lambda es quinientos veinte sobre cero coma cero dos: veintiséis mil.', `grow('.r1-bar',{stagger:150})`],
    ['Con seis mil rendijas, m tiene que ser al menos veintiséis mil sobre seis mil: cuatro coma treinta y tres. Redondeando para arriba, cinco.'],
    ['Pero el orden cinco falta. Así que los dos verdes se ven separados recién desde el orden seis: en el seis y en el siete. En los órdenes uno a cuatro forman una sola línea. [A] ¿Y por qué se redondea para arriba? [P] Porque con cuatro, m por N da veinticuatro mil, que no alcanza.', `show('#r1-x5',{from:'pop'})`],
  ]),

  K.S('a) Conteo', 'Las líneas en la pantalla', `<div style="display:flex;flex-direction:column;gap:26px;align-items:center">${pant}
      <div class="grid g2" style="width:100%;align-items:center">${table([
        ['$m$', '1–4', '5', '6–7', '8–9'],
        { cells: ['líneas', '2 c/u', '0', '3 c/u', '1 c/u'], s: 4 },
      ], { style: 'font-size:.95em' })}${res('Un lado: 16 ⇒ total $2\\cdot16+1=33$ líneas', { s: 5 })}</div></div>`, [
    ['Ahora dibujemos la pantalla, con la aproximación paraxial. En el centro, el orden cero: los tres colores juntos, una sola línea.', `show('.r1-o0',{from:'fade'})`],
    ['Órdenes uno a cuatro: una línea violeta de cuatrocientos cincuenta, y una verde, donde los dos verdes todavía están juntos. Dos líneas por orden y por lado.', `show('.r1-o1',{from:'fade'}); show('.r1-o2',{delay:700,from:'fade'}); show('.r1-o3',{delay:1400,from:'fade'}); show('.r1-o4',{delay:2100,from:'fade'})`],
    ['El orden cinco no aparece. En el seis y el siete, los verdes se separan: tres líneas por orden.', `show('.r1-o6',{from:'fade'}); show('.r1-o7',{delay:900,from:'fade'})`],
    ['Y en el ocho y el nueve ya solo entra el violeta: el verde del orden ocho caería a treinta y tres centímetros, fuera de la pantalla. El nueve violeta cae a treinta y dos coma cuatro: entra por un milímetro.', `show('.r1-o8',{from:'fade'}); show('.r1-o9',{delay:900,from:'fade'})`],
    ['Contando un lado: dos por cuatro órdenes, ocho; tres por dos órdenes, seis; y dos más del ocho y el nueve. Dieciséis.'],
    ['Total: dos por dieciséis, más el orden cero: treinta y tres líneas. [A] ¿Y los dos verdes del orden seis cuentan como dos? [P] Sí, porque la red los separa. Si no los separara, serían una.'],
  ]),

  K.S('a) Ambigüedad', '¿Paraxial o exacto? Justo en el borde', `<div style="display:grid;grid-template-columns:1fr 600px;gap:30px;align-items:center">
      <svg class="ds-svg" viewBox="0 0 1060 360" style="width:1040px">
        <line x1="30" y1="200" x2="1040" y2="200" style="stroke:#4a6286;stroke-width:3"/>
        ${[28, 29, 30, 31, 32, 33, 34, 35, 36].map(c => `<line x1="${30 + (c - 28) * 125}" y1="194" x2="${30 + (c - 28) * 125}" y2="206" style="stroke:#4a6286;stroke-width:2"/><text x="${30 + (c - 28) * 125}" y="236" text-anchor="middle" style="fill:var(--dim);font-size:22px;font-family:Consolas">${c}</text>`).join('')}
        <rect x="30" y="80" width="${(32.5 - 28) * 125}" height="110" style="fill:rgba(255,255,255,.05)"/>
        <line x1="${30 + 4.5 * 125}" y1="50" x2="${30 + 4.5 * 125}" y2="210" style="stroke:var(--bad);stroke-width:5"/>
        <text x="${30 + 4.5 * 125}" y="40" text-anchor="middle" style="fill:var(--bad);font-size:26px;font-weight:700">borde: 32,5 cm</text>
        <g id="r1-l9"><rect x="${30 + 4.4 * 125 - 4}" y="90" width="8" height="100" style="fill:${C450}"/></g>
        <text x="${30 + 4.4 * 125 - 14}" y="290" text-anchor="end" style="fill:${C450};font-size:26px;font-weight:700">9º de 450: paraxial 32,4 cm</text>
        <text id="r1-l9t" class="pending" x="${30 + 6.25 * 125}" y="330" text-anchor="middle" style="fill:${C450};font-size:26px;font-weight:700">exacto: 34,25 cm (afuera)</text>
        <rect x="${30 + 5.28 * 125 - 4}" y="90" width="8" height="100" style="fill:${C520};opacity:.5"/>
        <text x="${30 + 5.28 * 125}" y="76" text-anchor="middle" style="fill:${C520};font-size:22px">8º de 520: 33,3</text>
      </svg>
      <div>${callout('Paraxial (lo que dice el enunciado): **33 líneas**. Exacto con $\\tg\\theta$: **31**.', { s: 1 })}
      ${callout('La pantalla de 65 cm cae justo entre 64,8 y 66,6 cm: el ejercicio está armado con la paraxial. **Escribir 33** y aclarar el 31.', { s: 2, cls: 'ok', style: 'margin-top:22px' })}</div></div>`, [
    ['Ahora, la sutileza. El noveno orden de cuatrocientos cincuenta, con la aproximación paraxial, cae a treinta y dos coma cuatro centímetros, a un milímetro del borde.'],
    ['Pero si calculás exacto, con la tangente, ese ángulo es de casi diecinueve grados y la línea cae a treinta y cuatro coma dos cinco: afuera. Con el cálculo exacto quedan treinta y una líneas.', `along('#r1-l9', [[0,0],[231,0]], {dur:2200, easing:'ease-in-out'}); show('#r1-l9t',{delay:2000})`],
    ['¿Cuál pide la cátedra? El enunciado dice que vale la paraxial, y la pantalla de sesenta y cinco centímetros cae justo entre el nueve violeta y el ocho verde, calculados así. Está armado para la paraxial. [A] ¿Entonces pongo treinta y tres? [P] Sí, y aclarás en una línea que sin aproximar serían treinta y una.'],
  ]),

  K.S('b) El ojo', 'Rayleigh: ¿cuánto tienen que separarse?', `<div style="display:grid;grid-template-columns:680px 1fr;gap:30px;align-items:center">
      ${eqs([
        { t: '\\theta_{min}=1{,}22\\,\\frac{\\lambda}{D_p}=1{,}22\\cdot\\frac{520\\cdot10^{-9}}{4\\cdot10^{-3}}', s: 0 },
        { t: '\\theta_{min}=1{,}586\\cdot10^{-4}\\ \\text{rad}', s: 0, cls: 'ok' },
        { t: 's_{min}=L\\,\\theta_{min}=0{,}10\\cdot1{,}586\\cdot10^{-4}=15{,}9\\ \\mu\\text{m}', s: 1, cls: 'hl' },
      ])}
      ${plot({ w: 980, h: 500, x: [-2.2, 2.2], y: [0, 2.1], ticksX: [-1, 0, 1], ticksY: [0, 1, 2], xl: 'ángulo / θmin', yl: 'I en la retina', id: 'r1-a', s: 2,
        curves: [{ f: suma(1), cls: 'c3', id: 'r1-a1' }, { f: suma(0.706), cls: 'c2', id: 'r1-a2' }],
        extra: (px, py) => `<text class="lbl c3" x="${px(-2.1)}" y="${py(1.75)}">justo θmin: se ve el valle</text><text class="lbl c2" x="${px(-2.1)}" y="${py(1.95)}">orden 7: un solo pico</text>` })}</div>`, [
    ['Ítem b. El ojo es una abertura circular, así que difracta: cada punto de luz se ve como un pequeño disco. Dos puntos se separan si su ángulo es al menos uno coma veintidós lambda sobre el diámetro de la pupila. Da uno coma cinco ocho seis por diez a la menos cuatro radianes.'],
    ['Desde diez centímetros, ese ángulo corresponde a una separación en la pantalla de quince coma nueve micrones.'],
    ['En el gráfico, la curva amarilla son dos fuentes separadas justo ese ángulo: entre los dos picos hay un valle, y se distinguen. La verde, las dos líneas del orden siete: se funden en un solo pico.', `sweep('#r1-a #r1-a1',{dur:1800}); sweep('#r1-a #r1-a2',{delay:1600,dur:1800})`],
  ]),

  K.S('b) El ojo', '¿En algún orden llegan a separarse?', `<div class="grid g2" style="align-items:center">${eqs([
      { t: '\\Delta y=D\\,\\frac{m\\,\\Delta\\lambda}{d}', s: 0 },
      { t: 'm=6:\\ \\Delta y=\\frac{6\\cdot2\\cdot10^{-11}}{1{,}25\\cdot10^{-5}}=9{,}6\\ \\mu\\text{m}', s: 1 },
      { t: 'm=7:\\ \\Delta y=11{,}2\\ \\mu\\text{m}<15{,}9\\ \\mu\\text{m}', s: 1, cls: 'hl' },
      { t: 'm\\ge\\frac{1{,}22\\,\\lambda\\,d\\,L}{D_p\\,D\\,\\Delta\\lambda}=9{,}9\\ \\Rightarrow\\ m=10', s: 2 },
    ])}<div>${res('No, en ningún orden', { s: 3 })}${callout('$m=10$ **falta** y además cae fuera de la pantalla. El observador ve $33-4=29$ líneas.', { s: 3, cls: 'warn', style: 'margin-top:24px' })}</div></div>`, [
    ['Ahora, cuánto se separan las dos líneas verdes en la pantalla. Con la paraxial, delta y es D por m delta lambda sobre d.'],
    ['En el orden seis, nueve coma seis micrones; en el siete, once coma dos. Los dos, menos que los quince coma nueve que necesita el ojo.'],
    ['¿Qué orden haría falta? Igualando, m tiene que ser al menos nueve coma nueve: el orden diez.'],
    ['Pero el diez falta, y además caería fuera de la pantalla. Así que no: el observador no las ve separadas en ningún orden. [A] ¿Pero la red sí las separaba? [P] Sí: la red las separa, pero quedan a diez micrones, y el ojo desde diez centímetros no llega. Para el observador, cada par se ve como una línea.'],
  ]),

  K.trampas([
    '**$d$ desde 800/cm:** $d=\\frac{10^4}{800}\\ \\mu$m $=12{,}5\\ \\mu$m; $N=7{,}5\\cdot800=6000$.',
    '**El orden 5 falta:** es justo el primero que pasaba la resolución ⇒ se separan desde el 6.',
    '**El borde lo pone la pantalla**, no $\\sen\\theta<1$ (eso daría hasta $m=27$).',
    '**No mezclar:** o $y=D\\frac{m\\lambda}d$ (paraxial) o $y=D\\tg\\theta$ (exacto).',
    '**b) es el ojo**, no la red: $\\Delta y/L$ contra $1{,}22\\lambda/D_p$.',
  ], [
    ['Las trampas. Primera: pasar bien d. Ochocientas por centímetro son doce coma cinco micrones.'],
    ['Segunda: el orden cinco falta, justo el primero que pasaba la condición de resolución.'],
    ['Tercera: el límite lo pone la pantalla. Con seno menor que uno contarías hasta el orden veintisiete.'],
    ['Cuarta: no mezclar la paraxial con el cálculo exacto.'],
    ['Y quinta: en el b decide el ojo. La red separa, pero el ojo tiene que ver esa separación.'],
  ]),

  K.receta([
    '**1.** $d=1/K$, $N=W/d$, faltan $m=p\\frac da$.',
    '**2.** Borde: $\\tg\\theta_{max}=\\frac{y_{max}}D$ ⇒ $m_{max}$ de cada $\\lambda$.',
    '**3.** Resolución: $m\\ge\\frac{\\lambda}{N\\Delta\\lambda}$, arriba, saltando faltantes.',
    '**4.** Tabla por orden; total $2\\cdot\\text{lado}+1$.',
    '**5.** Ojo: $\\frac{\\Delta y}{L}\\ge1{,}22\\frac{\\lambda}{D_p}$.',
  ], ['$d=12{,}5\\ \\mu$m; $N=6000$; faltan 5 y 10', 'Se separan desde $m=6$', 'a) **33 líneas** (paraxial); 31 sin aproximar', 'b) $\\theta_{min}=1{,}59\\cdot10^{-4}$ rad; $\\Delta y_7=11{,}2\\ \\mu$m < 15,9 µm: **no**'], [
    ['La receta. Uno: d, N y los órdenes que faltan.'],
    ['Dos: el borde de la pantalla da el orden máximo de cada color.'],
    ['Tres: desde qué orden se separan los colores parecidos.'],
    ['Cuatro: la tabla por orden y el total.'],
    ['Cinco: para el ojo, Rayleigh con la separación en la pantalla.'],
    ['Resultados: treinta y tres líneas con la paraxial, y el observador no separa los dos verdes en ningún orden.'],
  ]),
];
