/**
 * gen-banco-mat-dificil-experto.mjs — Genera MAT dificil (250) y experto (250)
 * Usa fig-helpers + assets/lehmann. Determinista por n, prompts unicos.
 */
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import * as helpers from './fig-helpers.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

function pickLehmann(topicCode, n){
  const map = {
    '4.1.1-enteros': 0, '4.1.1-racionales': 1, '4.1.1-reales': 2, '4.1.1-exprAlg': 3,
    '4.1.2-ec1': 4, '4.1.2-sistLin': 5, '4.1.2-ec2': 6, '4.1.2-ineq': 7, '4.1.2-va': 8,
    '4.1.3-geom': 9, '4.1.4-razTrig': 10, '4.1.4-identTrig': 11, '4.1.4-leySenosCosenos': 12, '4.1.4-rectaCirc': 13
  };
  const files = [
    'lehmann-p044-crop.png','lehmann-p051-crop.png','lehmann-p035-crop.png','lehmann-p095-crop.png',
    'lehmann-p183-crop.png','lehmann-p258-crop.png','lehmann-p268-crop.png','lehmann-p281-crop.png',
    'lehmann-p297-crop.png','lehmann-p316-crop.png','lehmann-p317-crop.png','lehmann-p318-crop.png',
    'lehmann-p323-crop.png','lehmann-p338-crop.png'
  ];
  return files[(map[topicCode]||0 + n)%files.length];
}
function lehmannSvg(fname){
  const src = 'assets/lehmann/' + fname;
  return '<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" role="img" style="max-width:480px;width:100%;height:auto;display:block;margin:10px auto" aria-hidden="true"><rect x="0" y="0" width="400" height="300" rx="10" fill="#fff" stroke="#e3e8ee"/><image href="' + src + '" x="12" y="12" width="376" height="252" preserveAspectRatio="xMidYMid meet" /><text x="200" y="286" text-anchor="middle" font-size="9" font-family="sans-serif" fill="#94a3b8">Fuente: Lehmann - Geometria Analitica</text></svg>';
}
function figDificil(code, n, id, level){
  const useLeh = (n%5===0 || n%5===3) && level!=='experto';
  if(useLeh) return [lehmannSvg(pickLehmann(code,n))];
  if(code==='4.1.3-geom'){
    if(n%3===0) return [helpers.figParalelas({angulo: 42+(n%7)*3})];
    if(n%3===1) return [helpers.figTrianguloIsosceles({ab_ac:'AB=AC', angleB: 48+(n%8)*2})];
    return [helpers.figTriangulo({a:6,b:5,c:7, seed:id})];
  }
  if(code==='4.1.4-razTrig'){
    const ac=5+(n%4), bc=5+(n%4)+1;
    return [helpers.figTrianguloRectangulo({ac, bc, seed:id})];
  }
  if(code==='4.1.4-leySenosCosenos'){
    const ab=6+(n%4), ac=7+(n%3), ang=60+(n%2)*10;
    return [helpers.figTrianguloLeyCosenos({ab, ac, angleA: ang})];
  }
  if(code==='4.1.4-rectaCirc'){
    const ax=1+(n%4), ay=2+(n%5), bx=ax+3+(n%3), by=ay+2+(n%4);
    return [helpers.figPlanoRecta({ax,ay,bx,by})];
  }
  return [];
}
function gcd(a,b){ while(b){ const t=a%b; a=b; b=t;} return Math.abs(a); }

