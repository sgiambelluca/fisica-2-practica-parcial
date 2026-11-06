// Geo 1 · intermedio 18/10/2025, ej. 3: divergente f' = −80 cm + espejo cóncavo R = −60 cm; imagen final sobre el objeto.
// Resultados verificados (soluciones/Geo1.py): s1' = −16 cm, A1 = 0,8; s3 = +16 cm (objeto de la vuelta); s2 = R ⇒ d = 44 cm;
// s2' = −60 cm, A2 = −1; s3' = +20 cm, A3 = 1,25; A = −1: real, invertida, mismo tamaño. Con d = 40 cm: s3' = 35,6 cm.
const { md, ul, card, callout, table, eqs, res, datos, img, molde } = require('../../lib');
const { seccion } = require('../common');

const SEC = 'Geo 1 · Divergente + espejo';
const B = 'b-geo';

// ---------------------------------------------------------------- banco óptico (x en cm, y en px sobre el eje)
const X = x => 50 + (x + 26) * 21;      // −26 cm … 50 cm  ->  50 … 1646 px
const AX = 231;                          // eje en y = 231 px
const Y = y => AX - y;
const h = 100;                           // altura del objeto (px)
const P = pts => 'M' + pts.map(p => `${X(p[0]).toFixed(1)},${Y(p[1]).toFixed(1)}`).join(' L');
const at = (A, Bp, x) => A[1] + (Bp[1] - A[1]) * (x - A[0]) / (Bp[0] - A[0]);
const D = 44;
const I1 = [-16, 0.8 * h], I2 = [-16, -0.8 * h], I3 = [-20, -h];
// rayos de la punta
const a0 = [-20, h], a1 = [0, h], a2 = [D, at(I1, a1, D)], a3 = [0, at(a2, I2, 0)], a4 = [-26, at(a3, I3, -26)];
const b0 = [-20, h], b1 = [0, 0], b2 = [D, at(b0, b1, D)], b3 = [0, at(b2, I2, 0)], b4 = [-26, at(b3, I3, -26)];
// rayo de la base (pasa por el centro del espejo y vuelve sobre sí mismo)
const c0 = [-20, 0], c1 = [0, 50], c2 = [D, at([-16, 0], c1, D)];

const flecha = (x, hh, cls, o = {}) => {
  const x0 = X(x), y1 = Y(hh), dir = hh > 0 ? 1 : -1;
  return `<g class="${cls}${o.pend ? ' pending' : ''}"${o.id ? ` id="${o.id}"` : ''}${o.s !== undefined ? ` data-s="${o.s}"` : ''}>
    <line x1="${x0}" y1="${AX}" x2="${x0}" y2="${y1 + dir * 14}"/><path d="M${x0 - 13},${y1 + dir * 22} L${x0},${y1} L${x0 + 13},${y1 + dir * 22} Z"/>
    ${o.label ? `<text x="${o.lx !== undefined ? o.lx : x0 + (o.dx || 0)}" y="${o.ly !== undefined ? o.ly : y1 - dir * 16 + (dir < 0 ? 26 : 0)}" text-anchor="middle">${o.label}</text>` : ''}</g>`;
};
const lente = (lbl = true) => `<path class="g1-lens" d="M${X(0) - 15},20 L${X(0) + 15},20 Q${X(0) + 3},${AX} ${X(0) + 15},442 L${X(0) - 15},442 Q${X(0) - 3},${AX} ${X(0) - 15},20 Z"/>
  ${lbl ? `<text class="g1-t" x="${X(0) + 24}" y="34">f′ = −80 cm</text>` : ''}`;
const espejo = (o = {}) => {
  const xm = X(D);
  let hatch = '';
  for (let i = 1; i < 10; i++) { const t = i / 10, x = xm - 15 + 2 * t * (1 - t) * 40, y = 0 + 462 * t; hatch += `<line class="g1-hatch" x1="${x + 4}" y1="${y}" x2="${x + 22}" y2="${y - 16}"/>`; }
  return `<g${o.id ? ` id="${o.id}"` : ''}${o.style ? ` style="${o.style}"` : ''}><path class="g1-mir" d="M${xm - 15},0 Q${xm + 25},${AX} ${xm - 15},462"/>${hatch}
    <text class="g1-t" x="${xm - 34}" y="26" text-anchor="end">R = −60 cm</text>
    ${o.marks !== false ? `<g class="g1-mk"><circle cx="${X(D - 60)}" cy="${AX}" r="9"/><text x="${X(D - 60)}" y="${AX + 38}" text-anchor="middle">C</text>
      <circle cx="${X(D - 30)}" cy="${AX}" r="9"/><text x="${X(D - 30)}" y="${AX + 38}" text-anchor="middle">F</text></g>` : ''}</g>`;
};
const eje = (ticks = []) => `<line class="g1-ax" x1="${X(-26)}" y1="${AX}" x2="${X(50)}" y2="${AX}"/>` +
  ticks.map(t => `<text class="g1-tk" x="${X(t)}" y="492" text-anchor="middle">${String(t).replace('-', '−')}</text><line class="g1-ax" x1="${X(t)}" y1="${AX - 6}" x2="${X(t)}" y2="${AX + 6}"/>`).join('');
