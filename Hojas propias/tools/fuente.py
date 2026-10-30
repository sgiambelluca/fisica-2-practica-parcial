# Convierte la plantilla escrita a mano en fuentes OTF y arma build/letra-head.html.
# Uso: .venv/bin/python tools/fuente.py <plantilla-escrita.pdf | hoja1.png hoja2.png hoja3.png> [--descartar a3] [--nombre mara]
#
# Sale: build/fuente/HW-1..6.otf (3 versiones de cada carácter x 2 juegos de deformaciones chicas)
#       build/fuente/recortes.png (todos los cuadros leídos, para revisar)
#       build/letra-head.html (lo inserta tools/build.mjs en la variante "letra")
import argparse
import json
import math
import random
from pathlib import Path

import fitz
import numpy as np
import potrace
from fontTools.fontBuilder import FontBuilder
from fontTools.pens.t2CharStringPen import T2CharStringPen
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
DPI = 300
R = 24          # px/mm al muestrear cada cuadro
U = 100         # unidades de fuente por mm (cap height 7 mm -> 700)
UMBRAL = 170    # gris < UMBRAL = tinta (las guías celestes y los bordes quedan afuera)
CARAS = 6

ap = argparse.ArgumentParser()
ap.add_argument("archivos", nargs="+", help="PDF con las 3 hojas, o un PNG/JPG por hoja en orden")
ap.add_argument("--escala", type=float, default=1.0)
ap.add_argument("--semilla", type=int, default=1)
ap.add_argument("--nombre", default="", help="fuente de otra persona: sale en build/fuente-<nombre> y build/letra-head-<nombre>.html")
ap.add_argument("--usar", default="", help="reemplazar un carácter por el trazo de otro, ej. 'I=|'")
ap.add_argument("--descartar", default="", help="versiones a ignorar, ej. 'a3,g2' (se usan las otras)")
args = ap.parse_args()
SUF = f"-{args.nombre}" if args.nombre else ""
OUT = ROOT / "build" / f"fuente{SUF}"

meta = json.loads((ROOT / "build/plantilla.json").read_text())
CW, CH = meta["cell_mm"]
LAB = meta["label_h_mm"]
G = meta["guias_mm"]
hojas = []  # (documento, índice de página), en orden
for archivo in args.archivos:
    d = fitz.open(archivo)
    hojas += [(d, i) for i in range(len(d))]


def pagina_gris(n):
    d, i = hojas[n]
    if d.is_pdf:
        pix = d[i].get_pixmap(dpi=DPI, colorspace=fitz.csGRAY)
        g = np.frombuffer(pix.samples, np.uint8).reshape(pix.height, pix.width)
    else:  # imagen exportada (Krita, etc.): se usa tal cual; lo transparente cuenta como papel blanco
        im = Image.open(d.name).convert("RGBA")
        fondo = Image.new("RGBA", im.size, "white")
        g = np.asarray(Image.alpha_composite(fondo, im).convert("L"))
    return g, g.shape[1] / meta["page_mm"][0]


def afin(gris, px_mm):
    """Ubica los 4 marcadores y devuelve la matriz 2x3 mm -> px."""
    src, dst = [], []
    s = meta["fid_size_mm"]
    for fx, fy in meta["fiduciales_mm"]:
        cx, cy = (fx + s / 2) * px_mm, (fy + s / 2) * px_mm
        w = 7 * px_mm
        y0, y1, x0, x1 = int(cy - w), int(cy + w), int(cx - w), int(cx + w)
        ys, xs = np.nonzero(gris[max(y0, 0):y1, max(x0, 0):x1] < 100)
        if len(xs) < (s * px_mm) ** 2 * 0.5:
            raise SystemExit(f"No encuentro el marcador de la esquina ({fx},{fy}) mm: ¿la hoja se movió o se recortó?")
        src.append((fx + s / 2, fy + s / 2))
        dst.append((xs.mean() + max(x0, 0), ys.mean() + max(y0, 0)))
    A = np.array([[x, y, 1] for x, y in src])
    sol, *_ = np.linalg.lstsq(A, np.array(dst), rcond=None)
    return sol.T  # [[a b c], [d e f]]


