import json

# Define Parte I and Parte II topics with flawless LaTeX and rich step-by-step hand examples

parte1_topics = [
    {
        "id": "p1_fis_01",
        "part": "parte1",
        "subject": "fisica",
        "unit": "Movimiento",
        "priority": "Esencial",
        "eyebrow": "01 · Cinemática",
        "title": "Convierte el recorrido en una ecuación",
        "lead": "Antes de usar una fórmula, identifica si el movimiento es uniforme, acelerado o una combinación de ambos. La unidad coherente es la mitad de la respuesta.",
        "quickRule": "Si la dirección cambia, la velocidad cambia; por eso puede haber aceleración aunque la rapidez sea constante.",
        "formula": "v = \\frac{\\Delta x}{\\Delta t} \\qquad a = \\frac{\\Delta v}{\\Delta t} \\qquad x = x_0 + v_0 t + \\frac{1}{2}a t^2",
        "variables": ["x: posición (m)", "v: velocidad (m/s)", "a: aceleración (m/s²)", "t: tiempo (s)"],
        "sections": [
            {
                "heading": "Distancia no es desplazamiento",
                "body": "La distancia es la longitud total del camino recorrido y siempre es positiva. El desplazamiento es el vector entre la posición inicial y final (Δx = x_f - x_0) y puede ser positivo, negativo o cero."
            },
            {
                "heading": "Gráficas v vs t",
                "body": "La pendiente de una gráfica v-t representa la aceleración instantánea. El área bajo la curva representa el desplazamiento neto realizado."
            }
        ],
        "commonTrap": "No confundas rapidez media (distancia/tiempo) con módulo de velocidad media (|desplazamiento|/tiempo). En una pista cerrada de 400 m, el desplazamiento es cero.",
        "stepByStep": [
            {"step": "1", "text": "Identifica si la aceleración es constante o cero."},
            {"step": "2", "text": "Convierte todas las unidades al Sistema Internacional (m, s, m/s)."},
            {"step": "3", "text": "Elige la ecuación cinemática que no contenga la variable desconocida innecesaria."}
        ],
        "example": {
            "prompt": "Un móvil parte del reposo con aceleración constante de 3 m/s² durante 4 s. ¿Qué distancia recorre y qué rapidez final alcanza?",
            "steps": [
                "1. Rapidez final: v_f = v_0 + a·t = 0 + (3 m/s²)(4 s) = 12 m/s.",
                "2. Distancia: d = v_0·t + ½·a·t² = 0 + ½(3 m/s²)(4 s)² = ½(3)(16) = 24 m."
            ],
            "result": "La distancia recorrida es 24 m y la rapidez final es 12 m/s."
        }
    },
    {
        "id": "p1_fis_02",
        "part": "parte1",
        "subject": "fisica",
        "unit": "Fuerzas",
        "priority": "Esencial",
        "eyebrow": "02 · Newton",
        "title": "Dibuja las fuerzas antes de calcular",
        "lead": "La segunda ley de Newton conecta lo que actúa sobre un cuerpo con el cambio de su movimiento. El diagrama de cuerpo libre evita errores de signo y de sentido.",
        "quickRule": "Fuerza neta cero no significa que no existan fuerzas: significa que están en equilibrio (reposo o MRU).",
        "formula": "\\sum \\vec{F} = m \\vec{a} \\qquad P = m g \\qquad f_k = \\mu_k N",
        "variables": ["F: fuerza neta (N)", "m: masa (kg)", "a: aceleración (m/s²)", "N: normal (N)", "μ_k: coef. fricción"],
        "sections": [
            {
                "heading": "Tercera Ley: Acción y Reacción",
                "body": "Las fuerzas de acción y reacción tienen exactamente la misma magnitud y sentidos opuestos, pero actúan sobre CUERPOS DIFERENTES. Por tanto, jamás se cancelan entre sí."
            },
            {
                "heading": "La Normal no siempre es igual al peso",
                "body": "En un plano horizontal sin fuerzas verticales extras, N = mg. En un plano inclinado de ángulo θ, N = mg cos θ. Si tiras hacia arriba con ángulo, N = mg - F sin θ."
            }
        ],
        "commonTrap": "No sumes la fuerza de reacción en el diagrama del mismo cuerpo que ejerció la acción.",
        "stepByStep": [
            {"step": "1", "text": "Dibuja el cuerpo aislado y traza los ejes x e y alineados con el movimiento."},
            {"step": "2", "text": "Coloca peso (hacia abajo), normal (perpendicular al contacto) y rozamiento (opuesto al deslizamiento)."},
            {"step": "3", "text": "Aplica ΣFx = m·a y ΣFy = 0."}
        ],
        "example": {
            "prompt": "Un bloque de 5 kg es empujado sobre un piso horizontal sin fricción por una fuerza constante de 20 N. ¿Cuál es su aceleración?",
            "steps": [
                "1. En el eje horizontal, la única fuerza neta es F = 20 N.",
                "2. Aplicando ΣFx = m·a: 20 N = (5 kg)·a.",
                "3. Despejando: a = 20 / 5 = 4 m/s²."
            ],
            "result": "La aceleración es 4 m/s²."
        }
    },
    {
        "id": "p1_fis_03",
        "part": "parte1",
        "subject": "fisica",
        "unit": "Energía",
        "priority": "Esencial",
        "eyebrow": "03 · Trabajo y Energía",
        "title": "Sigue la transformación, no memorices el dibujo",
        "lead": "Cuando no te preguntan por el tiempo sino por rapidez, altura o conversiones, la conservación de la energía mecánica es el camino más directo.",
        "quickRule": "Si no hay rozamiento, E_m = K + U_g + U_e = constante. La energía no se crea ni se destruye, solo se transforma.",
        "formula": "E_m = K + U_g + U_e = \\text{cte} \\qquad K = \\frac{1}{2}m v^2 \\qquad U_g = m g h \\qquad U_e = \\frac{1}{2}k x^2",
        "variables": ["K: cinética (J)", "Ug: potencial gravitatoria (J)", "Ue: potencial elástica (J)", "W: trabajo (J)"],
        "sections": [
            {
                "heading": "Trabajo de fuerzas perpendiculares es cero",
                "body": "Como W = F·d·cos(θ), si la fuerza forma 90° con el desplazamiento (como la fuerza normal o la fuerza centrípeta), el trabajo mecánico realizado es 0 J."
            },
            {
                "heading": "Péndulos y Rampas",
                "body": "En el punto más alto, v = 0 y la energía es 100% potencial (mgh). En el punto más bajo (valle), h = 0 y la energía es 100% cinética (½mv²). Por tanto: v_max = √(2gh)."
            }
        ],
        "commonTrap": "No apliques conservación de energía mecánica si existe fricción sin restar el trabajo disipado: E_final = E_inicial - W_friccion.",
        "stepByStep": [
            {"step": "1", "text": "Define el nivel de referencia de altura cero (h = 0)."},
            {"step": "2", "text": "Escribe la energía mecánica total en el estado inicial: E_1 = K_1 + Ug_1 + Ue_1."},
            {"step": "3", "text": "Iguala con la energía final: E_1 = E_2 y despeja la incógnita."}
        ],
        "example": {
            "prompt": "Un objeto de 2 kg se suelta desde el reposo a 5 m de altura sin fricción. Use g = 10 m/s². ¿Cuál es su rapidez al llegar al suelo?",
            "steps": [
                "1. Arriba: K_1 = 0, Ug_1 = m·g·h = (2 kg)(10 m/s²)(5 m) = 100 J.",
                "2. Abajo: Ug_2 = 0, K_2 = ½·m·v² = ½(2)·v² = v².",
                "3. Conservación: 100 = v² ⇒ v = √100 = 10 m/s."
            ],
            "result": "La rapidez al llegar al suelo es 10 m/s."
        }
    },
    {
        "id": "p1_fis_04",
        "part": "parte1",
        "subject": "fisica",
        "unit": "Choques",
        "priority": "Esencial",
        "eyebrow": "04 · Impulso y Momento",
        "title": "Mide el cambio de movimiento",
        "lead": "El impulso de una fuerza externa cambia la cantidad de movimiento del cuerpo. En un sistema aislado sin fuerzas externas, el momento lineal total se conserva.",
        "quickRule": "J = F · Δt = Δp = m·(v_f - v_0). En un choque o explosión sin fuerzas externas: Σp_inicial = Σp_final.",
        "formula": "\\vec{J} = \\vec{F}\\Delta t = \\Delta \\vec{p} \\qquad \\vec{p} = m\\vec{v} \\qquad \\sum \\vec{p}_i = \\sum \\vec{p}_f",
        "variables": ["p: cantidad de movimiento (kg·m/s)", "J: impulso (N·s)", "F: fuerza media (N)", "Δt: tiempo de contacto (s)"],
        "sections": [
            {
                "heading": "Choque Inelástico vs Elástico",
                "body": "En todos los choques se conserva el momento lineal. En los choques elásticos se conserva además la energía cinética. En los choques perfectamente inelásticos los cuerpos quedan unidos tras el impacto."
            }
        ],
        "commonTrap": "Recuerda que el momento lineal es un vector: si una pelota rebota hacia atrás con la misma rapidez, Δp no es 0 sino -2mv.",
        "stepByStep": [
            {"step": "1", "text": "Establece el sentido positivo del eje horizontal (+x)."},
            {"step": "2", "text": "Calcula el momento inicial: p_i = m1·v1 + m2·v2."},
            {"step": "3", "text": "Iguala con el momento final: p_f = (m1 + m2)·v_f y despeja."}
        ],
        "example": {
            "prompt": "Una fuerza de 10 N actúa durante 0.4 s sobre un balón de 0.5 kg en reposo. ¿Qué rapidez adquiere?",
            "steps": [
                "1. Impulso: J = F·Δt = (10 N)(0.4 s) = 4.0 N·s.",
                "2. Relación impulso-momento: J = m·v_f - 0 ⇒ 4.0 = (0.5 kg)·v_f.",
                "3. Despejando: v_f = 4.0 / 0.5 = 8 m/s."
            ],
            "result": "El balón adquiere una rapidez de 8 m/s."
        }
    },
    {
        "id": "p1_qui_01",
        "part": "parte1",
        "subject": "quimica",
        "unit": "Nomenclatura",
        "priority": "Esencial",
        "eyebrow": "01 · Cargas y Nombres",
        "title": "Haz que la suma de cargas cierre",
        "lead": "Los números de oxidación permiten formular y nombrar compuestos. En cualquier compuesto neutro, la suma de los estados de oxidación multiplicados por sus subíndices debe ser exactamente cero.",
        "quickRule": "En FeCl₃, cada Cl vale -1: el hierro tiene que valer +3. Su nombre Stock oficial es cloruro de hierro (III).",
        "formula": "\\sum (\\text{Nox} \\cdot \\text{átomos}) = 0 \\quad (\\text{compuesto neutro})",
        "variables": ["Nox: número de oxidación", "Alcalinos: +1", "Alcalinotérreos: +2", "Oxígeno: -2 (excepto peróxidos -1)", "Hidrógeno: +1 (con no metales)"],
        "sections": [
            {
                "heading": "Reglas fijas de Estados de Oxidación",
                "body": "Elementos libres (O₂, Fe, Na) tienen Nox = 0. En sales binarias, los halógenos actúan con -1. En oxisales, identifica primero el anión poliatómico (SO₄²⁻, NO₃⁻, CO₃²⁻)."
            }
        ],
        "commonTrap": "No confundas óxido férrico (Fe₂O₃, Fe=+3) con óxido ferroso (FeO, Fe=+2).",
        "stepByStep": [
            {"step": "1", "text": "Escribe los estados de oxidación conocidos (O = -2, H = +1, metal alcalino = +1)."},
            {"step": "2", "text": "Plantea la ecuación lineal: n·Nox(catión) + m·Nox(anión) = 0."},
            {"step": "3", "text": "Despeja el Nox del elemento central y nombra según nomenclatura Stock o tradicional."}
        ],
        "example": {
            "prompt": "Determine el estado de oxidación del azufre en el ácido sulfúrico (H₂SO₄).",
            "steps": [
                "1. H = +1, O = -2.",
                "2. 2(+1) + S + 4(-2) = 0 ⇒ +2 + S - 8 = 0.",
                "3. S - 6 = 0 ⇒ S = +6."
            ],
            "result": "El estado de oxidación del azufre en H₂SO₄ es +6."
        }
    },
    {
        "id": "p1_qui_02",
        "part": "parte1",
        "subject": "quimica",
        "unit": "Átomo y Enlace",
        "priority": "Esencial",
        "eyebrow": "02 · Electrones y Átomo",
        "title": "Cuenta protones, neutrones y electrones sin perder el signo",
        "lead": "El número atómico Z identifica al elemento y define los protones. En un ion, la carga solo modifica el número de electrones; los protones del núcleo permanecen intactos.",
        "quickRule": "Un catión perdió electrones (e⁻ = Z - carga); un anión ganó electrones (e⁻ = Z + |carga|).",
        "formula": "A = Z + n \\qquad e^- = Z - \\text{carga} \\qquad n = A - Z",
        "variables": ["A: número másico", "Z: número atómico (protones)", "n: neutrones", "e⁻: electrones"],
        "sections": [
            {
                "heading": "Configuración electrónica de iones de transición",
                "body": "Para metales de transición como el Fe (Z=26, [Ar] 4s² 3d⁶), al formar el catión Fe²⁺ se pierden primero los electrones del nivel más externo 4s: Fe²⁺ = [Ar] 3d⁶ (24 electrones)."
            }
        ],
        "commonTrap": "Nunca restes electrones del subnivel 3d antes de vaciar el 4s en iones positivos de metales del bloque d.",
        "stepByStep": [
            {"step": "1", "text": "Encuentra Z en la tabla periódica o datos del problema."},
            {"step": "2", "text": "Si el ion es positivo (+q), resta q electrones: e⁻ = Z - q."},
            {"step": "3", "text": "Si el ion es negativo (-q), suma q electrones: e⁻ = Z + q."}
        ],
        "example": {
            "prompt": "El catión Al³⁺ tiene A = 27 y Z = 13. Determine su número de protones, neutrones y electrones.",
            "steps": [
                "1. Protones = Z = 13.",
                "2. Neutrones = A - Z = 27 - 13 = 14.",
                "3. Electrones = Z - carga = 13 - 3 = 10."
            ],
            "result": "Tiene 13 protones, 14 neutrones y 10 electrones."
        }
    },
    {
        "id": "p1_qui_03",
        "part": "parte1",
        "subject": "quimica",
        "unit": "Lewis y Geometría",
        "priority": "Esencial",
        "eyebrow": "03 · Estructura Molecular",
        "title": "La forma geométrica decide la polaridad",
        "lead": "No basta con saber si un enlace individual es polar: debes analizar la geometría tridimensional para determinar si los dipolos se cancelan por simetría.",
        "quickRule": "CO₂ tiene enlaces C=O muy polares, pero la molécula es 100% apolar porque es lineal y simétrica (dipolos opuestos se anulan).",
        "formula": "\\vec{\\mu}_{\\text{neto}} = \\sum \\vec{\\mu}_{\\text{enlace}} = 0 \\implies \\text{Molécula Apolar}",
        "variables": ["μ: momento dipolar", "Lineal: 180°", "Trigonal plana: 120°", "Tetraédrica: 109.5°", "Piramidal trigonal: 107°", "Angular: 104.5°"],
        "sections": [
            {
                "heading": "Geometrías clásicas de examen",
                "body": "• CH₄: Tetraédrica (apolar)\n• NH₃: Piramidal trigonal con 1 par libre en N (polar)\n• H₂O: Angular con 2 pares libres en O (muy polar)\n• BF₃: Trigonal plana con octeto incompleto en B (apolar)"
            }
        ],
        "commonTrap": "No asumas que tener enlaces polares hace que la molécula sea polar: la simetría espacial puede anular el momento dipolar total.",
        "stepByStep": [
            {"step": "1", "text": "Cuenta los electrones de valencia totales de la molécula."},
            {"step": "2", "text": "Dibuja la estructura de Lewis y cuenta los dominios electrónicos sobre el átomo central."},
            {"step": "3", "text": "Determina la geometría (RPECV) y verifica si los vectores dipolo se anulan."}
        ],
        "example": {
            "prompt": "¿Por qué el agua (H₂O) es polar mientras que el dióxido de carbono (CO₂) es apolar?",
            "steps": [
                "1. En CO₂, la geometría es lineal (180°) y los dos dipolos C=O apuntan en sentidos opuestos, anulándose (μ = 0).",
                "2. En H₂O, los dos pares libres del oxígeno distorsionan la molécula a geometría angular (104.5°), por lo que los dipolos se suman (μ ≠ 0)."
            ],
            "result": "El CO₂ es apolar por simetría lineal; el H₂O es polar por asimetría angular."
        }
    },
    {
        "id": "p1_qui_04",
        "part": "parte1",
        "subject": "quimica",
        "unit": "Mol y Reacciones",
        "priority": "Esencial",
        "eyebrow": "04 · Cantidad de Sustancia",
        "title": "De gramos a moles; de moles a respuesta",
        "lead": "Las ecuaciones químicas no se balancean en gramos sino en moles. Convierte siempre la masa a moles antes de aplicar las relaciones estequiométricas.",
        "quickRule": "n = m / M. 1 mol = 6.022 × 10²³ partículas. En CNPT: 1 mol de cualquier gas ideal ocupa 22.4 L.",
        "formula": "n = \\frac{m}{M} \\qquad N = n \\cdot N_A \\qquad \\%\\text{Rendimiento} = \\frac{\\text{Masa real}}{\\text{Masa teórica}} \\times 100",
        "variables": ["n: moles (mol)", "m: masa (g)", "M: masa molar (g/mol)", "NA: número de Avogadro = 6.022 × 10²³"],
        "sections": [
            {
                "heading": "Fórmula Empírica a Molecular",
                "body": "Calcula la masa de la fórmula empírica (M_emp). Halla el factor entero: k = M_molecular / M_emp. Multiplica todos los subíndices empíricos por k."
            }
        ],
        "commonTrap": "Nunca compares masas directamente en una reacción sin pasar por moles.",
        "stepByStep": [
            {"step": "1", "text": "Calcula los moles de cada reactivo disponible: n = m / M."},
            {"step": "2", "text": "Divide los moles entre sus respectivos coeficientes estequiométricos para hallar el limitante."},
            {"step": "3", "text": "Usa los moles del reactivo limitante para calcular la masa teórica producida."}
        ],
        "example": {
            "prompt": "La fórmula empírica de un hidrocarburo es CH₂ (M_emp = 14 g/mol) y su masa molar es 42 g/mol. Halle su fórmula molecular.",
            "steps": [
                "1. Factor k = M_molecular / M_emp = 42 / 14 = 3.",
                "2. Multiplicando los subíndices de (CH₂) por 3: C₁·₃ H₂·₃ = C₃H₆."
            ],
            "result": "La fórmula molecular es C₃H₆ (propeno o ciclopropano)."
        }
    }
]