const banco = (id, body, style = 'width:1480px') => `<svg class="g1-svg" id="${id}" viewBox="0 0 1700 500" style="${style}">${body}</svg>`;
const obj = (o = {}) => flecha(-20, h, 'g1-obj', Object.assign({ label: 'objeto' }, o));
const im1 = (o = {}) => flecha(-16, 0.8 * h, 'g1-im1', Object.assign({ label: 'imagen 1', lx: X(-16) + 80, ly: Y(0.8 * h) - 8 }, o));
const ray = (id, pts, cls = '') => `<path id="${id}" class="g1-ray ${cls} pending" d="${P(pts)}"/>`;

const CSS = `
  .g1-svg{overflow:visible;font-family:"Segoe UI",Arial,sans-serif}
  .g1-ax{stroke:#4a6286;stroke-width:3}
  .g1-tk{fill:var(--dim);font-size:22px;font-family:Consolas,monospace}
  .g1-t{fill:var(--muted);font-size:24px}
  .g1-lens{fill:rgba(196,155,255,.16);stroke:var(--geo);stroke-width:3}
  .g1-mir{fill:none;stroke:#dfe7f2;stroke-width:7;stroke-linecap:round}
  .g1-hatch{stroke:#8fa6c4;stroke-width:3}
  .g1-mk circle{fill:var(--geo);stroke:#0d1522;stroke-width:3} .g1-mk text{fill:var(--geo);font-size:26px;font-weight:700}
  .g1-obj line{stroke:var(--warn);stroke-width:6} .g1-obj path{fill:var(--warn)} .g1-obj text{fill:var(--warn);font-size:24px;font-weight:700}
  .g1-im1 line{stroke:var(--geo);stroke-width:5;stroke-dasharray:9 7} .g1-im1 path{fill:var(--geo)} .g1-im1 text{fill:var(--geo);font-size:24px;font-weight:700}
  .g1-im2 line{stroke:#8fa6c4;stroke-width:4;stroke-dasharray:6 8} .g1-im2 path{fill:#8fa6c4;opacity:.7} .g1-im2 text{fill:#8fa6c4;font-size:22px}
  .g1-fin line{stroke:var(--accent2);stroke-width:7} .g1-fin path{fill:var(--accent2)} .g1-fin text{fill:var(--accent2);font-size:24px;font-weight:700}
  .g1-ray{fill:none;stroke:var(--warn);stroke-width:4;stroke-linejoin:round}
  .g1-ray.ext{stroke-dasharray:10 8;stroke-width:3;opacity:.85}
  .g1-ray.back{stroke:var(--accent2)}
  .g1-ray.ax{stroke:#ff9be0;stroke-width:5}
  .g1-ray.axb{stroke:#ffffff;stroke-width:3;stroke-dasharray:12 10}
  .g1-ray.ghost{stroke:#8fa6c4;stroke-dasharray:6 8;stroke-width:3}
  .g1-plus text{fill:var(--accent2);font-size:28px;font-weight:800} .g1-plus line{stroke:var(--accent2);stroke-width:4}
  .g1-tgt{fill:none;stroke:var(--accent2);stroke-width:3;stroke-dasharray:8 7}
  .g1-dim line{stroke:var(--muted);stroke-width:2} .g1-dim text{fill:var(--ink);font-size:26px;font-weight:700}
  .g1-chip{display:inline-flex;align-items:center;justify-content:center;min-width:200px;padding:18px 26px;border-radius:20px;border:2px solid var(--line);background:var(--panel2);font-size:1.1em}
  .g1-x{font-size:1.4em;color:var(--muted);padding:0 6px}
`;

// flecha "+" sobre el eje
const plus = (id, dir, x, s) => {
  const x0 = X(x), x1 = x0 + dir * 110;
  return `<g class="g1-plus pending" id="${id}"${s !== undefined ? ` data-s="${s}"` : ''}><line x1="${x0}" y1="${AX + 70}" x2="${x1}" y2="${AX + 70}"/>
    <path d="M${x1},${AX + 70} L${x1 - dir * 18},${AX + 60} L${x1 - dir * 18},${AX + 80} Z" style="fill:var(--accent2)"/>
    <text x="${(x0 + x1) / 2}" y="${AX + 56}" text-anchor="middle">+</text></g>`;
};

