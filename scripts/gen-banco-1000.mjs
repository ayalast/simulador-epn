/**
 * gen-banco-1000.mjs — Genera 320 preguntas (80×4) nivel intermedio balanceadas
 * Usa fig-helpers inline SVG para GEO/FIS. Ejecuta: node scripts/gen-banco-1000.mjs [--only mat|fis|qui|len] [--count 80]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'node:url';
import * as helpers from './fig-helpers.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const outPath = path.join(root, 'guia-bank-1000-intermedio.js');

function shuffle(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); const t=a[i];a[i]=a[j];a[j]=t; } return a; }
function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

// ---------- MAT helpers ----------
// 80 base counts escalan linealmente para 250 (×3.125): counts se multiplican en generate()
const MAT_BASE = [
  {code:'4.1.1-enteros', ch:'m1', t:'Enteros', count:6},
  {code:'4.1.1-racionales', ch:'m1', t:'Racionales', count:6},
  {code:'4.1.1-reales', ch:'m1', t:'Reales', count:5},
  {code:'4.1.1-exprAlg', ch:'m1', t:'Expresiones algebraicas', count:8},
  {code:'4.1.2-ec1', ch:'m2', t:'Ecuaciones 1er grado', count:6},
  {code:'4.1.2-sistLin', ch:'m2', t:'Sistemas lineales', count:6},
  {code:'4.1.2-ec2', ch:'m2', t:'Ecuaciones 2do grado', count:7},
  {code:'4.1.2-ineq', ch:'m2', t:'Inecuaciones', count:6},
  {code:'4.1.2-va', ch:'m2', t:'Valor absoluto', count:5},
  {code:'4.1.3-geom', ch:'m3', t:'Geometría plana', count:8, fig:true},
  {code:'4.1.4-razTrig', ch:'m3', t:'Razones trigonométricas', count:4, fig:true},
  {code:'4.1.4-identTrig', ch:'m4', t:'Identidades trigonométricas', count:4},
  {code:'4.1.4-leySenosCosenos', ch:'m4', t:'Ley senos y cosenos', count:4, fig:true},
  {code:'4.1.4-rectaCirc', ch:'m4', t:'Rectas y circunferencias', count:5, fig:true},
];
function topicsScaled(base, total){ if(total<=80) return base; return base.map(tp=>({ ...tp, count: Math.max(1, Math.round(tp.count*total/80)) })); }
const MAT_TOPICS = MAT_BASE;

const FIS_TOPICS = [
  {code:'4.2.1-1raNewton', ch:'f1', t:'1ra ley de Newton', count:6},
  {code:'4.2.1-vectores', ch:'f1', t:'Vectores', count:6, fig:'vector'},
  {code:'4.2.1-equilibrio', ch:'f1', t:'Equilibrio', count:5, fig:'dcl'},
  {code:'4.2.1-cinemRecta', ch:'f1', t:'Cinemática rectilínea', count:6, fig:'vector'},
  {code:'4.2.1-caida', ch:'f1', t:'Caída libre', count:5, fig:'caida'},
  {code:'4.2.1-proyectiles', ch:'f1', t:'Proyectiles', count:6, fig:'proyectil'},
  {code:'4.2.2-2daNewton', ch:'f2', t:'2da ley Newton', count:6, fig:'dcl'},
  {code:'4.2.2-roceResistencia', ch:'f2', t:'Roce y resistencia', count:5, fig:'plano'},
  {code:'4.2.2-3raNewton', ch:'f2', t:'3ra ley Newton', count:5, fig:'dcl'},
  {code:'4.2.2-circular', ch:'f2', t:'Movimiento circular', count:5, fig:'circular'},
  {code:'4.2.2-impulsoCML', ch:'f2', t:'Impulso y CML', count:5},
  {code:'4.2.3-trabajoPotencia', ch:'f3', t:'Trabajo y potencia', count:5, fig:'trabajo'},
  {code:'4.2.3-energiaCinetica', ch:'f3', t:'Energía cinética', count:5},
  {code:'4.2.3-energiaPotencial', ch:'f3', t:'Energía potencial', count:5},
  {code:'4.2.3-consEnergia', ch:'f3', t:'Conservación energía', count:5, fig:'trabajo'},
];

const QUI_TOPICS_80 = [
  {code:'4.3.1-unidades', ch:'q1', t:'Unidades', count:5},
  {code:'4.3.1-materia', ch:'q1', t:'Materia', count:5},
  {code:'4.3.1-particulas', ch:'q1', t:'Partículas', count:5},
  {code:'4.3.1-configElectronica', ch:'q1', t:'Config. electrónica', count:5},
  {code:'4.3.2-tablaPeriodica', ch:'q2', t:'Tabla periódica', count:5},
  {code:'4.3.2-propPeriodicas', ch:'q2', t:'Propiedades periódicas', count:5},
  {code:'4.3.2-nomInorganica', ch:'q2', t:'Nomenclatura', count:5},
  {code:'4.3.3-enlaceIonico', ch:'q3', t:'Enlace iónico', count:5},
  {code:'4.3.3-enlaceCovalente', ch:'q3', t:'Enlace covalente', count:5},
  {code:'4.3.3-Lewis', ch:'q3', t:'Estructuras Lewis', count:5},
  {code:'4.3.3-geomMolec', ch:'q3', t:'Geometría molecular', count:5},
  {code:'4.3.3-fuerzasInter', ch:'q3', t:'Fuerzas intermoleculares', count:5},
  {code:'4.3.4-mol', ch:'q4', t:'Concepto mol', count:5},
  {code:'4.3.4-formEmpMol', ch:'q4', t:'Fórmula empírica', count:5},
  {code:'4.3.4-reacciones', ch:'q4', t:'Reacciones', count:5},
  {code:'4.3.4-esteqReactivoLim', ch:'q4', t:'Estequiometría', count:5},
];
const QUI_TOPICS = QUI_TOPICS_80;
const FIS_BASE = FIS_TOPICS;
const QUI_BASE = QUI_TOPICS;

const LEN_BASE = [
  {code:'4.4.1-comunicacion', ch:'l1', t:'Comunicación', count:9},
  {code:'4.4.1-razonLogica', ch:'l1', t:'Razón y pensamiento', count:9},
  {code:'4.4.1-juiciosValor', ch:'l1', t:'Juicios de valor', count:9},
  {code:'4.4.2-razLogico', ch:'l2', t:'Razonamiento lógico', count:9},
  {code:'4.4.2-analisisTexto', ch:'l2', t:'Análisis de textos', count:9},
  {code:'4.4.2-lecturaCritica', ch:'l2', t:'Lectura crítica', count:9},
  {code:'4.4.3-constrParrafo', ch:'l3', t:'Construcción párrafo', count:9},
  {code:'4.4.3-argumentacionFalacias', ch:'l3', t:'Falacias', count:9},
  {code:'4.4.3-puntuacionConcordancia', ch:'l3', t:'Puntuación', count:8},
];
const LEN_TOPICS = LEN_BASE;

function figForMat(topic, id){
  // Llamado desde matQuestion con acceso a n y a valores ac,bc,angleB etc. via closure en switch
  // Aquí solo fallback genérico si se llama fuera del switch
  const seed=id;
  if(topic==='4.1.3-geom') return [helpers.figTriangulo({a:6,b:5,c:7, seed, labels:{A:'A',B:'B',C:'C'}})];
  if(topic==='4.1.4-razTrig') return [helpers.figTriangulo({a:3,b:4,c:5, seed, labels:{A:'A',B:'B',C:'C'}})];
  if(topic==='4.1.4-leySenosCosenos') return [helpers.figTrianguloLeyCosenos({ab:5,ac:7,angleA:60})];
  if(topic==='4.1.4-rectaCirc') return [helpers.figParalelas({angulo:38})];
  return [];
}
function figForMatRectangulo(ac, bc, id){ return [helpers.figTrianguloRectangulo({ac, bc, labels:{A:'A',B:'B',C:'C'}, seed:id})]; }
function figForMatIsosceles(angleB, id){ return [helpers.figTrianguloIsosceles({ab_ac:'AB=AC', angleB, labels:{A:'A',B:'B',C:'C'}})]; }
function figForMatLeyCosenos(ab, ac, angleA, id){ return [helpers.figTrianguloLeyCosenos({ab, ac, angleA, labels:{A:'A',B:'B',C:'C'}})]; }
function figForMatRecta(ax,ay,bx,by, id){ return [helpers.figPlanoRecta({ax,ay,bx,by, labels:{A:'A',B:'B'}})]; }
function figForFis(figType, id, vars={}){
  if(figType==='vector') return [helpers.figVector({vx: vars.vx||3, vy: vars.vy||4})];
  if(figType==='dcl') return [helpers.figDCL({forces:[{label:'F₁', fx:30, fy:8},{label:'F₂', fx:-12, fy:16}], title:'DCL'})];
  if(figType==='caida') return [helpers.figProyectil({v0:0, ang:90, h0:vars.h||20})];
  if(figType==='proyectil') return [helpers.figProyectil({v0: vars.v0||22, ang: vars.ang||37, h0:0})];
  if(figType==='plano') return [helpers.figPlanoInclinado({theta: vars.theta||30, mu: vars.mu||0.2, m: vars.m||2})];
  if(figType==='circular') return [helpers.figCircular({r: vars.r||6, omega: vars.o||3})];
  if(figType==='trabajo') return [helpers.figTrabajoEnergia()];
  return [];
}

// ---------- Generadores por materia (plantillas) ----------
function matQuestion(topic, n, id){
  const ch = topic.ch, t = topic.t, code=topic.code;
  // plantillas abarcables: cada topic tiene 3-4 variantes con números aleatorizados
  let prompt, opts, ans, exp, maths=[];
  const a = 2 + (n%5), b = 3 + (n%4), c = 5 + (n%3);
  let figs = topic.fig ? figForMat(code, id) : [];
  switch(code){
    case '4.1.1-enteros': {
      const x = -7 - (n%6), y = 4 + (n%5);
      const res = x + y + y;
      // ensure 4 distinct: res, res+2, res-2, -res distinct
      let eOpts=[res+2, res-2, -res];
      if(eOpts[0]===res) eOpts[0]=res+1;
      if(eOpts[1]===res || eOpts[1]===eOpts[0]) eOpts[1]=res+3;
      if(eOpts[2]===res || eOpts[2]===eOpts[0] || eOpts[2]===eOpts[1]) eOpts[2]=res+4;
      prompt = `Calcule $${x} + ${y} - (${-y})$ y seleccione el resultado correcto.`;
      opts = [`$${res}$`, `$${eOpts[0]}$`, `$${eOpts[1]}$`, `$${eOpts[2]}$`];
      ans=0; maths=[`${x}+${y}`];
      exp = `Paso 1: ${x}+${y}=${x+y}. Paso 2: restar $(${ -y})$ es sumar ${y}: ${x+y}+${y}=${res}. Las otras opciones confunden el signo del paréntesis o duplican el error de signo. Por eso la correcta es $${res}$.`;
      break; }
    case '4.1.1-racionales': {
      const p = 2 + (n%3), q = 3 + (n%4), r = 4 + (n%5);
      const num = p*r + q, den = q*r;
      const g = ((a,b)=>{ while(b){ const t=a%b; a=b; b=t;} return a;})(num,den);
      const ns=num/g, ds=den/g;
      // ensure 4 numerically distinct fractions
      const correctVal = ns/ds;
      const valOf = (cn,cd)=>cn/cd;
      let cands = [[num,den],[num+1,den],[ns+1,ds],[num-1,den],[ns,ds+1],[ns+2,ds]];
      let distracts=[];
      for(let pair of cands){
        if(distracts.length>=3) break;
        let v=valOf(pair[0],pair[1]);
        if(Math.abs(v-correctVal)>1e-9 && !distracts.some(d=>Math.abs(valOf(d[0],d[1])-v)<1e-9)){
          let gg=((a,b)=>{while(b){let t=a%b;a=b;b=t;}return a;})(pair[0],pair[1]);
          distracts.push([pair[0]/gg, pair[1]/gg]);
        }
      }
      while(distracts.length<3) distracts.push([ns+distracts.length+1, ds]);
      prompt = `Simplifique $\\dfrac{${p}}{${q}} + \\dfrac{1}{${r}}$ y elija la fracción irreducible.`;
      opts = [`$\\dfrac{${ns}}{${ds}}$`, ...distracts.slice(0,3).map(d=> `$\\dfrac{${d[0]}}{${d[1]}}$`)];
      ans=0;
      exp = `Común denominador $${q}\\cdot ${r}=${den}$: $\\frac{${p}\\cdot ${r}}{${den}}+\\frac{${q}}{${den}}=\\frac{${num}}{${den}}=\\frac{${ns}}{${ds}}$ irreducible. Paso desde cero: suma con común denominador y luego simplifica dividiendo por el MCD ${g}. Los distractores olvidan simplificar o suman numeradores sin común denominador.`;
      break; }
    case '4.1.1-reales': {
      prompt = `Ordene de menor a mayor: $\\sqrt{${a*a+1}}$, $\\dfrac{${a*b}}{${b}}$, $\\pi$ aproximado $3.14$. ¿Cuál es el menor?`;
      const vals = [Math.sqrt(a*a+1), a, 3.14].map((v,i)=>({v,i}));
      vals.sort((x,y)=>x.v-y.v);
      const labels=[`$\\sqrt{${a*a+1}}$`, `$\\dfrac{${a*b}}{${b}} = ${a}$`, `$\\pi$`];
      const order = vals.map(x=>labels[x.i]);
      // queremos preguntar cuál es el menor → respuesta es order[0]
      const correctLabel = order[0];
      // opts fijas con las 3 + un distractor
      opts = labels.concat([`$\\sqrt{${a*a+2}}$`]);
      ans = opts.indexOf(correctLabel);
      exp = `Aproxima: $\\sqrt{${a*a+1}}\\approx ${Math.sqrt(a*a+1).toFixed(2)}$, $\\frac{${a*b}}{${b}}=${a}$, $\\pi\\approx 3.14$. El menor es ${correctLabel}. Comparar sin aproximar lleva a error.`;
      break; }
    case '4.1.1-exprAlg': {
      prompt = `Si $P(x)=${a}x^{2} - ${b}x + ${c}$, calcule $P(${-b}$)$.`;
      const xv = -b;
      const pv = a*xv*xv - b*xv + c;
      opts = [`$${pv}$`, `$${pv+ b}$`, `$${pv - a}$`, `$${-pv}$`];
      ans=0;
      exp = `Reemplazo directo: $P(${-b}$)=${a}(${xv})^{2}-${b}(${xv})+${c}=${a*xv*xv} ${-b*xv>=0?'+':''}${-b*xv}+${c}=${pv}$. Olvidar el signo de $x$ o el cuadrado genera los distractores.`;
      break; }
    case '4.1.2-ec1': {
      const sol = 3 + (n%5);
      prompt = `Resuelva $\\dfrac{${a}x}{${b}} = \\dfrac{${a*sol}}{${b}}$ y halle $x$.`;
      // ensure 4 distinct opts: sol, sol+1, sol-1, -sol are distinct unless sol=0
      let candEc1 = [sol+1, Math.floor(sol*b/a), -sol, sol+2];
      // ensure sol*b/a distinct from others
      if(candEc1[1]===sol || candEc1[1]===sol+1 || candEc1[1]===-sol) candEc1[1]=sol+3;
      opts = [`$${sol}$`, `$${candEc1[0]}$`, `$${candEc1[1]}$`, `$${candEc1[2]}$`];
      // if still duplicate, tweak
      let seenEc1=new Set([sol]); for(let i=1;i<opts.length;i++){ let v=candEc1[i-1]; let tries=0; while(seenEc1.has(v) && tries++<5) v+=1; seenEc1.add(v); opts[i]=`$${v}$`; }
      ans=0;
      exp = `Multiplica por $${b}$: $${a}x=${a*sol}$ de donde $x=${sol}$. Confundir $a/b$ con $b/a$ da $${Math.floor(sol*b/a)}$ o cambiar de signo da $${-sol}$.`;
      break; }
    case '4.1.2-sistLin': {
      const x0=2+(n%5), y0=1+(n%7);
      const eq1 = 2*x0 + y0, eq2 = x0 + y0;
      prompt = `Resuelva $\\begin{cases} 2x+y=${eq1} \\\\ x+y=${eq2} \\end{cases}$ y halle $x$.`;
      // ensure 4 distinct
      let d1=y0, d2=x0+1, d3=x0-1;
      if(d1===x0) d1=x0+2;
      if(d2===x0||d2===d1) d2=x0+3;
      if(d3===x0||d3===d1||d3===d2) d3=x0-2;
      opts = [`$${x0}$`, `$${d1}$`, `$${d2}$`, `$${d3}$`];
      ans=0;
      exp = `Resta ambas: $(2x+y)-(x+y)=x=${eq1}-${eq2}=${x0}$. Sustituyendo $y=${eq2}-${x0}=${y0}$. Intercambiar $x$ con $y$ es el distractor típico.`;
      break; }
    case '4.1.2-ec2': {
      // x^2 - Sx + P =0 con raíces r1,r2 pequeñas
      const r1=2+(n%3), r2=3+(n%3);
      const S=r1+r2, P=r1*r2;
      prompt = `Halle el producto de las raíces de $x^{2} - ${S}x + ${P}=0$ sin resolverla completamente.`;
      opts = [`$${P}$`, `$${S}$`, `$${-P}$`, `$${r1}$`];
      ans=0;
      exp = `Por Vieta, para $ax^{2}+bx+c=0$, $x_{1}x_{2}=c/a=${P}$. No hace falta hallar $${r1}$ y $${r2}$ aunque factorizando $(x-${r1})(x-${r2})=0$ se verifican. Confundir suma con producto da el distractor $${S}$.`;
      break; }
    case '4.1.2-ineq': {
      const k = 2+(n%4);
      prompt = `Resuelva $-3x + ${k} < ${k+6}$ y exprese el conjunto solución en intervalos.`;
      // -3x <6 => x > -2
      opts = [`$(-2,\\infty)$`, `$(-\\infty,-2)$`, `$[-2,\\infty)$`, `$(-2,2)$`];
      ans=0;
      exp = `$-3x < 6$ dividiendo entre $-3$ se invierte: $x > -2$ que es $(-2,\\infty)$. Olvidar invertir el signo o cerrar el extremo genera los distractores.`;
      break; }
    case '4.1.2-va': {
      prompt = `Resuelva $|${a}x - ${b}| = ${c}$ y halle la suma de sus soluciones.`;
      const x1 = (b+c)/a, x2=(b-c)/a;
      const sum = x1+x2;
      const sumStr = Number.isInteger(sum)? `${sum}` : `\\frac{${b*2}}{${a}}`;
      let d1 = `${c}`, d2 = isFinite(x1) ? `${x1.toFixed(1).replace(/\.0$/,'')}` : `${c+1}`, d3 = `${b}`;
      let seenVa=new Set([sumStr]);
      if(seenVa.has(d1)){ d1=`${c+1}`; if(seenVa.has(d1)) d1=`${c+2}`; } seenVa.add(d1);
      if(seenVa.has(d2) || d2===d1){ d2=`${(x1+2).toFixed(1).replace(/\.0$/,'')}`; if(seenVa.has(d2)) d2=`${(x1+3).toFixed(1).replace(/\.0$/,'')}`; } seenVa.add(d2);
      if(seenVa.has(d3)){ d3=`${b+2}`; if(seenVa.has(d3)) d3=`${b+3}`; } seenVa.add(d3);
      // ensure opts distinct by string
      opts = [`$${sumStr}$`, `$${d1}$`, `$${d2}$`, `$${d3}$`];
      ans=0;
      exp = `$|${a}x-${b}|=${c}$ equivale a $${a}x-${b}=${c}$ o $${a}x-${b}=-${c}$; de ahí $x_{1}=\\frac{${b+c}}{${a}}$ y $x_{2}=\\frac{${b-c}}{${a}}$. La suma es $x_{1}+x_{2}=\\frac{2\\cdot ${b}}{${a}}=${sumStr}$. Tomar solo una rama es el error típico.`;
      break; }
    case '4.1.3-geom': {
      const variants = n%4;
      if(variants<2){
        const ang = 38+(n%12);
        prompt = `Dos rectas paralelas $l_{1}\\parallel l_{2}$ son cortadas por una transversal $t$ como en la figura. Si uno de los ángulos agudos mide $${ang}^\\circ$, ¿cuánto mide su correspondiente en la otra paralela?`;
        opts = [`$${ang}^\\circ$`, `$${180-ang}^\\circ$`, `$${ang+10}^\\circ$`, `$${90}^\\circ$`];
        ans=0;
        exp = `Ángulos correspondientes entre paralelas son congruentes: miden lo mismo, $${ang}^\\circ$. El suplemento $${180-ang}^\\circ$ corresponde a ángulos conjugados, no correspondientes.`;
        figs = [helpers.figParalelas({angulo: ang})];
      } else {
        const angB = 50+(n%10);
        const angA = 180-2*angB;
        prompt = `En el triángulo $ABC$ de la figura, $AB=AC$ (isósceles en $A$). Si $\\angle B=${angB}^\\circ$, halle $\\angle A$.`;
        opts = [`$${angA}^\\circ$`, `$${angB}^\\circ$`, `$${180-angB}^\\circ$`, `$${angA+10}^\\circ$`];
        ans=0;
        exp = `En isósceles base $BC$, $\\angle B=\\angle C=${angB}^\\circ$; suma interior $180^\\circ$ da $\\angle A=180^\\circ-2\\cdot ${angB}^\\circ=${angA}^\\circ$.`;
        figs = figForMatIsosceles(angB, id);
      }
      break; }
    case '4.1.4-razTrig': {
      const ac=3+(n%3), bc=4+(n%2);
      const hyp=Math.hypot(ac,bc);
      const hypI=Math.round(hyp);
      let ropts = [`$\\dfrac{${bc}}{${hypI}}$`, `$\\dfrac{${ac}}{${hypI}}$`, `$\\dfrac{${hypI}}{${bc}}$`, `$\\dfrac{${bc}}{${ac}}$`];
      // ensure distinct: if ac==bc duplicates first two
      if(ac===bc) ropts[1]=`$\\dfrac{${ac+1}}{${hypI}}$`;
      prompt = `En el triángulo rectángulo de la figura (recto en $C$), $AC=${ac}$ y $BC=${bc}$. Calcule $\\sin(A)$.`;
      opts = ropts;
      ans=0;
      exp = `$\\sin(A)=\\frac{\\text{opuesto a }A}{\\text{hipotenusa}}=\\frac{BC}{AB}=\\frac{${bc}}{${hypI}}$. Intercambiar catetos o invertir la fracción da los distractores.`;
      figs = figForMatRectangulo(ac, bc, id);
      break; }
    case '4.1.4-identTrig': {
      prompt = `Simplifique $\\dfrac{\\sin^{2}x + \\cos^{2}x}{\\sec x}$ a su mínima expresión.`;
      opts = [`$\\cos x$`, `$\\sin x$`, `$1$`, `$\\sec x$`];
      ans=0;
      exp = `Pitagórica: $\\sin^{2}x+\\cos^{2}x=1$; queda $\\frac{1}{\\sec x}=\\cos x$. Confundir recíproca o dejar $1$ es el error.`;
      break; }
    case '4.1.4-leySenosCosenos': {
      const ang=60;
      prompt = `En $\\triangle ABC$, $AB=5$, $AC=7$ y $\\angle A=60^\\circ$ (ver figura). Halle $BC$ usando ley de cosenos.`;
      const bc2 = Math.round(25+49-2*5*7*Math.cos(Math.PI/3));
      opts = [`$\\sqrt{${bc2}}$`, `$\\sqrt{${25+49}}$`, `$${bc2}$`, `$\\sqrt{${bc2+10}}$`];
      ans=0;
      exp = `$BC^{2}=AB^{2}+AC^{2}-2\\cdot AB\\cdot AC\\cos A =25+49-35=${bc2}$, luego $BC=\\sqrt{${bc2}}$. Olvidar el término $-2ab\\cos$ da $\\sqrt{74}$.`;
      figs = figForMatLeyCosenos(5, 7, 60, id);
      break; }
    case '4.1.4-rectaCirc': {
      const bx = a+2, by = b+4;
      const m = (by - b)/(bx - a);
      prompt = `Halle la pendiente $m$ de la recta que pasa por $A(${a},${b})$ y $B(${bx},${by})$.`;
      opts = [`$${m}$`, `$\\frac{1}{${m}}$`, `$${-m}$`, `$${m+1}$`];
      ans=0;
      exp = `$m=\\frac{y_{2}-y_{1}}{x_{2}-x_{1}}=\\frac{${by}-${b}}{${bx}-${a}}=\\frac{4}{2}=${m}$. Invertir el cociente o el signo son los errores.`;
      figs = figForMatRecta(a,b,bx,by, id);
      break; }
    default: {
      prompt = `Simplifique $\\frac{x^{2}-9}{x-3}$ para $x\\neq 3$.`;
      opts=[`$x+3$`,`$x-3$`,`$x^{2}+3$`,`$x$`];
      ans=0;
      exp=`Factor: $x^{2}-9=(x-3)(x+3)$, cancelando $(x-3)$ queda $x+3$.`;
    }
  }
  return { id, s:'mat', n, d:'intermedio', topics:[code], ch, t, prompt, opts, ans, exp, maths, imgs:figs };
}

function fisQuestion(topic, n, id){
  const ch=topic.ch, t=topic.t, code=topic.code;
  let prompt, opts, ans, exp, figs=[];
  switch(code){
    case '4.2.1-1raNewton':
      prompt=`Un bloque permanece en reposo sobre una mesa horizontal sin rozamiento. ¿Cuál es la fuerza neta sobre él?`;
      opts=[`$0$`, `$mg$`, `$N$`, `$mg+N$`]; ans=0;
      exp=`Reposo implica equilibrio: $\\sum \\vec F=\\vec 0$ por 1ra ley; $\\vec N+\\vec W=0$ vectorialmente. El peso y la normal no son la neta, se cancelan.`;
      break;
    case '4.2.1-vectores': {
      const vx=3+(n%3), vy=4+(n%2);
      const mag=Math.hypot(vx,vy).toFixed(1).replace(/\\.0$/,'');
      prompt=`El vector $\\vec v$ tiene componentes $v_x=${vx}$ y $v_y=${vy}$ (ver figura). Calcule su módulo $|\\vec v|$.`;
      opts=[`$${mag}$`, `$${vx+vy}$`, `$${vx*vy}$`, `$${(mag*1.5).toFixed(1)}$`]; ans=0;
      figs=figForFis('vector', id, {vx,vy});
      exp=`$|\\vec v|=\\sqrt{v_x^{2}+v_y^{2}}=\\sqrt{${vx}^{2}+${vy}^{2}}=\\sqrt{${vx*vx+vy*vy}}=${mag}$. Sumar componentes sin Pitágoras es el error.`;
      break; }
    case '4.2.1-equilibrio':
      prompt=`Un semáforo de peso $W=100\\,\\mathrm{N}$ cuelga de dos cables simétricos que forman $30^\\circ$ con la vertical (figura DCL). Halle la tensión $T$ en cada cable.`;
      opts=[`$\\tfrac{100}{2\\cos30^\\circ}\\approx57.7\\,\\mathrm{N}$`, `$50\\,\\mathrm{N}$`, `$100\\,\\mathrm{N}$`, `$86.6\\,\\mathrm{N}$`]; ans=0;
      figs=figForFis('dcl', id);
      exp=`Equilibrio vertical: $2T\\cos30^\\circ=W$ de donde $T=W/(2\\cos30^\\circ)\\approx57.7\\,\\mathrm{N}$. Dividir solo entre 2 olvida la componente vertical.`;
      break;
    case '4.2.1-cinemRecta': {
      const v0=5+(n%5), a=2+(n%3), t=3+(n%2);
      const v=v0+a*t;
      prompt=`Un móvil parte con $v_0=${v0}\\,\\mathrm{m/s}$ y acelera a $a=${a}\\,\\mathrm{m/s^{2}}$ durante $t=${t}\\,\\mathrm{s}$. Halle su velocidad final.`;
      opts=[`$${v}\\,\\mathrm{m/s}$`, `$${v0}\\,\\mathrm{m/s}$`, `$${a*t}\\,\\mathrm{m/s}$`, `$${v+5}\\,\\mathrm{m/s}$`]; ans=0;
      figs=figForFis('vector', id, {vx:v0, vy:0});
      exp=`MRUV: $v=v_0+at=${v0}+${a}\\cdot ${t}=${v}\\,\\mathrm{m/s}$. Olvidar $v_0$ o confundir $a$ con $v$ da los distractores.`;
      break; }
    case '4.2.1-caida': {
      const h=20+(n%10)*5;
      const t=Math.sqrt(2*h/10).toFixed(2);
      prompt=`Se deja caer un objeto desde $h=${h}\\,\\mathrm{m}$ (figura). Con $g=10\\,\\mathrm{m/s^{2}}$ y sin aire, estime el tiempo de caída.`;
      opts=[`$${t}\\,\\mathrm{s}$`, `$${(h/10).toFixed(2)}\\,\\mathrm{s}$`, `$${Math.sqrt(h/10).toFixed(2)}\\,\\mathrm{s}$`, `$${(2*h/10).toFixed(2)}\\,\\mathrm{s}$`]; ans=0;
      figs=figForFis('caida', id, {h});
      exp=`$h=\\tfrac12 gt^{2}$ de donde $t=\\sqrt{2h/g}=\\sqrt{${2*h}/10}=${t}\\,\\mathrm{s}$. Olvidar el factor 2 o no hacer raíz son los errores.`;
      break; }
    case '4.2.1-proyectiles': {
      const v0=20+(n%4)*2, ang=37;
      prompt=`Un proyectil se lanza con $v_0=${v0}\\,\\mathrm{m/s}$ a $${ang}^\\circ$ sobre la horizontal (figura). Halle su alcance horizontal $R$ en suelo plano ($g=10$).`;
      const R=(v0*v0*Math.sin(2*ang*Math.PI/180)/10).toFixed(1);
      opts=[`$${R}\\,\\mathrm{m}$`, `$${(v0*v0/10).toFixed(1)}\\,\\mathrm{m}$`, `$${(v0*Math.sin(ang*Math.PI/180)).toFixed(1)}\\,\\mathrm{m}$`, `$${(parseFloat(R)+8).toFixed(1)}\\,\\mathrm{m}$`]; ans=0;
      figs=figForFis('proyectil', id, {v0, ang});
      exp=`$R=v_0^{2}\\sin2\\theta/g=${v0}^{2}\\sin${2*ang}^\\circ/10\\approx ${R}\\,\\mathrm{m}$. Usar $\\sin\\theta$ en vez de $\\sin2\\theta$ o olvidar $g$ da los distractores.`;
      break; }
    case '4.2.2-2daNewton': {
      const m=2+(n%3), a=3+(n%4);
      const F=m*a;
      prompt=`Un bloque de $m=${m}\\,\\mathrm{kg}$ acelera a $a=${a}\\,\\mathrm{m/s^{2}}$ (DCL en figura). Halle la fuerza neta.`;
      opts=[`$${F}\\,\\mathrm{N}$`, `$${m}\\,\\mathrm{N}$`, `$${a}\\,\\mathrm{N}$`, `$${F/2}\\,\\mathrm{N}$`]; ans=0;
      figs=figForFis('dcl', id);
      exp=`2da ley: $F_{\\text{neta}}=ma=${m}\\cdot ${a}=${F}\\,\\mathrm{N}$ en la dirección de $\\vec a$.`;
      break; }
    case '4.2.2-roceResistencia': {
      const m=4, theta=30, mu=(0.2+(n%3)*0.1).toFixed(1);
      prompt=`Bloque $m=${m}\\,\\mathrm{kg}$ en plano inclinado $\\theta=${theta}^\\circ$ con $\\mu=${mu}$ (figura). Estime la fuerza de roce cinético si desliza ($g=10$).`;
      const N=(m*10*Math.cos(theta*Math.PI/180)).toFixed(1), f=(parseFloat(N)*parseFloat(mu)).toFixed(1);
      opts=[`$${f}\\,\\mathrm{N}$`, `$${(m*10).toFixed(1)}\\,\\mathrm{N}$`, `$${N}\\,\\mathrm{N}$`, `$${(parseFloat(f)*2).toFixed(1)}\\,\\mathrm{N}$`]; ans=0;
      figs=figForFis('plano', id, {theta, mu, m});
      exp=`$N=mg\\cos\\theta\\approx ${N}\\,\\mathrm{N}$, luego $f=\\mu N\\approx ${f}\\,\\mathrm{N}$. Usar $mg$ directo o $mg\\sin\\theta$ es el error.`;
      break; }
    case '4.2.2-3raNewton':
      prompt=`Un nadador empuja el agua hacia atrás. Según la 3ra ley, ¿qué ocurre?`;
      opts=[`El agua empuja al nadador hacia adelante`, `No hay reacción`, `La reacción es el peso del agua`, `Solo actúa una fuerza`]; ans=0;
      figs=figForFis('dcl', id);
      exp=`Acción-reacción: si el nadador ejerce $\\vec F$ sobre el agua hacia atrás, el agua ejerce $-\\vec F$ sobre él hacia adelante, par de fuerzas iguales y opuestas en cuerpos distintos.`;
      break;
    case '4.2.2-circular': {
      const r=5+(n%4), v=6+(n%3);
      const ac=(v*v/r).toFixed(1);
      prompt=`Móvil en MCU de radio $r=${r}\\,\\mathrm{m}$ con rapidez $v=${v}\\,\\mathrm{m/s}$ (figura). Halle la aceleración centrípeta.`;
      opts=[`$${ac}\\,\\mathrm{m/s^{2}}$`, `$${v}\\,\\mathrm{m/s^{2}}$`, `$${(v/r).toFixed(1)}\\,\\mathrm{m/s^{2}}$`, `$${(v*v).toFixed(1)}\\,\\mathrm{m/s^{2}}$`]; ans=0;
      figs=figForFis('circular', id, {r, o: (v/r).toFixed(1)});
      exp=`$a_c=v^{2}/R=${v}^{2}/${r}=${ac}\\,\\mathrm{m/s^{2}}$ hacia el centro. Olvidar el cuadrado o dividir al revés da los distractores.`;
      break; }
    case '4.2.2-impulsoCML':
      prompt=`Dos carritos aislados chocan y se pegan. ¿Qué se conserva en el choque?`;
      opts=[`El momento lineal total $\\vec p$`, `La energía cinética siempre`, `Solo la masa`, `Ninguna magnitud`]; ans=0;
      exp=`Sistema aislado: $\\vec p$ total se conserva aunque $E_c$ no (choque inelástico). Por eso se usa $m_1\\vec v_1+m_2\\vec v_2=(m_1+m_2)\\vec v'$.`;
      break;
    case '4.2.3-trabajoPotencia': {
      const F=20+(n%5)*5, d=4+(n%3);
      const W=F*d;
      prompt=`Una fuerza constante $F=${F}\\,\\mathrm{N}$ paralela al desplazamiento $d=${d}\\,\\mathrm{m}$ (figura área $F$-$x$) realiza trabajo $W$. Hállelo.`;
      opts=[`$${W}\\,\\mathrm{J}$`, `$${F}\\,\\mathrm{J}$`, `$${d}\\,\\mathrm{J}$`, `$${F+d}\\,\\mathrm{J}$`]; ans=0;
      figs=figForFis('trabajo', id);
      exp=`Trabajo de fuerza constante paralela: $W=\\vec F\\cdot\\Delta\\vec r =Fd\\cos0^\\circ=${F}\\cdot ${d}=${W}\\,\\mathrm{J}$ que geométricamente es el área bajo $F(x)$. Paso 1: verifica que $\\theta=0^\\circ$ (paralela). Paso 2: multiplica $F\\cdot d$. Confundir $F$ con $W$ o sumar es el error.`;
      break; }
    case '4.2.3-energiaCinetica': {
      const m=2+(n%3), v=6+(n%4);
      const Ec=0.5*m*v*v;
      prompt=`Halle $E_c$ de $m=${m}\\,\\mathrm{kg}$ con $v=${v}\\,\\mathrm{m/s}$.`;
      opts=[`$${Ec}\\,\\mathrm{J}$`, `$${m*v}\\,\\mathrm{J}$`, `$${0.5*m*v}\\,\\mathrm{J}$`, `$${Ec*2}\\,\\mathrm{J}$`]; ans=0;
      exp=`Definición: $E_c=\\tfrac12 mv^{2}=0.5\\cdot ${m}\\cdot ${v}^{2}=0.5\\cdot ${m}\\cdot ${v*v}=${Ec}\\,\\mathrm{J}$. Olvidar el $\\tfrac12$ o no elevar $v$ al cuadrado (usar $mv$ o $\\tfrac12 mv$) da los distractores. Unidades $\\mathrm{J}$ coherentes.`;
      break; }
    case '4.2.3-energiaPotencial': {
      const m=3, h=5+(n%4);
      const Ep=m*10*h;
      prompt=`Energía potencial $E_p=mgh$ de $m=${m}\\,\\mathrm{kg}$ a $h=${h}\\,\\mathrm{m}$ ($g=10$). Elija $E_p$ respecto al suelo.`;
      opts=[`$${Ep}\\,\\mathrm{J}$`, `$${m*h}\\,\\mathrm{J}$`, `$${Ep/2}\\,\\mathrm{J}$`, `$${Ep+20}\\,\\mathrm{J}$`]; ans=0;
      exp=`$E_p=mgh$ con $g=10\\,\\mathrm{m/s^{2}}$: $E_p=${m}\\cdot 10\\cdot ${h}=${Ep}\\,\\mathrm{J}$ respecto al nivel $h=0$ (suelo). Omitir $g$ o dividir entre 2 son los errores.`;
      break; }
    case '4.2.3-consEnergia': {
      const h=8+(n%4)*2;
      const v=Math.sqrt(2*10*h).toFixed(1);
      prompt=`Bloque liso se suelta desde $h=${h}\\,\\mathrm{m}$ (figura trabajo-energía). Con $g=10$, halle $v$ al llegar abajo por conservación de $E_m$.`;
      opts=[`$${v}\\,\\mathrm{m/s}$`, `$${(10*h).toFixed(1)}\\,\\mathrm{m/s}$`, `$${Math.sqrt(10*h).toFixed(1)}\\,\\mathrm{m/s}$`, `$${(parseFloat(v)+2).toFixed(1)}\\,\\mathrm{m/s}$`]; ans=0;
      figs=figForFis('trabajo', id);
      exp=`Sin roce: $E_m$ se conserva, $mgh=\\tfrac12 mv^{2}$ (se cancela $m$). De ahí $v=\\sqrt{2gh}=\\sqrt{2\\cdot10\\cdot ${h}}=\\sqrt{${2*10*h}}=${v}\\,\\mathrm{m/s}$. Olvidar el factor 2 o usar $\\sqrt{gh}$ da los distractores.`;
      break; }
    default:
      prompt=`Concepto FIS ${code}`; opts=['A','B','C','D']; ans=0; exp=`Explicación desde cero de ${t} con pasos y unidades SI.`; 
  }
  return { id, s:'fis', n, d:'intermedio', topics:[code], ch, t, prompt, opts, ans, exp, maths:[], imgs:figs };
}

function quiQuestion(topic, n, id){
  const ch=topic.ch, t=topic.t, code=topic.code;
  let prompt, opts, ans, exp;
  switch(code){
    case '4.3.1-unidades': {
      const v=250+(n%5)*50;
      const L=(v/1000).toFixed(2).replace(/0$/,'').replace(/\.$/,'');
      const alt = (n%2===0) ? {p:`Convierta $${v}\\,\\mathrm{mL}$ a $\\mathrm{L}$.`, exp:`Factor: $1\\,\\mathrm{L}=1000\\,\\mathrm{mL}$ luego divide entre $1000$: $${v}/1000=${L}\\,\\mathrm{L}$. Multiplicar o dividir entre $100$ es el error por confundir $\\mathrm{mL}$ con $\\mathrm{cL}$.`} : {p:`Convierta $${(2.5+(n%4)*0.5).toFixed(1)}\\,\\mathrm{L}$ a $\\mathrm{mL}$.`, exp:`$1\\,\\mathrm{L}=1000\\,\\mathrm{mL}$ luego multiplica por $1000$: paso inverso. Dividir sería el error.`};
      if(n%2===0){ prompt=alt.p; opts=[`$${L}\\,\\mathrm{L}$`, `$${v*1000}\\,\\mathrm{L}$`, `$${(v/100).toFixed(2)}\\,\\mathrm{L}$`, `$${v}\\,\\mathrm{L}$`]; ans=0; exp=alt.exp; }
      else { const Lm=(2.5+(n%4)*0.5)*1000; prompt=alt.p; opts=[`$${Lm}\\,\\mathrm{mL}$`, `$${(Lm/100).toFixed(0)}\\,\\mathrm{mL}$`, `$${(Lm/10).toFixed(0)}\\,\\mathrm{mL}$`, `$${Lm*10}\\,\\mathrm{mL}$`]; ans=0; exp=alt.exp; }
      break; }
    case '4.3.1-materia': {
      const v=n%3;
      if(v===0){ prompt=`¿Cuál es un cambio químico?`; opts=[`Oxidación del hierro`, `Fusión del hielo`, `Evaporación del agua`, `Disolución de azúcar`]; ans=0; exp=`Cambio químico forma nuevas sustancias con distinta composición (óxido de hierro); fusión/evaporación/disolución son físicos (cambio de estado o mezcla sin nueva sustancia). Paso 1: pregunta si aparece sustancia nueva.`; }
      else if(v===1){ prompt=`Clasifique: sublimación del yodo.`; opts=[`Cambio físico`, `Cambio químico`, `Reacción de oxidación`, `Descomposición química`]; ans=0; exp=`Sublimación sólido→gas del mismo $\\mathrm{I_2}$ sin alterar composición ni formar nueva sustancia: por definición es físico. Químico exigiría ruptura/formación de enlaces y nuevas sustancias con propiedades distintas.`; }
      else { prompt=`¿Qué indica una transformación química?`; opts=[`Formación de nuevas sustancias con propiedades distintas`, `Cambio de forma sin cambio de composición`, `Cambio de estado`, `Mezcla homogénea`]; ans=0; exp=`Criterio operacional: aparecen sustancias con propiedades nuevas (color, olor, $pH$, densidad distinta) que no estaban antes; los otros son físicos porque conservan composición.`; }
      break; }
    case '4.3.1-particulas': {
      const Z=11+(n%5), A=23+(n%3);
      const v=n%2;
      if(v===0){ prompt=`Un átomo neutro tiene $Z=${Z}$ y $A=${A}$. ¿Cuántos electrones tiene?`; opts=[`$${Z}$`, `$${A}$`, `$${A-Z}$`, `$${Z+1}$`]; ans=0; exp=`Neutro: $e^-=Z=${Z}$ por neutralidad; $A$ es nucleones y $A-Z$ neutrones. Confundir $A$ con electrones es el distractor típico.`; }
      else { prompt=`Un ion $\\mathrm{X^{2+}}$ tiene $Z=${Z}$ originalmente neutro. ¿Cuántos electrones tiene el ion?`; opts=[`$${Z-2}$`, `$${Z}$`, `$${Z+2}$`, `$${A}$`]; ans=0; exp=`Catión $2+$ pierde $2$ electrones respecto al neutro: $e^-=Z-2=${Z}-2=${Z-2}$. Anión los ganaría. Confundir $A$ (nucleones) con $Z$ es el error.`; }
      break; }
    case '4.3.1-configElectronica': {
      prompt=`¿Qué configuración corresponde a $\\mathrm{Na}$ ($Z=11$) neutro?`;
      opts=[`$1s^{2}2s^{2}2p^{6}3s^{1}$`, `$1s^{2}2s^{2}2p^{6}3s^{2}$`, `$1s^{2}2s^{2}2p^{5}3s^{2}$`, `$1s^{2}2s^{2}2p^{6}$`]; ans=0;
      exp=`Aufbau ordena por energía creciente $1s\\to 2s\\to 2p\\to 3s$. Para $Z=11$ los $11e^-$ llenan $1s^{2}2s^{2}2p^{6}3s^{1}$. Hund y Pauli ya están satisfechos; los distractores violan capacidad del $3s$ o del $2p$.`;
      break; }
    case '4.3.2-tablaPeriodica': {
      const v=n%2;
      if(v===0){ prompt=`¿Qué elemento está en el grupo 1 y periodo 3?`; opts=[`$\\mathrm{Na}$`, `$\\mathrm{K}$`, `$\\mathrm{Li}$`, `$\\mathrm{Mg}$`]; ans=0; exp=`Grupo 1 alcalinos, periodo 3 (tercera fila): $\\mathrm{Na}$ ($Z=11$: $1s^{2}2s^{2}2p^{6}3s^{1}$). $\\mathrm{K}$ es periodo 4 y $\\mathrm{Mg}$ grupo 2.`; }
      else { prompt=`Un elemento con $Z=${11+(n%3)}$ está en:`; const z=11+(n%3); const per = z<=10?2:3; const grp = z===11?1: z===12?2:1; prompt=`Un elemento con $Z=${z}$ está en período ${per} y grupo ${grp}. ¿Cuál es?`; opts=[`$\\mathrm{${z===11?'Na':z===12?'Mg':'Li'}}$`, `$\\mathrm{K}$`, `$\\mathrm{He}$`, `$\\mathrm{Ne}$`]; ans=0; exp=`Configuración electrónica da capa externa $n=${per}$ y electrones de valencia; ubica periodo y grupo.`; }
      break; }
    case '4.3.2-propPeriodicas': {
      const v=n%2;
      if(v===0){ prompt=`¿Qué propiedad aumenta hacia arriba y a la derecha en la tabla?`; opts=[`Energía de ionización`, `Radio atómico`, `Carácter metálico`, `Número de capas`]; ans=0; exp=`$EI$ y electronegatividad crecen arriba-derecha por mayor carga efectiva; radio y carácter metálico crecen abajo-izquierda.`; }
      else { prompt=`Ordene por radio atómico creciente: $\\mathrm{Na}$, $\\mathrm{Mg}$, $\\mathrm{Al}$ (mismo periodo).`; opts=[`$\\mathrm{Al} < \\mathrm{Mg} < \\mathrm{Na}$`, `$\\mathrm{Na} < \\mathrm{Mg} < \\mathrm{Al}$`, `$\\mathrm{Mg} < \\mathrm{Na} < \\mathrm{Al}$`, `$\\mathrm{Na}=\\mathrm{Mg}=\\mathrm{Al}$`]; ans=0; exp=`En un periodo el radio decrece a la derecha por mayor $Z_{ef}$: $\\mathrm{Al}$ menor, $\\mathrm{Na}$ mayor.`; }
      break; }
    case '4.3.2-nomInorganica': {
      const v=n%3;
      if(v===0){ prompt=`Nombre Stock de $\\mathrm{Fe_2O_3}$.`; opts=[`Óxido de hierro(III)`, `Óxido de hierro(II)`, `Peróxido de hierro`, `Hidróxido de hierro`]; ans=0; exp=`O es $-2$ cada uno ($-6$), $2$ Fe deben sumar $+6$ luego $+3$ cada uno: Stock (III). Peróxido tendría $\\mathrm{O_2^{2-}}$ e hidróxido $\\mathrm{OH^-}$.`; }
      else if(v===1){ prompt=`Fórmula del sulfato de aluminio.`; opts=[`$\\mathrm{Al_2(SO_4)_3}$`, `$\\mathrm{AlSO_4}$`, `$\\mathrm{Al_3(SO_4)_2}$`, `$\\mathrm{Al_2SO_4}$`]; ans=0; exp=`$\\mathrm{Al^{3+}}$ y $\\mathrm{SO_4^{2-}}$: mcm $6$, $2$ Al y $3$ sulfatos. Balance de cargas.`; }
      else { prompt=`Nombre de $\\mathrm{H_2SO_4}$ (ácido ternario).`; opts=[`Ácido sulfúrico`, `Ácido sulfuroso`, `Ácido sulfhídrico`, `Sulfato de hidrógeno`]; ans=0; exp=`$\\mathrm{S}$ con $+6$ da sufijo -úrico ($\\mathrm{H_2SO_4}$); $+4$ sería -oso, $-2$ -hídrico.`; }
      break; }
    case '4.3.3-enlaceIonico': {
      const v=n%2;
      if(v===0){ prompt=`¿Qué par forma enlace iónico típico?`; opts=[`$\\mathrm{Na}$ y $\\mathrm{Cl}$`, `$\\mathrm{Cl}$ y $\\mathrm{Cl}$`, `$\\mathrm{C}$ y $\\mathrm{H}$`, `$\\mathrm{O}$ y $\\mathrm{O}$`]; ans=0; exp=`Metal alcalino + halógeno: transferencia electrónica por gran $\\Delta EN$, forma red iónica. Pares no metal-no metal son covalentes.`; }
      else { prompt=`¿Qué propiedad es típica de un sólido iónico?`; opts=[`Alto punto de fusión y conduce fundido o en disolución`, `Bajo punto de fusión y no conduce nunca`, `Gaseoso a ambiente`, `Moléculas discretas aisladas`]; ans=0; exp=`Red iónica con alta energía reticular: alto $T_f$ y conduce cuando los iones se movilizan (fundido o disolución), no como sólido rígido. Los covalentes moleculares son los de bajo $T_f$ y moléculas discretas.`; }
      break; }
    case '4.3.3-enlaceCovalente': {
      const v=n%2;
      if(v===0){ prompt=`¿Qué molécula tiene enlace covalente no polar puro?`; opts=[`$\\mathrm{Cl_2}$`, `$\\mathrm{NaCl}$`, `$\\mathrm{MgO}$`, `$\\mathrm{CaF_2}$`]; ans=0; exp=`Misma electronegatividad ($\\Delta EN=0$) comparte por igual; los iónicos tienen $\\Delta EN$ grande.`; }
      else { prompt=`¿Cuál es polar?`; opts=[`$\\mathrm{H_2O}$`, `$\\mathrm{Cl_2}$`, `$\\mathrm{N_2}$`, `$\\mathrm{O_2}$`]; ans=0; exp=`Polaridad requiere $\\Delta EN\\neq0$ y geometría que no cancele dipolos: $\\mathrm{H_2O}$ angular es polar; diatómicas homonucleares $\\Delta EN=0$ son no polares.`; }
      break; }
    case '4.3.3-Lewis': {
      const v=n%2;
      if(v===0){ prompt=`¿Cuántos pares libres tiene el $\\mathrm{H_2O}$ en su Lewis?`; opts=[`$2$`, `$1$`, `$0$`, `$4$`]; ans=0; exp=`O con $6e^-$ valencia forma $2$ enlaces y quedan $4e^-$ = $2$ pares libres. Octeto completo.`; }
      else { prompt=`Lewis de $\\mathrm{CO_2}$: ¿cuántos enlaces le corresponden al C central?`; opts=[`$2$ dobles`, `$1$ simple`, `$3$ simples`, `$1$ triple`]; ans=0; exp=`Para que C y cada O completen octeto, C comparte $4$ pares: $\\mathrm{O=C=O}$ son $2$ dobles. Un simple dejaría octetos incompletos y un triple excedería valencia.`; }
      break; }
    case '4.3.3-geomMolec': {
      const v=n%2;
      if(v===0){ prompt=`Geometría $\\mathrm{CO_2}$ (AX₂ sin pares libres).`; opts=[`Lineal $180^\\circ$`, `Angular`, `Tetraédrica`, `Piramidal`]; ans=0; exp=`VSEPR AX₂: dos dominios de pares enlazantes sin pares libres repelen al máximo en $180^\\circ$; por eso $\\mathrm{CO_2}$ es lineal y no angular. Tetraédrica requiere 4 dominios.`; }
      else { prompt=`Forma del $\\mathrm{H_2O}$ (AX₂E₂).`; opts=[`Angular $\\approx104.5^\\circ$`, `Lineal $180^\\circ$`, `Tetraédrica regular $109.5^\\circ$`, `Plana trigonal $120^\\circ$`]; ans=0; exp=`VSEPR AX₂E₂: dos pares libres repelen más que enlaces y comprimen el tetraedro $109.5^\\circ$ a $\\approx104.5^\\circ$; resulta forma angular, no lineal ni tetraédrica regular.`; }
      break; }
    case '4.3.3-fuerzasInter': {
      const v=n%2;
      if(v===0){ prompt=`¿Qué fuerza domina en $\\mathrm{H_2O}$ líquida?`; opts=[`Puente de hidrógeno`, `London débil (dispersión)`, `Iónica`, `Metálica`]; ans=0; exp=`$\\mathrm{H}$ unido a $\\mathrm{O}$ muy electronegativo forma puentes H direccionales, más fuertes que London/dispersión. Iónica y metálica no aplican a moléculas neutras.`; }
      else { prompt=`¿Cuál tiene mayor punto de ebullición?`; opts=[`$\\mathrm{H_2O}$ (puentes H)`, `$\\mathrm{H_2S}$`, `$\\mathrm{CH_4}$`, `$\\mathrm{He}$`]; ans=0; exp=`Puentes de hidrógeno son las fuerzas intermoleculares más fuertes entre estas: $\\mathrm{H_2O}$ hierve a $100^\\circ$ frente a $\\mathrm{H_2S}$ ($-60^\\circ$) o $\\mathrm{CH_4}$ (London muy débil) y $\\mathrm{He}$ casi sin interacción.`; }
      break; }
    case '4.3.4-mol': {
      const v=n%2;
      if(v===0){ prompt=`¿Cuántos moles hay en $18\\,\\mathrm{g}$ de $\\mathrm{H_2O}$ ($M=18\\,\\mathrm{g/mol}$)?`; opts=[`$1\\,\\mathrm{mol}$`, `$18\\,\\mathrm{mol}$`, `$0.5\\,\\mathrm{mol}$`, `$2\\,\\mathrm{mol}$`]; ans=0; exp=`$n=m/M=18/18=1\\,\\mathrm{mol}=N_A$ entidades; $18\\,\\mathrm{mol}$ sería $324\\,\\mathrm{g}$.`; }
      else { const m=44; prompt=`¿Qué masa son $0.5\\,\\mathrm{mol}$ de $\\mathrm{CO_2}$ ($M=44\\,\\mathrm{g/mol}$)?`; opts=[`$22\\,\\mathrm{g}$`, `$44\\,\\mathrm{g}$`, `$88\\,\\mathrm{g}$`, `$11\\,\\mathrm{g}$`]; ans=0; exp=`Relación $m=nM$: $m=0.5\\,\\mathrm{mol}\\cdot44\\,\\mathrm{g/mol}=22\\,\\mathrm{g}$. Paso 1: identifica $M$ por suma de masas atómicas. Paso 2: multiplica por $n$. 44 g sería $1\\,\\mathrm{mol}$ y $88\\,\\mathrm{g}$ serían $2\\,\\mathrm{mol}$.`; }
      break; }
    case '4.3.4-formEmpMol': {
      const v=n%2;
      if(v===0){ prompt=`Compuesto $40\\%\\,\\mathrm{C}$, $6.7\\%\\,\\mathrm{H}$, $53.3\\%\\,\\mathrm{O}$ ($M\\approx60$). ¿Fórmula molecular?`; opts=[`$\\mathrm{C_2H_4O_2}$`, `$\\mathrm{CH_2O}$`, `$\\mathrm{C_2H_6O}$`, `$\\mathrm{C_3H_6O}$`]; ans=0; exp=`Por $100\\,\\mathrm{g}$: $40/12=3.33$, $6.7/1=6.7$, $53.3/16=3.33$ → $1:2:1$ empírica $\\mathrm{CH_2O}$ ($30$), factor $60/30=2$ → $\\mathrm{C_2H_4O_2}$. Paso a paso evita confundir empírica con molecular.`; }
      else { prompt=`Óxido con $70\\%\\,\\mathrm{Fe}$ ($30\\%\\,\\mathrm{O}$). ¿Fórmula empírica?`; opts=[`$\\mathrm{Fe_2O_3}$`, `$\\mathrm{FeO}$`, `$\\mathrm{Fe_3O_4}$`, `$\\mathrm{FeO_2}$`]; ans=0; exp=`Por $100\\,\\mathrm{g}$: $70/56=1.25\\,\\mathrm{mol}\\,\\mathrm{Fe}$, $30/16=1.875\\,\\mathrm{mol}\\,\\mathrm{O}$ → $1.25:1.875=1:1.5=2:3$ luego $\\mathrm{Fe_2O_3}$. Divide entre el menor para obtener enteros.`; }
      break; }
    case '4.3.4-reacciones': {
      const v=n%2;
      if(v===0){ prompt=`Balancee: $\\mathrm{C_3H_8 + O_2 \\to CO_2 + H_2O}$. Coeficiente de $\\mathrm{O_2}$.`; opts=[`$5$`, `$3$`, `$4$`, `$7$`]; ans=0; exp=`Tanteo: $\\mathrm{C_3H_8+5O_2\\to3CO_2+4H_2O}$: $3$ C, $8$ H, $10$ O ambos lados. $3$ o $4$ desbalancean O.`; }
      else { prompt=`Tipo de reacción: $\\mathrm{2H_2O_2 \\to 2H_2O + O_2}$.`; opts=[`Descomposición`, `Síntesis`, `Desplazamiento simple`, `Doble desplazamiento`]; ans=0; exp=`Un solo reactivo se rompe en dos productos más simples: criterio de descomposición. Síntesis sería al revés y desplazamientos involucran intercambio de elementos entre dos compuestos.`; }
      break; }
    case '4.3.4-esteqReactivoLim': {
      const v=n%2;
      if(v===0){ prompt=`$\\mathrm{N_2+3H_2\\to2NH_3}$ con $1\\,\\mathrm{mol}\\,\\mathrm{N_2}$ y $2\\,\\mathrm{mol}\\,\\mathrm{H_2}$. ¿Limitante?`; opts=[`$\\mathrm{H_2}$`, `$\\mathrm{N_2}$`, `Ninguno`, `Ambos`]; ans=0; exp=`Estequiometría exige $3\\,\\mathrm{mol}\\,\\mathrm{H_2}$ por cada $\\mathrm{N_2}$; solo hay $2$, falta $\\mathrm{H_2}$ que se agota primero y limita $\\mathrm{NH_3}$.`; }
      else { const need=2; prompt=`$\\mathrm{2Al+3Cl_2\\to2AlCl_3}$ con $4\\,\\mathrm{mol}\\,\\mathrm{Al}$ y $3\\,\\mathrm{mol}\\,\\mathrm{Cl_2}$. ¿Limitante?`; opts=[`$\\mathrm{Cl_2}$`, `$\\mathrm{Al}$`, `Ninguno`, `$\\mathrm{AlCl_3}$`]; ans=0; exp=`Relación $2:3$: $4\\,\\mathrm{Al}$ necesitarían $6\\,\\mathrm{Cl_2}$, solo hay $3$ → $\\mathrm{Cl_2}$ limita.`; }
      break; }
    default:
      prompt=`Concepto QUI ${code}`; opts=['A','B','C','D']; ans=0; exp=`Desde cero: ${t} explicado.`; 
  }
  return { id, s:'qui', n, d:'intermedio', topics:[code], ch, t, prompt, opts, ans, exp, maths:[], imgs:[] };
}

function lenQuestion(topic, n, id){
  const ch=topic.ch, t=topic.t, code=topic.code;
  let prompt, opts, ans, exp;
  const baseText = `La EPN evalúa la admisión con criterios objetivos y equitativos para garantizar que los aspirantes posean las bases científicas necesarias. El examen mide razonamiento algebraico y comprensión lectora, no solo memoria. Por ello la guía recomienda planificar el estudio, resolver problemas variados y practicar lectura crítica con textos académicos.`;
  switch(code){
    case '4.4.1-comunicacion': {
      const v = n % 3;
      if(v===0){
        prompt=`${baseText}\n\nSegún el texto, ¿cuál es el propósito comunicativo predominante del fragmento?`;
        opts=[`Informar y orientar sobre el proceso de admisión de la EPN`, `Narrar una anécdota personal del autor`, `Expresar una emoción subjetiva sin datos`, `Persuadir para comprar un producto comercial`]; ans=0;
        exp=`Paso 1: el texto expone criterios objetivos, temario y recomendaciones — función expositiva/informativa. Paso 2: además orienta ("la guía recomienda planificar") — propósito orientador. Paso 3: no hay relato en primera persona (descarta narración), ni emoción dominante, ni oferta comercial. Por eso la correcta es informar y orientar; las otras confunden función expresiva o apelativa con la expositiva.`;
      } else if(v===1){
        prompt=`${baseText}\n\n¿Qué elemento de la comunicación destaca cuando la guía recomienda "resolver problemas variados"?`;
        opts=[`El mensaje y el código compartido (instrucción clara)`, `Solo el canal físico`, `Solo el ruido`, `El emisor sin receptor`]; ans=0;
        exp=`La instrucción clara depende del mensaje y de un código común (lenguaje académico) entre EPN y aspirante; canal/ruido son secundarios y "emisor sin receptor" niega la comunicación.`;
      } else {
        prompt=`${baseText}\n\nIdentifique el referente principal del texto.`;
        opts=[`El examen de admisión de la EPN y su preparación`, `Una novela literaria`, `Un partido de fútbol`, `Una receta de cocina`]; ans=0;
        exp=`El referente es el examen y su preparación; los distractores son referentes ajenos al campo semántico del texto.`;
      }
      break; }
    case '4.4.1-razonLogica': {
      const v=n%3;
      if(v===0){
        prompt=`Si "Todos los aprobados rindieron Matemática" y "Ana aprobó", ¿qué se infiere válidamente?`;
        opts=[`Ana rindió Matemática`, `Ana no rindió Matemática`, `Nadie rindió Matemática`, `Todos rindieron Lenguaje`]; ans=0;
        exp=`Silogismo Barbara: $\\forall x (Aprobado(x)\\to RindióMat(x))$ y $Aprobado(\\text{Ana})$ permiten instanciar y concluir $RindióMat(\\text{Ana})$ por modus ponens universal. Negar la conclusión o cuantificar sobre otro predicado es inválido.`;
      } else if(v===1){
        prompt=`"Ningún deshonesto es admitido. Algunos postulantes son deshonestos." ¿Qué conclusión es válida?`;
        opts=[`Algunos postulantes no son admitidos`, `Todos los postulantes son admitidos`, `Ningún admitido es postulante`, `Todos los deshonestos son postulantes`]; ans=0;
        exp=`Celarent: ningún $D$ es $A$, algunos $P$ son $D$, luego algunos $P$ no son $A$. Las otras invierten cuantificadores o el sujeto.`;
      } else {
        prompt=`Si $p\\to q$ es verdadera y $q$ es falsa, ¿qué se sabe de $p$?`;
        opts=[`$p$ es falsa (modus tollens)`, `$p$ es verdadera`, `Nada se puede saber`, `$q\\to p$ es verdadera`]; ans=0;
        exp=`Modus tollens: de $p\\to q$ y $\\neg q$ se infiere $\\neg p$; afirmar $p$ sería caer en la conversa.`;
      }
      break; }
    case '4.4.1-juiciosValor': {
      const v=n%2;
      if(v===0){
        prompt=`"${baseText.slice(0,90)} es el mejor sistema del mundo sin comparación." ¿Qué tipo de juicio expresa la segunda parte?`;
        opts=[`Juicio de valor subjetivo no verificable`, `Juicio de hecho verificable con datos`, `Definición nominal`, `Dato estadístico medible`]; ans=0;
        exp=`"Mejor sin comparación" es una valoración superlativa sin criterio operacional ni datos falsables; no es hecho ni definición. Paso 1: distingue hecho (verificable) de valor (apreciación). Paso 2: detecta marcador "mejor/sin comparación" como subjetividad.`;
      } else {
        prompt=`"El examen dura 210 minutos según la guía." ¿Qué tipo de enunciado es?`;
        opts=[`Juicio de hecho verificable`, `Juicio de valor`, `Falacia`, `Opinión estética`]; ans=0;
        exp=`Es un hecho contrastable contra la guía oficial (dato objetivo); no valora ni argumenta.`;
      }
      break; }
    case '4.4.2-razLogico': {
      const v=n%3;
      if(v===0){
        prompt=`Premisas: "Si estudias, apruebas. Si apruebas, postulas." Conclusión: "Si estudias, postulas." ¿Qué regla aplica?`;
        opts=[`Silogismo hipotético (transitividad del condicional)`, `Modus ponens simple`, `Falacia ad hominem`, `Falsa causa`]; ans=0;
        exp=`De $p\\to q$ y $q\\to r$ se sigue $p\\to r$ por silogismo hipotético (corte). Modus ponens necesitaría afirmar $p$; las falacias son irrelevantes.`;
      } else if(v===1){
        prompt=`"Si llueve, el patio se moja. El patio está mojado. Luego llovió." ¿Qué falacia comete?`;
        opts=[`Afirmación del consecuente`, `Modus tollens válido`, `Silogismo hipotético`, `Ad hominem`]; ans=0;
        exp=`Estructura $p\\to q$, $q$, luego $p$ — inválida; el patio pudo mojarse por otra causa. Modus tollens negaría $q$ para concluir $\\neg p$.`;
      } else {
        prompt=`"Si $p$ entonces $q$. No $p$. Luego no $q$." ¿Cómo se llama este error?`;
        opts=[`Negación del antecedente`, `Modus ponens`, `Silogismo disyuntivo`, `Dilema constructivo`]; ans=0;
        exp=`De $p\\to q$ y $\\neg p$ no se sigue $\\neg q$ (el consecuente puede ser verdadero por otra razón). Es la falacia de negar el antecedente.`;
      }
      break; }
    case '4.4.2-analisisTexto': {
      const v=n%3;
      if(v===0){
        prompt=`${baseText}\n\n¿Con qué conector se introduce la consecuencia de evaluar con criterios objetivos?`;
        opts=[`Por ello`, `Sin embargo`, `En cambio`, `Por ejemplo`]; ans=0;
        exp=`"Por ello la guía recomienda..." marca consecuencia lógica de lo anterior; "sin embargo/en cambio" marcan contraste y "por ejemplo" ejemplifica. Paso: identifica relación causa-consecuencia vs oposición.`;
      } else if(v===1){
        prompt=`${baseText}\n\n¿Qué idea resume mejor la tesis del fragmento?`;
        opts=[`La EPN evalúa con criterios objetivos y la preparación debe ser planificada y crítica`, `Solo importa la memoria`, `El examen es aleatorio`, `No hace falta estudiar`]; ans=0;
        exp=`Tesis = evaluación objetiva + preparación integral (planificación, razonamiento, lectura crítica). Las otras niegan el texto o lo reducen a memoria.`;
      } else {
        prompt=`${baseText}\n\n¿Qué tipo de progresión temática usa el texto?`;
        opts=[`Tema constante con remas que desarrollan la evaluación y la preparación`, `Salto temático sin hilo`, `Solo enumeración sin jerarquía`, `Diálogo directo`]; ans=0;
        exp=`El tema "evaluación/preparación EPN" se mantiene y cada rema lo desarrolla; no hay salto ni solo lista ni diálogo.`;
      }
      break; }
    case '4.4.2-lecturaCritica': {
      const v=n%2;
      if(v===0){
        prompt=`${baseText}\n\n¿Qué supuesto no dicho sostiene la recomendación de practicar lectura crítica?`;
        opts=[`La comprensión lectora es entrenable y mejora el desempeño en el examen`, `La memoria mecánica es suficiente para todo`, `El examen es completamente aleatorio`, `No hace falta planificar el estudio`]; ans=0;
        exp=`Recomendar práctica presupone que la habilidad es mejorable y transferible al examen; las otras opciones contradicen "no solo memoria" y "planificar".`;
      } else {
        prompt=`${baseText}\n\n¿Qué objeción pondría en duda la conclusión de que "resolver problemas variados prepara mejor"?`;
        opts=[`Que los problemas variados sean todos del mismo tipo trivial`, `Que los problemas variados incluyan razonamiento`, `Que la lectura crítica se practique`, `Que el tiempo se planifique`]; ans=0;
        exp=`Si "variados" no es variado (mismo tipo trivial), la premisa se vacía y la conclusión cae; las otras la fortalecen.`;
      }
      break; }
    case '4.4.3-constrParrafo': {
      const v=n%2;
      if(v===0){
        prompt=`Ordene para un párrafo coherente: (1) Por ello se evalúa con prueba estandarizada. (2) La EPN necesita seleccionar con equidad. (3) La prueba mide bases científicas. El orden coherente es:`;
        opts=[`2-3-1`, `1-2-3`, `3-1-2`, `1-3-2`]; ans=0;
        exp=`Secuencia: necesidad institucional (2) → qué mide la prueba (3) → consecuencia instrumental (1) con conector "por ello" al final, no al inicio.`;
      } else {
        prompt=`¿Qué oración debe ir primero en un párrafo sobre admisión EPN?`;
        opts=[`La EPN implementa una prueba de admisión para valorar bases científicas.`, `Por ello, la guía recomienda planificar.`, `En conclusión, la preparación es clave.`, `Este criterio garantiza equidad.`]; ans=0;
        exp=`La oración más general y tópica va primero; las otras son consecuencia, cierre o referencia anafórica ("este criterio") que presupone antecedente.`;
      }
      break; }
    case '4.4.3-argumentacionFalacias': {
      const v=n%3;
      if(v===0){
        prompt=`"Rechacemos la propuesta porque su autor viste mal." ¿Qué falacia comete?`;
        opts=[`Ad hominem (ataca a la persona, no al argumento)`, `Hombre de paja`, `Falsa causa`, `Generalización apresurada`]; ans=0;
        exp=`Se descalifica a la persona (vestimenta) en vez de refutar razones de la propuesta: ad hominem circunstancial.`;
      } else if(v===1){
        prompt=`"Después de instalar el software, falló el servidor; luego el software causó la falla." Sin más evidencia, ¿qué falacia hay?`;
        opts=[`Post hoc (falsa causa por sucesión temporal)`, `Ad hominem`, `Petición de principio`, `Equívoco`]; ans=0;
        exp=`Inferir causa solo de sucesión temporal sin mecanismo ni control es post hoc ergo propter hoc.`;
      } else {
        prompt=`"Todos los que conozco reprobaron, así que todos reprobarán." ¿Qué falacia es?`;
        opts=[`Generalización apresurada`, `Falso dilema`, `Pendiente resbaladiza`, `Apelación a la autoridad`]; ans=0;
        exp=`Muestra pequeña y sesgada (conozco pocos casos) para concluir un universal sobre "todos": generalización apresurada. Paso 1: detecta cuantificador universal sin evidencia suficiente. Paso 2: descarta otras falacias (no es dilema ni pendiente).`;
      }
      break; }
    case '4.4.3-puntuacionConcordancia': {
      const v=n%3;
      if(v===0){
        const opts2=[`Hubo muchos aspirantes que llegaron a tiempo.`, `Hubieron muchos aspirantes`, `Habían mucho aspirante`, `Hubieron habido muchos`];
        prompt=`Elija la oración correcta según concordancia y norma de "haber" impersonal:`;
        opts=opts2; ans=0;
        exp=`"Haber" impersonal es invariable en singular: "hubo/hay/había", nunca "hubieron/habían" ni "hubieron habido". Paso 1: reconoce "haber" existencial. Paso 2: aplica singular obligatorio.`;
      } else if(v===1){
        prompt=`¿Dónde va la coma vocativa?`;
        opts=[`Ana, ven a rendir el examen.`, `Ana ven a rendir el examen.`, `Ana ven, a rendir el examen.`, `Ana ven a rendir, el examen.`]; ans=0;
        exp=`Vocativo "Ana" se aísla con coma por ser llamada al interlocutor; el resto rompe sintagmas nominales o separa sujeto y verbo incorrectamente. Paso 1: identifica vocativo. Paso 2: aplica coma vocativa.`;
      } else {
        prompt=`Elija la subordinada con "que" correcta (sin queísmo ni dequeísmo):`;
        opts=[`Me alegro de que hayas venido.`, `Me alegro que hayas venido.`, `Pienso de que es tarde.`, `Estoy seguro de que que vienes.`]; ans=0;
        exp=`"Alegrarse de que" exige preposición (queísmo si falta); "pensar que" la rechaza (dequeísmo si sobra).`;
      }
      break; }
    default:
      prompt=`${baseText}\n\nPregunta LEN ${code}`; opts=['A','B','C','D']; ans=0; exp=`Desde cero: ${t}.`;
  }
  return { id, s:'len', n, d:'intermedio', topics:[code], ch, t, prompt, opts, ans, exp, maths:[], imgs:[] };
}

// ---------- Main ----------
const args = process.argv.slice(2);
function argVal(flag, def){ const i=args.indexOf(flag); return i>=0 && i+1<args.length ? args[i+1] : def; }
const only = argVal('--only','all');
const countArg = parseInt(argVal('--count','80'),10);

function generate(subject, baseTopics, genFn, startN, total){
  const topics = topicsScaled(baseTopics, total);
  const out=[];
  let n=startN;
  for(const tp of topics){
    const need = tp.count;
    for(let i=0;i<need && out.length<total;i++){
      const id = `${subject}-${String(n).padStart(3,'0')}`;
      out.push(genFn(tp, n, id));
      n++;
    }
  }
  let idx=0;
  while(out.length < total){
    const tp = topics[idx % topics.length];
    const id = `${subject}-${String(n).padStart(3,'0')}`;
    out.push(genFn(tp, n, id));
    n++; idx++;
  }
  return out.slice(0, total);
}

let bank;
try {
  const existing = fs.readFileSync(outPath,'utf8');
  const sb={window:{}}; const vmm=require('vm'); vmm.createContext(sb); vmm.runInContext(existing, sb);
  bank = sb.window.GUIA_BANK_1000;
  if(!bank) bank={mat:[],fis:[],qui:[],len:[]};
  // ensure arrays
  bank.mat = Array.isArray(bank.mat)?bank.mat:[]; bank.fis=Array.isArray(bank.fis)?bank.fis:[]; bank.qui=Array.isArray(bank.qui)?bank.qui:[]; bank.len=Array.isArray(bank.len)?bank.len:[];
} catch(e){ bank={mat:[],fis:[],qui:[],len:[]}; }

const totalEach = isNaN(countArg)?80:countArg;
// only=all genera todo sin borrar; only=mat|fis|... solo regenera esa materia
if(only==='all'){
  bank.mat = generate('mat', MAT_BASE, matQuestion, 1, totalEach);
  bank.fis = generate('fis', FIS_BASE, fisQuestion, 1, totalEach);
  bank.qui = generate('qui', QUI_BASE, quiQuestion, 1, totalEach);
  bank.len = generate('len', LEN_BASE, lenQuestion, 1, totalEach);
  console.log(`all: mat ${bank.mat.length} fis ${bank.fis.length} qui ${bank.qui.length} len ${bank.len.length}`);
} else if(only==='mat'){
  bank.mat = generate('mat', MAT_BASE, matQuestion, 1, totalEach);
  console.log(`mat: ${bank.mat.length} generadas (otras preservadas: fis ${bank.fis.length} qui ${bank.qui.length} len ${bank.len.length})`);
} else if(only==='fis'){
  bank.fis = generate('fis', FIS_BASE, fisQuestion, 1, totalEach);
  console.log(`fis: ${bank.fis.length} generadas (preservadas mat ${bank.mat.length} qui ${bank.qui.length} len ${bank.len.length})`);
} else if(only==='qui'){
  bank.qui = generate('qui', QUI_BASE, quiQuestion, 1, totalEach);
  console.log(`qui: ${bank.qui.length} generadas (preservadas mat ${bank.mat.length} fis ${bank.fis.length} len ${bank.len.length})`);
} else if(only==='len'){
  bank.len = generate('len', LEN_BASE, lenQuestion, 1, totalEach);
  console.log(`len: ${bank.len.length} generadas (preservadas mat ${bank.mat.length} fis ${bank.fis.length} qui ${bank.qui.length})`);
}

const meta = {
  version:1, level:'intermedio',
  totals:{ mat: bank.mat.length, fis: bank.fis.length, qui: bank.qui.length, len: bank.len.length },
  topics:{ mat: MAT_TOPICS.map(t=>t.code), fis: FIS_TOPICS.map(t=>t.code), qui: QUI_TOPICS.map(t=>t.code), len: LEN_TOPICS.map(t=>t.code) }
};

const js = `/**
 * guia-bank-1000-intermedio.js — Banco 1000 preguntas originales nivel intermedio (250×4)
 * Generado por scripts/gen-banco-1000.mjs — NO editar a mano (re-generable).
 * Schema: { id, s, n, d, topics:[], ch, t, prompt, opts:[4], ans, exp, maths:[], imgs:[svg] }
 */
window.GUIA_BANK_1000 = ${JSON.stringify(bank, null, 2)};
window.GUIA_BANK_1000_META = ${JSON.stringify(meta, null, 2)};
`;
fs.writeFileSync(outPath, js, 'utf8');
console.log(`Wrote ${outPath} — totals`, meta.totals, `bytes`, Buffer.byteLength(js));
