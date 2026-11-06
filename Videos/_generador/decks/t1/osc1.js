// Osc 1 · 1P 16/9/2023, ej. 4: péndulo L = 1,6 m forzado en resonancia de amplitud (ω = 2,496 s⁻¹); en t = 0, θ = +0,2 rad y se apaga el motor.
// Resultados verificados (soluciones/Osc1.py): ω0 = 2,5 s⁻¹; γ = 0,09996 ≈ 0,1 s⁻¹; ω' = 2,498 s⁻¹ (T' = 2,515 s);
// a) θ(t) = 0,2002 e^(−0,1t) cos(2,498 t − 0,040) [rad, s]; b) ceros de θ' en t = kπ/ω': t1 = 1,258 s (θ = −0,176), t2 = 2,515 s (θ = +0,156).
// Resolución del PDF: γ = 0,01 (le falta la raíz) ⇒ exponente y fase mal; su t2 = 2,515 s coincide.
const { md, ul, card, callout, eqs, res, plot } = require('../../lib');
const { seccion } = require('../common');
const { kit, rotAnim, sweepLin, moveAnim } = require('../fx');

const SEC = 'Osc 1 · Péndulo: forzado → libre';
const B = 'b-osc';
const K = kit(SEC, B);
const w0 = 2.5, g = 0.09996, wp = 2.498, A = 0.2002, ph = -0.04, wf = 2.496;
const th = t => A * Math.exp(-g * t) * Math.cos(wp * t + ph);
const thd = t => -A * Math.exp(-g * t) * (g * Math.cos(wp * t + ph) + wp * Math.sin(wp * t + ph));
const R2D = 180 / Math.PI;

// péndulo: pivote (PX, PY), largo 380
const PX = 260, PY = 70;
const pendulo = (id, o = {}) => `<svg class="os1-svg" viewBox="0 0 520 560" style="${o.style || 'width:470px'}">
  <line x1="120" y1="${PY}" x2="400" y2="${PY}" class="os1-techo"/>
  ${Array.from({ length: 8 }, (_, i) => `<line x1="${130 + i * 36}" y1="${PY}" x2="${116 + i * 36}" y2="${PY - 16}" class="os1-techo2"/>`).join('')}
  <line x1="${PX}" y1="${PY}" x2="${PX}" y2="${PY + 420}" class="os1-vert"/>
  <g id="${id}"><line x1="${PX}" y1="${PY}" x2="${PX}" y2="${PY + 380}" class="os1-rod"/><circle cx="${PX}" cy="${PY + 380}" r="30" class="os1-bob"/></g>
  <g id="${id}-mot"${o.motor === false ? ' class="pending"' : ''}><circle cx="${PX}" cy="${PY}" r="26" class="os1-mot"/><text x="${PX}" y="${PY + 9}" text-anchor="middle" class="os1-mott">M</text></g>
  ${o.extra || ''}</svg>`;
const rayo = `<g id="os1-rayo" class="pending"><path d="M330,-20 L300,40 L322,40 L292,100 L346,30 L322,30 L350,-20 Z" style="fill:var(--warn)"/></g>
  <g id="os1-x" class="pending"><line x1="${PX - 30}" y1="${PY - 30}" x2="${PX + 30}" y2="${PY + 30}" class="os1-cross"/><line x1="${PX + 30}" y1="${PY - 30}" x2="${PX - 30}" y2="${PY + 30}" class="os1-cross"/></g>`;
// ángulos (grados de pantalla: θ > 0 hacia la derecha ⇒ rotate(−θ))
const forz = Array.from({ length: 151 }, (_, i) => { const t = -2.25 * 2 * Math.PI / wf + i / 150 * 2.25 * 2 * Math.PI / wf; return -0.2 * Math.cos(wf * t) * R2D; });
const libre = Array.from({ length: 401 }, (_, i) => -th(i / 400 * 10) * R2D);

