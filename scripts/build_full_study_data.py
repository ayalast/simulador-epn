import json

with open('tmp_epnstudy/ref_topics.json', 'r', encoding='utf-8') as f:
    ref_topics = json.load(f)

with open('tmp_epnstudy/ref_quizzes.json', 'r', encoding='utf-8') as f:
    ref_quizzes = json.load(f)

# Add Lenguaje topics with the exact same structure
len_topics = [
    {
        "id": "lectura-critica-tesis",
        "subject": "lenguaje",
        "unit": "Lectura Crítica",
        "priority": "Esencial",
        "eyebrow": "01 · Tesis y Argumentos",
        "title": "Identifica la postura del autor sin confundirla con datos",
        "lead": "La tesis es la postura central debatible que defiende el autor a lo largo del texto. Los ejemplos, estadísticas y citas son argumentos secundarios que la respaldan.",
        "quickRule": "Pregúntate: ¿Qué opinión quiere el autor que yo acepte? Si es un hecho objetivo (ej. 'el agua hierve a 100 °C'), no es tesis; es evidencia.",
        "formula": "\\text{Tesis} = \\text{Tema General} + \\text{Juicio de Valor / Postura Central}",
        "variables": [
            "Tema: el asunto general del texto (ej. la inteligencia artificial)",
            "Tesis: la afirmación u opinión central defendida",
            "Argumentos: las razones y evidencias que sostienen la tesis"
        ],
        "sections": [
            {
                "heading": "Método de 3 pasos para la Tesis",
                "body": "1. Lee el primer párrafo: casi siempre se introduce el tema y la postura.\n2. Lee el último párrafo: la conclusión suele reiterar la tesis de forma explícita.\n3. Descarta oraciones secundarias que solo den datos históricos o cifras aisladas."
            }
        ],
        "commonTrap": "No elijas la opción más larga ni la que contenga datos numéricos textuales. La tesis es una postura general, no un dato puntual.",
        "stepByStep": [
            {"step": "1", "text": "Identifica el tema general de qué trata el texto."},
            {"step": "2", "text": "Busca la afirmación principal que expresa la opinión del autor."},
            {"step": "3", "text": "Comprueba que los demás párrafos sirvan para demostrar esa afirmación."}
        ],
        "example": {
            "prompt": "En un texto sobre teletrabajo se detallan cifras de productividad y al final se afirma: 'El trabajo remoto es el pilar de la conciliación familiar y laboral del siglo XXI'. ¿Cuál es la tesis?",
            "steps": [
                "Paso 1. El tema es el teletrabajo y la productividad.",
                "Paso 2. Las cifras son evidencia de apoyo.",
                "Paso 3. La afirmación final expresa la valoración central del autor."
            ],
            "result": "La tesis es que el trabajo remoto es indispensable para la conciliación familiar y laboral."
        }
    },
    {
        "id": "conectores-logicos",
        "subject": "lenguaje",
        "unit": "Cohesión y Lógica",
        "priority": "Esencial",
        "eyebrow": "02 · Conectores Discursivos",
        "title": "El conector es el GPS de la relación entre ideas",
        "lead": "Los conectores lógicos establecen si una idea continúa, se opone, es causa o consecuencia de la anterior.",
        "quickRule": "Causa: 'porque / ya que' (motivo antes). Consecuencia: 'por lo tanto / por consiguiente' (resultado después). Oposición: 'sin embargo / no obstante'.",
        "formula": "\\text{Causa} \\xrightarrow{\\text{porque}} \\text{Hecho} \\qquad \\text{Hecho} \\xrightarrow{\\text{por lo tanto}} \\text{Consecuencia}",
        "variables": [
            "Causales: porque, ya que, dado que, puesto que",
            "Consecutivos: por lo tanto, por ende, en consecuencia, así pues",
            "Adversativos: sin embargo, no obstante, pero, en cambio",
            "Concesivos: aunque, a pesar de que, si bien"
        ],
        "sections": [
            {
                "heading": "Causa vs Consecuencia",
                "body": "'Llovió, por lo tanto me mojé' (Consecuencia). 'Me mojé porque llovió' (Causa). Invertir el conector arruina el sentido lógico de la proposición."
            }
        ],
        "commonTrap": "Cuidado con la coma tras el conector: 'Sin embargo,' y 'Por lo tanto,' siempre llevan coma posterior.",
        "stepByStep": [
            {"step": "1", "text": "Lee la primera premisa y la segunda premisa por separado."},
            {"step": "2", "text": "Pregúntate si la segunda premisa es un motivo, un resultado o una contradicción de la primera."},
            {"step": "3", "text": "Selecciona el conector que coincida exactamente con la relación lógica identificada."}
        ],
        "example": {
            "prompt": "Complete: 'El estudiante repasó todo el banco; _______, no se confió y revisó cada fórmula a mano.'",
            "steps": [
                "Paso 1. La primera idea es que ya estudió todo.",
                "Paso 2. Lo esperado sería confiarse, pero hizo lo contrario.",
                "Paso 3. Se requiere un conector adversativo o de oposición."
            ],
            "result": "El conector correcto es 'sin embargo' o 'no obstante'."
        }
    },
    {
        "id": "lexico-polisemico-contexto",
        "subject": "lenguaje",
        "unit": "Semántica",
        "priority": "Esencial",
        "eyebrow": "03 · Vocabulario en Contexto",
        "title": "El significado depende de la oración, no del diccionario",
        "lead": "En la prueba EPN abundan palabras polisémicas formales. Nunca elijas el significado general sin probar si encaja con el sentido de la frase.",
        "quickRule": "Términos clave EPN: 'intermitente' (que se interrumpe y prosigue), 'efímero' (pasajero), 'desestimar' (rechazar), 'abstracción' (aislar conceptualmente).",
        "formula": "\\text{Significado contextual} = \\text{Palabra} + \\text{Pistas del entorno oracional}",
        "variables": [
            "Intermitente: discontinuo, que cesa y vuelve a empezar",
            "Efímero: de corta duración, fugaz",
            "Desestimar: descartar, no dar por válido",
            "Subyacente: que está oculto debajo de algo visible"
        ],
        "sections": [
            {
                "heading": "Técnica de reemplazo",
                "body": "Sustituye la opción candidata en el lugar de la palabra original. Si la oración sigue sonando natural y conserva el mismo sentido exacto, esa es la opción correcta."
            }
        ],
        "commonTrap": "No te dejes llevar por palabras que suenen rimbombantes pero que alteren el matiz del autor.",
        "stepByStep": [
            {"step": "1", "text": "Localiza el párrafo y la oración exacta donde aparece el término."},
            {"step": "2", "text": "Identifica si el tono del pasaje es positivo, negativo o neutro."},
            {"step": "3", "text": "Prueba cada opción como un sinónimo de sustitución directa."}
        ],
        "example": {
            "prompt": "En la frase 'Las precipitaciones intermitentes obligaron a pausar las obras viales', ¿qué significa 'intermitentes'?",
            "steps": [
                "Paso 1. Las obras se pausaban a ratos porque la lluvia paraba y volvía.",
                "Paso 2. No era una lluvia continua ni torrencial fija.",
                "Paso 3. Corresponde a algo discontinuo con intervalos."
            ],
            "result": "Significa 'que ocurren de forma discontinua a intervalos'."
        }
    },
    {
        "id": "inferencias-vs-falacias",
        "subject": "lenguaje",
        "unit": "Lógica Verbal",
        "priority": "Esencial",
        "eyebrow": "04 · Inferencia vs Falacia",
        "title": "Deduce solo lo que el texto permite comprobar",
        "lead": "Una inferencia válida se deriva lógicamente de las premisas del autor. Las opciones que generalizan con 'siempre', 'nunca' o 'todos' casi siempre son falacias por extrapolación.",
        "quickRule": "Si una opción afirma algo verdadero en la vida real pero que NO está en el texto, es INCORRECTA para el examen.",
        "formula": "\\text{Premisas explícitas} \\implies \\text{Inferencia válida} \\qquad (\\text{Sin inventar información})",
        "variables": [
            "Inferencia: conclusión lógica no dicha textualmente pero necesariamente verdadera",
            "Extrapolación: exageración o supuesto no sustentado",
            "Ad hominem: atacar al autor y no a sus ideas"
        ],
        "sections": [
            {
                "heading": "Cuidado con los absolutos",
                "body": "Las opciones con palabras como 'únicamente', 'todos', 'jamás' o 'imposible' suelen ser distractores diseñados para descartar."
            }
        ],
        "commonTrap": "No respondas con tu opinión personal ni con lo que viste en noticias. La única verdad del examen es lo que está escrito en el texto.",
        "stepByStep": [
            {"step": "1", "text": "Verifica qué premisas da el texto como hechos indiscutibles."},
            {"step": "2", "text": "Evalúa qué conclusión se sigue de forma obligatoria."},
            {"step": "3", "text": "Descarta opciones que agreguen juicios de valor ajenos."}
        ],
        "example": {
            "prompt": "El texto dice: 'Todos los metales alcalinos reaccionan vigorosamente con agua. El sodio es un metal alcalino'. ¿Qué se infiere?",
            "steps": [
                "Paso 1. Premisa 1: Los alcalinos reaccionan con agua.",
                "Paso 2. Premisa 2: El sodio pertenece a ese grupo.",
                "Paso 3. Conclusión: El sodio reacciona vigorosamente con agua."
            ],
            "result": "Se infiere válidamente que el sodio reacciona con agua."
        }
    }
]

