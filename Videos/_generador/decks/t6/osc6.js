// Osc 6 · recuperatorio 1P 1C 2022, ej. 4: M = 0,2 kg, k = 25 N/m, resorte de 28 cm en equilibrio, b = 0,55 kg/s; se desprende el 80 % de la masa.
// Resultados verificados (soluciones/Osc6.py): ℓ0 = 20 cm; m = 0,04 kg ⇒ ℓeq = 21,6 cm; x0 = +6,4 cm (↓), v0 = 0; ω0 = 25, γ = 6,875, ω' = 24,04 s⁻¹;
// φ = −0,279 rad, A = 6,66 cm: x(t) = 6,66 e^(−6,875t) cos(24,04t − 0,279) cm; T' = 0,2614 s ⇒ x(T') = 1,06 cm ⇒ largo 22,66 cm; pierde 97,3 % de la energía.
const { md, ul, card, callout, eqs, res, plot } = require('../../lib');
const { seccion } = require('../common');
const { kit, morphAnim, moveAnim, sweepLin } = require('../fx');

const SEC = 'Osc 6 · Se rompe la masa en un fluido';
const B = 'b-osc';
const K = kit(SEC, B);
const xl = t => 6.657 * Math.exp(-6.875 * t) * Math.cos(24.036 * t - 0.279);
// resorte: techo en 40; 1 cm = 10 px; largo ℓ (cm) ⇒ extremo en 40 + 10ℓ
const XC = 210;
const resD = top => { let d = `M${XC},40 L${XC},60`; const n = 14, a = 60, b = top - 14; for (let i = 1; i <= n; i++) d += ` L${XC + (i % 2 ? 22 : -22)},${(a + (b - a) * (i - 0.5) / n).toFixed(1)}`; return d + ` L${XC},${b.toFixed(1)} L${XC},${top.toFixed(1)}`; };
const L = l => 40 + 10 * l;
const fig = id => `<svg class="os6-svg" viewBox="0 0 520 520" style="width:420px">
  <rect x="60" y="14" width="300" height="26" rx="6" class="os6-techo"/><rect x="40" y="40" width="380" height="460" rx="12" class="os6-fl"/><text x="400" y="490" text-anchor="end" class="os6-tk">fluido: b = 0,55 kg/s</text>
  ${[[20, 'ℓ₀ = 20'], [21.6, 'eq. nuevo 21,6'], [28, '28 (inicio)']].map(([l, t]) => `<line x1="280" y1="${L(l)}" x2="420" y2="${L(l)}" class="os6-ref"/><text x="425" y="${L(l) + 8}" class="os6-tk">${t}</text>`).join('')}
  <path id="${id}-r" class="os6-res" d="${resD(L(28))}"/>
  <g id="${id}-m"><rect x="${XC - 40}" y="${L(28)}" width="80" height="44" rx="8" class="os6-m"/></g>
  <g id="${id}-c" class="pending"><rect x="${XC - 40}" y="${L(28) + 44}" width="80" height="60" rx="8" class="os6-mc"/><text x="${XC}" y="${L(28) + 84}" text-anchor="middle" class="os6-mt">80 %</text></g>
  <text x="60" y="${L(28) + 30}" class="os6-tk">x ↓ (+)</text></svg>`;
const fr = Array.from({ length: 241 }, (_, i) => xl(i / 240 * 0.6));
const CSS = `.os6-svg{overflow:visible;font-family:"Segoe UI",Arial,sans-serif}
  .os6-techo{fill:#2b3d5c;stroke:#8fa6c4;stroke-width:3} .os6-fl{fill:rgba(76,140,255,.08);stroke:rgba(76,140,255,.35);stroke-width:2} .os6-tk{fill:var(--dim);font-size:20px}
  .os6-ref{stroke:#4a6286;stroke-width:2;stroke-dasharray:6 6} .os6-res{fill:none;stroke:#dfe7f2;stroke-width:5;stroke-linejoin:round}
  .os6-m{fill:var(--osc);stroke:#0d1522;stroke-width:4} .os6-mc{fill:#5a6f94;stroke:#0d1522;stroke-width:3} .os6-mt{fill:#fff;font-size:22px;font-weight:800}`;