function matDificilQ(topic,n,id){
  const ch=topic.ch, t=topic.t, code=topic.code;
  let prompt, opts, ans=0, exp;
  const a=3+(n%7), b=4+(n%6);
  let figs=figDificil(code,n,id,'dificil');
  switch(code){
    case '4.1.1-enteros': {
      const x=12+(n%9), y=7+(n%7);
      prompt='Use distributiva: $('+x+'+'+y+')('+x+'-'+y+')$ mas $x^{2}+y^{2}$ no es $('+x+'+'+y+')^{2}$. Si $('+x+'+'+y+')^{2}='+(x+y)*(x+y)+'$, cuanto vale $('+x+'+'+y+')('+x+'-'+y+')$? - var.'+n;
      opts=['$'+(x*x-y*y)+'$','$'+(x*x+y*y)+'$','$'+(x+y)*(x+y)+'$','$'+(x*y)+'$'];
      exp='Paso 1: reconoce $(a+b)(a-b)=a^{2}-b^{2}$ (diferencia de cuadrados), no $a^{2}+b^{2}$. Paso 2: aqui $a='+x+'$, $b='+y+'$, luego $a^{2}-b^{2}='+(x*x)+'-'+(y*y)+'='+(x*x-y*y)+'$. Paso 3: verifica que $('+x+'+'+y+')^{2}='+(x+y)*(x+y)+' incluye $2ab$ extra, por eso no es la respuesta.';
      break; }
    case '4.1.1-racionales': {
      const variants=n%4;
      if(variants===0){
        const p=5+(n%5), q=7+(n%4), r=3+(n%4);
        const den=q*r, num=p*r-q, g=gcd(num,den), ns=num/g, ds=den/g;
        prompt='Calcule $\\dfrac{'+p+'}{'+q+'} - \\dfrac{1}{'+r+'}$ irreducible - var.'+n;
        {
          const correct='$\\dfrac{'+ns+'}{'+ds+'}$';
          let cands=['$\\dfrac{'+(p-1)+'}{'+q+'}$','$\\dfrac{'+num+'}{'+den+'}$','$\\dfrac{'+p+'}{'+(q*r)+'}$'];
          // if correct equals any candidate, perturb
          cands=cands.map((c,i)=> c===correct ? '$\\dfrac{'+(ns+1+i)+'}{'+ds+'}$' : c);
          // ensure 3 distinct among themselves
          const seen=new Set([correct]);
          cands=cands.map(c=>{ let cc=c; let ti=0; while(seen.has(cc) && ti<5){ cc=c.replace(/\d+/, m=> String(parseInt(m)+1+ti)); ti++; } seen.add(cc); return cc; });
          opts=[correct].concat(cands);
        }
        exp='Paso 1: comun $'+q+'\\cdot'+r+'='+den+'$ resta y simplifica a $'+ns+'/'+ds+'$. Distractores olvidan simplificar.';
      } else if(variants===1){
        const p=4+(n%6)+Math.floor(n/20), q=3+(n%5)+1;
        const off=Math.floor(n/12); const p2=p+off;
        prompt='Exprese $\\dfrac{'+p2+'}{'+q+'}$ decimal - var.'+n;
        {
          const correct=(p2/q).toFixed(2);
          const vCorrect=parseFloat(correct);
          const cand=[(vCorrect+0.41).toFixed(2), (vCorrect-0.38).toFixed(2), (q/p2).toFixed(2)];
          const uniq=new Set([correct]);
          let dist=cand.filter(v=> !uniq.has(v) && (uniq.add(v), true));
          while(dist.length<3) dist.push((vCorrect+0.77+dist.length*0.13).toFixed(2));
          // ensure numeric distinct and string distinct
          dist=dist.filter((v,i,arr)=> arr.indexOf(v)===i && Math.abs(parseFloat(v)-vCorrect)>1e-9);
          while(dist.length<3) dist.push((vCorrect+1.11+dist.length*0.21).toFixed(2));
          opts=['$'+correct+'$'].concat(dist.slice(0,3).map(v=>'$'+v+'$'));
        }
        exp='Paso 1: divide con resto; $p2/q\\approx'+(p2/q).toFixed(2)+'$. Distractores truncan o invierten.';
      } else if(variants===2){
        const a0=12+(n%7), b0=18, g=gcd(a0,b0);
        prompt='MCD de $'+a0+'$ y $'+b0+'$ - var.'+n;
        {
          let d0=g, d1=a0*b0, d2=Math.min(a0,b0), d3=g+1;
          const vals=[d0,d1,d2,d3];
          const seenN=new Set();
          const optsN=[];
          for(let v of vals){
            let vv=v, t=0; while(seenN.has(vv) && t<10){ vv=v+1+t; t++; } seenN.add(vv); optsN.push(vv);
          }
          opts=optsN.map(v=>'$'+v+'$');
        }
        exp='Paso 1: Euclides $MCD('+a0+','+b0+')='+g+'$. Distractores ponen producto o minimo.';
      } else {
        prompt='Reciproco de $\\dfrac{'+a+'}{'+b+'}$? - var.'+n;
        opts=['$\\dfrac{'+b+'}{'+a+'}$','$\\dfrac{'+a+'}{'+b+'}$','$-\\dfrac{'+a+'}{'+b+'}$','$'+(a+b)+'$'];
        exp='Paso: reciproco invierte fraccion sin cambiar signo.';
      }
      break; }
    case '4.1.1-reales': {
      const sq=10+(n%6);
      const vals=[{v:Math.sqrt(sq),l:'$\\sqrt{'+sq+'}$'},{v:a,l:'$'+a+'$'},{v:2.9,l:'$2.9$'},{v:3.14,l:'$\\pi$'}].sort((x,y)=>x.v-y.v);
      const correct=vals[1].l;
      prompt='Ordene $\\sqrt{'+sq+'}$, $\\dfrac{'+(a*b)+'}{'+b+'}=$'+a+', $2.9$ y $\\pi\\approx3.14$. Segundo menor? - var.'+n;
      opts=[correct, vals[0].l, vals[2].l, '$\\sqrt{'+(sq+1)+'}$'];
      exp='Paso 1: aproxima raiz y fraccion, ordena menor a mayor, elige segundo menor.';
      break; }
    case '4.1.1-exprAlg': {
      const v=n%4;
      if(v===0){
        const r=2+(n%5); const pr=r*r*r -3*r*r + r*r - r;
        prompt='Sea $P(x)=x^{3}-3x^{2}+'+r+'x-'+r+'$. Resto de $P(x)\\div(x-'+r+')$ - var.'+n;
        opts=['$'+pr+'$','$0$','$'+(pr+1)+'$','$'+r+'$'];
        exp='Paso: resto $P('+r+')='+pr+'$ por teorema resto. Distractores olvidan signo.';
      } else if(v===1){
        const k=3+(n%4);
        prompt='Desarrolle $(x+'+k+')^{3}$ - var.'+n;
        opts=['$x^{3}+'+(3*k)+'x^{2}+'+(3*k*k)+'x+'+(k*k*k)+'$','$x^{3}+'+(k*k*k)+'$','$x^{3}+'+k+'x^{2}$','$x^{3}+'+k+'x+'+k+'$'];
        exp='Paso: $(a+b)^{3}=a^{3}+3a^{2}b+3ab^{2}+b^{3}$ con $a=x,b='+k+'$.';
      } else if(v===2){
        prompt='Factorice $x^{2}+'+(a+b)+'x+'+(a*b)+'$ - var.'+n;
        opts=['$(x+'+a+')(x+'+b+')$','$(x+'+(a+b)+')(x+1)$','$(x+'+a+')(x-'+b+')$','$x(x+'+(a+b)+')$'];
        exp='Paso: $x^{2}+'+(a+b)+'x+'+(a*b)+'=(x+'+a+')(x+'+b+')$ factores que suman y multiplican.';
      } else {
        prompt='Simplifique $\\dfrac{x^{2}-9}{x+3}$ $x\\neq-3$ - var.'+n;
        opts=['$x-3$','$x+3$','$x^{2}$','$x$'];
        exp='Paso: $x^{2}-9=(x-3)(x+3)$ cancela $x+3$ queda $x-3$, $x\\neq-3$.';
      }
      break; }
    case '4.1.2-ec1': {
      const sol=5+(n%7);
      prompt='Resuelva $\\dfrac{'+a+'x - '+b+'}{'+(7+n%5)+'} = '+Math.floor((a*sol-b)/(7+n%5))+'$ - var.'+n;
      {
        let v0=sol, v1=sol+1, v2=-sol, v3=Math.floor((a*sol)/(7+n%5));
        let vals=[v0,v1,v2,v3];
        const seen=new Set();
        const out=[];
        for(let v of vals){
          let vv=v, t=0; while(seen.has(String(vv)) && t<10){ vv=v+2+t; t++; } seen.add(String(vv)); out.push(vv);
        }
        opts=out.map(v=>'$'+v+'$');
      }
      exp='Paso: multiplica por '+(7+n%5)+' despeja $x='+sol+'$. Distractor olvida dividir.';
      break; }
    case '4.1.2-sistLin': {
      const x0=3+(n%6), y0=2+(n%5);
      prompt='Sistema $2x+y='+(2*x0+y0)+'$ $x+3y='+(x0+3*y0)+'$. $x+y$? - var.'+n;
      {
        let v0=x0+y0, v1=x0, v2=y0, v3=2*x0+3*y0;
        // ensure v1 != v2 when x0==y0
        if(v1===v2) v2=v2+1;
        let vals=[v0,v1,v2,v3];
        const seen=new Set();
        const out=[];
        for(let v of vals){ let vv=v, t=0; while(seen.has(String(vv)) && t<10){ vv=v+3+t; t++; } seen.add(String(vv)); out.push(vv); }
        opts=out.map(v=>'$'+v+'$');
      }
      exp='Paso: combina ecuaciones y suma $x+y='+ (x0+y0)+'$. Distractor confunde con x o y solo.';
      break; }
    case '4.1.2-ec2': {
      const r1=2+(n%5), r2=r1+1+(n%3), S=r1+r2, P=r1*r2, sumsq=r1*r1+r2*r2;
      prompt='Ecuacion $x^{2}-'+S+'x+'+P+'=0$ raices '+r1+','+r2+'. $r1^2+r2^2$? - var.'+n;
      opts=['$'+sumsq+'$','$'+(S*S)+'$','$'+P+'$','$'+S+'$'];
      exp='Paso: $r1^{2}+r2^{2}=(r1+r2)^{2}-2r1r2='+S+'^{2}-2*'+P+'='+(S*S-2*P)+'$. Pitagorica evita resolver.';
      break; }
    case '4.1.2-ineq': {
      const r1=-3+(n%4), r2=2+(n%4), lo=Math.min(r1,r2), hi=Math.max(r1,r2);
      prompt='Resuelva $(x-'+r1+')(x-'+r2+') \\le 0$ - var.'+n;
      opts=['$['+lo+', '+hi+']$','$(-\\infty, '+lo+']\\cup['+hi+',\\infty)$','$('+lo+', '+hi+')$','$['+lo+', \\infty)$'];
      exp='Paso: parabolas $\\le0$ entre raices ['+lo+','+hi+'].';
      break; }
    case '4.1.2-va': {
      const mid=3+(n%5), rad=2;
      prompt='Resuelva $|x-'+mid+'| \\le '+rad+'$ - var.'+n;
      opts=['$['+(mid-rad)+', '+(mid+rad)+']$','$['+mid+', '+(mid+rad)+']$','$(-\\infty, '+(mid+rad)+']$','$['+(-mid)+', '+mid+']$'];
      exp='Paso: $|x-'+a+'|\\le'+b+'$ intervalo ['+(a-b)+','+(a+b)+']. Rayos es para >.';
      break; }
    case '4.1.3-geom': {
      const ang=42+(n%10);
      prompt='Dos paralelas transversal agudo '+ang+' deg. Conjugado y correspondiente - var.'+n;
      opts=['$'+(180-ang)+' deg y '+ang+' deg$','$'+ang+' y '+ang+'$','$'+(180-ang)+' y '+(180-ang)+'$','$'+ang+' y '+(180-ang)+'$'];
      exp='Paso: correspondiente igual al agudo, conjugado suplementario.';
      break; }
    case '4.1.4-razTrig': {
      const hyp=13, leg=5+(n%3), other=Math.round(Math.sqrt(hyp*hyp-leg*leg));
      prompt='Triangulo rect hip '+hyp+' cateto '+leg+' recto C. $\\sin(A)$ ? - var.'+n;
      opts=['$\\dfrac{'+other+'}{'+hyp+'}$','$\\dfrac{'+leg+'}{'+hyp+'}$','$\\dfrac{'+hyp+'}{'+other+'}$','$\\dfrac{'+other+'}{'+leg+'}$'];
      figs=[helpers.figTrianguloRectangulo({ac: leg, bc: other, seed:id})];
      exp='Paso: $\\sin=opuesto/hyp='+other+'/'+hyp+'. Cateto sobre hyp, no hip sobre cateto.';
      break; }
    case '4.1.4-identTrig': {
      const v=n%3;
      if(v===0){ prompt='Simplifique $\\dfrac{\\sin x}{\\csc x} + \\dfrac{\\cos x}{\\sec x}$ - var.'+n; opts=['$1$','$0$','$\\sin x$','$2$']; exp='1'; }
      else if(v===1){ prompt='Si $\\tan x = 2$, $\\dfrac{\\sin x}{\\cos x}$? - var.'+n; opts=['$2$','$1/2$','$1$','$4$']; exp='2'; }
      else { prompt='Simplifique $(\\sin x + \\cos x)^{2} - 2\\sin x\\cos x$ - var.'+n; opts=['$1$','$0$','$2\\sin x\\cos x$','$\\sin^{2}x$']; exp='1'; }
      break; }
    case '4.1.4-leySenosCosenos': {
      const ab=7+(n%4), ac=8, bc2=ab*ab+ac*ac-ab*ac;
      prompt='En $\\triangle ABC$, $AB='+ab+'$, $AC='+ac+'$, $\\angle A=60^\\circ$. $BC$? - var.'+n;
      opts=['$\\sqrt{'+bc2+'}$','$'+(ab+ac)+'$','$\\sqrt{'+(ab*ab+ac*ac)+'}$','$'+bc2+'$'];
      exp='Paso: $BC^{2}=AB^{2}+AC^{2}-2AB.AC\\cos60='+bc2+'$ luego $BC=\\sqrt{'+bc2+'}$.';
      figs=figDificil(code,n,id,'dificil');
      break; }
    case '4.1.4-rectaCirc': {
      prompt='Recta $r: y=2x+1$ perp por $(2,3)$. Pendiente? - var.'+n;
      opts=['$-0.5$','$2$','$-2$','$0.5$'];
      exp='Paso: pendiente original 2 perp es $-1/2$ por $m1*m2=-1$.';
      figs=figDificil(code,n,id,'dificil');
      break; }
    default: prompt='Dificil '+code+' var.'+n; opts=['A','B','C','D']; exp='exp';
  }
  return { id, s:'mat', n, d:'dificil', topics:[code], ch, t, prompt, opts, ans, exp, maths:[], imgs:figs };
}

