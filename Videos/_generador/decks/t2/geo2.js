// Geo 2 · 1P 16/9/2023, ej. 1: cubo de vidrio con reflector y agua (n = 1,33); para θ ≥ 48° no entra luz al agua.
// Resultados verificados (soluciones/Geo2.py): incidencia en la cara del agua = θ ⇒ θ_L = 48°; n_v = 1,33/sen 48° = 1,790;
// v = c/n_v = 1,676·10⁸ m/s ≈ 1,68·10⁸ m/s (0,56c). Trampa: desde la normal (42°) daría n = 1,99 y v = 1,51·10⁸ m/s.
const { md, ul, card, callout, eqs, res, datos, img, molde } = require('../../lib');
const { seccion } = require('../common');

const SEC = 'Geo 2 · Cubo con reflector y agua';
const B = 'b-geo';
const NV = 1.78969, NA = 1.33;
const rad = d => d * Math.PI / 180;
const f1 = v => v.toFixed(1);
const L = (a, b) => `M${f1(a[0])},${f1(a[1])} L${f1(b[0])},${f1(b[1])}`;
const sa = s => s === undefined ? '' : ` data-s="${s}"`;

// geometría del cubo (mismas cuentas que en la página): reflector en y = 620, cara del agua en x = 700, el rayo pega en P = (460, 620)
function pts(th) {
  const r = rad(th), c = Math.cos(r), s = Math.sin(r);
  const P = [460, 620], A = [P[0] - 360 * c, P[1] - 360 * s], Q = [700, 620 - 240 * Math.tan(r)];
  const sf = NV * s / NA; let T = Q, tot = true;
  if (sf < 1) { const f = Math.asin(sf); T = [700 + 190 * Math.cos(f), Q[1] - 190 * Math.sin(f)]; tot = false; }
  const lr = Math.min(230, (Q[1] - 75) / s); return { A, P, Q, T, R: [Q[0] - lr * c, Q[1] - lr * s], tot };
}
// arco de radio r alrededor de C, desde la dirección u hasta la dirección v (vectores unitarios), con barrido sw
const arc = (C, r, u, v, sw) => `M${f1(C[0] + r * u[0])},${f1(C[1] + r * u[1])} A${r},${r} 0 0 ${sw} ${f1(C[0] + r * v[0])},${f1(C[1] + r * v[1])}`;
const kx = th => 150 + (th - 25) / (62 - 25) * 500;

