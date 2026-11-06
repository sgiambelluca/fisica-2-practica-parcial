# DR 3 (2P 11/11/2023, ej. 1): doble rendija sumergida, incidencia oblicua, lamina + gota de aire.
# Recalcula todos los numeros de DR3.md. Correr con el python del repo y -I.
# Convencion: rendija 1 (superior) en y = +d/2, rendija 2 (inferior) en y = -d/2; angulos + antihorarios.
# DeltaCO = CO(inferior) - CO(superior) = n d sen(th) - n_i d sen(th_i) + [extras inferior] - [extras superior]
import math, os, sys
sys.path.insert(0, os.path.join(os.environ['TEMP'], 'pylib'))
import numpy as np

nL = 1.2          # liquido (incidente y entre placa y pantalla)
a, d = 2.25, 6.0  # um
lam0 = 0.600      # um
e, n = 4.0, 1.5   # lamina sobre la rendija superior
D_gota = 3 * e    # gota de aire (n = 1) sobre la rendija inferior
I0 = 1.0          # W/m^2

print("=== Caminos opticos extra ===")
lam_extra = e * (n - nL)
gota_extra = D_gota * (1 - nL)
print(f"lamina (superior): e (n - nL) = {e} * {n - nL:.1f} = {lam_extra:+.2f} um")
print(f"gota (inferior): 3e (1 - nL) = {D_gota} * {1 - nL:.1f} = {gota_extra:+.2f} um")
neto = lam_extra - gota_extra
print(f"la superior queda atrasada {neto:.2f} um = {neto/lam0:.1f} lambda0 respecto de la inferior")
print(f"sin inclinar, el orden 0 se correria {neto/lam0:.0f} franjas hacia la rendija superior")

print("\n=== Angulo de incidencia ===")
# DeltaCO(0) = - nL d sen(alfa) + gota_extra - lam_extra = 0
s_alfa = (gota_extra - lam_extra) / (nL * d)
alfa = math.degrees(math.asin(s_alfa))
print(f"-nL d sen(alfa) + 3e(1-nL) - e(n-nL) = 0 -> sen(alfa) = ({gota_extra:+.2f} {-lam_extra:+.2f})/({nL}*{d}) = {s_alfa:.4f}")
print(f"alfa = {alfa:.2f} grados (negativo = horario: el haz baja y llega primero a la rendija superior)")

print("\n=== Intensidad en el centro ===")
DCO = nL * d * 0 - nL * d * s_alfa + gota_extra - lam_extra
gam = math.pi * DCO / lam0
beta = math.pi * a / lam0 * (nL * 0 - nL * s_alfa)
print(f"DeltaCO(0) = {DCO:.2e} um -> gamma = {gam:.2e} -> cos^2 = {math.cos(gam)**2:.4f}")
print(f"beta = (pi a/lam0)(nL sen0 - nL sen alfa) = pi*{a}/{lam0}*{-nL*s_alfa:.2f} = {beta:.4f} = {beta/math.pi:.3f} pi")
env = (math.sin(beta) / beta) ** 2
print(f"sen(beta) = {math.sin(beta):.4f} ; (sen b / b)^2 = {env:.6f} (= 8/(81 pi^2) = {8/(81*math.pi**2):.6f})")
I = 4 * I0 * math.cos(gam) ** 2 * env
print(f"I(centro) = 4 I0 cos^2(gamma) (sen b/b)^2 = {I:.5f} W/m^2")
print(f"comparacion: maximo absoluto 4 I0 = {4*I0} W/m^2 -> el centro tiene {100*I/(4*I0):.2f} %")
print("trampas:")
print(f"  lamina con (n-1) y gota ignorada: sen(alfa) = {-e*(n-1)/(nL*d):.4f}")
s_mal2 = (D_gota * (1 - nL) - e * (n - 1)) / (nL * d)
print(f"  lamina con (n-1) en vez de (n-nL): sen(alfa) = {s_mal2:.4f} -> alfa = {math.degrees(math.asin(s_mal2)):.2f}")
s_mal4 = (-gota_extra - lam_extra) / (nL * d)
print(f"  gota con el signo cambiado, 3e(nL-1): sen(alfa) = {s_mal4:.4f} -> alfa = {math.degrees(math.asin(s_mal4)):.2f}")
s_mal5 = (e * (1 - nL) - lam_extra) / (nL * d)
print(f"  gota de espesor e en vez de 3e: sen(alfa) = {s_mal5:.4f} -> alfa = {math.degrees(math.asin(s_mal5)):.2f}")
s_mal3 = (gota_extra - lam_extra) / d
print(f"  olvidar nL en d sen(alfa): sen(alfa) = {s_mal3:.4f} -> alfa = {math.degrees(math.asin(s_mal3)):.2f}")
b_mal = math.pi * a / lam0 * (-s_alfa)
print(f"  olvidar nL en beta: beta = {b_mal/math.pi:.3f} pi -> I = {4*(math.sin(b_mal)/b_mal)**2:.4f} W/m^2")
print(f"  usar beta = 0 en el centro (incidencia normal): I = {4*I0:.0f} W/m^2")

print("\n=== Verificacion numerica: suma de campos sobre las rendijas ===")
k0 = 2 * math.pi / lam0
def I_theta(th_deg, alfa_deg, N=4001):
    sa, st = math.sin(math.radians(alfa_deg)), math.sin(math.radians(th_deg))
    E = 0
    for yc, extra in [(+d/2, lam_extra), (-d/2, gota_extra)]:
        y = np.linspace(yc - a/2, yc + a/2, N)
        # fase: llegada de la onda plana oblicua (k0 nL y sen alfa) + salida hacia theta (-k0 nL y sen th) + lamina/gota
        ph = k0 * (nL * y * sa - nL * y * st + extra)
        E += np.trapezoid(np.exp(1j * ph), y) / a if hasattr(np, "trapezoid") else np.trapz(np.exp(1j * ph), y) / a
    return I0 * abs(E) ** 2
print(f"I(theta=0) con alfa = {alfa:.1f}: {I_theta(0, alfa):.5f} W/m^2")
print(f"I(theta=alfa) (direccion del haz): {I_theta(alfa, alfa):.4f} W/m^2  (envolvente 1)")
# ubicar el maximo de interferencia mas cercano al centro: debe ser theta = 0
ths = np.linspace(-3, 3, 6001)
# solo interferencia: fase relativa entre rendijas
fase = [k0 * (nL * d * math.sin(math.radians(t)) - nL * d * s_alfa + gota_extra - lam_extra) for t in ths]
i0 = int(np.argmin([abs(f) for f in fase]))
print(f"orden 0 (DeltaCO = 0) en theta = {ths[i0]:.4f} grados")
print(f"en el centro la envolvente esta en beta = {beta/math.pi:.2f} pi: entre el 2do cero (2 pi) y el 3ro (3 pi), 2do lobulo lateral")
print(f"con alfa = +30 (signo opuesto): DeltaCO(0) = {(-nL*d*0.5 + gota_extra - lam_extra):.2f} um = {(-nL*d*0.5 + gota_extra - lam_extra)/lam0:.0f} lambda0 -> en el centro cae el orden -12, no el 0")
