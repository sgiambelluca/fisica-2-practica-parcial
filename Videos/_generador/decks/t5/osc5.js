// Osc 5 · 1P 1C 2016, ej. 4: ω_RA = 3,99 s⁻¹, ω_RP = 4 s⁻¹, A(0) = 4 cm; luego cesa la fuerza.
// Resultados verificados (soluciones/Osc5.py): ω0 = 4; γ² = (16 − 15,9201)/2 = 0,03995 ⇒ γ = 0,19987 s⁻¹; ω' = 3,995; F0/m = A0ω0² = 0,64 m/s²;
// a) A_max = 0,64/(2γω') = 0,4008 m ≈ 40,1 cm (≈ Q·A0, Q = 10,0); b) e^(−2γt) = 0,3 ⇒ t = 3,01 s (si "queda 70 %": 0,892 s).
const { md, ul, card, callout, eqs, res, plot } = require('../../lib');
const { seccion } = require('../common');
const { kit } = require('../fx');

const SEC = 'Osc 5 · Dos resonancias y A(0)';
const B = 'b-osc';
const K = kit(SEC, B);
const g = 0.19987;
const Acm = w => 64 / Math.sqrt((16 - w * w) ** 2 + (2 * g * w) ** 2);

module.exports = [
  seccion('Osc 5', 'Dos resonancias y A(0)', 'Primer parcial 1C 2016 · ejercicio 4',
    'Ejercicio de oscilaciones número cinco: primer parcial del primer cuatrimestre de dos mil dieciséis, ejercicio cuatro. Sin masa ni constante: con las dos frecuencias de resonancia y la amplitud a frecuencia cero sale todo.'),

  K.enunciado('Osc5.jpg', ['@1 $\\omega_{RA}=3{,}99$ s⁻¹ (máx. amplitud)', '@1 $\\omega_{RP}=4$ s⁻¹ (máx. potencia)', '@2 $A(0)=4$ cm', '@3 a) amplitud máxima estacionaria', '@3 b) cesa la fuerza: ¿cuándo pierde el 70 % de la energía?'], [
    ['Este es el enunciado. Vamos con los datos.'],
    ['Un oscilador forzado tiene su resonancia de amplitud en tres coma nueve nueve por segundo, y la de potencia en cuatro.'],
    ['Con frecuencia cero, o sea con una fuerza constante, la amplitud sería cuatro centímetros. No dan la masa, ni k, ni F cero: no hacen falta.'],
    ['Piden la amplitud máxima en régimen estacionario, y cuánto tarda la energía en bajar un setenta por ciento cuando cesa la fuerza.'],
  ], { maxH: 430 }),

  K.molde('Ejercicio 3 de la hoja: **forzado, Q y estacionario**. Su nota dice: "si dan $\\omega_{RA}$ y $\\omega_{RP}$: $\\omega_0=\\omega_{RP}$, $\\omega_{RA}^2=\\omega_0^2-2\\gamma^2$; $A(0)=\\frac{F_0}{m\\omega_0^2}$; si cesa la fuerza, $E=E_0e^{-2\\gamma t}$".',
    ['$\\omega_0=\\omega_{RP}$; $\\gamma$ desde $\\omega_{RA}$', 'Amplitud con $A(\\omega)$', 'Libre: $E=E_0e^{-2\\gamma t}$'],
    ['No hay $m$ ni $F_0$: se trabaja con $F_0/m$', 'Se pide la amplitud **máxima** (en $\\omega_{RA}$)'],
    [['El molde es el ejercicio tres de la hoja. Su nota final es justo este caso: dos resonancias, la amplitud a frecuencia cero, y la energía cuando cesa la fuerza.'],
     ['Se repite: omega cero es la de potencia, gama sale de la de amplitud, y la energía libre cae con e a la menos dos gama t.'],
     ['Cambia que no hay masa ni fuerza: se trabaja con F cero sobre m.']]),

  K.S('Teoría', 'La curva de resonancia de este oscilador', `<div style="display:grid;grid-template-columns:600px 1fr;gap:30px;align-items:center">${eqs([
      { t: 'A(\\omega)=\\frac{F_0/m}{\\sqrt{(\\omega_0^2-\\omega^2)^2+(2\\gamma\\omega)^2}}', s: 0 },
      { t: 'A(0)=\\frac{F_0/m}{\\omega_0^2}=\\frac{F_0}{k}', s: 1 },
      { t: '\\omega_{RA}=\\sqrt{\\omega_0^2-2\\gamma^2}\\qquad\\omega_{RP}=\\omega_0', s: 2 },
    ])}
      ${plot({ w: 1080, h: 500, x: [0, 6], y: [0, 44], ticksX: [0, 2, 3.99, 6], ticksY: [0, 4, 20, 40.1], fmtX: v => String(v).replace('.', ','), fmtY: v => String(v).replace('.', ','), xl: 'ω (1/s)', yl: 'A (cm)', id: 'os5-a', s: 0,
        curves: [{ f: Acm, n: 1500, id: 'os5-ac' }],
        extra: (px, py) => `<circle class="dot" cx="${px(0)}" cy="${py(4)}" r="11"/><text class="lbl c3" x="${px(0.15)}" y="${py(7)}">A(0) = 4 cm</text><circle class="dot" cx="${px(3.99)}" cy="${py(40.08)}" r="11"/><text class="lbl c3" x="${px(3.99) + 18}" y="${py(40)}">A_max ≈ 40 cm</text>` })}</div>`, [
    ['La amplitud estacionaria depende de omega con esta fórmula.', `sweep('#os5-a #os5-ac',{dur:2600})`],
    ['Con omega igual a cero, la fuerza es constante: la amplitud es F cero sobre m, dividido omega cero al cuadrado, que es F cero sobre k. Es el estiramiento estático.'],
    ['El pico está en la resonancia de amplitud, un poquito antes de omega cero. Y la resonancia de potencia está justo en omega cero. [A] ¿La amplitud llega a ser diez veces la estática? [P] Aproximadamente Q veces. Lo vamos a comprobar.'],
  ]),

  K.S('Pasos', 'ω₀, γ, ω′ y F₀/m', `<div class="grid g2" style="align-items:center">${eqs([
      { t: '\\omega_0=\\omega_{RP}=4\\ \\text{s}^{-1}', s: 0 },
      { t: '\\gamma^2=\\frac{\\omega_0^2-\\omega_{RA}^2}{2}=\\frac{16-15{,}9201}{2}=0{,}03995', s: 1 },
      { t: "\\gamma=0{,}19987\\ \\text{s}^{-1}\\qquad\\omega'=\\sqrt{16-0{,}03995}=3{,}995", s: 2, cls: 'ok' },
      { t: '\\frac{F_0}{m}=A(0)\\,\\omega_0^2=0{,}04\\cdot16=0{,}64\\ \\text{m/s}^2', s: 3, cls: 'ok' },
    ])}${callout('Guardar $3{,}99^2=15{,}9201$ con todos los decimales: $\\gamma$ sale de una resta chica.', { s: 1, cls: 'warn' })}</div>`, [
    ['Paso uno: la resonancia de potencia es omega cero: cuatro.'],
    ['Paso dos: de la de amplitud, gama al cuadrado es omega cero al cuadrado menos tres coma nueve nueve al cuadrado, sobre dos. Dieciséis menos quince coma nueve dos cero uno: cero coma cero siete nueve nueve, sobre dos.'],
    ['Gama es cero coma dos por segundo, y omega prima, tres coma nueve nueve cinco. [A] ¿No era omega prima la de resonancia de amplitud? [P] No: omega prima tiene un gama al cuadrado; la de amplitud tiene dos. Si las confundís, gama sale raíz de dos veces más grande.'],
    ['Paso cuatro: de la amplitud a frecuencia cero, F cero sobre m es A cero por omega cero al cuadrado: cero coma cero cuatro por dieciséis, cero coma sesenta y cuatro.'],
  ]),

  K.S('a) Amplitud máxima', 'La amplitud en la resonancia de amplitud', `<div class="grid g2" style="align-items:center">${eqs([
      { t: "A_{max}=\\frac{F_0/m}{2\\gamma\\omega'}=\\frac{0{,}64}{2\\cdot0{,}19987\\cdot3{,}995}", s: 0 },
      { t: 'A_{max}=\\frac{0{,}64}{1{,}597}=0{,}4008\\ \\text{m}', s: 0, cls: 'ok' },
      { t: 'Q=\\frac{\\omega_0}{2\\gamma}=10{,}0\\ \\Rightarrow\\ Q\\,A(0)=40\\ \\text{cm}\\ \\checkmark', s: 1 },
    ])}${res('a) $A_{max}\\approx40{,}1$ cm', { s: 0 })}</div>`, [
    ['Ítem a. En la resonancia de amplitud, la amplitud vale F cero sobre m, dividido dos gama omega prima. Cero coma sesenta y cuatro sobre uno coma cinco nueve siete: cero coma cuatro metros, cuarenta centímetros.'],
    ['Control: Q es omega cero sobre dos gama, diez. Y Q por la amplitud estática da cuarenta centímetros. Cierra: con poco amortiguamiento, la amplitud máxima es unas Q veces la estática.'],
  ]),

  K.S('b) Cesa la fuerza', '¿Cuándo pierde el 70 % de la energía?', `<div style="display:grid;grid-template-columns:600px 1fr;gap:30px;align-items:center">${eqs([
      { t: 'E=E_0\\,e^{-2\\gamma t}', s: 0 },
      { t: 'e^{-2\\gamma t}=0{,}3\\ \\Rightarrow\\ t=\\frac{\\ln(1/0{,}3)}{2\\gamma}=\\frac{1{,}204}{0{,}3997}', s: 1 },
      { t: 't=3{,}01\\ \\text{s}', s: 1, cls: 'ok' },
      { t: '\\text{(si "queda el 70 \\%": }t=0{,}892\\ \\text{s)}', s: 2 },
    ])}
      ${plot({ w: 1080, h: 480, x: [0, 6], y: [0, 1.05], ticksX: [0, 0.892, 3.01, 6], ticksY: [0, 0.3, 0.7, 1], fmtX: v => String(v).replace('.', ','), fmtY: v => String(v).replace('.', ','), xl: 't (s)', yl: 'E / E₀', id: 'os5-e', s: 0,
        curves: [{ f: t => Math.exp(-2 * g * t), id: 'os5-ec' }, { f: () => 0.3, cls: 'c3 dash', id: 'os5-e3' }],
        extra: (px, py) => `<circle class="dot" cx="${px(3.01)}" cy="${py(0.3)}" r="11"/><text class="lbl c3" x="${px(3.01) + 16}" y="${py(0.3) - 16}">queda 30 %: 3,01 s</text>` })}</div>`, [
    ['Ítem b. Sin fuerza, el oscilador queda libre y la energía cae como e a la menos dos gama t.', `sweep('#os5-e #os5-ec',{dur:2200}); sweep('#os5-e #os5-e3',{delay:1600,dur:900})`],
    ['Disminuir un setenta por ciento es perder el setenta: queda el treinta. e a la menos dos gama t igual a cero coma tres da t igual a logaritmo de uno sobre cero coma tres, sobre dos gama: tres segundos.'],
    ['Si alguien lo leyera como que la energía baja hasta el setenta por ciento, daría cero coma ocho nueve segundos, pero esa lectura es menos natural. [A] ¿Y si uso e a la menos gama t? [P] Esa es la amplitud: te daría el doble, seis segundos.'],
  ]),

  K.trampas([
    '**$\\omega_0$ es la de potencia** (4), no la de amplitud.',
    "**$\\omega_{RA}^2=\\omega_0^2-2\\gamma^2$**, no $\\omega_0^2-\\gamma^2$ (eso es $\\omega'$).",
    '**$A(0)=F_0/k=\\frac{F_0/m}{\\omega_0^2}$**, no $F_0/m$.',
    '**Energía: $e^{-2\\gamma t}$** (con $e^{-\\gamma t}$ da 6,02 s).',
    '**"Disminuye 70 %" = queda el 30 %.** Pasar 4 cm a 0,04 m.',
  ], [
    ['Las trampas. Primera: omega cero es la resonancia de potencia.'],
    ['Segunda: en la de amplitud hay dos gama cuadrado.'],
    ['Tercera: la amplitud a frecuencia cero es F cero sobre k, no F cero sobre m.'],
    ['Cuarta: la energía va con dos gama.'],
    ['Y quinta: disminuir un setenta por ciento quiere decir que queda el treinta.'],
  ]),

  K.receta([
    '**1.** $\\omega_0=\\omega_{RP}$; $\\gamma^2=(\\omega_0^2-\\omega_{RA}^2)/2$.',
    '**2.** $F_0/m=A(0)\\,\\omega_0^2$.',
    "**3.** $A_{max}=\\frac{F_0/m}{2\\gamma\\omega'}$ (control: $\\approx Q\\,A(0)$).",
    '**4.** Libre: $e^{-2\\gamma t}$ = fracción que queda.',
  ], ['$\\omega_0=4$; $\\gamma=0{,}200$ s⁻¹; $Q=10$', 'a) $A_{max}=0{,}401$ m ≈ 40 cm', 'b) $t=3{,}01$ s (0,892 s si queda el 70 %)'], [
    ['La receta. Uno: omega cero y gama con las dos resonancias.'],
    ['Dos: F cero sobre m con la amplitud estática.'],
    ['Tres: la amplitud máxima, con el control de Q.'],
    ['Cuatro: la energía libre.'],
    ['Resultados: cuarenta centímetros y tres segundos.'],
  ]),
];
