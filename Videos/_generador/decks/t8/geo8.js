// Geo 8 · recuperatorio 1P 1C 2022, ej. 2: plano-convexa n_L = 1,6 como tapa de un tubo (convexa al aire, plana adentro); rayos paralelos.
// Resultados verificados (soluciones/Geo8.py): a) vacío: f' = 15 cm ⇒ 1/15 = 0,6/R ⇒ R = 9 cm (cara curva: s1' = 24 cm);
// b) con líquido solo del lado de la pantalla: n'/s' = 0,6/9 ⇒ s' = 15n' = 21 cm ⇒ n' = 1,4 (si la lente estuviera toda sumergida: 1,12).
const { md, ul, card, callout, eqs, res, table } = require('../../lib');
const { seccion } = require('../common');
const { kit, bench, OB_CSS } = require('../fx');

const SEC = 'Geo 8 · Lente en un tubo con líquido';
const B = 'b-geo';
const K = kit(SEC, B);
const b = bench({ x0: -14, x1: 26, H: 440, ax: 220 });
const X0 = b.X(0);
const lente = `<path class="ob-lens" d="M${X0 + 10},30 L${X0 + 10},410 Q${X0 - 70},220 ${X0 + 10},30 Z"/><text x="${X0 - 40}" y="22" class="ob-t" text-anchor="middle">n_L = 1,6</text>`;
const tubo = `<rect x="${X0 + 10}" y="40" width="${b.X(24) - X0 - 10}" height="360" class="g8-tubo"/>`;
const liq = `<rect id="g8-liq" class="g8-liq pending" x="${X0 + 12}" y="42" width="${b.X(24) - X0 - 14}" height="356"/><text id="g8-liqt" class="pending ob-t" x="${b.X(23)}" y="390" text-anchor="end" style="fill:#8fc0ff;font-weight:700">líquido n′</text>`;
const pant = (x, id, pend) => `<g id="${id}"${pend ? ' class="pending"' : ''}><line x1="${b.X(x)}" y1="60" x2="${b.X(x)}" y2="380" class="g8-p"/><text x="${b.X(x)}" y="430" text-anchor="middle" class="g8-pt">P: ${x} cm</text></g>`;
const rays = (F, cls, pref) => [-130, -65, 65, 130].map((y, i) => `<path id="${pref}${i}" class="ob-ray ${cls} pending" d="M${b.X(-14)},${220 + y} L${X0 - 4},${220 + y} L${b.X(F)},220"/>`).join('');
const CSS = OB_CSS + `.g8-tubo{fill:none;stroke:#8fa6c4;stroke-width:4} .g8-liq{fill:rgba(76,140,255,.16)} .g8-p{stroke:#dfe7f2;stroke-width:8;stroke-linecap:round} .g8-pt{fill:var(--ink);font-size:24px;font-weight:700}`;

