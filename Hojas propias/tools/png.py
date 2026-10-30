# Exporta cada página de los PDF de salida/ a PNG (para importar en la app de la tableta).
# Uso: .venv/bin/python tools/png.py salida/formulas-calco.pdf [...]
import sys
from pathlib import Path

import fitz

for pdf in sys.argv[1:]:
    pdf = Path(pdf)
    doc = fitz.open(pdf)
    for i, page in enumerate(doc, 1):
        out = pdf.with_name(f"{pdf.stem}-cara{i}.png")
        page.get_pixmap(dpi=200).save(out)
        print("ok", out)
