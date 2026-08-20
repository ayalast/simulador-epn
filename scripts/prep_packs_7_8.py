import sys

pack7_code = '''    {
        "pack_id": "len-19-p7",
        "reading": "La transición global hacia matrices energéticas descarbonizadas depende de manera crítica del desarrollo de sistemas de almacenamiento masivo y eficiente. Dado que las fuentes renovables predominantes, como la solar fotovoltaica y la eólica, son intrínsecamente intermitentes y fluctúan según los ciclos meteorológicos, la estabilidad de las redes eléctricas modernas exige baterías electroquímicas de alta densidad energética. En este escenario, la tecnología de ion de litio domina el mercado automotriz y estacionario; sin embargo, los desafíos vinculados con la escasez geopolítica de materias primas (como cobalto y litio) y los límites termodinámicos de degradación han impulsado la investigación de alternativas como el sodio, el vanadio y el vector hidrógeno verde. Por consiguiente, la verdadera sostenibilidad energética no consistirá únicamente en generar electricidad limpia, sino en diversificar los mecanismos de almacenamiento y reciclaje para no sustituir una dependencia fósil por una vulnerabilidad mineral.",
        "questions": [
            {
                "prompt": "¿Cuál es la tesis fundamental que defiende el autor en el texto?",
                "opts": [
                    "La sostenibilidad energética exige diversificar los sistemas de almacenamiento y reciclaje más allá del litio para evitar nuevas dependencias minerales frente a la intermitencia renovable.",
                    "Las fuentes solares y eólicas deben clausurarse definitivamente por su excesiva dependencia de los ciclos meteorológicos.",
                    "El hidrógeno verde es un compuesto fósil altamente tóxico que destruye las redes eléctricas contemporáneas.",
                    "Las baterías de ion de litio son infinitamente reciclables y carecen de cualquier impacto ambiental o geopolítico."
                ],
                "ans": 0,
                "topics": ["4.4.2-analisisTexto"],
                "ch": "len-L05",
                "t": "Tesis Central",
                "exp": "**Paso 1. Identificación de la tesis:** El autor expone que la energía limpia solar y eólica es intermitente y requiere almacenamiento, pero advierte que depender solo del litio traslada el problema a una vulnerabilidad mineral; por ende, se debe diversificar.\\n**Paso 2. Análisis del cierre:** La última oración sintetiza la postura: no sustituir una dependencia fósil por una mineral.\\n**Paso 3. Conclusión:** La opción A recoge la tesis íntegra.\\n**Respuesta correcta: A.**"
            },
            {
                "prompt": "En el texto, la palabra «intermitentes» referida a las fuentes renovables denota que:",
                "opts": [
                    "Se interrumpen y reanudan continuamente según las condiciones climáticas y la hora del día.",
                    "Producen un flujo de corriente continuo y perfectamente idéntico durante las 24 horas.",
                    "Son completamente inútiles para alimentar motores eléctricos o ciudades industriales.",
                    "Generan descargas eléctricas de alto voltaje destructivas para los transformadores."
                ],
                "ans": 0,
                "topics": ["4.4.2-lecturaCritica"],
                "ch": "len-L06",
                "t": "Léxico en Contexto",
                "exp": "**Paso 1. Análisis contextual:** El texto asocia 'intermitentes' con 'fluctúan según los ciclos meteorológicos' (hay sol solo de día, viento variable).\\n**Paso 2. Significado preciso:** Intermitente es lo que no es continuo, que cesa y vuelve a comenzar por intervalos.\\n**Paso 3. Conclusión:** La opción A expresa la definición contextual exacta.\\n**Respuesta correcta: A.**"
            },
            {
                "prompt": "¿Cuál es el conector discursivo que introduce la advertencia sobre los límites del litio frente a su dominio de mercado?",
                "opts": [
                    "sin embargo",
                    "por consiguiente",
                    "dado que",
                    "como"
                ],
                "ans": 0,
                "topics": ["4.4.3-constrParrafo"],
                "ch": "len-L07",
                "t": "Conectores de Oposición",
                "exp": "**Paso 1. Función requerida:** Introducir un contraste u objeción contra la idea previa de dominio comercial.\\n**Paso 2. Verificación en el texto:** '...domina el mercado automotriz; sin embargo, los desafíos vinculados con la escasez...'.\\n**Paso 3. Conclusión:** 'Sin embargo' actúa como conector adversativo u opositivo.\\n**Respuesta correcta: A.**"
            },
            {
                "prompt": "¿Qué afirmación CONTRADICE los argumentos expresados por el emisor?",
                "opts": [
                    "La generación exclusiva de paneles solares es suficiente para abastecer de forma continua a una red sin requerir ningún sistema de almacenamiento.",
                    "La tecnología de ion de litio enfrenta límites relacionados con la degradación termodinámica.",
                    "El sodio, el vanadio y el hidrógeno verde constituyen vías alternativas de investigación energética.",
                    "La disponibilidad de cobalto y litio presenta desafíos geopolíticos en el mercado internacional."
                ],
                "ans": 0,
                "topics": ["4.4.2-lecturaCritica"],
                "ch": "len-L06",
                "t": "Identificación de Contradicción",
                "exp": "**Paso 1. Premisa del texto:** La solar es intermitente y exige obligatoriamente almacenamiento masivo para dar estabilidad a la red.\\n**Paso 2. Detección de la oposición:** Afirmar que los paneles solares solos bastan sin almacenamiento contradice frontalmente la tesis central del autor.\\n**Paso 3. Conclusión:** La opción A es la proposición contradictoria.\\n**Respuesta correcta: A.**"
            },
            {
                "prompt": "¿Qué se INFIERE válidamente sobre el futuro de las redes eléctricas sostenibles a partir del texto?",
                "opts": [
                    "Un sistema eléctrico robusto combinará múltiples tecnologías químicas y físicas de almacenamiento adaptadas a diferentes escalas.",
                    "Los combustibles fósiles volverán a ser la única fuente de energía tolerada en los países desarrollados.",
                    "Las baterías de litio dejarán de fabricarse en menos de veinticuatro horas en todo el planeta.",
                    "La energía solar solo puede utilizarse en regiones polares durante el solsticio de invierno."
                ],
                "ans": 0,
                "topics": ["4.4.2-razLogico"],
                "ch": "len-L04",
                "t": "Inferencia Lógica",
                "exp": "**Paso 1. Premisas del texto:** Ninguna tecnología única resuelve todo sin riesgos de escasez mineral o degradación; se investigan sodio, vanadio e hidrógeno.\\n**Paso 2. Inferencia válida:** El futuro demandará una matriz diversificada y complementaria de almacenamiento, no una solución monomaterial.\\n**Paso 3. Conclusión:** La opción A es la inferencia lógica directa.\\n**Respuesta correcta: A.**"
            }
        ]
    },
    {
        "pack_id": "len-19-p8",
        "reading": "El sesgo de confirmación constituye una de las distorsiones cognitivas más arraigadas en la psicología del razonamiento humano. Descrito sistemáticamente por Peter Wason, consiste en la tendencia involuntaria a buscar, interpretar, favorecer y recordar aquella información que respalda las creencias o hipótesis previas, al tiempo que se desestima o se somete a un escrutinio hipercrítico la evidencia que las refuta. En los entornos digitales contemporáneos, este fenómeno se ve exponencialmente amplificado por los algoritmos de recomendación en redes sociales, los cuales crean cámaras de eco personalizadas que aíslan al usuario de puntos de vista divergentes. Por este motivo, el entrenamiento sistemático en el método científico y en la lógica proposicional resulta indispensable para cultivar un pensamiento crítico capaz de cuestionar las propias convicciones y contrastarlas con hechos verificables.",
        "questions": [
            {
                "prompt": "¿Cuál es la idea principal que articula el texto?",
                "opts": [
                    "El sesgo de confirmación distorsiona la evaluación objetiva de evidencias, amplificándose en entornos digitales y exigiendo formación científica para su mitigación.",
                    "Peter Wason demostró que los seres humanos son máquinas lógicas infalibles inmunes a cualquier error cognitivo.",
                    "Los algoritmos de redes sociales fueron diseñados para enseñar lógica proposicional y método científico a la población.",
                    "Las creencias previas de una persona siempre coinciden de forma exacta con la verdad empírica universal."
                ],
                "ans": 0,
                "topics": ["4.4.2-analisisTexto"],
                "ch": "len-L05",
                "t": "Idea Central",
                "exp": "**Paso 1. Tema central:** Definición del sesgo de confirmación (buscar lo que coincide, descartar lo opuesto).\\n**Paso 2. Problemática y propuesta:** Se agrava con las cámaras de eco en redes y se combate con formación en método científico y pensamiento crítico.\\n**Paso 3. Conclusión:** La opción A sintetiza fielmente el texto.\\n**Respuesta correcta: A.**"
            },
            {
                "prompt": "En el contexto del segundo enunciado, ¿qué significa «desestimar» una evidencia refutatoria?",
                "opts": [
                    "Rechazarla, restarle valor o no tomarla en cuenta por contradecir la postura inicial.",
                    "Analizarla minuciosamente en un laboratorio bajo el microscopio electrónico.",
                    "Publicarla en revistas internacionales con máxima difusión académica.",
                    "Memorizarla para recitarla en conferencias públicas de debate."
                ],
                "ans": 0,
                "topics": ["4.4.2-lecturaCritica"],
                "ch": "len-L06",
                "t": "Semántica Contextual",
                "exp": "**Paso 1. Análisis del término:** '...se desestima o se somete a un escrutinio hipercrítico...'.\\n**Paso 2. Significado léxico:** Desestimar significa descartar, no hacer caso o tener en poco valor.\\n**Paso 3. Conclusión:** Significa rechazarla o restarle valor.\\n**Respuesta correcta: A.**"
            },
            {
                "prompt": "La expresión «cámaras de eco» se utiliza en el texto como un recurso retórico de tipo:",
                "opts": [
                    "Metáfora para ilustrar entornos donde solo resuenan y se retroalimentan las mismas opiniones.",
                    "Hipérbole numérica que cuantifica el precio en dólares de los servidores informáticos.",
                    "Pleonasmo redundante que repite innecesariamente la palabra sonido.",
                    "Onomatopeya que imita acústicamente el eco en una cueva de montaña."
                ],
                "ans": 0,
                "topics": ["4.4.2-analisisTexto"],
                "ch": "len-L05",
                "t": "Figuras Retóricas y Metáforas",
                "exp": "**Paso 1. Identificación del tropo:** 'Cámaras de eco' traslada el concepto acústico del sonido que rebota en una habitación cerrada al ámbito social y digital.\\n**Paso 2. Función metafórica:** Describe cómo las opiniones homogéneas se amplifican sin entrada de ideas externas.\\n**Paso 3. Conclusión:** Es una metáfora explicativa.\\n**Respuesta correcta: A.**"
            },
            {
                "prompt": "¿Qué función sintáctica y discursiva cumple el conector «Por este motivo» en la última frase?",
                "opts": [
                    "Introducir la consecuencia o solución práctica derivada del diagnóstico previo.",
                    "Presentar una duda filosófica que anula la credibilidad de Peter Wason.",
                    "Enumerar cronológicamente los siglos de la Edad Media.",
                    "Formular una pregunta retórica dirigida a los ingenieros de software."
                ],
                "ans": 0,
                "topics": ["4.4.3-constrParrafo"],
                "ch": "len-L07",
                "t": "Conectores Consecutivos",
                "exp": "**Paso 1. Análisis del conector:** 'Por este motivo' conecta causalmente el problema (sesgo amplificado en redes) con la necesidad de entrenar el pensamiento crítico.\\n**Paso 2. Función lógica:** Introduce la consecuencia propositiva.\\n**Paso 3. Conclusión:** Introduce la consecuencia o solución práctica.\\n**Respuesta correcta: A.**"
            },
            {
                "prompt": "¿Cuál de las siguientes conclusiones se DEDUCE válidamente del pasaje?",
                "opts": [
                    "Someter una idea propia a pruebas deliberadas de refutación es una manifestación de pensamiento crítico riguroso.",
                    "Las redes sociales garantizan automáticamente que los ciudadanos desarrollen un criterio imparcial.",
                    "Los seres humanos recuerdan con mayor facilidad los datos que demuestran que estaban equivocados.",
                    "El sesgo de confirmación desaparece espontáneamente sin necesidad de ningún entrenamiento educativo."
                ],
                "ans": 0,
                "topics": ["4.4.2-razLogico"],
                "ch": "len-L04",
                "t": "Deducción Lógica",
                "exp": "**Paso 1. Premisa del texto:** El pensamiento crítico contrasta las propias convicciones con evidencias y hechos verificables frente a la tendencia del sesgo.\\n**Paso 2. Deducción lógica:** Si el sesgo busca solo confirmar, el pensamiento riguroso busca activamente poner a prueba y refutar hipótesis.\\n**Paso 3. Conclusión:** La opción A es la deducción válida.\\n**Respuesta correcta: A.**"
            }
        ]
    }'''

print("Pack 7 and 8 ready.")
