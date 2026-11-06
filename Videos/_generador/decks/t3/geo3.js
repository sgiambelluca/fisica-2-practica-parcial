// Geo 3 · 1P 16/9/2023, ej. 2: regla 0–100 cm, objeto en 50, observador en 100, convergente f' = 30 cm; imagen derecha a 40 cm del objeto.
// Resultados verificados (soluciones/Geo3.py): a) s·s' = 1200, x_L² − 60x_L − 700 = 0 ⇒ lente en x = 70 cm (s = −20, s' = −60, A = +3,
// imagen virtual en x = 10). b) espejo cóncavo |R| = 20 cm: imagen del espejo sobre el objeto ⇒ s = R ⇒ espejo en x = 30 cm;
// vuelta: s2 = −20 ⇒ s2' = −60 (x = 10), A = (−1)(+3) = −3. Dos imágenes en x = 10: derecha (+3) e invertida (−3).
const { md, ul, card, callout, eqs, res } = require('../../lib');
const { seccion } = require('../common');
const { kit, bench, OB_CSS, lineAt } = require('../fx');

const SEC = 'Geo 3 · Lente y espejo: dos imágenes';
const B = 'b-geo';
const K = kit(SEC, B);
const b = bench({ x0: 0, x1: 100, H: 470, ax: 235, k: 1 });
const h = 40;
// a) rayos desde la punta del objeto
const Ia = [10, 3 * h];
const ra1 = [[50, h], [70, h], [100, lineAt([70, h], [100, 0], 100)]], ra1e = [[70, h], Ia];
const ra2 = [[50, h], [70, 0], [100, lineAt([50, h], [70, 0], 100)]], ra2e = [[70, 0], Ia];
// b) rayos por el espejo (en x = 30, centro en 50, foco en 40)
const Ib = [10, -3 * h];
const rb1 = [[50, h], [30, h], [70, lineAt([30, h], [40, 0], 70)], [100, -3 * h]], rb1e = [[70, -3 * h], Ib];
const p2 = [70, lineAt([30, 0], [50, -h], 70)];
const rb2 = [[50, h], [30, 0], p2, [100, lineAt(Ib, p2, 100)]], rb2e = [p2, Ib];

const base = (id, body) => b.svg(id, b.ticks([0, 10, 30, 50, 70, 100]) + body + b.eye(100) + b.arrow(50, h, 'obj', { label: 'objeto', lx: b.X(50) + 14, anchor: 'start' }));

