# Ond 6 (1P 28/9/2019, ej. 1): propagante en una cuerda fija-fija -> estacionaria; energia; se libera un extremo.
# Recalcula todos los numeros de Ond6.md.
import os, sys, math
sys.path.insert(0, os.path.join(os.environ['TEMP'], 'pylib'))
import numpy as np

m = 0.015          # kg
T = 36.0           # N (tension)
A = 2.3e-3         # m (amplitud de la propagante)
k = 2 * math.pi    # 1/m
w = 120 * math.pi  # 1/s

print("== Datos derivados ==")
v = w / k
mu = T / v**2
L = m / mu
lam = 2 * math.pi / k
f = w / (2 * math.pi)
Tper = 1 / f
print(f"v = w/k = {v:.4f} m/s")
print(f"mu = T/v^2 = {mu:.5f} kg/m")
print(f"L = m/mu = {L:.4f} m")
print(f"lambda = 2pi/k = {lam:.4f} m; f = {f:.2f} Hz; T = {Tper*1000:.4f} ms")

print("\n== a) Estacionaria y armonico ==")
n = 2 * L / lam
f1 = v / (2 * L)
print(f"n = 2L/lambda = {n:.4f}; f1 = v/2L = {f1:.3f} Hz; f/f1 = {f/f1:.4f}")
A2 = 2 * A
print(f"amplitud estacionaria 2A = {A2*1000:.2f} mm")
print("y(x,t) = A cos(kx - wt) - A cos(kx + wt) = 2A sen(kx) sen(wt)")
xs = np.linspace(0, L, 7)
ts = np.linspace(0, 0.05, 11)
err = max(abs(A*np.cos(k*x - w*t) - A*np.cos(k*x + w*t) - A2*np.sin(k*x)*np.sin(w*t)) for x in xs for t in ts)
print(f"chequeo identidad (max error) = {err:.2e}")
print(f"y(x,0) = 0 para todo x: max|y(x,0)| = {max(abs(A2*np.sin(k*xs)*np.sin(0))):.1e}")
print(f"nodos (k x = p pi): {[round(p*lam/2, 3) for p in range(round(n)+1)]} m")
print(f"vientres: {[round((p+0.5)*lam/2, 3) for p in range(round(n))]} m")

print("\n== b) u_K(x) en t' = 25 ms ==")
t1 = 25e-3
ph1 = w * t1
print(f"w t' = {ph1/math.pi:.4f} pi; sen(w t') = {math.sin(ph1):.2e}; cos^2(w t') = {math.cos(ph1)**2:.5f}")
uK0 = 0.5 * mu * (A2 * w)**2
print(f"(2A w)^2 = {(A2*w)**2:.5f} (m/s)^2; vmax de un vientre = 2A w = {A2*w:.5f} m/s")
print(f"u_K(x,t') = 1/2 mu (2A w)^2 sen^2(kx) cos^2(wt') = {uK0:.6f} J/m * sen^2(2 pi x) = {uK0*1000:.3f} mJ/m * sen^2(2 pi x)")
E = 0.25 * mu * w**2 * A2**2 * L
print(f"Energia total de la cuerda E = 1/4 mu w^2 (2A)^2 L = {E*1000:.4f} mJ")
xx = np.linspace(0, L, 200001)
uK = uK0 * np.sin(k*xx)**2 * math.cos(ph1)**2
print(f"chequeo: integral de u_K en toda la cuerda en t' = {np.trapezoid(uK, xx)*1000:.4f} mJ")
print(f"y(x,t') = 0: max|y| = {max(abs(A2*np.sin(k*xx)*math.sin(ph1))):.1e} m (cuerda horizontal)")

print("\n== c) Energia elastica en [0,5 ; 1,25] m en t'' = 12,5 ms ==")
t2 = 12.5e-3
ph2 = w * t2
print(f"w t'' = {ph2/math.pi:.4f} pi; sen^2(w t'') = {math.sin(ph2)**2:.5f}; cos^2 = {math.cos(ph2)**2:.2e}")
uU0 = 0.5 * T * (A2 * k)**2
print(f"1/2 T (2A k)^2 = {uU0:.6f} J/m (igual a 1/2 mu w^2 (2A)^2 = {0.5*mu*w**2*A2**2:.6f})")
x1, x2 = 0.5, 1.25
integ = (x2/2 + math.sin(2*k*x2)/(4*k)) - (x1/2 + math.sin(2*k*x1)/(4*k))
print(f"int cos^2(kx) dx de {x1} a {x2} = {integ:.5f} m (= Delta x / 2 = {(x2-x1)/2:.5f})")
print(f"Delta x / (lambda/4) = {(x2-x1)/(lam/4):.3f}")
EU = uU0 * math.sin(ph2)**2 * integ
xx2 = np.linspace(x1, x2, 200001)
EUnum = np.trapezoid(uU0 * np.cos(k*xx2)**2 * math.sin(ph2)**2, xx2)
print(f"E_U = {EU*1000:.4f} mJ (numerico {EUnum*1000:.4f} mJ)")
print(f"E_U / E_total = {EU/E*100:.2f} %")
print(f"y en x=0,5: sen(k 0,5) = {math.sin(k*0.5):.2e} (nodo); en x=1,25: sen = {math.sin(k*1.25):.3f} (vientre)")

print("\n== d) Se libera un extremo ==")
r = 4 * L / lam
print(f"fijo-libre pide L = (2n-1) lambda/4 -> 4L/lambda = {r:.3f} (par -> no es impar)")
modos = [(2*j - 1) * v / (4 * L) for j in range(1, 6)]
print(f"modos propios fijo-libre: f = (2n-1) v/(4L) = {[round(x, 2) for x in modos]} Hz")
print(f"f = {f:.1f} Hz / (v/4L = {v/(4*L):.1f} Hz) = {f/(v/(4*L)):.2f} -> par: no es modo")
Ls_ok = [(2*j - 1) * lam / 4 for j in range(1, 8)]
print(f"largos que servirian con lambda = 1 m: {Ls_ok} m")

print("\n== Graficos (escalas sugeridas) ==")
for xv in [0, 0.125, 0.25, 0.375, 0.5]:
    print(f"u_K(x={xv}) = {uK0*math.sin(k*xv)**2*1000:.3f} mJ/m")

print("\n== Trampas ==")
print(f"(trampa) con amplitud A en vez de 2A: u_K max = {uK0/4*1000:.3f} mJ/m; E_U = {EU/4*1000:.3f} mJ")
xx3 = np.linspace(x1, x2, 200001)
print(f"(trampa) integrar sen^2 en lugar de cos^2 en el tramo: {np.trapezoid(np.sin(k*xx3)**2, xx3):.5f} m (da igual por casualidad)")
print(f"(trampa) y = 2A sen(kx) cos(wt): en t' el factor cos(wt) = {math.cos(w*t1):+.3f} -> u_K con sen(wt)^2 = {math.sin(w*t1)**2:.1e} (daria 0)")
