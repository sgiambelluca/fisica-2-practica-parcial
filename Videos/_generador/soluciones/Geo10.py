# Geo 10 (1P 24/9/2015, ej. 4): rayo que entra por la cara superior de un cubo; n maximo
# para que NO haya reflexion total en la cara lateral.
# Recalcula todos los numeros de Geo10.md. Correr con: python -I Geo10.py
import sys, os, math
sys.stdout.reconfigure(encoding="utf-8")
sys.path.insert(0, os.path.join(os.environ['TEMP'], 'pylib'))
import numpy as np

deg = math.degrees
rad = math.radians
ang_sup = 60.0              # angulo entre el rayo y la cara superior (figura)
th1 = 90.0 - ang_sup        # angulo de incidencia (con la normal)
print(f"angulo con la superficie = {ang_sup:g} deg -> incidencia theta1 = {th1:g} deg ; sen(theta1) = {math.sin(rad(th1)):.4f}")

# Condicion limite: sen(theta_lat) = cos(theta2) = 1/n, con sen(theta2) = sen(theta1)/n
# -> 1 - sen^2(theta1)/n^2 = 1/n^2 -> n^2 = 1 + sen^2(theta1)
n_max = math.sqrt(1 + math.sin(rad(th1))**2)
print(f"n_max = sqrt(1 + sen^2 theta1) = sqrt({1 + math.sin(rad(th1))**2:.4f}) = {n_max:.4f}  (= sqrt(5)/2 = {math.sqrt(5)/2:.4f})")
th2 = deg(math.asin(math.sin(rad(th1)) / n_max))
th_lat = 90 - th2
thL = deg(math.asin(1 / n_max))
print(f"con n = n_max: theta2 = {th2:.3f} deg ; incidencia en la cara lateral = 90 - theta2 = {th_lat:.3f} deg ;"
      f" angulo limite = {thL:.3f} deg (coinciden)")

def hay_RT(n, th1_deg):
    t2 = math.asin(math.sin(rad(th1_deg)) / n)
    tlat = math.pi / 2 - t2
    return n * math.sin(tlat) >= 1      # Snell en la cara lateral: n sen(tlat) = sen(salida) > 1 => RT

print("\nBarrido:")
for nn in (1.05, 1.10, 1.11, 1.118, 1.12, 1.20, 1.30, 1.414, 1.5):
    t2 = math.asin(math.sin(rad(th1)) / nn)
    tlat = 90 - deg(t2)
    s_out = nn * math.sin(rad(tlat))
    out = f"sale a {deg(math.asin(s_out)):.2f} deg" if s_out < 1 else "reflexion total"
    print(f"  n = {nn:.3f}: theta2 = {deg(t2):6.3f} ; incidencia lateral = {tlat:6.3f} ; n sen = {s_out:.4f} -> {out}")
ns = np.linspace(1.0001, 2, 200000)
borde = ns[np.argmax([hay_RT(x, th1) for x in ns])]
print(f"primer n con reflexion total (barrido numerico) = {borde:.4f}")

print("\nTrampa: tomar 60 deg como angulo de incidencia")
n_mal = math.sqrt(1 + math.sin(rad(60))**2)
print(f"n_max = sqrt(1 + sen^2 60) = {n_mal:.4f}")
print(f"\nPara cualquier angulo de entrada (theta1 -> 90): n_max -> sqrt(2) = {math.sqrt(2):.4f};"
      f" con n > sqrt(2) siempre hay reflexion total en la cara lateral")
