# Arma "Parciales viejos/Ejercicios para practicar.pdf": enunciados de examenes viejos
# que NO estan en la hoja de ejercicios (v6), recortados de los PDF originales.
#
# Uso (desde la raiz del repo):
#   python -I "Hojas propias/tools/practica.py" --preview <carpeta>   # recortes con contexto, para revisar
#   python -I "Hojas propias/tools/practica.py" --build <carpeta>     # recortes + HTML + PDF
# Necesita PyMuPDF, numpy y Pillow (en Windows estan en %TEMP%/pylib) y Google Chrome.
import sys, os, html, shutil, subprocess, pathlib, platform

sys.path.insert(0, os.path.join(os.environ.get("TEMP", "/tmp"), "pylib"))
import warnings; warnings.filterwarnings("ignore")
import fitz, numpy as np
from PIL import Image, ImageDraw, ImageFilter

REPO = pathlib.Path(__file__).resolve().parents[2]
VIEJOS = REPO / "Parciales viejos"
SALIDA = VIEJOS / "Ejercicios para practicar.pdf"

U = "Parciales únicos/"
P1 = "Primeros parciales (formato viejo)/"
P2 = "Segundos parciales (formato viejo)/"
F = {
    "1p-2023-2c": P1 + "2023 2C - Primer parcial (16-09) - con solución.pdf",
    "int-2025-2c": U + "2025 2C - Examen intermedio (18-10).pdf",
    "1p-2024-1c": P1 + "2024 1C - Primer parcial (20-04) - con solución.pdf",
    "1p-2024-2c": P1 + "2024 2C - Primer parcial (14-09) - con solución.pdf",
    "1p-2019-2c": P1 + "2019 2C - Primer parcial (28-09).pdf",
    "r1-2024-1c": P1 + "2024 1C - Primer recuperatorio (18-06).pdf",
    "1p-2022-1c": P1 + "2022 1C - Primer parcial (23-04).pdf",
    "r1-2022-1c": P1 + "2022 1C - Primer recuperatorio.pdf",
    "rec-2025-1c": U + "2025 1C - Recuperatorio (07-06).pdf",
    "rec-2026-1c": U + "2026 1C - Recuperatorio (30-05).pdf",
    "2p-2023-2c": P2 + "2023 2C - Segundo parcial (11-11) - con solución.pdf",
    "2p-2024-2c": P2 + "2024 2C - Segundo parcial.pdf",
    "2p-2023-1c": P2 + "2023 1C - Segundo parcial (26-06).pdf",
    "r2-2023-2c": P2 + "2023 2C - Segundo recuperatorio (21-11).pdf",
    "rec-2025-2c": U + "2025 2C - Recuperatorio (01-11).pdf",
    "r2-2022-1c": P2 + "2022 1C - Segundo recuperatorio (29-06).pdf",
    "1p-2015-2c": P1 + "2015 2C - Primer parcial (24-09).pdf",
    "1p-2016-1c": P1 + "2016 1C - Primer parcial.pdf",
}
CON_SOLUCION = {"1p-2023-2c", "1p-2024-1c", "1p-2024-2c", "2p-2023-2c"}

BLOQUES = [
    ("Osc", "Oscilaciones", "osc"),
    ("Ond", "Ondas", "ond"),
    ("Geo", "Óptica geométrica", "geo"),
    ("DR", "Doble rendija y N rendijas", "fis"),
    ("Red", "Redes, Rayleigh y difracción", "red"),
]

