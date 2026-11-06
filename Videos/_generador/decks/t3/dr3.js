// DR 3 · 2P 11/11/2023, ej. 1: todo sumergido (nL = 1,2), a = 2,25 µm, d = 6 µm, λ0 = 600 nm; lámina 1,5 de 4 µm (arriba), gota de aire de 12 µm (abajo).
// Resultados verificados (soluciones/DR3.py): lámina +1,2 µm, gota −2,4 µm ⇒ arriba atrasada 3,6 µm = 6λ0;
// sen α = −3,6/7,2 = −0,5 ⇒ α = −30° (haz que baja, llega primero a la rendija de la lámina);
// centro: γ = 0, β = 9π/4 ⇒ (sen β/β)² = 0,010007 ⇒ I = 0,040 W/m² (I0 = 1 W/m²).
const { md, ul, card, callout, eqs, res, plot } = require('../../lib');
const { seccion } = require('../common');
const { kit, dslit, DS_CSS, barras, growX } = require('../fx');

const SEC = 'DR 3 · Sumergida, lámina y gota';
const B = 'b-fis';
const K = kit(SEC, B);
const D2R = Math.PI / 180;
const envD = th => { const b = 3.75 * Math.PI * 1.2 * (Math.sin(th * D2R) + 0.5); return Math.abs(b) < 1e-9 ? 1 : (Math.sin(b) / b) ** 2; };
const ID = th => 4 * Math.cos(12 * Math.PI * Math.sin(th * D2R)) ** 2 * envD(th);
const esquema = (id, o = {}) => dslit(Object.assign({ id, ti: -30, seg: true, medio: 'todo en líquido n = 1,2', lams: [{ slit: 1, txt: '1,5 · 4 µm' }, { slit: 2, txt: 'aire · 12 µm', cls: 'b' }], style: 'width:760px' }, o));

