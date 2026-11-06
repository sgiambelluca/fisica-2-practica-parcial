// DR 1 · intermedio 18/10/2025, ej. 4: a = 6 µm, d = 36 µm, λ0 = 600 nm, θi = 30°.
// Resultados verificados (soluciones/DR1.py): d sen θi = 18 µm = 30 λ0; 1ra parte e = 36 µm (en la rendija alcanzada primero), I(C) = 0
// (γ = 0, β = −5π); 2da parte (líquido 1,4): lámina 1 aporta 3,6 µm, e' = 48 µm en la otra rendija, I(C) = 0 (β = −5π);
// campana centrada en 30° (aire) y 20,9° (líquido). Lectura literal de I0 "en dirección normal": I(C) = 4 (no es la de la cátedra).
const { md, ul, card, callout, eqs, res, datos, plot } = require('../../lib');
const { seccion } = require('../common');
const { kit, dslit, DS_CSS, barras } = require('../fx');

const SEC = 'DR 1 · Oblicua + láminas + líquido';
const B = 'b-fis';
const K = kit(SEC, B);
const D2R = Math.PI / 180;
const env = (s, n = 1) => { const b = 10 * Math.PI * (n * s - 0.5); return Math.abs(b) < 1e-9 ? 1 : (Math.sin(b) / b) ** 2; };
const I1 = th => { const s = Math.sin(th * D2R); return 4 * Math.cos(Math.PI * 60 * s) ** 2 * env(s); };

// cadena de fasores de una rendija: N flechitas, fase total 2β
function cadena(id, beta, x0, y0, len, N) {
  let x = x0, y = y0, d = `M${x},${y}`;
  for (let k = 0; k < N; k++) { const a = 2 * beta * k / N; x += len * Math.cos(a); y -= len * Math.sin(a); d += ` L${x.toFixed(1)},${y.toFixed(1)}`; }
  return `<path id="${id}" class="dr1-ch pending" d="${d}"/>`;
}

