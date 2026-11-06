// Geo 9 · recuperatorio 7/6/2025, ej. 4: telescopio L = 5 m; biconvexa simétrica f' = 8 m, n = 1,5; espejo R; estrellas; imagen real a |R|/4 del espejo.
// Resultados verificados (soluciones/Geo9.py): r = 8 m; s1' = 8 m ⇒ s_e = +3 m (objeto virtual); −4/|R| + 1/3 = 2/R ⇒ cóncavo R = −6 m (s' = −1,5)
// o convexo R = +18 m (s' = −4,5); b) salen paralelos: f'' = 5 + R/2 ⇒ cóncavo 2 m ⇒ n' = 3; convexo 14 m ⇒ n' = 9/7 ≈ 1,29.
const { md, ul, card, callout, eqs, res, table } = require('../../lib');
const { seccion } = require('../common');
const { kit, bench, OB_CSS } = require('../fx');

const SEC = 'Geo 9 · Telescopio con lente y espejo';
const B = 'b-geo';
const K = kit(SEC, B);
const b = bench({ x0: -2.5, x1: 9, H: 440, ax: 220 });
const ida = [-150, -75, 75, 150].map((y, i) => `<path id="g9-r${i}" class="ob-ray pending" d="M${b.X(-2.5)},${220 + y} L${b.X(0)},${220 + y} L${b.X(5)},${(220 + y * 3 / 8).toFixed(1)}"/><path id="g9-e${i}" class="ob-ray ext pending" d="M${b.X(5)},${(220 + y * 3 / 8).toFixed(1)} L${b.X(8)},220"/>`).join('');
const regla = `<svg class="ob-svg" viewBox="0 0 1500 220" style="width:1460px">
  <line x1="80" y1="110" x2="1440" y2="110" class="ob-ax"/>
  ${[[0, 'lente'], [5, 'espejo'], [8, 'F de la lente']].map(([x, t]) => `<line x1="${80 + x * 150}" y1="90" x2="${80 + x * 150}" y2="130" style="stroke:var(--ink);stroke-width:4"/><text x="${80 + x * 150}" y="78" text-anchor="middle" class="ob-t">${t} (${x} m)</text>`).join('')}
  <g id="g9-c" class="pending"><circle cx="${80 + 3.5 * 150}" cy="110" r="13" style="fill:var(--accent2)"/><text x="${80 + 3.5 * 150}" y="166" text-anchor="middle" style="fill:var(--accent2);font-size:24px;font-weight:700">cóncavo: imagen a 1,5 m del espejo</text></g>
  <g id="g9-v" class="pending"><circle cx="${80 + 0.5 * 150}" cy="110" r="13" style="fill:var(--warn)"/><text x="${80 + 0.5 * 150}" y="200" text-anchor="start" style="fill:var(--warn);font-size:24px;font-weight:700">convexo: a 4,5 m del espejo</text></g></svg>`;

