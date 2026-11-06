// Red 7 · recuperatorio 2P 21/11/2023, ej. 3: alambre de (0,127 ± 0,005) mm, láser 632,8 nm, pantalla a 2,65 m; s = distancia entre los mínimos de orden 10.
// Resultados verificados (soluciones/Red7.py): Babinet ⇒ D sen θ = pλ; D = 0,122 mm ⇒ s = 27,53 cm; D = 0,127 ⇒ 26,44 cm; D = 0,132 ⇒ 25,44 cm;
// intervalo 25,4 cm ≤ s ≤ 27,5 cm (ángulos chicos: 25,41 y 27,49).
const { md, ul, card, callout, eqs, res, plot } = require('../../lib');
const { seccion } = require('../common');
const { kit } = require('../fx');

const SEC = 'Red 7 · Alambre y láser (Babinet)';
const B = 'b-red';
const K = kit(SEC, B);
// patrón de una rendija de 127 µm en la pantalla (y en cm), L = 2,65 m
const If = (y, D) => { const s = (y / 100) / Math.sqrt((y / 100) ** 2 + 2.65 ** 2), b = Math.PI * D * s / 0.6328; return Math.abs(b) < 1e-9 ? 1 : (Math.sin(b) / b) ** 2; };
const babinet = `<svg class="ob-svg" viewBox="0 0 900 420" style="width:860px;font-family:'Segoe UI',Arial">
  <text x="120" y="40" text-anchor="middle" style="fill:var(--muted);font-size:24px">rendija de ancho D</text>
  <rect x="100" y="60" width="40" height="120" style="fill:#8fa6c4"/><rect x="100" y="210" width="40" height="120" style="fill:#8fa6c4"/>
  <text x="560" y="40" text-anchor="middle" style="fill:var(--muted);font-size:24px">alambre de diámetro D</text>
  <rect x="540" y="180" width="40" height="30" style="fill:#8fa6c4"/>
  <text x="330" y="200" text-anchor="middle" style="fill:var(--warn);font-size:40px;font-weight:800">≡</text>
  <text x="450" y="380" text-anchor="middle" style="fill:var(--accent2);font-size:26px;font-weight:700">mismo patrón fuera del centro: mínimos en D sen θ = pλ</text></svg>`;

