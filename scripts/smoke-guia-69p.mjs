import fs from 'fs';
import path from 'path';
import vm from 'vm';

const baseDir = 'C:\\simulador-epn';
const bank69Path = path.join(baseDir, 'guia-bank-69.js');

if (!fs.existsSync(bank69Path)) {
  console.error('FAIL: guia-bank-69.js does not exist');
  process.exit(1);
}

const jsCode = fs.readFileSync(bank69Path, 'utf8');

const sandbox = { window: {} };
vm.createContext(sandbox);

try {
  vm.runInContext(jsCode, sandbox);
} catch (err) {
  console.error('FAIL: Error executing guia-bank-69.js:', err);
  process.exit(1);
}

const questions = sandbox.window.GUIA_BANK_69;

if (!Array.isArray(questions)) {
  console.error('FAIL: window.GUIA_BANK_69 is not an array');
  process.exit(1);
}

if (questions.length !== 69) {
  console.error(`FAIL: Expected 69 questions, got ${questions.length}`);
  process.exit(1);
}

let validCount = 0;
const validChapters = ['m1', 'm2', 'm3', 'm4', 'l1', 'l2', 'l3', 'f1', 'f2', 'f3', 'f4', 'q1', 'q2', 'q3', 'q4'];

questions.forEach((q, idx) => {
  if (!q.prompt || typeof q.prompt !== 'string') {
    console.error(`FAIL: Question ${idx + 1} missing prompt`);
    return;
  }
  if (!Array.isArray(q.opts) || q.opts.length === 0) {
    console.error(`FAIL: Question ${idx + 1} missing options`);
    return;
  }
  if (typeof q.ans !== 'number' || q.ans < 0 || q.ans >= q.opts.length) {
    console.error(`FAIL: Question ${idx + 1} invalid answer index ${q.ans}`);
    return;
  }
  if (!q.exp || typeof q.exp !== 'string' || q.exp.length < 10) {
    console.error(`FAIL: Question ${idx + 1} missing explanation`);
    return;
  }
  if (!q.ch || !validChapters.includes(q.ch)) {
    console.error(`FAIL: Question ${idx + 1} invalid theory chapter link ${q.ch}`);
    return;
  }
  validCount++;
});

if (validCount === 69) {
  console.log('SUCCESS: All 69 questions, explanations, and theory links are 100% valid!');
} else {
  console.error(`FAIL: Only ${validCount}/69 questions were valid`);
  process.exit(1);
}
