// Red 4 · 2P 11/11/2023, ej. 2: 510; 599,9; 600,1 nm; 40 rendijas/mm, a = 10 µm, haz de 3 cm, pantalla de ancho D a L = 3,6 m.
// Resultados verificados (soluciones/Red4.py): d = 25 µm, N = 1200, d/a = 2,5 ⇒ faltan 5, 10; λ/Δλ = 3000 ⇒ m ≥ 2,5 ⇒ resueltas desde m = 3;
// 10ª línea de un lado: λ3, m = 4 en y = 34,726 cm; 11ª: λ1, m = 6 en 44,398 cm ⇒ 21 líneas si 0,6945 m ≤ D < 0,8880 m.
const { md, ul, card, callout, eqs, res, table } = require('../../lib');
const { seccion } = require('../common');
const { kit, pantalla } = require('../fx');

const SEC = 'Red 4 · 21 líneas: ancho de pantalla';
const B = 'b-red';
const K = kit(SEC, B);
const C1 = '#5fe08a', C2 = '#ffb347';
const pos = [[7.35, C1, 1], [8.64, C2, 2], [14.70, C1, 3], [17.30, C2, 4], [22.07, C1, 5], [25.99, C2, 6, true], [29.47, C1, 8], [34.72, C2, 9, true], [44.40, C1, 11]];
const lines = [{ y: 0, color: '#fff', cls: 'r4-l0 pending' }];
for (const s of [-1, 1]) pos.forEach(([y, c, k, pair]) => lines.push({ y: s * y, color: c, pair, cls: `r4-l${k} pending` }));
const pant = pantalla({ id: 'r4-p', half: 50, lines, ticks: [-44.4, -34.73, 0, 34.73, 44.4], h: 250,
  extra: X => `<rect id="r4-win" class="pending" x="${X(-40)}" y="20" width="${X(40) - X(-40)}" height="190" rx="8" style="fill:rgba(255,197,98,.10);stroke:var(--warn);stroke-width:4;stroke-dasharray:12 8"/>
    <text id="r4-wt" class="pending" x="${X(0)}" y="14" text-anchor="middle" style="fill:var(--warn);font-size:24px;font-weight:700">D/2 entre 34,73 y 44,40 cm</text>` });

