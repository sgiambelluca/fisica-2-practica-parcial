// Geo 4 · 1P 14/9/2024: cubo abierto lleno al ras con líquido n, fuente en el centro del fondo, atmósfera n' = 1,2; iluminado ≤ 60 %.
// Resultados verificados (soluciones/Geo4.py): tg θL ≤ √(0,6/π) = 0,4370 (r/a < 0,5: disco entero) ⇒ θL ≤ 23,61° ⇒ sen θL ≤ 0,4004
// ⇒ n ≥ 1,2/0,4004 = 2,997 ≈ 3,0. Panorama: n ≤ 2,078 ⇒ 100 %; 2,078–2,683 disco recortado; n > 2,683 disco entero.
const { md, ul, card, callout, eqs, res, plot } = require('../../lib');
const { seccion } = require('../common');
const { kit } = require('../fx');

const SEC = 'Geo 4 · Disco iluminado: rango de n';
const B = 'b-geo';
const K = kit(SEC, B);
// % iluminado de un cuadrado de lado 1 por un círculo centrado de radio r (integración numérica)
const frac = r => { if (r <= 0.5) return Math.PI * r * r; let s = 0; const N = 600; for (let i = 0; i < N; i++) { const x = -0.5 + (i + 0.5) / N; const hh = r * r - x * x; if (hh > 0) s += Math.min(Math.sqrt(hh), 0.5) * 2 / N; } return Math.min(s, 1); };
const pct = n => n <= 1.2 ? 100 : 100 * frac(Math.tan(Math.asin(1.2 / n)));

// corte del cubo: fuente en el fondo, rayos
const corte = (() => {
  const L = 120, T = 60, S = 440, cx = L + S / 2, fy = T + S, thL = 23.61 * Math.PI / 180;
  let rays = '';
  [-40, -30, -20, -10, 0, 10, 20, 30, 40].forEach((d, i) => {
    const th = d * Math.PI / 180, x = cx + S * Math.tan(th), sale = Math.abs(th) < thL;
    if (sale) { const tr = Math.asin(Math.min(1, 3 * Math.sin(Math.abs(th)) / 1.2)) * Math.sign(th); rays += `<path class="g4-ray ok pending g4-r" d="M${cx},${fy} L${x.toFixed(1)},${T} L${(x + 90 * Math.tan(tr)).toFixed(1)},${T - 90}"/>`; }
    else { const xr = x + S * 0.18 * Math.tan(th); rays += `<path class="g4-ray no pending g4-r" d="M${cx},${fy} L${x.toFixed(1)},${T} L${xr.toFixed(1)},${(T + S * 0.18).toFixed(1)}"/>`; }
  });
  const xl = cx - S * Math.tan(thL), xr = cx + S * Math.tan(thL);
  return `<svg class="g4-svg" viewBox="0 0 700 560" style="width:640px">
    <rect x="${L}" y="${T}" width="${S}" height="${S}" class="g4-cubo"/><text x="${L + 10}" y="${T + S - 14}" class="g4-t">líquido n</text><text x="${L + 10}" y="${T - 20}" class="g4-t">atmósfera n′ = 1,2</text>
    <rect id="g4-disco" class="pending" x="${xl}" y="${T - 6}" width="${xr - xl}" height="12" rx="4" style="fill:var(--warn)"/>
    ${rays}
    <g id="g4-lim" class="pending"><line x1="${cx}" y1="${fy}" x2="${xl}" y2="${T}" class="g4-lim"/><line x1="${cx}" y1="${fy}" x2="${xr}" y2="${T}" class="g4-lim"/>
      <line x1="${cx}" y1="${fy}" x2="${cx}" y2="${T}" class="g4-n"/><text x="${cx + 16}" y="${fy - 120}" class="g4-t" style="fill:var(--accent2)">θL</text>
      <text x="${(cx + xr) / 2 + 10}" y="${T + 34}" class="g4-t" style="fill:var(--warn)">r = a tg θL</text></g>
    <circle cx="${cx}" cy="${fy}" r="12" style="fill:var(--warn)"/><text x="${cx + 18}" y="${fy + 34}" class="g4-t">fuente</text>
    <text x="${L + S + 14}" y="${T + S / 2}" class="g4-t">h = a</text></svg>`;
})();
const vista = `<svg class="g4-svg" viewBox="0 0 420 420" style="width:380px"><rect x="20" y="20" width="380" height="380" class="g4-cubo"/>
  <circle id="g4-c" cx="210" cy="210" r="${(0.437 * 380).toFixed(1)}" style="fill:rgba(255,197,98,.6);stroke:var(--warn);stroke-width:3"/>
  <text x="210" y="218" text-anchor="middle" class="g4-t" style="fill:#07111f;font-weight:800">60 %</text><text x="210" y="415" text-anchor="middle" class="g4-t">vista de arriba: a × a</text></svg>`;

