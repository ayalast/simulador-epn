/* Banco de Estudio EPN Día 2 — Exact Manus App Replica */
window.STUDY_DATA = {
  "parte1": [
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
      "variables": [
        "x: posición (m)",
        "v: velocidad (m/s)",
        "a: aceleración (m/s²)",
        "t: tiempo (s)"
      ],
      "sections": [
        {
          "heading": "Distancia no es desplazamiento",
          "body": "La distancia es la longitud total recorrida (siempre positiva). El desplazamiento es el vector neto entre la posición final y la inicial: Δx = x_f - x_0."
        },
        {
          "heading": "Gráficas v vs t",
          "body": "La pendiente representa la aceleración instantánea. El área bajo la curva corresponde al desplazamiento."
        }
      ],
      "commonTrap": "No confundas rapidez media (distancia/tiempo) con el módulo de la velocidad media (|desplazamiento|/tiempo).",
      "stepByStep": [
        {
          "step": "1",
          "text": "Identifica si la aceleración es nula (MRU) o constante (MRUV)."
        },
        {
          "step": "2",
          "text": "Convierte todas las magnitudes al SI (m, s, m/s)."
        },
        {
          "step": "3",
          "text": "Aplica la ecuación cinemática que relacione los datos conocidos."
        }
      ],
      "example": {
        "prompt": "Un móvil parte del reposo con a = 3 m/s² durante 4 s. ¿Qué distancia recorre y qué rapidez alcanza?",
        "steps": [
          "1. Rapidez final: v = v_0 + a·t = 0 + (3)(4) = 12 m/s.",
          "2. Distancia: d = v_0·t + ½·a·t² = 0 + ½(3)(4)² = 24 m."
        ],
        "result": "Distancia = 24 m | Rapidez final = 12 m/s"
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
      "lead": "La segunda ley de Newton conecta las fuerzas netas con el cambio de movimiento. El diagrama de cuerpo libre evita confusiones de signo.",
      "quickRule": "Fuerza neta cero significa equilibrio traslacional (reposo o MRU a velocidad constante), no ausencia de fuerzas.",
      "formula": "\\sum \\vec{F} = m \\vec{a} \\qquad P = m g \\qquad f_k = \\mu_k N",
      "variables": [
        "F: fuerza neta (N)",
        "m: masa (kg)",
        "a: aceleración (m/s²)",
        "N: normal (N)",
        "μ_k: coef. fricción"
      ],
      "sections": [
        {
          "heading": "Tercera Ley: Acción y Reacción",
          "body": "Son iguales en magnitud y opuestas en sentido, pero actúan sobre cuerpos distintos: jamás se anulan entre sí en el mismo cuerpo."
        }
      ],
      "commonTrap": "La fuerza normal no siempre es igual al peso (en planos inclinados N = mg cos θ).",
      "stepByStep": [
        {
          "step": "1",
          "text": "Aísla el cuerpo y dibuja el diagrama de cuerpo libre."
        },
        {
          "step": "2",
          "text": "Descompón fuerzas en ejes paralelo y perpendicular al movimiento."
        },
        {
          "step": "3",
          "text": "Aplica ΣF = m·a en el eje del movimiento."
        }
      ],
      "example": {
        "prompt": "Una fuerza horizontal de 20 N actúa sobre un bloque de 5 kg sobre una superficie lisa. ¿Cuál es su aceleración?",
        "steps": [
          "1. La fuerza neta es F = 20 N.",
          "2. a = F / m = 20 N / 5 kg = 4 m/s²."
        ],
        "result": "Aceleración = 4 m/s²"
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
      "lead": "Sin fuerzas no conservativas (como fricción), la energía mecánica total se conserva en todos los puntos de la trayectoria.",
      "quickRule": "E_m = K + U_g + U_e = constante. En el punto más alto K = 0; en el valle U_g = 0 y K es máxima.",
      "formula": "E_m = K + U_g + U_e = \\text{cte} \\qquad K = \\frac{1}{2}m v^2 \\qquad U_g = m g h \\qquad U_e = \\frac{1}{2}k x^2",
      "variables": [
        "K: cinética (J)",
        "Ug: potencial gravitatoria (J)",
        "Ue: potencial elástica (J)",
        "W: trabajo (J)"
      ],
      "sections": [
        {
          "heading": "Trabajo de fuerzas perpendiculares",
          "body": "Como W = F·d·cos(90°) = 0, fuerzas como la normal y la centrípeta no realizan trabajo mecánico."
        }
      ],
      "commonTrap": "Si hay rozamiento: E_final = E_inicial - |W_fricción|.",
      "stepByStep": [
        {
          "step": "1",
          "text": "Fija el nivel de referencia h = 0."
        },
        {
          "step": "2",
          "text": "Calcula la energía mecánica inicial E_1."
        },
        {
          "step": "3",
          "text": "Iguala con la energía final E_2 y despeja la rapidez o altura."
        }
      ],
      "example": {
        "prompt": "Un cuerpo de 2 kg cae libremente desde 5 m. Use g = 10 m/s². Calcule su rapidez final.",
        "steps": [
          "1. E_inicial = m·g·h = 2 · 10 · 5 = 100 J.",
          "2. E_final = ½·m·v² = ½(2)·v² = v².",
          "3. v² = 100 ⇒ v = 10 m/s."
        ],
        "result": "Rapidez final = 10 m/s"
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
      "lead": "El impulso de una fuerza externa modifica la cantidad de movimiento del cuerpo. En sistemas aislados, el momento total se conserva.",
      "quickRule": "J = F · Δt = Δp = m·(v_f - v_0). En choques aislados: Σp_inicial = Σp_final.",
      "formula": "\\vec{J} = \\vec{F}\\Delta t = \\Delta \\vec{p} \\qquad \\vec{p} = m\\vec{v} \\qquad \\sum \\vec{p}_i = \\sum \\vec{p}_f",
      "variables": [
        "p: momento lineal (kg·m/s)",
        "J: impulso (N·s)",
        "F: fuerza media (N)",
        "Δt: tiempo (s)"
      ],
      "sections": [
        {
          "heading": "Tipos de choques",
          "body": "Elástico: se conserva momento y energía cinética. Inelástico: los cuerpos se pegan tras el choque."
        }
      ],
      "commonTrap": "El momento lineal es un vector: si rebota en sentido contrario, el cambio es Δp = -m·v - m·v = -2mv.",
      "stepByStep": [
        {
          "step": "1",
          "text": "Define la dirección positiva de referencia."
        },
        {
          "step": "2",
          "text": "Calcula el impulso J = F·Δt."
        },
        {
          "step": "3",
          "text": "Iguala J a m(v_f - v_0) para hallar la velocidad."
        }
      ],
      "example": {
        "prompt": "Una fuerza de 10 N actúa durante 0.4 s sobre un balón de 0.5 kg en reposo. ¿Cuál es su rapidez?",
        "steps": [
          "1. J = 10 N · 0.4 s = 4.0 N·s.",
          "2. 4.0 = (0.5 kg)·v ⇒ v = 4.0 / 0.5 = 8 m/s."
        ],
        "result": "Rapidez = 8 m/s"
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
      "lead": "En cualquier compuesto neutro, la suma algebraica de los estados de oxidación multiplicados por sus subíndices es exactamente cero.",
      "quickRule": "En FeCl₃, cada Cl vale -1: el Fe actúa con +3. Su nombre Stock oficial es cloruro de hierro (III).",
      "formula": "\\sum (\\text{Nox} \\cdot \\text{átomos}) = 0 \\quad (\\text{compuesto neutro})",
      "variables": [
        "Nox: número de oxidación",
        "Alcalinos: +1",
        "Alcalinotérreos: +2",
        "Oxígeno: -2",
        "Hidrógeno: +1"
      ],
      "sections": [
        {
          "heading": "Iones poliatómicos clave",
          "body": "• Sulfato: SO₄²⁻\n• Nitrato: NO₃⁻\n• Carbonato: CO₃²⁻\n• Hidróxido: OH⁻"
        }
      ],
      "commonTrap": "No confundas la terminación -oso (menor Nox) con -ico (mayor Nox).",
      "stepByStep": [
        {
          "step": "1",
          "text": "Escribe los Nox fijos conocidos (O = -2, H = +1)."
        },
        {
          "step": "2",
          "text": "Plantea la ecuación: Σ Nox = 0."
        },
        {
          "step": "3",
          "text": "Despeja el Nox del átomo central y nombra según Stock."
        }
      ],
      "example": {
        "prompt": "Determine el estado de oxidación del azufre en H₂SO₄.",
        "steps": [
          "1. 2(+1) + S + 4(-2) = 0.",
          "2. +2 + S - 8 = 0 ⇒ S - 6 = 0 ⇒ S = +6."
        ],
        "result": "Nox del Azufre = +6"
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
      "lead": "El número atómico Z es el número de protones. La carga solo altera el número de electrones; los protones nucleares nunca cambian.",
      "quickRule": "Catión (+): pierde electrones (e⁻ = Z - carga). Anión (-): gana electrones (e⁻ = Z + |carga|).",
      "formula": "A = Z + n \\qquad e^- = Z - \\text{carga} \\qquad n = A - Z",
      "variables": [
        "A: masa atómica",
        "Z: número atómico (protones)",
        "n: neutrones",
        "e⁻: electrones"
      ],
      "sections": [
        {
          "heading": "Cationes de transición",
          "body": "En metales como Fe (Z=26, [Ar] 4s² 3d⁶), al formar Fe²⁺ se pierden los 2 electrones del orbital 4s, quedando [Ar] 3d⁶."
        }
      ],
      "commonTrap": "No restes electrones del orbital 3d antes de vaciar completamente el orbital 4s.",
      "stepByStep": [
        {
          "step": "1",
          "text": "Ubica Z (protones) y A (número másico)."
        },
        {
          "step": "2",
          "text": "Halla neutrones: n = A - Z."
        },
        {
          "step": "3",
          "text": "Ajusta electrones según la carga del ion."
        }
      ],
      "example": {
        "prompt": "Para el catión ²⁷₁₃Al³⁺, determine protones, neutrones y electrones.",
        "steps": [
          "1. Protones = Z = 13.",
          "2. Neutrones = 27 - 13 = 14.",
          "3. Electrones = 13 - 3 = 10."
        ],
        "result": "13 protones, 14 neutrones, 10 electrones"
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
      "lead": "Una molécula puede tener enlaces polares individuales y ser totalmente apolar si su geometría espacial es simétrica.",
      "quickRule": "CO₂ es lineal (180°) y apolar. H₂O es angular (104.5°) y fuertemente polar debido a los 2 pares libres del oxígeno.",
      "formula": "\\vec{\\mu}_{\\text{total}} = \\sum \\vec{\\mu}_{\\text{enlace}} = 0 \\implies \\text{Molécula Apolar}",
      "variables": [
        "μ: momento dipolar",
        "Lineal: 180°",
        "Trigonal plana: 120°",
        "Tetraédrica: 109.5°",
        "Angular: 104.5°"
      ],
      "sections": [
        {
          "heading": "Geometrías comunes de prueba",
          "body": "• CH₄: Tetraédrica (apolar)\n• NH₃: Piramidal trigonal (polar)\n• BF₃: Trigonal plana (apolar)\n• H₂O: Angular (polar)"
        }
      ],
      "commonTrap": "No confundas polaridad de enlace con polaridad de la molécula global.",
      "stepByStep": [
        {
          "step": "1",
          "text": "Dibuja la estructura de Lewis con pares enlazantes y libres."
        },
        {
          "step": "2",
          "text": "Cuenta dominios sobre el átomo central para definir la geometría."
        },
        {
          "step": "3",
          "text": "Verifica si los vectores dipolo se cancelan vectorialmente."
        }
      ],
      "example": {
        "prompt": "¿Por qué el metano (CH₄) es apolar?",
        "steps": [
          "1. Tiene 4 enlaces C-H dirigidos a los vértices de un tetraedro regular.",
          "2. La simetría espacial anula la resultante vectorial de los 4 dipolos (μ = 0)."
        ],
        "result": "El CH₄ es apolar debido a su simetría tetraédrica perfecta."
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
      "lead": "Las relaciones estequiométricas se expresan en moles, nunca directamente en gramos. Pasa siempre por moles antes de calcular.",
      "quickRule": "n = m / M. 1 mol = 6.022 × 10²³ partículas. En CNPT, 1 mol de gas ideal ocupa 22.4 L.",
      "formula": "n = \\frac{m}{M} \\qquad N = n \\cdot N_A \\qquad \\%\\text{Rendimiento} = \\frac{\\text{Masa real}}{\\text{Masa teórica}} \\times 100",
      "variables": [
        "n: moles (mol)",
        "m: masa (g)",
        "M: masa molar (g/mol)",
        "NA: número de Avogadro = 6.022 × 10²³"
      ],
      "sections": [
        {
          "heading": "Fórmula Empírica a Molecular",
          "body": "Calcula la masa empírica. Divide la masa molar real para obtener el factor entero: k = M_molecular / M_emp. Multiplica cada subíndice por k."
        }
      ],
      "commonTrap": "No compares masas de reactivos sin convertirlas previamente a moles.",
      "stepByStep": [
        {
          "step": "1",
          "text": "Calcula los moles de reactivos: n = m / M."
        },
        {
          "step": "2",
          "text": "Divide entre sus coeficientes para hallar el limitante."
        },
        {
          "step": "3",
          "text": "Calcula el producto teórico a partir del limitante."
        }
      ],
      "example": {
        "prompt": "La fórmula empírica es CH₂ (M=14 g/mol) y la masa molar es 42 g/mol. Halle la fórmula molecular.",
        "steps": [
          "1. k = 42 / 14 = 3.",
          "2. (CH₂) × 3 = C₃H₆."
        ],
        "result": "Fórmula molecular = C₃H₆"
      }
    }
  ],
  "parte2": [
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
      "variables": [
        "K: cinética (J)",
        "Ug: potencial gravitatoria (J)",
        "Ue: potencial elástica (J)",
        "Em: energía mecánica"
      ],
      "sections": [
        {
          "heading": "El patrón que apareció en la prueba",
          "body": "• Péndulo oscilante: en el valle más bajo la energía cinética es máxima y la potencial es mínima.\n• Doble rampa de Galileo: si no hay fricción, sube exactamente hasta la misma altura inicial h, sin importar que la segunda rampa sea más larga o inclinada.\n• Arco tensado: la energía potencial elástica de la cuerda se transfiere como energía cinética de la flecha."
        }
      ],
      "commonTrap": "En las fotos apareció el distractor 'la energía potencial es constante'. Es FALSO: la energía potencial varía con la altura; lo que se mantiene constante es la energía mecánica total.",
      "stepByStep": [
        {
          "step": "1",
          "text": "Identifica los puntos de cota máxima y mínima en la trayectoria."
        },
        {
          "step": "2",
          "text": "Iguala la energía mecánica en ambos estados: E_1 = E_2."
        },
        {
          "step": "3",
          "text": "Despeja la velocidad: v = √(2gh)."
        }
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
      "variables": [
        "vx: componente horizontal constante",
        "vy: componente vertical variable",
        "g: 9.8 m/s²"
      ],
      "sections": [
        {
          "heading": "Paquete soltado desde un avión",
          "body": "Un paquete liberado desde un avión que vuela horizontalmente a 180 m/s conserva v_x = 180 m/s y para un observador en tierra describe una trayectoria parabólica hacia adelante."
        }
      ],
      "commonTrap": "No caigas en la trampa de marcar 'en el punto más alto la velocidad es cero'. Solo es cero la componente vertical; la horizontal sigue viva.",
      "stepByStep": [
        {
          "step": "1",
          "text": "Descompón la velocidad inicial en v_0x y v_0y."
        },
        {
          "step": "2",
          "text": "En el punto más alto, v_y = 0."
        },
        {
          "step": "3",
          "text": "La velocidad resultante es simplemente v = v_0x."
        }
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
      "variables": [
        "m: 1.0 kg",
        "v0: 2.0 m/s",
        "vf: 14.0 m/s",
        "t: 4.0 s",
        "F: fuerza resultante"
      ],
      "sections": [
        {
          "heading": "Diferencia entre Peso y Fuerza Resultante",
          "body": "El peso es W = mg = 9.8 N. La fuerza neta resultante es la suma de todas las fuerzas aplicadas, que por la 2da ley de Newton vale m·a = 3.0 N."
        }
      ],
      "commonTrap": "No respondas 9.8 N de memoria: el problema da datos cinemáticos explícitos para calcular la fuerza neta real.",
      "stepByStep": [
        {
          "step": "1",
          "text": "Calcula la aceleración: a = (14 - 2) / 4 = 3.0 m/s²."
        },
        {
          "step": "2",
          "text": "Multiplica por la masa: F_neta = 1.0 kg · 3.0 m/s² = 3.0 N."
        }
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
      "variables": [
        "n(Mg) = 24.0 / 24.0 = 1.0 mol",
        "n(O₂) = 16.0 / 32.0 = 0.5 mol",
        "Razón requerida: 2:1",
        "Razón disponible: 1.0 / 0.5 = 2:1 (Exacta)"
      ],
      "sections": [
        {
          "heading": "Cero reactivo en exceso",
          "body": "Como la proporción molar disponible es exactamente igual al coeficiente estequiométrico 2:1, ambos reactivos se agotan a la vez. No hay limitante ni exceso."
        }
      ],
      "commonTrap": "No marques que el Mg es limitante: la opción correcta es que ambos se consumen por completo en proporción exacta.",
      "stepByStep": [
        {
          "step": "1",
          "text": "Halla moles de Mg: 24 g / 24 g/mol = 1.0 mol."
        },
        {
          "step": "2",
          "text": "Halla moles de O₂: 16 g / 32 g/mol = 0.5 mol."
        },
        {
          "step": "3",
          "text": "Compara la relación molar: 1.0 / 0.5 = 2.0 (Exacta 2:1). Masa final = 40.0 g."
        }
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
      "variables": [
        "n(N₂) = 28 / 28 = 1.0 mol",
        "n(H₂) = 9.0 / 2.0 = 4.5 mol",
        "H₂ requerido: 3.0 mol (6.0 g)",
        "H₂ sobrante: 1.5 mol (3.0 g)"
      ],
      "sections": [
        {
          "heading": "Cálculo directo del sobrante",
          "body": "1 mol de N₂ necesita 3 moles de H₂. Disponemos de 4.5 moles de H₂. Por tanto, sobran 4.5 - 3.0 = 1.5 moles de H₂ = 1.5 × 2.0 g/mol = 3.0 g."
        }
      ],
      "commonTrap": "No confundas los moles sobrantes (1.5 mol) con los gramos sobrantes (3.0 g). Multiplica siempre por la masa molar del H₂ (2.0 g/mol).",
      "stepByStep": [
        {
          "step": "1",
          "text": "n(N₂) = 28 / 28 = 1.0 mol. n(H₂) = 9 / 2 = 4.5 mol."
        },
        {
          "step": "2",
          "text": "1 mol de N₂ consume 3.0 mol de H₂. N₂ es el reactivo limitante."
        },
        {
          "step": "3",
          "text": "Exceso: 4.5 - 3.0 = 1.5 mol de H₂ = 3.0 g."
        }
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
      "variables": [
        "Tema: el asunto general",
        "Tesis: la opinión central defendida",
        "Argumentos: evidencias de respaldo"
      ],
      "sections": [
        {
          "heading": "Pasos para ubicar la Tesis",
          "body": "1. Revisa la introducción: suele presentarse la postura.\n2. Revisa la conclusión: suele reafirmarse la tesis.\n3. Descarta oraciones que solo den datos aislados o ejemplos secundarios."
        }
      ],
      "commonTrap": "No elijas la opción con más números o tecnicismos: la tesis es una postura conceptual integradora.",
      "stepByStep": [
        {
          "step": "1",
          "text": "Lee el primer y último párrafo para identificar la postura."
        },
        {
          "step": "2",
          "text": "Comprueba que los demás párrafos sirvan de argumento a esa idea."
        },
        {
          "step": "3",
          "text": "Descarta opciones con hechos que no expresen opinión."
        }
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
  ],
  "quizzes": [
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
};
