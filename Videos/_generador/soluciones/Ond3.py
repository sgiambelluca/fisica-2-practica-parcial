# Ond 3 (1P 20/4/2024, ej. 4): propagante -> estacionaria; y(x,t), K de un tramo, grafico de u_U(t).
# Recalcula todos los numeros de Ond3.md. Correr con el python del repo y -I.
import math, os, sys
sys.path.insert(0, os.path.join(os.environ['TEMP'], 'pylib'))
import numpy as np

v, L, m, T = 400.0, 0.50, 2e-3, 1e-3    # m/s, m, kg, s
x1, y1 = 0.2, 2e-3                       # punto con desplazamiento maximo +2 mm en t1 = 3T/4
t1 = 3 * T / 4

print("=== Datos ===")
mu = m / L
F = mu * v**2
lam = v * T
k = 2 * math.pi / lam
w = 2 * math.pi / T
print(f"mu = m/L = {mu:.4e} kg/m ; tension F = mu v^2 = {F:.1f} N")
print(f"lambda = vT = {lam:.3f} m ; k = 2pi/lambda = {k:.4f} = {k/math.pi:.3f} pi 1/m")
print(f"w = 2pi/T = {w:.2f} = {w/math.pi:.0f} pi rad/s ; f = {1/T:.0f} Hz")

print("\n=== Modelo ===")
print(f"L/(lambda/2) = {L/(lam/2):.3f} -> no entero: ni fijo-fijo ni libre-libre")
print(f"L/(lambda/4) = {L/(lam/4):.3f} -> impar: fijo-libre (L = 5 lambda/4)")
f1 = v / (4 * L)
print(f"fundamental fijo-libre f1 = v/4L = {f1:.0f} Hz ; f/f1 = {1/T/f1:.1f} (5to armonico)")
# caso 1: fijo en 0 -> sen(kx); caso 2: libre en 0 -> cos(kx)
print(f"si x=0 fijo: sen(k*0,2) = {math.sin(k*x1):+.2e} -> nodo en 0,2 m: imposible (tiene 2 mm)")
print(f"si x=0 libre: cos(k*0,2) = {math.cos(k*x1):+.4f} -> antinodo en 0,2 m: OK ; cos(k*L) = {math.cos(k*L):+.1e} (nodo en L: fijo) ")
nodos =[x for x in np.arange(0.0, L + 1e-12, 0.05) if abs(math.cos(k * x)) < 1e-9]
print("nodos (cos kx = 0):", [round(float(x), 2) for x in nodos], " antinodos: 0; 0,2; 0,4 m")

print("\n=== a) Fase temporal y funcion de onda ===")
A = y1   # el punto 0,2 m es antinodo, su desplazamiento maximo es la amplitud de la estacionaria
# y = A cos(kx) cos(wt + phi); en x1, t1: A cos(pi) cos(1,5pi + phi) = +A -> cos(1,5pi+phi) = -1
phi = math.pi - 1.5 * math.pi
print(f"w t1 = {w*t1/math.pi:.2f} pi ; cos(k x1) = {math.cos(k*x1):+.0f} -> cos(1,5pi + phi) = -1 -> phi = {phi/math.pi:+.2f} pi")
y = lambda x, t: A * np.cos(k * x) * np.sin(w * t)
print(f"y(x,t) = {A*1000:.0f} mm cos({k/math.pi:.0f} pi x) sen({w/math.pi:.0f} pi t)  [x en m, t en s]")
print(f"chequeo y(0,2 ; t1) = {1000*y(x1, t1):+.4f} mm ; dy/dt ahi = {A*math.cos(k*x1)*w*math.cos(w*t1):+.2e} (maximo)")
print(f"sen(w t1) = {math.sin(w*t1):+.0f} -> y(x,t1) = -2 mm cos(5 pi x)")
for x in [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5]:
    print(f"   x = {x:.2f} m : y = {1000*y(x, t1):+.3f} mm")

print("\n=== b) Energia cinetica de [0,05 ; 0,25] m en t2 = 1,5 ms ===")
t2 = 1.5e-3
print(f"w t2 = {w*t2/math.pi:.1f} pi ; sen(w t2) = {math.sin(w*t2):+.1e} -> cuerda horizontal ; cos(w t2) = {math.cos(w*t2):+.0f}")
c = 0.5 * mu * w**2 * A**2
print(f"(1/2) mu w^2 A^2 = 0,5*{mu}*({w:.1f})^2*({A})^2 = {c:.5f} J/m")
a_, b_ = 0.05, 0.25
integral = (b_/2 + math.sin(2*k*b_)/(4*k)) - (a_/2 + math.sin(2*k*a_)/(4*k))
print(f"int cos^2(kx) dx de 0,05 a 0,25 = {integral:.5f} m (= (0,25-0,05)/2 porque el tramo mide lambda/2)")
K = c * integral * math.cos(w * t2)**2
xs = np.linspace(a_, b_, 200001)
dydt = A * np.cos(k * xs) * w * np.cos(w * t2)
f_ = 0.5 * mu * dydt**2
Knum = float(np.sum((f_[1:] + f_[:-1]) / 2 * np.diff(xs)))
print(f"K = {K:.5f} J = {1000*K:.2f} mJ ; integral numerica: {1000*Knum:.4f} mJ")
dydx = -A * k * np.sin(k * xs) * np.sin(w * t2)
print(f"energia elastica del tramo en t2: max |dy/dx| = {np.max(np.abs(dydx)):.1e} -> U = 0")
Etot = 0.25 * mu * w**2 * A**2 * L
print(f"energia total de la cuerda E = (1/4) mu w^2 A^2 L = {1000*Etot:.2f} mJ ; el tramo tiene {100*K/Etot:.0f} %")

print("\n=== c) u_U(t) en x = 0,3 m, t en [0,75 ; 1,75] ms ===")
x3 = 0.3
print(f"k x = {k*x3/math.pi:.1f} pi ; sen^2(kx) = {math.sin(k*x3)**2:.3f} ; cos(kx) = {math.cos(k*x3):+.1e} (nodo de desplazamiento)")
uU0 = 0.5 * F * (A * k)**2 * math.sin(k * x3)**2
print(f"u_U max = (1/2) F (A k)^2 sen^2(kx) = 0,5*{F:.0f}*({A}*{k:.4f})^2 = {uU0:.5f} J/m")
print(f"misma cosa con (1/2) mu w^2 A^2 = {c:.5f} J/m (F k^2 = mu w^2)")
print(f"u_U(t) = {uU0:.4f} sen^2({w/math.pi:.0f} pi t) J/m = {uU0/2:.4f} (1 - cos({2*w/math.pi:.0f} pi t)) J/m")
print(f"periodo de u_U = T/2 = {T/2*1000:.2f} ms")
for tm in [0.75, 0.875, 1.0, 1.125, 1.25, 1.375, 1.5, 1.625, 1.75]:
    t = tm * 1e-3
    print(f"   t = {tm:.3f} ms : u_U = {uU0*math.sin(w*t)**2:.4f} J/m")
print(f"resolucion del alumno: 157,91 -> usa A en vez de A^2: 0,5*mu*w^2*A = {0.5*mu*w**2*A:.2f} (mal)")
