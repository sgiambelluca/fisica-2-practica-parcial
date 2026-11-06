# Geo 9 (recuperatorio 7/6/2025, ej. 4): telescopio con lente y espejo.
# Recalcula todos los numeros de Geo9.md. Correr con: python -I Geo9.py
# Convencion: + en el sentido de la luz que llega a cada elemento. Lente: 1/s' - 1/s = 1/f'.
# Espejo: 1/s' + 1/s = 2/R, concavo R < 0, convexo R > 0; imagen real del espejo: s' < 0.
import sys, math
sys.stdout.reconfigure(encoding="utf-8")

L = 5.0      # m, largo del tubo (lente-espejo)
f = 8.0      # m
n = 1.5

def espejo(s, R):
    inv = 2 / R - 1 / s
    return math.inf if abs(inv) < 1e-15 else 1 / inv

print("=== Lente ===")
# Biconvexa simetrica: R1 = +r, R2 = -r -> 1/f' = (n-1) * 2/r
r = (n - 1) * 2 * f
print(f"1/f' = (n-1)(1/r + 1/r) -> r = 2 (n-1) f' = {r:.3f} m")
s1p = f  # objeto en el infinito -> imagen en el foco
s_m = s1p - L
print(f"estrellas -> s1' = f' = {s1p:g} m ; s_espejo = s1' - L = {s_m:g} m (objeto virtual, detras del espejo)")

print("\n=== a) imagen real a d = |R|/4 del espejo: s' = -|R|/4 ===")
# -4/|R| + 1/s = 2/R
# concavo R = -|R|: -4/|R| + 1/3 = -2/|R| -> 1/3 = 2/|R|
Rabs_conc = 2 * s_m
# convexo R = +|R|: -4/|R| + 1/3 = 2/|R| -> 1/3 = 6/|R|
Rabs_conv = 6 * s_m
sol = {"concavo": -Rabs_conc, "convexo": +Rabs_conv}
for tipo, R in sol.items():
    sp = espejo(s_m, R)
    print(f"{tipo}: R = {R:+.3f} m ; foco R/2 = {R/2:+.2f} m ; s' = {sp:+.4f} m (|R|/4 = {abs(R)/4:.4f}) ;"
          f" imagen a {abs(sp):.2f} m delante del espejo = {L-abs(sp):.2f} m de la lente ; A_espejo = {-sp/s_m:+.3f}")

print("\n=== b) emergen paralelos del espejo: objeto del espejo en su foco, s = R/2 ===")
for tipo, R in sol.items():
    s_needed = R / 2
    fpp = L + s_needed          # la lente tiene que formar su imagen ahi
    n_new = 1 + r / (2 * fpp)   # 1/f'' = (n'-1) 2/r
    print(f"{tipo}: s = R/2 = {s_needed:+.2f} m -> imagen de la lente a {fpp:.2f} m -> f'' = {fpp:.3f} m ->"
          f" n' = 1 + r/(2 f'') = {n_new:.4f}")
    # chequeo
    s_chk = fpp - L
    print(f"      chequeo: espejo con s = {s_chk:+.2f} -> s' = {espejo(s_chk, R)}")
print(f"n' convexo exacto = 9/7 = {9/7:.4f}")

print("\n=== Otra lectura (descartada): d medido desde la lente ===")
# s' = -(L - |R|/4)
# concavo: -1/(L - |R|/4) + 1/3 = -2/|R|  -> |R|^2 - 2|R| - 120 = 0
a, b, c = 1, -2, -120
Rc = (-b + math.sqrt(b*b - 4*a*c)) / 2
print(f"concavo: |R|^2 - 2|R| - 120 = 0 -> |R| = {Rc:.3f} m ; chequeo s' = {espejo(s_m, -Rc):.4f} (L - |R|/4 = {L-Rc/4:.4f})")
# convexo: -1/(L - R/4) + 1/3 = 2/R -> R^2 - 14 R + 120 = 0
disc = 14**2 - 4*120
print(f"convexo: R^2 - 14R + 120 = 0 -> discriminante = {disc} < 0, sin solucion")
fpp = L + (-Rc) / 2
print(f"b) con R = -{Rc:g}: haria falta f'' = {fpp:g} m (divergente) con caras biconvexas -> n' = {1 + r/(2*fpp):.1f}: imposible")
