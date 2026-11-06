# Geo 3 (1P 16/9/2023, ej. 2): convergente con imagen derecha; espejo concavo para ver dos imagenes en el mismo lugar.
# Recalcula todos los numeros de Geo3.md. Correr con el python del repo y -I.
# Convencion de la catedra: origen en el vertice, + en el sentido de la luz incidente.
# Lente 1/s' - 1/s = 1/f', A = s'/s. Espejo 1/s' + 1/s = 2/R, A = -s'/s, concavo R < 0.
import math

x_obj, x_obs = 50.0, 100.0   # cm
f = 30.0                     # cm, convergente
dist = 40.0                  # imagen a 40 cm del objeto
R_abs = 20.0                 # cm, espejo concavo

print("=== a) Posicion de la lente ===")
print("Imagen derecha con una sola lente convergente y objeto real -> virtual, del lado del objeto y mas lejos:")
x_img = x_obj - dist
print(f"imagen en x = {x_obj} - {dist} = {x_img} cm")
# s = x_obj - xL, s' = x_img - xL ; 1/s' - 1/s = 1/f -> (s - s')/(s s') = 1/f -> dist*f = (xL - x_img)(xL - x_obj)
# xL^2 - (x_img + x_obj) xL + x_img x_obj - dist f = 0
bq = -(x_img + x_obj); cq = x_img * x_obj - dist * f
disc = bq**2 - 4 * cq
r1 = (-bq + math.sqrt(disc)) / 2; r2 = (-bq - math.sqrt(disc)) / 2
print(f"(xL - {x_img})(xL - {x_obj}) = {dist}*{f} -> xL^2 - {-bq:.0f} xL + {x_img*x_obj:.0f} - {dist*f:.0f} = 0 -> xL^2 - 60 xL - 700 = 0")
print(f"raices: xL = {r1:.1f} cm y xL = {r2:.1f} cm (descartada: queda a la izquierda del objeto, fuera del camino al observador)")
xL = r1
s = x_obj - xL; sp = x_img - xL
print(f"s = {s} cm, s' = {sp} cm ; chequeo 1/s' - 1/s = {1/sp - 1/s:.6f} = 1/f' = {1/f:.6f}")
A1 = sp / s
print(f"A = s'/s = {A1:.2f} (derecha, triple, virtual porque s' < 0)")
print("con la variable s (como el alumno): 1/(s-40) - 1/s = 1/30 -> s^2 - 40 s - 1200 = 0")
d2 = 40**2 + 4 * 1200
print(f"   s = {(40+math.sqrt(d2))/2:.0f} (objeto real exige s<0: descartada) o s = {(40-math.sqrt(d2))/2:.0f} cm")
# otra opcion: imagen a la derecha del objeto (x = 90)
print("chequeo de la otra posicion de imagen (x = 90 cm): (xL-90)(xL-50) = -1200 ->", end=" ")
bq2, cq2 = -(90 + 50), 90 * 50 + 1200
disc2 = bq2**2 - 4 * cq2
print(f"discriminante = {disc2:.0f} < 0: sin solucion" if disc2 < 0 else f"disc = {disc2}")

print("\n=== b) Espejo concavo ===")
R = -R_abs
print("La lente forma una sola imagen de cada 'objeto'; para que las dos imagenes coincidan, la imagen del espejo")
print("tiene que caer sobre el objeto -> s' = s -> 2/s = 2/R -> s = R")
s_e = R
sp_e = 1 / (2 / R - 1 / s_e)
A_e = -sp_e / s_e
print(f"s = R = {s_e} cm -> s' = {sp_e:.1f} cm (delante del espejo: real) ; A_esp = -s'/s = {A_e:+.0f}")
x_e = x_obj - abs(s_e)
print(f"espejo en x = {x_obj} - {abs(s_e)} = {x_e} cm, con la cara concava hacia la lente")
# luego la luz va hacia +x; nuevo eje + hacia +x; imagen del espejo en +20 desde el espejo
D = xL - x_e
s2 = abs(sp_e) - D
sp2 = 1 / (1 / f + 1 / s2)
A2 = sp2 / s2
print(f"vuelta: + hacia la luz reflejada; imagen del espejo a +{abs(sp_e):.0f} cm del espejo; D = {D:.0f} cm")
print(f"s2 = s1' - D = {abs(sp_e):.0f} - {D:.0f} = {s2:.0f} cm -> s2' = {sp2:.1f} cm ; A_lente = {A2:.0f}")
print(f"imagen final en x = {xL + sp2:.0f} cm ; A_total = A_esp * A_lente = {A_e*A2:+.0f} (invertida, triple)")
print(f"imagen directa: x = {xL + sp:.0f} cm, A = {A1:+.0f} (derecha, triple)")
# solucion trivial s = 0
print("solucion trivial del 2/s = 2/R: s -> 0 (objeto pegado al espejo): no sirve fisicamente")

print("\n=== Verificacion con matrices ABCD (paraxial) ===")
def T(d): return [[1, d], [0, 1]]
def Lf(fl): return [[1, 0], [-1 / fl, 1]]
def mul(P, Q): return [[P[0][0]*Q[0][0] + P[0][1]*Q[1][0], P[0][0]*Q[0][1] + P[0][1]*Q[1][1]],
                       [P[1][0]*Q[0][0] + P[1][1]*Q[1][0], P[1][0]*Q[0][1] + P[1][1]*Q[1][1]]]
def imagen(M):
    # despues del sistema, propagar z: B + z D = 0 -> z = -B/D ; aumento = A + z C
    z = -M[0][1] / M[1][1]
    return z, M[0][0] + z * M[1][0]
# camino directo: objeto -> 20 cm -> lente
M = mul(Lf(f), T(xL - x_obj))
z, mag = imagen(M)
print(f"directo: imagen a z = {z:.1f} cm de la lente (x = {xL + z:.1f}), aumento {mag:+.2f}")
# camino por el espejo (desplegado): objeto -> 20 -> espejo (f = |R|/2) -> 20 -> pasa por x=50 -> 20 -> lente
M = mul(Lf(f), mul(T(D), mul(Lf(R_abs / 2), T(x_obj - x_e))))
z, mag = imagen(M)
print(f"por el espejo: imagen a z = {z:.1f} cm de la lente (x = {xL + z:.1f}), aumento {mag:+.2f}")
M = mul(T(x_obj - x_e), mul(Lf(R_abs / 2), T(x_obj - x_e)))
print(f"solo espejo, de x=50 a x=50: B = {M[0][1]:.2e} (imagen ahi), aumento = {M[0][0]:+.2f}")
# trampa: espejo a 10 cm del objeto (objeto en el foco del espejo, x_e = 40)
xe2 = x_obj - R_abs / 2
Mesp = mul(Lf(R_abs / 2), T(x_obj - xe2))
M = mul(Lf(f), mul(T(xL - xe2), Mesp))
z, mag = imagen(M)
print(f"trampa, espejo en x = {xe2:.0f}: D del espejo = {Mesp[1][1]:.1e} (salen paralelos);"
      f" la lente forma la imagen a z = {z:.1f} cm, x = {xL + z:.0f} cm (sobre el observador), no en x = 10")