# (codigo, examen, ejercicio, que se pide, archivo, pagina, y0, y1, opciones)
# y0/y1 en puntos PDF; se ajustan al hueco blanco mas ancho cercano salvo que opciones tenga "fijo".
# opciones: x0/x1 (margenes), rot (grados, sentido antihorario de PIL), blancos [(x0,y0,x1,y1)], fijo.
FIJO = {"fijo": 1}
ANCHO = {"x0": 0, "x1": 595}       # fotos donde el texto llega al borde de la pagina
ANCHO400 = {"x0": 0, "x1": 400}    # 2P 11/11/2023 (pagina de 400 pt)
EJ = [
    ("Osc 1", "1P 16/9/2023", 4, "Péndulo forzado en resonancia de amplitud; se apaga el motor: θ(t)", "1p-2023-2c", 1, 436, 560, {}),
    ("Osc 2", "1P 14/9/2024", 4, "Adorno colgante en un auto: amplitud a otra velocidad; el auto se detiene: y(t)", "1p-2024-2c", 1, 617, 768, FIJO),
    ("Osc 3", "1P 23/4/2022", 1, "Amortiguado y forzado (disipa 59,3% por ciclo): Q; se detiene el motor: x(t)", "1p-2022-1c", 1, 198, 410, {}),
    ("Osc 4", "1P 24/9/2015", 3, "79,24% de energía en tres ciclos: Q, ω con la mitad de la potencia; se quita la fuerza", "1p-2015-2c", 1, 463, 645, {}),
    ("Osc 5", "1P 1C 2016", 4, "Forzado con ω_RA y ω_RP dadas: amplitud máxima; cesa la fuerza: tiempo hasta perder 70%", "1p-2016-1c", 1, 437, 578, FIJO),
    ("Osc 6", "Recu 1P 1C 2022", 4, "Objeto colgado en un fluido que se rompe: x(t), largo tras una oscilación, energía perdida", "r1-2022-1c", 1, 574, 752, {**FIJO, **ANCHO}),

    ("Ond 1", "1P 16/9/2023", 3, "Propagante → estacionaria con 5 nodos: modelo, energías de un tramo, u_K(x)", "1p-2023-2c", 1, 316, 447, FIJO),
    ("Ond 2", "Intermedio 18/10/2025", 1, "Fijo–fijo: con K en un instante, U' de un tramo en otro instante", "int-2025-2c", 1, 208, 274, {}),
    ("Ond 3", "1P 20/4/2024", 4, "Propagante → estacionaria: y(x,t), K de un tramo, graficar u_U(t)", "1p-2024-1c", 1, 628, 785, {}),
    ("Ond 4", "1P 14/9/2024", 2, "Guitarra: ¿misma nota apretando en x = 40 cm?, amplitud a partir de K, graficar u_U", "1p-2024-2c", 1, 334, 531, {**FIJO, "blancos": [(0, 480, 350, 531)]}),
    ("Ond 5", "Recu 1P 18/6/2024", 3, "Fijo–fijo a partir de la propagante: armónico, graficar u_K(t) en un punto", "r1-2024-1c", 1, 422, 545, FIJO),
    ("Ond 6", "1P 28/9/2019", 1, "Fijo–fijo: armónico, graficar u_K(x), U de un tramo, se libera un extremo", "1p-2019-2c", 1, 188, 372, {}),
    ("Ond 7", "1P 24/9/2015", 1, "Oscilador y anillo: K de un tramo, escribir la propagante", "1p-2015-2c", 1, 140, 370, {**FIJO, "blancos": [(0, 356, 200, 370)]}),

    ("Geo 1", "Intermedio 18/10/2025", 3, "Divergente + espejo cóncavo: imagen en el mismo lugar del objeto", "int-2025-2c", 1, 371, 464, {}),
    ("Geo 2", "1P 16/9/2023", 1, "Cubo de vidrio con reflector y agua: rapidez de la luz en el vidrio", "1p-2023-2c", 1, 129, 194, FIJO),
    ("Geo 3", "1P 16/9/2023", 2, "Convergente con imagen derecha; espejo cóncavo para ver dos imágenes en el mismo lugar", "1p-2023-2c", 1, 194, 318, FIJO),
    ("Geo 4", "1P 14/9/2024", 1, "Cubo abierto en un planeta con n' = 1,2: rango de n para iluminar ≤ 60%", "1p-2024-2c", 1, 217, 334, {}),
    ("Geo 5", "1P 20/4/2024", 1, "Disco flotante y válvula de descarga: índice del líquido", "1p-2024-1c", 1, 210, 338, ANCHO),
    ("Geo 6", "Recu 1P 18/6/2024", 2, "Sistema de dos dioptras: R para que los haces salgan paralelos", "r1-2024-1c", 1, 303, 422, FIJO),
    ("Geo 7", "1P 23/4/2022", 4, "Convergente + divergente plano-cóncava: R; f' para que salgan paralelos", "1p-2022-1c", 2, 60, 820, {"fijo": 1, "x0": 20, "x1": 510, "rot": -90}),
    ("Geo 8", "Recu 1P 1C 2022", 2, "Plano-convexa en un tubo que se llena con líquido: R y n", "r1-2022-1c", 1, 212, 387, {**FIJO, **ANCHO}),
    ("Geo 9", "Recu 7/6/2025", 4, "Telescopio con lente y espejo", "rec-2025-1c", 1, 437, 571, FIJO),
    ("Geo 10", "1P 24/9/2015", 4, "Rayo en un cubo: n máximo sin reflexión total en la cara lateral", "1p-2015-2c", 1, 645, 750, {}),

    ("DR 1", "Intermedio 18/10/2025", 4, "Incidencia oblicua: lámina para centrar el orden 0; después otra lámina y líquido", "int-2025-2c", 1, 464, 625, {}),
    ("DR 2", "Recu 30/5/2026", 5, "Cinco rendijas con las tres centrales tapadas: I_P/I_max, máximos en la campana (resuelto en la v7)", "rec-2026-1c", 1, 571, 719, FIJO),
    ("DR 3", "2P 11/11/2023", 1, "Sumergido, oblicua, lámina + gota de aire: ángulo α e intensidad", "2p-2023-2c", 1, 115, 212, ANCHO400),
    ("DR 4", "2P 2C 2024", 2, "Vidrio + acrílico, 2º máximo en O; se cambia el vidrio: n₃, intensidad, Rayleigh", "2p-2024-2c", 1, 215, 429, {**FIJO, **ANCHO}),
    ("DR 5", "2P 26/6/2023", 1, "Foto del patrón: d y a; lámina que corre el máximo 2: n, intensidad, máximos en la campana", "2p-2023-1c", 1, 250, 548, {**FIJO, "x0": 8, "x1": 585}),
    ("DR 6", "Recu 2P 21/11/2023", 1, "Tres rendijas con la central tapada, en líquido, dos láminas; después mínimos en la pantalla", "r2-2023-2c", 1, 207, 414, {**FIJO, **ANCHO}),

    ("Red 1", "Intermedio 18/10/2025", 5, "800 rendijas/cm y tres λ: máximo de líneas; ¿se resuelven λ₂ y λ₃ a 10 cm?", "int-2025-2c", 1, 626, 750, FIJO),
    ("Red 2", "Recu 1/11/2025", 5, "Espectro continuo: máximo orden completo, % del detector con solapamiento", "rec-2025-2c", 1, 679, 786, FIJO),
    ("Red 3", "Recu 30/5/2026", 6, "Luz blanca: % del detector con solapamiento", "rec-2026-1c", 1, 719, 786, FIJO),
    ("Red 4", "2P 11/11/2023", 2, "Tres λ: rango del ancho D de la pantalla para ver 21 líneas", "2p-2023-2c", 1, 212, 283, ANCHO400),
    ("Red 5", "2P 26/6/2023", 2, "Detector golpeado y corrido 10 cm que registra 10 líneas: rango de λ₂", "2p-2023-1c", 1, 552, 838, {**FIJO, "x0": 8, "x1": 585}),
    ("Red 6", "Recu 2P 29/6/2022", 2, "Incidencia oblicua de 12°: máximo orden y líneas en la pantalla", "r2-2022-1c", 1, 410, 545, {}),
    ("Red 7", "Recu 2P 21/11/2023", 3, "Alambre y láser (Babinet): rango de la separación s", "r2-2023-2c", 1, 508, 712, {**FIJO, **ANCHO}),
]

