# Ond 7 (1P 24/9/2015, ej. 1): oscilador (casi fijo) y anillo (libre).
# Recalcula todos los numeros de Ond7.md. Correr con: python -I Ond7.py
import sys, os, math
sys.stdout.reconfigure(encoding="utf-8")
sys.path.insert(0, os.path.join(os.environ['TEMP'], 'pylib'))
import numpy as np

pi = math.pi
# ---- Datos (SI) ----
m = 0.720      # kg
L = 1.8        # m
F = 640.0      # N (tension)
K_E = 180.0    # J, energia cinetica de toda la cuerda en t_E (horizontal)
x1, x2 = 0.4, 1.0
dtA, dtB = 0.1, 0.032
xP = 0.2       # punto que en t = 0 esta en su maxima posicion superior

print("=== Datos ===")
mu = m / L
v = math.sqrt(F / mu)
print(f"mu = {mu:.4f} kg/m ; v = sqrt(F/mu) = {v:.4f} m/s")

# ---- Modelo y armonico (figura: 5 nodos contando x = 0, anillo en un antinodo) ----
n = 5
lam = 4 * L / (2 * n - 1)
k = 2 * pi / lam
f = v / lam
w = 2 * pi * f
T = 1 / f
f1 = v / (4 * L)
print("\n=== Modelo ===")
print(f"fijo-libre, n = {n}: L = (2n-1) lambda/4 = {2*n-1} lambda/4 -> lambda = {lam:.4f} m")
print(f"k = {k:.4f} rad/m = {k/pi:.4f} pi ; f = {f:.4f} Hz (= {f/f1:.0f} f1, f1 = {f1:.4f} Hz)")
print(f"omega = {w:.4f} rad/s = {w/pi:.4f} pi ; T = {T*1000:.4f} ms")
nodos = [i * lam / 2 for i in range(20) if i * lam / 2 <= L + 1e-9]
anti = [lam / 4 + i * lam / 2 for i in range(20) if lam / 4 + i * lam / 2 <= L + 1e-9]
print("nodos en x =", [round(x, 3) for x in nodos])
print("antinodos en x =", [round(x, 3) for x in anti])
print(f"kL = {k*L/pi:.4f} pi ; sen(2kL) = {math.sin(2*k*L):.2e}")

# ---- Amplitud ----
# En t_E la cuerda esta horizontal: toda la energia es cinetica, E = K_E.
# E = 1/2 mu w^2 Aest^2 * int_0^L sen^2(kx) dx = 1/2 mu w^2 Aest^2 (L/2) = 1/4 mu w^2 Aest^2 L
I_total = L / 2 - math.sin(2 * k * L) / (4 * k)
Aest = math.sqrt(K_E / (0.5 * mu * w**2 * I_total))
A = Aest / 2
print("\n=== Amplitud ===")
print(f"int_0^L sen^2(kx) dx = {I_total:.4f} m")
print(f"1/2 mu w^2 = {0.5*mu*w**2:.2f} J/m^3 ; 1/4 mu w^2 L = {0.25*mu*w**2*L:.2f} J/m^2")
print(f"Aest^2 = {Aest**2:.6e} m^2 ; Aest = {Aest:.5f} m = {Aest*100:.3f} cm")
print(f"A (propagante) = Aest/2 = {A:.5f} m = {A*100:.3f} cm")

# ---- a) Tramo [0,4 ; 1] ----
def I_sen2(a, b):
    return (b - a) / 2 - (math.sin(2 * k * b) - math.sin(2 * k * a)) / (4 * k)
def I_cos2(a, b):
    return (b - a) / 2 + (math.sin(2 * k * b) - math.sin(2 * k * a)) / (4 * k)
Is = I_sen2(x1, x2)
Ic = I_cos2(x1, x2)
print("\n=== a) tramo [0,4 ; 1] m ===")
print(f"largo = {x2-x1:.2f} m = {(x2-x1)/lam:.3f} lambda ; 2k x1 = {2*k*x1/pi:.2f} pi ; 2k x2 = {2*k*x2/pi:.2f} pi")
print(f"int sen^2 = {Is:.4f} m ; int cos^2 = {Ic:.4f} m")
E_tramo = 0.5 * mu * w**2 * Aest**2 * Is
print(f"fraccion del total = {Is/I_total:.4f} -> E_tramo = {E_tramo:.4f} J")
print(f"t_A - t_E = {dtA} s = {dtA/T:.3f} T")
print(f"t_B - t_E = {dtB} s = {dtB/T:.3f} T ; fase avanzada = {w*dtB/pi:.3f} pi")

