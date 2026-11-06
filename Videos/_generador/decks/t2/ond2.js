// Ond 2 · Intermedio 18/10/2025, ej. 1: estacionaria fijo–fijo, energía elástica del tramo [0,2; 0,8] m en t' = 7,5 ms
// Resultados verificados (soluciones/Ond2.py): μ = 0,0025 kg/m, λ = 0,8 m, f = 200 Hz, T = 5 ms, v = 160 m/s, F = 64 N, n = 4;
// en t = 1,125T: ωt+π/2 = 2,75π ⇒ K = E/2 ⇒ E = 0,158 J, A = 1,00 cm; en t' = 1,5T: 3,5π ⇒ cuerda horizontal ⇒ U' = 0;
// extra: K' del tramo = 0,1975 J/m · 0,3 m = 0,0593 J.
const { md, ul, card, callout, eqs, res, datos, img, molde, plot, cuerda } = require('../../lib');
const { seccion } = require('../common');

const SEC = 'Ond 2 · Energía en dos instantes';
const B = 'b-ond';
// la cuerda va de x = 0,2 m a x = 1,8 m (coordenada del enunciado); en el dibujo, de 120 a 1380 px
const PX = x => 120 + (x - 0.2) / 1.6 * 1260;
const Y = 180;
const fmt = x => String(Math.round(x * 10) / 10).replace('.', ',');

// cuerda fijo–fijo, 4º armónico, con ejes y nodos en la coordenada del enunciado
function c2(id, extra = '', o = {}) {
  const ticks = [0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8].map(x =>
    `<line class="tick" x1="${PX(x)}" y1="${Y + 130}" x2="${PX(x)}" y2="${Y + 142}"/><text class="o2tk" x="${PX(x)}" y="${Y + 178}">${fmt(x)}</text>`).join('');
  const nodos = [0.2, 0.6, 1.0, 1.4, 1.8].map(x => { const tx = x < 0.3 ? PX(x) + 22 : x > 1.7 ? PX(x) - 22 : PX(x), an = x < 0.3 ? 'start' : x > 1.7 ? 'end' : 'middle';
    return `<g class="nodo"${o.sNodes !== undefined ? ` data-s="${o.sNodes}" data-gap="90"` : ''}><circle cx="${PX(x)}" cy="${Y}" r="13"/><text class="o2nl" x="${tx}" y="${Y + 58}" style="text-anchor:${an}">${fmt(x)}</text></g>`; }).join('');
  const lbl = `<text class="o2x" x="${PX(1.8) + 34}" y="${Y + 142}">x (m)</text>`;
  return cuerda(Object.assign({ id, L: 1.6, n: 4, model: 'ff', w: 1500, h: 360, A: 90, nodes: false, ticks: [], extra: ticks + lbl + nodos + extra }, o));
}
// barras de energía K y U (la suma es E, constante)
const barras = (id, o = {}) => `<svg id="${id}" class="o2b" viewBox="0 0 300 450" style="width:${o.w || 190}px"${o.s !== undefined ? ` data-s="${o.s}"` : ''}>
  <line class="etop" x1="20" y1="70" x2="280" y2="70"/><text class="el" x="150" y="50">E total</text>
  <rect class="bk" x="45" y="70" width="90" height="310" rx="8"/><rect class="bu" x="165" y="70" width="90" height="310" rx="8" style="transform-box:fill-box;transform-origin:50% 100%;transform:scaleY(0)"/>
  <line class="base" x1="20" y1="380" x2="280" y2="380"/>
  <text class="bl k" x="90" y="425">K</text><text class="bl u" x="210" y="425">U</text></svg>`;
const tramo = `<rect class="tramo" x="${PX(0.2)}" y="62" width="${PX(0.8) - PX(0.2)}" height="236" rx="12"/><text class="tl" x="${(PX(0.2) + PX(0.8)) / 2}" y="46">tramo [0,2 ; 0,8] m</text>`;

