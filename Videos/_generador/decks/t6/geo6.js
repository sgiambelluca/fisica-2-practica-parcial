// Geo 6 · recuperatorio 1P 18/6/2024, ej. 2: sistema delgado de dos piezas (n1 = 1,2 y n2 = 1,5), |R| = 20 cm en las interfases curvas, objeto a 20 cm.
// Resultados verificados (soluciones/Geo6.py): desde el final s3' = ∞ ⇒ s3 = −60 cm; dioptra del medio ⇒ s2 = −30 cm; primera ⇒ R = +20 cm
// (potencias 0,010 + 0,015 + 0,025 = 0,05 = 1/20 cm⁻¹). Alternativa (cara izquierda plana, incógnita la derecha): s1' = −24, s2' = −42,86 ⇒ R3 = −14,3 cm.
const { md, ul, card, callout, eqs, res } = require('../../lib');
const { seccion } = require('../common');
const { kit, bench, OB_CSS } = require('../fx');

const SEC = 'Geo 6 · Dos piezas: haces paralelos';
const B = 'b-geo';
const K = kit(SEC, B);
const b = bench({ x0: -24, x1: 26, H: 440, ax: 220 });
// sistema dibujado ampliado alrededor de x = 0 (no a escala en el espesor)
const sist = (() => { const c = b.X(0), t = 40, bt = 400;
  return `<path class="g6-n1" d="M${c - 70},${t} Q${c - 110},220 ${c - 70},${bt} L${c},${bt} Q${c - 40},220 ${c},${t} Z"/>
    <path class="g6-n2" d="M${c},${t} Q${c - 40},220 ${c},${bt} Q${c + 40},220 ${c},${t} Z"/>
    <text x="${c - 70}" y="${t - 10}" class="g6-t" text-anchor="middle">n₁ = 1,2</text><text x="${c + 10}" y="${t - 10}" class="g6-t">n₂ = 1,5</text>
    <text x="${c - 118}" y="225" class="g6-r" text-anchor="end">R ?</text><text x="${c - 38}" y="${bt + 28}" class="g6-r2" text-anchor="middle">+20</text><text x="${c + 36}" y="${bt + 28}" class="g6-r2" text-anchor="middle">−20</text>`; })();
const rays = [-110, -60, 60, 110].map((y, i) => `<path class="ob-ray pending g6-ry" d="M${b.X(-20)},220 L${b.X(0) - 60},${220 + y} L${b.X(26)},${220 + y}"/>`).join('');
const CSS = OB_CSS + `.g6-n1{fill:rgba(76,194,255,.16);stroke:#4cc2ff;stroke-width:3} .g6-n2{fill:rgba(196,155,255,.22);stroke:var(--geo);stroke-width:3}
  .g6-t{fill:var(--muted);font-size:24px} .g6-r{fill:var(--warn);font-size:30px;font-weight:800} .g6-r2{fill:var(--geo);font-size:22px;font-weight:700}`;

