# Geo 2 (1P 16/9/2023, ej. 1): cubo de vidrio con reflector y agua; rapidez de la luz en el vidrio.
# Recalcula todos los numeros de Geo2.md.
import math

n_agua = 1.33
thL = 48.0                # grados
c = 3e8                   # m/s
c_exacta = 299792458.0

s = math.sin(math.radians(thL))
n_v = n_agua / s
v = c / n_v
print(f"sen 48 = {s:.5f}")
print(f"n_vidrio = 1,33 / sen 48 = {n_v:.5f}")
print(f"v = c / n_v = c sen48 / n_agua = {v:.4e} m/s  (con c exacta: {c_exacta/n_v:.4e} m/s)")
print(f"v / c = {v/c:.4f}")
print(f"(alumno) 3e8 / 1,79 = {3e8/1.79:.4e}; 3e8 / 1,78 = {3e8/1.78:.4e}")

# Chequeo geometrico: rayo que forma theta con el reflector (horizontal); la cara del agua es vertical.
for th in (30, 47.9, 48, 48.1, 60):
    # direccion del rayo reflejado: (cos th, sen th); normal de la cara vertical: (1, 0)
    inc = math.degrees(math.acos(math.cos(math.radians(th))))
    arg = n_v * math.sin(math.radians(inc)) / n_agua
    estado = "reflexion total" if arg >= 1 - 1e-12 else f"refracta, sale a {math.degrees(math.asin(arg)):.1f} deg"
    print(f"theta = {th:5.1f} deg -> incidencia en la cara del agua = {inc:5.1f} deg -> {estado}")

# Trampa: tomar 48 deg como angulo desde la normal del reflector -> incidencia en la cara = 42 deg
n_mal = n_agua / math.sin(math.radians(90 - thL))
print(f"(trampa) si se usa 90-48 = 42 deg: n = {n_mal:.4f}, v = {c/n_mal:.4e} m/s; pero entonces habria reflexion total para theta <= 48, no >= 48")
# Lambda en el vidrio para una luz de ejemplo (no se pide)
print(f"(extra) 600 nm en vacio -> {600/n_v:.1f} nm en el vidrio; la frecuencia no cambia")
