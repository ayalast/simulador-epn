# -*- coding: utf-8 -*-
"""Emit guia-bank-fql-dia2.js — Día 2 formato oficial 69, más difícil, rotativo."""
from __future__ import annotations
import json
from pathlib import Path

OUT = Path(r"C:\simulador-epn\guia-bank-fql-dia2.js")


def Q(id, s, n, topic, ch, t, prompt, opts, ans, exp, reading=None, pack=None):
    item = {
        "id": id, "s": s, "n": n, "d": "experto",
        "topics": [topic], "ch": ch, "t": t,
        "prompt": prompt, "opts": opts, "ans": ans, "exp": exp,
        "maths": [], "imgs": [],
    }
    if reading:
        item["reading"] = reading
    if pack:
        item["pack"] = pack
    return item


# ---------- LENGUAJE: packs (un texto, varias preguntas) ----------
T1 = (
    "(1) En el archipiélago de Galápagos, varias especies de pinzones coexisten en islas cercanas con dietas distintas. "
    "(2) Durante décadas se atribuyó esa especialización casi en exclusiva al tamaño del pico. "
    "(3) Un estudio reciente midió, además, la fuerza de las patas y el tiempo que cada ave dedica a forrajear en el suelo o en las ramas. "
    "(4) Los pinzones de pico grueso no siempre dominan las semillas duras si otro grupo llega antes al mismo parche. "
    "(5) _____, la competencia por el momento de llegada altera el resultado que predeciría solo la morfología. "
    "(6) Los autores advierten que el pico sigue siendo importante, pero no basta para explicar por sí solo la convivencia de especies. "
    "(7) En un párrafo aparte recuerdan que Darwin visitó las islas en 1835. "
    "(8) La conclusión del trabajo es que la conducta de forrajeo y el pico deben analizarse juntos si se quiere entender la diversidad observada."
)
T2 = (
    "(1) El estrés hídrico en los Andes tropicales no se reduce a «llueve poco». "
    "(2) En varias cuencas, la lluvia anual apenas ha cambiado, pero se concentra en menos días y con mayor intensidad. "
    "(3) Eso aumenta la escorrentía superficial y reduce la recarga de acuíferos. "
    "(4) Las comunidades que dependen de vertientes de altura perciben sequías más largas entre eventos. "
    "(5) Algunos informes gubernamentales, sin embargo, siguen usando solo el promedio anual para declarar o no emergencia. "
    "(6) Ese indicador oculta el nuevo régimen: igual volumen, peor distribución. "
    "(7) Un anexo menciona el color de las tuberías en tres parroquias, dato irrelevante para el argumento hidrológico. "
    "(8) Por eso, planificar embalses o riegos con el promedio anual puede dejar sin agua a quien más depende del calendario de lluvias."
)
T3 = (
    "(1) Un laboratorio universitario publicó que cierto recubrimiento de grafeno reduce el desgaste de implantes de cadera en un 18 %. "
    "(2) El comunicado de prensa tituló: «El grafeno elimina el recambio de prótesis». "
    "(3) En el artículo original, la muestra era de 24 implantes ensayados en máquina, no en pacientes, durante 2×10^6 ciclos. "
    "(4) Los autores escriben que el resultado es «promisorio» y piden ensayos clínicos. "
    "(5) La diferencia entre el paper y el titular no es un detalle: cambia lo que un lector no especialista cree que ya está demostrado."
)
T4 = (
    "(1) Cuando un jefe reenvía a todo el equipo un correo marcado como urgente a las 23:40, el canal es el mismo que a las 10:00, pero el contexto no. "
    "(2) El mensaje pide un dato que podría esperar al día siguiente. "
    "(3) Varios destinatarios responden en minutos, no porque el contenido lo exija, sino porque el horario y la etiqueta «urgente» redefinen la obligación. "
    "(4) El elemento que más se distorsiona no es el código lingüístico, sino la relación entre emisor, destinatario y circunstancia."
)
T5 = (
    "En 1958 la Unión Soviética impulsó en la OMS una campaña mundial contra la viruela. "
    "Estados Unidos se sumó años después. Ambas potencias buscaban, además del control sanitario, mostrar capacidad científica. "
    "La erradicación se certificó en 1980. El virus no desapareció «por sí solo»: fue el resultado de una red de vacunación que las rivalidades de la Guerra Fría, paradójicamente, ayudaron a financiar."
)
T6 = (
    "(1) La minería ilegal en cabeceras amazónicas no solo extrae oro: remueve sedimentos y usa mercurio que llega a la cadena trófica. "
    "(2) Los análisis de cabello en comunidades ribereñas superan con frecuencia los umbrales de la OMS. "
    "(3) Las redadas policiales desmantelan dragas, pero las mismas cuadrillas reaparecen río arriba a las pocas semanas. "
    "(4) Sin control del comercio del mercurio y de las casas de compra de oro, la presión sobre el río se desplaza, no se elimina. "
    "(5) ____, insistir solo en el decomiso de maquinaria trata el síntoma y deja intacto el mercado. "
    "(6) Un recuadro del informe describe el sabor del pescado en una feria local, anécdota que no sostiene la tesis. "
    "(7) El texto concluye que la salud pública y la trazabilidad del oro son tan decisivas como la presencia militar."
)
T7 = (
    "(1) Un municipio andino decidió pintar de blanco los techos de escuelas para bajar la temperatura interior. "
    "(2) La medida se basó en estudios de albedo urbano en otras latitudes. "
    "(3) Tras un año, las aulas del piso alto sí bajaron 1,4 °C en horas pico; las de planta baja, casi nada. "
    "(4) El aire frío de la noche se estanca en los patios cerrados y anula parte del efecto. "
    "(5) El alcalde anunció «éxito total». "
    "(6) Los datos muestran un éxito parcial, condicionado al piso y a la ventilación, no una solución universal."
)
T8 = (
    "(1) Leer en voz alta un contrato de adhesión no garantiza que el firmante comprenda la cláusula de arbitraje. "
    "(2) La comprensión lectora exigida es técnica: hay que relacionar definiciones dispersas y detectar qué se cede. "
    "(3) Varios fallos judiciales han anulado cláusulas porque el consumidor promedio no podía prever la consecuencia. "
    "(4) Por tanto, la «lectura» que importa no es la decodificación de palabras, sino la capacidad de inferir obligaciones ocultas en la letra chica."
)

