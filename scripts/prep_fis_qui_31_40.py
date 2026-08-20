fis_items_31_40 = [
    {
        "topics": ["4.2.2-impulsoCML"], "ch": "fis-L12", "t": "Impulso Mecánico en Pelota de Béisbol",
        "fig": None,
        "prompt": "Una pelota de béisbol de $0.15\\text{ kg}$ llega horizontalmente al bate con una rapidez de $30\\text{ m/s}$. El bateador la golpea en sentido exactamente opuesto, despidiéndola a $40\\text{ m/s}$. Si el contacto entre el bate y la pelota duró $\\Delta t = 0.005\\text{ segundos}$, ¿cuál es la magnitud del impulso $\\vec{J}$ transmitido y la fuerza media $\\bar{F}$ ejercida?",
        "opts": [
            "Impulso: $10.5\\text{ N}\\cdot\\text{s}$; Fuerza media: $2100\\text{ N}$.",
            "Impulso: $1.5\\text{ N}\\cdot\\text{s}$; Fuerza media: $300\\text{ N}$.",
            "Impulso: $6.0\\text{ N}\\cdot\\text{s}$; Fuerza media: $1200\\text{ N}$.",
            "Impulso: $0.075\\text{ N}\\cdot\\text{s}$; Fuerza media: $15\\text{ N}$."
        ],
        "ans": 0,
        "exp": "**Paso 1. Teorema del impulso y la cantidad de movimiento:** $\\vec{J} = \\Delta \\vec{p} = m(\\vec{v}_f - \\vec{v}_0)$.\n**Paso 2. Procedimiento a mano con signos vectoriales:**\n- Considerando positivo el sentido de salida de la pelota:\n  $v_0 = -30\\text{ m/s}$ (hacia el bate), $v_f = +40\\text{ m/s}$ (saliendo del bate).\n- $\\Delta v = v_f - v_0 = 40 - (-30) = 70\\text{ m/s}$.\n- Impulso: $J = m \\cdot \\Delta v = 0.15\\text{ kg} \\times 70\\text{ m/s} = 10.5\\text{ N}\\cdot\\text{s}$.\n- Fuerza media: $\\bar{F} = \\frac{J}{\\Delta t} = \\frac{10.5\\text{ N}\\cdot\\text{s}}{0.005\\text{ s}} = \\frac{10500}{5} = 2100\\text{ N}$.\n**Paso 3. Conclusión:** $J = 10.5\\text{ N}\\cdot\\text{s}$ y $\\bar{F} = 2100\\text{ N}$.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.2.1-cinemRecta"], "ch": "fis-L04", "t": "Frenado de Emergencia y Distancia de Parada",
        "fig": None,
        "prompt": "Un automóvil que viaja en línea recta a $20\\text{ m/s}$ frena con una desaceleración constante de magnitud $a = 4\\text{ m/s}^2$ hasta detenerse por completo. ¿Qué distancia recorre el vehículo durante el proceso de frenado y cuánto tiempo tarda en detenerse?",
        "opts": [
            "Distancia: $50\\text{ m}$; Tiempo: $5\\text{ s}$.",
            "Distancia: $100\\text{ m}$; Tiempo: $5\\text{ s}$.",
            "Distancia: $25\\text{ m}$; Tiempo: $2.5\\text{ s}$.",
            "Distancia: $80\\text{ m}$; Tiempo: $4\\text{ s}$."
        ],
        "ans": 0,
        "exp": "**Paso 1. Identificación de datos cinemáticos:** Rapidez inicial $v_0 = 20\\text{ m/s}$, rapidez final $v_f = 0$, aceleración $a = -4\\text{ m/s}^2$.\n**Paso 2. Cálculos a mano:**\n- Tiempo de frenado: $v_f = v_0 + at \\implies 0 = 20 - 4t \\implies 4t = 20 \\implies t = 5\\text{ s}$.\n- Distancia de parada mediante ecuación de Torricelli:\n  $v_f^2 = v_0^2 + 2a\\Delta x \\implies 0^2 = 20^2 + 2(-4)\\Delta x \\implies 0 = 400 - 8\\Delta x \\implies 8\\Delta x = 400 \\implies \\Delta x = \\frac{400}{8} = 50\\text{ m}$.\n**Paso 3. Conclusión:** Recorre $50\\text{ m}$ en $5\\text{ s}$.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.2.2-roceResistencia"], "ch": "fis-L09", "t": "Ángulo de Inclinación Crítico y Rozamiento",
        "fig": None,
        "prompt": "Se coloca un bloque sobre una tabla horizontal y se eleva lentamente uno de sus extremos. El bloque comienza a deslizarse justo cuando el ángulo de inclinación de la tabla alcanza $\\theta = 45^\\circ$. ¿Cuál es el coeficiente de rozamiento estático $\\mu_s$ entre el bloque y la tabla?",
        "opts": [
            "$\\mu_s = 1.00$",
            "$\\mu_s = 0.50$",
            "$\\mu_s = 0.71$",
            "$\\mu_s = 0.86$"
        ],
        "ans": 0,
        "exp": "**Paso 1. Diagrama de cuerpo libre en el plano inclinado en equilibrio límite:**\n- Paralelo al plano: $mg\\sin\\theta - f_{s,\\text{máx}} = 0 \\implies f_{s,\\text{máx}} = mg\\sin\\theta$.\n- Perpendicular al plano: $N - mg\\cos\\theta = 0 \\implies N = mg\\cos\\theta$.\n**Paso 2. Deducción de la relación de fricción a mano:**\n- Por definición: $f_{s,\\text{máx}} = \\mu_s N \\implies mg\\sin\\theta = \\mu_s (mg\\cos\\theta)$.\n- Simplificando $mg$:\n  $\\mu_s = \\frac{\\sin\\theta}{\\cos\\theta} = \\tan\\theta$.\n- Evaluando en $\\theta = 45^\\circ$: $\\mu_s = \\tan 45^\\circ = 1.00$.\n**Paso 3. Conclusión:** $\\mu_s = 1.00$.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.2.3-trabajoPotencia"], "ch": "fis-L13", "t": "Teorema del Trabajo y la Energía Cinética",
        "fig": None,
        "prompt": "Un cuerpo de masa $m = 4\\text{ kg}$ incrementa su rapidez de $v_1 = 3\\text{ m/s}$ a $v_2 = 7\\text{ m/s}$ mientras se desplaza sobre una superficie horizontal. ¿Cuál fue el trabajo neto total $W_{\\text{neto}}$ realizado sobre el cuerpo?",
        "opts": [
            "$W_{\\text{neto}} = 80\\text{ J}$",
            "$W_{\\text{neto}} = 40\\text{ J}$",
            "$W_{\\text{neto}} = 160\\text{ J}$",
            "$W_{\\text{neto}} = 16\\text{ J}$"
        ],
        "ans": 0,
        "exp": "**Paso 1. Teorema del Trabajo y la Energía Cinética:** El trabajo de la fuerza neta es igual al cambio de energía cinética: $W_{\\text{neto}} = \\Delta E_c = \\frac{1}{2}m v_2^2 - \\frac{1}{2}m v_1^2 = \\frac{1}{2}m(v_2^2 - v_1^2)$.\n**Paso 2. Cálculo a mano:**\n- $v_1^2 = 3^2 = 9\\text{ m}^2/\\text{s}^2$, $v_2^2 = 7^2 = 49\\text{ m}^2/\\text{s}^2$.\n- $\\Delta(v^2) = 49 - 9 = 40\\text{ m}^2/\\text{s}^2$.\n- $W_{\\text{neto}} = \\frac{1}{2}(4\\text{ kg})(40) = 2 \\times 40 = 80\\text{ J}$.\n**Paso 3. Conclusión:** El trabajo neto es $80\\text{ J}$.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.2.3-consEnergia"], "ch": "fis-L16", "t": "Rizo Vertical y Rapidez Crítica",
        "fig": None,
        "prompt": "Un carrito de montaña rusa ingresa a un rizo circular vertical de radio $R = 10\\text{ m}$. Despreciando la fricción y con $g = 10\\text{ m/s}^2$, ¿cuál es la rapidez mínima que debe tener el carrito en el punto más alto del rizo para completar la vuelta sin despegarse de la vía?",
        "opts": [
            "$v_{\\text{mín}} = 10\\text{ m/s}$",
            "$v_{\\text{mín}} = 5\\text{ m/s}$",
            "$v_{\\text{mín}} = 20\\text{ m/s}$",
            "$v_{\\text{mín}} = 14.14\\text{ m/s}$"
        ],
        "ans": 0,
        "exp": "**Paso 1. Dinámica en el punto más alto del rizo:**\n- Fuerzas radiales hacia el centro: Peso ($mg$) + Fuerza Normal ($N$).\n- Segunda Ley en el eje centrípeto: $mg + N = m\\frac{v^2}{R}$.\n**Paso 2. Condición límite de despegue a mano:**\n- En la rapidez mínima, la fuerza normal con el riel tiende a cero ($N = 0$).\n- $mg = m\\frac{v_{\\text{mín}}^2}{R} \\implies v_{\\text{mín}}^2 = gR \\implies v_{\\text{mín}} = \\sqrt{gR}$.\n- Sustituyendo: $v_{\\text{mín}} = \\sqrt{10\\text{ m/s}^2 \\times 10\\text{ m}} = \\sqrt{100} = 10\\text{ m/s}$.\n**Paso 3. Conclusión:** La rapidez mínima en la cúspide es $10\\text{ m/s}$.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.2.2-3raNewton"], "ch": "fis-L10", "t": "Tercera Ley en Atracción Gravitatoria",
        "fig": None,
        "prompt": "La masa de la Tierra es aproximadamente $81\\text{ veces}$ mayor que la masa de la Luna. Considerando la fuerza gravitatoria mutua que las mantiene unidas en órbita, ¿cuál de las siguientes afirmaciones es físicamente correcta según la Tercera Ley de Newton?",
        "opts": [
            "La fuerza gravitatoria que la Tierra ejerce sobre la Luna tiene exactamente la misma magnitud que la fuerza que la Luna ejerce sobre la Tierra.",
            "La Tierra ejerce una fuerza 81 veces mayor sobre la Luna porque su masa es muy superior.",
            "La Luna no ejerce ninguna fuerza sobre la Tierra porque su gravedad no llega al espacio exterior.",
            "La Luna ejerce mayor fuerza sobre la Tierra debido a su velocidad orbital más rápida."
        ],
        "ans": 0,
        "exp": "**Paso 1. Ley de Gravitación Universal:** $F = G\\frac{M_{\\text{Tierra}} M_{\\text{Luna}}}{d^2}$. La fórmula es simétrica respecto a ambas masas.\n**Paso 2. Tercera Ley de Newton (acción y reacción):** Toda interacción entre dos cuerpos constituye un par de fuerzas de igual magnitud, en la misma dirección y en sentidos opuestos: $|\\vec{F}_{T\\to L}| = |\\vec{F}_{L\\to T}|$.\n**Paso 3. Conclusión:** Ambas fuerzas son exactamente iguales en módulo; la diferencia de masa únicamente hace que la aceleración orbital de la Luna sea 81 veces mayor que la de la Tierra.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.2.2-2daNewton"], "ch": "fis-L07", "t": "Dos Bloques Unidos por Cuerda",
        "fig": None,
        "prompt": "Dos bloques $A$ de $3\\text{ kg}$ y $B$ de $2\\text{ kg}$ están unidos por una cuerda ligera sobre una mesa horizontal sin fricción. Se jala al bloque $A$ hacia la derecha con una fuerza horizontal constante $F = 20\\text{ N}$. ¿Cuál es la aceleración del conjunto y la tensión $T$ en la cuerda que une a los bloques?",
        "opts": [
            "Aceleración: $4\\text{ m/s}^2$; Tensión: $8\\text{ N}$.",
            "Aceleración: $4\\text{ m/s}^2$; Tensión: $12\\text{ N}$.",
            "Aceleración: $10\\text{ m/s}^2$; Tensión: $20\\text{ N}$.",
            "Aceleración: $2\\text{ m/s}^2$; Tensión: $6\\text{ N}$."
        ],
        "ans": 0,
        "exp": "**Paso 1. Aceleración del sistema conjunto:**\n- Masa total: $M = m_A + m_B = 3 + 2 = 5\\text{ kg}$.\n- Aceleración: $a = \\frac{F}{M} = \\frac{20\\text{ N}}{5\\text{ kg}} = 4\\text{ m/s}^2$.\n**Paso 2. Cálculo de la tensión en la cuerda que jala al bloque posterior $B$:**\n- Diagrama de cuerpo libre para el bloque $B$ ($m_B = 2\\text{ kg}$):\n  La única fuerza horizontal sobre $B$ es la tensión $T$: $T = m_B \\cdot a = 2\\text{ kg} \\times 4\\text{ m/s}^2 = 8\\text{ N}$.\n- (Verificación en bloque $A$: $F - T = m_A \\cdot a \\implies 20 - 8 = 12\\text{ N} = 3\\text{ kg} \\times 4\\text{ m/s}^2$).\n**Paso 3. Conclusión:** $a = 4\\text{ m/s}^2$ y $T = 8\\text{ N}$.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.2.3-trabajoPotencia"], "ch": "fis-L13", "t": "Potencia al Elevar Carga Verticalmente",
        "fig": None,
        "prompt": "Una grúa eléctrica levanta un contenedor de masa $m = 600\\text{ kg}$ a una altura de $15\\text{ metros}$ con velocidad constante en un tiempo de $30\\text{ segundos}$ ($g = 10\\text{ m/s}^2$). ¿Qué potencia media útil desarrolla el motor de la grúa?",
        "opts": [
            "$3000\\text{ W} = 3.0\\text{ kW}$",
            "$90000\\text{ W} = 90\\text{ kW}$",
            "$1500\\text{ W} = 1.5\\text{ kW}$",
            "$6000\\text{ W} = 6.0\\text{ kW}$"
        ],
        "ans": 0,
        "exp": "**Paso 1. Cálculo del trabajo mecánico contra la gravedad:**\n- $W = mgh = 600\\text{ kg} \\times 10\\text{ m/s}^2 \\times 15\\text{ m} = 90000\\text{ J}$.\n**Paso 2. Cálculo de la potencia media a mano:**\n- $P = \\frac{W}{t} = \\frac{90000\\text{ J}}{30\\text{ s}} = \\frac{9000}{3} = 3000\\text{ W} = 3.0\\text{ kW}$.\n**Paso 3. Conclusión:** La potencia desarrollada es $3.0\\text{ kW}$ ($3000\\text{ W}$).\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.2.3-consEnergia"], "ch": "fis-L16", "t": "Energía a la Mitad de la Altura Máxima",
        "fig": None,
        "prompt": "Se lanza una pelota verticalmente hacia arriba con energía mecánica total $E_m = 100\\text{ J}$ (nivel de referencia en el suelo, sin fricción del aire). Cuando la pelota alcanza exactamente la mitad de su altura máxima ($h = H_{\\text{máx}}/2$), ¿cuáles son sus valores de energía cinética ($E_c$) y energía potencial ($E_p$)?",
        "opts": [
            "$E_c = 50\\text{ J}$ y $E_p = 50\\text{ J}$",
            "$E_c = 25\\text{ J}$ y $E_p = 75\\text{ J}$",
            "$E_c = 75\\text{ J}$ y $E_p = 25\\text{ J}$",
            "$E_c = 0\\text{ J}$ y $E_p = 100\\text{ J}$"
        ],
        "ans": 0,
        "exp": "**Paso 1. Balance energético total:** Por conservación, $E_m = E_c + E_p = 100\\text{ J} = \\text{constante}$.\n**Paso 2. Procedimiento a mano a media altura:**\n- En la cúspide $H_{\\text{máx}}$: Toda la energía es potencial: $E_p(H_{\\text{máx}}) = mg H_{\\text{máx}} = 100\\text{ J}$.\n- A media altura $h = \\frac{H_{\\text{máx}}}{2}$:\n  $E_p(h) = mg\\left(\\frac{H_{\\text{máx}}}{2}\\right) = \\frac{1}{2}(mg H_{\\text{máx}}) = \\frac{100\\text{ J}}{2} = 50\\text{ J}$.\n- Por conservación: $E_c = E_m - E_p = 100\\text{ J} - 50\\text{ J} = 50\\text{ J}$.\n**Paso 3. Conclusión:** Ambas energías son iguales a $50\\text{ J}$.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.2.2-circular"], "ch": "fis-L11", "t": "Velocidad Angular y Período en MCU",
        "fig": None,
        "prompt": "Un disco gira en un plano horizontal con Movimiento Circular Uniforme realizando $120\\text{ revoluciones por minuto (rpm)}$. ¿Cuál es su rapidez angular $\\omega$ en $\\text{rad/s}$ y su período de rotación $T$?",
        "opts": [
            "$\\omega = 4\\pi\\text{ rad/s} \\approx 12.57\\text{ rad/s}$; Período $T = 0.5\\text{ s}$.",
            "$\\omega = 2\\pi\\text{ rad/s}$; Período $T = 1.0\\text{ s}$.",
            "$\\omega = 120\\pi\\text{ rad/s}$; Período $T = 60\\text{ s}$.",
            "$\\omega = 8\\pi\\text{ rad/s}$; Período $T = 0.25\\text{ s}$."
        ],
        "ans": 0,
        "exp": "**Paso 1. Conversión de frecuencia a hercios (vueltas por segundo):**\n$f = \\frac{120\\text{ rev}}{60\\text{ s}} = 2\\text{ rev/s} = 2\\text{ Hz}$.\n**Paso 2. Cálculo a mano de rapidez angular y período:**\n- Rapidez angular: $\\omega = 2\\pi f = 2\\pi(2) = 4\\pi\\text{ rad/s} \\approx 12.57\\text{ rad/s}$.\n- Período: $T = \\frac{1}{f} = \\frac{1}{2\\text{ Hz}} = 0.5\\text{ s}$.\n**Paso 3. Conclusión:** $\\omega = 4\\pi\\text{ rad/s}$ y $T = 0.5\\text{ s}$.\n**Respuesta correcta: A.**"
    }
]

