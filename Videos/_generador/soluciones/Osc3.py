# Osc 3 (1P 23/4/2022, ej. 1): amortiguado + forzado; se apaga el motor -> libre amortiguado.
# Recalcula todos los numeros de Osc3.md. Correr con el python del repo y -I.
import math

m, k = 12.0, 3070.0          # kg, N/m
perdida = 0.593              # fraccion de energia disipada por ciclo
F0, w = 15.0, 19.0           # N, rad/s
v0 = 0.157                   # m/s en el instante en que se apaga el motor

print("=== a) Factor de calidad ===")
w0 = math.sqrt(k / m)
print(f"w0 = sqrt(k/m) = sqrt({k/m:.4f}) = {w0:.4f} rad/s")
queda = 1 - perdida
print(f"queda por ciclo: {queda:.3f} = e^(-2 gamma T')")
gT = -math.log(queda) / 2
print(f"2 gamma T' = -ln({queda}) = {2*gT:.5f}  ->  gamma T' = {gT:.5f}")
r = gT / (2 * math.pi)
print(f"gamma/w' = gamma T'/(2 pi) = {r:.5f}")
g = r * w0 / math.sqrt(1 + r**2)
wp = math.sqrt(w0**2 - g**2)
print(f"gamma = {r:.5f} w0 / sqrt(1 + {r:.5f}^2) = {g:.4f} 1/s")
print(f"w' = sqrt(w0^2 - gamma^2) = {wp:.4f} rad/s ;  T' = 2pi/w' = {2*math.pi/wp:.4f} s")
Q = w0 / (2 * g)
print(f"Q = w0/(2 gamma) = {w0:.4f}/{2*g:.4f} = {Q:.3f}")
# chequeo con la formula de la hoja: gamma T' = pi / sqrt(Q^2 - 1/4)
Q2 = math.sqrt((math.pi / gT) ** 2 + 0.25)
print(f"chequeo: Q = sqrt((pi/(gamma T'))^2 + 1/4) = {Q2:.3f}")
b = 2 * m * g
print(f"b = 2 m gamma = {b:.3f} kg/s ; tau_E = 1/(2 gamma) = {1/(2*g):.3f} s ; 1/gamma = {1/g:.3f} s")
# con Q = 7 exacto, cuanto se disipa por ciclo
gT7 = math.pi / math.sqrt(49 - 0.25)
print(f"si Q = 7 exacto: se disipa {100*(1-math.exp(-2*gT7)):.2f} % por ciclo")
print("trampas:")
print(f"  aproximacion 2pi/Q = 0,593 -> Q = {2*math.pi/0.593:.2f} (mal: solo vale con Q >> 1)")
gA = -math.log(queda) / (2 * math.pi)  # si se usa e^(-gamma T') = 0,407 (amplitud)
gA = gA * w0 / math.sqrt(1 + gA**2)
print(f"  usar e^(-gamma T') = 0,407 (amplitud) -> Q = {w0/(2*gA):.2f} (mal)")

print("\n=== b) Estado estacionario forzado ===")
den = math.sqrt((w0**2 - w**2) ** 2 + (2 * g * w) ** 2)
A = (F0 / m) / den
print(f"w0^2 - w^2 = {w0**2:.3f} - {w**2:.0f} = {w0**2 - w**2:.3f} ; 2 gamma w = {2*g*w:.3f}")
print(f"raiz = {den:.3f} ; F0/m = {F0/m:.4f} ; A = {A:.6f} m = {100*A:.3f} cm")
delta = math.atan2(2 * g * w, w0**2 - w**2)
print(f"tg delta = {2*g*w/(w0**2-w**2):.4f} -> delta = {delta:.4f} rad = {math.degrees(delta):.2f} grados")
vmax = A * w
print(f"v_max = A w = {vmax:.4f} m/s ; v0/v_max = {v0/vmax:.4f}")
vw = v0 / w
print(f"v0/w = {vw:.6f} m")
x0 = math.sqrt(A**2 - vw**2)
print(f"x0 = +sqrt(A^2 - (v0/w)^2) = sqrt({A**2:.4e} - {vw**2:.4e}) = {x0:.6f} m = {100*x0:.3f} cm")
psi = math.atan2(-v0 / (A * w), x0 / A)
print(f"fase del forzado al apagar: cos psi = {x0/A:.4f}, sen psi = {-v0/(A*w):.4f} -> psi = {psi:.4f} rad")

def libre(x0, v0):
    C = -(v0 + g * x0) / wp      # = A' sen(phi)
    Ap = math.hypot(x0, C)
    phi = math.atan2(C, x0)
    return Ap, phi, C

