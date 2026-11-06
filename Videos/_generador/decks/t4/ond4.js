// Ond 4 · 1P 14/9/2024, ej. 2 (guitarra). Verificado con soluciones/Ond4.py: μ = 3·10⁻³ kg/m, f1 = 110 Hz, v = 140,8 m/s, F = 59,47 N;
// a) vibra del dedo al puente L' = 24 cm: f1' = 293,3 Hz, 440/293,3 = 1,5 ⇒ no (con 40 cm: 176 Hz, 2,5 ⇒ tampoco);
// b) 880 Hz = 3er armónico, λ = 16 cm, k = 12,5π m⁻¹, ω = 1760π s⁻¹, T = 1,136 ms, ωt1 = 2,75π ⇒ cos² = ½, ∫sen² = 0,06 m,
//    μω² = 91 716, E_K = 1375,7·A² ⇒ A = 1,26 cm (antinodos; como propagante 0,63 cm);
// c) ωt2 = 5,5π ⇒ máxima elongación, u_U = 0,0459 cos²(12,5πx) J/m (máx. en 8 y 16 cm, ceros en 12 y 20 cm).
const { md, ul, card, callout, eqs, res, datos, img, molde, plot, cuerda } = require('../../lib');
const { seccion } = require('../common');

const SEC = 'Ond 4 · Guitarra: nota y energía';
const B = 'b-ond';

// ---------------------------------------------------------------- guitarra (x = 0 en la cejuela, a la derecha; x = L en el puente)
const GX0 = 1380, GXL = 241, GY = 250;
const gpx = xcm => GX0 - xcm / 64 * (GX0 - GXL);
const XD = gpx(40);
function guitarra(id) {
  const frets = [];
  for (let n = 1; n <= 20; n++) { const p = gpx(64 * (1 - Math.pow(2, -n / 12))); if (p > 660) frets.push(p); }
  const brace = (x1, x2, y, txt, s, cls) => `<g class="o4-br ${cls}" data-s="${s}"><path d="M${x1},${y + 16} L${x1},${y} L${x2},${y} L${x2},${y + 16}"/><text x="${(x1 + x2) / 2}" y="${y - 14}">${txt}</text></g>`;
  return `<svg id="${id}" class="o4-gt" viewBox="0 0 1640 540" style="width:1500px">
    <defs><marker id="${id}-ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#93a4bc"/></marker></defs>
    <path class="body" d="M491.7,191.4 A172,172 0 1 0 491.7,308.6 A132,132 0 1 0 491.7,191.4 Z"/>
    <circle class="hole" cx="565" cy="250" r="50"/>
    <rect class="neck" x="650" y="222" width="730" height="56"/>
    ${frets.map(p => `<line class="fret" x1="${p.toFixed(1)}" y1="222" x2="${p.toFixed(1)}" y2="278"/>`).join('')}
    <polygon class="head" points="1386,212 1590,196 1590,304 1386,288"/>
    ${[1440, 1495, 1550].map(x => `<circle class="peg" cx="${x}" cy="${206 - (x - 1440) * 0.08}" r="11"/><circle class="peg" cx="${x}" cy="${294 + (x - 1440) * 0.08}" r="11"/>`).join('')}
    <rect class="nut" x="1376" y="216" width="12" height="68"/>
    <rect class="bridge" x="226" y="210" width="28" height="80" rx="4"/>
    <line class="str" x1="${XD}" y1="${GY}" x2="${GX0}" y2="${GY}"/>
    <path class="vib" id="${id}-vib" d="M${GXL},${GY} L${XD},${GY}"/>
    <g class="finger" data-s="0"><ellipse cx="${XD}" cy="${GY - 18}" rx="20" ry="30"/></g>
    ${brace(GXL, XD, 56, 'vibra: 24 cm', 1, 'on')}
    ${brace(XD, GX0, 56, '40 cm (no suena)', 2, '')}
    <line class="ax" x1="${GX0}" y1="470" x2="${GXL}" y2="470" marker-end="url(#${id}-ar)"/>
    <line class="tk" x1="${GX0}" y1="458" x2="${GX0}" y2="482"/><line class="tk" x1="${XD}" y1="458" x2="${XD}" y2="482"/><line class="tk" x1="${GXL}" y1="458" x2="${GXL}" y2="482"/>
    <text class="lb" x="${GX0}" y="518">x = 0 (cejuela)</text><text class="lb" x="${GXL + 40}" y="518">x = L = 64 cm</text>
    <text class="lb y" x="${XD}" y="518">x = 40 cm</text>
  </svg>`;
}
const GT_CSS = `.o4-gt{overflow:visible;font-family:"Segoe UI",Arial,sans-serif}
  .o4-gt .body{fill:#3b2a1c;stroke:#8a6a45;stroke-width:4} .o4-gt .hole{fill:#0b1220;stroke:#c9a26b;stroke-width:4}
  .o4-gt .neck{fill:#5a3d22;stroke:#8a6a45;stroke-width:2} .o4-gt .fret{stroke:#c9c2b0;stroke-width:3}
  .o4-gt .head{fill:#4a3220;stroke:#8a6a45;stroke-width:3} .o4-gt .peg{fill:#c9c2b0}
  .o4-gt .nut{fill:#efe6d0} .o4-gt .bridge{fill:#1b120b;stroke:#c9a26b;stroke-width:3}
  .o4-gt .str{stroke:#8fa6c4;stroke-width:3} .o4-gt .vib{fill:none;stroke:var(--accent);stroke-width:6;stroke-linecap:round}
  .o4-gt .finger ellipse{fill:rgba(255,197,98,.55);stroke:var(--warn);stroke-width:4}
  .o4-gt .o4-br path{fill:none;stroke:#93a4bc;stroke-width:3} .o4-gt .o4-br text{fill:#c9d5e6;font-size:30px;font-weight:700;text-anchor:middle}
  .o4-gt .o4-br.on path{stroke:var(--accent)} .o4-gt .o4-br.on text{fill:var(--accent)}
  .o4-gt .ax{stroke:#93a4bc;stroke-width:3} .o4-gt .tk{stroke:#93a4bc;stroke-width:3}
  .o4-gt .lb{fill:#93a4bc;font-size:26px;text-anchor:middle;font-family:Consolas,monospace} .o4-gt .lb.y{fill:var(--warn)}`;

