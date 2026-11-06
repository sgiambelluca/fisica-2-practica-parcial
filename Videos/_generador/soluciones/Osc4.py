"""Osc 4 (1P 24/9/2015, ej. 3): amortiguado -> forzado en resonancia de potencia -> libre.

Recalcula todos los numeros de Osc4.md.
"""
import math
import os
import sys

sys.path.insert(0, os.path.join(os.environ['TEMP'], 'pylib'))
sys.stdout.reconfigure(encoding='utf-8')

# Datos
perdida = 0.7924          # fraccion de energia disipada en 3 ciclos
ciclos = 3
F0 = 15.0                 # N
w_forz = 6.0              # s^-1, frecuencia a la que la potencia media es maxima
m = 10.0                  # kg

print("=== Datos ===")
queda = 1 - perdida
print(f"queda despues de 3 ciclos: E/E0 = {queda:.4f}")

# Maximo de potencia media => w = w0
w0 = w_forz
print(f"w0 = {w0} s^-1 (maximo de potencia media en w = w0)")

# a) E(3T') = E0 e^{-2 gamma 3T'}
print("\n=== a) Q ===")
ln_q = math.log(queda)
print(f"ln(E/E0) = {ln_q:.5f}")
gT = -ln_q / (2 * ciclos)                  # gamma*T'
print(f"6 gamma T' = {-ln_q:.5f}  =>  gamma T' = {gT:.6f}")
g_sobre_wp = gT / (2 * math.pi)            # gamma/omega'
print(f"gamma/omega' = gammaT'/(2pi) = {g_sobre_wp:.6f}")
gamma = g_sobre_wp * w0 / math.sqrt(1 + g_sobre_wp**2)
print(f"gamma = (gamma/w') w0 / sqrt(1+(gamma/w')^2) = {gamma:.6f} s^-1")
wp = math.sqrt(w0**2 - gamma**2)
print(f"omega' = sqrt(w0^2-gamma^2) = {wp:.5f} s^-1")
Q = w0 / (2 * gamma)
print(f"Q = w0/(2 gamma) = {Q:.4f}")
# chequeos
print(f"chequeo con T0 en lugar de T': gamma = gammaT'*w0/(2pi) = {gT*w0/(2*math.pi):.5f} -> Q = {w0/(2*gT*w0/(2*math.pi)):.4f}")
print(f"chequeo hoja: Q = sqrt((pi/gammaT')^2 + 1/4) = {math.sqrt((math.pi/gT)**2 + 0.25):.4f}")
por_ciclo = queda ** (1 / ciclos)
print(f"[trampa] energia que queda por ciclo = {por_ciclo:.5f}; se pierde {1-por_ciclo:.4f} por ciclo")
print(f"[trampa] 2pi/(DeltaE/E) con la perdida real por ciclo = {2*math.pi/(1-por_ciclo):.3f} (NO es Q: la perdida no es chica)")
print(f"aprox. lineal: DeltaE/E ~ 2 gamma T' = {2*gT:.4f} -> 2pi/(2gammaT') = {2*math.pi/(2*gT):.4f}")

gT_mal = -ln_q / ciclos                    # usando e^{-gamma t} (amplitud) para la energia
g_mal = gT_mal / (2 * math.pi) * w0 / math.sqrt(1 + (gT_mal / (2 * math.pi))**2)
print(f"[trampa e^(-gamma t) para la energia] gamma = {g_mal:.4f} -> Q = {w0/(2*g_mal):.3f}")
print(f"resonancia de amplitud: w_RA = sqrt(w0^2 - 2 gamma^2) = {math.sqrt(w0**2 - 2*gamma**2):.4f} s^-1")

k = m * w0**2
b = 2 * m * gamma
print(f"k = m w0^2 = {k:.3f} N/m ; b = 2 m gamma = {b:.4f} kg/s")

# b) media potencia
print("\n=== b) mitad de la potencia ===")
Pmax = F0**2 / (2 * b)
print(f"<P>max = F0^2/(2b) = {Pmax:.4f} W ; mitad = {Pmax/2:.4f} W")
w_menos_aprox = w0 - gamma
w_mas_aprox = w0 + gamma
print(f"aprox. debil: w = w0 -+ gamma = {w_menos_aprox:.4f} o {w_mas_aprox:.4f} s^-1")
raiz = math.sqrt(w0**2 + gamma**2)
w_menos = raiz - gamma
w_mas = raiz + gamma
print(f"exacto: sqrt(w0^2+gamma^2) = {raiz:.5f}; w- = {w_menos:.4f}, w+ = {w_mas:.4f} s^-1")


def P_media(w):
    A = (F0 / m) / math.sqrt((w0**2 - w**2)**2 + (2 * gamma * w)**2)
    return 0.5 * b * w**2 * A**2


for w in (w0, w_menos_aprox, w_mas_aprox, w_menos, w_mas):
    print(f"   <P>({w:.4f}) = {P_media(w):.4f} W  -> fraccion {P_media(w)/Pmax:.4f}")
print(f"ancho de banda 2gamma = {2*gamma:.4f} s^-1 = w0/Q = {w0/Q:.4f}")

# c) estacionario en w0 y luego libre
print("\n=== c) se quita la fuerza en maxima elongacion ===")
A_est = (F0 / m) / (2 * gamma * w0)
print(f"A_est = (F0/m)/(2 gamma w0) = {A_est:.5f} m")
print(f"delta = pi/2 (tg delta = 2 gamma w / (w0^2 - w^2) -> infinito)")
tgd_cerca = 2 * gamma * (w0 - 1e-9) / (w0**2 - (w0 - 1e-9)**2)
print(f"   chequeo tg delta cerca de w0: {tgd_cerca:.3e}")
x0 = A_est
v0 = 0.0
print(f"CI de la libre: x0 = {x0:.4f} m, v0 = {v0}")
C = math.sqrt(x0**2 + ((v0 + gamma * x0) / wp)**2)
phi = math.atan(-(v0 + gamma * x0) / (x0 * wp))
print(f"A = sqrt(x0^2 + ((v0+gamma x0)/w')^2) = {C:.6f} m")
print(f"tg phi0 = -(v0+gamma x0)/(x0 w') = {-(v0+gamma*x0)/(x0*wp):.6f} -> phi0 = {phi:.6f} rad")
print(f"x(t) = {C:.4f} e^(-{gamma:.4f} t) cos({wp:.4f} t {phi:+.4f})  [m, s]")

# verificacion numerica de las condiciones iniciales
def x(t):
    return C * math.exp(-gamma * t) * math.cos(wp * t + phi)


def v(t):
    return C * math.exp(-gamma * t) * (-gamma * math.cos(wp * t + phi) - wp * math.sin(wp * t + phi))


print(f"verif: x(0) = {x(0):.6f} m, v(0) = {v(0):.2e} m/s")
E0 = 0.5 * k * x0**2
print(f"energia al quitar la fuerza: E = 1/2 k x0^2 = {E0:.3f} J")
print(f"energia tras 3 ciclos libres (debe quedar 20,76%): {(0.5*k*x(3*2*math.pi/wp)**2)/E0:.4f}")
print(f"en t = 1 s: x = {x(1):.4f} m")