len_qs = []
# Pack L1 — 6 Qs (Galápagos) 69-style
len_qs += [
    Q("len-d2-01", "len", 1, "4.4.3-puntuacion", "l9", "Conectores",
      "En el espacio (5), ¿qué conector mantiene la cohesión argumentativa del párrafo?",
      ["Además", "Sin embargo", "Por ejemplo", "Es decir"], 1,
      "**Paso 1.** (4) afirma que el pico grueso no basta si otro grupo llega antes. **Paso 2.** (5) introduce una consecuencia que matiza la tesis morfológica. **Paso 3.** Hace falta contraste, no adición ni ejemplo. **Respuesta correcta: B. Sin embargo**",
      T1, "len-p1"),
    Q("len-d2-02", "len", 2, "4.4.3-parrafo", "l7", "Oración prescindible",
      "¿Cuál oración puede eliminarse sin dañar la línea argumentativa del texto?",
      ["(3)", "(6)", "(7)", "(8)"], 2,
      "**Paso 1.** La tesis une pico y conducta de forrajeo. **Paso 2.** (7) es un dato biográfico de Darwin, ajeno a esa tesis. **Paso 3.** (3), (6) y (8) aportan evidencia o conclusión. **Respuesta correcta: C. (7)**",
      T1, "len-p1"),
    Q("len-d2-03", "len", 3, "4.4.2-lectura", "l5", "Idea principal",
      "La idea principal del texto es:",
      ["Darwin describió a los pinzones en 1835.",
       "Los pinzones de pico grueso siempre ganan las semillas duras.",
       "La convivencia de pinzones no se explica solo por el pico: también cuenta la conducta de forrajeo.",
       "Todas las especies de Galápagos tienen la misma dieta."], 2,
      "**Paso 1.** (6) y (8) explicitan la tesis. **Paso 2.** Darwin es accesorio; la dominancia absoluta del pico queda refutada en (4). **Respuesta correcta: C.**",
      T1, "len-p1"),
    Q("len-d2-04", "len", 4, "4.4.2-critica", "l6", "Propósito",
      "El propósito comunicativo dominante es:",
      ["Narrar el viaje de Darwin.",
       "Explicar, con evidencia reciente, por qué la morfología del pico no basta.",
       "Convencer al lector de prohibir estudios en Galápagos.",
       "Clasificar todas las dietas de los pinzones."], 1,
      "**Paso 1.** Hay datos de un estudio y una conclusión que corrige una tesis antigua. **Paso 2.** No hay relato de viaje ni exhortación política. **Respuesta correcta: B.**",
      T1, "len-p1"),
    Q("len-d2-05", "len", 5, "4.4.2-lectura", "l5", "Literal",
      "Según el texto, ¿qué midió el estudio reciente además del pico?",
      ["Solo el color del plumaje.",
       "La fuerza de las patas y el tiempo de forrajeo en suelo o ramas.",
       "Únicamente el número de islas visitadas por Darwin.",
       "La temperatura del océano en 1835."], 1,
      "**Paso 1.** Oración (3): fuerza de patas y tiempo de forrajeo. **Respuesta correcta: B.**",
      T1, "len-p1"),
    Q("len-d2-06", "len", 6, "4.4.1-juicio", "l3", "Síntesis",
      "¿Qué enunciado sintetiza mejor ambos bloques del texto?",
      ["El pico es irrelevante.",
       "Llegar primero al parche puede anular la ventaja morfológica; pico y conducta deben leerse juntos.",
       "Darwin se equivocó en todo.",
       "Los pinzones ya no compiten."], 1,
      "**Paso 1.** (4)–(5) dan el mecanismo; (8) cierra. **Respuesta correcta: B.**",
      T1, "len-p1"),
]
# Pack L2 — 5 Qs Andes
len_qs += [
    Q("len-d2-07", "len", 7, "4.4.2-critica", "l6", "Tipo de texto",
      "El texto es principalmente:",
      ["Narrativo: cuenta una sequía puntual.",
       "Expositivo: describe un cambio de régimen hídrico y un error de indicador.",
       "Argumentativo publicitario: vende embalses.",
       "Instructivo: enseña a instalar tuberías."], 1,
      "**Paso 1.** Presenta hechos hidrológicos y evalúa un indicador. **Paso 2.** No narra un episodio único ni da instrucciones. **Respuesta correcta: B.**",
      T2, "len-p2"),
    Q("len-d2-08", "len", 8, "4.4.2-logica", "l4", "Inferencia",
      "De (5) y (6) se infiere que:",
      ["El promedio anual es el mejor indicador posible.",
       "Una cuenca puede estar en crisis aunque el total anual no baje.",
       "Las vertientes de altura reciben más lluvia que antes.",
       "Las tuberías de colores alteran la recarga."], 1,
      "**Paso 1.** Igual volumen, peor distribución. **Paso 2.** El promedio oculta la crisis. **Respuesta correcta: B.**",
      T2, "len-p2"),
    Q("len-d2-09", "len", 9, "4.4.3-parrafo", "l7", "Oración prescindible",
      "¿Qué oración sobra para la tesis hidrológica?",
      ["(2)", "(3)", "(7)", "(8)"], 2,
      "**Paso 1.** (7) habla del color de tuberías, irrelevante. **Respuesta correcta: C. (7)**",
      T2, "len-p2"),
    Q("len-d2-10", "len", 10, "4.4.2-lectura", "l5", "Idea principal",
      "Según el texto de los Andes, la idea principal es:",
      ["En los Andes ya no llueve.",
       "El régimen de lluvias cambió de calendario; el promedio anual no basta para planificar.",
       "Hay que pintar de blanco todas las tuberías.",
       "Los acuíferos se recargan más que antes."], 1,
      "**Paso 1.** (2)–(3) y (8) articulan la tesis. **Respuesta correcta: B.**",
      T2, "len-p2"),
    Q("len-d2-11", "len", 11, "4.4.3-argumentacion", "l8", "Intención",
      "La intención del cierre (8) es:",
      ["Ironizar sobre los alcaldes.",
       "Advertir una consecuencia práctica de usar el indicador equivocado.",
       "Proponer el color de las tuberías.",
       "Negar que existan embalses."], 1,
      "**Paso 1.** (8) deriva una consecuencia de planificación. **Respuesta correcta: B.**",
      T2, "len-p2"),
]
# Pack L3 — 4 Qs grafeno
len_qs += [
    Q("len-d2-12", "len", 12, "4.4.2-critica", "l6", "Lectura crítica",
      "El problema central que señala el texto es:",
      ["El grafeno no existe.",
       "El titular del comunicado exagera lo que el artículo demuestra.",
       "Los ciclos de la máquina son imposibles.",
       "No hay diferencia entre prensa y paper."], 1,
      "**Paso 1.** (2) vs (3)–(4). **Respuesta correcta: B.**",
      T3, "len-p3"),
    Q("len-d2-13", "len", 13, "4.4.2-lectura", "l5", "Literal",
      "¿En qué se ensayó el recubrimiento, según el artículo original?",
      ["En 24 pacientes operados.",
       "En 24 implantes en máquina, 2×10^6 ciclos.",
       "En un hospital de cadera durante un año.",
       "En ratones de laboratorio."], 1,
      "**Paso 1.** Oración (3). **Respuesta correcta: B.**",
      T3, "len-p3"),
    Q("len-d2-14", "len", 14, "4.4.1-juicio", "l3", "Inferencia",
      "Un lector que solo viera el titular podría concluir, erróneamente, que:",
      ["Hace falta más investigación clínica.",
       "Ya no será necesario reemplazar prótesis en humanos.",
       "La muestra fue de 24 implantes en máquina.",
       "Los autores pedían cautela."], 1,
      "**Paso 1.** «Elimina el recambio» implica un resultado clínico ya cerrado. **Respuesta correcta: B.**",
      T3, "len-p3"),
    Q("len-d2-15", "len", 15, "4.4.2-critica", "l6", "Propósito",
      "El texto busca sobre todo:",
      ["Vender grafeno.",
       "Enseñar a distinguir evidencia de laboratorio y afirmación periodística.",
       "Desacreditar a la universidad.",
       "Explicar la química del carbono."], 1,
      "**Paso 1.** Contrasta paper y prensa y nombra el efecto en el lector. **Respuesta correcta: B.**",
      T3, "len-p3"),
]
# Pack L4 — 3 Qs comunicación
len_qs += [
    Q("len-d2-16", "len", 16, "4.4.1-comunicacion", "l1", "Elementos",
      "El elemento de la comunicación que más se distorsiona en el caso es:",
      ["El canal físico (el correo sigue siendo correo).",
       "El contexto y la relación emisor–destinatario, redefinidos por el horario y la etiqueta «urgente».",
       "El código: las palabras cambiaron de idioma.",
       "El referente: el dato pedido no existe."], 1,
      "**Paso 1.** (1) y (4): el canal es el mismo; cambia la circunstancia. **Respuesta correcta: B.**",
      T4, "len-p4"),
    Q("len-d2-17", "len", 17, "4.4.2-logica", "l4", "Inferencia",
      "Se infiere que varios responden de madrugada porque:",
      ["El dato era imprescindible a esa hora.",
       "El marco (hora + «urgente») impone una obligación que el contenido no justifica.",
       "El jefe lo pidió en otro idioma.",
       "El correo no llegó."], 1,
      "**Paso 1.** Oración (3). **Respuesta correcta: B.**",
      T4, "len-p4"),
    Q("len-d2-18", "len", 18, "4.4.2-lectura", "l5", "Idea principal",
      "Según el caso del correo urgente, la idea principal es:",
      ["Nunca hay que escribir de noche.",
       "Un mismo canal puede cambiar de fuerza ilocutiva según el contexto.",
       "Los correos urgentes no existen.",
       "El equipo ignora al jefe."], 1,
      "**Paso 1.** (1) y (4). **Respuesta correcta: B.**",
      T4, "len-p4"),
]
# Pack L5 — 2 Qs viruela (69-like short)
len_qs += [
    Q("len-d2-19", "len", 19, "4.4.2-logica", "l4", "Inferencia",
      "La inferencia más sólida es:",
      ["La viruela se extinguió sin intervención humana.",
       "La rivalidad geopolítica, de modo indirecto, favoreció la financiación de la vacunación mundial.",
       "Solo la URSS tenía vacuna.",
       "EE.UU. se opuso siempre a la OMS."], 1,
      "**Paso 1.** El texto afirma que ambas potencias financiaron por prestigio y que la red de vacunación erradicó el virus. **Respuesta correcta: B.**",
      T5, "len-p5"),
    Q("len-d2-20", "len", 20, "4.4.2-lectura", "l5", "Literal",
      "¿En qué año se certificó la erradicación?",
      ["1958", "1980", "1945", "1991"], 1,
      "**Paso 1.** Dato explícito. **Respuesta correcta: B. 1980**",
      T5, "len-p5"),
]
# Pack L6 — 6 Qs minería (rotation set)
len_qs += [
    Q("len-d2-21", "len", 21, "4.4.3-puntuacion", "l9", "Conectores",
      "El conector que completa mejor el espacio (5) es:",
      ["Por lo tanto", "Aunque", "Por ejemplo", "En cambio"], 0,
      "**Paso 1.** (4) da la causa; (5) extrae la consecuencia sobre el decomiso. **Respuesta correcta: A. Por lo tanto**",
      T6, "len-p6"),
    Q("len-d2-22", "len", 22, "4.4.3-parrafo", "l7", "Oración prescindible",
      "¿Qué oración no sostiene la tesis?",
      ["(2)", "(4)", "(6)", "(7)"], 2,
      "**Paso 1.** (6) es anécdota del sabor del pescado. **Respuesta correcta: C. (6)**",
      T6, "len-p6"),
    Q("len-d2-23", "len", 23, "4.4.2-lectura", "l5", "Idea principal",
      "Según el texto de minería amazónica, la idea principal es:",
      ["Las redadas bastan si se repiten cada semana.",
       "Sin tocar el mercado del mercurio y del oro, la minería ilegal solo se desplaza.",
       "El pescado amazónico no se debe comer.",
       "La OMS no tiene umbrales de mercurio."], 1,
      "**Paso 1.** (3)–(4) y (7). **Respuesta correcta: B.**",
      T6, "len-p6"),
    Q("len-d2-24", "len", 24, "4.4.2-critica", "l6", "Propósito",
      "El propósito dominante es:",
      ["Narrar una redada.",
       "Argumentar que el control policial aislado es insuficiente.",
       "Enseñar a extraer oro.",
       "Describir el sabor del pescado."], 1,
      "**Paso 1.** Hay tesis + evidencia + consecuencia de política. **Respuesta correcta: B.**",
      T6, "len-p6"),
    Q("len-d2-25", "len", 25, "4.4.2-lectura", "l5", "Literal",
      "Según el texto, los análisis de cabello:",
      ["Están siempre bajo el umbral de la OMS.",
       "Superan con frecuencia los umbrales de la OMS.",
       "No se mencionan.",
       "Solo se hicieron en Quito."], 1,
      "**Paso 1.** Oración (2). **Respuesta correcta: B.**",
      T6, "len-p6"),
    Q("len-d2-26", "len", 26, "4.4.1-juicio", "l3", "Síntesis",
      "La síntesis correcta es:",
      ["Más dragas decomisadas equivalen a río limpio.",
       "Salud pública y trazabilidad del oro pesan tanto como la fuerza pública.",
       "El mercurio no llega a la cadena trófica.",
       "Las cuadrillas no regresan."], 1,
      "**Paso 1.** Oración (7). **Respuesta correcta: B.**",
      T6, "len-p6"),
]
# Pack L7 — 5 Qs techos
len_qs += [
    Q("len-d2-27", "len", 27, "4.4.2-critica", "l6", "Lectura crítica",
      "El contraste clave del texto es:",
      ["Alcalde vs. datos: «éxito total» frente a un efecto parcial y condicionado.",
       "Techos blancos vs. techos negros en otra ciudad.",
       "Escuelas vs. hospitales.",
       "Albedo vs. humedad del mar."], 0,
      "**Paso 1.** (5) vs (3)–(4) y (6). **Respuesta correcta: A.**",
      T7, "len-p7"),
    Q("len-d2-28", "len", 28, "4.4.2-lectura", "l5", "Literal",
      "¿Cuánto bajó la temperatura en las aulas del piso alto?",
      ["Nada.", "1,4 °C en horas pico.", "4 °C todo el día.", "18 °C."], 1,
      "**Paso 1.** Oración (3). **Respuesta correcta: B.**",
      T7, "len-p7"),
    Q("len-d2-29", "len", 29, "4.4.2-logica", "l4", "Inferencia",
      "Se infiere que pintar techos:",
      ["Funciona igual en cualquier piso y clima.",
       "Depende de la ventilación y de en qué piso está el aula.",
       "Fracasa siempre.",
       "Solo sirve junto al mar."], 1,
      "**Paso 1.** (3)–(4). **Respuesta correcta: B.**",
      T7, "len-p7"),
    Q("len-d2-30", "len", 30, "4.4.3-argumentacion", "l8", "Falacia",
      "El anuncio del alcalde incurre sobre todo en:",
      ["Generalización abusiva a partir de un efecto parcial.",
       "Ataque a la persona.",
       "Falsa analogía con Darwin.",
       "Petición de principio formal."], 0,
      "**Paso 1.** De un resultado mixto concluye «éxito total». **Respuesta correcta: A.**",
      T7, "len-p7"),
    Q("len-d2-31", "len", 31, "4.4.2-lectura", "l5", "Idea principal",
      "Según el texto de los techos blancos, la idea principal es:",
      ["Los techos blancos no sirven nunca.",
       "Una medida de albedo puede ayudar, pero no es un éxito universal.",
       "Hay que cerrar las escuelas.",
       "El albedo solo funciona en el trópico húmedo."], 1,
      "**Paso 1.** (6) cierra. **Respuesta correcta: B.**",
      T7, "len-p7"),
]
# Pack L8 — 3 Qs contrato
len_qs += [
    Q("len-d2-32", "len", 32, "4.4.2-critica", "l6", "Niveles de lectura",
      "El texto distingue sobre todo entre:",
      ["Leer en voz alta y comprender obligaciones técnicas inferidas.",
       "Firma digital y firma manuscrita.",
       "Juez y notario.",
       "Contrato laboral y contrato de arriendo."], 0,
      "**Paso 1.** (1) y (4). **Respuesta correcta: A.**",
      T8, "len-p8"),
    Q("len-d2-33", "len", 33, "4.4.1-comunicacion", "l1", "Idea principal",
      "Según el texto del contrato de adhesión, la idea principal es:",
      ["Todo contrato es nulo.",
       "La lectura que protege al firmante es la que detecta consecuencias no evidentes.",
       "El arbitraje siempre es ilegal.",
       "Hay que leer en voz alta para que valga."], 1,
      "**Paso 1.** Oración (4). **Respuesta correcta: B.**",
      T8, "len-p8"),
    Q("len-d2-34", "len", 34, "4.4.2-logica", "l4", "Inferencia",
      "Los fallos que anulan cláusulas se apoyan en que:",
      ["El consumidor promedio no podía prever la consecuencia.",
       "El contrato no tenía firma.",
       "El juez no sabe leer.",
       "La cláusula estaba en otro idioma."], 0,
      "**Paso 1.** Oración (3). **Respuesta correcta: A.**",
      T8, "len-p8"),
]
# Pack L9 — 2 Qs extra rotation (short standalone passage)
T9 = (
    "Un rector envía un comunicado de tres líneas: «Mañana no hay clases. Motivo: mantenimiento eléctrico». "
    "No indica horarios de reposición ni a quién preguntar. Varios padres escriben al grupo del curso y reciben respuestas contradictorias de otros padres."
)
len_qs += [
    Q("len-d2-35", "len", 35, "4.4.1-comunicacion", "l1", "Elementos",
      "El fallo comunicativo principal está en:",
      ["El emisor no existe.",
       "El mensaje es demasiado pobre en información (referente incompleto) y obliga a un ruido de rumores.",
       "El canal (escrito) es imposible en un colegio.",
       "Los padres no saben leer."], 1,
      "**Paso 1.** Hay emisor y canal; falta información necesaria. **Respuesta correcta: B.**",
      T9, "len-p9"),
    Q("len-d2-36", "len", 36, "4.4.3-parrafo", "l7", "Intención",
      "Para cumplir su propósito, el comunicado debería:",
      ["Repetir solo «no hay clases».",
       "Añadir horario de reposición, alcance (todos los niveles o no) y un canal oficial de consulta.",
       "Traducirse al latín.",
       "Enviarse únicamente a los docentes."], 1,
      "**Paso 1.** El hueco son las condiciones de la medida. **Respuesta correcta: B.**",
      T9, "len-p9"),
]
# Pack L10 — 4 Qs (completa 40)
T10 = (
    "(1) Se ha vuelto común afirmar que «los jóvenes ya no leen». "
    "(2) Las encuestas de tiempo de pantalla muestran, al contrario, que leen más texto que la generación de sus padres, aunque en fragmentos, pantallas y géneros distintos. "
    "(3) El problema no es la cantidad bruta de palabras, sino el tipo de atención que esos formatos entrenan. "
    "(4) Un hilo de 15 segundos no exige sostener una tesis durante ocho páginas. "
    "(5) Por eso, medir «lectura» solo en minutos de pantalla confunde exposición con comprensión sostenida."
)
len_qs += [
    Q("len-d2-37", "len", 37, "4.4.2-critica", "l6", "Tesis",
      "La tesis del texto es:",
      ["Los jóvenes no leen nada.",
       "Leen más texto, pero no necesariamente con la atención que exige un texto largo.",
       "Las pantallas prohíben leer.",
       "Los padres leían menos palabras en absoluto."], 1,
      "**Paso 1.** (2)–(5). **Respuesta correcta: B.**",
      T10, "len-p10"),
    Q("len-d2-38", "len", 38, "4.4.3-argumentacion", "l8", "Falacia que se ataca",
      "El texto ataca sobre todo esta falacia del lugar común inicial:",
      ["Falsa causa: si hay pantalla, no hay lectura de ningún tipo.",
       "Ad hominem contra los jóvenes.",
       "Pendiente resbaladiza formal.",
       "Autoridad de un premio Nobel."], 0,
      "**Paso 1.** (1) identifica lectura con un solo soporte. **Respuesta correcta: A.**",
      T10, "len-p10"),
    Q("len-d2-39", "len", 39, "4.4.2-lectura", "l5", "Literal",
      "Según (2), las encuestas de pantalla muestran que los jóvenes:",
      ["No leen ninguna palabra.",
       "Leen más texto que la generación de sus padres, en otros formatos.",
       "Solo ven videos sin letras.",
       "Leen ocho páginas de un tirón."], 1,
      "**Paso 1.** Oración (2). **Respuesta correcta: B.**",
      T10, "len-p10"),
    Q("len-d2-40", "len", 40, "4.4.2-logica", "l4", "Inferencia",
      "Se infiere que un indicador útil de lectura debería:",
      ["Contar solo minutos de pantalla.",
       "Distinguir exposición fragmentaria y comprensión de textos largos.",
       "Prohibir los hilos.",
       "Ignorar las encuestas."], 1,
      "**Paso 1.** Oración (5). **Respuesta correcta: B.**",
      T10, "len-p10"),
]

