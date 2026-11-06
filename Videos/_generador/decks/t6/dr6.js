// DR 6 · recuperatorio 2P 21/11/2023, ej. 1: 3 rendijas en líquido n = 1,32 (a = 2 µm, d = 8 µm, λ0 = 600 nm), central tapada; láminas 1,5 (4 µm) y 1,2 (e2).
// Resultados verificados (soluciones/DR6.py): a) e1(n1 − n) = 0,72 µm; e2(1,2 − 1,32) = −0,12e2 ⇒ misma rendija: e2 = 6 µm;
// b) N = 3 sin láminas, pantalla 30 cm a 65 cm: sen θmax = 0,2249 ⇒ ΔCO = 3,957λ0; mínimos en p/3 (p = 1,2,4,5,7,8,10,11) ⇒ 8 por lado;
// 1er cero de difracción en y = 15,17 cm (afuera) ⇒ 16 mínimos (18 con paraxial).
const { md, ul, card, callout, eqs, res, plot } = require('../../lib');
const { seccion } = require('../common');
const { kit, barras, DS_CSS, growX } = require('../fx');

const SEC = 'DR 6 · Tres rendijas, una tapada';
const B = 'b-fis';
const K = kit(SEC, B);
const I3 = u => { const g = Math.PI * u, bb = g / 4, s = Math.sin(g); const r = Math.abs(s) < 1e-9 ? 9 : (Math.sin(3 * g) / s) ** 2; const e = Math.abs(bb) < 1e-9 ? 1 : (Math.sin(bb) / bb) ** 2; return r * e; };

