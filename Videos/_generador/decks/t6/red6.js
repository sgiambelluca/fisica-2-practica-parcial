// Red 6 · recuperatorio 2P 29/6/2022, ej. 2: 595,05 y 594,95 nm, incidencia 12°, 400/cm, a = 6,25 µm, 1,25 cm iluminados; pantalla de 1,2 m a 2 m.
// Resultados verificados (soluciones/Red6.py): d = 25 µm, d/a = 4, N = 500, λ/d = 0,0238; sen θmax = 0,2873; orden 0 en y = 42,5 cm;
// entran m = −20 … +3; a) |m| = 19 (el −20 falta); resolución |m| ≥ 11,9 ⇒ 13, 14, 15, 17, 18, 19 resueltos; b) 1 + 12 + 12 = 25 líneas.
const { md, ul, card, callout, eqs, res, table } = require('../../lib');
const { seccion } = require('../common');
const { kit, pantalla } = require('../fx');

const SEC = 'Red 6 · Incidencia oblicua de 12°';
const B = 'b-red';
const K = kit(SEC, B);
const tab = { 3: 58.2, 2: 52.9, 1: 47.6, 0: 42.5, '-1': 37.5, '-2': 32.5, '-3': 27.6, '-5': 17.9, '-6': 13.1, '-7': 8.3, '-9': -1.3, '-10': -6.0, '-11': -10.8, '-13': -20.4, '-14': -25.3, '-15': -30.2, '-17': -40.1, '-18': -45.2, '-19': -50.4 };
const lines = Object.entries(tab).map(([m, y]) => ({ y, color: +m === 0 ? '#fff' : '#ffb347', pair: +m <= -13, m: (+m % 2 === 1 || +m === 0 || +m === -19) ? m : undefined, cls: 'r6-l pending' }));
const pant = pantalla({ id: 'r6-p', half: 60, lines, ticks: [-60, -40, -20, 0, 20, 42.5, 60], h: 240,
  extra: X => `<line x1="${X(42.5)}" y1="186" x2="${X(42.5)}" y2="200" style="stroke:#fff;stroke-width:3"/><text x="${X(42.5)}" y="232" text-anchor="middle" style="fill:#fff;font-size:18px">orden 0</text>` });

