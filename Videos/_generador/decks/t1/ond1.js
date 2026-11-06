// Ond 1 · 1P 16/9/2023, ej. 3: propagante -> estacionaria con 5 nodos (libre–libre), energías de un tramo, u_K(x)
// Resultados verificados: λ = 20 cm, k = 10π m⁻¹, ω = 4000π s⁻¹, μ = 4·10⁻³ kg/m, libre–libre n = 5, φ = −π/2,
// K[2;32 cm](t' = 2,5T) = 0,758 J y U = 0; u_K(x, 5T) = 5,053 cos²(10πx) J/m.
const { md, ul, card, callout, table, eqs, res, datos, img, molde, plot, cuerda } = require('../../lib');
const { seccion } = require('../common');

const SEC = 'Ond 1 · Propagante → estacionaria';
const B = 'b-ond';
const PX = x => 120 + x / 50 * 1260; // posición (cm) -> px en las cuerdas de 1500 de ancho

// superposición de dos propagantes
const sup = `<svg id="sup" viewBox="0 0 900 770" style="width:820px;overflow:visible">
  <g font-size="26" font-family="Segoe UI" fill="#93a4bc">
    <text x="20" y="40">$y_1$ viaja →</text><text x="20" y="270">$y_2$ viaja ←</text><text x="20" y="500" fill="#6fdc8c">suma: estacionaria</text>
  </g>
  <line x1="40" y1="130" x2="880" y2="130" stroke="#33476a" stroke-width="2" stroke-dasharray="8 8"/>
  <line x1="40" y1="360" x2="880" y2="360" stroke="#33476a" stroke-width="2" stroke-dasharray="8 8"/>
  <line x1="40" y1="610" x2="880" y2="610" stroke="#33476a" stroke-width="2" stroke-dasharray="8 8"/>
  <path id="w1" d="M40,130 L880,130" fill="none" stroke="#5aa9ff" stroke-width="6"/>
  <path id="w2" d="M40,360 L880,360" fill="none" stroke="#c49bff" stroke-width="6"/>
  <path id="ws" d="M40,610 L880,610" fill="none" stroke="#6fdc8c" stroke-width="7"/>
  <g id="an" class="pending" data-s="9"><text x="460" y="752" font-size="24" fill="#ffc562" text-anchor="middle">en los antinodos la amplitud es 2A</text></g>
</svg>`.replace(/\$([^$]+)\$/g, (_, t) => t.replace('_1', '₁').replace('_2', '₂'));
const supJs = `
  const g1 = {x0:40, x1:880, y:130, L:1}, g2 = {x0:40, x1:880, y:360, L:1}, gs = {x0:40, x1:880, y:610, L:1};
  const k = 2*Math.PI*2, per = 1700, w = 2*Math.PI/per, A = 48, d = talk();
  animFn('#w1', g1, (x,t) => A*Math.sin(k*x - w*t), {dur:d});
  animFn('#w2', g2, (x,t) => A*Math.sin(k*x + w*t), {dur:d});
  animFn('#ws', gs, (x,t) => 2*A*Math.sin(k*x)*Math.cos(w*t), {dur:d});`;

// cuerdas
const cLL = (id, extra = '', o = {}) => cuerda(Object.assign({ id, L: 50, n: 5, model: 'll', w: 1500, h: 360, A: 90, ticks: [0, 10, 20, 30, 40, 50], extra }, o));
const tramo = `<rect class="tramo" x="${PX(2)}" y="60" width="${PX(32) - PX(2)}" height="240" rx="12"/><text class="tl" x="${(PX(2) + PX(32)) / 2}" y="44">tramo [2 cm ; 32 cm]</text>`;
// punto x = 12 cm en máxima elongación, con su tangente
const y12 = 180 - 90 * Math.cos(Math.PI / 10 * 12), sl = 90 * (Math.PI / 10) * Math.sin(Math.PI / 10 * 12) / (1260 / 50);
const p12 = `<g id="p12" class="pending"><line x1="${PX(12) - 90}" y1="${y12 - sl * 90}" x2="${PX(12) + 90}" y2="${y12 + sl * 90}" stroke="#ffc562" stroke-width="5" stroke-dasharray="10 7"/>
  <circle class="pt" cx="${PX(12)}" cy="${y12}" r="13"/><text x="${PX(12) + 20}" y="${y12 + 48}" fill="#c49bff" font-size="26" font-weight="700">x = 12 cm</text></g>`;

