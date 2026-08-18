/* Figuras pedagógicas de Física — cada una enseña un fenómeno distinto. */
(function () {
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function open(w, h) {
    return '<svg width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h +
      '" xmlns="http://www.w3.org/2000/svg" font-family="Georgia, serif" overflow="visible">' +
      '<defs><marker id="fis-ah" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">' +
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
      (o.arrow ? ' marker-end="url(#fis-ah)"' : '') + '/>';
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
  function frac(cx, cy, num, den, o) {
    o = o || {};
    var size = o.size || 12, fill = o.fill || '#0e2a47';
    var w = Math.max(String(num).length, String(den).length) * size * 0.58 + 12;
    w = Math.max(w, 24);
    return T(cx, cy - 6, num, { size: size, anchor: 'middle', bold: true, fill: fill }) +
      L(cx - w / 2, cy, cx + w / 2, cy, { stroke: fill, w: 1.3 }) +
      T(cx, cy + size + 2, den, { size: size, anchor: 'middle', bold: true, fill: fill });
  }

  var FIG = {};

  FIG['fis-galileo-ramps'] = function () {
    var s = open(720, 250);
    function ramp(x, riseLen, label) {
      var peak = x + 70;
      s += L(x, 200, peak, 200);
      s += L(peak, 200, peak + 40, 110);
      s += L(peak + 40, 110, peak + 70, 110);
      s += L(peak + 70, 110, peak + 70 + riseLen, 200);
      s += L(peak + 70 + riseLen, 200, peak + 70 + riseLen + 18, 200);
      s += circ(peak + 48, 100, 8, '#b3261e', '#0e2a47');
      s += L(peak + 40, 110, peak + 40, 200, { dash: true, stroke: '#8a97a3' });
      s += T(peak + 28, 218, 'h', { italic: true, bold: true });
      s += T(x + 8, 238, label, { size: 12, bold: true });
    }
    s += T(20, 28, 'Tres rampas de Galileo: la bola persigue la misma altura h', { bold: true, size: 15 });
    ramp(16, 50, '1. Sube hasta h');
    ramp(250, 110, '2. Más lejos, misma h');
    s += L(530, 200, 600, 200);
    s += L(600, 200, 640, 110);
    s += L(640, 110, 700, 110);
    s += circ(648, 100, 8, '#b3261e', '#0e2a47');
    s += T(560, 90, 'nunca para', { fill: '#b3261e', bold: true, size: 12 });
    s += T(545, 238, '3. Horizontal: no hay h', { size: 12, bold: true });
    return s + '</svg>';
  };

  FIG['fis-inertia-scenes'] = function () {
    var s = open(720, 240);
    s += T(20, 26, 'Inercia cotidiana: lo que no cambia de velocidad “sigue”', { bold: true, size: 15 });
    s += rect(20, 50, 220, 150, '#eef6ff');
    s += rect(40, 130, 150, 50, '#8fc7e8');
    s += circ(70, 125, 10, '#f3c778');
    s += L(90, 120, 150, 90, { arrow: true, stroke: '#b3261e', w: 2 });
    s += T(36, 80, 'El bus frena', { bold: true, size: 13 });
    s += T(36, 188, 'Tú sigues a 40 km/h', { size: 12, fill: '#b3261e' });
    s += rect(250, 50, 220, 150, '#fff8e6');
    s += L(270, 150, 450, 150);
    s += rect(300, 118, 50, 32, '#fff');
    s += L(360, 134, 440, 100, { arrow: true, stroke: '#0f6cbf', w: 2 });
    s += T(266, 80, 'Mantel rápido', { bold: true, size: 13 });
    s += T(266, 188, 'El plato se queda', { size: 12 });
    s += rect(480, 50, 220, 150, '#eef7ef');
    s += circ(540, 140, 14, '#f7fbff');
    s += circ(630, 140, 28, '#4a545c');
    s += T(496, 80, 'Misma empujón', { bold: true, size: 13 });
    s += T(500, 188, 'Más masa = más inercia', { size: 12, fill: '#1f7a3f' });
    return s + '</svg>';
  };

  FIG['fis-vector-anatomy'] = function () {
    var s = open(720, 250);
    s += T(20, 26, 'Anatomía de un vector: 50 N a 37°', { bold: true, size: 15 });
    s += L(80, 210, 400, 210);
    s += L(80, 210, 80, 40);
    s += L(80, 210, 340, 70, { arrow: true, stroke: '#b3261e', w: 2.4 });
    s += L(80, 210, 340, 210, { dash: true, stroke: '#0f6cbf', w: 1.6 });
    s += L(340, 210, 340, 70, { dash: true, stroke: '#1f7a3f', w: 1.6 });
    s += T(200, 228, 'Fx = 50 cos 37° = 40 N', { fill: '#0f6cbf', bold: true, size: 13 });
    s += T(350, 140, 'Fy = 30 N', { fill: '#1f7a3f', bold: true, size: 13 });
    s += T(230, 100, 'F = 50 N', { fill: '#b3261e', bold: true, size: 15 });
    s += T(120, 195, '37°', { bold: true });
    s += T(430, 80, 'Módulo: cuánto (50 N)', { size: 13 });
    s += T(430, 104, 'Dirección: la recta (37°)', { size: 13 });
    s += T(430, 128, 'Sentido: hacia dónde (↑→)', { size: 13 });
    s += T(430, 168, 'El módulo nunca es negativo.', { size: 13, fill: '#b3261e', bold: true });
    return s + '</svg>';
  };

  FIG['fis-vector-sum'] = function () {
    var s = open(720, 250);
    s += T(20, 26, 'Tres formas de sumar (todas dan lo mismo)', { bold: true, size: 15 });
    s += T(40, 52, '1. Misma recta', { bold: true, size: 13, fill: '#0f6cbf' });
    s += L(40, 100, 150, 100, { arrow: true, stroke: '#0f6cbf', w: 2.2 });
    s += L(150, 100, 200, 100, { arrow: true, stroke: '#1f7a3f', w: 2.2 });
    s += L(40, 130, 200, 130, { arrow: true, stroke: '#b3261e', w: 2.4 });
    s += T(40, 154, '30 N + 20 N = 50 N', { size: 12, bold: true });
    s += T(250, 52, '2. Cabeza con cola', { bold: true, size: 13, fill: '#0f6cbf' });
    s += L(260, 160, 360, 160, { arrow: true, stroke: '#0f6cbf', w: 2 });
    s += L(360, 160, 360, 80, { arrow: true, stroke: '#1f7a3f', w: 2 });
    s += L(260, 160, 360, 80, { arrow: true, stroke: '#b3261e', w: 2.2 });
    s += T(250, 188, 'Cierra del origen a la punta', { size: 12 });
    s += T(490, 52, '3. Paralelogramo', { bold: true, size: 13, fill: '#0f6cbf' });
    s += L(510, 180, 620, 180, { arrow: true, stroke: '#0f6cbf', w: 2 });
    s += L(510, 180, 510, 90, { arrow: true, stroke: '#1f7a3f', w: 2 });
    s += L(620, 180, 620, 90, { dash: true, stroke: '#8a97a3' });
    s += L(510, 90, 620, 90, { dash: true, stroke: '#8a97a3' });
    s += L(510, 180, 620, 90, { arrow: true, stroke: '#b3261e', w: 2.2 });
    s += T(500, 214, 'La diagonal es R', { size: 12, bold: true });
    return s + '</svg>';
  };

  FIG['fis-fbd-three'] = function () {
    var s = open(720, 250);
    s += T(20, 26, 'Diagrama de cuerpo libre: solo fuerzas SOBRE el cuerpo', { bold: true, size: 15 });
    s += T(70, 52, 'Libro', { bold: true });
    s += rect(80, 110, 70, 40, '#fff8e6');
    s += L(115, 110, 115, 70, { arrow: true, stroke: '#1f7a3f', w: 2 });
    s += L(115, 150, 115, 190, { arrow: true, stroke: '#b3261e', w: 2 });
    s += T(122, 82, 'N', { fill: '#1f7a3f', bold: true });
    s += T(122, 186, 'P', { fill: '#b3261e', bold: true });
    s += T(280, 52, 'Lámpara (2 cables)', { bold: true });
    s += circ(360, 130, 16, '#f3c778');
    s += L(360, 114, 310, 60, { arrow: true, stroke: '#0f6cbf', w: 2 });
    s += L(360, 114, 410, 60, { arrow: true, stroke: '#0f6cbf', w: 2 });
    s += L(360, 146, 360, 200, { arrow: true, stroke: '#b3261e', w: 2 });
    s += T(292, 56, 'T', { fill: '#0f6cbf', bold: true });
    s += T(412, 56, 'T', { fill: '#0f6cbf', bold: true });
    s += T(368, 196, 'P', { fill: '#b3261e', bold: true });
    s += T(520, 52, 'Caja en rampa', { bold: true });
    s += L(500, 200, 680, 130);
    s += poly('560,168 600,152 616,172 576,188', '#fff8e6');
    s += L(588, 160, 548, 120, { arrow: true, stroke: '#1f7a3f', w: 2 });
    s += L(588, 170, 588, 220, { arrow: true, stroke: '#b3261e', w: 2 });
    s += T(530, 118, 'N ⊥ rampa', { fill: '#1f7a3f', size: 12, bold: true });
    s += T(500, 234, 'P rojo · N verde · T azul · fr morado', { size: 12, bold: true });
    return s + '</svg>';
  };

  FIG['fis-equilibrio-semaforo'] = function () {
    var s = open(700, 250);
    s += T(20, 26, 'Semáforo de 100 N, cables simétricos a 30°', { bold: true, size: 15 });
    s += L(80, 50, 360, 50);
    s += L(80, 50, 220, 140);
    s += L(360, 50, 220, 140);
    s += rect(200, 140, 40, 60, '#222');
    s += circ(220, 156, 6, '#1f7a3f');
    s += circ(220, 170, 6, '#f3c778');
    s += circ(220, 184, 6, '#b3261e');
    s += L(220, 200, 220, 236, { arrow: true, stroke: '#b3261e', w: 2.2 });
    s += T(228, 230, 'P = 100 N', { fill: '#b3261e', bold: true });
    s += T(90, 110, 'T', { fill: '#0f6cbf', bold: true, size: 16 });
    s += T(330, 110, 'T', { fill: '#0f6cbf', bold: true, size: 16 });
    s += T(100, 70, '30°', { bold: true });
    s += T(300, 70, '30°', { bold: true });
    s += T(400, 90, 'ΣFy = 2 T sen 30° = 100', { size: 14, bold: true });
    s += T(400, 114, 'sen 30° = 1/2  →  T = 100 N', { size: 14, fill: '#b3261e', bold: true });
    s += T(400, 150, 'Cada cable carga el peso entero.', { size: 13 });
    s += T(400, 174, 'Más horizontal → T se dispara.', { size: 13 });
    return s + '</svg>';
  };

  FIG['fis-paseo-13m'] = function () {
    var s = open(720, 220);
    s += T(20, 26, 'Paseo de 13 m: distancia ≠ desplazamiento', { bold: true, size: 15 });
    s += L(40, 120, 680, 120, { w: 1.8 });
    for (var i = 0; i <= 13; i++) {
      var x = 40 + i * 48;
      s += L(x, 112, x, 128);
      s += T(x, 148, String(i), { size: 11, anchor: 'middle' });
    }
    s += L(40, 90, 424, 90, { arrow: true, stroke: '#0f6cbf', w: 2.4 });
    s += L(424, 70, 184, 70, { arrow: true, stroke: '#1f7a3f', w: 2.4 });
    s += L(40, 50, 184, 50, { arrow: true, stroke: '#b3261e', w: 2.6 });
    s += T(200, 84, '+8 m', { fill: '#0f6cbf', bold: true });
    s += T(260, 64, '−5 m', { fill: '#1f7a3f', bold: true });
    s += T(70, 44, 'desplazamiento = 3 m', { fill: '#b3261e', bold: true });
    s += T(40, 180, 'Distancia recorrida = 8 + 5 = 13 m   ·   Rapidez media = 13/10 = 1,3 m/s', { size: 13, bold: true });
    s += T(40, 204, 'Velocidad media = 3/10 = 0,3 m/s   (lleva dirección)', { size: 13, bold: true });
    return s + '</svg>';
  };

  FIG['fis-graficas-xt-vt'] = function () {
    var s = open(720, 250);
    s += T(20, 26, 'Leer gráficas: pendiente y área', { bold: true, size: 15 });
    s += T(80, 52, 'x frente a t', { bold: true, size: 13 });
    s += L(60, 200, 60, 70);
    s += L(60, 200, 300, 200);
    s += L(60, 200, 260, 90, { stroke: '#0f6cbf', w: 2.2 });
    s += T(48, 80, 'x', { italic: true });
    s += T(300, 216, 't', { italic: true });
    s += T(140, 130, 'pendiente = v', { fill: '#0f6cbf', bold: true, size: 13 });
    s += T(400, 52, 'v frente a t', { bold: true, size: 13 });
    s += L(380, 200, 380, 70);
    s += L(380, 200, 680, 200);
    s += rect(380, 110, 180, 90, 'rgba(179,38,30,.18)', 0);
    s += L(380, 110, 560, 110, { stroke: '#b3261e', w: 2.2 });
    s += T(368, 80, 'v', { italic: true });
    s += T(680, 216, 't', { italic: true });
    s += T(410, 160, 'área = Δx', { fill: '#b3261e', bold: true, size: 13 });
    return s + '</svg>';
  };

  FIG['fis-caida-aire-vacio'] = function () {
    var s = open(700, 240);
    s += T(20, 26, 'Con aire la pluma se retrasa; en el vacío caen igual', { bold: true, size: 15 });
    s += rect(40, 50, 280, 160, '#eef6ff');
    s += T(120, 74, 'Con aire', { bold: true });
    s += circ(100, 180, 14, '#4a545c');
    s += circ(220, 130, 8, '#f7fbff');
    s += T(86, 208, 'martillo', { size: 12 });
    s += T(200, 118, 'pluma', { size: 12 });
    s += rect(360, 50, 300, 160, '#f4f1fb');
    s += T(450, 74, 'Vacío (Luna)', { bold: true });
    s += circ(430, 180, 14, '#4a545c');
    s += circ(540, 180, 8, '#f7fbff');
    s += T(400, 208, 'mismo instante', { fill: '#1f7a3f', bold: true, size: 13 });
    s += T(40, 230, 'Sin aire: a = g hacia abajo para todos. El aire es una fuerza extra, no “falta de peso”.', { size: 13 });
    return s + '</svg>';
  };

  FIG['fis-lanzamiento-vertical'] = function () {
    var s = open(700, 250);
    s += T(20, 26, 'Lanzamiento vertical a 20 m/s: arriba v = 0, pero g sigue', { bold: true, size: 15 });
    s += L(160, 220, 160, 50, { arrow: true, stroke: '#0f6cbf', w: 2 });
    s += circ(160, 60, 10, '#b3261e');
    s += T(180, 64, 'v = 0   ·   a = g ↓', { bold: true, fill: '#b3261e' });
    s += circ(160, 140, 8, '#0f6cbf');
    s += T(180, 130, 'subiendo  v↑  a↓', { size: 13 });
    s += T(180, 150, 'bajando   v↓  a↓', { size: 13 });
    s += circ(160, 210, 8, '#1f7a3f');
    s += T(180, 214, 'v0 = 20 m/s', { bold: true });
    s += T(400, 90, 'Subir tarda lo mismo que bajar.', { size: 14, bold: true });
    s += T(400, 118, 'El signo de v cambia; el de g no.', { size: 14 });
    s += T(400, 160, 'v = 20 − g t', { size: 16, bold: true });
    s += T(400, 188, 'h = 20 t − ½ g t²', { size: 16, bold: true });
    return s + '</svg>';
  };

  FIG['fis-dos-movimientos'] = function () {
    var s = open(720, 250);
    s += T(20, 26, 'Un proyectil = caída libre + movimiento horizontal independiente', { bold: true, size: 15 });
    s += L(40, 210, 700, 210);
    s += L(80, 50, 80, 210);
    var ys = [70, 110, 150, 190];
    ys.forEach(function (y, i) {
      s += circ(80, y, 6, '#4a545c');
      s += circ(80 + (i + 1) * 90, y, 6, '#0f6cbf');
      s += L(90, y, 70 + (i + 1) * 90, y, { dash: true, stroke: '#8a97a3' });
    });
    s += T(60, 44, 'se suelta', { size: 12, bold: true });
    s += T(200, 44, 'se lanza →', { size: 12, bold: true, fill: '#0f6cbf' });
    s += T(40, 236, 'A la misma altura en el mismo instante. Ir lejos no retrasa la caída.', { size: 13, bold: true });
    return s + '</svg>';
  };

  FIG['fis-montana-newton'] = function () {
    var s = open(700, 250);
    s += T(20, 26, 'Montaña de Newton: lanzar más fuerte hasta que la Tierra se curve debajo', { bold: true, size: 15 });
    s += circ(350, 150, 70, '#cfe0e0', '#0e2a47');
    s += T(332, 156, 'Tierra', { size: 13, bold: true, anchor: 'middle' });
    s += circ(350, 72, 6, '#b3261e');
    s += '<path d="M350 72 Q430 90 455 150" fill="none" stroke="#0f6cbf" stroke-width="2"/>';
    s += '<path d="M350 72 Q500 100 520 180" fill="none" stroke="#1f7a3f" stroke-width="2"/>';
    s += '<path d="M350 72 Q560 150 350 228 Q140 150 350 72" fill="none" stroke="#b3261e" stroke-width="2.2" stroke-dasharray="6 4"/>';
    s += T(460, 70, 'lento: cae cerca', { size: 12, fill: '#0f6cbf' });
    s += T(530, 120, 'más rápido', { size: 12, fill: '#1f7a3f' });
    s += T(480, 210, 'órbita: cae y nunca llega', { size: 13, fill: '#b3261e', bold: true });
    return s + '</svg>';
  };

  FIG['fis-segunda-ley'] = function () {
    var s = open(720, 230);
    s += T(20, 26, 'Segunda ley: a = Fneta / m', { bold: true, size: 15 });
    s += rect(40, 60, 200, 130, '#eef6ff');
    s += T(70, 86, 'Misma masa', { bold: true });
    s += rect(70, 110, 50, 30, '#fff');
    s += L(120, 125, 180, 125, { arrow: true, stroke: '#b3261e', w: 2 });
    s += T(60, 160, '2 F  →  2 a', { fill: '#b3261e', bold: true });
    s += rect(260, 60, 200, 130, '#eef7ef');
    s += T(290, 86, 'Misma fuerza', { bold: true });
    s += rect(290, 100, 70, 50, '#cfd8dc');
    s += L(360, 125, 420, 125, { arrow: true, stroke: '#0f6cbf', w: 2 });
    s += T(280, 172, '2 m  →  a / 2', { fill: '#0f6cbf', bold: true });
    s += rect(480, 60, 220, 130, '#fff8e6');
    s += T(500, 90, 'Tres formas', { bold: true });
    s += T(500, 120, 'F = m a', { size: 16, bold: true });
    s += T(500, 146, 'a = F / m', { size: 16, bold: true });
    s += T(500, 172, 'm = F / a', { size: 16, bold: true });
    return s + '</svg>';
  };

  FIG['fis-masa-peso'] = function () {
    var s = open(700, 230);
    s += T(20, 26, '60 kg en la Tierra y en la Luna: la masa no cambia', { bold: true, size: 15 });
    s += circ(160, 150, 55, '#8fc7e8');
    s += T(160, 120, 'Tierra', { anchor: 'middle', bold: true });
    s += T(160, 148, 'm = 60 kg', { anchor: 'middle', size: 13 });
    s += T(160, 172, 'P ≈ 588 N', { anchor: 'middle', size: 13, fill: '#b3261e', bold: true });
    s += circ(480, 150, 36, '#cfd8dc');
    s += T(480, 136, 'Luna', { anchor: 'middle', bold: true });
    s += T(480, 158, 'm = 60 kg', { anchor: 'middle', size: 13 });
    s += T(480, 180, 'P ≈ 98 N', { anchor: 'middle', size: 13, fill: '#b3261e', bold: true });
    s += T(40, 216, 'Masa (kg) mide inercia y no depende del planeta. Peso (N) = m g sí depende.', { size: 13, bold: true });
    return s + '</svg>';
  };

  FIG['fis-gravitacion'] = function () {
    var s = open(700, 230);
    s += T(20, 26, 'Dos masas se atraen con fuerzas iguales y opuestas', { bold: true, size: 15 });
    s += circ(180, 130, 34, '#8fc7e8');
    s += circ(480, 130, 22, '#f3c778');
    s += T(180, 136, 'm1', { anchor: 'middle', bold: true });
    s += T(480, 136, 'm2', { anchor: 'middle', bold: true });
    s += L(220, 120, 450, 120, { arrow: true, stroke: '#b3261e', w: 2.2 });
    s += L(450, 150, 220, 150, { arrow: true, stroke: '#0f6cbf', w: 2.2 });
    s += T(300, 108, 'F', { fill: '#b3261e', bold: true });
    s += T(300, 172, 'F', { fill: '#0f6cbf', bold: true });
    s += T(40, 200, 'F = G m1 m2 / r²     ·     al doble de r, F queda en 1/4', { size: 14, bold: true });
    return s + '</svg>';
  };

  FIG['fis-g-altura'] = function () {
    var s = open(700, 230);
    s += T(20, 26, 'g = G M / R²  se debilita al alejarte', { bold: true, size: 15 });
    s += circ(180, 150, 50, '#8fc7e8');
    s += T(180, 156, 'M', { anchor: 'middle', bold: true, size: 16 });
    s += circ(180, 92, 5, '#b3261e');
    s += T(200, 88, 'superficie  g ≈ 9,8', { size: 13, bold: true });
    s += circ(180, 50, 5, '#0f6cbf');
    s += T(200, 46, 'más alto  g menor', { size: 13, fill: '#0f6cbf', bold: true });
    s += T(380, 90, 'Los astronautas no “flotan', { size: 14 });
    s += T(380, 114, 'porque no hay gravedad”.', { size: 14 });
    s += T(380, 150, 'Caen con la estación:', { size: 14, bold: true });
    s += T(380, 174, 'caída libre permanente.', { size: 14, bold: true, fill: '#b3261e' });
    return s + '</svg>';
  };

  FIG['fis-rozamiento'] = function () {
    var s = open(720, 250);
    s += T(20, 26, 'Rozamiento estático (hasta un tope) y cinético (ya desliza)', { bold: true, size: 15 });
    s += L(40, 200, 300, 200);
    s += rect(90, 150, 80, 50, '#fff8e6');
    s += L(170, 170, 250, 170, { arrow: true, stroke: '#0f6cbf', w: 2 });
    s += L(90, 180, 40, 180, { arrow: true, stroke: '#7b3f98', w: 2 });
    s += L(130, 150, 130, 110, { arrow: true, stroke: '#1f7a3f', w: 2 });
    s += L(130, 200, 130, 230, { arrow: true, stroke: '#b3261e', w: 2 });
    s += T(256, 166, 'F', { fill: '#0f6cbf', bold: true });
    s += T(44, 168, 'fr', { fill: '#7b3f98', bold: true });
    s += T(138, 122, 'N', { fill: '#1f7a3f', bold: true });
    s += T(138, 244, 'P', { fill: '#b3261e', bold: true });
    s += L(360, 200, 360, 60);
    s += L(360, 200, 680, 200);
    s += L(360, 180, 500, 80, { stroke: '#7b3f98', w: 2.2 });
    s += L(500, 110, 660, 110, { stroke: '#b3261e', w: 2.2 });
    s += T(480, 72, 'fr máx estático', { size: 12, fill: '#7b3f98', bold: true });
    s += T(520, 132, 'fr cinético', { size: 12, fill: '#b3261e', bold: true });
    s += T(600, 216, 'F aplicada', { size: 12 });
    return s + '</svg>';
  };

  FIG['fis-paracaidas'] = function () {
    var s = open(700, 240);
    s += T(20, 26, 'Paracaídas: dos velocidades límite (cerrado y abierto)', { bold: true, size: 15 });
    s += L(60, 200, 60, 50);
    s += L(60, 200, 640, 200);
    s += '<path d="M60 190 C 160 40, 220 70, 280 80 S 360 80 400 80" fill="none" stroke="#0f6cbf" stroke-width="2.2"/>';
    s += L(400, 80, 400, 140, { stroke: '#b3261e', w: 2 });
    s += '<path d="M400 140 C 460 150, 520 155, 620 155" fill="none" stroke="#1f7a3f" stroke-width="2.2"/>';
    s += T(200, 50, 'v límite 1 (cerrado)', { fill: '#0f6cbf', bold: true, size: 12 });
    s += T(410, 120, 'abre', { fill: '#b3261e', bold: true, size: 12 });
    s += T(470, 178, 'v límite 2 (abierto)', { fill: '#1f7a3f', bold: true, size: 12 });
    s += T(70, 226, 'Cuando R = P, a = 0: sigue cayendo, pero ya no acelera.', { size: 13, bold: true });
    return s + '</svg>';
  };

  FIG['fis-accion-reaccion'] = function () {
    var s = open(720, 230);
    s += T(20, 26, 'Acción-reacción: siempre en DOS cuerpos', { bold: true, size: 15 });
    s += T(50, 60, 'Caminar', { bold: true });
    s += L(50, 120, 130, 120, { arrow: true, stroke: '#0f6cbf', w: 2 });
    s += L(130, 150, 50, 150, { arrow: true, stroke: '#b3261e', w: 2 });
    s += T(50, 110, 'pie → piso', { size: 12, fill: '#0f6cbf' });
    s += T(50, 172, 'piso → pie', { size: 12, fill: '#b3261e' });
    s += T(250, 60, 'Cohete', { bold: true });
    s += rect(280, 90, 40, 70, '#cfd8dc');
    s += L(300, 90, 300, 50, { arrow: true, stroke: '#0f6cbf', w: 2 });
    s += L(300, 160, 300, 200, { arrow: true, stroke: '#b3261e', w: 2 });
    s += T(330, 70, 'gases empujan', { size: 12 });
    s += T(330, 196, 'al cohete', { size: 12 });
    s += T(480, 60, 'Patinadores', { bold: true });
    s += circ(520, 130, 16, '#8fc7e8');
    s += circ(620, 130, 16, '#f3c778');
    s += L(536, 130, 604, 130, { arrow: true, stroke: '#0f6cbf', w: 2 });
    s += L(604, 150, 536, 150, { arrow: true, stroke: '#b3261e', w: 2 });
    s += T(40, 214, 'Mismo módulo, misma recta, sentidos opuestos, cuerpos distintos. No se cancelan en un DCL.', { size: 13, bold: true });
    return s + '</svg>';
  };

  FIG['fis-caballo-carreta'] = function () {
    var s = open(720, 230);
    s += T(20, 26, 'El par no se anula: cada fuerza actúa en un cuerpo distinto', { bold: true, size: 15 });
    s += rect(80, 90, 90, 50, '#f3c778');
    s += T(92, 120, 'caballo', { size: 13, bold: true });
    s += rect(280, 90, 110, 50, '#8fc7e8');
    s += T(298, 120, 'carreta', { size: 13, bold: true });
    s += L(170, 105, 275, 105, { arrow: true, stroke: '#0f6cbf', w: 2 });
    s += L(275, 125, 170, 125, { arrow: true, stroke: '#b3261e', w: 2 });
    s += T(190, 96, 'tira', { size: 12, fill: '#0f6cbf' });
    s += T(190, 148, 'tira igual', { size: 12, fill: '#b3261e' });
    s += T(440, 90, 'Sobre el caballo también', { size: 13 });
    s += T(440, 112, 'está el piso (rozamiento).', { size: 13 });
    s += T(440, 144, 'Esa fuerza extra desequilibra', { size: 13, bold: true });
    s += T(440, 166, 'el sistema y ambos avanzan.', { size: 13, bold: true });
    return s + '</svg>';
  };

  FIG['fis-mcu-anatomia'] = function () {
    var s = open(700, 250);
    s += T(20, 26, 'MCU: rapidez constante, pero la dirección cambia → hay ac', { bold: true, size: 15 });
    s += circ(220, 140, 70, 'none', '#0e2a47');
    s += circ(220, 140, 3, '#0e2a47');
    s += circ(290, 140, 8, '#b3261e');
    s += L(290, 140, 360, 140, { arrow: true, stroke: '#0f6cbf', w: 2.2 });
    s += L(290, 140, 230, 140, { arrow: true, stroke: '#b3261e', w: 2.2 });
    s += T(330, 128, 'v tangente', { fill: '#0f6cbf', bold: true, size: 13 });
    s += T(150, 136, 'ac', { fill: '#b3261e', bold: true, size: 14 });
    s += T(430, 80, 'ac = v² / r', { size: 16, bold: true });
    s += T(430, 110, 'Fc = m v² / r', { size: 16, bold: true });
    s += T(430, 150, 'T = 2π r / v     periodo', { size: 14 });
    s += T(430, 176, 'f = 1 / T         frecuencia', { size: 14 });
    s += T(430, 202, 'ω = 2π f', { size: 14 });
    return s + '</svg>';
  };

  FIG['fis-centripeta-cuerda'] = function () {
    var s = open(700, 230);
    s += T(20, 26, 'Fc no es una fuerza extra: es el papel de T, fr o gravedad', { bold: true, size: 15 });
    s += circ(140, 130, 50, 'none');
    s += L(140, 130, 190, 130);
    s += circ(190, 130, 8, '#0f6cbf');
    s += T(90, 80, 'Tensión', { bold: true, size: 13 });
    s += circ(360, 150, 8, '#1f7a3f');
    s += L(300, 180, 440, 180);
    s += T(310, 80, 'Rozamiento', { bold: true, size: 13 });
    s += T(310, 200, '(curva del auto)', { size: 12 });
    s += circ(560, 140, 36, '#8fc7e8');
    s += circ(560, 92, 7, '#b3261e');
    s += T(520, 80, 'Gravedad', { bold: true, size: 13 });
    s += T(40, 216, 'Si cortas la cuerda, el cuerpo sigue por la TANGENTE, no sale “hacia afuera”.', { size: 13, bold: true, fill: '#b3261e' });
    return s + '</svg>';
  };

  FIG['fis-impulso-airbag'] = function () {
    var s = open(720, 240);
    s += T(20, 26, 'Impulso = área bajo F–t   ·   el airbag alarga Δt y baja F', { bold: true, size: 15 });
    s += L(50, 200, 50, 50);
    s += L(50, 200, 330, 200);
    s += rect(50, 70, 40, 130, 'rgba(179,38,30,.25)', 0);
    s += T(100, 90, 'F grande', { fill: '#b3261e', bold: true, size: 12 });
    s += T(100, 110, 'Δt chico', { size: 12 });
    s += L(380, 200, 380, 50);
    s += L(380, 200, 680, 200);
    s += rect(380, 130, 160, 70, 'rgba(31,122,63,.25)', 0);
    s += T(550, 150, 'F chica, Δt grande', { fill: '#1f7a3f', bold: true, size: 12 });
    s += T(50, 226, 'Misma variación de p = m Δv. El área (impulso) es la misma; cambia la forma.', { size: 13, bold: true });
    return s + '</svg>';
  };

  FIG['fis-choques'] = function () {
    var s = open(720, 230);
    s += T(20, 26, 'Tres choques con conservación de p (si Fext = 0)', { bold: true, size: 15 });
    s += T(40, 60, 'Inelástico', { bold: true, fill: '#b3261e' });
    s += circ(50, 110, 14, '#8fc7e8');
    s += circ(110, 110, 14, '#f3c778');
    s += T(40, 150, 'se pegan', { size: 12 });
    s += T(40, 170, 'm1v1+m2v2=(m1+m2)v', { size: 12 });
    s += T(260, 60, 'Elástico (masas iguales)', { bold: true, fill: '#0f6cbf' });
    s += circ(270, 110, 14, '#8fc7e8');
    s += circ(340, 110, 14, '#f3c778');
    s += T(260, 150, 'intercambian v', { size: 12 });
    s += T(500, 60, 'Explosión / retroceso', { bold: true, fill: '#1f7a3f' });
    s += rect(560, 90, 36, 36, '#cfd8dc');
    s += L(556, 108, 500, 108, { arrow: true, stroke: '#0e2a47', w: 2 });
    s += L(600, 108, 660, 108, { arrow: true, stroke: '#0e2a47', w: 2 });
    s += T(500, 160, 'p total = 0', { size: 12, bold: true });
    return s + '</svg>';
  };

  FIG['fis-trabajo-angulo'] = function () {
    var s = open(720, 230);
    s += T(20, 26, 'W = F d cos θ   ·   el signo lo pone el ángulo', { bold: true, size: 15 });
    s += T(50, 60, 'θ = 0°', { bold: true });
    s += L(50, 120, 160, 120, { arrow: true, stroke: '#1f7a3f', w: 2.4 });
    s += T(50, 150, 'W > 0  empuja', { fill: '#1f7a3f', size: 12, bold: true });
    s += T(250, 60, 'θ = 90°', { bold: true });
    s += L(280, 160, 380, 160, { arrow: true, stroke: '#0e2a47', w: 2 });
    s += L(330, 160, 330, 80, { arrow: true, stroke: '#0f6cbf', w: 2 });
    s += T(250, 190, 'W = 0  no trabaja', { size: 12, bold: true });
    s += T(500, 60, 'θ = 180°', { bold: true });
    s += L(500, 120, 620, 120, { arrow: true, stroke: '#8a97a3', w: 2 });
    s += L(620, 140, 500, 140, { arrow: true, stroke: '#b3261e', w: 2.4 });
    s += T(500, 170, 'W < 0  frena', { fill: '#b3261e', size: 12, bold: true });
    return s + '</svg>';
  };

  FIG['fis-potencia-escalera'] = function () {
    var s = open(700, 230);
    s += T(20, 26, 'Misma escalera, distinto tiempo: distinta potencia', { bold: true, size: 15 });
    s += L(80, 200, 280, 80);
    s += L(80, 200, 80, 80);
    s += circ(120, 168, 8, '#0f6cbf');
    s += circ(240, 100, 8, '#b3261e');
    s += T(300, 90, 'Mismo Δh  →  mismo trabajo m g h', { size: 14, bold: true });
    s += T(300, 120, 'P = W / t', { size: 18, bold: true });
    s += T(300, 156, 'La que llega en la mitad de tiempo', { size: 14 });
    s += T(300, 180, 'hace el doble de potencia.', { size: 14, fill: '#b3261e', bold: true });
    return s + '</svg>';
  };

  FIG['fis-ec-cuadrado'] = function () {
    var s = open(700, 230);
    s += T(20, 26, 'K = ½ m v²  crece con el cuadrado de la rapidez', { bold: true, size: 15 });
    s += rect(60, 160, 40, 40, '#8fc7e8');
    s += T(50, 216, 'v', { bold: true, anchor: 'middle' });
    s += T(80, 150, 'K', { bold: true });
    s += rect(180, 80, 40, 120, '#0f6cbf');
    s += T(170, 216, '2v', { bold: true });
    s += T(200, 70, '4K', { bold: true, fill: '#b3261e' });
    s += T(320, 90, 'Al doble de rapidez, cuádruple energía.', { size: 14, bold: true });
    s += T(320, 120, 'Por eso frenar desde 100 km/h', { size: 14 });
    s += T(320, 144, 'no es “el doble” que desde 50:', { size: 14 });
    s += T(320, 176, 'es cuatro veces el trabajo.', { size: 14, fill: '#b3261e', bold: true });
    return s + '</svg>';
  };

  FIG['fis-frenado'] = function () {
    var s = open(700, 220);
    s += T(20, 26, 'Distancia de frenado  d = v² / (2 μ g)   ·   la masa se cancela', { bold: true, size: 15 });
    s += L(40, 160, 200, 160, { w: 8, stroke: '#8fc7e8' });
    s += T(70, 150, 'v', { bold: true });
    s += L(260, 160, 620, 160, { w: 8, stroke: '#b3261e' });
    s += T(380, 150, '2v  →  4 d', { bold: true, fill: '#b3261e' });
    s += T(40, 196, 'Wfric = −fr d = ΔK. Como fr = μ m g, la m se va: el camión y el auto frenan igual si μ y v son iguales.', { size: 13 });
    return s + '</svg>';
  };

  FIG['fis-ep-altura'] = function () {
    var s = open(700, 230);
    s += T(20, 26, 'Energía potencial: altura y resortes (no depende del camino)', { bold: true, size: 15 });
    s += L(60, 200, 240, 200);
    s += L(60, 200, 60, 80);
    s += circ(60, 90, 10, '#b3261e');
    s += T(80, 94, 'Ug = m g h', { bold: true, size: 14 });
    s += T(80, 160, 'h', { italic: true, bold: true });
    s += L(360, 80, 360, 200);
    s += '<path d="M330 200 Q360 170 390 200 Q360 170 330 200" fill="none" stroke="#0f6cbf" stroke-width="2"/>';
    s += T(400, 140, 'Epe = ½ k x²', { bold: true, size: 14, fill: '#0f6cbf' });
    s += T(400, 170, 'x = estiramiento', { size: 13 });
    return s + '</svg>';
  };

  FIG['fis-camino-independiente'] = function () {
    var s = open(700, 230);
    s += T(20, 26, 'Fuerza conservativa: el trabajo entre A y B no depende del camino', { bold: true, size: 15 });
    s += circ(120, 180, 8, '#0e2a47');
    s += circ(520, 70, 8, '#0e2a47');
    s += T(100, 204, 'A', { bold: true });
    s += T(530, 66, 'B', { bold: true });
    s += L(120, 180, 520, 70, { stroke: '#0f6cbf', w: 2.2 });
    s += '<path d="M120 180 C 200 40, 400 220, 520 70" fill="none" stroke="#b3261e" stroke-width="2.2"/>';
    s += T(240, 90, 'camino 1', { fill: '#0f6cbf', bold: true });
    s += T(300, 190, 'camino 2', { fill: '#b3261e', bold: true });
    s += T(160, 50, 'WA→B igual en los dos  →  ΔU = −W', { size: 14, bold: true });
    return s + '</svg>';
  };

  FIG['fis-emec-conserva'] = function () {
    var s = open(700, 240);
    s += T(20, 26, 'Sin disipación: K + U se intercambian y la suma no cambia', { bold: true, size: 15 });
    s += L(80, 200, 280, 80);
    s += L(280, 80, 560, 200);
    s += circ(120, 176, 8, '#0f6cbf');
    s += T(90, 168, 'A  U alta, K baja', { size: 12, bold: true });
    s += circ(320, 200, 8, '#b3261e');
    s += T(250, 226, 'B  U baja, K alta', { size: 12, bold: true, fill: '#b3261e' });
    s += circ(500, 140, 8, '#1f7a3f');
    s += T(430, 120, 'C  U sube, K baja', { size: 12, bold: true, fill: '#1f7a3f' });
    return s + '</svg>';
  };

  FIG['fis-fuentes-energia'] = function () {
    var s = open(700, 230);
    s += T(20, 26, 'Fuentes: de dónde sale la energía que usamos', { bold: true, size: 15 });
    s += rect(40, 60, 280, 140, '#eef7ef');
    s += T(60, 88, 'Renovables', { bold: true, fill: '#1f7a3f', size: 15 });
    s += T(60, 116, 'solar · eólica · hidráulica', { size: 13 });
    s += T(60, 140, 'geotérmica · biomasa', { size: 13 });
    s += T(60, 172, 'Se reponen a escala humana', { size: 12 });
    s += rect(360, 60, 300, 140, '#fdeceb');
    s += T(380, 88, 'No renovables', { bold: true, fill: '#b3261e', size: 15 });
    s += T(380, 116, 'petróleo · gas · carbón', { size: 13 });
    s += T(380, 140, 'uranio (nuclear)', { size: 13 });
    s += T(380, 172, 'Stock que se agota', { size: 12 });
    return s + '</svg>';
  };

  window.FIG_FIS = FIG;
})();