// cubo de vidrio con reflector abajo y agua a la derecha. o: {sIn, sRf, sNor, sArcP, sArcQ, sweep}
function cubo(id, th, o = {}) {
  const p = pts(th), r = rad(th), c = Math.cos(r), s = Math.sin(r);
  const hatch = Array.from({ length: 16 }, (_, i) => `<line x1="${110 + i * 38}" y1="628" x2="${92 + i * 38}" y2="652"/>`).join('');
  let h = `<svg id="${id}" class="g2" viewBox="0 0 960 ${o.sweep ? 730 : 680}" style="width:${o.w || 900}px">
    <defs><marker id="${id}-ar" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#ffd36b"/></marker>
      <marker id="${id}-ab" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#4cc2ff"/></marker></defs>
    <rect class="vid" x="100" y="60" width="600" height="560"/><rect class="agu" x="700" y="60" width="200" height="560"/>
    <text class="lb" x="130" y="108">Vidrio</text><text class="lb sm" x="130" y="146">n = ?</text>
    <text class="lb" x="800" y="108" style="text-anchor:middle">Agua</text><text class="lb sm" x="800" y="146" style="text-anchor:middle">n = 1,33</text>
    <line class="refl" x1="100" y1="620" x2="700" y2="620"/><g class="hatch">${hatch}</g><text class="lb sm" x="400" y="676" style="text-anchor:middle">reflector (espejo)</text>`;
  // normal a la cara del agua
  h += `<g${sa(o.sNor)}><line class="nor" x1="560" y1="${f1(p.Q[1])}" x2="860" y2="${f1(p.Q[1])}"/><text class="nl" x="566" y="${f1(p.Q[1] - 14)}">normal</text></g>`;
  if (o.sweep) {
    h += `<path id="${id}-tr" class="ray blue" d="${L(p.Q, p.T)}" marker-end="url(#${id}-ab)" style="opacity:${p.tot ? 0 : 1}"/>
      <path id="${id}-ir" class="ray thin" d="${L(p.Q, p.R)}" marker-end="url(#${id}-ar)" style="opacity:${p.tot ? 1 : 0.22}"/>`;
  }
  h += `<path id="${id}-in" class="ray"${sa(o.sIn)} d="${L(p.A, p.P)}" marker-end="url(#${id}-ar)"/>
    <path id="${id}-rf" class="ray"${sa(o.sRf)} d="${L(p.P, p.Q)}" marker-end="url(#${id}-ar)"/>`;
  if (!o.sweep) {
    h += `<g${sa(o.sArcP)}><path class="ang" d="${arc(p.P, 78, [-1, 0], [-c, -s], 1)}"/><text class="al" x="${f1(p.P[0] - 112 * Math.cos(r / 2))}" y="${f1(p.P[1] - 112 * Math.sin(r / 2) + 12)}">θ</text></g>
      <g${sa(o.sArcP2)}><path class="ang" d="${arc(p.P, 78, [1, 0], [c, -s], 0)}"/><text class="al" x="${f1(p.P[0] + 112 * Math.cos(r / 2))}" y="${f1(p.P[1] - 112 * Math.sin(r / 2) + 12)}">θ</text></g>
      <g${sa(o.sArcQ)}><path class="ang q" d="${arc(p.Q, 70, [-1, 0], [-c, s], 0)}"/><text class="al q" x="${f1(p.Q[0] - 104 * Math.cos(r / 2))}" y="${f1(p.Q[1] + 104 * Math.sin(r / 2) + 12)}">θ</text></g>`;
  } else {
    const tk = [25, 48, 62].map(t => `<line class="stk" x1="${kx(t)}" y1="${t === 48 ? 678 : 684}" x2="${kx(t)}" y2="${t === 48 ? 714 : 708}"/><text class="sl${t === 48 ? ' c3' : ''}" x="${kx(t)}" y="726">${t}°</text>`).join('');
    h += `<line class="sld" x1="${kx(25)}" y1="696" x2="${kx(62)}" y2="696"/>${tk}
      <g id="${id}-kn" style="transform:translate(${kx(th)}px,0px)"><circle class="knob" cx="0" cy="696" r="15"/><text class="sl k" x="0" y="672">θ</text></g>`;
  }
  return h + '</svg>';
}
const CSS = `.g2{overflow:visible;font-family:"Segoe UI",Arial,sans-serif}
  .g2 .vid{fill:rgba(140,215,255,.10);stroke:#8fc9e8;stroke-width:4} .g2 .agu{fill:rgba(60,130,255,.28);stroke:#5aa9ff;stroke-width:4}
  .g2 .refl{stroke:#dfe7f1;stroke-width:12;stroke-linecap:round} .g2 .hatch line{stroke:#8fa6c4;stroke-width:3}
  .g2 .lb{fill:#e9eff8;font-size:34px;font-weight:700} .g2 .lb.sm{font-size:28px;font-weight:600;fill:#93a4bc}
  .g2 .ray{fill:none;stroke:#ffd36b;stroke-width:7;stroke-linecap:round} .g2 .ray.blue{stroke:#4cc2ff;stroke-width:6} .g2 .ray.thin{stroke-width:5}
  .g2 .nor{stroke:#c49bff;stroke-width:3;stroke-dasharray:12 9} .g2 .nl{fill:#c49bff;font-size:24px;font-weight:600}
  .g2 .ang{fill:none;stroke:#ff8ad8;stroke-width:4} .g2 .al{fill:#ff8ad8;font-size:36px;font-weight:800;text-anchor:middle}
  .g2 .ang.q{stroke:#7ee0a1} .g2 .al.q{fill:#7ee0a1}
  .g2 .sld{stroke:#4a6286;stroke-width:6;stroke-linecap:round} .g2 .stk{stroke:#93a4bc;stroke-width:3} .g2 .sl{fill:#93a4bc;font-size:24px;text-anchor:middle;font-weight:700}
  .g2 .sl.c3{fill:#ffc562} .g2 .knob{fill:#ff8ad8;stroke:#0d1522;stroke-width:4} .g2 .sl.k{fill:#ff8ad8;font-size:30px}
  .g2row{display:grid;grid-template-columns:900px 1fr;gap:40px;align-items:center}`;

