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
    aplicar(paginas, Math.min(...paginas.map(maximo)) * 0.99);
  };

  document.addEventListener("DOMContentLoaded", () => {
    // la variante "letra" lo llama ella misma, después de cambiar las fuentes
    if (!window.HW_CHARS) document.fonts.ready.then(window.ajustarPaginas);
  });
})();