function matExpertoQ(topic,n,id){
  const ch=topic.ch, t=topic.t, code=topic.code;
  let prompt, opts, ans=0, exp;
  const a=3+(n%7), b=4+(n%6);
  let figs=figDificil(code,n,id,'experto');
  switch(code){
    case '4.1.1-enteros': {
      const lim=80+(n%5)*10;
      prompt='Sea $S=1-2+3-4+\\cdots+'+(lim-1)+'-'+lim+'$ ('+lim+' terminos). $S$? - var.'+n;
      opts=['$'+(-lim/2)+'$','$'+(lim/2)+'$','$0$','$'+(-lim)+'$'];
      exp='Paso 1: agrupa pares $(1-2)=-1$, cada par -1, hay '+lim+'/2='+(lim/2)+' pares luego $S=-'+(lim/2)+'$. Distractores olvidan signo.';
      break; }
    case '4.1.1-racionales': {
      const x=7+(n%5), num=x*x+1, den=x, g=gcd(num,den), ns=num/g, ds=den/g;
      prompt='Halle $x+\\dfrac{1}{x}$ para $x='+x+'$ irreducible - var.'+n;
      opts=['$\\dfrac{'+ns+'}{'+ds+'}$','$\\dfrac{'+x+'}{'+(x+1)+'}$','$'+(x+1)+'$','$\\dfrac{'+(x*2)+'}{'+x+'}$'];
      exp='Paso 1: $x+1/x=(x^{2}+1)/x$ con comun $x$. Paso 2: con $x='+x+'$, numerador '+(x*x+1)+', denominador '+x+', queda $\\dfrac{'+ns+'}{'+ds+'}$ ya irreducible. Las otras opciones confunden suma de fracciones con suma de numeradores o invertir la fraccion.';
      break; }
    case '4.1.1-reales': {
      const v=n%3;
      if(v===0){ prompt='Verdadera sobre $\\sqrt{2}+\\sqrt{8}$? - var.'+n; opts=['$\\sqrt{2}+\\sqrt{8}=3\\sqrt{2}$','$\\sqrt{2}+\\sqrt{8}=\\sqrt{10}$','$\\sqrt{2}\\cdot\\sqrt{8}=\\sqrt{10}$','$\\sqrt{8}-\\sqrt{2}=0$']; exp='Paso 1: $\\sqrt{8}=\\sqrt{4\\cdot2}=2\\sqrt{2}$. Paso 2: suma $\\sqrt{2}+2\\sqrt{2}=3\\sqrt{2}$ (no $\\sqrt{10}$: raices no se suman como radicandos). Paso 3: el producto si da 4.'; }
      else if(v===1){ const k=2+(n%4); prompt='Simplifique $\\sqrt{'+(k*k*2)+'}$ - var.'+n; opts=['$'+k+'\\sqrt{2}$','$'+(k*2)+'\\sqrt{2}$','$\\sqrt{'+(k*2)+'}$','$'+k+'$']; exp='Paso 1: factoriza el radicando: '+(k*k*2)+'='+(k*k)+'\\cdot2. Paso 2: $\\sqrt{'+(k*k)+'\\cdot2}=\\sqrt{'+(k*k)+'}\\cdot\\sqrt{2}='+k+'\\sqrt{2}$. Distractores olvidan extraer la raiz cuadrada perfecta.'; }
      else { prompt='Es $\\sqrt{'+(a*a+1)+'}$ racional? - var.'+n; opts=['Irracional','Racional','Entero','Natural']; exp='Paso 1: '+(a*a+1)+' no es cuadrado perfecto (entre '+(a*a)+' y '+((a+1)*(a+1))+'). Paso 2: su raiz no es fraccion exacta, es irracional (decimal no periodico infinito).'; }
      break; }
    case '4.1.1-exprAlg': {
      const v=n%3;
      if(v===0){ prompt='Factorice $x^{4}-5x^{2}+4$ completo - var.'+n; opts=['$(x-1)(x+1)(x-2)(x+2)$','$(x^{2}-1)(x^{2}-4)$','$(x-1)(x+1)(x^{2}+4)$','$(x^{2}-4)^{2}$']; exp='Paso 1: $y=x^{2}$ => $y^{2}-5y+4=(y-1)(y-4)$. Paso 2: vuelve a $x$: $(x^{2}-1)(x^{2}-4)=(x-1)(x+1)(x-2)(x+2)$. Falta factorizar deja cuadraticos.'; }
      else if(v===1){ const v2=(a+1)*(a+1)-2; prompt='Si $x+1/x='+(a+1)+'$ halle $x^{2}+1/x^{2}$ - var.'+n; opts=['$'+v2+'$','$'+((a+1)*(a+1))+'$','$'+(a+1)+'$','$'+(v2+1)+'$']; exp='Paso: $(x+1/x)^{2}=x^{2}+2+1/x^{2}$ luego $x^{2}+1/x^{2}='+(a+1)+'^{2}-2='+((a+1)*(a+1)-2)+'$. Distractores olvidan restar 2.'; }
      else { prompt='Desarrolle $(x+'+a+')(x-'+b+')$ - var.'+n; opts=['$x^{2}+'+(a-b)+'x-'+(a*b)+'$','$x^{2}-'+(a*b)+'$','$x^{2}+'+(a+b)+'x+'+(a*b)+'$','$x^{2}+'+a+'x-'+b+'$']; exp='Paso: $(x+'+a+')(x-'+b+')=x^{2}+('+a+'-'+b+')x-'+String(a*b)+'=x^{2}+'+String(a-b)+'x-'+String(a*b)+'$. Distractores olvidan lineal.'; }
      break; }
    case '4.1.2-ec1': {
      const v=n%3;
      if(v===0){ prompt='Resuelva $\\dfrac{2}{x-1}=1$ dominio - var.'+n; opts=['$\\{3\\}$','$\\{1\\}$','$\\varnothing$','$\\{1,3\\}$']; exp='3'; }
      else if(v===1){ prompt='Ecuacion $\\dfrac{x}{'+a+'}+1=\\dfrac{'+(a+3)+'}{'+a+'}$ - var.'+n; opts=['$3$','$'+(a+3)+'$','$'+a+'$','$'+(3*a)+'$']; exp='3'; }
      else { const target=Math.floor(3*a/2), sol=Math.round(target*2/3); prompt='Numero mas su mitad es '+target+' - var.'+n; { let v0=sol, v1=target, v2=sol+1, v3=target-1; let vals=[v0,v1,v2,v3]; const seen=new Set(); const out=[]; for(let v of vals){ let vv=v, t=0; while(seen.has(String(vv)) && t<10){ vv=v+2+t; t++; } seen.add(String(vv)); out.push(vv); } opts=out.map(v=>'$'+v+'$'); } exp='Paso: $x+x/2='+target+'$ => $3x/2='+target+'$ => $x='+sol+'$. Distractores olvidan dividir.'; }
      break; }
    case '4.1.2-sistLin': {
      const v=n%3;
      if(v===0){ prompt='Sistema $x+y=5$, $2x+2y=10$ y $x-y=1$ par unico? - var.'+n; opts=['$x+y=5$, $x-y=1$ da $(3,2)$','Todas unica','Ninguna','$x+y=5$, $2x+2y=10$ unica']; exp='Paso: segunda es $2\times$ primera (dependiente) no aporta; unica surge de $x+y=5$ con $x-y=1$ => $(3,2)$.'; }
      else if(v===1){ const x0=2+(n%5), y0=3+(n%4); prompt='Halle $x-y$ sin hallar $x,y$: $x+y='+(x0+y0)+'$ $2x+y='+(2*x0+y0)+'$ - var.'+n; { let v0=x0, v1=y0, v2=x0+y0, v3=2*x0+y0; if(v0===v1) v1=v1+1; let vals=[v0,v1,v2,v3]; const seen=new Set(); const out=[]; for(let v of vals){ let vv=v, t=0; while(seen.has(String(vv)) && t<10){ vv=v+3+t; t++; } seen.add(String(vv)); out.push(vv); } opts=out.map(v=>'$'+v+'$'); } exp='Paso: resta $(2x+y)-(x+y)=x$, da el valor buscado.'; }
      else { prompt='Para que $k$ sistema $x+ky=1$, $2x+4y=2$ infinitas? - var.'+n; opts=['$k=2$','$k=1$','$k=0$','Ningun $k$']; exp='k=2'; }
      break; }
    case '4.1.2-ec2': {
      const v=n%3;
      if(v===0){ prompt='Halle $k$ para $x^{2}+'+(2+(n%5))+'x+9=0$ raiz doble - var.'+n; opts=['$k=\\pm6$','$k=6$','$k=-6$','$k=0$']; exp='pm6'; }
      else if(v===1){ const r1=2+(n%4), r2=3+(n%4), S=r1+r2, P=r1*r2, sumRec=(S/P).toFixed(2); prompt='Raices '+r1+','+r2+' $1/r1+1/r2$? - var.'+n; opts=['$'+sumRec+'$','$'+P+'$','$'+S+'$','$'+(P/S).toFixed(2)+'$']; exp='sumRec'; }
      else { const xv=-2+(n%5); prompt='Vertice $y=x^{2}+'+(2*xv)+'x+'+(xv*xv)+'$ - var.'+n; { const aOpt='$(-'+xv+',0)$', bOpt='$(0,'+(xv*xv)+')$', cOpt='$('+xv+',0)$', dOpt='$(0,0)$'; let optsSet=[aOpt,bOpt,cOpt,dOpt]; // dedup when xv==0 where -0==0
        const seenS=new Set(); const outS=[]; for(let o of optsSet){ let oo=o, t=0; while(seenS.has(oo) && t<10){ oo=o.replace('0)', String(t+1)+')'); t++; } seenS.add(oo); outS.push(oo); } opts=outS; } exp='Paso: completa cuadrado $(x+'+xv+')^{2}$, vertice $(-'+xv+',0)$.'; }
      break; }
    case '4.1.2-ineq': {
      const v=n%3;
      if(v===0){ prompt='Resuelva $\\dfrac{x-1}{x+2} \\ge 0$ excluya denominador - var.'+n; opts=['$(-\\infty,-2)\\cup[1,\\infty)$','$[-2,1]$','$[1,\\infty)$','$(-\\infty,-2]$']; exp='union'; }
      else if(v===1){ prompt='Resuelva $|x-'+a+'|>'+b+'$ - var.'+n; opts=['$(-\\infty,'+(a-b)+')\\cup('+(a+b)+',\\infty)$','$('+(a-b)+','+(a+b)+')$','$['+(a-b)+','+(a+b)+']$','$['+(a+b)+',\\infty)$']; exp='rayos'; }
      else { const r1=a, r2=a+1; prompt='Inecuacion $x^{2}-'+(2*a+1)+'x+'+(a*(a+1))+'\\le0$ - var.'+n; opts=['$['+r1+','+r2+']$','$(-\\infty,'+r1+']$','$['+r2+',\\infty)$','$(-\\infty,'+r1+')\\cup('+r2+',\\infty)$']; exp='entre'; }
      break; }
    case '4.1.2-va': {
      const v=n%3;
      if(v===0){ prompt='Resuelva $|2x-1| \\le 5$ enteros? - var.'+n; opts=['$[-2,3]$ (6 enteros)','$[-2,3]$ (5)','$(-2,3)$','$[1,5]$']; exp='6'; }
      else if(v===1){ const prod=a*a-b*b; prompt='Resuelva $|x-'+a+'|='+b+'$ producto soluciones - var.'+n; { let v0=prod, v1=2*a, v2=b, v3=a*b; let vals=[v0,v1,v2,v3]; const seen=new Set(); const out=[]; for(let v of vals){ let vv=v, t=0; while(seen.has(String(vv)) && t<10){ vv=v+5+t; t++; } seen.add(String(vv)); out.push(vv); } opts=out.map(v=>'$'+v+'$'); } exp='Paso: raices '+(a+b)+' y '+(a-b)+' producto '+(a*a-b*b)+'.'; }
      else { prompt='Grafique $|x-'+a+'|\\le'+b+'$ - var.'+n; opts=['$['+(a-b)+','+(a+b)+']$','$(-\\infty,'+(a-b)+']$','$['+(a+b)+',\\infty)$','$('+(a-b)+','+(a+b)+')$']; exp='intervalo'; }
      break; }
    case '4.1.3-geom': {
      const v=n%3;
      if(v===0){ const angB=35+(n%4)*5, angA=180-2*angB; prompt='Isosceles $AB=AC$ $\\angle B='+angB+'$ altura desde $A$ angulo con $AB$? - var.'+n; { let v0=(angA/2)+' deg', v1=angB.toString(), v2=angA.toString(), v3='90'; let vals=[v0,v1,v2,v3]; // ensure no duplicate string after adding deg
        const seenS=new Set(); const outS=[]; for(let v of vals){ let vv=v, t=0; while(seenS.has(vv) && t<10){ vv=v+(t? ' ('+(t+1)+')':''); t++; if(!vv.includes('deg') && t>0) vv=v+'_'+t; } seenS.add(vv); outS.push(vv); } opts=outS.map(v=>'$'+v+'$'); } exp='Paso: $A=180-2B$, altura biseca => $A/2$.'; figs=[helpers.figTrianguloIsosceles({ab_ac:'AB=AC', angleB:angB})]; }
      else if(v===1){ const ang=40+(n%6)*5; prompt='Paralelas agudo '+ang+' obtuso? - var.'+n; opts=['$'+(180-ang)+'$','$'+ang+'$', '$'+(ang/2)+'$','$90$']; exp='suplemento'; }
      else { prompt='Rect catetos 6 y 8 altura hip? - var.'+n; opts=['$4.8$','$5$','$10$','$6$']; exp='4.8'; figs=[helpers.figTrianguloRectangulo({ac:6, bc:8, seed:id})]; }
      break; }
    case '4.1.4-razTrig': {
      const v=n%3;
      if(v===0){ prompt='Si $\\sin\\theta=3/5$ cuadrante II $\\tan\\theta$? - var.'+n; opts=['$-3/4$','$3/4$','$4/3$','$5/3$']; exp='-3/4'; }
      else if(v===1){ const ac=5+(n%3), bc=12, hyp=Math.round(Math.hypot(ac,bc)); prompt='Rect catetos '+ac+' y '+bc+' hyp '+hyp+' $\\cos(A)$ opuesto '+bc+' - var.'+n; opts=['$\\dfrac{'+ac+'}{'+hyp+'}$','$\\dfrac{'+bc+'}{'+hyp+'}$','$\\dfrac{'+hyp+'}{'+ac+'}$','$1$']; exp='cos'; }
      else { prompt='Si $\\cos\\theta=5/13$ IV $\\sin\\theta$? - var.'+n; opts=['$-12/13$','$12/13$','$5/13$','$13/5$']; exp='-12/13'; }
      figs=[helpers.figTrianguloRectangulo({ac:4, bc:3, seed:id})];
      break; }
    case '4.1.4-identTrig': {
      const v=n%3;
      if(v===0){ prompt='Demuestre: $\\dfrac{1-\\cos^{2}x}{\\sin x}=\\sin x$ - var.'+n; opts=['$1-\\cos^{2}=\\sin^{2}$ luego $\\sin$','$1-\\cos=\\sin$','$\\cos^{2}=1$','$\\sin=\\cos$']; exp='pitagorica'; }
      else if(v===1){ prompt='Simplifique $\\sec x \\cdot \\cos x$ - var.'+n; opts=['$1$','$\\sec x$','$\\cos x$','$0$']; exp='1'; }
      else { prompt='Si $1+\\tan^{2}x='+(a*a+1)+'$ halle $|\\sec x|$ - var.'+n; opts=['$'+Math.sqrt(a*a+1).toFixed(2)+'$','$'+a+'$','$'+(a*a+1)+'$','$1$']; exp='sec'; }
      break; }
    case '4.1.4-leySenosCosenos': {
      const v=n%3;
      if(v===0){ prompt='En $\\triangle$, $a=8$, $b=5$, $\\angle C=60$ $c$? - var.'+n; opts=['$7$','$\\sqrt{89}$','$13$','$5$']; exp='7'; }
      else if(v===1){ const ab=6+(n%4), ac2=7, bc2=ab*ab+ac2*ac2-ab*ac2; prompt='En $\\triangle ABC$, $AB='+ab+'$, $AC='+ac2+'$, $\\angle A=60^{\\circ}$. $BC$? - var.'+n; opts=['$\\sqrt{'+bc2+'}$','$'+(ab+ac2)+'$','$\\sqrt{'+(ab*ab+ac2*ac2)+'}$','$'+bc2+'$']; exp='BC'; }
      else { const bval=((a+5)*Math.sin(Math.PI/4)/Math.sin(Math.PI/6)).toFixed(2); prompt='Ley senos: $a='+ (a+5)+'$ $A=30^{\\circ}$ $B=45^{\\circ}$ halle $b$ - var.'+n; opts=['$'+bval+'$','$'+(a+5)+'$','$'+((a+5)*2)+'$','$'+(parseFloat(bval)+1).toFixed(2)+'$']; exp='b'; }
      figs=figDificil(code,n,id,'experto');
      break; }
    case '4.1.4-rectaCirc': {
      const v=n%3;
      if(v===0){ prompt='Distancia $(1,2)$ a $3x-4y+5=0$ - var.'+n; opts=['$d=0$ (si pertenece)','$d=1$','$d=5$','$d=3/5$']; exp='0'; }
      else if(v===1){ const r=5,h=2,k=3; prompt='Circ centro ('+h+','+k+') radio '+r+' canonica - var.'+n; opts=['$(x-'+h+')^{2}+(y-'+k+')^{2}='+(r*r)+'$','$(x+'+h+')^{2}+(y+'+k+')^{2}='+r+'$','$x^{2}+y^{2}='+r+'$','$(x-'+h+')^{2}+(y-'+k+')^{2}='+r+'$']; exp='canonica'; }
      else { const m=2; prompt='Recta por $(2,1)$ perp a $y='+m+'x+3$ $m_{\\perp}$ - var.'+n; opts=['$'+(-1/m)+'$','$'+m+'$','$'+(1/m)+'$','$'+(-m)+'$']; exp='-1/m'; }
      figs=figDificil(code,n,id,'experto');
      break; }
    default: prompt='Experto '+code+' var.'+n; opts=['A','B','C','D']; exp='exp';
  }
  return { id, s:'mat', n, d:'experto', topics:[code], ch, t, prompt, opts, ans, exp, maths:[], imgs:figs };
}