module.exports = [
  seccion('DR 6', 'Tres rendijas, una tapada', 'Recuperatorio 2P del 21/11/2023 · ejercicio 1',
    'Ejercicio de doble rendija número seis: recuperatorio del segundo parcial del veintiuno de noviembre de dos mil veintitrés, ejercicio uno. Tres rendijas en un líquido, con la del medio tapada y dos láminas; después se destapa y se cuentan los mínimos.'),

  Object.assign(K.enunciado('DR6.jpg', ['@1 líquido $n=1{,}32$', '@1 3 rendijas: $a=2\\ \\mu$m, $d=8\\ \\mu$m; $\\lambda_0=600$ nm', '@2 central tapada; lámina 1: $n_1=1{,}5$, $e_1=4\\ \\mu$m', '@2 lámina 2: $n_2=1{,}2$, $e_2$ ?: orden 0 en el centro', '@3 b) sin láminas y destapada: ¿cuántos mínimos?', '@3 pantalla de 30 cm a 65 cm'], [
    ['Este es el enunciado. Vamos con los datos.'],
    ['Tres rendijas sumergidas en un líquido de índice uno coma tres dos, de dos micrones de ancho y separadas ocho, con luz de seiscientos nanómetros.'],
    ['La del medio está tapada. Frente a una rendija hay una lámina de uno coma cinco y cuatro micrones, y se agrega otra de uno coma dos, de espesor desconocido, para que el orden cero quede en el centro.'],
    ['En el ítem b se sacan las láminas, se destapa la del medio, y hay que contar los mínimos en una pantalla de treinta centímetros a sesenta y cinco.'],
  ], { maxH: 420 }), { css: DS_CSS }),

  K.molde('Receta doble rendija / redes: **rendijas tapadas = red con otro $d$ y otro $N$**. Y el 17: **láminas en un medio** ($e(n_l-n_{medio})$).',
    ['Lámina en un medio: $e(n_l-n)$; si $n_l<n$, resta', 'Orden 0 en el centro: las láminas se compensan', 'Red de $N$: $N-1$ ceros entre principales'],
    ['Con la central tapada, separación $2d$', 'b) cuenta **mínimos**, no máximos, con $N=3$'],
    [['Para este ejercicio sirven dos cosas de la hoja: la nota de rendijas tapadas, y el diecisiete, con láminas en un medio.'],
     ['Se repite: cada lámina aporta e por n lámina menos n medio, y si el índice es menor que el del medio, resta. Y en una red de N rendijas hay N menos uno ceros entre principales.'],
     ['Cambia que hay tres rendijas, y que en el b se cuentan mínimos.']]),

  K.S('a) Láminas', 'El espesor de la segunda lámina', `<div class="grid g2" style="align-items:center">${eqs([
      { t: 'e_1(n_1-n)=4\\cdot(1{,}5-1{,}32)=0{,}72\\ \\mu\\text{m}', s: 0 },
      { t: 'e_2(n_2-n)=e_2\\,(1{,}2-1{,}32)=-0{,}12\\,e_2', s: 1 },
      { t: '\\text{misma rendija: }0{,}72-0{,}12\\,e_2=0', s: 2 },
    ])}<div>${barras([{ lbl: 'lámina 1', segs: [{ w: 360, color: '#4cc2ff', txt: '+0,72 µm', id: 'd6-b1', pend: true }] }, { lbl: 'lámina 2', off: 360, segs: [{ w: -360, color: '#7ee0a1', txt: '−0,12 e₂', id: 'd6-b2', pend: true }] }], { w: 640 })}
      ${res('$e_2=6\\ \\mu$m, en la **misma** rendija', { s: 2, style: 'margin-top:16px' })}${callout('En la otra rendija daría $0{,}72+0{,}12e_2>0$: nunca vuelve al centro.', { s: 3, cls: 'warn', style: 'margin-top:16px' })}</div></div>`, [
    ['Ítem a. Con la del medio tapada, quedan las dos de los extremos, separadas dos d. El centro está a igual distancia de las dos. La lámina uno, sumergida, aporta cuatro por uno coma cinco menos uno coma tres dos: cero coma setenta y dos micrones.', growX('#d6-b1', { dur: 1200 })],
    ['La lámina dos tiene índice menor que el líquido: aporta menos cero coma doce por e dos. Resta camino.'],
    ['Para volver a cero, tiene que restarle al mismo rayo: va encimada en la misma rendija. Cero coma setenta y dos menos cero coma doce e dos igual a cero: e dos es seis micrones.', growX('#d6-b2', { dur: 1400 })],
    ['[A] ¿Y si la pongo en la otra rendija? [P] Le restaría al otro rayo, y la diferencia crecería: el orden cero se iría todavía más lejos.'],
  ]),

  K.S('b) Teoría', 'Tres rendijas: máximos y ceros', `<div style="display:grid;grid-template-columns:1fr 560px;gap:30px;align-items:center">
      ${plot({ w: 1100, h: 520, x: [-4.4, 4.4], y: [0, 9.5], ticksX: [-4, -3, -2, -1, 0, 1, 2, 3, 4], ticksY: [0, 9], xl: 'ΔCO / λ₀ (vecinas)', yl: 'I / I₀', id: 'd6-p', s: 0,
        curves: [{ f: I3, n: 3000, cls: 'c3', id: 'd6-pc' }],
        extra: (px, py) => [-3.957, 3.957].map(u => `<line x1="${px(u)}" y1="${py(9.4)}" x2="${px(u)}" y2="${py(0)}" style="stroke:var(--bad);stroke-width:4"/>`).join('') + `<text class="lbl c4" x="${px(3.957)}" y="${py(9.6)}" style="text-anchor:middle">borde</text>` })}
      ${ul(['@1 Principales en $\\Delta CO=m\\lambda_0$ ($I=9I_0$ en el centro)', '@1 Ceros en $\\frac p3\\lambda_0$, con $p$ no múltiplo de 3: **dos entre principales**', '@2 Cero de difracción: $\\Delta CO=\\frac da\\lambda_0=4\\lambda_0$'])}</div>`, [
    ['Ítem b. Sin láminas y con las tres abiertas, es una red de tres. Graficamos la intensidad en función de la diferencia de camino entre rendijas vecinas, en longitudes de onda.', `sweep('#d6-p #d6-pc',{dur:2600})`],
    ['Los principales están en los enteros. Entre dos principales hay dos ceros, en los tercios: un tercio, dos tercios, cuatro tercios, y así. Con N rendijas hay N menos uno ceros entre principales.'],
    ['Y el primer cero de difracción está donde d sobre a es cuatro: en cuatro longitudes de onda, justo donde caería el orden cuatro, que falta.'],
  ]),

  K.S('b) Conteo', '¿Cuántos mínimos entran en la pantalla?', `<div class="grid g2" style="align-items:center">${eqs([
      { t: '\\tg\\theta_{max}=\\frac{15}{65}\\ \\Rightarrow\\ \\sen\\theta_{max}=0{,}2249', s: 0 },
      { t: '\\frac{\\Delta CO_{max}}{\\lambda_0}=\\frac{1{,}32\\cdot8\\cdot0{,}2249}{0{,}6}=3{,}957', s: 1 },
      { t: '\\frac p3<3{,}957:\\ p=1,2,4,5,7,8,10,11', s: 2 },
      { t: '\\text{dif.: }\\sen\\theta=\\frac{0{,}6}{1{,}32\\cdot2}=0{,}2273\\ \\Rightarrow\\ y=15{,}17\\ \\text{cm}', s: 3 },
    ])}<div>${res('16 mínimos (8 por lado)', { s: 4 })}${callout('Con paraxial ($\\sen\\approx\\tg$), el cero de difracción entra: **18**. Sin aproximar: 16 (más probable).', { s: 4, cls: 'warn', style: 'margin-top:20px' })}</div></div>`, [
    ['El borde de la pantalla está a quince centímetros, a sesenta y cinco de distancia: seno del ángulo máximo, cero coma dos dos cuatro nueve.'],
    ['Ahí la diferencia de camino entre vecinas, con el índice del líquido, es tres coma nueve cinco siete longitudes de onda.'],
    ['Los ceros de interferencia que entran son los tercios menores que eso: ocho por lado.'],
    ['¿Y el cero de difracción? Está en seno igual a cero coma dos dos siete tres: quince coma diecisiete centímetros. Queda afuera, por menos de dos milímetros.'],
    ['Total: dieciséis mínimos. [A] ¿Y con la paraxial? [P] El cero de difracción caería adentro y serían dieciocho. Como el enunciado no la habilita, dieciséis.'],
  ]),

  K.trampas([
    '**Tapada la central:** separación $2d$ entre las abiertas.',
    '**$n_2<n$ resta camino:** la lámina 2 va en la **misma** rendija.',
    '**Ceros de $N=3$:** dos entre principales, en $\\frac p3\\lambda_0$.',
    '**$n=1{,}32$ en $\\Delta CO$ y en $\\beta$.**',
    '**Borde con $\\tg$:** el cero de difracción queda afuera por 1,7 mm (paraxial: 18).',
  ], [
    ['Las trampas. Primera: con la central tapada, las abiertas están a dos d.'],
    ['Segunda: la lámina de índice menor que el líquido resta: va en la misma rendija.'],
    ['Tercera: con tres rendijas hay dos ceros entre principales.'],
    ['Cuarta: el índice del líquido va en todos lados.'],
    ['Y quinta: el borde con la tangente. El cero de difracción queda afuera por muy poco.'],
  ]),

  K.receta([
    '**1.** Láminas en el medio: $e(n_l-n)$ ⇒ compensar en el centro.',
    '**2.** Red de $N$: principales en $m\\lambda_0$, ceros en $\\frac pN\\lambda_0$.',
    '**3.** Borde: $\\tg\\theta_{max}$ ⇒ $\\Delta CO_{max}$.',
    '**4.** Contar ceros de interferencia y de difracción dentro.',
  ], ['a) $e_2=6\\ \\mu$m, en la misma rendija', 'b) $\\Delta CO_{max}=3{,}957\\lambda_0$', '**16 mínimos** (18 con paraxial)'], [
    ['La receta. Uno: las láminas en el medio, compensadas en el centro.'],
    ['Dos: en una red de N, principales en los enteros y ceros en los enésimos.'],
    ['Tres: el borde de la pantalla en diferencia de camino.'],
    ['Cuatro: contar los ceros de interferencia y de difracción que entran.'],
    ['Resultados: seis micrones, y dieciséis mínimos.'],
  ]),
];
