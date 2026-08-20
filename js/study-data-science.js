window.STUDY_DATA_SCIENCE = {
    modules: {
        physics: [
            {
                id: '4.2.1',
                title: 'Cinemática y Dinámica',
                summary: 'Acá vamos a ver cómo se mueven las cosas (cinemática) y qué las hace moverse (dinámica). Es súper importante entender la diferencia entre velocidad y aceleración, y cómo las fuerzas dictan todo el movimiento.',
                formulas: [
                    '$$ v = v_0 + at $$',
                    '$$ x = x_0 + v_0t + \\frac{1}{2}at^2 $$',
                    '$$ v^2 = v_0^2 + 2a(x - x_0) $$',
                    '$$ \\Sigma F = ma $$',
                    '$$ F_f = \\mu_s N \\text{ (estática)} $$'
                ],
                traps: [
                    'Olvidarse de que la gravedad va para abajo (y el signo depende de para dónde pusiste tu eje positivo).',
                    'Confundir masa (kg) con peso (N).',
                    'En planos inclinados, la normal no es igual al peso, sino a la componente en Y del peso.'
                ],
                examples: [
                    {
                        title: 'Fuerza neta',
                        problem: 'Se aplica una fuerza a una caja de $1\\text{ kg}$. Si la aceleración es de $3\\text{ m/s}^2$, ¿cuál es la fuerza neta?',
                        solution: 'Paso 1: Identificamos los datos. La masa es $m = 1\\text{ kg}$ y la aceleración $a = 3\\text{ m/s}^2$.\nPaso 2: Aplicamos la segunda ley de Newton: $\\Sigma F = ma$.\nPaso 3: Multiplicamos: $F = (1\\text{ kg})(3\\text{ m/s}^2) = 3\\text{ N}$.\nRespuesta: $3\\text{ N}$.'
                    },
                    {
                        title: 'Plano inclinado',
                        problem: 'Un bloque está a punto de deslizar en un plano inclinado de $45^\\circ$. ¿Cuál es el coeficiente de fricción estática $\\mu_s$?',
                        solution: 'Paso 1: Cuando está a punto de deslizar, la fricción estática máxima empata a la fuerza que quiere bajarlo (el peso en x): $mg \\sin(45^\\circ) = \\mu_s N$.\nPaso 2: La fuerza normal $N$ balancea al peso en y: $N = mg \\cos(45^\\circ)$.\nPaso 3: Sustituimos $N$: $mg \\sin(45^\\circ) = \\mu_s mg \\cos(45^\\circ)$.\nPaso 4: Tachamos $mg$ de ambos lados y despejamos: $\\mu_s = \\frac{\\sin(45^\\circ)}{\\cos(45^\\circ)} = \\tan(45^\\circ) = 1.00$.'
                    },
                    {
                        title: 'Tiempo de vuelo en salto',
                        problem: 'Un atleta salta y alcanza una altura máxima de $1.25\\text{ m}$. ¿Cuánto tiempo estuvo en el aire?',
                        solution: 'Paso 1: Usamos la fórmula de altura máxima para encontrar el tiempo de subida: $h = \\frac{1}{2}gt^2$.\nPaso 2: Despejamos el tiempo y asumimos $g = 10\\text{ m/s}^2$ para hacerlo rápido como en los exámenes de admisión: $t^2 = \\frac{2h}{g} = \\frac{2(1.25)}{10} = \\frac{2.5}{10} = 0.25$.\nPaso 3: Sacamos raíz cuadrada, $t = 0.5\\text{ s}$ (este es solo el tiempo para subir).\nPaso 4: El tiempo de vuelo total es el doble (subida y bajada), así que $t_{total} = 2(0.5\\text{ s}) = 1.0\\text{ s}$.'
                    },
                    {
                        title: 'Peso en otro planeta',
                        problem: 'Si un objeto pesa $10\\text{ N}$ en un planeta donde la gravedad es $g/2$ (asumiendo $g_{tierra}=10\\text{ m/s}^2$), ¿cuál es su masa?',
                        solution: 'Paso 1: Sabemos que el peso es masa por gravedad del planeta: $P = m \\cdot g_{planeta}$.\nPaso 2: La gravedad ahí es la mitad de la nuestra, es decir $5\\text{ m/s}^2$.\nPaso 3: Reemplazamos: $10\\text{ N} = m(5\\text{ m/s}^2)$.\nPaso 4: Pasamos el 5 a dividir y nos da que la masa es $2\\text{ kg}$.'
                    }
                ]
            },
            {
                id: '4.2.2',
                title: 'Trabajo, Energía y Conservación',
                summary: 'La clave acá es que la energía no aparece ni desaparece, solo cambia de forma. Si no hay rozamiento, la energía total (cinética + potencial) del principio es igual a la del final. Y el trabajo es básicamente la forma de pasarle energía a algo empujándolo.',
                formulas: [
                    '$$ W = F d \\cos(\\theta) $$',
                    '$$ E_c = \\frac{1}{2}mv^2 $$',
                    '$$ E_p = mgh $$',
                    '$$ E_{pe} = \\frac{1}{2}kx^2 $$',
                    '$$ F = -kx \\text{ (Ley de Hooke)} $$'
                ],
                traps: [
                    'Olvidarse del $\\cos(\\theta)$ en la fórmula de trabajo cuando empujas chueco.',
                    'Pensar que un resorte comprimido tiene energía potencial negativa (siempre es positiva porque la $x$ se eleva al cuadrado).'
                ],
                examples: [
                    {
                        title: 'Ley de Hooke',
                        problem: 'Se necesita una fuerza de $60\\text{ N}$ para estirar un resorte. Si su constante elástica es $k = 300\\text{ N/m}$, ¿cuánto se estiró?',
                        solution: 'Paso 1: Usamos la Ley de Hooke en magnitud: $F = kx$.\nPaso 2: Despejamos lo que se estiró (la $x$): $x = \\frac{F}{k}$.\nPaso 3: Ponemos los números: $x = \\frac{60\\text{ N}}{300\\text{ N/m}} = 0.2\\text{ m}$, que equivale a $20\\text{ cm}$.'
                    },
                    {
                        title: 'Rizo vertical (Loop)',
                        problem: 'Un carrito de montaña rusa entra en un rizo vertical de $10\\text{ m}$ de radio. ¿Cuál es la velocidad mínima que debe tener en el punto más alto para no caerse?',
                        solution: 'Paso 1: En el punto más alto del rizo, para apenas dar la vuelta (normal=0), la gravedad funciona como la única fuerza centrípeta: $mg = \\frac{mv^2}{R}$.\nPaso 2: Podemos tachar la masa $m$ de ambos lados: $g = \\frac{v^2}{R}$.\nPaso 3: Despejamos la velocidad: $v = \\sqrt{gR}$.\nPaso 4: Ponemos $R = 10\\text{ m}$ y $g = 10\\text{ m/s}^2$ (aproximación clásica). $v = \\sqrt{10 \\times 10} = 10\\text{ m/s}$.'
                    }
                ]
            },
            {
                id: '4.2.3',
                title: 'Impulso y Cantidad de Movimiento',
                summary: 'La cantidad de movimiento (el "momento") te dice qué tan difícil es frenar un objeto (masa por velocidad). El impulso es darle un empujón fuerte en poco tiempo, y eso cambia el momento. Sirve un montón para los problemas de choques.',
                formulas: [
                    '$$ p = mv $$',
                    '$$ I = F \\Delta t = \\Delta p $$',
                    '$$ m_1 v_{1i} + m_2 v_{2i} = m_1 v_{1f} + m_2 v_{2f} $$'
                ],
                traps: [
                    'Olvidarse que la velocidad es un vector. Si una pelota rebota, cambia de sentido, entonces el cambio de velocidad (y el impulso) es más grande de lo que parece.',
                    'No trabajar en las unidades correctas. El impulso va en $\\text{N}\\cdot\\text{s}$ o $\\text{kg}\\cdot\\text{m/s}$.'
                ],
                examples: [
                    {
                        title: 'Cálculo de Impulso',
                        problem: 'Se aplica una fuerza promedio de $30\\text{ N}$ sobre una pelota durante $0.35\\text{ s}$. ¿Cuál es el impulso entregado?',
                        solution: 'Paso 1: Acordarnos de la fórmula: $I = F \\Delta t$.\nPaso 2: Reemplazar lo que nos dan: $I = (30\\text{ N})(0.35\\text{ s})$.\nPaso 3: Hacemos la multi: $I = 10.5\\text{ N}\\cdot\\text{s}$.'
                    },
                    {
                        title: 'Conservación en un choque',
                        problem: 'Dos bolas de billar idénticas chocan de frente de forma elástica. Una iba a $2\\text{ m/s}$ y la otra estaba quieta. ¿Qué pasa después?',
                        solution: 'Paso 1: Al tener la misma masa y ser un choque elástico frontal, las bolas simplemente intercambian sus velocidades.\nPaso 2: La primera bola se queda quieta ($v_{1f} = 0$).\nPaso 3: La segunda bola sale disparada con la velocidad de la primera: $v_{2f} = 2\\text{ m/s}$.'
                    }
                ]
            }
        ],
        chemistry: [
            {
                id: '4.3.1',
                title: 'Nomenclatura Inorgánica',
                summary: 'Para los exámenes, nombrar compuestos tiene que ser algo automático. Aquí vemos anhídridos, ácidos y sales. El truco de la regla 314 salva vidas para los oxácidos, y no se olviden de que los peróxidos son especiales.',
                formulas: [
                    '$$ \\text{No metal} + \\text{Oxígeno} \\rightarrow \\text{Anhídrido} $$',
                    '$$ \\text{Metal} + \\text{Oxígeno} \\rightarrow \\text{Óxido Básico} $$',
                    '$$ \\text{Ácido} + \\text{Base} \\rightarrow \\text{Sal} + \\text{Agua} $$'
                ],
                traps: [
                    'Confundir cuándo se usa ico/oso para los óxidos o ácidos y ato/ito para las sales (oso-ito, pico-pato).',
                    'Simplificar los oxígenos en un peróxido (ej: pasar $H_2O_2$ a $HO$, ¡mal!).'
                ],
                examples: [
                    {
                        title: 'La famosa regla 314',
                        problem: 'Arma y nombra el compuesto $H_3PO_4$ usando el truco 314.',
                        solution: 'Paso 1: La regla 314 es un código rápido para los oxácidos de algunas familias. El ácido del fósforo con mayor valencia (+5) sigue este patrón: 3 Hidrógenos, 1 No Metal, 4 Oxígenos.\nPaso 2: Queda $H_3PO_4$.\nPaso 3: Como usa la valencia alta, termina en "ico". Se llama Ácido Fosfórico.'
                    },
                    {
                        title: 'Peróxidos que no se simplifican',
                        problem: 'Escribe la fórmula del peróxido de hidrógeno (agua oxigenada).',
                        solution: 'Paso 1: Sabemos que el ion peróxido viene en par: $O_2^{2-}$.\nPaso 2: El hidrógeno va con $+1$ (tenemos que usar dos para empatar la carga de $-2$).\nPaso 3: Nos queda $H_2O_2$ y recordamos la regla de oro: ¡los peróxidos no se simplifican!'
                    }
                ]
            },
            {
                id: '4.3.2',
                title: 'Geometría Molecular (RPECV)',
                summary: 'La forma de una molécula depende de cuánto se pelean y repelen los pares de electrones alrededor del átomo central (RPECV). Recuerden que los pares libres empujan un poquito más que los enlaces.',
                formulas: [
                    '$$ AX_2 \\rightarrow \\text{Lineal (180^\\circ)} $$',
                    '$$ AX_3 \\rightarrow \\text{Trigonal Plana (120^\\circ)} $$',
                    '$$ AX_4 \\rightarrow \\text{Tetraédrica (109.5^\\circ)} $$'
                ],
                traps: [
                    'Contar mal los electrones de valencia y olvidarse de los pares libres del átomo central.',
                    'Pensar que geometría electrónica es lo mismo que geometría molecular.'
                ],
                examples: [
                    {
                        title: 'Geometría del Agua',
                        problem: 'Saca la geometría molecular del $H_2O$.',
                        solution: 'Paso 1: El oxígeno (grupo 16) tiene 6 electrones de valencia. Usa 2 para unirse a los hidrógenos.\nPaso 2: Le quedan 4 electrones libres, o sea 2 pares. Tiene 2 enlaces y 2 pares libres ($AX_2E_2$).\nPaso 3: Los 4 pares (enlaces + libres) lo hacen tetraédrico en lo electrónico, pero al mirar solo los átomos, tiene forma Angular.'
                    },
                    {
                        title: 'El Metano clásico',
                        problem: '¿Qué geometría tiene el metano, $CH_4$?',
                        solution: 'Paso 1: El carbono tiene 4 electrones y hace 4 enlaces con los hidrógenos.\nPaso 2: No le sobran pares libres ($AX_4$).\nPaso 3: Los cuatro enlaces se separan lo más posible en 3D, dándole una geometría Tetraédrica perfecta.'
                    }
                ]
            },
            {
                id: '4.3.3',
                title: 'Números Cuánticos y Propiedades',
                summary: 'Acá localizamos electrones usando 4 números: nivel ($n$), subnivel ($l$), orbital ($m_l$) y giro ($m_s$). Con la tabla periódica, predecimos cómo se comportan los elementos, por ejemplo, los de arriba a la derecha (fluor) roban electrones mejor (electronegatividad).',
                formulas: [
                    '$$ \\text{Valores de } l: s=0, p=1, d=2, f=3 $$'
                ],
                traps: [
                    'Creer que el radio atómico crece para la derecha (falso, los átomos se achican porque el núcleo tira más fuerte).',
                    'Poner mal el signo del espín ($m_s$) al llenar los orbitales.'
                ],
                examples: [
                    {
                        title: 'Números del último electrón',
                        problem: 'Encuentra los 4 números cuánticos del último electrón del Carbono ($Z=6$).',
                        solution: 'Paso 1: Configuración: $1s^2 2s^2 2p^2$. El último electrón está en el $2p$.\nPaso 2: Nivel $n = 2$. Como es $p$, el subnivel $l = 1$.\nPaso 3: Los orbitales de p son -1, 0, +1. Ponemos los 2 electrones: flecha arriba en -1 y flecha arriba en 0. Cayó en $m_l = 0$.\nPaso 4: Como la flecha va para arriba, el espín es $m_s = +1/2$.\nRespuesta: $(2, 1, 0, +1/2)$.'
                    },
                    {
                        title: 'Pelea de electronegatividad',
                        problem: '¿Quién es más electronegativo, el oxígeno o el azufre?',
                        solution: 'Paso 1: Los dos están en el mismo grupo de la tabla (VI A).\nPaso 2: La electronegatividad sube a medida que vamos hacia arriba en el grupo porque los átomos son más chiquitos.\nPaso 3: El oxígeno está arriba del azufre, entonces el Oxígeno gana.'
                    }
                ]
            },
            {
                id: '4.3.4',
                title: 'Estequiometría',
                summary: 'La química es como cocinar con recetas exactas. Balanceamos ecuaciones para saber cuántos moles necesitamos. A veces un reactivo es el "cuello de botella" y se acaba antes, a ese le llamamos reactivo limitante.',
                formulas: [
                    '$$ n = \\frac{\\text{masa}}{\\text{Masa Molar (PM)}} $$'
                ],
                traps: [
                    'Empezar a hacer cálculos de moles sin haber balanceado la ecuación química.',
                    'Buscar el reactivo limitante comparando directamente los gramos sin pasarlos a moles.'
                ],
                examples: [
                    {
                        title: 'Combustión del Magnesio',
                        problem: 'Según $2\\text{Mg} + \\text{O}_2 \\rightarrow 2\\text{MgO}$, si tenemos $48.6\\text{ g}$ de Mg ($PM=24.3\\text{ g/mol}$), ¿cuántos moles de $MgO$ salen?',
                        solution: 'Paso 1: Comprobamos que esté balanceada. $2\\text{Mg} + \\text{O}_2 \\rightarrow 2\\text{MgO}$. ¡Listo!\nPaso 2: Pasamos los gramos de Mg a moles: $n = \\frac{48.6}{24.3} = 2\\text{ moles}$ de Mg.\nPaso 3: Vemos la receta (estequiometría): por cada 2 de Mg, salen 2 de MgO (es un 1 a 1).\nPaso 4: Entonces obtenemos $2\\text{ moles}$ de MgO.'
                    },
                    {
                        title: 'El limitante (Amoníaco)',
                        problem: 'Para hacer amoníaco ($N_2 + 3H_2 \\rightarrow 2NH_3$), mezclamos $1\\text{ mol}$ de $N_2$ y $2\\text{ moles}$ de $H_2$. ¿Quién se acaba primero?',
                        solution: 'Paso 1: La ecuación nos dice que 1 mol de $N_2$ requiere 3 moles de $H_2$.\nPaso 2: Tenemos 1 mol de $N_2$, entonces deberíamos tener 3 moles de $H_2$.\nPaso 3: Revisamos qué tenemos: ¡solo hay 2 moles de $H_2$!\nPaso 4: Como nos falta $H_2$ para que reaccione todo el $N_2$, el $H_2$ es el reactivo limitante.'
                    }
                ]
            }
        ]
    },
    calculators: {
        // Calculadora de caída libre y tiro vertical simple
        freeFall: function(h, t, v) {
            const g = 9.81;
            let results = {};
            // Si nos dan la altura y se deja caer
            if (h !== undefined && h !== null) {
                results.t = Math.sqrt((2 * h) / g);
                results.v = g * results.t;
                results.h = h;
            } 
            // Si nos dan el tiempo cayendo
            else if (t !== undefined && t !== null) {
                results.h = 0.5 * g * Math.pow(t, 2);
                results.v = g * t;
                results.t = t;
            } 
            // Si nos dan la velocidad al llegar al suelo
            else if (v !== undefined && v !== null) {
                results.t = v / g;
                results.h = 0.5 * g * Math.pow(results.t, 2);
                results.v = v;
            }
            return results;
        },

        // Calculadora de Ley de Hooke (Magnitudes)
        hookesLaw: function(k, x, F) {
            let results = {};
            // F = k * x
            if (k && x) {
                results.F = k * x;
                results.k = k;
                results.x = x;
            } else if (k && F) {
                results.x = F / k;
                results.k = k;
                results.F = F;
            } else if (x && F) {
                results.k = F / x;
                results.x = x;
                results.F = F;
            }
            return results;
        },

        // Conversor básico de Moles y Masa
        stoichiometry: function(amount, isMass, molarMass) {
            let results = {};
            if (isMass && molarMass) {
                // Tengo masa (gramos), quiero moles
                results.moles = amount / molarMass;
                results.mass = amount;
                results.molarMass = molarMass;
            } else if (!isMass && molarMass) {
                // Tengo moles, quiero gramos
                results.mass = amount * molarMass;
                results.moles = amount;
                results.molarMass = molarMass;
            }
            return results;
        }
    }
};
