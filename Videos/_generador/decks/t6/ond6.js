// Ond 6 · 1P 28/9/2019, ej. 1: propagante en una cuerda fija–fija -> estacionaria; u_K(x); energía elástica de un tramo; se libera un extremo.
// Resultados verificados (soluciones/Ond6.py): v = 60 m/s, μ = 0,01 kg/m, L = 1,5 m, λ = 1 m, f = 60 Hz; 3er armónico;
// y = 4,6 mm sen(2πx) sen(120πt); u_K(x, 25 ms) = 15,0 mJ/m · sen²(2πx); E total = 11,28 mJ; E_U[0,5;1,25](12,5 ms) = 5,64 mJ (50 %);
// d) 4L/λ = 6 (par) ⇒ no es estacionaria; modos fijo–libre 10, 30, 50, 70 Hz.
const { md, ul, card, callout, table, eqs, res, datos, img, molde, plot, cuerda } = require('../../lib');
const { seccion } = require('../common');

const SEC = 'Ond 6 · Fijo–fijo → extremo libre';
const B = 'b-ond';
const L = 1.5;
const PX = x => 120 + x / L * 1260; // posición (m) -> px en las cuerdas de 1500 de ancho
const C = 15.04; // mJ/m

// ---------------------------------------------------------------- superposición: incidente + reflejada invertida
const sup = `<svg id="ond6-sup" viewBox="0 0 900 740" style="width:800px;overflow:visible">
  <g font-size="26" font-family="Segoe UI" fill="#93a4bc">
    <text x="40" y="40">y₁ = A cos(kx − ωt)  viaja →</text>
    <text x="40" y="270">y₂ = −A cos(kx + ωt)  vuelve ←, invertida</text>
    <text x="40" y="500" fill="#6fdc8c">suma: y = 2A sen(kx) sen(ωt)</text>
  </g>
  ${[130, 360, 610].map(y => `<line x1="40" y1="${y}" x2="880" y2="${y}" stroke="#33476a" stroke-width="2" stroke-dasharray="8 8"/>`).join('')}
  <rect x="14" y="540" width="26" height="140" rx="4" fill="#3a4d6b" stroke="#8fa6c4" stroke-width="3"/>
  <rect x="880" y="540" width="26" height="140" rx="4" fill="#3a4d6b" stroke="#8fa6c4" stroke-width="3"/>
  <path id="ond6-w1" d="M40,130 L880,130" fill="none" stroke="#5aa9ff" stroke-width="6"/>
  <path id="ond6-w2" d="M40,360 L880,360" fill="none" stroke="#c49bff" stroke-width="6"/>
  <path id="ond6-ws" d="M40,610 L880,610" fill="none" stroke="#6fdc8c" stroke-width="7"/>
  <g class="pending" data-s="4"><text x="460" y="725" font-size="26" fill="#ffc562" text-anchor="middle">en los vientres la amplitud es 2A = 4,6 mm</text></g>
</svg>`;
const supJs = `
  const g1 = {x0:40, x1:880, y:130, L:1.5}, g2 = {x0:40, x1:880, y:360, L:1.5}, gs = {x0:40, x1:880, y:610, L:1.5};
  const k = 2*Math.PI, per = 1800, w = 2*Math.PI/per, A = 42, d = talk();
  animFn('#ond6-w1', g1, (x,t) => A*Math.cos(k*x - w*t), {dur:d});
  animFn('#ond6-w2', g2, (x,t) => -A*Math.cos(k*x + w*t), {dur:d});
  animFn('#ond6-ws', gs, (x,t) => 2*A*Math.sin(k*x)*Math.sin(w*t), {dur:d});`;

// ---------------------------------------------------------------- cuerdas
const cFF = (id, extra = '', o = {}) => cuerda(Object.assign({ id, L, n: 3, model: 'ff', w: 1500, h: 300, A: 80, ticks: [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5], extra }, o));
// flechas de velocidad en los vientres cuando la cuerda está horizontal en ωt = 3π (v ∝ −sen(kx))
const flechas = [0.25, 0.75, 1.25].map(x => {
  const dir = Math.sin(2 * Math.PI * x) > 0 ? 1 : -1; // +1: hacia abajo
  const y0 = 150, y1 = 150 + dir * 85;
  return `<g class="ond6-fl"><line x1="${PX(x)}" y1="${y0}" x2="${PX(x)}" y2="${y1}" stroke="#ffc562" stroke-width="7"/>
    <path d="M${PX(x) - 16},${y1 - dir * 22} L${PX(x)},${y1 + dir * 4} L${PX(x) + 16},${y1 - dir * 22} Z" fill="#ffc562"/></g>`;
}).join('');
const tramo = `<rect class="tramo" x="${PX(0.5)}" y="40" width="${PX(1.25) - PX(0.5)}" height="220" rx="12"/><text class="tl" x="${(PX(0.5) + PX(1.25)) / 2}" y="28">tramo [0,5 m ; 1,25 m]</text>`;

