/* Controlador de la Plataforma de Estudio EPN Día 2 — study-app.js */

document.addEventListener('DOMContentLoaded', function () {
  initApp();
});

let currentTab = 'fisica';
let quizAnswers = {};
let currentFlashcardIndex = 0;
let filteredFlashcards = [];
let currentFlashcardFilter = 'todas';

function initApp() {
  renderFisicaTab();
  renderQuimicaTab();
  renderLenguajeTab();
  initFlashcards();
  renderCalculadorasTab();
  renderQuizTab();
  
  // Set default tab
  switchTab('fisica');
  
  // Render Math
  triggerMathRender();
}

function switchTab(tabId) {
  currentTab = tabId;
  
  // Update Tab Buttons UI
  document.querySelectorAll('.nav-tab').forEach(btn => {
    if (btn.dataset.tab === tabId) {
      btn.className = 'nav-tab px-3.5 py-1.5 rounded-xl transition flex items-center gap-1.5 bg-white text-slate-900 shadow-sm font-bold border border-slate-200';
    } else {
      btn.className = 'nav-tab px-3.5 py-1.5 rounded-xl transition flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-semibold';
    }
  });

  // Toggle Sections
  document.querySelectorAll('.tab-content').forEach(section => {
    if (section.id === 'tab-' + tabId) {
      section.classList.remove('hidden');
    } else {
      section.classList.add('hidden');
    }
  });

  triggerMathRender();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function triggerMathRender() {
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
  }, 50);
}

/* =========================================================================
   1. MÓDULO FÍSICA
   ========================================================================= */
