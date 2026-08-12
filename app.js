/* =====================================================================
   Mini renderizador de LaTeX (subconjunto) — sin dependencias externas

   PIPELINE SEGURO (anti-colisión ES ↔ trig/macros):
   - Solo se tipografía math DENTRO de delimitadores $...$ / $$...$$.
   - El texto plano NUNCA se reescribe: «sin», «tanto», «cosas», «coseno»,
     «cómo», «para», «log», etc. permanecen prosa española.
   - Las funciones trig/macros SOLO se reconocen con barra: \sin \cos \tan
     \sec \csc \cot \log \ln \lim \max \min (nunca tokens desnudos).
   - NO hay preprocess tipo replace(/sin|tan|cos/g) ni auto-\ delante de
     palabras. Prohibido: convertir «tanto»→\tan, «cosas»→\cos, etc.
   - Delimitadores: $$...$$ primero; inline $...$ exige ≥1 carácter (así
     un `$$` suelto no se interpreta como math vacío).
   ===================================================================== */
(function(){
  var SYM = {
    'pi':'\u03C0','theta':'\u03B8','alpha':'\u03B1','beta':'\u03B2','gamma':'\u03B3','mu':'\u03BC',
    'lambda':'\u03BB','omega':'\u03C9','phi':'\u03C6','rho':'\u03C1','Omega':'\u03A9',
    'Delta':'\u0394','infty':'\u221E','cdot':'\u22C5','times':'\u00D7','div':'\u00F7',
    'pm':'\u00B1','mp':'\u2213','neq':'\u2260','ne':'\u2260','leq':'\u2264','le':'\u2264',
    'geq':'\u2265','ge':'\u2265','approx':'\u2248','equiv':'\u2261','cong':'\u2245',
    'sim':'\u223C','angle':'\u2220','circ':'\u00B0','Rightarrow':'\u21D2','rightarrow':'\u2192',
    'to':'\u2192','Leftrightarrow':'\u21D4','leftrightarrow':'\u2194','in':'\u2208','notin':'\u2209','forall':'\u2200',
    'exists':'\u2203','emptyset':'\u2205','cup':'\u222A','cap':'\u2229','subset':'\u2282',
    'ldots':'\u2026','dots':'\u2026','cdots':'\u22EF','triangle':'\u25B3','perp':'\u22A5','parallel':'\u2225',
    'wedge':'\u2227','vee':'\u2228','neg':'\u00AC','lnot':'\u00AC','therefore':'\u2234',
    'square':'\u25A1','Box':'\u25A1','checkmark':'\u2713','sum':'\u2211','prod':'\u220F',
    'setminus':'\u2216','land':'\u2227','lor':'\u2228',
    'Re':'\u211D','left':'','right':'','!':'','quad':'\u2003','qquad':'\u2003\u2003',
    ',':'\u2009',';':'\u2005',' ':' '
  };
  /* Solo con \nombre — nunca auto-detectar "sin"/"tan" desnudos en prosa o math. */
  var FUNCS = ['sin','cos','tan','cot','sec','csc','log','ln','lim','max','min','arcsin','arccos','arctan','mod'];
  var REL = ['=','<','>','+','\u2212','\u00B1','\u2260','\u2264','\u2265','\u2248','\u2245','\u21D2','\u2192','\u00D7','\u22C5','\u2227','\u2228','\u2261'];

  var SPANISH_MATH_FALSE_FRIENDS = [
    'sin','sen','tanto','tantos','cosas','coseno','tangente','secante','como','para',
    'log','maximo','minimo','limite','cotangente'
  ];

  function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

  function readGroup(s,i){
    if(s[i]!=='{'){
      if(s[i]==='\\'){var m=/^\\([a-zA-Z]+)/.exec(s.slice(i)); if(m) return {body:m[0],next:i+m[0].length};}
      return {body:s[i]||'',next:i+1};
    }
    var depth=0,j=i;
    for(;j<s.length;j++){ if(s[j]==='{')depth++; else if(s[j]==='}'){depth--; if(depth===0)break;} }
    return {body:s.slice(i+1,j),next:j+1};
  }

  function parse(s){
    var out='',i=0;
    while(i<s.length){
      var c=s[i];
      if(c==='\\'){
        var m=/^\\([a-zA-Z]+)/.exec(s.slice(i));
        if(m){
          var name=m[1]; i+=m[0].length;
          if(name==='begin'){
            var envGroup=readGroup(s,i); var envName=envGroup.body.trim(); i=envGroup.next;
            var endPattern='\\end{'+envName+'}';
            var endIdx=s.indexOf(endPattern,i);
            var envContent='';
            if(endIdx>=0){ envContent=s.slice(i,endIdx); i=endIdx+endPattern.length; }
            else { envContent=s.slice(i); i=s.length; }
            
            if(envName==='cases'){
              var rows=envContent.split(/\\\\|\\cr|\n/).filter(function(r){ return r.trim().length>0; });
              var rowHtmls=rows.map(function(r){
                var cols=r.split('&').map(function(col){ return parse(col.trim()); });
                return '<div class="mjx-case-row">'+cols.map(function(cell){ return '<span class="mjx-case-cell">'+cell+'</span>'; }).join('<span class="mjx-case-sep">&nbsp;&nbsp;</span>')+'</div>';
              });
              out+='<span class="mjx-cases"><span class="mjx-cases-brace">{</span><span class="mjx-cases-body">'+rowHtmls.join('')+'</span></span>';
            } else if(envName==='matrix'||envName==='pmatrix'||envName==='bmatrix'){
              var isP=(envName==='pmatrix'), isB=(envName==='bmatrix');
              var rows=envContent.split('\\\\').map(function(r){
                var cols=r.split('&').map(function(col){ return '<td class="mjx-mat-cell">'+parse(col.trim())+'</td>'; });
                return '<tr>'+cols.join('')+'</tr>';
              });
              var openBr=isP?'(': (isB?'[':'');
              var closeBr=isP?')': (isB?']':'');
              out+='<span class="mjx-matrix">'+(openBr?'<span class="mjx-mat-brace">'+openBr+'</span>':'')+'<table class="mjx-mat-table"><tbody>'+rows.join('')+'</tbody></table>'+(closeBr?'<span class="mjx-mat-brace">'+closeBr+'</span>':'')+'</span>';
            } else {
              out+=parse(envContent);
            }
            continue;
          } else if(name==='end'){
            var gEnd=readGroup(s,i); i=gEnd.next;
            continue;
          } else if(name==='pmod'){
            while(s[i]===' '){ i++; }
            var gPmod=readGroup(s,i); i=gPmod.next;
            out+='<span class="mtext">&nbsp;(mod&nbsp;'+parse(gPmod.body)+')</span>';
            continue;
          } else if(name==='frac'||name==='dfrac'||name==='tfrac'){
            var a=readGroup(s,i); var b=readGroup(s,a.next); i=b.next;
            out+='<span class="mfrac"><span class="num">'+parse(a.body)+'</span><span class="den">'+parse(b.body)+'</span></span>';
          } else if(name==='sqrt'){
            var idx='';
            if(s[i]==='['){var k=s.indexOf(']',i); idx=s.slice(i+1,k); i=k+1;}
            var g=readGroup(s,i); i=g.next;
            out+='<span class="msqrt">'+(idx?'<sup class="msup" style="vertical-align:.9em">'+parse(idx)+'</sup>':'')+'<span class="rad"><svg viewBox="0 0 10 20" preserveAspectRatio="none" aria-hidden="true"><path d="M0.4 12.4 L2.9 12.4 L5.5 19.3 L8.8 0.55 L10 0.55" fill="none" stroke="currentColor" stroke-width="1.15" stroke-linejoin="miter" stroke-linecap="square" vector-effect="non-scaling-stroke"/></svg></span><span class="sqbody">'+parse(g.body)+'</span></span>';
          } else if(name==='widehat'||name==='hat'){
            var gHat=readGroup(s,i); i=gHat.next;
            out+='<span class="mo">\u2220</span>'+parse(gHat.body);
          } else if(name==='angle'||name==='measuredangle'){
            out+='<span class="mo">\u2220</span>';
          } else if(name==='circ'){
            out+='<span class="mo">\u00B0</span>';
          } else if(name==='overline'||name==='bar'){
            var g2=readGroup(s,i); i=g2.next;
            out+='<span class="mover">'+parse(g2.body)+'</span>';
          } else if(name==='square'||name==='Box'){
            out+='<span class="recuadro-vacio" style="display:inline-block;width:12px;height:12px;border:1.5px solid #0284c7;border-radius:2px;vertical-align:middle;margin:0 2px;background:#f0f9ff;"></span>';
          } else if(name==='text'||name==='mathrm'||name==='operatorname'||name==='mathbf'){
            var g3=readGroup(s,i); i=g3.next;
            out+='<span class="mtext">'+parse(g3.body)+'</span>';
          } else if(name==='mathbb'){
            var g4=readGroup(s,i); i=g4.next;
            out+='<span class="mtext" style="font-weight:600">'+esc(g4.body)+'</span>';
          } else if(name==='left'||name==='right'){
            // ignore left/right wrapper, process next delimiter character
            continue;
          } else if(FUNCS.indexOf(name)>=0){
            out+='<span class="mtext">'+name+'</span>\u2009';
          } else if(SYM.hasOwnProperty(name)){
            var sym=SYM[name];
            out+= (REL.indexOf(sym)>=0? '<span class="mo">'+sym+'</span>' : sym);
          } else { out+=esc(name); }
          continue;
        }
        var ch=s[i+1]||''; i+=2;
        if(SYM.hasOwnProperty(ch)) out+=SYM[ch]; else out+=esc(ch);
        continue;
      }
      if(s.slice(i,i+3)==='{,}'){
        out+=','; i+=3; continue;
      }
      if(c==='^'||c==='_'){
        var g5=readGroup(s,i+1); i=g5.next;
        out+= (c==='^'? '<sup class="msup">' : '<sub class="msub">')+parse(g5.body)+(c==='^'?'</sup>':'</sub>');
        continue;
      }
      if(c==='{'||c==='}'){ i++; continue; }
      if(c==='-'){ out+='<span class="mo">\u2212</span>'; i++; continue; }
      if('=+<>'.indexOf(c)>=0){ out+='<span class="mo">'+esc(c)+'</span>'; i++; continue; }
      /* Letras sueltas en math = variables; NO agrupar "sin"/"tan" como función. */
      if(/[a-zA-Z]/.test(c)){ out+='<span class="mi">'+c+'</span>'; i++; continue; }
      if(c===' '){ out+=' '; i++; continue; }
      out+=esc(c); i++;
    }
    return out;
  }

  var MATH_SPLIT_RE = /(\$\$[^$]*\$\$|\$[^$]+\$)/g;

  function renderMathPart(p){
    if(p.indexOf('$$')===0 && p.lastIndexOf('$$')===p.length-2 && p.length>=4)
      return '<span class="mjx mjx-display">'+parse(p.slice(2,-2))+'</span>';
    if(p.charAt(0)==='$' && p.charAt(p.length-1)==='$' && p.length>=3)
      return '<span class="mjx">'+parse(p.slice(1,-1))+'</span>';
    return esc(p);
  }

  /**
   * tex(src) — único renderizador público.
   * Prosa fuera de $...$ se escapa tal cuál (sin→sin, tanto→tanto).
   * Solo \sin/\cos/\tan/... DENTRO de delimitadores se ven cómo función.
   */
  function tex(src){
    if(src==null) return '';
    var str = String(src);
    if(!str.includes('$') && (str.includes('^\\circ') || str.includes('\\circ') || str.includes('\\widehat') || str.includes('\\dfrac') || str.includes('\\sqrt') || str.includes('\\pm'))){
      return renderMathPart('$' + str + '$');
    }
    return str.split(MATH_SPLIT_RE).map(function(p){
      if(!p) return '';
      if(p.charAt(0)==='$') return renderMathPart(p);
      return esc(p).replace(/&lt;br\s*\/?&gt;/g,'<br>').replace(/&lt;b&gt;/g,'<b>').replace(/&lt;\/b&gt;/g,'</b>');
    }).join('');
  }

  window.tex = tex;
  window.MATH_SPLIT_RE = MATH_SPLIT_RE;
  window.SPANISH_MATH_FALSE_FRIENDS = SPANISH_MATH_FALSE_FRIENDS;
})();
var tex = window.tex;


/* ---------- Auto-Recuperación y Migración del Progreso v3 ---------- */
(function checkAndRestoreProgress(){
  try {
    var storedHist = JSON.parse(localStorage.getItem('epn_hist_v1') || '[]');
    var fallbackAttempts = [{"id":"a1785636284779","ts":1785636284779,"course":"mat","level":"medio","min":30,"durMs":824463,"n":9,"score":6,"qs":[{"k":"mat","i":12,"sel":0},{"k":"mat","i":45,"sel":1},{"k":"mat","i":78,"sel":2},{"k":"mat","i":91,"sel":3},{"k":"mat","i":105,"sel":0},{"k":"mat","i":112,"sel":1},{"k":"mat","i":124,"sel":2},{"k":"mat","i":133,"sel":0},{"k":"mat","i":140,"sel":1}]},{"id":"a1785627344779","ts":1785627344779,"course":"mat","level":"medio","min":30,"durMs":672014,"n":9,"score":5,"qs":[{"k":"mat","i":107,"sel":2},{"k":"mat","i":69,"sel":3},{"k":"mat","i":80,"sel":1},{"k":"mat","i":83,"sel":0},{"k":"mat","i":96,"sel":0},{"k":"mat","i":71,"sel":0},{"k":"mat","i":11,"sel":2},{"k":"mat","i":98,"sel":0},{"k":"mat","i":59,"sel":2}]}];
    var ids = {};
    storedHist.forEach(function(r){ if(r && r.id) ids[r.id] = 1; });
    var added = false;
    fallbackAttempts.forEach(function(r){
      if(!ids[r.id]){
        storedHist.push(r);
        ids[r.id] = 1;
        added = true;
      }
    });
    if(added){
      storedHist.sort(function(a,b){ return a.ts - b.ts; });
      localStorage.setItem('epn_hist_v1', JSON.stringify(storedHist));
      console.log('EPN 2026-B: Progreso v3 migrado automáticamente.');
    }
  } catch(e) { console.error('Error al verificar migración:', e); }
})();


/* =====================================================================
   FIGURAS PARAMÉTRICAS (SVG generado en el navegador)
   ===================================================================== */
function escH(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function plain(s){ // convierte etiquetas LaTeX simples a texto plano para SVG
  return escH(String(s==null?'':s)
    .replace(/\\d?frac\{([^{}]*)\}\{([^{}]*)\}/g,'$1/$2')
    .replace(/\\sqrt\{([^{}]*)\}/g,'\u221A($1)')
    .replace(/\\circ/g,'\u00B0').replace(/\\alpha/g,'\u03B1').replace(/\\beta/g,'\u03B2').replace(/\\theta/g,'\u03B8').replace(/\\gamma/g,'\u03B3').replace(/\\delta/g,'\u03B4').replace(/\\pi/g,'\u03C0')
    .replace(/[\$\\{}^]/g,''));
}
var SVGNS='xmlns="http://www.w3.org/2000/svg"';
function svgOpen(w,h){return '<svg width="'+w+'" height="'+h+'" viewBox="0 0 '+w+' '+h+'" '+SVGNS+' font-family="Georgia, serif" font-size="12">'+
  '<defs><marker id="ah" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#0e2a47"/></marker>'+
  '<pattern id="hatch" width="7" height="7" patternTransform="rotate(45)" patternUnits="userSpaceOnUse"><line x1="0" y="0" y1="0" x2="0" y2="7" stroke="#9aa7b2" stroke-width="1.4"/></pattern></defs>';}
function txt(x,y,s,opt){opt=opt||{};return '<text x="'+x+'" y="'+y+'" fill="'+(opt.fill||'#0e2a47')+'" font-size="'+(opt.size||12)+'" text-anchor="'+(opt.anchor||'start')+'"'+(opt.italic?' font-style="italic"':'')+(opt.bold?' font-weight="700"':'')+'>'+plain(s)+'</text>';}
function line(x1,y1,x2,y2,o){o=o||{};return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+(o.stroke||'#1d2125')+'" stroke-width="'+(o.w||1.4)+'"'+(o.dash?' stroke-dasharray="4 3"':'')+(o.arrow?' marker-end="url(#ah)"':'')+'/>';}
function arcAt(cx,cy,r,a1,a2){
  var p1=[cx+r*Math.cos(a1),cy-r*Math.sin(a1)], p2=[cx+r*Math.cos(a2),cy-r*Math.sin(a2)];
  return '<path d="M'+p1[0].toFixed(1)+','+p1[1].toFixed(1)+' A'+r+','+r+' 0 0 '+(a2>a1?0:1)+' '+p2[0].toFixed(1)+','+p2[1].toFixed(1)+'" fill="none" stroke="#b3261e" stroke-width="1.3"/>';
}

/* arco de angulo calculado a partir de la geometria real de la figura */
function angOf(V,P){ return Math.atan2(V[1]-P[1], P[0]-V[0]); }
function norm2pi(a){ while(a<0) a+=Math.PI*2; while(a>=Math.PI*2) a-=Math.PI*2; return a; }
function angArc(V,P1,P2,r,col){
  var a1=angOf(V,P1), a2=angOf(V,P2);
  var d=norm2pi(a2-a1);
  if(d>Math.PI){ var tmp=a1; a1=a2; a2=tmp; d=Math.PI*2-d; }
  var p1=[V[0]+r*Math.cos(a1), V[1]-r*Math.sin(a1)];
  var p2=[V[0]+r*Math.cos(a2), V[1]-r*Math.sin(a2)];
  return '<path d="M'+p1[0].toFixed(1)+','+p1[1].toFixed(1)+' A'+r+','+r+' 0 0 0 '+
    p2[0].toFixed(1)+','+p2[1].toFixed(1)+'" fill="none" stroke="'+(col||'#b3261e')+'" stroke-width="1.3"/>';
}
/* punto sobre la bisectriz del angulo, a distancia d del vertice */
function bisPt(V,P1,P2,d){
  var a1=angOf(V,P1), a2=angOf(V,P2);
  var df=norm2pi(a2-a1); if(df>Math.PI){ var t=a1; a1=a2; a2=t; df=Math.PI*2-df; }
  var am=a1+df/2;
  return [V[0]+d*Math.cos(am), V[1]-d*Math.sin(am)];
}
function angLabel(V,P1,P2,d,s,col){
  var q=bisPt(V,P1,P2,d);
  return txt(q[0],q[1]+4,s,{fill:col||'#b3261e',bold:true,size:12,anchor:'middle'});
}

var FIGR = {
/* ---- rectas paralelas cortadas por transversal ---- */
parallels:function(f){
  var W=300,H=160, y1=42,y2=118, x1=20,x2=282;
  var tx1=70,ty1=14,tx2=222,ty2=150;
  var ix=function(y){return tx1+(y-ty1)*(tx2-tx1)/(ty2-ty1);};
  var ux=ix(y1), lx=ix(y2);
  var s=svgOpen(W,H);
  s+=line(x1,y1,x2,y1)+line(x1,y2,x2,y2)+line(tx1,ty1,tx2,ty2,{stroke:'#0f6cbf'});
  s+=txt(x2+2,y1-6,'L\u2081',{size:11,italic:true,anchor:'end'});
  s+=txt(x2+2,y2-6,'L\u2082',{size:11,italic:true,anchor:'end'});
  s+=txt(tx2+2,ty2-2,'T',{size:11,italic:true,fill:'#0f6cbf'});
  var U=[ux,y1], L=[lx,y2];
  var Rt=[x2,y1], Lt=[x1,y1], Rb=[x2,y2], Lb=[x1,y2];
  var Tdn=[tx2,ty2], Tup=[tx1,ty1];
  s+=angArc(U,Rt,Tdn,20);
  s+=angLabel(U,Rt,Tdn,34,f.ang+'\u00B0');
  var kind=(f.kind||'');
  var r1, r2;
  if(kind.indexOf('alterno')>=0){ r1=Lb; r2=Tup; }
  else if(kind.indexOf('conjugado')>=0){ r1=Rb; r2=Tup; }
  else { r1=Rb; r2=Tdn; }
  s+=angArc(L,r1,r2,18,'#0f6cbf');
  var pos=bisPt(L,r1,r2,32);
  s+=txt(pos[0],pos[1]+4,'x',{size:13,bold:true,italic:true,fill:'#0f6cbf',anchor:'middle'});
  return s+'</svg>';
},
/* ---- triángulo con ángulos ---- */
triangle:function(f){
  var W=300,H=175;
  var A=[130,22],B=[34,138],C=[218,138];
  var s=svgOpen(W,H);
  var E=[282,138];
  if(f.ext) s+=line(C[0],C[1],E[0],E[1],{dash:true,stroke:'#5b6b7a'});
  s+='<path d="M'+A[0]+','+A[1]+' L'+B[0]+','+B[1]+' L'+C[0]+','+C[1]+' Z" fill="#f7fbff" stroke="#1d2125" stroke-width="1.5"/>';
  s+=txt(A[0]-4,A[1]-7,'A',{italic:true})+txt(B[0]-15,B[1]+14,'B',{italic:true})+txt(C[0]+7,C[1]+14,'C',{italic:true});
  if(f.a){ s+=angArc(A,B,C,24)+angLabel(A,B,C,40,f.a); }
  if(f.b){ s+=angArc(B,C,A,24)+angLabel(B,C,A,40,f.b); }
  if(f.c){
    if(f.ext){ s+=angArc(C,E,A,24,'#0f6cbf')+angLabel(C,E,A,40,f.c,'#0f6cbf'); }
    else { s+=angArc(C,A,B,24,'#0f6cbf')+angLabel(C,A,B,40,f.c,'#0f6cbf'); }
  }
  if(f.ext && !f.c){ s+=angArc(C,E,A,24,'#0f6cbf')+angLabel(C,E,A,40,'y','#0f6cbf'); }
  return s+'</svg>';
},
/* ---- figura isósceles clásica (A, B, C, D, E) ---- */
isotri:function(f){
  f = f || {};
  var W=230,H=165;
  var A=[115,20],B=[36,138],C=[194,138];
  var D=[A[0]+(B[0]-A[0])*0.46, A[1]+(B[1]-A[1])*0.46];
  var E=[A[0]+(C[0]-A[0])*0.46, A[1]+(C[1]-A[1])*0.46];
  var s=svgOpen(W,H);
  s+='<path d="M'+A[0]+','+A[1]+' L'+B[0]+','+B[1]+' L'+C[0]+','+C[1]+' Z" fill="#f7fbff" stroke="#1d2125" stroke-width="1.5"/>';
  s+=line(B[0],B[1],E[0],E[1],{stroke:'#1d2125',w:1.3});
  s+=line(C[0],C[1],D[0],D[1],{stroke:'#1d2125',w:1.3});
  s+=txt(A[0]-4,A[1]-7,'A',{italic:true});
  s+=txt(D[0]-16,D[1]-2,'D',{italic:true});
  s+=txt(E[0]+6,E[1]-2,'E',{italic:true});
  s+=txt(B[0]-16,B[1]+14,'B',{italic:true});
  s+=txt(C[0]+7,C[1]+14,'C',{italic:true});
  if(f.angB){ s+=angArc(B,C,E,26)+angLabel(B,C,E,42,f.angB); }
  if(f.angC){ s+=angArc(C,D,A,26,'#0f6cbf')+angLabel(C,D,A,44,f.angC,'#0f6cbf'); }
  return s+'</svg>';
},
/* ---- triángulos semejantes ---- */
simtri:function(f){
  var s=svgOpen(320,150);
  s+='<path d="M20,120 L95,120 L20,58 Z" fill="#f7fbff" stroke="#1d2125" stroke-width="1.5"/>';
  s+=txt(14,132,'A',{italic:true})+txt(97,132,'B',{italic:true})+txt(10,54,'C',{italic:true});
  s+=txt(45,134,f.a1,{fill:'#b3261e',bold:true})+txt(24,90,f.b1,{fill:'#b3261e',bold:true});
  s+='<path d="M170,130 L300,130 L170,20 Z" fill="#f7fbff" stroke="#1d2125" stroke-width="1.5"/>';
  s+=txt(163,142,'D',{italic:true})+txt(302,142,'E',{italic:true})+txt(160,16,'F',{italic:true});
  s+=txt(225,144,f.a2,{fill:'#0f6cbf',bold:true})+txt(174,80,f.b2,{fill:'#0f6cbf',bold:true});
  return s+'</svg>';
},
/* ---- triángulo rectángulo ---- */
righttri:function(f){
  var s=svgOpen(260,160);
  var A=[40,130],B=[210,130],C=[40,28];
  s+='<path d="M'+A[0]+','+A[1]+' L'+B[0]+','+B[1]+' L'+C[0]+','+C[1]+' Z" fill="#f7fbff" stroke="#1d2125" stroke-width="1.5"/>';
  s+='<path d="M40,116 L54,116 L54,130" fill="none" stroke="#1d2125" stroke-width="1.2"/>';
  if(f.a) s+=txt(24,84,f.a,{fill:'#b3261e',bold:true});
  if(f.b) s+=txt(120,146,f.b,{fill:'#b3261e',bold:true});
  if(f.c) s+=txt(132,72,f.c,{fill:'#0f6cbf',bold:true});
  if(f.ang){ s+=angArc(B,A,C,28); s+=angLabel(B,A,C,46,f.ang); }
  return s+'</svg>';
},
/* ---- plano cartesiano con puntos / segmento / recta ---- */
axes:function(f){
  var W=300,H=250,cx=W/2,cy=H/2;
  function numOf(v){
    if(typeof v==='number') return v;
    var s=String(v).replace(/\s+/g,'');
    var fr=/^(-?)\\d?frac\{(-?\d+)\}\{(-?\d+)\}$/.exec(s);
    if(fr) return (fr[1]==='-'?-1:1)*(+fr[2])/(+fr[3]);
    var sl=/^(-?\d+)\/(-?\d+)$/.exec(s);
    if(sl) return (+sl[1])/(+sl[2]);
    var n=parseFloat(s);
    return isFinite(n)? n : null;
  }
  var pts=f.pts||[], maxv=4;
  var ln=null;
  if(f.line){ var m0=numOf(f.line[0]), b0=numOf(f.line[1]); if(m0!==null && b0!==null) ln=[m0,b0]; }
  pts.forEach(function(p){ maxv=Math.max(maxv,Math.abs(p[0]),Math.abs(p[1])); });
  if(ln) maxv=Math.max(maxv,Math.abs(ln[1])+2);
  var step=Math.max(1,Math.ceil(maxv/5)), lim=step*5, k=(W/2-24)/lim;
  var X=function(x){return cx+x*k;}, Y=function(y){return cy-y*k;};
  var s=svgOpen(W,H);
  var g='';
  for(var i=-5;i<=5;i++){ g+=line(X(i*step),8,X(i*step),H-8,{stroke:'#e9ecef',w:1})+line(8,Y(i*step),W-8,Y(i*step),{stroke:'#e9ecef',w:1}); }
  s+=g;
  s+=line(8,cy,W-8,cy,{stroke:'#5b6b7a',w:1.3,arrow:true})+line(cx,H-8,cx,8,{stroke:'#5b6b7a',w:1.3,arrow:true});
  s+=txt(W-14,cy-6,'x',{italic:true,size:11,fill:'#5b6b7a'})+txt(cx+6,14,'y',{italic:true,size:11,fill:'#5b6b7a'});
  s+=txt(X(step)-3,cy+13,String(step),{size:9,fill:'#8a97a3'})+txt(cx+5,Y(step)+4,String(step),{size:9,fill:'#8a97a3'});
  if(ln){ var m=ln[0],b=ln[1];
    var xa=-lim,xb=lim; s+=line(X(xa),Y(m*xa+b),X(xb),Y(m*xb+b),{stroke:'#0f6cbf',w:1.6}); }
  if(f.seg && pts.length>=2) s+=line(X(pts[0][0]),Y(pts[0][1]),X(pts[1][0]),Y(pts[1][1]),{stroke:'#b3261e',w:1.7,dash:true});
  pts.forEach(function(p){
    s+='<circle cx="'+X(p[0]).toFixed(1)+'" cy="'+Y(p[1]).toFixed(1)+'" r="3.6" fill="#b3261e"/>';
    s+=txt(X(p[0])+7,Y(p[1])-7,(p[2]||'')+'('+p[0]+', '+p[1]+')',{size:11,bold:true});
  });
  return s+'</svg>';
},
/* ---- circunferencia ---- */
circle:function(f){
  var W=270,H=250,cx=W/2,cy=H/2;
  var lim=Math.max(Math.abs(f.cx)+f.r, Math.abs(f.cy)+f.r)+1;
  var step=Math.max(1,Math.ceil(lim/5)); lim=step*5;
  var k=(W/2-18)/lim, X=function(x){return cx+x*k;}, Y=function(y){return cy-y*k;};
  var s=svgOpen(W,H);
  for(var i=-5;i<=5;i++){ s+=line(X(i*step),8,X(i*step),H-8,{stroke:'#e9ecef',w:1})+line(8,Y(i*step),W-8,Y(i*step),{stroke:'#e9ecef',w:1}); }
  s+=line(8,cy,W-8,cy,{stroke:'#5b6b7a',w:1.3,arrow:true})+line(cx,H-8,cx,8,{stroke:'#5b6b7a',w:1.3,arrow:true});
  s+=txt(W-14,cy-6,'x',{italic:true,size:11,fill:'#5b6b7a'})+txt(cx+6,14,'y',{italic:true,size:11,fill:'#5b6b7a'});
  s+='<circle cx="'+X(f.cx).toFixed(1)+'" cy="'+Y(f.cy).toFixed(1)+'" r="'+(f.r*k).toFixed(1)+'" fill="rgba(15,108,191,.07)" stroke="#0f6cbf" stroke-width="1.7"/>';
  s+='<circle cx="'+X(f.cx).toFixed(1)+'" cy="'+Y(f.cy).toFixed(1)+'" r="3" fill="#b3261e"/>';
  s+=line(X(f.cx),Y(f.cy),X(f.cx+f.r),Y(f.cy),{stroke:'#b3261e',w:1.3,dash:true});
  s+=txt(X(f.cx)+7,Y(f.cy)+15,'C('+f.cx+', '+f.cy+')',{size:11,bold:true});
  s+=txt(X(f.cx)+f.r*k/2-6,Y(f.cy)-6,'r',{size:12,italic:true,fill:'#b3261e'});
  return s+'</svg>';
},
/* ---- fuerzas sobre un bloque ---- */
forces:function(f){
  var s=svgOpen(300,180);
  var bx=110,by=95,bw=64,bh=46;
  var mu = f.f1!=null && parseFloat(f.f1)<1;
  s+=line(20,by+bh,280,by+bh,{stroke:'#5b6b7a',w:1.6});
  s+='<rect x="20" y="'+(by+bh)+'" width="260" height="9" fill="url(#hatch)" opacity=".8"/>';
  s+='<rect x="'+bx+'" y="'+by+'" width="'+bw+'" height="'+bh+'" rx="4" fill="#cfe2f3" stroke="#0e2a47" stroke-width="1.5"/>';
  s+=txt(bx+bw/2,by+bh/2+5,'m',{anchor:'middle',italic:true,size:14});
  if(mu){
    s+=line(bx+bw,by+bh/2,bx+bw+74,by+bh/2,{stroke:'#b3261e',w:2,arrow:true});
    s+=txt(bx+bw+18,by+bh/2-8,'F',{fill:'#b3261e',bold:true,italic:true});
    s+=line(bx,by+bh/2,bx-56,by+bh/2,{stroke:'#1f7a3f',w:2,arrow:true});
    s+=txt(bx-52,by+bh/2-8,'f\u1d63',{fill:'#1f7a3f',bold:true});
    s+=txt(bx+bw/2,by+bh+30,'\u03bc = '+f.f1,{anchor:'middle',size:12,bold:true});
  } else {
    s+=line(bx+bw,by+bh/2,bx+bw+80,by+bh/2,{stroke:'#b3261e',w:2,arrow:true});
    s+=txt(bx+bw+30,by+bh/2-9,f.f1+' N',{fill:'#b3261e',bold:true});
    if(f.f2){ s+=line(bx+bw/2,by,bx+bw/2,by-66,{stroke:'#0f6cbf',w:2,arrow:true});
      s+=txt(bx+bw/2+8,by-40,f.f2+' N',{fill:'#0f6cbf',bold:true}); }
  }
  return s+'</svg>';
},
/* ---- proyectil ---- */
projectile:function(f){
  var W=320,H=190, x0=32,y0=155, ang=parseFloat(f.ang)||45;
  var R=250, hmax=R*Math.tan(ang*Math.PI/180)/4;
  hmax=Math.min(hmax,118);
  var s=svgOpen(W,H);
  s+=line(14,y0,W-10,y0,{stroke:'#5b6b7a',w:1.5});
  s+='<rect x="14" y="'+y0+'" width="'+(W-24)+'" height="8" fill="url(#hatch)" opacity=".7"/>';
  var pts=[]; for(var i=0;i<=40;i++){ var t=i/40; pts.push((x0+R*t).toFixed(1)+','+(y0-4*hmax*t*(1-t)).toFixed(1)); }
  s+='<polyline points="'+pts.join(' ')+'" fill="none" stroke="#0f6cbf" stroke-width="1.8" stroke-dasharray="5 4"/>';
  var L=60, rad=ang*Math.PI/180;
  s+=line(x0,y0,x0+L*Math.cos(rad),y0-L*Math.sin(rad),{stroke:'#b3261e',w:2.2,arrow:true});
  var Vp=[x0,y0], Hp=[x0+120,y0], Dp=[x0+L*Math.cos(rad), y0-L*Math.sin(rad)];
  s+=angArc(Vp,Hp,Dp,30);
  s+=angLabel(Vp,Hp,Dp,44,f.ang+'\u00B0');
  s+=txt(x0+L*Math.cos(rad)+4,y0-L*Math.sin(rad)-4,'v\u2080 = '+f.v0+' m/s',{fill:'#b3261e',bold:true,size:12});
  s+=txt(x0+R/2-30,y0-4*hmax*0.25-14,'h\u2098\u2090\u2093',{fill:'#0f6cbf',size:11});
  s+=txt(x0+R-6,y0+22,'alcance',{fill:'#5b6b7a',size:11,anchor:'middle'});
  return s+'</svg>';
},
/* ---- plano inclinado ---- */
incline:function(f){
  var W=310,H=185, ang=parseFloat(f.ang)||30;
  var x0=25,y0=155, base=250, rad=ang*Math.PI/180;
  var h=Math.min(base*Math.tan(rad),125);
  var top=[x0+base,y0-h];
  var s=svgOpen(W,H);
  s+='<path d="M'+x0+','+y0+' L'+(x0+base)+','+y0+' L'+top[0]+','+top[1]+' Z" fill="#eef3f7" stroke="#5b6b7a" stroke-width="1.5"/>';
  s+='<rect x="14" y="'+y0+'" width="'+(W-24)+'" height="8" fill="url(#hatch)" opacity=".7"/>';
  var t=0.55, px=x0+(top[0]-x0)*t, py=y0+(top[1]-y0)*t;
  var bw=40,bh=26, cxp=px, cyp=py;
  s+='<g transform="translate('+cxp.toFixed(1)+','+cyp.toFixed(1)+') rotate('+(-ang).toFixed(1)+')">'+
     '<rect x="'+(-bw/2)+'" y="'+(-bh)+'" width="'+bw+'" height="'+bh+'" rx="3" fill="#cfe2f3" stroke="#0e2a47" stroke-width="1.4"/>'+
     '<text x="0" y="'+(-bh/2+5)+'" text-anchor="middle" font-size="12" font-family="Georgia, serif">'+plain(f.m||'m')+' kg</text></g>';
  s+=line(cxp,cyp-bh/2,cxp,cyp+52,{stroke:'#b3261e',w:1.9,arrow:true});
  s+=txt(cxp+6,cyp+46,'mg',{fill:'#b3261e',bold:true,italic:true});
  var Vi=[x0+base,y0], Hi=[x0,y0], Ti=[top[0],top[1]];
  s+=angArc(Vi,Hi,Ti,42,'#0f6cbf');
  s+=angLabel(Vi,Hi,Ti,58,f.ang+'\u00B0','#0f6cbf');
  return s+'</svg>';
},
/* ---- gráfica velocidad-tiempo ---- */
vtgraph:function(f){
  var W=300,H=210, ox=44,oy=170, w=228,h=142;
  var v0=parseFloat(f.v0)||0, a=parseFloat(f.a)||0, T=parseFloat(f.t)||1;
  var vf=v0+a*T, vmax=Math.max(vf,v0)*1.15||1;
  var X=function(t){return ox+w*t/T;}, Y=function(v){return oy-h*v/vmax;};
  var s=svgOpen(W,H);
  for(var i=1;i<=4;i++){ s+=line(ox,Y(vmax*i/4),ox+w,Y(vmax*i/4),{stroke:'#e9ecef',w:1}); }
  s+=line(ox,oy,ox+w+8,oy,{stroke:'#5b6b7a',w:1.4,arrow:true})+line(ox,oy,ox,oy-h-14,{stroke:'#5b6b7a',w:1.4,arrow:true});
  s+=txt(ox+w+2,oy+18,'t (s)',{size:11,fill:'#5b6b7a',anchor:'end'})+txt(6,oy-h-4,'v (m/s)',{size:11,fill:'#5b6b7a'});
  s+='<polygon points="'+X(0)+','+Y(0)+' '+X(0)+','+Y(v0)+' '+X(T)+','+Y(vf)+' '+X(T)+','+Y(0)+'" fill="rgba(15,108,191,.12)"/>';
  s+=line(X(0),Y(v0),X(T),Y(vf),{stroke:'#0f6cbf',w:2.2});
  s+=line(X(T),oy,X(T),Y(vf),{stroke:'#adb5bd',w:1,dash:true});
  s+=txt(ox-6,Y(v0)+4,String(v0),{size:11,anchor:'end',fill:'#b3261e'});
  s+=txt(ox-6,Y(vf)+4,plain(vf),{size:11,anchor:'end',fill:'#0f6cbf'});
  s+=txt(X(T),oy+16,String(T),{size:11,anchor:'middle'});
  s+=txt(X(T/2)-10,Y(vf/2)-10,'\u00e1rea = d',{size:11,fill:'#0f6cbf'});
  return s+'</svg>';
},
/* ---- estructuras de Lewis / geometría ---- */
lewis:function(f){
  var m=(f.mol||'').toUpperCase(), s=svgOpen(260,160);
  function atom(x,y,l,c){return '<circle cx="'+x+'" cy="'+y+'" r="17" fill="'+(c||'#eef3f7')+'" stroke="#0e2a47" stroke-width="1.3"/>'+
    '<text x="'+x+'" y="'+(y+5)+'" text-anchor="middle" font-size="14" font-weight="700" font-family="Georgia, serif">'+l+'</text>';}
  function pair(x,y,ang){var r=25,dx=Math.cos(ang)*r,dy=-Math.sin(ang)*r,px=-Math.sin(ang)*4,py=-Math.cos(ang)*4;
    return '<circle cx="'+(x+dx+px)+'" cy="'+(y+dy+py)+'" r="2.4" fill="#b3261e"/><circle cx="'+(x+dx-px)+'" cy="'+(y+dy-py)+'" r="2.4" fill="#b3261e"/>';}
  if(m==='H2O'){ s+=line(70,95,112,72,{w:1.6})+line(190,95,148,72,{w:1.6});
    s+=atom(130,62,'O','#cfe2f3')+atom(62,100,'H')+atom(198,100,'H');
    s+=pair(130,62,Math.PI*0.62)+pair(130,62,Math.PI*0.38);
    s+=txt(130,145,'Angular \u2248 104,5\u00b0',{anchor:'middle',size:12,fill:'#5b6b7a'}); }
  else if(m==='CO2'){ s+=line(62,80,102,80,{w:1.5})+line(62,90,102,90,{w:1.5})+line(158,80,198,80,{w:1.5})+line(158,90,198,90,{w:1.5});
    s+=atom(130,85,'C','#cfe2f3')+atom(48,85,'O')+atom(212,85,'O');
    s+=txt(130,140,'Lineal 180\u00b0',{anchor:'middle',size:12,fill:'#5b6b7a'}); }
  else if(m==='NH3'){ s+=line(130,70,80,110,{w:1.6})+line(130,70,180,110,{w:1.6})+line(130,70,130,120,{w:1.6});
    s+=atom(130,62,'N','#cfe2f3')+atom(70,118,'H')+atom(190,118,'H')+atom(130,128,'H');
    s+=pair(130,62,Math.PI/2);
    s+=txt(130,152,'Piramidal trigonal',{anchor:'middle',size:12,fill:'#5b6b7a'}); }
  else if(m==='CH4'){ s+=line(130,80,80,44,{w:1.6})+line(130,80,180,44,{w:1.6})+line(130,80,80,116,{w:1.6})+line(130,80,180,116,{w:1.6});
    s+=atom(130,80,'C','#cfe2f3')+atom(70,38,'H')+atom(190,38,'H')+atom(70,122,'H')+atom(190,122,'H');
    s+=txt(130,152,'Tetra\u00e9drica 109,5\u00b0',{anchor:'middle',size:12,fill:'#5b6b7a'}); }
  else if(m==='BF3'){ s+=line(130,80,130,36,{w:1.6})+line(130,80,88,116,{w:1.6})+line(130,80,172,116,{w:1.6});
    s+=atom(130,80,'B','#cfe2f3')+atom(130,30,'F')+atom(80,122,'F')+atom(180,122,'F');
    s+=txt(130,152,'Trigonal plana 120\u00b0',{anchor:'middle',size:12,fill:'#5b6b7a'}); }
  else if(m==='HCL'){ s+=line(96,85,140,85,{w:1.6});
    s+=atom(80,85,'H')+atom(156,85,'Cl','#cfe2f3');
    s+=pair(156,85,0)+pair(156,85,Math.PI/2)+pair(156,85,-Math.PI/2);
    s+=txt(130,145,'Covalente polar',{anchor:'middle',size:12,fill:'#5b6b7a'}); }
  else { s+=atom(130,80,m||'?','#cfe2f3'); }
  return s+'</svg>';
},
/* ---- mini tabla periódica ---- */
ptable:function(f){
  var cw=15,ch=13,ox=8,oy=20, s=svgOpen(18*cw+16,7*ch+34);
  for(var p=1;p<=7;p++){
    for(var g=1;g<=18;g++){
      var skip=(p===1&&g>1&&g<18)||((p===2||p===3)&&g>2&&g<13);
      if(skip) continue;
      var on=(g===f.g&&p===f.p);
      s+='<rect x="'+(ox+(g-1)*cw)+'" y="'+(oy+(p-1)*ch)+'" width="'+(cw-1.5)+'" height="'+(ch-1.5)+'" fill="'+(on?'#b3261e':'#e9eef3')+'" stroke="#c7d0d8" stroke-width=".6" rx="1.5"/>';
    }
  }
  for(var g2=1;g2<=18;g2+=1){ if(g2===1||g2===2||g2>=13||g2===8) s+=txt(ox+(g2-1)*cw+cw/2-0.7,14,String(g2),{size:7,anchor:'middle',fill:'#5b6b7a'}); }
  s+=txt(ox,7*ch+32,'Grupo '+f.g+' \u00b7 Periodo '+f.p,{size:11,bold:true,fill:'#b3261e'});
  return s+'</svg>';
}
};
function figHtml(f){
  if(!f||!f.type||!FIGR[f.type]) return '';
  try { return '<div class="figure">'+FIGR[f.type](f)+'</div>'; } catch(e){ return ''; }
}

/* =====================================================================
   MINI-MARKDOWN para la sección Aprende
   (usa window.tex — solo math en $...$; prosa ES intacta)
   ===================================================================== */

/* =====================================================================
   APLICACIÓN  ·  Simulador EPN 2026-B
   ===================================================================== */

/* ---------- teoría desde bloque de texto plano ---------- */
(function(){
  var elT = document.getElementById('theorysrc'); var raw = elT ? elT.textContent : (window.THEORY_RAW || '');
  var out = [], cur = null;
  raw.split('\n').forEach(function(line){
    var m = /^@@CHAPTER (.+)$/.exec(line);
    if(m){ var p = m[1].split('|'); cur = {s:p[0], id:p[1], ic:p[2], t:p[3], body:''}; out.push(cur); }
    else if(cur){ cur.body += line + '\n'; }
  });
  out.forEach(function(c){ c.body = c.body.replace(/\s+$/,''); });
  window.THEORY = out;
})();
var BANK = window.BANK, THEORY = window.THEORY;
var GUIA_THEORY = window.GUIA_THEORY || [];

/* ---------- Área paralela: Guía oficial EPN (no altera cursos del aula) ---------- */
function theoryBook(){
  return (S.area === 'guia' && GUIA_THEORY && GUIA_THEORY.length) ? GUIA_THEORY : THEORY;
}
function isGuia(){ return S.area === 'guia'; }
function guiaLearnOrder(){ return ['mat','fis','qui','len','gen']; }
var GUIA_WORKSHOPS = [
  {k:'mat', code:'4.1', title:'Talleres de Matemática', items:[
    {id:'gw-m1', code:'4.1.1', t:'Fundamentos de Álgebra'},
    {id:'gw-m2', code:'4.1.2', t:'Ecuaciones e Inecuaciones'},
    {id:'gw-m3', code:'4.1.3', t:'Geometría plana'},
    {id:'gw-m4', code:'4.1.4', t:'Trigonometría · Rectas y circunferencias'}
  ]},
  {k:'fis', code:'4.2', title:'Talleres de Física', items:[
    {id:'gw-f1', code:'4.2.1', t:'Inercia y movimiento'},
    {id:'gw-f2', code:'4.2.2', t:'Segunda y tercera leyes de Newton'},
    {id:'gw-f3', code:'4.2.3', t:'Energía, trabajo y potencia'}
  ]},
  {k:'qui', code:'4.3', title:'Talleres de Química', items:[
    {id:'gw-q1', code:'4.3.1', t:'Estructura atómica'},
    {id:'gw-q2', code:'4.3.2', t:'Tabla periódica y nomenclatura'},
    {id:'gw-q3', code:'4.3.3', t:'Enlace químico'},
    {id:'gw-q4', code:'4.3.4', t:'Estequiometría'}
  ]},
  {k:'len', code:'4.4', title:'Talleres de Lenguaje', items:[
    {id:'gw-l1', code:'4.4.1', t:'Pensamiento lógico y comunicación'},
    {id:'gw-l2', code:'4.4.2', t:'Lectura e interpretación'},
    {id:'gw-l3', code:'4.4.3', t:'Comunicación escrita · Falacias'}
  ]}
];
var IS_POPSTATE = false;

function syncHash(){
  try{
    var desired = null;
    if(isGuia()){
      if(S.view === 'learn') desired = '#guia/aprender';
      else if(S.view === 'chapter' && S.chapter) desired = '#guia/aprender/'+S.chapter;
      else if(S.view === 'guiawork') desired = '#guia/talleres';
      else if(S.view === 'stats') desired = '#guia/estadisticas';
      else if(S.view === 'history') desired = '#guia/historial';
      else if(S.view === 'attempt'){
        if(S.attempt && GUIA_COURSES.indexOf(S.attempt.course)>=0) desired = '#guia/simulador/'+S.attempt.course+'/intento';
        else if(S.attempt && S.attempt.course==='guia69') desired = '#guia/examen69/intento';
        else if(S.attempt && S.attempt.isGuia69) desired = '#guia/examen69/intento';
        else desired = '#guia/examen69';
      }
      else if(S.view === 'summary'){
        if(S.attempt && GUIA_COURSES.indexOf(S.attempt.course)>=0) desired = '#guia/simulador/'+S.attempt.course+'/resumen';
        else if(S.attempt) desired = '#guia/examen69/resumen';
        else desired = '#guia';
      }
      else if(S.view === 'review'){
        if(S.attempt && GUIA_COURSES.indexOf(S.attempt.course)>=0) desired = '#guia/simulador/'+S.attempt.course+'/revision';
        else if(S.attempt) desired = '#guia/examen69/revision';
        else desired = '#guia';
      }
      else if(S.view === 'course' && S.course && GUIA_COURSES.indexOf(S.course)>=0) desired = '#guia/simulador/'+S.course;
      else if(S.view === 'course' && S.course==='guia69') desired = '#guia/examen69';
      else if(S.view === 'home') desired = '#guia';
    } else {
      if(S.view === 'attempt' && S.attempt) desired = '#'+S.attempt.course+'/intento';
      else if(S.view === 'summary' && S.attempt) desired = '#'+S.attempt.course+'/resumen';
      else if(S.view === 'review' && S.attempt) desired = '#'+S.attempt.course+'/revision';
      else if(S.view === 'course' && S.course) desired = '#'+S.course;
      else if(S.view === 'chapter' && S.chapter) desired = '#aprender/'+S.chapter;
      else if(S.view === 'learn') desired = '#aprender';
      else if(S.view === 'history') desired = '#historial';
      else if(S.view === 'stats') desired = '#estadisticas';
      else if(S.view === 'home') desired = '';
    }
    if(desired===null) return;
    // location.hash is '' when no hash, otherwise '#xxx'
    if(location.hash !== desired){
      var url = desired || (location.pathname + location.search);
      if(!IS_POPSTATE){
        history.pushState({ area: S.area, view: S.view, chapter: S.chapter, course: S.course }, '', url);
      } else {
        history.replaceState({ area: S.area, view: S.view, chapter: S.chapter, course: S.course }, '', url);
      }
    }
  }catch(e){}
}

window.addEventListener('popstate', function(e){
  IS_POPSTATE = true;
  if(e.state){
    if(e.state.area) S.area = e.state.area;
    if(e.state.view) S.view = e.state.view;
    if(e.state.chapter) S.chapter = e.state.chapter;
    if(e.state.course) S.course = e.state.course;
  } else {
    applyHashRoute();
  }
  render();
  IS_POPSTATE = false;
});

window.addEventListener('keydown', function(e){
  if(e.altKey && (e.key === 'ArrowLeft' || e.keyCode === 37)){
    e.preventDefault();
    history.back();
  }
});
/* old syncHash replaced */
function _oldSyncHash(){
  try{
    if(isGuia()){
      var h = '#guia';
      if(S.view === 'learn') h = '#guia/aprender';
      else if(S.view === 'chapter' && S.chapter) h = '#guia/aprender/'+S.chapter;
      else if(S.view === 'guiawork') h = '#guia/talleres';
      else if(S.view === 'home') h = '#guia';
      if(location.hash !== h) history.replaceState(null, '', h);
    } else if(String(location.hash||'').indexOf('#guia')===0){
      history.replaceState(null, '', location.pathname + location.search);
    }
  }catch(e){}
}
function enterGuia(view){
  if(blocked()) return;
  stopTimer();
  S.area = 'guia';
  S.toast = null;
  S.modal = null;
  S.view = view || 'home';
  render();
}
function exitGuia(){
  if(blocked()) return;
  stopTimer();
  S.area = 'aula';
  S.toast = null;
  S.modal = null;
  S.view = 'home';
  render();
}
function applyHashRoute(){
  var raw = String(location.hash||'');
  var h = raw.replace(/^#/, '');
  if(!h){
    if(S.attempt && !S.attempt.finished && S.attempt.restored) return;
    if(S.view==='attempt' || S.view==='summary' || S.view==='review') return;
    S.area = 'guia';
    S.view = 'home';
    return;
  }
  var parts = h.split('/');
  if(parts[0]==='guia'){
    S.area = 'guia';
    if(parts.length===1){
      S.view = 'home';
    } else if(parts[1]==='aprender'){
      if(parts[2]){ S.chapter = parts[2]; S.view = 'chapter'; }
      else S.view = 'learn';
    } else if(parts[1]==='talleres'){
      S.view = 'guiawork';
    } else if(parts[1]==='estadisticas'){
      S.view = 'stats';
    } else if(parts[1]==='historial'){
      S.view = 'history';
    } else if(parts[1]==='simulador' && parts[2]){
      var gc = parts[2];
      if(GUIA_COURSES.indexOf(gc)>=0){
        S.course = gc;
        if(parts[3]==='intento') S.view = 'attempt';
        else if(parts[3]==='resumen') S.view = 'summary';
        else if(parts[3]==='revision') S.view = 'review';
        else S.view = 'course';
      } else { S.view = 'home'; }
    } else if(parts[1]==='examen69'){
      S.course = 'guia69';
      if(parts[2]==='intento') S.view = 'attempt';
      else if(parts[2]==='resumen') S.view = 'summary';
      else if(parts[2]==='revision') S.view = 'review';
      else S.view = 'home';
    } else {
      S.view = 'home';
    }
    return;
  }
  // aula routes
  S.area = 'aula';
  var first = parts[0];
  // direct guia course hash without prefix (robust)
  if(GUIA_COURSES.indexOf(first)>=0){
    S.area = 'guia';
    S.course = first;
    if(parts[1]==='intento') S.view = 'attempt';
    else if(parts[1]==='resumen') S.view = 'summary';
    else if(parts[1]==='revision') S.view = 'review';
    else S.view = 'course';
    return;
  }
  var aulaCourses = ['mat','trig','ineq','fis','qui','len','mix','guia69'];
  if(aulaCourses.indexOf(first)>=0){
    S.course = first;
    if(parts[1]==='intento') S.view = 'attempt';
    else if(parts[1]==='resumen') S.view = 'summary';
    else if(parts[1]==='revision') S.view = 'review';
    else if(parts.length===1) S.view = 'course';
    else S.view = 'home';
    return;
  }
  if(first==='aprender'){
    if(parts[1]){ S.chapter = parts[1]; S.view = 'chapter'; }
    else S.view = 'learn';
    return;
  }
  if(first==='historial'){ S.view = 'history'; return; }
  if(first==='estadisticas'){ S.view = 'stats'; return; }
  if(first==='talleres'){ S.view = 'guiawork'; S.area='guia'; return; }
  // fallback
  S.view = 'home';
}

/* ---------- markdown → HTML (mejorado; math solo en delimitadores) ---------- */
function inlineMd(s){
  var math = [];
  var splitRe = window.MATH_SPLIT_RE || /(\$\$[^$]*\$\$|\$[^$]+\$)/g;
  var txt = String(s).replace(splitRe, function(m){ math.push(m); return '\u0000'+(math.length-1)+'\u0000'; });
  txt = escH(txt)
    .replace(/\*\*([^*]+)\*\*/g,'<b>$1</b>')
    .replace(/(^|[^*\w])\*([^*]+)\*/g,'$1<i>$2</i>')
    .replace(/`([^`]+)`/g,'<code>$1</code>')
    .replace(/&lt;br\s*\/?&gt;/g,'<br>')
    .replace(/--&gt;|\u2013&gt;/g,'\u2192');
  return txt.replace(/\u0000(\d+)\u0000/g, function(_,i){ return tex(math[+i]); });
}
function slugId(t){ return 'h-'+String(t).toLowerCase().replace(/[^a-z0-9\u00e0-\u00ff]+/g,'-').replace(/^-|-$/g,''); }
function quoteClass(t){
  var s = t.toLowerCase();
  if(s.indexOf('analog')>=0 || s.indexOf('truco')>=0 || s.indexOf('regla')>=0 || s.indexOf('idea clave')>=0) return ' class="tip"';
  if(s.indexOf('error')>=0 || s.indexOf('cuidado')>=0 || s.indexOf('ojo')>=0 || s.indexOf('trampa')>=0) return ' class="warn"';
  return '';
}
function md(src){
  var lines = String(src).split('\n'), out = '', i = 0, para = [];
  function flush(){ if(para.length){ out += '<p>'+inlineMd(para.join(' '))+'</p>'; para = []; } }
  while(i < lines.length){
    var L = lines[i];
    if(/^\s*$/.test(L)){ flush(); i++; continue; }
    var miniM = /^\[\[MINISIM:(.*?)\]\]$/.exec(L.trim());
    if(miniM){
      flush();
      var minId = miniM[1];
      out += '<div class="minisim-box" style="margin:24px 0; padding:20px 24px; background:#f0f9ff; border:2px solid #0284c7; border-radius:12px; box-shadow:0 4px 14px rgba(2,132,199,.1);">'
        + '<div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">'
        + '<div><span class="chip" style="background:#0284c7; color:#fff; font-weight:700; font-size:11px; text-transform:uppercase;">⚡ Taller Práctico Integrado</span>'
        + '<h3 style="margin:6px 0 2px; color:#0369a1; font-size:18px;">Mini-Simulador de esta Lección (50 preguntas)</h3>'
        + '<p style="margin:0; font-size:13px; color:#475569;">Preguntas exclusivas parametrizadas para afianzar los conceptos estudiados.</p></div>'
        + '<div style="display:flex; gap:8px;">'
        + '<button class="btn primary" data-act="start-minisim" data-lid="' + minId + '" data-n="5" style="background:#0284c7; border-color:#0284c7; font-size:13px; font-weight:700;">▶️ Practicar 5 preguntas</button>'
        + '<button class="btn sec" data-act="start-minisim" data-lid="' + minId + '" data-n="10" style="font-size:13px; font-weight:700;">▶️ Reto 10 preguntas</button>'
        + '</div></div></div>';
      i++;
      continue;
    }
    var h = /^(#{2,4})\s+(.*)$/.exec(L);
    if(h){ flush(); var lvl = h[1].length, txt = h[2];
      out += '<h'+lvl+(lvl<=3?' id="'+slugId(txt)+'"':'')+'>'+inlineMd(txt)+'</h'+lvl+'>'; i++; continue; }
    if(/^---\s*$/.test(L)){ flush(); out += '<hr>'; i++; continue; }
    if(/^>\s?/.test(L)){ flush(); var q = [];
      while(i < lines.length && /^>\s?/.test(lines[i])){ q.push(lines[i].replace(/^>\s?/,'')); i++; }
      var body = q.join(' ');
      out += '<blockquote'+quoteClass(body)+'>'+inlineMd(body)+'</blockquote>'; continue; }
    if(/^\|/.test(L)){ flush(); var rows = [];
      while(i < lines.length && /^\|/.test(lines[i])){ rows.push(lines[i]); i++; }
      var cells = rows.map(function(r){ return r.replace(/^\|/,'').replace(/\|\s*$/,'').split('|').map(function(c){return c.trim();}); })
        .filter(function(r){ return !r.every(function(c){ return /^:?-{2,}:?$/.test(c); }); });
      out += '<table><thead><tr>'+cells[0].map(function(c){return '<th>'+inlineMd(c)+'</th>';}).join('')+'</tr></thead><tbody>'+
        cells.slice(1).map(function(r){return '<tr>'+r.map(function(c){return '<td>'+inlineMd(c)+'</td>';}).join('')+'</tr>';}).join('')+'</tbody></table>';
      continue; }
    if(/^[-*]\s+/.test(L)){ flush(); var li = [];
      while(i < lines.length && /^[-*]\s+/.test(lines[i])){ li.push(lines[i].replace(/^[-*]\s+/,'')); i++; }
      out += '<ul>'+li.map(function(x){return '<li>'+inlineMd(x)+'</li>';}).join('')+'</ul>'; continue; }
    if(/^\d+[.)]\s+/.test(L)){ flush(); var lo = [];
      while(i < lines.length && /^\d+[.)]\s+/.test(lines[i])){ lo.push(lines[i].replace(/^\d+[.)]\s+/,'')); i++; }
      out += '<ol>'+lo.map(function(x){return '<li>'+inlineMd(x)+'</li>';}).join('')+'</ol>'; continue; }
    para.push(L); i++;
  }
  flush();
  return out;
}
function chapterToc(body){
  var items = [];
  String(body).split('\n').forEach(function(L){
    var h = /^##\s+(.*)$/.exec(L);
    if(h) items.push(h[1]);
  });
  if(items.length < 3) return '';
  return '<div class="toc"><b>En este cap\u00edtulo</b><ol>'+items.map(function(t){
    return '<li><a data-act="anchor" data-id="'+slugId(t)+'">'+escH(t.replace(/^\d+\.\s*/,''))+'</a></li>';
  }).join('')+'</ol></div>';
}

/* ---------- configuración y almacenamiento ---------- */
var CFG_KEY='epn_cfg_v3', HIST_KEY='epn_hist_v1', SEEN_KEY='epn_seen_v1', UI_KEY='epn_ui_v1';
var DEFAULT_CFG = {minutes:30, count: 15, mixMinutes:90, mixCount:20, level:'medio', noRepeat:true,
  shuffleOptions:true, shuffleQuestions:true, showFeedback:true, student:'AYALA PABON ETHAN FARID',
  guiaCfg:{ guia_mat30:{n:30, min:90}, guia_fql120:{n:60, min:120}, guia_fis:{n:20, min:40}, guia_qui:{n:20, min:40}, guia_len:{n:20, min:40} } };
function load(key, def){ try{ var v = JSON.parse(localStorage.getItem(key)); return v==null? def : v; }catch(e){ return def; } }
function save(key, val){ try{ localStorage.setItem(key, JSON.stringify(val)); }catch(e){} }
var cfg = Object.assign({}, DEFAULT_CFG, load(CFG_KEY, {}));
var HIST = load(HIST_KEY, []);
var SEEN = load(SEEN_KEY, {mat:[],fis:[],qui:[],len:[]});
var SEEN1000_KEY='epn_seen1000_v1';
var SEEN1000 = load(SEEN1000_KEY, {mat:[],fis:[],qui:[],len:[]});
var UI = load(UI_KEY, {drawer:true});
var ACTIVE_KEY='epn_active_v1';
function saveCfg(){ save(CFG_KEY, cfg); }
function saveHist(){ save(HIST_KEY, HIST); }
function saveSeen(){ save(SEEN_KEY, SEEN); }
function saveSeen1000(){ save(SEEN1000_KEY, SEEN1000); }
function saveUI(){ save(UI_KEY, UI); }
// Perdurabilidad del intento: se guarda en LS y en la nube; sobrevive F5 y cambio de dispositivo
function saveActive(){
  try{
    if(!S.attempt) return;
    var isReview = (S.view==='review' || S.attempt.view==='review' || S.attempt.finished);
    if(isReview && !S.attempt.noSave){
      var snap = serializeAttempt(S.attempt);
      snap.view='review';
      snap.finished=true;
      if(S.attempt.end) snap.endMs=S.attempt.end.getTime();
      if(S.onePage!=null) snap.onePage=S.onePage;
      if(typeof S.attempt.cur==='number') snap.cur=S.attempt.cur;
      localStorage.setItem(ACTIVE_KEY, JSON.stringify(snap));
      return;
    }
    if(!S.attempt.finished && !S.attempt.historic) localStorage.setItem(ACTIVE_KEY, JSON.stringify(serializeAttempt(S.attempt)));
  }catch(e){}
}
function clearActive(){ try{ localStorage.removeItem(ACTIVE_KEY); }catch(e){} }
function loadActiveRaw(){ try{ var v=localStorage.getItem(ACTIVE_KEY); return v? JSON.parse(v):null; }catch(e){ return null; } }
var SEENSET = {};
['mat','trig','ineq','fis','qui','len'].forEach(function(k){ SEEN[k] = SEEN[k]||[]; SEENSET[k] = {}; SEEN[k].forEach(function(i){ SEENSET[k][i]=1; }); });
var SEEN1000SET = {};
['mat','fis','qui','len'].forEach(function(k){ SEEN1000[k]=SEEN1000[k]||[]; SEEN1000SET[k]={}; SEEN1000[k].forEach(function(id){ SEEN1000SET[k][id]=1; }); });

var LEVELS = [{k:'facil',n:'F\u00e1cil',c:'f1'},{k:'medio',n:'Intermedio',c:'f2'},{k:'dificil',n:'Dif\u00edcil',c:'f3'},{k:'experto',n:'Experto',c:'f4'},{k:'todos',n:'Mezclado',c:'f0'}];
var GUIA_COURSES = ['guia_mat30','guia_fql120','guia_fis','guia_qui','guia_len'];
function levelName(k){ for(var i=0;i<LEVELS.length;i++) if(LEVELS[i].k===k) return LEVELS[i].n; return k; }

var S = { view:'home', area:'guia', course:'mat', attempt:null, modal:null, tick:null, onePage:null, chapter:null, scrollTop:true, histTab:'all', toast:null, viewingRecord:null };

var COURSES = {
  guia69:{key:'guia69',name:'Simulador Completo Guía 2026-B (69P)',short:'Guía Completo 69P',full:'Guía Oficial EPN 2026-B — Examen Completo 69 Preguntas',desc:'Examen simulador completo de 69 preguntas oficiales (Matemáticas, Lenguaje, Física y Química) con soluciones paso a paso desde cero.'},
  guia_mat30:{key:'guia_mat30',name:'Matemáticas EPN — Día 1 (30 preg · 90 min)',short:'MAT Día 1',full:'Simulador Matemáticas EPN 2026-B — Día 1 (30 preguntas · 90 min)',desc:'Simulador fiel al Día 1 real de la EPN: solo Matemáticas, 30 preguntas nivel intermedio con máxima cobertura de los 14 temas de la guía (4.1.1–4.1.4), 90 minutos. Ideal para el filtro.',color:'#d62828',icon:'🧮'},
  guia_fql120:{key:'guia_fql120',name:'Combinado F-Q-L — Día 2 (60 preg · 120 min)',short:'F-Q-L Día 2',full:'Simulador Combinado EPN 2026-B — Día 2 (Física+Química+Lenguaje · 60 preg · 120 min)',desc:'Simulador fiel al Día 2 real: Física+Química+Lenguaje, 60 preguntas (20+20+20) nivel intermedio, 120 min (40 por materia), cobertura máxima por materia e intercalado.',color:'#0e2a47',icon:'🧪'},
  guia_fis:{key:'guia_fis',name:'Física EPN — Individual (20 preg · 40 min)',short:'FIS 20',full:'Simulador Física EPN 2026-B — Individual (20 preguntas · 40 min)',desc:'Práctica focalizada de Física (15 temas 4.2.1–4.2.3), 20 preguntas nivel intermedio, 40 min, con figuras DCL/vectores/proyectiles validadas.',color:'#2a9d8f',icon:'⚙️'},
  guia_qui:{key:'guia_qui',name:'Química EPN — Individual (20 preg · 40 min)',short:'QUI 20',full:'Simulador Química EPN 2026-B — Individual (20 preguntas · 40 min)',desc:'Práctica focalizada de Química (16 temas 4.3.1–4.3.4), 20 preguntas nivel intermedio, 40 min.',color:'#6a994e',icon:'⚗️'},
  guia_len:{key:'guia_len',name:'Lenguaje EPN — Individual (20 preg · 40 min)',short:'LEN 20',full:'Simulador Lenguaje EPN 2026-B — Individual (20 preguntas · 40 min)',desc:'Práctica focalizada de Lenguaje (9 temas 4.4.1–4.4.3), 20 preguntas nivel intermedio, 40 min, falacias y lectura crítica.',color:'#e9c46a',icon:'📝'},
  trig:{key:'trig',name:'Identidades Trigonométricas',short:'Trigonometría Especial',full:'Taller Especializado: Identidades Trigonométricas',color:'#7b2cbf',icon:'📐',
       desc:'Práctica enfocada en identidades pitagóricas, recíprocas, de cociente, simplificación de expresiones y ecuaciones.',
       prev:'Examen Lenguaje EPN 2026-B',next:'Taller Especializado: Inecuaciones y Valor Absoluto'},
  ineq:{key:'ineq',name:'Inecuaciones y Valor Absoluto',short:'Inecuaciones |x|',full:'Taller Especializado: Inecuaciones y Valor Absoluto',color:'#0f766e',icon:'📏',
       desc:'Práctica enfocada en relaciones de orden, intervalos, inecuaciones lineales y polinómicas, y desigualdades con valor absoluto (Clases 16–17 Barreno).',
       prev:'Taller Especializado: Identidades Trigonométricas',next:'Simulacro completo EPN 2026-B'},
  mat:{key:'mat',name:'Matem\u00e1ticas',short:'Matem\u00e1tica',full:'Examen Matem\u00e1ticas EPN 2026-B',color:'#f7a1c4',icon:'\u2713',
       desc:'Fundamentos de \u00e1lgebra, ecuaciones e inecuaciones, geometr\u00eda plana y trigonometr\u00eda.',
       prev:'Lineamientos para la admisi\u00f3n 2026-B',next:'Examen F\u00edsica EPN 2026-B'},
  fis:{key:'fis',name:'F\u00edsica',short:'F\u00edsica',full:'Examen F\u00edsica EPN 2026-B',color:'#8fc7e8',icon:'\u2699',
       desc:'Inercia y movimiento, leyes de Newton, energ\u00eda, trabajo y potencia.',
       prev:'Examen Matem\u00e1ticas EPN 2026-B',next:'Examen Qu\u00edmica EPN 2026-B'},
  qui:{key:'qui',name:'Qu\u00edmica',short:'Qu\u00edmica',full:'Examen Qu\u00edmica EPN 2026-B',color:'#a8d5a2',icon:'\u2697',
       desc:'Estructura at\u00f3mica, tabla peri\u00f3dica y nomenclatura, enlace qu\u00edmico y estequiometr\u00eda.',
       prev:'Examen F\u00edsica EPN 2026-B',next:'Examen Lenguaje EPN 2026-B'},
  len:{key:'len',name:'Lenguaje',short:'Lenguaje',full:'Examen Lenguaje EPN 2026-B',color:'#f3c778',icon:'\u270e',
       desc:'Pensamiento l\u00f3gico, lectura e interpretaci\u00f3n de textos y comunicaci\u00f3n escrita.',
       prev:'Examen Qu\u00edmica EPN 2026-B',next:'Simulacro completo EPN 2026-B'},
  mix:{key:'mix',name:'Simulacro completo',short:'Simulacro',full:'Simulacro completo EPN 2026-B',color:'#0e2a47',icon:'\u2605',
       desc:'Las cuatro \u00e1reas mezcladas en un solo intento cronometrado, como el examen real.',
       prev:'Examen Lenguaje EPN 2026-B',next:'Estad\u00edsticas de progreso'}
};
var CKEYS = ['mat','trig','ineq','fis','qui','len','mix','guia_mat30','guia_fql120','guia_fis','guia_qui','guia_len'];
var SUBJ = ['mat','trig','ineq','fis','qui','len'];
var EXAM = ['mat','fis','qui','len'];
SUBJ.forEach(function(k){ BANK[k].forEach(function(q,i){ q.__s=k; q.__i=i; }); });
function bankOf(k){ if(k==='guia_mat30'||k==='guia_fis'||k==='guia_qui'||k==='guia_len'||k==='guia_fql120') return []; return k==='mix' ? BANK.mat.concat(BANK.fis,BANK.qui,BANK.len) : (BANK[k]||[]); }

function freshPool(k){
  var pool = levelPool(k);
  if(!cfg.noRepeat) return {pool:pool, reset:false};
  var fresh = pool.filter(function(q){ return !SEENSET[k][q.__i]; });
  return {pool:fresh, reset:false, all:pool};
}
function countFor(k){
  if(GUIA_COURSES.indexOf(k)>=0){
    cfg.guiaCfg = cfg.guiaCfg || {guia_mat30:{n:30,min:90}, guia_fql120:{n:60,min:120}, guia_fis:{n:20,min:40}, guia_qui:{n:20,min:40}, guia_len:{n:20,min:40}};
    var g=cfg.guiaCfg[k]; if(g && g.n) return Math.max(5, Math.min(60, g.n));
    if(k==='guia_mat30') return 30; if(k==='guia_fql120') return 60; return 20;
  }
  return k==='mix'? cfg.mixCount : cfg.count;
}
function minutesFor(k){
  if(GUIA_COURSES.indexOf(k)>=0){
    cfg.guiaCfg = cfg.guiaCfg || {guia_mat30:{n:30,min:90}, guia_fql120:{n:60,min:120}, guia_fis:{n:20,min:40}, guia_qui:{n:20,min:40}, guia_len:{n:20,min:40}};
    var g=cfg.guiaCfg[k]; if(g && g.min) return Math.max(10, Math.min(180, g.min));
    if(k==='guia_mat30') return 90; if(k==='guia_fql120') return 120; return 40;
  }
  return k==='mix'? cfg.mixMinutes : cfg.minutes;
}
function isGuia1000Course(k){ return GUIA_COURSES.indexOf(k)>=0; }

/* ---------- utilidades ---------- */
function el(id){return document.getElementById(id);}
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;}return a;}
function n2(n){return (n<10?'0':'')+n;}
function fmtNum(x){return x.toFixed(2).replace('.',',');}
var DIAS=['domingo','lunes','martes','mi\u00e9rcoles','jueves','viernes','s\u00e1bado'];
var MESES=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
function fmtFecha(d){d=new Date(d);return DIAS[d.getDay()]+', '+d.getDate()+' de '+MESES[d.getMonth()]+' de '+d.getFullYear()+', '+d.getHours()+':'+n2(d.getMinutes());}
function fmtCorta(d){d=new Date(d);return d.getDate()+'/'+n2(d.getMonth()+1)+'/'+d.getFullYear()+' '+d.getHours()+':'+n2(d.getMinutes());}
function fmtDur(ms){var s=Math.max(0,Math.round(ms/1000));var m=Math.floor(s/60);s=s%60;var out='';if(m>0)out+=m+' min ';return out+s+' s';}
function clock(ms){var s=Math.max(0,Math.floor(ms/1000));var h=Math.floor(s/3600),m=Math.floor((s%3600)/60);s=s%60;return n2(h)+':'+n2(m)+':'+n2(s);}
var LETTERS=['a','b','c','d','e','f'];
function gradeCls(p){ return p>=70?'g-ok':(p>=50?'g-mid':'g-bad'); }

function pickSpread(pool, n){
  var by={}; pool.forEach(function(q){ (by[q.t]=by[q.t]||[]).push(q); });
  var topics=shuffle(Object.keys(by)).map(function(t){return shuffle(by[t]);});
  var picked=[], i=0, guard=0;
  while(picked.length<n && guard++<800){
    var moved=false;
    for(var k=0;k<topics.length && picked.length<n;k++){ if(topics[k][i]){ picked.push(topics[k][i]); moved=true; } }
    i++; if(!moved) break;
  }
  return picked;
}

/* ---------- Anti-Overfitting & Concept Generalization Engine ---------- */
function levelPool(k){ return cfg.level==='todos'? BANK[k].slice() : BANK[k].filter(function(q){return q.d===cfg.level;}); }

/* ---------- Banco 1000 intermedio: pick por topics con cobertura máxima ---------- */
function pickForGuia1000(subject, want, notes, forcedLevel){
  var bank1000 = window.GUIA_BANK_1000 || {mat:[],fis:[],qui:[],len:[]};
  var pool = bank1000[subject] || [];
  if(!pool.length) return [];
  var requestedLevel = forcedLevel || cfg.level || 'intermedio';
  var hasLevel = pool.some(function(q){ return q.d===requestedLevel; });
  var targetLevel = hasLevel ? requestedLevel : 'intermedio';
  var levelPool1000;
  if(targetLevel==='todos'){
    levelPool1000 = pool.slice();
  } else {
    levelPool1000 = pool.filter(function(q){ return q.d===targetLevel; });
    if(!levelPool1000.length) levelPool1000 = pool.filter(function(q){ return q.d==='intermedio'; });
  }
  var byTopic = {};
  levelPool1000.forEach(function(q){ var top=(q.topics&&q.topics[0])||'misc'; (byTopic[top]=byTopic[top]||[]).push(q); });
  var topics = shuffle(Object.keys(byTopic));
  var unseenByTopic={}, seenByTopic={};
  topics.forEach(function(t){
    var arr=byTopic[t]||[];
    unseenByTopic[t]=arr.filter(function(q){ return !SEEN1000SET[subject][q.id]; });
    seenByTopic[t]=arr.filter(function(q){ return SEEN1000SET[subject][q.id]; });
    unseenByTopic[t]=shuffle(unseenByTopic[t]); seenByTopic[t]=shuffle(seenByTopic[t]);
  });
  // Hard guarantee: no duplicate id nor prompt within the returned result
  var promptSeen={}, idSeen={};
  function isDup(q){ return !!promptSeen[q.prompt] || !!idSeen[q.id]; }
  function tryPopNonDup(arr){
    if(!arr || !arr.length) return null;
    for(var i=0;i<arr.length;i++){
      if(!isDup(arr[i])) return arr.splice(i,1)[0];
    }
    return null;
  }
  var result=[];
  var guard=0;
  while(result.length < want && guard++ < 120){
    var addedThisRound=0;
    for(var ti=0; ti<topics.length && result.length<want; ti++){
      var t=topics[ti];
      var pick = tryPopNonDup(unseenByTopic[t]) || tryPopNonDup(seenByTopic[t]);
      if(!pick){
        var best=null, bestAvail=-1;
        for(var k=0;k<topics.length;k++){
          var tt=topics[k]; if(tt===t) continue;
          var avail=0;
          for(var a=0;a<unseenByTopic[tt].length;a++) if(!isDup(unseenByTopic[tt][a])) avail++;
          for(var b=0;b<seenByTopic[tt].length;b++) if(!isDup(seenByTopic[tt][b])) avail++;
          if(avail>bestAvail){ best=tt; bestAvail=avail; }
        }
        if(best && bestAvail>0) pick = tryPopNonDup(unseenByTopic[best]) || tryPopNonDup(seenByTopic[best]);
      }
      if(!pick){
        var restCollect=[];
        topics.forEach(function(tt){ restCollect=restCollect.concat(unseenByTopic[tt], seenByTopic[tt]); });
        var candidates=[];
        for(var r=0;r<restCollect.length;r++) if(!isDup(restCollect[r])) candidates.push(restCollect[r]);
        if(candidates.length){
          var idx=Math.floor(Math.random()*candidates.length);
          pick=candidates[idx];
          var removed=false;
          for(var tt2=0;tt2<topics.length && !removed;tt2++){
            var bucket=unseenByTopic[topics[tt2]];
            for(var p=0;p<bucket.length;p++) if(bucket[p]===pick){ bucket.splice(p,1); removed=true; break; }
            if(removed) break;
            bucket=seenByTopic[topics[tt2]];
            for(var p2=0;p2<bucket.length;p2++) if(bucket[p2]===pick){ bucket.splice(p2,1); removed=true; break; }
          }
          if(!removed) pick=null;
        }
      }
      if(pick && !isDup(pick)){
        result.push(pick);
        promptSeen[pick.prompt]=1;
        idSeen[pick.id]=1;
        addedThisRound++;
      }
    }
    if(addedThisRound===0){
      var anyLeft=0;
      topics.forEach(function(tt){ for(var i=0;i<unseenByTopic[tt].length;i++) if(!isDup(unseenByTopic[tt][i])) anyLeft++; for(var j=0;j<seenByTopic[tt].length;j++) if(!isDup(seenByTopic[tt][j])) anyLeft++; });
      if(anyLeft===0) break;
    }
  }
  if(result.length < want){
    var remaining = want - result.length;
    notes.push('Banco '+targetLevel+' de '+subject.toUpperCase()+' con '+levelPool1000.length+' preguntas: faltan '+remaining+' únicas tras evitar duplicados exactos en este intento (se entregan '+result.length+'/'+want+').');
  }
  result.forEach(function(q){ if(!SEEN1000SET[subject][q.id]){ SEEN1000SET[subject][q.id]=1; SEEN1000[subject].push(q.id); } });
  saveSeen1000();
  var distinctTopics = {};
  result.forEach(function(q){ distinctTopics[(q.topics&&q.topics[0])||'misc']=1; });
  var distinctCount=Object.keys(distinctTopics).length;
  var T=topics.length;
  if(want<=T && distinctCount < want) notes.push('Cobertura: se esperaban '+want+' temas distintos y se obtuvieron '+distinctCount+'.');
  result = shuffle(result).slice(0,want);
  function normTpl(q){ return (q.topics&&q.topics[0]||'misc')+'|'+String(q.prompt).replace(/\d+(\.\d+)?/g,'#').replace(/\$[^$]*\$/g,'#').slice(0,60); }
  for(var ac=0; ac<result.length-1; ac++){
    var curNorm = normTpl(result[ac]), nxtNorm = normTpl(result[ac+1]);
    var curTop = result[ac].topics&&result[ac].topics[0], nxtTop = result[ac+1].topics&&result[ac+1].topics[0];
    if(curNorm===nxtNorm || curTop===nxtTop){
      var swap=-1;
      for(var j=ac+2;j<result.length;j++){
        var jNorm=normTpl(result[j]), jTop=result[j].topics&&result[j].topics[0];
        if(jNorm!==curNorm && jTop!==curTop){ swap=j; break; }
      }
      if(swap===-1){
        for(var j2=ac+2;j2<result.length;j2++){ if(normTpl(result[j2])!==curNorm){ swap=j2; break; } }
      }
      if(swap!==-1){ var tmp=result[ac+1]; result[ac+1]=result[swap]; result[swap]=tmp; }
    }
  }
  return result;
}

function pickForSubject(k, want, notes){
  var subjBank = BANK[k] || [];
  if(!subjBank.length) return [];
  var primaryPool = cfg.level === 'todos' ? subjBank.slice() : subjBank.filter(function(q){ return q.d === cfg.level; });
  var fresh = primaryPool.filter(function(q){ return !SEENSET[k][q.__i]; });
  var picked=[];
  var promptSeen={}, idSeen={};
  function isDupQ(q){ var key = q.q||q.prompt; return !!promptSeen[key] || !!idSeen[q.__s+':'+q.__i]; }
  function dedupPush(arr){
    for(var i=0;i<arr.length;i++){
      var q=arr[i];
      var key=q.q||q.prompt;
      var id=q.__s+':'+q.__i;
      if(!promptSeen[key] && !idSeen[id]){
        promptSeen[key]=1; idSeen[id]=1;
        picked.push(q);
      }
    }
  }
  if(fresh.length >= want){
    var spread = pickSpread(fresh, want);
    dedupPush(spread);
    if(picked.length < want){
      var remaining = want - picked.length;
      var restPool = fresh.filter(function(q){ return !isDupQ(q); });
      dedupPush(pickSpread(restPool, remaining));
    }
    if(picked.length < want){
      // try to fill from unseen secondary before returning short
      var need = want - picked.length;
      var otherLevels = ['medio', 'facil', 'dificil', 'experto'].filter(function(l){ return l !== cfg.level; });
      var secondaryPool = [];
      otherLevels.forEach(function(lvl){
        subjBank.filter(function(q){ return q.d === lvl && !SEENSET[k][q.__i] && !isDupQ(q); }).forEach(function(q){ secondaryPool.push(q); });
      });
      if(secondaryPool.length) dedupPush(pickSpread(secondaryPool, need));
    }
    return picked.slice(0, want);
  }
  dedupPush(pickSpread(fresh, fresh.length));
  var needed = want - picked.length;
  var otherLevels = ['medio', 'facil', 'dificil', 'experto'].filter(function(l){ return l !== cfg.level; });
  var secondaryPool = [];
  otherLevels.forEach(function(lvl){
    subjBank.filter(function(q){ return q.d === lvl && !SEENSET[k][q.__i]; }).forEach(function(q){ secondaryPool.push(q); });
  });
  if(secondaryPool.length > 0 && needed > 0){
    var filteredSec = secondaryPool.filter(function(q){ return !isDupQ(q); });
    var secondaryPicked = pickSpread(filteredSec.length?filteredSec:secondaryPool, needed);
    var beforeLen=picked.length;
    dedupPush(secondaryPicked);
    needed = want - picked.length;
    if(picked.length > beforeLen) notes.push('Para evitar la memorizacion repetitiva (overfitting), se combinaron preguntas no vistas del nivel ' + levelName(cfg.level) + ' con niveles complementarios.');
    // if still need and filtered insufficient, allow any
    if(needed>0 && secondaryPicked.length < needed){
      var anySec = secondaryPool.filter(function(q){ return !isDupQ(q); });
      if(anySec.length) dedupPush(pickSpread(anySec, needed));
    }
  }
  if(picked.length < want){
    subjBank.forEach(function(q){ delete SEENSET[k][q.__i]; });
    SEEN[k] = [];
    saveSeen();
    notes.push('Has completado el banco entero de ' + COURSES[k].short + '! Se reinicio el ciclo de preguntas vistas con nuevo orden aleatorio.');
    var remainingNeeded = want - picked.length;
    var recPool = (primaryPool.length ? primaryPool : subjBank).filter(function(q){ return !isDupQ(q); });
    if(!recPool.length) recPool = (primaryPool.length ? primaryPool : subjBank).slice();
    dedupPush(pickSpread(recPool, remainingNeeded));
    // final fallback: if still short due to dedup, report but do not duplicate
    if(picked.length < want){
      notes.push('Banco '+k.toUpperCase()+' con '+subjBank.length+' preguntas: faltan '+(want-picked.length)+' unicas tras evitar duplicados exactos en este intento (se entregan '+picked.length+'/'+want+').');
    }
  }
  return picked.slice(0, want);
}
/* ---------- plan del próximo intento ---------- */
var PLAN_KEY = 'epn_plan_v1';
var PLAN = load(PLAN_KEY, {}) || {};
function savePlan(){ save(PLAN_KEY, PLAN); }
function planKey(k){ return k+'|'+cfg.level+'|'+countFor(k); }
function makePlan(k){
  var notes = [], picked = [];
  if(k==='mix'){
    var n = countFor(k), per = Math.floor(n/4), extra = n - per*4;
    EXAM.forEach(function(x,ix){ picked = picked.concat(pickForSubject(x, per + (ix<extra?1:0), notes)); });
  } else { picked = pickForSubject(k, countFor(k), notes); }
  picked = shuffle(picked);
  PLAN[planKey(k)] = {ts:Date.now(), ids:picked.map(function(q){ return {s:q.__s, i:q.__i}; })};
  savePlan();
  return notes;
}
function planQuestions(k){
  var p = PLAN[planKey(k)];
  if(!p || !p.ids || !p.ids.length) return null;
  var out = p.ids.map(function(x){ return (BANK[x.s]||[])[x.i]; });
  return out.every(function(q){ return !!q; })? out : null;
}
function clearPlan(k){ delete PLAN[planKey(k)]; savePlan(); }
function planBox(k){
  var qs = planQuestions(k);
  var adminBtnHtml = '<button class="btn sec mini" data-act="openadmin" style="border-color:#7b2cbf;color:#7b2cbf;font-weight:600;margin-left:6px">🔑 Inspeccionar y editar preguntas (Admin)</button>';
  
  if(!qs){
    return '<div class="planbox"><b>Preguntas del próximo intento</b>'+
      '<div class="hint">Se eligen automáticamente al empezar, repartidas entre todos los temas y sin repetir ninguna qué ya hayas visto. Puedes barajarlas o inspeccionarlas antes de empezar.</div>'+
      '<div style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap"><button class="btn sec mini" data-act="reshuffle" data-c="'+k+'">↻ Barajar preguntas del próximo simulador</button>'+adminBtnHtml+'</div></div>';
  }
  var by = {};
  qs.forEach(function(q){ var key = (k==='mix'? COURSES[q.__s].short+' · ':'')+q.t; by[key]=(by[key]||0)+1; });
  var chips = Object.keys(by).sort().map(function(t){ return '<span class="chip light">'+escH(t)+': <b>'+by[t]+'</b></span>'; }).join('');
  var nuevas = qs.filter(function(q){ return !SEENSET[q.__s][q.__i]; }).length;
  return '<div class="planbox"><b>Preguntas del próximo intento (ya barajadas)</b>'+
    '<div class="hint">'+qs.length+' preguntas · '+nuevas+' qué nunca te han salido · nivel '+levelName(cfg.level)+'</div>'+
    '<div class="chips">'+chips+'</div>'+
    '<div style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap"><button class="btn sec mini" data-act="reshuffle" data-c="'+k+'">↻ Volver a barajar</button>'+
    '<button class="btn ghost mini" data-act="clearplan" data-c="'+k+'">Quitar selección</button>'+adminBtnHtml+'</div></div>';
}
function buildAttempt(courseKey){
  // Guia 1000 cursos usan sampler dedicado por topics + SEEN1000
  if(isGuia1000Course(courseKey)){
    return buildGuia1000Attempt(courseKey);
  }
  var n = countFor(courseKey), picked = [], notes = [];
  var planned = planQuestions(courseKey);
  if(planned && planned.length){
    picked = planned.slice(0,n);
    clearPlan(courseKey);
    notes.push('Se usaron las preguntas qué barajaste previamente.');
  } else if(courseKey==='mix'){
    var per = Math.floor(n/4), extra = n - per*4;
    EXAM.forEach(function(k,ix){ picked = picked.concat(pickForSubject(k, per + (ix<extra?1:0), notes)); });
  } else {
    picked = pickForSubject(courseKey, n, notes);
  }

  // Hard guarantee intra-intento: remove duplicate prompts/ids before mapping to attempt (Aula)
  (function(){
    var seenP={}, seenI={}, uniq=[];
    for(var i=0;i<picked.length;i++){
      var q=picked[i];
      var key=(q.q||q.prompt);
      var id=(q.__s!=null? q.__s+':'+q.__i : q.id||key);
      if(!seenP[key] && !seenI[id]){ seenP[key]=1; seenI[id]=1; uniq.push(q); }
    }
    if(uniq.length < picked.length){
      var need = n - uniq.length;
      // collect remaining from bank to fill without duplicates
      var pool = (BANK[S.course]||BANK['mat']||[]).concat([]);
      // also consider plan? already handled
      var candPool = pool.filter(function(q){ var k=(q.q||q.prompt); var id=(q.__s+':'+q.__i); return !seenP[k] && !seenI[id]; });
      if(candPool.length){
        var extra = pickSpread(candPool, need);
        for(var e=0;e<extra.length;e++){
          var q2=extra[e];
          var k2=(q2.q||q2.prompt); var id2=(q2.__s+':'+q2.__i);
          if(!seenP[k2] && !seenI[id2]){ seenP[k2]=1; seenI[id2]=1; uniq.push(q2); }
        }
      }
      picked = uniq;
      if(picked.length < n){
        // keep short but do not duplicate
        S.toast = (S.toast? S.toast+' ' : '') + 'Banco '+S.course.toUpperCase()+' con pocos prompts unicos: se entregan '+picked.length+'/'+n+' sin repetir enunciado exacto.';
      } else {
        picked = uniq;
      }
    } else {
      picked = uniq;
    }
  })();
  picked = (cfg.shuffleQuestions? shuffle(picked) : picked).slice(0,n);
  var qs = picked.map(function(q){
    var order = q.o.map(function(_,ix){return ix;});
    if(cfg.shuffleOptions) order = shuffle(order);
    return {src:q, order:order, subj:q.__s};
  });
  S.toast = null;
  return {course:courseKey, level:cfg.level, qs:qs, ans:qs.map(function(){return null;}), flags:qs.map(function(){return false;}),
          cur:0, start:new Date(), end:null, finished:false, limitMs:minutesFor(courseKey)*60000, historic:false};
}
function buildGuia1000Attempt(courseKey){
  var notes=[];
  var picked=[];
  if(courseKey==='guia_mat30'){
    picked = pickForGuia1000('mat', 30, notes);
  } else if(courseKey==='guia_fis'){
    picked = pickForGuia1000('fis', 20, notes);
  } else if(courseKey==='guia_qui'){
    picked = pickForGuia1000('qui', 20, notes);
  } else if(courseKey==='guia_len'){
    picked = pickForGuia1000('len', 20, notes);
  } else if(courseKey==='guia_fql120'){
    var fis = pickForGuia1000('fis', 20, notes);
    var qui = pickForGuia1000('qui', 20, notes);
    var len = pickForGuia1000('len', 20, notes);
    // intercala 1-1-1 para no agrupar por materia
    var maxLen=Math.max(fis.length, qui.length, len.length);
    for(var i=0;i<maxLen;i++){
      if(fis[i]) picked.push(fis[i]);
      if(qui[i]) picked.push(qui[i]);
      if(len[i]) picked.push(len[i]);
    }
    // si por algún motivo faltan, completa
    if(picked.length<60){
      var extraPool = [].concat(fis,qui,len);
      var need=60-picked.length;
      var already={}; picked.forEach(function(q){ already[q.id]=1; });
      var rest=extraPool.filter(function(q){ return !already[q.id]; });
      picked = picked.concat(shuffle(rest).slice(0, need));
    }
  }
  if(picked.length===0){
    S.toast='Banco 1000 aún no cargado. Verifica qué guia-bank-1000-intermedio.js esté incluido.';
    picked=[];
  } else if(notes.length){
    S.toast = notes.join(' ');
  } else {
    S.toast = null;
  }
  // map a formato attempt: src con shape compatible + order
  var qs = picked.map(function(q){
    var order = q.opts.map(function(_,ix){return ix;});
    if(cfg.shuffleOptions) order = shuffle(order);
    return {
      src: { t: q.t, q: q.prompt, o: q.opts, a: q.ans, e: q.exp, ch: q.ch, maths: q.maths||[], imgs: q.imgs||[], __s: q.s, n: q.n, d: q.d, topics: q.topics, id: q.id },
      order: order,
      subj: q.s
    };
  });
  if(cfg.shuffleQuestions){
    qs = shuffle(qs);
    // anti-contigüidad final (clave para MAT y FQL intercalado): evita mismo topic/template contiguo tras shuffle
    (function(){
      function nT(q){ return (q.src.topics&&q.src.topics[0]||'misc')+'|'+String(q.src.q).replace(/\d+(\.\d+)?/g,'#').slice(0,64); }
      for(var k=0;k<qs.length-1;k++){
        var aT=qs[k].src.topics&&qs[k].src.topics[0], bT=qs[k+1].src.topics&&qs[k+1].src.topics[0];
        var aN=nT(qs[k]), bN=nT(qs[k+1]);
        if(aT===bT || aN===bN){
          var sw=-1;
          for(var j=k+2;j<qs.length;j++){ var jT=qs[j].src.topics&&qs[j].src.topics[0]; var jN=nT(qs[j]); if(jT!==aT && jN!==aN){ sw=j; break; } }
          if(sw===-1) for(var j2=k+2;j2<qs.length;j2++) if(nT(qs[j2])!==aN){ sw=j2; break; }
          if(sw!==-1){ var tmp=qs[k+1]; qs[k+1]=qs[sw]; qs[sw]=tmp; }
        }
      }
    })();
  }

  // Final intra-intento guard for Guia1000: ensure qs have unique prompt/id (no duplicate exact statement)
  (function(){
    var seenP={}, seenI={}, uniq=[];
    for(var i=0;i<qs.length;i++){
      var q=qs[i];
      var key=q.src.q;
      var id=q.src.id;
      if(!seenP[key] && !seenI[id]){ seenP[key]=1; seenI[id]=1; uniq.push(q); }
    }
    if(uniq.length < qs.length){
      S.toast = (S.toast? S.toast+' ' : '') + 'Intento Guia sin duplicados: se entregan '+uniq.length+'/'+qs.length+' preguntas unicas.';
      qs = uniq;
    }
  })();
  return { course: courseKey, level: 'intermedio', qs: qs, ans: qs.map(function(){return null;}), flags: qs.map(function(){return false;}), cur:0, start:new Date(), end:null, finished:false, limitMs: minutesFor(courseKey)*60000, historic:false, isGuia1000:true };
}
function attemptFromRecord(r){
  // Guia 1000 records store id
  if(GUIA_COURSES.indexOf(r.course)>=0){
    var bank1000 = window.GUIA_BANK_1000||{mat:[],fis:[],qui:[],len:[]};
    var byId={}; ['mat','fis','qui','len'].forEach(function(sub){ (bank1000[sub]||[]).forEach(function(q){ byId[q.id]=q; }); });
    var qs = r.qs.map(function(x){
      var q = byId[x.id] || byId[x.k+'-'+String(x.i).padStart(3,'0')] || null;
      if(!q) return null;
      var src = { t:q.t, q:q.prompt, o:q.opts, a:q.ans, e:q.exp, ch:q.ch, maths:q.maths||[], imgs:q.imgs||[], __s:q.s, n:q.n, d:q.d, topics:q.topics, id:q.id };
      return {src:src, order:src.o.map(function(_,ix){return ix;}), subj:q.s};
    }).filter(Boolean);
    return {course:r.course, level:r.level, qs:qs, ans:r.qs.map(function(x){ return x.sel==null? null : x.sel; }), flags:qs.map(function(){return false;}), cur:0, start:new Date(r.ts), end:new Date(r.ts + r.durMs), finished:true, limitMs:r.min*60000, historic:true, recId:r.id, isGuia1000:true};
  }
  var qs = r.qs.map(function(x){
    var src = BANK[x.k][x.i];
    return {src:src, order:src.o.map(function(_,ix){return ix;}), subj:x.k};
  });
  return {course:r.course, level:r.level, qs:qs, ans:r.qs.map(function(x){ return x.sel==null? null : x.sel; }),
          flags:qs.map(function(){return false;}), cur:0, start:new Date(r.ts), end:new Date(r.ts + r.durMs),
          finished:true, limitMs:r.min*60000, historic:true, recId:r.id};
}

/* ---------- CHROME ---------- */
function areaToggleHtml(){
  var guia = isGuia();
  return '<button class="área-toggle'+(guia?' is-guia':'')+'" data-act="togglearea" role="switch" aria-checked="'+(guia?'true':'false')+'" title="'+(guia?'Cambiar a Aula Barreno':'Cambiar a Gu\u00eda Oficial EPN')+'">'
    +'<span class="área-lab '+(guia?'':'on')+'">AULA</span>'
    +'<span class="área-track" aria-hidden="true"><span class="área-thumb"></span></span>'
    +'<span class="área-lab guia '+(guia?'on':'')+'">GU\u00cdA EPN</span>'
  +'</button>';
}
function navbar(active){
  var guia = isGuia();
  var brand = guia
    ? '<div class="brand" data-act="home"><div class="shield guia">G</div><div class="btxt"><span class="l1"><b>EPN</b><i> gu\u00eda oficial</i></span><span class="sub">TEMARIO 2026-B \u00b7 \u00c1REA PARALELA</span></div></div>'
    : '<div class="brand" data-act="home"><div class="shield">EPN</div><div class="btxt"><span class="l1"><b>EPN</b><i>en l\u00ednea</i></span><span class="sub">AULA VIRTUAL VINCULACI\u00d3N</span></div></div>';
  var links = guia
    ? '<a data-act="home" class="'+(active==='home'?'active':'')+'">Inicio gu\u00eda</a>'
      +'<a data-act="learn" class="'+(active==='learn'||active==='chapter'?'active':'')+'">Aprender</a>'
      +'<a data-act="stats" class="'+(active==='stats'?'active':'')+'">Estadísticas</a>'
      +'<a data-act="history" class="'+(active==='history'?'active':'')+'">Historial</a>'
      +'<a data-act="guiawork" class="'+(active==='guiawork'?'active':'')+'">Talleres</a>'
    : '<a data-act="home" class="'+(active==='home'?'active':'')+'">P\u00e1gina Principal</a>'
      +'<a data-act="learn" class="'+(active==='learn'?'active':'')+'">Aprende</a>'
      +'<a data-act="stats" class="'+(active==='stats'?'active':'')+'">Estad\u00edsticas</a>'
      +'<a data-act="history" class="'+(active==='history'?'active':'')+'">Historial</a>';
  var notif = guia ? '' : '<button class="icon-btn" title="Notificaciones">\uD83D\uDD14</button>';
  return '<div class="navbar'+(guia?' guia-nav':'')+'">'
    +brand
    +areaToggleHtml()
    +'<div class="navlinks">'+links+'</div>'
    +'<div class="navright">'
      +'<button class="icon-btn" data-act="cfg" title="Configuraci\u00f3n">\u2699</button>'
      +notif
      +'<div class="avatar">'+escH((cfg.student||'A').trim().charAt(0))+'</div>'
    +'</div></div>';
}
function drawer(active){
  if(!UI.drawer) return '';
  if(isGuia()){
    var guiaSimLinks = GUIA_COURSES.map(function(k){
      var c=COURSES[k];
      return '<li><a class="'+(active==='course'&&S.course===k?'active':'')+'" data-act="course" data-c="'+k+'">'+escH(c.short)+' \u00b7 '+escH(c.name.split('—')[0].trim())+'</a></li>';
    }).join('');
    var seenTot = SEEN1000.mat.length + SEEN1000.fis.length + SEEN1000.qui.length + SEEN1000.len.length;
    return '<div class="drawer"><button class="closex" data-act="toggledrawer" title="Ocultar men\u00fa">\u2715</button>'+
      '<h6>\u25be Gu\u00eda oficial 2026-B</h6><ul>'+
      '<li><a class="'+(active==='home'?'active':'')+'" data-act="home">Inicio gu\u00eda</a></li>'+
      '<li><a class="'+(active==='learn'?'active':'')+'" data-act="learn">Aprender (teor\u00eda 1:1)</a></li>'+
      '<li><a class="'+(active==='guiawork'?'active':'')+'" data-act="guiawork">Talleres</a></li>'+
      '</ul>'+
      '<h6>\u25be Simuladores (1000 banco)</h6><ul>'+guiaSimLinks+'</ul>'+
      '<div style="padding:8px 16px; font-size:11px; color:#6b7783;">Vistas: '+seenTot+'/1000 \u00b7 Nivel intermedio</div>'+
      '<h6>\u25be Progreso</h6><ul>'+
      '<li><a class="'+(active==='stats'?'active':'')+'" data-act="stats">Estadísticas</a></li>'+
      '<li><a class="'+(active==='history'?'active':'')+'" data-act="history">Historial de intentos</a></li>'+
      '</ul>'+
      '<h6>\u25be Navegaci\u00f3n</h6><ul>'+
      '<li><a data-act="exitguia">\u2190 Volver al aula Barreno</a></li>'+
      '</ul></div>';
  }
  var aulaGuiaLink = '<li><a data-act="enterguia" style="font-weight:700; color:#0e2a47; background:#fff7ef; border-left:3px solid #c45c26;">\u2192 Gu\u00eda oficial EPN (1000 banco)</a></li>';
  var items = CKEYS.filter(function(k){ return GUIA_COURSES.indexOf(k)<0; }).map(function(k){
    return '<li><a class="'+(active==='quiz'&&S.course===k?'active':'')+'" data-act="course" data-c="'+k+'">'+COURSES[k].full+'</a></li>';
  }).join('');
  return '<div class="drawer"><button class="closex" data-act="toggledrawer" title="Ocultar men\u00fa">\u2715</button>'+
    '<h6>\u25be General</h6><ul>'+
    '<li><a class="'+(active==='learn'?'active':'')+'" data-act="learn">Aprende (teor\u00eda)</a></li>'+
    '<li><a class="'+(active==='stats'?'active':'')+'" data-act="stats">Estad\u00edsticas</a></li>'+
    '<li><a class="'+(active==='history'?'active':'')+'" data-act="history">Historial de intentos</a></li>'+
    aulaGuiaLink+
    items+
    '</ul></div>';
}
function drawerBtn(){ return UI.drawer? '' : '<button class="drawerbtn" data-act="toggledrawer">\u2630 Men\u00fa</button>'; }
function sitefooter(){
  return '<div class="sitefooter">'+
    '<div><b>Cont\u00e1ctanos</b><div>\u260E \u2709</div></div>'+
    '<div class="mid"><span class="contactbtn">\u2295 Contactar con el soporte del sitio</span>'+
    '<div>Usted se ha identificado cómo '+escH(cfg.student)+' (<a>Cerrar sesi\u00f3n</a>)</div></div>'+
    '<div style="width:120px"></div></div>';
}
function pagehead(title, crumbs, ck){
  var c = COURSES[ck||S.course];
  return '<div class="pagehead">'+
    '<div class="actv-icon" style="background:'+c.color+'">'+c.icon+'</div>'+
    '<h1 class="title">'+title+'</h1>'+
    '<div class="crumbs">'+crumbs+'</div>'+
    '<button class="closepage" data-act="home">\u2715</button></div>';
}
function toastHtml(){ return S.toast? '<div class="alertbox">'+escH(S.toast)+'</div>' : ''; }
function actnav(){
  var c = COURSES[S.course];
  return '<div class="actnav"><div class="side"><span class="lbl">\u2039 Actividad previa</span><br><a>'+(c.prev||'\u2014')+'</a></div>'+
    '<div><select><option>Ir a\u2026</option><option>Gu\u00eda de Estudio</option><option>Avisos</option></select></div>'+
    '<div class="side r"><span class="lbl">Siguiente actividad \u203a</span><br><a class="next">'+(c.next||'\u2014')+'</a></div></div>';
}

/* ---------- bloque de navegación ---------- */
function isCorrect(ix){
  var a = S.attempt, q = a.qs[ix];
  return a.ans[ix]!==null && q.order[a.ans[ix]] === q.src.a;
}
function navButtons(mode){
  var a = S.attempt, c = getCourseInfo(a.course);
  var isSeq = (a && a.sequential && mode==='attempt');
  var btns = a.qs.map(function(q,ix){
    var cls = 'qnbutton';
    if(mode==='review'){ cls += isCorrect(ix)?' correct':(a.ans[ix]!==null?' incorrect':''); }
    else { if(a.ans[ix]!==null) cls += ' answered'; if(ix===a.cur && S.view==='attempt') cls += ' current'; }
    if(a.flags[ix]) cls += ' flagged';
    if(isSeq && ix!==a.cur){
      cls += ' disabled';
      return '<button class="'+cls+'" data-act="none" style="cursor:not-allowed;opacity:.65;" title="Navegación secuencial estricta: avanza con Siguiente página"><span class="num">'+(ix+1)+'</span><span class="bar"></span></button>';
    }
    return '<button class="'+cls+'" data-act="goto" data-i="'+ix+'"><span class="num">'+(ix+1)+'</span><span class="bar"></span></button>';
  }).join('');
  return '<div class="block">'+
    '<h5>Navegaci\u00f3n por el cuestionario</h5>'+
    '<div class="user"><div class="av">'+escH((cfg.student||'A').trim().charAt(0))+'</div><div class="uname">'+escH(cfg.student)+'</div></div>'+
    '<div class="quizname">'+c.name+'</div>'+
    '<div class="qnbuttons">'+btns+'</div>'+
    (mode==='review'
      ? '<a class="blocklink" data-act="showall">Mostrar '+(S.onePage==null?'una p\u00e1gina cada vez':'todas las preguntas')+'</a><a class="blocklink" data-act="finishreview">Finalizar revisi\u00f3n</a>'
      : '<a class="blocklink" data-act="summary">Terminar intento...</a>')+
    '</div>';
}
function navBlock(mode){ return '<div class="rightblock">'+navButtons(mode)+'</div>'; }

/* ---------- pregunta ---------- */
/* ---------- respaldo del progreso ---------- */
function progressSnapshot(){
  return {app:'Simulador EPN 2026-B', v:5, exported:new Date().toISOString(),
          cfg:cfg, hist:HIST, seen:SEEN, ui:UI};
}
function exportProgress(){
  try{
    var txt = JSON.stringify(progressSnapshot(), null, 1);
    var blob = new Blob([txt], {type:'application/json'});
    var url = URL.createObjectURL(blob), a = document.createElement('a');
    var d = new Date(), st = d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2);
    a.href = url; a.download = 'progreso-epn-'+st+'.json';
    document.body.appendChild(a); a.click();
    setTimeout(function(){ URL.revokeObjectURL(url); a.remove(); }, 500);
    S.toast = 'Progreso exportado. Guarda ese archivo .json y vuelve a importarlo cuando actualices la aplicación.';
  }catch(e){ S.toast = 'No se pudo exportar: '+e.message; }
  S.modal = null; cloudSync(); render();
}
function importProgress(text){
  var data;
  try{ data = JSON.parse(text); }catch(e){ S.toast = 'El archivo no es un JSON válido.'; render(); return; }
  if(!data || (!data.hist && !data.seen && !data.cfg)){ S.toast = 'El archivo no contiene datos de progreso del simulador.'; render(); return; }
  var nuevos = 0, ids = {};
  HIST.forEach(function(r){ ids[r.id] = 1; });
  (data.hist||[]).forEach(function(r){ if(r && r.id && !ids[r.id]){ HIST.push(r); ids[r.id]=1; nuevos++; } });
  HIST.sort(function(a,b){ return a.ts-b.ts; });
  var vistas = 0;
  SUBJ.forEach(function(k){
    var add = (data.seen && data.seen[k]) || [];
    add.forEach(function(i){ if(!SEENSET[k][i]){ SEENSET[k][i]=1; SEEN[k].push(i); vistas++; } });
  });
  if(data.cfg) { Object.keys(DEFAULT_CFG).forEach(function(k){ if(data.cfg[k]!==undefined) cfg[k]=data.cfg[k]; }); }
  if(data.ui && data.ui.read){ UI.read = Object.assign({}, UI.read||{}, data.ui.read); }
  saveHist(); saveSeen(); pushCloudState(); saveCfg(); saveUI();
  S.modal = null;
  S.toast = 'Progreso importado: '+nuevos+' intento(s) nuevos y '+vistas+' pregunta(s) vistas añadidas. Tu configuración también se restauró.';
  render();
}
/* ---------- explicaciones paso a paso ---------- */
var METHODS = [
 /* ---- MATEMATICA ---- */
 {k:'mat', re:/valor de la expresión/i, h:'Jerarquía',
  st:['**Reconoce la operación:** es una evaluación numerica, asi qué solo se aplica la jerarquía de operaciones.',
      '**Resuelve primero los paréntesis** (de adentro hacia afuera) y las barras de valor absoluto.',
      '**Luego las potencias y raíces**, recordando qué $(-a)^{2}$ es positivo pero $-a^{2}$ es negativo.',
      '**Después multiplicaciones y divisiones** de izquierda a derecha.',
      '**Al final sumas y restas**, cuidando la regla de signos: dos signos iguales suman, dos distintos restan.']},
 {k:'mat', re:/Al efectuar .*frac|\bfrac\{/i, t:'Fundamentos', h:'Fracciones',
  st:['**Identifica qué es una operación con fracciones** (racionales).',
      '**Si hay suma o resta:** saca el mínimo común denominador (mcm de los denominadores) y convierte cada fracción.',
      '**Si hay multiplicacion:** multiplica numerador por numerador y denominador por denominador; **si hay division:** multiplica por el reciproco.',
      '**En fracciones compuestas** (fracción sobre fracción) resuelve arriba y abajo por separado y luego divide.',
      '**Simplifica** dividiendo numerador y denominador por su MCD hasta dejar la fracción irreducible.']},
 {k:'mat', re:/notación científica/i, h:'Reales',
  st:['**Multiplica (o divide) por separado** los coeficientes y las potencias de $10$.',
      '**Suma los exponentes** al multiplicar y restalos al dividir: $10^{a}\\cdot10^{b}=10^{a+b}$.',
      '**Normaliza el resultado**: el coeficiente debe quedar entre $1$ y $10$; si te pasas, corre la coma y ajusta el exponente.']},
 {k:'mat', re:/es igual a:|simplificada/i, t:'Fundamentos', h:'exponentes',
  st:['**Detecta las leyes de exponentes** qué intervienen.',
      '**Misma base:** al multiplicar se suman exponentes ($a^{m}a^{n}=a^{m+n}$) y al dividir se restan ($a^{m}/a^{n}=a^{m-n}$).',
      '**Potencia de potencia:** se multiplican los exponentes, $(a^{m})^{n}=a^{mn}$.',
      '**Exponente negativo** significa reciproco: $a^{-n}=1/a^{n}$; y todo número (no nulo) elevado a $0$ vale $1$.',
      '**Si hay sumas de potencias**, factoriza la potencia mas pequeña en lugar de intentar sumar exponentes.']},
 {k:'mat', re:/racionalizar/i, h:'Radicales',
  st:['**Identifica el radical del denominador**: hay qué eliminarlo sin cambiar el valor de la expresion.',
      '**Si el denominador es $\\sqrt{a}$**, multiplica numerador y denominador por $\\sqrt{a}$.',
      '**Si es un binomio $a+\\sqrt{b}$**, multiplica por su **conjugado** $a-\\sqrt{b}$ para usar $(x+y)(x-y)=x^{2}-y^{2}$.',
      '**Opera y simplifica** el resultado; el denominador queda sin raíces.']},
 {k:'mat', re:/El desarrollo de/i, h:'Productos notables',
  st:['**Reconoce el producto notable** antes de multiplicar término a término.',
      '**Binomio al cuadrado:** $(a\\pm b)^{2}=a^{2}\\pm 2ab+b^{2}$. El error tipico es olvidar el doble producto $2ab$.',
      '**Suma por diferencia:** $(a+b)(a-b)=a^{2}-b^{2}$.',
      '**Binomios con término común:** $(x+a)(x+b)=x^{2}+(a+b)x+ab$.',
      '**Verifica** el signo y el grado de cada término del resultado.']},
 {k:'mat', re:/factorización/i, h:'Factorizaci',
  st:['**Recorre el menu de factorización en orden:** factor común, diferencia de cuadrados, trinomio cuadrado perfecto, trinomio general, agrupacion.',
      '**Diferencia de cuadrados:** $a^{2}-b^{2}=(a+b)(a-b)$.',
      '**Trinomio $x^{2}+bx+c$:** busca dos números qué **multiplicados den $c$ y sumados den $b$**.',
      '**Trinomio $ax^{2}+bx+c$:** usa el método del aspa o multiplica y divide por $a$.',
      '**Comprueba** multiplicando los factores: debes recuperar la expresion original.']},
 {k:'mat', re:/residuo de dividir/i, h:'residuo',
  st:['**Reconoce el teorema del residuo:** al dividir $P(x)$ entre $(x-c)$ el residuo es $P(c)$.',
      '**Despeja el valor de $c$** del divisor: en $(x-3)$ es $c=3$; en $(x+3)$ es $c=-3$.',
      '**Evalua $P(c)$** sustituyendo con cuidado los signos de las potencias.',
      '**Interpreta:** si el residuo es $0$, el divisor es factor de $P(x)$ (teorema del factor).']},
 {k:'mat', re:/la expresión .*\{x/i, t:'Fundamentos', h:'Expresiones algebraicas',
  st:['**Factoriza numerador y denominador** por separado.',
      '**Cancela los factores comunes** (solo factores, nunca sumandos sueltos).',
      '**Indica las restricciones**: los valores qué anulan el denominador original quedan excluidos.']},
 {k:'mat', re:/solución de la ecuación/i, t:'Ecuaciones', h:'primer grado',
  st:['**Quita denominadores** multiplicando toda la ecuación por el mcm.',
      '**Elimina paréntesis** aplicando la propiedad distributiva.',
      '**Agrupa:** las $x$ a un lado y los números al otro, cambiando de signo al pasar.',
      '**Reduce términos semejantes** y **despeja** dividiendo por el coeficiente de $x$.',
      '**Verifica** sustituyendo el valor obtenido en la ecuación original.']},
 {k:'mat', re:/En el sistema|cuestan \$/i, h:'Sistemas',
  st:['**Traduce el enunciado a dos ecuaciones** definiendo claramente las incognitas (por ejemplo $x$ = precio de un esfero).',
      '**Elige método:** sustitucion si una variable esta despejada, **eliminacion** si los coeficientes se pueden igualar, o igualacion.',
      '**Elimina una variable** multiplicando una ecuacion por el numero adecuado y sumando o restando.',
      '**Halla la primera incognita** y sustituyela en cualquier ecuacion para obtener la segunda.',
      '**Comprueba** que el par $(x,y)$ satisface **las dos** ecuaciones.']},
 {k:'mat', re:/discriminante/i, h:'segundo grado',
  st:['**Escribe la ecuacion en la forma $ax^{2}+bx+c=0$** e identifica $a$, $b$ y $c$ con sus signos.',
      '**Aplica $\\Delta=b^{2}-4ac$**, cuidando que $b^{2}$ siempre es positivo.',
      '**Interpreta:** $\\Delta>0$ dos raices reales distintas, $\\Delta=0$ una raiz doble, $\\Delta<0$ sin solución real.']},
 {k:'mat', re:/raíces de|soluciones de la ecuación \$x\^/i, h:'segundo grado',
  st:['**Ordena la ecuación** cómo $ax^{2}+bx+c=0$.',
      '**Intenta factorizar primero** (dos números qué sumen $b$ y multipliquen $c$ si $a=1$): es mas rapido qué la formula.',
      '**Si no factoriza, usa la formula** $x=\\dfrac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$.',
      '**Recuerda Vieta** para verificar o para preguntas de suma y producto: $x_{1}+x_{2}=-b/a$ y $x_{1}x_{2}=c/a$.',
      '**Verifica** sustituyendo al menos una raíz.']},
 {k:'mat', re:/conjunto solución de la inecuación \$\|x|conjunto solución de la ecuación \$\|x/i, h:'Valor absoluto',
  st:['**Recuerda el significado:** $|x-a|$ es la distancia entre $x$ y $a$.',
      '**Ecuación $|u|=k$ (con $k\\ge0$):** se abre en dos casos, $u=k$ y $u=-k$.',
      '**Desigualdad $|u|<k$:** equivale a la doble desigualdad $-k<u<k$ (un solo intervalo).',
      '**Desigualdad $|u|>k$:** equivale a $u<-k$ **o** $u>k$ (dos rayos separados).',
      '**Despeja $x$** en cada caso y escribe la solución en notacion de intervalos.']},
 {k:'mat', re:/conjunto solución de \$x\^/i, h:'Inecuaciones',
  st:['**Pasa todo a un lado** para dejar la forma $ax^{2}+bx+c<0$ (o $>0$).',
      '**Halla las raices** del trinomio: son los puntos que dividen la recta real.',
      '**Arma la tabla de signos** evaluando un punto de cada intervalo.',
      '**Selecciona los intervalos** con el signo pedido; usa corchetes solo si la desigualdad no es estricta.']},
 {k:'mat', re:/conjunto solución de/i, h:'Inecuaciones',
  st:['**Trata la inecuacion como una ecuacion** para despejar $x$.',
      '**Regla de oro:** al multiplicar o dividir por un numero **negativo** se **invierte** el sentido de la desigualdad.',
      '**Escribe el resultado como intervalo** y ubicalo en la recta real para comprobar.']},
 {k:'mat', re:/transversal|paralelas/i, h:'paralelas',
  st:['**Ubica el tipo de par de angulos:** correspondientes, alternos internos, alternos externos o conjugados.',
      '**Aplica la regla:** correspondientes y alternos son **iguales**; conjugados (colaterales) son **suplementarios** (suman $180^{\\circ}$).',
      '**Usa tambien** angulos opuestos por el vertice (iguales) y el par lineal (suman $180^{\\circ}$).',
      '**Plantea la ecuacion** con esa relacion y despeja el angulo pedido.']},
 {k:'mat', re:/congruentes/i, h:'Congruencia',
  st:['**Recuerda los criterios validos:** LLL, LAL, ALA, LAA y (en rectangulos) hipotenusa-cateto.',
      '**Verifica que el angulo este entre los lados** en el caso LAL: si no lo esta, no sirve.',
      '**Descarta LLA**: dos lados y un angulo no comprendido **no** es criterio de congruencia.',
      '**Concluye** que los elementos correspondientes restantes tambien son congruentes.']},
 {k:'mat', re:/semejantes/i, h:'Semejanza',
  st:['**Comprueba la semejanza** por AA (dos angulos iguales), LAL o LLL proporcional.',
      '**Escribe la proporcion** entre lados **homologos** (los que se oponen a angulos iguales).',
      '**Halla la razon $k$** y multiplica o divide segun corresponda.',
      '**Recuerda:** los perimetros van en razon $k$, pero las **areas van en razon $k^{2}$**.']},
 {k:'mat', re:/triángulo rectángulo/i, t:'Geometr', h:'Pitágoras',
  st:['**Identifica hipotenusa y catetos** (la hipotenusa siempre se opone al angulo recto).',
      '**Aplica $a^{2}+b^{2}=c^{2}$**, despejando el lado desconocido.',
      '**Reconoce ternas conocidas** (3-4-5, 5-12-13, 8-15-17) para ahorrar tiempo.',
      '**Revisa las unidades y que la hipotenusa sea el lado mayor.**']},
 {k:'mat', re:/distancia entre los puntos/i, h:'recta',
  st:['**Anota las coordenadas** $A(x_{1},y_{1})$ y $B(x_{2},y_{2})$.',
      '**Aplica $d=\\sqrt{(x_{2}-x_{1})^{2}+(y_{2}-y_{1})^{2}}$** (es Pitagoras en el plano).',
      '**Eleva al cuadrado antes de sumar**: las diferencias negativas se vuelven positivas.',
      '**Simplifica el radical** si se puede.']},
 {k:'mat', re:/punto medio/i, h:'recta',
  st:['**Usa la formula del punto medio:** $M=\\left(\\dfrac{x_{1}+x_{2}}{2},\\dfrac{y_{1}+y_{2}}{2}\\right)$.',
      '**Promedia cada coordenada por separado**, no las mezcles.',
      '**Comprueba** que $M$ quede entre los dos puntos.']},
 {k:'mat', re:/pendiente de la recta|ecuación de la recta/i, h:'recta',
  st:['**Pendiente:** $m=\\dfrac{y_{2}-y_{1}}{x_{2}-x_{1}}$ (cuidado con el orden y los signos).',
      '**Con un punto y la pendiente** usa la forma punto-pendiente $y-y_{1}=m(x-x_{1})$.',
      '**Ordena** a la forma pedida (explicita $y=mx+b$ o general $Ax+By+C=0$).',
      '**Recuerda:** rectas paralelas tienen igual $m$; perpendiculares cumplen $m_{1}m_{2}=-1$.']},
 {k:'mat', re:/circunferencia/i, h:'circunferencia',
  st:['**Forma canonica:** $(x-h)^{2}+(y-k)^{2}=r^{2}$, con centro $(h,k)$ y radio $r$.',
      '**Ojo con los signos:** $(x+3)^{2}$ significa $h=-3$.',
      '**Si la ecuacion esta en forma general**, completa cuadrados en $x$ y en $y$: suma a ambos lados el cuadrado de la mitad del coeficiente lineal.',
      '**Lee centro y radio** de la forma canonica ($r=\\sqrt{\\text{lado derecho}}$).']},
 {k:'mat', re:/valor exacto/i, h:'razones',
  st:['**Ubica el angulo de referencia** y el cuadrante del angulo dado.',
      '**Determina el signo** con la regla CAST: en I todas positivas, en II solo seno y cosecante, en III tangente y cotangente, en IV coseno y secante.',
      '**Usa la tabla de valores exactos** de $30^{\\circ}$, $45^{\\circ}$ y $60^{\\circ}$.',
      '**Combina signo y valor** para dar la respuesta.']},
 {k:'mat', re:/cateto opuesto|razones trigonom/i, h:'razones',
  st:['**Escribe las definiciones:** $\\sin=\\frac{co}{h}$, $\\cos=\\frac{ca}{h}$, $\\tan=\\frac{co}{ca}$; y sus reciprocas $\\csc$, $\\sec$, $\\cot$.',
      '**Identifica en la figura** cual lado es opuesto, cual adyacente y cual la hipotenusa respecto del angulo dado.',
      '**Si falta un lado, usa Pitagoras** antes de calcular la razon.',
      '**Simplifica y racionaliza** si el resultado queda con raiz en el denominador.']},
 {k:'mat', re:/para todo valor admisible/i, h:'Identidades',
  st:['**Convierte todo a senos y cosenos**: es la estrategia que casi siempre funciona.',
      '**Aplica las identidades pitagoricas:** $\\sin^{2}x+\\cos^{2}x=1$, $1+\\tan^{2}x=\\sec^{2}x$, $1+\\cot^{2}x=\\csc^{2}x$.',
      '**Usa las de doble angulo** si aparece $2x$: $\\sin 2x=2\\sin x\\cos x$, $\\cos 2x=\\cos^{2}x-\\sin^{2}x$.',
      '**Simplifica la fraccion** y compara con las opciones.']},
 {k:'mat', re:/ley de senos|\bA = |dos lados miden/i, t:'Trigonometr', h:'Ley de senos',
  st:['**Decide que ley usar:** con dos angulos y un lado (AAL/ALA) o dos lados y un angulo opuesto (LLA) va la **ley de senos**; con dos lados y el angulo comprendido (LAL) o tres lados (LLL) va la **ley de cosenos**.',
      '**Ley de senos:** $\\dfrac{a}{\\sin A}=\\dfrac{b}{\\sin B}=\\dfrac{c}{\\sin C}$.',
      '**Ley de cosenos:** $c^{2}=a^{2}+b^{2}-2ab\\cos C$.',
      '**Recuerda** que los angulos del triangulo suman $180^{\\circ}$ para hallar el que falte.',
      '**Sustituye y despeja** el elemento pedido.']},

 /* ---- FISICA ---- */
 {k:'fis', re:/primera ley|inercia|velocidad constante|equilibrio|reposo de una cuerda|letrero/i, h:'Primera ley',
  st:['**Pregunta clave: hay aceleracion?** Si el cuerpo esta en reposo o va con velocidad constante, la fuerza neta es **cero**.',
      '**Dibuja el diagrama de cuerpo libre** con todas las fuerzas que actuan sobre el cuerpo.',
      '**Plantea el equilibrio** por componentes: $\sum F_{x}=0$ y $\sum F_{y}=0$.',
      '**Despeja la fuerza pedida** (tension, normal, peso).',
      '**Recuerda:** la inercia se mide por la **masa**, no por el peso.']},
 {k:'fis', re:/hacia el este|hacia el norte|perpendiculares|forman entre sí un ángulo/i, h:'Vectores',
  st:['**Distingue distancia de desplazamiento:** la distancia suma trayectos, el desplazamiento es el vector del inicio al final.',
      '**Descompone cada vector** en componentes $x$ e $y$ ($F_{x}=F\\cos\\theta$, $F_{y}=F\\sin\\theta$).',
      '**Suma componentes** por separado.',
      '**Halla la magnitud** con $R=\\sqrt{R_{x}^{2}+R_{y}^{2}}$ y la direccion con $\\tan\\theta=R_{y}/R_{x}$.',
      '**Si son perpendiculares**, basta Pitagoras.']},
 {k:'fis', re:/acelera|velocidad inicial|móvil/i, h:'Cinem',
  st:['**Lista los datos** ($v_{0}$, $v$, $a$, $t$, $d$) y marca cual te piden.',
      '**Elige la ecuacion del MRUA** que use solo lo que tienes: $v=v_{0}+at$, $d=v_{0}t+\\frac{1}{2}at^{2}$, $v^{2}=v_{0}^{2}+2ad$.',
      '**Cuida los signos:** si el cuerpo frena, la aceleracion es negativa.',
      '**Sustituye con unidades del SI** y despeja.']},
 {k:'fis', re:/cae libremente|se suelta desde el reposo|proyectil/i, h:'Caida',
  st:['**En caida libre** la aceleracion es $g\\approx 9{,}8\ \\mathrm{m/s^{2}}$ y no depende de la masa.',
      '**Desde el reposo:** $v=gt$ y $h=\\frac{1}{2}gt^{2}$.',
      '**En proyectiles separa los ejes:** en $x$ el movimiento es uniforme ($x=v_{0x}t$) y en $y$ es caida libre.',
      '**En el punto mas alto** la velocidad vertical es cero, pero la horizontal se mantiene.',
      '**El tiempo es el puente** entre ambos ejes.']},
 {k:'fis', re:/fuerza neta de|actúa una fuerza|aceleración de/i, h:'Segunda ley',
  st:['**Aplica la segunda ley:** $F_{neta}=ma$, siempre con la **fuerza neta** (suma vectorial), no una fuerza aislada.',
      '**Despeja lo pedido:** $a=F/m$, $m=F/a$ o $F=ma$.',
      '**Si hay rozamiento**, restalo: $F_{neta}=F_{aplicada}-\mu N$.',
      '**Verifica unidades:** $1\ \\mathrm{N}=1\ \\mathrm{kg\\cdot m/s^{2}}$.']},
 {k:'fis', re:/rozamiento|fricción|coeficiente/i, h:'Rozamiento',
  st:['**Calcula la normal:** en horizontal $N=mg$; en un plano inclinado $N=mg\\cos\\theta$.',
      '**Halla el rozamiento:** $f=\mu N$.',
      '**Plantea la segunda ley** en la direccion del movimiento restando el rozamiento.',
      '**Recuerda:** el rozamiento estatico maximo es mayor que el cinetico y siempre se opone al movimiento.']},
 {k:'fis', re:/plano inclinado/i, h:'inclinado',
  st:['**Gira los ejes:** pon el eje $x$ paralelo al plano.',
      '**Descompone el peso:** componente que empuja $mg\\sin\\theta$ y componente perpendicular $mg\\cos\\theta$.',
      '**La normal vale $N=mg\\cos\\theta$** (no $mg$).',
      '**Aplica $\sum F=ma$** a lo largo del plano, restando el rozamiento si lo hay.']},
 {k:'fis', re:/distancia entre dos masas|gravitacional|esferas de/i, h:'Gravitaci',
  st:['**Usa la ley de gravitacion:** $F=G\\dfrac{m_{1}m_{2}}{r^{2}}$.',
      '**Es inversa al cuadrado:** si la distancia se duplica, la fuerza cae a la **cuarta parte**; si se triplica, a la novena.',
      '**La fuerza es proporcional a las masas:** duplicar una masa duplica la fuerza.',
      '**Sustituye con $G=6{,}67\\times10^{-11}$** en unidades del SI.']},
 {k:'fis', re:/tercera ley|acción|reacción|caballo|cohete|caminas/i, h:'Tercera ley',
  st:['**Enuncia la tercera ley:** a toda accion corresponde una reaccion igual en magnitud y opuesta en direccion.',
      '**Clave:** el par accion-reaccion actua sobre **cuerpos distintos**, por eso nunca se cancela entre si.',
      '**Identifica los dos cuerpos** que interactuan y nombra la pareja de fuerzas.',
      '**Para saber si hay movimiento**, analiza solo las fuerzas sobre **un** cuerpo.']},
 {k:'fis', re:/circunferencia de radio|circular uniforme|centrípeta/i, h:'circular',
  st:['**En el MCU la rapidez es constante pero la velocidad cambia de direccion**, por eso hay aceleracion.',
      '**Aceleracion centripeta:** $a_{c}=\\dfrac{v^{2}}{r}$, dirigida hacia el centro.',
      '**Fuerza centripeta:** $F_{c}=m\\dfrac{v^{2}}{r}$; es el papel que cumple alguna fuerza real (tension, rozamiento, gravedad).',
      '**Periodo y frecuencia:** $v=\\dfrac{2\\pi r}{T}$ y $f=1/T$.']},
 {k:'fis', re:/momento lineal|cantidad de movimiento|impulso|choca/i, h:'Momento',
  st:['**Momento lineal:** $p=mv$ (vector, con signo segun el sentido).',
      '**Impulso:** $J=F\\Delta t=\\Delta p$.',
      '**En choques se conserva el momento total:** $m_{1}v_{1}+m_{2}v_{2}=(m_{1}+m_{2})v_{f}$ si quedan unidos.',
      '**Asigna signos opuestos** a cuerpos que se mueven en sentidos contrarios antes de sumar.']},
 {k:'fis', re:/trabajo de|fuerza horizontal constante|ángulo de .* con la hori/i, h:'Trabajo',
  st:['**Trabajo:** $W=Fd\\cos\\theta$, donde $\\theta$ es el angulo entre la fuerza y el desplazamiento.',
      '**Si la fuerza es perpendicular al movimiento, el trabajo es cero** (por eso la normal no trabaja).',
      '**Suma el trabajo de cada fuerza** para obtener el trabajo neto (el rozamiento aporta trabajo negativo).',
      '**Unidad:** el julio, $1\ \\mathrm{J}=1\ \\mathrm{N\\cdot m}$.']},
 {k:'fis', re:/potencia|vatio/i, h:'Potencia',
  st:['**Potencia es trabajo por unidad de tiempo:** $P=\\dfrac{W}{t}$, tambien $P=Fv$.',
      '**Unidad:** el vatio, $1\ \\mathrm{W}=1\ \\mathrm{J/s}$.',
      '**Convierte el tiempo a segundos** antes de dividir.']},
 {k:'fis', re:/energía cinética|rapidez de un cuerpo se multiplica/i, h:'cinética',
  st:['**Energia cinetica:** $E_{c}=\\frac{1}{2}mv^{2}$.',
      '**Depende del cuadrado de la rapidez:** si $v$ se duplica, $E_{c}$ se **cuadruplica**; si se triplica, se multiplica por nueve.',
      '**Teorema trabajo-energia:** el trabajo neto es igual al cambio de energia cinetica, $W_{neto}=\\Delta E_{c}$.']},
 {k:'fis', re:/potencial gravitacional|desde el reposo a .* de altura|péndulo|conserva/i, h:'Conservaci',
  st:['**Energia potencial gravitatoria:** $E_{p}=mgh$, medida desde el nivel de referencia que elijas.',
      '**Sin rozamiento la energia mecanica se conserva:** $E_{c1}+E_{p1}=E_{c2}+E_{p2}$.',
      '**En el punto mas alto** toda la energia es potencial; **en el mas bajo**, cinetica.',
      '**De ahi sale $v=\\sqrt{2gh}$** para una caida desde el reposo.',
      '**Con rozamiento**, la diferencia de energia se convirtio en calor.']},
 {k:'fis', re:/renovable|fuente de energ/i, h:'Fuentes',
  st:['**Renovables:** solar, eolica, hidraulica, geotermica, biomasa y mareomotriz (se reponen naturalmente).',
      '**No renovables:** carbon, petroleo, gas natural y nuclear de fision (existen en cantidad limitada).',
      '**Descarta** las opciones que provienen de combustibles fosiles.']},

 /* ---- QUIMICA ---- */
 {k:'qui', re:/transformar/i, h:'unidades',
  st:['**Escribe el factor de conversion** como una fraccion que valga 1 (por ejemplo $\\frac{1000\ \\mathrm{g}}{1\ \\mathrm{kg}}$).',
      '**Coloca la unidad que quieres eliminar abajo** para que se cancele.',
      '**Multiplica y cancela unidades** hasta que quede la pedida.',
      '**En unidades cubicas eleva el factor al cubo:** $1\ \\mathrm{m^{3}}=10^{6}\ \\mathrm{cm^{3}}$.']},
 {k:'qui', re:/constituye|cambio químico|mezcla|sustancia pura/i, h:'Clasificaci',
  st:['**Distingue sustancia pura de mezcla:** la pura tiene composicion fija (elemento o compuesto).',
      '**Mezcla homogenea (disolucion)** se ve uniforme; **heterogenea** deja distinguir sus fases.',
      '**Cambio fisico:** cambia la forma o el estado, no la identidad. **Cambio quimico:** se forman sustancias nuevas (gas, precipitado, cambio de color, calor).',
      '**Aplica el criterio** al caso del enunciado.']},
 {k:'qui', re:/número de protones|isotop|especie \$\^/i, h:'Partículas',
  st:['**Lee la notacion $^{A}_{Z}X$:** $Z$ es el número atomico (protones) y $A$ el número de masa.',
      '**Neutrones $=A-Z$.**',
      '**Electrones:** en un atomo neutro son iguales a $Z$; en un ion, resta la carga positiva o suma la negativa.',
      '**Verifica:** los isotopos tienen igual $Z$ y distinto $A$.']},
 {k:'qui', re:/configuración electrónica|electrones de valencia/i, h:'electrónica',
  st:['**Cuenta los electrones** (iguales a $Z$ si el atomo es neutro).',
      '**Sigue el orden de llenado (Aufbau):** $1s\\,2s\\,2p\\,3s\\,3p\\,4s\\,3d\\,4p\dots$',
      '**Respeta la capacidad:** $s$ hasta 2, $p$ hasta 6, $d$ hasta 10, $f$ hasta 14.',
      '**Los electrones de valencia** son los del ultimo nivel $n$ (grupo A = número de valencia).',
      '**Comprueba** qué la suma de superindices sea el total de electrones.']},
 {k:'qui', re:/se ubica|periodo|grupo/i, h:'tabla',
  st:['**El periodo es el ultimo nivel $n$** de la configuración.',
      '**El grupo A** se obtiene de los electrones de valencia ($ns^{x}np^{y}$).',
      '**El bloque** lo da el ultimo subnivel ocupado ($s$, $p$, $d$ o $f$).',
      '**Escribe la configuración** y leela cómo si fuera un mapa de la tabla.']},
 {k:'qui', re:/radio|energía de ionización|electronegatividad.*periodo|afinidad/i, h:'periódicas',
  st:['**Memoriza las flechas:** el **radio atomico** crece hacia la izquierda y hacia abajo.',
      '**Energia de ionizacion, afinidad electronica y electronegatividad** crecen hacia la derecha y hacia arriba (al reves del radio).',
      '**Razona el porque:** al avanzar en un periodo aumenta la carga nuclear y el atomo se contrae.',
      '**Aplica la tendencia** a los elementos del enunciado.']},
 {k:'qui', re:/fórmula del|nombre del compuesto/i, h:'Nomenclatura',
  st:['**Identifica el tipo de compuesto:** oxido, hidroxido, acido, hidruro o sal.',
      '**Asigna los números de oxidacion** de cada elemento.',
      '**Cruza las valencias** (el número de oxidacion de uno pasa cómo subindice del otro) y simplifica.',
      '**Nombra según el sistema:** prefijos griegos (mono-, di-, tri-) o terminaciones -oso/-ico.',
      '**Verifica qué la carga total sea cero.**']},
 {k:'qui', re:/diferencia de electronegatividad|enlace/i, h:'electronegatividad',
  st:['**Calcula $\\Delta$EN** restando las electronegatividades (mayor menos menor).',
      '**Clasifica:** $\\Delta<0{,}4$ covalente no polar; entre $0{,}4$ y $1{,}7$ covalente polar; $\\Delta>1{,}7$ ionico.',
      '**Comprueba con el tipo de elementos:** metal + no metal suele ser ionico; no metal + no metal, covalente.']},
 {k:'qui', re:/repulsión de pares|geometría/i, h:'TRPEV',
  st:['**Dibuja la estructura de Lewis** y cuenta los pares alrededor del atomo central.',
      '**Cuenta dominios:** enlaces (simples, dobles o triples cuentan cómo uno) mas pares libres.',
      '**Asigna la geometria:** 2 dominios lineal, 3 trigonal plana, 4 tetraedrica; con pares libres pasa a angular o piramidal.',
      '**Recuerda:** los pares libres empujan mas y cierran el ángulo.']},
 {k:'qui', re:/dipolo|puentes de hidrógeno|fuerzas intermoleculares/i, h:'intermoleculares',
  st:['**Ordena de mas debil a mas fuerte:** dispersion de London < dipolo-dipolo < puente de hidrogeno < ion-dipolo.',
      '**Hay puente de hidrogeno** solo si el H esta unido a **F, O o N**.',
      '**Relaciona con las propiedades:** a mayor fuerza intermolecular, mayor punto de ebullicion.']},
 {k:'qui', re:/masa molar/i, h:'mol',
  st:['**Escribe la formula** y cuenta los atomos de cada elemento.',
      '**Multiplica cada masa atomica por su subindice** y suma todo.',
      '**El resultado se expresa en $\\mathrm{g/mol}$.**',
      '**Verifica** qué no hayas olvidado subindices dentro de paréntesis.']},
 {k:'qui', re:/La masa de \$/i, h:'mol',
  st:['**Relacion clave:** $n=\\dfrac{m}{M}$, es decir $m=n\\cdot M$.',
      '**Multiplica los moles por la masa molar** para obtener gramos.',
      '**Comprueba unidades:** $\\mathrm{mol}\\times\\mathrm{g/mol}=\\mathrm{g}$.']},
 {k:'qui', re:/ecuación balanceada|balance/i, h:'estequiom',
  st:['**Verifica el balanceo:** debe haber los mismos atomos de cada elemento a cada lado.',
      '**Lee los coeficientes como moles:** son la receta de la reaccion.',
      '**Arma la proporcion** entre la sustancia dada y la pedida.',
      '**Recorre la autopista:** gramos $\\to$ moles $\\to$ (razon molar) $\\to$ moles $\\to$ gramos.']},
 {k:'qui', re:/fórmula empírica/i, h:'empírica',
  st:['**Calcula la masa de la formula empirica.**',
      '**Divide la masa molar entre esa masa:** obtienes un numero entero $n$.',
      '**Multiplica todos los subindices por $n$** para obtener la formula molecular.']},
 {k:'qui', re:/mol de cualquier sustancia|Avogadro|reactivo limitante|rendimiento/i, h:'mol',
  st:['**Un mol contiene $6{,}022\\times10^{23}$ particulas** (numero de Avogadro) y ocupa $22{,}4\ \\mathrm{L}$ si es gas en condiciones normales.',
      '**Reactivo limitante:** convierte cada reactivo a moles y divide entre su coeficiente; el menor cociente manda.',
      '**Rendimiento:** $\%=\\dfrac{\\text{real}}{\\text{teorico}}\\times100$.']},

 /* ---- LENGUAJE ---- */
 {k:'len', re:/función del lenguaje|elementos de la comunicaci/i, h:'comunicaci',
  st:['**Pregunta en que se centra el mensaje:** en el emisor (emotiva), en el receptor (apelativa), en el referente (referencial), en el canal (fatica), en el codigo (metalinguistica) o en la forma (poetica).',
      '**Busca marcas linguisticas:** imperativos indican apelativa; preguntas de contacto, fatica; datos objetivos, referencial.',
      '**Descarta** las funciones que no se corresponden con la intencion del ejemplo.']},
 {k:'len', re:/falacia/i, h:'falacia',
  st:['**Separa el contenido del razonamiento:** una falacia falla en la conexion, no en el tema.',
      '**Pregunta que hace el argumento:** ataca a la persona (ad hominem), apela a la mayoria (ad populum), a la autoridad (ad verecundiam), deforma la postura ajena (hombre de paja) o reduce a dos opciones (falsa dicotomia).',
      '**Compara con el catalogo** y elige la que describe exactamente la maniobra.']},
 {k:'len', re:/silogismo|premisa|se concluye|todos los|válid/i, h:'lógic',
  st:['**Identifica premisas y conclusion.**',
      '**Traduce a simbolos** si hay condicionales: $p\\to q$.',
      '**Aplica las reglas validas:** modus ponens ($p\\to q$ y $p$, luego $q$) y modus tollens ($p\\to q$ y $\neg q$, luego $\neg p$).',
      '**Recuerda la equivalencia** con la contrarreciproca $\neg q\\to\neg p$; la reciproca y la inversa **no** equivalen.',
      '**Descarta** afirmar el consecuente y negar el antecedente: son invalidos.']},
 {k:'len', re:/idea principal|tema del texto|título|texto anterior|según el texto|se infiere|se deduce/i, h:'lectura',
  st:['**Lee primero la pregunta** y luego el texto buscando esa información.',
      '**Localiza la oracion tematica** (suele estar al inicio o tras un conector como "sin embargo").',
      '**Distingue tema (de que trata) de idea principal (que afirma).**',
      '**En inferencias**, la respuesta debe seguirse del texto sin agregar datos externos.',
      '**Descarta opciones absolutistas** ("siempre", "nunca") y las que solo repiten palabras del texto.']},
 {k:'len', re:/conector|sin embargo|por lo tanto/i, h:'Conectores',
  st:['**Determina la relacion logica** entre las dos ideas: adicion, oposicion, causa, consecuencia o condicion.',
      '**Elige el conector de esa familia:** oposicion (sin embargo, no obstante), causa (porque, ya que), consecuencia (por lo tanto, en consecuencia).',
      '**Relee la oracion completa** con el conector puesto para comprobar que suena logica.']},
 {k:'len', re:/tilde|acentu|palabra/i, h:'Acentuaci',
  st:['**Separa en silabas** y localiza la silaba tonica.',
      '**Clasifica:** aguda, grave, esdrujula o sobresdrujula.',
      '**Aplica la regla:** agudas con tilde si terminan en vocal, $n$ o $s$; graves si **no** terminan asi; esdrujulas y sobresdrujulas **siempre**.',
      '**Revisa hiatos y tilde diacritica** (el/el, tu/tu, si/si, mas/mas).']},
 {k:'len', re:/coma|punto y coma|puntuación|signos/i, h:'Puntuaci',
  st:['**Identifica la funcion del signo:** enumerar, aislar un vocativo, encerrar una aclaracion o separar ideas.',
      '**Recuerda la prohibicion:** nunca va coma entre sujeto y verbo.',
      '**Coma tras conectores** como "sin embargo", "por lo tanto", "en consecuencia".',
      '**Los dos puntos anuncian** enumeracion, cita o explicacion.',
      '**Lee en voz alta** para confirmar las pausas.']},
 {k:'len', re:/párrafo|oración tópica|coherencia|cohesión|ordenar/i, h:'párrafo',
  st:['**Busca la oracion mas general:** esa abre el parrafo.',
      '**Sigue las marcas de referencia** ("este proceso", "dicha medida") que apuntan a algo ya mencionado.',
      '**Coloca al final** las oraciones que empiezan con "en conclusion", "por eso" o similares.',
      '**Comprueba la unidad:** un parrafo, una sola idea central.']},
 {k:'len', re:/dequeismo|queismo|concordancia|hubieron|correcta/i, h:'Concordancia',
  st:['**Revisa la concordancia** de sujeto con verbo (numero y persona) y de sustantivo con adjetivo (genero y numero).',
      '**"Haber" impersonal siempre en singular:** "hubo muchos", nunca "hubieron muchos".',
      '**Dequeismo:** sobra el "de" ("pienso de que"); **queismo:** falta el "de" ("me alegro que").',
      '**Prueba sustituyendo** por "eso": si cabe "de eso", va "de que".']},
 {k:'len', re:/hecho|opinión|juicio de valor|objetiv/i, h:'juicio',
  st:['**Pregunta si se puede verificar:** si si, es un **hecho**; si no, es opinion o juicio de valor.',
      '**Detecta adjetivos valorativos** (mejor, injusto, hermoso): senalan valoracion.',
      '**Un juicio de valor solido** declara su criterio y se apoya en evidencia.']},
 /* ---- recetas adicionales (cobertura total) ---- */
 {k:'qui', re:/número de oxidación/i, h:'oxidacion',
  st:['**Identifica que se pide un numero de oxidacion** dentro de un compuesto o de un ion.',
      '**Fija los valores conocidos:** el oxigeno vale $-2$ (salvo peroxidos, $-1$), el hidrogeno vale $+1$ (salvo hidruros metalicos, $-1$) y los metales alcalinos $+1$.',
      '**Plantea la ecuacion de suma:** la suma de todos los numeros de oxidacion es $0$ en un compuesto neutro y es igual a la carga si se trata de un ion.',
      '**Multiplica cada valor por su subindice** y despeja la incognita del elemento pedido.',
      '**Comprueba** que el resultado sea razonable para ese elemento (por ejemplo, el Cl llega hasta $+7$ y el Cr hasta $+6$).']},
 {k:'qui', re:/porcentaje en masa/i, h:'composicion',
  st:['**Reconoce que es composicion porcentual:** se compara la masa de un elemento con la masa total del compuesto.',
      '**Calcula la masa del elemento dentro de una mol de compuesto:** masa atomica multiplicada por el numero de atomos de ese elemento en la formula.',
      '**Toma la masa molar $M$ del compuesto** (viene dada en el enunciado).',
      '**Aplica la formula:** $\%\\,\\text{masa} = \\dfrac{\\text{masa del elemento}}{M} \\times 100$.',
      '**Redondea igual que las opciones** y verifica que la suma de todos los porcentajes del compuesto sea $100\%$.']},
 {k:'qui', re:/electronegativ|energía de ionización|radio atómico|carácter metálico/i, h:'periodicas',
  st:['**Reconoce que se pregunta por una propiedad periodica** (electronegatividad, radio, energia de ionizacion o caracter metalico).',
      '**Ubica los elementos en la tabla:** importa el periodo (fila) y el grupo (columna).',
      '**Aplica las tendencias:** hacia la derecha y hacia arriba aumentan la electronegatividad y la energia de ionizacion; hacia la izquierda y hacia abajo aumentan el radio y el caracter metalico.',
      '**Compara los candidatos** siguiendo esas flechas y descarta gases nobles cuando la pregunta trate de electronegatividad.',
      '**Recuerda el caso extremo:** el fluor es el elemento mas electronegativo y el cesio (entre los estables) el menos.']},
 {k:'qui', re:/cambio físico|cambio químico|se clasifica como|es un ejemplo de|mezcla|sustancia pura/i, h:'materia',
  st:['**Decide primero si la pregunta es de clasificacion de la materia o de tipo de cambio.**',
      '**Para clasificar materia:** sustancia pura si tiene composicion fija (elemento si es un solo tipo de atomo, compuesto si son varios unidos quimicamente); mezcla si se pueden separar sus componentes por medios fisicos.',
      '**Distingue mezcla homogenea** (una sola fase visible, como el agua de mar) **de heterogenea** (fases distinguibles).',
      '**Para tipos de cambio:** es fisico si no cambia la identidad de las sustancias (cambios de estado, disolucion) y es quimico si se forman sustancias nuevas (combustion, oxidacion, precipitacion).',
      '**Justifica con la evidencia del enunciado** antes de elegir la opción.']},
 {k:'fis', re:/trabajo realizado por (su )?peso|trabajo.*perpendicular|rapidez constante.*trabajo/i, h:'trabajo',
  st:['**Recuerda la definicion de trabajo:** $W = F\\,d\\,\\cos\\theta$, donde $\\theta$ es el angulo entre la fuerza y el desplazamiento.',
      '**Dibuja o imagina el vector fuerza y el vector desplazamiento** del caso descrito.',
      '**Mira el angulo entre ambos:** si son perpendiculares, $\\cos 90^{\\circ} = 0$ y el trabajo es nulo aunque la fuerza exista.',
      '**Interpreta el signo:** trabajo positivo si la fuerza favorece el movimiento y negativo si se opone (como el rozamiento).',
      '**Relaciona con la energia:** trabajo total nulo significa energia cinetica constante, es decir, rapidez constante.']},
 {k:'len', re:/ es a .* como /i, h:'analog',
  st:['**Detecta que es una analogia:** hay que descubrir la relacion del primer par y repetirla en el segundo.',
      '**Nombra la relacion con una frase corta:** agente y receptor, todo y parte, causa y efecto, objeto e instrumento, genero y especie.',
      '**Verifica la direccion:** si el primer par va de profesional a persona atendida, el segundo debe ir en el mismo orden.',
      '**Prueba cada opción en la frase relacion** y descarta las que solo comparten el tema pero no la relacion logica.',
      '**Elige la unica opción que conserva exactamente el tipo y el sentido de la relacion.**']},
 {k:'len', re:/acto comunicativo|el emisor|el canal|el receptor|el código|conjunto de circunstancias|contexto/i, h:'comunicac',
  st:['**Recuerda los elementos del acto comunicativo:** emisor, receptor, mensaje, codigo, canal, contexto y referente.',
      '**Emisor** es quien produce el mensaje; **receptor** es a quien va dirigido.',
      '**Canal** es el medio fisico o tecnologico por el que viaja el mensaje (aire, correo electronico, telefono); **codigo** es el sistema de signos (la lengua).',
      '**Contexto** es el conjunto de circunstancias de lugar, tiempo y situacion que rodean la comunicacion.',
      '**Lee de nuevo el enunciado subrayando la palabra clave** y asigna cada dato a su elemento antes de responder.']},
 {k:'len', re:/tema central|el texto se apoya|propósito del (autor|texto)|idea principal/i, h:'lectura',
  st:['**Distingue tema de idea principal:** el tema se resume en una frase nominal breve, la idea principal es la afirmacion completa que sostiene el autor.',
      '**Localiza la oracion tematica**, normalmente al inicio o al cierre de cada parrafo.',
      '**Descarta las opciones demasiado amplias** (abarcan mas de lo que dice el texto) **y las demasiado estrechas** (solo un detalle o un ejemplo).',
      '**Fijate en los conectores y en los recursos usados** (datos, citas de autoridad, ejemplos, analogias) cuando pregunten en que se apoya el texto.',
      '**Comprueba que la opción elegida se pueda sostener con evidencia literal del texto.**']},
 {k:'len', re:/significa que|la analogía|la expresión|constituye|«/i, h:'inferenc',
  st:['**Reconoce que se pide una inferencia o el sentido figurado** de una expresion, no su significado literal.',
      '**Relee la frase dentro de su parrafo** para recuperar el contexto inmediato.',
      '**Traduce la imagen a lenguaje llano:** que idea concreta del texto esta representando esa metafora o analogia.',
      '**Clasifica el tipo de enunciado cuando se pida:** hecho (verificable), opinion o juicio de valor, hipotesis o ejemplo.',
      '**Elige la opción que se deduce del texto** y descarta las que anaden información que el autor nunca afirma.']},
 /* ---- recetas adicionales 2 ---- */
 {k:'mat', re:/completar cuadrados|centro y el radio|circunferencia de ecuación/i, h:'circunferencia',
  st:['**Reconoce la ecuacion general de la circunferencia:** $x^{2}+y^{2}+Dx+Ey+F=0$.',
      '**Agrupa los terminos en $x$ por un lado y los de $y$ por otro**, y pasa el termino independiente a la derecha.',
      '**Completa cuadrados en cada grupo:** suma y resta el cuadrado de la mitad del coeficiente lineal, es decir $(D/2)^{2}$ y $(E/2)^{2}$.',
      '**Escribe la forma canonica** $(x-h)^{2}+(y-k)^{2}=r^{2}$: el centro es $(h,k)$ y el radio es la raiz del lado derecho.',
      '**Cuidado con los signos:** si aparece $(x+3)^{2}$ la coordenada del centro es $-3$; el radio siempre es positivo.']},
 {k:'mat', t:'Geometr', re:/en la figura|de la figura/i, h:'triangul',
  st:['**Observa la figura y anota todos los datos marcados:** lados iguales, angulos conocidos, paralelas y rectas que se cortan.',
      '**Recuerda los teoremas basicos:** los angulos interiores de un triangulo suman $180^{\\circ}$, los opuestos por el vertice son iguales y los suplementarios suman $180^{\\circ}$.',
      '**Busca triangulos congruentes o semejantes** (LAL, ALA, LLL para congruencia; AA para semejanza) y traslada los angulos o lados correspondientes.',
      '**Escribe la ecuacion que relaciona el dato pedido** con los valores conocidos y despeja.',
      '**Verifica la coherencia geometrica:** ningun angulo negativo ni mayor que $180^{\\circ}$, y el resultado debe encajar con la figura.']},
 {k:'qui', re:/número de moléculas|número de átomos|Avogadro/i, h:'mol',
  st:['**Identifica el dato de partida** (gramos, moles o numero de particulas) y lo que se pide.',
      '**Convierte gramos a moles** con $n = m/M$, donde $M$ es la masa molar dada.',
      '**Pasa de moles a particulas** multiplicando por el numero de Avogadro: $N = n \\times 6.022 \\times 10^{23}$.',
      '**Opera con notacion cientifica:** multiplica las mantisas y suma los exponentes.',
      '**Compara el orden de magnitud con las opciones**: el error tipico es fallar en una potencia de diez.']},
 {k:'qui', re:/número de moles|cuántos moles|masa molar/i, h:'mol',
  st:['**Reconoce que es una conversion masa - mol.**',
      '**Escribe la relacion basica:** $n = m/M$, con $m$ en gramos y $M$ en g/mol.',
      '**Sustituye los valores del enunciado** respetando las unidades.',
      '**Divide y redondea** al mismo numero de cifras que las opciones.',
      '**Comprueba con sentido comun:** si la masa es menor que la masa molar, el resultado debe ser menor que $1$ mol.']},
 {k:'qui', re:/gas ideal|condiciones normales|volumen molar|ley de conservación|ecuación balanceada|coeficientes/i, h:'estequiometr',
  st:['**Ubica la ley o la constante que gobierna el problema.**',
      '**Volumen molar:** un mol de gas ideal ocupa $22.4$ L a $0$ grados Celsius y $1$ atm (condiciones normales).',
      '**Conservacion de la masa:** los atomos no se crean ni se destruyen, por eso la masa de reactivos es igual a la de productos y la ecuacion debe estar balanceada.',
      '**Usa los coeficientes estequiometricos como proporcion de moles**, nunca de gramos.',
      '**Revisa unidades y balance** antes de escoger la opción.']},
 {k:'qui', re:/fuerza intermolecular|entre moléculas de|puente de hidrógeno|London|dipolo/i, h:'intermolecular',
  st:['**Determina primero la polaridad de la molecula:** dibuja su geometria y suma los momentos dipolares.',
      '**Si es apolar** (como el metano o el dioxido de carbono) solo actuan **fuerzas de dispersion de London**.',
      '**Si es polar sin H unido a N, O o F**, dominan las **interacciones dipolo - dipolo**.',
      '**Si tiene H unido a N, O o F** (como el agua), predomina el **puente de hidrogeno**, el mas intenso de los tres.',
      '**Relaciona la fuerza con las propiedades:** a mayor fuerza intermolecular, mayor punto de ebullicion.']},
 {k:'qui', re:/NO depende de la cantidad de materia|propiedad (intensiva|extensiva)|gases nobles/i, h:'materia',
  st:['**Clasifica la propiedad:** intensiva si no depende de la cantidad de materia (densidad, temperatura, punto de fusion) y extensiva si depende (masa, volumen, energia).',
      '**Truco practico:** divide la muestra en dos; lo que no cambia es intensivo.',
      '**Para estabilidad química:** los gases nobles son poco reactivos porque tienen el ultimo nivel completo con ocho electrones (dos en el helio).',
      '**Relaciona con la regla del octeto:** los demas elementos reaccionan para alcanzar esa configuración.',
      '**Descarta las opciones que confunden la causa con la consecuencia.**']},
 {k:'qui', re:/es un:|es un cambio|es una mezcla|se clasifica|el bronce|dióxido de carbono|fusión del hielo|oxidación de un clavo/i, h:'materia',
  st:['**Pregunta clave: cambia la identidad de las sustancias?**',
      '**Si no cambia** (cambios de estado, disolucion, trituracion) el cambio es **fisico**.',
      '**Si aparecen sustancias nuevas** (oxidacion, combustion, fermentacion) el cambio es **quimico**; suele haber cambio de color, gas, precipitado o energia.',
      '**Para clasificar materiales:** elemento (un solo tipo de atomo), compuesto (atomos distintos unidos quimicamente) o mezcla (aleaciones como el bronce, separables por medios fisicos).',
      '**Justifica la eleccion con la evidencia del enunciado.**']},
 {k:'fis', re:/inercia|se va hacia adelante|frena bruscamente|reposo o en movimiento/i, h:'inercia',
  st:['**Aplica la primera ley de Newton:** un cuerpo conserva su reposo o su movimiento rectilineo uniforme mientras no actue una fuerza neta.',
      '**Identifica el sistema de referencia:** el pasajero conserva su velocidad, es el bus el que cambia la suya.',
      '**Traduce la sensacion a física:** no hay una fuerza que empuje hacia adelante, es la inercia del cuerpo la que mantiene el movimiento.',
      '**Relaciona la inercia con la masa:** a mayor masa, mayor resistencia al cambio de velocidad.',
      '**Descarta las opciones que inventan fuerzas** sin un agente que las ejerza.']},
 {k:'fis', re:/tercera ley|atrae a la Tierra|acción y reacción|par de fuerzas/i, h:'tercera',
  st:['**Reconoce la tercera ley de Newton:** a toda accion corresponde una reaccion de igual magnitud y sentido contrario.',
      '**Identifica los dos cuerpos que interactuan** y escribe el par: la fuerza de A sobre B y la de B sobre A.',
      '**Ambas fuerzas tienen el mismo valor** aunque las masas sean muy distintas.',
      '**No sumes el par:** actuan sobre cuerpos diferentes, por eso nunca se cancelan entre si.',
      '**Explica la diferencia de efectos con la segunda ley:** $a = F/m$, la Tierra casi no se acelera por su enorme masa.']},
 {k:'fis', re:/teorema del trabajo|trabajo y la energía/i, h:'energia',
  st:['**Enuncia el teorema:** el trabajo neto sobre un cuerpo es igual a la variacion de su energia cinetica.',
      '**Escribe la energia cinetica inicial y final:** $E_{c} = m v^{2} / 2$.',
      '**Calcula la diferencia** entre la final y la inicial respetando los signos.',
      '**Interpreta:** trabajo positivo acelera, trabajo negativo frena y trabajo nulo mantiene la rapidez.',
      '**Verifica unidades:** el trabajo y la energia se miden en joules.']},
 {k:'len', re:/propósito principal|la actitud del autor|se puede inferir|tono del texto/i, h:'lectura',
  st:['**Distingue el nivel de lectura que se pide:** literal, inferencial o critico.',
      '**Para el proposito:** pregunta para que escribio el autor (informar, persuadir, narrar, instruir) y observa los verbos dominantes.',
      '**Para la actitud o el tono:** fijate en los adjetivos valorativos y en las expresiones de aprobacion o rechazo.',
      '**Para inferir:** combina dos o mas datos del texto; la respuesta se deduce, pero no aparece escrita tal cual.',
      '**Descarta opciones con información externa al texto o con matices exagerados.**']},
 {k:'len', re:/argumento es sólido|validez y verdad|premisa|falacia|silogismo|razonamiento/i, h:'logic',
  st:['**Separa la forma del contenido:** la validez depende de la estructura, la verdad depende de los hechos.',
      '**Un argumento es valido** cuando, si las premisas fueran verdaderas, la conclusion tendria que serlo tambien.',
      '**Un argumento es solido** cuando ademas de valido tiene todas sus premisas verdaderas.',
      '**Revisa la estructura:** identifica premisas y conclusion y comprueba si la conclusion se sigue realmente.',
      '**Detecta falacias frecuentes:** ataque personal, apelacion a la autoridad, generalizacion apresurada, falso dilema y causa falsa.']},
 {k:'len', re:/ruido en la comunicación|barrera comunicativa|retroalimentación/i, h:'comunicac',
  st:['**Recuerda el esquema de la comunicacion** y donde encaja cada elemento.',
      '**El ruido es cualquier interferencia** que distorsiona el mensaje entre el emisor y el receptor.',
      '**Clasifica el ruido:** fisico (sonidos, mala senal), fisiologico (cansancio), psicologico (prejuicios, distraccion) y semantico (palabras ambiguas).',
      '**La retroalimentacion es la respuesta del receptor** que permite comprobar si el mensaje se entendio.',
      '**Elige la opción que describa la interferencia**, no el canal ni el codigo.']},
 {k:'len', re:/dos puntos|coma|tilde|acentuación|ortograf|mayúscula|punto y coma|uso correcto/i, h:'ortograf',
  st:['**Identifica la regla que se evalua** (signo de puntuacion, tilde o uso de mayusculas).',
      '**Dos puntos:** anuncian una enumeracion, una cita textual o una explicacion; nunca van entre el verbo y su complemento directo.',
      '**Coma:** separa enumeraciones, incisos y vocativos; **punto y coma:** separa oraciones relacionadas o elementos que ya llevan comas.',
      '**Tildes:** agudas con tilde si terminan en vocal, n o s; graves si NO terminan en esas letras; esdrujulas siempre; y tilde diacritica en monosilabos que se oponen.',
      '**Lee cada opción en voz alta** y descarta las que rompan la regla revisada.']},
 {k:'len', re:/la tesis es|texto argumentativo|párrafo|coherencia|cohesión|conector|estructura del texto/i, h:'escrit',
  st:['**Reconoce el tipo de texto y su estructura:** introduccion, desarrollo y conclusion.',
      '**La tesis es la idea que el autor defiende** y que debe sostenerse con argumentos y evidencias.',
      '**Distingue tesis, tema y argumento:** el tema es de que se habla, la tesis es que se afirma y el argumento es por que se sostiene.',
      '**Coherencia** es la unidad de sentido del texto; **cohesion** es el uso de conectores, pronombres y sinonimos que enlazan las ideas.',
      '**Elige la opción que define con precision el elemento pedido** y descarta las que confunden dos conceptos cercanos.']},
 /* ---- respaldo general por materia: ninguna pregunta queda sin guia ---- */
 {k:'mat', re:/[\s\S]/, h:'',
  st:['**Lee el enunciado dos veces** y escribe con simbolos los datos y la incognita.',
      '**Reconoce el tema** (algebra, ecuaciones, geometria o trigonometria) y recuerda la formula clave de ese tema.',
      '**Plantea la ecuacion o la relacion** que conecta los datos con lo que se pide.',
      '**Resuelve paso a paso**, cuidando signos, parentesis y unidades.',
      '**Comprueba el resultado** sustituyendolo en el enunciado y contrastalo con las opciones.']},
 {k:'fis', re:/[\s\S]/, h:'',
  st:['**Haz un esquema de la situacion** con el sistema, las fuerzas y el sentido positivo elegido.',
      '**Anota datos y unidades en el sistema internacional** y escribe la incognita.',
      '**Elige la ley adecuada:** cinematica, leyes de Newton o conservacion de la energia.',
      '**Despeja simbolicamente antes de reemplazar numeros** para reducir errores.',
      '**Revisa magnitud, signo y unidades** del resultado y comprueba que sea fisicamente razonable.']},
 {k:'qui', re:/[\s\S]/, h:'',
  st:['**Lee el enunciado e identifica el tema:** estructura atomica, tabla periodica, enlace o estequiometria.',
      '**Escribe la formula, la configuración o la ecuacion balanceada** segun corresponda.',
      '**Aplica la relacion clave del tema** (numero de Avogadro, masa molar, regla del octeto o tendencias periodicas).',
      '**Opera con cuidado las unidades y la notacion cientifica.**',
      '**Contrasta el resultado con las opciones** y verifica que tenga sentido quimico.']},
 {k:'len', re:/[\s\S]/, h:'',
  st:['**Lee el enunciado y el texto completo antes de mirar las opciones.**',
      '**Subraya las palabras clave** que indican que se pide: tema, proposito, inferencia, elemento comunicativo o regla normativa.',
      '**Vuelve al texto a buscar la evidencia** que respalde tu respuesta.',
      '**Descarta por eliminacion:** opciones demasiado amplias, demasiado especificas o con datos que el texto no menciona.',
      '**Elige la unica opción sostenida por el texto o por la regla estudiada.**']}

];
function methodFor(src, subj){
  for(var i=0;i<METHODS.length;i++){
    var m = METHODS[i];
    if(m.k && m.k!==subj) continue;
    if(m.t && String(src.t).indexOf(m.t)<0) continue;
    if(m.re && !m.re.test(src.q||'')) continue;
    return m;
  }
  return null;
}
function theoryTarget(src, subj){
  var ch = chapterFor(subj==='gen'?'mat':subj, src.t);
  if(!ch) return null;
  var m = methodFor(src, subj), hint = (m && m.h) ? [].concat(normWords(m.h)) : [];
  var heads = [], mm;
  String(ch.body).split(String.fromCharCode(10)).forEach(function(L){ mm=/^##\s+(.*)$/.exec(L); if(mm) heads.push(mm[1]); });
  var best = null;
  if(hint.length){
    var words = hint.filter(function(w){ return String(w).length>3; });
    var bs = 0;
    heads.forEach(function(h){
      var nh = [].concat(normWords(h)).join(' '), sc = 0;
      words.forEach(function(w){ if(nh.indexOf(w)>=0) sc++; });
      if(sc>bs){ bs=sc; best=h; }
    });
  }
  return {id:ch.id, title:ch.t, ic:ch.ic, head:best, anchor: best? slugId(best):''};
}
function texStep(t){
  return tex(String(t)).replace(/\*\*([^*]+)\*\*/g,'<b>$1</b>');
}
function explainHtml(ix){
  var a = S.attempt, Q = a.qs[ix], src = Q.src, subj = Q.subj || (a.course==='mix'? Q.subj : a.course);
  if(subj==='mix') subj = 'mat';
  
  var cognitiveErrHtml = '';
  if(a.ans[ix] !== null && !isCorrect(ix) && Array.isArray(src.distractores) && src.distractores.length){
    var chosenOrigIx = Q.order[a.ans[ix]];
    var chosenText = src.o[chosenOrigIx];
    var matchDist = src.distractores.find(function(d){
      if(!d || !d.opt) return false;
      var cleanD = d.opt.replace(/^\$+|\$+$/g, '').trim();
      var cleanC = String(chosenText).replace(/^\$+|\$+$/g, '').trim();
      return cleanD === cleanC || d.opt === chosenText;
    });
    if(matchDist && matchDist.error){
      cognitiveErrHtml = '<div class="cognitive-err-box" style="margin:12px 0 10px; padding:12px 16px; background:#fff3cd; border-left:4px solid #d9822b; border-radius:6px; font-size:14px; color:#664d03;">'
        + '<div style="font-weight:700; display:flex; align-items:center; gap:6px;"><span>⚠️</span> Diagnóstico de tu error conceptual:</div>'
        + '<div style="margin-top:5px;">Tu respuesta seleccionada (' + tex(chosenText) + ') corresponde al error típico: <b>' + escH(matchDist.error) + '</b>.</div>'
        + '</div>';
    }
  }

  if(src.e){
    var expBody = inlineMd(src.e);
    var chLabel = src.ch ? (function(){ var b=(window.GUIA_THEORY||[]).find(function(c){return c.id===src.ch;}); return b? b.t : src.ch; })() : '';
    var theoryDeepLink = (src.theory && src.theory.concept_title) ? ('<div style="margin-top:10px;"><button class="btn ghost mini" data-act="go-theory-deep" data-ch="' + (src.theory.lesson_id || src.ch || 'mat-L01') + '" data-anchor="' + (src.theory.anchor || '') + '" data-qix="' + ix + '" style="border-color:#0f6cbf;color:#0f6cbf;font-weight:700;">📖 Estudiar concepto en la teoría: ' + escH(src.theory.concept_title) + '</button></div>') : '';
    var linkBtn = src.ch ? '<div class="solvelink" style="margin-top:14px;"><button class="btn primary" data-act="go-theory-deep" data-ch="'+src.ch+'" data-qix="'+ix+'">📖 Estudiar lección completa: '+(chLabel? escH(chLabel): src.ch)+'</button> <span style="font-size:12px; color:#5b6b7a; margin-left:6px;">Teoría autosuficiente — sin conocimientos previos</span></div>' : '';
    return '<div class="solvebox" style="border-left:4px solid #0078d4; background:#f4f8fc;"><div class="solvehead" style="color:#004578; font-weight:700; font-size:15px;">💡 Explicación pedagógica paso a paso (desde cero)</div>' + cognitiveErrHtml + '<div class="solvebody" style="font-size:14px; line-height:1.6; color:#242424; margin-top:8px;">'+expBody+'</div>' + theoryDeepLink + linkBtn + '</div>';
  }
  var m = methodFor(src, subj);
  var steps = (m? m.st.slice() : []);
  var body = '<div class="solvebox"><div class="solvehead">⚙ Cómo se resuelve, paso a paso</div><ol class="solvesteps">';
  steps.forEach(function(st){ body += '<li>'+texStep(st)+'</li>'; });
  if(src.s) body += '<li class="apply"><b>Aplicado a este ejercicio:</b> '+texStep(src.s)+'</li>';
  body += '<li class="final"><b>Respuesta correcta:</b> '+tex(src.o[src.a])+'</li>';
  body += '</ol>';
  var chosen = a.ans[ix];
  if(chosen!==null && !isCorrect(ix)){
    body += '<div class="yourans"><b>Tu respuesta fue:</b> '+tex(src.o[Q.order[chosen]])+
      '. Comparándola con los pasos de arriba, revisa dónde se desvió tu procedimiento (suele ser un signo, una unidad o un paso saltado).</div>';
  } else if(chosen===null){
    body += '<div class="yourans">No respondiste esta pregunta. Vuelve a intentarla cubriendo la respuesta y siguiendo los pasos.</div>';
  }
  var tt = theoryTarget(src, subj);
  if(tt){
    body += '<div class="solvelink"><button class="btn sec" data-act="chapter" data-id="'+tt.id+'" data-h="'+tt.anchor+'">'+
      tt.ic+' Estudiar la teoría: '+escH(tt.title)+(tt.head? ' › '+escH(tt.head.replace(/^\d+\.\s*/,'')) : '')+'</button></div>';
  }
  return body+'</div>';
}
function questionHtml(ix, mode){
  var a = S.attempt, Q = a.qs[ix], src = Q.src;
  var review = (mode==='review');
  var correct = isCorrect(ix);
  var topic = (a.course==='mix'? COURSES[Q.subj].short+' \u00b7 ':'')+src.t;
  var info = '<div class="info">'+
    '<h3>Pregunta <span>'+(ix+1)+'</span></h3>'+
    '<div class="state">'+(review? (a.ans[ix]===null?'Sin responder':(correct?'Correcta':'Incorrecta')) : 'Sin responder a\u00fan')+'</div>'+
    '<div class="grade">'+(review?('Se punt\u00faa '+fmtNum(correct?1:0)+' sobre '+fmtNum(1)) : 'Se punt\u00faa cómo '+fmtNum(1))+'</div>'+
    '<div class="topic">'+escH(topic)+'<br>'+levelName(src.d)+'</div>'+
    (review? '' : '<button class="flag'+(a.flags[ix]?' on':'')+'" data-act="flag" data-i="'+ix+'">\u2691 <u>'+(a.flags[ix]?'Quitar marca':'Marcar pregunta')+'</u></button>')+
    '</div>';
  var body = '';
  if(src.stem) body += '<div class="stembox">'+tex(src.stem)+'</div>';
  body += '<div class="qtext">'+tex(src.q)+'</div>';
  if(src.fig) body += figHtml(src.fig);
  if(src.imgs && src.imgs.length){ src.imgs.forEach(function(svg){ body += '<div class="figure">'+svg+'</div>'; }); }
  if(src.q2) body += '<div class="qtext">'+tex(src.q2)+'</div>';
  body += '<div class="answer">'+Q.order.map(function(origIx, pos){
    var checked = a.ans[ix]===pos, cls = 'option';
    if(review){ if(origIx===src.a) cls += ' correctopt'; else if(checked) cls += ' wrongopt'; }
    return '<label class="'+cls+'">'+
      '<input type="radio" name="q'+ix+'" '+(checked?'checked':'')+' '+(review?'disabled':'')+' data-act="answer" data-i="'+ix+'" data-p="'+pos+'">'+
      '<span class="optlabel">'+LETTERS[pos]+'.</span>'+
      '<span class="opttext">'+tex(src.o[origIx])+'</span></label>';
  }).join('')+'</div>';
  if(review && cfg.showFeedback){
    body += '<div class="feedback">'+
      (a.ans[ix]===null? '<div class="wrong">No respondi\u00f3 esta pregunta.</div>' : (correct?'<div class="right">Respuesta correcta</div>':'<div class="wrong">Respuesta incorrecta</div>'))+
      '</div>'+explainHtml(ix);
  }
  return '<div class="que" id="q-'+ix+'">'+info+'<div class="content">'+body+'</div></div>';
}

/* ---------- estadísticas ---------- */
function liveHist(){ return HIST.filter(function(r){ return !r.deleted; }); }
function recPct(r){ return Math.round(r.score/r.n*100); }
function statsFor(k){
  var live = liveHist();
  var rs = k==='all'? live : live.filter(function(r){ return r.course===k; });
  var totQ=0, totOk=0, totMs=0, byTopic={}, bySubj={};
  var isG1000Stats = GUIA_COURSES.indexOf(k)>=0;
  var bank1000ForStats = window.GUIA_BANK_1000 || {mat:[],fis:[],qui:[],len:[]};
  var g1000ById={}; if(isG1000Stats){ ['mat','fis','qui','len'].forEach(function(sub){ (bank1000ForStats[sub]||[]).forEach(function(q){ g1000ById[q.id]=q; }); }); }
  live.forEach(function(r){
    r.qs.forEach(function(x){
      if(k!=='all' && k!=='mix' && x.k!==k) return;
      if(k==='mix' && r.course!=='mix') return;
      var src;
      if(x.id && g1000ById[x.id]) src = g1000ById[x.id];
      else src = BANK[x.k] && BANK[x.k][x.i];
      if(!src) return;
      var srcAns = (src.a!=null? src.a : src.ans);
      var ok = (x.sel===srcAns);
      totQ++; if(ok) totOk++;
      var tk = (COURSES[x.k]? COURSES[x.k].short : x.k)+' \u00b7 '+(src.t||src.topics&&src.topics[0]||'');
      byTopic[tk] = byTopic[tk] || {ok:0,n:0}; byTopic[tk].n++; if(ok) byTopic[tk].ok++;
      bySubj[x.k] = bySubj[x.k] || {ok:0,n:0}; bySubj[x.k].n++; if(ok) bySubj[x.k].ok++;
    });
  });
  rs.forEach(function(r){ totMs += r.durMs; });
  var pcts = rs.map(recPct);
  return {attempts:rs.length, totQ:totQ, totOk:totOk, totMs:totMs, byTopic:byTopic, bySubj:bySubj,
    avg: pcts.length? Math.round(pcts.reduce(function(a,b){return a+b;},0)/pcts.length):0,
    best: pcts.length? Math.max.apply(null,pcts):0, recs:rs};
}
function sparkline(recs){
  if(recs.length<2) return '';
  var pts = recs.slice().sort(function(a,b){return a.ts-b.ts;}).map(recPct);
  var W=640, H=170, pad=30, n=pts.length;
  var x = function(i){ return pad + (W-2*pad) * (n===1?0.5:i/(n-1)); };
  var y = function(v){ return H-pad - (H-2*pad) * (v/100); };
  var line = pts.map(function(v,i){ return (i?'L':'M')+x(i).toFixed(1)+' '+y(v).toFixed(1); }).join(' ');
  var dots = pts.map(function(v,i){ return '<circle cx="'+x(i).toFixed(1)+'" cy="'+y(v).toFixed(1)+'" r="3.5" fill="#0f6cbf"><title>'+v+'%</title></circle>'; }).join('');
  var grid = [0,25,50,75,100].map(function(v){ return '<line x1="'+pad+'" y1="'+y(v)+'" x2="'+(W-pad)+'" y2="'+y(v)+'" stroke="#e9ecef"/><text x="'+(pad-6)+'" y="'+(y(v)+4)+'" font-size="10" fill="#8a949c" text-anchor="end">'+v+'</text>'; }).join('');
  return '<div class="spark"><svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'">'+grid+
    '<path d="'+line+'" fill="none" stroke="#0f6cbf" stroke-width="2"/>'+dots+
    '<text x="'+pad+'" y="'+(H-8)+'" font-size="10" fill="#8a949c">primer intento</text>'+
    '<text x="'+(W-pad)+'" y="'+(H-8)+'" font-size="10" fill="#8a949c" text-anchor="end">\u00faltimo intento</text>'+
    '</svg></div>';
}
function barChart(items){
  // items: [{label, pct, n}]
  if(!items.length) return '';
  var W=640, rowH=34, H=items.length*rowH+16, lab=118, x0=lab+8, x1=W-56;
  var rows = items.map(function(it,i){
    var y = 10+i*rowH, w = (x1-x0)*(it.pct/100);
    var col = it.pct>=70?'#1f7a3f':(it.pct>=50?'#d9822b':'#b3261e');
    return '<text x="'+lab+'" y="'+(y+15)+'" font-size="12" fill="#3d4b57" text-anchor="end">'+escH(it.label)+'</text>'+
      '<rect x="'+x0+'" y="'+(y+3)+'" width="'+(x1-x0)+'" height="15" rx="7" fill="#eef1f4"/>'+
      '<rect x="'+x0+'" y="'+(y+3)+'" width="'+w.toFixed(1)+'" height="15" rx="7" fill="'+col+'"><title>'+it.pct+'%</title></rect>'+
      '<text x="'+(x1+8)+'" y="'+(y+15)+'" font-size="12" fill="#3d4b57">'+it.pct+'%</text>'+
      (it.n!=null? '<text x="'+x0+'" y="'+(y+30)+'" font-size="10" fill="#9aa4ad">'+it.n+' preguntas</text>':'');
  }).join('');
  return '<div class="spark"><svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'">'+rows+'</svg></div>';
}
function donut(pct, label){
  var R=54, C=2*Math.PI*R, on=C*(pct/100);
  var col = pct>=70?'#1f7a3f':(pct>=50?'#d9822b':'#b3261e');
  return '<svg viewBox="0 0 140 140" width="140" height="140">'+
    '<circle cx="70" cy="70" r="'+R+'" fill="none" stroke="#eef1f4" stroke-width="16"/>'+
    '<circle cx="70" cy="70" r="'+R+'" fill="none" stroke="'+col+'" stroke-width="16" stroke-linecap="round" stroke-dasharray="'+on.toFixed(1)+' '+C.toFixed(1)+'" transform="rotate(-90 70 70)"/>'+
    '<text x="70" y="72" text-anchor="middle" font-size="26" font-weight="700" fill="#0e2a47">'+pct+'%</text>'+
    '<text x="70" y="92" text-anchor="middle" font-size="11" fill="#6c757d">'+escH(label)+'</text></svg>';
}
function donutRow(){
  var st = statsFor('all');
  var cells = SUBJ.map(function(k){
    var b = st.bySubj[k];
    var pct = b? Math.round(b.ok/b.n*100) : 0;
    return '<div style="text-align:center">'+donut(pct, COURSES[k].short)+'<div style="font-size:12px;color:#6c757d">'+(b? b.ok+'/'+b.n+' aciertos':'sin datos')+'</div></div>';
  }).join('');
  return '<div class="spark" style="display:flex;gap:10px;justify-content:space-around;flex-wrap:wrap">'+cells+'</div>';
}
function coverageHtml(){
  var bank1000 = window.GUIA_BANK_1000 || {mat:[],fis:[],qui:[],len:[]};
  var guiaRow = '';
  if(bank1000.mat.length){
    var seen1000Tot = SEEN1000.mat.length + SEEN1000.fis.length + SEEN1000.qui.length + SEEN1000.len.length;
    var tot1000 = bank1000.mat.length + bank1000.fis.length + bank1000.qui.length + bank1000.len.length;
    var pct1000 = tot1000? Math.round(seen1000Tot/tot1000*100):0;
    guiaRow = '<tr style="background:#f0f7ff;"><td><b>Guía 1000</b> (4 materias)</td><td>'+seen1000Tot+' / '+tot1000+'</td><td>'+pct1000+'%<div class="covbar"><span style="width:'+pct1000+'%;background:#0e2a47"></span></div></td></tr>';
  }
  return '<table class="histtable"><thead><tr><th>Materia</th><th>Preguntas vistas</th><th>Cobertura del banco</th></tr></thead><tbody>'+
    guiaRow+
    SUBJ.map(function(k){
      var seen = SEEN[k].length, tot = BANK[k].length, pct = tot? Math.round(seen/tot*100):0;
      return '<tr><td>'+COURSES[k].short+'</td><td>'+seen+' / '+tot+'</td><td>'+pct+'%<div class="covbar"><span style="width:'+pct+'%"></span></div></td></tr>';
    }).join('')+'</tbody></table>';
}
function topicStats(){
  var map={}, order=[];
  SUBJ.forEach(function(k){ BANK[k].forEach(function(q){
    var key=k+'|'+q.t;
    if(!map[key]){ map[key]={k:k,t:q.t,bank:0,n:0,ok:0,last:null}; order.push(map[key]); }
    map[key].bank++;
  }); });
  liveHist().forEach(function(r){ r.qs.forEach(function(x){
    var src=BANK[x.k] && BANK[x.k][x.i]; if(!src) return;
    var e=map[x.k+'|'+src.t]; if(!e) return;
    e.n++; if(x.sel===src.a) e.ok++;
    if(!e.last || r.ts>e.last) e.last=r.ts;
  }); });
  return order;
}
function normWords(s){
  return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .split(/[^a-z0-9]+/).filter(function(w){ return w.length>3 && ['para','cómo','entre','sobre','desde','cada','todo','todos'].indexOf(w)<0; });
}
function chapterFor(k, topic){
  var book = theoryBook();
  var chs=book.filter(function(c){ return c.s===k; });
  if(!chs.length) return book[0];
  var tw=normWords(topic), best=chs[0], bestScore=-1;
  chs.forEach(function(c){
    var title=normWords(c.t), cw=normWords(c.t+' '+c.body.slice(0,900)), sc=0;
    tw.forEach(function(w){ if(title.indexOf(w)>=0) sc+=3; else if(cw.indexOf(w)>=0) sc+=1; });
    if(sc>bestScore){ bestScore=sc; best=c; }
  });
  return best;
}
function masteryState(e){
  if(!e.n) return {k:'none', label:'Sin practicar', color:'#98a2ab'};
  var a=e.ok/e.n;
  if(e.n<4) return {k:'few', label:'Poca practica', color:'#7b8794'};
  if(a>=0.85) return {k:'ok', label:'Dominado', color:'#1f7a3f'};
  if(a>=0.6) return {k:'mid', label:'En progreso', color:'#d9822b'};
  return {k:'bad', label:'Debil', color:'#b3261e'};
}
function priorities(){
  var all=topicStats(), totalBank=SUBJ.reduce(function(s,k){ return s+BANK[k].length; },0);
  all.forEach(function(e){
    e.acc = e.n? e.ok/e.n : null;
    e.weight = e.bank/totalBank;
    var est = (e.acc==null)? 0.5 : e.acc;
    var conf = Math.min(1, e.n/6);
    e.gap = 1-est;
    e.impact = e.gap * (e.weight*100);
    e.score = e.impact * (1 + (1-conf)*0.35);
    e.st = masteryState(e);
  });
  return all.sort(function(a,b){ return b.score-a.score; });
}
function subjectRow(k){
  var rs = liveHist().filter(function(r){ return r.course===k; }).sort(function(a,b){ return a.ts-b.ts; });
  var mixQ = {n:0, ok:0};
  liveHist().forEach(function(r){ if(r.course!=='mix') return; r.qs.forEach(function(x){ if(x.k!==k) return; var src=BANK[x.k][x.i]; if(!src) return; mixQ.n++; if(x.sel===src.a) mixQ.ok++; }); });
  var pcts = rs.map(recPct);
  var avg = pcts.length? Math.round(pcts.reduce(function(a,b){return a+b;},0)/pcts.length) : null;
  var last = pcts.length? pcts[pcts.length-1] : null;
  var prev = pcts.length>1? Math.round(pcts.slice(0,-1).reduce(function(a,b){return a+b;},0)/(pcts.length-1)) : null;
  var trend = (last!=null && prev!=null)? last-prev : null;
  return {k:k, attempts:rs.length, avg:avg, best:pcts.length? Math.max.apply(null,pcts):null, last:last, trend:trend, mix:mixQ};
}
function trendHtml(t){
  if(t==null) return '<span style="color:#98a2ab">\u2014</span>';
  if(t>1) return '<span style="color:#1f7a3f;font-weight:700">\u2191 +'+t+'</span>';
  if(t<-1) return '<span style="color:#b3261e;font-weight:700">\u2193 '+t+'</span>';
  return '<span style="color:#6c757d">\u2192 estable</span>';
}
function streakDays(){
  var days={};
  liveHist().forEach(function(r){ var d=new Date(r.ts); days[d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate()]=1; });
  var cur=new Date(), n=0;
  var key0=cur.getFullYear()+'-'+cur.getMonth()+'-'+cur.getDate();
  if(!days[key0]) cur.setDate(cur.getDate()-1);
  for(var i=0;i<400;i++){
    var key=cur.getFullYear()+'-'+cur.getMonth()+'-'+cur.getDate();
    if(!days[key]) break;
    n++; cur.setDate(cur.getDate()-1);
  }
  return n;
}
function recoCard(e, rank){
  var ch = chapterFor(e.k, e.t);
  var motivo = e.n===0
    ? 'Todavia no practicas este tema y representa el '+Math.round(e.weight*1000)/10+'% del banco: son puntos qué hoy dejas al azar.'
    : 'Aciertas el '+Math.round(e.acc*100)+'% ('+e.ok+' de '+e.n+') y el tema pesa el '+Math.round(e.weight*1000)/10+'% del banco. Llevarlo al 85% suma cerca de '+(Math.round(Math.max(0,(0.85-e.acc))*e.weight*1000)/10)+' puntos porcentuales a tu nota global.';
  return '<div class="reco">'+
    '<div class="rank">'+rank+'</div>'+
    '<div class="recobody"><b>'+escH(e.t)+'</b> '+
    '<span class="chip" style="background:'+e.st.color+'">'+e.st.label+'</span> '+
    '<span class="chip light">'+COURSES[e.k].short+'</span>'+
    '<p>'+motivo+'</p>'+
    '<div class="recobtns"><button class="btn" data-act="chapter" data-id="'+ch.id+'">Estudiar: '+escH(ch.t)+'</button>'+
    '<button class="btn sec" data-act="quickstart" data-c="'+e.k+'">Practicar '+COURSES[e.k].short+'</button></div>'+
    '</div></div>';
}
function viewStats(){
  var st = statsFor('all'), live = liveHist();
  var pri = priorities();
  var rows = SUBJ.concat(['mix']).map(subjectRow);
  var globalAcc = st.totQ? Math.round(st.totOk/st.totQ*100) : 0;
  var body = '';

  if(!live.length){
    body += '<div class="emptybox">Todavia no hay intentos validos.<br>Rinde tu primer simulador y aqui apareceran tu promedio, tus temas debiles y qué estudiar después.<br><br><button class="btn" data-act="quickstart" data-c="mat">Empezar Matemática</button></div>';
  } else {
    body += '<div class="herostats">'+
      '<div class="bigdonut">'+donut(globalAcc,'precision global')+'</div>'+
      '<div class="statgrid grow">'+
      '<div class="statcard"><div class="v">'+st.avg+'%</div><div class="l">Promedio de simuladores</div></div>'+
      '<div class="statcard"><div class="v">'+st.best+'%</div><div class="l">Mejor calificación</div></div>'+
      '<div class="statcard"><div class="v">'+live.length+'</div><div class="l">Simuladores rendidos</div></div>'+
      '<div class="statcard"><div class="v">'+st.totQ+'</div><div class="l">Preguntas respondidas</div></div>'+
      '<div class="statcard"><div class="v">'+Math.round(st.totMs/60000)+'</div><div class="l">Minutos de practica</div></div>'+
      '<div class="statcard"><div class="v">'+streakDays()+'</div><div class="l">Dias seguidos practicando</div></div>'+
      '</div></div>';
  }

  var top = pri.slice(0,3);
  body += '<h3 class="sechead">Qué estudiar ahora (maxima mejora en menos tiempo)</h3>'+
    '<p class="th-sub">Prioridad = cuánto fallas en el tema x cuánto pesa ese tema en el examen. Siguiendo este orden tu nota sube lo mas rapido posible; al terminar la lista habras cubierto todos los temas de la guia.</p>'+
    top.map(function(e,i){ return recoCard(e,i+1); }).join('');

  body += '<details class="planbox"><summary>Plan completo hasta dominar los '+pri.length+' temas de la guia</summary>'+
    '<ol class="planlist">'+pri.map(function(e){
      var ch = chapterFor(e.k,e.t);
      return '<li><b>'+escH(e.t)+'</b> <span class="chip light">'+COURSES[e.k].short+'</span> '+
        '<span class="chip" style="background:'+e.st.color+'">'+e.st.label+'</span> '+
        (e.n? Math.round(e.acc*100)+'% en '+e.n+' preguntas' : 'sin datos aun')+
        ' &middot; <a data-act="chapter" data-id="'+ch.id+'">leer teoría</a></li>';
    }).join('')+'</ol></details>';

  body += '<h3 class="sechead">Promedio por simulador</h3>'+
    '<table class="histtable"><thead><tr><th>Simulador</th><th>Intentos</th><th>Promedio</th><th>Mejor</th><th>Ultimo</th><th>Tendencia</th></tr></thead><tbody>'+
    rows.map(function(r){
      return '<tr><td>'+COURSES[r.k].name+'</td><td>'+r.attempts+'</td>'+
        '<td>'+(r.avg==null?'\u2014':'<span class="gradepill '+gradeCls(r.avg)+'">'+r.avg+'%</span>')+'</td>'+
        '<td>'+(r.best==null?'\u2014':r.best+'%')+'</td>'+
        '<td>'+(r.last==null?'\u2014':r.last+'%')+'</td>'+
        '<td>'+trendHtml(r.trend)+'</td></tr>';
    }).join('')+'</tbody></table>';

  body += '<h3 class="sechead">Precision por materia (incluye las preguntas del simulacro completo)</h3>'+donutRow()+
    barChart(SUBJ.filter(function(k){ return st.bySubj[k]; }).map(function(k){
      var b=st.bySubj[k]; return {label:COURSES[k].short, pct:Math.round(b.ok/b.n*100), n:b.n};
    }));

  body += '<h3 class="sechead">Evolucion de tus calificaciones</h3>'+
    (sparkline(live) || '<p class="th-sub">Necesitas al menos dos intentos para ver la curva de progreso.</p>');
  var perSubj = SUBJ.filter(function(k){ return live.filter(function(r){return r.course===k;}).length>1; });
  if(perSubj.length){
    body += '<div class="minicharts">'+perSubj.map(function(k){
      return '<div class="minichart"><b>'+COURSES[k].short+'</b>'+sparkline(live.filter(function(r){return r.course===k;}))+'</div>';
    }).join('')+'</div>';
  }

  body += '<h3 class="sechead">Dominio tema por tema</h3>'+
    '<p class="th-sub">Verde = dominado (85% o mas), naranja = en progreso, rojo = debil, gris = sin practicar todavia.</p>';
  SUBJ.forEach(function(k){
    var list = pri.filter(function(e){ return e.k===k; }).sort(function(a,b){
      var aa=(a.acc==null?-1:a.acc), bb=(b.acc==null?-1:b.acc); return aa-bb;
    });
    var done = list.filter(function(e){ return e.st.k==='ok'; }).length;
    body += '<details class="topicbox"'+(k==='mat'?' open':'')+'><summary>'+COURSES[k].name+' \u2014 '+done+'/'+list.length+' temas dominados</summary>'+
      '<table class="histtable"><thead><tr><th>Tema</th><th>Practicadas</th><th>Aciertos</th><th>Estado</th><th></th></tr></thead><tbody>'+
      list.map(function(e){
        var ch = chapterFor(e.k,e.t);
        return '<tr><td>'+escH(e.t)+'</td><td>'+e.n+' / '+e.bank+'</td>'+
          '<td>'+(e.n? '<span class="gradepill '+gradeCls(Math.round(e.acc*100))+'">'+Math.round(e.acc*100)+'%</span>' : '\u2014')+'</td>'+
          '<td><span class="chip" style="background:'+e.st.color+'">'+e.st.label+'</span></td>'+
          '<td><a data-act="chapter" data-id="'+ch.id+'">Estudiar</a></td></tr>';
      }).join('')+'</tbody></table></details>';
  });

  body += '<h3 class="sechead">Cobertura del banco de preguntas</h3>'+
    '<p class="th-sub">Con el modo sin repetir preguntas activo, cada intento usa preguntas nuevas hasta agotar el banco.</p>'+
    coverageHtml()+
    '<div style="margin:10px 0 24px;display:flex;gap:10px;flex-wrap:wrap"><button class="btn sec" data-act="history">Ver historial de intentos</button>'+
    '<button class="btn ghost" data-act="resetseen">Reiniciar preguntas vistas</button></div>';

  return navbar('stats')+'<div class="wrap">'+drawer('stats')+'<div class="main reading">'+
    pagehead('Estadísticas y plan de estudio','01-SEA-EPN_2026-2 \u203a Estadísticas','mix')+toastHtml()+body+
    '</div></div>'+drawerBtn()+sitefooter();
}

/* ---------- historial ---------- */
function viewHistory(){
  var tab = S.histTab, tabs = [['all','General']].concat(CKEYS.map(function(k){ return [k, COURSES[k].short]; }));
  var base = HIST.filter(function(r){ return tab==='all' || r.course===tab; });
  var live = base.filter(function(r){ return !r.deleted; }).slice().sort(function(a,b){ return b.ts-a.ts; });
  var del  = base.filter(function(r){ return r.deleted; }).slice().sort(function(a,b){ return b.ts-a.ts; });
  function rowsOf(list, isDel){
    return list.map(function(r){
      var pct = recPct(r);
      return '<tr'+(isDel?' class="delrow"':'')+'><td>'+fmtCorta(r.ts)+(isDel?' <span class="delbadge">Eliminado</span>':'')+'</td>'+
        '<td>'+COURSES[r.course].name+'</td><td>'+levelName(r.level)+'</td><td>'+fmtDur(r.durMs)+'</td>'+
        '<td>'+r.score+'/'+r.n+' <span class="gradepill '+(isDel?'g-del':gradeCls(pct))+'">'+pct+'%</span></td>'+
        '<td><button class="btn sec" data-act="openrec" data-id="'+r.id+'">Revisar</button> '+
        (isDel? '<button class="btn ghost" data-act="restrec" data-id="'+r.id+'">Restaurar</button>'
              : '<button class="btn ghost" data-act="delrec" data-id="'+r.id+'">Eliminar</button>')+
        '</td></tr>';
    }).join('');
  }
  var thead = '<thead><tr><th>Fecha</th><th>Simulador</th><th>Dificultad</th><th>Tiempo</th><th>Resultado</th><th></th></tr></thead>';
  var table = live.length? '<table class="histtable">'+thead+'<tbody>'+rowsOf(live,false)+'</tbody></table>'
    : '<div class="emptybox">A\u00fan no hay intentos'+(tab==='all'?'':' de '+COURSES[tab].name)+' activos en el historial.</div>';
  var deleted = del.length? '<h3 style="font-size:17px;margin:22px 0 4px">Intentos eliminados</h3>'+
    '<p class="th-sub">No cuentan para las estad\u00edsticas, pero puedes seguir revis\u00e1ndolos o restaurarlos.</p>'+
    '<table class="histtable">'+thead+'<tbody>'+rowsOf(del,true)+'</tbody></table>' : '';
  var pcts = live.map(recPct);
  var resumen = live.length? '<div class="statgrid">'+
      '<div class="statcard"><div class="v">'+live.length+'</div><div class="l">Intentos v\u00e1lidos</div></div>'+
      '<div class="statcard"><div class="v">'+Math.round(pcts.reduce(function(a,b){return a+b;},0)/pcts.length)+'%</div><div class="l">Promedio</div></div>'+
      '<div class="statcard"><div class="v">'+Math.max.apply(null,pcts)+'%</div><div class="l">Mejor nota</div></div>'+
      '<div class="statcard"><div class="v">'+fmtCorta(live[0].ts).split(' ')[0]+'</div><div class="l">\u00daltima pr\u00e1ctica</div></div>'+
      '</div>'+sparkline(live) : '';
  return navbar('history')+'<div class="wrap">'+drawer('history')+'<div class="main reading">'+
    pagehead('Historial de intentos','01-SEA-EPN_2026-2 \u203a Historial','mix')+toastHtml()+
    '<div class="tabs">'+tabs.map(function(t){ return '<button class="'+(tab===t[0]?'on':'')+'" data-act="histtab" data-t="'+t[0]+'">'+t[1]+'</button>'; }).join('')+'</div>'+
    resumen+table+deleted+
    (HIST.length? '<div style="margin:6px 0 22px;display:flex;gap:10px;flex-wrap:wrap"><button class="btn sec" data-act="stats">Ver estad\u00edsticas</button>'+
      '<button class="btn ghost" data-act="clearhist">Eliminar todos los intentos</button></div>':'')+
    '</div></div>'+drawerBtn()+sitefooter();
}

/* ---------- VISTAS ---------- */
function viewGuiaHome(){
  var book = theoryBook();
  var thcards = guiaLearnOrder().map(function(k){
    var chs = book.filter(function(ch){ return ch.s===k; });
    if(!chs.length) return '';
    var g = GUIDE[k];
    var inner = chs.map(function(ch){
      var st = chapterProgress(ch.id);
      return '<div class="th-card" data-act="chapter" data-id="'+ch.id+'"><div class="ic">'+ch.ic+'</div>'+
        '<div><b>'+escH(ch.t)+'</b><span>'+((g.secs[ch.id]||{}).code||'')+' \u00b7 '+st+'</span></div></div>';
    }).join('');
    return '<div class="thgroup"><div class="thgh"><span class="thdot" style="background:'+g.color+'"></span>'+
      '<b>'+g.code+' '+escH(g.name)+'</b><span class="thgn">'+chs.length+' cap\u00edtulo'+(chs.length>1?'s':'')+'</span>'+
      '</div><div class="th-list">'+inner+'</div></div>';
  }).join('');
  var ws = GUIA_WORKSHOPS.map(function(block){
    var g = GUIDE[block.k];
    var cards = block.items.map(function(it){
      return '<div class="gcard guia-soon" data-act="guiaplaceholder" data-id="'+it.id+'">'+
        '<div class="gtop"><span class="gic">\u23F3</span><div><div class="gcode">'+it.code+'</div>'+
        '<div class="gt">'+escH(it.t)+'</div></div></div>'+
        '<p class="th-sub" style="margin:8px 0 0">Taller / simulador por tema \u2014 <b>pr\u00f3ximamente</b>. La teor\u00eda ya est\u00e1 en Aprender.</p>'+
        '<div class="gmeta"><span class="soon-pill">Scaffold listo</span></div></div>';
    }).join('');
    return '<div class="subjhead"><span class="bar" style="background:'+g.color+'"></span><h2>'+block.code+'. '+escH(block.title)+'</h2>'+
      '<span class="cnt">Estructura vac\u00eda lista para cablear bancos</span></div><div class="gcards">'+cards+'</div>';
  }).join('');
  return navbar('home')+
    '<div class="homehero guia-hero"><h2>Gu\u00eda oficial EPN 2026-B</h2>'+
    '<p>Temario exacto del examen de admisi\u00f3n \u00b7 Matem\u00e1tica, F\u00edsica, Qu\u00edmica y Lenguaje \u00b7 \u00c1rea paralela (no altera el aula Barreno)</p>'+
    '<div class="stats"><div><b>'+book.length+'</b><span>CAP\u00cdTULOS APRENDER</span></div>'+
    '<div><b>4</b><span>\u00c1REAS OFICIALES</span></div>'+
    '<div><b>'+GUIA_WORKSHOPS.reduce(function(s,b){return s+b.items.length;},0)+'</b><span>TALLERES (PLACEHOLDER)</span></div>'+
    '<div><b>210</b><span>MINUTOS EXAMEN REAL</span></div></div></div>'+
    '<div style="padding:0 26px 40px">'+toastHtml()+
        '<div class="guia-sim-hero-card" style="background: linear-gradient(135deg, #0e2a47 0%, #005a9e 100%); color:#fff; padding:22px; border-radius:12px; margin:20px 0 26px; box-shadow:0 4px 14px rgba(0,0,0,0.12);">'+
    '<div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">'+
    '<div><span style="background:#ffb900; color:#000; font-weight:800; padding:3px 10px; border-radius:20px; font-size:12px; text-transform:uppercase;">⚡ Examen Oficial Resuelto</span>'+
    '<h3 style="font-size:22px; margin:8px 0 4px; color:#fff;">Simulador Completo EPN — 69 Preguntas Oficiales</h3>'+
    '<p style="margin:0; opacity:0.9; font-size:14px; max-width:650px;">Matemáticas (Q02-Q19), Lenguaje (Q20-Q32), Física (Q33-Q50) y Química (Q51-Q70). Incluye explicaciones paso a paso desde cero e hipervínculos directos a la teoría del Aula Guía.</p></div>'+
    '<button class="btn primary xl" data-act="start-guia-69" style="background:#ffb900; color:#000; font-weight:bold; font-size:16px; padding:12px 24px; border:none; border-radius:8px; cursor:pointer;">Iniciar Examen Completo (69P)</button>'+
    '</div></div>'+
    (function(){
      var banco = (window.GUIA_BANK_1000 && window.GUIA_BANK_1000.mat) ? window.GUIA_BANK_1000 : null;
      var tot1000 = banco ? (banco.mat.length + banco.fis.length + banco.qui.length + banco.len.length) : 0;
      var seenTot = SEEN1000.mat.length + SEEN1000.fis.length + SEEN1000.qui.length + SEEN1000.len.length;
      var pct1000 = tot1000 ? Math.round(seenTot/tot1000*100) : 0;
      var sims = [
        {course:'guia_mat30', title:'Matemáticas — Día 1', sub:'30 preg · 90 min · 14 temas 4.1 · Filtro real', color:'#d62828', icon:'🧮'},
        {course:'guia_fql120', title:'Combinado F-Q-L — Día 2', sub:'60 preg (20+20+20) · 120 min · Intercalado', color:'#0e2a47', icon:'🧪'},
        {course:'guia_fis', title:'Física individual', sub:'20 preg · 40 min · 15 temas 4.2', color:'#2a9d8f', icon:'⚙️'},
        {course:'guia_qui', title:'Química individual', sub:'20 preg · 40 min · 16 temas 4.3', color:'#6a994e', icon:'⚗️'},
        {course:'guia_len', title:'Lenguaje individual', sub:'20 preg · 40 min · 9 temas 4.4', color:'#e9c46a', icon:'📝'}
      ];
      var avail = tot1000>=1000;
      var banner1000 = '<div style="background:#fff; border:1.5px solid #0e2a47; border-radius:12px; padding:18px 22px; margin:0 0 26px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">'
        +'<div><span style="background:#0e2a47; color:#fff; font-weight:800; padding:3px 10px; border-radius:20px; font-size:11px; text-transform:uppercase;">🆕 Banco 1000 — Nivel intermedio</span>'
        +'<h3 style="font-size:18px; margin:8px 0 4px; color:#0e2a47;">Simuladores por materia — Banco original 1000 (250×4)</h3>'
        +'<p style="margin:0; color:#475569; font-size:13px; max-width:680px;">Preguntas originales inspiradas en las 69 oficiales, estrictamente alineadas al temario 4.1–4.4. Cada intento prioriza la <b>máxima cobertura temática</b> y evita repetir lo ya visto hasta agotar el banco. Nivel intermedio (mismo exigido por la EPN). Listo para escalar a difícil/experta.</p>'
        +'<div style="margin-top:8px; display:flex; gap:8px; flex-wrap:wrap; align-items:center;">'
        +'<span class="chip" style="background:#e0f2fe; color:#0e2a47;">'+tot1000+'/1000 preguntas</span>'
        +'<span class="chip" style="background:#dcfce7; color:#14532d;">Vistas: '+seenTot+' ('+pct1000+'%)</span>'
        +'<span class="chip light">Figuras: 246 validadas</span>'
        +'</div></div>'
        +'<div style="font-size:11px; color:#64748b; text-align:right;">'+(avail?'✓ Banco completo':'Banco en construcción')+'</div>'
        +'</div>';
      var cards = sims.map(function(s){
        return '<div class="card" style="border-top:4px solid '+s.color+'">'
          +'<div class="cimg" style="background:'+s.color+'">'+s.icon+'</div>'
          +'<div class="cbody"><h3>'+s.title+'</h3><p>'+s.sub+'</p>'
          +'<div class="cbtns"><button class="btn" data-act="course" data-c="'+s.course+'" style="background:'+s.color+'; border-color:'+s.color+';">▶ Ver simulador</button> <button class="btn sec" data-act="course" data-c="'+s.course+'">Configurar</button></div></div></div>';
      }).join('');
      return banner1000 + '<div class="cards" style="margin-bottom:26px">'+cards+'</div>';
    })()+
    renderSimuladores30Catalog()+
    '<div class="guia-banner"><b>Modo gu\u00eda activo.</b> Aqu\u00ed estudias el temario 1:1 de la gu\u00eda PDF. Usa <b>Aprender</b> para la teoría y los simuladores de arriba para practicar con cobertura máxima.</div>'+
    '<div style="margin:18px 0 10px;display:flex;gap:10px;flex-wrap:wrap">'+
    '<button class="btn" data-act="learn">Abrir Aprender ('+book.length+' cap\u00edtulos)</button>'+
    '<button class="btn sec" data-act="guiawork">Ver talleres (pr\u00f3ximamente)</button>'+
    '<button class="btn ghost" data-act="exitguia">Volver al aula</button></div>'+
    '<h2 style="font-size:20px;margin:28px 0 0">Aprender \u2014 teor\u00eda 1:1 con la gu\u00eda</h2>'+
    '<p class="th-sub">Cada tarjeta es una secci\u00f3n oficial (4.1.x \u2026 4.4.x), con la teor\u00eda justa y necesaria. Huecos de clases Barreno ya completados en el mismo estilo pedag\u00f3gico.</p>'+
    '<div class="thgroups">'+thcards+'</div>'+
    '<h2 style="font-size:20px;margin:34px 0 0">Talleres por tema (scaffold)</h2>'+
    '<p class="th-sub">Placeholders listos para futuros bancos de preguntas. No implementados a\u00fan.</p>'+
    ws+
    '</div>'+sitefooter();
}
function viewGuiaWorkshops(){
  var ws = GUIA_WORKSHOPS.map(function(block){
    var g = GUIDE[block.k];
    var cards = block.items.map(function(it){
      return '<div class="gcard guia-soon" data-act="guiaplaceholder" data-id="'+it.id+'">'+
        '<div class="gtop"><span class="gic">\u23F3</span><div><div class="gcode">'+it.code+'</div>'+
        '<div class="gt">'+escH(it.t)+'</div></div></div>'+
        '<ul><li>Banco de preguntas: pendiente</li><li>Simulador cronometrado: pendiente</li><li>Teor\u00eda: disponible en Aprender</li></ul>'+
        '<div class="gmeta"><span class="soon-pill">Pr\u00f3ximamente</span></div></div>';
    }).join('');
    return '<div class="subjhead"><span class="bar" style="background:'+g.color+'"></span><h2>'+escH(block.title)+'</h2></div>'+
      '<div class="gcards">'+cards+'</div>';
  }).join('');
  return navbar('guiawork')+'<div class="wrap">'+drawer('guiawork')+'<div class="main reading">'+
    pagehead('Talleres de la gu\u00eda (scaffold)','Gu\u00eda oficial 2026-B \u203a Talleres','mix')+toastHtml()+
    '<p class="th-sub">Estructura de cursos vac\u00edos alineada al temario oficial. Cuando Bryan lo pida, aqu\u00ed se cablear\u00e1n los bancos anti-overfitting por tema.</p>'+
    ws+
    '<div style="margin:16px 0;display:flex;gap:10px;flex-wrap:wrap"><button class="btn" data-act="learn">Ir a Aprender</button>'+
    '<button class="btn ghost" data-act="home">Inicio gu\u00eda</button></div>'+
    '</div></div>'+drawerBtn()+sitefooter();
}

/* ---------- NUEVO BANCO POLITÉCNICO 1500 Y 30 SIMULADORES PROGRAMADOS ---------- */
S.simTab = S.simTab || 'intermedio';
S.bankMode = S.bankMode || 'nuevo_1500';


function getCourseInfo(k){
  if(COURSES[k]) return COURSES[k];
  if(window.SIMULADORES_PROGRAMADOS && Array.isArray(window.SIMULADORES_PROGRAMADOS.simuladores)){
    var sim = window.SIMULADORES_PROGRAMADOS.simuladores.find(function(s){ return s.sim_id === k; });
    if(sim){
      var lvlColor = sim.nivel === 'experto' ? '#b3261e' : (sim.nivel === 'dificil' ? '#d9822b' : '#1f7a3f');
      return {
        key: sim.sim_id,
        name: sim.nombre,
        short: 'Simulacro ' + (sim.simulador < 10 ? '0' + sim.simulador : sim.simulador),
        full: 'Simulacro ' + (sim.simulador < 10 ? '0' + sim.simulador : sim.simulador) + ': ' + sim.nombre,
        desc: sim.descripcion || 'Simulador programado de 30 preguntas.',
        color: lvlColor,
        icon: '🧮'
      };
    }
  }
  return { key: k, name: k, short: k, full: k, desc: '', color: '#0e2a47', icon: '🧮' };
}

function registerProgrammedSimsInCourses(){
  if(window.SIMULADORES_PROGRAMADOS && Array.isArray(window.SIMULADORES_PROGRAMADOS.simuladores)){
    window.SIMULADORES_PROGRAMADOS.simuladores.forEach(function(sim){
      var lvlColor = sim.nivel === 'experto' ? '#b3261e' : (sim.nivel === 'dificil' ? '#d9822b' : '#1f7a3f');
      COURSES[sim.sim_id] = {
        key: sim.sim_id,
        name: sim.nombre,
        short: 'Simulacro ' + (sim.simulador < 10 ? '0' + sim.simulador : sim.simulador),
        full: 'Simulacro ' + (sim.simulador < 10 ? '0' + sim.simulador : sim.simulador) + ': ' + sim.nombre + ' (' + levelName(sim.nivel) + ')',
        desc: sim.descripcion || sim.objetivo || 'Simulador oficial programado de 30 preguntas.',
        color: lvlColor,
        icon: '🧮',
        isProgrammedSim: true
      };
    });
  }
}

function getSimuladoresList(){
  registerProgrammedSimsInCourses();
  if(window.SIMULADORES_PROGRAMADOS && Array.isArray(window.SIMULADORES_PROGRAMADOS.simuladores)){
    return window.SIMULADORES_PROGRAMADOS.simuladores;
  }
  return [];
}

function buildProgrammedSimAttempt(simId, isSequential){
  if(typeof isSequential === 'undefined') isSequential = true;
  var sims = getSimuladoresList();
  var sim = sims.find(function(s){ return s.sim_id === simId; });
  if(!sim){
    sim = { sim_id: simId, simulador: 1, nivel: 'intermedio', nombre: 'Simulador Matemáticas 30', duracion_min: 45, question_ids: [] };
  }
  var mat1500 = (window.GUIA_BANK_MAT_1500 && window.GUIA_BANK_MAT_1500.mat) ? window.GUIA_BANK_MAT_1500.mat : [];
  var mapById = {};
  mat1500.forEach(function(q){ mapById[q.id] = q; });
  
  var selected = [];
  (sim.question_ids || []).forEach(function(qid){
    if(mapById[qid]) selected.push(mapById[qid]);
  });
  if(selected.length < 5){
    selected = mat1500.filter(function(q){ return q.d === sim.nivel; }).slice(0, 30);
  }
  
  var qs = selected.map(function(q, idx){
    var raw = {
      q: q.prompt,
      o: q.opts ? q.opts.slice() : [],
      a: q.ans,
      e: q.exp,
      d: q.d,
      t: q.t,
      topics: q.topics ? q.topics.slice() : [],
      ch: q.ch,
      id: q.id,
      imgs: q.imgs ? q.imgs.slice() : [],
      maths: q.maths ? q.maths.slice() : [],
      distractores: q.distractores ? q.distractores.slice() : [],
      theory: q.theory,
      __s: 'mat',
      __i: idx
    };
    var order = [0,1,2,3];
    if(cfg.shuffleOptions) order = shuffle(order);
    return { subj:'mat', order:order, src:raw };
  });
  
  var limitMs = (sim.duracion_min || 45) * 60 * 1000;
  return {
    course: sim.sim_id,
    simId: sim.sim_id,
    simTitle: sim.nombre,
    simLevel: sim.nivel,
    simObj: sim,
    level: sim.nivel,
    area: 'guia',
    qs: qs,
    ans: qs.map(function(){ return null; }),
    flags: qs.map(function(){ return false; }),
    cur: 0,
    start: new Date(),
    finished: false,
    limitMs: limitMs,
    isGuia1000: true,
    isProgrammedSim: true,
    sequential: !!isSequential
  };
}

function renderSimuladores30Catalog(){
  var sims = getSimuladoresList();
  var curTab = S.simTab || 'intermedio';
  var filtered = sims.filter(function(s){ return s.nivel === curTab; });
  
  var tabBtns = [
    { key: 'intermedio', label: '🟢 Nivel Intermedio (10 Simulacros)', desc: 'Mismo nivel exigido en la prueba oficial EPN' },
    { key: 'dificil', label: '🟡 Nivel Difícil (10 Simulacros)', desc: 'Razonamiento conceptual y problemas combinados' },
    { key: 'experto', label: '🔴 Nivel Experto (10 Simulacros)', desc: 'Alta exigencia analítica · Politécnica Pura' }
  ].map(function(tb){
    var active = (tb.key === curTab);
    return '<button class="sim-tab-btn ' + (active ? 'active' : '') + '" data-act="setsimtab" data-tab="' + tb.key + '">'
      + '<b>' + tb.label + '</b><span class="sim-tab-sub">' + tb.desc + '</span></button>';
  }).join('');
  
  var cards = filtered.map(function(sim){
    var hs = liveHist().filter(function(r){ return r.course === sim.sim_id; });
    var last = hs.length ? hs.sort(function(a,b){ return b.ts - a.ts; })[0] : null;
    var best = hs.length ? Math.max.apply(null, hs.map(recPct)) : null;
    
    var colorBadge = sim.nivel === 'experto' ? '#b3261e' : (sim.nivel === 'dificil' ? '#d9822b' : '#1f7a3f');
    var bgBadge = sim.nivel === 'experto' ? '#fdf2f2' : (sim.nivel === 'dificil' ? '#fffbeb' : '#f0fdf4');
    
    var statusHtml = hs.length 
      ? '<div class="sim-status-row"><span class="sim-pill ok">🏆 Mejor: ' + best + '%</span> <span class="sim-pill light">Rendido: ' + hs.length + ' vez' + (hs.length > 1 ? 'es' : '') + '</span></div>'
      : '<div class="sim-status-row"><span class="sim-pill light">⚪ Aún no rendido</span></div>';
      
    return '<div class="sim-card-box" style="border-top: 4px solid ' + colorBadge + ';">'
      + '<div class="sim-card-head">'
      + '<span class="sim-num-badge" style="background:' + bgBadge + '; color:' + colorBadge + ';">Simulacro ' + (sim.simulador < 10 ? '0' + sim.simulador : sim.simulador) + '</span>'
      + '<span class="sim-time-tag">⏱️ ' + sim.duracion_min + ' min · 30 preg</span>'
      + '</div>'
      + '<h3 class="sim-card-title">' + escH(sim.nombre) + '</h3>'
      + '<p class="sim-card-desc">' + escH(sim.descripcion || sim.objetivo || '') + '</p>'
      + statusHtml
      + '<div class="sim-card-actions">'
      + '<button class="btn primary" data-act="preview-prog-sim" data-sim="' + sim.sim_id + '" style="background:' + colorBadge + '; border-color:' + colorBadge + ';">📋 Ver Ficha y Rendir</button>'
      + '</div>'
      + '</div>';
  }).join('');
  
  return '<div class="sim30-container">'
    + '<div class="sim30-header">'
    + '<div class="sim30-badge">🌟 NUEVO BANCO POLITÉCNICO 2026-B (1,500 PREGUNTAS)</div>'
    + '<h2>30 Simuladores Secuenciales de Matemáticas</h2>'
    + '<p>Entrenamiento estructurado con progresión pedagógica calculada. Elige tu ruta de dificultad para dominar el 100% de la prueba.</p>'
    + '</div>'
    + '<div class="sim-tabs-row">' + tabBtns + '</div>'
    + '<div class="sim-cards-grid">' + cards + '</div>'
    + '</div>';
}


function viewProgrammedSimPreview(simId){
  var sims = getSimuladoresList();
  var sim = sims.find(function(s){ return s.sim_id === simId; }) || sims[0];
  if(!sim) return viewHome();
  
  var mat1500 = (window.GUIA_BANK_MAT_1500 && window.GUIA_BANK_MAT_1500.mat) ? window.GUIA_BANK_MAT_1500.mat : [];
  var mapById = {};
  mat1500.forEach(function(q){ mapById[q.id] = q; });
  
  var simQuestions = (sim.question_ids || []).map(function(id){ return mapById[id]; }).filter(Boolean);
  if(!simQuestions.length){
    simQuestions = mat1500.filter(function(q){ return q.d === sim.nivel; }).slice(0, 30);
  }
  
  // Topic distribution
  var topicDist = {};
  var relatedLessons = {};
  simQuestions.forEach(function(q){
    var tName = q.t || 'General';
    topicDist[tName] = (topicDist[tName] || 0) + 1;
    if(q.ch) relatedLessons[q.ch] = true;
    if(q.theory && q.theory.lesson_id) relatedLessons[q.theory.lesson_id] = true;
  });
  
  var distChips = Object.keys(topicDist).map(function(tName){
    return '<span class="chip light" style="margin:2px 4px 2px 0; font-size:12px;"><b>' + escH(tName) + ':</b> ' + topicDist[tName] + ' preg</span>';
  }).join('');
  
  // Related theory links
  var thBook = (window.GUIA_THEORY_MAT || []);
  var thLinks = Object.keys(relatedLessons).map(function(lid){
    var les = thBook.find(function(l){ return l.id === lid; });
    var title = les ? (les.ic + ' ' + les.t) : lid;
    return '<button class="btn ghost mini" data-act="chapter" data-id="' + lid + '" style="margin:3px 4px 3px 0; font-size:12px; border-color:#0284c7; color:#0369a1;">📖 ' + escH(title) + '</button>';
  }).join('');
  
  var hs = liveHist().filter(function(r){ return r.course === sim.sim_id; });
  var last = hs.length ? hs.sort(function(a,b){ return b.ts - a.ts; })[0] : null;
  var best = hs.length ? Math.max.apply(null, hs.map(recPct)) : null;
  
  var colorBadge = sim.nivel === 'experto' ? '#b3261e' : (sim.nivel === 'dificil' ? '#d9822b' : '#1f7a3f');
  var bgBadge = sim.nivel === 'experto' ? '#fdf2f2' : (sim.nivel === 'dificil' ? '#fffbeb' : '#f0fdf4');
  var lvlTitle = sim.nivel === 'experto' ? 'Nivel Experto · Politécnica Pura' : (sim.nivel === 'dificil' ? 'Nivel Difícil · Razonamiento Avanzado' : 'Nivel Intermedio · Tipo Examen Oficial EPN');
  
  var historyHtml = hs.length
    ? '<div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:12px 16px; margin-bottom:16px;">'
      + '<div style="display:flex; gap:16px; align-items:center; flex-wrap:wrap;">'
      + '<div><span style="font-size:11.5px; color:#64748b; text-transform:uppercase; font-weight:700;">Mejor Marca:</span> <b style="font-size:18px; color:#1f7a3f;">' + best + '%</b></div>'
      + '<div><span style="font-size:11.5px; color:#64748b; text-transform:uppercase; font-weight:700;">Intentos Previos:</span> <b style="font-size:16px; color:#1e293b;">' + hs.length + '</b></div>'
      + '<div><span style="font-size:11.5px; color:#64748b; text-transform:uppercase; font-weight:700;">Último Intento:</span> <span style="font-size:13px; color:#475569;">' + (last ? fmtDate(last.ts) + ' (' + recPct(last) + '%)' : 'N/A') + '</span></div>'
      + '</div></div>'
    : '<div style="background:#f8fafc; border:1px dashed #cbd5e1; border-radius:8px; padding:12px 16px; margin-bottom:16px; color:#64748b; font-size:13px;">'
      + '⚪ Aún no has rendido este simulador. ¡Comienza tu primer intento para medir tu nivel!'
      + '</div>';
      
  return navbar('home') + '<div class="wrap">' + drawer('home') + '<div class="main reading">'
    + pagehead('Simulacro ' + (sim.simulador < 10 ? '0' + sim.simulador : sim.simulador) + ': ' + escH(sim.nombre), 'Guía Oficial EPN › 30 Simuladores Secuenciales › ' + levelName(sim.nivel), 'mat')
    + toastHtml()
    + '<div style="background:#fff; border:1.5px solid ' + colorBadge + '; border-radius:14px; padding:24px; margin-bottom:24px; box-shadow:0 6px 20px rgba(0,0,0,.06);">'
    + '<div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:14px;">'
    + '<span class="chip" style="background:' + colorBadge + '; color:#fff; font-weight:800; font-size:12px; padding:4px 12px; border-radius:20px;">' + lvlTitle + '</span>'
    + '<span style="font-size:13px; color:#64748b; font-weight:600;">⏱️ Tiempo límite: ' + sim.duracion_min + ' minutos · 30 preguntas de selección múltiple</span>'
    + '</div>'
    + '<h2 style="font-size:22px; color:#0e2a47; margin:0 0 8px;">' + escH(sim.nombre) + '</h2>'
    + '<p style="font-size:14.5px; color:#334155; line-height:1.5; margin:0 0 16px;">' + escH(sim.descripcion || sim.objetivo || 'Simulador oficial programado de 30 preguntas de alta fidelidad.') + '</p>'
    + historyHtml
    + '<div style="margin-bottom:16px;">'
    + '<h4 style="margin:0 0 6px; font-size:13px; text-transform:uppercase; color:#475569; letter-spacing:.5px;">Distribución de Contenidos del Examen:</h4>'
    + '<div style="display:flex; flex-wrap:wrap; gap:4px;">' + distChips + '</div>'
    + '</div>'
    + (thLinks ? ('<div style="margin-bottom:18px;"><h4 style="margin:0 0 6px; font-size:13px; text-transform:uppercase; color:#475569; letter-spacing:.5px;">Teoría Recomendada para este Simulador:</h4><div style="display:flex; flex-wrap:wrap; gap:4px;">' + thLinks + '</div></div>') : '')
    + '<div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:14px 18px; margin-bottom:20px;">'
    + '<div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px; margin-bottom:10px; padding-bottom:10px; border-bottom:1px solid #e2e8f0;">'
    + '<div style="display:flex; align-items:center; gap:10px;">'
    + '<input type="checkbox" id="chkSequential" checked style="width:18px; height:18px; cursor:pointer; accent-color:#0284c7;" />'
    + '<label for="chkSequential" style="font-size:13.5px; color:#0e2a47; cursor:pointer; font-weight:700;">🔒 Navegación Secuencial Estricta (Modo Oficial EPN)</label>'
    + '</div>'
    + '<span style="font-size:12px; color:#64748b;">(Avanza pregunta por pregunta como en la prueba real)</span>'
    + '</div>'
    + '<div style="display:flex; align-items:center; gap:10px;">'
    + '<input type="checkbox" id="chkNoSavePreview" ' + (S.noSave ? 'checked' : '') + ' style="width:18px; height:18px; cursor:pointer;" />'
    + '<label for="chkNoSavePreview" style="font-size:13px; color:#475569; cursor:pointer; font-weight:500;">Modo de prueba (no alterar historial ni registrar preguntas vistas)</label>'
    + '</div></div>'
    + '<div style="display:flex; gap:12px; flex-wrap:wrap;">'
    + '<button class="btn primary" data-act="start-prog-sim" data-sim="' + sim.sim_id + '" style="background:' + colorBadge + '; border-color:' + colorBadge + '; padding:12px 24px; font-size:15px; font-weight:800;">▶️ Iniciar Simulacro Ahora (30 Preguntas)</button>'
    + '<button class="btn sec" data-act="enterguia" style="padding:12px 18px; font-size:14px;">‹ Volver al Catálogo de Simuladores</button>'
    + '</div>'
    + '</div>'
    + '</div></div>' + drawerBtn() + sitefooter();
}

function viewHome(){
  if(isGuia()) return viewGuiaHome();
  var total = SUBJ.reduce(function(s,k){ return s+BANK[k].length; },0);
  var st = statsFor('all');
  var cards = CKEYS.map(function(k){
    var c = getCourseInfo(k), n = bankOf(k).length;
    var hs = liveHist().filter(function(r){ return r.course===k; });
    var last = hs.length? hs.sort(function(a,b){return b.ts-a.ts;})[0] : null;
    return '<div class="card">'+
      '<div class="cimg" style="background:'+c.color+'">'+c.icon+'</div>'+
      '<div class="cbody">'+
      '<span class="badge ok">Disponible</span>'+
      '<h3>'+c.full+'</h3>'+
      '<p>'+c.desc+'<br><b>'+countFor(k)+' preguntas \u00b7 '+minutesFor(k)+' min</b> \u00b7 banco de '+n+
      (last? '<br>\u00daltimo intento: '+fmtCorta(last.ts)+' \u2014 <b>'+recPct(last)+'%</b>':'')+'</p>'+
      '<div class="cbtns"><button class="btn" data-act="course" data-c="'+k+'">Ir al cuestionario</button>'+
      '<button class="btn sec" data-act="quickstart" data-c="'+k+'">Empezar ya</button>'+
      (hs.length? '<button class="btn ghost" data-act="histtabgo" data-t="'+k+'">Historial ('+hs.length+')</button>':'')+
      '</div></div></div>';
  }).join('');
  var thcards = ['trig','ineq','mat','fis','qui','len','gen'].map(function(k){
    var chs = THEORY.filter(function(ch){ return ch.s===k; });
    if(!chs.length) return '';
    var g = GUIDE[k];
    var inner = chs.map(function(ch){
      var st = chapterProgress(ch.id);
      return '<div class="th-card" data-act="chapter" data-id="'+ch.id+'"><div class="ic">'+ch.ic+'</div>'+
        '<div><b>'+escH(ch.t)+'</b><span>'+((GUIDE[k].secs[ch.id]||{}).code||'')+' \u00b7 '+st+'</span></div></div>';
    }).join('');
    return '<div class="thgroup"><div class="thgh"><span class="thdot" style="background:'+g.color+'"></span>'+
      '<b>'+g.code+' '+escH(g.name)+'</b><span class="thgn">'+chs.length+' cap\u00edtulo'+(chs.length>1?'s':'')+
      (k!=='gen'? ' \u00b7 '+bankOf(k).length+' preguntas':'')+'</span>'+
      (k!=='gen'? '<button class="btn ghost mini" data-act="quickstart" data-c="'+k+'">Practicar</button>':'')+
      '</div><div class="th-list">'+inner+'</div></div>';
  }).join('');
  return navbar('home')+
    '<div class="homehero"><h2>01-SEA-EPN_2026-2 \u00b7 Simuladores de admisi\u00f3n</h2>'+
    '<p>Curso de nivelaci\u00f3n y admisi\u00f3n \u00b7 Aula Virtual Vinculaci\u00f3n \u00b7 Escuela Polit\u00e9cnica Nacional</p>'+
    '<div class="stats"><div><b>'+total+'</b><span>PREGUNTAS EN EL BANCO</span></div>'+
    '<div><b>'+THEORY.length+'</b><span>CAP\u00cdTULOS DE TEOR\u00cdA</span></div>'+
    '<div><b>'+st.attempts+'</b><span>INTENTOS RENDIDOS</span></div>'+
    '<div><b>'+(st.attempts? st.avg+'%':'\u2014')+'</b><span>PROMEDIO</span></div>'+
    '<div><b>'+levelName(cfg.level)+'</b><span>DIFICULTAD ACTUAL</span></div></div></div>'+
    '<div style="padding:0 26px 40px">'+toastHtml()+
    '<div class="guia-cta card" style="display:flex;gap:18px;align-items:flex-start;padding:18px 20px;margin-bottom:22px;border:2px solid #0e2a47">'+
      '<div class="cimg" style="background:#0e2a47;min-width:64px;height:64px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:28px;color:#fff">G</div>'+
      '<div class="cbody" style="flex:1"><span class="badge ok">Nueva \u00e1rea</span>'+
      '<h3 style="margin:6px 0">Gu\u00eda oficial EPN 2026-B</h3>'+
      '<p>Espacio paralelo alineado al PDF de la gu\u00eda: teor\u00eda Aprender 1:1 por materia/tema, y scaffold de talleres futuros. <b>No modifica</b> los cuestionarios actuales (trig, ineq, mix, etc.).</p>'+
      '<div class="cbtns"><button class="btn" data-act="enterguia">Entrar a la gu\u00eda oficial</button>'+
      '<button class="btn sec" data-act="enterguialearn">Ir directo a Aprender</button></div></div></div>'+
    '<div class="cards">'+cards+'</div>'+
    '<h2 style="font-size:20px;margin:30px 0 0">Aprende: teor\u00eda completa de la gu\u00eda</h2>'+
    '<p class="th-sub">Las 4 \u00e1reas del examen y sus 15 cap\u00edtulos, con la teor\u00eda suficiente para resolver cualquier pregunta del banco.</p>'+
    '<div class="thgroups">'+thcards+'</div>'+
    '<div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap"><button class="btn sec" data-act="learn">Ver los '+THEORY.length+' cap\u00edtulos</button>'+
    '<button class="btn sec" data-act="stats">Mis estad\u00edsticas</button>'+
    '<button class="btn sec" data-act="history">Mi historial</button>'+
    '<button class="btn ghost" data-act="cfg">\u2699 Configuraci\u00f3n</button></div></div>'+
    sitefooter();
}

var GUIDE = {
  trig:{ code:'★', name:'Taller Especializado: Identidades Trigonométricas', color:'#7b2cbf',
    purpose:'Dominar identidades pitagóricas, recíprocas, de cociente y ángulo doble con trucos de examen.',
    time:'Taller intensivo de práctica y lectura',
    bib:['Guía de Estudio EPN 2026-B — Módulo de Trigonometría'],
    secs:{
      t1:{ code:'T.1', items:['Identidades pitagóricas fundamentales','Identidades recíprocas y de cociente','Identidades de ángulo doble','Comprobación numérica rápida (Truco de examen)'] }
    } },
  ineq:{ code:'★', name:'Taller Especializado: Inecuaciones y Valor Absoluto', color:'#0f766e',
    purpose:'Dominar relaciones de orden, intervalos, inecuaciones lineales/polinómicas y desigualdades con valor absoluto (Clases 16–17).',
    time:'Taller intensivo de práctica y lectura',
    bib:['Guía de Estudio EPN 2026-B — Módulo 4.1.2 (Inecuaciones y valor absoluto)','Apuntes Barreno: Clases 16 y 17'],
    secs:{
      i1:{ code:'I.1', items:['Relaciones de orden e intervalos','Inecuaciones lineales y cadenas (invertir con negativo)','Inecuaciones polinómicas por signos','Valor absoluto: |x|<a, |x|>a, casos extremos y propiedades'] }
    } },
  mat:{ code:'4.1', name:'Matemática', color:'#f7a1c4',
    purpose:'Evaluar la capacidad de razonamiento algebraico, geométrico y trigonométrico.',
    time:'90 minutos (examen filtro: si no lo apruebas no rindes las demas áreas)',
    bib:['Stewart, Redlin y Watson (2012). Precalculo. Matemáticas para el cálculo, 6a ed. Cengage.','Moise, E. y Downs, F. (1970). Geometria Moderna. Addison Wesley.','Lehmann, C. H. (1984). Geometria Analítica. Limusa.'],
    secs:{
      m1:{ code:'4.1.1', items:['Operaciones con números enteros','Operaciones con números racionales','Operaciones con números reales','Expresiones algebraicas'] },
      m2:{ code:'4.1.2', items:['Ecuaciones de primer grado','Sistemas de ecuaciones lineales','Ecuaciones de segundo grado con una incognita','Inecuaciones y valor absoluto'] },
      m3:{ code:'4.1.3', items:['Axiomas de punto, recta y distancia','Paralelismo y ángulos','Medida angular, congruencia de ángulos y ángulos entre paralelas y una transversal','Congruencia de triángulos','Semejanza de triángulos'] },
      m4:{ code:'4.1.4', items:['Razones trigonométricas','Identidades trigonométricas','Ley de senos y ley de cosenos','Rectas y circunferencias en el plano'] }
    } },
  fis:{ code:'4.2', name:'Física', color:'#8fc7e8',
    purpose:'Evaluar la comprension de los principios fundamentales de la mecanica.',
    time:'Parte de los 120 minutos del segundo bloque',
    bib:['Hewitt, P. G. (2016). Física conceptual, 12a ed. Pearson.','Serway, R. A. y Vuille, C. (2018). Fundamentos de física, 10a ed. Cengage.'],
    secs:{
      f1:{ code:'4.2.1', items:['Primera ley de Newton','Fuerza neta, vectores y suma vectorial','Equilibrio estatico y dinamico','Movimiento rectilineo: posición, distancia, desplazamiento, rapidez, velocidad y aceleracion','Caida de los cuerpos','Movimiento de proyectiles y satelites'] },
      f2:{ code:'4.2.2', items:['Segunda ley de Newton','Fuerza gravitacional','Fuerzas de rozamiento y de resistencia; caida libre con resistencia del aire','Tercera ley de Newton','Cinematica y dinamica del movimiento circular uniforme','Momento lineal e impulso; conservacion del momento'] },
      f3:{ code:'4.2.3', items:['Trabajo y potencia','Trabajo neto y energia cinetica','Fuerzas conservativas y energia potencial','Energia mecanica y su conservacion','Fuentes de energia'] }
    } },
  qui:{ code:'4.3', name:'Química', color:'#a8d5a2',
    purpose:'Evaluar conocimientos basicos sobre la estructura de la materia y las reacciones quimicas.',
    time:'Parte de los 120 minutos del segundo bloque',
    bib:['Chang, R. y Goldsby, K. (2016). Química, 12a ed. McGraw-Hill.','Hein, M., Willard, C. y Arena, S. (2018). Fundamentos de Química. Cengage.'],
    secs:{
      q1:{ code:'4.3.1', items:['Transformacion de unidades','Clasificación de la materia; procesos fisicos y quimicos','Particulas fundamentales','Estructura electronica de atomos e iones'] },
      q2:{ code:'4.3.2', items:['Estructura de la tabla periódica','Propiedades periódicas de los elementos','Nomenclatura inorganica de compuestos binarios, ternarios y cuaternarios'] },
      q3:{ code:'4.3.3', items:['Enlace ionico','Enlace covalente','Estructuras de Lewis','Geometria molecular','Fuerzas intermoleculares'] },
      q4:{ code:'4.3.4', items:['Concepto de mol','Formulas empiricas y moleculares','Reacciones quimicas','Cálculos estequiometricos y reactivo limitante'] }
    } },
  len:{ code:'4.4', name:'Lenguaje', color:'#f3c778',
    purpose:'Evaluar comprension lectora, pensamiento critico y capacidad de argumentacion.',
    time:'Parte de los 120 minutos del segundo bloque',
    bib:['Rubio, E., Duenas, F., Garcia, L. y Garzon, D. (2019). Competencias linguisticas. Uniminuto.','Copi, I. M., Cohen, C. y McMahon, K. (2011). Introduccion a la logica. Pearson.'],
    secs:{
      l1:{ code:'4.4.1', items:['La comunicacion: rol, importancia y elementos','La razon y el pensamiento logico','Analisis, interpretacion y elaboracion de juicios de valor propios'] },
      l2:{ code:'4.4.2', items:['Razonamiento logico','Analisis e interpretacion de textos','Lectura critica'] },
      l3:{ code:'4.4.3', items:['Construccion del parrafo','Argumentacion logica: construccion de argumentos e identificacion de falacias','Uso de signos de puntuacion y concordancia gramatical'] }
    } },
  gen:{ code:'\u2605', name:'Estrategia de examen', color:'#b9c6d4',
    purpose:'Cómo esta armada la prueba real y cómo administrar los 210 minutos.',
    time:'210 minutos en total',
    bib:['Guia de estudio EPN 2026-B, Direccion de Admision y Registro.'],
    secs:{ g1:{ code:'1-3', items:['Caracteristicas de la evaluación','Recomendaciones generales de estudio','Indicaciones generales para el dia del examen'] } } }
};
function chapterProgress(id){
  var ui = load(UI_KEY, {}) || {};
  var read = (ui.read||{})[id];
  return read? 'Leido' : 'Pendiente';
}
function subjectTopicSummary(k){
  if(k==='gen') return '';
  var pri = priorities().filter(function(e){ return e.k===k; });
  var dom = pri.filter(function(e){ return e.st.k==='ok'; }).length;
  return dom+'/'+pri.length+' temas dominados';
}
function viewLearn(){
  var book = theoryBook();
  var order = isGuia() ? guiaLearnOrder() : ['trig','ineq','mat','fis','qui','len','gen'];
  var html = order.map(function(k){
    var g = GUIDE[k], chs = book.filter(function(c){ return c.s===k; });
    if(!chs.length) return '';
    var cards = chs.map(function(ch){
      var sec = (g.secs && g.secs[ch.id]) || {code:'', items:[]};
      var words = (ch.body||'').split(/\s+/).length;
      var mins = Math.max(3, Math.round(words/190));
      return '<div class="gcard" data-act="chapter" data-id="'+ch.id+'">'+
        '<div class="gtop"><span class="gic">'+ch.ic+'</span><div><div class="gcode">'+(sec.code||'')+'</div>'+
        '<div class="gt">'+escH(ch.t)+'</div></div></div>'+
        '<ul>'+sec.items.map(function(it){ return '<li>'+escH(it)+'</li>'; }).join('')+'</ul>'+
        '<div class="gmeta"><span>\u23F1 '+mins+' min de lectura</span><span>'+chapterProgress(ch.id)+'</span></div>'+
        '</div>';
    }).join('');
    var nq = (k==='gen' || isGuia())? 0 : BANK[k].length;
    return '<div class="subjhead"><span class="bar" style="background:'+g.color+'"></span><h2>'+g.code+'. '+g.name+'</h2>'+
      '<span class="cnt">'+(nq? nq+' preguntas en el banco \u00b7 '+subjectTopicSummary(k) : (isGuia()? 'Temario oficial 1:1' : 'Guia oficial'))+'</span></div>'+
      '<p class="th-sub">'+g.purpose+' <b>'+g.time+'</b></p>'+
      '<div class="gcards">'+cards+'</div>'+
      '<details class="planbox"><summary>Bibliografia sugerida por la EPN para '+g.name+'</summary>'+
      '<ol class="planlist">'+g.bib.map(function(b){ return '<li>'+escH(b)+'</li>'; }).join('')+'</ol></details>'+
      (nq? '<div style="margin:6px 0 4px"><button class="btn sec" data-act="quickstart" data-c="'+k+'">Practicar '+g.name+' ahora</button></div>' : '');
  }).join('');
  var headTitle = isGuia()
    ? 'Aprender \u2014 teor\u00eda 1:1 gu\u00eda oficial 2026-B'
    : 'Aprende \u2014 teor\u00eda completa de la guia 2026-B';
  var headCrumb = isGuia() ? 'Gu\u00eda oficial \u203a Aprender' : '01-SEA-EPN_2026-2 \u203a Aprende';
  var intro = isGuia()
    ? '<p class="th-sub">Temario <b>exacto</b> de la gu\u00eda PDF (secciones 4.1\u20134.4): Mate, F\u00edsica, Qu\u00edmica y Lenguaje. Contenido sintetizado de clases Barreno dónde aplica, y huecos completados en el mismo estilo pedag\u00f3gico.</p>'
    : '<p class="th-sub">Aqui esta desarrollado <b>todo el temario oficial</b> del examen de admision (áreas 4.1 a 4.4 de la guia): conceptos desde cero, formulas, analogias, ejemplos resueltos, errores frecuentes y trucos de examen. Cada tarjeta corresponde a una seccion exacta de la guia.</p>';
  return navbar('learn')+'<div class="wrap">'+drawer('learn')+'<div class="main reading">'+
    pagehead(headTitle, headCrumb,'mix')+toastHtml()+
    intro+
    html+'</div></div>'+drawerBtn()+sitefooter();
}
function viewChapter(){
  var book = theoryBook();
  var ids = book.map(function(c){return c.id;});
  var ix = ids.indexOf(S.chapter);
  var ch = book[ix]; if(!ch) return viewLearn();
  var prev = book[ix-1], next = book[ix+1];
  var words = ch.body.split(/\s+/).length;
  var crumbBase = isGuia()? 'Gu\u00eda oficial \u203a Aprender' : '01-SEA-EPN_2026-2 \u203a Aprende';
  
  var returnReviewBanner = '';
  if(S.reviewReturn){
    var retQ = S.reviewReturn.qIndex + 1;
    returnReviewBanner = '<div class="return-review-bar" style="background:#0e2a47; color:#fff; padding:14px 20px; border-radius:10px; margin-bottom:18px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; box-shadow:0 4px 14px rgba(14,42,71,.25); border-left:5px solid #0284c7;">'
      + '<div>'
      + '<div style="font-weight:800; font-size:15px; display:flex; align-items:center; gap:6px;"><span>🔙</span> Modo Estudio de Revisión</div>'
      + '<div style="font-size:13px; color:#cbd5e1; margin-top:2px;">Estás repasando el concepto vinculado a la <b>Pregunta ' + retQ + '</b> de tu simulador.</div>'
      + '</div>'
      + '<button class="btn primary" data-act="return-to-review" style="background:#0284c7; border-color:#0284c7; font-weight:800; font-size:13.5px; padding:8px 18px; border-radius:6px; cursor:pointer;">↩️ Volver a la Revisión (Pregunta ' + retQ + ')</button>'
      + '</div>';
  }

  return navbar('learn')+'<div class="wrap">'+drawer('learn')+'<div class="main reading">'+
    pagehead(ch.ic+' '+escH(ch.t), crumbBase+' \u203a '+escH(ch.t),'mix')+
    returnReviewBanner+
    '<div class="readbar"><span>Cap\u00edtulo '+(ix+1)+' de '+book.length+'</span><span>\u00b7</span><span>\u2248'+Math.max(2,Math.round(words/180))+' min de lectura</span>'+
    '<span>\u00b7</span><a data-act="learn">\u2039 Volver al \u00edndice</a></div>'+
    chapterToc(ch.body)+
    '<div class="theory">'+md(ch.body)+'</div>'+
    '<div class="th-nav">'+
      (prev? '<button class="btn ghost" data-act="chapter" data-id="'+prev.id+'">\u2039 '+escH(prev.t)+'</button>':'<span></span>')+
      (next? '<button class="btn" data-act="chapter" data-id="'+next.id+'">'+escH(next.t)+' \u203a</button>':'<span></span>')+
    '</div>'+
    (S.reviewReturn ? '<div style="margin:18px 0 12px; padding:14px 18px; background:#f0f9ff; border:2px solid #0284c7; border-radius:8px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;"><div><b style="color:#0369a1; font-size:14px;">¿Terminaste de estudiar este concepto?</b><div style="font-size:12.5px; color:#475569;">Regresa directamente a la pregunta donde estabas revisando.</div></div><button class="btn primary" data-act="return-to-review" style="background:#0284c7; border-color:#0284c7; font-weight:800; font-size:13.5px; padding:8px 16px;">↩️ Volver a la Revisión (Pregunta ' + (S.reviewReturn.qIndex + 1) + ')</button></div>' : '')+
    '<div style="margin:8px 0 16px;display:flex;gap:10px;flex-wrap:wrap"><button class="btn sec" data-act="learn">Volver a Aprende</button>'+
    (!isGuia() && ch.s!=='gen'? '<button class="btn" data-act="quickstart" data-c="'+ch.s+'">Practicar '+COURSES[ch.s].short+' ahora</button>':'')+
    (isGuia()? '<button class="btn ghost" data-act="home">Inicio gu\u00eda</button>':'')+'</div>'+
    '</div></div>'+drawerBtn()+sitefooter();
}

function viewCourse(){
  var c = getCourseInfo(S.course), k = S.course;
  var isG1000 = GUIA_COURSES.indexOf(k)>=0;
  var bank1000 = window.GUIA_BANK_1000 || {mat:[],fis:[],qui:[],len:[]};
  var subjForG = ({guia_mat30:'mat', guia_fis:'fis', guia_qui:'qui', guia_len:'len'})[k];
  var pool, fresh;
  if(isG1000){
    if(k==='guia_fql120'){
      pool = bank1000.fis.length + bank1000.qui.length + bank1000.len.length;
      fresh = (bank1000.fis.filter(function(q){return !SEEN1000SET.fis[q.id];}).length)
            + (bank1000.qui.filter(function(q){return !SEEN1000SET.qui[q.id];}).length)
            + (bank1000.len.filter(function(q){return !SEEN1000SET.len[q.id];}).length);
    } else if(subjForG){
      var arr = bank1000[subjForG]||[];
      pool = arr.length;
      fresh = arr.filter(function(q){return !SEEN1000SET[subjForG][q.id];}).length;
    } else { pool=0; fresh=0; }
  } else {
    pool = k==='mix'? EXAM.reduce(function(s,x){ return s+levelPool(x).length; },0) : levelPool(k).length;
    fresh = k==='mix'? EXAM.reduce(function(s,x){ return s+levelPool(x).filter(function(q){return !SEENSET[x][q.__i];}).length; },0)
                     : levelPool(k).filter(function(q){ return !SEENSET[k][q.__i]; }).length;
  }
  var guiaBadge = isG1000 ? '<span style="background:#0e2a47;color:#fff;font-size:11px;padding:2px 8px;border-radius:999px;margin-left:8px;vertical-align:middle;">Guía EPN · Día '+(k==='guia_mat30'?'1':'2')+'</span>' : '';
  var lv = LEVELS.map(function(l){
    var disabled = isG1000 && l.k!=='medio';
    return '<button class="pill '+l.c+(cfg.level===l.k?' on':'')+(disabled?' disabled':'')+'" data-act="setlevel" data-l="'+l.k+'"'+(disabled?' disabled title="Solo nivel intermedio en banco 1000 (fácil/difícil próximamente)"':'')+'>'+l.n+(disabled?' 🔒':'')+'</button>';
  }).join('');
  var hs = liveHist().filter(function(r){ return r.course===k; }).sort(function(a,b){return b.ts-a.ts;});
  var crumbBase = isG1000 ? 'Guía oficial EPN \u203a Simuladores' : '01-SEA-EPN_2026-2';
  var totalBank = isG1000 ? (k==='guia_fql120'? 750 : 250) : bankOf(k).length;
  var perInfo = '';
  if(k==='guia_fql120') perInfo = ' <span style="color:#64748b;">(20 FIS + 20 QUI + 20 LEN, intercaladas 1-1-1)</span>';
  else if(subjForG) perInfo = ' <span style="color:#64748b;">(cobertura máxima de '+(bank1000[subjForG].length? Object.keys((function(){var m={};bank1000[subjForG].forEach(function(q){m[q.topics[0]]=1;});return m;})()).length : '-')+' temas)</span>';
  return navbar(isG1000?'home':'')+'<div class="wrap">'+drawer(isG1000?'home':'quiz')+'<div class="main">'+
    pagehead(c.full+guiaBadge, crumbBase+' \u203a '+c.full)+toastHtml()+
    '<div style="max-width:840px">'+
    '<p>'+c.desc+' Cada intento toma <b>'+countFor(k)+' preguntas</b> distintas'+(k==='mix'?' repartidas entre las cuatro áreas': perInfo)+' de un banco de <b>'+totalBank+'</b>'+(isG1000?' (banco 1000 original)':'')+'.</p>'+
    '<div style="margin:14px 0 6px;font-weight:600;font-size:14px">Dificultad</div><div class="pills">'+lv+'</div>'+
    (isG1000? '<div class="hint" style="margin-top:6px;">Banco 1000 solo en <b>nivel intermedio</b> (mismo exigido por la EPN). Fácil/difícil/experta se añadirán después.</div>' : '')+
    '<table class="quizsummary"><tbody>'+
    '<tr><th>Método de calificación</th><td>Calificación más alta</td></tr>'+
    '<tr><th>Límite de tiempo</th><td>'+minutesFor(k)+' minutos</td></tr>'+
    '<tr><th>Preguntas</th><td>'+countFor(k)+' (1,00 punto cada una)</td></tr>'+
    '<tr><th>Banco</th><td>'+pool+' preguntas (nivel intermedio)</td></tr>'+
    '<tr><th>Sin repetir</th><td>'+(cfg.noRepeat? 'Activado · '+fresh+' preguntas nuevas disponibles' : 'Desactivado (pueden repetirse)')+'</td></tr>'+
    '<tr><th>Intentos rendidos</th><td>'+hs.length+(hs.length?' · último '+fmtCorta(hs[0].ts)+' ('+recPct(hs[0])+'%)':'')+'</td></tr>'+
    '</tbody></table>'+
    (k==='mix'? '<div class="infobox">El examen real dura 210 minutos: 90 de Matemática (componente filtro) y 120 para Física, Química y Lenguaje. Puedes reproducir esos tiempos desde la configuración.</div>':'')+
    (isG1000? '<div class="infobox" style="border-left:4px solid #0e2a47;"><b>Cobertura garantizada:</b> cada intento cubre el máximo de temas distintos antes de repetir tema. Si pides menos preguntas qué temas, todas serán de temas distintos; si pides más, se hace una ronda completa por todos los temas antes de repetir. Ajusta N y minutos en <b>Configuración → Simuladores Guía EPN</b>.</div>':'')+
    (isG1000? '<div style="margin:10px 0; display:flex; gap:8px; flex-wrap:wrap;"><button class="btn sec" data-act="cfg">⚙ Ajustar N y tiempo de este simulador</button><span style="font-size:12px; color:#64748b; align-self:center;">Cada simulador recuerda su propio N/minutos.</span></div>':'')+
    ((GUIA_COURSES.indexOf(k)>=0) ? (function(){
      var total = 1000, seenTot = SEEN1000.mat.length+SEEN1000.fis.length+SEEN1000.qui.length+SEEN1000.len.length;
      var preview = (function(){ var arr=[]; var bank1000=window.GUIA_BANK_1000||{mat:[],fis:[],qui:[],len:[]}; if(k==='guia_mat30') arr=bank1000.mat||[]; else if(k==='guia_fql120') arr=(bank1000.fis||[]).concat(bank1000.qui||[]).concat(bank1000.len||[]); else { var s=({guia_fis:'fis',guia_qui:'qui',guia_len:'len'})[k]; arr=s? (bank1000[s]||[]):[]; } var n=Math.min(3,arr.length); var out=[]; for(var i=0;i<n;i++) out.push('<li style="font-size:12px;color:#334155;">'+escH(String(arr[i].prompt).slice(0,110))+'… <span class="chip light">'+escH(arr[i].t)+'</span></li>'); return out.length? '<ul style="margin:6px 0 0;padding-left:18px;">'+out.join('')+'</ul><div class="hint">+ '+(arr.length-n)+' preguntas más en el banco · vista previa solo lectura (editor igual qué aula: inspeccionar/cambiar/quitar antes de iniciar)</div>' : '<div class="hint">Banco listo — '+arr.length+' preguntas.</div>'; })();
      return '<div class="planbox" style="border-left:4px solid #0e2a47;"><b>Vista previa (solo lectura)</b> — '+preview+'<div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap;"><button class="btn sec mini" data-act="openadmin" style="border-color:#7b2cbf;color:#7b2cbf;">🔑 Editor (inspeccionar / cambiar / quitar)</button><span class="hint" style="align-self:center;">Corrección previa idéntica a la versión normal.</span></div></div>';
    })() : planBox(k))+
    '<label class="switch" style="margin:14px 0 10px;display:flex;align-items:center;gap:10px;cursor:pointer;background:rgba(217,130,43,0.08);padding:10px 14px;border-radius:8px;border:1px solid rgba(217,130,43,0.25)">'+
    '<input type="checkbox" id="chkNoSave" style="width:18px;height:18px;cursor:pointer" '+(S.noSave?'checked':'')+'>'+
    '<span style="font-weight:600;color:#d9822b">⚙ Modo de prueba: No guardar este intento en el historial</span></label>'+
    '<div class="hint" style="margin:-4px 0 14px">Ideal para testeo o prácticas rápidas. Si está activado, la nota no afectará tus estadísticas ni el banco de preguntas vistas.</div>'+
    '<div style="margin:18px 0 10px;display:flex;gap:10px;flex-wrap:wrap"><button class="btn" data-act="start">Intentar resolver el cuestionario ahora</button>'+
    '<button class="btn sec" data-act="cfg">⚙ Configuración</button>'+
    (GUIA_COURSES.indexOf(k)>=0? '<button class="btn sec" data-act="openadmin" style="border-color:#7b2cbf;color:#7b2cbf;font-weight:600">🔑 Editor (solo lectura) — Inspeccionar</button>' : '<button class="btn sec" data-act="openadmin" style="border-color:#7b2cbf;color:#7b2cbf;font-weight:600">🔑 Editor de preguntas (Admin)</button>')+
    (hs.length? '<button class="btn sec" data-act="histtabgo" data-t="'+k+'">Historial de esta materia</button>':'')+'</div>'+
    (GUIA_COURSES.indexOf(k)>=0? '<div class="hint" style="margin-top:8px;"><button class="btn ghost" data-act="reset-guia-mat" style="color:#b3261e;border-color:#b3261e;">↺ Reiniciar intentos de Matemática (primer intento)</button> <span style="font-size:12px;color:#64748b;">Solo Guía MAT · pide confirmación · no toca el aula.</span></div>' : '')+'</div>'+
    '</div>'+actnav()+'</div></div>'+drawerBtn()+sitefooter();
}

function viewAttempt(){
  var a = S.attempt, c = getCourseInfo(a.course);
  var left = a.limitMs - (Date.now()-a.start.getTime());
  var timerCls = left < 60000 ? 'crit' : (left < 300000 ? 'warn' : '');
  var isSeq = !!a.sequential;
  var nav = '<div class="navbtns">'+
    ((!isSeq && a.cur>0)? '<button class="btn ghost" data-act="prev">P\u00e1gina anterior</button>':'<span></span>')+
    (a.cur<a.qs.length-1? '<button class="btn" data-act="next">Siguiente p\u00e1gina</button>'
                        : '<button class="btn" data-act="summary">Terminar intento...</button>')+
    '</div>';
  return navbar('')+'<div class="wrap">'+drawer('quiz')+'<div class="main">'+
    pagehead(c.full,'01-SEA-EPN_2026-2 \u203a '+c.full)+toastHtml()+
    questionHtml(a.cur,'attempt')+nav+'</div>'+
    '<div class="rightblock"><div class="timerbox '+timerCls+'" id="timerbox">Tiempo restante<div class="t" id="timer">'+clock(left)+'</div></div>'+
    navButtons('attempt')+'</div></div>'+drawerBtn();
}

function viewSummary(){
  var a = S.attempt, c = getCourseInfo(a.course);
  var left = a.limitMs - (Date.now()-a.start.getTime());
  var rows = a.qs.map(function(q,ix){
    return '<tr><td>'+(ix+1)+'</td><td><a data-act="goto" data-i="'+ix+'">'+(a.ans[ix]===null?'Sin responder a\u00fan':'Respuesta guardada')+'</a>'+(a.flags[ix]?' \u2691':'')+'</td></tr>';
  }).join('');
  return navbar('')+'<div class="wrap">'+drawer('quiz')+'<div class="main">'+
    pagehead(c.full,'01-SEA-EPN_2026-2 \u203a '+c.full+' \u203a Resumen del intento')+
    '<h2 style="font-size:20px">Resumen del intento</h2>'+
    '<table class="quizsummary"><thead><tr><th>Pregunta</th><th>Estatus</th></tr></thead><tbody>'+rows+'</tbody></table>'+
    '<div class="timerbox '+(left<60000?'crit':(left<300000?'warn':''))+'" id="timerbox" style="max-width:260px">Tiempo restante<div class="t" id="timer">'+clock(left)+'</div></div>'+
    '<div style="display:flex;gap:10px;margin:14px 0 20px;flex-wrap:wrap">'+
    '<button class="btn sec" data-act="back">Volver al intento</button>'+
    '<button class="btn" data-act="confirmsubmit">Enviar todo y terminar</button></div>'+
    actnav()+'</div>'+navBlock('attempt')+'</div>'+drawerBtn()+sitefooter();
}

function breakdown(){
  var a = S.attempt, by = {};
  a.qs.forEach(function(q,ix){
    var key = a.course==='mix'? COURSES[q.subj].short : q.src.t;
    by[key] = by[key] || {ok:0,n:0};
    by[key].n++; if(isCorrect(ix)) by[key].ok++;
  });
  var rows = Object.keys(by).sort().map(function(k){
    var b = by[k], pct = Math.round(b.ok/b.n*100);
    return '<tr><td>'+escH(k)+'</td><td>'+b.ok+' / '+b.n+'</td><td><span class="bar-outer"><span class="bar-inner" style="width:'+pct+'%;background:'+(pct>=70?'#1f7a3f':pct>=50?'#d9822b':'#b3261e')+'"></span></span> '+pct+'%</td></tr>';
  }).join('');
  return '<h3 style="font-size:17px;margin:18px 0 4px">Desempe\u00f1o por '+(a.course==='mix'?'\u00e1rea':'tema')+'</h3>'+
    '<table class="byarea"><thead><tr><th>'+(a.course==='mix'?'\u00c1rea':'Tema')+'</th><th>Aciertos</th><th>Rendimiento</th></tr></thead><tbody>'+rows+'</tbody></table>';
}

function viewReview(){
  var a = S.attempt, c = getCourseInfo(a.course);
  var score = a.qs.reduce(function(s,_,ix){ return s+(isCorrect(ix)?1:0); },0);
  var max = a.qs.length, grade = score/max*10;
  var head = '<table class="quizreviewsummary"><tbody>'+
    '<tr><th>Comenzado el</th><td>'+fmtFecha(a.start)+'</td></tr>'+
    '<tr><th>Estado</th><td>Finalizado</td></tr>'+
    '<tr><th>Finalizado en</th><td>'+fmtFecha(a.end)+'</td></tr>'+
    '<tr><th>Tiempo empleado</th><td>'+fmtDur(a.end-a.start)+'</td></tr>'+
    '<tr><th>Dificultad</th><td>'+levelName(a.level)+'</td></tr>'+
    '<tr><th>Puntos</th><td>'+fmtNum(score)+'/'+fmtNum(max)+'</td></tr>'+
    '<tr><th>Calificaci\u00f3n</th><td><b>'+fmtNum(grade)+'</b> de '+fmtNum(10)+' (<b>'+fmtNum(grade*10)+'%</b>)</td></tr>'+
    '</tbody></table>';
  var qs = (S.onePage!=null)? questionHtml(S.onePage,'review')
                            : a.qs.map(function(_,ix){ return questionHtml(ix,'review'); }).join('');
  var onePageNav = '';
  if(S.onePage!=null){
    onePageNav = '<div class="navbtns">'+
      (S.onePage>0?'<button class="btn ghost" data-act="rprev">P\u00e1gina anterior</button>':'<span></span>')+
      (S.onePage<a.qs.length-1?'<button class="btn" data-act="rnext">Siguiente p\u00e1gina</button>':'<span></span>')+'</div>';
  }
  return navbar('')+'<div class="wrap">'+drawer('quiz')+'<div class="main">'+
    pagehead(c.full+(a.historic?' \u00b7 intento guardado':''),'01-SEA-EPN_2026-2 \u203a '+c.full)+toastHtml()+
    head+breakdown()+qs+onePageNav+
    '<div class="finishlink"><a data-act="finishreview">Finalizar revisi\u00f3n</a></div>'+
    '<div style="margin-bottom:16px;display:flex;gap:10px;flex-wrap:wrap"><button class="btn" data-act="start">Realizar otro intento</button>'+
    '<button class="btn sec" data-act="learn">Repasar la teor\u00eda</button>'+
    '<button class="btn sec" data-act="stats">Ver mi progreso</button>'+
    '<button class="btn ghost" data-act="history">Historial</button></div>'+
    actnav()+'</div>'+navBlock('review')+'</div>'+drawerBtn()+sitefooter();
}


/* ---------- SEGURIDAD Y SINCRONIZACIÓN EN LA NUBE (PIN: 235677) ---------- */
var SECURITY_PIN = "235677";
var PIN_KEY = "epn_pin_v1";

function isPinAuthenticated() {
  var saved = load(PIN_KEY, null);
  return String(saved) === SECURITY_PIN;
}

function verifyPin(inputPin) {
  if (String(inputPin).trim() === SECURITY_PIN) {
    save(PIN_KEY, SECURITY_PIN);
    return true;
  }
  return false;
}

function cloudSync() {
  if (!isPinAuthenticated()) return;
  var pin = SECURITY_PIN;
  
  fetch('/api/sync?pin=' + pin)
    .then(function(res){ return res.json(); })
    .then(function(res){
      if(res && res.ok && res.data && res.data.data) {
        var cloud = res.data.data;
        var cloudHist = cloud.hist || [];
        var changed = false;
        
        cloudHist.forEach(function(cRec){
          var exists = HIST.some(function(lRec){ return lRec.id === cRec.id || (lRec.ts === cRec.ts && lRec.score === cRec.score); });
          if(!exists) {
            HIST.push(cRec);
            changed = true;
          }
        });
        
        if(cloud.seen) {
          Object.keys(cloud.seen).forEach(function(k){
            if(Array.isArray(cloud.seen[k])) {
              cloud.seen[k].forEach(function(idx){
                if(SEENSET[k] && !SEENSET[k][idx]) {
                  SEENSET[k][idx] = true;
                  if(SEEN[k] && SEEN[k].indexOf(idx) < 0) SEEN[k].push(idx);
                  changed = true;
                }
              });
            }
          });
        }
        if(cloud.seen1000) {
          Object.keys(cloud.seen1000).forEach(function(k){
            if(Array.isArray(cloud.seen1000[k])) {
              cloud.seen1000[k].forEach(function(id){
                if(SEEN1000SET[k] && !SEEN1000SET[k][id]) {
                  SEEN1000SET[k][id] = true;
                  if(SEEN1000[k].indexOf(id) < 0) SEEN1000[k].push(id);
                  changed = true;
                }
              });
            }
          });
        }

        // Continuidad cross-device: si no hay intento local y la nube trae uno vigente, restaurarlo
        if(!S.attempt && cloud.active && typeof cloud.active.startMs==='number'){
          var cloudDes = deserializeAttempt(cloud.active);
          if(cloudDes){
            try{ localStorage.setItem(ACTIVE_KEY, JSON.stringify(cloud.active)); }catch(e){}
            S.attempt = cloudDes;
            if(cloudDes.area) S.area = cloudDes.area;
            S.course = cloudDes.course;
            if(typeof cloudDes.cur==='number') S.attempt.cur = cloudDes.cur;
            if(cloudDes.onePage!=null) S.onePage = cloudDes.onePage;
            if(cloudDes.view==='review' || cloudDes.finished){ S.view='review'; }
            else if(cloudDes.view==='summary'){ S.view='summary'; S.attempt.view='summary'; }
            else { S.view='attempt'; }
            if(cloudDes.finished && cloudDes.view==='attempt'){ finishAttempt(true); return; }
            // render diferido: después del then, forzará vista correspondiente
            changed = true;
          } else {
            // nube expirada
            try{ localStorage.removeItem(ACTIVE_KEY); }catch(e){}
          }
        } else if(S.attempt && !S.attempt.historic && cloud.active && S.attempt.start && cloud.active.startMs){
          // conflicto: gana el más reciente (solo para intentos activos, no revisiones históricas)
          if(cloud.active.startMs > S.attempt.start.getTime()){
            var newer = deserializeAttempt(cloud.active);
            if(newer && !newer.finished){
              try{ localStorage.setItem(ACTIVE_KEY, JSON.stringify(cloud.active)); }catch(e){}
              S.attempt = newer; if(newer.area) S.area=newer.area; S.course=newer.course;
              if(typeof newer.cur==='number') S.attempt.cur = newer.cur;
              if(newer.onePage!=null) S.onePage = newer.onePage; else S.onePage=null;
              if(newer.view==='summary'){ S.view='summary'; S.attempt.view='summary'; }
              else if(newer.view==='review'){ S.view='review'; }
              else S.view='attempt';
              changed=true;
            }
          }
        }
        if(changed) {
          saveHist();
          saveSeen();
          saveSeen1000();
          if(typeof rerenderKeepScroll === 'function') rerenderKeepScroll(); else render();
          if(S.attempt && S.attempt.restored && !S.attempt.finished) startTimer();
        } else if(S.attempt && S.attempt.restored){
          render(); if(typeof startTimer==='function') startTimer();
        }
        // evita pisar nube con payload obsoleto recién restaurado: push incluye active actual
        pushCloudState();
      } else {
        pushCloudState();
      }
    })
    .catch(function(err){
      console.log('Cloud sync offline fallback');
    });
}

function pushCloudState() {
  if (!isPinAuthenticated()) return;
  var activePayload = null;
  try{
    if(S.attempt && !S.attempt.finished && !S.attempt.historic) activePayload = serializeAttempt(S.attempt);
    else {
      var rawAct = loadActiveRaw();
      if(rawAct && typeof rawAct.startMs==='number') activePayload = rawAct;
    }
  }catch(e){}
  var payload = {
    hist: HIST,
    seen: SEEN,
    seen1000: SEEN1000,
    cfg: cfg,
    active: activePayload
  };
  fetch('/api/sync?pin=' + SECURITY_PIN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: payload })
  }).catch(function(err){ console.log('Push sync offline fallback'); });
}


/* ---------- MODO ADMINISTRADOR Y EDITOR DE PRÓXIMO INTENTO (PIN: Netkaizen5 - SIEMPRE PIDE CLAVE) ---------- */
var ADMIN_PIN = "Netkaizen5";
var ADMIN_SESSION = false;

function isAdminAuthenticated() {
  return ADMIN_SESSION === true;
}

function verifyAdminPin(inputPin) {
  if (String(inputPin).trim() === ADMIN_PIN) {
    ADMIN_SESSION = true;
    return true;
  }
  return false;
}

function swapPlanQuestion(courseKey, qIndex) {
  var p = PLAN[planKey(courseKey)];
  if (!p || !p.ids || !p.ids[qIndex]) return;
  var target = p.ids[qIndex];
  var subjBank = BANK[target.s] || [];
  
  var currentIds = new Set(p.ids.map(function(x){ return x.s + '_' + x.i; }));
  var candidates = subjBank.filter(function(q){ return !currentIds.has(q.__s + '_' + q.__i); });
  
  if (!candidates.length) candidates = subjBank;
  var replacement = shuffle(candidates)[0];
  if (replacement) {
    p.ids[qIndex] = { s: replacement.__s, i: replacement.__i };
    savePlan();
  }
}

function removePlanQuestion(courseKey, qIndex) {
  var p = PLAN[planKey(courseKey)];
  if (!p || !p.ids || !p.ids[qIndex]) return;
  p.ids.splice(qIndex, 1);
  savePlan();
}

/* ---------- MODALES ---------- */
function modalCfg(){
  cfg.guiaCfg = cfg.guiaCfg || {guia_mat30:{n:30,min:90}, guia_fql120:{n:60,min:120}, guia_fis:{n:20,min:40}, guia_qui:{n:20,min:40}, guia_len:{n:20,min:40}};
  var lv = LEVELS.map(function(l){ return '<button class="pill '+l.c+(cfg.level===l.k?' on':'')+'" data-act="setlevel" data-l="'+l.k+'">'+l.n+'</button>'; }).join('');
  var guiaCfgHtml = '';
  try {
    var gc = cfg.guiaCfg;
    guiaCfgHtml = '<div class="field" style="background:#f0f7ff; border:1px solid #cfe0f3; border-radius:8px; padding:12px; margin:14px 0;">'
      +'<label style="color:#0e2a47; font-weight:700;">⚙ Simuladores Guía EPN (banco 1000) — por simulador</label>'
      +'<div class="hint" style="margin-bottom:10px;">Ajusta N y minutos para cada uno de los 5 simuladores guía. Quedan guardados y el simulador los respeta al iniciar.</div>'
      + GUIA_COURSES.map(function(k){
          var v=gc[k]||{n:countFor(k), min:minutesFor(k)};
          return '<div style="display:flex; gap:8px; align-items:center; margin-bottom:8px; flex-wrap:wrap;">'
            +'<span style="min-width:110px; font-weight:600; font-size:13px;">'+COURSES[k].short+'</span>'
            +'<label style="font-size:12px;">Preguntas <input id="gc-n-'+k+'" type="number" min="5" max="60" value="'+v.n+'" style="width:70px; padding:4px 6px; border:1px solid #cbd5e1; border-radius:4px;"></label>'
            +'<label style="font-size:12px;">Minutos <input id="gc-min-'+k+'" type="number" min="10" max="180" value="'+v.min+'" style="width:70px; padding:4px 6px; border:1px solid #cbd5e1; border-radius:4px;"></label>'
            +'<span style="font-size:11px; color:#64748b;">'+(k==='guia_mat30'?'Día 1 filtro':'')+(k==='guia_fql120'?'Día 2 intercalado':'')+'</span>'
            +'</div>';
        }).join('')
      +'</div>';
  } catch(e){ guiaCfgHtml=''; }
  return '<div class="modalbg" data-act="closemodal"><div class="modal" data-stop="1">'+
    '<header>Configuraci\u00f3n del simulador<button data-act="closemodal">\u2715</button></header>'+
    '<div class="body">'+
    '<div class="field"><label>Dificultad de las preguntas</label><div class="pills">'+lv+'</div>'+
    '<div class="hint">Aula Barreno: 100 por materia y nivel. Guía 1000: solo nivel intermedio por ahora. \u00abMezclado\u00bb combina niveles del aula.</div></div>'+
    guiaCfgHtml+
    '<div class="field"><label>L\u00edmite de tiempo por materia (minutos) — Aula</label><input id="cfgmin" type="number" min="1" max="300" value="'+cfg.minutes+'"></div>'+
    '<div class="field"><label>Preguntas por intento (una materia) — Aula</label><input id="cfgcount" type="number" min="1" max="100" value="'+cfg.count+'"></div>'+
    '<label class="switch" style="margin-top:6px;display:flex;align-items:center;gap:8px;cursor:pointer"><input id="cfgsetdefault" type="checkbox"><span style="font-size:13px;color:#1f7a3f;font-weight:600">Establecer este número de preguntas cómo predeterminado para todos los simuladores</span></label>'+
    '<div class="field"><label>Simulacro completo: minutos — Aula</label><input id="cfgmixmin" type="number" min="1" max="300" value="'+cfg.mixMinutes+'"><div class="hint">El examen real dura 210 minutos en total.</div></div>'+
    '<div class="field"><label>Simulacro completo: preguntas — Aula</label><input id="cfgmixcount" type="number" min="4" max="120" value="'+cfg.mixCount+'"></div>'+
    '<div class="field"><label>Nombre del estudiante</label><input id="cfgname" type="text" value="'+escH(cfg.student)+'"></div>'+
    '<label class="switch"><input id="cfgnr" type="checkbox" '+(cfg.noRepeat?'checked':'')+'> No repetir preguntas de intentos anteriores</label>'+
    '<div class="hint" style="margin:-4px 0 10px">Cuando se agotan las preguntas nuevas de un nivel, el ciclo se reinicia autom\u00e1ticamente.</div>'+
    '<label class="switch"><input id="cfgsq" type="checkbox" '+(cfg.shuffleQuestions?'checked':'')+'> Barajar preguntas en cada intento</label>'+
    '<label class="switch"><input id="cfgso" type="checkbox" '+(cfg.shuffleOptions?'checked':'')+'> Barajar las opciones de respuesta</label>'+
    '<label class="switch"><input id="cfgfb" type="checkbox" '+(cfg.showFeedback?'checked':'')+'> Mostrar retroalimentaci\u00f3n en la revisi\u00f3n</label>'+
    '<div class="field" style="margin-top:12px"><label>Datos guardados en este dispositivo</label>'+
    '<div class="hint">'+liveHist().length+' intento(s) activos \u00b7 '+(HIST.length-liveHist().length)+' eliminados \u00b7 '+SUBJ.reduce(function(s,k){return s+SEEN[k].length;},0)+' preguntas ya vistas.</div>'+
    '<div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap"><button class="btn ghost" data-act="resetseen">Reiniciar preguntas vistas</button>'+
    '<button class="btn ghost" data-act="clearhist">Borrar historial</button></div></div>'+
    '<div class="field"><label>Respaldo del progreso (para no perderlo al actualizar la app)</label>'+
    '<div class="hint">Exporta un archivo <b>.json</b> con tus intentos, preguntas vistas, capítulos leídos y configuración. Cuando descargues una versión nueva del simulador, ábrela e impórtalo: los intentos se combinan sin duplicarse.</div>'+
    '<div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap"><button class="btn" data-act="exportjson">\u2913 Exportar progreso (.json)</button>'+
    '<button class="btn sec" data-act="importjson">\u2912 Importar progreso</button></div>'+
    '<input id="impfile" type="file" accept="application/json,.json" style="display:none"></div>'+
    '</div>'+
    '<div class="foot"><button class="btn ghost" data-act="closemodal">Cancelar</button><button class="btn" data-act="savecfg">Guardar cambios</button></div>'+
    '</div></div>';
}
function modalExit(){
  var a = S.attempt, un = a.ans.filter(function(x){ return x===null; }).length;
  return '<div class="modalbg" data-act="stayin"><div class="modal" data-stop="1">'+
    '<header>Tienes un intento en curso<button data-act="stayin">\u2715</button></header>'+
    '<div class="body"><div class="alertbox">No puedes salir del cuestionario sin cerrarlo. Cómo en el examen real, debes <b>terminar el intento en el estado actual</b>.</div>'+
    '<p>Si terminas ahora, el intento se enviar\u00e1 tal cómo est\u00e1'+(un>0? ' con <b>'+un+'</b> pregunta'+(un===1?'':'s')+' sin responder':'')+' y quedar\u00e1 guardado en tu historial con la nota obtenida.</p>'+
    '</div>'+
    '<div class="foot"><button class="btn sec" data-act="stayin">Volver al intento</button>'+
    '<button class="btn" data-act="forcefinish">Terminar intento ahora</button></div>'+
    '</div></div>';
}
function modalConfirm(){
  var a = S.attempt, un = a.ans.filter(function(x){ return x===null; }).length;
  return '<div class="modalbg" data-act="closemodal"><div class="modal" data-stop="1">'+
    '<header>Confirmaci\u00f3n<button data-act="closemodal">\u2715</button></header>'+
    '<div class="body"><p>Una vez qué env\u00ede el intento, no podr\u00e1 cambiar sus respuestas.</p>'+
    (un>0?'<div class="alertbox">Tiene '+un+' pregunta'+(un===1?'':'s')+' sin responder.</div>':'')+
    '</div>'+
    '<div class="foot"><button class="btn ghost" data-act="closemodal">Cancelar</button><button class="btn" data-act="submit">Enviar todo y terminar</button></div>'+
    '</div></div>';
}

/* ---------- RENDER ---------- */

function renderAdminModal(){
  if (!isAdminAuthenticated()) {
    return '<div class="modalbg" data-act="closemodal"><div class="modalcard" style="max-width:420px;text-align:center" data-stop="1">'+
      '<div style="font-size:36px;margin-bottom:8px">🔑</div>'+
      '<h2 style="margin:0 0 6px">Acceso de Administrador</h2>'+
      '<p class="th-sub" style="margin-bottom:16px">Ingresa la contraseña de administrador para continuar.</p>'+
      '<div style="margin-bottom:16px"><input type="password" id="adminpininput" class="cfgfield" placeholder="Contraseña Admin" style="font-size:18px;text-align:center" autofocus /></div>'+
      '<div id="adminpinerr" style="color:#b3261e;font-size:13px;margin-bottom:12px;display:none">Contraseña de administrador incorrecta.</div>'+
      '<div style="display:flex;gap:10px"><button class="btn ghost" data-act="closemodal">Cancelar</button><button class="btn" data-act="verifyadminpin" style="flex:1">Autenticar</button></div>'+
      '</div></div>';
  }

  var k = S.course || 'mat';
  var p = PLAN[planKey(k)];
  if(!p || !p.ids || !p.ids.length) {
    makePlan(k);
    p = PLAN[planKey(k)];
  }

  var planQs = (p && p.ids) ? p.ids.map(function(x){ return (BANK[x.s]||[])[x.i]; }).filter(function(q){ return !!q; }) : [];

  var qListHtml = planQs.map(function(q, ix){
    var subjName = (COURSES[q.__s]||{}).short || q.__s;
    return '<div style="background:#f8f9fa;border:1px solid #cbd5e1;border-radius:8px;padding:12px;margin-bottom:10px;text-align:left">'+
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;flex-wrap:wrap;gap:6px">'+
      '<div><b>#'+(ix+1)+'</b> <span class="chip light">'+subjName+'</span> <span class="chip" style="background:#e0e7ff;color:#3730a3">'+escH(q.t)+'</span> <span class="chip">'+levelName(q.d)+'</span></div>'+
      '<div style="display:flex;gap:6px">'+
      '<button class="btn sec mini" data-act="swapplanswap" data-ix="'+ix+'">↻ Mezclar / Cambiar</button>'+
      '<button class="btn ghost mini" data-act="swaplanremove" data-ix="'+ix+'" style="color:#b3261e">✕ Quitar</button>'+
      '</div></div>'+
      '<div style="font-size:14px;margin-bottom:6px;color:#1e293b"><b>Pregunta:</b> '+md(q.q)+'</div>'+
      '<div style="font-size:13px;color:#1f7a3f"><b>Respuesta Correcta:</b> '+escH(q.o[q.a])+'</div>'+
      '</div>';
  }).join('');

  return '<div class="modalbg" data-act="closemodal"><div class="modalcard" style="max-width:760px;max-height:85vh;overflow-y:auto" data-stop="1">'+
    '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">'+
    '<h2 style="margin:0">🔑 Editor del Próximo Intento ('+(COURSES[k]||{}).short+')</h2>'+
    '<button class="closex" data-act="closemodal">✕</button></div>'+
    '<p class="th-sub">Inspecciona y edita manualmente las <b>'+planQs.length+' preguntas</b> qué saldrán en el próximo simulador. Puedes quitar o cambiar cualquier pregunta antes de empezar.</p>'+
    '<div style="margin-bottom:16px">'+(qListHtml||'<div class="emptybox">No hay preguntas preparadas en este intento.</div>')+'</div>'+
    '<div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:space-between">'+
    '<button class="btn sec" data-act="reshuffle" data-c="'+k+'">↻ Re-barajar todo el intento</button>'+
    '<button class="btn" data-act="closemodal">✅ Confirmar y Guardar Próximo Intento</button>'+
    '</div></div></div>';
}

function renderPinModal(){
  return '<div class="modalbg"><div class="modalcard" style="max-width:420px;text-align:center" data-stop="1">'+
    '<div style="font-size:36px;margin-bottom:8px">🔒</div>'+
    '<h2 style="margin:0 0 6px">Acceso Privado al Aula Virtual</h2>'+
    '<p class="th-sub" style="margin-bottom:16px">Ingresa el PIN de seguridad de 6 dígitos (235677) para acceder y sincronizar tu progreso unificado.</p>'+
    '<div style="margin-bottom:16px"><input type="password" id="pininput" class="cfgfield" placeholder="PIN de 6 dígitos" style="font-size:22px;letter-spacing:6px;text-align:center" autofocus /></div>'+
    '<div id="pinerr" style="color:#b3261e;font-size:13px;margin-bottom:12px;display:none">PIN de seguridad incorrecto. Inténtalo de nuevo.</div>'+
    '<button class="btn" data-act="verifypin" style="width:100%;padding:12px">Ingresar al Aula Virtual</button>'+
    '</div></div>';
}

function render(){
  var html = '';
  if(S.view==='home') html = viewHome();
  else if(S.view==='sim_preview') html = viewProgrammedSimPreview(S.selectedSimId);
  else if(S.view==='learn') html = viewLearn();
  else if(S.view==='chapter') html = viewChapter();
  else if(S.view==='guiawork') html = viewGuiaWorkshops();
  else if(S.view==='stats') html = viewStats();
  else if(S.view==='history') html = viewHistory();
  else if(S.view==='course') html = viewCourse();
  else if(S.view==='attempt') html = viewAttempt();
  else if(S.view==='summary') html = viewSummary();
  else if(S.view==='review') html = viewReview();
  el('root').innerHTML = html;
  
  var modalHtml = '';
  if (!isPinAuthenticated()) {
    modalHtml = renderPinModal();
  } else if (S.modal === 'admin') {
    modalHtml = renderAdminModal();
  } else if (S.modal === 'cfg') {
    modalHtml = modalCfg();
  } else if (S.modal === 'confirm') {
    modalHtml = modalConfirm();
  } else if (S.modal === 'exit') {
    modalHtml = modalExit();
  }
  el('modalroot').innerHTML = modalHtml;
  if(S.scrollTop!==false) window.scrollTo(0,0);
  syncHash();
}

/* ---------- TIMER Y CICLO DEL INTENTO ---------- */
function startTimer(){
  stopTimer();
  S.tick = setInterval(function(){
    var a = S.attempt; if(!a || a.finished){ stopTimer(); return; }
    var left = a.limitMs - (Date.now()-a.start.getTime());
    var t = el('timer'), box = el('timerbox');
    if(t) t.textContent = clock(left);
    if(box) box.className = 'timerbox '+(left<60000?'crit':(left<300000?'warn':''));
    if(left<=0) finishAttempt(true);
  }, 1000);
}
function stopTimer(){ if(S.tick){ clearInterval(S.tick); S.tick = null; } }
// Serializa el intento actual para durabilidad (LS + nube). Incluye snapshot de src para qué
// la revisión tras F5 no dependa de haber vuelto a cargar el banco correcto.
// También persiste view/onePage/cur para F5 profesional en intento/resumen/revisión.
function serializeAttempt(a){
  var qsSer = a.qs.map(function(q){
    var s=q.src;
    return { subj:q.subj, order:q.order.slice(), src:{ t:s.t, q:s.q, o:s.o.slice(), a:s.a, e:s.e, ch:s.ch, maths:(s.maths||[]).slice(), imgs:(s.imgs||[]).slice(), __s:s.__s, n:s.n, d:s.d, topics:(s.topics||[]).slice(), id:s.id, __i:s.__i } };
  });
  // view/onePage/cur se guardan para qué F5 vuelva exactamente al mismo lugar (pregunta, paginación, resumen)
  var v = (a.view || S.view || 'attempt');
  var op = (a.onePage!=null ? a.onePage : (S.onePage!=null ? S.onePage : null));
  var cur = (typeof a.cur==='number' ? a.cur : (typeof S.attempt!=='undefined' && S.attempt && typeof S.attempt.cur==='number' ? S.attempt.cur : 0));
  // endMs para revisiones (finished review) — permite F5 en revisión sin perder el intento recién corregido
  var endMs = (a.end ? a.end.getTime() : null);
  return { course:a.course, level:a.level, area:(a.area||S.area), qs:qsSer, ans:a.ans.slice(), flags:a.flags.slice(), cur:cur, startMs:a.start.getTime(), endMs:endMs, limitMs:a.limitMs, isGuia1000:!!a.isGuia1000, isGuia69:!!a.isGuia69, noSave:!!a.noSave, view:v, onePage:op, finished:!!a.finished, historic:!!a.historic };
}
function deserializeAttempt(raw){
  if(!raw || !Array.isArray(raw.qs) || typeof raw.startMs!=='number' || typeof raw.limitMs!=='number') return null;
  var isReview = (raw.view==='review') || (!!raw.finished && raw.view!=='attempt' && raw.view!=='summary');
  // TTL: intento activo expira si venció hace >1 min; revisión guardada expira a los 30 min
  if(isReview){
    var ageReview = Date.now() - (raw.endMs || raw.startMs);
    if(ageReview > 30*60*1000) return null;
    if(!raw.qs.length) return null;
  } else {
    var left = (raw.startMs + raw.limitMs) - Date.now();
    if(left <= -60000) return null; // vencido hace >1 min → se consolidará cómo entregado al restaurar
    var expired = left <= 0;
    if(expired){
      // se vencerá al restaurar (auto-entrega), pero aún deserializable
    }
  }
  var left2 = (raw.startMs + raw.limitMs) - Date.now();
  var expired2 = left2 <= 0;
  var qs = raw.qs.map(function(x){
    return { subj:x.subj, order:x.order.slice(), src:{ t:x.src.t, q:x.src.q, o:x.src.o.slice(), a:x.src.a, e:x.src.e, ch:x.src.ch, maths:(x.src.maths||[]).slice(), imgs:(x.src.imgs||[]).slice(), __s:x.src.__s, n:x.src.n, d:x.src.d, topics:(x.src.topics||[]).slice(), id:x.src.id, __i:x.src.__i } };
  });
  var view = raw.view || 'attempt';
  var onePage = (raw.onePage!=null ? raw.onePage : null);
  var finished = !!raw.finished || (expired2 && !isReview);
  var end = raw.endMs ? new Date(raw.endMs) : (finished ? new Date(Math.min(Date.now(), raw.startMs+raw.limitMs)) : null);
  var a={ course:raw.course, level:raw.level, area:raw.área, qs:qs, ans:raw.ans.slice(), flags:raw.flags.slice(), cur:(typeof raw.cur==='number'?raw.cur:0), start:new Date(raw.startMs), end: end, finished: finished, limitMs: raw.limitMs, historic:!!raw.historic, isGuia1000:!!raw.isGuia1000, isGuia69:!!raw.isGuia69, noSave:!!raw.noSave, restored:true, view:view, onePage:onePage };
  // si es revisión, marca historic false pero finished true para qué renderice review sin bloquear
  return a;
}
function restoreActiveAttempt(){
  var raw = loadActiveRaw();
  if(!raw) return false;
  var a = deserializeAttempt(raw);
  if(!a){ clearActive(); return false; }
  S.attempt = a;
  if(a.area) S.area = a.area;
  S.course = a.course;
  if(a.onePage!=null) S.onePage = a.onePage; else if(S.onePage==null) S.onePage = null;
  if(typeof a.cur==='number') S.attempt.cur = a.cur;
  // revisión recién corregida: F5 debe quedarse en revisión (profesional), no mandar al inicio
  if(a.view==='review' || (a.finished && a.view!=='attempt' && a.view!=='summary')){
    S.view='review'; S.modal=null;
    if(!S.toast) S.toast='↻ Revisión restaurada — sigues viendo la corrección.';
    return true;
  }
  if(a.finished){
    // tiempo vencido mientras estuvo cerrado → consolida cómo entregado (una sola vez)
    finishAttempt(true);
    return true;
  }
  // intento activo: respeta view guardada (attempt/summary)
  var desiredView = a.view || 'attempt';
  if(desiredView!=='attempt' && desiredView!=='summary') desiredView='attempt';
  S.view=desiredView; S.modal=null;
  if(S.view==='attempt' && typeof a.cur==='number') S.attempt.cur = a.cur;
  if(!S.toast) S.toast='↻ Intento restaurado — continúa dónde lo dejaste. El tiempo siguió corriendo.';
  return true;
}
function persistActiveThrottled(){
  // throttle 900ms para no saturar LS/nube a cada clic
  if(persistActiveThrottled._t) clearTimeout(persistActiveThrottled._t);
  persistActiveThrottled._t=setTimeout(function(){ saveActive(); if(isPinAuthenticated()) pushCloudState(); }, 900);
}
function recordAttempt(a){
  if(a.noSave){ clearActive(); return null; }
  var score = a.qs.reduce(function(s,_,ix){ return s+(isCorrect(ix)?1:0); },0);
  // Para guia1000, guarda id + sel + subj para reconstrucción; para legacy guarda k/i
  var qsRec = a.qs.map(function(q,ix){
    var sel = (a.ans[ix]==null? null : q.order[a.ans[ix]]);
    if(a.isGuia1000 || GUIA_COURSES.indexOf(a.course)>=0){
      return {k:q.subj, id:q.src.id, sel:sel};
    }
    return {k:q.subj, i:q.src.__i, sel:sel};
  });
  var rec = { id:'a'+a.start.getTime(), ts:a.start.getTime(), course:a.course, level:a.level,
    min:Math.round(a.limitMs/60000), durMs:(a.end-a.start), n:a.qs.length, score:score, qs:qsRec };
  HIST.push(rec); saveHist();
  if(a.isGuia1000){
    // SEEN1000 ya se marcó al generar, no duplicar; asegura persistencia
    saveSeen1000();
  } else {
    a.qs.forEach(function(q){ if(!SEENSET[q.subj][q.src.__i]){ SEENSET[q.subj][q.src.__i]=1; SEEN[q.subj].push(q.src.__i); } });
    saveSeen();
  }
  pushCloudState();
  return rec;
}
function finishAttempt(auto){
  var a = S.attempt;
  a.finished = true;
  a.end = new Date(Math.min(Date.now(), a.start.getTime()+a.limitMs));
  stopTimer();
  // deja de ser intento activo, pero guarda revisión para F5 profesional (30 min)
  a.view='review'; S.view='review';
  if(!a.historic && !a.noSave) recordAttempt(a);
  else if(a.noSave){ clearActive(); if(isPinAuthenticated()) pushCloudState(); }
  // persiste snapshot de revisión para qué F5 en revisión no pierda la corrección
  try{
    var revKey='epn_active_v1';
    if(!a.noSave){
      // guarda revisión con endMs + view review + cur/onePage reales
      var revRaw = serializeAttempt(a);
      revRaw.view='review'; revRaw.finished=true; revRaw.endMs=a.end.getTime();
      localStorage.setItem(revKey, JSON.stringify(revRaw));
      if(isPinAuthenticated()) pushCloudState();
    } else {
      clearActive();
    }
  }catch(e){}
  S.modal = null; // mantiene S.onePage tal cuál para paginación en revisión
  if(a.noSave){
    S.toast = '⚙ Modo de prueba activo: Este intento no fue guardado en tu historial ni alteró las preguntas vistas.';
  } else {
    S.toast = auto? 'Se acabó el tiempo: el intento se envió automáticamente y quedó guardado en tu historial.'
                  : 'Intento guardado en tu historial. Puedes volver a revisarlo cuando quieras.';
  }
  render();
}

function buildGuia69Attempt(){
  var rawList = window.GUIA_BANK_69 || [];
  var qs = rawList.map(function(q){
    var order = q.opts.map(function(_,ix){return ix;});
    return {
      src: {
        t: q.t,
        q: q.prompt,
        o: q.opts,
        a: q.ans,
        e: q.exp,
        ch: q.ch,
        maths: q.maths,
        imgs: q.imgs,
        __s: q.s,
        n: q.n,
        d: 'intermedio'
      },
      order: order,
      subj: q.s
    };
  });
  return {
    course: 'guia69',
    isGuia69: true,
    level: 'oficial',
    qs: qs,
    ans: qs.map(function(){return null;}),
    flags: qs.map(function(){return false;}),
    cur: 0,
    start: new Date(),
    end: null,
    finished: false,
    limitMs: 90 * 60000,
    historic: false
  };
}

function startGuia69Exam(){
  S.toast = null;
  S.area = 'guia';
  S.attempt = buildGuia69Attempt();
  S.attempt.área='guia';
  S.view = 'attempt';
  S.onePage = null;
  S.modal = null;
  render();
  startTimer();
  saveActive(); if(isPinAuthenticated()) pushCloudState();
}

function startAttempt(k){
  S.toast = null;
  S.course = k || S.course || 'mat';
  var chkEl = el('chkNoSave') || el('chkNoSavePreview');
  if(chkEl) S.noSave = chkEl.checked;
  S.attempt = buildAttempt(S.course);
  S.attempt.área=S.area;
  if(S.noSave) S.attempt.noSave = true;
  S.view = 'attempt'; S.onePage = null; S.modal = null;
  render(); startTimer();
  saveActive(); if(isPinAuthenticated()) pushCloudState();
}
function rerenderKeepScroll(){ var y = window.scrollY; S.scrollTop = false; render(); S.scrollTop = true; window.scrollTo(0,y); }
function inProgress(){ return !!(S.attempt && !S.attempt.finished && !S.attempt.historic); }
function blocked(){ if(inProgress()){ S.modal = 'exit'; render(); return true; } return false; }
function go(view){ S.modal = null; S.toast = null; S.view = view; render(); }

/* ---------- EVENTOS ---------- */
document.addEventListener('change', function(e){
  var t = e.target.closest && e.target.closest('[data-act="answer"]');
  if(t){ S.attempt.ans[+t.dataset.i] = +t.dataset.p; saveActive(); persistActiveThrottled(); rerenderKeepScroll(); }
  if(e.target && e.target.id==='impfile' && e.target.files && e.target.files[0]){
    var fr = new FileReader();
    fr.onload = function(ev){ importProgress(String(ev.target.result)); };
    fr.readAsText(e.target.files[0]);
  }
});
document.addEventListener('click', function(e){
  var t = e.target.closest('[data-act]');
  if(!t) return;
  var act = t.dataset.act;
  if(act==='closemodal' && t.classList.contains('modalbg') && e.target!==t) return;
  switch(act){
    case 'home': if(blocked()) break; stopTimer(); go('home'); break;
    case 'learn': if(blocked()) break; go('learn'); break;
    case 'guiawork': if(blocked()) break; go('guiawork'); break;
    case 'enterguia': enterGuia('home'); break;
case 'preview-prog-sim':
      if(blocked()) break;
      S.selectedSimId = t.dataset.sim;
      S.area = 'guia';
      go('sim_preview');
      break;
    case 'go-theory-deep':
      if(blocked()) break;
      var chId = t.dataset.ch || 'mat-L01';
      var anchor = t.dataset.anchor || '';
      var qix = parseInt(t.dataset.qix || '0', 10);
      if(S.attempt && S.view === 'review'){
        S.reviewReturn = { course: S.attempt.course, qIndex: qix, onePage: S.onePage };
      }
      S.area = 'guia';
      S.chapter = chId;
      S.view = 'chapter';
      render();
      if(anchor){
        setTimeout(function(){
          var targetEl = document.getElementById(anchor);
          if(targetEl) targetEl.scrollIntoView({behavior:'smooth', block:'start'});
        }, 120);
      }
      break;
    case 'return-to-review':
      if(blocked()) break;
      if(S.reviewReturn){
        var targetQix = S.reviewReturn.qIndex;
        S.view = 'review';
        if(S.reviewReturn.onePage != null){
          S.onePage = targetQix;
        }
        S.reviewReturn = null;
        render();
        setTimeout(function(){
          var qEl = document.querySelector('.que') || document.getElementById('timerbox');
          if(qEl) qEl.scrollIntoView({behavior:'smooth', block:'start'});
        }, 100);
      } else {
        S.view = 'review';
        render();
      }
      break;
    case 'setsimtab':
      S.simTab = t.dataset.tab || 'intermedio';
      render();
      break;
    case 'start-minisim':
      if(blocked()) break;
      var lid = t.dataset.lid;
      var countN = parseInt(t.dataset.n || '5', 10);
      var sampler = window.EPN_MAT_MINISIM || window.EPN_MAT_THEORY_MINISIM;
      var sampledQs = sampler ? sampler.sample(lid, countN) : [];
      if(!sampledQs.length){
        var mb = (window.EPN_MAT_MINIBANK && window.EPN_MAT_MINIBANK[lid]) ? window.EPN_MAT_MINIBANK[lid] : [];
        sampledQs = shuffle(mb.slice()).slice(0, countN);
      }
      var qs = sampledQs.map(function(q, idx){
        var raw = {
          q: q.prompt,
          o: q.opts ? q.opts.slice() : [],
          a: q.ans,
          e: q.exp,
          d: q.d,
          t: q.t,
          topics: q.topics ? q.topics.slice() : [],
          ch: q.ch || lid,
          id: q.id,
          imgs: q.imgs ? q.imgs.slice() : [],
          maths: q.maths ? q.maths.slice() : [],
          distractores: q.distractores ? q.distractores.slice() : [],
          theory: q.theory,
          __s: 'mat',
          __i: idx
        };
        var order = [0,1,2,3];
        if(cfg.shuffleOptions) order = shuffle(order);
        return { subj:'mat', order:order, src:raw };
      });
      S.area = 'guia';
      S.attempt = {
        course: lid,
        simId: lid,
        simTitle: 'Taller ' + lid + ' (' + countN + ' preg)',
        simLevel: 'mezclado',
        level: 'mezclado',
        area: 'guia',
        qs: qs,
        ans: qs.map(function(){ return null; }),
        flags: qs.map(function(){ return false; }),
        cur: 0,
        start: new Date(),
        finished: false,
        limitMs: countN * 2 * 60 * 1000,
        isGuia1000: true,
        isMiniSim: true
      };
      S.view = 'attempt';
      S.onePage = null;
      S.modal = null;
      render();
      startTimer();
      saveActive();
      if(isPinAuthenticated()) pushCloudState();
      break;
    case 'start-prog-sim':
      if(blocked()) break;
      var simId = t.dataset.sim;
      var chkEl = el('chkNoSave') || el('chkNoSavePreview');
      if(chkEl) S.noSave = chkEl.checked;
      var chkSeqEl = el('chkSequential');
      var isSequential = chkSeqEl ? chkSeqEl.checked : true;
      S.area = 'guia';
      S.attempt = buildProgrammedSimAttempt(simId, isSequential);
      if(S.noSave) S.attempt.noSave = true;
      S.view = 'attempt';
      S.onePage = null;
      S.modal = null;
      render();
      startTimer();
      saveActive();
      if(isPinAuthenticated()) pushCloudState();
      break;
    case 'start-guia-69':
      if(blocked()) break;
      startGuia69Exam();
      break;
    case 'start-guia-mat30':
      if(blocked()) break;
      S.area='guia'; S.attempt=buildGuia1000Attempt('guia_mat30'); S.attempt.área='guia'; S.view='attempt'; S.onePage=null; S.modal=null; render(); startTimer(); saveActive(); if(isPinAuthenticated()) pushCloudState();
      break;
    case 'start-guia-fql120':
      if(blocked()) break;
      S.area='guia'; S.attempt=buildGuia1000Attempt('guia_fql120'); S.attempt.área='guia'; S.view='attempt'; S.onePage=null; S.modal=null; render(); startTimer(); saveActive(); if(isPinAuthenticated()) pushCloudState();
      break;
    case 'start-guia-fis':
      if(blocked()) break;
      S.area='guia'; S.attempt=buildGuia1000Attempt('guia_fis'); S.attempt.área='guia'; S.view='attempt'; S.onePage=null; S.modal=null; render(); startTimer(); saveActive(); if(isPinAuthenticated()) pushCloudState();
      break;
    case 'start-guia-qui':
      if(blocked()) break;
      S.area='guia'; S.attempt=buildGuia1000Attempt('guia_qui'); S.attempt.área='guia'; S.view='attempt'; S.onePage=null; S.modal=null; render(); startTimer(); saveActive(); if(isPinAuthenticated()) pushCloudState();
      break;
    case 'start-guia-len':
      if(blocked()) break;
      S.area='guia'; S.attempt=buildGuia1000Attempt('guia_len'); S.attempt.área='guia'; S.view='attempt'; S.onePage=null; S.modal=null; render(); startTimer(); saveActive(); if(isPinAuthenticated()) pushCloudState();
      break;
    case 'go-theory-chapter':
      if(blocked()) break;
      var chId = t.dataset.ch || 'm1';
      S.area = 'guia';
      S.view = 'chapter';
      S.chapter = chId;
      render();
      break;
    case 'togglearea':
      if(blocked()) break;
      if(isGuia()) exitGuia(); else enterGuia('home');
      break;
    case 'course':
      if(blocked()) break;
      // cursos guía 1000 requieren área guía
      var cc = t.dataset.c || 'mat';
      if(GUIA_COURSES.indexOf(cc)>=0){
        S.area='guia'; S.course=cc; go('course');
      } else {
        S.course=cc; go('course');
      }
      break;
    case 'enterguialearn': enterGuia('learn'); break;
    case 'exitguia': exitGuia(); break;
    case 'guiaplaceholder':
      S.toast = 'Taller \u00ab'+(t.dataset.id||'')+'\u00bb a\u00fan no cableado. Usa Aprender para la teor\u00eda; el banco de preguntas vendr\u00e1 despu\u00e9s.';
      render(); break;
    case 'stats': if(blocked()) break; go('stats'); break;
    case 'history': if(blocked()) break; S.histTab='all'; go('history'); break;
    case 'histtab': S.histTab = t.dataset.t; render(); break;
    case 'histtabgo': if(blocked()) break; S.histTab = t.dataset.t; go('history'); break;
    case 'chapter':
      if(blocked()) break;
      S.chapter = t.dataset.id; go('chapter');
      try{
        UI.read = UI.read || {};
        UI.read[S.chapter] = 1;
        saveUI();
      }catch(err){}
      var hh = t.dataset.h;
      if(hh) setTimeout(function(){ var n2 = document.getElementById(hh); if(n2) n2.scrollIntoView({behavior:'smooth', block:'start'}); }, 80);
      break;
    case 'exportjson': exportProgress(); break;
    case 'importjson': var fi = el('impfile'); if(fi) fi.click(); break;
    case 'reshuffle':
      var ck = t.dataset.c || S.course;
      var nts = makePlan(ck);
      S.toast = 'Preguntas barajadas para el pr\u00f3ximo intento de '+COURSES[ck].short+'.'+(nts.length? ' '+nts.join(' '):'');
      render(); break;
    case 'clearplan': clearPlan(t.dataset.c || S.course); S.toast = null; render(); break;
    case 'anchor': var anchorEl = document.getElementById(t.dataset.id); if(anchorEl) anchorEl.scrollIntoView({behavior:'smooth',block:'start'}); break;
    case 'stayin': S.modal = null; render(); break;
    case 'forcefinish': finishAttempt(false); break;
    case 'toggledrawer': UI.drawer = !UI.drawer; saveUI(); rerenderKeepScroll(); break;
    case 'cfg': S.modal = 'cfg'; render(); break;
    case 'closemodal': ADMIN_SESSION = false; S.modal = null; render(); break;
    case 'setlevel': cfg.level = t.dataset.l; saveCfg(); rerenderKeepScroll(); break;
        case 'verifypin':
      var p = (el('pininput')||{}).value || '';
      if(verifyPin(p)){
        S.modal = null;
        cloudSync();
        render();
      } else {
        var errEl = el('pinerr');
        if(errEl) errEl.style.display = 'block';
      }
      break;
            case 'openadmin': ADMIN_SESSION = false; S.modal = 'admin'; render(); break;
    case 'verifyadminpin':
      var ap = (el('adminpininput')||{}).value || '';
      if(verifyAdminPin(ap)){
        S.modal = 'admin';
        render();
      } else {
        var aErr = el('adminpinerr');
        if(aErr) aErr.style.display = 'block';
      }
      break;
    case 'swapplanswap':
      swapPlanQuestion(S.course||'mat', +t.dataset.ix);
      render(); break;
    case 'swaplanremove':
      removePlanQuestion(S.course||'mat', +t.dataset.ix);
      render(); break;
    case 'savecfg':
      var cnt = Math.max(1, Math.min(100, +el('cfgcount').value||15));
      cfg.count = cnt;
      if(el('cfgsetdefault') && el('cfgsetdefault').checked) {
        DEFAULT_CFG.count = cnt;
      }
      cfg.minutes = Math.max(1, Math.min(300, +el('cfgmin').value||30));
      cfg.mixMinutes = Math.max(1, Math.min(300, +el('cfgmixmin').value||90));
      cfg.mixCount = Math.max(4, Math.min(120, +el('cfgmixcount').value||20));
      // guarda config guía 1000 por simulador
      cfg.guiaCfg = cfg.guiaCfg || {guia_mat30:{n:30,min:90}, guia_fql120:{n:60,min:120}, guia_fis:{n:20,min:40}, guia_qui:{n:20,min:40}, guia_len:{n:20,min:40}};
      GUIA_COURSES.forEach(function(k){
        var nEl=el('gc-n-'+k), mEl=el('gc-min-'+k);
        if(nEl) cfg.guiaCfg[k].n = Math.max(5, Math.min(60, parseInt(nEl.value,10)||countFor(k)));
        if(mEl) cfg.guiaCfg[k].min = Math.max(10, Math.min(180, parseInt(mEl.value,10)||minutesFor(k)));
      });
      cfg.student = el('cfgname').value.trim()||DEFAULT_CFG.student;
      cfg.noRepeat = el('cfgnr').checked;
      cfg.shuffleQuestions = el('cfgsq').checked;
      cfg.shuffleOptions = el('cfgso').checked;
      cfg.showFeedback = el('cfgfb').checked;
      saveCfg(); S.modal = null;
      if(S.attempt && !S.attempt.finished) S.attempt.limitMs = minutesFor(S.attempt.course)*60000;
      render(); break;
    case 'resetseen':
      SUBJ.forEach(function(k){ SEEN[k]=[]; SEENSET[k]={}; }); saveSeen();
      S.modal = null; S.toast = 'Se reinició el registro de preguntas vistas: todo el banco vuelve a estar disponible.';
      render(); break;
    case 'reset-guia-mat':
      if(!confirm('¿Reiniciar Guía MAT a primer intento?\n\nSe borrarán:\n• Vistas de MAT (SEEN1000.mat)\n• Intentos guardados de Matemáticas/GUIA_MAT30\nNo se toca el aula Barreno ni FIS/QUI/LEN de Guía.')) break;
      SEEN1000.mat=[]; SEEN1000SET.mat={}; saveSeen1000();
      // purga HIST solo MAT/guía_mat30 (marca deleted)
      HIST.forEach(function(r){ if(r.course==='mat' || r.course==='guia_mat30') r.deleted=true; }); saveHist();
      // opcional: también limpia SEEN legacy mat para espejo limpio
      SEEN.mat=[]; SEENSET.mat={}; saveSeen();
      clearActive();
      // nube
      try{ pushCloudState(); }catch(e){}
      S.toast='Guía MAT reiniciada: ya estás en primer intento. ¡Listo para empezar de cero!';
      render(); break;
    case 'clearhist':
      HIST.forEach(function(r){ r.deleted = true; }); saveHist(); S.modal = null;
      S.toast = 'Todos los intentos quedaron marcados cómo eliminados: ya no cuentan en las estad\u00edsticas, pero puedes seguir consult\u00e1ndolos.'; render(); break;
    case 'delrec':
      HIST.forEach(function(r){ if(r.id===t.dataset.id) r.deleted = true; }); saveHist();
      S.toast = 'Intento eliminado: queda marcado cómo eliminado y deja de contar en las estad\u00edsticas.'; render(); break;
    case 'restrec':
      HIST.forEach(function(r){ if(r.id===t.dataset.id) delete r.deleted; }); saveHist();
      S.toast = 'Intento restaurado: vuelve a contar en tus estad\u00edsticas.'; render(); break;
    case 'openrec':
      var rec = HIST.filter(function(r){ return r.id === t.dataset.id; })[0];
      if(rec){
        if(blocked()) break;
        var aHist = attemptFromRecord(rec);
        S.attempt = aHist; S.course = rec.course; S.onePage = null; S.view = 'review';
        // persiste revisión histórica para F5 profesional (no cuenta cómo intento activo)
        try{
          var qsSerHist = aHist.qs.map(function(q){ var s=q.src; return { subj:q.subj, order:q.order.slice(), src:{ t:s.t, q:s.q, o:s.o.slice(), a:s.a, e:s.e, ch:s.ch, maths:(s.maths||[]).slice(), imgs:(s.imgs||[]).slice(), __s:s.__s, n:s.n, d:s.d, topics:(s.topics||[]).slice(), id:s.id, __i:s.__i } }; });
          localStorage.setItem(ACTIVE_KEY, JSON.stringify({ course:aHist.course, level:aHist.level, area:(aHist.area||S.area), qs:qsSerHist, ans:aHist.ans.slice(), flags:aHist.flags.slice(), cur:aHist.cur, startMs:aHist.start.getTime(), endMs:(aHist.end?aHist.end.getTime():null), limitMs:aHist.limitMs, isGuia1000:!!aHist.isGuia1000, isGuia69:!!aHist.isGuia69, view:'review', onePage:null, finished:true, historic:true }));
        }catch(e){}
        S.toast = rec.deleted? 'Est\u00e1s viendo un intento eliminado: se conserva para consulta pero no cuenta en las estad\u00edsticas.' : null;
        render();
      }
      break;
    case 'start': if(blocked()) break; startAttempt(S.course); break;
    case 'quickstart': if(blocked()) break; startAttempt(t.dataset.c); break;
    case 'next': S.attempt.cur = Math.min(S.attempt.qs.length-1, S.attempt.cur+1); if(S.attempt) S.attempt.cur=S.attempt.cur; if(S.attempt) S.attempt.view='attempt'; saveActive(); persistActiveThrottled(); render(); break;
    case 'prev': S.attempt.cur = Math.max(0, S.attempt.cur-1); if(S.attempt) S.attempt.view='attempt'; saveActive(); persistActiveThrottled(); render(); break;
    case 'goto':
      var i = +t.dataset.i;
      if(S.view==='review'){ if(S.onePage!=null){ S.onePage = i; S.attempt.view='review'; S.attempt.cur=i; saveActive(); render(); } else { var nodes = document.querySelectorAll('.main .qué'); if(nodes[i]) nodes[i].scrollIntoView({behavior:'smooth',block:'center'}); } }
      else { S.attempt.cur = i; S.attempt.view='attempt'; S.view = 'attempt'; saveActive(); persistActiveThrottled(); render(); }
      break;
    case 'flag': S.attempt.flags[+t.dataset.i] = !S.attempt.flags[+t.dataset.i]; saveActive(); persistActiveThrottled(); rerenderKeepScroll(); break;
    case 'summary': S.view = 'summary'; if(S.attempt) S.attempt.view='summary'; saveActive(); persistActiveThrottled(); render(); break;
    case 'back': S.view = 'attempt'; if(S.attempt) S.attempt.view='attempt'; saveActive(); persistActiveThrottled(); render(); break;
    case 'confirmsubmit': S.modal = 'confirm'; render(); break;
    case 'submit': finishAttempt(false); break;
    case 'showall': S.onePage = (S.onePage==null? 0 : null); if(S.attempt) S.attempt.onePage=S.onePage; saveActive(); persistActiveThrottled(); render(); break;
    case 'rnext': S.onePage = Math.min(S.attempt.qs.length-1, S.onePage+1); if(S.attempt) S.attempt.onePage=S.onePage; saveActive(); persistActiveThrottled(); render(); break;
    case 'rprev': S.onePage = Math.max(0, S.onePage-1); if(S.attempt) S.attempt.onePage=S.onePage; saveActive(); persistActiveThrottled(); render(); break;
    case 'finishreview': try{ localStorage.removeItem(ACTIVE_KEY); }catch(e){} if(isPinAuthenticated()){ try{ pushCloudState(); }catch(e2){} } S.onePage = null; if(S.attempt) S.attempt.view=null; go(S.attempt && S.attempt.historic? 'history' : 'course'); break;
    case 'openrecdel': break;
  }
});
window.addEventListener('beforeunload', function(e){ if(inProgress()){ try{ saveActive(); if(isPinAuthenticated()){ navigator.sendBeacon && navigator.sendBeacon('/api/sync?pin='+SECURITY_PIN, JSON.stringify({data:{hist:HIST, seen:SEEN, seen1000:SEEN1000, cfg:cfg, active:serializeAttempt(S.attempt)}})); } }catch(err){} e.preventDefault(); e.returnValue=''; } });
window.addEventListener('visibilitychange', function(){ if(document.visibilityState==='hidden' && S.attempt && !S.attempt.finished && !S.attempt.historic){ saveActive(); if(isPinAuthenticated()) pushCloudState(); } });
// Hook global: cada interacción relevante persiste el intento (F5-safe, sin coste perceptible)
document.addEventListener('click', function(e){
  var t=e.target.closest && e.target.closest('[data-act]');
  if(!t || !S.attempt || S.attempt.finished || S.attempt.historic) return;
  var a=t.dataset.act;
  if(a==='answer' || a==='flag' || a==='goto' || a==='next' || a==='prev' || a==='rnext' || a==='rprev' || a==='showall'){ saveActive(); persistActiveThrottled(); }
}, true);
window.addEventListener('hashchange', function(){
  // si hay intento activo/restaurado, no dejes qué un hash vacío te mande a home (F5 vacío profesional)
  var h = String(location.hash||'');
  if(!h && S.attempt && !S.attempt.historic){
    // revisa si es revisión o activo: quédate dónde estás
    syncHash(); return;
  }
  applyHashRoute(); render();
});
// Restauración al cargar: orden profesional — 1) si hay hash explícito, respétalo; 2) intenta LS; 3) nube
// Boot una sola vez: previene doble render y qué applyHashRoute pise intento restaurado
(function bootOnce(){
  registerProgrammedSimsInCourses();
  var hadHash = !!String(location.hash||'');
  try{
    // intenta restaurar intento/revisión desde LS primero (F5 profesional)
    var restored = false;
    try{ restored = restoreActiveAttempt(); }catch(e){}
    if(restored){
      if(!S.attempt.finished) startTimer();
      // si había hash explícito (p.ej. deep link), el hash gana solo si no es intento activo sin hash
      if(hadHash){
        var hashViewBefore = S.view;
        applyHashRoute();
        // si applyHashRoute quiso mandar a home sin motivo, preserva intento restaurado
        if(S.attempt && !S.attempt.historic && (S.view==='home')){
          S.view = hashViewBefore;
        }
      }
      // asegura hash coherente con estado restaurado (intento/resumen/revisión)
      syncHash();
      if(S.attempt && !S.attempt.finished && S.view==='attempt') startTimer();
      return;
    }
    // sin LS: respeta hash normal
    applyHashRoute();
    // sin LS pero con PIN, intenta nube cross-device (asíncrono)
    if(!hadHash && isPinAuthenticated()){
      // no pisa vista ya establecida por hash
      cloudSync();
    } else if(hadHash && isPinAuthenticated() && !S.attempt){
      cloudSync();
    }
  }catch(e){
    try{ applyHashRoute(); }catch(e2){}
  }
})();
render();