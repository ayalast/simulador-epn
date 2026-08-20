import json
import subprocess

# 1. Load Intento 1 (items 0..19 of len, fis, qui) from commit 507be6e
old_content = subprocess.check_output(['git', 'show', '507be6e:guia-bank-fql-19ago.js'], text=True, encoding='utf-8')
old_json_text = old_content.replace('window.GUIA_BANK_FQL_19AGO = ', '').rstrip(';\n ')
old_bank = json.loads(old_json_text)

intento1_len = old_bank['len'][:20]
intento1_fis = old_bank['fis'][:20]
intento1_qui = old_bank['qui'][:20]

print(f"Loaded Intento 1: {len(intento1_len)} LEN, {len(intento1_fis)} FIS, {len(intento1_qui)} QUI")

# 2. Build Curated Intento 2 for Lenguaje (Items 21 to 40 -> len-19ago-21 to len-19ago-40)
# We have 4 high quality texts with 5 questions each:
# Text 1: Modelización científica y meteorología
# Text 2: Transición energética y minerales críticos
# Text 3: Inteligencia artificial y pensamiento crítico
# Text 4: Bosques tropicales, efecto de borde y corredores biológicos

reading_1 = "La meteorología moderna ha transformado la comprensión de la dinámica atmosférica al sustituir las explicaciones intuitivas por modelos fisicoquímicos sustentados en el cálculo computacional. Antiguamente, las variaciones climáticas abruptas se interpretaban como sucesos caóticos e impredecibles. Sin embargo, la recopilación continua de datos satelitales, radares Doppler y boyas oceánicas ha permitido identificar regularidades termodinámicas en la troposfera. Esta predictibilidad no garantiza una certeza absoluta frente a sistemas no lineales complejos, pero sí proporciona aproximaciones matemáticas robustas para anticipar fenómenos extremos y mitigar desastres socioeconómicos. En consecuencia, la modelización científica actual no pretende anular la incertidumbre intrínseca de la naturaleza, sino cuantificarla rigurosamente para fundamentar la toma de decisiones estratégicas en la agricultura, la aeronavegación y la gestión de riesgos."

reading_2 = "La transición global hacia matrices energéticas descarbonizadas no constituye únicamente una urgencia ecológica, sino una profunda reconfiguración geopolítica y tecnológica. Durante más de un siglo, la hegemonía de los combustibles fósiles concentró el poder económico en los países exportadores de hidrocarburos. En contraste, la expansión solar y eólica democratiza la generación al aprovechar recursos locales inagotables. No obstante, este nuevo paradigma no está exento de vulnerabilidades: la intermitencia climática exige redes de distribución inteligentes y baterías de almacenamiento masivo con alta dependencia de minerales críticos como el litio, el cobalto y las tierras raras. Dado que estos yacimientos se concentran en pocas regiones, la sustitución del petróleo por energías limpias no elimina de forma automática las tensiones comerciales internacionales, sino que desplaza las disputas hacia la cadena de suministro tecnológico. Por lo tanto, alcanzar una sostenibilidad genuina requerirá diversificar los materiales y acelerar el reciclaje a escala industrial."

reading_3 = "El auge de la inteligencia artificial generativa ha suscitado profundos debates en torno al futuro del pensamiento crítico y la autonomía cognitiva. Por un lado, estos modelos computacionales procesan volúmenes masivos de información en segundos, redactando ensayos coherentes y resolviendo problemas técnicos complejos mediante asociaciones probabilísticas. Sin embargo, delegar acríticamente la formulación de juicios en estas herramientas conlleva el riesgo de atrofiar la capacidad humana de cuestionamiento, discernimiento y verificación de fuentes. Los algoritmos no comprenden el significado de sus respuestas ni poseen conciencia ética; únicamente replican y recombinan patrones estadísticos extraídos de bases de datos preexistentes. Por consiguiente, la inteligencia artificial debe concebirse como un instrumento de apoyo analítico y no como un sustituto del razonamiento reflexivo. Preservar la curiosidad intelectual, el rigor argumentativo y la duda metódica constituye el único camino para garantizar que el ser humano mantenga el control sobre sus propias decisiones."

reading_4 = "Los bosques tropicales albergan más del cincuenta por ciento de la biodiversidad terrestre en apenas una fracción de la superficie del planeta, desempeñando un papel irreemplazable en la regulación del clima y los ciclos hidrológicos globales. Sin embargo, estas complejas redes ecológicas enfrentan una amenaza crítica debido a la deforestación agropecuaria y la fragmentación de hábitats. Cuando un bosque continuo se divide en parches aislados, se altera el microclima interior, aumentando la temperatura y la desecación en los bordes. Este fenómeno, denominado efecto de borde, deteriora la vegetación nativa y precipita la pérdida de especies especialistas que no toleran perturbaciones ambientales. En consecuencia, la conservación efectiva de estos biomas no puede limitarse a proteger fragmentos dispersos, sino que requiere establecer corredores biológicos continuos que garanticen el flujo genético y la resiliencia ecosistémica frente al cambio climático."