module.exports = [
  seccion('Geo 6', 'Dos piezas: haces paralelos', 'Recuperatorio 1P del 18/6/2024 · ejercicio 2',
    'Ejercicio de óptica geométrica número seis: recuperatorio del primer parcial del dieciocho de junio de dos mil veinticuatro, ejercicio dos. Un sistema delgado de dos piezas de vidrio pegadas: hay que elegir un radio para que la luz salga paralela.'),

  Object.assign(K.enunciado('Geo6.jpg', ['@1 pieza izquierda $n_1=1{,}2$; pieza derecha $n_2=1{,}5$', '@1 interfases curvas: $|R|=20$ cm', '@2 en aire, espesor despreciable', '@2 objeto a 20 cm: $s_1=-20$ cm', '@3 ¿$R$ para que **emerjan paralelos**?'], [
    ['Este es el enunciado. Vamos con los datos.'],
    ['Un sistema de dos piezas pegadas, de índices uno coma dos y uno coma cinco. Las interfases curvas tienen veinte centímetros de radio. Está en aire y es delgado.'],
    ['El objeto está a veinte centímetros a la izquierda.'],
    ['Piden el radio R de la cara señalada para que los haces salgan paralelos.'],
  ], { maxH: 430 }), { css: CSS }),

  K.molde('Ejercicio 15 de la hoja: **barra con dos caras esféricas** (1P 14/9/24). Su nota: "1P 20/4/24 y **Recu 18/6/24** piden que salgan paralelos ⇒ $s\'_{final}=\\infty$".',
    ['Dioptras encadenadas: $\\frac{n\'}{s\'}-\\frac ns=\\frac{n\'-n}{R}$', 'La imagen de una es el objeto de la siguiente', 'Paralelos ⇒ $s\'=\\infty$'],
    ['**Tres** interfases y espesor nulo: $s_{k+1}=s_k\'$', 'Conviene resolver **desde el final**'],
    [['El molde es el ejercicio quince de la hoja: la barra con dos caras esféricas. Su nota menciona este mismo recuperatorio, donde piden que salgan paralelos.'],
     ['Se repite: encadenar dioptras con su ecuación, la imagen de una es el objeto de la siguiente, y paralelos quiere decir imagen en el infinito.'],
     ['Cambia que hay tres interfases y espesor nulo, y que conviene resolver de atrás para adelante.']]),

  K.S('Teoría', 'Tres dioptras pegadas', `<div style="display:grid;grid-template-columns:1fr 640px;gap:30px;align-items:center">${b.svg('g6-s', b.arrow(-20, 70, 'obj', { label: 'objeto' }) + sist + rays, 'width:1040px')}
      ${eqs([
        { t: '\\frac{n\'}{s\'}-\\frac ns=\\frac{n\'-n}{R}', s: 0 },
        { t: 'R>0:\\ \\text{centro a la derecha}', s: 1 },
        { t: 's_{k+1}=s_k\'\\ \\ (\\text{espesor nulo})', s: 2 },
        { t: '\\text{paralelos: }s_3\'=\\infty\\ \\Rightarrow\\ \\frac{n\'}{s_3\'}=0', s: 3, cls: 'hl' },
      ])}</div>`, [
    ['Hay tres interfases: aire con n uno, la cara R; n uno con n dos; y n dos con aire. En cada una vale la ecuación de la dioptra.'],
    ['El radio es positivo si el centro de curvatura queda a la derecha, del lado hacia donde va la luz. Las dos caras de la pieza biconvexa tienen el mismo módulo, pero signos opuestos: más veinte la izquierda y menos veinte la derecha.'],
    ['Como el espesor es despreciable, la imagen de una dioptra es directamente el objeto de la siguiente.'],
    ['Y que salgan paralelos quiere decir que la imagen final está en el infinito: el término n prima sobre s prima vale cero. [A] ¿No es s prima igual a cero? [P] No: cero sería una imagen pegada a la lente. Paralelos es infinito.', `S.querySelectorAll('.g6-ry').forEach((e,i)=>draw(e,{delay:i*300,dur:1800}))`],
  ]),

  K.S('Resolución', 'Desde el final hacia atrás', `<div class="grid g2" style="align-items:center">${eqs([
      { t: '3)\\ 0-\\frac{1{,}5}{s_3}=\\frac{1-1{,}5}{-20}=0{,}025\\ \\Rightarrow\\ s_3=-60', s: 0 },
      { t: '2)\\ \\frac{1{,}5}{-60}-\\frac{1{,}2}{s_2}=\\frac{0{,}3}{20}\\ \\Rightarrow\\ s_2=-30', s: 1 },
      { t: '1)\\ \\frac{1{,}2}{-30}-\\frac{1}{-20}=\\frac{0{,}2}{R}\\ \\Rightarrow\\ 0{,}010=\\frac{0{,}2}{R}', s: 2 },
    ])}<div>${res('$R=+20$ cm (centro a la derecha)', { s: 3 })}${callout('Chequeo con potencias: $0{,}010+0{,}015+0{,}025=0{,}05=\\frac1{20}$ cm⁻¹ ✓', { s: 3, cls: 'ok', style: 'margin-top:22px' })}</div></div>`, [
    ['Empezamos por la última dioptra, de uno coma cinco a aire, con imagen en el infinito. Menos uno coma cinco sobre s tres es menos cero coma cinco sobre menos veinte: cero coma cero veinticinco. s tres es menos sesenta: dentro de n dos, los rayos tienen que divergir desde sesenta centímetros a la izquierda.'],
    ['La dioptra del medio, de uno coma dos a uno coma cinco, tiene que dar esa imagen: s dos prima igual a menos sesenta. Despejando, s dos es menos treinta.'],
    ['Y la primera, de aire a uno coma dos, lleva el objeto de menos veinte a menos treinta. Uno coma dos sobre menos treinta, más uno sobre veinte, da cero coma cero uno, igual a cero coma dos sobre R.'],
    ['R es más veinte centímetros: la cara izquierda está abombada hacia el objeto. Chequeo: las tres potencias suman un veinteavo, justo uno sobre la distancia del objeto. [A] ¿Por qué conviene ir desde el final? [P] Porque la condición está al final: así cada paso tiene una sola incógnita.'],
  ]),

  K.S('Interpretación', 'Qué significa R = +20 cm', `<div class="grid g2" style="align-items:center">${ul([
      '@0 Pieza $n_1$: dos caras paralelas de 20 cm ⇒ menisco de **potencia 0**',
      '@1 Biconvexa $n_2$: $P=0{,}5\\left(\\frac1{20}+\\frac1{20}\\right)=0{,}05$ ⇒ $f\'=20$ cm',
      '@2 El objeto ya está en el foco de la biconvexa',
      '@3 Con la cara plana (como está dibujada): $f\'=25$ cm, no salen paralelos',
    ])}${callout('**Alternativa:** si la cara izquierda es plana y la incógnita es la derecha: $s_1\'=-24$, $s_2\'=-42{,}86$ ⇒ **$R_3=-14{,}3$ cm**.', { s: 4, cls: 'warn' })}</div>`, [
    ['¿Qué quiere decir el resultado? Con R igual a más veinte, la pieza de uno coma dos tiene sus dos caras paralelas: es un menisco de espesor uniforme, y su potencia es cero.'],
    ['La biconvexa de uno coma cinco, sola, tiene focal de veinte centímetros.'],
    ['Y el objeto está justo a veinte: en su foco. Por eso sale paralelo.'],
    ['Si la cara izquierda fuera plana, como parece dibujada, la pieza de uno coma dos restaría potencia y no saldrían paralelos.'],
    ['Hay otra lectura posible: que la cara izquierda sea plana y la incógnita sea la de la derecha. Ahí sale menos catorce coma tres centímetros. [A] ¿Cuál pongo? [P] La primera es la más probable: el rótulo R apunta a la cara izquierda. Aclarás qué cara tomás.'],
  ]),

  K.trampas([
    '**Signos de $R$:** la biconvexa tiene $+20$ a la izquierda y $-20$ a la derecha.',
    '**Índices de la interfase del medio:** $n=1{,}2$ y $n\'=1{,}5$ (no 1 y 1,5).',
    '**Paralelos ⇒ $s\'=\\infty$**, no $s\'=0$.',
    '**Espesor nulo:** $s_{k+1}=s_k\'$, sin restar nada.',
    '**Dar el sentido de $R$**, no solo $|R|$; y aclarar qué cara es la incógnita.',
  ], [
    ['Las trampas. Primera: los signos de los radios de la biconvexa.'],
    ['Segunda: en la interfase del medio, los índices son uno coma dos y uno coma cinco.'],
    ['Tercera: paralelos es infinito.'],
    ['Cuarta: con espesor nulo no se resta nada.'],
    ['Y quinta: dar el signo del radio y aclarar qué cara es la incógnita.'],
  ]),

  K.receta([
    '**1.** Signos de cada $R$ (centro a la derecha ⇒ $+$).',
    '**2.** Desde el final: $s_3\'=\\infty$ ⇒ $s_3$.',
    '**3.** Hacia atrás: $s_k=s_{k-1}\'$ ⇒ cada objeto.',
    '**4.** La primera dioptra da $R$; chequear con potencias.',
  ], ['$s_3=-60$ cm; $s_2=-30$ cm', '**$R=+20$ cm** (abombada hacia el objeto)', 'Alternativa: $R_3=-14{,}3$ cm'], [
    ['La receta. Uno: los signos de los radios.'],
    ['Dos: desde el final, con la imagen en el infinito.'],
    ['Tres: hacia atrás, cada imagen es el objeto anterior.'],
    ['Cuatro: la primera dioptra da R, y se chequea con las potencias.'],
    ['Resultado: R igual a más veinte centímetros.'],
  ]),
];