# Define Parte II (Reported Exam August 19)
parte2_topics = [
    {
        "id": "p2_fis_01",
        "part": "parte2",
        "subject": "fisica",
        "unit": "Parte II · Examen reportado 19 ago",
        "priority": "Esencial",
        "eyebrow": "P2 · 01 · Energía",
        "title": "Péndulo, rampa y arco: sigue la energía",
        "lead": "El reporte del 19 de agosto repitió transformaciones de energía mecánica. No memorices el dibujo: ubica el punto más alto, el punto más bajo y verifica si existe rozamiento.",
        "quickRule": "Punto más bajo = rapidez y energía cinética máximas. Punto más alto = energía potencial gravitatoria máxima.",
        "formula": "E_m = K + U_g + U_e = \\text{cte} \\qquad K = \\frac{1}{2}m v^2 \\qquad U_g = m g h",
        "variables": ["K: cinética", "Ug: potencial gravitatoria", "Ue: potencial elástica", "Em: energía mecánica"],
        "sections": [
            {
                "heading": "El patrón que apareció en la prueba",
                "body": "• Péndulo oscilante: en el valle más bajo la energía cinética es máxima y la potencial es mínima.\n• Doble rampa de Galileo: si no hay fricción, sube exactamente hasta la misma altura inicial h, sin importar que la segunda rampa sea más larga o inclinada.\n• Arco tensado: la energía potencial elástica de la cuerda se transfiere como energía cinética de la flecha."
            }
        ],
        "commonTrap": "En las fotos apareció el distractor 'la energía potencial es constante'. Es FALSO: la energía potencial varía continuamente con la altura; lo que se mantiene constante es la energía mecánica total.",
        "stepByStep": [
            {"step": "1", "text": "Identifica los puntos de cota máxima y mínima en la trayectoria."},
            {"step": "2", "text": "Iguala la energía mecánica en ambos estados: E_1 = E_2."},
            {"step": "3", "text": "Despeja la velocidad: v = √(2gh)."}
        ],
        "example": {
            "prompt": "Un bloque de 2 kg baja sin rozamiento desde 5 m de altura. Use g = 10 m/s². ¿Cuál es su rapidez abajo?",
            "steps": [
                "1. Arriba: K = 0 y Ug = m·g·h = 2 · 10 · 5 = 100 J.",
                "2. Abajo: Ug = 0, por tanto K = 100 J.",
                "3. ½ · 2 · v² = 100 ⇒ v = √100 = 10 m/s."
            ],
            "result": "La rapidez al final es 10 m/s."
        }
    },
    {
        "id": "p2_fis_02",
        "part": "parte2",
        "subject": "fisica",
        "unit": "Parte II · Examen reportado 19 ago",
        "priority": "Esencial",
        "eyebrow": "P2 · 02 · Proyectiles",
        "title": "En el ápice no se detiene: conserva la velocidad horizontal",
        "lead": "En un tiro parabólico, la velocidad vertical en el punto más alto es cero (v_y = 0), pero la velocidad horizontal permanece constante e idéntica a la inicial (v_x = v_0x).",
        "quickRule": "En el punto más alto de un tiro parabólico: v_y = 0, pero v_total = v_0x ≠ 0 y la aceleración es la gravedad g dirigida hacia abajo.",
        "formula": "v_x = v_0 \\cos\\theta = \\text{constante} \\qquad v_y = v_0 \\sin\\theta - g t \\qquad a = g \\; (\\text{hacia abajo})",
        "variables": ["vx: componente horizontal constante", "vy: componente vertical variable", "g: 9.8 m/s²"],
        "sections": [
            {
                "heading": "Paquete soltado desde un avión",
                "body": "Un paquete liberado desde un avión que vuela horizontalmente a 180 m/s conserva v_x = 180 m/s y para un observador en tierra describe una trayectoria parabólica hacia adelante."
            }
        ],
        "commonTrap": "No caigas en la trampa de marcar 'en el punto más alto la velocidad es cero'. Solo es cero la componente vertical; la horizontal sigue viva.",
        "stepByStep": [
            {"step": "1", "text": "Descompón la velocidad inicial en v_0x y v_0y."},
            {"step": "2", "text": "En el punto más alto, v_y = 0."},
            {"step": "3", "text": "La velocidad resultante es simplemente v = v_0x."}
        ],
        "example": {
            "prompt": "Se lanza un proyectil con v₀ = 20 m/s a 30° sobre la horizontal. ¿Cuál es su velocidad en el punto más alto?",
            "steps": [
                "1. v_0x = 20 · cos(30°) = 20 · (√3 / 2) = 10√3 ≈ 17.32 m/s.",
                "2. En la cúspide, v_y = 0 m/s.",
                "3. v_total = v_0x = 10√3 m/s horizontal hacia adelante."
            ],
            "result": "La velocidad en el punto más alto es 17.32 m/s horizontal."
        }
    },
    {
        "id": "p2_fis_03",
        "part": "parte2",
        "subject": "fisica",
        "unit": "Parte II · Examen reportado 19 ago",
        "priority": "Esencial",
        "eyebrow": "P2 · 03 · 2da Ley",
        "title": "Aceleración vertical con fuerza aplicada (1 kg → 3 N)",
        "lead": "Reportado en la prueba: Objeto de 1.0 kg arrojado hacia abajo con v₀ = 2.0 m/s que alcanza 14.0 m/s en 4.0 s. La aceleración real se obtiene de la cinemática de velocidades.",
        "quickRule": "a = (14 - 2)/4 = 3.0 m/s². Segunda ley: F_neta = m · a = (1.0 kg)(3.0 m/s²) = 3.0 N.",
        "formula": "a = \\frac{v_f - v_0}{t} \\qquad F_{\\text{neta}} = m \\cdot a",
        "variables": ["m: 1.0 kg", "v0: 2.0 m/s", "vf: 14.0 m/s", "t: 4.0 s", "F: fuerza resultante"],
        "sections": [
            {
                "heading": "Diferencia entre Peso y Fuerza Resultante",
                "body": "El peso es W = mg = 9.8 N. La fuerza neta resultante es la suma de todas las fuerzas aplicadas, que por la 2da ley de Newton vale m·a = 3.0 N."
            }
        ],
        "commonTrap": "No respondas 9.8 N de memoria: el problema da datos cinemáticos explícitos para calcular la fuerza neta real.",
        "stepByStep": [
            {"step": "1", "text": "Calcula la aceleración: a = (14 - 2) / 4 = 3.0 m/s²."},
            {"step": "2", "text": "Multiplica por la masa: F_neta = 1.0 kg · 3.0 m/s² = 3.0 N."}
        ],
        "example": {
            "prompt": "Un objeto de 1.0 kg pasa de 2 m/s a 14 m/s en 4 s. Determine la fuerza resultante neta.",
            "steps": [
                "1. a = (14 - 2) / 4 = 12 / 4 = 3.0 m/s².",
                "2. F_neta = m · a = 1.0 · 3.0 = 3.0 N."
            ],
            "result": "La fuerza neta es 3.0 N."
        }
    },
    {
        "id": "p2_qui_01",
        "part": "parte2",
        "subject": "quimica",
        "unit": "Parte II · Examen reportado 19 ago",
        "priority": "Esencial",
        "eyebrow": "P2 · 01 · Estequiometría",
        "title": "Proporción estequiométrica exacta en óxido de magnesio",
        "lead": "Reportado en la prueba: Se mezclan 24.0 g de Mg con 16.0 g de O₂. Ambos se consumen en proporción exacta 2:1 produciendo 40.0 g de MgO.",
        "quickRule": "24 g Mg (1 mol) reacciona exactamente con 16 g O₂ (0.5 mol). Por conservación de masa: 24 + 16 = 40.0 g de MgO sin reactivo limitante ni sobrante.",
        "formula": "2\\,\\text{Mg} + \\text{O}_2 \\to 2\\,\\text{MgO} \\qquad 1.0\\,\\text{mol Mg} + 0.5\\,\\text{mol O}_2 = 1.0\\,\\text{mol MgO} \\; (40.0\\,\\text{g})",
        "variables": ["n(Mg) = 24.0 / 24.0 = 1.0 mol", "n(O₂) = 16.0 / 32.0 = 0.5 mol", "Razón requerida: 2:1", "Razón disponible: 1.0 / 0.5 = 2:1 (Exacta)"],
        "sections": [
            {
                "heading": "Cero reactivo en exceso",
                "body": "Como la proporción molar disponible es exactamente igual al coeficiente estequiométrico 2:1, ambos reactivos se agotan a la vez. No hay limitante ni exceso."
            }
        ],
        "commonTrap": "No marques que el Mg es limitante: la opción correcta es que ambos se consumen por completo en proporción exacta.",
        "stepByStep": [
            {"step": "1", "text": "Halla moles de Mg: 24 g / 24 g/mol = 1.0 mol."},
            {"step": "2", "text": "Halla moles de O₂: 16 g / 32 g/mol = 0.5 mol."},
            {"step": "3", "text": "Compara la relación molar: 1.0 / 0.5 = 2.0 (Exacta 2:1). Masa final = 40.0 g."}
        ],
        "example": {
            "prompt": "2Mg + O₂ → 2MgO. Reaccionan 24 g de Mg con 16 g de O₂. ¿Qué masa de MgO se forma?",
            "steps": [
                "1. n(Mg) = 1.0 mol, n(O₂) = 0.5 mol.",
                "2. La proporción 2:1 es exacta.",
                "3. Se forma 1.0 mol de MgO = 40.0 g."
            ],
            "result": "Ambos se consumen al 100% y se obtienen 40.0 g de MgO."
        }
    },
    {
        "id": "p2_qui_02",
        "part": "parte2",
        "subject": "quimica",
        "unit": "Parte II · Examen reportado 19 ago",
        "priority": "Esencial",
        "eyebrow": "P2 · 02 · Reactivo Limitante",
        "title": "Reactivo limitante y exceso en síntesis de amoníaco",
        "lead": "Reportado en la prueba: 28.0 g de N₂ (28.0 g/mol) con 9.0 g de H₂ (2.0 g/mol). El N₂ se agota primero y sobran 3.0 g de H₂ en exceso.",
        "quickRule": "1 mol N₂ (28 g) consume 3 moles de H₂ (6 g). Como tenemos 9 g de H₂ (4.5 mol), el N₂ es el limitante y sobran 9 - 6 = 3.0 g de H₂.",
        "formula": "\\text{N}_2 + 3\\,\\text{H}_2 \\to 2\\,\\text{NH}_3 \\qquad m_{\\text{exceso}} = 9.0\\,\\text{g} - 6.0\\,\\text{g} = 3.0\\,\\text{g de H}_2",
        "variables": ["n(N₂) = 28 / 28 = 1.0 mol", "n(H₂) = 9.0 / 2.0 = 4.5 mol", "H₂ requerido: 3.0 mol (6.0 g)", "H₂ sobrante: 1.5 mol (3.0 g)"],
        "sections": [
            {
                "heading": "Cálculo directo del sobrante",
                "body": "1 mol de N₂ necesita 3 moles de H₂. Disponemos de 4.5 moles de H₂. Por tanto, sobran 4.5 - 3.0 = 1.5 moles de H₂ = 1.5 × 2.0 g/mol = 3.0 g."
            }
        ],
        "commonTrap": "No confundas los moles sobrantes (1.5 mol) con los gramos sobrantes (3.0 g). Multiplica siempre por la masa molar del H₂ (2.0 g/mol).",
        "stepByStep": [
            {"step": "1", "text": "n(N₂) = 28 / 28 = 1.0 mol. n(H₂) = 9 / 2 = 4.5 mol."},
            {"step": "2", "text": "1 mol de N₂ consume 3.0 mol de H₂. N₂ es el reactivo limitante."},
            {"step": "3", "text": "Exceso: 4.5 - 3.0 = 1.5 mol de H₂ = 3.0 g."}
        ],
        "example": {
            "prompt": "En N₂ + 3H₂ → 2NH₃, reaccionan 28 g de N₂ con 9 g de H₂. ¿Cuál es el limitante y cuánto sobra?",
            "steps": [
                "1. n(N₂) = 1.0 mol (limitante).",
                "2. H₂ consumido = 3.0 mol = 6.0 g.",
                "3. H₂ sobrante = 9.0 g - 6.0 g = 3.0 g."
            ],
            "result": "El N₂ es el limitante y sobran 3.0 g de H₂ en exceso."
        }
    },
    {
        "id": "p2_len_01",
        "part": "parte2",
        "subject": "lenguaje",
        "unit": "Parte II · Examen reportado 19 ago",
        "priority": "Esencial",
        "eyebrow": "P2 · 01 · Lectura Crítica",
        "title": "Método infalible para la Tesis y Argumentos",
        "lead": "La tesis es la postura u opinión central debatible que defiende el autor a lo largo del texto. Los ejemplos, estadísticas y citas son argumentos de apoyo.",
        "quickRule": "Pregúntate: ¿Qué opinión quiere el autor que yo acepte? Si es un hecho objetivo no debatible, es evidencia o dato, no la tesis.",
        "formula": "\\text{Tesis} = \\text{Tema General} + \\text{Postura Valorativa Central}",
        "variables": ["Tema: el asunto general", "Tesis: la opinión central defendida", "Argumentos: evidencias de respaldo"],
        "sections": [
            {
                "heading": "Pasos para ubicar la Tesis",
                "body": "1. Revisa la introducción: suele presentarse la postura.\n2. Revisa la conclusión: suele reafirmarse la tesis.\n3. Descarta oraciones que solo den datos aislados o ejemplos secundarios."
            }
        ],
        "commonTrap": "No elijas la opción con más números o tecnicismos: la tesis es una postura conceptual integradora.",
        "stepByStep": [
            {"step": "1", "text": "Lee el primer y último párrafo para identificar la postura."},
            {"step": "2", "text": "Comprueba que los demás párrafos sirvan de argumento a esa idea."},
            {"step": "3", "text": "Descarta opciones con hechos que no expresen opinión."}
        ],
        "example": {
            "prompt": "¿Cuál es la tesis en un texto que concluye: 'La inversión en ciencia básica es el único motor sostenible para el desarrollo de un país'?",
            "steps": [
                "1. El tema es el desarrollo y la inversión en ciencia.",
                "2. La oración expresa una valoración contundente y propositiva del autor."
            ],
            "result": "La tesis es que la inversión en ciencia básica es indispensable para el progreso."
        }
    }
]