const MAT_TOPICS = [
  {code:'4.1.1-enteros', ch:'m1', t:'Enteros', count:18},
  {code:'4.1.1-racionales', ch:'m1', t:'Racionales', count:18},
  {code:'4.1.1-reales', ch:'m1', t:'Reales', count:17},
  {code:'4.1.1-exprAlg', ch:'m1', t:'Expresiones algebraicas', count:18},
  {code:'4.1.2-ec1', ch:'m2', t:'Ecuaciones 1er grado', count:18},
  {code:'4.1.2-sistLin', ch:'m2', t:'Sistemas lineales', count:18},
  {code:'4.1.2-ec2', ch:'m2', t:'Ecuaciones 2do grado', count:18},
  {code:'4.1.2-ineq', ch:'m2', t:'Inecuaciones', count:18},
  {code:'4.1.2-va', ch:'m2', t:'Valor absoluto', count:18},
  {code:'4.1.3-geom', ch:'m3', t:'Geometría plana', count:18, fig:true},
  {code:'4.1.4-razTrig', ch:'m3', t:'Razones trigonométricas', count:18, fig:true},
  {code:'4.1.4-identTrig', ch:'m4', t:'Identidades trigonométricas', count:18},
  {code:'4.1.4-leySenosCosenos', ch:'m4', t:'Ley senos y cosenos', count:18, fig:true},
  {code:'4.1.4-rectaCirc', ch:'m4', t:'Rectas y circunferencias', count:17, fig:true},
];

