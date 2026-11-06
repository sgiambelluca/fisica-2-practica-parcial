# Geo 8 (recuperatorio 1P 1C 2022, ej. 2): lente plano-convexa en un tubo que se llena con liquido.
# Recalcula todos los numeros de Geo8.md. Correr con: python -I Geo8.py
# Convencion: + en el sentido de la luz (de afuera hacia la pantalla), origen en cada vertice.
import sys, math
sys.stdout.reconfigure(encoding="utf-8")

nL = 1.6
d_aire = 15.0   # cm, distancia L-P con el tubo vacio (aire)
d_liq = 21.0    # cm, distancia L-P con el tubo lleno de liquido

def dioptra(n1, n2, s, R):
    """n2/s' - n1/s = (n2-n1)/R  -> s'. s = -inf para rayos paralelos; R = inf para cara plana."""
    lhs = (0 if math.isinf(R) else (n2 - n1) / R) + (0 if math.isinf(s) else n1 / s)
    return math.inf if abs(lhs) < 1e-15 else n2 / lhs

print("=== a) tubo vacio ===")
# Rayos paralelos -> imagen en el foco: f' = 15 cm. Plano-convexa: 1/f' = (nL-1)(1/R1 - 1/R2), R2 = inf
R = (nL - 1) * d_aire
print(f"1/f' = (nL-1)/R -> R = (nL-1) f' = {nL-1:.1f} * {d_aire:g} = {R:.3f} cm")
# Chequeo con dos dioptras: cara curva (afuera, aire->vidrio, R1 = +9), cara plana (vidrio->aire)
s1p = dioptra(1.0, nL, -math.inf, +R)
s2p = dioptra(nL, 1.0, s1p, math.inf)
print(f"chequeo 2 dioptras: s1' = {s1p:.3f} cm ; s2' = {s2p:.3f} cm")

print("\n=== b) tubo lleno (liquido solo del lado de la pantalla) ===")
# Lente con medios distintos: n'/s' - n/s = (nL-n)/R1 + (n'-nL)/R2 ; n = 1 (aire), R1 = +R, R2 = inf
# Rayos paralelos (s = -inf): n'/s' = (nL-1)/R -> s' = n' R/(nL-1) = n' f'_aire
n_liq = d_liq * (nL - 1) / R
print(f"n'/s' = (nL-1)/R -> s' = n' R/(nL-1) = n' * {R/(nL-1):g} cm = {d_liq:g} -> n = {n_liq:.4f}")
s1p = dioptra(1.0, nL, -math.inf, +R)
s2p = dioptra(nL, n_liq, s1p, math.inf)
print(f"chequeo 2 dioptras: s1' = {s1p:.3f} cm (dentro del vidrio) ; s2' = n s1'/nL = {s2p:.4f} cm")

print("\n=== Interpretaciones que NO corresponden a la figura (trampas) ===")
# (i) Toda la lente sumergida en el liquido: f' = R/(nL/n - 1) = n R/(nL - n)
n_inm = d_liq * nL / (R + d_liq)
print(f"(i) lente sumergida del todo: 21 = 9n/(1,6-n) -> n = {n_inm:.4f} ; chequeo f' = {R/(nL/n_inm-1):.4f} cm")
# (ii) Cara curva hacia el liquido, plana hacia afuera: R2 = -R (centro hacia el aire)
#      plana aire->vidrio no desvia; curva vidrio->liquido: n/s' = (n - nL)/(-R)
n_ii = n_inm  # misma ecuacion
s_ii = dioptra(nL, n_ii, math.inf, -R)
print(f"(ii) cara curva mojada: n = {n_ii:.4f} (igual que (i)) ; chequeo s' = {s_ii:.4f} cm")
# Otra forma de verlo: el liquido "estira" la distancia en un factor n respecto del aire
print(f"\nfactor 21/15 = {d_liq/d_aire:.4f} = n")