// ---------------------------------------------------------------- peine de armónicos
const F1P = 140.8 / 0.48; // 293,33 Hz
const peine = plot({
  w: 1700, h: 340, x: [0, 1300], y: [0, 1.5], ticksX: [0, 200, 400, 600, 800, 1000, 1200], xl: 'f (Hz)', id: 'o4-pe', pad: { l: 60, r: 40, t: 30, b: 70 },
  extra: (px, py) => {
    let h = '';
    [1, 2, 3, 4].forEach(n => {
      const f = n * F1P;
      h += `<line class="o4-comb" data-s="1" data-gap="260" x1="${px(f)}" y1="${py(0)}" x2="${px(f)}" y2="${py(0.9)}"/><text class="lbl c2" data-s="1" x="${px(f)}" y="${py(0.97)}" style="text-anchor:middle">${n === 3 ? '880' : (Math.round(f * 10) / 10).toString().replace('.', ',')}</text>`;
    });
    [1, 2, 3, 4, 5, 6, 7].forEach(n => {
      const f = 176 * n;
      h += `<line class="o4-comb b" data-s="3" data-gap="90" x1="${px(f)}" y1="${py(0)}" x2="${px(f)}" y2="${py(0.42)}"/>`;
    });
    h += `<text class="lbl c5" data-s="3" x="${px(1290)}" y="${py(1.32)}" style="text-anchor:end">violeta: si vibraran 40 cm (176 Hz · n)</text>`;
    h += `<g data-s="2"><line class="o4-x" x1="${px(440)}" y1="${py(0)}" x2="${px(440)}" y2="${py(1.4)}"/><text class="lbl c4" x="${px(440) + 12}" y="${py(1.32)}">440 Hz ✗ (n = 1,5)</text></g>`;
    h += `<g data-s="4"><circle class="o4-ok" cx="${px(880)}" cy="${py(0.62)}" r="24"/><text class="lbl c3" x="${px(880) - 34}" y="${py(0.6)}" style="text-anchor:end">880 = 3 · 293,3 ✓</text></g>`;
    return h;
  },
});

// ---------------------------------------------------------------- cuerda de 24 cm, tercer armónico
const PX = x => 120 + x / 24 * 1260;
const tramo = `<rect class="tramo" data-s="3" x="${PX(8)}" y="58" width="${PX(20) - PX(8)}" height="244" rx="12"/><text class="tl" data-s="3" x="${(PX(8) + PX(20)) / 2}" y="40">tramo [8 ; 20] cm</text>`;
const c24 = (id, extra = '', o = {}) => cuerda(Object.assign({ id, L: 24, n: 3, model: 'ff', w: 1500, h: 360, A: 90, ticks: [0, 4, 8, 12, 16, 20, 24], extra }, o));
// tangentes en los nodos 8 y 16 con la cuerda en máxima elongación (y_px = Y + A sen(kx))
const tang = [8, 16].map(x => {
  const s = 90 * (Math.PI / 8) * Math.cos(Math.PI / 8 * x) / 52.5, x0 = PX(x), y0 = 180;
  return `<line class="o4-tg" x1="${x0 - 120}" y1="${y0 - s * 120}" x2="${x0 + 120}" y2="${y0 + s * 120}"/>`;
}).join('');
const marcas = `<g id="o4-tgs" data-s="3">${tang}
  <text class="o4-tt" x="${PX(8) - 110}" y="${180 - 75}">nodo: pendiente máx.</text>
  <text class="o4-tt c" x="${PX(12) + 40}" y="${180 - 118}">cresta: pendiente 0</text></g>`;

// reloj de fase
const reloj = `<svg class="o4-clk" viewBox="0 0 340 340" style="width:290px">
  <circle class="ring" cx="170" cy="170" r="120"/><line class="axl" x1="30" y1="170" x2="310" y2="170"/><line class="axl" x1="170" y1="30" x2="170" y2="310"/>
  <g id="o4-arm"><line class="arm" x1="170" y1="170" x2="290" y2="170"/><circle class="tip" cx="290" cy="170" r="13"/></g>
  <text class="lb" x="318" y="160">0</text>
  <text class="lb hl" data-s="3" x="170" y="336">ωt₁ = 2,75π</text></svg>`;

