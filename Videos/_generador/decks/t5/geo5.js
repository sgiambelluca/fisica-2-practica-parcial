// Geo 5 · 1P 20/4/2024, ej. 1. Verificado (soluciones/Geo5.py): V = 32·8 = 256 dm³ = 0,256 m³; Δh = 0,256/0,64 = 0,40 m ⇒ h = 0,40 m;
// se oscurece cuando r_disco = h tg θ_L ⇒ tg θ_L = 0,28/0,40 = 0,7, θ_L = 35,0°, sen θ_L = 0,28/0,4883 = 0,5735 ⇒ n = √149/7 = 1,744.
// Trampas: diámetro ⇒ 1,23; h = 80 cm ⇒ 3,03; sen = r/h ⇒ 1,43. Radio de luz: t = 0 s 56 cm; 2 s 49; 4 s 42; 6 s 35; 8 s 28.
const { md, ul, card, callout, table, eqs, res, datos, img, molde } = require('../../lib');
const { seccion } = require('../common');

const SEC = 'Geo 5 · Disco flotante y válvula';
const B = 'b-geo';

// ---------------------------------------------------------------- corte del recipiente (cm -> px)
const K = 6.5, X0 = 120, X1 = 640, YB = 650, XC = 380, RD = 28, TG = 0.7;
const ys = u => YB - K * (80 - 40 * u);                // nivel del líquido
const rp = u => K * TG * (80 - 40 * u);                // radio del círculo de luz, en px
const f1 = v => v.toFixed(1);
const dLiq = u => `M${X0},${f1(ys(u))} L${X1},${f1(ys(u))} L${X1},${YB} L${X0},${YB} Z`;
const dDisco = u => `M${XC - RD * K},${f1(ys(u) - 9)} L${XC + RD * K},${f1(ys(u) - 9)} L${XC + RD * K},${f1(ys(u) + 3)} L${XC - RD * K},${f1(ys(u) + 3)} Z`;
const dCono = u => `M${XC},${YB} L${f1(XC - rp(u))},${f1(ys(u))} L${f1(XC + rp(u))},${f1(ys(u))} Z`;
const dGlowR = u => { const a = XC + RD * K, b = Math.max(a, Math.min(XC + rp(u), X1)); return `M${a},${f1(ys(u) - 3)} L${f1(b)},${f1(ys(u) - 3)}`; };
const dGlowL = u => { const a = XC - RD * K, b = Math.min(a, Math.max(XC - rp(u), X0)); return `M${a},${f1(ys(u) - 3)} L${f1(b)},${f1(ys(u) - 3)}`; };
const dCota = u => `M85,${YB} L85,${f1(ys(u))}`;
// vista desde arriba
const KT = 5.2, CT = 250;
const circ = (r, cx = CT, cy = CT) => `M${f1(cx - r)},${cy} a${f1(r)},${f1(r)} 0 1,0 ${f1(2 * r)},0 a${f1(r)},${f1(r)} 0 1,0 ${f1(-2 * r)},0 Z`;
const dLuzTop = u => circ(KT * TG * (80 - 40 * u));

