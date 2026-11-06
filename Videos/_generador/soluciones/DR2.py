# DR 2 (recuperatorio 30/5/2026, ej. 5): 5 rendijas, las 3 centrales tapadas; luego destapadas.
# Recalcula todos los numeros de DR2.md y cuenta los maximos de la campana central.
import os, sys, math
sys.path.insert(0, os.path.join(os.environ['TEMP'], 'pylib'))
import numpy as np
from fractions import Fraction

print("== 1. Tapadas: doble rendija de separacion 4d ==")
# suprimidos: m = p * (4d/a). El primero es m = 8.
# Buscar todos los 4d/a racionales (con d/a >= 1) cuyo primer orden suprimido sea 8
cands = []
for num in range(1, 65):
    for den in range(1, 17):
        r = Fraction(num, den)
        if r < 4:            # d/a >= 1  <=>  4d/a >= 4
            continue
        primero = r.numerator  # primer m entero de la forma p*r
        if primero == 8:
            cands.append(r)
cands = sorted(set(cands))
print(f"4d/a posibles con primer suprimido m = 8 y d >= a: {[str(c) for c in cands]} -> d/a = {[str(c/4) for c in cands]}")
da = 2
print(f"d/a = {da}")

print("\n== 2. Punto P ==")
# 4 d sen(thP) = lambda/2 -> d sen = lambda/8
g = math.pi / 8           # gamma = pi d sen / lambda
b = g / da                # beta = pi a sen / lambda
print(f"d sen(thP) / lambda = 1/8 -> gamma = pi/8 = {g:.5f} rad; beta = gamma/(d/a) = pi/16 = {b:.5f} rad")

def I(gam, N=5, ratio=da):
    bet = gam / ratio
    s = np.sin(gam)
    nf = np.where(np.abs(s) < 1e-12, N**2, (np.sin(N*gam) / np.where(np.abs(s) < 1e-12, 1, s))**2)
    env = np.where(np.abs(bet) < 1e-12, 1.0, (np.sin(bet) / np.where(np.abs(bet) < 1e-12, 1, bet))**2)
    return nf * env

print("\n== a) I_P / I_max ==")
nf = (math.sin(5*g) / math.sin(g))**2
env = (math.sin(b) / b)**2
print(f"sen(5pi/8) = {math.sin(5*g):.5f}; sen(pi/8) = {math.sin(g):.5f}; cociente = {math.sin(5*g)/math.sin(g):.5f}; al cuadrado = {nf:.4f}")
print(f"sen(pi/16) = {math.sin(b):.5f}; beta = {b:.5f}; (sen b / b)^2 = {env:.5f}")
IP = nf * env
print(f"I_P = {IP:.4f} I0; I_max = 25 I0; I_P/I_max = {IP/25:.4f}")
print(f"(sin envolvente: {nf/25:.4f})")
print(f"(antes de destapar, en P: 4 I0 cos^2(pi/2) = {4*math.cos(math.pi/2)**2:.1e} -> minimo)")
gg = np.linspace(-3*math.pi, 3*math.pi, 600001)
print(f"chequeo grilla: max de I = {I(gg).max():.4f} I0 (en gamma = {gg[I(gg).argmax()]:.2e})")

print("\n== b) maximos en la campana central (|beta| < pi <=> |gamma| < 2pi) ==")
gg = np.linspace(-2*math.pi + 1e-9, 2*math.pi - 1e-9, 4_000_001)
Ig = I(gg)
loc = np.where((Ig[1:-1] > Ig[:-2]) & (Ig[1:-1] > Ig[2:]))[0] + 1
print(f"maximos locales encontrados: {len(loc)}")
def es_principal(gam):
    # principal: cerca de gamma = m pi (el factor de red vale N^2 ahi)
    return abs(gam/math.pi - round(gam/math.pi)) < 0.05
for i in loc:
    tipo = "principal" if es_principal(gg[i]) else "secundario"
    print(f"   gamma = {gg[i]/math.pi:+.4f} pi  ->  d sen/lambda = {gg[i]/math.pi:+.4f}, I = {Ig[i]:.4f} I0  ({tipo})")
princ = [i for i in loc if es_principal(gg[i])]
print(f"I en gamma = pi exacto (orden 1): 25 (sen(pi/2)/(pi/2))^2 = {25*(2/math.pi)**2:.4f} I0 -> {25*(2/math.pi)**2/25:.4f} I_max")
print(f"principales: {len(princ)} (m = 0, +-1); m = +-2 cae en el minimo de difraccion: I(2pi) = {float(I(np.array([2*math.pi - 1e-12]))[0]):.2e}")
print(f"secundarios: {len(loc) - len(princ)}")
# separar los 'normales' (entre dos ceros del factor de red) de los pegados al minimo de difraccion
borde = [i for i in loc if abs(abs(gg[i]) - 2*math.pi) < math.pi/5]
print(f"   de esos, {len(borde)} estan entre el ultimo cero del factor de red (9pi/5) y el minimo de difraccion (2pi): restos del orden +-2 suprimido")
print(f"   secundarios 'de libro' (N-2 = 3 entre principales consecutivos, 4 tramos): {3*4}")
print(f"cuenta 3 + 12 = 15 (hoja v7) ; cuenta estricta de maximos locales = {len(loc)}")
# Ancho de la campana: d/a = 2 -> 2 d/a - 1 = 3 principales
print(f"formula 2 d/a - 1 = {2*da - 1}")