intento2_len = [
    # Texto 1 (len-19ago-21 a len-19ago-25)
    {
        "id": "len-19ago-21",
        "s": "len", "n": 21, "d": "intermedio", "topics": ["4.4.2-analisisTexto"], "ch": "len-L05",
        "t": "Idea Principal",
        "prompt": "¿Cuál es la idea principal que sintetiza el fragmento anterior?",
        "opts": [
            "La meteorología contemporánea emplea modelos matemáticos y datos sistemáticos para cuantificar la incertidumbre y anticipar fenómenos climáticos con valor preventivo.",
            "Los métodos predictivos actuales han eliminado de forma absoluta toda incertidumbre en el pronóstico del tiempo atmosférico.",
            "La observación satelital demuestra que la atmósfera carece de cualquier ley física o regularidad termodinámica.",
            "La agricultura tradicional es la única actividad humana beneficiada por los radares meteorológicos modernos."
        ],
        "ans": 0,
        "exp": "**Paso 1. Núcleo temático:** El texto explica el paso de una visión caótica del clima a una ciencia cuantitativa basada en datos e instrumental moderno.\n**Paso 2. Análisis del propósito:** El autor recalca que los modelos matemáticos no eliminan la incertidumbre total, sino que la miden y permiten mitigar riesgos en múltiples sectores.\n**Paso 3. Conclusión y descarte:** La opción A abarca la síntesis completa. La opción B es falsa (el texto niega la certeza absoluta), la C contradice el hallazgo de regularidades y la D restringe arbitrariamente a un solo sector.\n**Respuesta correcta: A.**",
        "reading": reading_1, "pack": "len-19-p3"
    },
    {
        "id": "len-19ago-22",
        "s": "len", "n": 22, "d": "intermedio", "topics": ["4.4.2-analisisTexto"], "ch": "len-L05",
        "t": "Léxico en Contexto",
        "prompt": "En el contexto del pasaje, ¿qué sentido tiene la palabra «regularidades»?",
        "opts": [
            "Patrones de comportamiento físico que se repiten con orden y pueden describirse mediante leyes científicas.",
            "Normas jurídicas emitidas por organismos internacionales para controlar el clima global.",
            "Alteraciones arbitrarias y desordenadas que impiden cualquier cálculo matemático.",
            "Errores sistemáticos en la calibración de los instrumentos de medición satelital."
        ],
        "ans": 0,
        "exp": "**Paso 1. Rastreo contextual:** Se ubica en la frase: *«ha permitido identificar regularidades termodinámicas en la troposfera»*.\n**Paso 2. Oposición semántica:** El texto contrapone estas regularidades al antiguo concepto de eventos caóticos e impredecibles.\n**Paso 3. Conclusión:** Significa patrones ordenados, repetitivos y medibles bajo leyes de la física.\n**Respuesta correcta: A.**",
        "reading": reading_1, "pack": "len-19-p3"
    },
    {
        "id": "len-19ago-23",
        "s": "len", "n": 23, "d": "intermedio", "topics": ["4.3.2-conectores"], "ch": "len-L04",
        "t": "Conector de Oposición",
        "prompt": "¿Qué función discursiva cumple el conector «Sin embargo» en el texto anterior?",
        "opts": [
            "Introducir un contraste entre la antigua concepción del clima como algo caótico y el hallazgo contemporáneo de patrones regulares.",
            "Indicar la causa por la cual los satélites modernos fallan en predecir tormentas tropicales.",
            "Presentar una enumeración cronológica de inventos tecnológicos del siglo XIX.",
            "Concluir de manera definitiva la exposición general del autor."
        ],
        "ans": 0,
        "exp": "**Paso 1. Clasificación gramatical:** *Sin embargo* es una locución adversativa de oposición.\n**Paso 2. Articulación de ideas:** Enlaza la idea previa (antes se creía que el clima era caótico) con la nueva evidencia (hoy se registran datos que demuestran regularidad).\n**Paso 3. Conclusión:** Marca una objeción y contraste conceptual directo con el pasado.\n**Respuesta correcta: A.**",
        "reading": reading_1, "pack": "len-19-p3"
    },
    {
        "id": "len-19ago-24",
        "s": "len", "n": 24, "d": "intermedio", "topics": ["4.4.2-analisisTexto"], "ch": "len-L05",
        "t": "Inferencia Directa Válida",
        "prompt": "A partir de la lectura, ¿qué afirmación se infiere de manera directa y válida?",
        "opts": [
            "Aunque un modelo matemático no sea infalible al cien por ciento, resulta indispensable para reducir riesgos y planificar actividades humanas.",
            "Las mediciones meteorológicas antiguas eran más exactas porque no dependían de cálculos computacionales.",
            "Los fenómenos atmosféricos extremos ocurren exclusivamente en regiones que no cuentan con boyas oceánicas.",
            "La incertidumbre en los sistemas no lineales desaparecerá totalmente en la próxima década."
        ],
        "ans": 0,
        "exp": "**Paso 1. Premisa textual:** El texto dice que los modelos no ofrecen certeza absoluta, pero sí aproximaciones robustas para anticipar desastres y tomar decisiones.\n**Paso 2. Deducción lógica:** Por ende, la utilidad y validez práctica de un modelo científico no exige infalibilidad matemática perfecta, sino capacidad de mitigación probabilística.\n**Paso 3. Descarte:** B contradice el texto; C inventa una exclusividad inexistente; D cae en una falsa promesa futurista.\n**Respuesta correcta: A.**",
        "reading": reading_1, "pack": "len-19-p3"
    },
    {
        "id": "len-19ago-25",
        "s": "len", "n": 25, "d": "intermedio", "topics": ["4.4.2-analisisTexto"], "ch": "len-L05",
        "t": "Tono e Intención del Autor",
        "prompt": "¿Cuál es el tono predominante y la intención comunicativa del autor en el primer texto?",
        "opts": [
            "Tono expositivo, formal y objetivo; busca explicar el alcance y la utilidad práctica de la modelización científica.",
            "Tono satírico y burlesco; busca ridiculizar las limitaciones técnicas de los radares Doppler.",
            "Tono alarmista y catastrofista; pretende convencer al lector de que los desastres climáticos son inevitables.",
            "Tono poético y subjetivo; expresa vivencias personales ante tormentas atmosféricas."
        ],
        "ans": 0,
        "exp": "**Paso 1. Análisis del registro:** Utiliza vocabulario técnico formal (*troposfera*, *sistemas no lineales*, *radares Doppler*) y oraciones declarativas objetivas.\n**Paso 2. Ausencia de marcas emotivas:** No hay adjetivación hiperbólica ni juicios subjetivos.\n**Paso 3. Conclusión:** El tono es riguroso, objetivo e informativo.\n**Respuesta correcta: A.**",
        "reading": reading_1, "pack": "len-19-p3"
    },

    # Texto 2 (len-19ago-26 a len-19ago-30)
    {
        "id": "len-19ago-26",
        "s": "len", "n": 26, "d": "intermedio", "topics": ["4.4.2-analisisTexto"], "ch": "len-L05",
        "t": "Tesis Central",
        "prompt": "¿Cuál es la tesis central que sostiene el autor respecto a la transición energética?",
        "opts": [
            "La transición energética descentraliza la producción limpia, pero crea nuevas tensiones geopolíticas y retos técnicos por la dependencia de minerales estratégicos para el almacenamiento.",
            "La energía eólica y solar ha eliminado para siempre todas las disputas comerciales y conflictos entre las naciones.",
            "La extracción intensiva de petróleo sigue siendo la única alternativa viable y sostenible a largo plazo.",
            "El reciclaje industrial es un proceso inviable que agrava el cambio climático global."
        ],
        "ans": 0,
        "exp": "**Paso 1. Postura principal:** El autor expone las ventajas de las renovables frente al petróleo, pero advierte que trasladan la dependencia hacia minerales críticos (litio, cobalto).\n**Paso 2. Desmitificación:** Refuta la idea ingenua de que las energías verdes borrarán los conflictos mundiales por sí solas.\n**Paso 3. Conclusión:** La opción A resume con equilibrio la tesis y sus restricciones.\n**Respuesta correcta: A.**",
        "reading": reading_2, "pack": "len-19-p3"
    },
    {
        "id": "len-19ago-27",
        "s": "len", "n": 27, "d": "intermedio", "topics": ["4.3.2-conectores"], "ch": "len-L04",
        "t": "Conector de Causa",
        "prompt": "En la oración «Dado que estos yacimientos se concentran en pocas regiones...», el conector «Dado que» cumple la función de:",
        "opts": [
            "Introducir la causa o premisa explicativa que origina las nuevas tensiones comerciales por materias primas.",
            "Señalar una condición hipotética imposible de comprobar en el mercado internacional.",
            "Plantear una objeción que anula por completo la existencia de la energía solar.",
            "Indicar la consecuencia final y definitiva de la diversificación de baterías."
        ],
        "ans": 0,
        "exp": "**Paso 1. Identificación gramatical:** *Dado que* es una locución conjuntiva causal (equivalente a *puesto que*, *ya que*).\n**Paso 2. Nexo causal:** La concentración geográfica de yacimientos de litio/cobalto (causa) produce que la rivalidad geopolítica se traslade a las cadenas de suministro (efecto).\n**Paso 3. Conclusión:** Cumple una función causal explicativa.\n**Respuesta correcta: A.**",
        "reading": reading_2, "pack": "len-19-p3"
    },
    {
        "id": "len-19ago-28",
        "s": "len", "n": 28, "d": "intermedio", "topics": ["4.4.2-analisisTexto"], "ch": "len-L05",
        "t": "Inferencia de Seguridad Energética",
        "prompt": "¿Qué se deduce válidamente del fragmento sobre la seguridad energética futura?",
        "opts": [
            "Un país que adopte fuentes renovables seguirá expuesto a riesgos si depende exclusivamente de terceros para abastecerse de minerales y tecnologías de almacenamiento.",
            "Las redes eléctricas tradicionales que queman carbón son inmunes a los cortes de suministro y fluctuaciones económicas.",
            "Los paneles solares no requieren mantenimiento ni piezas metálicas para operar en climas cálidos.",
            "El consumo de energía en el mundo disminuirá a cero gracias a las baterías de iones de litio."
        ],
        "ans": 0,
        "exp": "**Paso 1. Premisa:** Las energías renovables son intermitentes y necesitan almacenamiento con litio y cobalto que están en pocas manos.\n**Paso 2. Inferencia:** Si un Estado no tiene acceso a esos minerales o no diversifica/recicla, cambiará una dependencia fósil por una dependencia tecnológica/mineral.\n**Paso 3. Conclusión:** La opción A es una deducción directa y rigurosa.\n**Respuesta correcta: A.**",
        "reading": reading_2, "pack": "len-19-p3"
    },
    {
        "id": "len-19ago-29",
        "s": "len", "n": 29, "d": "intermedio", "topics": ["4.4.2-analisisTexto"], "ch": "len-L05",
        "t": "Contradicción Textual",
        "prompt": "¿Cuál de las siguientes afirmaciones CONTRADICE directamente lo expuesto en el texto sobre la energía limpia?",
        "opts": [
            "La adopción de energías renovables erradicará automáticamente cualquier tipo de rivalidad económica o comercial entre los Estados.",
            "La generación solar y eólica aprovecha recursos naturales presentes en diversas regiones del planeta.",
            "La intermitencia de las fuentes limpias hace indispensable el desarrollo de baterías de almacenamiento.",
            "El reciclaje de componentes y la diversificación de materiales son claves para una sostenibilidad real."
        ],
        "ans": 0,
        "exp": "**Paso 1. Contraste con el texto:** El texto dice textualmente: *«la sustitución del petróleo por energías limpias no elimina de forma automática las tensiones comerciales internacionales»*.\n**Paso 2. Detección de la falacia:** La opción A afirma exactamente lo contrario (que sí las erradicará de forma automática).\n**Respuesta correcta: A.**",
        "reading": reading_2, "pack": "len-19-p3"
    },
    {
        "id": "len-19ago-30",
        "s": "len", "n": 30, "d": "intermedio", "topics": ["4.3.2-conectores"], "ch": "len-L04",
        "t": "Conector de Consecuencia",
        "prompt": "El conector «Por lo tanto» ubicado al inicio de la última oración cumple el rol de:",
        "opts": [
            "Encabezar la conclusión lógica y la propuesta de acción derivadas del análisis previo.",
            "Añadir un dato histórico secundario sobre los orígenes de la industria del petróleo.",
            "Expresar una duda sobre la veracidad de los yacimientos de litio.",
            "Oponerse frontalmente a la necesidad de construir redes eléctricas inteligentes."
        ],
        "ans": 0,
        "exp": "**Paso 1. Tipo de conector:** *Por lo tanto* es un conector consecutivo o conclusivo.\n**Paso 2. Relación lógica:** Conecta las premisas de vulnerabilidad y concentración mineral con el remate propositivo (diversificar materiales y acelerar el reciclaje).\n**Respuesta correcta: A.**",
        "reading": reading_2, "pack": "len-19-p3"
    },

    # Texto 3 (len-19ago-31 a len-19ago-35)
    {
        "id": "len-19ago-31",
        "s": "len", "n": 31, "d": "intermedio", "topics": ["4.4.2-analisisTexto"], "ch": "len-L05",
        "t": "Tesis Central",
        "prompt": "¿Cuál es la idea central que sintetiza el fragmento sobre la inteligencia artificial?",
        "opts": [
            "Aunque la inteligencia artificial agiliza el procesamiento de datos, el razonamiento crítico, la duda metódica y el juicio ético humano siguen siendo insustituibles para no perder autonomía cognitiva.",
            "Los sistemas de inteligencia artificial generativa poseen conciencia ética y superan la capacidad creadora del cerebro humano.",
            "El uso de computadoras en la educación superior debe prohibirse de inmediato para evitar el pensamiento reflexivo.",
            "Los algoritmos modernos analizan la realidad prescindiendo de patrones estadísticos y bases de datos."
        ],
        "ans": 0,
        "exp": "**Paso 1. Identificación del tema:** Relación entre herramientas de IA generativa y la cognición/pensamiento crítico humano.\n**Paso 2. Tesis:** La IA es una calculadora probabilística potente, pero no tiene comprensión ni ética; delegar ciegamente en ella deteriora el juicio propio.\n**Paso 3. Conclusión:** La opción A reúne la premisa técnica y la conclusión ética y cognitiva.\n**Respuesta correcta: A.**",
        "reading": reading_3, "pack": "len-19-p4"
    },
    {
        "id": "len-19ago-32",
        "s": "len", "n": 32, "d": "intermedio", "topics": ["4.4.2-analisisTexto"], "ch": "len-L05",
        "t": "Semántica Contextual",
        "prompt": "En la expresión «delegar acríticamente la formulación de juicios», la palabra «acríticamente» denota:",
        "opts": [
            "Hacerlo de forma pasiva, sin examen reflexivo ni cuestionamiento de la validez de la información.",
            "Con extrema minuciosidad y rigurosidad matemática en cada paso.",
            "A través de programas informáticos protegidos por contraseñas seguras.",
            "Con una actitud agresiva e intolerante hacia las opiniones ajenas."
        ],
        "ans": 0,
        "exp": "**Paso 1. Composición léxica:** Prefijo *a-* (sin) + *crítica* (juicio reflexivo) + sufijo adverbial *-mente*.\n**Paso 2. Sentido contextual:** Aceptar lo que produce una máquina sin dudar, sin contrastar fuentes y sin evaluar su veracidad.\n**Paso 3. Conclusión:** Actuar de forma pasiva e irreflexiva.\n**Respuesta correcta: A.**",
        "reading": reading_3, "pack": "len-19-p4"
    },
    {
        "id": "len-19ago-33",
        "s": "len", "n": 33, "d": "intermedio", "topics": ["4.4.2-analisisTexto"], "ch": "len-L05",
        "t": "Inferencia de Pensamiento Crítico",
        "prompt": "A partir de lo expuesto en el texto, ¿qué afirmación se infiere válidamente?",
        "opts": [
            "Un estudiante que corrobora activamente las fuentes y analiza los sesgos de una respuesta generada por IA ejerce un pensamiento crítico constructivo.",
            "La inteligencia artificial experimenta emociones morales cuando emite una respuesta incorrecta.",
            "Los algoritmos de lenguaje natural son incapaces de redactar párrafos gramaticalmente correctos.",
            "La memoria biológica humana se anula irreversiblemente al leer un texto digital."
        ],
        "ans": 0,
        "exp": "**Paso 1. Premisa:** El autor afirma que la IA es una herramienta de apoyo, pero exige preservación del discernimiento, rigor argumentativo y verificación de fuentes.\n**Paso 2. Inferencia:** Quien usa la IA verificando sus datos y evaluando sus límites está aplicando justamente el pensamiento crítico que el autor demanda.\n**Respuesta correcta: A.**",
        "reading": reading_3, "pack": "len-19-p4"
    },
    {
        "id": "len-19ago-34",
        "s": "len", "n": 34, "d": "intermedio", "topics": ["4.3.2-conectores"], "ch": "len-L04",
        "t": "Conector Consecutivo",
        "prompt": "¿Qué función discursiva cumple el conector «Por consiguiente» en el texto sobre inteligencia artificial?",
        "opts": [
            "Introducir la deducción normativa de que la tecnología debe ser un apoyo analítico y no un reemplazo de la reflexión humana.",
            "Plantear un ejemplo biográfico sobre los creadores de los algoritmos de redes neuronales.",
            "Negar la utilidad práctica del procesamiento masivo de datos.",
            "Expresar una concesión frente a las ventajas del trabajo manual."
        ],
        "ans": 0,
        "exp": "**Paso 1. Tipo de nexo:** *Por consiguiente* es un conector consecutivo formal.\n**Paso 2. Función lógica:** Tras exponer los límites probabilísticos de los algoritmos, deduce la postura a adoptar: la IA como asistente, nunca como sustituto del pensamiento.\n**Respuesta correcta: A.**",
        "reading": reading_3, "pack": "len-19-p4"
    },
    {
        "id": "len-19ago-35",
        "s": "len", "n": 35, "d": "intermedio", "topics": ["4.4.2-analisisTexto"], "ch": "len-L05",
        "t": "Postura y Tono del Autor",
        "prompt": "¿Qué postura y tono manifiesta el autor frente al desarrollo de la inteligencia artificial?",
        "opts": [
            "Tono reflexivo y admonitorio; busca alertar sobre la dependencia intelectual y promover un uso consciente y crítico de la tecnología.",
            "Tono tecnofóbico y radical; busca la clausura de centros de investigación computacional.",
            "Tono conformista y despreocupado; afirma que la tecnología resolverá todos los problemas éticos automáticamente.",
            "Tono humorístico y desenfadado; ironiza sobre la inutilidad del pensamiento humano."
        ],
        "ans": 0,
        "exp": "**Paso 1. Análisis discursivo:** Reconoce las capacidades técnicas de la IA (procesamiento rápido, ensayos coherentes), pero advierte sobre riesgos cognitivos (atrofia del discernimiento).\n**Paso 2. Intención pedagógica:** Su propósito es advertir y orientar hacia el cultivo de la duda metódica y la autonomía.\n**Respuesta correcta: A.**",
        "reading": reading_3, "pack": "len-19-p4"
    },

    # Texto 4 (len-19ago-36 a len-19ago-40)
    {
        "id": "len-19ago-36",
        "s": "len", "n": 36, "d": "intermedio", "topics": ["4.4.2-analisisTexto"], "ch": "len-L05",
        "t": "Idea Principal",
        "prompt": "¿Cuál es la idea principal que articula el fragmento sobre los bosques tropicales?",
        "opts": [
            "Los bosques tropicales son vitales para el equilibrio planetario, pero su fragmentación por el efecto de borde exige conservar corredores biológicos continuos para proteger la biodiversidad.",
            "La tala rasa de los bosques tropicales es un proceso beneficioso que favorece a las especies especialistas en todo el mundo.",
            "La regulación hídrica global depende exclusivamente de las zonas desérticas y polares sin vegetación.",
            "Los parches aislados de selva son inmunes al aumento de temperatura y a la pérdida de humedad."
        ],
        "ans": 0,
        "exp": "**Paso 1. Identificación del tema:** Importancia de los bosques tropicales, impacto destructivo de la fragmentación (efecto de borde) y solución mediante corredores biológicos.\n**Paso 2. Estructura expositiva:** Plantea el valor ecológico -> el problema de la fragmentación -> la propuesta de conservación conectada.\n**Paso 3. Conclusión:** La opción A sintetiza la cadena argumental completa.\n**Respuesta correcta: A.**",
        "reading": reading_4, "pack": "len-19-p4"
    },
    {
        "id": "len-19ago-37",
        "s": "len", "n": 37, "d": "intermedio", "topics": ["4.4.2-analisisTexto"], "ch": "len-L05",
        "t": "Léxico Científico",
        "prompt": "En el texto, ¿qué denota la expresión «especies especialistas»?",
        "opts": [
            "Organismos con requerimientos ecológicos específicos que dependen de condiciones ambientales estables y toleran muy poco las alteraciones de su hábitat.",
            "Animales entrenados en laboratorios científicos para tareas de reforestación masiva.",
            "Plantas exóticas invasoras capaces de colonizar cualquier clima árido sin agua.",
            "Poblaciones humanas dedicadas a la investigación botánica en universidades amazónicas."
        ],
        "ans": 0,
        "exp": "**Paso 1. Análisis textual:** *«especies especialistas que no toleran perturbaciones ambientales»*.\n**Paso 2. Concepto biológico:** Son aquellas especies adaptadas a nichos ecológicos estrechos y vulnerables a cambios de luz, humedad o temperatura.\n**Paso 3. Conclusión:** La opción A es la definición ecológica precisa.\n**Respuesta correcta: A.**",
        "reading": reading_4, "pack": "len-19-p4"
    },
    {
        "id": "len-19ago-38",
        "s": "len", "n": 38, "d": "intermedio", "topics": ["4.3.2-conectores"], "ch": "len-L04",
        "t": "Conector Consecutivo",
        "prompt": "¿Qué relación lógica establece el conector «En consecuencia» en la última oración del cuarto texto?",
        "opts": [
            "Introduce la medida de conservación (corredores biológicos) que se deriva lógicamente del diagnóstico del daño por fragmentación.",
            "Señala el origen cronológico de las primeras reservas naturales creadas en el siglo XX.",
            "Plantea una contradicción irresoluble entre la botánica y la climatología.",
            "Expresa una excepción menor sin relevancia para la supervivencia de las selvas."
        ],
        "ans": 0,
        "exp": "**Paso 1. Clasificación gramatical:** *En consecuencia* es un conector consecutivo/ilativo.\n**Paso 2. Relación de ideas:** Dado que los parches aislados sufren efecto de borde y pérdida de especies (causa), la estrategia obligatoria es unir los bosques con corredores continuos (consecuencia práctica).\n**Paso 3. Conclusión:** Marca la deducción resolutiva del texto.\n**Respuesta correcta: A.**",
        "reading": reading_4, "pack": "len-19-p4"
    },
    {
        "id": "len-19ago-39",
        "s": "len", "n": 39, "d": "intermedio", "topics": ["4.4.2-analisisTexto"], "ch": "len-L05",
        "t": "Inferencia Ecológica",
        "prompt": "¿Qué se infiere válidamente a partir de los efectos de la fragmentación de hábitats?",
        "opts": [
            "La sola delimitación de pequeñas islas de bosque desconectadas resulta insuficiente para evitar la extinción de especies altamente sensibles al microclima.",
            "La fragmentación forestal incrementa la humedad en el centro del bosque y enfría la temperatura global.",
            "Las especies generalistas desaparecen más rápido que las especialistas cuando se talan los bordes de la selva.",
            "El flujo genético entre poblaciones de animales mejora cuando los árboles se talan por completo."
        ],
        "ans": 0,
        "exp": "**Paso 1. Premisa:** Los parches aislados alteran el microclima interior (más calor, más desecación) y causan pérdida de especies. Proteger parches dispersos no alcanza.\n**Paso 2. Inferencia válida:** Las áreas protegidas pequeñas y desconectadas no garantizan la supervivencia de especies vulnerables porque el efecto de borde las degrada.\n**Respuesta correcta: A.**",
        "reading": reading_4, "pack": "len-19-p4"
    },
    {
        "id": "len-19ago-40",
        "s": "len", "n": 40, "d": "intermedio", "topics": ["4.4.2-analisisTexto"], "ch": "len-L05",
        "t": "Tipología Textual y Registro",
        "prompt": "¿Qué tipología textual y tono caracterizan con mayor precisión al cuarto fragmento?",
        "opts": [
            "Texto expositivo-argumentativo de carácter científico y ambiental, con tono objetivo, riguroso y reflexivo.",
            "Relato mitológico de ficción con tono dramático y poético.",
            "Guía turística comercial orientada a la venta de paquetes vacacionales.",
            "Noticia de crónica roja con lenguaje sensacionalista y desmesurado."
        ],
        "ans": 0,
        "exp": "**Paso 1. Estructura del discurso:** Expone datos biológicos y climáticos (*efecto de borde*, *ciclos hidrológicos*, *flujo genético*) y argumenta en favor de una solución de manejo ambiental.\n**Paso 2. Tono y registro:** Prosa formal, objetiva y reflexiva en tercera persona.\n**Paso 3. Conclusión:** Es un texto expositivo-argumentativo de divulgación científica formal.\n**Respuesta correcta: A.**",
        "reading": reading_4, "pack": "len-19-p4"
    }
]

