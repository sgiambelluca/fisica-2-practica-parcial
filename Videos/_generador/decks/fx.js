// Piezas reutilizables para los decks de ejercicios (diapositivas tipo, diagramas y código de animación).
// No reemplaza a lib.js: arma HTML/SVG con sus helpers y devuelve código para los pasos.
const fs = require('fs'), path = require('path');
const { md, ul, card, callout, eqs, res, datos, img, molde } = require('../lib');

// tamaño de un JPEG (para dimensionar el enunciado)
function jpgSize(file) {
  const b = fs.readFileSync(path.join(__dirname, '..', 'assets', file));
  let i = 2;
  while (i < b.length) {
    if (b[i] !== 0xFF) { i++; continue; }
    const m = b[i + 1], L = b.readUInt16BE(i + 2);
    if (m >= 0xC0 && m <= 0xCF && m !== 0xC4 && m !== 0xC8 && m !== 0xCC) return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)];
    i += 2 + L;
  }
  return [1300, 300];
}

// diapositivas tipo de un ejercicio. SEC = 'Red 1 · Título', B = 'b-red'
function kit(SEC, B) {
  const cod = SEC.split(' · ')[0];
  const S = (sub, title, html, steps, extra = {}) => Object.assign({ sec: `${cod} · ${sub}`, title, cls: B, chapter: SEC, html, steps }, extra);
  return {
    S,
    enunciado(file, items, steps, o = {}) {
      const [w, h] = jpgSize(file), maxW = o.maxW || 1500, maxH = o.maxH || 440;
      const W = Math.round(Math.min(maxW, maxH * w / h));
      return S('Enunciado', 'Qué dice el enunciado', `<div style="display:flex;flex-direction:column;gap:28px;align-items:center">${img(file, { style: `width:${W}px` })}
        ${datos(items, { style: 'justify-content:center;max-width:1720px' })}</div>`, steps);
    },
    molde(txt, rep, cam, steps) {
      return S('Antes de calcular', 'Buscar el molde en la hoja', `${molde(txt, { s: 0 })}<div class="grid g2" style="margin-top:36px">
        ${card('Lo que se repite', ul(rep), { cls: 'ok', s: 1 })}${card('Lo que cambia', ul(cam), { cls: 'warn', s: 2 })}</div>`, steps);
    },
    trampas(items, steps) { return S('Cierre', 'Dónde es fácil equivocarse', ul(items.map((t, i) => `@${i} ${t}`)), steps); },
    receta(pasos, resultados, steps, title = 'La receta y los resultados') {
      return S('Cierre', title, `<div class="grid g2" style="align-items:start">${ul(pasos.map((t, i) => `@${i} ${t}`))}
        ${card('Resultados', `<div style="font-size:.88em;line-height:1.7">${resultados.map(r => md(r)).join('<br>')}</div>`, { cls: 'ok', s: pasos.length })}</div>`, steps);
    },
  };
}

// ---------------------------------------------------------------- código para los pasos
// revela de izquierda a derecha, lineal, durante toda la narración (menos `menos` ms)
const sweepLin = (sel, menos = 300, delay = 0) => `S.querySelectorAll(${JSON.stringify(sel)}).forEach(e=>{e.classList.remove('pending','gone');e.animate([{clipPath:'inset(-30% 100% -30% 0)'},{clipPath:'inset(-30% 0 -30% 0)'}],{duration:talk(${menos}),delay:${delay},easing:'linear',fill:'backwards'})});`;
// barras horizontales que crecen desde la izquierda
const growX = (sel, o = {}) => `S.querySelectorAll(${JSON.stringify(sel)}).forEach((e,i)=>{e.classList.remove('pending','gone');e.style.transformBox='fill-box';e.style.transformOrigin='0 50%';e.animate([{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{duration:${o.dur || 1200},delay:${o.delay || 0}+i*${o.stagger || 0},easing:'cubic-bezier(.22,.8,.3,1)',fill:'backwards'})});`;
// rota un elemento SVG alrededor de (cx, cy) siguiendo la lista de ángulos (grados), en toda la narración
const rotAnim = (sel, cx, cy, angs, o = {}) => `(()=>{const e=S.querySelector(${JSON.stringify(sel)});e.classList.remove('pending','gone');e.style.transformBox='view-box';e.style.transformOrigin='${cx}px ${cy}px';
  const fr=${JSON.stringify(angs.map(a => ({ transform: `rotate(${(+a).toFixed(2)}deg)` })))};e.style.transform=fr[fr.length-1].transform;
  e.animate(fr,{duration:${o.dur ? o.dur : `talk(${o.menos || 300})`},delay:${o.delay || 0},easing:'linear',fill:'backwards'});})();`;
