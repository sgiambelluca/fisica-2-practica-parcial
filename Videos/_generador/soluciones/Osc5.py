# Osc 5 (1P 1C 2016, ej. 4): forzado con w_RA, w_RP y A(0); cesa la fuerza.
# Verifica todos los números de Osc5.md.
import sys, os, math
sys.path.insert(0, os.path.join(os.environ['TEMP'], 'pylib'))
import numpy as np
sys.stdout.reconfigure(encoding='utf-8')

wRA, wRP, A0 = 3.99, 4.0, 0.04        # s^-1, s^-1, m

# --- Datos derivados
w0 = wRP                                  # resonancia de potencia
gam2 = (w0**2 - wRA**2) / 2               # wRA^2 = w0^2 - 2 gamma^2
gam = math.sqrt(gam2)
wp = math.sqrt(w0**2 - gam2)              # w' (pseudofrecuencia libre)
F0m = A0 * w0**2                          # A(0) = F0/k = (F0/m)/w0^2
Q = w0 / (2 * gam)
print(f"w0 = {w0} s^-1")
print(f"w0^2 - wRA^2 = {w0**2 - wRA**2:.4f} s^-2")
print(f"gamma^2 = {gam2:.5f} s^-2 ; gamma = {gam:.5f} s^-1")
print(f"w' = {wp:.5f} s^-1")
print(f"F0/m = A0*w0^2 = {F0m:.4f} m/s^2")
print(f"Q = w0/(2 gamma) = {Q:.4f}")

# --- a) Amplitud máxima (en w_RA)
def A(w):
    return F0m / np.sqrt((w0**2 - w**2)**2 + 4 * gam2 * w**2)

Amax_formula = F0m / (2 * gam * wp)
Amax_direct = float(A(wRA))
print(f"\na) radicando en wRA: (w0^2-wRA^2)^2 = {(w0**2-wRA**2)**2:.6f}, 4g^2 wRA^2 = {4*gam2*wRA**2:.6f}, "
      f"suma = {(w0**2-wRA**2)**2 + 4*gam2*wRA**2:.6f}, raiz = {math.sqrt((w0**2-wRA**2)**2 + 4*gam2*wRA**2):.6f}")
print(f"2*gamma*w' = {2*gam*wp:.6f}")
print(f"A_max = (F0/m)/(2 gamma w') = {Amax_formula:.5f} m ; A(wRA) directo = {Amax_direct:.5f} m")
print(f"A_max/A0 = {Amax_formula/A0:.4f} ;  Q*A0 = {Q*A0:.5f} m")
# chequeo numérico del máximo de A(w)
w = np.linspace(3.9, 4.1, 2_000_001)
i = int(np.argmax(A(w)))
print(f"máximo numérico de A(w): w = {w[i]:.5f} s^-1, A = {A(w)[i]:.5f} m")
# trampa: amplitud en w_RP (no es la máxima)
print(f"trampa: A(w0) = (F0/m)/(2 gamma w0) = {float(A(w0)):.5f} m")
# potencia media ~ w^2 A^2: máximo en w0
P = w**2 * A(w)**2
print(f"máximo numérico de <P> ~ w^2 A^2: w = {w[int(np.argmax(P))]:.5f} s^-1")

# --- b) cesa la fuerza: E = E0 e^{-2 gamma t}; pierde 70% -> queda 30%
t70 = math.log(1/0.3) / (2*gam)
print(f"\nb) ln(1/0.3) = {math.log(1/0.3):.5f} ; 2 gamma = {2*gam:.5f} s^-1 ; t = {t70:.4f} s")
t_alt = math.log(1/0.7) / (2*gam)
print(f"   interpretación 'queda 70%': t = {t_alt:.4f} s")
print(f"   tau = 1/(2 gamma) = {1/(2*gam):.4f} s")
print(f"   trampa (energía con e^-gamma t): t = {math.log(1/0.3)/gam:.4f} s")
print(f"   trampa (wRA^2 = w0^2 - gamma^2): gamma = {math.sqrt(w0**2 - wRA**2):.4f} s^-1")
print(f"   trampa (F0/m = A0 = 0,04): A_max = {0.04/(2*gam*wp):.5f} m")

# chequeo con simulación: estado estacionario en w_RA, se corta la fuerza en t=0
# (en un máximo de x: x = A_max, v = 0); se integra la libre y se mira la energía.
m = 1.0; k = m*w0**2; b = 2*m*gam
def f(s):
    x, v = s
    return np.array([v, -(k*x + b*v)/m])
dt = 1e-4; s = np.array([Amax_formula, 0.0]); E0 = 0.5*k*s[0]**2
t = 0.0; ts = []; Es = []
while t < 6:
    k1 = f(s); k2 = f(s+dt/2*k1); k3 = f(s+dt/2*k2); k4 = f(s+dt*k3)
    s = s + dt/6*(k1+2*k2+2*k3+k4); t += dt
    ts.append(t); Es.append(0.5*m*s[1]**2 + 0.5*k*s[0]**2)
ts = np.array(ts); Es = np.array(Es)/E0
j = int(np.argmax(Es <= 0.3))
print(f"   simulación: E/E0 baja de 0,3 por primera vez en t = {ts[j]:.3f} s "
      f"(la energía exacta baja en escalones; la envolvente e^-2gt da {t70:.3f} s)")
# energía promediada en un período alrededor de t70
Tp = 2*math.pi/wp
mask = (ts > t70 - Tp/2) & (ts < t70 + Tp/2)
print(f"   E/E0 promediada en un período alrededor de {t70:.3f} s = {Es[mask].mean():.4f}")
