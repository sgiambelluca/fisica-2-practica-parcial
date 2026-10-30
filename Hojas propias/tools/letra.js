// Variante "letra": cada carácter pasa a una de las caras HW-1..N elegida al azar,
// con un corrimiento vertical y un tamaño levemente distintos. Después achica la letra
// de cada hoja hasta que entre en una sola página (tools/ajustar.js).
(function () {
  let s = window.HW_SEMILLA || 1;
  const rnd = () => { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296; };
  const caras = window.HW_CARAS;
  const hay = new Set(window.HW_CHARS);
  // Delimitadores grandes de KaTeX (\left( ... \right)): agrandamos el glifo manuscrito
  const TAM = { size1: 1.15, size2: 1.65, size3: 2.15, size4: 2.65 };

  function tamDelim(el) {
    for (let p = el; p && p !== document.body; p = p.parentElement) {
      for (const c of p.classList || []) if (TAM[c]) return TAM[c];
    }
    return 0;
  }

  function procesar(nodo) {
    const padre = nodo.parentElement;
    const fam = getComputedStyle(padre).fontFamily;
    const delim = fam.includes("KaTeX_Size") ? tamDelim(padre) || 1.15 : 0;
    // las minúsculas manuscritas son más chicas que las de KaTeX: achicamos índices y exponentes
    const indice = padre.closest(".msupsub") ? 82 : 100;
    const frag = document.createDocumentFragment();
    for (const ch of nodo.textContent) {
      if (!hay.has(ch)) { frag.append(ch); continue; }
      const sp = document.createElement("span");
      sp.className = "hw";
      sp.textContent = ch;
      sp.style.fontFamily = `"HW-${1 + Math.floor(rnd() * caras)}", ${fam}`;
      if (delim) {
        sp.style.fontSize = `${delim * 100}%`;
        sp.style.top = `${(delim - 1) * 0.32}em`;
      } else {
        sp.style.top = `${((rnd() - 0.5) * 0.07).toFixed(3)}em`;
        sp.style.fontSize = `${(indice + (rnd() - 0.5) * 6).toFixed(1)}%`;
      }
      frag.append(sp);
    }
    nodo.replaceWith(frag);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => n.parentElement.closest(".katex-mathml, style, script") || !n.textContent.trim()
        ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT,
    });
    const nodos = [];
    while (w.nextNode()) nodos.push(w.currentNode);
    nodos.forEach(procesar);
    document.fonts.ready.then(window.ajustarPaginas);
  });
})();