len_packs = [
    {"id": "len-p1", "qids": [f"len-d2-0{i}" for i in range(1, 7)]},
    {"id": "len-p2", "qids": [f"len-d2-0{i}" if i < 10 else f"len-d2-{i}" for i in range(7, 12)]},
    {"id": "len-p3", "qids": [f"len-d2-{i}" for i in range(12, 16)]},
    {"id": "len-p4", "qids": [f"len-d2-{i}" for i in range(16, 19)]},
    {"id": "len-p5", "qids": [f"len-d2-{i}" for i in range(19, 21)]},
    {"id": "len-p6", "qids": [f"len-d2-{i}" for i in range(21, 27)]},
    {"id": "len-p7", "qids": [f"len-d2-{i}" for i in range(27, 32)]},
    {"id": "len-p8", "qids": [f"len-d2-{i}" for i in range(32, 35)]},
    {"id": "len-p9", "qids": [f"len-d2-{i}" for i in range(35, 37)]},
    {"id": "len-p10", "qids": [f"len-d2-{i}" for i in range(37, 41)]},
]


def scenario_qs(pack, reading, items):
    out = []
    for it in items:
        out.append(Q(*it[:-1], reading=reading, pack=pack) if False else None)
    return out


# I'll build fis more simply below
fis_qs = []