module.exports = [
  seccion('DR 1', 'Oblicua + láminas + líquido', 'Examen intermedio del 18/10/2025 · ejercicio 4',
    'Ejercicio de doble rendija número uno: examen intermedio del dieciocho de octubre de dos mil veinticinco, ejercicio cuatro. El haz llega inclinado, una lámina devuelve el orden cero al centro, y después se agregan otra lámina y un líquido.'),

  Object.assign(K.enunciado('DR1.jpg', ['@1 $a=6\\ \\mu$m', '@1 $d=36\\ \\mu$m', '@1 $\\lambda_0=600$ nm', '@1 $\\theta_i=30°$ (desde el aire)', '@2 lámina $n=1{,}5$, espesor $e$', '@3 lámina $n\'=1{,}1$, espesor $e\'$', '@3 líquido $n_L=1{,}4$ entre placa y pantalla', '@4 $I_0=1$ UA'], [
    ['Este es el enunciado. Vamos sacando los datos.'],
    ['Dos rendijas de seis micrones de ancho, separadas treinta y seis micrones. Luz de seiscientos nanómetros que llega inclinada, a treinta grados.'],
    ['Primera parte: detrás de una rendija se pone una lámina de índice uno coma cinco, de espesor e, para que el orden cero quede en el centro de la pantalla, el punto C.'],
    ['Segunda parte: se agrega otra lámina, de índice uno coma uno, y se llena con un líquido de índice uno coma cuatro el espacio entre la placa y la pantalla. El orden cero tiene que seguir en C.'],
    ['En cada parte piden el espesor, la intensidad en C con I cero igual a uno, y un esquema de dónde va cada lámina.'],
  ]), { css: DS_CSS + `.dr1-ch{fill:none;stroke:var(--accent);stroke-width:4;stroke-linejoin:round} .dr1-ch.ok{stroke:var(--accent2)}` }),

  K.molde('Ejercicio 16 de la hoja: **dos láminas + incidencia oblicua** (Recu 7/6/25). Y el 17: **láminas en gas, luego líquido**.',
    ['Compensar $d\\sen\\theta_i$ con una lámina', 'La lámina va en la rendija a la que el haz llega **primero**', 'En C: $\\gamma=0$ pero $\\beta\\neq0$ ⇒ puede dar $I=0$', 'Con líquido, cada lámina aporta $e(n_l-n_L)$'],
    ['Acá el haz **ya viene** inclinado y la lámina lo corrige', 'El líquido está solo **después** de la placa', 'La incógnita de la 2da parte es el espesor $e\'$'],
    [['El molde es el ejercicio dieciséis de la hoja: láminas e incidencia oblicua. Y para la segunda parte, el diecisiete, con láminas en un gas que después se llena de líquido.'],
     ['Se repite la idea central: una lámina compensa el camino extra que agrega la inclinación, y va en la rendija a la que el haz llega primero. Y en el centro el orden cero puede tener intensidad cero, por la difracción.'],
     ['Cambia el orden: acá el haz ya viene inclinado y la lámina lo corrige. Y el líquido está solo entre la placa y la pantalla, así que la parte de la incidencia sigue en aire.']]),

  K.S('Teoría', 'La diferencia de camino óptico', `<div style="display:grid;grid-template-columns:900px 1fr;gap:30px;align-items:center">
      ${dslit({ id: 'dr1-t', ti: 30, seg: true, lams: [{ slit: 2, txt: 'n = 1,5', pend: true, id: 'dr1-tl' }], style: 'width:880px' })}
      ${eqs([
        { t: '\\Delta CO=n\\,d\\sen\\theta-n_i\\,d\\sen\\theta_i', s: 1 },
        { t: '\\qquad+\\ \\textstyle\\sum e\\,(n_l-n)', s: 2 },
        { t: '\\text{en C: }\\theta=0', s: 3, cls: 'hl' },
        { t: '\\text{orden }0:\\ \\Delta CO=0', s: 3 },
      ])}</div>`, [
    ['Primero, de dónde sale la diferencia de camino. Con el haz inclinado, los frentes de onda tocan antes una rendija que la otra. Acá el haz sube, así que llega primero a la rendija dos.'],
    ['El rayo que va a la rendija uno recorre de más, antes de la placa, d seno de theta i. Y del otro lado, hacia un punto de la pantalla en la dirección theta, uno de los rayos recorre de más d seno de theta.', `draw('#dr1-t-seg',{dur:1400}); show('#dr1-t-segt',{delay:1200})`],
    ['Una lámina reemplaza un tramo e del medio por su material, así que le suma e por n lámina menos n medio al camino de su rayo.', `show('#dr1-tl',{from:'pop'})`],
    ['En el centro C, theta es cero y el término de después de la placa desaparece. El orden cero es donde los dos caminos son iguales. [A] ¿Y por qué sin lámina el orden cero no está en el centro? [P] Porque la inclinación le da ventaja a un rayo. Sin nada que la compense, el orden cero sale en la dirección del haz, a treinta grados.'],
  ]),

  K.S('Teoría', 'Interferencia y difracción: γ y β', `<div style="display:grid;grid-template-columns:700px 1fr;gap:30px;align-items:center">
      ${eqs([
        { t: '\\gamma=\\frac{\\pi}{\\lambda_0}\\,\\Delta CO', s: 0, note: 'usa $d$ y láminas' },
        { t: '\\beta=\\frac{\\pi a}{\\lambda_0}\\,(n\\sen\\theta-n_i\\sen\\theta_i)', s: 1, note: 'usa $a$, sin láminas' },
        { t: 'I=4I_0\\cos^2\\gamma\\left(\\frac{\\sen\\beta}{\\beta}\\right)^2', s: 2, cls: 'hl' },
      ])}
      ${plot({ w: 1000, h: 520, x: [-12, 66], y: [0, 4.5], ticksX: [0, 10, 20, 30, 40, 50, 60], ticksY: [0, 2, 4], xl: 'θ (°)', yl: 'I', id: 'dr1-p', s: 3,
        curves: [{ f: I1, n: 5000, cls: 'c3', id: 'dr1-pi' }, { f: th => 4 * env(Math.sin(th * D2R)), n: 1500, cls: 'c2 dash', id: 'dr1-pe' }],
        extra: (px, py) => `<circle class="dot" cx="${px(0)}" cy="${py(0)}" r="12"/><text class="lbl c3" x="${px(0) + 18}" y="${py(0.5)}">C</text>
          <text class="lbl c2" x="${px(30)}" y="${py(4.25)}" style="text-anchor:middle">campana centrada en 30°</text>` })}</div>`, [
    ['La intensidad tiene dos partes. Gama es la mitad del desfasaje entre las dos rendijas: es la interferencia, usa d, y ahí entran las láminas.'],
    ['Beta es la mitad del desfasaje entre los bordes de una misma rendija: es la difracción, usa a. Y no lleva láminas, porque una lámina tapa toda la rendija y les suma lo mismo a todos sus puntos.'],
    ['La intensidad es cuatro I cero, por coseno cuadrado de gama, por seno de beta sobre beta, al cuadrado.'],
    ['Graficada, las franjas finas de interferencia quedan dentro de una campana de difracción. Fijate que la campana sigue al haz: está centrada en treinta grados, no en el centro de la pantalla. [A] ¿Entonces en C puede no haber luz? [P] Exacto. Hay que calcular beta en C, siempre.', `sweep('#dr1-p #dr1-pi',{dur:2600}); sweep('#dr1-p #dr1-pe',{delay:1800,dur:1800})`],
  ]),

  K.S('1ra parte', 'El espesor de la lámina', `<div style="display:grid;grid-template-columns:760px 1fr;gap:30px;align-items:center">
      ${dslit({ id: 'dr1-a', ti: 30, seg: true, lams: [{ slit: 2, txt: 'e = 36 µm', id: 'dr1-al', s: 2 }], style: 'width:740px' })}
      <div>${barras([{ lbl: 'rayo 1', segs: [{ w: 360, color: '#c49bff', txt: 'd sen θᵢ = 18 µm', id: 'dr1-b1', pend: true }] },
        { lbl: 'rayo 2', segs: [{ w: 360, color: '#4cc2ff', txt: 'lámina: 0,5 e', id: 'dr1-b2', pend: true }] }], { w: 640 })}
      ${eqs([
        { t: '\\Delta CO(C)=-d\\sen\\theta_i+e\\,(n-1)=0', s: 1 },
        { t: '-18\\ \\mu\\text{m}+0{,}5\\,e=0', s: 2 },
      ])}${res('$e=36\\ \\mu$m, en la rendija que el haz alcanza primero', { s: 3, style: 'margin-top:20px' })}</div></div>`, [
    ['Primera parte. El camino extra antes de la placa es d seno de treinta grados: treinta y seis micrones por un medio, dieciocho micrones. Son treinta longitudes de onda.', `draw('#dr1-a-seg',{dur:1200}); show('#dr1-a-segt',{delay:900}); ${require('../fx').growX('#dr1-b1', { delay: 600 })}`],
    ['Para que en C los dos caminos sean iguales, la lámina tiene que agregarle esos dieciocho micrones al rayo dos, el que llegó primero. Planteamos: menos d seno theta i, más e por uno coma cinco menos uno, igual a cero.'],
    ['Queda cero coma cinco e igual a dieciocho micrones.', `${require('../fx').growX('#dr1-b2', { dur: 2500 })}`],
    ['Entonces e vale treinta y seis micrones, en la rendija a la que el haz llega primero. [A] ¿Y si la pongo en la otra? [P] Le sumás camino al rayo que ya iba atrasado: la diferencia pasa a sesenta longitudes de onda y el orden cero se va todavía más lejos.'],
  ]),

  K.S('1ra parte', 'La intensidad en C', `<div style="display:grid;grid-template-columns:1fr 820px;gap:30px;align-items:center">
      <div>${eqs([
        { t: '\\Delta CO(C)=0\\ \\Rightarrow\\ \\gamma=0,\\ \\cos^2\\gamma=1', s: 0 },
        { t: '\\beta=\\frac{\\pi\\cdot6}{0{,}6}\\,(\\sen0-\\sen30°)=-5\\pi', s: 1 },
        { t: 'I(C)=4\\cdot1\\cdot1\\cdot\\left(\\frac{\\sen(-5\\pi)}{-5\\pi}\\right)^2=0', s: 3, cls: 'ok' },
      ])}${callout('C es el orden 0 de interferencia, pero cae en el **5º mínimo de difracción**.', { s: 3, cls: 'warn', style: 'margin-top:24px' })}</div>
      <svg class="ds-svg" viewBox="0 0 820 560" style="width:800px">
        <text x="20" y="40" style="fill:var(--muted);font-size:24px">centro de la campana: β = 0</text>
        ${cadena('dr1-c0', 0, 40, 110, 36, 20).replace('dr1-ch', 'dr1-ch ok')}
        <text x="20" y="250" style="fill:var(--muted);font-size:24px">en C: β = −5π (fase total −10π)</text>
        ${cadena('dr1-c5', -5 * Math.PI, 420, 300, 25, 100)}
        <text id="dr1-c5t" class="pending" x="560" y="420" style="fill:var(--warn);font-size:26px;font-weight:700">5 vueltas ⇒ resultante 0</text>
      </svg></div>`, [
    ['Ahora la intensidad en C. Como es el orden cero, gama vale cero y el coseno cuadrado vale uno.'],
    ['Pero falta la difracción. Beta es pi por seis sobre cero coma seis, por seno de cero menos seno de treinta: diez pi por menos un medio, menos cinco pi.'],
    ['Miremos qué significa con fasores. Partimos la rendija en muchos pedacitos, cada uno con su flechita. En el centro de la campana todas apuntan igual y suman mucho. En C, la fase total a lo ancho de la rendija es menos diez pi: la cadena da cinco vueltas completas y se cierra.', `draw('#dr1-c0',{dur:1500}); draw('#dr1-c5',{delay:1600,dur:talk(2200)}); show('#dr1-c5t',{delay:talk(500)})`],
    ['Seno de menos cinco pi es cero, así que la intensidad en C es cero. C es el orden cero de interferencia, pero cae justo en el quinto mínimo de difracción. [A] ¿Entonces el centro queda oscuro? [P] Sí. Hay franja de interferencia, pero cada rendija no manda luz en esa dirección.'],
  ]),

  K.S('2da parte', 'El líquido cambia lo que aporta la lámina', `<div style="display:grid;grid-template-columns:760px 1fr;gap:30px;align-items:center">
      ${dslit({ id: 'dr1-l', ti: 30, seg: true, liq: 'líquido n = 1,4', liqPend: true, lams: [{ slit: 2, txt: '1,5 · 36 µm' }], style: 'width:740px' })}
      <div>${barras([{ lbl: 'rayo 1', segs: [{ w: 360, color: '#c49bff', txt: '18 µm' }] },
        { lbl: 'rayo 2', segs: [{ w: 72, color: '#4cc2ff', txt: '3,6', id: 'dr1-lb2', pend: true }] }], { w: 640 })}
      ${eqs([
        { t: 'e\\,(n-n_L)=36\\cdot(1{,}5-1{,}4)=3{,}6\\ \\mu\\text{m}', s: 2 },
        { t: '\\Delta CO(C)=-18+3{,}6', s: 3 },
        { t: '\\Delta CO(C)=-14{,}4\\ \\mu\\text{m}=-24\\lambda_0', s: 3, cls: 'hl' },
      ])}</div></div>`, [
    ['Segunda parte. Se llena con líquido el espacio entre la placa y la pantalla.', `show('#dr1-l-liq, #dr1-l-liqt',{from:'fade'})`],
    ['La incidencia no cambia: antes de la placa sigue habiendo aire, así que el rayo uno sigue teniendo dieciocho micrones de más.'],
    ['Lo que cambia es la lámina uno. Ahora está rodeada de líquido, y aporta e por uno coma cinco menos uno coma cuatro: solo tres coma seis micrones.', `${require('../fx').growX('#dr1-lb2', { dur: 1500 })}`],
    ['Con eso, en C quedaría una diferencia de menos catorce coma cuatro micrones: veinticuatro longitudes de onda. El orden cero se iría de C. [A] ¿Por eso hace falta la segunda lámina? [P] Exacto: tiene que compensar esos catorce coma cuatro micrones.'],
  ]),

  K.S('2da parte', 'La segunda lámina: ¿en qué rendija y de qué espesor?', `<div style="display:grid;grid-template-columns:760px 1fr;gap:30px;align-items:center">
      ${dslit({ id: 'dr1-m', ti: 30, seg: true, liq: 'líquido n = 1,4', lams: [{ slit: 2, txt: '1,5 · 36 µm' }, { slit: 1, txt: "1,1 · e′", cls: 'b', id: 'dr1-ml2', s: 2 }], style: 'width:740px' })}
      <div>${barras([{ lbl: 'rayo 1', segs: [{ w: 360, color: '#c49bff', txt: '18 µm' }] }, { lbl: 'lámina 2', off: 360, segs: [{ w: -288, color: '#7ee0a1', txt: '−0,3 e′', id: 'dr1-mb', pend: true }] },
        { lbl: 'rayo 2', segs: [{ w: 72, color: '#4cc2ff', txt: '3,6' }] }], { w: 640 })}
      ${eqs([
        { t: "e'\\,(n'-n_L)=e'\\,(1{,}1-1{,}4)=-0{,}3\\,e'", s: 1 },
        { t: "-18+3{,}6+0{,}3\\,e'=0", s: 3 },
      ])}${res("$e'=48\\ \\mu$m, en la otra rendija", { s: 3, style: 'margin-top:18px' })}</div></div>`, [
    ['La lámina dos tiene índice uno coma uno, menor que el del líquido.'],
    ['Entonces aporta e prima por uno coma uno menos uno coma cuatro: menos cero coma tres e prima. Le resta camino a su rayo.'],
    ['¿Y a quién hay que restarle? Al rayo uno, el que viene atrasado. Así que la lámina dos va en la otra rendija, la que el haz alcanza último.', `${require('../fx').growX('#dr1-mb', { dur: 2200 })}`],
    ['Planteamos: menos dieciocho, más tres coma seis, más cero coma tres e prima, igual a cero. Queda e prima igual a cuarenta y ocho micrones. [A] ¿Y si la pongo en la misma rendija que la primera? [P] Da un espesor negativo: imposible. Esa es la forma de confirmar la ubicación.'],
  ]),

  K.S('2da parte', 'La intensidad en C, otra vez', `<div style="display:grid;grid-template-columns:600px 1fr;gap:30px;align-items:center">
      <div>${eqs([
        { t: '\\gamma=0', s: 0 },
        { t: '\\beta=\\frac{\\pi a}{\\lambda_0}(n_L\\sen0-1\\cdot\\sen30°)=-5\\pi', s: 0 },
        { t: 'I(C)=0', s: 1, cls: 'ok' },
      ])}${callout('$I_0$ "en dirección normal": si se ignora la difracción, saldría $I=4$. La cátedra calcula con $\\beta$ completo: **$I=0$**.', { s: 3, cls: 'warn', style: 'margin-top:24px;font-size:.85em' })}</div>
      ${plot({ w: 1050, h: 500, x: [-10, 60], y: [0, 1.15], ticksX: [0, 10, 20.9, 30, 40, 50], ticksY: [0, 0.5, 1], fmtX: v => String(v).replace('.', ','), xl: 'θ (°)', yl: '(sen β / β)²', id: 'dr1-q', s: 2,
        curves: [{ f: th => env(Math.sin(th * D2R)), n: 1500, cls: 'c5', id: 'dr1-q1' }, { f: th => env(Math.sin(th * D2R), 1.4), n: 1500, cls: 'c2', id: 'dr1-q2' }],
        extra: (px, py) => `<circle class="dot" cx="${px(0)}" cy="${py(0)}" r="12"/><text class="lbl c3" x="${px(0) + 16}" y="${py(0.12)}">C</text>
          <text class="lbl c5" x="${px(31)}" y="${py(1.08)}">aire</text><text class="lbl c2" x="${px(12)}" y="${py(1.08)}">líquido</text>` })}</div>`, [
    ['En C, el orden cero sigue ahí, así que gama vale cero. Y beta: en theta igual a cero, el término de después de la placa desaparece, y el de antes sigue en aire. Da otra vez menos cinco pi.'],
    ['Entonces la intensidad en C vuelve a ser cero.'],
    ['El líquido sí corre la campana: su centro pasa de treinta grados a veinte coma nueve. Pero C sigue cayendo en un cero de difracción.', `sweep('#dr1-q #dr1-q1',{dur:1600}); sweep('#dr1-q #dr1-q2',{delay:1400,dur:1600})`],
    ['Una aclaración sobre el enunciado. Dice que I cero es la intensidad de cada rendija en dirección normal. Si alguien ignora la difracción, le da cuatro. Pero la cátedra usa la fórmula completa, con beta, y responde cero. [A] ¿Entonces pongo cero? [P] Sí, y explicá que C cae en un mínimo de difracción.'],
  ]),

  K.trampas([
    '**Lámina 1** en la rendija a la que el haz llega **primero** (si no, el orden 0 se va a 60 franjas).',
    '**Con líquido**, cada lámina aporta $e(n_l-n_L)$: la de 1,5 baja de 18 a 3,6 µm.',
    '**El líquido no entra en la incidencia:** antes de la placa hay aire, $n_i=1$.',
    '**$n\'<n_L$ resta camino:** la lámina 2 va en la **otra** rendija ($e\'<0$ en la misma).',
    '**$\\beta$ con $\\theta_i$**, sin láminas, y la calculadora en **RAD**: $\\sen(-5\\pi)=0$.',
  ], [
    ['Las trampas. Primera: la rendija de la lámina. Va en la que el haz alcanza primero.'],
    ['Segunda: con líquido, cada lámina aporta n lámina menos n del líquido, no menos uno.'],
    ['Tercera: el líquido está después de la placa. La incidencia sigue en aire.'],
    ['Cuarta: una lámina con índice menor que el del medio resta camino. Por eso la segunda va en la otra rendija.'],
    ['Y quinta: beta lleva el ángulo de incidencia y no lleva láminas. Calculadora en radianes.'],
  ]),

  K.receta([
    '**1.** Camino extra de la incidencia: $n_i d\\sen\\theta_i$.',
    '**2.** Lámina en la rendija alcanzada primero: $e(n_l-n)=$ ese extra.',
    '**3.** Cambia el medio ⇒ recalcular cada lámina con $n_l-n_L$.',
    '**4.** En C: $\\gamma$ con $\\Delta CO$; $\\beta$ con $\\theta_i$ y sin láminas.',
  ], ['$d\\sen\\theta_i=18\\ \\mu$m $=30\\lambda_0$', '1ra parte: $e=36\\ \\mu$m; $I(C)=0$ ($\\beta=-5\\pi$)', "2da parte: $e'=48\\ \\mu$m en la otra rendija; $I(C)=0$", 'Campana: 30° (aire), 20,9° (líquido)'], [
    ['La receta. Uno: el camino extra que agrega la incidencia.'],
    ['Dos: la lámina en la rendija que el haz alcanza primero, compensando ese camino.'],
    ['Tres: si cambia el medio, recalcular lo que aporta cada lámina.'],
    ['Cuatro: en C, gama con la diferencia de camino y beta con el ángulo de incidencia.'],
    ['Resultados: treinta y seis micrones en la primera parte, cuarenta y ocho en la segunda, y en las dos la intensidad en C es cero.'],
  ]),
];
