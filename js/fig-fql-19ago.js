/* Figuras pedagógicas vectoriales SVG para el Simulador Día 2 — 19 Agosto EPN.
   Renderizado matemático nítido tipo LaTeX con cotas, esquemas y vectores sin spoilers.
   window.FIG_19AGO */
(function () {
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function openSvg(w, h) {
    return '<svg width="100%" height="auto" viewBox="0 0 ' + w + ' ' + h +
      '" xmlns="http://www.w3.org/2000/svg" style="max-width:' + w + 'px;display:block;margin:14px auto;background:#f8fafc;border-radius:10px;border:1px solid #e2e8f0;box-shadow:0 2px 8px rgba(0,0,0,0.04);font-family:system-ui, -apple-system, sans-serif;">' +
      '<defs>' +
      '<marker id="f19-arr-blue" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#0284c7"/></marker>' +
      '<marker id="f19-arr-red" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#dc2626"/></marker>' +
      '<marker id="f19-arr-dark" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#0e2a47"/></marker>' +
      '<marker id="f19-arr-green" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#16a34a"/></marker>' +
      '</defs>';
  }

  var FIG = {};

  // 1. Avión soltando paquete (MRU horizontal + gravedad vertical)
  FIG['fql19-avion-proyectil'] = function () {
    var s = openSvg(540, 200);
    s += '<line x1="30" y1="170" x2="510" y2="170" stroke="#64748b" stroke-width="2"/>';
    s += '<text x="270" y="190" fill="#64748b" font-size="12" font-weight="600" text-anchor="middle">Suelo horizontal (Observador en reposo)</text>';
    s += '<rect x="50" y="30" width="80" height="22" rx="4" fill="#cbd5e1" stroke="#475569" stroke-width="1.5"/>';
    s += '<polygon points="130,41 160,41 130,30" fill="#94a3b8" stroke="#475569" stroke-width="1.2"/>';
    s += '<line x1="130" y1="41" x2="200" y2="41" stroke="#0284c7" stroke-width="2.5" marker-end="url(#f19-arr-blue)"/>';
    s += '<text x="208" y="45" fill="#0284c7" font-size="13" font-weight="700"><tspan font-style="italic">v</tspan><tspan font-size="10" dy="3">x</tspan><tspan dy="-3"> = 180 m/s</tspan></text>';
    s += '<circle cx="90" cy="52" r="5.5" fill="#dc2626"/>';
    s += '<text x="90" y="75" fill="#dc2626" font-size="11" font-weight="700" text-anchor="middle">Paquete liberado</text>';
    s += '<line x1="450" y1="40" x2="450" y2="90" stroke="#dc2626" stroke-width="2" marker-end="url(#f19-arr-red)"/>';
    s += '<text x="460" y="70" fill="#dc2626" font-size="12" font-weight="700"><tspan font-style="italic">g</tspan> = 9.8 m/s²</text>';
    s += '</svg>';
    return s;
  };

  // 2. Choque de bloques (3ra Ley de Newton)
  FIG['fql19-choque-bloques'] = function () {
    var s = openSvg(520, 180);
    s += '<line x1="40" y1="140" x2="480" y2="140" stroke="#64748b" stroke-width="2"/>';
    s += '<text x="260" y="162" fill="#64748b" font-size="12" text-anchor="middle">Superficie horizontal sin rozamiento</text>';
    s += '<rect x="140" y="70" width="80" height="70" rx="4" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>';
    s += '<text x="180" y="105" fill="#0369a1" font-size="14" font-weight="800" text-anchor="middle">Bloque A</text>';
    s += '<text x="180" y="125" fill="#0369a1" font-size="12" font-weight="600" text-anchor="middle">10 kg</text>';
    s += '<rect x="220" y="90" width="60" height="50" rx="4" fill="#ffedd5" stroke="#ea580c" stroke-width="2"/>';
    s += '<text x="250" y="118" fill="#c2410c" font-size="13" font-weight="800" text-anchor="middle">Bloque B</text>';
    s += '<text x="250" y="133" fill="#c2410c" font-size="11" font-weight="600" text-anchor="middle">2 kg</text>';
    s += '<line x1="60" y1="105" x2="135" y2="105" stroke="#0e2a47" stroke-width="3" marker-end="url(#f19-arr-dark)"/>';
    s += '<text x="95" y="95" fill="#0e2a47" font-size="13" font-weight="800" text-anchor="middle"><tspan font-style="italic">F</tspan></text>';
    s += '<line x1="220" y1="50" x2="280" y2="50" stroke="#dc2626" stroke-width="2" marker-end="url(#f19-arr-red)"/>';
    s += '<text x="285" y="54" fill="#dc2626" font-size="12" font-weight="700"><tspan font-style="italic">F</tspan><tspan font-size="9" dy="2">A→B</tspan></text>';
    s += '<line x1="220" y1="50" x2="160" y2="50" stroke="#dc2626" stroke-width="2" marker-end="url(#f19-arr-red)"/>';
    s += '<text x="155" y="54" fill="#dc2626" font-size="12" font-weight="700" text-anchor="end"><tspan font-style="italic">F</tspan><tspan font-size="9" dy="2">B→A</tspan></text>';
    s += '</svg>';
    return s;
  };

  // 3. Tiro vertical (Lanzamiento P, Intermedio Q, Ápice T)
  FIG['fql19-tiro-vertical'] = function () {
    var s = openSvg(420, 260);
    s += '<line x1="150" y1="220" x2="150" y2="40" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 4"/>';
    s += '<circle cx="150" cy="220" r="6" fill="#0284c7"/>';
    s += '<text x="175" y="225" fill="#0e2a47" font-size="13" font-weight="700">Punto P (Suelo, <tspan font-style="italic">v</tspan> = <tspan font-style="italic">v</tspan><tspan font-size="10" dy="3">0</tspan><tspan dy="-3">)</tspan></text>';
    s += '<circle cx="150" cy="130" r="6" fill="#16a34a"/>';
    s += '<text x="175" y="135" fill="#16a34a" font-size="13" font-weight="700">Punto Q (<tspan font-style="italic">h</tspan> = 15 m)</text>';
    s += '<circle cx="150" cy="40" r="7" fill="#dc2626"/>';
    s += '<text x="175" y="45" fill="#dc2626" font-size="13" font-weight="800">Punto T (Punto más alto)</text>';
    s += '<line x1="80" y1="70" x2="80" y2="130" stroke="#dc2626" stroke-width="2.2" marker-end="url(#f19-arr-red)"/>';
    s += '<text x="70" y="105" fill="#dc2626" font-size="13" font-weight="800" text-anchor="end"><tspan font-style="italic">g</tspan> = 9.8 m/s²</text>';
    s += '</svg>';
    return s;
  };

  // 4. Péndulo oscilante (A y B extremos; C punto más bajo)
  FIG['fql19-pendulo-oscilante'] = function () {
    var s = openSvg(460, 220);
    s += '<line x1="150" y1="20" x2="310" y2="20" stroke="#475569" stroke-width="3"/>';
    s += '<circle cx="230" cy="20" r="4" fill="#0e2a47"/>';
    s += '<path d="M 120,130 Q 230,205 340,130" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 4"/>';
    s += '<line x1="230" y1="20" x2="120" y2="130" stroke="#64748b" stroke-width="1.2" stroke-dasharray="3 3"/>';
    s += '<line x1="230" y1="20" x2="340" y2="130" stroke="#64748b" stroke-width="1.2" stroke-dasharray="3 3"/>';
    s += '<line x1="230" y1="20" x2="230" y2="185" stroke="#0e2a47" stroke-width="2"/>';
    s += '<circle cx="120" cy="130" r="10" fill="#cbd5e1" stroke="#475569" stroke-width="1.5"/>';
    s += '<text x="120" y="110" fill="#0e2a47" font-size="12" font-weight="800" text-anchor="middle">Posición A</text>';
    s += '<circle cx="340" cy="130" r="10" fill="#cbd5e1" stroke="#475569" stroke-width="1.5"/>';
    s += '<text x="340" y="110" fill="#0e2a47" font-size="12" font-weight="800" text-anchor="middle">Posición B</text>';
    s += '<circle cx="230" cy="185" r="12" fill="#0284c7" stroke="#0369a1" stroke-width="2"/>';
    s += '<text x="230" y="212" fill="#0284c7" font-size="13" font-weight="800" text-anchor="middle">Posición C (Punto más bajo)</text>';
    s += '</svg>';
    return s;
  };

  // 5. Doble plano inclinado de Galileo
  FIG['fql19-rampa-galileo'] = function () {
    var s = openSvg(520, 200);
    s += '<path d="M 40,50 L 200,160 L 480,50" fill="none" stroke="#0e2a47" stroke-width="3"/>';
    s += '<line x1="40" y1="160" x2="480" y2="160" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="3 3"/>';
    s += '<line x1="40" y1="50" x2="15" y2="50" stroke="#64748b" stroke-width="1"/>';
    s += '<line x1="40" y1="160" x2="15" y2="160" stroke="#64748b" stroke-width="1"/>';
    s += '<line x1="25" y1="50" x2="25" y2="160" stroke="#0284c7" stroke-width="1.8" marker-start="url(#f19-arr-blue)" marker-end="url(#f19-arr-blue)"/>';
    s += '<text x="15" y="110" fill="#0284c7" font-size="14" font-weight="800" text-anchor="end"><tspan font-style="italic">h</tspan></text>';
    s += '<circle cx="50" cy="45" r="9" fill="#dc2626"/>';
    s += '<text x="55" y="28" fill="#dc2626" font-size="12" font-weight="700">Inicio (<tspan font-style="italic">v</tspan> = 0)</text>';
    s += '<circle cx="470" cy="45" r="9" fill="#16a34a"/>';
    s += '<text x="470" y="28" fill="#16a34a" font-size="12" font-weight="700" text-anchor="middle">Rampa de menor pendiente</text>';
    s += '<text x="260" y="185" fill="#0e2a47" font-size="12" font-weight="700" text-anchor="middle">Superficie ideal sin fricción (<tspan font-style="italic">E</tspan><tspan font-size="9" dy="2">m</tspan><tspan dy="-2"> = </tspan><tspan font-style="italic">E</tspan><tspan font-size="9" dy="2">c</tspan><tspan dy="-2"> + </tspan><tspan font-style="italic">E</tspan><tspan font-size="9" dy="2">p</tspan><tspan dy="-2"> = constante)</tspan></text>';
    s += '</svg>';
    return s;
  };

  // 6. Rampa vs Levantamiento vertical
  FIG['fql19-rampa-vs-vertical'] = function () {
    var s = openSvg(540, 210);
    s += '<polygon points="60,170 340,170 340,50 60,170" fill="#f1f5f9" stroke="#475569" stroke-width="2"/>';
    s += '<rect x="340" y="50" width="80" height="120" fill="#e2e8f0" stroke="#475569" stroke-width="1.5"/>';
    s += '<line x1="430" y1="50" x2="430" y2="170" stroke="#0284c7" stroke-width="2" marker-start="url(#f19-arr-blue)" marker-end="url(#f19-arr-blue)"/>';
    s += '<text x="445" y="115" fill="#0284c7" font-size="14" font-weight="800"><tspan font-style="italic">H</tspan></text>';
    s += '<rect x="160" y="100" width="36" height="26" transform="rotate(-23 160 100)" fill="#bae6fd" stroke="#0284c7" stroke-width="1.5"/>';
    s += '<text x="180" y="188" fill="#64748b" font-size="12" text-anchor="middle">Camino 1: Plano inclinado (sin fricción)</text>';
    s += '<rect x="470" y="100" width="30" height="26" fill="#fed7aa" stroke="#ea580c" stroke-width="1.5"/>';
    s += '<line x1="485" y1="100" x2="485" y2="60" stroke="#ea580c" stroke-width="2" marker-end="url(#f19-arr-red)"/>';
    s += '<text x="485" y="188" fill="#64748b" font-size="12" text-anchor="middle">Camino 2: Vertical</text>';
    s += '<text x="270" y="25" fill="#0e2a47" font-size="13" font-weight="700" text-anchor="middle">Elevación de un cuerpo de masa <tspan font-style="italic">M</tspan> hasta altura <tspan font-style="italic">H</tspan></text>';
    s += '</svg>';
    return s;
  };

  // 7. Disco sobre hielo con 4 fuerzas ortogonales
  FIG['fql19-disco-4fuerzas'] = function () {
    var s = openSvg(420, 230);
    var cx = 210, cy = 115;
    s += '<line x1="50" y1="115" x2="370" y2="115" stroke="#cbd5e1" stroke-width="1.2"/>';
    s += '<line x1="210" y1="15" x2="210" y2="215" stroke="#cbd5e1" stroke-width="1.2"/>';
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="16" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>';
    s += '<text x="' + cx + '" y="' + (cy + 4) + '" fill="#0369a1" font-size="10" font-weight="800" text-anchor="middle">0.5 kg</text>';
    s += '<line x1="' + cx + '" y1="' + (cy - 16) + '" x2="' + cx + '" y2="30" stroke="#dc2626" stroke-width="2.5" marker-end="url(#f19-arr-red)"/>';
    s += '<text x="' + (cx + 8) + '" y="40" fill="#dc2626" font-size="12" font-weight="800"><tspan font-style="italic">F</tspan><tspan font-size="9" dy="2">1</tspan><tspan dy="-2"> = 12 N (Norte)</tspan></text>';
    s += '<line x1="' + cx + '" y1="' + (cy + 16) + '" x2="' + cx + '" y2="200" stroke="#dc2626" stroke-width="2.5" marker-end="url(#f19-arr-red)"/>';
    s += '<text x="' + (cx + 8) + '" y="195" fill="#dc2626" font-size="12" font-weight="800"><tspan font-style="italic">F</tspan><tspan font-size="9" dy="2">2</tspan><tspan dy="-2"> = 12 N (Sur)</tspan></text>';
    s += '<line x1="' + (cx + 16) + '" y1="' + cy + '" x2="' + (cx + 120) + '" y2="' + cy + '" stroke="#0284c7" stroke-width="2.5" marker-end="url(#f19-arr-blue)"/>';
    s += '<text x="' + (cx + 125) + '" y="' + (cy - 8) + '" fill="#0284c7" font-size="12" font-weight="800"><tspan font-style="italic">F</tspan><tspan font-size="9" dy="2">3</tspan><tspan dy="-2"> = 8 N (Este)</tspan></text>';
    s += '<line x1="' + (cx - 16) + '" y1="' + cy + '" x2="' + (cx - 120) + '" y2="' + cy + '" stroke="#0284c7" stroke-width="2.5" marker-end="url(#f19-arr-blue)"/>';
    s += '<text x="' + (cx - 125) + '" y="' + (cy - 8) + '" fill="#0284c7" font-size="12" font-weight="800" text-anchor="end"><tspan font-style="italic">F</tspan><tspan font-size="9" dy="2">4</tspan><tspan dy="-2"> = 8 N (Oeste)</tspan></text>';
    s += '</svg>';
    return s;
  };

  // 8. Sombra de un poste y trigonometría (Escala proporcional 30°)
  FIG['fql19-poste-sombra'] = function () {
    var s = openSvg(480, 220);
    // Para 30°, si S = 240px, H = 240 * tan(30°) = 240 * 0.577 = 138.5px
    var baseX = 100, baseY = 175;
    var postH = 138;
    var shadowL = 240;
    var rayX = baseX + shadowL;
    var topY = baseY - postH;
    s += '<line x1="40" y1="' + baseY + '" x2="440" y2="' + baseY + '" stroke="#64748b" stroke-width="2"/>';
    s += '<line x1="' + baseX + '" y1="' + baseY + '" x2="' + baseX + '" y2="' + topY + '" stroke="#0e2a47" stroke-width="4"/>';
    s += '<text x="' + (baseX - 15) + '" y="' + (baseY - postH/2) + '" fill="#0e2a47" font-size="14" font-weight="800" text-anchor="end"><tspan font-style="italic">H</tspan> = ?</text>';
    s += '<line x1="' + baseX + '" y1="' + topY + '" x2="' + rayX + '" y2="' + baseY + '" stroke="#eab308" stroke-width="2.5" stroke-dasharray="5 4"/>';
    s += '<line x1="' + baseX + '" y1="' + baseY + '" x2="' + rayX + '" y2="' + baseY + '" stroke="#0284c7" stroke-width="4"/>';
    s += '<text x="' + (baseX + shadowL/2) + '" y="' + (baseY + 22) + '" fill="#0284c7" font-size="13" font-weight="800" text-anchor="middle">Sombra <tspan font-style="italic">S</tspan> = 6 m</text>';
    s += '<path d="M ' + (rayX - 45) + ',' + baseY + ' A 45 45 0 0 0 ' + (rayX - 39) + ',' + (baseY - 22) + '" fill="none" stroke="#dc2626" stroke-width="2"/>';
    s += '<text x="' + (rayX - 60) + '" y="' + (baseY - 10) + '" fill="#dc2626" font-size="13" font-weight="800">30°</text>';
    s += '<circle cx="' + (baseX - 20) + '" y="' + (topY - 15) + '" r="14" fill="#fde047" stroke="#eab308" stroke-width="2"/>';
    s += '</svg>';
    return s;
  };

  // 9. Movimiento Circular Uniforme (MCU) — Vectores v y radio R
  FIG['fql19-mcu-vectorial'] = function () {
    var s = openSvg(440, 220);
    var cx = 200, cy = 110, r = 65;
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="5 4"/>';
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="3" fill="#0e2a47"/>';
    s += '<text x="' + (cx - 10) + '" y="' + (cy - 8) + '" fill="#64748b" font-size="11">Centro</text>';
    s += '<line x1="' + cx + '" y1="' + cy + '" x2="' + (cx + r) + '" y2="' + cy + '" stroke="#64748b" stroke-width="1.5"/>';
    s += '<text x="' + (cx + r/2) + '" y="' + (cy - 6) + '" fill="#64748b" font-size="11" text-anchor="middle"><tspan font-style="italic">R</tspan> = 2 m</text>';
    var px = cx + r, py = cy;
    s += '<circle cx="' + px + '" cy="' + py + '" r="7" fill="#0284c7"/>';
    s += '<line x1="' + px + '" y1="' + py + '" x2="' + px + '" y2="35" stroke="#16a34a" stroke-width="2.5" marker-end="url(#f19-arr-green)"/>';
    s += '<text x="' + (px + 10) + '" y="45" fill="#16a34a" font-size="12" font-weight="800"><tspan font-style="italic">v</tspan> = 6 m/s</text>';
    s += '<line x1="' + px + '" y1="' + py + '" x2="' + (cx + 15) + '" y2="' + cy + '" stroke="#dc2626" stroke-width="2" stroke-dasharray="3 3" marker-end="url(#f19-arr-red)"/>';
    s += '<text x="' + (cx + r/2) + '" y="' + (cy + 22) + '" fill="#dc2626" font-size="12" font-weight="700" text-anchor="middle"><tspan font-style="italic">a</tspan><tspan font-size="9" dy="2">c</tspan><tspan dy="-2"> (centrípeta)</tspan></text>';
    s += '</svg>';
    return s;
  };

  // 10. Semáforo colgado simétricamente
  FIG['fql19-semaforo-cables'] = function () {
    var s = openSvg(460, 210);
    s += '<line x1="60" y1="30" x2="400" y2="30" stroke="#475569" stroke-width="3"/>';
    s += '<line x1="80" y1="30" x2="230" y2="105" stroke="#0284c7" stroke-width="2.2"/>';
    s += '<text x="135" y="60" fill="#0284c7" font-size="12" font-weight="700"><tspan font-style="italic">T</tspan></text>';
    s += '<line x1="380" y1="30" x2="230" y2="105" stroke="#0284c7" stroke-width="2.2"/>';
    s += '<text x="315" y="60" fill="#0284c7" font-size="12" font-weight="700"><tspan font-style="italic">T</tspan></text>';
    s += '<line x1="140" y1="105" x2="320" y2="105" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3 3"/>';
    s += '<text x="140" y="95" fill="#dc2626" font-size="12" font-weight="700">30°</text>';
    s += '<text x="300" y="95" fill="#dc2626" font-size="12" font-weight="700">30°</text>';
    s += '<line x1="230" y1="105" x2="230" y2="135" stroke="#0e2a47" stroke-width="2"/>';
    s += '<rect x="215" y="135" width="30" height="55" rx="4" fill="#334155" stroke="#0e2a47" stroke-width="1.5"/>';
    s += '<circle cx="230" cy="147" r="5" fill="#ef4444"/>';
    s += '<circle cx="230" cy="162" r="5" fill="#eab308"/>';
    s += '<circle cx="230" cy="177" r="5" fill="#22c55e"/>';
    s += '<text x="265" y="165" fill="#0e2a47" font-size="13" font-weight="800"><tspan font-style="italic">W</tspan> = 100 N</text>';
    s += '</svg>';
    return s;
  };

  // 11. Gráfica cartesiana v vs t
  FIG['fql19-grafica-vt'] = function () {
    var s = openSvg(480, 230);
    s += '<line x1="60" y1="180" x2="430" y2="180" stroke="#0e2a47" stroke-width="2" marker-end="url(#f19-arr-dark)"/>';
    s += '<text x="435" y="184" fill="#0e2a47" font-size="13" font-weight="800"><tspan font-style="italic">t</tspan> (s)</text>';
    s += '<line x1="60" y1="180" x2="60" y2="30" stroke="#0e2a47" stroke-width="2" marker-end="url(#f19-arr-dark)"/>';
    s += '<text x="50" y="24" fill="#0e2a47" font-size="13" font-weight="800"><tspan font-style="italic">v</tspan> (m/s)</text>';
    s += '<line x1="60" y1="60" x2="360" y2="60" stroke="#cbd5e1" stroke-width="1.2" stroke-dasharray="3 3"/>';
    s += '<line x1="360" y1="60" x2="360" y2="180" stroke="#cbd5e1" stroke-width="1.2" stroke-dasharray="3 3"/>';
    s += '<text x="50" y="64" fill="#0e2a47" font-size="12" font-weight="700" text-anchor="end">12</text>';
    s += '<text x="360" y="198" fill="#0e2a47" font-size="12" font-weight="700" text-anchor="middle">6</text>';
    s += '<text x="50" y="184" fill="#0e2a47" font-size="12" text-anchor="end">0</text>';
    s += '<polygon points="60,180 360,60 360,180" fill="#bae6fd" opacity="0.6"/>';
    s += '<line x1="60" y1="180" x2="360" y2="60" stroke="#0284c7" stroke-width="3"/>';
    s += '<circle cx="360" cy="60" r="5" fill="#0284c7"/>';
    s += '</svg>';
    return s;
  };

  // 12. Estructura de Lewis del Amoníaco (NH3)
  FIG['fql19-lewis-nh3'] = function () {
    var s = openSvg(360, 200);
    var cx = 180, cy = 105;
    s += '<text x="' + cx + '" y="' + (cy + 8) + '" fill="#0e2a47" font-size="28" font-weight="800" text-anchor="middle">N</text>';
    s += '<circle cx="' + (cx - 6) + '" cy="' + (cy - 20) + '" r="3" fill="#dc2626"/>';
    s += '<circle cx="' + (cx + 6) + '" cy="' + (cy - 20) + '" r="3" fill="#dc2626"/>';
    s += '<line x1="' + cx + '" y1="' + (cy + 18) + '" x2="' + cx + '" y2="' + (cy + 45) + '" stroke="#0e2a47" stroke-width="2.5"/>';
    s += '<text x="' + cx + '" y="' + (cy + 68) + '" fill="#0e2a47" font-size="22" font-weight="700" text-anchor="middle">H</text>';
    s += '<line x1="' + (cx - 18) + '" y1="' + (cy + 12) + '" x2="' + (cx - 45) + '" y2="' + (cy + 35) + '" stroke="#0e2a47" stroke-width="2.5"/>';
    s += '<text x="' + (cx - 60) + '" y="' + (cy + 48) + '" fill="#0e2a47" font-size="22" font-weight="700" text-anchor="middle">H</text>';
    s += '<line x1="' + (cx + 18) + '" y1="' + (cy + 12) + '" x2="' + (cx + 45) + '" y2="' + (cy + 35) + '" stroke="#0e2a47" stroke-width="2.5"/>';
    s += '<text x="' + (cx + 60) + '" y="' + (cy + 48) + '" fill="#0e2a47" font-size="22" font-weight="700" text-anchor="middle">H</text>';
    s += '</svg>';
    return s;
  };

  // 13. Geometría Lineal y Enlaces de CO2 (con pares libres de O)
  FIG['fql19-lewis-co2'] = function () {
    var s = openSvg(440, 160);
    var cy = 80;
    // O izquierdo con sus 2 pares libres
    s += '<text x="90" y="' + (cy + 10) + '" fill="#0e2a47" font-size="28" font-weight="800" text-anchor="middle">O</text>';
    s += '<circle cx="65" cy="' + (cy - 12) + '" r="2.5" fill="#dc2626"/>';
    s += '<circle cx="65" cy="' + (cy + 2) + '" r="2.5" fill="#dc2626"/>';
    s += '<circle cx="80" cy="' + (cy - 20) + '" r="2.5" fill="#dc2626"/>';
    s += '<circle cx="95" cy="' + (cy - 20) + '" r="2.5" fill="#dc2626"/>';

    // Doble enlace
    s += '<line x1="120" y1="' + (cy - 4) + '" x2="190" y2="' + (cy - 4) + '" stroke="#0e2a47" stroke-width="2.5"/>';
    s += '<line x1="120" y1="' + (cy + 6) + '" x2="190" y2="' + (cy + 6) + '" stroke="#0e2a47" stroke-width="2.5"/>';

    // C central
    s += '<text x="220" y="' + (cy + 10) + '" fill="#0e2a47" font-size="28" font-weight="800" text-anchor="middle">C</text>';

    // Doble enlace
    s += '<line x1="250" y1="' + (cy - 4) + '" x2="320" y2="' + (cy - 4) + '" stroke="#0e2a47" stroke-width="2.5"/>';
    s += '<line x1="250" y1="' + (cy + 6) + '" x2="320" y2="' + (cy + 6) + '" stroke="#0e2a47" stroke-width="2.5"/>';

    // O derecho con sus 2 pares libres
    s += '<text x="350" y="' + (cy + 10) + '" fill="#0e2a47" font-size="28" font-weight="800" text-anchor="middle">O</text>';
    s += '<circle cx="375" cy="' + (cy - 12) + '" r="2.5" fill="#dc2626"/>';
    s += '<circle cx="375" cy="' + (cy + 2) + '" r="2.5" fill="#dc2626"/>';
    s += '<circle cx="345" cy="' + (cy - 20) + '" r="2.5" fill="#dc2626"/>';
    s += '<circle cx="360" cy="' + (cy - 20) + '" r="2.5" fill="#dc2626"/>';

    // Momentos dipolares de enlace individuales
    s += '<line x1="205" y1="35" x2="125" y2="35" stroke="#dc2626" stroke-width="2" marker-end="url(#f19-arr-red)"/>';
    s += '<text x="165" y="25" fill="#dc2626" font-size="12" font-weight="700" text-anchor="middle">μ₁</text>';

    s += '<line x1="235" y1="35" x2="315" y2="35" stroke="#dc2626" stroke-width="2" marker-end="url(#f19-arr-red)"/>';
    s += '<text x="275" y="25" fill="#dc2626" font-size="12" font-weight="700" text-anchor="middle">μ₂</text>';
    s += '</svg>';
    return s;
  };

  // 14. Pista de patinaje con puntos A, B, C, D (fis-21)
  FIG['fql19-pista-patinador'] = function () {
    var s = openSvg(500, 200);
    s += '<path d="M 40,40 Q 120,180 250,180 T 460,80" fill="none" stroke="#0e2a47" stroke-width="3"/>';
    s += '<line x1="30" y1="180" x2="470" y2="180" stroke="#cbd5e1" stroke-width="1.2" stroke-dasharray="3 3"/>';
    // Punto A (máximo)
    s += '<circle cx="45" cy="45" r="7" fill="#dc2626"/>';
    s += '<text x="45" y="25" fill="#dc2626" font-size="13" font-weight="800" text-anchor="middle">Punto A</text>';
    // Punto B (intermedio)
    s += '<circle cx="140" cy="130" r="6" fill="#64748b"/>';
    s += '<text x="120" y="125" fill="#64748b" font-size="12" font-weight="700">Punto B</text>';
    // Punto C (valle más bajo)
    s += '<circle cx="250" cy="180" r="7" fill="#0284c7"/>';
    s += '<text x="250" y="202" fill="#0284c7" font-size="13" font-weight="800" text-anchor="middle">Punto C</text>';
    // Punto D (ascenso)
    s += '<circle cx="430" cy="95" r="6" fill="#16a34a"/>';
    s += '<text x="445" y="90" fill="#16a34a" font-size="12" font-weight="700">Punto D</text>';
    s += '</svg>';
    return s;
  };

  // 15. Plano Inclinado Variable a 45° (fis-33)
  FIG['fql19-plano-inclinado-45'] = function () {
    var s = openSvg(440, 200);
    s += '<polygon points="80,160 360,160 360,40 80,160" fill="#f1f5f9" stroke="#475569" stroke-width="2"/>';
    s += '<path d="M 140,160 A 60 60 0 0 0 130,135" fill="none" stroke="#dc2626" stroke-width="2"/>';
    s += '<text x="145" y="145" fill="#dc2626" font-size="13" font-weight="800">θ = 45°</text>';
    s += '<rect x="200" y="85" width="40" height="28" transform="rotate(-23 200 85)" fill="#bae6fd" stroke="#0284c7" stroke-width="1.8"/>';
    s += '<text x="220" y="75" fill="#0369a1" font-size="12" font-weight="700" text-anchor="middle">Bloque</text>';
    s += '</svg>';
    return s;
  };

  // 16. Rizo Vertical de Montaña Rusa (fis-35)
  FIG['fql19-rizo-vertical'] = function () {
    var s = openSvg(420, 220);
    var cx = 210, cy = 110, r = 70;
    s += '<path d="M 40,180 L 140,180" stroke="#475569" stroke-width="2"/>';
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="#0e2a47" stroke-width="2.5"/>';
    s += '<path d="M 280,180 L 380,180" stroke="#475569" stroke-width="2"/>';
    s += '<line x1="' + cx + '" y1="' + cy + '" x2="' + cx + '" y2="' + (cy - r) + '" stroke="#64748b" stroke-width="1.5"/>';
    s += '<text x="' + (cx + 8) + '" y="' + (cy - r/2) + '" fill="#64748b" font-size="12" font-weight="700"><tspan font-style="italic">R</tspan> = 10 m</text>';
    s += '<rect x="' + (cx - 15) + '" y="' + (cy - r - 10) + '" width="30" height="16" rx="3" fill="#dc2626"/>';
    s += '<text x="' + cx + '" y="' + (cy - r - 15) + '" fill="#dc2626" font-size="12" font-weight="800" text-anchor="middle">Punto más alto</text>';
    s += '</svg>';
    return s;
  };

  // 17. Dos Bloques Unidos por Cuerda con Fuerza F sobre A (fis-37)
  FIG['fql19-dos-bloques-cuerda'] = function () {
    var s = openSvg(500, 170);
    s += '<line x1="30" y1="130" x2="470" y2="130" stroke="#64748b" stroke-width="2"/>';
    s += '<text x="250" y="152" fill="#64748b" font-size="12" text-anchor="middle">Plano horizontal sin rozamiento</text>';
    // Bloque B (2 kg)
    s += '<rect x="80" y="70" width="65" height="60" rx="4" fill="#fed7aa" stroke="#ea580c" stroke-width="2"/>';
    s += '<text x="112" y="98" fill="#c2410c" font-size="13" font-weight="800" text-anchor="middle">Bloque B</text>';
    s += '<text x="112" y="116" fill="#c2410c" font-size="12" font-weight="600" text-anchor="middle">(2 kg)</text>';
    // Cuerda
    s += '<line x1="145" y1="100" x2="235" y2="100" stroke="#0e2a47" stroke-width="2.5"/>';
    s += '<text x="190" y="90" fill="#0e2a47" font-size="12" font-weight="800" text-anchor="middle"><tspan font-style="italic">T</tspan></text>';
    // Bloque A (3 kg)
    s += '<rect x="235" y="60" width="75" height="70" rx="4" fill="#bae6fd" stroke="#0284c7" stroke-width="2"/>';
    s += '<text x="272" y="92" fill="#0369a1" font-size="14" font-weight="800" text-anchor="middle">Bloque A</text>';
    s += '<text x="272" y="112" fill="#0369a1" font-size="12" font-weight="600" text-anchor="middle">(3 kg)</text>';
    // Fuerza F hacia la derecha
    s += '<line x1="310" y1="95" x2="410" y2="95" stroke="#dc2626" stroke-width="3" marker-end="url(#f19-arr-red)"/>';
    s += '<text x="420" y="99" fill="#dc2626" font-size="14" font-weight="800"><tspan font-style="italic">F</tspan> = 20 N</text>';
    s += '</svg>';
    return s;
  };

  // 18. Geometría Tetraédrica del Metano CH4 (qui-31)
  FIG['fql19-geometria-ch4'] = function () {
    var s = openSvg(380, 200);
    var cx = 190, cy = 100;
    s += '<text x="' + cx + '" y="' + (cy + 8) + '" fill="#0e2a47" font-size="24" font-weight="800" text-anchor="middle">C</text>';
    // Enlace superior
    s += '<line x1="' + cx + '" y1="' + (cy - 16) + '" x2="' + cx + '" y2="' + (cy - 50) + '" stroke="#0e2a47" stroke-width="2.5"/>';
    s += '<text x="' + cx + '" y="' + (cy - 58) + '" fill="#0e2a47" font-size="18" font-weight="700" text-anchor="middle">H</text>';
    // Enlace izquierdo
    s += '<line x1="' + (cx - 15) + '" y1="' + (cy + 10) + '" x2="' + (cx - 50) + '" y2="' + (cy + 40) + '" stroke="#0e2a47" stroke-width="2.5"/>';
    s += '<text x="' + (cx - 62) + '" y="' + (cy + 52) + '" fill="#0e2a47" font-size="18" font-weight="700" text-anchor="middle">H</text>';
    // Cuña rellena
    s += '<polygon points="' + (cx + 5) + ',' + (cy + 15) + ' ' + (cx - 5) + ',' + (cy + 18) + ' ' + (cx - 10) + ',' + (cy + 55) + ' ' + (cx + 10) + ',' + (cy + 55) + '" fill="#0284c7"/>';
    s += '<text x="' + cx + '" y="' + (cy + 75) + '" fill="#0284c7" font-size="18" font-weight="700" text-anchor="middle">H</text>';
    // Línea discontinua
    s += '<line x1="' + (cx + 15) + '" y1="' + (cy + 8) + '" x2="' + (cx + 55) + '" y2="' + (cy + 35) + '" stroke="#64748b" stroke-width="2.5" stroke-dasharray="4 3"/>';
    s += '<text x="' + (cx + 68) + '" y="' + (cy + 46) + '" fill="#64748b" font-size="18" font-weight="700" text-anchor="middle">H</text>';
    s += '<text x="190" y="190" fill="#0e2a47" font-size="12" font-weight="700" text-anchor="middle">Geometría Tetraédrica (<tspan font-style="italic">sp</tspan><tspan font-size="9" dy="-3">3</tspan><tspan dy="3">)</tspan></text>';
    s += '</svg>';
    return s;
  };

  // 19. Geometría Trigonal Plana del Trifluoruro de Boro BF3 (qui-32)
  FIG['fql19-geometria-bf3'] = function () {
    var s = openSvg(380, 200);
    var cx = 190, cy = 100;
    s += '<text x="' + cx + '" y="' + (cy + 8) + '" fill="#0e2a47" font-size="24" font-weight="800" text-anchor="middle">B</text>';
    // Enlace superior
    s += '<line x1="' + cx + '" y1="' + (cy - 16) + '" x2="' + cx + '" y2="' + (cy - 50) + '" stroke="#0e2a47" stroke-width="2.5"/>';
    s += '<text x="' + cx + '" y="' + (cy - 58) + '" fill="#dc2626" font-size="18" font-weight="800" text-anchor="middle">F</text>';
    // Enlace inferior izquierdo (120°)
    s += '<line x1="' + (cx - 15) + '" y1="' + (cy + 8) + '" x2="' + (cx - 55) + '" y2="' + (cy + 40) + '" stroke="#0e2a47" stroke-width="2.5"/>';
    s += '<text x="' + (cx - 68) + '" y="' + (cy + 52) + '" fill="#dc2626" font-size="18" font-weight="800" text-anchor="middle">F</text>';
    // Enlace inferior derecho (120°)
    s += '<line x1="' + (cx + 15) + '" y1="' + (cy + 8) + '" x2="' + (cx + 55) + '" y2="' + (cy + 40) + '" stroke="#0e2a47" stroke-width="2.5"/>';
    s += '<text x="' + (cx + 68) + '" y="' + (cy + 52) + '" fill="#dc2626" font-size="18" font-weight="800" text-anchor="middle">F</text>';
    s += '<text x="190" y="190" fill="#0e2a47" font-size="12" font-weight="700" text-anchor="middle">Geometría Trigonal Plana (Ángulos de 120°)</text>';
    s += '</svg>';
    return s;
  };

  window.FIG_19AGO = FIG;
})();
