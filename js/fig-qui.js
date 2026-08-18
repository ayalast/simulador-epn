/* Figuras pedagógicas de Química — cada una enseña un mapa distinto. */
(function () {
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function open(w, h) {
    return '<svg width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h +
      '" xmlns="http://www.w3.org/2000/svg" font-family="Georgia, serif" overflow="visible">' +
      '<defs><marker id="qui-ah" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">' +
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
      (o.arrow ? ' marker-end="url(#qui-ah)"' : '') + '/>';
  }
  function circ(cx, cy, r, fill, stroke) {
    return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + (fill || '#fff') +
      '" stroke="' + (stroke || '#0e2a47') + '" stroke-width="1.3"/>';
  }
  function rect(x, y, w, h, fill, rx) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (rx || 6) +
      '" fill="' + (fill || '#fff') + '" stroke="#1d2125" stroke-width="1.3"/>';
  }

  var FIG = {};

  FIG['qui-clasif-materia'] = function () {
    var s = open(720, 250);
    s += T(20, 26, 'Clasificación: ¿se puede separar? ¿se ve una sola fase?', { bold: true, size: 15 });
    s += rect(280, 40, 140, 36, '#f4f1fb');
    s += T(350, 64, 'MATERIA', { anchor: 'middle', bold: true });
    s += L(350, 76, 180, 110, { w: 1.5 });
    s += L(350, 76, 520, 110, { w: 1.5 });
    s += rect(90, 110, 180, 36, '#eef7ef');
    s += T(180, 134, 'Sustancia pura', { anchor: 'middle', bold: true, size: 13 });
    s += rect(430, 110, 200, 36, '#fff8e6');
    s += T(530, 134, 'Mezcla', { anchor: 'middle', bold: true, size: 13 });
    s += rect(40, 180, 120, 40, '#c8e6c9');
    s += T(100, 206, 'Elemento', { anchor: 'middle', size: 13, bold: true });
    s += rect(180, 180, 130, 40, '#a5d6a7');
    s += T(245, 206, 'Compuesto', { anchor: 'middle', size: 13, bold: true });
    s += rect(400, 180, 130, 40, '#ffe0b2');
    s += T(465, 206, 'Homogénea', { anchor: 'middle', size: 12, bold: true });
    s += rect(550, 180, 140, 40, '#ffcc80');
    s += T(620, 206, 'Heterogénea', { anchor: 'middle', size: 12, bold: true });
    return s + '</svg>';
  };

  FIG['qui-cambios-estado'] = function () {
    var s = open(700, 230);
    s += T(20, 26, 'Cambios de estado: nombres que debes poder escribir', { bold: true, size: 15 });
    s += rect(40, 90, 120, 50, '#e3f2fd');
    s += T(100, 120, 'Sólido', { anchor: 'middle', bold: true });
    s += rect(280, 90, 120, 50, '#bbdefb');
    s += T(340, 120, 'Líquido', { anchor: 'middle', bold: true });
    s += rect(520, 90, 120, 50, '#90caf9');
    s += T(580, 120, 'Gas', { anchor: 'middle', bold: true });
    s += L(160, 105, 276, 105, { arrow: true, stroke: '#b3261e', w: 1.8 });
    s += T(180, 96, 'fusión', { size: 12, fill: '#b3261e', bold: true });
    s += L(276, 125, 160, 125, { arrow: true, stroke: '#0f6cbf', w: 1.8 });
    s += T(180, 148, 'solidificación', { size: 11, fill: '#0f6cbf' });
    s += L(400, 105, 516, 105, { arrow: true, stroke: '#b3261e', w: 1.8 });
    s += T(420, 96, 'ebullición', { size: 12, fill: '#b3261e', bold: true });
    s += L(516, 125, 400, 125, { arrow: true, stroke: '#0f6cbf', w: 1.8 });
    s += T(418, 148, 'condensación', { size: 11, fill: '#0f6cbf' });
    s += T(200, 190, 'sólido ↔ gas: sublimación / deposición', { size: 13, bold: true });
    return s + '</svg>';
  };

  FIG['qui-atomo-AZ'] = function () {
    var s = open(700, 240);
    s += T(20, 26, 'Átomo: protones (Z), neutrones, electrones y la notación A/Z', { bold: true, size: 15 });
    s += circ(180, 140, 70, '#f7fbff', '#7b3f98');
    s += circ(180, 140, 16, '#b3261e');
    s += T(180, 144, 'p+ n', { anchor: 'middle', fill: '#fff', size: 11, bold: true });
    s += circ(230, 100, 7, '#0f6cbf');
    s += circ(130, 90, 7, '#0f6cbf');
    s += circ(125, 180, 7, '#0f6cbf');
    s += T(250, 90, 'e⁻', { fill: '#0f6cbf', bold: true });
    s += T(360, 80, 'A  →  masa (p + n)', { size: 16, bold: true });
    s += T(360, 120, 'Z  →  protones = elemento', { size: 16, bold: true });
    s += T(360, 160, 'carga = Z − e⁻', { size: 16, bold: true });
    s += T(360, 200, 'neutrones = A − Z', { size: 16, bold: true });
    return s + '</svg>';
  };

  FIG['qui-moller'] = function () {
    var s = open(720, 250);
    s += T(20, 26, 'Diagrama de Möller: el orden real de llenado', { bold: true, size: 15 });
    var rows = ['1s', '2s  2p', '3s  3p  3d', '4s  4p  4d  4f', '5s  5p  5d  5f', '6s  6p  6d', '7s  7p'];
    rows.forEach(function (r, i) {
      s += T(40, 60 + i * 24, r, { size: 14, bold: true });
    });
    s += L(200, 55, 80, 210, { arrow: true, stroke: '#7b3f98', w: 2 });
    s += L(280, 70, 140, 220, { arrow: true, stroke: '#7b3f98', w: 2 });
    s += T(320, 90, 'Las flechas diagonales', { size: 14, bold: true });
    s += T(320, 114, 'dan el orden:', { size: 14, bold: true });
    s += T(320, 150, '1s 2s 2p 3s 3p 4s 3d 4p…', { size: 15, fill: '#7b3f98', bold: true });
    s += T(320, 186, '4s se llena antes que 3d.', { size: 13 });
    return s + '</svg>';
  };

  FIG['qui-bloques-spf'] = function () {
    var s = open(720, 230);
    s += T(20, 26, 'Tabla por bloques: el último subnivel que se está llenando', { bold: true, size: 15 });
    s += rect(40, 70, 70, 130, '#ffe0b2');
    s += T(75, 140, 's', { anchor: 'middle', bold: true, size: 22 });
    s += rect(120, 90, 260, 110, '#c8e6c9');
    s += T(250, 150, 'd', { anchor: 'middle', bold: true, size: 22 });
    s += rect(390, 70, 140, 130, '#bbdefb');
    s += T(460, 140, 'p', { anchor: 'middle', bold: true, size: 22 });
    s += rect(160, 50, 280, 30, '#f8bbd0');
    s += T(300, 72, 'f  (abajo, lantánidos/actínidos)', { anchor: 'middle', size: 13, bold: true });
    s += T(40, 216, 'Grupo 1–2: bloque s ·  13–18: p ·  metales de transición: d', { size: 13, bold: true });
    return s + '</svg>';
  };

  FIG['qui-modelos-atomicos'] = function () {
    var s = open(720, 230);
    s += T(20, 26, 'Cinco modelos: de la bolita a la nube', { bold: true, size: 15 });
    var names = ['Dalton', 'Thomson', 'Rutherford', 'Bohr', 'Cuántico'];
    names.forEach(function (n, i) {
      var x = 50 + i * 135;
      s += circ(x + 40, 120, 32, '#f7fbff', '#7b3f98');
      if (i === 1) {
        s += circ(x + 28, 112, 4, '#0f6cbf');
        s += circ(x + 52, 128, 4, '#b3261e');
      }
      if (i === 2) s += circ(x + 40, 120, 6, '#b3261e');
      if (i === 3) {
        s += circ(x + 40, 120, 6, '#b3261e');
        s += circ(x + 40, 120, 22, 'none', '#0f6cbf');
      }
      if (i === 4) {
        s += circ(x + 40, 120, 6, '#b3261e');
        s += circ(x + 40, 120, 20, 'rgba(123,63,152,.15)', '#7b3f98');
      }
      s += T(x + 40, 175, n, { anchor: 'middle', bold: true, size: 12 });
    });
    return s + '</svg>';
  };

  FIG['qui-cuanticos'] = function () {
    var s = open(720, 240);
    s += T(20, 26, 'Cuatro números: n, ℓ, mℓ, ms', { bold: true, size: 15 });
    s += rect(30, 50, 160, 160, '#eef6ff');
    s += T(110, 80, 'n = 1, 2, 3…', { anchor: 'middle', bold: true });
    s += T(110, 110, 'nivel / piso', { anchor: 'middle', size: 13 });
    s += T(110, 150, 'tamaño', { anchor: 'middle', size: 13 });
    s += rect(200, 50, 160, 160, '#eef7ef');
    s += T(280, 80, 'ℓ = 0…n−1', { anchor: 'middle', bold: true });
    s += T(280, 110, 's p d f', { anchor: 'middle', size: 13 });
    s += T(280, 150, 'forma', { anchor: 'middle', size: 13 });
    s += rect(370, 50, 160, 160, '#fff8e6');
    s += T(450, 80, 'mℓ = −ℓ…+ℓ', { anchor: 'middle', bold: true });
    s += T(450, 110, 'orientación', { anchor: 'middle', size: 13 });
    s += rect(540, 50, 160, 160, '#fdeceb');
    s += T(620, 80, 'ms = ±1/2', { anchor: 'middle', bold: true });
    s += T(620, 120, 'espín', { anchor: 'middle', size: 13 });
    s += T(30, 228, 's es esfera (ℓ=0). p son dos lóbulos (ℓ=1). Combinación imposible: n=1 y ℓ=1.', { size: 13, bold: true });
    return s + '</svg>';
  };

  FIG['qui-tabla-bloques'] = function () {
    var s = open(720, 220);
    s += T(20, 26, 'Posición = configuración: el periodo es n del último electrón', { bold: true, size: 15 });
    s += rect(40, 60, 80, 120, '#ffe0b2');
    s += T(80, 100, 's', { anchor: 'middle', bold: true, size: 18 });
    s += T(80, 150, 'grupos 1–2', { anchor: 'middle', size: 11 });
    s += rect(140, 90, 280, 90, '#c8e6c9');
    s += T(280, 140, 'd  (n−1)', { anchor: 'middle', bold: true, size: 16 });
    s += rect(440, 60, 160, 120, '#bbdefb');
    s += T(520, 110, 'p', { anchor: 'middle', bold: true, size: 18 });
    s += T(520, 150, '13–18', { anchor: 'middle', size: 12 });
    s += T(40, 200, 'Na es 3s¹: periodo 3, grupo 1, bloque s.  Cl es 3s² 3p⁵: periodo 3, grupo 17, bloque p.', { size: 13, bold: true });
    return s + '</svg>';
  };

  FIG['qui-metales-escalera'] = function () {
    var s = open(700, 220);
    s += T(20, 26, 'Metales (izq.), no metales (der.) y la escalera de metaloides', { bold: true, size: 15 });
    s += rect(40, 60, 360, 120, '#fff3e0');
    s += T(80, 120, 'METALES', { bold: true, size: 18 });
    s += '<path d="M400 60 L400 100 L440 100 L440 130 L480 130 L480 160 L520 160 L520 180 L400 180 Z" fill="#e1bee7" stroke="#0e2a47"/>';
    s += T(410, 150, 'escalera', { size: 12, bold: true });
    s += rect(520, 60, 150, 120, '#e3f2fd');
    s += T(540, 120, 'NO', { bold: true, size: 16 });
    s += T(540, 144, 'METALES', { bold: true, size: 16 });
    return s + '</svg>';
  };

  FIG['qui-carga-efectiva'] = function () {
    var s = open(700, 220);
    s += T(20, 26, 'En un periodo el núcleo tira más: el átomo se encoge', { bold: true, size: 15 });
    s += circ(140, 130, 55, 'rgba(15,108,191,.15)', '#0f6cbf');
    s += circ(140, 130, 8, '#b3261e');
    s += T(140, 200, 'Na  (grande)', { anchor: 'middle', bold: true });
    s += circ(400, 130, 28, 'rgba(179,38,30,.15)', '#b3261e');
    s += circ(400, 130, 10, '#b3261e');
    s += T(400, 200, 'Cl  (más Z, mismo n)', { anchor: 'middle', bold: true });
    s += T(500, 90, 'Abajo en el grupo', { size: 14 });
    s += T(500, 114, 'hay más pisos → crece.', { size: 14 });
    return s + '</svg>';
  };

  FIG['qui-flechas-periodicas'] = function () {
    var s = open(640, 230);
    s += T(20, 26, 'Dos flechas maestras', { bold: true, size: 15 });
    s += rect(40, 50, 260, 150, '#eef6ff');
    s += T(70, 80, 'TAMAÑO', { bold: true, size: 16 });
    s += L(80, 110, 80, 180, { arrow: true, stroke: '#0f6cbf', w: 3 });
    s += L(90, 170, 250, 170, { arrow: true, stroke: '#0f6cbf', w: 3 });
    s += T(90, 130, 'crece ↓ y ←', { fill: '#0f6cbf', bold: true });
    s += rect(340, 50, 260, 150, '#fdeceb');
    s += T(360, 80, 'EN / IE / fuerza', { bold: true, size: 16 });
    s += L(560, 180, 560, 110, { arrow: true, stroke: '#b3261e', w: 3 });
    s += L(360, 110, 550, 110, { arrow: true, stroke: '#b3261e', w: 3 });
    s += T(370, 150, 'crece ↑ y →', { fill: '#b3261e', bold: true });
    return s + '</svg>';
  };

  FIG['qui-mapa-binarios'] = function () {
    var s = open(720, 230);
    s += T(20, 26, 'Binarios: metal o no metal + O, H u otro', { bold: true, size: 15 });
    s += rect(30, 60, 150, 50, '#ffe0b2');
    s += T(105, 90, 'Metal + O', { anchor: 'middle', bold: true, size: 13 });
    s += T(105, 130, 'óxido básico', { anchor: 'middle', size: 12 });
    s += rect(200, 60, 160, 50, '#bbdefb');
    s += T(280, 90, 'No metal + O', { anchor: 'middle', bold: true, size: 13 });
    s += T(280, 130, 'óxido ácido', { anchor: 'middle', size: 12 });
    s += rect(380, 60, 150, 50, '#c8e6c9');
    s += T(455, 90, 'Metal + H', { anchor: 'middle', bold: true, size: 13 });
    s += T(455, 130, 'hidruro', { anchor: 'middle', size: 12 });
    s += rect(550, 60, 150, 50, '#f8bbd0');
    s += T(625, 90, 'No metal + H', { anchor: 'middle', bold: true, size: 13 });
    s += T(625, 130, 'hidrácido', { anchor: 'middle', size: 12 });
    s += T(30, 180, 'Metal + no metal = sal binaria (NaCl).  Metal + O + extra O = peróxido (Na2O2).', { size: 13, bold: true });
    return s + '</svg>';
  };

  FIG['qui-ruta-sales'] = function () {
    var s = open(720, 230);
    s += T(20, 26, 'Ruta a la sal ternaria: óxido → hidróxido/oxácido → sal', { bold: true, size: 15 });
    s += rect(20, 70, 100, 40, '#ffe0b2');
    s += T(70, 96, 'Metal', { anchor: 'middle', bold: true, size: 13 });
    s += L(120, 90, 160, 90, { arrow: true });
    s += rect(160, 70, 120, 40, '#fff3e0');
    s += T(220, 96, 'óxido bás.', { anchor: 'middle', size: 13, bold: true });
    s += L(280, 90, 320, 90, { arrow: true });
    s += rect(320, 70, 120, 40, '#ffe0b2');
    s += T(380, 96, 'hidróxido', { anchor: 'middle', size: 13, bold: true });
    s += rect(20, 150, 100, 40, '#bbdefb');
    s += T(70, 176, 'No metal', { anchor: 'middle', bold: true, size: 13 });
    s += L(120, 170, 160, 170, { arrow: true });
    s += rect(160, 150, 120, 40, '#e3f2fd');
    s += T(220, 176, 'óxido ác.', { anchor: 'middle', size: 13, bold: true });
    s += L(280, 170, 320, 170, { arrow: true });
    s += rect(320, 150, 120, 40, '#bbdefb');
    s += T(380, 176, 'oxácido', { anchor: 'middle', size: 13, bold: true });
    s += L(440, 90, 500, 140, { arrow: true, stroke: '#7b3f98', w: 2 });
    s += L(440, 170, 500, 150, { arrow: true, stroke: '#7b3f98', w: 2 });
    s += rect(500, 120, 180, 50, '#e1bee7');
    s += T(590, 150, 'sal ternaria', { anchor: 'middle', bold: true });
    return s + '</svg>';
  };

  FIG['qui-tres-enlaces'] = function () {
    var s = open(720, 230);
    s += T(20, 26, 'El tipo de enlace lo decide ΔEN (resta de electronegatividades)', { bold: true, size: 15 });
    s += rect(30, 55, 210, 140, '#fdeceb');
    s += T(135, 84, 'Iónico', { anchor: 'middle', bold: true, size: 16 });
    s += T(135, 114, 'ΔEN ≳ 1,7', { anchor: 'middle', size: 13 });
    s += T(135, 140, 'NaCl: e⁻ se transfiere', { anchor: 'middle', size: 12 });
    s += T(135, 168, 'sólido, conduce fundido', { anchor: 'middle', size: 12 });
    s += rect(255, 55, 210, 140, '#eef6ff');
    s += T(360, 84, 'Covalente', { anchor: 'middle', bold: true, size: 16 });
    s += T(360, 114, 'ΔEN pequeño', { anchor: 'middle', size: 13 });
    s += T(360, 140, 'H2O, CO2: se comparten', { anchor: 'middle', size: 12 });
    s += rect(480, 55, 210, 140, '#cfd8dc');
    s += T(585, 84, 'Metálico', { anchor: 'middle', bold: true, size: 16 });
    s += T(585, 114, 'mar de e⁻', { anchor: 'middle', size: 13 });
    s += T(585, 140, 'Cu, Fe: maleable', { anchor: 'middle', size: 12 });
    s += T(585, 168, 'conduce sólido', { anchor: 'middle', size: 12 });
    return s + '</svg>';
  };

  FIG['qui-simbolos-lewis'] = function () {
    var s = open(720, 220);
    s += T(20, 26, 'Puntos de Lewis = electrones de valencia (el grupo A)', { bold: true, size: 15 });
    var items = [['H', 1], ['C', 4], ['N', 5], ['O', 6], ['F', 7], ['Ne', 8]];
    items.forEach(function (it, i) {
      var x = 70 + i * 110;
      s += T(x, 120, it[0], { anchor: 'middle', bold: true, size: 22 });
      var dots = it[1];
      var pos = [[0, -22], [18, 0], [0, 22], [-18, 0], [10, -22], [18, 12], [-10, 22], [-18, -12]];
      for (var k = 0; k < dots; k++) s += circ(x + pos[k][0], 112 + pos[k][1], 3, '#0e2a47', '#0e2a47');
    });
    s += T(40, 190, 'C tiene 4 puntos: hace 4 enlaces.  Ne tiene 8: no se combina.', { size: 13, bold: true });
    return s + '</svg>';
  };

  FIG['qui-lewis-co2'] = function () {
    var s = open(700, 220);
    s += T(20, 26, 'CO2 paso a paso: O = C = O  (16 e⁻, doble enlace a cada lado)', { bold: true, size: 15 });
    s += T(80, 100, 'O', { bold: true, size: 28 });
    s += T(200, 100, 'C', { bold: true, size: 28 });
    s += T(320, 100, 'O', { bold: true, size: 28 });
    s += L(115, 82, 190, 82, { w: 3, stroke: '#7b3f98' });
    s += L(115, 96, 190, 96, { w: 3, stroke: '#7b3f98' });
    s += L(235, 82, 310, 82, { w: 3, stroke: '#7b3f98' });
    s += L(235, 96, 310, 96, { w: 3, stroke: '#7b3f98' });
    s += circ(70, 78, 3, '#0e2a47', '#0e2a47');
    s += circ(70, 92, 3, '#0e2a47', '#0e2a47');
    s += circ(70, 106, 3, '#0e2a47', '#0e2a47');
    s += circ(70, 120, 3, '#0e2a47', '#0e2a47');
    s += circ(360, 78, 3, '#0e2a47', '#0e2a47');
    s += circ(360, 92, 3, '#0e2a47', '#0e2a47');
    s += circ(360, 106, 3, '#0e2a47', '#0e2a47');
    s += circ(360, 120, 3, '#0e2a47', '#0e2a47');
    s += T(80, 170, '1. contar e⁻   2. esqueleto   3. octetos   4. múltiples si faltan   5. carga formal', { size: 13, bold: true });
    return s + '</svg>';
  };

  FIG['qui-trepev'] = function () {
    var s = open(720, 240);
    s += T(20, 26, 'TRePEV: la forma la imponen los pares alrededor del átomo central', { bold: true, size: 15 });
    var geos = [
      [70, 'lineal', '180°', 'CO2'],
      [200, 'angular', '104,5°', 'H2O'],
      [340, 'trigonal', '120°', 'BF3'],
      [480, 'pirámide', '107°', 'NH3'],
      [620, 'tetraedro', '109,5°', 'CH4']
    ];
    geos.forEach(function (g) {
      s += circ(g[0], 110, 10, '#7b3f98');
      s += T(g[0], 160, g[1], { anchor: 'middle', bold: true, size: 12 });
      s += T(g[0], 180, g[2], { anchor: 'middle', size: 12, fill: '#b3261e' });
      s += T(g[0], 202, g[3], { anchor: 'middle', size: 12 });
    });
    s += L(70, 110, 40, 70, { w: 2 });
    s += L(70, 110, 100, 70, { w: 2 });
    s += L(200, 110, 170, 70, { w: 2 });
    s += L(200, 110, 230, 150, { w: 2 });
    s += L(340, 110, 310, 70, { w: 2 });
    s += L(340, 110, 370, 70, { w: 2 });
    s += L(340, 110, 340, 155, { w: 2 });
    return s + '</svg>';
  };

  FIG['qui-co2-h2o'] = function () {
    var s = open(700, 220);
    s += T(20, 26, 'Misma idea, distinta forma: CO2 apolar · H2O polar', { bold: true, size: 15 });
    s += T(80, 70, 'O = C = O', { bold: true, size: 20 });
    s += T(80, 110, 'lineal y simétrica', { size: 13 });
    s += T(80, 134, 'los dipolos se anulan', { size: 13 });
    s += T(80, 166, 'APOLAR', { bold: true, fill: '#0f6cbf', size: 16 });
    s += T(400, 70, 'H–O–H', { bold: true, size: 20 });
    s += T(400, 110, 'angular, no se anulan', { size: 13 });
    s += T(400, 134, 'hay lado δ− y lado δ+', { size: 13 });
    s += T(400, 166, 'POLAR', { bold: true, fill: '#b3261e', size: 16 });
    return s + '</svg>';
  };

  FIG['qui-cuatro-fuerzas'] = function () {
    var s = open(720, 230);
    s += T(20, 26, 'De más débil a más fuerte (entre moléculas)', { bold: true, size: 15 });
    var fs = [
      [30, '#e3f2fd', 'London', 'todas, incluso He'],
      [200, '#bbdefb', 'dipolo-dipolo', 'moléculas polares'],
      [370, '#90caf9', 'puente H', 'H con N, O, F'],
      [540, '#64b5f6', 'ion-dipolo', 'sal en agua']
    ];
    fs.forEach(function (f) {
      s += rect(f[0], 60, 160, 120, f[1]);
      s += T(f[0] + 80, 100, f[2], { anchor: 'middle', bold: true, size: 14 });
      s += T(f[0] + 80, 140, f[3], { anchor: 'middle', size: 12 });
    });
    s += T(30, 206, 'Más fuerte → hierve más alto. El agua es líquida por los puentes de hidrógeno.', { size: 13, bold: true });
    return s + '</svg>';
  };

  FIG['qui-mapa-mol'] = function () {
    var s = open(720, 230);
    s += T(20, 26, 'El mol conecta gramos, partículas y litros de gas', { bold: true, size: 15 });
    s += rect(280, 90, 120, 50, '#e1bee7');
    s += T(340, 122, 'MOL', { anchor: 'middle', bold: true, size: 18 });
    s += rect(40, 90, 140, 50, '#fff8e6');
    s += T(110, 122, 'gramos', { anchor: 'middle', bold: true });
    s += rect(500, 40, 180, 50, '#eef6ff');
    s += T(590, 72, 'partículas', { anchor: 'middle', bold: true });
    s += rect(500, 140, 180, 50, '#eef7ef');
    s += T(590, 172, 'litros (gas)', { anchor: 'middle', bold: true });
    s += L(180, 115, 276, 115, { arrow: true });
    s += L(276, 115, 180, 115);
    s += T(190, 100, 'M (g/mol)', { size: 11 });
    s += L(400, 100, 500, 70, { arrow: true });
    s += T(410, 70, 'NA', { size: 11 });
    s += L(400, 130, 500, 160, { arrow: true });
    s += T(410, 168, '22,4 L', { size: 11 });
    return s + '</svg>';
  };

  FIG['qui-pasos-empirica'] = function () {
    var s = open(720, 210);
    s += T(20, 26, 'Cinco pasos: del análisis a la fórmula', { bold: true, size: 15 });
    var ps = ['1. % → g', '2. g → mol', '3. ÷ menor', '4. enteros', '5. × n → molecular'];
    ps.forEach(function (p, i) {
      s += rect(20 + i * 140, 80, 130, 70, i === 4 ? '#e1bee7' : '#eef6ff');
      s += T(85 + i * 140, 122, p, { anchor: 'middle', bold: true, size: 12 });
      if (i < 4) s += L(150 + i * 140, 115, 160 + i * 140, 115, { arrow: true });
    });
    return s + '</svg>';
  };

  FIG['qui-cinco-reacciones'] = function () {
    var s = open(720, 240);
    s += T(20, 26, 'Cinco tipos + balanceo por tanteo (átomos iguales a ambos lados)', { bold: true, size: 15 });
    var rs = [
      ['Síntesis', 'A + B → AB'],
      ['Descomposición', 'AB → A + B'],
      ['Despl. simple', 'A + BC → AC + B'],
      ['Doble despl.', 'AB + CD → AD + CB'],
      ['Combustión', 'CxHy + O2 → CO2 + H2O']
    ];
    rs.forEach(function (r, i) {
      var y = 55 + i * 34;
      s += rect(40, y, 180, 28, '#f4f1fb');
      s += T(50, y + 20, r[0], { bold: true, size: 13 });
      s += T(240, y + 20, r[1], { size: 14, bold: true });
    });
    return s + '</svg>';
  };

  FIG['qui-mapa-esteq'] = function () {
    var s = open(720, 200);
    s += T(20, 26, 'Mapa maestro: siempre pasa por moles', { bold: true, size: 15 });
    var boxes = ['g de A', 'mol de A', 'mol de B', 'g de B'];
    boxes.forEach(function (b, i) {
      s += rect(30 + i * 175, 80, 150, 50, i === 1 || i === 2 ? '#e1bee7' : '#fff8e6');
      s += T(105 + i * 175, 112, b, { anchor: 'middle', bold: true });
      if (i < 3) s += L(180 + i * 175, 105, 200 + i * 175, 105, { arrow: true, stroke: '#7b3f98', w: 2 });
    });
    s += T(80, 160, '÷ M', { size: 12 });
    s += T(250, 160, 'coeficientes', { size: 12, fill: '#7b3f98', bold: true });
    s += T(430, 160, '× M', { size: 12 });
    return s + '</svg>';
  };

  FIG['qui-limitante'] = function () {
    var s = open(700, 220);
    s += T(20, 26, 'Limitante: se acaba primero y decide cuánto producto sale', { bold: true, size: 15 });
    s += rect(40, 70, 70, 40, '#ffe0b2');
    s += rect(120, 70, 70, 40, '#ffe0b2');
    s += rect(40, 120, 70, 40, '#bbdefb');
    s += T(200, 100, '2 panes + 1 queso = 1 sándwich', { size: 14, bold: true });
    s += T(200, 130, 'Si hay 5 panes y 1 queso,', { size: 14 });
    s += T(200, 156, 'el queso limita: solo 1 sándwich.', { size: 14, fill: '#b3261e', bold: true });
    s += T(40, 190, 'Rendimiento % = (real / teórico) × 100', { size: 14, bold: true });
    return s + '</svg>';
  };

  window.FIG_QUI = FIG;
})();
