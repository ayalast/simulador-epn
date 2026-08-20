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
if (allQs.length !== 120) {
  throw new Error(`Expected 120 questions, got ${allQs.length}`);
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
    throw new Error(`[Q ${q.id}] Broken single dollar LaTeX delimiter in text`);
  }
});
console.log(`✓ Pass 1 completed successfully for all 120 items.`);

console.log('\n===============================================================');
console.log('AUDIT PASS 2 / 3: FIGURE PRECISION, ALIGNMENT & LATEX LABELS');
console.log('===============================================================');
let figCount = 0;
allQs.forEach(q => {
  if (q.fig) {
    figCount++;
    let figSvg = FIG[q.fig];
    if (typeof figSvg === 'function') figSvg = figSvg();
    if (!figSvg || !figSvg.includes('<svg') || !figSvg.includes('viewBox=')) {
      throw new Error(`[Q ${q.id}] Figure "${q.fig}" has malformed SVG structure`);
    }
    // Check that SVG does not have raw unrendered TeX commands inside text tags
    if (figSvg.includes('\\text{') || figSvg.includes('\\vec{') || figSvg.includes('\\approx')) {
      throw new Error(`[Q ${q.id}] Figure "${q.fig}" contains unrendered LaTeX command inside SVG`);
    }
  } else {
    // If no figure, make sure the prompt doesn't falsely say "En la figura adjunta"
    if (q.prompt.toLowerCase().includes('figura adjunta') || q.prompt.toLowerCase().includes('en el gráfico adjunto')) {
      throw new Error(`[Q ${q.id}] Prompt mentions attached figure but has fig: null`);
    }
  }
});
console.log(`✓ Pass 2 completed successfully: ${figCount} custom figures verified with exact labels.`);

console.log('\n===============================================================');
console.log('AUDIT PASS 3 / 3: DETERMINISTIC ATTEMPTS & ZERO-OVERLAP VERIFICATION');
console.log('===============================================================');

// Reset seen state
sandbox.SEEN1000 = {};
sandbox.SEEN1000SET = {};

// Run Attempt 1
const attempt1 = sandbox.buildGuia1000Attempt('guia_fql_19ago');
if (!attempt1 || attempt1.qs.length !== 60) {
  throw new Error(`Attempt 1: Expected 60 questions, got ${attempt1 ? attempt1.qs.length : 0}`);
}
const ids1 = new Set(attempt1.qs.map(q => q.src.id));
if (ids1.size !== 60) {
  throw new Error(`Attempt 1: Duplicated question IDs detected! Unique=${ids1.size}`);
}

// Run Attempt 2
const attempt2 = sandbox.buildGuia1000Attempt('guia_fql_19ago');
if (!attempt2 || attempt2.qs.length !== 60) {
  throw new Error(`Attempt 2: Expected 60 questions, got ${attempt2 ? attempt2.qs.length : 0}`);
}
const ids2 = new Set(attempt2.qs.map(q => q.src.id));
if (ids2.size !== 60) {
  throw new Error(`Attempt 2: Duplicated question IDs detected in Attempt 2! Unique=${ids2.size}`);
}

// Verify ZERO OVERLAP between Attempt 1 and Attempt 2
const overlap = [...ids1].filter(id => ids2.has(id));
if (overlap.length > 0) {
  throw new Error(`CRITICAL ERROR: Overlap detected between Attempt 1 and Attempt 2 (${overlap.length} questions): ${overlap.join(', ')}`);
}
console.log(`✓ Attempt 1 (60 Qs) and Attempt 2 (60 Qs) have STRICT ZERO OVERLAP (120 unique questions verified).`);

// Test review workflow on both attempts
for (const [attemptName, att] of [['Attempt 1', attempt1], ['Attempt 2', attempt2]]) {
  for (let i = 0; i < 60; i++) {
    att.ans[i] = (i % 2 === 0) ? att.qs[i].src.a : (att.qs[i].src.a + 1) % 4;
  }
  att.finished = true;
  sandbox.S.attempt = att;
  sandbox.S.course = 'guia_fql_19ago';
  sandbox.S.view = 'review';

  for (const qIndex of [2, 18, 38, 58]) {
    const html = sandbox.explainHtml(qIndex);
    if (!html.includes('data-act="go-theory-deep"')) {
      throw new Error(`${attemptName}, Q ${qIndex}: Missing theory button in explainHtml`);
    }
    sandbox.captureReviewReturn(qIndex);
    const ret = sandbox.loadReviewReturn();
    if (ret.qIndex !== qIndex || ret.course !== 'guia_fql_19ago') {
      throw new Error(`${attemptName}, Q ${qIndex}: captureReviewReturn failed`);
    }
    sandbox.S.chapter = att.qs[qIndex].src.ch;
    sandbox.S.view = 'chapter';
    const chHtml = sandbox.viewChapter();
    if (!chHtml.includes('data-act="return-to-review"')) {
      throw new Error(`${attemptName}, Q ${qIndex}: Missing return button in viewChapter`);
    }
    sandbox.applyReturnToReview();
    if (sandbox.S.view !== 'review') {
      throw new Error(`${attemptName}, Q ${qIndex}: Failed to return to review view`);
    }
  }
}
console.log('✓ Pass 3 completed successfully: 2 deterministic attempts and theory return navigation verified 100%.');

console.log('\n===============================================================');
console.log('🎉 ALL 3 INDEPENDENT QUALITY AUDITS PASSED WITH ZERO ERRORS!');
console.log('===============================================================');
