import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const sandbox = {
  window: {},
  console,
  localStorage: {
    getItem: () => null,
    setItem: () => {},
  }
};
sandbox.window = sandbox;

// Load bank and figures
const bankCode = fs.readFileSync(path.join(root, 'guia-bank-fql-19ago.js'), 'utf8');
const figCode = fs.readFileSync(path.join(root, 'js', 'fig-fql-19ago.js'), 'utf8');
vm.runInNewContext(bankCode, sandbox);
vm.runInNewContext(figCode, sandbox);

const bank = sandbox.window.GUIA_BANK_FQL_19AGO;
const figs = sandbox.window.FIG_19AGO;

console.log('--- VALIDATING GUIA_BANK_FQL_19AGO ---');
if (!bank) throw new Error('GUIA_BANK_FQL_19AGO not loaded');
if (!figs) throw new Error('FIG_19AGO not loaded');

console.log('LEN count:', bank.len.length, '(expected 30)');
console.log('FIS count:', bank.fis.length, '(expected 30)');
console.log('QUI count:', bank.qui.length, '(expected 30)');
console.log('LEN packs:', bank.packs.len.length, '(expected 6)');

if (bank.len.length !== 30) throw new Error('LEN count mismatch');
if (bank.fis.length !== 30) throw new Error('FIS count mismatch');
if (bank.qui.length !== 30) throw new Error('QUI count mismatch');

const allQs = [...bank.len, ...bank.fis, ...bank.qui];
const ids = new Set();
for (const q of allQs) {
  if (!q.id) throw new Error('Missing ID on question: ' + q.prompt);
  if (ids.has(q.id)) throw new Error('Duplicate ID: ' + q.id);
  ids.add(q.id);
  if (!q.opts || q.opts.length !== 4) throw new Error('Invalid opts on ' + q.id);
  if (q.ans < 0 || q.ans > 3) throw new Error('Invalid ans index on ' + q.id);
  if (!q.exp || q.exp.length < 20) throw new Error('Invalid explanation on ' + q.id);
  if (q.fig) {
    if (typeof figs[q.fig] !== 'function') throw new Error('Missing FIG function: ' + q.fig);
    const svg = figs[q.fig]();
    if (!svg.startsWith('<svg') || !svg.endsWith('</svg>')) throw new Error('Invalid SVG returned for ' + q.fig);
  }
}

console.log('All 90 questions validated (IDs, options, answers, explanations, SVGs).');
console.log('SUCCESS: 19 Ago bank & figures 100% verified!');
