# Red 2 (recuperatorio 1/11/2025, ej. 5): espectro continuo 400-1500 nm, red de 2000/cm, a = 2,5 um,
# detector de 50 cm a 50 cm. a) maximo orden completo; b) % del detector con solapamiento.
# Recalcula todos los numeros de Red2.md, con 400 nm (catalogo) y con 450 nm (enunciado original).
import math

d = 1e-2 / 2000           # m
a = 2.5e-6                # m
D = 0.50                  # m
W = 0.50                  # m (ancho del detector)
lmax = 1500e-9

print(f"d = {d*1e6:.2f} um; d/a = {d/a:.2f} -> faltan los ordenes m = 2, 4, 6, ...")
tmax = (W/2) / D
smax = tmax / math.sqrt(1 + tmax**2)
print(f"borde del detector: tg = {tmax:.3f}; theta_max = {math.degrees(math.atan(tmax)):.3f} deg; sen = {smax:.5f}")

def y_de_sen(s):
    return D * s / math.sqrt(1 - s*s)

def resolver(lmin, etiqueta):
    print(f"\n===== {etiqueta}: lambda en [{lmin*1e9:.0f}; 1500] nm =====")
    r0, r1 = lmin/d, lmax/d
    print(f"lambda/d en [{r0:.3f}; {r1:.3f}]")
    ordenes = {}
    for m in range(1, 8):
        s0, s1 = m*r0, m*r1
        falta = (m * a / d) == int(m * a / d) and m % 2 == 0
        if falta:
            print(f"m = {m}: sen en [{s0:.3f}; {s1:.3f}] -> FALTA (m = p d/a)")
            continue
        if s0 >= smax:
            print(f"m = {m}: sen en [{s0:.3f}; {s1:.3f}] -> empieza fuera del detector")
            continue
        top = min(s1, smax)
        completo = s1 <= smax
        lam_corte = top * d / m
        print(f"m = {m}: sen en [{s0:.3f}; {s1:.3f}] -> en el detector de y = {y_de_sen(s0)*100:.3f} a {y_de_sen(top)*100:.3f} cm "
              f"({'completo' if completo else f'cortado: llega hasta lambda = {lam_corte*1e9:.1f} nm'})")
        ordenes[m] = (s0, top)
    # solapamientos entre pares de ordenes presentes
    zonas = []
    ms = sorted(ordenes)
    for i in range(len(ms)):
        for j in range(i+1, len(ms)):
            A0, A1 = ordenes[ms[i]]
            B0, B1 = ordenes[ms[j]]
            lo, hi = max(A0, B0), min(A1, B1)
            if lo < hi:
                zonas.append((lo, hi, ms[i], ms[j]))
    total = 0.0
    for lo, hi, mi, mj in zonas:
        ylo, yhi = y_de_sen(lo), y_de_sen(hi)
        total += yhi - ylo
        print(f"solapan m = {mi} y m = {mj}: sen en [{lo:.4f}; {hi:.4f}] -> y de {ylo*100:.3f} a {yhi*100:.3f} cm, ancho {(yhi-ylo)*100:.3f} cm por lado")
        print(f"     ahi: m = {mi} con lambda de {lo*d/mi*1e9:.1f} a {hi*d/mi*1e9:.1f} nm; m = {mj} con lambda de {lo*d/mj*1e9:.1f} a {hi*d/mj*1e9:.1f} nm")
    completos = [m for m in ordenes if m*r1 <= smax]
    print(f"a) maximo orden completo: m = {max(completos)}")
    print(f"b) solapamiento: {total*100:.3f} cm por lado -> {2*total*100:.3f} cm de {W*100:.0f} cm = {2*total/W*100:.2f} %")
    return 2*total/W

p400 = resolver(400e-9, "Con 400 nm (correccion a mano / catalogo)")
p450 = resolver(450e-9, "Con 450 nm (enunciado impreso)")
print(f"\nm = 5 con 450 nm empezaria en sen = {5*450e-9/d:.3f} > {smax:.4f} -> no llega al detector")

# Trampas
print("\n== Trampas ==")
# 1) olvidar que faltan los pares (400 nm)
s1a, s1b = 0.08, 0.30
s2a, s2b = 0.16, min(0.60, smax)
s3a, s3b = 0.24, smax
# zona cubierta por al menos dos ordenes: [0,16 ; smax]
print(f"(sin ver los faltantes) solapamiento de sen = 0,16 a {smax:.4f}: y de {y_de_sen(0.16)*100:.2f} a 25 cm -> {2*(25-y_de_sen(0.16)*100):.2f} cm = {2*(25-y_de_sen(0.16)*100)/50*100:.1f} %")
# 2) paraxial y = D sen: borde en sen = 0,5
par = (0.30-0.24)*D + (0.50-0.40)*D
print(f"(paraxial y = D mlambda/d, borde en 0,5) solapamiento {par*100:.1f} cm por lado -> {2*par/W*100:.1f} %")
# 3) paraxial pero con el borde bien puesto (sen <= 0,447)
par2 = (0.30-0.24)*D + (smax-0.40)*D
print(f"(paraxial con borde sen = {smax:.4f}) {par2*100:.2f} cm por lado -> {2*par2/W*100:.1f} %")
s5 = 5*450e-9/d
print(f"(450 nm) el orden 5 empezaria en y = {y_de_sen(s5)*100:.2f} cm, apenas afuera del borde (25 cm)")
print(f"(a) si el orden 2 no faltara, se cortaria en lambda = {smax*d/2*1e9:.0f} nm")
