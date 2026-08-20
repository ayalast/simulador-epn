/* Figuras pedagógicas vectoriales SVG para el Simulador Día 2 — 19 Agosto EPN.
   Renderizado matemático nítido tipo LaTeX con cotas, vectores y colores contrastantes.
   window.FIG_19AGO */
(function () {
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function openSvg(w, h) {
    return '<svg width="100%" height="auto" viewBox="0 0 ' + w + ' ' + h +
      '" xmlns="http://www.w3.org/2000/svg" style="max-width:' + w + 'px;display:block;margin:12px auto;background:#f8fafc;border-radius:10px;border:1px solid #e2e8f0;box-shadow:0 2px 8px rgba(0,0,0,0.04);font-family:system-ui, -apple-system, sans-serif;">' +
      '<defs>' +
      '<marker id="f19-arr-blue" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#0284c7"/></marker>' +
      '<marker id="f19-arr-red" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#dc2626"/></marker>' +
      '<marker id="f19-arr-dark" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#0e2a47"/></marker>' +
      '<marker id="f19-arr-green" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#16a34a"/></marker>' +
      '</defs>';
  }

  var FIG = {};

  // 1. Avión soltando paquete (MRU horizontal + Caída Libre vertical = Parábola)
  FIG['fql19-avion-proyectil'] = function () {
    var s = openSvg(540, 220);
    s += '<line x1="30" y1="185" x2="510" y2="185" stroke="#64748b" stroke-width="2"/>';
    s += '<text x="270" y="205" fill="#64748b" font-size="12" font-weight="600" text-anchor="middle">Suelo horizontal (Observador inmóvil en tierra)</text>';
    s += '<rect x="50" y="35" width="80" height="22" rx="4" fill="#cbd5e1" stroke="#475569" stroke-width="1.5"/>';
    s += '<polygon points="130,46 160,46 130,35" fill="#94a3b8" stroke="#475569" stroke-width="1.2"/>';
    s += '<line x1="130" y1="46" x2="200" y2="46" stroke="#0284c7" stroke-width="2.5" marker-end="url(#f19-arr-blue)"/>';
    s += '<text x="208" y="50" fill="#0284c7" font-size="13" font-weight="700" font-style="italic">v_x = 180 m/s (constante)</text>';
    s += '<path d="M 90,57 Q 240,65 400,185" fill="none" stroke="#dc2626" stroke-width="2.5" stroke-dasharray="6 4"/>';
    s += '<circle cx="90" cy="57" r="5.5" fill="#dc2626"/>';
    s += '<circle cx="230" cy="95" r="6" fill="#dc2626"/>';
    s += '<circle cx="400" cy="185" r="6.5" fill="#dc2626"/>';
    s += '<line x1="230" y1="95" x2="230" y2="145" stroke="#dc2626" stroke-width="2" marker-end="url(#f19-arr-red)"/>';
    s += '<text x="242" y="125" fill="#dc2626" font-size="12" font-weight="700" font-style="italic">a_y = g</text>';
    s += '<text x="265" y="85" fill="#dc2626" font-size="13" font-weight="700">Trayectoria parabólica hacia adelante</text>';
    s += '</svg>';
    return s;
  };

  // 2. Choque de bloques (3ra Ley de Newton: Acción y Reacción)
  FIG['fql19-choque-bloques'] = function () {
    var s = openSvg(520, 190);
    s += '<line x1="40" y1="145" x2="480" y2="145" stroke="#64748b" stroke-width="2"/>';
    s += '<text x="260" y="165" fill="#64748b" font-size="12" text-anchor="middle">Superficie horizontal sin rozamiento</text>';
    s += '<rect x="140" y="75" width="80" height="70" rx="4" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>';
    s += '<text x="180" y="115" fill="#0369a1" font-size="14" font-weight="800" text-anchor="middle">Bloque A</text>';
    s += '<text x="180" y="132" fill="#0369a1" font-size="12" font-weight="600" text-anchor="middle">(10 kg)</text>';
    s += '<rect x="220" y="95" width="60" height="50" rx="4" fill="#ffedd5" stroke="#ea580c" stroke-width="2"/>';
    s += '<text x="250" y="123" fill="#c2410c" font-size="13" font-weight="800" text-anchor="middle">Bloque B</text>';
    s += '<text x="250" y="138" fill="#c2410c" font-size="11" font-weight="600" text-anchor="middle">(2 kg)</text>';
    s += '<line x1="220" y1="50" x2="295" y2="50" stroke="#dc2626" stroke-width="2.5" marker-end="url(#f19-arr-red)"/>';
    s += '<text x="305" y="54" fill="#dc2626" font-size="13" font-weight="800">F_{A → B}</text>';
    s += '<line x1="220" y1="50" x2="145" y2="50" stroke="#dc2626" stroke-width="2.5" marker-end="url(#f19-arr-red)"/>';
    s += '<text x="135" y="54" fill="#dc2626" font-size="13" font-weight="800" text-anchor="end">F_{B → A}</text>';
    s += '<text x="260" y="25" fill="#0e2a47" font-size="14" font-weight="800" text-anchor="middle">|F_{A → B}| = |F_{B → A}| (Misma magnitud, sentidos opuestos)</text>';
    s += '</svg>';
    return s;
  };

  // 3. Tiro vertical (Lanzamiento P, Intermedio Q con subida/bajada, Ápice T)
  FIG['fql19-tiro-vertical'] = function () {
    var s = openSvg(420, 270);
    s += '<line x1="150" y1="230" x2="150" y2="40" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 4"/>';
    s += '<circle cx="150" cy="230" r="6" fill="#0284c7"/>';
    s += '<text x="175" y="235" fill="#0e2a47" font-size="13" font-weight="700">Punto P (Suelo, v = v₀)</text>';
    s += '<circle cx="150" cy="140" r="6" fill="#16a34a"/>';
    s += '<text x="175" y="145" fill="#16a34a" font-size="13" font-weight="700">Punto Q (h = 15 m)</text>';
    s += '<text x="175" y="162" fill="#64748b" font-size="11.5">|v_{subida}| = |v_{bajada}| (misma rapidez)</text>';
    s += '<circle cx="150" cy="40" r="7" fill="#dc2626"/>';
    s += '<text x="175" y="42" fill="#dc2626" font-size="13" font-weight="800">Punto T (Ápice: v = 0)</text>';
    s += '<text x="175" y="58" fill="#dc2626" font-size="12" font-weight="600">Aceleración a = g (hacia abajo)</text>';
    s += '<line x1="100" y1="80" x2="100" y2="150" stroke="#dc2626" stroke-width="2.2" marker-end="url(#f19-arr-red)"/>';
    s += '<text x="90" y="120" fill="#dc2626" font-size="13" font-weight="800" text-anchor="end">g = 9.8 m/s²</text>';
    s += '</svg>';
    return s;
  };

  // 4. Péndulo oscilante (A y B extremos con Ec=0; C punto más bajo con Ec=máx)
  FIG['fql19-pendulo-oscilante'] = function () {
    var s = openSvg(460, 230);
    s += '<line x1="150" y1="20" x2="310" y2="20" stroke="#475569" stroke-width="3"/>';
    s += '<circle cx="230" cy="20" r="4" fill="#0e2a47"/>';
    s += '<path d="M 120,130 Q 230,205 340,130" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 4"/>';
    s += '<line x1="230" y1="20" x2="120" y2="130" stroke="#64748b" stroke-width="1.2" stroke-dasharray="3 3"/>';
    s += '<line x1="230" y1="20" x2="340" y2="130" stroke="#64748b" stroke-width="1.2" stroke-dasharray="3 3"/>';
    s += '<line x1="230" y1="20" x2="230" y2="185" stroke="#0e2a47" stroke-width="2"/>';
    s += '<circle cx="120" cy="130" r="10" fill="#cbd5e1" stroke="#475569" stroke-width="1.5"/>';
    s += '<text x="120" y="110" fill="#0e2a47" font-size="12" font-weight="800" text-anchor="middle">A (v=0)</text>';
    s += '<text x="120" y="160" fill="#64748b" font-size="11" text-anchor="middle">E_p máx · E_c = 0</text>';

    s += '<circle cx="340" cy="130" r="10" fill="#cbd5e1" stroke="#475569" stroke-width="1.5"/>';
    s += '<text x="340" y="110" fill="#0e2a47" font-size="12" font-weight="800" text-anchor="middle">B (v=0)</text>';
    s += '<text x="340" y="160" fill="#64748b" font-size="11" text-anchor="middle">E_p máx · E_c = 0</text>';

    s += '<circle cx="230" cy="185" r="12" fill="#0284c7" stroke="#0369a1" stroke-width="2"/>';
    s += '<text x="230" y="215" fill="#0284c7" font-size="13" font-weight="800" text-anchor="middle">Posición C (Punto más bajo)</text>';
    s += '<text x="230" y="170" fill="#dc2626" font-size="12" font-weight="800" text-anchor="middle">E_c MÁXIMA (v = v_{máx})</text>';
    s += '</svg>';
    return s;
  };

  // 5. Doble plano inclinado de Galileo (Conservación de altura h)
  FIG['fql19-rampa-galileo'] = function () {
    var s = openSvg(520, 200);
    s += '<path d="M 40,50 L 200,160 L 480,50" fill="none" stroke="#0e2a47" stroke-width="3"/>';
    s += '<line x1="40" y1="160" x2="480" y2="160" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="3 3"/>';
    s += '<line x1="40" y1="50" x2="15" y2="50" stroke="#64748b" stroke-width="1"/>';
    s += '<line x1="40" y1="160" x2="15" y2="160" stroke="#64748b" stroke-width="1"/>';
    s += '<line x1="25" y1="50" x2="25" y2="160" stroke="#0284c7" stroke-width="1.8" marker-start="url(#f19-arr-blue)" marker-end="url(#f19-arr-blue)"/>';
    s += '<text x="15" y="110" fill="#0284c7" font-size="13" font-weight="800" text-anchor="end">h</text>';
    s += '<circle cx="50" cy="45" r="9" fill="#dc2626"/>';
    s += '<text x="55" y="28" fill="#dc2626" font-size="12" font-weight="700">Inicio (v=0)</text>';
    s += '<circle cx="470" cy="45" r="9" fill="#16a34a"/>';
    s += '<text x="465" y="28" fill="#16a34a" font-size="12" font-weight="700" text-anchor="end">Llega exactamente a la misma altura h</text>';
    s += '<text x="260" y="185" fill="#0e2a47" font-size="12" font-weight="700" text-anchor="middle">Superficie ideal sin fricción (mgh = constante)</text>';
    s += '</svg>';
    return s;
  };

  // 6. Rampa vs Levantamiento vertical (Trabajo W = MgH)
  FIG['fql19-rampa-vs-vertical'] = function () {
    var s = openSvg(540, 220);
    s += '<polygon points="60,180 340,180 340,60 60,180" fill="#f1f5f9" stroke="#475569" stroke-width="2"/>';
    s += '<rect x="340" y="60" width="80" height="120" fill="#e2e8f0" stroke="#475569" stroke-width="1.5"/>';
    s += '<line x1="430" y1="60" x2="430" y2="180" stroke="#0284c7" stroke-width="2" marker-start="url(#f19-arr-blue)" marker-end="url(#f19-arr-blue)"/>';
    s += '<text x="445" y="125" fill="#0284c7" font-size="14" font-weight="800">H</text>';
    s += '<rect x="160" y="110" width="36" height="26" transform="rotate(-23 160 110)" fill="#bae6fd" stroke="#0284c7" stroke-width="1.5"/>';
    s += '<text x="140" y="95" fill="#0369a1" font-size="11" font-weight="700">F = Mg·sin θ</text>';
    s += '<text x="180" y="195" fill="#64748b" font-size="12" text-anchor="middle">Rampa de longitud L (sin roce)</text>';
    s += '<rect x="470" y="110" width="30" height="26" fill="#fed7aa" stroke="#ea580c" stroke-width="1.5"/>';
    s += '<line x1="485" y1="110" x2="485" y2="70" stroke="#ea580c" stroke-width="2" marker-end="url(#f19-arr-red)"/>';
    s += '<text x="485" y="60" fill="#ea580c" font-size="11" font-weight="700" text-anchor="middle">F = Mg</text>';
    s += '<text x="270" y="25" fill="#0e2a47" font-size="13" font-weight="800" text-anchor="middle">W_{vertical} = W_{rampa} = MgH</text>';
    s += '</svg>';
    return s;
  };

  // 7. Disco sobre hielo con 4 fuerzas ortogonales (F_N=12, F_S=12, F_E=8, F_O=8)
  FIG['fql19-disco-4fuerzas'] = function () {
    var s = openSvg(420, 240);
    var cx = 210, cy = 120;
    s += '<line x1="50" y1="120" x2="370" y2="120" stroke="#cbd5e1" stroke-width="1.2"/>';
    s += '<line x1="210" y1="20" x2="210" y2="220" stroke="#cbd5e1" stroke-width="1.2"/>';
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="16" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>';
    s += '<text x="' + cx + '" y="' + (cy + 4) + '" fill="#0369a1" font-size="10" font-weight="800" text-anchor="middle">0.5 kg</text>';
    s += '<line x1="' + cx + '" y1="' + (cy - 16) + '" x2="' + cx + '" y2="35" stroke="#dc2626" stroke-width="2.5" marker-end="url(#f19-arr-red)"/>';
    s += '<text x="' + (cx + 8) + '" y="45" fill="#dc2626" font-size="12" font-weight="800">F₁ = 12 N (Norte)</text>';

    s += '<line x1="' + cx + '" y1="' + (cy + 16) + '" x2="' + cx + '" y2="205" stroke="#dc2626" stroke-width="2.5" marker-end="url(#f19-arr-red)"/>';
    s += '<text x="' + (cx + 8) + '" y="200" fill="#dc2626" font-size="12" font-weight="800">F₂ = 12 N (Sur)</text>';

    s += '<line x1="' + (cx + 16) + '" y1="' + cy + '" x2="330" y2="' + cy + '" stroke="#0284c7" stroke-width="2.5" marker-end="url(#f19-arr-blue)"/>';
    s += '<text x="335" y="' + (cy - 8) + '" fill="#0284c7" font-size="12" font-weight="800">F₃ = 8 N (Este)</text>';

    s += '<line x1="' + (cx - 16) + '" y1="' + cy + '" x2="90" y2="' + cy + '" stroke="#0284c7" stroke-width="2.5" marker-end="url(#f19-arr-blue)"/>';
    s += '<text x="85" y="' + (cy - 8) + '" fill="#0284c7" font-size="12" font-weight="800" text-anchor="end">F₄ = 8 N (Oeste)</text>';

    s += '<text x="' + cx + '" y="15" fill="#0e2a47" font-size="13" font-weight="800" text-anchor="middle">ΣF_x = 0  ·  ΣF_y = 0  ⇒  F_{neta} = 0 (MRU o Reposo)</text>';
    s += '</svg>';
    return s;
  };

  // 8. Sombra de un poste y trigonometría (H = S * tan 30°)
  FIG['fql19-poste-sombra'] = function () {
    var s = openSvg(480, 220);
    s += '<line x1="40" y1="180" x2="440" y2="180" stroke="#64748b" stroke-width="2"/>';
    s += '<line x1="100" y1="180" x2="100" y2="60" stroke="#0e2a47" stroke-width="4"/>';
    s += '<text x="85" y="120" fill="#0e2a47" font-size="14" font-weight="800" text-anchor="end">H = ?</text>';
    s += '<line x1="100" y1="60" x2="380" y2="180" stroke="#eab308" stroke-width="2.5" stroke-dasharray="5 4"/>';
    s += '<line x1="100" y1="180" x2="380" y2="180" stroke="#0284c7" stroke-width="4"/>';
    s += '<text x="240" y="200" fill="#0284c7" font-size="13" font-weight="800" text-anchor="middle">Sombra S = 6 m</text>';
    s += '<path d="M 330,180 A 50 50 0 0 0 345,165" fill="none" stroke="#dc2626" stroke-width="2"/>';
    s += '<text x="315" y="170" fill="#dc2626" font-size="13" font-weight="800">30°</text>';
    s += '<circle cx="80" cy="40" r="14" fill="#fde047" stroke="#eab308" stroke-width="2"/>';
    s += '<text x="280" y="80" fill="#0e2a47" font-size="13" font-weight="800">tan 30° = H / S</text>';
    s += '<text x="280" y="102" fill="#0284c7" font-size="13" font-weight="800">H = 6 · (√3 / 3) = 2√3 m ≈ 3.46 m</text>';
    s += '</svg>';
    return s;
  };

  // 9. Movimiento Circular Uniforme (MCU) — Vectores v y a_c
  FIG['fql19-mcu-vectorial'] = function () {
    var s = openSvg(440, 240);
    var cx = 200, cy = 120, r = 70;
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="5 4"/>';
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="3" fill="#0e2a47"/>';
    s += '<text x="' + (cx - 10) + '" y="' + (cy - 8) + '" fill="#64748b" font-size="11">Centro</text>';
    s += '<line x1="' + cx + '" y1="' + cy + '" x2="' + (cx + r) + '" y2="' + cy + '" stroke="#64748b" stroke-width="1.5"/>';
    s += '<text x="' + (cx + r/2) + '" y="' + (cy - 6) + '" fill="#64748b" font-size="11" text-anchor="middle">R = 2 m</text>';
    var px = cx + r, py = cy;
    s += '<circle cx="' + px + '" cy="' + py + '" r="7" fill="#0284c7"/>';
    s += '<line x1="' + px + '" y1="' + py + '" x2="' + px + '" y2="35" stroke="#16a34a" stroke-width="2.5" marker-end="url(#f19-arr-green)"/>';
    s += '<text x="' + (px + 10) + '" y="45" fill="#16a34a" font-size="12" font-weight="800">v = 6 m/s (tangencial, a_t = 0)</text>';
    s += '<line x1="' + px + '" y1="' + py + '" x2="' + (cx + 15) + '" y2="' + cy + '" stroke="#dc2626" stroke-width="2.5" marker-end="url(#f19-arr-red)"/>';
    s += '<text x="' + (cx + r/2) + '" y="' + (cy + 22) + '" fill="#dc2626" font-size="12" font-weight="800" text-anchor="middle">a_c = v²/R = 18 m/s²</text>';
    s += '</svg>';
    return s;
  };

  // 10. Semáforo colgado simétricamente (2T sin 30° = W)
  FIG['fql19-semaforo-cables'] = function () {
    var s = openSvg(460, 220);
    s += '<line x1="60" y1="30" x2="400" y2="30" stroke="#475569" stroke-width="3"/>';
    s += '<line x1="80" y1="30" x2="230" y2="110" stroke="#0284c7" stroke-width="2.2"/>';
    s += '<line x1="380" y1="30" x2="230" y2="110" stroke="#0284c7" stroke-width="2.2"/>';
    s += '<line x1="140" y1="110" x2="320" y2="110" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3 3"/>';
    s += '<text x="140" y="98" fill="#dc2626" font-size="12" font-weight="700">30°</text>';
    s += '<text x="300" y="98" fill="#dc2626" font-size="12" font-weight="700">30°</text>';
    s += '<line x1="230" y1="110" x2="230" y2="140" stroke="#0e2a47" stroke-width="2"/>';
    s += '<rect x="215" y="140" width="30" height="55" rx="4" fill="#334155" stroke="#0e2a47" stroke-width="1.5"/>';
    s += '<circle cx="230" cy="152" r="5" fill="#ef4444"/>';
    s += '<circle cx="230" cy="167" r="5" fill="#eab308"/>';
    s += '<circle cx="230" cy="182" r="5" fill="#22c55e"/>';
    s += '<text x="270" y="170" fill="#0e2a47" font-size="13" font-weight="800">W = 100 N</text>';
    s += '<text x="230" y="210" fill="#0284c7" font-size="13" font-weight="800" text-anchor="middle">2·T·sin 30° = W  ⇒  2·T·(0.5) = 100  ⇒  T = 100 N</text>';
    s += '</svg>';
    return s;
  };

  // 11. Gráfica cartesiana exacta v vs t (Área = Desplazamiento 36 m, Pendiente = 2 m/s²)
  FIG['fql19-grafica-vt'] = function () {
    var s = openSvg(480, 240);
    s += '<line x1="60" y1="190" x2="430" y2="190" stroke="#0e2a47" stroke-width="2" marker-end="url(#f19-arr-dark)"/>';
    s += '<text x="435" y="194" fill="#0e2a47" font-size="13" font-weight="800">t (s)</text>';
    s += '<line x1="60" y1="190" x2="60" y2="30" stroke="#0e2a47" stroke-width="2" marker-end="url(#f19-arr-dark)"/>';
    s += '<text x="50" y="24" fill="#0e2a47" font-size="13" font-weight="800">v (m/s)</text>';
    s += '<line x1="60" y1="70" x2="360" y2="70" stroke="#cbd5e1" stroke-width="1.2" stroke-dasharray="3 3"/>';
    s += '<line x1="360" y1="70" x2="360" y2="190" stroke="#cbd5e1" stroke-width="1.2" stroke-dasharray="3 3"/>';
    s += '<text x="50" y="74" fill="#0e2a47" font-size="12" font-weight="700" text-anchor="end">12</text>';
    s += '<text x="360" y="208" fill="#0e2a47" font-size="12" font-weight="700" text-anchor="middle">6</text>';
    s += '<text x="50" y="194" fill="#0e2a47" font-size="12" text-anchor="end">0</text>';
    s += '<polygon points="60,190 360,70 360,190" fill="#bae6fd" opacity="0.6"/>';
    s += '<text x="240" y="150" fill="#0369a1" font-size="13" font-weight="800" text-anchor="middle">Área = (6 × 12)/2 = 36 m</text>';
    s += '<text x="240" y="168" fill="#0369a1" font-size="11.5" text-anchor="middle">(Desplazamiento total Δx)</text>';
    s += '<line x1="60" y1="190" x2="360" y2="70" stroke="#0284c7" stroke-width="3"/>';
    s += '<circle cx="360" cy="70" r="5" fill="#0284c7"/>';
    s += '<text x="210" y="55" fill="#0284c7" font-size="13" font-weight="800">Pendiente = a = 12/6 = 2 m/s²</text>';
    s += '</svg>';
    return s;
  };

  // 12. Estructura de Lewis del Amoníaco (NH3 con par libre superior)
  FIG['fql19-lewis-nh3'] = function () {
    var s = openSvg(360, 200);
    var cx = 180, cy = 105;
    s += '<text x="' + cx + '" y="' + (cy + 8) + '" fill="#0e2a47" font-size="28" font-weight="800" text-anchor="middle">N</text>';
    s += '<circle cx="' + (cx - 6) + '" cy="' + (cy - 20) + '" r="3" fill="#dc2626"/>';
    s += '<circle cx="' + (cx + 6) + '" cy="' + (cy - 20) + '" r="3" fill="#dc2626"/>';
    s += '<text x="' + cx + '" y="' + (cy - 30) + '" fill="#dc2626" font-size="12" font-weight="700" text-anchor="middle">1 par no enlazante (libre)</text>';
    s += '<line x1="' + cx + '" y1="' + (cy + 18) + '" x2="' + cx + '" y2="' + (cy + 45) + '" stroke="#0e2a47" stroke-width="2.5"/>';
    s += '<text x="' + cx + '" y="' + (cy + 68) + '" fill="#0e2a47" font-size="22" font-weight="700" text-anchor="middle">H</text>';
    s += '<line x1="' + (cx - 18) + '" y1="' + (cy + 12) + '" x2="' + (cx - 45) + '" y2="' + (cy + 35) + '" stroke="#0e2a47" stroke-width="2.5"/>';
    s += '<text x="' + (cx - 60) + '" y="' + (cy + 48) + '" fill="#0e2a47" font-size="22" font-weight="700" text-anchor="middle">H</text>';
    s += '<line x1="' + (cx + 18) + '" y1="' + (cy + 12) + '" x2="' + (cx + 45) + '" y2="' + (cy + 35) + '" stroke="#0e2a47" stroke-width="2.5"/>';
    s += '<text x="' + (cx + 60) + '" y="' + (cy + 48) + '" fill="#0e2a47" font-size="22" font-weight="700" text-anchor="middle">H</text>';
    s += '<text x="180" y="190" fill="#0369a1" font-size="12.5" font-weight="700" text-anchor="middle">3 enlaces covalentes simples + 1 par libre</text>';
    s += '</svg>';
    return s;
  };

  // 13. Geometría Lineal y Cancelación de Dipolos del CO2
  FIG['fql19-lewis-co2'] = function () {
    var s = openSvg(440, 180);
    var cy = 90;
    s += '<text x="90" y="' + (cy + 10) + '" fill="#0e2a47" font-size="28" font-weight="800" text-anchor="middle">O</text>';
    s += '<line x1="120" y1="' + (cy - 4) + '" x2="190" y2="' + (cy - 4) + '" stroke="#0e2a47" stroke-width="2.5"/>';
    s += '<line x1="120" y1="' + (cy + 6) + '" x2="190" y2="' + (cy + 6) + '" stroke="#0e2a47" stroke-width="2.5"/>';
    s += '<text x="220" y="' + (cy + 10) + '" fill="#0e2a47" font-size="28" font-weight="800" text-anchor="middle">C</text>';
    s += '<line x1="250" y1="' + (cy - 4) + '" x2="320" y2="' + (cy - 4) + '" stroke="#0e2a47" stroke-width="2.5"/>';
    s += '<line x1="250" y1="' + (cy + 6) + '" x2="320" y2="' + (cy + 6) + '" stroke="#0e2a47" stroke-width="2.5"/>';
    s += '<text x="350" y="' + (cy + 10) + '" fill="#0e2a47" font-size="28" font-weight="800" text-anchor="middle">O</text>';
    s += '<line x1="205" y1="40" x2="115" y2="40" stroke="#dc2626" stroke-width="2.2" marker-end="url(#f19-arr-red)"/>';
    s += '<text x="160" y="30" fill="#dc2626" font-size="12" font-weight="800" text-anchor="middle">μ₁ (hacia O)</text>';
    s += '<line x1="235" y1="40" x2="325" y2="40" stroke="#dc2626" stroke-width="2.2" marker-end="url(#f19-arr-red)"/>';
    s += '<text x="280" y="30" fill="#dc2626" font-size="12" font-weight="800" text-anchor="middle">μ₂ (hacia O)</text>';
    s += '<text x="220" y="145" fill="#0e2a47" font-size="13" font-weight="800" text-anchor="middle">Geometría lineal 180° ⇒ μ_{neto} = μ₁ + μ₂ = 0 (Molécula apolar)</text>';
    s += '</svg>';
    return s;
  };

  window.FIG_19AGO = FIG;
})();
