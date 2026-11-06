// Geo 10 · 1P 24/9/2015, ej. 4: rayo que forma 60° con la cara superior de un cubo de índice n (en aire) y llega a la cara lateral.
// Resultados verificados (soluciones/Geo10.py): θ1 = 30°; sen θ2 = 1/(2n); sen θlat = cos θ2; sin reflexión total: n√(1 − 1/(4n²)) < 1
// ⇒ n² < 5/4 ⇒ n_max = √5/2 ≈ 1,118 (en el borde, θ2 = 26,57°, θlat = θL = 63,43°). Si se toma 60° desde la normal: 1,323 (no es lo del dibujo).
const { md, ul, card, callout, eqs, res, table } = require('../../lib');
const { seccion } = require('../common');
const { kit } = require('../fx');

const SEC = 'Geo 10 · Rayo en un cubo';
const B = 'b-geo';
const K = kit(SEC, B);
// cubo: x 200–600, y 120–520; entra en (520, 120); con n dado se sigue el rayo hasta la cara izquierda
const camino = n => {
  const t2 = Math.asin(0.5 / n), P = [280, 160];
  const y = P[1] + (P[0] - 200) / Math.tan(t2); // donde toca la cara izquierda (x = 200)
  const tl = Math.PI / 2 - t2, s = n * Math.sin(tl);
  let fuera = '';
  if (s < 1) { const to = Math.asin(s); fuera = ` L${(200 - 200 * Math.cos(to)).toFixed(1)},${(y + 200 * Math.sin(to)).toFixed(1)}`; }
  else fuera = ` L320,${(y + 120 / Math.tan(t2)).toFixed(1)}`;
  return { d: `M${(280 + 160 * Math.cos(Math.PI / 3)).toFixed(1)},${(160 - 160 * Math.sin(Math.PI / 3)).toFixed(1)} L280,160 L200,${y.toFixed(1)}${fuera}`, sale: s < 1 };
};
const c1 = camino(1.1), c2 = camino(1.2);
const cubo = `<svg class="g10-svg" viewBox="0 0 760 620" style="width:620px">
  <rect x="200" y="160" width="400" height="400" class="g10-cubo"/><text x="590" y="550" text-anchor="end" class="g10-t">n</text>
  <line x1="280" y1="60" x2="280" y2="250" class="g10-n"/><text x="170" y="80" class="g10-t">normal</text>
  <path d="M360,160 A80,80 0 0,0 320,90.7" class="g10-arc"/><text x="372" y="132" class="g10-a">60°</text>
  <path d="M280,94 A66,66 0 0,1 313,102.8" class="g10-arc2"/><text x="292" y="84" class="g10-a2">30°</text>
  <path id="g10-r1" class="g10-ray pending" d="${c1.d}"/><path id="g10-r2" class="g10-ray b pending" d="${c2.d}"/>
  <text id="g10-t1" class="pending g10-t" x="10" y="480" style="fill:var(--warn)">n = 1,10: sale</text>
  <text id="g10-t2" class="pending g10-t" x="340" y="430" style="fill:var(--bad)">n = 1,20: reflexión total</text></svg>`;
const CSS = `.g10-svg{overflow:visible;font-family:"Segoe UI",Arial,sans-serif}
  .g10-cubo{fill:rgba(76,140,255,.12);stroke:#8fa6c4;stroke-width:4} .g10-t{fill:var(--muted);font-size:24px;font-weight:600}
  .g10-n{stroke:#6f86a8;stroke-width:2;stroke-dasharray:6 6} .g10-arc,.g10-arc2{fill:none;stroke:var(--warn);stroke-width:3} .g10-a{fill:var(--warn);font-size:26px;font-weight:800} .g10-a2{fill:var(--accent2);font-size:22px;font-weight:800}
  .g10-ray{fill:none;stroke:var(--warn);stroke-width:5;stroke-linejoin:round} .g10-ray.b{stroke:var(--bad)}`;