const corte = `<svg id="g5corte" viewBox="0 0 760 720" style="width:690px;overflow:visible">
  <defs><clipPath id="g5clipT"><rect x="${X0}" y="40" width="${X1 - X0}" height="${YB - 40}"/></clipPath>
    <linearGradient id="g5gc" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ffd76a" stop-opacity=".55"/><stop offset="1" stop-color="#ffd76a" stop-opacity=".12"/></linearGradient>
    <filter id="g5blur" x="-20%" y="-200%" width="140%" height="500%"><feGaussianBlur stdDeviation="4"/></filter></defs>
  <path id="g5liq" d="${dLiq(0)}" fill="rgba(90,169,255,.20)"/>
  <path id="g5cono" d="${dCono(0)}" fill="url(#g5gc)" clip-path="url(#g5clipT)"/>
  <path id="g5glowR" d="${dGlowR(0)}" stroke="#ffd76a" stroke-width="12" filter="url(#g5blur)"/>
  <path id="g5glowL" d="${dGlowL(0)}" stroke="#ffd76a" stroke-width="12" filter="url(#g5blur)"/>
  <path id="g5glowR2" d="${dGlowR(0)}" stroke="#fff3c4" stroke-width="5"/>
  <path id="g5glowL2" d="${dGlowL(0)}" stroke="#fff3c4" stroke-width="5"/>
  <path id="g5disco" d="${dDisco(0)}" fill="#05080d" stroke="#8fa6c4" stroke-width="2"/>
  <path d="M${X0},${YB - 520 - 20} L${X0},${YB} L${X1},${YB} L${X1},${YB - 520 - 20}" fill="none" stroke="#8fa6c4" stroke-width="7" stroke-linejoin="round"/>
  <rect x="${X1 - 10}" y="${YB - 8}" width="60" height="20" rx="4" fill="#3a4d6b" stroke="#8fa6c4" stroke-width="2"/><text x="${X1 + 60}" y="${YB + 8}" font-size="22" fill="#93a4bc">válvula</text>
  <path d="M${XC},${YB - 16} l5,10 11,1 -8,8 2,11 -10,-5 -10,5 2,-11 -8,-8 11,-1 Z" fill="#ffd76a" stroke="#fff" stroke-width="1.5"/>
  <path id="g5cota" d="${dCota(0)}" stroke="#93a4bc" stroke-width="3" stroke-dasharray="8 6"/>
  <text x="58" y="${YB - 20}" font-size="30" fill="#93a4bc" font-style="italic">h</text>
  <g id="g5h80"><text x="${X1 + 20}" y="${ys(0) + 10}" font-size="26" fill="#93a4bc">h = 80 cm</text></g>
  <g id="g5h40" class="pending"><text x="${X1 + 20}" y="${ys(1) + 10}" font-size="26" fill="#ffc562" font-weight="700">h = 40 cm</text></g>
  <g id="g5lim" class="pending"><line x1="${XC}" y1="${YB}" x2="${XC + RD * K}" y2="${ys(1)}" stroke="#ff8ad8" stroke-width="4" stroke-dasharray="12 8"/>
    <line x1="${XC}" y1="${YB}" x2="${XC}" y2="${ys(1) - 40}" stroke="#93a4bc" stroke-width="2" stroke-dasharray="6 6"/>
    <path d="M${XC},${YB - 70} A70,70 0 0,1 ${f1(XC + 70 * Math.sin(Math.atan(TG)))},${f1(YB - 70 * Math.cos(Math.atan(TG)))}" fill="none" stroke="#ff8ad8" stroke-width="3"/>
    <text x="${XC + 18}" y="${YB - 84}" font-size="28" fill="#ff8ad8" font-weight="700">θ<tspan baseline-shift="sub" font-size="18">L</tspan></text>
    <text x="${XC + RD * K / 2}" y="${ys(1) - 18}" font-size="26" fill="#ff8ad8" text-anchor="middle" font-weight="700">r = 28 cm</text></g>
  <rect x="${X0}" y="${YB + 44}" width="${X1 - X0}" height="14" rx="7" fill="#17243a" stroke="#2a3d5c"/>
  <rect id="g5reloj" x="${X0}" y="${YB + 44}" width="${X1 - X0}" height="14" rx="7" fill="#c49bff" style="transform-box:fill-box;transform-origin:0% 50%;transform:scaleX(0)"/>
  <text x="${X0 - 12}" y="${YB + 57}" font-size="22" fill="#93a4bc" text-anchor="end">0 s</text><text x="${X1 + 12}" y="${YB + 57}" font-size="22" fill="#93a4bc">8 s</text>
</svg>`;
const arriba = `<svg id="g5top" viewBox="0 0 500 540" style="width:430px;overflow:visible">
  <defs><clipPath id="g5clipQ"><rect x="${CT - 40 * KT}" y="${CT - 40 * KT}" width="${80 * KT}" height="${80 * KT}"/></clipPath></defs>
  <rect x="${CT - 40 * KT}" y="${CT - 40 * KT}" width="${80 * KT}" height="${80 * KT}" fill="rgba(90,169,255,.12)" stroke="#8fa6c4" stroke-width="4"/>
  <path id="g5luz" d="${dLuzTop(0)}" fill="#ffd76a" fill-opacity=".85" clip-path="url(#g5clipQ)"/>
  <path d="${circ(RD * KT)}" fill="#05080d" stroke="#8fa6c4" stroke-width="2"/>
  <text x="${CT}" y="${CT + 10}" font-size="24" fill="#61728c" text-anchor="middle">disco</text>
  <text x="${CT}" y="${CT + 40 * KT + 44}" font-size="26" fill="#93a4bc" text-anchor="middle">visto desde arriba</text>
</svg>`;

