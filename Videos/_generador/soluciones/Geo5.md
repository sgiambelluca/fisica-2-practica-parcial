# Geo 5 · Reflexión total: disco flotante y válvula de descarga

Fuente: 1P del 20/4/2024, ejercicio 1. El PDF trae la resolución de un alumno. Verificado con `Geo5.py`.

## 1. Datos y qué se pide

**Datos**

| Dato | Valor | En SI |
|---|---|---|
| Recipiente cúbico, abierto arriba, lleno al ras | arista 80 cm | a = 0,80 m |
| Fuente | pequeña, en el centro del fondo | — |
| Disco negro (opaco) que flota, centrado sobre la fuente | diámetro 56 cm | radio r_d = 0,28 m |
| Caudal de la válvula | 32 dm³/s | 0,032 m³/s |
| Tiempo hasta que la superficie se ve oscura desde arriba | 8 s | — |
| Medio de afuera | aire (supuesto) | n' = 1 |

**Qué se pide:** el índice de refracción n del líquido.

## 2. Molde en la hoja

**Ejercicio 8 de la v6** ("Reflexión total: superficie iluminada"): una fuente dentro del líquido; solo sale luz donde θ < θ_L, con sen θ_L = n'/n, y eso forma un círculo de radio r = h·tg θ_L.

- **Se repite:**
  - el esquema de la fuente en el fondo, a profundidad h de la superficie;
  - el ángulo límite;
  - r = h tg θ_L;
  - despejar n.
- **Cambia:**
  - En la hoja (1C 2025), el dato es el porcentaje iluminado y la profundidad es fija.
  - Acá el círculo de luz está tapado por un disco, y la profundidad **cambia** porque se vacía el recipiente.
  - El dato es el instante en que se oscurece: ahí el círculo de luz se achicó hasta tener el tamaño del disco.
  - Además hay que sacar h con el caudal (dm³ → m³).

## 3. Teoría que se usa

**Snell y ángulo límite.**

