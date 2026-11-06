# Red 5 · Red con detector golpeado y corrido 10 cm: rango de λ₂

Fuente: 2P del 26/6/2023, ejercicio 2. Se repite casi textual en el 2P de 2024 1C, que tiene resolución de un alumno. También hay una resolución de nash en `Resoluciones de alumnos/Segundos parciales 2022-2023 - resoluciones (nash).pdf`, pp. 7–8. Verificado con `Red5.py`.

## 1. Datos y qué se pide

**Datos**

| Dato | Valor | En SI |
|---|---|---|
| Red | 100 rendijas/mm | d = 1/100 mm = 10 µm = 1,0·10⁻⁵ m |
| Ancho de cada rendija | a = d/4 | 2,5 µm |
| Ancho del haz (incidencia normal) | W = 6 mm | 6·10⁻³ m |
| Longitudes de onda | λ₁ = 450 nm; λ₂ < λ₁, con λ₂ ≈ λ₁ | 4,5·10⁻⁷ m |
| Detector | 40 cm de ancho, a D = 1 m, al principio centrado | — |
| Después del golpe | corrido 10 cm: cubre de **−10 cm a +30 cm** (o de −30 a +10, que es simétrico) | — |
| Lo que registra ahora | **10 líneas espectrales** | — |

**Qué se pide:** el rango de valores posibles de λ₂.

## 2. Molde en la hoja

**Ejercicio 21 de la v6** ("Red: detector con zona rota, luego corrido", 2C 2026), ítem b): "Reparada, pero corrida 6 cm: ¿cuántas líneas?". También sirven el **ejercicio 20** (si se resuelve una λ cercana y en qué orden) y el paso 5 de la **Receta doble rendija / redes**: N = W/d → m_max → faltantes m = p·d/a → resolución mN ≥ λ/Δλ → con el detector corrido, cada lado aparte.

- **Se repite:**
  - posiciones y = D tg θ con sen θ = mλ/d;
  - un límite distinto a cada lado porque el detector está corrido;
  - los órdenes suprimidos (d/a = 4);
  - N = W/d;
  - el criterio de resolución.
- **Cambia:** es el problema **al revés**.
  - En la hoja se conoce Δλ y se cuentan las líneas.
  - Acá se conoce la cantidad de líneas (10) y hay que encontrar qué Δλ la produce.
  - El resultado es un **rango**, porque la cantidad de líneas cambia a saltos cuando Δλ cruza los umbrales λ/(mN).

## 3. Teoría que se usa

**Máximos principales de la red.**

- La red tiene muchas rendijas separadas d. En la dirección θ, todas llegan en fase si **d sen θ = mλ**.
- En el detector, a distancia D, la línea está en **y = D tg θ**.
- Con ángulos de hasta 16°, no conviene aproximar tg ≈ sen.

**Órdenes que faltan.**

- Cada rendija de ancho a tiene su campana de difracción, con ceros en a sen θ = pλ.
- Si coincide con un máximo de la red, ese orden no aparece: m = p·d/a = 4p ⇒ **faltan m = 4, 8…**, para las dos λ por igual.

**N = W/d.** Solo interfieren las rendijas iluminadas: N = 6 mm/10 µm = 600.

**Poder de resolución (Rayleigh en una red).**

- Cada línea tiene un ancho angular finito. Del máximo al primer cero hay δθ = λ/(N d cos θ): cuantas más rendijas, más fina la línea.
- En el orden m, las dos λ están separadas Δθ = mΔλ/(d cos θ).
- Rayleigh dice que se ven separadas si Δθ ≥ δθ. Eso da:

  **λ/Δλ ≤ mN**

- Consecuencia clave: **cuanto más alto el orden, mejor se resuelve**. Si se resuelve el orden m, se resuelven todos los mayores.
- Con λ₂ ≈ λ₁ da lo mismo usar λ₁, λ₂ o el promedio en λ/Δλ (cambia la 4ª cifra decimal).

**Cómo se cuentan las líneas.**

- El orden 0 es **1 línea**: las dos λ salen derechas, en θ = 0.
- Cada orden m ≠ 0 que cae en el detector da **1 línea** si no se resuelve y **2** si se resuelve.
- Con el detector corrido, cada lado tiene su propio m_max: se cuentan por separado.

## 4. Resolución paso a paso

