import json
import re

# Load existing guia-bank-fql-19ago.js
with open('guia-bank-fql-19ago.js', 'r', encoding='utf-8') as f:
    text = f.read()

json_text = text.replace('window.GUIA_BANK_FQL_19AGO = ', '').rstrip(';\n ')
bank = json.loads(json_text)

# We will modify bank['fis'] (40 questions: 20 for Intento 1, 20 for Intento 2)
# Let's inspect the questions to transform in Intento 1 and Intento 2

fis = bank['fis']

# =========================================================================
# INTENTO 1: AJUSTAR A 16 TEORÍA / 4 CÁLCULO
# Cálculos mantenidos (4):
#  - fis-19ago-12 (Sombra y trigonometría: H = 2\sqrt{3} m)
#  - fis-19ago-13 (Rozamiento estático vs cinético: fs = 25 N, fk = 15 N)
#  - fis-19ago-17 (Potencia motor: P = 2000 W)
#  - fis-19ago-20 (Conservación cantidad movimiento patinadores: v = 2 m/s)
#
# Transformar a Teórica Conceptual (5):
#  - fis-19ago-14 (Camión y Auto: 3ra Ley y aceleración por inercia)
#  - fis-19ago-15 (MCU: aceleración centrípeta vs rapidez constante)
#  - fis-19ago-16 (Curva circular: fricción estática como fuerza centrípeta real)
#  - fis-19ago-18 (Gravedad en otro planeta: masa invariable vs peso variable)
#  - fis-19ago-19 (Fuerza neta y resistencia del aire: velocidad terminal)
# =========================================================================

# fis-19ago-14
fis[13] = {
    "id": "fis-19ago-14",
    "s": "fis",
    "n": 14,
    "d": "intermedio",
    "topics": ["2.2.1-leyesNewton"],
    "ch": "fis-F02",
    "t": "Tercera Ley y Aceleración por Inercia",
    "prompt": "Un camión pesado de $3000\\text{ kg}$ empuja horizontalmente a un automóvil pequeño averiado de $1000\\text{ kg}$ sobre una pista lisa, acelerando juntos hacia adelante. Respecto a las fuerzas de contacto y las aceleraciones:",
    "opts": [
        "El camión ejerce sobre el automóvil una fuerza de mayor magnitud que la que el automóvil ejerce sobre el camión.",
        "La fuerza que el camión ejerce sobre el automóvil tiene exactamente la misma magnitud que la fuerza que el automóvil ejerce sobre el camión, y ambos adquieren la misma aceleración.",
        "El automóvil ejerce una fuerza de reacción nula porque su masa es tres veces menor.",
        "La aceleración del automóvil es tres veces mayor que la del camión porque están en contacto."
    ],
    "ans": 1,
    "exp": "**Paso 1. Tercera Ley de Newton (Acción y Reacción):** Toda interacción entre dos cuerpos $A$ (camión) y $B$ (automóvil) genera un par de fuerzas de igual magnitud ($|\\vec{F}_{AB}| = |\\vec{F}_{BA}|$) y sentido opuesto, sin importar sus masas.\n**Paso 2. Análisis del movimiento conjunto:** Al estar en contacto y desplazarse unidos, ambos vehículos comparten idéntica aceleración instantánea $\\vec{a}$.\n**Paso 3. Conclusión:** Las fuerzas de interacción mutua son idénticas en magnitud y la aceleración del conjunto es la misma.\n**Respuesta correcta: B.**",
    "maths": ["|\\vec{F}_{AB}| = |\\vec{F}_{BA}|"],
    "imgs": []
}