qui_items_31_40 = [
    {
        "topics": ["4.3.3-geomMolec"], "ch": "qui-L12", "t": "Geometría Molecular del Metano",
        "fig": None,
        "prompt": "La molécula de metano ($\\text{CH}_4$) consta de un átomo central de carbono unido a cuatro átomos de hidrógeno. De acuerdo con la teoría de repulsión de pares de electrones de la capa de valencia (RPECV), ¿qué tipo de hibridación posee el carbono, cuál es su geometría molecular y qué ángulo forman sus enlaces?",
        "opts": [
            "Hibridación $sp^3$, geometría tetraédrica con ángulos de enlace de $109.5^\\circ$.",
            "Hibridación $sp^2$, geometría trigonal plana con ángulos de enlace de $120^\\circ$.",
            "Hibridación $sp$, geometría lineal con ángulos de enlace de $180^\\circ$.",
            "Hibridación $sp^3d$, geometría bipiramidal trigonal con ángulos de $90^\\circ$ y $120^\\circ$."
        ],
        "ans": 0,
        "exp": "**Paso 1. Estructura de Lewis y pares de electrones:** El átomo de carbono ($Z=6$) tiene 4 electrones de valencia y forma 4 enlaces simples $\\text{C}-\\text{H}$, sin pares libres ($AX_4$).\n**Paso 2. Modelo RPECV e hibridación:**\n- 4 dominios electrónicos $\\implies$ hibridación $sp^3$.\n- La máxima separación tridimensional para 4 pares enlazantes equivalentes es la disposición tetraédrica regular con ángulos de $109.5^\\circ$ (o $109^\\circ 28'$).\n**Paso 3. Conclusión:** Hibridación $sp^3$, geometría tetraédrica y $109.5^\\circ$.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.3.3-Lewis"], "ch": "qui-L11", "t": "Octeto Incompleto en Trifluoruro de Boro",
        "fig": None,
        "prompt": "El trifluoruro de boro ($\\text{BF}_3$) es una excepción común a la regla del octeto. ¿Cuántos electrones de valencia rodean al átomo central de boro en su estructura de Lewis y cuál es la geometría espacial de la molécula?",
        "opts": [
            "$6\\text{ electrones}$ (octeto incompleto/deficiente), con geometría trigonal plana ($120^\\circ$).",
            "$8\\text{ electrones}$ (octeto completo), con geometría piramidal trigonal ($107^\\circ$).",
            "$10\\text{ electrones}$ (octeto expandido), con geometría en forma de T.",
            "$4\\text{ electrones}$, con geometría lineal ($180^\\circ$)."
        ],
        "ans": 0,
        "exp": "**Paso 1. Conteo de electrones de valencia:** Boro ($B$, Grupo 13) aporta $3\\, e^-$. Cada Flúor ($F$, Grupo 17) aporta $7\\, e^-$. Total $= 3 + 3(7) = 24\\, e^-$.\n**Paso 2. Estructura de Lewis:** El boro forma 3 enlaces simples con los 3 átomos de flúor ($\\text{B}-\\text{F}$), rodeándose de $3 \\times 2 = 6\\text{ electrones}$.\n- Al carecer de pares solitarios ($AX_3$), los 3 enlaces se disponen en un plano separados por $120^\\circ$.\n**Paso 3. Conclusión:** Posee 6 electrones en el átomo central y geometría trigonal plana.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.3.4-formEmpMol"], "ch": "qui-L15", "t": "Fórmula Empírica y Molecular de Glucosa",
        "fig": None,
        "prompt": "Un carbohidrato puro presenta una composición centesimal de $40.0\\%\\text{ C}$, $6.67\\%\\text{ H}$ y $53.33\\%\\text{ O}$. Si su masa molar experimental es de $180.0\\text{ g/mol}$, ¿cuál es su fórmula empírica y su fórmula molecular respectivamente? (Masas: $C=12, H=1, O=16\\text{ g/mol}$)",
        "opts": [
            "Fórmula empírica: $\\text{CH}_2\\text{O}$; Fórmula molecular: $\\text{C}_6\\text{H}_{12}\\text{O}_6$",
            "Fórmula empírica: $\\text{CHO}$; Fórmula molecular: $\\text{C}_6\\text{H}_6\\text{O}_6$",
            "Fórmula empírica: $\\text{CH}_2\\text{O}$; Fórmula molecular: $\\text{C}_3\\text{H}_6\\text{O}_3$",
            "Fórmula empírica: $\\text{C}_2\\text{H}_4\\text{O}_2$; Fórmula molecular: $\\text{C}_4\\text{H}_8\\text{O}_4$"
        ],
        "ans": 0,
        "exp": "**Paso 1. Moles de cada elemento en una base de $100\\text{ g}$:**\n- $n_C = \\frac{40.0\\text{ g}}{12\\text{ g/mol}} = 3.333\\text{ mol}$\n- $n_H = \\frac{6.67\\text{ g}}{1\\text{ g/mol}} = 6.670\\text{ mol}$\n- $n_O = \\frac{53.33\\text{ g}}{16\\text{ g/mol}} = 3.333\\text{ mol}$\n**Paso 2. Relación molar dividiendo por el menor ($3.333$):**\n- $C: \\frac{3.333}{3.333} = 1$; $H: \\frac{6.670}{3.333} \\approx 2$; $O: \\frac{3.333}{3.333} = 1$.\n- Fórmula empírica: $\\text{CH}_2\\text{O}$.\n- Masa de la fórmula empírica $= 12 + 2(1) + 16 = 30.0\\text{ g/mol}$.\n**Paso 3. Determinación de la fórmula molecular:**\n- Factor $n = \\frac{\\text{Masa Molar}}{\\text{Masa Empírica}} = \\frac{180.0}{30.0} = 6$.\n- Fórmula molecular: $(\\text{CH}_2\\text{O}) \\times 6 = \\text{C}_6\\text{H}_{12}\\text{O}_6$.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.3.4-esteqReactivoLim"], "ch": "qui-L17", "t": "Estequiometría con Pureza de Reactivo",
        "fig": None,
        "prompt": "Se tratan $125\\text{ g}$ de piedra caliza que contiene $80\\%\\text{ en masa}$ de carbonato de calcio puro ($\\text{CaCO}_3$, masa molar $100\\text{ g/mol}$) con exceso de ácido clorhídrico según:\n$$\\text{CaCO}_3 + 2\\,\\text{HCl} \\to \\text{CaCl}_2 + \\text{CO}_2 + \\text{H}_2\\text{O}$$\n¿Cuántos gramos de dióxido de carbono ($\\text{CO}_2$, masa molar $44\\text{ g/mol}$) se producen estequiométricamente?",
        "opts": [
            "$44.0\\text{ g}$",
            "$55.0\\text{ g}$",
            "$88.0\\text{ g}$",
            "$35.2\\text{ g}$"
        ],
        "ans": 0,
        "exp": "**Paso 1. Cálculo de la masa pura de reactivo:**\n- $\\text{Masa pura de CaCO}_3 = 125\\text{ g} \\times 0.80 = 100.0\\text{ g}$.\n**Paso 2. Moles de $\\text{CaCO}_3$ a mano:**\n- $n(\\text{CaCO}_3) = \\frac{100.0\\text{ g}}{100.0\\text{ g/mol}} = 1.0\\text{ mol}$.\n**Paso 3. Relación estequiométrica y masa de $\\text{CO}_2$:**\n- Relación $1:1 \\implies 1.0\\text{ mol de CaCO}_3$ produce $1.0\\text{ mol de CO}_2$.\n- $\\text{Masa de CO}_2 = 1.0\\text{ mol} \\times 44.0\\text{ g/mol} = 44.0\\text{ g}$.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.3.2-nomInorganica2"], "ch": "qui-L09", "t": "Oxácidos de Nitrógeno HNO3 y HNO2",
        "fig": None,
        "prompt": "¿Cuáles son los nombres tradicionales sistemáticos de los oxácidos $\\text{HNO}_3$ y $\\text{HNO}_2$, y qué estado de oxidación posee el nitrógeno en cada uno de ellos?",
        "opts": [
            "$\\text{HNO}_3$: Ácido nítrico ($+5$); $\\text{HNO}_2$: Ácido nitroso ($+3$).",
            "$\\text{HNO}_3$: Ácido nitroso ($+3$); $\\text{HNO}_2$: Ácido nítrico ($+5$).",
            "$\\text{HNO}_3$: Ácido pernítrico ($+7$); $\\text{HNO}_2$: Ácido hiponitroso ($+1$).",
            "$\\text{HNO}_3$: Nitrato de hidrógeno ($+1$); $\\text{HNO}_2$: Nitrito de hidrógeno ($-3$)."
        ],
        "ans": 0,
        "exp": "**Paso 1. Cálculo de estados de oxidación del Nitrógeno ($N$) a mano:**\n- En $\\text{HNO}_3$: $+1 + \\text{E.O.}(N) + 3(-2) = 0 \\implies 1 + \\text{E.O.}(N) - 6 = 0 \\implies \\text{E.O.}(N) = +5$.\n- En $\\text{HNO}_2$: $+1 + \\text{E.O.}(N) + 2(-2) = 0 \\implies 1 + \\text{E.O.}(N) - 4 = 0 \\implies \\text{E.O.}(N) = +3$.\n**Paso 2. Nomenclatura con sufijos -oso e -ico:**\n- Estado menor ($+3$): sufijo -oso $\\implies$ Ácido nitroso.\n- Estado mayor ($+5$): sufijo -ico $\\implies$ Ácido nítrico.\n**Paso 3. Conclusión:** Ácido nítrico ($+5$) y ácido nitroso ($+3$).\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.3.1-materia"], "ch": "qui-L02", "t": "Clasificación de Mezclas y Sustancias",
        "fig": None,
        "prompt": "¿Cuál de los siguientes sistemas materiales corresponde a una mezcla homogénea (disolución verdadera) de una sola fase visible?",
        "opts": [
            "Una disolución acuosa filtrada de cloruro de sodio en agua destilada.",
            "Una suspensión de arena gruesa agitada en agua.",
            "Una emulsión de aceite vegetal y vinagre sin emulsionante.",
            "Granito pulido donde se distinguen cuarzo, feldespato y mica."
        ],
        "ans": 0,
        "exp": "**Paso 1. Definición de mezcla homogénea:** Sistema material formado por dos o más componentes con composición y propiedades físicas idénticas en cualquier punto de su volumen, presentando una sola fase a nivel macroscópico y microscópico óptico.\n**Paso 2. Análisis de opciones:**\n- Sal disuelta en agua: Los iones $\\text{Na}^+$ y $\\text{Cl}^-$ están solvatados uniformemente formando una sola fase líquida transparente.\n- Arena en agua, vinagre con aceite y granito: presentan dos o más fases distinguibles (mezclas heterogéneas).\n**Paso 3. Conclusión:** La disolución de sal en agua es una mezcla homogénea.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.3.3-fuerzasInter"], "ch": "qui-L13", "t": "Fuerzas Dipolo-Dipolo en HCl",
        "fig": None,
        "prompt": "En el cloruro de hidrógeno líquido ($\\text{HCl}$), la diferencia de electronegatividad genera un enlace covalente polar con momento dipolar permanente. ¿Cuál es la fuerza intermolecular predominante que mantiene unidas a estas moléculas?",
        "opts": [
            "Fuerzas de atracción dipolo-dipolo (fuerzas de Keesom/Keesom-Debye).",
            "Puentes de hidrógeno intensos.",
            "Atracción electrostática iónica de red cristalina.",
            "Fuerzas de enlace metálico deslocalizado."
        ],
        "ans": 0,
        "exp": "**Paso 1. Estructura molecular del $\\text{HCl}$:** Enlace polar $\\text{H}^{\\delta+} - \\text{Cl}^{\\delta-}$.\n**Paso 2. Identificación de la interacción intermolecular:**\n- Al ser una molécula polar neutra, los extremos de carga opuesta de moléculas vecinas se atraen mediante interacción dipolo-dipolo.\n- Nota clave: No forma puentes de hidrógeno porque el cloro, aunque electronegativo, tiene un radio atómico grande que difumina la densidad de carga (el puente de hidrógeno solo se forma con $F, O, N$).\n**Paso 3. Conclusión:** La fuerza predominante es la atracción dipolo-dipolo.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.3.1-configElectronica"], "ch": "qui-L04", "t": "Configuración del Anión Cloruro Cl-",
        "fig": None,
        "prompt": "El cloro tiene número atómico $Z = 17$. Al formar el anión cloruro $\\text{Cl}^-$, ¿cuál es su configuración electrónica completa y qué gas noble tiene su misma estructura?",
        "opts": [
            "$1s^2\\, 2s^2\\, 2p^6\\, 3s^2\\, 3p^6$ (isoelectrónico con el Argón, $Z=18$).",
            "$1s^2\\, 2s^2\\, 2p^6\\, 3s^2\\, 3p^5$ (isoelectrónico con el Cloro neutro).",
            "$1s^2\\, 2s^2\\, 2p^6\\, 3s^2\\, 3p^4$ (isoelectrónico con el Azufre).",
            "$1s^2\\, 2s^2\\, 2p^6\\, 3s^1$ (isoelectrónico con el Sodio)."
        ],
        "ans": 0,
        "exp": "**Paso 1. Átomo neutro de Cloro ($17\\, e^-$):**\n$1s^2\\, 2s^2\\, 2p^6\\, 3s^2\\, 3p^5$.\n**Paso 2. Ganancia de 1 electrón para el anión $\\text{Cl}^-$ ($18\\, e^-$):**\n- El electrón adicional entra al orbital incompleto $3p$, completando el subnivel: $3p^5 + 1e^- \\to 3p^6$.\n- Configuración: $1s^2\\, 2s^2\\, 2p^6\\, 3s^2\\, 3p^6$.\n- El Argón ($Z=18$) tiene exactamente esta misma configuración electrónica de octeto cerrado.\n**Paso 3. Conclusión:** $1s^2\\, 2s^2\\, 2p^6\\, 3s^2\\, 3p^6$, isoelectrónico con el Argón.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.3.4-reacciones"], "ch": "qui-L16", "t": "Agente Oxidante y Reductor en Redox de Cobre",
        "fig": None,
        "prompt": "En la siguiente reacción redox no balanceada:\n$$\\text{Cu} + \\text{HNO}_3 \\to \\text{Cu}(\\text{NO}_3)_2 + \\text{NO}_2 + \\text{H}_2\\text{O}$$\n¿Qué elemento se oxida, cuál se reduce y cuál es el agente oxidante?",
        "opts": [
            "El Cobre se oxida (de $0$ a $+2$), el Nitrógeno se reduce (de $+5$ a $+4$), y el $\\text{HNO}_3$ es el agente oxidante.",
            "El Cobre se reduce (de $+2$ a $0$), el Nitrógeno se oxida, y el $\\text{Cu}$ es el agente oxidante.",
            "El Hidrógeno se oxida y el Oxígeno es el agente reductor.",
            "El Nitrógeno se oxida de $+4$ a $+5$ y el agua actúa como agente oxidante."
        ],
        "ans": 0,
        "exp": "**Paso 1. Determinación de estados de oxidación en reactivos y productos:**\n- $\\text{Cu}^0 \\to \\text{Cu}^{2+}$: Pierde 2 electrones (se oxida $\\implies$ actúa como agente reductor).\n- En $\\text{HNO}_3$: $N$ tiene $+5$.\n- En $\\text{NO}_2$: $N$ tiene $+4$ ($x + 2(-2) = 0 \\implies x = +4$).\n- El Nitrógeno pasa de $+5$ a $+4$: Gana 1 electrón (se reduce).\n**Paso 2. Definición de agente oxidante:**\n- La especie química que contiene al elemento que se reduce es el agente oxidante (el $\\text{HNO}_3$).\n**Paso 3. Conclusión:** El $\\text{Cu}$ se oxida, el $N$ se reduce y el $\\text{HNO}_3$ es el agente oxidante.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.3.1-unidades"], "ch": "qui-L01", "t": "Cálculo de Densidad y Conversión de Unidades",
        "fig": None,
        "prompt": "Una probeta contiene un volumen de $250\\text{ cm}^3$ de un líquido desconocido cuya densidad es $\\rho = 1.20\\text{ g/cm}^3$. ¿Cuál es la masa del líquido expresada en kilogramos ($\\text{kg}$)?",
        "opts": [
            "$0.30\\text{ kg}$",
            "$3.00\\text{ kg}$",
            "$0.03\\text{ kg}$",
            "$300\\text{ kg}$"
        ],
        "ans": 0,
        "exp": "**Paso 1. Fórmula de masa a partir de la densidad:** $m = \\rho \\cdot V$.\n**Paso 2. Cálculo a mano paso a paso:**\n- $m = 1.20\\text{ g/cm}^3 \\times 250\\text{ cm}^3 = 300.0\\text{ gramos}$.\n**Paso 3. Conversión a kilogramos ($1\\text{ kg} = 1000\\text{ g}$):**\n- $m = \\frac{300.0\\text{ g}}{1000\\text{ g/kg}} = 0.30\\text{ kg}$.\n**Respuesta correcta: A.**"
    }
]
