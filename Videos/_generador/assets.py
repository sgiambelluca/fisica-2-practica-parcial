# Exporta a assets/ el enunciado recortado de cada ejercicio del PDF de práctica (Osc1.jpg, Ond1.jpg, ...),
# usando los mismos recortes que "Hojas propias/tools/practica.py".
# Uso (desde la raíz del repo): python -I "Videos/_generador/assets.py"
import importlib.util, pathlib, sys

AQUI = pathlib.Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location("practica", AQUI.parents[1] / "Hojas propias" / "tools" / "practica.py")
practica = importlib.util.module_from_spec(spec)
spec.loader.exec_module(practica)

out = AQUI / "assets"
out.mkdir(exist_ok=True)
for e in practica.EJ:
    im, _ = practica.recorte(e, dpi=170)
    nombre = e[0].replace(" ", "") + ".jpg"
    im.save(out / nombre, quality=88)
    print(nombre, im.size)
