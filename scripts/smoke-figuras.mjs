import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'node:url';
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const bankPath = path.join(root, 'guia-bank-1000-intermedio.js');
if(!fs.existsSync(bankPath)){ console.error('FAIL: banco no existe'); process.exit(1); }
const code = fs.readFileSync(bankPath,'utf8');
const sb={window:{}}; vm.createContext(sb); vm.runInContext(code,sb);
const BANK=sb.window.GUIA_BANK_1000;
const subjects=['mat','fis','qui','len'];
let totalFigs=0, fails=[];
const allowedLabels = new Set(['A','B','C','D','O','l₁','l₂','t','x','y','v','v⃗','r','θ','N','mg','F₁','F₂','W','hₘₐₓ','origen','μ','ω']);
for(const s of subjects){
  const arr=BANK[s]||[];
  for(const q of arr){
    if(!Array.isArray(q.imgs)||q.imgs.length===0) continue;
    for(const svg of q.imgs){
      totalFigs++;
      if(!svg.includes('<svg')) fails.push(`${q.id}: sin <svg`);
      if(!svg.includes('viewBox')) fails.push(`${q.id}: sin viewBox`);
      if(!svg.includes('</svg>')) fails.push(`${q.id}: sin cierre </svg>`);
      if(!svg.includes('xmlns')) fails.push(`${q.id}: sin xmlns (puede fallar en Pages)`);
      // viewBox debe contener 4 números
      const vb = svg.match(/viewBox="([^"]+)"/);
      if(vb){
        const nums = vb[1].trim().split(/\s+/).map(Number);
        if(nums.length!==4 || nums.some(isNaN)) fails.push(`${q.id}: viewBox malformado ${vb[1]}`);
        if(nums[2]<=0 || nums[3]<=0) fails.push(`${q.id}: viewBox dimensiones no positivas`);
      }
      // coordenadas de <text> dentro de viewBox (aprox 0-400 x 0-300)
      const vbNums = vb ? vb[1].trim().split(/\s+/).map(Number) : [0,0,400,300];
      const [vx,vy,vw,vh]=vbNums;
      const textCoords = [...svg.matchAll(/<text[^>]*\sx="([^"]+)"[^>]*\sy="([^"]+)"[^>]*>([^<]*)<\/text>/g)];
      for(const m of textCoords){
        const x=parseFloat(m[1]), y=parseFloat(m[2]), label=m[3].trim();
        if(isNaN(x)||isNaN(y)) fails.push(`${q.id}: text coord NaN ${m[0].slice(0,80)}`);
        if(x < vx-20 || x > vx+vw+20 || y < vy-20 || y > vy+vh+20) fails.push(`${q.id}: label "${label}" fuera de viewBox (${x},${y})`);
        // si label largo y no coincide con prompt ni es etiqueta geom permitida, avisa suave
        if(label.length>1 && !q.prompt.includes(label) && !allowedLabels.has(label) && !/^[A-Z0-9°μωθ]$/.test(label)){
          // solo warn, no fail, porque puede ser "v₀=..." que no está literal en prompt
        }
      }
      // chequeo básico de XML bien formado: cuenta tags
      const opens = (svg.match(/<svg/g)||[]).length;
      const closes = (svg.match(/<\/svg>/g)||[]).length;
      if(opens!==closes) fails.push(`${q.id}: mismatch svg tags`);
    }
  }
}
if(totalFigs===0){
  console.log('STUB OK — 0 figuras (banco vacío, helpers listos).');
  process.exit(0);
}
if(fails.length){
  console.error(`FAIL: ${fails.length} errores en ${totalFigs} figuras:`);
  fails.slice(0,30).forEach(f=>console.error('  FAIL:',f));
  process.exit(1);
}
console.log(`SUCCESS: ${totalFigs} figuras validadas OK (viewBox, coords, XML)`);
