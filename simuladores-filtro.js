/* Cuatro simuladores del intensivo de un día. Independientes de la ruta de 30. */
window.SIMULADORES_FILTRO = {
  meta: {
    total: 4,
    ruta: "Intensivo filtro · un día · máximo 6 horas (meta real: 5)",
    orden: ["filtro-sprint", "filtro-fourier", "filtro-transferencia", "filtro-simulacro", "filtro-rotativo"]
  },
  simuladores: [
    {
      sim_id: "filtro-sprint",
      simulador: 1,
      nivel: "intermedio",
      nombre: "Sprint de tipos",
      descripcion: "20 preguntas, una de cada tipo que más se repite. Calentamiento de 25 minutos antes del cuadernillo.",
      objetivo: "Tocar congruencia, trigo, signos, Vieta, sistemas, inecuaciones, Tales y pendiente una vez cada uno.",
      duracion_min: 25,
      n: 20,
      shuffleQuestions: true,
      sequential: false,
      color: "#0f6cbf",
      icon: "⚡",
      question_ids: [
        "fs-01","fs-02","fs-03","fs-04","fs-05","fs-06","fs-07","fs-08","fs-09","fs-10",
        "fs-11","fs-12","fs-13","fs-14","fs-15","fs-16","fs-17","fs-18","fs-19","fs-20"
      ]
    },
    {
      sim_id: "filtro-fourier",
      simulador: 2,
      nivel: "intermedio",
      nombre: "Cuadernillo Fourier",
      descripcion: "Los ítems del taller Jean Fourier del 12 de agosto, transcritos y con la clave verificada (no se copian resaltados a ciegas).",
      objetivo: "Rendir el cuadernillo en el mismo orden, con explicación de cada distractor.",
      duracion_min: 30,
      n: 20,
      shuffleQuestions: false,
      sequential: true,
      color: "#7c3aed",
      icon: "📒",
      question_ids: [
        "ff-01","ff-02","ff-03","ff-04","ff-05","ff-06","ff-07","ff-08","ff-09","ff-10",
        "ff-11","ff-12","ff-13","ff-14","ff-15","ff-16","ff-17","ff-18","ff-19","ff-20"
      ]
    },
    {
      sim_id: "filtro-transferencia",
      simulador: 3,
      nivel: "intermedio",
      nombre: "Clones de transferencia",
      descripcion: "Misma idea que lo reportado (congruencia, edades, −x(x±1)², identidades, Tales), otros números. Evita memorizar el cuadernillo.",
      objetivo: "Comprobar que entendiste el tipo, no la pregunta concreta.",
      duracion_min: 25,
      n: 20,
      shuffleQuestions: true,
      sequential: false,
      color: "#c2410c",
      icon: "🔄",
      question_ids: [
        "ft-01","ft-02","ft-03","ft-04","ft-05","ft-06","ft-07","ft-08","ft-09","ft-10",
        "ft-11","ft-12","ft-13","ft-14","ft-15","ft-16","ft-17","ft-18","ft-19","ft-20"
      ]
    },
    {
      sim_id: "filtro-simulacro",
      simulador: 4,
      nivel: "intermedio",
      nombre: "Simulacro del día",
      descripcion: "30 preguntas en 90 minutos, mixto, ritmo del filtro real. Cierra el día.",
      objetivo: "Administrar 3 minutos por ítem, marcar y seguir, volver a trigo y congruencia al final.",
      duracion_min: 90,
      n: 30,
      shuffleQuestions: true,
      sequential: true,
      color: "#d62828",
      icon: "🎯",
      question_ids: [
        "fx-01","fx-02","fx-03","fx-04","fx-05","fx-06","fx-07","fx-08","fx-09","fx-10",
        "fx-11","fx-12","fx-13","fx-14","fx-15","fx-16","fx-17","fx-18","fx-19","fx-20",
        "fx-21","fx-22","fx-23","fx-24","fx-25","fx-26","fx-27","fx-28","fx-29","fx-30"
      ]
    },
    {
      sim_id: "filtro-rotativo",
      simulador: 5,
      extra: true,
      rotatePool: true,
      poolPrefix: "fp-",
      nivel: "dificil",
      nombre: "Simulacro extra · banco rotativo",
      descripcion: "30 preguntas en 90 minutos, como el simulacro del día, pero más difíciles y con más álgebra. Cada intento saca 30 distintas (alcanza para 10 rondas originales). Incluye circunferencia.",
      objetivo: "Practicar todos los temas del filtro sin memorizar el mismo set. Álgebra pesa más; también salen triángulos, trigo y circunferencia.",
      duracion_min: 90,
      n: 30,
      shuffleQuestions: true,
      sequential: true,
      color: "#0f4c81",
      icon: "♾",
      question_ids: [],
      slots: [
        { fam: "powers", n: 2 },
        { fam: "prod-pow", n: 1 },
        { fam: "frac-comb", n: 2 },
        { fam: "radicals", n: 2 },
        { fam: "vieta-sum", n: 2 },
        { fam: "vieta-diff", n: 1 },
        { fam: "systems", n: 2 },
        { fam: "factor", n: 1 },
        { fam: "ineq", n: 2 },
        { fam: "domain", n: 1 },
        { fam: "congruence", n: 2 },
        { fam: "similarity", n: 1 },
        { fam: "parallels", n: 1 },
        { fam: "thales", n: 1 },
        { fam: "cosines", n: 1 },
        { fam: "sines-pit", n: 1 },
        { fam: "trig-id", n: 2 },
        { fam: "soh", n: 1 },
        { fam: "circle", n: 3 },
        { fam: "slope", n: 1 }
      ]
    }
  ]
};