const cos2 = x => Math.cos(10 * Math.PI * x) ** 2;
const uk = x => 5.053 * cos2(x);

module.exports = [
  seccion('Ond 1', 'Propagante → estacionaria', 'Primer parcial del 16/9/2023 · ejercicio 3',
    'Ejercicio de ondas número uno: primer parcial del dieciséis de septiembre de dos mil veintitrés, ejercicio tres. Una onda propagante que, al reflejarse en los extremos, forma una onda estacionaria.'),

  {
    sec: 'Ond 1 · Enunciado', title: 'Qué dice el enunciado', cls: B, chapter: SEC,
    html: `<div style="display:flex;flex-direction:column;gap:34px;align-items:center">${img('Ond1.jpg', { style: 'width:1300px' })}
      ${datos(['@1 $v = 400$ m/s', '@1 $L = 50$ cm', '@1 $m = 2$ g', '@2 $T = 0{,}5$ ms', '@2 $A = 2$ mm (de la propagante)', '@3 5 nodos en total', '@3 en $t=\\frac54T$, $x = 12$ cm tiene $U_{max}$'], { style: 'justify-content:center;max-width:1650px' })}</div>`,
    steps: [
      ['Este es el enunciado. Leámoslo con calma y anotemos los datos a medida que aparecen.'],
      ['Una onda propagante viaja a cuatrocientos metros por segundo por una cuerda de cincuenta centímetros de largo y dos gramos de masa.'],
      ['El período es de medio milisegundo, y la amplitud de esa onda propagante es de dos milímetros.'],
      ['Cuando se forma la onda estacionaria hay cinco nodos en total. Y hay una condición que va a fijar la fase: en el instante cinco cuartos de período, el punto ubicado en x igual a doce centímetros tiene su máxima energía elástica.'],
      ['Nos piden tres cosas: qué modelo de cuerda corresponde, las energías cinética y elástica de un tramo en un instante dado, y la densidad de energía cinética a lo largo de toda la cuerda en otro instante.'],
    ],
  },

  {
    sec: 'Ond 1 · Antes de calcular', title: 'Buscar el molde en la hoja', cls: B, chapter: SEC,
    html: `${molde('Ejercicio 7 de la hoja: **propagante con $\\langle P\\rangle$ → estacionaria** (recuperatorio del 1/11/2025): modelo por la cantidad de nodos, energía de un tramo y gráfico de $u_K$.', { s: 0 })}
      <div class="grid g2" style="margin-top:40px">
        ${card('Lo que se repite', ul(['Elegir el modelo con la cantidad de nodos', 'Pasar el instante a fracción de período', 'Integrar la densidad de energía en el tramo']), { cls: 'ok', s: 1 })}
        ${card('Lo que cambia', ul(['No hay $\\langle P\\rangle$: los datos son $v$, $T$ y $A$', 'La fase sale de una condición de energía elástica', 'El tramo y los instantes son otros']), { cls: 'warn', s: 2 })}
      </div>`,
    steps: [
      ['Antes de hacer cuentas, buscamos en la hoja el ejercicio que más se parece. Es el siete: la propagante con potencia media que se vuelve estacionaria, del recuperatorio del uno de noviembre.'],
      ['[A] ¿Es el mismo ejercicio? [P] Casi. Los pasos son los mismos: elegir el modelo con la cantidad de nodos, ubicar el instante dentro del período e integrar la energía en un tramo.'],
      ['Lo que cambia son los datos de entrada. Acá no hay potencia media: tenemos la velocidad, el período y la amplitud. Y la fase no está dada, sale de una condición sobre la energía elástica.'],
    ],
  },

  {
    sec: 'Ond 1 · Teoría', title: 'De dos propagantes a una estacionaria', cls: B, chapter: SEC,
    css: `.sup-row{display:grid;grid-template-columns:880px 1fr;gap:50px;align-items:center}`,
    html: `<div class="sup-row"><div>${sup}</div>
      ${eqs([
        { t: '\\mu = \\frac{m}{L} = \\frac{2\\cdot10^{-3}}{0{,}5} = 4\\cdot10^{-3}\\ \\tfrac{\\text{kg}}{\\text{m}}', s: 1 },
        { t: '\\omega = \\frac{2\\pi}{T} = 4000\\pi\\ \\text{s}^{-1}', s: 2 },
        { t: '\\lambda = vT = 400\\cdot0{,}5\\cdot10^{-3} = 0{,}2\\ \\text{m}', s: 3 },
        { t: 'k = \\frac{2\\pi}{\\lambda} = 10\\pi\\ \\text{m}^{-1}', s: 3 },
        { t: 'A_{est} = 2A = 4\\ \\text{mm}', s: 4, id: 'a2', cls: 'ok' },
      ], { title: 'Datos que vamos a usar' })}</div>`,
    steps: [
      ['Primero, de dónde sale la onda estacionaria. La onda que viaja hacia un lado se refleja en el extremo y vuelve. Tenemos dos ondas propagantes iguales, de amplitud A, que viajan en sentidos opuestos. Su suma es la onda estacionaria: cada punto oscila en su lugar, con una amplitud que depende de x. Hay puntos que no se mueven nunca, los nodos, y otros que oscilan al máximo, los antinodos.', supJs + `show('#an',{delay:2500});`],
      ['Con los datos sacamos todo lo que vamos a usar. La densidad lineal, mu, es la masa sobre el largo: cuatro por diez a la menos tres kilos por metro. [A] ¿Hay que pasar los gramos a kilos? [P] Siempre. Todo a unidades del sistema internacional antes de reemplazar.'],
      ['La frecuencia angular, omega, es dos pi sobre el período: cuatro mil pi radianes por segundo.'],
      ['La longitud de onda es la velocidad por el período: veinte centímetros. Y el número de onda, k, es dos pi sobre lambda: diez pi por metro.'],
      ['Y ojo con la amplitud. Los dos milímetros son de cada propagante. En los antinodos las dos se suman, así que la estacionaria tiene amplitud dos A: cuatro milímetros.', `flash('#a2')`],
    ],
  },

  {
    sec: 'Ond 1 · a) Modelo', title: '¿Qué modelo de cuerda tiene 5 nodos?', cls: B, chapter: SEC,
    html: `${table([
      ['Modelo', 'Condición', 'Con $L = 50$ cm, $\\lambda = 20$ cm', 'Nodos', ''],
      { cells: ['fijo–fijo', '$L = n\\frac{\\lambda}{2}$', '$n = \\frac{2L}{\\lambda} = 5$', '$n + 1 = 6$', '{c4|✗}'], s: 1 },
      { cells: ['libre–libre', '$L = n\\frac{\\lambda}{2}$', '$n = 5$', '$n = 5$', '{c2|✓}'], s: 2, id: 'fll' },
      { cells: ['fijo–libre', '$L = (2n-1)\\frac{\\lambda}{4}$', '$2n - 1 = \\frac{4L}{\\lambda} = 10$ ⇒ $n = 5{,}5$', 'no entero', '{c4|✗}'], s: 3 },
    ], { style: 'font-size:1.05em;width:100%' })}
      ${callout('Si dos modelos dieran bien, la respuesta sería **"no es posible determinarlo"**. Acá hay uno solo: **libre–libre, armónico $n = 5$**.', { s: 4, cls: 'ok', style: 'margin-top:40px' })}`,
    steps: [
      ['Ítem a: qué modelo de cuerda corresponde. Probamos los tres.'],
      ['Fijo–fijo: entran medias longitudes de onda enteras, L igual a n lambda sobre dos. Con cincuenta centímetros y lambda de veinte, n da cinco. Pero en fijo–fijo los dos extremos también son nodos, así que hay n más uno: seis. No son cinco, así que se descarta.'],
      ['Libre–libre: la misma condición, n igual a cinco. Pero ahora los extremos son antinodos y los nodos quedan todos adentro: hay exactamente n nodos, cinco. Coincide con el enunciado.', `hl('#fll')`],
      ['Fijo–libre: entran cuartos de onda impares. Dos n menos uno tendría que valer diez, y n sería cinco coma cinco, que no es entero. Imposible.'],
      ['[A] ¿Y si dos modelos hubieran dado bien? [P] Ahí la respuesta correcta sería que no es posible determinarlo; por eso el enunciado ofrece esa opción. Acá queda uno solo: libre–libre, en el armónico cinco.'],
    ],
  },

  {
    sec: 'Ond 1 · a) Modelo', title: 'Libre–libre, armónico 5', cls: B, chapter: SEC,
    html: `<div style="display:flex;flex-direction:column;align-items:center;gap:30px">${cLL('c1', '', { sNodes: 1 })}
      ${eqs([{ t: 'y(x,t) = 2A\\cos(kx)\\,\\cos(\\omega t + \\varphi)', s: 2 }], { style: 'padding:18px 40px' })}</div>`,
    steps: [
      ['Así se ve la cuerda libre–libre. Los extremos están sujetos a anillos que suben y bajan por una varilla, así que son antinodos: ahí la cuerda oscila al máximo.', `standing('#c1',{dur:talk(), per:1500})`],
      ['Y adentro quedan los cinco nodos: en cinco, quince, veinticinco, treinta y cinco y cuarenta y cinco centímetros. Entre nodo y nodo hay media longitud de onda, diez centímetros.', `standing('#c1',{dur:talk(), per:1500})`],
      ['Como en x igual a cero hay un antinodo, la forma espacial es un coseno de k x. La onda queda: y igual a dos A, coseno de k x, coseno de omega t más fi. Nos falta la fase, fi.', `standing('#c1',{dur:talk(), per:1500, end:'flat'})`],
    ],
  },

  {
    sec: 'Ond 1 · La fase', title: 'Máxima energía elástica en t = 5T/4', cls: B, chapter: SEC,
    css: `.fase{display:grid;grid-template-columns:720px 1fr;gap:40px;align-items:center}`,
    html: `<div class="fase">${eqs([
      { t: 'u_U = \\tfrac12\\,T_{cuerda}\\left(\\frac{\\partial y}{\\partial x}\\right)^2', s: 0 },
      { t: 'u_U \\propto \\sen^2(kx)\\,\\cos^2(\\omega t+\\varphi)', s: 1, id: 'uu' },
      { t: '\\omega\\,\\tfrac54T + \\varphi = m\\pi \\;\\Rightarrow\\; \\tfrac{5\\pi}{2}+\\varphi = m\\pi', s: 3 },
      { t: '\\varphi = -\\tfrac{\\pi}{2}', s: 3, cls: 'ok' },
      { t: 'y = 2A\\cos(kx)\\,\\sen(\\omega t)', s: 4, cls: 'hl' },
    ])}
      <div>${cLL('c2', p12, { w: 1500, style: 'width:960px' })}</div></div>`,
    steps: [
      ['Para la fase usamos la condición del enunciado. La energía elástica depende de cuánto está estirada la cuerda, o sea, de su pendiente: es un medio de la tensión por la derivada espacial al cuadrado.'],
      ['Derivando la onda queda seno cuadrado de k x, por coseno cuadrado de omega t más fi. Para un punto fijo lo único que cambia con el tiempo es el coseno cuadrado, y es máximo cuando vale uno: cuando toda la cuerda está en su máxima elongación.', `snapshot('#c2',1,{dur:900})`],
      ['[A] ¿Y por qué importa que sea justo x igual a doce? [P] Porque en un antinodo, por ejemplo en diez o en veinte centímetros, la pendiente es siempre cero: ese punto nunca tiene energía elástica, y la condición no diría nada. En doce, seno de k x no es cero, así que el dato sirve.', `snapshot('#c2',1,{dur:10}); show('#p12',{from:'fade'}); draw('#p12 line',{dur:900})`],
      ['Entonces omega por cinco cuartos de período, más fi, tiene que ser un múltiplo de pi. Omega por cinco T cuartos es cinco pi medios, así que fi igual a menos pi medios cumple.', `snapshot('#c2',1,{dur:10}); show('#p12',{dur:10})`],
      ['Y como coseno de omega t menos pi medios es seno de omega t, la onda queda: y igual a dos A, coseno de k x, seno de omega t. Con números: cuatro milímetros, coseno de diez pi x, seno de cuatro mil pi t.', `snapshot('#c2',1,{dur:10}); show('#p12',{dur:10})`],
    ],
  },

  {
    sec: 'Ond 1 · b) Energías del tramo', title: '¿Cómo está la cuerda en t′ = 1,25 ms?', cls: B, chapter: SEC,
    html: `<div style="display:flex;flex-direction:column;align-items:center;gap:14px">
      ${eqs([{ t: '\\frac{t\'}{T} = \\frac{1{,}25}{0{,}5} = 2{,}5 \\;\\Rightarrow\\; \\omega t\' = 5\\pi \\;\\Rightarrow\\; \\sen(\\omega t\') = 0', s: 1 }], { style: 'padding:16px 36px' })}
      ${cLL('c3', tramo)}
      ${callout('Cuerda horizontal ⇒ **$U = 0$**: toda la energía del tramo es **cinética**, y los puntos van a velocidad máxima.', { s: 2, cls: 'ok' })}</div>`,
    steps: [
      ['Ítem b: las energías del tramo entre dos y treinta y dos centímetros, en t prima igual a uno coma veinticinco milisegundos.'],
      ['Primero, en qué parte del período estamos. Uno coma veinticinco dividido cero coma cinco da dos coma cinco: dos períodos y medio. Omega t prima es cinco pi, y seno de cinco pi es cero.'],
      ['Eso quiere decir que en ese instante toda la cuerda está horizontal, pasando por el equilibrio. Sin deformación no hay energía elástica: U es cero. [A] ¿Y la velocidad ahí es máxima? [P] Sí, igual que en un resorte: donde la elongación es cero, la velocidad es máxima. Toda la energía del tramo es cinética.', `standing('#c3',{dur:talk(), per:1600, phase:-Math.PI/2, end:'flat'})`],
    ],
  },

  {
    sec: 'Ond 1 · b) Energías del tramo', title: 'Energía cinética del tramo', cls: B, chapter: SEC,
    css: `.kin{display:grid;grid-template-columns:1fr 900px;gap:40px;align-items:center}`,
    html: `<div class="kin">${eqs([
      { t: 'K = \\int_{x_1}^{x_2} \\tfrac12\\,\\mu\\left(\\frac{\\partial y}{\\partial t}\\right)^2 dx', s: 0 },
      { t: '\\frac{\\partial y}{\\partial t} = 2A\\omega\\cos(kx)\\cos(\\omega t)', s: 1, note: 'en $t\'$: $\\cos^2(5\\pi) = 1$' },
      { t: 'K = \\tfrac12\\,\\mu\\,(2A\\omega)^2 \\int_{0{,}02}^{0{,}32}\\cos^2(kx)\\,dx', s: 2 },
      { t: '\\int_{0{,}02}^{0{,}32}\\cos^2(kx)\\,dx = \\frac{\\Delta x}{2} = 0{,}15\\ \\text{m}', s: 3, cls: 'hl' },
      { t: 'K = \\tfrac12\\cdot4\\cdot10^{-3}\\,(4\\cdot10^{-3}\\cdot4000\\pi)^2\\cdot0{,}15', s: 4 },
    ])}
      <div>${plot({ w: 900, h: 520, x: [0, 0.4], y: [0, 1.2], ticksX: [0, 0.02, 0.12, 0.22, 0.32], ticksY: [0, 0.5, 1], xl: 'x (m)', yl: 'cos²(kx)', id: 'pc', s: 2,
        curves: [{ f: cos2, cls: 'c5', id: 'cfull' }, { f: cos2, from: 0.02, to: 0.32, area: true, cls: 'c3', id: 'ctr' }, { f: () => 0.5, cls: 'c2 dash', id: 'half' }],
        extra: (px, py) => `<text class="lbl c2" x="${px(0.335)}" y="${py(0.5) - 12}">½</text>` })}
      ${res('$K = 0{,}758$ J  ·  $U = 0$', { s: 5, style: 'margin-top:26px' })}</div></div>`,
    steps: [
      ['La energía cinética del tramo es la integral de un medio de mu por la velocidad al cuadrado, punto por punto.'],
      ['La velocidad de cada punto es la derivada temporal: dos A omega, coseno de k x, coseno de omega t. En t prima, coseno de cinco pi al cuadrado vale uno.'],
      ['Sacando las constantes afuera, queda la integral de coseno cuadrado de k x entre dos y treinta y dos centímetros. Fijate en el gráfico: el coseno cuadrado oscila entre cero y uno, siempre alrededor de un medio.', `sweep('#pc #cfull',{dur:1600}); sweep('#pc #ctr-a, #pc #ctr',{delay:1200,dur:1800}); sweep('#pc #half',{delay:2600,dur:900})`],
      ['Si el tramo tiene un número entero de medias longitudes de onda, el área es exactamente la mitad del largo. Treinta centímetros son tres medias longitudes de onda, porque media lambda son diez centímetros. Entonces la integral vale cero coma quince metros. [A] ¿Y si no fuera un número entero de medias ondas? [P] Ahí hacés la integral completa: x sobre dos, más seno de dos k x sobre cuatro k, evaluada en los extremos.'],
      ['Reemplazando: un medio, por cuatro por diez a la menos tres, por dos A omega al cuadrado, por cero coma quince.'],
      ['Da cero coma setecientos cincuenta y ocho joules de energía cinética, y la energía elástica es cero.', `pulse('.res')`],
    ],
  },

  {
    sec: 'Ond 1 · c) Densidad de energía cinética', title: "$u_K(x)$ en $t'' = 2t'$", cls: B, chapter: SEC,
    css: `.ukc{display:grid;grid-template-columns:760px 1fr;gap:40px;align-items:center}`,
    html: `<div class="ukc">${eqs([
      { t: 't\'\' = 2t\' = 2{,}5\\ \\text{ms} = 5T \\Rightarrow \\omega t\'\' = 10\\pi', s: 1 },
      { t: 'u_K = \\tfrac12\\,\\mu\\left(\\frac{\\partial y}{\\partial t}\\right)^2 = \\tfrac12\\,\\mu\\,(2A\\omega)^2\\cos^2(kx)', s: 2 },
      { t: 'u_K(x) = 5{,}05\\,\\cos^2(10\\pi x)\\ \\ \\tfrac{\\text{J}}{\\text{m}}', s: 2, cls: 'ok' },
    ])}
      ${plot({ w: 960, h: 560, x: [0, 0.5], y: [0, 6], ticksX: [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5], ticksY: [0, 2.5, 5.05], xl: 'x (m)', yl: 'u_K (J/m)', id: 'pu', s: 3,
        curves: [{ f: uk, area: true, id: 'uk', n: 600 }],
        extra: (px, py) => [0.05, 0.15, 0.25, 0.35, 0.45].map(x => `<circle class="dot pending" data-s="4" cx="${px(x)}" cy="${py(0)}" r="11" style="fill:#ff6f7d"/>`).join('') + `<text class="lbl c4 pending" data-s="4" x="${px(0.5)}" y="${py(5.75)}" style="text-anchor:end">● nodos: u = 0</text>` })}</div>`,
    steps: [
      ['Ítem c: la densidad de energía cinética a lo largo de toda la cuerda, en t segunda igual a dos t prima.'],
      ['Dos t prima son dos coma cinco milisegundos: cinco períodos exactos. Omega t segunda es diez pi, así que de nuevo la cuerda está horizontal y moviéndose a velocidad máxima.'],
      ['La densidad de energía cinética es un medio de mu por la velocidad al cuadrado, ahora sin integrar. Con coseno cuadrado de diez pi igual a uno, queda cinco coma cero cinco, por coseno cuadrado de diez pi x, en joules por metro.'],
      ['Graficada, es máxima en los antinodos, cada diez centímetros, donde vale cinco coma cero cinco joules por metro.', `sweep('#pu #uk-a, #pu #uk',{dur:2600})`],
      ['Y vale cero en los nodos. [A] ¿Cómo puede valer cero si la cuerda se mueve a velocidad máxima? [P] Porque los nodos son justamente los puntos que no se mueven nunca: ahí la velocidad es cero siempre, en cualquier instante.'],
    ],
  },

  {
    sec: 'Ond 1 · Cierre', title: 'Dónde es fácil equivocarse', cls: B, chapter: SEC,
    html: ul([
      '@0 **Amplitud:** $A$ es de cada propagante; la estacionaria tiene $2A$.',
      '@1 **Nodos "en total":** en fijo–fijo se cuentan los extremos ($n+1$); en libre–libre son $n$.',
      '@2 **Instantes:** pasalos siempre a fracción de período. $t\'/T = 2{,}5$ ⇒ cuerda horizontal.',
      '@3 **La resolución del PDF original** calcula $\\frac94T = 1{,}25$ ms (es $1{,}125$ ms) y por eso invierte $K$ y $U$.',
    ]),
    steps: [
      ['Antes de cerrar, los lugares donde es fácil equivocarse. Primero, la amplitud: la que da el enunciado es la de cada propagante, y la estacionaria tiene el doble.'],
      ['Segundo, los nodos en total. En fijo–fijo los extremos también cuentan, así que hay n más uno. En libre–libre hay exactamente n.'],
      ['Tercero, los instantes: pasalos siempre a fracción de período. Con eso sabés al toque si la cuerda está horizontal o en su máxima elongación.'],
      ['Y ojo: la resolución que trae el PDF original se equivoca en una cuenta. Calcula nueve cuartos de período como uno coma veinticinco milisegundos, cuando en realidad es uno coma ciento veinticinco. Por eso le da la energía toda elástica, al revés de lo correcto.'],
    ],
  },

  {
    sec: 'Ond 1 · Cierre', title: 'La receta, en cinco pasos', cls: B, chapter: SEC,
    html: `<div class="grid g2" style="align-items:start">${ul([
      '@0 **1.** Datos derivados: $\\mu$, $\\omega$, $\\lambda$, $k$ y $2A$.',
      '@1 **2.** Modelo: probar los tres y contar nodos.',
      '@2 **3.** Fase: con la condición del enunciado.',
      '@3 **4.** Instante → fracción de $T$ → forma de la cuerda.',
      '@4 **5.** Energía: integrar; con medias ondas enteras, $\\int\\cos^2 = \\frac{\\Delta x}{2}$.',
    ])}${card('Resultados', `<div style="font-size:.9em;line-height:1.7">a) libre–libre, $n = 5$<br>$y = 4\\text{ mm}\\,\\cos(10\\pi x)\\,\\sen(4000\\pi t)$<br>b) $K = 0{,}758$ J, $U = 0$<br>c) $u_K = 5{,}05\\cos^2(10\\pi x)$ J/m</div>`.replace(/\$([^$]+)\$/g, (m) => md(m)), { cls: 'ok', s: 5 })}</div>`,
    steps: [
      ['Resumiendo la receta. Uno: sacar los datos derivados, mu, omega, lambda, k, y la amplitud de la estacionaria.'],
      ['Dos: elegir el modelo probando los tres y contando nodos.'],
      ['Tres: la fase, con la condición que da el enunciado.'],
      ['Cuatro: cada instante, pasarlo a fracción de período para saber cómo está la cuerda.'],
      ['Y cinco: integrar la densidad de energía. Si el tramo tiene medias ondas enteras, la integral del coseno cuadrado es la mitad del largo.'],
      ['Y estos son los resultados. Si llegaste a lo mismo, vas muy bien. Si no, volvé al paso donde te separaste.'],
    ],
  },
];
