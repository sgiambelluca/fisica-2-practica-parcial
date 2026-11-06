// Red 5 · 2P 26/6/2023, ej. 2: 100 rendijas/mm, a = d/4, haz de 6 mm, λ1 = 450 nm y λ2 ≈ λ1 (menor); detector de 40 cm a 1 m, corrido 10 cm: 10 líneas.
// Resultados verificados (soluciones/Red5.py): d = 10 µm, d/a = 4 (faltan 4, 8), N = 600; lado +30 cm: m ≤ 6; lado −10 cm: m ≤ 2;
// sin resolver: 1 + 5 + 2 = 8 líneas ⇒ resueltos +5 y +6, no el +3: 0,15 nm ≤ Δλ < 0,25 nm ⇒ 449,75 nm < λ2 ≤ 449,85 nm.
const { md, ul, card, callout, eqs, res, table } = require('../../lib');
const { seccion } = require('../common');
const { kit, pantalla } = require('../fx');

const SEC = 'Red 5 · Detector corrido: rango de λ₂';
const B = 'b-red';
const K = kit(SEC, B);
const ys = { 1: 4.5, 2: 9.04, 3: 13.62, 5: 23.09, 6: 28.04, 7: 33.19 };
const lines = [{ y: 0, color: '#fff', cls: 'r5-c pending', m: 0 }];
for (const [m, y] of Object.entries(ys)) { lines.push({ y, color: '#9b8cff', m: +m, cls: `r5-l pending${+m === 7 ? ' r5-out' : ''}`, pair: +m >= 5 && +m <= 6 }); if (+m <= 3) lines.push({ y: -y, color: '#9b8cff', m: -m, cls: `r5-l pending${+m === 3 ? ' r5-out' : ''}` }); }
const pant = pantalla({ id: 'r5-p', half: 35, lines, ticks: [-30, -10, 0, 10, 20, 30], h: 240,
  extra: X => `<rect x="${X(-10)}" y="22" width="${X(30) - X(-10)}" height="160" rx="8" style="fill:rgba(255,163,77,.08);stroke:var(--red);stroke-width:4"/>
    <text x="${X(10)}" y="16" text-anchor="middle" style="fill:var(--red);font-size:24px;font-weight:700">detector corrido: de −10 a +30 cm</text>
    <rect x="${X(-30)}" y="186" width="${X(10) - X(-30)}" height="8" rx="4" style="fill:rgba(255,255,255,.18)"/><text x="${X(-30)}" y="214" style="fill:var(--dim);font-size:18px">antes: de −20 a +20</text>` });

