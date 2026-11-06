// Ajusta la letra para que cada cara quede llena sin pasarse de la página (si se pasa, las
// columnas sobrantes quedan fuera de la hoja). Busca el tamaño máximo que entra en cada
// cara y usa el menor de todos, así las dos caras tienen la misma letra.
// Si la primera página tiene data-flujo, además elige en qué bloque cortar entre la cara 1
// y la 2 para que la letra resulte lo más grande posible (sin cambiar el orden).
// Deja el tamaño final en data-fs, para revisarlo.
(function () {
  const entra = (p) => p.scrollWidth <= p.clientWidth + 1;

  function maximo(p) {
    const base = parseFloat(p.dataset.base);
    let lo = base * 0.5, hi = base * 1.6;
    for (let i = 0; i < 16; i++) {
      const mid = (lo + hi) / 2;
      p.style.setProperty("--fs", mid.toFixed(3) + "pt");
      if (entra(p)) lo = mid; else hi = mid;
    }
    return lo;
  }

  function aplicar(paginas, fs) {
    paginas.forEach((p) => {
      p.style.setProperty("--fs", fs.toFixed(2) + "pt");
      p.dataset.fs = fs.toFixed(2);
    });
  }

  window.ajustarPaginas = function () {
    const paginas = [...document.querySelectorAll(".page")];
    paginas.forEach((p) => { p.dataset.base = parseFloat(getComputedStyle(p).getPropertyValue("--fs")) || 7; });
    if (paginas.length === 2 && paginas[0].hasAttribute("data-flujo")) {
      const [p1, p2] = paginas;
      const bloques = [...p1.children, ...p2.children];
      let mejor = null;
      for (let k = 1; k < bloques.length; k++) {
        bloques.slice(0, k).forEach((b) => p1.append(b));
        bloques.slice(k).forEach((b) => p2.append(b));
        const fs = Math.min(maximo(p1), maximo(p2));
        if (!mejor || fs > mejor.fs) mejor = { k, fs };
      }
      bloques.slice(0, mejor.k).forEach((b) => p1.append(b));
      bloques.slice(mejor.k).forEach((b) => p2.append(b));
    }
    // data-por-cara: cada cara con su propio tamaño máximo (la que tiene lugar de sobra lo aprovecha)
    if (paginas[0].hasAttribute("data-por-cara")) {
      const fs = paginas.map(maximo);
      paginas.forEach((p, i) => {
        // data-buscar: que entre no es monótono con el tamaño (un bloque que salta de columna puede
        // hacer que 5,78 no entre y 5,85 sí). Se recorre hacia arriba de a 0,01 pt y se toma el mayor
        // tamaño que entra junto con los dos anteriores (margen para la impresión).
        if (p.hasAttribute("data-buscar")) {
          let mejor = fs[i] * 0.99, seguidos = 0;
          for (let f = Math.floor(fs[i] * 100) / 100; f <= fs[i] * 1.15; f += 0.01) {
            p.style.setProperty("--fs", f.toFixed(2) + "pt");
            seguidos = entra(p) ? seguidos + 1 : 0;
            if (seguidos >= 3) mejor = f - 0.02;
          }
          aplicar([p], mejor);
        } else aplicar([p], fs[i] * 0.99);
      });
    } else {
      aplicar(paginas, Math.min(...paginas.map(maximo)) * 0.99);
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    // la variante "letra" lo llama ella misma, después de cambiar las fuentes
    if (!window.HW_CHARS) document.fonts.ready.then(window.ajustarPaginas);
  });
})();