const CSS = `.g4-svg{overflow:visible;font-family:"Segoe UI",Arial,sans-serif}
  .g4-cubo{fill:rgba(76,140,255,.12);stroke:#8fa6c4;stroke-width:4} .g4-t{fill:var(--muted);font-size:24px}
  .g4-ray{fill:none;stroke-width:4} .g4-ray.ok{stroke:var(--warn)} .g4-ray.no{stroke:#8fa6c4;opacity:.75}
  .g4-lim{stroke:var(--accent2);stroke-width:4;stroke-dasharray:10 8} .g4-n{stroke:#6f86a8;stroke-width:2;stroke-dasharray:6 8}`;

module.exports = [
  seccion('Geo 4', 'Disco iluminado: rango de n', 'Primer parcial del 14/9/2024 · ejercicio 1',
    'Ejercicio de óptica geométrica número cuatro: primer parcial del catorce de septiembre de dos mil veinticuatro. Un cubo con líquido y una luz en el fondo, en un planeta con otra atmósfera: hay que encontrar qué índices dejan iluminada como mucho el sesenta por ciento de la superficie.'),

  Object.assign(K.enunciado('Geo4.jpg', ['@1 cubo de arista $a$, abierto, lleno al ras', '@1 fuente en el **centro del fondo**: $h=a$', '@2 atmósfera: $n\'=1{,}2$', '@3 disco iluminado $\\le60\\ \\%$ de la superficie', '@3 ¿rango de $n$?'], [
    ['Este es el enunciado. Vamos con los datos.'],
    ['Un recipiente cúbico de arista a, abierto arriba y lleno al ras con un líquido de índice n. Una fuente puntual está en el centro del fondo: a una arista de la superficie.'],
    ['El planeta tiene una atmósfera de índice uno coma dos, no aire.'],
    ['Desde afuera se ve un disco iluminado en el centro, y el resto oscuro. Piden el rango de n para que el disco ocupe como mucho el sesenta por ciento de la superficie.'],
  ], { maxH: 430 }), { css: CSS }),

  K.molde('Ejercicio 8 de la hoja: **reflexión total, superficie iluminada** (1C 2025: cubo lleno al ras, $n\'=1{,}14$, 53 % ⇒ $n\\approx3{,}0$).',
    ['$h=a$; $r=a\\tg\\theta_L$', '$\\frac{\\pi r^2}{a^2}$ = fracción iluminada', '$\\sen\\theta_L=\\frac{n\'}{n}$; chequear $r<\\frac a2$'],
    ['La atmósfera tiene $n\'=1{,}2$', 'Piden un **rango** ("como máximo"): una desigualdad'],
    [['El molde es el ejercicio ocho de la hoja: el mismo cubo lleno al ras, con la fuente en el fondo.'],
     ['Se repite todo: la altura es a, el radio del disco es a tangente del ángulo límite, la fracción es pi r cuadrado sobre a cuadrado, y el seno del ángulo límite es n prima sobre n.'],
     ['Cambia que afuera no hay aire, y que piden un rango: hay que trabajar con una desigualdad y cuidar hacia dónde va.']]),

  K.S('Teoría', 'Por qué se ve un disco', `<div style="display:grid;grid-template-columns:660px 1fr;gap:30px;align-items:center">${corte}
      <div>${eqs([
        { t: 'n\\sen\\theta=n\'\\sen\\theta\'', s: 0 },
        { t: '\\sen\\theta_L=\\frac{n\'}{n}\\quad(n>n\')', s: 1, cls: 'hl' },
        { t: 'r=h\\tg\\theta_L=a\\tg\\theta_L', s: 2 },
      ])}</div></div>`, [
    ['La luz sale de la fuente en todas direcciones. Al llegar a la superficie, Snell: n seno de theta igual a n prima seno de theta prima.', `S.querySelectorAll('.g4-r').forEach((e,i)=>draw(e,{delay:i*250,dur:1400}))`],
    ['Como el líquido tiene más índice que la atmósfera, el rayo refractado se abre. Si el ángulo de incidencia supera el ángulo límite, con seno igual a n prima sobre n, no sale: se refleja todo. Los rayos grises vuelven al líquido.'],
    ['Solo salen los rayos que llegan con un ángulo menor al límite: forman un disco de radio h tangente de theta L. Como la fuente está en el fondo, h es a. [A] ¿Por qué tangente y no seno? [P] Porque es un triángulo rectángulo con cateto vertical a y cateto horizontal r.', `show('#g4-lim',{from:'fade'}); show('#g4-disco',{delay:600,from:'fade'})`],
  ]),

  K.S('Resolución', 'Como mucho el 60 %', `<div style="display:grid;grid-template-columns:1fr 400px;gap:30px;align-items:center">${eqs([
      { t: '\\pi a^2\\tg^2\\theta_L\\le0{,}6\\,a^2', s: 0 },
      { t: '\\tg\\theta_L\\le\\sqrt{0{,}6/\\pi}=0{,}4370\\quad(<0{,}5:\\ \\text{entra})', s: 1 },
      { t: '\\theta_L\\le23{,}61°\\ \\Rightarrow\\ \\sen\\theta_L\\le0{,}4004', s: 2 },
      { t: 'n\\ge\\frac{1{,}2}{0{,}4004}=2{,}997', s: 3, cls: 'ok' },
    ])}<div>${vista}${res('$n\\ge2{,}997\\approx3{,}0$', { s: 3, style: 'margin-top:16px' })}</div></div>`, [
    ['El área del disco es pi a cuadrado tangente cuadrado de theta L, y tiene que ser como mucho cero coma seis a cuadrado. La arista se simplifica.'],
    ['Tangente de theta L, menor o igual que la raíz de cero coma seis sobre pi: cero coma cuatro tres siete. Como es menor que un medio, el disco entra entero en la cara.'],
    ['El ángulo límite es como mucho veintitrés coma seis grados, y su seno, cero coma cuatro cero cero cuatro.'],
    ['Con seno de theta L igual a uno coma dos sobre n: n mayor o igual que dos coma nueve nueve siete, casi tres. [A] ¿Por qué mayor y no menor? [P] Porque más índice da un ángulo límite más chico y un disco más chico. Para que el disco no pase el sesenta por ciento, n tiene que ser grande.', `(()=>{const c=S.querySelector('#g4-c');c.animate([{r:'190px'},{r:'166px'}],{duration:1800,easing:'ease-in-out',fill:'backwards'});})()`],
  ]),

  K.S('Panorama', 'Cómo cambia lo iluminado con n', `<div style="display:grid;grid-template-columns:1fr 520px;gap:30px;align-items:center">
      ${plot({ w: 1060, h: 520, x: [1, 4.5], y: [0, 105], ticksX: [1.2, 2.078, 2.683, 2.997, 4], ticksY: [0, 60, 78.5, 100], fmtX: v => String(v).replace('.', ','), fmtY: v => String(v).replace('.', ','), xl: 'n', yl: '% iluminado', id: 'g4-p', s: 0,
        curves: [{ f: pct, n: 700, id: 'g4-pc' }, { f: () => 60, cls: 'c3 dash', id: 'g4-p60' }],
        extra: (px, py) => `<rect x="${px(2.997)}" y="${py(105)}" width="${px(4.5) - px(2.997)}" height="${py(0) - py(105)}" style="fill:rgba(126,224,161,.08)"/><text class="lbl c2" x="${px(3.6)}" y="${py(90)}">n ≥ 2,997</text>` })}
      ${ul(['@1 $n\\le2{,}078$: el círculo cubre hasta las esquinas ⇒ 100 %', '@2 $2{,}078<n<2{,}683$: círculo recortado por los bordes', '@3 $n>2{,}683$: disco entero, como en la figura'])}</div>`, [
    ['Veamos el panorama completo: el porcentaje iluminado en función de n. Cuanto más grande es n, más chico el disco.', `sweep('#g4-p #g4-pc',{dur:2400}); sweep('#g4-p #g4-p60',{delay:1600,dur:1000})`],
    ['Hasta dos coma cero siete ocho, el círculo es tan grande que llega a las esquinas: sale luz por toda la superficie.'],
    ['Entre dos coma cero siete ocho y dos coma seis ocho tres, el círculo queda recortado por los bordes de la cara.'],
    ['Y desde dos coma seis ocho tres es un disco entero, como en el enunciado. El sesenta por ciento se cruza en dos coma nueve nueve siete. No hay cota superior: n mayor o igual que dos coma nueve nueve siete.'],
  ]),

  K.trampas([
    '**$h=a$**, no $a/2$: la fuente está en el centro **del fondo**.',
    '**$r=h\\tg\\theta_L$**, no $h\\sen\\theta_L$.',
    '**$n\'=1{,}2$**, no 1 (con aire saldría $n\\ge2{,}497$).',
    '**Sentido de la desigualdad:** más $n$ ⇒ menos área ⇒ $n\\ge2{,}997$.',
    '**Chequear $r<a/2$** (si no, ya no es un disco entero).',
  ], [
    ['Las trampas. Primera: la fuente está en el centro del fondo, así que h es a, no a sobre dos.'],
    ['Segunda: el radio va con la tangente.'],
    ['Tercera: la atmósfera tiene índice uno coma dos.'],
    ['Cuarta: el sentido de la desigualdad. Más índice, menos área.'],
    ['Y quinta: chequear que el disco entra entero en la cara.'],
  ]),

  K.receta([
    '**1.** $r=h\\tg\\theta_L$ con $h$ = fuente–superficie.',
    '**2.** $\\frac{\\pi r^2}{a^2}\\le$ fracción ⇒ $\\tg\\theta_L$ máximo.',
    '**3.** $\\sen\\theta_L=\\frac{n\'}{n}$ ⇒ $n$ mínimo.',
    '**4.** Chequear $r<a/2$ y el sentido de la desigualdad.',
  ], ['$\\tg\\theta_L\\le0{,}437$; $\\theta_L\\le23{,}61°$', '$\\sen\\theta_L\\le0{,}4004$', '**$n\\ge2{,}997\\approx3{,}0$**'], [
    ['La receta. Uno: el radio del disco con la tangente del ángulo límite.'],
    ['Dos: la fracción iluminada da la tangente máxima.'],
    ['Tres: con el seno del ángulo límite, el índice mínimo.'],
    ['Cuatro: chequear que el disco entra y el sentido de la desigualdad.'],
    ['Resultado: n mayor o igual que dos coma nueve nueve siete, casi tres.'],
  ]),
];