module.exports = [
  seccion('Red 5', 'Detector corrido: rango de λ₂', 'Segundo parcial del 26/6/2023 · ejercicio 2',
    'Ejercicio de redes número cinco: segundo parcial del veintiséis de junio de dos mil veintitrés, ejercicio dos. Un detector se golpea y queda corrido; con la cantidad de líneas que registra hay que acotar una longitud de onda desconocida.'),

  Object.assign(K.enunciado('Red5.jpg', ['@1 100 rendijas/mm ⇒ $d=10\\ \\mu$m; $a=d/4$', '@1 haz de 6 mm', '@2 $\\lambda_1=450$ nm; $\\lambda_2<\\lambda_1$, muy cercana', '@3 detector de 40 cm a 1 m, **corrido 10 cm**', '@3 registra **10 líneas**: ¿rango de $\\lambda_2$?'], [
    ['Este es el enunciado. Vamos con los datos.'],
    ['Una red de cien rendijas por milímetro, con rendijas de un cuarto de la separación, iluminada por un haz de seis milímetros.'],
    ['Dos longitudes de onda: cuatrocientos cincuenta nanómetros y otra un poco menor, muy cercana.'],
    ['El detector mide cuarenta centímetros, a un metro, pero un golpe lo corrió diez centímetros. Ahora registra diez líneas espectrales. Piden el rango posible de lambda dos.'],
  ], { maxH: 430 }), { css: '.r5-out{opacity:.35}' }),

  K.molde('Ejercicio 21 de la hoja: **red con detector roto, luego corrido** (2C 2026). Y el 20: **λ cercana, ¿se resuelve?**',
    ['$y=D\\tg\\theta$; un límite distinto a cada lado', 'Órdenes que faltan: $d/a=4$', 'Resolución: $mN\\ge\\lambda/\\Delta\\lambda$'],
    ['Se conoce el **número de líneas** y se busca $\\Delta\\lambda$', 'La respuesta es un **rango**: unos órdenes resueltos y otros no'],
    [['El molde es el ejercicio veintiuno de la hoja: el detector corrido. Y el veinte, para la resolución de dos colores cercanos.'],
     ['Se repite contar cada lado por separado, los órdenes que faltan y la condición de resolución.'],
     ['Cambia que se conoce el número de líneas y se busca la diferencia de longitudes de onda: la respuesta es un rango.']]),

  K.S('Pasos 1 a 3', 'La red y hasta qué orden entra cada lado', `<div class="grid g2" style="align-items:center">${eqs([
      { t: 'd=10\\ \\mu\\text{m},\\ \\ \\frac da=4\\ \\Rightarrow\\ \\text{faltan }4,\\,8', s: 0 },
      { t: 'N=\\frac{6\\ \\text{mm}}{10\\ \\mu\\text{m}}=600', s: 0 },
      { t: '\\text{lado }+\\ (30\\ \\text{cm}):\\ \\sen\\theta_{max}=0{,}287\\ \\Rightarrow\\ m\\le6{,}39', s: 1 },
      { t: '\\text{lado }-\\ (10\\ \\text{cm}):\\ \\sen\\theta_{max}=0{,}0995\\ \\Rightarrow\\ m\\le2{,}21', s: 2 },
    ])}${table([['$m$', '1', '2', '3', '4', '5', '6', '7'], { cells: ['$y$ (cm)', '4,50', '9,04', '13,62', 'falta', '23,09', '28,04', '33,19'], s: 1 }], { style: 'font-size:.9em' })}</div>`, [
    ['Paso uno: d es diez micrones; d sobre a, cuatro, así que faltan los órdenes cuatro y ocho; y N, seis milímetros sobre diez micrones, seiscientas rendijas.'],
    ['Paso dos: del lado que llega a treinta centímetros, el seno máximo es cero coma dos ocho siete. Con lambda sobre d igual a cero coma cero cuatro cinco, m llega hasta seis.'],
    ['Del otro lado, que llega solo a diez centímetros, m llega hasta dos. [A] ¿Y lambda dos? [P] Es casi igual: sus líneas caen en los mismos órdenes, un poquito más cerca del centro.'],
  ]),

  K.S('Conteo', 'Las líneas en el detector corrido', `<div style="display:flex;flex-direction:column;gap:20px;align-items:center">${pant}
      <div class="grid g2" style="width:100%;align-items:center">${eqs([
        { t: '1+5+2=8\\ \\text{líneas si no se resuelve ninguno}', s: 1 },
        { t: '10-8=2\\ \\Rightarrow\\ \\text{dos órdenes desdoblados: }+5,\\ +6', s: 2 },
      ])}${callout('La resolución **mejora con $m$**: se desdoblan los de afuera.', { s: 2, cls: 'ok' })}</div></div>`, [
    ['Dibujemos el detector corrido: de menos diez a más treinta centímetros. Del lado largo entran los órdenes uno, dos, tres, cinco y seis; el cuatro falta. Del lado corto, el uno y el dos.', `show('.r5-c'); show('.r5-l',{stagger:200,from:'fade'})`],
    ['Si ningún orden separara los dos colores, serían ocho líneas: la central, cinco de un lado y dos del otro.'],
    ['Pero registra diez: faltan dos. Entonces exactamente dos órdenes se ven desdoblados. Como la resolución crece con m, son los de afuera: el cinco y el seis. [A] ¿Y por qué no el tres? [P] Si se resolviera el tres, también el cinco y el seis: serían once.'],
  ]),

  K.S('Rango', 'Resuelve el 5, pero no el 3', `<div class="grid g2" style="align-items:center">${eqs([
      { t: '5N\\ge\\frac{\\lambda}{\\Delta\\lambda}\\ \\Rightarrow\\ \\Delta\\lambda\\ge\\frac{450}{3000}=0{,}15\\ \\text{nm}', s: 0 },
      { t: '3N<\\frac{\\lambda}{\\Delta\\lambda}\\ \\Rightarrow\\ \\Delta\\lambda<\\frac{450}{1800}=0{,}25\\ \\text{nm}', s: 1 },
      { t: '0{,}15\\le450-\\lambda_2<0{,}25', s: 2 },
    ])}<div>${res('$449{,}75\\ \\text{nm}<\\lambda_2\\le449{,}85\\ \\text{nm}$', { s: 2 })}
      ${table([['$\\Delta\\lambda$ (nm)', 'líneas'], ['< 0,125', '8'], ['0,125–0,15', '9'], { cells: ['**0,15–0,25**', '**10**'], cls: 'hl' }, ['0,25–0,375', '11']], { s: 3, style: 'margin-top:20px;font-size:.85em' })}</div></div>`, [
    ['La condición para que el cinco se resuelva: cinco N mayor o igual que lambda sobre delta lambda. Delta lambda tiene que ser al menos cuatrocientos cincuenta sobre tres mil: cero coma quince nanómetros. Si el cinco se resuelve, el seis también.'],
    ['Y para que el tres no se resuelva: tres N menor que lambda sobre delta lambda. Delta lambda menor que cero coma veinticinco.'],
    ['Con delta lambda igual a cuatrocientos cincuenta menos lambda dos: lambda dos mayor que cuatrocientos cuarenta y nueve coma setenta y cinco, y menor o igual que cuatrocientos cuarenta y nueve coma ochenta y cinco nanómetros.'],
    ['La tabla lo confirma: contando las líneas para cada delta lambda, las diez aparecen solo entre cero coma quince y cero coma veinticinco. [A] ¿Y el borde, entra o no? [P] Justo en el límite de Rayleigh se toma como resuelto: por eso el ochenta y cinco entra y el setenta y cinco no.'],
  ]),

  K.trampas([
    '**El detector corrido no es simétrico:** hasta $m=6$ de un lado y $m=2$ del otro.',
    '**Falta el orden 4** (caería en 18,3 cm, adentro).',
    '**La central es una línea** (no dos), y cuenta.',
    '**$N$ = ancho del haz / $d$** = 600.',
    '**Se desdoblan los órdenes altos:** el límite superior sale de $m=5$, no de $m=6$.',
  ], [
    ['Las trampas. Primera: el detector corrido tiene límites distintos a cada lado.'],
    ['Segunda: el orden cuatro falta.'],
    ['Tercera: la central es una sola línea, y se cuenta.'],
    ['Cuarta: N sale del ancho del haz.'],
    ['Y quinta: los órdenes altos resuelven mejor. El límite sale del cinco, no del seis.'],
  ]),

  K.receta([
    '**1.** $d$, $d/a$, $N$.',
    '**2.** $m_{max}$ de cada lado con su borde.',
    '**3.** Líneas sin resolver ⇒ cuántos órdenes tienen que desdoblarse.',
    '**4.** El último resuelto y el primero sin resolver ⇒ rango de $\\Delta\\lambda$.',
  ], ['$d=10\\ \\mu$m; $N=600$; faltan 4 y 8', 'Lado +: $m\\le6$; lado −: $m\\le2$; 8 sin resolver', 'Resueltos +5 y +6, no el +3', '**$449{,}75<\\lambda_2\\le449{,}85$ nm**'], [
    ['La receta. Uno: d, d sobre a y N.'],
    ['Dos: el orden máximo de cada lado.'],
    ['Tres: cuántas líneas habría sin resolver, y cuántos órdenes tienen que desdoblarse.'],
    ['Cuatro: el último orden resuelto y el primero que no, dan el rango.'],
    ['Resultado: lambda dos entre cuatrocientos cuarenta y nueve coma setenta y cinco y cuatrocientos cuarenta y nueve coma ochenta y cinco nanómetros.'],
  ]),
];