module.exports = [
  seccion('Red 7', 'Alambre y láser (Babinet)', 'Recuperatorio 2P del 21/11/2023 · ejercicio 3',
    'Ejercicio de redes número siete: recuperatorio del segundo parcial del veintiuno de noviembre de dos mil veintitrés, ejercicio tres. Un alambre iluminado con un láser difracta igual que una rendija: con la posición de los mínimos se controla su diámetro.'),

  K.enunciado('Red7.jpg', ['@1 láser $\\lambda_0=632{,}8$ nm', '@1 pantalla a $L=2{,}65$ m', '@2 alambre: $D=(0{,}127\\pm0{,}005)$ mm', '@3 $s$ = distancia entre los **mínimos de orden 10**, uno a cada lado', '@3 ¿intervalo de $s$?'], [
    ['Este es el enunciado. Vamos con los datos.'],
    ['Un láser de helio neón, de seiscientos treinta y dos coma ocho nanómetros, ilumina un alambre, y el patrón se ve en una pantalla a dos coma sesenta y cinco metros.'],
    ['El diámetro tiene que ser cero coma ciento veintisiete milímetros, con una tolerancia de cinco milésimas.'],
    ['Se mide la distancia s entre los dos mínimos de orden diez, uno a cada lado del centro. Piden entre qué valores tiene que estar s para que el alambre esté dentro de la tolerancia.'],
  ], { maxH: 430 }),

  K.molde('Ejercicio 23 de la hoja: **Babinet**: un hilo de 30 µm ≡ rendija de 30 µm; mínimos en $a\\sen\\theta_p=p\\lambda$, $y_p=f\\tg\\theta_p$.',
    ['Babinet: alambre ≡ rendija del mismo ancho', 'Mínimos: $D\\sen\\theta_p=p\\lambda$', 'Posición: $y=L\\tg\\theta$'],
    ['Se pide un **intervalo**: con $D_{min}$ y $D_{max}$', 'Sin lente: la pantalla está a $L$', '$s$ es entre los dos mínimos ($2y_{10}$)'],
    [['El molde es la parte de Babinet del ejercicio veintitrés de la hoja: un hilo difracta igual que una rendija del mismo ancho.'],
     ['Se repite: los mínimos están en D seno de theta igual a p lambda, y la posición con la tangente.'],
     ['Cambia que se pide un intervalo, calculando con el diámetro mínimo y con el máximo, y que s es la distancia entre los dos mínimos.']]),

  K.S('Teoría', 'Principio de Babinet', `<div style="display:grid;grid-template-columns:860px 1fr;gap:30px;align-items:center">${babinet}
      ${eqs([
        { t: 'D\\sen\\theta_p=p\\,\\lambda\\quad(p=\\pm1,\\pm2,\\dots)', s: 1 },
        { t: 'y_p=L\\tg\\theta_p', s: 1 },
        { t: 's=2\\,y_{10}', s: 2, cls: 'hl' },
      ])}</div>`, [
    ['El principio de Babinet dice que un obstáculo y una abertura complementarios, como un alambre y una rendija del mismo ancho, dan el mismo patrón de difracción, salvo justo en el centro.'],
    ['Así que el alambre tiene mínimos donde los tendría una rendija de ancho D: D seno de theta igual a p lambda. Y en la pantalla, y igual a L tangente de theta.'],
    ['La distancia entre los mínimos de orden diez, uno de cada lado, es dos veces y diez. [A] ¿No es al revés, oscuro donde la rendija da luz? [P] No: fuera del centro el patrón es el mismo, con los mismos mínimos.'],
  ]),

  K.S('Cálculo', 'Los dos extremos del diámetro', `<div style="display:grid;grid-template-columns:1fr 720px;gap:30px;align-items:center">${eqs([
      { t: 'D=122\\ \\mu\\text{m}:\\ \\sen\\theta_{10}=\\frac{6{,}328}{122}=0{,}05187', s: 0 },
      { t: 'y_{10}=2{,}65\\cdot0{,}05194=13{,}76\\ \\text{cm}\\ \\Rightarrow\\ s=27{,}53\\ \\text{cm}', s: 0, cls: 'ok' },
      { t: 'D=132\\ \\mu\\text{m}:\\ \\sen\\theta_{10}=0{,}04794\\ \\Rightarrow\\ s=25{,}44\\ \\text{cm}', s: 1, cls: 'ok' },
      { t: 'D=127\\ \\mu\\text{m}:\\ s=26{,}44\\ \\text{cm}', s: 2 },
    ])}
      ${plot({ w: 720, h: 470, x: [10, 16], y: [0, 0.006], ticksX: [12.72, 13.22, 13.76], ticksY: [0], fmtX: v => String(v).replace('.', ','), xl: 'y (cm)', yl: 'I (cerca de p = 10)', id: 'r7-p', s: 0,
        curves: [{ f: y => If(y, 122), n: 600, cls: 'c3', id: 'r7-a' }, { f: y => If(y, 132), n: 600, cls: 'c2', id: 'r7-b' }],
        extra: (px, py) => `<text class="lbl c3" x="${px(15.9)}" y="${py(0.0057)}" style="text-anchor:end">D = 122 µm</text><text class="lbl c2" x="${px(15.9)}" y="${py(0.0051)}" style="text-anchor:end">D = 132 µm</text>` })}</div>`, [
    ['Con el diámetro mínimo, ciento veintidós micrones: diez lambda es seis coma tres dos ocho micrones, y el seno da cero coma cero cinco uno ocho siete. Con la tangente, y diez es trece coma setenta y seis centímetros, y s, el doble: veintisiete coma cincuenta y tres.', `sweep('#r7-p #r7-a',{dur:1800}); sweep('#r7-p #r7-b',{delay:1400,dur:1800})`],
    ['Con el máximo, ciento treinta y dos micrones, el ángulo es menor y s da veinticinco coma cuarenta y cuatro centímetros.'],
    ['Con el nominal, veintiséis coma cuarenta y cuatro. [A] ¿El alambre más fino da mínimos más lejos? [P] Sí: cuanto más chico es el obstáculo, más se abre el patrón.'],
  ]),

  K.S('Resultado', 'El intervalo de s', `<div class="grid g2" style="align-items:center">${eqs([
      { t: 's\\approx\\frac{2L\\cdot10\\lambda}{D}\\quad(\\text{decrece con }D)', s: 0 },
      { t: 'D_{min}\\to s_{max},\\quad D_{max}\\to s_{min}', s: 0 },
    ])}<div>${res('$25{,}4\\ \\text{cm}\\le s\\le27{,}5\\ \\text{cm}$', { s: 1 })}${callout('$s$ mayor ⇒ alambre demasiado fino; $s$ menor ⇒ demasiado grueso. Con ángulos chicos: 25,41 y 27,49 cm.', { s: 2, style: 'margin-top:20px' })}</div></div>`, [
    ['Como s es inversamente proporcional a D, los extremos se cruzan: el diámetro mínimo da la s máxima, y el máximo da la mínima.'],
    ['Entonces s tiene que estar entre veinticinco coma cuatro y veintisiete coma cinco centímetros.'],
    ['Si s sale mayor, el alambre es demasiado fino; si sale menor, demasiado grueso. Con la aproximación de ángulos chicos da prácticamente lo mismo: cualquiera de los dos cálculos se acepta.'],
  ]),

  K.trampas([
    '**Babinet:** el alambre es una **rendija**, no una doble rendija ni una red.',
    '**Mínimos en $p\\lambda$**, no en $(p+\\frac12)\\lambda$.',
    '**No es $1{,}22\\lambda/D$:** eso es para aberturas circulares.',
    '**$s=2y_{10}$**, no $y_{10}$.',
    '**Los extremos se cruzan:** $D_{min}$ da $s_{max}$.',
  ], [
    ['Las trampas. Primera: el alambre equivale a una sola rendija.'],
    ['Segunda: los mínimos de una rendija están en múltiplos enteros de lambda.'],
    ['Tercera: el uno coma veintidós es para aberturas circulares.'],
    ['Cuarta: s es entre los dos mínimos: el doble.'],
    ['Y quinta: el diámetro mínimo da la distancia máxima.'],
  ]),

  K.receta([
    '**1.** Babinet: alambre ⇒ rendija de ancho $D$.',
    '**2.** $\\sen\\theta_p=p\\lambda/D$; $y_p=L\\tg\\theta_p$.',
    '**3.** $s=2y_p$ con $D_{min}$ y con $D_{max}$.',
  ], ['$D=0{,}122$ mm ⇒ $s=27{,}53$ cm', '$D=0{,}132$ mm ⇒ $s=25{,}44$ cm', '**$25{,}4\\le s\\le27{,}5$ cm**'], [
    ['La receta. Uno: Babinet, el alambre como una rendija.'],
    ['Dos: la posición del mínimo de orden diez.'],
    ['Tres: la distancia entre los dos, con el diámetro mínimo y el máximo.'],
    ['Resultado: s entre veinticinco coma cuatro y veintisiete coma cinco centímetros.'],
  ]),
];
