// Librería de animación que corre dentro de la página. Todas las animaciones usan la Web Animations API
// con el estado final aplicado de inmediato, así make.js puede pausarlas y recorrerlas cuadro por cuadro.
let S = null; // diapositiva actual
const $ = (sel, root) => typeof sel === 'string' ? [...(root || S).querySelectorAll(sel)] : (Array.isArray(sel) ? sel : [sel]);
const EASE = 'cubic-bezier(.22,.8,.3,1)';

function go(k) {
  document.querySelectorAll('.slide').forEach(s => s.style.display = 'none');
  S = document.querySelectorAll('.slide')[k];
  S.style.display = 'block';
  S.querySelectorAll('[data-s]').forEach(e => e.classList.add('pending'));
  // achica el código que no entra a lo ancho
  S.querySelectorAll('pre.code').forEach(p => { let f = parseFloat(getComputedStyle(p).fontSize); while (p.scrollWidth > p.clientWidth + 1 && f > 14) { f -= 1; p.style.fontSize = f + 'px'; } });
  S.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 450, easing: 'ease-out', fill: 'backwards' });
  const hd = S.querySelector('header');
  if (hd) hd.animate([{ transform: 'translateX(-40px)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 600, easing: EASE, fill: 'backwards' });
}
// se llama al comienzo de cada paso: muestra los elementos data-s="n"
function stepStart(n) {
  let d = 0;
  S.querySelectorAll(`[data-s="${n}"]`).forEach(e => {
    show(e, { delay: d, from: e.dataset.from || 'up' });
    if (e.matches('.msg')) { draw(e.querySelector('line'), { delay: d, dur: +(e.dataset.dur || 900) }); e.querySelector('text').animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, delay: d + 500, fill: 'backwards' }); }
    if (e.matches('polyline.ser')) draw(e, { delay: d, dur: +(e.dataset.dur || 2200) });
    d += +(e.dataset.gap || 160);
  });
}
function stepEnd() {
  document.getAnimations().forEach(a => { try { a.cancel(); } catch (e) { } });
  document.querySelectorAll('.ephemeral').forEach(e => e.remove());
}
const FROM = { up: 'translateY(26px)', down: 'translateY(-26px)', left: 'translateX(-40px)', right: 'translateX(40px)', scale: 'scale(.85)', fade: 'none', pop: 'scale(.4)' };
function show(sel, o = {}) {
  const { delay = 0, dur = 550, from = 'up' } = o;
  $(sel).forEach((e, i) => {
    e.classList.remove('pending', 'gone');
    const tr = e instanceof SVGElement ? 'none' : FROM[from] || 'none';
    e.animate([{ opacity: 0, transform: tr }, { opacity: 1, transform: 'none' }], { duration: dur, delay: delay + i * (o.stagger || 0), easing: from === 'pop' ? 'cubic-bezier(.3,1.6,.5,1)' : EASE, fill: 'backwards' });
  });
}
function hide(sel, o = {}) {
  const { delay = 0, dur = 400 } = o;
  $(sel).forEach(e => { e.classList.add('gone'); e.animate([{ opacity: 1 }, { opacity: 0 }], { duration: dur, delay, easing: 'ease-in', fill: 'backwards' }); });
}
// resaltado persistente (clase) con un destello
function hl(sel, o = {}) {
  const { cls = 'hl', delay = 0 } = o;
  $(sel).forEach(e => { e.classList.add(cls); flash(e, { delay }); });
}
function unhl(sel, cls = 'hl') { $(sel).forEach(e => e.classList.remove(...cls.split(' '))); }
function flash(sel, o = {}) {
  const { delay = 0, dur = 700 } = o;
  $(sel).forEach(e => e.animate(e instanceof SVGElement ? [{ opacity: .25 }, { opacity: 1 }] : [{ transform: 'scale(1)', filter: 'brightness(1)' }, { transform: 'scale(1.07)', filter: 'brightness(1.8)' }, { transform: 'scale(1)', filter: 'brightness(1)' }], { duration: dur, delay, easing: 'ease-out' }));
}
function pulse(sel, o = {}) {
  const { delay = 0, color = 'var(--accent)' } = o;
  $(sel).forEach(e => {
    if (e instanceof SVGElement) { e.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.25)' }, { transform: 'scale(1)' }], { duration: 650, delay, easing: 'ease-out' }); return; }
    e.animate([{ boxShadow: `0 0 0 0 ${color}` }, { boxShadow: '0 0 0 22px transparent' }], { duration: 900, delay, easing: 'ease-out' });
  });
}
function setText(sel, txt, o = {}) {
  const { delay = 0, cls } = o;
  $(sel).forEach(e => {
    e.innerHTML = txt; if (cls) e.classList.add(...cls.split(' '));
    e.animate([{ opacity: 0, transform: 'translateY(-14px)' }, { opacity: 1, transform: 'none' }], { duration: 450, delay, easing: EASE, fill: 'backwards' });
    e.animate([{ background: 'rgba(255,214,102,.65)' }, { background: 'transparent' }], { duration: 1400, delay, easing: 'ease-out' });
  });
}
// dibuja trazos SVG (líneas/paths)
function draw(sel, o = {}) {
  const { delay = 0, dur = 900 } = o;
  $(sel).forEach((e, i) => {
    e.classList.remove('pending', 'gone');
    const L = e.getTotalLength ? e.getTotalLength() : 400;
    e.animate([{ strokeDasharray: `${L} ${L}`, strokeDashoffset: L }, { strokeDasharray: `${L} ${L}`, strokeDashoffset: 0 }], { duration: dur, delay: delay + i * (o.stagger || 0), easing: 'ease-in-out', fill: 'backwards' });
  });
}
// ---------------------------------------------------------------- redes
const node = (id, root) => (root || S).querySelector(`[data-node="${id}"]`);
const link = (a, b, root) => (root || S).querySelector(`[data-link="${a}-${b}"]`) || (root || S).querySelector(`[data-link="${b}-${a}"]`);
const pos = (id, root) => { const n = node(id, root); return [+n.dataset.x, +n.dataset.y]; };
function linkOf(spec) { return spec.split(',').map(s => s.trim()).filter(Boolean).map(s => { const [a, b] = s.split('-'); return link(a, b); }).filter(Boolean); }
// marca enlaces: "A-B,B-C"
function hlLink(spec, o = {}) { linkOf(spec).forEach(l => { l.classList.add(o.cls || 'hl'); draw(l.querySelector('line'), { delay: o.delay || 0, dur: o.dur || 700 }); }); }
function unhlLink(spec, cls = 'hl') { linkOf(spec).forEach(l => l.classList.remove(...cls.split(' '))); }
function hlNode(ids, o = {}) { ids.split(',').forEach(id => { const n = node(id.trim(), o.root); n.classList.add(o.cls || 'hl'); pulse(n.querySelector('.ico'), o); }); }
function unhlNode(ids, cls = 'hl') { ids.split(',').forEach(id => node(id.trim()).classList.remove(...cls.split(' '))); }
// corta un enlace: lo pone rojo punteado con una cruz
function cut(spec, o = {}) {
  linkOf(spec).forEach(l => {
    l.classList.add('cut');
    const ln = l.querySelector('line'); const x = (+ln.getAttribute('x1') + +ln.getAttribute('x2')) / 2, y = (+ln.getAttribute('y1') + +ln.getAttribute('y2')) / 2;
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g'); g.setAttribute('class', 'xmark');
    g.innerHTML = `<g transform="translate(${x},${y})"><g class="xin"><circle r="26"/><path d="M-11,-11 L11,11 M11,-11 L-11,11"/></g></g>`;
    ln.ownerSVGElement.appendChild(g);
    g.querySelector('.xin').animate([{ transform: 'scale(0) rotate(-90deg)' }, { transform: 'scale(1) rotate(0)' }], { duration: 550, delay: o.delay || 0, easing: 'cubic-bezier(.3,1.6,.5,1)', fill: 'backwards' });
  });
}
function uncut(spec) { linkOf(spec).forEach(l => l.classList.remove('cut')); S.querySelectorAll('.xmark').forEach(x => x.remove()); }
// paquete que viaja por una secuencia de nodos: packet(['A','B','C'], {label:'datos', color:'#4cc2ff'})
function packet(path, o = {}) {
  const { label = '', color = 'var(--accent)', dur = 900, delay = 0, keep = false, svg, cls = '' } = o;
  const root = svg ? S.querySelector(svg) : (Array.isArray(path[0]) ? S.querySelector('svg.net') : node(path[0]).ownerSVGElement);
  const pts = path.map(p => Array.isArray(p) ? p : pos(p, root));
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g.setAttribute('class', 'pkt ' + cls + (keep ? '' : ' ephemeral'));
  const w = Math.max(34, label.length * 13 + 26);
  g.innerHTML = `<g class="pin"><rect x="${-w / 2}" y="-19" width="${w}" height="38" rx="10" style="fill:${color}"/><text y="7">${label}</text></g>`;
  root.appendChild(g);
  const kf = pts.map((p, i) => ({ transform: `translate(${p[0]}px,${p[1]}px)`, offset: i / (pts.length - 1) }));
  const total = dur * (pts.length - 1);
  g.animate(kf, { duration: total, delay, easing: 'linear', fill: 'both' });
  g.querySelector('.pin').animate([{ opacity: 0, transform: 'scale(.4)' }, { opacity: 1, transform: 'scale(1)', offset: .12 }, { opacity: 1, transform: 'scale(1)', offset: .88 }, { opacity: keep ? 1 : 0, transform: keep ? 'scale(1)' : 'scale(.6)' }], { duration: total, delay, fill: 'both' });
  if (!keep) g.animate([{ visibility: 'visible' }, { visibility: 'visible' }], { duration: total + delay + 1 });
  return g;
}
// varias animaciones en secuencia: seq(gap, (d)=>packet(..., {delay:d}), ...)
function seq(gap, ...fns) { let d = 0; for (const f of fns) { const r = f(d); d += (typeof r === 'number' ? r : 0) + gap; } }
// escribe código / texto línea por línea
function typeLines(sel, o = {}) {
  const { delay = 0, gap = 260 } = o;
  $(sel).forEach(pre => [...pre.querySelectorAll('.ln')].forEach((ln, i) => { ln.classList.remove('pending'); ln.animate([{ opacity: 0, transform: 'translateX(-16px)' }, { opacity: 1, transform: 'none' }], { duration: 380, delay: delay + i * gap, easing: EASE, fill: 'backwards' }); }));
}
// contador numérico animado (sólo visual)
function swap(sel, html, o = {}) { setText(sel, html, o); }

