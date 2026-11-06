// Ond 7 · 1P 24/9/2015, ej. 1: oscilador (casi fijo) + anillo (libre), fijo–libre n = 5 (L = 9λ/4). Verificado (soluciones/Ond7.py):
// μ = 0,4 kg/m, v = 40 m/s, λ = 0,8 m, k = 2,5π m⁻¹, f = 50 Hz, ω = 100π s⁻¹, T = 20 ms; A_e = 10,07 cm, A = 5,03 cm;
// a) K[0,4;1](t_A = t_E + 5T) = 60 J; E[0,4;1](t_B = t_E + 1,6T) = 60 J (K = 39,27 J, U = 20,73 J); b) y = 0,0503 sen(2,5πx − 100πt) [m, s].
const { md, ul, card, callout, eqs, res, datos, img, molde, plot, cuerda } = require('../../lib');
const { seccion } = require('../common');

const SEC = 'Ond 7 · Oscilador y anillo';
const B = 'b-ond';
const PX = x => 120 + x / 1.8 * 1260; // x (m) -> px en las cuerdas de 1500 de ancho
const TICKS = [0, 0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.6, 1.8];

// oscilador (reemplaza al soporte fijo, que se oculta por CSS) y cartel del anillo
const osc = (Y = 180) => `<g><rect x="6" y="${Y - 80}" width="96" height="160" rx="12" fill="#1d2d47" stroke="#8fa6c4" stroke-width="3"/>
  <line x1="102" y1="${Y}" x2="120" y2="${Y}" stroke="#8fa6c4" stroke-width="5"/>
  <path d="M20,${Y} q11,-24 22,0 t22,0 t22,0" fill="none" stroke="#6fdc8c" stroke-width="4"/>
  <text x="54" y="${Y - 96}" font-size="24" fill="#93a4bc" text-anchor="middle">oscilador</text></g>
  <text x="1380" y="${Y - 136}" font-size="24" fill="#ffc562" text-anchor="middle">anillo</text>`;
const cFL = (id, extra = '', o = {}) => cuerda(Object.assign({ id, L: 1.8, n: 5, model: 'fl', w: 1500, h: 360, A: 80, ticks: TICKS, extra: osc() + extra }, o));
const tramo = `<rect class="tramo" x="${PX(0.4)}" y="70" width="${PX(1) - PX(0.4)}" height="220" rx="12"/><text class="tl" x="${(PX(0.4) + PX(1)) / 2}" y="54">tramo [0,4 m ; 1 m]</text>`;
// flujo de energía nulo en los bordes del tramo
const flujo = `<g id="o7-flujo" class="pending" data-s="3">
  <g transform="translate(${PX(0.4)},372)"><rect x="-92" y="0" width="184" height="44" rx="10" fill="#0b1626" stroke="#ff6f7d" stroke-width="2"/><text y="31" font-size="24" fill="#ff6f7d" text-anchor="middle">nodo: v = 0</text></g>
  <g transform="translate(${PX(1)},372)"><rect x="-120" y="0" width="240" height="44" rx="10" fill="#0b1626" stroke="#ff6f7d" stroke-width="2"/><text y="31" font-size="24" fill="#ff6f7d" text-anchor="middle">antinodo: pendiente 0</text></g></g>`;

// barras de energía del tramo (60 J = 240 px): K, U y la suma, que no cambia
const barras = `<svg viewBox="0 0 400 390" style="width:360px;overflow:visible" font-family="Segoe UI">
  <line x1="20" y1="330" x2="390" y2="330" stroke="#6f86a8" stroke-width="3"/>
  <line x1="20" y1="90" x2="390" y2="90" stroke="#7ee0a1" stroke-width="2" stroke-dasharray="10 8"/>
  <text x="390" y="74" font-size="26" fill="#7ee0a1" text-anchor="end" font-weight="700">60 J</text>
  <rect id="o7-bk" x="40" y="90" width="90" height="240" rx="6" fill="#4cc2ff"/>
  <rect id="o7-bu" x="160" y="90" width="90" height="240" rx="6" fill="#ffc562" style="transform:scaleY(0)"/>
  <rect x="280" y="90" width="90" height="240" rx="6" fill="#7ee0a1"/>
  <text x="85" y="370" font-size="30" fill="#4cc2ff" text-anchor="middle" font-weight="700">K</text>
  <text x="205" y="370" font-size="30" fill="#ffc562" text-anchor="middle" font-weight="700">U</text>
  <text x="325" y="370" font-size="30" fill="#7ee0a1" text-anchor="middle" font-weight="700">K+U</text></svg>`;

