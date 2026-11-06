// Arma el deck de una tanda: portada + los ejercicios en el orden de una ronda (Ond, Geo, DR, Red, Osc).
// Cada ejercicio vive en decks/t<N>/<código>.js y su primera diapositiva es seccion(código, título, ...).
const { portada } = require('./common');

module.exports = function tanda(n, codigos, intro) {
  const ejercicios = codigos.map(c => require(`./t${n}/${c}`));
  return {
    title: `Física II - Ejercicios práctica parcial - Tanda ${n}`,
    file: `Ejercicios practica parcial - Tanda ${n}`,
    footer: `Física II · Práctica para el parcial · Tanda ${n}`,
    slides: [
      portada(n, ejercicios.map(e => [e[0].sec, e[0].title]), intro),
      ...ejercicios.flat(),
      {
        sec: `Tanda ${n}`, title: 'Cierre', chapter: 'Cierre', cls: '',
        html: `<div style="font-size:1.1em;line-height:1.6">Con esto termina la tanda ${n}.<br><br>Si algún ejercicio no te salió, volvé a intentarlo <b>sin el video</b> en unos días: así se fija el procedimiento.</div>`,
        steps: [[`Con esto termina la tanda ${n}. Si algún ejercicio no te salió, volvé a intentarlo sin el video dentro de unos días: así se fija el procedimiento. Nos vemos en la próxima tanda.`]],
      },
    ],
  };
};
