/* Controlador de la Plataforma de Estudio EPN Día 2 — Notebook Theme */

let currentSubjectFilter = 'todos';
let searchQuery = '';
let quizAnswers = {};

document.addEventListener('DOMContentLoaded', function () {
  initApp();
});

function initApp() {
  updateCounts();
  renderTopics();
  renderQuizSection();
  triggerMath();
}

function updateCounts() {
  const topics = (window.STUDY_DATA && window.STUDY_DATA.topics) || [];
  const countTodos = topics.length;
  const countFisica = topics.filter(t => t.subject === 'fisica').length;
  const countQuimica = topics.filter(t => t.subject === 'quimica').length;
  const countLenguaje = topics.filter(t => t.subject === 'lenguaje').length;

  const elTodos = document.getElementById('count-todos');
  const elFisica = document.getElementById('count-fisica');
  const elQuimica = document.getElementById('count-quimica');
  const elLenguaje = document.getElementById('count-lenguaje');

  if (elTodos) elTodos.textContent = countTodos;
  if (elFisica) elFisica.textContent = countFisica;
  if (elQuimica) elQuimica.textContent = countQuimica;
  if (elLenguaje) elLenguaje.textContent = countLenguaje;
}

function setFilterSubject(subj) {
  currentSubjectFilter = subj;

  // Update tab button styles
  const btns = document.querySelectorAll('.filter-tab-btn');
  btns.forEach(btn => {
    btn.className = 'filter-tab-btn px-4 py-2 rounded-xl bg-white text-[#5c5246] border border-[#d9ccba] hover:bg-[#eee4d4] transition flex items-center gap-2 font-bold text-xs';
  });

  const activeBtn = document.getElementById('filter-btn-' + subj);
  if (activeBtn) {
    if (subj === 'todos') {
      activeBtn.className = 'filter-tab-btn px-4 py-2 rounded-xl bg-[#1f1a14] text-white border border-[#1f1a14] transition shadow-sm flex items-center gap-2 font-bold text-xs';
    } else if (subj === 'fisica') {
      activeBtn.className = 'filter-tab-btn px-4 py-2 rounded-xl bg-[#10233f] text-white border border-[#10233f] transition shadow-sm flex items-center gap-2 font-bold text-xs';
    } else if (subj === 'quimica') {
      activeBtn.className = 'filter-tab-btn px-4 py-2 rounded-xl bg-[#1a4d3e] text-white border border-[#1a4d3e] transition shadow-sm flex items-center gap-2 font-bold text-xs';
    } else if (subj === 'lenguaje') {
      activeBtn.className = 'filter-tab-btn px-4 py-2 rounded-xl bg-[#a94515] text-white border border-[#a94515] transition shadow-sm flex items-center gap-2 font-bold text-xs';
    } else if (subj === 'quiz') {
      activeBtn.className = 'filter-tab-btn px-4 py-2 rounded-xl bg-[#31765f] text-white border border-[#31765f] transition shadow-sm flex items-center gap-2 font-bold text-xs';
    }
  }

  const topicsContainer = document.getElementById('topics-container');
  const quizContainer = document.getElementById('quiz-section-container');

  if (subj === 'quiz') {
    if (topicsContainer) topicsContainer.classList.add('hidden');
    if (quizContainer) quizContainer.classList.remove('hidden');
  } else {
    if (topicsContainer) topicsContainer.classList.remove('hidden');
    if (quizContainer) quizContainer.classList.add('hidden');
    renderTopics();
  }

  triggerMath();
  window.scrollTo({ top: 400, behavior: 'smooth' });
}

function filterStudyCards(query) {
  searchQuery = (query || '').toLowerCase().trim();
  renderTopics();
  triggerMath();
}