// ---------------------------------------------------------------- espejo grande (teoría): centro C y foco F
const M = (() => {
  const C = [430, 290], R = 640, F = [C[0] + R / 2, C[1]];
  const Pm = a => [C[0] + R * Math.cos(a), C[1] + R * Math.sin(a)];
  const deg = Math.PI / 180;
  const top = Pm(-24 * deg), bot = Pm(24 * deg);
  let rays = '', back = '';
  [-18, -9, 9, 18].forEach((a, i) => {
    const p = Pm(a * deg);
    rays += `<path class="g1-ray pending g1-mr" d="M${C[0]},${C[1]} L${p[0].toFixed(1)},${p[1].toFixed(1)}"/>`;
    back += `<path class="g1-ray back pending g1-mb" style="stroke-dasharray:12 9" d="M${p[0].toFixed(1)},${p[1].toFixed(1)} L${C[0]},${C[1]}"/>`;
  });
  // rayo desde F: reflexión exacta
  const a = 13 * deg, p = Pm(a), n = [Math.cos(a), Math.sin(a)];
  let u = [p[0] - F[0], p[1] - F[1]]; const L = Math.hypot(...u); u = [u[0] / L, u[1] / L];
  const dot = u[0] * n[0] + u[1] * n[1], r = [u[0] - 2 * dot * n[0], u[1] - 2 * dot * n[1]];
  const end = [p[0] + r[0] * 700, p[1] + r[1] * 700];
  const fray = `<path id="g1-fr" class="g1-ray ax pending" d="M${F[0]},${F[1]} L${p[0].toFixed(1)},${p[1].toFixed(1)} L${end[0].toFixed(1)},${end[1].toFixed(1)}"/>`;
  let hatch = '';
  for (let k = -22; k <= 22; k += 5) { const q = Pm(k * deg); hatch += `<line class="g1-hatch" x1="${(q[0] + 4).toFixed(1)}" y1="${q[1].toFixed(1)}" x2="${(q[0] + 22).toFixed(1)}" y2="${(q[1] - 16).toFixed(1)}"/>`; }
  return `<svg class="g1-svg" viewBox="0 0 1120 580" style="width:1000px">
    <line class="g1-ax" x1="60" y1="${C[1]}" x2="1100" y2="${C[1]}"/>
    <path class="g1-mir" d="M${top[0].toFixed(1)},${top[1].toFixed(1)} A${R},${R} 0 0,1 ${bot[0].toFixed(1)},${bot[1].toFixed(1)}"/>${hatch}
    <g class="g1-mk"><circle cx="${C[0]}" cy="${C[1]}" r="11"/><text x="${C[0]}" y="${C[1] + 44}" text-anchor="middle">C (centro)</text>
      <circle cx="${F[0]}" cy="${F[1]}" r="11"/><text x="${F[0]}" y="${F[1] + 44}" text-anchor="middle">F</text></g>
    ${rays}${back}${fray}
    <text id="g1-frl" class="g1-t pending" x="${(end[0] + 40).toFixed(0)}" y="${(end[1] - 16).toFixed(0)}" style="fill:#ff9be0;font-weight:700">desde F: sale paralelo</text>
    <text id="g1-cl" class="g1-t pending" x="${C[0] - 20}" y="${C[1] - 210}" style="fill:var(--accent2);font-weight:700">desde C: vuelve sobre sí mismo</text>
  </svg>`;
})();

