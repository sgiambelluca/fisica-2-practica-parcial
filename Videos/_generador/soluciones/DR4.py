"""DR 4 (2P 2C 2024, ej. 2): doble rendija con vidrio + acrilico; se cambia el vidrio; Rayleigh.

Recalcula todos los numeros de DR4.md. Longitudes en micrometros salvo aviso.
"""
import math
import os
import sys

sys.path.insert(0, os.path.join(os.environ['TEMP'], 'pylib'))
sys.stdout.reconfigure(encoding='utf-8')

d = 60.0          # um
a = d / 6         # um
lam = 0.600       # um
Dp = 0.20         # m, rendijas-pantalla
n1, n2 = 1.5, 1.4
m_O = 2           # "segundo maximo" en O
N_nuevo = 8       # nuevo desplazamiento en franjas
I0 = 1.0
L_obs = 4.0       # m, observador-pantalla
pupila = 2e-3     # m

print("=== Datos ===")
print(f"d = {d} um, a = d/6 = {a} um, d/a = {d/a}, lambda0 = {lam} um")

# Situacion 1: vidrio (n1, e) en la rendija 1, acrilico (n2, e) en la rendija 2
print("\n=== Situacion 1: espesor e ===")
print(f"aporte de las laminas: e(n1-1) - e(n2-1) = e(n1-n2) = {n1-n2:.2f} e")
e = m_O * lam / (n1 - n2)
print(f"O ocupado por el maximo m = {m_O}: {n1-n2:.1f} e = {m_O} lambda0 = {m_O*lam:.2f} um -> e = {e:.4f} um")
print(f"   caminos agregados: vidrio {e*(n1-1):.2f} um, acrilico {e*(n2-1):.2f} um")
dCO1 = e * (n1 - 1) - e * (n2 - 1)
print(f"DeltaCO(O) = {dCO1:.3f} um = {dCO1/lam:.2f} lambda0")
e_alt = 1 * lam / (n1 - n2)
print(f"[otra lectura] 'segundo maximo' = m = 1: e = {e_alt:.3f} um")

# Situacion 2: vidrio reemplazado por n3 con espesor e/2
print("\n=== Situacion 2: n3 con espesor e/2 ===")
# cambio de DeltaCO = (e/2)(n3-1) - e(n1-1) = (e/2)(n3-2) ; n3 < n1 => negativo
# |cambio| = 8 lambda0
n3 = 2 - 2 * N_nuevo * lam / e
print(f"(e/2)(2 - n3) = {N_nuevo} lambda0 -> 2 - n3 = 16 lambda0/e = {2*N_nuevo*lam/e:.4f} -> n3 = {n3:.4f}")
n3_otro = 2 + 2 * N_nuevo * lam / e
print(f"   la otra raiz (cambio +8 lambda0) daria n3 = {n3_otro:.2f} > n1: se descarta")
n3_alt = 2 - 2 * N_nuevo * lam / e_alt
print(f"[otra lectura m=1] n3 = {n3_alt:.2f} < 1: imposible -> confirma m = 2")
dCO2 = (e / 2) * (n3 - 1) - e * (n2 - 1)
print(f"DeltaCO(O) final = (e/2)(n3-1) - e(n2-1) = {(e/2)*(n3-1):.2f} - {e*(n2-1):.2f} = {dCO2:.3f} um = {dCO2/lam:.2f} lambda0")
print(f"corrimiento: de m = {dCO1/lam:+.0f} a m = {dCO2/lam:+.0f} en O -> {abs(dCO2-dCO1)/lam:.0f} franjas")
# alternativa: 8 franjas medidas desde el patron sin laminas
for s in (+1, -1):
    n3x = 1 + (s * N_nuevo * lam + e * (n2 - 1)) / (e / 2)
    print(f"[otra lectura: DeltaCO final = {s*N_nuevo} lambda0] n3 = {n3x:.3f}")

# trampa: usar e*n en lugar de e*(n-1) (con espesores distintos el -1 no se cancela)
for s in (+1, -1):
    n3w = (e * n1 + s * N_nuevo * lam) / (e / 2)
    print(f"[trampa sin el -1] (e/2) n3 - e n1 = {s*N_nuevo} lambda0 -> n3 = {n3w:.2f}")

# b) intensidad en O
print("\n=== b) intensidad en O (situacion final) ===")
gam = math.pi * dCO2 / lam
beta = math.pi * a / lam * math.sin(0.0)
env = 1.0 if beta == 0 else (math.sin(beta) / beta)**2
I = 4 * I0 * math.cos(gam)**2 * env
print(f"gamma = pi DeltaCO/lambda0 = {gam/math.pi:.2f} pi -> cos^2 = {math.cos(gam)**2:.4f}")
print(f"beta(O) = (pi a/lambda0) sen 0 = {beta} -> (sen b/b)^2 = {env}")
print(f"I(O) = 4 I0 cos^2(gamma) (sen b/b)^2 = {I:.4f}")
gam1 = math.pi * dCO1 / lam
print(f"(situacion 1: gamma = {gam1/math.pi:.1f} pi -> I = {4*I0*math.cos(gam1)**2:.3f})")
# donde quedo el orden 0 y el primer minimo de difraccion
print(f"orden 0 final: |sen theta| = {abs(dCO2)/d:.4f} -> y = {Dp*math.tan(math.asin(abs(dCO2)/d))*100:.3f} cm del centro (lado del acrilico)")
print(f"primer cero de difraccion: sen theta = lambda0/a = {lam/a:.4f} -> y = {Dp*math.tan(math.asin(lam/a))*100:.3f} cm")
print(f"   el orden 0 cae justo en el cero de difraccion: (sen b/b)^2 ahi = 0 -> no se ve")
print(f"orden 0 situacion 1: |sen theta| = {abs(dCO1)/d:.4f} -> y = {Dp*math.tan(math.asin(abs(dCO1)/d))*1000:.3f} mm (lado del vidrio)")

# c) Rayleigh
print("\n=== c) observador a 4 m ===")
dy = lam * 1e-6 * Dp / (d * 1e-6)
print(f"interfranja Delta y = lambda0 D / d = {dy*1e3:.4f} mm")
alpha = dy / L_obs
th_min = 1.22 * lam * 1e-6 / pupila
print(f"angulo entre maximos visto por el ojo: {dy*1e3:.1f} mm / {L_obs} m = {alpha:.3e} rad")
print(f"Rayleigh pupila: theta_min = 1,22 lambda/D = {th_min:.3e} rad")
print(f"alpha/theta_min = {alpha/th_min:.4f} -> {'se resuelven' if alpha >= th_min else 'no se resuelven'}")
print(f"separacion minima resoluble a 4 m: {L_obs*th_min*1e3:.4f} mm ; distancia maxima para resolver: {dy/th_min:.3f} m")