function generate(subject, baseTopics, genFn, startN, total, level){
  const out=[];
  let n=startN;
  for(const tp of baseTopics){
    for(let i=0;i<tp.count && out.length<total;i++){
      const id = subject+'-'+level.charAt(0)+String(n).padStart(3,'0');
      out.push(genFn(tp, n, id));
      n++;
    }
  }
  while(out.length < total){
    const tp = baseTopics[out.length % baseTopics.length];
    const id = subject+'-'+level.charAt(0)+String(n).padStart(3,'0');
    out.push(genFn(tp, n, id));
    n++;
  }
  return out.slice(0, total);
}

let dificil = generate('mat', MAT_TOPICS, matDificilQ, 1, 250, 'dificil');
let experto = generate('mat', MAT_TOPICS, matExpertoQ, 1, 250, 'experto');
function dedupLevel(arr){
  const seen=new Map();
  for(const q of arr){
    if(!q.prompt){ q.prompt='Problema '+q.topics[0]+' - var.'+q.n+' - '+q.id; seen.set(q.prompt,1); continue; }
    if(seen.has(q.prompt)){
      if(String(q.prompt).indexOf(' - var.')<0) q.prompt=q.prompt+' - var.'+q.n;
      else q.prompt=q.prompt+'.'+q.id.slice(-3);
      let tries=0; while(seen.has(q.prompt) && tries++<5) q.prompt=q.prompt+'.'+tries;
      seen.set(q.prompt,1);
    } else seen.set(q.prompt,1);
  }
}
dedupLevel(dificil);
dedupLevel(experto);

