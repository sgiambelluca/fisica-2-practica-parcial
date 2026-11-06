# Osc 1 (1P 16/9/2023, ej. 4): pendulo m = 100 g, L = 1,6 m, forzado con omega = 2,496 1/s en resonancia
# de AMPLITUD. En t = 0 esta en su maxima elongacion theta = +0,2 rad y se apaga el motor (queda libre,
# amortiguado). g = 10 m/s^2, pequenas oscilaciones. a) theta(t) desde t = 0; b) t2: segunda vez (despues
# de t = 0) que la velocidad se anula.
# Recalcula todos los numeros de Osc1.md, y el error de la resolucion del PDF (gamma = 0,01).
import math

m = 0.100     # kg
L = 1.6       # m
g = 10.0      # m/s^2
w = 2.496     # 1/s (frecuencia del motor = resonancia de amplitud)
th0 = 0.2     # rad
v0 = 0.0      # rad/s

w0 = math.sqrt(g / L)
print(f"omega0 = sqrt(g/L) = sqrt({g}/{L}) = sqrt({g/L}) = {w0:.4f} 1/s")
print(f"omega_RA^2 = omega0^2 - 2 gamma^2 -> 2 gamma^2 = {w0**2:.6f} - {w**2:.6f} = {w0**2 - w**2:.6f}")
gam2 = (w0**2 - w**2) / 2
gam = math.sqrt(gam2)
print(f"gamma^2 = {gam2:.6f} -> gamma = {gam:.5f} 1/s  (~ 0,1 1/s)")
print(f"(chequeo: con gamma = 0,1 exacto, omega_RA = sqrt(6,25 - 0,02) = {math.sqrt(6.23):.5f} 1/s)")
print(f"gamma < omega0 -> subamortiguado; Q = omega0/(2 gamma) = {w0/(2*gam):.2f}")

wp = math.sqrt(w0**2 - gam2)
print(f"omega' = sqrt(omega0^2 - gamma^2) = sqrt({w0**2} - {gam2:.6f}) = sqrt({w0**2 - gam2:.6f}) = {wp:.5f} 1/s")
print(f"T' = 2 pi / omega' = {2*math.pi/wp:.4f} s")

print("\n=== a) Condiciones iniciales: theta(0) = 0,2 rad, theta'(0) = 0 ===")
A = math.sqrt(th0**2 + ((v0 + gam * th0) / wp) ** 2)
phi = math.atan(-(v0 + gam * th0) / (th0 * wp))
print(f"(v0 + gamma theta0)/omega' = {gam*th0:.5f}/{wp:.4f} = {(v0+gam*th0)/wp:.6f}")
print(f"A = sqrt(theta0^2 + ((v0 + gamma theta0)/omega')^2) = sqrt({th0**2} + {((v0+gam*th0)/wp)**2:.3e}) = {A:.6f} rad")
print(f"tg(phi) = -(v0 + gamma theta0)/(theta0 omega') = -gamma/omega' = {-(gam/wp):.6f} -> phi = {phi:.6f} rad")
print(f"theta(t) = {A:.4f} e^(-{gam:.4f} t) cos({wp:.4f} t {phi:+.4f})  [rad, s]")
print(f"chequeo: theta(0) = {A*math.cos(phi):.6f} rad")

def theta(t):
    return A * math.exp(-gam * t) * math.cos(wp * t + phi)

def vel(t):
    return -A * math.exp(-gam * t) * (gam * math.cos(wp * t + phi) + wp * math.sin(wp * t + phi))

print(f"chequeo: theta'(0) = {vel(0):.2e} rad/s")

print("\n=== b) Velocidad nula: tg(omega' t + phi) = -gamma/omega' = tg(phi) -> omega' t = k pi ===")
for k in range(0, 4):
    t = k * math.pi / wp
    print(f"k = {k}: t = {k} pi/omega' = {t:.4f} s; theta = {theta(t):+.5f} rad; theta' = {vel(t):.1e}")
