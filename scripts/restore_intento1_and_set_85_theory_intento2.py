import json
import subprocess

# Retrieve the version of guia-bank-fql-19ago.js from commit 507be6e (before rebalance)
old_content = subprocess.check_output(['git', 'show', '507be6e:guia-bank-fql-19ago.js'], text=True, encoding='utf-8')
old_json_text = old_content.replace('window.GUIA_BANK_FQL_19AGO = ', '').rstrip(';\n ')
old_bank = json.loads(old_json_text)

# The original 20 physics questions for Intento 1:
original_intento1_fis = old_bank['fis'][:20]
print(f"Loaded original Intento 1 ({len(original_intento1_fis)} questions)")

# Intento 2: Exactly 17 conceptual (85%) / 3 calculations (15%)
intento2_fis = [
    # 21 (Teórica 1)
    {
        "id": "fis-19ago-21",
        "s": "fis",
        "n": 21,
        "d": "intermedio",
        "topics": ["2.2.2-trabajoEnergia"],
        "ch": "fis-F02",
        "t": "Pista de Patinaje y Puntos de Energía",
        "prompt": "En una pista de patinaje sin fricción con desniveles, un patinador desciende pasando por los puntos $A$ (más alto), $B$ (intermedio) y $C$ (el más bajo del valle). Despreciando el rozamiento, ¿dónde se alcanzan los valores máximos de energía potencial y rapidez?",
        "opts": [
            "Energía potencial máxima en A; rapidez máxima en C.",
            "Energía potencial máxima en C; rapidez máxima en A.",
            "Energía potencial y rapidez son constantes en todos los puntos.",
            "Rapidez máxima en B; energía potencial máxima en C."
        ],
        "ans": 0,
        "exp": "**Paso 1. Conservación de energía mecánica:** $E_m = E_p + E_c = \\text{constante}$.\n**Paso 2. Altura máxima:** En el punto más alto $A$, la energía potencial $E_p = mgh$ es máxima y la cinética es mínima.\n**Paso 3. Valle:** En el punto más bajo $C$ ($h = 0$), toda la energía potencial se ha convertido en energía cinética máxima, alcanzando la rapidez máxima ($v = \\sqrt{2gh}$).\n**Respuesta correcta: A.**",
        "maths": ["E_m = E_p + E_c = \\text{cte}", "v = \\sqrt{2gh}"],
        "imgs": []
    },
    # 22 (Teórica 2)
    {
        "id": "fis-19ago-22",
        "s": "fis",
        "n": 22,
        "d": "intermedio",
        "topics": ["2.2.2-trabajoEnergia"],
        "ch": "fis-F02",
        "t": "Trabajo de Fuerza Normal y Peso",
        "prompt": "Un cuerpo de masa $m$ se desplaza una distancia horizontal $d$ sobre un piso plano horizontal. ¿Cuál es el trabajo realizado por la fuerza normal y por la fuerza del peso durante este movimiento?",
        "opts": [
            "El trabajo de ambas fuerzas es $0\\text{ J}$ porque son estrictamente perpendiculares al desplazamiento horizontal.",
            "El peso realiza trabajo positivo y la normal trabajo negativo.",
            "La normal realiza trabajo $W = mgd$ y el peso $0\\text{ J}$.",
            "El trabajo depende de la velocidad del cuerpo."
        ],
        "ans": 0,
        "exp": "**Paso 1. Definición de trabajo:** $W = F d \\cos\\theta$.\n**Paso 2. Análisis del ángulo:** Tanto la normal (hacia arriba) como el peso (hacia abajo) forman un ángulo de $\\theta = 90^\\circ$ con el desplazamiento horizontal.\n**Paso 3. Cálculo:** Como $\\cos(90^\\circ) = 0$, el trabajo realizado por ambas fuerzas es exactamente $0\\text{ J}$.\n**Respuesta correcta: A.**",
        "maths": ["W = F d \\cos(90^\\circ) = 0\\text{ J}"],
        "imgs": []
    },
    # 23 (Teórica 3)
    {
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
    },
    # 24 (Cálculo 1)
    {
        "id": "fis-19ago-24",
        "s": "fis",
        "n": 24,
        "d": "intermedio",
        "topics": ["2.2.1-leyesNewton"],
        "ch": "fis-F02",
        "t": "Equilibrio con Cuerdas Simétricas",
        "prompt": "Un semáforo de peso $W = 100\\text{ N}$ cuelga en reposo sostenido simétricamente por dos cables que forman un ángulo de $30^\\circ$ con la horizontal cada uno. La tensión en cada cable es:",
        "opts": [
            "$T = 50\\text{ N}$",
            "$T = 100\\text{ N}$",
            "$T = 200\\text{ N}$",
            "$T = 57.7\\text{ N}$"
        ],
        "ans": 1,
        "exp": "**Paso 1. Condición de equilibrio en $y$:** $\\sum F_y = 0 \\implies 2T\\sin(30^\\circ) - W = 0$.\n**Paso 2. Sustitución de valores:** Como $\\sin(30^\\circ) = 0.5$, tenemos $2T(0.5) = W \\implies T = W = 100\\text{ N}$.\n**Respuesta correcta: B.**",
        "maths": ["2T\\sin(30^\\circ) = 100 \\implies T = 100\\text{ N}"],
        "imgs": []
    },
    # 25 (Teórica 4)
    {
        "id": "fis-19ago-25",
        "s": "fis",
        "n": 25,
        "d": "intermedio",
        "topics": ["2.2.2-trabajoEnergia"],
        "ch": "fis-F02",
        "t": "Energía Cinética y Proporcionalidad Cuadrática",
        "prompt": "Un vehículo de masa $m$ viaja con rapidez $v_0$ teniendo una energía cinética $E_0$. Si el conductor acelera hasta triplicar su rapidez ($3v_0$), su nueva energía cinética:",
        "opts": [
            "Se triplica en relación directa con la rapidez.",
            "Se incrementa a nueve veces su valor inicial debido a la dependencia cuadrática con la velocidad.",
            "Se multiplica por seis respecto al valor original.",
            "Permanece constante al conservarse la masa del vehículo."
        ],
        "ans": 1,
        "exp": "**Paso 1. Definición:** $E_c = \\frac{1}{2}m v^2$.\n**Paso 2. Proporcionalidad:** La energía cinética es directamente proporcional al cuadrado de la rapidez ($E_c \\propto v^2$). Si $v$ se multiplica por 3, $(3)^2 = 9$, por lo que la energía se multiplica por 9 ($9E_0$).\n**Respuesta correcta: B.**",
        "maths": ["E_c = \\frac{1}{2}m(3v_0)^2 = 9\\left(\\frac{1}{2}m v_0^2\\right) = 9E_0"],
        "imgs": []
    },
    # 26 (Cálculo 2)
    {
        "id": "fis-19ago-26",
        "s": "fis",
        "n": 26,
        "d": "intermedio",
        "topics": ["2.2.1-leyesNewton"],
        "ch": "fis-F02",
        "t": "Ley de Hooke y Constante Elástica",
        "prompt": "De acuerdo con la Ley de Hooke, un resorte ideal se alarga $0.05\\text{ m}$ cuando se le cuelga un bloque de $20\\text{ N}$. ¿Cuál es la constante elástica del resorte y qué fuerza se requiere para estirarlo $0.15\\text{ m}$?",
        "opts": [
            "$100\\text{ N/m}$ y $15\\text{ N}$",
            "$400\\text{ N/m}$ y $60\\text{ N}$",
            "$200\\text{ N/m}$ y $30\\text{ N}$",
            "$400\\text{ N/m}$ y $20\\text{ N}$"
        ],
        "ans": 1,
        "exp": "**Paso 1. Constante elástica:** $k = \\frac{F_1}{x_1} = \\frac{20\\text{ N}}{0.05\\text{ m}} = 400\\text{ N/m}$.\n**Paso 2. Fuerza para $0.15\\text{ m}$:** $F_2 = k x_2 = (400\\text{ N/m})(0.15\\text{ m}) = 60\\text{ N}$.\n**Respuesta correcta: B.**",
        "maths": ["k = \\frac{20}{0.05} = 400\\text{ N/m}", "F = 400 \\times 0.15 = 60\\text{ N}"],
        "imgs": []
    },
    # 27 (Teórica 5)
    {
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
    },
    # 28 (Teórica 6)
    {
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
    },
    # 29 (Teórica 7)
    {
        "id": "fis-19ago-29",
        "s": "fis",
        "n": 29,
        "d": "intermedio",
        "topics": ["2.1.1-mruv"],
        "ch": "fis-F01",
        "t": "Gráfica Velocidad-Tiempo y Pendiente",
        "prompt": "En una gráfica de velocidad versus tiempo ($v$ vs $t$) donde la gráfica es una línea recta inclinada no horizontal, la pendiente constante de dicha recta representa físicamente:",
        "opts": [
            "La posición inicial del objeto.",
            "La aceleración constante del movimiento ($a = \\frac{\\Delta v}{\\Delta t}$).",
            "El trabajo total desarrollado por el motor.",
            "La rapidez media del recorrido."
        ],
        "ans": 1,
        "exp": "**Paso 1. Definición matemática de pendiente:** $m = \\frac{\\Delta y}{\\Delta x} = \\frac{\\Delta v}{\\Delta t}$.\n**Paso 2. Significado físico:** La tasa de cambio de la velocidad respecto al tiempo es la aceleración $a$.\n**Respuesta correcta: B.**",
        "maths": ["a = \\frac{\\Delta v}{\\Delta t}"],
        "imgs": []
    },
    # 30 (Cálculo 3)
    {
        "id": "fis-19ago-30",
        "s": "fis",
        "n": 30,
        "d": "intermedio",
        "topics": ["2.2.3-impulso"],
        "ch": "fis-F02",
        "t": "Choque Inelástico y Conservación",
        "prompt": "Un vagón de ferrocarril $A$ de $4000\\text{ kg}$ que se mueve a $3\\text{ m/s}$ sobre una vía horizontal sin fricción choca y se acopla con otro vagón $B$ de $2000\\text{ kg}$ inicialmente en reposo. La rapidez final del conjunto acoplado es:",
        "opts": [
            "$v_f = 1.0\\text{ m/s}$",
            "$v_f = 2.0\\text{ m/s}$ en la misma dirección del vagón inicial.",
            "$v_f = 3.0\\text{ m/s}$",
            "$v_f = 1.5\\text{ m/s}$"
        ],
        "ans": 1,
        "exp": "**Paso 1. Conservación de momento:** $m_A v_A + m_B v_B = (m_A + m_B) v_f$.\n**Paso 2. Cálculo:** $(4000)(3) + (2000)(0) = (4000 + 2000) v_f \\implies 12000 = 6000 v_f \\implies v_f = 2.0\\text{ m/s}$.\n**Respuesta correcta: B.**",
        "maths": ["v_f = \\frac{12000}{6000} = 2.0\\text{ m/s}"],
        "imgs": []
    },
    # 31 (Teórica 8)
    {
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
    },
    # 32 (Teórica 9)
    {
        "id": "fis-19ago-32",
        "s": "fis",
        "n": 32,
        "d": "intermedio",
        "topics": ["2.1.1-mruv", "2.2.2-trabajoEnergia"],
        "ch": "fis-F02",
        "t": "Relación Cuadrática en la Distancia de Frenado",
        "prompt": "Un automóvil que viaja con rapidez inicial $v$ aplica sus frenos produciendo una desaceleración constante $a$ hasta detenerse en una distancia $d$. Si el mismo automóvil viaja al doble de rapidez inicial ($2v$), la distancia mínima de frenado requerida:",
        "opts": [
            "Se duplica en proporción directa a la rapidez.",
            "Se cuadruplica (cuatro veces mayor) debido a la escala cuadrática de la energía cinética.",
            "Aumenta ocho veces respecto a la distancia original.",
            "Permanece idéntica si los frenos ejercen la misma fuerza de retención."
        ],
        "ans": 1,
        "exp": "**Paso 1. Cinemática / Trabajo y Energía:** Por Torricelli: $v_f^2 = v_0^2 - 2ad \\implies 0 = v_0^2 - 2ad \\implies d = \\frac{v_0^2}{2a}$.\n**Paso 2. Escalamiento:** La distancia de frenado es proporcional al cuadrado de la rapidez inicial ($d \\propto v_0^2$). Si $v_0$ se duplica, $(2)^2 = 4$, por lo que la distancia se cuadruplica.\n**Respuesta correcta: B.**",
        "maths": ["d = \\frac{v_0^2}{2a} \\implies d \\propto v_0^2"],
        "imgs": []
    },
    # 33 (Teórica 10)
    {
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
    },
    # 34 (Teórica 11)
    {
        "id": "fis-19ago-34",
        "s": "fis",
        "n": 34,
        "d": "intermedio",
        "topics": ["2.2.2-trabajoEnergia"],
        "ch": "fis-F02",
        "t": "Teorema del Trabajo y la Energía Cinética",
        "prompt": "De acuerdo con el Teorema del Trabajo y la Energía Cinética, si la fuerza neta resultante que actúa sobre un cuerpo realiza un trabajo total positivo ($W_{\\text{neto}} > 0$):",
        "opts": [
            "La energía potencial del cuerpo siempre disminuye.",
            "La energía cinética del cuerpo necesariamente se incrementa ($\\Delta K > 0$).",
            "La rapidez del cuerpo se reduce debido a la inercia.",
            "El cuerpo se encuentra en equilibrio estático."
        ],
        "ans": 1,
        "exp": "**Paso 1. Teorema formal:** $W_{\\text{neto}} = \\Delta K = K_f - K_0$.\n**Paso 2. Deducción física:** Si el trabajo neto es positivo, la energía cinética final es estrictamente mayor que la inicial, aumentando la rapidez del objeto.\n**Respuesta correcta: B.**",
        "maths": ["W_{\\text{neto}} = \\Delta K = K_f - K_0 > 0"],
        "imgs": []
    },
    # 35 (Teórica 12)
    {
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
    },
    # 36 (Teórica 13)
    {
        "id": "fis-19ago-36",
        "s": "fis",
        "n": 36,
        "d": "intermedio",
        "topics": ["2.2.1-leyesNewton", "2.2.4-gravitacion"],
        "ch": "fis-F02",
        "t": "Tercera Ley en Atracción Gravitatoria",
        "prompt": "La masa de la Tierra es aproximadamente $81\\text{ veces}$ mayor que la masa de la Luna. Considerando la fuerza gravitatoria mutua que ejercen entre sí:",
        "opts": [
            "La fuerza que la Tierra ejerce sobre la Luna es $81\\text{ veces}$ mayor.",
            "La fuerza gravitatoria que la Tierra ejerce sobre la Luna tiene exactamente la misma magnitud que la que la Luna ejerce sobre la Tierra.",
            "La Luna no ejerce fuerza sobre la Tierra porque está en órbita.",
            "La fuerza depende de la fase lunar."
        ],
        "ans": 1,
        "exp": "**Paso 1. Ley de Gravitación Universal:** $F = G\\frac{M_{\\text{Tierra}} M_{\\text{Luna}}}{r^2}$.\n**Paso 2. Tercera Ley de Newton:** La atracción gravitatoria constituye un par de acción y reacción: la Tierra atrae a la Luna con una fuerza idéntica en magnitud a la que la Luna atrae a la Tierra.\n**Respuesta correcta: B.**",
        "maths": ["|\\vec{F}_{TL}| = |\\vec{F}_{LT}| = G\\frac{M_T M_L}{r^2}"],
        "imgs": []
    },
    # 37 (Teórica 14)
    {
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
    },
    # 38 (Teórica 15)
    {
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
    },
    # 39 (Teórica 16)
    {
        "id": "fis-19ago-39",
        "s": "fis",
        "n": 39,
        "d": "intermedio",
        "topics": ["2.2.2-trabajoEnergia"],
        "ch": "fis-F02",
        "t": "Energía a la Mitad de la Altura Máxima",
        "prompt": "Se lanza una pelota verticalmente hacia arriba con energía mecánica total constante $E_m$. En el punto medio de su altura máxima ($h = \\frac{1}{2}H_{\\text{máx}}$), la relación entre su energía cinética ($E_c$) y su energía potencial gravitatoria ($E_p$) es:",
        "opts": [
            "La energía cinética es el triple de la potencial.",
            "Ambas energías son exactamente iguales ($E_c = E_p = \\frac{1}{2}E_m$).",
            "La energía potencial es el cuádruple de la cinética.",
            "La energía cinética se anula a la mitad de la subida."
        ],
        "ans": 1,
        "exp": "**Paso 1. Conservación de energía:** $E_m = E_p + E_c = mgH_{\\text{máx}}$.\n**Paso 2. Altura media:** A $h = \\frac{1}{2}H_{\\text{máx}}$, la energía potencial es $E_p = mg\\left(\\frac{1}{2}H_{\\text{máx}}\\right) = \\frac{1}{2}E_m$.\n**Paso 3. Energía cinética restante:** $E_c = E_m - E_p = \\frac{1}{2}E_m$. Por tanto, $E_c = E_p$.\n**Respuesta correcta: B.**",
        "maths": ["E_p = E_c = \\frac{1}{2}E_m"],
        "imgs": []
    },
    # 40 (Teórica 17)
    {
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
]

# Assemble final bank:
final_fis = original_intento1_fis + intento2_fis
old_bank['fis'] = final_fis

with open('guia-bank-fql-19ago.js', 'w', encoding='utf-8') as f:
    f.write('window.GUIA_BANK_FQL_19AGO = ' + json.dumps(old_bank, indent=2, ensure_ascii=False) + ';\n')

print("Updated guia-bank-fql-19ago.js with:")
print(f" - Intento 1: RESTORED ORIGINAL ({len(original_intento1_fis)} questions)")
print(f" - Intento 2: 17 Pure Conceptual Questions (85%) / 3 Calculations (15%)")