const CSS = `.o2b{overflow:visible;font-family:"Segoe UI",Arial,sans-serif}
  .o2b .bk{fill:#6fdc8c} .o2b .bu{fill:#c49bff} .o2b .base{stroke:#6f86a8;stroke-width:4}
  .o2b .etop{stroke:#ffc562;stroke-width:3;stroke-dasharray:10 8} .o2b .el{fill:#ffc562;font-size:38px;font-weight:700;text-anchor:middle}
  .o2b .bl{font-size:48px;font-weight:800;text-anchor:middle} .o2b .bl.k{fill:#6fdc8c} .o2b .bl.u{fill:#c49bff}
  svg.cuerda .o2x{fill:var(--muted);font-size:30px;font-style:italic;text-anchor:start} svg.cuerda .o2tk{fill:var(--muted);font-size:32px;text-anchor:middle;font-family:Consolas,monospace} svg.cuerda .o2nl{font-size:34px !important}
  .o2col{display:flex;flex-direction:column;align-items:center;gap:16px}
  .o2row{display:flex;align-items:center;justify-content:center;gap:30px}`;

// código de página: cuerda vibrando con el factor temporal cos(ωt + π/2) y barras K/U sincronizadas.
// turns = períodos que dura la animación: n + 0,125 termina en 2,75π (t) y n + 0,5 termina horizontal (t').
const JS = `
const o2f = (b, v) => { b.style.transformBox = 'fill-box'; b.style.transformOrigin = '50% 100%'; b.style.transform = 'scaleY(' + v.toFixed(3) + ')'; };
function o2bars(id, cs, dur, cEnd) {
  const bk = S.querySelector(id + ' .bk'), bu = S.querySelector(id + ' .bu');
  o2f(bk, 1 - cEnd * cEnd); o2f(bu, cEnd * cEnd);
  if (!cs) return;
  bk.animate(cs.map(c => ({ transform: 'scaleY(' + (1 - c * c).toFixed(3) + ')' })), { duration: dur, easing: 'linear', fill: 'backwards' });
  bu.animate(cs.map(c => ({ transform: 'scaleY(' + (c * c).toFixed(3) + ')' })), { duration: dur, easing: 'linear', fill: 'backwards' });
}
function o2vib(cid, bid, dur, turns, cEnd) {
  standing(cid, { dur, per: dur / turns, phase: Math.PI / 2, amp: -90, end: cEnd });
  const nk = Math.max(2, Math.round(turns * 24));
  const cs = Array.from({ length: nk + 1 }, (_, i) => Math.cos(2 * Math.PI * i / nk * turns + Math.PI / 2));
  if (bid) o2bars(bid, cs, dur, cEnd);
}
`;
const vib = (cid, bid, per, frac, cEnd) => JS + `const d = talk(); o2vib('${cid}', ${bid ? `'${bid}'` : 'null'}, d, Math.max(1, Math.round(d / ${per})) + ${frac}, ${cEnd});`;

const uK = x => 0.1975 * Math.cos(2.5 * Math.PI * x) ** 2;