module.exports = [
  seccion('Osc 6', 'Se rompe la masa en un fluido', 'Recuperatorio 1P 1C 2022 · ejercicio 4',
    'Ejercicio de oscilaciones número seis: recuperatorio del primer parcial del primer cuatrimestre de dos mil veintidós, ejercicio cuatro. Un objeto cuelga de un resorte dentro de un fluido; de golpe se desprende el ochenta por ciento de su masa y lo que queda oscila amortiguado.'),

  Object.assign(K.enunciado('Osc6.jpg', ['@1 $M=0{,}2$ kg, $k=25$ N/m', '@1 resorte de 28 cm en equilibrio', '@2 fluido: $b=0{,}55$ kg/s; $g=10$', '@2 se desprende el **80 %** ⇒ queda $m=0{,}04$ kg', '@3 a) $x(t)$ con origen y sentido; b) largo tras una oscilación y energía perdida'], [
    ['Este es el enunciado. Vamos con los datos.'],
    ['Un objeto de doscientos gramos cuelga de un resorte de veinticinco newton por metro; en equilibrio, el resorte mide veintiocho centímetros.'],
    ['Está dentro de un fluido con b igual a cero coma cincuenta y cinco kilos por segundo. De golpe se desprende el ochenta por ciento de la masa: quedan cuarenta gramos.'],
    ['Piden x de t, aclarando origen y sentido, y el largo del resorte después de una oscilación, con la energía perdida.'],
  ], { maxH: 430 }), { css: CSS }),

  K.molde('Ejercicio 1 de la hoja: **amortiguado, se despega una masa** (Recu 7/6/25). Allá quedaba el 80 %; acá **queda el 20 %**.',
    ['Largo natural con el equilibrio inicial', 'Nuevo equilibrio con la masa que queda', '$x_0$ = distancia al nuevo equilibrio; $v_0=0$', "$A$ y $\\varphi$ con $x_0$, $v_0$, $\\gamma$, $\\omega'$"],
    ['$\\gamma$ sale de $b$: $\\gamma=b/2m$', 'Amortiguamiento fuerte: $\\varphi$ y $A$ cambian bastante', 'b) pide largo **y** energía'],
    [['El molde es el ejercicio uno de la hoja: una masa que se despega. Ojo: allá quedaba la más grande; acá queda solo el veinte por ciento.'],
     ['Se repite el procedimiento: largo natural, nuevo equilibrio, condición inicial respecto del nuevo equilibrio, y amplitud y fase con las fórmulas de siempre.'],
     ['Cambia que gama sale de b, y que el amortiguamiento es fuerte: la fase no es despreciable.']]),

  K.S('Pasos 1 a 3', 'Equilibrios y condición inicial', `<div style="display:grid;grid-template-columns:440px 1fr;gap:30px;align-items:center">${fig('os6-f')}
      ${eqs([
        { t: '\\ell_0=28-\\frac{Mg}{k}=28-8=20\\ \\text{cm}', s: 0 },
        { t: '\\ell_{eq}=20+\\frac{mg}{k}=20+1{,}6=21{,}6\\ \\text{cm}', s: 1 },
        { t: 'x_0=28-21{,}6=+6{,}4\\ \\text{cm}\\ (\\downarrow),\\quad v_0=0', s: 2, cls: 'hl' },
      ])}</div>`, [
    ['Paso uno: el largo natural. Con los doscientos gramos, el resorte se estira M g sobre k: ocho centímetros. Sin carga mediría veinte.'],
    ['Paso dos: con los cuarenta gramos que quedan, el estiramiento es uno coma seis centímetros. El nuevo equilibrio está en veintiuno coma seis.', `(()=>{const c=S.querySelector('#os6-f-c');c.classList.remove('pending');c.style.opacity=0;c.animate([{opacity:1,transform:'translateY(0)'},{opacity:1,transform:'translateY(0)',offset:.4},{opacity:0,transform:'translateY(200px)'}],{duration:2400,easing:'ease-in',fill:'backwards'});})()`],
    ['Paso tres: el origen va en el nuevo equilibrio, con x positivo hacia abajo. Justo después de la rotura el objeto sigue en veintiocho: x cero es más seis coma cuatro centímetros, y la velocidad es cero. [A] ¿Por qué no el origen en veintiocho? [P] Porque el movimiento oscila alrededor del nuevo equilibrio: ahí va el origen.'],
  ]),

  K.S('a) x(t)', 'Parámetros, amplitud y fase', `<div class="grid g2" style="align-items:center">${eqs([
      { t: '\\omega_0=\\sqrt{25/0{,}04}=25\\quad\\gamma=\\frac{b}{2m}=\\frac{0{,}55}{0{,}08}=6{,}875', s: 0 },
      { t: "\\omega'=\\sqrt{625-47{,}27}=24{,}04\\ \\text{s}^{-1}", s: 1 },
      { t: "\\tg\\varphi=-\\frac{\\gamma}{\\omega'}=-0{,}286\\ \\Rightarrow\\ \\varphi=-0{,}279", s: 2 },
      { t: 'A=\\frac{x_0}{\\cos\\varphi}=\\frac{6{,}4}{0{,}9615}=6{,}66\\ \\text{cm}', s: 2 },
    ])}<div>${res('$x=6{,}66\\,e^{-6{,}875t}\\cos(24{,}04t-0{,}279)$ cm', { s: 3, style: 'font-size:.9em' })}${callout('Origen en el nuevo equilibrio (21,6 cm), $x$ positivo hacia abajo.', { s: 3, style: 'margin-top:20px' })}</div></div>`, [
    ['Ahora los parámetros, con la masa que queda. Omega cero es raíz de veinticinco sobre cero coma cero cuatro: veinticinco. Gama es b sobre dos m: seis coma ocho siete cinco. Es menor que omega cero: subamortiguado.'],
    ['Omega prima es veinticuatro coma cero cuatro.'],
    ['La fase: tangente de fi igual a menos gama sobre omega prima, menos cero coma dos ocho seis, y fi menos cero coma dos siete nueve radianes. La amplitud es x cero sobre coseno de fi: seis coma seis seis centímetros. [A] ¿No puedo poner A igual a seis coma cuatro y fi cero? [P] Acá no: el amortiguamiento es fuerte y la diferencia se nota.'],
    ['Queda x de t igual a seis coma seis seis centímetros, por e a la menos seis coma ocho siete cinco t, por coseno de veinticuatro coma cero cuatro t menos cero coma dos siete nueve.'],
  ]),

  K.S('b) Una oscilación', 'El largo y la energía después de T′', `<div style="display:grid;grid-template-columns:440px 1fr;gap:30px;align-items:center">${fig('os6-g')}
      <div>${eqs([
        { t: "T'=\\frac{2\\pi}{24{,}04}=0{,}2614\\ \\text{s};\\quad e^{-\\gamma T'}=0{,}1658", s: 1 },
        { t: "x(T')=6{,}4\\cdot0{,}1658=1{,}06\\ \\text{cm}\\ \\Rightarrow\\ 21{,}6+1{,}06=22{,}66\\ \\text{cm}", s: 2 },
        { t: "\\frac{E(T')}{E_0}=e^{-2\\gamma T'}=0{,}0275\\ \\Rightarrow\\ \\text{pierde }97{,}3\\ \\%", s: 3, cls: 'ok' },
      ])}</div></div>`, [
    ['Veámoslo oscilar: arranca en veintiocho y se frena muy rápido.', `S.querySelector('#os6-g-c').remove(); ${morphAnim('#os6-g-r', fr.map(x => resD(L(21.6 + x))))} ${moveAnim('#os6-g-m', fr.map(x => [0, 10 * (x - 6.4)]))}`],
    ['El período es dos pi sobre omega prima: cero coma dos seis segundos. En ese tiempo la amplitud se multiplica por e a la menos gama T prima: cero coma uno seis seis.'],
    ['Después de un período la fase vuelve a la inicial: x vale seis coma cuatro por cero coma uno seis seis, uno coma cero seis centímetros. El resorte mide veintiuno coma seis más eso: veintidós coma sesenta y seis centímetros.'],
    ['Y la energía va con el cuadrado: queda el dos coma setenta y cinco por ciento, así que se pierde el noventa y siete coma tres. [A] ¿Sumo al largo natural? [P] No: al nuevo equilibrio, que es el origen.'],
  ]),

  K.trampas([
    '**Queda el 20 %:** $m=0{,}04$ kg (no 0,16).',
    '**Origen en el nuevo equilibrio** (21,6 cm), con el sentido aclarado.',
    '**$\\gamma=b/2m$** con la masa que queda.',
    "**Período $T'=2\\pi/\\omega'$** y fase $\\varphi=-0{,}279$ (no despreciable).",
    "**Energía con $e^{-2\\gamma T'}$**; el largo se suma al nuevo equilibrio.",
  ], [
    ['Las trampas. Primera: queda el veinte por ciento, cuarenta gramos.'],
    ['Segunda: el origen en el nuevo equilibrio.'],
    ['Tercera: gama es b sobre dos m, con la masa que queda.'],
    ['Cuarta: el período amortiguado y la fase, que acá pesan.'],
    ['Y quinta: la energía con dos gama, y el largo sumado al nuevo equilibrio.'],
  ]),

  K.receta([
    '**1.** $\\ell_0$ con el equilibrio inicial; $\\ell_{eq}$ con la masa nueva.',
    '**2.** $x_0=\\ell_{inicial}-\\ell_{eq}$, $v_0=0$.',
    "**3.** $\\omega_0$, $\\gamma=b/2m$, $\\omega'$ ⇒ $A$, $\\varphi$.",
    "**4.** Tras $T'$: $x_0e^{-\\gamma T'}$; energía $e^{-2\\gamma T'}$.",
  ], ['$\\ell_0=20$ cm; $\\ell_{eq}=21{,}6$ cm; $x_0=+6{,}4$ cm', 'a) $x=6{,}66\\,e^{-6{,}875t}\\cos(24{,}04t-0{,}279)$ cm', 'b) 22,66 cm; pierde 97,3 %'], [
    ['La receta. Uno: los dos equilibrios.'],
    ['Dos: la condición inicial respecto del nuevo equilibrio.'],
    ['Tres: los parámetros, la amplitud y la fase.'],
    ['Cuatro: después de un período, la posición y la energía.'],
    ['Resultados: la oscilación con seis coma seis seis centímetros, veintidós coma sesenta y seis centímetros, y noventa y siete por ciento de energía perdida.'],
  ]),
];