t2 = 2 * math.pi / wp
print(f"t2 (k = 2) = 2 pi/omega' = T' = {t2:.4f} s")

# Chequeo numerico: cambios de signo de la velocidad despues de t = 0
ceros = []
paso = 1e-4
t = paso
vprev = vel(t)
while t < 4.0 and len(ceros) < 3:
    t += paso
    vv = vel(t)
    if vprev * vv < 0:
        a_, b_ = t - paso, t
        for _ in range(60):
            mm = 0.5 * (a_ + b_)
            if vel(a_) * vel(mm) <= 0:
                b_ = mm
            else:
                a_ = mm
        ceros.append(0.5 * (a_ + b_))
    vprev = vv
print("ceros de la velocidad despues de t = 0 (busqueda numerica):", [round(c, 4) for c in ceros])

print("\n=== Extras para el video ===")
tgd = 2 * gam * w / (w0**2 - w**2)
print(f"Desfasaje del forzado en omega_RA: tg(delta) = 2 gamma omega/(omega0^2 - omega^2) = {tgd:.3f} -> delta = {math.degrees(math.atan(tgd)):.2f} grados = {math.atan(tgd):.4f} rad (casi pi/2)")
print(f"b = 2 m gamma = {2*m*gam:.4f} kg/s (la masa solo hace falta para esto; no entra en theta(t))")
print(f"Amplitud del pendulo en t2: 0,2 e^(-gamma t2) = {th0*math.exp(-gam*t2):.4f} rad; en t1: {th0*math.exp(-gam*math.pi/wp):.4f} rad")
print(f"Forma aproximada (A ~ 0,2, phi ~ 0): theta(t2) = {0.2*math.exp(-0.1*t2)*math.cos(wp*t2):.4f} rad")

print("\n=== Trampas ===")
t2_mal = (2 * math.pi - phi) / wp
print(f"Si se toma 'velocidad nula' como cos(omega' t + phi) = +-1: t = (2 pi - phi)/omega' = {t2_mal:.4f} s "
      f"(en vez de {t2:.4f} s; con amortiguamiento el extremo no coincide con el maximo del coseno)")
print(f"Si se cuenta t = 0 como la primera vez: t = pi/omega' = {math.pi/wp:.4f} s")
print(f"Si se usa omega = 2,496 o omega0 = 2,5 en lugar de omega': t2 = {2*math.pi/w:.4f} s o {2*math.pi/w0:.4f} s")

print("\n=== Curva de resonancia (para animar), amplitud relativa A(omega)/A(0) con gamma = 0,1 ===")
def Arel(x):
    return w0**2 / math.sqrt((w0**2 - x**2) ** 2 + (2 * gam * x) ** 2)
for x in (2.0, 2.3, 2.4, 2.45, w, w0, 2.55, 2.6, 2.7, 3.0):
    print(f"   omega = {x:.3f}: A/A(0) = {Arel(x):.3f}")
print(f"   maximo en omega_RA = {w:.3f}: {Arel(w):.4f}; en omega0 = 2,5: {Arel(w0):.4f} (casi igual: gamma chico)")

print("\n=== Resolucion del PDF (alumno) ===")
gam_mal = (w0**2 - w**2) / 2
print(f"El alumno escribe gamma = sqrt((omega0^2 - omega^2)/2) pero pone {gam_mal:.4f} ~ 0,01: se olvido la raiz (eso es gamma^2)")
wp_mal = math.sqrt(w0**2 - 0.01**2)
print(f"Con gamma = 0,01: omega' = {wp_mal:.5f} (el alumno igual escribe 2,498, que es el de gamma = 0,1); phi = {-math.atan(0.01/2.5):.4f}")
print(f"Su t2 = 2 pi/2,498 = {2*math.pi/2.498:.4f} s coincide (usa el omega' correcto)")