module.exports = [
  seccion('Geo 8', 'Lente en un tubo con líquido', 'Recuperatorio 1P 1C 2022 · ejercicio 2',
    'Ejercicio de óptica geométrica número ocho: recuperatorio del primer parcial del primer cuatrimestre de dos mil veintidós, ejercicio dos. Una lente plano-convexa tapa un tubo; al llenar el tubo con líquido, la imagen se aleja.'),

  Object.assign(K.enunciado('Geo8.jpg', ['@1 plano-convexa $n_L=1{,}6$: convexa hacia afuera, plana hacia el tubo', '@1 llegan rayos paralelos', '@2 tubo vacío: imagen en P a 15 cm', '@3 tubo con líquido $n$: P a 21 cm', '@3 a) $R$; b) $n$'], [
    ['Este es el enunciado. Vamos con los datos.'],
    ['Una lente plano-convexa de índice uno coma seis es la tapa de un tubo: la cara curva mira hacia afuera, al aire, y la cara plana hacia adentro. Llega un haz de rayos paralelos.'],
    ['Con el tubo vacío, la imagen se forma en la pantalla P, a quince centímetros.'],
    ['Al llenar el tubo con un líquido, la pantalla tiene que estar a veintiuno. Piden el radio de la cara curva y el índice del líquido.'],
  ], { maxH: 430 }), { css: CSS }),

  K.molde('Ejercicio 13 a) de la hoja: **lente sumergida**, con el fabricante. Y las **fórmulas de óptica**: lente entre medios distintos.',
    ['Rayos paralelos ⇒ imagen en el foco', 'Fabricante para despejar $R$', 'Cara plana: $R=\\infty$'],
    ['El líquido toca **solo la cara plana**: no vale $n_L/n-1$', 'Hay que usar la lente **entre dos medios**'],
    [['El molde es el ejercicio trece de la hoja, la lente sumergida, para el fabricante. Y de las fórmulas, la lente entre dos medios distintos.'],
     ['Se repite: rayos paralelos quiere decir imagen en el foco, y el radio sale del fabricante, con radio infinito para la cara plana.'],
     ['Cambia que el líquido solo toca la cara plana: no se puede usar la receta de lente sumergida.']]),

  K.S('Teoría', 'Una lente entre dos medios distintos', `<div class="grid g2" style="align-items:center">${eqs([
      { t: "\\frac{n'}{s'}-\\frac ns=\\frac{n_L-n}{R_1}+\\frac{n'-n_L}{R_2}", s: 0 },
      { t: 's=-\\infty\\ \\Rightarrow\\ \\frac ns=0', s: 1 },
      { t: 'R_1=+R\\ (\\text{convexa a la luz}),\\quad R_2=\\infty', s: 2, cls: 'hl' },
    ])}${ul(['@0 Es la suma de las dos dioptras de la lente', '@0 $n$: medio de entrada; $n\'$: medio de salida', '@2 La cara curva ve aire y vidrio siempre; el líquido solo entra en la segunda'])}</div>`, [
    ['Cuando a cada lado de la lente hay un medio distinto, se usa esta forma: n prima sobre s prima menos n sobre s, igual a la suma de las dos dioptras. n es el medio de entrada y n prima el de salida.'],
    ['Con rayos paralelos, s es infinito y el segundo término se anula.'],
    ['La cara curva está hacia la luz, con el centro a la derecha: R uno es más R. La plana tiene radio infinito. [A] ¿Por qué no uso la de la lente sumergida? [P] Porque esa supone el mismo líquido de los dos lados. Acá a la izquierda hay aire.'],
  ]),

  K.S('a) Tubo vacío', 'El radio de la cara curva', `<div style="display:grid;grid-template-columns:1fr 600px;gap:30px;align-items:center">${b.svg('g8-a', tubo + lente + pant(15, 'g8-pa') + rays(15, '', 'g8-ra'), 'width:1060px')}
      ${eqs([
        { t: "f'=15\\ \\text{cm}", s: 0 },
        { t: '\\frac1{15}=(1{,}6-1)\\left(\\frac1R-0\\right)=\\frac{0{,}6}{R}', s: 1 },
        { t: 'R=9\\ \\text{cm}', s: 1, cls: 'ok' },
        { t: "\\text{chequeo: }\\frac{1{,}6}{s_1'}=\\frac{0{,}6}{9}\\Rightarrow s_1'=24;\\ \\frac1{s'}=\\frac{1{,}6}{24}\\Rightarrow15", s: 2 },
      ])}</div>`, [
    ['Ítem a. Con el tubo vacío, los rayos paralelos se juntan en el foco: la focal es quince centímetros.', `S.querySelectorAll('[id^=g8-ra]').forEach((e,i)=>draw(e,{delay:i*250,dur:1800}))`],
    ['Con el fabricante en aire: un quinceavo es cero coma seis por uno sobre R. R es nueve centímetros, con el centro hacia el tubo.'],
    ['Dioptra por dioptra: la cara curva, de aire a vidrio, forma la imagen a veinticuatro centímetros; la plana, de vidrio a aire, la acerca a quince. Coincide.'],
  ]),

  K.S('b) Con líquido', 'El índice del líquido', `<div style="display:grid;grid-template-columns:1fr 600px;gap:30px;align-items:center">${b.svg('g8-b', tubo + liq + lente + pant(15, 'g8-pb1') + pant(21, 'g8-pb2', true) + rays(21, 'b', 'g8-rb'), 'width:1060px')}
      ${eqs([
        { t: "\\frac{n'}{s'}-0=\\frac{0{,}6}{9}+\\frac{n'-1{,}6}{\\infty}=\\frac1{15}", s: 1 },
        { t: "s'=15\\,n'=21\\ \\Rightarrow\\ n'=1{,}4", s: 2, cls: 'ok' },
      ])}</div>`, [
    ['Ítem b. Llenamos el tubo: el líquido queda entre la cara plana y la pantalla.', `show('#g8-liq, #g8-liqt',{from:'fade'})`],
    ['La luz entra desde el aire y sale al líquido. Con la fórmula de dos medios: n prima sobre s prima es cero coma seis sobre nueve, un quinceavo. La cara plana no suma potencia.'],
    ['Entonces s prima es quince por n prima. Para que la imagen esté a veintiuno, n prima es veintiuno sobre quince: uno coma cuatro. [A] ¿Por qué se aleja la imagen? [P] Porque el líquido tiene un índice parecido al vidrio: en la cara plana los rayos se desvían menos y convergen más lejos.', `S.querySelectorAll('[id^=g8-rb]').forEach((e,i)=>draw(e,{delay:i*250,dur:1800})); hide('#g8-pb1',{delay:600}); show('#g8-pb2',{delay:1200})`],
  ]),

  K.S('Ambigüedad', '¿Cómo queda la lente respecto del líquido?', `${table([
      ['Interpretación', 'Ecuación', '$n$ del líquido'],
      { cells: ['**Según la figura:** curva al aire, plana al líquido', '$21=15\\,n$', '**1,40**'], s: 0, cls: 'hl' },
      { cells: ['Lente toda sumergida ($n_L/n-1$)', '$21=\\frac{9n}{1{,}6-n}$', '1,12'], s: 1 },
      { cells: ['Curva mojada y plana al aire', '$21=\\frac{9n}{1{,}6-n}$', '1,12'], s: 1 },
    ], { style: 'width:100%;font-size:1em' })}${callout('La lente es la **tapa** del tubo: el líquido solo toca la cara plana ⇒ **$n=1{,}4$**.', { s: 2, cls: 'ok', style: 'margin-top:30px' })}`, [
    ['Una aclaración. Según la figura, la lente es la tapa del tubo y el líquido solo toca la cara plana: n igual a uno coma cuatro.'],
    ['Si alguien supone la lente toda sumergida, o con la cara curva mojada, sale uno coma doce.'],
    ['Lo más probable es uno coma cuatro: coincide con la figura y sale de una cuenta limpia, veintiuno sobre quince.'],
  ]),

  K.trampas([
    '**No usar $n_L/n-1$:** el líquido no rodea la lente (daría 1,12).',
    '**La cara plana sí importa** cuando del otro lado hay otro medio.',
    '**Con líquido la imagen se aleja**, no se acerca.',
    '**Cara plana: $R=\\infty$**, no $R=0$.',
    '**a) es toda en aire;** en b) cambia solo el medio de salida.',
  ], [
    ['Las trampas. Primera: no usar la receta de lente sumergida.'],
    ['Segunda: la cara plana importa cuando separa vidrio de otro medio.'],
    ['Tercera: con el líquido, la imagen se aleja.'],
    ['Cuarta: la cara plana tiene radio infinito.'],
    ['Y quinta: en el b solo cambia el medio de salida.'],
  ]),

  K.receta([
    "**1.** Paralelos ⇒ $s'=f'$.",
    '**2.** Fabricante en aire ⇒ $R$.',
    "**3.** Medios distintos: $\\frac{n'}{s'}-\\frac ns=\\frac{n_L-n}{R_1}+\\frac{n'-n_L}{R_2}$.",
    "**4.** $s'$ dado ⇒ $n'$.",
  ], ['a) $R=9$ cm', 'b) $s\'=15\\,n\'$ ⇒ **$n\'=1{,}4$**', '(1,12 si se la toma toda sumergida)'], [
    ['La receta. Uno: rayos paralelos, imagen en el foco.'],
    ['Dos: el fabricante da el radio.'],
    ['Tres: con medios distintos, la fórmula de dos medios.'],
    ['Cuatro: la distancia dada da el índice.'],
    ['Resultados: nueve centímetros, y uno coma cuatro.'],
  ]),
];