module.exports = [
  seccion('Geo 3', 'Lente y espejo: dos imágenes', 'Primer parcial del 16/9/2023 · ejercicio 2',
    'Ejercicio de óptica geométrica número tres: primer parcial del dieciséis de septiembre de dos mil veintitrés, ejercicio dos. Una lente convergente que da una imagen derecha, y después un espejo para que el observador vea dos imágenes en el mismo lugar.'),

  Object.assign(K.enunciado('Geo3.jpg', ['@1 regla de 0 a 100 cm', '@1 objeto en $x=50$ cm', '@1 observador en $x=100$ cm', '@2 convergente: $f\'=30$ cm', '@2 a) imagen **derecha** a 40 cm del objeto', '@3 b) espejo cóncavo $|R|=20$ cm: **dos imágenes en el mismo lugar**'], [
    ['Este es el enunciado. Vamos con los datos.'],
    ['Sobre una regla de cien centímetros, el objeto está en cincuenta y el observador en cien, mirando hacia la izquierda.'],
    ['El ítem a pide dónde poner una lente convergente de treinta centímetros para que el observador vea una imagen derecha a cuarenta centímetros del objeto.'],
    ['Y el ítem b, dónde poner un espejo cóncavo de veinte centímetros de radio para que vea dos imágenes en la misma posición.'],
  ], { maxH: 420 }), { css: OB_CSS }),

  K.molde('Ejercicio 12 de la hoja: **espejo + lente, dos imágenes en la pantalla** (Recu 30/5/26). Para a), el 10: **aumento dado**.',
    ['Objeto entre un espejo cóncavo y una lente', 'Dos imágenes iguales ⇒ la imagen del espejo cae **sobre el objeto** ⇒ $s=R$', 'Una sale derecha y la otra invertida'],
    ['Acá la imagen es **virtual** (la ve un observador, $A>0$)', 'El dato es la **distancia** objeto–imagen, no el aumento'],
    [['El molde es el ejercicio doce de la hoja: espejo más lente, con dos imágenes iguales en la pantalla. Para el ítem a sirve además el diez, con una condición sobre la imagen.'],
     ['Se repite la idea clave: la lente forma una sola imagen de cada objeto, así que para que las dos imágenes coincidan, el espejo tiene que formar su imagen sobre el objeto. Eso pasa en el centro de curvatura.'],
     ['Cambia que acá la imagen es virtual, porque la mira un observador, y que el dato es la distancia entre el objeto y la imagen.']]),

  K.S('Teoría', 'Convergente con imagen derecha', `<div class="grid g2" style="align-items:center">${eqs([
      { t: '\\frac1{s\'}-\\frac1s=\\frac1{f\'}\\qquad A=\\frac{s\'}{s}', s: 0 },
      { t: '\\text{derecha }(A>0)\\ \\Rightarrow\\ s\'<0:\\ \\text{virtual}', s: 1, cls: 'hl' },
      { t: '\\text{espejo: }s\'=s\\ \\Rightarrow\\ \\frac2s=\\frac2R\\ \\Rightarrow\\ s=R', s: 2 },
    ])}${ul(['@1 Objeto entre el foco y la lente: lupa', '@1 Imagen del **lado del objeto**, más lejos y mayor', '@2 Espejo: imagen sobre el objeto ⇔ objeto en el **centro** $C$'])}</div>`, [
    ['Dos herramientas. La ecuación de la lente delgada, con su aumento s prima sobre s.'],
    ['Con una convergente y un objeto real, la imagen sale derecha solo si es virtual: el objeto está entre el foco y la lente, como en una lupa. La imagen queda del mismo lado que el objeto, más lejos y más grande. [A] ¿Y si fuera real? [P] Saldría invertida, y el enunciado pide derecha.'],
    ['Y para el espejo: su imagen cae sobre su objeto cuando s prima es igual a s. Reemplazando, s es igual a R: el objeto tiene que estar en el centro de curvatura.'],
  ]),

  K.S('a) Planteo', 'Dónde va la lente', `<div class="grid g2" style="align-items:center">${eqs([
      { t: 'x_{img}=50-40=10\\ \\text{cm}', s: 0 },
      { t: 's=50-x_L,\\qquad s\'=10-x_L,\\qquad s-s\'=40', s: 1 },
      { t: '\\frac{s-s\'}{s\\,s\'}=\\frac1{30}\\ \\Rightarrow\\ s\\,s\'=1200', s: 2 },
      { t: 'x_L^2-60x_L-700=0\\ \\Rightarrow\\ x_L=70\\ \\ (\\text{o }-10)', s: 3, cls: 'ok' },
    ])}<div>${res('a) lente en $x=70$ cm', { s: 4 })}${callout('$s=-20$ cm, $s\'=-60$ cm, $A=+3$: virtual, derecha, tres veces mayor.', { s: 4, cls: 'ok', style: 'margin-top:22px' })}</div></div>`, [
    ['Ítem a. La lente tiene que estar entre el objeto y el observador, y la imagen virtual queda a la izquierda del objeto: en cincuenta menos cuarenta, diez centímetros.'],
    ['Con el origen en la lente y el positivo hacia la derecha: s es cincuenta menos x L, y s prima es diez menos x L. Los dos negativos, y su diferencia es cuarenta.'],
    ['En la ecuación de la lente, uno sobre s prima menos uno sobre s es s menos s prima sobre s por s prima. Eso es cuarenta sobre s por s prima, igual a un treintavo: s por s prima vale mil doscientos.'],
    ['Queda una cuadrática: x L al cuadrado menos sesenta x L menos setecientos igual a cero. Las raíces son setenta y menos diez. Menos diez está fuera de la regla.'],
    ['La lente va en x igual a setenta. Entonces s es menos veinte, s prima menos sesenta, y el aumento, más tres. [A] ¿Y si probaba con la imagen a la derecha del objeto? [P] La cuadrática no tiene solución real. Confirma que va a la izquierda.'],
  ]),

  K.S('a) Rayos', 'La imagen virtual, tres veces mayor', `${base('g3-a', b.lens(70, 'conv', "f′ = 30 cm") + b.mark(100, 'F′') +
      b.ray('g3-a1', ra1) + b.ray('g3-a2', ra2) + b.ray('g3-a1e', ra1e, 'ext') + b.ray('g3-a2e', ra2e, 'ext') +
      b.arrow(10, 3 * h, 'img', { pend: true, id: 'g3-ai', label: 'imagen: A = +3', lx: b.X(10) + 14, anchor: 'start' }))}`, [
    ['Veámoslo con rayos. El rayo paralelo al eje sale por el foco imagen, en cien.', `draw('#g3-a1',{dur:1800})`],
    ['El que pasa por el centro de la lente sigue derecho.', `draw('#g3-a2',{dur:1600})`],
    ['Los dos salen abriéndose: no se cruzan. Pero el observador los ve venir de donde se cruzan sus prolongaciones: en x igual a diez, tres veces más alto y derecho.', `show('#g3-a1e, #g3-a2e',{from:'fade'}); show('#g3-ai',{delay:900,from:'fade'})`],
  ]),

  K.S('b) El espejo', 'Para ver dos imágenes en el mismo lugar', `<div class="grid g2" style="align-items:center">${eqs([
      { t: '\\text{imagen del espejo sobre el objeto: }s\'=s', s: 0 },
      { t: 's=R=-20\\ \\text{cm}\\ \\Rightarrow\\ x_e=50-20=30\\ \\text{cm}', s: 1, cls: 'ok' },
      { t: 's_2=s_1\'-D=20-40=-20\\ \\Rightarrow\\ s_2\'=-60', s: 2 },
      { t: 'A=(-1)(+3)=-3', s: 3 },
    ])}<div>${res('b) espejo cóncavo en $x=30$ cm', { s: 1 })}${callout('No entre el objeto y la lente (taparía la imagen directa): a la **izquierda** del objeto, mirando hacia él.', { s: 2, cls: 'warn', style: 'margin-top:22px' })}</div></div>`, [
    ['Ítem b. La lente forma una sola imagen de cada objeto. Para que la segunda imagen caiga en x igual a diez, la luz que rebota en el espejo tiene que llegar a la lente como si saliera del objeto. O sea, el espejo tiene que formar su imagen sobre el objeto.'],
    ['Eso pasa con el objeto en el centro de curvatura: s igual a R, menos veinte centímetros. El espejo va veinte centímetros a la izquierda del objeto: en x igual a treinta.'],
    ['Chequeo con la lente: la imagen del espejo está veinte centímetros delante de él, y el espejo está a cuarenta de la lente. s dos es menos veinte, como antes, y la imagen vuelve a caer en x igual a diez. [A] ¿Y no podía ir entre el objeto y la lente? [P] No: taparía la luz directa, y no habría primera imagen.'],
    ['El aumento total es menos uno del espejo por más tres de la lente: menos tres.'],
  ]),

  K.S('b) Rayos', 'Una derecha y otra invertida, superpuestas', `${base('g3-b', b.lens(70, 'conv') + b.mirror(30, 'right', 'concave', 'R = −20 cm') + b.mark(40, 'F') +
      b.arrow(10, 3 * h, 'img', { label: '+3', lx: b.X(10) - 16, anchor: 'end' }) +
      b.ray('g3-b1', rb1, 'b') + b.ray('g3-b2', rb2, 'b') + b.ray('g3-b1e', rb1e, 'b ext') + b.ray('g3-b2e', rb2e, 'b ext') +
      b.arrow(50, -h, 'ghost', { pend: true, id: 'g3-bm', label: 'imagen del espejo', lx: b.X(50) + 14, anchor: 'start' }) +
      b.arrow(10, -3 * h, 'fin', { pend: true, id: 'g3-bf', label: '−3', lx: b.X(10) - 16, anchor: 'end' }))}`, [
    ['Ahora la luz que va hacia el espejo. El rayo paralelo se refleja por el foco del espejo, en cuarenta, y el que llega al vértice rebota simétrico.', `draw('#g3-b1, #g3-b2',{dur:2200,stagger:300})`],
    ['Se cruzan en x igual a cincuenta: una imagen real, invertida y del mismo tamaño, justo sobre el objeto.', `show('#g3-bm',{from:'fade'})`],
    ['Después siguen hacia la lente, que los manda al observador como si vinieran de x igual a diez, tres veces más grande y cabeza abajo. El observador ve dos imágenes superpuestas: una derecha y otra invertida.', `show('#g3-b1e, #g3-b2e',{from:'fade'}); show('#g3-bf',{delay:900,from:'fade'})`],
  ]),

  K.trampas([
    '**Imagen en $x=90$:** "derecha" con convergente ⇒ virtual ⇒ del lado del objeto: $x=10$.',
    '**Signos:** $s$ y $s\'$ negativos. Con $s\'=+60$ sale real e invertida.',
    '**La raíz $x_L=-10$** (o $s=+60$) se descarta.',
    '**Espejo en el foco** (10 cm del objeto): salen paralelos, no hay segunda imagen en $x=10$.',
    '**El segundo aumento es $-3$:** eso distingue las dos imágenes.',
  ], [
    ['Las trampas. Primera: poner la imagen a la derecha del objeto. Derecha con una convergente quiere decir virtual, del lado del objeto.'],
    ['Segunda: los signos. s y s prima son negativos.'],
    ['Tercera: quedarse con la raíz que no corresponde.'],
    ['Cuarta: poner el espejo en el foco. Desde el foco la luz sale paralela, y no forma la segunda imagen donde queremos.'],
    ['Y quinta: la segunda imagen tiene aumento menos tres. Es invertida.'],
  ]),

  K.receta([
    '**1.** "Derecha" con convergente ⇒ virtual ⇒ $x_{img}$ del lado del objeto.',
    '**2.** $s$, $s\'$ en función de $x_L$ ⇒ cuadrática ⇒ raíz física.',
    '**3.** Dos imágenes iguales ⇒ imagen del espejo sobre el objeto ⇒ $s=R$.',
    '**4.** Chequear la vuelta y multiplicar aumentos.',
  ], ['a) lente en $x=70$ cm; imagen en $x=10$, $A=+3$', 'b) espejo cóncavo en $x=30$ cm', 'Dos imágenes en $x=10$: $A=+3$ y $A=-3$'], [
    ['La receta. Uno: imagen derecha con una convergente es virtual, del lado del objeto.'],
    ['Dos: escribir s y s prima en función de la posición de la lente y resolver.'],
    ['Tres: para dos imágenes en el mismo lugar, el objeto en el centro del espejo.'],
    ['Cuatro: chequear la vuelta y multiplicar los aumentos.'],
    ['Resultados: lente en setenta, espejo en treinta, y dos imágenes en diez, de aumento más tres y menos tres.'],
  ]),
];