1. **Parámetros de la red.**
   - d = 1/(100 mm⁻¹) = 0,01 mm = **10 µm**;
   - a = d/4 = **2,5 µm** ⇒ d/a = 4 ⇒ **faltan m = 4, 8…**;
   - N = W/d = 6·10⁻³/10⁻⁵ = **600**.
2. **Dónde caen las líneas de λ₁.** sen θ = m·0,45/10 = 0,045m; y = 1 m · tg θ:

   | m | sen θ | y |
   |---|---|---|
   | 1 | 0,045 | 4,50 cm |
   | 2 | 0,090 | 9,04 cm |
   | 3 | 0,135 | 13,62 cm |
   | 4 | 0,180 | 18,30 cm (**falta**) |
   | 5 | 0,225 | 23,09 cm |
   | 6 | 0,270 | 28,04 cm |
   | 7 | 0,315 | 33,19 cm (afuera) |

3. **Límite de cada lado.**
   - **Lado + (hasta +30 cm):** sen θ_max = 0,30/√(1 + 0,30²) = 0,28735 ⇒ m ≤ 0,28735 · 10/0,45 = 6,39 ⇒ **m ≤ 6**.
   - **Lado − (hasta −10 cm):** sen θ_max = 0,10/√(1 + 0,10²) = 0,09950 ⇒ m ≤ 2,21 ⇒ **m ≤ 2**.
   - Como λ₂ ≈ λ₁ (apenas menor), sus líneas caen en los mismos órdenes, un poquito más cerca del centro. Ninguna se sale ni entra una nueva.
4. **Órdenes en el detector:**
   - lado +: m = 1, 2, 3, 5 y 6 (5 órdenes; el 4 falta);
   - lado −: m = 1 y 2 (2 órdenes);
   - más el central.
5. **Líneas si no se resolviera ningún orden:** 1 + 5 + 2 = **8**.
6. **Hacen falta 10 líneas.** Faltan 2, así que **exactamente dos órdenes** tienen que verse desdoblados. Como la resolución mejora con m, los resueltos son los dos más altos: **+5 y +6**. El +3 no tiene que resolverse: si se resolviera, también lo harían +5 y +6, y serían 11 líneas. El 4 no existe, así que el umbral queda "entre 3 y 5".
7. **Condiciones:**
   - m = 5 resuelto: 5N ≥ λ/Δλ ⇒ Δλ ≥ λ₁/(5N) = 450/3000 = **0,15 nm**;
   - m = 3 sin resolver: 3N < λ/Δλ ⇒ Δλ < λ₁/(3N) = 450/1800 = **0,25 nm**.
8. **Rango de λ₂** (Δλ = λ₁ − λ₂):

   0,15 nm ≤ 450 nm − λ₂ < 0,25 nm ⇒ **449,75 nm < λ₂ ≤ 449,85 nm**

   Usando λ₂ en lugar de λ₁ en λ/Δλ, los extremos dan 449,7501 y 449,8500 nm: lo mismo.

**Control por fuerza bruta** (`Red5.py` cuenta las líneas para cada λ₂). La cantidad de líneas sube a saltos con Δλ; los umbrales son λ₁/(mN): 0,125 nm (m = 6), 0,15 (m = 5), 0,25 (m = 3), 0,375 (m = 2) y 0,75 (m = 1).

| Δλ | Líneas |
|---|---|
| < 0,125 nm | 8 |
| entre 0,125 y 0,15 nm | 9 |
| **entre 0,15 y 0,25 nm** | **10** |
| entre 0,25 y 0,375 nm | 11 |
| entre 0,375 y 0,75 nm | 13 (el ±2 se desdobla de los dos lados) |
| ≥ 0,75 nm | 15 |

Algunos casos puntuales:

| λ₂ | Líneas |
|---|---|
| 449,70 nm | 11 |
| 449,75 nm | 11 (justo resuelve m = 3) |
| 449,76 nm | 10 |
| 449,85 nm | 10 |
| 449,86 nm | 9 |
| 449,90 nm | 8 |

**Interpretaciones y bordes**

