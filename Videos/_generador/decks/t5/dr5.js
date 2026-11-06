// DR 5 · 2P 26/6/2023, ej. 1: λ = 612 nm, D = 1,75 m, Δy = 1,53 mm; en la foto falta el máximo ±7; lámina de 7 µm lleva el máx. 2 al 6º mínimo.
// Resultados verificados (soluciones/DR5.py): a) d = λD/Δy = 700 µm; d/a = 7 ⇒ a = 100 µm; b) 2λ + e(n−1) = 5,5λ ⇒ e(n−1) = 2,142 µm ⇒ n = 1,306;
// c) centro: γ = −3,5π ⇒ I = 0; máx. 2 en y = 8,42 mm, β = 5,5π/7 ⇒ I = 0,255; d) sin lámina 13 máximos; con lámina 14 (más probable).
const { md, ul, card, callout, eqs, res, plot } = require('../../lib');
const { seccion } = require('../common');
const { kit } = require('../fx');

const SEC = 'DR 5 · Foto del patrón y lámina';
const B = 'b-fis';
const K = kit(SEC, B);
const env = u => { const b = Math.PI * u / 7; return Math.abs(b) < 1e-9 ? 1 : (Math.sin(b) / b) ** 2; };
const Isin = u => 4 * Math.cos(Math.PI * u) ** 2 * env(u);
const Icon = u => 4 * Math.cos(Math.PI * (u - 3.5)) ** 2 * env(u);
// la "foto": puntos brillantes en u = m, tamaño según la intensidad
const foto = (id, f, o = {}) => { let h = `<svg class="ds-svg" id="${id}" viewBox="0 0 1600 170" style="width:1560px"><rect x="10" y="20" width="1580" height="120" rx="12" style="fill:#05080d;stroke:#4a6286;stroke-width:3"/>`;
  for (let k = -100; k <= 100; k++) { const u = k / 10; if (Math.abs(u) > 10.2) continue; const I = f(u); if (I < 0.02) continue; }
  for (let m = -10; m <= 10; m++) { const u = m + (o.sh || 0), I = f(u); const r = 4 + 20 * Math.sqrt(I / 4); if (I > 0.01) h += `<circle cx="${800 + u * 75}" cy="80" r="${r.toFixed(1)}" style="fill:#ff5050;opacity:${Math.min(1, 0.25 + I / 3).toFixed(2)}"/>`; }
  if (o.labels) for (let m = -9; m <= 9; m++) h += `<text x="${800 + m * 75}" y="164" text-anchor="middle" style="fill:${Math.abs(m) === 7 ? 'var(--bad)' : 'var(--muted)'};font-size:20px;font-weight:700">${m}</text>`;
  return h + (o.extra || '') + '</svg>'; };

