# Red 1 (intermedio 18/10/2025, ej. 5): red de 800 rendijas/cm, a = 5 um, haz de 7,5 cm, incidencia
# normal, lambdas 450; 520 y 520,02 nm. Pantalla de 65 cm de ancho a 1 m, centrada.
# a) numero maximo de lineas; b) observador a 10 cm de la pantalla, pupila de 4 mm, aprox. paraxial:
# ve resueltas 520 y 520,02 en algun orden?
# Recalcula todos los numeros de Red1.md, con la pantalla tratada de dos formas:
#   - paraxial (la que declara el enunciado): y = D sen(theta) = D m lambda / d
#   - exacta: y = D tg(theta)
import math

K = 800 / 1e-2            # rendijas por metro
d = 1 / K                 # m
a = 5e-6                  # m
W = 7.5e-2                # ancho del haz, m
D = 1.0                   # red-pantalla, m
ancho = 0.65              # m
lams = {"450": 450e-9, "520": 520e-9, "520,02": 520.02e-9}
Lobs = 0.10               # ojo-pantalla, m
Dp = 4e-3                 # pupila, m

N = math.floor(W / d + 1e-9)   # truncar (el +1e-9 evita que 5999,9999 por redondeo de punto flotante quede en 5999)
print(f"d = 1/K = {d*1e6:.2f} um; N = W/d = {W/d:.3f} -> N = {N}")
print(f"d/a = {d/a:.2f} -> faltan m = p*d/a enteros: m = 5, 10, 15 ...")
falta = lambda m: abs((m * a / d) - round(m * a / d)) < 1e-9

ymax = ancho / 2
tg_max = ymax / D
sen_max_exacto = tg_max / math.sqrt(1 + tg_max**2)
print(f"Borde de la pantalla: y = {ymax*100:.1f} cm -> tg(theta_max) = {tg_max:.4f}, theta_max = {math.degrees(math.atan(tg_max)):.3f} grados")
print(f"   exacto: sen(theta_max) = {sen_max_exacto:.5f};  paraxial: sen(theta_max) ~ tg = {tg_max:.4f}")

print("\nsen(theta) = m lambda / d para cada lambda:")
for nom, lam in lams.items():
    print(f"   {nom} nm: lambda/d = {lam/d:.6f};  m_max exacto = {sen_max_exacto/(lam/d):.3f}, paraxial = {tg_max/(lam/d):.3f}")

# Resolucion de 520 y 520,02
dl = lams["520,02"] - lams["520"]
R = lams["520"] / dl
m_res = R / N
print(f"\nResolucion: lambda/dlambda = 520/0,02 = {R:.1f};  m N >= {R:.0f} -> m >= {m_res:.4f} -> m = 5 (falta) -> desde m = 6")
print(f"   con m = 6: mN = {6*N} >= {R:.0f};  con m = 4: mN = {4*N} < {R:.0f}")

# Coincidencias entre 450 y 520
print("\nCoincidencias 450 m1 = 520 m2 (45 m1 = 52 m2) con m <= 9:", [(m1, m2) for m1 in range(1, 10) for m2 in range(1, 10) if 45*m1 == 52*m2])

def contar(modo):
    print(f"\n----- Conteo con la pantalla {modo} -----")
    lado = 0
    for m in range(1, 12):
        if falta(m):
            print(f"m = {m}: falta (minimo de difraccion)")
            continue
        fila = []
        lineas_m = 0
        s450 = m * lams["450"] / d
        s520 = m * lams["520"] / d
        s52002 = m * lams["520,02"] / d
        def y(s):
            if s >= 1:
                return float('inf')
            return D * s if modo == "paraxial" else D * s / math.sqrt(1 - s * s)
        y450, y520, y52002 = y(s450), y(s520), y(s52002)
        if y450 <= ymax:
            lineas_m += 1
            fila.append(f"450 en {y450*100:.2f} cm")
        else:
            fila.append(f"450 afuera ({y450*100:.2f} cm)")
        if y52002 <= ymax:
            if m * N >= R:
                lineas_m += 2
                fila.append(f"520/520,02 en {y520*100:.4f}/{y52002*100:.4f} cm, resueltas (2 lineas)")
            else:
                lineas_m += 1
                fila.append(f"520 y 520,02 en {y520*100:.2f} cm, sin resolver (1 linea)")
        else:
            fila.append(f"520 afuera ({y520*100:.2f} cm)")
        print(f"m = {m}: " + "; ".join(fila) + f"  -> {lineas_m} lineas")
        lado += lineas_m
        if y450 > ymax and y520 > ymax:
            break
    total = 2 * lado + 1
    print(f"Un lado: {lado} lineas -> total = 2*{lado} + 1 (m = 0) = {total}")
    return lado, total

lado_p, tot_p = contar("paraxial")
lado_e, tot_e = contar("exacta")
print(f"\nRESUMEN a): paraxial {tot_p} lineas; exacta (tg) {tot_e} lineas")
print(f"9no orden de 450: sen = {9*lams['450']/d:.4f}; y paraxial = {9*lams['450']/d*100:.2f} cm; "
      f"y exacta = {100*D*math.tan(math.asin(9*lams['450']/d)):.2f} cm (borde en 32,5 cm)")
print(f"8vo orden de 520: sen = {8*lams['520']/d:.4f}; y paraxial = {8*lams['520']/d*100:.2f} cm (afuera en los dos casos)")

print("\n===== b) Ojo a 10 cm de la pantalla =====")
lam = lams["520"]
th_ojo = 1.22 * lam / Dp
s_min = Lobs * th_ojo
print(f"Rayleigh (pupila circular): theta_min = 1,22 lambda/Dp = 1,22*{lam*1e9:.0f}e-9/{Dp:.0e} = {th_ojo:.4e} rad")
print(f"Separacion minima en la pantalla vista desde 10 cm: s_min = L theta_min = {s_min*1e6:.2f} um")
for m in (6, 7):
    dy_par = m * D * dl / d
    s2, s3 = m * lams["520"] / d, m * lams["520,02"] / d
    dy_ex = D * (math.tan(math.asin(s3)) - math.tan(math.asin(s2)))
    print(f"m = {m}: Delta y paraxial = m D dlambda/d = {dy_par*1e6:.2f} um (alfa = {dy_par/Lobs:.3e} rad); "
          f"exacta = {dy_ex*1e6:.2f} um (alfa = {dy_ex/Lobs:.3e} rad) -> {'resuelve' if dy_par >= s_min else 'NO resuelve'}")
m_nec = 1.22 * lam * d * Lobs / (Dp * D * dl)
print(f"Orden necesario: m >= 1,22 lambda d L / (Dp D dlambda) = {m_nec:.3f} -> m = 10, que falta y ademas cae fuera "
      f"(sen = {10*lam/d:.3f} > {tg_max})")
print(f"Lineas que ve el observador (pares de m = +-6 y +-7 se le juntan): paraxial {tot_p - 4}, exacta {tot_e - 4}")
