// Osc 4 · 1P 24/9/2015, ej. 3: pierde 79,24 % de la energía en 3 ciclos; F0 = 15 N, ω = 6 s⁻¹ con potencia media máxima; m = 10 kg.
// Resultados verificados (soluciones/Osc4.py): ω0 = 6; 6γT' = 1,5721 ⇒ γ = 0,25 s⁻¹, ω' = 5,9948; a) Q = 12; b) ω ≈ 6 ± 0,25 = 5,75 o 6,25 s⁻¹
// (exacto 5,755 y 6,255); c) A_est = 0,5 m, x0 = 0,5, v0 = 0 ⇒ x(t) = 0,5004 e^(−0,25t) cos(5,995t − 0,0417) [m, s].
const { md, ul, card, callout, eqs, res, plot } = require('../../lib');
const { seccion } = require('../common');
const { kit, morphAnim, moveAnim, sweepLin } = require('../fx');

const SEC = 'Osc 4 · Q, media potencia y libre';
const B = 'b-osc';
const K = kit(SEC, B);
const Pm = w => 0.5 * 5 * w * w * (1.5 / Math.sqrt((36 - w * w) ** 2 + (0.5 * w) ** 2)) ** 2;
const xl = t => 0.5004 * Math.exp(-0.25 * t) * Math.cos(5.9948 * t - 0.0417);
const XC = 200;
const resD = top => { let d = `M${XC},40 L${XC},64`; const n = 14, a = 64, b = top - 18; for (let i = 1; i <= n; i++) d += ` L${XC + (i % 2 ? 24 : -24)},${(a + (b - a) * (i - 0.5) / n).toFixed(1)}`; return d + ` L${XC},${b.toFixed(1)} L${XC},${top.toFixed(1)}`; };
const bloque = id => `<svg class="os4-svg" viewBox="0 0 420 560" style="width:360px">
  <rect x="60" y="14" width="300" height="26" rx="6" class="os4-techo"/>
  <line x1="60" y1="280" x2="380" y2="280" class="os4-eq"/><text x="380" y="272" text-anchor="end" class="os4-tk">equilibrio</text>
  <path id="${id}-r" class="os4-res" d="${resD(280)}"/>
  <g id="${id}-m"><rect x="${XC - 50}" y="280" width="100" height="80" rx="10" class="os4-m"/><text x="${XC}" y="330" text-anchor="middle" class="os4-mt">10 kg</text></g>
  <g id="${id}-f" class="pending"><text x="330" y="140" text-anchor="middle" class="os4-f">F = 0</text></g>
  <text x="60" y="530" class="os4-tk">x ↓ (+): se estira</text></svg>`;
const S = 200; // px por metro
const forz = Array.from({ length: 151 }, (_, i) => 0.5 * Math.cos(6 * (-2 * 2 * Math.PI / 6 + i / 150 * 2 * 2 * Math.PI / 6)));
const lib = Array.from({ length: 301 }, (_, i) => xl(i / 300 * 10));
const CSS = `.os4-svg{overflow:visible;font-family:"Segoe UI",Arial,sans-serif}
  .os4-techo{fill:#2b3d5c;stroke:#8fa6c4;stroke-width:3} .os4-eq{stroke:#33476a;stroke-width:3;stroke-dasharray:10 10} .os4-tk{fill:var(--dim);font-size:22px}
  .os4-res{fill:none;stroke:#dfe7f2;stroke-width:5;stroke-linejoin:round} .os4-m{fill:var(--osc);stroke:#0d1522;stroke-width:4} .os4-mt{fill:#07111f;font-size:26px;font-weight:800}
  .os4-f{fill:var(--bad);font-size:30px;font-weight:800}`;

