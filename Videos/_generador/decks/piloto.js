// Piloto: portada de la tanda 1 + el ejercicio Ond 1, para probar voces y animaciones
const { portada } = require('./common');
module.exports = {
  title: 'Física II - Práctica parcial - Piloto (Ond 1)',
  file: 'Piloto - Tanda 1 - Ond 1',
  footer: 'Física II · Práctica para el parcial · Tanda 1',
  slides: [
    portada(1, [['Ond 1', 'Propagante → estacionaria'], ['Geo 1', 'Divergente + espejo'], ['DR 1', 'Oblicua + láminas + líquido'], ['Red 1', 'Líneas y Rayleigh'], ['Osc 1', 'Péndulo: forzado → libre']], [
      ['Hola. Esta es la tanda uno de ejercicios para practicar el parcial de Física Dos: un ejercicio de cada bloque, todos con el número uno del PDF de práctica.'],
      ['Vamos a ver una onda estacionaria, una lente divergente con un espejo, una doble rendija con láminas, una red de difracción y un péndulo que pasa de forzado a libre. [A] ¿Conviene mirar el video antes de intentar el ejercicio? [P] Mejor después. Primero intentalo con la hoja al lado, como en el examen, y usá el video para corregirte y para entender por qué se hace cada paso.'],
    ]),
    ...require('./t1/ond1'),
  ],
};
