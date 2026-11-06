// Osc 3 · 1P 23/4/2022, ej. 1: m = 12 kg, k = 3070 N/m, disipa 59,3 % de la energía por ciclo; F0 = 15 N, ω = 19 rad/s; al apagar, v = +0,157 m/s, estirado.
// Resultados verificados (soluciones/Osc3.py): ω0 = 15,995; γT' = 0,4495 ⇒ γ = 1,141 s⁻¹, ω' = 15,954 rad/s; a) Q = 7,01 ≈ 7;
// b) forzado A = 1,0988 cm (δ = 2,75 rad); x0 = +0,724 cm; A' = 1,264 cm, φ = −0,961 rad: x(t) = 1,26 e^(−1,14t) cos(15,95t − 0,96) cm (+ hacia abajo).
const { md, ul, card, callout, eqs, res, plot } = require('../../lib');
const { seccion } = require('../common');
const { kit, morphAnim, moveAnim, sweepLin } = require('../fx');

const SEC = 'Osc 3 · Forzado: se apaga el motor';
const B = 'b-osc';
const K = kit(SEC, B);
const xl = t => 1.264 * Math.exp(-1.141 * t) * Math.cos(15.954 * t - 0.961);
const Aw = w => 1.25 / Math.sqrt((255.83 - w * w) ** 2 + (2 * 1.141 * w) ** 2) * 100;

// resorte vertical: + hacia abajo (la masa baja 30 px por cm)
const XC = 200;
const resD = top => { let d = `M${XC},40 L${XC},64`; const n = 14, a = 64, b = top - 18; for (let i = 1; i <= n; i++) d += ` L${XC + (i % 2 ? 24 : -24)},${(a + (b - a) * (i - 0.5) / n).toFixed(1)}`; return d + ` L${XC},${b.toFixed(1)} L${XC},${top.toFixed(1)}`; };
const bloque = id => `<svg class="os3-svg" viewBox="0 0 420 520" style="width:380px">
  <rect x="60" y="14" width="300" height="26" rx="6" class="os3-techo"/>
  <line x1="60" y1="290" x2="380" y2="290" class="os3-eq"/><text x="380" y="282" text-anchor="end" class="os3-tk">equilibrio</text>
  <path id="${id}-r" class="os3-res" d="${resD(290)}"/>
  <g id="${id}-m"><rect x="${XC - 50}" y="290" width="100" height="80" rx="10" class="os3-m"/><text x="${XC}" y="340" text-anchor="middle" class="os3-mt">12 kg</text></g>
  <text x="60" y="480" class="os3-tk">x ↓ (+): se estira</text></svg>`;
const fr = Array.from({ length: 301 }, (_, i) => xl(i / 300 * 2.5));
// círculo de fase (x, v/ω) del forzado
const fase = (() => { const R = 190, cx = 260, cy = 250, x0 = 0.724 / 1.0988 * R, y0 = 0.8263 / 1.0988 * R;
  return `<svg class="os3-svg" viewBox="0 0 560 520" style="width:520px"><line x1="40" y1="${cy}" x2="520" y2="${cy}" class="os3-ax"/><line x1="${cx}" y1="30" x2="${cx}" y2="480" class="os3-ax"/>
    <text x="520" y="${cy - 12}" text-anchor="end" class="os3-tk">x</text><text x="${cx + 10}" y="40" class="os3-tk">v/ω</text>
    <circle cx="${cx}" cy="${cy}" r="${R}" class="os3-c"/><text x="${cx + R * 0.72}" y="${cy + R * 0.82}" class="os3-cl">A = 1,10 cm</text>
    <g id="os3-pt" class="pending"><line x1="${cx}" y1="${cy - y0}" x2="${cx + x0}" y2="${cy - y0}" class="os3-d"/><line x1="${cx + x0}" y1="${cy}" x2="${cx + x0}" y2="${cy - y0}" class="os3-d"/>
      <circle cx="${cx + x0}" cy="${cy - y0}" r="12" class="os3-p"/><text x="${cx + x0 + 16}" y="${cy - y0 - 14}" class="os3-cl" style="fill:var(--warn)">(0,724 ; 0,826)</text>
      <text x="${cx - 14}" y="${cy - y0 + 8}" text-anchor="end" class="os3-tk">0,826</text><text x="${cx + x0}" y="${cy + 30}" text-anchor="middle" class="os3-tk">0,724</text></g></svg>`; })();