// gráficos alineados con la cuerda (mismo margen: 120 px de 1500)
const PAD = { l: 120, r: 120, t: 34, b: 60 };
const ticksX = [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5];
const s2 = x => Math.sin(2 * Math.PI * x) ** 2, c2 = x => Math.cos(2 * Math.PI * x) ** 2;

// barras de energía K y U sincronizadas con la cuerda (slide de teoría)
const barras = `<svg id="ond6-bar" viewBox="0 0 360 420" style="width:300px;overflow:visible">
  <line x1="20" y1="360" x2="340" y2="360" stroke="#4a6286" stroke-width="3"/>
  <rect id="ond6-bk" x="60" y="60" width="100" height="300" rx="10" fill="#5aa9ff"/>
  <rect id="ond6-bu" x="200" y="60" width="100" height="300" rx="10" fill="#ffc562"/>
  <text x="110" y="400" font-size="30" font-weight="700" fill="#5aa9ff" text-anchor="middle">K</text>
  <text x="250" y="400" font-size="30" font-weight="700" fill="#ffc562" text-anchor="middle">U</text>
  <text x="180" y="36" font-size="24" fill="#93a4bc" text-anchor="middle">toda la cuerda</text>
</svg>`;
const barrasJs = `
  const per = 2400, d = talk(), ph = -Math.PI/2, nk = Math.max(2, Math.round(d/1000*24));
  standing('#ond6-ce', {dur:d, per, phase:ph});
  const cEnd = Math.cos(2*Math.PI*d/per + ph);
  const kf = f => Array.from({length:nk+1}, (_,i) => { const c = Math.cos(2*Math.PI*(i/nk*d)/per + ph); return {transform:'scaleY(' + f(c).toFixed(3) + ')'}; });
  [['#ond6-bu', c => c*c], ['#ond6-bk', c => 1 - c*c]].forEach(([sel, f]) => {
    const b = S.querySelector(sel); b.style.transformBox = 'fill-box'; b.style.transformOrigin = '50% 100%';
    b.style.transform = 'scaleY(' + f(cEnd).toFixed(3) + ')';
    b.animate(kf(f), {duration:d, easing:'linear', fill:'backwards'});
  });`;

