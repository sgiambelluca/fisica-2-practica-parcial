// Geo 7 · 1P 23/4/2022, ej. 4: objeto en 0, convergente f'1 = 12 cm en 60, divergente plano-cóncava (n = 1,5) en 90; imagen vista en 78.
// Resultados verificados (soluciones/Geo7.py): s1' = +15 (x = 75); s2 = −15; s2' = −12 ⇒ f'2 = −60 cm; fabricante con 0,5 ⇒ |R| = 30 cm
// (R = −30 si la cara curva mira a la lente 1, +30 si mira al observador): indistinto; A = −0,2. b) s2' = ∞ ⇒ s2 = +60 ⇒ s1' = 90 ⇒ f'1 = 36 cm.
const { md, ul, card, callout, eqs, res } = require('../../lib');
const { seccion } = require('../common');
const { kit, bench, OB_CSS, lineAt } = require('../fx');

const SEC = 'Geo 7 · Convergente + plano-cóncava';
const B = 'b-geo';
const K = kit(SEC, B);
const A = bench({ x0: -4, x1: 102, H: 470, ax: 230, k: 3 });
const r1 = [[0, 40], [60, 0], [75, -10], [90, -20], [102, -32]], r1e = [[90, -20], [78, -8]];
const r2 = [[0, 40], [60, 10], [90, -30], [102, lineAt([78, -8], [90, -30], 102)]], r2e = [[90, -30], [78, -8]];
const Bb = bench({ x0: -4, x1: 156, H: 470, ax: 200, k: 2 });
const q1 = [[0, 40], [60, 0], [90, -20], [125, -55]], q2 = [[0, 40], [60, 40], [90, lineAt([60, 40], [150, -60], 90)], [125, lineAt([60, 40], [150, -60], 90) - 35]], q3 = [[0, 40], [60, 30], [90, 0], [125, -35]];
const ghost = [[[90, -20], [150, -60]], [[90, lineAt([60, 40], [150, -60], 90)], [150, -60]], [[90, 0], [150, -60]]];
const perfil = (id, dir) => `<svg class="ob-svg" viewBox="0 0 260 340" style="width:200px"><path d="${dir > 0 ? 'M60,20 L170,20 L170,320 L60,320 Q115,170 60,20 Z' : 'M90,20 L200,20 Q145,170 200,320 L90,320 Z'}" class="ob-lens"/><text x="130" y="336" text-anchor="middle" class="ob-t">${dir > 0 ? 'curva hacia L1' : 'curva hacia el ojo'}</text></svg>`;