# 3. Build Curated Intento 2 for Física (20 questions: 17 Conceptual / 3 Calculations)
# Using the exact refined propositions from the Physics subagents
intento2_fis = [
    # 21 (Teórica 1) - Pista de Patinaje
    {
        "id": "fis-19ago-21", "s": "fis", "n": 21, "d": "intermedio", "topics": ["2.2.2-trabajoEnergia"], "ch": "fis-F02",
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
        "maths": ["E_m = E_p + E_c = \\text{cte}", "v = \\sqrt{2gh}"], "imgs": []
    },
    # 22 (Teórica 2) - Trabajo de Normal y Peso
    {
        "id": "fis-19ago-22", "s": "fis", "n": 22, "d": "intermedio", "topics": ["2.2.2-trabajoEnergia"], "ch": "fis-F02",
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
        "maths": ["W = F d \\cos(90^\\circ) = 0\\text{ J}"], "imgs": []
    },
    # 23 (Teórica 3) - Salto Vertical Simetría
    {
        "id": "fis-19ago-23", "s": "fis", "n": 23, "d": "intermedio", "topics": ["2.1.1-mruv"], "ch": "fis-F01",
        "t": "Simetría Temporal y Aceleración en Salto Vertical",
        "prompt": "Un atleta realiza un salto vertical en el aire elevándose y regresando al suelo. Despreciando la resistencia del aire, ¿cuál afirmación describe correctamente los tiempos y la aceleración?",
        "opts": [
            "El tiempo de subida es exactamente igual al tiempo de bajada ($t_{\\text{subida}} = t_{\\text{bajada}}$), y la aceleración apunta hacia abajo con magnitud constante $g$ en todo instante.",
            "El tiempo de subida es menor que el de bajada porque la gravedad frena más rápido de lo que acelera.",
            "En el punto más alto la aceleración se anula instantáneamente.",
            "La aceleración es negativa al subir y positiva al descender."
        ],
        "ans": 0,
        "exp": "**Paso 1. Simetría cinemática:** En ausencia de fricción, la desaceleración durante el ascenso es simétrica a la aceleración durante el descenso ($t_{\\text{subida}} = t_{\\text{bajada}} = v_0/g$).\n**Paso 2. Invarianza de la aceleración:** La gravedad $g = 9.8\\text{ m/s}^2$ actúa de forma ininterrumpida hacia abajo en toda la trayectoria, incluso en el punto más alto.\n**Respuesta correcta: A.**",
        "maths": ["t_{\\text{subida}} = t_{\\text{bajada}}", "a = g"], "imgs": []
    },
    # 24 (Cálculo 1) - Semáforo
    {
        "id": "fis-19ago-24", "s": "fis", "n": 24, "d": "intermedio", "topics": ["2.2.1-leyesNewton"], "ch": "fis-F02",
        "t": "Equilibrio con Cuerdas Simétricas",
        "prompt": "Un semáforo de peso $W = 100\\text{ N}$ cuelga en reposo sostenido simétricamente por dos cables que forman un ángulo de $30^\\circ$ con la horizontal cada uno. La tensión en cada cable es:",
        "opts": [
            "$T = 100\\text{ N}$",
            "$T = 50\\text{ N}$",
            "$T = 200\\text{ N}$",
            "$T = 57.7\\text{ N}$"
        ],
        "ans": 0,
        "exp": "**Paso 1. Condición de equilibrio en $y$:** $\\sum F_y = 0 \\implies 2T\\sin(30^\\circ) - W = 0$.\n**Paso 2. Sustitución de valores:** Como $\\sin(30^\\circ) = 0.5$, tenemos $2T(0.5) = W \\implies T = W = 100\\text{ N}$.\n**Respuesta correcta: A.**",
        "maths": ["2T\\sin(30^\\circ) = 100 \\implies T = 100\\text{ N}"], "imgs": []
    },
    # 25 (Teórica 4) - Proporcionalidad Energía Cuadrática
    {
        "id": "fis-19ago-25", "s": "fis", "n": 25, "d": "intermedio", "topics": ["2.2.2-trabajoEnergia"], "ch": "fis-F02",
        "t": "Energía Cinética y Proporcionalidad Cuadrática",
        "prompt": "Un vehículo de masa $m$ viaja con rapidez $v_0$ teniendo una energía cinética $E_0$. Si el conductor acelera hasta triplicar su rapidez ($3v_0$), su nueva energía cinética:",
        "opts": [
            "Se incrementa a nueve veces su valor inicial debido a la dependencia cuadrática con la velocidad ($E_c \\propto v^2$).",
            "Se triplica en relación directa con la rapidez.",
            "Se multiplica por seis respecto al valor original.",
            "Permanece constante al conservarse la masa del vehículo."
        ],
        "ans": 0,
        "exp": "**Paso 1. Definición:** $E_c = \\frac{1}{2}m v^2$.\n**Paso 2. Proporcionalidad:** La energía cinética es directamente proporcional al cuadrado de la rapidez ($E_c \\propto v^2$). Si $v$ se multiplica por 3, $(3)^2 = 9$, por lo que la energía se multiplica por 9 ($9E_0$).\n**Respuesta correcta: A.**",
        "maths": ["E_c = \\frac{1}{2}m(3v_0)^2 = 9\\left(\\frac{1}{2}m v_0^2\\right) = 9E_0"], "imgs": []
    },
    # 26 (Cálculo 2) - Ley de Hooke
    {
        "id": "fis-19ago-26", "s": "fis", "n": 26, "d": "intermedio", "topics": ["2.2.1-leyesNewton"], "ch": "fis-F02",
        "t": "Ley de Hooke y Constante Elástica",
        "prompt": "De acuerdo con la Ley de Hooke, un resorte ideal se alarga $0.05\\text{ m}$ cuando se le cuelga un bloque de $20\\text{ N}$. ¿Cuál es la constante elástica del resorte y qué fuerza se requiere para estirarlo $0.15\\text{ m}$?",
        "opts": [
            "$400\\text{ N/m}$ y $60\\text{ N}$",
            "$100\\text{ N/m}$ y $15\\text{ N}$",
            "$200\\text{ N/m}$ y $30\\text{ N}$",
            "$400\\text{ N/m}$ y $20\\text{ N}$"
        ],
        "ans": 0,
        "exp": "**Paso 1. Constante elástica:** $k = \\frac{F_1}{x_1} = \\frac{20\\text{ N}}{0.05\\text{ m}} = 400\\text{ N/m}$.\n**Paso 2. Fuerza para $0.15\\text{ m}$:** $F_2 = k x_2 = (400\\text{ N/m})(0.15\\text{ m}) = 60\\text{ N}$.\n**Respuesta correcta: A.**",
        "maths": ["k = \\frac{20}{0.05} = 400\\text{ N/m}", "F = 400 \\times 0.15 = 60\\text{ N}"], "imgs": []
    },
    # 27 (Teórica 5) - Proyectil componentes
    {
        "id": "fis-19ago-27", "s": "fis", "n": 27, "d": "intermedio", "topics": ["2.1.3-parabolico"], "ch": "fis-F01",
        "t": "Independencia de Componentes en Tiro Parabólico",
        "prompt": "En el lanzamiento de un proyectil con ángulo de elevación $\\theta$ respecto a la horizontal (despreciando el rozamiento con el aire), ¿cómo evolucionan sus componentes de velocidad?",
        "opts": [
            "La componente horizontal $v_x$ permanece constante durante todo el vuelo ($v_x = v_0\\cos\\theta$), mientras que la vertical $v_y$ varía linealmente con la gravedad ($v_y = v_{0y} - gt$).",
            "Ambas componentes ($v_x$ y $v_y$) disminuyen uniformemente hasta anularse en el ápice.",
            "La componente horizontal $v_x$ se acelera continuamente hacia adelante.",
            "En el punto más alto ambas componentes de velocidad son nulas."
        ],
        "ans": 0,
        "exp": "**Paso 1. Principio de independencia de Galileo:** El movimiento horizontal no tiene fuerzas netas ($a_x = 0 \\implies v_x = \\text{constante}$). \n**Paso 2. Eje vertical:** Experimenta la aceleración constante de la gravedad ($a_y = -g \\implies v_y = v_{0y} - gt$).\n**Respuesta correcta: A.**",
        "maths": ["v_x = v_0\\cos\\theta = \\text{cte}", "v_y = v_0\\sin\\theta - gt"], "imgs": []
    },
    # 28 (Teórica 6) - Gráfica v-t Área
    {
        "id": "fis-19ago-28", "s": "fis", "n": 28, "d": "intermedio", "topics": ["2.1.1-mruv"], "ch": "fis-F01",
        "t": "Significado Geométrico del Área en Gráfica v-t",
        "prompt": "En cualquier gráfica de velocidad en función del tiempo ($v$ vs $t$) para un móvil en movimiento rectilíneo, el área geométrica comprendida entre la curva de velocidad y el eje temporal representa conceptualmente:",
        "opts": [
            "El desplazamiento neto ($\\Delta x$) realizado por el móvil en dicho intervalo.",
            "La aceleración instantánea del móvil.",
            "La fuerza neta aplicada sobre el cuerpo.",
            "La energía potencial gravitatoria acumulada."
        ],
        "ans": 0,
        "exp": "**Paso 1. Análisis dimensional:** El producto de los ejes es $(\\text{m/s}) \\times (\\text{s}) = \\text{m}$ (unidad de longitud/desplazamiento).\n**Paso 2. Propiedad fundamental:** En una gráfica $v-t$, el área bajo la curva es el desplazamiento neto $\\Delta x$, mientras que la pendiente de la recta tangente es la aceleración instantánea $a$.\n**Respuesta correcta: A.**",
        "maths": ["\\text{Área}(v-t) = \\Delta x", "\\text{Pendiente}(v-t) = a"], "imgs": []
    },
    # 29 (Teórica 7) - Gráfica v-t Pendiente
    {
        "id": "fis-19ago-29", "s": "fis", "n": 29, "d": "intermedio", "topics": ["2.1.1-mruv"], "ch": "fis-F01",
        "t": "Gráfica Velocidad-Tiempo y Pendiente",
        "prompt": "En una gráfica de velocidad versus tiempo ($v$ vs $t$) donde la gráfica es una línea recta inclinada no horizontal, la pendiente constante de dicha recta representa físicamente:",
        "opts": [
            "La aceleración constante del movimiento ($a = \\frac{\\Delta v}{\\Delta t}$).",
            "La posición inicial del objeto.",
            "El trabajo total desarrollado por el motor.",
            "La rapidez media del recorrido."
        ],
        "ans": 0,
        "exp": "**Paso 1. Definición matemática de pendiente:** $m = \\frac{\\Delta y}{\\Delta x} = \\frac{\\Delta v}{\\Delta t}$.\n**Paso 2. Significado físico:** La tasa de cambio de la velocidad respecto al tiempo es la aceleración $a$.\n**Respuesta correcta: A.**",
        "maths": ["a = \\frac{\\Delta v}{\\Delta t}"], "imgs": []
    },
    # 30 (Cálculo 3) - Choque Inelástico
    {
        "id": "fis-19ago-30", "s": "fis", "n": 30, "d": "intermedio", "topics": ["2.2.3-impulso"], "ch": "fis-F02",
        "t": "Choque Inelástico y Conservación",
        "prompt": "Un vagón de ferrocarril $A$ de $4000\\text{ kg}$ que se mueve a $3\\text{ m/s}$ sobre una vía horizontal sin fricción choca y se acopla con otro vagón $B$ de $2000\\text{ kg}$ inicialmente en reposo. La rapidez final del conjunto acoplado es:",
        "opts": [
            "$v_f = 2.0\\text{ m/s}$ en la misma dirección del vagón inicial.",
            "$v_f = 1.0\\text{ m/s}$",
            "$v_f = 3.0\\text{ m/s}$",
            "$v_f = 1.5\\text{ m/s}$"
        ],
        "ans": 0,
        "exp": "**Paso 1. Conservación de momento:** $m_A v_A + m_B v_B = (m_A + m_B) v_f$.\n**Paso 2. Cálculo:** $(4000)(3) + (2000)(0) = (4000 + 2000) v_f \\implies 12000 = 6000 v_f \\implies v_f = 2.0\\text{ m/s}$.\n**Respuesta correcta: A.**",
        "maths": ["v_f = \\frac{12000}{6000} = 2.0\\text{ m/s}"], "imgs": []
    },
    # 31 (Teórica 8) - Teorema del Impulso
    {
        "id": "fis-19ago-31", "s": "fis", "n": 31, "d": "intermedio", "topics": ["2.2.3-impulso"], "ch": "fis-F02",
        "t": "Teorema del Impulso y Duración del Impacto",
        "prompt": "Durante el choque de un vehículo, para un mismo cambio en su cantidad de movimiento ($\\Delta p = \\text{constante}$), si se reduce el tiempo de impacto $\\Delta t$ a la mitad al chocar contra un muro rígido en vez de una barrera deformable, la fuerza media de impacto:",
        "opts": [
            "Se duplica (aumenta al doble) debido a la relación inversamente proporcional ($F = \\frac{\\Delta p}{\\Delta t}$).",
            "Se reduce a la mitad.",
            "Permanece exactamente igual.",
            "Se reduce a la cuarta parte."
        ],
        "ans": 0,
        "exp": "**Paso 1. Teorema del impulso:** $\\vec{J} = \\vec{F}_{\\text{media}} \\Delta t = \\Delta \\vec{p} \\implies \\vec{F}_{\\text{media}} = \\frac{\\Delta \\vec{p}}{\\Delta t}$.\n**Paso 2. Relación de proporcionalidad:** A menor tiempo de interacción $\\Delta t$, mayor es la fuerza media de impacto generada. Si $\\Delta t$ se divide por 2, la fuerza media se duplica.\n**Respuesta correcta: A.**",
        "maths": ["F_{\\text{media}} = \\frac{\\Delta p}{\\Delta t}"], "imgs": []
    },
    # 32 (Teórica 9) - Distancia de Frenado Cuadrática
    {
        "id": "fis-19ago-32", "s": "fis", "n": 32, "d": "intermedio", "topics": ["2.1.1-mruv", "2.2.2-trabajoEnergia"], "ch": "fis-F02",
        "t": "Relación Cuadrática en la Distancia de Frenado",
        "prompt": "Un automóvil que viaja con rapidez inicial $v$ aplica sus frenos produciendo una desaceleración constante $a$ hasta detenerse en una distancia $d$. Si el mismo automóvil viaja al doble de rapidez inicial ($2v$), la distancia mínima de frenado requerida:",
        "opts": [
            "Se cuadruplica (cuatro veces mayor) debido a la escala cuadrática de la energía cinética ($d \\propto v^2$).",
            "Se duplica en proporción directa a la rapidez.",
            "Aumenta ocho veces respecto a la distancia original.",
            "Permanece idéntica si los frenos ejercen la misma fuerza de retención."
        ],
        "ans": 0,
        "exp": "**Paso 1. Cinemática / Trabajo y Energía:** Por Torricelli: $v_f^2 = v_0^2 - 2ad \\implies 0 = v_0^2 - 2ad \\implies d = \\frac{v_0^2}{2a}$.\n**Paso 2. Escalamiento:** La distancia de frenado es proporcional al cuadrado de la rapidez inicial ($d \\propto v_0^2$). Si $v_0$ se duplica, $(2)^2 = 4$, por lo que la distancia se cuadruplica.\n**Respuesta correcta: A.**",
        "maths": ["d = \\frac{v_0^2}{2a} \\implies d \\propto v_0^2"], "imgs": []
    },
    # 33 (Teórica 10) - Ángulo Crítico
    {
        "id": "fis-19ago-33", "s": "fis", "n": 33, "d": "intermedio", "topics": ["2.2.1-leyesNewton"], "ch": "fis-F02",
        "t": "Ángulo Crítico de Deslizamiento e Independencia de Masa",
        "prompt": "Se coloca un bloque sobre un plano y se inclina gradualmente el ángulo $\\theta$. En el momento exacto en que el bloque está a punto de deslizar (equilibrio límite):",
        "opts": [
            "El coeficiente de rozamiento estático es igual a la tangente del ángulo crítico ($\\mu_s = \\tan\\theta$) y es completamente independiente de la masa del bloque.",
            "El coeficiente de rozamiento estático depende exclusivamente de la masa del bloque.",
            "La fuerza normal se hace mayor que el peso total.",
            "La fuerza de rozamiento estático se vuelve nula."
        ],
        "ans": 0,
        "exp": "**Paso 1. Equilibrio en plano inclinado:** $\\sum F_x = mg\\sin\\theta - f_s = 0$ y $\\sum F_y = N - mg\\cos\\theta = 0$.\n**Paso 2. Condición límite:** $f_{s,\\text{máx}} = \\mu_s N = \\mu_s mg\\cos\\theta$. Igualando: $mg\\sin\\theta = \\mu_s mg\\cos\\theta \\implies \\mu_s = \\tan\\theta$.\n**Paso 3. Conclusión:** La masa $m$ y la gravedad $g$ se cancelan, demostrando que el ángulo crítico depende solo de los materiales en contacto.\n**Respuesta correcta: A.**",
        "maths": ["\\mu_s = \\tan\\theta"], "imgs": []
    },
    # 34 (Teórica 11) - Teorema Trabajo y Energía
    {
        "id": "fis-19ago-34", "s": "fis", "n": 34, "d": "intermedio", "topics": ["2.2.2-trabajoEnergia"], "ch": "fis-F02",
        "t": "Teorema del Trabajo y la Energía Cinética",
        "prompt": "De acuerdo con el Teorema del Trabajo y la Energía Cinética, si la fuerza neta resultante que actúa sobre un cuerpo realiza un trabajo total positivo ($W_{\\text{neto}} > 0$):",
        "opts": [
            "La energía cinética del cuerpo necesariamente se incrementa ($\\Delta K > 0$).",
            "La energía potencial del cuerpo siempre disminuye.",
            "La rapidez del cuerpo se reduce debido a la inercia.",
            "El cuerpo se encuentra en equilibrio estático."
        ],
        "ans": 0,
        "exp": "**Paso 1. Teorema formal:** $W_{\\text{neto}} = \\Delta K = K_f - K_0$.\n**Paso 2. Deducción física:** Si el trabajo neto es positivo, la energía cinética final es estrictamente mayor que la inicial, aumentando la rapidez del objeto.\n**Respuesta correcta: A.**",
        "maths": ["W_{\\text{neto}} = \\Delta K = K_f - K_0 > 0"], "imgs": []
    },
    # 35 (Teórica 12) - Rizo Vertical Cúspide
    {
        "id": "fis-19ago-35", "s": "fis", "n": 35, "d": "intermedio", "topics": ["2.1.2-mcu", "2.2.1-leyesNewton"], "ch": "fis-F02",
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
        "maths": ["N = 0 \\implies mg = m\\frac{v^2}{R} \\implies v_{\\text{mín}} = \\sqrt{gR}"], "imgs": []
    },
    # 36 (Teórica 13) - Gravitación Tierra-Luna
    {
        "id": "fis-19ago-36", "s": "fis", "n": 36, "d": "intermedio", "topics": ["2.2.1-leyesNewton", "2.2.4-gravitacion"], "ch": "fis-F02",
        "t": "Tercera Ley en Atracción Gravitatoria",
        "prompt": "La masa de la Tierra es aproximadamente $81\\text{ veces}$ mayor que la masa de la Luna. Considerando la fuerza gravitatoria mutua que ejercen entre sí:",
        "opts": [
            "La fuerza gravitatoria que la Tierra ejerce sobre la Luna tiene exactamente la misma magnitud que la que la Luna ejerce sobre la Tierra ($|\\vec{F}_{TL}| = |\\vec{F}_{LT}|$).",
            "La fuerza que la Tierra ejerce sobre la Luna es $81\\text{ veces}$ mayor.",
            "La Luna no ejerce fuerza sobre la Tierra porque está en órbita.",
            "La fuerza depende de la fase lunar."
        ],
        "ans": 0,
        "exp": "**Paso 1. Ley de Gravitación Universal:** $F = G\\frac{M_{\\text{Tierra}} M_{\\text{Luna}}}{r^2}$.\n**Paso 2. Tercera Ley de Newton:** La atracción gravitatoria constituye un par de acción y reacción: la Tierra atrae a la Luna con una fuerza idéntica en magnitud a la que la Luna atrae a la Tierra.\n**Respuesta correcta: A.**",
        "maths": ["|\\vec{F}_{TL}| = |\\vec{F}_{LT}| = G\\frac{M_T M_L}{r^2}"], "imgs": []
    },
    # 37 (Teórica 14) - Tensión entre Dos Bloques
    {
        "id": "fis-19ago-37", "s": "fis", "n": 37, "d": "intermedio", "topics": ["2.2.1-leyesNewton"], "ch": "fis-F02",
        "t": "Tensión en Cuerda Intermedia entre Dos Bloques",
        "prompt": "Dos bloques $A$ ($3\\text{ kg}$) y $B$ ($2\\text{ kg}$) están unidos por una cuerda ligera sobre una mesa horizontal sin fricción. Si se aplica una fuerza externa horizontal constante $F$ sobre el bloque $A$ para acelerar el sistema hacia adelante:",
        "opts": [
            "La tensión en la cuerda intermedia es menor que la fuerza externa total $F$, ya que la cuerda solo es responsable de acelerar al bloque posterior $B$.",
            "La tensión en la cuerda que une a los bloques es igual a la fuerza externa total $F$.",
            "La tensión en la cuerda intermedia es nula porque la mesa no tiene fricción.",
            "El bloque $B$ experimenta el doble de aceleración que el bloque $A$."
        ],
        "ans": 0,
        "exp": "**Paso 1. Segunda ley al sistema conjunto:** $F = (m_A + m_B)a \\implies a = \\frac{F}{m_A + m_B}$.\n**Paso 2. Segunda ley al bloque posterior $B$:** La única fuerza horizontal que acelera a $B$ es la tensión: $T = m_B a = F \\left(\\frac{m_B}{m_A + m_B}\\right) < F$.\n**Paso 3. Conclusión:** La tensión en la cuerda interior siempre es una fracción de la fuerza externa total aplicada.\n**Respuesta correcta: A.**",
        "maths": ["T = F\\left(\\frac{m_B}{m_A + m_B}\\right) < F"], "imgs": []
    },
    # 38 (Teórica 15) - Potencia Mecánica
    {
        "id": "fis-19ago-38", "s": "fis", "n": 38, "d": "intermedio", "topics": ["2.2.2-trabajoEnergia"], "ch": "fis-F02",
        "t": "Concepto de Potencia Mecánica a Rapidez Constante",
        "prompt": "Si una máquina eleva una carga pesada verticalmente a velocidad constante $v$, la potencia mecánica media entregada por el motor se expresa conceptualmente como:",
        "opts": [
            "El producto de la fuerza de tracción (igual al peso) por la velocidad instantánea ($P = F \\cdot v = mg \\cdot v$).",
            "El producto de la fuerza gravitatoria por la aceleración del sistema.",
            "El cociente entre la energía potencial y la distancia recorrida.",
            "La mitad de la masa multiplicada por el cuadrado del tiempo."
        ],
        "ans": 0,
        "exp": "**Paso 1. Definición de potencia:** $P = \\frac{W}{\\Delta t} = \\frac{F d}{\\Delta t} = F \\cdot v$.\n**Paso 2. Equilibrio dinámico:** Al subir a velocidad constante ($a = 0$), la fuerza de tracción equilibra exactamente al peso ($F = mg$), por lo que $P = mg \\cdot v$.\n**Respuesta correcta: A.**",
        "maths": ["P = F \\cdot v = mg \\cdot v"], "imgs": []
    },
    # 39 (Teórica 16) - Energía a Media Altura
    {
        "id": "fis-19ago-39", "s": "fis", "n": 39, "d": "intermedio", "topics": ["2.2.2-trabajoEnergia"], "ch": "fis-F02",
        "t": "Energía a la Mitad de la Altura Máxima",
        "prompt": "Se lanza una pelota verticalmente hacia arriba con energía mecánica total constante $E_m$. En el punto medio de su altura máxima ($h = \\frac{1}{2}H_{\\text{máx}}$), la relación entre su energía cinética ($E_c$) y su energía potencial gravitatoria ($E_p$) es:",
        "opts": [
            "Ambas energías son exactamente iguales ($E_c = E_p = \\frac{1}{2}E_m$).",
            "La energía cinética es el triple de la potencial.",
            "La energía potencial es el cuádruple de la cinética.",
            "La energía cinética se anula a la mitad de la subida."
        ],
        "ans": 0,
        "exp": "**Paso 1. Conservación de energía:** $E_m = E_p + E_c = mgH_{\\text{máx}}$.\n**Paso 2. Altura media:** A $h = \\frac{1}{2}H_{\\text{máx}}$, la energía potencial es $E_p = mg\\left(\\frac{1}{2}H_{\\text{máx}}\\right) = \\frac{1}{2}E_m$.\n**Paso 3. Energía cinética restante:** $E_c = E_m - E_p = \\frac{1}{2}E_m$. Por tanto, $E_c = E_p$.\n**Respuesta correcta: A.**",
        "maths": ["E_p = E_c = \\frac{1}{2}E_m"], "imgs": []
    },
    # 40 (Teórica 17) - MCU Frecuencia y Período
    {
        "id": "fis-19ago-40", "s": "fis", "n": 40, "d": "intermedio", "topics": ["2.1.2-mcu"], "ch": "fis-F01",
        "t": "Relación entre Período, Frecuencia y Velocidad Angular",
        "prompt": "En un movimiento circular uniforme, si un cuerpo duplica su frecuencia de rotación ($f' = 2f$), ¿cómo cambian su período ($T$) y su velocidad angular ($\\omega$)?",
        "opts": [
            "El período se reduce a la mitad ($T' = \\frac{T}{2}$) y la velocidad angular se duplica ($\\omega' = 2\\omega$).",
            "El período se duplica y la velocidad angular se reduce a la mitad.",
            "Tanto el período como la velocidad angular se cuadruplican.",
            "La velocidad angular permanece constante porque depende del radio."
        ],
        "ans": 0,
        "exp": "**Paso 1. Relación fundamental de período y frecuencia:** $T = \\frac{1}{f}$. Si la frecuencia $f$ se duplica, el período $T$ se reduce a la mitad ($T' = T/2$).\n**Paso 2. Velocidad angular:** $\\omega = 2\\pi f$. Como $\\omega$ es directamente proporcional a $f$, al duplicar $f$, $\\omega$ se duplica ($\\omega' = 2\\omega$).\n**Respuesta correcta: A.**",
        "maths": ["T = \\frac{1}{f}", "\\omega = 2\\pi f"], "imgs": []
    }
]

