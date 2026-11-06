// DR 2 · recuperatorio 30/5/2026, ej. 5: 5 rendijas, las 3 centrales tapadas; en P, ΔCO(1,5) = λ/2; el 8º orden es el primero que falta.
// Resultados verificados (soluciones/DR2.py): 4d/a = 8 ⇒ d/a = 2; en P (destapadas) γ = π/8, β = π/16;
// factor de red 5,828, difracción 0,98721 ⇒ I_P = 5,754 I0; I_max = 25 I0 ⇒ I_P/I_max = 0,230;
// b) 3 máximos principales (m = 0, ±1) en la campana central; 15 contando 3 secundarios por intervalo; 17 máximos locales estrictos.
const { md, ul, card, callout, eqs, res, plot } = require('../../lib');
const { seccion } = require('../common');
const { kit } = require('../fx');

const SEC = 'DR 2 · Cinco rendijas, tres tapadas';
const B = 'b-fis';
const K = kit(SEC, B);
const Ired = x => { const gm = Math.PI * x, b = gm / 2; const s = Math.sin(gm); const r = Math.abs(s) < 1e-9 ? 25 : (Math.sin(5 * gm) / s) ** 2; const e = Math.abs(b) < 1e-9 ? 1 : (Math.sin(b) / b) ** 2; return r * e; };

// placa con 5 rendijas; tapadas = índices 2,3,4
const placa = (id, tapadas) => {
  let h = `<svg class="d2-svg" id="${id}" viewBox="0 0 420 560" style="width:340px"><rect x="180" y="20" width="22" height="520" class="d2-pl"/>`;
  for (let i = 1; i <= 5; i++) {
    const y = 60 + (i - 1) * 110;
    h += `<rect x="176" y="${y}" width="30" height="20" class="d2-sl"/><text x="150" y="${y + 18}" text-anchor="end" class="d2-n">${i}</text>`;
    if (tapadas.includes(i)) h += `<rect x="204" y="${y - 12}" width="40" height="44" rx="6" class="d2-tap pending d2-tp"/>`;
    else h += `<line x1="206" y1="${y + 10}" x2="400" y2="${y + 10}" class="d2-ray"/>`;
  }
  return h + `<text x="300" y="290" text-anchor="middle" class="d2-n pending d2-tp">4d</text><line x1="300" y1="80" x2="300" y2="250" class="d2-dim pending d2-tp"/><line x1="300" y1="310" x2="300" y2="480" class="d2-dim pending d2-tp"/></svg>`;
};
// fasores: n flechas de largo L con giro dphi (rad)
const fasores = (id, n, L, dphi, x0, y0, cls) => {
  let x = x0, y = y0, h = '';
  for (let k = 0; k < n; k++) { const a = k * dphi, x2 = x + L * Math.cos(a), y2 = y - L * Math.sin(a); h += `<line id="${id}-${k}" class="d2-f ${cls} pending" x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" marker-end="url(#d2-ah)"/>`; x = x2; y = y2; }
  return { h, end: [x, y] };
};
const fA = fasores('d2-fa', 5, 110, 0, 40, 120, 'a'), fP = fasores('d2-fp', 5, 110, Math.PI / 4, 40, 530, 'b');
const fsvg = `<svg class="d2-svg" viewBox="0 0 700 580" style="width:680px"><defs><marker id="d2-ah" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 Z" style="fill:#dfe7f2"/></marker></defs>
  <text x="40" y="60" class="d2-t">centro: Δφ = 0 ⇒ resultante 5</text>${fA.h}
  <text x="40" y="225" class="d2-t">en P: Δφ = 2γ = π/4 (45°)</text>${fP.h}
  <line id="d2-res" class="d2-res pending" x1="40" y1="530" x2="${fP.end[0].toFixed(1)}" y2="${fP.end[1].toFixed(1)}"/>
  <text id="d2-rest" class="d2-t pending" x="${(fP.end[0] + 30).toFixed(0)}" y="${(fP.end[1] + 40).toFixed(0)}" style="fill:var(--warn)">2,414</text></svg>`;

const CSS = `.d2-svg{overflow:visible;font-family:"Segoe UI",Arial,sans-serif}
  .d2-pl{fill:#8fa6c4} .d2-sl{fill:#0d1522} .d2-n{fill:var(--muted);font-size:30px;font-weight:700}
  .d2-tap{fill:#2b3141;stroke:var(--bad);stroke-width:3} .d2-ray{stroke:var(--warn);stroke-width:4}
  .d2-dim{stroke:var(--muted);stroke-width:3;stroke-dasharray:6 6}
  .d2-f{stroke:#dfe7f2;stroke-width:6} .d2-f.a{stroke:var(--accent2)} .d2-f.b{stroke:var(--accent)}
  .d2-res{stroke:var(--warn);stroke-width:7;stroke-dasharray:14 8} .d2-t{fill:var(--ink);font-size:28px;font-weight:600}`;

