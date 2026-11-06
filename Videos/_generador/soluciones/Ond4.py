"""Ond 4 (1P 14/9/2024, ej. 2): cuerda de guitarra.

Recalcula todos los numeros de Ond4.md.
"""
import math
import os
import sys

sys.path.insert(0, os.path.join(os.environ['TEMP'], 'pylib'))
sys.stdout.reconfigure(encoding='utf-8')
import numpy as np

# Datos
L = 0.64          # m
m = 1.92e-3       # kg
n_afin = 4        # cuarto armonico
f_LA = 440.0      # Hz
x_dedo = 0.40     # m (medido desde x = 0, la cejuela)
EK_dato = 0.22    # J
x1, x2 = 0.08, 0.20   # tramo [m]
A_c = 1e-3        # m, amplitud del item c

print("=== Datos ===")
mu = m / L
print(f"mu = m/L = {mu:.6f} kg/m")
f1 = f_LA / n_afin
v = 2 * L * f1
print(f"f1 = 440/4 = {f1} Hz ; v = 2 L f1 = {v:.4f} m/s")
F = mu * v**2
print(f"tension F = mu v^2 = {F:.4f} N")

# a)
print("\n=== a) misma nota apretando en x = 40 cm ===")
for nombre, Lp in (("vibra del dedo al puente (real)", L - x_dedo), ("vibra de x=0 al dedo", x_dedo)):
    f1p = v / (2 * Lp)
    n = f_LA / f1p
    print(f"{nombre}: L' = {Lp:.2f} m, f1' = v/(2L') = {f1p:.4f} Hz, 440/f1' = {n:.4f} -> entero? {abs(n-round(n))<1e-9}")
    print(f"   armonicos: {[round(k*f1p, 2) for k in range(1, 6)]}")

# b)
print("\n=== b) 880 Hz, amplitud A ===")
f = 2 * f_LA
for nombre, Lp in (("dedo-puente", L - x_dedo), ("0-dedo", x_dedo)):
    print(f"{nombre}: n = 880/f1' = {f/(v/(2*Lp)):.4f}")
lam = v / f
k = 2 * math.pi / lam
w = 2 * math.pi * f
T = 1 / f
print(f"lambda = v/f = {lam:.4f} m ; lambda/2 = {lam/2:.4f} m ; k = 2pi/lambda = {k:.4f} m^-1 = {k/math.pi:.4f} pi")
print(f"omega = 2 pi f = {w:.3f} s^-1 = {w/math.pi:.1f} pi ; T = 1/f = {T*1e3:.5f} ms")
t1 = 11 / 8 * T
print(f"t1 = 11T/8 = {t1*1e3:.5f} ms ; omega t1 = {w*t1/math.pi:.4f} pi")
# y = A sen(kx) cos(wt + phi), horizontal en t=0 -> phi = -pi/2 (o +pi/2)
for phi in (-math.pi / 2, math.pi / 2):
    print(f"   phi = {phi/math.pi:+.1f} pi: sen^2(w t1 + phi) = {math.sin(w*t1+phi)**2:.4f}")
fac_t = math.sin(w * t1 - math.pi / 2)**2
# integral de sen^2(kx) en el tramo
I_sen2 = (x2 - x1) / 2 - (math.sin(2 * k * x2) - math.sin(2 * k * x1)) / (4 * k)
xs = np.linspace(x1, x2, 200001)
I_num = np.trapezoid(np.sin(k * xs)**2, xs)
print(f"int_0,08^0,20 sen^2(kx) dx = {I_sen2:.6f} m (numerico {I_num:.6f}) ; kx1 = {k*x1/math.pi:.3f} pi, kx2 = {k*x2/math.pi:.3f} pi")
muw2 = mu * w**2
print(f"mu w^2 = {muw2:.2f} J/m^3... (kg/(m s^2))")
coef = 0.5 * muw2 * fac_t * I_sen2
print(f"E_K = 1/2 mu w^2 A^2 * {fac_t:.3f} * {I_sen2:.3f} = {coef:.4f} * A^2")
A = math.sqrt(EK_dato / coef)
print(f"A = sqrt(0,22/{coef:.4f}) = {A:.6f} m = {A*100:.4f} cm")
print(f"[otra lectura] si y = 2A sen(kx)cos(...), A_propagante = {A/2*100:.4f} cm")
# energia total de la parte que vibra (dato extra)
E_tot_24 = 0.25 * muw2 * A**2 * (L - x_dedo)
print(f"(extra) energia total del tramo de 24 cm = 1/4 mu w^2 A^2 L' = {E_tot_24:.4f} J")

# c)
print("\n=== c) u_U(x) en t2 = 2 t1 ===")
t2 = 2 * t1
print(f"t2 = 11T/4 = {t2*1e3:.5f} ms ; omega t2 = {w*t2/math.pi:.4f} pi")
for phi in (-math.pi / 2, math.pi / 2):
    print(f"   phi = {phi/math.pi:+.1f} pi: cos^2(w t2 + phi) = {math.cos(w*t2+phi)**2:.4f} ; sen^2 = {math.sin(w*t2+phi)**2:.4f}")
umax = 0.5 * F * k**2 * A_c**2
print(f"u_U max = 1/2 F k^2 A'^2 = {umax:.6f} J/m (= 1/2 mu w^2 A'^2 = {0.5*muw2*A_c**2:.6f})")
print(f"u_U(x) = {umax:.4f} cos^2({k/math.pi:.1f} pi x)  [J/m, x en m]")
for xx in (0.08, 0.10, 0.12, 0.14, 0.16, 0.18, 0.20):
    print(f"   x = {xx:.2f} m: kx = {k*xx/math.pi:.3f} pi, u_U = {umax*math.cos(k*xx)**2:.5f} J/m")
I_cos2 = (x2 - x1) / 2 + (math.sin(2 * k * x2) - math.sin(2 * k * x1)) / (4 * k)
print(f"(extra) E_U del tramo en t2 = umax * int cos^2 = {umax:.5f} * {I_cos2:.4f} = {umax*I_cos2*1e3:.4f} mJ")
print(f"[otra lectura] si A' = 1 mm es la amplitud de cada propagante: u_U max = {0.5*F*k**2*(2*A_c)**2:.5f} J/m")