# 4. Build Curated Intento 2 for Química (20 questions: 16 Conceptual / 4 Calculation)
# Including Redox O2, Quantum Numbers, Geometry, Hydrogen Bonds, Halogens, Stoichiometry, Stock Nomenclatures and Conversions
intento2_qui = [
    # 41: Rol del Oxígeno en Redox
    {
        "id": "qui-19ago-21", "s": "qui", "n": 21, "d": "intermedio", "topics": ["3.3.1-redox"], "ch": "qui-Q04",
        "t": "Comportamiento del Oxígeno en Redox",
        "prompt": "En la reacción de formación de óxidos metálicos, como la síntesis del óxido de magnesio ($2\\text{Mg} + \\text{O}_2 \\to 2\\text{MgO}$), ¿cuál es el comportamiento y rol químico del oxígeno molecular ($\\text{O}_2$)?",
        "opts": [
            "Gana electrones, su estado de oxidación disminuye de $0$ a $-2$ (se reduce) y actúa como agente oxidante.",
            "Pierde electrones, su estado de oxidación aumenta (se oxida) y actúa como agente reductor.",
            "Cede electrones al magnesio y no experimenta cambio en su número de oxidación.",
            "Actúa como espectador neutro sin transferencia electrónica."
        ],
        "ans": 0,
        "exp": "**Paso 1. Estados de oxidación:** En reactivos $\\text{O}_2^0$ tiene $\\text{Nox} = 0$. En el óxido $\\text{MgO}$, el oxígeno forma $\\text{O}^{2-}$ con $\\text{Nox} = -2$.\n**Paso 2. Transferencia:** Al pasar de $0$ a $-2$, capta 2 electrones por átomo (se reduce).\n**Paso 3. Rol redox:** Al reducirse y provocar la oxidación del metal, actúa como **agente oxidante**.\n**Respuesta correcta: A.**",
        "maths": ["\\text{O}_2^0 + 4e^- \\to 2\\,\\text{O}^{2-}"], "imgs": []
    },
    # 42: Números Cuánticos Azufre Z=16
    {
        "id": "qui-19ago-22", "s": "qui", "n": 22, "d": "intermedio", "topics": ["3.1.2-configuracion"], "ch": "qui-Q01",
        "t": "Números Cuánticos del Electrón Diferencial",
        "prompt": "El átomo de azufre posee un número atómico $Z = 16$. De acuerdo con el principio de Aufbau, la regla de Hund y el principio de Pauli, ¿cuál es el conjunto correcto de números cuánticos $(n, l, m_l, m_s)$ para su electrón diferencial?",
        "opts": [
            "$(3, 1, -1, -1/2)$",
            "$(3, 1, +1, +1/2)$",
            "$(3, 0, 0, -1/2)$",
            "$(3, 2, -1, +1/2)$"
        ],
        "ans": 0,
        "exp": "**Paso 1. Configuración:** $1s^2 2s^2 2p^6 3s^2 3p^4$.\n**Paso 2. Subnivel $3p$:** $n = 3$, $l = 1$.\n**Paso 3. Orbitales de $3p$:** $m_l = -1, 0, +1$. Los primeros 3 entran con $+1/2$ y el 4to electrón entra apareado en $m_l = -1$ con espín $-1/2$.\n**Respuesta correcta: A.**",
        "maths": ["(n=3, l=1, m_l=-1, m_s=-1/2)"], "imgs": []
    },
    # 43: Geometría Molecular RPECV CO2 y CH4
    {
        "id": "qui-19ago-23", "s": "qui", "n": 23, "d": "intermedio", "topics": ["3.2.1-enlaceQuimico"], "ch": "qui-Q02",
        "t": "Geometría Molecular (RPECV) y Polaridad",
        "prompt": "Aplicando el modelo de Repulsión de Pares de Electrones de la Capa de Valencia (RPECV), identifique la afirmación correcta respecto a la geometría y polaridad de $\\text{CH}_4$, $\\text{NH}_3$ y $\\text{CO}_2$:",
        "opts": [
            "El $\\text{CH}_4$ es tetraédrico y apolar; el $\\text{NH}_3$ es piramidal trigonal y polar; y el $\\text{CO}_2$ es lineal y apolar por simetría.",
            "El $\\text{CH}_4$ es plano cuadrado y polar; el $\\text{NH}_3$ es trigonal plano apolar; y el $\\text{CO}_2$ es angular polar.",
            "El $\\text{NH}_3$ es tetraédrico apolar igual que el $\\text{CH}_4$.",
            "El $\\text{CO}_2$ es asimétrico y polar."
        ],
        "ans": 0,
        "exp": "**Paso 1. $\\text{CH}_4$:** Tetraédrico regular ($109.5^\\circ$), dipolos se cancelan $\\implies$ apolar.\n**Paso 2. $\\text{NH}_3$:** Piramidal trigonal ($107^\\circ$) con 1 par libre que rompe la simetría $\\implies$ polar.\n**Paso 3. $\\text{CO}_2$:** Lineal ($180^\\circ$), dipolos opuestos se cancelan vectorialmente $\\implies$ apolar.\n**Respuesta correcta: A.**",
        "maths": ["\\mu_{\\text{neto}}(\\text{CO}_2) = 0", "\\mu_{\\text{neto}}(\\text{NH}_3) \\neq 0"], "imgs": []
    },
    # 44: Puentes de Hidrógeno
    {
        "id": "qui-19ago-24", "s": "qui", "n": 24, "d": "intermedio", "topics": ["3.2.2-fuerzasIntermoleculares"], "ch": "qui-Q02",
        "t": "Fuerzas Intermoleculares y Puentes de Hidrógeno",
        "prompt": "¿Cuál de las siguientes series contiene únicamente sustancias cuyas moléculas forman puentes de hidrógeno entre sí en fase líquida?",
        "opts": [
            "$\\text{NH}_3,\\ \\text{H}_2\\text{O},\\ \\text{HF}$",
            "$\\text{CH}_4,\\ \\text{H}_2\\text{O},\\ \\text{HCl}$",
            "$\\text{H}_2\\text{S},\\ \\text{PH}_3,\\ \\text{NH}_3$",
            "$\\text{CO}_2,\\ \\text{CH}_3\\text{Cl},\\ \\text{HF}$"
        ],
        "ans": 0,
        "exp": "**Paso 1. Regla FON:** El puente de H exige hidrógeno unido directamente a Flúor, Oxígeno o Nitrógeno.\n**Paso 2. Análisis:** $\\text{NH}_3$ ($\text{N-H}$), $\\text{H}_2\\text{O}$ ($\text{O-H}$) y $\\text{HF}$ ($\text{F-H}$) cumplen la regla.\n**Respuesta correcta: A.**",
        "maths": ["\\text{FON: Flúor, Oxígeno, Nitrógeno}"], "imgs": []
    },
    # 45: Halógenos Tabla Periódica
    {
        "id": "qui-19ago-25", "s": "qui", "n": 25, "d": "intermedio", "topics": ["3.1.3-tablaPeriodica"], "ch": "qui-Q01",
        "t": "Tendencias Periódicas en Halógenos",
        "prompt": "Para el grupo de los halógenos (Grupo 17: $\\text{F, Cl, Br, I}$), ¿cuál es el orden correcto de menor a mayor (orden creciente) para el radio atómico y la electronegatividad?",
        "opts": [
            "Radio atómico: $\\text{F} < \\text{Cl} < \\text{Br} < \\text{I}$ ; Electronegatividad: $\\text{I} < \\text{Br} < \\text{Cl} < \\text{F}$",
            "Radio atómico: $\\text{I} < \\text{Br} < \\text{Cl} < \\text{F}$ ; Electronegatividad: $\\text{F} < \\text{Cl} < \\text{Br} < \\text{I}$",
            "Radio atómico: $\\text{F} < \\text{Cl} < \\text{Br} < \\text{I}$ ; Electronegatividad: $\\text{F} < \\text{Cl} < \\text{Br} < \\text{I}$",
            "Radio atómico: $\\text{Cl} < \\text{F} < \\text{Br} < \\text{I}$ ; Electronegatividad: $\\text{Br} < \\text{I} < \\text{Cl} < \\text{F}$"
        ],
        "ans": 0,
        "exp": "**Paso 1. Radio en el grupo:** Aumenta hacia abajo por adición de capas cuánticas: $\\text{F} < \\text{Cl} < \\text{Br} < \\text{I}$.\n**Paso 2. Electronegatividad:** Aumenta hacia arriba: $\\text{I} < \\text{Br} < \\text{Cl} < \\text{F}$ (el Flúor es el máximo con 4.0).\n**Respuesta correcta: A.**",
        "maths": ["\\text{Radio: } \\text{F} < \\text{Cl} < \\text{Br} < \\text{I}"], "imgs": []
    },
    # 46: Estequiometría Exacta Mg + O2
    {
        "id": "qui-19ago-26", "s": "qui", "n": 26, "d": "intermedio", "topics": ["3.4.1-estequiometria"], "ch": "qui-Q03",
        "t": "Estequiometría Exacta y Conservación de Masa",
        "prompt": "En un recipiente cerrado reaccionan $24\\text{ g}$ de magnesio ($\text{Mg} = 24\\text{ g/mol}$) con $16\\text{ g}$ de oxígeno molecular ($\text{O}_2 = 32\\text{ g/mol}$) según $2\\text{Mg} + \\text{O}_2 \\to 2\\text{MgO}$. ¿Qué masa de producto se obtiene?",
        "opts": [
            "Se trata de una proporción estequiométrica exacta: ambos reactivos se consumen totalmente produciendo $40.0\\text{ g}$ de $\\text{MgO}$.",
            "El $\\text{Mg}$ es el reactivo limitante y sobran $8\\text{ g}$ de $\\text{O}_2$.",
            "El $\\text{O}_2$ es limitante y se forman $20\\text{ g}$ de $\\text{MgO}$.",
            "Sobran $12\\text{ g}$ de $\\text{Mg}$ sin reaccionar."
        ],
        "ans": 0,
        "exp": "**Paso 1. Moles:** $n(\\text{Mg}) = \\frac{24}{24} = 1.0\\text{ mol}$; $n(\\text{O}_2) = \\frac{16}{32} = 0.5\\text{ mol}$.\n**Paso 2. Proporción:** $1.0 : 0.5 = 2 : 1$, que coincide exactamente con la ecuación.\n**Paso 3. Masa de $\\text{MgO}$:** Por Lavoisier: $24 + 16 = 40.0\\text{ g}$.\n**Respuesta correcta: A.**",
        "maths": ["24\\text{ g Mg} + 16\\text{ g O}_2 = 40.0\\text{ g MgO}"], "imgs": []
    },
    # 47: Nomenclatura Stock FeCl3 y Conversiones SI
    {
        "id": "qui-19ago-27", "s": "qui", "n": 27, "d": "intermedio", "topics": ["3.2.3-nomenclatura"], "ch": "qui-Q02",
        "t": "Nomenclatura Stock y Conversiones de Unidades",
        "prompt": "Identifique la opción que contiene el nombre Stock de $\\text{FeCl}_3$ y las conversiones al SI para $1\\text{ tonelada (t)}$ a $\\text{kg}$ y $230\\text{ cm}^3$ a $\\text{m}^3$:",
        "opts": [
            "Cloruro de hierro (III) ; $1\\text{ t} = 1000\\text{ kg}$ ; $230\\text{ cm}^3 = 2.30 \\times 10^{-4}\\text{ m}^3$",
            "Tricloruro de hierro ; $1\\text{ t} = 100\\text{ kg}$ ; $230\\text{ cm}^3 = 2.30 \\times 10^{-2}\\text{ m}^3$",
            "Cloruro de hierro (II) ; $1\\text{ t} = 1000\\text{ kg}$ ; $230\\text{ cm}^3 = 2.30 \\times 10^{-6}\\text{ m}^3$",
            "Cloruro férrico ; $1\\text{ t} = 10000\\text{ kg}$ ; $230\\text{ cm}^3 = 2.30 \\times 10^{-3}\\text{ m}^3$"
        ],
        "ans": 0,
        "exp": "**Paso 1. Stock $\\text{FeCl}_3$:** $\\text{Cl} = -1 \\implies \\text{Fe} = +3 \\implies$ **Cloruro de hierro (III)**.\n**Paso 2. Tonelada:** $1\\text{ t} = 1000\\text{ kg}$.\n**Paso 3. Volumen:** $230\\text{ cm}^3 \\times 10^{-6}\\text{ m}^3/\\text{cm}^3 = 2.30 \\times 10^{-4}\\text{ m}^3$.\n**Respuesta correcta: A.**",
        "maths": ["230\\text{ cm}^3 = 2.30 \\times 10^{-4}\\text{ m}^3"], "imgs": []
    },
    # 48: Partículas en Cation Al3+
    {
        "id": "qui-19ago-28", "s": "qui", "n": 28, "d": "intermedio", "topics": ["3.1.1-estructuraAtomica"], "ch": "qui-Q01",
        "t": "Partículas Subatómicas en Iones",
        "prompt": "Para el catión $^{27}_{13}\\text{Al}^{3+}$, el número exacto de protones ($p^+$), neutrones ($n$) y electrones ($e^-$) es:",
        "opts": [
            "$13\\text{ protones},\\ 14\\text{ neutrones},\\ 10\\text{ electrones}$",
            "$13\\text{ protones},\\ 27\\text{ neutrones},\\ 13\\text{ electrones}$",
            "$10\\text{ protones},\\ 14\\text{ neutrones},\\ 13\\text{ electrones}$",
            "$13\\text{ protones},\\ 14\\text{ neutrones},\\ 16\\text{ electrones}$"
        ],
        "ans": 0,
        "exp": "**Paso 1. Protones:** $p^+ = Z = 13$.\n**Paso 2. Neutrones:** $n = A - Z = 27 - 13 = 14$.\n**Paso 3. Electrones:** Carga $+3 \\implies e^- = 13 - 3 = 10$.\n**Respuesta correcta: A.**",
        "maths": ["p^+ = 13,\\ n = 14,\\ e^- = 10"], "imgs": []
    },
    # 49: Reactivo Limitante Síntesis NH3
    {
        "id": "qui-19ago-29", "s": "qui", "n": 29, "d": "intermedio", "topics": ["3.4.1-estequiometria"], "ch": "qui-Q03",
        "t": "Reactivo Limitante y Exceso en Síntesis de Amoníaco",
        "prompt": "En la reacción $\\text{N}_2 + 3\\text{H}_2 \\to 2\\text{NH}_3$, si se mezclan $28\\text{ g}$ de $\\text{N}_2$ ($1.0\\text{ mol}$) con $9\\text{ g}$ de $\\text{H}_2$ ($4.5\\text{ mol}$):",
        "opts": [
            "El $\\text{N}_2$ es el reactivo limitante y sobran $3.0\\text{ g}$ de $\\text{H}_2$ en exceso.",
            "El $\\text{H}_2$ es el reactivo limitante y sobran $14\\text{ g}$ de $\\text{N}_2$.",
            "Ambos se consumen totalmente sin reactivo en exceso.",
            "Se producen $4.5\\text{ moles}$ de $\\text{NH}_3$."
        ],
        "ans": 0,
        "exp": "**Paso 1. Estequiometría:** $1\\text{ mol }\\text{N}_2$ requiere $3\\text{ mol }\\text{H}_2$.\n**Paso 2. Disponibilidad:** Hay $4.5\\text{ mol }\\text{H}_2$. Se consumen $3.0\\text{ mol}$ y sobran $1.5\\text{ mol de }\\text{H}_2 = 3.0\\text{ g}$.\n**Paso 3. Conclusión:** El $\\text{N}_2$ limita la reacción.\n**Respuesta correcta: A.**",
        "maths": ["4.5 - 3.0 = 1.5\\text{ mol }\\text{H}_2\\ (3.0\\text{ g})"], "imgs": []
    },
    # 50: Estados de Oxidación en K2Cr2O7
    {
        "id": "qui-19ago-30", "s": "qui", "n": 30, "d": "intermedio", "topics": ["3.3.1-redox"], "ch": "qui-Q04",
        "t": "Estado de Oxidación del Cromo",
        "prompt": "En el dicromato de potasio ($\\text{K}_2\\text{Cr}_2\\text{O}_7$), el estado de oxidación del cromo ($\\text{Cr}$) es:",
        "opts": [
            "$+6$",
            "$+3$",
            "$+7$",
            "$+12$"
        ],
        "ans": 0,
        "exp": "**Paso 1. Reglas:** $\\text{K} = +1, \\text{O} = -2$.\n**Paso 2. Ecuación:** $2(+1) + 2(\\text{Cr}) + 7(-2) = 0 \\implies 2 + 2\\text{Cr} - 14 = 0$.\n**Paso 3. Despeje:** $2\\text{Cr} = 12 \\implies \\text{Cr} = +6$.\n**Respuesta correcta: A.**",
        "maths": ["2\\text{Cr} = 12 \\implies \\text{Cr} = +6"], "imgs": []
    },
    # 51: Cantidad de Partículas en Moles
    {
        "id": "qui-19ago-31", "s": "qui", "n": 31, "d": "intermedio", "topics": ["3.4.1-estequiometria"], "ch": "qui-Q03",
        "t": "Número de Avogadro y Moles",
        "prompt": "La cantidad de moléculas contenidas en $0.5\\text{ moles}$ de dióxido de carbono ($\\text{CO}_2$) es:",
        "opts": [
            "$3.011 \\times 10^{23}\\text{ moléculas}$",
            "$6.022 \\times 10^{23}\\text{ moléculas}$",
            "$1.204 \\times 10^{24}\\text{ moléculas}$",
            "$44.0 \\times 10^{23}\\text{ moléculas}$"
        ],
        "ans": 0,
        "exp": "**Paso 1. Fórmula:** $N = n \\cdot N_A$.\n**Paso 2. Cálculo:** $N = (0.5)(6.022 \\times 10^{23}) = 3.011 \\times 10^{23}\\text{ moléculas}$.\n**Respuesta correcta: A.**",
        "maths": ["N = 0.5 \\times 6.022 \\times 10^{23} = 3.011 \\times 10^{23}"], "imgs": []
    },
    # 52: Geometría Metano CH4
    {
        "id": "qui-19ago-32", "s": "qui", "n": 32, "d": "intermedio", "topics": ["3.2.1-enlaceQuimico"], "ch": "qui-Q02",
        "t": "Geometría Tetraédrica del Metano",
        "prompt": "¿Cuál es la geometría molecular y el ángulo de enlace aproximado en la molécula de metano ($\\text{CH}_4$)?",
        "opts": [
            "Tetraédrica con ángulo de enlace de $109.5^\\circ$.",
            "Plana cuadrada con ángulo de $90^\\circ$.",
            "Trigonal plana con ángulo de $120^\\circ$.",
            "Lineal con ángulo de $180^\\circ$."
        ],
        "ans": 0,
        "exp": "**Paso 1. Dominios:** El carbono tiene 4 pares enlazantes y 0 libres (hibridación $sp^3$).\n**Paso 2. Geometría:** Distribución tetraédrica regular con ángulo de $109.5^\\circ$.\n**Respuesta correcta: A.**",
        "maths": ["\\text{Tetraédrico: } 109.5^\\circ"], "imgs": []
    },
    # 53: Geometría Amoníaco NH3
    {
        "id": "qui-19ago-33", "s": "qui", "n": 33, "d": "intermedio", "topics": ["3.2.1-enlaceQuimico"], "ch": "qui-Q02",
        "t": "Geometría Piramidal Trigonal del Amoníaco",
        "prompt": "El amoníaco ($\\text{NH}_3$) presenta una geometría molecular piramidal trigonal con un ángulo de enlace de aproximadamente $107^\\circ$ debido a:",
        "opts": [
            "La repulsión ejercida por el par de electrones no enlazantes sobre los pares enlazantes.",
            "La presencia de enlaces dobles $\\text{N=H}$.",
            "La simetría lineal de los enlaces covalentes apolares.",
            "La atracción electrostática de cationes de nitrógeno."
        ],
        "ans": 0,
        "exp": "**Paso 1. Estructura:** El nitrógeno tiene 3 pares de enlace y 1 par libre ($\text{AX}_3\text{E}$).\n**Paso 2. Repulsión:** El par solitario repele más fuertemente a los pares de enlace, reduciendo el ángulo de $109.5^\\circ$ a $107^\\circ$.\n**Respuesta correcta: A.**",
        "maths": ["\\text{Piramidal trigonal: } \\approx 107^\\circ"], "imgs": []
    },
    # 54: Enlace Iónico vs Covalente
    {
        "id": "qui-19ago-34", "s": "qui", "n": 34, "d": "intermedio", "topics": ["3.2.1-enlaceQuimico"], "ch": "qui-Q02",
        "t": "Diferencia de Electronegatividad y Tipo de Enlace",
        "prompt": "Cuando dos átomos se unen con una gran diferencia de electronegatividad ($\\Delta EN \\ge 1.7$), como el sodio ($\\text{Na}$) y el cloro ($\\text{Cl}$), el enlace formado es predominantemente:",
        "opts": [
            "Iónico, por transferencia de electrones del metal al no metal formando iones.",
            "Covalente apolar, por compartición equitativa de pares electrónicos.",
            "Metálico, con electrones deslocalizados en una red tridimensional.",
            "Puente de hidrógeno intermolecular."
        ],
        "ans": 0,
        "exp": "**Paso 1. Definición:** Una diferencia de electronegatividad $\\Delta EN \\ge 1.7$ produce transferencia neta de electrones, formando cationes y aniones unidos por atracción electrostática (enlace iónico).\n**Respuesta correcta: A.**",
        "maths": ["\\Delta EN \\ge 1.7 \\implies \\text{Enlace Iónico}"], "imgs": []
    },
    # 55: Configuración Anión Sulfuro S2-
    {
        "id": "qui-19ago-35", "s": "qui", "n": 35, "d": "intermedio", "topics": ["3.1.2-configuracion"], "ch": "qui-Q01",
        "t": "Configuración Electrónica de Iones",
        "prompt": "La configuración electrónica correcta del anión sulfuro ($^{32}_{16}\\text{S}^{2-}$) es:",
        "opts": [
            "$1s^2 2s^2 2p^6 3s^2 3p^6$ (isoelectrónico con el gas noble Argón)",
            "$1s^2 2s^2 2p^6 3s^2 3p^2$",
            "$1s^2 2s^2 2p^6 3s^2 3d^2$",
            "$1s^2 2s^2 2p^6 3s^1 3p^5$"
        ],
        "ans": 0,
        "exp": "**Paso 1. Electrones:** El azufre neutro tiene 16 electrones. Al ganar 2 electrones ($\text{S}^{2-}$), tiene 18 electrones.\n**Paso 2. Configuración:** $1s^2 2s^2 2p^6 3s^2 3p^6 = [\\text{Ar}]$.\n**Respuesta correcta: A.**",
        "maths": ["16 + 2 = 18 e^- \\implies [\\text{Ar}]"], "imgs": []
    },
    # 56: Energía de Ionización Periódica
    {
        "id": "qui-19ago-36", "s": "qui", "n": 36, "d": "intermedio", "topics": ["3.1.3-tablaPeriodica"], "ch": "qui-Q01",
        "t": "Variación de la Energía de Ionización",
        "prompt": "En la tabla periódica, la primera energía de ionización tiende a aumentar:",
        "opts": [
            "De izquierda a derecha a lo largo de un período y de abajo hacia arriba en un grupo.",
            "De derecha a izquierda en un período y de arriba hacia abajo en un grupo.",
            "Únicamente con el incremento del número de masa sin relación con la carga nuclear.",
            "En el sentido opuesto a la electronegatividad."
        ],
        "ans": 0,
        "exp": "**Paso 1. Tendencia:** La energía de ionización aumenta hacia la derecha en un período (mayor carga nuclear efectiva) y hacia arriba en un grupo (menor radio y menor apantallamiento).\n**Respuesta correcta: A.**",
        "maths": ["\\text{Energía de Ionización: } \\uparrow \\rightarrow"], "imgs": []
    },
    # 57: Ley de Lavoisier
    {
        "id": "qui-19ago-37", "s": "qui", "n": 37, "d": "intermedio", "topics": ["3.4.1-estequiometria"], "ch": "qui-Q03",
        "t": "Ley de Conservación de la Masa",
        "prompt": "De acuerdo con la Ley de Conservación de la Masa de Lavoisier, en cualquier reacción química efectuada en un sistema cerrado:",
        "opts": [
            "La masa total de los reactivos es exactamente igual a la masa total de los productos.",
            "El número de moléculas de reactivos debe ser igual al número de moléculas de productos.",
            "El volumen de los gases permanece invariable a cualquier temperatura.",
            "La masa de los productos siempre disminuye por desprendimiento de calor."
        ],
        "ans": 0,
        "exp": "**Paso 1. Principio fundamental:** En una reacción química los átomos no se crean ni se destruyen, solo se reorganizan. Por tanto, la masa total de reactivos consumidos es idéntica a la masa total de productos formados.\n**Respuesta correcta: A.**",
        "maths": ["\\sum m_{\\text{reactivos}} = \\sum m_{\\text{productos}}"], "imgs": []
    },
    # 58: Solubilidad y Polaridad
    {
        "id": "qui-19ago-38", "s": "qui", "n": 38, "d": "intermedio", "topics": ["3.2.2-fuerzasIntermoleculares"], "ch": "qui-Q02",
        "t": "Solubilidad y Regla de Semejanza",
        "prompt": "El cloruro de sodio ($\\text{NaCl}$) es altamente soluble en agua pero prácticamente insoluble en hexano ($\\text{C}_6\\text{H}_{14}$) debido a que:",
        "opts": [
            "El agua es un solvente muy polar que solvata eficazmente a los iones $\\text{Na}^+$ y $\\text{Cl}^-$, mientras que el hexano es apolar.",
            "El hexano forma enlaces iónicos con el sodio impidiendo su disolución.",
            "El agua y el hexano son solventes iónicos de igual constante dieléctrica.",
            "El $\\text{NaCl}$ es un compuesto apolar que solo se disuelve en hidrocarburos."
        ],
        "ans": 0,
        "exp": "**Paso 1. Regla de oro:** 'Lo semejante disuelve a lo semejante'.\n**Paso 2. Interacciones:** El agua polar genera fuertes atracciones ion-dipolo que separan la red cristalina del $\\text{NaCl}$. El hexano apolar no puede romper estas atracciones electrostáticas.\n**Respuesta correcta: A.**",
        "maths": ["\\text{Ion-Dipolo en } \\text{H}_2\\text{O}"], "imgs": []
    },
    # 59: Afinidad Electrónica Periódica
    {
        "id": "qui-19ago-39", "s": "qui", "n": 39, "d": "intermedio", "topics": ["3.1.3-tablaPeriodica"], "ch": "qui-Q01",
        "t": "Afinidad Electrónica y No Metales",
        "prompt": "Los elementos no metálicos del bloque $p$ (como el flúor y el cloro) presentan afinidades electrónicas altamente exotérmicas porque:",
        "opts": [
            "Tienen alta carga nuclear efectiva y les falta un solo electrón para completar su octeto estable.",
            "Tienen radios atómicos gigantescos que atraen cationes.",
            "Ceden fácilmente electrones para formar cationes alcalinos.",
            "Poseen subniveles $d$ completamente vacíos en el núcleo."
        ],
        "ans": 0,
        "exp": "**Paso 1. Estabilidad:** Con configuración de valencia $ns^2 np^5$, la ganancia de $1e^-$ les permite alcanzar la configuración de gas noble ($ns^2 np^6$) liberando gran cantidad de energía.\n**Respuesta correcta: A.**",
        "maths": ["ns^2 np^5 + 1e^- \\to ns^2 np^6"], "imgs": []
    },
    # 60: Fórmula Empírica a Molecular
    {
        "id": "qui-19ago-40", "s": "qui", "n": 40, "d": "intermedio", "topics": ["3.4.1-estequiometria"], "ch": "qui-Q03",
        "t": "Fórmula Empírica y Molecular",
        "prompt": "Un compuesto tiene fórmula empírica $\\text{CH}_2$ ($M_{\\text{emp}} = 14\\text{ g/mol}$) y su masa molar experimental es $42\\text{ g/mol}$. Su fórmula molecular es:",
        "opts": [
            "$\\text{C}_3\\text{H}_6$",
            "$\\text{CH}_4$",
            "$\\text{C}_2\\text{H}_4$",
            "$\\text{C}_4\\text{H}_8$"
        ],
        "ans": 0,
        "exp": "**Paso 1. Factor:** $k = \\frac{M_{\\text{molecular}}}{M_{\\text{emp}}} = \\frac{42}{14} = 3$.\n**Paso 2. Multiplicación:** $(\\text{CH}_2) \\times 3 = \\text{C}_3\\text{H}_6$ (propeno o ciclopropano).\n**Respuesta correcta: A.**",
        "maths": ["k = \\frac{42}{14} = 3 \\implies \\text{C}_3\\text{H}_6"], "imgs": []
    }
]

# Assemble final complete bank:
final_bank = {
    "len": intento1_len + intento2_len,
    "fis": intento1_fis + intento2_fis,
    "qui": intento1_qui + intento2_qui
}

with open('guia-bank-fql-19ago.js', 'w', encoding='utf-8') as f:
    f.write('window.GUIA_BANK_FQL_19AGO = ' + json.dumps(final_bank, indent=2, ensure_ascii=False) + ';\n')

print("Successfully written final curated guia-bank-fql-19ago.js!")
print(f"Total Lenguaje: {len(final_bank['len'])} (Intento 1: 20, Intento 2: 20)")
print(f"Total Física: {len(final_bank['fis'])} (Intento 1: 20, Intento 2: 20 [17 Teóricas / 3 Cálculos])")
print(f"Total Química: {len(final_bank['qui'])} (Intento 1: 20, Intento 2: 20)")