# Fase: tomo t = 0 como en b) (x = 0,2 m arriba) => y = Aest sen(kx) cos(wt).
# Horizontal por primera vez en t_E = T/4.
tE = T / 4
tA, tB = tE + dtA, tE + dtB
def energias(t, a=x1, b=x2, N=200001):
    x = np.linspace(a, b, N)
    ydot = -Aest * w * np.sin(k * x) * np.sin(w * t)
    yx = Aest * k * np.cos(k * x) * np.cos(w * t)
    uK = 0.5 * mu * ydot**2
    uU = 0.5 * F * yx**2
    return np.trapezoid(uK, x), np.trapezoid(uU, x)
KE_all, UE_all = energias(tE, 0, L)
print(f"\nchequeo numerico en t_E (toda la cuerda): K = {KE_all:.4f} J, U = {UE_all:.2e} J")
KA, UA = energias(tA)
KB, UB = energias(tB)
print(f"t_A: K_tramo = {KA:.4f} J ; U_tramo = {UA:.2e} J ; E = {KA+UA:.4f} J")
print(f"t_B: K_tramo = {KB:.4f} J ; U_tramo = {UB:.4f} J ; E = {KB+UB:.4f} J")
print(f"sen^2(fase en t_B) = {math.sin(w*tB)**2:.4f} ; cos^2 = {math.cos(w*tB)**2:.4f}")
# Energia del tramo en muchos instantes: constante (nodo en 0,4 y antinodo en 1)
Es = [sum(energias(t, N=20001)) for t in np.linspace(0, T, 9)]
print("E_tramo(t) en 9 instantes de un periodo:", [round(float(e), 4) for e in Es])
# Contra-ejemplo: un tramo que no termina en nodo/antinodo no conserva su energia
Eotro = [sum(energias(t, 0.3, 0.5, N=20001)) for t in (0, T / 8, T / 4)]
print("(comparacion) tramo [0,3;0,5] en t = 0, T/8, T/4:", [round(float(e), 3) for e in Eotro])

# ---- b) Propagante del oscilador ----
print("\n=== b) propagante ===")
# Estacionaria con nodo en 0 y x = 0,2 m (antinodo) arriba en t = 0:
#   y = Aest sen(kx) cos(wt)  ->  phi = 0
#   = A sen(kx - wt) + A sen(kx + wt)
print(f"k*xP = {k*xP/pi:.3f} pi -> sen(k xP) = {math.sin(k*xP):.4f} (antinodo)")
xs = np.linspace(0, L, 1801)
ts = np.linspace(0, T, 401)
X, Tt = np.meshgrid(xs, ts)
yest = Aest * np.sin(k * X) * np.cos(w * Tt)
y1 = A * np.sin(k * X - w * Tt)
y2 = A * np.sin(k * X + w * Tt)
print(f"max |y1 + y2 - yest| = {np.max(np.abs(y1 + y2 - yest)):.2e} m")
print(f"y(0,t) max = {np.max(np.abs(Aest*np.sin(0)*np.cos(w*ts))):.1e} (nodo en el oscilador)")
print(f"dy/dx en x = L: max = {np.max(np.abs(Aest*k*math.cos(k*L)*np.cos(w*ts))):.2e} (anillo libre: pendiente 0)")
print(f"y1(0,2 ; 0) = {A*math.sin(k*xP):.5f} m = +A -> maximo de la propagante en t = 0")
# viaja hacia +x: la cresta en t = 0 esta en 0,2; en t = T/4 se corrio lambda/4
tq = T / 4
xx = np.linspace(0, lam, 80001)
xc = xx[np.argmax(A * np.sin(k * xx - w * tq))]
print(f"cresta de y1 en t = T/4: x = {xc:.4f} m (se corrio {xc-xP:.4f} m = lambda/4 = {lam/4:.4f}) -> viaja hacia +x")
print(f"\ny(x,t) = {A:.4f} sen({k/pi:.1f} pi x - {w/pi:.0f} pi t)  [m, s]")
print(f"       = {A:.4f} sen({k:.3f} x - {w:.1f} t)  [m, s]")
