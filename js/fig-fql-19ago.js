/* Figuras pedagógicas SVG para el Simulador Día 2 — 19 Agosto EPN.
   window.FIG_19AGO */
(function () {
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function open(w, h) {
    return '<svg width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h +
      '" xmlns="http://www.w3.org/2000/svg" font-family="Georgia, serif" overflow="visible">' +
      '<defs><marker id="f19-ah" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">' +
      '<path d="M0,0 L7,3 L0,6 z" fill="#0e2a47"/></marker>' +
      '<marker id="f19-ah-red" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">' +
      '<path d="M0,0 L7,3 L0,6 z" fill="#b3261e"/></marker>' +
      '</defs>';
  }
  function T(x, y, s, o) {
    o = o || {};
    return '<text x="' + x + '" y="' + y + '" fill="' + (o.fill || '#0e2a47') + '" font-size="' + (o.size || 13) +
      '" text-anchor="' + (o.anchor || 'start') + '"' + (o.italic ? ' font-style="italic"' : '') +
      (o.bold ? ' font-weight="700"' : '') + '>' + esc(s) + '</text>';
  }
  function L(x1, y1, x2, y2, o) {
    o = o || {};
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + (o.stroke || '#1d2125') +
      '" stroke-width="' + (o.w || 1.5) + '"' + (o.dash ? ' stroke-dasharray="4 3"' : '') +
      (o.arrow ? ' marker-end="' + (o.stroke === '#b3261e' ? 'url(#f19-ah-red)' : 'url(#f19-ah)') + '"' : '') + '/>';
  }
  function poly(pts, fill) {
    return '<polygon points="' + pts + '" fill="' + (fill || '#f7fbff') + '" stroke="#1d2125" stroke-width="1.6"/>';
  }
  function circ(cx, cy, r, fill, stroke) {
    return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + (fill || '#0f6cbf') +
      '" stroke="' + (stroke || '#0e2a47') + '" stroke-width="1.2"/>';
  }
  function rect(x, y, w, h, fill, rx) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (rx || 4) +
      '" fill="' + (fill || '#fff') + '" stroke="#1d2125" stroke-width="1.3"/>';
  }

  var FIG = {};

  // 1. Avión soltando paquete (trayectoria parabólica)
  FIG['fql19-avion-bola'] = function () {
    var s = open(520, 200);
    s += rect(0, 0, 520, 200, '#f8fafc', 6);
    s += L(40, 170, 480, 170, { stroke: '#475569', w: 2 });
    s += T(260, 190, 'Suelo horizontal', { size: 12, anchor: 'middle', fill: '#475569' });
    // Avión
    s += rect(60, 40, 80, 24, '#cbd5e1', 4);
    s += poly('140,52 170,52 140,40', '#94a3b8');
    s += L(140, 52, 210, 52, { arrow: true, stroke: '#0284c7', w: 2.2 });
    s += T(215, 56, 'v_avión', { italic: true, bold: true, size: 12, fill: '#0284c7' });
    // Parábola
    s += '<path d="M 100,64 Q 240,70 380,170" fill="none" stroke="#b3261e" stroke-width="2" stroke-dasharray="5 4"/>';
    s += circ(100, 64, 5, '#b3261e');
    s += circ(240, 100, 6, '#b3261e');
    s += circ(380, 170, 7, '#b3261e');
    s += T(240, 90, 'Trayectoria parabólica hacia adelante', { size: 12, anchor: 'middle', fill: '#b3261e', bold: true });
    s += '</svg>';
    return s;
  };

  // 2. Choque de bloques (3ra Ley de Newton)
  FIG['fql19-choque-bloques'] = function () {
    var s = open(500, 180);
    s += rect(0, 0, 500, 180, '#f8fafc', 6);
    s += L(40, 140, 460, 140, { stroke: '#475569', w: 2 });
    // Bloque A
    s += rect(140, 80, 70, 60, '#bae6fd', 4);
    s += T(175, 115, 'Bloque A', { size: 13, bold: true, anchor: 'middle' });
    // Bloque B
    s += rect(210, 95, 50, 45, '#fed7aa', 4);
    s += T(235, 122, 'Bloque B', { size: 11, bold: true, anchor: 'middle' });
    // Fuerzas del impacto
    s += L(210, 70, 270, 70, { arrow: true, stroke: '#b3261e', w: 2.2 });
    s += T(275, 74, 'F_A sobre B', { size: 11, bold: true, fill: '#b3261e' });
    s += L(210, 70, 150, 70, { arrow: true, stroke: '#b3261e', w: 2.2 });
    s += T(145, 74, 'F_B sobre A', { size: 11, bold: true, fill: '#b3261e', anchor: 'end' });
    s += T(250, 165, '|F_A sobre B| = |F_B sobre A| (Acción y Reacción)', { size: 12, bold: true, anchor: 'middle', fill: '#0e2a47' });
    s += '</svg>';
    return s;
  };

  // 3. Tiro vertical (P, Q, R, T)
  FIG['fql19-tiro-vertical'] = function () {
    var s = open(360, 260);
    s += rect(0, 0, 360, 260, '#f8fafc', 6);
    s += L(180, 220, 180, 40, { stroke: '#94a3b8', w: 1.5, dash: true });
    // Puntos
    s += circ(180, 220, 5, '#0284c7'); s += T(200, 225, 'P (Lanzamiento v0)', { size: 12, bold: true });
    s += circ(180, 160, 5, '#0284c7'); s += T(200, 165, 'Q (Intermedio)', { size: 12, bold: true });
    s += circ(180, 100, 5, '#0284c7'); s += T(200, 105, 'R', { size: 12, bold: true });
    s += circ(180, 40, 6, '#b3261e'); s += T(200, 45, 'T (Ápice: v=0, a=g hacia abajo)', { size: 12, bold: true, fill: '#b3261e' });
    // Flecha gravedad
    s += L(140, 80, 140, 140, { arrow: true, stroke: '#b3261e', w: 2 });
    s += T(130, 115, 'g', { bold: true, italic: true, fill: '#b3261e', anchor: 'end' });
    s += '</svg>';
    return s;
  };

  // 4. Péndulo simple oscilando
  FIG['fql19-pendulo'] = function () {
    var s = open(440, 220);
    s += rect(0, 0, 440, 220, '#f8fafc', 6);
    s += L(120, 20, 320, 20, { stroke: '#334155', w: 3 }); // Techo
    s += circ(220, 20, 4, '#334155');
    // Cuerdas en A, C, B
    s += L(220, 20, 120, 130, { stroke: '#94a3b8', w: 1.2, dash: true });
    s += circ(120, 130, 9, '#cbd5e1'); s += T(105, 150, 'A (v=0, Ep max)', { size: 11, bold: true });
    s += L(220, 20, 320, 130, { stroke: '#94a3b8', w: 1.2, dash: true });
    s += circ(320, 130, 9, '#cbd5e1'); s += T(310, 150, 'B (v=0, Ep max)', { size: 11, bold: true });
    s += L(220, 20, 220, 170, { stroke: '#0e2a47', w: 1.8 });
    s += circ(220, 170, 12, '#b3261e'); s += T(220, 200, 'C (Punto más bajo: Ec MÁXIMA)', { size: 12, bold: true, fill: '#b3261e', anchor: 'middle' });
    s += '<path d="M 120,130 Q 220,180 320,130" fill="none" stroke="#475569" stroke-width="1.2" stroke-dasharray="3 3"/>';
    s += '</svg>';
    return s;
  };

  // 5. Arco y flecha
  FIG['fql19-arco-flecha'] = function () {
    var s = open(460, 180);
    s += rect(0, 0, 460, 180, '#f8fafc', 6);
    // Arco curvado
    s += '<path d="M 160,30 Q 240,90 160,150" fill="none" stroke="#78350f" stroke-width="5"/>';
    s += L(160, 30, 100, 90, { stroke: '#64748b', w: 1.5 });
    s += L(160, 150, 100, 90, { stroke: '#64748b', w: 1.5 });
    // Flecha
    s += L(100, 90, 280, 90, { arrow: true, stroke: '#0284c7', w: 2.5 });
    s += T(290, 95, 'Flecha (Energía Cinética)', { size: 12, bold: true, fill: '#0284c7' });
    s += T(70, 95, 'Ep elástica', { size: 11, bold: true, fill: '#78350f', anchor: 'end' });
    s += T(230, 165, 'Energía potencial elástica → Energía cinética', { size: 12, bold: true, anchor: 'middle' });
    s += '</svg>';
    return s;
  };

  // 6. Rampa en V de Galileo
  FIG['fql19-rampa-galileo'] = function () {
    var s = open(500, 200);
    s += rect(0, 0, 500, 200, '#f8fafc', 6);
    s += poly('60,50 240,160 420,50 420,170 60,170', '#e2e8f0');
    s += L(60, 50, 240, 160, { stroke: '#0e2a47', w: 2.5 });
    s += L(240, 160, 420, 50, { stroke: '#0e2a47', w: 2.5 });
    s += circ(68, 44, 9, '#b3261e'); s += T(68, 30, 'Inicio (h)', { size: 11, bold: true, anchor: 'middle' });
    s += circ(412, 44, 9, '#16a34a'); s += T(412, 30, 'Llega a misma h', { size: 11, bold: true, anchor: 'middle', fill: '#16a34a' });
    s += L(40, 50, 440, 50, { stroke: '#94a3b8', dash: true });
    s += T(250, 185, 'Sin fricción: sube hasta la misma altura inicial h', { size: 12, bold: true, anchor: 'middle', fill: '#0e2a47' });
    s += '</svg>';
    return s;
  };

  // 7. Caja con rozamiento
  FIG['fql19-caja-roce'] = function () {
    var s = open(440, 180);
    s += rect(0, 0, 440, 180, '#f8fafc', 6);
    s += L(40, 130, 400, 130, { stroke: '#475569', w: 2 });
    s += rect(170, 70, 80, 60, '#fed7aa', 4);
    s += T(210, 105, 'Caja', { size: 13, bold: true, anchor: 'middle' });
    s += L(250, 100, 340, 100, { arrow: true, stroke: '#0284c7', w: 2.5 });
    s += T(345, 104, 'F aplicada', { size: 11, bold: true, fill: '#0284c7' });
    s += L(170, 100, 100, 100, { arrow: true, stroke: '#b3261e', w: 2.5 });
    s += T(95, 104, 'f_k (fricción)', { size: 11, bold: true, fill: '#b3261e', anchor: 'end' });
    s += T(220, 160, 'Si v = cte ⇒ F = f_k  |  Si 2F ⇒ Rapidez creciente (acelera)', { size: 12, bold: true, anchor: 'middle' });
    s += '</svg>';
    return s;
  };

  // 8. Rampa vs Vertical
  FIG['fql19-caja-rampa-vs-vertical'] = function () {
    var s = open(520, 200);
    s += rect(0, 0, 520, 200, '#f8fafc', 6);
    // Vertical
    s += rect(60, 120, 45, 40, '#bae6fd', 3);
    s += L(82, 120, 82, 40, { arrow: true, stroke: '#0284c7', w: 2 });
    s += T(82, 180, 'Método 1: Vertical\nW = MgH (Mayor F, menor d)', { size: 11, bold: true, anchor: 'middle' });
    // Rampa
    s += poly('240,160 460,60 460,160', '#e2e8f0');
    s += rect(320, 105, 40, 35, '#fed7aa', 3);
    s += L(350, 110, 420, 78, { arrow: true, stroke: '#0284c7', w: 2 });
    s += T(360, 180, 'Método 2: Rampa\nW = MgH (Menor F, mayor d)', { size: 11, bold: true, anchor: 'middle' });
    s += '</svg>';
    return s;
  };

  // 9. Cuerda tirada por dos personas
  FIG['fql19-cuerda-tirar'] = function () {
    var s = open(460, 150);
    s += rect(0, 0, 460, 150, '#f8fafc', 6);
    s += L(100, 75, 360, 75, { stroke: '#78350f', w: 3 });
    s += rect(60, 55, 40, 40, '#bae6fd', 4); s += T(80, 80, 'Juan', { size: 11, bold: true, anchor: 'middle' });
    s += rect(360, 55, 40, 40, '#fed7aa', 4); s += T(380, 80, 'Pedro', { size: 11, bold: true, anchor: 'middle' });
    s += L(100, 50, 160, 50, { arrow: true, stroke: '#b3261e', w: 2 }); s += T(165, 54, 'T', { bold: true, fill: '#b3261e' });
    s += L(360, 50, 300, 50, { arrow: true, stroke: '#b3261e', w: 2 }); s += T(295, 54, 'T', { bold: true, fill: '#b3261e', anchor: 'end' });
    s += T(230, 125, 'Fuerza de Juan = Tensión = Fuerza de Pedro', { size: 12, bold: true, anchor: 'middle' });
    s += '</svg>';
    return s;
  };

  // 10. Disco 4 fuerzas
  FIG['fql19-puck-4fuerzas'] = function () {
    var s = open(360, 240);
    s += rect(0, 0, 360, 240, '#f8fafc', 6);
    s += circ(180, 120, 24, '#334155', '#0e2a47');
    s += T(180, 125, 'Disco', { fill: '#fff', size: 11, bold: true, anchor: 'middle' });
    // 4 fuerzas
    s += L(180, 96, 180, 30, { arrow: true, stroke: '#0284c7', w: 2 }); s += T(185, 40, 'F1 (Norte)', { size: 11, bold: true, fill: '#0284c7' });
    s += L(180, 144, 180, 210, { arrow: true, stroke: '#0284c7', w: 2 }); s += T(185, 205, 'F3 (Sur)', { size: 11, bold: true, fill: '#0284c7' });
    s += L(156, 120, 70, 120, { arrow: true, stroke: '#0284c7', w: 2 }); s += T(65, 115, 'F2 (Oeste)', { size: 11, bold: true, fill: '#0284c7', anchor: 'end' });
    s += L(204, 120, 290, 120, { arrow: true, stroke: '#0284c7', w: 2 }); s += T(295, 115, 'F4 (Este)', { size: 11, bold: true, fill: '#0284c7' });
    s += T(180, 230, 'v = cte ⇒ F4 = F2  y  F1 = F3', { size: 12, bold: true, anchor: 'middle' });
    s += '</svg>';
    return s;
  };

  // 11. Poste y sombra
  FIG['fql19-poste-sombra'] = function () {
    var s = open(420, 200);
    s += rect(0, 0, 420, 200, '#f8fafc', 6);
    s += L(40, 160, 380, 160, { stroke: '#475569', w: 2 });
    s += L(120, 160, 120, 40, { stroke: '#78350f', w: 6 }); // Poste
    s += T(105, 95, 'H', { size: 14, bold: true, italic: true, anchor: 'end' });
    s += L(120, 40, 320, 160, { stroke: '#eab308', w: 2, dash: true }); // Rayo
    s += L(120, 160, 320, 160, { stroke: '#1e293b', w: 4 }); // Sombra
    s += T(220, 180, 'Sombra S', { size: 12, bold: true, anchor: 'middle' });
    s += '<path d="M 280,160 A 40,40 0 0,0 292,143" fill="none" stroke="#b3261e" stroke-width="1.8"/>';
    s += T(270, 150, 'α', { size: 13, bold: true, fill: '#b3261e' });
    s += T(230, 25, 'tan(α) = H / S ⇒ H = S · tan(α)', { size: 12, bold: true, fill: '#0e2a47', anchor: 'middle' });
    s += '</svg>';
    return s;
  };

  // 12. Pista de patinaje A-E
  FIG['fql19-pista-patinaje'] = function () {
    var s = open(520, 220);
    s += rect(0, 0, 520, 220, '#f8fafc', 6);
    s += '<path d="M 60,40 Q 140,180 260,180 T 460,80" fill="none" stroke="#0e2a47" stroke-width="3"/>';
    s += circ(60, 40, 7, '#0284c7'); s += T(60, 25, 'A (Ep max)', { size: 11, bold: true, anchor: 'middle' });
    s += circ(160, 140, 6, '#0284c7'); s += T(180, 135, 'B', { size: 11, bold: true });
    s += circ(260, 180, 8, '#b3261e'); s += T(260, 205, 'C (Fondo: Ec MÁXIMA)', { size: 12, bold: true, fill: '#b3261e', anchor: 'middle' });
    s += circ(360, 130, 6, '#0284c7'); s += T(375, 125, 'D', { size: 11, bold: true });
    s += circ(460, 80, 7, '#0284c7'); s += T(460, 65, 'E', { size: 11, bold: true, anchor: 'middle' });
    s += '</svg>';
    return s;
  };

  window.FIG_19AGO = FIG;
})();