// mueve un elemento por puntos [x,y] (px del viewBox), lineal, en toda la narración
const moveAnim = (sel, pts, o = {}) => `(()=>{const e=S.querySelector(${JSON.stringify(sel)});e.classList.remove('pending','gone');
  const fr=${JSON.stringify(pts.map(p => ({ transform: `translate(${(+p[0]).toFixed(1)}px,${(+p[1]).toFixed(1)}px)` })))};e.style.transform=fr[fr.length-1].transform;
  e.animate(fr,{duration:${o.dur ? o.dur : `talk(${o.menos || 300})`},delay:${o.delay || 0},easing:'${o.easing || 'linear'}',fill:'backwards'});})();`;
// cambia el atributo d de un path por una secuencia de formas (lista de strings d)
const morphAnim = (sel, ds, o = {}) => `(()=>{const e=S.querySelector(${JSON.stringify(sel)});e.classList.remove('pending','gone');
  const ds=${JSON.stringify(ds)};e.setAttribute('d',ds[ds.length-1]);
  e.animate(ds.map(d=>({d:'path("'+d+'")'})),{duration:${o.dur ? o.dur : `talk(${o.menos || 300})`},delay:${o.delay || 0},easing:'linear',fill:'backwards'});})();`;

// ---------------------------------------------------------------- doble rendija (esquema, no a escala)
// o: {id, ti: ángulo de incidencia en grados (>0: el haz sube, llega primero a la rendija 2, la de abajo),
//     lams: [{slit:1|2, txt, cls, id}], liq: texto del medio entre placa y pantalla, medio: texto del medio general,
//     seg: true para marcar d·sen θi, w, style}
function dslit(o) {
  const id = o.id, W = 980, H = 560, XP = 330, Y1 = 230, Y2 = 330, XS = 900, YC = 280, ti = (o.ti || 0) * Math.PI / 180;
  const dir = [Math.cos(ti), -Math.sin(ti)], L = 320;
  const rayIn = (y, k) => `<line class="ds-in" id="${id}-in${k}" x1="${(XP - L * dir[0]).toFixed(1)}" y1="${(y - L * dir[1]).toFixed(1)}" x2="${XP}" y2="${y}"/>`;
  let h = `<svg class="ds-svg" id="${id}" viewBox="0 0 ${W} ${H}" style="${o.style || 'width:900px'}">`;
  if (o.medio) h += `<rect class="ds-med" x="0" y="20" width="${W}" height="${H - 40}" rx="18"/><text class="ds-medt" x="20" y="54">${o.medio}</text>`;
  if (o.liq) h += `<rect class="ds-liq${o.liqPend ? ' pending' : ''}" id="${id}-liq" x="${XP + 8}" y="30" width="${XS - XP - 8}" height="${H - 60}" rx="12"/><text class="ds-liqt${o.liqPend ? ' pending' : ''}" id="${id}-liqt" x="${XS - 14}" y="${H - 44}" text-anchor="end">${o.liq}</text>`;
  // frentes de onda
  if (o.ti !== undefined) for (let k = 0; k < 3; k++) {
    const c = [XP - (60 + 90 * k) * dir[0], (Y1 + Y2) / 2 - (60 + 90 * k) * dir[1]], n = [-dir[1], dir[0]];
    h += `<line class="ds-wf" x1="${(c[0] - 130 * n[0]).toFixed(1)}" y1="${(c[1] - 130 * n[1]).toFixed(1)}" x2="${(c[0] + 130 * n[0]).toFixed(1)}" y2="${(c[1] + 130 * n[1]).toFixed(1)}"/>`;
  }
  h += rayIn(Y1, 1) + rayIn(Y2, 2);
  if (o.seg && ti) {
    // pie de la perpendicular desde la rendija que se alcanza primero sobre el rayo de la otra
    const first = ti > 0 ? Y2 : Y1, other = ti > 0 ? Y1 : Y2;
    const v = [XP - XP, first - other], t = v[0] * dir[0] + v[1] * dir[1];
    const foot = [XP + t * dir[0], other + t * dir[1]];
    h += `<line class="ds-wf2" x1="${XP}" y1="${first}" x2="${foot[0].toFixed(1)}" y2="${foot[1].toFixed(1)}"/>
      <line class="ds-seg pending" id="${id}-seg" x1="${foot[0].toFixed(1)}" y1="${foot[1].toFixed(1)}" x2="${XP}" y2="${other}"/>
      <text class="ds-segt pending" id="${id}-segt" x="${(foot[0] - 16).toFixed(1)}" y="${(other + (ti > 0 ? -16 : 34)).toFixed(1)}" text-anchor="end">${o.segTxt || 'd sen θᵢ'}</text>`;
  }
  // placa
  h += `<rect class="ds-plate" x="${XP - 8}" y="40" width="16" height="${Y1 - 12 - 40}"/><rect class="ds-plate" x="${XP - 8}" y="${Y1 + 12}" width="16" height="${Y2 - Y1 - 24}"/><rect class="ds-plate" x="${XP - 8}" y="${Y2 + 12}" width="16" height="${H - 40 - Y2 - 12}"/>
    <text class="ds-n" x="${XP - 26}" y="${Y1 - 18}" text-anchor="end">1</text><text class="ds-n" x="${XP - 26}" y="${Y2 + 36}" text-anchor="end">2</text>`;
  // rayos hacia C
  h += `<line class="ds-out" id="${id}-o1" x1="${XP}" y1="${Y1}" x2="${XS}" y2="${YC}"/><line class="ds-out" id="${id}-o2" x1="${XP}" y1="${Y2}" x2="${XS}" y2="${YC}"/>`;
  for (const l of o.lams || []) {
    const y = l.slit === 1 ? Y1 : Y2, x = XP + 12 + (l.dx || 0);
    h += `<g class="ds-lam ${l.cls || ''}${l.pend ? ' pending' : ''}"${l.id ? ` id="${l.id}"` : ''}${l.s !== undefined ? ` data-s="${l.s}"` : ''}><rect x="${x}" y="${y - 26}" width="34" height="52" rx="5"/>
      <text x="${x}" y="${l.slit === 1 ? y - 40 : y + 66}">${l.txt || ''}</text></g>`;
  }
  h += `<line class="ds-screen" x1="${XS}" y1="40" x2="${XS}" y2="${H - 40}"/><circle class="ds-c" cx="${XS}" cy="${YC}" r="10"/><text class="ds-ct" x="${XS + 18}" y="${YC + 9}">C</text>`;
  if (o.ti) h += `<text class="ds-ang" x="${XP - 210}" y="${(Y1 + Y2) / 2 + (o.ti > 0 ? 150 : -130)}">θᵢ = ${Math.abs(o.ti)}°</text>`;
  return h + (o.extra || '') + '</svg>';
}
const DS_CSS = `
  .ds-svg{overflow:visible;font-family:"Segoe UI",Arial,sans-serif}
  .ds-plate{fill:#8fa6c4}
  .ds-in{stroke:var(--warn);stroke-width:5}
  .ds-wf{stroke:var(--warn);stroke-width:2;stroke-dasharray:6 8;opacity:.6}
  .ds-wf2{stroke:#c49bff;stroke-width:2;stroke-dasharray:5 6}
  .ds-seg{stroke:#c49bff;stroke-width:9;stroke-linecap:round}
  .ds-segt{fill:#c49bff;font-size:30px;font-weight:700}
  .ds-out{stroke:#ffe3a6;stroke-width:3;opacity:.8}
  .ds-n{fill:var(--muted);font-size:30px;font-weight:700}
  .ds-lam rect{fill:rgba(76,194,255,.25);stroke:#4cc2ff;stroke-width:3} .ds-lam text{fill:#4cc2ff;font-size:28px;font-weight:700}
  .ds-lam.b rect{fill:rgba(126,224,161,.22);stroke:var(--accent2)} .ds-lam.b text{fill:var(--accent2)}
  .ds-liq{fill:rgba(76,140,255,.14);stroke:rgba(76,140,255,.5);stroke-width:2} .ds-liqt{fill:#8fc0ff;font-size:28px;font-weight:700}
  .ds-med{fill:rgba(255,255,255,.03);stroke:var(--line);stroke-width:2;stroke-dasharray:8 8} .ds-medt{fill:var(--muted);font-size:24px}
  .ds-screen{stroke:#dfe7f2;stroke-width:6} .ds-c{fill:var(--accent);stroke:#0d1522;stroke-width:3} .ds-ct{fill:var(--accent);font-size:28px;font-weight:800}
  .ds-ang{fill:var(--warn);font-size:30px;font-weight:700}
  .fx-bar{rx:8} .fx-bl{fill:var(--muted);font-size:24px;font-weight:600} .fx-bt{fill:#07111f;font-size:22px;font-weight:800}
`;
// barras de camino óptico: rows = [{lbl, segs:[{w (px), color, txt, id, pend}]}]
function barras(rows, o = {}) {
  const W = o.w || 900, X0 = o.x0 || 170, RH = 70;
  let h = `<svg class="ds-svg" viewBox="0 0 ${W} ${rows.length * RH + 20}" style="${o.style || `width:${W}px`}">`;
  rows.forEach((r, i) => {
    const y = 10 + i * RH;
    h += `<text class="fx-bl" x="${X0 - 16}" y="${y + 36}" text-anchor="end">${r.lbl}</text>`;
    let x = X0 + (r.off || 0);
    for (const s of r.segs) {
      const xx = s.w < 0 ? x + s.w : x;
      h += `<g${s.id ? ` id="${s.id}"` : ''} class="${s.pend ? 'pending' : ''}"><rect class="fx-bar" x="${xx}" y="${y + 8}" width="${Math.abs(s.w)}" height="40" style="fill:${s.color}${s.w < 0 ? ';opacity:.45' : ''}"/>${s.txt ? `<text class="fx-bt" x="${xx + Math.abs(s.w) / 2}" y="${y + 36}" text-anchor="middle">${s.txt}</text>` : ''}</g>`;
      x += s.w;
    }
  });
  return h + '</svg>';
}