# F1 proyectil acantilado — 4
S1 = (
    "Desde el borde de un acantilado de 45 m se lanza una piedra con rapidez 20 m/s a 30° sobre la horizontal. "
    "g = 10 m/s². Desprecie el aire. sen 30° = 1/2, cos 30° = √3/2 ≈ 0,87."
)
fis_qs += [
    Q("fis-d2-01", "fis", 1, "4.2.1-proyectiles", "f6", "Proyectil",
      "¿Cuál es la componente vertical inicial de la velocidad?",
      ["10 m/s", "17,4 m/s", "20 m/s", "30 m/s"], 0,
      "**Paso 1.** v0y = 20·sen30° = 20·0,5 = 10 m/s. **Respuesta correcta: A.**", S1, "fis-s1"),
    Q("fis-d2-02", "fis", 2, "4.2.1-proyectiles", "f6", "Proyectil",
      "El tiempo hasta el punto más alto, medido desde el lanzamiento, es:",
      ["0,5 s", "1,0 s", "2,0 s", "3,0 s"], 1,
      "**Paso 1.** En el máximo, vy=0 = 10 − 10 t ⇒ t = 1,0 s. **Respuesta correcta: B.**", S1, "fis-s1"),
    Q("fis-d2-03", "fis", 3, "4.2.1-proyectiles", "f6", "Proyectil",
      "La altura máxima respecto del pie del acantilado es:",
      ["5 m", "45 m", "50 m", "65 m"], 2,
      "**Paso 1.** Δy_sube = v0y²/(2g) = 100/20 = 5 m. **Paso 2.** Desde el pie: 45+5 = 50 m. **Respuesta correcta: C.**", S1, "fis-s1"),
    Q("fis-d2-04", "fis", 4, "4.2.3-energia", "f12", "Energía",
      "Si la piedra tiene masa 0,40 kg, su energía cinética al llegar al pie del acantilado (nivel 0) es, despreciando el aire:",
      ["80 J", "180 J", "260 J", "400 J"], 2,
      "**Paso 1.** E = K0 + mgh = ½(0,40)(400) + (0,40)(10)(45) = 80 + 180 = 260 J. **Respuesta correcta: C.**", S1, "fis-s1"),
]

# F2 hockey — 4
S2 = (
    "Un disco de hockey de 0,20 kg se desliza sobre hielo horizontal sin fricción. "
    "Actúan tres fuerzas horizontales constantes: F1 = 4,0 N al este, F2 = 3,0 N al norte. "
    "F3 tiene magnitud 5,0 N y apunta al oeste."
)
fis_qs += [
    Q("fis-d2-05", "fis", 5, "4.2.1-vectores", "f1", "Vectores",
      "La resultante Fx (este positivo) es:",
      ["−1,0 N", "1,0 N", "4,0 N", "9,0 N"], 0,
      "**Paso 1.** Fx = 4,0 − 5,0 = −1,0 N. **Respuesta correcta: A.**", S2, "fis-s2"),
    Q("fis-d2-06", "fis", 6, "4.2.2-2daNewton", "f8", "Newton 2",
      "La magnitud de la aceleración del disco es aproximadamente:",
      ["3,2 m/s²", "8,0 m/s²", "16 m/s²", "25 m/s²"], 2,
      "**Paso 1.** Fnet = √(1²+3²)=√10 ≈ 3,16 N. **Paso 2.** a = 3,16/0,20 ≈ 16 m/s². **Respuesta correcta: C.**", S2, "fis-s2"),
    Q("fis-d2-07", "fis", 7, "4.2.1-1raNewton", "f2", "Equilibrio",
      "Para que el disco se mueva con velocidad constante, F3 debería cancelar a F1 y F2. Su magnitud tendría que ser:",
      ["1,0 N", "3,0 N", "5,0 N", "7,0 N"], 2,
      "**Paso 1.** |F1+F2| = √(16+9)=5,0 N. **Paso 2.** Primera ley: Fnet=0. **Respuesta correcta: C. 5,0 N**", S2, "fis-s2"),
    Q("fis-d2-08", "fis", 8, "4.2.3-trabajo", "f11", "Trabajo",
      "Si el disco se desplaza 2,0 m hacia el norte, el trabajo de F2 es:",
      ["0 J", "3,0 J", "6,0 J", "8,0 J"], 2,
      "**Paso 1.** W = F·d = 3,0·2,0 = 6,0 J (fuerza paralela al desplazamiento). **Respuesta correcta: C.**", S2, "fis-s2"),
]

# F3 caja — 3
S3 = (
    "Empujas una caja de 8,0 kg con fuerza horizontal constante F = 24 N. "
    "El piso es horizontal, μk = 0,20 y g = 10 m/s². La caja parte del reposo."
)
fis_qs += [
    Q("fis-d2-09", "fis", 9, "4.2.2-rozamiento", "f9", "Rozamiento",
      "La fuerza de rozamiento cinético es:",
      ["8,0 N", "16 N", "24 N", "80 N"], 1,
      "**Paso 1.** N = mg = 80 N. **Paso 2.** fk = 0,20·80 = 16 N. **Respuesta correcta: B.**", S3, "fis-s3"),
    Q("fis-d2-10", "fis", 10, "4.2.2-2daNewton", "f8", "Newton 2",
      "La aceleración de la caja es:",
      ["0,50 m/s²", "1,0 m/s²", "2,0 m/s²", "3,0 m/s²"], 1,
      "**Paso 1.** Fnet = 24−16 = 8 N. **Paso 2.** a = 8/8 = 1,0 m/s². **Respuesta correcta: B.**", S3, "fis-s3"),
    Q("fis-d2-11", "fis", 11, "4.2.3-trabajo", "f11", "Trabajo-energía",
      "Tras recorrer 5,0 m, su rapidez es:",
      ["√5 m/s ≈ 2,2 m/s", "√10 m/s ≈ 3,2 m/s", "5,0 m/s", "10 m/s"], 1,
      "**Paso 1.** Wnet = 8·5 = 40 J = ½(8)v² ⇒ v² = 10. **Respuesta correcta: B.**", S3, "fis-s3"),
]