function renderFisicaTab() {
  const container = document.getElementById('tab-fisica');
  if (!container) return;
  
  const data = (window.STUDY_DATA_SCIENCE && window.STUDY_DATA_SCIENCE.modules && window.STUDY_DATA_SCIENCE.modules.physics) || [];
  if (!data.length) {
    container.innerHTML = `<div class="p-8 text-center text-slate-500">Cargando módulos de Física...</div>`;
    return;
  }

  let html = `
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h2 class="text-2xl sm:text-3xl font-bold font-serif-title text-slate-900 flex items-center gap-3">
          <span class="w-10 h-10 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center text-xl"><i class="fa-solid fa-atom"></i></span>
          Física EPN · Mecánica, Dinámica y Energía
        </h2>
        <p class="text-sm text-slate-600 mt-1">Leyes fundamentales (4.2.1–4.2.3), trampas de examen, deducciones a mano y ejercicios reales resueltos.</p>
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
  `;

  data.forEach((topic, idx) => {
    html += `
      <div class="study-card bg-white rounded-2xl p-6 shadow-sm border border-slate-200 search-target" data-search="${escapeHtml(topic.title + ' ' + topic.summary)}">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-bold px-2.5 py-1 rounded-lg bg-sky-50 text-sky-700 border border-sky-200">Tema ${topic.id || (idx + 1)}</span>
          <span class="text-xs font-semibold text-slate-400">EPN 4.2</span>
        </div>
        <h3 class="text-lg font-bold text-slate-900 mb-2">${topic.title}</h3>
        <p class="text-sm text-slate-700 leading-relaxed mb-4">${topic.summary}</p>
        
        <!-- Fórmulas -->
        ${topic.formulas && topic.formulas.length ? `
          <div class="formula-box mb-4">
            <div class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <i class="fa-solid fa-square-root-variable text-brand-500"></i> Fórmulas Clave
            </div>
            <div class="text-sm font-mono text-slate-800 space-y-1">
              ${topic.formulas.map(f => `<div>${f}</div>`).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Trampas EPN -->
        ${topic.traps && topic.traps.length ? `
          <div class="trap-box p-4 rounded-xl mb-4 text-xs">
            <div class="font-bold text-rose-800 flex items-center gap-1.5 mb-1.5">
              <i class="fa-solid fa-triangle-exclamation text-rose-600"></i> ¡Ojo con estas trampas de examen!
            </div>
            <ul class="list-disc list-inside text-rose-950 space-y-1 font-medium">
              ${topic.traps.map(t => `<li>${t}</li>`).join('')}
            </ul>
          </div>
        ` : ''}

        <!-- Ejemplos Resueltos -->
        ${topic.examples && topic.examples.length ? `
          <details class="group border border-slate-200 rounded-xl bg-slate-50 overflow-hidden text-xs">
            <summary class="cursor-pointer font-bold p-3 text-slate-700 hover:text-brand-600 flex items-center justify-between select-none">
              <span><i class="fa-solid fa-circle-question text-brand-500 mr-1.5"></i> Ver Ejercicios Resueltos Paso a Paso (${topic.examples.length})</span>
              <i class="fa-solid fa-chevron-down text-slate-400 group-open:rotate-180 transition-transform"></i>
            </summary>
            <div class="p-4 pt-2 border-t border-slate-200 text-slate-800 space-y-4 bg-white">
              ${topic.examples.map((ex, exIdx) => `
                <div class="border-b border-slate-100 pb-3 last:border-b-0 last:pb-0">
                  <p class="font-bold text-slate-900 mb-1">Problema ${exIdx + 1}: ${ex.statement || ex.prompt || ''}</p>
                  <div class="p-3 bg-slate-50 rounded-lg text-slate-700 leading-relaxed font-mono whitespace-pre-line text-xs">${ex.solution || ''}</div>
                </div>
              `).join('')}
            </div>
          </details>
        ` : ''}
      </div>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
}

/* =========================================================================
   2. MÓDULO QUÍMICA
   ========================================================================= */
function renderQuimicaTab() {
  const container = document.getElementById('tab-quimica');
  if (!container) return;

  const data = (window.STUDY_DATA_SCIENCE && window.STUDY_DATA_SCIENCE.modules && window.STUDY_DATA_SCIENCE.modules.chemistry) || [];
  if (!data.length) {
    container.innerHTML = `<div class="p-8 text-center text-slate-500">Cargando módulos de Química...</div>`;
    return;
  }

  let html = `
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h2 class="text-2xl sm:text-3xl font-bold font-serif-title text-slate-900 flex items-center gap-3">
          <span class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl"><i class="fa-solid fa-flask-vial"></i></span>
          Química EPN · Estructura, Nomenclatura y Reacciones
        </h2>
        <p class="text-sm text-slate-600 mt-1">Reglas Barreno (314/214), números cuánticos, geometrías RPECV y estequiometría redox.</p>
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
  `;

  data.forEach((topic, idx) => {
    html += `
      <div class="study-card bg-white rounded-2xl p-6 shadow-sm border border-slate-200 search-target" data-search="${escapeHtml(topic.title + ' ' + topic.summary)}">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">Tema ${topic.id || (idx + 1)}</span>
          <span class="text-xs font-semibold text-slate-400">EPN 4.3</span>
        </div>
        <h3 class="text-lg font-bold text-slate-900 mb-2">${topic.title}</h3>
        <p class="text-sm text-slate-700 leading-relaxed mb-4">${topic.summary}</p>
        
        <!-- Fórmulas o Reglas -->
        ${topic.formulas && topic.formulas.length ? `
          <div class="gold-rule-box p-4 rounded-xl mb-4 text-xs">
            <div class="font-bold text-amber-900 flex items-center gap-1.5 mb-1.5">
              <i class="fa-solid fa-key text-amber-600"></i> Reglas Clave y Mnemotecnia
            </div>
            <div class="font-mono text-amber-950 space-y-1">
              ${topic.formulas.map(f => `<div>${f}</div>`).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Trampas EPN -->
        ${topic.traps && topic.traps.length ? `
          <div class="trap-box p-4 rounded-xl mb-4 text-xs">
            <div class="font-bold text-rose-800 flex items-center gap-1.5 mb-1.5">
              <i class="fa-solid fa-triangle-exclamation text-rose-600"></i> Trampas de química a evitar:
            </div>
            <ul class="list-disc list-inside text-rose-950 space-y-1 font-medium">
              ${topic.traps.map(t => `<li>${t}</li>`).join('')}
            </ul>
          </div>
        ` : ''}

        <!-- Ejemplos Resueltos -->
        ${topic.examples && topic.examples.length ? `
          <details class="group border border-slate-200 rounded-xl bg-slate-50 overflow-hidden text-xs">
            <summary class="cursor-pointer font-bold p-3 text-slate-700 hover:text-chem-600 flex items-center justify-between select-none">
              <span><i class="fa-solid fa-circle-question text-chem-500 mr-1.5"></i> Ver Ejercicios Resueltos Paso a Paso (${topic.examples.length})</span>
              <i class="fa-solid fa-chevron-down text-slate-400 group-open:rotate-180 transition-transform"></i>
            </summary>
            <div class="p-4 pt-2 border-t border-slate-200 text-slate-800 space-y-4 bg-white">
              ${topic.examples.map((ex, exIdx) => `
                <div class="border-b border-slate-100 pb-3 last:border-b-0 last:pb-0">
                  <p class="font-bold text-slate-900 mb-1">Problema ${exIdx + 1}: ${ex.statement || ex.prompt || ''}</p>
                  <div class="p-3 bg-slate-50 rounded-lg text-slate-700 leading-relaxed font-mono whitespace-pre-line text-xs">${ex.solution || ''}</div>
                </div>
              `).join('')}
            </div>
          </details>
        ` : ''}
      </div>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
}

/* =========================================================================
   3. MÓDULO LENGUAJE
   ========================================================================= */
function renderLenguajeTab() {
  const container = document.getElementById('tab-lenguaje');
  if (!container) return;

  const hum = window.STUDY_DATA_HUMANITIES ? window.STUDY_DATA_HUMANITIES.lenguajeYComunicacion : null;
  if (!hum) {
    container.innerHTML = `<div class="p-8 text-center text-slate-500">Cargando módulos de Lenguaje...</div>`;
    return;
  }

  let html = `
    <div class="mb-6">
      <h2 class="text-2xl sm:text-3xl font-bold font-serif-title text-slate-900 flex items-center gap-3">
        <span class="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl"><i class="fa-solid fa-book-open-reader"></i></span>
        Lenguaje y Comunicación EPN (4.4.1–4.4.3)
      </h2>
      <p class="text-sm text-slate-600 mt-1">Estrategias de lectura crítica, método de 3 pasos para la tesis, glosario de términos polisémicos y conectores lógicos.</p>
    </div>

    <!-- Sección 1: Método Tesis -->
    <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-6 search-target" data-search="tesis metodo lectura critica">
      <div class="flex items-center gap-2 text-indigo-600 font-bold text-base mb-3">
        <i class="fa-solid fa-bullseye"></i> ${hum.metodoTesis ? hum.metodoTesis.titulo : 'Método para Encontrar la Tesis'}
      </div>
      <p class="text-sm text-slate-700 leading-relaxed mb-4">${hum.metodoTesis ? hum.metodoTesis.explicacion : ''}</p>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        ${(hum.metodoTesis && hum.metodoTesis.pasos ? hum.metodoTesis.pasos : []).map(p => `
          <div class="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100">
            <span class="text-xs font-bold px-2 py-0.5 rounded bg-indigo-600 text-white">Paso ${p.paso}</span>
            <h4 class="font-bold text-sm text-slate-900 mt-2 mb-1">${p.nombre}</h4>
            <p class="text-xs text-slate-600">${p.detalle}</p>
          </div>
        `).join('')}
      </div>

      <div class="trap-box p-4 rounded-xl text-xs font-medium text-rose-950">
        <strong>¡Ojo!</strong> ${hum.metodoTesis ? hum.metodoTesis.trampaComun : ''}
      </div>
    </div>

    <!-- Sección 2: Glosario Polisémico y Conectores -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      
      <!-- Glosario Polisémico -->
      <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm search-target" data-search="glosario palabras examen polisemicas">
        <div class="flex items-center gap-2 text-indigo-600 font-bold text-base mb-3">
          <i class="fa-solid fa-spell-check"></i> ${hum.glosarioPolisemico ? hum.glosarioPolisemico.titulo : 'Glosario de Términos Frecuentes'}
        </div>
        <div class="space-y-3">
          ${(hum.glosarioPolisemico && hum.glosarioPolisemico.palabras ? hum.glosarioPolisemico.palabras : []).map(item => `
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div class="font-bold text-slate-900 text-sm mb-1">${item.palabra}</div>
              <p class="text-slate-600 mb-1"><strong>Significado en examen:</strong> ${item.significadoExamen}</p>
              <p class="text-indigo-600 font-mono text-[11px]"><strong>Ejemplo:</strong> "${item.ejemplo}"</p>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Conectores Discursivos -->
      <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm search-target" data-search="conectores logica causales adversativos">
        <div class="flex items-center gap-2 text-indigo-600 font-bold text-base mb-3">
          <i class="fa-solid fa-diagram-project"></i> ${hum.conectoresDiscursivos ? hum.conectoresDiscursivos.titulo : 'Conectores Lógicos'}
        </div>
        <div class="space-y-3">
          ${(hum.conectoresDiscursivos && hum.conectoresDiscursivos.tipos ? hum.conectoresDiscursivos.tipos : []).map(tipo => `
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div class="font-bold text-indigo-900 text-sm mb-1">${tipo.tipo}</div>
              <p class="text-slate-600 mb-1"><strong>Función:</strong> ${tipo.funcion}</p>
              <div class="flex flex-wrap gap-1 mt-1 mb-1.5">
                ${(tipo.conectores || []).map(c => `<span class="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 font-bold text-[11px]">${c}</span>`).join('')}
              </div>
              <p class="text-slate-500 font-mono text-[11px]">"${tipo.ejemplo}"</p>
            </div>
          `).join('')}
        </div>
      </div>

    </div>

    <!-- Sección 3: Inferencias vs Falacias -->
    <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm search-target" data-search="inferencias falacias lectura critica">
      <div class="flex items-center gap-2 text-indigo-600 font-bold text-base mb-3">
        <i class="fa-solid fa-scale-balanced"></i> ${hum.inferenciasLogicas ? hum.inferenciasLogicas.titulo : 'Inferencias Válidas vs Falacias'}
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950">
          <div class="font-bold text-emerald-800 text-sm mb-1.5 flex items-center gap-1.5">
            <i class="fa-solid fa-check"></i> Inferencia Válida
          </div>
          <p class="leading-relaxed">${hum.inferenciasLogicas ? hum.inferenciasLogicas.inferenciaValida : ''}</p>
        </div>
        <div class="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-950">
          <div class="font-bold text-rose-800 text-sm mb-1.5 flex items-center gap-1.5">
            <i class="fa-solid fa-xmark"></i> Extrapolación / Falacia
          </div>
          <p class="leading-relaxed">${hum.inferenciasLogicas ? hum.inferenciasLogicas.extrapolacionFalsa : ''}</p>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;
}

/* =========================================================================
   4. FLASHCARDS INTERACTIVAS
   ========================================================================= */
function initFlashcards() {
  const cards = (window.STUDY_DATA_HUMANITIES && window.STUDY_DATA_HUMANITIES.flashcards) || [];
  filteredFlashcards = cards;
  currentFlashcardIndex = 0;
  renderFlashcardsTab();
}

function filterFlashcards(theme) {
  currentFlashcardFilter = theme;
  const cards = (window.STUDY_DATA_HUMANITIES && window.STUDY_DATA_HUMANITIES.flashcards) || [];
  if (theme === 'todas') {
    filteredFlashcards = cards;
  } else {
    filteredFlashcards = cards.filter(c => (c.tema || '').toLowerCase().includes(theme.toLowerCase()));
  }
  currentFlashcardIndex = 0;
  renderFlashcardsTab();
  triggerMathRender();
}

function renderFlashcardsTab() {
  const container = document.getElementById('tab-flashcards');
  if (!container) return;

  if (!filteredFlashcards || !filteredFlashcards.length) {
    container.innerHTML = `<div class="p-8 text-center text-slate-500">No hay flashcards disponibles para esta categoría.</div>`;
    return;
  }

  const current = filteredFlashcards[currentFlashcardIndex];

  container.innerHTML = `
    <div class="max-w-2xl mx-auto text-center">
      <div class="mb-6">
        <h2 class="text-2xl sm:text-3xl font-bold font-serif-title text-slate-900 flex items-center justify-center gap-3">
          <span class="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-xl"><i class="fa-solid fa-layer-group"></i></span>
          Flashcards EPN · Repaso Relámpago (19 Agosto)
        </h2>
        <p class="text-sm text-slate-600 mt-1">Memoriza y repasa los 20 conceptos de alta frecuencia que salieron hoy en la prueba.</p>
      </div>

      <!-- Category Filter Pills -->
      <div class="flex items-center justify-center gap-2 mb-6 text-xs font-bold">
        <button onclick="filterFlashcards('todas')" class="px-3 py-1.5 rounded-xl border transition ${currentFlashcardFilter === 'todas' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'}">Todas (20)</button>
        <button onclick="filterFlashcards('fisica')" class="px-3 py-1.5 rounded-xl border transition ${currentFlashcardFilter === 'fisica' ? 'bg-brand-600 text-white border-brand-600' : 'bg-white text-brand-600 border-slate-200 hover:bg-sky-50'}">Física</button>
        <button onclick="filterFlashcards('quimica')" class="px-3 py-1.5 rounded-xl border transition ${currentFlashcardFilter === 'quimica' ? 'bg-chem-600 text-white border-chem-600' : 'bg-white text-chem-600 border-slate-200 hover:bg-emerald-50'}">Química</button>
        <button onclick="filterFlashcards('lenguaje')" class="px-3 py-1.5 rounded-xl border transition ${currentFlashcardFilter === 'lenguaje' ? 'bg-lang-600 text-white border-lang-600' : 'bg-white text-lang-600 border-slate-200 hover:bg-indigo-50'}">Lenguaje</button>
      </div>

      <!-- Flashcard Item -->
      <div class="perspective-1000 mb-6">
        <div id="active-flashcard" onclick="this.classList.toggle('flipped')" class="flashcard relative w-full min-h-[280px] bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-md cursor-pointer select-none transition-all hover:border-amber-400 flex flex-col justify-between items-center text-center group">
          <div class="w-full flex items-center justify-between text-xs font-bold text-slate-400">
            <span class="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 uppercase tracking-wider">${current.tema || 'EPN'}</span>
            <span>${currentFlashcardIndex + 1} / ${filteredFlashcards.length}</span>
          </div>

          <div class="my-6 w-full">
            <h3 class="text-lg sm:text-xl font-bold text-slate-900 leading-snug">${current.frente || current.question || ''}</h3>
            <p class="mt-4 text-xs text-amber-600 font-semibold flex items-center justify-center gap-1">
              <i class="fa-solid fa-rotate text-amber-500"></i> Clic para ver respuesta y regla de oro
            </p>
          </div>

          <div class="w-full p-4 rounded-2xl bg-amber-50 border border-amber-200 text-left text-xs sm:text-sm text-amber-950 font-medium space-y-1.5">
            <div><strong>Respuesta:</strong> ${current.reverso || current.answer || ''}</div>
            ${current.reglaOro ? `<div class="text-amber-800 font-bold text-xs pt-1 border-t border-amber-200/60"><i class="fa-solid fa-star text-amber-500 mr-1"></i> Regla de oro: ${current.reglaOro}</div>` : ''}
          </div>
        </div>
      </div>

      <!-- Flashcard Controls -->
      <div class="flex items-center justify-center gap-4">
        <button onclick="prevFlashcard()" class="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-100 transition flex items-center gap-2">
          <i class="fa-solid fa-chevron-left"></i> Anterior
        </button>
        <button onclick="nextFlashcard()" class="px-6 py-2.5 rounded-xl bg-amber-500 text-white font-bold text-sm hover:bg-amber-600 transition flex items-center gap-2 shadow-sm">
          Siguiente <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  `;
}

function nextFlashcard() {
  if (!filteredFlashcards.length) return;
  currentFlashcardIndex = (currentFlashcardIndex + 1) % filteredFlashcards.length;
  renderFlashcardsTab();
  triggerMathRender();
}

function prevFlashcard() {
  if (!filteredFlashcards.length) return;
  currentFlashcardIndex = (currentFlashcardIndex - 1 + filteredFlashcards.length) % filteredFlashcards.length;
  renderFlashcardsTab();
  triggerMathRender();
}

/* =========================================================================
   5. LABORATORIO DE CALCULADORAS INTERACTIVAS
   ========================================================================= */
function renderCalculadorasTab() {
  const container = document.getElementById('tab-calculadoras');
  if (!container) return;

  container.innerHTML = `
    <div class="mb-6">
      <h2 class="text-2xl sm:text-3xl font-bold font-serif-title text-slate-900 flex items-center gap-3">
        <span class="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl"><i class="fa-solid fa-calculator"></i></span>
        Laboratorio de Cálculos y Fórmulas en Vivo
      </h2>
      <p class="text-sm text-slate-600 mt-1">Calcula en segundos variables físicas y relaciones molares para comprobar tus ejercicios.</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Calc 1: Caída Libre -->
      <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div class="flex items-center gap-2 text-brand-600 font-bold text-base mb-3">
          <i class="fa-solid fa-arrow-down-long"></i> Caída Libre y Salto
        </div>
        <p class="text-xs text-slate-600 mb-4">Calcula altura máxima o tiempo de vuelo con $g = 9.8\\text{ m/s}^2$.</p>
        <div class="space-y-3 text-xs">
          <div>
            <label class="font-bold text-slate-700 block mb-1">Velocidad inicial $v_0$ (m/s):</label>
            <input type="number" id="calc-v0" value="14" class="w-full p-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:ring-2 focus:ring-brand-500 focus:outline-none">
          </div>
          <button onclick="calcFreeFall()" class="w-full py-2.5 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 transition">Calcular Altura y Tiempo</button>
          <div id="res-freefall" class="p-3 bg-sky-50 rounded-xl border border-sky-200 text-slate-800 font-mono text-xs hidden"></div>
        </div>
      </div>

      <!-- Calc 2: Ley de Hooke -->
      <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div class="flex items-center gap-2 text-emerald-600 font-bold text-base mb-3">
          <i class="fa-solid fa-arrows-left-right"></i> Ley de Hooke y Energía
        </div>
        <p class="text-xs text-slate-600 mb-4">Calcula fuerza elástica $F = kx$ y energía elástica $E_{pe} = \\frac{1}{2}kx^2$.</p>
        <div class="space-y-3 text-xs">
          <div>
            <label class="font-bold text-slate-700 block mb-1">Constante $k$ (N/m):</label>
            <input type="number" id="calc-k" value="200" class="w-full p-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none">
          </div>
          <div>
            <label class="font-bold text-slate-700 block mb-1">Deformación $x$ (m):</label>
            <input type="number" id="calc-x" value="0.30" step="0.05" class="w-full p-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none">
          </div>
          <button onclick="calcHooke()" class="w-full py-2.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition">Calcular $F$ y $E_{pe}$</button>
          <div id="res-hooke" class="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-slate-800 font-mono text-xs hidden"></div>
        </div>
      </div>

      <!-- Calc 3: Masa a Moles -->
      <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div class="flex items-center gap-2 text-indigo-600 font-bold text-base mb-3">
          <i class="fa-solid fa-scale-balanced"></i> Conversor Masa $\\leftrightarrow$ Mol
        </div>
        <p class="text-xs text-slate-600 mb-4">Calcula moles $n = m / M$ para verificar reactivos limitantes.</p>
        <div class="space-y-3 text-xs">
          <div>
            <label class="font-bold text-slate-700 block mb-1">Masa dada $m$ (g):</label>
            <input type="number" id="calc-m" value="24" class="w-full p-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none">
          </div>
          <div>
            <label class="font-bold text-slate-700 block mb-1">Masa molar $M$ (g/mol):</label>
            <input type="number" id="calc-M" value="24" class="w-full p-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none">
          </div>
          <button onclick="calcMoles()" class="w-full py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition">Calcular Moles</button>
          <div id="res-moles" class="p-3 bg-indigo-50 rounded-xl border border-indigo-200 text-slate-800 font-mono text-xs hidden"></div>
        </div>
      </div>
    </div>
  `;
}

function calcFreeFall() {
  const v0 = parseFloat(document.getElementById('calc-v0').value) || 0;
  const g = 9.8;
  const hMax = (v0 * v0) / (2 * g);
  const tSubida = v0 / g;
  const tTotal = 2 * tSubida;

  const res = document.getElementById('res-freefall');
  res.classList.remove('hidden');
  res.innerHTML = `
    <strong>Resultados:</strong><br>
    - Altura máx $h = ${hMax.toFixed(2)}\\text{ m}$<br>
    - Tiempo de subida $t_s = ${tSubida.toFixed(2)}\\text{ s}$<br>
    - Tiempo total en aire $t_v = ${tTotal.toFixed(2)}\\text{ s}$
  `;
  triggerMathRender();
}

function calcHooke() {
  const k = parseFloat(document.getElementById('calc-k').value) || 0;
  const x = parseFloat(document.getElementById('calc-x').value) || 0;
  const F = k * x;
  const Epe = 0.5 * k * x * x;

  const res = document.getElementById('res-hooke');
  res.classList.remove('hidden');
  res.innerHTML = `
    <strong>Resultados:</strong><br>
    - Fuerza elástica $F = ${F.toFixed(2)}\\text{ N}$<br>
    - Energía potencial $E_{pe} = ${Epe.toFixed(2)}\\text{ J}$
  `;
  triggerMathRender();
}

function calcMoles() {
  const m = parseFloat(document.getElementById('calc-m').value) || 0;
  const M = parseFloat(document.getElementById('calc-M').value) || 1;
  const n = m / M;

  const res = document.getElementById('res-moles');
  res.classList.remove('hidden');
  res.innerHTML = `
    <strong>Resultado:</strong><br>
    - Cantidad de sustancia $n = ${n.toFixed(3)}\\text{ mol}$
  `;
  triggerMathRender();
}

/* =========================================================================
   6. QUIZ DIAGNÓSTICO DE 15 PREGUNTAS
   ========================================================================= */
function renderQuizTab() {
  const container = document.getElementById('tab-quiz');
  if (!container) return;

  const questions = (window.STUDY_DATA_HUMANITIES && window.STUDY_DATA_HUMANITIES.quizDiagnostico) || [];
  if (!questions || !questions.length) {
    container.innerHTML = `<div class="p-8 text-center text-slate-500">Cargando Quiz Diagnóstico...</div>`;
    return;
  }

  let html = `
    <div class="max-w-4xl mx-auto">
      <div class="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 class="text-2xl sm:text-3xl font-bold font-serif-title text-slate-900 flex items-center gap-3">
            <span class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl"><i class="fa-solid fa-circle-check"></i></span>
            Quiz de Diagnóstico EPN (15 Preguntas Clave)
          </h2>
          <p class="text-sm text-slate-600 mt-1">5 de Lengua, 5 de Física y 5 de Química con retroalimentación paso a paso inmediata.</p>
        </div>
        <div id="quiz-score-badge" class="px-4 py-2 bg-slate-100 border border-slate-200 rounded-xl font-bold text-sm text-slate-800 self-start sm:self-auto">
          Puntaje: <span id="quiz-score-text">0 / ${questions.length}</span>
        </div>
      </div>

      <div class="space-y-6">
  `;

  questions.forEach((q, qIdx) => {
    const subjTag = qIdx < 5 ? 'Lenguaje' : (qIdx < 10 ? 'Física' : 'Química');
    html += `
      <div class="study-card bg-white rounded-2xl p-6 border border-slate-200 shadow-sm" id="quiz-q-${qIdx}">
        <div class="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
          <span class="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">${subjTag} · Pregunta ${qIdx + 1}</span>
          <span class="text-emerald-600 font-semibold" id="quiz-status-${qIdx}"></span>
        </div>
        
        <h3 class="text-base font-bold text-slate-900 mb-4 leading-relaxed">${q.pregunta || q.prompt || ''}</h3>

        <div class="space-y-2">
          ${(q.opciones || q.opts || []).map((opt, optIdx) => `
            <button onclick="selectQuizOption(${qIdx}, ${optIdx})" id="quiz-opt-${qIdx}-${optIdx}" class="quiz-btn w-full text-left p-3.5 rounded-xl border border-slate-200 text-sm font-medium hover:border-brand-500 hover:bg-sky-50/50 transition flex items-center justify-between">
              <span><strong>${String.fromCharCode(65 + optIdx)}.</strong> ${opt}</span>
              <i class="fa-regular fa-circle text-slate-300"></i>
            </button>
          `).join('')}
        </div>

        <div id="quiz-exp-${qIdx}" class="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed font-mono hidden">
          <strong>Explicación:</strong><br>${q.explicacion || q.exp || ''}
        </div>
      </div>
    `;
  });

  html += `</div></div>`;
  container.innerHTML = html;
}

function selectQuizOption(qIdx, optIdx) {
  const questions = window.STUDY_DATA_HUMANITIES.quizDiagnostico;
  const q = questions[qIdx];
  const correctAns = (q.correcta !== undefined ? q.correcta : q.ans);
  const isCorrect = (optIdx === correctAns);

  quizAnswers[qIdx] = optIdx;

  // Update Buttons
  (q.opciones || q.opts || []).forEach((_, i) => {
    const btn = document.getElementById(`quiz-opt-${qIdx}-${i}`);
    if (!btn) return;
    btn.disabled = true;
    if (i === correctAns) {
      btn.className = 'quiz-btn w-full text-left p-3.5 rounded-xl border-2 border-emerald-500 bg-emerald-50 text-emerald-950 font-bold flex items-center justify-between';
      btn.querySelector('i').className = 'fa-solid fa-circle-check text-emerald-600';
    } else if (i === optIdx && !isCorrect) {
      btn.className = 'quiz-btn w-full text-left p-3.5 rounded-xl border-2 border-rose-500 bg-rose-50 text-rose-950 font-bold flex items-center justify-between';
      btn.querySelector('i').className = 'fa-solid fa-circle-xmark text-rose-600';
    } else {
      btn.className = 'quiz-btn w-full text-left p-3.5 rounded-xl border border-slate-200 text-slate-400 font-normal flex items-center justify-between opacity-50';
    }
  });

  // Reveal Explanation
  const expDiv = document.getElementById(`quiz-exp-${qIdx}`);
  if (expDiv) expDiv.classList.remove('hidden');

  // Update Score
  let score = 0;
  Object.keys(quizAnswers).forEach(idx => {
    const expected = (questions[idx].correcta !== undefined ? questions[idx].correcta : questions[idx].ans);
    if (quizAnswers[idx] === expected) score++;
  });
  document.getElementById('quiz-score-text').textContent = `${score} / ${questions.length}`;

  triggerMathRender();
}

/* =========================================================================
   7. BÚSQUEDA GLOBAL
   ========================================================================= */
function handleSearch(query) {
  const q = (query || '').toLowerCase().trim();
  const targets = document.querySelectorAll('.search-target');
  
  targets.forEach(target => {
    const text = (target.dataset.search || '').toLowerCase();
    if (!q || text.includes(q)) {
      target.classList.remove('hidden');
    } else {
      target.classList.add('hidden');
    }
  });
}

function escapeHtml(str) {
  return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
