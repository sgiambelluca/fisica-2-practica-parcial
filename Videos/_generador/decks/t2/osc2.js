// Osc 2 · 1P 14/9/2024, ej. 4: adorno colgante (k = 6,27 N/m, m = 1 kg) forzado por las ruedas (D = 72 cm); a 0,9 m/s, máxima amplitud 6 cm.
// Resultados verificados (soluciones/Osc2.py): ω0 = 2,504 s⁻¹ (ω0² = 6,27); ω1 = 2v/D = 2,5 s⁻¹; ω2 = 2,2 s⁻¹; γ = 0,1 s⁻¹; ω' = 2,502 s⁻¹;
// F0 = 0,030 N; a) A' = 2,007 cm ≈ 2,0 cm; b) φ = −0,040 rad, C = 1,0008 y0: y(t) = 6,005 e^(−0,1t) cos(2,502t − 0,040) cm (lectura literal)
// o 2,008 e^(−0,1t) cos(2,502t − 0,040) cm si venía a v'. y hacia arriba desde el equilibrio.
const { md, ul, card, callout, eqs, res, plot } = require('../../lib');
const { seccion } = require('../common');
const { kit, morphAnim, moveAnim, sweepLin } = require('../fx');

const SEC = 'Osc 2 · Adorno en un auto';
const B = 'b-osc';
const K = kit(SEC, B);
const Acm = w => 0.030024 / Math.sqrt((6.27 - w * w) ** 2 + (0.2 * w) ** 2) * 100;
const yl = t => 6.005 * Math.exp(-0.1 * t) * Math.cos(2.502 * t - 0.04);

// resorte + masa: techo en y = 40, masa (arriba) en 300 − 10·y
const XC = 200;
const resD = top => { let d = `M${XC},40 L${XC},64`; const n = 14, a = 64, b = top - 18; for (let i = 1; i <= n; i++) d += ` L${XC + (i % 2 ? 24 : -24)},${(a + (b - a) * (i - 0.5) / n).toFixed(1)}`; return d + ` L${XC},${b.toFixed(1)} L${XC},${top.toFixed(1)}`; };
const adorno = (id) => `<svg class="os2-svg" viewBox="0 0 420 520" style="width:380px">
  <rect x="40" y="10" width="340" height="30" rx="8" class="os2-techo"/><text x="210" y="32" text-anchor="middle" class="os2-tt">techo del auto</text>
  <line x1="60" y1="300" x2="380" y2="300" class="os2-eq"/><text x="380" y="292" text-anchor="end" class="os2-tk">equilibrio</text>
  <path id="${id}-r" class="os2-res" d="${resD(300)}"/>
  <g id="${id}-m"><rect x="${XC - 45}" y="300" width="90" height="70" rx="12" class="os2-m"/><text x="${XC}" y="345" text-anchor="middle" class="os2-mt">m</text></g>
  <text x="60" y="470" class="os2-tk">y ↑ (+)</text></svg>`;
const frames = (f, t0, t1, n) => Array.from({ length: n + 1 }, (_, i) => f(t0 + (t1 - t0) * i / n));
const forzY = frames(t => 6 * Math.cos(2.5 * t), -2 * 2 * Math.PI / 2.5, 0, 120);
const libY = frames(yl, 0, 12, 300);

const CSS = `.os2-svg{overflow:visible;font-family:"Segoe UI",Arial,sans-serif}
  .os2-techo{fill:#2b3d5c;stroke:#8fa6c4;stroke-width:3} .os2-tt{fill:var(--muted);font-size:20px}
  .os2-eq{stroke:#33476a;stroke-width:3;stroke-dasharray:10 10} .os2-tk{fill:var(--dim);font-size:22px}
  .os2-res{fill:none;stroke:#dfe7f2;stroke-width:5;stroke-linejoin:round} .os2-m{fill:var(--osc);stroke:#0d1522;stroke-width:4} .os2-mt{fill:#07111f;font-size:30px;font-weight:800}`;