# F4 tiro vertical — 3
S4 = (
    "Desde el punto P se lanza una piedra verticalmente hacia arriba con 20 m/s. g = 10 m/s². "
    "Q está 15 m por encima de P. El aire se desprecia."
)
fis_qs += [
    Q("fis-d2-12", "fis", 12, "4.2.1-caida", "f5", "Tiro vertical",
      "La altura máxima sobre P es:",
      ["10 m", "20 m", "30 m", "40 m"], 1,
      "**Paso 1.** H = v²/(2g) = 400/20 = 20 m. **Respuesta correcta: B.**", S4, "fis-s4"),
    Q("fis-d2-13", "fis", 13, "4.2.1-caida", "f5", "Tiro vertical",
      "La rapidez al pasar por Q, subiendo, es:",
      ["0", "10 m/s", "√10 m/s", "20 m/s"], 1,
      "**Paso 1.** v² = 400 − 2·10·15 = 100 ⇒ v = 10 m/s. **Respuesta correcta: B.**", S4, "fis-s4"),
    Q("fis-d2-14", "fis", 14, "4.2.3-energia", "f12", "Energía",
      "En el punto más alto, si m = 0,50 kg, la energía potencial respecto de P es:",
      ["0", "50 J", "100 J", "200 J"], 2,
      "**Paso 1.** Ep = mgH = 0,50·10·20 = 100 J. **Respuesta correcta: C.**", S4, "fis-s4"),
]

# F5 camión — 2
S5 = (
    "Un automóvil de 1200 kg se avería. Un camión lo empuja hacia adelante por una carretera horizontal "
    "con fuerza constante. En 8,0 s el auto pasa de 0 a 8,0 m/s. No hay fricción relevante."
)
fis_qs += [
    Q("fis-d2-15", "fis", 15, "4.2.2-2daNewton", "f8", "Empuje",
      "La aceleración del auto es:",
      ["0,50 m/s²", "1,0 m/s²", "2,0 m/s²", "8,0 m/s²"], 1,
      "**Paso 1.** a = Δv/Δt = 8/8 = 1,0 m/s². **Respuesta correcta: B.**", S5, "fis-s5"),
    Q("fis-d2-16", "fis", 16, "4.2.2-impulso", "f10", "Impulso",
      "El impulso entregado al auto en esos 8,0 s es:",
      ["1200 N·s", "4800 N·s", "9600 N·s", "12000 N·s"], 2,
      "**Paso 1.** J = Δp = 1200·8 = 9600 N·s. **Respuesta correcta: C.**", S5, "fis-s5"),
]

# F6–F8 standalones + second set for rotation
S6 = "Un bloque de 2,0 kg cae 3,0 m por un plano de 37° (sen37°=0,60, cos37°=0,80). μk=0,25. g=10 m/s². Parte del reposo."
fis_qs += [
    Q("fis-d2-17", "fis", 17, "4.2.2-rozamiento", "f9", "Plano",
      "La aceleración a lo largo del plano es:",
      ["2,0 m/s²", "4,0 m/s²", "6,0 m/s²", "8,0 m/s²"], 1,
      "**Paso 1.** a = g(senθ − μk cosθ) = 10(0,60 − 0,25·0,80) = 10(0,40) = 4,0 m/s². **Respuesta correcta: B.**", S6, "fis-s6"),
    Q("fis-d2-18", "fis", 18, "4.2.3-energia", "f12", "Energía",
      "La rapidez al bajar 3,0 m a lo largo del plano es:",
      ["√12 m/s", "√24 m/s ≈ 4,9 m/s", "√48 m/s", "8,0 m/s"], 1,
      "**Paso 1.** v² = 2as = 2·4·3 = 24. **Respuesta correcta: B.**", S6, "fis-s6"),
]

S7 = "Dos masas, 3,0 kg y 5,0 kg, cuelgan de una polea ideal (Atwood). g = 10 m/s²."
fis_qs += [
    Q("fis-d2-19", "fis", 19, "4.2.2-2daNewton", "f8", "Atwood",
      "La aceleración del sistema es:",
      ["1,0 m/s²", "2,5 m/s²", "5,0 m/s²", "10 m/s²"], 1,
      "**Paso 1.** a = (5−3)/(5+3)·10 = 2,5 m/s². **Respuesta correcta: B.**", S7, "fis-s7"),
    Q("fis-d2-20", "fis", 20, "4.2.2-2daNewton", "f8", "Atwood",
      "La tensión de la cuerda es:",
      ["24 N", "30 N", "37,5 N", "50 N"], 2,
      "**Paso 1.** T = 2 m1 m2 g / (m1+m2) = 2·15·10 / 8 = 37,5 N. **Respuesta correcta: C.**", S7, "fis-s7"),
]

# Rotation set F8-F14
S8 = "Un satélite describe una órbita circular de radio 2R, donde R es el radio terrestre. En la superficie, g = 10 m/s²."
fis_qs += [
    Q("fis-d2-21", "fis", 21, "4.2.2-grav", "f7", "Gravedad",
      "El valor de g a esa altura (distancia 2R al centro) es:",
      ["10 m/s²", "5,0 m/s²", "2,5 m/s²", "1,25 m/s²"], 2,
      "**Paso 1.** g' = GM/(2R)² = g/4 = 2,5 m/s². **Respuesta correcta: C.**", S8, "fis-s8"),
    Q("fis-d2-22", "fis", 22, "4.2.2-circular", "f7", "Circular",
      "Si la rapidez orbital es v, la aceleración centrípeta es:",
      ["v²/(2R)", "v²/R", "2v²/R", "v²/(4R)"], 0,
      "**Paso 1.** ac = v²/r = v²/(2R). **Respuesta correcta: A.**", S8, "fis-s8"),
]

S9 = "Una caja de 5,0 kg está contra una pared. La empujas horizontalmente con F. μs = 0,40. g = 10 m/s². No hay movimiento vertical."
fis_qs += [
    Q("fis-d2-23", "fis", 23, "4.2.2-rozamiento", "f9", "Estático",
      "El menor F que evita que la caja resbale hacia abajo es:",
      ["20 N", "50 N", "80 N", "125 N"], 3,
      "**Paso 1.** N = F. **Paso 2.** μs N ≥ mg ⇒ 0,40 F ≥ 50 ⇒ F ≥ 125 N. **Respuesta correcta: D.**", S9, "fis-s9"),
    Q("fis-d2-24", "fis", 24, "4.2.1-1raNewton", "f2", "Newton 1",
      "Si F es exactamente ese mínimo y la caja no se mueve, la fuerza neta es:",
      ["50 N hacia abajo", "125 N hacia la pared", "0", "mg hacia arriba"], 2,
      "**Paso 1.** Reposo ⇒ Fnet = 0 (primera ley). **Respuesta correcta: C.**", S9, "fis-s9"),
]

S10 = "Un cuerpo de 2,0 kg, inicialmente en reposo, recibe una fuerza constante de 10 N durante 0,40 s."
fis_qs += [
    Q("fis-d2-25", "fis", 25, "4.2.2-impulso", "f10", "Impulso",
      "El impulso es:",
      ["2,0 N·s", "4,0 N·s", "8,0 N·s", "10 N·s"], 1,
      "**Paso 1.** J = F Δt = 10·0,40 = 4,0 N·s. **Respuesta correcta: B.**", S10, "fis-s10"),
    Q("fis-d2-26", "fis", 26, "4.2.2-impulso", "f10", "Impulso",
      "La rapidez final es:",
      ["1,0 m/s", "2,0 m/s", "4,0 m/s", "8,0 m/s"], 1,
      "**Paso 1.** Δp = mv = 4,0 ⇒ v = 2,0 m/s. **Respuesta correcta: B.**", S10, "fis-s10"),
]

S11 = "Una bola se cae de un avión que vuela en horizontal a 80 m/s. En el instante en que se suelta, la velocidad vertical de la bola respecto del avión es cero. g = 10 m/s²."
fis_qs += [
    Q("fis-d2-27", "fis", 27, "4.2.1-proyectiles", "f6", "Avión",
      "Justo después de soltarse, la velocidad horizontal de la bola respecto del suelo es:",
      ["0", "40 m/s", "80 m/s", "depende de la altura"], 2,
      "**Paso 1.** Inercia: conserva 80 m/s horizontal. **Respuesta correcta: C.**", S11, "fis-s11"),
    Q("fis-d2-28", "fis", 28, "4.2.1-proyectiles", "f6", "Avión",
      "A los 3,0 s de caída (sin aire), la rapidez es aproximadamente:",
      ["30 m/s", "80 m/s", "85 m/s", "110 m/s"], 2,
      "**Paso 1.** vx=80, vy=30. **Paso 2.** v=√(6400+900)=√7300≈85 m/s. **Respuesta correcta: C.**", S11, "fis-s11"),
]

