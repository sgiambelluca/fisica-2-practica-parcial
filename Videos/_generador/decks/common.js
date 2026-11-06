// Piezas comunes a todas las tandas
const { md, esc } = require('../lib');

const BLOQUE = { Osc: 'osc', Ond: 'ond', Geo: 'geo', DR: 'fis', Red: 'red' };
const NOMBRE = { Osc: 'Oscilaciones', Ond: 'Ondas', Geo: 'Óptica geométrica', DR: 'Doble rendija', Red: 'Redes' };
const bloque = cod => BLOQUE[cod.split(' ')[0]];

// portada de una tanda: ejercicios = [['Ond 1', 'Propagante → estacionaria'], ...]
const portada = (n, ejercicios, steps) => ({
  kind: 'title', title: 'Portada', chapter: 'Introducción',
  css: `.slide.title .exs{display:grid;grid-template-columns:repeat(${Math.min(ejercicios.length, 5)},1fr);gap:22px;margin-top:60px}
    .slide.title .ex{border:2px solid var(--line);border-radius:20px;padding:18px 22px;background:rgba(23,36,58,.7)}
    .slide.title .ex .c{font-weight:800;font-size:30px} .slide.title .ex .t{font-size:24px;color:var(--muted);margin-top:6px}`,
  html: `<div class="unit">Física II · Práctica para el parcial</div><div class="big">Tanda ${n}</div>
    <div class="sub">Un ejercicio de cada bloque, resuelto paso a paso: el ${n} de cada tema del PDF de práctica.</div>
    <div class="exs">${ejercicios.map(([c, t]) => `<div class="ex b-${bloque(c)}" data-s="1" data-gap="140" style="border-color:var(--accent)"><div class="c" style="color:var(--accent)">${esc(c)}</div><div class="t">${md(t)}</div></div>`).join('')}</div>`,
  steps,
});
// separador de ejercicio
const seccion = (cod, titulo, fuente, say) => ({
  kind: 'section', title: titulo, sec: cod, chapter: `${cod} · ${titulo}`, cls: 'b-' + bloque(cod),
  html: `<div class="num" style="-webkit-text-stroke-color:var(--accent)">${esc(cod)}</div><div class="big">${md(titulo)}</div><div class="sub">${md(fuente)}</div>`,
  steps: [[say]],
});

module.exports = { portada, seccion, bloque, NOMBRE };
