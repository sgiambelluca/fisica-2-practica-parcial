# DR 1 (intermedio 18/10/2025, ej. 4): doble rendija a = 6 um, d = 36 um, lambda0 = 600 nm,
# incidencia oblicua i = 30 grados (en aire).
# 1ra parte: lamina n = 1,5 de espesor e detras de una rendija -> orden 0 en el centro C.
# 2da parte: otra lamina n' = 1,1 (espesor e') detras de una rendija + liquido nL = 1,4 entre placa
# y pantalla -> el orden 0 sigue en C. Pide e, e' e I(C) en cada parte, con I0 = 1.
# Recalcula todos los numeros de DR1.md.
# Convencion (apunte de la catedra): rendija 1 arriba, rendija 2 abajo; el haz viene de abajo, asi que
# llega primero a la 2 y el rayo de la 1 recorre d*sen(i) de mas antes de la placa.
# DeltaCO = CO(2) - CO(1) = n d sen(theta) - ni d sen(i) + sum_2 e(nl - n) - sum_1 e(nl - n)
import math

a = 6e-6
d = 36e-6
lam0 = 600e-9
i = math.radians(30)
ni = 1.0
n_lam1 = 1.5
n_lam2 = 1.1
nL = 1.4
I0 = 1.0

def um(x):
    return x * 1e6

def intensidad(dco, beta):
    gam = math.pi * dco / lam0
    env = 1.0 if beta == 0 else (math.sin(beta) / beta) ** 2
    return 4 * I0 * math.cos(gam) ** 2 * env, gam, env

print(f"d/a = {d/a:.0f}  (faltarian los ordenes m = 6, 12, ... con incidencia normal)")
extra = ni * d * math.sin(i)
print(f"Camino extra antes de la placa: ni d sen i = 1 * 36 um * 0,5 = {um(extra):.3f} um "
      f"= {extra/lam0:.1f} lambda0")

print("\n===== 1ra parte (todo en aire) =====")
# Lamina en la rendija 2 (la que el haz alcanza primero): suma e(1,5 - 1) al camino de la 2.
e = extra / (n_lam1 - 1.0)
print(f"Lamina en la rendija a la que llega primero el haz: e(n - 1) = d sen i -> e = {um(extra):.1f}/{n_lam1-1:.1f} = {um(e):.3f} um")
dco_C1 = 1.0 * d * 0 - ni * d * math.sin(i) + e * (n_lam1 - 1.0)
beta1 = math.pi * a / lam0 * (1.0 * 0 - ni * math.sin(i))
I1, g1, env1 = intensidad(dco_C1, beta1)
print(f"En C (theta = 0): DeltaCO = 0 - {um(extra):.1f} + {um(e*(n_lam1-1)):.1f} = {um(dco_C1):.3e} um -> gamma = {g1:.3e}, cos^2 = {math.cos(g1)**2:.4f}")
print(f"beta = (pi a/lambda0)(n sen0 - ni sen i) = pi*{a/lam0:.0f}*(-0,5) = {beta1/math.pi:.3f} pi -> sen(beta) = {math.sin(beta1):.2e}")
print(f"I(C) = 4 I0 cos^2(gamma) (sen beta/beta)^2 = {I1:.3e}  (= 0: el orden 0 cae en el 5to minimo de difraccion)")
th_env1 = math.degrees(math.asin(ni * math.sin(i) / 1.0))
print(f"Centro de la campana de difraccion: n sen(theta) = ni sen i -> theta = {th_env1:.2f} grados")
# si la lamina se pusiera en la otra rendija:
dco_mal = -extra - e * (n_lam1 - 1.0)
print(f"(Si la lamina fuera en la otra rendija: DeltaCO(C) = {um(dco_mal):.1f} um = {dco_mal/lam0:.0f} lambda0 -> el orden 0 se iria mas lejos)")

print("\n===== 2da parte (liquido nL = 1,4 entre placa y pantalla) =====")
c1 = e * (n_lam1 - nL)
print(f"Lamina 1 ahora en liquido: e(1,5 - 1,4) = {um(e):.0f} * {n_lam1-nL:.1f} = {um(c1):.3f} um (antes 18 um)")
print(f"Sin la lamina 2: DeltaCO(C) = -{um(extra):.1f} + {um(c1):.1f} = {um(-extra + c1):.3f} um -> el orden 0 se iria de C")
c2_por_um = n_lam2 - nL
print(f"Lamina 2: aporta e'(n' - nL) = e'({n_lam2} - {nL}) = {c2_por_um:.1f} e' a SU rendija (resta camino)")
# Opcion A: lamina 2 en la rendija 1 (la que el haz alcanza ultima) -> entra con signo menos.
eprima = (extra - c1) / (-(n_lam2 - nL))
print(f"Opcion A, lamina 2 en la otra rendija (la 1): -{um(extra):.1f} + {um(c1):.1f} - e'({c2_por_um:.1f}) = 0 -> e' = {um(extra-c1):.1f}/{-c2_por_um:.1f} = {um(eprima):.3f} um")
eprima_B = (extra - c1) / (n_lam2 - nL)
print(f"Opcion B, lamina 2 en la misma rendija que la 1: -{um(extra):.1f} + {um(c1):.1f} + e'({c2_por_um:.1f}) = 0 -> e' = {um(eprima_B):.1f} um < 0 (imposible)")
dco_C2 = nL * d * 0 - ni * d * math.sin(i) + c1 - eprima * (n_lam2 - nL)
beta2 = math.pi * a / lam0 * (nL * 0 - ni * math.sin(i))
I2, g2, env2 = intensidad(dco_C2, beta2)
print(f"En C: DeltaCO = {um(dco_C2):.2e} um -> cos^2(gamma) = {math.cos(g2)**2:.4f}")
print(f"beta = (pi a/lambda0)(nL sen0 - ni sen i) = {beta2/math.pi:.3f} pi -> I(C) = {I2:.3e}")
th_env2 = math.degrees(math.asin(ni * math.sin(i) / nL))
print(f"Centro de la campana: nL sen(theta) = sen 30 -> sen(theta) = {math.sin(i)/nL:.4f}, theta = {th_env2:.2f} grados")

print("\n===== Lectura alternativa (I0 como intensidad de cada rendija en theta = 0) =====")
print(f"I(C) = 4 I0 cos^2(gamma) = {4*I0*math.cos(g1)**2:.1f} en las dos partes (ignora la difraccion; no es lo que hace la catedra)")

print("\n===== Datos para las animaciones =====")
# Patron alrededor de C en cada parte: posiciones angulares de algunos maximos de interferencia y minimos de difraccion
for parte, n, dco_lam in (("1ra", 1.0, 0.0), ("2da", nL, 0.0)):
    print(f"{parte} parte (n = {n}):")
    for p in range(3, 8):
        s = (p * lam0 / a + ni * math.sin(i)) / n
        s2 = (-p * lam0 / a + ni * math.sin(i)) / n
        txt = []
        for val in (s2, s):
            txt.append(f"{math.degrees(math.asin(val)):.2f}" if abs(val) <= 1 else "no existe")
        print(f"   minimos de difraccion p = -{p}/+{p}: theta = {txt[0]} / {txt[1]} grados")
    # interfranja angular cerca de C
    dth = lam0 / (n * d)
    print(f"   interfranja angular cerca de C: lambda0/(n d) = {dth:.4f} rad = {math.degrees(dth):.3f} grados")
