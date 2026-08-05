import { cpSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'public');
const files = ['index.html', 'styles.css', 'app.js', 'bank.js', 'theory.js'];

if (existsSync(out)) rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
for (const f of files) {
  cpSync(join(root, f), join(out, f));
}
console.log('public/ synced:', files.join(', '));
console.log('functions/ stays at repo root (Pages Functions + KV EPN_SYNC).');
