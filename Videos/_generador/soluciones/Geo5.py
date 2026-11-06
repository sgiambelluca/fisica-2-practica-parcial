# Geo 5 (1P 20/4/2024, ej. 1): cubo que se vacía, disco negro flotante, se oscurece -> n.
# Verifica todos los números de Geo5.md.
import sys, os, math
sys.path.insert(0, os.path.join(os.environ['TEMP'], 'pylib'))
import numpy as np
sys.stdout.reconfigure(encoding='utf-8')

a = 0.80          # m, arista
D_disco = 0.56    # m
Qv = 32e-3        # m^3/s (32 dm^3/s)
t = 8.0           # s

R = D_disco/2
V0 = a**3
Vd = Qv*t
area = a**2
dh = Vd/area
h = a - dh
print(f"V0 = {V0:.4f} m^3 ; desagotado = {Vd:.4f} m^3 = {Vd*1000:.0f} dm^3")
print(f"área de la base = {area:.4f} m^2 ; baja dh = {dh:.4f} m ; h = {h:.4f} m")
print(f"radio del disco = {R:.3f} m")

tgL = R/h
thL = math.degrees(math.atan(tgL))
senL = R/math.hypot(R, h)
n = 1/senL
print(f"tg(thL) = r/h = {tgL:.4f} ; thL = {thL:.3f} grados ; sen(thL) = {senL:.5f}")
print(f"n = 1/sen(thL) = sqrt(h^2+r^2)/r = {n:.5f} ; sqrt(149)/7 = {math.sqrt(149)/7:.5f}")
print(f"hipotenusa sqrt(h^2+r^2) = {math.hypot(R, h):.5f} m")

# chequeo: radio del círculo de luz a lo largo del vaciado
print("\nradio del círculo de luz r(h) = h tg(thL) mientras se vacía:")
for tt in (0, 2, 4, 6, 8):
    hh = a - Qv*tt/area
    print(f"  t = {tt} s: h = {hh:.3f} m, r = {hh*tgL:.3f} m ({'sale luz por el anillo' if hh*tgL > R + 1e-12 else 'tapado por el disco'})")
print(f"en t = 0: r = {a*tgL:.3f} m > a/2 = {a/2:.2f} m (al principio el círculo llega a las paredes); "
      f"esquinas a {a/2*math.sqrt(2):.3f} m del centro")
# en qué instante se oscurecería con este n (chequeo inverso)
h_osc = R/tgL
print(f"chequeo inverso: se oscurece cuando h = R/tg(thL) = {h_osc:.3f} m -> t = {(a-h_osc)*area/Qv:.2f} s")

# trampas
n_diam = math.hypot(D_disco, h)/D_disco
print(f"\ntrampa (diámetro en vez de radio): n = {n_diam:.4f}")
n_h80 = math.hypot(R, a)/R
print(f"trampa (h = 80 cm, sin vaciar): n = {n_h80:.4f}")
n_tg = 1/tgL
print(f"trampa (sen = r/h en vez de tg): sen = 0,7 -> n = {1/0.7:.4f}")