const script = `<script>
function geo5_frames(el, fn, dur) {
  const nk = Math.max(2, Math.round(dur / 1000 * 24));
  el.setAttribute('d', fn(1));
  el.animate(Array.from({ length: nk + 1 }, (_, i) => ({ d: 'path("' + fn(i / nk) + '")' })), { duration: dur, easing: 'linear', fill: 'backwards' });
}
function geo5_vaciar(dur) {
  const K = ${K}, X0 = ${X0}, X1 = ${X1}, YB = ${YB}, XC = ${XC}, RD = ${RD}, TG = ${TG}, KT = ${KT}, CT = ${CT};
  const f1 = v => v.toFixed(1), ys = u => YB - K * (80 - 40 * u), rp = u => K * TG * (80 - 40 * u);
  const circ = r => 'M' + f1(CT - r) + ',' + CT + ' a' + f1(r) + ',' + f1(r) + ' 0 1,0 ' + f1(2 * r) + ',0 a' + f1(r) + ',' + f1(r) + ' 0 1,0 ' + f1(-2 * r) + ',0 Z';
  const gR = u => { const a = XC + RD * K, b = Math.max(a, Math.min(XC + rp(u), X1)); return 'M' + a + ',' + f1(ys(u) - 3) + ' L' + f1(b) + ',' + f1(ys(u) - 3); };
  const gL = u => { const a = XC - RD * K, b = Math.min(a, Math.max(XC - rp(u), X0)); return 'M' + a + ',' + f1(ys(u) - 3) + ' L' + f1(b) + ',' + f1(ys(u) - 3); };
  const q = id => S.querySelector(id);
  geo5_frames(q('#g5liq'), u => 'M' + X0 + ',' + f1(ys(u)) + ' L' + X1 + ',' + f1(ys(u)) + ' L' + X1 + ',' + YB + ' L' + X0 + ',' + YB + ' Z', dur);
  geo5_frames(q('#g5disco'), u => 'M' + (XC - RD * K) + ',' + f1(ys(u) - 9) + ' L' + (XC + RD * K) + ',' + f1(ys(u) - 9) + ' L' + (XC + RD * K) + ',' + f1(ys(u) + 3) + ' L' + (XC - RD * K) + ',' + f1(ys(u) + 3) + ' Z', dur);
  geo5_frames(q('#g5cono'), u => 'M' + XC + ',' + YB + ' L' + f1(XC - rp(u)) + ',' + f1(ys(u)) + ' L' + f1(XC + rp(u)) + ',' + f1(ys(u)) + ' Z', dur);
  ['#g5glowR', '#g5glowR2'].forEach(s => geo5_frames(q(s), gR, dur));
  ['#g5glowL', '#g5glowL2'].forEach(s => geo5_frames(q(s), gL, dur));
  geo5_frames(q('#g5cota'), u => 'M85,' + YB + ' L85,' + f1(ys(u)), dur);
  geo5_frames(q('#g5luz'), u => circ(KT * TG * (80 - 40 * u)), dur);
  const rl = q('#g5reloj'); rl.style.transform = 'scaleX(1)';
  rl.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: dur, easing: 'linear', fill: 'backwards' });
  hide('#g5h80', { dur: 300 }); show('#g5h40', { delay: dur, from: 'fade' });
}
</script>`;

