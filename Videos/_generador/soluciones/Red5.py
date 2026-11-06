# Red 5 (2P 26/6/2023, ej. 2): detector golpeado y corrido 10 cm, registra 10 líneas -> rango de lambda2.
# Verifica todos los números de Red5.md.
import sys, os, math
sys.path.insert(0, os.path.join(os.environ['TEMP'], 'pylib'))
import numpy as np
sys.stdout.reconfigure(encoding='utf-8')

K = 100e3          # rendijas por metro (100/mm)
d = 1/K            # m
a = d/4
W = 6e-3           # m
lam1 = 450e-9      # m
Dd = 1.0           # m (distancia red-detector)
y_sup, y_inf = 0.30, -0.10    # detector de 40 cm corrido 10 cm: de -10 a +30 cm

N = W/d
print(f"d = {d*1e6:.2f} um ; a = {a*1e6:.3f} um ; d/a = {d/a:.0f} -> faltan m = 4, 8, ...")
print(f"N = W/d = {N:.1f}")

# --- posiciones de las líneas de lambda1
print("\nposiciones de lambda1 (y = D tgθ):")
for m in range(0, 8):
    s = m*lam1/d
    y = Dd*math.tan(math.asin(s))
    falta = (m % 4 == 0 and m != 0)
    print(f"  m = {m}: senθ = {s:.4f}, y = {y*100:.2f} cm{'  (falta)' if falta else ''}")

def m_max(yb):
    s = abs(yb)/math.hypot(yb, Dd)
    return s, s*d/lam1
s_sup, mm_sup = m_max(y_sup)
s_inf, mm_inf = m_max(y_inf)
print(f"\nborde +30 cm: senθ = {s_sup:.5f} -> m <= {mm_sup:.3f}")
print(f"borde -10 cm: senθ = {s_inf:.5f} -> m <= {mm_inf:.3f}")

lado_sup = [m for m in range(1, int(mm_sup)+1) if m % 4 != 0]
lado_inf = [m for m in range(1, int(mm_inf)+1) if m % 4 != 0]
print(f"órdenes en el lado +: {lado_sup} ; en el lado -: {lado_inf}")
base = 1 + len(lado_sup) + len(lado_inf)
print(f"líneas si ningún orden se resuelve: 1 + {len(lado_sup)} + {len(lado_inf)} = {base}")
print(f"faltan {10-base} líneas -> exactamente 2 órdenes resueltos: los dos más altos (+5 y +6)")

# --- condición de resolución: m N >= lambda/dlambda
for m in (3, 5, 6):
    print(f"  m = {m}: mN = {m*N:.0f} ; dlambda_min = lambda1/(mN) = {lam1/(m*N)*1e9:.4f} nm ; "
          f"lambda2 <= {lam1*(1-1/(m*N))*1e9:.4f} nm (con lambda1) / {lam1*m*N/(m*N+1)*1e9:.4f} nm (con lambda2)")
lo = lam1*(1-1/(3*N)); hi = lam1*(1-1/(5*N))
print(f"\nresultado: {lo*1e9:.3f} nm < lambda2 <= {hi*1e9:.3f} nm  (0,15 nm <= dlambda < 0,25 nm)")

# --- chequeo por fuerza bruta: contar líneas para cada lambda2
def contar(lam2, contar_centro=True):
    lineas = 1 if contar_centro else 0
    for lado, (ylim) in ((+1, y_sup), (-1, y_inf)):
        for m in range(1, 30):
            if m % 4 == 0:
                continue
            ys = []
            for lam in (lam1, lam2):
                s = m*lam/d
                if s >= 1:
                    continue
                y = lado*Dd*math.tan(math.asin(s))
                if y_inf <= y <= y_sup:
                    ys.append(lam)
            if not ys:
                continue
            if len(ys) == 2:
                resuelto = m*N >= ((lam1+lam2)/2)/(lam1-lam2) - 1e-9
                lineas += 2 if resuelto else 1
            else:
                lineas += 1
    return lineas

lams = np.round(np.arange(449.500, 449.9999, 0.0005), 4)*1e-9
cuentas = np.array([contar(l) for l in lams])
ok = lams[cuentas == 10]
print(f"\nfuerza bruta (resolución con lambda media, paso 0,0005 nm): 10 líneas para lambda2 entre "
      f"{ok.min()*1e9:.4f} y {ok.max()*1e9:.4f} nm")
for l in (449.70, 449.75, 449.76, 449.80, 449.85, 449.86, 449.875, 449.90):
    print(f"  lambda2 = {l} nm -> {contar(l*1e-9)} líneas")
# interpretación alternativa: no contar la línea central
ok2 = lams[np.array([contar(l, False) for l in lams]) == 10]
print(f"\nsi no se contara la línea central: 10 líneas para lambda2 entre "
      f"{ok2.min()*1e9:.4f} y {ok2.max()*1e9:.4f} nm")
print(f"  (corresponde a 2N < lambda/dlambda <= 3N: {lam1*(1-1/(2*N))*1e9:.3f} < lambda2 <= {lam1*(1-1/(3*N))*1e9:.3f} nm)")
# cantidad de líneas según dlambda (umbrales lambda1/(mN))
print("\nlíneas según dlambda = lambda1 - lambda2:")
for dl in (0.10, 0.13, 0.20, 0.30, 0.50, 0.80):
    print(f"  dlambda = {dl:.2f} nm -> {contar((450-dl)*1e-9)} líneas")
print("  umbrales: " + ", ".join(f"m={m}: {450/(m*N):.3f} nm" for m in (6, 5, 3, 2, 1)))
# versión 2P 2024 1C (sin 'lambda2 ~ lambda1'): para que entre m = 7 de lambda2 en +30 cm
print(f"\n(2P 2024) m = 7 de lambda2 entra si lambda2 <= senθmax d / 7 = {s_sup*d/7*1e9:.1f} nm")

# detector centrado (antes del golpe), por curiosidad
s_c = 0.20/math.hypot(0.20, 1)
print(f"\ndetector centrado (±20 cm): senθ = {s_c:.4f} -> m <= {s_c*d/lam1:.2f}")
# trampa: y = D senθ (en vez de tg) en el borde de +30 cm
print(f"trampa (y = D senθ): senθmax = 0,30 -> m <= {0.30*d/lam1:.2f}")