module.exports = [
  seccion('DR 2', 'Cinco rendijas, tres tapadas', 'Recuperatorio del 30/5/2026 · ejercicio 5',
    'Ejercicio de doble rendija número dos: recuperatorio del treinta de mayo de dos mil veintiséis, ejercicio cinco. Cinco rendijas con las tres del medio tapadas, que funcionan como una doble rendija. Después se destapan y queda una red de cinco.'),

  Object.assign(K.enunciado('DR2.jpg', ['@1 5 rendijas: ancho $a$, separación $d$', '@1 tapadas la 2, la 3 y la 4', '@2 en P: $\\Delta CO_{1,5}=\\frac{\\lambda}{2}$', '@2 el 8º orden es el primero que falta', '@3 $d/a$ entero', '@3 luego se destapan las 5'], [
    ['Este es el enunciado. No hay números con unidades: todo sale como cociente.'],
    ['Hay cinco rendijas iguales, de ancho a y separadas d. Primero se tapan las tres del medio: quedan abiertas la uno y la cinco.'],
    ['En un punto P de la pantalla, la diferencia de camino entre las dos abiertas es media longitud de onda. Y el octavo orden es el primero que falta.'],
    ['Además, d sobre a es entero. Después se destapan todas. Piden el cociente entre la intensidad en P y la máxima, y cuántos máximos hay en la campana central de difracción.'],
  ], { maxH: 420 }), { css: CSS }),

  K.molde('Receta doble rendija / redes: **rendijas tapadas = red con otro $d$ y otro $N$** (Recu 30/5/26, ejercicio 19 de la v7). Y el 19 de la v6: **órdenes que faltan**.',
    ['Faltan $m=p\\,\\frac{d}{a}$', 'Intensidad en un punto: $\\gamma$ y $\\beta$ por separado', 'Campana central: $2\\frac da-1$ máximos'],
    ['Con tapadas, la separación es **4d**', 'Destapadas: red de **N = 5** ⇒ $I_{max}=25\\,I_0$'],
    [['En la hoja seis no hay uno igual, pero la receta de doble rendija y redes tiene la nota: las rendijas abiertas forman una red con otro d y otro N. Y en la versión siete está este mismo ejercicio.'],
     ['Se repiten tres herramientas: los órdenes que faltan, la intensidad en un punto calculando gama y beta, y la cuenta de máximos en la campana central.'],
     ['Lo nuevo es que con las tapadas la separación efectiva es cuatro d, y que destapadas es una red de cinco, con intensidad máxima veinticinco I cero.']]),

  K.S('Teoría', 'Rendijas tapadas: una red con otro d', `<div style="display:grid;grid-template-columns:360px 1fr;gap:40px;align-items:center">
      ${placa('d2-pl', [2, 3, 4])}
      ${eqs([
        { t: 'I=I_0\\left(\\frac{\\sen N\\gamma}{\\sen\\gamma}\\right)^2\\left(\\frac{\\sen\\beta}{\\beta}\\right)^2', s: 0 },
        { t: '\\gamma=\\frac{\\pi\\,d\\sen\\theta}{\\lambda}\\qquad\\beta=\\frac{\\pi\\,a\\sen\\theta}{\\lambda}', s: 0 },
        { t: '\\text{tapadas: } N=2,\\ d\\to4d', s: 1, cls: 'hl' },
        { t: '\\text{faltan: } m=p\\,\\frac{4d}{a}', s: 2 },
      ])}</div>`, [
    ['La herramienta general es la red de N rendijas. La intensidad es I cero, por seno de N gama sobre seno de gama al cuadrado, por la difracción de cada rendija. Con N igual a dos vuelve a ser la doble rendija.'],
    ['Si tapamos la dos, la tres y la cuatro, quedan abiertas la uno y la cinco. Es una doble rendija, pero separada cuatro d, porque entre ellas hay cuatro separaciones.', `show('.d2-tp',{stagger:150,from:'pop'})`],
    ['Y faltan los órdenes donde un máximo de esa doble rendija cae en un cero de difracción: m igual a p por cuatro d sobre a. [A] ¿El ancho a cambia al tapar? [P] No: cada rendija abierta sigue siendo igual, así que la campana de difracción es la misma.'],
  ]),

  K.S('Paso 1', 'El primer orden que falta da d/a', `<div class="grid g2" style="align-items:center">${eqs([
      { t: 'm=p\\,\\frac{4d}{a},\\ \\ p=1:\\ \\ \\frac{4d}{a}=8', s: 0 },
      { t: '\\frac da=2', s: 1, cls: 'ok' },
      { t: '\\text{(si }4d/a=\\tfrac83\\text{: }d/a<1\\text{, imposible)}', s: 2 },
    ])}${callout('El dato "$d/a$ entero" descarta las fracciones: **$d/a=2$**.', { s: 2, cls: 'ok' })}</div>`, [
    ['Paso uno. El primer orden que falta es el de p igual a uno: m igual a cuatro d sobre a. Y el enunciado dice que es el octavo.'],
    ['Entonces cuatro d sobre a es ocho, y d sobre a es dos.'],
    ['¿Para qué está el dato de d sobre a entero? Si cuatro d sobre a fuera una fracción, por ejemplo ocho tercios, el primer faltante también podría ser el ocho. Pero eso da d menor que a, que es imposible: la separación no puede ser menor que el ancho. Queda d sobre a igual a dos.'],
  ]),

  K.S('Paso 2', 'El punto P, con las cinco destapadas', `<div class="grid g2" style="align-items:center">${eqs([
      { t: '4d\\sen\\theta_P=\\frac{\\lambda}{2}\\ \\Rightarrow\\ d\\sen\\theta_P=\\frac{\\lambda}{8}', s: 0 },
      { t: '\\gamma_P=\\frac{\\pi\\,d\\sen\\theta_P}{\\lambda}=\\frac{\\pi}{8}', s: 1, cls: 'ok' },
      { t: '\\beta_P=\\gamma_P\\,\\frac ad=\\frac{\\pi}{16}', s: 2, cls: 'ok' },
    ])}${callout('Con las tapadas, P era un **mínimo**: $4I_0\\cos^2\\frac{\\pi}{2}=0$.', { s: 3, cls: 'warn' })}</div>`, [
    ['Paso dos: dónde está P. Entre la rendija uno y la cinco la diferencia de camino es media lambda, y esa distancia es cuatro d. Entonces entre dos rendijas vecinas es un octavo de lambda.'],
    ['Gama en P es pi por d seno theta sobre lambda: pi octavos.'],
    ['Y beta es lo mismo pero con a en lugar de d: como a es la mitad de d, beta es pi dieciseisavos.'],
    ['Fijate que con la doble rendija P era un mínimo: media lambda de diferencia, interferencia destructiva. Al destapar las del medio, ya no. [A] ¿Por qué cambia? [P] Porque ahora suman cinco ondas, y entre vecinas el desfasaje es chico.'],
  ]),

  K.S('a) Intensidad en P', 'I_P / I_max', `<div style="display:grid;grid-template-columns:1fr 690px;gap:30px;align-items:center">
      <div>${eqs([
        { t: '\\left(\\frac{\\sen(5\\pi/8)}{\\sen(\\pi/8)}\\right)^2=\\left(\\frac{0{,}92388}{0{,}38268}\\right)^2=5{,}828', s: 0 },
        { t: '\\left(\\frac{\\sen(\\pi/16)}{\\pi/16}\\right)^2=0{,}98721', s: 1 },
        { t: 'I_P=5{,}828\\cdot0{,}98721\\,I_0=5{,}754\\,I_0', s: 2 },
        { t: 'I_{max}=N^2I_0=25\\,I_0', s: 3 },
      ])}${res('$I_P/I_{max}=5{,}754/25=0{,}230$', { s: 4, style: 'margin-top:20px' })}</div>${fsvg}</div>`, [
    ['Ítem a. El factor de red en P: seno de cinco pi octavos sobre seno de pi octavos, al cuadrado. Da cinco coma ocho dos ocho.'],
    ['El factor de difracción: seno de pi dieciseisavos sobre pi dieciseisavos, al cuadrado: cero coma nueve ocho siete. Casi uno, porque P está cerca del centro de la campana.'],
    ['Multiplicando, la intensidad en P es cinco coma siete cinco cuatro I cero.'],
    ['¿Y la máxima? En el centro los dos factores son máximos: el de red vale N al cuadrado, veinticinco. [A] ¿No era cuatro I cero, como en la doble rendija? [P] Eso con dos rendijas. Con cinco, las cinco amplitudes se suman: cinco al cuadrado, veinticinco.'],
    ['Con fasores se ve claro. En el centro, las cinco flechas en fila suman cinco. En P cada una gira cuarenta y cinco grados respecto de la anterior, y la resultante mide dos coma cuatro uno. El cociente da cero coma dos tres cero.', `S.querySelectorAll('.d2-f.a').forEach((e,i)=>draw(e,{delay:i*250,dur:300})); S.querySelectorAll('.d2-f.b').forEach((e,i)=>draw(e,{delay:1600+i*350,dur:400})); draw('#d2-res',{delay:3600,dur:900}); show('#d2-rest',{delay:4300})`],
  ]),

  K.S('b) Máximos', '¿Cuántos máximos en la campana central?', `<div style="display:grid;grid-template-columns:1fr 520px;gap:30px;align-items:center">
      ${plot({ w: 1150, h: 540, x: [-2.2, 2.2], y: [0, 26], ticksX: [-2, -1, 0, 1, 2], ticksY: [0, 10, 25], xl: 'γ/π', yl: 'I / I₀', id: 'd2-b', s: 0,
        curves: [{ f: Ired, n: 3000, cls: 'c3', id: 'd2-bc' }, { f: x => 25 * (Math.abs(x) < 1e-9 ? 1 : (Math.sin(Math.PI * x / 2) / (Math.PI * x / 2)) ** 2), n: 600, cls: 'c2 dash', id: 'd2-be' }],
        extra: (px, py) => [-1, 0, 1].map(m => `<circle class="dot" cx="${px(m)}" cy="${py(Ired(m === 0 ? 0 : m * 0.988))}" r="12"/>`).join('') +
          [-2, 2].map(m => `<text class="lbl c4" x="${px(m)}" y="${py(3)}" style="text-anchor:middle">m=${m}: falta</text>`).join('') })}
      <div>${eqs([{ t: '|m|<\\frac da=2', s: 1 }, { t: 'm=0,\\ \\pm1', s: 1, cls: 'ok' }])}
      ${res('3 máximos principales', { s: 2, style: 'margin-top:20px' })}
      ${callout('Con secundarios: 3 por intervalo ⇒ **15**. Máximos locales estrictos: **17**.', { s: 3, cls: 'warn', style: 'margin-top:20px;font-size:.85em' })}</div></div>`, [
    ['Ítem b. Este es el patrón con las cinco destapadas: picos altos, los principales, y entre ellos tres picos chiquitos, los secundarios. Todo dentro de la campana de difracción.', `sweep('#d2-b #d2-bc',{dur:2600}); sweep('#d2-b #d2-be',{delay:1800,dur:1600})`],
    ['Los principales dentro de la campana central cumplen m menor que d sobre a, que es dos: m igual a cero, uno y menos uno. Los de m igual a dos caen justo en el cero de difracción y faltan.'],
    ['Entonces hay tres máximos principales. Es la respuesta típica de la cátedra: dos d sobre a menos uno.'],
    ['Si además contás los secundarios, tres por cada intervalo, son quince. Y si contás todos los máximos locales, aparecen dos lobulitos pegados al cero de difracción: diecisiete. [A] ¿Cuál pongo? [P] Tres principales, y aclarás los otros conteos diciendo qué contás.'],
  ]),

  K.trampas([
    '**Separación 4d con las tapadas** (con $d$ sale $d/a=8$).',
    '**$\\lambda/2$ es entre la 1 y la 5:** entre vecinas es $\\lambda/8$, $\\Delta\\varphi=\\pi/4$.',
    '**$I_{max}=N^2I_0=25\\,I_0$**, no $4I_0$ ni $5I_0$.',
    '**No olvidar la envolvente:** 0,233 sin ella, 0,230 con ella.',
    '**$m=\\pm2$ no cuentan:** caen en el cero de difracción. Calculadora en RAD.',
  ], [
    ['Las trampas. Primera: con las tapadas, la separación es cuatro d.'],
    ['Segunda: la media lambda es entre la uno y la cinco; entre vecinas es un octavo.'],
    ['Tercera: la intensidad máxima de una red de cinco es veinticinco I cero.'],
    ['Cuarta: no olvidar el factor de difracción, aunque sea casi uno.'],
    ['Y quinta: los órdenes dos y menos dos no cuentan, porque caen en el cero de difracción.'],
  ]),

  K.receta([
    '**1.** Tapadas: red de $N=2$ con separación $4d$ ⇒ faltantes ⇒ $d/a$.',
    '**2.** $\\Delta CO$ en P ⇒ $\\gamma_P$ y $\\beta_P=\\gamma_P\\,a/d$.',
    '**3.** $I_P=I_0\\left(\\frac{\\sen N\\gamma}{\\sen\\gamma}\\right)^2\\left(\\frac{\\sen\\beta}{\\beta}\\right)^2$; $I_{max}=N^2I_0$.',
    '**4.** Campana central: $|m|<d/a$.',
  ], ['$d/a=2$', '$\\gamma_P=\\pi/8$, $\\beta_P=\\pi/16$', 'a) $I_P/I_{max}=0{,}230$', 'b) 3 máximos principales (15 o 17 con secundarios)'], [
    ['La receta. Uno: con las tapadas, una red de dos con separación cuatro d, y de los faltantes sale d sobre a.'],
    ['Dos: con la diferencia de camino en P, gama y beta.'],
    ['Tres: la fórmula de la red para la intensidad en P, y la máxima, N cuadrado I cero.'],
    ['Cuatro: los principales dentro de la campana central.'],
    ['Resultados: cero coma dos tres cero, y tres máximos principales.'],
  ]),
];
