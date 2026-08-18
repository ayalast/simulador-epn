import { cpSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'public');
const files = ['index.html', 'styles.css', 'app.js', 'bank.js', 'theory.js', 'guia-theory.js', 'guia-theory-mat.js', 'guia-theory-filtro.js', 'guia-theory-fis.js', 'guia-theory-qui.js', 'guia-theory-len.js', 'guia-bank-69.js', 'guia-bank-1000-intermedio.js', 'guia-bank-mat-1500.js', 'guia-bank-filtro-intensivo.js', 'guia-bank-filtro-rotativo.js', 'simuladores-programados.js', 'simuladores-filtro.js', 'simuladores_programados.json', 'mini_banco_teoria_700.json'];

if (existsSync(out)) rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
for (const f of files) {
  cpSync(join(root, f), join(out, f));
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