// ================================================================ agregado para Física II
let ADUR = 0; // duración del audio del paso actual (s); la fija make.js antes de cada paso
const talk = (minus = 0) => Math.max(1500, ADUR * 1000 - minus); // ms que dura la narración del paso

// quién habla: chip abajo a la izquierda y, si habla el alumno, su pregunta en un globo
function setSpeaker(who, text) {
  const s = document.getElementById('spk'); if (!s) return;
  s.className = who === 'A' ? 'al' : 'pr';
  s.querySelector('.who').textContent = who === 'A' ? 'Alumno' : 'Profe';
  s.querySelector('.q').textContent = who === 'A' ? text : '';
}

// onda estacionaria animada sobre una cuerda hecha con lib.cuerda()
// o: {dur (ms), per (ms por período visual), phase (rad), amp (px), delay, end: 'max'|'flat'|número (cos final)}
function standing(sel, o = {}) {
  const svg = typeof sel === 'string' ? S.querySelector(sel) : sel;
  const X0 = +svg.dataset.x0, X1 = +svg.dataset.x1, Y = +svg.dataset.y, L = +svg.dataset.l, k = +svg.dataset.k, A = o.amp || +svg.dataset.a;
  const shape = svg.dataset.model === 'll' ? x => Math.cos(k * x) : x => Math.sin(k * x);
  const per = o.per || 1400, dur = o.dur || 4000, phase = o.phase || 0, N = 90;
  const nk = Math.max(2, Math.round(dur / per * 24));
  const pathAt = c => { let d = 'M'; for (let j = 0; j <= N; j++) { const x = L * j / N; d += (X0 + (X1 - X0) * j / N).toFixed(1) + ',' + (Y - A * shape(x) * c).toFixed(1) + (j < N ? ' L' : ''); } return d; };
  const cs = Array.from({ length: nk + 1 }, (_, i) => Math.cos(2 * Math.PI * (i / nk * dur) / per + phase));
  const p = svg.querySelector('.hilo');
  const cEnd = o.end === 'max' ? 1 : o.end === 'flat' ? 0 : typeof o.end === 'number' ? o.end : cs[cs.length - 1];
  p.setAttribute('d', pathAt(cEnd));
  p.animate(cs.map(c => ({ d: `path("${pathAt(c)}")` })), { duration: dur, delay: o.delay || 0, easing: 'linear', fill: 'backwards' });
  svg.querySelectorAll('.anillo').forEach(r => {
    const x = r.id.endsWith('-i') ? 0 : L;
    r.style.transform = `translateY(${-A * shape(x) * cEnd}px)`;
    r.animate(cs.map(c => ({ transform: `translateY(${(-A * shape(x) * c).toFixed(1)}px)` })), { duration: dur, delay: o.delay || 0, easing: 'linear', fill: 'backwards' });
  });
}
// foto fija de la cuerda: c = cos(ωt+φ) (1 = máxima elongación, 0 = horizontal)
function snapshot(sel, c, o = {}) {
  const svg = typeof sel === 'string' ? S.querySelector(sel) : sel;
  const X0 = +svg.dataset.x0, X1 = +svg.dataset.x1, Y = +svg.dataset.y, L = +svg.dataset.l, k = +svg.dataset.k, A = o.amp || +svg.dataset.a;
  const shape = svg.dataset.model === 'll' ? x => Math.cos(k * x) : x => Math.sin(k * x);
  let d = 'M'; for (let j = 0; j <= 90; j++) { const x = L * j / 90; d += (X0 + (X1 - X0) * j / 90).toFixed(1) + ',' + (Y - A * shape(x) * c).toFixed(1) + (j < 90 ? ' L' : ''); }
  const p = svg.querySelector('.hilo'); const old = p.getAttribute('d'); p.setAttribute('d', d);
  p.animate([{ d: `path("${old}")` }, { d: `path("${d}")` }], { duration: o.dur || 700, delay: o.delay || 0, easing: EASE, fill: 'backwards' });
  svg.querySelectorAll('.anillo').forEach(r => { const x = r.id.endsWith('-i') ? 0 : L; r.style.transform = `translateY(${-A * shape(x) * c}px)`; });
}
// revela de izquierda a derecha (curvas, áreas, filas)
function sweep(sel, o = {}) {
  const { delay = 0, dur = 1400 } = o;
  $(sel).forEach((e, i) => { e.classList.remove('pending', 'gone'); e.animate([{ clipPath: 'inset(-20% 100% -20% 0)' }, { clipPath: 'inset(-20% 0 -20% 0)' }], { duration: dur, delay: delay + i * (o.stagger || 0), easing: 'ease-in-out', fill: 'backwards' }); });
}
// barras que crecen desde abajo (transform-origin abajo)
function grow(sel, o = {}) {
  const { delay = 0, dur = 900 } = o;
  $(sel).forEach((e, i) => { e.classList.remove('pending', 'gone'); e.style.transformBox = 'fill-box'; e.style.transformOrigin = '50% 100%'; e.animate([{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }], { duration: dur, delay: delay + i * (o.stagger || 0), easing: EASE, fill: 'backwards' }); });
}
// mueve un elemento SVG por una lista de puntos [x,y] (px del viewBox)
function along(sel, pts, o = {}) {
  const { delay = 0, dur = 2000 } = o;
  $(sel).forEach(e => {
    e.classList.remove('pending', 'gone');
    const last = pts[pts.length - 1]; e.style.transform = `translate(${last[0]}px,${last[1]}px)`;
    e.animate(pts.map(p => ({ transform: `translate(${p[0]}px,${p[1]}px)` })), { duration: dur, delay, easing: o.easing || 'linear', fill: 'backwards' });
  });
}
// anima un path con y = f(x, t). g = {x0, x1, y, L}: x va de 0 a L entre los píxeles x0 y x1; f devuelve el
// desplazamiento en px (positivo hacia arriba) para x (unidades de L) y t (ms). o: {dur, delay, n, kps, tEnd}
function animFn(sel, g, f, o = {}) {
  const p = typeof sel === 'string' ? S.querySelector(sel) : sel;
  const dur = o.dur || 4000, N = o.n || 140, nk = Math.max(2, Math.round(dur / 1000 * (o.kps || 24)));
  const pathAt = t => { let d = 'M'; for (let j = 0; j <= N; j++) { const x = g.L * j / N; d += (g.x0 + (g.x1 - g.x0) * j / N).toFixed(1) + ',' + (g.y - f(x, t)).toFixed(1) + (j < N ? ' L' : ''); } return d; };
  p.classList.remove('pending', 'gone');
  p.setAttribute('d', pathAt(o.tEnd !== undefined ? o.tEnd : dur));
  p.animate(Array.from({ length: nk + 1 }, (_, i) => ({ d: `path("${pathAt(i / nk * dur)}")` })), { duration: dur, delay: o.delay || 0, easing: 'linear', fill: 'backwards' });
}
