# Red 7 (recuperatorio 2P 21/11/2023, ej. 3): alambre y laser (Babinet).
# Recalcula todos los numeros de Red7.md. Correr con: python -I Red7.py
import sys, os, math
sys.stdout.reconfigure(encoding="utf-8")
sys.path.insert(0, os.path.join(os.environ['TEMP'], 'pylib'))
import numpy as np

lam = 632.8e-9     # m
Lp = 2.65          # m, distancia alambre-pantalla
p = 10             # minimos de decimo orden
D_nom, dD = 0.127e-3, 0.005e-3
casos = [("D minimo", D_nom - dD), ("D nominal", D_nom), ("D maximo", D_nom + dD)]

print(f"p*lambda = {p*lam*1e6:.4f} um ; 2*L*p*lambda = {2*Lp*p*lam:.6e} m^2")
res = {}
for nombre, D in casos:
    sen = p * lam / D
    th = math.asin(sen)
    tg = math.tan(th)
    y = Lp * tg
    s = 2 * y
    s_ap = 2 * Lp * p * lam / D          # aproximacion de angulo chico
    res[nombre] = s
    print(f"{nombre}: D = {D*1e3:.3f} mm ; sen(theta10) = {sen:.6f} ; theta10 = {math.degrees(th):.4f} deg ;"
          f" tg = {tg:.6f} ; y10 = {y*100:.3f} cm ; s = {s*100:.3f} cm ; (angulo chico: {s_ap*100:.3f} cm)")
print(f"\nIntervalo: {res['D maximo']*100:.2f} cm <= s <= {res['D minimo']*100:.2f} cm"
      f"  (ancho {100*(res['D minimo']-res['D maximo']):.2f} cm ; nominal {res['D nominal']*100:.2f} cm)")

# Chequeo numerico: patron de una rendija de ancho D (Babinet), buscar el 10o cero de I(y)
print("\nChequeo: ceros de I = (sen b / b)^2 en la pantalla, b = pi D sen(theta)/lambda")
for nombre, D in casos:
    y = np.linspace(1e-6, 0.16, 1_600_001)
    th = np.arctan(y / Lp)
    b = math.pi * D * np.sin(th) / lam
    I = (np.sin(b) / b) ** 2
    # minimos locales de I
    idx = np.where((I[1:-1] < I[:-2]) & (I[1:-1] < I[2:]))[0] + 1
    y10 = y[idx[p - 1]]
    print(f"{nombre}: primeros ceros (cm) = {[round(float(v)*100, 3) for v in y[idx[:3]]]} ... "
          f"10o cero en y = {y10*100:.3f} cm -> s = {2*y10*100:.3f} cm")