// gráfico θ(t) 0–10 s con punto que lo recorre
let PXF, PYF;
const graf = plot({ w: 1100, h: 520, x: [0, 10], y: [-0.22, 0.22], ticksX: [0, 2, 4, 6, 8, 10], ticksY: [-0.2, 0, 0.2], xl: 't (s)', yl: 'θ (rad)', id: 'os1-g',
  curves: [{ f: t => 0.2 * Math.exp(-g * t), cls: 'c3 dash', id: 'os1-e1' }, { f: t => -0.2 * Math.exp(-g * t), cls: 'c3 dash', id: 'os1-e2' }, { f: th, n: 800, id: 'os1-c' }],
  extra: (px, py) => { PXF = px; PYF = py; return `<circle id="os1-dot" class="dot pending" cx="0" cy="0" r="12"/>`; } });
const dotPts = Array.from({ length: 401 }, (_, i) => { const t = i / 400 * 10; return [PXF(t), PYF(th(t))]; });

// gráfico de la velocidad con sus ceros
const gv = plot({ w: 1000, h: 470, x: [0, 4], y: [-0.55, 0.55], ticksX: [0, 1.258, 2.515, 3.773], ticksY: [-0.5, 0, 0.5], fmtX: v => ({ 0: '0', 1.258: '1,258', 2.515: '2,515', 3.773: '3,773' })[v], xl: 't (s)', yl: "θ' (rad/s)", id: 'os1-v', s: 2,
  curves: [{ f: thd, n: 600, cls: 'c2', id: 'os1-vc' }],
  extra: (px, py) => [[0, '0'], [1.2576, '1ra'], [2.5153, '2da'], [3.7729, '']].map(([t, l], i) => `<circle class="dot${i ? ' pending' : ''}" id="os1-z${i}" cx="${px(t)}" cy="${py(0)}" r="13"/>${l && i ? `<text class="lbl c3 pending" id="os1-zt${i}" x="${px(t)}" y="${py(0) - 26}" style="text-anchor:middle">${l}</text>` : ''}`).join('') });

const CSS = `.os1-svg{overflow:visible;font-family:"Segoe UI",Arial,sans-serif}
  .os1-techo{stroke:#8fa6c4;stroke-width:5} .os1-techo2{stroke:#8fa6c4;stroke-width:3}
  .os1-vert{stroke:#33476a;stroke-width:3;stroke-dasharray:10 10}
  .os1-rod{stroke:#dfe7f2;stroke-width:6} .os1-bob{fill:var(--osc);stroke:#0d1522;stroke-width:4}
  .os1-mot{fill:#2b3d5c;stroke:var(--warn);stroke-width:4} .os1-mott{fill:var(--warn);font-size:26px;font-weight:800}
  .os1-cross{stroke:var(--bad);stroke-width:8;stroke-linecap:round}
  .os1-lbl{fill:var(--ink);font-size:28px;font-weight:700}`;