// código de página: barrido de θ entre th0 y th1 (mismas cuentas que pts())
const JS = `
function g2pts(th){ const r=th*Math.PI/180,c=Math.cos(r),s=Math.sin(r); const P=[460,620],A=[P[0]-360*c,P[1]-360*s],Q=[700,620-240*Math.tan(r)];
  const sf=${NV}*s/${NA}; let T=Q,tot=true; if(sf<1){ const f=Math.asin(sf); T=[700+190*Math.cos(f),Q[1]-190*Math.sin(f)]; tot=false; }
  const lr=Math.min(230,(Q[1]-75)/s); return {A,P,Q,T,R:[Q[0]-lr*c,Q[1]-lr*s],tot}; }
const g2d=(a,b)=>'M'+a[0].toFixed(1)+','+a[1].toFixed(1)+' L'+b[0].toFixed(1)+','+b[1].toFixed(1);
const g2kx=th=>150+(th-25)/(62-25)*500;
function g2go(id,th0,th1,dur){ const n=Math.max(2,Math.round(dur/40)); const ths=Array.from({length:n+1},(_,i)=>th0+(th1-th0)*i/n); const ps=ths.map(g2pts);
  const q=s=>S.querySelector('#'+id+'-'+s);
  const setd=(el,f)=>{ el.setAttribute('d',f(ps[n])); el.animate(ps.map(p=>({d:'path("'+f(p)+'")'})),{duration:dur,easing:'linear',fill:'backwards'}); };
  setd(q('in'),p=>g2d(p.A,p.P)); setd(q('rf'),p=>g2d(p.P,p.Q)); setd(q('tr'),p=>g2d(p.Q,p.T)); setd(q('ir'),p=>g2d(p.Q,p.R));
  const op=(el,f)=>{ el.style.opacity=f(ps[n]); el.animate(ps.map(p=>({opacity:f(p)})),{duration:dur,easing:'linear',fill:'backwards'}); };
  op(q('tr'),p=>p.tot?0:1); op(q('ir'),p=>p.tot?1:0.22);
  q('nor')&&0;
  const kn=q('kn'); kn.style.transform='translate('+g2kx(th1)+'px,0px)'; kn.animate(ths.map(t=>({transform:'translate('+g2kx(t).toFixed(1)+'px,0px)'})),{duration:dur,easing:'linear',fill:'backwards'});
  const nor=S.querySelector('#'+id+' .nor'), nl=S.querySelector('#'+id+' .nl'); const y=ps[n].Q[1];
  nor.setAttribute('y1',y.toFixed(1)); nor.setAttribute('y2',y.toFixed(1)); nl.setAttribute('y',(y-14).toFixed(1));
  nor.animate(ps.map(p=>({transform:'translateY('+(p.Q[1]-y).toFixed(1)+'px)'})),{duration:dur,easing:'linear',fill:'backwards'});
  nl.animate(ps.map(p=>({transform:'translateY('+(p.Q[1]-y).toFixed(1)+'px)'})),{duration:dur,easing:'linear',fill:'backwards'}); }
`;
const go = (th0, th1, minus = 0) => JS + `g2go('g2b', ${th0}, ${th1}, talk(${minus}));`;