S12 = "Un motor iza 40 kg a velocidad constante de 0,50 m/s. g = 10 m/s²."
fis_qs += [
    Q("fis-d2-29", "fis", 29, "4.2.3-trabajo", "f11", "Potencia",
      "La potencia del motor es:",
      ["20 W", "100 W", "200 W", "400 W"], 2,
      "**Paso 1.** P = Fv = mgv = 400·0,50 = 200 W. **Respuesta correcta: C.**", S12, "fis-s12"),
    Q("fis-d2-30", "fis", 30, "4.2.3-trabajo", "f11", "Trabajo",
      "El trabajo del motor en 6,0 s es:",
      ["200 J", "600 J", "1200 J", "2400 J"], 2,
      "**Paso 1.** W = P t = 200·6 = 1200 J. **Respuesta correcta: C.**", S12, "fis-s12"),
]

S13 = "Choque 1D inelástico: 2,0 kg a 4,0 m/s choca y se pega a 3,0 kg en reposo. No hay fricción."
fis_qs += [
    Q("fis-d2-31", "fis", 31, "4.2.2-impulso", "f10", "Choque",
      "La velocidad común después del choque es:",
      ["0,80 m/s", "1,6 m/s", "2,0 m/s", "4,0 m/s"], 1,
      "**Paso 1.** 2·4 = 5 v ⇒ v = 1,6 m/s. **Respuesta correcta: B.**", S13, "fis-s13"),
    Q("fis-d2-32", "fis", 32, "4.2.3-energia", "f12", "Choque",
      "La energía cinética que se disipa es:",
      ["1,6 J", "6,4 J", "9,6 J", "16 J"], 2,
      "**Paso 1.** K0=16 J. Kf=½·5·2,56=6,4 J. **Paso 2.** ΔK=9,6 J. **Respuesta correcta: C.**", S13, "fis-s13"),
]

S14 = "MCU: un móvil recorre una circunferencia de radio 2,0 m con periodo 2,0 s. Use π² ≈ 10."
fis_qs += [
    Q("fis-d2-33", "fis", 33, "4.2.2-circular", "f7", "MCU",
      "La aceleración centrípeta es:",
      ["5,0 m/s²", "10 m/s²", "20 m/s²", "40 m/s²"], 2,
      "**Paso 1.** ac = 4π²r/T² = 4·10·2 / 4 = 20 m/s². **Respuesta correcta: C.**", S14, "fis-s14"),
    Q("fis-d2-34", "fis", 34, "4.2.2-circular", "f7", "MCU",
      "La rapidez tangencial es aproximadamente:",
      ["π m/s", "2π m/s", "4π m/s", "π/2 m/s"], 1,
      "**Paso 1.** v = 2πr/T = 2π·2 / 2 = 2π m/s. **Respuesta correcta: B.**", S14, "fis-s14"),
]

# 6 more standalones to reach 40
fis_qs += [
    Q("fis-d2-35", "fis", 35, "4.2.1-mru", "f4", "MRU",
      "Un móvil recorre 120 m en 15 s a rapidez constante y luego frena 5,0 s con a = −2,0 m/s². La rapidez inicial del frenado es la del tramo uniforme. ¿Cuánto avanza mientras frena?",
      ["20 m", "30 m", "40 m", "80 m"], 1,
      "**Paso 1.** v = 120/15 = 8,0 m/s. **Paso 2.** Δx = 8·5 + ½(−2)·25 = 40−25 = 15? Recalc: 40-25=15, not in options. FIX: a=-1.6? Let's use a=-2, t=4 s: Δx=8*4-0.5*2*16=32-16=16. Better: t=5, a=-2, v=8, Δx=8*5-25=15. Change options.",
      None, "fis-s15"),
]

# I'll fix 35-40 as clean standalones
fis_qs = [q for q in fis_qs if q["id"] != "fis-d2-35"]
fis_qs += [
    Q("fis-d2-35", "fis", 35, "4.2.1-mru", "f4", "MRU-MRUV",
      "Un móvil va a 8,0 m/s y frena 4,0 s con a = −2,0 m/s². El desplazamiento durante el frenado es:",
      ["8,0 m", "16 m", "24 m", "32 m"], 1,
      "**Paso 1.** Δx = v0 t + ½ a t² = 32 − 16 = 16 m. **Respuesta correcta: B.**", None, "fis-s15"),
    Q("fis-d2-36", "fis", 36, "4.2.1-vectores", "f1", "Vectores",
      "Dos fuerzas, 8,0 N al este y 6,0 N al norte, actúan sobre un cuerpo. La magnitud de la resultante es:",
      ["2,0 N", "7,0 N", "10 N", "14 N"], 2,
      "**Paso 1.** √(64+36)=10 N. **Respuesta correcta: C.**", None, "fis-s16"),
    Q("fis-d2-37", "fis", 37, "4.2.2-grav", "f7", "Peso",
      "En un planeta donde g = 4,0 m/s², el peso de 5,0 kg es:",
      ["5,0 N", "9,8 N", "20 N", "49 N"], 2,
      "**Paso 1.** W = mg = 20 N. **Respuesta correcta: C.**", None, "fis-s16"),
    Q("fis-d2-38", "fis", 38, "4.2.3-energia", "f12", "Conservación",
      "Un trineo de 10 kg baja 5,0 m de altura sin fricción. Su energía cinética al pie es:",
      ["50 J", "250 J", "500 J", "1000 J"], 2,
      "**Paso 1.** K = mgh = 10·10·5 = 500 J. **Respuesta correcta: C.**", None, "fis-s16"),
    Q("fis-d2-39", "fis", 39, "4.2.1-mru", "f4", "Gráfica v-t",
      "En una gráfica v-t, un trapecio de bases 4,0 m/s y 10 m/s y duración 3,0 s representa un desplazamiento de:",
      ["12 m", "21 m", "30 m", "42 m"], 1,
      "**Paso 1.** Área = [(4+10)/2]·3 = 21 m. **Respuesta correcta: B.**", None, "fis-s16"),
    Q("fis-d2-40", "fis", 40, "4.2.2-3raNewton", "f8", "Newton 3",
      "Un nadador empuja la pared de la piscina con 120 N. La pared empuja al nadador con:",
      ["0, porque la pared no se mueve", "menos de 120 N", "120 N", "más de 120 N"], 2,
      "**Paso 1.** Tercera ley: par de acción-reacción, misma magnitud. **Respuesta correcta: C.**", None, "fis-s16"),
]