# Add Parte II Reported Exam Topics (August 19 Real Exam)
parte2_topics = [
    {
        "id": "reporte-fuerza-bloque-1kg",
        "subject": "fisica",
        "unit": "Parte II · Examen reportado 19 ago",
        "priority": "Esencial",
        "eyebrow": "P2 · 01 · 2da Ley",
        "title": "Fuerza resultante en aceleración vertical",
        "lead": "Reportado en la prueba: Objeto de 1.0 kg arrojado hacia abajo con v₀ = 2.0 m/s que alcanza 14.0 m/s en 4.0 s. La aceleración no es la gravedad pura, sino el resultado de la fuerza neta aplicada.",
        "quickRule": "a = (vf - v0)/t = (14 - 2)/4 = 3.0 m/s². F_neta = m · a = 1.0 kg · 3.0 m/s² = 3.0 N.",
        "formula": "a = \\frac{v_f - v_0}{t} \\qquad F_{\\text{neta}} = m \\cdot a",
        "variables": [
            "m: masa del objeto = 1.0 kg",
            "v₀: rapidez inicial = 2.0 m/s",
            "vf: rapidez final = 14.0 m/s",
            "t: intervalo de tiempo = 4.0 s"
        ],
        "sections": [
            {
                "heading": "Análisis del problema reportado",
                "body": "No asumas a = 9.8 m/s² de forma ciega si el enunciado ya te da velocidades y tiempo explícitos. La aceleración cinemática real manda sobre la gravedad teórica."
            }
        ],
        "commonTrap": "No confundas el peso (W = mg = 9.8 N) con la fuerza resultante aceleradora (F_neta = 3.0 N).",
        "stepByStep": [
            {"step": "1", "text": "Calcula la aceleración: a = (14 - 2) / 4 = 12 / 4 = 3.0 m/s²."},
            {"step": "2", "text": "Aplica Segunda Ley de Newton: F_neta = m · a."},
            {"step": "3", "text": "F_neta = 1.0 kg · 3.0 m/s² = 3.0 N."}
        ],
        "example": {
            "prompt": "Un cuerpo de 1.0 kg pasa de 2 m/s a 14 m/s en 4 s. Determine la fuerza resultante neta.",
            "steps": [
                "Paso 1. a = (14 - 2) / 4 = 3.0 m/s².",
                "Paso 2. F = 1.0 · 3.0 = 3.0 N."
            ],
            "result": "La fuerza neta es 3.0 N."
        }
    },
    {
        "id": "reporte-tiempo-salto-125m",
        "subject": "fisica",
        "unit": "Parte II · Examen reportado 19 ago",
        "priority": "Esencial",
        "eyebrow": "P2 · 02 · Salto Vertical",
        "title": "Tiempo total en el aire en un salto vertical",
        "lead": "Reportado en la prueba: Una persona realiza un salto vertical alcanzando una altura de 1.25 m. Con g = 10 m/s² (o 9.8 m/s²), ¿cuánto tiempo permanece en el aire?",
        "quickRule": "t_subida = √(2h/g) = √(2 · 1.25 / 10) = √(0.25) = 0.5 s. Tiempo total = 2 · t_subida = 1.0 s.",
        "formula": "h = \\frac{1}{2}g t_{\\text{subida}}^2 \\implies t_{\\text{subida}} = \\sqrt{\\frac{2h}{g}} \\qquad t_{\\text{vuelo}} = 2\\cdot t_{\\text{subida}}",
        "variables": [
            "h: altura máxima alcanzada = 1.25 m",
            "g: aceleración gravitatoria ≈ 10.0 m/s² (o 9.8 m/s²)",
            "t_vuelo: tiempo total de permanencia en el aire"
        ],
        "sections": [
            {
                "heading": "Simetría de subida y bajada",
                "body": "El tiempo que tarda en llegar a la cúspide es exactamente igual al que tarda en regresar al suelo. La trampa común es dar solo el tiempo de subida (0.5 s)."
            }
        ],
        "commonTrap": "No olvides multiplicar por 2: el problema pregunta el tiempo total en el aire, no solo el ascenso.",
        "stepByStep": [
            {"step": "1", "text": "Calcula el tiempo de caída desde la altura máxima: t = √(2 · 1.25 / 10) = 0.50 s."},
            {"step": "2", "text": "Multiplica por dos para considerar ascenso y descenso: 0.50 s · 2 = 1.00 s."}
        ],
        "example": {
            "prompt": "Un atleta salta 1.25 m de altura vertical. Use g = 10 m/s². ¿Cuánto tiempo está en el aire?",
            "steps": [
                "Paso 1. t_subida = √(2,5 / 10) = √0.25 = 0.5 s.",
                "Paso 2. t_total = 0.5 + 0.5 = 1.0 s."
            ],
            "result": "Permanece 1.0 segundo en el aire."
        }
    },
    {
        "id": "reporte-estequiometria-mg-o2",
        "subject": "quimica",
        "unit": "Parte II · Examen reportado 19 ago",
        "priority": "Esencial",
        "eyebrow": "P2 · 03 · Estequiometría",
        "title": "Proporción exacta y masa en óxido de magnesio",
        "lead": "Reportado en la prueba: Se mezclan 24.0 g de Mg (24.0 g/mol) con 16.0 g de O₂ (32.0 g/mol). Ambos se consumen en proporción exacta 2:1 produciendo 40.0 g de MgO.",
        "quickRule": "1.0 mol Mg + 0.5 mol O₂ = relación estequiométrica 2:1 exacta. Por ley de Lavoisier: 24 g + 16 g = 40 g de MgO.",
        "formula": "2\\,\\text{Mg} + \\text{O}_2 \\to 2\\,\\text{MgO} \\qquad m_{\\text{total}} = 24.0\\,\\text{g} + 16.0\\,\\text{g} = 40.0\\,\\text{g}",
        "variables": [
            "n(Mg) = 24.0 / 24.0 = 1.0 mol",
            "n(O₂) = 16.0 / 32.0 = 0.5 mol",
            "Relación requerida: 2 mol Mg por 1 mol O₂ (2:1)",
            "Relación disponible: 1.0 / 0.5 = 2:1 (Exacta, sin limitante)"
        ],
        "sections": [
            {
                "heading": "Cero reactivo en exceso",
                "body": "Cuando la relación molar disponible coincide con la estequiometría de la reacción balanceada, no existe reactivo limitante ni reactivo en exceso: todo se convierte en producto."
            }
        ],
        "commonTrap": "No busques un limitante donde no lo hay: la opción correcta es que ambos se consumen por completo.",
        "stepByStep": [
            {"step": "1", "text": "Calcula moles de Mg: 24 g / 24 g/mol = 1 mol."},
            {"step": "2", "text": "Calcula moles de O₂: 16 g / 32 g/mol = 0.5 mol."},
            {"step": "3", "text": "Razón 1.0 / 0.5 = 2. Es idéntica a 2Mg:1O₂. Masa final = 24 + 16 = 40 g."}
        ],
        "example": {
            "prompt": "2Mg + O₂ → 2MgO. Reaccionan 24 g de Mg con 16 g de O₂. ¿Qué afirmación es verdadera?",
            "steps": [
                "Paso 1. n(Mg) = 1 mol, n(O₂) = 0.5 mol.",
                "Paso 2. Proporción estequiométrica exacta 2:1.",
                "Paso 3. Masa de MgO = 40 g."
            ],
            "result": "Ambos se consumen al 100% y se obtienen 40.0 g de MgO."
        }
    }
]

