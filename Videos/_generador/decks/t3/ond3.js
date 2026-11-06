// Ond 3 · 1P 20/4/2024, ej. 4: propagante -> estacionaria fijo–libre (x = 0 libre), y(x,t), K de un tramo, u_U(t).
// Resultados verificados (soluciones/Ond3.py): λ = 0,4 m, k = 5π m⁻¹, ω = 2000π s⁻¹, μ = 4·10⁻³ kg/m, F = 640 N;
// fijo–libre (L = 5λ/4), libre en x = 0; y = 2 mm cos(5πx) sen(2000πt); K[5;25 cm](1,5 ms) = 31,6 mJ (U = 0);
// u_U(0,3 m; t) = 0,316 sen²(2000πt) J/m, período 0,5 ms: máx. en 0,75; 1,25; 1,75 ms, ceros en 1 y 1,5 ms.
const { md, ul, card, callout, table, eqs, res, datos, img, molde, plot, cuerda } = require('../../lib');
const { seccion } = require('../common');

const SEC = 'Ond 3 · Estacionaria fijo–libre';
const B = 'b-ond';
const X0 = 120, X1 = 1380, PX = x => X0 + x / 50 * (X1 - X0); // cm -> px en cuerdas de 1500 de ancho
const K = Math.PI / 20; // k en 1/cm (5π 1/m)

// cuerda con el extremo LIBRE en x = 0 y el FIJO en x = L (lib.cuerda solo trae el fijo a la izquierda).
// data-model="ll" hace que standing()/snapshot() usen cos(kx), que es lo que corresponde acá.
function cuerdaLF(id, extra = '', o = {}) {
  const H = o.h || 360, Y = H / 2, A = o.A || 80;
  const ticks = [0, 10, 20, 30, 40, 50].map(x => `<line class="tick" x1="${PX(x)}" y1="${Y + 130}" x2="${PX(x)}" y2="${Y + 142}"/><text class="tk" x="${PX(x)}" y="${Y + 172}">${x}</text>`).join('');
  const nodos = [10, 30, 50].map(x => `<g class="nodo"${o.sNodes !== undefined ? ` data-s="${o.sNodes}" data-gap="90"` : ''}><circle cx="${PX(x)}" cy="${Y}" r="11"/><text x="${PX(x) - (x === 50 ? 30 : 0)}" y="${Y + 52}">${x}</text></g>`).join('');
  const libre = `<g class="libre"><line x1="${X0}" y1="${Y - 120}" x2="${X0}" y2="${Y + 120}"/><ellipse cx="${X0}" cy="${Y}" rx="14" ry="22" class="anillo" id="${id}-anillo-i"/></g>`;
  const fijo = `<g class="fijo"><rect x="${X1}" y="${Y - 90}" width="34" height="180" rx="4"/>${Array.from({ length: 7 }, (_, i) => `<line x1="${X1 + 34}" y1="${Y - 80 + i * 26}" x2="${X1 + 54}" y2="${Y - 60 + i * 26}"/>`).join('')}</g>`;
  return `<svg class="cuerda" viewBox="0 0 1500 ${H + 60}" id="${id}"${o.s !== undefined ? ` data-s="${o.s}"` : ''} style="${o.width ? `width:${o.width}px;` : ''}${o.style || ''}" data-x0="${X0}" data-x1="${X1}" data-y="${Y}" data-l="50" data-k="${K}" data-model="ll" data-a="${A}">
    <line class="eje" x1="${X0 - 20}" y1="${Y + 136}" x2="${X1 + 20}" y2="${Y + 136}"/>${ticks}<text class="tk" x="${X1 + 60}" y="${Y + 172}">cm</text>
    <line class="reposo" x1="${X0}" y1="${Y}" x2="${X1}" y2="${Y}"/>
    <path class="hilo" id="${id}-y" d="M${X0},${Y} L${X1},${Y}"/>
    ${libre}${fijo}${nodos}${extra}</svg>`;
}
// flecha SVG (para las velocidades)
const flecha = (x, y1, y2, cls = 'o3-vel') => {
  const s = Math.sign(y2 - y1);
  return `<g class="${cls}"><line x1="${x}" y1="${y1}" x2="${x}" y2="${y2 - s * 14}"/><path d="M${x - 12},${y2 - s * 18} L${x},${y2} L${x + 12},${y2 - s * 18} Z"/></g>`;
};

// ---- diapositiva de datos: propagante que viaja
const TW = { x0: 60, x1: 860, y: 210, L: 50 };
const tw = `<svg viewBox="0 0 920 420" style="width:860px;overflow:visible" class="o3-svg">
  <line x1="60" y1="210" x2="860" y2="210" class="o3-rep"/>
  <path id="o3-tw" d="M60,210 L860,210" class="o3-onda"/>
  <g data-s="1"><line x1="${60 + 5 * 16}" y1="70" x2="${60 + 45 * 16}" y2="70" class="o3-cota"/>
    <line x1="${60 + 5 * 16}" y1="55" x2="${60 + 5 * 16}" y2="85" class="o3-cota"/><line x1="${60 + 45 * 16}" y1="55" x2="${60 + 45 * 16}" y2="85" class="o3-cota"/>
    <text x="${60 + 25 * 16}" y="50" class="o3-lbl c3" text-anchor="middle">λ = vT = 40 cm</text></g>
  <line x1="60" y1="330" x2="860" y2="330" class="o3-eje"/>
  ${[0, 10, 20, 30, 40, 50].map(x => `<line x1="${60 + x * 16}" y1="322" x2="${60 + x * 16}" y2="338" class="o3-eje"/><text x="${60 + x * 16}" y="372" class="o3-tk" text-anchor="middle">${x}</text>`).join('')}
  <text x="880" y="372" class="o3-tk">cm</text>
  <text x="70" y="140" class="o3-lbl" fill="#93a4bc">→ v = 400 m/s</text>
</svg>`;
const twJs = `animFn('#o3-tw', {x0:60, x1:860, y:210, L:50}, (x,t) => 80*Math.sin(Math.PI/20*x - 2*Math.PI*t/1800), {dur: talk()});`;