module.exports = [
  seccion('Geo 9', 'Telescopio con lente y espejo', 'Recuperatorio del 7/6/2025 · ejercicio 4',
    'Ejercicio de óptica geométrica número nueve: recuperatorio del siete de junio de dos mil veinticinco, ejercicio cuatro. Un telescopio con una lente y un espejo: la luz de las estrellas forma una imagen real dentro del tubo, y hay que decidir qué espejo se usa.'),

  Object.assign(K.enunciado('Geo9.jpg', ['@1 largo lente–espejo: $L=5$ m', '@1 biconvexa simétrica: $f\'=8$ m, $n=1{,}5$', '@2 estrellas (en el infinito)', '@2 imagen **real** a $d=|R|/4$ del espejo', '@3 b) otra lente, mismas caras, índice $n\'$: salen paralelos'], [
    ['Este es el enunciado. Vamos con los datos.'],
    ['Un telescopio de cinco metros: en un extremo, una lente biconvexa de focal ocho metros y caras iguales, de índice uno coma cinco; en el otro, un espejo de radio R.'],
    ['La luz de las estrellas, que llega paralela, pasa por la lente, se refleja en el espejo y forma una imagen real a un cuarto del radio del espejo.'],
    ['Piden R y si el espejo es cóncavo o convexo. Y después, qué índice debería tener una lente con las mismas caras para que los haces salgan paralelos del espejo.'],
  ], { maxH: 430 }), { css: OB_CSS }),

  K.molde('Ejercicio 11 de la hoja: **lente + espejo, haces salen paralelos** (1C 2026), y su nota del 1C 2025.',
    ['$s_e=s_1\'-L$', 'Espejo: $\\frac1{s\'}+\\frac1s=\\frac2R$; probar cóncavo y convexo', 'Salen paralelos ⇒ objeto en el foco del espejo'],
    ['El objeto del espejo es **virtual** ($s_e>0$)', 'Imagen **real** del espejo: $s\'<0$', 'b) cambia el índice, no las caras'],
    [['El molde es el ejercicio once de la hoja: lente más espejo con haces que salen paralelos.'],
     ['Se repite encadenar lente y espejo, probar los dos tipos de espejo, y la condición de paralelos.'],
     ['Cambia que el objeto del espejo es virtual, y que en el b se cambia el índice de la lente pero no sus caras.']]),

  K.S('a) Lente', 'La lente manda la luz detrás del espejo', `<div style="display:flex;flex-direction:column;gap:20px;align-items:center">${b.svg('g9-b', b.ticks([0, 5, 8]) + b.lens(0, 'conv', "f′ = 8 m") + b.mirror(5, 'left', 'plane', 'espejo') + b.mark(8, 'F') + ida, 'width:1500px')}
      <div class="grid g2" style="width:100%">${eqs([
        { t: '\\frac18=0{,}5\\left(\\frac1r+\\frac1r\\right)\\ \\Rightarrow\\ r=8\\ \\text{m}', s: 0 },
        { t: "s_1'=f'=8\\ \\text{m}", s: 1 },
      ])}${eqs([{ t: "s_e=s_1'-L=8-5=+3\\ \\text{m}", s: 2, cls: 'hl' }, { t: '\\text{objeto virtual}', s: 2 }])}</div></div>`, [
    ['Primero la lente. Con el fabricante y las dos caras iguales, un octavo es cero coma cinco por dos sobre r: r vale ocho metros. Lo vamos a necesitar en el b.'],
    ['Las estrellas están en el infinito: la lente forma su imagen en el foco, a ocho metros.', `S.querySelectorAll('[id^=g9-r]').forEach((e,i)=>draw(e,{delay:i*200,dur:1800})); show('[id^=g9-e]',{delay:1800})`],
    ['Pero el espejo está a cinco: la luz llega convergiendo hacia un punto tres metros detrás del espejo. Para el espejo es un objeto virtual: s e igual a más tres metros. [A] ¿Un espejo puede tener un objeto detrás? [P] Sí, si la luz le llega convergiendo: el objeto es el punto hacia donde iba.'],
  ]),

  K.S('a) Espejo', 'Probar cóncavo y convexo', `<div style="display:flex;flex-direction:column;gap:20px">${regla}
      <div class="grid g2">${eqs([
        { t: "s'=-\\frac{|R|}{4}\\ (\\text{real}):\\ -\\frac4{|R|}+\\frac13=\\frac2R", s: 0 },
        { t: '\\text{cóncavo }(R=-|R|):\\ \\frac13=\\frac2{|R|}\\Rightarrow R=-6\\ \\text{m}', s: 1, cls: 'ok' },
      ])}${eqs([
        { t: '\\text{convexo }(R=+|R|):\\ \\frac13=\\frac6{|R|}\\Rightarrow R=+18\\ \\text{m}', s: 2, cls: 'ok' },
        { t: "s'=-4{,}5\\ \\text{m}:\\ \\text{real, dentro del tubo}", s: 2 },
      ])}</div></div>`, [
    ['Imagen real del espejo quiere decir s prima negativo: menos un cuarto del radio. Reemplazando: menos cuatro sobre el módulo de R, más un tercio, igual a dos sobre R. No sabemos el signo de R: probamos los dos.'],
    ['Cóncavo, R negativo: queda un tercio igual a dos sobre el módulo, R igual a menos seis metros. La imagen está a uno coma cinco metros delante del espejo.', `show('#g9-c',{from:'pop'})`],
    ['Convexo, R positivo: un tercio igual a seis sobre el módulo, R igual a más dieciocho. La imagen está a cuatro coma cinco metros delante del espejo: también real, dentro del tubo. [A] ¿Un convexo da imagen real? [P] Con un objeto virtual entre el espejo y su foco, sí. Lo de siempre virtual vale para objetos reales.', `show('#g9-v',{from:'pop'})`],
  ]),

  K.S('b) Salen paralelos', 'El índice de la nueva lente', `<div class="grid g2" style="align-items:center">${eqs([
      { t: "s_e=\\frac R2\\ \\Rightarrow\\ f''=5+\\frac R2", s: 0 },
      { t: "\\frac1{f''}=(n'-1)\\,\\frac28\\ \\Rightarrow\\ n'=1+\\frac4{f''}", s: 1 },
    ])}${table([
      ['espejo', "$f''$", "$n'$"],
      { cells: ['cóncavo $R=-6$', '$5-3=2$ m', '**3**'], s: 2 },
      { cells: ['convexo $R=+18$', '$5+9=14$ m', '**9/7 ≈ 1,29**'], s: 2 },
    ], { style: 'font-size:1.05em;width:100%' })}</div>`, [
    ['Ítem b. Para que la luz salga paralela del espejo, su objeto tiene que estar en su foco: s e igual a R medios. Entonces la nueva lente tiene que formar su imagen a cinco más R medios de ella.'],
    ['Las caras son las mismas, r igual a ocho: uno sobre la nueva focal es n prima menos uno, por dos octavos. Despejando, n prima es uno más cuatro sobre la focal.'],
    ['Con el cóncavo, la focal es dos metros y el índice, tres. Con el convexo, catorce metros y nueve séptimos, uno coma dos nueve. [A] ¿Se cambia la focal o las caras? [P] Las caras quedan iguales; cambia el índice, y con él la focal.'],
  ]),

  K.S('¿Cuál?', 'Dos soluciones válidas', `<div class="grid g2" style="align-items:center">${ul([
      '@0 Las dos dan imagen **real** dentro del tubo: el enunciado admite ambas',
      '@1 $n\'=3$ no existe en una lente común (vidrio 1,5–1,9; diamante 2,42)',
      '@1 La cátedra usó este telescopio con espejo **convexo** en dos finales',
    ])}${callout('En el examen: **presentar las dos**. Si hay que elegir: convexo, $R=+18$ m, $n\'\\approx1{,}29$.', { s: 2, cls: 'ok' })}</div>`, [
    ['¿Cuál es la respuesta? Las dos cumplen el enunciado: en los dos casos la imagen es real y cae dentro del tubo.'],
    ['Si hubiera que elegir, el convexo parece más probable: un índice tres no existe en una lente común, y la cátedra tomó este mismo telescopio con espejo convexo en dos finales.'],
    ['Lo seguro en el examen es mostrar los dos casos, sin descartar ninguno.'],
  ]),

  K.trampas([
    '**$s_e=+3$:** el foco de la lente está **detrás** del espejo ⇒ objeto virtual.',
    "**Imagen real del espejo: $s'<0$** con esta convención.",
    '**El convexo no se descarta:** con objeto virtual puede dar imagen real.',
    '**Biconvexa: $R_2=-r$**, así que $\\frac1r-\\frac1{-r}=\\frac2r$.',
    '**En b) se conservan las caras**, no la focal.',
  ], [
    ['Las trampas. Primera: el objeto del espejo es virtual, positivo.'],
    ['Segunda: imagen real del espejo es s prima negativo.'],
    ['Tercera: no descartar el convexo.'],
    ['Cuarta: los radios de la biconvexa tienen signos opuestos.'],
    ['Y quinta: en el b se conservan las caras.'],
  ]),

  K.receta([
    "**1.** Fabricante ⇒ $r$; estrellas ⇒ $s_1'=f'$.",
    "**2.** $s_e=s_1'-L$ (virtual si es $>0$).",
    "**3.** $s'=-|R|/4$; probar los dos signos de $R$.",
    "**4.** Paralelos: $s_e=R/2$ ⇒ $f''$ ⇒ $n'$.",
  ], ['$r=8$ m; $s_e=+3$ m', 'a) cóncavo $R=-6$ m o convexo $R=+18$ m', "b) $n'=3$ (cóncavo) o $9/7\\approx1{,}29$ (convexo)"], [
    ['La receta. Uno: el radio de la lente y su imagen de las estrellas.'],
    ['Dos: el objeto del espejo.'],
    ['Tres: la condición de imagen real, probando los dos signos.'],
    ['Cuatro: para salir paralelos, el foco del espejo, y de ahí el índice.'],
    ['Resultados: menos seis o más dieciocho metros, y un índice de tres o de uno coma dos nueve.'],
  ]),
];