print("\n=== b) Libre amortiguado desde t = 0 ===")
Ap, phi, C = libre(x0, v0)
print(f"v0 + gamma x0 = {v0:.3f} + {g:.4f}*{x0:.6f} = {v0 + g*x0:.6f} m/s")
print(f"A' sen phi = -(v0 + gamma x0)/w' = {C:.6f} m ; A' cos phi = x0 = {x0:.6f} m")
print(f"A' = {Ap:.6f} m = {100*Ap:.3f} cm ; tg phi = {C/x0:.4f} ; phi = {phi:.4f} rad = {math.degrees(phi):.2f} grados")
print(f"RESULTADO: x(t) = {100*Ap:.2f} cm e^(-{g:.2f} t) cos({wp:.2f} t {phi:+.2f})  [cm, s]")
# chequeo derivando
xf = lambda t: Ap * math.exp(-g * t) * math.cos(wp * t + phi)
h = 1e-6
print(f"chequeo: x(0) = {xf(0):.6f} m, x'(0) = {(xf(h)-xf(-h))/(2*h):.5f} m/s")
print(f"amplitud tras un ciclo: {100*Ap*math.exp(-g*2*math.pi/wp):.3f} cm (factor {math.exp(-g*2*math.pi/wp):.4f} = sqrt(0,407))")
print(f"trampa: olvidar gamma x0 -> A' = sqrt(x0^2 + (v0/w')^2) = {100*math.hypot(x0, v0/wp):.3f} cm (mal)")
print(f"trampa: usar w = 19 en la libre -> A' = sqrt(x0^2 + (v0/w)^2) = {100*A:.3f} cm (es la del forzado, mal)")
print(f"estiramiento estatico mg/k = {12*9.8/k*100:.2f} cm (g = 9,8) -> el resorte siempre esta estirado respecto de su largo natural")

print("\n--- interpretacion alternativa: x0 < 0 (resorte mas corto que en el equilibrio) ---")
Ap2, phi2, C2 = libre(-x0, v0)
print(f"x0 = {-x0:.6f} m -> A' = {100*Ap2:.3f} cm, phi = {phi2:.4f} rad")

print("\n=== Simulacion numerica (RK4) para verificar todo b) ===")
def acc(x, v, t, forzado):
    F = F0 * math.cos(w * t) if forzado else 0.0
    return (-k * x - b * v + F) / m

def rk4(x, v, t, dt, forzado):
    a1 = acc(x, v, t, forzado); k1x, k1v = v, a1
    a2 = acc(x + dt/2*k1x, v + dt/2*k1v, t + dt/2, forzado); k2x, k2v = v + dt/2*k1v, a2
    a3 = acc(x + dt/2*k2x, v + dt/2*k2v, t + dt/2, forzado); k3x, k3v = v + dt/2*k2v, a3
    a4 = acc(x + dt*k3x, v + dt*k3v, t + dt, forzado); k4x, k4v = v + dt*k3v, a4
    return x + dt/6*(k1x+2*k2x+2*k3x+k4x), v + dt/6*(k1v+2*k2v+2*k3v+k4v)

dt = 1e-5
x, v, t = 0.0, 0.0, 0.0
while t < 25.0:              # el transitorio decae como e^(-1,14 t): a los 25 s ya no queda nada
    x, v = rk4(x, v, t, dt, True); t += dt
amp = 0.0; tt = t
xs, vs = x, v
while tt < t + 2*math.pi/w:
    xs, vs = rk4(xs, vs, tt, dt, True); tt += dt
    amp = max(amp, abs(xs))
print(f"amplitud estacionaria simulada = {100*amp:.4f} cm (formula {100*A:.4f} cm)")
# buscar el instante con v = +0,157 subiendo... con x > 0
prev = (x, v, t)
while True:
    xn, vn = rk4(prev[0], prev[1], prev[2], dt, True)
    tn = prev[2] + dt
    if (prev[1] - v0) * (vn - v0) <= 0 and xn > 0:
        break
    prev = (xn, vn, tn)
print(f"instante de apagado (sim): x = {100*xn:.4f} cm, v = {vn:.5f} m/s")
# libre desde ahi
xs, vs, ts = xn, vn, 0.0
errmax = 0.0
while ts < 3.0:
    xs, vs = rk4(xs, vs, ts, dt, False); ts += dt
    errmax = max(errmax, abs(xs - xf(ts)))
print(f"error maximo entre la libre simulada y la formula en 3 s: {1000*errmax:.4f} mm")