# fis-19ago-15
fis[14] = {
    "id": "fis-19ago-15",
    "s": "fis",
    "n": 15,
    "d": "intermedio",
    "topics": ["2.1.2-mcu"],
    "ch": "fis-F01",
    "t": "Naturaleza de la Aceleración en MCU",
    "prompt": "Una partícula describe un Movimiento Circular Uniforme (MCU) con rapidez tangencial constante. ¿Cuál afirmación describe con rigor físico sus vectores cinemáticos?",
    "opts": [
        "No tiene aceleración porque su rapidez es constante.",
        "Tiene aceleración tangencial nula ($a_t = 0$), pero posee aceleración centrípeta ($a_c = \\frac{v^2}{R}$) dirigida radialmente hacia el centro debido al continuo cambio de dirección de la velocidad.",
        "La aceleración total apunta en la misma dirección y sentido del vector velocidad tangencial.",
        "La velocidad angular $\\omega$ cambia de dirección en cada cuarto de vuelta."
    ],
    "ans": 1,
    "exp": "**Paso 1. Concepto de vector velocidad:** En MCU la magnitud (rapidez) es constante, lo que implica aceleración tangencial nula ($a_t = 0$).\n**Paso 2. Aceleración centrípeta:** La dirección del vector velocidad varía instante a instante; este cambio en orientación genera una aceleración normal o centrípeta dirigida hacia el centro ($a_c = \\frac{v^2}{R}$).",
    "maths": ["a_t = 0", "a_c = \\frac{v^2}{R}"],
    "imgs": []
}

# fis-19ago-16
fis[15] = {
    "id": "fis-19ago-16",
    "s": "fis",
    "n": 16,
    "d": "intermedio",
    "topics": ["2.1.2-mcu", "2.2.1-leyesNewton"],
    "ch": "fis-F02",
    "t": "Fuerza Centrípeta Real en un Viraje Plano",
    "prompt": "Cuando un automóvil toma una curva circular en una carretera horizontal plana no peraltada sin derrapar, ¿cuál es la fuerza física real que provee la fuerza centrípeta necesaria para el giro?",
    "opts": [
        "La fuerza centrífuga que empuja al vehículo hacia afuera.",
        "La fuerza de rozamiento estático entre los neumáticos y el asfalto, dirigida hacia el centro de curvatura.",
        "La componente horizontal de la fuerza gravitatoria.",
        "La fuerza normal ejercida por el pavimento hacia arriba."
    ],
    "ans": 1,
    "exp": "**Paso 1. Fuerzas reales en marco inercial:** Sobre el auto actúan el peso (vertical hacia abajo), la normal (vertical hacia arriba) y el rozamiento con el suelo.\n**Paso 2. Origen de la fuerza centrípeta:** Al girar en plano horizontal sin peralte, la única fuerza con componente horizontal hacia el centro es la fuerza de fricción estática entre los neumáticos y la calzada ($f_s = m\\frac{v^2}{R}$).\n**Paso 3. Descarte:** La fuerza centrífuga es una fuerza ficticia que solo aparece en marcos no inerciales.\n**Respuesta correcta: B.**",
    "maths": ["f_s = m\\frac{v^2}{R}"],
    "imgs": []
}

# fis-19ago-18
fis[17] = {
    "id": "fis-19ago-18",
    "s": "fis",
    "n": 18,
    "d": "intermedio",
    "topics": ["2.2.1-leyesNewton", "2.2.4-gravitacion"],
    "ch": "fis-F02",
    "t": "Invarianza de la Masa vs Variabilidad del Peso",
    "prompt": "Un astronauta transporta una roca de $2.5\\text{ kg}$ desde la Tierra hasta la superficie de la Luna, donde la aceleración de la gravedad es aproximadamente $\\frac{1}{6}$ de la terrestre. Al medir la roca en la Luna:",
    "opts": [
        "Tanto la masa como el peso se reducen a la sexta parte.",
        "La masa permanece exactamente en $2.5\\text{ kg}$, mientras que su peso disminuye a $\\frac{1}{6}$ de su valor terrestre.",
        "El peso permanece constante pero la inercia de la roca disminuye.",
        "La masa aumenta porque la gravedad lunar ofrece menor resistencia."
    ],
    "ans": 1,
    "exp": "**Paso 1. Masa inercial:** La masa es una propiedad intrínseca del cuerpo (cantidad de materia e inercia) y es invariable sin importar el lugar del universo ($m = 2.5\\text{ kg}$). \n**Paso 2. Peso:** El peso $P = m g$ depende directamente de la gravedad local, reduciéndose a $P_{\\text{Luna}} = \\frac{1}{6}P_{\\text{Tierra}}$.\n**Respuesta correcta: B.**",
    "maths": ["P = mg", "P_{\\text{Luna}} = \\frac{1}{6}P_{\\text{Tierra}}"],
    "imgs": []
}