module.exports = [
  seccion('Osc 1', 'Péndulo: forzado → libre', 'Primer parcial del 16/9/2023 · ejercicio 4',
    'Ejercicio de oscilaciones número uno: primer parcial del dieciséis de septiembre de dos mil veintitrés, ejercicio cuatro. Un péndulo forzado con la máxima amplitud posible; de golpe se apaga el motor y queda oscilando libre.'),

  Object.assign(K.enunciado('Osc1.jpg', ['@1 $m=0{,}1$ kg', '@1 $L=1{,}6$ m', '@1 $g=10$ m/s²', '@2 $\\omega=2{,}496$ s⁻¹: **máxima amplitud**', '@3 $t=0$: $\\theta=+0{,}2$ rad (extremo)', '@3 se apaga el motor ⇒ libre'], [
    ['Este es el enunciado. Vamos con los datos.'],
    ['Una masa de cien gramos cuelga de un péndulo de uno coma seis metros. La gravedad es diez.'],
    ['Un motor en el punto de suspensión lo fuerza con omega igual a dos coma cuatro nueve seis por segundo, y con esa frecuencia alcanza la máxima amplitud posible. Esa frase es la clave del ejercicio.'],
    ['En t igual a cero el péndulo está en su máxima amplitud, más cero coma dos radianes, y cae un rayo que apaga el motor. Desde ahí oscila libre.'],
    ['Piden la función theta de t desde ese instante, y el tiempo en que la velocidad se anula por segunda vez.'],
  ], { maxH: 400 }), { css: CSS }),

  K.molde('Ejercicio 4 de la hoja: **cambio de régimen forzado → libre** (18/10/25). La nota del 3: **$\\omega_{RA}^2=\\omega_0^2-2\\gamma^2$**. Y el 1: $A$ y $\\varphi_0$ con $x_0$ y $v_0$.',
    ['En el cambio, **$x$ y $v$ no saltan**', 'El $\\gamma$ es el mismo antes y después', 'Se corta en un **extremo**: $v_0=0$'],
    ['Al revés que el 4: dan el forzado y piden el **libre**', 'Es un péndulo: $\\omega_0=\\sqrt{g/L}$', '"Máxima amplitud" ⇒ resonancia de **amplitud**'],
    [['El molde es el ejercicio cuatro de la hoja: un cambio de régimen de forzado a libre. Además, la nota del tres, con la frecuencia de resonancia de amplitud, y el uno, para las constantes.'],
     ['Se repite lo esencial: en el cambio de régimen, la posición y la velocidad no saltan, y el gama es el mismo. Y como se corta en un extremo, la velocidad inicial es cero.'],
     ['Cambia que acá es al revés del cuatro: nos dan el forzado y piden el libre. Y que es un péndulo, así que omega cero es raíz de g sobre L.']]),

  K.S('Teoría', 'Dos resonancias distintas', `<div style="display:grid;grid-template-columns:640px 1fr;gap:30px;align-items:center">
      ${eqs([
        { t: 'A(\\omega)=\\frac{F_0/m}{\\sqrt{(\\omega_0^2-\\omega^2)^2+(2\\gamma\\omega)^2}}', s: 0 },
        { t: '\\text{máx. amplitud: }\\omega_{RA}=\\sqrt{\\omega_0^2-2\\gamma^2}', s: 1, cls: 'hl' },
        { t: '\\text{máx. potencia: }\\omega_{RP}=\\omega_0', s: 2 },
      ])}
      ${plot({ w: 1000, h: 500, x: [1.8, 3.2], y: [0, 2.3], ticksX: [2, 3], ticksY: [0, 1, 2], xl: 'ω', yl: 'A(ω)', id: 'os1-r', s: 0,
        curves: [{ f: x => 6.25 / Math.sqrt((6.25 - x * x) ** 2 + (0.9 * x) ** 2) / 1.4, n: 600, id: 'os1-rc' }],
        extra: (px, py) => { const ra = Math.sqrt(6.25 - 2 * 0.45 ** 2), A = x => 6.25 / Math.sqrt((6.25 - x * x) ** 2 + (0.9 * x) ** 2) / 1.4; return `<line class="mk" x1="${px(ra)}" y1="${py(A(ra))}" x2="${px(ra)}" y2="${py(0)}"/><text class="lbl c3" x="${px(ra) - 10}" y="${py(0.25)}" style="text-anchor:end">ω_RA</text><line x1="${px(2.5)}" y1="${py(2.15)}" x2="${px(2.5)}" y2="${py(0)}" style="stroke:var(--accent2);stroke-width:3;stroke-dasharray:6 8"/><text class="lbl c2" x="${px(2.5) + 10}" y="${py(0.25)}">ω₀</text><text class="lbl" x="${px(3.18)}" y="${py(2.15)}" style="text-anchor:end;font-size:22px;fill:var(--muted)">(γ exagerado para que se vea)</text>`; } })}</div>`, [
    ['Un oscilador forzado, en régimen estacionario, oscila con la frecuencia de la fuerza, con esta amplitud.', `sweep('#os1-r #os1-rc',{dur:2200})`],
    ['La amplitud es máxima donde el denominador es mínimo. Derivando, sale omega de resonancia de amplitud igual a raíz de omega cero al cuadrado menos dos gama al cuadrado. Es un poco menor que omega cero.'],
    ['Y la potencia media es máxima justo en omega cero. Son dos cosas distintas. [A] ¿Cómo sé cuál es cuál? [P] Por las palabras del enunciado: máxima amplitud es la primera, máxima potencia es la segunda. Acá dice máxima amplitud.'],
  ]),

  K.S('Pasos 1 a 3', 'ω₀, γ y la frecuencia de la libre', `<div class="grid g2" style="align-items:center">${eqs([
      { t: '\\omega_0=\\sqrt{g/L}=\\sqrt{10/1{,}6}=2{,}5\\ \\text{s}^{-1}', s: 0 },
      { t: '2\\gamma^2=\\omega_0^2-\\omega_{RA}^2=6{,}25-6{,}230016=0{,}019984', s: 1 },
      { t: '\\gamma=\\sqrt{0{,}009992}=0{,}09996\\approx0{,}1\\ \\text{s}^{-1}', s: 2, cls: 'ok' },
      { t: "\\omega'=\\sqrt{\\omega_0^2-\\gamma^2}=\\sqrt{6{,}240008}=2{,}498\\ \\text{s}^{-1}", s: 3, cls: 'ok' },
    ])}<div>${callout('Sin la raíz sale $\\gamma=0{,}01$: es el error de la resolución del PDF.', { s: 2, cls: 'bad' })}
      ${callout("$\\omega_{RA}=2{,}496\\ <\\ \\omega'=2{,}498\\ <\\ \\omega_0=2{,}5$", { s: 4, style: 'margin-top:24px' })}</div></div>`, [
    ['Paso uno: omega cero del péndulo, raíz de g sobre L. Diez sobre uno coma seis es seis coma veinticinco, y la raíz, dos coma cinco por segundo. [A] ¿No depende de la masa? [P] No: el peso es proporcional a la masa, y la inercia también. Se cancelan.'],
    ['Paso dos: de la resonancia de amplitud despejamos gama. Dos gama al cuadrado es omega cero al cuadrado menos dos coma cuatro nueve seis al cuadrado: cero coma cero uno nueve nueve ocho cuatro.'],
    ['Gama al cuadrado es la mitad, y gama es la raíz: cero coma uno por segundo. Ojo, que es fácil olvidarse la raíz y poner cero coma cero uno: justo eso hace la resolución del PDF.'],
    ['Paso tres: cuando se apaga el motor, el péndulo oscila con su propia frecuencia amortiguada, omega prima, raíz de omega cero al cuadrado menos gama al cuadrado. Da dos coma cuatro nueve ocho.'],
    ['Quedan tres frecuencias muy parecidas, en este orden. La que vale después del rayo es omega prima.'],
  ]),

  K.S('Cambio de régimen', 'Se apaga el motor justo en el extremo', `<div style="display:grid;grid-template-columns:520px 1fr;gap:40px;align-items:center">
      ${pendulo('os1-p1', { extra: rayo })}
      ${eqs([
        { t: '\\theta(0)=+0{,}2\\ \\text{rad}', s: 1 },
        { t: "\\theta'(0)=0\\quad\\text{(extremo)}", s: 1 },
        { t: '\\gamma=0{,}1\\ \\text{s}^{-1}\\ \\text{(el mismo)}', s: 2 },
        { t: "\\theta(t)=A\\,e^{-\\gamma t}\\cos(\\omega' t+\\varphi)", s: 3, cls: 'hl' },
      ])}</div>`, [
    ['Veamos el momento del cambio. El péndulo oscila forzado, con amplitud cero coma dos radianes. Llega al extremo derecho y, justo ahí, cae el rayo y el motor se apaga.', `${rotAnim('#os1-p1', PX, PY, forz, { menos: 1200 })} show('#os1-rayo',{delay:talk(1100),from:'pop'}); show('#os1-x',{delay:talk(900),from:'pop'})`],
    ['En ese instante la posición es más cero coma dos radianes, y la velocidad es cero, porque está en el extremo. Ninguna de las dos puede saltar de golpe.', `S.querySelector('#os1-p1').style.transformBox='view-box';S.querySelector('#os1-p1').style.transformOrigin='${PX}px ${PY}px';S.querySelector('#os1-p1').style.transform='rotate(${(-0.2 * R2D).toFixed(2)}deg)'`],
    ['El rozamiento es el mismo, así que gama sigue siendo cero coma uno.'],
    ['Desde ahí el péndulo oscila libre y subamortiguado: A, por e a la menos gama t, por coseno de omega prima t más fi. Faltan A y fi, que salen de las condiciones iniciales. [A] ¿Por qué subamortiguado? [P] Porque gama, cero coma uno, es mucho menor que omega cero, dos coma cinco.'],
  ]),

  K.S('a) Constantes', 'Amplitud y fase', `<div class="grid g2" style="align-items:center">${eqs([
      { t: "\\frac{v_0+\\gamma\\theta_0}{\\omega'}=\\frac{0{,}1\\cdot0{,}2}{2{,}498}=0{,}008", s: 0 },
      { t: "A=\\sqrt{\\theta_0^2+\\left(\\frac{v_0+\\gamma\\theta_0}{\\omega'}\\right)^2}=0{,}2002\\ \\text{rad}", s: 1 },
      { t: "\\tg\\varphi=-\\frac{v_0+\\gamma\\theta_0}{\\theta_0\\,\\omega'}=-\\frac{\\gamma}{\\omega'}=-0{,}040", s: 2 },
      { t: '\\varphi=-0{,}040\\ \\text{rad}', s: 2, cls: 'ok' },
    ])}<div>${res("$\\theta(t)=0{,}2002\\,e^{-0{,}1t}\\cos(2{,}498\\,t-0{,}040)$", { s: 3 })}
      ${callout('Chequeo: $\\theta(0)=0{,}2002\\cos(-0{,}04)=0{,}2$ ✓', { s: 3, cls: 'ok', style: 'margin-top:24px' })}</div></div>`, [
    ['Las constantes salen de las fórmulas del ejercicio uno de la hoja. Primero, el término auxiliar: v cero más gama theta cero, sobre omega prima. Cero coma cero dos sobre dos coma cuatro nueve ocho: cero coma cero cero ocho.'],
    ['La amplitud es la raíz de theta cero al cuadrado más ese término al cuadrado: cero coma dos cero cero dos radianes. Casi cero coma dos.'],
    ['Y la tangente de fi es menos gama sobre omega prima: menos cero coma cero cuatro. Fi vale menos cero coma cero cuatro radianes. [A] ¿Por qué no es cero, si arranca en el extremo? [P] Porque la exponencial también cambia con el tiempo. Para que la velocidad dé justo cero en t igual a cero, la fase se corre un poquito.'],
    ['Queda: theta de t igual a cero coma dos cero cero dos, por e a la menos cero coma uno t, por coseno de dos coma cuatro nueve ocho t menos cero coma cero cuatro. Theta en radianes y t en segundos.'],
  ]),

  K.S('a) La oscilación libre', 'θ(t): el péndulo y su gráfico', `<div style="display:grid;grid-template-columns:420px 1fr;gap:30px;align-items:center">
      ${pendulo('os1-p2', { motor: false, style: 'width:400px' })}<div>${graf}</div></div>`, [
    ['Veámoslo andar. El péndulo arranca en el extremo y oscila con período de dos coma cinco segundos, perdiendo amplitud de a poco. La curva es el coseno, dentro de la envolvente punteada, cero coma dos por e a la menos cero coma uno t.', `${rotAnim('#os1-p2', PX, PY, libre)} ${sweepLin('#os1-g #os1-c')} ${moveAnim('#os1-dot', dotPts)} sweep('#os1-g #os1-e1, #os1-g #os1-e2',{dur:1500})`],
    ['En diez segundos la amplitud baja a cero coma dos por e a la menos uno: unos cero coma cero siete radianes. [A] ¿Entonces nunca se detiene? [P] En el modelo, la amplitud tiende a cero sin llegar nunca; en la práctica, se para.'],
  ]),

  K.S('b) Velocidad nula', '¿Cuándo se anula la velocidad?', `<div style="display:grid;grid-template-columns:700px 1fr;gap:30px;align-items:center">
      ${eqs([
        { t: "\\theta'=-A e^{-\\gamma t}\\left[\\gamma\\cos(\\cdot)+\\omega'\\sen(\\cdot)\\right]=0", s: 0 },
        { t: "\\tg(\\omega't+\\varphi)=-\\frac{\\gamma}{\\omega'}=\\tg\\varphi", s: 1 },
        { t: "\\omega't=k\\pi\\ \\Rightarrow\\ t_k=\\frac{k\\pi}{\\omega'}", s: 1, cls: 'hl' },
        { t: "t_2=\\frac{2\\pi}{2{,}498}=2{,}515\\ \\text{s}", s: 4, cls: 'ok' },
      ])}${gv}</div>`, [
    ['Ítem b. Derivamos theta: queda menos A e a la menos gama t, por gama coseno más omega prima seno, y lo igualamos a cero.'],
    ['Eso pide tangente de omega prima t más fi igual a menos gama sobre omega prima. ¡Pero eso es justo tangente de fi! Entonces omega prima t tiene que ser un múltiplo de pi: t igual a k pi sobre omega prima.'],
    ['En el gráfico de la velocidad, el primer cero es el instante inicial, que no cuenta.', `sweep('#os1-v #os1-vc',{dur:2400})`],
    ['La primera vez, después de t igual a cero, es pi sobre omega prima: uno coma dos cinco ocho segundos, en el extremo izquierdo.', `show('#os1-z1, #os1-zt1',{from:'pop'})`],
    ['Y la segunda es dos pi sobre omega prima: dos coma cinco uno cinco segundos, un período completo. El péndulo vuelve al lado derecho, con theta igual a cero coma uno cinco seis radianes. [A] ¿Y si cuento el cero como primera vez? [P] Dice luego del instante inicial: el cero no cuenta.', `show('#os1-z2, #os1-zt2',{from:'pop'}); show('#os1-z3',{delay:600})`],
  ]),

  K.trampas([
    '**"Máxima amplitud" ≠ "máxima potencia":** $\\omega_{RA}=\\sqrt{\\omega_0^2-2\\gamma^2}$, no $\\omega_0$.',
    '**La raíz al despejar $\\gamma$:** 0,1 y no 0,01 (error de la resolución del PDF).',
    "**En la libre va $\\omega'=2{,}498$**, no la del motor ni $\\omega_0$.",
    '**$\\varphi\\neq0$** aunque arranque en el extremo: $\\tg\\varphi=-\\gamma/\\omega\'$.',
    "**Ceros de la velocidad:** $t=k\\pi/\\omega'$; no donde el coseno vale ±1 (daría 2,531 s).",
  ], [
    ['Las trampas. Primera: máxima amplitud y máxima potencia son resonancias distintas.'],
    ['Segunda: la raíz al despejar gama. Sin ella sale cero coma cero uno, como en la resolución del PDF, y el exponente y la fase quedan mal.'],
    ['Tercera: después del rayo la frecuencia es omega prima, no la del motor.'],
    ['Cuarta: la fase no es cero aunque arranque en el extremo.'],
    ['Y quinta: la velocidad se anula en k pi sobre omega prima. Si buscás donde el coseno vale uno, te da dos coma cinco tres uno segundos, un poquito mal.'],
  ]),

  K.receta([
    '**1.** $\\omega_0=\\sqrt{g/L}$.',
    '**2.** "Máxima amplitud" ⇒ $\\gamma=\\sqrt{(\\omega_0^2-\\omega_{RA}^2)/2}$.',
    "**3.** Libre: $\\omega'=\\sqrt{\\omega_0^2-\\gamma^2}$.",
    '**4.** Condiciones iniciales: $\\theta_0=0{,}2$, $v_0=0$ ⇒ $A$ y $\\varphi$.',
    "**5.** $\\theta'=0$ ⇒ $t_k=k\\pi/\\omega'$.",
  ], ['$\\omega_0=2{,}5$ s⁻¹; $\\gamma=0{,}1$ s⁻¹; $\\omega\'=2{,}498$ s⁻¹', 'a) $\\theta=0{,}2002\\,e^{-0{,}1t}\\cos(2{,}498t-0{,}040)$', 'b) $t_2=2\\pi/\\omega\'=2{,}515$ s ($t_1=1{,}258$ s)'], [
    ['La receta. Uno: omega cero del péndulo.'],
    ['Dos: con la resonancia de amplitud, gama.'],
    ['Tres: la frecuencia de la oscilación libre.'],
    ['Cuatro: con la posición y la velocidad iniciales, la amplitud y la fase.'],
    ['Cinco: los ceros de la velocidad, cada medio período.'],
    ['Resultados: theta de t con gama cero coma uno y omega prima dos coma cuatro nueve ocho, y t dos igual a dos coma cinco uno cinco segundos.'],
  ]),
];
