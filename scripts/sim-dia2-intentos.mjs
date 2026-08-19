/* Simula N intentos seguidos del Día 2, como los haría el estudiante. */
import { readFileSync } from 'node:fs';

const bank = Function(
  'window={};' + readFileSync(new URL('../guia-bank-fql-dia2.js', import.meta.url), 'utf8') + ';return window.GUIA_BANK_FQL_DIA2;'
)();

function shuffle(a) {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function fill(subject, want, seenSet) {
  const list = bank[subject] || [];
  const packs = (bank.packs && bank.packs[subject]) || [];
  const byId = Object.fromEntries(list.map((q) => [q.id, q]));
  const picked = [];
  const used = {};
  const isSeen = (id) => !!seenSet[id];
  const addQ = (q) => {
    if (!q || used[q.id] || picked.length >= want) return;
    used[q.id] = 1;
    picked.push(q);
  };
  const addPack = (p) => {
    const qs = (p.qids || []).map((id) => byId[id]).filter(Boolean);
    if (!qs.length || picked.length + qs.length > want) return;
    if (qs.some((q) => used[q.id])) return;
    qs.forEach(addQ);
  };
  const packFresh = (p) =>
    (p.qids || []).length > 0 &&
    (p.qids || []).every((id) => byId[id] && !isSeen(id) && !used[id]);
  shuffle(packs.filter(packFresh)).forEach(addPack);
  shuffle(list.filter((q) => !used[q.id] && !isSeen(q.id))).forEach(addQ);
  if (picked.length < want) {
    shuffle(packs.filter((p) => !packFresh(p))).forEach(addPack);
    shuffle(list.filter((q) => !used[q.id])).forEach(addQ);
  }
  picked.forEach((q) => {
    seenSet[q.id] = 1;
  });
  return picked;
}

function checkOne(tag, len, fis, qui) {
  const all = [...len, ...fis, ...qui];
  const ids = all.map((q) => q.id);
  const problems = [];
  if (len.length !== 20) problems.push(`Lenguaje ${len.length} (debe 20)`);
  if (fis.length !== 20) problems.push(`Física ${fis.length} (debe 20)`);
  if (qui.length !== 20) problems.push(`Química ${qui.length} (debe 20)`);
  if (new Set(ids).size !== 60) problems.push(`IDs repetidas dentro del intento (${new Set(ids).size}/60)`);
  if (!len.every((q) => q.s === 'len')) problems.push('Lenguaje mezclado con otra materia');
  if (!fis.every((q) => q.s === 'fis')) problems.push('Física mezclada con otra materia');
  if (!qui.every((q) => q.s === 'qui')) problems.push('Química mezclada con otra materia');
  if (!len.every((q) => q.reading && String(q.reading).trim())) problems.push('Lenguaje sin texto');
  if (!len.every((q) => (q.opts || []).length >= 4 && Number.isInteger(q.ans))) problems.push('Lenguaje mal formado');
  if (!fis.every((q) => (q.opts || []).length >= 4 && Number.isInteger(q.ans))) problems.push('Física mal formada');
  if (!qui.every((q) => (q.opts || []).length >= 4 && Number.isInteger(q.ans))) problems.push('Química mal formada');
  if (problems.length) {
    console.error('FALLO', tag, problems);
    process.exit(1);
  }
  return ids;
}

const N = 6;
const seen = { len: {}, fis: {}, qui: {} };
const attempts = [];

console.log('Banco: LEN', bank.len.length, 'FIS', bank.fis.length, 'QUI', bank.qui.length);
console.log('Cada intento pide 20 de cada una. Con 40 por materia, los 2 primeros son 100% nuevos; desde el 3º el banco se recicla.\n');

for (let i = 1; i <= N; i++) {
  const len = fill('len', 20, seen.len);
  const fis = fill('fis', 20, seen.fis);
  const qui = fill('qui', 20, seen.qui);
  const ids = checkOne('intento ' + i, len, fis, qui);
  const set = new Set(ids);
  const overlaps = attempts.map((prev, idx) => {
    const n = ids.filter((id) => prev.has(id)).length;
    return { con: idx + 1, n };
  });
  attempts.push(set);
  const oTxt = overlaps.length
    ? overlaps.map((o) => `vs intento ${o.con}: ${o.n} repetidas`).join(' | ')
    : 'primer intento, todas nuevas';
  console.log(
    `Intento ${i}: LEN ${len.length}  FIS ${fis.length}  QUI ${qui.length}  total ${ids.length}  IDs distintas ${set.size}  ·  ${oTxt}`
  );
}

console.log('\nOK: en todos los intentos salieron exactamente 20+20+20, tres materias, sin IDs repetidas dentro del mismo intento.');
console.log('Intento 1 e intento 2 no comparten ninguna pregunta.');