# fis-19ago-19
fis[18] = {
    "id": "fis-19ago-19",
    "s": "fis",
    "n": 19,
    "d": "intermedio",
    "topics": ["2.2.1-leyesNewton"],
    "ch": "fis-F02",
    "t": "Fuerza Neta y Aceleración en Caída",
    "prompt": "Un objeto de $1.0\\text{ kg}$ se lanza verticalmente hacia abajo adquiriendo una aceleración inicial conocida de $3.0\\text{ m/s}^2$ en un medio resistivo. De acuerdo con la Segunda Ley de Newton, la fuerza neta resultante que actúa sobre el objeto es:",
    "opts": [
        "$9.8\\text{ N}$ hacia abajo.",
        "$3.0\\text{ N}$ hacia abajo.",
        "$12.8\\text{ N}$ hacia arriba.",
        "$0.33\\text{ N}$ hacia abajo."
    ],
    "ans": 1,
    "exp": "**Paso 1. Segunda Ley de Newton:** La fuerza neta total es el producto de la masa por la aceleración resultante real del cuerpo: $F_{\\text{neta}} = m \\cdot a$.\n**Paso 2. Sustitución:** $F_{\\text{neta}} = (1.0\\text{ kg})(3.0\\text{ m/s}^2) = 3.0\\text{ N}$.\n**Paso 3. Alerta de examen:** No confundas el peso bruto ($mg = 9.8\\text{ N}$) con la fuerza neta resultante cuando existen fuerzas resistentes.\n**Respuesta correcta: B.**",
    "maths": ["F_{\\text{neta}} = ma = (1.0)(3.0) = 3.0\\text{ N}"],
    "imgs": []
}


# =========================================================================
# INTENTO 2: AJUSTAR A 16 TEORÍA / 4 CÁLCULO
# Cálculos mantenidos (4):
#  - fis-19ago-24 (Semáforo estática: T = 100 N)
#  - fis-19ago-26 (Ley de Hooke: k = 400 N/m, F = 60 N)
#  - fis-19ago-30 (Choque inelástico: vf = 2.0 m/s)
#  - fis-19ago-34 (Teorema trabajo-energía: W = 80 J)
#
# Transformar a Teórica Conceptual (10):
#  - fis-19ago-23 (Salto vertical: simetría y aceleración en el aire)
#  - fis-19ago-27 (Proyectil: independencia de movimientos vx cte y vy variable)
#  - fis-19ago-28 (Gráfica v-t: significado conceptual del área y pendiente)
#  - fis-19ago-31 (Impulso: relación tiempo de contacto vs fuerza media)
#  - fis-19ago-32 (Distancia de frenado: proporcionalidad cuadrática d \propto v^2)
#  - fis-19ago-33 (Ángulo crítico de inclinación: independencia de la masa)
#  - fis-19ago-35 (Rizo vertical: condición límite en cúspide N = 0)
#  - fis-19ago-37 (Dos bloques con cuerda: tensión interna vs fuerza externa)
#  - fis-19ago-38 (Potencia: trabajo por unidad de tiempo y velocidad constante)
#  - fis-19ago-40 (MCU: relación entre velocidad angular, frecuencia y período)
# =========================================================================

