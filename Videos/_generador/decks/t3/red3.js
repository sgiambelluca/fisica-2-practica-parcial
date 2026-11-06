// Red 3 · recuperatorio 30/5/2026, ej. 6: luz blanca 400–700 nm, 2000/cm, a = 1,25 µm, detector de 180 cm a 2 m.
// Resultados verificados (soluciones/Red3.py): d = 5 µm, d/a = 4 ⇒ falta el 4º; sen θmax = 0,4104 (tg = 0,45);
// 2º–3º: 49,45–58,33 cm (8,89 cm); 3º–5º: 87,29–90 cm (2,71 cm) por lado ⇒ 23,2 cm de 180 ⇒ 12,9 % (9,9 % sin el 5º, como la hoja v6).
const { md, ul, card, callout, eqs, res, table } = require('../../lib');
const { seccion } = require('../common');
const { kit, growX } = require('../fx');

const SEC = 'Red 3 · Luz blanca en un detector';
const B = 'b-red';
const K = kit(SEC, B);
const GRAD = id => `<defs><linearGradient id="${id}" x1="0" x2="1"><stop offset="0" stop-color="#8f7bff"/><stop offset=".25" stop-color="#4cc2ff"/><stop offset=".5" stop-color="#5fe08a"/><stop offset=".72" stop-color="#ffd166"/><stop offset="1" stop-color="#ff5a5a"/></linearGradient></defs>`;
const SX = s => 120 + s / 0.75 * 1480;
const bandas = `<svg class="r3-svg" viewBox="0 0 1640 500" style="width:1600px">${GRAD('r3-sp')}
  <line x1="${SX(0)}" y1="440" x2="${SX(0.75)}" y2="440" class="r3-ax"/>
  ${[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7].map(s => `<line x1="${SX(s)}" y1="434" x2="${SX(s)}" y2="446" class="r3-ax"/><text x="${SX(s)}" y="476" text-anchor="middle" class="r3-tk">${String(s).replace('.', ',')}</text>`).join('')}
  <text x="${SX(0.75)}" y="476" text-anchor="end" class="r3-tk">sen θ</text>
  ${[1, 2, 3, 4, 5].map((m, i) => { const y = 30 + i * 78, a = 0.08 * m, b = 0.14 * m, f = m === 4;
    return `<text x="100" y="${y + 34}" text-anchor="end" class="r3-m">m = ${m}</text><g id="r3-b${m}" class="pending"><rect x="${SX(a)}" y="${y + 8}" width="${SX(b) - SX(a)}" height="38" rx="6" style="fill:url(#r3-sp);opacity:${f ? .25 : 1}"/>${f ? `<line x1="${SX(a)}" y1="${y + 27}" x2="${SX(b)}" y2="${y + 27}" class="r3-cross"/><text x="${SX(b) + 12}" y="${y + 36}" class="r3-falta">falta</text>` : ''}</g>`; }).join('')}
  <line id="r3-edge" class="pending" x1="${SX(0.4104)}" y1="16" x2="${SX(0.4104)}" y2="450" style="stroke:var(--bad);stroke-width:5"/>
  <text id="r3-edget" class="pending" x="${SX(0.4104) + 10}" y="20" style="fill:var(--bad);font-size:24px;font-weight:700">borde: 0,410</text></svg>`;
