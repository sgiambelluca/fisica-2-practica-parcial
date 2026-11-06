// Helpers para escribir diapositivas (generan HTML). Basado en el generador de Protocolos, con fórmulas KaTeX
// y diagramas de física.
const path = require('path');
const katex = require(path.resolve(__dirname, '../../Hojas propias/vendor/katex/dist/katex.js'));
const MACROS = { '\\sen': '\\operatorname{sen}', '\\tg': '\\operatorname{tg}', '\\arctg': '\\operatorname{arctg}' };

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const tex = (t, display = false) => katex.renderToString(t, { displayMode: display, macros: MACROS, throwOnError: true, strict: false });

// marcado en línea: $fórmula$, $$fórmula en bloque$$, **negrita**, ==resaltado==, `código`, {c1|texto coloreado}
function md(s) {
  const keep = [];
  const k = h => { keep.push(h); return '\u0001' + (keep.length - 1) + '\u0002'; };
  s = String(s)
    .replace(/\$\$([\s\S]+?)\$\$/g, (_, t) => k(tex(t, true)))
    .replace(/\$([^$]+?)\$/g, (_, t) => k(tex(t)))
    .replace(/`([^`]+)`/g, (_, c) => k('<code>' + esc(c) + '</code>'));
  s = s.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>').replace(/==([^=]+)==/g, '<mark>$1</mark>')
    .replace(/\{(c\d|muted)\|([^}]+)\}/g, '<span class="$1">$2</span>').replace(/(^|[\s(])\*([^*\s][^*]*)\*/g, '$1<i>$2</i>');
  while (/\u0001\d+\u0002/.test(s)) s = s.replace(/\u0001(\d+)\u0002/g, (_, i) => keep[+i]);
  return s;
}
// atributo de paso: s=3 -> data-s="3"
const sa = (s, from) => s === undefined || s === null ? '' : ` data-s="${s}"${from ? ` data-from="${from}"` : ''}`;
const at = o => `${sa(o.s, o.from)}${o.id ? ` id="${o.id}"` : ''}${o.style ? ` style="${o.style}"` : ''}`;

// lista: items "texto", "@2 texto" (aparece en el paso 2), "@2 - subítem"
function ul(items, cls = '') {
  return `<ul class="bl ${cls}">` + items.map(it => {
    let m = String(it).match(/^@(\d+)\s+(.*)$/), s, t = it;
    if (m) { s = m[1]; t = m[2]; }
    const sub = t.startsWith('- '); if (sub) t = t.slice(2);
    return `<li class="${sub ? 'sub' : ''}"${sa(s)}>${md(t)}</li>`;
  }).join('') + '</ul>';
}
function card(title, body, o = {}) {
  return `<div class="card ${o.cls || ''}"${at(o)}>${title ? `<h3>${o.tag ? `<span class="tag">${o.tag}</span>` : ''}${md(title)}</h3>` : ''}${body}</div>`;
}
const callout = (body, o = {}) => `<div class="callout ${o.cls || ''}"${at(o)}>${md(body)}</div>`;
// tabla: rows[0] = encabezado. Una fila puede ser {cells:[...], s, cls}
function table(rows, o = {}) {
  let h = `<table class="t ${o.cls || ''}"${at(o)}>` + (o.cap ? `<caption>${md(o.cap)}</caption>` : '');
  rows.forEach((r, i) => {
    const cells = Array.isArray(r) ? r : r.cells, ra = Array.isArray(r) ? {} : r;
    h += `<tr class="${ra.cls || ''}"${sa(ra.s)}${ra.id ? ` id="${ra.id}"` : ''}>` + cells.map((c, j) => i === 0 ? `<th>${md(c)}</th>` : `<td data-c="${i}-${j}">${md(c)}</td>`).join('') + '</tr>';
  });
  return h + '</table>';
}

// ---------------------------------------------------------------- piezas para ejercicios
// pizarra de cuentas: lines = [{t:'LaTeX', s, note, cls, id}] ; cada línea es una fórmula en bloque
function eqs(lines, o = {}) {
  // si la pizarra no tiene paso propio, aparece con su primera línea (así no se ve una caja vacía)
  const ss = lines.map(l => typeof l === 'string' ? undefined : l.s);
  if (o.s === undefined && ss.every(s => s !== undefined)) o = Object.assign({}, o, { s: Math.min(...ss) });
  return `<div class="eqs ${o.cls || ''}"${at(o)}>${o.title ? `<div class="eqt">${md(o.title)}</div>` : ''}` + lines.map(l => {
    if (typeof l === 'string') l = { t: l };
    return `<div class="eq ${l.cls || ''}"${sa(l.s, l.from)}${l.id ? ` id="${l.id}"` : ''}><span class="m">${tex(l.t, true)}</span>${l.note ? `<span class="nt">${md(l.note)}</span>` : ''}</div>`;
  }).join('') + '</div>';
}
// resultado destacado
const res = (t, o = {}) => `<div class="res ${o.cls || ''}"${at(o)}>${md(t)}</div>`;
// datos del enunciado como fichas
function datos(items, o = {}) {
  return `<div class="datos ${o.cls || ''}"${at(o)}>${o.title ? `<div class="dt">${md(o.title)}</div>` : ''}` +
    items.map(it => { let m = String(it).match(/^@(\d+)\s+(.*)$/), s, t = it; if (m) { s = m[1]; t = m[2]; } return `<span class="dato"${sa(s)}>${md(t)}</span>`; }).join('') + '</div>';
}
// imagen del enunciado (recorte del examen, en assets/)
const ASSETS = path.join(__dirname, 'assets');
const img = (file, o = {}) => `<img class="stmt ${o.cls || ''}" src="file:///${path.join(ASSETS, file).replace(/\\/g, '/')}"${at(o)}>`;
// caja "molde en la hoja"
const molde = (txt, o = {}) => `<div class="molde"${at(o)}><span class="mt">Molde en la hoja</span>${md(txt)}</div>`;

// ---------------------------------------------------------------- gráficos (SVG)
// Sistema de coordenadas: plot({w,h,width, x:[x0,x1], y:[y0,y1], xl, yl, ticksX, ticksY, fmtX, fmtY, curves, extra, id, s, cls, pad})
// curves: [{f:x=>y, n, cls, id, s, area:bool}]  ; devuelve el SVG. extra(px,py) puede devolver SVG adicional.
function plot(sp) {
  const W = sp.w || 1200, H = sp.h || 560, P = Object.assign({ l: 100, r: 40, t: 30, b: 70 }, sp.pad || {});
  const [x0, x1] = sp.x, [y0, y1] = sp.y;
  const px = x => P.l + (x - x0) / (x1 - x0) * (W - P.l - P.r), py = y => H - P.b - (y - y0) / (y1 - y0) * (H - P.t - P.b);
  const fx = sp.fmtX || (v => String(v).replace('.', ',')), fy = sp.fmtY || (v => String(v).replace('.', ','));
  let h = `<svg class="plot ${sp.cls || ''}" viewBox="0 0 ${W} ${H}"${sp.id ? ` id="${sp.id}"` : ''}${sa(sp.s)} style="${sp.width ? `width:${sp.width}px;` : ''}${sp.style || ''}">`;
  for (const y of sp.ticksY || []) h += `<line class="gr" x1="${P.l}" y1="${py(y)}" x2="${W - P.r}" y2="${py(y)}"/><text class="tk" x="${P.l - 12}" y="${py(y) + 7}" style="text-anchor:end">${fy(y)}</text>`;
  for (const x of sp.ticksX || []) h += `<line class="gr v" x1="${px(x)}" y1="${P.t}" x2="${px(x)}" y2="${H - P.b}"/><text class="tk" x="${px(x)}" y="${H - P.b + 32}" style="text-anchor:middle">${fx(x)}</text>`;
  const yz = y0 <= 0 && y1 >= 0 ? py(0) : H - P.b;
  h += `<line class="ax" x1="${P.l}" y1="${P.t - 10}" x2="${P.l}" y2="${H - P.b}"/><line class="ax" x1="${P.l}" y1="${yz}" x2="${W - P.r + 10}" y2="${yz}"/>`;
  if (sp.xl) h += `<text class="axl" x="${W - P.r + 6}" y="${yz - 14}" style="text-anchor:end">${esc(sp.xl)}</text>`;
  if (sp.yl) h += `<text class="axl" x="${P.l + 14}" y="${P.t + 4}">${esc(sp.yl)}</text>`;
  for (const c of sp.curves || []) {
    const n = c.n || 400, xa = c.from !== undefined ? c.from : x0, xb = c.to !== undefined ? c.to : x1;
    const pts = Array.from({ length: n + 1 }, (_, i) => { const x = xa + (xb - xa) * i / n; return [px(x), py(c.f(x))]; });
    const d = 'M' + pts.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' L');
    if (c.area) h += `<path class="area ${c.cls || ''}" d="${d} L${px(xb).toFixed(1)},${yz} L${px(xa).toFixed(1)},${yz} Z"${sa(c.s)}${c.id ? ` id="${c.id}-a"` : ''}/>`;
    h += `<path class="cv ${c.cls || ''}" d="${d}"${sa(c.s)}${c.id ? ` id="${c.id}"` : ''}/>`;
  }
  if (sp.extra) h += sp.extra(px, py);
  return h + '</svg>';
}

// Cuerda: cuerda({id, L (cm), n (armónico), model:'ff'|'ll'|'fl', w, h, A (px), nodes:true, ticks:[...], s})
// Dibuja soportes, la cuerda en reposo (línea) y un path #<id>-y que la animación standing() mueve.
function cuerda(sp) {
  const W = sp.w || 1500, H = sp.h || 360, X0 = 120, X1 = W - 120, Y = H / 2, L = sp.L;
  const px = x => X0 + x / L * (X1 - X0);
  const k = { ff: Math.PI * sp.n / L, ll: Math.PI * sp.n / L, fl: Math.PI * (2 * sp.n - 1) / (2 * L) }[sp.model];
  const shape = { ff: x => Math.sin(k * x), ll: x => Math.cos(k * x), fl: x => Math.sin(k * x) }[sp.model];
  const end = (x, kind) => kind === 'f'
    ? `<g class="fijo"><rect x="${x - (x < W / 2 ? 34 : 0)}" y="${Y - 90}" width="34" height="180" rx="4"/>${Array.from({ length: 7 }, (_, i) => `<line x1="${x < W / 2 ? x - 34 : x + 34}" y1="${Y - 80 + i * 26}" x2="${x < W / 2 ? x - 54 : x + 54}" y2="${Y - 60 + i * 26}"/>`).join('')}</g>`
    : `<g class="libre"><line x1="${x}" y1="${Y - 120}" x2="${x}" y2="${Y + 120}"/><ellipse cx="${x}" cy="${Y}" rx="14" ry="22" class="anillo" id="${sp.id}-anillo-${x < W / 2 ? 'i' : 'd'}"/></g>`;
  const [ea, eb] = { ff: ['f', 'f'], ll: ['l', 'l'], fl: ['f', 'l'] }[sp.model];
  let nodes = '';
  if (sp.nodes !== false) {
    const xs = [];
    for (let x = 0; x <= L + 1e-9; x += L / 4000) { const v = shape(x); if (Math.abs(v) < 1e-9) xs.push(x); }
    // ceros por cambio de signo
    const zs = []; const N = 6000;
    for (let i = 0; i <= N; i++) { const a = L * i / N, b = L * (i + 1) / N; const fa = shape(a), fb = shape(b); if (Math.abs(fa) < 1e-12) zs.push(a); else if (i < N && fa * fb < 0) zs.push(a + (b - a) * fa / (fa - fb)); }
    const uniq = zs.filter((z, i) => i === 0 || z - zs[i - 1] > L / 1000);
    nodes = uniq.map((z, i) => `<g class="nodo"${sa(sp.sNodes)} data-gap="90"><circle cx="${px(z).toFixed(1)}" cy="${Y}" r="11"/><text x="${px(z).toFixed(1)}" y="${Y + 52}">${(Math.round(z * 10) / 10).toString().replace('.', ',')}</text></g>`).join('');
  }
  const ticks = (sp.ticks || []).map(x => `<line class="tick" x1="${px(x)}" y1="${Y + 130}" x2="${px(x)}" y2="${Y + 142}"/><text class="tk" x="${px(x)}" y="${Y + 172}">${String(x).replace('.', ',')}</text>`).join('');
  return `<svg class="cuerda" viewBox="0 0 ${W} ${H + 60}"${sp.id ? ` id="${sp.id}"` : ''}${sa(sp.s)} style="${sp.width ? `width:${sp.width}px;` : ''}${sp.style || ''}" data-x0="${X0}" data-x1="${X1}" data-y="${Y}" data-l="${L}" data-k="${k}" data-model="${sp.model}" data-a="${sp.A || 90}">
    <line class="eje" x1="${X0 - 20}" y1="${Y + 136}" x2="${X1 + 20}" y2="${Y + 136}"/>${ticks}
    <line class="reposo" x1="${X0}" y1="${Y}" x2="${X1}" y2="${Y}"/>
    <path class="hilo" id="${sp.id}-y" d="M${X0},${Y} L${X1},${Y}"/>
    ${end(X0, ea)}${end(X1, eb)}${nodes}${sp.extra || ''}</svg>`;
}

module.exports = { esc, tex, md, sa, at, ul, card, callout, table, eqs, res, datos, img, molde, plot, cuerda };