def recorte(img, M, c):
    x0, y0 = c["x"] + 0.5, c["y"] + LAB + 0.3
    w, h = CW - 1.0, CH - LAB - 0.7
    a, b, cc = M[0]
    d, e, f = M[1]
    coef = (a / R, b / R, a * x0 + b * y0 + cc, d / R, e / R, d * x0 + e * y0 + f)
    out = img.transform((int(w * R), int(h * R)), Image.AFFINE, coef, resample=Image.BILINEAR, fillcolor=255)
    return np.asarray(out) < UMBRAL, x0, y0


def vectorizar(tinta, y0, base_mm):
    """Contornos en unidades de fuente: x desde el borde izquierdo del recorte, y desde la línea de base."""
    if tinta.sum() < 15:
        return None
    pl = potrace.Bitmap(~tinta).trace(turdsize=30, alphamax=1.0, opticurve=True, opttolerance=0.2)
    k = U * args.escala

    def P(p):
        return (p.x / R * k, (base_mm - (y0 + p.y / R)) * k)

    contornos = []
    for curva in pl:
        segs = []
        for s in curva.segments:
            if s.is_corner:
                segs.append(("L", [P(s.c), P(s.end_point)]))
            else:
                segs.append(("C", [P(s.c1), P(s.c2), P(s.end_point)]))
        contornos.append((P(curva.start_point), segs))
    return contornos or None


def puntos(cont):
    for start, segs in cont:
        yield start
        for _, pts in segs:
            yield from pts


def transformar(cont, fn):
    return [(fn(start), [(t, [fn(p) for p in pts]) for t, pts in segs]) for start, segs in cont]


# ---------- 1. Leer todos los cuadros ----------
glifos = {}  # char -> [contornos por versión]
vista = []
descartar = {(d[:-1], int(d[-1]) - 1) for d in args.descartar.split(",") if d}
for n in range(len(hojas)):
    gris, px_mm = pagina_gris(n)
    M = afin(gris, px_mm)
    img = Image.fromarray(gris)
    for c in meta["celdas"]:
        if c["pag"] != n:
            continue
        tinta, x0, y0 = recorte(img, M, c)
        base_mm = c["y"] + LAB + G["base"]
        cont = vectorizar(tinta, y0, base_mm)
        vista.append((c["char"], c["ver"], tinta, cont is not None))
        if cont and (c["char"], c["ver"]) not in descartar:
            glifos.setdefault(c["char"], []).append(cont)

faltan = sorted({ch for ch, v, t, ok in vista} - set(glifos))
print(f"leídos {len(glifos)} caracteres; vacíos: {''.join(faltan) or 'ninguno'}")