const YX = y => 120 + y / 90 * 1460;
const fila = (id, y0, y1, row, fill, txt) => `<g id="${id}" class="pending"><rect x="${YX(y0)}" y="${30 + row * 70}" width="${YX(y1) - YX(y0)}" height="44" rx="6" style="fill:${fill}"/>${txt ? `<text x="${YX(y0) + 8}" y="${62 + row * 70}" class="r3-in">${txt}</text>` : ''}</g>`;
const detector = `<svg class="r3-svg" viewBox="0 0 1640 450" style="width:1600px">${GRAD('r3-sp2')}
  ${['orden 1', 'orden 2', 'orden 3', 'orden 5', 'solapan'].map((t, i) => `<text x="100" y="${60 + i * 70}" text-anchor="end" class="r3-m">${t}</text>`).join('')}
  ${fila('r3-d1', 16.05, 28.28, 0, 'url(#r3-sp2)')}${fila('r3-d2', 32.42, 58.33, 1, 'url(#r3-sp2)')}${fila('r3-d3', 49.45, 90, 2, 'url(#r3-sp2)')}${fila('r3-d5', 87.29, 90, 3, 'url(#r3-sp2)')}
  ${fila('r3-s1', 49.45, 58.33, 4, 'var(--warn)', '8,89 cm')}${fila('r3-s2', 87.29, 90, 4, 'var(--warn)')}
  <line x1="${YX(0)}" y1="390" x2="${YX(90)}" y2="390" class="r3-ax"/>
  ${[0, 16.05, 32.42, 49.45, 58.33, 87.29].map(y => `<line x1="${YX(y)}" y1="384" x2="${YX(y)}" y2="396" class="r3-ax"/><text x="${YX(y)}" y="426" text-anchor="middle" class="r3-tk">${String(y).replace('.', ',')}</text>`).join('')}
  <text x="${YX(90)}" y="426" text-anchor="end" class="r3-tk">90 cm</text></svg>`;
const CSS = `.r3-svg{overflow:visible;font-family:"Segoe UI",Arial,sans-serif}
  .r3-ax{stroke:#6f86a8;stroke-width:3} .r3-tk{fill:var(--dim);font-size:22px;font-family:Consolas,monospace}
  .r3-m{fill:var(--ink);font-size:26px;font-weight:700} .r3-cross{stroke:var(--bad);stroke-width:4} .r3-falta{fill:var(--bad);font-size:24px;font-weight:700}
  .r3-in{fill:#07111f;font-size:22px;font-weight:800}`;