// ---------------------------------------------------------------- teoría: rayos desde la fuente
const N = 1.744, SY = 560, HY = 300, SX = 330;
const rayos = (() => {
  let h = '';
  const angs = [0, 16, 27, 34.99, 46, 58];
  angs.forEach((a, i) => {
    const t = a * Math.PI / 180, xh = SX + (SY - HY) * Math.tan(t);
    const sTL = i === 3, tir = a > 35;
    const step = a === 0 || a < 30 ? 0 : sTL ? 1 : 2;
    h += `<g class="g5ray" data-s="${step}"><line class="inc" x1="${SX}" y1="${SY}" x2="${f1(xh)}" y2="${HY}" stroke="${sTL ? '#ff8ad8' : '#ffd76a'}" stroke-width="${sTL ? 5 : 4}"/>`;
    if (!tir) {
      const tp = sTL ? Math.PI / 2 : Math.asin(N * Math.sin(t)), L = 170;
      h += `<line class="out" x1="${f1(xh)}" y1="${HY}" x2="${f1(xh + L * Math.sin(tp))}" y2="${f1(HY - L * Math.cos(tp))}" stroke="${sTL ? '#ff8ad8' : '#fff3c4'}" stroke-width="${sTL ? 5 : 4}"/>`;
    } else {
      const L = 170;
      h += `<line class="out" x1="${f1(xh)}" y1="${HY}" x2="${f1(xh + L * Math.sin(t))}" y2="${f1(HY + L * Math.cos(t))}" stroke="#ff6f7d" stroke-width="4" stroke-dasharray="10 7"/>`;
    }
    h += '</g>';
  });
  const xl = SX + (SY - HY) * TG;
  h += `<g data-s="1"><line x1="${f1(xl)}" y1="${HY - 120}" x2="${f1(xl)}" y2="${HY + 120}" stroke="#93a4bc" stroke-width="2" stroke-dasharray="6 6"/>
    <text x="${f1(xl + 40)}" y="${HY - 18}" font-size="26" fill="#ff8ad8" font-weight="700">sale rasante (90°)</text></g>
    <g data-s="2"><text x="${f1(SX + (SY - HY) * 1.2)}" y="${HY + 200}" font-size="26" fill="#ff6f7d" font-weight="700">reflexión total</text></g>
    <g data-s="3"><path d="M${SX},${HY + 26} L${SX},${HY + 8} L${f1(xl)},${HY + 8} L${f1(xl)},${HY + 26}" fill="none" stroke="#ffc562" stroke-width="4"/>
    <text x="${SX - 24}" y="${HY + 34}" font-size="30" fill="#ffc562" font-weight="700" text-anchor="end">r = h·tg θ<tspan baseline-shift="sub" font-size="20">L</tspan></text></g>`;
  return h;
})();
const teoria = `<svg id="g5teo" viewBox="0 0 1000 640" style="width:960px;overflow:visible">
  <rect x="40" y="${HY}" width="940" height="${SY - HY + 40}" fill="rgba(90,169,255,.16)"/>
  <line x1="40" y1="${HY}" x2="980" y2="${HY}" stroke="#8fa6c4" stroke-width="4"/>
  <text x="60" y="${HY - 20}" font-size="26" fill="#93a4bc">aire, n' = 1</text><text x="60" y="${SY + 20}" font-size="26" fill="#93a4bc">líquido, n</text>
  <line x1="${SX}" y1="${SY}" x2="${SX}" y2="${HY}" stroke="#61728c" stroke-width="2" stroke-dasharray="6 6"/>
  <text x="${SX - 40}" y="${(SY + HY) / 2}" font-size="30" fill="#93a4bc" font-style="italic">h</text>
  ${rayos}
  <path d="M${SX},${SY - 16} l5,10 11,1 -8,8 2,11 -10,-5 -10,5 2,-11 -8,-8 11,-1 Z" fill="#ffd76a" stroke="#fff" stroke-width="1.5"/>
</svg>`;

// triángulo h–r
const TX = 160, TY = 600, TS = 11; // escala px/cm
const tri = `<svg id="g5tri" viewBox="0 0 700 680" style="width:600px;overflow:visible">
  <rect x="${TX - 6}" y="${TY - 40 * TS - 14}" width="${28 * TS + 12}" height="14" fill="#05080d" stroke="#8fa6c4" stroke-width="2"/>
  <line id="g5th" x1="${TX}" y1="${TY}" x2="${TX}" y2="${TY - 40 * TS}" stroke="#93a4bc" stroke-width="5"/>
  <line id="g5tr" x1="${TX}" y1="${TY - 40 * TS}" x2="${TX + 28 * TS}" y2="${TY - 40 * TS}" stroke="#ffc562" stroke-width="5"/>
  <line id="g5thy" x1="${TX}" y1="${TY}" x2="${TX + 28 * TS}" y2="${TY - 40 * TS}" stroke="#ff8ad8" stroke-width="5"/>
  <path d="M${TX},${TY - 80} A80,80 0 0,1 ${f1(TX + 80 * Math.sin(Math.atan(TG)))},${f1(TY - 80 * Math.cos(Math.atan(TG)))}" fill="none" stroke="#ff8ad8" stroke-width="3"/>
  <text x="${TX + 12}" y="${TY - 92}" font-size="30" fill="#ff8ad8" font-weight="700">θ<tspan baseline-shift="sub" font-size="20">L</tspan></text>
  <text x="${TX - 20}" y="${TY - 20 * TS}" font-size="32" fill="#93a4bc" text-anchor="end">h = 40</text>
  <text x="${TX + 14 * TS}" y="${TY - 40 * TS - 30}" font-size="32" fill="#ffc562" text-anchor="middle">r = 28</text>
  <text x="${TX + 14 * TS + 40}" y="${TY - 20 * TS + 40}" font-size="32" fill="#ff8ad8">48,8</text>
  <text x="${TX + 28 * TS + 20}" y="${TY - 40 * TS + 10}" font-size="24" fill="#61728c">borde del disco</text>
  <path d="M${TX},${TY - 16} l5,10 11,1 -8,8 2,11 -10,-5 -10,5 2,-11 -8,-8 11,-1 Z" fill="#ffd76a" stroke="#fff" stroke-width="1.5"/>
  <text x="${TX}" y="${TY + 50}" font-size="24" fill="#61728c" text-anchor="middle">fuente (cm)</text>
</svg>`;