// dos propagantes y su suma (x de 0 a 1,8 m entre 40 y 860 px)
const SX = x => 40 + x / 1.8 * 820;
const sup = `<svg id="o7-sup" viewBox="0 0 900 640" style="width:720px;overflow:visible">
  <g font-size="26" font-family="Segoe UI" fill="#93a4bc">
    <text x="40" y="30">y₁ = A sen(kx − ωt) viaja →</text><text x="40" y="232">y₂ = A sen(kx + ωt) viaja ←</text><text x="40" y="420" fill="#6fdc8c">suma: estacionaria (2A)</text></g>
  ${[110, 312, 530].map(y => `<line x1="40" y1="${y}" x2="860" y2="${y}" stroke="#33476a" stroke-width="2" stroke-dasharray="8 8"/>`).join('')}
  <line x1="${SX(0.2)}" y1="60" x2="${SX(0.2)}" y2="610" stroke="#c49bff" stroke-width="2" stroke-dasharray="6 8"/>
  <text x="${SX(0.2)}" y="636" font-size="22" fill="#c49bff" text-anchor="middle">x = 0,2 m</text>
  <rect x="4" y="490" width="36" height="80" rx="6" fill="#1d2d47" stroke="#8fa6c4" stroke-width="3"/>
  <line x1="860" y1="430" x2="860" y2="630" stroke="#8fa6c4" stroke-width="5"/>
  <path id="o7-w1" d="M40,110 L860,110" fill="none" stroke="#5aa9ff" stroke-width="6"/>
  <path id="o7-w2" d="M40,312 L860,312" fill="none" stroke="#c49bff" stroke-width="6"/>
  <path id="o7-ws" d="M40,530 L860,530" fill="none" stroke="#6fdc8c" stroke-width="7"/>
  <g id="o7-cr" class="pending"><circle r="13" fill="#ffc562" stroke="#0d1522" stroke-width="3"/></g>
</svg>`;
const supJs = crest => `
  const g1 = {x0:40, x1:860, y:110, L:1.8}, g2 = {x0:40, x1:860, y:312, L:1.8}, gs = {x0:40, x1:860, y:530, L:1.8};
  const k = 2.5*Math.PI, per = 2200, w = 2*Math.PI/per, A = 40, d = talk();
  animFn('#o7-w1', g1, (x,t) => A*Math.sin(k*x - w*t), {dur:d});
  animFn('#o7-w2', g2, (x,t) => A*Math.sin(k*x + w*t), {dur:d});
  animFn('#o7-ws', gs, (x,t) => 2*A*Math.sin(k*x)*Math.cos(w*t), {dur:d});
  ${crest ? 'ond7_crest(d, per);' : ''}`;

// funciones de página (barras de energía y cresta que viaja)
const script = `<script>
function ond7_bars(dur, cycles) {
  const k = S.querySelector('#o7-bk'), u = S.querySelector('#o7-bu');
  const N = Math.max(2, Math.round(dur / 1000 * 24)), fk = [], fu = [];
  for (let i = 0; i <= N; i++) { const p = Math.PI / 2 + 2 * Math.PI * cycles * i / N; fk.push({ transform: 'scaleY(' + (Math.sin(p) ** 2).toFixed(4) + ')' }); fu.push({ transform: 'scaleY(' + (Math.cos(p) ** 2).toFixed(4) + ')' }); }
  [k, u].forEach(e => { e.style.transformBox = 'fill-box'; e.style.transformOrigin = '50% 100%'; });
  k.style.transform = fk[N].transform; u.style.transform = fu[N].transform;
  k.animate(fk, { duration: dur, easing: 'linear', fill: 'backwards' }); u.animate(fu, { duration: dur, easing: 'linear', fill: 'backwards' });
}
function ond7_crest(dur, per) {
  // cresta de y1 que en t = 0 está en x = 0,2 m: avanza lambda por período y vuelve a 0,2 cada dos períodos (2 lambda = 1,6 m)
  const e = S.querySelector('#o7-cr'); e.classList.remove('pending', 'gone');
  const X = x => 40 + x / 1.8 * 820, kf = [];
  for (let c = 0; c * 2 * per < dur; c++) {
    const t0 = c * 2 * per, t1 = Math.min((c + 1) * 2 * per, dur);
    kf.push({ transform: 'translate(' + X(0.2) + 'px,70px)', offset: t0 / dur });
    kf.push({ transform: 'translate(' + X(0.2 + 0.8 * (t1 - t0) / per) + 'px,70px)', offset: t1 / dur });
  }
  e.style.transform = 'translate(' + X(0.2 + 0.8 * ((dur / per) % 2)) + 'px,70px)';
  e.animate(kf, { duration: dur, easing: 'linear', fill: 'backwards' });
}
</script>`;