module.exports = [
  seccion('Osc 2', 'Adorno en un auto', 'Primer parcial del 14/9/2024 · ejercicio 4',
    'Ejercicio de oscilaciones número dos: primer parcial del catorce de septiembre de dos mil veinticuatro, ejercicio cuatro. Un adorno cuelga de un resorte dentro de un auto; las ruedas lo fuerzan, y cuando el auto frena queda oscilando libre.'),

  Object.assign(K.enunciado('Osc2.jpg', ['@1 $k=6{,}27$ N/m', '@1 $m=1$ kg', '@2 rueda: $D=72$ cm (diámetro)', '@2 una oscilación por vuelta', '@3 $v=0{,}9$ m/s ⇒ **máxima amplitud** 6 cm', '@3 a) $v\'=0{,}792$ m/s', '@4 b) $t=0$: mínima longitud, se detiene'], [
    ['Este es el enunciado. Vamos con los datos.'],
    ['Un adorno de un kilo cuelga de un resorte de constante seis coma dos siete newton por metro.'],
    ['Las ruedas, de setenta y dos centímetros de diámetro, lo empujan una vez por vuelta: la fuerza tiene la frecuencia de giro de la rueda.'],
    ['Cuando el auto va a cero coma nueve metros por segundo, el adorno oscila con la máxima amplitud posible: seis centímetros. El ítem a pide la amplitud si el auto va a cero coma siete nueve dos.'],
    ['Y el ítem b: en t igual a cero el resorte está en su mínima longitud y el auto se detiene. Hay que escribir y de t desde ahí.'],
  ], { maxH: 420 }), { css: CSS }),

  K.molde('Ejercicio 4 de la hoja: **cambio de régimen forzado → libre** (18/10/25). Y la receta de oscilaciones: **cualquier ω** y **resonancia de amplitud**.',
    ['$x$ y $v$ no saltan; $\\gamma$ es el mismo', 'Cesa en un extremo: $y_0=\\pm A$, $v_0=0$', "Después oscila con $\\omega'$, no con la $\\omega$ de la fuerza"],
    ['"Máxima amplitud" ⇒ resonancia de **amplitud**', 'La $\\omega$ de la fuerza sale de la **rueda**', 'Se va del forzado al libre'],
    [['El molde es el ejercicio cuatro de la hoja: cambio de régimen de forzado a libre. Y de la receta de oscilaciones, la fórmula de la amplitud para cualquier omega y la de resonancia de amplitud.'],
     ['Se repite el cambio de régimen: la posición y la velocidad no saltan, gama es el mismo, y si se corta en un extremo la velocidad es cero.'],
     ['Cambia que acá es resonancia de amplitud, que la frecuencia sale de la rueda, y que vamos del forzado al libre.']]),

  K.S('Teoría', 'La rueda marca el ritmo', `<div style="display:grid;grid-template-columns:640px 1fr;gap:30px;align-items:center">
      ${eqs([
        { t: 'T=\\frac{\\pi D}{v}\\ \\Rightarrow\\ \\omega=\\frac{2\\pi}{T}=\\frac{2v}{D}', s: 0 },
        { t: 'A(\\omega)=\\frac{F_0/m}{\\sqrt{(\\omega_0^2-\\omega^2)^2+(2\\gamma\\omega)^2}}', s: 1 },
        { t: '\\omega_{RA}=\\sqrt{\\omega_0^2-2\\gamma^2}\\qquad A_{max}=\\frac{F_0}{2m\\gamma\\omega\'}', s: 2, cls: 'hl' },
      ])}
      ${plot({ w: 1000, h: 500, x: [1.6, 3.2], y: [0, 7], ticksX: [2.2, 2.5], ticksY: [0, 2, 6], xl: 'ω (1/s)', yl: 'A (cm)', id: 'os2-a', s: 1,
        curves: [{ f: Acm, n: 800, id: 'os2-ac' }],
        extra: (px, py) => `<circle class="dot" cx="${px(2.5)}" cy="${py(6)}" r="12"/><text class="lbl c3" x="${px(2.5) + 16}" y="${py(6.2)}">0,9 m/s: 6 cm</text>
          <circle class="dot" cx="${px(2.2)}" cy="${py(2.007)}" r="12"/><text class="lbl c3" x="${px(2.2) - 16}" y="${py(2.6)}" style="text-anchor:end">0,792 m/s: ¿A′?</text>` })}</div>`, [
    ['La fuerza hace una oscilación por vuelta de rueda. Una vuelta es pi por el diámetro, y tarda pi D sobre v. Entonces omega es dos v sobre D. [A] ¿No es v sobre el radio? [P] Es lo mismo: dos v sobre D es v sobre el radio. Lo que no hay que hacer es v sobre D.'],
    ['Con esa omega, la amplitud estacionaria es la de siempre: F cero sobre m, dividido la raíz. Es la curva de resonancia.', `sweep('#os2-a #os2-ac',{dur:2400})`],
    ['La máxima amplitud está en omega de resonancia de amplitud, y vale F cero sobre dos m gama omega prima. A cero coma nueve metros por segundo estamos justo en el pico.'],
  ]),

  K.S('Pasos 1 a 3', 'ω₀, las dos ω de la fuerza y γ', `<div class="grid g2" style="align-items:center">${eqs([
      { t: '\\omega_0^2=\\frac km=6{,}27\\ \\text{s}^{-2}\\ \\ (\\omega_0=2{,}504)', s: 0 },
      { t: '\\omega_1=\\frac{2\\cdot0{,}9}{0{,}72}=2{,}5\\qquad\\omega_2=\\frac{2\\cdot0{,}792}{0{,}72}=2{,}2', s: 1 },
      { t: '\\gamma^2=\\frac{\\omega_0^2-\\omega_1^2}{2}=\\frac{6{,}27-6{,}25}{2}=0{,}01', s: 2 },
      { t: "\\gamma=0{,}1\\ \\text{s}^{-1}\\qquad\\omega'=\\sqrt{6{,}27-0{,}01}=2{,}502", s: 3, cls: 'ok' },
    ])}${callout('Si se redondea $\\omega_0=2{,}5$, sale $\\gamma=0$. Guardar $\\omega_0^2=6{,}27$.', { s: 2, cls: 'bad' })}</div>`, [
    ['Paso uno: omega cero al cuadrado es k sobre m, seis coma dos siete. Omega cero es dos coma cinco cero cuatro.'],
    ['Paso dos: las frecuencias de la fuerza. A cero coma nueve metros por segundo, dos por cero coma nueve sobre cero coma siete dos: dos coma cinco. A cero coma siete nueve dos, dos coma dos.'],
    ['Paso tres: como a cero coma nueve la amplitud es máxima, omega uno es la de resonancia de amplitud. Gama al cuadrado es seis coma dos siete menos seis coma dos cinco, sobre dos: cero coma cero uno. Ojo: si redondeás omega cero a dos coma cinco, la resta da cero y gama también.'],
    ['Gama es cero coma uno por segundo, y la frecuencia libre, omega prima, dos coma cinco cero dos.'],
  ]),

  K.S('a) Otra velocidad', 'La amplitud a 0,792 m/s', `<div class="grid g2" style="align-items:center">${eqs([
      { t: "F_0=A_{max}\\,2m\\gamma\\omega'=0{,}06\\cdot2\\cdot1\\cdot0{,}1\\cdot2{,}502=0{,}030\\ \\text{N}", s: 0 },
      { t: '\\sqrt{(6{,}27-4{,}84)^2+(0{,}44)^2}=\\sqrt{2{,}2385}=1{,}4962', s: 1 },
      { t: "A'=\\frac{0{,}030024}{1{,}4962}=0{,}02007\\ \\text{m}", s: 2, cls: 'ok' },
    ])}<div>${res("a) $A'\\approx2{,}0$ cm", { s: 2 })}${callout('Atajo: $F_0/m$ se cancela en el cociente: $\\frac{A_{max}}{A\'}=\\sqrt{\\frac{2{,}2385}{0{,}2504}}=2{,}99$.', { s: 3, style: 'margin-top:22px' })}</div></div>`, [
    ['Ítem a. Con la amplitud máxima despejamos F cero: cero coma cero seis, por dos, por uno, por cero coma uno, por dos coma cinco cero dos. Treinta milinewton.'],
    ['Ahora la fórmula general en omega dos igual a dos coma dos. Seis coma dos siete menos cuatro coma ocho cuatro es uno coma cuatro tres; dos gama omega es cero coma cuatro cuatro. La raíz de la suma de los cuadrados da uno coma cuatro nueve seis.'],
    ['A prima es cero coma cero tres sobre uno coma cuatro nueve seis: dos centímetros.'],
    ['Hay un atajo: F cero sobre m es la misma en las dos velocidades, así que se cancela en el cociente. A máxima sobre A prima da dos coma nueve nueve, y seis sobre eso, dos centímetros. [A] ¿Puedo ignorar el término de gama, si es chico? [P] Acá cambia poco, pero el planteo correcto lo lleva.'],
  ]),

  K.S('b) Frena el auto', 'De forzado a libre, en la mínima longitud', `<div style="display:grid;grid-template-columns:400px 1fr;gap:40px;align-items:center">
      ${adorno('os2-s')}
      ${eqs([
        { t: 'y_0=+A\\ \\ (\\text{mínima longitud: arriba})\\qquad v_0=0', s: 1 },
        { t: "\\tg\\varphi=-\\frac{\\gamma}{\\omega'}=-0{,}040\\qquad C=1{,}0008\\,y_0", s: 2 },
        { t: "y(t)=C\\,e^{-0{,}1t}\\cos(2{,}502\\,t-0{,}040)", s: 3, cls: 'hl' },
      ])}</div>`, [
    ['Ítem b. Primero el adorno oscila forzado, con seis centímetros de amplitud. El resorte está en su mínima longitud cuando la masa está arriba de todo.', `${morphAnim('#os2-s-r', forzY.map(y => resD(300 - 10 * y)))} ${moveAnim('#os2-s-m', forzY.map(y => [0, -10 * y]))}`],
    ['Ahí frena el auto. En ese instante la masa está en el extremo de arriba: y cero igual a más A, con y positivo hacia arriba desde el equilibrio, y velocidad cero.'],
    ['Las constantes salen como en el ejercicio uno de la hoja: tangente de fi igual a menos gama sobre omega prima, menos cero coma cero cuatro, y la amplitud C apenas mayor que y cero.'],
    ['Desde ahí oscila libre, con su omega prima, y la amplitud baja con e a la menos cero coma uno t.', `${morphAnim('#os2-s-r', libY.map(y => resD(300 - 10 * y)))} ${moveAnim('#os2-s-m', libY.map(y => [0, -10 * y]))}`],
  ]),

  K.S('b) y(t)', '¿Con qué amplitud venía?', `<div style="display:grid;grid-template-columns:900px 1fr;gap:30px;align-items:center">
      ${plot({ w: 900, h: 480, x: [0, 12], y: [-6.5, 6.5], ticksX: [0, 2.511, 6.93, 12], ticksY: [-6, -3, 0, 3, 6], fmtX: v => String(Math.round(v * 100) / 100).replace('.', ','), xl: 't (s)', yl: 'y (cm)', id: 'os2-y',
        curves: [{ f: t => 6.005 * Math.exp(-0.1 * t), cls: 'c3 dash', id: 'os2-y1' }, { f: t => -6.005 * Math.exp(-0.1 * t), cls: 'c3 dash', id: 'os2-y2' }, { f: yl, n: 800, id: 'os2-yc' }] })}
      <div>${res('$y=6{,}005\\,e^{-0{,}1t}\\cos(2{,}502t-0{,}040)$ cm', { s: 1, style: 'font-size:.85em' })}
      ${callout("Si venía a $v'$: $y=2{,}008\\,e^{-0{,}1t}\\cos(2{,}502t-0{,}040)$ cm. **Escribir cuál se toma.**", { s: 2, cls: 'warn', style: 'margin-top:22px' })}</div></div>`, [
    ['Este es el movimiento libre: período de dos coma cinco uno segundos, y la amplitud se reduce a la mitad en unos siete segundos.', `${sweepLin('#os2-y #os2-yc')} sweep('#os2-y #os2-y1, #os2-y #os2-y2',{dur:1500})`],
    ['¿Con qué amplitud venía? El auto del enunciado va a cero coma nueve, y el ítem a es un qué pasaría si. Lo más probable es tomar seis centímetros: y de t igual a seis coma cero cero cinco, por e a la menos cero coma uno t, por coseno de dos coma cinco cero dos t menos cero coma cero cuatro, en centímetros.'],
    ['La resolución del PDF toma que venía a la velocidad del ítem a, con dos centímetros. El procedimiento es el mismo: solo cambia la amplitud. [A] ¿Y en el examen? [P] Escribí cuál tomás. Si te sobra tiempo, das las dos: es una línea más.'],
  ]),

  K.trampas([
    '**No redondear $\\omega_0$:** $\\gamma$ sale de $6{,}27-6{,}25$.',
    '**$\\omega=2v/D$** ($D$ es el diámetro); no $v/D$ ni $f$ sin el $2\\pi$.',
    '**"Máxima amplitud"** ⇒ $\\omega_{RA}$, no $\\omega_0$.',
    "**En la libre va $\\omega'=2{,}502$**, no la de la fuerza.",
    '**Mínima longitud = arriba:** $y_0=+A$ con $y$ hacia arriba. Aclarar el eje y la amplitud.',
  ], [
    ['Las trampas. Primera: no redondear omega cero, porque gama sale de una resta chiquita.'],
    ['Segunda: la frecuencia de la rueda es dos v sobre el diámetro.'],
    ['Tercera: máxima amplitud es la resonancia de amplitud.'],
    ['Cuarta: en la libre se usa omega prima.'],
    ['Y quinta: mínima longitud del resorte quiere decir la masa arriba de todo. Aclarar el eje.'],
  ]),

  K.receta([
    '**1.** $\\omega_0^2=k/m$; $\\omega=2v/D$.',
    '**2.** "Máxima amplitud": $\\gamma^2=(\\omega_0^2-\\omega_{RA}^2)/2$.',
    "**3.** $F_0=A_{max}2m\\gamma\\omega'$ ⇒ $A(\\omega)$ en la otra velocidad.",
    "**4.** Libre: $y_0=\\pm A$, $v_0=0$ ⇒ $C$ y $\\varphi$ con $\\omega'$.",
  ], ['$\\omega_0=2{,}504$; $\\gamma=0{,}1$ s⁻¹; $\\omega\'=2{,}502$ s⁻¹; $F_0=0{,}030$ N', "a) $A'\\approx2{,}0$ cm", 'b) $y=6{,}005\\,e^{-0{,}1t}\\cos(2{,}502t-0{,}040)$ cm', '(o con 2,008 cm si venía a $v\'$)'], [
    ['La receta. Uno: omega cero y la frecuencia de la rueda.'],
    ['Dos: con la resonancia de amplitud, gama.'],
    ['Tres: F cero y la amplitud en la otra velocidad.'],
    ['Cuatro: el libre, con las condiciones del extremo.'],
    ['Resultados: dos centímetros en el ítem a, y la oscilación libre con seis centímetros y gama cero coma uno.'],
  ]),
];