// frente del cubo: lo que se va y lo que queda
const cubo = `<svg viewBox="0 0 420 470" style="width:380px;overflow:visible">
  <rect x="60" y="40" width="320" height="160" fill="rgba(255,111,125,.16)" stroke="#ff6f7d" stroke-width="3" stroke-dasharray="10 7" data-s="1"/>
  <text x="220" y="112" font-size="26" fill="#ff6f7d" text-anchor="middle" data-s="1">se van 256 dm³</text><text x="220" y="148" font-size="24" fill="#ff6f7d" text-anchor="middle" data-s="1">Δh = 40 cm</text>
  <rect x="60" y="200" width="320" height="160" fill="rgba(90,169,255,.25)" data-s="2"/>
  <text x="220" y="290" font-size="26" fill="#bfe8ff" text-anchor="middle" data-s="2">queda h = 40 cm</text>
  <path d="M60,30 L60,360 L380,360 L380,30" fill="none" stroke="#8fa6c4" stroke-width="6"/>
  <text x="220" y="410" font-size="24" fill="#93a4bc" text-anchor="middle">base 0,8 × 0,8 = 0,64 m²</text>
</svg>`;

module.exports = [
  seccion('Geo 5', 'Disco flotante y válvula', 'Primer parcial del 20/4/2024 · ejercicio 1',
    'Ejercicio de óptica geométrica número cinco: primer parcial del veinte de abril de dos mil veinticuatro, ejercicio uno. Un recipiente que se vacía, un disco negro que flota y una luz en el fondo: con el momento en que todo se oscurece, sacamos el índice del líquido.'),

  {
    sec: 'Geo 5 · Enunciado', title: 'Qué dice el enunciado', cls: B, chapter: SEC,
    html: `${script}<div style="display:flex;flex-direction:column;gap:34px;align-items:center">${img('Geo5.jpg', { style: 'width:1500px' })}
      ${datos(['@1 cubo de $a = 80$ cm, lleno al ras', '@1 fuente en el centro del fondo', '@2 disco negro de $56$ cm ⇒ radio $28$ cm', '@3 desagota $32$ dm³/s', '@3 a los $8$ s: superficie oscura', '@4 arriba hay aire: $n\' = 1$'], { style: 'justify-content:center;max-width:1650px' })}</div>`,
    steps: [
      ['Este es el enunciado. Lo leemos y anotamos los datos.'],
      ['Un recipiente cúbico de ochenta centímetros de lado, abierto arriba y lleno al ras con un líquido transparente. En el centro del fondo hay una fuente de luz chiquita.'],
      ['Sobre el líquido flota un disco de plástico negro de cincuenta y seis centímetros de diámetro, centrado sobre la fuente. O sea, de veintiocho centímetros de radio.'],
      ['Se abre una válvula que desagota treinta y dos decímetros cúbicos por segundo. A los ocho segundos, alguien que mira desde arriba ve que la superficie se pone oscura.'],
      ['Hay que encontrar el índice de refracción del líquido. [A] ¿Y el aire de arriba? [P] Lo tomamos con índice uno, como siempre que no dicen otra cosa.'],
    ],
  },

  {
    sec: 'Geo 5 · Antes de calcular', title: 'Buscar el molde en la hoja', cls: B, chapter: SEC,
    html: `${molde('Ejercicio 8 de la hoja: **reflexión total, superficie iluminada**. Solo sale luz donde $\\theta < \\theta_L$, con $\\sen\\theta_L = \\frac{n\'}{n}$: un círculo de radio $r = h\\,\\tg\\theta_L$.', { s: 0 })}
      <div class="grid g2" style="margin-top:40px">
        ${card('Lo que se repite', ul(['Fuente en el fondo, a profundidad $h$', 'Ángulo límite: $\\sen\\theta_L = \\frac{n\'}{n}$', 'Círculo de luz: $r = h\\,\\tg\\theta_L$', 'Despejar $n$ al final']), { cls: 'ok', s: 1 })}
        ${card('Lo que cambia', ul(['El disco **tapa** el centro del círculo de luz', 'La profundidad **cambia**: el recipiente se vacía', 'El dato es el **instante** en que se oscurece', '$h$ sale del caudal: dm³ → m³']), { cls: 'warn', s: 2 })}
      </div>`,
    steps: [
      ['El molde en la hoja es el ejercicio ocho: la superficie iluminada por una fuente sumergida. La idea es la misma: solo sale luz por un círculo, y su radio es la profundidad por la tangente del ángulo límite.'],
      ['Se repite la geometría: fuente en el fondo, ángulo límite, radio del círculo, y despejar el índice al final.'],
      ['Lo que cambia: hay un disco que tapa el centro, la profundidad va bajando porque el recipiente se vacía, y el dato es el instante en que se oscurece. Además, la profundidad sale del caudal.'],
    ],
  },

  {
    sec: 'Geo 5 · Teoría', title: 'Ángulo límite: por dónde sale la luz', cls: B, chapter: SEC,
    css: `.g5t{display:grid;grid-template-columns:960px 1fr;gap:40px;align-items:center}`,
    html: `<div class="g5t"><div>${teoria}</div>${eqs([
      { t: 'n\\,\\sen\\theta = n\'\\,\\sen\\theta\'', s: 0 },
      { t: '\\theta\' = 90° \\Rightarrow \\sen\\theta_L = \\frac{n\'}{n}', s: 1, cls: 'hl' },
      { t: '\\theta > \\theta_L:\\ \\text{reflexión total}', s: 2 },
      { t: 'r = h\\,\\tg\\theta_L', s: 3, cls: 'ok' },
    ])}</div>`,
    steps: [
      ['Repasemos la teoría. Desde la fuente salen rayos en todas las direcciones. Al llegar a la superficie se refractan con la ley de Snell. Como el aire tiene menor índice, el rayo que sale se aleja de la normal.', `draw('#g5teo .g5ray[data-s="0"] line.inc',{dur:700,stagger:250}); draw('#g5teo .g5ray[data-s="0"] line.out',{delay:900,dur:700,stagger:250})`],
      ['Si el rayo llega más inclinado, sale más inclinado todavía. Hay un ángulo para el que sale rasante, a noventa grados: es el ángulo límite. Poniendo noventa grados en Snell, el seno del ángulo límite es n prima sobre n.', `draw('#g5teo .g5ray[data-s="1"] line.inc',{dur:800}); draw('#g5teo .g5ray[data-s="1"] line.out',{delay:900,dur:700})`],
      ['[A] ¿Y los rayos que llegan todavía más inclinados? [P] No pueden salir: se reflejan enteros hacia abajo. Es la reflexión total interna.', `draw('#g5teo .g5ray[data-s="2"] line.inc',{dur:700,stagger:300}); draw('#g5teo .g5ray[data-s="2"] line.out',{delay:900,dur:700,stagger:300})`],
      ['Entonces, desde arriba, solo se ve luz en un círculo centrado sobre la fuente. Su radio sale del triángulo: la profundidad por la tangente del ángulo límite. Afuera de ese círculo la superficie se ve oscura.'],
    ],
  },

  {
    sec: 'Geo 5 · La idea', title: 'El recipiente se vacía y el círculo se achica', cls: B, chapter: SEC,
    css: `.g5v{display:grid;grid-template-columns:700px 1fr;gap:40px;align-items:center}`,
    html: `<div class="g5v"><div>${corte}</div><div style="display:flex;flex-direction:column;align-items:center;gap:26px">${arriba}
      ${eqs([{ t: 'r_d = h\\,\\tg\\theta_L', s: 2, cls: 'hl', note: 'en $t = 8$ s' }], { style: 'padding:14px 34px' })}</div></div>`,
    steps: [
      ['Ahora juntemos todo. Al principio, con ochenta centímetros de líquido, el círculo de luz es mucho más grande que el disco. El disco tapa el centro, pero alrededor sale luz: desde arriba se ve un anillo iluminado.'],
      ['Se abre la válvula. El nivel baja, el disco baja flotando, y como el ángulo límite no cambia, el radio del círculo de luz baja junto con la profundidad. El anillo se va angostando, hasta que a los ocho segundos desaparece.', `geo5_vaciar(talk(400))`],
      ['Ese es el instante clave: el círculo de luz quedó exactamente del tamaño del disco. Toda la luz que podría salir choca con el disco. [A] ¿Y por qué no antes? [P] Porque antes el círculo era más grande y sobraba un anillo. Entonces, a los ocho segundos, el radio del disco es igual a h por la tangente del ángulo límite.', `show('#g5lim',{from:'fade'}); draw('#g5lim line',{dur:900})`],
    ],
  },

  {
    sec: 'Geo 5 · Profundidad', title: '¿Cuánto líquido queda a los 8 s?', cls: B, chapter: SEC,
    css: `.g5p{display:grid;grid-template-columns:1fr 420px;gap:50px;align-items:center}`,
    html: `<div class="g5p">${eqs([
      { t: 'V = 32\\ \\tfrac{\\text{dm}^3}{\\text{s}}\\cdot 8\\ \\text{s} = 256\\ \\text{dm}^3 = 0{,}256\\ \\text{m}^3', s: 0 },
      { t: '\\Delta h = \\frac{V}{a^2} = \\frac{0{,}256}{0{,}8^2} = \\frac{0{,}256}{0{,}64} = 0{,}40\\ \\text{m}', s: 1 },
      { t: 'h = a - \\Delta h = 0{,}80 - 0{,}40 = 0{,}40\\ \\text{m}', s: 2, cls: 'ok' },
    ])}${cubo}</div>
      ${callout('1 dm³ = 1 litro = $10^{-3}$ m³. O todo en dm: $a = 8$ dm, base de 64 dm², $\\Delta h = \\frac{256}{64} = 4$ dm.', { s: 3, style: 'margin-top:34px' })}`,
    steps: [
      ['Primero la profundidad. En ocho segundos salen treinta y dos por ocho: doscientos cincuenta y seis decímetros cúbicos. Un decímetro cúbico es un litro, la milésima parte de un metro cúbico, así que son cero coma doscientos cincuenta y seis metros cúbicos.'],
      ['Como el recipiente es un cubo, la sección es la misma a cualquier altura: cero coma ocho por cero coma ocho, cero coma sesenta y cuatro metros cuadrados. El nivel baja el volumen sobre esa área: cuarenta centímetros.'],
      ['Entonces queda una profundidad de ochenta menos cuarenta: cuarenta centímetros. [A] ¿Bajó cuarenta y quedan cuarenta? [P] Sí, acá coinciden por casualidad. Pero ojo: la que va en la cuenta es la que queda, la distancia de la fuente a la superficie.'],
      ['Si preferís, hacé todo en decímetros: el lado es ocho, la base sesenta y cuatro, y doscientos cincuenta y seis sobre sesenta y cuatro da cuatro decímetros. Lo importante es no mezclar unidades.'],
    ],
  },

  {
    sec: 'Geo 5 · El índice', title: 'Del triángulo al índice $n$', cls: B, chapter: SEC,
    css: `.g5n{display:grid;grid-template-columns:620px 1fr;gap:50px;align-items:center}`,
    html: `<div class="g5n"><div>${tri}</div><div style="display:flex;flex-direction:column;gap:30px">${eqs([
      { t: '\\tg\\theta_L = \\frac{r_d}{h} = \\frac{0{,}28}{0{,}40} = 0{,}7 \\Rightarrow \\theta_L = 35{,}0°', s: 0 },
      { t: '\\sen\\theta_L = \\frac{0{,}28}{\\sqrt{0{,}28^2 + 0{,}40^2}} = \\frac{0{,}28}{0{,}488} = 0{,}573', s: 1 },
      { t: 'n = \\frac{n\'}{\\sen\\theta_L} = \\frac{1}{0{,}573} = \\frac{\\sqrt{149}}{7}', s: 2 },
    ])}${res('$n \\approx 1{,}74$', { s: 2 })}</div></div>`,
    steps: [
      ['Con la profundidad ya está todo. El rayo límite va de la fuente al borde del disco: sube cuarenta centímetros y se corre veintiocho. La tangente del ángulo límite es veintiocho sobre cuarenta: cero coma siete. El ángulo da treinta y cinco grados.', `draw('#g5th',{dur:700}); draw('#g5tr',{delay:600,dur:700}); draw('#g5thy',{delay:1200,dur:900})`],
      ['Pero Snell trabaja con el seno, no con la tangente. El seno es el cateto opuesto sobre la hipotenusa. La hipotenusa es raíz de veintiocho al cuadrado más cuarenta al cuadrado: cuarenta y ocho coma ocho centímetros. Así que el seno es cero coma cinco siete tres. [A] ¿No puedo usar directamente cero coma siete como seno? [P] No. Cero coma siete es la tangente: ese es el error más común en este ejercicio.'],
      ['Y como el seno del ángulo límite es uno sobre n, n es uno sobre cero coma cinco siete tres. Da uno coma setenta y cuatro. Exacto, es raíz de ciento cuarenta y nueve sobre siete.', `pulse('.res')`],
    ],
  },

  {
    sec: 'Geo 5 · Control', title: '¿Tiene sentido el resultado?', cls: B, chapter: SEC,
    html: `<div class="grid g2" style="align-items:center">${table([
      ['$t$', '$h$', '$r = 0{,}7\\,h$', 'Qué se ve'],
      { cells: ['0 s', '80 cm', '56 cm', 'anillo de luz'], s: 0 },
      { cells: ['2 s', '70 cm', '49 cm', 'anillo de luz'], s: 0 },
      { cells: ['4 s', '60 cm', '42 cm', 'anillo de luz'], s: 0 },
      { cells: ['6 s', '50 cm', '35 cm', 'anillo de luz'], s: 0 },
      { cells: ['8 s', '40 cm', '28 cm', '{c3|oscuro}'], s: 1, id: 'g5t8' },
    ], { style: 'font-size:1em;width:100%' })}
      ${callout('**La resolución del PDF** llega al mismo $n \\approx 1{,}744$, pero tiene 0,5/1. Probablemente por la justificación: no explica que **el disco tapa el círculo de luz** ni por qué se oscurece justo cuando $r = r_d$.', { s: 2, cls: 'warn' })}</div>`,
    steps: [
      ['Un control rápido. Con este índice, la tangente del ángulo límite es cero coma siete, así que el radio de luz es siete décimos de la profundidad. Mientras el nivel baja, el radio pasa de cincuenta y seis a cuarenta y nueve, cuarenta y dos, treinta y cinco centímetros: siempre más que el disco.'],
      ['Y justo a los ocho segundos llega a veintiocho, el radio del disco. Coincide con el enunciado.', `hl('#g5t8')`],
      ['Un detalle sobre la resolución que trae el PDF. Llega al mismo número, pero le pusieron medio punto sobre uno. No encontré un error de cuenta: lo que falta es la explicación del disco. En el examen hacé el esquema del cono, dibujá el disco y escribí que se oscurece cuando el círculo de luz queda del tamaño del disco.'],
    ],
  },

  {
    sec: 'Geo 5 · Cierre', title: 'Dónde es fácil equivocarse', cls: B, chapter: SEC,
    html: ul([
      '@0 **Diámetro en vez de radio:** $\\tg\\theta_L = \\frac{56}{40}$ ⇒ $n = 1{,}23$. ✗',
      '@1 **Olvidarse del vaciado:** $h = 80$ cm ⇒ $n = 3{,}03$. ✗',
      '@2 **Tangente como seno:** $\\sen\\theta_L = 0{,}7$ ⇒ $n = 1{,}43$. ✗',
      '@3 **Unidades:** 1 dm³ $= 10^{-3}$ m³. Todo en m o todo en dm.',
      '@4 **Pensar que al principio estaba oscuro:** al principio sale un anillo de luz alrededor del disco.',
    ]),
    steps: [
      ['Los errores típicos. Primero, usar el diámetro del disco en vez del radio: da uno coma veintitrés.'],
      ['Segundo, olvidarse de que el recipiente se vació y usar ochenta centímetros: da tres coma cero tres.'],
      ['Tercero, usar cero coma siete como seno. Es la tangente. Daría uno coma cuarenta y tres.'],
      ['Cuarto, las unidades del caudal: un decímetro cúbico es un litro, diez a la menos tres metros cúbicos.'],
      ['Y quinto, entender mal la situación. Al principio no está oscuro: sale un anillo de luz alrededor del disco. Se oscurece cuando ese anillo desaparece.'],
    ],
  },

  {
    sec: 'Geo 5 · Cierre', title: 'La receta y el resultado', cls: B, chapter: SEC,
    html: `<div class="grid g2" style="align-items:start">${ul([
      '@0 **1.** Esquema: fuente, cono de luz, disco en la superficie.',
      '@1 **2.** Profundidad en el instante pedido: $V = Qt$, $\\Delta h = \\frac{V}{a^2}$, $h = a - \\Delta h$.',
      '@2 **3.** Se oscurece cuando $r_d = h\\,\\tg\\theta_L$.',
      '@3 **4.** De la tangente al seno: $\\sen\\theta_L = \\frac{r}{\\sqrt{r^2 + h^2}}$.',
      '@4 **5.** $n = \\frac{n\'}{\\sen\\theta_L}$.',
    ])}${card('Resultado', `<div style="font-size:.9em;line-height:1.7">$V = 0{,}256$ m³ ⇒ $h = 0{,}40$ m<br>$\\tg\\theta_L = 0{,}7$, $\\theta_L = 35{,}0°$<br>$\\sen\\theta_L = 0{,}573$<br><b>$n \\approx 1{,}74$</b></div>`.replace(/\$([^$]+)\$/g, m => md(m)), { cls: 'ok', s: 5 })}</div>`,
    steps: [
      ['La receta. Uno: el esquema, con la fuente, el cono de luz y el disco.'],
      ['Dos: la profundidad en el instante pedido, con el caudal y el área de la base.'],
      ['Tres: la condición de oscuridad, el radio del disco igual a h por la tangente del ángulo límite.'],
      ['Cuatro: pasar de la tangente al seno con la hipotenusa.'],
      ['Y cinco: n es uno sobre el seno del ángulo límite.'],
      ['El resultado: n vale aproximadamente uno coma setenta y cuatro. Si te dio eso, muy bien. Si no, fijate en cuál de las trampas caíste.'],
    ],
  },
];
