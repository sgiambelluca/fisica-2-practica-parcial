# Red 3 (Recu 30/5/2026, ej. 6): luz blanca sobre una red; % del detector con solapamiento.
# Recalcula todos los numeros de Red3.md. Correr con el python del repo y -I.
import math, os, sys
sys.path.insert(0, os.path.join(os.environ['TEMP'], 'pylib'))
import numpy as np

K = 2000                  # rendijas por cm
d = 1e4 / K               # um
a = 1.25                  # um
W, D = 1.80, 2.0          # m (ancho del detector, distancia)
l1, l2 = 0.400, 0.700     # um (luz blanca)

print("=== Datos ===")
print(f"d = 1 cm / {K} = {d:.1f} um ; d/a = {d/a:.1f} -> faltan m = 4, 8, ...")
tmax = (W / 2) / D
smax = tmax / math.sqrt(1 + tmax**2)
print(f"borde del detector: tg th_max = {W/2}/{D} = {tmax:.3f} -> th_max = {math.degrees(math.atan(tmax)):.3f} grados, sen th_max = {smax:.5f}")

print("\n=== Rango de cada orden (sen th = m lambda / d) ===")
y = lambda s: D * s / math.sqrt(1 - s**2)
for m in range(1, 7):
    s1, s2 = m * l1 / d, m * l2 / d
    falta = (m * a / d) == int(m * a / d) and m * a / d >= 1
    estado = "FALTA (m = 4p)" if falta else ("fuera del detector" if s1 > smax else
             ("entero" if s2 <= smax else f"cortado en sen = {smax:.4f} (lambda = {1000*smax*d/m:.1f} nm)"))
    ys2 = f"{100*y(min(s2, smax)):.2f}" if s1 <= smax and s2 < 1 else "-"
    ys1 = f"{100*y(s1):.2f}" if s1 < 1 else "-"
    print(f"m = {m}: sen {s1:.3f} - {s2:.3f} ; y = {ys1} - {ys2} cm ; {estado}")

print("\n=== Solapamientos (por lado) ===")
s23 = (3 * l1 / d, 2 * l2 / d)
y23 = (y(s23[0]), y(s23[1]))
print(f"2do y 3ro: sen {s23[0]:.3f} - {s23[1]:.3f} -> y = {100*y23[0]:.2f} - {100*y23[1]:.2f} cm -> {100*(y23[1]-y23[0]):.2f} cm")
s35 = (5 * l1 / d, smax)
y35 = (y(s35[0]), W / 2)
print(f"3ro y 5to: sen {s35[0]:.3f} - {s35[1]:.4f} -> y = {100*y35[0]:.2f} - {100*y35[1]:.2f} cm -> {100*(y35[1]-y35[0]):.2f} cm")
lado = (y23[1] - y23[0]) + (y35[1] - y35[0])
print(f"por lado: {100*lado:.2f} cm ; total: {200*lado:.2f} cm de {100*W:.0f} cm -> {100*2*lado/W:.2f} %")
solo23 = 2 * (y23[1] - y23[0])
print(f"si se olvida el 5to orden (hoja v6): {100*solo23:.2f} cm -> {100*solo23/W:.2f} %")

print("\n=== Verificacion por fuerza bruta (barrido del detector) ===")
ys = np.linspace(-W / 2, W / 2, 1_800_001)
sen = np.abs(ys) / np.sqrt(ys**2 + D**2)
cuenta = np.zeros_like(ys, dtype=int)
for m in range(1, 20):
    if m % 4 == 0:          # faltantes: m = p d/a = 4p
        continue
    lam = sen * d / m       # lambda que llegaria a ese punto en el orden m
    cuenta += ((lam >= l1) & (lam <= l2)).astype(int)
frac = np.mean(cuenta >= 2)
print(f"fraccion del detector con 2 o mas ordenes: {100*frac:.2f} %")
cuenta4 = cuenta + ((sen * d / 4 >= l1) & (sen * d / 4 <= l2)).astype(int)
print(f"(si no faltara el 4to: {100*np.mean(cuenta4 >= 2):.2f} %)")

print("\n=== Intensidades relativas de cada orden: (sen b / b)^2 con b = pi m a/d ===")
for m in [1, 2, 3, 5]:
    b = math.pi * m * a / d
    print(f"m = {m}: beta = {m}pi/4 -> {(math.sin(b)/b)**2:.4f}")

print("\n=== Trampas ===")
# paraxial y = D sen(th) en todos lados (borde: sen = 0,45)
sm = (W / 2) / D
o23 = 2 * D * (2 * l2 / d - 3 * l1 / d)
o35 = 2 * D * (min(3 * l2 / d, sm) - 5 * l1 / d)
print(f"paraxial y = D sen th (borde en sen = {sm:.2f}): 2-3 {100*o23:.0f} cm + 3-5 {100*o35:.0f} cm -> {100*(o23+o35)/W:.1f} % (mal)")
print(f"contar un solo lado: {100*lado/W:.2f} % (con 5to) o {100*solo23/2/W:.2f} % (sin 5to) (mal)")
print(f"1ro y 2do no se pisan: 1ro termina en {l2/d:.2f} y el 2do empieza en {2*l1/d:.2f}")