module.exports = [
  seccion('Geo 1', 'Divergente + espejo', 'Examen intermedio del 18/10/2025 · ejercicio 3',
    'Ejercicio de óptica geométrica número uno: examen intermedio del dieciocho de octubre de dos mil veinticinco, ejercicio tres. Una lente divergente y un espejo cóncavo. Queremos que la imagen final caiga justo sobre el objeto.'),

  {
    sec: 'Geo 1 · Enunciado', title: 'Qué dice el enunciado', cls: B, chapter: SEC, css: CSS,
    html: `<div style="display:flex;flex-direction:column;gap:34px;align-items:center">${img('Geo1.jpg', { style: 'width:1450px' })}
      ${datos(['@1 objeto a 20 cm: $s_1=-20$ cm', '@1 divergente: $f\'=-80$ cm', '@2 cóncavo: $R=-60$ cm', '@2 lente–espejo: $d$ (incógnita)', '@3 observador a la izquierda: ve la luz que **vuelve**', '@3 imagen final sobre el objeto'], { style: 'justify-content:center;max-width:1700px' })}</div>`,
    steps: [
      ['Este es el enunciado. Anotemos los datos con su signo: en óptica, el signo es la mitad del ejercicio.'],
      ['Un objeto está veinte centímetros a la izquierda de una lente divergente de ochenta centímetros de focal. Entonces s uno es menos veinte, y la focal, por ser divergente, es menos ochenta.'],
      ['A una distancia d a la derecha hay un espejo cóncavo de sesenta centímetros de radio. Para la cátedra, el cóncavo tiene radio negativo: menos sesenta.'],
      ['El observador está a la izquierda del objeto, así que ve la luz que vuelve: la que cruza la lente, rebota en el espejo y vuelve a cruzarla. Hay que encontrar d para que esa imagen final quede en el mismo lugar que el objeto.'],
      ['Y en el ítem b, caracterizar la imagen: su aumento, si está derecha o invertida, y si es real o virtual.'],
    ],
  },

  {
    sec: 'Geo 1 · Antes de calcular', title: 'Buscar el molde en la hoja', cls: B, chapter: SEC,
    html: `${molde('Ejercicio 11 de la hoja: **lente + espejo, los haces salen paralelos** (1C 2026). Abajo tiene una nota con **este mismo ejercicio** (18/10/25).', { s: 0 })}
      <div class="grid g2" style="margin-top:40px">
        ${card('Lo que se repite', ul(['Tres pasadas: lente → espejo → lente', 'La imagen de uno es el objeto del siguiente: $s_2=s_1\'-D$', 'Después del espejo, $+$ hacia la izquierda']), { cls: 'ok', s: 1 })}
        ${card('Lo que cambia', ul(['Condición final: imagen **sobre el objeto**, no rayos paralelos', 'El espejo ya es dato (cóncavo)', 'La incógnita es la distancia $d$']), { cls: 'warn', s: 2 })}
      </div>`,
    steps: [
      ['El molde en la hoja es el ejercicio once: lente más espejo, con haces que salen paralelos. Y abajo tiene una nota con este mismo ejercicio.'],
      ['Se repite el mecanismo: lente, espejo y otra vez lente, y la imagen de cada uno es el objeto del siguiente.'],
      ['Cambia la condición final: en el once la luz salía paralela, y acá la imagen tiene que caer sobre el objeto. La incógnita es la distancia d. [A] ¿Entonces sirve la misma receta? [P] Sí: elemento por elemento, cuidando el signo en cada uno.'],
    ],
  },

  {
    sec: 'Geo 1 · Teoría', title: 'Las herramientas y sus signos', cls: B, chapter: SEC,
    css: `.g1-teo{display:grid;grid-template-columns:1fr 620px;gap:40px;align-items:center}`,
    html: `<div class="g1-teo">${eqs([
      { t: '\\text{Lente: }\\ \\frac1{s\'}-\\frac1s=\\frac1{f\'}\\qquad A=\\frac{s\'}{s}', s: 1, note: '$s\'>0$: real' },
      { t: '\\text{Espejo: }\\ \\frac1{s\'}+\\frac1s=\\frac2R\\qquad A=-\\frac{s\'}{s}', s: 2, note: 'cóncavo: $R<0$' },
      { t: '\\text{Espejo: }\\ s\'<0\\ \\Rightarrow\\ \\text{real (adelante)}', s: 3, cls: 'hl' },
      { t: 's_{k+1}=s_k\'-D\\qquad A=A_1A_2A_3', s: 4 },
    ], { title: 'Convención de la cátedra' })}
      <div>${`<svg class="g1-svg" viewBox="0 0 620 420" style="width:600px">
        <line class="g1-ax" x1="20" y1="210" x2="600" y2="210"/>
        <path class="g1-lens" d="M150,60 L180,60 Q168,210 180,360 L150,360 Q162,210 150,60 Z"/>
        <path class="g1-mir" d="M500,60 Q540,210 500,360"/>
        <text class="g1-t" x="165" y="400" text-anchor="middle">lente</text><text class="g1-t" x="510" y="400" text-anchor="middle">espejo</text>
        <g class="g1-plus" data-s="0"><line x1="230" y1="120" x2="400" y2="120"/><path d="M400,120 L382,110 L382,130 Z" style="fill:var(--accent2)"/><text x="315" y="104" text-anchor="middle">+ en la ida</text></g>
        <g class="g1-plus" data-s="4"><line x1="440" y1="300" x2="230" y2="300"/><path d="M230,300 L248,290 L248,310 Z" style="fill:var(--accent2)"/><text x="335" y="284" text-anchor="middle">+ en la vuelta</text></g>
      </svg>`}</div></div>`,
    steps: [
      ['Repasemos las herramientas. Cada elemento tiene su origen en el vértice, y el positivo es el sentido de la luz que le llega.'],
      ['Lente delgada: uno sobre s prima menos uno sobre s es uno sobre f prima, y el aumento es s prima sobre s. Imagen positiva quiere decir real.'],
      ['Espejo: uno sobre s prima más uno sobre s es dos sobre R, y el aumento es menos s prima sobre s. El cóncavo tiene el centro del lado de la luz: radio negativo.'],
      ['[A] ¿Y en el espejo la imagen positiva también es real? [P] No, al revés. El espejo da vuelta la luz: la imagen real queda adelante, con s prima negativo.'],
      ['Para encadenar, la imagen de uno es el objeto del siguiente. Después del espejo la luz vuelve, así que en la lente de vuelta el positivo es hacia la izquierda. Y el aumento total es el producto.'],
    ],
  },

  {
    sec: 'Geo 1 · Teoría', title: 'La idea clave: la luz es reversible', cls: B, chapter: SEC,
    css: `.g1-rev{display:grid;grid-template-columns:1000px 1fr;gap:40px;align-items:center}`,
    html: `<div class="g1-rev"><div>${M}</div>
      ${ul(['@0 Un rayo que va al revés hace **el mismo camino**', '@1 Por el **centro** $C$ llega perpendicular ⇒ vuelve sobre sí mismo', '@2 Si la luz parece venir de $C$, desanda todo y vuelve **al objeto**', '@3 Por el **foco** $F$: sale paralelo (ejercicio 11)'])}</div>`,
    steps: [
      ['Ahora la idea que resuelve el ejercicio: la luz es reversible. Un rayo que va al revés hace exactamente el mismo camino.'],
      ['Un espejo esférico devuelve un rayo sobre sí mismo cuando le llega por un radio, o sea, pasando por el centro de curvatura. Llega perpendicular y vuelve por la misma línea.', `draw('.g1-mr',{dur:1200,stagger:250}); draw('.g1-mb',{delay:2200,dur:1200,stagger:250}); show('#g1-cl',{delay:3400})`],
      ['Entonces, si la luz que sale de la lente parece venir del centro del espejo, el espejo la devuelve, desanda todo el camino y termina en el objeto.', `flash('.g1-mk circle')`],
      ['[A] ¿Y si fuera el foco? [P] Es otra cosa: desde el foco los rayos salen paralelos, como en el ejercicio once. Para volver al mismo lugar hace falta el centro.', `draw('#g1-fr',{dur:2200}); show('#g1-frl',{delay:2000})`],
    ],
  },

  {
    sec: 'Geo 1 · a) Paso 1', title: 'Lente, ida: la imagen 1', cls: B, chapter: SEC,
    html: `${banco('g1-b5', eje([-20, -16, 0]) + lente() + obj() +
      ray('g1-5a', [a0, a1, [24, at(I1, a1, 24)]]) + ray('g1-5ae', [a1, [-26, at(I1, a1, -26)]], 'ext') +
      ray('g1-5b', [b0, b1, [8, at(b0, b1, 8)]]) + ray('g1-5be', [b1, I1], 'ext') +
      im1({ pend: true, id: 'g1-5i', lx: X(-16) + 20, ly: AX + 40 }) + `<text id="g1-5f" class="g1-t pending" x="${X(-26) + 4}" y="${Y(at(I1, a1, -26)) + 30}">← F′</text>`)}
      <div class="grid g2" style="margin-top:18px;align-items:center">${eqs([
        { t: '\\frac1{s_1\'}=\\frac1{f\'}+\\frac1{s_1}=\\frac1{-80}+\\frac1{-20}=-0{,}0625', s: 1 },
        { t: 's_1\'=-16\\ \\text{cm}\\qquad A_1=\\frac{s_1\'}{s_1}=\\frac{-16}{-20}=0{,}8', s: 3, cls: 'ok' },
      ])}${callout('Imagen 1: **virtual**, derecha, $0{,}8$ veces, 16 cm a la izquierda de la lente.', { s: 3, cls: 'ok' })}</div>`,
    steps: [
      ['Vamos con las cuentas. Primer paso: la lente, de ida, con s uno igual a menos veinte.'],
      ['Uno sobre s uno prima es uno sobre menos ochenta más uno sobre menos veinte: menos cero coma cero seis dos cinco.'],
      ['Con rayos: el que llega paralelo sale abriéndose, como si viniera del foco de la izquierda. El que pasa por el centro sigue derecho. Las prolongaciones se cruzan dieciséis centímetros a la izquierda de la lente.', `draw('#g1-5a',{dur:1600}); draw('#g1-5b',{delay:1200,dur:1400}); show('#g1-5ae, #g1-5be, #g1-5f',{delay:2800}); show('#g1-5i',{delay:3600,from:'fade'})`],
      ['Así que s uno prima es menos dieciséis, y el aumento, menos dieciséis sobre menos veinte, cero coma ocho. [A] ¿Por qué es virtual? [P] Porque solo se cruzan las prolongaciones, no los rayos. Es derecha y un poco más chica.'],
    ],
  },

  {
    sec: 'Geo 1 · a) Paso 2', title: 'Pensar desde el final: ¿qué necesita la vuelta?', cls: B, chapter: SEC,
    html: `${banco('g1-b6', eje([-20, -16, 0]) + lente() + obj() + im1() +
      `<rect class="g1-tgt pending" id="g1-6t" x="${X(-20) - 34}" y="${Y(h) - 50}" width="68" height="${2 * h + 70}" rx="16"/>
       <text id="g1-6tl" class="g1-t pending" x="${X(-20)}" y="${Y(-h) + 50}" text-anchor="middle" style="fill:var(--accent2);font-weight:700">imagen final acá</text>` +
      plus('g1-6p1', 1, 8, 0) + plus('g1-6p2', -1, -2) +
      `<g class="g1-dim pending" id="g1-6d"><line x1="${X(0)}" y1="${AX + 190}" x2="${X(-16)}" y2="${AX + 190}"/><text x="${(X(0) + X(-16)) / 2}" y="${AX + 180}" text-anchor="middle">s₃ = +16</text></g>`)}
      <div class="grid g2" style="margin-top:18px;align-items:center">${eqs([
        { t: "s_3'=+20\\ \\text{cm}\\quad(+\\ \\text{hacia la izquierda})", s: 1 },
        { t: '\\frac1{s_3}=\\frac1{s_3\'}-\\frac1{f\'}=\\frac1{20}+\\frac1{80}=\\frac1{16}', s: 2 },
        { t: 's_3=+16\\ \\text{cm}', s: 2, cls: 'ok' },
      ])}${callout('El objeto de la vuelta tiene que estar **donde estaba la imagen 1**.', { s: 3, cls: 'ok' })}</div>`,
    steps: [
      ['Segundo paso: pensemos desde el final. La imagen final tiene que estar donde está el objeto, veinte centímetros a la izquierda de la lente.', `show('#g1-6t, #g1-6tl',{from:'fade'})`],
      ['En la vuelta la luz va hacia la izquierda, así que ese es el positivo: s tres prima es más veinte.', `hide('#g1-6p1'); show('#g1-6p2',{delay:300})`],
      ['Con la misma focal, uno sobre s tres es un veinteavo más un ochentavo: un dieciseisavo. s tres es más dieciséis centímetros.', `show('#g1-6p2',{dur:10}); show('#g1-6d',{delay:1500})`],
      ['O sea: en la vuelta, la lente tiene que recibir su objeto dieciséis centímetros a su izquierda, justo donde estaba la imagen uno. [A] ¿Es casualidad? [P] No, es la reversibilidad: la lente lleva el objeto a la imagen uno, y de vuelta, la imagen uno al objeto.', `show('#g1-6p2, #g1-6d',{dur:10}); pulse('#g1-b6 .g1-im1')`],
    ],
  },

  {
    sec: 'Geo 1 · a) Paso 3', title: 'Espejo: el punto tiene que estar en su centro', cls: B, chapter: SEC,
    html: `${banco('g1-b7', eje([-20, -16, 0, 44]) + lente() + obj() + im1() + espejo({ id: 'g1-7m', style: 'transform:translate(-294px,0px)' }) +
      `<g class="g1-dim pending" id="g1-7d"><line x1="${X(0)}" y1="${AX + 190}" x2="${X(D)}" y2="${AX + 190}"/><text x="${(X(0) + X(D)) / 2}" y="${AX + 180}" text-anchor="middle">d = 44 cm</text></g>`)}
      <div class="grid g2" style="margin-top:18px;align-items:center">${eqs([
        { t: 's_2=-(d+16)\\qquad s_2\'=s_2', s: 0 },
        { t: '\\frac1{s_2}+\\frac1{s_2}=\\frac2R\\ \\Rightarrow\\ s_2=R=-60\\ \\text{cm}', s: 2 },
        { t: 'd+16=60', s: 4, cls: 'hl' },
      ])}<div>${res('$d=44$ cm $=0{,}44$ m', { s: 4 })}</div></div>`,
    steps: [
      ['Tercer paso: el espejo. Su objeto es la imagen uno, a d más dieciséis centímetros: s dos es menos, d más dieciséis.'],
      ['Y su imagen tiene que caer en ese mismo punto: s dos prima igual a s dos.'],
      ['En la ecuación del espejo queda dos sobre s dos igual a dos sobre R: s dos es igual a R. El punto tiene que estar en el centro de curvatura.'],
      ['Movamos el espejo. Su centro está siempre sesenta centímetros delante. Cuando cae sobre la imagen uno, ya está.', `along('#g1-7m', [[-294,0],[0,0]], {dur: talk(800), easing:'ease-in-out'}); flash('#g1-7m .g1-mk circle', {delay: talk(800)})`],
      ['Eso pasa con d más dieciséis igual a sesenta: d es cuarenta y cuatro centímetros. [A] ¿Puede haber otra solución? [P] El único otro punto que el espejo devuelve sobre sí mismo es su vértice, y pediría una distancia negativa.', `show('#g1-7d')`],
    ],
  },

  {
    sec: 'Geo 1 · a) Verificación', title: 'Los rayos, de ida y de vuelta', cls: B, chapter: SEC,
    html: `${banco('g1-b8', eje([-20, -16, 0, 44]) + lente(false) + espejo({ marks: false }) + obj() +
      ray('g1-8c', [c0, c1, c2], 'ax') + ray('g1-8cb', [c2, c1, c0], 'axb') +
      ray('g1-8a', [a0, a1, a2]) + ray('g1-8b', [b0, b1, b2]) +
      im1({ pend: true, id: 'g1-8i1', lx: X(-16) + 70, ly: Y(h) - 24 }) + flecha(-16, -0.8 * h, 'g1-im2', { pend: true, id: 'g1-8i2', label: 'no llega a formarse', lx: X(-16) + 150, ly: Y(-0.8 * h) + 34 }) +
      ray('g1-8ab', [a2, a3], 'back') + ray('g1-8bb', [b2, b3], 'back') +
      ray('g1-8ag', [a3, I2], 'ghost') + ray('g1-8bg', [b3, I2], 'ghost') +
      ray('g1-8af', [a3, a4], 'back') + ray('g1-8bf', [b3, b4], 'back') +
      flecha(-20, -h, 'g1-fin', { pend: true, id: 'g1-8fin', label: 'imagen final', lx: X(-20) - 20, ly: Y(-h) + 40 }), 'width:1560px')}
      ${datos(['@1 ida: rayos desde la imagen 1', '@2 vuelta: objeto virtual, $s_3=+16$ cm', '@3 imagen final: real e invertida, sobre el objeto'], { style: 'justify-content:center;margin-top:14px' })}`,
    steps: [
      ['Comprobemos con rayos. Un rayo desde la base del objeto: la lente lo abre como si viniera del centro del espejo, llega perpendicular y vuelve por el mismo camino.', `draw('#g1-8c',{dur:2200}); draw('#g1-8cb',{delay:2600,dur:2200})`],
      ['Ahora los rayos de la punta. Después de la lente parecen salir de la imagen uno, que está en el centro. El espejo forma de ella una imagen invertida, del mismo tamaño, en el mismo plano.', `draw('#g1-8a, #g1-8b',{dur:2200,stagger:300}); show('#g1-8i1',{delay:1500}); show('#g1-8i2',{delay:2600})`],
      ['Pero esos rayos no llegan a formarla: la lente los corta antes. Para la vuelta es un objeto virtual, dieciséis centímetros detrás de la lente.', `draw('#g1-8ab, #g1-8bb',{dur:1800,stagger:300}); show('#g1-8ag, #g1-8bg',{delay:1900})`],
      ['La lente los abre un poco y convergen veinte centímetros a su izquierda: sobre el objeto, cabeza abajo. Y de ahí siguen al ojo del observador.', `draw('#g1-8af, #g1-8bf',{dur:1800,stagger:300}); show('#g1-8fin',{delay:1600,from:'fade'})`],
    ],
  },

  {
    sec: 'Geo 1 · b) Caracterización', title: 'Tres aumentos que se multiplican', cls: B, chapter: SEC,
    html: `<div class="row" style="justify-content:center;gap:18px;margin-bottom:40px">
        <span class="g1-chip" data-s="0">${md('$A_1=0{,}8$')}</span><span class="g1-x" data-s="1">×</span>
        <span class="g1-chip" data-s="1">${md('$A_2=-1$')}</span><span class="g1-x" data-s="2">×</span>
        <span class="g1-chip" data-s="2">${md('$A_3=1{,}25$')}</span><span class="g1-x" data-s="3">=</span>
        <span class="g1-chip" data-s="3" id="g1-9t" style="border-color:var(--accent2);color:var(--accent2)">${md('$A=-1$')}</span></div>
      <div class="grid g2" style="align-items:center">${eqs([
        { t: 'A_2=-\\frac{s_2\'}{s_2}=-\\frac{-60}{-60}=-1', s: 1 },
        { t: '\\frac1{s_3\'}=\\frac1{-80}+\\frac1{16}=\\frac1{20}\\ \\Rightarrow\\ s_3\'=+20\\ \\text{cm}', s: 2 },
        { t: 'A_3=\\frac{s_3\'}{s_3}=\\frac{20}{16}=1{,}25', s: 2 },
      ])}${card('La imagen final es', ul(['@4 **real**: $s_3\'>0$, los rayos se cruzan de verdad', '@4 **invertida**: $A<0$', '@4 **del mismo tamaño**: $|A|=1$']), { cls: 'ok', s: 4 })}</div>`,
    steps: [
      ['Ítem b. Necesitamos los tres aumentos. El de la ida ya lo tenemos: cero coma ocho.'],
      ['El del espejo: menos s dos prima sobre s dos, los dos menos sesenta. Da menos uno.'],
      ['En la vuelta, uno sobre s tres prima es uno sobre menos ochenta más uno sobre dieciséis: un veinteavo. s tres prima es veinte, y el aumento, veinte sobre dieciséis: uno coma veinticinco.'],
      ['Multiplicando, cero coma ocho por menos uno por uno coma veinticinco da menos uno. Lo que la lente achica en la ida, lo agranda en la vuelta.', `pulse('#g1-9t')`],
      ['La imagen es real, porque los rayos se cruzan de verdad sobre el objeto; invertida, porque el aumento es negativo; y del mismo tamaño. [A] ¿Real, aunque esté del lado del objeto? [P] Sí: lo que decide es si los rayos se cruzan de verdad.'],
    ],
  },

  {
    sec: 'Geo 1 · Cierre', title: 'Dónde es fácil equivocarse', cls: B, chapter: SEC,
    html: ul([
      '@0 **Pedir que la imagen del espejo caiga sobre el objeto** ($d=40$ cm): se olvida la vuelta por la lente. Con $d=40$ la imagen final queda a 35,6 cm.',
      '@1 **Signos de los datos:** divergente ⇒ $f\'=-80$ cm; cóncavo ⇒ $R=-60$ cm.',
      '@2 **El espejo con la regla de las lentes:** en el espejo, $s\'<0$ es **real**.',
      '@3 **El $+$ en la vuelta** es hacia la izquierda: el objeto de la vuelta es virtual, $s_3=+16$.',
      '@4 **Centro y foco:** desde $C$ vuelve sobre sí mismo; desde $F$ sale paralelo.',
    ]),
    steps: [
      ['Dónde es fácil equivocarse. Lo más común es pedir que la imagen del espejo caiga sobre el objeto: da d igual a cuarenta y olvida la vuelta por la lente. Con cuarenta, la imagen final queda a treinta y cinco coma seis centímetros.'],
      ['Segundo, los signos de los datos: divergente es focal negativa, y cóncavo es radio negativo.'],
      ['Tercero, en el espejo, s prima negativo es imagen real.'],
      ['Cuarto, en la vuelta el positivo es hacia la izquierda: el objeto detrás de la lente es virtual y positivo.'],
      ['Y no confundas centro con foco: desde el centro la luz vuelve sobre sí misma; desde el foco sale paralela.'],
    ],
  },

  {
    sec: 'Geo 1 · Cierre', title: 'La receta, en cinco pasos', cls: B, chapter: SEC,
    html: `<div class="grid g2" style="align-items:start">${ul([
      '@0 **1.** Datos con signo: $s_1$, $f\'$, $R$.',
      '@1 **2.** Lente de ida: $s_1\'$ y $A_1$.',
      '@2 **3.** Desde el final: $s_3\'$ = lugar del objeto ⇒ $s_3$.',
      '@3 **4.** Espejo: su imagen sobre su objeto ⇒ $s_2=R$ ⇒ $d$.',
      '@4 **5.** Aumentos: $A=A_1A_2A_3$; real, invertida o no.',
    ])}${card('Resultados', `<div style="font-size:.9em;line-height:1.7">${md('$s_1\'=-16$ cm (virtual, $A_1=0{,}8$)')}<br>${md('a) $d=44$ cm $=0{,}44$ m')}<br>${md('$s_2\'=-60$ cm, $A_2=-1$; $s_3\'=+20$ cm, $A_3=1{,}25$')}<br>${md('b) $A=-1$: **real, invertida, mismo tamaño**')}</div>`, { cls: 'ok', s: 5 })}</div>`,
    steps: [
      ['La receta. Uno: los datos con su signo.'],
      ['Dos: la lente de ida, con imagen y aumento.'],
      ['Tres: desde el final, el lugar del objeto da dónde tiene que estar el objeto de la vuelta.'],
      ['Cuatro: el espejo tiene que devolver ese punto sobre sí mismo, o sea, en su centro. De ahí sale d.'],
      ['Y cinco: multiplicar los aumentos para caracterizar la imagen.'],
      ['Resultados: d igual a cuarenta y cuatro centímetros, e imagen real, invertida y del mismo tamaño.'],
    ],
  },
];