module.exports = [
  seccion('Red 3', 'Luz blanca en un detector', 'Recuperatorio del 30/5/2026 · ejercicio 6',
    'Ejercicio de redes número tres: recuperatorio del treinta de mayo de dos mil veintiséis, ejercicio seis. Luz blanca sobre una red: qué parte del detector recibe luz de dos órdenes a la vez.'),

  Object.assign(K.enunciado('Red3.jpg', ['@1 luz blanca: 400 → 700 nm', '@1 2000 rendijas/cm ⇒ $d=5\\ \\mu$m', '@1 $a=1{,}25\\ \\mu$m', '@2 detector de 180 cm a $D=2$ m, centrado'], [
    ['Este es el enunciado. Luz blanca, que para la cátedra va de cuatrocientos a setecientos nanómetros, sobre una red de dos mil rendijas por centímetro, con rendijas de uno coma veinticinco micrones.'],
    ['El detector mide ciento ochenta centímetros, a dos metros, centrado. Piden en qué porcentaje del detector hay solapamiento.'],
  ], { maxH: 440 }), { css: CSS }),

  K.molde('Ejercicio 22 de la hoja, parte **Recu 30/5/26**: es este mismo ejercicio. Ojo: la hoja da 9,9 % porque **se olvida el 5º orden**.',
    ['$d$ y $d/a$ ⇒ órdenes que faltan', 'Borde: $\\tg\\theta_{max}=\\frac{W/2}{D}$', 'Bandas en $\\sen\\theta$, zonas comunes, $y=D\\tg\\theta$'],
    ['Falta el 4º, pero **el 5º vuelve a aparecer** y entra en el borde', 'Resultado corregido: **12,9 %**'],
    [['El molde es el ejercicio veintidós de la hoja, que tiene este mismo recuperatorio resuelto.'],
     ['Se repite el método: d y d sobre a, el borde del detector, las bandas de cada orden y las zonas comunes, pasadas a posiciones con la tangente.'],
     ['Pero hay que corregir la hoja: da nueve coma nueve por ciento porque se olvida el quinto orden. Falta el cuarto, pero el quinto vuelve a aparecer y entra justo en el borde.']]),

  K.S('Teoría', 'Luz blanca en una red: ¿qué órdenes se pisan?', `<div class="grid g2" style="align-items:center">${eqs([
      { t: '\\sen\\theta=\\frac{m\\lambda}{d}\\qquad\\lambda\\in[400;\\,700]\\ \\text{nm}', s: 0 },
      { t: '1º\\text{ y }2º:\\ 1\\cdot700=700<2\\cdot400=800\\ \\Rightarrow\\ \\text{no}', s: 1 },
      { t: '2º\\text{ y }3º:\\ 2\\cdot700=1400>3\\cdot400=1200\\ \\Rightarrow\\ \\text{sí}', s: 1, cls: 'hl' },
      { t: 'y=D\\tg\\theta\\qquad\\tg\\theta_{max}=\\frac{W/2}{D}', s: 2 },
    ])}${ul(['@0 Cada orden: del violeta (400) al rojo (700)', '@1 El rojo del orden $m$ contra el violeta del $m+1$', '@2 Todo en $\\sen\\theta$, y al final a centímetros con la tangente'])}</div>`, [
    ['Primero la idea. Con luz blanca, cada orden de la red es un pequeño arcoíris: del violeta, en cuatrocientos nanómetros, al rojo, en setecientos. Seno de theta es m lambda sobre d.'],
    ['Dos órdenes se pisan si el rojo de uno llega más lejos que el violeta del siguiente. El primero y el segundo no: setecientos es menos que ochocientos. Pero el segundo y el tercero sí: mil cuatrocientos es más que mil doscientos. Con luz blanca, eso pasa siempre, sin importar la red.'],
    ['Conviene hacer todo en seno de theta y recién al final pasar a centímetros, con y igual a D tangente de theta. El borde del detector se pone con la tangente. [A] ¿Por qué no paraxial? [P] Porque los ángulos llegan a veinticuatro grados.'],
  ]),

  K.S('Bandas', 'Cada orden, una banda de colores', bandas, [
    ['Con d igual a cinco micrones, lambda sobre d va de cero coma cero ocho a cero coma catorce. Cada orden es una banda que empieza en m por cero coma cero ocho y termina en m por cero coma catorce.', growX('#r3-b1, #r3-b2', { dur: 1300, stagger: 500 })],
    ['El orden dos termina en cero coma veintiocho, y el tres empieza en cero coma veinticuatro: con luz blanca, el segundo y el tercero siempre se pisan.', growX('#r3-b3', { dur: 1300 })],
    ['d sobre a es cuatro: falta el cuarto orden completo. Pero el quinto no falta: cinco no es múltiplo de cuatro. Empieza en cero coma cuarenta.', growX('#r3-b4, #r3-b5', { dur: 1300, stagger: 500 })],
    ['Y el borde del detector: tangente igual a noventa sobre doscientos, cero coma cuarenta y cinco. El seno es cero coma cuatro uno cero. El violeta del quinto orden, en cero coma cuarenta, entra. [A] ¿Tan poquito cuenta? [P] Sí: es luz de dos órdenes en el mismo lugar.', `show('#r3-edge, #r3-edget',{from:'fade'})`],
  ]),

  K.S('Solapamiento', 'Dónde se pisan, en el detector', `<div style="display:flex;flex-direction:column;gap:16px;align-items:center">${detector}
      <div class="grid g2" style="width:100%;align-items:center">${eqs([
        { t: '2º\\text{–}3º:\\ 0{,}24\\to0{,}28\\ \\Rightarrow\\ 49{,}45\\to58{,}33\\ \\text{cm}', s: 2 },
        { t: '3º\\text{–}5º:\\ 0{,}40\\to0{,}4104\\ \\Rightarrow\\ 87{,}29\\to90\\ \\text{cm}', s: 3 },
      ])}${res('$\\frac{2\\,(8{,}89+2{,}71)}{180}=12{,}9\\ \\%$', { s: 4 })}</div></div>`, [
    ['Pasemos a un lado del detector, con y igual a D tangente de theta. El primer orden va de dieciséis a veintiocho centímetros; el segundo, de treinta y dos a cincuenta y ocho.', growX('#r3-d1, #r3-d2', { dur: 1200, stagger: 400 })],
    ['El tercero empieza en cuarenta y nueve y llega al borde; el quinto, desde ochenta y siete.', growX('#r3-d3, #r3-d5', { dur: 1200, stagger: 400 })],
    ['Primera zona: el segundo con el tercero, de cuarenta y nueve coma cuatro cinco a cincuenta y ocho coma tres tres. Ocho coma ochenta y nueve centímetros.', growX('#r3-s1', { dur: 1000 })],
    ['Segunda zona: el tercero con el quinto, de ochenta y siete coma dos nueve hasta el borde: dos coma setenta y un centímetros.', growX('#r3-s2', { dur: 800 })],
    ['Por lado, once coma seis centímetros; por los dos, veintitrés coma dos, sobre ciento ochenta: doce coma nueve por ciento. Sin el quinto orden sería nueve coma nueve, lo que dice la hoja. En el examen, das doce coma nueve y aclarás el otro.'],
  ]),

  K.S('Cátedra', '¿12,9 % o 9,9 %?', `<div class="grid g2" style="align-items:center">${eqs([
      { t: '5\\ \\text{no es múltiplo de }4\\ \\Rightarrow\\ \\text{no falta}', s: 0 },
      { t: '5\\cdot\\frac{0{,}4}{5}=0{,}40<0{,}4104\\ \\Rightarrow\\ \\text{entra}', s: 0 },
      { t: '\\text{sin el 5º: }\\frac{2\\cdot8{,}89}{180}=9{,}9\\ \\%', s: 1 },
      { t: '\\text{para no ver el 5º: } W<2\\cdot87{,}29=174{,}6\\ \\text{cm}', s: 2 },
    ])}${callout('En el examen: **12,9 %**, y una línea aclarando que sin el 5º orden sería 9,9 %.', { s: 3, cls: 'ok' })}</div>`, [
    ['¿Por qué la hoja dice nueve coma nueve? Porque solo cuenta el segundo con el tercero. Pero el quinto orden no falta, porque cinco no es múltiplo de cuatro, y su violeta cae en cero coma cuarenta, adentro del detector.'],
    ['Sin el quinto, el porcentaje sería dos por ocho coma ochenta y nueve sobre ciento ochenta: nueve coma nueve.'],
    ['Para que el quinto no entrara, el detector tendría que medir menos de ciento setenta y cuatro coma seis centímetros. Con ciento ochenta, entra. [A] ¿Y la cátedra qué espera? [P] Es probable que espere nueve coma nueve, porque el quinto es débil y fácil de pasar por alto. Pero físicamente está.'],
    ['Lo más seguro en el examen: responder doce coma nueve, y aclarar en una línea que sin el quinto orden sería nueve coma nueve.'],
  ]),

  K.trampas([
    '**El 5º orden:** falta el 4º, no "todo lo que sigue". Revisar cada $m$ con $m\\lambda_{min}/d<\\sen\\theta_{max}$.',
    '**Borde:** $\\tg\\theta_{max}=0{,}45$, no $\\sen\\theta_{max}=0{,}45$.',
    '**Nada de paraxial:** con 14° a 24° usar $y=D\\tg\\theta$ (paraxial: 13,3 %).',
    '**Sin el faltante** se pisarían 3º y 4º: 34,8 %.',
    '**Dos lados:** con uno solo, 6,4 %.',
  ], [
    ['Las trampas. La principal: olvidarse del quinto orden. Faltar el cuarto no corta todo lo que sigue.'],
    ['Segunda: el borde se pone con la tangente, no con el seno.'],
    ['Tercera: con estos ángulos no sirve la paraxial.'],
    ['Cuarta: sacar el cuarto orden; si no, parece que se pisa todo.'],
    ['Y quinta: contar los dos lados.'],
  ]),

  K.receta([
    '**1.** $d$, $d/a$ ⇒ faltan $m=4,8,\\dots$',
    '**2.** $\\tg\\theta_{max}=\\frac{0{,}9}{2}$ ⇒ $\\sen\\theta_{max}=0{,}410$.',
    '**3.** Bandas $0{,}08m\\to0{,}14m$; zonas comunes.',
    '**4.** $y=D\\tg\\theta$; % $=2\\cdot\\text{lado}/W$.',
  ], ['$d=5\\ \\mu$m; falta el 4º', '2º–3º: 8,89 cm; 3º–5º: 2,71 cm por lado', '**12,9 %** (9,9 % sin el 5º)'], [
    ['La receta. Uno: d y los órdenes que faltan.'],
    ['Dos: el borde del detector.'],
    ['Tres: las bandas y sus zonas comunes.'],
    ['Cuatro: pasar a centímetros con la tangente y sacar el porcentaje con los dos lados.'],
    ['Resultado: doce coma nueve por ciento.'],
  ]),
];