module.exports = [
  seccion('Red 6', 'Incidencia oblicua de 12°', 'Recuperatorio 2P del 29/6/2022 · ejercicio 2',
    'Ejercicio de redes número seis: recuperatorio del segundo parcial del veintinueve de junio de dos mil veintidós, ejercicio dos. Una red iluminada en forma oblicua: el patrón queda corrido, y hay que contar órdenes y líneas en una pantalla.'),

  K.enunciado('Red6.jpg', ['@1 $\\lambda$: 595,05 y 594,95 nm', '@1 incidencia $\\theta_i=12°$', '@2 400 rendijas/cm ⇒ $d=25\\ \\mu$m; $a=6{,}25\\ \\mu$m', '@2 1,25 cm iluminados', '@3 pantalla de 1,2 m a 2 m, centrada'], [
    ['Este es el enunciado. Vamos con los datos.'],
    ['Dos longitudes de onda separadas una décima de nanómetro, que llegan a la red con doce grados de inclinación.'],
    ['La red tiene cuatrocientas rendijas por centímetro, de seis coma veinticinco micrones, iluminada en uno coma veinticinco centímetros.'],
    ['La pantalla mide uno coma dos metros, a dos metros, centrada con la red. Piden el máximo orden que se ve y cuántas líneas hay.'],
  ], { maxH: 440 }),

  K.molde('Ejercicios 19 y 20 de la hoja: **¿cuántas líneas se ven?** y **pantalla finita**. Y del 16: la **incidencia oblicua**.',
    ['$d$, $N$, faltan $m=p\\,d/a$', 'Resolución: $|m|N\\ge\\lambda/\\Delta\\lambda$', 'Borde: $\\tg\\theta_{max}=\\frac{W/2}{D}$'],
    ['Incidencia oblicua: $d(\\sen\\theta-\\sen\\theta_i)=m\\lambda$', 'El patrón **no es simétrico**: cada lado es distinto'],
    [['El molde son los ejercicios diecinueve y veinte de la hoja, para contar líneas con una pantalla finita. La incidencia oblicua ya la vimos en la doble rendija.'],
     ['Se repite: d, N, órdenes que faltan, resolución y el borde de la pantalla.'],
     ['Cambia que el haz llega inclinado: el orden cero se va con el haz y el patrón deja de ser simétrico.']]),

  K.S('Teoría', 'La red con incidencia oblicua', `<div class="grid g2" style="align-items:center">${eqs([
      { t: 'd\\,(\\sen\\theta-\\sen\\theta_i)=m\\lambda', s: 0 },
      { t: '\\sen\\theta=\\sen\\theta_i+m\\,\\frac{\\lambda}{d}=0{,}2079+0{,}0238\\,m', s: 1 },
      { t: '-0{,}2873\\le\\sen\\theta\\le0{,}2873', s: 2 },
    ])}${ul(['@0 El orden 0 sale en la dirección del haz: $\\theta=12°$', '@1 Los órdenes se ordenan a partir de ahí', '@2 Hacia un lado entran pocos órdenes; hacia el otro, muchos'])}</div>`, [
    ['Con el haz inclinado, la condición de máximo cambia: d por seno de theta menos seno de theta i, igual a m lambda. Es el mismo razonamiento que en la doble rendija: antes de la red, un rayo recorre más que otro.'],
    ['Entonces seno de theta es seno de doce grados, cero coma dos cero siete nueve, más cero coma cero dos tres ocho por m. El orden cero ya no está en el centro: sale con el haz.'],
    ['Y la pantalla pone el límite de los dos lados. Como el patrón arranca corrido, de un lado entran pocos órdenes y del otro, muchos. [A] ¿El seno de theta i va con signo menos? [P] Sí: es la parte de antes de la red, como en la doble rendija oblicua.'],
  ]),

  K.S('Pasos 1 a 3', 'Qué órdenes caen en la pantalla', `<div class="grid g2" style="align-items:center">${eqs([
      { t: 'd=25\\ \\mu\\text{m},\\ \\frac da=4,\\ N=1{,}25\\cdot400=500', s: 0 },
      { t: '\\tg\\theta_{max}=\\frac{0{,}6}{2}=0{,}3\\ \\Rightarrow\\ \\sen\\theta_{max}=0{,}2873', s: 1 },
      { t: 'm\\le\\frac{0{,}2873-0{,}2079}{0{,}0238}=3{,}34\\ \\Rightarrow\\ m\\le3', s: 2 },
      { t: 'm\\ge\\frac{-0{,}2873-0{,}2079}{0{,}0238}=-20{,}81\\ \\Rightarrow\\ m\\ge-20', s: 2 },
    ])}<div>${res('a) $|m|=19$ (el $-20$ falta)', { s: 3 })}${callout('Orden 0 en $y=2\\tg12°=42{,}5$ cm: adentro, cerca del borde.', { s: 1, style: 'margin-top:20px' })}</div></div>`, [
    ['Paso uno: d es veinticinco micrones, d sobre a es cuatro, así que faltan los múltiplos de cuatro, y N es quinientas rendijas.'],
    ['Paso dos: el borde. Tangente cero coma tres, seno cero coma dos ocho siete tres. El orden cero cae en dos por tangente de doce grados: cuarenta y dos coma cinco centímetros, cerca del borde de arriba.'],
    ['Paso tres: hacia arriba, m llega hasta tres. Hacia abajo, hasta menos veinte.'],
    ['Pero el menos veinte falta: veinte es múltiplo de cuatro. Entonces el máximo orden que se ve es el diecinueve. [A] ¿Cuenta como máximo orden si no se ve? [P] No: piden el máximo orden que se puede observar.'],
  ]),

  K.S('b) Líneas', 'Resolución y conteo en la pantalla', `<div style="display:flex;flex-direction:column;gap:20px;align-items:center">${pant}
      <div class="grid g2" style="width:100%;align-items:center">${eqs([
        { t: '\\frac{\\lambda}{\\Delta\\lambda}=\\frac{595}{0{,}1}=5950\\ \\Rightarrow\\ |m|\\ge\\frac{5950}{500}=11{,}9', s: 0 },
        { t: '\\text{resueltos: }-13,-14,-15,-17,-18,-19', s: 1 },
      ])}${res('b) $1+12+12=25$ líneas', { s: 3 })}</div></div>`, [
    ['Paso cuatro: la resolución. Lambda sobre delta lambda es cinco mil novecientos cincuenta. Con quinientas rendijas, hace falta orden doce o más. El doce falta, así que se separan desde el trece.'],
    ['Del lado de abajo, los órdenes trece, catorce, quince, diecisiete, dieciocho y diecinueve se ven como dos líneas.', `show('.r6-l',{stagger:120,from:'fade'})`],
    ['Los demás que entran, del menos once al más tres, salteando los que faltan, son una línea cada uno: doce órdenes.'],
    ['Total: la del orden cero, doce de órdenes sin resolver, y doce de los seis resueltos. Veinticinco líneas. [A] ¿Por qué los que faltan son el cuatro, el ocho, el doce? [P] Porque d sobre a es cuatro: faltan los múltiplos de cuatro, de los dos lados.'],
  ]),

  K.trampas([
    '**El signo de $\\sen\\theta_i$:** $\\sen\\theta=\\sen\\theta_i+m\\lambda/d$; el orden 0 en 42,5 cm.',
    '**Cada lado por separado:** hasta $+3$ y hasta $-20$.',
    '**Faltan los múltiplos de 4:** el $-20$ no se ve ⇒ $|m|=19$.',
    '**Resolución desde 12 ⇒ 13** (el 12 falta).',
    '**Contar el orden 0 una vez.**',
  ], [
    ['Las trampas. Primera: el ángulo de incidencia corre todo el patrón.'],
    ['Segunda: cada lado tiene su límite.'],
    ['Tercera: el menos veinte falta.'],
    ['Cuarta: la resolución empieza en doce, pero el doce falta.'],
    ['Y quinta: el orden cero es una sola línea.'],
  ]),

  K.receta([
    '**1.** $d$, $d/a$, $N$; $\\sen\\theta=\\sen\\theta_i+m\\lambda/d$.',
    '**2.** Borde: $\\pm\\sen\\theta_{max}$ ⇒ $m$ de cada lado.',
    '**3.** Sacar los que faltan ⇒ máximo $|m|$.',
    '**4.** Resolución ⇒ cuáles valen 2; sumar.',
  ], ['$d=25\\ \\mu$m; $N=500$; faltan múltiplos de 4', 'Entran $m=-20\\dots+3$; orden 0 en 42,5 cm', 'a) $|m|=19$', 'b) **25 líneas**'], [
    ['La receta. Uno: d, N y la condición con incidencia oblicua.'],
    ['Dos: el borde de cada lado.'],
    ['Tres: sacar los que faltan.'],
    ['Cuatro: la resolución y la suma.'],
    ['Resultados: orden diecinueve, y veinticinco líneas.'],
  ]),
];