module.exports = [
  seccion('Geo 10', 'Rayo en un cubo', 'Primer parcial del 24/9/2015 · ejercicio 4',
    'Ejercicio de óptica geométrica número diez: primer parcial del veinticuatro de septiembre de dos mil quince, ejercicio cuatro. Un rayo entra a un cubo por arriba y llega a una cara lateral: ¿hasta qué índice puede salir por ahí?'),

  Object.assign(K.enunciado('Geo10.jpg', ['@1 cubo de índice $n$, en aire', '@1 el rayo forma **60° con la superficie** superior', '@2 adentro llega a la **cara lateral**', '@2 ¿$n$ máximo **sin** reflexión total?'], [
    ['Este es el enunciado. Vamos con los datos.'],
    ['Un cubo transparente de índice n, en aire. Un rayo llega a la cara de arriba formando sesenta grados con la superficie, como muestra el arco de la figura.'],
    ['Adentro, el rayo llega a la cara lateral. Piden el máximo índice para que ahí no haya reflexión total.'],
  ], { maxH: 430 }), { css: CSS }),

  K.molde('Ejercicio 9 de la hoja: **reflexión total de un rayo** (espejo sumergido y prisma), y el paso 10 de la receta: **seguir el rayo cara por cara**.',
    ['Snell en cada cara', 'Reflexión total si el ángulo de incidencia supera $\\theta_L$', 'Caras perpendiculares: los ángulos son complementarios'],
    ['El rayo **entra** desde el aire y la reflexión total se busca en **otra** cara', 'Se pide un **máximo** de $n$'],
    [['El molde es el ejercicio nueve de la hoja: seguir un rayo suelto y ver si hay reflexión total. Y el paso diez de la receta: cara por cara.'],
     ['Se repite: Snell en cada cara, la reflexión total cuando el ángulo supera el límite, y la geometría: dos caras perpendiculares dan ángulos complementarios.'],
     ['Cambia que el rayo entra desde el aire por una cara y la reflexión total se busca en otra.']]),

  K.S('Planteo', 'Seguir el rayo cara por cara', `<div style="display:grid;grid-template-columns:660px 1fr;gap:30px;align-items:center">${cubo}
      ${eqs([
        { t: '\\theta_1=90°-60°=30°', s: 0 },
        { t: '1\\cdot\\sen30°=n\\sen\\theta_2\\ \\Rightarrow\\ \\sen\\theta_2=\\frac1{2n}', s: 1 },
        { t: '\\theta_{lat}=90°-\\theta_2\\ \\Rightarrow\\ \\sen\\theta_{lat}=\\cos\\theta_2', s: 2 },
        { t: 'n\\sen\\theta_{lat}<1\\quad(\\text{sale})', s: 3, cls: 'hl' },
      ])}</div>`, [
    ['El ángulo de sesenta grados está medido desde la superficie. Para Snell hace falta el ángulo con la normal: noventa menos sesenta, treinta grados.'],
    ['Snell en la cara de arriba: seno de treinta es n por seno de theta dos. Seno de theta dos es uno sobre dos n.', `draw('#g10-r1',{dur:2600}); show('#g10-t1',{delay:2400})`],
    ['El rayo sigue hasta la cara lateral. Como las caras son perpendiculares, el ángulo de incidencia ahí es noventa menos theta dos: su seno es el coseno de theta dos.'],
    ['Para que salga, Snell en la cara lateral tiene que dar un seno menor que uno: n por seno de theta lateral menor que uno. Si n es grande, no sale. [A] ¿Por qué con más índice hay reflexión total? [P] Porque el rayo se dobla más hacia la normal al entrar, y llega a la cara lateral más inclinado.', `draw('#g10-r2',{dur:2600}); show('#g10-t2',{delay:2400})`],
  ]),

  K.S('Resolución', 'El índice máximo', `<div class="grid g2" style="align-items:center">${eqs([
      { t: 'n\\sqrt{1-\\frac1{4n^2}}<1', s: 0 },
      { t: '\\sqrt{n^2-\\tfrac14}<1\\ \\Rightarrow\\ n^2<\\frac54', s: 1 },
      { t: 'n<\\frac{\\sqrt5}{2}\\approx1{,}118', s: 2, cls: 'ok' },
    ])}<div>${res('$n_{max}=\\frac{\\sqrt5}{2}\\approx1{,}118$', { s: 2 })}
      ${table([['$n$', 'cara lateral'], ['1,05', 'sale a 67,4°'], ['1,10', 'sale a 78,5°'], ['1,118', 'sale rasante'], ['1,20', 'reflexión total']], { s: 3, style: 'margin-top:20px;font-size:.85em' })}</div></div>`, [
    ['Reemplazando el coseno con seno cuadrado más coseno cuadrado igual a uno: n por la raíz de uno menos uno sobre cuatro n cuadrado, menor que uno.'],
    ['Metiendo la n adentro de la raíz: raíz de n cuadrado menos un cuarto, menor que uno. Entonces n cuadrado es menor que cinco cuartos.'],
    ['El índice máximo es raíz de cinco sobre dos: uno coma uno uno ocho.'],
    ['Chequeo: con uno coma uno uno ocho, el ángulo en la cara lateral es justo el ángulo límite, sesenta y tres coma cuatro grados, y el rayo sale rasante. Con más índice, se refleja todo. [A] ¿Y si tomaba los sesenta grados desde la normal? [P] Te daría uno coma tres dos tres, pero el arco del dibujo está medido desde la superficie.'],
  ]),

  K.trampas([
    '**60° es con la superficie:** el de Snell es 30° (con 60° sale 1,323).',
    '**En la cara lateral el ángulo es $90°-\\theta_2$**, no $\\theta_2$.',
    '**Ángulo límite: $\\sen\\theta_L=1/n$**, no $n$.',
    '**Más $n$ ⇒ más reflexión total:** se busca un **máximo**.',
    '**Calculadora en DEG** para estos ángulos.',
  ], [
    ['Las trampas. Primera: los sesenta grados son con la superficie.'],
    ['Segunda: en la cara lateral, el ángulo es el complementario.'],
    ['Tercera: el seno del ángulo límite es uno sobre n.'],
    ['Cuarta: más índice da más reflexión total, así que se busca un máximo.'],
    ['Y quinta: acá la calculadora va en grados.'],
  ]),

  K.receta([
    '**1.** Ángulo con la normal: $\\theta_1=90°-60°$.',
    '**2.** Snell al entrar ⇒ $\\sen\\theta_2$.',
    '**3.** Cara perpendicular ⇒ $\\theta_{lat}=90°-\\theta_2$.',
    '**4.** $n\\sen\\theta_{lat}<1$ ⇒ $n_{max}$.',
  ], ['$\\sen\\theta_2=\\frac1{2n}$', '$n^2<\\frac54$', '**$n_{max}=\\sqrt5/2\\approx1{,}118$**'], [
    ['La receta. Uno: el ángulo con la normal.'],
    ['Dos: Snell al entrar.'],
    ['Tres: el complementario en la cara lateral.'],
    ['Cuatro: la condición para salir da el índice máximo.'],
    ['Resultado: raíz de cinco sobre dos, uno coma uno uno ocho.'],
  ]),
];