// ---- ¿cuántos pedazos de onda entran? (bloques sobre la cuerda de 50 cm)
const BX = x => 160 + x * 24; // cm -> px
const bloques = `<svg viewBox="0 0 1700 520" style="width:1600px;overflow:visible" class="o3-svg">
  <text x="${BX(0)}" y="40" class="o3-lbl" fill="#93a4bc">cuerda de 50 cm</text>
  <rect x="${BX(0)}" y="60" width="${BX(50) - BX(0)}" height="26" rx="8" class="o3-bar"/>
  ${[0, 10, 20, 30, 40, 50].map(x => `<text x="${BX(x)}" y="120" class="o3-tk" text-anchor="middle">${x}</text>`).join('')}
  <g data-s="1">
    <text x="${BX(0)}" y="178" class="o3-lbl">medias ondas (λ/2 = 20 cm)</text>
    ${[0, 20].map(x => `<rect x="${BX(x) + 3}" y="196" width="${20 * 24 - 6}" height="74" rx="12" class="o3-blk"/><text x="${BX(x + 10)}" y="244" class="o3-lbl" text-anchor="middle">λ/2</text>`).join('')}
    <rect x="${BX(40) + 3}" y="196" width="${20 * 24 - 6}" height="74" rx="12" class="o3-blk bad"/><text x="${BX(50)}" y="244" class="o3-lbl c4" text-anchor="middle">no entra</text>
    <text x="${BX(64)}" y="244" class="o3-big c4">2,5 ✗</text>
  </g>
  <g data-s="2">
    <text x="${BX(0)}" y="338" class="o3-lbl">cuartos de onda (λ/4 = 10 cm)</text>
    ${[0, 10, 20, 30, 40].map((x, i) => `<rect x="${BX(x) + 3}" y="356" width="${10 * 24 - 6}" height="74" rx="12" class="o3-blk ${i % 2 ? 'b' : 'a'}"/><text x="${BX(x + 5)}" y="404" class="o3-lbl" text-anchor="middle">${i + 1}</text>`).join('')}
    <text x="${BX(53)}" y="404" class="o3-big c2">5, impar ✓</text>
  </g>
  <text data-s="3" x="${BX(0)}" y="500" class="o3-lbl c3">⇒ un extremo fijo y otro libre: L = 5·λ/4 (5º armónico)</text>
</svg>`;

// ---- ¿qué extremo es el fijo?
const marca = (txt, cls) => `<line x1="${PX(20)}" y1="12" x2="${PX(20)}" y2="248" class="o3-mk"/>`;
const cTop = cuerda({ id: 'o3-cfl', L: 50, n: 3, model: 'fl', w: 1500, h: 260, A: 75, ticks: [0, 10, 20, 30, 40, 50], extra: marca(), style: 'width:1180px' });
const cBot = cuerdaLF('o3-clf', marca(), { h: 260, A: 75, width: 1180, sNodes: 3 });

// ---- fase: foto en t1 con el punto x = 20 cm arriba
const p20 = `<g id="o3-p20" data-s="1"><circle class="pt" cx="${PX(20)}" cy="${180 - 80}" r="15"/>
  <line x1="${PX(20) + 30}" y1="${180 - 80}" x2="${PX(36)}" y2="${180 - 80}" class="o3-mk"/>
  <text x="${PX(20)}" y="${180 - 112}" class="o3-big2" text-anchor="middle" fill="#c49bff">x = 0,2 m: +2 mm</text></g>`;

// ---- b) tramo y velocidades en t2
const tramo = `<rect class="tramo" x="${PX(5)}" y="60" width="${PX(25) - PX(5)}" height="240" rx="12"/><text class="tl" x="${(PX(5) + PX(25)) / 2}" y="44">tramo [5 cm ; 25 cm]</text>`;
const vels = `<g data-s="2" id="o3-vels">${[0, 5, 15, 20, 25, 35, 40, 45].map(x => { const c = Math.cos(K * x); return flecha(PX(x), 180, 180 + 95 * c); }).join('')}</g>`;

// ---- c) nodo x = 30 cm con su tangente
const tan30 = `<g data-s="1"><line id="o3-tan" x1="${PX(30) - 120}" y1="180" x2="${PX(30) + 120}" y2="180" class="o3-tan"/>
  <circle cx="${PX(30)}" cy="180" r="16" class="o3-n30"/><text x="${PX(30)}" y="300" class="o3-big2" text-anchor="middle" fill="#ffc562">x = 0,3 m (nodo)</text></g>`;
