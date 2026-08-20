/**
 * Smoke / regression: colisiones prosa española ↔ macros trig/math.
 *
 * Detecta:
 * 1) Pipeline tex que tipografía «sin»/«tanto»/«cosas» como función.
 * 2) Preprocess peligroso (replace sin|tan|cos sin word-boundary / sin $...$).
 * 3) Literales JS con escapes LaTeX corruptos (\sin → sin, \t → TAB).
 * 4) Contenido ya corrupto (\sin embargo, \tanto, \cosas en prosa).
 *
 * Uso: node scripts/smoke-math-prose.mjs
 * Exit 0 = OK; 1 = fallos.
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const fails = [];

function fail(msg) {
  fails.push(msg);
  console.error('FAIL:', msg);
}
function ok(msg) {
  console.log('OK  ', msg);
}

/* ---------- 1) Load tex from app.js head ---------- */
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const endTex = app.indexOf('var tex = window.tex;');
const head = endTex > 0 ? app.slice(0, endTex + 'var tex = window.tex;'.length) : app.slice(0, 12000);
const sandbox = { window: {}, console };
sandbox.window = sandbox;
vm.runInNewContext(head, sandbox);
const tex = sandbox.window.tex || sandbox.tex;
if (typeof tex !== 'function') fail('window.tex no disponible tras cargar el pipeline');
else ok('pipeline tex cargado');

/* ---------- 2) Prosa ES nunca vira a mjx/mtext trig ---------- */
const proseCases = [
  'pero sin gramática no formas una frase',
  'por lo tanto, en consecuencia',
  'las cosas importantes',
  'el coseno y la tangente en prosa, sin delimitadores de fórmula',
  'sin embargo, sin solución y sin aire',
  'tantos nueves como cifras',
  'como regla general, para todo x',
];
for (const p of proseCases) {
  const html = tex(p);
  if (/class="mjx"/.test(html)) fail('prosa envuelta en mjx: ' + p);
  if (/class="mtext">(?:sin|cos|tan|sec|csc|cot)</.test(html))
    fail('prosa tipografiada como función: ' + p);
  // texto plano debe sobrevivir
  const plain = html.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
  if (p.includes('sin') && !plain.includes('sin')) fail('perdió «sin»: ' + p);
  if (p.includes('tanto') && !plain.includes('tanto')) fail('perdió «tanto»: ' + p);
  if (p.includes('cosas') && !plain.includes('cosas')) fail('perdió «cosas»: ' + p);
}
ok('prosa ES intacta (' + proseCases.length + ' casos)');

/* ---------- 3) Fórmulas reales siguen tipografiando funciones ---------- */
const mathCases = [
  ['$\\sin(x)$', 'sin'],
  ['$\\cos\\theta$', 'cos'],
  ['$\\tan(x)$', 'tan'],
  ['$\\sec(x)$', 'sec'],
  ['$1+\\tan^{2}x=\\sec^{2}x$', 'tan'],
  ['por lo tanto $\\tan(x)$ es', 'tan'],
  ['sin embargo $\\sin x+\\cos x$', 'sin'],
];
for (const [src, fn] of mathCases) {
  const html = tex(src);
  if (!new RegExp('class="mtext">' + fn + '<').test(html))
    fail('no tipografió \\' + fn + ' en: ' + src + ' → ' + html.slice(0, 120));
}
ok('fórmulas \\sin/\\cos/\\tan/\\sec tipografían');

/* Mixed: prosa + math */
const mixed = tex('pero sin gramática; usa $\\sin(x)$ y por lo tanto $\\cos(x)$.');
if (!mixed.includes('sin gramática')) fail('mixed perdió prosa «sin gramática»');
if (!/class="mtext">sin</.test(mixed)) fail('mixed no tipografió \\sin');
if ((mixed.match(/class="mtext">sin</g) || []).length !== 1)
  fail('mixed tipografió «sin» de prosa o falló conteo');