// ---------------------------------------------------------------- pantalla de una red: líneas en posiciones y (cm)
// o: {id, half (cm), w, lines: [{y, color, m, cls, pair}], ticks:[...], h}
function pantalla(o) {
  const W = o.w || 1640, H = o.h || 230, half = o.half, X = y => W / 2 + y / half * (W / 2 - 40);
  let h = `<svg class="ds-svg" id="${o.id}" viewBox="0 0 ${W} ${H}" style="${o.style || `width:${W}px`}">
    <rect x="${X(-half)}" y="30" width="${X(half) - X(-half)}" height="${H - 90}" rx="8" style="fill:#0a111c;stroke:#4a6286;stroke-width:3"/>`;
  for (const t of o.ticks || []) h += `<line x1="${X(t)}" y1="${H - 60}" x2="${X(t)}" y2="${H - 50}" style="stroke:#4a6286;stroke-width:2"/><text x="${X(t)}" y="${H - 22}" text-anchor="middle" style="fill:var(--dim);font-size:20px;font-family:Consolas,monospace">${String(t).replace('.', ',').replace('-', '−')}</text>`;
  for (const l of o.lines) {
    const xs = l.pair ? [X(l.y) - 4, X(l.y) + 4] : [X(l.y)];
    h += `<g class="${l.cls || ''}">` + xs.map(x => `<rect x="${(x - (l.pair ? 2.5 : 3.5)).toFixed(1)}" y="38" width="${l.pair ? 5 : 7}" height="${H - 106}" rx="2" style="fill:${l.color}"/>`).join('') +
      (l.m !== undefined ? `<text x="${X(l.y).toFixed(1)}" y="24" text-anchor="middle" style="fill:${l.color};font-size:18px;font-weight:700">${l.m}</text>` : '') + '</g>';
  }
  return h + (o.extra ? o.extra(X) : '') + '</svg>';
}