const CSS = `.os3-svg{overflow:visible;font-family:"Segoe UI",Arial,sans-serif}
  .os3-techo{fill:#2b3d5c;stroke:#8fa6c4;stroke-width:3} .os3-eq{stroke:#33476a;stroke-width:3;stroke-dasharray:10 10} .os3-tk{fill:var(--dim);font-size:22px}
  .os3-res{fill:none;stroke:#dfe7f2;stroke-width:5;stroke-linejoin:round} .os3-m{fill:var(--osc);stroke:#0d1522;stroke-width:4} .os3-mt{fill:#07111f;font-size:26px;font-weight:800}
  .os3-ax{stroke:#6f86a8;stroke-width:3} .os3-c{fill:none;stroke:var(--accent);stroke-width:4} .os3-cl{fill:var(--accent);font-size:24px;font-weight:700}
  .os3-d{stroke:var(--warn);stroke-width:3;stroke-dasharray:8 6} .os3-p{fill:var(--warn);stroke:#0d1522;stroke-width:3}`;

module.exports = [
  seccion('Osc 3', 'Forzado: se apaga el motor', 'Primer parcial del 23/4/2022 · ejercicio 1',
    'Ejercicio de oscilaciones número tres: primer parcial del veintitrés de abril de dos mil veintidós, ejercicio uno. Un bloque en un medio viscoso, forzado por un motor; en cierto instante se apaga el motor y hay que escribir la oscilación libre.'),

  Object.assign(K.enunciado('Osc3.jpg', ['@1 $m=12$ kg, $k=3070$ N/m', '@1 disipa 59,3 % de la **energía** por ciclo', '@2 $F=15\\cos(19t)$ N', '@3 al apagar: $v=+0{,}157$ m/s, resorte estirado', '@3 + hacia donde se estira'], [
    ['Este es el enunciado. Vamos con los datos.'],
    ['Un bloque de doce kilos cuelga de un resorte de tres mil setenta newton por metro, en un medio viscoso que le hace perder el cincuenta y nueve coma tres por ciento de su energía en cada oscilación.'],
    ['Un motor lo fuerza con quince newton y omega igual a diecinueve radianes por segundo.'],
    ['En cierto instante se apaga el motor: el bloque va a cero coma uno cinco siete metros por segundo y el resorte está estirado, no del todo. Piden el factor de calidad y la oscilación libre desde ahí.'],
  ], { maxH: 420 }), { css: CSS }),

  K.molde('Ejercicio 4 de la hoja: **forzado → libre**. El 3: **Q a partir del % de energía**. Y el 1: $A$ y $\\varphi_0$ con $x_0$ y $v_0$.',
    ['$x$ y $v$ no saltan; $\\gamma$ es el mismo', 'Energía por ciclo: $e^{-2\\gamma T\'}$', "$A=\\sqrt{x_0^2+\\left(\\frac{v_0+\\gamma x_0}{\\omega'}\\right)^2}$"],
    ['No se corta en un extremo: $v_0\\neq0$', '$x_0$ sale del forzado: $x_0^2+(v/\\omega)^2=A^2$', '$\\omega=19>\\omega_0$: casi en contrafase'],
    [['El molde es el ejercicio cuatro de la hoja: un forzado que pasa a libre. Para Q, el tres. Y para las constantes, las fórmulas del uno.'],
     ['Se repite que la posición y la velocidad no saltan, que la energía por ciclo cae como e a la menos dos gama T prima, y las fórmulas de amplitud y fase.'],
     ['Cambia que el motor no se apaga en un extremo: la velocidad no es cero, y la posición hay que sacarla del forzado.']]),

  K.S('a) Factor de calidad', 'Q a partir de la energía que se pierde', `<div class="grid g2" style="align-items:center">${eqs([
      { t: '\\omega_0=\\sqrt{3070/12}=15{,}995\\ \\text{s}^{-1}', s: 0 },
      { t: "e^{-2\\gamma T'}=0{,}407\\ \\Rightarrow\\ \\gamma T'=0{,}4495", s: 1 },
      { t: "\\frac{\\gamma}{\\omega'}=\\frac{0{,}4495}{2\\pi}\\ \\Rightarrow\\ \\gamma=1{,}141\\ \\text{s}^{-1}", s: 2 },
      { t: 'Q=\\frac{\\omega_0}{2\\gamma}=\\frac{15{,}995}{2{,}283}=7{,}01', s: 3, cls: 'ok' },
    ])}<div>${res('a) $Q\\approx7$', { s: 3 })}${callout('Es **energía**: $e^{-2\\gamma T\'}$. Si se usa $e^{-\\gamma T\'}$ (amplitud), sale $Q=3{,}5$.', { s: 4, cls: 'bad', style: 'margin-top:22px' })}</div></div>`, [
    ['Ítem a. Primero omega cero, raíz de k sobre m: quince coma nueve nueve cinco. Casi dieciséis.'],
    ['Pierde el cincuenta y nueve coma tres por ciento de la energía por ciclo, así que queda el cuarenta coma siete. La energía cae como e a la menos dos gama t: en un período, e a la menos dos gama T prima es cero coma cuatro cero siete. Gama T prima vale cero coma cuatro cuatro nueve cinco.'],
    ['Con T prima igual a dos pi sobre omega prima, gama sobre omega prima es eso dividido dos pi. Usando omega prima al cuadrado igual a omega cero al cuadrado menos gama al cuadrado, gama vale uno coma uno cuatro uno.'],
    ['Q es omega cero sobre dos gama: siete. El número del enunciado está armado para que dé justo siete.'],
    ['[A] ¿Por qué dos gama y no gama? [P] Porque la energía va con la amplitud al cuadrado: si la amplitud cae con e a la menos gama t, la energía cae con e a la menos dos gama t.'],
  ]),

  K.S('b) Paso 1', 'La amplitud del forzado', `<div style="display:grid;grid-template-columns:660px 1fr;gap:30px;align-items:center">${eqs([
      { t: '\\omega_0^2-\\omega^2=255{,}83-361=-105{,}17', s: 0 },
      { t: '2\\gamma\\omega=2\\cdot1{,}141\\cdot19=43{,}37', s: 0 },
      { t: 'A=\\frac{15/12}{\\sqrt{105{,}17^2+43{,}37^2}}=\\frac{1{,}25}{113{,}76}', s: 1 },
      { t: 'A=0{,}010988\\ \\text{m}\\approx1{,}10\\ \\text{cm}', s: 1, cls: 'ok' },
    ])}
      ${plot({ w: 960, h: 480, x: [10, 24], y: [0, 4.2], ticksX: [12, 16, 19, 22], ticksY: [0, 1.1, 4], fmtX: v => String(v), xl: 'ω (1/s)', yl: 'A (cm)', id: 'os3-a', s: 2,
        curves: [{ f: Aw, n: 700, id: 'os3-ac' }],
        extra: (px, py) => `<circle class="dot" cx="${px(19)}" cy="${py(Aw(19))}" r="12"/><text class="lbl c3" x="${px(19) + 16}" y="${py(Aw(19)) - 14}">ω = 19: 1,10 cm</text>` })}</div>`, [
    ['Ítem b. El motor funcionó un buen rato, así que el bloque estaba en régimen estacionario, oscilando con omega igual a diecinueve. Su amplitud sale de la fórmula general.'],
    ['Omega cero cuadrado menos omega cuadrado es menos ciento cinco; dos gama omega, cuarenta y tres. La raíz de la suma de los cuadrados da ciento trece coma siete seis, y la amplitud, uno coma diez centímetros.'],
    ['En la curva de resonancia estamos del lado derecho del pico: el motor va más rápido que la frecuencia propia, y el bloque oscila casi en contrafase con la fuerza.', `sweep('#os3-a #os3-ac',{dur:2200})`],
  ]),

  K.S('b) Paso 2', 'Dónde estaba el bloque al apagar el motor', `<div style="display:grid;grid-template-columns:540px 1fr;gap:30px;align-items:center">${fase}
      <div>${eqs([
        { t: 'x^2+\\left(\\frac{v}{\\omega}\\right)^2=A^2', s: 0 },
        { t: '\\frac{v}{\\omega}=\\frac{0{,}157}{19}=0{,}826\\ \\text{cm}', s: 1 },
        { t: 'x_0=+\\sqrt{1{,}0988^2-0{,}8263^2}=+0{,}724\\ \\text{cm}', s: 2, cls: 'ok' },
      ])}${callout('"Estirado" ⇒ $x_0>0$; "no por completo" ⇒ $x_0<A$.', { s: 2, cls: 'ok', style: 'margin-top:20px' })}</div></div>`, [
    ['Paso dos: la posición al apagar. En el forzado el bloque hace un movimiento armónico de frecuencia diecinueve. Para un armónico, x al cuadrado más v sobre omega al cuadrado es A al cuadrado: el punto x, v sobre omega, recorre un círculo.'],
    ['V sobre omega es cero coma uno cinco siete sobre diecinueve: cero coma ocho dos seis centímetros. Es menos que uno coma diez, así que el dato es posible.'],
    ['Despejando, x cero es más cero coma siete dos cuatro centímetros: positivo porque el resorte está estirado. [A] ¿El cálculo no da el signo? [P] No, da x cero al cuadrado. El signo lo da la palabra estirado.', `show('#os3-pt',{from:'pop'})`],
  ]),

  K.S('b) Paso 3', 'Las constantes de la libre', `<div class="grid g2" style="align-items:center">${eqs([
      { t: "v_0+\\gamma x_0=0{,}157+1{,}141\\cdot0{,}00724=0{,}16527", s: 0 },
      { t: "A'\\sen\\varphi=-\\frac{0{,}16527}{15{,}954}=-1{,}036\\ \\text{cm}", s: 1 },
      { t: "A'=\\sqrt{0{,}724^2+1{,}036^2}=1{,}264\\ \\text{cm}", s: 2, cls: 'ok' },
      { t: "\\tg\\varphi=-1{,}430,\\ \\cos\\varphi>0\\ \\Rightarrow\\ \\varphi=-0{,}961", s: 3, cls: 'ok' },
    ])}${res("$x=1{,}26\\,e^{-1{,}14t}\\cos(15{,}95t-0{,}96)$ cm", { s: 4, style: 'font-size:.9em' })}</div>`, [
    ['Paso tres: la libre, con omega prima igual a quince coma nueve cinco cuatro y el mismo gama. El término auxiliar es v cero más gama x cero: cero coma uno seis cinco.'],
    ['A prima seno de fi es menos eso sobre omega prima: menos uno coma cero tres seis centímetros. Y A prima coseno de fi es x cero, cero coma siete dos cuatro.'],
    ['La amplitud es la raíz de la suma de los cuadrados: uno coma dos seis centímetros. Mayor que la del forzado, porque ahora oscila más lento con la misma velocidad.'],
    ['Tangente de fi es menos uno coma cuatro tres. Hay dos ángulos posibles; como el coseno es positivo, fi es menos cero coma nueve seis radianes.'],
    ['Queda: x de t igual a uno coma dos seis centímetros, por e a la menos uno coma uno cuatro t, por coseno de quince coma nueve cinco t menos cero coma nueve seis. Origen en el equilibrio, positivo hacia abajo.'],
  ]),

  K.S('b) La oscilación libre', 'x(t) después de apagar el motor', `<div style="display:grid;grid-template-columns:400px 1fr;gap:30px;align-items:center">${bloque('os3-s')}
      ${plot({ w: 1100, h: 500, x: [0, 2.5], y: [-1.4, 1.4], ticksX: [0, 0.394, 0.788, 1.5, 2.5], ticksY: [-1.264, 0, 0.724, 1.264], fmtX: v => String(v).replace('.', ','), fmtY: v => String(v).replace('.', ','), xl: 't (s)', yl: 'x (cm)', id: 'os3-x',
        curves: [{ f: t => 1.264 * Math.exp(-1.141 * t), cls: 'c3 dash', id: 'os3-e1' }, { f: t => -1.264 * Math.exp(-1.141 * t), cls: 'c3 dash', id: 'os3-e2' }, { f: xl, n: 900, id: 'os3-xc' }] })}</div>`, [
    ['Así se ve. Arranca en cero coma siete dos cuatro, bajando, y oscila cada cero coma tres nueve segundos. Por ciclo la amplitud se multiplica por la raíz de cero coma cuatro cero siete: cero coma seis cuatro.', `${morphAnim('#os3-s-r', fr.map(x => resD(290 + 30 * x)))} ${moveAnim('#os3-s-m', fr.map(x => [0, 30 * x]))} ${sweepLin('#os3-x #os3-xc')} sweep('#os3-x #os3-e1, #os3-x #os3-e2',{dur:1500})`],
    ['En dos segundos y medio prácticamente se detuvo: Q igual a siete es un amortiguamiento fuerte. [A] ¿Y por qué no sigue a diecinueve? [P] Porque sin motor oscila con su propia frecuencia, omega prima.'],
  ]),

  K.trampas([
    '**Energía, no amplitud:** $e^{-2\\gamma T\'}=0{,}407$ (con $e^{-\\gamma T\'}$: $Q=3{,}5$).',
    '**$2\\pi/Q$ no sirve:** es para pérdidas chicas (daría $Q=10{,}6$).',
    '**El forzado va con $\\omega=19$:** en $A(\\omega)$ y en $x^2+(v/\\omega)^2=A^2$.',
    "**La libre va con $\\omega'=15{,}95$** y lleva $\\gamma x_0$ (sin él, $A'=1{,}22$ cm).",
    '**Cuadrante de $\\varphi$:** $\\cos\\varphi=x_0/A\'>0$ ⇒ $-0{,}96$, no $2{,}18$.',
  ], [
    ['Las trampas. Primera: el porcentaje es de energía, así que va e a la menos dos gama T prima.'],
    ['Segunda: la aproximación dos pi sobre Q solo sirve si se pierde poco por ciclo. Acá se pierde más de la mitad.'],
    ['Tercera: mientras está el motor, todo va con omega igual a diecinueve.'],
    ['Cuarta: en la libre va omega prima, y el término gama x cero.'],
    ['Y quinta: el cuadrante de fi se elige por el signo del coseno.'],
  ]),

  K.receta([
    "**1.** % de energía ⇒ $\\gamma T'$ ⇒ $\\gamma$ ⇒ $Q=\\omega_0/2\\gamma$.",
    '**2.** Forzado: $A(\\omega)$ con la fórmula general.',
    '**3.** $x_0$ con $x_0^2+(v_0/\\omega)^2=A^2$ y el signo del enunciado.',
    "**4.** Libre: $A'$ y $\\varphi$ con $\\omega'$ y $\\gamma$.",
  ], ['a) $\\gamma=1{,}141$ s⁻¹; $Q\\approx7$', 'b) $A_{forz}=1{,}10$ cm; $x_0=+0{,}724$ cm', "$x(t)=1{,}26\\,e^{-1{,}14t}\\cos(15{,}95t-0{,}96)$ cm"], [
    ['La receta. Uno: del porcentaje de energía, gama y Q.'],
    ['Dos: la amplitud del forzado.'],
    ['Tres: la posición al apagar, con el círculo de fase.'],
    ['Cuatro: las constantes de la libre.'],
    ['Resultados: Q igual a siete, y la oscilación libre con uno coma dos seis centímetros de amplitud.'],
  ]),
];