// gira la tangente en x (cm) al ritmo de standing(): pendiente en px = A k sen(kx) c / (px por cm)
const tanJs = (sel, x, per, phase) => `
  const svg = S.querySelector('${sel}'), ln = S.querySelector('#o3-tan'); const A = +svg.dataset.a, k = +svg.dataset.k, ppc = (${X1}-${X0})/50, d = talk(), per = ${per}, ph = ${phase};
  const nk = Math.round(d/1000*24); const ang = c => Math.atan(A*k*Math.sin(k*${x})*c/ppc)*180/Math.PI;
  ln.style.transformBox = 'view-box'; ln.style.transformOrigin = '${PX(x)}px 180px';
  const cs = Array.from({length:nk+1}, (_,i) => Math.cos(2*Math.PI*(i/nk*d)/per + ph));
  ln.style.transform = 'rotate(' + ang(cs[cs.length-1]) + 'deg)';
  ln.animate(cs.map(c => ({transform: 'rotate(' + ang(c).toFixed(2) + 'deg)'})), {duration: d, easing: 'linear', fill: 'backwards'});
  standing('${sel}', {dur: d, per: per, phase: ph});`;

const yt1 = x => -2 * Math.cos(5 * Math.PI * x);
const cos2 = x => Math.cos(5 * Math.PI * x) ** 2;
const uU = t => 0.316 * Math.sin(2 * Math.PI * t) ** 2; // t en ms

const CSS = `.o3-svg{font-family:"Segoe UI",Arial,sans-serif;overflow:visible}
  .o3-svg .o3-rep{stroke:#33476a;stroke-width:3;stroke-dasharray:10 10}
  .o3-svg .o3-onda{fill:none;stroke:var(--accent);stroke-width:7;stroke-linecap:round}
  .o3-svg .o3-cota{stroke:var(--warn);stroke-width:4}
  .o3-svg .o3-eje{stroke:#4a6286;stroke-width:2}
  .o3-svg .o3-tk{fill:var(--dim);font-size:24px;font-family:Consolas,monospace}
  .o3-svg .o3-lbl{font-size:30px;font-weight:700;fill:var(--ink)}
  .o3-svg .o3-big{font-size:44px;font-weight:800}
  .o3-svg .c2{fill:var(--accent2)} .o3-svg .c3{fill:var(--warn)} .o3-svg .c4{fill:var(--bad)}
  .o3-svg .o3-bar{fill:#2a3d5c}
  .o3-svg .o3-blk{fill:rgba(111,220,140,.18);stroke:var(--accent);stroke-width:3}
  .o3-svg .o3-blk.b{fill:rgba(111,220,140,.32)}
  .o3-svg .o3-blk.bad{fill:rgba(255,111,125,.12);stroke:var(--bad);stroke-dasharray:12 8}
  svg.cuerda .o3-mk{stroke:var(--warn);stroke-width:3;stroke-dasharray:8 8}
  svg.cuerda .o3-big2{font-size:34px;font-weight:800}
  svg.cuerda .o3-vel line{stroke:var(--warn);stroke-width:6} svg.cuerda .o3-vel path{fill:var(--warn)}
  svg.cuerda .o3-tan{stroke:var(--warn);stroke-width:7;stroke-linecap:round}
  svg.cuerda .o3-n30{fill:var(--bad);stroke:#0d1522;stroke-width:3}
  .o3-row{display:grid;grid-template-columns:400px 1fr;align-items:center;gap:20px}
  .o3-tag{font-size:30px;line-height:1.35}
  .o3-tag .big{font-size:40px;font-weight:800}`;