// ---------------------------------------------------------------- banco óptico genérico
// B = bench({x0, x1 (cm), W, H, ax (px del eje), k (px por unidad de altura)}) -> {X, Y, svg(id, body, style), lens, mirror, arrow, ray, ticks, eye}
function bench(o) {
  const W = o.W || 1700, H = o.H || 460, ax = o.ax || 230, L = 50, R = W - 50, k = o.k || 1;
  const X = x => L + (x - o.x0) / (o.x1 - o.x0) * (R - L), Y = y => ax - y * k;
  const P = pts => 'M' + pts.map(p => `${X(p[0]).toFixed(1)},${Y(p[1]).toFixed(1)}`).join(' L');
  const B = {
    X, Y, P, ax,
    svg: (id, body, style = 'width:1600px') => `<svg class="ob-svg" id="${id}" viewBox="0 0 ${W} ${H}" style="${style}"><line class="ob-ax" x1="${L}" y1="${ax}" x2="${R}" y2="${ax}"/>${body}</svg>`,
    ticks: (ts, y = H - 14) => ts.map(t => `<line class="ob-ax" x1="${X(t)}" y1="${ax - 6}" x2="${X(t)}" y2="${ax + 6}"/><text class="ob-tk" x="${X(t)}" y="${y}" text-anchor="middle">${String(t).replace('.', ',').replace('-', '−')}</text>`).join(''),
    // lente: type 'conv' | 'div'; half: semialto en px
    lens: (x, type = 'conv', lbl = '', half = 200, o2 = {}) => {
      const c = X(x), t = ax - half, b = ax + half, w = 15;
      const d = type === 'conv' ? `M${c},${t} Q${c + 2 * w},${ax} ${c},${b} Q${c - 2 * w},${ax} ${c},${t} Z` : `M${c - w},${t} L${c + w},${t} Q${c + 3},${ax} ${c + w},${b} L${c - w},${b} Q${c - 3},${ax} ${c - w},${t} Z`;
      return `<g${o2.id ? ` id="${o2.id}"` : ''}${o2.cls ? ` class="${o2.cls}"` : ''}><path class="ob-lens" d="${d}"/>${lbl ? `<text class="ob-t" x="${c + 22}" y="${t + 10}">${lbl}</text>` : ''}</g>`;
    },
    // espejo: face = lado hacia el que mira la cara reflectora ('left' | 'right'); type 'concave' | 'convex' | 'plane'
    mirror: (x, face = 'left', type = 'concave', lbl = '', half = 200, o2 = {}) => {
      const c = X(x), t = ax - half, b = ax + half, s = face === 'left' ? 1 : -1, bow = type === 'concave' ? 26 : type === 'convex' ? -26 : 0;
      let hatch = ''; for (let i = 1; i < 10; i++) { const tt = i / 10, xx = c + 4 * s * tt * (1 - tt) * bow, yy = t + (b - t) * tt; hatch += `<line class="ob-hatch" x1="${(xx + s * 4).toFixed(1)}" y1="${yy.toFixed(1)}" x2="${(xx + s * 22).toFixed(1)}" y2="${(yy - 16).toFixed(1)}"/>`; }
      return `<g${o2.id ? ` id="${o2.id}"` : ''}${o2.cls ? ` class="${o2.cls}"` : ''}${o2.style ? ` style="${o2.style}"` : ''}><path class="ob-mir" d="M${c},${t} Q${c + s * bow * 2},${ax} ${c},${b}"/>${hatch}${lbl ? `<text class="ob-t" x="${c}" y="${t - 12}" text-anchor="middle">${lbl}</text>` : ''}${o2.extra || ''}</g>`;
    },
    // flecha objeto/imagen: h en unidades de altura (px/k); cls: 'obj' | 'img' | 'fin' | 'ghost'
    arrow: (x, h, cls = 'obj', o2 = {}) => {
      const x0 = X(x), y1 = Y(h), dir = h > 0 ? 1 : -1;
      return `<g class="ob-${cls}${o2.pend ? ' pending' : ''}"${o2.id ? ` id="${o2.id}"` : ''}${o2.s !== undefined ? ` data-s="${o2.s}"` : ''}><line x1="${x0}" y1="${ax}" x2="${x0}" y2="${y1 + dir * 14}"/><path d="M${x0 - 12},${y1 + dir * 22} L${x0},${y1} L${x0 + 12},${y1 + dir * 22} Z"/>
        ${o2.label ? `<text x="${o2.lx !== undefined ? o2.lx : x0}" y="${o2.ly !== undefined ? o2.ly : y1 - dir * 14 + (dir < 0 ? 26 : 0)}" text-anchor="${o2.anchor || 'middle'}">${o2.label}</text>` : ''}</g>`;
    },
    ray: (id, pts, cls = '') => `<path id="${id}" class="ob-ray ${cls} pending" d="${P(pts)}"/>`,
    mark: (x, lbl, cls = '') => `<g class="ob-mk ${cls}"><circle cx="${X(x)}" cy="${ax}" r="8"/><text x="${X(x)}" y="${ax + 34}" text-anchor="middle">${lbl}</text></g>`,
    eye: (x, lbl = 'observador') => `<g class="ob-eye"><path d="M${X(x) + 30},${ax - 18} Q${X(x) - 10},${ax} ${X(x) + 30},${ax + 18}"/><circle cx="${X(x) + 8}" cy="${ax}" r="7"/><text x="${X(x)}" y="${ax - 30}" text-anchor="middle">${lbl}</text></g>`,
  };
  return B;
}
const OB_CSS = `
  .ob-svg{overflow:visible;font-family:"Segoe UI",Arial,sans-serif}
  .ob-ax{stroke:#4a6286;stroke-width:3} .ob-tk{fill:var(--dim);font-size:22px;font-family:Consolas,monospace} .ob-t{fill:var(--muted);font-size:24px}
  .ob-lens{fill:rgba(196,155,255,.16);stroke:var(--geo);stroke-width:3}
  .ob-mir{fill:none;stroke:#dfe7f2;stroke-width:7;stroke-linecap:round} .ob-hatch{stroke:#8fa6c4;stroke-width:3}
  .ob-mk circle{fill:var(--geo);stroke:#0d1522;stroke-width:3} .ob-mk text{fill:var(--geo);font-size:24px;font-weight:700}
  .ob-obj line{stroke:var(--warn);stroke-width:6} .ob-obj path{fill:var(--warn)} .ob-obj text{fill:var(--warn);font-size:24px;font-weight:700}
  .ob-img line{stroke:var(--geo);stroke-width:5;stroke-dasharray:9 7} .ob-img path{fill:var(--geo)} .ob-img text{fill:var(--geo);font-size:24px;font-weight:700}
  .ob-fin line{stroke:var(--accent2);stroke-width:6} .ob-fin path{fill:var(--accent2)} .ob-fin text{fill:var(--accent2);font-size:24px;font-weight:700}
  .ob-ghost line{stroke:#8fa6c4;stroke-width:4;stroke-dasharray:6 8} .ob-ghost path{fill:#8fa6c4;opacity:.7} .ob-ghost text{fill:#8fa6c4;font-size:22px}
  .ob-ray{fill:none;stroke:var(--warn);stroke-width:4;stroke-linejoin:round} .ob-ray.ext{stroke-dasharray:10 8;stroke-width:3;opacity:.85}
  .ob-ray.b{stroke:var(--accent2)} .ob-ray.c{stroke:#ff9be0} .ob-ray.d{stroke:#4cc2ff}
  .ob-eye path{fill:none;stroke:var(--ink);stroke-width:4} .ob-eye circle{fill:var(--ink)} .ob-eye text{fill:var(--muted);font-size:22px}
`;
// recta por dos puntos, evaluada en x
const lineAt = (A, Bp, x) => A[1] + (Bp[1] - A[1]) * (x - A[0]) / (Bp[0] - A[0]);

module.exports = { kit, jpgSize, sweepLin, growX, rotAnim, moveAnim, morphAnim, dslit, DS_CSS, barras, pantalla, bench, OB_CSS, lineAt };