module.exports = [
  seccion('Osc 4', 'Q, media potencia y libre', 'Primer parcial del 24/9/2015 · ejercicio 3',
    'Ejercicio de oscilaciones número cuatro: primer parcial del veinticuatro de septiembre de dos mil quince, ejercicio tres. Un oscilador que pierde energía, después forzado en resonancia de potencia, y al final libre otra vez.'),

  Object.assign(K.enunciado('Osc4.jpg', ['@1 sin fuerza: pierde 79,24 % de la **energía** en **3 ciclos**', '@2 $F=15\\cos(6t)$ N: potencia media **máxima**', '@3 $m=10$ kg', '@3 c) se quita la fuerza en la máxima elongación'], [
    ['Este es el enunciado. Vamos con los datos.'],
    ['Sin fuerza, el oscilador pierde el setenta y nueve coma dos cuatro por ciento de su energía en tres ciclos completos.'],
    ['Después se lo fuerza con quince newton y omega igual a seis, y con esa frecuencia la potencia media es máxima. Piden Q, y una frecuencia con la mitad de la potencia.'],
    ['Y en el ítem c, con masa de diez kilos, se quita la fuerza cuando el resorte está en su máxima elongación. Hay que escribir x de t.'],
  ], { maxH: 430 }), { css: CSS }),

  K.molde('Ejercicio 3 de la hoja: **forzado: Q, ancho de banda, estacionario** (79,28 % en 2 ciclos). Para c), el 4: **forzado → libre**.',
    ['"Máxima potencia" ⇒ $\\omega=\\omega_0$, $\\delta=\\pi/2$', 'Energía: $e^{-2\\gamma t}$', 'Media potencia: $\\omega\\approx\\omega_0\\pm\\gamma$', '$A_{est}=\\frac{F_0/m}{2\\gamma\\omega_0}$'],
    ['Son **3 ciclos**: $e^{-6\\gamma T\'}$', 'c) no pide el estacionario: pide la **libre** después'],
    [['El molde es el ejercicio tres de la hoja, casi el mismo enunciado con dos ciclos. Y para el ítem c, el cuatro, de forzado a libre.'],
     ['Se repite: máxima potencia es omega igual a omega cero, la energía cae con e a la menos dos gama t, los puntos de media potencia están a gama del centro, y la amplitud en resonancia de potencia.'],
     ['Cambia que son tres ciclos, y que el ítem c pide lo que pasa después de sacar la fuerza.']]),

  K.S('a) Factor de calidad', 'Q a partir de tres ciclos', `<div style="display:grid;grid-template-columns:640px 1fr;gap:30px;align-items:center">${eqs([
      { t: '\\omega_0=6\\ \\text{s}^{-1}\\quad(\\text{máx. potencia})', s: 0 },
      { t: "e^{-2\\gamma\\,(3T')}=1-0{,}7924=0{,}2076", s: 1 },
      { t: "6\\gamma T'=1{,}5721\\ \\Rightarrow\\ \\gamma T'=0{,}262", s: 2 },
      { t: "\\gamma=\\frac{0{,}0417\\cdot6}{\\sqrt{1+0{,}0417^2}}=0{,}25\\ \\text{s}^{-1}", s: 2 },
      { t: 'Q=\\frac{\\omega_0}{2\\gamma}=\\frac{6}{0{,}5}=12', s: 3, cls: 'ok' },
    ])}
      ${plot({ w: 980, h: 480, x: [0, 3.3], y: [0, 1.05], ticksX: [0, 1, 2, 3], ticksY: [0, 0.2076, 1], fmtY: v => String(v).replace('.', ','), xl: "t / T'", yl: 'E / E₀', id: 'os4-e', s: 1,
        curves: [{ f: c => Math.exp(-2 * 0.262 * c), id: 'os4-ec' }],
        extra: (px, py) => `<circle class="dot" cx="${px(3)}" cy="${py(0.2076)}" r="12"/><text class="lbl c3" x="${px(3) - 14}" y="${py(0.2076) - 18}" style="text-anchor:end">queda 20,76 %</text>` })}</div>`, [
    ['Primero, omega cero. La potencia media es máxima en omega igual a omega cero: entonces omega cero es seis.'],
    ['Se pierde el setenta y nueve coma dos cuatro por ciento, así que queda el veinte coma siete seis. La energía cae con e a la menos dos gama t, y en tres ciclos el tiempo es tres T prima.', `sweep('#os4-e #os4-ec',{dur:2000})`],
    ['Seis gama T prima es menos el logaritmo de cero coma dos cero siete seis: uno coma cinco siete dos. Gama T prima es cero coma dos seis dos. Con T prima igual a dos pi sobre omega prima, gama da cero coma veinticinco.'],
    ['Q es omega cero sobre dos gama: doce. [A] ¿No era un menos en el exponente por ciclo, nomás? [P] Son tres ciclos: por eso el seis.'],
  ]),

  K.S('b) Media potencia', '¿Con qué ω la potencia es la mitad?', `<div style="display:grid;grid-template-columns:600px 1fr;gap:30px;align-items:center">${eqs([
      { t: '\\langle P\\rangle_{max}=\\frac{F_0^2}{2b}=\\frac{225}{10}=22{,}5\\ \\text{W}', s: 0 },
      { t: '\\omega\\approx\\omega_0\\pm\\gamma=6\\pm0{,}25', s: 1 },
      { t: '\\omega=5{,}75\\ \\text{o}\\ 6{,}25\\ \\text{s}^{-1}', s: 1, cls: 'ok' },
      { t: '\\text{exacto: }\\sqrt{\\omega_0^2+\\gamma^2}\\pm\\gamma=5{,}755;\\ 6{,}255', s: 2 },
    ])}
      ${plot({ w: 1020, h: 500, x: [5, 7], y: [0, 24], ticksX: [5.75, 6, 6.25], ticksY: [0, 11.25, 22.5], fmtX: v => String(v).replace('.', ','), fmtY: v => String(v).replace('.', ','), xl: 'ω (1/s)', yl: '⟨P⟩ (W)', id: 'os4-p', s: 0,
        curves: [{ f: Pm, n: 700, id: 'os4-pc' }, { f: () => 11.25, cls: 'c3 dash', id: 'os4-ph' }],
        extra: (px, py) => [5.755, 6.255].map(w => `<circle class="dot" cx="${px(w)}" cy="${py(11.25)}" r="11"/>`).join('') + `<text class="lbl c3" x="${px(6)}" y="${py(9)}" style="text-anchor:middle">ancho 2γ = 0,5</text>` })}</div>`, [
    ['Ítem b. La potencia media es máxima en omega cero y vale F cero al cuadrado sobre dos b. Con b igual a dos m gama, cinco kilos por segundo, da veintidós coma cinco watts.', `sweep('#os4-p #os4-pc',{dur:2200}); sweep('#os4-p #os4-ph',{delay:1600,dur:900})`],
    ['Con un oscilador poco amortiguado, la potencia cae a la mitad a una distancia gama del centro: omega igual a seis más o menos cero coma veinticinco. Cinco coma setenta y cinco o seis coma veinticinco; alcanza con dar uno.'],
    ['La cuenta exacta da cinco coma siete cinco cinco y seis coma dos cinco cinco: casi lo mismo, porque Q es doce. [A] ¿Cada punto está a gama, o a dos gama? [P] Cada uno a gama del centro. El ancho total entre los dos es dos gama, omega cero sobre Q.'],
  ]),

  K.S('c) Se quita la fuerza', 'De forzado a libre en la máxima elongación', `<div style="display:grid;grid-template-columns:380px 1fr;gap:40px;align-items:center">${bloque('os4-s')}
      ${eqs([
        { t: 'A_{est}=\\frac{F_0/m}{2\\gamma\\omega_0}=\\frac{1{,}5}{2\\cdot0{,}25\\cdot6}=0{,}5\\ \\text{m}', s: 0 },
        { t: 'x_0=+0{,}5\\ \\text{m},\\qquad v_0=0', s: 1 },
        { t: "\\tg\\varphi_0=-\\frac{\\gamma}{\\omega'}=-0{,}0417\\qquad A=0{,}5004\\ \\text{m}", s: 2 },
        { t: "x(t)=0{,}5004\\,e^{-0{,}25t}\\cos(5{,}995\\,t-0{,}0417)", s: 3, cls: 'hl' },
      ])}</div>`, [
    ['Ítem c. En resonancia de potencia la amplitud estacionaria es F cero sobre m, sobre dos gama omega cero: cero coma cinco metros. Así oscila mientras está la fuerza.', `${morphAnim('#os4-s-r', forz.map(x => resD(280 + S * 0.4 * x)))} ${moveAnim('#os4-s-m', forz.map(x => [0, S * 0.4 * x]))}`],
    ['Se quita la fuerza en la máxima elongación: x cero es más cero coma cinco, con el positivo hacia donde se estira, y la velocidad es cero.', `show('#os4-s-f',{from:'pop'})`],
    ['Las constantes: tangente de fi igual a menos gama sobre omega prima, menos cero coma cero cuatro uno siete, y la amplitud apenas mayor: cero coma cinco cero cero cuatro.'],
    ['Queda x de t igual a cero coma cinco cero cero cuatro, por e a la menos cero coma veinticinco t, por coseno de cinco coma nueve nueve cinco t menos cero coma cero cuatro uno siete. [A] ¿Por qué no sigue con omega igual a seis? [P] Sin fuerza oscila con su propia omega prima: cinco coma nueve nueve cinco.', `${morphAnim('#os4-s-r', lib.map(x => resD(280 + S * 0.4 * x)))} ${moveAnim('#os4-s-m', lib.map(x => [0, S * 0.4 * x]))}`],
  ]),

  K.S('c) La oscilación libre', 'x(t) después de quitar la fuerza', plot({ w: 1500, h: 560, x: [0, 10], y: [-0.55, 0.55], ticksX: [0, 2, 4, 6, 8, 10], ticksY: [-0.5, 0, 0.5], fmtY: v => String(v).replace('.', ','), xl: 't (s)', yl: 'x (m)', id: 'os4-x', width: 1500,
    curves: [{ f: t => 0.5004 * Math.exp(-0.25 * t), cls: 'c3 dash', id: 'os4-x1' }, { f: t => -0.5004 * Math.exp(-0.25 * t), cls: 'c3 dash', id: 'os4-x2' }, { f: xl, n: 900, id: 'os4-xc' }] }), [
    ['Así queda: oscila con período de un segundo y pico, y la amplitud se apaga con e a la menos cero coma veinticinco t. En tres ciclos le queda el veinte coma siete seis por ciento de la energía, como dice el enunciado.', `${sweepLin('#os4-x #os4-xc')} sweep('#os4-x #os4-x1, #os4-x #os4-x2',{dur:1500})`],
  ]),

  K.trampas([
    '**79,24 % es lo que se pierde:** queda 0,2076.',
    "**Energía y 3 ciclos:** $e^{-2\\gamma\\cdot3T'}$ (con $e^{-\\gamma t}$ sale $Q=6$).",
    '**Máxima potencia ⇒ $\\omega=\\omega_0$**, no la de máxima amplitud.',
    '**Media potencia a $\\gamma$ del centro**, no a $2\\gamma$.',
    "**La libre va con $\\omega'$** y $\\varphi_0=-\\arctg(\\gamma/\\omega')\\neq0$.",
  ], [
    ['Las trampas. Primera: el porcentaje es lo que se pierde; lo que queda es el veinte coma siete seis.'],
    ['Segunda: es energía, y son tres ciclos.'],
    ['Tercera: máxima potencia es omega igual a omega cero.'],
    ['Cuarta: cada punto de media potencia está a gama del centro.'],
    ['Y quinta: la libre va con omega prima, y la fase no es cero.'],
  ]),

  K.receta([
    '**1.** Máx. potencia ⇒ $\\omega_0$.',
    "**2.** % de energía en $n$ ciclos ⇒ $e^{-2\\gamma nT'}$ ⇒ $\\gamma$, $Q$.",
    '**3.** Media potencia: $\\omega_0\\pm\\gamma$.',
    "**4.** $A_{est}$; libre con $x_0=A_{est}$, $v_0=0$, $\\omega'$.",
  ], ['a) $\\gamma=0{,}25$ s⁻¹; $Q=12$', 'b) $\\omega=5{,}75$ o $6{,}25$ s⁻¹', 'c) $x=0{,}5004\\,e^{-0{,}25t}\\cos(5{,}995t-0{,}0417)$ m'], [
    ['La receta. Uno: máxima potencia da omega cero.'],
    ['Dos: el porcentaje de energía da gama y Q.'],
    ['Tres: la media potencia, a gama del centro.'],
    ['Cuatro: la amplitud estacionaria y la libre.'],
    ['Resultados: Q igual a doce, cinco coma setenta y cinco por segundo, y la libre con medio metro de amplitud.'],
  ]),
];
