# Geo 6 (recuperatorio 1P 18/6/2024, ej. 2): sistema delgado de dos piezas (n1 = 1,2 a la izquierda, n2 = 1,5 biconvexa)
# en aire; objeto a 20 cm; R para que los haces emerjan paralelos.
# Recalcula todos los numeros de Geo6.md. Distancias en cm, + en el sentido de la luz (hacia la derecha).
import math

n_aire, n1, n2 = 1.0, 1.2, 1.5
Rmod = 20.0     # cm, |R| de las interfases curvas
s_obj = -20.0   # cm (objeto real a 20 cm a la izquierda)

def imagen(n, np_, s, R):
    """Dioptra n -> n' : n'/s' - n/s = (n'-n)/R. Devuelve s' (inf si n'/s' = 0)."""
    rhs = (np_ - n) / R + n / s
    return math.inf if abs(rhs) < 1e-12 else np_ / rhs

def potencia(n, np_, R):
    return 0.0 if math.isinf(R) else (np_ - n) / R

print("== Signos de las interfases curvas (figura) ==")
R2 = +Rmod   # n1|n2: la elipse se abomba hacia la izquierda, centro a la derecha
R3 = -Rmod   # n2|aire: se abomba hacia la derecha, centro a la izquierda
print(f"R2 (n1 -> n2) = {R2:+.1f} cm; R3 (n2 -> aire) = {R3:+.1f} cm")
P2 = potencia(n1, n2, R2)
P3 = potencia(n2, n_aire, R3)
print(f"(n2-n1)/R2 = {P2:.4f} cm^-1; (1-n2)/R3 = {P3:.4f} cm^-1")
P_bicx = (n2 - 1) * (1 / R2 - 1 / R3)
print(f"biconvexa n2 sola: (n2-1)(1/R2 - 1/R3) = {P_bicx:.4f} cm^-1 -> f' = {1/P_bicx:.2f} cm")
P_need = -1 / s_obj
print(f"para que salgan paralelos: 1/s' = 0 -> potencia total = -1/s = {P_need:.4f} cm^-1 (f' = {1/P_need:.1f} cm)")

print("\n== Interpretacion principal (B): R es la cara izquierda (aire -> n1) ==")
# hacia atras desde el infinito
s3 = -n2 / P3          # 1/inf - n2/s3 = P3  -> s3 = -n2/P3
print(f"ultima dioptra: 0 - {n2}/s3 = {P3:.4f} -> s3 = {s3:.3f} cm  (= s2')")
s2 = n1 / (n2 / s3 - P2)  # n2/s2' - n1/s2 = P2 -> n1/s2 = n2/s2' - P2
print(f"dioptra n1|n2: {n2}/({s3:.1f}) - {n1}/s2 = {P2:.4f} -> s2 = {s2:.3f} cm  (= s1')")
P1 = n1 / s2 - n_aire / s_obj
R1 = (n1 - n_aire) / P1
print(f"primera dioptra: {n1}/({s2:.1f}) - 1/({s_obj:.0f}) = {n1/s2:.4f} + {-1/s_obj:.4f} = {P1:.4f} = 0,2/R1 -> R1 = {R1:+.3f} cm")
print("chequeo hacia adelante:")
s1p = imagen(n_aire, n1, s_obj, R1); print(f"  s1' = {s1p:.3f} cm")
s2p = imagen(n1, n2, s1p, R2); print(f"  s2' = {s2p:.3f} cm")
s3p = imagen(n2, n_aire, s2p, R3); print(f"  s3' = {s3p}")
print(f"suma de potencias: {potencia(1,n1,R1):.4f} + {P2:.4f} + {P3:.4f} = {potencia(1,n1,R1)+P2+P3:.4f} cm^-1")
P_men = (n1 - 1) * (1 / R1 - 1 / R2)
print(f"pieza n1 (menisco R1 = R2 = +20): (n1-1)(1/R1 - 1/R2) = {abs(P_men):.4f} -> potencia nula")
print("con la cara izquierda plana (R1 = inf):")
s1p_pl = imagen(n_aire, n1, s_obj, math.inf); s2p_pl = imagen(n1, n2, s1p_pl, R2); s3p_pl = imagen(n2, n_aire, s2p_pl, R3)
print(f"  s1' = {s1p_pl:.3f}, s2' = {s2p_pl:.3f}, s3' = {s3p_pl:.3f} cm (imagen virtual, no salen paralelos)")
print(f"  potencia = {P2+P3:.4f} cm^-1 -> f' = {1/(P2+P3):.2f} cm")
print("con R1 = -20 (concava):")
print(f"  potencia = {potencia(1,n1,-20)+P2+P3:.4f} cm^-1 -> f' = {1/(potencia(1,n1,-20)+P2+P3):.2f} cm")
# variante D1: las dos caras externas con el mismo |R| desconocido (R1 = +R, R3 = -R)
R_D1 = ((n1 - 1) + (n2 - 1)) / (P_need - P2)
print(f"variante: caras externas con el mismo |R| (R1 = +R, R3 = -R): 0,7/R = {P_need - P2:.4f} -> R = {R_D1:.3f} cm")

print("\n== Interpretacion alternativa (A): cara izquierda plana, R es la cara derecha (n2 -> aire) ==")
s1p = imagen(n_aire, n1, s_obj, math.inf)
print(f"plana: {n1}/s1' = 1/s = {1/s_obj:.4f} -> s1' = {s1p:.3f} cm")
s2p = imagen(n1, n2, s1p, R2)
print(f"n1|n2: {n2}/s2' = {P2:.4f} + {n1}/({s1p:.1f}) = {P2 + n1/s1p:.4f} -> s2' = {s2p:.4f} cm")
R3A = (n_aire - n2) / (0 - n2 / s2p)
print(f"ultima: 0 - {n2}/({s2p:.3f}) = {-n2/s2p:.4f} = -0,5/R -> R = {R3A:+.4f} cm  (|R| = {abs(R3A):.2f} cm)")
print(f"chequeo: s3' = {imagen(n2, n_aire, s2p, R3A)}")
print(f"suma de potencias: {P2:.4f} + {potencia(n2,1,R3A):.4f} = {P2 + potencia(n2,1,R3A):.4f}")

print("\n== Para la animacion: imagen final segun la cara izquierda ==")
for R1x, nom in [(math.inf, 'plana'), (20.0, 'R1 = +20'), (-20.0, 'R1 = -20')]:
    a_ = imagen(n_aire, n1, s_obj, R1x); b_ = imagen(n1, n2, a_, R2); c_ = imagen(n2, n_aire, b_, R3)
    c_txt = 'inf' if math.isinf(c_) else f"{c_:.3f}"
    print(f"  {nom}: s1' = {a_:.3f}, s2' = {b_:.3f}, s3' = {c_txt} cm")
