// Red 2 · recuperatorio 1/11/2025, ej. 5: espectro continuo 400–1500 nm (corregido a mano desde 450), 2000/cm, a = 2,5 µm, detector de 50 cm a 50 cm.
// Resultados verificados (soluciones/Red2.py): d = 5 µm, d/a = 2 ⇒ faltan los pares; sen θmax = 0,4472 (tg = 0,5);
// a) máximo orden completo m = 1 (4,01 → 15,72 cm); el 3 se corta en 745,4 nm y el 5 en 447,2 nm;
// b) solapamientos 1–3: 12,36–15,72 cm (3,363) y 3–5: 21,82–25 cm (3,178) por lado ⇒ 13,08 cm de 50 ⇒ 26,2 % (con 450 nm: 6,8 %).
const { md, ul, card, callout, eqs, res, table } = require('../../lib');
const { seccion } = require('../common');
const { kit, growX } = require('../fx');

const SEC = 'Red 2 · Espectro continuo y solapamiento';
const B = 'b-red';
const K = kit(SEC, B);
const GRAD = `<defs><linearGradient id="r2-sp" x1="0" x2="1"><stop offset="0" stop-color="#8f7bff"/><stop offset=".15" stop-color="#4cc2ff"/><stop offset=".3" stop-color="#5fe08a"/><stop offset=".45" stop-color="#ffd166"/><stop offset=".6" stop-color="#ff6f6f"/><stop offset="1" stop-color="#7a2a2a"/></linearGradient></defs>`;

// bandas en sen θ (0 … 0,95)
const SX = s => 120 + s / 0.95 * 1480;
const bandas = `<svg class="r2-svg" viewBox="0 0 1640 470" style="width:1600px">${GRAD}
  <line x1="${SX(0)}" y1="410" x2="${SX(0.95)}" y2="410" class="r2-ax"/>
  ${[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9].map(s => `<line x1="${SX(s)}" y1="404" x2="${SX(s)}" y2="416" class="r2-ax"/><text x="${SX(s)}" y="446" text-anchor="middle" class="r2-tk">${String(s).replace('.', ',')}</text>`).join('')}
  <text x="${SX(0.95)}" y="446" text-anchor="end" class="r2-tk">sen θ</text>
  ${[1, 2, 3, 4, 5].map((m, i) => { const y = 30 + i * 72, a = 0.08 * m, b = Math.min(0.3 * m, 0.95), par = m % 2 === 0;
    return `<text x="100" y="${y + 34}" text-anchor="end" class="r2-m">m = ${m}</text><g id="r2-b${m}" class="pending"><rect x="${SX(a)}" y="${y + 8}" width="${SX(b) - SX(a)}" height="38" rx="6" style="fill:url(#r2-sp);opacity:${par ? .25 : 1}"/>${par ? `<line x1="${SX(a)}" y1="${y + 27}" x2="${SX(b)}" y2="${y + 27}" class="r2-cross"/><text x="${SX(b) + 12}" y="${y + 36}" class="r2-falta">falta</text>` : ''}</g>`; }).join('')}
  <line id="r2-edge" class="pending" x1="${SX(0.4472)}" y1="16" x2="${SX(0.4472)}" y2="420" style="stroke:var(--bad);stroke-width:5"/>
  <text id="r2-edget" class="pending" x="${SX(0.4472) + 10}" y="20" style="fill:var(--bad);font-size:24px;font-weight:700">borde del detector: 0,447</text>
</svg>`;

// detector (un lado, y de 0 a 25 cm)
const YX = y => 120 + y / 25 * 1460;
const fila = (id, y0, y1, row, fill, txt) => `<g id="${id}" class="pending"><rect x="${YX(y0)}" y="${30 + row * 70}" width="${YX(y1) - YX(y0)}" height="44" rx="6" style="fill:${fill}"/>${txt ? `<text x="${YX(y0) + 10}" y="${62 + row * 70}" class="r2-in">${txt}</text>` : ''}</g>`;
const detector = `<svg class="r2-svg" viewBox="0 0 1640 380" style="width:1600px">${GRAD.replace('id="r2-sp"', 'id="r2-sp2"')}
  ${['orden 1', 'orden 3', 'orden 5', 'solapan'].map((t, i) => `<text x="100" y="${60 + i * 70}" text-anchor="end" class="r2-m">${t}</text>`).join('')}
  ${fila('r2-d1', 4.01, 15.72, 0, 'url(#r2-sp2)', '400 → 1500 nm')}${fila('r2-d3', 12.36, 25, 1, 'url(#r2-sp2)', '400 → 745 nm')}${fila('r2-d5', 21.82, 25, 2, 'url(#r2-sp2)', '400 → 447')}
  ${fila('r2-s1', 12.36, 15.72, 3, 'var(--warn)', '3,36 cm')}${fila('r2-s2', 21.82, 25, 3, 'var(--warn)', '3,18 cm')}
  <line x1="${YX(0)}" y1="320" x2="${YX(25)}" y2="320" class="r2-ax"/>
  ${[0, 4.01, 12.36, 15.72, 21.82, 25].map(y => `<line x1="${YX(y)}" y1="314" x2="${YX(y)}" y2="326" class="r2-ax"/><text x="${YX(y)}" y="356" text-anchor="middle" class="r2-tk">${String(y).replace('.', ',')}</text>`).join('')}
  <text x="${YX(25)}" y="300" text-anchor="end" class="r2-tk">y (cm), un lado</text>
</svg>`;