module.exports = [
  seccion('Ond 6', 'Fijo–fijo → extremo libre', 'Primer parcial del 28/9/2019 · ejercicio 1',
    'Ejercicio de ondas número seis: primer parcial del veintiocho de septiembre de dos mil diecinueve, ejercicio uno. Una onda propagante en una cuerda fija en los dos extremos forma una estacionaria; al final se suelta uno de los extremos.'),

  {
    sec: 'Ond 6 · Enunciado', title: 'Qué dice el enunciado', cls: B, chapter: SEC,
    html: `<div style="display:flex;flex-direction:column;gap:30px;align-items:center">${img('Ond6.jpg', { style: 'width:1200px' })}
      ${datos(['@1 $m = 15$ g', '@1 $T = 36$ N', '@1 fija–fija', '@2 $A = 2{,}3$ mm', '@2 $k = 2\\pi$ m⁻¹', '@2 $\\omega = 120\\pi$ s⁻¹', '@3 $t = 0$: horizontal', "@3 $t' = 25$ ms", "@3 $t'' = 12{,}5$ ms", '@3 tramo $[0{,}5 ; 1{,}25]$ m'], { style: 'justify-content:center;max-width:1650px' })}</div>`,
    steps: [
      ['Este es el enunciado. Anotemos los datos a medida que aparecen.'],
      ['Una cuerda de quince gramos, fija en los dos extremos, con una tensión de treinta y seis newtons.'],
      ['Por la cuerda se hace propagar una onda coseno de k x menos omega t, con amplitud de dos coma tres milímetros, k igual a dos pi por metro y omega igual a ciento veinte pi por segundo.'],
      ['En t igual a cero la cuerda está horizontal. Piden graficar la densidad de energía cinética en veinticinco milisegundos, y la energía elástica de un tramo en doce coma cinco milisegundos.'],
      ['Y al final, qué pasa si se libera un extremo. [A] ¿Y el largo de la cuerda? No lo veo. [P] No está. Es lo primero que vamos a sacar.'],
    ],
  },

  {
    sec: 'Ond 6 · Antes de calcular', title: 'Buscar el molde en la hoja', cls: B, chapter: SEC,
    html: `${molde('Ejercicio 5 de la hoja: **estacionaria fijo–fijo**, tensión y porcentaje de energía de un tramo, y un extremo que queda libre. Del 6 y del 7: la propagante da la amplitud de la estacionaria, $2A$.', { s: 0 })}
      <div class="grid g2" style="margin-top:36px">
        ${card('Lo que se repite', ul(['Armónico con $L = n\\frac{\\lambda}{2}$', 'Nodo en $x = 0$ ⇒ $\\sen(kx)$', 'Horizontal en $t = 0$ ⇒ $\\sen(\\omega t)$', 'Energía de un tramo: integrar']), { cls: 'ok', s: 1 })}
        ${card('Lo que cambia', ul(['$L$ no es dato: sale de $\\mu$', 'Gráfico de $u_K$ en función de $x$', 'En d) la frecuencia queda fija']), { cls: 'warn', s: 2 })}
      </div>`,
    steps: [
      ['El modelo en la hoja es el ejercicio cinco: estacionaria fija–fija, energía de un tramo y un extremo que queda libre. Y de los ejercicios seis y siete, una idea: la estacionaria tiene el doble de amplitud que la propagante.'],
      ['Se repite el procedimiento: el armónico con medias ondas enteras, un seno de k x porque hay un nodo en cero, un seno de omega t porque arranca horizontal, y la integral de la energía en el tramo.'],
      ['Lo que cambia: el largo sale de la densidad lineal, el gráfico es en función de x, y en el último ítem la frecuencia queda fija: hay que ver si la cuerda la admite.'],
    ],
  },

  {
    sec: 'Ond 6 · Teoría', title: 'De la propagante a la estacionaria', cls: B, chapter: SEC,
    css: `.ond6-sup{display:grid;grid-template-columns:820px 1fr;gap:46px;align-items:center}`,
    html: `<div class="ond6-sup"><div>${sup}</div>
      ${eqs([
        { t: 'v = \\frac{\\omega}{k} = \\frac{120\\pi}{2\\pi} = 60\\ \\tfrac{\\text{m}}{\\text{s}}', s: 1 },
        { t: '\\mu = \\frac{T}{v^2} = \\frac{36}{60^2} = 0{,}01\\ \\tfrac{\\text{kg}}{\\text{m}}', s: 2 },
        { t: 'L = \\frac{m}{\\mu} = \\frac{0{,}015}{0{,}01} = 1{,}5\\ \\text{m}', s: 2, id: 'ond6-L', cls: 'ok' },
        { t: '\\lambda = \\frac{2\\pi}{k} = 1\\ \\text{m}\\qquad f = \\frac{\\omega}{2\\pi} = 60\\ \\text{Hz}', s: 3 },
        { t: 'A_{est} = 2A = 4{,}6\\ \\text{mm}', s: 4, cls: 'ok' },
      ], { title: 'Datos que vamos a usar' })}</div>`,
    steps: [
      ['De dónde sale la estacionaria. La onda llega al extremo fijo, que no se puede mover, y vuelve invertida. La suma de la que va y la que vuelve es la estacionaria: cada punto oscila en su lugar, y los nodos no se mueven nunca.', supJs],
      ['Ahora los datos. La velocidad de propagación es omega sobre k: ciento veinte pi sobre dos pi, sesenta metros por segundo.'],
      ['La densidad lineal es la tensión sobre la velocidad al cuadrado: cero coma cero uno kilos por metro. Y el largo es la masa sobre mu: uno coma cinco metros. [A] ¿Hay que pasar los gramos a kilos? [P] Siempre: quince gramos son cero coma cero quince kilos.', `flash('#ond6-L')`],
      ['La longitud de onda es dos pi sobre k: un metro. Y la frecuencia es omega sobre dos pi: sesenta hertz.'],
      ['Y la amplitud: dos coma tres milímetros es la de cada propagante. En los vientres se suman: la estacionaria tiene cuatro coma seis.'],
    ],
  },

  {
    sec: 'Ond 6 · a) Armónico y expresión', title: 'Tercer armónico, horizontal en t = 0', cls: B, chapter: SEC,
    html: `<div style="display:flex;flex-direction:column;align-items:center;gap:26px">${cFF('ond6-ca', '', { sNodes: 1, style: 'width:1300px' })}
      <div class="grid g2" style="width:100%;gap:30px">
        ${eqs([
          { t: 'L = n\\,\\frac{\\lambda}{2} \\;\\Rightarrow\\; n = \\frac{2L}{\\lambda} = \\frac{2\\cdot1{,}5}{1} = 3', s: 0, cls: 'ok' },
        ])}
        ${eqs([
          { t: 'y = 4{,}6\\ \\text{mm}\\;\\sen(2\\pi x)\\,\\sen(120\\pi t)', s: 2, cls: 'ok' },
        ], { style: 'justify-content:center' })}
      </div></div>`,
    steps: [
      ['Ítem a. En una cuerda fija–fija entran medias longitudes de onda enteras: n es dos L sobre lambda, dos por uno coma cinco sobre uno, tres. Es el tercer armónico.', `standing('#ond6-ca',{dur:talk(), per:1600, phase:-Math.PI/2})`],
      ['Tres medias ondas, con nodos cada medio metro y vientres en cero coma veinticinco, cero coma setenta y cinco y uno coma veinticinco.', `standing('#ond6-ca',{dur:talk(), per:1600, phase:-Math.PI/2})`],
      ['Como x igual a cero es un nodo, la forma es seno de k x. Y como en t igual a cero está horizontal, el factor temporal es seno de omega t. Queda cuatro coma seis milímetros, seno de dos pi x, seno de ciento veinte pi t.', `standing('#ond6-ca',{dur:talk(), per:1600, phase:-Math.PI/2, end:'flat'})`],
      ['[A] ¿Y si la escribo con coseno de omega t? [P] Entonces arrancaría en su máxima elongación, no horizontal. Lo que sí vale es cambiarle el signo a todo.', `standing('#ond6-ca',{dur:talk(), per:1600, phase:-Math.PI/2, end:'flat'})`],
    ],
  },

  {
    sec: 'Ond 6 · Teoría', title: 'Densidades de energía en la estacionaria', cls: B, chapter: SEC,
    css: `.ond6-en{display:grid;grid-template-columns:1fr 300px;gap:40px;align-items:center}`,
    html: `<div class="ond6-en"><div style="display:flex;flex-direction:column;gap:22px">
        ${cFF('ond6-ce', '', { style: 'width:1180px', nodes: false })}
        ${eqs([
          { t: 'u_K = \\tfrac12\\,\\mu\\Big(\\frac{\\partial y}{\\partial t}\\Big)^2 = C\\,\\sen^2(kx)\\,\\cos^2(\\omega t)', s: 1 },
          { t: 'u_U = \\tfrac12\\,T\\Big(\\frac{\\partial y}{\\partial x}\\Big)^2 = C\\,\\cos^2(kx)\\,\\sen^2(\\omega t)', s: 2 },
          { t: 'C = \\tfrac12\\,\\mu\\,\\omega^2 (2A)^2 = 15{,}0\\ \\tfrac{\\text{mJ}}{\\text{m}}', s: 3, cls: 'ok' },
        ])}</div>
      <div data-s="0">${barras}</div></div>`,
    steps: [
      ['Antes de los ítems b y c, las densidades de energía. Mirá las barras: cuando la cuerda pasa por la horizontal, toda la energía es cinética; en la máxima elongación, toda es elástica.', barrasJs],
      ['La cinética es un medio de mu por la velocidad al cuadrado: queda seno cuadrado de k x por coseno cuadrado de omega t. Es máxima en los vientres.', barrasJs],
      ['La elástica es un medio de la tensión por la pendiente al cuadrado: coseno cuadrado de k x por seno cuadrado de omega t. Es máxima en los nodos, donde la cuerda está más inclinada.', barrasJs],
      ['[A] ¿Por qué tienen el mismo número adelante? [P] Porque la tensión por k al cuadrado es igual a mu por omega al cuadrado. Ese coeficiente vale quince milijoules por metro.', barrasJs],
    ],
  },

  {
    sec: 'Ond 6 · b) Energía cinética', title: 'Densidad de energía cinética a lo largo de la cuerda', cls: B, chapter: SEC,
    css: `.ond6-b{display:grid;grid-template-columns:560px 1fr;gap:30px;align-items:center}`,
    html: `<div class="ond6-b">${eqs([
      { t: "\\omega t' = 120\\pi\\cdot0{,}025 = 3\\pi", s: 0 },
      { t: '\\sen(3\\pi) = 0\\quad \\cos^2(3\\pi) = 1', s: 1 },
      { t: "u_K(x,t') = 15{,}0\\,\\sen^2(2\\pi x)\\ \\tfrac{\\text{mJ}}{\\text{m}}", s: 2, cls: 'ok' },
      { t: 'E = \\tfrac14\\,\\mu\\,\\omega^2(2A)^2L = 11{,}28\\ \\text{mJ}', s: 4 },
    ])}
      <div style="display:flex;flex-direction:column;gap:6px">
        ${cFF('ond6-cb', `<g class="pending" data-s="1">${flechas}</g>`, { style: 'width:1080px', nodes: false })}
        ${plot({ w: 1500, h: 470, pad: PAD, x: [0, 1.5], y: [0, 18], ticksX, ticksY: [0, 5, 10, 15], xl: 'x (m)', yl: 'u_K (mJ/m)', id: 'ond6-pk', s: 3, width: 1080,
          curves: [{ f: x => C * s2(x), area: true, id: 'ond6-uk', n: 600 }],
          extra: (px, py) => [0.25, 0.75, 1.25].map(x => `<text class="lbl c3" x="${px(x)}" y="${py(15.04) - 14}" style="text-anchor:middle">15,0</text>`).join('') })}
      </div></div>`,
    steps: [
      ['Ítem b: la densidad cinética en veinticinco milisegundos. Primero, en qué parte del ciclo estamos: omega t prima es ciento veinte pi por cero coma cero veinticinco, tres pi.', `standing('#ond6-cb',{dur:talk(), per:1600, phase:-Math.PI/2, end:'flat'})`],
      ['Seno de tres pi es cero: la cuerda está horizontal, y todos los puntos van a su velocidad máxima. Toda la energía es cinética.', `snapshot('#ond6-cb',0,{dur:10}); draw('.ond6-fl line',{dur:700,stagger:200})`],
      ['Reemplazando, la densidad cinética queda quince milijoules por metro, por seno cuadrado de dos pi x.'],
      ['El gráfico tiene tres lomas, una por media onda: cero en los nodos y quince milijoules por metro en los vientres, donde la cuerda se mueve más rápido.', `sweep('#ond6-pk #ond6-uk-a, #ond6-pk #ond6-uk',{dur:talk(600)})`],
      ['[A] ¿Hace falta poner las escalas? [P] Sí, la cátedra las pide: metros en un eje y milijoules por metro en el otro. Y un control: el área bajo la curva, once coma veintiocho milijoules, es la energía total de la cuerda.'],
    ],
  },

  {
    sec: "Ond 6 · c) Energía elástica del tramo", title: "Tramo [0,5 ; 1,25] m en t″ = 12,5 ms", cls: B, chapter: SEC,
    css: `.ond6-c{display:grid;grid-template-columns:610px 1fr;gap:30px;align-items:center}`,
    html: `<div class="ond6-c">${eqs([
      { t: "\\omega t'' = 120\\pi\\cdot0{,}0125 = 1{,}5\\pi", s: 0 },
      { t: '\\sen^2(1{,}5\\pi) = 1', s: 1 },
      { t: "u_U = 15{,}0\\,\\cos^2(2\\pi x)\\ \\tfrac{\\text{mJ}}{\\text{m}}", s: 2 },
      { t: '\\int_{0{,}5}^{1{,}25}\\!\\cos^2(2\\pi x)\\,dx = \\frac{\\Delta x}{2} = 0{,}375\\ \\text{m}', s: 3, cls: 'hl' },
      { t: 'E_U = 15{,}04\\cdot0{,}375 = 5{,}64\\ \\text{mJ}', s: 4, cls: 'ok' },
    ])}
      <div style="display:flex;flex-direction:column;gap:6px">
        ${cFF('ond6-cc', `<g class="pending" data-s="1">${tramo}</g>`, { style: 'width:1060px', nodes: false })}
        ${plot({ w: 1500, h: 470, pad: PAD, x: [0, 1.5], y: [0, 18], ticksX, ticksY: [0, 7.5, 15], xl: 'x (m)', yl: 'u_U (mJ/m)', id: 'ond6-pu', s: 2, width: 1060,
          curves: [{ f: x => C * c2(x), id: 'ond6-uu', n: 600, cls: 'c3' }, { f: x => C * c2(x), from: 0.5, to: 1.25, area: true, cls: 'c3', id: 'ond6-ua', n: 400 }, { f: () => 7.52, from: 0.5, to: 1.25, cls: 'c2 dash', id: 'ond6-half' }] })}
      </div></div>`,
    steps: [
      ['Ítem c: la energía elástica del tramo entre cero coma cinco y uno coma veinticinco metros, en doce coma cinco milisegundos. Omega t segunda es uno coma cinco pi.'],
      ['Seno cuadrado de uno coma cinco pi vale uno: la cuerda está en su máxima elongación, quieta. Toda la energía es elástica.', `snapshot('#ond6-cc',-1,{dur:900})`],
      ['La densidad elástica queda quince milijoules por metro, por coseno cuadrado de dos pi x. Es máxima en los nodos, donde la cuerda está más inclinada.', `snapshot('#ond6-cc',-1,{dur:10}); sweep('#ond6-pu #ond6-uu',{dur:1800})`],
      ['Hay que integrar el coseno cuadrado en el tramo. Mide cero coma setenta y cinco metros: tres cuartos de onda enteros. Entonces el área es la mitad del largo: cero coma tres siete cinco metros.', `snapshot('#ond6-cc',-1,{dur:10}); sweep('#ond6-pu #ond6-ua-a, #ond6-pu #ond6-ua',{dur:1600}); sweep('#ond6-pu #ond6-half',{delay:1500,dur:900})`],
      ['La energía elástica es quince coma cero cuatro por cero coma tres siete cinco: cinco coma sesenta y cuatro milijoules. [A] ¿Por qué da justo la mitad de la total? [P] Porque el tramo es media cuerda, con cuartos de onda enteros.', `snapshot('#ond6-cc',-1,{dur:10})`],
    ],
  },

  {
    sec: 'Ond 6 · d) Se libera un extremo', title: '¿Sigue siendo estacionaria?', cls: B, chapter: SEC,
    css: `.ond6-d{display:grid;grid-template-columns:1fr 600px;gap:30px;align-items:center} .ond6-d .lab{font-size:26px;font-weight:700;margin:0 0 -6px 30px}`,
    html: `<div class="ond6-d"><div>
        <div class="lab c4" data-s="1">Con λ = 1 m: en el anillo cae un nodo ✗</div>
        ${cuerda({ id: 'ond6-dm', L, n: 3.5, model: 'fl', w: 1500, h: 300, A: 70, s: 1, style: 'width:1080px' })}
        <div class="lab c2" data-s="3">Un modo que sí existe: 50 Hz, L = 5λ/4</div>
        ${cuerda({ id: 'ond6-db', L, n: 3, model: 'fl', w: 1500, h: 300, A: 70, s: 3, style: 'width:1080px' })}
      </div>
      <div style="display:flex;flex-direction:column;gap:24px">
        ${eqs([
          { t: 'L = (2n-1)\\,\\frac{\\lambda}{4}', s: 0 },
          { t: '\\frac{4L}{\\lambda} = \\frac{4\\cdot1{,}5}{1} = 6 \\ \\text{(par)}', s: 1, cls: 'hl' },
          { t: 'f_n = (2n-1)\\,\\frac{v}{4L}', s: 2 },
          { t: 'f_n = 10,\\ 30,\\ 50,\\ 70\\ \\ldots\\ \\text{Hz}', s: 2 },
        ])}
        ${res('No es estacionaria: 60 Hz no es un modo fijo–libre', { s: 4 })}
      </div></div>`,
    steps: [
      ['Ítem d: se libera un extremo. Queda fija–libre: el extremo suelto es un anillo en una varilla, y la tensión no cambia. La velocidad sigue en sesenta metros por segundo y la fuente en sesenta hertz, así que lambda sigue siendo un metro.'],
      ['En fijo–libre tiene que entrar un número impar de cuartos de onda, porque el extremo libre necesita un vientre. Cuatro L sobre lambda da seis: par. Mirá: con lambda de un metro, en el anillo cae un nodo y el anillo no se mueve.', `standing('#ond6-dm',{dur:talk(), per:1600})`],
      ['Con frecuencias: los modos fija–libre son los múltiplos impares de v sobre cuatro L, que da diez hertz. Diez, treinta, cincuenta, setenta. Sesenta no está.'],
      ['Para comparar, el modo de cincuenta hertz sí existe: entran cinco cuartos de onda y el anillo queda en un vientre.', `standing('#ond6-db',{dur:talk(), per:1600})`],
      ['La respuesta es no. [A] ¿Y en qué armónico vibra? [P] No se aplica: la pregunta dice "en caso afirmativo". Lo que hay que justificar es por qué no: cuatro L sobre lambda es par.'],
    ],
  },

  {
    sec: 'Ond 6 · Cierre', title: 'Dónde es fácil equivocarse', cls: B, chapter: SEC,
    html: ul([
      '@0 **Amplitud:** la estacionaria tiene $2A = 4{,}6$ mm. Con $A$, todas las energías salen 4 veces menores.',
      '@1 **El largo no es dato:** $\\mu = T/v^2$ y $L = m/\\mu$. Gramos a kilos.',
      '@2 **Fase:** "horizontal en $t = 0$" ⇒ $\\sen(\\omega t)$. Con $\\cos(\\omega t)$, en $t\'$ daría $u_K = 0$.',
      '@3 **$\\sen^2$ o $\\cos^2$:** $u_K$ va con $\\sen^2(kx)$ y $u_U$ con $\\cos^2(kx)$. Calculadora en radianes.',
      '@4 **d):** fijo–libre pide cuartos de onda **impares**. 6 es par: no hay "6º armónico".',
    ]),
    steps: [
      ['Dónde es fácil equivocarse. Primero, la amplitud: la estacionaria tiene el doble. Con dos coma tres milímetros, las energías salen cuatro veces más chicas.'],
      ['Segundo, el largo no es dato: sale de la densidad lineal, con la masa en kilos.'],
      ['Tercero, la fase: horizontal en cero es seno de omega t. Con coseno, en veinticinco milisegundos daría energía cinética cero.'],
      ['Cuarto, la cinética va con seno cuadrado de k x y la elástica con coseno cuadrado. Y la calculadora, en radianes.'],
      ['Y en fijo–libre, los cuartos de onda son impares: no existe un sexto armónico.'],
    ],
  },

  {
    sec: 'Ond 6 · Cierre', title: 'La receta y los resultados', cls: B, chapter: SEC,
    html: `<div class="grid g2" style="align-items:start">${ul([
      '@0 **1.** $v = \\omega/k$, $\\mu = T/v^2$, $L = m/\\mu$, $\\lambda$ y $2A$.',
      '@1 **2.** Armónico: $n = 2L/\\lambda$; nodo en 0 ⇒ $\\sen(kx)$.',
      '@2 **3.** Cada instante → $\\omega t$ → cuerda horizontal o en máxima elongación.',
      '@3 **4.** Tramo con cuartos de onda enteros: $\\int = \\frac{\\Delta x}{2}$.',
      '@4 **5.** Extremo libre: ¿$4L/\\lambda$ es impar?',
    ])}${card('Resultados', `<div style="font-size:.86em;line-height:1.65">a) $n = 3$; $y = 4{,}6\\text{ mm}\\,\\sen(2\\pi x)\\,\\sen(120\\pi t)$<br>b) $u_K = 15{,}0\\,\\sen^2(2\\pi x)$ mJ/m<br>c) $E_U = 5{,}64$ mJ (50 % del total)<br>d) no: $4L/\\lambda = 6$ es par</div>`.replace(/\$([^$]+)\$/g, m => md(m)), { cls: 'ok', s: 5 })}</div>`,
    steps: [
      ['La receta. Uno: velocidad, densidad lineal, largo, lambda y amplitud doble.'],
      ['Dos: el armónico, con dos L sobre lambda, y la forma espacial según dónde haya un nodo.'],
      ['Tres: cada instante, pasarlo a omega t para saber si la cuerda está horizontal o en su máxima elongación.'],
      ['Cuatro: integrar en el tramo; con cuartos de onda enteros, la integral es la mitad del largo.'],
      ['Y cinco: si se libera un extremo, fijarse si cuatro L sobre lambda es impar.'],
      ['Y los resultados: tercer armónico, quince milijoules por metro de pico, cinco coma sesenta y cuatro milijoules en el tramo, y no hay estacionaria al soltar el extremo.'],
    ],
  },
];
