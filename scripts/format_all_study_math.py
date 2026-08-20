import json

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
        "commonTrap": "No confundas rapidez media ($\\frac{\\text{distancia}}{t}$) con el módulo de la velocidad media ($\\frac{|\\Delta x|}{t}$). En una pista circular cerrada de $400\\text{ m}$, el desplazamiento es $\\Delta x = 0$.",
        "stepByStep": [
            {"step": "1", "text": "Identifica si la aceleración es nula ($a = 0$) o constante ($a = \\text{cte}$)."},
            {"step": "2", "text": "Convierte todas las magnitudes al SI ($\\text{m}$, $\\text{s}$, $\\text{m/s}$)."},
            {"step": "3", "text": "Aplica la ecuación cinemática sin variables desconocidas superfluas."}
        ],
        "example": {
            "prompt": "Un móvil parte del reposo con aceleración constante de $3\\text{ m/s}^2$ durante $4\\text{ s}$. ¿Qué distancia recorre y qué rapidez final alcanza?",
            "steps": [
                "1. Rapidez final: $v_f = v_0 + a t = 0 + (3\\text{ m/s}^2)(4\\text{ s}) = 12\\text{ m/s}$.",
                "2. Distancia: $d = v_0 t + \\frac{1}{2}a t^2 = 0 + \\frac{1}{2}(3\\text{ m/s}^2)(4\\text{ s})^2 = \\frac{1}{2}(3)(16) = 24\\text{ m}$."
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
        "quickRule": "Fuerza neta nula ($\\sum \\vec{F} = 0$) significa equilibrio (reposo o MRU a velocidad constante), no ausencia de fuerzas.",
        "formula": "\\sum \\vec{F} = m \\vec{a} \\qquad P = m g \\qquad f_k = \\mu_k N",
        "variables": ["$F$: fuerza neta ($\\text{N}$)", "$m$: masa ($\\text{kg}$)", "$a$: aceleración ($\\text{m/s}^2$)", "$N$: normal ($\\text{N}$)", "$\\mu_k$: coef. fricción"],
        "sections": [
            {
                "heading": "Tercera Ley: Acción y Reacción",
                "body": "Son iguales en magnitud ($|\\vec{F}_{AB}| = |\\vec{F}_{BA}|$) y opuestas en sentido, pero actúan sobre cuerpos distintos: jamás se anulan entre sí."
            },
            {
                "heading": "La fuerza normal no siempre es igual al peso",
                "body": "En un plano horizontal $N = mg$. En un plano inclinado de ángulo $\\theta$, $N = mg \\cos\\theta$. Con una fuerza tensora vertical hacia arriba $T$, $N = mg - T$."
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
            },
            {
                "heading": "Rampas y péndulos",
                "body": "En ausencia de fricción, la rapidez al llegar a la base depende únicamente del desnivel vertical $h$: $v = \\sqrt{2gh}$, sin importar la forma o longitud de la rampa."
            }
        ],
        "commonTrap": "Si existe fricción, la energía no se conserva: $E_{\\text{final}} = E_{\\text{inicial}} - |W_{\\text{fricción}}|$, donde $|W_f| = f_k d = \\mu_k N d$.",
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
                "body": "En todo choque se conserva el momento lineal total. En choques elásticos se conserva además la energía cinética ($K_i = K_f$). En choques perfectamente inelásticos los cuerpos quedan unidos ($v_f = \\frac{m_1 v_1 + m_2 v_2}{m_1 + m_2}$)."
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
                "body": "• Sulfato: $\\text{SO}_4^{2-}$\n• Nitrato: $\\text{NO}_3^-$\n• Carbonato: $\\text{CO}_3^{2-}$\n• Hidróxido: $\\text{OH}^-$\n• Amonio: $\\text{NH}_4^+$"
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

# Complete Parte II (Examen Reportado 19 de Agosto)
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
                "heading": "El patrón que apareció en la prueba",
                "body": "• Péndulo oscilante: en el valle más bajo la energía cinética es máxima y la potencial gravitatoria es mínima.\n• Doble rampa de Galileo: en ausencia de fricción, el cuerpo alcanza exactamente la misma altura inicial $h$, sin importar la inclinación de la segunda rampa.\n• Arco tensado: la energía potencial elástica $U_e = \\frac{1}{2}kx^2$ se transfiere como energía cinética de la flecha ($K = \\frac{1}{2}mv^2$)."
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
        "eyebrow": "P2 · 03 · 2da Ley",
        "title": "Aceleración vertical con fuerza aplicada ($1\\text{ kg} \\to 3\\text{ N}$)",
        "lead": "Reportado en la prueba: Objeto de $1.0\\text{ kg}$ lanzado verticalmente con $v_0 = 2.0\\text{ m/s}$ que alcanza $v_f = 14.0\\text{ m/s}$ en $t = 4.0\\text{ s}$. La fuerza resultante se deduce de la cinemática.",
        "quickRule": "Aceleración: $a = \\frac{v_f - v_0}{t} = \\frac{14 - 2}{4} = 3.0\\text{ m/s}^2$. Fuerza neta: $F_{\\text{neta}} = m a = (1.0\\text{ kg})(3.0\\text{ m/s}^2) = 3.0\\text{ N}$.",
        "formula": "a = \\frac{v_f - v_0}{t} \\qquad F_{\\text{neta}} = m \\cdot a",
        "variables": ["$m = 1.0\\text{ kg}$", "$v_0 = 2.0\\text{ m/s}$", "$v_f = 14.0\\text{ m/s}$", "$t = 4.0\\text{ s}$", "$F_{\\text{neta}}$: fuerza neta"],
        "sections": [
            {
                "heading": "Peso vs Fuerza Neta",
                "body": "El peso del objeto es $P = mg = (1.0)(9.8) = 9.8\\text{ N}$. La fuerza neta resultante es la suma de todas las fuerzas actuantes, que por la 2da ley de Newton vale $F_{\\text{neta}} = ma = 3.0\\text{ N}$."
            }
        ],
        "commonTrap": "No respondas $9.8\\text{ N}$ de memoria: el enunciado proporciona datos cinemáticos específicos para calcular la fuerza neta real.",
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
        "id": "p2_qui_01",
        "part": "parte2",
        "subject": "quimica",
        "unit": "Parte II · Examen reportado 19 ago",
        "priority": "Esencial",
        "eyebrow": "P2 · 01 · Estequiometría",
        "title": "Proporción estequiométrica exacta en óxido de magnesio",
        "lead": "Reportado en la prueba: Se mezclan $24.0\\text{ g}$ de $\\text{Mg}$ ($24.0\\text{ g/mol}$) con $16.0\\text{ g}$ de $\\text{O}_2$ ($32.0\\text{ g/mol}$). Ambos reactivos se consumen al $100\\%$ produciendo $40.0\\text{ g}$ de $\\text{MgO}$.",
        "quickRule": "$1.0\\text{ mol Mg}$ ($24\\text{ g}$) con $0.5\\text{ mol O}_2$ ($16\\text{ g}$) cumplen la relación $2:1$ exacta. Por ley de conservación de la masa: $24 + 16 = 40.0\\text{ g de MgO}$ sin limitante ni exceso.",
        "formula": "2\\,\\text{Mg} + \\text{O}_2 \\to 2\\,\\text{MgO} \\qquad 1.0\\,\\text{mol Mg} + 0.5\\,\\text{mol O}_2 = 1.0\\,\\text{mol MgO} \\; (40.0\\,\\text{g})",
        "variables": ["$n(\\text{Mg}) = \\frac{24.0}{24.0} = 1.0\\text{ mol}$", "$n(\\text{O}_2) = \\frac{16.0}{32.0} = 0.5\\text{ mol}$", "Razón requerida: $2:1$", "Razón disponible: $\\frac{1.0}{0.5} = 2:1$ (Exacta)"],
        "sections": [
            {
                "heading": "Cero reactivo en exceso",
                "body": "Como la proporción molar disponible coincide exactamente con los coeficientes estequiométricos de la reacción balanceada ($2\\text{Mg} : 1\\text{O}_2$), no hay reactivo limitante ni sobrante."
            }
        ],
        "commonTrap": "No marques que el magnesio o el oxígeno es reactivo limitante: la respuesta correcta es que ambos se consumen por completo en proporción exacta.",
        "stepByStep": [
            {"step": "1", "text": "Halla moles de $\\text{Mg}$: $n = \\frac{24.0\\text{ g}}{24.0\\text{ g/mol}} = 1.0\\text{ mol}$."},
            {"step": "2", "text": "Halla moles de $\\text{O}_2$: $n = \\frac{16.0\\text{ g}}{32.0\\text{ g/mol}} = 0.5\\text{ mol}$."},
            {"step": "3", "text": "Compara la relación: $\\frac{1.0}{0.5} = 2.0$ (proporción $2:1$ exacta). Masa producida: $40.0\\text{ g}$."}
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
        "id": "p2_qui_02",
        "part": "parte2",
        "subject": "quimica",
        "unit": "Parte II · Examen reportado 19 ago",
        "priority": "Esencial",
        "eyebrow": "P2 · 02 · Reactivo Limitante",
        "title": "Reactivo limitante y exceso en síntesis de amoníaco",
        "lead": "Reportado en la prueba: Se combinan $28.0\\text{ g}$ de $\\text{N}_2$ ($28.0\\text{ g/mol}$) con $9.0\\text{ g}$ de $\\text{H}_2$ ($2.0\\text{ g/mol}$). El $\\text{N}_2$ es el limitante y sobran $3.0\\text{ g}$ de $\\text{H}_2$ en exceso.",
        "quickRule": "$1\\text{ mol N}_2$ ($28\\text{ g}$) consume $3\\text{ moles de H}_2$ ($6\\text{ g}$). Disponemos de $4.5\\text{ moles de H}_2$ ($9\\text{ g}$), por lo que el $\\text{N}_2$ se agota primero y sobran $9.0 - 6.0 = 3.0\\text{ g de H}_2$.",
        "formula": "\\text{N}_2 + 3\\,\\text{H}_2 \\to 2\\,\\text{NH}_3 \\qquad m_{\\text{exceso}} = 9.0\\,\\text{g} - 6.0\\,\\text{g} = 3.0\\,\\text{g de H}_2",
        "variables": ["$n(\\text{N}_2) = \\frac{28}{28} = 1.0\\text{ mol}$", "$n(\\text{H}_2) = \\frac{9.0}{2.0} = 4.5\\text{ mol}$", "$\\text{H}_2$ requerido: $3.0\\text{ mol}$ ($6.0\\text{ g}$)", "$\\text{H}_2$ sobrante: $1.5\\text{ mol}$ ($3.0\\text{ g}$)"],
        "sections": [
            {
                "heading": "Cálculo directo del sobrante",
                "body": "$1\\text{ mol de N}_2$ necesita $3\\text{ moles de H}_2$. Como disponemos de $4.5\\text{ moles de H}_2$, sobran $4.5 - 3.0 = 1.5\\text{ moles de H}_2 = 1.5 \\times 2.0\\text{ g/mol} = 3.0\\text{ g}$."
            }
        ],
        "commonTrap": "No confundas los moles sobrantes ($1.5\\text{ mol}$) con los gramos sobrantes ($3.0\\text{ g}$). Multiplica siempre por la masa molar del $\\text{H}_2$ ($M = 2.0\\text{ g/mol}$).",
        "stepByStep": [
            {"step": "1", "text": "$n(\\text{N}_2) = \\frac{28}{28} = 1.0\\text{ mol}$. $n(\\text{H}_2) = \\frac{9}{2} = 4.5\\text{ mol}$."},
            {"step": "2", "text": "$1\\text{ mol de N}_2$ consume $3.0\\text{ mol de H}_2$. El $\\text{N}_2$ es el reactivo limitante."},
            {"step": "3", "text": "Exceso: $4.5 - 3.0 = 1.5\\text{ mol de H}_2 = 3.0\\text{ g}$."}
        ],
        "example": {
            "prompt": "En $\\text{N}_2 + 3\\text{H}_2 \\to 2\\text{NH}_3$, reaccionan $28\\text{ g}$ de $\\text{N}_2$ con $9\\text{ g}$ de $\\text{H}_2$. ¿Cuál es el limitante y cuánto sobra?",
            "steps": [
                "1. $n(\\text{N}_2) = 1.0\\text{ mol}$ (limitante).",
                "2. $\\text{H}_2$ consumido: $3.0\\text{ mol} = 6.0\\text{ g}$.",
                "3. $\\text{H}_2$ sobrante: $9.0\\text{ g} - 6.0\\text{ g} = 3.0\\text{ g}$."
            ],
            "result": "El $\\text{N}_2$ es el reactivo limitante y sobran $3.0\\text{ g}$ de $\\text{H}_2$."
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

quizzes = [
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
        "explanation": "En el ápice de la trayectoria, la velocidad instantánea se anula ($v = 0$), pero la aceleración de la gravedad sigue actuando hacia abajo ($a = g = 9.8\\text{ m/s}^2$)."
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
        "explanation": "Segunda ley de Newton: $a = \\frac{F}{m} = \\frac{20\\text{ N}}{5\\text{ kg}} = 4\\text{ m/s}^2$."
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
        "explanation": "En el punto más bajo, la energía potencial gravitatoria es mínima ($h = 0$) y toda la energía mecánica se ha transformado en energía cinética máxima ($K_{\\text{máx}} = \\frac{1}{2}m v_{\\text{máx}}^2$)."
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
        "explanation": "Aceleración: $a = \\frac{14 - 2}{4} = 3.0\\text{ m/s}^2$. Fuerza neta: $F_{\\text{neta}} = m a = (1.0\\text{ kg})(3.0\\text{ m/s}^2) = 3.0\\text{ N}$."
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
        "topicId": "p2_qui_01",
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
        "explanation": "$24\\text{ g Mg} = 1.0\\text{ mol}$; $16\\text{ g O}_2 = 0.5\\text{ mol}$. La proporción $1.0 : 0.5$ coincide exactamente con la estequiometría $2:1$. Por tanto, ambos se consumen por completo produciendo $40.0\\text{ g}$ de $\\text{MgO}$."
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
    f.write("/* Banco de Estudio EPN Día 2 — Exact Manus App Replica con LaTeX Integral */\n")
    f.write("window.STUDY_DATA = " + json.dumps(output, indent=2, ensure_ascii=False) + ";\n")

print("Generated js/study-data-all.js with full LaTeX subscripts and clean roots!")
