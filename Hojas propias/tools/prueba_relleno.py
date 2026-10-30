# Solo para probar el circuito: rellena la plantilla con una letra "manuscrita" del sistema,
# simulando lo que va a devolver el usuario. Genera build/plantilla-prueba.pdf
import json
import random
from pathlib import Path

import fitz
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
DPI = 300
PX = DPI / 25.4
meta = json.loads((ROOT / "build/plantilla.json").read_text())
plantilla = fitz.open(ROOT / "salida/plantilla-letra.pdf")

LATIN = "/System/Library/Fonts/Supplemental/Bradley Hand Bold.ttf"
RESTO = "/System/Library/Fonts/Supplemental/Arial Unicode.ttf"
from fontTools.ttLib import TTFont
cmap_latin = TTFont(LATIN).getBestCmap()

rnd = random.Random(7)
paginas = []
for p, page in enumerate(plantilla):
    img = Image.frombytes("RGB", (page.get_pixmap(dpi=DPI).width, page.get_pixmap(dpi=DPI).height),
                          page.get_pixmap(dpi=DPI).samples)
    d = ImageDraw.Draw(img)
    for c in meta["celdas"]:
        if c["pag"] != p:
            continue
        ch = c["char"]
        path = LATIN if ord(ch) in cmap_latin else RESTO
        size = int(7.6 * PX * rnd.uniform(0.92, 1.06))
        font = ImageFont.truetype(path, size)
        base_y = (c["y"] + meta["label_h_mm"] + meta["guias_mm"]["base"]) * PX
        x = (c["x"] + 3 + rnd.uniform(-0.6, 0.6)) * PX
        d.text((x, base_y + rnd.uniform(-8, 8)), ch, font=font, fill=(10, 10, 10), anchor="ls")
    paginas.append(img)
paginas[0].save(ROOT / "build/plantilla-prueba.pdf", save_all=True, append_images=paginas[1:], resolution=DPI)
print("ok build/plantilla-prueba.pdf")
