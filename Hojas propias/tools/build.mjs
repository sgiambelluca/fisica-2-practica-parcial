// Arma las hojas: src/<nombre>.html (con $...$ y $$...$$) -> build/<nombre>-<variante>.html -> salida/<nombre>-<variante>.pdf
// Uso: node tools/build.mjs [nombre ...] [--variantes=tipeado,calco,letra,letra-calco] [--fuente=mara]
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const katex = (await import(path.join(ROOT, "vendor/katex/dist/katex.mjs"))).default;
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const args = process.argv.slice(2);
const flag = args.find((a) => a.startsWith("--variantes="));
const variantes = flag ? flag.split("=")[1].split(",") : ["tipeado", "calco"];
// --fuente=mara usa la letra de otra persona (tools/fuente.py --nombre mara) y agrega "-mara" al nombre
const fuenteFlag = args.find((a) => a.startsWith("--fuente="));
const SUF = fuenteFlag ? "-" + fuenteFlag.split("=")[1] : "";
let nombres = args.filter((a) => !a.startsWith("--"));
if (!nombres.length) nombres = fs.readdirSync(path.join(ROOT, "src")).filter((f) => f.endsWith(".html")).map((f) => f.slice(0, -5));

const macros = {
  "\\sen": "\\operatorname{sen}",
  "\\tg": "\\operatorname{tg}",
  "\\arctg": "\\operatorname{arctg}",
};

const unescape = (tex) => tex.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ");

function renderMath(html) {
  // $$...$$ en bloque, $...$ en línea. \$ se escribe como $ literal.
  html = html.replace(/\$\$([\s\S]+?)\$\$/g, (_, tex) => katex.renderToString(unescape(tex), { displayMode: true, macros, throwOnError: true }));
  html = html.replace(/(^|[^\\])\$([^$]+?)\$/g, (_, pre, tex) => pre + katex.renderToString(unescape(tex), { macros, throwOnError: true }));
  return html.replace(/\\\$/g, "$");
}

for (const nombre of nombres) {
  const src = fs.readFileSync(path.join(ROOT, "src", nombre + ".html"), "utf8");
  const cuerpo = renderMath(src);
  for (const variante of variantes) {
    // "letra-calco" = clases letra + calco
    const extraHead = variante.startsWith("letra") ? fs.readFileSync(path.join(ROOT, "build", `letra-head${SUF}.html`), "utf8") : "";
    const html = `<!doctype html><html lang="es"><head><meta charset="utf-8">
<link rel="stylesheet" href="../vendor/katex/dist/katex.min.css">
<link rel="stylesheet" href="../src/hoja.css">
<script src="../tools/ajustar.js"></script>
${extraHead}</head><body class="${variante.replace("-", " ")}">${cuerpo}</body></html>`;
    const htmlPath = path.join(ROOT, "build", `${nombre}-${variante}${SUF}.html`);
    fs.writeFileSync(htmlPath, html);
    const pdfPath = path.join(ROOT, "salida", `${nombre}-${variante}${SUF}.pdf`);
    execFileSync(CHROME, [
      "--headless=new", "--disable-gpu", "--no-pdf-header-footer", "--allow-file-access-from-files",
      "--virtual-time-budget=10000", `--print-to-pdf=${pdfPath}`, "file://" + htmlPath,
    ], { stdio: "ignore" });
    // tamaño de letra con que quedó cada cara (lo deja tools/ajustar.js)
    const dom = execFileSync(CHROME, [
      "--headless=new", "--disable-gpu", "--allow-file-access-from-files", "--virtual-time-budget=10000",
      "--dump-dom", "file://" + htmlPath,
    ], { stdio: ["ignore", "pipe", "ignore"], maxBuffer: 1 << 28 }).toString();
    const fs_ = [...dom.matchAll(/data-fs="([\d.]+)"/g)].map((m) => m[1] + "pt").join(", ");
    console.log("ok", path.relative(ROOT, pdfPath), "| letra:", fs_);
  }
}
