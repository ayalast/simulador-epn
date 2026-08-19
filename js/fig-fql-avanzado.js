/* Figuras redibujadas del banco avanzado F/Q/L — alineadas al enunciado. */
(function () {
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function open(w, h) {
    return '<svg width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h +
      '" xmlns="http://www.w3.org/2000/svg" font-family="Georgia, \'Times New Roman\', serif" overflow="visible">' +
      '<defs><marker id="avz-ah" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">' +
      '<path d="M0,0 L7,3 L0,6 z" fill="#0e2a47"/></marker>' +
      '<marker id="avz-ahr" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">' +
      '<path d="M0,0 L7,3 L0,6 z" fill="#b3261e"/></marker>' +
      '<marker id="avz-ahb" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">' +
      '<path d="M0,0 L7,3 L0,6 z" fill="#0f6cbf"/></marker>' +
      '<marker id="avz-ahg" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">' +
      '<path d="M0,0 L7,3 L0,6 z" fill="#1b7f4a"/></marker></defs>';
  }
  function T(x, y, s, o) {
    o = o || {};
    return '<text x="' + x + '" y="' + y + '" fill="' + (o.fill || '#0e2a47') + '" font-size="' + (o.size || 13) +
      '" text-anchor="' + (o.anchor || 'start') + '"' + (o.italic ? ' font-style="italic"' : '') +
      (o.bold ? ' font-weight="700"' : '') + '>' + esc(s) + '</text>';
  }
  function L(x1, y1, x2, y2, o) {
    o = o || {};
    var mk = o.arrow ? (o.mk || 'url(#avz-ah)') : '';
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + (o.stroke || '#1d2125') +
      '" stroke-width="' + (o.w || 1.6) + '"' + (o.dash ? ' stroke-dasharray="4 3"' : '') +
      (mk ? ' marker-end="' + mk + '"' : '') + '/>';
  }
  function circ(cx, cy, r, fill, stroke) {
    return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + (fill || '#0f6cbf') +
      '" stroke="' + (stroke || '#0e2a47') + '" stroke-width="1.2"/>';
  }
  function rect(x, y, w, h, fill, rx) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (rx || 4) +
      '" fill="' + (fill || '#fff') + '" stroke="#1d2125" stroke-width="1.3"/>';
  }
  function title(s) { return T(16, 22, s, { bold: true, size: 15 }); }

  var FIG = {};

  FIG['avz-fis-35'] = function () {
    var s = open(640, 360);
    s += title('Dos fuerzas perpendiculares sobre una argolla');
    s += L(80, 300, 560, 300, { stroke: '#8a97a3', w: 1 });
    s += L(80, 300, 80, 50, { stroke: '#8a97a3', w: 1 });
    s += L(80, 300, 380, 300, { stroke: '#0f6cbf', w: 3, arrow: true, mk: 'url(#avz-ahb)' });
    s += L(80, 300, 80, 100, { stroke: '#b3261e', w: 3, arrow: true, mk: 'url(#avz-ahr)' });
    s += L(80, 300, 380, 100, { stroke: '#1b7f4a', w: 3, arrow: true, mk: 'url(#avz-ahg)' });
    s += circ(80, 300, 6, '#0e2a47', '#0e2a47');
    s += T(210, 324, '6 N  (este)', { fill: '#0f6cbf', bold: true, anchor: 'middle' });
    s += T(58, 190, '8 N', { fill: '#b3261e', bold: true, anchor: 'end' });
    s += T(58, 208, '(norte)', { fill: '#b3261e', size: 12, anchor: 'end' });
    s += T(300, 180, 'R', { fill: '#1b7f4a', bold: true, size: 18 });
    s += T(400, 92, 'noreste', { fill: '#1b7f4a', bold: true });
    s += T(100, 348, 'La resultante cierra el rectángulo 6 N × 8 N.', { size: 12, fill: '#5c6b78' });
    return s + '</svg>';
  };

  FIG['avz-fis-36'] = function () {
    var s = open(700, 360);
    s += title('Velocidad del carrito frente al tiempo');
    var ox = 80, oy = 230, sx = 58, sy = 18;
    function X(t) { return ox + t * sx; }
    function Y(v) { return oy - v * sy; }
    s += rect(ox, 50, 560, 230, '#fbfcfe', 0);
    for (var g = -4; g <= 8; g += 4) {
      s += L(ox, Y(g), ox + 560, Y(g), { stroke: '#e6edf3', w: 1 });
      s += T(ox - 10, Y(g) + 4, String(g), { anchor: 'end', size: 12 });
    }
    [0, 3, 7, 9].forEach(function (t) {
      s += L(X(t), 50, X(t), oy + 8, { stroke: '#e6edf3', w: 1 });
      s += T(X(t), oy + 22, String(t), { anchor: 'middle', size: 12 });
    });
    s += L(ox, oy, ox + 560, oy, { stroke: '#1d2125', w: 1.4 });
    s += L(ox, 50, ox, oy + 8, { stroke: '#1d2125', w: 1.4 });
    var pts = [[0, 0], [3, 8], [7, 8], [9, -4]];
    s += '<polygon points="' + pts.map(function (p) { return X(p[0]) + ',' + Y(p[1]); }).join(' ') + ' ' + X(9) + ',' + Y(0) + ' ' + X(0) + ',' + Y(0) +
      '" fill="#d7ebff" stroke="none"/>';
    s += '<polygon points="' + X(8) + ',' + Y(0) + ' ' + X(9) + ',' + Y(-4) + ' ' + X(9) + ',' + Y(0) +
      '" fill="#f8d4d0" stroke="none"/>';
    s += L(X(0), Y(0), X(3), Y(8), { stroke: '#0f6cbf', w: 2.6 });
    s += L(X(3), Y(8), X(7), Y(8), { stroke: '#0f6cbf', w: 2.6 });
    s += L(X(7), Y(8), X(9), Y(-4), { stroke: '#0f6cbf', w: 2.6 });
    pts.forEach(function (p) { s += circ(X(p[0]), Y(p[1]), 4, '#0f6cbf', '#0e2a47'); });
    s += T(16, 150, 'v (m/s)', { size: 12, italic: true });
    s += T(340, 348, 'tiempo t (s)', { size: 12, italic: true, anchor: 'middle' });
    s += T(400, 120, 'área +', { fill: '#0f6cbf', size: 12, bold: true });
    s += T(590, 270, 'área −', { fill: '#b3261e', size: 12, bold: true });
    return s + '</svg>';
  };

  FIG['avz-fis-37'] = function () {
    var s = open(700, 340);
    s += title('Trayectorias vistas desde el suelo (avión en vuelo horizontal)');
    s += rect(40, 80, 110, 36, '#dbeafe', 4);
    s += T(95, 103, 'AVIÓN', { anchor: 'middle', bold: true, size: 13 });
    s += L(150, 98, 175, 98);
    s += L(175, 86, 200, 98);
    s += L(175, 110, 200, 98);
    s += L(70, 68, 140, 68, { stroke: '#0f6cbf', w: 2, arrow: true, mk: 'url(#avz-ahb)' });
    s += T(100, 62, 'v', { fill: '#0f6cbf', italic: true, bold: true });
    s += circ(200, 98, 5, '#0e2a47', '#0e2a47');
    s += L(40, 310, 680, 310, { stroke: '#1d2125', w: 2 });
    s += T(48, 328, 'suelo', { size: 12 });
    s += '<path d="M200 98 L620 300" fill="none" stroke="#94a3b8" stroke-width="2"/>';
    s += T(628, 304, 'A', { fill: '#64748b', bold: true });
    s += '<path d="M200 98 C360 130 480 210 610 280" fill="none" stroke="#0f6cbf" stroke-width="2.4"/>';
    s += T(618, 284, 'B', { fill: '#0f6cbf', bold: true });
    s += L(200, 98, 640, 98, { stroke: '#ea580c', w: 2.2 });
    s += T(648, 102, 'C', { fill: '#ea580c', bold: true });
    s += L(200, 98, 640, 70, { stroke: '#b3261e', w: 2.2 });
    s += T(648, 74, 'D', { fill: '#b3261e', bold: true });
    s += '<path d="M200 98 C280 70 360 70 500 130 S620 180 640 190" fill="none" stroke="#1b7f4a" stroke-width="2.2"/>';
    s += T(648, 194, 'E', { fill: '#1b7f4a', bold: true });
    s += T(220, 330, 'B es la parábola con velocidad inicial horizontal del avión.', { size: 12, fill: '#5c6b78' });
    return s + '</svg>';
  };

  FIG['avz-fis-38'] = function () {
    var s = open(680, 360);
    s += title('Bloque que sube por un plano rugoso');
    s += '<polygon points="80,310 560,310 560,140" fill="#eef4f8" stroke="#1d2125" stroke-width="1.6"/>';
    s += L(80, 310, 560, 140, { stroke: '#1d2125', w: 2.2 });
    s += '<g transform="rotate(-20 360 230)">' +
      rect(320, 198, 80, 46, '#dbeafe', 3) +
      T(360, 226, 'm', { anchor: 'middle', italic: true, bold: true }) +
      '</g>';
    s += L(360, 230, 360, 310, { stroke: '#b3261e', w: 2.4, arrow: true, mk: 'url(#avz-ahr)' });
    s += T(372, 300, 'peso  (vertical)', { fill: '#b3261e', bold: true, size: 12 });
    s += L(360, 230, 300, 160, { stroke: '#1b7f4a', w: 2.4, arrow: true, mk: 'url(#avz-ahg)' });
    s += T(200, 150, 'normal  (⊥ al plano)', { fill: '#1b7f4a', bold: true, size: 12 });
    s += L(360, 230, 250, 270, { stroke: '#c2410c', w: 2.4, arrow: true });
    s += T(140, 278, 'rozamiento  (cuesta abajo)', { fill: '#c2410c', bold: true, size: 12 });
    s += L(430, 200, 520, 166, { stroke: '#0f6cbf', w: 2.2, arrow: true, mk: 'url(#avz-ahb)' });
    s += T(526, 162, 'movimiento', { fill: '#0f6cbf', bold: true, size: 12 });
    return s + '</svg>';
  };

  function throwMarks() {
    var s = '';
    s += L(160, 320, 160, 50, { stroke: '#8a97a3', w: 1.2, dash: true });
    s += circ(160, 300, 7, '#0f6cbf', '#0e2a47');
    s += T(178, 305, 'P', { bold: true });
    s += circ(160, 230, 7, '#0f6cbf', '#0e2a47');
    s += T(178, 235, 'Q', { bold: true });
    s += circ(160, 160, 7, '#0f6cbf', '#0e2a47');
    s += T(178, 165, 'R', { bold: true });
    s += circ(160, 80, 8, '#b3261e', '#0e2a47');
    s += T(178, 78, 'T', { bold: true, fill: '#b3261e', size: 16 });
    s += T(178, 96, 'punto más alto', { fill: '#b3261e', size: 12 });
    s += L(80, 320, 280, 320, { stroke: '#1d2125', w: 2 });
    s += T(90, 340, 'suelo', { size: 12 });
    s += L(160, 300, 160, 70, { stroke: '#0f6cbf', w: 2, arrow: true, mk: 'url(#avz-ahb)' });
    s += T(40, 180, 'sube', { fill: '#0f6cbf', italic: true });
    return s;
  }

  FIG['avz-fis-39'] = function () {
    var s = open(520, 370);
    s += title('Lanzamiento vertical: posiciones P, Q, R y T');
    s += throwMarks();
    s += T(300, 86, 'En T: v = 0', { bold: true, size: 14 });
    s += T(300, 112, 'a = g hacia abajo', { bold: true, size: 14, fill: '#b3261e' });
    return s + '</svg>';
  };

  FIG['avz-fis-40'] = function () {
    var s = open(560, 370);
    s += title('La piedra pasa dos veces por Q');
    s += throwMarks();
    s += T(300, 228, 'Q (subida)', { fill: '#0f6cbf', bold: true });
    s += T(300, 252, 'Q (bajada)', { fill: '#b3261e', bold: true });
    s += T(300, 290, 'Misma altura ⇒ misma rapidez', { size: 13, bold: true });
    s += T(300, 310, 'si no hay aire.', { size: 13 });
    return s + '</svg>';
  };

  FIG['avz-fis-41'] = function () {
    var s = open(680, 340);
    s += title('Fuerza neta sobre el carrito (m = 3,0 kg)');
    var ox = 80, oy = 280, sx = 85, sy = 16;
    function X(t) { return ox + t * sx; }
    function Y(f) { return oy - f * sy; }
    s += L(ox, 40, ox, oy, { stroke: '#1d2125', w: 1.4 });
    s += L(ox, oy, 640, oy, { stroke: '#1d2125', w: 1.4 });
    s += '<polygon points="' + X(0) + ',' + Y(0) + ' ' + X(3) + ',' + Y(12) + ' ' + X(6) + ',' + Y(0) +
      '" fill="#fde8e6" stroke="#b3261e" stroke-width="2.4"/>';
    s += circ(X(3), Y(12), 5, '#b3261e', '#0e2a47');
    s += T(ox - 8, Y(12) + 4, '12', { anchor: 'end', size: 12 });
    s += T(ox - 8, Y(6) + 4, '6', { anchor: 'end', size: 12 });
    s += T(X(0), oy + 20, '0', { anchor: 'middle', size: 12 });
    s += T(X(3), oy + 20, '3', { anchor: 'middle', size: 12 });
    s += T(X(6), oy + 20, '6', { anchor: 'middle', size: 12 });
    s += T(20, 160, 'F (N)', { size: 12, italic: true });
    s += T(360, 328, 'tiempo t (s)', { size: 12, italic: true, anchor: 'middle' });
    s += T(360, 120, 'Impulso = área = 36 N·s', { bold: true, size: 13, anchor: 'middle' });
    return s + '</svg>';
  };

  FIG['avz-fis-42'] = function () {
    var s = open(700, 260);
    s += title('Camión que empuja a un automóvil');
    s += rect(80, 110, 180, 70, '#93c5fd', 6);
    s += T(170, 150, 'camión', { anchor: 'middle', bold: true });
    s += rect(300, 128, 130, 52, '#fda4af', 6);
    s += T(365, 158, 'auto', { anchor: 'middle', bold: true });
    s += circ(120, 190, 12, '#334155', '#0e2a47');
    s += circ(220, 190, 12, '#334155', '#0e2a47');
    s += circ(330, 190, 11, '#334155', '#0e2a47');
    s += circ(400, 190, 11, '#334155', '#0e2a47');
    s += L(70, 200, 640, 200, { stroke: '#94a3b8', w: 2 });
    s += L(260, 145, 300, 145, { stroke: '#1b7f4a', w: 2.4, arrow: true, mk: 'url(#avz-ahg)' });
    s += T(250, 128, 'Fₜ→ₐ', { fill: '#1b7f4a', bold: true, size: 13 });
    s += L(300, 165, 260, 165, { stroke: '#b3261e', w: 2.4, arrow: true, mk: 'url(#avz-ahr)' });
    s += T(250, 188, 'Fₐ→ₜ', { fill: '#b3261e', bold: true, size: 13 });
    s += L(500, 140, 600, 140, { stroke: '#0f6cbf', w: 2.2, arrow: true, mk: 'url(#avz-ahb)' });
    s += T(548, 128, 'a', { fill: '#0f6cbf', italic: true, bold: true });
    return s + '</svg>';
  };

  FIG['avz-fis-43'] = function () {
    var s = open(520, 360);
    s += title('MCU: partícula en P, sentido antihorario');
    s += circ(250, 200, 110, 'none', '#1d2125');
    s += circ(250, 200, 3, '#0e2a47', '#0e2a47');
    s += T(258, 196, 'O', { bold: true });
    s += circ(360, 200, 8, '#0f6cbf', '#0e2a47');
    s += T(374, 190, 'P', { bold: true, size: 16 });
    s += L(360, 200, 360, 110, { stroke: '#0f6cbf', w: 2.6, arrow: true, mk: 'url(#avz-ahb)' });
    s += T(370, 108, 'v  (hacia arriba)', { fill: '#0f6cbf', bold: true });
    s += L(360, 200, 250, 200, { stroke: '#b3261e', w: 2.6, arrow: true, mk: 'url(#avz-ahr)' });
    s += T(270, 188, 'a  (hacia el centro)', { fill: '#b3261e', bold: true });
    s += T(40, 340, 'En MCU uniforme, a es centrípeta: perpendicular a v.', { size: 12, fill: '#5c6b78' });
    return s + '</svg>';
  };

  FIG['avz-fis-44'] = function () {
    var s = open(680, 260);
    s += title('Dos bloques en contacto, sin rozamiento');
    s += L(40, 190, 640, 190, { stroke: '#94a3b8', w: 2 });
    s += rect(180, 110, 90, 80, '#bfdbfe', 4);
    s += T(225, 148, '2 kg', { anchor: 'middle', bold: true });
    s += rect(270, 100, 110, 90, '#fecaca', 4);
    s += T(325, 148, '3 kg', { anchor: 'middle', bold: true });
    s += L(80, 150, 170, 150, { stroke: '#0f6cbf', w: 2.6, arrow: true, mk: 'url(#avz-ahb)' });
    s += T(100, 132, '20 N', { fill: '#0f6cbf', bold: true });
    s += L(270, 130, 270, 130);
    s += T(225, 210, 'se empuja este', { size: 12, anchor: 'middle', fill: '#5c6b78' });
    s += T(400, 148, 'contacto = ?', { fill: '#b3261e', bold: true });
    return s + '</svg>';
  };

  FIG['avz-qui-35'] = function () {
    var s = open(720, 280);
    s += title('Tres recipientes de partículas');
    function box(x, label) { s += rect(x, 60, 210, 180, '#fff', 6); s += T(x + 105, 52, label, { anchor: 'middle', bold: true, size: 16 }); }
    box(30, 'I'); box(255, 'II'); box(480, 'III');
    [[70, 110], [140, 100], [190, 150], [90, 180], [160, 200]].forEach(function (p) {
      s += circ(p[0], p[1], 11, '#2563eb', '#0e2a47');
    });
    function mol(x, y) {
      s += circ(x, y, 11, '#2563eb', '#0e2a47');
      s += circ(x + 22, y, 11, '#dc2626', '#0e2a47');
      s += L(x + 8, y, x + 14, y, { w: 2 });
    }
    mol(300, 110); mol(380, 110); mol(300, 180); mol(380, 180);
    s += circ(530, 110, 11, '#2563eb', '#0e2a47');
    s += circ(600, 100, 11, '#2563eb', '#0e2a47');
    s += circ(545, 190, 11, '#2563eb', '#0e2a47');
    mol(600, 160); mol(630, 210);
    s += T(135, 262, 'elemento', { anchor: 'middle', size: 12, fill: '#5c6b78' });
    s += T(360, 262, 'compuesto', { anchor: 'middle', size: 12, fill: '#5c6b78' });
    s += T(585, 262, 'mezcla', { anchor: 'middle', size: 12, fill: '#5c6b78' });
    return s + '</svg>';
  };

  FIG['avz-qui-36'] = function () {
    var s = open(520, 340);
    s += title('Especie: 11 protones, 12 neutrones, 10 electrones');
    s += circ(240, 190, 86, '#fff7ed', '#0e2a47');
    s += circ(240, 190, 28, '#fee2e2', '#7f1d1d');
    s += T(240, 186, '11 p⁺', { anchor: 'middle', bold: true, size: 12 });
    s += T(240, 204, '12 n', { anchor: 'middle', bold: true, size: 12 });
    [[160, 140], [200, 118], [280, 118], [320, 140], [330, 190], [320, 240], [280, 262], [200, 262], [160, 240], [150, 190]].forEach(function (p) {
      s += circ(p[0], p[1], 7, '#93c5fd', '#1e3a8a');
    });
    s += T(240, 318, 'Z = 11, e⁻ = 10  →  ion Na⁺', { anchor: 'middle', bold: true });
    return s + '</svg>';
  };

  FIG['avz-qui-37'] = function () {
    var s = open(560, 300);
    s += title('Dirección de una tendencia periódica');
    s += rect(80, 70, 400, 180, '#f8fafc', 6);
    s += T(280, 100, 'período  →', { anchor: 'middle', bold: true });
    s += L(140, 130, 420, 130, { stroke: '#0f6cbf', w: 3, arrow: true, mk: 'url(#avz-ahb)' });
    s += T(280, 154, 'aumenta hacia la derecha', { anchor: 'middle', fill: '#0f6cbf', size: 13 });
    s += T(120, 220, 'grupo', { bold: true, anchor: 'middle' });
    s += L(200, 230, 200, 90, { stroke: '#1b7f4a', w: 3, arrow: true, mk: 'url(#avz-ahg)' });
    s += T(214, 160, 'aumenta hacia arriba', { fill: '#1b7f4a', size: 13 });
    s += T(280, 278, 'Electronegatividad y energía de ionización.', { anchor: 'middle', size: 12, fill: '#5c6b78' });
    return s + '</svg>';
  };

  FIG['avz-qui-38'] = function () {
    var s = open(700, 340);
    s += title('Estructuras de Lewis propuestas para CO₂');
    function card(x, y, lab, inner) {
      s += rect(x, y, 320, 120, '#fff', 6);
      s += T(x + 16, y + 24, lab, { bold: true, size: 16, fill: '#0f6cbf' });
      s += T(x + 160, y + 70, inner, { anchor: 'middle', size: 18, bold: true });
    }
    card(20, 50, 'A', 'O — C — O   (sin pares)');
    card(360, 50, 'B', 'O＝C＝O   (2 pares en cada O)');
    card(20, 190, 'C', 'O ≡ C — O');
    card(360, 190, 'D', 'O＝C — O');
    s += T(520, 88, 'octeto y CF = 0', { size: 12, fill: '#1b7f4a', bold: true });
    return s + '</svg>';
  };

  FIG['avz-qui-39'] = function () {
    var s = open(700, 300);
    s += title('Antes de N₂ + 3 H₂ → 2 NH₃');
    s += T(40, 56, '3 moléculas de N₂', { bold: true });
    s += T(360, 56, '6 moléculas de H₂', { bold: true });
    function n2(x, y) {
      s += circ(x, y, 12, '#1d4ed8', '#0e2a47');
      s += circ(x + 26, y, 12, '#1d4ed8', '#0e2a47');
      s += L(x + 10, y - 3, x + 16, y - 3, { w: 1.6 });
      s += L(x + 10, y + 3, x + 16, y + 3, { w: 1.6 });
    }
    function h2(x, y) {
      s += circ(x, y, 9, '#e2e8f0', '#0e2a47');
      s += circ(x + 20, y, 9, '#e2e8f0', '#0e2a47');
    }
    n2(50, 110); n2(50, 170); n2(50, 230);
    h2(360, 100); h2(430, 100); h2(500, 100);
    h2(360, 170); h2(430, 170); h2(500, 170);
    s += T(40, 282, 'H₂ se acaba primero: limitante. Queda 1 N₂ y se forman 4 NH₃.', { size: 12, fill: '#5c6b78' });
    return s + '</svg>';
  };

  function barsBiblio() {
    var s = '';
    s += title('Uso semanal de una biblioteca digital según conectividad');
    s += L(70, 50, 70, 260, { stroke: '#1d2125', w: 1.3 });
    s += L(70, 260, 640, 260, { stroke: '#1d2125', w: 1.3 });
    var vals = [78, 46, 21], labels = ['Conexión\nestable', 'Conexión\ninestable', 'Sin internet\nen casa'];
    var cols = ['#2563eb', '#ea580c', '#64748b'];
    for (var i = 0; i < 3; i++) {
      var h = vals[i] * 2.2;
      var x = 130 + i * 160;
      s += '<rect x="' + x + '" y="' + (260 - h) + '" width="90" height="' + h + '" fill="' + cols[i] + '" rx="3"/>';
      s += T(x + 45, 260 - h - 8, vals[i] + ' %', { anchor: 'middle', bold: true });
      s += T(x + 45, 280, labels[i].split('\n')[0], { anchor: 'middle', size: 12 });
      s += T(x + 45, 296, labels[i].split('\n')[1] || '', { anchor: 'middle', size: 12 });
    }
    s += T(24, 160, '%', { size: 12, italic: true });
    return s;
  }

  FIG['avz-len-35'] = function () {
    return open(680, 320) + barsBiblio() + '</svg>';
  };
  FIG['avz-len-36'] = function () {
    return open(680, 320) + barsBiblio() + T(360, 314, 'Asociación ≠ causa. Falta evidencia adicional.', { anchor: 'middle', size: 12, fill: '#b3261e' }) + '</svg>';
  };

  FIG['avz-len-37'] = function () {
    var s = open(700, 240);
    s += title('Proceso comunicativo con interferencia');
    function box(x, y, w, lab) { s += rect(x, y, w, 48, '#eff6ff', 6); s += T(x + w / 2, y + 30, lab, { anchor: 'middle', bold: true }); }
    box(30, 90, 110, 'Emisor');
    box(200, 90, 130, 'Mensaje');
    box(390, 90, 120, 'Canal');
    box(570, 90, 110, 'Receptor');
    s += L(140, 114, 196, 114, { arrow: true });
    s += L(330, 114, 386, 114, { arrow: true });
    s += L(510, 114, 566, 114, { arrow: true });
    s += rect(390, 160, 120, 40, '#fee2e2', 6);
    s += T(450, 186, 'RUIDO', { anchor: 'middle', bold: true, fill: '#b3261e' });
    s += L(450, 160, 450, 138, { stroke: '#b3261e', w: 2, arrow: true, mk: 'url(#avz-ahr)' });
    s += T(40, 220, 'Los cortes de audio alteran el mensaje en el canal, no la intención del emisor.', { size: 12, fill: '#5c6b78' });
    return s + '</svg>';
  };

  FIG['avz-len-38'] = function () {
    var s = open(680, 280);
    s += title('De un ensayo local a una conclusión demasiado amplia');
    s += rect(40, 70, 200, 90, '#dbeafe', 6);
    s += T(140, 108, '1 curso', { anchor: 'middle', bold: true });
    s += T(140, 130, '3 meses', { anchor: 'middle' });
    s += L(240, 115, 300, 115, { arrow: true });
    s += rect(300, 70, 160, 90, '#dcfce7', 6);
    s += T(380, 122, 'más puntualidad', { anchor: 'middle', bold: true, size: 13 });
    s += L(460, 115, 520, 115, { arrow: true });
    s += rect(520, 60, 140, 110, '#fee2e2', 6);
    s += T(590, 100, '«funcionará', { anchor: 'middle', bold: true, size: 12, fill: '#b3261e' });
    s += T(590, 118, 'siempre, en', { anchor: 'middle', bold: true, size: 12, fill: '#b3261e' });
    s += T(590, 136, 'cualquier', { anchor: 'middle', bold: true, size: 12, fill: '#b3261e' });
    s += T(590, 154, 'institución»', { anchor: 'middle', bold: true, size: 12, fill: '#b3261e' });
    s += T(40, 210, 'La evidencia solo cubre ese curso y ese periodo. Hay que acotar la conclusión.', { size: 13 });
    return s + '</svg>';
  };

  FIG['avz-len-39'] = function () {
    var s = open(720, 320);
    s += title('Cuatro enunciados para armar un párrafo');
    var cards = [
      ['1', 'Por ello, dormir bien antes de estudiar favorece el repaso.'],
      ['2', 'El sueño cumple un papel importante en la memoria.'],
      ['3', 'Durante el sueño, el cerebro consolida parte de lo aprendido.'],
      ['4', 'No obstante, dormir no reemplaza la práctica ni la comprensión.']
    ];
    for (var i = 0; i < 4; i++) {
      var x = 20 + (i % 2) * 350;
      var y = 50 + Math.floor(i / 2) * 120;
      s += rect(x, y, 330, 100, '#f8fafc', 8);
      s += circ(x + 24, y + 28, 14, '#2563eb', '#1e3a8a');
      s += T(x + 24, y + 33, cards[i][0], { anchor: 'middle', fill: '#fff', bold: true, size: 14 });
      s += T(x + 50, y + 56, cards[i][1].slice(0, 38), { size: 13 });
      s += T(x + 50, y + 76, cards[i][1].slice(38), { size: 13 });
    }
    return s + '</svg>';
  };

  window.FIG_AVZ = FIG;
})();