# Merge all topics
all_topics = ref_topics + len_topics + parte2_topics

# Add additional quizzes
extra_quizzes = [
    {
        "id": "l1",
        "subject": "lenguaje",
        "topic": "Tesis",
        "prompt": "En un ensayo argumentativo, la tesis se define principalmente como:",
        "options": [
            "Un dato estadístico inmutable verificado por un censo.",
            "La postura u opinión central que el autor defiende con argumentos.",
            "El resumen de las ideas secundarias del marco teórico.",
            "La definición enciclopédica del término principal del texto."
        ],
        "answer": 1,
        "explanation": "La tesis es la postura u opinión central debatible que el autor defiende a lo largo del escrito utilizando argumentos y evidencias."
    },
    {
        "id": "l2",
        "subject": "lenguaje",
        "topic": "Conectores",
        "prompt": "Seleccione el conector lógico que expresa oposición en: 'Estudió con dedicación; _______, el examen fue sumamente exigente.'",
        "options": [
            "por consiguiente",
            "dado que",
            "no obstante",
            "en consecuencia"
        ],
        "answer": 2,
        "explanation": "'No obstante' y 'sin embargo' son conectores adversativos u opositivos que enlazan dos proposiciones que contrastan entre sí."
    },
    {
        "id": "f_rep1",
        "subject": "fisica",
        "topic": "Newton",
        "prompt": "Un objeto de 1.0 kg se tira hacia abajo con v₀ = 2 m/s. En 4 s alcanza 14 m/s. La fuerza neta resultante aplicada es:",
        "options": [
            "9.8 N",
            "3.0 N",
            "14.0 N",
            "0.5 N"
        ],
        "answer": 1,
        "explanation": "Aceleración a = (14 - 2)/4 = 3.0 m/s². Segunda ley: F = m · a = 1.0 kg · 3.0 m/s² = 3.0 N."
    },
    {
        "id": "f_rep2",
        "subject": "fisica",
        "topic": "Cinemática",
        "prompt": "Una persona realiza un salto vertical de 1.25 m de altura. Con g = 10 m/s², el tiempo total en el aire es:",
        "options": [
            "0.50 s",
            "1.00 s",
            "1.25 s",
            "2.50 s"
        ],
        "answer": 1,
        "explanation": "t_subida = √(2 · 1.25 / 10) = 0.5 s. Tiempo total en el aire = 2 · t_subida = 1.00 s."
    },
    {
        "id": "q_rep1",
        "subject": "quimica",
        "topic": "Estequiometría",
        "prompt": "2Mg + O₂ → 2MgO. Si reaccionan 24 g de Mg (M=24) con 16 g de O₂ (M=32):",
        "options": [
            "El Mg es limitante y se obtienen 20 g de MgO.",
            "Ambos se consumen en proporción exacta y se obtienen 40.0 g de MgO.",
            "El O₂ es limitante y se obtienen 80 g de MgO.",
            "Sobran 8 g de Mg sin reaccionar."
        ],
        "answer": 1,
        "explanation": "24 g Mg = 1 mol; 16 g O₂ = 0.5 mol. Razón 1:0.5 = 2:1 exacta. Se consumen por completo dando 40.0 g de MgO."
    }
]

all_quizzes = ref_quizzes + extra_quizzes

# Write output file
js_content = f"""/* Banco Integral de Estudio EPN Día 2 — Notebook Theme */
window.STUDY_DATA = {{
  topics: {json.dumps(all_topics, indent=2, ensure_ascii=False)},
  quizzes: {json.dumps(all_quizzes, indent=2, ensure_ascii=False)}
}};
"""

with open('js/study-data-all.js', 'w', encoding='utf-8') as out:
    out.write(js_content)

print(f"Generated js/study-data-all.js successfully with {len(all_topics)} topics and {len(all_quizzes)} quizzes!")