module.exports = [
  seccion('Geo 7', 'Convergente + plano-cóncava', 'Primer parcial del 23/4/2022 · ejercicio 4',
    'Ejercicio de óptica geométrica número siete: primer parcial del veintitrés de abril de dos mil veintidós, ejercicio cuatro. Una convergente y una divergente en un banco óptico: con la imagen que ve el observador se calcula el radio de la divergente, y después se cambia la convergente para que salgan paralelos.'),

  Object.assign(K.enunciado('Geo7.jpg', ['@1 objeto en $x=0$', '@1 lente 1: convergente, $f\'_1=12$ cm, en $x=60$', '@2 lente 2: divergente plano-cóncava, $n=1{,}5$, en $x=90$', '@2 imagen vista en $x=78$ cm', '@3 a) radio y perfil; b) $f\'_1$ para que salgan paralelos'], [
    ['Este es el enunciado. Vamos con los datos.'],
    ['En un banco óptico, el objeto está en cero y una convergente de doce centímetros de focal en sesenta.'],
    ['En noventa hay una divergente con una cara plana, de vidrio de uno coma cinco. El observador, a la derecha, ve la imagen en setenta y ocho.'],
    ['Piden el radio de la cara curva y si importa hacia dónde mira, y la focal que debería tener la primera lente para que la luz salga paralela.'],
  ], { maxH: 430 }), { css: OB_CSS }),

  K.molde('Ejercicio 14 de la hoja: **convergente + divergente** (Recu 1/11/25). Y la receta: **la imagen de una es el objeto de la siguiente**; "paralelos" ⇒ foco.',
    ['$s_2=s_1\'-D$', 'Divergente: $f\'<0$', 'Salen paralelos ⇒ objeto de la 2ª en su foco'],
    ['Se conoce la imagen final y se busca la **lente 2**', 'Hay que pasar de $f\'$ a $R$ con el **fabricante**'],
    [['El molde es el ejercicio catorce de la hoja: convergente más divergente. Y de la receta, encadenar lentes y la condición de rayos paralelos.'],
     ['Se repite: la imagen de una lente es el objeto de la siguiente, y que salgan paralelos quiere decir objeto en el foco.'],
     ['Cambia que se conoce la imagen final y la incógnita es la segunda lente, y que hay que pasar de la focal al radio con la ecuación del fabricante.']]),

  K.S('a) Imágenes', 'De la lente 1 a la imagen final', `<div style="display:flex;flex-direction:column;gap:16px;align-items:center">${A.svg('g7-a', A.ticks([0, 60, 75, 78, 90]) + A.lens(60, 'conv', "f′₁ = 12") + A.lens(90, 'div', 'L2') + A.arrow(0, 40, 'obj', { label: 'objeto' }) +
      A.ray('g7-r1', r1) + A.ray('g7-r2', r2, 'b') + A.ray('g7-r1e', r1e, 'ext') + A.ray('g7-r2e', r2e, 'b ext') +
      A.arrow(75, -10, 'ghost', { pend: true, id: 'g7-i1', label: 'imagen 1', lx: A.X(75) - 6, ly: A.Y(-10) + 34, anchor: 'end' }) + A.arrow(78, -8, 'fin', { pend: true, id: 'g7-i2', label: 'final: 78', lx: A.X(78) + 10, ly: A.Y(-8) + 34, anchor: 'start' }), 'width:1500px')}
      <div class="grid g2" style="width:100%">${eqs([
        { t: "\\frac1{s_1'}=\\frac1{12}-\\frac1{60}=\\frac4{60}\\ \\Rightarrow\\ s_1'=15", s: 0 },
        { t: "s_2=15-30=-15\\qquad s_2'=78-90=-12", s: 1 },
      ])}${eqs([{ t: "\\frac1{f'_2}=\\frac1{-12}-\\frac1{-15}=-\\frac1{60}", s: 2 }, { t: "f'_2=-60\\ \\text{cm}", s: 2, cls: 'ok' }])}</div></div>`, [
    ['Ítem a. La lente uno: s uno es menos sesenta. Uno sobre s uno prima es un doceavo menos un sesentavo: cuatro sesentavos. La imagen uno está a quince centímetros, en x igual a setenta y cinco: real.', `draw('#g7-r1',{dur:2200}); draw('#g7-r2',{delay:300,dur:2200}); show('#g7-i1',{delay:1200})`],
    ['Esa imagen es el objeto de la lente dos: quince menos treinta, menos quince. Objeto real. Y la imagen final, en setenta y ocho, medida desde la lente dos: menos doce. Virtual: el observador la ve a través de la lente.', `show('#g7-r1e, #g7-r2e',{from:'fade'}); show('#g7-i2',{delay:700,from:'fade'})`],
    ['Con la ecuación de la lente, uno sobre f prima dos es menos un doceavo más un quinceavo: menos un sesentavo. La focal es menos sesenta: divergente, como tenía que ser. [A] ¿Por qué s dos prima negativo? [P] Porque la imagen queda a la izquierda de la lente dos, del lado de donde viene la luz: es virtual.'],
  ]),

  K.S('a) Radio', 'Fabricante: ¿importa hacia dónde mira la cara curva?', `<div style="display:grid;grid-template-columns:1fr 480px;gap:30px;align-items:center">${eqs([
      { t: "\\frac1{f'}=(n-1)\\left(\\frac1{R_1}-\\frac1{R_2}\\right)", s: 0 },
      { t: '\\text{curva hacia L1: }-\\frac1{60}=0{,}5\\cdot\\frac1R\\ \\Rightarrow\\ R=-30', s: 1 },
      { t: '\\text{curva hacia el ojo: }-\\frac1{60}=0{,}5\\left(0-\\frac1R\\right)\\ \\Rightarrow\\ R=+30', s: 2 },
    ])}<div class="row" style="justify-content:center;gap:20px">${perfil('g7-p1', 1)}${perfil('g7-p2', -1)}</div></div>
    ${res('$|R|=30$ cm: **indistinto** (lente delgada)', { s: 3, style: 'margin-top:20px' })}`, [
    ['Para pasar de la focal al radio, la ecuación del fabricante: uno sobre f prima es n menos uno, por uno sobre R uno menos uno sobre R dos. Una cara plana tiene radio infinito: uno sobre R vale cero.'],
    ['Si la cara curva mira hacia la lente uno, es R uno: menos un sesentavo igual a cero coma cinco sobre R. R es menos treinta: centro a la izquierda, la cara hundida.'],
    ['Si mira hacia el observador, es R dos: R es más treinta, centro a la derecha. Otra vez hundida, vista desde ese lado.'],
    ['En los dos casos el módulo es treinta centímetros y la focal es la misma: es indistinto. [A] ¿Plana no es R igual a cero? [P] No: plana es radio infinito. R igual a cero sería una curva infinitamente cerrada.'],
  ]),

  K.S('b) Paralelos', '¿Qué focal tiene que tener la lente 1?', `<div style="display:flex;flex-direction:column;gap:16px;align-items:center">${Bb.svg('g7-b', Bb.ticks([0, 60, 90, 150]) + Bb.lens(60, 'conv', "f′₁ ?") + Bb.lens(90, 'div', 'f′₂ = −60') + Bb.arrow(0, 40, 'obj', { label: 'objeto' }) + Bb.mark(150, 'F₂') +
      Bb.ray('g7-q1', q1) + Bb.ray('g7-q2', q2) + Bb.ray('g7-q3', q3) + ghost.map((g, i) => Bb.ray('g7-g' + i, g, 'ext')).join(''), 'width:1500px')}
      <div class="grid g2" style="width:100%">${eqs([
        { t: "s_2'=\\infty\\ \\Rightarrow\\ s_2=-f'_2=+60\\ \\ (x=150)", s: 0 },
        { t: "s_1'=s_2+D=60+30=90", s: 1 },
      ])}${eqs([{ t: "\\frac1{f'_1}=\\frac1{90}+\\frac1{60}=\\frac1{36}", s: 2 }, { t: "f'_1=36\\ \\text{cm}", s: 2, cls: 'ok' }])}</div></div>`, [
    ['Ítem b. Para que salga paralela de la divergente, su objeto tiene que estar en su foco objeto. Para una divergente ese foco está del otro lado, a sesenta centímetros a la derecha: x igual a ciento cincuenta. Es un objeto virtual: la luz llega convergiendo hacia ese punto.', `draw('#g7-q1, #g7-q2, #g7-q3',{dur:2400,stagger:300}); show('#g7-g0, #g7-g1, #g7-g2',{delay:1800})`],
    ['Entonces la lente uno tiene que formar su imagen en ciento cincuenta: noventa centímetros a su derecha.'],
    ['Con el objeto en cero, uno sobre f prima uno es un noventavo más un sesentavo: un treinta y seisavo. La focal tiene que ser treinta y seis centímetros. [A] ¿Los rayos salen paralelos al eje? [P] Paralelos entre sí. Como el objeto está fuera del eje, salen inclinados, todos con la misma inclinación.'],
  ]),

  K.trampas([
    '**Objeto real a la izquierda:** $s_1=-60$, no $+60$.',
    "**$s_2'$ se mide desde la lente 2:** $78-90=-12$.",
    '**Cara plana: $R=\\infty$**, no $R=0$.',
    '**Foco de la divergente para salir paralelos:** del otro lado, $s_2=+60$ (objeto virtual).',
    '**$(n-1)=0{,}5$** en el fabricante; en b) solo cambia $f\'_1$.',
  ], [
    ['Las trampas. Primera: el objeto real va con signo menos.'],
    ['Segunda: cada distancia se mide desde su lente.'],
    ['Tercera: una cara plana tiene radio infinito.'],
    ['Cuarta: el foco objeto de una divergente está del otro lado.'],
    ['Y quinta: en el fabricante va n menos uno, y en el b solo cambia la primera lente.'],
  ]),

  K.receta([
    "**1.** Lente 1 ⇒ $s_1'$; $s_2=s_1'-D$.",
    "**2.** Imagen final ⇒ $s_2'$ ⇒ $f'_2$.",
    '**3.** Fabricante con cara plana ($1/R=0$) ⇒ $|R|$.',
    "**4.** Paralelos: $s_2=-f'_2$ ⇒ $s_1'$ ⇒ $f'_1$.",
  ], ["$s_1'=15$; $s_2=-15$; $s_2'=-12$; $f'_2=-60$ cm", 'a) $|R|=30$ cm, indistinto; $A=-0{,}2$', "b) $f'_1=36$ cm"], [
    ['La receta. Uno: la lente uno y el objeto de la dos.'],
    ['Dos: con la imagen final, la focal de la dos.'],
    ['Tres: el radio con el fabricante.'],
    ['Cuatro: para salir paralelos, el objeto de la dos en su foco, y de ahí la focal de la uno.'],
    ['Resultados: treinta centímetros de radio, indistinto, y treinta y seis centímetros de focal.'],
  ]),
];
