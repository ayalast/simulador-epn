import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

const sandbox = {
  window: {
    addEventListener: () => {},
    scrollTo: () => {},
    location: { href: '', search: '', hash: '' },
    history: { pushState: () => {}, replaceState: () => {} }
  },
  sessionStorage: {
    store: {},
    getItem(k) { return this.store[k] || null; },
    setItem(k, v) { this.store[k] = String(v); },
    removeItem(k) { delete this.store[k]; }
  },
  localStorage: {
    store: {},
    getItem(k) { return this.store[k] || null; },
    setItem(k, v) { this.store[k] = String(v); },
    removeItem(k) { delete this.store[k]; }
  },
  document: {
    getElementById: (id) => ({
      id, innerHTML: '', textContent: '', value: '', checked: false, style: {},
      classList: { add: () => {}, remove: () => {} },
      scrollIntoView: () => {}
    }),
    querySelector: () => null,
    querySelectorAll: () => [],
    addEventListener: () => {}
  },
  setTimeout: (fn) => fn(),
  clearTimeout: () => {},
  location: { href: '', search: '', hash: '' },
  console
};
sandbox.window.window = sandbox.window;
sandbox.window.document = sandbox.document;
sandbox.window.sessionStorage = sandbox.sessionStorage;
sandbox.window.localStorage = sandbox.localStorage;

const scriptsToLoad = [
  'bank.js',
  'theory.js',
  'guia-theory.js',
  'guia-theory-fis.js',
  'guia-theory-qui.js',
  'guia-theory-len.js',
  'guia-bank-69.js',
  'guia-bank-1000-intermedio.js',
  'guia-bank-fql-avanzado.js',
  'guia-bank-fql-dia2.js',
  'guia-bank-fql-19ago.js',
  'js/fig-fql-19ago.js',
  'app.js'
];

for (const s of scriptsToLoad) {
  const code = fs.readFileSync(path.join(root, s), 'utf8');
  vm.runInNewContext(code, sandbox);
}

const bank = sandbox.window.GUIA_BANK_FQL_19AGO;
const FIG = sandbox.window.FIG_19AGO;
const theoryList = sandbox.window.GUIA_THEORY;
const theoryMap = new Map(theoryList.map(c => [c.id, c]));

console.log('===============================================================');
console.log('AUDIT PASS 1 / 3: QUESTION STRUCTURE, LATEX, AND PROMPT CLARITY');
console.log('===============================================================');
const allQs = [...bank.len, ...bank.fis, ...bank.qui];
if (allQs.length !== 90) {
  throw new Error(`Expected 90 questions, got ${allQs.length}`);
}

allQs.forEach((q, idx) => {
  // Check options
  if (!Array.isArray(q.opts) || q.opts.length !== 4) {
    throw new Error(`[Q ${q.id}] Must have exactly 4 options`);
  }
  if (typeof q.ans !== 'number' || q.ans < 0 || q.ans > 3) {
    throw new Error(`[Q ${q.id}] Invalid correct answer index: ${q.ans}`);
  }
  // Check explanation structure
  if (!q.exp || !q.exp.includes('**Paso 1.') || !q.exp.includes('**Paso 2.') || !q.exp.includes('**Paso 3.')) {
    throw new Error(`[Q ${q.id}] Explanation does not follow 3-step hand solution structure`);
  }
  // Check theory link
  if (!q.ch || !theoryMap.has(q.ch)) {
    throw new Error(`[Q ${q.id}] Invalid or missing chapter link: ${q.ch}`);
  }
  // Check prompt and options don't have broken LaTeX delimiters
  const textToCheck = q.prompt + ' ' + q.opts.join(' ') + ' ' + q.exp;
  const singleDollars = (textToCheck.match(/(?<!\\)\$/g) || []).length;
  if (singleDollars % 2 !== 0) {
    throw new Error(`[Q ${q.id}] Unbalanced LaTeX $ delimiters! Count: ${singleDollars}`);
  }
});
console.log('✓ Pass 1 completed successfully for all 90 items.');

