/* Smoke Día 2: 20+20+20, sin ids repetidos en el intento, segundo intento sin solapar el primero. */
import { readFileSync } from 'node:fs';

const bank = Function('window={};' + readFileSync(new URL('../guia-bank-fql-dia2.js', import.meta.url), 'utf8') + ';return window.GUIA_BANK_FQL_DIA2;')();

function shuffle(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }

function fill(subject, want, seenSet){
  const list = bank[subject] || [];
  const packs = (bank.packs && bank.packs[subject]) || [];
  const byId = Object.fromEntries(list.map(q => [q.id, q]));
  const picked = [];
  const used = {};
  const isSeen = (id) => !!seenSet[id];
  const addQ = (q) => { if(!q || used[q.id] || picked.length>=want) return; used[q.id]=1; picked.push(q); };
  const addPack = (p) => {
    const qs = (p.qids||[]).map(id => byId[id]).filter(Boolean);
    if(!qs.length || picked.length+qs.length>want) return;
    if(qs.some(q => used[q.id])) return;
    qs.forEach(addQ);
  };
  const packFresh = (p) => (p.qids||[]).length>0 && (p.qids||[]).every(id => byId[id] && !isSeen(id) && !used[id]);
  shuffle(packs.filter(packFresh)).forEach(addPack);
  shuffle(list.filter(q => !used[q.id] && !isSeen(q.id))).forEach(addQ);
  if(picked.length < want){
    shuffle(packs.filter(p => !packFresh(p))).forEach(addPack);
    shuffle(list.filter(q => !used[q.id])).forEach(addQ);
  }
  picked.forEach(q => { seenSet[q.id]=1; });
  return picked;
}

const prompts = [...bank.len, ...bank.fis, ...bank.qui].map(q => q.prompt);
const dups = prompts.filter((p,i) => prompts.indexOf(p)!==i);
if(dups.length){
  console.error('Prompts duplicados:', [...new Set(dups)]);
  process.exit(1);
}

function assertAttempt(tag, len, fis, qui){
  const ids = [...len, ...fis, ...qui].map(q => q.id);
  if(len.length!==20 || fis.length!==20 || qui.length!==20){
    console.error(tag, 'conteo', {len:len.length, fis:fis.length, qui:qui.length});
    process.exit(1);
  }
  if(new Set(ids).size !== 60){
    console.error(tag, 'ids duplicados en el intento');
    process.exit(1);
  }
  const sub = { len: new Set(len.map(q=>q.s)), fis: new Set(fis.map(q=>q.s)), qui: new Set(qui.map(q=>q.s)) };
  if(!sub.len.has('len') || !sub.fis.has('fis') || !sub.qui.has('qui')){
    console.error(tag, 'faltan materias', sub);
    process.exit(1);
  }
}

for(let i=0;i<80;i++){
  const seen = { fis:{}, qui:{}, len:{} };
  const a1 = { len: fill('len',20,seen.len), fis: fill('fis',20,seen.fis), qui: fill('qui',20,seen.qui) };
  assertAttempt('ciclo1-'+i, a1.len, a1.fis, a1.qui);
  const a2 = { len: fill('len',20,seen.len), fis: fill('fis',20,seen.fis), qui: fill('qui',20,seen.qui) };
  assertAttempt('ciclo2-'+i, a2.len, a2.fis, a2.qui);
  const s1 = new Set([...a1.len, ...a1.fis, ...a1.qui].map(q=>q.id));
  const overlap = [...a2.len, ...a2.fis, ...a2.qui].filter(q => s1.has(q.id));
  if(overlap.length){
    console.error('ciclo2 repite ids del ciclo1', overlap.map(q=>q.id));
    process.exit(1);
  }
}

// Simula el intento roto (18 LEN + 20 FIS + 0 QUI): el siguiente no debe repetir esas IDs
for(let i=0;i<40;i++){
  const firstLen = {}, firstFis = {};
  const listL = bank.len.slice();
  shuffle(listL).slice(0,18).forEach(q => { firstLen[q.id]=1; });
  shuffle(bank.fis.slice()).slice(0,20).forEach(q => { firstFis[q.id]=1; });
  const seen = { len:{...firstLen}, fis:{...firstFis}, qui:{} };
  const next = { len: fill('len',20,seen.len), fis: fill('fis',20,seen.fis), qui: fill('qui',20,seen.qui) };
  assertAttempt('post-38-'+i, next.len, next.fis, next.qui);
  if(next.len.some(q => firstLen[q.id])) { console.error('LEN repite el intento de 38'); process.exit(1); }
  if(next.fis.some(q => firstFis[q.id])) { console.error('FIS repite el intento de 38'); process.exit(1); }
}

console.log('ok: 80 ciclos sin solape + 40 simulaciones post-intento-38');