module.exports = [
  seccion('DR 5', 'Foto del patrón y lámina', 'Segundo parcial del 26/6/2023 · ejercicio 1',
    'Ejercicio de doble rendija número cinco: segundo parcial del veintiséis de junio de dos mil veintitrés, ejercicio uno. De una foto del patrón se sacan la separación y el ancho de las rendijas; después una lámina corre el patrón.'),

  K.enunciado('DR5.jpg', ['@1 $\\lambda=612$ nm, $D=1{,}75$ m', '@1 interfranja $\\Delta y=1{,}53$ mm', '@2 en la foto **falta el máximo ±7**', '@3 lámina $e=7\\ \\mu$m: el máx. 2 va al **6º mínimo**', '@3 $I_0=1$'], [
    ['Este es el enunciado. Vamos con los datos.'],
    ['Un láser de seiscientos doce nanómetros ilumina dos rendijas; la pantalla está a uno coma setenta y cinco metros, y los puntos brillantes están separados uno coma cincuenta y tres milímetros.'],
    ['En la foto del patrón, contando desde el centro, se ven seis puntos a cada lado, después un hueco, y siguen el ocho y el nueve: falta el séptimo.'],
    ['Después se pone una lámina de siete micrones y el máximo de orden dos se corre adonde estaba el sexto mínimo. Piden d y a, el índice de la lámina, la intensidad en el centro y en el máximo dos, y cuántos máximos hay en la campana principal.'],
  ], { maxH: 440 }),

  K.molde('Ejercicio 17 de la hoja: **una lámina corre N franjas**: $e(n_l-1)=N\\lambda_0$. El 18 b): **intensidad en un máximo corrido**. Receta: **campana central** y **interfranja**.',
    ['$\\Delta y=\\lambda D/d$', 'Faltan $m=p\\,d/a$', 'Lámina: $e(n-1)=N\\lambda$; $\\beta$ sin láminas', 'Campana central: $2d/a-1$ máximos'],
    ['$d$ y $a$ salen de una **foto**', 'El corrimiento es **semientero** (3,5): cambia el conteo'],
    [['El molde es el diecisiete de la hoja, donde una lámina corre N franjas, y el dieciocho para la intensidad en un máximo corrido. De la receta, la interfranja y la campana central.'],
     ['Se repite: la interfranja da d, el orden que falta da a, la lámina suma e por n menos uno, y beta no la lleva.'],
     ['Cambia que los datos salen de una foto, y que el corrimiento es de tres franjas y media: eso cambia el conteo del final.']]),

  K.S('a) d y a', 'Lo que dice la foto', `<div style="display:flex;flex-direction:column;gap:24px;align-items:center">${foto('d5-f', Isin, { labels: true })}
      <div class="grid g2" style="width:100%;align-items:center">${eqs([
        { t: 'd=\\frac{\\lambda D}{\\Delta y}=\\frac{612\\cdot10^{-9}\\cdot1{,}75}{1{,}53\\cdot10^{-3}}=700\\ \\mu\\text{m}', s: 0 },
        { t: '7=p\\,\\frac da,\\ p=1\\ \\Rightarrow\\ \\frac da=7', s: 1 },
      ])}${res('$d=700\\ \\mu$m, $a=100\\ \\mu$m', { s: 2 })}</div></div>`, [
    ['Ítem a. La interfranja es lambda D sobre d. Despejando, d es seiscientos doce nanómetros por uno coma setenta y cinco, sobre uno coma cincuenta y tres milímetros: setecientos micrones.'],
    ['En la foto falta el séptimo máximo. Los que faltan cumplen m igual a p por d sobre a; el primero que falta, con p igual a uno, es d sobre a. Entonces d sobre a es siete.'],
    ['Y a es d sobre siete: cien micrones. [A] ¿Y si d sobre a fuera tres coma cinco? [P] El primer cero caería entre el tres y el cuatro, y esos se verían muy débiles. En la foto se ven bien: el primer hueco es el primer cero de la campana.'],
  ]),

  K.S('b) La lámina', 'El máximo 2 llega al 6º mínimo', `<div style="display:flex;flex-direction:column;gap:24px;align-items:center">
      <svg class="ds-svg" viewBox="0 0 1600 150" style="width:1560px"><rect x="10" y="20" width="1580" height="100" rx="12" style="fill:#05080d;stroke:#4a6286;stroke-width:3"/>
        ${[-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6].map(m => `<circle cx="${800 + m * 110}" cy="70" r="16" style="fill:rgba(255,80,80,.35)"/>`).join('')}
        <line x1="${800 + 5.5 * 110}" y1="10" x2="${800 + 5.5 * 110}" y2="130" style="stroke:var(--warn);stroke-width:4;stroke-dasharray:8 6"/><text x="${800 + 5.5 * 110}" y="146" text-anchor="middle" style="fill:var(--warn);font-size:22px;font-weight:700">6º mínimo: 5,5λ</text>
        <g id="d5-m2"><circle cx="${800 + 2 * 110}" cy="70" r="22" style="fill:#ff5050"/><text x="${800 + 2 * 110}" y="78" text-anchor="middle" style="fill:#fff;font-size:22px;font-weight:800">2</text></g></svg>
      <div class="grid g2" style="width:100%;align-items:center">${eqs([
        { t: '2\\lambda+e(n-1)=5{,}5\\lambda', s: 1 },
        { t: 'e(n-1)=3{,}5\\lambda=3{,}5\\cdot0{,}612=2{,}142\\ \\mu\\text{m}', s: 2 },
        { t: 'n-1=\\frac{2{,}142}{7}=0{,}306', s: 2 },
      ])}<div>${res('$n=1{,}306$', { s: 2 })}${callout('La lámina va en la rendija **del lado hacia el que se corrió** el máximo: el patrón se corre hacia la lámina.', { s: 3, cls: 'warn', style: 'margin-top:20px' })}</div></div></div>`, [
    ['Ítem b. Sin lámina, el máximo dos está en d seno theta igual a dos lambda. Los mínimos están en los semienteros: el primero en medio lambda, el sexto en cinco coma cinco lambda.', `along('#d5-m2', [[0,0],[385,0]], {delay:600, dur:talk(1000), easing:'ease-in-out'})`],
    ['Con la lámina en una rendija, a cada máximo se le suma e por n menos uno. El dos tiene que llegar a cinco coma cinco lambda.'],
    ['Entonces e por n menos uno es tres coma cinco lambda: dos coma uno cuatro dos micrones. Dividiendo por siete micrones, n menos uno es cero coma tres cero seis, y n, uno coma tres cero seis.'],
    ['¿Dónde va la lámina? El patrón se corre hacia la lámina. Como el máximo dos se fue hacia afuera, la lámina va en la rendija de ese lado. [A] ¿Y si la pongo en la otra? [P] El máximo dos iría hacia el centro, y nunca llegaría al sexto mínimo de su lado.'],
  ]),

  K.S('c) Intensidades', 'El centro y el nuevo lugar del máximo 2', `<div style="display:grid;grid-template-columns:600px 1fr;gap:30px;align-items:center">${eqs([
      { t: '\\text{centro: }\\gamma=-3{,}5\\pi\\ \\Rightarrow\\ \\cos^2\\gamma=0\\ \\Rightarrow\\ I=0', s: 0, cls: 'ok' },
      { t: 'y_2=5{,}5\\cdot1{,}53=8{,}42\\ \\text{mm}', s: 1 },
      { t: '\\beta=\\pi\\,\\frac ad\\cdot5{,}5=\\frac{5{,}5\\pi}{7}=2{,}468\\ \\text{rad}', s: 2 },
      { t: 'I_2=4\\left(\\frac{0{,}6235}{2{,}468}\\right)^2=0{,}255', s: 3, cls: 'ok' },
    ])}
      ${plot({ w: 1080, h: 500, x: [-10, 10], y: [0, 4.3], ticksX: [-7, -3.5, 0, 5.5, 7], ticksY: [0, 2, 4], fmtX: v => String(v).replace('.', ','), xl: 'y / Δy', yl: 'I', id: 'd5-p', s: 1,
        curves: [{ f: Icon, n: 2500, cls: 'c3', id: 'd5-pc' }, { f: u => 4 * env(u), n: 800, cls: 'c2 dash', id: 'd5-pe' }],
        extra: (px, py) => `<circle class="dot" cx="${px(0)}" cy="${py(0)}" r="11"/><text class="lbl c3" x="${px(0)}" y="${py(0.4)}" style="text-anchor:middle">centro: 0</text><circle class="dot" cx="${px(5.5)}" cy="${py(0.255)}" r="11"/><text class="lbl c3" x="${px(5.5)}" y="${py(0.75)}" style="text-anchor:middle">m = 2: 0,255</text>` })}</div>`, [
    ['Ítem c. En el centro, la diferencia de camino es menos tres coma cinco lambda: gama es menos tres coma cinco pi y el coseno cuadrado es cero. La intensidad en el centro es cero, aunque beta valga cero.'],
    ['El máximo dos está ahora a cinco coma cinco interfranjas del centro: ocho coma cuatro dos milímetros, del lado de la lámina.', `sweep('#d5-p #d5-pc',{dur:2400}); sweep('#d5-p #d5-pe',{delay:1500,dur:1500})`],
    ['Ahí el coseno cuadrado vale uno, pero la campana pesa: beta es pi a sobre d por cinco coma cinco, cinco coma cinco pi séptimos, dos coma cuatro seis ocho radianes.'],
    ['El factor de difracción es cero coma cero seis cuatro, y la intensidad, cuatro por eso: cero coma dos cinco cinco. Antes de la lámina, ese máximo valía tres. [A] ¿Por qué cae tanto? [P] Porque se corrió hacia el borde de la campana de difracción, que no se mueve.'],
  ]),

  K.S('d) Campana principal', '¿Cuántos máximos entran en la campana?', `<div style="display:flex;flex-direction:column;gap:20px;align-items:center">
      ${foto('d5-g1', Isin, { extra: '<text x="20" y="16" style="fill:var(--muted);font-size:22px">sin lámina: 13</text>' })}${foto('d5-g2', Icon, { sh: 0.5, extra: '<text x="20" y="16" style="fill:var(--warn);font-size:22px">con lámina: 14</text>' })}
      <div class="grid g2" style="width:100%;align-items:center">${eqs([
        { t: '-7\\lambda<d\\sen\\theta<7\\lambda\\ \\ (\\text{no depende de la lámina})', s: 0 },
        { t: '\\text{con lámina: }d\\sen\\theta=\\pm0{,}5\\lambda,\\dots,\\pm6{,}5\\lambda', s: 1 },
      ])}${res('14 máximos (sin lámina: 13)', { s: 2 })}</div></div>`, [
    ['Ítem d. La campana principal va de menos siete a más siete lambda en d seno de theta, y no se corre con la lámina.'],
    ['Sin lámina, los máximos están en los enteros: de menos seis a seis, trece máximos, porque el siete cae justo en el cero. Con la lámina, el patrón se corrió tres franjas y media: los máximos quedan en los semienteros, de menos seis coma cinco a seis coma cinco. Ninguno cae en el cero.'],
    ['Son catorce máximos, siete de cada lado. Como el ítem viene después de poner la lámina, lo más probable es que esperen catorce. [A] ¿Y si pongo trece? [P] Es la cuenta sin lámina. Si dudás, das las dos y explicás.'],
  ]),

  K.trampas([
    '**El 6º mínimo está en 5,5λ**, no en 6,5λ (daría $n=1{,}393$).',
    '**En la foto, el central es $m=0$:** el primer hueco es el 7º.',
    '**$e(n-1)$**, no $e\\,n$; y el patrón se corre **hacia** la lámina.',
    '**Centro con $\\beta=0$ no es $I=4$:** $\\cos^2\\gamma=0$ ⇒ $I=0$.',
    '**d) con la lámina:** corrimiento semientero ⇒ 14, no $2d/a-1=13$.',
  ], [
    ['Las trampas. Primera: el sexto mínimo está en cinco coma cinco lambda.'],
    ['Segunda: en la foto el central es el cero; el hueco es el séptimo.'],
    ['Tercera: la lámina suma e por n menos uno, y el patrón se corre hacia ella.'],
    ['Cuarta: en el centro beta es cero, pero gama da un mínimo: intensidad cero.'],
    ['Y quinta: con la lámina puesta, el conteo de la campana da catorce.'],
  ]),

  K.receta([
    '**1.** $d=\\lambda D/\\Delta y$; el primer hueco ⇒ $d/a$.',
    '**2.** Máximo $m$ con lámina: $m\\lambda+e(n-1)$ = lugar pedido.',
    '**3.** $I$: $\\gamma$ con la lámina, $\\beta$ sin ella.',
    '**4.** Campana: $|d\\sen\\theta|<\\frac da\\lambda$; contar dónde quedan los máximos.',
  ], ['a) $d=700\\ \\mu$m; $a=100\\ \\mu$m', 'b) $n=1{,}306$', 'c) $I(0)=0$; máx. 2 en 8,42 mm con $I=0{,}255$', 'd) 14 máximos (13 sin lámina)'], [
    ['La receta. Uno: d con la interfranja, y d sobre a con el primer hueco.'],
    ['Dos: el máximo corrido con la lámina, igual al lugar pedido.'],
    ['Tres: intensidad con gama y beta, la lámina solo en gama.'],
    ['Cuatro: contar los máximos dentro de la campana.'],
    ['Resultados: setecientos y cien micrones, n igual a uno coma tres cero seis, cero y cero coma dos cinco cinco, y catorce máximos.'],
  ]),
];
