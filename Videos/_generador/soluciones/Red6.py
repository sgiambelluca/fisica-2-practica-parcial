# Red 6 (recuperatorio 2P 29/6/2022, ej. 2): red con incidencia oblicua de 12 grados, dos lambda muy cercanas,
# pantalla de 1,2 m a 2 m. Maximo orden y cantidad de lineas.
# Recalcula todos los numeros de Red6.md.
import math

lam1, lam2 = 595.05e-9, 594.95e-9   # m
th_i = math.radians(12.0)
K = 400 / 1e-2      # rendijas por metro
d = 1 / K
a = 6.25e-6
W_ilum = 1.25e-2    # m iluminados
ancho, D = 1.2, 2.0  # m

print("== Datos derivados ==")
N = W_ilum / d
print(f"d = 1/K = {d*1e6:.3f} um; a = {a*1e6:.2f} um; d/a = {d/a:.3f}")
print(f"N = {W_ilum*100:.2f} cm * 400/cm = {N:.1f} rendijas")
si = math.sin(th_i)
print(f"sen(12 grados) = {si:.6f}")
tmax = (ancho / 2) / D
smax = math.sin(math.atan(tmax))
print(f"borde de la pantalla: tg = 0,6/2 = {tmax:.3f} -> theta = {math.degrees(math.atan(tmax)):.3f} grados, sen = {smax:.5f}")
print(f"orden 0 (sigue derecho): theta = 12 grados -> y = {D*math.tan(th_i)*100:.2f} cm (adentro)")

print("\n== a) Ordenes que entran: sen(theta) = sen(12) + m lambda/d ==")
for lam, nom in [(lam1, 'lambda1'), (lam2, 'lambda2')]:
    r = lam / d
    mmax = (smax - si) / r
    mmin = (-smax - si) / r
    print(f"{nom}: lambda/d = {r:.6f}; m <= {mmax:.4f} -> m_max = {math.floor(mmax)}; m >= {mmin:.4f} -> m_min = {math.ceil(mmin)}")
r1 = lam1 / d
for m in [3, 4, -19, -20, -21]:
    s = si + m * r1
    if abs(s) < 1:
        y = D * math.tan(math.asin(s))
        print(f"  m = {m:+d} (lambda1): sen = {s:.5f}, y = {y*100:+.2f} cm {'(adentro)' if abs(y) <= ancho/2 else '(afuera)'}")
print("faltan m = p d/a = 4p: -4, -8, -12, -16, -20 (con oblicua tambien: beta = pi (a/d) m)")
print("-> maximo |m| geometrico = 20, pero falta -> maximo orden observable |m| = 19")

print("\n== b) Resolucion ==")
lm = (lam1 + lam2) / 2
dl = lam1 - lam2
R = lm / dl
print(f"lambda media = {lm*1e9:.2f} nm; Delta lambda = {dl*1e9:.2f} nm; lambda/Delta lambda = {R:.1f}")
m_res = R / N
print(f"|m| N >= {R:.0f} -> |m| >= {m_res:.3f} -> desde |m| = {math.ceil(m_res)} (el 12 falta -> primero visible resuelto: 13)")

print("\n== Conteo de lineas ==")
ordenes = [m for m in range(-20, 4) if m % 4 != 0 or m == 0]
total = 0
filas = []
for m in ordenes:
    if m == 0:
        nl = 1
    else:
        nl = 2 if abs(m) * N >= R else 1
    total += nl
    s = si + m * r1
    y = D * math.tan(math.asin(s))
    filas.append((m, nl, y))
for m, nl, y in filas:
    print(f"  m = {m:+3d}: y = {y*100:+7.2f} cm, lineas = {nl}")
nz = [f for f in filas if f[0] != 0]
res = [f for f in nz if f[1] == 2]
print(f"ordenes no nulos visibles: {len(nz)} (lado -: {len([f for f in nz if f[0]<0])}, lado +: {len([f for f in nz if f[0]>0])})")
print(f"resueltos (2 lineas): {[f[0] for f in res]} -> {len(res)} ordenes, {2*len(res)} lineas")
print(f"no resueltos (1 linea): {len(nz)-len(res)} ordenes + el orden 0")
print(f"TOTAL = {total} lineas")

print("\n== Separacion en el orden -19 (para la animacion) ==")
m = -19
s1 = si + m * lam1 / d; s2 = si + m * lam2 / d
y1 = D * math.tan(math.asin(s1)); y2 = D * math.tan(math.asin(s2))
print(f"y(lambda1) = {y1*100:.4f} cm, y(lambda2) = {y2*100:.4f} cm, separacion = {abs(y1-y2)*1000:.3f} mm")
m = -11
s1 = si + m * lam1 / d; s2 = si + m * lam2 / d
y1 = D * math.tan(math.asin(s1)); y2 = D * math.tan(math.asin(s2))
print(f"orden -11: separacion = {abs(y1-y2)*1000:.3f} mm (no resuelto: 11*500 = {11*N:.0f} < {R:.0f})")

print("\n== Trampa: si se ignora la incidencia oblicua ==")
mm = smax / r1
print(f"sen = m lambda/d <= {smax:.5f} -> m <= {mm:.3f} -> |m| <= 12, falta el 12 -> maximo 11")
ords = [m for m in range(1, 13) if m % 4 != 0]
lines_side = sum(2 if m * N >= R else 1 for m in ords)
print(f"ordenes por lado: {ords}; lineas por lado = {lines_side}; total = {2*lines_side+1}")