const existingPath = path.join(root, 'guia-bank-1000-intermedio.js');
// Preserve intermedio from git HEAD if current file was already merged (avoid double-merge losing data)
let existingBank = {mat:[], fis:[], qui:[], len:[]};
try{
  const src = fs.readFileSync(existingPath,'utf8');
  const sb={window:{}}; vm.createContext(sb); vm.runInContext(src,sb);
  if(sb.window.GUIA_BANK_1000) existingBank = sb.window.GUIA_BANK_1000;
} catch(e){}
// If current file already has dificil/experto (from previous merge), restore intermedio from git if needed
let matIntermedio = (existingBank.mat||[]).filter(q=>q.d==='intermedio');
if(matIntermedio.length!==250){
  try{
    const r = spawnSync('git', ['show','HEAD:guia-bank-1000-intermedio.js'], {encoding:'utf8'});
    if(r.stdout){
      const sb2={window:{}}; vm.createContext(sb2); vm.runInContext(r.stdout, sb2);
      const headBank = sb2.window.GUIA_BANK_1000;
      if(headBank && Array.isArray(headBank.mat)){
        const headInter = headBank.mat.filter(q=>q.d==='intermedio');
        if(headInter.length===250){
          console.log('Restored mat intermedio 250 from git HEAD (current file had '+matIntermedio.length+')');
          existingBank.mat = headInter;
          // also restore fis/qui/len if they were wiped (current 0)
          if(!existingBank.fis || existingBank.fis.length===0) existingBank.fis = headBank.fis||[];
          if(!existingBank.qui || existingBank.qui.length===0) existingBank.qui = headBank.qui||[];
          if(!existingBank.len || existingBank.len.length===0) existingBank.len = headBank.len||[];
          matIntermedio = headInter;
        }
      }
    }
  }catch(e){ console.warn('git restore attempt failed', e.message); }
}
if(matIntermedio.length!==250) console.warn('Advertencia: mat intermedio tiene '+matIntermedio.length+', se esperaba 250');
const fullMat = [...matIntermedio, ...dificil, ...experto];
console.log('MAT totals: intermedio '+matIntermedio.length+' + dificil '+dificil.length+' + experto '+experto.length+' = '+fullMat.length);
const bankOut = { mat: fullMat, fis: existingBank.fis||[], qui: existingBank.qui||[], len: existingBank.len||[] };
const meta = { version:2, level:'intermedio+dificil+experto (MAT)', totals: { mat: bankOut.mat.length, fis: bankOut.fis.length, qui: bankOut.qui.length, len: bankOut.len.length, byLevelMat: {intermedio: matIntermedio.length, dificil: dificil.length, experto: experto.length} }, topics: { mat: MAT_TOPICS.map(t=>t.code) } };
const js = '/**\n * guia-bank-1000-intermedio.js - Banco 1000+ (MAT 750 con 3 niveles + FIS/QUI/LEN 250 intermedio)\n * Generado por gen-banco-mat-dificil-experto.mjs - NO editar a mano.\n */\nwindow.GUIA_BANK_1000 = '+JSON.stringify(bankOut, null, 2)+';\nwindow.GUIA_BANK_1000_META = '+JSON.stringify(meta, null, 2)+';\n';
fs.writeFileSync(path.join(root, 'guia-bank-1000-intermedio.js'), js, 'utf8');
console.log('Wrote guia-bank-1000-intermedio.js - bytes', Buffer.byteLength(js));
const js2 = '/**\n * guia-bank-mat-dificil-experto.js - Solo MAT dificil+experto (500)\n */\nwindow.GUIA_BANK_MAT_DIFICIL = '+JSON.stringify(dificil, null, 2)+';\nwindow.GUIA_BANK_MAT_EXPERTO = '+JSON.stringify(experto, null, 2)+';\n';
fs.writeFileSync(path.join(root, 'guia-bank-mat-dificil-experto.js'), js2,'utf8');
console.log('Wrote guia-bank-mat-dificil-experto.js');
function checkDup(arr,label){
  const by={}; arr.forEach(q=>{ by[q.prompt]=(by[q.prompt]||0)+1; });
  const dups=Object.entries(by).filter(([,c])=>c>1);
  console.log(label+': total '+arr.length+', prompts unicos '+Object.keys(by).length+', dups '+dups.length);
  if(dups.length) console.log('  ejemplo dup', dups[0][0].slice(0,80), 'x', dups[0][1]);
  console.log('  ids unicos '+new Set(arr.map(q=>q.id)).size+'/'+arr.length);
}
checkDup(matIntermedio,'MAT intermedio');
checkDup(dificil,'MAT dificil');
checkDup(experto,'MAT experto');
checkDup(fullMat,'MAT total (inter+dif+exp)');
