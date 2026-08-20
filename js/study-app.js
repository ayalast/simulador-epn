/* Controlador de la Plataforma de Estudio EPN Día 2 — Exact Manus Replica */

let currentPart = 'parte2'; // default to Parte II · 19 Ago
let currentSubject = 'todo';
let activeTopicId = null;
let reviewedTopics = {};
let practiceAnswers = {};
let isPracticeMode = false;

document.addEventListener('DOMContentLoaded', function () {
  loadReviewedState();
  initApp();
});

function loadReviewedState() {
  try {
    const raw = localStorage.getItem('epn_study_reviewed_topics');
    if (raw) reviewedTopics = JSON.parse(raw);
  } catch (e) {
    reviewedTopics = {};
  }
}

function saveReviewedState() {
  try {
    localStorage.setItem('epn_study_reviewed_topics', JSON.stringify(reviewedTopics));
  } catch (e) {}
}

function initApp() {
  // Update subject counts in sidebar
  updateSubjectCounts();

  // Set default active topic
  const topics = getFilteredTopics();
  if (topics.length > 0) {
    activeTopicId = topics[0].id;
  }

  renderSidebarTopics();
  renderCurrentTopic();
  updateProgressUI();
  triggerMath();
}

function getFilteredTopics() {
  const data = (window.STUDY_DATA && window.STUDY_DATA[currentPart]) || [];
  if (currentSubject === 'todo') return data;
  return data.filter(t => t.subject === currentSubject);
}

function updateSubjectCounts() {
  const data = (window.STUDY_DATA && window.STUDY_DATA[currentPart]) || [];
  const cFis = data.filter(t => t.subject === 'fisica').length;
  const cQui = data.filter(t => t.subject === 'quimica').length;
  const cLen = data.filter(t => t.subject === 'lenguaje').length;

  const bFis = document.getElementById('badge-count-fisica');
  const bQui = document.getElementById('badge-count-quimica');
  const bLen = document.getElementById('badge-count-lenguaje');

  if (bFis) bFis.textContent = cFis;
  if (bQui) bQui.textContent = cQui;
  if (bLen) bLen.textContent = cLen;
}

function switchPart(part) {
  currentPart = part;

  // Toggle Part Buttons UI
  const btn1 = document.getElementById('btn-part1');
  const btn2 = document.getElementById('btn-part2');

  if (part === 'parte1') {
    if (btn1) btn1.className = 'part-btn rounded-lg px-2 py-2 text-[10px] font-extrabold uppercase tracking-[0.1em] bg-[#10233f] text-white shadow-sm transition';
    if (btn2) btn2.className = 'part-btn rounded-lg px-2 py-2 text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#687482] transition';
  } else {
    if (btn1) btn1.className = 'part-btn rounded-lg px-2 py-2 text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#687482] transition';
    if (btn2) btn2.className = 'part-btn rounded-lg px-2 py-2 text-[10px] font-extrabold uppercase tracking-[0.1em] bg-[#e86b2e] text-white shadow-sm transition';
  }

  updateSubjectCounts();
  const topics = getFilteredTopics();
  if (topics.length > 0) {
    activeTopicId = topics[0].id;
  }

  if (isPracticeMode) togglePracticeMode(false);
  renderSidebarTopics();
  renderCurrentTopic();
  updateProgressUI();
  triggerMath();
}

function setSubject(subj) {
  currentSubject = subj;

  // Update subject buttons
  const buttons = ['todo', 'fisica', 'quimica', 'lenguaje'];
  buttons.forEach(s => {
    const btn = document.getElementById('subj-btn-' + s);
    if (!btn) return;
    if (s === subj) {
      btn.className = 'subj-btn flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-bold bg-[#10233f] text-white shadow-[0_8px_17px_rgba(16,35,63,0.15)] transition';
    } else {
      btn.className = 'subj-btn flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-bold text-[#526170] hover:bg-[#eee4d4] transition';
    }
  });

  const topics = getFilteredTopics();
  if (topics.length > 0 && !topics.some(t => t.id === activeTopicId)) {
    activeTopicId = topics[0].id;
  }

  if (isPracticeMode) togglePracticeMode(false);
  renderSidebarTopics();
  renderCurrentTopic();
  triggerMath();
}