# fis-19ago-23
fis[22] = {
    "id": "fis-19ago-23",
    "s": "fis",
    "n": 23,
    "d": "intermedio",
    "topics": ["2.1.1-mruv"],
    "ch": "fis-F01",
    "t": "Simetría Temporal y Aceleración en Salto Vertical",
    "prompt": "Un atleta realiza un salto vertical en el aire. Despreciando la resistencia del aire, ¿cuál afirmación describe correctamente su movimiento?",
    "opts": [
        "El tiempo de subida es menor que el de bajada porque la gravedad frena más rápido de lo que acelera.",
        "El tiempo de subida es exactamente igual al tiempo de bajada, y la aceleración apunta hacia abajo con magnitud constante $g$ en todo instante.",
        "En el punto más alto la aceleración se anula instantáneamente.",
        "La rapidez al retornar al suelo es el doble de la rapidez de despegue."
    ],
    "ans": 1,
    "exp": "**Paso 1. Simetría cinemática:** En ausencia de fricción, la desaceleración durante el ascenso es simétrica a la aceleración durante el descenso ($t_{\\text{subida}} = t_{\\text{bajada}}$).\n**Paso 2. Invarianza de la aceleración:** La gravedad $g = 9.8\\text{ m/s}^2$ actúa de forma ininterrumpida hacia abajo en toda la trayectoria, incluso en el punto más alto.\n**Respuesta correcta: B.**",
    "maths": ["t_{\\text{subida}} = t_{\\text{bajada}}", "a = g"],
    "imgs": []
}

# fis-19ago-27
fis[26] = {
    "id": "fis-19ago-27",
    "s": "fis",
    "n": 27,
    "d": "intermedio",
    "topics": ["2.1.3-parabolico"],
    "ch": "fis-F01",
    "t": "Independencia de Componentes en Tiro Parabólico",
    "prompt": "En el lanzamiento de un proyectil con ángulo de elevación $\\theta$ respecto a la horizontal (despreciando el rozamiento con el aire), ¿cómo evolucionan sus componentes de velocidad?",
    "opts": [
        "Ambas componentes ($v_x$ y $v_y$) disminuyen uniformemente hasta anularse en el ápice.",
        "La componente horizontal $v_x$ permanece constante durante todo el vuelo, mientras que la componente vertical $v_y$ varía linealmente con la gravedad ($v_y = v_{0y} - gt$).",
        "La componente horizontal $v_x$ se acelera continuamente hacia adelante.",
        "En el punto más alto ambas componentes de velocidad son nulas."
    ],
    "ans": 1,
    "exp": "**Paso 1. Principio de independencia de Galileo:** El movimiento horizontal no tiene fuerzas netas ($a_x = 0 \\implies v_x = \\text{constante}$). \n**Paso 2. Eje vertical:** Experimenta la aceleración constante de la gravedad ($a_y = -g \\implies v_y = v_{0y} - gt$).\n**Respuesta correcta: B.**",
    "maths": ["v_x = v_0\\cos\\theta = \\text{cte}", "v_y = v_0\\sin\\theta - gt"],
    "imgs": []
}

# fis-19ago-28
fis[27] = {
    "id": "fis-19ago-28",
    "s": "fis",
    "n": 28,
    "d": "intermedio",
    "topics": ["2.1.1-mruv"],
    "ch": "fis-F01",
    "t": "Significado Geométrico del Área en Gráfica v-t",
    "prompt": "En cualquier gráfica de velocidad en función del tiempo ($v$ vs $t$) para un móvil en movimiento rectilíneo, el área geométrica comprendida entre la curva de velocidad y el eje temporal representa conceptualmente:",
    "opts": [
        "La aceleración instantánea del móvil.",
        "El desplazamiento neto ($\\Delta x$) realizado por el móvil en dicho intervalo.",
        "La fuerza neta aplicada sobre el cuerpo.",
        "La energía potencial gravitatoria acumulada."
    ],
    "ans": 1,
    "exp": "**Paso 1. Análisis dimensional:** El producto de los ejes es $(\\text{m/s}) \\times (\\text{s}) = \\text{m}$ (unidad de longitud/desplazamiento).\n**Paso 2. Propiedad fundamental:** En una gráfica $v-t$, el área bajo la curva es el desplazamiento neto $\\Delta x$, mientras que la pendiente de la recta tangente es la aceleración instantánea $a$.\n**Respuesta correcta: B.**",
    "maths": ["\\text{Área}(v-t) = \\Delta x", "\\text{Pendiente}(v-t) = a"],
    "imgs": []
}

