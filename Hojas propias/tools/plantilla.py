# Genera la plantilla para escribir los caracteres a mano: salida/plantilla-letra.pdf
# y build/plantilla.json con la posición (en mm) de cada cuadro, que usa tools/fuente.py.
import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

# (caracteres, versiones por carácter)
GRUPOS = [
    ("abcdefghijklmnopqrstuvwxyz", 3),
    ("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 3),
    ("0123456789", 3),
    ("αβγδεθλμπτφω", 3),
    ("áéíóúñÁÉÓ", 2),
    ("ΔΣΦΩ", 2),
    ("ℓ∂∫∞", 2),
    (".,:;?¿!()[]{}/|\"'%°", 2),
    ("+−=±∓×<>≤≥≈≡≠≫→⇒⇔↔∈⟨⟩✓✗", 2),
]

# Geometría (mm)
PAGE_W, PAGE_H = 210, 297
FID = [(6, 6), (198, 6), (6, 285), (198, 285)]  # esquinas de los marcadores (6x6 mm)
GRID_X, GRID_Y = 10, 27
COLS, ROWS = 12, 15
CELL_W, CELL_H = 190 / COLS, 17
LABEL_H = 3.5
# Guías dentro del cuadro de escritura (desde su borde superior)
CAP, XH, BASE = 2.5, 5.6, 9.5

celdas = []  # (char, versión, página, x, y)
pagina, fila, col = 0, 0, 0
for chars, nver in GRUPOS:
    for ch in chars:
        if col + nver > COLS:
            fila, col = fila + 1, 0
        if fila >= ROWS:
            pagina, fila, col = pagina + 1, 0, 0
        for v in range(nver):
            celdas.append((ch, v, pagina, GRID_X + (col + v) * CELL_W, GRID_Y + fila * CELL_H))
        col += nver
    fila, col = fila + 1, 0  # cada grupo empieza en fila nueva
paginas = pagina + 1

css = f"""
@page {{ size: A4; margin: 0; }}
body {{ margin: 0; font-family: Helvetica, Arial, sans-serif; }}
.p {{ position: relative; width: {PAGE_W}mm; height: {PAGE_H}mm; page-break-after: always; overflow: hidden; }}
.fid {{ position: absolute; width: 6mm; height: 6mm; background: #000; }}
.head {{ position: absolute; left: 14mm; top: 5.5mm; width: 182mm; font-size: 7.4pt; line-height: 1.3; color: #333; }}
.head b {{ font-size: 9pt; }}
.c {{ position: absolute; width: {CELL_W}mm; height: {CELL_H}mm; border: 0.2mm solid #d0d0d0; box-sizing: border-box; }}
.lab {{ position: absolute; left: 0.8mm; top: 0.2mm; font-size: 7pt; color: #9a9a9a; }}
.lab i {{ font-style: normal; font-size: 5pt; }}
.g {{ position: absolute; left: 0; right: 0; height: 0; border-top: 0.25mm solid #8fd0ee; }}
.g.x {{ border-top-style: dashed; }}
.g.cap {{ border-top-color: #c9e8f6; }}
"""

html = [f"<!doctype html><html><head><meta charset='utf-8'><style>{css}</style></head><body>"]
for p in range(paginas):
    html.append("<div class='p'>")
    for fx, fy in FID:
        html.append(f"<div class='fid' style='left:{fx}mm;top:{fy}mm'></div>")
    html.append(
        f"<div class='head'><b>Plantilla de letra — hoja {p + 1} de {paginas}</b> &nbsp; "
        "Escribí cada carácter dentro de su cuadro, apoyado en la <b>línea celeste continua</b> (base). "
        "Minúsculas hasta la línea punteada; mayúsculas, números y letras altas hasta la línea superior; "
        "las colas (g, p, y, β…) bajan de la base. Escribí cada versión un poco distinta, como te sale naturalmente. "
        "Tinta negra, tu trazo de siempre, sin tocar los bordes ni el número gris. "
        "Exportá el PDF completo sin mover, recortar ni escalar la hoja.</div>"
    )
    for ch, v, pg, x, y in celdas:
        if pg != p:
            continue
        label = {"\"": "&quot;", "<": "&lt;", ">": "&gt;"}.get(ch, ch)
        top = LABEL_H
        html.append(
            f"<div class='c' style='left:{x:.3f}mm;top:{y:.3f}mm'>"
            f"<div class='lab'>{label} <i>{v + 1}</i></div>"
            f"<div class='g cap' style='top:{top + CAP}mm'></div>"
            f"<div class='g x' style='top:{top + XH}mm'></div>"
            f"<div class='g' style='top:{top + BASE}mm'></div>"
            "</div>"
        )
    html.append("</div>")
html.append("</body></html>")

(ROOT / "build").mkdir(exist_ok=True)
html_path = ROOT / "build" / "plantilla.html"
html_path.write_text("".join(html), encoding="utf-8")
meta = {
    "page_mm": [PAGE_W, PAGE_H], "fiduciales_mm": FID, "fid_size_mm": 6,
    "cell_mm": [CELL_W, CELL_H], "label_h_mm": LABEL_H, "guias_mm": {"cap": CAP, "xh": XH, "base": BASE},
    "celdas": [{"char": ch, "ver": v, "pag": pg, "x": x, "y": y} for ch, v, pg, x, y in celdas],
}
(ROOT / "build" / "plantilla.json").write_text(json.dumps(meta, ensure_ascii=False, indent=1), encoding="utf-8")
pdf = ROOT / "salida" / "plantilla-letra.pdf"
subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--no-pdf-header-footer",
                f"--print-to-pdf={pdf}", html_path.as_uri()], check=True, capture_output=True)
print(f"ok {pdf.relative_to(ROOT)}: {paginas} hojas, {len(celdas)} cuadros, {len({c[0] for c in celdas})} caracteres")