module.exports = [
  seccion('DR 3', 'Sumergida, lámina y gota', 'Segundo parcial del 11/11/2023 · ejercicio 1',
    'Ejercicio de doble rendija número tres: segundo parcial del once de noviembre de dos mil veintitrés, ejercicio uno. Todo el dispositivo está sumergido; una lámina y una gota de aire corren el patrón, y se inclina el haz para devolver el orden cero al centro.'),

  Object.assign(K.enunciado('DR3.jpg', ['@1 todo en líquido $n_L=1{,}2$', '@1 $a=2{,}25\\ \\mu$m, $d=6\\ \\mu$m', '@1 $\\lambda_0=600$ nm', '@2 lámina $n=1{,}5$, $e=4\\ \\mu$m (arriba)', '@2 gota de aire de diámetro $3e=12\\ \\mu$m (abajo)', '@3 orden 0 en el centro: ¿$\\alpha$?', '@3 $I_0=1$ W/m²'], [
    ['Este es el enunciado. Vamos con los datos.'],
    ['Todo está dentro de un líquido de índice uno coma dos: el haz, la placa y el espacio hasta la pantalla. Las rendijas miden dos coma veinticinco micrones y están separadas seis. La luz es de seiscientos nanómetros.'],
    ['Delante de la rendija de arriba hay una lámina de índice uno coma cinco y cuatro micrones. Delante de la de abajo, una gota de aire de doce micrones de diámetro.'],
    ['Piden el ángulo de incidencia para que el orden cero quede en el centro, y la intensidad en el centro.'],
  ], { maxH: 420 }), { css: DS_CSS }),

  K.molde('Ejercicio 16 de la hoja: **láminas + incidencia oblicua** (Recu 7/6/25). Y el 18: **cámara de aceite + gota de aire**.',
    ['La inclinación compensa a las láminas', 'El haz llega primero a la rendija **atrasada**', '$\\beta$ lleva el ángulo de incidencia'],
    ['Todo **sumergido**: $n_L$ multiplica a $d\\sen\\alpha$ y a $\\beta$', 'La gota de aire **resta** camino: $3e\\,(1-n_L)$'],
    [['El molde es el ejercicio dieciséis de la hoja: láminas corridas por una incidencia oblicua. Y para la gota, el dieciocho, la cámara de aceite con una gota de aire.'],
     ['Se repite la idea: la inclinación tiene que compensar lo que agregan las láminas, y el haz llega primero a la rendija que quedó atrasada. Y beta lleva el ángulo de incidencia.'],
     ['Cambia que todo está sumergido, así que el índice del líquido aparece en todos lados, y que la gota de aire resta camino.']]),

  K.S('Teoría', 'Diferencia de camino con todo sumergido', `<div class="grid g2" style="align-items:center">${eqs([
      { t: '\\Delta CO=n_L\\,d\\sen\\theta-n_L\\,d\\sen\\alpha', s: 0 },
      { t: '\\qquad+\\textstyle\\sum_{abajo}e\\,(n_l-n_L)-\\sum_{arriba}e\\,(n_l-n_L)', s: 1 },
      { t: '\\beta=\\frac{\\pi a}{\\lambda_0}\\,(n_L\\sen\\theta-n_L\\sen\\alpha)', s: 2 },
    ])}${ul(['@0 Antes y después de la placa hay líquido: $n_L$ en los dos términos', '@1 Lámina con $n_l>n_L$: suma camino; **gota de aire** ($n_l=1<n_L$): resta', '@2 $\\beta$: con la incidencia y con $n_L$, **sin** láminas'])}</div>`, [
    ['La herramienta es la diferencia de camino óptico de siempre, pero con todo sumergido. La parte geométrica lleva n L antes y después de la placa: n L d seno de theta, menos n L d seno de alfa.'],
    ['Cada lámina le suma a su rayo e por n lámina menos n L. Una gota de aire es como una lámina de índice uno: como uno es menor que uno coma dos, resta camino. [A] ¿La gota es como una lámina? [P] Sí: el rayo atraviesa aire en lugar de líquido, a lo largo de todo su diámetro.'],
    ['Y beta, la difracción, lleva la incidencia y el índice del líquido, pero no las láminas: cada una cubre toda su rendija.'],
  ]),

  K.S('Aportes', 'Lo que agregan la lámina y la gota', `<div style="display:grid;grid-template-columns:760px 1fr;gap:30px;align-items:center">${esquema('d3-a', { ti: 0, seg: false })}
      <div>${eqs([
        { t: 'e\\,(n-n_L)=4\\cdot(1{,}5-1{,}2)=+1{,}2\\ \\mu\\text{m}', s: 0 },
        { t: '3e\\,(1-n_L)=12\\cdot(1-1{,}2)=-2{,}4\\ \\mu\\text{m}', s: 1 },
      ])}${barras([{ lbl: 'arriba', segs: [{ w: 120, color: '#4cc2ff', txt: '+1,2', id: 'd3-b1', pend: true }] }, { lbl: 'abajo', segs: [{ w: -240, color: '#7ee0a1', txt: '−2,4', id: 'd3-b2', pend: true }], off: 240 }], { w: 640 })}
      ${res('arriba atrasada 3,6 µm $=6\\lambda_0$', { s: 2, style: 'margin-top:16px' })}</div></div>`, [
    ['Primero, lo que agrega cada cosa. La lámina reemplaza cuatro micrones de líquido por vidrio: e por uno coma cinco menos uno coma dos, más uno coma dos micrones al rayo de arriba.', growX('#d3-b1', { dur: 1200 })],
    ['La gota reemplaza doce micrones de líquido por aire, que tiene índice menor: doce por uno menos uno coma dos, menos dos coma cuatro micrones al rayo de abajo. [A] ¿Por qué el espesor de la gota es el diámetro? [P] Porque el rayo la atraviesa de punta a punta: recorre doce micrones de aire.', growX('#d3-b2', { dur: 1200 })],
    ['Los dos efectos van para el mismo lado: el rayo de arriba queda atrasado tres coma seis micrones respecto del de abajo. Son seis longitudes de onda.'],
  ]),

  K.S('Ángulo', 'Inclinar el haz para devolver el orden 0', `<div style="display:grid;grid-template-columns:760px 1fr;gap:30px;align-items:center">${esquema('d3-b')}
      <div>${eqs([
        { t: 'n_Ld\\sen0-n_Ld\\sen\\alpha', s: 0 },
        { t: '\\quad+3e(1-n_L)-e(n-n_L)=0', s: 0 },
        { t: '-7{,}2\\sen\\alpha-2{,}4-1{,}2=0', s: 1 },
        { t: '\\sen\\alpha=-0{,}5', s: 1, cls: 'ok' },
      ])}${res('$\\alpha=-30°$: el haz baja', { s: 2, style: 'margin-top:20px' })}</div></div>`, [
    ['Planteamos que en el centro la diferencia de camino sea cero. Ojo: el haz incide dentro del líquido, así que la parte de incidencia es n L d seno de alfa.'],
    ['Con números: menos siete coma dos seno de alfa, menos dos coma cuatro, menos uno coma dos, igual a cero. Seno de alfa da menos cero coma cinco.', `draw('#d3-b-seg',{dur:1200}); show('#d3-b-segt',{delay:1000})`],
    ['Alfa es menos treinta grados: el haz baja y llega primero a la rendija de arriba, la atrasada. Así el rayo de abajo recorre tres coma seis micrones de más antes de la placa y compensa justo. [A] ¿Y con más treinta? [P] El centro sería el orden menos doce, no el cero.'],
  ]),

  K.S('Intensidad', 'La intensidad en el centro', `<div style="display:grid;grid-template-columns:600px 1fr;gap:30px;align-items:center">${eqs([
      { t: '\\gamma=0\\ \\Rightarrow\\ \\cos^2\\gamma=1', s: 0 },
      { t: '\\beta=\\frac{\\pi\\cdot2{,}25}{0{,}6}\\,(0-1{,}2\\cdot(-0{,}5))=\\frac{9\\pi}{4}', s: 1 },
      { t: '\\left(\\frac{\\sen\\beta}{\\beta}\\right)^2=\\frac{0{,}5}{(9\\pi/4)^2}=0{,}010007', s: 2 },
      { t: 'I=4\\cdot1\\cdot0{,}010007=0{,}040\\ \\text{W/m}^2', s: 3, cls: 'ok' },
    ])}
      ${plot({ w: 1080, h: 500, x: [-60, 30], y: [0, 4.3], ticksX: [-60, -30, 0, 30], ticksY: [0, 2, 4], xl: 'θ (°)', yl: 'I (W/m²)', id: 'd3-p', s: 2,
        curves: [{ f: ID, n: 5000, cls: 'c3', id: 'd3-pc' }, { f: th => 4 * envD(th), n: 1500, cls: 'c2 dash', id: 'd3-pe' }],
        extra: (px, py) => `<circle class="dot" cx="${px(0)}" cy="${py(0.04)}" r="11"/><text class="lbl c3" x="${px(2)}" y="${py(0.6)}">centro: 0,04</text><text class="lbl c2" x="${px(-30)}" y="${py(4.15)}" style="text-anchor:middle">campana en −30°</text>` })}</div>`, [
    ['En el centro está el orden cero, así que gama vale cero y el coseno cuadrado, uno.'],
    ['Pero beta lleva la incidencia y el índice del líquido: pi por dos coma veinticinco sobre cero coma seis, por cero menos uno coma dos por menos un medio. Da nueve pi cuartos.'],
    ['Seno de nueve pi cuartos es raíz de dos sobre dos. El factor de difracción vale cero coma cero uno.', `sweep('#d3-p #d3-pc',{dur:2600}); sweep('#d3-p #d3-pe',{delay:1600,dur:1600})`],
    ['La intensidad en el centro es cuatro por cero coma cero uno: cero coma cero cuatro watts por metro cuadrado. Hay franja de orden cero, pero muy débil: la campana sigue al haz, centrada en menos treinta grados. [A] ¿Y el máximo de cuatro dónde está? [P] En la dirección del haz.'],
  ]),

  K.trampas([
    '**Lámina sumergida:** $e(n-n_L)$, no $e(n-1)$ (daría $-37{,}7°$).',
    '**La gota resta** y su espesor es el **diámetro**: $3e(1-n_L)=-2{,}4\\ \\mu$m.',
    '**$n_L$ en la incidencia:** $n_Ld\\sen\\alpha$ (sin él, $-36{,}9°$).',
    '**$\\beta$ con $\\alpha$ y con $n_L$**, sin láminas (con $\\beta=0$ daría 4 W/m²).',
    '**Calculadora en RAD** para $\\sen(9\\pi/4)$.',
  ], [
    ['Las trampas. Primera: la lámina está sumergida, así que lleva n menos n L.'],
    ['Segunda: la gota de aire resta camino, y su espesor es el diámetro.'],
    ['Tercera: el haz incide en el líquido; la parte de incidencia lleva n L.'],
    ['Cuarta: beta lleva el ángulo de incidencia y el índice del líquido. Con beta cero te daría cuatro, mal.'],
    ['Y quinta: calculadora en radianes para seno de nueve pi cuartos.'],
  ]),

  K.receta([
    '**1.** Aporte de cada elemento: $e(n_l-n_L)$; gota: diámetro·$(1-n_L)$.',
    '**2.** $\\Delta CO(0)=0$ con $-n_Ld\\sen\\alpha$ ⇒ $\\alpha$ (signo: llega primero a la atrasada).',
    '**3.** Centro: $\\gamma=0$; $\\beta=\\frac{\\pi a}{\\lambda_0}(0-n_L\\sen\\alpha)$.',
  ], ['Lámina $+1{,}2\\ \\mu$m; gota $-2{,}4\\ \\mu$m', '$\\alpha=-30°$ (el haz baja)', '$\\beta=9\\pi/4$; $I=0{,}040$ W/m²'], [
    ['La receta. Uno: el aporte de la lámina y de la gota.'],
    ['Dos: la diferencia de camino en el centro igual a cero, con la incidencia: sale alfa.'],
    ['Tres: en el centro, gama cero y beta con la incidencia.'],
    ['Resultados: menos treinta grados, y cero coma cero cuatro watts por metro cuadrado.'],
  ]),
];