// ---------------------------------------------------------------- gráficos del ítem c
const kc = Math.PI / 8; // por cm
const pForma = plot({ w: 1100, h: 250, x: [8, 20], y: [-1.4, 1.4], ticksX: [8, 10, 12, 14, 16, 18, 20], xl: 'x (cm)', yl: 'y (cuerda)', id: 'o4-pf', pad: { l: 120, r: 50, t: 30, b: 60 },
  curves: [{ f: x => -Math.sin(kc * x), cls: 'c5', id: 'o4-yf' }],
  extra: (px, py) => [8, 16].map(x => `<circle class="dot" data-s="1" cx="${px(x)}" cy="${py(0)}" r="11" style="fill:#ff6f7d"/>`).join('') });
const pU = plot({ w: 1100, h: 440, x: [8, 20], y: [0, 0.058], ticksX: [8, 10, 12, 14, 16, 18, 20], ticksY: [0, 0.023, 0.0459], yl: 'u elástica (J/m)', id: 'o4-pu', pad: { l: 120, r: 50, t: 30, b: 70 },
  fmtY: v => v === 0 ? '0' : v.toString().replace('.', ','),
  curves: [{ f: x => 0.0459 * Math.cos(kc * x) ** 2, area: true, id: 'o4-u', n: 500 }],
  extra: (px, py) => [8, 16].map(x => `<circle class="dot" data-s="1" cx="${px(x)}" cy="${py(0.0459)}" r="11"/>`).join('') +
    [12, 20].map(x => `<circle class="dot" data-s="2" cx="${px(x)}" cy="${py(0)}" r="11" style="fill:#c49bff"/>`).join('') +
    `<text class="lbl c3" data-s="1" x="${px(8) + 22}" y="${py(0.0459) - 14}">0,0459</text>` +
    [10, 14, 18].map(x => `<circle class="dot" data-s="3" cx="${px(x)}" cy="${py(0.02293)}" r="9" style="fill:#7ee0a1"/>`).join('') });

const sen2 = x => Math.sin(kc * x) ** 2;