function renderTopics() {
  const container = document.getElementById('topics-container');
  if (!container) return;

  const topics = (window.STUDY_DATA && window.STUDY_DATA.topics) || [];
  
  // Filter by subject and search
  const filtered = topics.filter(t => {
    const matchSubj = (currentSubjectFilter === 'todos' || t.subject === currentSubjectFilter);
    if (!matchSubj) return false;
    if (!searchQuery) return true;
    const haystack = [t.title, t.lead, t.quickRule, t.eyebrow, t.unit, ...(t.variables || [])].join(' ').toLowerCase();
    return haystack.includes(searchQuery);
  });

  if (!filtered.length) {
    container.innerHTML = `
      <div class="col-span-full p-12 text-center bg-white rounded-3xl border border-[#d9ccba]">
        <i class="fa-solid fa-folder-open text-4xl text-[#b8a690] mb-3"></i>
        <h3 class="font-display text-xl text-[#1f1a14]">No se encontraron bloques para esta búsqueda</h3>
        <p class="text-xs text-[#6d6152] mt-1">Prueba con otra palabra clave como "Hooke", "Bohr", "Redox", "Tesis" o "Salto".</p>
      </div>
    `;
    return;
  }

  let html = '';

  filtered.forEach((item, index) => {
    // Subject theme badge colors
    let subjTagBg = 'bg-[#e9eef6] text-[#10233f] border-[#cfe3d9]';
    let subjIcon = 'fa-atom text-[#0284c7]';
    let subjName = 'Física';

    if (item.subject === 'quimica') {
      subjTagBg = 'bg-[#e7f2ed] text-[#1a4d3e] border-[#c6dfd3]';
      subjIcon = 'fa-flask text-[#059669]';
      subjName = 'Química';
    } else if (item.subject === 'lenguaje') {
      subjTagBg = 'bg-[#fff0e7] text-[#a94515] border-[#ecd2bf]';
      subjIcon = 'fa-book-open-reader text-[#e86b2e]';
      subjName = 'Lenguaje';
    }

    html += `
      <article class="notebook-card p-6 sm:p-8 flex flex-col justify-between" id="topic-card-${item.id}">
        <div>
          <!-- Header Card -->
          <div class="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-[#e6dbcd]">
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-1 rounded-lg bg-[#eee4d4] text-[#5c5246] font-bold text-xs">
                ${item.eyebrow}
              </span>
              <span class="px-2.5 py-1 rounded-lg ${subjTagBg} font-bold text-xs border flex items-center gap-1.5">
                <i class="fa-solid ${subjIcon}"></i> ${subjName}
              </span>
            </div>
            <span class="px-2 py-0.5 rounded-full bg-[#fff0e7] text-[#a94515] font-extrabold text-[10px] uppercase tracking-wider border border-[#ecd2bf]">
              ${item.priority || 'Esencial'}
            </span>
          </div>

          <!-- Title & Lead -->
          <h2 class="font-display text-2xl sm:text-3xl font-bold text-[#1f1a14] mb-3 leading-tight">
            ${item.title}
          </h2>
          <p class="text-sm text-[#383027] leading-relaxed mb-6 font-normal">
            ${item.lead}
          </p>

          <!-- Regla Rápida / Mnemotecnia -->
          ${item.quickRule ? `
            <div class="rule-box p-4 mb-6 text-xs text-[#7a5900]">
              <div class="font-bold flex items-center gap-1.5 mb-1 text-[#8c6b00] uppercase tracking-wider text-[11px]">
                <i class="fa-solid fa-bolt text-[#d4a300]"></i> Nota de examen / Regla de oro:
              </div>
              <p class="font-semibold leading-relaxed text-[#594500]">${item.quickRule}</p>
            </div>
          ` : ''}

          <!-- Fórmula en Caja Oscura -->
          ${item.formula ? `
            <div class="formula-dark-box p-4 mb-4 text-center">
              <div class="text-[10px] font-bold uppercase tracking-widest text-sky-300 mb-2">Herramienta Matemática / Ecuación</div>
              <div class="text-sm sm:text-base font-mono overflow-x-auto py-1">
                $$${item.formula}$$
              </div>
            </div>
          ` : ''}

          <!-- Variables de Bolsillo -->
          ${item.variables && item.variables.length ? `
            <div class="mb-6">
              <div class="text-[11px] font-bold uppercase tracking-wider text-[#6d6152] mb-2 flex items-center gap-1.5">
                <i class="fa-solid fa-cube text-[#8c7a65]"></i> Variables de bolsillo:
              </div>
              <div class="flex flex-wrap gap-1.5">
                ${item.variables.map(v => `
                  <span class="px-2.5 py-1 rounded-lg bg-[#f4ece1] text-[#383027] text-xs font-mono font-medium border border-[#e6dbcd]">
                    ${v}
                  </span>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Subsecciones Conceptuales -->
          ${item.sections && item.sections.length ? `
            <div class="space-y-4 mb-6 pt-4 border-t border-[#e6dbcd]">
              ${item.sections.map(sec => `
                <div>
                  <h4 class="font-bold text-sm text-[#1f1a14] mb-1.5 flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#a94515]"></span> ${sec.heading}
                  </h4>
                  <p class="text-xs text-[#5c5246] leading-relaxed whitespace-pre-line">${sec.body}</p>
                </div>
              `).join('')}
            </div>
          ` : ''}

          <!-- Trampa de Examen -->
          ${item.commonTrap ? `
            <div class="trap-box p-4 mb-6 text-xs text-[#8c1d18]">
              <div class="font-bold flex items-center gap-1.5 mb-1 text-[#be3730] uppercase tracking-wider text-[11px]">
                <i class="fa-solid fa-triangle-exclamation"></i> Trampa típica de examen:
              </div>
              <p class="font-medium leading-relaxed">${item.commonTrap}</p>
            </div>
          ` : ''}

          <!-- Procedimiento Paso a Paso -->
          ${item.stepByStep && item.stepByStep.length ? `
            <div class="mb-6 bg-[#f7f0e5] p-4 rounded-2xl border border-[#e6dbcd]">
              <div class="text-[11px] font-extrabold uppercase tracking-wider text-[#5c5246] mb-3">
                Procedimiento recomendado:
              </div>
              <div class="space-y-2.5">
                ${item.stepByStep.map(s => `
                  <div class="flex items-start gap-2.5 text-xs text-[#383027]">
                    <span class="flex-shrink-0 w-5 h-5 rounded-full bg-[#1f1a14] text-white flex items-center justify-center font-bold text-[10px]">
                      ${s.step}
                    </span>
                    <span class="leading-relaxed font-medium">${s.text}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>

        <!-- Ejemplo Resuelto Paso a Paso -->
        ${item.example ? `
          <details class="group border border-[#d9ccba] rounded-2xl bg-[#fffaf2] overflow-hidden text-xs mt-2">
            <summary class="cursor-pointer font-bold p-3.5 text-[#1f1a14] hover:text-[#a94515] flex items-center justify-between select-none transition">
              <span class="flex items-center gap-2">
                <i class="fa-solid fa-circle-question text-[#a94515]"></i>
                <span>Ver Ejercicio Resuelto Paso a Paso</span>
              </span>
              <i class="fa-solid fa-chevron-down text-[#8c7a65] group-open:rotate-180 transition-transform"></i>
            </summary>
            <div class="p-4 pt-2 border-t border-[#d9ccba] text-[#383027] space-y-3 bg-white">
              <p class="font-bold text-sm text-[#1f1a14] leading-relaxed">${item.example.prompt}</p>
              <div class="p-3 bg-[#f7f0e5] rounded-xl text-xs space-y-1.5 border border-[#e6dbcd] font-mono">
                ${(item.example.steps || []).map(st => `<div>${st}</div>`).join('')}
              </div>
              <div class="p-2.5 bg-[#e7f2ed] border border-[#c6dfd3] rounded-xl font-bold text-[#1a4d3e] text-xs">
                ${item.example.result}
              </div>
            </div>
          </details>
        ` : ''}
      </article>
    `;
  });

  container.innerHTML = html;
}

/* =========================================================================
   SECCIÓN DE PRÁCTICA RÁPIDA (QUIZZES)
   ========================================================================= */
function renderQuizSection() {
  const container = document.getElementById('quiz-section-container');
  if (!container) return;

  const quizzes = (window.STUDY_DATA && window.STUDY_DATA.quizzes) || [];
  if (!quizzes.length) {
    container.innerHTML = `<div class="p-8 text-center text-[#6d6152]">Cargando banco de práctica...</div>`;
    return;
  }

  let html = `
    <div class="bg-white rounded-3xl p-6 sm:p-8 border border-[#d9ccba] shadow-sm">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#e6dbcd] mb-6">
        <div>
          <span class="px-3 py-1 rounded-full bg-[#e7f2ed] text-[#1a4d3e] font-extrabold text-xs uppercase tracking-wider border border-[#c6dfd3]">
            <i class="fa-solid fa-bolt"></i> Práctica de Decisión Rápida
          </span>
          <h2 class="font-display text-3xl font-bold text-[#1f1a14] mt-2">Responde, entiende, continúa.</h2>
          <p class="text-xs sm:text-sm text-[#6d6152] mt-1">Preguntas de respuesta directa con descarte conceptual inmediato.</p>
        </div>
        <div class="p-3 rounded-2xl bg-[#fffaf2] border border-[#d9ccba] text-center self-start sm:self-auto">
          <div class="text-[10px] font-extrabold uppercase tracking-wider text-[#8c7a65]">Aciertos</div>
          <div class="font-display text-2xl font-bold text-[#1f1a14]" id="quiz-score-val">0 / ${quizzes.length}</div>
        </div>
      </div>

      <div class="space-y-8">
  `;

  quizzes.forEach((q, idx) => {
    let subjPill = 'bg-[#e9eef6] text-[#10233f] border-[#cfe3d9]';
    if (q.subject === 'quimica') subjPill = 'bg-[#e7f2ed] text-[#1a4d3e] border-[#c6dfd3]';
    else if (q.subject === 'lenguaje') subjPill = 'bg-[#fff0e7] text-[#a94515] border-[#ecd2bf]';

    html += `
      <div class="p-6 rounded-2xl border border-[#e6dbcd] bg-[#fffaf2]/50" id="quiz-card-${idx}">
        <div class="flex items-center justify-between text-xs font-bold mb-3">
          <span class="px-2.5 py-1 rounded-lg ${subjPill} border uppercase tracking-wider text-[11px]">
            ${q.subject} · ${q.topic}
          </span>
          <span class="text-[#8c7a65]">Pregunta ${idx + 1} de ${quizzes.length}</span>
        </div>

        <h3 class="text-base sm:text-lg font-bold text-[#1f1a14] mb-4 leading-relaxed">${q.prompt}</h3>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
          ${q.options.map((opt, optIdx) => `
            <button onclick="handleQuizAnswer(${idx}, ${optIdx})" id="quiz-opt-${idx}-${optIdx}" class="quiz-opt-btn w-full text-left p-3.5 text-xs sm:text-sm text-[#383027] font-medium flex items-center justify-between">
              <span><strong>${String.fromCharCode(65 + optIdx)}.</strong> ${opt}</span>
              <i class="fa-regular fa-circle text-[#b8a690]"></i>
            </button>
          `).join('')}
        </div>

        <div id="quiz-exp-${idx}" class="mt-4 p-4 rounded-xl bg-white border border-[#d9ccba] text-xs text-[#383027] leading-relaxed hidden">
          <div class="font-bold text-[#1a4d3e] flex items-center gap-1.5 mb-1">
            <i class="fa-solid fa-circle-info"></i> Explicación analítica:
          </div>
          <p>${q.explanation}</p>
        </div>
      </div>
    `;
  });

  html += `</div></div>`;
  container.innerHTML = html;
}

function handleQuizAnswer(qIdx, optIdx) {
  const quizzes = (window.STUDY_DATA && window.STUDY_DATA.quizzes) || [];
  const q = quizzes[qIdx];
  const isCorrect = (optIdx === q.answer);

  quizAnswers[qIdx] = optIdx;

  // Update Buttons
  q.options.forEach((_, i) => {
    const btn = document.getElementById(`quiz-opt-${qIdx}-${i}`);
    if (!btn) return;
    btn.disabled = true;
    if (i === q.answer) {
      btn.className = 'quiz-opt-btn correct w-full text-left p-3.5 text-xs sm:text-sm font-bold flex items-center justify-between';
      btn.querySelector('i').className = 'fa-solid fa-circle-check text-[#31765f]';
    } else if (i === optIdx && !isCorrect) {
      btn.className = 'quiz-opt-btn incorrect w-full text-left p-3.5 text-xs sm:text-sm font-bold flex items-center justify-between';
      btn.querySelector('i').className = 'fa-solid fa-circle-xmark text-[#be3730]';
    } else {
      btn.className = 'quiz-opt-btn w-full text-left p-3.5 text-xs sm:text-sm text-[#8c7a65] font-normal flex items-center justify-between opacity-50';
    }
  });

  // Reveal Explanation
  const expDiv = document.getElementById(`quiz-exp-${qIdx}`);
  if (expDiv) expDiv.classList.remove('hidden');

  // Update Score
  let score = 0;
  Object.keys(quizAnswers).forEach(idx => {
    if (quizAnswers[idx] === quizzes[idx].answer) score++;
  });
  const scoreEl = document.getElementById('quiz-score-val');
  if (scoreEl) scoreEl.textContent = `${score} / ${quizzes.length}`;

  triggerMath();
}

function triggerMath() {
  setTimeout(() => {
    if (window.renderMathInElement) {
      window.renderMathInElement(document.body, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false }
        ],
        throwOnError: false
      });
    }
  }, 60);
}