- **Hacia dónde se corrió el detector:** da igual, es simétrico.
- **Contar o no la línea central:** "líneas espectrales" incluye el orden 0, que es una línea que se registra. Si no se la contara, harían falta 3 órdenes resueltos (+3, +5 y +6): 2N < λ/Δλ ≤ 3N ⇒ 449,625 nm < λ₂ ≤ 449,75 nm. Es menos probable.
- **Bordes del intervalo:** "justo en el límite de Rayleigh" se toma como resuelto. Por eso 449,85 nm entra (m = 5 justo resuelto) y 449,75 nm no (ahí m = 3 justo se resuelve y serían 11).
- **Las dos resoluciones de alumnos:**
  - **nash** (2P 2023) da 449,75 < λ₂ < 449,85 nm, que coincide.
  - **El alumno del 2P 2024 1C.** En esa versión el enunciado no dice "λ₂ ≈ λ₁", así que estudia también el caso de λ₂ lejana: su orden 7 entraría si λ₂ ≤ 410,5 nm, y lo descarta. Pero como límite superior pone **449,875 nm**, que es la condición de que se resuelva m = 6. Eso está mal: entre 449,85 y 449,875 nm se resuelve solo el 6, y se ven 9 líneas, no 10. El límite correcto es la condición de m = 5: 449,85 nm.

## 5. Resultados finales

- d = 10 µm; a = 2,5 µm (faltan m = 4, 8…); N = 600.
- Detector de −10 a +30 cm: lado + con órdenes 1, 2, 3, 5 y 6; lado − con 1 y 2; más el central. Sin resolver serían 8 líneas.
- 10 líneas ⇒ se resuelven solo m = 5 y m = 6 ⇒ 0,15 nm ≤ Δλ < 0,25 nm.
- **449,75 nm < λ₂ ≤ 449,85 nm.**

## 6. Dónde es fácil equivocarse

- **Tomar el detector como simétrico** (±20 o ±30 cm). Corrido, tiene límites distintos a cada lado: 6 arriba y 2 abajo.
- **Olvidarse de que falta el orden 4**, que caería en 18,3 cm, dentro del detector. Contándolo, todo se corre.
- **La línea central:** contarla como 2 (son dos λ, pero en θ = 0 coinciden) o no contarla.
- **N = (ancho de la red)/d.** Es el ancho del **haz** sobre d: 6 mm/10 µm = 600.
- **Creer que los órdenes bajos resuelven mejor.** Es al revés: λ/Δλ ≤ mN mejora con m. Los que se desdoblan son los de afuera.
- **Sacar el límite superior con m = 6** en vez de m = 5: es el error de la resolución del 2P 2024. Para 10 líneas tienen que resolverse **dos** órdenes, el 5 y el 6.
- **Usar m = 4 en los umbrales.** No existe, y el salto va de 3 a 5.
- **Usar y = D sen θ.** Acá no cambia la cuenta (con sen, m ≤ 6,67), pero en otros números sí puede cambiarla.
- **Unidades.** 100/mm ⇒ d = 10 µm; λ/d = 0,45/10. Los Δλ quedan en décimas de nm: no redondear 449,75 a 449,8.

## 7. Ideas de animación

1. **La red y el detector:**
   - el haz de 6 mm ilumina 600 rendijas;
   - el detector de 40 cm centrado recibe un "golpe" (un martillo) y se desliza 10 cm;
   - una regla al costado marca −10 y +30 cm.
2. **Las líneas aparecen en el detector** en sus y:
   - lado +: 4,5; 9,0; 13,6; 23,1 y 28,0 cm;
   - el lugar del orden 4 (18,3 cm), tachado, con la campana de difracción punteada y su cero ahí;
   - lado −: 4,5 y 9,0 cm;
   - el orden 7 queda afuera, en 33,2 cm.
3. **Zoom a cada línea** con dos picos que se separan:
   - un deslizador para Δλ, y un contador de líneas que salta 8 → 9 → 10 → 11 → 13 → 15 a medida que Δλ cruza los umbrales;
   - la ventana del 10 queda pintada.
4. **Recta numérica de Δλ** con los umbrales λ/(mN) (0,125; 0,15; 0,25; 0,375; 0,75 nm) y la cantidad de líneas en cada tramo. Al final se pasa de Δλ a λ₂: 449,75 < λ₂ ≤ 449,85 nm.
5. **"El error del 449,875"**: con λ₂ = 449,86 nm se ve que solo el orden 6 se desdobla, y el contador marca 9.
