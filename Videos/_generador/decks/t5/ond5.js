// Ond 5 · Recuperatorio 1P 18/6/2024, ej. 3. Verificado (soluciones/Ond5.py): v = 60 m/s, μ = 0,005 kg/m, L = 2 m, λ = 0,8 m, f = 75 Hz, f₁ = 15 Hz ⇒ 5º armónico;
// y = 0,04 sen(2,5πx) sen(150πt); en x = 0,6 m (antinodo) u_K = 0,888 cos²(150πt) J/m, período T/2 = 6,67 ms (4,5 en [0,04; 0,07] s);
// máximos en 0,0400; 0,0467; 0,0533; 0,0600; 0,0667 s; ceros en 0,0433; 0,0500; 0,0567; 0,0633; 0,0700 s.
const { md, ul, card, callout, eqs, res, datos, img, molde, plot, cuerda } = require('../../lib');
const { seccion } = require('../common');

const SEC = 'Ond 5 · Armónico y energía cinética';
const B = 'b-ond';

// funciones de página (prefijo ond5_)
const script = `<script>
// mueve un punto de la cuerda y llena una barra de energía cinética, sincronizados con standing()
function ond5_sync(svgSel, x, dotSel, barSel, o) {
  const svg = S.querySelector(svgSel);
  const L = +svg.dataset.l, k = +svg.dataset.k, A = +svg.dataset.a;
  const per = o.per, dur = o.dur, ph = o.phase || 0, nk = Math.max(2, Math.round(dur / per * 24));
  const sh = Math.sin(k * x), th = i => 2 * Math.PI * (i / nk * dur) / per + ph;
  const cEnd = o.end === 'flat' ? 0 : Math.cos(th(nk)), kEnd = o.end === 'flat' ? 1 : Math.sin(th(nk)) ** 2;
  const dot = S.querySelector(dotSel);
  dot.style.transform = 'translateY(' + (-A * sh * cEnd).toFixed(1) + 'px)';
  dot.animate(Array.from({ length: nk + 1 }, (_, i) => ({ transform: 'translateY(' + (-A * sh * Math.cos(th(i))).toFixed(1) + 'px)' })), { duration: dur, easing: 'linear', fill: 'backwards' });
  if (!barSel) return;
  const bar = S.querySelector(barSel);
  bar.style.transformBox = 'fill-box'; bar.style.transformOrigin = '0% 50%';
  bar.style.transform = 'scaleX(' + kEnd.toFixed(3) + ')';
  bar.animate(Array.from({ length: nk + 1 }, (_, i) => ({ transform: 'scaleX(' + (Math.sin(th(i)) ** 2).toFixed(3) + ')' })), { duration: dur, easing: 'linear', fill: 'backwards' });
}
</script>`;

// superposición de la incidente y la reflejada (extremos fijos, 5 medias ondas)
const sup = `<svg id="o5sup" viewBox="0 0 900 700" style="width:840px;overflow:visible">
  <g font-size="26" font-family="Segoe UI" fill="#93a4bc">
    <text x="40" y="40">incidente  A cos(kx − ωt)  →</text>
    <text x="40" y="262">reflejada, invertida  −A cos(kx + ωt)  ←</text>
    <text x="40" y="484" fill="#6fdc8c">suma: estacionaria con nodos fijos</text>
  </g>
  ${[120, 342, 564].map(y => `<line x1="60" y1="${y}" x2="860" y2="${y}" stroke="#33476a" stroke-width="2" stroke-dasharray="8 8"/>`).join('')}
  <rect x="34" y="490" width="26" height="150" rx="4" fill="#3a4d6b" stroke="#8fa6c4" stroke-width="3"/>
  <rect x="860" y="490" width="26" height="150" rx="4" fill="#3a4d6b" stroke="#8fa6c4" stroke-width="3"/>
  <path id="o5w1" d="M60,120 L860,120" fill="none" stroke="#5aa9ff" stroke-width="6"/>
  <path id="o5w2" d="M60,342 L860,342" fill="none" stroke="#c49bff" stroke-width="6"/>
  <path id="o5ws" d="M60,564 L860,564" fill="none" stroke="#6fdc8c" stroke-width="7"/>
  ${[0, 1, 2, 3, 4, 5].map(j => `<circle cx="${60 + j * 160}" cy="564" r="10" fill="#ff6f7d" stroke="#0d1522" stroke-width="3"/>`).join('')}
  <g id="o5an" data-s="3"><text x="460" y="690" font-size="26" fill="#ffc562" text-anchor="middle" font-weight="700">en los antinodos la amplitud es 2A = 4 cm</text></g>
</svg>`;
const supJs = `
  const g1 = {x0:60, x1:860, y:120, L:1}, g2 = {x0:60, x1:860, y:342, L:1}, gs = {x0:60, x1:860, y:564, L:1};
  const k = 5*Math.PI, per = 1800, w = 2*Math.PI/per, A = 40, d = talk();
  animFn('#o5w1', g1, (x,t) => A*Math.cos(k*x - w*t), {dur:d});
  animFn('#o5w2', g2, (x,t) => -A*Math.cos(k*x + w*t), {dur:d});
  animFn('#o5ws', gs, (x,t) => 2*A*Math.sin(k*x)*Math.sin(w*t), {dur:d});`;