module.exports = [
  seccion('Ond 4', 'Guitarra: nota y energía', 'Primer parcial del 14/9/2024 · ejercicio 2',
    'Ejercicio de ondas número cuatro: primer parcial del catorce de septiembre de dos mil veinticuatro, ejercicio dos. Una cuerda de guitarra: qué notas puede dar, cuánta energía tiene un tramo y cómo se reparte la energía elástica.'),

  {
    sec: 'Ond 4 · Enunciado', title: 'Qué dice el enunciado', cls: B, chapter: SEC,
    html: `<div style="display:flex;flex-direction:column;gap:30px;align-items:center">${img('Ond4.jpg', { style: 'width:1240px' })}
      ${datos(['@1 $L = 64$ cm', '@1 $m = 1{,}92$ g', '@1 4º armónico: 440 Hz', '@2 dedo en $x = 40$ cm', '@3 $f = 880$ Hz', '@3 horizontal en $t = 0$', '@3 $E_K[8;20\\text{ cm}] = 0{,}22$ J en $t_1 = \\frac{11}{8}T$', '@4 $t_2 = 2t_1$, $A\' = 1$ mm'], { style: 'justify-content:center;max-width:1700px' })}</div>`,
    steps: [
      ['Este es el enunciado. Vamos anotando los datos a medida que aparecen.'],
      ['La cuerda de la guitarra mide sesenta y cuatro centímetros y tiene una masa de uno coma noventa y dos gramos. Está afinada para que su cuarto armónico sea el la de cuatrocientos cuarenta hertz.'],
      ['En el ítem a se aprieta la cuerda en x igual a cuarenta centímetros, medido desde la cabeza de la guitarra, como muestra la figura. La pregunta es si así se puede escuchar la misma nota.'],
      ['En el ítem b, con el dedo en el mismo lugar, suena el la una octava más arriba: ochocientos ochenta hertz. En t igual a cero la cuerda está horizontal. En t uno, once octavos de período, el tramo entre ocho y veinte centímetros tiene cero coma veintidós joules de energía cinética. Hay que sacar la amplitud.'],
      ['Y en el ítem c hay que graficar la densidad de energía elástica en el mismo tramo, en el instante t dos, el doble de t uno, con una amplitud de un milímetro.'],
    ],
  },

  {
    sec: 'Ond 4 · Antes de calcular', title: 'Buscar el molde en la hoja', cls: B, chapter: SEC,
    html: `${molde('Ejercicio 5 de la hoja: **estacionaria fijo–fijo, tensión y % de energía** (1C 2025): armónico → $v$ → $k$, $\\omega$; nodo en $x=0$; fase por "horizontal en $t=0$"; integrar en el tramo.', { s: 0 })}
      <div class="grid g2" style="margin-top:40px">
        ${card('Lo que se repite', ul(['Del armónico sale $v$, y de ahí $\\lambda$, $k$, $\\omega$', 'Nodo en $x = 0$ ⇒ $\\sen(kx)$', 'Horizontal en $t=0$ ⇒ la fase', 'Instante → fracción de $T$ → integrar']), { cls: 'ok', s: 1 })}
        ${card('Lo que cambia', ul(['a) ¿440 Hz es armónico de la cuerda acortada?', 'b) al revés: dan la energía, sale $A$', 'c) gráfico en función de $x$, no de $t$']), { cls: 'warn', s: 2 })}
      </div>`,
    steps: [
      ['Antes de calcular, buscamos el molde en la hoja. Es el ejercicio cinco: estacionaria fijo–fijo, tensión y porcentaje de energía, del primer parcial de dos mil veinticinco.'],
      ['Se repite toda la cadena. Del armónico sale la velocidad, y de ahí lambda, k y omega. Nodo en x igual a cero, entonces seno de k x. Cuerda horizontal en t igual a cero, entonces la fase. Y al final, integrar la energía en el tramo.'],
      ['[A] ¿Y qué cambia? [P] Tres cosas. El ítem a es nuevo: preguntar si una frecuencia es armónico de una cuerda más corta. En el b el problema va al revés: te dan la energía y hay que despejar la amplitud. Y en el c el gráfico es en función de x, en un instante fijo, no en función del tiempo.'],
    ],
  },

  {
    sec: 'Ond 4 · Teoría', title: 'Cuerda fija en los dos extremos', cls: B, chapter: SEC,
    css: `.o4-th{display:flex;flex-direction:column;align-items:center;gap:18px}`,
    html: `<div class="o4-th">${cuerda({ id: 'o4-c4', L: 64, n: 4, model: 'ff', w: 1500, h: 330, A: 80, ticks: [0, 16, 32, 48, 64], style: 'width:1250px' })}
      <div class="grid g3" style="width:100%;gap:24px">
        ${eqs([{ t: 'L = n\\,\\frac{\\lambda}{2}', s: 1 }])}
        ${eqs([{ t: 'f_n = n\\,\\frac{v}{2L} = n\\,f_1', s: 1 }])}
        ${eqs([{ t: 'v = \\sqrt{\\frac{F}{\\mu}}', s: 2, cls: 'hl' }])}
      </div></div>`,
    steps: [
      ['Repasemos la teoría. En la guitarra la cuerda está fija en los dos extremos: en la cejuela, del lado de la cabeza, y en el puente. Los dos extremos son nodos. Así se ve el cuarto armónico, el de cuatrocientos cuarenta hertz.', `standing('#o4-c4',{dur:talk(), per:1300})`],
      ['Entre los extremos tiene que entrar un número entero de medias longitudes de onda: L igual a n lambda sobre dos. Como lambda por la frecuencia es la velocidad, las frecuencias posibles son n por v sobre dos L. Son múltiplos enteros de la fundamental.', `standing('#o4-c4',{dur:talk(), per:1300})`],
      ['La velocidad depende solo de la cuerda: raíz de la tensión sobre mu. [A] ¿Y cuando apretás la cuerda con el dedo, no cambia la velocidad? [P] No. El dedo no cambia ni la tensión ni la masa por metro. Cambia el largo de la parte que vibra, y con eso cambian los armónicos.', `standing('#o4-c4',{dur:talk(), per:1300, end:'flat'})`],
    ],
  },

  {
    sec: 'Ond 4 · Datos', title: 'Lo que sale de los datos', cls: B, chapter: SEC,
    html: eqs([
      { t: '\\mu = \\frac{m}{L} = \\frac{1{,}92\\cdot10^{-3}\\ \\text{kg}}{0{,}64\\ \\text{m}} = 3\\cdot10^{-3}\\ \\tfrac{\\text{kg}}{\\text{m}}', s: 0 },
      { t: 'f_4 = 440\\ \\text{Hz} \\;\\Rightarrow\\; f_1 = \\frac{440}{4} = 110\\ \\text{Hz}', s: 1 },
      { t: 'v = 2L\\,f_1 = 2\\cdot0{,}64\\cdot110 = 140{,}8\\ \\tfrac{\\text{m}}{\\text{s}}', s: 2, cls: 'hl' },
      { t: 'F = \\mu\\,v^2 = 3\\cdot10^{-3}\\cdot140{,}8^2 = 59{,}47\\ \\text{N}', s: 3, note: 'tensión (la usamos en c)' },
    ], { style: 'font-size:1.12em;padding:30px 50px' }),
    steps: [
      ['Ahora los números. La densidad lineal es la masa sobre el largo: uno coma noventa y dos por diez a la menos tres kilos, dividido cero coma sesenta y cuatro metros. Da tres por diez a la menos tres kilos por metro.'],
      ['El cuarto armónico es cuatrocientos cuarenta hertz, así que la fundamental es la cuarta parte: ciento diez hertz.'],
      ['Y la velocidad es dos L por la fundamental: dos por cero coma sesenta y cuatro por ciento diez. Da ciento cuarenta coma ocho metros por segundo.'],
      ['[A] ¿Hace falta la tensión? [P] Para el ítem c, sí. Es mu por v al cuadrado: cincuenta y nueve coma cuarenta y siete newtons.'],
    ],
  },

  {
    sec: 'Ond 4 · a) ¿Misma nota?', title: '¿Qué parte de la cuerda vibra?', cls: B, chapter: SEC, css: GT_CSS,
    html: `<div style="display:flex;justify-content:center">${guitarra('o4-g1')}</div>`,
    steps: [
      ['Ítem a. Mirá la figura: x igual a cero está en la cejuela, del lado de la cabeza, y x igual a L está en el puente. El dedo aprieta en x igual a cuarenta centímetros.'],
      ['Lo que suena es la parte que va del dedo al puente: sesenta y cuatro menos cuarenta, veinticuatro centímetros. La velocidad sigue siendo ciento cuarenta coma ocho metros por segundo.',
        `animFn('#o4-g1-vib',{x0:${GXL},x1:${XD},y:${GY},L:1},(x,t)=>30*Math.sin(Math.PI*x)*Math.cos(2*Math.PI*t/320),{dur:talk(),tEnd:80})`],
      ['[A] ¿Y la parte de cuarenta centímetros, entre la cabeza y el dedo? [P] En una guitarra real no suena. Igual, enseguida vamos a ver que con cualquiera de las dos la respuesta es la misma.'],
    ],
  },

  {
    sec: 'Ond 4 · a) ¿Misma nota?', title: '¿Está 440 Hz entre los armónicos?', cls: B, chapter: SEC,
    css: `#o4-pe .o4-comb{stroke:var(--accent2);stroke-width:7;stroke-linecap:round} #o4-pe .o4-comb.b{stroke:var(--purple);stroke-width:5}
      #o4-pe .o4-x{stroke:var(--bad);stroke-width:4;stroke-dasharray:12 9} #o4-pe .o4-ok{fill:none;stroke:var(--warn);stroke-width:5}`,
    html: `<div style="display:flex;flex-direction:column;gap:26px;align-items:center">${peine}
      <div class="grid g2" style="width:100%;gap:30px">
        ${eqs([{ t: "f_1' = \\frac{v}{2L'} = \\frac{140{,}8}{2\\cdot0{,}24} = 293{,}3\\ \\text{Hz}", s: 0 }, { t: "\\frac{440}{293{,}3} = 1{,}5 \\;\\;\\text{no es entero}", s: 2, cls: 'hl' }], { title: 'Vibra del dedo al puente: 24 cm' })}
        ${eqs([{ t: "f_1' = \\frac{140{,}8}{2\\cdot0{,}40} = 176\\ \\text{Hz}", s: 3 }, { t: '\\frac{440}{176} = 2{,}5 \\;\\;\\text{tampoco}', s: 3 }], { title: 'Si vibrara la parte de 40 cm' })}
      </div></div>`,
    steps: [
      ['La fundamental de la parte que vibra es v sobre dos L prima: ciento cuarenta coma ocho dividido cero coma cuarenta y ocho. Da doscientos noventa y tres coma tres hertz.'],
      ['Sus armónicos son los múltiplos: doscientos noventa y tres, quinientos ochenta y siete, ochocientos ochenta y mil ciento setenta y tres hertz.', `draw('#o4-pe .o4-comb:not(.b)',{dur:500,stagger:350})`],
      ['Para que suene cuatrocientos cuarenta, el cociente entre cuatrocientos cuarenta y doscientos noventa y tres coma tres tendría que ser entero. Da uno coma cinco: cae justo entre el primer y el segundo armónico. No se puede.', `pulse('#o4-pe .o4-x')`],
      ['Con la otra lectura, la parte de cuarenta centímetros, la fundamental es ciento setenta y seis hertz, y el cociente da dos coma cinco. Tampoco es entero. La respuesta es no, en los dos casos.', `draw('#o4-pe .o4-comb.b',{dur:400,stagger:150})`],
      ['Pero fijate en ochocientos ochenta: es el tercer armónico de la parte de veinticuatro centímetros. Esa es la nota del ítem b.', `draw('#o4-pe .o4-ok',{dur:800})`],
    ],
  },

  {
    sec: 'Ond 4 · b) Amplitud', title: '880 Hz: tercer armónico, nodos cada 8 cm', cls: B, chapter: SEC,
    css: `.o4-b1{display:grid;grid-template-columns:1080px 1fr;gap:40px;align-items:center}`,
    html: `<div class="o4-b1"><div>${c24('o4-c3', tramo, { style: 'width:1080px', sNodes: 1 })}</div>
      ${eqs([
        { t: 'n = \\frac{880}{293{,}3} = 3', s: 0 },
        { t: '\\lambda = \\frac{v}{f} = \\frac{140{,}8}{880} = 0{,}16\\ \\text{m}', s: 1 },
        { t: 'k = \\frac{2\\pi}{\\lambda} = 12{,}5\\pi\\ \\text{m}^{-1}', s: 2 },
        { t: '\\omega = 2\\pi\\cdot880 = 1760\\pi\\ \\text{s}^{-1}', s: 2 },
        { t: 'T = \\tfrac{1}{880}\\ \\text{s} = 1{,}136\\ \\text{ms}', s: 2 },
      ])}</div>`,
    steps: [
      ['Ítem b. Ochocientos ochenta dividido doscientos noventa y tres coma tres da tres: la parte de veinticuatro centímetros vibra en su tercer armónico.', `standing('#o4-c3',{dur:talk(), per:1200})`],
      ['La longitud de onda es v sobre f: ciento cuarenta coma ocho sobre ochocientos ochenta, dieciséis centímetros. Media lambda son ocho centímetros: hay un nodo cada ocho centímetros.', `standing('#o4-c3',{dur:talk(), per:1200})`],
      ['El número de onda es dos pi sobre lambda: doce coma cinco pi por metro. Omega es dos pi por ochocientos ochenta: mil setecientos sesenta pi radianes por segundo. Y el período, uno sobre ochocientos ochenta, es uno coma ciento treinta y seis milisegundos.', `standing('#o4-c3',{dur:talk(), per:1200, end:'flat'})`],
      ['[A] ¿Desde qué extremo mido el tramo de ocho a veinte? [P] Da igual. Veinticuatro y cuarenta son múltiplos de ocho, así que los nodos caen en los mismos lugares midiendo desde el dedo, desde el puente o desde la cabeza. El tramo arranca en un nodo, pasa por otro en dieciséis y termina en un antinodo, en veinte.', `snapshot('#o4-c3',0.9,{dur:900})`],
    ],
  },

  {
    sec: 'Ond 4 · b) Amplitud', title: 'La fase y el instante $t_1 = \\frac{11}{8}T$', cls: B, chapter: SEC,
    css: `.o4-b2{display:grid;grid-template-columns:1fr 760px;gap:36px;align-items:center}
      .o4-clk{overflow:visible;font-family:"Segoe UI",Arial,sans-serif} .o4-clk .ring{fill:none;stroke:#2a3d5c;stroke-width:5} .o4-clk .axl{stroke:#33476a;stroke-width:2;stroke-dasharray:8 8}
      .o4-clk .arm{stroke:var(--warn);stroke-width:7;stroke-linecap:round} .o4-clk .tip{fill:var(--warn)} .o4-clk .lb{fill:#93a4bc;font-size:26px;text-anchor:middle} .o4-clk .lb.hl{fill:var(--warn);font-weight:700;font-size:30px}
      #o4-arm{transform-box:view-box;transform-origin:170px 170px}`,
    html: `<div class="o4-b2">${eqs([
      { t: 'y = A\\,\\sen(kx)\\cos(\\omega t + \\varphi)', s: 0 },
      { t: 'y(x,0) = 0 \\;\\Rightarrow\\; \\varphi = -\\tfrac{\\pi}{2} \\;\\Rightarrow\\; y = A\\,\\sen(kx)\\,\\sen(\\omega t)', s: 1, cls: 'ok' },
      { t: 'u_K = \\tfrac12\\,\\mu\\,\\omega^2A^2\\,\\sen^2(kx)\\,\\cos^2(\\omega t)', s: 2 },
      { t: '\\omega t_1 = 2\\pi\\cdot\\tfrac{11}{8} = 2{,}75\\pi \\;\\Rightarrow\\; \\cos^2(2{,}75\\pi) = \\tfrac12', s: 3, cls: 'hl' },
    ])}
      <div style="display:flex;flex-direction:column;align-items:center;gap:6px">${reloj}${c24('o4-c5', '', { style: 'width:740px', A: 80, nodes: false })}</div></div>`,
    steps: [
      ['Escribimos la onda. Con un nodo en x igual a cero, la forma espacial es seno de k x: y igual a A, seno de k x, coseno de omega t más fi.'],
      ['Cuerda horizontal en t igual a cero quiere decir que y vale cero en todos los puntos. Entonces coseno de fi es cero, y fi vale menos pi medios. La onda queda A, seno de k x, seno de omega t.', `standing('#o4-c5',{dur:talk(), per:1400, phase:-Math.PI/2, end:'flat'})`],
      ['La velocidad de cada punto es la derivada temporal: A omega, seno de k x, coseno de omega t. Con eso, la densidad de energía cinética es un medio de mu, por omega cuadrado, A cuadrado, seno cuadrado de k x y coseno cuadrado de omega t.'],
      ['Ahora el instante. Omega por once octavos de período es dos pi por once octavos: dos coma setenta y cinco pi, una vuelta y tres octavos. Y el coseno cuadrado de dos coma setenta y cinco pi vale un medio.',
        `const a=S.querySelector('#o4-arm'); a.style.transform='rotate(-495deg)'; a.animate([{transform:'rotate(0deg)'},{transform:'rotate(-495deg)'}],{duration:talk(),easing:'ease-in-out',fill:'backwards'});`],
      ['[A] ¿Y si hubiera elegido fi igual a más pi medios? [P] Da lo mismo: también un medio. En ese instante la cuerda está al setenta y uno por ciento de su amplitud, y la mitad de la energía es cinética.', `S.querySelector('#o4-arm').style.transform='rotate(-495deg)'; snapshot('#o4-c5',0.707,{dur:1200})`],
    ],
  },

  {
    sec: 'Ond 4 · b) Amplitud', title: 'De la energía del tramo a la amplitud', cls: B, chapter: SEC,
    css: `.o4-b3{display:grid;grid-template-columns:1fr 820px;gap:36px;align-items:center}`,
    html: `<div class="o4-b3">${eqs([
      { t: 'E_K = \\tfrac12\\,\\mu\\,\\omega^2A^2\\cdot\\tfrac12\\int_{0{,}08}^{0{,}20}\\sen^2(kx)\\,dx', s: 0 },
      { t: '\\int_{0{,}08}^{0{,}20}\\sen^2(kx)\\,dx = \\frac{0{,}12}{2} = 0{,}06\\ \\text{m}', s: 1, cls: 'hl' },
      { t: '\\mu\\,\\omega^2 = 3\\cdot10^{-3}\\,(1760\\pi)^2 = 91\\,716', s: 2 },
      { t: 'E_K = \\tfrac12\\cdot91\\,716\\cdot\\tfrac12\\cdot0{,}06\\;A^2 = 1375{,}7\\,A^2', s: 2 },
      { t: 'A^2 = \\frac{0{,}22}{1375{,}7} = 1{,}60\\cdot10^{-4}\\ \\text{m}^2', s: 3 },
    ])}
      <div>${plot({ w: 820, h: 470, x: [0, 24], y: [0, 1.25], ticksX: [0, 8, 12, 16, 20, 24], ticksY: [0, 0.5, 1], xl: 'x (cm)', yl: 'sen²(kx)', id: 'o4-ps', s: 1,
        curves: [{ f: sen2, cls: 'c5', id: 'o4-sf' }, { f: sen2, from: 8, to: 20, area: true, cls: 'c3', id: 'o4-st' }, { f: () => 0.5, cls: 'c2 dash', id: 'o4-h' }],
        extra: (px, py) => `<text class="lbl c2" x="${px(23.6)}" y="${py(0.5) - 12}" style="text-anchor:end">½</text>` })}
      ${res('$A = 1{,}26$ cm', { s: 3, style: 'margin-top:20px' })}</div></div>`,
    steps: [
      ['La energía cinética del tramo es la integral de la densidad entre ocho y veinte centímetros. Sacando las constantes, y el un medio del coseno cuadrado, queda la integral de seno cuadrado de k x.'],
      ['Mirá el gráfico. El tramo arranca en un nodo, en ocho, y termina en un antinodo, en veinte: son tres cuartos de longitud de onda. Cada cuarto de onda aporta lo mismo, así que el área es la mitad del largo: cero coma doce sobre dos, cero coma cero seis metros.', `sweep('#o4-ps #o4-sf',{dur:1500}); sweep('#o4-ps #o4-st-a, #o4-ps #o4-st',{delay:1200,dur:1800}); sweep('#o4-ps #o4-h',{delay:2600,dur:900})`],
      ['Reemplazamos. Mu por omega cuadrado da noventa y un mil setecientos dieciséis. Por un medio, por el otro medio y por cero coma cero seis, la energía queda mil trescientos setenta y cinco coma siete, por A cuadrado.'],
      ['Igualamos a cero coma veintidós joules y despejamos. A cuadrado da uno coma seis por diez a la menos cuatro metros cuadrados, y A es cero coma cero uno dos seis metros: uno coma veintiséis centímetros.', `pulse('.res')`],
      ['[A] ¿Esa A es la amplitud de los antinodos? [P] Sí: es la amplitud con la que oscila la cuerda, como en la teoría. Si la leyeras como la amplitud de cada propagante, con dos A adelante, sería la mitad: cero coma sesenta y tres centímetros.'],
    ],
  },

  {
    sec: 'Ond 4 · c) Energía elástica', title: 'En $t_2$ la cuerda está en máxima elongación', cls: B, chapter: SEC,
    css: `.o4-c1{display:grid;grid-template-columns:900px 1fr;gap:28px;align-items:center}
      svg.cuerda .o4-tg{stroke:var(--warn);stroke-width:5;stroke-dasharray:12 8} svg.cuerda .o4-tt{fill:var(--warn);font-size:26px;font-weight:700;text-anchor:middle} svg.cuerda .o4-tt.c{fill:var(--purple)}`,
    html: `<div class="o4-c1"><div>${c24('o4-c6', marcas, { style: 'width:900px' })}</div>
      ${eqs([
        { t: '\\omega t_2 = 5{,}5\\pi \\;\\Rightarrow\\; \\sen^2(\\omega t_2) = 1', s: 0 },
        { t: 'u_U = \\tfrac12\\,F\\left(\\frac{\\partial y}{\\partial x}\\right)^2 = \\tfrac12\\,F\\,k^2A\'^2\\cos^2(kx)', s: 2 },
        { t: '\\tfrac12\\cdot59{,}47\\cdot39{,}27^2\\cdot(10^{-3})^2 = 0{,}0459', s: 2 },
        { t: 'u_U(x) = 0{,}0459\\,\\cos^2(12{,}5\\pi x)\\ \\tfrac{\\text{J}}{\\text{m}}', s: 2, cls: 'ok' },
      ])}</div>`,
    steps: [
      ['Ítem c. El instante t dos es el doble de t uno: once cuartos de período. Omega t dos es cinco coma cinco pi, y el seno de cinco coma cinco pi es menos uno.'],
      ['Eso quiere decir que la cuerda está en su máxima elongación, quieta por un instante. La energía cinética es cero y toda la energía es elástica.', `standing('#o4-c6',{dur:talk(), per:1300, phase:-Math.PI/2, end:-1})`],
      ['La densidad elástica es un medio de la tensión por la pendiente al cuadrado: un medio de F, por k cuadrado, A prima cuadrado y coseno cuadrado de k x. Con cincuenta y nueve coma cuarenta y siete newtons, k de treinta y nueve coma veintisiete por metro y un milímetro de amplitud, queda cero coma cero cuatro cinco nueve, por coseno cuadrado de doce coma cinco pi x, en joules por metro.', `snapshot('#o4-c6',-1,{dur:10})`],
      ['[A] ¿Por qué coseno cuadrado y no seno cuadrado? [P] Porque la energía elástica depende de la pendiente. En los nodos la cuerda está más inclinada y la energía es máxima. En la cresta la cuerda está horizontal y la energía es cero.', `snapshot('#o4-c6',-1,{dur:10}); draw('#o4-tgs line',{dur:900,stagger:300})`],
    ],
  },

  {
    sec: 'Ond 4 · c) Energía elástica', title: 'Gráfico de $u_U(x)$ en el tramo [8 ; 20] cm', cls: B, chapter: SEC,
    css: `.o4-c2{display:grid;grid-template-columns:1fr 1100px;gap:30px;align-items:center}`,
    html: `<div class="o4-c2">${ul([
      '@0 Forma de la cuerda en $t_2$ (arriba)',
      '@1 Nodos en 8 y 16 cm: $u_U$ **máxima**, 0,0459 J/m',
      '@2 Cresta en 12 y valle en 20 cm: $u_U = 0$',
      '@3 Período espacial $\\frac{\\lambda}{2} = 8$ cm; a mitad de camino, 0,023 J/m',
    ], 'sm')}
      <div style="display:flex;flex-direction:column;gap:4px">${pForma}${pU}</div></div>`,
    steps: [
      ['Arriba está la forma de la cuerda en ese instante, entre ocho y veinte centímetros. Abajo vamos a dibujar la densidad de energía elástica, con la misma escala en x.', `sweep('#o4-pf #o4-yf',{dur:talk()})`],
      ['En ocho centímetros hay un nodo, donde la cuerda está más inclinada: la energía vale el máximo, cero coma cero cuatro cinco nueve joules por metro.', `sweep('#o4-pu #o4-u-a, #o4-pu #o4-u',{dur:talk()})`],
      ['Baja a cero en doce, donde está la cresta, vuelve al máximo en dieciséis, el otro nodo, y termina en cero en veinte, en el valle.'],
      ['El período espacial del coseno cuadrado es media lambda, ocho centímetros: en el tramo entra una joroba y media. Para el examen, marcá los máximos, los ceros y el valor a mitad de camino, cero coma cero dos tres joules por metro.'],
    ],
  },

  {
    sec: 'Ond 4 · Cierre', title: 'Dónde es fácil equivocarse', cls: B, chapter: SEC,
    html: ul([
      '@0 **440 Hz es el 4º armónico**, no la fundamental: $f_1 = 110$ Hz.',
      '@1 **Apretar no cambia $v$**: cambia el largo que vibra (24 cm).',
      '@2 **a) pide 440 Hz exactos.** 880 Hz sí se puede: por eso b) dice "una octava más arriba".',
      '@3 **Horizontal en $t=0$ ⇒ $\\varphi = -\\frac{\\pi}{2}$.** Con $\\varphi = 0$, en $t_2$ darías $u_U = 0$.',
      '@4 **Elástica ⇒ $\\cos^2(kx)$**, máxima en los nodos. Y no olvides el $\\frac12$ de la integral.',
    ]),
    steps: [
      ['Ahora, dónde es fácil equivocarse. Primero: cuatrocientos cuarenta hertz no es la fundamental, es el cuarto armónico. Si usás cuatrocientos cuarenta como fundamental, la velocidad te da cuatro veces más.'],
      ['Segundo: apretar la cuerda no cambia la velocidad. Cambia el largo de la parte que vibra.'],
      ['Tercero: el ítem a pregunta por cuatrocientos cuarenta exactos. Ochocientos ochenta sí se puede, y por eso el ítem b habla de una octava más arriba.'],
      ['Cuarto: horizontal en t igual a cero fija fi en menos pi medios. Si usás fi igual a cero, en t dos te daría energía elástica cero, justo al revés.'],
      ['Y quinto: la energía elástica va con coseno cuadrado de k x y es máxima en los nodos. Y no te olvides del un medio de la integral.'],
    ],
  },

  {
    sec: 'Ond 4 · Cierre', title: 'La receta y los resultados', cls: B, chapter: SEC,
    html: `<div class="grid g2" style="align-items:start">${ul([
      '@0 **1.** $\\mu$, $f_1$ y $v$ (no cambia al apretar).',
      '@1 **2.** ¿Se puede tocar $f$? ⇒ $f/f_1\'$ entero.',
      '@2 **3.** Nodo en $x=0$ ⇒ $\\sen(kx)$; fase con $t = 0$.',
      '@3 **4.** Instante → fracción de $T$ → forma de la cuerda.',
      '@4 **5.** Integrar $u$; de nodo o antinodo a nodo o antinodo, $\\int = \\frac{\\Delta x}{2}$.',
    ], 'sm')}${card('Resultados', `<div style="font-size:.86em;line-height:1.65">${md('$v = 140{,}8$ m/s, $F = 59{,}5$ N')}<br>${md('a) **no**: $440/293{,}3 = 1{,}5$')}<br>${md('b) 3er armónico, $\\lambda = 16$ cm')}<br>${md('$A = 1{,}26$ cm (antinodos)')}<br>${md('c) $u_U = 0{,}0459\\cos^2(12{,}5\\pi x)$ J/m')}</div>`, { cls: 'ok', s: 5 })}</div>`,
    steps: [
      ['Resumiendo la receta. Uno: de los datos, mu, la fundamental y la velocidad, que no cambia al apretar la cuerda.'],
      ['Dos: para saber si una nota se puede tocar, dividirla por la fundamental de la parte que vibra y ver si da entero.'],
      ['Tres: escribir la onda con el nodo en x igual a cero, y sacar la fase de la condición en t igual a cero.'],
      ['Cuatro: pasar cada instante a fracción de período, para saber cómo está la cuerda.'],
      ['Y cinco: integrar la densidad de energía. Si el tramo va entre nodos y antinodos, la integral es la mitad del largo.'],
      ['Y estos son los resultados. Si llegaste a lo mismo, vas muy bien. Si no, volvé al paso donde te separaste.'],
    ],
  },
];
