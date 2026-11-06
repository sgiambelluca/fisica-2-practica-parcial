# Geo 7 (1P 23/4/2022, ej. 4): banco optico, convergente + divergente plano-concava.
# Recalcula todos los numeros de Geo7.md. Correr con: python -I Geo7.py
# Convencion de la catedra: origen en el vertice de cada lente, + en el sentido de la luz
# (hacia la derecha). Lente delgada: 1/s' - 1/s = 1/f'. Aumento A = s'/s. s2 = s1' - D.
import sys
sys.stdout.reconfigure(encoding="utf-8")

def lente(s, fp):
    """imagen s' de una lente delgada (cm). Devuelve inf si salen paralelos."""
    inv = 1 / fp + 1 / s
    return float('inf') if abs(inv) < 1e-12 else 1 / inv

# ---- Datos (cm; las cuentas de opticas se pueden hacer en cm) ----
x_obj, x_L1, x_L2 = 0.0, 60.0, 90.0
f1 = 12.0          # cm, convergente
n2 = 1.5           # indice de la lente 2 (en aire)
x_img = 78.0       # cm, posicion de la imagen que ve el observador
D = x_L2 - x_L1

print("=== a) ===")
s1 = x_obj - x_L1
s1p = lente(s1, f1)
print(f"Lente 1: s1 = {s1:.1f} cm ; 1/s1' = 1/{f1:g} + 1/({s1:g}) = {1/f1 + 1/s1:.5f} -> s1' = {s1p:.4f} cm (x = {x_L1+s1p:.1f} cm)")
s2 = s1p - D
s2p = x_img - x_L2
print(f"D = {D:.0f} cm ; s2 = s1' - D = {s2:.4f} cm (objeto real, en x = {x_L2+s2:.1f}) ; s2' = {s2p:.1f} cm (imagen virtual)")
inv_f2 = 1 / s2p - 1 / s2
f2 = 1 / inv_f2
print(f"1/f2' = 1/s2' - 1/s2 = {1/s2p:.5f} - ({1/s2:.5f}) = {inv_f2:.5f} -> f2' = {f2:.4f} cm (divergente)")
# Fabricante: 1/f' = (n-1)(1/R1 - 1/R2)
# Caso 1: cara esferica hacia la lente 1 -> R1 = R, R2 = inf
R_caso1 = (n2 - 1) * f2
# Caso 2: cara esferica hacia el observador -> R1 = inf, R2 = R
R_caso2 = -(n2 - 1) * f2
print(f"Cara curva hacia la lente 1: R1 = (n-1) f' = {R_caso1:.3f} cm (centro a la izquierda: hueca hacia la luz)")
print(f"Cara curva hacia el observador: R2 = -(n-1) f' = {R_caso2:.3f} cm (centro a la derecha)")
for R1, R2 in ((R_caso1, float('inf')), (float('inf'), R_caso2)):
    inv = (n2 - 1) * ((0 if R1 == float('inf') else 1 / R1) - (0 if R2 == float('inf') else 1 / R2))
    print(f"   chequeo R1={R1:.1f}, R2={R2:.1f}: f' = {1/inv:.3f} cm")
A1 = s1p / s1
A2 = s2p / s2
print(f"(extra) aumentos: A1 = {A1:.4f}, A2 = {A2:.4f}, A = {A1*A2:.4f} -> invertida, {1/abs(A1*A2):.1f} veces menor, virtual")

# chequeo directo: con f2' = -60 la cadena da la imagen en 78 cm
s2p_chk = lente(s2, f2)
print(f"chequeo: con f2' = {f2:.1f}, s2' = {s2p_chk:.4f} -> x = {x_L2+s2p_chk:.3f} cm")

print("\n=== b) ===")
# Salen paralelos de la lente 2 => su objeto en su foco objeto: s2 = -f2' = +60 cm (virtual)
s2_b = -f2
x_obj2 = x_L2 + s2_b
s1p_b = s2_b + D
print(f"s2 = -f2' = {s2_b:.1f} cm (objeto virtual en x = {x_obj2:.0f} cm) -> s1' = s2 + D = {s1p_b:.1f} cm")
inv_f1b = 1 / s1p_b - 1 / s1
f1b = 1 / inv_f1b
print(f"1/f1' = 1/{s1p_b:g} - 1/({s1:g}) = {inv_f1b:.6f} -> f1' = {f1b:.4f} cm")
s_fin = lente(s1p_b - D, f2)
print(f"chequeo: lente 1 con f' = {f1b:.1f} -> s1' = {lente(s1, f1b):.3f}; lente 2 -> s2' = {s_fin} (salen paralelos)")
