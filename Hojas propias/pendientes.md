# Arreglos pendientes de las hojas

Agregar acá lo que aparezca mientras se estudia. Se aplican cuando el usuario lo pida.

**Al aplicarlos:** editar `src/formulas.html` y la hoja de ejercicios elegida (`src/ejercicios-v5.html`, `-v6` o `-v7`), generar solo la versión tipeada (`node tools/build.mjs formulas ejercicios-v5 ejercicios-v6 ejercicios-v7 --variantes=tipeado`), revisar que cada hoja siga en dos caras A4 y copiar los PDF a `Para imprimir/`. Si el PDF está abierto, la copia falla: pedir que lo cierren.

## Contenido

Todos los arreglos anotados hasta el 1/11/2026 ya están en las dos hojas.

## Para más adelante

- [ ] El usuario imprime en A4, a tamaño real, la hoja de fórmulas (8,01 pt) y las de ejercicios: v4 (23, 6,09 pt), v5 (21, 6,12 pt), v6 (23, 5,92 pt), v6 con fórmulas grandes (23, texto 5,58 pt y fórmulas 6,70 pt) y v7 (24, 5,72 pt; desde el 4/11/2026 tiene N rendijas en lugar del telescopio). Desde el 4/11/2026 las cuatro tienen el párrafo de unidades. Desde el 6/11/2026 está también la v7 con tamaños variables (cara 1 a 5,88 pt y cara 2 a 5,72 pt; recetas 5,72, fracciones ~5, descripción 5,15, enunciado 5,26; sin el hueco de la cara 2). También está la v8 (25: la v7 + telescopio + regla de dos redes, tamaños por rol; cara 1 5,67 pt y cara 2 5,42 pt). Con eso elige cuál lleva. Si la letra no se lee bien, recortar las descripciones de cada ejercicio.
- [x] Las reglas de la hoja de fórmulas que faltaban (espejos sin cuentas, rayo suelto con reflexión total, interfranja, objeto en el infinito, objeto que llega al foco, propagante o estacionaria) se sumaron el 3/11/2026 a v5, v6, v6 con fórmulas grandes y v7. La v4 quedó sin cambios, como referencia.
- [ ] Cuando el usuario elija la hoja de ejercicios, borrar de `Para imprimir/` las versiones que no eligió (los PDF siguen en `salida/`).
- [ ] Generar las manuscritas, solo cuando el usuario lo pida, más cerca del examen. `Formulas - mi letra.pdf` está desactualizada.
