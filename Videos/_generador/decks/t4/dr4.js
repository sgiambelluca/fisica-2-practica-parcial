// DR 4 · 2P 2C 2024, ej. 2: d = 60 µm, a = 10 µm, λ0 = 600 nm, D = 20 cm; vidrio 1,5 y acrílico 1,4 de espesor e; O ocupado por el 2º máximo.
// Resultados verificados (soluciones/DR4.py): 0,1e = 2λ0 ⇒ e = 12 µm; vidrio → n3 de espesor e/2 con nuevo corrimiento de 8 franjas:
// (e/2)(2 − n3) = 8λ0 ⇒ n3 = 1,2 (ΔCO'(O) = −3,6 µm = −6λ0); b) I(O) = 4 (γ = −6π, β = 0);
// c) Δy = 2 mm, α = 5·10⁻⁴ rad > θmin = 3,66·10⁻⁴ rad ⇒ sí se resuelven (hasta ~5,46 m).
const { md, ul, card, callout, eqs, res, plot } = require('../../lib');
const { seccion } = require('../common');
const { kit, dslit, DS_CSS, barras, growX } = require('../fx');

const SEC = 'DR 4 · Se cambia el vidrio';
const B = 'b-fis';
const K = kit(SEC, B);
const sinc2 = x => Math.abs(x) < 1e-9 ? 1 : (Math.sin(Math.PI * x) / (Math.PI * x)) ** 2;
// tira de franjas: el orden que cae en O pasa de +2 a −6 (corrimiento de 8 franjas)
const tira = (() => { let h = `<svg class="ds-svg" viewBox="0 0 1600 200" style="width:1560px"><rect x="20" y="40" width="1560" height="110" rx="10" style="fill:#0a111c;stroke:#4a6286;stroke-width:3"/><defs><clipPath id="d4-clip"><rect x="22" y="40" width="1556" height="150"/></clipPath></defs><g clip-path="url(#d4-clip)"><g id="d4-fr" style="transform:translate(0px,0px)">`;
  for (let m = -14; m <= 14; m++) { const x = 800 + (m - 2) * 100; h += `<rect x="${x - 18}" y="48" width="36" height="94" rx="10" style="fill:${m === 0 ? 'var(--warn)' : 'rgba(255,123,123,.75)'}"/><text x="${x}" y="172" text-anchor="middle" style="fill:${m === 0 ? 'var(--warn)' : 'var(--muted)'};font-size:20px;font-weight:700">${m}</text>`; }
  return h + `</g></g><line x1="800" y1="22" x2="800" y2="160" style="stroke:var(--accent);stroke-width:4"/><text x="800" y="16" text-anchor="middle" style="fill:var(--accent);font-size:24px;font-weight:800">O</text></svg>`; })();