const CSS = `.r2-svg{overflow:visible;font-family:"Segoe UI",Arial,sans-serif}
  .r2-ax{stroke:#6f86a8;stroke-width:3} .r2-tk{fill:var(--dim);font-size:22px;font-family:Consolas,monospace}
  .r2-m{fill:var(--ink);font-size:26px;font-weight:700} .r2-cross{stroke:var(--bad);stroke-width:4} .r2-falta{fill:var(--bad);font-size:24px;font-weight:700}
  .r2-in{fill:#07111f;font-size:22px;font-weight:800}`;

module.exports = [
  seccion('Red 2', 'Espectro continuo y solapamiento', 'Recuperatorio del 1/11/2025 · ejercicio 5',
    'Ejercicio de redes número dos: recuperatorio del uno de noviembre de dos mil veinticinco, ejercicio cinco. Una red iluminada con un espectro continuo muy ancho: cada orden es una banda de colores, y las bandas se pisan.'),

  Object.assign(K.enunciado('Red2.jpg', ['@1 $\\lambda$: 400 → 1500 nm (corregido a mano: 450 → 400)', '@2 2000 rendijas/cm ⇒ $d=5\\ \\mu$m', '@2 $a=2{,}5\\ \\mu$m', '@3 detector de 50 cm a $D=50$ cm, centrado'], [
    ['Este es el enunciado. Vamos con los datos.'],
    ['Un haz con todas las longitudes de onda entre cuatrocientos y mil quinientos nanómetros. Fijate que en el examen corrigieron a mano el cuatrocientos cincuenta por cuatrocientos: usamos cuatrocientos, y al final vemos qué cambia con el otro.'],
    ['La red tiene dos mil rendijas por centímetro: d es cinco micrones. Cada rendija mide dos coma cinco micrones.'],
    ['El detector mide cincuenta centímetros de ancho, a cincuenta centímetros de la red, centrado. Piden el máximo orden en el que se ve el espectro completo, y en qué porcentaje del detector hay solapamiento.'],
  ]), { css: CSS }),

  K.molde('Ejercicio 22 de la hoja: **luz blanca, solapamiento** (Recu 30/5/26, detector de 180 cm a 2 m: 9,9 %).',
    ['Cada orden es una banda: $\\sen\\theta=\\frac{m\\lambda}{d}$', 'Faltan $m=p\\,\\frac da$', 'Borde: $\\tg\\theta_{max}=\\frac{W/2}{D}$; $y=D\\tg\\theta$', 'Porcentaje $=\\frac{2\\cdot\\text{un lado}}{W}$'],
    ['El rango llega a **1500 nm**: bandas mucho más largas', '$d/a=2$: faltan **todos los pares**', 'Detector cerca: **no** vale la paraxial', 'Ítem nuevo: máximo orden completo'],
    [['El molde es el ejercicio veintidós de la hoja: luz blanca y solapamiento, del recuperatorio del treinta de mayo.'],
     ['Se repite todo el procedimiento: cada orden es una banda, se sacan los órdenes que faltan, se pone el borde del detector y se pasa todo a posiciones con D tangente de theta.'],
     ['Cambia que el espectro llega a mil quinientos nanómetros, que faltan todos los órdenes pares, y que el detector está tan cerca que no sirve la aproximación paraxial.']]),

  K.S('Teoría', 'Cada orden es una banda de colores', bandas, [
    ['Con luz de muchas longitudes de onda, cada orden ya no es una línea: es una banda. Va desde m por cuatrocientos sobre d hasta m por mil quinientos sobre d, en seno de theta.', growX('#r2-b1', { dur: 1400 })],
    ['Con d igual a cinco micrones, el orden uno va de cero coma cero ocho a cero coma treinta. El dos, del doble. El tres, del triple. Cuanto más alto el orden, más larga la banda, y empiezan a pisarse.', growX('#r2-b2, #r2-b3, #r2-b4, #r2-b5', { dur: 1400, stagger: 500 })],
    ['Pero d sobre a es dos: faltan todos los órdenes pares. El dos y el cuatro no aparecen. Así que se pisan el uno con el tres, y el tres con el cinco.'],
    ['Y el detector corta en seno de theta igual a cero coma cuatro cuatro siete. Lo que queda a la derecha no llega. [A] ¿Por qué no se pisan el uno y el dos? [P] Se pisarían, pero el dos falta.', `show('#r2-edge, #r2-edget',{from:'fade'})`],
  ]),

  K.S('Pasos 1 y 2', 'd, órdenes que faltan y borde del detector', `<div class="grid g2" style="align-items:center">${eqs([
      { t: 'd=\\frac{1\\ \\text{cm}}{2000}=5\\ \\mu\\text{m}\\qquad\\frac da=\\frac{5}{2{,}5}=2', s: 0 },
      { t: '\\frac{\\lambda}{d}:\\ \\frac{0{,}4}{5}=0{,}08\\ \\to\\ \\frac{1{,}5}{5}=0{,}30', s: 1 },
      { t: '\\tg\\theta_{max}=\\frac{25}{50}=0{,}5', s: 2 },
      { t: '\\sen\\theta_{max}=\\frac{0{,}5}{\\sqrt{1+0{,}5^2}}=0{,}4472', s: 2, cls: 'ok' },
    ])}${callout('Ángulos de hasta **26,6°**: la paraxial ($\\sen\\approx\\tg$) da un error grande. Usar $y=D\\tg\\theta$.', { s: 3, cls: 'warn' })}</div>`, [
    ['Paso uno. d es un centímetro dividido dos mil: cinco micrones. Y d sobre a es dos: faltan los órdenes dos, cuatro, seis.'],
    ['Lambda sobre d va de cero coma cero ocho a cero coma treinta.'],
    ['Paso dos: el borde. El detector llega a veinticinco centímetros del centro, a cincuenta de distancia: la tangente vale cero coma cinco, y el seno, cero coma cuatro cuatro siete dos.'],
    ['El ángulo llega a veintiséis grados. [A] ¿No puedo usar la paraxial? [P] Acá no: seno y tangente difieren mucho. Hay que pasar a posiciones con la tangente.'],
  ]),

  K.S('a) Orden completo', '¿Hasta qué orden entra el espectro entero?', `<div style="display:grid;grid-template-columns:1fr 520px;gap:30px;align-items:center">
      ${table([
        ['$m$', '$\\sen\\theta$: 400 → 1500 nm', '¿En el detector?'],
        { cells: ['1', '0,08 → 0,30', '**completo** (4,01 → 15,72 cm)'], s: 0 },
        { cells: ['2', '—', 'falta'], s: 1, cls: 'dead' },
        { cells: ['3', '0,24 → 0,90', 'se corta en 745 nm'], s: 1 },
        { cells: ['5', '0,40 → 1,50', 'se corta en 447 nm'], s: 2 },
        { cells: ['7', '0,56 → …', 'afuera'], s: 2 },
      ], { style: 'font-size:1em;width:100%' })}
      <div>${eqs([{ t: '\\lambda_{corte}=\\frac{d\\,\\sen\\theta_{max}}{m}', s: 1 }])}${res('a) $m=1$', { s: 3, style: 'margin-top:24px' })}</div></div>`, [
    ['Ítem a. El orden uno va de cero coma cero ocho a cero coma treinta: entra entero. En la pantalla, de cuatro a quince coma siete centímetros.'],
    ['El dos falta. El tres empieza adentro, pero se corta en el borde. ¿En qué longitud de onda? Lambda de corte es d por seno máximo sobre m: setecientos cuarenta y cinco nanómetros.'],
    ['El cinco también entra un poquito, de cuatrocientos a cuatrocientos cuarenta y siete. Y el siete ya empieza afuera.'],
    ['Entonces el máximo orden con el espectro completo es m igual a uno. [A] ¿El tres no cuenta aunque empiece adentro? [P] No: le falta todo lo que pasa de setecientos cuarenta y cinco nanómetros.'],
  ]),

  K.S('b) Solapamiento', 'Dónde se pisan los órdenes', `<div style="display:flex;flex-direction:column;gap:20px;align-items:center">${detector}
      <div class="grid g2" style="width:100%;align-items:center">${eqs([
        { t: 'y=D\\tg\\theta:\\ \\ 0{,}24\\to12{,}36,\\ \\ 0{,}30\\to15{,}72\\ \\text{cm}', s: 2 },
        { t: '\\frac{2\\,(3{,}363+3{,}178)}{50}=\\frac{13{,}08}{50}', s: 4 },
      ])}${res('b) 26,2 % del detector', { s: 4 })}</div></div>`, [
    ['Ítem b. Dibujemos un lado del detector. El orden uno ocupa de cuatro a quince coma siete centímetros.', growX('#r2-d1', { dur: 1400 })],
    ['El orden tres empieza en doce coma tres seis y llega hasta el borde. El cinco, desde veintiuno coma ocho dos.', growX('#r2-d3', { dur: 1400 }) + growX('#r2-d5', { dur: 1000, delay: 1200 })],
    ['Las posiciones salen de D por tangente. Seno cero coma veinticuatro, el comienzo del tres, da doce coma tres seis centímetros. Y cero coma treinta, el final del uno, quince coma siete dos.'],
    ['Entonces hay dos zonas de solapamiento por lado: el uno con el tres, tres coma tres seis centímetros, y el tres con el cinco, tres coma uno ocho, hasta el borde.', growX('#r2-s1, #r2-s2', { dur: 1200, stagger: 600 })],
    ['Sumando los dos lados: trece coma cero ocho centímetros, sobre cincuenta. Veintiséis coma dos por ciento. [A] ¿Por qué multiplico por dos? [P] Porque el detector está centrado y el patrón es simétrico: lo mismo pasa del otro lado.'],
  ]),

  K.S('Variante', '¿Y si el espectro empezara en 450 nm?', `<div class="grid g2" style="align-items:center">${eqs([
      { t: '\\frac{\\lambda}{d}:\\ 0{,}09\\to0{,}30', s: 0 },
      { t: '1\\text{–}3:\\ \\sen\\theta\\in[0{,}27;\\,0{,}30]\\ \\Rightarrow\\ 14{,}02\\to15{,}72\\ \\text{cm}', s: 1 },
      { t: '5:\\ \\sen\\theta=0{,}45>0{,}4472\\ \\Rightarrow\\ \\text{afuera}', s: 2 },
    ])}<div>${res('a) igual: $m=1$ · b) 6,8 %', { s: 3 })}${callout('Si se usa la paraxial: **32 %** (o 21,4 %). No sirve con ángulos de 26°.', { s: 3, cls: 'bad', style: 'margin-top:22px' })}</div></div>`, [
    ['Con el enunciado impreso, cuatrocientos cincuenta, lambda sobre d empieza en cero coma cero nueve.'],
    ['El solapamiento del uno con el tres se achica: de catorce a quince coma siete centímetros.'],
    ['Y el orden cinco empezaría en cero coma cuatro cinco, apenas dos milímetros afuera del borde. Desaparece la zona del tres con el cinco.'],
    ['El ítem a no cambia, y el porcentaje baja a seis coma ocho. Usá el cuatrocientos que corrigieron, y si querés, aclarás la variante.'],
  ]),

  K.trampas([
    '**Faltan todos los pares** ($d/a=2$): si se cuentan el 2 y el 4, sale 67,6 %.',
    '**Nada de paraxial:** con 26° hay que usar $y=D\\tg\\theta$ (si no, 32 %).',
    '**$d$ desde 2000/cm:** 5 µm, no 0,5 µm.',
    '**El orden 3 empieza adentro pero se corta** en 745 nm: no está completo.',
    '**Dos lados y el ancho total:** $2\\cdot6{,}54/50$, no $6{,}54/50$ ni $/25$.',
  ], [
    ['Las trampas. Primera: d sobre a igual a dos hace faltar todos los pares. Si los contás, parece que casi todo el detector está solapado.'],
    ['Segunda: nada de aproximación paraxial con ángulos de veintiséis grados.'],
    ['Tercera: d sale de dos mil por centímetro: cinco micrones.'],
    ['Cuarta: un orden que empieza adentro no está completo si se corta en el borde.'],
    ['Y quinta: el porcentaje es sobre todo el detector, sumando los dos lados.'],
  ]),

  K.receta([
    '**1.** $d$, $d/a$ ⇒ órdenes que faltan.',
    '**2.** Borde: $\\tg\\theta_{max}=\\frac{W/2}{D}$ ⇒ $\\sen\\theta_{max}$.',
    '**3.** Banda de cada orden: $m\\lambda_{min}/d$ → $m\\lambda_{max}/d$.',
    '**4.** Intervalos comunes ⇒ $y=D\\tg\\theta$ ⇒ anchos.',
    '**5.** % $=2\\cdot\\text{un lado}/W$.',
  ], ['$d=5\\ \\mu$m; faltan los pares; $\\sen\\theta_{max}=0{,}4472$', 'a) $m=1$ (el 3 se corta en 745 nm)', 'b) 12,36–15,72 y 21,82–25 cm por lado ⇒ **26,2 %**', 'Con 450 nm: 6,8 %'], [
    ['La receta. Uno: d y los órdenes que faltan.'],
    ['Dos: el borde del detector, en seno de theta.'],
    ['Tres: la banda de cada orden.'],
    ['Cuatro: las zonas comunes, pasadas a posiciones con la tangente.'],
    ['Cinco: el porcentaje, con los dos lados.'],
    ['Resultados: orden uno completo, y veintiséis coma dos por ciento de solapamiento.'],
  ]),
];
