# Ond 5 (recuperatorio 1P 18/6/2024, ej. 3): propagante -> estacionaria fijo-fijo; graficar u_K(t).
# Verifica todos los números de Ond5.md.
import sys, os, math
sys.path.insert(0, os.path.join(os.environ['TEMP'], 'pylib'))
import numpy as np
sys.stdout.reconfigure(encoding='utf-8')

m, F = 0.010, 18.0                 # kg, N
A, k, w = 0.02, 2.5*math.pi, 150*math.pi   # m, m^-1, s^-1

# --- a) armónico
v = w / k
mu = F / v**2
L = m / mu
lam = 2*math.pi / k
f = w / (2*math.pi)
n = 2*L / lam
f1 = v / (2*L)
print(f"v = w/k = {v:.4f} m/s")
print(f"mu = F/v^2 = {mu:.6f} kg/m")
print(f"L = m/mu = {L:.4f} m")
print(f"lambda = 2pi/k = {lam:.4f} m ; f = {f:.4f} Hz ; T = {1/f:.6f} s")
print(f"n = 2L/lambda = {n:.4f} ; f1 = v/2L = {f1:.4f} Hz ; f/f1 = {f/f1:.4f}")
nodos = [round(j*lam/2, 4) for j in range(int(round(n))+1)]
antinodos = [round(lam/4 + j*lam/2, 4) for j in range(int(round(n)))]
print(f"nodos (m): {nodos}  -> {len(nodos)} nodos, {len(nodos)-2} internos")
print(f"antinodos (m): {antinodos}")

# --- b) u_K(t) en x = 0,6 m
x = 0.60
kx = k*x
print(f"\nb) kx = {kx/math.pi:.4f} pi ; sin(kx) = {math.sin(kx):.4f} ; sin^2 = {math.sin(kx)**2:.4f}")
Aest = 2*A
vmax = Aest*w
uK0 = 0.5*mu*vmax**2                      # = 2 mu A^2 w^2
print(f"amplitud estacionaria 2A = {Aest} m ; v_max = 2A w = {vmax:.4f} m/s ; v_max^2 = {vmax**2:.4f}")
print(f"u_K,max = 1/2 mu (2A w)^2 = {uK0:.5f} J/m  (= 2 mu A^2 w^2 = {2*mu*A**2*w**2:.5f})")
print(f"trampa (amplitud A en vez de 2A): {0.5*mu*(A*w)**2:.5f} J/m")

T = 2*math.pi/w
print(f"T = {T:.6f} s ; período de u_K (T/2) = {T/2:.6f} s")
ti, tf = 0.04, 0.07
print(f"intervalo = {tf-ti:.3f} s = {(tf-ti)/(T/2):.3f} períodos de u_K")
print(f"w ti = {w*ti/math.pi:.3f} pi ; w tf = {w*tf/math.pi:.3f} pi")

def uK_formula(t):
    return uK0*math.sin(kx)**2*math.cos(w*t)**2

# máximos (cos^2 = 1): w t = j pi ; ceros: w t = (j+1/2) pi
maxs = [j/150 for j in range(0, 20) if ti - 1e-12 <= j/150 <= tf + 1e-12]
ceros = [(j+0.5)/150 for j in range(0, 20) if ti - 1e-12 <= (j+0.5)/150 <= tf + 1e-12]
print("máximos (s):", [f"{t:.5f}" for t in maxs])
print("ceros (s):  ", [f"{t:.5f}" for t in ceros])
print(f"u_K(ti) = {uK_formula(ti):.4f} J/m ; u_K(tf) = {uK_formula(tf):.2e} J/m")
for t in (0.04+T/8, 0.045, 0.055, 0.065):
    print(f"u_K({t:.5f}) = {uK_formula(t):.4f} J/m")

# --- chequeo independiente: incidente + reflejada (invertida en x=0)
def y(xx, t):
    return A*np.cos(k*xx - w*t) - A*np.cos(k*xx + w*t)
xs = np.linspace(0, L, 2001)
print(f"\nchequeo: max|y(x,0)| = {np.max(np.abs(y(xs, 0.0))):.2e} m (horizontal en t=0)")
print(f"chequeo: y(0,t) y y(L,t) = {y(0.0, 0.0123):.2e}, {y(L, 0.0123):.2e} (nodos en los extremos)")
print(f"2kL = {2*k*L/math.pi:.3f} pi (múltiplo de 2pi: reflejar en x=L da la misma reflejada -A cos(kx+wt))")
xr = np.linspace(0, L, 7)
refl_L = -A*np.cos(k*(2*L - xr) - w*0.0123)      # reflexión invertida en x = L
refl_0 = -A*np.cos(k*xr + w*0.0123)
print(f"chequeo: max|reflejada en L - reflejada en 0| = {np.max(np.abs(refl_L - refl_0)):.2e} m")
ts = np.linspace(ti, tf, 30001)
h = 1e-7
vy = (y(x, ts + h) - y(x, ts - h)) / (2*h)
uK_num = 0.5*mu*vy**2
uK_f = np.array([uK_formula(t) for t in ts])
print(f"chequeo: max |u_K numérica - fórmula| = {np.max(np.abs(uK_num - uK_f)):.2e} J/m ; "
      f"max u_K numérica = {uK_num.max():.5f} J/m")
# energía total de la cuerda (constante): E = 1/4 mu w^2 (2A)^2 L
print(f"energía total de la cuerda = 1/4 mu w^2 (2A)^2 L = {0.25*mu*w**2*Aest**2*L:.4f} J")
