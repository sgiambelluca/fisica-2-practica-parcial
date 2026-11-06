"""Geo 4 (1P 14/9/2024, ej. 1): cubo abierto en un planeta con n' = 1,2.

Recalcula todos los numeros de Geo4.md.
"""
import math
import os
import sys

sys.path.insert(0, os.path.join(os.environ['TEMP'], 'pylib'))
sys.stdout.reconfigure(encoding='utf-8')
import numpy as np

n_at = 1.2      # indice de la atmosfera
frac = 0.60     # fraccion maxima iluminada
a = 1.0         # arista (el resultado no depende de a)
h = a           # la fuente esta en el fondo: distancia a la superficie = a

print("=== Condicion de area ===")
# pi r^2 <= 0,6 a^2 con r = h tg(theta_L) = a tg(theta_L)
tg_max = math.sqrt(frac / math.pi)
print(f"0,6/pi = {frac/math.pi:.6f} ; tg(theta_L) <= sqrt(0,6/pi) = {tg_max:.6f}")
print(f"r/a <= {tg_max:.4f} (< 0,5: el disco entra entero en el cuadrado)")
thL = math.atan(tg_max)
print(f"theta_L <= arctg({tg_max:.4f}) = {math.degrees(thL):.4f} grados = {thL:.5f} rad")
s = math.sin(thL)
print(f"sen(theta_L) = {s:.6f}")
n_min = n_at / s
print(f"n >= n'/sen(theta_L) = 1,2/{s:.5f} = {n_min:.5f}")
print(f"forma cerrada: n_min = n' sqrt(1 + pi/0,6) = {n_at*math.sqrt(1+math.pi/frac):.5f}")

print("\n=== Chequeos ===")
for n in (1.1, 1.2, 2.0, 2.683, n_min, 3.0, 4.0):
    if n <= n_at:
        print(f"n = {n:.4f}: no hay reflexion total -> 100% iluminado")
        continue
    th = math.asin(n_at / n)
    r = h * math.tan(th)
    if r <= a / 2:
        f = math.pi * r**2 / a**2
    else:
        # disco recortado por el cuadrado: integracion numerica en una grilla
        N = 1501
        xs = np.linspace(-a / 2, a / 2, N)
        X, Y = np.meshgrid(xs, xs)
        f = np.mean(X**2 + Y**2 <= r**2)
    print(f"n = {n:.4f}: theta_L = {math.degrees(th):.3f} grados, r/a = {r/a:.4f}, iluminado = {100*f:.2f}%")
n_borde = n_at * math.sqrt(1 + 4)   # r = a/2 -> tg = 0,5
print(f"el disco toca los bordes (r = a/2) con n = n' sqrt(5) = {n_borde:.4f}; ahi ilumina pi/4 = {100*math.pi/4:.2f}%")
n_diag = n_at * math.sqrt(1 + 2)    # r = a/sqrt(2) -> tg = 1/sqrt(2): el circulo cubre las esquinas
print(f"el circulo llega a las esquinas (r = a/sqrt2) con n = n' sqrt(3) = {n_diag:.4f}; por debajo, 100% iluminado")
