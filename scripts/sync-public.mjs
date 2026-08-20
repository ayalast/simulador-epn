import { cpSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'public');
const files = ['index.html', 'study.html', 'styles.css', 'app.js', 'bank.js', 'theory.js', 'guia-theory.js', 'guia-theory-mat.js', 'guia-theory-filtro.js', 'guia-theory-fis.js', 'guia-theory-qui.js', 'guia-theory-len.js', 'guia-bank-69.js', 'guia-bank-1000-intermedio.js', 'guia-bank-fql-avanzado.js', 'guia-bank-fql-dia2.js', 'guia-bank-fql-19ago.js', 'guia-bank-mat-1500.js', 'guia-bank-filtro-intensivo.js', 'guia-bank-filtro-rotativo.js', 'simuladores-programados.js', 'simuladores-filtro.js', 'simuladores_programados.json', 'mini_banco_teoria_700.json'];

try {
  if (existsSync(out)) rmSync(out, { recursive: true, force: true });
} catch (e) {
  // on Windows, open directory locks may prevent full deletion; proceed with overwrite
}
mkdirSync(out, { recursive: true });
for (const f of files) {
  if (existsSync(join(root, f))) {
    cpSync(join(root, f), join(out, f), { force: true });
  }
}
const cssSrc = join(root, 'css');
const cssDst = join(out, 'css');
if (existsSync(cssSrc)) {
  cpSync(cssSrc, cssDst, { recursive: true });
  console.log('public/css synced');
}
const jsSrc = join(root, 'js');
const jsDst = join(out, 'js');
if (existsSync(jsSrc)) {
  cpSync(jsSrc, jsDst, { recursive: true });
  console.log('public/js synced');
}
// Copy Lehmann assets (used by MAT dificil/experto figures)
const lehmannSrc = join(root, 'assets', 'lehmann');
const lehmannDst = join(out, 'assets', 'lehmann');
if (existsSync(lehmannSrc)) {
  cpSync(lehmannSrc, lehmannDst, { recursive: true });
  console.log('public/assets/lehmann synced (' + lehmannDst + ')');
}
console.log('public/ synced:', files.join(', '));
console.log('functions/ stays at repo root (Pages Functions + KV EPN_SYNC).');