# fis-19ago-31
fis[30] = {
    "id": "fis-19ago-31",
    "s": "fis",
    "n": 31,
    "d": "intermedio",
    "topics": ["2.2.3-impulso"],
    "ch": "fis-F02",
    "t": "Teorema del Impulso y Duración del Impacto",
    "prompt": "Durante el choque de una pelota contra un bate, para un cambio de cantidad de movimiento dado ($\\Delta p = \\text{constante}$), si se reduce el tiempo de contacto $\\Delta t$ a la mitad, la fuerza media de impacto:",
    "opts": [
        "Se reduce a la mitad.",
        "Se duplica (aumenta al doble).",
        "Permanece exactamente igual.",
        "Se reduce a la cuarta parte."
    ],
    "ans": 1,
    "exp": "**Paso 1. Teorema del impulso:** $\\vec{J} = \\vec{F}_{\\text{media}} \\Delta t = \\Delta \\vec{p} \\implies \\vec{F}_{\\text{media}} = \\frac{\\Delta \\vec{p}}{\\Delta t}$.\n**Paso 2. Relación de proporcionalidad:** A menor tiempo de interacción $\\Delta t$, mayor es la fuerza media de impacto generada. Si $\\Delta t$ se divide por 2, la fuerza media se duplica.\n**Respuesta correcta: B.**",
    "maths": ["F_{\\text{media}} = \\frac{\\Delta p}{\\Delta t}"],
    "imgs": []
}

# fis-19ago-32
fis[31] = {
    "id": "fis-19ago-32",
    "s": "fis",
    "n": 32,
    "d": "intermedio",
    "topics": ["2.1.1-mruv", "2.2.2-trabajoEnergia"],
    "ch": "fis-F02",
    "t": "Relación Cuadrática en la Distancia de Frenado",
    "prompt": "Un automóvil que viaja con rapidez inicial $v$ aplica sus frenos produciendo una desaceleración constante $a$ hasta detenerse en una distancia $d$. Si el mismo automóvil viaja al doble de rapidez inicial ($2v$), la distancia mínima de frenado requerida será:",
    "opts": [
        "El doble ($2d$).",
        "El cuádruple ($4d$).",
        "Ocho veces mayor ($8d$).",
        "La misma distancia $d$ si los frenos son eficientes."
    ],
    "ans": 1,
    "exp": "**Paso 1. Cinemática / Trabajo y Energía:** Por Torricelli: $v_f^2 = v_0^2 - 2ad \\implies 0 = v_0^2 - 2ad \\implies d = \\frac{v_0^2}{2a}$.\n**Paso 2. Escalamiento:** La distancia de frenado es proporcional al cuadrado de la rapidez inicial ($d \\propto v_0^2$). Si $v_0$ se duplica, $(2)^2 = 4$, por lo que la distancia se cuadruplica ($4d$).\n**Respuesta correcta: B.**",
    "maths": ["d = \\frac{v_0^2}{2a} \\implies d \\propto v_0^2"],
    "imgs": []
}

