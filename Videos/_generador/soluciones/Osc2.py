# Osc 2 (1P 14/9/2024, ej. 4): adorno colgante en un auto, forzado por las ruedas.
# Recalcula todos los numeros de Osc2.md.
import os, sys, math
sys.path.insert(0, os.path.join(os.environ['TEMP'], 'pylib'))
import numpy as np

k, m = 6.27, 1.0          # N/m, kg
D = 0.72                  # m (diametro de la rueda)
v1, v2 = 0.9, 0.792       # m/s
Amax = 0.06               # m

print("== Datos derivados ==")
w0sq = k / m
w0 = math.sqrt(w0sq)
print(f"w0^2 = {w0sq:.4f} s^-2, w0 = {w0:.5f} s^-1")
T1 = math.pi * D / v1
w1 = 2 * v1 / D
w2 = 2 * v2 / D
print(f"T1 = pi D / v = {T1:.5f} s, w1 = 2v/D = {w1:.5f} s^-1 (chequeo 2pi/T1 = {2*math.pi/T1:.5f})")
print(f"T2 = {math.pi*D/v2:.5f} s, w2 = 2v'/D = {w2:.5f} s^-1")

print("\n== gamma desde la resonancia de amplitud ==")
gsq = (w0sq - w1**2) / 2
g = math.sqrt(gsq)
print(f"w0^2 - w1^2 = {w0sq - w1**2:.4f}; gamma^2 = {gsq:.5f}; gamma = {g:.5f} s^-1")
wp = math.sqrt(w0sq - gsq)
print(f"w' = sqrt(w0^2 - gamma^2) = {wp:.5f} s^-1")
# trampa: redondear w0 a 2,5
w0r = round(w0, 1)
print(f"(trampa) con w0 redondeado a {w0r}: w0^2 - w1^2 = {w0r**2 - w1**2:.4f} -> gamma = 0")
print(f"(trampa) con w0 = 2,50 (3 cifras): w0^2 = {2.50**2:.4f}; con w0 = 2,504: w0^2 = {2.504**2:.4f}, gamma = {math.sqrt((2.504**2-6.25)/2):.4f}")

print("\n== F0 ==")
F0 = Amax * 2 * m * g * wp
den1 = math.sqrt((w0sq - w1**2)**2 + (2*g*w1)**2)
print(f"F0 = Amax*2*m*gamma*w' = {F0:.6f} N")
print(f"chequeo con A(w): denominador en w1 = sqrt({(w0sq-w1**2)**2:.6f} + {(2*g*w1)**2:.6f}) = {den1:.6f}; F0/m = Amax*den = {Amax*den1:.6f}")

print("\n== a) amplitud en w2 ==")
t1 = (w0sq - w2**2)
t2 = 2 * g * w2
den2 = math.sqrt(t1**2 + t2**2)
print(f"w0^2 - w2^2 = {t1:.4f}; (..)^2 = {t1**2:.4f}; 2 gamma w2 = {t2:.4f}; (..)^2 = {t2**2:.4f}; suma = {t1**2+t2**2:.4f}; raiz = {den2:.6f}")
A2 = (F0 / m) / den2
print(f"A' = (F0/m)/den = {A2:.6f} m = {A2*100:.4f} cm")
ratio = den2 / den1
print(f"cociente Amax/A' = {ratio:.4f}  (cociente de cuadrados {(den2/den1)**2:.4f})")
d1 = math.atan2(2*g*w1, w0sq - w1**2)
d2 = math.atan2(2*g*w2, w0sq - w2**2)
print(f"desfasajes: delta(w1) = {d1:.4f} rad = {math.degrees(d1):.2f} deg; delta(w2) = {d2:.4f} rad = {math.degrees(d2):.2f} deg")
# chequeo numerico: maximo de A(w) en una grilla
ws = np.linspace(2.0, 3.0, 200001)
Aw = (F0/m) / np.sqrt((w0sq - ws**2)**2 + (2*g*ws)**2)
print(f"chequeo grilla: max A = {Aw.max()*100:.5f} cm en w = {ws[Aw.argmax()]:.5f} s^-1")

print("\n== b) se detiene en minima longitud: y(0) = +A_est (y hacia arriba), v(0) = 0 ==")
phi = math.atan(-g / wp)   # tg phi = -(v0 + g y0)/(y0 w')
fac = math.sqrt(1 + (g/wp)**2)
print(f"gamma/w' = {g/wp:.6f}; phi = arctg(-gamma/w') = {phi:.6f} rad; factor C/y0 = {fac:.6f}")
for nombre, y0 in [("lectura 1: viene a v = 0,9 m/s, y0 = Amax", Amax),
                   ("lectura 2: viene a v' = 0,792 m/s, y0 = A'", A2),
                   ("(alumno: y0 = 2 cm redondeado)", 0.02)]:
    C = y0 * fac
    print(f"{nombre}: C = {C*100:.4f} cm -> y(t) = {C*100:.3f} e^(-{g:.1f} t) cos({wp:.3f} t {phi:+.3f}) [cm, s]")
    # chequeo: y(0) y v(0)
    y = lambda t: C*math.exp(-g*t)*math.cos(wp*t+phi)
    h = 1e-6
    print(f"   chequeo y(0) = {y(0)*100:.5f} cm, v(0) = {(y(h)-y(-h))/(2*h):.2e} m/s")
print(f"Con y hacia abajo: misma expresion con fase {phi+math.pi:.4f} rad (o un signo menos adelante).")
print(f"Periodo libre T' = 2pi/w' = {2*math.pi/wp:.4f} s; tiempo para que la amplitud caiga a la mitad = ln2/gamma = {math.log(2)/g:.3f} s")
print(f"(extra) Q = w0/(2 gamma) = {w0/(2*g):.2f}; ancho de la resonancia 2 gamma = {2*g:.2f} s^-1")
print(f"(trampa) sin amortiguamiento en a): A' = (F0/m)/|w0^2 - w2^2| = {(F0/m)/abs(w0sq-w2**2)*100:.3f} cm")
print(f"(trampa) frecuencia en Hz f1 = v/(pi D) = {v1/(math.pi*D):.4f} Hz; con w = v/D: {v1/D:.3f} s^-1")
