# DR 6 (recuperatorio 2P 21/11/2023, ej. 1): tres rendijas en un liquido, la central tapada, dos laminas;
# luego se destapa la central y se cuentan los minimos en la pantalla.
# Recalcula todos los numeros de DR6.md. Longitudes en micrometros salvo aviso.
import os, sys, math
sys.path.insert(0, os.path.join(os.environ['TEMP'], 'pylib'))
import numpy as np

n = 1.32
a = 2.0          # um
d = 8.0          # um (entre rendijas vecinas)
lam0 = 0.6       # um
e1, n1 = 4.0, 1.5
n2 = 1.2
W, D = 30.0, 65.0  # cm (ancho de la pantalla y distancia)

print("== a) Espesor e2 ==")
d_ab = 2 * d
print(f"rendijas abiertas: las de los extremos -> doble rendija de separacion 2d = {d_ab:.0f} um")
c1 = e1 * (n1 - n)
print(f"lamina 1 agrega e1 (n1 - n) = {e1} * {n1 - n:.2f} = {c1:.3f} um = {c1/lam0:.3f} lambda0")
print(f"lamina 2 agrega e2 (n2 - n) = e2 * ({n2 - n:+.2f})  (negativo: n2 < n)")
e2 = c1 / (n - n2)
print(f"en la MISMA rendija: {c1:.2f} - {n - n2:.2f} e2 = 0 -> e2 = {e2:.3f} um")
print(f"en la otra rendija: Delta CO = {c1:.2f} - ({n2-n:+.2f} e2) = {c1:.2f} + {n-n2:.2f} e2 > 0 -> nunca se anula")
# corrimiento con la lamina 1 sola (para la animacion)
sin1 = c1 / (n * d_ab)
y1 = D * math.tan(math.asin(sin1))
print(f"(animacion) con la lamina 1 sola el orden 0 va a n(2d) sen(theta) = {c1:.2f} um -> sen = {sin1:.5f}, y = {y1:.3f} cm (hacia el lado de la lamina)")
dy = lam0 * D / (n * d_ab)
print(f"(animacion) interfranja de la doble rendija de 2d: lambda0 D/(n 2d) = {dy:.3f} cm; corrimiento = {c1/lam0:.2f} franjas")

print("\n== b) Tres rendijas destapadas, sin laminas ==")
tan_max = (W / 2) / D
th_max = math.atan(tan_max)
s_max = math.sin(th_max)
print(f"borde de la pantalla: tg = {W/2:.0f}/{D:.0f} = {tan_max:.5f} -> theta = {math.degrees(th_max):.3f} grados, sen = {s_max:.5f}")
q_max = n * d * s_max / lam0
print(f"Delta CO entre vecinas en el borde: n d sen / lambda0 = {q_max:.4f} lambda0")
print(f"d/a = {d/a:.0f} -> faltan los principales m = 4, 8, ...; primer minimo de difraccion en Delta CO = {d/a:.0f} lambda0")
s_dif = lam0 / (n * a)
y_dif = D * math.tan(math.asin(s_dif))
print(f"primer minimo de difraccion: n a sen = lambda0 -> sen = {s_dif:.5f} > {s_max:.5f}; y = {y_dif:.3f} cm > {W/2:.0f} cm (afuera)")
print("minimos de N = 3: Delta CO = p lambda0 / 3, p no multiplo de 3")
ps = [p for p in range(1, 40) if p % 3 != 0 and p / 3 < q_max]
print(f"p posibles (p/3 < {q_max:.4f}): {ps} -> {len(ps)} por lado, total {2*len(ps)}")
print("posiciones (lado +):")
for p in ps:
    s = (p / 3) * lam0 / (n * d)
    print(f"   p = {p:2d}: Delta CO = {p/3:.4f} lambda0, sen = {s:.5f}, y = {D*math.tan(math.asin(s)):.3f} cm")
for m in range(0, 4):
    s = m * lam0 / (n * d)
    b_ = math.pi * (a / d) * m
    env = 1.0 if m == 0 else (math.sin(b_) / b_)**2
    print(f"   principal m = {m}: sen = {s:.5f}, y = {D*math.tan(math.asin(s)):.3f} cm, beta = {m}pi/4, I = 9 I0 * {env:.4f} = {9*env:.3f} I0")

# conteo numerico de ceros de I(theta) en la pantalla
th = np.linspace(-th_max, th_max, 2_000_001)
st = np.sin(th)
gam = math.pi * n * d * st / lam0
bet = math.pi * n * a * st / lam0
with np.errstate(divide='ignore', invalid='ignore'):
    inter = np.where(np.abs(np.sin(gam)) < 1e-12, 9.0, (np.sin(3 * gam) / np.sin(gam))**2)
    dif = np.where(np.abs(bet) < 1e-12, 1.0, (np.sin(bet) / bet)**2)
I = inter * dif
# minimos locales con I muy chico
loc = np.where((I[1:-1] < I[:-2]) & (I[1:-1] < I[2:]) & (I[1:-1] < 1e-6))[0] + 1
print(f"chequeo numerico: ceros de I en la pantalla = {len(loc)}; I en el borde = {I[-1]:.4f} (I max = 9 I0)")

print("\n== Variante paraxial (y = D sen theta o y = D theta) ==")
s_par = (W / 2) / D
q_par = n * d * s_par / lam0
print(f"sen_max ~ 15/65 = {s_par:.5f} -> Delta CO max = {q_par:.4f} lambda0 (> 4)")
print(f"minimo de difraccion: y = D sen = {D*s_dif:.3f} cm; y = D theta = {D*math.asin(s_dif):.3f} cm (los dos < 15 cm: entra)")
ps_par = [p for p in range(1, 40) if p % 3 != 0 and p / 3 < q_par]
print(f"interferencia: {len(ps_par)} por lado + el minimo de difraccion en Delta CO = 4 lambda0 -> {len(ps_par)+1} por lado, total {2*(len(ps_par)+1)}")

print("\n== Trampas ==")
c1_aire = e1 * (n1 - 1)
e2_aire_otra = c1_aire / (n2 - 1)
print(f"(trampa) con n_l - 1 (como en aire): lamina 1 = {c1_aire:.2f} um; lamina 2 en la otra rendija: {c1_aire:.2f} = {n2-1:.2f} e2 -> e2 = {e2_aire_otra:.1f} um (mal)")
q_sin_n = d * s_max / lam0
ps_sin_n = [p for p in range(1, 40) if p % 3 != 0 and p / 3 < q_sin_n]
print(f"(trampa) sin el n del liquido en b): Delta CO max = {q_sin_n:.4f} lambda0 -> {len(ps_sin_n)} por lado, total {2*len(ps_sin_n)} (mal)")