# ---------- QUÍMICA (40 sueltas, estilo 69 + Barreno) ----------
qui_qs = [
    Q("qui-d2-01", "qui", 1, "4.3.3-lewis", "q11", "Lewis",
      "La estructura de Lewis del NH₃ presenta:",
      ["3 pares enlazantes y 1 par libre sobre N", "4 pares enlazantes y 0 pares libres", "2 pares enlazantes y 2 libres", "1 par enlazante y 3 libres"], 0,
      "**Paso 1.** N tiene 5 e⁻ de valencia; 3 H aportan 3. **Paso 2.** Tres enlaces N–H y un par libre. **Respuesta correcta: A.**"),
    Q("qui-d2-02", "qui", 2, "4.3.4-esteq", "q17", "Estequiometría",
      "Fe + 2 HCl → FeCl₂ + H₂. Con 5,6 g de Fe (56 g/mol) y HCl en exceso, la masa de FeCl₂ (127 g/mol) es:",
      ["6,35 g", "12,7 g", "25,4 g", "56 g"], 1,
      "**Paso 1.** n(Fe)=0,10 mol ⇒ n(FeCl₂)=0,10 mol. **Paso 2.** m=12,7 g. **Respuesta correcta: B.**"),
    Q("qui-d2-03", "qui", 3, "4.3.4-reacciones", "q16", "Tipos",
      "¿Cuál es una descomposición?",
      ["2 H₂ + O₂ → 2 H₂O", "CaCO₃ → CaO + CO₂", "NaCl + AgNO₃ → AgCl + NaNO₃", "2 Mg + O₂ → 2 MgO"], 1,
      "**Paso 1.** Un reactivo produce dos productos. **Respuesta correcta: B.**"),
    Q("qui-d2-04", "qui", 4, "4.3.4-mol", "q13", "Masa molar",
      "La masa molar de KH₂PO₄ (K=39, H=1, P=31, O=16) es:",
      ["97 g/mol", "136 g/mol", "174 g/mol", "215 g/mol"], 1,
      "**Paso 1.** 39+2+31+64=136. **Respuesta correcta: B.**"),
    Q("qui-d2-05", "qui", 5, "4.3.2-nomenclatura", "q8", "Nomenclatura",
      "El óxido niqueloso (Ni²⁺) es:",
      ["NiO", "Ni₂O₃", "NiO₂", "Ni₂O"], 0,
      "**Paso 1.** Ni²⁺ y O²⁻ ⇒ NiO. **Respuesta correcta: A.**"),
    Q("qui-d2-06", "qui", 6, "4.3.1-particulas", "q3", "Isótopos",
      "Un elemento de masa atómica 186,2 u tiene un isótopo de 187 u con abundancia 60 %. El otro isótopo, si solo hay dos, tiene masa aproximada:",
      ["184 u", "185 u", "186 u", "188 u"], 1,
      "**Paso 1.** 186,2 = 0,60·187 + 0,40·x ⇒ 186,2 = 112,2 + 0,40x ⇒ 74 = 0,40x ⇒ x = 185. **Respuesta correcta: B.**"),
    Q("qui-d2-07", "qui", 7, "4.3.1-unidades", "q1", "Unidades",
      "Se tienen 10,0 L de reactivo y se envasan frascos de 25 mL. El número de frascos es:",
      ["40", "250", "400", "4000"], 2,
      "**Paso 1.** 10,0 L = 10 000 mL. **Paso 2.** 10000/25 = 400. **Respuesta correcta: C.**"),
    Q("qui-d2-08", "qui", 8, "4.3.2-nomenclatura", "q8", "Sales",
      "¿Cuál es una sal inorgánica neutra?",
      ["HCl", "NaOH", "Na₂SO₄", "H₂SO₄"], 2,
      "**Paso 1.** Sal = catión + anión, sin H ácido ni OH. **Respuesta correcta: C.**"),
    Q("qui-d2-09", "qui", 9, "4.3.3-enlace", "q10", "Covalente",
      "Poseen enlace covalente:",
      ["NaCl y CaO", "CO₂ y H₂O", "KBr y MgO", "LiF y Na₂O"], 1,
      "**Paso 1.** No metales entre sí: CO₂ y H₂O. **Respuesta correcta: B.**"),
    Q("qui-d2-10", "qui", 10, "4.3.4-reacciones", "q16", "Redox",
      "En Zn + 2 HCl → ZnCl₂ + H₂, el zinc:",
      ["se reduce (gana e⁻)", "se oxida (pierde e⁻)", "no cambia su Nox", "es el medio ácido"], 1,
      "**Paso 1.** Zn⁰ → Zn²⁺. **Respuesta correcta: B.**"),
    Q("qui-d2-11", "qui", 11, "4.3.4-reacciones", "q16", "Redox",
      "El hidrógeno se oxida en:",
      ["2 HCl → H₂ + Cl₂ (si H pasa de +1 a 0, se reduce)", "2 H₂ + O₂ → 2 H₂O", "H⁺ + OH⁻ → H₂O", "NaCl → Na⁺ + Cl⁻"], 1,
      "**Paso 1.** En 2 H₂ + O₂ → 2 H₂O, H pasa de 0 a +1. **Respuesta correcta: B.**"),
    Q("qui-d2-12", "qui", 12, "4.3.4-esteq", "q17", "Gases",
      "¿Qué volumen de NH₃ (CNPT, 22,4 L/mol) se necesita para obtener 0,50 mol de N₂ si 2 NH₃ → N₂ + 3 H₂?",
      ["5,6 L", "11,2 L", "22,4 L", "44,8 L"], 2,
      "**Paso 1.** 0,50 mol N₂ exige 1,0 mol NH₃. **Paso 2.** 22,4 L. **Respuesta correcta: C.**"),
    Q("qui-d2-13", "qui", 13, "4.3.3-enlace", "q10", "Iónico",
      "Característica típica de un sólido iónico:",
      ["Bajo punto de fusión y conduce en estado sólido", "Alto punto de fusión y conduce fundido o en disolución", "Es blando y volátil", "Es un gas a 25 °C"], 1,
      "**Paso 1.** Red iónica: alto Pf; iones móviles solo fundido/disuelto. **Respuesta correcta: B.**"),
    Q("qui-d2-14", "qui", 14, "4.3.4-esteq", "q17", "Limitante",
      "Zn + 2 HCl → ZnCl₂ + H₂. Se mezclan 0,10 mol Zn y 0,10 mol HCl. El H₂ formado (CNPT) es:",
      ["1,12 L", "2,24 L", "4,48 L", "22,4 L"], 0,
      "**Paso 1.** HCl limita: 0,10 mol HCl → 0,05 mol H₂. **Paso 2.** 1,12 L. **Respuesta correcta: A.**"),
    Q("qui-d2-15", "qui", 15, "4.3.3-enlace", "q10", "Iónico",
      "Presenta enlace iónico:",
      ["O₂", "N₂", "KCl", "Cl₂"], 2,
      "**Paso 1.** Metal + no metal. **Respuesta correcta: C.**"),
    Q("qui-d2-16", "qui", 16, "4.3.4-reacciones", "q16", "Nox",
      "En K₂Cr₂O₇ el Nox del cromo es:",
      ["+3", "+6", "+7", "+12"], 1,
      "**Paso 1.** 2(+1) + 2x + 7(−2)=0 ⇒ 2 + 2x − 14 = 0 ⇒ 2x=12 ⇒ x=+6. **Respuesta correcta: B.**"),
    Q("qui-d2-17", "qui", 17, "4.3.1-unidades", "q1", "Presión",
      "Un medidor marca 760 mm Hg a nivel del mar. En Quito la presión es 0,72 atm. Equivale a:",
      ["547 mm Hg", "720 mm Hg", "760 mm Hg", "1056 mm Hg"], 0,
      "**Paso 1.** 0,72·760 = 547 mm Hg. **Respuesta correcta: A.**"),
    Q("qui-d2-18", "qui", 18, "4.3.2-nomenclatura", "q8", "Peróxido",
      "El peróxido de sodio es:",
      ["NaO", "Na₂O", "Na₂O₂", "NaO₂"], 2,
      "**Paso 1.** Peróxido: O₂²⁻ con Na⁺ ⇒ Na₂O₂. **Respuesta correcta: C.**"),
    Q("qui-d2-19", "qui", 19, "4.3.1-materia", "q2", "Clasificación",
      "Cristales blancos, Pf = 800 °C, conducen fundidos y no en sólido. Lo más coherente es:",
      ["Un metal", "Un sólido iónico", "Un gas molecular", "Un polímero covalente blando"], 1,
      "**Paso 1.** Alto Pf + conduce solo fundido = iónico. **Respuesta correcta: B.**"),
    Q("qui-d2-20", "qui", 20, "4.3.2-nomenclatura", "q8", "CO2",
      "El anhídrido carbónico es:",
      ["CO", "CO₂", "C₂O", "H₂CO₃"], 1,
      "**Paso 1.** Anhídrido carbónico = CO₂. **Respuesta correcta: B.**"),
    Q("qui-d2-21", "qui", 21, "4.3.1-electronica", "q5", "Configuración",
      "Fe²⁺ (Z=26) tiene configuración:",
      ["[Ar] 4s² 3d⁶", "[Ar] 3d⁶", "[Ar] 4s² 3d⁴", "[Ar] 3d⁸"], 1,
      "**Paso 1.** Fe: [Ar] 4s² 3d⁶; se pierden primero los 4s. **Respuesta correcta: B.**"),
    Q("qui-d2-22", "qui", 22, "4.3.2-propiedades", "q7", "Radio",
      "Entre O²⁻, F⁻, Na⁺ y Mg²⁺ (isoelectrónicos), el de mayor radio es:",
      ["Mg²⁺", "Na⁺", "F⁻", "O²⁻"], 3,
      "**Paso 1.** Misma nube; menos Z efectivo ⇒ más radio: O²⁻. **Respuesta correcta: D.**"),
    Q("qui-d2-23", "qui", 23, "4.3.3-lewis", "q11", "Lewis",
      "En CO₂, el Nox del carbono y la geometría son:",
      ["+2, angular", "+4, lineal", "0, tetraédrica", "+4, piramidal"], 1,
      "**Paso 1.** O es −2; C es +4. **Paso 2.** O=C=O lineal. **Respuesta correcta: B.**"),
    Q("qui-d2-24", "qui", 24, "4.3.3-fuerzas", "q14", "IMF",
      "El mayor punto de ebullición corresponde a:",
      ["H₂S", "H₂Se", "H₂Te", "H₂O"], 3,
      "**Paso 1.** H₂O tiene puentes de hidrógeno. **Respuesta correcta: D.**"),
    Q("qui-d2-25", "qui", 25, "4.3.4-empirica", "q15", "Empírica",
      "Un óxido tiene 40 % C, 6,7 % H y 53,3 % O. La fórmula empírica es:",
      ["CHO", "CH₂O", "C₂H₂O", "CH₃O"], 1,
      "**Paso 1.** 40/12=3,33; 6,7/1=6,7; 53,3/16=3,33 → CH₂O. **Respuesta correcta: B.**"),
    Q("qui-d2-26", "qui", 26, "4.3.4-empirica", "q15", "Molecular",
      "Si la empírica es CH₂O y la masa molar es 180 g/mol, la molecular es:",
      ["C₂H₄O₂", "C₃H₆O₃", "C₆H₁₂O₆", "CH₂O"], 2,
      "**Paso 1.** 30 n = 180 ⇒ n=6. **Respuesta correcta: C.**"),
    Q("qui-d2-27", "qui", 27, "4.3.4-esteq", "q17", "Combustión",
      "C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O. 2,2 g de C₃H₈ (44 g/mol) producen:",
      ["1,5 g de CO₂", "3,3 g de CO₂", "6,6 g de CO₂", "13,2 g de CO₂"], 2,
      "**Paso 1.** 0,050 mol C₃H₈ → 0,15 mol CO₂ = 6,6 g. **Respuesta correcta: C.**"),
    Q("qui-d2-28", "qui", 28, "4.3.4-esteq", "q17", "Limitante",
      "2 Al + 3 Cl₂ → 2 AlCl₃. 5,4 g Al (27 g/mol) y 10,65 g Cl₂ (71 g/mol). Masa de AlCl₃ (133,5 g/mol):",
      ["6,68 g", "13,35 g", "26,7 g", "53,4 g"], 1,
      "**Paso 1.** n(Al)=0,20; n(Cl₂)=0,15. **Paso 2.** Cl₂ limita: 0,15·(2/3)=0,10 mol AlCl₃ = 13,35 g. **Respuesta correcta: B.**"),
    Q("qui-d2-29", "qui", 29, "4.3.4-mol", "q13", "Molaridad",
      "H₂SO₄ 98 % m/m, d = 1,84 g/mL. La molaridad es aproximadamente:",
      ["1,8 M", "9,2 M", "18 M", "36 M"], 2,
      "**Paso 1.** 1 L → 1840 g; 0,98·1840/98 = 18,4 mol. **Respuesta correcta: C.**"),
    Q("qui-d2-30", "qui", 30, "4.3.4-esteq", "q17", "Gases",
      "N₂ + 3 H₂ → 2 NH₃. Se mezclan 6,0 L de N₂ y 6,0 L de H₂ (mismas T, P). Volumen de NH₃:",
      ["2,0 L", "4,0 L", "6,0 L", "12 L"], 1,
      "**Paso 1.** H₂ limita (razón 1:3). **Paso 2.** 6 L H₂ → 4 L NH₃. **Respuesta correcta: B.**"),
    Q("qui-d2-31", "qui", 31, "4.3.1-electronica", "q5", "Iones",
      "²⁷Al³⁺ tiene:",
      ["13 p, 14 n, 13 e⁻", "13 p, 14 n, 10 e⁻", "13 p, 27 n, 10 e⁻", "10 p, 14 n, 13 e⁻"], 1,
      "**Paso 1.** Z=13; A−Z=14; e⁻=13−3=10. **Respuesta correcta: B.**"),
    Q("qui-d2-32", "qui", 32, "4.3.3-lewis", "q12", "Geometría",
      "La geometría de SF₄ (VSEPR) es:",
      ["Tetraédrica", "Balancín (seesaw)", "Plana cuadrada", "Lineal"], 1,
      "**Paso 1.** 5 pares (4 enlaces + 1 libre) → trigonal bipiramidal con un par libre = balancín. **Respuesta correcta: B.**"),
    Q("qui-d2-33", "qui", 33, "4.3.4-mol", "q13", "Avogadro",
      "11,2 L de O₃ en CNPT contienen aproximadamente:",
      ["0,25 mol de moléculas", "0,50 mol de moléculas", "1,0 mol de moléculas", "3,0 mol de moléculas"], 1,
      "**Paso 1.** 11,2/22,4 = 0,50 mol. **Respuesta correcta: B.**"),
    Q("qui-d2-34", "qui", 34, "4.3.1-materia", "q2", "Procesos",
      "Es un cambio químico:",
      ["Fundir hielo", "Disolver azúcar", "Quemar etanol", "Sublimación del yodo"], 2,
      "**Paso 1.** Combustión forma sustancias nuevas. **Respuesta correcta: C.**"),
    Q("qui-d2-35", "qui", 35, "4.3.2-nomenclatura", "q8", "Nomenclatura",
      "Fe₂(SO₄)₃ se nombra:",
      ["Sulfito de hierro(II)", "Sulfato de hierro(III)", "Sulfuro de hierro(III)", "Sulfato de hierro(II)"], 1,
      "**Paso 1.** SO₄²⁻ sulfato; 2 Fe equilibran 3·(−2) ⇒ Fe³⁺. **Respuesta correcta: B.**"),
    Q("qui-d2-36", "qui", 36, "4.3.4-esteq", "q17", "Rendimiento",
      "Si el teórico de un producto es 20,0 g y se obtienen 16,0 g, el rendimiento es:",
      ["16 %", "20 %", "80 %", "125 %"], 2,
      "**Paso 1.** 16/20·100 = 80 %. **Respuesta correcta: C.**"),
    Q("qui-d2-37", "qui", 37, "4.3.4-mol", "q13", "Molaridad",
      "200 mL de solución 0,25 mol/L contienen:",
      ["0,025 mol", "0,050 mol", "0,25 mol", "1,25 mol"], 1,
      "**Paso 1.** 0,200·0,25 = 0,050 mol. **Respuesta correcta: B.**"),
    Q("qui-d2-38", "qui", 38, "4.3.3-fuerzas", "q14", "IMF",
      "Entre I₂, Br₂ y F₂ (mismo grupo), el mayor Pf es de I₂ porque:",
      ["Tiene puentes de hidrógeno", "Sus fuerzas de London son mayores (más e⁻)", "Es iónico", "Es el más pequeño"], 1,
      "**Paso 1.** London crece con polarizabilidad. **Respuesta correcta: B.**"),
    Q("qui-d2-39", "qui", 39, "4.3.1-electronica", "q5", "Valencia",
      "El grupo A de un átomo ns² np⁴ es:",
      ["IVA", "VA", "VIA", "VIIA"], 2,
      "**Paso 1.** 2+4=6 e⁻ de valencia ⇒ VIA. **Respuesta correcta: C.**"),
    Q("qui-d2-40", "qui", 40, "4.3.4-reacciones", "q16", "Igualación",
      "Al igualar C₃H₈ + O₂ → CO₂ + H₂O en enteros mínimos, el coeficiente de O₂ es:",
      ["3", "4", "5", "6"], 2,
      "**Paso 1.** C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O. **Respuesta correcta: C.**"),
]


