/* Figuras pedagógicas de Lenguaje — un diagrama por idea, en español. */
(function () {
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function open(w, h) {
    return '<svg width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h +
      '" xmlns="http://www.w3.org/2000/svg" font-family="Georgia, serif" overflow="visible">' +
      '<defs><marker id="len-ah" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">' +
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
      (o.arrow ? ' marker-end="url(#len-ah)"' : '') + '/>';
  }
  function rect(x, y, w, h, fill) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="8" fill="' +
      (fill || '#fff8e6') + '" stroke="#0e2a47" stroke-width="1.3"/>';
  }

  var FIG = {};

  FIG['len-circuito'] = function () {
    var s = open(720, 250);
    s += T(20, 24, 'Circuito de la comunicación (no es un paquete: hay ida y vuelta)', { bold: true, size: 15 });
    var boxes = [
      [20, 'Emisor'], [140, 'Codifica'], [260, 'Mensaje'], [380, 'Canal'], [500, 'Decodifica'], [620, 'Receptor']
    ];
    boxes.forEach(function (b, i) {
      s += rect(b[0], 70, 90, 40, '#fff3e0');
      s += T(b[0] + 45, 96, b[1], { anchor: 'middle', bold: true, size: 11 });
      if (i < 5) s += L(b[0] + 90, 90, b[0] + 118, 90, { arrow: true, stroke: '#b35c00', w: 1.8 });
    });
    s += L(665, 110, 665, 170, { stroke: '#1f7a3f', w: 1.6 });
    s += L(665, 170, 55, 170, { stroke: '#1f7a3f', w: 1.6 });
    s += L(55, 170, 55, 110, { arrow: true, stroke: '#1f7a3f', w: 1.6 });
    s += T(250, 164, 'retroalimentación', { fill: '#1f7a3f', bold: true, size: 13 });
    s += rect(160, 196, 400, 36, '#fdeceb');
    s += T(360, 220, 'Ruido: físico · semántico · psicológico · cultural', { anchor: 'middle', size: 13, bold: true, fill: '#b3261e' });
    return s + '</svg>';
  };

  FIG['len-premisas'] = function () {
    var s = open(700, 220);
    s += T(20, 24, 'Un argumento es un puente: premisas → inferencia → conclusión', { bold: true, size: 15 });
    s += rect(40, 80, 170, 70, '#eef6ff');
    s += T(125, 110, 'Premisas', { anchor: 'middle', bold: true });
    s += T(125, 132, 'datos / razones', { anchor: 'middle', size: 12 });
    s += L(210, 115, 270, 115, { arrow: true, stroke: '#b35c00', w: 2 });
    s += rect(270, 80, 170, 70, '#fff8e6');
    s += T(355, 110, 'Inferencia', { anchor: 'middle', bold: true });
    s += T(355, 132, 'el puente', { anchor: 'middle', size: 12 });
    s += L(440, 115, 500, 115, { arrow: true, stroke: '#b35c00', w: 2 });
    s += rect(500, 80, 170, 70, '#eef7ef');
    s += T(585, 110, 'Conclusión', { anchor: 'middle', bold: true });
    s += T(585, 132, 'lo que se sostiene', { anchor: 'middle', size: 12 });
    s += T(40, 186, 'Verdad = las premisas coinciden con los hechos.  Validez = el puente sostiene.', { size: 13, bold: true });
    return s + '</svg>';
  };

  FIG['len-hecho-juicio'] = function () {
    var s = open(720, 210);
    s += T(20, 24, 'Cuatro escalones: no digas “opinión” para todo', { bold: true, size: 15 });
    var steps = [
      ['Hecho', 'se verifica', '#eef6ff'],
      ['Inferencia', 'se deriva', '#fff8e6'],
      ['Opinión', 'postura', '#fdeceb'],
      ['Juicio', 'evalúa / propone', '#eef7ef']
    ];
    steps.forEach(function (st, i) {
      s += rect(30 + i * 175, 70, 160, 80, st[2]);
      s += T(110 + i * 175, 104, st[0], { anchor: 'middle', bold: true, size: 15 });
      s += T(110 + i * 175, 130, st[1], { anchor: 'middle', size: 12 });
      if (i < 3) s += L(190 + i * 175, 110, 205 + i * 175, 110, { arrow: true });
    });
    return s + '</svg>';
  };

  FIG['len-ded-ind-abd'] = function () {
    var s = open(720, 230);
    s += T(20, 24, 'Tres razonamientos: no prometen lo mismo', { bold: true, size: 15 });
    s += rect(30, 50, 210, 150, '#eef6ff');
    s += T(135, 80, 'Deducción', { anchor: 'middle', bold: true, size: 16 });
    s += T(135, 110, 'regla → caso', { anchor: 'middle', size: 13 });
    s += T(135, 138, 'conclusión necesaria', { anchor: 'middle', size: 13, fill: '#0f6cbf', bold: true });
    s += T(135, 168, 'si el puente es válido', { anchor: 'middle', size: 12 });
    s += rect(255, 50, 210, 150, '#fff8e6');
    s += T(360, 80, 'Inducción', { anchor: 'middle', bold: true, size: 16 });
    s += T(360, 110, 'casos → patrón', { anchor: 'middle', size: 13 });
    s += T(360, 138, 'conclusión probable', { anchor: 'middle', size: 13, fill: '#b35c00', bold: true });
    s += rect(480, 50, 210, 150, '#fdeceb');
    s += T(585, 80, 'Abducción', { anchor: 'middle', bold: true, size: 16 });
    s += T(585, 110, 'pistas → hipótesis', { anchor: 'middle', size: 13 });
    s += T(585, 138, 'mejor explicación', { anchor: 'middle', size: 13, fill: '#b3261e', bold: true });
    return s + '</svg>';
  };

  FIG['len-niveles-lectura'] = function () {
    var s = open(680, 210);
    s += T(20, 24, 'No saltes al nivel crítico sin haber leído lo que dice', { bold: true, size: 15 });
    s += rect(40, 60, 180, 90, '#eef6ff');
    s += T(130, 96, 'Literal', { anchor: 'middle', bold: true, size: 16 });
    s += T(130, 124, '¿qué dice?', { anchor: 'middle', size: 13 });
    s += L(220, 105, 260, 105, { arrow: true });
    s += rect(260, 60, 180, 90, '#fff8e6');
    s += T(350, 96, 'Inferencial', { anchor: 'middle', bold: true, size: 16 });
    s += T(350, 124, '¿qué implica?', { anchor: 'middle', size: 13 });
    s += L(440, 105, 480, 105, { arrow: true });
    s += rect(480, 60, 180, 90, '#fdeceb');
    s += T(570, 96, 'Crítico', { anchor: 'middle', bold: true, size: 16 });
    s += T(570, 124, '¿con qué solidez?', { anchor: 'middle', size: 13 });
    return s + '</svg>';
  };

  FIG['len-inferencia'] = function () {
    var s = open(700, 220);
    s += T(20, 24, 'Una inferencia respaldada une pista + conocimiento pertinente', { bold: true, size: 15 });
    s += rect(40, 70, 160, 60, '#eef6ff');
    s += T(120, 106, 'Pista textual', { anchor: 'middle', bold: true });
    s += rect(40, 150, 160, 50, '#fff8e6');
    s += T(120, 180, 'Saber pertinente', { anchor: 'middle', bold: true, size: 13 });
    s += L(200, 100, 280, 130, { arrow: true });
    s += L(200, 170, 280, 145, { arrow: true });
    s += rect(280, 110, 170, 55, '#f4f1fb');
    s += T(365, 144, 'Relación lógica', { anchor: 'middle', bold: true });
    s += L(450, 138, 520, 138, { arrow: true });
    s += rect(520, 110, 160, 55, '#eef7ef');
    s += T(600, 144, 'Inferencia', { anchor: 'middle', bold: true });
    return s + '</svg>';
  };

  FIG['len-seis-preguntas'] = function () {
    var s = open(720, 240);
    s += T(20, 24, 'Seis preguntas de lectura crítica (en este orden)', { bold: true, size: 15 });
    var qs = ['1 Fuente', '2 Propósito', '3 Evidencia', '4 Razona', '5 Lenguaje', '6 Omisiones'];
    qs.forEach(function (q, i) {
      var x = 20 + (i % 3) * 230;
      var y = 55 + Math.floor(i / 3) * 80;
      s += rect(x, y, 210, 60, i < 3 ? '#fff8e6' : '#eef6ff');
      s += T(x + 105, y + 36, q, { anchor: 'middle', bold: true, size: 14 });
    });
    return s + '</svg>';
  };

  FIG['len-peel'] = function () {
    var s = open(700, 200);
    s += T(20, 24, 'PEEL: una idea que avanza con orden', { bold: true, size: 15 });
    var p = [
      ['P', 'Punto', 'idea controladora', '#eef6ff'],
      ['E', 'Evidencia', 'dato o ejemplo', '#fff8e6'],
      ['E', 'Explicación', 'por qué apoya', '#fdeceb'],
      ['L', 'Enlace', 'cierre / transición', '#eef7ef']
    ];
    p.forEach(function (it, i) {
      s += rect(25 + i * 170, 60, 155, 100, it[3]);
      s += T(102 + i * 170, 92, it[0], { anchor: 'middle', bold: true, size: 22 });
      s += T(102 + i * 170, 118, it[1], { anchor: 'middle', bold: true, size: 13 });
      s += T(102 + i * 170, 142, it[2], { anchor: 'middle', size: 12 });
      if (i < 3) s += L(180 + i * 170, 110, 195 + i * 170, 110, { arrow: true });
    });
    return s + '</svg>';
  };

  FIG['len-argumento'] = function () {
    var s = open(720, 220);
    s += T(20, 24, 'El dato no “habla solo”: hace falta una garantía', { bold: true, size: 15 });
    s += rect(30, 80, 140, 55, '#eef6ff');
    s += T(100, 114, 'Evidencia', { anchor: 'middle', bold: true });
    s += L(170, 108, 210, 108, { arrow: true });
    s += rect(210, 80, 140, 55, '#fff8e6');
    s += T(280, 114, 'Premisas', { anchor: 'middle', bold: true });
    s += L(350, 108, 390, 108, { arrow: true });
    s += rect(390, 80, 140, 55, '#f4f1fb');
    s += T(460, 114, 'Garantía', { anchor: 'middle', bold: true });
    s += L(530, 108, 570, 108, { arrow: true });
    s += rect(570, 80, 130, 55, '#eef7ef');
    s += T(635, 114, 'Tesis', { anchor: 'middle', bold: true });
    s += rect(300, 160, 240, 40, '#fdeceb');
    s += T(420, 186, 'Objeción y respuesta', { anchor: 'middle', size: 13, bold: true });
    return s + '</svg>';
  };

  FIG['len-puntuacion'] = function () {
    var s = open(720, 230);
    s += T(20, 24, 'Puntuación = tránsito del texto · Concordancia = engranaje', { bold: true, size: 15 });
    var marks = [['.', 'Punto', 'cierra'], [';', 'Punto y coma', 'separa con vínculo'], [',', 'Coma', 'delimita'], [':', 'Dos puntos', 'anuncian']];
    marks.forEach(function (m, i) {
      s += rect(20 + i * 175, 50, 165, 80, '#fff8e6');
      s += T(102 + i * 175, 82, m[0], { anchor: 'middle', bold: true, size: 22 });
      s += T(102 + i * 175, 108, m[2], { anchor: 'middle', size: 12 });
    });
    s += rect(20, 150, 330, 55, '#eef6ff');
    s += T(185, 184, 'Sujeto ↔ verbo  (núm. y persona)', { anchor: 'middle', bold: true, size: 13 });
    s += rect(370, 150, 330, 55, '#eef7ef');
    s += T(535, 184, 'Sustantivo ↔ adjetivo  (género y núm.)', { anchor: 'middle', bold: true, size: 13 });
    return s + '</svg>';
  };

  window.FIG_LEN = FIG;
})();
