"""Red 4 (2P 11/11/2023, ej. 2): tres lambdas, rango del ancho D de la pantalla para ver 21 lineas.

Recalcula todos los numeros de Red4.md.
"""
import math
import os
import sys

sys.path.insert(0, os.path.join(os.environ['TEMP'], 'pylib'))
sys.stdout.reconfigure(encoding='utf-8')

lams = {"l1": 510.0, "l2": 599.9, "l3": 600.1}   # nm
K = 40           # rendijas/mm
a = 10.0         # um
W = 30.0         # mm iluminados
Lp = 3.6         # m, red-pantalla
objetivo = 21

print("=== Datos ===")
d = 1000.0 / K   # um
N = int(W * K)
print(f"d = 1/K = {d} um ; N = W K = {W*K:.1f} -> {N} rendijas ; d/a = {d/a}")
faltan = [m for m in range(1, 50) if abs((m * a / d) - round(m * a / d)) < 1e-12]
print(f"ordenes que faltan (m = p d/a = 2,5 p entero): {faltan[:4]} ...")

print("\n=== Resolucion ===")
for (n_a, la), (n_b, lb) in (((k1, lams[k1]), (k2, lams[k2])) for k1, k2 in (("l1", "l2"), ("l2", "l3"), ("l1", "l3"))):
    dl = abs(lb - la)
    lm = (la + lb) / 2
    R = lm / dl
    print(f"{n_a}-{n_b}: lambda/Dlambda = {R:.2f} -> m >= R/N = {R/N:.4f}")
for lref in (599.9, 600.0, 600.1):
    print(f"   con lambda = {lref}: m >= {lref/0.2/N:.4f}")
print("=> l2 y l3 se separan desde m = 3 (en m = 1 y 2 son una sola linea)")

print("\n=== Lineas de un lado, ordenadas por sen(theta) ===")
lineas = []
for m in range(1, 9):
    if m in faltan:
        for nom, l in lams.items():
            print(f"   (falta m={m}: {nom} en sen = {m*l/(d*1000):.5f})")
        continue
    s1 = m * lams["l1"] / (d * 1000)
    lineas.append((s1, f"l1 m={m}"))
    if m * N >= 600.0 / 0.2:
        lineas.append((m * lams["l2"] / (d * 1000), f"l2 m={m}"))
        lineas.append((m * lams["l3"] / (d * 1000), f"l3 m={m}"))
    else:
        lineas.append((m * 600.0 / (d * 1000), f"l2+l3 m={m} (no resueltas)"))
lineas.sort()
for i, (s, nom) in enumerate(lineas, 1):
    th = math.asin(s)
    y = Lp * math.tan(th)
    print(f"{i:2d}: sen = {s:.6f}  theta = {math.degrees(th):.4f} grados  y = {y:.5f} m  [{nom}]")

por_lado = (objetivo - 1) // 2
print(f"\n21 lineas = 2 x {por_lado} + 1 -> {por_lado} por lado")
s_ult = lineas[por_lado - 1][0]
s_sig = lineas[por_lado][0]
y_ult = Lp * math.tan(math.asin(s_ult))
y_sig = Lp * math.tan(math.asin(s_sig))
print(f"ultima que tiene que entrar: {lineas[por_lado-1][1]} en y = {y_ult:.5f} m")
print(f"primera que no tiene que entrar: {lineas[por_lado][1]} en y = {y_sig:.5f} m")
print(f"D_min = 2 y = {2*y_ult:.4f} m ; D_max = 2 y = {2*y_sig:.4f} m")
print(f"=> {2*y_ult:.3f} m <= D < {2*y_sig:.3f} m")
print(f"[paraxial y = L sen] {2*Lp*s_ult:.4f} m <= D < {2*Lp*s_sig:.4f} m")

# conteo directo: para varios D, contar lineas
def contar(D):
    lado = sum(1 for s, _ in lineas if Lp * math.tan(math.asin(s)) <= D / 2)
    return 2 * lado + 1


for D in (0.60, 0.69, 0.6944, 2 * y_ult, 0.70, 0.80, 0.887, 2 * y_sig, 0.90):
    print(f"   D = {D:.5f} m -> {contar(D)} lineas")
y9 = Lp * math.tan(math.asin(lineas[por_lado - 2][0]))
print(f"l2 m=4 en y = {y9:.5f} m (D = {2*y9:.5f}); separacion con l3 m=4: {(y_ult-y9)*1e3:.3f} mm")
# trampa: olvidar que falta m = 5
s_trampa = 5 * lams["l1"] / (d * 1000)
print(f"[trampa sin faltantes] la 11a seria l1 m=5 en sen = {s_trampa:.4f} -> D_max = {2*Lp*math.tan(math.asin(s_trampa)):.4f} m")
