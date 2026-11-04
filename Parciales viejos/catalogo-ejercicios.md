# Catálogo de ejercicios de exámenes viejos

Clasificación de los 57 exámenes de la carpeta (sin duplicados), para ver qué tipos de ejercicio se repiten. Solo cuentan los temas del parcial único actual: oscilaciones, ondas, óptica geométrica, interferencia, difracción y redes.

**Fuera del parcial (no se cuentan):** termodinámica, polarización (no está en `Teoria/`) y tubos de sonido (tubo de Kundt, abierto–cerrado: `Teoria/04`–`05` no los tratan).

## Cómo está organizada la carpeta

| Carpeta | Qué tiene |
|---|---|
| `Parciales únicos/` | El formato actual (desde 2025): 6 exámenes de 5 ejercicios con todos los temas. El parcial 2C 2026 está solo en el doc https://claude.ai/artifact/TssbiZfX7pVfuYX2gr92NH |
| `Primeros parciales (formato viejo)/` | 18 primeros parciales y recuperatorios, 2015–2024: oscilaciones, ondas y óptica geométrica |
| `Segundos parciales (formato viejo)/` | 12 segundos parciales y recuperatorios, 2016–2024: óptica física, y desde 2022 también termodinámica |
| `Finales/` | 19 finales, 2018–2026. Más conceptuales: opción múltiple, verdadero/falso, cocientes |
| `Resoluciones de alumnos/` | Cuadernillo de parciales resueltos (2025), resoluciones de nash (finales 2021–2023 y segundos parciales 2022–2023, con el recuperatorio del 2P 1C 2023, que no está en otro lado) y de rodri (finales de diciembre 2023 y julio 2024) |

Nombres: `<año> <cuatrimestre> - <examen> (<día-mes>)`; los finales, `<año>-<mes> Final <fecha I, II o III>`. "Con solución" indica que el PDF trae la resolución de un alumno después del enunciado.

## Frecuencia por tipo de ejercicio

Cada tipo se cuenta una vez por examen. La columna "En la hoja" indica qué ejercicio de `Hojas propias/src/ejercicios-v5.html` (la hoja de 21) lo cubre. La v6 (23 ejercicios) suma la barra con dos caras esféricas (dioptras, ubicación verdadera) y el aumento dado; la v7 (24), además, N rendijas con las centrales tapadas (19; hasta el 4/11/2026 ese lugar lo tenía el telescopio).