- En la superficie vale n sen θ = n' sen θ'. Al pasar a un medio de menor índice (n' < n), el rayo se aleja de la normal: θ' > θ.
- Cuando θ llega a θ_L, el refractado sale rasante (θ' = 90°):

  **sen θ_L = n'/n**

- Para θ > θ_L no hay refractado: el rayo se refleja entero (reflexión total interna).
- θ_L depende solo de los dos medios. No depende de la profundidad.

**El círculo de luz.**

- Un rayo que sale de la fuente y llega a la superficie a una distancia ρ del punto que está justo encima forma con la normal un ángulo θ con tg θ = ρ/h.
- Solo salen los rayos con θ < θ_L, o sea los que llegan dentro de un círculo de radio:

  **r = h · tg θ_L**

- Afuera de ese círculo no sale luz: desde arriba, esa parte de la superficie se ve oscura.

**El disco.**

- El disco es negro y opaco, y tapa el círculo central de radio r_d = 28 cm.
  - Si r > r_d, sale luz por el anillo entre r_d y r: la superficie libre se ve iluminada alrededor del disco.
  - Si r ≤ r_d, toda la luz que podría salir choca con el disco: la superficie se ve oscura.
- Al vaciarse, h baja y r = h tg θ_L se achica, porque θ_L no cambia. El disco flota, así que baja con el líquido y sigue en la superficie, centrado.
- El instante en que "se torna oscura" es cuando el círculo de luz coincide con el disco:

  **r_d = h · tg θ_L**

**Vaciado de un cubo.** La sección es constante, a². Si sale un volumen V, el nivel baja Δh = V/a², y la profundidad queda h = a − Δh.

**De la tangente al seno.** sen θ = r/√(r² + h²) (hipotenusa del triángulo de catetos h y r). Entonces n = n'/sen θ_L = √(h² + r²)/r.

## 4. Resolución paso a paso

1. **Volumen desagotado:** V = 32 dm³/s · 8 s = 256 dm³ = **0,256 m³** (1 dm³ = 10⁻³ m³).
2. **Cuánto baja el nivel:** Δh = V/a² = 0,256 m³ / 0,64 m² = **0,40 m**.
3. **Profundidad de la fuente:** h = a − Δh = 0,80 − 0,40 = **0,40 m**.

   En decímetros es más directo: a = 8 dm, base de 64 dm², Δh = 256/64 = 4 dm.
4. **Condición de oscuridad:** r_d = h tg θ_L ⇒ tg θ_L = 0,28/0,40 = **0,7** ⇒ θ_L = 34,99° ≈ 35,0°.
5. **Seno del ángulo límite:** sen θ_L = 0,28/√(0,28² + 0,40²) = 0,28/0,48826 = **0,57346**.
6. **Índice:** n = n'/sen θ_L = 1/0,57346 = **1,744** (exacto: √(0,40² + 0,28²)/0,28 = √149/7).

**Control de coherencia.** Con n = 1,744 (tg θ_L = 0,7), el radio del círculo de luz mientras se vacía es:

| t | h | r = 0,7·h | Qué se ve |
|---|---|---|---|
| 0 s | 0,80 m | 0,56 m | anillo iluminado alrededor del disco (llega casi hasta las esquinas: más que a/2 = 0,40 m) |
| 2 s | 0,70 m | 0,49 m | anillo iluminado |
| 4 s | 0,60 m | 0,42 m | anillo iluminado |
| 6 s | 0,50 m | 0,35 m | anillo iluminado |
| 8 s | 0,40 m | 0,28 m | el anillo desaparece: oscuro ✓ |

O sea: antes de los 8 s se ve un anillo de luz que se va achicando, y justo a los 8 s desaparece.

**Sobre la resolución del alumno.** Llega al mismo número, n = √149/7 ≈ 1,744. En la tabla de notas ese ejercicio figura con 0,5/1. No encontré un error numérico. Lo más probable es que le hayan descontado la justificación: escribe "si θ > θ_lim no refracta → está oscuro", pero no dice que el **disco tapa** el círculo de luz, ni por qué se oscurece justo cuando r = radio del disco. Tampoco dibuja el disco en el esquema del cono. En el examen hay que explicarlo con un esquema.

**Interpretaciones:** no hay una ambigüedad real. Lo único que se supone es n' = 1 (aire arriba). Si hubiera otro medio, n = n'·√149/7.

## 5. Resultados finales

- V = 0,256 m³ ⇒ el nivel baja 0,40 m ⇒ h = 0,40 m.
- tg θ_L = 0,28/0,40 = 0,7 ⇒ θ_L ≈ 35,0°; sen θ_L = 0,573.
- **n = √149/7 ≈ 1,74.**

## 6. Dónde es fácil equivocarse

- **Usar el diámetro (56 cm) en vez del radio (28 cm):** da n = 1,23.
- **Olvidarse del vaciado y usar h = 80 cm:** da n = 3,03.
- **Confundir tangente con seno**, es decir, poner sen θ_L = r/h = 0,7: da n = 1,43. r/h es la tangente; el seno es r/(hipotenusa).
- **Unidades del caudal:** 1 dm³ = 1 L = 10⁻³ m³. Conviene trabajar todo en dm o todo en m.
- **Confundir "cuánto bajó" con "cuánto queda".** h = a − Δh. Acá las dos cosas dan 0,40 m por casualidad, pero con otros números no.
- **Pensar que al principio estaba oscuro.** Al principio el círculo de luz (r = 56 cm) es más grande que el disco y sale luz alrededor. Se oscurece cuando se achica hasta el disco.
- **Justificación incompleta:** hay que decir explícitamente que la luz que podría salir (θ < θ_L) cae toda debajo del disco, y hacer el esquema del cono con el disco.

## 7. Ideas de animación

1. **Corte del cubo:**
   - la fuente en el fondo emite un abanico de rayos;
   - los de θ < θ_L salen refractados, alejándose de la normal;
   - los de θ > θ_L rebotan hacia abajo (reflexión total), en otro color;
   - un rayo resaltado en θ_L sale rasante.
2. **Vaciado con cronómetro de 0 a 8 s:**
   - el nivel baja y el disco baja flotando;
   - el cono de luz que sale se angosta (r = h tg θ_L);
   - al lado, una **vista desde arriba**: el disco negro con un anillo de luz alrededor que se achica hasta desaparecer a los 8 s.
3. **El "bloque" de 256 dm³** que se va: una lámina de 0,8 × 0,8 m de base y 0,4 m de alto, con la cuenta Δh = V/a² al lado.
4. **Triángulo rectángulo** de catetos h = 40 cm y r = 28 cm, con hipotenusa 48,8 cm. Que aparezcan tg = 0,7 y sen = 28/48,8 = 0,573, y la cuenta n = 1/sen θ_L.
5. **Las tres trampas como "versiones equivocadas"** del triángulo: con el diámetro, con h = 80 y con sen = r/h. Cada una con su n tachado.
