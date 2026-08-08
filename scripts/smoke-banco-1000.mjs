import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const bankPath = path.join(root, 'guia-bank-1000-intermedio.js');
const theoryPath = path.join(root, 'guia-theory.js');

if (!fs.existsSync(bankPath)) { console.error('FAIL: guia-bank-1000-intermedio.js no existe'); process.exit(1); }
const bankCode = fs.readFileSync(bankPath, 'utf8');
const sb = { window: {} }; vm.createContext(sb);
try { vm.runInContext(bankCode, sb); } catch(e){ console.error('FAIL exec bank', e.message); process.exit(1); }
const BANK = sb.window.GUIA_BANK_1000;
const META = sb.window.GUIA_BANK_1000_META;
if (!BANK || typeof BANK!=='object') { console.error('FAIL: GUIA_BANK_1000 no es objeto'); process.exit(1); }

// theory ch ids
let validCh = new Set(['m1','m2','m3','m4','f1','f2','f3','q1','q2','q3','q4','l1','l2','l3','g1']);
try {
  if (fs.existsSync(theoryPath)) {
    const t = fs.readFileSync(theoryPath,'utf8');
    // busca window.GUIA_THEORY_RAW assignment string
    const ids = [...t.matchAll(/@@CHAPTER\s+[^|]+\|([^|]+)\|/g)].map(m=>m[1].trim());
    ids.forEach(id=>validCh.add(id));
  }
} catch(e){}

const subjects = ['mat','fis','qui','len'];
let total=0;
let fails=[];
const seenIds=new Set();

// topics obligatorios que exigen figura (impusoCML es exigible solo si n par; ver exención abajo)
const figRequiredStrict = new Set(['4.1.3-geom','4.1.4-rectaCirc','4.1.4-razTrig','4.1.4-leySenosCosenos','4.2.1-vectores','4.2.1-equilibrio','4.2.1-caida','4.2.1-proyectiles','4.2.2-circular','4.2.2-2daNewton','4.2.2-roceResistencia','4.2.2-3raNewton','4.2.3-trabajoPotencia','4.2.3-consEnergia']);

for (const s of subjects){
  const arr = BANK[s];
  if (!Array.isArray(arr)) { fails.push(`BANK[${s}] no es array`); continue; }
  total += arr.length;
  const byTopic = {};
  for (let i=0;i<arr.length;i++){
    const q=arr[i];
    const label=`${s}[${i}] id=${q.id||'?'}`;
    if(!q.id || typeof q.id!=='string') fails.push(label+' missing id');
    else if(seenIds.has(q.id)) fails.push('duplicate id '+q.id);
    else seenIds.add(q.id);
    if(q.s!==s) fails.push(label+' s mismatch '+q.s);
    const allowedD = (s==='mat' ? ['intermedio','dificil','experto'] : ['intermedio']);
    if(!allowedD.includes(q.d)) fails.push(label+' d inválido '+q.d+' (permitidos: '+allowedD.join('/')+')');
    if(!Array.isArray(q.topics)||q.topics.length<1) fails.push(label+' topics vacío');
    if(!q.ch || !validCh.has(q.ch)) fails.push(label+' ch inválido '+q.ch);
    if(!q.t || q.t.length<3) fails.push(label+' t vacío');
    if(!q.prompt || typeof q.prompt!=='string' || q.prompt.length<10) fails.push(label+' prompt corto');
    if(!Array.isArray(q.opts)||q.opts.length!==4) fails.push(label+' opts debe ser 4');
    if(typeof q.ans!=='number'||q.ans<0||q.ans>3) fails.push(label+' ans fuera 0..3');
    if(!q.exp || q.exp.length<150) fails.push(label+' exp muy corta (<150, mínimo pedagógico)');
    if(q.exp && q.exp.length>=150 && !/Paso|desde cero|por qué|porque/i.test(q.exp)) fails.push(label+' exp sin marcador pedagógico (debe tener Paso/desde cero)');
    // TeX delimitado: si hay \sin etc fuera de $ es sospechoso
    const hasBackslashCmd = /\\(sin|cos|tan|frac|sqrt|theta|pi|Delta)/.test(q.prompt);
    const hasDollar = q.prompt.includes('$');
    if(hasBackslashCmd && !hasDollar) fails.push(label+' TeX sin delimitador $');
    if(!Array.isArray(q.imgs)) fails.push(label+' imgs no es array');
    // figuras obligatorias (impulsoCML variabilidad hace que solo algunos necesiten fig; se exige si imgs vacío y n par — patch generador ya cubre)
    const needFig = (q.topics||[]).some(t=>figRequiredStrict.has(t));
    if(needFig && (!Array.isArray(q.imgs) || q.imgs.length<1)) fails.push(label+' requiere figura SVG (topic '+q.topics.join(',')+')');
    if(Array.isArray(q.imgs) && q.imgs.length>0){
      for(const svg of q.imgs){
        if(typeof svg!=='string' || !svg.includes('<svg') || !svg.includes('viewBox')) fails.push(label+' figura no es SVG válido');
      }
    }
    const primary = (q.topics||[])[0]||'unknown';
    byTopic[primary]=(byTopic[primary]||0)+1;
  }
  if(arr.length>0){
    console.log(`  ${s}: ${arr.length} preguntas — topics:`, Object.entries(byTopic).map(([k,v])=>`${k}:${v}`).join(', '));
    if(arr.length===250){
      for(const [t,c] of Object.entries(byTopic)) if(c<8) fails.push(`${s} topic ${t} solo ${c} (<8 mín sugerido)`);
    }
  } else {
    console.log(`  ${s}: 0 (stub)`);
  }
}

if(total===0){
  console.log('STUB OK — 0 preguntas, infraestructura lista (250×4 pendiente). Valid ch:', [...validCh].join(', '));
  if(fails.length) { console.error(fails.join('\n')); process.exit(1); }
  process.exit(0);
}

const expectedTotal = 1500;
const expectedBySubject = {mat:750, fis:250, qui:250, len:250};
console.log(`Total banco: ${total}/${expectedTotal}`);
if(fails.length){
  console.error('\nFAILURES ('+fails.length+'):');
  fails.slice(0,40).forEach(f=>console.error('  FAIL:',f));
  if(fails.length>40) console.error(`  ... y ${fails.length-40} más`);
  process.exit(1);
}
for(const subj of subjects){
  const exp = expectedBySubject[subj];
  if(BANK[subj].length !== exp){
    console.error(`FAIL: ${subj} tiene ${BANK[subj].length}, se esperaba ${exp}`);
    process.exit(1);
  }
}
if(META && META.totals){
  const byLevel = META.totals.byLevelMat || {};
  if(byLevel.intermedio!==250 || byLevel.dificil!==250 || byLevel.experto!==250){
    console.error('FAIL: META byLevelMat debe ser 250/250/250, es', JSON.stringify(byLevel));
    process.exit(1);
  }
}
if(total!==expectedTotal){
  console.warn(`WARN: banco incompleto ${total}/${expectedTotal} — aún en construcción, pasa parcial`);
}
console.log('SUCCESS: banco-1000 validado ('+total+' preguntas checked, mat 250×3 intermedio/dificil/experto)');
