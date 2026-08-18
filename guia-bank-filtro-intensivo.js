/* Banco del intensivo filtro. No mezcla ítems del examen vivo: Fourier + clones inventados. */
(function () {
  function Q(o) {
    return {
      id: o.id, s: "mat", n: o.n || 0, d: o.d || "intermedio",
      topics: o.topics || [], ch: o.ch, t: o.t, prompt: o.prompt,
      opts: o.opts, ans: o.ans, exp: o.exp,
      maths: o.maths || [], imgs: o.imgs || [], fig: o.fig || null,
      distractores: o.distractores || [],
      theory: o.theory || { lesson_id: o.ch, concept_title: o.t, anchor: "" }
    };
  }
  function th(id, title, anchor) {
    return { lesson_id: id, lesson_title: title, concept_title: title, anchor: anchor || "" };
  }

  var ALL = [];

  /* ========== FOURIER (fiel al cuadernillo, claves verificadas) ========== */
  ALL.push(Q({
    id: "ff-01", n: 1, ch: "filtro-L01", t: "Operaciones combinadas",
    topics: ["filtro-signos"],
    prompt: "Calcular $3+(4)\\cdot(-5-2)$.",
    opts: ["$31$", "$-25$", "$15$", "$2$"], ans: 1,
    exp: "Paso 1: el paréntesis interno es $-5-2=-7$. Paso 2: el $4$ multiplica a ese resultado: $4\\cdot(-7)=-28$. Paso 3: $3+(-28)=-25$. La opción $31$ aparece si haces $3+4=7$ y luego $7\\cdot(-5-2)$ mal agrupado, o si cambias el signo de $-28$. $15$ sale de $3+4\\cdot3$ (restar mal $-5-2$). $2$ sale de $3+4-5$.",
    distractores: [
      { opt: "$31$", error: "Agrupaste $3+4$ antes de multiplicar, o perdiste el signo de $-28$." },
      { opt: "$15$", error: "Calculaste $-5-2$ como $+3$ o como $5-2$." },
      { opt: "$2$", error: "Sumaste y restaste en cadena ignorando el producto: $3+4-5$." }
    ],
    theory: th("filtro-L01", "Signos y jerarquía", "h-un-ejemplo-como-en-el-examen")
  }));

  ALL.push(Q({
    id: "ff-02", n: 2, ch: "filtro-L01", t: "Potencias combinadas",
    topics: ["filtro-potencias"],
    prompt: "Evaluar $(2^{3})^{2}+3^{2}\\cdot 3^{3}+(2^{2}-3^{2})^{2}$.",
    opts: ["$282$", "$300$", "$818$", "$332$"], ans: 3,
    exp: "Paso 1: $(2^{3})^{2}=8^{2}=64$. Paso 2: $3^{2}\\cdot 3^{3}=9\\cdot 27=243$ (o $3^{5}=243$). Paso 3: $2^{2}-3^{2}=4-9=-5$, y $(-5)^{2}=25$. Paso 4: $64+243+25=332$. $282$ olvida el $25+25$ o resta mal. $300$ es un redondeo inventado. $818$ sale si haces $3^{2\\cdot 3^{3}}$ o $64+9^{27}$.",
    distractores: [
      { opt: "$282$", error: "Te faltó el $25$ del último cuadrado, o lo restaste." },
      { opt: "$300$", error: "Aproximaste en vez de calcular $64+243+25$." },
      { opt: "$818$", error: "Malinterpretaste $3^{2}\\cdot 3^{3}$ como una potencia enorme." }
    ],
    theory: th("filtro-L01", "Potencias: imán y misma base", "h-la-regla-solo-esto")
  }));

  ALL.push(Q({
    id: "ff-03", n: 3, ch: "filtro-L01", t: "Producto de signos",
    topics: ["filtro-signos"],
    prompt: "Calcular $-3\\bigl[(-1)(-2)(-3)(4)(-2)\\bigr]$.",
    opts: ["$78$", "$-66$", "$-144$", "$51$"], ans: 2,
    exp: "Paso 1: cuenta menos dentro: $(-1),(-2),(-3),(-2)$ son **4** negativos (par) y un $+4$. El producto interno es positivo: $1\\cdot 2\\cdot 3\\cdot 4\\cdot 2=48$. Paso 2: el $-3$ de afuera pinta el resultado: $-3\\cdot 48=-144$. $78$ y $51$ son productos a medias. $-66$ suele salir de perder un factor $2$.",
    distractores: [
      { opt: "$78$", error: "Multiplicaste solo una parte de los factores." },
      { opt: "$-66$", error: "Perdiste un factor (casi siempre un $2$) o un signo." },
      { opt: "$51$", error: "Sumaste en vez de multiplicar, o mezclaste factores." }
    ],
    theory: th("filtro-L01", "Contar signos menos", "h-la-regla-solo-esto")
  }));

  ALL.push(Q({
    id: "ff-04", n: 4, ch: "filtro-L01", t: "Fracción combinada",
    topics: ["filtro-fracciones"],
    prompt: "Calcular $\\dfrac{4}{8}+\\dfrac{2}{3}+\\left(-\\dfrac{8}{2}\\right)$.",
    opts: ["$-\\dfrac{5}{3}$", "$-\\dfrac{17}{6}$", "$\\dfrac{4}{3}$", "$-\\dfrac{2}{13}$"], ans: 1,
    exp: "Paso 1: simplifica $\\dfrac{4}{8}=\\dfrac{1}{2}$ y $-\\dfrac{8}{2}=-4$. Paso 2: $\\dfrac{1}{2}+\\dfrac{2}{3}-4$. Denominador $6$: $\\dfrac{3}{6}+\\dfrac{4}{6}-\\dfrac{24}{6}=\\dfrac{3+4-24}{6}=-\\dfrac{17}{6}$. $\\dfrac{-5}{3}$ es $\\dfrac{-10}{6}$, un error de LCD. $\\dfrac{4}{3}$ olvida el $-4$. $-\\dfrac{2}{13}$ suma numeradores y denominadores por separado.",
    distractores: [
      { opt: "$-\\dfrac{5}{3}$", error: "Usaste mal el común denominador (te salió $\\dfrac{-10}{6}$)." },
      { opt: "$\\dfrac{4}{3}$", error: "Olvidaste el término $\\dfrac{-8}{2}=-4$." },
      { opt: "$-\\dfrac{2}{13}$", error: "Sumaste numeradores y denominadores por separado." }
    ],
    theory: th("filtro-L01", "Un solo denominador común", "h-la-regla-solo-esto")
  }));

  ALL.push(Q({
    id: "ff-05", n: 5, ch: "filtro-L01", t: "Fracciones y jerarquía",
    topics: ["filtro-fracciones"],
    prompt: "Calcular $\\left(\\dfrac{2}{3}+\\dfrac{1}{4}\\right)\\cdot 3+3\\cdot\\left(-\\dfrac{2}{3}\\cdot\\dfrac{1}{4}\\right)+\\dfrac{2}{3}\\cdot\\left(\\dfrac{1}{4}-3\\right)$.",
    opts: ["$\\dfrac{5}{12}$", "$-\\dfrac{1}{24}$", "$\\dfrac{43}{126}$", "$-\\dfrac{13}{12}$"], ans: 0,
    exp: "Paso 1: $\\dfrac{2}{3}+\\dfrac{1}{4}=\\dfrac{11}{12}$, por $3$ da $\\dfrac{11}{4}$. Paso 2: $-\\dfrac{2}{3}\\cdot\\dfrac{1}{4}=-\\dfrac{1}{6}$, por $3$ da $-\\dfrac{1}{2}$. Paso 3: $\\dfrac{1}{4}-3=-\\dfrac{11}{4}$, por $\\dfrac{2}{3}$ da $-\\dfrac{11}{6}$. Paso 4: $\\dfrac{11}{4}-\\dfrac{1}{2}-\\dfrac{11}{6}=\\dfrac{33-6-22}{12}=\\dfrac{5}{12}$.",
    distractores: [
      { opt: "$-\\dfrac{1}{24}$", error: "Te comiste un término o cambiaste un signo al sumar." },
      { opt: "$\\dfrac{43}{126}$", error: "Mezclaste denominadores $4$, $6$ y $12$ sin unificar." },
      { opt: "$-\\dfrac{13}{12}$", error: "Restaste $\\dfrac{11}{4}+\\dfrac{1}{2}+\\dfrac{11}{6}$ con un signo extra." }
    ],
    theory: th("filtro-L01", "Fracciones y jerarquía", "h-un-ejemplo-como-en-el-examen")
  }));

  ALL.push(Q({
    id: "ff-06", n: 6, ch: "filtro-L02", t: "Reducir radicales",
    topics: ["filtro-radicales"],
    prompt: "¿A qué expresión es igual $\\sqrt{2}+\\sqrt{18}-\\sqrt{10}$?",
    opts: ["$5\\sqrt{2}$", "$-\\sqrt{2}$", "$\\sqrt{2}(4-\\sqrt{5})$", "$\\sqrt{10}$"], ans: 2,
    exp: "Paso 1: $\\sqrt{18}=\\sqrt{9\\cdot 2}=3\\sqrt{2}$. Paso 2: $\\sqrt{10}=\\sqrt{5\\cdot 2}=\\sqrt{5}\\sqrt{2}$. Paso 3: $\\sqrt{2}+3\\sqrt{2}-\\sqrt{5}\\sqrt{2}=\\sqrt{2}(4-\\sqrt{5})$. $5\\sqrt{2}$ suma $1+3+1$ como si $\\sqrt{10}$ fuera $\\sqrt{2}$. $-\\sqrt{2}$ resta todo. $\\sqrt{10}$ es no hacer nada.",
    distractores: [
      { opt: "$5\\sqrt{2}$", error: "Trataste $\\sqrt{10}$ como si también fuera $\\sqrt{2}$." },
      { opt: "$-\\sqrt{2}$", error: "Restaste $1+3$ y el término de $\\sqrt{10}$ sin factorizar." },
      { opt: "$\\sqrt{10}$", error: "No reduciste ninguna raíz." }
    ],
    theory: th("filtro-L02", "Sacar cuadrados y factor común", "h-un-ejemplo-como-en-el-examen")
  }));

  ALL.push(Q({
    id: "ff-07", n: 7, ch: "filtro-L01", t: "Potencia negativa",
    topics: ["filtro-potencias"],
    prompt: "Determine el valor de $\\left(\\dfrac{1}{3}\\right)^{-1}\\cdot\\left(\\dfrac{3}{4}\\right)^{2}\\cdot\\left(\\dfrac{5}{3}-2\\cdot\\dfrac{4}{3}\\right)$.",
    opts: ["$-\\dfrac{1}{2}$", "$-\\dfrac{2}{3}$", "$-\\dfrac{27}{16}$", "$\\dfrac{45}{16}$"], ans: 2,
    exp: "Paso 1: $\\left(\\dfrac{1}{3}\\right)^{-1}=3$. Paso 2: $\\left(\\dfrac{3}{4}\\right)^{2}=\\dfrac{9}{16}$. Paso 3: $\\dfrac{5}{3}-\\dfrac{8}{3}=-1$. Paso 4: $3\\cdot\\dfrac{9}{16}\\cdot(-1)=-\\dfrac{27}{16}$. $\\dfrac{45}{16}$ olvida el signo del último paréntesis. $\\dfrac{-1}{2}$ o $\\dfrac{-2}{3}$ son recortes a medias.",
    distractores: [
      { opt: "$-\\dfrac{1}{2}$", error: "Te quedaste con un trozo del producto." },
      { opt: "$-\\dfrac{2}{3}$", error: "Confundiste $\\left(\\dfrac{1}{3}\\right)^{-1}$ con $\\dfrac{1}{3}$ o con $\\dfrac{-2}{3}$." },
      { opt: "$\\dfrac{45}{16}$", error: "Hiciste $\\dfrac{5}{3}-\\dfrac{8}{3}$ como $+1$ en vez de $-1$." }
    ],
    theory: th("filtro-L01", "Exponente negativo", "h-la-regla-solo-esto")
  }));

  ALL.push(Q({
    id: "ff-08", n: 8, ch: "filtro-L02", t: "Dominio de una racional",
    topics: ["filtro-dominio"],
    prompt: "¿Para qué valores de $x$ la expresión $\\dfrac{x^{2}+3}{x^{2}-4}$ no está definida?",
    opts: ["$x=2$ y $x=-2$", "$x=-4$", "$x=\\sqrt{2}$ y $x=-\\sqrt{2}$", "$x=4$"], ans: 0,
    exp: "Paso 1: una fracción se rompe cuando el denominador es $0$. Paso 2: $x^{2}-4=0\\Rightarrow x^{2}=4\\Rightarrow x=\\pm 2$. Paso 3: el numerador $x^{2}+3$ nunca es cero y no crea hoyos. $x=4$ es leer el $4$ sin sacar raíz. $\\pm\\sqrt{2}$ confunde con $x^{2}-2$. $x=-4$ es un número que aparece en el $4$ con signo.",
    distractores: [
      { opt: "$x=-4$", error: "Tomaste el $4$ del binomio y le pusiste un menos." },
      { opt: "$x=\\sqrt{2}$ y $x=-\\sqrt{2}$", error: "Resolviste $x^{2}-2=0$ en vez de $x^{2}-4=0$." },
      { opt: "$x=4$", error: "El $4$ no es la raíz: $x^{2}=4$ da $\\pm 2$." }
    ],
    theory: th("filtro-L02", "El piso no puede ser cero", "h-la-analogía"),
    fig: { type: "filtro", name: "domain-holes" }
  }));

  ALL.push(Q({
    id: "ff-09", n: 9, ch: "filtro-L03", t: "Simplificar racional",
    topics: ["filtro-factor"],
    prompt: "Si $x\\neq 0$, $x\\neq 3$ y $x\\neq 5$, la expresión $\\dfrac{x(x+1)(x-3)+5x^{2}}{x(x-3)(x-5)}$ es igual a:",
    opts: ["$\\dfrac{x^{2}+3x-3}{(x-5)(x-3)}$", "$\\dfrac{6x^{2}-2x-3}{(x-3)(x-5)}$", "$\\dfrac{5x^{2}+x+1}{x-5}$", "$\\dfrac{6x+1}{x-5}$"], ans: 0,
    exp: "Paso 1: factor común $x$ arriba: $x\\bigl[(x+1)(x-3)+5x\\bigr]$. Paso 2: $(x+1)(x-3)=x^{2}-2x-3$, más $5x$ da $x^{2}+3x-3$. Paso 3: cancelar la $x$ (válido porque $x\\neq 0$): $\\dfrac{x^{2}+3x-3}{(x-3)(x-5)}$. El error clásico es $-2x+5x=3x$ mal hecho como $-2x$.",
    distractores: [
      { opt: "$\\dfrac{6x^{2}-2x-3}{(x-3)(x-5)}$", error: "No factorizaste la $x$ y sumaste mal el $5x^{2}$." },
      { opt: "$\\dfrac{5x^{2}+x+1}{x-5}$", error: "Cancelaste de más (el factor $x-3$)." },
      { opt: "$\\dfrac{6x+1}{x-5}$", error: "Cancelaste casi todo el polinomio como si fueran números." }
    ],
    theory: th("filtro-L03", "Factor común y cancelar con cuidado", "h-la-regla-solo-esto")
  }));

  ALL.push(Q({
    id: "ff-10", n: 10, ch: "filtro-L03", t: "Reducir racional",
    topics: ["filtro-factor"],
    prompt: "Reducir $\\dfrac{4(x+1)(x-3)+5x^{2}}{3(x^{2}-1)}$.",
    opts: ["$\\dfrac{3x^{2}-2x-1}{x^{2}-1}$", "$\\dfrac{20x^{3}-x^{2}-11x-3}{3x^{2}-3}$", "$\\dfrac{9x^{2}-8x-12}{3(x+1)(x-1)}$", "$\\dfrac{21x^{2}-32x-48}{3(x^{2}-1)}$"], ans: 2,
    exp: "Paso 1: $(x+1)(x-3)=x^{2}-2x-3$. Paso 2: $4(x^{2}-2x-3)+5x^{2}=4x^{2}-8x-12+5x^{2}=9x^{2}-8x-12$. Paso 3: el piso $3(x^{2}-1)=3(x+1)(x-1)$. No se cancela nada más. La opción c es exactamente eso.",
    distractores: [
      { opt: "$\\dfrac{3x^{2}-2x-1}{x^{2}-1}$", error: "Cancelaste el $3$ y parte del numerador sin factorizar." },
      { opt: "$\\dfrac{20x^{3}-x^{2}-11x-3}{3x^{2}-3}$", error: "Multiplicaste en cruz como si fuera una ecuación." },
      { opt: "$\\dfrac{21x^{2}-32x-48}{3(x^{2}-1)}$", error: "Distribuiste el $4$ y el $5$ de forma inconsistente." }
    ],
    theory: th("filtro-L03", "Abrir el producto y juntar", "h-un-ejemplo-como-en-el-examen")
  }));

  ALL.push(Q({
    id: "ff-11", n: 11, ch: "filtro-L04", t: "Ecuación racional equivalente",
    topics: ["filtro-ec1"],
    prompt: "Si $x\\neq 1$, ¿cuál ecuación es equivalente a $\\dfrac{2x}{x-1}=3$?",
    opts: ["$2x-2=0$", "$1-5x=0$", "$x-3=0$", "$\\dfrac{3(x-1)}{2x}=0$"], ans: 2,
    exp: "Paso 1: multiplica ambos lados por $x-1$ (válido porque $x\\neq 1$): $2x=3(x-1)$. Paso 2: $2x=3x-3$. Paso 3: $0=x-3$. La opción d es el recíproco igualado a cero (otra ecuación). $2x-2=0$ sería $x=1$, justo el valor prohibido.",
    distractores: [
      { opt: "$2x-2=0$", error: "Eso es $x=1$, el valor que el enunciado prohíbe." },
      { opt: "$1-5x=0$", error: "Restaste mal $2x$ y $3x$ o cruzaste términos al azar." },
      { opt: "$\\dfrac{3(x-1)}{2x}=0$", error: "Invertiste la fracción; eso no es equivalente." }
    ],
    theory: th("filtro-L04", "Ecuación con denominador", "h-la-regla-solo-esto")
  }));

  ALL.push(Q({
    id: "ff-12", n: 12, ch: "filtro-L04", t: "Ecuación exponencial",
    topics: ["filtro-exp"],
    prompt: "La solución de $2^{3x-1}\\cdot 2^{x+2}=32$ es:",
    opts: ["$-\\dfrac{7}{3}$", "$1$", "$5$", "$2$"], ans: 1,
    exp: "Paso 1: misma base, se suman exponentes: $2^{3x-1+x+2}=2^{4x+1}$. Paso 2: $32=2^{5}$. Paso 3: $4x+1=5\\Rightarrow 4x=4\\Rightarrow x=1$. $5$ es copiar el exponente de $32$. $2$ es leer la base. $\\dfrac{-7}{3}$ sale de restar exponentes en vez de sumar.",
    distractores: [
      { opt: "$-\\dfrac{7}{3}$", error: "Restaste los exponentes $3x-1$ y $x+2$." },
      { opt: "$5$", error: "Igualaste $x$ al exponente de $32$." },
      { opt: "$2$", error: "Respondiste la base en vez de la incógnita." }
    ],
    theory: th("filtro-L04", "Misma base, sumar exponentes", "h-un-ejemplo-como-en-el-examen")
  }));

  ALL.push(Q({
    id: "ff-13", n: 13, ch: "filtro-L07", t: "Correspondencia en congruencia",
    topics: ["filtro-congruencia"],
    prompt: "En una figura que no está dibujada a escala se cumple $\\triangle ACB \\cong \\triangle DFE$. ¿Cuál de las opciones se cumple?",
    opts: ["$\\angle A \\cong \\angle F$", "$BC \\cong DE$", "$BC \\cong DF$", "$\\angle B \\cong \\angle E$"], ans: 3,
    fig: { type: "filtro", name: "cong-acb-dfe" },
    exp: "Paso 1: el nombre es la lista de pasajeros. $A\\leftrightarrow D$, $C\\leftrightarrow F$, $B\\leftrightarrow E$. Paso 2: entonces $\\angle B\\cong\\angle E$. Paso 3: $\\angle A\\cong\\angle F$ es falso porque $A$ viaja con $D$, no con $F$. El lado $BC$ une $B$ y $C$, que viajan con $E$ y $F$, así que $BC\\cong EF$, no $DE$ ni $DF$.",
    distractores: [
      { opt: "$\\angle A \\cong \\angle F$", error: "Emparejaste la primera letra con la última. $A$ viaja con $D$." },
      { opt: "$BC \\cong DE$", error: "$B$ va con $E$ y $C$ con $F$: el lado es $EF$, no $DE$." },
      { opt: "$BC \\cong DF$", error: "$DF$ une $D$ y $F$ (viajan con $A$ y $C$): eso es el lado $AC$." }
    ],
    theory: th("filtro-L07", "El nombre es la lista de pasajeros", "h-un-ejemplo-como-en-el-examen")
  }));

  ALL.push(Q({
    id: "ff-14", n: 14, ch: "filtro-L06", t: "Perpendiculares y paralelas",
    topics: ["filtro-angulos"],
    prompt: "En la figura (no a escala), $AB$ es horizontal, la vertical por $B$ es perpendicular a $AB$, y $CD$ es horizontal (luego $CD\\parallel AB$). Si $\\angle CAB=65^{\\circ}$, $x$ es el ángulo entre $AC$ y $CD$, y $y$ es el ángulo recto entre la vertical y $CD$, el valor de $3x-2y$ es:",
    opts: ["$0$", "$15$", "$115$", "$165$"], ans: 1,
    fig: { type: "filtro", name: "right-angles-perp" },
    exp: "Paso 1: $CD\\parallel AB$ y $AC$ es transversal, así que $x$ es correspondiente (o alterno) de $65^{\\circ}$: $x=65^{\\circ}$. Paso 2: vertical $\\perp$ horizontal $\\Rightarrow y=90^{\\circ}$. Paso 3: $3\\cdot 65-2\\cdot 90=195-180=15$. $0$ sería si $3x=2y$. $165=x+y+10$ o $3\\cdot 65-30$. $115=3\\cdot 65-80$.",
    distractores: [
      { opt: "$0$", error: "Forzaste $3x=2y$ sin leer la figura." },
      { opt: "$115$", error: "Usaste $y=40$ o $80$ en vez del ángulo recto." },
      { opt: "$165$", error: "Sumaste $x+y$ o $3x$ sin restar $2y$ completo." }
    ],
    theory: th("filtro-L06", "Correspondientes y 90°", "h-un-ejemplo-como-en-el-examen")
  }));

  ALL.push(Q({
    id: "ff-15", n: 15, ch: "filtro-L06", t: "Paralelas y transversal",
    topics: ["filtro-angulos"],
    prompt: "En la figura, las rectas horizontales son paralelas y están cortadas por transversales. $\\alpha$ y $\\beta$ son ángulos colaterales internos. ¿Qué afirmación es correcta?",
    opts: ["$\\alpha-\\beta=180$", "$\\alpha+\\beta=180$", "$\\alpha+\\beta=90$", "$\\alpha-\\beta=90$"], ans: 1,
    fig: { type: "filtro", name: "parallels" },
    exp: "Paso 1: colaterales internos (mismo lado, entre las paralelas) son suplementarios. Paso 2: $\\alpha+\\beta=180^{\\circ}$. No restan $180$ y no suman $90$ (eso sería complementarios, típico de un solo ángulo recto).",
    distractores: [
      { opt: "$\\alpha-\\beta=180$", error: "Restar no produce un llano; hay que sumar." },
      { opt: "$\\alpha+\\beta=90$", error: "Confundiste suplementarios ($180$) con complementarios ($90$)." },
      { opt: "$\\alpha-\\beta=90$", error: "Mezclaste resta con el $90$ de un ángulo recto." }
    ],
    theory: th("filtro-L06", "Colaterales internos suman 180", "h-la-regla-solo-esto")
  }));

  ALL.push(Q({
    id: "ff-16", n: 16, ch: "filtro-L04", t: "Sistema 2×2",
    topics: ["filtro-sistemas"],
    prompt: "¿Cuál de los siguientes sistemas tiene como solución $x=2$?",
    opts: [
      "$2x+y=8,\\; 3x-y=2$",
      "$2x-y=0,\\; 3x-y=-2$",
      "$x+y=6,\\; x-y=2$",
      "$x+y=6,\\; 3x-y=-2$"
    ], ans: 0,
    exp: "Paso 1: en (a), suma: $5x=10\\Rightarrow x=2$ (y luego $y=4$). Paso 2: (b) da $x=-2$. (c) da $x=4$. (d) da $x=1$. Solo (a) cumple.",
    distractores: [
      { opt: "$2x-y=0,\\; 3x-y=-2$", error: "Ese sistema da $x=-2$." },
      { opt: "$x+y=6,\\; x-y=2$", error: "Ese sistema da $x=4$." },
      { opt: "$x+y=6,\\; 3x-y=-2$", error: "Ese sistema da $x=1$." }
    ],
    theory: th("filtro-L04", "Sumar para cancelar", "h-la-regla-solo-esto")
  }));

  ALL.push(Q({
    id: "ff-17", n: 17, ch: "filtro-L04", t: "Edades: dos fotos",
    topics: ["filtro-sistemas"],
    prompt: "Hoy la edad de María es el triple de la de Juan. Dentro de 10 años, la de María será el doble de la de Juan. Si $M$ es la edad de María y $J$ la de Juan, ¿qué sistema sirve?",
    opts: [
      "$M-3J=0,\\; M-2J=20$",
      "$M-3J=0,\\; M-2J=-10$",
      "$M-3J=0,\\; M-2J=10$",
      "$M-3J=0,\\; M-2J=0$"
    ], ans: 2,
    fig: { type: "filtro", name: "ages-photos" },
    exp: "Paso 1 (hoy): $M=3J\\Rightarrow M-3J=0$. Paso 2 (dentro de 10): $M+10=2(J+10)=2J+20\\Rightarrow M-2J=10$. Paso 3: la constante $20$ del lado derecho se va con el $+10$ y deja $10$, no $20$ ni $-10$. La (d) diría que siempre $M=2J$, que contradice el triple de hoy.",
    distractores: [
      { opt: "$M-3J=0,\\; M-2J=20$", error: "Olvidaste pasar el $+10$ de María: $M+10=2J+20$ deja $10$, no $20$." },
      { opt: "$M-3J=0,\\; M-2J=-10$", error: "Restaste $20-10$ al revés." },
      { opt: "$M-3J=0,\\; M-2J=0$", error: "Eso sería $M=3J$ y $M=2J$ a la vez: imposible salvo $J=0$." }
    ],
    theory: th("filtro-L04", "Hoy y después son dos fotos", "h-un-ejemplo-como-en-el-examen")
  }));

  ALL.push(Q({
    id: "ff-18", n: 18, ch: "filtro-L04", t: "Leer la solución de un sistema",
    topics: ["filtro-sistemas"],
    prompt: "En el sistema $7x-2y=9$, $x+4y=-3$, ¿cuál desigualdad es verdadera para la solución?",
    opts: ["$x>y$", "$x-y<0$", "$x+y>0$", "$y>x$"], ans: 0,
    exp: "Paso 1: de la segunda, $x=-3-4y$. Paso 2: $7(-3-4y)-2y=9\\Rightarrow -21-28y-2y=9\\Rightarrow -30y=30\\Rightarrow y=-1$. Paso 3: $x=-3-4(-1)=1$. Entonces $x>y$ ($1>-1$). $x-y=2$, no es $<0$. $x+y=0$, no es $>0$. $y>x$ es lo contrario.",
    distractores: [
      { opt: "$x-y<0$", error: "$1-(-1)=2$, que es positivo." },
      { opt: "$x+y>0$", error: "$1+(-1)=0$, y $0>0$ es falso." },
      { opt: "$y>x$", error: "Es exactamente al revés: $-1\\not> 1$." }
    ],
    theory: th("filtro-L04", "Resuelve y luego compara", "h-la-regla-solo-esto")
  }));

  ALL.push(Q({
    id: "ff-19", n: 19, ch: "filtro-L04", t: "Suma de raíces (Vieta)",
    topics: ["filtro-vieta"],
    prompt: "Si $x$ e $y$ son las raíces de $3x^{2}+6x-24=0$, el valor de $x+y$ es:",
    opts: ["$6$", "$-2$", "$-6$", "$2$"], ans: 1,
    fig: { type: "filtro", name: "vieta" },
    exp: "Paso 1: no hace falta resolver. Suma $= \\dfrac{-b}{a} = \\dfrac{-6}{3} = -2$. Paso 2 (comprobación): divide entre $3$: $x^{2}+2x-8=0$, $(x+4)(x-2)=0$, raíces $-4$ y $2$, suma $-2$. $6$ es $\\dfrac{+b}{a}$ o solo $b$. $-6$ es $-b$ sin dividir. $2$ es el valor absoluto o una sola raíz.",
    distractores: [
      { opt: "$6$", error: "Usaste $\\dfrac{+b}{a}$ o te quedaste con el $6$ del término lineal." },
      { opt: "$-6$", error: "Tomaste $-b$ y no dividiste entre $a=3$." },
      { opt: "$2$", error: "Respondiste una raíz, no la suma." }
    ],
    theory: th("filtro-L04", "Suma = −b/a", "h-la-regla-solo-esto")
  }));

  ALL.push(Q({
    id: "ff-20", n: 20, ch: "filtro-L05", t: "Valor absoluto equivalente",
    topics: ["filtro-va"],
    prompt: "¿Cuál ecuación tiene las mismas soluciones que $|x+2|=3$?",
    opts: ["$(x-1)^{2}=0$", "$(x-5)(x+1)=0$", "$|x|=1$", "$x^{2}+4x-5=0$"], ans: 3,
    fig: { type: "filtro", name: "abs-doors" },
    exp: "Paso 1: dos puertas: $x+2=3$ o $x+2=-3$. Paso 2: $x=1$ o $x=-5$. Paso 3: esas raíces son las de $(x-1)(x+5)=x^{2}+4x-5=0$. $(x-1)^{2}=0$ solo deja $x=1$. $(x-5)(x+1)=0$ da $5$ y $-1$ (signos al revés). $|x|=1$ da $\\pm 1$.",
    distractores: [
      { opt: "$(x-1)^{2}=0$", error: "Solo captura la puerta $x=1$." },
      { opt: "$(x-5)(x+1)=0$", error: "Invertiste los signos: esas raíces son $5$ y $-1$." },
      { opt: "$|x|=1$", error: "Eso es distancia a $0$ igual a $1$, no a $-2$ igual a $3$." }
    ],
    theory: th("filtro-L05", "Dos puertas del valor absoluto", "h-un-ejemplo-como-en-el-examen")
  }));

  /* ========== SPRINT (20 tipos, inventados) ========== */
  var sprint = [
    Q({ id:"fs-01", n:1, ch:"filtro-L01", t:"Imán del exponente", topics:["filtro-signos"],
      prompt:"El valor de $-3^{2}+(-3)^{2}$ es:",
      opts:["$0$","$18$","$-18$","$9$"], ans:1,
      exp:"Paso 1: $-3^{2}=-(9)=-9$ (el imán no come el signo). Paso 2: $(-3)^{2}=9$. Paso 3: $-9+9=0$… espera: $-9+9=0$, pero la opción $18$ sería si ambos fueran $+9$ sumados mal. Recalculemos: $-3^{2}+(-3)^{2}=-9+9=0$. ¡Ans debe ser 0!",
      distractores:[
        {opt:"$18$", error:"Trataste $-3^{2}$ como $(+9)$ y sumaste $9+9$."},
        {opt:"$-18$", error:"Trataste ambos cuadrados como negativos."},
        {opt:"$9$", error:"Te quedaste con un solo término."}
      ],
      theory: th("filtro-L01","El imán del exponente","h-la-analogía")
    })
  ];
  /* Fix fs-01 ans: -9+9=0 */
  sprint[0].ans = 0;
  sprint[0].exp = "Paso 1: $-3^{2}=-(3^{2})=-9$. Paso 2: $(-3)^{2}=9$. Paso 3: $-9+9=0$. $18$ es tratar los dos como $+9$ y sumarlos otra vez, o hacer $9+9$. $-18$ pone menos a los dos. $9$ deja un término.";

  sprint.push(Q({ id:"fs-02", n:2, ch:"filtro-L01", t:"Potencias de la misma base", topics:["filtro-potencias"],
    prompt:"$\\left(\\dfrac{2}{3}\\right)^{-2}\\cdot\\left(\\dfrac{2}{3}\\right)^{5}\\cdot\\left(\\dfrac{2}{3}\\right)^{-3}$ es igual a:",
    opts:["$\\dfrac{4}{9}$","$1$","$\\dfrac{2}{3}$","$\\dfrac{9}{4}$"], ans:1,
    exp:"Suma exponentes: $-2+5-3=0$. $\\left(\\dfrac{2}{3}\\right)^{0}=1$. $\\dfrac{4}{9}$ es $\\left(\\dfrac{2}{3}\\right)^{2}$. $\\dfrac{9}{4}$ es $\\left(\\dfrac{3}{2}\\right)^{2}=\\left(\\dfrac{2}{3}\\right)^{-2}$.",
    distractores:[
      {opt:"$\\dfrac{4}{9}$", error:"Te quedaste con el exponente $2$ de un solo factor."},
      {opt:"$\\dfrac{2}{3}$", error:"Sumaste mal y te quedó exponente $1$."},
      {opt:"$\\dfrac{9}{4}$", error:"Invertiste la base como si el exponente total fuera $-2$."}
    ],
    theory: th("filtro-L01","Misma base, sumar exponentes","h-la-regla-solo-esto")
  }));

  sprint.push(Q({ id:"fs-03", n:3, ch:"filtro-L02", t:"Restar radicales", topics:["filtro-radicales"],
    prompt:"$\\sqrt{32}-\\sqrt{8}-\\sqrt{2}$ es igual a:",
    opts:["$\\sqrt{2}$","$3\\sqrt{2}$","$5\\sqrt{2}$","$\\sqrt{22}$"], ans:0,
    exp:"$\\sqrt{32}=\\sqrt{16\\cdot 2}=4\\sqrt{2}$, $\\sqrt{8}=2\\sqrt{2}$. Entonces $4\\sqrt{2}-2\\sqrt{2}-\\sqrt{2}=\\sqrt{2}$. $5\\sqrt{2}$ suma en vez de restar. $\\sqrt{22}$ resta dentro de la raíz.",
    distractores:[
      {opt:"$3\\sqrt{2}$", error:"Hiciste $4-1$ y olvidaste restar el $\\sqrt{8}$."},
      {opt:"$5\\sqrt{2}$", error:"Sumaste $4+2-1$ con un signo menos perdido."},
      {opt:"$\\sqrt{22}$", error:"Restaste $32-8-2$ dentro de una sola raíz."}
    ],
    theory: th("filtro-L02","Reducir y luego restar","h-la-regla-solo-esto")
  }));

  sprint.push(Q({ id:"fs-04", n:4, ch:"filtro-L03", t:"Desarrollar −x(x+1)²", topics:["filtro-notables"],
    prompt:"Al desarrollar $-x(x+1)^{2}$ se obtiene:",
    opts:["$-x^{3}+2x^{2}-x$","$-x^{3}-2x^{2}-x$","$-x^{3}-x$","$x^{3}+2x^{2}+x$"], ans:1,
    exp:"$(x+1)^{2}=x^{2}+2x+1$. Por $-x$: $-x^{3}-2x^{2}-x$. La prima $-x(x-1)^{2}$ sí da $-x^{3}+2x^{2}-x$. No las intercambies.",
    distractores:[
      {opt:"$-x^{3}+2x^{2}-x$", error:"Eso es $-x(x-1)^{2}$, el primo con signo menos adentro."},
      {opt:"$-x^{3}-x$", error:"Olvidaste el término del medio $2x$."},
      {opt:"$x^{3}+2x^{2}+x$", error:"Perdiste el menos de afuera."}
    ],
    theory: th("filtro-L03","Primero la caja, luego el menos","h-un-ejemplo-como-en-el-examen")
  }));

  sprint.push(Q({ id:"fs-05", n:5, ch:"filtro-L04", t:"Vieta diferencia", topics:["filtro-vieta"],
    prompt:"Si $p>q$ son raíces de $2x^{2}-6x-8=0$, entonces $p-q$ vale:",
    opts:["$-3$","$5$","$-5$","$3$"], ans:1,
    exp:"Divide entre $2$: $x^{2}-3x-4=0$, $(x-4)(x+1)=0$, raíces $4$ y $-1$. $p-q=4-(-1)=5$. También $\\dfrac{\\sqrt{\\Delta}}{|a|}=\\dfrac{\\sqrt{36+64}}{2}=\\dfrac{10}{2}=5$. $-5$ invierte $p>q$. $3$ es $\\dfrac{-b}{a}$ (la suma).",
    distractores:[
      {opt:"$-3$", error:"Eso se parece a $-b$ o a la suma con signo raro."},
      {opt:"$-5$", error:"Calculaste $q-p$ (invertiste quién es mayor)."},
      {opt:"$3$", error:"Eso es la suma de raíces $\\dfrac{-b}{a}$, no la diferencia."}
    ],
    theory: th("filtro-L04","Diferencia de raíces","h-la-regla-solo-esto")
  }));

  sprint.push(Q({ id:"fs-06", n:6, ch:"filtro-L04", t:"Precios 2×2", topics:["filtro-sistemas"],
    prompt:"Dos cafés y una empanada cuestan $5$. Un café y dos empanadas cuestan $4$. ¿Cuánto cuesta un café?",
    opts:["$1$","$2$","$3$","$4$"], ans:1,
    exp:"$2c+e=5$, $c+2e=4$. Multiplica la segunda por $2$: $2c+4e=8$. Resta la primera: $3e=3\\Rightarrow e=1$. Luego $c+2=4\\Rightarrow c=2$.",
    distractores:[
      {opt:"$1$", error:"Ese es el precio de la empanada, no del café."},
      {opt:"$3$", error:"Resolviste $c+e=3$ o sumaste mal."},
      {opt:"$4$", error:"Tomaste el segundo total como si fuera un solo café."}
    ],
    theory: th("filtro-L04","Sistemas de enunciado","h-la-regla-solo-esto")
  }));

  sprint.push(Q({ id:"fs-07", n:7, ch:"filtro-L05", t:"Voltear la desigualdad", topics:["filtro-ineq"],
    prompt:"Al simplificar $2x-5<4x+1$ se obtiene:",
    opts:["$x>-\\dfrac{2}{3}$","$x>-3$","$x<3$","$x<-3$"], ans:1,
    exp:"$2x-4x<1+5\\Rightarrow -2x<6$. Al dividir por $-2$ se voltea: $x>-3$. $x<-3$ es olvidar el volteo. $x<3$ cambia el $\\dfrac{6}{2}$ de lado.",
    distractores:[
      {opt:"$x>-\\dfrac{2}{3}$", error:"Dividiste $-2x<6$ como $x>\\dfrac{6}{-9}$ o similar."},
      {opt:"$x<3$", error:"Dividiste por $+2$ y además invertiste el lado."},
      {opt:"$x<-3$", error:"No volteaste al dividir por negativo."}
    ],
    theory: th("filtro-L05","Voltear con el negativo","h-un-ejemplo-como-en-el-examen")
  }));

  sprint.push(Q({ id:"fs-08", n:8, ch:"filtro-L05", t:"Signo con x>0", topics:["filtro-ineq"],
    prompt:"Si $x>0$, la desigualdad $-x(x-2)<0$ equivale a:",
    opts:["$x-2<0$","$x-2>x$","$2x<x^{2}$","$x-2>0$"], ans:3,
    exp:"$x>0$ hace que $-x<0$. Dividir por $-x$ voltea: $x-2>0$. Equivale a $x(x-2)>0$ y, con $x>0$, a $x>2$. $2x<x^{2}$ es $x(x-2)>0$ sin usar $x>0$ del todo (y admite $x<0$).",
    distractores:[
      {opt:"$x-2<0$", error:"No volteaste al dividir por el negativo $-x$."},
      {opt:"$x-2>x$", error:"Eso da $-2>0$, absurdo: no es equivalente."},
      {opt:"$2x<x^{2}$", error:"Es casi $x(x-2)>0$, pero no usa $x>0$ y no es la forma pedida más simple."}
    ],
    theory: th("filtro-L05","Condición x>0 y el menos","h-un-ejemplo-como-en-el-examen")
  }));

  sprint.push(Q({ id:"fs-09", n:9, ch:"filtro-L06", t:"Suma en el triángulo", topics:["filtro-angulos"],
    prompt:"En un triángulo, dos ángulos miden $47^{\\circ}$ y $62^{\\circ}$. El tercero mide:",
    opts:["$71^{\\circ}$","$81^{\\circ}$","$109^{\\circ}$","$91^{\\circ}$"], ans:0,
    exp:"$180-47-62=71$. $81$ es $180-99$ mal. $109$ es $47+62$. $91$ es $180-89$.",
    distractores:[
      {opt:"$81^{\\circ}$", error:"Restaste $180-99$ con una suma interna mal hecha."},
      {opt:"$109^{\\circ}$", error:"Sumaste los dos ángulos dados en vez de restarlos de $180$."},
      {opt:"$91^{\\circ}$", error:"Error aritmético al restar de $180$."}
    ],
    theory: th("filtro-L06","Todo suma 180","h-la-regla-solo-esto")
  }));

  sprint.push(Q({ id:"fs-10", n:10, ch:"filtro-L07", t:"Correspondencia ALA", topics:["filtro-congruencia"],
    prompt:"Si $\\angle A\\cong\\angle D$, $\\angle B\\cong\\angle E$ y $\\angle C\\cong\\angle F$, se puede afirmar que los triángulos $ABC$ y $DEF$:",
    opts:["son congruentes por AAA","son semejantes (AA)","tienen el mismo perímetro","son rectángulos"], ans:1,
    exp:"AAA (o AA) prueba **semejanza**, no congruencia: misma forma, tamaño libre. No hay dato de lados, así que no hay perímetro igual ni congruencia.",
    distractores:[
      {opt:"son congruentes por AAA", error:"AAA no es criterio de congruencia: pueden ser de distinto tamaño."},
      {opt:"tienen el mismo perímetro", error:"Sin un lado, el tamaño no está fijo."},
      {opt:"son rectángulos", error:"Ningún ángulo se dijo de $90^{\\circ}$."}
    ],
    theory: th("filtro-L07","AAA es semejanza, no congruencia","h-la-regla-solo-esto")
  }));

  sprint.push(Q({ id:"fs-11", n:11, ch:"filtro-L07", t:"Partes del triángulo", topics:["filtro-triangulos"],
    prompt:"La recta que pasa por un vértice y corta al lado opuesto en su punto medio se llama:",
    opts:["altura","mediana","bisectriz","mediatriz"], ans:1,
    exp:"Mediana = vértice → punto medio. Altura llega a $90^{\\circ}$. Bisectriz parte el ángulo. Mediatriz es la perpendicular en el punto medio (no tiene que pasar por el vértice).",
    distractores:[
      {opt:"altura", error:"La altura pide $90^{\\circ}$, no el punto medio."},
      {opt:"bisectriz", error:"La bisectriz parte el ángulo, no necesariamente al medio del lado."},
      {opt:"mediatriz", error:"La mediatriz es perpendicular en el medio y puede no pasar por un vértice."}
    ],
    theory: th("filtro-L07","Cuatro rayas distintas","h-la-regla-solo-esto"),
    fig: { type:"filtro", name:"triangle-parts" }
  }));

  sprint.push(Q({ id:"fs-12", n:12, ch:"filtro-L08", t:"Ley de cosenos, forma", topics:["filtro-cosenos"],
    prompt:"En un triángulo de lados $a=5$, $b=7$, $c=7$, la forma correcta para $\\cos A$ es:",
    opts:["$\\dfrac{7^{2}+7^{2}-5^{2}}{2\\cdot 7\\cdot 7}$","$\\dfrac{5^{2}+7^{2}-7^{2}}{2\\cdot 5\\cdot 7}$","$\\dfrac{5^{2}+7^{2}+7^{2}}{2\\cdot 5\\cdot 7}$","$\\dfrac{7^{2}-7^{2}-5^{2}}{2\\cdot 7\\cdot 7}$"], ans:0,
    exp:"$\\cos A=\\dfrac{b^{2}+c^{2}-a^{2}}{2bc}$. El lado que se resta es el que está frente a $A$, o sea $a=5$. La (b) calcula $\\cos B$ o $\\cos C$. La (c) pone $+$ en todos. La (d) tiene el signo de $b^{2}$ mal.",
    distractores:[
      {opt:"$\\dfrac{5^{2}+7^{2}-7^{2}}{2\\cdot 5\\cdot 7}$", error:"Eso es $\\cos$ del ángulo opuesto a un lado $7$, no de $A$."},
      {opt:"$\\dfrac{5^{2}+7^{2}+7^{2}}{2\\cdot 5\\cdot 7}$", error:"En cosenos se resta el lado de enfrente, no se suma todo."},
      {opt:"$\\dfrac{7^{2}-7^{2}-5^{2}}{2\\cdot 7\\cdot 7}$", error:"El signo de $b^{2}+c^{2}$ quedó partido."}
    ],
    theory: th("filtro-L08","Resta el lado de enfrente","h-un-ejemplo-como-en-el-examen"),
    fig: { type:"filtro", name:"law-cosines" }
  }));

  sprint.push(Q({ id:"fs-13", n:13, ch:"filtro-L09", t:"tan·cos", topics:["filtro-ident"],
    prompt:"Si $\\cos x\\neq 0$, $\\tan x\\cdot\\cos x$ es igual a:",
    opts:["$\\cos x$","$\\operatorname{sen} x$","$1$","$\\sec x$"], ans:1,
    exp:"$\\tan x=\\dfrac{\\operatorname{sen}x}{\\cos x}$, por $\\cos x$ se cancela el piso y queda $\\operatorname{sen}x$.",
    distractores:[
      {opt:"$\\cos x$", error:"Cancelaste el seno en vez del coseno."},
      {opt:"$1$", error:"Pensaste que $\\tan$ y $\\cos$ son recíprocas (el recíproco de $\\cos$ es $\\sec$)."},
      {opt:"$\\sec x$", error:"Confundiste $\\tan\\cdot\\cos$ con $\\dfrac{1}{\\cos}$."}
    ],
    theory: th("filtro-L09","El sándwich de la tangente","h-un-ejemplo-como-en-el-examen")
  }));

  sprint.push(Q({ id:"fs-14", n:14, ch:"filtro-L09", t:"Rango del seno", topics:["filtro-ident"],
    prompt:"La ecuación $\\operatorname{sen}\\theta=\\dfrac{3}{2}$ en números reales:",
    opts:["tiene solución $\\theta=30^{\\circ}$","tiene dos soluciones entre $0^{\\circ}$ y $180^{\\circ}$","no tiene solución","tiene solución $\\theta=90^{\\circ}$"], ans:2,
    exp:"$\\operatorname{sen}$ solo toma valores en $[-1,1]$. $\\dfrac{3}{2}=1{,}5>1$, imposible. $90^{\\circ}$ da $1$, no $1{,}5$. $30^{\\circ}$ da $\\dfrac{1}{2}$.",
    distractores:[
      {opt:"tiene solución $\\theta=30^{\\circ}$", error:"$\\operatorname{sen}30^{\\circ}=\\dfrac{1}{2}$, no $\\dfrac{3}{2}$."},
      {opt:"tiene dos soluciones entre $0^{\\circ}$ y $180^{\\circ}$", error:"Eso pasaría si el valor estuviera en $(0,1)$."},
      {opt:"tiene solución $\\theta=90^{\\circ}$", error:"$\\operatorname{sen}90^{\\circ}=1\\neq \\dfrac{3}{2}$."}
    ],
    theory: th("filtro-L09","El seno no pasa de 1","h-la-regla-solo-esto")
  }));

  sprint.push(Q({ id:"fs-15", n:15, ch:"filtro-L09", t:"Valor notable", topics:["filtro-notables-ang"],
    prompt:"$\\operatorname{sen}30^{\\circ}+\\cos 60^{\\circ}$ es igual a:",
    opts:["$1$","$\\sqrt{3}$","$\\dfrac{1}{2}$","$0$"], ans:0,
    exp:"$\\operatorname{sen}30^{\\circ}=\\dfrac{1}{2}$ y $\\cos 60^{\\circ}=\\dfrac{1}{2}$, suma $1$. Truco: senos suben $0,\\dfrac{1}{2},\\dfrac{\\sqrt{2}}{2},\\dfrac{\\sqrt{3}}{2},1$; cosenos al revés.",
    distractores:[
      {opt:"$\\sqrt{3}$", error:"Eso es $2\\cdot\\dfrac{\\sqrt{3}}{2}$, mezclaste $30$ con $60$."},
      {opt:"$\\dfrac{1}{2}$", error:"Te quedaste con uno solo de los dos términos."},
      {opt:"$0$", error:"Restaste o pensaste en $\\operatorname{sen}^{2}+\\cos^{2}$ mal aplicado."}
    ],
    theory: th("filtro-L09","Tabla de notables","h-la-regla-solo-esto")
  }));

  sprint.push(Q({ id:"fs-16", n:16, ch:"filtro-L02", t:"Dominio teórico", topics:["filtro-dominio"],
    prompt:"La expresión $\\dfrac{x}{x^{2}-5x}$ no está definida cuando:",
    opts:["$x=0$ o $x=5$","solo $x=5$","solo $x=0$","$x=1$"], ans:0,
    exp:"$x^{2}-5x=x(x-5)=0$ en $x=0$ y $x=5$. Aunque arriba también hay $x$, el hoyo $x=0$ no se rellena: originalmente el piso era cero.",
    distractores:[
      {opt:"solo $x=5$", error:"Cancelaste la $x$ y olvidaste que $x=0$ también rompe el original."},
      {opt:"solo $x=0$", error:"Olvidaste el otro factor $x-5$."},
      {opt:"$x=1$", error:"No anula el denominador."}
    ],
    theory: th("filtro-L02","Cancelar no borra el hoyo","h-la-trampa-que-te-quita-el-punto")
  }));

  sprint.push(Q({ id:"fs-17", n:17, ch:"filtro-L06", t:"Tales", topics:["filtro-tales"],
    prompt:"Un rayo desde $O$ corta dos paralelas en $A',A$ y otro rayo corta en $B',B$. Si $OA'=4$, $A'A=6$ y $OB'=6$, entonces $B'B$ mide:",
    opts:["$4$","$8$","$9$","$10$"], ans:2,
    fig: { type:"filtro", name:"thales" },
    exp:"$OA=OA'+A'A=10$. Tales: $\\dfrac{OA'}{OA}=\\dfrac{OB'}{OB}\\Rightarrow \\dfrac{4}{10}=\\dfrac{6}{OB}\\Rightarrow OB=15$. Entonces $B'B=OB-OB'=9$. $8$ es $6+2$. $10$ copia $OA$. $4$ iguala el primer tramo.",
    distractores:[
      {opt:"$4$", error:"Igualaste $B'B$ con $OA'$ sin proporción."},
      {opt:"$8$", error:"Hiciste $6+2$ o una regla de tres incompleta."},
      {opt:"$10$", error:"Copiaste $OA$ en vez de calcular $B'B$."}
    ],
    theory: th("filtro-L06","Proporción desde el origen","h-la-regla-solo-esto")
  }));

  sprint.push(Q({ id:"fs-18", n:18, ch:"filtro-L07", t:"Isósceles", topics:["filtro-triangulos"],
    prompt:"Un triángulo isósceles tiene ángulo del vértice $40^{\\circ}$. Cada ángulo de la base mide:",
    opts:["$40^{\\circ}$","$70^{\\circ}$","$80^{\\circ}$","$140^{\\circ}$"], ans:1,
    exp:"Los dos de la base son iguales: $\\dfrac{180-40}{2}=70$. $80$ es $40\\cdot 2$. $140$ es el exterior o $180-40$.",
    distractores:[
      {opt:"$40^{\\circ}$", error:"Eso sería equilátero, o copiar el vértice."},
      {opt:"$80^{\\circ}$", error:"Restaste $40$ de $180$ y no partiste entre $2$ (o multiplicaste $40\\cdot 2$)."},
      {opt:"$140^{\\circ}$", error:"Eso es $180-40$ sin partir: sería un solo ángulo, no cada uno de la base."}
    ],
    theory: th("filtro-L07","Ángulos de la base iguales","h-la-regla-solo-esto")
  }));

  sprint.push(Q({ id:"fs-19", n:19, ch:"filtro-L10", t:"Pendiente", topics:["filtro-pendiente"],
    prompt:"La pendiente de la recta que pasa por $(1,4)$ y $(5,2)$ es:",
    opts:["$\\dfrac{1}{2}$","$\\dfrac{-1}{2}$","$2$","$-2$"], ans:1,
    fig: { type:"filtro", name:"slope" },
    exp:"$m=\\dfrac{2-4}{5-1}=\\dfrac{-2}{4}=-\\dfrac{1}{2}$. $\\dfrac{1}{2}$ pierde el signo. $-2$ invierte rise/run. $2$ hace las dos cosas mal.",
    distractores:[
      {opt:"$\\dfrac{1}{2}$", error:"Restaste al revés una sola coordenada, o perdiste el menos."},
      {opt:"$2$", error:"Pusiste $\\dfrac{\\Delta x}{\\Delta y}$ y además perdiste el signo."},
      {opt:"$-2$", error:"Invertiste rise y run: $\\dfrac{-2}{1}$ o $\\dfrac{-4}{2}$ mal ordenado."}
    ],
    theory: th("filtro-L10","Subida sobre corrida","h-un-ejemplo-como-en-el-examen")
  }));

  sprint.push(Q({ id:"fs-20", n:20, ch:"filtro-L10", t:"Área de triángulo", topics:["filtro-areas"],
    prompt:"Un triángulo de base $8$ y altura $5$ tiene área:",
    opts:["$40$","$20$","$13$","$26$"], ans:1,
    exp:"$A=\\dfrac{bh}{2}=\\dfrac{40}{2}=20$. $40$ olvida dividir entre $2$. $13$ suma $8+5$. $26$ es $8+5\\cdot 2\\cdot 2$ o perímetro a medias.",
    distractores:[
      {opt:"$40$", error:"Olvidaste dividir entre $2$."},
      {opt:"$13$", error:"Sumaste base y altura (eso no es área ni perímetro)."},
      {opt:"$26$", error:"Mezclaste perímetro con área."}
    ],
    theory: th("filtro-L10","Base por altura entre 2","h-la-regla-solo-esto")
  }));

  ALL = ALL.concat(sprint);

  /* ========== TRANSFERENCIA (clones) ========== */
  ALL.push(Q({ id:"ft-01", n:1, ch:"filtro-L07", t:"Correspondencia clone", topics:["filtro-congruencia"],
    prompt:"Si $\\triangle PRQ \\cong \\triangle XYZ$, ¿cuál afirmación es verdadera?",
    opts:["$\\angle P\\cong\\angle Z$","$RQ\\cong XZ$","$PR\\cong XY$","$\\angle R\\cong\\angle Z$"], ans:2,
    exp:"Paso 1: $P\\leftrightarrow X$, $R\\leftrightarrow Y$, $Q\\leftrightarrow Z$. Paso 2: el lado $PR$ une la 1.ª y 2.ª letras, igual que $XY$. Paso 3: $\\angle P\\cong\\angle Z$ mezcla 1.ª con 3.ª. $RQ$ va con $YZ$, no con $XZ$.",
    distractores:[
      {opt:"$\\angle P\\cong\\angle Z$", error:"$P$ viaja con $X$, no con $Z$."},
      {opt:"$RQ\\cong XZ$", error:"$R\\leftrightarrow Y$ y $Q\\leftrightarrow Z$, el lado es $YZ$, no $XZ$."},
      {opt:"$\\angle R\\cong\\angle Z$", error:"$R$ viaja con $Y$."}
    ],
    theory: th("filtro-L07","Lista de pasajeros","h-la-analogía")
  }));

  ALL.push(Q({ id:"ft-02", n:2, ch:"filtro-L07", t:"Correspondencia de ángulos", topics:["filtro-congruencia"],
    prompt:"$\\triangle LMN \\cong \\triangle STU$. Entonces $\\angle N$ es congruente con:",
    opts:["$\\angle S$","$\\angle T$","$\\angle U$","$\\angle L$"], ans:2,
    exp:"Tercera letra $N$ viaja con tercera letra $U$.",
    distractores:[
      {opt:"$\\angle S$", error:"$S$ viaja con $L$, la primera letra."},
      {opt:"$\\angle T$", error:"$T$ viaja con $M$."},
      {opt:"$\\angle L$", error:"Eso es el mismo triángulo, no la correspondencia."}
    ],
    theory: th("filtro-L07","Tercera con tercera","h-la-regla-solo-esto")
  }));

  ALL.push(Q({ id:"ft-03", n:3, ch:"filtro-L04", t:"Edades clone", topics:["filtro-sistemas"],
    prompt:"Hoy Ana tiene el doble de la edad de Luis. Dentro de $6$ años, Ana tendrá $8$ años más que el doble de la edad que Luis tenga entonces. Si $A$ y $L$ son las edades de hoy, el sistema correcto incluye:",
    opts:["$A=2L$ y $A+6=2(L+6)+8$","$A=2L$ y $A+6=2L+8$","$A=2L$ y $A=2L+8$","$A+6=2L$ y $A=2(L+6)$"], ans:0,
    exp:"Foto 1: $A=2L$. Foto 2: dentro de 6, Ana $= A+6$ y el doble de Luis entonces es $2(L+6)$; Ana tiene $8$ más que eso: $A+6=2(L+6)+8$. La (b) no envejece a Luis.",
    distractores:[
      {opt:"$A=2L$ y $A+6=2L+8$", error:"Luis no envejeció: usaste $2L$ en vez de $2(L+6)$."},
      {opt:"$A=2L$ y $A=2L+8$", error:"Mezclaste las dos fotos en el presente."},
      {opt:"$A+6=2L$ y $A=2(L+6)$", error:"Cruzaste hoy de uno con el futuro del otro."}
    ],
    theory: th("filtro-L04","No mezclar las dos fotos","h-la-trampa-que-te-quita-el-punto")
  }));

  ALL.push(Q({ id:"ft-04", n:4, ch:"filtro-L03", t:"Clone −x(x−1)²", topics:["filtro-notables"],
    prompt:"$-x(x-1)^{2}$ desarrollado es:",
    opts:["$-x^{3}+2x^{2}-x$","$-x^{3}-2x^{2}-x$","$-x^{3}+x$","$x^{3}-2x^{2}+x$"], ans:0,
    exp:"$(x-1)^{2}=x^{2}-2x+1$, por $-x$ da $-x^{3}+2x^{2}-x$.",
    distractores:[
      {opt:"$-x^{3}-2x^{2}-x$", error:"Eso es $-x(x+1)^{2}$."},
      {opt:"$-x^{3}+x$", error:"Olvidaste el $2x^{2}$."},
      {opt:"$x^{3}-2x^{2}+x$", error:"Perdiste el menos de afuera."}
    ],
    theory: th("filtro-L03","No confundir (x−1) con (x+1)","h-un-ejemplo-como-en-el-examen")
  }));

  ALL.push(Q({ id:"ft-05", n:5, ch:"filtro-L09", t:"Identidad pitagórica", topics:["filtro-ident"],
    prompt:"$1+\\tan^{2}x$ es idénticamente igual a:",
    opts:["$\\operatorname{sen}^{2}x$","$\\sec^{2}x$","$\\csc^{2}x$","$\\cot^{2}x$"], ans:1,
    exp:"Divide $\\operatorname{sen}^{2}+\\cos^{2}=1$ entre $\\cos^{2}$: $1+\\tan^{2}=\\sec^{2}$. $1+\\cot^{2}=\\csc^{2}$ es la hermana.",
    distractores:[
      {opt:"$\\operatorname{sen}^{2}x$", error:"Eso no sale de $1+\\tan^{2}$."},
      {opt:"$\\csc^{2}x$", error:"Esa es $1+\\cot^{2}$, la identidad hermana."},
      {opt:"$\\cot^{2}x$", error:"Es el recíproco de $\\tan^{2}$, no la identidad."}
    ],
    theory: th("filtro-L09","Las tres pitagóricas","h-la-regla-solo-esto")
  }));

  ALL.push(Q({ id:"ft-06", n:6, ch:"filtro-L09", t:"Pasar a sen y cos", topics:["filtro-ident"],
    prompt:"$\\dfrac{\\operatorname{sen}x}{\\cos x}\\cdot\\cos x\\cdot\\csc x$ se simplifica a:",
    opts:["$1$","$\\operatorname{sen}x$","$\\cos x$","$\\tan x$"], ans:0,
    exp:"$\\tan x\\cdot\\cos x=\\operatorname{sen}x$, por $\\csc x=\\dfrac{1}{\\operatorname{sen}x}$ da $1$ (si $\\operatorname{sen}x\\neq 0$ y $\\cos x\\neq 0$).",
    distractores:[
      {opt:"$\\operatorname{sen}x$", error:"Te detuviste antes de multiplicar por $\\csc x$."},
      {opt:"$\\cos x$", error:"Cancelaste el seno en vez del coseno."},
      {opt:"$\\tan x$", error:"No cancelaste el $\\cos x$."}
    ],
    theory: th("filtro-L09","Todo a sen y cos","h-la-regla-solo-esto")
  }));

  ALL.push(Q({ id:"ft-07", n:7, ch:"filtro-L01", t:"−2⁴ vs (−2)⁴", topics:["filtro-signos"],
    prompt:"$3^{2}-(-2^{4})+2^{5}$ es igual a:",
    opts:["$57$","$25$","$41$","$9$"], ans:0,
    exp:"$3^{2}=9$, $-2^{4}=-16$ luego $-(-16)=+16$, $2^{5}=32$. $9+16+32=57$. Si trataras $(-2)^{4}=+16$, el $-(-16)$ coincidiría; el error típico es $3^{2}-16+32=25$.",
    distractores:[
      {opt:"$25$", error:"Hiciste $9-16+32$ (no cambiaste el signo de $-2^{4}$)."},
      {opt:"$41$", error:"$9+32$ sin el $16$, o $9+32$."},
      {opt:"$9$", error:"Te quedaste con $3^{2}$."}
    ],
    theory: th("filtro-L01","−2⁴ vale −16","h-la-analogía")
  }));

  ALL.push(Q({ id:"ft-08", n:8, ch:"filtro-L08", t:"Pitágoras", topics:["filtro-pitagoras"],
    prompt:"En un triángulo rectángulo los catetos miden $6$ y $8$. La hipotenusa mide:",
    opts:["$10$","$14$","$7$","$100$"], ans:0,
    exp:"$6^{2}+8^{2}=36+64=100=10^{2}$. $14$ suma $6+8$. $100$ es $c^{2}$, no $c$.",
    distractores:[
      {opt:"$14$", error:"Sumaste los catetos (perímetro a medias)."},
      {opt:"$7$", error:"Promediaste $6$ y $8$."},
      {opt:"$100$", error:"Eso es $c^{2}$, te faltó la raíz."}
    ],
    theory: th("filtro-L08","Pitágoras","h-la-regla-solo-esto")
  }));

  ALL.push(Q({ id:"ft-09", n:9, ch:"filtro-L08", t:"Ley de senos, idea", topics:["filtro-senos"],
    prompt:"En un triángulo, el lado $a$ es opuesto a $\\angle A$ y el lado $b$ es opuesto a $\\angle B$. Siempre se cumple:",
    opts:["$\\dfrac{a}{\\operatorname{sen}A}=\\dfrac{b}{\\operatorname{sen}B}$","$a\\operatorname{sen}A=b\\operatorname{sen}B$","$\\dfrac{a}{b}=\\dfrac{\\operatorname{sen}B}{\\operatorname{sen}A}$","$a^{2}+b^{2}=2ab\\operatorname{sen}A$"], ans:0,
    exp:"Ley de senos: lado sobre seno del ángulo de enfrente. (c) está invertida.",
    distractores:[
      {opt:"$a\\operatorname{sen}A=b\\operatorname{sen}B$", error:"Multiplicaste en vez de dividir."},
      {opt:"$\\dfrac{a}{b}=\\dfrac{\\operatorname{sen}B}{\\operatorname{sen}A}$", error:"Invertiste la proporción."},
      {opt:"$a^{2}+b^{2}=2ab\\operatorname{sen}A$", error:"Eso no es senos ni cosenos."}
    ],
    theory: th("filtro-L08","Lado sobre seno de enfrente","h-la-regla-solo-esto"),
    fig: { type:"filtro", name:"law-sines" }
  }));

  ALL.push(Q({ id:"ft-10", n:10, ch:"filtro-L05", t:"|caja|=k dos puertas", topics:["filtro-va"],
    prompt:"Las soluciones de $|2x-4|=6$ son:",
    opts:["$x=5$ y $x=-1$","$x=5$ y $x=1$","$x=3$ y $x=-3$","$x=5$ solo"], ans:0,
    exp:"$2x-4=6$ o $2x-4=-6$. $2x=10\\Rightarrow x=5$. $2x=-2\\Rightarrow x=-1$. $x=1$ sería $2x-4=-2$ u otra puerta mala.",
    distractores:[
      {opt:"$x=5$ y $x=1$", error:"La segunda puerta la resolviste como $2x-4=-2$ o $2x=2$."},
      {opt:"$x=3$ y $x=-3$", error:"Resolviste $|x|=3$ ignorando el $2x-4$."},
      {opt:"$x=5$ solo", error:"El valor absoluto siempre (si $k>0$) abre dos puertas."}
    ],
    theory: th("filtro-L05","Dos puertas","h-la-analogía")
  }));

  ALL.push(Q({ id:"ft-11", n:11, ch:"filtro-L04", t:"Negocio N y renta M", topics:["filtro-sistemas"],
    prompt:"Un local cuesta $25$ de entrada y $15$ cada mes. Si $N$ es el número de meses y $M$ el dinero total, la relación es:",
    opts:["$M=25N+15$","$M=15N+25$","$M=15N-25$","$M=40N$"], ans:1,
    exp:"Fijo $25$ más $15$ por mes: $M=15N+25$.",
    distractores:[
      {opt:"$M=25N+15$", error:"Intercambiaste la entrada con la renta mensual."},
      {opt:"$M=15N-25$", error:"Restaste la entrada en vez de sumarla."},
      {opt:"$M=40N$", error:"Juntaste $25+15$ y lo cobraste cada mes."}
    ],
    theory: th("filtro-L04","Parte fija + parte por mes","h-la-regla-solo-esto")
  }));

  ALL.push(Q({ id:"ft-12", n:12, ch:"filtro-L09", t:"SOHCAHTOA", topics:["filtro-razones"],
    prompt:"En un triángulo rectángulo, el cateto opuesto a $\\theta$ mide $3$ y la hipotenusa $5$. Entonces $\\operatorname{sen}\\theta$ vale:",
    opts:["$\\dfrac{3}{5}$","$\\dfrac{4}{5}$","$\\dfrac{3}{4}$","$\\dfrac{5}{3}$"], ans:0,
    fig: { type:"filtro", name:"sohcahtoa" },
    exp:"$\\operatorname{sen}=\\dfrac{\\text{opuesto}}{\\text{hipotenusa}}=\\dfrac{3}{5}$. $\\dfrac{4}{5}$ sería el coseno si el otro cateto es $4$ (Pitágoras). $\\dfrac{3}{4}$ es la tangente. $\\dfrac{5}{3}$ es la cosecante.",
    distractores:[
      {opt:"$\\dfrac{4}{5}$", error:"Eso es $\\cos\\theta$ (adyacente $4$, hipotenusa $5$)."},
      {opt:"$\\dfrac{3}{4}$", error:"Eso es $\\tan\\theta$."},
      {opt:"$\\dfrac{5}{3}$", error:"Eso es $\\csc\\theta$, el recíproco."}
    ],
    theory: th("filtro-L09","Seno es opuesto sobre hipotenusa","h-la-analogía")
  }));

  ALL.push(Q({ id:"ft-13", n:13, ch:"filtro-L06", t:"Opuestos por el vértice", topics:["filtro-angulos"],
    prompt:"Dos rectas se cortan. Un ángulo mide $130^{\\circ}$. El opuesto por el vértice mide:",
    opts:["$50^{\\circ}$","$130^{\\circ}$","$40^{\\circ}$","$180^{\\circ}$"], ans:1,
    exp:"Opuestos por el vértice son iguales. $50^{\\circ}$ es el adyacente suplementario ($180-130$).",
    distractores:[
      {opt:"$50^{\\circ}$", error:"Ese es el adyacente (suplementario), no el opuesto."},
      {opt:"$40^{\\circ}$", error:"Restaste $180-140$ o similar."},
      {opt:"$180^{\\circ}$", error:"Eso es un llano, no el opuesto."}
    ],
    theory: th("filtro-L06","Opuestos iguales, adyacentes suman 180","h-la-regla-solo-esto")
  }));

  ALL.push(Q({ id:"ft-14", n:14, ch:"filtro-L07", t:"Equilátero", topics:["filtro-triangulos"],
    prompt:"En un triángulo equilátero de lado $6$, cada ángulo mide:",
    opts:["$30^{\\circ}$","$45^{\\circ}$","$60^{\\circ}$","$90^{\\circ}$"], ans:2,
    exp:"Tres ángulos iguales que suman $180$ → $60$ cada uno. El lado $6$ no cambia los ángulos.",
    distractores:[
      {opt:"$30^{\\circ}$", error:"Eso aparece en el $30$-$60$-$90$, no en el equilátero."},
      {opt:"$45^{\\circ}$", error:"Eso es el isósceles rectángulo."},
      {opt:"$90^{\\circ}$", error:"El equilátero no es rectángulo."}
    ],
    theory: th("filtro-L07","Equilátero = 60 60 60","h-la-regla-solo-esto")
  }));

  ALL.push(Q({ id:"ft-15", n:15, ch:"filtro-L02", t:"√32−√8 clone", topics:["filtro-radicales"],
    prompt:"$\\sqrt{50}-\\sqrt{18}$ es igual a:",
    opts:["$\\sqrt{32}$","$2\\sqrt{2}$","$8\\sqrt{2}$","$4\\sqrt{2}$"], ans:1,
    exp:"$\\sqrt{50}=5\\sqrt{2}$, $\\sqrt{18}=3\\sqrt{2}$, resta $2\\sqrt{2}$. $\\sqrt{32}$ es restar dentro. $8\\sqrt{2}$ suma. $4\\sqrt{2}$ es $5-1$.",
    distractores:[
      {opt:"$\\sqrt{32}$", error:"Restaste $50-18$ dentro de la raíz."},
      {opt:"$8\\sqrt{2}$", error:"Sumaste $5+3$."},
      {opt:"$4\\sqrt{2}$", error:"Restaste $5-1$ como si $\\sqrt{18}$ fuera $\\sqrt{2}$."}
    ],
    theory: th("filtro-L02","Sacar el cuadrado y restar","h-la-regla-solo-esto")
  }));

  ALL.push(Q({ id:"ft-16", n:16, ch:"filtro-L04", t:"Vieta producto", topics:["filtro-vieta"],
    prompt:"El producto de las raíces de $x^{2}-5x+6=0$ es:",
    opts:["$-5$","$5$","$6$","$-6$"], ans:2,
    exp:"Producto $=\\dfrac{c}{a}=6$. (Las raíces son $2$ y $3$, $2\\cdot 3=6$.) $5$ es la suma con signo cambiado.",
    distractores:[
      {opt:"$-5$", error:"Eso es $-b$ o la suma con signo."},
      {opt:"$5$", error:"Eso es la suma $b$ (aquí suma $=5$)."},
      {opt:"$-6$", error:"Le pusiste un menos al producto."}
    ],
    theory: th("filtro-L04","Producto = c/a","h-la-regla-solo-esto")
  }));

  ALL.push(Q({ id:"ft-17", n:17, ch:"filtro-L05", t:"Intervalo |x|<a", topics:["filtro-va"],
    prompt:"$|x-1|<3$ equivale a:",
    opts:["$x<4$","$-2<x<4$","$x<-2$ o $x>4$","$x> -2$"], ans:1,
    exp:"$-3<x-1<3\\Rightarrow -2<x<4$. La unión $x<-2$ o $x>4$ es $|x-1|>3$.",
    distractores:[
      {opt:"$x<4$", error:"Solo escribiste un lado de la cadena."},
      {opt:"$x<-2$ o $x>4$", error:"Eso es la desigualdad **mayor** que $3$, no menor."},
      {opt:"$x> -2$", error:"Solo escribiste el otro lado."}
    ],
    theory: th("filtro-L05","|A|<k es una cadena","h-la-regla-solo-esto")
  }));

  ALL.push(Q({ id:"ft-18", n:18, ch:"filtro-L09", t:"Recíprocas", topics:["filtro-ident"],
    prompt:"$\\sec x\\cdot\\cos x$ (donde existe) vale:",
    opts:["$\\tan x$","$1$","$\\operatorname{sen}x$","$0$"], ans:1,
    exp:"$\\sec=\\dfrac{1}{\\cos}$, el producto es $1$.",
    distractores:[
      {opt:"$\\tan x$", error:"Confundiste $\\sec$ con $\\dfrac{\\operatorname{sen}}{\\cos}$."},
      {opt:"$\\operatorname{sen}x$", error:"Eso era $\\tan\\cdot\\cos$."},
      {opt:"$0$", error:"No se anulan: se cancelan a $1$."}
    ],
    theory: th("filtro-L09","Recíprocas","h-la-regla-solo-esto")
  }));

  ALL.push(Q({ id:"ft-19", n:19, ch:"filtro-L01", t:"Fracción combinada clone", topics:["filtro-fracciones"],
    prompt:"$\\dfrac{1}{2}+\\dfrac{1}{3}-\\dfrac{1}{6}$ es igual a:",
    opts:["$\\dfrac{1}{3}$","$\\dfrac{2}{3}$","$1$","$\\dfrac{1}{6}$"], ans:1,
    exp:"LCD $6$: $\\dfrac{3}{6}+\\dfrac{2}{6}-\\dfrac{1}{6}=\\dfrac{4}{6}=\\dfrac{2}{3}$.",
    distractores:[
      {opt:"$\\dfrac{1}{3}$", error:"Hiciste $3+2-1=4$ y luego $\\dfrac{2}{6}$ o $\\dfrac{1}{3}$."},
      {opt:"$1$", error:"Sumaste $\\dfrac{1}{2}+\\dfrac{1}{3}+\\dfrac{1}{6}$ sin el menos, o $\\dfrac{6}{6}$."},
      {opt:"$\\dfrac{1}{6}$", error:"Restaste todo hacia el término más chico."}
    ],
    theory: th("filtro-L01","Denominador común","h-la-regla-solo-esto")
  }));

  ALL.push(Q({ id:"ft-20", n:20, ch:"filtro-L07", t:"Semejanza AA", topics:["filtro-semejanza"],
    prompt:"Dos triángulos tienen ángulos $40^{\\circ},70^{\\circ},70^{\\circ}$ y $70^{\\circ},40^{\\circ},70^{\\circ}$. Entonces:",
    opts:["son congruentes sí o sí","son semejantes","no se puede saber nada","uno es rectángulo"], ans:1,
    exp:"Mismos ángulos (AA) ⇒ semejantes. Sin un lado, no hay congruencia forzada. Ninguno tiene $90^{\\circ}$.",
    distractores:[
      {opt:"son congruentes sí o sí", error:"Falta un lado: pueden ser de distinto tamaño."},
      {opt:"no se puede saber nada", error:"AA ya alcanza para semejanza."},
      {opt:"uno es rectángulo", error:"No hay ángulo de $90^{\\circ}$."}
    ],
    theory: th("filtro-L07","AA basta para semejanza","h-la-regla-solo-esto")
  }));

  /* ========== SIMULACRO 30 (mix nuevo) ========== */
  /* Build simulacro carefully with correct answers */
  function SX(id, ch, prompt, opts, ans, exp, title, topic) {
    var ds = [];
    opts.forEach(function (op, i) {
      if (i !== ans) ds.push({ opt: op, error: "No sigue el procedimiento de la explicación." });
    });
    return Q({
      id: id, n: parseInt(id.slice(3), 10), ch: ch, t: title, topics: [topic || "filtro-mix"],
      prompt: prompt, opts: opts, ans: ans, exp: exp, distractores: ds,
      theory: th(ch, title, "h-la-regla-solo-esto")
    });
  }

  ALL.push(SX("fx-01","filtro-L01","El valor de $5-3\\cdot(2-6)$ es:",
    ["$17$","$11$","$-7$","$8$"], 0,
    "Paso 1: $2-6=-4$. Paso 2: $3\\cdot(-4)=-12$. Paso 3: $5-(-12)=17$.",
    "Jerarquía con menos", "filtro-signos"));
  ALL.push(SX("fx-02","filtro-L01","$(-2)^{3}\\cdot(-1)^{5}$ vale:",
    ["$8$","$-8$","$2$","$-2$"], 0,
    "$(-2)^{3}=-8$, $(-1)^{5}=-1$, producto de dos menos: $+8$.",
    "Potencia impar", "filtro-signos"));
  ALL.push(SX("fx-03","filtro-L02","$\\sqrt{12}+\\sqrt{27}$ es:",
    ["$5\\sqrt{3}$","$\\sqrt{39}$","$3\\sqrt{3}$","$6\\sqrt{3}$"], 0,
    "$\\sqrt{12}=2\\sqrt{3}$, $\\sqrt{27}=3\\sqrt{3}$, suma $5\\sqrt{3}$. $\\sqrt{39}$ junta dentro.",
    "Sumar radicales", "filtro-radicales"));
  ALL.push(SX("fx-04","filtro-L03","$x^{2}-9$ factoriza como:",
    ["$(x-3)^{2}$","$(x-9)(x+1)$","$(x-3)(x+3)$","$x(x-9)$"], 2,
    "Diferencia de cuadrados $a^{2}-b^{2}=(a-b)(a+b)$. $(x-3)^{2}=x^{2}-6x+9$.",
    "Diferencia de cuadrados", "filtro-notables"));
  ALL.push(SX("fx-05","filtro-L04","La suma de raíces de $x^{2}+4x-5=0$ es:",
    ["$5$","$-4$","$4$","$-5$"], 1,
    "$\\dfrac{-b}{a}=-4$. Comprobación: $(x+5)(x-1)=0$, $-5+1=-4$.",
    "Vieta", "filtro-vieta"));
  ALL.push(SX("fx-06","filtro-L04","Si $x+y=7$ y $x-y=1$, entonces $y$ vale:",
    ["$3$","$4$","$6$","$8$"], 0,
    "Suma: $2x=8$, $x=4$, luego $y=3$.",
    "Sistema simple", "filtro-sistemas"));
  ALL.push(SX("fx-07","filtro-L05","$3-2x\\ge 7$ equivale a:",
    ["$x\\le -2$","$x\\ge -2$","$x\\le 2$","$x\\ge 2$"], 0,
    "$-2x\\ge 4$. Dividir por $-2$ voltea: $x\\le -2$.",
    "Inecuación con volteo", "filtro-ineq"));
  ALL.push(SX("fx-08","filtro-L06","Entre paralelas, los ángulos correspondientes:",
    ["son iguales","suman $180^{\\circ}$","suman $90^{\\circ}$","uno es el doble del otro"], 0,
    "Correspondientes iguales. Quienes suman $180^{\\circ}$ son los colaterales internos.",
    "Correspondientes", "filtro-angulos"));
  ALL.push(SX("fx-09","filtro-L07","Si $\\triangle ABC\\cong\\triangle DEF$, el lado $AC$ corresponde a:",
    ["$DE$","$DF$","$EF$","$ED$"], 1,
    "$A\\leftrightarrow D$, $C\\leftrightarrow F$ ⇒ $AC\\leftrightarrow DF$. $DE$ es $AB$. $EF$ es $BC$.",
    "Lado 1.ª con 3.ª", "filtro-congruencia"));
  ALL.push(SX("fx-10","filtro-L08","La ley de cosenos se reduce a Pitágoras cuando el ángulo es:",
    ["$0^{\\circ}$","$90^{\\circ}$","$60^{\\circ}$","$180^{\\circ}$"], 1,
    "$\\cos 90^{\\circ}=0$, se cae el término $-2ab\\cos C$.",
    "Cosenos = Pitágoras en 90°", "filtro-cosenos"));
  ALL.push(SX("fx-11","filtro-L09","$\\cot x\\cdot\\operatorname{sen}x$ (donde existe) es:",
    ["$\\cos x$","$\\operatorname{sen}x$","$1$","$\\tan x$"], 0,
    "$\\cot x=\\dfrac{\\cos x}{\\operatorname{sen}x}$, por $\\operatorname{sen}x$ queda $\\cos x$.",
    "Identidad de cotangente", "filtro-ident"));
  ALL.push(SX("fx-12","filtro-L09","$\\cos 0^{\\circ}$ vale:",
    ["$0$","$1$","$\\dfrac{1}{2}$","no existe"], 1,
    "En $0^{\\circ}$ el punto del círculo es $(1,0)$: coseno $1$, seno $0$.",
    "cos 0°", "filtro-notables-ang"));
  ALL.push(SX("fx-13","filtro-L02","$\\dfrac{1}{x-2}$ no está definida si:",
    ["$x=0$","$x=2$","$x=-2$","$x=1$"], 1,
    "El piso $x-2=0$ cuando $x=2$.",
    "Hoyo simple", "filtro-dominio"));
  ALL.push(SX("fx-14","filtro-L10","El área de un rectángulo de lados $5$ y $8$ es:",
    ["$13$","$26$","$40$","$20$"], 2,
    "$5\\cdot 8=40$. $26$ es el perímetro $2(5+8)$. $13$ es $5+8$.",
    "Área vs perímetro", "filtro-areas"));
  ALL.push(SX("fx-15","filtro-L07","¿Cuál criterio NO demuestra congruencia?",
    ["LAL","LLA","ALA","LLL"], 1,
    "LLA (SSA) es el caso ambiguo. AAA tampoco, pero no está en las opciones.",
    "Trampa LLA", "filtro-congruencia"));
  ALL.push(SX("fx-16","filtro-L04","Si $3^{x}=27$, entonces $x$ es:",
    ["$3$","$9$","$27$","$6$"], 0,
    "$27=3^{3}$, luego $x=3$.",
    "Exponencial simple", "filtro-exp"));
  ALL.push(SX("fx-17","filtro-L06","Un ángulo de $110^{\\circ}$ y su adyacente en un llano suman $180^{\\circ}$. El adyacente mide:",
    ["$70^{\\circ}$","$110^{\\circ}$","$20^{\\circ}$","$250^{\\circ}$"], 0,
    "$180-110=70$. El opuesto por el vértice sí sería $110$.",
    "Adyacentes suplementarios", "filtro-angulos"));
  ALL.push(SX("fx-18","filtro-L09","$\\operatorname{sen}^{2}x+\\cos^{2}x$ es idénticamente:",
    ["$0$","$x$","$1$","$2$"], 2,
    "Identidad pitagórica madre, Pitágoras en el círculo unitario.",
    "Identidad madre", "filtro-ident"));
  ALL.push(SX("fx-19","filtro-L03","$(2x-3)(2x+3)$ es igual a:",
    ["$4x^{2}-9$","$4x^{2}+9$","$4x^{2}-6x-9$","$2x^{2}-9$"], 0,
    "Notable $(a-b)(a+b)=a^{2}-b^{2}$ con $a=2x$, $b=3$.",
    "Producto de conjugados", "filtro-notables"));
  ALL.push(SX("fx-20","filtro-L05","La ecuación $|x|=0$ tiene:",
    ["ninguna solución","una solución","dos soluciones","infinitas soluciones"], 1,
    "Solo $x=0$: las dos puertas caen en el mismo punto.",
    "Valor absoluto cero", "filtro-va"));
  ALL.push(SX("fx-21","filtro-L08","Un triángulo de lados $5$, $12$ y $13$ es:",
    ["acutángulo","rectángulo","obtusángulo","imposible"], 1,
    "$5^{2}+12^{2}=25+144=169=13^{2}$. Terna pitagórica.",
    "Terna 5-12-13", "filtro-pitagoras"));
  ALL.push(SX("fx-22","filtro-L07","La altura de un triángulo es el segmento que:",
    ["llega al punto medio del lado opuesto","llega al lado opuesto formando $90^{\\circ}$","parte el ángulo del vértice en dos","es paralelo a un lado"], 1,
    "Altura = $90^{\\circ}$. El punto medio es la mediana.",
    "Definición de altura", "filtro-triangulos"));
  ALL.push(SX("fx-23","filtro-L01","$2^{-3}$ es igual a:",
    ["$-6$","$-8$","$\\dfrac{1}{8}$","$8$"], 2,
    "$a^{-n}=\\dfrac{1}{a^{n}}=\\dfrac{1}{8}$. El menos del exponente no pinta de negativo al $2$.",
    "Potencia negativa", "filtro-potencias"));
  ALL.push(SX("fx-24","filtro-L04","Hoy Pedro tiene $4$ años más que Eva. Dentro de $2$ años, Pedro tendrá el doble de la edad que Eva tiene **hoy**. Si $E$ es la edad de Eva hoy, se cumple:",
    ["$E+4+2=2E$","$E+4=2(E+2)$","$E=2(E+4)$","$E+2=2E$"], 0,
    "Pedro hoy: $E+4$. Pedro en 2 años: $E+6$. El doble de Eva **hoy** es $2E$. Entonces $E+6=2E\\Rightarrow E=6$. La ecuación es $E+4+2=2E$.",
    "Leer ‘hoy’ en el enunciado", "filtro-sistemas"));
  ALL.push(SX("fx-25","filtro-L06","Un rayo desde $O$ corta dos paralelas: el tramo corto mide $2$ y el resto hasta la segunda paralela mide $6$. Otro rayo tiene tramo corto $3$. El tramo largo de ese segundo rayo mide:",
    ["$7$","$9$","$5$","$4$"], 1,
    "$OA=2+6=8$. $\\dfrac{2}{8}=\\dfrac{3}{OB}\\Rightarrow OB=12$. El tramo largo es $12-3=9$.",
    "Tales numérico", "filtro-tales"));
  ALL.push(SX("fx-26","filtro-L09","$\\tan 45^{\\circ}$ vale:",
    ["$0$","$1$","$\\sqrt{3}$","no existe"], 1,
    "En $45^{\\circ}$ opuesto = adyacente, el cociente es $1$. $\\sqrt{3}$ es $\\tan 60^{\\circ}$.",
    "tan 45°", "filtro-notables-ang"));
  ALL.push(SX("fx-27","filtro-L10","La pendiente entre $(0,0)$ y $(2,-4)$ es:",
    ["$2$","$-2$","$\\dfrac{1}{2}$","$\\dfrac{-1}{2}$"], 1,
    "$m=\\dfrac{-4}{2}=-2$. Baja $2$ por cada paso a la derecha.",
    "Pendiente negativa", "filtro-pendiente"));
  ALL.push(SX("fx-28","filtro-L03","La factorización completa de $2x^{3}-4x^{2}$ es:",
    ["$2x^{2}(x-2)$","$2x(x^{2}-2)$","$x^{3}\\left(2-\\dfrac{4}{x}\\right)$","$2(x^{3}-2)$"], 0,
    "Factor común $2x^{2}$: $2x^{2}(x-2)$. $2x(x^{2}-2)$ no es cierto porque $2x\\cdot x^{2}=2x^{3}$ pero $2x\\cdot(-2)=-4x$, no $-4x^{2}$.",
    "Factor común completo", "filtro-factor"));
  ALL.push(SX("fx-29","filtro-L07","Si dos triángulos cumplen LAL, entonces:",
    ["solo son semejantes","son congruentes","no se puede saber","son isósceles"], 1,
    "LAL (dos lados y el ángulo **incluido**) es criterio de congruencia.",
    "Criterio LAL", "filtro-congruencia"));
  ALL.push(SX("fx-30","filtro-L08","Si conoces dos lados y el ángulo **incluido** (SAS), para el tercer lado usas:",
    ["solo la ley de senos","la ley de cosenos","solo Pitágoras","Tales"], 1,
    "SAS → cosenos. Senos necesita un par ángulo + lado opuesto ya cerrado.",
    "Cuándo usar cosenos", "filtro-cosenos"));

  ALL.forEach(function (q, i) { q.n = i + 1; });

  window.GUIA_BANK_FILTRO = { mat: ALL };
  window.GUIA_BANK_FILTRO_META = {
    total: ALL.length,
    fourier: ALL.filter(function (q) { return q.id.indexOf("ff-") === 0; }).length,
    sprint: ALL.filter(function (q) { return q.id.indexOf("fs-") === 0; }).length,
    transfer: ALL.filter(function (q) { return q.id.indexOf("ft-") === 0; }).length,
    simulacro: ALL.filter(function (q) { return q.id.indexOf("fx-") === 0; }).length
  };
})();