ok('mixed prosa+math');

/* ---------- 4) Código fuente: no hay replace agresivo ---------- */
const dangerRe = [
  /replace\(\s*\/(?:\\b)?\(?(?:sin\|cos\|tan)/,
  /replace\(\s*\/sin\|cos\|tan/,
  /\/\(sin\|cos\|tan\|sec\|csc\|cot\)\/g/,
];
for (const re of dangerRe) {
  if (re.test(app)) fail('regex/replace peligroso en app.js: ' + re);
}
if (/function tex\s*\([^)]*\)\s*\{[\s\S]{0,200}katex\.renderToString/.test(app))
  fail('stub katex tex() que alimenta strings enteros sigue presente');
ok('sin preprocess agresivo ni stub katex peligroso');

/* ---------- 5) Tips: literales '...' no deben perder \\sin/\\tan/\\frac ---------- */
const tipRe = /'(?:\\.|[^'\\])*'/g;
let m;
let tipBugs = 0;
while ((m = tipRe.exec(app))) {
  const lit = m[0];
  if (lit[0] !== "'") continue;
  if (!lit.includes('$')) continue;
  if (!/\\(sin|cos|tan|frac|Delta|theta|dfrac|mathrm|sqrt)/.test(lit)) continue;
  try {
    const val = eval(lit);
    if (/[\t\f]/.test(val) && /\\t|\\f/.test(lit) === false) {
      /* tab/ff from \t \f in source */
    }
    // If source has single \sin (one backslash before sin), eval loses it
    // Proper source has \\sin → value \sin
    const srcBody = lit.slice(1, -1);
    // Detect corrupted SOURCE: odd number of backslashes before cmd
    const bad = /(?<!\\)\\(sin|cos|tan|frac|Delta|theta|dfrac|sqrt|mathrm|text|circ|cdot|pm|le|ge)(?![a-zA-Z\\])/.test(
      srcBody
    );
    // In source, correct is \\sin (two backslashes). Pattern (?<!\\)\\(sin) matches
    // a single backslash not preceded by backslash — i.e. corrupted OR the first of a pair.
    // For \\sin: at first \, next is \, so (sin) doesn't match after first.
    // at second \, preceded by \, lookbehind fails. Good — correct source won't match.
    if (bad) {
      tipBugs++;
      if (tipBugs <= 5) fail('literal tip con escape LaTeX simple (corrupto): ' + lit.slice(0, 90));
    }
    if (val.includes('\t') && /\$\s*an/.test(val)) {
      tipBugs++;
      fail('\\t comió «tan» en tip: ' + val.slice(0, 80));
    }
  } catch (e) {
    /* ignore un-evalable */
  }
}
if (tipBugs === 0) ok('tips sin escapes LaTeX corruptos');

/* ---------- 6) Contenido: corrupción tipo \sin embargo / \tanto / \cosas ---------- */
const contentFiles = ['theory.js', 'guia-theory.js', 'bank.js', 'index.html', 'app.js'];
const corrupt = [
  /\\sin\s+embargo/i,
  /\\sin\s+gram/i,
  /\\sin\s+soluci/i,
  /por\s+lo\s+\\tan/i,
  /\\tanto\b/i,
  /\\cosas\b/i,
  /\\coseno\b/i,
  /pero\s+\\sin\b/i,
];
for (const f of contentFiles) {
  const s = fs.readFileSync(path.join(root, f), 'utf8');
  for (const re of corrupt) {
    if (re.test(s)) fail('contenido corrupto en ' + f + ': ' + re);
  }
}
ok('contenido sin \\sin/\\tan/\\cosas en prosa');

/* ---------- summary ---------- */
console.log('');
if (fails.length) {
  console.error(fails.length + ' fallo(s)');
  process.exit(1);
}
console.log('smoke-math-prose: all clear');
process.exit(0);
