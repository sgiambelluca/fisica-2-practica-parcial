# Osc 6 (recuperatorio 1P 1C 2022, ej. 4): objeto colgado en un fluido que se rompe y pierde el 80% de su masa.
# Recalcula todos los numeros de Osc6.md.
import os, sys, math
sys.path.insert(0, os.path.join(os.environ['TEMP'], 'pylib'))
import numpy as np

M = 0.2        # kg (masa original)
k = 25.0       # N/m
L_ini = 0.28   # m (largo del resorte en equilibrio con M)
b = 0.55       # kg/s
g = 10.0       # m/s^2
frac_queda = 0.20

print("== Equilibrios ==")
est_M = M * g / k
L0 = L_ini - est_M
m = frac_queda * M
est_m = m * g / k
L_eq = L0 + est_m
print(f"estiramiento con M: Mg/k = {est_M*100:.3f} cm -> largo natural L0 = {L0*100:.3f} cm")
print(f"masa que queda m = {m:.3f} kg ({m*1000:.0f} g)")
print(f"estiramiento con m: mg/k = {est_m*100:.3f} cm -> nuevo equilibrio L_eq = {L_eq*100:.3f} cm")

print("\n== Condiciones iniciales (origen en L_eq, + hacia abajo) ==")
x0 = L_ini - L_eq
v0 = 0.0
print(f"x0 = {x0*100:.3f} cm, v0 = {v0}")

print("\n== Parametros ==")
w0 = math.sqrt(k / m)
gam = b / (2 * m)
wp = math.sqrt(w0**2 - gam**2)
Q = w0 / (2 * gam)
print(f"w0 = sqrt(k/m) = {w0:.4f} s^-1")
print(f"gamma = b/(2m) = {gam:.4f} s^-1  (gamma < w0 -> subamortiguado)")
print(f"gamma^2 = {gam**2:.4f}; w0^2 - gamma^2 = {w0**2 - gam**2:.4f}")
print(f"w' = {wp:.4f} s^-1")
print(f"Q = w0/(2 gamma) = {Q:.4f}")

print("\n== Constantes A y phi ==")
tanphi = -(v0 + gam * x0) / (x0 * wp)
phi = math.atan(tanphi)
A = x0 / math.cos(phi)
A2 = math.sqrt(x0**2 + ((v0 + gam * x0) / wp)**2)
print(f"tan(phi) = -gamma/w' = {tanphi:.5f} -> phi = {phi:.5f} rad ({math.degrees(phi):.3f} grados)")
print(f"A = x0/cos(phi) = {A*100:.4f} cm; con la formula de la raiz: {A2*100:.4f} cm")
print(f"(v0+gamma x0)/w' = {(gam*x0/wp)*100:.4f} cm")
print(f"x(t) = {A*100:.3f} cm * exp(-{gam:.3f} t) * cos({wp:.3f} t {phi:+.4f})")

# chequeo numerico: x(0) y v(0)
def x(t):
    return A * np.exp(-gam * t) * np.cos(wp * t + phi)
def v(t):
    return A * np.exp(-gam * t) * (-gam * np.cos(wp * t + phi) - wp * np.sin(wp * t + phi))
print(f"chequeo: x(0) = {x(0)*100:.4f} cm, v(0) = {v(0):.2e} m/s")

print("\n== b) Despues de una oscilacion ==")
Tp = 2 * math.pi / wp
fac = math.exp(-gam * Tp)
xT = x(Tp)
print(f"T' = 2pi/w' = {Tp:.5f} s; gamma T' = {gam*Tp:.5f}")
print(f"e^(-gamma T') = {fac:.5f}")
print(f"x(T') = x0 e^(-gamma T') = {x0*fac*100:.4f} cm (numerico {xT*100:.4f} cm); v(T') = {v(Tp):.2e} m/s")
print(f"largo del resorte = {L_eq*100:.3f} + {xT*100:.4f} = {(L_eq + xT)*100:.3f} cm")
E0 = 0.5 * k * x0**2
ET = 0.5 * k * xT**2 + 0.5 * m * v(Tp)**2
print(f"E(0) = 1/2 k x0^2 = {E0*1000:.4f} mJ; E(T') = {ET*1000:.4f} mJ")
print(f"E(T')/E(0) = e^(-2 gamma T') = {math.exp(-2*gam*Tp):.5f} (numerico {ET/E0:.5f})")
print(f"fraccion de energia perdida = {(1 - ET/E0)*100:.3f} %")

print("\n== Trampas ==")
# usar el periodo sin amortiguar
T0 = 2 * math.pi / w0
print(f"(trampa) con T0 = 2pi/w0 = {T0:.5f} s: x(T0) = {x(T0)*100:.4f} cm (no es un ciclo)")
# quedarse con 80% de la masa
m_mal = 0.8 * M
w0m = math.sqrt(k / m_mal); gm = b / (2 * m_mal); wpm = math.sqrt(w0m**2 - gm**2)
Leq_mal = L0 + m_mal * g / k
print(f"(trampa) si quedara el 80% (0,16 kg): L_eq = {Leq_mal*100:.2f} cm, x0 = {(L_ini-Leq_mal)*100:.2f} cm, gamma = {gm:.4f}, w' = {wpm:.4f}")
# envolvente en t = T'/2 (para la animacion)
print(f"(animacion) e^(-gamma T'/2) = {math.exp(-gam*Tp/2):.4f}; primer minimo x(T'/2) = {x(Tp/2)*100:.4f} cm -> largo {(L_eq + x(Tp/2))*100:.3f} cm")
