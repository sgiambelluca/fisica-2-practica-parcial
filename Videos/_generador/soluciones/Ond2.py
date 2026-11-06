# Ond 2 (intermedio 18/10/2025, ej. 1): estacionaria, energia elastica de un tramo en t'.
# Recalcula todos los numeros de Ond2.md (formulas cerradas + integracion numerica).
import os, sys, math
sys.path.insert(0, os.path.join(os.environ['TEMP'], 'pylib'))
import numpy as np

L, m = 1.6, 0.004          # m, kg
k = 2.5 * math.pi          # 1/m
w = 400 * math.pi          # 1/s
phi = math.pi / 2
t, tp = 5.625e-3, 7.5e-3   # s
K = 0.079                  # J
x1, x2 = 0.2, 0.8          # tramo

mu = m / L
lam = 2 * math.pi / k
f = w / (2 * math.pi)
T = 1 / f
v = w / k
F = mu * v**2
print("== Datos ==")
print(f"mu = {mu:.5f} kg/m; lambda = {lam:.3f} m; f = {f:.1f} Hz; T = {T*1e3:.2f} ms; v = {v:.1f} m/s; tension F = mu v^2 = {F:.2f} N")
print(f"w^2 = {w**2:.1f} s^-2; L/(lambda/2) = {L/(lam/2):.3f} -> armonico n = 4, nodos totales = 5")
nodos = [x for x in np.arange(-0.2, 2.0001, 0.4)]
print(f"nodos de cos(2,5 pi x): x = {', '.join(f'{x:.1f}' for x in nodos)} m; antinodos en 0; 0,4; 0,8; ...")
print(f"t/T = {t/T:.4f}; t'/T = {tp/T:.4f}")

print("\n== Fase temporal ==")
ph_t = w * t + phi
ph_tp = w * tp + phi
print(f"w t + phi = {ph_t/math.pi:.4f} pi; sin^2 = {math.sin(ph_t)**2:.4f}; cos^2 = {math.cos(ph_t)**2:.4f}")
print(f"w t' + phi = {ph_tp/math.pi:.4f} pi; sin^2 = {math.sin(ph_tp)**2:.4f}; cos^2 = {math.cos(ph_tp)**2:.2e}")

print("\n== Energia total y amplitud ==")
E = K / math.sin(ph_t)**2
coef = 0.25 * mu * w**2 * L
A = math.sqrt(E / coef)
print(f"E = K / sin^2 = {E:.4f} J; (1/4) mu w^2 L = {coef:.1f} J/m^2; A^2 = {A**2:.4e} m^2; A = {A*100:.4f} cm")
half = 0.5 * mu * w**2 * A**2
print(f"(1/2) mu w^2 A^2 = {half:.4f} J/m")

print("\n== U' del tramo en t' ==")
xs = np.linspace(x1, x2, 200001)
dydx = -A * k * np.sin(k * xs) * math.cos(ph_tp)
uU = 0.5 * F * dydx**2
Up = np.trapezoid(uU, xs) if hasattr(np, 'trapezoid') else np.trapz(uU, xs)
print(f"U' (integral numerica) = {Up:.3e} J  -> U' = 0")
ymax = np.max(np.abs(A * np.cos(k * xs) * math.cos(ph_tp)))
print(f"max |y(x, t')| en el tramo = {ymax:.2e} m (cuerda horizontal)")

print("\n== Extras para el video ==")
Icos = (x2 - x1)/2 + (math.sin(2*k*x2) - math.sin(2*k*x1)) / (4*k)
Isin = (x2 - x1)/2 - (math.sin(2*k*x2) - math.sin(2*k*x1)) / (4*k)
print(f"int cos^2(kx) en [0,2;0,8] = {Icos:.4f} m; int sin^2(kx) = {Isin:.4f} m")
dydt = -A * w * np.cos(k * xs) * math.sin(ph_tp)
uK = 0.5 * mu * dydt**2
Kp = np.trapezoid(uK, xs) if hasattr(np, 'trapezoid') else np.trapz(uK, xs)
print(f"K del tramo en t' = (1/2) mu w^2 A^2 * {Icos:.2f} * sin^2 = {half*Icos*math.sin(ph_tp)**2:.5f} J (numerica {Kp:.5f} J)")
print(f"K de toda la cuerda en t' = E = {E:.4f} J")
# energias del tramo en t, por si se quiere mostrar
dydx_t = -A * k * np.sin(k * xs) * math.cos(ph_t)
dydt_t = -A * w * np.cos(k * xs) * math.sin(ph_t)
U_t = np.trapezoid(0.5*F*dydx_t**2, xs) if hasattr(np, 'trapezoid') else np.trapz(0.5*F*dydx_t**2, xs)
K_t = np.trapezoid(0.5*mu*dydt_t**2, xs) if hasattr(np, 'trapezoid') else np.trapz(0.5*mu*dydt_t**2, xs)
print(f"en t = 5,625 ms, tramo: U = {U_t:.5f} J, K = {K_t:.5f} J")
# chequeo de E total por integracion sobre una cuerda de 1,6 m (cualquier origen: [0;1,6] o [0,2;1,8])
for a0 in (0.0, 0.2):
    xx = np.linspace(a0, a0 + L, 400001)
    Kt = np.trapezoid(0.5*mu*(A*w*np.cos(k*xx)*math.sin(ph_t))**2, xx)
    Ut = np.trapezoid(0.5*F*(A*k*np.sin(k*xx)*math.cos(ph_t))**2, xx)
    print(f"cuerda en [{a0:.1f};{a0+L:.1f}]: K(t) = {Kt:.5f} J, U(t) = {Ut:.5f} J, suma = {Kt+Ut:.5f} J")