// tres casos de una interfase vidrio → agua (teoría)
function paneles() {
  const W = 540, gap = 40, Y = 240, R = 165, T0 = 60;
  const casos = [
    { a: 30, t: 'θ < θ<tspan baseline-shift="sub" font-size="20">L</tspan>: refracta', s: 1 },
    { a: Math.asin(NA / NV) * 180 / Math.PI, t: 'θ = θ<tspan baseline-shift="sub" font-size="20">L</tspan>: sale rasante', s: 2 },
    { a: 62, t: 'θ > θ<tspan baseline-shift="sub" font-size="20">L</tspan>: reflexión total', s: 3 },
  ];
  let h = `<svg class="g2 g2p" viewBox="0 0 ${3 * W + 2 * gap} 440" style="width:1700px">
    <defs><marker id="g2p-ar" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#ffd36b"/></marker>
    <marker id="g2p-ab" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#4cc2ff"/></marker></defs>`;
  casos.forEach((k, i) => {
    const x0 = i * (W + gap), O = [x0 + W / 2, Y], a = rad(k.a), sa_ = Math.sin(a), ca = Math.cos(a);
    const sf = NV * sa_ / NA, tot = sf > 1.0001;
    const In = [O[0] - R * sa_, O[1] + R * ca];
    let ray = `<path class="ray" d="${L(In, O)}" marker-end="url(#g2p-ar)"/>`;
    ray += `<path class="ray thin" d="${L(O, [O[0] + R * sa_, O[1] + R * ca])}" marker-end="url(#g2p-ar)" style="opacity:${tot ? 1 : 0.25}"/>`;
    if (!tot) {
      const f = Math.min(Math.asin(Math.min(sf, 1)), rad(89.2));
      ray += `<path class="ray blue" d="${L(O, [O[0] + R * Math.sin(f), O[1] - R * Math.cos(f) - (sf > 0.999 ? 5 : 0)])}" marker-end="url(#g2p-ab)"/>`;
      ray += `<path class="ang q" d="${arc(O, 62, [0, -1], [Math.sin(f), -Math.cos(f)], 1)}"/>`;
    }
    ray += `<path class="ang" d="${arc(O, 62, [0, 1], [-sa_, ca], 1)}"/><text class="al" style="font-size:28px" x="${f1(O[0] - 92 * Math.sin(a / 2))}" y="${f1(O[1] + 92 * Math.cos(a / 2) + 10)}">θ</text>`;
    h += `<g data-s="${k.s}"><rect class="agu" x="${x0}" y="${T0}" width="${W}" height="${Y - T0}"/><rect class="vid" x="${x0}" y="${Y}" width="${W}" height="${420 - Y}"/>
      <text class="lb sm" x="${x0 + 16}" y="${T0 + 36}">agua</text><text class="lb sm" x="${x0 + 16}" y="410">vidrio</text>
      <line class="nor" x1="${O[0]}" y1="${T0 + 6}" x2="${O[0]}" y2="414"/>${ray}
      <text class="lb" x="${O[0]}" y="40" style="text-anchor:middle;font-size:32px;fill:${tot ? '#ff8ad8' : '#e9eff8'}">${k.t}</text></g>`;
  });
  return h + '</svg>';
}