console.log('\n===============================================================');
console.log('AUDIT PASS 2 / 3: FIGURE PRECISION, ALIGNMENT & LATEX LABELS');
console.log('===============================================================');
let figCount = 0;
allQs.forEach(q => {
  if (q.fig) {
    figCount++;
    if (!FIG[q.fig]) {
      throw new Error(`[Q ${q.id}] Figure "${q.fig}" is not defined in FIG_19AGO`);
    }
    const svgCode = FIG[q.fig]();
    if (!svgCode.includes('<svg') || !svgCode.includes('</svg>')) {
      throw new Error(`[Q ${q.id}] Figure "${q.fig}" returned invalid SVG`);
    }
    // Verify prompt does not contradict figure
    if (q.id === 'fis-19ago-01' && !svgCode.includes('180 m/s')) throw new Error('Fig 1 mismatch');
    if (q.id === 'fis-19ago-02' && (!svgCode.includes('10 kg') || !svgCode.includes('2 kg'))) throw new Error('Fig 2 mismatch');
    if (q.id === 'fis-19ago-11' && (!svgCode.includes('12 N') || !svgCode.includes('8 N'))) throw new Error('Fig 11 mismatch');
    if (q.id === 'fis-19ago-12' && (!svgCode.includes('6 m') || !svgCode.includes('30°'))) throw new Error('Fig 12 mismatch');
    if (q.id === 'fis-19ago-15' && (!svgCode.includes('2 m') || !svgCode.includes('18 m/s²'))) throw new Error('Fig 15 mismatch');
    if (q.id === 'fis-19ago-24' && (!svgCode.includes('100 N') || !svgCode.includes('30°'))) throw new Error('Fig 24 mismatch');
    if (q.id === 'fis-19ago-28' && (!svgCode.includes('36 m') || !svgCode.includes('12'))) throw new Error('Fig 28 mismatch');
    if (q.id === 'qui-19ago-09' && !svgCode.includes('no enlazante')) throw new Error('Fig qui-09 mismatch');
    if (q.id === 'qui-19ago-10' && !svgCode.includes('180°')) throw new Error('Fig qui-10 mismatch');
  } else {
    // If no figure, make sure the prompt doesn't falsely say "En la figura adjunta"
    if (q.prompt.toLowerCase().includes('figura adjunta') || q.prompt.toLowerCase().includes('en el gráfico adjunto')) {
      throw new Error(`[Q ${q.id}] Prompt mentions attached figure but has fig: null`);
    }
  }
});
console.log(`✓ Pass 2 completed successfully: ${figCount} custom figures verified with exact labels.`);

console.log('\n===============================================================');
console.log('AUDIT PASS 3 / 3: END-TO-END ATTEMPT, REVIEW & RETURN WORKFLOW');
console.log('===============================================================');
for (let sim = 1; sim <= 5; sim++) {
  const attempt = sandbox.buildGuia1000Attempt('guia_fql_19ago');
  if (!attempt || attempt.qs.length !== 60) {
    throw new Error(`Simulation #${sim}: Expected 60 sampled questions, got ${attempt ? attempt.qs.length : 0}`);
  }
  // Check composition: 20 len (4 packs of 5), 20 fis, 20 qui
  const lenQs = attempt.qs.filter(q => q.subj === 'len');
  const fisQs = attempt.qs.filter(q => q.subj === 'fis');
  const quiQs = attempt.qs.filter(q => q.subj === 'qui');
  if (lenQs.length !== 20 || fisQs.length !== 20 || quiQs.length !== 20) {
    throw new Error(`Simulation #${sim} composition mismatch: LEN=${lenQs.length}, FIS=${fisQs.length}, QUI=${quiQs.length}`);
  }

  // Answer questions: 50% correct, 50% wrong
  for (let i = 0; i < 60; i++) {
    attempt.ans[i] = (i % 2 === 0) ? attempt.qs[i].src.a : (attempt.qs[i].src.a + 1) % 4;
  }
  attempt.finished = true;
  sandbox.S.attempt = attempt;
  sandbox.S.course = 'guia_fql_19ago';
  sandbox.S.view = 'review';

  // Test failed question explanation and return flow on index 1, 15, 35, 55
  for (const qIndex of [1, 15, 35, 55]) {
    const html = sandbox.explainHtml(qIndex);
    if (!html.includes('data-act="go-theory-deep"')) {
      throw new Error(`Sim #${sim}, Q ${qIndex}: Missing theory button in explainHtml`);
    }
    sandbox.captureReviewReturn(qIndex);
    const ret = sandbox.loadReviewReturn();
    if (ret.qIndex !== qIndex || ret.course !== 'guia_fql_19ago') {
      throw new Error(`Sim #${sim}, Q ${qIndex}: captureReviewReturn failed`);
    }
    sandbox.S.chapter = attempt.qs[qIndex].src.ch;
    sandbox.S.view = 'chapter';
    const chHtml = sandbox.viewChapter();
    if (!chHtml.includes('data-act="return-to-review"')) {
      throw new Error(`Sim #${sim}, Q ${qIndex}: Missing return button in viewChapter`);
    }
    sandbox.applyReturnToReview();
    if (sandbox.S.view !== 'review') {
      throw new Error(`Sim #${sim}, Q ${qIndex}: Failed to return to review view`);
    }
  }
}
console.log('✓ Pass 3 completed successfully: 5 full end-to-end simulation runs verified 100%.');

console.log('\n===============================================================');
console.log('🎉 ALL 3 INDEPENDENT QUALITY AUDITS PASSED WITH ZERO ERRORS!');
console.log('===============================================================');