| Tipo | En la hoja | Parciales únicos (7) | 1P y 2P viejos (31) | Finales (19) | Total (57) |
|---|---|---|---|---|---|
| **Oscilaciones** | | | | | |
| Cambio de régimen forzado → libre | 4 | 2 | 6 | 1 | 9 |
| Forzado: resonancia, Q, ancho, ½ potencia, estacionario | 3 | 1 | 8 | 7 | 16 |
| Amortiguado: masa que se despega o cae, x(t) | 1 | 1 | 4 | 0 | 5 |
| Amortiguado: % por ciclo, Q, tiempo y ciclos | 1, 2 | 0 | 8 | 7 | 15 |
| MAS con varios resortes: x(t), tiempos | — | 0 | 2 | 0 | 2 |
| Cambio de régimen MAS → amortiguado o libre | receta (fórmula) | 0 | 1 | 1 | 2 |
| Conceptual: gráfico ⟨P⟩(ω) → A(ω), ¿es correcta esta x(t)? | — | 0 | 0 | 3 | 3 |
| **Ondas** | | | | | |
| Estacionaria: energía de un tramo en un instante | 5, 7 | 3 | 13 | 1 | 17 |
| Estacionaria: graficar u(t) o u(x) | 6, 7 | 3 | 11 | 0 | 14 |
| Estacionaria: identificar el modelo ("¿o no es posible determinarlo?") | 7 y receta | 2 | 4 | 0 | 6 |
| Propagante → estacionaria: escribir y(x,t), armónico, ⟨P⟩ | 7 | 1 | 11 | 0 | 12 |
| Estacionaria: se libera un extremo, cambia la tensión o la masa colgada | 5 c) | 1 | 7 | 1 | 9 |
| Propagante conceptual: ordenar λ, v, ω, ⟨P⟩; ¿propagante o estacionaria? | — | 0 | 0 | 6 | 6 |
| **Óptica geométrica** | | | | | |
| Reflexión total: disco iluminado en un cubo o recipiente | 8 | 2 | 7 | 0 | 9 |
| Convergente + divergente: salen paralelos, no se forma imagen o imagen en pantalla | 12 b), 13 | 2 | 6 | 1 | 9 |
| Lente + espejo: salen paralelos | 10 | 2 | 2 | 0 | 4 |
| Reflexión total con espejo sumergido o reflector | 9 a) | 1 | 4 | 0 | 5 |
| Lente sumergida o llena de líquido | 12 | 1 | 3 | 3 | 7 |
| Dos imágenes en la pantalla (espejo + lente) | 11 | 1 | 2 | 0 | 3 |
| Imagen en el mismo lugar del objeto / ubicación verdadera | nota en 10 | 1 | 1 | 0 | 2 |
| Telescopio con lente y espejo | — | 1 | 0 | 2 | 3 |
| Reflexión total / Snell: rayo en prisma, cubo o fibra (rango de n o de ángulo) | 9 b) | 0 | 6 | 5 | 11 |
| Dioptras, barras o sistemas de superficies | — | 0 | 5 | 0 | 5 |
| Aumento dado: f' (al mover el objeto deja de haber imagen, o espejo con rango de R) | — | 0 | 3 | 4 | 7 |
| Espejo conceptual (foto, opción múltiple, gráfico s'(s)) | — | 0 | 0 | 5 | 5 |
| **Óptica física** | | | | | |
| Doble rendija: láminas → corrimiento, incidencia oblicua | 14 | 5 | 9 | 0 | 14 |
| Red: luz blanca o espectro continuo, solapamiento | 20 | 3 | 1 | 0 | 4 |
| Doble rendija: líquido entre placa y pantalla | 15 | 3 | 0 | 0 | 3 |
| Rayleigh (casi siempre como ítem de otro ejercicio) | 21 | 2 | 8 | 4 | 14 |
| Red: cuántas líneas se ven | 17 | 2 | 5 | 0 | 7 |
| Doble rendija: cámara o lámina + gota | 16 | 1 | 4 | 0 | 5 |
| Red: pantalla finita, resolución en algún orden | 18 | 1 | 3 | 1 | 5 |
| Red: detector roto o corrido | 19 | 1 | 3 | 0 | 4 |
| Difracción por un hilo o rendija (Babinet) | 21 | 1 | 2 | 3 | 6 |
| N rendijas con algunas tapadas | nota en la receta; v7: 19 | 1 | 1 | 10 | 12 |
| Lámina delgada, cuña, anillos de Newton | 21 | 1 | 1 | 4 | 6 |
| Doble rendija: datos del patrón o interfranja conceptual | — | 0 | 1 | 4 | 5 |
| Dos redes: cocientes de N, K y a | — | 0 | 0 | 9 | 9 |

### Qué muestra

- **Cada parcial único trae un ejercicio de cada bloque**: oscilaciones o estacionaria, óptica geométrica (casi siempre reflexión total o lentes), doble rendija y red.
- **Contando solo parciales** (únicos, primeros y segundos; el usuario los pondera por sobre los finales): todo tipo que salió 3 veces o más tiene un ejercicio resuelto en la v6. La v5 no tiene dioptras o barras (5) ni aumento dado (3). Sin ejercicio resuelto quedan tipos de 2 parciales o menos: N rendijas tapadas (2, resuelto solo en la v7), imagen en el mismo lugar (2, nota con cuentas en la v6), MAS con varios resortes (2, el último en 2020), telescopio (1).
- **Los finales tienen su propio estilo**: dos redes con cocientes, N rendijas tapadas, espejos conceptuales y propagantes conceptuales casi no salen en parciales.
- **La cátedra recicla ejercicios casi textuales**:
  - Red con detector roto y corrido: 2P 15/6/2019 = parcial 2C 2026.
  - Detector golpeado y corrido 10 cm: 2P 26/6/2023 = 2P 2024 1C.
  - Vidrio + acrílico y luego incidencia oblicua: 2P 12/11/2022 = recuperatorio 2P 1C 2023 = recuperatorio 7/6/2025 = parcial 2C 2026.
  - Masa que se despega (m = 40 g, M = 160 g): recuperatorio 1P 18/6/2024 = recuperatorio 7/6/2025.
  - Láser con espejo sumergido: 1P 4/2018 = 1P 2021 = recuperatorio 1/11/2025.
  - 79,28% de energía en 2 ciclos: 1P 4/2018 = recuperatorio 30/5/2026.
  - Resortes en serie sumergidos: 1P 9/2019 = 1P 2C 2020 = 1P 4/2023.
  - Cubo con foco en el centro: 1P 9/2019 = 1P 4/2022 = recuperatorio 1P 2C 2020 = parcial 1C 2026.
  - Lente plano-convexa con imagen del doble y divergente de 5 cm: 2P 2024 1C ≈ parcial 2C 2026 (este, sumergida).
  - Hilo de 30 µm con lente: 2P 2017 = recuperatorio 30/5/2026.
  - Cámara de aceite + gota: 2P 10/11/2018 = recuperatorio 2P 29/6/2022 = intermedio 24/5/2025.
  - Propagante de 400 m/s, 50 cm, 2 g y 5 nodos: 1P 23/4/2022 = 1P 16/9/2023 (el 1P 20/4/2024 usa la misma cuerda con T = 1 ms).
  - Cubo de vidrio con reflector y agua (θ ≥ 48°): recuperatorio 1P 1C 2022 = 1P 16/9/2023.
  - Fijo–fijo de 15 g y 36 N: 1P 1C 2016 = 1P 28/9/2019.
  - Lente + espejo (objeto a 25 cm, lente de 20 cm, d = 10 cm): 1P 1C 2016 = 1P 28/9/2019.

## Exámenes, uno por uno

Códigos: **MAS**, **AMORT** (amortiguado), **FORZ** (forzado), **REG** (cambio de régimen), **PROP** (propagante), **EST** (estacionaria), **RT** (reflexión total), **LENTE** (lentes, espejos, dioptras), **LAM** (lámina delgada), **DR** (doble rendija), **DIF** (difracción, Babinet), **NR** (N rendijas), **RED**, **RAY** (Rayleigh).

### Parciales únicos

| Examen | Ejercicios |
|---|---|
| 2025 1C intermedio (24/5) | EST (fijo–fijo: tensión, % de energía de un tramo, extremo libre) · RT (cubo lleno al ras, 53% iluminado) · LENTE (lente + espejo, salen paralelos) · DR (en agua, cámara de aceite + gota) · RED (tres λ: cuántas líneas) |
| 2025 1C recuperatorio (7/6) | AMORT (masa que se despega) · DR (vidrio + acrílico, luego oblicua) · RED (luz blanca, solapamiento de 8 cm: K) · LENTE (telescopio con lente y espejo) · RAY (moto que resulta ser un auto) |
| 2025 2C intermedio (18/10) | EST (energía en dos instantes) · REG (forzado → libre) · LENTE (divergente + espejo cóncavo, imagen en el mismo lugar) · DR (oblicua, lámina y luego líquido) · RED (800/cm, tres λ; Rayleigh desde 10 cm) |
| 2025 2C recuperatorio (1/11) | EST (propagante con ⟨P⟩ → 8 nodos: "¿qué modelo? ¿o no es posible determinarlo?"; energía elástica de un tramo; graficar u_K(t)) · RT (láser con espejo sumergido: rango del ángulo φ) · LENTE (convergente + divergente: d para que no se forme imagen) · DR (en gas: dos láminas, luego líquido) · RED (espectro continuo 400–1500 nm: máximo orden completo, % de solapamiento en el detector) |
| 2026 1C parcial | EST (fijo–libre: masa, graficar u_U(t)) · RT (cubo con foco en el centro) · LENTE (lente + espejo, salen paralelos) · DR (láminas en gas, luego líquido) · RED (pantalla finita, λ cercana) |
| 2026 1C recuperatorio (30/5) | FORZ (Q, ancho de banda, estacionario) · LENTE (espejo + lente, dos imágenes en la pantalla) · NR (5 rendijas, 3 tapadas) · RED (luz blanca, solapamiento en el detector) · LAM (aceite sobre vidrio) · DIF (Babinet, hilo de 30 µm) |
| 2026 2C parcial (doc) | EST (identificar el modelo; tensión; graficar E_K(t)) · REG (forzado → libre: F(t)) · LENTE (bicóncava sumergida; divergente para que salgan paralelos) · DR (oblicua, vidrio + plástico) · RED (detector roto, luego corrido) |

### Primeros parciales (formato viejo)

| Examen | Ejercicios |
|---|---|
| 2015 2C (24/9) | EST (oscilador–anillo: energía de un tramo; escribir la propagante) · LENTE (imagen 3 veces mayor en pantalla: f'; espejo con rango de R para imagen virtual) · AMORT + FORZ + REG (79,24% en 3 ciclos: Q; ω con ½ potencia; se quita la fuerza en máxima elongación) · RT (rayo en un cubo: n máximo) |
| 2016 1C | EST (propagante → fijo–fijo; graficar u_K(x) y ⟨P⟩; se libera un extremo) · RT (fuente en el fondo de un estanque) · LENTE (lente + espejo, salen paralelos) · FORZ + AMORT (ω_RA, ω_RP y A(0); cesa la fuerza: tiempo hasta perder 70%) |
| 2017 2C (23/9) | EST (fijo–fijo: armónico, graficar u_U(t) y ⟨P⟩(t); se libera un extremo) · FORZ + REG (curva A(ω); cesa la fuerza en el equilibrio) · LENTE (dos posiciones de la lente con imagen en la pantalla: f') · RT (estanque con círculo oscuro) |
| 2018 1C (19/4) | LENTE (imagen 4 veces mayor a 40 cm; espejo con rango de R) · AMORT + FORZ (79,28% en 2 ciclos: Q, ω con ½ potencia, estacionario) · EST (oscilador–anillo: energía de un tramo, dos propagantes) · RT (láser con espejo sumergido: φ mínimo) |
| 2018 2C (15/9) | AMORT + FORZ (masa que se separa; ancho de resonancia) · LENTE (lente sobre una pileta: profundidad) · EST (fijo–fijo: graficar u_U(t) y ⟨P⟩(t); anillo) · RT (prisma en un líquido: rango de α) |
| 2019 1C (25/4) | LENTE (sistema de dioptras: dónde mover el objeto para que salgan paralelos) · MAS + AMORT + FORZ (tres resortes: x(t), tiempo a la compresión máxima; Q = 20; ω para máxima amplitud) · EST (oscilador–anillo: energía de un tramo; propagante) · RT (cubo: rango de n para que salga luz por la cara lateral) |
| 2019 2C (28/9) | EST (propagante → fijo–fijo: graficar u_K(x), energía elástica de un tramo, se libera un extremo) · AMORT (resortes en serie sumergidos) · LENTE (lente + espejo, salen paralelos) · RT (cubo con foco en el centro) |
| 2020 2C (virtual) | AMORT (resortes en serie sumergidos) · EST (energía de un tramo) · EST (cuerda con masa colgada en una polea) · LENTE (convergente + divergente: L para que salgan paralelos) |
| 2020 2C recuperatorio (virtual) | EST (nodos internos; energía elástica de un tramo) · LENTE (lente hueca llena de líquido: n) · RT (cubo con foco en el centro) · MAS (tres resortes: x(t), tiempo a la compresión máxima) |
| 2021 1C (virtual) | AMORT + FORZ + REG (gráfico semilog de E(t); 32 resortes en serie: ω_RA, amplitud; se apaga la fuerza en máxima elongación) · RT (láser con espejo sumergido) · EST (energía cinética de un tramo) · EST (masa colgada en una polea) · LENTE (convergente + divergente: salen paralelos) |
| 2022 1C (23/4) | AMORT + FORZ + REG (59,3% por ciclo: Q; se apaga el motor con v y x dados) · RT (cubo con foco en el centro) · EST (propagante → 5 nodos: modelo; energía cinética de un tramo; u_K(x)) · LENTE (convergente + divergente plano-cóncava: R; salen paralelos) |
| 2022 1C recuperatorio | RT (cubo de vidrio con espejo y agua: velocidad) · LENTE (plano-convexa en un tubo, se llena con líquido: R y n) · PROP (cuerda infinita con ⟨P⟩: μ; graficar u(t) en un punto) · AMORT (masa que se rompe colgada: x(t), largo tras una oscilación) |
| 2022 2C (19/9) | RT (prisma con cara espejada: rango de n) · LENTE (convergente + divergente: d para que no se forme imagen) · EST (propagante con ⟨P⟩ → 9 nodos: modelo; energía elástica de un tramo; graficar u_K(t)) · AMORT (masa que cae en un líquido: x(t)) |
| 2023 1C (24/4) | RT (fibra óptica: α máximo, tiempo) · LENTE (divergente + convergente entre objeto y pantalla: dónde ubicar la convergente) · EST (armónicos n y n+1: modelo, energía de un tramo, dibujar la cuerda) · AMORT (resortes en serie sumergidos) |
| 2023 2C (16/9) | RT (cubo de vidrio con reflector y agua: velocidad) · LENTE (convergente + espejo cóncavo: dos imágenes en la misma posición) · EST (propagante → 5 nodos: modelo; energías de un tramo; u_K(x)) · FORZ + REG (péndulo forzado en máxima amplitud, se apaga el motor: θ(t)) |
| 2024 1C (20/4) | RT (disco flotante y válvula: n) · LENTE (barras cilíndricas: salen paralelos) · MAS + REG (MAS → sobreamortiguado con b = 20 kg/s) · EST (propagante → estacionaria: energía cinética de un tramo, graficar u_U(t)) |
| 2024 1C recuperatorio (18/6) | RT (prisma en un líquido: rango de α sin luz por la cara BC) · LENTE (sistema de dos dioptras: R para que salgan paralelos) · EST (propagante → armónico; graficar u_K(t)) · AMORT (masa que se despega: igual al 7/6/2025) |
| 2024 2C (14/9) | RT (cubo abierto en un planeta con n' = 1,2: rango de n para ≤ 60%) · EST (guitarra: ¿misma nota apretando en x = 40 cm?; energía cinética de un tramo; graficar u_U(x)) · LENTE (barra con dos caras esféricas: imagen en su ubicación verdadera) · FORZ + REG (adorno en un auto: amplitud a otra velocidad; se detiene en mínima longitud) |

### Segundos parciales (formato viejo)

Solo cuentan los ejercicios de óptica física. Desde 2024 también hay óptica geométrica.

| Examen | Ejercicios |
|---|---|
| 2016 1C (23/6) | DR (dos láminas, corrimientos de 3 y 4,5 franjas) · fuera (polarización) · RED (incidencia oblicua: constante; tamaño mínimo para resolver en 3er orden; máximos en la campana) · RAY (satélite) |
| 2017 2C | fuera (polarización) · DIF (Babinet: hilo de 30 µm con lente) · DR (vidrio + acrílico, 2º mínimo en el centro; se cambia el vidrio: I/I_max) · RED (con lente: f' para cierta extensión del 2º orden; resolución) |
| 2018 2C (10/11) | fuera (polarización) · DR (cámara de aceite + gota de agua) · RED (tres λ en un detector de 1 m; contaminante) · RAY (gotas de una impresora) |
| 2019 1C (15/6) | fuera (polarización) · LAM (cuña de acrílico; luego lubricante) · RED (detector roto entre 12 y 18 cm, luego corrido 6 cm) · RAY (impresora) |
| 2022 1C (21/6) | DR (vidrio + acrílico, 3er máximo en O; se cambia el vidrio, corre 7 franjas: n₃, intensidad, Rayleigh desde 4 m) · fuera (termo) |
| 2022 1C recuperatorio (29/6) | DR (en agua, cámara de aceite + gota de aire; Rayleigh; intensidad) · RED (incidencia oblicua de 12°: máximo orden, líneas en una pantalla de 1,2 m) · fuera (termo) |
| 2022 2C (12/11) | DR (vidrio e y acrílico 2e, corre 4 franjas; oblicua para volver el orden 0: e, θ_i, intensidad) · RED (tres λ, pantalla de 65 cm: líneas; Rayleigh desde 10 cm) · fuera (termo) |
| 2023 1C (26/6) | DR (foto del patrón: d y a; lámina que lleva el máximo 2 al 6º mínimo: n, intensidad, máximos en la campana) · RED (detector golpeado y corrido 10 cm, registra 10 líneas: rango de λ₂) · fuera (termo) |
| 2023 1C recuperatorio (solo en la resolución de nash) | DR (igual al 2P 12/11/2022) · RED (con lente; Rayleigh desde 10 cm) · fuera (termo) |
| 2023 2C (11/11) | DR (en líquido, oblicua, lámina + gota de aire: α e intensidad) · RED (tres λ: rango del ancho D para ver 21 líneas) · fuera (termo) |
| 2023 2C recuperatorio (21/11) | NR (3 rendijas con la central tapada, en líquido, dos láminas; luego mínimos) · RED (luz blanca, solapamiento de 8 cm: K) · DIF (Babinet: alambre con láser) · fuera (termo) |
| 2024 1C | LENTE (plano-convexa con imagen del doble: R; divergente de 5 cm para que salgan paralelos) · DR (sumergido, lámina + gota de aire, oblicua) · RED (detector golpeado y corrido 10 cm) · fuera (termo) |
| 2024 2C | LENTE (espejo + lente, dos imágenes en la pantalla) · DR (vidrio + acrílico, 2º máximo en O; se cambia el vidrio: n₃, intensidad, Rayleigh) · RED (tres λ: máximo de líneas) · fuera (termo) |

### Finales

| Examen | Ejercicios |
|---|---|
| 2018-02 III | RT (prisma sumergido con dispersión) · FORZ (gráfico de ⟨P⟩(ω) → A(ω)) · RED (tres λ: rango de λ₂ para que se resuelva) · fuera (polarización) · DR (Young: I_P/I_max con ΔCO = λ/3) |
| 2018-07 II | RT (prisma equilátero: n) · LENTE (espejo a partir del gráfico s'(s)) · RED (dos redes) · fuera (polarización) · DR conceptual (interfranja) |
| 2019-02 III | AMORT + FORZ (γ = 2 s⁻¹, 32% por ciclo; resorte cortado a la mitad) · LENTE (telescopio con lente y espejo convexo) · RAY (moto/auto) · fuera (polarización) · NR (4 rendijas, ΔCO = λ/3) |
| 2019-07 I | FORZ (gráfico de ⟨P⟩(ω) → A(ω)) · LENTE (A = 4, al acercar 3 cm no hay imagen) · RAY · fuera (polarización) · NR (3 rendijas con la central tapada) |
| 2019-12 I | EST (fijo–fijo, se libera un extremo: F'/F) · FORZ + AMORT (ω = 1,01ω₀ con ½ potencia; % tras 2 ciclos libres) · LENTE (A = 4, al acercar 3 cm no hay imagen) · RAY · fuera (polarización) · NR (a partir del gráfico de intensidad) |
| 2021-02 III (virtual) | PROP (pulso: sentido y rapidez) · DR + polarizadores (mayormente fuera) · fuera (polarización) · LENTE (opción múltiple, espejo cóncavo) · RED (dos redes) · RT (verdadero/falso con poliestireno y vidrio) |
| 2021-12 I | AMORT + FORZ (b = b_crít/8; c con ½ potencia) · PROP (tres ondas: ordenar) · LENTE (A = 3, al acercar 2 cm no hay imagen) · RED (dos redes) · RAY (moto/auto) · fuera (polarización) |
| 2022-02 III | EST (fotos sucesivas: energía elástica de un tramo) · LENTE (diseñar un sistema que agrande el haz) · fuera (polarización) · NR (5 rendijas con la 2 y la 4 tapadas) · LAM (anillos de Newton) |
| 2022-07 II | AMORT + FORZ (γ = 2 s⁻¹, 32% por ciclo; resorte cortado) · RT (verdadero/falso) · LAM (anillos de Newton) · RED (dos redes) · fuera (termo) |
| 2022-12 II | PROP + tubo + coherencia (conceptual) · DIF (Babinet: alambre) · NR (4 rendijas) · fuera (termo) |
| 2023-12 I | PROP + tubo + coherencia (conceptual) · LENTE (telescopio con lente y espejo convexo) · NR (4 rendijas) · RED (dos redes) · fuera (termo) |
| 2023-12 II | PROP (tres ondas: ordenar) · AMORT (¿es correcta esta x(t)?) · LENTE (foto de un espejo) · RED (dos redes) · fuera (termo) |
| 2024-07 I | PROP + EST conceptual (cuadro de sí/no) · LENTE (foto de un espejo) · NR (4 rendijas, 9º orden suprimido) · fuera (termo) |
| 2024-07 II | fuera (tubo de Kundt) · REG (resonancia de amplitud con gráfico de ⟨P⟩(ω); se apaga en máxima elongación) · LENTE (lente sumergida con n &lt; n_L) · RT (prisma sobre una placa de n = 1,7) · RED (dos redes) · fuera (termo) |
| 2025-07 I | fuera (tubo abierto–cerrado) · LENTE (A = 4, al acercar 3 cm no hay imagen) · REG (MAS → régimen libre) · NR (4 rendijas, d = 5a) · fuera (termo) |
| 2025-12 I | fuera (tubo de Kundt) · NR (4 rendijas) · RED (dos redes) · AMORT + FORZ (b = b_crít/8) · fuera (termo) |
| 2025-12 II | LENTE (biconvexa con objeto bicolor; cambia el medio) · LAM + DIF (cuña con hilo; difracción del hilo) · RED (dos redes) · fuera (termo) |
| 2026-02 III | AMORT + FORZ (b = b_crít/5) · fuera (tubo) · LENTE (opción múltiple, espejo cóncavo) · NR (4 rendijas, ΔCO = λ/4) · fuera (termo) |
| 2026-07 I | Recopilación de memoria: AMORT + FORZ, tubo, LENTE (biconvexa bicolor), LAM + DIF (cuña con hilo), DR conceptual (interfranja) · fuera (termo) |
