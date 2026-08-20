/* Banco Integral de Estudio EPN Día 2 — Notebook Theme */
window.STUDY_DATA = {
  topics: [
  {
    "id": "movimiento",
    "subject": "fisica",
    "unit": "Movimiento",
    "priority": "Esencial",
    "eyebrow": "01 · Cinemática",
    "title": "Convierte el recorrido en una ecuación",
    "lead": "Antes de usar una fórmula, identifica si el movimiento es uniforme, acelerado o una combinación de ambos. La unidad coherente es la mitad de la respuesta.",
    "quickRule": "Si la dirección cambia, la velocidad cambia; por eso puede haber aceleración aunque la rapidez sea constante.",
    "formula": "\\begin{aligned}v&=\\frac{\\Delta x}{\\Delta t}\\\\a&=\\frac{\\Delta v}{\\Delta t}\\\\x&=x_0+v_0t+\\tfrac12at^2\\end{aligned}",
    "variables": [
      "x: posición (m)",
      "v: velocidad (m/s)",
      "a: aceleración (m/s²)",
      "t: tiempo (s)"
    ],
    "sections": [
      {
        "heading": "Distancia no es desplazamiento",
        "body": "La distancia es todo lo que recorres y siempre es positiva. El desplazamiento es la diferencia entre la posición final e inicial; incluye dirección y puede ser cero aunque hayas caminado.",
        "bullets": [
          "MRU: velocidad constante, aceleración cero.",
          "MRUV: aceleración constante.",
          "En una gráfica v–t, el área representa desplazamiento."
        ]
      },
      {
        "heading": "Caída libre y tiro vertical",
        "body": "Sin aire, la aceleración siempre apunta hacia abajo y vale g. En el punto más alto de un tiro vertical, la velocidad instantánea es cero, pero la aceleración no desaparece.",
        "bullets": [
          "Usa g = 10 m/s² si el ejercicio lo indica o no proporciona otro valor.",
          "En caída desde reposo: d = ½gt².",
          "Al volver a la misma altura, el módulo de la velocidad es el mismo que al salir."
        ]
      }
    ],
    "examNote": "No escribas la ecuación antes de fijar el eje positivo. Si tomas arriba como positivo, g es negativa.",
    "example": {
      "prompt": "Una piedra se lanza verticalmente hacia arriba con 20 m/s. Usa g = 10 m/s². ¿Cuánto tarda en llegar al punto más alto?",
      "steps": [
        "En el máximo, v = 0.",
        "0 = 20 − 10t.",
        "t = 2 s."
      ],
      "result": "Llega al punto más alto en 2 s."
    }
  },
  {
    "id": "fuerzas",
    "subject": "fisica",
    "unit": "Fuerzas",
    "priority": "Esencial",
    "eyebrow": "02 · Newton",
    "title": "Dibuja las fuerzas antes de calcular",
    "lead": "La segunda ley de Newton conecta lo que actúa sobre un cuerpo con el cambio de su movimiento. El diagrama de cuerpo libre evita errores de signo y de sentido.",
    "quickRule": "Fuerza neta cero no significa que no existan fuerzas: significa que se equilibran.",
    "formula": "\\sum F = ma\\qquad P=mg\\qquad f_k=\\mu_kN",
    "variables": [
      "F: fuerza (N)",
      "m: masa (kg)",
      "a: aceleración (m/s²)",
      "N: normal (N)"
    ],
    "sections": [
      {
        "heading": "Las tres ideas que se repiten",
        "body": "La inercia no es una fuerza. La fuerza neta produce aceleración. Acción y reacción tienen igual magnitud y sentidos opuestos, pero actúan sobre cuerpos diferentes.",
        "bullets": [
          "Peso: siempre apunta hacia abajo.",
          "Normal: es perpendicular a la superficie.",
          "Rozamiento: se opone al deslizamiento o a su tendencia."
        ]
      },
      {
        "heading": "Equilibrio",
        "body": "Un objeto en reposo o con velocidad constante tiene fuerza neta cero. Separa las fuerzas horizontales y verticales antes de sumar.",
        "bullets": [
          "ΣFx = 0 y ΣFy = 0 en equilibrio.",
          "En un plano inclinado: mg senθ va paralelo al plano y mg cosθ es perpendicular."
        ]
      }
    ],
    "examNote": "Nunca dibujes 'la fuerza de la aceleración'. Dibuja solo interacciones reales: peso, normal, tensión, rozamiento y fuerza aplicada.",
    "example": {
      "prompt": "Una caja de 5 kg recibe una fuerza horizontal neta de 20 N. ¿Cuál es su aceleración?",
      "steps": [
        "Aplica ΣF = ma.",
        "a = 20/5.",
        "a = 4 m/s²."
      ],
      "result": "La aceleración es 4 m/s²."
    }
  },
  {
    "id": "energia",
    "subject": "fisica",
    "unit": "Energía",
    "priority": "Esencial",
    "eyebrow": "03 · Trabajo y energía",
    "title": "Sigue la transformación, no memorices el dibujo",
    "lead": "Cuando no te preguntan por el tiempo sino por rapidez, altura o una conversión de energía, la conservación de energía suele ser el camino más corto.",
    "quickRule": "En un péndulo, la energía cinética es máxima en el punto más bajo porque la rapidez es máxima.",
    "formula": "K=\\tfrac12mv^2\\qquad U_g=mgh\\qquad U_e=\\tfrac12kx^2\\qquad W=Fd\\cos\\theta",
    "variables": [
      "K: energía cinética (J)",
      "Ug: potencial gravitatoria (J)",
      "Ue: potencial elástica (J)",
      "W: trabajo (J)"
    ],
    "sections": [
      {
        "heading": "Trabajo y potencia",
        "body": "El trabajo depende de la parte de la fuerza que va en la misma dirección que el desplazamiento. Si fuerza y desplazamiento son perpendiculares, el trabajo de esa fuerza es cero.",
        "bullets": [
          "Potencia: P = W/t.",
          "Para elevar con rapidez constante: P = mgv.",
          "La unidad de energía y trabajo es el joule."
        ]
      },
      {
        "heading": "Conservación",
        "body": "Si no hay rozamiento ni otra fuerza no conservativa, la energía mecánica se conserva. Una energía puede cambiar de forma, pero no aparece desde nada.",
        "bullets": [
          "Arco tensado: energía elástica → cinética de la flecha.",
          "Caída: potencial gravitatoria → cinética.",
          "Con rozamiento: parte de la energía mecánica se disipa como energía térmica."
        ]
      }
    ],
    "examNote": "No uses conservación de energía mecánica sin revisar si el rozamiento hace trabajo. Si existe, agrega su trabajo con signo negativo.",
    "example": {
      "prompt": "Un objeto de 2 kg está a 5 m de altura. Usa g = 10 m/s². ¿Cuál es su energía potencial?",
      "steps": [
        "Usa Ug = mgh.",
        "Ug = 2 × 10 × 5.",
        "Ug = 100 J."
      ],
      "result": "Tiene 100 J de energía potencial gravitatoria."
    }
  },
  {
    "id": "momento",
    "subject": "fisica",
    "unit": "Choques",
    "priority": "Muy rentable",
    "eyebrow": "04 · Impulso",
    "title": "Mide el cambio de movimiento",
    "lead": "El impulso es el efecto de una fuerza actuando durante un tiempo. En choques, el momento lineal total se conserva si el sistema está aislado.",
    "quickRule": "En un choque inelástico puede conservarse el momento, aunque no se conserve la energía cinética.",
    "formula": "p=mv\\qquad J=F\\Delta t=\\Delta p\\qquad \\sum p_i=\\sum p_f",
    "variables": [
      "p: momento (kg·m/s)",
      "J: impulso (N·s)",
      "F: fuerza (N)",
      "Δt: intervalo (s)"
    ],
    "sections": [
      {
        "heading": "Impulso",
        "body": "Una misma variación de momento puede producirse con una fuerza grande durante poco tiempo o con una fuerza menor durante más tiempo. Por eso airbags y colchonetas aumentan el tiempo de frenado.",
        "bullets": [
          "El área bajo una gráfica F–t es impulso.",
          "N·s y kg·m/s son unidades equivalentes."
        ]
      },
      {
        "heading": "Choques",
        "body": "Define el sistema y conserva el momento total en cada dirección. Si los objetos quedan unidos, ambos comparten la misma velocidad final.",
        "bullets": [
          "Elige una dirección positiva y respétala.",
          "Usa signos para velocidades contrarias."
        ]
      }
    ],
    "examNote": "Si el objeto parte desde reposo, el momento inicial es cero; eso simplifica mucho la ecuación.",
    "example": {
      "prompt": "Una fuerza de 10 N actúa durante 0,4 s sobre un objeto inicialmente en reposo. ¿Cuál es el impulso?",
      "steps": [
        "J = FΔt.",
        "J = 10 × 0,4.",
        "J = 4 N·s."
      ],
      "result": "El impulso es 4 N·s."
    }
  },
  {
    "id": "oxidacion",
    "subject": "quimica",
    "unit": "Nomenclatura",
    "priority": "Esencial",
    "eyebrow": "01 · Cargas y nombres",
    "title": "Haz que la suma de cargas cierre",
    "lead": "Los números de oxidación te permiten nombrar compuestos, verificar fórmulas y distinguir óxidos de peróxidos. La regla final siempre es la misma: la suma debe coincidir con la carga total.",
    "quickRule": "En FeCl₃, cada Cl vale −1: el hierro tiene que valer +3. Su nombre Stock es cloruro de hierro (III).",
    "formula": "\\sum(\\text{Nox})=0\\quad\\text{en un compuesto neutro}",
    "variables": [
      "Nox: número de oxidación",
      "La suma de Nox = carga total",
      "Los romanos señalan el Nox del metal"
    ],
    "sections": [
      {
        "heading": "Valores que debes reconocer",
        "body": "Los metales de los grupos 1 y 2 son predecibles. Oxígeno e hidrógeno tienen reglas frecuentes, con excepciones que conviene identificar.",
        "bullets": [
          "Grupo 1: +1; grupo 2: +2; Al: +3.",
          "O normalmente −2; en peróxidos, −1.",
          "H normalmente +1; en hidruros metálicos, −1.",
          "F siempre −1 en compuestos habituales."
        ]
      },
      {
        "heading": "Stock y formulación",
        "body": "En la nomenclatura Stock escribe el anión y luego el metal con su número romano si puede variar. Para formular, usa las cargas de catión y anión hasta neutralizar el compuesto.",
        "bullets": [
          "FeCl₂: cloruro de hierro (II).",
          "FeCl₃: cloruro de hierro (III).",
          "K₂Cr₂O₇: dicromato de potasio.",
          "Na₂O₂: peróxido de sodio; el anión es O₂²⁻."
        ]
      }
    ],
    "examNote": "No balancees una fórmula cambiando los subíndices por intuición. Comprueba siempre la carga total final.",
    "example": {
      "prompt": "Halla el Nox del Cr en K₂Cr₂O₇.",
      "steps": [
        "K aporta 2(+1) y O aporta 7(−2).",
        "2 + 2x − 14 = 0.",
        "2x = 12; x = +6."
      ],
      "result": "Cada Cr tiene número de oxidación +6."
    }
  },
  {
    "id": "atomo",
    "subject": "quimica",
    "unit": "Átomo y enlace",
    "priority": "Muy rentable",
    "eyebrow": "02 · Electrones",
    "title": "Cuenta protones, neutrones y electrones sin perder el signo",
    "lead": "El número atómico identifica al elemento. Cuando aparece un ion, la carga solo cambia el número de electrones; los protones no cambian.",
    "quickRule": "Un catión perdió electrones; un anión ganó electrones.",
    "formula": "A=Z+n\\qquad e^- = Z-\\text{carga}",
    "variables": [
      "A: número másico",
      "Z: número atómico = protones",
      "n: neutrones",
      "e⁻: electrones"
    ],
    "sections": [
      {
        "heading": "Configuración electrónica",
        "body": "Los electrones llenan orbitales siguiendo un orden. Para iones de metales de transición, retira primero los electrones del nivel 4s antes de los 3d.",
        "bullets": [
          "Orden inicial: 1s, 2s, 2p, 3s, 3p, 4s, 3d.",
          "Fe: [Ar] 4s²3d⁶.",
          "Fe²⁺: [Ar]3d⁶."
        ]
      },
      {
        "heading": "Tendencias",
        "body": "Hacia la derecha de un período suele disminuir el radio y aumentar la electronegatividad. Hacia abajo de un grupo suele aumentar el radio.",
        "bullets": [
          "Los isótopos comparten Z, pero no A.",
          "En especies isoelectrónicas, más protones suelen implicar radio más pequeño."
        ]
      }
    ],
    "examNote": "El signo del ion funciona como una cuenta: Na⁺ tiene un electrón menos que Na; Cl⁻ tiene uno más que Cl.",
    "example": {
      "prompt": "¿Cuántos electrones tiene Fe²⁺ si Z = 26?",
      "steps": [
        "Fe neutro tiene 26 electrones.",
        "La carga +2 indica que perdió 2.",
        "26 − 2 = 24."
      ],
      "result": "Fe²⁺ tiene 24 electrones."
    }
  },
  {
    "id": "enlace",
    "subject": "quimica",
    "unit": "Lewis y geometría",
    "priority": "Muy rentable",
    "eyebrow": "03 · Estructura",
    "title": "La forma decide la polaridad",
    "lead": "No basta saber que un enlace es polar: debes mirar la geometría completa para decidir si los dipolos se cancelan o no.",
    "quickRule": "CO₂ tiene enlaces polares, pero la molécula es apolar porque es lineal y simétrica.",
    "formula": "\\text{electrones de valencia}=\\sum(\\text{valencias})\\pm\\text{carga}",
    "variables": [
      "Par libre: pareja de electrones no enlazante",
      "Dipolo: separación de carga",
      "VSEPR: repulsión de pares electrónicos"
    ],
    "sections": [
      {
        "heading": "Lewis sin saltos",
        "body": "Cuenta electrones de valencia, decide el átomo central, une con enlaces simples, completa octetos externos y usa pares o enlaces múltiples para completar el centro.",
        "bullets": [
          "Suma electrones para un anión.",
          "Resta electrones para un catión.",
          "H nunca es átomo central."
        ]
      },
      {
        "heading": "Formas frecuentes",
        "body": "Las regiones electrónicas se repelen y generan geometrías conocidas. Los pares libres modifican la forma molecular visible.",
        "bullets": [
          "2 regiones: lineal (CO₂).",
          "3 regiones: trigonal plana (BF₃).",
          "4 regiones: tetraédrica (CH₄), piramidal (NH₃) o angular (H₂O).",
          "H₂O es polar; CO₂ es apolar."
        ]
      }
    ],
    "examNote": "No confundas geometría electrónica con geometría molecular: los pares libres cuentan para la primera, aunque no se vean como átomos.",
    "example": {
      "prompt": "¿Por qué H₂O es polar?",
      "steps": [
        "El oxígeno tiene dos pares libres.",
        "La forma molecular es angular.",
        "Los dipolos O–H no se cancelan."
      ],
      "result": "H₂O presenta un dipolo neto y es polar."
    }
  },
  {
    "id": "estequiometria",
    "subject": "quimica",
    "unit": "Mol y reacciones",
    "priority": "Esencial",
    "eyebrow": "04 · Cantidad de sustancia",
    "title": "De gramos a moles; de moles a respuesta",
    "lead": "La ecuación balanceada da proporciones en moles. Siempre transforma el dato a moles antes de buscar masa, volumen o número de partículas.",
    "quickRule": "Los coeficientes son relaciones molares; los subíndices pertenecen a la sustancia y no se cambian al balancear.",
    "formula": "n=\\frac{m}{M}\\qquad N=nN_A\\qquad \\%R=\\frac{R_\\text{real}}{R_\\text{teórico}}\\times100",
    "variables": [
      "n: moles",
      "m: masa (g)",
      "M: masa molar (g/mol)",
      "NA: 6,022×10²³"
    ],
    "sections": [
      {
        "heading": "El procedimiento universal",
        "body": "Balancea, convierte a moles, aplica la relación de coeficientes y vuelve a la unidad que pide el ejercicio. Este orden protege contra la mayoría de errores.",
        "bullets": [
          "Nunca cambies subíndices para balancear.",
          "En CNPT, 1 mol de gas suele ocupar 22,4 L cuando el ejercicio lo permite.",
          "Molaridad = moles de soluto / litros de solución."
        ]
      },
      {
        "heading": "Reactivo limitante",
        "body": "Con dos reactivos, calcula cuánto producto podría formar cada uno. El que forma menos producto es el limitante y decide el resultado máximo.",
        "bullets": [
          "Divide los moles disponibles por su coeficiente: el menor cociente limita.",
          "El otro reactivo queda en exceso.",
          "Rendimiento porcentual compara lo real con lo teórico."
        ]
      }
    ],
    "examNote": "Si el problema da gramos de un reactivo y pregunta gramos de producto, debes pasar por moles dos veces: gramos → moles → gramos.",
    "example": {
      "prompt": "2Mg + O₂ → 2MgO. Si reaccionan 72 g de Mg, ¿cuántos g de MgO se forman? M(Mg)=24, M(MgO)=40.",
      "steps": [
        "72/24 = 3 mol de Mg.",
        "La razón Mg:MgO es 1:1, entonces se forman 3 mol MgO.",
        "3 × 40 = 120 g."
      ],
      "result": "Se forman 120 g de MgO."
    }
  },
  {
    "id": "proyectiles",
    "subject": "fisica",
    "unit": "Movimiento en dos dimensiones",
    "priority": "Muy rentable",
    "eyebrow": "05 · Proyectiles y gravedad",
    "title": "Separa horizontal y vertical: son dos movimientos",
    "lead": "Un lanzamiento oblicuo parece una sola trayectoria, pero se resuelve como MRU horizontal y caída libre vertical. Comparten el mismo tiempo, no la misma aceleración.",
    "quickRule": "Sin aire, la gravedad solo acelera verticalmente; en x la velocidad permanece constante.",
    "formula": "v_{0x}=v_0cos\\thetaqquad v_{0y}=v_0sin\\theta\\\\x=v_{0x}tqquad y=v_{0y}t-\tfrac12gt^2",
    "variables": [
      "v₀x: componente horizontal",
      "v₀y: componente vertical",
      "g: 9,8 o 10 m/s²",
      "θ: ángulo de lanzamiento"
    ],
    "sections": [
      {
        "heading": "La separación que resuelve el problema",
        "body": "Primero descompón la velocidad inicial. Después usa las ecuaciones de x y de y por separado. La única conexión entre ambos ejes es el tiempo t.",
        "bullets": [
          "Horizontal: aₓ = 0, por tanto vₓ constante.",
          "Vertical: aᵧ = −g si eliges arriba como positivo.",
          "En el punto más alto, vᵧ = 0 pero vₓ sigue existiendo."
        ]
      },
      {
        "heading": "Órbita y gravedad",
        "body": "Un satélite está continuamente cayendo hacia la Tierra, pero su velocidad lateral hace que siga rodeándola. La gravedad disminuye con el cuadrado de la distancia al centro del planeta.",
        "bullets": [
          "F = G Mm/r² y g = GM/r².",
          "Duplicar r hace que g valga la cuarta parte.",
          "En una trayectoria simétrica que termina a la misma altura, subida y bajada tardan lo mismo."
        ]
      }
    ],
    "examNote": "No uses v₀ completa en una ecuación de un eje. Usa v₀x o v₀y según corresponda.",
    "example": {
      "prompt": "Se lanza una pelota a 20 m/s con 30° respecto de la horizontal. sen30°=0,5 y cos30°≈0,866. Halla sus componentes iniciales.",
      "steps": [
        "v₀x = 20 cos30° ≈ 20(0,866).",
        "v₀y = 20 sen30° = 20(0,5).",
        "v₀x≈17,3 m/s y v₀y=10 m/s."
      ],
      "result": "La velocidad se separa en 17,3 m/s horizontal y 10 m/s vertical."
    }
  },
  {
    "id": "circular",
    "subject": "fisica",
    "unit": "Movimiento circular",
    "priority": "Repaso",
    "eyebrow": "06 · Curvas",
    "title": "Cambiar dirección también es acelerar",
    "lead": "En movimiento circular uniforme la rapidez es constante, pero la velocidad no: el vector velocidad cambia continuamente de dirección. Por eso existe una fuerza neta hacia el centro.",
    "quickRule": "La aceleración y la fuerza centrípeta apuntan al centro; la velocidad es tangente al círculo.",
    "formula": "a_c=\frac{v^2}{r}=omega^2rqquad F_c=m\frac{v^2}{r}qquad v=\frac{2\\pi r}{T}",
    "variables": [
      "aᶜ: aceleración centrípeta",
      "r: radio (m)",
      "T: período (s/vuelta)",
      "ω: velocidad angular"
    ],
    "sections": [
      {
        "heading": "No existe una fuerza nueva llamada centrípeta",
        "body": "‘Centrípeta’ describe el papel de la fuerza neta dirigida al centro. Esa fuerza puede ser rozamiento en una curva, tensión en una cuerda o gravedad en una órbita.",
        "bullets": [
          "La rapidez puede ser constante y aun así a ≠ 0.",
          "Si se corta la cuerda, el objeto sale en dirección tangente.",
          "Mayor velocidad exige mayor fuerza centrípeta si el radio no cambia."
        ]
      },
      {
        "heading": "Período y frecuencia",
        "body": "El período es el tiempo de una vuelta; la frecuencia es el número de vueltas por segundo. Son inversos entre sí.",
        "bullets": [
          "f = 1/T.",
          "Una vuelta completa equivale a 2π radianes.",
          "No confundas el radio con la distancia total recorrida: una vuelta mide 2πr."
        ]
      }
    ],
    "examNote": "Si te preguntan hacia dónde apunta la velocidad en una curva, responde tangente; si preguntan fuerza o aceleración, responde hacia el centro.",
    "example": {
      "prompt": "Una masa de 2 kg gira con rapidez 4 m/s en un círculo de radio 2 m. ¿Qué fuerza centrípeta requiere?",
      "steps": [
        "Fᶜ = mv²/r.",
        "Fᶜ = 2(4²)/2.",
        "Fᶜ = 16 N."
      ],
      "result": "La fuerza neta hacia el centro es 16 N."
    }
  },
  {
    "id": "unidades",
    "subject": "fisica",
    "unit": "Herramientas",
    "priority": "Esencial",
    "eyebrow": "07 · Unidades",
    "title": "Convierte con fracciones, no con memoria",
    "lead": "Muchos ejercicios correctos terminan mal por una unidad incoherente. La forma segura es multiplicar por factores que valen uno y cancelar unidades igual que si fueran números.",
    "quickRule": "En las ecuaciones del SI usa m, s, kg, N y J. Convierte antes de sustituir.",
    "formula": "72 \frac{mathrm{km}}{mathrm{h}}left(\frac{1000 mathrm{m}}{1 mathrm{km}}\right)left(\frac{1 mathrm{h}}{3600 mathrm{s}}\right)=20 \frac{mathrm{m}}{mathrm{s}}",
    "variables": [
      "1 km = 1000 m",
      "1 h = 3600 s",
      "1 N = 1 kg·m/s²",
      "1 J = 1 N·m"
    ],
    "sections": [
      {
        "heading": "El factor de conversión",
        "body": "Escribe una razón equivalente a uno de modo que la unidad que sobra se cancele. Si quieres pasar de km/h a m/s, usa 1000 m/1 km y 1 h/3600 s.",
        "bullets": [
          "Para km/h → m/s, divide entre 3,6.",
          "Para m/s → km/h, multiplica por 3,6.",
          "Revisa la unidad final antes de elegir una alternativa."
        ]
      },
      {
        "heading": "Orden de magnitud",
        "body": "Una respuesta debe tener sentido físico. Una persona corriendo a 300 m/s o una masa de 0,0002 kg para un automóvil revelan una conversión mal hecha.",
        "bullets": [
          "La velocidad de un auto urbano suele expresarse como decenas de km/h.",
          "El peso se mide en N; la masa se mide en kg.",
          "En áreas y volúmenes, el factor también se eleva al cuadrado o al cubo."
        ]
      }
    ],
    "examNote": "No conviertas solo el número: convierte y cancela las unidades en cada paso. Ellas te dicen si invertiste el factor.",
    "example": {
      "prompt": "Convierte 72 km/h a m/s.",
      "steps": [
        "72 ÷ 3,6.",
        "72 ÷ 3,6 = 20.",
        "La unidad final es m/s."
      ],
      "result": "72 km/h equivalen a 20 m/s."
    }
  },
  {
    "id": "materia",
    "subject": "quimica",
    "unit": "Fundamentos",
    "priority": "Repaso",
    "eyebrow": "05 · Materia y átomo",
    "title": "Distingue qué cambia y qué permanece",
    "lead": "Un cambio físico modifica estado, forma o tamaño; un cambio químico forma sustancias nuevas. Esta diferencia aparece desde la clasificación de la materia hasta el balanceo de ecuaciones.",
    "quickRule": "Si la composición cambia y aparecen sustancias nuevas, el proceso es químico; si solo cambia la presentación, es físico.",
    "formula": "A=Z+nqquad Z=p^+qquad \text{carga}=p^+-e^-",
    "variables": [
      "Z: protones",
      "A: protones + neutrones",
      "Isótopos: mismo Z",
      "Iones: cambia e⁻"
    ],
    "sections": [
      {
        "heading": "Sustancias y mezclas",
        "body": "Un elemento contiene un tipo de átomo; un compuesto tiene una proporción fija de elementos; una mezcla reúne sustancias sin que necesariamente reaccionen.",
        "bullets": [
          "Mezcla homogénea: una sola fase visible, como agua salada.",
          "Mezcla heterogénea: más de una fase, como agua y aceite.",
          "Una sustancia pura puede ser elemento o compuesto."
        ]
      },
      {
        "heading": "Partículas fundamentales",
        "body": "Los protones determinan el elemento, los neutrones cambian el isótopo y los electrones cambian cuando se forma un ion.",
        "bullets": [
          "Protón: +1, núcleo.",
          "Neutrón: 0, núcleo.",
          "Electrón: −1, región externa."
        ]
      }
    ],
    "examNote": "Evaporar agua salada es un cambio físico y permite separar componentes; quemar papel forma otras sustancias y es cambio químico.",
    "example": {
      "prompt": "Un átomo tiene Z=17 y A=35. ¿Cuántos protones y neutrones tiene?",
      "steps": [
        "Z indica protones: 17.",
        "n = A − Z = 35 − 17.",
        "n = 18."
      ],
      "result": "Tiene 17 protones y 18 neutrones."
    }
  },
  {
    "id": "periodica",
    "subject": "quimica",
    "unit": "Tabla periódica",
    "priority": "Muy rentable",
    "eyebrow": "06 · Tendencias periódicas",
    "title": "Lee la tabla como un mapa de tendencias",
    "lead": "La posición en la tabla permite comparar radio atómico, electronegatividad, energía de ionización y reactividad sin aprender valores aislados.",
    "quickRule": "Radio aumenta hacia abajo e izquierda; electronegatividad y energía de ionización aumentan hacia arriba y derecha.",
    "formula": "\text{radio atómico} \nearrow leftarrowqquad \text{electronegatividad} \nearrow \rightarrow",
    "variables": [
      "Grupo: columna, valencia semejante",
      "Período: fila, niveles de energía",
      "F: electronegatividad máxima",
      "Metales: pierden e⁻"
    ],
    "sections": [
      {
        "heading": "Por qué cambian las propiedades",
        "body": "Al avanzar a la derecha aumenta la carga nuclear efectiva y los electrones son atraídos con más fuerza: el radio disminuye. Al bajar aparecen más capas electrónicas: el radio aumenta.",
        "bullets": [
          "Alcalinos (grupo 1): forman +1.",
          "Alcalinotérreos (grupo 2): forman +2.",
          "Halógenos (grupo 17): tienden a formar −1."
        ]
      },
      {
        "heading": "Iones y tamaños",
        "body": "Un catión es menor que su átomo porque perdió electrones; un anión es mayor porque aumentan las repulsiones electrón-electrón.",
        "bullets": [
          "Na⁺ es menor que Na.",
          "Cl⁻ es mayor que Cl.",
          "Entre especies isoelectrónicas, más protones atraen más y el radio es menor."
        ]
      }
    ],
    "examNote": "Si comparas dos elementos, primero ubícalos: no intentes recordar una lista de radios o electronegatividades.",
    "example": {
      "prompt": "¿Cuál tiene mayor electronegatividad: Na o Cl?",
      "steps": [
        "Ambos están en el período 3.",
        "Cl está más a la derecha.",
        "La electronegatividad aumenta hacia la derecha."
      ],
      "result": "Cl es más electronegativo que Na."
    }
  },
  {
    "id": "sales-acidos",
    "subject": "quimica",
    "unit": "Nomenclatura",
    "priority": "Esencial",
    "eyebrow": "07 · Ácidos, bases y sales",
    "title": "Reconoce el ion antes de nombrar",
    "lead": "Para nombrar hidróxidos, ácidos y oxosales no necesitas adivinar: identifica el catión, el anión y la carga. Después haz que el compuesto completo sea neutro.",
    "quickRule": "OH⁻ indica hidróxido; un H inicial suele indicar ácido; un metal unido a un ion poliatómico suele ser una sal.",
    "formula": "mathrm{Ca^{2+}+2OH^-\rightarrow Ca(OH)_2}qquad mathrm{SO_4^{2-}}qquad mathrm{NO_3^-}",
    "variables": [
      "OH⁻: hidróxido",
      "SO₄²⁻: sulfato",
      "NO₃⁻: nitrato",
      "CO₃²⁻: carbonato"
    ],
    "sections": [
      {
        "heading": "Nombres frecuentes",
        "body": "Un hidróxido se nombra ‘hidróxido de’ más el metal; los ácidos hidrácidos usan ‘ácido ...hídrico’ y muchos oxoácidos se relacionan con su oxoanión.",
        "bullets": [
          "Ca(OH)₂: hidróxido de calcio.",
          "HCl: ácido clorhídrico.",
          "H₂SO₄: ácido sulfúrico.",
          "Na₂CO₃: carbonato de sodio."
        ]
      },
      {
        "heading": "Paréntesis que sí importan",
        "body": "Cuando un ion poliatómico se repite más de una vez, usa paréntesis: Ca(OH)₂ tiene dos grupos OH⁻ completos, no solo dos oxígenos.",
        "bullets": [
          "Al³⁺ con SO₄²⁻ produce Al₂(SO₄)₃.",
          "Cruza cargas como ayuda, luego simplifica si es posible.",
          "El número romano solo se escribe si el metal tiene carga variable."
        ]
      }
    ],
    "examNote": "Lee los subíndices después del paréntesis como multiplicadores de todo el ion poliatómico.",
    "example": {
      "prompt": "Formula sulfato de aluminio a partir de Al³⁺ y SO₄²⁻.",
      "steps": [
        "Necesitas igualar +3 y −2.",
        "Mínimo común: 6; usa 2 Al³⁺ y 3 sulfatos.",
        "Escribe Al₂(SO₄)₃."
      ],
      "result": "La fórmula es Al₂(SO₄)₃."
    }
  },
  {
    "id": "intermoleculares",
    "subject": "quimica",
    "unit": "Fuerzas y estados",
    "priority": "Muy rentable",
    "eyebrow": "08 · Fuerzas intermoleculares",
    "title": "Explica el estado de una sustancia por sus atracciones",
    "lead": "Las fuerzas entre moléculas determinan puntos de ebullición, viscosidad y solubilidad. No rompen enlaces internos: cambian qué tan difícil es separar moléculas.",
    "quickRule": "A mayor fuerza intermolecular, mayor punto de ebullición. El puente de hidrógeno requiere H unido a N, O o F.",
    "formula": "\text{London}<\text{dipolo-dipolo}<\text{puente de H}quad (\text{en moléculas comparables})",
    "variables": [
      "London: todas las partículas",
      "Dipolo-dipolo: moléculas polares",
      "Puente H: H–N, H–O, H–F",
      "Ion-dipolo: sal en agua"
    ],
    "sections": [
      {
        "heading": "Tres fuerzas que debes distinguir",
        "body": "La dispersión de London existe en todas las moléculas y aumenta con el tamaño. Las moléculas polares también tienen atracción dipolo-dipolo. El puente de hidrógeno es una interacción especialmente intensa.",
        "bullets": [
          "CH₄: London predominante.",
          "HCl: dipolo-dipolo y London.",
          "H₂O y NH₃: puente de hidrógeno."
        ]
      },
      {
        "heading": "Solubilidad",
        "body": "Como regla de examen, ‘semejante disuelve a semejante’: solutos polares o iónicos se disuelven mejor en solventes polares; sustancias apolares se disuelven mejor entre sí.",
        "bullets": [
          "El agua es polar.",
          "El aceite es mayormente apolar.",
          "NaCl se hidrata por fuerzas ion-dipolo en agua."
        ]
      }
    ],
    "examNote": "No confundas un enlace covalente O–H con un puente de hidrógeno: el primero está dentro de una molécula, el segundo es entre moléculas.",
    "example": {
      "prompt": "¿Por qué H₂O tiene un punto de ebullición mayor que H₂S?",
      "steps": [
        "H₂O es polar y el H está unido a O.",
        "Entre moléculas de agua hay puentes de hidrógeno.",
        "H₂S no forma puentes de hidrógeno comparables."
      ],
      "result": "El agua necesita más energía para separar sus moléculas."
    }
  },
  {
    "id": "formulas-reacciones",
    "subject": "quimica",
    "unit": "Fórmulas y reacciones",
    "priority": "Esencial",
    "eyebrow": "09 · Fórmulas y balanceo",
    "title": "Conserva átomos; cambia coeficientes, nunca subíndices",
    "lead": "La fórmula empírica da la proporción más simple; la molecular da el número real de átomos. En una ecuación, los coeficientes equilibran átomos sin alterar la identidad de las sustancias.",
    "quickRule": "Para balancear, solo ajusta números delante de las fórmulas. Cambiar subíndices crea otra sustancia.",
    "formula": "n=\frac{M_{mathrm{molecular}}}{M_{mathrm{empírica}}}qquad 2mathrm{H_2}+mathrm{O_2}\rightarrow2mathrm{H_2O}",
    "variables": [
      "Fórmula empírica: razón mínima",
      "Fórmula molecular: múltiplo entero",
      "Coeficiente: cantidad de moléculas/mol",
      "Subíndice: composición"
    ],
    "sections": [
      {
        "heading": "Fórmula molecular",
        "body": "Calcula primero la masa de la fórmula empírica y divide la masa molar real entre ella. El resultado debe ser un entero que multiplica todos los subíndices.",
        "bullets": [
          "CH₂ pesa 14 g/mol.",
          "Si la masa molecular es 42, el factor es 3.",
          "La fórmula molecular es C₃H₆."
        ]
      },
      {
        "heading": "Balanceo ordenado",
        "body": "Cuenta átomos a ambos lados, deja H y O al final cuando sea posible, y verifica todo antes de terminar. Los coeficientes representan relaciones de moles.",
        "bullets": [
          "Empieza por el elemento que aparece en menos especies.",
          "No uses fracciones si puedes multiplicar toda la ecuación al final.",
          "Una ecuación balanceada conserva masa y átomos."
        ]
      }
    ],
    "examNote": "En ejercicios de estequiometría, una ecuación sin balancear da una proporción molar equivocada aunque hagas bien todas las conversiones.",
    "example": {
      "prompt": "La fórmula empírica es CH₂ y la masa molar es 42 g/mol. Halla la molecular.",
      "steps": [
        "M(CH₂)=12+2(1)=14 g/mol.",
        "42/14=3.",
        "Multiplica C y H por 3."
      ],
      "result": "La fórmula molecular es C₃H₆."
    }
  },
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
      {
        "step": "1",
        "text": "Identifica el tema general de qué trata el texto."
      },
      {
        "step": "2",
        "text": "Busca la afirmación principal que expresa la opinión del autor."
      },
      {
        "step": "3",
        "text": "Comprueba que los demás párrafos sirvan para demostrar esa afirmación."
      }
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
      {
        "step": "1",
        "text": "Lee la primera premisa y la segunda premisa por separado."
      },
      {
        "step": "2",
        "text": "Pregúntate si la segunda premisa es un motivo, un resultado o una contradicción de la primera."
      },
      {
        "step": "3",
        "text": "Selecciona el conector que coincida exactamente con la relación lógica identificada."
      }
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
      {
        "step": "1",
        "text": "Localiza el párrafo y la oración exacta donde aparece el término."
      },
      {
        "step": "2",
        "text": "Identifica si el tono del pasaje es positivo, negativo o neutro."
      },
      {
        "step": "3",
        "text": "Prueba cada opción como un sinónimo de sustitución directa."
      }
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
      {
        "step": "1",
        "text": "Verifica qué premisas da el texto como hechos indiscutibles."
      },
      {
        "step": "2",
        "text": "Evalúa qué conclusión se sigue de forma obligatoria."
      },
      {
        "step": "3",
        "text": "Descarta opciones que agreguen juicios de valor ajenos."
      }
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
  },
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
      {
        "step": "1",
        "text": "Calcula la aceleración: a = (14 - 2) / 4 = 12 / 4 = 3.0 m/s²."
      },
      {
        "step": "2",
        "text": "Aplica Segunda Ley de Newton: F_neta = m · a."
      },
      {
        "step": "3",
        "text": "F_neta = 1.0 kg · 3.0 m/s² = 3.0 N."
      }
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
      {
        "step": "1",
        "text": "Calcula el tiempo de caída desde la altura máxima: t = √(2 · 1.25 / 10) = 0.50 s."
      },
      {
        "step": "2",
        "text": "Multiplica por dos para considerar ascenso y descenso: 0.50 s · 2 = 1.00 s."
      }
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
      {
        "step": "1",
        "text": "Calcula moles de Mg: 24 g / 24 g/mol = 1 mol."
      },
      {
        "step": "2",
        "text": "Calcula moles de O₂: 16 g / 32 g/mol = 0.5 mol."
      },
      {
        "step": "3",
        "text": "Razón 1.0 / 0.5 = 2. Es idéntica a 2Mg:1O₂. Masa final = 24 + 16 = 40 g."
      }
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
],
  quizzes: [
  {
    "id": "f1",
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
    "explanation": "En la altura máxima la velocidad instantánea vale cero, pero la gravedad sigue acelerando hacia abajo."
  },
  {
    "id": "f2",
    "subject": "fisica",
    "topic": "Newton",
    "prompt": "Una fuerza neta de 20 N actúa sobre una masa de 5 kg. La aceleración es:",
    "options": [
      "0,25 m/s²",
      "4 m/s²",
      "15 m/s²",
      "100 m/s²"
    ],
    "answer": 1,
    "explanation": "Usa ΣF = ma: a = 20/5 = 4 m/s²."
  },
  {
    "id": "f3",
    "subject": "fisica",
    "topic": "Energía",
    "prompt": "Un arco tensado almacena energía potencial elástica. Al soltarlo, esa energía se transforma principalmente en:",
    "options": [
      "Energía nuclear",
      "Energía cinética de la flecha",
      "Masa de la flecha",
      "Energía potencial gravitatoria"
    ],
    "answer": 1,
    "explanation": "La deformación del arco y la cuerda entrega energía cinética a la flecha."
  },
  {
    "id": "f4",
    "subject": "fisica",
    "topic": "Impulso",
    "prompt": "Una fuerza de 10 N actúa durante 0,4 s. El impulso es:",
    "options": [
      "0,25 N·s",
      "2,5 N·s",
      "4 N·s",
      "25 N·s"
    ],
    "answer": 2,
    "explanation": "J = FΔt = 10 × 0,4 = 4 N·s."
  },
  {
    "id": "f5",
    "subject": "fisica",
    "topic": "Proyectiles",
    "prompt": "Un proyectil se lanza con 20 m/s formando 30° con la horizontal. Si sen30° = 0,5, su componente vertical inicial es:",
    "options": [
      "5 m/s",
      "10 m/s",
      "17,3 m/s",
      "20 m/s"
    ],
    "answer": 1,
    "explanation": "v0y = v0 senθ = 20 × 0,5 = 10 m/s."
  },
  {
    "id": "f6",
    "subject": "fisica",
    "topic": "Gravitación",
    "prompt": "Si la distancia al centro de un planeta se duplica, la intensidad de g se vuelve:",
    "options": [
      "El doble",
      "La mitad",
      "La cuarta parte",
      "La misma"
    ],
    "answer": 2,
    "explanation": "g es inversamente proporcional a r². Al duplicar r, queda en 1/4."
  },
  {
    "id": "q1",
    "subject": "quimica",
    "topic": "Nomenclatura",
    "prompt": "El nombre Stock correcto de FeCl₃ es:",
    "options": [
      "Cloruro de hierro (I)",
      "Cloruro de hierro (II)",
      "Cloruro de hierro (III)",
      "Tricloruro de monohierro"
    ],
    "answer": 2,
    "explanation": "Cada Cl vale −1; tres cloruros suman −3. Por neutralidad, Fe es +3."
  },
  {
    "id": "q2",
    "subject": "quimica",
    "topic": "Nomenclatura",
    "prompt": "La fórmula del dicromato de potasio es:",
    "options": [
      "KCrO₄",
      "K₂CrO₄",
      "KCr₂O₇",
      "K₂Cr₂O₇"
    ],
    "answer": 3,
    "explanation": "El anión dicromato es Cr₂O₇²⁻; requiere dos iones K⁺."
  },
  {
    "id": "q3",
    "subject": "quimica",
    "topic": "Fórmula molecular",
    "prompt": "La fórmula empírica es CH₂ y la masa molar es 42 g/mol. ¿Cuál es la fórmula molecular?",
    "options": [
      "CH₂",
      "C₂H₄",
      "C₃H₆",
      "C₄H₈"
    ],
    "answer": 2,
    "explanation": "La masa empírica es 14 g/mol. 42/14 = 3; multiplica todos los subíndices por 3."
  },
  {
    "id": "q4",
    "subject": "quimica",
    "topic": "Estequiometría",
    "prompt": "2Mg + O₂ → 2MgO. Si reaccionan 72 g de Mg, con M(Mg)=24 y M(MgO)=40, se forman:",
    "options": [
      "24 g",
      "40 g",
      "72 g",
      "120 g"
    ],
    "answer": 3,
    "explanation": "72/24=3 mol Mg; la razón con MgO es 1:1; 3×40=120 g."
  },
  {
    "id": "q5",
    "subject": "quimica",
    "topic": "Lewis",
    "prompt": "La molécula CO₂ es globalmente apolar porque:",
    "options": [
      "No contiene oxígeno",
      "Sus enlaces no tienen dipolo",
      "Es lineal y sus dipolos se cancelan",
      "Tiene pares libres en el carbono"
    ],
    "answer": 2,
    "explanation": "Cada enlace C=O es polar, pero la geometría lineal y simétrica cancela los dipolos."
  },
  {
    "id": "q6",
    "subject": "quimica",
    "topic": "Configuración electrónica",
    "prompt": "Si Fe tiene Z=26, ¿cuántos electrones tiene Fe²⁺?",
    "options": [
      "24",
      "26",
      "28",
      "52"
    ],
    "answer": 0,
    "explanation": "El catión +2 ha perdido dos electrones: 26 − 2 = 24."
  },
  {
    "id": "f7",
    "subject": "fisica",
    "topic": "Unidades",
    "prompt": "72 km/h equivalen a:",
    "options": [
      "7,2 m/s",
      "20 m/s",
      "25,9 m/s",
      "259,2 m/s"
    ],
    "answer": 1,
    "explanation": "Para pasar de km/h a m/s divide entre 3,6: 72/3,6 = 20 m/s."
  },
  {
    "id": "f8",
    "subject": "fisica",
    "topic": "Movimiento circular",
    "prompt": "En movimiento circular uniforme, la aceleración apunta:",
    "options": [
      "Siempre tangente a la trayectoria",
      "En el sentido del movimiento",
      "Hacia el centro del círculo",
      "Hacia fuera del círculo"
    ],
    "answer": 2,
    "explanation": "Aunque la rapidez sea constante, la velocidad cambia de dirección. La aceleración centrípeta apunta hacia el centro."
  },
  {
    "id": "f9",
    "subject": "fisica",
    "topic": "Proyectiles",
    "prompt": "Sin resistencia del aire, durante un lanzamiento oblicuo la aceleración horizontal es:",
    "options": [
      "g",
      "Constante y positiva",
      "Cero",
      "Máxima en el punto más alto"
    ],
    "answer": 2,
    "explanation": "La única aceleración es la gravedad y es vertical; por eso aₓ = 0."
  },
  {
    "id": "q7",
    "subject": "quimica",
    "topic": "Tabla periódica",
    "prompt": "¿Cuál afirmación sobre el radio atómico es correcta?",
    "options": [
      "Aumenta hacia arriba y derecha",
      "Aumenta hacia abajo e izquierda",
      "No depende de la posición en la tabla",
      "Es igual para todos los elementos de un período"
    ],
    "answer": 1,
    "explanation": "Al bajar hay más niveles de energía y hacia la izquierda la atracción efectiva es menor; ambos factores aumentan el radio."
  },
  {
    "id": "q8",
    "subject": "quimica",
    "topic": "Iones poliatómicos",
    "prompt": "La fórmula de hidróxido de calcio es:",
    "options": [
      "CaOH",
      "Ca(OH)₂",
      "Ca₂OH",
      "CaO₂H"
    ],
    "answer": 1,
    "explanation": "Ca²⁺ necesita dos iones OH⁻ para neutralizar la carga total. Como el grupo se repite, se usan paréntesis."
  },
  {
    "id": "q9",
    "subject": "quimica",
    "topic": "Fuerzas intermoleculares",
    "prompt": "La fuerza intermolecular característica entre moléculas de agua es:",
    "options": [
      "Solo dispersión de London",
      "Puente de hidrógeno",
      "Enlace iónico",
      "Enlace metálico"
    ],
    "answer": 1,
    "explanation": "El H está unido a O, un átomo muy electronegativo, y permite puentes de hidrógeno entre moléculas."
  },
  {
    "id": "q10",
    "subject": "quimica",
    "topic": "Balanceo",
    "prompt": "Al balancear una ecuación química, se debe modificar:",
    "options": [
      "Los subíndices de cada fórmula",
      "Los números atómicos",
      "Los coeficientes delante de las fórmulas",
      "La carga del átomo"
    ],
    "answer": 2,
    "explanation": "Los coeficientes cambian cantidades de sustancias. Los subíndices describen la sustancia y no se pueden modificar."
  },
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
};