module.exports = [
  seccion('DR 4', 'Se cambia el vidrio', 'Segundo parcial 2C 2024 · ejercicio 2',
    'Ejercicio de doble rendija número cuatro: segundo parcial del segundo cuatrimestre de dos mil veinticuatro, ejercicio dos. Vidrio y acrílico corren el patrón; después se cambia el vidrio por otra lámina, y al final un observador mira las franjas desde lejos.'),

  Object.assign(K.enunciado('DR4.jpg', ['@1 $d=60\\ \\mu$m, $a=d/6=10\\ \\mu$m', '@1 $\\lambda_0=600$ nm, $D=20$ cm', '@2 vidrio $n_1=1{,}5$ y acrílico $n_2=1{,}4$, espesor $e$', '@2 en O: el **2º máximo**', '@3 vidrio → $n_3<n_1$, espesor $e/2$: **nuevo** corrimiento de 8 franjas', '@4 observador a 4 m, pupila de 2 mm'], [
    ['Este es el enunciado. Vamos con los datos.'],
    ['Dos rendijas separadas sesenta micrones, de diez micrones de ancho, con luz de seiscientos nanómetros, y la pantalla a veinte centímetros.'],
    ['Detrás de una rendija hay vidrio de índice uno coma cinco, y detrás de la otra, acrílico de uno coma cuatro, los dos de espesor e. Con eso, en el centro O queda el segundo máximo.'],
    ['Después se cambia el vidrio por una lámina de índice n tres, menor, y de la mitad del espesor, y el patrón se corre ocho franjas más. Piden n tres y un esquema, y la intensidad en O.'],
    ['Y el ítem c: un observador a cuatro metros, con pupila de dos milímetros, ¿ve separados dos máximos consecutivos?'],
  ], { maxH: 420 }), { css: DS_CSS }),

  K.molde('Ejercicio 16 de la hoja: **vidrio + acrílico** (corre 4 franjas). Los 17 y 18: **un nuevo corrimiento** al cambiar una lámina. Y el 23: **Rayleigh**.',
    ['Cada lámina suma $e(n_l-1)$', 'Corrimiento de $N$ franjas ⇔ $N\\lambda_0$', 'Nuevo corrimiento: desde la situación anterior', 'Rayleigh: $1{,}22\\lambda/D_p$'],
    ['Incidencia normal: en O, $\\beta=0$', 'La lámina nueva tiene **otro espesor**: el $-1$ no se cancela', 'c) junta interfranja con Rayleigh'],
    [['El molde es el ejercicio dieciséis de la hoja, con vidrio y acrílico. Para el cambio de lámina, el diecisiete y el dieciocho. Y para el ojo, Rayleigh del veintitrés.'],
     ['Se repite: cada lámina suma e por n menos uno, un corrimiento de N franjas es N longitudes de onda, y el nuevo corrimiento se cuenta desde la situación anterior.'],
     ['Cambia que la incidencia es normal, que la lámina nueva tiene otro espesor, y que el ítem c combina las franjas con el ojo.']]),

  K.S('a) Espesor', 'O ocupado por el segundo máximo', `<div style="display:grid;grid-template-columns:720px 1fr;gap:30px;align-items:center">
      ${dslit({ id: 'd4-a', lams: [{ slit: 1, txt: 'vidrio 1,5 · e' }, { slit: 2, txt: 'acrílico 1,4 · e', cls: 'b' }], style: 'width:700px' })}
      <div>${barras([{ lbl: 'vidrio', segs: [{ w: 400, color: '#4cc2ff', txt: 'e(1,5−1) = 6 µm', id: 'd4-b1', pend: true }] }, { lbl: 'acrílico', segs: [{ w: 320, color: '#7ee0a1', txt: '4,8 µm', id: 'd4-b2', pend: true }] }], { w: 640 })}
      ${eqs([
        { t: '\\Delta CO(O)=e(n_1-1)-e(n_2-1)=0{,}1\\,e', s: 1 },
        { t: '0{,}1\\,e=2\\lambda_0=1{,}2\\ \\mu\\text{m}', s: 2 },
      ])}${res('$e=12\\ \\mu$m', { s: 2, style: 'margin-top:16px' })}</div></div>`, [
    ['Ítem a. Con incidencia normal, en el centro O la diferencia de camino es solo lo que agregan las láminas: cada una suma e por n menos uno.', growX('#d4-b1, #d4-b2', { dur: 1300, stagger: 500 })],
    ['La diferencia es e por uno coma cinco menos uno coma cuatro: cero coma uno e. Con espesores iguales, el menos uno del aire se cancela.'],
    ['Que en O esté el segundo máximo quiere decir que esa diferencia es dos longitudes de onda: uno coma dos micrones. Entonces e es doce micrones. [A] ¿Segundo máximo no podría ser el uno, contando el central? [P] Probalo: da un índice menor que uno, imposible. Es el orden dos.'],
  ]),

  K.S('a) La lámina nueva', 'n₃ con un nuevo corrimiento de 8 franjas', `<div style="display:flex;flex-direction:column;gap:20px">${tira}
      <div class="grid g2" style="align-items:center">${eqs([
        { t: "\\Delta CO'-\\Delta CO=\\frac e2(n_3-1)-e(n_1-1)=\\frac e2\\,(n_3-2)", s: 1 },
        { t: '\\frac e2\\,(2-n_3)=8\\lambda_0\\ \\Rightarrow\\ 2-n_3=\\frac{16\\cdot0{,}6}{12}=0{,}8', s: 2 },
      ])}<div>${res('$n_3=1{,}2$', { s: 2 })}${callout("Chequeo: $\\Delta CO'(O)=6\\cdot0{,}2-12\\cdot0{,}4=-3{,}6\\ \\mu$m $=-6\\lambda_0$: de $+2$ a $-6$, 8 franjas ✓", { s: 3, cls: 'ok', style: 'margin-top:18px;font-size:.85em' })}</div></div></div>`, [
    ['Ahora cambiamos el vidrio. La tira muestra las franjas: en O está el orden más dos, y el cero, en amarillo, dos franjas al costado.'],
    ['El cambio de camino es lo que agrega la lámina nueva menos lo que agregaba el vidrio: e medios por n tres menos uno, menos e por cero coma cinco. Queda e medios por n tres menos dos. Como n tres es menor, es negativo: el patrón vuelve para el otro lado.'],
    ['Ocho franjas son ocho lambda cero: e medios por dos menos n tres igual a cuatro coma ocho micrones. Dos menos n tres es cero coma ocho, y n tres, uno coma dos.', `along('#d4-fr', [[0,0],[800,0]], {dur:talk(600), easing:'ease-in-out'})`],
    ['Chequeo: la nueva diferencia en O es menos tres coma seis micrones, menos seis longitudes de onda. En O pasó de estar el más dos a estar el menos seis: ocho franjas. [A] ¿Y por qué no se cancela el menos uno esta vez? [P] Porque la lámina nueva tiene la mitad del espesor.'],
  ]),

  K.S('b) Intensidad en O', 'I(O) en la situación final', `<div class="grid g2" style="align-items:center">${eqs([
      { t: "\\gamma=\\frac{\\pi\\,\\Delta CO'(O)}{\\lambda_0}=\\frac{\\pi(-3{,}6)}{0{,}6}=-6\\pi\\ \\Rightarrow\\ \\cos^2\\gamma=1", s: 0 },
      { t: '\\beta(O)=\\frac{\\pi a}{\\lambda_0}\\sen0=0', s: 1 },
      { t: 'I(O)=4I_0=4', s: 2, cls: 'ok' },
    ])}${callout('"$d/a=6$ ⇒ falta el orden 6 ⇒ $I=0$": **no**. La envolvente no se corre con las láminas: en O, $\\beta=0$.', { s: 3, cls: 'bad' })}</div>`, [
    ['Ítem b. Gama en O es pi por menos tres coma seis sobre cero coma seis: menos seis pi. Coseno cuadrado, uno: en O hay un máximo.'],
    ['Beta en O es cero: la incidencia es normal y las láminas no entran en beta.'],
    ['Entonces la intensidad en O es cuatro I cero: cuatro.'],
    ['Cuidado con una trampa. d sobre a es seis, y en O está el orden menos seis. ¿Falta? No: los órdenes faltan cuando caen en un cero de la envolvente, y la envolvente sigue centrada en O. El que cae en el cero es el que esté en seno de theta igual a lambda sobre a, sea cual sea su número. [A] ¿Entonces el número del orden no importa? [P] Con láminas, no: importa dónde cae.'],
  ]),

  K.S('c) Rayleigh', '¿Ve separados dos máximos consecutivos?', `<div style="display:grid;grid-template-columns:680px 1fr;gap:30px;align-items:center">${eqs([
      { t: '\\Delta y=\\frac{\\lambda_0D}{d}=\\frac{0{,}6\\cdot10^{-6}\\cdot0{,}2}{60\\cdot10^{-6}}=2\\ \\text{mm}', s: 0 },
      { t: '\\alpha=\\frac{\\Delta y}{L}=\\frac{2\\cdot10^{-3}}{4}=5\\cdot10^{-4}\\ \\text{rad}', s: 1 },
      { t: '\\theta_{min}=1{,}22\\,\\frac{0{,}6\\cdot10^{-6}}{2\\cdot10^{-3}}=3{,}66\\cdot10^{-4}\\ \\text{rad}', s: 2 },
      { t: '\\alpha>\\theta_{min}\\ \\Rightarrow\\ \\text{sí}', s: 3, cls: 'ok' },
    ])}
      ${plot({ w: 960, h: 480, x: [-2, 2], y: [0, 1.5], ticksX: [-1, 0, 1], ticksY: [0, 1], xl: 'ángulo / θmin', yl: 'I en la retina', id: 'd4-r', s: 3,
        curves: [{ f: x => sinc2(x - 0.683) + sinc2(x + 0.683), n: 600, cls: 'c2', id: 'd4-rc' }],
        extra: (px, py) => `<text class="lbl c2" x="${px(-1.9)}" y="${py(1.4)}">α = 1,37 θmin: dos picos</text>` })}</div>`, [
    ['Ítem c. Primero, la distancia entre dos máximos consecutivos en la pantalla: lambda D sobre d. Con D igual a veinte centímetros, dos milímetros. Las láminas no la cambian.'],
    ['Visto desde cuatro metros, ese par de franjas forma un ángulo de dos milímetros sobre cuatro metros: cinco por diez a la menos cuatro radianes.'],
    ['El ojo resuelve desde uno coma veintidós lambda sobre el diámetro de la pupila: tres coma seis seis por diez a la menos cuatro.'],
    ['El ángulo es mayor que el mínimo: sí, los ve separados. Lo seguiría haciendo hasta unos cinco metros y medio. [A] ¿Qué distancia uso en cada cuenta? [P] Para la interfranja, rendijas a pantalla; para el ojo, observador a pantalla.', `sweep('#d4-r #d4-rc',{dur:2000})`],
  ]),

  K.trampas([
    '**$e(n-1)$, no $e\\,n$:** con espesores distintos, el $-1$ no se cancela.',
    '**El nuevo corrimiento** se mide desde la situación anterior (no desde el patrón sin láminas).',
    '**"Segundo máximo" = $m=2$** (con $m=1$ sale $n_3<1$).',
    '**"Falta el orden 6" no aplica:** la envolvente queda en O ⇒ $\\beta=0$, $I=4$.',
    '**c) dos distancias:** 0,20 m para $\\Delta y$; 4 m para el ángulo del ojo.',
  ], [
    ['Las trampas. Primera: cada lámina suma e por n menos uno. Con espesores distintos, el menos uno importa.'],
    ['Segunda: el nuevo corrimiento se cuenta desde la situación anterior.'],
    ['Tercera: el segundo máximo es el orden dos.'],
    ['Cuarta: que d sobre a sea seis no hace desaparecer el orden menos seis en O.'],
    ['Y quinta: en el c hay dos distancias distintas.'],
  ]),

  K.receta([
    '**1.** $\\Delta CO(O)=\\sum\\pm e(n_l-1)=m\\lambda_0$ ⇒ $e$.',
    "**2.** Cambio de lámina: $\\Delta CO'-\\Delta CO=\\pm N\\lambda_0$ ⇒ $n_3$.",
    '**3.** En O: $\\gamma$ con $\\Delta CO\'$, $\\beta=0$.',
    '**4.** $\\Delta y=\\lambda_0D/d$; $\\Delta y/L$ contra $1{,}22\\lambda/D_p$.',
  ], ['a) $e=12\\ \\mu$m; $n_3=1{,}2$', 'b) $I(O)=4$ ($\\gamma=-6\\pi$, $\\beta=0$)', 'c) $\\Delta y=2$ mm; $\\alpha=5\\cdot10^{-4}>3{,}66\\cdot10^{-4}$ rad: **sí**'], [
    ['La receta. Uno: con el máximo que cae en O, el espesor.'],
    ['Dos: con el nuevo corrimiento, el índice de la lámina nueva.'],
    ['Tres: en O, gama con la nueva diferencia de camino, y beta cero.'],
    ['Cuatro: la interfranja y Rayleigh.'],
    ['Resultados: e igual a doce micrones, n tres igual a uno coma dos, intensidad cuatro, y el observador sí resuelve las franjas.'],
  ]),
];