module.exports = [
  seccion('Ond 2', 'Energía en dos instantes', 'Examen intermedio del 18/10/2025 · ejercicio 1',
    'Ejercicio de ondas número dos: examen intermedio del dieciocho de octubre de dos mil veinticinco, ejercicio uno. Una onda estacionaria en una cuerda con los dos extremos fijos, y la energía de un tramo en dos instantes distintos.'),

  {
    sec: 'Ond 2 · Enunciado', title: 'Qué dice el enunciado', cls: B, chapter: SEC,
    html: `<div style="display:flex;flex-direction:column;gap:40px;align-items:center">${img('Ond2.jpg', { style: 'width:1580px' })}
      ${datos(['@1 $L = 1{,}6$ m', '@1 $m = 4$ g', '@1 extremos fijos', '@2 $y = A\\cos(2{,}5\\pi x)\\cos(400\\pi t + \\frac{\\pi}{2})$ [SI]', '@2 $A$ = ?',
        '@3 en $t = 5{,}625$ ms: $K_{cuerda} = 0{,}079$ J', '@4 $t\' = 7{,}5$ ms', '@4 piden $U\'$ del tramo $[0{,}2\\,;\\,0{,}8]$ m'], { style: 'justify-content:center;max-width:1680px' })}</div>`,
    steps: [
      ['Este es el enunciado. Es cortito, pero tiene una trampa linda. Vamos anotando los datos a medida que aparecen.'],
      ['Una cuerda de uno coma seis metros de largo y cuatro gramos de masa, con los dos extremos fijos.'],
      ['La onda estacionaria ya viene escrita: A, por coseno de dos coma cinco pi x, por coseno de cuatrocientos pi t más pi medios, todo en unidades del sistema internacional. La amplitud A no la conocemos.'],
      ['El dato de energía: en el instante cinco coma seiscientos veinticinco milisegundos, la energía cinética de toda la cuerda es cero coma cero setenta y nueve joules.'],
      ['Y la pregunta: la energía elástica del tramo entre cero coma dos y cero coma ocho metros, en otro instante, t prima, igual a siete coma cinco milisegundos.'],
    ],
  },

  {
    sec: 'Ond 2 · Antes de calcular', title: 'Buscar el molde en la hoja', cls: B, chapter: SEC,
    html: `${molde('Ejercicio 5 de la hoja: **estacionaria fijo–fijo, % de energía de un tramo** (1C 2025). Y el paso 4 de la receta de ondas: *antes de integrar, mirar la fase temporal*.', { s: 0 })}
      <div class="grid g2" style="margin-top:40px">
        ${card('Lo que se repite', ul(['Las densidades $u_K$ y $u_U$', 'La energía total $E = \\frac14\\mu\\omega^2A^2L$', 'Pasar cada instante a fracción de $T$']), { cls: 'ok', s: 1 })}
        ${card('Lo que cambia', ul(['La onda viene dada: no hay que armarla', '$A$ es incógnita: sale del dato de $K$', 'El instante $t\'$ es especial']), { cls: 'warn', s: 2 })}
      </div>`,
    steps: [
      ['Antes de calcular, buscamos el molde en la hoja. Es el ejercicio cinco: la estacionaria fijo–fijo donde se pide el porcentaje de energía de un tramo. Y sobre todo el paso cuatro de la receta de ondas: antes de integrar, mirar la fase temporal.'],
      ['Lo que se repite: las dos densidades de energía, la energía total de la cuerda y la costumbre de pasar cada instante a fracción de período.'],
      ['[A] ¿Y qué cambia? [P] Acá la onda ya viene dada, así que no hay que armarla con nodos ni con condiciones iniciales. La amplitud es incógnita, y la sacamos del dato de la energía cinética. Y el instante t prima es especial: ya vamos a ver por qué.'],
    ],
  },

  {
    sec: 'Ond 2 · Datos', title: 'Datos derivados y forma de la cuerda', cls: B, chapter: SEC, css: CSS,
    html: `<div style="display:grid;grid-template-columns:720px 1fr;gap:40px;align-items:center">
      ${eqs([
        { t: '\\mu = \\frac{m}{L} = \\frac{0{,}004}{1{,}6} = 0{,}0025\\ \\tfrac{\\text{kg}}{\\text{m}}', s: 0 },
        { t: 'k = 2{,}5\\pi\\ \\text{m}^{-1} \\Rightarrow \\lambda = \\tfrac{2\\pi}{k} = 0{,}8\\ \\text{m}', s: 1 },
        { t: '\\omega = 400\\pi\\ \\text{s}^{-1} \\Rightarrow f = 200\\ \\text{Hz},\\ T = 5\\ \\text{ms}', s: 2, cls: 'hl' },
        { t: 'L = 1{,}6\\ \\text{m} = 4\\cdot\\tfrac{\\lambda}{2} \\Rightarrow n = 4', s: 3 },
        { t: 'v = \\tfrac{\\omega}{k} = 160\\ \\tfrac{\\text{m}}{\\text{s}},\\quad F = \\mu v^2 = 64\\ \\text{N}', s: 4 },
      ], { title: 'Datos que vamos a usar' })}
      <div>${c2('o2c1', '', { sNodes: 3 })}</div></div>`,
    steps: [
      ['Primero, los datos derivados. La densidad lineal, mu, es la masa sobre el largo. Cuatro gramos son cero coma cero cero cuatro kilos; divididos por uno coma seis metros dan cero coma cero cero veinticinco kilos por metro.'],
      ['El número de onda, k, es dos coma cinco pi por metro. Entonces lambda, que es dos pi sobre k, da cero coma ocho metros.'],
      ['Omega es cuatrocientos pi: la frecuencia es doscientos hertz, y el período, cinco milisegundos. [A] ¿Para qué quiero el período? [P] Para ubicar cada instante dentro del período. Es lo que más trabajo ahorra en estos ejercicios.'],
      ['La cuerda mide uno coma seis metros, que son cuatro medias longitudes de onda: es el cuarto armónico. Fijate los nodos. Con este coseno quedan en cero coma dos, cero coma seis, uno, uno coma cuatro y uno coma ocho. Como los extremos son fijos, la cuerda va de cero coma dos a uno coma ocho: el origen de x no está en la punta. Eso no cambia nada del resultado.', vib('#o2c1', null, 1500, 0.25, -1)],
      ['Por último, la velocidad es omega sobre k, ciento sesenta metros por segundo, y la tensión es mu por v al cuadrado: sesenta y cuatro newtons. La vamos a usar en la energía elástica.', vib('#o2c1', null, 1500, 0.25, -1)],
    ],
  },

  {
    sec: 'Ond 2 · Teoría', title: 'Energía cinética y energía elástica', cls: B, chapter: SEC, css: CSS,
    html: `<div style="display:grid;grid-template-columns:780px 1fr;gap:30px;align-items:center">
      ${eqs([
        { t: 'u_K = \\tfrac12\\,\\mu\\left(\\frac{\\partial y}{\\partial t}\\right)^2', s: 0 },
        { t: 'u_U = \\tfrac12\\,F\\left(\\frac{\\partial y}{\\partial x}\\right)^2', s: 1 },
        { t: 'u_K = \\tfrac12\\mu\\omega^2A^2\\cos^2(kx)\\,{\\color{#6fdc8c}\\sen^2(\\omega t+\\varphi)}', s: 2 },
        { t: 'u_U = \\tfrac12\\mu\\omega^2A^2\\sen^2(kx)\\,{\\color{#c49bff}\\cos^2(\\omega t+\\varphi)}', s: 2 },
        { t: 'E = K + U = \\tfrac14\\,\\mu\\,\\omega^2A^2L', s: 4, cls: 'ok' },
      ])}
      <div class="o2col">${c2('o2c2', '', { style: 'width:900px' })}${barras('o2b2', { w: 180 })}</div></div>`,
    steps: [
      ['Ahora, la teoría que necesitamos. La energía cinética por metro de cuerda es un medio de mu por la velocidad al cuadrado: cada pedacito tiene masa y se mueve.'],
      ['La energía elástica por metro es un medio de la tensión por la pendiente al cuadrado. Para inclinarse, cada pedacito se estira, y la tensión hace trabajo para estirarlo.'],
      ['Derivando nuestra onda, la cinética queda con seno cuadrado de omega t más fi, y la elástica con coseno cuadrado. [A] ¿Por qué una con seno y la otra con coseno? [P] Porque al derivar en el tiempo, el coseno temporal se vuelve seno. Al derivar en x, el factor temporal no se toca: la pendiente lleva el mismo coseno que la posición.'],
      ['Mirá las barras mientras la cuerda vibra. Cuando la cuerda pasa por la horizontal, toda la energía es cinética. En la máxima elongación, toda es elástica. Pero la suma no cambia nunca.', vib('#o2c2', '#o2b2', 1900, 0.5, 0)],
      ['Integrando en toda la cuerda, los cuadrados del seno y del coseno de k x promedian un medio, y queda la energía total: un cuarto de mu, por omega cuadrado, por A cuadrado, por L. Es constante.'],
    ],
  },

  {
    sec: 'Ond 2 · El instante t', title: 'En t = 5,625 ms: energía total y amplitud', cls: B, chapter: SEC, css: CSS,
    html: `<div style="display:grid;grid-template-columns:770px 1fr;gap:30px;align-items:center">
      <div style="display:flex;flex-direction:column;gap:24px;align-items:flex-start">${eqs([
        { t: '\\frac{t}{T} = \\frac{5{,}625}{5} = 1{,}125', s: 0 },
        { t: '\\omega t + \\tfrac{\\pi}{2} = 2{,}25\\pi + 0{,}5\\pi = 2{,}75\\pi', s: 1 },
        { t: '\\sen^2(2{,}75\\pi) = \\tfrac12 \\;\\Rightarrow\\; K = \\tfrac12\\,E', s: 2, cls: 'hl' },
        { t: 'E = \\frac{0{,}079}{0{,}5} = 0{,}158\\ \\text{J}', s: 3 },
        { t: 'A^2 = \\frac{E}{\\frac14\\mu\\omega^2L} = \\frac{0{,}158}{1579} = 1{,}0\\cdot10^{-4}\\ \\text{m}^2', s: 4 },
      ])}${res('$A = 0{,}01$ m $= 1$ cm', { s: 4 })}</div>
      <div class="o2col">${c2('o2c3', '', { style: 'width:900px' })}${barras('o2b3', { w: 180 })}</div></div>`,
    steps: [
      ['Vamos con las cuentas. Primero, en qué parte del período está el instante t. Cinco coma seiscientos veinticinco milisegundos dividido cinco da uno coma ciento veinticinco: un período y un octavo.'],
      ['La fase temporal es omega t más pi medios. Cuatrocientos pi por cinco coma seiscientos veinticinco milésimas da dos coma veinticinco pi; más cero coma cinco pi, son dos coma setenta y cinco pi. [A] ¿Calculadora en grados o en radianes? [P] En radianes. Y mejor todavía: dejalo en múltiplos de pi, que se ve todo más claro.'],
      ['El seno cuadrado de dos coma setenta y cinco pi es un medio. O sea que en ese instante la energía está repartida mitad y mitad: la cinética es la mitad del total.', vib('#o2c3', '#o2b3', 1900, 0.125, -0.7071)],
      ['Entonces la energía total es el doble del dato: cero coma ciento cincuenta y ocho joules. Y ese total no cambia con el tiempo: lo que cambia es cómo se reparte.'],
      ['Con la fórmula de la energía total despejamos la amplitud. Un cuarto de mu, por omega cuadrado, por L, da unos mil quinientos setenta y nueve. Dividiendo, A cuadrado es uno por diez a la menos cuatro metros cuadrados, y A da un centímetro.', `pulse(S.querySelector('.res'))`],
    ],
  },

  {
    sec: "Ond 2 · El instante t′", title: "En t′ = 7,5 ms: ¿cómo está la cuerda?", cls: B, chapter: SEC, css: CSS,
    html: `<div style="display:flex;flex-direction:column;align-items:center;gap:18px">
      ${eqs([
        { t: '\\frac{t\'}{T} = \\frac{7{,}5}{5} = 1{,}5', s: 1 },
        { t: '\\omega t\' + \\tfrac{\\pi}{2} = 3\\pi + 0{,}5\\pi = 3{,}5\\pi \\;\\Rightarrow\\; \\cos(3{,}5\\pi) = 0', s: 2, cls: 'hl' },
      ], { style: 'padding:14px 36px' })}
      <div class="o2row">${c2('o2c4', tramo, { style: 'width:1180px' })}${barras('o2b4', { w: 150 })}</div>
      <div class="row" style="gap:30px">${callout('Cuerda horizontal ⇒ $\\frac{\\partial y}{\\partial x} = 0$ en todos lados ⇒ $u_U = 0$', { s: 3, cls: 'ok' })}${res("$U' = 0$", { s: 4 })}</div></div>`,
    steps: [
      ['Ahora el instante que piden: t prima, siete coma cinco milisegundos. Antes de integrar nada, lo ubicamos en el período.'],
      ['Siete coma cinco dividido cinco da uno coma cinco: un período y medio.'],
      ['La fase es tres pi más pi medios: tres coma cinco pi. Y el coseno de tres coma cinco pi vale cero.'],
      ['Eso quiere decir que la cuerda entera está horizontal: y vale cero para cualquier x. Está pasando por el equilibrio, a máxima velocidad. [A] ¿Y entonces la energía elástica? [P] Sin pendiente no hay estiramiento. La derivada en x es cero en todos lados, así que la densidad de energía elástica es cero en toda la cuerda.', vib('#o2c4', '#o2b4', 1900, 0.5, 0)],
      ['Resultado: U prima vale cero. En el tramo que piden, y en cualquier otro tramo de la cuerda.', `pulse(S.querySelector('.res'))`],
    ],
  },

  {
    sec: "Ond 2 · El instante t′", title: 'Lo mismo, con la integral', cls: B, chapter: SEC,
    html: `<div style="display:grid;grid-template-columns:900px 1fr;gap:34px;align-items:center">
      ${eqs([
        { t: "U' = \\int_{0{,}2}^{0{,}8}\\tfrac12F\\left(\\frac{\\partial y}{\\partial x}\\right)^2dx", s: 0 },
        { t: "U' = \\tfrac12FA^2k^2\\cos^2(3{,}5\\pi)\\int_{0{,}2}^{0{,}8}\\sen^2(kx)\\,dx", s: 1 },
        { t: "U' = \\tfrac12\\cdot64\\cdot10^{-4}\\cdot(2{,}5\\pi)^2\\cdot{\\color{#ff6f7d}0}\\cdot0{,}3 = 0", s: 1, cls: 'ok' },
        { t: "K'_{tramo} = \\tfrac12\\mu\\omega^2A^2\\int_{0{,}2}^{0{,}8}\\cos^2(kx)\\,dx", s: 2 },
        { t: "K'_{tramo} = 0{,}1975\\ \\tfrac{\\text{J}}{\\text{m}}\\cdot0{,}3\\ \\text{m} = 0{,}059\\ \\text{J}", s: 3 },
      ])}
      <div>${plot({ w: 800, h: 540, x: [0.2, 1.98], y: [0, 0.26], ticksX: [0.2, 0.6, 0.8, 1.0, 1.4, 1.8], ticksY: [0, 0.1, 0.2], xl: 'x (m)', yl: "u en t′ (J/m)", id: 'o2p', s: 2, pad: { l: 90, r: 40 },
        curves: [{ f: uK, to: 1.8, id: 'o2uk', n: 600 }, { f: uK, from: 0.2, to: 0.8, area: true, cls: 'c3', id: 'o2tr', n: 300 }, { f: () => 0.004, to: 1.8, cls: 'c5', id: 'o2uu' }],
        extra: (px, py) => `<text class="lbl c3" x="${px(0.5)}" y="${py(0.225)}" style="text-anchor:middle">tramo: 59 mJ</text><text class="lbl c2" x="${px(1.1)}" y="${py(0.225)}">u<tspan baseline-shift="sub" font-size="20">K</tspan></text><text class="lbl" x="${px(1.35)}" y="${py(0.225)}" style="fill:#c49bff">u<tspan baseline-shift="sub" font-size="20">U</tspan> = 0</text>` })}</div></div>`,
    steps: [
      ['En el examen conviene mostrarlo con la integral, así se ve el razonamiento. La energía elástica del tramo es la integral de su densidad, entre cero coma dos y cero coma ocho metros.'],
      ['Sacando las constantes afuera, aparece el coseno cuadrado de tres coma cinco pi, que es cero. Todo el producto da cero, sin importar cuánto valga la integral.'],
      ['Para chequear: en ese instante, toda la energía del tramo es cinética. En el gráfico, la densidad cinética tiene sus máximos en los vientres, y la elástica es una línea en cero. La integral del coseno cuadrado en el tramo da cero coma tres metros, porque arranca en un nodo y mide tres cuartos de lambda.', `sweep('#o2p #o2uk',{dur:1800}); sweep('#o2p #o2uu',{dur:1800}); sweep('#o2p #o2tr-a, #o2p #o2tr',{delay:1400,dur:1600})`],
      ['Multiplicando, la energía cinética del tramo da unos cincuenta y nueve milijoules. [A] ¿Entonces el dato de la energía cinética no servía para nada? [P] Servía para sacar la amplitud, y para chequear. Pero la respuesta es cero igual. Lo que suma puntos es justificarla: la cuerda está horizontal.'],
    ],
  },

  {
    sec: 'Ond 2 · Cierre', title: 'Dónde es fácil equivocarse', cls: B, chapter: SEC,
    html: ul([
      '@0 **Integrar sin mirar la fase:** primero $\\omega t+\\varphi$. Si $\\cos(\\omega t+\\varphi) = 0$, $U = 0$ sin cuentas.',
      '@1 **Seno y coseno temporales:** $u_U$ lleva el mismo factor temporal que $y$; $u_K$, el otro.',
      '@2 **Unidades:** ms → s y g → kg; calculadora en **RAD** ($400\\pi\\cdot0{,}0075 = 3\\pi$).',
      '@3 **$K = 0{,}079$ J es de toda la cuerda,** no del tramo. Y $E = \\frac14\\mu\\omega^2A^2L$: con ½, $A$ sale mal.',
      '@4 **Tensión y período:** en $u_U = \\frac12T\\left(\\frac{\\partial y}{\\partial x}\\right)^2$, $T$ es la tensión (64 N), no el período.',
    ]),
    steps: [
      ['Dónde es fácil equivocarse. Primero, integrar sin mirar la fase: si el coseno temporal da cero, la energía elástica es cero sin hacer cuentas.'],
      ['Segundo, cambiar los factores temporales. La elástica lleva el mismo factor que la posición. Si los cambiás, te da la elástica máxima en lugar de cero.'],
      ['Tercero, las unidades: milisegundos a segundos, gramos a kilos, y la calculadora en radianes.'],
      ['Cuarto: el dato de energía cinética es de toda la cuerda, no del tramo. Y la energía total lleva un cuarto, no un medio.'],
      ['Y ojo con la letra T: en la fórmula de la energía elástica de la cátedra, T es la tensión, no el período.'],
    ],
  },

  {
    sec: 'Ond 2 · Cierre', title: 'La receta y los resultados', cls: B, chapter: SEC,
    html: `<div class="grid g2" style="align-items:start">${ul([
      '@0 **1.** Datos derivados: $\\mu$, $\\lambda$, $T$, $v$ y $F$.',
      '@1 **2.** Cada instante → fracción de $T$ → fase $\\omega t+\\varphi$.',
      '@2 **3.** Con el dato de energía: $E$ total y $A$.',
      '@3 **4.** ¿Horizontal? $U = 0$. ¿Máxima elongación? $K = 0$.',
      '@4 **5.** Si no es un caso especial, integrar en el tramo.',
    ])}${card('Resultados', `<div style="font-size:.9em;line-height:1.75">${md('$E = 0{,}158$ J y $A = 1$ cm')}<br>${md("$U' = 0$: en $t'$ la cuerda está horizontal")}<br>${md("(extra: $K'_{tramo} = 59$ mJ)")}</div>`, { cls: 'ok', s: 5 })}</div>`,
    steps: [
      ['Resumiendo la receta. Uno: los datos derivados, mu, lambda, el período, la velocidad y la tensión.'],
      ['Dos: cada instante, pasarlo a fracción de período y calcular la fase.'],
      ['Tres: con el dato de energía, sacar la energía total y la amplitud.'],
      ['Cuatro: mirar el instante pedido. Si la cuerda está horizontal, la energía elástica es cero; si está en su máxima elongación, la cinética es cero.'],
      ['Y cinco: solo si no es un caso especial, integrar la densidad en el tramo.'],
      ['Los resultados: energía total, cero coma ciento cincuenta y ocho joules; amplitud, un centímetro; y la energía elástica pedida, cero, porque en ese instante la cuerda está horizontal.'],
    ],
  },
];
