import json

# =========================================================================
# PARTE I: FUNDAMENTOS ESENCIALES (8 TEMAS)
# =========================================================================
parte1_topics = [
    {
        "id": "p1_fis_01",
        "part": "parte1",
        "subject": "fisica",
        "unit": "Movimiento",
        "priority": "Esencial",
        "eyebrow": "01 · Cinemática",
        "title": "Convierte el recorrido en una ecuación",
        "lead": "Antes de usar una fórmula, identifica si el movimiento es uniforme ($a = 0$), acelerado ($a = \\text{cte}$) o en dos dimensiones. La unidad coherente en el SI es la mitad de la respuesta.",
        "quickRule": "Si la dirección cambia, la velocidad cambia; por eso existe aceleración centrípeta $a_c$ aunque la rapidez sea constante.",
        "formula": "v = \\frac{\\Delta x}{\\Delta t} \\qquad a = \\frac{\\Delta v}{\\Delta t} \\qquad x = x_0 + v_0 t + \\frac{1}{2}a t^2",
        "variables": ["$x$: posición ($\\text{m}$)", "$v$: velocidad ($\\text{m/s}$)", "$a$: aceleración ($\\text{m/s}^2$)", "$t$: tiempo ($\\text{s}$)"],
        "sections": [
            {
                "heading": "Distancia no es desplazamiento",
                "body": "La distancia $d$ es la longitud total recorrida y siempre es positiva. El desplazamiento $\\Delta x = x_f - x_0$ es el vector neto entre la posición inicial y final."
            },
            {
                "heading": "Gráficas $v$ vs $t$",
                "body": "La pendiente de la gráfica $v-t$ representa la aceleración instantánea $a = \\frac{\\Delta v}{\\Delta t}$. El área bajo la curva corresponde al desplazamiento $\\Delta x$."
            }
        ],
        "commonTrap": "No confundas rapidez media ($\\frac{\\text{distancia}}{t}$) con el módulo de la velocidad media ($\\frac{|\\Delta x|}{t}$). En una pista cerrada de $400\\text{ m}$, el desplazamiento es $\\Delta x = 0$.",
        "stepByStep": [
            {"step": "1", "text": "Identifica si la aceleración es nula ($a = 0$) o constante ($a = \\text{cte}$)."},
            {"step": "2", "text": "Convierte todas las magnitudes al SI ($\\text{m}$, $\\text{s}$, $\\text{m/s}$)."},
            {"step": "3", "text": "Aplica la ecuación cinemática que relacione las variables conocidas."}
        ],
        "example": {
            "prompt": "Un móvil parte del reposo con aceleración constante de $3\\text{ m/s}^2$ durante $4\\text{ s}$. ¿Qué distancia recorre y qué rapidez final alcanza?",
            "steps": [
                "1. Rapidez final: $v_f = v_0 + a t = 0 + (3\\text{ m/s}^2)(4\\text{ s}) = 12\\text{ m/s}$.",
                "2. Distancia: $d = v_0 t + \\frac{1}{2}a t^2 = 0 + \\frac{1}{2}(3\\text{ m/s}^2)(4\\text{ s})^2 = 24\\text{ m}$."
            ],
            "result": "Distancia $d = 24\\text{ m}$ | Rapidez final $v_f = 12\\text{ m/s}$"
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
        "lead": "La segunda ley de Newton conecta la fuerza resultante externa con el cambio de movimiento. El diagrama de cuerpo libre (DCL) evita errores de signo.",
        "quickRule": "Fuerza neta nula ($\\sum \\vec{F} = 0$) significa equilibrio traslacional (reposo o MRU a velocidad constante), no ausencia de fuerzas.",
        "formula": "\\sum \\vec{F} = m \\vec{a} \\qquad P = m g \\qquad f_k = \\mu_k N",
        "variables": ["$F$: fuerza neta ($\\text{N}$)", "$m$: masa ($\\text{kg}$)", "$a$: aceleración ($\\text{m/s}^2$)", "$N$: normal ($\\text{N}$)", "$\\mu_k$: coef. fricción"],
        "sections": [
            {
                "heading": "Tercera Ley: Acción y Reacción",
                "body": "Son iguales en magnitud ($|\\vec{F}_{AB}| = |\\vec{F}_{BA}|$) y opuestas en sentido, pero actúan sobre cuerpos distintos: jamás se anulan entre sí en el mismo cuerpo."
            },
            {
                "heading": "La fuerza normal no siempre es igual al peso",
                "body": "En un plano horizontal $N = mg$. En un plano inclinado de ángulo $\\theta$, $N = mg \\cos\\theta$. Con una fuerza de tracción hacia arriba $T$, $N = mg - T$."
            }
        ],
        "commonTrap": "No sumes la fuerza de reacción en el diagrama del mismo cuerpo que ejerce la acción.",
        "stepByStep": [
            {"step": "1", "text": "Aísla el cuerpo y traza los ejes $x$ e $y$ alineados con el movimiento."},
            {"step": "2", "text": "Dibuja el peso $P = mg$, la normal $N$ y la fricción $f_k = \\mu_k N$ opuesta al deslizamiento."},
            {"step": "3", "text": "Aplica $\\sum F_x = m a$ y $\\sum F_y = 0$."}
        ],
        "example": {
            "prompt": "Una fuerza neta horizontal de $20\\text{ N}$ actúa sobre un bloque de $5\\text{ kg}$ sobre una superficie sin fricción. ¿Cuál es su aceleración?",
            "steps": [
                "1. En el eje horizontal, la única fuerza neta es $F = 20\\text{ N}$.",
                "2. Aplicando $\\sum F = m a$: $20\\text{ N} = (5\\text{ kg}) a$.",
                "3. Despejando: $a = \\frac{20}{5} = 4\\text{ m/s}^2$."
            ],
            "result": "Aceleración $a = 4\\text{ m/s}^2$"
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
        "lead": "Sin fuerzas no conservativas (como fricción o resistencia del aire), la energía mecánica total $E_m$ permanece constante en todos los puntos.",
        "quickRule": "Conservación: $E_m = K + U_g + U_e = \\text{constante}$. En el punto más alto $K = 0$; en el valle $U_g = 0$ y $K$ es máxima ($v = \\sqrt{2gh}$).",
        "formula": "E_m = K + U_g + U_e = \\text{cte} \\qquad K = \\frac{1}{2}m v^2 \\qquad U_g = m g h \\qquad U_e = \\frac{1}{2}k x^2",
        "variables": ["$K$: cinética ($\\text{J}$)", "$U_g$: potencial gravitatoria ($\\text{J}$)", "$U_e$: potencial elástica ($\\text{J}$)", "$W$: trabajo ($\\text{J}$)"],
        "sections": [
            {
                "heading": "Trabajo de fuerzas perpendiculares es cero",
                "body": "Como $W = F d \\cos(90^\\circ) = 0$, fuerzas como la normal y la centrípeta no realizan trabajo mecánico sobre el cuerpo."
            }
        ],
        "commonTrap": "Si existe fricción, la energía mecánica no se conserva: $E_{\\text{final}} = E_{\\text{inicial}} - |W_{\\text{fricción}}|$, donde $|W_f| = f_k d = \\mu_k N d$.",
        "stepByStep": [
            {"step": "1", "text": "Establece el nivel de referencia de altura cero ($h = 0$)."},
            {"step": "2", "text": "Calcula la energía inicial: $E_1 = K_1 + U_{g1} + U_{e1}$."},
            {"step": "3", "text": "Iguala con la energía final: $E_1 = E_2$ y despeja la rapidez $v = \\sqrt{2gh}$."}
        ],
        "example": {
            "prompt": "Un objeto de $2\\text{ kg}$ se suelta desde el reposo a una altura de $5\\text{ m}$ sin fricción. Use $g = 10\\text{ m/s}^2$. ¿Cuál es su rapidez al llegar al suelo?",
            "steps": [
                "1. Arriba: $K_1 = 0$, $U_{g1} = m g h = (2\\text{ kg})(10\\text{ m/s}^2)(5\\text{ m}) = 100\\text{ J}$.",
                "2. Abajo: $U_{g2} = 0$, $K_2 = \\frac{1}{2} m v^2 = \\frac{1}{2}(2\\text{ kg}) v^2 = v^2$.",
                "3. Conservación: $100 = v^2 \\implies v = \\sqrt{100} = 10\\text{ m/s}$."
            ],
            "result": "Rapidez final $v = 10\\text{ m/s}$"
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
        "lead": "El impulso $\\vec{J}$ de una fuerza externa modifica la cantidad de movimiento $\\vec{p}$. En un sistema aislado, el momento total se conserva.",
        "quickRule": "Teorema del impulso: $\\vec{J} = \\vec{F} \\Delta t = \\Delta \\vec{p} = m (\\vec{v}_f - \\vec{v}_0)$. En choques aislados: $\\sum \\vec{p}_i = \\sum \\vec{p}_f$.",
        "formula": "\\vec{J} = \\vec{F}\\Delta t = \\Delta \\vec{p} \\qquad \\vec{p} = m\\vec{v} \\qquad \\sum \\vec{p}_i = \\sum \\vec{p}_f",
        "variables": ["$p$: momento lineal ($\\text{kg}\\cdot\\text{m/s}$)", "$J$: impulso ($\\text{N}\\cdot\\text{s}$)", "$F$: fuerza ($\\text{N}$)", "$\\Delta t$: tiempo ($\\text{s}$)"],
        "sections": [
            {
                "heading": "Choque Elástico vs Inelástico",
                "body": "En todo choque se conserva el momento lineal total. En choques elásticos se conserva además la energía cinética. En choques inelásticos los cuerpos quedan unidos."
            }
        ],
        "commonTrap": "El momento lineal es un vector: si un balón rebota con la misma rapidez $v$, el cambio es $\\Delta p = -m v - (+m v) = -2mv$.",
        "stepByStep": [
            {"step": "1", "text": "Define la dirección positiva de referencia ($+x$)."},
            {"step": "2", "text": "Calcula el impulso $J = F \\Delta t$."},
            {"step": "3", "text": "Iguala a $\\Delta p = m (v_f - v_0)$ y despeja $v_f$."}
        ],
        "example": {
            "prompt": "Una fuerza de $10\\text{ N}$ actúa durante $0.4\\text{ s}$ sobre un balón de $0.5\\text{ kg}$ inicialmente en reposo. ¿Cuál es su rapidez final?",
            "steps": [
                "1. Impulso: $J = F \\Delta t = (10\\text{ N})(0.4\\text{ s}) = 4.0\\text{ N}\\cdot\\text{s}$.",
                "2. Relación impulso-momento: $4.0 = (0.5\\text{ kg})(v_f - 0)$.",
                "3. Despejando: $v_f = \\frac{4.0}{0.5} = 8\\text{ m/s}$."
            ],
            "result": "Rapidez adquirida $v_f = 8\\text{ m/s}$"
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
        "lead": "En cualquier compuesto neutro, la suma algebraica de los estados de oxidación multiplicados por sus respectivos subíndices debe ser exactamente cero.",
        "quickRule": "En $\\text{FeCl}_3$, cada $\\text{Cl}$ actúa con $-1$: el hierro tiene estado de oxidación $+3$. Su nombre Stock oficial es cloruro de hierro (III).",
        "formula": "\\sum (\\text{Nox} \\cdot \\text{átomos}) = 0 \\quad (\\text{compuesto neutro})",
        "variables": ["$\\text{Nox}$: estado de oxidación", "Alcalinos: $+1$", "Alcalinotérreos: $+2$", "Oxígeno: $-2$", "Hidrógeno: $+1$"],
        "sections": [
            {
                "heading": "Iones poliatómicos fundamentales",
                "body": "• Sulfato: $\\text{SO}_4^{2-}$\n• Nitrato: $\\text{NO}_3^-$\n• Carbonato: $\\text{CO}_3^{2-}$\n• Hidróxido: $\\text{OH}^-$\n• Dicromato: $\\text{Cr}_2\\text{O}_7^{2-}$"
            }
        ],
        "commonTrap": "No confundas el óxido ferroso ($\\text{FeO}$, $\\text{Fe} = +2$) con el óxido férrico ($\\text{Fe}_2\\text{O}_3$, $\\text{Fe} = +3$).",
        "stepByStep": [
            {"step": "1", "text": "Escribe los estados de oxidación conocidos ($\\text{O} = -2$, $\\text{H} = +1$, metales grupo 1 = $+1$)."},
            {"step": "2", "text": "Plantea la ecuación lineal: $\\sum \\text{Nox} = 0$."},
            {"step": "3", "text": "Despeja el $\\text{Nox}$ del elemento central y nombra según Stock."}
        ],
        "example": {
            "prompt": "Determine el estado de oxidación del azufre en el ácido sulfúrico ($\\text{H}_2\\text{SO}_4$).",
            "steps": [
                "1. $\\text{H} = +1$, $\\text{O} = -2$.",
                "2. $2(+1) + \\text{Nox}(S) + 4(-2) = 0 \\implies +2 + S - 8 = 0$.",
                "3. $S - 6 = 0 \\implies S = +6$."
            ],
            "result": "Estado de oxidación del Azufre: $+6$"
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
        "lead": "El número atómico $Z$ identifica al elemento ($p^+ = Z$). En un ion, la carga solo modifica los electrones ($e^-$); los protones y neutrones nucleares permanecen constantes.",
        "quickRule": "Un catión perdió electrones ($e^- = Z - \\text{carga}$); un anión ganó electrones ($e^- = Z + |\\text{carga}|$).",
        "formula": "A = Z + n \\qquad e^- = Z - \\text{carga} \\qquad n = A - Z",
        "variables": ["$A$: número másico", "$Z$: protones", "$n$: neutrones", "$e^-$: electrones"],
        "sections": [
            {
                "heading": "Cationes de metales de transición",
                "body": "En el hierro ($Z = 26$, configuración $[\\text{Ar}] 4s^2 3d^6$), al formar $\\text{Fe}^{2+}$ se pierden primero los $2$ electrones del nivel $4s$, quedando $[\\text{Ar}] 3d^6$ con $24$ electrones."
            }
        ],
        "commonTrap": "Nunca restes electrones del subnivel $3d$ antes de vaciar el nivel más externo $4s$.",
        "stepByStep": [
            {"step": "1", "text": "Identifica $Z$ (protones) y $A$ (masa atómica)."},
            {"step": "2", "text": "Calcula los neutrones: $n = A - Z$."},
            {"step": "3", "text": "Ajusta electrones: $e^- = Z - \\text{carga}$."}
        ],
        "example": {
            "prompt": "Para el catión $^{27}_{13}\\text{Al}^{3+}$, determine el número de protones, neutrones y electrones.",
            "steps": [
                "1. Protones $p^+ = Z = 13$.",
                "2. Neutrones $n = A - Z = 27 - 13 = 14$.",
                "3. Electrones $e^- = Z - 3 = 13 - 3 = 10$."
            ],
            "result": "$13$ protones, $14$ neutrones, $10$ electrones"
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
        "lead": "No basta con saber si un enlace individual es polar: si la geometría tridimensional de la molécula es simétrica, los vectores dipolo se anulan vectorialmente.",
        "quickRule": "$\\text{CO}_2$ es lineal ($180^\\circ$) y apolar ($\\mu_{\\text{neto}} = 0$). $\\text{H}_2\\text{O}$ es angular ($104.5^\\circ$) y polar debido a los $2$ pares de electrones libres del oxígeno.",
        "formula": "\\vec{\\mu}_{\\text{neto}} = \\sum \\vec{\\mu}_{\\text{enlace}} = 0 \\implies \\text{Molécula Apolar}",
        "variables": ["$\\mu$: momento dipolar", "Lineal: $180^\\circ$", "Trigonal plana: $120^\\circ$", "Tetraédrica: $109.5^\\circ$", "Angular: $104.5^\\circ$"],
        "sections": [
            {
                "heading": "Geometrías clásicas de la prueba",
                "body": "• $\\text{CH}_4$: Tetraédrica (apolar)\n• $\\text{NH}_3$: Piramidal trigonal (polar)\n• $\\text{BF}_3$: Trigonal plana (apolar)\n• $\\text{H}_2\\text{O}$: Angular (muy polar)"
            }
        ],
        "commonTrap": "Tener enlaces polares no garantiza que la molécula sea polar: la simetría espacial anula el momento dipolar.",
        "stepByStep": [
            {"step": "1", "text": "Dibuja la estructura de Lewis con pares enlazantes y no enlazantes."},
            {"step": "2", "text": "Cuenta dominios electrónicos sobre el átomo central para definir la geometría RPECV."},
            {"step": "3", "text": "Comprueba si la distribución espacial anula la resultante dipolar."}
        ],
        "example": {
            "prompt": "¿Por qué el metano ($\\text{CH}_4$) es apolar?",
            "steps": [
                "1. El carbono central tiene 4 enlaces $\\text{C-H}$ distribuidos en un tetraedro regular ($109.5^\\circ$).",
                "2. La simetría espacial perfecta provoca que la suma vectorial de los dipolos sea nula: $\\vec{\\mu}_{\\text{neto}} = 0$."
            ],
            "result": "El $\\text{CH}_4$ es apolar debido a su simetría tetraédrica."
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
        "lead": "Las relaciones estequiométricas se formulan en moles, nunca en gramos directos. Convierte siempre la masa a moles ($n = \\frac{m}{M}$) antes de operar.",
        "quickRule": "$n = \\frac{m}{M}$. $1\\text{ mol} = 6.022 \\times 10^{23}\\text{ partículas}$. En CNPT, $1\\text{ mol}$ de cualquier gas ideal ocupa $22.4\\text{ L}$.",
        "formula": "n = \\frac{m}{M} \\qquad N = n \\cdot N_A \\qquad \\%\\text{Rendimiento} = \\frac{\\text{Masa real}}{\\text{Masa teórica}} \\times 100",
        "variables": ["$n$: moles ($\\text{mol}$)", "$m$: masa ($\\text{g}$)", "$M$: masa molar ($\\text{g/mol}$)", "$N_A = 6.022 \\times 10^{23}$"],
        "sections": [
            {
                "heading": "De Fórmula Empírica a Molecular",
                "body": "Calcula la masa molar de la fórmula empírica ($M_{\\text{emp}}$). Obtén el factor entero $k = \\frac{M_{\\text{molecular}}}{M_{\\text{emp}}}$ y multiplica cada subíndice por $k$."
            }
        ],
        "commonTrap": "Nunca compares masas de reactivos sin convertirlas previamente a moles.",
        "stepByStep": [
            {"step": "1", "text": "Calcula los moles de reactivos: $n = \\frac{m}{M}$."},
            {"step": "2", "text": "Divide los moles entre sus coeficientes estequiométricos para identificar el reactivo limitante."},
            {"step": "3", "text": "Calcula la masa teórica producida a partir del reactivo limitante."}
        ],
        "example": {
            "prompt": "La fórmula empírica de un hidrocarburo es $\\text{CH}_2$ ($M_{\\text{emp}} = 14\\text{ g/mol}$) y su masa molar real es $42\\text{ g/mol}$. Determine su fórmula molecular.",
            "steps": [
                "1. Factor $k = \\frac{M_{\\text{molecular}}}{M_{\\text{emp}}} = \\frac{42}{14} = 3$.",
                "2. Multiplicando los subíndices de $(\\text{CH}_2)$ por 3: $(\\text{CH}_2)_3 = \\text{C}_3\\text{H}_6$."
            ],
            "result": "Fórmula molecular: $\\text{C}_3\\text{H}_6$ (propeno)"
        }
    }
]

# =========================================================================
# PARTE II: EXAMEN REPORTADO 19 DE AGOSTO (12 TEMAS COMPLETOS)
# =========================================================================
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
        "quickRule": "Punto más bajo = rapidez $v_{\\text{máx}}$ y energía cinética $K_{\\text{máx}}$. Punto más alto = energía potencial gravitatoria $U_{g,\\text{máx}}$. Rapidez: $v = \\sqrt{2gh}$.",
        "formula": "E_m = K + U_g + U_e = \\text{cte} \\qquad K = \\frac{1}{2}m v^2 \\qquad U_g = m g h",
        "variables": ["$K$: cinética ($\\text{J}$)", "$U_g$: potencial gravitatoria ($\\text{J}$)", "$U_e$: potencial elástica ($\\text{J}$)", "$E_m$: energía mecánica"],
        "sections": [
            {
                "heading": "Caja vertical vs Rampa inclinada (Reporte 19 ago)",
                "body": "Pregunta reportada: ¿Alzar una caja verticalmente requiere el mismo trabajo que empujarla por una rampa sin fricción? Respuesta: El **trabajo realizado contra la gravedad es exactamente el mismo** ($W = mgh$), pero la **fuerza aplicada en la rampa es menor** ($F = mg\\sin\\theta$) porque se aplica a lo largo de mayor distancia."
            },
            {
                "heading": "Péndulo oscilante y Doble rampa de Galileo",
                "body": "• Péndulo: en el punto más bajo $U_g = 0$ y $K$ es máxima. En los extremos $v = 0$ y $U_g$ es máxima.\n• Galileo: la esfera alcanza exactamente la misma altura $h$ en cualquier rampa si no hay rozamiento."
            }
        ],
        "commonTrap": "En las fotos apareció el distractor 'la energía potencial es constante'. Es FALSO: la energía potencial varía con la altura $h$; lo que permanece constante es la energía mecánica total $E_m$.",
        "stepByStep": [
            {"step": "1", "text": "Identifica los puntos de cota máxima y mínima en la trayectoria."},
            {"step": "2", "text": "Iguala la energía mecánica en ambos estados: $E_1 = E_2$."},
            {"step": "3", "text": "Despeja la velocidad: $v = \\sqrt{2gh}$."}
        ],
        "example": {
            "prompt": "Un bloque de $2\\text{ kg}$ baja sin rozamiento desde $5\\text{ m}$ de altura. Use $g = 10\\text{ m/s}^2$. ¿Cuál es su rapidez al llegar abajo?",
            "steps": [
                "1. Arriba: $K = 0$ y $U_g = m g h = (2\\text{ kg})(10\\text{ m/s}^2)(5\\text{ m}) = 100\\text{ J}$.",
                "2. Abajo: $U_g = 0$, por tanto $K = 100\\text{ J}$.",
                "3. $\\frac{1}{2}(2\\text{ kg}) v^2 = 100 \\implies v^2 = 100 \\implies v = \\sqrt{100} = 10\\text{ m/s}$."
            ],
            "result": "La rapidez al final es $v = 10\\text{ m/s}$"
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
        "lead": "En un tiro parabólico, la velocidad vertical en el punto más alto es nula ($v_y = 0$), pero la velocidad horizontal permanece constante e idéntica a la inicial ($v_x = v_{0x} = v_0 \\cos\\theta$).",
        "quickRule": "En el ápice de un tiro parabólico: $v_y = 0$, pero $v_{\\text{total}} = v_{0x} \\neq 0$ y la aceleración es la gravedad dirigida hacia abajo ($a = g = 9.8\\text{ m/s}^2$).",
        "formula": "v_x = v_0 \\cos\\theta = \\text{constante} \\qquad v_y = v_0 \\sin\\theta - g t \\qquad a = g \\; (\\text{hacia abajo})",
        "variables": ["$v_x$: horizontal constante", "$v_y$: vertical variable", "$v_{0x} = v_0 \\cos\\theta$", "$g = 9.8\\text{ m/s}^2$"],
        "sections": [
            {
                "heading": "Paquete soltado desde un avión",
                "body": "Un paquete liberado desde un avión en vuelo horizontal a $180\\text{ m/s}$ conserva $v_x = 180\\text{ m/s}$ y describe una trayectoria parabólica hacia adelante para un observador en tierra."
            },
            {
                "heading": "Sandía lanzada verticalmente hacia arriba",
                "body": "En el punto más alto, $v = 0\\text{ m/s}$, pero $a = g = 9.8\\text{ m/s}^2$ hacia abajo en todo instante. Al regresar al punto de partida, la rapidez es igual a la inicial ($|v| = v_0$)."
            }
        ],
        "commonTrap": "No caigas en la trampa de marcar 'en el punto más alto la velocidad es cero'. Solo es cero la componente vertical $v_y$; la componente horizontal $v_x$ sigue activa.",
        "stepByStep": [
            {"step": "1", "text": "Descompón la velocidad inicial en $v_{0x} = v_0 \\cos\\theta$ y $v_{0y} = v_0 \\sin\\theta$."},
            {"step": "2", "text": "En el punto más alto, la velocidad vertical se anula: $v_y = 0$."},
            {"step": "3", "text": "La velocidad resultante en la cúspide es exactamente $v = v_{0x}$."}
        ],
        "example": {
            "prompt": "Se lanza un proyectil con $v_0 = 20\\text{ m/s}$ formando un ángulo de $30^\\circ$ con la horizontal. ¿Cuál es su rapidez en el punto más alto?",
            "steps": [
                "1. $v_{0x} = v_0 \\cos(30^\\circ) = (20\\text{ m/s})\\left(\\frac{\\sqrt{3}}{2}\\right) = 10\\sqrt{3}\\approx 17.32\\text{ m/s}$.",
                "2. En la cúspide, $v_y = 0\\text{ m/s}$.",
                "3. Rapidez total: $v = v_{0x} = 10\\sqrt{3}\\text{ m/s}$ horizontal."
            ],
            "result": "Rapidez en el ápice: $v = 17.32\\text{ m/s}$ horizontal"
        }
    },
    {
        "id": "p2_fis_03",
        "part": "parte2",
        "subject": "fisica",
        "unit": "Parte II · Examen reportado 19 ago",
        "priority": "Esencial",
        "eyebrow": "P2 · 03 · 2da y 3ra Ley",
        "title": "Aceleración vertical y pares de fuerza en cuerdas",
        "lead": "Reportado en la prueba: Objeto de $1.0\\text{ kg}$ lanzado hacia abajo con $v_0 = 2.0\\text{ m/s}$ que alcanza $v_f = 14.0\\text{ m/s}$ en $t = 4.0\\text{ s}$, y preguntas conceptuales de pares de fuerzas.",
        "quickRule": "Aceleración: $a = \\frac{v_f - v_0}{t} = \\frac{14 - 2}{4} = 3.0\\text{ m/s}^2$. Fuerza neta: $F_{\\text{neta}} = m a = (1.0\\text{ kg})(3.0\\text{ m/s}^2) = 3.0\\text{ N}$.",
        "formula": "a = \\frac{v_f - v_0}{t} \\qquad F_{\\text{neta}} = m \\cdot a \\qquad \\vec{F}_{AB} = -\\vec{F}_{BA}",
        "variables": ["$m = 1.0\\text{ kg}$", "$v_0 = 2.0\\text{ m/s}$", "$v_f = 14.0\\text{ m/s}$", "$t = 4.0\\text{ s}$", "$F_{\\text{neta}}$: fuerza neta"],
        "sections": [
            {
                "heading": "Juan y Pedro jalan una cuerda (Reporte 19 ago)",
                "body": "Pregunta reportada: Despreciando fricción, ¿quién ejerce mayor fuerza en la cuerda? Por Tercera Ley de Newton, **la tensión en la cuerda y las fuerzas de acción y reacción son idénticas en magnitud**."
            }
        ],
        "commonTrap": "No respondas $9.8\\text{ N}$ de memoria en el problema de aceleración: el enunciado proporciona datos cinemáticos específicos para calcular la fuerza neta real ($3.0\\text{ N}$).",
        "stepByStep": [
            {"step": "1", "text": "Calcula la aceleración: $a = \\frac{14 - 2}{4} = \\frac{12}{4} = 3.0\\text{ m/s}^2$."},
            {"step": "2", "text": "Aplica la Segunda Ley de Newton: $F_{\\text{neta}} = m a$."},
            {"step": "3", "text": "$F_{\\text{neta}} = (1.0\\text{ kg})(3.0\\text{ m/s}^2) = 3.0\\text{ N}$."}
        ],
        "example": {
            "prompt": "Un cuerpo de $1.0\\text{ kg}$ pasa de $2.0\\text{ m/s}$ a $14.0\\text{ m/s}$ en $4.0\\text{ s}$. Determine la fuerza resultante neta.",
            "steps": [
                "1. $a = \\frac{14.0 - 2.0}{4.0} = 3.0\\text{ m/s}^2$.",
                "2. $F_{\\text{neta}} = m a = (1.0)(3.0) = 3.0\\text{ N}$."
            ],
            "result": "Fuerza neta: $F_{\\text{neta}} = 3.0\\text{ N}$"
        }
    },
    {
        "id": "p2_fis_04",
        "part": "parte2",
        "subject": "fisica",
        "unit": "Parte II · Examen reportado 19 ago",
        "priority": "Esencial",
        "eyebrow": "P2 · 04 · Movimiento Circular",
        "title": "Aceleración centrípeta y rapidez constante",
        "lead": "En un Movimiento Circular Uniforme (MCU), aunque el módulo de la velocidad (rapidez $v$) no cambie, el vector velocidad cambia continuamente de dirección.",
        "quickRule": "En MCU: la aceleración centrípeta apunta siempre hacia el centro de giro y vale $a_c = \\frac{v^2}{r} = \\omega^2 r$. La fuerza centrípeta es $F_c = m a_c$.",
        "formula": "a_c = \\frac{v^2}{r} = \\omega^2 r \\qquad F_c = m\\frac{v^2}{r} \\qquad v = \\omega r = \\frac{2\\pi r}{T}",
        "variables": ["$a_c$: aceleración centrípeta ($\\text{m/s}^2$)", "$v$: rapidez tangencial ($\\text{m/s}$)", "$r$: radio ($\\text{m}$)", "$\\omega$: velocidad angular ($\\text{rad/s}$)"],
        "sections": [
            {
                "heading": "Concepto clave de examen",
                "body": "¿Hay aceleración si la rapidez es constante? SÍ, existe aceleración centrípeta dirigida radialmente hacia el centro debido al cambio en la orientación del vector velocidad."
            }
        ],
        "commonTrap": "La fuerza centrípeta no es una fuerza mágica adicional: es el nombre que recibe la fuerza neta real (tensión, fricción, gravedad o normal) dirigida hacia el centro.",
        "stepByStep": [
            {"step": "1", "text": "Identifica el radio de giro $r$ y la rapidez $v$ o período $T$."},
            {"step": "2", "text": "Calcula la aceleración centrípeta: $a_c = \\frac{v^2}{r}$."},
            {"step": "3", "text": "Multiplica por la masa para hallar la fuerza centrípeta: $F_c = m a_c$."}
        ],
        "example": {
            "prompt": "Un móvil describe una curva de radio $10\\text{ m}$ con rapidez constante de $20\\text{ m/s}$. Calcule su aceleración centrípeta.",
            "steps": [
                "1. $a_c = \\frac{v^2}{r} = \\frac{(20\\text{ m/s})^2}{10\\text{ m}} = \\frac{400}{10} = 40\\text{ m/s}^2$."
            ],
            "result": "Aceleración centrípeta $a_c = 40\\text{ m/s}^2$ hacia el centro."
        }
    },
    {
        "id": "p2_qui_01",
        "part": "parte2",
        "subject": "quimica",
        "unit": "Parte II · Examen reportado 19 ago",
        "priority": "Esencial",
        "eyebrow": "P2 · 05 · Redox y Oxígeno",
        "title": "¿Qué hace el Oxígeno al reaccionar? (Redox)",
        "lead": "Reportado en la prueba: En reacciones de síntesis y combustión (ej. $2\\text{Mg} + \\text{O}_2 \\to 2\\text{MgO}$ o $4\\text{Fe} + 3\\text{O}_2 \\to 2\\text{Fe}_2\\text{O}_3$), el oxígeno molecular $\\text{O}_2$ pasa de estado de oxidación $0$ a $-2$.",
        "quickRule": "El Oxígeno GANA ELECTRONES (se reduce) y actúa como AGENTE OXIDANTE, provocando que el metal pierda electrones (se oxide).",
        "formula": "\\text{O}_2^0 + 4e^- \\to 2\\,\\text{O}^{2-} \\quad (\\text{Reducción}) \\qquad \\text{Mg}^0 \\to \\text{Mg}^{2+} + 2e^- \\quad (\\text{Oxidación})",
        "variables": ["Oxidación: pérdida de electrones (aumento de Nox)", "Reducción: ganancia de electrones (disminución de Nox)", "Agente oxidante: la sustancia que gana electrones (el $\\text{O}_2$)", "Agente reductor: la sustancia que cede electrones"],
        "sections": [
            {
                "heading": "Análisis de la pregunta exacta reportada",
                "body": "Pregunta reportada en el chat: Dada una ecuación estequiométrica de formación de óxidos, ¿qué hace el oxígeno al interactuar?\n• Opción A: No hace nada.\n• Opción B: Cede electrones.\n• Opción C: Gana electrones (acepta electrones).\n• Opción D: Se oxida.\n\nRespuesta correcta: **Gana electrones** (el oxígeno tiene alta electronegatividad y capta electrones de valencia para formar el anión óxido $\\text{O}^{2-}$, experimentando reducción)."
            }
        ],
        "commonTrap": "No confundas 'agente oxidante' con 'sustancia que se oxida'. El oxígeno es el agente oxidante PORQUE él mismo SE REDUCE (gana electrones).",
        "stepByStep": [
            {"step": "1", "text": "Determina el número de oxidación inicial del $\\text{O}_2$ libre: $\\text{Nox} = 0$."},
            {"step": "2", "text": "Determina el número de oxidación final del oxígeno en el óxido: $\\text{Nox} = -2$."},
            {"step": "3", "text": "De $0$ a $-2$ el Nox disminuye: gana electrones $\\implies$ se reduce."}
        ],
        "example": {
            "prompt": "En la reacción $2\\text{Mg} + \\text{O}_2 \\to 2\\text{MgO}$, ¿qué proceso experimenta el oxígeno?",
            "steps": [
                "1. $\\text{Mg}$ pasa de $0$ a $+2$ (pierde 2 electrones por átomo, se oxida).",
                "2. $\\text{O}_2$ pasa de $0$ a $-2$ (gana 2 electrones por átomo, se reduce).",
                "3. El oxígeno actúa como agente oxidante captando electrones."
            ],
            "result": "El oxígeno gana electrones y experimenta reducción."
        }
    },
    {
        "id": "p2_qui_02",
        "part": "parte2",
        "subject": "quimica",
        "unit": "Parte II · Examen reportado 19 ago",
        "priority": "Esencial",
        "eyebrow": "P2 · 06 · Estequiometría",
        "title": "Proporción estequiométrica exacta y reactivo limitante",
        "lead": "Reportado en la prueba: Se mezclan $24.0\\text{ g}$ de $\\text{Mg}$ con $16.0\\text{ g}$ de $\\text{O}_2$. Ambos reactivos se consumen en proporción $2:1$ exacta produciendo $40.0\\text{ g}$ de $\\text{MgO}$.",
        "quickRule": "$1.0\\text{ mol Mg}$ ($24\\text{ g}$) con $0.5\\text{ mol O}_2$ ($16\\text{ g}$) cumplen la relación $2:1$ exacta. Masa total por Lavoisier: $24 + 16 = 40.0\\text{ g de MgO}$.",
        "formula": "2\\,\\text{Mg} + \\text{O}_2 \\to 2\\,\\text{MgO} \\qquad 1.0\\,\\text{mol Mg} + 0.5\\,\\text{mol O}_2 = 1.0\\,\\text{mol MgO} \\; (40.0\\,\\text{g})",
        "variables": ["$n(\\text{Mg}) = \\frac{24.0}{24.0} = 1.0\\text{ mol}$", "$n(\\text{O}_2) = \\frac{16.0}{32.0} = 0.5\\text{ mol}$", "Razón requerida: $2:1$", "Razón disponible: $\\frac{1.0}{0.5} = 2:1$ (Exacta)"],
        "sections": [
            {
                "heading": "Reactivo limitante en síntesis de amoníaco (Reporte 19 ago)",
                "body": "En $\\text{N}_2 + 3\\text{H}_2 \\to 2\\text{NH}_3$, al mezclar $28\\text{ g de N}_2$ ($1.0\\text{ mol}$) con $9\\text{ g de H}_2$ ($4.5\\text{ mol}$): el $\\text{N}_2$ consume solo $3.0\\text{ mol de H}_2$ ($6\\text{ g}$), por lo que el $\\text{N}_2$ es el limitante y sobran $3.0\\text{ g de H}_2$ en exceso."
            }
        ],
        "commonTrap": "No busques un reactivo limitante cuando la relación estequiométrica coincida exactamente con la relación molar calculada.",
        "stepByStep": [
            {"step": "1", "text": "Halla moles de cada reactivo: $n = \\frac{m}{M}$."},
            {"step": "2", "text": "Divide entre sus coeficientes estequiométricos para comparar."},
            {"step": "3", "text": "Si los cocientes son idénticos, la mezcla es estequiométrica perfecta."}
        ],
        "example": {
            "prompt": "$2\\text{Mg} + \\text{O}_2 \\to 2\\text{MgO}$. Reaccionan $24\\text{ g}$ de $\\text{Mg}$ con $16\\text{ g}$ de $\\text{O}_2$. ¿Qué masa de $\\text{MgO}$ se obtiene?",
            "steps": [
                "1. $n(\\text{Mg}) = 1.0\\text{ mol}$, $n(\\text{O}_2) = 0.5\\text{ mol}$.",
                "2. La proporción $2:1$ es exacta.",
                "3. Se forma $1.0\\text{ mol}$ de $\\text{MgO} = 40.0\\text{ g}$."
            ],
            "result": "Ambos se consumen al $100\\%$ y se obtienen $40.0\\text{ g}$ de $\\text{MgO}$."
        }
    },
    {
        "id": "p2_qui_03",
        "part": "parte2",
        "subject": "quimica",
        "unit": "Parte II · Examen reportado 19 ago",
        "priority": "Esencial",
        "eyebrow": "P2 · 07 · Números Cuánticos",
        "title": "Números cuánticos y configuración de valencia",
        "lead": "Reportado en la prueba: Determinar los números cuánticos del electrón diferencial del Azufre ($Z = 16$) y el orden de llenado según el diagrama de Moeller.",
        "quickRule": "Azufre $Z = 16$: configuración $1s^2 2s^2 2p^6 3s^2 3p^4$. Para el 4to electrón en $3p$: $n = 3$, $l = 1$, $m_l = -1$, $m_s = -\\frac{1}{2}$.",
        "formula": "n \\in \\{1,2,3,4\\} \\qquad l \\in \\{0, \\dots, n-1\\} \\; (s=0, p=1, d=2, f=3) \\qquad m_l \\in \\{-l, \\dots, +l\\} \\qquad m_s = \\pm \\tfrac{1}{2}",
        "variables": ["$n$: nivel principal de energía", "$l$: forma del orbital ($s,p,d,f$)", "$m_l$: orientación espacial", "$m_s$: espín del electrón"],
        "sections": [
            {
                "heading": "Regla de Hund y Principio de Pauli",
                "body": "En el subnivel $3p^4$, se colocan primero 3 electrones desapareados con espín $+1/2$ en las casillas $m_l = -1, 0, +1$, y el 4to electrón entra apareado en $m_l = -1$ con espín antiparalelo $-1/2$."
            }
        ],
        "commonTrap": "No confundas el número cuántico secundario $l$: $s=0$, $p=1$, $d=2$, $f=3$. Para cualquier orbital $p$, $l$ siempre vale $1$.",
        "stepByStep": [
            {"step": "1", "text": "Escribe la configuración electrónica por Aufbau: $1s^2 2s^2 2p^6 3s^2 3p^4$."},
            {"step": "2", "text": "Identifica el nivel $n = 3$ y subnivel $p \\implies l = 1$."},
            {"step": "3", "text": "Dibuja las 3 casillas de $3p$ y coloca los 4 electrones por Hund: el 4to cae en $m_l = -1$ con $m_s = -1/2$."}
        ],
        "example": {
            "prompt": "¿Cuáles son los 4 números cuánticos del electrón diferencial del Azufre ($Z = 16$)?",
            "steps": [
                "1. Configuración: $[\\text{Ne}] 3s^2 3p^4$.",
                "2. Subnivel $3p \\implies n = 3, l = 1$.",
                "3. Casillas $3p$: $[-1(\\uparrow\\downarrow)][0(\\uparrow)][+1(\\uparrow)] \\implies m_l = -1, m_s = -1/2$."
            ],
            "result": "Números cuánticos: $(n=3, l=1, m_l=-1, m_s=-1/2)$"
        }
    },
    {
        "id": "p2_qui_04",
        "part": "parte2",
        "subject": "quimica",
        "unit": "Parte II · Examen reportado 19 ago",
        "priority": "Esencial",
        "eyebrow": "P2 · 08 · Tabla Periódica",
        "title": "Tendencias periódicas y radio atómico en halógenos",
        "lead": "Reportado en la prueba: Comparación del radio atómico en los elementos halógenos (Grupo 17) y variación de la electronegatividad.",
        "quickRule": "En un mismo grupo, el radio atómico aumenta hacia abajo por adición de capas electrónicas: $\\text{F} < \\text{Cl} < \\text{Br} < \\text{I}$. La electronegatividad aumenta hacia arriba: $\\text{F}$ es el máximo (4.0).",
        "formula": "\\text{Radio Atómico: } \\downarrow \\leftarrow \\qquad \\text{Electronegatividad / Energía de Ionización: } \\uparrow \\rightarrow",
        "variables": ["Grupo 17 (Halógenos): $\\text{F, Cl, Br, I}$", "Mayor radio: $\\text{Iodo (I)}$", "Mayor electronegatividad: $\\text{Flúor (F)}$", "Mayor energía de ionización: $\\text{Flúor (F)}$"],
        "sections": [
            {
                "heading": "Causa del aumento de tamaño en el grupo",
                "body": "Al descender en el grupo se añaden niveles cuánticos principales completos ($n = 2$ en $\\text{F}$, $n = 3$ en $\\text{Cl}$, $n = 4$ en $\\text{Br}$, $n = 5$ en $\\text{I}$), incrementando el apantallamiento y la distancia al núcleo."
            }
        ],
        "commonTrap": "El radio atómico y la electronegatividad varían en sentidos opuestos: el elemento más electronegativo ($\\text{F}$) es el más pequeño de su familia.",
        "stepByStep": [
            {"step": "1", "text": "Ubica el grupo y período de los elementos a comparar."},
            {"step": "2", "text": "Si están en el mismo grupo, el de período mayor tiene mayor radio."},
            {"step": "3", "text": "Si están en el mismo período, el de la izquierda tiene mayor radio."}
        ],
        "example": {
            "prompt": "Ordene de menor a mayor radio atómico los halógenos: $\\text{Br, F, I, Cl}$.",
            "steps": [
                "1. Niveles: $\\text{F}(n=2), \\text{Cl}(n=3), \\text{Br}(n=4), \\text{I}(n=5)$.",
                "2. A mayor nivel cuántico, mayor tamaño atómico."
            ],
            "result": "Orden creciente de radio: $\\text{F} < \\text{Cl} < \\text{Br} < \\text{I}$"
        }
    },
    {
        "id": "p2_qui_05",
        "part": "parte2",
        "subject": "quimica",
        "unit": "Parte II · Examen reportado 19 ago",
        "priority": "Esencial",
        "eyebrow": "P2 · 09 · Fuerzas Intermoleculares",
        "title": "Puentes de hidrógeno y geometría tetraédrica",
        "lead": "Reportado en la prueba: Reconocimiento de sustancias que forman puentes de hidrógeno y moléculas de geometría tetraédrica.",
        "quickRule": "Puente de Hidrógeno: ocurre solo cuando el $\\text{H}$ está unido directamente a $\\text{F, O}$ o $\\text{N}$ (ej. $\\text{H}_2\\text{O}, \\text{NH}_3, \\text{HF}$). Moléculas tetraédricas ($109.5^\\circ$): $\\text{CH}_4, \\text{SiCl}_4, \\text{NH}_4^+$.",
        "formula": "\\text{Fuerza Intermolecular: } \\text{London} < \\text{Dipolo-Dipolo} < \\text{Puente de H}",
        "variables": ["Puente de H: $\\text{H-F, H-O, H-N}$", "Tetraédrico: 4 pares de enlace, 0 libres ($109.5^\\circ$)", "Puntos de ebullición altos: sustancias con puentes de H"],
        "sections": [
            {
                "heading": "Por qué el agua hierve a $100^\\circ\\text{C}$",
                "body": "El $\\text{H}_2\\text{O}$ posee puentes de hidrógeno intermoleculares tridimensionales muy fuertes en comparación con el $\\text{H}_2\\text{S}$ (que solo tiene dipolo-dipolo débil), explicando su alto punto de ebullición."
            }
        ],
        "commonTrap": "En $\\text{CH}_4$ hay hidrógeno, pero NO forma puentes de hidrógeno porque el enlace $\\text{C-H}$ no tiene suficiente diferencia de electronegatividad.",
        "stepByStep": [
            {"step": "1", "text": "Verifica si la molécula contiene enlaces directos $\\text{H-F}$, $\\text{H-O}$ o $\\text{H-N}$."},
            {"step": "2", "text": "Si los tiene, la fuerza intermolecular principal es el puente de hidrógeno."}
        ],
        "example": {
            "prompt": "¿Cuál de las siguientes sustancias presenta puentes de hidrógeno: $\\text{CH}_4, \\text{HCl}, \\text{NH}_3, \\text{H}_2\\text{S}$?",
            "steps": [
                "1. $\\text{CH}_4$ y $\\text{H}_2\\text{S}$ no tienen $\\text{F, O, N}$.",
                "2. $\\text{NH}_3$ posee enlaces directos $\\text{N-H}$ con nitrógeno altamente electronegativo."
            ],
            "result": "El amoníaco ($\\text{NH}_3$) forma puentes de hidrógeno."
        }
    },
    {
        "id": "p2_qui_06",
        "part": "parte2",
        "subject": "quimica",
        "unit": "Parte II · Examen reportado 19 ago",
        "priority": "Esencial",
        "eyebrow": "P2 · 10 · Nomenclatura y Conversiones",
        "title": "Nomenclatura Stock y conversiones de unidades",
        "lead": "Reportado en la prueba: Nombres Stock oficiales ($\text{FeCl}_3$), dicromato de potasio ($\text{K}_2\text{Cr}_2\text{O}_7$) y conversiones rápidas ($1\text{ t} = 1000\text{ kg}$, $230\text{ cm}^3 \to \text{m}^3$).",
        "quickRule": "Stock usa números romanos para el Nox del metal: $\\text{FeCl}_3 = \\text{cloruro de hierro (III)}$. Factores: $1\\text{ m}^3 = 10^6\\text{ cm}^3 \\implies 230\\text{ cm}^3 = 2.30 \\times 10^{-4}\\text{ m}^3$.",
        "formula": "1\\text{ tonelada} = 1000\\text{ kg} \\qquad 1\\text{ m}^3 = 10^6\\text{ cm}^3 = 1000\\text{ L}",
        "variables": ["$\\text{FeCl}_3$: cloruro de hierro (III)", "$\\text{K}_2\\text{Cr}_2\\text{O}_7$: dicromato de potasio", "$1\\text{ t} = 1000\\text{ kg}$", "$230\\text{ cm}^3 = 2.30 \\times 10^{-4}\\text{ m}^3$"],
        "sections": [
            {
                "heading": "Cálculo de conversión de volumen",
                "body": "$230\\text{ cm}^3 \\times \\left(\\frac{1\\text{ m}}{100\\text{ cm}}\\right)^3 = 230 \\times 10^{-6}\\text{ m}^3 = 2.30 \\times 10^{-4}\\text{ m}^3$."
            }
        ],
        "commonTrap": "Al convertir unidades al cubo ($\text{cm}^3 \to \text{m}^3$), no dividas para $100$: debes elevar el factor al cubo ($100^3 = 1\\,000\\,000$).",
        "stepByStep": [
            {"step": "1", "text": "Plantea el factor unitario con la equivalencia fundamental."},
            {"step": "2", "text": "Eleva al exponente correspondiente (cúbico o cuadrado)."},
            {"step": "3", "text": "Expresa en notación científica estándar."}
        ],
        "example": {
            "prompt": "Convierta $230\\text{ cm}^3$ a metros cúbicos ($\\text{m}^3$).",
            "steps": [
                "1. $1\\text{ m} = 100\\text{ cm} \\implies 1\\text{ m}^3 = 10^6\\text{ cm}^3$.",
                "2. $230\\text{ cm}^3 \\times \\frac{1\\text{ m}^3}{10^6\\text{ cm}^3} = 230 \\times 10^{-6}\\text{ m}^3 = 2.30 \\times 10^{-4}\\text{ m}^3$."
            ],
            "result": "$230\\text{ cm}^3 = 2.30 \\times 10^{-4}\\text{ m}^3$"
        }
    },
    {
        "id": "p2_len_01",
        "part": "parte2",
        "subject": "lenguaje",
        "unit": "Parte II · Examen reportado 19 ago",
        "priority": "Esencial",
        "eyebrow": "P2 · 11 · Lectura Crítica",
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
    },
    {
        "id": "p2_len_02",
        "part": "parte2",
        "subject": "lenguaje",
        "unit": "Parte II · Examen reportado 19 ago",
        "priority": "Esencial",
        "eyebrow": "P2 · 12 · Tipos de Texto y Conectores",
        "title": "Tono del autor, cohesión y conectores lógicos",
        "lead": "Reportado en la prueba: Identificar la intención comunicativa del texto (informativo, crítico, reflexivo, argumentativo) y elegir el conector lógico adecuado.",
        "quickRule": "Crítico = señala fallas o problemas. Reflexivo = invita a pensar. Argumentativo = defiende una postura. Informativo = expone datos objetivos.",
        "formula": "\\text{Causa: } \\text{porque, ya que} \\qquad \\text{Consecuencia: } \\text{por lo tanto, por ende} \\qquad \\text{Oposición: } \\text{sin embargo, no obstante}",
        "variables": ["Informativo: objetivo e imparcial", "Crítico: cuestiona o denuncia", "Reflexivo: invita a la introspección", "Argumentativo: convence con razones"],
        "sections": [
            {
                "heading": "Conectores lógicos frecuentes",
                "body": "• Causa: 'Llegó tarde porque había tráfico.'\n• Consecuencia: 'Había tráfico; por lo tanto, llegó tarde.'\n• Oposición: 'Estudió mucho; no obstante, el examen fue complejo.'"
            }
        ],
        "commonTrap": "No confundas el conector de causa con el de consecuencia al invertir el orden de las proposiciones.",
        "stepByStep": [
            {"step": "1", "text": "Identifica qué idea va primero: el motivo (causa) o el resultado (consecuencia)."},
            {"step": "2", "text": "Elige el conector que corresponda exactamente a esa dirección lógica."}
        ],
        "example": {
            "prompt": "Complete: 'El estudiante repasó todo el temario; _______, revisó nuevamente cada fórmula para asegurar su comprensión.'",
            "steps": [
                "1. La segunda proposición añade una acción de precaución o continuidad afirmativa."
            ],
            "result": "El conector adecuado es 'asimismo' o 'por consiguiente'."
        }
    }
]

# =========================================================================
# BANCO DE QUIZZES (16 PREGUNTAS DE PRÁCTICA RÁPIDA)
# =========================================================================
quizzes = [
    {
        "id": "q_redox_o2",
        "topicId": "p2_qui_01",
        "subject": "quimica",
        "topic": "Redox",
        "prompt": "En una reacción química como $2\\text{Mg} + \\text{O}_2 \\to 2\\text{MgO}$, ¿qué función cumple y qué proceso experimenta el oxígeno molecular ($\\text{O}_2$)?",
        "options": [
            "No experimenta ningún cambio químico.",
            "Cede electrones y se oxida.",
            "Gana electrones (se reduce) y actúa como agente oxidante.",
            "Aumenta su número de oxidación de $-2$ a $0$."
        ],
        "answer": 2,
        "explanation": "El oxígeno ($\\text{O}_2$) pasa de estado de oxidación $0$ a $-2$. Al ganar electrones experimenta reducción, actuando como agente oxidante al quitarle electrones al magnesio."
    },
    {
        "id": "q_cuanticos_s",
        "topicId": "p2_qui_03",
        "subject": "quimica",
        "topic": "Números Cuánticos",
        "prompt": "Para el electrón diferencial del átomo de Azufre ($Z = 16$, $[\\text{Ne}] 3s^2 3p^4$), el conjunto de números cuánticos ($n, l, m_l, m_s$) es:",
        "options": [
            "$(3, 0, 0, +1/2)$",
            "$(3, 1, -1, -1/2)$",
            "$(3, 2, +1, +1/2)$",
            "$(2, 1, -1, -1/2)$"
        ],
        "answer": 1,
        "explanation": "El subnivel es $3p$ ($n=3, l=1$). Los primeros 3 electrones llenan $m_l = -1, 0, +1$ con $+1/2$, y el 4to entra en $m_l = -1$ con espín $-1/2$."
    },
    {
        "id": "q_halogenos_radio",
        "topicId": "p2_qui_04",
        "subject": "quimica",
        "topic": "Tabla Periódica",
        "prompt": "¿Cuál es el orden correcto de menor a mayor radio atómico en los halógenos (Grupo 17)?",
        "options": [
            "$\\text{I} < \\text{Br} < \\text{Cl} < \\text{F}$",
            "$\\text{F} < \\text{Cl} < \\text{Br} < \\text{I}$",
            "$\\text{Cl} < \\text{F} < \\text{Br} < \\text{I}$",
            "$\\text{F} < \\text{I} < \\text{Cl} < \\text{Br}$"
        ],
        "answer": 1,
        "explanation": "En un grupo de la tabla periódica, el radio atómico aumenta hacia abajo conforme aumentan los niveles de energía: $\text{F} < \text{Cl} < \text{Br} < \text{I}$."
    },
    {
        "id": "q_rampa_vs_vertical",
        "topicId": "p2_fis_01",
        "subject": "fisica",
        "topic": "Trabajo y Energía",
        "prompt": "Para elevar una caja de masa $m$ hasta una altura $h$, comparando subirla verticalmente vs empujarla por una rampa inclinada sin fricción:",
        "options": [
            "La rampa requiere mayor trabajo que la subida vertical.",
            "La rampa requiere menor trabajo que la subida vertical.",
            "Ambos métodos requieren exactamente el mismo trabajo contra la gravedad ($W = mgh$), pero la rampa requiere menor fuerza.",
            "La fuerza requerida en ambos casos es exactamente la misma."
        ],
        "answer": 2,
        "explanation": "El trabajo depende únicamente del cambio de energía potencial gravitatoria ($\Delta U_g = mgh$). La rampa permite aplicar menor fuerza ($F = mg\sin\theta$) distribuida a lo largo de una distancia mayor."
    },
    {
        "id": "q_newton_cuerda",
        "topicId": "p2_fis_03",
        "subject": "fisica",
        "topic": "3ra Ley",
        "prompt": "Juan y Pedro jalan los extremos de una misma cuerda tensa en direcciones opuestas sobre piso liso sin fricción. Según la Tercera Ley de Newton:",
        "options": [
            "La persona de mayor masa ejerce siempre mayor fuerza sobre la cuerda.",
            "La fuerza que Juan ejerce sobre la cuerda es exactamente igual en magnitud a la que la cuerda ejerce sobre Juan.",
            "La cuerda no experimenta tensión si ambas personas tienen la misma fuerza.",
            "La fuerza neta sobre la cuerda es el doble de la fuerza de Juan."
        ],
        "answer": 1,
        "explanation": "Por la 3ra Ley de Newton (acción y reacción), las fuerzas transmitidas en los extremos de la cuerda tensa son de igual magnitud y sentido opuesto."
    },
    {
        "id": "q_mcu_acel",
        "topicId": "p2_fis_04",
        "subject": "fisica",
        "topic": "MCU",
        "prompt": "Un cuerpo describe un Movimiento Circular Uniforme (MCU) con rapidez constante $v$. ¿Cuál afirmación es verdadera sobre su aceleración?",
        "options": [
            "La aceleración es nula porque la rapidez es constante.",
            "Posee aceleración tangencial constante.",
            "Posee aceleración centrípeta dirigida radialmente hacia el centro de la trayectoria ($a_c = \\frac{v^2}{r}$).",
            "La aceleración apunta en la misma dirección tangente que la velocidad."
        ],
        "answer": 2,
        "explanation": "En MCU la rapidez no varía, pero la dirección del vector velocidad cambia continuamente, originando una aceleración centrípeta $a_c = \frac{v^2}{r}$ dirigida hacia el centro."
    },
    {
        "id": "q1",
        "topicId": "p1_fis_01",
        "subject": "fisica",
        "topic": "Cinemática",
        "prompt": "En el punto más alto de un tiro vertical, despreciando el aire:",
        "options": [
            "La velocidad y la aceleración son cero.",
            "La velocidad es cero ($v = 0$) y la aceleración apunta hacia abajo ($a = g$).",
            "La aceleración es cero y la rapidez es máxima.",
            "La velocidad apunta hacia arriba."
        ],
        "answer": 1,
        "explanation": "En el ápice, la velocidad instantánea se anula ($v = 0$), pero la aceleración de la gravedad sigue actuando hacia abajo ($a = g = 9.8\text{ m/s}^2$)."
    },
    {
        "id": "q2",
        "topicId": "p1_fis_02",
        "subject": "fisica",
        "topic": "Newton",
        "prompt": "Una fuerza neta de $20\\text{ N}$ actúa sobre una masa de $5\\text{ kg}$. La aceleración es:",
        "options": [
            "$0.25\\text{ m/s}^2$",
            "$4\\text{ m/s}^2$",
            "$15\\text{ m/s}^2$",
            "$100\\text{ m/s}^2$"
        ],
        "answer": 1,
        "explanation": "Segunda ley de Newton: $a = \frac{F}{m} = \frac{20\text{ N}}{5\text{ kg}} = 4\text{ m/s}^2$."
    },
    {
        "id": "q3",
        "topicId": "p1_fis_03",
        "subject": "fisica",
        "topic": "Energía",
        "prompt": "En un péndulo ideal que oscila sin rozamiento, ¿en qué punto es máxima la energía cinética?",
        "options": [
            "En el punto más bajo del recorrido (valle).",
            "En cualquiera de los dos extremos superiores.",
            "En todos los puntos por igual.",
            "Solo durante la fase de ascenso."
        ],
        "answer": 0,
        "explanation": "En el punto más bajo, la energía potencial gravitatoria es mínima ($h = 0$) y toda la energía mecánica se ha transformado en energía cinética máxima ($K_{\text{máx}} = \frac{1}{2}m v_{\text{máx}}^2$)."
    },
    {
        "id": "q4",
        "topicId": "p2_fis_03",
        "subject": "fisica",
        "topic": "Newton",
        "prompt": "Un objeto de $1.0\\text{ kg}$ se tira hacia abajo con $v_0 = 2\\text{ m/s}$ y alcanza $v_f = 14\\text{ m/s}$ en $4\\text{ s}$. La fuerza neta resultante es:",
        "options": [
            "$9.8\\text{ N}$",
            "$3.0\\text{ N}$",
            "$14.0\\text{ N}$",
            "$0.5\\text{ N}$"
        ],
        "answer": 1,
        "explanation": "Aceleración: $a = \frac{14 - 2}{4} = 3.0\text{ m/s}^2$. Fuerza neta: $F_{\text{neta}} = m a = (1.0\text{ kg})(3.0\text{ m/s}^2) = 3.0\text{ N}$."
    },
    {
        "id": "q5",
        "topicId": "p1_qui_01",
        "subject": "quimica",
        "topic": "Nomenclatura",
        "prompt": "El nombre Stock oficial del compuesto $\\text{FeCl}_3$ es:",
        "options": [
            "Cloruro de hierro (II)",
            "Cloruro de hierro (III)",
            "Tricloruro férrico",
            "Clorato de hierro"
        ],
        "answer": 1,
        "explanation": "Cada átomo de cloro actúa con estado de oxidación $-1$; por tanto, el hierro actúa con $+3$. Su nombre Stock oficial es cloruro de hierro (III)."
    },
    {
        "id": "q6",
        "topicId": "p2_qui_02",
        "subject": "quimica",
        "topic": "Estequiometría",
        "prompt": "$2\\text{Mg} + \\text{O}_2 \\to 2\\text{MgO}$. Si reaccionan $24\\text{ g}$ de $\\text{Mg}$ ($M = 24\\text{ g/mol}$) con $16\\text{ g}$ de $\\text{O}_2$ ($M = 32\\text{ g/mol}$):",
        "options": [
            "El $\\text{Mg}$ es limitante y se obtienen $20\\text{ g}$ de $\\text{MgO}$.",
            "Ambos se consumen en proporción exacta y se obtienen $40.0\\text{ g}$ de $\\text{MgO}$.",
            "El $\\text{O}_2$ es limitante y se obtienen $80\\text{ g}$ de $\\text{MgO}$.",
            "Sobran $8\\text{ g}$ de $\\text{Mg}$ sin reaccionar."
        ],
        "answer": 1,
        "explanation": "$24\text{ g Mg} = 1.0\text{ mol}$; $16\text{ g O}_2 = 0.5\text{ mol}$. La proporción $1.0 : 0.5$ coincide exactamente con la estequiometría $2:1$. Por tanto, ambos se consumen por completo produciendo $40.0\text{ g}$ de $\\text{MgO}$."
    },
    {
        "id": "q7",
        "topicId": "p2_len_01",
        "subject": "lenguaje",
        "topic": "Lectura Crítica",
        "prompt": "En un texto argumentativo formal, la tesis se define como:",
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

output = {
    "parte1": parte1_topics,
    "parte2": parte2_topics,
    "quizzes": quizzes
}

with open('js/study-data-all.js', 'w', encoding='utf-8') as f:
    f.write("/* Banco de Estudio EPN Día 2 — Exact Manus App Replica con Contenido Reportado Integral */\n")
    f.write("window.STUDY_DATA = " + json.dumps(output, indent=2, ensure_ascii=False) + ";\n")

print(f"Generated js/study-data-all.js successfully with {len(parte1_topics)} Parte I topics, {len(parte2_topics)} Parte II topics and {len(quizzes)} quizzes!")