const sen2 = x => Math.sin(2.5 * Math.PI * x) ** 2;

module.exports = [
  seccion('Ond 7', 'Oscilador y anillo', 'Primer parcial del 24/9/2015 · ejercicio 1',
    'Ejercicio de ondas número siete: primer parcial del veinticuatro de septiembre de dos mil quince, ejercicio uno. Una cuerda entre un oscilador y un anillo: la energía de un tramo y la onda propagante que genera el oscilador.'),

  {
    sec: 'Ond 7 · Enunciado', title: 'Qué dice el enunciado', cls: B, chapter: SEC,
    css: `svg.cuerda[id^="o7c"] .fijo{display:none}`,
    html: `${script}<div style="display:flex;flex-direction:column;gap:26px;align-items:center">${img('Ond7.jpg', { style: 'width:1040px' })}
      ${datos(['@1 $m = 720$ g', '@1 $L = 1{,}8$ m', '@1 $F = 640$ N', '@2 $x = 0$: oscilador, casi fijo', '@2 $x = L$: anillo libre', '@3 en $t_E$: horizontal, $K = 180$ J',
      '@4 tramo $[0{,}4\\,;\\,1]$ m', '@4 $t_A = t_E + 0{,}1$ s', '@4 $t_B = t_E + 0{,}032$ s', '@5 $t = 0$: $x = 0{,}2$ m arriba de todo'], { style: 'justify-content:center;max-width:1700px' })}</div>`,
    steps: [
      ['Este es el enunciado. Vamos anotando los datos a medida que aparecen.'],
      ['Una cuerda de setecientos veinte gramos, uno coma ocho metros de largo y seiscientos cuarenta newtons de tensión.'],
      ['Un extremo está unido a un oscilador, prácticamente fijo. El otro, a un anillo sin peso que desliza por una varilla. La figura muestra el armónico.'],
      ['En un instante t sub E, la cuerda está horizontal y toda la cuerda tiene ciento ochenta joules de energía cinética.'],
      ['El ítem a pide la energía cinética del tramo entre cero coma cuatro y un metro, una décima de segundo después de t sub E. Y la energía mecánica del mismo tramo, treinta y dos milésimas después.'],
      ['El ítem b pide la propagante que genera el oscilador. El cero de tiempo es cuando el punto en x igual a cero coma dos metros está arriba de todo.'],
    ],
  },

  {
    sec: 'Ond 7 · Antes de calcular', title: 'Buscar el molde en la hoja', cls: B, chapter: SEC,
    html: `${molde('Ejercicios **5 b)**, **6** y **7** de la hoja: energía de un tramo mirando la fase, fijo–libre con $A_{est} = 2A$, y la fase a partir de lo que hace un punto.', { s: 0 })}
      <div class="grid g2" style="margin-top:40px">
        ${card('Lo que se repite', ul(['$v = \\sqrt{F/\\mu}$ y el modelo fijo–libre', 'Instante → fracción de período', 'Tramo de nodo a antinodo: $\\int = \\frac{\\Delta x}{2}$', 'Estacionaria = dos propagantes de amplitud $A$']), { cls: 'ok', s: 1 })}
        ${card('Lo que cambia', ul(['El dato es la cinética **total**: de ahí sale la amplitud', '$t_B$ no cae en un instante "lindo"', 'b) va al revés: de la estacionaria a la propagante']), { cls: 'warn', s: 2 })}
      </div>`,
    steps: [
      ['El molde en la hoja mezcla tres ejercicios: el cinco b, energía de un tramo; el seis, fijo–libre; y el siete, la fase a partir de un punto.'],
      ['Se repite casi todo: la velocidad con la tensión, el modelo, los instantes como fracción de período y la integral de un tramo.'],
      ['[A] ¿Y qué es lo nuevo? [P] La energía dato es la de toda la cuerda, y de ahí sale la amplitud. El instante t sub B no es un instante lindo. Y el ítem b va al revés: de la estacionaria a la propagante.'],
    ],
  },

  {
    sec: 'Ond 7 · El modelo', title: 'Oscilador ≈ nodo, anillo = antinodo', cls: B, chapter: SEC,
    html: `<div style="display:flex;flex-direction:column;align-items:center;gap:16px">${cFL('o7c1', '', { sNodes: 2, style: 'width:1420px' })}
      <div class="grid g2" style="width:100%;gap:30px;font-size:.9em">
        ${callout('**Oscilador:** mueve la punta muy poco ⇒ se toma como **nodo**', { s: 0 })}
        ${callout('**Anillo sin masa:** $F\\,\\frac{\\partial y}{\\partial x} = 0$ ⇒ pendiente nula ⇒ **antinodo**', { s: 1, cls: 'warn' })}
      </div>
      ${eqs([{ t: 'L = (2n-1)\\,\\frac{\\lambda}{4} = 9\\,\\frac{\\lambda}{4} \\quad\\Rightarrow\\quad n = 5', s: 3, cls: 'ok' }], { style: 'padding:14px 40px' })}</div>`,
    steps: [
      ['Primero, el modelo. El oscilador sacude la punta con una amplitud muy chica comparada con la de los antinodos. Por eso se lo toma como un nodo.', `standing('#o7c1',{dur:talk(), per:1500})`],
      ['Del otro lado está el anillo. [A] ¿Por qué el anillo es un antinodo? [P] La única fuerza vertical sobre él es la tensión por la pendiente. Si la pendiente no fuera cero, un anillo sin masa tendría aceleración infinita. Así que la cuerda llega plana: antinodo.', `standing('#o7c1',{dur:talk(), per:1500}); pulse('#o7c1-anillo-d')`],
      ['En la figura hay cinco nodos, contando el del oscilador. Entre nodos hay media longitud de onda, y del último nodo al anillo, un cuarto.', `standing('#o7c1',{dur:talk(), per:1500})`],
      ['En total, nueve cuartos de onda: L igual a nueve lambda cuartos. Es fijo–libre con n igual a cinco, en la fórmula dos n menos uno, por lambda cuartos.', `standing('#o7c1',{dur:talk(), per:1500, end:'max'})`],
    ],
  },

  {
    sec: 'Ond 7 · Datos derivados', title: 'Velocidad, λ, k, f y ω', cls: B, chapter: SEC,
    css: `.o7d{display:grid;grid-template-columns:840px 1fr;gap:40px;align-items:center}`,
    html: `<div class="o7d">${eqs([
      { t: '\\mu = \\frac{m}{L} = \\frac{0{,}720}{1{,}8} = 0{,}4\\ \\tfrac{\\text{kg}}{\\text{m}}', s: 0 },
      { t: 'v = \\sqrt{\\frac{F}{\\mu}} = \\sqrt{\\frac{640}{0{,}4}} = 40\\ \\tfrac{\\text{m}}{\\text{s}}', s: 1 },
      { t: '\\lambda = \\frac{4L}{9} = 0{,}8\\ \\text{m}, \\quad k = \\frac{2\\pi}{\\lambda} = 2{,}5\\pi\\ \\text{m}^{-1}', s: 2 },
      { t: 'f = \\frac{v}{\\lambda} = 50\\ \\text{Hz}, \\quad \\omega = 100\\pi\\ \\text{s}^{-1}', s: 3 },
      { t: 'T = \\frac{1}{f} = 0{,}02\\ \\text{s} = 20\\ \\text{ms}', s: 3, cls: 'ok' },
    ])}
      <svg viewBox="0 0 860 330" style="width:840px;overflow:visible" font-family="Segoe UI">
        <g id="o7-cells" class="pending" data-s="2">${Array.from({ length: 9 }, (_, i) => `<rect x="${20 + i * 90}" y="120" width="90" height="70" fill="${i % 2 ? 'rgba(111,220,140,.10)' : 'rgba(111,220,140,.22)'}" stroke="#6fdc8c" stroke-width="2"/><text x="${65 + i * 90}" y="165" font-size="24" fill="#cfe6ff" text-anchor="middle">λ/4</text>`).join('')}
          <text x="425" y="90" font-size="28" fill="#6fdc8c" text-anchor="middle" font-weight="700">9 cuartos de 0,2 m = 1,8 m</text></g>
        <g class="pending" data-s="4">${[0, 0.4, 0.8, 1.2, 1.6].map(x => `<circle cx="${20 + x / 0.2 * 90}" cy="230" r="11" fill="#ff6f7d"/><text x="${20 + x / 0.2 * 90}" y="275" font-size="22" fill="#ff6f7d" text-anchor="middle">${String(x).replace('.', ',')}</text>`).join('')}
          ${[0.2, 0.6, 1, 1.4, 1.8].map(x => `<rect x="${20 + x / 0.2 * 90 - 10}" y="220" width="20" height="20" fill="#ffc562" transform="rotate(45 ${20 + x / 0.2 * 90} 230)"/><text x="${20 + x / 0.2 * 90}" y="312" font-size="22" fill="#ffc562" text-anchor="middle">${String(x).replace('.', ',')}</text>`).join('')}
          <text x="20" y="40" font-size="24" fill="#ff6f7d">● nodos</text><text x="200" y="40" font-size="24" fill="#ffc562">◆ antinodos (m)</text></g>
      </svg></div>`,
    steps: [
      ['Ahora los números. Mu es la masa sobre el largo: cero coma setecientos veinte kilos sobre uno coma ocho metros, cero coma cuatro kilos por metro. [A] ¿Hay que pasar los gramos a kilos? [P] Siempre. Todo al sistema internacional antes de reemplazar.'],
      ['La velocidad es raíz de la tensión sobre mu: raíz de mil seiscientos, cuarenta metros por segundo.'],
      ['Con nueve cuartos de onda en uno coma ocho metros, cada cuarto mide cero coma dos. Lambda es cero coma ocho metros, y k, dos coma cinco pi por metro.', `sweep('#o7-cells',{dur:1600})`],
      ['La frecuencia es la velocidad sobre lambda: cincuenta hertz. Omega, cien pi radianes por segundo, y el período, veinte milisegundos.'],
      ['Los nodos quedan cada cero coma cuatro metros, desde cero. Los antinodos, en el medio, y el último es el anillo.'],
    ],
  },

  {
    sec: 'Ond 7 · Teoría', title: 'Energía en la estacionaria y amplitud', cls: B, chapter: SEC,
    css: `.o7e{display:grid;grid-template-columns:780px 1fr;gap:34px;align-items:center}`,
    html: `<div class="o7e">${eqs([
      { t: 'y = A_e\\,\\sen(kx)\\,\\cos(\\omega t+\\varphi)', s: 0 },
      { t: 'u_K = \\tfrac12\\mu\\omega^2A_e^2\\,\\sen^2(kx)\\,\\sen^2(\\omega t+\\varphi)', s: 1 },
      { t: 'u_U = \\tfrac12\\mu\\omega^2A_e^2\\,\\cos^2(kx)\\,\\cos^2(\\omega t+\\varphi)', s: 1 },
      { t: 'E = \\tfrac14\\,\\mu\\,\\omega^2A_e^2\\,L = 180\\ \\text{J}', s: 3, id: 'o7-E' },
      { t: 'A_e^2 = \\frac{180}{17\\,765} \\Rightarrow A_e = 10{,}07\\ \\text{cm}', s: 4, cls: 'ok' },
      { t: 'A = \\tfrac{A_e}{2} = 5{,}03\\ \\text{cm}\\ \\text{(propagante)}', s: 4, cls: 'hl' },
    ])}
      <div>${cFL('o7c2', '', { style: 'width:900px', nodes: false, ticks: [] })}
      ${callout('Horizontal ⇒ $\\cos(\\omega t+\\varphi) = 0$ ⇒ **$U = 0$**: toda la energía es cinética', { s: 2, cls: 'ok', style: 'font-size:.85em;margin-top:6px' })}</div></div>`,
    steps: [
      ['Para las energías necesitamos la forma de la onda. Con nodo en cero, la forma espacial es un seno: y igual a A sub e, seno de k x, coseno de omega t más fi. A sub e es la amplitud de los antinodos.', `standing('#o7c2',{dur:talk(), per:1500})`],
      ['La energía cinética depende de la velocidad, y la elástica, de la pendiente. Las dos tienen el factor un medio de mu, omega cuadrado, A sub e cuadrado. La cinética lleva senos cuadrados, y la elástica, cosenos cuadrados.', `standing('#o7c2',{dur:talk(), per:1500})`],
      ['Cuando la cuerda está horizontal no hay pendiente en ningún punto: la energía elástica es cero y toda es cinética.', `standing('#o7c2',{dur:2400, per:1600, end:'flat'})`],
      ['La energía de toda la cuerda es constante: un cuarto de mu, omega cuadrado, A sub e cuadrado, por L. En t sub E vale ciento ochenta joules, y de ahí despejamos la amplitud.', `flash('#o7-E')`],
      ['Da A sub e igual a diez coma cero siete centímetros. [A] ¿Y la amplitud de la propagante? [P] Es la mitad: cinco coma cero tres centímetros. La usamos en el ítem b.'],
    ],
  },

  {
    sec: 'Ond 7 · a) Energía cinética', title: 'Energía cinética del tramo en $t_A$', cls: B, chapter: SEC,
    css: `.o7a{display:grid;grid-template-columns:800px 1fr;gap:34px;align-items:center}`,
    html: `<div class="o7a">${eqs([
      { t: 't_A - t_E = 0{,}1\\ \\text{s} = 5\\,T \\Rightarrow \\text{horizontal}', s: 0 },
      { t: 'K = \\tfrac12\\mu\\omega^2A_e^2\\int_{0{,}4}^{1}\\sen^2(kx)\\,dx', s: 1 },
      { t: '\\int_{0{,}4}^{1}\\sen^2(kx)\\,dx = \\frac{\\Delta x}{2} = 0{,}3\\ \\text{m}', s: 3, cls: 'hl' },
      { t: 'K = 19\\,739 \\cdot 0{,}010132 \\cdot 0{,}3', s: 4 },
      { t: '\\text{atajo: } K = 180 \\cdot \\frac{0{,}3}{0{,}9} = \\frac{180}{3}', s: 4 },
    ])}
      <div>${plot({ w: 880, h: 470, x: [0, 1.8], y: [0, 1.2], ticksX: TICKS, ticksY: [0, 0.5, 1], xl: 'x (m)', yl: 'sen²(kx)', id: 'o7p1', s: 2,
        curves: [{ f: sen2, cls: 'c5', id: 'o7full' }, { f: sen2, from: 0.4, to: 1, area: true, cls: 'c3', id: 'o7tr' }, { f: () => 0.5, from: 0.4, to: 1, cls: 'c2 dash', id: 'o7half' }],
        extra: (px, py) => `<text class="lbl c3" x="${px(0.7)}" y="${py(1.12)}" style="text-anchor:middle">tramo</text><text class="lbl c2" x="${px(1.03)}" y="${py(0.5) - 10}">½</text>` })}
      ${res('$K(t_A) = 60$ J, $U = 0$', { s: 4, style: 'margin-top:20px' })}</div></div>`,
    steps: [
      ['Ítem a. Desde t sub E pasó una décima de segundo, y el período es de dos centésimas: cinco períodos exactos. [A] ¿Y eso qué cambia? [P] Que la cuerda está exactamente como en t sub E: horizontal. Toda la energía del tramo es cinética.'],
      ['Con la cuerda horizontal, el seno cuadrado temporal vale uno. Queda un medio de mu omega cuadrado A sub e cuadrado, por la integral de seno cuadrado de k x en el tramo.'],
      ['Mirá el gráfico. El tramo empieza en un nodo, cero coma cuatro, y termina en un antinodo, uno: tres cuartos de onda.', `sweep('#o7p1 #o7full',{dur:1600}); sweep('#o7p1 #o7tr-a, #o7p1 #o7tr',{delay:1300,dur:1800})`],
      ['Si el tramo empieza y termina en nodos o antinodos, el área bajo el seno cuadrado es la mitad del largo: cero coma tres metros.', `sweep('#o7p1 #o7half',{dur:900})`],
      ['Reemplazando, da sesenta joules. El atajo: el tramo tiene cero coma tres de los cero coma nueve de toda la cuerda, un tercio. Un tercio de ciento ochenta es sesenta.', `pulse('.res')`],
    ],
  },

  {
    sec: 'Ond 7 · a) Energía mecánica', title: 'Energía mecánica del tramo en $t_B$', cls: B, chapter: SEC,
    css: `.o7b{display:grid;grid-template-columns:1fr 360px;gap:30px;align-items:center}`,
    html: `<div class="o7b">${cFL('o7c3', tramo + flujo, { nodes: false, style: 'width:1300px' })}${barras}</div>
      ${eqs([
      { t: 't_B - t_E = 0{,}032\\ \\text{s} = 1{,}6\\,T', s: 0 },
      { t: 'E = \\tfrac12\\mu\\omega^2A_e^2\\Big[\\underbrace{\\textstyle\\int\\sen^2(kx)}_{0{,}3}\\,\\sen^2(\\omega t+\\varphi) + \\underbrace{\\textstyle\\int\\cos^2(kx)}_{0{,}3}\\,\\cos^2(\\omega t+\\varphi)\\Big]', s: 1 },
      { t: 'E_{tramo} = 60\\ \\text{J}\\ \\text{(constante)}; \\quad K_B = 39{,}3\\ \\text{J},\\ U_B = 20{,}7\\ \\text{J}', s: 2, cls: 'ok', id: 'o7-Eb' },
    ], { style: 'margin-top:6px;padding:14px 30px' })}`,
    steps: [
      ['Ahora la energía mecánica en t sub B. Pasaron treinta y dos milésimas: uno coma seis períodos. La cuerda no está horizontal ni en la máxima elongación: hay energía cinética y elástica a la vez.', `standing('#o7c3',{dur:talk(), per:talk()/1.6, phase:Math.PI/2}); ond7_bars(talk(), 1.6)`],
      ['La energía del tramo suma las dos integrales: la del seno cuadrado de k x por el seno cuadrado temporal, y la del coseno cuadrado de k x por el coseno cuadrado temporal.'],
      ['Pero el tramo va de un nodo a un antinodo, así que las dos integrales valen cero coma tres. Sale factor común, y seno cuadrado más coseno cuadrado es uno. La energía del tramo es siempre sesenta joules.', `flash('#o7-Eb')`],
      ['[A] ¿Cómo puede ser constante, si la cuerda se mueve? [P] Porque por los bordes no pasa energía. La potencia es tensión por pendiente por velocidad: en el nodo la velocidad es cero, y en el antinodo la pendiente es cero. Adentro, la energía solo pasa de cinética a elástica.', `standing('#o7c3',{dur:talk(), per:talk()/3.6, phase:Math.PI/2}); ond7_bars(talk(), 3.6)`],
      ['El detalle: en t sub B hay treinta y nueve coma tres joules de cinética y veinte coma siete de elástica. Suman sesenta.'],
    ],
  },

  {
    sec: 'Ond 7 · b) Propagante', title: 'La onda que genera el oscilador', cls: B, chapter: SEC,
    css: `.o7s{display:grid;grid-template-columns:720px 1fr;gap:40px;align-items:center}`,
    html: `<div class="o7s"><div>${sup}</div>${eqs([
      { t: 'y(0{,}2;\\,t) = A_e\\,\\underbrace{\\sen(\\tfrac{\\pi}{2})}_{1}\\cos(\\omega t+\\varphi)', s: 0 },
      { t: '\\text{arriba en } t = 0 \\Rightarrow \\cos\\varphi = 1 \\Rightarrow \\varphi = 0', s: 1 },
      { t: 'A_e\\sen(kx)\\cos(\\omega t) =', s: 2 },
      { t: '= A\\sen(kx-\\omega t) + A\\sen(kx+\\omega t)', s: 2 },
      { t: '\\text{oscilador} \\to +x: \\text{ signo menos}', s: 3 },
      { t: 'y = 0{,}0503\\,\\sen(2{,}5\\pi x - 100\\pi t)\\ \\ [\\text{m, s}]', s: 4, cls: 'ok' },
    ])}</div>`,
    steps: [
      ['Ítem b. Primero, la fase de la estacionaria. El punto x igual a cero coma dos es un antinodo: ahí el seno de k x vale uno.'],
      ['Ese punto se mueve como A sub e por coseno de omega t más fi. Si está arriba de todo en t igual a cero, el coseno de fi vale uno: fi igual a cero.'],
      ['Ahora la separamos en dos propagantes de la mitad de amplitud: una con k x menos omega t, que viaja hacia la derecha, y otra con k x más omega t, que viaja hacia la izquierda.', supJs(false)],
      ['El oscilador manda la onda hacia el anillo: es la del signo menos. [A] ¿Cómo sé que k x menos omega t va hacia la derecha? [P] Seguí la cresta: si t aumenta, x tiene que aumentar para que la fase no cambie. La cresta que en t igual a cero está en cero coma dos se corre hacia la derecha.', supJs(true)],
      ['Queda: cero coma cero cinco cero tres metros, por seno de dos coma cinco pi x menos cien pi t. En x igual a cero coma dos y t igual a cero vale más A: también es un máximo de la propagante sola, así que la condición se lee igual de las dos formas.'],
    ],
  },

  {
    sec: 'Ond 7 · Cierre', title: 'Dónde es fácil equivocarse', cls: B, chapter: SEC,
    html: ul([
      '@0 **El modo:** el anillo es antinodo, no vale $L = n\\frac{\\lambda}{2}$. Contá nodos: 5 ⇒ $L = \\frac94\\lambda$.',
      '@1 **180 J es de toda la cuerda:** el tramo tiene un tercio.',
      '@2 **Instantes:** $0{,}1$ s $= 5T$ (horizontal); $0{,}032$ s $= 1{,}6T$ (ni horizontal ni máxima).',
      '@3 **Nodo → antinodo:** la energía del tramo no cambia. En otros tramos sí cambia.',
      '@4 **Propagante:** amplitud **mitad** ($5{,}03$ cm) y $kx - \\omega t$, nunca $kx + \\omega t$.',
      '@4 **Calculadora en RAD** para $\\omega t$ y $kx$.',
    ]),
    steps: [
      ['Dónde es fácil equivocarse. Primero, el modo: el anillo es un antinodo, así que no vale L igual a n lambda medios. Son nueve cuartos de onda.'],
      ['Segundo: los ciento ochenta joules son de toda la cuerda. El tramo tiene un tercio.'],
      ['Tercero: pasá los instantes a períodos. Cinco períodos es horizontal; uno coma seis, ni horizontal ni máxima.'],
      ['Cuarto: el tramo de nodo a antinodo conserva su energía. [A] ¿Pasa con cualquier tramo? [P] No. El tramo de cero coma tres a cero coma cinco, por ejemplo, pasa de treinta y dos coma siete joules a siete coma tres en un cuarto de período.'],
      ['Y quinto: la propagante tiene la mitad de amplitud y va con k x menos omega t. Calculadora en radianes.'],
    ],
  },

  {
    sec: 'Ond 7 · Cierre', title: 'La receta y los resultados', cls: B, chapter: SEC,
    html: `<div class="grid g2" style="align-items:start">${ul([
      '@0 **1.** Modelo: contar nodos ⇒ $L = (2n-1)\\frac{\\lambda}{4}$.',
      '@0 **2.** $\\mu$, $v$, $\\lambda$, $k$, $\\omega$, $T$.',
      '@1 **3.** Amplitud: $E = \\frac14\\mu\\omega^2A_e^2L$.',
      '@1 **4.** Instante → fracción de $T$ → forma de la cuerda.',
      '@2 **5.** Tramo: integrar; de nodo a antinodo, $\\frac{\\Delta x}{2}$.',
      '@2 **6.** Propagante: fase, mitad de amplitud, hacia $+x$.',
    ])}${card('Resultados', `<div style="font-size:.88em;line-height:1.7">fijo–libre, $n = 5$; $\\lambda = 0{,}8$ m; $f = 50$ Hz<br>$A_e = 10{,}07$ cm; $A = 5{,}03$ cm<br>a) $K(t_A) = 60$ J<br>&nbsp;&nbsp;&nbsp;&nbsp;$E(t_B) = 60$ J ($39{,}3 + 20{,}7$)<br>b) $y = 0{,}0503\\,\\sen(2{,}5\\pi x - 100\\pi t)$</div>`.replace(/\$([^$]+)\$/g, m => md(m)), { cls: 'ok', s: 3 })}</div>`,
    steps: [
      ['La receta. Uno, el modelo, contando nodos. Dos, los datos derivados.'],
      ['Tres, la amplitud con la energía total. Cuatro, cada instante como fracción de período.'],
      ['Cinco, integrar en el tramo. Y seis, para la propagante: la fase, la mitad de amplitud y el sentido.'],
      ['Estos son los resultados. Si llegaste a lo mismo, vas muy bien. Si no, volvé al paso donde te separaste.'],
    ],
  },
];