module.exports = [
  seccion('Red 4', '21 líneas: ancho de pantalla', 'Segundo parcial del 11/11/2023 · ejercicio 2',
    'Ejercicio de redes número cuatro: segundo parcial del once de noviembre de dos mil veintitrés, ejercicio dos. Tres colores, dos casi iguales, y la pregunta al revés: qué ancho tiene que tener la pantalla para ver exactamente veintiuna líneas.'),

  K.enunciado('Red4.jpg', ['@1 $\\lambda$: 510; 599,9; 600,1 nm', '@1 40 rendijas/mm ⇒ $d=25\\ \\mu$m', '@1 $a=10\\ \\mu$m; haz de 3 cm', '@2 pantalla de ancho $D$ a $L=3{,}6$ m', '@2 ¿$D$ para ver **exactamente 21 líneas**?'], [
    ['Este es el enunciado. Vamos con los datos.'],
    ['Tres longitudes de onda: quinientos diez, y dos casi iguales, quinientos noventa y nueve coma nueve y seiscientos coma uno. La red tiene cuarenta rendijas por milímetro, de diez micrones, iluminada en tres centímetros.'],
    ['La pantalla está a tres coma seis metros y su ancho, D, es la incógnita: hay que encontrar para qué anchos se ven exactamente veintiuna líneas. Ojo, que acá D es el ancho, no la distancia.'],
  ], { maxH: 440 }),

  K.molde('Ejercicios 19 y 20 de la hoja: **¿cuántas líneas se ven?** y **pantalla finita**.',
    ['$d$, $N$ y órdenes que faltan', 'Resolución: $mN\\ge\\lambda/\\Delta\\lambda$', 'Ordenar las líneas de un lado; $y=L\\tg\\theta$'],
    ['La pregunta va al revés: dan las líneas, piden el **ancho**', 'Resultado: un **intervalo**, entre la 10ª y la 11ª línea'],
    [['El molde son los ejercicios diecinueve y veinte de la hoja: contar líneas con una pantalla finita.'],
     ['Se repite la receta: d y N, órdenes que faltan, resolución, y las posiciones con la tangente.'],
     ['Cambia que la pregunta va al revés: nos dan cuántas líneas y piden el ancho. La respuesta es un intervalo.']]),

  K.S('Pasos 1 y 2', 'La red y la resolución', `<div class="grid g2" style="align-items:center">${eqs([
      { t: 'd=\\frac{1\\ \\text{mm}}{40}=25\\ \\mu\\text{m}\\qquad N=30\\cdot40=1200', s: 0 },
      { t: '\\frac da=2{,}5\\ \\Rightarrow\\ \\text{faltan }m=5,\\,10', s: 1 },
      { t: '\\frac{\\lambda}{\\Delta\\lambda}=\\frac{600}{0{,}2}=3000\\ \\Rightarrow\\ m\\ge\\frac{3000}{1200}=2{,}5', s: 2 },
      { t: '\\text{resueltas desde }m=3', s: 2, cls: 'ok' },
    ])}${ul(['@2 $m=1$ y $m=2$: λ₂ y λ₃ forman **una** línea', '@2 $m\\ge3$: **dos** líneas', '@3 510 nm siempre separada ($\\lambda/\\Delta\\lambda\\approx6$)'])}</div>`, [
    ['Paso uno: d es un milímetro sobre cuarenta, veinticinco micrones. Y N, tres centímetros por cuarenta por milímetro: mil doscientas rendijas.'],
    ['d sobre a es dos coma cinco: faltan los órdenes cinco y diez.'],
    ['Paso dos: los dos naranjas. Lambda sobre delta lambda es seiscientos sobre cero coma dos: tres mil. m tiene que ser al menos tres mil sobre mil doscientos, dos coma cinco. O sea, desde el orden tres. En el uno y el dos forman una sola línea.'],
    ['El verde, de quinientos diez, está lejísimos de los otros: siempre se ve aparte.'],
  ]),

  K.S('Paso 3', 'Las líneas de un lado, ordenadas', table([
    ['#', 'línea', '$\\sen\\theta$', '$y=3{,}6\\tg\\theta$ (cm)'],
    { cells: ['1', '510, $m=1$', '0,0204', '7,35'], s: 0 }, { cells: ['2', '600 (juntas), $m=1$', '0,0240', '8,64'], s: 0 },
    { cells: ['3', '510, $m=2$', '0,0408', '14,70'], s: 0 }, { cells: ['4', '600 (juntas), $m=2$', '0,0480', '17,30'], s: 0 },
    { cells: ['5', '510, $m=3$', '0,0612', '22,07'], s: 1 }, { cells: ['6–7', '599,9 y 600,1, $m=3$', '0,0720', '25,98 y 25,99'], s: 1 },
    { cells: ['8', '510, $m=4$', '0,0816', '29,47'], s: 1 }, { cells: ['9', '599,9, $m=4$', '0,09598', '34,715'], s: 1 },
    { cells: ['**10**', '**600,1, $m=4$**', '0,09602', '**34,726**'], s: 2, cls: 'hl' },
    { cells: ['—', '$m=5$: faltan', '', ''], s: 2, cls: 'dead' },
    { cells: ['**11**', '**510, $m=6$**', '0,1224', '**44,398**'], s: 3, cls: 'hl' },
  ], { style: 'font-size:.82em;width:100%' }), [
    ['Paso tres: ordenamos las líneas de un lado según su seno, y pasamos a posición con tres coma seis por la tangente. En los órdenes uno y dos hay dos líneas por orden: la verde y la naranja doble sin resolver.'],
    ['En el orden tres y el cuatro, la naranja se separa en dos: tres líneas por orden.'],
    ['La décima línea es la de seiscientos coma uno en el orden cuatro, a treinta y cuatro coma siete dos seis centímetros. El orden cinco falta entero.'],
    ['Y la undécima es la verde del orden seis, a cuarenta y cuatro coma cuatro. [A] ¿Por qué no la verde del cinco? [P] Porque el cinco falta, para todos los colores.'],
  ], { top: true }),

  K.S('Paso 4', 'El ancho de la pantalla', `<div style="display:flex;flex-direction:column;gap:22px;align-items:center">${pant}
      <div class="grid g2" style="width:100%;align-items:center">${eqs([
        { t: '21=2\\cdot10+1\\ \\Rightarrow\\ 10\\ \\text{por lado}', s: 1 },
        { t: '34{,}726\\le\\frac D2<44{,}398\\ \\text{cm}', s: 2 },
      ])}${res('$0{,}6945\\ \\text{m}\\le D<0{,}888\\ \\text{m}$', { s: 3 })}</div></div>`, [
    ['Dibujemos la pantalla con todas las líneas: la central, y de cada lado las verdes y las naranjas.', `show('.r4-l0'); [1,2,3,4,5,6,8,9,11].forEach((k,i)=>show('.r4-l'+k,{delay:300+i*350,from:'fade'}))`],
    ['Veintiuna líneas es la central más diez por lado.'],
    ['Entonces el borde de la pantalla tiene que llegar a la décima, a treinta y cuatro coma siete dos seis centímetros, pero no a la undécima, en cuarenta y cuatro coma cuatro.', `show('#r4-win, #r4-wt',{from:'fade'})`],
    ['Como el borde está en D sobre dos, D va de sesenta y nueve coma cuatro cinco centímetros a ochenta y ocho coma ocho, sin incluir este último. [A] ¿Por qué un extremo con igual y el otro sin? [P] La décima puede quedar justo en el borde y se ve; la undécima tiene que quedar afuera.'],
  ]),

  K.trampas([
    '**Falta $m=5$:** si no, la 11ª sería 510 en $m=5$ y saldría $D<0{,}738$ m.',
    '**En $m=1$ y $2$ no se resuelven:** $mN=1200$ y $2400<3000$.',
    '**$m\\ge2{,}5$ ⇒ $m=3$**, redondeando hacia arriba.',
    '**$D$ es el ancho:** el borde está en $D/2$; la distancia es 3,6 m.',
    '**Los dos naranjas de $m=4$ casi coinciden:** si el borde cae entre ellos, se ven 19.',
  ], [
    ['Las trampas. Primera: el orden cinco falta.'],
    ['Segunda: en los órdenes uno y dos los naranjas no se separan.'],
    ['Tercera: dos coma cinco se redondea hacia arriba: tres.'],
    ['Cuarta: D es el ancho, así que el borde está en D medios.'],
    ['Y quinta: los dos naranjas del orden cuatro están a una décima de milímetro. Si el borde cae entre ellos, se ven diecinueve líneas.'],
  ]),

  K.receta([
    '**1.** $d$, $N$, faltan $m=p\\,d/a$.',
    '**2.** Resolución: desde qué $m$ se separan.',
    '**3.** Ordenar las líneas de un lado; $y=L\\tg\\theta$.',
    '**4.** Total $=2k+1$ ⇒ la $k$-ésima adentro, la $(k+1)$-ésima afuera.',
  ], ['$d=25\\ \\mu$m; $N=1200$; faltan 5 y 10', 'Resueltas desde $m=3$', '10ª: 34,726 cm; 11ª: 44,398 cm', '**$0{,}6945\\le D<0{,}888$ m**'], [
    ['La receta. Uno: d, N y los que faltan.'],
    ['Dos: desde qué orden se separan los colores cercanos.'],
    ['Tres: las líneas ordenadas con su posición.'],
    ['Cuatro: la línea k adentro y la siguiente afuera.'],
    ['Resultado: D entre sesenta y nueve coma cinco y ochenta y ocho coma ocho centímetros.'],
  ]),
];
