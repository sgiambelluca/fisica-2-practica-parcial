# Geo 1 (intermedio 18/10/2025, ej. 3): objeto a 20 cm de una divergente f' = -80 cm; espejo concavo
# |R| = 60 cm a una distancia d a la derecha de la lente. a) d para que la imagen final (vista desde la
# izquierda) quede en el mismo lugar que el objeto; b) aumento, derecha/invertida, real/virtual.
# Recalcula todos los numeros de Geo1.md. Convencion de la catedra: origen en el vertice de cada
# elemento, + en el sentido de la luz que llega a ESE elemento. Espejo: 1/s' + 1/s = 2/R, concavo R < 0,
# A = -s'/s (para el espejo, s' < 0 es imagen real, delante del espejo). Lente: 1/s' - 1/s = 1/f', A = s'/s.

def lente(s, f):
    """Imagen de una lente delgada en aire: 1/s' - 1/s = 1/f'."""
    sp = 1.0 / (1.0 / f + 1.0 / s)
    return sp, sp / s

def espejo(s, R):
    """Imagen de un espejo: 1/s' + 1/s = 2/R."""
    sp = 1.0 / (2.0 / R - 1.0 / s)
    return sp, -sp / s

f = -80.0   # cm (divergente)
R = -60.0   # cm (concavo: el centro queda del lado de donde viene la luz)
s1 = -20.0  # cm (objeto real a la izquierda)

print("=== 1) Ida por la lente (+ hacia la derecha) ===")
s1p, A1 = lente(s1, f)
print(f"1/s1' = 1/f' + 1/s1 = {1/f:.5f} + {1/s1:.5f} = {1/f + 1/s1:.5f} 1/cm  ->  s1' = {s1p:.3f} cm")
print(f"A1 = s1'/s1 = {A1:.4f}  (imagen virtual, derecha, 16 cm a la izquierda de la lente)")

print("\n=== 2) Condicion: la imagen final tiene que caer sobre el objeto ===")
# Vuelta por la lente (luz hacia la izquierda, + hacia la izquierda): queremos s3' = +20 cm.
s3p_obj = 20.0
s3_nec = 1.0 / (1.0 / s3p_obj - 1.0 / f)
print(f"Vuelta: 1/s3 = 1/s3' - 1/f' = 1/20 + 1/80 = {1/s3p_obj - 1/f:.5f}  ->  s3 = {s3_nec:.3f} cm "
      "(objeto virtual 16 cm a la izquierda de la lente = donde estaba la imagen 1)")
print("=> el espejo tiene que formar la imagen de ese punto sobre si mismo: s2' = s2 => 2/s2 = 2/R => s2 = R")
d = -R - (-s1p)        # el punto esta a d + 16 cm del espejo; tiene que ser |R| = 60 cm
print(f"d + {-s1p:.0f} = {-R:.0f}  ->  d = {d:.3f} cm")

print("\n=== 3) Verificacion completa con d = 44 cm ===")
s2 = -(d + (-s1p))
s2p, A2 = espejo(s2, R)
print(f"Espejo: s2 = -(d + 16) = {s2:.3f} cm; 1/s2' = 2/R - 1/s2 = {2/R:.5f} - ({1/s2:.5f}) = {2/R - 1/s2:.5f}"
      f"  ->  s2' = {s2p:.3f} cm (real, en el centro de curvatura); A2 = -s2'/s2 = {A2:.4f}")
# Paso a la lente en la vuelta: punto ubicado en x = s2' (respecto del espejo, + derecha).
# Lente en x = -d. Distancia medida + hacia la izquierda desde la lente: s3 = -d - s2'.
s3 = -d - s2p
s3p, A3 = lente(s3, f)
print(f"Vuelta por la lente (+ hacia la izquierda): s3 = s2' - D con D = {d:.0f} en el nuevo sentido -> s3 = {s3:.3f} cm (objeto virtual)")
print(f"1/s3' = 1/f' + 1/s3 = {1/f:.5f} + {1/s3:.5f} = {1/f + 1/s3:.5f}  ->  s3' = {s3p:.3f} cm  (real, 20 cm a la izq. = sobre el objeto)")
print(f"A3 = s3'/s3 = {A3:.4f}")
At = A1 * A2 * A3
print(f"A_total = A1*A2*A3 = {A1:.2f} * ({A2:.2f}) * {A3:.4f} = {At:.4f}  -> real, invertida, mismo tamano")

print("\n=== 4) Unicidad: barrido numerico de d ===")
def final(dd):
    try:
        t2 = -(dd - s1p)          # s2 = -(dd + 16)
        t2p, _ = espejo(t2, R)
        t3 = -dd - t2p
        t3p, _ = lente(t3, f)
        return t3p
    except ZeroDivisionError:     # el objeto cae justo en un foco: sale paralelo
        return float('inf')
prev = None
raices = []
dd = 0.3   # paso que no cae justo en la raiz
while dd <= 400.0:
    val = final(dd) - 20.0
    if prev is not None and prev[1] * val < 0 and abs(val) < 50 and abs(prev[1]) < 50:
        a, b = prev[0], dd
        fa = prev[1]
        for _ in range(80):
            m = 0.5 * (a + b)
            fm = final(m) - 20.0
            if fa * fm <= 0:
                b = m
            else:
                a, fa = m, fm
        raices.append(0.5 * (a + b))
    prev = (dd, val)
    dd += 0.5
print("raices de s3'(d) = 20 cm con 0 < d < 400 cm:", [round(r, 4) for r in raices])

print("\n=== 5) Datos extra para las animaciones ===")
print(f"Imagen 1: x = {s1p:.0f} cm respecto de la lente (a la izquierda), altura relativa {A1:.2f}")
print(f"Centro del espejo: x = d + R = {d + R:.0f} cm respecto de la lente (coincide con la imagen 1)")
print(f"Foco del espejo: a {abs(R)/2:.0f} cm del espejo = x = {d + R/2:.0f} cm respecto de la lente")
print(f"Los rayos reflejados convergen hacia x = {d + s2p:.0f} cm, pero la lente (x = 0) los corta antes: objeto virtual para la vuelta")
print("Curva s3'(d) para graficar (d en cm -> imagen final en cm a la izquierda de la lente):")
for dd in (20, 30, 35, 40, 42, 44, 46, 50, 60, 80):
    print(f"   d = {dd:>3}: s3' = {final(dd):8.2f}")

print("\n=== 6) Trampas ===")
print(f"Error tipico: pedir que la imagen del ESPEJO caiga sobre el objeto (d + 20 = 60 -> d = 40 cm). "
      f"Con d = 40 la imagen final queda en s3' = {final(40.0):.2f} cm, no en 20 cm")
try:
    print(f"Concavo con R = +60 (signo mal): s2 = R = +60 -> d + 16 = -60 -> d = {-60 - 16} cm (imposible)")
except Exception:
    pass
s1p_mal, _ = lente(-20.0, 80.0)
print(f"Divergente con f' = +80 (signo mal): s1' = {s1p_mal:.2f} cm -> todo el resto sale mal")