# hoja de control con todos los recortes
OUT.mkdir(parents=True, exist_ok=True)
tw, th = vista[0][2].shape[1], vista[0][2].shape[0]
cols = 18
sheet = Image.new("L", (cols * tw, math.ceil(len(vista) / cols) * th), 255)
dr = ImageDraw.Draw(sheet)
for i, (ch, v, t, ok) in enumerate(vista):
    x, y = (i % cols) * tw, (i // cols) * th
    sheet.paste(Image.fromarray(np.where(t, 0, 255).astype(np.uint8)), (x, y))
    dr.rectangle([x, y, x + tw - 1, y + th - 1], outline=200)
    dr.text((x + 2, y + 1), ch if ok else ch + " VACÍO", fill=120)
sheet.save(OUT / "recortes.png")

for par in filter(None, args.usar.split(",")):
    destino, origen = par.split("=", 1)
    glifos[destino] = list(glifos[origen])

# ---------- 2. Apoyar en la base las letras sin cola ----------
# (la variación natural de altura la vuelve a poner letra.js, acotada)
COLA = set("gjpqyfQβγμφζηξρ") | set(",;()[]{}|/∫")
APOYAR = set("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789αδεθλπτωΔΣΦΩáéíóúñÁÉÓℓ∂") - COLA
for ch in APOYAR & set(glifos):
    glifos[ch] = [transformar(c, lambda p, dy=-min(q[1] for q in puntos(c)): (p[0], p[1] + dy)) for c in glifos[ch]]

# un reemplazo en mayúscula se lleva a la altura de las mayúsculas (la de la E)
if "E" in glifos:
    alto_cap = sum(max(q[1] for q in puntos(c)) for c in glifos["E"]) / len(glifos["E"])
    for par in filter(None, args.usar.split(",")):
        destino = par.split("=", 1)[0]
        if destino.isupper():
            glifos[destino] = [transformar(c, lambda p, k=alto_cap / max(q[1] for q in puntos(c)): (p[0], p[1] * k))
                               for c in glifos[destino]]

# ---------- 3. Glifos derivados ----------
def desplazar(cont, dx=0, dy=0, sx=1, sy=1, ox=None):
    xs = [p[0] for p in puntos(cont)]
    cx = (min(xs) + max(xs)) / 2 if ox is None else ox
    return transformar(cont, lambda p: (cx + (p[0] - cx) * sx + dx, p[1] * sy + dy))


def unir(*conts):
    return [c for cont in conts for c in cont]


def ancho(cont):
    xs = [p[0] for p in puntos(cont)]
    return max(xs) - min(xs)


def derivar(ch, base, fn):
    if ch not in glifos and base in glifos:
        glifos[ch] = [fn(c) for c in glifos[base]]


for ch, base in [("ϕ", "φ"), ("µ", "μ"), ("′", "'"), ("’", "'"), ("‘", "'"), ("“", '"'), ("”", '"'), ("∣", "|"), ("⋅", ".")]:
    derivar(ch, base, lambda c: c)
derivar("-", "−", lambda c: desplazar(c, sx=0.65))
derivar("–", "−", lambda c: c)
derivar("—", "−", lambda c: desplazar(c, sx=1.6))
derivar("·", ".", lambda c: c)
for d in "0123456789":
    sup = {"1": "¹", "2": "²", "3": "³"}.get(d)
    if sup:
        derivar(sup, d, lambda c: desplazar(c, sx=0.6, sy=0.6, dy=330))
derivar("⁻", "−", lambda c: desplazar(c, sx=0.6, sy=0.6, dy=280))
derivar("ª", "a", lambda c: desplazar(c, sx=0.55, sy=0.55, dy=330))
derivar("º", "o", lambda c: desplazar(c, sx=0.55, sy=0.55, dy=330))
derivar("˙", ".", lambda c: desplazar(c, dy=420))
if "." in glifos:
    glifos["¨"] = [unir(desplazar(c, dx=-60, dy=420), desplazar(c, dx=60, dy=420)) for c in glifos["."]]
    glifos["…"] = [unir(desplazar(c, dx=-130), c, desplazar(c, dx=130)) for c in glifos["."]]
    glifos["⋯"] = [unir(desplazar(c, dx=-130, dy=230), desplazar(c, dy=230), desplazar(c, dx=130, dy=230)) for c in glifos["."]]
    # el punto centrado tiene que quedar a la altura del eje matemático
    for ch in ("·", "⋅"):
        glifos[ch] = [desplazar(c, dy=230) for c in glifos["."]]
if "/" in glifos and "=" in glifos:
    # barra de \neq (U+E020 en KaTeX): ancho cero, centrada sobre el "=" que viene después
    glifos[""] = [desplazar(c, ox=None) for c in glifos["/"]]

# ---------- 4. Armar las caras ----------
rnd = random.Random(args.semilla)
SB = {".": 25, ",": 25, ":": 25, ";": 25, "'": 20, "′": 15, "|": 30}
CERO = {"", "˙", "¨"}  # acentos de KaTeX y la barra: no ocupan ancho


def deformar(cont):
    """Rotación, escala y sesgo chicos alrededor del pie del glifo."""
    xs = [p[0] for p in puntos(cont)]
    cx = (min(xs) + max(xs)) / 2
    ang = math.radians(rnd.uniform(-2.2, 2.2))
    sx, sy = rnd.uniform(0.95, 1.05), rnd.uniform(0.95, 1.05)
    sk = math.tan(math.radians(rnd.uniform(-3, 3)))
    ca, sa = math.cos(ang), math.sin(ang)

    def f(p):
        x, y = (p[0] - cx) * sx + p[1] * sk, p[1] * sy
        return (cx + x * ca - y * sa, x * sa + y * ca)
    return transformar(cont, f)


def charstring(cont, adv):
    pen = T2CharStringPen(adv, None)
    for start, segs in cont:
        pen.moveTo(start)
        for t, pts in segs:
            if t == "L":
                pen.lineTo(pts[0])
                pen.lineTo(pts[1])
            else:
                pen.curveTo(*pts)
        pen.closePath()
    return pen.getCharString()


def armar_cara(k):
    orden, cmap, cs, hm = [".notdef", "space", "uni200B"], {32: "space", 0xA0: "space", 0x200B: "uni200B"}, {}, {}
    pen = T2CharStringPen(500, None)
    cs[".notdef"], hm[".notdef"] = pen.getCharString(), (500, 0)
    for nombre, adv in (("space", 300), ("uni200B", 0)):
        cs[nombre] = T2CharStringPen(adv, None).getCharString()
        hm[nombre] = (adv, 0)
    ancho_igual = None
    for ch, versiones in sorted(glifos.items()):
        cont = versiones[(k % 3) % len(versiones)]
        cont = deformar(cont)
        xs = [p[0] for p in puntos(cont)]
        xmin, xmax = min(xs), max(xs)
        sb = SB.get(ch, 45)
        if ch == "":
            adv = 0
            ancho_igual = ancho_igual or (ancho(glifos["="][0]) + 90)
            dx = ancho_igual / 2 - (xmin + xmax) / 2
        elif ch in CERO:
            # KaTeX corre el acento -0.25em suponiendo un glifo de 0.5em: lo centramos ahí
            adv = 500
            dx = 250 - (xmin + xmax) / 2
        else:
            dx = sb - xmin
            adv = int(round(xmax - xmin + 2 * sb))
        cont = transformar(cont, lambda p: (round(p[0] + dx), round(p[1])))
        nombre = f"uni{ord(ch):04X}"
        orden.append(nombre)
        cmap[ord(ch)] = nombre
        cs[nombre] = charstring(cont, adv)
        hm[nombre] = (adv, min(p[0] for p in puntos(cont)))
    fam = f"HW-{k + 1}"
    fb = FontBuilder(1000, isTTF=False)
    fb.setupGlyphOrder(orden)
    fb.setupCharacterMap(cmap)
    fb.setupCFF(fam, {"FullName": fam}, cs, {})
    fb.setupHorizontalMetrics(hm)
    fb.setupHorizontalHeader(ascent=850, descent=-250)
    fb.setupNameTable({"familyName": fam, "styleName": "Regular"})
    fb.setupOS2(sTypoAscender=850, sTypoDescender=-250, sTypoLineGap=0, usWinAscent=950, usWinDescent=350,
                sxHeight=int(390 * args.escala), sCapHeight=int(700 * args.escala))
    fb.setupPost()
    fb.save(OUT / f"{fam}.otf")


for k in range(CARAS):
    armar_cara(k)

# ---------- 5. Head para la variante "letra" ----------
chars = sorted(set(glifos) | {""} & set(glifos))
faces = "\n".join(
    f"@font-face {{ font-family: 'HW-{k + 1}'; src: url('fuente{SUF}/HW-{k + 1}.otf'); }}" for k in range(CARAS))
js = (ROOT / "tools" / "letra.js").read_text()
head = f"""<style>
{faces}
{(ROOT / "tools" / "letra.css").read_text()}
</style>
<script>window.HW_CHARS = {json.dumps("".join(chars), ensure_ascii=False)}; window.HW_CARAS = {CARAS}; window.HW_SEMILLA = {args.semilla};</script>
<script>{js}</script>
"""
(ROOT / "build" / f"letra-head{SUF}.html").write_text(head, encoding="utf-8")
print(f"ok {CARAS} caras en {OUT.relative_to(ROOT)}, control en {(OUT / 'recortes.png').relative_to(ROOT)}")
