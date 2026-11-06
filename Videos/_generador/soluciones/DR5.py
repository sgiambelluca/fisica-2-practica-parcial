# DR 5 (2P 26/6/2023, ej. 1): foto del patrón -> d y a; lámina que lleva el máximo 2 al 6º mínimo.
# Verifica todos los números de DR5.md.
import sys, os, math
sys.path.insert(0, os.path.join(os.environ['TEMP'], 'pylib'))
import numpy as np
sys.stdout.reconfigure(encoding='utf-8')

lam = 612e-9      # m
D = 1.75          # m
dy = 1.53e-3      # m (interfranja)
e = 7e-6          # m
I0 = 1.0

# --- a) d y a
d = lam*D/dy
print(f"a) d = lambda D / dy = {d*1e6:.3f} um = {d*1e3:.4f} mm")
print(f"   ángulo de la 1ª franja: dy/D = {dy/D:.3e} rad (aprox. paraxial OK)")
ratio = 7       # en la foto falta el máximo m = ±7
a = d/ratio
print(f"   falta m = 7 -> d/a = 7 -> a = {a*1e6:.3f} um = {a*1e3:.4f} mm")
# chequeo de la foto: con d/a = 7 el 1er cero de difracción cae en y = 7 dy
print(f"   1er cero de difracción: y = lambda D / a = {lam*D/a*1e3:.3f} mm = {lam*D/a/dy:.2f} interfranjas")

# --- b) n
# máximos con lámina: d senθ = m λ + e(n-1). Máx 2 -> 6º mínimo (d senθ = 5,5 λ)
min6 = 5.5        # el k-ésimo mínimo está en (k - 1/2) λ
corr = min6 - 2   # franjas que se corre
n = 1 + corr*lam/e
print(f"\nb) 6º mínimo en d senθ = {min6} λ ; corrimiento = {corr} franjas")
print(f"   e(n-1) = {corr} λ = {corr*lam*1e6:.4f} um -> n - 1 = {corr*lam/e:.5f} -> n = {n:.4f}")
print(f"   corrimiento en la pantalla = {corr} · {dy*1e3:.2f} mm = {corr*dy*1e3:.4f} mm ; (λD = {lam*D:.4e} m²)")
n_alt = 1 + (6.5-2)*lam/e
print(f"   trampa (6º mínimo en 6,5 λ): n = {n_alt:.4f}")

# --- c) intensidad en el centro y máximo m = 2
def I(sen):
    dCO = d*sen - e*(n-1)          # lámina en la rendija del lado +
    gam = math.pi*dCO/lam
    beta = math.pi*a*sen/lam
    s = 1.0 if beta == 0 else math.sin(beta)/beta
    return 4*I0*math.cos(gam)**2*s**2

gam0 = math.pi*(-e*(n-1))/lam
print(f"\nc) centro: ΔCO = -e(n-1) = {-e*(n-1)/lam:.3f} λ ; γ = {gam0/math.pi:.3f} π ; "
      f"cos²γ = {math.cos(gam0)**2:.2e} ; I = {I(0.0):.2e}")
sen2 = min6*lam/d
y2 = D*math.tan(math.asin(sen2))
print(f"   máximo m=2: senθ = 5,5 λ/d = {sen2:.5e} ; y = D tgθ = {y2*1e3:.4f} mm "
      f"(= 5,5·1,53 = {5.5*1.53:.4f} mm)")
beta2 = math.pi*a*sen2/lam
print(f"   β = π a senθ/λ = 5,5π/7 = {beta2/math.pi:.4f} π = {beta2:.4f} rad ; sen β = {math.sin(beta2):.4f} ; "
      f"senβ/β = {math.sin(beta2)/beta2:.5f} ; (senβ/β)² = {(math.sin(beta2)/beta2)**2:.5f}")
print(f"   I(máx 2 corrido) = {I(sen2):.4f}")
s2_orig = 2*lam/d
b_orig = math.pi*a*s2_orig/lam
print(f"   comparación: sin lámina el máx 2 estaba en y = {2*1.53:.2f} mm con I = "
      f"{4*(math.sin(b_orig)/b_orig)**2:.4f} (β = 2π/7)")
# pico real de I(y) cerca de 8,4 mm (la envolvente decreciente lo corre apenas)
ys = np.linspace(7.5e-3, 9.3e-3, 200001)
Is = np.array([I(math.sin(math.atan(yy/D))) for yy in ys])
j = int(np.argmax(Is))
print(f"   pico numérico de I(y): y = {ys[j]*1e3:.4f} mm, I = {Is[j]:.4f}")

# --- d) máximos en la campana central: |a senθ| < λ  <=>  |d senθ| < 7 λ
sin_l = [m for m in range(-10, 11) if abs(m) < ratio]
print(f"\nd) sin lámina: m = {sin_l} -> {len(sin_l)} máximos (2 d/a - 1 = {2*ratio-1})")
con_l = [m for m in range(-20, 20) if abs(m + corr) < ratio]
pos = [m + corr for m in con_l]
print(f"   con lámina: d senθ/λ = m + 3,5 en (-7, 7): m = {con_l}")
print(f"   posiciones d senθ/λ = {pos} -> {len(con_l)} máximos")
for p in (6.5, -6.5, 0.5):
    s = p*lam/d
    print(f"   I en d senθ = {p} λ: {I(s):.4f}  (y = {D*math.tan(math.asin(s))*1e3:.3f} mm)")
