/* Banco avanzado F/Q/L — 132 preguntas originales, nivel por encima del simulador oficial 69P.
   No sustituye a guia-bank-1000-intermedio.js. Usado solo por los simuladores *_avz. */
window.GUIA_BANK_FQL_AVANZADO = {
  "fis": [
    {
      "id": "fis-avz-01",
      "s": "fis",
      "n": 1,
      "d": "experto",
      "topics": [
        "4.2.1-mru"
      ],
      "ch": "f4",
      "t": "Gráficas de movimiento",
      "prompt": "En una práctica de laboratorio se registra la velocidad de un carrito que se mueve sobre una pista recta. La gráfica v-t presenta tres tramos consecutivos: primero acelera, luego mantiene velocidad constante y finalmente frena hasta invertir brevemente el sentido del movimiento. De t=0 a 4 s, la velocidad aumenta linealmente de 2 m/s a 10 m/s. De 4 s a 7 s, permanece en 10 m/s. De 7 s a 9 s, disminuye linealmente desde 10 m/s hasta −2 m/s. Las áreas por debajo del eje deben contarse con signo negativo. Determine el desplazamiento neto del carrito entre t=0 y t=9 s. No se pide la distancia total recorrida.",
      "opts": [
        "46 m",
        "54 m",
        "62 m",
        "70 m",
        "78 m"
      ],
      "ans": 2,
      "exp": "**Paso 1.** Qué se debe interpretar: en una gráfica velocidad–tiempo, el desplazamiento es el área algebraica bajo la curva. **Paso 2.** Tramo 1: es un trapecio: Δx₁=[(2+10)/2](4)=24 m. **Paso 3.** Tramo 2: es un rectángulo: Δx₂=(10)(7−4)=30 m. **Paso 4.** Tramo 3: como la velocidad cambia linealmente, puede usarse la velocidad media: Δx₃=[(10+(−2))/2](2)=8 m. **Paso 5.** Suma: Δx=24+30+8=62 m. **Paso 6.** Por qué no se usa el área sin signo: al final existe una pequeña porción con velocidad negativa; la fórmula de velocidad media ya la resta correctamente. **Paso 7.** Conclusión: el desplazamiento neto es 62 m. **Respuesta correcta: C. 62 m**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "fis-avz-02",
      "s": "fis",
      "n": 2,
      "d": "experto",
      "topics": [
        "4.2.2-rozamiento"
      ],
      "ch": "f9",
      "t": "Rozamiento y trabajo",
      "prompt": "Una caja se encuentra inicialmente en reposo sobre un piso horizontal rugoso. Una persona la hala mediante una cuerda inclinada hacia arriba. La componente vertical de la tensión reduce la fuerza normal y, por tanto, también modifica el rozamiento cinético. La masa de la caja es 5,0 kg; la fuerza aplicada es 30 N a 37° sobre la horizontal; el desplazamiento es 4,0 m; μk=0,20; g=10 m/s²; sin37°=0,60 y cos37°=0,80. La fuerza se mantiene constante. Calcule la rapidez de la caja después de recorrer los 4,0 m.",
      "opts": [
        "3,2 m/s",
        "4,0 m/s",
        "5,3 m/s",
        "6,9 m/s",
        "8,0 m/s"
      ],
      "ans": 2,
      "exp": "**Paso 1.** Componentes de la fuerza: Fx=30(0,80)=24 N; Fy=30(0,60)=18 N hacia arriba. **Paso 2.** Normal: no hay aceleración vertical: N+18−mg=0. Como mg=50 N, N=32 N. **Paso 3.** Rozamiento: fk=μkN=0,20(32)=6,4 N. **Paso 4.** Fuerza horizontal neta: Fnet=24−6,4=17,6 N. **Paso 5.** Trabajo neto: Wnet=Fnet d=17,6(4)=70,4 J. **Paso 6.** Trabajo–energía: parte del reposo, entonces 70,4=1/2(5)v². De aquí, v²=28,16 y v≈5,31 m/s. Control físico: la rapidez debe ser menor que la obtenida sin rozamiento. Conclusión: v≈5,3 m/s. **Respuesta correcta: C. 5,3 m/s**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "fis-avz-03",
      "s": "fis",
      "n": 3,
      "d": "experto",
      "topics": [
        "4.2.2-2daNewton"
      ],
      "ch": "f7",
      "t": "Sistemas de cuerpos",
      "prompt": "Dos bloques permanecen en contacto sobre una mesa horizontal perfectamente lisa. Una fuerza externa empuja únicamente al bloque más pesado, pero ambos se desplazan juntos con la misma aceleración. El primer bloque tiene masa 3 kg, el segundo 2 kg y la fuerza externa horizontal es 20 N. Se desprecia el rozamiento y la cuerda no interviene: el contacto directo es la única fuerza horizontal que acelera al bloque de 2 kg. Determine la magnitud de la fuerza que el bloque de 3 kg ejerce sobre el bloque de 2 kg.",
      "opts": [
        "4 N",
        "8 N",
        "10 N",
        "12 N",
        "20 N"
      ],
      "ans": 1,
      "exp": "**Paso 1.** Analizar el sistema completo: la masa total es 3+2=5 kg. **Paso 2.** Aceleración común: a=F/mT=20/5=4 m/s². **Paso 3.** Aislar el bloque de 2 kg: sobre él, en horizontal, solo actúa la fuerza de contacto. **Paso 4.** Segunda ley para ese bloque: Fc=m₂a=(2)(4)=8 N. Comprobación con el bloque de 3 kg: 20−8=12 N y 12/3=4 m/s². Distractor de 12 N: es la fuerza neta sobre el bloque de 3 kg, no la fuerza de contacto sobre el de 2 kg. Conclusión: la fuerza solicitada es 8 N. **Respuesta correcta: B. 8 N**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "fis-avz-04",
      "s": "fis",
      "n": 4,
      "d": "experto",
      "topics": [
        "4.2.1-proyectiles"
      ],
      "ch": "f6",
      "t": "Proyectiles",
      "prompt": "Desde el nivel del suelo se lanza una pelota hacia un muro vertical. Para decidir si la pelota choca o pasa por encima, primero debe determinarse el instante en que alcanza la posición horizontal del muro y luego calcular su altura en ese mismo instante. La rapidez inicial es 25 m/s con ángulo 37°; use v₀x=20 m/s, v₀y=15 m/s y g=10 m/s². El muro está a 30 m del lanzamiento y mide 10 m. Desprecie el aire. Indique qué ocurre cuando la pelota llega al plano vertical del muro.",
      "opts": [
        "Choca con el muro a 5,0 m de altura",
        "Choca con el muro a 8,75 m de altura",
        "Roza exactamente el borde superior",
        "Supera el muro por 1,25 m",
        "Supera el muro por 5,0 m"
      ],
      "ans": 3,
      "exp": "**Paso 1.** Tiempo hasta el muro: x=v₀xt; 30=20t; por tanto t=1,5 s. **Paso 2.** Altura a ese tiempo: y=v₀yt−1/2 gt². **Paso 3.** Sustitución: y=15(1,5)−5(1,5)²=22,5−11,25=11,25 m. **Paso 4.** Comparación: el muro mide 10 m; el margen es 11,25−10=1,25 m. Conclusión: la pelota supera el muro por 1,25 m. **Respuesta correcta: D. Supera el muro por 1,25 m**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "fis-avz-05",
      "s": "fis",
      "n": 5,
      "d": "experto",
      "topics": [
        "4.2.2-grav"
      ],
      "ch": "f8",
      "t": "Gravedad y órbitas",
      "prompt": "Un satélite describe una órbita circular alrededor de un planeta esférico. Se desea comparar las magnitudes a una distancia grande con las que tendría un satélite hipotético en una órbita circular de radio igual al radio del planeta. La nueva órbita tiene radio 4R, medido desde el centro del planeta. La masa del planeta no cambia. Recuerde que g(r)=GM/r² y que, para una órbita circular, v=√(GM/r). Seleccione la pareja que indica correctamente la nueva aceleración gravitatoria y la nueva rapidez orbital respecto de los valores g y v en r=R.",
      "opts": [
        "g/4 y v/4",
        "g/16 y v/2",
        "g/16 y v/4",
        "g/8 y v/2",
        "g/4 y v/2"
      ],
      "ans": 1,
      "exp": "**Paso 1.** Gravedad: g(4R)/g(R)=R²/(4R)²=1/16. **Paso 2.** Rapidez orbital: v(4R)/v(R)=√[R/(4R)]=√(1/4)=1/2. **Paso 3.** Interpretación: la gravedad disminuye con el cuadrado, mientras la rapidez orbital disminuye con la raíz cuadrada de la distancia. Conclusión: la pareja correcta es g/16 y v/2. **Respuesta correcta: B. g/16 y v/2**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "fis-avz-06",
      "s": "fis",
      "n": 6,
      "d": "experto",
      "topics": [
        "4.2.2-circular"
      ],
      "ch": "f11",
      "t": "Movimiento circular",
      "prompt": "Un automóvil toma una curva horizontal sin peralte. La única fuerza horizontal capaz de producir la aceleración centrípeta es el rozamiento estático entre los neumáticos y la carretera. Si la rapidez es demasiado alta, el vehículo comenzará a deslizar hacia afuera. Radio de la curva: 50 m; coeficiente de rozamiento estático: 0,50; g=10 m/s². Suponga que la carretera está seca y que el automóvil puede modelarse como una partícula. Calcule la rapidez máxima con la que el automóvil puede tomar la curva sin deslizar.",
      "opts": [
        "5,0 m/s",
        "10,0 m/s",
        "15,8 m/s",
        "25,0 m/s",
        "50,0 m/s"
      ],
      "ans": 2,
      "exp": "**Paso 1.** Fuerza disponible: fs,max=μsN=μsmg porque N=mg. **Paso 2.** Fuerza requerida: Fc=mv²/r. **Paso 3.** Condición límite: μsmg=mv²/r; se cancela la masa. **Paso 4.** Despeje: v=√(μsgr)=√(0,50×10×50)=√250. **Paso 5.** Resultado: v≈15,81 m/s. Conclusión: la rapidez máxima es aproximadamente 15,8 m/s. **Respuesta correcta: C. 15,8 m/s**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "fis-avz-07",
      "s": "fis",
      "n": 7,
      "d": "experto",
      "topics": [
        "4.2.3-trabajo"
      ],
      "ch": "f13",
      "t": "Trabajo y potencia",
      "prompt": "Un bloque en movimiento choca frontalmente con otro bloque inicialmente en reposo. Después del impacto quedan unidos y avanzan como un solo cuerpo. En este tipo de choque se conserva el momento lineal, pero no la energía cinética. El primer bloque tiene masa 1 kg y rapidez 6 m/s; el segundo tiene masa 2 kg y está en reposo. No actúan impulsos externos horizontales apreciables. Determine cuánta energía cinética se transforma en deformación, sonido y calor durante el choque.",
      "opts": [
        "4 J",
        "6 J",
        "8 J",
        "12 J",
        "18 J"
      ],
      "ans": 3,
      "exp": "**Paso 1.** Momento inicial: pi=(1)(6)+(2)(0)=6 kg·m/s. **Paso 2.** Rapidez final común: vf=pi/(1+2)=6/3=2 m/s. **Paso 3.** Energía inicial: Ki=1/2(1)(6²)=18 J. **Paso 4.** Energía final: Kf=1/2(3)(2²)=6 J. **Paso 5.** Energía transformada: Ki−Kf=18−6=12 J. Conclusión: se transforman 12 J; la energía total se conserva, pero la cinética no. **Respuesta correcta: D. 12 J**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "fis-avz-08",
      "s": "fis",
      "n": 8,
      "d": "experto",
      "topics": [
        "4.2.3-energia"
      ],
      "ch": "f16",
      "t": "Conservación de energía",
      "prompt": "Durante el golpe de una raqueta, la fuerza sobre una pelota no es constante. Aumenta linealmente desde cero hasta un máximo y luego disminuye linealmente hasta cero, por lo que la gráfica F-t tiene forma triangular. La fuerza máxima es 600 N; el contacto comienza en t=0 y termina en 0,040 s; la pelota tiene masa 0,50 kg y estaba inicialmente en reposo. Ignore el peso durante el breve contacto. Calcule la rapidez de la pelota inmediatamente después del golpe.",
      "opts": [
        "6 m/s",
        "12 m/s",
        "18 m/s",
        "24 m/s",
        "48 m/s"
      ],
      "ans": 3,
      "exp": "**Paso 1.** Impulso: es el área bajo la gráfica F-t. **Paso 2.** Área triangular: J=1/2(base)(altura)=1/2(0,040)(600)=12 N·s. **Paso 3.** Relación impulso–momento: J=m(vf−vi); como vi=0, 12=0,50vf. **Paso 4.** Despeje: vf=24 m/s. Conclusión: la rapidez final es 24 m/s. **Respuesta correcta: D. 24 m/s**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "fis-avz-09",
      "s": "fis",
      "n": 9,
      "d": "experto",
      "topics": [
        "4.2.2-impulso"
      ],
      "ch": "f12",
      "t": "Impulso y momento",
      "prompt": "Un bloque parte del reposo apoyado contra un resorte comprimido. Al liberarse, el resorte transforma su energía potencial en energía cinética. Después, el bloque atraviesa una franja horizontal rugosa que disipa parte de esa energía. Masa del bloque: 2 kg; constante del resorte: 200 N/m; compresión: 0,20 m; longitud de la zona rugosa: 1,0 m; μk=0,10; g=10 m/s². Fuera de la franja no hay rozamiento. Determine la rapidez del bloque al salir de la zona rugosa.",
      "opts": [
        "1,0 m/s",
        "1,4 m/s",
        "2,0 m/s",
        "2,8 m/s",
        "4,0 m/s"
      ],
      "ans": 1,
      "exp": "**Paso 1.** Energía del resorte: Ue=1/2 kx²=1/2(200)(0,20²)=4 J. **Paso 2.** Fuerza de rozamiento: fk=μkmg=0,10(2)(10)=2 N. **Paso 3.** Trabajo disipado: Wf=−fkd=−2(1)=−2 J. **Paso 4.** Energía cinética final: Kf=4−2=2 J. **Paso 5.** Rapidez: 2=1/2(2)v²; entonces v²=2 y v≈1,41 m/s. Conclusión: sale con rapidez aproximada de 1,4 m/s. **Respuesta correcta: B. 1,4 m/s**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "fis-avz-10",
      "s": "fis",
      "n": 10,
      "d": "experto",
      "topics": [
        "4.2.1-caida"
      ],
      "ch": "f5",
      "t": "Caída libre",
      "prompt": "Un elevador asciende a velocidad constante. El motor debe aumentar la energía potencial gravitatoria de la cabina y la carga, pero no toda la energía eléctrica consumida se transforma en trabajo mecánico útil. Masa total: 500 kg; altura recorrida: 12 m; tiempo: 20 s; eficiencia global: 75 %; g=10 m/s². La rapidez inicial y final son iguales. Calcule la potencia eléctrica media que debe recibir el sistema.",
      "opts": [
        "2,25 kW",
        "3,0 kW",
        "4,0 kW",
        "6,0 kW",
        "8,0 kW"
      ],
      "ans": 2,
      "exp": "**Paso 1.** Trabajo mecánico útil: Wútil=mgh=500×10×12=60000 J. **Paso 2.** Potencia útil: Pútil=W/t=60000/20=3000 W. **Paso 3.** Eficiencia: η=Pútil/Pentrada=0,75. **Paso 4.** Potencia de entrada: Pentrada=3000/0,75=4000 W=4,0 kW. Conclusión: se requieren 4,0 kW de potencia eléctrica media. **Respuesta correcta: C. 4,0 kW**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "fis-avz-11",
      "s": "fis",
      "n": 11,
      "d": "experto",
      "topics": [
        "4.2.2-rozamiento"
      ],
      "ch": "f9",
      "t": "Rozamiento",
      "prompt": "Una caja descansa sobre la plataforma horizontal de un camión. El camión acelera hacia delante y la caja no resbala respecto de la plataforma. El movimiento conjunto solo es posible porque existe rozamiento estático. No hay correas ni paredes que empujen la caja. Considere por separado la fuerza del camión sobre la caja y la fuerza de la caja sobre el camión. Seleccione la descripción correcta de la pareja de fuerzas horizontales de contacto.",
      "opts": [
        "El camión ejerce rozamiento hacia atrás sobre la caja",
        "El camión ejerce rozamiento hacia delante sobre la caja y la caja ejerce una fuerza igual hacia atrás sobre el camión",
        "Ambas fuerzas apuntan hacia delante",
        "No existe rozamiento porque no hay deslizamiento",
        "La fuerza sobre la caja es mayor que la reacción sobre el camión"
      ],
      "ans": 1,
      "exp": "**Paso 1.** Tendencia sin rozamiento: la caja conservaría su velocidad y quedaría atrás respecto del camión. **Paso 2.** Fuerza sobre la caja: para que acelere con el camión, el rozamiento estático sobre ella debe apuntar hacia delante. **Paso 3.** Tercera ley: la caja ejerce sobre el camión una fuerza de igual magnitud y sentido contrario, hacia atrás. Aclaración: puede existir rozamiento estático sin deslizamiento; precisamente evita que ocurra. Conclusión: la descripción correcta es la opción B. **Respuesta correcta: B. El camión ejerce rozamiento hacia delante sobre la caja y la caja ejerce una fuerza igual hacia atrás sobre el camión**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "fis-avz-12",
      "s": "fis",
      "n": 12,
      "d": "experto",
      "topics": [
        "4.2.3-trabajo"
      ],
      "ch": "f13",
      "t": "Trabajo y potencia",
      "prompt": "Una masa de agua desciende desde un embalse. Su energía potencial gravitatoria se transforma primero en energía mecánica de la turbina y luego en energía eléctrica. Cada etapa tiene pérdidas. Masa de agua: 1000 kg; desnivel: 20 m; g=10 m/s²; eficiencia de la turbina: 70 %; eficiencia del generador: 90 %. Ignore la energía cinética residual del agua. Determine la energía eléctrica entregada por el generador.",
      "opts": [
        "63 kJ",
        "126 kJ",
        "140 kJ",
        "180 kJ",
        "200 kJ"
      ],
      "ans": 1,
      "exp": "**Paso 1.** Energía gravitatoria disponible: E=mgh=1000×10×20=200000 J=200 kJ. **Paso 2.** Salida mecánica de la turbina: 200(0,70)=140 kJ. **Paso 3.** Salida eléctrica del generador: 140(0,90)=126 kJ. **Paso 4.** Verificación conjunta: eficiencia total 0,70×0,90=0,63; 200×0,63=126 kJ. Conclusión: se obtienen 126 kJ. **Respuesta correcta: B. 126 kJ**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "fis-avz-13",
      "s": "fis",
      "n": 13,
      "d": "experto",
      "topics": [
        "4.2.2-rozamiento"
      ],
      "ch": "f9",
      "t": "Rozamiento",
      "prompt": "Un disco se desliza hacia el este sobre hielo ideal. Durante un intervalo corto, un mecanismo ejerce una fuerza horizontal constante hacia el oeste. La fuerza primero reduce la rapidez, detiene el disco y después lo hace moverse en sentido contrario. Masa 0,20 kg; velocidad inicial 6,0 m/s al este; fuerza 0,60 N al oeste durante 3,0 s. Tome el este como sentido positivo y desprecie el rozamiento. Determine la velocidad final del disco, incluyendo su dirección.",
      "opts": [
        "9 m/s al este",
        "3 m/s al este",
        "0 m/s",
        "3 m/s al oeste",
        "9 m/s al oeste"
      ],
      "ans": 3,
      "exp": "**Paso 1.** Signos: vi=+6,0 m/s y F=−0,60 N. **Paso 2.** Aceleración: a=F/m=−0,60/0,20=−3,0 m/s². **Paso 3.** Velocidad final: vf=vi+at=6,0+(−3,0)(3,0)=−3,0 m/s. **Paso 4.** Dirección: el signo negativo indica oeste. Control: el disco se detiene a los 2 s y dispone de un segundo adicional para acelerar al oeste. Conclusión: termina a 3 m/s hacia el oeste. **Respuesta correcta: D. 3 m/s al oeste**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "fis-avz-14",
      "s": "fis",
      "n": 14,
      "d": "experto",
      "topics": [
        "4.2.1-mru"
      ],
      "ch": "f4",
      "t": "Gráficas de movimiento",
      "prompt": "Considere nuevamente un móvil que avanza al este y recibe una aceleración constante hacia el oeste. Aunque al final se mueve hacia el oeste, durante la mayor parte del intervalo avanzó hacia el este; por eso desplazamiento y distancia no coinciden. Velocidad inicial 6,0 m/s al este; aceleración −3,0 m/s²; intervalo total 3,0 s. El origen se fija en la posición inicial. Calcule el desplazamiento neto durante los tres segundos.",
      "opts": [
        "−4,5 m",
        "0 m",
        "3,0 m",
        "4,5 m",
        "9,0 m"
      ],
      "ans": 3,
      "exp": "**Paso 1.** Método directo: Δx=vit+1/2 at². **Paso 2.** Sustitución: Δx=(6)(3)+1/2(−3)(3²)=18−13,5=4,5 m. **Paso 3.** Interpretación: el resultado positivo significa que termina 4,5 m al este del origen, aunque su velocidad final apunta al oeste. **Paso 4.** Verificación por tramos: hasta detenerse en 2 s avanza 6 m; durante el último segundo regresa 1,5 m; neto 6−1,5=4,5 m. **Paso 5.** Conclusión: el desplazamiento es 4,5 m al este. **Respuesta correcta: D. 4,5 m**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "fis-avz-15",
      "s": "fis",
      "n": 15,
      "d": "experto",
      "topics": [
        "4.2.1-caida"
      ],
      "ch": "f5",
      "t": "Caída libre",
      "prompt": "Desde un balcón se lanza una pelota verticalmente hacia arriba. Primero asciende, se detiene de manera instantánea y luego cae pasando nuevamente por el balcón hasta llegar al suelo. El origen de alturas se toma en el suelo. Altura inicial 20 m; velocidad inicial 15 m/s hacia arriba; g=10 m/s² hacia abajo. Desprecie el aire. Determine la rapidez con la que la pelota impacta el suelo.",
      "opts": [
        "15 m/s",
        "20 m/s",
        "25 m/s",
        "30 m/s",
        "35 m/s"
      ],
      "ans": 2,
      "exp": "**Paso 1.** Opción energética: la energía inicial es 1/2 mv₀²+mgh₀; en el suelo es 1/2 mvf². **Paso 2.** Ecuación: vf²=v₀²+2gh₀=15²+2(10)(20)=225+400=625. **Paso 3.** Resultado: vf=√625=25 m/s. **Paso 4.** Dirección: al impactar se mueve hacia abajo; la pregunta solicita rapidez, por eso se informa el valor positivo. **Paso 5.** Comprobación temporal: 0=20+15t−5t² da t=4 s; v=15−10(4)=−25 m/s. **Paso 6.** Conclusión: la rapidez de impacto es 25 m/s. **Respuesta correcta: C. 25 m/s**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "fis-avz-16",
      "s": "fis",
      "n": 16,
      "d": "experto",
      "topics": [
        "4.2.1-proyectiles"
      ],
      "ch": "f6",
      "t": "Proyectiles",
      "prompt": "Dos esferas se lanzan simultáneamente y de manera horizontal desde la misma plataforma. Una sale con el doble de rapidez horizontal que la otra. Se desea comparar el tiempo de caída y el alcance, no las velocidades de impacto. Ambas parten de la misma altura, tienen velocidad vertical inicial cero y se desprecia la resistencia del aire. La esfera A sale con rapidez v; la B con 2v. Indique la relación correcta entre sus tiempos de vuelo y sus alcances horizontales.",
      "opts": [
        "B tarda la mitad y llega al mismo punto",
        "Ambas tardan lo mismo y B alcanza el doble de distancia",
        "B tarda el doble y alcanza cuatro veces más",
        "Ambas tardan lo mismo y llegan al mismo punto",
        "A tarda el doble y B alcanza el doble"
      ],
      "ans": 1,
      "exp": "**Paso 1.** Movimiento vertical: el tiempo depende solo de h, g y la velocidad vertical inicial; esos datos son iguales. **Paso 2.** Tiempo: ambas satisfacen h=1/2 gt², por lo que tienen el mismo t. **Paso 3.** Movimiento horizontal: x=vxt. **Paso 4.** Comparación: xB=(2v)t=2xA. Conclusión: caen al mismo tiempo y B recorre el doble horizontalmente. **Respuesta correcta: B. Ambas tardan lo mismo y B alcanza el doble de distancia**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "fis-avz-17",
      "s": "fis",
      "n": 17,
      "d": "experto",
      "topics": [
        "4.2.2-grav"
      ],
      "ch": "f8",
      "t": "Gravitación",
      "prompt": "Dos cuerpos se atraen gravitacionalmente con una fuerza inicial F. En una segunda configuración cambian ambas masas y también la separación entre sus centros. Se debe considerar el efecto combinado, no aplicar cada cambio de manera aislada. La primera masa se duplica, la segunda se triplica y la distancia entre centros se reduce a la mitad. Use F=Gm₁m₂/r². Exprese la nueva fuerza gravitatoria en función de F.",
      "opts": [
        "3F",
        "6F",
        "12F",
        "18F",
        "24F"
      ],
      "ans": 4,
      "exp": "**Paso 1.** Producto de masas: (2m₁)(3m₂)=6m₁m₂. **Paso 2.** Distancia: (r/2)²=r²/4; dividir por r²/4 multiplica por 4. **Paso 3.** Factor total: 6×4=24. Ecuación: F′=G(2m₁)(3m₂)/(r/2)²=24Gm₁m₂/r²=24F. Conclusión: la nueva fuerza es 24F. **Respuesta correcta: E. 24F**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "fis-avz-18",
      "s": "fis",
      "n": 18,
      "d": "experto",
      "topics": [
        "4.2.2-rozamiento"
      ],
      "ch": "f9",
      "t": "Rozamiento",
      "prompt": "Un letrero cuelga en reposo mediante dos cables idénticos y simétricos. Las componentes horizontales de las tensiones se cancelan, mientras las componentes verticales sostienen todo el peso. El peso del letrero es 200 N; cada cable forma 53° con la horizontal; use sin53°=0,80. El sistema está en equilibrio. Determine la tensión en cada cable.",
      "opts": [
        "80 N",
        "100 N",
        "125 N",
        "160 N",
        "250 N"
      ],
      "ans": 2,
      "exp": "**Paso 1.** DCL: hay dos tensiones T y un peso de 200 N. **Paso 2.** Componente vertical de cada cable: Ty=T sin53°=0,80T. **Paso 3.** Equilibrio vertical: 2(0,80T)=200. **Paso 4.** Despeje: 1,60T=200; T=125 N. Control: cada cable aporta 100 N verticales; juntos equilibran 200 N. Conclusión: la tensión es 125 N en cada cable. **Respuesta correcta: C. 125 N**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "fis-avz-19",
      "s": "fis",
      "n": 19,
      "d": "experto",
      "topics": [
        "4.2.1-1raNewton"
      ],
      "ch": "f1",
      "t": "Primera ley",
      "prompt": "Un automóvil A pasa por un punto de control con velocidad constante. Tres segundos después, desde ese mismo punto, parte del reposo un automóvil B con aceleración constante. Cuando B arranca, A ya tiene una ventaja espacial. Automóvil A: 8 m/s constante. Retraso de B: 3 s, por lo que la ventaja inicial es 24 m. Automóvil B: parte del reposo con a=4 m/s². ¿Cuánto tiempo después de arrancar B alcanza al automóvil A?",
      "opts": [
        "3 s",
        "4 s",
        "5 s",
        "6 s",
        "8 s"
      ],
      "ans": 3,
      "exp": "**Paso 1.** Medir tiempo desde que B arranca: llámelo τ. **Paso 2.** Posición de A: ya lleva 24 m y continúa: xA=24+8τ. **Paso 3.** Posición de B: xB=1/2 aτ²=2τ². **Paso 4.** Encuentro: 2τ²=24+8τ; dividir por 2: τ²−4τ−12=0. **Paso 5.** Factorizar: (τ−6)(τ+2)=0; el tiempo físico es τ=6 s. Comprobación: A está en 24+48=72 m; B en 2(36)=72 m. Conclusión: B alcanza a A 6 s después de arrancar. **Respuesta correcta: D. 6 s**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "fis-avz-20",
      "s": "fis",
      "n": 20,
      "d": "experto",
      "topics": [
        "4.2.2-grav"
      ],
      "ch": "f8",
      "t": "Gravitación",
      "prompt": "Un objeto inicialmente en reposo explota en dos fragmentos que se separan sobre una línea horizontal. Durante el breve estallido, el impulso externo es despreciable, de modo que el momento lineal total permanece en cero. Un fragmento de 2 kg sale hacia el este a 12 m/s; el otro fragmento tiene masa 4 kg. Tome el este como positivo. Determine la velocidad del fragmento de 4 kg.",
      "opts": [
        "12 m/s al este",
        "6 m/s al este",
        "3 m/s al oeste",
        "6 m/s al oeste",
        "12 m/s al oeste"
      ],
      "ans": 3,
      "exp": "**Paso 1.** Momento inicial: el objeto estaba en reposo, entonces pi=0. **Paso 2.** Conservación: 0=(2)(+12)+(4)v₂. **Paso 3.** Resolver: 0=24+4v₂; v₂=−6 m/s. **Paso 4.** Dirección: el signo negativo significa oeste. Conclusión: el fragmento de 4 kg sale a 6 m/s hacia el oeste. **Respuesta correcta: D. 6 m/s al oeste**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "fis-avz-21",
      "s": "fis",
      "n": 21,
      "d": "experto",
      "topics": [
        "4.2.1-mru"
      ],
      "ch": "f4",
      "t": "Gráficas de movimiento",
      "prompt": "Una fuerza horizontal depende de la posición. Su gráfica contra el desplazamiento está formada por tres tramos: un aumento lineal, una meseta y una disminución lineal que termina con fuerza negativa. De x=0 a 4 m, F aumenta de 0 a 12 N; de 4 a 7 m, F=12 N; de 7 a 10 m, disminuye linealmente de 12 N a −6 N. Calcule el trabajo total realizado por esta fuerza entre 0 y 10 m.",
      "opts": [
        "45 J",
        "57 J",
        "69 J",
        "81 J",
        "93 J"
      ],
      "ans": 2,
      "exp": "**Paso 1.** Primer tramo: triángulo W₁=1/2(4)(12)=24 J. **Paso 2.** Segundo tramo: rectángulo W₂=(3)(12)=36 J. **Paso 3.** Tercer tramo: trapecio algebraico W₃=[(12+(−6))/2](3)=9 J. **Paso 4.** Suma: W=24+36+9=69 J. Aclaración: el pequeño sector bajo el eje en el último tramo resta trabajo; la media algebraica ya lo incorpora. Conclusión: el trabajo total es 69 J. **Respuesta correcta: C. 69 J**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "fis-avz-22",
      "s": "fis",
      "n": 22,
      "d": "experto",
      "topics": [
        "4.2.2-rozamiento"
      ],
      "ch": "f9",
      "t": "Rozamiento",
      "prompt": "Una esfera describe movimiento circular uniforme atada a una cuerda. Se conoce cuántas vueltas completa en cierto tiempo, por lo que primero debe hallarse el período o la rapidez angular antes de calcular la aceleración centrípeta. Radio 2,0 m; completa 3 revoluciones en 6,0 s; use π=3,14. La rapidez es constante. Calcule la aceleración centrípeta aproximada.",
      "opts": [
        "4,9 m/s²",
        "9,9 m/s²",
        "12,6 m/s²",
        "19,7 m/s²",
        "39,4 m/s²"
      ],
      "ans": 3,
      "exp": "**Paso 1.** Período: T=6,0/3=2,0 s por revolución. **Paso 2.** Rapidez: v=2πr/T=2(3,14)(2)/2=6,28 m/s. **Paso 3.** Aceleración centrípeta: ac=v²/r=6,28²/2≈39,44/2=19,72 m/s². Conclusión: ac≈19,7 m/s². **Respuesta correcta: D. 19,7 m/s²**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "fis-avz-23",
      "s": "fis",
      "n": 23,
      "d": "experto",
      "topics": [
        "4.2.2-rozamiento"
      ],
      "ch": "f9",
      "t": "Rozamiento",
      "prompt": "Un carro de montaña rusa parte del reposo desde una altura y llega al punto más bajo. Debido al rozamiento y a la resistencia del aire, solo una fracción de la energía potencial inicial se convierte en energía cinética. Altura inicial 18 m; g=10 m/s²; el 25 % de la energía mecánica inicial se disipa antes de llegar abajo. Tome la energía potencial del punto más bajo como cero. Determine la rapidez del carro en el punto más bajo.",
      "opts": [
        "11,6 m/s",
        "13,4 m/s",
        "16,4 m/s",
        "18,0 m/s",
        "19,0 m/s"
      ],
      "ans": 2,
      "exp": "**Paso 1.** Energía inicial: Ei=mgh. **Paso 2.** Fracción útil: queda 75 %, así que Kf=0,75mgh. **Paso 3.** Igualar: 1/2 mv²=0,75mgh; se cancela m. **Paso 4.** Despeje: v²=2(0,75)gh=1,5(10)(18)=270. **Paso 5.** Raíz: v=√270≈16,43 m/s. Conclusión: la rapidez es aproximadamente 16,4 m/s. **Respuesta correcta: C. 16,4 m/s**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "fis-avz-24",
      "s": "fis",
      "n": 24,
      "d": "experto",
      "topics": [
        "4.2.2-2daNewton"
      ],
      "ch": "f7",
      "t": "Segunda ley",
      "prompt": "Un sistema fotovoltaico alimenta un motor por medio de una batería. En cada etapa se pierde parte de la energía: el panel convierte solo una fracción de la radiación, la batería no devuelve todo lo almacenado y el motor tampoco transforma toda la electricidad en trabajo útil. Energía solar incidente 2,0 MJ; eficiencia del panel 18 %; eficiencia de carga-descarga de la batería 90 %; eficiencia del motor 75 %. Calcule la energía mecánica útil finalmente entregada por el motor.",
      "opts": [
        "121,5 kJ",
        "180 kJ",
        "243 kJ",
        "270 kJ",
        "360 kJ"
      ],
      "ans": 2,
      "exp": "**Paso 1.** Convertir: 2,0 MJ=2000 kJ. **Paso 2.** Panel: 2000(0,18)=360 kJ eléctricos. **Paso 3.** Batería: 360(0,90)=324 kJ recuperados. **Paso 4.** Motor: 324(0,75)=243 kJ mecánicos. Verificación: eficiencia total 0,18×0,90×0,75=0,1215; 2000×0,1215=243 kJ. Conclusión: el motor entrega 243 kJ. **Respuesta correcta: C. 243 kJ**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "fis-avz-25",
      "s": "fis",
      "n": 25,
      "d": "dificil",
      "topics": [
        "4.2.2-rozamiento"
      ],
      "ch": "f9",
      "t": "Rozamiento",
      "prompt": "Una sonda se desplaza en línea recta lejos de campos gravitatorios apreciables. Dos propulsores laterales ejercen fuerzas iguales y opuestas, por lo que la suma vectorial de todas las fuerzas es cero, aunque la sonda ya posee velocidad. Velocidad inicial 12 m/s hacia el norte; fuerza neta 0 N. No existe rozamiento ni resistencia. Indique cómo será el movimiento mientras se mantenga la fuerza neta nula.",
      "opts": [
        "Se detendrá progresivamente",
        "Continuará al norte con rapidez constante",
        "Acelerará al norte",
        "Cambiará hacia el este",
        "Regresará al origen"
      ],
      "ans": 1,
      "exp": "**Paso 1.** Primera ley: ΣF=0 implica a=0. **Paso 2.** Interpretación: aceleración cero significa velocidad constante, no velocidad nula. **Paso 3.** Estado inicial: la sonda ya se mueve al norte a 12 m/s. Conclusión: conservará dirección y rapidez mientras la fuerza neta siga siendo cero. **Respuesta correcta: B. Continuará al norte con rapidez constante**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "fis-avz-26",
      "s": "fis",
      "n": 26,
      "d": "dificil",
      "topics": [
        "4.2.1-vectores"
      ],
      "ch": "f2",
      "t": "Vectores y fuerza neta",
      "prompt": "Sobre una argolla actúan dos fuerzas perpendiculares. Para que la argolla permanezca en equilibrio debe añadirse una tercera fuerza exactamente opuesta a la resultante de las dos primeras. Primera fuerza 9 N hacia el este; segunda 12 N hacia el norte. Use la relación del triángulo 9-12-15. Determine la magnitud y dirección general de la tercera fuerza equilibrante.",
      "opts": [
        "3 N al noreste",
        "15 N al noreste",
        "15 N al suroeste",
        "21 N al sur",
        "108 N al oeste"
      ],
      "ans": 2,
      "exp": "**Paso 1.** Resultante de las dos fuerzas: R=√(9²+12²)=√225=15 N. **Paso 2.** Dirección: la resultante apunta al noreste porque ambas componentes son positivas. **Paso 3.** Equilibrante: debe tener igual magnitud y dirección opuesta. Conclusión: la tercera fuerza es 15 N hacia el suroeste. **Respuesta correcta: C. 15 N al suroeste**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "fis-avz-27",
      "s": "fis",
      "n": 27,
      "d": "dificil",
      "topics": [
        "4.2.1-mru"
      ],
      "ch": "f4",
      "t": "Distancia total de detención con tiempo ",
      "prompt": "Un conductor observa un obstáculo. Durante el tiempo de reacción el automóvil continúa con velocidad constante; después los frenos producen una desaceleración uniforme hasta detenerlo. La distancia total es la suma de ambos tramos. Rapidez inicial 20 m/s; tiempo de reacción 0,75 s; desaceleración de frenado 4,0 m/s². Calcule la distancia total recorrida desde que el conductor ve el obstáculo hasta que el automóvil se detiene.",
      "opts": [
        "35 m",
        "50 m",
        "60 m",
        "65 m",
        "80 m"
      ],
      "ans": 3,
      "exp": "**Paso 1.** Reacción: x₁=vt=(20)(0,75)=15 m. **Paso 2.** Frenado: vf²=vi²+2aΔx; 0=20²−2(4)Δx. **Paso 3.** Despeje: Δx=400/8=50 m. **Paso 4.** Total: 15+50=65 m. Conclusión: el automóvil recorre 65 m. **Respuesta correcta: D. 65 m**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "fis-avz-28",
      "s": "fis",
      "n": 28,
      "d": "dificil",
      "topics": [
        "4.2.2-grav"
      ],
      "ch": "f8",
      "t": "Gravitación",
      "prompt": "Una pelota se lanza verticalmente desde el suelo. Dos segundos después todavía asciende, pero su rapidez ya ha disminuido por la gravedad. Velocidad inicial 30 m/s hacia arriba; g=10 m/s²; tiempo 2,0 s; altura inicial cero. Determine la altura y la velocidad de la pelota en ese instante.",
      "opts": [
        "20 m y 10 m/s hacia arriba",
        "40 m y 10 m/s hacia arriba",
        "40 m y 20 m/s hacia arriba",
        "60 m y 10 m/s hacia abajo",
        "80 m y 20 m/s hacia abajo"
      ],
      "ans": 1,
      "exp": "**Paso 1.** Velocidad: v=v₀−gt=30−10(2)=10 m/s hacia arriba. **Paso 2.** Altura: y=v₀t−1/2gt²=30(2)−5(4)=60−20=40 m. Control: aún no está en la cima porque v>0. Conclusión: está a 40 m y asciende a 10 m/s. **Respuesta correcta: B. 40 m y 10 m/s hacia arriba**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "fis-avz-29",
      "s": "fis",
      "n": 29,
      "d": "dificil",
      "topics": [
        "4.2.2-grav"
      ],
      "ch": "f8",
      "t": "Gravitación",
      "prompt": "Una pelota sale horizontalmente desde un acantilado. Al caer, conserva la componente horizontal de la velocidad y adquiere una componente vertical por efecto de la gravedad. Altura 45 m; rapidez horizontal inicial 20 m/s; g=10 m/s²; velocidad vertical inicial cero; sin aire. Calcule la magnitud de la velocidad justo antes de tocar el suelo.",
      "opts": [
        "20,0 m/s",
        "25,0 m/s",
        "30,0 m/s",
        "36,1 m/s",
        "50,0 m/s"
      ],
      "ans": 3,
      "exp": "**Paso 1.** Tiempo de caída: 45=1/2(10)t²; t=3 s. **Paso 2.** Componente vertical final: vy=gt=30 m/s hacia abajo. **Paso 3.** Componente horizontal: vx=20 m/s constante. **Paso 4.** Magnitud: v=√(20²+30²)=√1300≈36,1 m/s. Conclusión: la rapidez de impacto es 36,1 m/s. **Respuesta correcta: D. 36,1 m/s**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "fis-avz-30",
      "s": "fis",
      "n": 30,
      "d": "experto",
      "topics": [
        "4.2.2-rozamiento"
      ],
      "ch": "f9",
      "t": "Rozamiento",
      "prompt": "Un bloque se desliza cuesta abajo por un plano inclinado. La componente del peso paralela al plano impulsa el movimiento, mientras el rozamiento cinético se opone. Masa 8,0 kg; ángulo 30°; μk=0,25; g=10 m/s²; sin30°=0,50; cos30°=0,866. Calcule la aceleración aproximada del bloque a lo largo del plano.",
      "opts": [
        "0,71 m/s²",
        "1,25 m/s²",
        "2,84 m/s²",
        "5,00 m/s²",
        "7,16 m/s²"
      ],
      "ans": 2,
      "exp": "**Paso 1.** Componente del peso: mg sinθ=8(10)(0,50)=40 N abajo. **Paso 2.** Normal: N=mg cosθ=8(10)(0,866)=69,28 N. **Paso 3.** Rozamiento: fk=0,25(69,28)=17,32 N arriba. **Paso 4.** Fuerza neta: 40−17,32=22,68 N. **Paso 5.** Aceleración: a=22,68/8=2,84 m/s². Conclusión: 2,84 m/s² cuesta abajo. **Respuesta correcta: C. 2,84 m/s²**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "fis-avz-31",
      "s": "fis",
      "n": 31,
      "d": "dificil",
      "topics": [
        "4.2.2-grav"
      ],
      "ch": "f8",
      "t": "Gravitación",
      "prompt": "Un planeta hipotético tiene mayor masa y mayor radio que la Tierra. Ambos cambios afectan la aceleración gravitatoria de su superficie. Su masa es 4M y su radio 2R, donde M y R son los valores terrestres. Use g=GM/R². Exprese su gravedad superficial en función de la gravedad terrestre g.",
      "opts": [
        "g/2",
        "g",
        "2g",
        "4g",
        "8g"
      ],
      "ans": 1,
      "exp": "**Paso 1.** Sustituir: g′=G(4M)/(2R)². **Paso 2.** Cuadrar el radio: (2R)²=4R². **Paso 3.** Simplificar: g′=4GM/(4R²)=GM/R²=g. Conclusión: la gravedad superficial sería igual a g. **Respuesta correcta: B. g**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "fis-avz-32",
      "s": "fis",
      "n": 32,
      "d": "dificil",
      "topics": [
        "4.2.2-circular"
      ],
      "ch": "f11",
      "t": "Circular",
      "prompt": "Una esfera gira en círculo con radio fijo. Se incrementa su rapidez sin cambiar la masa ni el radio, por lo que la fuerza centrípeta cambia con el cuadrado de la rapidez. Masa 0,50 kg; radio 2,0 m; nueva rapidez 9,0 m/s. Calcule la fuerza centrípeta requerida con la nueva rapidez.",
      "opts": [
        "4,5 N",
        "9,0 N",
        "18,0 N",
        "20,25 N",
        "40,5 N"
      ],
      "ans": 3,
      "exp": "**Paso 1.** Fórmula: Fc=mv²/r. **Paso 2.** Sustituir: Fc=0,50(9²)/2. **Paso 3.** Calcular: 0,50(81)/2=40,5/2=20,25 N. Conclusión: se requieren 20,25 N hacia el centro. **Respuesta correcta: D. 20,25 N**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "fis-avz-33",
      "s": "fis",
      "n": 33,
      "d": "experto",
      "topics": [
        "4.2.2-impulso"
      ],
      "ch": "f12",
      "t": "Impulso",
      "prompt": "Dos automóviles se desplazan en sentidos opuestos y quedan unidos después de chocar. Durante el impacto se conserva el momento lineal horizontal. Auto A: 1000 kg a 20 m/s al este. Auto B: 1500 kg a 10 m/s al oeste. Tome el este como positivo. Determine la velocidad del conjunto inmediatamente después del choque.",
      "opts": [
        "2 m/s al este",
        "2 m/s al oeste",
        "5 m/s al este",
        "8 m/s al oeste",
        "10 m/s al este"
      ],
      "ans": 0,
      "exp": "**Paso 1.** Momento inicial: p=(1000)(20)+(1500)(−10)=20000−15000=5000 kg·m/s. **Paso 2.** Masa conjunta: 1000+1500=2500 kg. **Paso 3.** Velocidad final: vf=5000/2500=2 m/s. **Paso 4.** Dirección: positiva, por tanto este. Conclusión: 2 m/s al este. **Respuesta correcta: A. 2 m/s al este**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "fis-avz-34",
      "s": "fis",
      "n": 34,
      "d": "experto",
      "topics": [
        "4.2.3-trabajo"
      ],
      "ch": "f13",
      "t": "Trabajo y potencia",
      "prompt": "Una bomba eleva agua a velocidad media constante. La potencia útil aumenta la energía potencial del agua, pero la potencia eléctrica de entrada debe ser mayor debido a las pérdidas. Masa elevada 200 kg; altura 15 m; tiempo 10 s; eficiencia 60 %; g=10 m/s². Calcule la potencia eléctrica media de entrada.",
      "opts": [
        "1,8 kW",
        "3,0 kW",
        "4,0 kW",
        "5,0 kW",
        "8,0 kW"
      ],
      "ans": 3,
      "exp": "**Paso 1.** Trabajo útil: W=mgh=200(10)(15)=30000 J. **Paso 2.** Potencia útil: Pútil=30000/10=3000 W. **Paso 3.** Eficiencia: 0,60=3000/Pentrada. **Paso 4.** Despeje: Pentrada=3000/0,60=5000 W=5,0 kW. Conclusión: la bomba requiere 5,0 kW. **Respuesta correcta: D. 5,0 kW**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "fis-avz-35",
      "s": "fis",
      "n": 35,
      "d": "dificil",
      "topics": [
        "4.2.1-vectores"
      ],
      "ch": "f2",
      "t": "Vectores y fuerza neta",
      "prompt": "La figura representa dos fuerzas perpendiculares de 6 N y 8 N aplicadas a una argolla. ¿Cuál es la magnitud de la resultante R y hacia qué región apunta?",
      "opts": [
        "2 N, noreste",
        "10 N, noreste",
        "14 N, norte",
        "48 N, este",
        "10 N, suroeste"
      ],
      "ans": 1,
      "exp": "**Paso 1.** Las componentes son perpendiculares, así que R=√(6²+8²)=√100=10 N. **Paso 2.** Como ambas componentes apuntan en los sentidos positivos de sus ejes, la resultante queda en el cuadrante noreste. **Paso 3.** Las opciones 14 N y 48 N provienen de sumar magnitudes o multiplicarlas, procedimientos que no corresponden a vectores perpendiculares. **Respuesta correcta: B. 10 N, noreste**",
      "maths": [],
      "imgs": [],
      "fig": "avz-fis-35"
    },
    {
      "id": "fis-avz-36",
      "s": "fis",
      "n": 36,
      "d": "experto",
      "topics": [
        "4.2.1-mru"
      ],
      "ch": "f4",
      "t": "Gráficas de movimiento",
      "prompt": "La velocidad de un carrito varía como muestra la gráfica. Tomando como positivo el sentido indicado por v>0, ¿cuál es el desplazamiento neto entre 0 s y 9 s?",
      "opts": [
        "36 m",
        "44 m",
        "48 m",
        "52 m",
        "60 m"
      ],
      "ans": 2,
      "exp": "**Paso 1.** El desplazamiento es el área con signo bajo la gráfica. **Paso 2.** De 0 a 3 s: triángulo ½(3)(8)=12 m. **Paso 3.** De 3 a 7 s: rectángulo (4)(8)=32 m. **Paso 4.** De 7 a 9 s: trapecio de velocidad media (8−4)/2=2 m/s, por 2 s, da 4 m. **Paso 5.** Total: 12+32+4=48 m. **Respuesta correcta: C. 48 m**",
      "maths": [],
      "imgs": [],
      "fig": "avz-fis-36"
    },
    {
      "id": "fis-avz-37",
      "s": "fis",
      "n": 37,
      "d": "dificil",
      "topics": [
        "4.2.1-proyectiles"
      ],
      "ch": "f6",
      "t": "Proyectiles",
      "prompt": "Un avión avanza horizontalmente con rapidez constante y suelta una esfera sin impulsarla respecto de la aeronave. Si se desprecia el aire, ¿qué trayectoria de la figura observa una persona inmóvil en el suelo?",
      "opts": [
        "A",
        "B",
        "C",
        "D",
        "E"
      ],
      "ans": 1,
      "exp": "**Paso 1.** Al soltarla, la esfera conserva la velocidad horizontal del avión y adquiere aceleración vertical por gravedad. **Paso 2.** Por tanto, x=v₀t y y=h−½gt²: la trayectoria es parabólica, comienza con tangente horizontal y avanza mientras cae. **Paso 3.** Eso corresponde a B; A omite la velocidad horizontal, C supone caída rectilínea, D niega la gravedad y E muestra ascenso. **Respuesta correcta: B. B**",
      "maths": [],
      "imgs": [],
      "fig": "avz-fis-37"
    },
    {
      "id": "fis-avz-38",
      "s": "fis",
      "n": 38,
      "d": "dificil",
      "topics": [
        "4.2.2-rozamiento"
      ],
      "ch": "f9",
      "t": "Rozamiento",
      "prompt": "El bloque de la figura se mueve cuesta arriba sobre una superficie rugosa. ¿Cuál afirmación describe correctamente las tres fuerzas dibujadas?",
      "opts": [
        "La normal es vertical y el rozamiento apunta cuesta arriba",
        "El peso es perpendicular al plano y la normal es vertical",
        "La normal es perpendicular al plano, el peso es vertical y el rozamiento se opone al movimiento",
        "El rozamiento y el peso siempre tienen igual magnitud",
        "La normal reemplaza a la componente del peso paralela al plano"
      ],
      "ans": 2,
      "exp": "**Paso 1.** El peso mg siempre apunta verticalmente hacia abajo. **Paso 2.** La fuerza normal es perpendicular a la superficie de contacto. **Paso 3.** Como el bloque se desliza cuesta arriba, el rozamiento cinético apunta cuesta abajo. **Paso 4.** La figura no implica que las magnitudes de peso y rozamiento sean iguales. **Respuesta correcta: C. La normal es perpendicular al plano, el peso es vertical y el rozamiento se opone al movimiento**",
      "maths": [],
      "imgs": [],
      "fig": "avz-fis-38"
    },
    {
      "id": "fis-avz-39",
      "s": "fis",
      "n": 39,
      "d": "dificil",
      "topics": [
        "4.2.1-mru"
      ],
      "ch": "f4",
      "t": "Velocidad y aceleración en el punto más ",
      "prompt": "Una piedra lanzada verticalmente pasa por P, Q y R antes de alcanzar T, el punto más alto de su recorrido. Sin resistencia del aire, ¿qué ocurre exactamente en T?",
      "opts": [
        "La velocidad y la aceleración son cero durante un intervalo",
        "La velocidad es cero solo un instante y la aceleración vale g hacia abajo",
        "La velocidad apunta hacia abajo y la aceleración es cero",
        "La rapidez permanece cero mientras cambia de sentido",
        "La aceleración cambia de signo al iniciar el descenso"
      ],
      "ans": 1,
      "exp": "**Paso 1.** En la cima la componente vertical de la velocidad llega a cero únicamente en el instante de inversión. **Paso 2.** La gravedad no desaparece: la aceleración continúa siendo g hacia abajo antes, durante y después de T. **Respuesta correcta: B. La velocidad es cero solo un instante y la aceleración vale g hacia abajo**",
      "maths": [],
      "imgs": [],
      "fig": "avz-fis-39"
    },
    {
      "id": "fis-avz-40",
      "s": "fis",
      "n": 40,
      "d": "dificil",
      "topics": [
        "4.2.1-mru"
      ],
      "ch": "f4",
      "t": "Rapidez en dos pasos por la misma altura",
      "prompt": "En el movimiento representado, la piedra pasa por Q durante el ascenso y vuelve a pasar por Q durante el descenso. Si el aire es despreciable, ¿cómo se comparan sus rapideces en ambos pasos?",
      "opts": [
        "Es mayor al subir",
        "Es mayor al bajar",
        "Son iguales, con velocidades de sentidos opuestos",
        "Ambas son cero",
        "Depende de la masa de la piedra"
      ],
      "ans": 2,
      "exp": "**Paso 1.** La energía mecánica se conserva. **Paso 2.** En la misma altura la energía potencial es idéntica, por lo que la energía cinética y la rapidez también lo son. **Paso 3.** Las velocidades tienen igual magnitud, pero sentidos opuestos. **Respuesta correcta: C. Son iguales, con velocidades de sentidos opuestos**",
      "maths": [],
      "imgs": [],
      "fig": "avz-fis-40"
    },
    {
      "id": "fis-avz-41",
      "s": "fis",
      "n": 41,
      "d": "experto",
      "topics": [
        "4.2.1-mru"
      ],
      "ch": "f4",
      "t": "Gráficas de movimiento",
      "prompt": "La fuerza neta sobre un carrito de 3,0 kg inicialmente en reposo cambia según la gráfica triangular. ¿Qué rapidez tendrá al terminar el intervalo de 6 s?",
      "opts": [
        "4 m/s",
        "8 m/s",
        "10 m/s",
        "12 m/s",
        "18 m/s"
      ],
      "ans": 3,
      "exp": "**Paso 1.** El impulso es el área del triángulo: J=½(6 s)(12 N)=36 N·s. **Paso 2.** Como J=Δp=mΔv, resulta Δv=36/3=12 m/s. **Paso 3.** Al partir del reposo, esa es la rapidez final. **Respuesta correcta: D. 12 m/s**",
      "maths": [],
      "imgs": [],
      "fig": "avz-fis-41"
    },
    {
      "id": "fis-avz-42",
      "s": "fis",
      "n": 42,
      "d": "dificil",
      "topics": [
        "4.2.2-2daNewton"
      ],
      "ch": "f7",
      "t": "Segunda ley",
      "prompt": "El camión acelera mientras empuja al automóvil de la figura. Al comparar únicamente las fuerzas de contacto Fₜ→ₐ y Fₐ→ₜ, ¿cuál afirmación es correcta?",
      "opts": [
        "La del camión es mayor porque su motor impulsa el sistema",
        "La del automóvil es mayor porque se opone al movimiento",
        "Son iguales en magnitud, opuestas y simultáneas",
        "Se anulan porque actúan sobre el mismo cuerpo",
        "La reacción aparece después de la acción"
      ],
      "ans": 2,
      "exp": "**Paso 1.** Por la tercera ley de Newton, las fuerzas de interacción forman un par simultáneo de igual magnitud y sentidos opuestos. **Paso 2.** No se anulan entre sí al estudiar un vehículo, porque actúan sobre cuerpos diferentes. **Respuesta correcta: C. Son iguales en magnitud, opuestas y simultáneas**",
      "maths": [],
      "imgs": [],
      "fig": "avz-fis-42"
    },
    {
      "id": "fis-avz-43",
      "s": "fis",
      "n": 43,
      "d": "dificil",
      "topics": [
        "4.2.2-circular"
      ],
      "ch": "f11",
      "t": "Circular",
      "prompt": "Una partícula recorre la circunferencia de la figura en sentido antihorario. En P su velocidad es vertical hacia arriba. ¿Hacia dónde apunta la aceleración instantánea?",
      "opts": [
        "Hacia arriba, tangente a la trayectoria",
        "Hacia abajo, opuesta a la velocidad",
        "Hacia la izquierda, en dirección al centro",
        "Hacia la derecha, fuera del círculo",
        "Es cero porque la rapidez puede ser constante"
      ],
      "ans": 2,
      "exp": "**Paso 1.** En movimiento circular, la aceleración centrípeta apunta siempre hacia el centro. **Paso 2.** Desde el punto derecho P, el centro queda a la izquierda. **Paso 3.** La velocidad es tangencial y no determina la dirección de la aceleración. **Respuesta correcta: C. Hacia la izquierda, en dirección al centro**",
      "maths": [],
      "imgs": [],
      "fig": "avz-fis-43"
    },
    {
      "id": "fis-avz-44",
      "s": "fis",
      "n": 44,
      "d": "experto",
      "topics": [
        "4.2.2-rozamiento"
      ],
      "ch": "f9",
      "t": "Rozamiento",
      "prompt": "Los bloques de 2 kg y 3 kg de la figura se mueven juntos sobre una superficie horizontal sin rozamiento cuando se aplica 20 N al bloque menor. ¿Qué fuerza ejerce el bloque de 2 kg sobre el de 3 kg?",
      "opts": [
        "4 N",
        "8 N",
        "12 N",
        "20 N",
        "30 N"
      ],
      "ans": 2,
      "exp": "**Paso 1.** La aceleración del sistema es a=20/(2+3)=4 m/s². **Paso 2.** Sobre el bloque de 3 kg, la única fuerza horizontal es la de contacto; por tanto, Fcontacto=ma=3(4)=12 N. **Respuesta correcta: C. 12 N**",
      "maths": [],
      "imgs": [],
      "fig": "avz-fis-44"
    }
  ],
  "qui": [
    {
      "id": "qui-avz-01",
      "s": "qui",
      "n": 1,
      "d": "experto",
      "topics": [
        "4.3.4-mol"
      ],
      "ch": "q14",
      "t": "Concepto de mol",
      "prompt": "Una muestra líquida de etanol se mide por volumen, pero la cantidad de partículas debe obtenerse pasando primero a masa, después a moles y finalmente a moléculas. Cada conversión debe conservar sus unidades. Volumen 10,0 mL; densidad 0,789 g/mL; masa molar del etanol 46,0 g/mol; NA=6,022×10²³ mol⁻¹. Calcule el número de moléculas presentes en la muestra.",
      "opts": [
        "1,03×10²²",
        "1,03×10²³",
        "4,75×10²³",
        "6,02×10²³"
      ],
      "ans": 1,
      "exp": "**Paso 1.** Masa: m=ρV=(0,789 g/mL)(10,0 mL)=7,89 g. **Paso 2.** Moles: n=m/M=7,89/46,0=0,1715 mol. **Paso 3.** Moléculas: N=nNA=(0,1715)(6,022×10²³)=1,03×10²³. Control: la muestra tiene menos de un mol, así que debe contener menos de 6,022×10²³ moléculas. Conclusión: 1,03×10²³ moléculas. **Respuesta correcta: B. 1,03×10²³**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "qui-avz-02",
      "s": "qui",
      "n": 2,
      "d": "experto",
      "topics": [
        "4.3.1-particulas"
      ],
      "ch": "q3",
      "t": "Partículas fundamentales",
      "prompt": "Un elemento presenta dos isótopos naturales. La masa atómica de la tabla es un promedio ponderado: el isótopo más abundante influye más en el valor final. Masas isotópicas 62 u y 64 u; masa atómica promedio 63,2 u. Sea x la fracción del isótopo de 64 u y 1−x la del isótopo de 62 u. Determine la abundancia porcentual del isótopo de 64 u.",
      "opts": [
        "20 %",
        "40 %",
        "60 %",
        "80 %"
      ],
      "ans": 2,
      "exp": "**Paso 1.** Promedio ponderado: 62(1−x)+64x=63,2. **Paso 2.** Desarrollar: 62−62x+64x=63,2. **Paso 3.** Simplificar: 62+2x=63,2; entonces 2x=1,2. **Paso 4.** Despejar: x=0,60=60 %. Control: el promedio está más cerca de 64 que de 62, por lo que el isótopo 64 debe ser el más abundante. Conclusión: 60 %. **Respuesta correcta: C. 60 %**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "qui-avz-03",
      "s": "qui",
      "n": 3,
      "d": "experto",
      "topics": [
        "4.3.2-propiedades"
      ],
      "ch": "q7",
      "t": "Propiedades periódicas",
      "prompt": "Un anión se forma cuando un átomo gana electrones. Para identificar el elemento debe recuperarse primero el número de electrones del átomo neutro y luego relacionarlo con el número atómico. El ion X²⁻ posee 18 electrones. El átomo es neutro antes de formar el ion. Considere la numeración moderna de grupos. Identifique el elemento X y su ubicación en la tabla periódica.",
      "opts": [
        "Oxígeno, período 2 y grupo 16",
        "Azufre, período 3 y grupo 16",
        "Cloro, período 3 y grupo 17",
        "Argón, período 3 y grupo 18"
      ],
      "ans": 1,
      "exp": "**Paso 1.** Interpretar la carga: 2− significa que el ion tiene dos electrones más que el átomo neutro. **Paso 2.** Electrones neutros: 18−2=16; por tanto Z=16. **Paso 3.** Identificar: Z=16 corresponde al azufre. **Paso 4.** Configuración de valencia: 3s²3p⁴; mayor nivel n=3, seis electrones de valencia. Conclusión: azufre, período 3 y grupo 16. **Respuesta correcta: B. Azufre, período 3 y grupo 16**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "qui-avz-04",
      "s": "qui",
      "n": 4,
      "d": "experto",
      "topics": [
        "4.3.1-electronica"
      ],
      "ch": "q4",
      "t": "Estructura electrónica",
      "prompt": "Cada electrón se describe mediante cuatro números cuánticos. Un conjunto es imposible si viola aunque sea una de las reglas de rango para n, l, ml o ms. Reglas: n=1,2,...; l=0...n−1; ml=−l...+l; ms=±1/2. Seleccione el conjunto que no puede corresponder a ningún electrón.",
      "opts": [
        "n=4, l=2, ml=−2, ms=+1/2",
        "n=3, l=0, ml=0, ms=−1/2",
        "n=2, l=1, ml=+1, ms=+1/2",
        "n=3, l=2, ml=+3, ms=−1/2"
      ],
      "ans": 3,
      "exp": "**Paso 1.** en A, para l=2, ml=−2 es válido. **Paso 2.** en B, un orbital s tiene l=0 y necesariamente ml=0; es válido. **Paso 3.** en C, para l=1, ml=+1 es válido. **Paso 4.** en D, con l=2, ml solo puede ser −2,−1,0,+1,+2; +3 es imposible. Conclusión: el conjunto D viola el rango de ml. **Respuesta correcta: D. n=3, l=2, ml=+3, ms=−1/2**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "qui-avz-05",
      "s": "qui",
      "n": 5,
      "d": "experto",
      "topics": [
        "4.3.3-lewis"
      ],
      "ch": "q11",
      "t": "Estructuras de Lewis",
      "prompt": "El ion nitrato puede representarse mediante estructuras resonantes equivalentes. En una de ellas, el nitrógeno central tiene un enlace doble con un oxígeno y enlaces simples con los otros dos. Use CF = electrones de valencia − electrones no enlazantes − 1/2(electrones enlazantes). La suma de las cargas formales debe ser −1. Indique la distribución correcta de cargas formales en esa estructura.",
      "opts": [
        "N −1 y todos los O 0",
        "N +1; O con doble enlace 0; cada O con enlace simple −1",
        "N 0; O con doble enlace +1; O simples −1",
        "Todos los átomos tienen carga formal 0"
      ],
      "ans": 1,
      "exp": "**Paso 1.** N central: tiene 5 electrones de valencia, ninguno no enlazante y 8 enlazantes: CF=5−0−4=+1. **Paso 2.** O con doble enlace: CF=6−4−2=0. **Paso 3.** Cada O con enlace simple: CF=6−6−1=−1. **Paso 4.** Suma: +1+0−1−1=−1, igual a la carga del ion. Conclusión: la opción B es correcta; la resonancia cambia cuál oxígeno tiene el doble enlace. **Respuesta correcta: B. N +1; O con doble enlace 0; cada O con enlace simple −1**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "qui-avz-06",
      "s": "qui",
      "n": 6,
      "d": "experto",
      "topics": [
        "4.3.3-fuerzas"
      ],
      "ch": "q13",
      "t": "Fuerzas intermoleculares",
      "prompt": "Tres sustancias moleculares pequeñas presentan fuerzas intermoleculares diferentes. Para ordenar sus puntos de ebullición debe identificarse la interacción dominante y considerar que fuerzas más intensas requieren más energía para separar las moléculas. Compare CH₄ (no polar), HCl (polar) y HF (capaz de formar puentes de hidrógeno). Seleccione el orden creciente más razonable de punto de ebullición.",
      "opts": [
        "HF < HCl < CH₄",
        "CH₄ < HCl < HF",
        "HCl < HF < CH₄",
        "CH₄ < HF < HCl"
      ],
      "ans": 1,
      "exp": "**Paso 1.** CH₄: no polar; presenta fuerzas de London relativamente débiles. **Paso 2.** HCl: posee dipolo permanente; añade atracciones dipolo–dipolo. **Paso 3.** HF: el enlace H–F permite puentes de hidrógeno, mucho más intensos. **Paso 4.** Relación: mayor fuerza intermolecular implica mayor temperatura de ebullición. Conclusión: CH₄ < HCl < HF. **Respuesta correcta: B. CH₄ < HCl < HF**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "qui-avz-07",
      "s": "qui",
      "n": 7,
      "d": "experto",
      "topics": [
        "4.3.4-empirica"
      ],
      "ch": "q15",
      "t": "Fórmulas empírica y molecular",
      "prompt": "Un hidrocarburo contiene solo carbono e hidrógeno. Al quemarlo completamente, todo el carbono aparece en CO₂ y todo el hidrógeno en H₂O. Estos productos permiten reconstruir primero la fórmula empírica y después la molecular. Se queman 0,88 g y se obtienen 2,64 g CO₂ y 1,08 g H₂O. La masa molar del hidrocarburo es 56 g/mol. Use M(CO₂)=44 y M(H₂O)=18. Determine la fórmula molecular del hidrocarburo.",
      "opts": [
        "CH₂",
        "C₂H₄",
        "C₃H₆",
        "C₄H₈"
      ],
      "ans": 3,
      "exp": "**Paso 1.** Carbono: nCO₂=2,64/44=0,060 mol; por tanto nC=0,060 mol. **Paso 2.** Hidrógeno: nH₂O=1,08/18=0,060 mol; cada agua contiene 2 H, así que nH=0,120 mol. **Paso 3.** Razón mínima: C:H=0,060:0,120=1:2; fórmula empírica CH₂. **Paso 4.** Masa empírica: 12+2=14 g/mol. **Paso 5.** Factor molecular: 56/14=4; (CH₂)₄=C₄H₈. Conclusión: C₄H₈. **Respuesta correcta: D. C₄H₈**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "qui-avz-08",
      "s": "qui",
      "n": 8,
      "d": "experto",
      "topics": [
        "4.3.4-empirica"
      ],
      "ch": "q15",
      "t": "Fórmulas empírica y molecular",
      "prompt": "El peróxido de hidrógeno puede actuar como agente reductor cuando se transforma en oxígeno molecular. La clave es recordar que el oxígeno no tiene su número habitual −2 dentro de un peróxido. Considere la transformación de H₂O₂ en O₂ en medio ácido. En los peróxidos el oxígeno vale −1; en una sustancia elemental vale 0. Indique qué cambio experimenta el oxígeno y cómo se clasifica.",
      "opts": [
        "Pasa de −2 a 0 y se reduce",
        "Pasa de −1 a 0 y se oxida",
        "Pasa de +1 a 0 y se reduce",
        "No cambia su número de oxidación"
      ],
      "ans": 1,
      "exp": "**Paso 1.** Estado inicial: en H₂O₂, el oxígeno vale −1. **Paso 2.** Estado final: en O₂, cada oxígeno vale 0. **Paso 3.** Comparar: −1→0 es un aumento del número de oxidación. **Paso 4.** Clasificar: aumentar equivale a oxidarse; la especie pierde electrones. Conclusión: el oxígeno se oxida de −1 a 0. **Respuesta correcta: B. Pasa de −1 a 0 y se oxida**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "qui-avz-09",
      "s": "qui",
      "n": 9,
      "d": "experto",
      "topics": [
        "4.3.4-mol"
      ],
      "ch": "q14",
      "t": "Concepto de mol",
      "prompt": "El aluminio reacciona con ácido clorhídrico para producir cloruro de aluminio e hidrógeno. Antes de usar la ecuación para calcular cantidades, debe balancearse con coeficientes enteros mínimos. Ecuación sin balancear: Al + HCl → AlCl₃ + H₂. Reaccionan por completo 4,0 mol Al con HCl en exceso. Calcule los moles de H₂ producidos.",
      "opts": [
        "2 mol",
        "3 mol",
        "4 mol",
        "6 mol"
      ],
      "ans": 3,
      "exp": "**Paso 1.** Balancear: 2Al+6HCl→2AlCl₃+3H₂. **Paso 2.** Relación: 2 mol Al producen 3 mol H₂. **Paso 3.** Aplicar: 4,0 mol Al×(3 mol H₂/2 mol Al)=6,0 mol H₂. Control: al duplicar los 2 mol de Al del coeficiente, se duplica también el producto. Conclusión: se forman 6 mol H₂. **Respuesta correcta: D. 6 mol**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "qui-avz-10",
      "s": "qui",
      "n": 10,
      "d": "experto",
      "topics": [
        "4.3.4-esteq"
      ],
      "ch": "q17",
      "t": "Estequiometría",
      "prompt": "El carbonato de calcio reacciona con ácido clorhídrico. Aunque hay carbonato suficiente, el ácido puede agotarse primero. El reactivo limitante determina la cantidad máxima de dióxido de carbono. CaCO₃+2HCl→CaCl₂+H₂O+CO₂. Se mezclan 10,0 g CaCO₃ (100 g/mol) con 100 mL de HCl 1,0 mol/L. En CNPT, 1 mol de gas ocupa 22,4 L. Calcule el volumen máximo de CO₂ producido en CNPT.",
      "opts": [
        "0,56 L",
        "1,12 L",
        "2,24 L",
        "4,48 L"
      ],
      "ans": 1,
      "exp": "**Paso 1.** Moles de CaCO₃: 10,0/100=0,100 mol. **Paso 2.** Moles de HCl: 0,100 L×1,0 mol/L=0,100 mol. **Paso 3.** Limitante: 0,100 mol CaCO₃ necesitarían 0,200 mol HCl; solo hay 0,100, por lo que HCl limita. **Paso 4.** CO₂: 2 mol HCl→1 mol CO₂; se forman 0,050 mol CO₂. **Paso 5.** Volumen: 0,050×22,4=1,12 L. Conclusión: 1,12 L. **Respuesta correcta: B. 1,12 L**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "qui-avz-11",
      "s": "qui",
      "n": 11,
      "d": "experto",
      "topics": [
        "4.3.4-esteq"
      ],
      "ch": "q17",
      "t": "Estequiometría",
      "prompt": "Una muestra mineral no es carbonato de calcio puro. Después de corregir por pureza se calcula el rendimiento teórico de dióxido de carbono; finalmente se compara con la masa obtenida realmente. Muestra 25,0 g con 80 % de CaCO₃. Reacción CaCO₃→CaO+CO₂. M(CaCO₃)=100 g/mol, M(CO₂)=44 g/mol. Masa real de CO₂: 7,04 g. Determine el rendimiento porcentual de la reacción.",
      "opts": [
        "64 %",
        "75 %",
        "80 %",
        "88 %"
      ],
      "ans": 2,
      "exp": "**Paso 1.** Masa pura: 25,0×0,80=20,0 g CaCO₃. **Paso 2.** Moles de CaCO₃: 20,0/100=0,200 mol. **Paso 3.** Masa teórica de CO₂: relación 1:1; 0,200×44=8,80 g. **Paso 4.** Rendimiento: (7,04/8,80)×100=80 %. Aclaración: pureza y rendimiento son conceptos distintos, aunque aquí ambos resultan 80 %. Conclusión: el rendimiento es 80 %. **Respuesta correcta: C. 80 %**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "qui-avz-12",
      "s": "qui",
      "n": 12,
      "d": "experto",
      "topics": [
        "4.3.4-empirica"
      ],
      "ch": "q15",
      "t": "Fórmulas empírica y molecular",
      "prompt": "La composición porcentual indica cuántos gramos de cada elemento habría en 100 g de compuesto. Esas masas deben convertirse a moles y reducirse a la razón entera más sencilla. El óxido contiene 69,9 % Fe y 30,1 % O. Use masas atómicas Fe=55,85 y O=16,00. Determine la fórmula empírica del óxido.",
      "opts": [
        "FeO",
        "Fe₂O₃",
        "Fe₃O₄",
        "FeO₂"
      ],
      "ans": 1,
      "exp": "**Paso 1.** Base de 100 g: 69,9 g Fe y 30,1 g O. **Paso 2.** Moles: Fe 69,9/55,85=1,252; O 30,1/16=1,881. **Paso 3.** Dividir por el menor: Fe:O=1:1,503≈1:1,5. **Paso 4.** Eliminar la fracción: multiplicar por 2 da 2:3. Conclusión: la fórmula empírica es Fe₂O₃. **Respuesta correcta: B. Fe₂O₃**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "qui-avz-13",
      "s": "qui",
      "n": 13,
      "d": "experto",
      "topics": [
        "4.3.1-unidades"
      ],
      "ch": "q1",
      "t": "Unidades",
      "prompt": "Un manómetro informa la presión en milímetros de mercurio, pero el reporte experimental debe expresarla en kilopascales. La conversión puede hacerse pasando por atmósferas o usando una razón equivalente. Presión medida 745 mmHg; 1 atm=760 mmHg=101,325 kPa. Convierta la presión a kilopascales y seleccione el valor con tres cifras significativas.",
      "opts": [
        "96,7 kPa",
        "99,3 kPa",
        "101 kPa",
        "105 kPa"
      ],
      "ans": 1,
      "exp": "**Paso 1.** Plantear el factor: 745 mmHg×(1 atm/760 mmHg)×(101,325 kPa/1 atm). **Paso 2.** Cancelar unidades: se eliminan mmHg y atm; queda kPa. **Paso 3.** Calcular: (745/760)(101,325)=99,33 kPa. **Paso 4.** Cifras significativas: 99,3 kPa. Control: 745 mmHg es ligeramente menor que 760 mmHg, así que el resultado debe ser ligeramente menor que 101,325 kPa. Conclusión: 99,3 kPa. **Respuesta correcta: B. 99,3 kPa**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "qui-avz-14",
      "s": "qui",
      "n": 14,
      "d": "experto",
      "topics": [
        "4.3.4-reacciones"
      ],
      "ch": "q16",
      "t": "Reacciones químicas",
      "prompt": "Una muestra contiene limaduras de hierro, arena insoluble y cloruro de sodio. Se desea recuperar por separado los tres componentes aprovechando propiedades físicas, sin provocar reacciones químicas. El hierro es magnético; el NaCl se disuelve en agua; la arena no se disuelve; el agua puede evaporarse al final. Seleccione la secuencia de operaciones que permite separar correctamente los tres componentes.",
      "opts": [
        "Filtrar, imantar, sublimar y quemar",
        "Imantar; añadir agua; filtrar; evaporar el filtrado",
        "Evaporar; añadir agua; decantar; imantar",
        "Añadir ácido; filtrar; destilar y calcinar"
      ],
      "ans": 1,
      "exp": "**Paso 1.** Hierro: se retira con un imán antes de añadir agua. **Paso 2.** NaCl y arena: al añadir agua, el NaCl se disuelve y la arena permanece sólida. **Paso 3.** Filtración: la arena queda en el filtro; la disolución de NaCl pasa como filtrado. **Paso 4.** Evaporación: se elimina el agua y se recupera la sal. Conclusión: imantar → disolver → filtrar → evaporar. **Respuesta correcta: B. Imantar; añadir agua; filtrar; evaporar el filtrado**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "qui-avz-15",
      "s": "qui",
      "n": 15,
      "d": "experto",
      "topics": [
        "4.3.1-electronica"
      ],
      "ch": "q4",
      "t": "Estructura electrónica",
      "prompt": "La notación nuclear informa el número másico y el número atómico, mientras la carga indica cuántos electrones se ganaron o perdieron. Estas tres piezas deben interpretarse por separado. Ion ⁶⁵Cu²⁺; número atómico del cobre Z=29. Determine, en orden, el número de protones, neutrones y electrones.",
      "opts": [
        "29, 36, 27",
        "29, 34, 31",
        "36, 29, 27",
        "27, 36, 29"
      ],
      "ans": 0,
      "exp": "**Paso 1.** Protones: p=Z=29. **Paso 2.** Neutrones: n=A−Z=65−29=36. **Paso 3.** Electrones neutros: el átomo tendría 29. **Paso 4.** Carga 2+: perdió dos electrones: e=29−2=27. Conclusión: 29 protones, 36 neutrones y 27 electrones. **Respuesta correcta: A. 29, 36, 27**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "qui-avz-16",
      "s": "qui",
      "n": 16,
      "d": "experto",
      "topics": [
        "4.3.1-electronica"
      ],
      "ch": "q4",
      "t": "Estructura electrónica",
      "prompt": "La configuración electrónica de valencia permite ubicar un elemento y prever si tenderá a ganar o perder electrones para alcanzar una configuración de gas noble. Átomo neutro con configuración completa 1s² 2s² 2p⁶ 3s² 3p⁵. Seleccione la identificación y el ion monoatómico más probable.",
      "opts": [
        "Azufre del grupo 16; forma S²⁻",
        "Cloro del grupo 17; forma Cl⁻",
        "Argón del grupo 18; forma Ar⁺",
        "Sodio del grupo 1; forma Na⁺"
      ],
      "ans": 1,
      "exp": "**Paso 1.** Contar electrones: 2+2+6+2+5=17; el elemento es Cl. **Paso 2.** Período: el mayor n es 3. **Paso 3.** Valencia: 3s²3p⁵ contiene siete electrones de valencia, grupo 17. **Paso 4.** Ion estable: gana un electrón para completar 3p⁶, formando Cl⁻. Conclusión: cloro del grupo 17; forma Cl⁻. **Respuesta correcta: B. Cloro del grupo 17; forma Cl⁻**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "qui-avz-17",
      "s": "qui",
      "n": 17,
      "d": "experto",
      "topics": [
        "4.3.3-enlace"
      ],
      "ch": "q10",
      "t": "Enlace químico",
      "prompt": "Tres iones poseen el mismo número de electrones. En una serie isolectrónica, la especie con mayor número de protones atrae esos electrones con más intensidad y presenta menor radio. Compare F⁻ (Z=9), Na⁺ (Z=11) y Mg²⁺ (Z=12). Todos tienen 10 electrones. Seleccione el orden decreciente correcto de radio iónico.",
      "opts": [
        "Mg²⁺ > Na⁺ > F⁻",
        "F⁻ > Na⁺ > Mg²⁺",
        "Na⁺ > F⁻ > Mg²⁺",
        "F⁻ > Mg²⁺ > Na⁺"
      ],
      "ans": 1,
      "exp": "**Paso 1.** Isoelectrónicas: las tres especies tienen la misma cantidad de electrones y niveles ocupados comparables. **Paso 2.** Carga nuclear: F tiene 9 protones, Na 11 y Mg 12. **Paso 3.** Atracción: a mayor Z, mayor atracción y menor radio. Orden: F⁻ es mayor, luego Na⁺ y finalmente Mg²⁺. Conclusión: F⁻ > Na⁺ > Mg²⁺. **Respuesta correcta: B. F⁻ > Na⁺ > Mg²⁺**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "qui-avz-18",
      "s": "qui",
      "n": 18,
      "d": "experto",
      "topics": [
        "4.3.4-esteq"
      ],
      "ch": "q17",
      "t": "Formulación de una oxisal",
      "prompt": "Para escribir la fórmula de una sal iónica debe combinarse la cantidad mínima de cationes y aniones que produzca carga total cero. Si un ion poliatómico aparece más de una vez, se conserva unido entre paréntesis. Catión aluminio Al³⁺; anión sulfato SO₄²⁻. Seleccione la fórmula correcta del sulfato de aluminio.",
      "opts": [
        "AlSO₄",
        "Al₂SO₄",
        "Al₂(SO₄)₃",
        "Al₃(SO₄)₂"
      ],
      "ans": 2,
      "exp": "**Paso 1.** Cargas: aluminio +3; sulfato −2. **Paso 2.** Mínimo común: mcm de 3 y 2 es 6. **Paso 3.** Cantidades: 2 Al aportan +6; 3 sulfatos aportan −6. **Paso 4.** Fórmula: Al₂(SO₄)₃. Control: 2(+3)+3(−2)=0. Conclusión: opción C. **Respuesta correcta: C. Al₂(SO₄)₃**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "qui-avz-19",
      "s": "qui",
      "n": 19,
      "d": "experto",
      "topics": [
        "4.3.3-lewis"
      ],
      "ch": "q11",
      "t": "Estructuras de Lewis",
      "prompt": "Una sustancia desconocida es sólida, cristalina y quebradiza. No conduce corriente en estado sólido, pero sí cuando está fundida o disuelta en agua. Estas propiedades reflejan la movilidad de sus partículas cargadas. No se proporciona fórmula; debe inferirse el tipo de estructura a partir del comportamiento macroscópico. ¿Qué tipo de enlace predomina en la sustancia?",
      "opts": [
        "Covalente molecular",
        "Iónico",
        "Metálico",
        "Puente de hidrógeno"
      ],
      "ans": 1,
      "exp": "**Paso 1.** Sólido y alto orden: una red de iones puede formar cristales rígidos y frágiles. **Paso 2.** Sin conducción sólida: los iones están fijos en la red. **Paso 3.** Conducción fundida o acuosa: al liberarse, los iones transportan carga. Descartes: un metal conduciría como sólido; una sustancia molecular no suele producir iones móviles en el fundido. Conclusión: predomina el enlace iónico. **Respuesta correcta: B. Iónico**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "qui-avz-20",
      "s": "qui",
      "n": 20,
      "d": "experto",
      "topics": [
        "4.3.3-lewis"
      ],
      "ch": "q11",
      "t": "Estructuras de Lewis",
      "prompt": "La forma molecular depende del número de regiones electrónicas alrededor del átomo central. Los pares libres ocupan espacio y modifican la forma visible; la polaridad depende además de si los dipolos se cancelan. Molécula NH₃: el nitrógeno central forma tres enlaces N–H y conserva un par libre. Seleccione la combinación correcta de geometría molecular y polaridad.",
      "opts": [
        "Trigonal plana y no polar",
        "Trigonal piramidal y polar",
        "Tetraédrica y no polar",
        "Angular y polar"
      ],
      "ans": 1,
      "exp": "**Paso 1.** Regiones electrónicas: tres enlaces + un par libre = cuatro regiones; geometría electrónica tetraédrica. **Paso 2.** Forma molecular: al no contar el par libre como átomo, la forma es trigonal piramidal. **Paso 3.** Dipolos: la forma no es simétrica y los enlaces N–H son polares; no se cancelan. Conclusión: NH₃ es trigonal piramidal y polar. **Respuesta correcta: B. Trigonal piramidal y polar**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "qui-avz-21",
      "s": "qui",
      "n": 21,
      "d": "experto",
      "topics": [
        "4.3.3-fuerzas"
      ],
      "ch": "q13",
      "t": "Fuerzas intermoleculares",
      "prompt": "El etanol y el éter dimetílico tienen la misma fórmula molecular y masas molares semejantes, pero diferentes grupos funcionales. El etanol puede donar puentes de hidrógeno; el éter no posee hidrógeno unido al oxígeno. Compare CH₃CH₂OH y CH₃OCH₃ en estado puro. Indique cuál debe tener mayor punto de ebullición y la razón principal.",
      "opts": [
        "El éter, porque es menos polar",
        "El etanol, porque forma puentes de hidrógeno entre sus moléculas",
        "Son iguales porque tienen la misma fórmula molecular",
        "El éter, porque forma enlaces iónicos"
      ],
      "ans": 1,
      "exp": "**Paso 1.** Misma masa aproximada: la diferencia no se explica principalmente por London. **Paso 2.** Etanol: contiene enlace O–H; puede donar y aceptar puentes de hidrógeno. **Paso 3.** Éter: es polar y acepta puentes, pero en una muestra pura no tiene O–H para donarlos. **Paso 4.** Consecuencia: separar moléculas de etanol requiere más energía. Conclusión: el etanol presenta mayor punto de ebullición por sus puentes de hidrógeno. **Respuesta correcta: B. El etanol, porque forma puentes de hidrógeno entre sus moléculas**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "qui-avz-22",
      "s": "qui",
      "n": 22,
      "d": "experto",
      "topics": [
        "4.3.4-mol"
      ],
      "ch": "q14",
      "t": "Concepto de mol",
      "prompt": "Un volumen de gas en condiciones normales puede convertirse a moles mediante el volumen molar. Después debe distinguirse entre número de moléculas y número de átomos. Volumen de O₂: 11,2 L en CNPT; volumen molar 22,4 L/mol; NA=6,022×10²³. Cada molécula de O₂ contiene dos átomos de oxígeno. Calcule el número total de átomos de oxígeno en la muestra.",
      "opts": [
        "1,506×10²³",
        "3,011×10²³",
        "6,022×10²³",
        "1,204×10²⁴"
      ],
      "ans": 2,
      "exp": "**Paso 1.** Moles de O₂: n=11,2/22,4=0,50 mol. **Paso 2.** Moléculas: 0,50NA=3,011×10²³ moléculas. **Paso 3.** Átomos: cada molécula tiene 2; 2(3,011×10²³)=6,022×10²³ átomos. Conclusión: la muestra contiene 6,022×10²³ átomos de oxígeno. **Respuesta correcta: C. 6,022×10²³**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "qui-avz-23",
      "s": "qui",
      "n": 23,
      "d": "experto",
      "topics": [
        "4.3.4-empirica"
      ],
      "ch": "q15",
      "t": "Fórmulas empírica y molecular",
      "prompt": "Un compuesto contiene carbono, hidrógeno y oxígeno. A partir de porcentajes se obtiene la fórmula empírica; la masa molar real indica cuántas veces debe multiplicarse esa unidad mínima. Composición: 54,5 % C, 9,1 % H, 36,4 % O; masa molar real 88 g/mol. Use C=12, H=1, O=16. Determine la fórmula molecular.",
      "opts": [
        "C₂H₄O",
        "C₃H₆O₂",
        "C₄H₈O₂",
        "C₄H₈O₄"
      ],
      "ans": 2,
      "exp": "**Paso 1.** Suponga 100 g: C 54,5 g, H 9,1 g, O 36,4 g. **Paso 2.** Moles: C 54,5/12=4,54; H 9,1/1=9,1; O 36,4/16=2,275. **Paso 3.** Dividir por 2,275: C:H:O≈2:4:1; empírica C₂H₄O. **Paso 4.** Masa empírica: 2(12)+4(1)+16=44 g/mol. **Paso 5.** Factor: 88/44=2; molecular C₄H₈O₂. Conclusión: opción C. **Respuesta correcta: C. C₄H₈O₂**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "qui-avz-24",
      "s": "qui",
      "n": 24,
      "d": "experto",
      "topics": [
        "4.3.4-mol"
      ],
      "ch": "q14",
      "t": "Concepto de mol",
      "prompt": "El aluminio desplaza al cobre de una disolución de sulfato de cobre. El aluminio se oxida y el ion cobre se reduce. La ecuación balanceada permite calcular la masa teórica de metal depositado. 2Al+3CuSO₄→Al₂(SO₄)₃+3Cu. Reaccionan 5,40 g Al con CuSO₄ en exceso. Use M(Al)=27,0 g/mol y M(Cu)=63,5 g/mol. Calcule la masa teórica de cobre producida.",
      "opts": [
        "6,35 g",
        "12,7 g",
        "19,1 g",
        "38,1 g"
      ],
      "ans": 2,
      "exp": "**Paso 1.** Moles de Al: 5,40/27,0=0,200 mol. **Paso 2.** Relación: 2 mol Al→3 mol Cu. **Paso 3.** Moles de Cu: 0,200×(3/2)=0,300 mol. **Paso 4.** Masa: 0,300×63,5=19,05 g≈19,1 g. Redox: Al pasa de 0 a +3 y es reductor; Cu²⁺ pasa de +2 a 0 y se reduce. Conclusión: se producen teóricamente 19,1 g Cu. **Respuesta correcta: C. 19,1 g**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "qui-avz-25",
      "s": "qui",
      "n": 25,
      "d": "dificil",
      "topics": [
        "4.3.4-empirica"
      ],
      "ch": "q15",
      "t": "Fórmulas empírica y molecular",
      "prompt": "Una disolución se especifica mediante su volumen, densidad y porcentaje en masa. Primero debe calcularse la masa total de la disolución y después la fracción correspondiente al soluto. Volumen 250 mL; densidad 1,20 g/mL; concentración 12,0 % m/m de soluto. Calcule la masa de soluto contenida en la muestra.",
      "opts": [
        "25 g",
        "30 g",
        "36 g",
        "48 g"
      ],
      "ans": 2,
      "exp": "**Paso 1.** Masa de disolución: m=ρV=1,20(250)=300 g. **Paso 2.** Fracción en masa: 12,0 %=0,120. **Paso 3.** Masa de soluto: 300(0,120)=36 g. Conclusión: la muestra contiene 36 g de soluto. **Respuesta correcta: C. 36 g**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "qui-avz-26",
      "s": "qui",
      "n": 26,
      "d": "dificil",
      "topics": [
        "4.3.1-materia"
      ],
      "ch": "q2",
      "t": "Clasificación de la materia",
      "prompt": "Se comparan tres materiales: una aleación uniforme de cobre y zinc, agua destilada y granito con minerales visibles. Debe distinguirse sustancia pura, mezcla homogénea y mezcla heterogénea. El latón contiene cobre y zinc en proporciones variables; el agua destilada tiene composición definida; el granito presenta varias fases minerales. Seleccione la clasificación correcta en el mismo orden.",
      "opts": [
        "Compuesto, elemento, mezcla homogénea",
        "Mezcla homogénea, compuesto, mezcla heterogénea",
        "Elemento, mezcla homogénea, compuesto",
        "Mezcla heterogénea, elemento, mezcla homogénea"
      ],
      "ans": 1,
      "exp": "**Paso 1.** Latón: aleación uniforme y de proporción variable; mezcla homogénea. **Paso 2.** Agua destilada: sustancia pura compuesta, H₂O. **Paso 3.** Granito: se distinguen minerales; mezcla heterogénea. Conclusión: opción B. **Respuesta correcta: B. Mezcla homogénea, compuesto, mezcla heterogénea**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "qui-avz-27",
      "s": "qui",
      "n": 27,
      "d": "dificil",
      "topics": [
        "4.3.1-particulas"
      ],
      "ch": "q3",
      "t": "Partículas fundamentales",
      "prompt": "Un elemento posee solo dos isótopos de números másicos 10 y 11. La masa atómica promedio está más cerca de 11, por lo que ese isótopo debe ser más abundante. Masas aproximadas 10 u y 11 u; promedio 10,8 u. Sea x la fracción del isótopo 11. Determine la abundancia del isótopo de masa 11.",
      "opts": [
        "20 %",
        "40 %",
        "60 %",
        "80 %"
      ],
      "ans": 3,
      "exp": "**Paso 1.** Promedio: 10(1−x)+11x=10,8. **Paso 2.** Simplificar: 10−10x+11x=10,8; 10+x=10,8. **Paso 3.** Despejar: x=0,8=80 %. Conclusión: el isótopo 11 tiene abundancia 80 %. **Respuesta correcta: D. 80 %**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "qui-avz-28",
      "s": "qui",
      "n": 28,
      "d": "dificil",
      "topics": [
        "4.3.1-electronica"
      ],
      "ch": "q4",
      "t": "Estructura electrónica",
      "prompt": "El aluminio pierde sus tres electrones de valencia al formar Al³⁺. La configuración del ion debe escribirse después de restar esos electrones al átomo neutro. Aluminio Z=13; configuración neutra 1s² 2s² 2p⁶ 3s² 3p¹. Seleccione la configuración electrónica de Al³⁺.",
      "opts": [
        "1s² 2s² 2p⁶",
        "1s² 2s² 2p⁶ 3s²",
        "1s² 2s² 2p⁶ 3s² 3p⁴",
        "1s² 2s² 2p³"
      ],
      "ans": 0,
      "exp": "**Paso 1.** Electrones del ion: 13−3=10. **Paso 2.** Retirar del nivel externo: se eliminan 3p¹ y 3s². **Paso 3.** Configuración restante: 1s² 2s² 2p⁶. Conclusión: Al³⁺ es isolectrónico con Ne. **Respuesta correcta: A. 1s² 2s² 2p⁶**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "qui-avz-29",
      "s": "qui",
      "n": 29,
      "d": "dificil",
      "topics": [
        "4.3.3-enlace"
      ],
      "ch": "q10",
      "t": "Enlace químico",
      "prompt": "Tres elementos pertenecen al período 3. La electronegatividad aumenta en general de izquierda a derecha porque crece la atracción efectiva del núcleo sobre los electrones compartidos. Elementos Na, Al y Cl. Seleccione el orden decreciente de electronegatividad.",
      "opts": [
        "Na > Al > Cl",
        "Cl > Al > Na",
        "Al > Cl > Na",
        "Cl > Na > Al"
      ],
      "ans": 1,
      "exp": "**Paso 1.** Posiciones: Na está a la izquierda, Al en la zona central y Cl a la derecha. **Paso 2.** Tendencia: en un período la electronegatividad aumenta hacia la derecha. Conclusión: Cl > Al > Na. **Respuesta correcta: B. Cl > Al > Na**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "qui-avz-30",
      "s": "qui",
      "n": 30,
      "d": "dificil",
      "topics": [
        "4.3.2-nomenclatura"
      ],
      "ch": "q8",
      "t": "Nomenclatura",
      "prompt": "En una sal con un metal de valencia variable, el número romano indica el estado de oxidación del metal. El anión nitrato posee carga −1. Fórmula Cu(NO₃)₂. Seleccione el nombre correcto según nomenclatura Stock.",
      "opts": [
        "Nitrito de cobre (I)",
        "Nitrato de cobre (I)",
        "Nitrato de cobre (II)",
        "Dinitrato de cobre"
      ],
      "ans": 2,
      "exp": "**Paso 1.** Dos nitratos: carga total 2(−1)=−2. **Paso 2.** Neutralidad: el cobre debe valer +2. **Paso 3.** Nombre: nitrato de cobre (II). Conclusión: opción C. **Respuesta correcta: C. Nitrato de cobre (II)**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "qui-avz-31",
      "s": "qui",
      "n": 31,
      "d": "dificil",
      "topics": [
        "4.3.3-lewis"
      ],
      "ch": "q11",
      "t": "Estructuras de Lewis",
      "prompt": "Los enlaces C=O son polares, pero la molécula puede resultar no polar si su geometría permite que los dipolos se cancelen. En CO₂, el carbono central posee dos regiones enlazantes y ningún par libre; la estructura es O=C=O. Seleccione la combinación correcta.",
      "opts": [
        "Angular y polar",
        "Lineal y no polar",
        "Trigonal plana y polar",
        "Tetraédrica y no polar"
      ],
      "ans": 1,
      "exp": "**Paso 1.** VSEPR: dos regiones electrónicas se separan 180°; forma lineal. **Paso 2.** Dipolos: los dos enlaces tienen igual magnitud y direcciones opuestas. **Paso 3.** Suma vectorial: se cancelan. Conclusión: CO₂ es lineal y no polar. **Respuesta correcta: B. Lineal y no polar**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "qui-avz-32",
      "s": "qui",
      "n": 32,
      "d": "dificil",
      "topics": [
        "4.3.3-fuerzas"
      ],
      "ch": "q13",
      "t": "Fuerzas intermoleculares",
      "prompt": "Los halógenos moleculares Cl₂, Br₂ e I₂ son no polares. Sus puntos de ebullición dependen principalmente de la polarizabilidad y de la intensidad de las fuerzas de London. Al aumentar el tamaño de la nube electrónica, aumenta la polarizabilidad. ¿Cuál sustancia debe presentar el mayor punto de ebullición?",
      "opts": [
        "Cl₂",
        "Br₂",
        "I₂",
        "Los tres iguales"
      ],
      "ans": 2,
      "exp": "**Paso 1.** Tipo de fuerza: las tres moléculas son no polares; domina London. **Paso 2.** Polarizabilidad: crece con el número de electrones y el tamaño. **Paso 3.** Comparación: I₂ es la más grande y polarizable. Conclusión: I₂ tiene el mayor punto de ebullición. **Respuesta correcta: C. I₂**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "qui-avz-33",
      "s": "qui",
      "n": 33,
      "d": "dificil",
      "topics": [
        "4.3.4-empirica"
      ],
      "ch": "q15",
      "t": "Fórmulas empírica y molecular",
      "prompt": "Un óxido contiene únicamente carbono y oxígeno. Al suponer 100 g, los porcentajes se convierten directamente en gramos y luego en moles. Composición 27,3 % C y 72,7 % O; masas atómicas C=12, O=16. Determine la fórmula empírica.",
      "opts": [
        "CO",
        "CO₂",
        "C₂O",
        "C₂O₃"
      ],
      "ans": 1,
      "exp": "**Paso 1.** Moles de C: 27,3/12=2,275. **Paso 2.** Moles de O: 72,7/16=4,544. **Paso 3.** Dividir por el menor: C:O=1:1,997≈1:2. Conclusión: la fórmula empírica es CO₂. **Respuesta correcta: B. CO₂**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "qui-avz-34",
      "s": "qui",
      "n": 34,
      "d": "experto",
      "topics": [
        "4.3.4-mol"
      ],
      "ch": "q14",
      "t": "Concepto de mol",
      "prompt": "El clorato de potasio se descompone al calentarse. La ecuación balanceada relaciona los moles del reactivo con los moles de oxígeno gaseoso. 2KClO₃→2KCl+3O₂; masa de KClO₃ 24,5 g; masa molar 122,5 g/mol; volumen molar en CNPT 22,4 L/mol. Calcule el volumen de O₂ producido en CNPT.",
      "opts": [
        "2,24 L",
        "4,48 L",
        "6,72 L",
        "8,96 L"
      ],
      "ans": 2,
      "exp": "**Paso 1.** Moles de KClO₃: 24,5/122,5=0,200 mol. **Paso 2.** Relación: 2 mol KClO₃→3 mol O₂. **Paso 3.** Moles de O₂: 0,200(3/2)=0,300 mol. **Paso 4.** Volumen: 0,300(22,4)=6,72 L. Conclusión: se producen 6,72 L de O₂. **Respuesta correcta: C. 6,72 L**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "qui-avz-35",
      "s": "qui",
      "n": 35,
      "d": "dificil",
      "topics": [
        "4.3.4-esteq"
      ],
      "ch": "q17",
      "t": "Lectura de un modelo de partículas",
      "prompt": "Los tres recipientes de la figura contienen, respectivamente, partículas idénticas no enlazadas; parejas idénticas formadas por dos tipos de átomo; y una combinación de ambas clases de partícula. ¿Cómo se clasifican, en el orden I–II–III?",
      "opts": [
        "Compuesto puro, elemento y sustancia pura",
        "Mezcla homogénea, compuesto puro y elemento",
        "Elemento, compuesto puro y mezcla",
        "Compuesto puro, mezcla y elemento"
      ],
      "ans": 2,
      "exp": "**Paso 1.** En I todas las partículas son átomos del mismo tipo, por lo que representa un elemento. **Paso 2.** En II todas son moléculas idénticas constituidas por dos elementos, así que es un compuesto puro. **Paso 3.** En III coexisten átomos y moléculas diferentes sin reaccionar completamente: es una mezcla. **Paso 4.** La clasificación depende del número de tipos de partícula presentes, no de que el dibujo tenga uno o varios colores. **Respuesta correcta: C. Elemento, compuesto puro y mezcla**",
      "maths": [],
      "imgs": [],
      "fig": "avz-qui-35"
    },
    {
      "id": "qui-avz-36",
      "s": "qui",
      "n": 36,
      "d": "dificil",
      "topics": [
        "4.3.1-electronica"
      ],
      "ch": "q4",
      "t": "Estructura electrónica",
      "prompt": "El modelo de la figura muestra un núcleo con 11 protones y 12 neutrones, rodeado por 10 electrones. ¿Qué símbolo representa correctamente la especie?",
      "opts": [
        "²³Na⁺",
        "²³Na⁻",
        "²²Ne",
        "¹¹Na²⁺"
      ],
      "ans": 0,
      "exp": "**Paso 1.** Los 11 protones fijan Z=11, que corresponde al sodio. **Paso 2.** El número másico es A=11+12=23. **Paso 3.** Como hay un electrón menos que protones, la carga neta es +1. **Paso 4.** Por ello la notación es ²³Na⁺; la carga no cambia el número de protones ni el número másico. **Respuesta correcta: A. ²³Na⁺**",
      "maths": [],
      "imgs": [],
      "fig": "avz-qui-36"
    },
    {
      "id": "qui-avz-37",
      "s": "qui",
      "n": 37,
      "d": "dificil",
      "topics": [
        "4.3.2-propiedades"
      ],
      "ch": "q7",
      "t": "Propiedades periódicas",
      "prompt": "Las flechas de la figura indican una propiedad que aumenta, en términos generales, al avanzar de izquierda a derecha en un período y de abajo hacia arriba en un grupo. ¿Qué pareja de propiedades sigue esa dirección?",
      "opts": [
        "Radio atómico y carácter metálico",
        "Número de niveles ocupados y radio iónico",
        "Electronegatividad y energía de ionización",
        "Masa atómica y número de neutrones"
      ],
      "ans": 2,
      "exp": "**Paso 1.** La carga nuclear efectiva aumenta hacia la derecha y los electrones de valencia quedan, en general, más fuertemente atraídos; hacia arriba hay menos niveles electrónicos. **Paso 2.** Por eso la electronegatividad y la energía de ionización crecen hacia la esquina superior derecha. **Paso 3.** El radio atómico y el carácter metálico siguen la tendencia opuesta. **Respuesta correcta: C. Electronegatividad y energía de ionización**",
      "maths": [],
      "imgs": [],
      "fig": "avz-qui-37"
    },
    {
      "id": "qui-avz-38",
      "s": "qui",
      "n": 38,
      "d": "dificil",
      "topics": [
        "4.3.3-lewis"
      ],
      "ch": "q11",
      "t": "Estructuras de Lewis",
      "prompt": "En la figura se proponen cuatro estructuras para CO₂. ¿Cuál satisface los octetos, utiliza 16 electrones de valencia y deja carga formal cero en los tres átomos?",
      "opts": [
        "Estructura A",
        "Estructura B",
        "Estructura C",
        "Estructura D"
      ],
      "ans": 1,
      "exp": "**Paso 1.** La estructura correcta es O=C=O: cada oxígeno conserva dos pares libres y el carbono forma dos enlaces dobles. **Paso 2.** El conteo total es 8 electrones en enlaces y 8 no enlazantes; todos alcanzan octeto. **Paso 3.** Además, CF(C)=4−0−4=0 y CF(O)=6−4−2=0. **Paso 4.** Las otras propuestas dejan octetos incompletos, electrones de más o cargas formales innecesarias. **Respuesta correcta: B. Estructura B**",
      "maths": [],
      "imgs": [],
      "fig": "avz-qui-38"
    },
    {
      "id": "qui-avz-39",
      "s": "qui",
      "n": 39,
      "d": "experto",
      "topics": [
        "4.3.4-esteq"
      ],
      "ch": "q17",
      "t": "Estequiometría",
      "prompt": "La figura muestra 3 moléculas de N₂ y 6 moléculas de H₂ antes de la reacción N₂+3H₂→2NH₃. Si solo cuentan transformaciones que emplean moléculas completas, ¿qué ocurre al finalizar?",
      "opts": [
        "Limita N₂; se forman 6 NH₃ y sobra H₂",
        "Limita H₂; se forman 4 NH₃ y sobra 1 N₂",
        "Ambos se consumen; se forman 9 NH₃",
        "Limita H₂; se forman 2 NH₃ y sobran 2 N₂"
      ],
      "ans": 1,
      "exp": "**Paso 1.** Cada conjunto de reacción necesita 1 N₂ y 3 H₂. **Paso 2.** Las seis moléculas de hidrógeno permiten dos conjuntos completos: consumen 2 N₂ y producen 4 NH₃. **Paso 3.** Queda 1 N₂ sin reaccionar y no queda H₂; por tanto, el hidrógeno es el reactivo limitante. **Respuesta correcta: B. Limita H₂; se forman 4 NH₃ y sobra 1 N₂**",
      "maths": [],
      "imgs": [],
      "fig": "avz-qui-39"
    },
    {
      "id": "qui-avz-40",
      "s": "qui",
      "n": 40,
      "d": "dificil",
      "topics": [
        "4.3.2-nomenclatura"
      ],
      "ch": "q8",
      "t": "Nomenclatura",
      "prompt": "En la sal Fe₂(SO₄)₃, cada ion sulfato posee carga 2−. ¿Cuál es su nombre correcto según la nomenclatura Stock?",
      "opts": [
        "Sulfito de hierro (II)",
        "Sulfato de hierro (II)",
        "Sulfato de hierro (III)",
        "Trisulfato de dihierro (II)"
      ],
      "ans": 2,
      "exp": "**Paso 1.** Tres sulfatos aportan carga total 3(−2)=−6; los dos átomos de hierro deben aportar +6, es decir, cada Fe está en +3. **Paso 2.** El anión es sulfato, no sulfito. **Paso 3.** El nombre Stock es sulfato de hierro (III). **Respuesta correcta: C. Sulfato de hierro (III)**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "qui-avz-41",
      "s": "qui",
      "n": 41,
      "d": "dificil",
      "topics": [
        "4.3.3-fuerzas"
      ],
      "ch": "q13",
      "t": "Fuerzas intermoleculares",
      "prompt": "H₂O y H₂S son moléculas angulares y polares, pero el agua hierve a una temperatura mucho mayor. ¿Cuál explicación identifica la causa principal?",
      "opts": [
        "H₂S forma una red iónica y el agua no",
        "Las moléculas de agua forman puentes de hidrógeno intensos; en H₂S predominan fuerzas más débiles",
        "El agua tiene mayor masa molar que H₂S",
        "Los enlaces O–H se rompen cada vez que el agua hierve"
      ],
      "ans": 1,
      "exp": "**Paso 1.** El hidrógeno unido a oxígeno permite una red extensa de puentes de hidrógeno entre moléculas de agua. **Paso 2.** En H₂S no aparece esa interacción con intensidad comparable; predominan dipolo–dipolo y London. **Paso 3.** La ebullición separa moléculas, no rompe sus enlaces covalentes internos. **Respuesta correcta: B. Las moléculas de agua forman puentes de hidrógeno intensos; en H₂S predominan fuerzas más débiles**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "qui-avz-42",
      "s": "qui",
      "n": 42,
      "d": "dificil",
      "topics": [
        "4.3.4-mol"
      ],
      "ch": "q14",
      "t": "Concepto de mol",
      "prompt": "Una muestra de N₂ ocupa 5,60 L en CNPT, donde 1 mol de gas ocupa 22,4 L; use NA=6,022×10²³ mol⁻¹. ¿Cuántos átomos de nitrógeno contiene?",
      "opts": [
        "1,51×10²³",
        "3,01×10²³",
        "6,02×10²³",
        "1,20×10²⁴"
      ],
      "ans": 1,
      "exp": "**Paso 1.** n=5,60/22,4=0,250 mol de moléculas de N₂. **Paso 2.** Eso equivale a 0,250NA=1,5055×10²³ moléculas. **Paso 3.** Cada molécula contiene dos átomos, así que hay 3,011×10²³ átomos. **Paso 4.** La opción A cuenta moléculas, no átomos. **Respuesta correcta: B. 3,01×10²³**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "qui-avz-43",
      "s": "qui",
      "n": 43,
      "d": "experto",
      "topics": [
        "4.3.4-empirica"
      ],
      "ch": "q15",
      "t": "Fórmulas empírica y molecular",
      "prompt": "Un compuesto contiene 40,0 % C, 6,7 % H y 53,3 % O, y su masa molar es 180 g/mol; use C=12, H=1 y O=16. ¿Cuál es su fórmula molecular?",
      "opts": [
        "CH₂O",
        "C₂H₄O₂",
        "C₆H₁₂O₆",
        "C₁₂H₂₂O₁₁"
      ],
      "ans": 2,
      "exp": "**Paso 1.** En 100 g: n(C)=40/12≈3,33, n(H)=6,7/1=6,7 y n(O)=53,3/16≈3,33. **Paso 2.** Al dividir por 3,33 se obtiene aproximadamente 1:2:1, fórmula empírica CH₂O, de masa 30 g/mol. **Paso 3.** El factor es 180/30=6; por ello la fórmula molecular es C₆H₁₂O₆. **Respuesta correcta: C. C₆H₁₂O₆**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "qui-avz-44",
      "s": "qui",
      "n": 44,
      "d": "experto",
      "topics": [
        "4.3.4-esteq"
      ],
      "ch": "q17",
      "t": "Estequiometría",
      "prompt": "Para la reacción N₂+3H₂→2NH₃ se mezclan 14,0 g de N₂ y 2,0 g de H₂; use M(N₂)=28,0 g/mol, M(H₂)=2,0 g/mol y M(NH₃)=17,0 g/mol. ¿Cuál es el reactivo limitante y qué masa máxima de amoníaco puede formarse?",
      "opts": [
        "Limita N₂ y se forman 17,0 g",
        "Limita H₂ y se forman aproximadamente 11,3 g",
        "Limita H₂ y se forman 17,0 g",
        "Ninguno limita y se forman 34,0 g"
      ],
      "ans": 1,
      "exp": "**Paso 1.** Hay 14/28=0,50 mol N₂ y 2/2=1,00 mol H₂. **Paso 2.** Para consumir 0,50 mol N₂ harían falta 1,50 mol H₂, pero solo existe 1,00; por tanto limita el hidrógeno. **Paso 3.** La relación 3 mol H₂→2 mol NH₃ produce 1,00(2/3)=0,667 mol NH₃, cuya masa es 0,667(17)≈11,3 g. **Respuesta correcta: B. Limita H₂ y se forman aproximadamente 11,3 g**",
      "maths": [],
      "imgs": []
    }
  ],
  "len": [
    {
      "id": "len-avz-01",
      "s": "len",
      "n": 1,
      "d": "experto",
      "topics": [
        "4.4.2-critica"
      ],
      "ch": "l6",
      "t": "Lectura crítica",
      "prompt": "Un municipio reemplazó la asignación presencial de turnos por orden de llegada con una plataforma que prioriza casos de vulnerabilidad. Tres meses después, el tiempo promedio de espera bajó un 30 %. Sin embargo, en los barrios con conexión inestable se registraron menos solicitudes que antes, aunque la necesidad del servicio no había disminuido. El informe oficial calificó la reforma como exitosa basándose únicamente en el promedio general. Una organización vecinal pidió publicar resultados separados por zona, edad y acceso a internet antes de ampliar el sistema. Considere tanto la disminución del tiempo promedio como la caída de solicitudes en sectores con conectividad inestable. No suponga intenciones que el texto no demuestra. Seleccione la evaluación crítica más precisa del informe oficial.",
      "opts": [
        "La reforma fracasó únicamente porque utiliza tecnología",
        "El promedio demuestra que todas las personas recibieron un mejor servicio",
        "El promedio sugiere una mejora global, pero no basta para evaluar acceso y equidad entre grupos",
        "La disminución de solicitudes demuestra que esos barrios dejaron de necesitar el servicio"
      ],
      "ans": 2,
      "exp": "**Paso 1.** Identificar el logro: el tiempo promedio bajó 30 %, lo que puede indicar mayor rapidez agregada. **Paso 2.** Identificar la omisión: en barrios con mala conexión disminuyeron las solicitudes sin disminuir la necesidad. **Paso 3.** Evaluar el promedio: una media general puede ocultar resultados distintos entre grupos. Descartes: A rechaza el sistema por su medio; B universaliza un promedio; D confunde menor acceso con menor necesidad. Conclusión: la opción C integra el logro y la limitación sin exceder la evidencia. **Respuesta correcta: C. El promedio sugiere una mejora global, pero no basta para evaluar acceso y equidad entre grupos**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "len-avz-02",
      "s": "len",
      "n": 2,
      "d": "experto",
      "topics": [
        "4.4.2-lectura"
      ],
      "ch": "l5",
      "t": "Análisis e interpretación",
      "prompt": "Un municipio reemplazó la asignación presencial de turnos por orden de llegada con una plataforma que prioriza casos de vulnerabilidad. Tres meses después, el tiempo promedio de espera bajó un 30 %. Sin embargo, en los barrios con conexión inestable se registraron menos solicitudes que antes, aunque la necesidad del servicio no había disminuido. El informe oficial calificó la reforma como exitosa basándose únicamente en el promedio general. Una organización vecinal pidió publicar resultados separados por zona, edad y acceso a internet antes de ampliar el sistema. Una inferencia válida debe combinar las pistas del texto y conservar un grado de certeza prudente. No debe atribuir intención ni convertir una posibilidad en hecho universal. ¿Cuál inferencia está mejor respaldada por el pasaje?",
      "opts": [
        "La plataforma fue diseñada deliberadamente para excluir a ciertos barrios",
        "La reforma puede haber mejorado la rapidez y, al mismo tiempo, creado o agravado una barrera digital",
        "Todas las personas sin internet perdieron definitivamente su turno",
        "El sistema anterior por orden de llegada era completamente equitativo"
      ],
      "ans": 1,
      "exp": "**Paso 1.** Pista favorable: disminuyó el tiempo promedio. **Paso 2.** Pista problemática: bajaron las solicitudes donde la conexión es inestable. **Paso 3.** Relación: pueden coexistir eficiencia agregada y barrera de acceso. Descartes: A atribuye intención; C usa “todas” sin respaldo; D idealiza el sistema anterior. Conclusión: la opción B mantiene el alcance exacto de la evidencia. **Respuesta correcta: B. La reforma puede haber mejorado la rapidez y, al mismo tiempo, creado o agravado una barrera digital**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "len-avz-03",
      "s": "len",
      "n": 3,
      "d": "experto",
      "topics": [
        "4.4.1-juicio"
      ],
      "ch": "l3",
      "t": "Juicios de valor",
      "prompt": "Un municipio reemplazó la asignación presencial de turnos por orden de llegada con una plataforma que prioriza casos de vulnerabilidad. Tres meses después, el tiempo promedio de espera bajó un 30 %. Sin embargo, en los barrios con conexión inestable se registraron menos solicitudes que antes, aunque la necesidad del servicio no había disminuido. El informe oficial calificó la reforma como exitosa basándose únicamente en el promedio general. Una organización vecinal pidió publicar resultados separados por zona, edad y acceso a internet antes de ampliar el sistema. La pregunta no pide una opinión sobre la tecnología, sino identificar qué datos permitirían comprobar si los beneficios y perjuicios se distribuyeron de manera equitativa. ¿Qué información adicional sería más útil para evaluar la reforma?",
      "opts": [
        "El color y la tipografía de la plataforma",
        "Tiempos de espera y tasas de solicitud desagregados por zona, edad y conectividad, comparados antes y después",
        "El testimonio de una sola persona satisfecha",
        "La cantidad total de líneas de código utilizadas"
      ],
      "ans": 1,
      "exp": "**Paso 1.** Variable de resultado: tiempo de espera. **Paso 2.** Variable de acceso: cantidad o tasa de solicitudes. **Paso 3.** Comparación necesaria: antes/después y entre grupos afectados. **Paso 4.** Evaluar opciones: solo B permite medir distribución, magnitud y cambio temporal. Conclusión: la evidencia desagregada y comparativa es la más pertinente. **Respuesta correcta: B. Tiempos de espera y tasas de solicitud desagregados por zona, edad y conectividad, comparados antes y después**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "len-avz-04",
      "s": "len",
      "n": 4,
      "d": "experto",
      "topics": [
        "4.4.2-lectura"
      ],
      "ch": "l5",
      "t": "Análisis e interpretación",
      "prompt": "Un modelo científico se parece a un mapa: omite detalles para hacer visible una estructura. Exigirle que reproduzca cada rasgo del mundo lo volvería tan inútil como un mapa del tamaño del territorio. Su valor no depende de ser definitivo, sino de explicar y predecir dentro de límites conocidos. Cuando una anomalía persiste, no siempre destruye el modelo; puede revelar una condición que no se había considerado y orientar una corrección. La ciencia avanza no porque sus modelos sean perfectos, sino porque pueden someterse a contraste y revisión. La tesis debe abarcar la analogía del mapa, el valor explicativo y predictivo, los límites del modelo y la posibilidad de revisión. No debe reducirse a un ejemplo aislado. Seleccione la afirmación que mejor expresa la tesis del pasaje.",
      "opts": [
        "Todo modelo que presente una anomalía debe abandonarse inmediatamente",
        "Los modelos son simplificaciones útiles y revisables cuyo valor depende de su capacidad para explicar y predecir dentro de ciertos límites",
        "Los mapas contienen más información que la realidad que representan",
        "Una anomalía persistente siempre confirma que el modelo es correcto"
      ],
      "ans": 1,
      "exp": "**Paso 1.** Ideas recurrentes: simplificación, utilidad, límites, contraste y revisión. **Paso 2.** Prueba del paraguas: B cubre todas esas ideas. **Paso 3.** Descartes: A y D convierten los matices “no siempre” y “puede” en absolutos; C interpreta literalmente la analogía. Conclusión: B es la tesis global. **Respuesta correcta: B. Los modelos son simplificaciones útiles y revisables cuyo valor depende de su capacidad para explicar y predecir dentro de ciertos límites**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "len-avz-05",
      "s": "len",
      "n": 5,
      "d": "experto",
      "topics": [
        "4.4.2-logica"
      ],
      "ch": "l4",
      "t": "Razonamiento lógico",
      "prompt": "Un modelo científico se parece a un mapa: omite detalles para hacer visible una estructura. Exigirle que reproduzca cada rasgo del mundo lo volvería tan inútil como un mapa del tamaño del territorio. Su valor no depende de ser definitivo, sino de explicar y predecir dentro de límites conocidos. Cuando una anomalía persiste, no siempre destruye el modelo; puede revelar una condición que no se había considerado y orientar una corrección. La ciencia avanza no porque sus modelos sean perfectos, sino porque pueden someterse a contraste y revisión. La pregunta se refiere específicamente a la comparación con “un mapa del tamaño del territorio”. Debe identificarse para qué la usa el autor dentro de su razonamiento. ¿Qué función argumentativa cumple esa comparación?",
      "opts": [
        "Presentar una prueba estadística sobre cartografía",
        "Ridiculizar a quienes utilizan modelos científicos",
        "Mostrar que una representación puede perder utilidad si intenta conservar todos los detalles",
        "Demostrar que la ciencia solo estudia fenómenos geográficos"
      ],
      "ans": 2,
      "exp": "**Paso 1.** Contexto: el autor afirma que los modelos omiten detalles. **Paso 2.** Analogía: un mapa que copiara todo el territorio dejaría de simplificar y orientar. **Paso 3.** Transferencia: del mismo modo, un modelo puede ser útil precisamente porque selecciona rasgos relevantes. Conclusión: la analogía ilustra que la simplificación no es necesariamente un defecto. **Respuesta correcta: C. Mostrar que una representación puede perder utilidad si intenta conservar todos los detalles**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "len-avz-06",
      "s": "len",
      "n": 6,
      "d": "experto",
      "topics": [
        "4.4.2-lectura"
      ],
      "ch": "l5",
      "t": "Respuesta racional ante una anomalía per",
      "prompt": "Un modelo científico se parece a un mapa: omite detalles para hacer visible una estructura. Exigirle que reproduzca cada rasgo del mundo lo volvería tan inútil como un mapa del tamaño del territorio. Su valor no depende de ser definitivo, sino de explicar y predecir dentro de límites conocidos. Cuando una anomalía persiste, no siempre destruye el modelo; puede revelar una condición que no se había considerado y orientar una corrección. La ciencia avanza no porque sus modelos sean perfectos, sino porque pueden someterse a contraste y revisión. El texto no afirma que toda anomalía destruya un modelo ni que deba ignorarse. Plantea una actitud provisional y revisable ante evidencia que no encaja. Según el pasaje, ¿qué debería hacerse primero ante una anomalía persistente?",
      "opts": [
        "Ignorarla para proteger la teoría vigente",
        "Declarar falsa toda la ciencia relacionada",
        "Revisar el alcance, los supuestos y las condiciones del modelo para determinar si requiere corrección",
        "Aceptar cualquier explicación alternativa aunque no tenga evidencia"
      ],
      "ans": 2,
      "exp": "**Paso 1.** Evidencia textual: una anomalía puede revelar una condición omitida. **Paso 2.** Consecuencia: corresponde examinar supuestos y límites. **Paso 3.** Descartes: A bloquea la revisión; B destruye más de lo justificado; D abandona el criterio de evidencia. Conclusión: C aplica la postura crítica y revisable del pasaje. **Respuesta correcta: C. Revisar el alcance, los supuestos y las condiciones del modelo para determinar si requiere corrección**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "len-avz-07",
      "s": "len",
      "n": 7,
      "d": "experto",
      "topics": [
        "4.4.3-argumentacion"
      ],
      "ch": "l8",
      "t": "Argumentación y falacias",
      "prompt": "Una empresa ensayó una semana laboral de cuatro días en un departamento que se ofreció voluntariamente. Durante tres meses, la productividad por persona aumentó 12 % y el ausentismo disminuyó. La dirección afirmó que aplicar el plan a toda la compañía garantizaría el mismo resultado. El informe no comparó al grupo con otro departamento, no indicó si cambió la carga de trabajo y tampoco examinó si el efecto se mantuvo después del período inicial. La conclusión de la dirección usa la palabra “garantizaría”, por lo que debe evaluarse si el diseño y el alcance del ensayo permiten una afirmación tan fuerte. ¿Cuál es la principal debilidad del razonamiento?",
      "opts": [
        "La conclusión contiene números y los números nunca son confiables",
        "El ensayo duró más de una semana",
        "Un departamento voluntario y un período breve pueden no representar a toda la empresa; además, “garantizar” excede la evidencia",
        "La productividad no puede medirse de ninguna manera"
      ],
      "ans": 2,
      "exp": "**Paso 1.** Muestra: el grupo se ofreció voluntariamente; podría diferir en motivación y tareas. **Paso 2.** Duración: tres meses no prueban estabilidad a largo plazo. **Paso 3.** Falta de control: no existe grupo comparable ni información sobre carga laboral. **Paso 4.** Fuerza de conclusión: “garantizar” convierte un resultado limitado en certeza universal. Conclusión: C reúne los problemas de representatividad, control y alcance. **Respuesta correcta: C. Un departamento voluntario y un período breve pueden no representar a toda la empresa; además, “garantizar” excede la evidencia**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "len-avz-08",
      "s": "len",
      "n": 8,
      "d": "experto",
      "topics": [
        "4.4.2-lectura"
      ],
      "ch": "l5",
      "t": "Diseño que fortalecería una conclusión c",
      "prompt": "Una empresa ensayó una semana laboral de cuatro días en un departamento que se ofreció voluntariamente. Durante tres meses, la productividad por persona aumentó 12 % y el ausentismo disminuyó. La dirección afirmó que aplicar el plan a toda la compañía garantizaría el mismo resultado. El informe no comparó al grupo con otro departamento, no indicó si cambió la carga de trabajo y tampoco examinó si el efecto se mantuvo después del período inicial. Se busca distinguir el efecto de la semana de cuatro días de otras posibles causas, como motivación inicial, tipo de trabajo, cambios de carga o variaciones estacionales. ¿Qué diseño aportaría la evidencia más fuerte?",
      "opts": [
        "Repetir el ensayo únicamente con el mismo equipo",
        "Comparar durante más tiempo departamentos similares asignados al azar a cuatro o cinco días, con métricas definidas antes del estudio",
        "Preguntar a la dirección si considera atractiva la propuesta",
        "Publicar solo los meses en que la productividad fue mayor"
      ],
      "ans": 1,
      "exp": "**Paso 1.** Asignación aleatoria: reduce diferencias previas entre grupos. **Paso 2.** Grupo de comparación: ayuda a separar el efecto del programa de cambios externos. **Paso 3.** Mayor duración: permite evaluar permanencia. **Paso 4.** Métricas predefinidas: evita seleccionar después solo resultados favorables. Conclusión: B es el diseño más sólido. **Respuesta correcta: B. Comparar durante más tiempo departamentos similares asignados al azar a cuatro o cinco días, con métricas definidas antes del estudio**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "len-avz-09",
      "s": "len",
      "n": 9,
      "d": "experto",
      "topics": [
        "4.4.2-lectura"
      ],
      "ch": "l5",
      "t": "Reescritura con un grado de certeza adec",
      "prompt": "Una empresa ensayó una semana laboral de cuatro días en un departamento que se ofreció voluntariamente. Durante tres meses, la productividad por persona aumentó 12 % y el ausentismo disminuyó. La dirección afirmó que aplicar el plan a toda la compañía garantizaría el mismo resultado. El informe no comparó al grupo con otro departamento, no indicó si cambió la carga de trabajo y tampoco examinó si el efecto se mantuvo después del período inicial. La tarea consiste en conservar lo observado sin transformarlo en una causalidad universal. La redacción debe distinguir entre resultado local, duración limitada y necesidad de nuevas pruebas. ¿Cuál reescritura es la más rigurosa?",
      "opts": [
        "La semana de cuatro días siempre aumenta la productividad",
        "En el departamento estudiado y durante tres meses, el plan coincidió con mejores indicadores; falta comprobar si el efecto se mantiene y se generaliza",
        "La mejora demuestra que el personal trabajó menos horas efectivas",
        "Como el equipo fue voluntario, los resultados carecen de cualquier valor"
      ],
      "ans": 1,
      "exp": "**Paso 1.** Alcance: un departamento y tres meses. **Paso 2.** Resultado: hubo mejores indicadores en ese contexto. **Paso 3.** Causalidad: “coincidió” evita afirmar más de lo demostrado. **Paso 4.** Límite: pide replicación y seguimiento. Descartes: A universaliza; C inventa una explicación; D confunde limitación con inutilidad total. Conclusión: B calibra correctamente la certeza. **Respuesta correcta: B. En el departamento estudiado y durante tres meses, el plan coincidió con mejores indicadores; falta comprobar si el efecto se mantiene y se generaliza**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "len-avz-10",
      "s": "len",
      "n": 10,
      "d": "experto",
      "topics": [
        "4.4.3-parrafo"
      ],
      "ch": "l7",
      "t": "Construcción del párrafo",
      "prompt": "Las plataformas suelen medir la atención mediante clics, reproducciones y tiempo de pantalla. Esas métricas describen conductas observables, pero no revelan por sí solas qué comprendió una persona. Por esa razón, una cifra alta de interacción no equivale necesariamente a aprendizaje. Para evaluar comprensión se requieren además tareas que pidan explicar, aplicar, relacionar o cuestionar la información recibida. Imagine que las cuatro oraciones del pasaje aparecen desordenadas. Los referentes “esas métricas” y el conector “por esa razón” permiten reconstruir la progresión lógica. Ordene: (1) Por esa razón, una cifra alta de interacción no equivale necesariamente a aprendizaje. (2) Las plataformas miden atención con clics y tiempo de pantalla. (3) Esas métricas describen conducta, pero no revelan qué se comprendió. (4) Para evaluar comprensión se requieren tareas de explicar y aplicar.",
      "opts": [
        "1–2–4–3",
        "2–3–1–4",
        "2–1–3–4",
        "4–2–3–1"
      ],
      "ans": 1,
      "exp": "**Paso 1.** Introducción: 2 presenta las métricas. **Paso 2.** Referente: “Esas métricas” en 3 necesita la oración 2. **Paso 3.** Consecuencia: “Por esa razón” en 1 resume la limitación de 3. **Paso 4.** Cierre: 4 propone una forma complementaria de evaluación. Conclusión: el orden coherente es 2–3–1–4. **Respuesta correcta: B. 2–3–1–4**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "len-avz-11",
      "s": "len",
      "n": 11,
      "d": "experto",
      "topics": [
        "4.4.3-argumentacion"
      ],
      "ch": "l8",
      "t": "Argumentación y falacias",
      "prompt": "Las plataformas suelen medir la atención mediante clics, reproducciones y tiempo de pantalla. Esas métricas describen conductas observables, pero no revelan por sí solas qué comprendió una persona. Por esa razón, una cifra alta de interacción no equivale necesariamente a aprendizaje. Para evaluar comprensión se requieren además tareas que pidan explicar, aplicar, relacionar o cuestionar la información recibida. Una persona añade al debate: “Dos videos educativos virales contenían errores; por tanto, todos los videos cortos desinforman”. Debe evaluarse la relación entre la evidencia ofrecida y el alcance de la conclusión. ¿Qué falacia domina en ese razonamiento?",
      "opts": [
        "Generalización apresurada",
        "Apelación a la autoridad",
        "Petición de principio",
        "Falso dilema"
      ],
      "ans": 0,
      "exp": "**Paso 1.** Evidencia: solo se mencionan dos casos. **Paso 2.** Conclusión: se extiende a “todos los videos cortos”. **Paso 3.** Defecto: la muestra es insuficiente y posiblemente seleccionada por ser viral y problemática. Conclusión: se trata de una generalización apresurada. **Respuesta correcta: A. Generalización apresurada**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "len-avz-12",
      "s": "len",
      "n": 12,
      "d": "experto",
      "topics": [
        "4.4.3-puntuacion"
      ],
      "ch": "l9",
      "t": "Puntuación y concordancia",
      "prompt": "Las plataformas suelen medir la atención mediante clics, reproducciones y tiempo de pantalla. Esas métricas describen conductas observables, pero no revelan por sí solas qué comprendió una persona. Por esa razón, una cifra alta de interacción no equivale necesariamente a aprendizaje. Para evaluar comprensión se requieren además tareas que pidan explicar, aplicar, relacionar o cuestionar la información recibida. La oración debe mantener concordancia entre el sujeto plural “las métricas”, el verbo y el pronombre, y además separar correctamente el inciso concesivo. Seleccione la versión escrita de acuerdo con la norma y con puntuación clara.",
      "opts": [
        "Las métricas, aunque resultan útiles no demuestra por sí solas aprendizaje.",
        "Las métricas aunque resultan útiles, no demuestran, por sí solas aprendizaje.",
        "Las métricas, aunque resultan útiles, no demuestran por sí solas aprendizaje.",
        "Las métricas aunque, resultan útiles no demuestran por sí sola, aprendizaje."
      ],
      "ans": 2,
      "exp": "**Paso 1.** Concordancia verbal: sujeto plural exige demuestran. **Paso 2.** Concordancia pronominal: por sí solas concuerda con “métricas”. **Paso 3.** Inciso: aunque resultan útiles debe quedar entre comas. **Paso 4.** Unidad verbal: no se separa demuestran de su complemento aprendizaje. Conclusión: la opción C es correcta. **Respuesta correcta: C. Las métricas, aunque resultan útiles, no demuestran por sí solas aprendizaje.**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "len-avz-13",
      "s": "len",
      "n": 13,
      "d": "experto",
      "topics": [
        "4.4.2-lectura"
      ],
      "ch": "l5",
      "t": "Análisis e interpretación",
      "prompt": "Durante dos años, una ciudad reemplazó parte del asfalto de tres plazas por jardines de lluvia: depresiones con suelo permeable y vegetación que retienen temporalmente el agua. En esos sectores, los reportes de inundación disminuyeron 25 %. No obstante, el mismo período tuvo menos tormentas intensas que el promedio histórico. El equipo técnico concluyó que la intervención es prometedora, pero advirtió que aún no puede atribuirle por sí sola toda la reducción. Propuso comparar plazas semejantes y medir caudal, intensidad de lluvia y mantenimiento durante varios años. La idea principal debe integrar el resultado observado, la posible explicación y la cautela metodológica del equipo técnico. No basta con repetir el porcentaje. ¿Cuál opción resume mejor el contenido central del pasaje?",
      "opts": [
        "Los jardines de lluvia eliminaron definitivamente todas las inundaciones",
        "La disminución de reportes es prometedora, pero se necesitan comparaciones y más mediciones antes de atribuirla por completo a la intervención",
        "La menor cantidad de tormentas demuestra que los jardines no tienen efecto",
        "Toda plaza debe reemplazar de inmediato la totalidad de su asfalto"
      ],
      "ans": 1,
      "exp": "**Paso 1.** Resultado: los reportes bajaron 25 %. **Paso 2.** Variable rival: también hubo menos tormentas intensas. **Paso 3.** Conclusión del equipo: intervención prometedora, no causalidad definitiva. **Paso 4.** Próximo paso: comparación y medición prolongada. Conclusión: B reúne todos los elementos sin exagerar. **Respuesta correcta: B. La disminución de reportes es prometedora, pero se necesitan comparaciones y más mediciones antes de atribuirla por completo a la intervención**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "len-avz-14",
      "s": "len",
      "n": 14,
      "d": "experto",
      "topics": [
        "4.4.2-lectura"
      ],
      "ch": "l5",
      "t": "Análisis e interpretación",
      "prompt": "Durante dos años, una ciudad reemplazó parte del asfalto de tres plazas por jardines de lluvia: depresiones con suelo permeable y vegetación que retienen temporalmente el agua. En esos sectores, los reportes de inundación disminuyeron 25 %. No obstante, el mismo período tuvo menos tormentas intensas que el promedio histórico. El equipo técnico concluyó que la intervención es prometedora, pero advirtió que aún no puede atribuirle por sí sola toda la reducción. Propuso comparar plazas semejantes y medir caudal, intensidad de lluvia y mantenimiento durante varios años. Una inferencia válida debe reconocer que dos factores cambiaron durante el mismo período: la infraestructura de las plazas y la intensidad de las lluvias. ¿Qué inferencia está mejor respaldada?",
      "opts": [
        "La reducción puede deberse en parte a los jardines y en parte a la menor intensidad de las tormentas",
        "Los jardines causaron exactamente el 25 % de reducción",
        "La lluvia no influye en las inundaciones urbanas",
        "Los reportes ciudadanos son siempre falsos"
      ],
      "ans": 0,
      "exp": "**Paso 1.** Coincidencia temporal: se instalaron jardines y disminuyeron los reportes. **Paso 2.** Factor concurrente: hubo menos tormentas intensas. **Paso 3.** Causalidad: el texto no permite separar todavía cuánto corresponde a cada causa. Descartes: B cuantifica sin diseño; C contradice la lógica del fenómeno; D generaliza sin evidencia. Conclusión: A expresa una inferencia prudente. **Respuesta correcta: A. La reducción puede deberse en parte a los jardines y en parte a la menor intensidad de las tormentas**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "len-avz-15",
      "s": "len",
      "n": 15,
      "d": "experto",
      "topics": [
        "4.4.2-lectura"
      ],
      "ch": "l5",
      "t": "Significado contextual de “atribuir”",
      "prompt": "Durante dos años, una ciudad reemplazó parte del asfalto de tres plazas por jardines de lluvia: depresiones con suelo permeable y vegetación que retienen temporalmente el agua. En esos sectores, los reportes de inundación disminuyeron 25 %. No obstante, el mismo período tuvo menos tormentas intensas que el promedio histórico. El equipo técnico concluyó que la intervención es prometedora, pero advirtió que aún no puede atribuirle por sí sola toda la reducción. Propuso comparar plazas semejantes y medir caudal, intensidad de lluvia y mantenimiento durante varios años. En la frase “aún no puede atribuirle por sí sola toda la reducción”, el pronombre “le” se refiere a la intervención con jardines de lluvia. ¿Qué significa “atribuir” en ese contexto?",
      "opts": [
        "Medir con una regla",
        "Considerar algo como causa o explicación de un resultado",
        "Ocultar un dato desfavorable",
        "Repetir un experimento sin cambios"
      ],
      "ans": 1,
      "exp": "**Paso 1.** Contexto: se discute cuál fue la causa de la reducción. **Paso 2.** Sustitución: “no puede considerar a la intervención como única causa”. **Paso 3.** Descartes: medir, ocultar o repetir no encajan en la relación causal de la oración. Conclusión: “atribuir” significa asignar un resultado a una causa. **Respuesta correcta: B. Considerar algo como causa o explicación de un resultado**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "len-avz-16",
      "s": "len",
      "n": 16,
      "d": "experto",
      "topics": [
        "4.4.2-critica"
      ],
      "ch": "l6",
      "t": "Lectura crítica",
      "prompt": "Un colegio incorporó un tutor digital que ofrece pistas cuando el alumnado se equivoca. Después de ocho semanas, quienes usaron las pistas y luego explicaron el procedimiento mejoraron en problemas nuevos. En cambio, quienes pedían directamente la respuesta terminaron más rápido, pero recordaron menos una semana después. El informe sostiene que la herramienta puede apoyar el aprendizaje si promueve esfuerzo y retroalimentación, pero no sustituye la explicación docente ni la práctica independiente. El texto presenta resultados diferentes según la forma de usar la herramienta y termina formulando una condición para que sea educativa. ¿Cuál es el propósito predominante del pasaje?",
      "opts": [
        "Promocionar el tutor digital como sustituto total del profesorado",
        "Informar resultados y defender un uso que favorezca esfuerzo, explicación y retroalimentación",
        "Prohibir cualquier respuesta rápida en una plataforma",
        "Demostrar que terminar antes equivale siempre a aprender más"
      ],
      "ans": 1,
      "exp": "**Paso 1.** Presentación de datos: compara dos maneras de usar la herramienta. **Paso 2.** Interpretación: rapidez inmediata no equivale a retención. **Paso 3.** Tesis práctica: la herramienta apoya si promueve esfuerzo y feedback. Descartes: A contradice el cierre; C es más absoluta que el texto; D contradice los resultados. Conclusión: B describe el propósito informativo y argumentativo. **Respuesta correcta: B. Informar resultados y defender un uso que favorezca esfuerzo, explicación y retroalimentación**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "len-avz-17",
      "s": "len",
      "n": 17,
      "d": "experto",
      "topics": [
        "4.4.2-logica"
      ],
      "ch": "l4",
      "t": "Razonamiento lógico",
      "prompt": "Un colegio incorporó un tutor digital que ofrece pistas cuando el alumnado se equivoca. Después de ocho semanas, quienes usaron las pistas y luego explicaron el procedimiento mejoraron en problemas nuevos. En cambio, quienes pedían directamente la respuesta terminaron más rápido, pero recordaron menos una semana después. El informe sostiene que la herramienta puede apoyar el aprendizaje si promueve esfuerzo y retroalimentación, pero no sustituye la explicación docente ni la práctica independiente. La recomendación final afirma que las pistas son útiles cuando llevan a explicar y practicar, no cuando reemplazan el razonamiento. ¿Qué supuesto sostiene mejor esa recomendación?",
      "opts": [
        "El aprendizaje profundo requiere alguna elaboración activa del procedimiento",
        "Toda tecnología reduce la memoria",
        "La velocidad para responder es el único indicador de aprendizaje",
        "Las explicaciones docentes son innecesarias"
      ],
      "ans": 0,
      "exp": "**Paso 1.** Resultado relevante: explicar el procedimiento se asocia con transferencia a problemas nuevos. **Paso 2.** Resultado contrario: pedir la respuesta directa acelera, pero reduce retención. **Paso 3.** Supuesto puente: procesar y explicar activamente contribuye al aprendizaje duradero. Conclusión: A conecta los datos con la recomendación. **Respuesta correcta: A. El aprendizaje profundo requiere alguna elaboración activa del procedimiento**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "len-avz-18",
      "s": "len",
      "n": 18,
      "d": "experto",
      "topics": [
        "4.4.2-lectura"
      ],
      "ch": "l5",
      "t": "Dato que permitiría comprobar transferen",
      "prompt": "Un colegio incorporó un tutor digital que ofrece pistas cuando el alumnado se equivoca. Después de ocho semanas, quienes usaron las pistas y luego explicaron el procedimiento mejoraron en problemas nuevos. En cambio, quienes pedían directamente la respuesta terminaron más rápido, pero recordaron menos una semana después. El informe sostiene que la herramienta puede apoyar el aprendizaje si promueve esfuerzo y retroalimentación, pero no sustituye la explicación docente ni la práctica independiente. La transferencia consiste en aplicar lo aprendido a situaciones que no son copias del ejercicio practicado. ¿Qué resultado adicional fortalecería más la afirmación de que el uso guiado produce aprendizaje transferible?",
      "opts": [
        "Que la interfaz tenga colores agradables",
        "Que un grupo comparable, asignado al azar, resuelva mejor problemas nuevos varias semanas después",
        "Que el alumnado abra la aplicación muchas veces",
        "Que las respuestas directas aparezcan en menos segundos"
      ],
      "ans": 1,
      "exp": "**Paso 1.** Concepto objetivo: transferencia y retención. **Paso 2.** Medición adecuada: problemas nuevos y evaluación diferida. **Paso 3.** Diseño: grupo comparable y asignación al azar reducen explicaciones rivales. Descartes: estética, frecuencia de apertura y rapidez no demuestran comprensión. Conclusión: B aporta la evidencia más pertinente. **Respuesta correcta: B. Que un grupo comparable, asignado al azar, resuelva mejor problemas nuevos varias semanas después**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "len-avz-19",
      "s": "len",
      "n": 19,
      "d": "experto",
      "topics": [
        "4.4.2-lectura"
      ],
      "ch": "l5",
      "t": "Análisis e interpretación",
      "prompt": "Al amanecer, la comunidad observó una columna de ceniza sobre el volcán. Las autoridades habían recibido durante la noche registros de temblores pequeños, pero todavía discutían si ordenar la evacuación. Una guía local recordó que, en una erupción anterior, el río cambió de color horas antes del descenso de lodo. Cuando esa señal reapareció, el comité cerró el puente y trasladó a las familias de la ribera. Horas después, un lahar cubrió la vía, pero no encontró personas en la zona evacuada. La pregunta pide recuperar una acción expresamente mencionada, no inferir motivos ocultos. ¿Qué ocurrió inmediatamente después de reaparecer la señal del río?",
      "opts": [
        "El volcán dejó de emitir ceniza",
        "El comité cerró el puente y trasladó a las familias de la ribera",
        "Las autoridades declararon que no existía riesgo",
        "La comunidad esperó hasta que el lahar destruyera la vía"
      ],
      "ans": 1,
      "exp": "**Paso 1.** Localizar la secuencia: reaparece la señal del río. **Paso 2.** Acción siguiente explícita: el comité cerró el puente y trasladó a las familias. **Paso 3.** Descartes: las demás opciones contradicen o alteran el orden del relato. Conclusión: B reproduce la información literal. **Respuesta correcta: B. El comité cerró el puente y trasladó a las familias de la ribera**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "len-avz-20",
      "s": "len",
      "n": 20,
      "d": "experto",
      "topics": [
        "4.4.2-lectura"
      ],
      "ch": "l5",
      "t": "Relación entre antecedente y decisión",
      "prompt": "Al amanecer, la comunidad observó una columna de ceniza sobre el volcán. Las autoridades habían recibido durante la noche registros de temblores pequeños, pero todavía discutían si ordenar la evacuación. Una guía local recordó que, en una erupción anterior, el río cambió de color horas antes del descenso de lodo. Cuando esa señal reapareció, el comité cerró el puente y trasladó a las familias de la ribera. Horas después, un lahar cubrió la vía, pero no encontró personas en la zona evacuada. El pasaje menciona una erupción anterior y luego una señal presente. Debe determinarse cómo funciona ese antecedente dentro de la narración. ¿Qué relación cumple el recuerdo de la guía local?",
      "opts": [
        "Introduce un dato sin relación con la decisión",
        "Proporciona un antecedente que permite interpretar la señal actual y actuar preventivamente",
        "Demuestra que todo cambio de color produce una erupción",
        "Sustituye por completo los registros de temblores"
      ],
      "ans": 1,
      "exp": "**Paso 1.** Antecedente: en una erupción previa, el río cambió antes del lodo. **Paso 2.** Reaparición: la señal vuelve a observarse. **Paso 3.** Función: el conocimiento previo convierte una observación ambigua en motivo de precaución. Descartes: C universaliza; D dice que un dato elimina al otro, cosa que el texto no afirma. Conclusión: B explica la relación causal-narrativa. **Respuesta correcta: B. Proporciona un antecedente que permite interpretar la señal actual y actuar preventivamente**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "len-avz-21",
      "s": "len",
      "n": 21,
      "d": "experto",
      "topics": [
        "4.4.2-lectura"
      ],
      "ch": "l5",
      "t": "Análisis e interpretación",
      "prompt": "Al amanecer, la comunidad observó una columna de ceniza sobre el volcán. Las autoridades habían recibido durante la noche registros de temblores pequeños, pero todavía discutían si ordenar la evacuación. Una guía local recordó que, en una erupción anterior, el río cambió de color horas antes del descenso de lodo. Cuando esa señal reapareció, el comité cerró el puente y trasladó a las familias de la ribera. Horas después, un lahar cubrió la vía, pero no encontró personas en la zona evacuada. El relato informa que el lahar cubrió la vía, pero no encontró personas en la zona evacuada. La inferencia debe explicar el efecto de la decisión sin afirmar que se eliminó todo riesgo volcánico. ¿Cuál conclusión está mejor respaldada?",
      "opts": [
        "La evacuación preventiva redujo la exposición humana en esa zona",
        "Los temblores pequeños nunca son relevantes",
        "La guía local sabía con certeza la hora exacta del lahar",
        "Cerrar un puente detiene físicamente un lahar"
      ],
      "ans": 0,
      "exp": "**Paso 1.** Resultado: la vía fue cubierta. **Paso 2.** Estado de la población: ya no había personas en la zona evacuada. **Paso 3.** Relación: la decisión no evitó el fenómeno, pero sí redujo la exposición. Descartes: B niega un dato; C atribuye certeza no mencionada; D confunde prevención con control físico. Conclusión: A es la inferencia proporcional. **Respuesta correcta: A. La evacuación preventiva redujo la exposición humana en esa zona**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "len-avz-22",
      "s": "len",
      "n": 22,
      "d": "experto",
      "topics": [
        "4.4.3-argumentacion"
      ],
      "ch": "l8",
      "t": "Argumentación y falacias",
      "prompt": "Una propuesta municipal plantea reducir la tarifa de autobús mediante un fondo financiado con el cobro por estacionamiento en el centro. Sus defensores afirman que la medida podría aumentar el uso del transporte público y reducir congestión. Un concejal responde: “O mantenemos la tarifa actual o el sistema quebrará”. El estudio disponible estima ingresos y demanda durante un año, pero no incluye costos de mantenimiento extraordinario ni cambios de comportamiento a largo plazo. El concejal presenta solo dos posibilidades: mantener la tarifa o provocar la quiebra. La propuesta, sin embargo, contempla una fuente alternativa de financiación y admite otros resultados posibles. ¿Qué falacia aparece principalmente en la respuesta del concejal?",
      "opts": [
        "Falso dilema",
        "Ad hominem",
        "Apelación a la tradición",
        "Petición de principio"
      ],
      "ans": 0,
      "exp": "**Paso 1.** Forma del argumento: “o A o desastre B”. **Paso 2.** Alternativas omitidas: ajustar el fondo, modificar la reducción, buscar otras fuentes o evaluar gradualmente. **Paso 3.** Definición: limitar artificialmente el campo a dos opciones es un falso dilema. Conclusión: A. **Respuesta correcta: A. Falso dilema**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "len-avz-23",
      "s": "len",
      "n": 23,
      "d": "experto",
      "topics": [
        "4.4.2-lectura"
      ],
      "ch": "l5",
      "t": "Evidencia que fortalecería la viabilidad",
      "prompt": "Una propuesta municipal plantea reducir la tarifa de autobús mediante un fondo financiado con el cobro por estacionamiento en el centro. Sus defensores afirman que la medida podría aumentar el uso del transporte público y reducir congestión. Un concejal responde: “O mantenemos la tarifa actual o el sistema quebrará”. El estudio disponible estima ingresos y demanda durante un año, pero no incluye costos de mantenimiento extraordinario ni cambios de comportamiento a largo plazo. La propuesta necesita demostrar que el fondo cubriría la reducción tarifaria sin deteriorar el servicio a mediano plazo. ¿Qué información fortalecería más la viabilidad de la medida?",
      "opts": [
        "Una consigna publicitaria a favor del autobús",
        "Proyecciones auditables de ingresos, demanda y costos —incluido mantenimiento extraordinario— bajo varios escenarios durante varios años",
        "La preferencia personal de un concejal",
        "El número de colores usados en los buses"
      ],
      "ans": 1,
      "exp": "**Paso 1.** Afirmación a probar: sostenibilidad financiera. **Paso 2.** Variables necesarias: ingresos, demanda, costos ordinarios y extraordinarios. **Paso 3.** Horizonte: varios años para observar cambios de comportamiento. **Paso 4.** Transparencia: supuestos y escenarios auditables. Conclusión: B responde directamente a las debilidades del estudio actual. **Respuesta correcta: B. Proyecciones auditables de ingresos, demanda y costos —incluido mantenimiento extraordinario— bajo varios escenarios durante varios años**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "len-avz-24",
      "s": "len",
      "n": 24,
      "d": "experto",
      "topics": [
        "4.4.3-puntuacion"
      ],
      "ch": "l9",
      "t": "Puntuación y concordancia",
      "prompt": "Una propuesta municipal plantea reducir la tarifa de autobús mediante un fondo financiado con el cobro por estacionamiento en el centro. Sus defensores afirman que la medida podría aumentar el uso del transporte público y reducir congestión. Un concejal responde: “O mantenemos la tarifa actual o el sistema quebrará”. El estudio disponible estima ingresos y demanda durante un año, pero no incluye costos de mantenimiento extraordinario ni cambios de comportamiento a largo plazo. La oración contiene un inciso concesivo y dos proposiciones relacionadas por contraste. Debe mantenerse la concordancia con el sujeto singular “el estudio”. Seleccione la versión correctamente puntuada y concordada.",
      "opts": [
        "El estudio aunque ofrece una estimación inicial, no incluyen costos extraordinarios; por tanto sus conclusiones es provisionales.",
        "El estudio, aunque ofrece una estimación inicial, no incluye costos extraordinarios; por tanto, sus conclusiones son provisionales.",
        "El estudio, aunque ofrecen una estimación inicial no incluye, costos extraordinarios por tanto sus conclusiones son provisional.",
        "El estudio aunque, ofrece una estimación inicial, no incluyen costos extraordinarios; por tanto sus conclusiones son provisionales."
      ],
      "ans": 1,
      "exp": "**Paso 1.** Concordancia: “el estudio” exige ofrece e incluye; “sus conclusiones” exige son provisionales. **Paso 2.** Inciso: aunque ofrece una estimación inicial queda entre comas. **Paso 3.** Conector: después del punto y coma, por tanto lleva coma. Conclusión: la opción B satisface sintaxis, concordancia y puntuación. **Respuesta correcta: B. El estudio, aunque ofrece una estimación inicial, no incluye costos extraordinarios; por tanto, sus conclusiones son provisionales.**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "len-avz-25",
      "s": "len",
      "n": 25,
      "d": "dificil",
      "topics": [
        "4.4.2-lectura"
      ],
      "ch": "l5",
      "t": "Análisis e interpretación",
      "prompt": "Una biblioteca amplió su horario los fines de semana. En cuatro meses, las visitas aumentaron 40 %, pero el préstamo de libros se mantuvo estable. Una encuesta mostró que muchas personas acudían para usar internet, estudiar en grupo o recibir asesoría. El informe concluyó que medir el éxito únicamente por préstamos dejaría fuera varios usos relevantes del servicio. La respuesta debe integrar el aumento de visitas, la estabilidad de préstamos y los usos alternativos identificados por la encuesta. ¿Cuál es la idea principal del pasaje?",
      "opts": [
        "La ampliación del horario fracasó porque no aumentaron los préstamos",
        "El éxito de la biblioteca debe evaluarse con varios indicadores, no solo con el préstamo de libros",
        "Las personas dejaron de leer durante los fines de semana",
        "El acceso a internet reemplazó por completo a los libros"
      ],
      "ans": 1,
      "exp": "**Paso 1.** Contraste: visitas suben, préstamos permanecen. **Paso 2.** Explicación: existen otros usos valiosos. **Paso 3.** Conclusión del informe: un solo indicador es insuficiente. Conclusión: B resume todo el pasaje sin exagerar. **Respuesta correcta: B. El éxito de la biblioteca debe evaluarse con varios indicadores, no solo con el préstamo de libros**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "len-avz-26",
      "s": "len",
      "n": 26,
      "d": "dificil",
      "topics": [
        "4.4.2-lectura"
      ],
      "ch": "l5",
      "t": "Análisis e interpretación",
      "prompt": "Una biblioteca amplió su horario los fines de semana. En cuatro meses, las visitas aumentaron 40 %, pero el préstamo de libros se mantuvo estable. Una encuesta mostró que muchas personas acudían para usar internet, estudiar en grupo o recibir asesoría. El informe concluyó que medir el éxito únicamente por préstamos dejaría fuera varios usos relevantes del servicio. Una inferencia correcta debe ser compatible con que las visitas aumentaran aunque el número de préstamos no cambiara. ¿Qué inferencia está mejor respaldada?",
      "opts": [
        "Una parte del aumento de visitas se relaciona con servicios distintos al préstamo",
        "Nadie leyó libros dentro de la biblioteca",
        "La encuesta demuestra que todos los visitantes usaron internet",
        "La ampliación redujo el acceso al estudio grupal"
      ],
      "ans": 0,
      "exp": "**Paso 1.** Dato: aumentaron las visitas, no los préstamos. **Paso 2.** Encuesta: se reportan internet, estudio y asesoría. **Paso 3.** Inferencia: esos usos explican al menos parte del aumento. Descartes: B y C universalizan; D contradice el texto. Conclusión: A. **Respuesta correcta: A. Una parte del aumento de visitas se relaciona con servicios distintos al préstamo**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "len-avz-27",
      "s": "len",
      "n": 27,
      "d": "dificil",
      "topics": [
        "4.4.2-lectura"
      ],
      "ch": "l5",
      "t": "Significado de “indicador” en contexto",
      "prompt": "Una biblioteca amplió su horario los fines de semana. En cuatro meses, las visitas aumentaron 40 %, pero el préstamo de libros se mantuvo estable. Una encuesta mostró que muchas personas acudían para usar internet, estudiar en grupo o recibir asesoría. El informe concluyó que medir el éxito únicamente por préstamos dejaría fuera varios usos relevantes del servicio. La palabra se usa para referirse a una medida que ayuda a evaluar el desempeño de un servicio. ¿Qué significa “indicador” en el contexto del informe?",
      "opts": [
        "Una señal o medida utilizada para evaluar un fenómeno",
        "Una persona que presta libros",
        "Una norma que obliga a visitar la biblioteca",
        "Un aparato que aumenta la conexión a internet"
      ],
      "ans": 0,
      "exp": "**Paso 1.** Contexto: se compara medir éxito mediante préstamos con medir otros usos. **Paso 2.** Sustitución: “préstamos” funciona como una medida del desempeño. Conclusión: “indicador” significa señal o medida para evaluar un fenómeno. **Respuesta correcta: A. Una señal o medida utilizada para evaluar un fenómeno**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "len-avz-28",
      "s": "len",
      "n": 28,
      "d": "experto",
      "topics": [
        "4.4.2-logica"
      ],
      "ch": "l4",
      "t": "Razonamiento lógico",
      "prompt": "Una escuela ofreció desayuno gratuito durante seis semanas y la asistencia aumentó. La dirección afirmó que el programa causó toda la mejora. Sin embargo, durante el mismo período terminó la temporada de lluvias, cambió la ruta de transporte y no se comparó con otra escuela. El equipo evaluador recomendó continuar el programa, pero medirlo con un diseño que permita distinguir su efecto de otros cambios. La dirección atribuye toda la mejora al desayuno, pero varios factores cambiaron simultáneamente y no hubo grupo de comparación. ¿Cuál es la principal debilidad del razonamiento?",
      "opts": [
        "El programa duró más de un día",
        "La asistencia nunca puede medirse",
        "No se controlaron explicaciones alternativas, por lo que la coincidencia temporal no demuestra causalidad completa",
        "Toda comida gratuita reduce la asistencia"
      ],
      "ans": 2,
      "exp": "**Paso 1.** Resultado: asistencia aumentó. **Paso 2.** Cambios simultáneos: clima y transporte también mejoraron. **Paso 3.** Falta de control: no se sabe cuánto corresponde al desayuno. Conclusión: C identifica la confusión entre correlación y causa. **Respuesta correcta: C. No se controlaron explicaciones alternativas, por lo que la coincidencia temporal no demuestra causalidad completa**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "len-avz-29",
      "s": "len",
      "n": 29,
      "d": "experto",
      "topics": [
        "4.4.2-lectura"
      ],
      "ch": "l5",
      "t": "Diseño que fortalecería la evaluación",
      "prompt": "Una escuela ofreció desayuno gratuito durante seis semanas y la asistencia aumentó. La dirección afirmó que el programa causó toda la mejora. Sin embargo, durante el mismo período terminó la temporada de lluvias, cambió la ruta de transporte y no se comparó con otra escuela. El equipo evaluador recomendó continuar el programa, pero medirlo con un diseño que permita distinguir su efecto de otros cambios. El objetivo es aislar el efecto del desayuno de los cambios de clima, transporte y calendario. ¿Qué procedimiento aportaría evidencia más sólida?",
      "opts": [
        "Comparar durante más tiempo escuelas semejantes y controlar los otros cambios",
        "Preguntar únicamente a la dirección",
        "Usar solo la semana con mayor asistencia",
        "Eliminar del informe los días de lluvia"
      ],
      "ans": 0,
      "exp": "**Paso 1.** Comparabilidad: escuelas semejantes reducen diferencias iniciales. **Paso 2.** Duración: más tiempo permite observar estabilidad. **Paso 3.** Control: registrar clima y transporte ayuda a separar efectos. Descartes: B es sesgada; C y D seleccionan datos favorables. Conclusión: A. **Respuesta correcta: A. Comparar durante más tiempo escuelas semejantes y controlar los otros cambios**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "len-avz-30",
      "s": "len",
      "n": 30,
      "d": "dificil",
      "topics": [
        "4.4.2-lectura"
      ],
      "ch": "l5",
      "t": "Conclusión con alcance adecuado",
      "prompt": "Una escuela ofreció desayuno gratuito durante seis semanas y la asistencia aumentó. La dirección afirmó que el programa causó toda la mejora. Sin embargo, durante el mismo período terminó la temporada de lluvias, cambió la ruta de transporte y no se comparó con otra escuela. El equipo evaluador recomendó continuar el programa, pero medirlo con un diseño que permita distinguir su efecto de otros cambios. La redacción debe reconocer la mejora observada sin afirmar que el desayuno fue la única causa. ¿Cuál conclusión es más rigurosa?",
      "opts": [
        "El desayuno garantiza asistencia perfecta en cualquier escuela",
        "Durante el programa aumentó la asistencia, pero hacen falta comparaciones para estimar cuánto se debió al desayuno",
        "La temporada de lluvias fue la única causa",
        "Como no hubo grupo de control, ningún dato tiene valor"
      ],
      "ans": 1,
      "exp": "**Paso 1.** Conservar el dato: la asistencia aumentó. **Paso 2.** Reconocer límites: coexistieron otros cambios. **Paso 3.** Calibrar certeza: se requiere mejor diseño para estimar el efecto. Conclusión: B evita tanto la certeza excesiva como el rechazo total. **Respuesta correcta: B. Durante el programa aumentó la asistencia, pero hacen falta comparaciones para estimar cuánto se debió al desayuno**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "len-avz-31",
      "s": "len",
      "n": 31,
      "d": "dificil",
      "topics": [
        "4.4.3-parrafo"
      ],
      "ch": "l7",
      "t": "Construcción del párrafo",
      "prompt": "Los humedales urbanos almacenan temporalmente agua, filtran sedimentos y ofrecen hábitat. Cuando se rellenan para construir, la lluvia llega más rápido a canales y calles. Por ello, varios especialistas proponen conservarlos como parte de la infraestructura de drenaje, además de construir tuberías. Esta estrategia no elimina todas las inundaciones, pero puede reducir picos de caudal y aportar beneficios ecológicos. Las oraciones deben avanzar desde la función del humedal, pasar a la consecuencia de eliminarlo y terminar con la propuesta y sus límites. Ordene: (1) Por ello, se propone conservarlos como parte del drenaje. (2) Los humedales almacenan agua y filtran sedimentos. (3) Al rellenarlos, la lluvia llega más rápido a calles y canales. (4) La estrategia reduce picos, aunque no elimina todo riesgo.",
      "opts": [
        "1–2–4–3",
        "2–3–1–4",
        "2–1–3–4",
        "4–3–2–1"
      ],
      "ans": 1,
      "exp": "**Paso 1.** 2 presenta la función. **Paso 2.** 3 explica el problema al eliminarla. **Paso 3.** “Por ello” en 1 introduce la propuesta derivada. **Paso 4.** 4 limita y matiza el resultado. Conclusión: 2–3–1–4. **Respuesta correcta: B. 2–3–1–4**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "len-avz-32",
      "s": "len",
      "n": 32,
      "d": "dificil",
      "topics": [
        "4.4.2-lectura"
      ],
      "ch": "l5",
      "t": "Análisis e interpretación",
      "prompt": "Los humedales urbanos almacenan temporalmente agua, filtran sedimentos y ofrecen hábitat. Cuando se rellenan para construir, la lluvia llega más rápido a canales y calles. Por ello, varios especialistas proponen conservarlos como parte de la infraestructura de drenaje, además de construir tuberías. Esta estrategia no elimina todas las inundaciones, pero puede reducir picos de caudal y aportar beneficios ecológicos. El texto presenta los humedales como complemento, no como sustituto absoluto, de la infraestructura convencional. ¿Qué inferencia está mejor respaldada?",
      "opts": [
        "Conservar humedales puede complementar las tuberías y aportar beneficios adicionales",
        "Los humedales impiden toda inundación",
        "Construir tuberías siempre empeora el drenaje",
        "El hábitat no tiene relación con el valor del humedal"
      ],
      "ans": 0,
      "exp": "**Paso 1.** Texto explícito: se propone conservarlos “además de” construir tuberías. **Paso 2.** Beneficios: reducen picos y ofrecen funciones ecológicas. **Paso 3.** Límite: no eliminan todas las inundaciones. Conclusión: A respeta complemento, beneficio y límite. **Respuesta correcta: A. Conservar humedales puede complementar las tuberías y aportar beneficios adicionales**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "len-avz-33",
      "s": "len",
      "n": 33,
      "d": "dificil",
      "topics": [
        "4.4.3-argumentacion"
      ],
      "ch": "l8",
      "t": "Argumentación y falacias",
      "prompt": "Un comentarista afirmó: “Encontré un curso en línea con información desactualizada; por tanto, toda educación virtual es inútil”. Otra persona respondió que la calidad depende de la fuente, la actualización, el diseño didáctico y la verificación de contenidos, igual que ocurre en materiales impresos. El comentarista usa un solo ejemplo negativo para emitir una conclusión sobre toda una modalidad educativa. ¿Qué falacia comete principalmente?",
      "opts": [
        "Generalización apresurada",
        "Falso dilema",
        "Ad hominem",
        "Apelación a la tradición"
      ],
      "ans": 0,
      "exp": "**Paso 1.** Muestra: un solo curso. **Paso 2.** Conclusión: “toda educación virtual”. **Paso 3.** Defecto: el caso no representa la diversidad de cursos, fuentes y diseños. Conclusión: generalización apresurada. **Respuesta correcta: A. Generalización apresurada**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "len-avz-34",
      "s": "len",
      "n": 34,
      "d": "dificil",
      "topics": [
        "4.4.3-puntuacion"
      ],
      "ch": "l9",
      "t": "Puntuación y concordancia",
      "prompt": "Un comentarista afirmó: “Encontré un curso en línea con información desactualizada; por tanto, toda educación virtual es inútil”. Otra persona respondió que la calidad depende de la fuente, la actualización, el diseño didáctico y la verificación de contenidos, igual que ocurre en materiales impresos. La oración incluye un inciso y dos sujetos con números distintos: “un ejemplo” y “los cursos”. Seleccione la versión correcta.",
      "opts": [
        "Un ejemplo, aunque sea negativo no demuestra que todos los cursos es inútil.",
        "Un ejemplo aunque sea negativo, no demuestran que todos los cursos sean inútiles.",
        "Un ejemplo, aunque sea negativo, no demuestra que todos los cursos sean inútiles.",
        "Un ejemplo aunque, sea negativo no demuestra, que todos los cursos sean inútil."
      ],
      "ans": 2,
      "exp": "**Paso 1.** Sujeto principal: “un ejemplo” exige demuestra. **Paso 2.** Subordinada: “todos los cursos” exige sean inútiles. **Paso 3.** Inciso: aunque sea negativo va entre comas. Conclusión: la opción C es correcta. **Respuesta correcta: C. Un ejemplo, aunque sea negativo, no demuestra que todos los cursos sean inútiles.**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "len-avz-35",
      "s": "len",
      "n": 35,
      "d": "dificil",
      "topics": [
        "4.4.2-critica"
      ],
      "ch": "l6",
      "t": "Lectura crítica",
      "prompt": "El gráfico muestra el porcentaje de estudiantes que utilizó una biblioteca digital al menos una vez por semana, agrupado según la calidad de su conexión en casa. ¿Cuál interpretación está mejor respaldada sin convertir la asociación en causalidad?",
      "opts": [
        "La biblioteca digital causa una conexión doméstica más estable",
        "El uso semanal es mayor entre quienes tienen conexión estable, pero el gráfico no demuestra por sí solo por qué ocurre la diferencia",
        "Todas las personas sin internet en casa dejaron de estudiar",
        "La calidad de la conexión es el único factor que influye en el uso"
      ],
      "ans": 1,
      "exp": "**Paso 1.** El gráfico permite comparar porcentajes y observar una asociación: el acceso semanal disminuye cuando la conectividad es peor. **Paso 2.** No informa asignación de grupos, motivación, disponibilidad de dispositivos ni resultados de aprendizaje, de modo que no permite afirmar una causa única. **Paso 3.** A invierte la relación; C y D usan cuantificadores absolutos que los datos no sostienen. **Respuesta correcta: B. El uso semanal es mayor entre quienes tienen conexión estable, pero el gráfico no demuestra por sí solo por qué ocurre la diferencia**",
      "maths": [],
      "imgs": [],
      "fig": "avz-len-35"
    },
    {
      "id": "len-avz-36",
      "s": "len",
      "n": 36,
      "d": "experto",
      "topics": [
        "4.4.2-lectura"
      ],
      "ch": "l5",
      "t": "Evidencia necesaria para una afirmación ",
      "prompt": "A partir del mismo gráfico, una autoridad afirma que “usar la biblioteca digital eleva las calificaciones”. ¿Qué evidencia adicional permitiría evaluar esa afirmación con mayor rigor?",
      "opts": [
        "El color preferido de la interfaz entre quienes ya la usan",
        "Resultados académicos antes y después en grupos comparables, con control de conectividad, nivel previo y otras variables relevantes",
        "El testimonio de una sola persona que obtuvo una nota alta",
        "El número total de páginas disponibles, sin datos de uso ni aprendizaje"
      ],
      "ans": 1,
      "exp": "**Paso 1.** Una conclusión causal exige comprobar cambio temporal y reducir explicaciones alternativas. **Paso 2.** Comparar grupos semejantes, medir el nivel previo y controlar conectividad y otros factores aproxima mejor el efecto del uso. **Paso 3.** Un testimonio o una descripción de la plataforma puede ilustrar, pero no separa causalidad de selección previa. **Respuesta correcta: B. Resultados académicos antes y después en grupos comparables, con control de conectividad, nivel previo y otras variables relevantes**",
      "maths": [],
      "imgs": [],
      "fig": "avz-len-36"
    },
    {
      "id": "len-avz-37",
      "s": "len",
      "n": 37,
      "d": "dificil",
      "topics": [
        "4.4.1-comunicacion"
      ],
      "ch": "l1",
      "t": "Comunicación",
      "prompt": "Durante una videollamada, la persona emisora explica una dirección, pero cortes de audio eliminan varias palabras y la persona receptora entiende otro lugar. Según el esquema, ¿qué elemento intervino principalmente y cuál fue su efecto?",
      "opts": [
        "El referente, porque cambió físicamente la dirección mencionada",
        "El ruido, porque alteró la señal del canal y dificultó la decodificación del mensaje",
        "El código, porque ambas personas dejaron de usar la misma lengua",
        "La retroalimentación, porque impidió que existiera una persona emisora"
      ],
      "ans": 1,
      "exp": "**Paso 1.** Los cortes no cambian el referente ni necesariamente el código lingüístico: introducen interferencia en el canal. **Paso 2.** Esa perturbación recibe el nombre de ruido y hace que parte del mensaje llegue incompleta, lo que afecta la decodificación. **Paso 3.** La retroalimentación podría ayudar a detectar el problema, pero no es su causa. **Respuesta correcta: B. El ruido, porque alteró la señal del canal y dificultó la decodificación del mensaje**",
      "maths": [],
      "imgs": [],
      "fig": "avz-len-37"
    },
    {
      "id": "len-avz-38",
      "s": "len",
      "n": 38,
      "d": "experto",
      "topics": [
        "4.4.2-lectura"
      ],
      "ch": "l5",
      "t": "Alcance de una conclusión argumentativa",
      "prompt": "El diagrama resume un ensayo voluntario de tres meses en un solo curso: aumentó la entrega puntual de tareas y, a partir de ello, se concluyó que el método funcionará siempre en cualquier institución. ¿Cuál reformulación conserva la evidencia sin exceder su alcance?",
      "opts": [
        "El método garantiza mejores resultados para toda persona y en cualquier contexto",
        "En el curso y período observados, el método coincidió con más entregas puntuales; falta comprobar si el resultado se mantiene y se generaliza",
        "Como el ensayo fue pequeño, el aumento observado nunca ocurrió",
        "El resultado demuestra que todas las demás estrategias son perjudiciales"
      ],
      "ans": 1,
      "exp": "**Paso 1.** La evidencia es local, voluntaria y de corta duración. **Paso 2.** Puede describirse el resultado observado, pero no convertirlo en una garantía universal. **Paso 3.** B calibra el grado de certeza y señala la necesidad de réplica; A y D generalizan, mientras C confunde una limitación metodológica con inexistencia del dato. **Respuesta correcta: B. En el curso y período observados, el método coincidió con más entregas puntuales; falta comprobar si el resultado se mantiene y se generaliza**",
      "maths": [],
      "imgs": [],
      "fig": "avz-len-38"
    },
    {
      "id": "len-avz-39",
      "s": "len",
      "n": 39,
      "d": "dificil",
      "topics": [
        "4.4.3-parrafo"
      ],
      "ch": "l7",
      "t": "Construcción del párrafo",
      "prompt": "Las cuatro tarjetas de la figura forman un párrafo explicativo sobre el sueño y la memoria. ¿Qué orden construye una progresión lógica desde el tema, pasa por el mecanismo y termina con una recomendación matizada?",
      "opts": [
        "1–2–4–3",
        "2–3–1–4",
        "3–1–4–2",
        "4–2–1–3"
      ],
      "ans": 1,
      "exp": "**Paso 1.** La tarjeta 2 introduce el papel del sueño. **Paso 2.** La 3 retoma ese tema y explica la consolidación de recuerdos. **Paso 3.** La 1, encabezada por “por ello”, presenta la consecuencia práctica; la 4 cierra con un límite que evita prometer resultados automáticos. **Paso 4.** Los conectores y referentes hacen coherente 2–3–1–4. **Respuesta correcta: B. 2–3–1–4**",
      "maths": [],
      "imgs": [],
      "fig": "avz-len-39"
    },
    {
      "id": "len-avz-40",
      "s": "len",
      "n": 40,
      "d": "dificil",
      "topics": [
        "4.4.2-lectura"
      ],
      "ch": "l5",
      "t": "Análisis e interpretación",
      "prompt": "“Una ciudad plantó árboles en avenidas con altas temperaturas. Dos años después, las calles intervenidas registraron menor temperatura superficial al mediodía; sin embargo, también recibieron nuevos toldos y cambió el flujo vehicular. El equipo considera prometedora la arborización, pero propone comparar zonas semejantes y medir sombra, humedad y tránsito durante más tiempo”. ¿Cuál es la idea principal?",
      "opts": [
        "Los árboles eliminaron definitivamente el calor urbano",
        "La reducción observada es prometedora, aunque se necesitan comparaciones para separar el efecto de los árboles de otros cambios",
        "Los toldos son la única causa posible de la reducción",
        "Medir el tránsito carece de relación con la temperatura urbana"
      ],
      "ans": 1,
      "exp": "**Paso 1.** El texto combina un resultado favorable, factores concurrentes y una propuesta de verificación. **Paso 2.** La idea principal debe abarcar los tres elementos; no basta repetir la disminución ni escoger arbitrariamente una causa. **Paso 3.** B conserva la cautela metodológica del pasaje. **Respuesta correcta: B. La reducción observada es prometedora, aunque se necesitan comparaciones para separar el efecto de los árboles de otros cambios**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "len-avz-41",
      "s": "len",
      "n": 41,
      "d": "dificil",
      "topics": [
        "4.4.2-critica"
      ],
      "ch": "l6",
      "t": "Lectura crítica",
      "prompt": "Una universidad amplió su biblioteca digital y las descargas aumentaron, pero las consultas al personal bibliotecario también crecieron. Una encuesta indicó que muchas personas necesitaban ayuda para evaluar la confiabilidad de las fuentes. ¿Qué inferencia está mejor sustentada?",
      "opts": [
        "Un mayor acceso a documentos puede aumentar, en vez de eliminar, la necesidad de orientación para seleccionarlos y evaluarlos",
        "Todas las descargas correspondieron a fuentes falsas",
        "El personal bibliotecario volvió innecesaria la biblioteca digital",
        "Descargar más documentos demuestra automáticamente mayor aprendizaje"
      ],
      "ans": 0,
      "exp": "**Paso 1.** El aumento simultáneo de descargas y consultas, unido a la encuesta, respalda que acceso y orientación pueden ser complementarios. **Paso 2.** B, C y D introducen absolutos o resultados que el texto no aporta. **Paso 3.** La inferencia A explica todas las pistas con el menor salto lógico. **Respuesta correcta: A. Un mayor acceso a documentos puede aumentar, en vez de eliminar, la necesidad de orientación para seleccionarlos y evaluarlos**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "len-avz-42",
      "s": "len",
      "n": 42,
      "d": "dificil",
      "topics": [
        "4.4.3-argumentacion"
      ],
      "ch": "l8",
      "t": "Argumentación y falacias",
      "prompt": "Un estudiante afirma: “Mi compañero obtuvo la calificación más alta después de estudiar solo la noche anterior; por tanto, cualquier persona obtendrá mejores resultados si abandona la planificación y hace lo mismo”. ¿Qué falacia domina?",
      "opts": [
        "Generalización apresurada",
        "Petición de principio",
        "Falso dilema",
        "Apelación a la tradición"
      ],
      "ans": 0,
      "exp": "**Paso 1.** La conclusión universal se apoya en un solo caso, sin considerar conocimiento previo, tipo de examen, descanso ni otros factores. **Paso 2.** Extrapolar desde una muestra mínima es una generalización apresurada. **Paso 3.** No se repite la conclusión como premisa ni se presentan únicamente dos alternativas. **Respuesta correcta: A. Generalización apresurada**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "len-avz-43",
      "s": "len",
      "n": 43,
      "d": "dificil",
      "topics": [
        "4.4.3-puntuacion"
      ],
      "ch": "l9",
      "t": "Puntuación y concordancia",
      "prompt": "Seleccione la oración correctamente puntuada, considerando que “según el informe final” es un inciso y que “por tanto” introduce una consecuencia.",
      "opts": [
        "Los resultados, según el informe final, son provisionales; por tanto, se necesitan más mediciones.",
        "Los resultados según el informe final, son provisionales, por tanto se necesitan más mediciones.",
        "Los resultados, según el informe final son provisionales; por tanto se necesitan, más mediciones.",
        "Los resultados según, el informe final, son provisionales por tanto; se necesitan más mediciones."
      ],
      "ans": 0,
      "exp": "**Paso 1.** El inciso queda delimitado por dos comas. **Paso 2.** El punto y coma separa proposiciones relacionadas y la coma posterior a “por tanto” marca el conector. **Paso 3.** No debe separarse el sujeto de su verbo ni el verbo de su complemento mediante comas arbitrarias. **Respuesta correcta: A. Los resultados, según el informe final, son provisionales; por tanto, se necesitan más mediciones.**",
      "maths": [],
      "imgs": []
    },
    {
      "id": "len-avz-44",
      "s": "len",
      "n": 44,
      "d": "experto",
      "topics": [
        "4.4.3-puntuacion"
      ],
      "ch": "l9",
      "t": "Puntuación y concordancia",
      "prompt": "Seleccione la versión que mantiene la concordancia y expresa con claridad una concesión seguida de una conclusión prudente.",
      "opts": [
        "Las evidencias, aunque resulta limitada, demuestra una asociación; por eso confirma la causa.",
        "La evidencia aunque son limitadas demuestran una asociación, por eso confirman todas las causas.",
        "Las evidencias, aunque son limitadas, muestran una asociación; sin embargo, no bastan para confirmar una relación causal.",
        "Las evidencias aunque es limitada, muestra una asociación; sin embargo no basta para confirman la causalidad."
      ],
      "ans": 2,
      "exp": "**Paso 1.** El sujeto plural “las evidencias” concuerda con son, muestran y bastan; el adjetivo es limitadas. **Paso 2.** El inciso concesivo queda entre comas y “sin embargo” introduce correctamente el contraste entre asociación y causalidad. **Paso 3.** Las otras opciones combinan errores de número, formas verbales o saltos lógicos. **Respuesta correcta: C. Las evidencias, aunque son limitadas, muestran una asociación; sin embargo, no bastan para confirmar una relación causal.**",
      "maths": [],
      "imgs": []
    }
  ]
};