# fis-19ago-33
fis[32] = {
    "id": "fis-19ago-33",
    "s": "fis",
    "n": 33,
    "d": "intermedio",
    "topics": ["2.2.1-leyesNewton"],
    "ch": "fis-F02",
    "t": "Ángulo Crítico de Deslizamiento e Independencia de Masa",
    "prompt": "Se coloca un bloque sobre un plano y se inclina gradualmente el ángulo $\\theta$. En el momento exacto en que el bloque está a punto de deslizar (equilibrio límite):",
    "opts": [
        "El coeficiente de rozamiento estático depende exclusivamente de la masa del bloque.",
        "El coeficiente de rozamiento estático es igual a la tangente del ángulo crítico ($\\mu_s = \\tan\\theta$) y es completamente independiente de la masa del bloque.",
        "La fuerza normal se hace mayor que el peso total.",
        "La fuerza de rozamiento estático se vuelve nula."
    ],
    "ans": 1,
    "exp": "**Paso 1. Equilibrio en plano inclinado:** $\\sum F_x = mg\\sin\\theta - f_s = 0$ y $\\sum F_y = N - mg\\cos\\theta = 0$.\n**Paso 2. Condición límite:** $f_{s,\\text{máx}} = \\mu_s N = \\mu_s mg\\cos\\theta$. Igualando: $mg\\sin\\theta = \\mu_s mg\\cos\\theta \\implies \\mu_s = \\tan\\theta$.\n**Paso 3. Conclusión:** La masa $m$ y la gravedad $g$ se cancelan, demostrando que el ángulo crítico depende solo de los materiales en contacto.\n**Respuesta correcta: B.**",
    "maths": ["\\mu_s = \\tan\\theta"],
    "imgs": []
}

# fis-19ago-35
fis[34] = {
    "id": "fis-19ago-35",
    "s": "fis",
    "n": 35,
    "d": "intermedio",
    "topics": ["2.1.2-mcu", "2.2.1-leyesNewton"],
    "ch": "fis-F02",
    "t": "Condición Crítica en la Cúspide de un Rizo Vertical",
    "prompt": "Para que un carrito de montaña rusa complete un rizo circular vertical de radio $R$ sin despegarse de la vía en el punto más alto, la condición física límite de rapidez mínima ($v_{\\text{mín}} = \\sqrt{gR}$) ocurre cuando:",
    "opts": [
        "La fuerza normal ejercida por el riel se anula ($N = 0$) y el peso actúa enteramente como la fuerza centrípeta requerida.",
        "La aceleración centrípeta es exactamente cero.",
        "La energía cinética es el triple de la energía potencial.",
        "La fuerza centrífuga supera el peso del vehículo."
    ],
    "ans": 0,
    "exp": "**Paso 1. Dinámica en el punto más alto:** En la cima del rizo, tanto el peso como la normal apuntan hacia el centro: $P + N = m\\frac{v^2}{R}$.\n**Paso 2. Rapidez mínima (despegue inminente):** La condición crítica ocurre cuando la vía deja de presionar al carrito ($N = 0$), quedando $mg = m\\frac{v^2}{R} \\implies v_{\\text{mín}} = \\sqrt{gR}$.\n**Respuesta correcta: A.**",
    "maths": ["N = 0 \\implies mg = m\\frac{v^2}{R} \\implies v_{\\text{mín}} = \\sqrt{gR}"],
    "imgs": []
}

# fis-19ago-37
fis[36] = {
    "id": "fis-19ago-37",
    "s": "fis",
    "n": 37,
    "d": "intermedio",
    "topics": ["2.2.1-leyesNewton"],
    "ch": "fis-F02",
    "t": "Tensión en Cuerda Intermedia entre Dos Bloques",
    "prompt": "Dos bloques $A$ ($3\\text{ kg}$) y $B$ ($2\\text{ kg}$) están unidos por una cuerda ligera sobre una mesa horizontal sin fricción. Si se aplica una fuerza externa horizontal constante $F$ sobre el bloque $A$ para acelerar el sistema hacia adelante:",
    "opts": [
        "La tensión en la cuerda que une a los bloques es igual a la fuerza externa total $F$.",
        "La tensión en la cuerda intermedia es menor que la fuerza externa total $F$, ya que la cuerda solo es responsable de acelerar al bloque posterior $B$.",
        "La tensión en la cuerda intermedia es nula porque la mesa no tiene fricción.",
        "El bloque $B$ experimenta el doble de aceleración que el bloque $A$."
    ],
    "ans": 1,
    "exp": "**Paso 1. Segunda ley al sistema conjunto:** $F = (m_A + m_B)a \\implies a = \\frac{F}{m_A + m_B}$.\n**Paso 2. Segunda ley al bloque posterior $B$:** La única fuerza horizontal que acelera a $B$ es la tensión: $T = m_B a = F \\left(\\frac{m_B}{m_A + m_B}\\right) < F$.\n**Paso 3. Conclusión:** La tensión en la cuerda interior siempre es una fracción de la fuerza externa total aplicada.\n**Respuesta correcta: B.**",
    "maths": ["T = F\\left(\\frac{m_B}{m_A + m_B}\\right) < F"],
    "imgs": []
}

