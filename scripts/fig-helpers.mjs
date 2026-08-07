/**
 * fig-helpers.mjs — Helpers SVG deterministas inline para Geometría y Física
 * Cada función retorna string '<svg viewBox="0 0 400 300" ...>...</svg>' autocontenido.
 * Seed = q.id para reproducibilidad visual mínima (no RNG pesado, offset determinista).
 * Estilo EPN: stroke #0e2a47, fill none, labels <text> sans-serif 13px.
 */
function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function hash(s){ let h=0; for(let i=0;i<String(s).length;i++) h=(h*31+String(s).charCodeAt(i))>>>0; return h; }
function svgWrap(inner, vb='0 0 400 300'){
  return `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" role="img" style="max-width:480px;width:100%;height:auto;display:block;margin:10px auto" aria-hidden="true">${inner}</svg>`;
}
function arrow(x1,y1,x2,y2, color='#0e2a47', w=2){
  const ang = Math.atan2(y2-y1, x2-x1);
  const ah = 10, aw = 6;
  const tipX = x2, tipY = y2;
  const b1x = tipX - ah*Math.cos(ang) + aw*Math.sin(ang);
  const b1y = tipY - ah*Math.sin(ang) - aw*Math.cos(ang);
  const b2x = tipX - ah*Math.cos(ang) - aw*Math.sin(ang);
  const b2y = tipY - ah*Math.sin(ang) + aw*Math.cos(ang);
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>`
       + `<polygon points="${tipX},${tipY} ${b1x},${b1y} ${b2x},${b2y}" fill="${color}" stroke="${color}" stroke-linejoin="round"/>`;
}
export function figTriangulo({ a=5, b=4, c=6, labels={A:'A',B:'B',C:'C'}, seed='' }={}){
  const h = hash(seed||`${a}-${b}-${c}`);
  const jitter = (h%7)-3;
  const p1='120,220', p2='280,220', p3=`${170+jitter},70`;
  const inner = `
    <rect x="0" y="0" width="400" height="300" rx="10" fill="#fff" stroke="#e3e8ee"/>
    <polygon points="${p1} ${p2} ${p3}" fill="#eaf2fb" stroke="#0e2a47" stroke-width="2.2" stroke-linejoin="round"/>
    <text x="115" y="238" text-anchor="middle" font-size="13" font-family="sans-serif" fill="#0e2a47">${esc(labels.A||'A')}</text>
    <text x="285" y="238" text-anchor="middle" font-size="13" font-family="sans-serif" fill="#0e2a47">${esc(labels.B||'B')}</text>
    <text x="${168+jitter}" y="58" text-anchor="middle" font-size="13" font-family="sans-serif" fill="#0e2a47">${esc(labels.C||'C')}</text>
  `;
  return svgWrap(inner);
}
export function figTrianguloRectangulo({ ac=3, bc=4, labels={A:'A',B:'B',C:'C'}, seed='' }={}){
  // Rectángulo en C: AC ⟂ BC, C arriba, A abajo-izq, B derecha
  // AC vertical-ish, BC horizontal-ish para que el ángulo recto se vea claro
  const pC='170,80', pA='110,220', pB='290,120';
  const midAC=`${(110+170)/2 -6},${(220+80)/2 +4}`;
  const midBC=`${(290+170)/2 +4},${(120+80)/2 -6}`;
  const inner = `
    <rect x="0" y="0" width="400" height="300" rx="10" fill="#fff" stroke="#e3e8ee"/>
    <polygon points="${pA} ${pB} ${pC}" fill="#eaf2fb" stroke="#0e2a47" stroke-width="2.2" stroke-linejoin="round"/>
    <!-- marca ángulo recto en C -->
    <path d="M 170 100 L 190 100 L 190 80" fill="none" stroke="#b3261e" stroke-width="2.2"/>
    <text x="196" y="96" font-size="10" font-family="sans-serif" fill="#b3261e">∟</text>
    <text x="102" y="238" text-anchor="middle" font-size="13" font-family="sans-serif" fill="#0e2a47">${esc(labels.A||'A')}</text>
    <text x="298" y="136" text-anchor="middle" font-size="13" font-family="sans-serif" fill="#0e2a47">${esc(labels.B||'B')}</text>
    <text x="170" y="68" text-anchor="middle" font-size="13" font-family="sans-serif" fill="#0e2a47">${esc(labels.C||'C')}</text>
    <text x="${midAC.split(',')[0]}" y="${midAC.split(',')[1]}" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#0e2a47" transform="rotate(-68 ${midAC})">AC=${ac}</text>
    <text x="${midBC.split(',')[0]}" y="${midBC.split(',')[1]}" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#0e2a47">BC=${bc}</text>
    <text x="200" y="288" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#64748b">recto en C</text>
  `;
  return svgWrap(inner);
}
export function figTrianguloIsosceles({ ab_ac='AB=AC', angleB=50, labels={A:'A',B:'B',C:'C'} }={}){
  const pA='110,220', pB='290,220', pC='200,70';
  const inner = `
    <rect x="0" y="0" width="400" height="300" rx="10" fill="#fff" stroke="#e3e8ee"/>
    <polygon points="${pA} ${pB} ${pC}" fill="#eaf2fb" stroke="#0e2a47" stroke-width="2.2" stroke-linejoin="round"/>
    <!-- marcas de igualdad AB = AC -->
    <line x1="150" y1="150" x2="160" y2="142" stroke="#b3261e" stroke-width="2"/>
    <line x1="240" y1="150" x2="250" y2="142" stroke="#b3261e" stroke-width="2"/>
    <text x="102" y="238" text-anchor="middle" font-size="13" font-family="sans-serif" fill="#0e2a47">${esc(labels.A||'A')}</text>
    <text x="298" y="238" text-anchor="middle" font-size="13" font-family="sans-serif" fill="#0e2a47">${esc(labels.B||'B')}</text>
    <text x="200" y="58" text-anchor="middle" font-size="13" font-family="sans-serif" fill="#0e2a47">${esc(labels.C||'C')}</text>
    <text x="200" y="248" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#5b6b7a">${esc(ab_ac)}</text>
    <text x="132" y="214" font-size="10" font-family="sans-serif" fill="#b3261e">∠B=${angleB}°</text>
  `;
  return svgWrap(inner);
}
export function figTrianguloLeyCosenos({ ab=5, ac=7, angleA=60, labels={A:'A',B:'B',C:'C'} }={}){
  // A en origen con ángulo 60° entre AB (horizontal) y AC (60°)
  const Ax=110,Ay=220, Bx=280,By=220;
  const rad=angleA*Math.PI/180;
  const lenAC=110; // visual
  const Cx=Ax+lenAC*Math.cos(rad), Cy=Ay-lenAC*Math.sin(rad);
  const inner = `
    <rect x="0" y="0" width="400" height="300" rx="10" fill="#fff" stroke="#e3e8ee"/>
    <polygon points="${Ax},${Ay} ${Bx},${By} ${Cx.toFixed(1)},${Cy.toFixed(1)}" fill="#eaf2fb" stroke="#0e2a47" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M ${Ax+28},${Ay} A 28 28 0 0 0 ${(Ax+28*Math.cos(rad)).toFixed(1)},${(Ay-28*Math.sin(rad)).toFixed(1)}" fill="none" stroke="#b3261e" stroke-width="1.8"/>
    <text x="${Ax+36}" y="${Ay-10}" font-size="11" font-family="sans-serif" fill="#b3261e">∠A=${angleA}°</text>
    <text x="${102}" y="${Ay+14}" text-anchor="middle" font-size="13" font-family="sans-serif" fill="#0e2a47">${esc(labels.A||'A')}</text>
    <text x="${Bx+8}" y="${By+6}" font-size="13" font-family="sans-serif" fill="#0e2a47">${esc(labels.B||'B')}</text>
    <text x="${Cx.toFixed(1)}" y="${(Cy-10).toFixed(1)}" text-anchor="middle" font-size="13" font-family="sans-serif" fill="#0e2a47">${esc(labels.C||'C')}</text>
    <text x="${(Ax+Bx)/2}" y="${Ay+16}" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#0e2a47">AB=${ab}</text>
    <text x="${(Ax+Cx)/2 -8}" y="${(Ay+Cy)/2}" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#0e2a47" transform="rotate(-30 ${(Ax+Cx)/2} ${(Ay+Cy)/2})">AC=${ac}</text>
    <text x="200" y="288" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#64748b">BC = ? (ley de cosenos)</text>
  `;
  return svgWrap(inner);
}
export function figPlanoRecta({ ax=2, ay=2, bx=6, by=8, labels={A:'A',B:'B'} }={}){
  // Plano cartesiano con puntos A(ax,ay) B(bx,by) y recta
  const W=400,H=300, ox=70,oy=240, scale=22;
  const Xax=ax*scale+ox, Yay=oy-ay*scale, Xbx=bx*scale+ox, Yby=oy-by*scale;
  // ejes
  const inner = `
    <rect x="0" y="0" width="400" height="300" rx="10" fill="#fff" stroke="#e3e8ee"/>
    <line x1="50" y1="${oy}" x2="380" y2="${oy}" stroke="#334155" stroke-width="1.6"/>
    <line x1="${ox}" y1="30" x2="${ox}" y2="270" stroke="#334155" stroke-width="1.6"/>
    <polygon points="380,${oy} 372,${oy-4} 372,${oy+4}" fill="#334155"/>
    <polygon points="${ox},30 ${ox-4},38 ${ox+4},38" fill="#334155"/>
    <text x="384" y="${oy+4}" font-size="10" font-family="sans-serif" fill="#334155">x</text>
    <text x="${ox-10}" y="26" font-size="10" font-family="sans-serif" fill="#334155">y</text>
    <!-- recta -->
    <line x1="${Xax}" y1="${Yay}" x2="${Xbx}" y2="${Yby}" stroke="#0e2a47" stroke-width="2.2"/>
    <line x1="60" y1="${(oy - ((-3)*scale + oy - Yay)/1 )}" x2="380" y2="${(oy - (12*scale))}" stroke="#0e2a47" stroke-width="1.4" stroke-dasharray="6 4" opacity="0.35"/>
    <circle cx="${Xax}" cy="${Yay}" r="5" fill="#b3261e" stroke="#fff" stroke-width="2"/>
    <circle cx="${Xbx}" cy="${Yby}" r="5" fill="#0f766e" stroke="#fff" stroke-width="2"/>
    <text x="${Xax-10}" y="${Yay+16}" font-size="11" font-family="sans-serif" fill="#b3261e">${esc(labels.A||'A')}(${ax},${ay})</text>
    <text x="${Xbx+8}" y="${Yby-8}" font-size="11" font-family="sans-serif" fill="#0f766e">${esc(labels.B||'B')}(${bx},${by})</text>
    <text x="200" y="288" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#64748b">m = Δy/Δx</text>
  `;
  return svgWrap(inner);
}
export function figParalelas({ angulo=42, labels={} }={}){
  const a = angulo;
  // dos horizontales y una transversal
  const inner = `
    <rect x="0" y="0" width="400" height="300" rx="10" fill="#fff" stroke="#e3e8ee"/>
    <line x1="40" y1="110" x2="360" y2="110" stroke="#0e2a47" stroke-width="2.2"/>
    <line x1="40" y1="210" x2="360" y2="210" stroke="#0e2a47" stroke-width="2.2"/>
    <line x1="110" y1="30" x2="270" y2="270" stroke="#c45c26" stroke-width="2.2"/>
    <text x="30" y="114" font-size="11" font-family="sans-serif" fill="#5b6b7a">l₁</text>
    <text x="30" y="214" font-size="11" font-family="sans-serif" fill="#5b6b7a">l₂</text>
    <text x="275" y="265" font-size="11" font-family="sans-serif" fill="#c45c26">t · ${a}°</text>
    <!-- 8 ángulos numerados -->
    <text x="150" y="105" font-size="10" font-family="sans-serif" fill="#0e2a47">∠1</text>
    <text x="175" y="105" font-size="10" font-family="sans-serif" fill="#0e2a47">∠2</text>
    <text x="150" y="130" font-size="10" font-family="sans-serif" fill="#0e2a47">∠3</text>
    <text x="175" y="130" font-size="10" font-family="sans-serif" fill="#0e2a47">∠4</text>
    <text x="190" y="205" font-size="10" font-family="sans-serif" fill="#0e2a47">∠5</text>
    <text x="215" y="205" font-size="10" font-family="sans-serif" fill="#0e2a47">∠6</text>
    <text x="190" y="230" font-size="10" font-family="sans-serif" fill="#0e2a47">∠7</text>
    <text x="215" y="230" font-size="10" font-family="sans-serif" fill="#0e2a47">∠8</text>
  `;
  return svgWrap(inner);
}
export function figVector({ vx=3, vy=4, origin={x:80,y:220}, scale=28 }={}){
  const ox=origin.x, oy=origin.y;
  const ex=ox+vx*scale, ey=oy - vy*scale;
  const inner = `
    <rect x="0" y="0" width="400" height="300" rx="10" fill="#fff" stroke="#e3e8ee"/>
    <!-- ejes -->
    <line x1="40" y1="220" x2="370" y2="220" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="4 4"/>
    <line x1="80" y1="260" x2="80" y2="40" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="4 4"/>
    <text x="365" y="232" font-size="11" font-family="sans-serif" fill="#64748b">x</text>
    <text x="68" y="50" font-size="11" font-family="sans-serif" fill="#64748b">y</text>
    <!-- componentes -->
    <line x1="${ox}" y1="${oy}" x2="${ex}" y2="${oy}" stroke="#0f766e" stroke-width="1.6" stroke-dasharray="6 3"/>
    <line x1="${ex}" y1="${oy}" x2="${ex}" y2="${ey}" stroke="#7b2cbf" stroke-width="1.6" stroke-dasharray="6 3"/>
    ${arrow(ox,oy,ex,ey,'#0e2a47',2.4)}
    <text x="${(ox+ex)/2}" y="${oy+16}" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#0f766e">vₓ=${vx}</text>
    <text x="${ex+10}" y="${(oy+ey)/2}" font-size="11" font-family="sans-serif" fill="#7b2cbf">vᵧ=${vy}</text>
    <text x="${ex+8}" y="${ey-8}" font-size="12" font-family="sans-serif" fill="#0e2a47">v⃗</text>
  `;
  return svgWrap(inner);
}
export function figProyectil({ v0=20, ang=35, h0=0 }={}){
  // parábola esquemática 40,220 -> apex -> 360,220
  const inner = `
    <rect x="0" y="0" width="400" height="300" rx="10" fill="#fff" stroke="#e3e8ee"/>
    <line x1="40" y1="220" x2="380" y2="220" stroke="#94a3b8" stroke-width="1.4"/>
    <line x1="40" y1="220" x2="40" y2="40" stroke="#94a3b8" stroke-width="1.4"/>
    <text x="375" y="232" font-size="11" font-family="sans-serif" fill="#64748b">x</text>
    <text x="30" y="50" font-size="11" font-family="sans-serif" fill="#64748b">y</text>
    <path d="M 50 220 Q 170 60 360 220" fill="none" stroke="#0e2a47" stroke-width="2.2"/>
    ${arrow(50,220, 90, 190, '#c45c26', 2)}
    <text x="92" y="182" font-size="11" font-family="sans-serif" fill="#c45c26">v₀=${v0} m/s · ${ang}°</text>
    <text x="180" y="70" font-size="10" font-family="sans-serif" fill="#5b6b7a">hₘₐₓ</text>
    <circle cx="170" cy="78" r="3" fill="#0e2a47"/>
    <text x="52" y="238" font-size="10" font-family="sans-serif" fill="#64748b">origen · h₀=${h0} m</text>
  `;
  return svgWrap(inner);
}
export function figPlanoInclinado({ theta=30, mu=0.2, m=2 }={}){
  const inner = `
    <rect x="0" y="0" width="400" height="300" rx="10" fill="#fff" stroke="#e3e8ee"/>
    <!-- plano -->
    <polygon points="40,220 360,220 360,190 110,190" fill="#f1f5f9" stroke="#0e2a47" stroke-width="1.8"/>
    <line x1="40" y1="220" x2="110" y2="190" stroke="#0e2a47" stroke-width="2.2"/>
    <!-- bloque -->
    <rect x="130" y="152" width="56" height="36" rx="4" fill="#eaf2fb" stroke="#0e2a47" stroke-width="1.8"/>
    <text x="158" y="175" text-anchor="middle" font-size="12" font-family="sans-serif" fill="#0e2a47">m=${m} kg</text>
    <!-- ángulo -->
    <path d="M 110 190 A 30 30 0 0 0 138 177" fill="none" stroke="#c45c26" stroke-width="1.6"/>
    <text x="132" y="204" font-size="11" font-family="sans-serif" fill="#c45c26">θ=${theta}°</text>
    <!-- fuerzas -->
    ${arrow(158,152, 158,110, '#b3261e',1.8)}
    <text x="166" y="122" font-size="10" font-family="sans-serif" fill="#b3261e">N</text>
    ${arrow(158,170, 158,210, '#0e2a47',1.8)}
    <text x="166" y="214" font-size="10" font-family="sans-serif" fill="#0e2a47">mg</text>
    ${arrow(130,170, 96,182, '#7b2cbf',1.8)}
    <text x="68" y="180" font-size="10" font-family="sans-serif" fill="#7b2cbf">f=μN μ=${mu}</text>
  `;
  return svgWrap(inner);
}
export function figCircular({ r=5, omega=2 }={}){
  const inner = `
    <rect x="0" y="0" width="400" height="300" rx="10" fill="#fff" stroke="#e3e8ee"/>
    <circle cx="200" cy="150" r="88" fill="none" stroke="#0e2a47" stroke-width="2"/>
    <circle cx="200" cy="150" r="3" fill="#0e2a47"/>
    <text x="200" y="148" font-size="10" font-family="sans-serif" fill="#0e2a47" dx="6" dy="-6">O</text>
    ${arrow(200,150, 270,100, '#0e2a47',2)}
    <text x="268" y="96" font-size="11" font-family="sans-serif" fill="#0e2a47">r=${r} m</text>
    <!-- velocidad tangencial -->
    ${arrow(270,100, 295,68, '#c45c26',1.8)}
    <text x="298" y="64" font-size="10" font-family="sans-serif" fill="#c45c26">v=ωr ω=${omega} rad/s</text>
    <!-- ángulo -->
    <path d="M 240 150 A 40 40 0 0 0 260 122" fill="none" stroke="#7b2cbf" stroke-width="1.6"/>
    <text x="248" y="142" font-size="10" font-family="sans-serif" fill="#7b2cbf">θ</text>
  `;
  return svgWrap(inner);
}
export function figDCL({ forces=[{label:'F₁', fx:30, fy:0},{label:'F₂', fx:-10, fy:18}], title='DCL' }={}){
  const cx=200, cy=150;
  let arrows = forces.map((f,i)=>{
    const sc=1.1;
    const ex=cx+f.fx*sc, ey=cy - f.fy*sc;
    const col=['#0e2a47','#c45c26','#0f766e','#7b2cbf'][i%4];
    return arrow(cx,cy,ex,ey,col,2) + `<text x="${ex + (f.fx>0?6:-18)}" y="${ey + (f.fy>0?-8:6)}" font-size="11" font-family="sans-serif" fill="${col}">${esc(f.label)}</text>`;
  }).join('\n    ');
  const inner = `
    <rect x="0" y="0" width="400" height="300" rx="10" fill="#fff" stroke="#e3e8ee"/>
    <rect x="${cx-28}" y="${cy-22}" width="56" height="44" rx="6" fill="#eaf2fb" stroke="#0e2a47" stroke-width="1.8"/>
    <text x="${cx}" y="${cy+6}" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#0e2a47">${esc(title)}</text>
    ${arrows}
    <text x="200" y="268" text-anchor="middle" font-size="10" font-family="sans-serif" fill="#64748b">ΣF⃗ = m·a⃗</text>
  `;
  return svgWrap(inner);
}
export function figTrabajoEnergia({}={}){
  const inner = `
    <rect x="0" y="0" width="400" height="300" rx="10" fill="#fff" stroke="#e3e8ee"/>
    <line x1="50" y1="220" x2="350" y2="220" stroke="#94a3b8" stroke-width="1.4"/>
    <line x1="50" y1="220" x2="50" y2="50" stroke="#94a3b8" stroke-width="1.4"/>
    <text x="345" y="232" font-size="11" font-family="sans-serif" fill="#64748b">x</text>
    <text x="38" y="60" font-size="11" font-family="sans-serif" fill="#64748b">F</text>
    <polygon points="60,220 60,120 150,120 150,220" fill="#eaf2fb" stroke="#0e2a47" stroke-width="1.6"/>
    <text x="105" y="175" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#0e2a47">W = F·d</text>
    <text x="105" y="135" text-anchor="middle" font-size="10" font-family="sans-serif" fill="#5b6b7a">área bajo F(x)</text>
  `;
  return svgWrap(inner);
}
export const FIG_HELPERS = { figTriangulo, figTrianguloRectangulo, figTrianguloIsosceles, figTrianguloLeyCosenos, figPlanoRecta, figParalelas, figVector, figProyectil, figPlanoInclinado, figCircular, figDCL, figTrabajoEnergia };
export default FIG_HELPERS;