// cuerda fijo–fijo de 2 m en el 5º armónico
const c5 = (id, extra = '', o = {}) => cuerda(Object.assign({ id, L: 2, n: 5, model: 'ff', w: 1500, h: 360, A: 100, ticks: [0, 0.4, 0.8, 1.2, 1.6, 2], extra }, o));
const P06 = 120 + 0.6 / 2 * 1260; // px de x = 0,6 m
const punto = `<g id="o5p"><circle class="pt" cx="${P06}" cy="180" r="22"/></g><text x="${P06}" y="36" fill="#c49bff" font-size="46" font-weight="700" text-anchor="middle">x = 0,6 m</text>`;

// gráfico de u_K(t)
const W = 150 * Math.PI, UK = 0.888;
const uk = t => UK * Math.cos(W * t) ** 2;
const maxs = [0.04, 0.04667, 0.05333, 0.06, 0.06667], ceros = [0.04333, 0.05, 0.05667, 0.06333, 0.07];

module.exports = [
  seccion('Ond 5', 'Armónico y energía cinética', 'Recuperatorio del primer parcial, 18/6/2024 · ejercicio 3',
    'Ejercicio de ondas número cinco: recuperatorio del primer parcial del dieciocho de junio de dos mil veinticuatro, ejercicio tres. Una onda que viaja por una cuerda fija en los dos extremos, y el gráfico de la energía cinética de un punto.'),

  {
    sec: 'Ond 5 · Enunciado', title: 'Qué dice el enunciado', cls: B, chapter: SEC,
    html: `${script}<div style="display:flex;flex-direction:column;gap:34px;align-items:center">${img('Ond5.jpg', { style: 'width:1500px' })}
      ${datos(['@1 $m = 10$ g', '@1 fijo–fijo', '@1 tensión $F = 18$ N', '@2 $y = A\\cos(kx-\\omega t)$', '@2 $A = 2$ cm', '@2 $k = 2{,}5\\pi$ m$^{-1}$', '@2 $\\omega = 150\\pi$ s$^{-1}$',
        '@3 en $t = 0$: horizontal', '@3 $x = 60$ cm', '@3 $t$ de $0{,}04$ s a $0{,}07$ s', '@4 ¿$L$? no está'], { style: 'justify-content:center;max-width:1650px' })}</div>`,
    steps: [
      ['Este es el enunciado. Lo leemos con calma y vamos anotando los datos.'],
      ['Una cuerda de diez gramos, fija en los dos extremos, con una tensión de dieciocho newtons.'],
      ['Por la cuerda se propaga la onda A coseno de k x menos omega t. La amplitud es de dos centímetros, k vale dos coma cinco pi por metro y omega, ciento cincuenta pi por segundo.'],
      ['El ítem a pide el armónico. En el b, la cuerda está horizontal en t igual a cero, y hay que graficar la densidad de energía cinética del punto x igual a sesenta centímetros, entre cero coma cero cuatro y cero coma cero siete segundos.'],
      ['[A] ¿Y el largo de la cuerda? [P] No lo dan. Lo vamos a sacar de la masa.'],
    ],
  },

  {
    sec: 'Ond 5 · Antes de calcular', title: 'Buscar el molde en la hoja', cls: B, chapter: SEC,
    html: `${molde('Ejercicio 6 de la hoja: **estacionaria fijo–libre, masa y gráfico de $u_U(t)$** (1C 2026). Dan una propagante $A\\cos(kx-\\omega t)$ y la tensión, y piden graficar una densidad de energía en un punto, entre dos instantes, con la cuerda horizontal en $t = 0$.', { s: 0 })}
      <div class="grid g2" style="margin-top:40px">
        ${card('Lo que se repite', ul(['$v = \\frac{\\omega}{k}$ y $\\mu = \\frac{F}{v^2}$', 'Amplitud de la estacionaria: $2A$', 'Nodo en $x=0$ y horizontal en $t=0$: $y = 2A\\sen(kx)\\sen(\\omega t)$', 'El gráfico tiene período $\\frac{T}{2}$']), { cls: 'ok', s: 1 })}
        ${card('Lo que cambia', ul(['Los dos extremos son fijos: $L = n\\frac{\\lambda}{2}$', 'Hay que sacar $L$ de la masa para el armónico', 'Se grafica la **cinética** $u_K$: factor $\\cos^2(\\omega t)$, no $\\sen^2$']), { cls: 'warn', s: 2 })}
      </div>`,
    steps: [
      ['Buscamos el molde en la hoja: es el ejercicio seis, la cuerda fijo–libre de dos mil veintiséis. También dan una propagante y la tensión, y piden graficar una energía en un punto.'],
      ['Se repite casi todo: la velocidad, mu, la amplitud dos A y la forma dos A, seno de k x, seno de omega t.'],
      ['Lo que cambia: los dos extremos son fijos, el largo sale de la masa, y se grafica la energía cinética, no la elástica. Eso cambia el factor temporal.'],
    ],
  },

  {
    sec: 'Ond 5 · Datos', title: 'Lo que esconde la onda', cls: B, chapter: SEC,
    css: `.o5d{display:grid;grid-template-columns:1fr 640px;gap:50px;align-items:center}
      .o5ch{display:flex;flex-direction:column;gap:18px;align-items:stretch}
      .o5ch .bx{border:2px solid var(--line);border-radius:18px;padding:12px 24px;background:var(--panel);font-size:.9em;text-align:center}
      .o5ch .bx.on{border-color:var(--accent);color:#fff} .o5ch .ar{text-align:center;color:var(--accent);font-size:1.1em;line-height:.6}`,
    html: `<div class="o5d">${eqs([
      { t: 'v = \\frac{\\omega}{k} = \\frac{150\\pi}{2{,}5\\pi} = 60\\ \\tfrac{\\text{m}}{\\text{s}}', s: 0 },
      { t: '\\mu = \\frac{F}{v^2} = \\frac{18}{3600} = 0{,}005\\ \\tfrac{\\text{kg}}{\\text{m}}', s: 1 },
      { t: 'L = \\frac{m}{\\mu} = \\frac{0{,}010}{0{,}005} = 2\\ \\text{m}', s: 2, cls: 'hl' },
      { t: '\\lambda = \\frac{2\\pi}{k} = \\frac{2}{2{,}5} = 0{,}8\\ \\text{m}', s: 3 },
    ], { title: 'Datos derivados' })}
      <div class="o5ch"><div class="bx on" data-s="0">${md('la onda: $\\omega$ y $k$')}</div><div class="ar" data-s="0">↓</div><div class="bx" data-s="0">${md('velocidad $v$')}</div>
        <div class="ar" data-s="1">↓ con la tensión</div><div class="bx" data-s="1">${md('densidad $\\mu$')}</div><div class="ar" data-s="2">↓ con la masa</div><div class="bx on" data-s="2">${md('largo $L$')}</div></div></div>`,
    steps: [
      ['Arrancamos sacando todo lo que esconde la onda. La velocidad es omega sobre k: ciento cincuenta pi sobre dos coma cinco pi. Los pi se cancelan y quedan sesenta metros por segundo.'],
      ['En una cuerda la velocidad también es raíz de la tensión sobre mu. Despejando, mu es la tensión sobre v al cuadrado: dieciocho sobre tres mil seiscientos, cero coma cero cero cinco kilos por metro. O sea, cinco gramos por metro.'],
      ['[A] ¿Y con eso sale el largo? [P] Sí. Si cada metro tiene cinco gramos y la cuerda entera tiene diez, mide dos metros: L es la masa sobre mu, con la masa en kilos.'],
      ['Por último, la longitud de onda: dos pi sobre k, que da dos sobre dos coma cinco, cero coma ocho metros.'],
    ],
  },

  {
    sec: 'Ond 5 · a) Armónico', title: '¿Cuántas medias ondas entran en 2 m?', cls: B, chapter: SEC,
    html: `<div style="display:flex;flex-direction:column;align-items:center;gap:18px">
      <div class="row" style="gap:34px">${eqs([{ t: 'L = n\\,\\frac{\\lambda}{2} \\;\\Rightarrow\\; n = \\frac{2L}{\\lambda} = \\frac{4}{0{,}8} = 5', s: 0 }], { style: 'padding:14px 34px' })}
        ${eqs([{ t: 'f = \\frac{\\omega}{2\\pi} = 75\\ \\text{Hz},\\quad f_1 = \\frac{v}{2L} = 15\\ \\text{Hz}', s: 3 }], { style: 'padding:14px 34px' })}</div>
      ${c5('o5c1', '', { sNodes: 2, style: 'width:1450px' })}
      ${res('5º armónico: 6 nodos, 4 internos', { s: 3 })}</div>`,
    steps: [
      ['Ítem a: qué armónico. Con los dos extremos fijos, los extremos no se mueven: son nodos. Entre dos nodos seguidos hay media longitud de onda. Entonces en el largo de la cuerda entra un número entero de medias ondas: L igual a n, lambda sobre dos.'],
      ['Despejamos n: dos L sobre lambda. Cuatro sobre cero coma ocho da cinco. La onda forma el quinto armónico, con cinco panzas.', `standing('#o5c1',{dur:talk(), per:1500})`],
      ['Controlamos contando nodos: hay uno cada cuarenta centímetros, seis en total y cuatro internos. El armónico n siempre tiene n menos uno nodos internos.', `standing('#o5c1',{dur:talk(), per:1500})`],
      ['Otro control, con frecuencias. La de la onda es omega sobre dos pi: setenta y cinco hertz. La fundamental es v sobre dos L: quince hertz. Setenta y cinco dividido quince da cinco. [A] ¿Y si n no daba entero? [P] Entonces esa onda no podría formar una estacionaria en esa cuerda: habría un error en los datos o en las cuentas.', `standing('#o5c1',{dur:talk(), per:1500, end:'max'})`],
    ],
  },

  {
    sec: 'Ond 5 · Teoría', title: 'De la propagante a la estacionaria', cls: B, chapter: SEC,
    css: `.o5s{display:grid;grid-template-columns:860px 1fr;gap:40px;align-items:center}`,
    html: `<div class="o5s"><div>${sup}</div>
      ${eqs([
      { t: 'y_1 = A\\cos(kx-\\omega t)', s: 1 },
      { t: 'y_2 = -A\\cos(kx+\\omega t)', s: 1 },
      { t: 'y = y_1 + y_2 = 2A\\,\\sen(kx)\\,\\sen(\\omega t)', s: 1, cls: 'hl' },
      { t: 't = 0:\\ \\sen 0 = 0 \\Rightarrow y(x,0) = 0', s: 2, cls: 'ok', note: 'horizontal ✓' },
      { t: 'y = 0{,}04\\,\\sen(2{,}5\\pi x)\\,\\sen(150\\pi t)', s: 3, note: '[m, s]' },
    ])}</div>`,
    steps: [
      ['¿De dónde sale la estacionaria? La onda del enunciado viaja hacia la derecha, se refleja invertida en el extremo fijo y vuelve. Las dos se superponen: cada punto oscila en su lugar, y los nodos no se mueven nunca.', supJs],
      ['En fórmulas: la incidente es A coseno de k x menos omega t, la reflejada es menos A coseno de k x más omega t. Restando los dos cosenos queda dos A, seno de k x, seno de omega t. El seno de k x pone el nodo en x igual a cero, como corresponde a un extremo fijo.'],
      ['Fijate el seno de omega t: en t igual a cero vale cero, así que la cuerda está horizontal en todos lados. Es justo la condición del enunciado.'],
      ['Y lo más importante: en los antinodos las dos ondas se suman, así que la amplitud es dos A, cuatro centímetros. Con números: cero coma cero cuatro, seno de dos coma cinco pi x, seno de ciento cincuenta pi t.', `flash('#o5an')`],
    ],
  },

  {
    sec: 'Ond 5 · b) Energía cinética', title: '$u_K$ en el punto $x = 0{,}6$ m', cls: B, chapter: SEC,
    css: `.o5k{display:grid;grid-template-columns:760px 1fr;gap:36px;align-items:center} .o5k .eqs{font-size:.9em}
      .o5bar text{fill:var(--muted);font-size:24px;font-family:"Segoe UI"}`,
    html: `<div class="o5k">${eqs([
      { t: 'u_K = \\tfrac12\\,\\mu\\left(\\frac{\\partial y}{\\partial t}\\right)^2', s: 0 },
      { t: '\\frac{\\partial y}{\\partial t} = 2A\\omega\\,\\sen(kx)\\cos(\\omega t)', s: 1 },
      { t: 'kx = 2{,}5\\pi\\cdot0{,}6 = 1{,}5\\pi \\Rightarrow \\sen^2(kx) = 1', s: 2, note: 'antinodo' },
      { t: 'u_K = \\tfrac12\\cdot0{,}005\\,(0{,}04\\cdot150\\pi)^2\\cos^2(\\omega t)', s: 3 },
      { t: 'u_K = 0{,}888\\,\\cos^2(150\\pi t)\\ \\ \\tfrac{\\text{J}}{\\text{m}}', s: 3, cls: 'ok' },
    ])}
      <div style="display:flex;flex-direction:column;gap:10px">${c5('o5c2', punto, { nodes: false, ticks: [], style: 'width:930px' })}
        <svg class="o5bar" data-s="2" viewBox="0 0 930 100" style="width:930px"><text x="0" y="28" style="font-size:28px">energía cinética del punto x = 0,6 m</text>
          <rect x="0" y="44" width="920" height="44" rx="12" fill="#17243a" stroke="#2a3d5c" stroke-width="2"/>
          <rect id="o5bar" x="0" y="44" width="920" height="44" rx="12" fill="#c49bff"/></svg></div></div>`,
    steps: [
      ['Ítem b. La densidad de energía cinética es la energía cinética por unidad de largo. Cada pedacito de cuerda tiene masa mu por d x y se mueve con velocidad d y d t. Por eso u K es un medio de mu, por la derivada temporal al cuadrado.'],
      ['La derivada temporal de la onda es dos A omega, seno de k x, coseno de omega t. El seno de k x dice dónde: cuánto se mueve cada punto. El coseno de omega t dice cuándo.'],
      ['Nuestro punto está en sesenta centímetros: k por x da uno coma cinco pi, y el seno al cuadrado vale uno. Es un antinodo, el punto que más se mueve. Mirá la barra: se llena cada vez que la cuerda pasa por horizontal. [A] ¿Por qué ahí y no en la punta? [P] Porque al pasar por el equilibrio la velocidad es máxima. En la punta de la oscilación se frena.',
        `const d = talk(), per = 2400; standing('#o5c2',{dur:d, per, phase:-Math.PI/2, end:'flat'}); ond5_sync('#o5c2', 0.6, '#o5p', '#o5bar', {dur:d, per, phase:-Math.PI/2, end:'flat'});`],
      ['Reemplazamos: un medio, por cero coma cero cero cinco, por cero coma cero cuatro por ciento cincuenta pi, al cuadrado. Da cero coma ochocientos ochenta y ocho. Queda u K igual a cero coma ochocientos ochenta y ocho, coseno cuadrado de ciento cincuenta pi t, en joules por metro.'],
    ],
  },

  {
    sec: 'Ond 5 · b) Gráfico', title: 'El gráfico de $u_K(t)$ entre 0,04 y 0,07 s', cls: B, chapter: SEC,
    css: `.o5g{display:grid;grid-template-columns:1130px 1fr;gap:34px;align-items:center}`,
    html: `<div class="o5g">${plot({
      w: 1130, h: 600, x: [0.04, 0.07], y: [0, 1], pad: { l: 110, r: 90, t: 40, b: 70 },
      ticksX: [0.04, 0.045, 0.05, 0.055, 0.06, 0.065, 0.07], ticksY: [0, 0.444, 0.888], fmtX: v => v.toFixed(3).replace('.', ','), fmtY: v => String(v).replace('.', ','),
      xl: '', yl: '', id: 'o5pl',
      curves: [{ f: uk, n: 900, area: true, id: 'o5uk', s: 2 }],
      extra: (px, py) => `<text class="axl" x="${px(0.04) + 14}" y="${py(1) + 4}">u<tspan baseline-shift="sub" font-size="19">K</tspan> (J/m)</text><text class="axl" x="${px(0.07) + 18}" y="${py(0) + 8}">t (s)</text>` + maxs.map(t => `<circle class="dot" data-s="${t === 0.04 ? 1 : 3}" cx="${px(t)}" cy="${py(UK)}" r="11"/>`).join('') +
        ceros.map(t => `<circle class="dot" data-s="${t === 0.07 ? 1 : 3}" cx="${px(t)}" cy="${py(0)}" r="11" style="fill:#ff6f7d"/>`).join(''),
    })}
      <div style="display:flex;flex-direction:column;gap:22px;font-size:.86em">
        ${eqs([{ t: '\\tfrac{T}{2} = \\tfrac{1}{150}\\ \\text{s} = 6{,}67\\ \\text{ms}', s: 0 }, { t: '\\tfrac{0{,}03}{1/150} = 4{,}5 \\text{ períodos}', s: 0 }])}
        ${card('Máximos (0,888 J/m)', '<div class="mono" style="font-size:.86em">0,0400 · 0,0467 · 0,0533<br>0,0600 · 0,0667 s</div>', { s: 3, style: 'padding:18px 24px' })}
        ${card('Ceros', '<div class="mono" style="font-size:.86em">0,0433 · 0,0500 · 0,0567<br>0,0633 · 0,0700 s</div>', { s: 3, cls: 'bad', style: 'padding:18px 24px' })}
        ${callout('Escalas: 1 cm = 2 ms (15 cm de largo); 1 cm = 0,1 J/m.', { s: 4, cls: 'ok' })}</div></div>`,
    steps: [
      ['Ahora el gráfico. El coseno cuadrado se repite cada medio período: un ciento cincuentavo de segundo, seis coma sesenta y siete milisegundos. El intervalo dura cero coma cero tres segundos: cuatro períodos y medio.'],
      ['Después, los extremos. En cero coma cero cuatro, omega t da seis pi: el coseno cuadrado vale uno y u K es máxima, cero coma ochocientos ochenta y ocho. En cero coma cero siete, omega t da diez coma cinco pi: el coseno es cero, y u K también.'],
      ['Con eso el dibujo sale solo: cinco lomas de coseno cuadrado. Arranca arriba, baja a cero, vuelve a subir, y termina en cero después de cuatro lomas y media.', `sweep('#o5uk-a, #o5uk',{dur:talk(600)})`],
      ['Marcamos los máximos y los ceros. Los máximos están cada seis coma sesenta y siete milisegundos, empezando en cero coma cero cuatro. Los ceros quedan justo en el medio. [A] ¿Los ceros son en punta, como una V? [P] No. El coseno cuadrado toca el cero suave, tangente al eje. Hay que dibujarlo redondeado.'],
      ['Y no te olvides de las escalas, que el enunciado las pide. Por ejemplo, un centímetro cada dos milisegundos, así el gráfico ocupa quince centímetros. Y un centímetro cada cero coma uno joules por metro.'],
    ],
  },

  {
    sec: 'Ond 5 · Cierre', title: 'Dónde es fácil equivocarse', cls: B, chapter: SEC,
    html: ul([
      '@0 **Buscar $L$ en el enunciado:** no está. Sale de $\\mu = \\frac{F}{v^2}$ y $L = \\frac{m}{\\mu}$.',
      '@1 **Amplitud $A$ en vez de $2A$:** con $A$ da $0{,}222$ J/m, la cuarta parte.',
      '@2 **$\\sen^2(\\omega t)$ en vez de $\\cos^2$:** horizontal en $t = 0$ ⇒ velocidad máxima ⇒ $u_K$ arranca en el máximo.',
      '@3 **Período $T$ en vez de $\\frac{T}{2}$:** saldrían la mitad de las lomas.',
      '@4 **Calculadora en grados:** $kx = 1{,}5\\pi$ y $\\omega t = 6\\pi$ son radianes.',
    ]),
    steps: [
      ['Los lugares donde es fácil equivocarse. Primero, buscar el largo en el enunciado. No está: sale de mu y de la masa.'],
      ['Segundo, la amplitud. Los dos centímetros son de la propagante. La estacionaria tiene el doble, y como u K va con la amplitud al cuadrado, con A te daría la cuarta parte: cero coma doscientos veintidós.'],
      ['Tercero, el factor temporal. Horizontal en t igual a cero quiere decir velocidad máxima: va coseno cuadrado. El seno cuadrado es el de la energía elástica.'],
      ['Cuarto, el período del gráfico es la mitad del período de la onda. Con el período entero dibujarías la mitad de las lomas.'],
      ['Y quinto: k x y omega t están en radianes. La calculadora va en modo radianes.'],
    ],
  },

  {
    sec: 'Ond 5 · Cierre', title: 'La receta y los resultados', cls: B, chapter: SEC,
    html: `<div class="grid g2" style="align-items:start">${ul([
      '@0 **1.** De la onda: $v = \\frac{\\omega}{k}$, $\\mu = \\frac{F}{v^2}$, $L = \\frac{m}{\\mu}$, $\\lambda = \\frac{2\\pi}{k}$.',
      '@1 **2.** Fijo–fijo: $n = \\frac{2L}{\\lambda}$; control con $\\frac{f}{f_1}$.',
      '@2 **3.** Estacionaria: $y = 2A\\sen(kx)\\sen(\\omega t)$.',
      '@3 **4.** $u_K = \\frac12\\mu(\\partial_t y)^2$: $\\sen^2(kx)$ dónde, $\\cos^2(\\omega t)$ cuándo.',
      '@4 **5.** Gráfico: período $\\frac{T}{2}$, extremos, máximos, ceros y escalas.',
    ])}${card('Resultados', `<div style="font-size:.88em;line-height:1.7">a) $v = 60$ m/s, $L = 2$ m, $\\lambda = 0{,}8$ m<br>⇒ **5º armónico**<br>b) $y = 0{,}04\\sen(2{,}5\\pi x)\\sen(150\\pi t)$<br>$u_K = 0{,}888\\cos^2(150\\pi t)$ J/m<br>máx. en 0,04; 0,0467… ceros en 0,0433…</div>`.replace(/\$([^$]+)\$/g, m => md(m)).replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>'), { cls: 'ok', s: 5 })}</div>`,
    steps: [
      ['La receta, en cinco pasos. Uno: de la onda sacar la velocidad, mu, el largo y lambda.'],
      ['Dos: con los dos extremos fijos, n es dos L sobre lambda, y se controla con el cociente de frecuencias.'],
      ['Tres: escribir la estacionaria con amplitud dos A y la condición inicial.'],
      ['Cuatro: la densidad de energía cinética. El seno cuadrado de k x dice dónde, el coseno cuadrado de omega t dice cuándo.'],
      ['Y cinco: para el gráfico, período mitad, valores en los extremos, máximos, ceros y escalas.'],
      ['Estos son los resultados. Si llegaste a lo mismo, vas muy bien. Si no, volvé al paso donde te separaste.'],
    ],
  },
];