# fis-19ago-38
fis[37] = {
    "id": "fis-19ago-38",
    "s": "fis",
    "n": 38,
    "d": "intermedio",
    "topics": ["2.2.2-trabajoEnergia"],
    "ch": "fis-F02",
    "t": "Concepto de Potencia Mecánica a Rapidez Constante",
    "prompt": "Si una máquina eleva una carga pesada verticalmente a velocidad constante $v$, la potencia mecánica media entregada por el motor se expresa conceptualmente como:",
    "opts": [
        "El producto de la fuerza gravitatoria por la aceleración del sistema.",
        "El producto de la fuerza de tracción (igual al peso) por la velocidad instantánea ($P = F \\cdot v = mg \\cdot v$).",
        "El cociente entre la energía potencial y la distancia recorrida.",
        "La mitad de la masa multiplicada por el cuadrado del tiempo."
    ],
    "ans": 1,
    "exp": "**Paso 1. Definición de potencia:** $P = \\frac{W}{\\Delta t} = \\frac{F d}{\\Delta t} = F \\cdot v$.\n**Paso 2. Equilibrio dinámico:** Al subir a velocidad constante ($a = 0$), la fuerza de tracción equilibra exactamente al peso ($F = mg$), por lo que $P = mg \\cdot v$.\n**Respuesta correcta: B.**",
    "maths": ["P = F \\cdot v = mg \\cdot v"],
    "imgs": []
}

# fis-19ago-40
fis[39] = {
    "id": "fis-19ago-40",
    "s": "fis",
    "n": 40,
    "d": "intermedio",
    "topics": ["2.1.2-mcu"],
    "ch": "fis-F01",
    "t": "Relación entre Período, Frecuencia y Velocidad Angular",
    "prompt": "En un movimiento circular uniforme, si un cuerpo duplica su frecuencia de rotación ($f' = 2f$), ¿cómo cambian su período ($T$) y su velocidad angular ($\\omega$)?",
    "opts": [
        "El período se duplica y la velocidad angular se reduce a la mitad.",
        "El período se reduce a la mitad ($T' = \\frac{T}{2}$) y la velocidad angular se duplica ($\\omega' = 2\\omega$).",
        "Tanto el período como la velocidad angular se cuadruplican.",
        "La velocidad angular permanece constante porque depende del radio."
    ],
    "ans": 1,
    "exp": "**Paso 1. Relación fundamental de período y frecuencia:** $T = \\frac{1}{f}$. Si la frecuencia $f$ se duplica, el período $T$ se reduce a la mitad ($T' = T/2$).\n**Paso 2. Velocidad angular:** $\\omega = 2\\pi f$. Como $\\omega$ es directamente proporcional a $f$, al duplicar $f$, $\\omega$ se duplica ($\\omega' = 2\\omega$).\n**Respuesta correcta: B.**",
    "maths": ["T = \\frac{1}{f}", "\\omega = 2\\pi f"],
    "imgs": []
}

# Save updated guia-bank-fql-19ago.js
with open('guia-bank-fql-19ago.js', 'w', encoding='utf-8') as f:
    f.write('window.GUIA_BANK_FQL_19AGO = ' + json.dumps(bank, indent=2, ensure_ascii=False) + ';\n')

print("Successfully updated guia-bank-fql-19ago.js with 16 Conceptual / 4 Calculation questions in BOTH Attempt 1 and Attempt 2!")