module.exports = [
  seccion('Ond 3', 'Estacionaria fijo–libre', 'Primer parcial del 20/4/2024 · ejercicio 4',
    'Ejercicio de ondas número tres: primer parcial del veinte de abril de dos mil veinticuatro, ejercicio cuatro. Una cuerda con una onda estacionaria, en la que vamos a tener que descubrir qué extremo es fijo y cuál es libre.'),

  {
    sec: 'Ond 3 · Enunciado', title: 'Qué dice el enunciado', cls: B, chapter: SEC, css: CSS,
    html: `<div style="display:flex;flex-direction:column;gap:34px;align-items:center">${img('Ond3.jpg', { style: 'width:1250px' })}
      ${datos(['@1 $v = 400$ m/s', '@1 $L = 50$ cm', '@1 $m = 2$ g', '@2 $T = 1$ ms', '@3 en $t_1 = \\frac34T$: $x = 0{,}2$ m tiene su máximo, $y = +2$ mm'], { style: 'justify-content:center;max-width:1650px' })}</div>`,
    steps: [
      ['Este es el enunciado. Vamos anotando los datos a medida que aparecen.'],
      ['Una onda propagante viaja a cuatrocientos metros por segundo por una cuerda de cincuenta centímetros de largo y dos gramos de masa.'],
      ['El período de oscilación es de un milisegundo.'],
      ['Y hay un dato de la estacionaria: en el instante tres cuartos de período, el punto ubicado en x igual a cero coma dos metros tiene su desplazamiento máximo, más dos milímetros. Fijate que no dicen cómo son los extremos de la cuerda. Eso lo vamos a deducir.'],
      ['Piden tres cosas. La función de onda y su gráfico en t uno. La energía cinética del tramo entre cinco y veinticinco centímetros, en uno coma cinco milisegundos. Y el gráfico de la densidad de energía elástica en x igual a cero coma tres metros, entre cero coma setenta y cinco y uno coma setenta y cinco milisegundos.'],
    ],
  },

  {
    sec: 'Ond 3 · Antes de calcular', title: 'Buscar el molde en la hoja', cls: B, chapter: SEC,
    html: `${molde('Ejercicio 6 de la hoja: **estacionaria fijo–libre y gráfico de $u_U(t)$** (1C 2026). Del 7 sale cómo decidir el modelo y la fase; del 5, la integral de un tramo.', { s: 0 })}
      <div class="grid g2" style="margin-top:40px">
        ${card('Lo que se repite', ul(['Un extremo fijo y otro libre', '$u_U = \\frac12F(\\partial_x y)^2$ en un punto; período $\\frac T2$', 'Tramo de $\\frac\\lambda2$: $\\int\\cos^2 = \\frac{\\Delta x}{2}$']), { cls: 'ok', s: 1 })}
        ${card('Lo que cambia', ul(['El modelo **no está dado**: sale de $L$ y $\\lambda$', 'El libre está en $x = 0$ ⇒ $\\cos(kx)$', 'Los 2 mm ya son de la estacionaria: **no se duplica**']), { cls: 'warn', s: 2 })}
      </div>`,
    steps: [
      ['Antes de hacer cuentas, buscamos el molde en la hoja. El más parecido es el ejercicio seis: la estacionaria con un extremo fijo y otro libre, con el gráfico de la energía elástica en un punto.'],
      ['Se repite casi todo: la cuerda fijo–libre, la densidad de energía elástica en un punto con su gráfico, y la energía de un tramo de media longitud de onda, como en el ejercicio cinco.'],
      ['Cambian tres cosas. El modelo no está dado: sale de comparar el largo con la longitud de onda. El extremo libre queda en x igual a cero, así que va coseno de k x. Y la amplitud. [A] ¿No había que duplicarla? [P] Solo cuando te dan la amplitud de la propagante. Acá te dicen cuánto se mueve un punto de la estacionaria: eso ya es la amplitud.'],
    ],
  },

  {
    sec: 'Ond 3 · Datos', title: 'Lo que sale de los datos', cls: B, chapter: SEC, css: `.o3-dat{display:grid;grid-template-columns:880px 1fr;gap:50px;align-items:center}`,
    html: `<div class="o3-dat"><div>${tw}</div>
      ${eqs([
        { t: '\\lambda = vT = 400\\cdot10^{-3} = 0{,}4\\ \\text{m}', s: 1, cls: 'ok' },
        { t: 'k = \\frac{2\\pi}{\\lambda} = 5\\pi\\ \\text{m}^{-1}', s: 2 },
        { t: '\\omega = \\frac{2\\pi}{T} = 2000\\pi\\ \\text{s}^{-1}', s: 2 },
        { t: '\\mu = \\frac mL = \\frac{2\\cdot10^{-3}}{0{,}5} = 4\\cdot10^{-3}\\ \\tfrac{\\text{kg}}{\\text{m}}', s: 3 },
        { t: 'F = \\mu v^2 = 640\\ \\text{N}', s: 3, note: 'tensión' },
      ], { title: 'Datos de la onda' })}</div>`,
    steps: [
      ['Arrancamos por los datos de la onda. La propagante viaja por la cuerda y, en cada período, avanza una longitud de onda.', twJs],
      ['La longitud de onda es velocidad por período: cuatrocientos por diez a la menos tres, cero coma cuatro metros. Cuarenta centímetros, menos que el largo de la cuerda.', twJs],
      ['El número de onda, k, es dos pi sobre lambda: cinco pi por metro. Y omega es dos pi sobre el período: dos mil pi radianes por segundo.', twJs],
      ['La densidad lineal, mu, es la masa sobre el largo, todo en unidades del sistema internacional: cuatro por diez a la menos tres kilos por metro. Y la tensión sale de la velocidad: mu por v al cuadrado, seiscientos cuarenta newton. La vamos a usar en la energía elástica.', twJs],
    ],
  },

  {
    sec: 'Ond 3 · a) Modelo', title: '¿Cuántos pedazos de onda entran en 50 cm?', cls: B, chapter: SEC, css: CSS,
    html: `<div style="display:flex;justify-content:center">${bloques}</div>`,
    steps: [
      ['Ítem a. Primero, el modelo de cuerda. La pregunta es cuántos pedazos de onda entran en cincuenta centímetros.'],
      ['Si los dos extremos fueran fijos, o los dos libres, tendría que entrar un número entero de medias longitudes de onda. Media lambda son veinte centímetros: entran dos y media. No es entero, así que se descarta.'],
      ['Con un extremo fijo y otro libre, entre un nodo y un antinodo hay un cuarto de onda, y tiene que entrar un número impar de cuartos. Un cuarto son diez centímetros: entran cinco justos. Cinco es impar.'],
      ['Entonces la cuerda es fijo–libre, y el largo es cinco cuartos de lambda. Es el quinto armónico: la fundamental de esta cuerda sería de doscientos hertz, y acá vibra a mil.'],
    ],
  },

  {
    sec: 'Ond 3 · a) Modelo', title: '¿Cuál de los dos extremos es el fijo?', cls: B, chapter: SEC, css: CSS,
    html: `<div style="display:flex;flex-direction:column;gap:22px">
      <div class="o3-row"><div class="o3-tag"><span class="big">Fijo en $x=0$</span><br>$y \\propto \\sen(kx)$<br><span data-s="1" class="c4">$\\sen(5\\pi\\cdot0{,}2) = 0$: nodo ✗</span></div>${cTop}</div>
      <div class="o3-row" data-s="2"><div class="o3-tag"><span class="big">Libre en $x=0$</span><br>$y \\propto \\cos(kx)$<br><span class="c2">$\\cos(5\\pi\\cdot0{,}2) = -1$: antinodo ✓</span></div>${cBot}</div></div>`.replace(/\$([^$]+)\$/g, m => md(m)),
    steps: [
      ['Ahora, ¿cuál extremo es el fijo? Probamos los dos casos. Si el fijo está en x igual a cero, la forma es seno de k x. La línea punteada marca cero coma dos metros.', `standing('#o3-cfl',{dur:talk(), per:1500})`],
      ['Pero seno de cinco pi por cero coma dos es seno de pi: cero. Ese punto sería un nodo, quieto siempre. Y el enunciado dice que se mueve dos milímetros. Se descarta.', `standing('#o3-cfl',{dur:talk(), per:1500, end:'flat'})`],
      ['Entonces el libre está en x igual a cero, y la forma es coseno de k x. En cero coma dos, el coseno de pi vale menos uno: es un antinodo, el punto que más se mueve. Y en cero coma cinco, coseno de dos coma cinco pi vale cero: ahí está el nodo del extremo fijo.', `standing('#o3-clf',{dur:talk(), per:1500})`],
      ['[A] ¿Y dónde quedan los otros nodos? [P] Cada media onda, empezando a un cuarto de onda del extremo libre: en diez, treinta y cincuenta centímetros. Son tres nodos.', `standing('#o3-clf',{dur:talk(), per:1500})`],
    ],
  },

  {
    sec: 'Ond 3 · a) Función de onda', title: 'Amplitud y fase', cls: B, chapter: SEC, css: CSS + `.o3-fase{display:grid;grid-template-columns:800px 1fr;gap:30px;align-items:center}`,
    html: `<div class="o3-fase">${eqs([
      { t: 'y = A\\cos(kx)\\cos(\\omega t+\\varphi)', s: 0 },
      { t: 'A = 2\\ \\text{mm}', s: 1, note: '$x = 0{,}2$ es antinodo', cls: 'ok' },
      { t: 'A\\underbrace{\\cos(\\pi)}_{-1}\\cos\\!\\left(\\tfrac{3\\pi}{2}+\\varphi\\right) = +A', s: 2 },
      { t: '\\tfrac{3\\pi}{2}+\\varphi = \\pi \\;\\Rightarrow\\; \\varphi = -\\tfrac{\\pi}{2}', s: 3, cls: 'ok' },
      { t: 'y = 2\\,\\text{mm}\\,\\cos(5\\pi x)\\,\\sen(2000\\pi t)', s: 4, cls: 'hl' },
    ])}
      <div>${cuerdaLF('o3-cf', p20, { A: 80, width: 900 })}<div style="text-align:center;font-size:30px;color:var(--muted);margin-top:6px">foto en $t_1 = \\frac34T$</div></div></div>`.replace(/foto en \$([^$]+)\$/, (m, t) => 'foto en ' + md('$' + t + '$')),
    steps: [
      ['Con el modelo, la onda se escribe: y igual a A, coseno de k x, coseno de omega t más fi. Nos faltan la amplitud y la fase.', `standing('#o3-cf',{dur:talk(), per:1500, phase:-Math.PI/2})`],
      ['La amplitud sale directo del dato. Cero coma dos es un antinodo, y su desplazamiento máximo es de dos milímetros. Entonces A vale dos milímetros, sin duplicar.', `snapshot('#o3-cf',-1,{dur:900})`],
      ['Para la fase, reemplazamos el dato. En x igual a cero coma dos, el coseno de k x vale menos uno. En t uno, omega t es tres pi medios. Queda menos A, por coseno de tres pi medios más fi, y eso tiene que dar más A.', `snapshot('#o3-cf',-1,{dur:10})`],
      ['Entonces el coseno de tres pi medios más fi vale menos uno, y ese ángulo tiene que ser pi: fi es menos pi medios. [A] ¿Y por qué al final aparece un seno? [P] Porque coseno de omega t menos pi medios es lo mismo que seno de omega t. Queda más prolijo.', `snapshot('#o3-cf',-1,{dur:10})`],
      ['La onda queda: dos milímetros, por coseno de cinco pi x, por seno de dos mil pi t. Chequeamos: en cero coma dos y tres cuartos de período, menos uno por menos uno da más dos milímetros. Coincide.', `snapshot('#o3-cf',-1,{dur:10})`],
    ],
  },

  {
    sec: 'Ond 3 · a) Gráfico', title: 'La cuerda en t₁ = 0,75 ms', cls: B, chapter: SEC,
    html: `<div style="display:flex;flex-direction:column;align-items:center;gap:20px">
      ${eqs([{ t: '\\sen(\\omega t_1) = \\sen\\tfrac{3\\pi}{2} = -1 \\;\\Rightarrow\\; y(x,t_1) = -2\\,\\text{mm}\\,\\cos(5\\pi x)', s: 0 }], { style: 'padding:14px 36px' })}
      ${plot({ w: 1500, h: 470, x: [0, 0.5], y: [-2.6, 2.6], ticksX: [0, 0.1, 0.2, 0.3, 0.4, 0.5], ticksY: [-2, 0, 2], xl: 'x (m)', yl: 'y (mm)', id: 'o3-pt1', s: 1, style: 'width:1450px',
        curves: [{ f: yt1, id: 'o3-yt1', n: 500 }],
        extra: (px, py) => [[0, -2, 'libre'], [0.2, 2, ''], [0.4, -2, '']].map(([x, y]) => `<circle class="dot pending" data-s="1" cx="${px(x)}" cy="${py(y)}" r="11"/>`).join('') +
          [0.1, 0.3, 0.5].map(x => `<circle class="pending" data-s="1" cx="${px(x)}" cy="${py(0)}" r="11" style="fill:#ff6f7d"/>`).join('') +
          `<text class="lbl c4 pending" data-s="1" x="${px(0.5) - 10}" y="${py(0) - 22}" style="text-anchor:end">fijo</text>` })}
      ${callout('Máxima elongación: **toda la cuerda está quieta**, cada punto en su extremo.', { s: 2, cls: 'ok' })}</div>`,
    steps: [
      ['Para graficarla en t uno: el seno de tres pi medios vale menos uno, así que la cuerda queda menos dos milímetros por coseno de cinco pi x.'],
      ['Empieza en menos dos en el extremo libre, cruza el cero en diez centímetros, sube a más dos en veinte, cruza otra vez en treinta, baja a menos dos en cuarenta y termina en cero en el extremo fijo.', `sweep('#o3-pt1 #o3-yt1',{dur:talk(600)})`],
      ['Es un instante de máxima elongación: toda la cuerda está quieta, con cada punto en su extremo.'],
    ],
  },

  {
    sec: 'Ond 3 · b) Energía cinética', title: '¿Cómo está la cuerda en t₂ = 1,5 ms?', cls: B, chapter: SEC, css: CSS,
    html: `<div style="display:flex;flex-direction:column;align-items:center;gap:10px">
      ${eqs([{ t: '\\frac{t_2}{T} = 1{,}5 \\;\\Rightarrow\\; \\omega t_2 = 3\\pi \\;\\Rightarrow\\; \\sen(3\\pi) = 0,\\;\\; \\cos(3\\pi) = -1', s: 1 }], { style: 'padding:14px 36px' })}
      ${cuerdaLF('o3-cb', tramo + vels, { A: 80, width: 1350 })}
      ${callout('Cuerda horizontal ⇒ **$U = 0$** y velocidades máximas: toda la energía del tramo es **cinética**.', { s: 2, cls: 'ok' })}</div>`,
    steps: [
      ['Ítem b: la energía cinética del tramo entre cinco y veinticinco centímetros, en t dos igual a uno coma cinco milisegundos.'],
      ['Antes de integrar, miramos el instante. Uno coma cinco milisegundos es uno coma cinco períodos. Omega t dos es tres pi, y el seno de tres pi es cero.'],
      ['Entonces la cuerda está horizontal. No hay deformación, así que la energía elástica es cero. Y como el coseno de tres pi vale menos uno, las velocidades son máximas: toda la energía del tramo es cinética.', `standing('#o3-cb',{dur:talk(), per:1600, phase:-Math.PI/2, end:'flat'})`],
    ],
  },

  {
    sec: 'Ond 3 · b) Energía cinética', title: 'Energía cinética del tramo', cls: B, chapter: SEC, css: `.o3-kin{display:grid;grid-template-columns:1fr 800px;gap:30px;align-items:center}`,
    html: `<div class="o3-kin">${eqs([
      { t: 'K = \\int_{x_1}^{x_2}\\tfrac12\\,\\mu\\left(\\frac{\\partial y}{\\partial t}\\right)^2 dx', s: 0 },
      { t: '\\frac{\\partial y}{\\partial t} = A\\omega\\cos(kx)\\cos(\\omega t)', s: 1, note: 'en $t_2$: $\\cos^2 = 1$' },
      { t: '\\tfrac12\\mu\\omega^2A^2 = \\tfrac12\\cdot4\\cdot10^{-3}(2000\\pi)^2(2\\cdot10^{-3})^2 = 0{,}316\\ \\tfrac{\\text{J}}{\\text{m}}', s: 2 },
      { t: '\\int_{0{,}05}^{0{,}25}\\cos^2(5\\pi x)\\,dx = \\frac{\\Delta x}{2} = 0{,}1\\ \\text{m}', s: 3, cls: 'hl' },
      { t: 'K = 0{,}316\\cdot0{,}1', s: 4 },
    ])}
      <div>${plot({ w: 800, h: 480, x: [0, 0.5], y: [0, 1.2], ticksX: [0, 0.05, 0.15, 0.25, 0.35, 0.5], ticksY: [0, 0.5, 1], xl: 'x (m)', yl: 'cos²(5πx)', id: 'o3-pc', s: 3,
        curves: [{ f: cos2, cls: 'c5', id: 'o3-cf2', n: 500 }, { f: cos2, from: 0.05, to: 0.25, area: true, cls: 'c3', id: 'o3-ctr' }, { f: () => 0.5, cls: 'c2 dash', id: 'o3-half' }],
        extra: (px, py) => `<text class="lbl c2" x="${px(0.5) + 8}" y="${py(0.5) + 8}">½</text>` })}
      ${res('$K = 31{,}6$ mJ  ·  $U = 0$', { s: 4, style: 'margin-top:24px' })}</div></div>`,
    steps: [
      ['La energía cinética es la integral, a lo largo del tramo, de un medio de mu por la velocidad al cuadrado.'],
      ['La velocidad es la derivada temporal: A omega, coseno de k x, coseno de omega t. En t dos, el coseno de omega t al cuadrado vale uno.'],
      ['Las constantes salen afuera: un medio de mu, por omega al cuadrado, por A al cuadrado. Da cero coma trescientos dieciséis joules por metro.'],
      ['Falta la integral del coseno cuadrado entre cero coma cero cinco y cero coma veinticinco. El tramo mide veinte centímetros: justo media longitud de onda. Entonces el área es la mitad del largo, cero coma uno metros. [A] ¿Siempre es la mitad? [P] Solo si el tramo mide un número entero de medias ondas. Si no, hacés la integral completa.', `sweep('#o3-pc #o3-cf2',{dur:1500}); sweep('#o3-pc #o3-ctr-a, #o3-pc #o3-ctr',{delay:1100,dur:1700}); sweep('#o3-pc #o3-half',{delay:2500,dur:900})`],
      ['La energía cinética del tramo es cero coma trescientos dieciséis por cero coma uno: treinta y un coma seis milijoules. Y la elástica, cero.', `pulse('.res')`],
    ],
  },

  {
    sec: 'Ond 3 · c) Energía elástica', title: 'u_U en x = 0,3 m: un nodo', cls: B, chapter: SEC, css: CSS + `.o3-uu{display:grid;grid-template-columns:820px 1fr;gap:30px;align-items:center}`,
    html: `<div class="o3-uu">${eqs([
      { t: 'u_U = \\tfrac12F\\left(\\frac{\\partial y}{\\partial x}\\right)^2', s: 0 },
      { t: '\\frac{\\partial y}{\\partial x} = -Ak\\,\\sen(kx)\\,\\sen(\\omega t)', s: 1 },
      { t: 'x = 0{,}3:\\; \\sen^2(1{,}5\\pi) = 1', s: 1, cls: 'ok' },
      { t: '\\tfrac12FA^2k^2 = \\tfrac12\\cdot640\\,(2\\cdot10^{-3})^2(5\\pi)^2 = 0{,}316\\ \\tfrac{\\text{J}}{\\text{m}}', s: 3 },
      { t: 'u_U(t) = 0{,}316\\,\\sen^2(2000\\pi t)\\ \\tfrac{\\text{J}}{\\text{m}}', s: 4, cls: 'hl' },
    ])}
      <div>${cuerdaLF('o3-cc', tan30, { A: 80, width: 860 })}</div></div>`,
    steps: [
      ['Ítem c: la densidad de energía elástica en x igual a cero coma tres metros. Es un medio de la tensión por la pendiente al cuadrado.'],
      ['La pendiente es la derivada espacial: menos A k, seno de k x, seno de omega t. En cero coma tres, k x es uno coma cinco pi, y el seno al cuadrado vale uno.'],
      ['[A] Pero cero coma tres es un nodo. ¿No tiene energía cero? [P] La cinética sí es cero, porque el punto no se mueve. Pero la elástica depende de la pendiente, y en un nodo la cuerda se inclina al máximo. Mirá cómo gira la tangente.', tanJs('#o3-cc', 30, 1600, -Math.PI / 2)],
      ['El coeficiente es un medio de la tensión, por A al cuadrado, por k al cuadrado: otra vez cero coma trescientos dieciséis joules por metro. Da lo mismo que antes, porque la tensión por k al cuadrado es igual a mu por omega al cuadrado.'],
      ['Queda: u sub U de t, igual a cero coma trescientos dieciséis por seno cuadrado de dos mil pi t, en joules por metro.'],
    ],
  },

  {
    sec: 'Ond 3 · c) Gráfico', title: 'u_U(t) entre 0,75 ms y 1,75 ms', cls: B, chapter: SEC,
    html: `<div style="display:flex;flex-direction:column;align-items:center;gap:18px">
      ${plot({ w: 1500, h: 520, x: [0.75, 1.75], y: [0, 0.36], ticksX: [0.75, 0.875, 1, 1.125, 1.25, 1.375, 1.5, 1.625, 1.75], ticksY: [0, 0.158, 0.316], xl: 't (ms)', yl: 'u_U (J/m)', id: 'o3-pu', s: 0, style: 'width:1450px', pad: { l: 120, r: 60, t: 40, b: 70 },
        curves: [{ f: uU, id: 'o3-uu', n: 600, area: true }],
        extra: (px, py) => [0.75, 1.25, 1.75].map(t => `<circle class="dot pending" data-s="1" cx="${px(t)}" cy="${py(0.316)}" r="12"/>`).join('') +
          [1, 1.5].map(t => `<circle class="pending" data-s="1" cx="${px(t)}" cy="${py(0)}" r="12" style="fill:#ff6f7d"/>`).join('') +
          `<text class="lbl c3 pending" data-s="1" x="${px(1.25)}" y="${py(0.316) - 22}" style="text-anchor:middle">máx: cuerda en su extremo</text>` +
          `<text class="lbl c4 pending" data-s="1" x="${px(1)}" y="${py(0.03)}" style="text-anchor:middle" dy="-16">0: horizontal</text>` +
          `<g class="pending" data-s="0"><line class="mk" x1="${px(0.75)}" y1="${py(0.34)}" x2="${px(1.25)}" y2="${py(0.34)}"/><text class="lbl c1" x="${px(1)}" y="${py(0.34) - 12}" style="text-anchor:middle">período T/2 = 0,5 ms</text></g>` })}
      ${callout('Escalas: horizontal **1 cm = 0,125 ms**; vertical **1 cm = 0,05 J/m**. Nunca es negativa y los ceros son **redondeados**, no picos.', { s: 2, cls: 'ok' })}</div>`,
    steps: [
      ['Para el gráfico, primero el período. El seno cuadrado se repite cada medio período: cero coma cinco milisegundos. En el intervalo de un milisegundo entran dos ciclos completos.', `sweep('#o3-pu #o3-uu-a, #o3-pu #o3-uu',{dur:talk(500)})`],
      ['En cero coma setenta y cinco, el seno de uno coma cinco pi vale menos uno: es un máximo, cero coma trescientos dieciséis. En uno, cero. En uno coma veinticinco, máximo de nuevo. En uno coma cinco, cero. Y en uno coma setenta y cinco, otra vez máximo.'],
      ['Ojo con la forma: nunca es negativa, y en los ceros toca suave, sin hacer pico. Para las escalas que pide el enunciado, por ejemplo, un centímetro cada cero coma ciento veinticinco milisegundos y un centímetro cada cero coma cero cinco joules por metro.'],
    ],
  },

  {
    sec: 'Ond 3 · Cierre', title: 'Dónde es fácil equivocarse', cls: B, chapter: SEC,
    html: ul([
      '@0 **Duplicar la amplitud:** el $2A$ es solo si te dan la amplitud de la propagante. Acá $A = 2$ mm.',
      '@1 **Suponer fijo–fijo por costumbre:** $L/(\\lambda/2) = 2{,}5$ no es entero. Probar los modelos.',
      '@2 **Elegir $\\sen(kx)$ sin chequear:** pone un nodo en $0{,}2$ m y contradice el dato.',
      '@3 **"Un nodo no tiene energía":** la **elástica** es máxima ahí. Y elevá $A$ al cuadrado: la resolución del PDF pone 157,9 en lugar de 0,316 J/m.',
    ]),
    steps: [
      ['Los lugares donde es fácil equivocarse. Primero, duplicar la amplitud: el dos A es solo cuando te dan la de la propagante.'],
      ['Segundo, suponer fijo–fijo por costumbre. Dos medias ondas y media no entran en una cuerda fija en los dos extremos: siempre hay que probar los modelos.'],
      ['Tercero, elegir seno de k x sin chequear. Con seno, cero coma dos sería un nodo y contradice el dato.'],
      ['Y cuarto, en el ítem c, pensar que un nodo no tiene energía: la elástica es máxima ahí. Ojo también con elevar A al cuadrado. La resolución que trae el PDF pone ciento cincuenta y siete coma nueve en lugar de cero coma trescientos dieciséis, porque usó A sin elevar.'],
    ],
  },

  {
    sec: 'Ond 3 · Cierre', title: 'La receta, en cinco pasos', cls: B, chapter: SEC,
    html: `<div class="grid g2" style="align-items:start">${ul([
      '@0 **1.** Datos: $\\lambda$, $k$, $\\omega$, $\\mu$ y la tensión $F = \\mu v^2$.',
      '@1 **2.** Modelo: ¿medias ondas enteras o cuartos impares?',
      '@2 **3.** Qué extremo es cuál: descartar el que pone un nodo donde hay movimiento.',
      '@3 **4.** Fase: reemplazar el dato del enunciado.',
      '@4 **5.** Instante → fracción de $T$, antes de integrar o graficar.',
    ])}${card('Resultados', `<div style="font-size:.88em;line-height:1.7">a) fijo–libre, libre en $x=0$<br>$y = 2\\text{ mm}\\cos(5\\pi x)\\sen(2000\\pi t)$<br>b) $K = 31{,}6$ mJ, $U = 0$<br>c) $u_U = 0{,}316\\,\\sen^2(2000\\pi t)$ J/m</div>`.replace(/\$([^$]+)\$/g, m => md(m)), { cls: 'ok', s: 5 })}</div>`,
    steps: [
      ['La receta. Uno: los datos de la onda, lambda, k, omega, mu y la tensión.'],
      ['Dos: el modelo, comparando el largo con medias ondas y con cuartos de onda.'],
      ['Tres: qué extremo es cuál, probando los dos y descartando el que pone un nodo donde hay movimiento.'],
      ['Cuatro: la fase, reemplazando el dato del enunciado.'],
      ['Y cinco: cada instante, pasarlo a fracción de período antes de integrar o de graficar.'],
      ['Y estos son los resultados. Si te dieron igual, vas muy bien. Si no, volvé al paso donde te separaste.'],
    ],
  },
];