module.exports = [
  seccion('Geo 2', 'Cubo con reflector y agua', 'Primer parcial del 16/9/2023 · ejercicio 1',
    'Ejercicio de óptica geométrica número dos: primer parcial del dieciséis de septiembre de dos mil veintitrés, ejercicio uno. Un cubo de vidrio con un espejo en una cara y agua en la de al lado: a partir de cierto ángulo, la luz deja de pasar al agua.'),

  {
    sec: 'Geo 2 · Enunciado', title: 'Qué dice el enunciado', cls: B, chapter: SEC,
    html: `<div style="display:flex;flex-direction:column;gap:44px;align-items:center">${img('Geo2.jpg', { style: 'width:1300px' })}
      ${datos(['@1 cubo grande de vidrio', '@1 reflector (espejo) en una cara', '@2 agua: $n_{agua} = 1{,}33$, en una cara adyacente', '@3 $\\theta$: entre el haz y el reflector',
        '@4 para $\\theta \\ge 48°$ no entra luz al agua', '@5 piden: rapidez $v$ en el vidrio'], { style: 'justify-content:center;max-width:1600px' })}</div>`,
    steps: [
      ['Este es el enunciado: corto, de un punto, pero con una geometría que hay que mirar bien.'],
      ['Tenemos un cubo grande de vidrio, con un reflector metálico, o sea un espejo, en una de sus caras.'],
      ['En una cara adyacente, la de al lado, hay agua, con índice uno coma treinta y tres.'],
      ['Un haz de luz incide sobre el reflector. Mirá la figura: el ángulo theta está marcado entre el haz y la superficie del reflector, no desde la normal.'],
      ['Y el dato clave: cuando theta es de cuarenta y ocho grados o más, no entra luz al agua.'],
      ['Nos piden la rapidez de la luz dentro del vidrio.'],
    ],
  },

  {
    sec: 'Geo 2 · Antes de calcular', title: 'Buscar el molde en la hoja', cls: B, chapter: SEC,
    html: `${molde('Ejercicio 9 de la hoja: **reflexión total de un rayo** (espejo sumergido y prisma). Y el paso 10 de la receta de óptica: *rayo suelto con reflexión total: seguirlo cara por cara*.', { s: 0 })}
      <div class="grid g2" style="margin-top:40px">
        ${card('Lo que se repite', ul(['Seguir **un solo rayo**', 'Con geometría, la incidencia en la cara que importa', 'Reflexión total si ese ángulo es $\\ge \\theta_L$']), { cls: 'ok', s: 1 })}
        ${card('Lo que cambia', ul(['La incógnita es el **índice**, y de ahí $v$', 'El umbral de 48° es directamente $\\theta_L$', 'Espejo ⊥ cara del agua: el ángulo se conserva']), { cls: 'warn', s: 2 })}
      </div>`,
    steps: [
      ['El molde en la hoja es el ejercicio nueve: la reflexión total de un rayo, con el espejo sumergido y el prisma. Y el paso diez de la receta de óptica: un rayo suelto se sigue cara por cara.'],
      ['Lo que se repite: seguimos un solo rayo, sacamos con geometría el ángulo con el que llega a la cara que importa, y hay reflexión total si ese ángulo es mayor o igual al ángulo límite.'],
      ['[A] ¿Y qué cambia? [P] Que acá la incógnita es el índice del vidrio, y con él la rapidez. El umbral de cuarenta y ocho grados es directamente el ángulo límite. Y como el espejo es perpendicular a la cara del agua, el ángulo pasa sin cambios: no hay que sumar dos fi como en el ejercicio nueve.'],
    ],
  },

  {
    sec: 'Geo 2 · Teoría', title: 'Snell y ángulo límite', cls: B, chapter: SEC, css: CSS,
    html: `<div style="display:flex;flex-direction:column;align-items:center;gap:30px">${paneles()}
      ${eqs([
        { t: 'n_1\\sen\\theta_1 = n_2\\sen\\theta_2 \\qquad \\sen\\theta_L = \\frac{n_2}{n_1}\\quad (n_1 > n_2)', s: 0 },
        { t: 'n = \\frac{c}{v} \\;\\Rightarrow\\; v = \\frac{c}{n}', s: 4, cls: 'ok' },
      ], { style: 'padding:16px 40px' })}</div>`,
    steps: [
      ['Repasemos la teoría. Cuando la luz pasa de un medio a otro se cumple la ley de Snell: n uno por seno de theta uno, igual a n dos por seno de theta dos. Los ángulos se miden siempre desde la normal.'],
      ['Si la luz va de un medio más denso a uno menos denso, como del vidrio al agua, el rayo refractado se aleja de la normal. Con un ángulo chico, pasa al otro medio sin problema.', `draw('.g2p g[data-s="1"] path',{dur:900,stagger:500})`],
      ['A medida que el ángulo crece, el refractado se acuesta, hasta que sale rasante, a noventa grados. Ese ángulo de incidencia es el ángulo límite: el seno del ángulo límite es n dos sobre n uno.', `draw('.g2p g[data-s="2"] path',{dur:900,stagger:500})`],
      ['Para ángulos mayores ya no hay rayo refractado: toda la luz se refleja. Es la reflexión total, y no pasa nada de luz al otro medio. [A] ¿Puede pasar también del agua al vidrio? [P] No: hace falta ir del índice mayor al menor. Por eso el índice chico va arriba en la fracción, y el seno da menor que uno.', `draw('.g2p g[data-s="3"] path',{dur:900,stagger:500})`],
      ['Y la otra fórmula que vamos a usar: el índice de refracción es c sobre v. Cuanto mayor es el índice, más lenta va la luz en ese medio.'],
    ],
  },

  {
    sec: 'Geo 2 · Geometría', title: 'Seguir el rayo dentro del cubo', cls: B, chapter: SEC, css: CSS,
    html: `<div class="g2row">${cubo('g2a', 40, { sIn: 0, sArcP: 0, sRf: 1, sArcP2: 1, sNor: 2, sArcQ: 3 })}
      ${ul(['@0 El haz forma $\\theta$ con la superficie del espejo', '@1 El reflejado sale con el **mismo** $\\theta$', '@2 La normal a la cara del agua es **paralela** al reflector', '@3 ⇒ incidencia en la cara del agua $= \\theta$ (alternos internos)'])}</div>`,
    steps: [
      ['Ahora sigamos el rayo dentro del cubo. Viene desde arriba a la izquierda y pega en el reflector, formando un ángulo theta con su superficie.', `draw('#g2a-in',{dur:1200})`],
      ['En un espejo, el ángulo de incidencia es igual al de reflexión. Dicho con nuestro ángulo: el rayo reflejado sale formando el mismo theta con la superficie del espejo.', `draw('#g2a-rf',{dur:1200})`],
      ['El reflejado va hacia la cara del agua. Como es una cara adyacente del cubo, es perpendicular al reflector. Entonces la normal a esa cara es horizontal: paralela al reflector.', `draw('#g2a .nor',{dur:900})`],
      ['[A] ¿Y con qué ángulo llega a la cara del agua? [P] Con theta. El rayo forma theta con la horizontal, y la normal es horizontal: son ángulos alternos internos entre paralelas. La incidencia en la cara del agua es directamente theta.'],
    ],
  },

  {
    sec: 'Geo 2 · Geometría', title: '¿Qué pasa al aumentar θ?', cls: B, chapter: SEC, css: CSS,
    html: `<div class="g2row">${cubo('g2b', 25, { sweep: true })}
      <div style="display:flex;flex-direction:column;gap:26px">${ul(['@1 $\\theta$ chico: llega casi de frente ⇒ **refracta**', '@2 $\\theta = 48°$: sale rasante ⇒ $\\theta_L = 48°$', '@3 $\\theta > 48°$: **reflexión total**'])}
      ${callout('**Chequeo:** si $\\theta$ se midiera desde la normal, la incidencia sería $90° - \\theta$ y la reflexión total aparecería para $\\theta$ **chicos**: al revés del enunciado.', { s: 4, cls: 'warn', style: 'font-size:.86em' })}</div></div>`,
    steps: [
      ['Veamos qué pasa cuando theta cambia. Arrancamos con un ángulo chico, de unos veinticinco grados: el rayo sube poco inclinado.'],
      ['Con theta chico, el reflejado llega a la cara del agua casi de frente. Pasa al agua, refractado, y solo una parte chiquita se refleja.', go(25, 40)],
      ['A medida que theta crece, el rayo sube más empinado y llega a la cara del agua cada vez más rasante. El refractado se va acostando, hasta que en cuarenta y ocho grados sale pegado a la cara.', go(40, 48)],
      ['Desde ahí, toda la luz se refleja dentro del vidrio: no entra nada al agua. Es justo lo que dice el enunciado. Entonces, el ángulo límite del vidrio al agua es de cuarenta y ocho grados.', go(48, 62)],
      ['Esto también confirma que leímos bien el ángulo. Si theta se midiera desde la normal del reflector, la incidencia en el agua sería noventa menos theta, y la reflexión total aparecería para ángulos chicos, al revés del enunciado.', JS + `g2go('g2b', 62, 62, 100);`],
    ],
  },

  {
    sec: 'Geo 2 · Cuentas', title: 'Índice del vidrio y rapidez', cls: B, chapter: SEC,
    html: `<div style="display:flex;flex-direction:column;align-items:center;gap:36px">${eqs([
      { t: '\\theta_L = 48°', s: 0 },
      { t: '\\sen\\theta_L = \\frac{n_{agua}}{n_v} \\;\\Rightarrow\\; n_v = \\frac{1{,}33}{\\sen 48°} = \\frac{1{,}33}{0{,}7431} = 1{,}790', s: 1 },
      { t: 'n_v = 1{,}79 > n_{agua} = 1{,}33 \\quad \\checkmark', s: 2, cls: 'ok' },
      { t: 'v = \\frac{c}{n_v} = \\frac{3\\cdot10^8}{1{,}790} = 1{,}676\\cdot10^8\\ \\tfrac{\\text{m}}{\\text{s}}', s: 3 },
    ], { style: 'padding:26px 50px' })}${res('$v \\approx 1{,}68\\cdot10^8$ m/s $\\approx 0{,}56\\,c$', { s: 3 })}</div>`,
    steps: [
      ['Ahora las cuentas, que son cortas. El ángulo límite es de cuarenta y ocho grados.'],
      ['El seno del ángulo límite es el índice del agua sobre el del vidrio. Despejando, el índice del vidrio es uno coma treinta y tres dividido el seno de cuarenta y ocho grados. El seno da cero coma siete cuatro tres uno, y el índice, uno coma setenta y nueve. [A] ¿La calculadora va en grados? [P] Sí, acá en grados, porque el ángulo viene en grados.'],
      ['Chequeo: uno coma setenta y nueve es mayor que uno coma treinta y tres. Tiene que serlo: si no, no podría haber reflexión total del vidrio hacia el agua.'],
      ['Y la rapidez es c sobre el índice. Tres por diez a la ocho, dividido uno coma setenta y nueve, da uno coma sesenta y ocho por diez a la ocho metros por segundo. Un poco más de la mitad de la velocidad de la luz en el vacío.', `pulse(S.querySelector('.res'))`],
    ],
  },

  {
    sec: 'Geo 2 · Cierre', title: 'Dónde es fácil equivocarse', cls: B, chapter: SEC,
    html: ul([
      '@0 **Medir 48° desde la normal:** daría $n = \\frac{1{,}33}{\\sen 42°} = 1{,}99$ y $v = 1{,}51\\cdot10^8$ m/s. Contradice el "≥" del enunciado.',
      '@1 **Invertir el cociente:** $\\frac{n_v}{n_{agua}} > 1$ no puede ser un seno. El índice menor va arriba.',
      '@2 **Calculadora en RAD** para $\\sen 48°$: acá va en **DEG**.',
      '@3 **Redondear a mitad de camino:** el PDF escribe $n = 1{,}79$ pero divide por 1,78 y da $1{,}685\\cdot10^8$ m/s. Mejor $v = \\frac{c\\,\\sen\\theta_L}{n_{agua}}$ de una.',
    ]),
    steps: [
      ['Dónde es fácil equivocarse. El error más común: medir los cuarenta y ocho grados desde la normal. Daría un índice de uno coma noventa y nueve y otra rapidez, y además contradice el mayor o igual del enunciado. En el examen, dibujá la normal y marcá el ángulo.'],
      ['Segundo, invertir el cociente. Un seno no puede ser mayor que uno: el índice menor siempre va arriba.'],
      ['Tercero, la calculadora en radianes. El seno de cuarenta y ocho radianes no tiene nada que ver.'],
      ['Y cuarto, redondear a mitad de camino. La resolución del PDF escribe uno coma setenta y nueve, pero divide por uno coma setenta y ocho, y le da un poco más. Lo más seguro es hacer c por el seno del ángulo límite, sobre uno coma treinta y tres, todo junto.'],
    ],
  },

  {
    sec: 'Geo 2 · Cierre', title: 'La receta y los resultados', cls: B, chapter: SEC,
    html: `<div class="grid g2" style="align-items:start">${ul([
      '@0 **1.** Dibujar el rayo y la normal de cada cara que toca.',
      '@1 **2.** Con geometría, la incidencia en la cara del agua: $\\theta$.',
      '@2 **3.** Donde empieza la reflexión total: $\\sen\\theta_L = \\frac{n_{menor}}{n_{mayor}}$.',
      '@3 **4.** Despejar $n$; después $v = \\frac{c}{n}$.',
    ])}${card('Resultados', `<div style="font-size:.95em;line-height:1.8">${md('$\\theta_L = 48°$ (incidencia en la cara del agua $= \\theta$)')}<br>${md('$n_v = \\frac{1{,}33}{\\sen 48°} \\approx 1{,}79$')}<br>${md('$v = \\frac{c}{n_v} \\approx 1{,}68\\cdot10^8$ m/s')}</div>`, { cls: 'ok', s: 4 })}</div>`,
    steps: [
      ['La receta. Uno: dibujar el rayo y la normal de cada cara que toca.'],
      ['Dos: con geometría, sacar el ángulo con que llega a la cara que importa. Acá, theta.'],
      ['Tres: el ángulo donde empieza la reflexión total es el ángulo límite, con el índice menor sobre el mayor.'],
      ['Y cuatro: despejar el índice, y con él la rapidez.'],
      ['Los resultados: el índice del vidrio es uno coma setenta y nueve, y la rapidez de la luz en el vidrio, uno coma sesenta y ocho por diez a la ocho metros por segundo.'],
    ],
  },
];