def packs_from(prefix, groups):
    """groups: list of (pack_id, first_n, last_n) inclusive, ids like prefix-01."""
    out = []
    for pid, a, b in groups:
        qids = []
        for i in range(a, b + 1):
            qids.append(f"{prefix}-{i:02d}")
        out.append({"id": pid, "qids": qids})
    return out


def main():
    fis_packs = packs_from("fis-d2", [
        ("fis-s1", 1, 4), ("fis-s2", 5, 8), ("fis-s3", 9, 11), ("fis-s4", 12, 14),
        ("fis-s5", 15, 16), ("fis-s6", 17, 18), ("fis-s7", 19, 20), ("fis-s8", 21, 22),
        ("fis-s9", 23, 24), ("fis-s10", 25, 26), ("fis-s11", 27, 28), ("fis-s12", 29, 30),
        ("fis-s13", 31, 32), ("fis-s14", 33, 34), ("fis-s15", 35, 35), ("fis-s16", 36, 40),
    ])
    data = {
        "fis": fis_qs,
        "qui": qui_qs,
        "len": len_qs,
        "packs": {"len": len_packs, "fis": fis_packs, "qui": []},
        "meta": {
            "formato": "Día 2 oficial: LEN textos compartidos, FIS casos compartidos, QUI sueltas. Bloques LEN→FIS→QUI. 20+20+20. 120 min.",
            "fuentes": "guia_estudio_2026-1.pdf, SIMULADOR-EPN-69, exámenes de nivelación Barreno (estilo, no ítems copiados).",
        },
    }
    assert len(len_qs) == 40, len(len_qs)
    assert len(fis_qs) == 40, len(fis_qs)
    assert len(qui_qs) == 40, len(qui_qs)
    js = (
        "/* Banco Día 2 formato real — 40+40+40. No sustituye al 15+15+15 ni al oficial 69.\n"
        "   window.GUIA_BANK_FQL_DIA2 */\n"
        "window.GUIA_BANK_FQL_DIA2 = "
        + json.dumps(data, ensure_ascii=False, indent=2)
        + ";\n"
    )
    OUT.write_text(js, encoding="utf-8")
    print("wrote", OUT, "len", len(len_qs), "fis", len(fis_qs), "qui", len(qui_qs))


if __name__ == "__main__":
    main()