function selectTopic(topicId) {
  activeTopicId = topicId;
  if (isPracticeMode) togglePracticeMode(false);
  renderSidebarTopics();
  renderCurrentTopic();
  triggerMath();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderSidebarTopics() {
  const container = document.getElementById('sidebar-topics-list');
  if (!container) return;

  const topics = getFilteredTopics();
  let html = '';

  topics.forEach(t => {
    const isActive = (t.id === activeTopicId);
    const isDone = !!reviewedTopics[t.id];

    let activeClasses = isActive 
      ? 'bg-[#fff0e7] border-l-4 border-l-[#e86b2e] shadow-sm' 
      : 'hover:bg-[#eee4d4]/60';

    html += `
      <button onclick="selectTopic('${t.id}')" class="relative flex w-full items-start gap-3 rounded-xl p-2.5 text-left transition ${activeClasses}">
        <span class="mt-1 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border ${isDone ? 'border-[#31765f] bg-[#e7f2ed] text-[#31765f]' : 'border-[#b8a690] bg-white text-transparent'} text-[9px] font-bold">
          ${isDone ? '<i class="fa-solid fa-check"></i>' : ''}
        </span>
        <div class="min-w-0 flex-1">
          <div class="text-[10px] font-extrabold uppercase tracking-wider text-[#a94515] leading-tight">
            ${t.eyebrow}
          </div>
          <div class="text-xs font-bold text-[#1f1a14] truncate mt-0.5">
            ${t.title}
          </div>
        </div>
      </button>
    `;
  });

  container.innerHTML = html;
}

function renderCurrentTopic() {
  const allTopics = (window.STUDY_DATA && window.STUDY_DATA[currentPart]) || [];
  const topic = allTopics.find(t => t.id === activeTopicId) || allTopics[0];

  if (!topic) return;

  // Update Hero Card
  const heroPart = document.getElementById('hero-part-badge');
  const heroPriority = document.getElementById('hero-priority-badge');
  const heroEyebrow = document.getElementById('hero-eyebrow');
  const heroTitle = document.getElementById('hero-title');
  const heroLead = document.getElementById('hero-lead');

  if (heroPart) heroPart.textContent = currentPart === 'parte2' ? 'PARTE II · EXAMEN REPORTADO 19 AGO' : 'PARTE I · FUNDAMENTOS';
  if (heroPriority) heroPriority.textContent = (topic.priority || 'Esencial').toUpperCase();
  if (heroEyebrow) heroEyebrow.textContent = `${(topic.subject || 'Física').toUpperCase()} · ${topic.eyebrow}`;
  if (heroTitle) heroTitle.innerHTML = topic.title;
  if (heroLead) heroLead.innerHTML = topic.lead;

  // Update Details Card Body
  const container = document.getElementById('topic-detail-card');
  if (!container) return;

  const isDone = !!reviewedTopics[topic.id];

  let subjPill = 'bg-[#e9eef6] text-[#10233f] border-[#cfe3d9]';
  let subjIcon = 'fa-atom text-[#0284c7]';
  let subjName = 'Física';

  if (topic.subject === 'quimica') {
    subjPill = 'bg-[#e7f2ed] text-[#1a4d3e] border-[#c6dfd3]';
    subjIcon = 'fa-flask text-[#059669]';
    subjName = 'Química';
  } else if (topic.subject === 'lenguaje') {
    subjPill = 'bg-[#fff0e7] text-[#a94515] border-[#ecd2bf]';
    subjIcon = 'fa-book-open-reader text-[#e86b2e]';
    subjName = 'Lenguaje';
  }

  let html = `
    <!-- Top Action Bar -->
    <div class="flex items-center justify-between pb-4 border-b border-[#e6dbcd]">
      <span class="px-3 py-1 rounded-xl ${subjPill} border font-bold text-xs flex items-center gap-1.5">
        <i class="fa-solid ${subjIcon}"></i> ${subjName}
      </span>
      <button onclick="toggleTopicCompleted('${topic.id}')" class="inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-extrabold transition ${isDone ? 'border-[#31765f] bg-[#e7f2ed] text-[#1a4d3e]' : 'border-[#d9ccba] bg-white text-[#5c6a77] hover:border-[#31765f] hover:text-[#1f6853]'}">
        <i class="fa-solid fa-check ${isDone ? 'text-[#31765f]' : 'text-slate-300'}"></i>
        <span>${isDone ? 'Repasado' : 'Marcar como repasado'}</span>
      </button>
    </div>

    <!-- RECONOCE ANTES DE CALCULAR / REGLA DE ORO -->
    ${topic.quickRule ? `
      <div class="p-5 rounded-2xl bg-[#fff0e7]/70 border border-[#ecd2bf] text-[#8c350d]">
        <div class="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#e86b2e] mb-1.5 flex items-center gap-1.5">
          <i class="fa-solid fa-bolt"></i> Reconoce antes de calcular
        </div>
        <div class="font-display text-lg sm:text-xl font-bold leading-snug text-[#6e2908]">
          ${topic.quickRule}
        </div>
      </div>
    ` : ''}

    <!-- FORMULA EN CAJA OSCURA (HERRAMIENTA MATEMATICA) -->
    ${topic.formula ? `
      <div class="formula-dark-box p-5 text-center">
        <div class="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#7dd3fc] mb-2">Traza · Sustituye · Verifica</div>
        <div class="text-base sm:text-lg font-mono overflow-x-auto py-1">
          $$${topic.formula}$$
        </div>
      </div>
    ` : ''}

    <!-- SUBSECCIONES CONCEPTUALES -->
    ${topic.sections && topic.sections.length ? `
      <div class="space-y-6 pt-2">
        ${topic.sections.map(sec => `
          <div>
            <h3 class="font-display text-2xl font-bold text-[#1f1a14] mb-2">${sec.heading}</h3>
            <p class="text-xs sm:text-sm text-[#51606e] leading-relaxed whitespace-pre-line">${sec.body}</p>
          </div>
        `).join('')}
      </div>
    ` : ''}

    <!-- EJEMPLO RESUELTO PASO A PASO -->
    ${topic.example ? `
      <div class="rounded-2xl border border-[#c6dfd3] bg-[#f5fbf7] p-6 space-y-4">
        <div class="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#1f6853]">
          <i class="fa-regular fa-compass text-emerald-600"></i> Ejemplo resuelto, paso a paso
        </div>
        <h4 class="font-display text-xl sm:text-2xl font-bold text-[#1f1a14] leading-snug">
          ${topic.example.prompt}
        </h4>
        
        <div class="space-y-2.5 pt-2">
          ${(topic.example.steps || []).map((st, i) => `
            <div class="flex items-start gap-3 text-xs sm:text-sm text-[#383027]">
              <span class="flex-shrink-0 w-5 h-5 rounded-full bg-[#31765f] text-white flex items-center justify-center font-bold text-[10px]">
                ${i + 1}
              </span>
              <span class="leading-relaxed">${st.replace(/^\d+\.\s*/, '')}</span>
            </div>
          `).join('')}
        </div>

        <div class="p-3.5 rounded-xl bg-[#276749] text-white font-bold text-xs sm:text-sm">
          ${topic.example.result}
        </div>
      </div>
    ` : ''}

    <!-- NOTA DE EXAMEN / TRAMPA -->
    ${topic.commonTrap ? `
      <div class="p-5 rounded-2xl border border-[#f0cfcb] bg-[#fff5f5] text-xs">
        <div class="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#be3730] mb-1.5">
          <i class="fa-solid fa-star text-[#be3730]"></i> Nota de examen / Alerta
        </div>
        <p class="text-xs sm:text-sm text-[#7a1b16] font-medium leading-relaxed">${topic.commonTrap}</p>
      </div>
    ` : ''}

    <!-- BOTTOM ACTION BUTTONS -->
    <div class="flex flex-wrap items-center gap-3 pt-6 border-t border-[#e6dbcd]">
      <button onclick="startPracticeForTopic('${topic.id}')" class="inline-flex items-center gap-2 rounded-xl bg-[#e86b2e] px-5 py-3 text-sm font-extrabold text-white shadow-[0_8px_16px_rgba(232,107,46,0.2)] hover:-translate-y-0.5 transition">
        <i class="fa-solid fa-bolt"></i> Practicar este tema
      </button>
      <button onclick="toggleTopicCompleted('${topic.id}')" class="inline-flex items-center gap-2 rounded-xl border border-[#d9ccba] bg-white px-5 py-3 text-sm font-bold text-[#51606e] hover:border-[#10233f] hover:text-[#10233f] transition">
        ${isDone ? '✓ Ya repasado' : 'Ya lo repasé'}
      </button>
    </div>
  `;

  container.innerHTML = html;

  // Update Right Sidebar Variables
  renderSidebarVariables(topic);
  triggerMath();
}

function renderSidebarVariables(topic) {
  const container = document.getElementById('sidebar-variables-container');
  if (!container) return;

  const vars = topic.variables || [];
  if (!vars.length) {
    container.innerHTML = `<div class="text-slate-400 text-xs">Sin variables específicas</div>`;
    return;
  }

  let html = '';
  vars.forEach(v => {
    html += `
      <div class="p-2.5 rounded-xl bg-[#f7f0e5] border border-[#e6dbcd] text-[#383027] text-xs font-semibold">
        ${v}
      </div>
    `;
  });
  container.innerHTML = html;
}

function toggleTopicCompleted(topicId) {
  if (reviewedTopics[topicId]) {
    delete reviewedTopics[topicId];
  } else {
    reviewedTopics[topicId] = true;
  }
  saveReviewedState();
  renderSidebarTopics();
  renderCurrentTopic();
  updateProgressUI();
}

function updateProgressUI() {
  const data = (window.STUDY_DATA && window.STUDY_DATA[currentPart]) || [];
  const total = data.length || 1;
  const completed = data.filter(t => !!reviewedTopics[t.id]).length;
  const percent = Math.round((completed / total) * 100);

  const percentEl = document.getElementById('progress-percent');
  const countEl = document.getElementById('progress-count');
  const barEl = document.getElementById('progress-bar-fill');

  if (percentEl) percentEl.textContent = `${percent}%`;
  if (countEl) countEl.textContent = `${completed} / ${total} temas`;
  if (barEl) barEl.style.width = `${percent}%`;
}

/* =========================================================================
   PRACTICE & QUIZ MODE
   ========================================================================= */
function togglePracticeMode(showPractice, specificTopicId) {
  isPracticeMode = showPractice;
  const theoryView = document.getElementById('theory-view');
  const practiceView = document.getElementById('practice-view');

  if (showPractice) {
    if (theoryView) theoryView.classList.add('hidden');
    if (practiceView) practiceView.classList.remove('hidden');
    renderPracticeQuiz(specificTopicId);
  } else {
    if (theoryView) theoryView.classList.remove('hidden');
    if (practiceView) practiceView.classList.add('hidden');
  }

  triggerMath();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startPracticeForTopic(topicId) {
  togglePracticeMode(true, topicId);
}

function renderPracticeQuiz(specificTopicId) {
  const container = document.getElementById('practice-card-container');
  if (!container) return;

  const allQuizzes = (window.STUDY_DATA && window.STUDY_DATA.quizzes) || [];
  let quizzes = allQuizzes;

  if (specificTopicId) {
    quizzes = allQuizzes.filter(q => q.topicId === specificTopicId);
    if (!quizzes.length) quizzes = allQuizzes;
  }

  // Update Score
  let score = 0;
  quizzes.forEach(q => {
    if (practiceAnswers[q.id] === q.answer) score++;
  });
  const scoreVal = document.getElementById('practice-score-val');
  if (scoreVal) scoreVal.textContent = `${score} / ${quizzes.length}`;

  let html = '';
  quizzes.forEach((q, idx) => {
    let subjPill = 'bg-[#e9eef6] text-[#10233f] border-[#cfe3d9]';
    if (q.subject === 'quimica') subjPill = 'bg-[#e7f2ed] text-[#1a4d3e] border-[#c6dfd3]';
    else if (q.subject === 'lenguaje') subjPill = 'bg-[#fff0e7] text-[#a94515] border-[#ecd2bf]';

    html += `
      <div class="p-6 rounded-2xl border border-[#e6dbcd] bg-[#fffaf2]/60 space-y-4" id="quiz-block-${q.id}">
        <div class="flex items-center justify-between text-xs font-bold">
          <span class="px-2.5 py-1 rounded-lg ${subjPill} border text-[10px] font-extrabold uppercase tracking-wider">
            ${q.subject} · ${q.topic}
          </span>
          <span class="text-[#718090]">Pregunta ${idx + 1} de ${quizzes.length}</span>
        </div>

        <h3 class="font-display text-xl sm:text-2xl font-bold text-[#1f1a14] leading-snug">
          ${q.prompt}
        </h3>

        <div class="space-y-2.5">
          ${q.options.map((opt, optIdx) => `
            <button onclick="selectPracticeAnswer('${q.id}', ${optIdx}, ${q.answer})" id="btn-opt-${q.id}-${optIdx}" class="quiz-opt-btn w-full text-left p-4 rounded-xl text-xs sm:text-sm text-[#383027] font-medium flex items-center justify-between">
              <span><strong>${String.fromCharCode(65 + optIdx)}.</strong> ${opt}</span>
              <i class="fa-regular fa-circle text-[#b8a690]"></i>
            </button>
          `).join('')}
        </div>

        <div id="quiz-exp-${q.id}" class="mt-4 p-4 rounded-xl bg-white border border-[#d9ccba] text-xs text-[#383027] leading-relaxed hidden">
          <div class="font-bold text-[#1a4d3e] flex items-center gap-1.5 mb-1">
            <i class="fa-solid fa-circle-info"></i> Explicación analítica:
          </div>
          <p>${q.explanation}</p>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function selectPracticeAnswer(qId, optIdx, correctAns) {
  practiceAnswers[qId] = optIdx;
  const isCorrect = (optIdx === correctAns);

  const block = document.getElementById(`quiz-block-${qId}`);
  if (!block) return;

  const buttons = block.querySelectorAll('.quiz-opt-btn');
  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === correctAns) {
      btn.className = 'quiz-opt-btn correct w-full text-left p-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between';
      btn.querySelector('i').className = 'fa-solid fa-circle-check text-[#31765f]';
    } else if (i === optIdx && !isCorrect) {
      btn.className = 'quiz-opt-btn incorrect w-full text-left p-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between';
      btn.querySelector('i').className = 'fa-solid fa-circle-xmark text-[#be3730]';
    } else {
      btn.className = 'quiz-opt-btn w-full text-left p-4 rounded-xl text-xs sm:text-sm text-[#8c7a65] font-normal flex items-center justify-between opacity-50';
    }
  });

  const exp = document.getElementById(`quiz-exp-${qId}`);
  if (exp) exp.classList.remove('hidden');

  // Update Score
  const allQuizzes = (window.STUDY_DATA && window.STUDY_DATA.quizzes) || [];
  let score = 0;
  allQuizzes.forEach(q => {
    if (practiceAnswers[q.id] === q.answer) score++;
  });
  const scoreVal = document.getElementById('practice-score-val');
  if (scoreVal) scoreVal.textContent = `${score} / ${allQuizzes.length}`;

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
