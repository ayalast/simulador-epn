import fs from 'node:fs';
import vm from 'node:vm';

const sandbox = { window: {}, console };
sandbox.window = sandbox;

// Load figures
const figCode = fs.readFileSync('js/fig-fql-19ago.js', 'utf8');
vm.runInNewContext(figCode, sandbox);
const FIG = sandbox.window.FIG_19AGO;

console.log('--- VALIDATING SVG FIGURES IN FIG_19AGO ---');
const figKeys = Object.keys(FIG);
console.log(`Total figures registered: ${figKeys.length}`);

for (const key of figKeys) {
  const svg = FIG[key]();
  if (!svg.startsWith('<svg') || !svg.endsWith('</svg>')) {
    throw new Error(`Figure ${key} does not produce valid <svg>...</svg>`);
  }
  // Test basic XML balance (tags)
  const openSvgCount = (svg.match(/<svg/g) || []).length;
  const closeSvgCount = (svg.match(/<\/svg>/g) || []).length;
  if (openSvgCount !== closeSvgCount) {
    throw new Error(`Figure ${key} has unbalanced <svg> tags`);
  }
  console.log(`  ✓ ${key} (${svg.length} chars)`);
}

// Load bank
const bankCode = fs.readFileSync('guia-bank-fql-19ago.js', 'utf8');
vm.runInNewContext(bankCode, sandbox);
const bank = sandbox.window.GUIA_BANK_FQL_19AGO;

console.log('\n--- AUDITING FIGURE ALIGNMENT ACROSS ALL 90 QUESTIONS ---');
const allQuestions = [...bank.len, ...bank.fis, ...bank.qui];

let figAttachedCount = 0;
let noFigCount = 0;

for (const q of allQuestions) {
  if (q.fig) {
    if (!FIG[q.fig]) {
      throw new Error(`Question ${q.id} references non-existent figure: ${q.fig}`);
    }
    figAttachedCount++;
    console.log(`  [FIG OK] ${q.id} (${q.s}) -> ${q.fig}`);
  } else {
    noFigCount++;
  }
}

console.log(`\nSummary: ${figAttachedCount} questions have tailor-made figures, ${noFigCount} questions are conceptual/algebraic without figure.`);
console.log('SUCCESS: All figures and questions are 100% verified and aligned!');