# Quizzes
quizzes = [
    {
        "id": "q1",
        "topicId": "p1_fis_01",
        "subject": "fisica",
        "topic": "Cinemática",
        "prompt": "En el punto más alto de un tiro vertical, despreciando el aire:",
        "options": [
            "La velocidad y la aceleración son cero.",
            "La velocidad es cero y la aceleración apunta hacia abajo.",
            "La aceleración es cero y la rapidez es máxima.",
            "La velocidad apunta hacia arriba."
        ],
        "answer": 1,
        "explanation": "En el ápice, la velocidad instantánea se anula (v = 0), pero la aceleración de la gravedad sigue actuando hacia abajo (g = 9.8 m/s²)."
    },
    {
        "id": "q2",
        "topicId": "p1_fis_02",
        "subject": "fisica",
        "topic": "Newton",
        "prompt": "Una fuerza neta de 20 N actúa sobre una masa de 5 kg. La aceleración es:",
        "options": [
            "0.25 m/s²",
            "4 m/s²",
            "15 m/s²",
            "100 m/s²"
        ],
        "answer": 1,
        "explanation": "Segunda ley: a = F / m = 20 N / 5 kg = 4 m/s²."
    },
    {
        "id": "q3",
        "topicId": "p1_fis_03",
        "subject": "fisica",
        "topic": "Energía",
        "prompt": "En un péndulo ideal que oscila sin rozamiento, ¿en qué punto es máxima la energía cinética?",
        "options": [
            "En el punto más bajo de la trayectoria.",
            "En cualquiera de los dos extremos superiores.",
            "En todos los puntos por igual.",
            "Solo cuando va subiendo."
        ],
        "answer": 0,
        "explanation": "En el punto más bajo, la energía potencial gravitatoria es mínima (h = 0) y toda la energía mecánica se ha transformado en energía cinética máxima."
    },
    {
        "id": "q4",
        "topicId": "p2_fis_03",
        "subject": "fisica",
        "topic": "Newton",
        "prompt": "Un objeto de 1.0 kg se tira hacia abajo con v₀ = 2 m/s y alcanza 14 m/s en 4 s. La fuerza neta resultante es:",
        "options": [
            "9.8 N",
            "3.0 N",
            "14.0 N",
            "0.5 N"
        ],
        "answer": 1,
        "explanation": "a = (14 - 2)/4 = 3.0 m/s². Fuerza neta F = m·a = (1.0 kg)(3.0 m/s²) = 3.0 N."
    },
    {
        "id": "q5",
        "topicId": "p1_qui_01",
        "subject": "quimica",
        "topic": "Nomenclatura",
        "prompt": "El nombre Stock correcto del compuesto FeCl₃ es:",
        "options": [
            "Cloruro de hierro (II)",
            "Cloruro de hierro (III)",
            "Tricloruro férrico",
            "Clorato de hierro"
        ],
        "answer": 1,
        "explanation": "Cada Cl actúa con -1; por tanto, el Fe tiene estado de oxidación +3. Su nombre Stock oficial es cloruro de hierro (III)."
    },
    {
        "id": "q6",
        "topicId": "p2_qui_01",
        "subject": "quimica",
        "topic": "Estequiometría",
        "prompt": "2Mg + O₂ → 2MgO. Si reaccionan 24 g de Mg (24 g/mol) con 16 g de O₂ (32 g/mol):",
        "options": [
            "El Mg es limitante y se obtienen 20 g de MgO.",
            "Ambos se consumen en proporción exacta y se obtienen 40.0 g de MgO.",
            "El O₂ es limitante y se obtienen 80 g de MgO.",
            "Sobran 8 g de Mg sin reaccionar."
        ],
        "answer": 1,
        "explanation": "24 g Mg = 1.0 mol; 16 g O₂ = 0.5 mol. La relación 1.0 : 0.5 es exactamente 2:1. Ambos reactivos se consumen al 100% produciendo 40.0 g de MgO."
    },
    {
        "id": "q7",
        "topicId": "p2_len_01",
        "subject": "lenguaje",
        "topic": "Lectura Crítica",
        "prompt": "En un texto argumentativo, la tesis se define como:",
        "options": [
            "Un dato estadístico inmutable verificado por un censo.",
            "La postura u opinión central que el autor defiende con argumentos.",
            "El resumen de las ideas secundarias del marco teórico.",
            "La definición de diccionario de la palabra clave."
        ],
        "answer": 1,
        "explanation": "La tesis es la postura u opinión central que el autor defiende a lo largo del texto mediante argumentos y evidencias."
    }
]

# Write to file
output = {
    "parte1": parte1_topics,
    "parte2": parte2_topics,
    "quizzes": quizzes
}

with open('js/study-data-all.js', 'w', encoding='utf-8') as f:
    f.write("/* Banco de Estudio EPN Día 2 — Exact Manus App Replica */\n")
    f.write("window.STUDY_DATA = " + json.dumps(output, indent=2, ensure_ascii=False) + ";\n")

print("Successfully generated js/study-data-all.js with clean LaTeX and rich hand examples!")
