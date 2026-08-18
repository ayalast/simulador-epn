/* Figuras del intensivo. Puntos reales; fracciones apiladas; márgenes para que nada se salga. */
(function () {
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function open(w, h) {
    return '<svg width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h +
      '" xmlns="http://www.w3.org/2000/svg" font-family="Georgia, serif" overflow="visible">' +
      '<defs><marker id="ff-ah" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">' +
      '<path d="M0,0 L7,3 L0,6 z" fill="#0e2a47"/></marker></defs>';
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
      (o.arrow ? ' marker-end="url(#ff-ah)"' : '') + '/>';
  }
  function poly(pts, fill) {
    return '<polygon points="' + pts + '" fill="' + (fill || '#f7fbff') + '" stroke="#1d2125" stroke-width="1.6"/>';
  }
  function square(x, y, dx, dy) {
    return '<path d="M' + x + ',' + y + ' L' + (x + dx) + ',' + y + ' L' + (x + dx) + ',' + (y + dy) +
      '" fill="none" stroke="#1d2125" stroke-width="1.2"/>';
  }
  function frac(cx, cy, num, den, o) {
    o = o || {};
    var size = o.size || 12;
    var fill = o.fill || '#0e2a47';
    var w = Math.max(String(num).length, String(den).length) * size * 0.58 + 12;
    w = Math.max(w, 24);
    return T(cx, cy - 6, num, { size: size, anchor: 'middle', bold: true, fill: fill }) +
      L(cx - w / 2, cy, cx + w / 2, cy, { stroke: fill, w: 1.3 }) +
      T(cx, cy + size + 2, den, { size: size, anchor: 'middle', bold: true, fill: fill });
  }

  var FIG = {};

  FIG['cong-acb-dfe'] = function () {
    var s = open(460, 228);
    var A = [78, 164], B = [186, 164], C = [132, 52];
    var D = [278, 164], E = [386, 164], F = [332, 52];
    s += poly([C, A, B].join(' '));
    s += poly([F, D, E].join(' '));
    s += T(A[0] - 18, A[1] + 18, 'A', { italic: true, bold: true, fill: '#b3261e', size: 16 });
    s += T(B[0] + 8, B[1] + 18, 'B', { italic: true, bold: true, fill: '#0f6cbf', size: 16 });
    s += T(C[0] - 5, C[1] - 10, 'C', { italic: true, bold: true, size: 16 });
    s += T(D[0] - 18, D[1] + 18, 'D', { italic: true, bold: true, fill: '#b3261e', size: 16 });
    s += T(E[0] + 8, E[1] + 18, 'E', { italic: true, bold: true, fill: '#0f6cbf', size: 16 });
    s += T(F[0] - 5, F[1] - 10, 'F', { italic: true, bold: true, size: 16 });
    s += T(230, 118, '≅', { size: 26, bold: true, anchor: 'middle' });
    s += T(230, 214, 'A viaja con D   ·   C viaja con F   ·   B viaja con E', {
      size: 13, anchor: 'middle', bold: true
    });
    return s + '</svg>';
  };

  FIG['cong-rules'] = function () {
    var s = open(460, 188);
    var cards = [
      { x: 12, t: 'SÍ (3)', c: '#1f7a3f', lines: ['LLL   LAL   ALA', 'En LAL el ángulo', 'va EN MEDIO'] },
      { x: 166, t: 'NO', c: '#b3261e', lines: ['LLA  (ambiguo)', 'AAA  (solo ~)'] },
      { x: 320, t: 'LETRAS', c: '#0f6cbf', lines: ['El orden fija', 'quién va', 'con quién'] }
    ];
    cards.forEach(function (k) {
      s += '<rect x="' + k.x + '" y="12" width="128" height="164" rx="10" fill="#fff" stroke="' + k.c + '" stroke-width="1.6"/>';
      s += '<rect x="' + k.x + '" y="12" width="128" height="32" rx="10" fill="' + k.c + '"/>';
      s += '<rect x="' + k.x + '" y="28" width="128" height="16" fill="' + k.c + '"/>';
      s += T(k.x + 64, 34, k.t, { fill: '#fff', bold: true, anchor: 'middle', size: 13 });
      k.lines.forEach(function (line, i) {
        s += T(k.x + 64, 72 + i * 28, line, { anchor: 'middle', size: 12, bold: true });
      });
    });
    return s + '</svg>';
  };

  FIG['sohcahtoa'] = function () {
    var s = open(430, 292);
    var A = [70, 164], B = [270, 164], C = [70, 44];
    s += poly([C, A, B].join(' '));
    s += square(70, 164, 16, -16);
    s += T(22, 120, 'opuesto', { fill: '#b3261e', bold: true, size: 13 });
    s += T(132, 186, 'adyacente', { fill: '#0f6cbf', bold: true, size: 13 });
    s += T(172, 92, 'hipotenusa', { fill: '#1f7a3f', bold: true, size: 13 });
    s += T(252, 152, 'θ', { fill: '#b3261e', bold: true, size: 18 });
    var y = 252;
    s += frac(64, y, 'opuesto', 'hipotenusa', { size: 11, fill: '#b3261e' });
    s += T(64, y - 28, 'sen θ', { size: 12, bold: true, fill: '#b3261e', anchor: 'middle' });
    s += frac(186, y, 'adyacente', 'hipotenusa', { size: 11, fill: '#0f6cbf' });
    s += T(186, y - 28, 'cos θ', { size: 12, bold: true, fill: '#0f6cbf', anchor: 'middle' });
    s += frac(318, y, 'opuesto', 'adyacente', { size: 11, fill: '#1f7a3f' });
    s += T(318, y - 28, 'tan θ', { size: 12, bold: true, fill: '#1f7a3f', anchor: 'middle' });
    return s + '</svg>';
  };

  FIG['unit-circle'] = function () {
    var s = open(340, 300);
    var cx = 150, cy = 138, r = 78;
    s += L(24, cy, 290, cy, { stroke: '#5b6b7a', w: 1.3, arrow: true });
    s += L(cx, 230, cx, 28, { stroke: '#5b6b7a', w: 1.3, arrow: true });
    s += T(248, cy - 10, 'x = cos', { size: 12, fill: '#0f6cbf', italic: true });
    s += T(cx + 10, 24, 'y = sen', { size: 12, fill: '#b3261e', italic: true });
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="rgba(15,108,191,.07)" stroke="#0f6cbf" stroke-width="1.7"/>';
    var ang = -Math.PI / 5;
    var px = cx + r * Math.cos(ang), py = cy + r * Math.sin(ang);
    s += L(cx, cy, px, py, { stroke: '#0e2a47', w: 1.7 });
    s += L(px, py, px, cy, { stroke: '#b3261e', w: 1.3, dash: true });
    s += L(cx, cy, px, cy, { stroke: '#0f6cbf', w: 1.3, dash: true });
    s += '<circle cx="' + px.toFixed(1) + '" cy="' + py.toFixed(1) + '" r="3.5" fill="#b3261e"/>';
    s += T(Math.min(px + 10, 250), py - 6, 'P(cos, sen)', { size: 12, bold: true });
    s += T(170, 262, 'tan θ  =', { size: 13, bold: true, anchor: 'end' });
    s += frac(214, 258, 'sen θ', 'cos θ', { size: 12 });
    s += T(170, 290, '(solo si cos θ ≠ 0)', { size: 12, anchor: 'middle', fill: '#5b6b7a' });
    return s + '</svg>';
  };

  FIG['notables'] = function () {
    var s = open(460, 248);
    var a45 = 104;
    var A1 = [28, 186], B1 = [28 + a45, 186], C1 = [28, 186 - a45];
    s += poly([A1, B1, C1].join(' '));
    s += square(A1[0], A1[1], 14, -14);
    s += T(A1[0] - 14, (A1[1] + C1[1]) / 2 + 4, 'a', { bold: true, size: 14 });
    s += T((A1[0] + B1[0]) / 2, A1[1] + 18, 'a', { bold: true, size: 14, anchor: 'middle' });
    s += T((B1[0] + C1[0]) / 2 + 14, (B1[1] + C1[1]) / 2, 'a√2', { bold: true, fill: '#0f6cbf', size: 14 });
    s += T(B1[0] - 22, B1[1] - 10, '45°', { size: 12, fill: '#0f6cbf', bold: true });
    s += T(C1[0] + 16, C1[1] + 22, '45°', { size: 12, fill: '#0f6cbf', bold: true });
    s += T(80, 20, '45°–45°–90°', { size: 13, bold: true, fill: '#0f6cbf', anchor: 'middle' });
    s += T(80, 38, 'lados  a , a , a√2', { size: 12, fill: '#0f6cbf', anchor: 'middle' });

    var a30 = 92;
    var A2 = [214, 186], B2 = [214 + Math.round(a30 * Math.sqrt(3)), 186], C2 = [214, 186 - a30];
    s += poly([A2, B2, C2].join(' '));
    s += square(A2[0], A2[1], 14, -14);
    s += T(A2[0] - 28, (A2[1] + C2[1]) / 2 + 4, 'a', { bold: true, size: 14 });
    s += T((A2[0] + B2[0]) / 2 - 8, A2[1] + 18, 'a√3', { bold: true, fill: '#0f6cbf', size: 14 });
    s += T((B2[0] + C2[0]) / 2 + 10, (B2[1] + C2[1]) / 2 - 4, '2a', { bold: true, fill: '#b3261e', size: 15 });
    s += T(C2[0] + 14, C2[1] + 24, '60°', { size: 12, fill: '#b3261e', bold: true });
    s += T(B2[0] - 28, B2[1] - 10, '30°', { size: 12, fill: '#b3261e', bold: true });
    s += T(310, 20, '30°–60°–90°', { size: 13, bold: true, fill: '#b3261e', anchor: 'middle' });
    s += T(310, 38, 'frente a 30° = la mitad de 2a', { size: 12, fill: '#b3261e', anchor: 'middle' });
    s += T(230, 236, 'No armes senos: usa esta plantilla.', { size: 12, anchor: 'middle', bold: true });
    return s + '</svg>';
  };

  FIG['sign-magnet'] = function () {
    var s = open(460, 168);
    s += '<rect x="18" y="18" width="200" height="128" rx="10" fill="#fff7ed" stroke="#d9822b"/>';
    s += T(118, 48, '−2⁴', { size: 24, bold: true, anchor: 'middle' });
    s += T(118, 76, 'el 4 solo pega al 2', { size: 13, anchor: 'middle' });
    s += T(118, 108, '−(2·2·2·2)', { size: 15, bold: true, anchor: 'middle', fill: '#b3261e' });
    s += T(118, 132, '= −16', { size: 16, bold: true, anchor: 'middle', fill: '#b3261e' });
    s += '<rect x="242" y="18" width="200" height="128" rx="10" fill="#f0fdf4" stroke="#1f7a3f"/>';
    s += T(342, 48, '(−2)⁴', { size: 24, bold: true, anchor: 'middle' });
    s += T(342, 76, 'el 4 pega a TODO', { size: 13, anchor: 'middle' });
    s += T(342, 108, '(−2)(−2)(−2)(−2)', { size: 14, bold: true, anchor: 'middle', fill: '#1f7a3f' });
    s += T(342, 132, '= +16', { size: 16, bold: true, anchor: 'middle', fill: '#1f7a3f' });
    return s + '</svg>';
  };

  FIG['thales'] = function () {
    var s = open(400, 250);
    var O = [48, 36];
    var A = [110, 196];
    var B = [348, 196];
    function atY(P, y) {
      var t = (y - O[1]) / (P[1] - O[1]);
      return [O[0] + t * (P[0] - O[0]), y];
    }
    var y2 = 118;
    var Ap = atY(A, y2);
    var Bp = atY(B, y2);
    s += L(28, 196, 372, 196);
    s += L(40, y2, 360, y2, { stroke: '#0f6cbf', w: 1.7 });
    s += L(O[0], O[1], A[0], A[1], { stroke: '#b3261e', w: 1.7 });
    s += L(O[0], O[1], B[0], B[1], { stroke: '#b3261e', w: 1.7 });
    s += T(O[0] - 16, O[1] + 4, 'O', { italic: true, bold: true, size: 14 });
    s += T(A[0] - 4, A[1] + 18, 'A', { italic: true, size: 14 });
    s += T(B[0] - 4, B[1] + 18, 'B', { italic: true, size: 14 });
    s += T(Ap[0] - 18, Ap[1] - 6, "A'", { italic: true, fill: '#0f6cbf', bold: true, size: 14 });
    s += T(Bp[0] + 6, Bp[1] - 6, "B'", { italic: true, fill: '#0f6cbf', bold: true, size: 14 });
    s += frac(90, 232, "OA'", 'OA', { size: 12 });
    s += T(148, 236, '=', { bold: true, size: 16, anchor: 'middle' });
    s += frac(200, 232, "OB'", 'OB', { size: 12 });
    s += T(258, 236, '=', { bold: true, size: 16, anchor: 'middle' });
    s += frac(322, 232, "A'B'", 'AB', { size: 12 });
    return s + '</svg>';
  };

  FIG['parallels'] = function () {
    var s = open(400, 200);
    var y1 = 56, y2 = 132;
    var tx1 = 90, ty1 = 18, tx2 = 280, ty2 = 176;
    function xAt(y) { return tx1 + (y - ty1) * (tx2 - tx1) / (ty2 - ty1); }
    var ux = xAt(y1), lx = xAt(y2);
    s += L(24, y1, 352, y1);
    s += L(24, y2, 352, y2);
    s += L(tx1, ty1, tx2, ty2, { stroke: '#0f6cbf', w: 1.7 });
    s += T(358, y1 + 4, 'L₁', { italic: true, size: 13 });
    s += T(358, y2 + 4, 'L₂', { italic: true, size: 13 });
    s += T(ux + 18, y1 + 20, 'α', { fill: '#b3261e', bold: true, size: 16 });
    s += T(lx + 18, y2 - 8, 'β', { fill: '#0f6cbf', bold: true, size: 16 });
    s += T(200, 100, 'mismo lado interior', { size: 13, bold: true, anchor: 'middle' });
    s += T(200, 188, 'α + β = 180°', { size: 15, bold: true, anchor: 'middle', fill: '#b3261e' });
    return s + '</svg>';
  };

  FIG['triangle-parts'] = function () {
    var s = open(460, 210);
    var A = [120, 36], B = [40, 168], C = [210, 168];
    var M = [(B[0] + C[0]) / 2, (B[1] + C[1]) / 2];
    s += poly([A, B, C].join(' '));
    s += L(A[0], A[1], M[0], M[1], { stroke: '#b3261e', w: 1.6, dash: true });
    s += T(A[0] - 4, A[1] - 10, 'A', { italic: true, size: 15 });
    s += T(B[0] - 18, B[1] + 18, 'B', { italic: true, size: 15 });
    s += T(C[0] + 8, C[1] + 18, 'C', { italic: true, size: 15 });
    s += T(M[0] - 4, M[1] + 18, 'M', { italic: true, fill: '#b3261e', bold: true, size: 14 });
    s += T(132, 108, 'mediana', { size: 12, fill: '#b3261e', bold: true });
    s += T(248, 56, 'Mediana → punto medio', { size: 13 });
    s += T(248, 80, 'Altura → 90° al lado', { size: 13 });
    s += T(248, 104, 'Bisectriz → parte el ángulo', { size: 13 });
    s += T(248, 128, 'Mediatriz → 90° en el medio', { size: 13 });
    s += T(248, 160, 'Cuatro rayas distintas.', { size: 13, bold: true, fill: '#b3261e' });
    return s + '</svg>';
  };

  FIG['vieta'] = function () {
    var s = open(400, 168);
    s += '<rect x="16" y="14" width="368" height="140" rx="10" fill="#f8fafc" stroke="#0e2a47"/>';
    s += T(200, 42, 'ax² + bx + c = 0', { size: 18, bold: true, anchor: 'middle' });
    s += T(86, 88, 'suma  =', { size: 14, bold: true, fill: '#0f6cbf', anchor: 'end' });
    s += frac(126, 84, '−b', 'a', { size: 14, fill: '#0f6cbf' });
    s += T(230, 88, 'producto  =', { size: 14, bold: true, fill: '#1f7a3f', anchor: 'end' });
    s += frac(272, 84, 'c', 'a', { size: 14, fill: '#1f7a3f' });
    s += T(200, 138, 'No resuelvas si solo piden la suma.', { size: 13, anchor: 'middle' });
    return s + '</svg>';
  };

  FIG['abs-doors'] = function () {
    var s = open(420, 156);
    s += L(24, 84, 396, 84, { w: 1.7, arrow: true });
    s += '<circle cx="90" cy="84" r="6" fill="#0f6cbf"/>';
    s += '<circle cx="210" cy="84" r="6" fill="#5b6b7a"/>';
    s += '<circle cx="330" cy="84" r="6" fill="#0f6cbf"/>';
    s += T(90, 70, '−5', { anchor: 'middle', bold: true, fill: '#0f6cbf', size: 14 });
    s += T(210, 70, '−2', { anchor: 'middle', bold: true, size: 14 });
    s += T(330, 70, '1', { anchor: 'middle', bold: true, fill: '#0f6cbf', size: 14 });
    s += T(210, 28, '|x + 2| = 3   →   dos puertas', { size: 14, bold: true, anchor: 'middle' });
    s += T(210, 140, 'x + 2 = 3    o    x + 2 = −3     →     x = 1  y  x = −5', {
      size: 13, bold: true, anchor: 'middle', fill: '#0f6cbf'
    });
    return s + '</svg>';
  };

  FIG['domain-holes'] = function () {
    var s = open(380, 176);
    s += T(118, 48, 'f(x)  =', { size: 16, bold: true, anchor: 'end' });
    s += frac(176, 42, 'x² + 3', 'x² − 4', { size: 15 });
    s += T(190, 88, 'El piso se rompe si  x² − 4 = 0', { size: 13, anchor: 'middle' });
    s += T(190, 118, 'x = 2    o    x = −2     (hoyos)', { size: 16, bold: true, anchor: 'middle', fill: '#b3261e' });
    s += T(190, 154, 'El +3 de arriba no salva nada.', { size: 13, anchor: 'middle' });
    return s + '</svg>';
  };

  FIG['law-cosines'] = function () {
    var s = open(340, 220);
    var A = [48, 158], B = [286, 158], C = [168, 40];
    s += poly([A, B, C].join(' '));
    s += T(C[0] - 4, C[1] - 10, 'C', { italic: true, bold: true, fill: '#b3261e', size: 16 });
    s += T(A[0] - 18, A[1] + 18, 'A', { italic: true, size: 15 });
    s += T(B[0] + 8, B[1] + 18, 'B', { italic: true, size: 15 });
    s += T(160, 178, 'c', { italic: true, fill: '#0f6cbf', bold: true, size: 16 });
    s += T(90, 100, 'b', { italic: true, size: 15 });
    s += T(232, 100, 'a', { italic: true, size: 15 });
    s += T(170, 206, 'c² = a² + b² − 2ab cos C', { size: 14, bold: true, anchor: 'middle' });
    return s + '</svg>';
  };

  FIG['law-sines'] = function () {
    var s = open(360, 236);
    var A = [48, 150], B = [286, 150], C = [168, 36];
    s += poly([A, B, C].join(' '));
    s += T(C[0] - 4, C[1] - 10, 'C', { italic: true, bold: true, size: 16 });
    s += T(A[0] - 18, A[1] + 18, 'A', { italic: true, fill: '#b3261e', bold: true, size: 15 });
    s += T(B[0] + 8, B[1] + 18, 'B', { italic: true, fill: '#0f6cbf', bold: true, size: 15 });
    s += T(232, 90, 'a', { italic: true, fill: '#b3261e', bold: true, size: 16 });
    s += T(90, 90, 'b', { italic: true, fill: '#0f6cbf', bold: true, size: 16 });
    s += frac(78, 208, 'a', 'sen A', { size: 13, fill: '#b3261e' });
    s += T(132, 212, '=', { bold: true, size: 16, anchor: 'middle' });
    s += frac(180, 208, 'b', 'sen B', { size: 13, fill: '#0f6cbf' });
    s += T(234, 212, '=', { bold: true, size: 16, anchor: 'middle' });
    s += frac(286, 208, 'c', 'sen C', { size: 13 });
    return s + '</svg>';
  };

  FIG['sign-chart'] = function () {
    var s = open(420, 156);
    s += L(24, 78, 396, 78, { w: 1.7, arrow: true });
    s += '<circle cx="130" cy="78" r="6" fill="#b3261e"/>';
    s += '<circle cx="280" cy="78" r="6" fill="#b3261e"/>';
    s += T(130, 64, '0', { anchor: 'middle', bold: true, size: 14 });
    s += T(280, 64, '2', { anchor: 'middle', bold: true, size: 14 });
    s += T(78, 48, '−', { size: 22, bold: true, fill: '#b3261e', anchor: 'middle' });
    s += T(205, 48, '+', { size: 22, bold: true, fill: '#1f7a3f', anchor: 'middle' });
    s += T(340, 48, '+', { size: 22, bold: true, fill: '#1f7a3f', anchor: 'middle' });
    s += T(210, 132, 'x(x − 2)    ·    si x > 0, solo mira a la derecha de 0', {
      size: 13, bold: true, anchor: 'middle'
    });
    return s + '</svg>';
  };

  FIG['isos-equil'] = function () {
    var s = open(440, 196);
    s += poly('48,158 168,158 108,36');
    s += T(108, 24, 'equilátero', { size: 13, bold: true, fill: '#0f6cbf', anchor: 'middle' });
    s += T(108, 100, '60°  60°  60°', { size: 13, fill: '#0f6cbf', bold: true, anchor: 'middle' });
    s += poly('250,158 400,158 325,36');
    s += T(325, 24, 'isósceles', { size: 13, bold: true, fill: '#b3261e', anchor: 'middle' });
    s += T(325, 178, 'base', { size: 12, fill: '#b3261e', anchor: 'middle' });
    s += T(325, 92, 'ángulos de la', { size: 12, fill: '#b3261e', anchor: 'middle' });
    s += T(325, 110, 'base iguales', { size: 12, fill: '#b3261e', bold: true, anchor: 'middle' });
    return s + '</svg>';
  };

  FIG['slope'] = function () {
    var s = open(340, 250);
    s += L(28, 188, 300, 188, { stroke: '#5b6b7a', arrow: true });
    s += L(48, 210, 48, 22, { stroke: '#5b6b7a', arrow: true });
    s += L(80, 168, 230, 58, { stroke: '#0f6cbf', w: 2.2 });
    s += L(80, 168, 230, 168, { stroke: '#b3261e', dash: true });
    s += L(230, 168, 230, 58, { stroke: '#1f7a3f', dash: true });
    s += T(130, 184, 'run  Δx', { fill: '#b3261e', bold: true, size: 13 });
    s += T(238, 118, 'rise Δy', { fill: '#1f7a3f', bold: true, size: 13 });
    s += T(128, 228, 'm  =', { size: 16, bold: true, anchor: 'end' });
    s += frac(168, 224, 'Δy', 'Δx', { size: 14 });
    return s + '</svg>';
  };

  FIG['ages-photos'] = function () {
    var s = open(440, 168);
    s += '<rect x="18" y="20" width="190" height="124" rx="8" fill="#fff7ed" stroke="#d9822b"/>';
    s += T(113, 48, 'HOY', { size: 14, bold: true, anchor: 'middle', fill: '#d9822b' });
    s += T(113, 86, 'M = 3J', { size: 18, bold: true, anchor: 'middle' });
    s += T(113, 122, 'foto 1', { size: 13, anchor: 'middle' });
    s += '<rect x="232" y="20" width="190" height="124" rx="8" fill="#eff6ff" stroke="#0f6cbf"/>';
    s += T(327, 48, 'DENTRO DE 10', { size: 14, bold: true, anchor: 'middle', fill: '#0f6cbf' });
    s += T(327, 80, 'M + 10', { size: 15, bold: true, anchor: 'middle' });
    s += T(327, 104, '= 2(J + 10)', { size: 15, bold: true, anchor: 'middle' });
    s += T(327, 132, 'foto 2', { size: 13, anchor: 'middle' });
    return s + '</svg>';
  };

  FIG['exterior-angle'] = function () {
    var s = open(400, 210);
    var A = [64, 158], C = [220, 158], B = [108, 44];
    s += poly([A, C, B].join(' '));
    s += L(C[0], C[1], 340, 158, { stroke: '#5b6b7a', w: 1.6 });
    s += T(A[0] - 18, A[1] + 18, 'A', { italic: true, size: 15 });
    s += T(C[0] - 6, C[1] + 20, 'C', { italic: true, size: 15 });
    s += T(B[0] - 18, B[1] - 6, 'B', { italic: true, size: 15 });
    s += T(A[0] + 22, A[1] - 8, 'α', { fill: '#0f6cbf', bold: true, size: 16 });
    s += T(B[0] + 14, B[1] + 28, 'θ', { fill: '#0f6cbf', bold: true, size: 16 });
    s += T(248, 148, 'x', { fill: '#b3261e', bold: true, size: 18 });
    s += T(200, 196, 'x = θ + α     (los dos que NO tocan a x)', { size: 14, bold: true, anchor: 'middle' });
    return s + '</svg>';
  };

  FIG['bigger-side'] = function () {
    var s = open(360, 210);
    var A = [36, 168], B = [330, 168], C = [88, 96];
    s += poly([A, B, C].join(' '));
    s += T(C[0] - 8, C[1] - 10, 'θ grande', { fill: '#b3261e', bold: true, size: 13 });
    s += T(B[0] - 62, B[1] - 12, 'β chico', { fill: '#0f6cbf', bold: true, size: 13 });
    s += T(168, 188, 'lado grande (enfrente de θ)', { fill: '#b3261e', bold: true, size: 13, anchor: 'middle' });
    s += T(180, 24, 'Ángulo grande mira al lado grande', { size: 13, bold: true, anchor: 'middle' });
    return s + '</svg>';
  };

  FIG['altitude-cases'] = function () {
    var s = open(460, 188);
    s += poly('28,128 112,128 56,36');
    s += L(56, 36, 56, 128, { stroke: '#b3261e', dash: true });
    s += T(70, 168, 'agudo: cae adentro', { size: 12, anchor: 'middle' });

    s += poly('148,128 258,128 148,40');
    s += L(148, 40, 148, 128, { stroke: '#b3261e', dash: true });
    s += T(203, 168, 'recto: es un cateto', { size: 12, anchor: 'middle' });

    var P = [352, 128], Q = [448, 128], R = [304, 36];
    s += poly([P, Q, R].join(' '));
    s += L(R[0], R[1], R[0], P[1], { stroke: '#b3261e', dash: true });
    s += L(R[0], P[1], P[0], P[1], { stroke: '#5b6b7a', dash: true });
    s += square(R[0], P[1], 10, -10);
    s += T(376, 168, 'obtuso: cae AFUERA', { size: 12, fill: '#b3261e', bold: true, anchor: 'middle' });
    return s + '</svg>';
  };

  FIG['midline'] = function () {
    var s = open(340, 220);
    var A = [48, 158], B = [292, 158], C = [170, 32];
    var M = [(A[0] + C[0]) / 2, (A[1] + C[1]) / 2];
    var N = [(B[0] + C[0]) / 2, (B[1] + C[1]) / 2];
    s += poly([A, B, C].join(' '));
    s += L(M[0], M[1], N[0], N[1], { stroke: '#b3261e', w: 2.2 });
    s += T((M[0] + N[0]) / 2 - 4, M[1] - 8, 'x', { fill: '#b3261e', bold: true, size: 15 });
    s += T(160, 176, '2b', { bold: true, size: 14 });
    s += T(C[0] + 8, C[1] - 10, 'C', { italic: true, size: 13 });
    s += T(170, 210, 'Base media: x = b   y   es ∥ a la base', { size: 13, bold: true, anchor: 'middle' });
    return s + '</svg>';
  };

  FIG['median-hyp'] = function () {
    var s = open(340, 210);
    var R = [56, 158], P = [280, 158], Q = [56, 40];
    s += poly([R, P, Q].join(' '));
    s += square(56, 158, 16, -16);
    var Mx = (P[0] + Q[0]) / 2, My = (P[1] + Q[1]) / 2;
    s += L(R[0], R[1], Mx, My, { stroke: '#b3261e', dash: true, w: 1.7 });
    s += T(Mx + 8, My + 6, 'M', { fill: '#b3261e', italic: true, bold: true, size: 14 });
    s += T((R[0] + Mx) / 2 + 8, (R[1] + My) / 2, 'x', { fill: '#b3261e', bold: true, size: 15 });
    s += T(190, 124, 'hipotenusa 2x', { size: 13, bold: true });
    s += T(170, 196, 'Mediana a la hipotenusa = la mitad', { size: 13, bold: true, anchor: 'middle' });
    return s + '</svg>';
  };

  FIG['opp-same'] = function () {
    var s = open(440, 200);
    s += poly('48,158 178,158 88,40');
    s += poly('250,158 390,158 290,40');
    s += T(218, 108, '≅', { size: 24, bold: true, anchor: 'middle' });
    s += T(108, 178, 'x', { fill: '#b3261e', bold: true, size: 16, anchor: 'middle' });
    s += T(318, 178, '17', { fill: '#0f6cbf', bold: true, size: 16, anchor: 'middle' });
    s += T(78, 58, 'β', { fill: '#b3261e', bold: true, size: 16 });
    s += T(280, 58, 'β', { fill: '#0f6cbf', bold: true, size: 16 });
    s += T(220, 24, 'Lo que mira a β aquí mira a β allá  →  x = 17', { size: 13, bold: true, anchor: 'middle' });
    return s + '</svg>';
  };

  FIG['right-angles-perp'] = function () {
    var s = open(420, 236);
    var A = [56, 184], Bpt = [250, 184], C = [56, 56], D = [360, 56];
    var dx = 124 / Math.tan(65 * Math.PI / 180);
    var H = [56 + dx, 56];
    s += L(A[0], A[1], Bpt[0], Bpt[1]);
    s += L(A[0], A[1], C[0], C[1]);
    s += L(C[0], C[1], D[0], D[1]);
    s += L(A[0], A[1], H[0], H[1], { stroke: '#0f6cbf', w: 1.7 });
    s += square(56, 184, 16, -16);
    s += square(56, 56, 16, 16);
    s += T(A[0] - 18, A[1] + 18, 'A', { italic: true, size: 15 });
    s += T(Bpt[0] + 8, Bpt[1] + 18, 'B', { italic: true, size: 15 });
    s += T(C[0] - 18, C[1] - 8, 'C', { italic: true, size: 15 });
    s += T(D[0] + 6, D[1] - 8, 'D', { italic: true, size: 15 });
    s += T(H[0] + 6, H[1] - 8, "H", { italic: true, fill: '#0f6cbf', size: 14 });
    s += T(118, 176, '65°', { fill: '#b3261e', bold: true, size: 14 });
    s += T(H[0] + 16, 76, 'x = 65°', { fill: '#0f6cbf', bold: true, size: 13 });
    s += T(80, 80, 'y = 90°', { fill: '#1f7a3f', bold: true, size: 13 });
    s += T(210, 222, 'CD ∥ AB   →   x repite los 65°', { size: 13, bold: true, anchor: 'middle' });
    return s + '</svg>';
  };

  FIG['circle-canon'] = function () {
    var s = open(420, 250);
    var cx = 150, cy = 120, r = 72;
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="#f7fbff" stroke="#1d2125" stroke-width="1.6"/>';
    s += L(40, cy, 360, cy, { stroke: '#94a3b8', w: 1 });
    s += L(cx, 24, cx, 220, { stroke: '#94a3b8', w: 1 });
    s += L(cx, cy, cx + r, cy, { stroke: '#b3261e', w: 2 });
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="3.2" fill="#b3261e"/>';
    s += T(cx - 18, cy + 16, 'C(h, k)', { fill: '#b3261e', bold: true, size: 13 });
    s += T(cx + 28, cy - 8, 'r', { fill: '#b3261e', bold: true, size: 15 });
    s += T(300, 70, '(x − h)²', { bold: true, size: 14 });
    s += T(300, 92, '+ (y − k)²', { bold: true, size: 14 });
    s += T(300, 114, '= r²', { bold: true, size: 14, fill: '#b3261e' });
    s += T(210, 238, 'Centro (h, k)   ·   a la derecha va r², no r', { size: 13, bold: true, anchor: 'middle' });
    return s + '</svg>';
  };

  FIG['circle-general'] = function () {
    var s = open(430, 168);
    s += '<rect x="14" y="16" width="402" height="132" rx="10" fill="#fff" stroke="#0f6cbf" stroke-width="1.5"/>';
    s += T(215, 42, 'x² + y² + Dx + Ey + F = 0', { anchor: 'middle', bold: true, size: 15 });
    s += T(215, 74, 'centro  ( −D/2  ,  −E/2 )', { anchor: 'middle', size: 14, fill: '#0f6cbf', bold: true });
    s += T(215, 104, 'r²  =  (D/2)² + (E/2)² − F', { anchor: 'middle', size: 14, fill: '#b3261e', bold: true });
    s += T(215, 134, 'si r² < 0  →  no hay circunferencia real', { anchor: 'middle', size: 13 });
    return s + '</svg>';
  };

  FIG['alt-hyp'] = function () {
    var s = open(360, 232);
    var A = [40, 188], B = [320, 188], C = [112, 40];
    var t = ((C[0] - A[0]) * (B[0] - A[0]) + (C[1] - A[1]) * (B[1] - A[1])) /
      ((B[0] - A[0]) * (B[0] - A[0]) + (B[1] - A[1]) * (B[1] - A[1]));
    var H = [A[0] + t * (B[0] - A[0]), A[1] + t * (B[1] - A[1])];
    s += poly([A, B, C].join(' '));
    s += L(C[0], C[1], H[0], H[1], { stroke: '#b3261e', w: 1.8, dash: true });
    s += square(H[0], H[1], 12, -12);
    s += square(A[0], A[1], 14, -14);
    s += T(A[0] - 2, A[1] + 18, 'A', { italic: true, size: 14 });
    s += T(B[0] - 4, B[1] + 18, 'B', { italic: true, size: 14 });
    s += T(C[0] - 16, C[1] - 4, 'C', { italic: true, size: 14 });
    s += T(H[0] - 4, H[1] + 20, 'H', { italic: true, fill: '#b3261e', size: 14 });
    s += T(180, 220, 'CH ⊥ AB   ·   los 3 triángulos son semejantes', { size: 13, bold: true, anchor: 'middle' });
    return s + '</svg>';
  };

  FIG['par-alpha-beta'] = function () {
    var s = open(400, 230);
    s += L(30, 64, 370, 64);
    s += L(30, 168, 370, 168);
    s += L(150, 210, 270, 22, { stroke: '#0f6cbf', w: 1.8 });
    s += T(278, 38, 'α', { fill: '#b3261e', bold: true, size: 18 });
    s += T(148, 196, 'β', { fill: '#0f6cbf', bold: true, size: 18 });
    s += T(200, 118, '∥', { size: 18, bold: true, anchor: 'middle' });
    s += T(200, 222, 'α y β alternos externos  →  α = β', { size: 13, bold: true, anchor: 'middle' });
    return s + '</svg>';
  };

  window.FIG_FILTRO = FIG;

  function attachFigr() {
    if (!window.FIGR) return;
    window.FIGR.congpair = function () { return FIG['cong-acb-dfe'](); };
    window.FIGR.filtro = function (f) {
      var name = (f && f.name) || '';
      return (FIG[name] && FIG[name]()) || '';
    };
  }
  attachFigr();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', attachFigr);
  else attachFigr();
})();
