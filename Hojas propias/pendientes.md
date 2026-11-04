# Arreglos pendientes de las hojas

Agregar acá lo que aparezca mientras se estudia. Se aplican cuando el usuario lo pida.

**Al aplicarlos:** editar `src/formulas.html` y la hoja de ejercicios elegida (`src/ejercicios-v5.html`, `-v6` o `-v7`), generar solo la versión tipeada (`node tools/build.mjs formulas ejercicios-v5 ejercicios-v6 ejercicios-v7 --variantes=tipeado`), revisar que cada hoja siga en dos caras A4 y copiar los PDF a `Para imprimir/`. Si el PDF está abierto, la copia falla: pedir que lo cierren.

## Contenido

Todos los arreglos anotados hasta el 1/11/2026 ya están en las dos hojas.

## Para más adelante

- [ ] El usuario imprime en A4, a tamaño real, la hoja de fórmulas (8,01 pt) y las de ejercicios: v4 (23, 6,09 pt), v5 (21, 6,22 pt), v6 (23, 5,96 pt), v6 con fórmulas grandes (23, texto 5,60 pt y fórmulas 6,72 pt) y v7 (24, 5,84 pt; desde el 4/11/2026 tiene N rendijas en lugar del telescopio). Con eso elige cuál lleva. Si la letra no se lee bien, recortar las descripciones de cada ejercicio.
- [x] Las reglas de la hoja de fórmulas que faltaban (espejos sin cuentas, rayo suelto con reflexión total, interfranja, objeto en el infinito, objeto que llega al foco, propagante o estacionaria) se sumaron el 3/11/2026 a v5, v6, v6 con fórmulas grandes y v7. La v4 quedó sin cambios, como referencia.
- [ ] Cuando el usuario elija la hoja de ejercicios, borrar de `Para imprimir/` las versiones que no eligió (los PDF siguen en `salida/`).
- [ ] Generar las manuscritas, solo cuando el usuario lo pida, más cerca del examen. `Formulas - mi letra.pdf` está desactualizada.