_docs = {}
def pagina(clave, n):
    if clave not in _docs:
        _docs[clave] = fitz.open(VIEJOS / F[clave])
    return _docs[clave][n - 1]

def huecos(page, x0, x1, z=2.0):
    """Bandas sin tinta (y0, y1) en puntos, con fondo estimado localmente (fotos con sombras)."""
    pix = page.get_pixmap(matrix=fitz.Matrix(z, z), colorspace=fitz.csGRAY)
    g = Image.frombytes("L", (pix.width, pix.height), pix.samples)
    small = g.resize((max(1, pix.width // 4), max(1, pix.height // 4)))
    bg = small.filter(ImageFilter.MaxFilter(9)).filter(ImageFilter.GaussianBlur(3)).resize(g.size)
    d = (np.asarray(bg, dtype=int) - np.asarray(g, dtype=int))[:, int(x0 * z):int(x1 * z)]
    on = (d > 60).sum(axis=1) > 2
    res, i, n = [], 0, len(on)
    while i < n:
        if not on[i]:
            j = i
            while j < n and not on[j]: j += 1
            res.append((i / z, j / z)); i = j
        else: i += 1
    return res

def ajustar(gaps, y, ventana=22):
    cand = [(b - a, (a + b) / 2) for a, b in gaps if abs((a + b) / 2 - y) <= ventana or a <= y <= b]
    if not cand: return y
    return max(cand)[1]

def rect(e):
    cod, ex, nro, txt, clave, pg, y0, y1, op = e
    page = pagina(clave, pg)
    W = page.rect.width
    x0, x1 = op.get("x0", 0.03 * W), op.get("x1", 0.97 * W)
    if not op.get("fijo"):
        g = huecos(page, x0, x1)
        y0, y1 = ajustar(g, y0), ajustar(g, y1)
    return page, fitz.Rect(x0, y0, x1, y1)

def recorte(e, dpi=200):
    page, r = rect(e)
    op = e[8]
    z = dpi / 72
    pix = page.get_pixmap(matrix=fitz.Matrix(z, z), clip=r)
    im = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
    dr = ImageDraw.Draw(im)
    for bx0, by0, bx1, by1 in op.get("blancos", []):
        dr.rectangle([(bx0 - r.x0) * z, (by0 - r.y0) * z, (bx1 - r.x0) * z, (by1 - r.y0) * z], fill="white")
    if op.get("rot"):
        im = im.rotate(op["rot"], expand=True, fillcolor="white")
    return im, r

def preview(out):
    out = pathlib.Path(out); out.mkdir(parents=True, exist_ok=True)
    tiras, lote, k = [], [], 0
    for e in EJ:
        page, r = rect(e)
        z = 1.4
        ctx = fitz.Rect(r.x0, max(0, r.y0 - 30), r.x1, min(page.rect.height, r.y1 + 30))
        pix = page.get_pixmap(matrix=fitz.Matrix(z, z), clip=ctx)
        im = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
        dr = ImageDraw.Draw(im)
        dr.rectangle([1, (r.y0 - ctx.y0) * z, im.width - 2, (r.y1 - ctx.y0) * z], outline=(255, 0, 0), width=3)
        dr.rectangle([0, 0, 260, 16], fill=(255, 255, 0)); dr.text((3, 2), f"{e[0]}  y={r.y0:.0f}-{r.y1:.0f}", fill=(0, 0, 0))
        if e[8].get("rot"): im = im.resize((im.width // 2, im.height // 2))
        lote.append(im)
        if sum(i.height for i in lote) > 1300 or e is EJ[-1]:
            Wm = max(i.width for i in lote); H = sum(i.height + 8 for i in lote)
            hoja = Image.new("RGB", (Wm, H), (90, 90, 90)); y = 0
            for i in lote: hoja.paste(i, (0, y)); y += i.height + 8
            k += 1; hoja.save(out / f"preview-{k:02d}.png"); lote = []
    print("previews:", k)

def build(out):
    out = pathlib.Path(out); out.mkdir(parents=True, exist_ok=True)
    datos = {}
    for e in EJ:
        im, r = recorte(e)
        nombre = e[0].replace(" ", "") + ".jpg"
        im.save(out / nombre, quality=85)  # JPEG: con PNG el PDF pesaba 24 MB
        datos[e[0]] = (nombre, im.width, im.height, (r.x1 - r.x0))
    filas, secciones = [], []
    for pref, titulo, cls in BLOQUES:
        items = [e for e in EJ if e[0].split()[0] == pref]
        bloques = []
        for e in items:
            cod, ex, nro, txt, clave, *_ = e
            sol = clave in CON_SOLUCION
            filas.append(f"<tr class='{cls}'><td><b>{cod}</b></td><td>{html.escape(txt)}</td><td>{ex}, ej. {nro}</td><td>{'sí' if sol else ''}</td></tr>")
            nombre, w, h, ancho_pt = datos[cod]
            # todos al ancho de la hoja: los PDF de paginas chicas (400 pt) quedan con letra legible
            bloques.append(f"""<div class="ej {cls}"><div class="cab"><b>{cod}</b> · {ex}, ejercicio {nro}<span>{html.escape(F[clave].split('/')[-1])}</span></div>
<img src="{nombre}" style="width:100%"></div>""")
        secciones.append(f"<h2 class='{cls}'>{titulo}</h2>\n" + "\n".join(bloques))
    n = len(EJ)
    doc = f"""<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Ejercicios para practicar</title>
<style>
@page {{ size: A4; margin: 11mm 12mm 12mm; }}
body {{ font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; font-size: 9.5pt; color: #111; -webkit-print-color-adjust: exact; print-color-adjust: exact; }}
h1 {{ font-size: 17pt; margin: 0 0 2mm; }}
h2 {{ font-size: 12pt; color: #fff; background: var(--c); padding: 1mm 2.5mm; border-radius: 1.2mm; margin: 0 0 3mm; break-after: avoid; }}
h2 + .ej {{ break-before: avoid; }}
.osc {{ --c: #1f4e8c; }} .ond {{ --c: #2e7d32; }} .geo {{ --c: #8e44ad; }} .fis {{ --c: #c0392b; }} .red {{ --c: #d35400; }}
p {{ margin: 0 0 2mm; line-height: 1.35; }}
ul {{ margin: 0 0 2mm; padding-left: 5mm; line-height: 1.35; }}
table {{ border-collapse: collapse; width: 100%; font-size: 8.4pt; }}
td, th {{ border: 0.4pt solid #bbb; padding: 0.45mm 1.5mm; text-align: left; vertical-align: top; }}
th {{ background: #eee; }}
tr td:first-child {{ color: var(--c); white-space: nowrap; }}
.indice {{ break-after: page; }}
.seccion {{ break-before: page; }}
.ej {{ break-inside: avoid; margin: 0 0 6mm; }}
.cab {{ border-left: 1.2mm solid var(--c); padding: 0.6mm 2mm; background: #f4f4f4; margin-bottom: 1.5mm; font-size: 9.5pt; }}
.cab b {{ color: var(--c); }}
.cab span {{ float: right; color: #777; font-size: 7.5pt; padding-top: 0.6mm; }}
img {{ display: block; max-width: 100%; border: 0.4pt solid #ddd; }}
</style></head><body>
<div class="indice">
<h1>Ejercicios para practicar</h1>
<p>{n} ejercicios de exámenes viejos que <b>no</b> están en la hoja de ejercicios (v6), elegidos según la frecuencia de cada tipo en <i>catalogo-ejercicios.md</i>. Están ordenados por bloque y, dentro de cada bloque, del más representativo al menos.</p>
<ul>
<li><b>Cómo practicar:</b> con la hoja de ejercicios al lado, como en el examen. Antes de hacer cuentas, buscá qué ejercicio de la hoja te sirve de molde; después adaptá lo que cambia.</li>
<li><b>Orden sugerido, por rondas:</b> el 1 de cada bloque (Ond 1, Geo 1, DR 1, Red 1, Osc 1), después el 2 de cada bloque, y así. Así cada ronda se parece a un parcial: una oscilación u onda, una de óptica geométrica, una doble rendija y una red.</li>
<li>La columna “Resolución” marca los PDF originales que traen la resolución de un alumno. No la mires antes de intentarlo, y ojo: pueden tener errores (la del 1P 16/9/2023 tiene uno).</li>
</ul>
<table><tr><th></th><th>Qué se pide</th><th>Examen</th><th>Resolución</th></tr>
{''.join(filas)}
</table>
</div>
{''.join(f'<div class="seccion">{s}</div>' for s in secciones)}
</body></html>"""
    hp = out / "practica.html"
    hp.write_text(doc, encoding="utf-8")
    chrome = ("C:/Program Files/Google/Chrome/Application/chrome.exe" if platform.system() == "Windows"
              else "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome")
    pdf = out / "practica.pdf"
    subprocess.run([chrome, "--headless=new", "--disable-gpu", "--no-pdf-header-footer", "--allow-file-access-from-files",
                    "--virtual-time-budget=10000", f"--print-to-pdf={pdf}", hp.as_uri()], check=True,
                   stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print("pdf:", pdf, fitz.open(pdf).page_count, "paginas")
    shutil.copyfile(pdf, SALIDA)  # falla si el PDF de salida esta abierto
    print("copiado a", SALIDA)

if __name__ == "__main__":
    modo, carpeta = sys.argv[1], sys.argv[2]
    preview(carpeta) if modo == "--preview" else build(carpeta)
