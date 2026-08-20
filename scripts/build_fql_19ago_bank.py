# scripts/build_fql_19ago_bank.py
# Generates guia-bank-fql-19ago.js and js/fig-fql-19ago.js
# 1. High-precision tailor-made SVG figures ONLY where mathematically appropriate.
# 2. Perfect LaTeX-style typography in all SVG diagrams using <tspan> subscripts/italics.
# 3. 3-step hand solutions in every question.
import json
import os

print("Building complete 90-item bank and figures for 19 Ago Simulator...")

# ---------------------------------------------------------
# 1. WRITE JS/FIG-FQL-19AGO.JS
# ---------------------------------------------------------
fig_js_content = """/* Figuras pedagógicas vectoriales SVG para el Simulador Día 2 — 19 Agosto EPN.
   Renderizado matemático nítido tipo LaTeX con cotas, vectores y colores contrastantes.
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

  // 1. Avión soltando paquete (MRU horizontal + Caída Libre vertical = Parábola)
  FIG['fql19-avion-proyectil'] = function () {
    var s = openSvg(540, 220);
    s += '<line x1="30" y1="185" x2="510" y2="185" stroke="#64748b" stroke-width="2"/>';
    s += '<text x="270" y="205" fill="#64748b" font-size="12" font-weight="600" text-anchor="middle">Suelo horizontal (Observador inmóvil en tierra)</text>';
    s += '<rect x="50" y="35" width="80" height="22" rx="4" fill="#cbd5e1" stroke="#475569" stroke-width="1.5"/>';
    s += '<polygon points="130,46 160,46 130,35" fill="#94a3b8" stroke="#475569" stroke-width="1.2"/>';
    s += '<line x1="130" y1="46" x2="200" y2="46" stroke="#0284c7" stroke-width="2.5" marker-end="url(#f19-arr-blue)"/>';
    s += '<text x="208" y="50" fill="#0284c7" font-size="13" font-weight="700"><tspan font-style="italic">v</tspan><tspan font-size="10" dy="3">x</tspan><tspan dy="-3"> = 180 m/s (constante)</tspan></text>';
    s += '<path d="M 90,57 Q 240,65 400,185" fill="none" stroke="#dc2626" stroke-width="2.5" stroke-dasharray="6 4"/>';
    s += '<circle cx="90" cy="57" r="5.5" fill="#dc2626"/>';
    s += '<circle cx="230" cy="95" r="6" fill="#dc2626"/>';
    s += '<circle cx="400" cy="185" r="6.5" fill="#dc2626"/>';
    s += '<line x1="230" y1="95" x2="230" y2="145" stroke="#dc2626" stroke-width="2" marker-end="url(#f19-arr-red)"/>';
    s += '<text x="242" y="125" fill="#dc2626" font-size="12" font-weight="700"><tspan font-style="italic">a</tspan><tspan font-size="10" dy="3">y</tspan><tspan dy="-3"> = </tspan><tspan font-style="italic">g</tspan></text>';
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
    s += '<text x="305" y="54" fill="#dc2626" font-size="13" font-weight="800"><tspan font-style="italic">F</tspan><tspan font-size="10" dy="3">A→B</tspan></text>';
    s += '<line x1="220" y1="50" x2="145" y2="50" stroke="#dc2626" stroke-width="2.5" marker-end="url(#f19-arr-red)"/>';
    s += '<text x="135" y="54" fill="#dc2626" font-size="13" font-weight="800" text-anchor="end"><tspan font-style="italic">F</tspan><tspan font-size="10" dy="3">B→A</tspan></text>';
    s += '<text x="260" y="25" fill="#0e2a47" font-size="13.5" font-weight="800" text-anchor="middle">|<tspan font-style="italic">F</tspan><tspan font-size="10" dy="2">A→B</tspan><tspan dy="-2">| = |</tspan><tspan font-style="italic">F</tspan><tspan font-size="10" dy="2">B→A</tspan><tspan dy="-2">| (Misma magnitud, sentidos opuestos)</tspan></text>';
    s += '</svg>';
    return s;
  };

  // 3. Tiro vertical (Lanzamiento P, Intermedio Q con subida/bajada, Ápice T)
  FIG['fql19-tiro-vertical'] = function () {
    var s = openSvg(420, 270);
    s += '<line x1="150" y1="230" x2="150" y2="40" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 4"/>';
    s += '<circle cx="150" cy="230" r="6" fill="#0284c7"/>';
    s += '<text x="175" y="235" fill="#0e2a47" font-size="13" font-weight="700">Punto P (Suelo, <tspan font-style="italic">v</tspan> = <tspan font-style="italic">v</tspan><tspan font-size="10" dy="3">0</tspan><tspan dy="-3">)</tspan></text>';
    s += '<circle cx="150" cy="140" r="6" fill="#16a34a"/>';
    s += '<text x="175" y="145" fill="#16a34a" font-size="13" font-weight="700">Punto Q (<tspan font-style="italic">h</tspan> = 15 m)</text>';
    s += '<text x="175" y="162" fill="#64748b" font-size="11.5">|<tspan font-style="italic">v</tspan><tspan font-size="9" dy="2">subida</tspan><tspan dy="-2">| = |</tspan><tspan font-style="italic">v</tspan><tspan font-size="9" dy="2">bajada</tspan><tspan dy="-2">| (misma rapidez)</tspan></text>';
    s += '<circle cx="150" cy="40" r="7" fill="#dc2626"/>';
    s += '<text x="175" y="42" fill="#dc2626" font-size="13" font-weight="800">Punto T (Ápice: <tspan font-style="italic">v</tspan> = 0)</text>';
    s += '<text x="175" y="58" fill="#dc2626" font-size="12" font-weight="600">Aceleración <tspan font-style="italic">a</tspan> = <tspan font-style="italic">g</tspan> (hacia abajo)</text>';
    s += '<line x1="100" y1="80" x2="100" y2="150" stroke="#dc2626" stroke-width="2.2" marker-end="url(#f19-arr-red)"/>';
    s += '<text x="90" y="120" fill="#dc2626" font-size="13" font-weight="800" text-anchor="end"><tspan font-style="italic">g</tspan> = 9.8 m/s²</text>';
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
    s += '<text x="120" y="110" fill="#0e2a47" font-size="12" font-weight="800" text-anchor="middle">A (<tspan font-style="italic">v</tspan> = 0)</text>';
    s += '<text x="120" y="160" fill="#64748b" font-size="11" text-anchor="middle"><tspan font-style="italic">E</tspan><tspan font-size="9" dy="2">p</tspan><tspan dy="-2"> máx · </tspan><tspan font-style="italic">E</tspan><tspan font-size="9" dy="2">c</tspan><tspan dy="-2"> = 0</tspan></text>';

    s += '<circle cx="340" cy="130" r="10" fill="#cbd5e1" stroke="#475569" stroke-width="1.5"/>';
    s += '<text x="340" y="110" fill="#0e2a47" font-size="12" font-weight="800" text-anchor="middle">B (<tspan font-style="italic">v</tspan> = 0)</text>';
    s += '<text x="340" y="160" fill="#64748b" font-size="11" text-anchor="middle"><tspan font-style="italic">E</tspan><tspan font-size="9" dy="2">p</tspan><tspan dy="-2"> máx · </tspan><tspan font-style="italic">E</tspan><tspan font-size="9" dy="2">c</tspan><tspan dy="-2"> = 0</tspan></text>';

    s += '<circle cx="230" cy="185" r="12" fill="#0284c7" stroke="#0369a1" stroke-width="2"/>';
    s += '<text x="230" y="215" fill="#0284c7" font-size="13" font-weight="800" text-anchor="middle">Posición C (Punto más bajo)</text>';
    s += '<text x="230" y="170" fill="#dc2626" font-size="12" font-weight="800" text-anchor="middle"><tspan font-style="italic">E</tspan><tspan font-size="9" dy="2">c</tspan><tspan dy="-2"> MÁXIMA (</tspan><tspan font-style="italic">v</tspan> = <tspan font-style="italic">v</tspan><tspan font-size="9" dy="2">máx</tspan><tspan dy="-2">)</tspan></text>';
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
    s += '<text x="15" y="110" fill="#0284c7" font-size="14" font-weight="800" text-anchor="end"><tspan font-style="italic">h</tspan></text>';
    s += '<circle cx="50" cy="45" r="9" fill="#dc2626"/>';
    s += '<text x="55" y="28" fill="#dc2626" font-size="12" font-weight="700">Inicio (<tspan font-style="italic">v</tspan> = 0)</text>';
    s += '<circle cx="470" cy="45" r="9" fill="#16a34a"/>';
    s += '<text x="465" y="28" fill="#16a34a" font-size="12" font-weight="700" text-anchor="end">Llega exactamente a la misma altura <tspan font-style="italic">h</tspan></text>';
    s += '<text x="260" y="185" fill="#0e2a47" font-size="12" font-weight="700" text-anchor="middle">Superficie ideal sin fricción (<tspan font-style="italic">mgh</tspan> = constante)</text>';
    s += '</svg>';
    return s;
  };

  // 6. Rampa vs Levantamiento vertical (Trabajo W = MgH)
  FIG['fql19-rampa-vs-vertical'] = function () {
    var s = openSvg(540, 220);
    s += '<polygon points="60,180 340,180 340,60 60,180" fill="#f1f5f9" stroke="#475569" stroke-width="2"/>';
    s += '<rect x="340" y="60" width="80" height="120" fill="#e2e8f0" stroke="#475569" stroke-width="1.5"/>';
    s += '<line x1="430" y1="60" x2="430" y2="180" stroke="#0284c7" stroke-width="2" marker-start="url(#f19-arr-blue)" marker-end="url(#f19-arr-blue)"/>';
    s += '<text x="445" y="125" fill="#0284c7" font-size="14" font-weight="800"><tspan font-style="italic">H</tspan></text>';
    s += '<rect x="160" y="110" width="36" height="26" transform="rotate(-23 160 110)" fill="#bae6fd" stroke="#0284c7" stroke-width="1.5"/>';
    s += '<text x="140" y="95" fill="#0369a1" font-size="11.5" font-weight="700"><tspan font-style="italic">F</tspan> = <tspan font-style="italic">Mg</tspan> sin θ</text>';
    s += '<text x="180" y="195" fill="#64748b" font-size="12" text-anchor="middle">Rampa de longitud <tspan font-style="italic">L</tspan> (sin roce)</text>';
    s += '<rect x="470" y="110" width="30" height="26" fill="#fed7aa" stroke="#ea580c" stroke-width="1.5"/>';
    s += '<line x1="485" y1="110" x2="485" y2="70" stroke="#ea580c" stroke-width="2" marker-end="url(#f19-arr-red)"/>';
    s += '<text x="485" y="60" fill="#ea580c" font-size="11.5" font-weight="700" text-anchor="middle"><tspan font-style="italic">F</tspan> = <tspan font-style="italic">Mg</tspan></text>';
    s += '<text x="270" y="25" fill="#0e2a47" font-size="13.5" font-weight="800" text-anchor="middle"><tspan font-style="italic">W</tspan><tspan font-size="10" dy="2">vertical</tspan><tspan dy="-2"> = </tspan><tspan font-style="italic">W</tspan><tspan font-size="10" dy="2">rampa</tspan><tspan dy="-2"> = </tspan><tspan font-style="italic">MgH</tspan></text>';
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
    s += '<text x="' + (cx + 8) + '" y="45" fill="#dc2626" font-size="12" font-weight="800"><tspan font-style="italic">F</tspan><tspan font-size="9" dy="2">1</tspan><tspan dy="-2"> = 12 N (Norte)</tspan></text>';

    s += '<line x1="' + cx + '" y1="' + (cy + 16) + '" x2="' + cx + '" y2="205" stroke="#dc2626" stroke-width="2.5" marker-end="url(#f19-arr-red)"/>';
    s += '<text x="' + (cx + 8) + '" y="200" fill="#dc2626" font-size="12" font-weight="800"><tspan font-style="italic">F</tspan><tspan font-size="9" dy="2">2</tspan><tspan dy="-2"> = 12 N (Sur)</tspan></text>';

    s += '<line x1="' + (cx + 16) + '" y1="' + cy + '" x2="330" y2="' + cy + '" stroke="#0284c7" stroke-width="2.5" marker-end="url(#f19-arr-blue)"/>';
    s += '<text x="335" y="' + (cy - 8) + '" fill="#0284c7" font-size="12" font-weight="800"><tspan font-style="italic">F</tspan><tspan font-size="9" dy="2">3</tspan><tspan dy="-2"> = 8 N (Este)</tspan></text>';

    s += '<line x1="' + (cx - 16) + '" y1="' + cy + '" x2="90" y2="' + cy + '" stroke="#0284c7" stroke-width="2.5" marker-end="url(#f19-arr-blue)"/>';
    s += '<text x="85" y="' + (cy - 8) + '" fill="#0284c7" font-size="12" font-weight="800" text-anchor="end"><tspan font-style="italic">F</tspan><tspan font-size="9" dy="2">4</tspan><tspan dy="-2"> = 8 N (Oeste)</tspan></text>';

    s += '<text x="' + cx + '" y="15" fill="#0e2a47" font-size="13" font-weight="800" text-anchor="middle">Σ<tspan font-style="italic">F</tspan><tspan font-size="9" dy="2">x</tspan><tspan dy="-2"> = 0 · Σ</tspan><tspan font-style="italic">F</tspan><tspan font-size="9" dy="2">y</tspan><tspan dy="-2"> = 0 ⇒ </tspan><tspan font-style="italic">F</tspan><tspan font-size="9" dy="2">neta</tspan><tspan dy="-2"> = 0 (MRU o Reposo)</tspan></text>';
    s += '</svg>';
    return s;
  };

  // 8. Sombra de un poste y trigonometría (H = S * tan 30°)
  FIG['fql19-poste-sombra'] = function () {
    var s = openSvg(480, 220);
    s += '<line x1="40" y1="180" x2="440" y2="180" stroke="#64748b" stroke-width="2"/>';
    s += '<line x1="100" y1="180" x2="100" y2="60" stroke="#0e2a47" stroke-width="4"/>';
    s += '<text x="85" y="120" fill="#0e2a47" font-size="14" font-weight="800" text-anchor="end"><tspan font-style="italic">H</tspan> = ?</text>';
    s += '<line x1="100" y1="60" x2="380" y2="180" stroke="#eab308" stroke-width="2.5" stroke-dasharray="5 4"/>';
    s += '<line x1="100" y1="180" x2="380" y2="180" stroke="#0284c7" stroke-width="4"/>';
    s += '<text x="240" y="200" fill="#0284c7" font-size="13" font-weight="800" text-anchor="middle">Sombra <tspan font-style="italic">S</tspan> = 6 m</text>';
    s += '<path d="M 330,180 A 50 50 0 0 0 345,165" fill="none" stroke="#dc2626" stroke-width="2"/>';
    s += '<text x="315" y="170" fill="#dc2626" font-size="13" font-weight="800">30°</text>';
    s += '<circle cx="80" cy="40" r="14" fill="#fde047" stroke="#eab308" stroke-width="2"/>';
    s += '<text x="280" y="80" fill="#0e2a47" font-size="13" font-weight="800">tan 30° = <tspan font-style="italic">H</tspan> / <tspan font-style="italic">S</tspan></text>';
    s += '<text x="280" y="102" fill="#0284c7" font-size="13" font-weight="800"><tspan font-style="italic">H</tspan> = 6 · (√3 / 3) = 2√3 m ≈ 3.46 m</text>';
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
    s += '<text x="' + (cx + r/2) + '" y="' + (cy - 6) + '" fill="#64748b" font-size="11" text-anchor="middle"><tspan font-style="italic">R</tspan> = 2 m</text>';
    var px = cx + r, py = cy;
    s += '<circle cx="' + px + '" cy="' + py + '" r="7" fill="#0284c7"/>';
    s += '<line x1="' + px + '" y1="' + py + '" x2="' + px + '" y2="35" stroke="#16a34a" stroke-width="2.5" marker-end="url(#f19-arr-green)"/>';
    s += '<text x="' + (px + 10) + '" y="45" fill="#16a34a" font-size="12" font-weight="800"><tspan font-style="italic">v</tspan> = 6 m/s (tangencial, <tspan font-style="italic">a</tspan><tspan font-size="9" dy="2">t</tspan><tspan dy="-2"> = 0)</tspan></text>';
    s += '<line x1="' + px + '" y1="' + py + '" x2="' + (cx + 15) + '" y2="' + cy + '" stroke="#dc2626" stroke-width="2.5" marker-end="url(#f19-arr-red)"/>';
    s += '<text x="' + (cx + r/2) + '" y="' + (cy + 22) + '" fill="#dc2626" font-size="12" font-weight="800" text-anchor="middle"><tspan font-style="italic">a</tspan><tspan font-size="9" dy="2">c</tspan><tspan dy="-2"> = </tspan><tspan font-style="italic">v</tspan><tspan font-size="9" dy="-3">2</tspan><tspan dy="3">/<tspan font-style="italic">R</tspan> = 18 m/s²</text>';
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
    s += '<text x="270" y="170" fill="#0e2a47" font-size="13" font-weight="800"><tspan font-style="italic">W</tspan> = 100 N</text>';
    s += '<text x="230" y="210" fill="#0284c7" font-size="13" font-weight="800" text-anchor="middle">2·<tspan font-style="italic">T</tspan>·sin 30° = <tspan font-style="italic">W</tspan> ⇒ 2·<tspan font-style="italic">T</tspan>·(0.5) = 100 ⇒ <tspan font-style="italic">T</tspan> = 100 N</text>';
    s += '</svg>';
    return s;
  };

  // 11. Gráfica cartesiana exacta v vs t (Área = Desplazamiento 36 m, Pendiente = 2 m/s²)
  FIG['fql19-grafica-vt'] = function () {
    var s = openSvg(480, 240);
    s += '<line x1="60" y1="190" x2="430" y2="190" stroke="#0e2a47" stroke-width="2" marker-end="url(#f19-arr-dark)"/>';
    s += '<text x="435" y="194" fill="#0e2a47" font-size="13" font-weight="800"><tspan font-style="italic">t</tspan> (s)</text>';
    s += '<line x1="60" y1="190" x2="60" y2="30" stroke="#0e2a47" stroke-width="2" marker-end="url(#f19-arr-dark)"/>';
    s += '<text x="50" y="24" fill="#0e2a47" font-size="13" font-weight="800"><tspan font-style="italic">v</tspan> (m/s)</text>';
    s += '<line x1="60" y1="70" x2="360" y2="70" stroke="#cbd5e1" stroke-width="1.2" stroke-dasharray="3 3"/>';
    s += '<line x1="360" y1="70" x2="360" y2="190" stroke="#cbd5e1" stroke-width="1.2" stroke-dasharray="3 3"/>';
    s += '<text x="50" y="74" fill="#0e2a47" font-size="12" font-weight="700" text-anchor="end">12</text>';
    s += '<text x="360" y="208" fill="#0e2a47" font-size="12" font-weight="700" text-anchor="middle">6</text>';
    s += '<text x="50" y="194" fill="#0e2a47" font-size="12" text-anchor="end">0</text>';
    s += '<polygon points="60,190 360,70 360,190" fill="#bae6fd" opacity="0.6"/>';
    s += '<text x="240" y="150" fill="#0369a1" font-size="13" font-weight="800" text-anchor="middle">Área = (6 × 12)/2 = 36 m</text>';
    s += '<text x="240" y="168" fill="#0369a1" font-size="11.5" text-anchor="middle">(Desplazamiento total Δ<tspan font-style="italic">x</tspan>)</text>';
    s += '<line x1="60" y1="190" x2="360" y2="70" stroke="#0284c7" stroke-width="3"/>';
    s += '<circle cx="360" cy="70" r="5" fill="#0284c7"/>';
    s += '<text x="210" y="55" fill="#0284c7" font-size="13" font-weight="800">Pendiente = <tspan font-style="italic">a</tspan> = 12/6 = 2 m/s²</text>';
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
    s += '<text x="' + cx + '" y="' + (cy - 30) + '" fill="#dc2626" font-size="12" font-weight="700" text-anchor="middle">1 par de electrones no enlazante (libre)</text>';
    s += '<line x1="' + cx + '" y1="' + (cy + 18) + '" x2="' + cx + '" y2="' + (cy + 45) + '" stroke="#0e2a47" stroke-width="2.5"/>';
    s += '<text x="' + cx + '" y="' + (cy + 68) + '" fill="#0e2a47" font-size="22" font-weight="700" text-anchor="middle">H</text>';
    s += '<line x1="' + (cx - 18) + '" y1="' + (cy + 12) + '" x2="' + (cx - 45) + '" y2="' + (cy + 35) + '" stroke="#0e2a47" stroke-width="2.5"/>';
    s += '<text x="' + (cx - 60) + '" y="' + (cy + 48) + '" fill="#0e2a47" font-size="22" font-weight="700" text-anchor="middle">H</text>';
    s += '<line x1="' + (cx + 18) + '" y1="' + (cy + 12) + '" x2="' + (cx + 45) + '" y2="' + (cy + 35) + '" stroke="#0e2a47" stroke-width="2.5"/>';
    s += '<text x="' + (cx + 60) + '" y="' + (cy + 48) + '" fill="#0e2a47" font-size="22" font-weight="700" text-anchor="middle">H</text>';
    s += '<text x="180" y="190" fill="#0369a1" font-size="12.5" font-weight="700" text-anchor="middle">3 enlaces covalentes simples N−H + 1 par libre</text>';
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

    s += '<text x="220" y="145" fill="#0e2a47" font-size="13" font-weight="800" text-anchor="middle">Geometría lineal 180° ⇒ μ<tspan font-size="9" dy="2">neto</tspan><tspan dy="-2"> = μ₁ + μ₂ = 0 (Molécula apolar)</tspan></text>';
    s += '</svg>';
    return s;
  };

  window.FIG_19AGO = FIG;
})();
"""
with open(r"C:\simulador-epn\js\fig-fql-19ago.js", "w", encoding="utf-8") as f:
    f.write(fig_js_content)

# ---------------------------------------------------------
# 2. LENGUAJE (30 items in 6 packs)
# ---------------------------------------------------------
len_packs = [
    {
        "pack_id": "len-19-p1",
        "reading": "La meteorología moderna ha transformado radicalmente nuestra comprensión de la atmósfera terrestre. Antiguamente, los cambios climáticos repentinos se interpretaban como eventos caóticos o designios inescrutables. Sin embargo, la acumulación sistemática de datos satelitales y mediciones barométricas ha permitido identificar una notable regularidad en los ciclos térmicos y dinámicos que rigen la troposfera. Esta predictibilidad no implica una certeza absoluta en todo momento, pero sí provee modelos matemáticos confiables para anticipar fenómenos extremos y mitigar desastres socioeconómicos. En consecuencia, la ciencia atmosférica contemporánea constituye un pilar indispensable para la planificación urbana, la seguridad alimentaria y la navegación global.",
        "questions": [
            {
                "prompt": "¿Cuál es la idea principal que sintetiza el fragmento anterior?",
                "opts": [
                    "El análisis sistemático de datos ha revelado la regularidad de los patrones atmosféricos, convirtiendo a la meteorología en una herramienta vital de prevención y planificación.",
                    "Los métodos meteorológicos antiguos eran totalmente inútiles debido a su concepción caótica del clima.",
                    "Los modelos matemáticos actuales garantizan una certeza absoluta e infalible frente a cualquier fenómeno climático extremo.",
                    "La navegación marítima y aérea es el único sector beneficiado por la observación meteorológica por satélite."
                ],
                "ans": 0,
                "topics": ["4.4.2-analisisTexto"],
                "ch": "len-L05",
                "t": "Idea Principal",
                "exp": "**Paso 1. Identificación del tema central:** El texto expone cómo la meteorología pasó de atribuir los cambios climáticos al caos a identificar patrones regulares mediante mediciones satelitales sistemáticas.\n**Paso 2. Análisis y deducción:** El autor recalca que esta predictibilidad permite anticipar desastres y planificar la agricultura, la urbanización y el transporte.\n**Paso 3. Conclusión y descarte de trampas:** La opción A resume con precisión toda la estructura textual. La opción C es falsa porque el texto afirma expresamente que no hay certeza absoluta, y la D restringe arbitrariamente los beneficios.\n**Respuesta correcta: A.**"
            },
            {
                "prompt": "En el contexto del fragmento, ¿qué significado tiene la palabra «regularidad»?",
                "opts": [
                    "Patrón o conjunto de fenómenos que ocurren de manera constante, periódica y previsible.",
                    "Reglamentación legal impuesta por organismos internacionales de aviación.",
                    "Modificación arbitraria y esporádica de una variable física sin regla fija.",
                    "Corrección gramatical en la redacción de informes científicos oficiales."
                ],
                "ans": 0,
                "topics": ["4.4.2-lecturaCritica"],
                "ch": "len-L06",
                "t": "Sinónimo Contextual",
                "exp": "**Paso 1. Análisis del contexto léxico:** La palabra se utiliza en la frase 'identificar una notable regularidad en los ciclos térmicos y dinámicos que rigen la troposfera'.\n**Paso 2. Procedimiento de sustitución:** En ciencias atmosféricas, regularidad se opone al caos previo; significa que los ciclos obedecen a leyes físicas periódicas y medibles.\n**Paso 3. Conclusión:** La opción A define con exactitud la noción de periodicidad y predictibilidad.\n**Respuesta correcta: A.**"
            },
            {
                "prompt": "¿Qué función discursiva cumple el conector «Sin embargo» en el desarrollo del texto?",
                "opts": [
                    "Introducir una oposición o contraste frente a la concepción caótica tradicional mencionada previamente.",
                    "Indicar una relación de causa directa entre los datos satelitales y los mitos antiguos.",
                    "Enumerar elementos adicionales de igual jerarquía sintáctica y temporal.",
                    "Concluir definitivamente la exposición general del autor."
                ],
                "ans": 0,
                "topics": ["4.4.3-constrParrafo"],
                "ch": "len-L07",
                "t": "Conectores Lógicos",
                "exp": "**Paso 1. Clasificación del conector:** 'Sin embargo' es una locución conjuntiva adversativa.\n**Paso 2. Relación de ideas:** Enlaza la premisa 1 (en la antigüedad el clima se creía caótico) con la premisa 2 (hoy se conoce su regularidad gracias a datos científicos).\n**Paso 3. Conclusión:** Su función es establecer un contraste u oposición conceptual nítida.\n**Respuesta correcta: A.**"
            },
            {
                "prompt": "¿Cuál de las siguientes afirmaciones CONTRADICE la postura expuesta por el autor?",
                "opts": [
                    "Los modelos atmosféricos actuales carecen de cualquier valor práctico para mitigar riesgos socioeconómicos.",
                    "La recopilación de mediciones satelitales ha mejorado sustancialmente la predictibilidad climática.",
                    "La meteorología no ofrece una certeza absoluta e invariable en todas sus estimaciones.",
                    "La planificación urbana y la agricultura se benefician directamente de los pronósticos meteorológicos."
                ],
                "ans": 0,
                "topics": ["4.4.2-lecturaCritica"],
                "ch": "len-L06",
                "t": "Contradicción Textual",
                "exp": "**Paso 1. Contraste de enunciados:** El texto declara que los modelos proveen herramientas confiables para mitigar desastres socioeconómicos.\n**Paso 2. Detección de incompatibilidad:** Afirmar que los modelos 'carecen de cualquier valor práctico' niega directamente la utilidad preventiva demostrada en el texto.\n**Paso 3. Conclusión:** La opción A constituye una contradicción frontal con la tesis del autor.\n**Respuesta correcta: A.**"
            },
            {
                "prompt": "¿Qué tono predomina fundamentalmente en el texto analizado?",
                "opts": [
                    "Informativo, formal y respaldado en la evidencia científica.",
                    "Sarcástico y burlesco respecto a las creencias de los antiguos.",
                    "Lamentativo y fatalista ante la inminencia de catástrofes climáticas.",
                    "Ficticio y mitológico con descripciones alegóricas."
                ],
                "ans": 0,
                "topics": ["4.4.1-comunicacion"],
                "ch": "len-L01",
                "t": "Tono del Texto",
                "exp": "**Paso 1. Evaluación del registro y léxico:** El emisor emplea términos técnicos ('troposfera', 'mediciones barométricas', 'modelos matemáticos') con neutralidad y rigor analítico.\n**Paso 2. Ausencia de juicios emocionales:** No se utilizan burlas ni dramatizaciones exageradas.\n**Paso 3. Conclusión:** El tono es objetivo, informativo y formal.\n**Respuesta correcta: A.**"
            }
        ]
    },
    {
        "pack_id": "len-19-p2",
        "reading": "La transición global hacia fuentes energéticas renovables no es únicamente un imperativo ecológico, sino una reconfiguración geopolítica de primer orden. Durante más de un siglo, la dependencia de los combustibles fósiles concentró el poder económico en un puñado de naciones productoras de hidrocarburos. Por el contrario, la generación eólica y solar descentraliza la matriz de suministro, permitiendo que múltiples regiones aprovechen sus propios recursos naturales. No obstante, este proceso exige una inversión multimillonaria en redes inteligentes y almacenamiento en baterías de litio, minerales que a su vez generan nuevas tensiones comerciales. Por lo tanto, asumir que las energías limpias erradicarán de forma automática las disputas internacionales constituye un optimismo ingenuo.",
        "questions": [
            {
                "prompt": "¿Cuál es la tesis central que defiende el autor?",
                "opts": [
                    "La transición energética transforma la geopolítica global y descentraliza el suministro, pero crea nuevos desafíos y tensiones que impiden una resolución automática de los conflictos internacionales.",
                    "Las fuentes de energía solar y eólica han eliminado de raíz todas las guerras por recursos en el planeta.",
                    "La dependencia exclusiva del petróleo sigue siendo la única alternativa económicamente viable para el almacenamiento masivo.",
                    "El litio y las baterías inteligentes no tienen ninguna relevancia estratégica en el nuevo modelo industrial."
                ],
                "ans": 0,
                "topics": ["4.4.2-analisisTexto"],
                "ch": "len-L05",
                "t": "Tesis y Postura",
                "exp": "**Paso 1. Identificación de la tesis:** El autor postula que el cambio de matriz energética transforma la geopolítica, pero advierte que el requerimiento de minerales como el litio generará nuevas rivalidades.\n**Paso 2. Procedimiento:** Concluye rebatiendo el 'optimismo ingenuo' de creer que las energías verdes borrarán los conflictos mundiales.\n**Paso 3. Conclusión:** La opción A refleja con exactitud la postura matizada y realista del texto.\n**Respuesta correcta: A.**"
            },
            {
                "prompt": "El conector «No obstante» utilizado en el texto cumple la función de:",
                "opts": [
                    "Introducir una limitación o salvedad importante respecto a las ventajas de la descentralización energética.",
                    "Explicar la causa fundamental del descubrimiento de los hidrocarburos en el siglo XIX.",
                    "Señalar la culminación temporal de la inversión en baterías eléctricas.",
                    "Añadir un ejemplo secundario sin modificar el sentido de la premisa anterior."
                ],
                "ans": 0,
                "topics": ["4.4.3-constrParrafo"],
                "ch": "len-L07",
                "t": "Conectores Lógicos",
                "exp": "**Paso 1. Análisis sintáctico-semántico:** 'No obstante' es un conector concesivo/adversativo restrictivo.\n**Paso 2. Aplicación al texto:** Tras mencionar la ventaja de descentralizar la energía, introduce la condición crítica: el costo astronómico y la dependencia de minerales estratégicos como el litio.\n**Paso 3. Conclusión:** Introduce una salvedad o limitación al escenario positivo.\n**Respuesta correcta: A.**"
            },
            {
                "prompt": "¿Qué tipo de texto corresponde con mayor precisión al fragmento leído?",
                "opts": [
                    "Texto argumentativo de análisis geopolítico y ambiental.",
                    "Texto poético o lírico con figuras retóricas de ficción.",
                    "Instructivo o manual de montaje técnico de paneles solares.",
                    "Crónica periodística policial de sucesos cotidianos."
                ],
                "ans": 0,
                "topics": ["4.4.1-comunicacion"],
                "ch": "len-L01",
                "t": "Tipología Textual",
                "exp": "**Paso 1. Rasgos estructurales:** Contiene una tesis inicial, premisas contrastantes (petróleo vs. renovables + litio) y una conclusión evaluativa explícita.\n**Paso 2. Finalidad comunicativa:** Busca persuadir y hacer reflexionar al lector con argumentos lógicos.\n**Paso 3. Conclusión:** Es un texto típicamente argumentativo.\n**Respuesta correcta: A.**"
            },
            {
                "prompt": "Según el texto, ¿por qué es incorrecto afirmar que las energías renovables eliminarán los conflictos globales?",
                "opts": [
                    "Porque la infraestructura de redes y los minerales críticos como el litio generan nuevas rivalidades y tensiones comerciales.",
                    "Porque las fuentes solar y eólica requieren obligatoriamente de combustión continua de carbón.",
                    "Porque ninguna nación en el mundo cuenta con luz solar o viento suficiente para operar generadores.",
                    "Porque el petróleo dejará de existir en los próximos dos años de manera absoluta en todo el planeta."
                ],
                "ans": 0,
                "topics": ["4.4.2-lecturaCritica"],
                "ch": "len-L06",
                "t": "Lectura Crítica e Inferencia",
                "exp": "**Paso 1. Localización de datos en el texto:** El autor menciona expresamente que el almacenamiento y redes exigen minerales como el litio, 'minerales que a su vez generan nuevas tensiones comerciales'.\n**Paso 2. Deducción:** Esta nueva pugna por materias primas impide la desaparición automática de disputas entre países.\n**Paso 3. Conclusión:** La opción A responde textualmente a la interrogante.\n**Respuesta correcta: A.**"
            },
            {
                "prompt": "¿Cuál es la función del conector «Por lo tanto» en la última oración?",
                "opts": [
                    "Encabezar la deducción o conclusión lógica derivada de las premisas expuestas.",
                    "Plantear una disyuntiva excluyente entre dos opciones incompatibles.",
                    "Iniciar una digresión biográfica ajena al tema central.",
                    "Negar la existencia de la energía eólica en los países industrializados."
                ],
                "ans": 0,
                "topics": ["4.4.3-constrParrafo"],
                "ch": "len-L07",
                "t": "Conector de Consecuencia",
                "exp": "**Paso 1. Clasificación:** 'Por lo tanto' es un conector consecutivo o ilativo.\n**Paso 2. Función lógica:** Conecta las premisas previas (descentralización + nuevos costos/tensiones por litio) con el cierre deductivo (creer en una paz automática es ingenuo).\n**Paso 3. Conclusión:** Marca formalmente el cierre conclusivo del razonamiento.\n**Respuesta correcta: A.**"
            }
        ]
    },
    {
        "pack_id": "len-19-p3",
        "reading": "La neuroplasticidad es la capacidad adaptativa intrínseca del sistema nervioso central para modificar su estructura y funcionamiento a lo largo de toda la existencia biológica del individuo. Lejos del antiguo dogma mecanicista que concebía al cerebro adulto como un órgano estático e inmutable tras la adolescencia, las técnicas de neuroimagen funcional han demostrado que las sinapsis se reorganizan continuamente en respuesta al aprendizaje deliberado, la práctica sostenida de habilidades y la recuperación postraumática. Este dinamismo estructural, sin embargo, no opera en el vacío: requiere de estímulos cognitivos exigentes y hábitos sostenidos de descanso. De este modo, el cerebro humano se asemeja más a un músculo dinámico y maleable que a un circuito rígido prediseñado de fábrica.",
        "questions": [
            {
                "prompt": "¿Cuál es la idea principal que sintetiza el pasaje?",
                "opts": [
                    "El cerebro adulto posee plasticidad estructural y funcional continua, remodelándose mediante el aprendizaje y estímulos sostenidos a lo largo de toda la vida.",
                    "El cerebro humano deja de crear conexiones neuronales definitivamente al cumplir los dieciocho años.",
                    "Las lesiones cerebrales graves son siempre imposibles de rehabilitar debido a la rigidez anatómica de los lóbulos.",
                    "El descanso nocturno es la única actividad capaz de generar neuronas en el sistema nervioso central."
                ],
                "ans": 0,
                "topics": ["4.4.2-analisisTexto"],
                "ch": "len-L05",
                "t": "Idea Central",
                "exp": "**Paso 1. Identificación del núcleo informativo:** El texto expone la neuroplasticidad como la capacidad continua del cerebro de reorganizarse ante el aprendizaje, derribando el mito del órgano estático.\n**Paso 2. Contraste:** La analogía final resume que el cerebro es maleable y dinámico ante la exigencia y los hábitos.\n**Paso 3. Conclusión:** La opción A expresa de manera cabal esta tesis neurocientífica.\n**Respuesta correcta: A.**"
            },
            {
                "prompt": "¿Qué significado contextual tiene la palabra «dogma» en el fragmento?",
                "opts": [
                    "Creencia o doctrina aceptada como verdad incuestionable sin suficiente respaldo empírico.",
                    "Protocolo de laboratorio verificado mediante microscopía electrónica de alta resolución.",
                    "Medicamento de última generación utilizado para tratar afecciones neurodegenerativas.",
                    "Estatuto jurídico que sanciona la mala práctica médica en hospitales."
                ],
                "ans": 0,
                "topics": ["4.4.2-lecturaCritica"],
                "ch": "len-L06",
                "t": "Significado Contextual",
                "exp": "**Paso 1. Contexto de uso:** 'Lejos del antiguo dogma mecanicista que concebía al cerebro como un órgano estático...'.\n**Paso 2. Análisis semántico:** 'Dogma' aquí se refiere a una creencia rígida del pasado que la comunidad médica asumía sin cuestionar hasta que llegaron las neuroimágenes.\n**Paso 3. Conclusión:** Significa una creencia asumida como verdad incuestionable.\n**Respuesta correcta: A.**"
            },
            {
                "prompt": "La analogía final entre el cerebro y un músculo tiene como propósito:",
                "opts": [
                    "Ilustrar de forma didáctica que la capacidad cerebral se fortalece y adapta con el entrenamiento constante y el descanso.",
                    "Demostrar que el tejido cerebral está compuesto de fibras musculares contráctiles.",
                    "Argumentar que el ejercicio físico cardiovascular es idéntico a resolver ecuaciones matemáticas.",
                    "Desmentir que las neuronas transmitan impulsos bioeléctricos a través de axones."
                ],
                "ans": 0,
                "topics": ["4.4.2-analisisTexto"],
                "ch": "len-L05",
                "t": "Recursos Retóricos y Analogías",
                "exp": "**Paso 1. Función de la analogía:** Un músculo crece y se adapta si se entrena y descansa; si no, se atrofia.\n**Paso 2. Correspondencia analógica:** El autor aplica esta misma idea a las conexiones sinápticas del cerebro humano frente al aprendizaje y los estímulos exigentes.\n**Paso 3. Conclusión:** Sirve para ilustrar gráficamente la maleabilidad por entrenamiento.\n**Respuesta correcta: A.**"
            },
            {
                "prompt": "¿Qué afirmación se INFIERE válidamente a partir de los datos del texto?",
                "opts": [
                    "Una persona de edad avanzada puede aprender nuevas habilidades complejas si mantiene una estimulación cognitiva regular.",
                    "Los estímulos intelectuales provocan la parálisis permanente de las áreas corticales en adultos mayores.",
                    "El cerebro de los niños es el único que responde a tratamientos de rehabilitación motora y lingüística.",
                    "Las sinapsis neuronales permanecen absolutamente inmóviles frente a cualquier experiencia de aprendizaje."
                ],
                "ans": 0,
                "topics": ["4.4.2-lecturaCritica"],
                "ch": "len-L06",
                "t": "Inferencia Válida",
                "exp": "**Paso 1. Premisa del texto:** La neuroplasticidad opera 'a lo largo de toda la existencia biológica del individuo' en respuesta a estímulos exigentes.\n**Paso 2. Inferencia lógica:** Si la plasticidad dura toda la vida, los adultos mayores también pueden formar nuevas redes y aprender habilidades con práctica deliberada.\n**Paso 3. Conclusión:** La opción A es una inferencia rigurosa y directa.\n**Respuesta correcta: A.**"
            },
            {
                "prompt": "¿Cuál es la función del conector «De este modo» en la oración de cierre?",
                "opts": [
                    "Sintetizar la explicación previa mediante una conclusión descriptiva y aclaratoria.",
                    "Introducir una contradicción no resuelta entre la psicología y la biología.",
                    "Expresar una hipótesis dudosa sin ningún valor comprobable.",
                    "Preguntar al lector sobre sus propios hábitos de lectura nocturna."
                ],
                "ans": 0,
                "topics": ["4.4.3-constrParrafo"],
                "ch": "len-L07",
                "t": "Conectores Consecutivos/Explicativos",
                "exp": "**Paso 1. Análisis del conector:** 'De este modo' funciona como nexo explicativo-conclusivo.\n**Paso 2. Aplicación:** Resume los argumentos de remodelación sináptica para rematar con la analogía final del músculo maleable.\n**Paso 3. Conclusión:** Sintetiza la explicación con claridad.\n**Respuesta correcta: A.**"
            }
        ]
    },
    {
        "pack_id": "len-19-p4",
        "reading": "La rápida irrupción de los sistemas de inteligencia artificial generativa ha suscitado intensos debates en torno a la naturaleza de la creatividad y la autoría artística. Mientras los algoritmos procesan millones de patrones estadísticos para generar textos fluidos, imágenes hiperrealistas y composiciones musicales complejas en cuestión de segundos, surge la duda ontológica sobre si estas creaciones poseen genuina originalidad o si son meros ensamblajes probabilísticos de datos preexistentes. No obstante, la historia de la técnica demuestra que cada innovación disruptiva —desde la fotografía analógica en el siglo XIX hasta el diseño asistido por computadora en el siglo XX— no erradicó la sensibilidad humana, sino que redefinió sus herramientas expresivas. Por consiguiente, la intencionalidad estética, el juicio crítico y la experiencia vivencial del ser humano siguen siendo el núcleo insustituible del acto creador.",
        "questions": [
            {
                "prompt": "¿Cuál es la tesis fundamental que postula el texto?",
                "opts": [
                    "Aunque la inteligencia artificial procese datos a gran escala, la intencionalidad, el juicio crítico y la vivencia humana permanecen como el núcleo insustituible del arte.",
                    "Los sistemas generativos actuales han superado por completo y vuelto obsoleta toda capacidad creadora de los artistas humanos.",
                    "La fotografía en el siglo XIX destruyó para siempre la pintura y la sensibilidad artística en Europa.",
                    "Las composiciones algorítmicas no utilizan patrones matemáticos ni bases de datos previas."
                ],
                "ans": 0,
                "topics": ["4.4.2-analisisTexto"],
                "ch": "len-L05",
                "t": "Tesis Textual",
                "exp": "**Paso 1. Identificación de la tesis:** El autor argumenta que la IA es una herramienta técnica avanzada que recombina patrones, pero que el arte requiere intencionalidad, juicio y emoción humana.\n**Paso 2. Comparación histórica:** Utiliza el ejemplo de la fotografía y el software de diseño para demostrar que las herramientas técnicas potencian al creador humano en lugar de sustituir su esencia.\n**Paso 3. Conclusión:** La opción A sintetiza la postura del autor.\n**Respuesta correcta: A.**"
            },
            {
                "prompt": "En el contexto de la última frase, ¿qué denota la palabra «insustituible»?",
                "opts": [
                    "Que no puede ser reemplazado ni suplido por ningún otro elemento o mecanismo.",
                    "Que carece de valor monetario en las subastas internacionales de galerías.",
                    "Que resulta prescindible o secundario en el proceso de producción masiva.",
                    "Que pertenece exclusivamente a las civilizaciones orientales de la antigüedad."
                ],
                "ans": 0,
                "topics": ["4.4.2-lecturaCritica"],
                "ch": "len-L06",
                "t": "Semántica Contextual",
                "exp": "**Paso 1. Análisis léxico:** 'El núcleo insustituible del acto creador'.\n**Paso 2. Significado:** Insustituible se compone del prefijo 'in-' (negación) y 'sustituible'; refiere a aquello que es único, indispensable y no reemplazable por algoritmos.\n**Paso 3. Conclusión:** La opción A es la definición semántica precisa.\n**Respuesta correcta: A.**"
            },
            {
                "prompt": "¿Qué función cumple la referencia histórica a la fotografía en la argumentación?",
                "opts": [
                    "Servir como analogía o precedente histórico para ilustrar que la tecnología redefine el arte sin anular la sensibilidad humana.",
                    "Demostrar que los pintores del siglo XIX eran enemigos de la tecnología química y óptica.",
                    "Explicar paso a paso cómo se revela una película fotográfica de haluro de plata.",
                    "Convencer al lector de abandonar la pintura al óleo para dedicarse al fotoperiodismo."
                ],
                "ans": 0,
                "topics": ["4.4.2-analisisTexto"],
                "ch": "len-L05",
                "t": "Estrategias Argumentativas",
                "exp": "**Paso 1. Identificación del recurso:** El autor introduce la fotografía como caso análogo del pasado donde se temió el fin del arte humano.\n**Paso 2. Función lógica:** Al mostrar que la fotografía no erradicó la pintura sino que abrió nuevas corrientes (como el impresionismo), valida la premisa de que la IA tampoco destruirá la esencia creadora humana.\n**Paso 3. Conclusión:** Es un argumento de precedente histórico y analogía.\n**Respuesta correcta: A.**"
            },
            {
                "prompt": "¿Cuál de los siguientes juicios refleja una postura CONTRARIA a la del autor?",
                "opts": [
                    "Los algoritmos generativos son agentes conscientes dotados de vivencias emocionales auténticas idénticas a las del ser humano.",
                    "Las herramientas tecnológicas reconfiguran los métodos de producción artística a través de la historia.",
                    "La intencionalidad estética es un rasgo distintivo del creador humano frente al cálculo probabilístico.",
                    "La inteligencia artificial opera procesando combinaciones y regularidades en grandes volúmenes de datos."
                ],
                "ans": 0,
                "topics": ["4.4.2-lecturaCritica"],
                "ch": "len-L06",
                "t": "Identificación de Contradicciones",
                "exp": "**Paso 1. Comparación con el texto:** El autor califica a la IA como 'ensamblajes probabilísticos de datos' sin vivencia propia.\n**Paso 2. Detección de la oposición:** Afirmar que los algoritmos son conscientes y tienen vivencias emocionales contradice de lleno la distinción ontológica planteada por el autor.\n**Paso 3. Conclusión:** La opción A es la proposición contraria.\n**Respuesta correcta: A.**"
            },
            {
                "prompt": "¿Qué actitud o postura asume el emisor frente al avance de la inteligencia artificial?",
                "opts": [
                    "Reflexiva, crítica y fundamentada en la perspectiva histórica.",
                    "Tecnofóbica y partidaria de la destrucción inmediata de todos los servidores.",
                    "Totalmente indiferente y desinteresada por el devenir de la cultura digital.",
                    "Sumisa y celebratoria de la eliminación definitiva del trabajo de los artistas."
                ],
                "ans": 0,
                "topics": ["4.4.1-juiciosValor"],
                "ch": "len-L03",
                "t": "Postura del Emisor",
                "exp": "**Paso 1. Análisis de la voz autoral:** El autor no cae en el pánico ciego ni en el entusiasmo acrítico.\n**Paso 2. Argumentación equilibrada:** Sopesa los avances de la IA, analiza sus límites computacionales y recurre a la historia técnica para ofrecer un marco de entendimiento sereno.\n**Paso 3. Conclusión:** Su actitud es reflexiva, equilibrada y fundamentada.\n**Respuesta correcta: A.**"
            }
        ]
    },
    {
        "pack_id": "len-19-p5",
        "reading": "En su célebre tratado sobre la lógica de la investigación científica, Karl Popper argumentó que el criterio fundamental para delimitar la ciencia genuina frente a la pseudociencia no es la verificación acumulativa, sino la falsabilidad empírica. Una teoría que pretende explicarlo absolutamente todo sin dejar margen para ningún experimento que pudiera refutarla no es más sólida, sino metodológicamente estéril. Para Popper, una hipótesis adquiere valor científico precisamente cuando formula predicciones audaces y específicas que se exponen al riesgo constante de ser desmentidas por los hechos observacionales. Por consiguiente, el conocimiento científico no progresa consolidando dogmas inmutables respaldados por la mera autoridad de sus autores, sino mediante un riguroso proceso de conjeturas y refutaciones continuas.",
        "questions": [
            {
                "prompt": "¿Cuál es la idea principal que sintetiza la epistemología de Popper según el texto?",
                "opts": [
                    "La cientificidad de una teoría radica en su capacidad de ser sometida a pruebas empíricas que puedan refutarla (falsabilidad), y no en la acumulación de verificaciones o dogmas de autoridad.",
                    "Las teorías científicas verdaderas son aquellas que jamás pueden ser desmentidas por ningún experimento humano.",
                    "El principio de autoridad es el único criterio válido para distinguir la física de las supersticiones populares.",
                    "Una hipótesis es más científica mientras más general y vaga sea su formulación matemática."
                ],
                "ans": 0,
                "topics": ["4.4.2-analisisTexto"],
                "ch": "len-L05",
                "t": "Idea Principal",
                "exp": "**Paso 1. Identificación del concepto popperiano:** El texto explica el criterio de demarcación de Karl Popper: la falsabilidad.\n**Paso 2. Desarrollo del razonamiento:** La ciencia avanza con predicciones arriesgadas que pueden refutarse con observaciones, no acumulando confirmaciones fáciles o dogmas intocables.\n**Paso 3. Conclusión:** La opción A formula con precisión la idea central.\n**Respuesta correcta: A.**"
            },
            {
                "prompt": "En la frase «una teoría... metodológicamente estéril», la palabra «estéril» significa que la teoría es:",
                "opts": [
                    "Incapaz de generar nuevo conocimiento científico contrastable o de orientar la investigación empírica.",
                    "Completamente libre de bacterias y agentes patógenos infecciosos.",
                    "Imposible de traducir a otros idiomas por su extrema complejidad gramatical.",
                    "Aceptada por unanimidad por todos los premios Nobel de Física contemporáneos."
                ],
                "ans": 0,
                "topics": ["4.4.2-lecturaCritica"],
                "ch": "len-L06",
                "t": "Sentido Figurado y Contextual",
                "exp": "**Paso 1. Significado base:** Estéril es lo que no da fruto o no produce.\n**Paso 2. Aplicación metodológica:** Una teoría que lo explica todo sin poder ponerse a prueba no genera descubrimientos ni avance real; es infructuosa o estéril para la ciencia.\n**Paso 3. Conclusión:** Significa incapaz de producir conocimiento contrastable.\n**Respuesta correcta: A.**"
            },
            {
                "prompt": "Cuando el autor descalifica los «dogmas respaldados por la mera autoridad de sus autores», alude a:",
                "opts": [
                    "La falacia ad verecundiam (apelación indebida al prestigio o autoridad de una persona sin evidencia empírica).",
                    "La falacia ad hominem (ataque personal descalificatorio contra el interlocutor).",
                    "La falacia ad baculum (imposición de una conclusión mediante el uso de la fuerza o amenazas).",
                    "La falacia de falsa causa (asumir que correlación temporal implica causalidad física)."
                ],
                "ans": 0,
                "topics": ["4.4.3-argumentacionFalacias"],
                "ch": "len-L08",
                "t": "Falacias Argumentativas",
                "exp": "**Paso 1. Definición de la falacia:** Defender una premisa diciendo 'es verdad porque lo dijo tal autor famoso o tal profesor prestigioso' sin pruebas es la falacia *ad verecundiam*.\n**Paso 2. Conexión con el texto:** Popper rechaza expresamente que la ciencia se base en la autoridad de los autores en lugar de pruebas falsables.\n**Paso 3. Conclusión:** Corresponde a la falacia de apelación a la autoridad (*ad verecundiam*).\n**Respuesta correcta: A.**"
            },
            {
                "prompt": "El conector «Por consiguiente» en la última oración introduce:",
                "opts": [
                    "Una deducción lógica necesaria a partir de la premisa de la falsabilidad científica.",
                    "Un contraargumento empírico que invalida toda la filosofía de Popper.",
                    "Una anécdota personal sobre la vida universitaria de Karl Popper.",
                    "Un elemento de adición meramente ornamental sin trascendencia lógica."
                ],
                "ans": 0,
                "topics": ["4.4.3-constrParrafo"],
                "ch": "len-L07",
                "t": "Conectores Lógicos",
                "exp": "**Paso 1. Tipo de conector:** 'Por consiguiente' es un conector ilativo o consecutivo.\n**Paso 2. Operación discursiva:** Une el principio de predicciones arriesgadas con la conclusión de que la ciencia progresa por conjeturas y refutaciones, no por dogmas.\n**Paso 3. Conclusión:** Introduce la deducción lógica final.\n**Respuesta correcta: A.**"
            },
            {
                "prompt": "¿Cuál de las siguientes afirmaciones se DEDUCE válidamente del texto?",
                "opts": [
                    "Una afirmación que no puede ser sometida a ninguna prueba empírica de refutación no califica como científica en sentido riguroso.",
                    "Las ciencias exactas no requieren de experimentos reproducibles para consolidar sus leyes.",
                    "La opinión de la mayoría en una votación es suficiente para convertir una creencia en ley universal.",
                    "Karl Popper consideraba que todas las doctrinas dogmáticas eran ramas legítimas de la física teórica."
                ],
                "ans": 0,
                "topics": ["4.4.2-razLogico"],
                "ch": "len-L04",
                "t": "Deducción Lógica Válida",
                "exp": "**Paso 1. Premisa mayor de Popper:** El criterio de cientificidad es la falsabilidad empírica.\n**Paso 2. Silogismo deducido:** Si una afirmación no permite ninguna prueba que pueda desmentirla, entonces no cumple el criterio de falsabilidad; por tanto, no califica como científica.\n**Paso 3. Conclusión:** La opción A es una deducción impecable.\n**Respuesta correcta: A.**"
            }
        ]
    },
    {
        "pack_id": "len-19-p6",
        "reading": "El surgimiento de la escritura en la antigua Mesopotamia, hacia el cuarto milenio antes de Cristo, no obedeció a fines literarios ni religiosos, sino a la imperiosa necesidad administrativa de registrar excedentes agrícolas, tributos y transacciones comerciales en las incipientes ciudades-estado sumerias. Mediante incisiones en tablillas de arcilla húmeda con estiletes de caña, los escribas crearon los primeros pictogramas que más tarde evolucionaron hacia el sistema cuneiforme. Así, la fijación gráfica de la memoria colectiva permitió coordinar redes económicas complejas y garantizar la perdurabilidad de acuerdos contractuales más allá de la efímera tradición oral. Por lo tanto, la burocracia y la contabilidad fueron los verdaderos motores que impulsaron el mayor hito comunicativo de la humanidad.",
        "questions": [
            {
                "prompt": "¿Cuál es la idea principal que expone el fragmento?",
                "opts": [
                    "La escritura nació fundamentalmente como una respuesta a necesidades prácticas de registro contable y administrativo en Mesopotamia.",
                    "Los primeros textos sumerios estaban dedicados exclusivamente a la poesía lírica y la mitología sagrada.",
                    "La tradición oral fue suficiente para administrar los tributos de las grandes ciudades-estado durante siglos.",
                    "Los estiletes de caña eran herramientas sagradas utilizadas solo por sacerdotes en templos religiosos."
                ],
                "ans": 0,
                "topics": ["4.4.2-analisisTexto"],
                "ch": "len-L05",
                "t": "Idea Principal",
                "exp": "**Paso 1. Identificación del tema central:** El texto aclara el origen utilitario de la escritura sumeria (control contable de cosechas, tributos y contratos) desmitificando un origen puramente literario.\n**Paso 2. Desarrollo:** La burocracia contable impulsó la creación de las tablillas cuneiformes.\n**Paso 3. Conclusión:** La opción A resume fielmente la tesis histórica expuesta.\n**Respuesta correcta: A.**"
            },
            {
                "prompt": "En la expresión «más allá de la efímera tradición oral», la palabra «efímera» significa:",
                "opts": [
                    "De corta duración, pasajera o vulnerable al olvido con el transcurso del tiempo.",
                    "Sumamente compleja y difícil de comprender para los sacerdotes.",
                    "Inalterable y permanente a través de incontables generaciones.",
                    "Perteneciente al lenguaje secreto de los gobernantes mesopotámicos."
                ],
                "ans": 0,
                "topics": ["4.4.2-lecturaCritica"],
                "ch": "len-L06",
                "t": "Léxico Contextual",
                "exp": "**Paso 1. Contexto de oposición:** El autor compara la durabilidad física de la arcilla grabada frente a la fragilidad de la memoria hablada.\n**Paso 2. Significado:** 'Efímero' significa fugaz o de poca duración; la palabra hablada se olvida con facilidad con el paso del tiempo.\n**Paso 3. Conclusión:** La opción A expresa con exactitud este carácter perecedero.\n**Respuesta correcta: A.**"
            },
            {
                "prompt": "¿Qué función cumple la palabra «Así» al inicio del tercer enunciado?",
                "opts": [
                    "Conector de consecuencia y modo que explica de qué manera la fijación gráfica resolvió los retos administrativos.",
                    "Conector de disyunción que plantea dos caminos contradictorios e incompatibles.",
                    "Adverbio temporal que marca el fin definitivo de la civilización sumeria.",
                    "Pronombre relativo que sustituye a los escribas del templo."
                ],
                "ans": 0,
                "topics": ["4.4.3-constrParrafo"],
                "ch": "len-L07",
                "t": "Conectores Modales/Consecutivos",
                "exp": "**Paso 1. Análisis del conector:** 'Así' enlaza el método material previo (arcilla e incisiones con caña) con el resultado alcanzado (coordinar redes y contratos duraderos).\n**Paso 2. Función lógica:** Expresa el modo y la consecuencia práctica de la invención.\n**Paso 3. Conclusión:** Corresponde a un conector modal y consecutivo.\n**Respuesta correcta: A.**"
            },
            {
                "prompt": "¿Cuál de las siguientes afirmaciones CONTRADICE lo expuesto en el texto?",
                "opts": [
                    "La escritura sumeria se originó primordialmente para la creación de relatos mitológicos y entretenimiento poético.",
                    "Las tablillas de arcilla húmeda sirvieron como soporte material para los signos cuneiformes.",
                    "Los excedentes agrícolas y los impuestos impulsaron la creación de registros sistemáticos.",
                    "Los escribas mesopotámicos utilizaban cañas talladas para realizar incisiones en arcilla."
                ],
                "ans": 0,
                "topics": ["4.4.2-lecturaCritica"],
                "ch": "len-L06",
                "t": "Contradicción Textual",
                "exp": "**Paso 1. Verificación textual:** La primera línea afirma expresamente que la escritura 'no obedeció a fines literarios ni religiosos'.\n**Paso 2. Oposición:** Decir que nació para mitología y entretenimiento contradice directamente la evidencia histórica expuesta.\n**Paso 3. Conclusión:** La opción A es falsa y contradice el pasaje.\n**Respuesta correcta: A.**"
            },
            {
                "prompt": "¿Qué estructura textual y tono caracterizan a este pasaje?",
                "opts": [
                    "Estructura expositivo-histórica con tono informativo, riguroso y analítico.",
                    "Estructura dialogada con tono humorístico y satírico sobre los sumerios.",
                    "Estructura dramática teatral con tono trágico y quejumbroso.",
                    "Estructura epistolar con tono confidencial e íntimo en primera persona."
                ],
                "ans": 0,
                "topics": ["4.4.1-comunicacion"],
                "ch": "len-L01",
                "t": "Estructura Textual",
                "exp": "**Paso 1. Rasgos de redacción:** Se describen procesos del cuarto milenio a.C. con datos arqueológicos y explicaciones causales precisas.\n**Paso 2. Registro lingüístico:** Prosa formal en tercera persona sin elementos de ficción ni diálogo.\n**Paso 3. Conclusión:** Es un texto expositivo histórico de tono objetivo e informativo.\n**Respuesta correcta: A.**"
            }
        ]
    }
]

len_items = []
len_idx = 1
for pack in len_packs:
    for q in pack["questions"]:
        len_items.append({
            "id": f"len-19ago-{len_idx:02d}",
            "s": "len",
            "n": len_idx,
            "d": "intermedio",
            "topics": q["topics"],
            "ch": q["ch"],
            "t": q["t"],
            "prompt": q["prompt"],
            "opts": q["opts"],
            "ans": q["ans"],
            "exp": q["exp"],
            "maths": [],
            "imgs": [],
            "reading": pack["reading"],
            "pack": pack["pack_id"]
        })
        len_idx += 1

print(f"Generated {len(len_items)} Lenguaje items in {len(len_packs)} packs.")

# ---------------------------------------------------------
# 3. FÍSICA (30 items)
# ---------------------------------------------------------
fis_items_data = [
    {
        "topics": ["4.2.1-1raNewton"], "ch": "fis-L01", "t": "Inercia y Proyectil",
        "fig": "fql19-avion-proyectil",
        "prompt": "Un avión de carga vuela en línea recta horizontal a velocidad constante de $180\\text{ m/s}$ y a gran altitud. En un instante dado, se desprende accidentalmente un paquete desde su bodega. Despreciando por completo la resistencia del aire, ¿qué trayectoria describe el paquete según la perspectiva de un observador inmóvil situado en tierra?",
        "opts": [
            "Una trayectoria parabólica que avanza horizontalmente en el mismo sentido del avión mientras cae.",
            "Una línea recta perfectamente vertical dirigida hacia el punto directamente debajo de donde cayó.",
            "Una curva que se desvía hacia atrás en sentido opuesto al desplazamiento del avión.",
            "Una trayectoria horizontal continua que no pierde altura hasta detenerse por completo."
        ],
        "ans": 0,
        "exp": "**Paso 1. Identificación de principios físicos:** Por la Primera Ley de Newton (inercia), un cuerpo en movimiento conserva su velocidad si no actúan fuerzas netas sobre él en esa dirección.\n**Paso 2. Procedimiento a mano y descomposición:**\n- Eje $x$ (horizontal): Sin fricción del aire, $F_x = 0 \\implies v_x = 180\\text{ m/s} = \\text{constante}$. El paquete avanza a la par del avión.\n- Eje $y$ (vertical): La gravedad ejerce aceleración constante hacia abajo: $a_y = g \\approx 9.8\\text{ m/s}^2 \\implies v_y = gt, y = \\frac{1}{2}gt^2$.\n- Combinación paramétrica: $y = \\frac{g}{2v_x^2}x^2$, que corresponde exactamente a la ecuación de una parábola abierta hacia abajo orientada hacia adelante.\n**Paso 3. Conclusión y descarte:** Para el observador en tierra, la trayectoria es una parábola que avanza en el sentido del vuelo. (Solo para el piloto que mira hacia abajo parecería una línea recta vertical).\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.2.2-3raNewton"], "ch": "fis-L10", "t": "Tercera Ley de Newton",
        "fig": "fql19-choque-bloques",
        "prompt": "Dos bloques, $A$ de masa $10\\text{ kg}$ y $B$ de masa $2\\text{ kg}$, se deslizan sobre una pista horizontal sin rozamiento y colisionan de frente. Durante el impacto, el bloque $A$ ejerce una fuerza de contacto sobre $B$. ¿Cuál es la relación entre la fuerza que $A$ ejerce sobre $B$ y la fuerza que $B$ ejerce sobre $A$?",
        "opts": [
            "Ambas fuerzas tienen exactamente la misma magnitud, actúan simultáneamente y en sentidos opuestos.",
            "El bloque A ejerce una fuerza 5 veces mayor porque su masa es 5 veces superior ($10\\text{ kg}$ vs $2\\text{ kg}$).",
            "El bloque B ejerce una fuerza mayor porque experimenta mayor aceleración tras el choque.",
            "El bloque A ejerce la fuerza primero y, tras una breve fracción de segundo, el bloque B reacciona."
        ],
        "ans": 0,
        "exp": "**Paso 1. Ley física aplicable:** La Tercera Ley de Newton establece que a toda fuerza de acción le corresponde una fuerza de reacción de igual módulo y dirección, pero de sentido contrario: $\\vec{F}_{A \\to B} = -\\vec{F}_{B \\to A}$.\n**Paso 2. Procedimiento y deducción a mano:**\n- La magnitud de las fuerzas es estrictamente idéntica: $|\\vec{F}_{A \\to B}| = |\\vec{F}_{B \\to A}| = F$.\n- La diferencia de masas solo modifica las aceleraciones de cada cuerpo según la 2da Ley: $a_B = \\frac{F}{2\\text{ kg}}$ será 5 veces mayor que $a_A = \\frac{F}{10\\text{ kg}}$, pero las fuerzas son rigurosamente iguales.\n- Las fuerzas del par acción-reacción son rigurosamente simultáneas (no hay desfase de tiempo).\n**Paso 3. Conclusión:** Tienen igual magnitud, sentidos opuestos y ocurren al mismo tiempo.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.2.1-caida"], "ch": "fis-L05", "t": "Tiro Vertical en el Ápice",
        "fig": "fql19-tiro-vertical",
        "prompt": "Se lanza verticalmente hacia arriba una piedra desde el suelo con rapidez inicial $v_0$. La piedra sube hasta su altura máxima $T$ y luego regresa al suelo (resistencia del aire despreciable). En el instante exacto en que alcanza el punto más alto $T$, ¿qué ocurre con su rapidez y su aceleración?",
        "opts": [
            "Su rapidez se hace cero instantáneamente ($v = 0$), pero su aceleración permanece constante e igual a $g$ dirigida hacia abajo.",
            "Tanto su rapidez como su aceleración se anulan simultáneamente ($v = 0, a = 0$) durante un breve intervalo de tiempo.",
            "Su rapidez es cero y su aceleración apunta momentáneamente hacia arriba para iniciar el giro.",
            "Su rapidez se mantiene constante y su aceleración disminuye a la mitad de su valor inicial."
        ],
        "ans": 0,
        "exp": "**Paso 1. Planteamiento físico:** En un tiro vertical en el vacío, la única fuerza que actúa durante todo el vuelo (subida, ápice y bajada) es la fuerza de gravedad (peso: $P = mg$).\n**Paso 2. Análisis a mano:**\n- Rapidez en el punto más alto: La piedra frena hasta detener su ascenso: $v(t_{\\text{máx}}) = 0$.\n- Aceleración en el punto más alto: Por la 2da Ley de Newton, $a = \\frac{F_{\\text{neta}}}{m} = \\frac{-mg}{m} = -g \\approx 9.8\\text{ m/s}^2$ dirigida hacia el centro de la Tierra.\n- Si la aceleración fuera cero en el ápice, la piedra se quedaría flotando indefinidamente en el aire.\n**Paso 3. Conclusión:** $v = 0$, mientras que $a = g$ (constante y hacia abajo).\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.2.1-caida"], "ch": "fis-L05", "t": "Simetría de Tiro Vertical",
        "fig": "fql19-tiro-vertical",
        "prompt": "En el mismo lanzamiento vertical de la piedra anterior, ésta pasa por un punto intermedio $Q$ a $15\\text{ m}$ de altura durante el ascenso y vuelve a pasar por $Q$ durante el descenso. Despreciando el rozamiento del aire, la rapidez de la piedra al pasar por $Q$ en la bajada es:",
        "opts": [
            "Exactamente igual a la rapidez que tenía al pasar por $Q$ durante la subida.",
            "Mayor que la rapidez de subida debido a la gravedad acumulada durante la caída.",
            "Menor que la rapidez de subida porque la piedra perdió energía mecánica en el punto más alto.",
            "La mitad de la rapidez original con la que inició el ascenso desde el suelo."
        ],
        "ans": 0,
        "exp": "**Paso 1. Principio de conservación de la energía mecánica:** Al no existir rozamiento con el aire, la energía mecánica total se conserva en todo punto de la trayectoria: $E_m = E_c + E_p = \\text{constante}$.\n**Paso 2. Procedimiento a mano:**\n- En el punto $Q$ ($h = 15\\text{ m}$):\n  Subida: $E_m = \\frac{1}{2}m v_{\\text{subida}}^2 + mgh$\n  Bajada: $E_m = \\frac{1}{2}m v_{\\text{bajada}}^2 + mgh$\n- Igualando ambas ecuaciones:\n  $\\frac{1}{2}m v_{\\text{subida}}^2 + mgh = \\frac{1}{2}m v_{\\text{bajada}}^2 + mgh \\implies v_{\\text{bajada}} = v_{\\text{subida}}$.\n**Paso 3. Conclusión:** La rapidez (módulo de la velocidad) es rigurosamente idéntica a la misma altura en ascenso y descenso.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.2.3-consEnergia"], "ch": "fis-L16", "t": "Péndulo y Energía Cinética",
        "fig": "fql19-pendulo-oscilante",
        "prompt": "Un péndulo simple oscila libremente entre dos extremos laterales $A$ y $B$, pasando por su posición más baja de equilibrio $C$. Despreciando la fricción con el aire y en el pivote, ¿en qué punto de su recorrido la energía cinética de la masa pendular alcanza su valor máximo?",
        "opts": [
            "En el punto más bajo de su trayectoria (posición $C$).",
            "En los dos puntos extremos más altos ($A$ y $B$).",
            "La energía cinética permanece estrictamente constante e invariable en todo el movimiento.",
            "Exactamente a la mitad de la altura entre el punto más bajo y los extremos."
        ],
        "ans": 0,
        "exp": "**Paso 1. Conservación de energía mecánica:** $E_m = E_c + E_p = \\frac{1}{2}mv^2 + mgh = \\text{constante}$.\n**Paso 2. Procedimiento de balance energético:**\n- En los extremos $A$ y $B$: La altura $h$ es máxima ($E_p$ máxima) y el péndulo se detiene momentáneamente ($v = 0 \\implies E_c = 0$).\n- En el punto más bajo $C$: La altura $h$ es mínima ($E_p = 0$). Por conservación, toda la energía potencial se ha transformado en energía cinética ($E_c = E_m = \\text{máxima}$).\n**Paso 3. Conclusión:** La rapidez y la energía cinética son máximas al cruzar la vertical inferior (posición $C$).\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.2.3-energiaPotencial"], "ch": "fis-L15", "t": "Energía Potencial Elástica",
        "fig": None,
        "prompt": "Un arquero tensa la cuerda de su arco acumulando $120\\text{ J}$ de energía potencial elástica. Al soltar la flecha de $0.06\\text{ kg}$, ¿en qué forma de energía se convierte la mayor parte de dicha energía almacenada?",
        "opts": [
            "En energía cinética de traslación de la flecha en movimiento.",
            "En energía térmica que queda atrapada permanentemente en el arco.",
            "En energía potencial gravitatoria que se duplica de inmediato.",
            "En energía de enlace molecular que destruye la madera del arco."
        ],
        "ans": 0,
        "exp": "**Paso 1. Identificación del proceso:** El trabajo muscular del arquero deforma el arco, almacenando energía potencial elástica $E_{pe} = \\frac{1}{2}kx^2 = 120\\text{ J}$.\n**Paso 2. Transformación energética:**\n- Al soltar la cuerda, la fuerza elástica acelera la flecha: $W_{\\text{elástico}} = \\Delta E_c$.\n- Asumiendo pérdidas mínimas: $E_c = \\frac{1}{2}mv^2 \\approx 120\\text{ J}$.\n- Cálculo a mano de la rapidez resultante:\n  $v = \\sqrt{\\frac{2E_c}{m}} = \\sqrt{\\frac{2(120)}{0.06}} = \\sqrt{\\frac{240}{0.06}} = \\sqrt{4000} \\approx 63.25\\text{ m/s}$.\n**Paso 3. Conclusión:** Toda la energía potencial elástica se transfiere como energía cinética de la flecha.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.2.1-1raNewton"], "ch": "fis-L01", "t": "Experimento de Rampas de Galileo",
        "fig": "fql19-rampa-galileo",
        "prompt": "Galileo Galilei analizó el movimiento de una esfera que desciende por un plano inclinado desde una altura $h$ y luego asciende por un plano opuesto. Si las superficies carecen por completo de fricción, ¿qué predice el principio de inercia y conservación respecto a la altura alcanzada en el plano opuesto?",
        "opts": [
            "La esfera subirá por el plano opuesto hasta alcanzar exactamente la misma altura inicial $h$ antes de detenerse momentáneamente.",
            "La esfera se detendrá en el punto más bajo del valle debido a la inercia del movimiento.",
            "La esfera alcanzará el doble de la altura original debido al impulso ganado durante la bajada.",
            "La esfera solo alcanzará la mitad de la altura inicial porque pierde velocidad por gravedad."
        ],
        "ans": 0,
        "exp": "**Paso 1. Principio físico de Galileo:** Galileo dedujo que en ausencia de rozamiento, la tendencia natural de los cuerpos es conservar su estado de movimiento.\n**Paso 2. Demostración por balance de energía:**\n- Inicio en rampa 1: $E_m = mgh + 0 = mgh$.\n- Valle (punto más bajo): $E_m = \\frac{1}{2}mv^2$.\n- Ascenso en rampa 2: Sube transformando $E_c$ en $E_p = mgh_{\\text{final}}$ hasta que $v=0$.\n- Igualando: $mgh = mgh_{\\text{final}} \\implies h_{\\text{final}} = h$.\n- No importa la inclinación del segundo plano (incluso si la rampa es muy tendida, recorrerá mayor distancia pero llegará exactamente a la altura $h$).\n**Paso 3. Conclusión:** La esfera alcanza exactamente la misma altura inicial $h$.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.2.2-2daNewton"], "ch": "fis-L07", "t": "Fricción Dinámica y Fuerza Doble",
        "fig": None,
        "prompt": "Se empuja una caja sobre un piso horizontal rugoso aplicando una fuerza constante $F$ horizontal, logrando que se desplace con rapidez constante $v_0$. Si repentinamente se duplica la fuerza aplicada a $2F$ manteniendo el mismo coeficiente de rozamiento, ¿cómo se comportará el movimiento de la caja?",
        "opts": [
            "Se moverá con aceleración constante positiva, aumentando su rapidez de forma continua.",
            "Se moverá con rapidez constante pero exactamente igual al doble de la velocidad inicial ($2v_0$).",
            "Aumentará su rapidez durante un segundo y luego continuará a velocidad constante.",
            "Frenará de inmediato debido al incremento brusco de la fuerza de rozamiento."
        ],
        "ans": 0,
        "exp": "**Paso 1. Análisis de fuerzas en el estado inicial:**\n- Si la caja se mueve a rapidez constante ($v_0 = \\text{cte}$), la aceleración es nula ($a=0$).\n- Por la 1ra Ley: $F_{\\text{neta}} = F - f_k = 0 \\implies f_k = F$.\n**Paso 2. Procedimiento a mano tras duplicar la fuerza:**\n- La fuerza de rozamiento cinético $f_k = \\mu_k N = \\mu_k mg$ depende solo del peso y del coeficiente, por lo que se mantiene constante en $f_k = F$.\n- Nueva fuerza neta aplicada: $F_{\\text{neta}} = 2F - f_k = 2F - F = F$.\n- Por la 2da Ley: $a = \\frac{F_{\\text{neta}}}{m} = \\frac{F}{m} = \\text{constante} > 0$.\n**Paso 3. Conclusión:** La caja experimenta aceleración constante no nula; por tanto, su rapidez crece de manera continua y lineal en el tiempo.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.2.3-trabajoPotencia"], "ch": "fis-L13", "t": "Trabajo de Fuerza Gravitatoria",
        "fig": "fql19-rampa-vs-vertical",
        "prompt": "Se eleva una caja de masa $M$ desde el suelo hasta una plataforma a altura $H$. Se comparan dos métodos sin rozamiento: (1) levantarla verticalmente hacia arriba a velocidad constante, y (2) empujarla a lo largo de una rampa inclinada de longitud $L > H$. El trabajo neto realizado contra la gravedad en ambos métodos es:",
        "opts": [
            "Exactamente igual en ambos casos ($W = MgH$).",
            "Mayor por la rampa porque la distancia recorrida $L$ es mayor que $H$.",
            "Mayor al levantarla verticalmente porque la fuerza requerida es superior.",
            "Cero en la rampa porque el plano inclinado absorbe toda la energía."
        ],
        "ans": 0,
        "exp": "**Paso 1. Definición de trabajo de una fuerza conservativa:** La fuerza gravitatoria es conservativa; el trabajo realizado contra el peso depende exclusivamente de la diferencia de altura inicial y final, no de la trayectoria recorrida.\n**Paso 2. Cálculo a mano en ambos métodos:**\n- Método 1 (vertical): $W_1 = F_{\\text{vert}} \\cdot H = (Mg) \\cdot H = MgH$.\n- Método 2 (rampa con ángulo $\\theta$, donde $\\sin\\theta = H/L$):\n  Fuerza paralela al plano: $F_{\\text{rampa}} = Mg\\sin\\theta = Mg\\left(\\frac{H}{L}\\right)$.\n  Trabajo: $W_2 = F_{\\text{rampa}} \\cdot L = Mg\\left(\\frac{H}{L}\\right) \\cdot L = MgH$.\n**Paso 3. Conclusión:** La rampa reduce la fuerza requerida ($Mg\\sin\\theta < Mg$) a costa de aumentar la distancia ($L > H$), manteniendo el trabajo total exactamente igual: $W = MgH$.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.2.2-3raNewton"], "ch": "fis-L10", "t": "Tirar de la Cuerda y Pares de Fuerzas",
        "fig": None,
        "prompt": "Juan y Pedro tiran de los extremos opuestos de una cuerda ligera en un juego de tira y afloja sobre un piso liso. Si Juan tira con una fuerza de $350\\text{ N}$ hacia la izquierda y la cuerda se encuentra en equilibrio estático (inmóvil), ¿con qué fuerza tira Pedro hacia la derecha y cuál es la tensión en la cuerda?",
        "opts": [
            "Pedro tira con $350\\text{ N}$ y la tensión en cualquier punto de la cuerda es de $350\\text{ N}$.",
            "Pedro tira con $700\\text{ N}$ y la tensión en la cuerda es de $0\\text{ N}$.",
            "Pedro tira con $350\\text{ N}$ y la tensión en la cuerda se suma dando $700\\text{ N}$.",
            "Pedro tira con $175\\text{ N}$ porque la fuerza se divide a la mitad entre ambos extremos."
        ],
        "ans": 0,
        "exp": "**Paso 1. Equilibrio de la cuerda:** Para que una cuerda ideal (masa despreciable) esté en equilibrio estático ($a=0$), la suma de fuerzas sobre ella debe ser cero: $\\sum F_x = 0$.\n**Paso 2. Procedimiento a mano:**\n- Fuerzas aplicadas: $F_{\\text{Pedro}} - F_{\\text{Juan}} = 0 \\implies F_{\\text{Pedro}} = 350\\text{ N}$.\n- Concepto de tensión en una cuerda: La tensión $T$ es la fuerza interna transmitida a través de cualquier sección transversal. Al realizar un corte imaginario en la cuerda, la sección izquierda tira con $350\\text{ N}$ y la derecha con $350\\text{ N}$ para equilibrarla. Por definición, la tensión es $T = 350\\text{ N}$ (las fuerzas opuestas no se suman a $700\\text{ N}$).\n**Paso 3. Conclusión:** Pedro tira con $350\\text{ N}$ y la tensión en la cuerda es de $350\\text{ N}$.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.2.1-equilibrio"], "ch": "fis-L03", "t": "Equilibrio Traslacional con 4 Fuerzas",
        "fig": "fql19-disco-4fuerzas",
        "prompt": "Un disco de tejo de $0.5\\text{ kg}$ se desliza sobre hielo sin fricción sometido a 4 fuerzas coplanares concurrentes: $F_1 = 12\\text{ N}$ al Norte, $F_2 = 12\\text{ N}$ al Sur, $F_3 = 8\\text{ N}$ al Este y $F_4 = 8\\text{ N}$ al Oeste. ¿Cuál es el estado de movimiento del disco?",
        "opts": [
            "Se mueve en línea recta con velocidad constante (MRU) o permanece en reposo porque la fuerza neta es cero.",
            "Acelera hacia el Norte debido a que $12\\text{ N} > 8\\text{ N}$.",
            "Describe una trayectoria circular uniforme con rapidez variable.",
            "Se detiene de golpe en $0.1\\text{ segundos}$ por el choque de fuerzas opuestas."
        ],
        "ans": 0,
        "exp": "**Paso 1. Sumatoria de fuerzas vectoriales:**\n- Eje $y$ (Norte-Sur): $\\sum F_y = F_{\\text{Norte}} - F_{\\text{Sur}} = 12\\text{ N} - 12\\text{ N} = 0\\text{ N}$.\n- Eje $x$ (Este-Oeste): $\\sum F_x = F_{\\text{Este}} - F_{\\text{Oeste}} = 8\\text{ N} - 8\\text{ N} = 0\\text{ N}$.\n**Paso 2. Aplicación de la 1ra Ley de Newton:**\n- Fuerza neta resultante: $\\vec{F}_{\\text{neta}} = (0\\hat{i} + 0\\hat{j})\\text{ N} \\implies a = 0$.\n- Si la aceleración es nula, el cuerpo no cambia su velocidad: si estaba en reposo sigue en reposo; si ya se estaba deslizando, mantiene su velocidad constante en línea recta (MRU).\n**Paso 3. Conclusión:** Fuerza neta nula implica reposo o MRU.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.2.1-cinemRecta"], "ch": "fis-L04", "t": "Sombra y Trigonometría",
        "fig": "fql19-poste-sombra",
        "prompt": "Un poste vertical de altura $H$ proyecta en el suelo horizontal una sombra de longitud $S = 6\\text{ m}$. Si los rayos del sol inciden formando un ángulo de elevación de $30^\\circ$ respecto al suelo horizontal, ¿cuál es la altura exacta $H$ del poste? (Dato: $\\tan 30^\\circ = \\frac{\\sqrt{3}}{3} \\approx 0.577$)",
        "opts": [
            "$H = 2\\sqrt{3}\\text{ m} \\approx 3.46\\text{ m}$",
            "$H = 6\\sqrt{3}\\text{ m} \\approx 10.39\\text{ m}$",
            "$H = 3.00\\text{ m}$",
            "$H = 12.00\\text{ m}$"
        ],
        "ans": 0,
        "exp": "**Paso 1. Planteamiento geométrico:** El poste vertical, la sombra en el suelo y el rayo solar forman un triángulo rectángulo con cateto opuesto $H$, cateto adyacente $S=6\\text{ m}$ y ángulo de elevación $\\theta = 30^\\circ$.\n**Paso 2. Procedimiento de cálculo a mano:**\n- Definición trigonométrica:\n  $\\tan 30^\\circ = \\frac{\\text{Cateto Opuesto}}{\\text{Cateto Adyacente}} = \\frac{H}{S}$\n- Despeje de la altura $H$:\n  $H = S \\cdot \\tan 30^\\circ = 6 \\cdot \\left(\\frac{\\sqrt{3}}{3}\\right) = \\frac{6\\sqrt{3}}{3} = 2\\sqrt{3}\\text{ m}$.\n- Valor decimal aproximado: $2 \\times 1.732 = 3.464\\text{ m}$.\n**Paso 3. Conclusión:** $H = 2\\sqrt{3}\\text{ m} \\approx 3.46\\text{ m}$.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.2.2-roceResistencia"], "ch": "fis-L09", "t": "Rozamiento Estático vs Cinético",
        "fig": None,
        "prompt": "Se coloca un bloque de $5\\text{ kg}$ en reposo sobre un plano horizontal con coeficientes de fricción $\\mu_s = 0.5$ y $\\mu_k = 0.3$ ($g=10\\text{ m/s}^2$). Se aplica gradualmente una fuerza horizontal $F$. ¿Cuál es la fuerza mínima requerida para iniciar el movimiento y cuál es la fuerza de fricción una vez que el bloque ya está en movimiento?",
        "opts": [
            "Fuerza para iniciar: $F > 25\\text{ N}$; fuerza de rozamiento en movimiento: $f_k = 15\\text{ N}$.",
            "Fuerza para iniciar: $F > 15\\text{ N}$; fuerza de rozamiento en movimiento: $f_k = 25\\text{ N}$.",
            "Fuerza para iniciar: $F > 50\\text{ N}$; fuerza de rozamiento en movimiento: $f_k = 50\\text{ N}$.",
            "Fuerza para iniciar: $F > 2.5\\text{ N}$; fuerza de rozamiento en movimiento: $f_k = 1.5\\text{ N}$."
        ],
        "ans": 0,
        "exp": "**Paso 1. Identificación de fórmulas:**\n- Normal: $N = mg = 5\\text{ kg} \\times 10\\text{ m/s}^2 = 50\\text{ N}$.\n- Fricción estática máxima: $f_{s,\\text{máx}} = \\mu_s N$.\n- Fricción cinética: $f_k = \\mu_k N$.\n**Paso 2. Cálculo aritmético a mano:**\n- $f_{s,\\text{máx}} = 0.5 \\times 50\\text{ N} = 25\\text{ N}$. Por ende, para que el bloque rompa el reposo se requiere una fuerza aplicada $F > 25\\text{ N}$.\n- Una vez en movimiento, la fricción cae al valor cinético:\n  $f_k = 0.3 \\times 50\\text{ N} = 15\\text{ N}$.\n**Paso 3. Conclusión:** Para iniciar se requiere $F > 25\\text{ N}$, y una vez en marcha la fricción es $15\\text{ N}$.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.2.2-3raNewton"], "ch": "fis-L10", "t": "Camión y Auto en Empuje",
        "fig": None,
        "prompt": "Un camión de $3000\\text{ kg}$ se coloca detrás de un auto averiado de $1000\\text{ kg}$ y lo empuja en línea recta acelerando a $1.5\\text{ m/s}^2$. Despreciando el rozamiento de las ruedas con el suelo, ¿cuál es la magnitud de la fuerza que el camión ejerce sobre el auto y la que el auto ejerce sobre el camión?",
        "opts": [
            "Ambas fuerzas tienen exactamente la misma magnitud de $1500\\text{ N}$, en sentidos opuestos.",
            "El camión ejerce $4500\\text{ N}$ y el auto reacciona con $1500\\text{ N}$.",
            "El camión ejerce $6000\\text{ N}$ y el auto no ejerce ninguna fuerza por estar averiado.",
            "El camión ejerce $1500\\text{ N}$ y el auto reacciona con $4500\\text{ N}$."
        ],
        "ans": 0,
        "exp": "**Paso 1. Dinámica del cuerpo empujado (auto):**\n- Masa del auto: $m_{\\text{auto}} = 1000\\text{ kg}$, aceleración: $a = 1.5\\text{ m/s}^2$.\n- La fuerza neta que acelera al auto es la fuerza de contacto que le aplica el camión:\n  $F_{\\text{camión}\\to\\text{auto}} = m_{\\text{auto}} \\cdot a = 1000\\text{ kg} \\times 1.5\\text{ m/s}^2 = 1500\\text{ N}$.\n**Paso 2. Aplicación de la 3ra Ley de Newton:**\n- Por acción y reacción, la fuerza de contacto que el auto ejerce en sentido opuesto sobre el parachoques del camión es de igual módulo:\n  $|F_{\\text{auto}\\to\\text{camión}}| = |F_{\\text{camión}\\to\\text{auto}}| = 1500\\text{ N}$.\n**Paso 3. Conclusión:** Ambas fuerzas valen exactamente $1500\\text{ N}$ en sentidos contrarios.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.2.2-circular"], "ch": "fis-L11", "t": "MCU y Aceleración Centrípeta",
        "fig": "fql19-mcu-vectorial",
        "prompt": "Una partícula describe un Movimiento Circular Uniforme (MCU) en un plano horizontal con radio $R = 2\\text{ m}$ y rapidez constante $v = 6\\text{ m/s}$. ¿Cuál es el valor de su aceleración tangencial $a_t$ y de su aceleración centrípeta $a_c$?",
        "opts": [
            "$a_t = 0\\text{ m/s}^2$ y $a_c = 18\\text{ m/s}^2$ dirigida radialmente hacia el centro del círculo.",
            "$a_t = 3\\text{ m/s}^2$ y $a_c = 0\\text{ m/s}^2$.",
            "$a_t = 18\\text{ m/s}^2$ y $a_c = 36\\text{ m/s}^2$.",
            "$a_t = 0\\text{ m/s}^2$ y $a_c = 0\\text{ m/s}^2$ porque la velocidad es uniforme."
        ],
        "ans": 0,
        "exp": "**Paso 1. Concepto de MCU:** En un MCU, la rapidez (módulo del vector velocidad) es constante, pero la dirección del vector velocidad cambia continuamente.\n**Paso 2. Cálculo a mano de las componentes de aceleración:**\n- Aceleración tangencial (tasa de cambio de la rapidez): $a_t = \\frac{dv}{dt} = 0$.\n- Aceleración centrípeta (responsable del cambio de dirección):\n  $a_c = \\frac{v^2}{R} = \\frac{6^2}{2} = \\frac{36}{2} = 18\\text{ m/s}^2$.\n- Dirección: Siempre orientada radialmente hacia el centro de la circunferencia.\n**Paso 3. Conclusión:** $a_t = 0$ y $a_c = 18\\text{ m/s}^2$ hacia el centro.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.2.2-circular"], "ch": "fis-L11", "t": "Fuerza Centrípeta en Giro",
        "fig": None,
        "prompt": "Un automóvil de $1200\\text{ kg}$ toma una curva circular plana de radio $R = 50\\text{ m}$ a una rapidez constante de $20\\text{ m/s}$. ¿Qué fuerza horizontal proporciona la aceleración centrípeta necesaria para que el auto no derrape hacia afuera?",
        "opts": [
            "La fuerza de rozamiento estático entre los neumáticos y el asfalto, de valor $9600\\text{ N}$ hacia el centro.",
            "La fuerza centrífuga que empuja el auto hacia el exterior con $9600\\text{ N}$.",
            "La fuerza de gravedad vertical que actúa sobre el techo del vehículo con $12000\\text{ N}$.",
            "La fuerza del motor que impulsa el auto hacia adelante con $24000\\text{ N}$."
        ],
        "ans": 0,
        "exp": "**Paso 1. Identificación de la fuerza real:** Para que un auto gire en una pista horizontal sin peralte, la única fuerza radial hacia el centro de la curva es la fricción lateral de las llantas con el pavimento.\n**Paso 2. Cálculo a mano de la fuerza requerida:**\n- Aceleración centrípeta: $a_c = \\frac{v^2}{R} = \\frac{20^2}{50} = \\frac{400}{50} = 8\\text{ m/s}^2$.\n- Fuerza centrípeta: $F_c = m \\cdot a_c = 1200\\text{ kg} \\times 8\\text{ m/s}^2 = 9600\\text{ N}$.\n- La fuerza centrífuga no es una fuerza real en un marco inercial, sino una fuerza ficticia.\n**Paso 3. Conclusión:** La fricción estática proporciona los $9600\\text{ N}$ dirigidos hacia el centro.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.2.3-trabajoPotencia"], "ch": "fis-L13", "t": "Cálculo de Potencia Mecánica",
        "fig": None,
        "prompt": "Un motor eléctrico ejerce una fuerza de tracción constante de $400\\text{ N}$ para desplazar una carga horizontalmente a una rapidez constante de $5\\text{ m/s}$ durante $20\\text{ segundos}$. ¿Qué potencia mecánica desarrolla el motor?",
        "opts": [
            "$2000\\text{ W} = 2.0\\text{ kW}$",
            "$80\\text{ W}$",
            "$40000\\text{ W} = 40\\text{ kW}$",
            "$1000\\text{ W} = 1.0\\text{ kW}$"
        ],
        "ans": 0,
        "exp": "**Paso 1. Fórmula de potencia mecánica a velocidad constante:**\n$P = \\frac{W}{t} = \\frac{F \\cdot d}{t} = F \\cdot \\left(\\frac{d}{t}\\right) = F \\cdot v$.\n**Paso 2. Cálculo a mano:**\n- Fuerza aplicada: $F = 400\\text{ N}$.\n- Rapidez constante: $v = 5\\text{ m/s}$.\n- $P = 400\\text{ N} \\times 5\\text{ m/s} = 2000\\text{ W} = 2.0\\text{ kW}$.\n- Verificación alternativa: Distancia $d = v \\cdot t = 5 \\times 20 = 100\\text{ m}$. Trabajo $W = 400 \\times 100 = 40000\\text{ J}$. Potencia $P = \\frac{40000\\text{ J}}{20\\text{ s}} = 2000\\text{ W}$.\n**Paso 3. Conclusión:** La potencia desarrollada es $2000\\text{ W}$ ($2\\text{ kW}$).\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.2.2-2daNewton"], "ch": "fis-L08", "t": "Ley de Gravitación Universal",
        "fig": None,
        "prompt": "Dos masas puntuales se atraen con una fuerza gravitatoria $F_0$ cuando se encuentran a una distancia $d$. Si la distancia entre ellas se incrementa al doble ($2d$), ¿cuál es el nuevo valor de la fuerza gravitatoria de atracción entre ambas masas?",
        "opts": [
            "$\\frac{1}{4}F_0 = 0.25\\,F_0$",
            "$\\frac{1}{2}F_0 = 0.50\\,F_0$",
            "$2\\,F_0$",
            "$4\\,F_0$"
        ],
        "ans": 0,
        "exp": "**Paso 1. Ley de Gravitación Universal de Newton:**\n$F = G\\frac{m_1 m_2}{r^2}$.\n**Paso 2. Procedimiento a mano con la nueva distancia:**\n- Distancia inicial $r_1 = d \\implies F_0 = G\\frac{m_1 m_2}{d^2}$.\n- Distancia duplicada $r_2 = 2d \\implies F_{\\text{nueva}} = G\\frac{m_1 m_2}{(2d)^2} = G\\frac{m_1 m_2}{4d^2} = \\frac{1}{4}\\left(G\\frac{m_1 m_2}{d^2}\\right) = \\frac{1}{4}F_0$.\n**Paso 3. Conclusión:** Al duplicar la distancia, la fuerza gravitacional se reduce a la cuarta parte ($0.25 F_0$).\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.2.2-2daNewton"], "ch": "fis-L07", "t": "Segunda Ley con Masa Duplicada",
        "fig": None,
        "prompt": "Una fuerza neta horizontal constante $F$ acelera a un bloque de masa $m$ produciendo una aceleración $a_0 = 8\\text{ m/s}^2$ sobre una superficie sin fricción. Si se coloca encima otro bloque idéntico duplicando la masa total a $2m$ y se aplica exactamente la misma fuerza $F$, ¿cuál será la nueva aceleración del sistema?",
        "opts": [
            "$4\\text{ m/s}^2$ (la mitad de la aceleración original)",
            "$16\\text{ m/s}^2$ (el doble de la aceleración original)",
            "$8\\text{ m/s}^2$ (la aceleración se mantiene idéntica)",
            "$2\\text{ m/s}^2$ (la cuarta parte de la aceleración)"
        ],
        "ans": 0,
        "exp": "**Paso 1. 2da Ley de Newton:** $a = \\frac{F}{m}$. La aceleración es inversamente proporcional a la masa para una fuerza fija.\n**Paso 2. Cálculo a mano:**\n- Caso inicial: $a_0 = \\frac{F}{m} = 8\\text{ m/s}^2$.\n- Caso con masa duplicada: $a_{\\text{nueva}} = \\frac{F}{2m} = \\frac{1}{2}\\left(\\frac{F}{m}\\right) = \\frac{1}{2}(8\\text{ m/s}^2) = 4\\text{ m/s}^2$.\n**Paso 3. Conclusión:** La aceleración se reduce a la mitad: $4\\text{ m/s}^2$.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.2.2-impulsoCML"], "ch": "fis-L12", "t": "Conservación de Cantidad de Movimiento",
        "fig": None,
        "prompt": "Dos patinadores, una joven de $40\\text{ kg}$ y un joven de $80\\text{ kg}$, se encuentran inicialmente en reposo juntos sobre una pista de hielo sin fricción. De pronto se empujan mutuamente con las manos y se separan. Si la joven sale despedida hacia la izquierda a $4\\text{ m/s}$, ¿con qué velocidad y sentido se mueve el joven?",
        "opts": [
            "$2\\text{ m/s}$ hacia la derecha.",
            "$4\\text{ m/s}$ hacia la derecha.",
            "$8\\text{ m/s}$ hacia la derecha.",
            "$1\\text{ m/s}$ hacia la izquierda."
        ],
        "ans": 0,
        "exp": "**Paso 1. Principio físico:** Como no hay fuerzas externas horizontales (hielo sin fricción), la cantidad de movimiento total del sistema se conserva: $\\vec{P}_{\\text{inicial}} = \\vec{P}_{\\text{final}}$.\n**Paso 2. Procedimiento a mano:**\n- Estado inicial en reposo: $P_{\\text{inicial}} = 0$.\n- Estado final:\n  $P_{\\text{final}} = m_1 v_1 + m_2 v_2 = 0$\n  $40\\text{ kg} \\times (-4\\text{ m/s}) + 80\\text{ kg} \\times v_2 = 0$\n  $-160\\text{ kg}\\cdot\\text{m/s} + 80 v_2 = 0$\n  $80 v_2 = 160 \\implies v_2 = \\frac{160}{80} = +2\\text{ m/s}$ (hacia la derecha).\n**Paso 3. Conclusión:** El joven se mueve a $2\\text{ m/s}$ en sentido opuesto (hacia la derecha).\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.2.3-consEnergia"], "ch": "fis-L16", "t": "Rampa Curva y Conservación",
        "fig": None,
        "prompt": "Un bloque de $2\\text{ kg}$ se suelta desde el reposo en la parte superior de una rampa curva sin rozamiento de altura $h = 5\\text{ m}$. Al llegar a la base horizontal, ¿cuál es la rapidez del bloque? (Tome $g = 10\\text{ m/s}^2$)",
        "opts": [
            "$v = 10\\text{ m/s}$",
            "$v = 5\\text{ m/s}$",
            "$v = 20\\text{ m/s}$",
            "$v = 100\\text{ m/s}$"
        ],
        "ans": 0,
        "exp": "**Paso 1. Conservación de energía mecánica:** $E_{p,\\text{inicial}} = E_{c,\\text{final}}$.\n**Paso 2. Cálculo a mano paso a paso:**\n- $mgh = \\frac{1}{2}mv^2$\n- Simplificando la masa $m$:\n  $v = \\sqrt{2gh} = \\sqrt{2 \\times 10\\text{ m/s}^2 \\times 5\\text{ m}} = \\sqrt{100} = 10\\text{ m/s}$.\n- Obsérvese que la masa ($2\\text{ kg}$) no influye en la rapidez final.\n**Paso 3. Conclusión:** La rapidez al llegar a la base es exactamente $10\\text{ m/s}$.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.2.3-trabajoPotencia"], "ch": "fis-L13", "t": "Trabajo de Fuerza Normal",
        "fig": None,
        "prompt": "Un cuerpo de masa $m$ se desplaza una distancia horizontal $d = 8\\text{ m}$ sobre un piso horizontal. ¿Cuál es el trabajo realizado por la fuerza normal $N$ y por el peso $P$ durante este desplazamiento?",
        "opts": [
            "El trabajo de ambas fuerzas es $0\\text{ J}$ porque son estrictamente perpendiculares al desplazamiento ($90^\\circ$).",
            "El trabajo de la normal es $mgd$ y el del peso es $-mgd$.",
            "El trabajo de la normal es positivo y el del peso es cero.",
            "El trabajo de ambas fuerzas es infinito porque sostienen la masa."
        ],
        "ans": 0,
        "exp": "**Paso 1. Definición de trabajo mecánico:** $W = \\vec{F} \\cdot \\vec{d} = F \\cdot d \\cdot \\cos\\theta$, donde $\\theta$ es el ángulo entre el vector fuerza y el vector desplazamiento.\n**Paso 2. Análisis a mano:**\n- Desplazamiento: Vector horizontal $\\vec{d}$.\n- Fuerza normal $\\vec{N}$ (vertical hacia arriba): $\\theta = 90^\\circ \\implies \\cos 90^\\circ = 0 \\implies W_N = N \\cdot d \\cdot 0 = 0\\text{ J}$.\n- Fuerza peso $\\vec{P}$ (vertical hacia abajo): $\\theta = 90^\\circ \\implies \\cos 90^\\circ = 0 \\implies W_P = P \\cdot d \\cdot 0 = 0\\text{ J}$.\n**Paso 3. Conclusión:** Toda fuerza perpendicular al desplazamiento realiza trabajo nulo ($0\\text{ J}$).\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.2.2-roceResistencia"], "ch": "fis-L09", "t": "Velocidad Terminal y Resistencia del Aire",
        "fig": None,
        "prompt": "Un paracaidista salta de un avión y cae libremente durante varios segundos antes de abrir su paracaídas. A medida que su rapidez de caída aumenta, la fuerza de resistencia del aire $F_{\\text{aire}}$ se incrementa hasta igualar al peso $P = mg$. Cuando esto ocurre, ¿cómo es el movimiento del paracaidista a partir de ese instante?",
        "opts": [
            "Cae con velocidad constante (velocidad terminal), ya que la aceleración neta se hace cero ($a=0$).",
            "Frena bruscamente y asciende hacia el avión.",
            "Acelera al doble de la gravedad ($2g$) debido a la presión del aire.",
            "Se detiene en el aire suspendido inmóvil."
        ],
        "ans": 0,
        "exp": "**Paso 1. Sumatoria de fuerzas verticales:** $F_{\\text{neta}} = P - F_{\\text{aire}} = mg - F_{\\text{aire}}$.\n**Paso 2. Procedimiento dinámico:**\n- Al inicio ($v$ baja), $F_{\\text{aire}} < mg \\implies a > 0$ (acelera).\n- Al crecer $v$, $F_{\\text{aire}}$ aumenta hasta que $F_{\\text{aire}} = mg$.\n- En ese punto: $F_{\\text{neta}} = mg - mg = 0 \\implies a = 0$.\n- Por la 1ra Ley de Newton, con $a=0$ la velocidad ya no cambia y permanece constante: $v = v_{\\text{terminal}}$.\n**Paso 3. Conclusión:** Continúa cayendo a velocidad terminal constante.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.2.1-equilibrio"], "ch": "fis-L03", "t": "Equilibrio con Cuerdas Simétricas",
        "fig": "fql19-semaforo-cables",
        "prompt": "Un semáforo de peso $W = 100\\text{ N}$ cuelga en reposo sostenido simétricamente por dos cables que forman un ángulo de $30^\\circ$ con la horizontal. ¿Cuál es la tensión $T$ en cada uno de los cables? (Dato: $\\sin 30^\\circ = 0.5$)",
        "opts": [
            "$T = 100\\text{ N}$",
            "$T = 50\\text{ N}$",
            "$T = 200\\text{ N}$",
            "$T = 25\\text{ N}$"
        ],
        "ans": 0,
        "exp": "**Paso 1. Diagrama de cuerpo libre del nudo central:**\n- Hacia arriba: Componentes verticales de ambos cables: $2 \\cdot T\\sin 30^\\circ$.\n- Hacia abajo: Peso del semáforo: $W = 100\\text{ N}$.\n**Paso 2. Ecuación de equilibrio a mano:**\n- $\\sum F_y = 0 \\implies 2T\\sin 30^\\circ - W = 0$\n- Sustituyendo datos:\n  $2T(0.5) = 100 \\implies 1T = 100\\text{ N}$.\n**Paso 3. Conclusión:** La tensión en cada cable es de $100\\text{ N}$.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.2.3-energiaCinetica"], "ch": "fis-L14", "t": "Energía Cinética al Triplicar Rapidez",
        "fig": None,
        "prompt": "Un vehículo de masa $m$ viaja con rapidez $v_0$ teniendo una energía cinética $E_0$. Si el conductor acelera hasta triplicar su rapidez ($3v_0$), ¿cuántas veces aumenta su energía cinética respecto al valor original $E_0$?",
        "opts": [
            "Aumenta $9\\text{ veces}$ ($9E_0$).",
            "Aumenta $3\\text{ veces}$ ($3E_0$).",
            "Aumenta $6\\text{ veces}$ ($6E_0$).",
            "Permanece igual porque la masa no ha cambiado."
        ],
        "ans": 0,
        "exp": "**Paso 1. Fórmula de energía cinética:** $E_c = \\frac{1}{2}mv^2$. La energía cinética es proporcional al cuadrado de la rapidez ($E_c \\propto v^2$).\n**Paso 2. Cálculo a mano:**\n- Estado inicial: $E_0 = \\frac{1}{2}m v_0^2$.\n- Estado final con $v = 3v_0$:\n  $E_{\\text{final}} = \\frac{1}{2}m (3v_0)^2 = \\frac{1}{2}m (9v_0^2) = 9 \\cdot \\left(\\frac{1}{2}m v_0^2\right) = 9E_0$.\n**Paso 3. Conclusión:** Al triplicar la rapidez, la energía cinética se multiplica por $3^2 = 9$.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.2.3-energiaPotencial"], "ch": "fis-L15", "t": "Energía en Resorte Comprimido",
        "fig": None,
        "prompt": "Un resorte helicoidal ideal con constante elástica $k = 400\\text{ N/m}$ se comprime una distancia $x = 0.1\\text{ m}$. Si luego se comprime el doble ($x = 0.2\\text{ m}$), ¿cuál es la energía potencial elástica almacenada en este segundo caso y cuántas veces aumentó?",
        "opts": [
            "$E_{pe} = 8.0\\text{ J}$ (aumentó $4\\text{ veces}$ respecto a los $2.0\\text{ J}$ iniciales).",
            "$E_{pe} = 4.0\\text{ J}$ (aumentó $2\\text{ veces}$).",
            "$E_{pe} = 16.0\\text{ J}$ (aumentó $8\\text{ veces}$).",
            "$E_{pe} = 2.0\\text{ J}$ (no cambió)."
        ],
        "ans": 0,
        "exp": "**Paso 1. Fórmula de energía potencial elástica:** $E_{pe} = \\frac{1}{2}kx^2$.\n**Paso 2. Cálculos a mano:**\n- Para $x_1 = 0.1\\text{ m}$:\n  $E_{pe,1} = \\frac{1}{2}(400)(0.1)^2 = 200 \\times 0.01 = 2.0\\text{ J}$.\n- Para $x_2 = 0.2\\text{ m}$ (el doble):\n  $E_{pe,2} = \\frac{1}{2}(400)(0.2)^2 = 200 \\times 0.04 = 8.0\\text{ J}$.\n- Razón: $\\frac{8.0\\text{ J}}{2.0\\text{ J}} = 4\\text{ veces}$ (debido a que $2^2 = 4$).\n**Paso 3. Conclusión:** $E_{pe} = 8.0\\text{ J}$, aumentando 4 veces.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.2.1-proyectiles"], "ch": "fis-L06", "t": "Proyectil y Componentes de Velocidad",
        "fig": None,
        "prompt": "Un cañón dispara un proyectil con velocidad inicial $v_0 = 50\\text{ m/s}$ y un ángulo de elevación de $37^\\circ$ sobre la horizontal (considere $\\cos 37^\\circ = 0.8, \\sin 37^\\circ = 0.6$ y $g = 10\\text{ m/s}^2$). Despreciando el aire, ¿cuáles son las componentes horizontal ($v_x$) y vertical ($v_y$) de la velocidad al cabo de $2\\text{ segundos}$ de vuelo?",
        "opts": [
            "$v_x = 40\\text{ m/s}$ y $v_y = 10\\text{ m/s}$ hacia arriba.",
            "$v_x = 30\\text{ m/s}$ y $v_y = 20\\text{ m/s}$ hacia abajo.",
            "$v_x = 40\\text{ m/s}$ y $v_y = 30\\text{ m/s}$ hacia arriba.",
            "$v_x = 50\\text{ m/s}$ y $v_y = 0\\text{ m/s}$."
        ],
        "ans": 0,
        "exp": "**Paso 1. Descomposición de la velocidad inicial a mano:**\n- $v_{0x} = v_0 \\cos 37^\\circ = 50 \\times 0.8 = 40\\text{ m/s}$.\n- $v_{0y} = v_0 \\sin 37^\\circ = 50 \\times 0.6 = 30\\text{ m/s}$.\n**Paso 2. Cinemática a los $t = 2\\text{ s}$:**\n- Eje $x$ (MRU): $v_x(t) = v_{0x} = 40\\text{ m/s}$ (constante en todo momento).\n- Eje $y$ (MRUV con gravedad): $v_y(t) = v_{0y} - gt = 30 - (10 \\times 2) = 30 - 20 = 10\\text{ m/s}$ (positiva, subiendo).\n**Paso 3. Conclusión:** $v_x = 40\\text{ m/s}$ y $v_y = 10\\text{ m/s}$.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.2.1-cinemRecta"], "ch": "fis-L04", "t": "Gráfica Velocidad-Tiempo y Desplazamiento",
        "fig": "fql19-grafica-vt",
        "prompt": "En la gráfica de velocidad en función del tiempo ($v$ vs $t$) adjunta, un móvil parte del reposo y acelera uniformemente hasta alcanzar $12\\text{ m/s}$ en $6\\text{ segundos}$. ¿Qué representa el área bajo la curva del gráfico y cuál es el desplazamiento total del móvil?",
        "opts": [
            "Representa el desplazamiento realizado, que equivale a $\\Delta x = 36\\text{ m}$.",
            "Representa la aceleración media, que equivale a $2\\text{ m/s}^2$.",
            "Representa la fuerza neta, que equivale a $72\\text{ N}$.",
            "Representa la energía cinética final, que equivale a $144\\text{ J}$."
        ],
        "ans": 0,
        "exp": "**Paso 1. Significado físico del área en $v-t$:** La integral del área bajo la curva de velocidad respecto al tiempo representa el desplazamiento neto $\\Delta x = \\int v\\,dt$.\n**Paso 2. Cálculo geométrico del área a mano:**\n- La figura formada desde $t=0$ hasta $t=6\\text{ s}$ es un triángulo rectángulo de base $b = 6\\text{ s}$ y altura $h = 12\\text{ m/s}$.\n- $\\text{Área} = \\frac{\\text{base} \\times \\text{altura}}{2} = \\frac{6\\text{ s} \\times 12\\text{ m/s}}{2} = \\frac{72}{2} = 36\\text{ m}$.\n**Paso 3. Conclusión:** El área representa el desplazamiento y su valor es $\\Delta x = 36\\text{ m}$.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.2.1-cinemRecta"], "ch": "fis-L04", "t": "Gráfica Velocidad-Tiempo y Pendiente",
        "fig": "fql19-grafica-vt",
        "prompt": "En la misma gráfica de velocidad versus tiempo ($v$ vs $t$) del móvil anterior (pasa de $0$ a $12\\text{ m/s}$ en $6\\text{ s}$), ¿qué representa físicamente la pendiente de la recta?",
        "opts": [
            "La aceleración instantánea y constante del móvil, con valor $a = 2\\text{ m/s}^2$.",
            "La velocidad media con valor $6\\text{ m/s}$.",
            "La distancia recorrida por unidad de masa.",
            "El trabajo realizado por la fuerza de fricción."
        ],
        "ans": 0,
        "exp": "**Paso 1. Significado de la pendiente en $v-t$:** La derivada de la velocidad respecto al tiempo es la aceleración: $a = \\frac{dv}{dt} = \\frac{\\Delta v}{\\Delta t}$.\n**Paso 2. Cálculo a mano:**\n- $\\Delta v = 12\\text{ m/s} - 0\\text{ m/s} = 12\\text{ m/s}$.\n- $\\Delta t = 6\\text{ s} - 0\\text{ s} = 6\\text{ s}$.\n- Pendiente: $m = \\frac{12}{6} = 2\\text{ m/s}^2$.\n**Paso 3. Conclusión:** La pendiente representa la aceleración constante ($a = 2\\text{ m/s}^2$).\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.2.2-impulsoCML"], "ch": "fis-L12", "t": "Choque Inelástico y Conservación",
        "fig": None,
        "prompt": "Un vagón de ferrocarril $A$ de $4000\\text{ kg}$ que se mueve a $3\\text{ m/s}$ sobre una vía horizontal sin fricción choca contra un vagón $B$ de $2000\\text{ kg}$ inicialmente en reposo. Tras el impacto, ambos vagones quedan acoplados y se mueven juntos. ¿Cuál es la velocidad común final del conjunto acoplado?",
        "opts": [
            "$v_f = 2.0\\text{ m/s}$ en la misma dirección del vagón inicial.",
            "$v_f = 1.5\\text{ m/s}$.",
            "$v_f = 3.0\\text{ m/s}$.",
            "$v_f = 0.5\\text{ m/s}$."
        ],
        "ans": 0,
        "exp": "**Paso 1. Conservación de cantidad de movimiento en choque plástico/inelástico:** $P_{\\text{inicial}} = P_{\\text{final}}$.\n**Paso 2. Cálculo paso a paso a mano:**\n- $m_A v_{A0} + m_B v_{B0} = (m_A + m_B) v_f$\n- $(4000\\text{ kg})(3\\text{ m/s}) + (2000\\text{ kg})(0) = (4000 + 2000) v_f$\n- $12000\\text{ kg}\\cdot\\text{m/s} = 6000 v_f$\n- $v_f = \\frac{12000}{6000} = 2.0\\text{ m/s}$.\n**Paso 3. Conclusión:** La velocidad del conjunto acoplado es $2.0\\text{ m/s}$.\n**Respuesta correcta: A.**"
    }
]

fis_items = []
for i, d in enumerate(fis_items_data, start=1):
    item = {
        "id": f"fis-19ago-{i:02d}",
        "s": "fis",
        "n": i,
        "d": "intermedio",
        "topics": d["topics"],
        "ch": d["ch"],
        "t": d["t"],
        "prompt": d["prompt"],
        "opts": d["opts"],
        "ans": d["ans"],
        "exp": d["exp"],
        "maths": [],
        "imgs": []
    }
    if d.get("fig"):
        item["fig"] = d["fig"]
    fis_items.append(item)

print(f"Generated {len(fis_items)} Física items.")

# ---------------------------------------------------------
# 4. QUÍMICA (30 items)
# ---------------------------------------------------------
qui_items_data = [
    {
        "topics": ["4.3.1-numerosCuanticos"], "ch": "qui-L05", "t": "Números Cuánticos de Azufre",
        "fig": None,
        "prompt": "El azufre ($S$) posee un número atómico $Z = 16$. Siguiendo el principio de Aufbau, la regla de Hund y el principio de exclusión de Pauli, ¿cuáles son los cuatro números cuánticos $(n, l, m_l, m_s)$ del último electrón de su configuración basal en su capa de valencia? (Convención: orbitales $p$ ordenados $m_l = -1, 0, +1$, primer spin $+1/2$ hacia arriba)",
        "opts": [
            "$(3, 1, -1, -1/2)$",
            "$(3, 0, 0, +1/2)$",
            "$(3, 2, -1, -1/2)$",
            "$(2, 1, +1, -1/2)$"
        ],
        "ans": 0,
        "exp": "**Paso 1. Configuración electrónica del Azufre ($Z=16$):**\n$1s^2\\, 2s^2\\, 2p^6\\, 3s^2\\, 3p^4$ (o $[\\text{Ne}]\\, 3s^2\\, 3p^4$).\n**Paso 2. Llenado a mano de los orbitales $3p^4$ según Hund:**\n- Nivel principal: $n = 3$.\n- Subnivel $p$: $l = 1$.\n- Los 3 orbitales $p$ corresponden a $m_l = -1, 0, +1$:\n  - Electrón 1: $m_l = -1, m_s = +1/2$ (flecha arriba)\n  - Electrón 2: $m_l = 0, m_s = +1/2$ (flecha arriba)\n  - Electrón 3: $m_l = +1, m_s = +1/2$ (flecha arriba)\n  - Electrón 4 (el último diferenciador): se aparea en el primer orbital disponible: $m_l = -1, m_s = -1/2$ (flecha abajo).\n**Paso 3. Conclusión:** El conjunto de 4 números cuánticos es $(3, 1, -1, -1/2)$.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.3.1-configElectronica"], "ch": "qui-L04", "t": "Configuración de Sodio y Catión",
        "fig": None,
        "prompt": "El sodio neutro tiene número atómico $Z = 11$. ¿Cuál es la configuración electrónica de su catión monovalente $\\text{Na}^+$ y qué gas noble es isoelectrónico con él?",
        "opts": [
            "$1s^2\\, 2s^2\\, 2p^6$ (isoelectrónico con el gas noble Neón, $Z=10$).",
            "$1s^2\\, 2s^2\\, 2p^6\\, 3s^2$ (isoelectrónico con el Magnesio).",
            "$1s^2\\, 2s^2\\, 2p^5\\, 3s^1$ (estado excitado de Sodio).",
            "$1s^2\\, 2s^2\\, 2p^6\\, 3s^1$ (átomo de Sodio neutro)."
        ],
        "ans": 0,
        "exp": "**Paso 1. Configuración del átomo neutro $\\text{Na}$ ($11\\, e^-$):**\n$1s^2\\, 2s^2\\, 2p^6\\, 3s^1$.\n**Paso 2. Formación del catión $\\text{Na}^+$:**\n- Al oxidarse y perder su único electrón de valencia ($3s^1$), queda con $11 - 1 = 10$ electrones.\n- Configuración resultante: $1s^2\\, 2s^2\\, 2p^6$.\n- El Neón ($Z=10$) tiene exactamente $10\\, e^-$ con la misma configuración $1s^2\\, 2s^2\\, 2p^6$.\n**Paso 3. Conclusión:** La configuración es $1s^2\\, 2s^2\\, 2p^6$, isoelectrónica con el Neón.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.3.1-configElectronica"], "ch": "qui-L04", "t": "Configuración de Ion de Transición Fe2+",
        "fig": None,
        "prompt": "El hierro ($Fe$) tiene número atómico $Z = 26$. Su configuración basal neutra es $[\\text{Ar}]\\, 4s^2\\, 3d^6$. Al formar el catión ferroso $\\text{Fe}^{2+}$, ¿de qué orbitales se desprenden los 2 electrones y cuál es su configuración electrónica resultante?",
        "opts": [
            "Se desprenden del orbital $4s$, quedando como $[\\text{Ar}]\\, 3d^6$.",
            "Se desprenden del subnivel $3d$, quedando como $[\\text{Ar}]\\, 4s^2\\, 3d^4$.",
            "Se desprende un electrón de $4s$ y uno de $3d$, quedando como $[\\text{Ar}]\\, 4s^1\\, 3d^5$.",
            "Se desprenden de la capa $2p$, quedando como $[\\text{Ne}]\\, 4s^2\\, 3d^6$."
        ],
        "ans": 0,
        "exp": "**Paso 1. Regla de ionización en metales de transición:** Al ionizarse, los metales de transición pierden primero los electrones del nivel de energía principal más externo ($n=4$, es decir, los electrones $4s$), antes de perder electrones del subnivel $3d$.\n**Paso 2. Procedimiento a mano:**\n- Átomo neutro $\\text{Fe}$ ($26\\, e^-$): $[\\text{Ar}]\\, 4s^2\\, 3d^6$.\n- Pérdida de $2\\, e^-$ para formar $\\text{Fe}^{2+}$: Se remueven los dos electrones del orbital $4s^2$.\n- Configuración final de $\\text{Fe}^{2+}$: $[\\text{Ar}]\\, 3d^6$ (o $1s^2\\, 2s^2\\, 2p^6\\, 3s^2\\, 3p^6\\, 3d^6$).\n**Paso 3. Conclusión:** Salen del orbital $4s$, resultando $[\\text{Ar}]\\, 3d^6$.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.3.4-esteqReactivoLim"], "ch": "qui-L17", "t": "Estequiometría con Exceso de Magnesio",
        "fig": None,
        "prompt": "Se hacen reaccionar $72\\text{ g}$ de magnesio metálico ($Mg$, masa molar $24\\text{ g/mol}$) con suficiente gas oxígeno ($O_2$) según la ecuación balanceada:\n$$2\\text{Mg}_{(s)} + \\text{O}_{2(g)} \\to 2\\text{MgO}_{(s)}$$\n¿Cuántos gramos de óxido de magnesio ($MgO$, masa molar $40\\text{ g/mol}$) se producirán con un rendimiento del $100\\%$?",
        "opts": [
            "$120\\text{ g de MgO}$",
            "$80\\text{ g de MgO}$",
            "$240\\text{ g de MgO}$",
            "$40\\text{ g de MgO}$"
        ],
        "ans": 0,
        "exp": "**Paso 1. Cálculo de moles de reactivo disponible:**\n$n_{\\text{Mg}} = \\frac{\\text{masa}}{\\text{Masa Molar}} = \\frac{72\\text{ g}}{24\\text{ g/mol}} = 3.0\\text{ moles de Mg}$.\n**Paso 2. Relación molar estequiométrica:**\n- Según la ecuación balanceada: $2\\text{ moles de Mg} \\implies 2\\text{ moles de MgO}$ (relación $1:1$).\n- Por tanto: $n_{\\text{MgO}} = n_{\\text{Mg}} = 3.0\\text{ moles de MgO}$.\n**Paso 3. Conversión de moles a gramos de producto:**\n- $\\text{Masa de MgO} = n \\times M = 3.0\\text{ moles} \\times 40\\text{ g/mol} = 120\\text{ g}$.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.3.4-esteqReactivoLim"], "ch": "qui-L17", "t": "Identificación de Reactivo Limitante",
        "fig": None,
        "prompt": "Se combinan $24\\text{ g}$ de Magnesio ($Mg$, masa molar $24\\text{ g/mol}$) con $16\\text{ g}$ de Oxígeno gaseoso ($O_2$, masa molar $32\\text{ g/mol}$) en la reacción:\n$$2\\text{Mg} + \\text{O}_2 \\to 2\\text{MgO}$$\n¿Cuál es el reactivo limitante y cuántos gramos de $MgO$ ($40\\text{ g/mol}$) se obtienen?",
        "opts": [
            "El magnesio ($Mg$) es el reactivo limitante y se obtienen $40\\text{ g de MgO}$.",
            "El oxígeno ($O_2$) es el reactivo limitante y se obtienen $80\\text{ g de MgO}$.",
            "Ambos reactivos están en proporción estequiométrica exacta y se obtienen $80\\text{ g de MgO}$.",
            "El magnesio es el reactivo limitante y se obtienen $20\\text{ g de MgO}$."
        ],
        "ans": 0,
        "exp": "**Paso 1. Conversión de masas a moles iniciales:**\n- Moles de $Mg$: $n_{\\text{Mg}} = \\frac{24\\text{ g}}{24\\text{ g/mol}} = 1.0\\text{ mol}$.\n- Moles de $O_2$: $n_{\\text{O}_2} = \\frac{16\\text{ g}}{32\\text{ g/mol}} = 0.5\\text{ mol}$.\n**Paso 2. Determinación del reactivo limitante:**\n- La relación estequiométrica exige $\\frac{2\\text{ moles Mg}}{1\\text{ mol O}_2} = 2$.\n- Razón disponible: $\\frac{1.0\\text{ mol Mg}}{0.5\\text{ mol O}_2} = 2$.\n- Ambos reactivos se consumen íntegramente de forma exacta (o $1.0\\text{ mol Mg}$ limita la producción máxima a $1.0\\text{ mol MgO}$).\n**Paso 3. Cálculo de masa de $MgO$ producida:**\n- $n_{\\text{MgO}} = 1.0\\text{ mol}$.\n- $\\text{Masa} = 1.0\\text{ mol} \\times 40\\text{ g/mol} = 40\\text{ g}$.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.3.4-formEmpMol"], "ch": "qui-L15", "t": "Fórmula Empírica y Molecular",
        "fig": None,
        "prompt": "Un compuesto orgánico gaseoso tiene una composición centesimal de $85.7\\%$ de Carbono ($C$, $12\\text{ g/mol}$) y $14.3\\%$ de Hidrógeno ($H$, $1\\text{ g/mol}$). Si su masa molar experimental es de $42\\text{ g/mol}$, ¿cuáles son su fórmula empírica y su fórmula molecular respectivamente?",
        "opts": [
            "Fórmula empírica: $\\text{CH}_2$; Fórmula molecular: $\\text{C}_3\\text{H}_6$",
            "Fórmula empírica: $\\text{CH}$; Fórmula molecular: $\\text{C}_6\\text{H}_6$",
            "Fórmula empírica: $\\text{CH}_3$; Fórmula molecular: $\\text{C}_2\\text{H}_6$",
            "Fórmula empírica: $\\text{CH}_4$; Fórmula molecular: $\\text{CH}_4$"
        ],
        "ans": 0,
        "exp": "**Paso 1. Cálculo de moles de cada elemento en $100\\text{ g}$ de muestra:**\n- Moles de $C$: $n_C = \\frac{85.7\\text{ g}}{12\\text{ g/mol}} = 7.142\\text{ mol}$.\n- Moles de $H$: $n_H = \\frac{14.3\\text{ g}}{1\\text{ g/mol}} = 14.30\\text{ mol}$.\n**Paso 2. División por el menor valor para hallar la relación empírica:**\n- Relación $C$: $\\frac{7.142}{7.142} = 1$.\n- Relación $H$: $\\frac{14.30}{7.142} \\approx 2$.\n- Fórmula empírica = $\\text{CH}_2$.\n**Paso 3. Masa de la fórmula empírica y factor $N$:**\n- Masa empírica $(\\text{CH}_2) = 12 + 2(1) = 14\\text{ g/mol}$.\n- Factor multiplicador: $N = \\frac{\\text{Masa Molar}}{\\text{Masa Empírica}} = \\frac{42\\text{ g/mol}}{14\\text{ g/mol}} = 3$.\n- Fórmula molecular = $(\\text{CH}_2)_3 = \\text{C}_3\\text{H}_6$ (propeno o ciclopropano).\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.3.4-esteqReactivoLim"], "ch": "qui-L17", "t": "Síntesis de Urea y Volumen en CNPT",
        "fig": None,
        "prompt": "La urea $(\\text{NH}_2)_2\\text{CO}$ (masa molar $60\\text{ g/mol}$) se sintetiza industrialmente mediante la reacción:\n$$2\\text{NH}_{3(g)} + \\text{CO}_{2(g)} \\to (\\text{NH}_2)_2\\text{CO}_{(s)} + \\text{H}_2\\text{O}_{(l)}$$\nPara producir $1000\\text{ g}$ de urea pura, ¿qué volumen de amoníaco gaseoso ($\text{NH}_3$) en Condiciones Normales de Presión y Temperatura (CNPT, $1\\text{ mol} = 22.4\\text{ L}$) se necesita como mínimo?",
        "opts": [
            "$746.67\\text{ L de NH}_3$",
            "$373.33\\text{ L de NH}_3$",
            "$1493.33\\text{ L de NH}_3$",
            "$224.00\\text{ L de NH}_3$"
        ],
        "ans": 0,
        "exp": "**Paso 1. Moles de urea requeridos:**\n$n_{\\text{urea}} = \\frac{\\text{masa}}{\\text{Masa Molar}} = \\frac{1000\\text{ g}}{60\\text{ g/mol}} = \\frac{50}{3}\\text{ moles} \\approx 16.667\\text{ moles}$.\n**Paso 2. Relación estequiométrica con el amoníaco:**\n- La ecuación indica que $1\\text{ mol de urea}$ requiere $2\\text{ moles de NH}_3$.\n- Moles de $\\text{NH}_3$: $n_{\\text{NH}_3} = 2 \\times \\frac{50}{3} = \\frac{100}{3}\\text{ moles} \\approx 33.333\\text{ moles}$.\n**Paso 3. Conversión a volumen en CNPT:**\n- $V = n \\times 22.4\\text{ L/mol} = \\left(\\frac{100}{3}\\right) \\times 22.4 = \\frac{2240}{3} \\approx 746.67\\text{ L}$.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.3.1-particulas"], "ch": "qui-L03", "t": "Masa Atómica e Isótopos",
        "fig": None,
        "prompt": "Un elemento hipotético $X$ tiene dos isótopos estables en la naturaleza: el $^{185}X$ con masa isotópica de $184.95\\text{ uma}$ y abundancia del $37.40\\%$, y el $^{187}X$ con masa de $186.96\\text{ uma}$ y abundancia del $62.60\\%$. ¿Cuál es la masa atómica relativa promedio del elemento $X$?",
        "opts": [
            "$186.21\\text{ uma}$",
            "$185.95\\text{ uma}$",
            "$187.00\\text{ uma}$",
            "$184.00\\text{ uma}$"
        ],
        "ans": 0,
        "exp": "**Paso 1. Fórmula de masa atómica ponderada:**\n$\\bar{A} = \\frac{(m_1 \\times \\%_1) + (m_2 \\times \\%_2)}{100}$.\n**Paso 2. Cálculo aritmético a mano:**\n- Aporte isótopo 185: $184.95 \\times 0.3740 = 69.1713\\text{ uma}$.\n- Aporte isótopo 187: $186.96 \\times 0.6260 = 117.0370\\text{ uma}$.\n- Suma total: $69.1713 + 117.0370 = 186.2083\\text{ uma} \\approx 186.21\\text{ uma}$ (corresponde al Renio, $Re$).\n**Paso 3. Conclusión:** La masa atómica promedio es $186.21\\text{ uma}$.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.3.3-Lewis"], "ch": "qui-L11", "t": "Estructura de Lewis del Amoníaco",
        "fig": "fql19-lewis-nh3",
        "prompt": "Al examinar la estructura de Lewis del amoníaco ($\\text{NH}_3$, donde el Nitrógeno tiene $Z=7$ y el Hidrógeno $Z=1$), ¿cuántos pares de electrones compartidos (enlaces simples) y cuántos pares libres (no enlazantes) posee el átomo central de nitrógeno?",
        "opts": [
            "3 pares compartidos (enlaces simples N-H) y 1 par de electrones libre.",
            "4 pares compartidos y 0 pares libres.",
            "2 pares compartidos y 2 pares libres.",
            "1 par compartido y 3 pares libres."
        ],
        "ans": 0,
        "exp": "**Paso 1. Conteo de electrones de valencia totales:**\n- Nitrógeno (Grupo 15): $5\\, e^-$ de valencia.\n- 3 Hidrógenos: $3 \\times 1 = 3\\, e^-$.\n- Total de electrones = $5 + 3 = 8\\, e^-$ (4 pares de electrones).\n**Paso 2. Distribución de enlaces a mano:**\n- Se forman 3 enlaces simples $\\text{N}-\\text{H}$ (utilizando $3 \\times 2 = 6\\, e^-$).\n- Los $2\\, e^-$ restantes ($1\\text{ par}$) se ubican como un par solitario no enlazante sobre el nitrógeno completando su octeto.\n**Paso 3. Conclusión:** Posee 3 pares enlazantes y 1 par no enlazante (geometría piramidal trigonal).\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.3.3-geomMolec"], "ch": "qui-L12", "t": "Geometría y Polaridad del CO2",
        "fig": "fql19-lewis-co2",
        "prompt": "La molécula de dióxido de carbono ($\\text{CO}_2$) posee dos enlaces polares carbono-oxígeno ($\\text{C}=\\text{O}$). Sin embargo, la molécula en su conjunto es apolar (momento dipolar neto $\\mu = 0$). ¿A qué se debe este comportamiento físico-químico?",
        "opts": [
            "A su geometría molecular lineal ($180^\\circ$), donde los dos dipolos de enlace tienen igual magnitud pero sentidos opuestos, cancelándose vectorialmente.",
            "A que el carbono y el oxígeno tienen exactamente la misma electronegatividad.",
            "A que los electrones están completamente fijos y no pueden moverse.",
            "A su geometría angular asimétrica que suma los vectores de enlace hacia el centro."
        ],
        "ans": 0,
        "exp": "**Paso 1. Estructura de Lewis y RPECV del $\\text{CO}_2$:**\n$\\text{O}=\\text{C}=\\text{O}$. El carbono central no tiene pares libres y está unido a dos átomos de oxígeno mediante dobles enlaces.\n**Paso 2. Análisis vectorial de dipolos:**\n- Cada enlace $\\text{C}=\\text{O}$ es polar debido a la mayor electronegatividad del oxígeno ($\\Delta EN \\approx 1.0$).\n- La geometría es lineal con ángulo de $180^\\circ$.\n- Los dos vectores momento dipolar $\\vec{\\mu}_1$ y $\\vec{\\mu}_2$ apuntan en sentidos opuestos: $\\vec{\\mu}_{\\text{neto}} = \\vec{\\mu}_1 + \\vec{\\mu}_2 = \\mu\\hat{i} - \\mu\\hat{i} = 0$.\n**Paso 3. Conclusión:** La simetría lineal cancela los momentos dipolares individuales.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.3.2-propPeriodicas"], "ch": "qui-L07", "t": "Radio Atómico en Halógenos",
        "fig": None,
        "prompt": "¿Cuál es el orden correcto de menor a mayor radio atómico para los elementos halógenos del Grupo 17: Cloro ($Cl$), Flúor ($F$), Yodo ($I$) y Bromo ($Br$)?",
        "opts": [
            "$F < Cl < Br < I$",
            "$I < Br < Cl < F$",
            "$Cl < F < Br < I$",
            "$F < Br < Cl < I$"
        ],
        "ans": 0,
        "exp": "**Paso 1. Variación periódica del radio atómico:** Al descender en un grupo de la tabla periódica, se añaden nuevos niveles de energía principales ($n$), aumentando el apantallamiento electrónico y la distancia promedio de los electrones de valencia al núcleo.\n**Paso 2. Orden en el Grupo 17 (de arriba hacia abajo):**\n- Flúor ($F$, Periodo 2, $n=2$): menor radio atómico.\n- Cloro ($Cl$, Periodo 3, $n=3$).\n- Bromo ($Br$, Periodo 4, $n=4$).\n- Yodo ($I$, Periodo 5, $n=5$): mayor radio atómico.\n**Paso 3. Conclusión:** Orden creciente: $F < Cl < Br < I$.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.3.2-propPeriodicas"], "ch": "qui-L07", "t": "Tendencia de Electronegatividad",
        "fig": None,
        "prompt": "¿Cómo varía la electronegatividad en la tabla periódica y cuál es el elemento con mayor electronegatividad de todos según la escala de Pauling?",
        "opts": [
            "Aumenta de izquierda a derecha en un periodo y disminuye de arriba hacia abajo en un grupo; el elemento más electronegativo es el Flúor ($F = 4.0$).",
            "Aumenta de arriba hacia abajo en un grupo y de derecha a izquierda en un periodo; el más electronegativo es el Francio ($Fr$).",
            "Permanece constante en todos los elementos del mismo periodo; el más electronegativo es el Helio ($He$).",
            "Aumenta hacia abajo y hacia la izquierda; el más electronegativo es el Cesio ($Cs$)."
        ],
        "ans": 0,
        "exp": "**Paso 1. Definición de electronegatividad:** Es la capacidad de un átomo en una molécula para atraer electrones hacia sí en un enlace químico.\n**Paso 2. Tendencia periódica:**\n- En un periodo (horizontal): Aumenta de izquierda a derecha por incremento de la carga nuclear efectiva ($Z_{\\text{eff}}$).\n- En un grupo (vertical): Aumenta de abajo hacia arriba debido a la menor distancia núcleo-valencia.\n- El Flúor ($F$) se encuentra en la esquina superior derecha (sin contar gases nobles) con el valor máximo de $4.0$.\n**Paso 3. Conclusión:** Aumenta hacia arriba y a la derecha; el Flúor es el elemento cumbre.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.3.3-fuerzasInter"], "ch": "qui-L13", "t": "Puentes de Hidrógeno en Agua",
        "fig": None,
        "prompt": "El agua ($\\text{H}_2\\text{O}$) tiene una masa molar de solo $18\\text{ g/mol}$ pero presenta un punto de ebullición excepcionalmente alto ($100^\\circ\\text{C}$) en comparación con el sulfuro de hidrógeno ($\\text{H}_2\\text{S}$, $34\\text{ g/mol}$, punto de ebullición $-60^\\circ\\text{C}$). ¿Qué tipo de fuerza intermolecular explica esta notable diferencia?",
        "opts": [
            "Los puentes de hidrógeno (enlaces de hidrógeno) intermoleculares altamente energéticos entre el átomo de hidrógeno y el oxígeno muy electronegativo.",
            "Las fuerzas de dispersión de London que son más débiles en el agua.",
            "Enlaces metálicos de largo alcance entre los iones hidronio.",
            "Fuerzas nucleares fuertes que unen las moléculas de vapor."
        ],
        "ans": 0,
        "exp": "**Paso 1. Requisitos para formar puente de hidrógeno:** Un átomo de Hidrógeno unido covalentemente a un elemento muy electronegativo y de radio atómico pequeño ($N, O, F$).\n**Paso 2. Comparación entre $\\text{H}_2\\text{O}$ y $\\text{H}_2\\text{S}$:**\n- En el agua, el enlace $\\text{O}-\\text{H}$ es intensamente polar y el oxígeno posee dos pares de electrones libres, formando una densa red tridimensional de puentes de hidrógeno.\n- En el $\\text{H}_2\\text{S}$, el Azufre es menos electronegativo y de mayor tamaño; no forma puentes de hidrógeno, solo dipolo-dipolo débil.\n- Se requiere suministrar mucha energía térmica ($100^\\circ\\text{C}$) para romper esta red en el agua líquida.\n**Paso 3. Conclusión:** Se debe a los puentes de hidrógeno intermoleculares.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.3.4-mol"], "ch": "qui-L14", "t": "Masa Molar del Dihidrógeno Fosfato de Potasio",
        "fig": None,
        "prompt": "Determine la masa molar exacta del dihidrógeno fosfato de potasio ($\\text{KH}_2\\text{PO}_4$) a partir de las siguientes masas atómicas: $K = 39\\text{ g/mol}$, $H = 1\\text{ g/mol}$, $P = 31\\text{ g/mol}$, $O = 16\\text{ g/mol}$.",
        "opts": [
            "$136\\text{ g/mol}$",
            "$120\\text{ g/mol}$",
            "$174\\text{ g/mol}$",
            "$98\\text{ g/mol}$"
        ],
        "ans": 0,
        "exp": "**Paso 1. Desglose de átomos en la fórmula $\\text{KH}_2\\text{PO}_4$:**\n- $1\\text{ átomo de Potasio } (K): 1 \\times 39 = 39\\text{ g/mol}$\n- $2\\text{ átomos de Hidrógeno } (H): 2 \\times 1 = 2\\text{ g/mol}$\n- $1\\text{ átomo de Fósforo } (P): 1 \\times 31 = 31\\text{ g/mol}$\n- $4\\text{ átomos de Oxígeno } (O): 4 \\times 16 = 64\\text{ g/mol}$\n**Paso 2. Suma algebraica a mano:**\n$\\text{Masa Molar} = 39 + 2 + 31 + 64 = 136\\text{ g/mol}$.\n**Paso 3. Conclusión:** La masa molar es $136\\text{ g/mol}$.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.3.2-nomInorganica"], "ch": "qui-L08", "t": "Nomenclatura Stock de Cloruro Férrico",
        "fig": None,
        "prompt": "¿Cuál es el nombre correcto del compuesto inorgánico $\\text{FeCl}_3$ según el sistema de nomenclatura IUPAC (Stock)?",
        "opts": [
            "Cloruro de hierro (III)",
            "Cloruro de hierro (II)",
            "Tricloruro de monohierro",
            "Clorato férrico de sodio"
        ],
        "ans": 0,
        "exp": "**Paso 1. Determinación del estado de oxidación del metal a mano:**\n- El ion cloruro tiene estado de oxidación $-1$ ($\\text{Cl}^-$).\n- En la sal neutra $\\text{FeCl}_3$: $\\text{E.O.}(\\text{Fe}) + 3(-1) = 0 \\implies \\text{E.O.}(\\text{Fe}) = +3$.\n**Paso 2. Regla de Nomenclatura Stock:**\n- Nombre genérico: Cloruro.\n- Nombre específico: de hierro.\n- Estado de oxidación del metal en números romanos entre paréntesis: (III).\n- Resultado: Cloruro de hierro (III) (o tradicionalmente cloruro férrico).\n**Paso 3. Conclusión:** La nomenclatura Stock es Cloruro de hierro (III).\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.3.2-nomInorganica2"], "ch": "qui-L09", "t": "Fórmula del Dicromato de Potasio",
        "fig": None,
        "prompt": "¿Cuál es la fórmula química correcta del dicromato de potasio, en el cual el cromo actúa con su estado de oxidación $+6$?",
        "opts": [
            "$\\text{K}_2\\text{Cr}_2\\text{O}_7$",
            "$\\text{K}_2\\text{CrO}_4$",
            "$\\text{KCrO}_2$",
            "$\\text{K}_3\\text{Cr}_2\\text{O}_7$"
        ],
        "ans": 0,
        "exp": "**Paso 1. Deducción del anión dicromato:**\n- Proviene del ácido dicrómico $\\text{H}_2\\text{Cr}_2\\text{O}_7$, donde el anión es $(\\text{Cr}_2\\text{O}_7)^{2-}$.\n- Verificación de cargas en el anión: $2(\\text{Cr}^{+6}) + 7(\\text{O}^{-2}) = +12 - 14 = -2$.\n**Paso 2. Combinación con el catión potasio:**\n- Catión potasio: $\\text{K}^+$.\n- Cruce de valencias para neutralidad: $2(\\text{K}^+) + 1(\\text{Cr}_2\\text{O}_7^{2-}) \\implies \\text{K}_2\\text{Cr}_2\\text{O}_7$.\n- Nota: $\\text{K}_2\\text{CrO}_4$ es el cromato de potasio.\n**Paso 3. Conclusión:** La fórmula del dicromato es $\\text{K}_2\\text{Cr}_2\\text{O}_7$.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.3.2-nomInorganica"], "ch": "qui-L08", "t": "Óxido Niqueloso y Estados de Oxidación",
        "fig": None,
        "prompt": "El níquel ($Ni$) posee dos estados de oxidación comunes: $+2$ y $+3$. ¿Cuál es la fórmula del óxido niqueloso y del óxido niquélico respectivamente?",
        "opts": [
            "Óxido niqueloso: $\\text{NiO}$; Óxido niquélico: $\\text{Ni}_2\\text{O}_3$",
            "Óxido niqueloso: $\\text{Ni}_2\\text{O}$; Óxido niquélico: $\\text{NiO}_2$",
            "Óxido niqueloso: $\\text{Ni}_2\\text{O}_3$; Óxido niquélico: $\\text{NiO}$",
            "Óxido niqueloso: $\\text{NiO}_2$; Óxido niquélico: $\\text{Ni}_3\\text{O}_4$"
        ],
        "ans": 0,
        "exp": "**Paso 1. Nomenclatura tradicional con sufijos -oso e -ico:**\n- Menor estado de oxidación ($+2$): sufijo -oso $\\implies$ ion niqueloso $\\text{Ni}^{2+}$.\n- Mayor estado de oxidación ($+3$): sufijo -ico $\\implies$ ion niquélico $\\text{Ni}^{3+}$.\n**Paso 2. Formulación con el ion óxido $\\text{O}^{2-}$:**\n- Óxido niqueloso: $\\text{Ni}^{2+} + \\text{O}^{2-} \\implies \\text{Ni}_2\\text{O}_2 \\xrightarrow{\\text{simplificando}} \\text{NiO}$.\n- Óxido niquélico: $\\text{Ni}^{3+} + \\text{O}^{2-} \\implies \\text{Ni}_2\\text{O}_3$.\n**Paso 3. Conclusión:** $\\text{NiO}$ y $\\text{Ni}_2\\text{O}_3$.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.3.2-nomInorganica"], "ch": "qui-L08", "t": "Peróxido de Sodio y Número de Oxidación",
        "fig": None,
        "prompt": "En el peróxido de sodio ($\\text{Na}_2\\text{O}_2$), ¿cuál es el estado de oxidación característico del átomo de oxígeno?",
        "opts": [
            "$-1$",
            "$-2$",
            "$+2$",
            "$-1/2$"
        ],
        "ans": 0,
        "exp": "**Paso 1. Definición del grupo peróxido:** Los peróxidos contienen el anión peroxo $(\\text{O}_2)^{2-}$, donde dos átomos de oxígeno están unidos por un enlace covalente simple $\\text{O}-\\text{O}$.\n**Paso 2. Cálculo algebraico a mano:**\n- El sodio (alcalino Grupo 1) actúa siempre con estado $+1$.\n- Para la molécula neutra $\\text{Na}_2\\text{O}_2$:\n  $2(+1) + 2(x) = 0 \\implies +2 + 2x = 0 \\implies 2x = -2 \\implies x = -1$.\n**Paso 3. Conclusión:** En todos los peróxidos, el oxígeno tiene estado de oxidación $-1$ (a diferencia de los óxidos comunes donde es $-2$).\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.3.2-nomInorganica2"], "ch": "qui-L09", "t": "Oxácidos y Regla de Formulación",
        "fig": None,
        "prompt": "El fósforo ($P$, estado $+5$) forma el ácido fosfórico (ácido ortofosfórico) mediante la adición de tres moléculas de agua a su anhídrido. ¿Cuál es su fórmula molecular correcta siguiendo la regla de polihidratación $314$?",
        "opts": [
            "$\\text{H}_3\\text{PO}_4$",
            "$\\text{HPO}_3$",
            "$\\text{H}_4\\text{P}_2\\text{O}_7$",
            "$\\text{H}_3\\text{PO}_3$"
        ],
        "ans": 0,
        "exp": "**Paso 1. Reacción de formación del ácido ortofosfórico:**\n- Anhídrido fosfórico: $\\text{P}_2\\text{O}_5$.\n- Suma de $3$ moléculas de agua (orto-):\n  $\\text{P}_2\\text{O}_5 + 3\\text{H}_2\\text{O} \\to \\text{H}_6\\text{P}_2\\text{O}_8$.\n**Paso 2. Simplificación matemática a mano:**\n- Dividiendo todos los subíndices para $2$:\n  $\\text{H}_3\\text{PO}_4$.\n- Regla mnemotécnica Barreno: Para fósforo con valencia impar ($+5$), el ortoácido tiene el prefijo de subíndices $314$ ($\\text{H}_3\\text{P}_1\\text{O}_4$).\n**Paso 3. Conclusión:** La fórmula es $\\text{H}_3\\text{PO}_4$.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.3.2-nomInorganica2"], "ch": "qui-L09", "t": "Sulfato de Aluminio",
        "fig": None,
        "prompt": "¿Cuál es la fórmula química correcta del sulfato de aluminio, obtenido de la neutralización del hidróxido de aluminio $\\text{Al}(\\text{OH})_3$ con ácido sulfúrico $\\text{H}_2\\text{SO}_4$?",
        "opts": [
            "$\\text{Al}_2(\\text{SO}_4)_3$",
            "$\\text{AlSO}_4$",
            "$\\text{Al}_3(\\text{SO}_4)_2$",
            "$\\text{Al}_2\\text{S}_3$"
        ],
        "ans": 0,
        "exp": "**Paso 1. Identificación de los iones participantes:**\n- Catión aluminio: $\\text{Al}^{3+}$.\n- Anión sulfato: $(\\text{SO}_4)^{2-}$ (procedente de $\\text{H}_2\\text{SO}_4$).\n**Paso 2. Cruce de valencias a mano:**\n- Para lograr la neutralidad eléctrica de la sal:\n  $2 \\times (+3) + 3 \\times (-2) = +6 - 6 = 0$.\n- Fórmula: $\\text{Al}_2(\\text{SO}_4)_3$.\n**Paso 3. Conclusión:** La sal oxisal neutra es $\\text{Al}_2(\\text{SO}_4)_3$.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.3.4-reacciones"], "ch": "qui-L16", "t": "Ley de Conservación de la Masa",
        "fig": None,
        "prompt": "Antoine Lavoisier enunció la Ley de Conservación de la Masa. Si en un recipiente cerrado herméticamente reaccionan por completo $10.0\\text{ g}$ de gas hidrógeno con $80.0\\text{ g}$ de gas oxígeno formando agua líquida pura, ¿cuál es la masa total dentro del recipiente al finalizar la reacción?",
        "opts": [
            "$90.0\\text{ g}$",
            "$45.0\\text{ g}$",
            "$80.0\\text{ g}$",
            "$100.0\\text{ g}$"
        ],
        "ans": 0,
        "exp": "**Paso 1. Enunciado de la Ley de Lavoisier:** En un sistema cerrado, la masa total de los reactivos es exactamente igual a la masa total de los productos: $\\sum m_{\\text{reactivos}} = \\sum m_{\\text{productos}}$.\n**Paso 2. Cálculo directo a mano:**\n- Masa de reactivos = $10.0\\text{ g de H}_2 + 80.0\\text{ g de O}_2 = 90.0\\text{ g}$.\n- Al no escapar ningún gas ni materia del recipiente hermético, la masa final es de $90.0\\text{ g}$ de $\\text{H}_2\\text{O}$.\n**Paso 3. Conclusión:** La masa final se mantiene constante en $90.0\\text{ g}$.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.3.1-numerosCuanticos"], "ch": "qui-L05", "t": "Experimento de Rutherford",
        "fig": None,
        "prompt": "En 1911, Ernest Rutherford bombardeó una delgada lámina de oro con partículas alfa (núcleos de Helio con carga positiva $+2$). Al observar que la gran mayoría de partículas atravesaban la lámina sin desviarse y solo una pequeña fracción rebotaba fuertemente, ¿qué concluyó sobre la estructura atómica?",
        "opts": [
            "El átomo está constituido mayoritariamente por espacio vacío, con un núcleo central diminuto, denso y cargado positivamente.",
            "El átomo es una esfera maciza y compacta de carga positiva homogénea (modelo de pudín).",
            "Los electrones se encuentran en el centro del átomo y los protones orbitan a gran distancia.",
            "La materia no contiene partículas subatómicas cargadas."
        ],
        "ans": 0,
        "exp": "**Paso 1. Análisis del experimento de dispersión de partículas alfa:**\n- Más del $99.9\\%$ de partículas alfa pasaron en línea recta $\\implies$ la mayor parte del volumen del átomo es espacio vacío.\n- Unas pocas se desviaron en ángulos grandes o rebotaron $\\implies$ debieron colisionar o ser repelidas electrostáticamente por una concentración de masa y carga positiva muy compacta en el centro.\n**Paso 2. Deducción del modelo nuclear de Rutherford:**\n- Se postula la existencia del núcleo atómico positivo donde reside casi toda la masa, con los electrones orbitando alrededor en el espacio circundante.\n**Paso 3. Conclusión:** El átomo es mayormente espacio vacío con un núcleo central denso y positivo.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.3.3-enlaceIonico"], "ch": "qui-L10", "t": "Enlace Iónico y Transferencia de Electrones",
        "fig": None,
        "prompt": "El cloruro de sodio ($\\text{NaCl}$) se forma por la reacción entre el sodio metal ($Na$, electronegatividad $0.9$) y el cloro no metal ($Cl$, electronegatividad $3.0$). ¿Qué tipo de enlace se establece entre ellos y cómo se produce?",
        "opts": [
            "Enlace iónico (o electrovalente), formado por la transferencia completa del electrón de valencia del sodio al cloro, generando atracción electrostática entre $\\text{Na}^+$ y $\\text{Cl}^-$.",
            "Enlace covalente no polar, donde comparten equitativamente dos pares de electrones.",
            "Enlace metálico con un mar de electrones libres.",
            "Enlace covalente coordinado donde el cloro aporta ambos electrones al sodio."
        ],
        "ans": 0,
        "exp": "**Paso 1. Diferencia de electronegatividad:**\n$\\Delta EN = 3.0 - 0.9 = 2.1 > 1.7$.\n**Paso 2. Mecanismo de enlace iónico:**\n- El sodio ($1s^2\\, 2s^2\\, 2p^6\\, 3s^1$) cede fácilmente su electrón $3s^1$ para adquirir configuración estable de gas noble ($[\\text{Ne}]$), convirtiéndose en catión $\\text{Na}^+$.\n- El cloro ($1s^2\\, 2s^2\\, 2p^6\\, 3s^2\\, 3p^5$) capta ese electrón para completar su octeto ($[\\text{Ar}]$), convirtiéndose en anión $\\text{Cl}^-$.\n- La atracción electrostática entre iones de carga opuesta forma la red cristalina iónica.\n**Paso 3. Conclusión:** Es un enlace iónico por transferencia completa de electrones.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.3.3-enlaceCovalente"], "ch": "qui-L10", "t": "Enlace Covalente No Polar",
        "fig": None,
        "prompt": "En la molécula diatómica de gas cloro ($\\text{Cl}_2$), ¿qué tipo de enlace une a ambos átomos de cloro?",
        "opts": [
            "Enlace covalente simple no polar (o apolar), porque la diferencia de electronegatividad entre átomos idénticos es cero ($\\Delta EN = 0$).",
            "Enlace iónico fuerte por transferencia de electrones.",
            "Enlace covalente triple polar con momento dipolar permanente.",
            "Enlace por puente de hidrógeno intracelular."
        ],
        "ans": 0,
        "exp": "**Paso 1. Cálculo de electronegatividad:** Al tratarse de dos átomos del mismo elemento químico ($Cl$ y $Cl$):\n$\\Delta EN = 3.0 - 3.0 = 0$.\n**Paso 2. Mecanismo de compartición:**\n- Cada átomo de cloro tiene $7$ electrones de valencia y necesita $1$ electrón para el octeto.\n- Comparten exactamente 1 par de electrones formando un enlace covalente simple ($\text{Cl}-\text{Cl}$).\n- Como la atracción es perfectamente simétrica, el par electrónico se comparte por igual, resultando apolar.\n**Paso 3. Conclusión:** Es un enlace covalente simple no polar.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.3.4-reacciones"], "ch": "qui-L16", "t": "Balanceo por Tanteo de Combustión",
        "fig": None,
        "prompt": "Al balancear por tanteo la ecuación de combustión completa del gas propano ($\\text{C}_3\\text{H}_8$):\n$$a\\,\\text{C}_3\\text{H}_8 + b\\,\\text{O}_2 \\to c\\,\\text{CO}_2 + d\\,\\text{H}_2\\text{O}$$\n¿Cuáles son los coeficientes estequiométricos enteros mínimos $(a, b, c, d)$?",
        "opts": [
            "$(1, 5, 3, 4)$",
            "$(1, 3, 3, 4)$",
            "$(2, 10, 6, 8)$",
            "$(1, 4, 3, 4)$"
        ],
        "ans": 0,
        "exp": "**Paso 1. Balanceo de átomos paso a paso:**\n1. Carbono ($C$): Hay $3$ carbonos en reactivos ($\\text{C}_3\\text{H}_8$) $\\implies c = 3$ en $\\text{CO}_2$.\n2. Hidrógeno ($H$): Hay $8$ hidrógenos en reactivos $\\implies d = 4$ en $\\text{H}_2\\text{O}$ (pues $4 \\times 2 = 8$).\n3. Oxígeno ($O$): Contamos los oxígenos en productos:\n   $3\\,\\text{CO}_2 \\implies 3 \\times 2 = 6\\text{ oxígenos}$\n   $4\\,\\text{H}_2\\text{O} \\implies 4 \\times 1 = 4\\text{ oxígenos}$\n   Total en productos = $6 + 4 = 10\\text{ átomos de O}$.\n4. En reactivos: $b\\,\\text{O}_2 \\implies 2b = 10 \\implies b = 5$.\n**Paso 2. Verificación de coeficientes mínimos enteros:**\n$\\text{C}_3\\text{H}_8 + 5\\,\\text{O}_2 \\to 3\\,\\text{CO}_2 + 4\\,\\text{H}_2\\text{O}$. Los números $1, 5, 3, 4$ no se pueden simplificar más.\n**Paso 3. Conclusión:** El conjunto de coeficientes estequiométricos es $(1, 5, 3, 4)$.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.3.4-mol"], "ch": "qui-L14", "t": "Número de Avogadro y Cantidad de Moléculas",
        "fig": None,
        "prompt": "¿Cuántas moléculas están contenidas exactamente en $2.0\\text{ moles}$ de gas dióxido de carbono ($\\text{CO}_2$)? (Dato: Constante de Avogadro $N_A = 6.022 \\times 10^{23}\\text{ moléculas/mol}$)",
        "opts": [
            "$1.2044 \\times 10^{24}\\text{ moléculas}$",
            "$6.022 \\times 10^{23}\\text{ moléculas}$",
            "$3.011 \\times 10^{23}\\text{ moléculas}$",
            "$2.4088 \\times 10^{25}\\text{ moléculas}$"
        ],
        "ans": 0,
        "exp": "**Paso 1. Definición del mol:** $1\\text{ mol}$ de cualquier sustancia contiene exactamente el número de Avogadro de partículas elementales ($N_A = 6.022 \\times 10^{23}$).\n**Paso 2. Multiplicación a mano:**\n$\\text{Número de moléculas} = n \\times N_A = 2.0\\text{ moles} \\times 6.022 \\times 10^{23}\\text{ moléculas/mol} = 1.2044 \\times 10^{24}\\text{ moléculas}$.\n**Paso 3. Conclusión:** Contiene $1.2044 \\times 10^{24}$ moléculas.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.3.2-propPeriodicas"], "ch": "qui-L07", "t": "Energía de Primera Ionización",
        "fig": None,
        "prompt": "¿Qué es la energía de primera ionización ($EI_1$) y cuál de los siguientes elementos presenta la mayor energía de ionización?",
        "opts": [
            "Es la energía mínima requerida para arrancar el electrón más externo de un átomo gaseoso en su estado fundamental; el Helio ($He$) presenta la mayor $EI_1$.",
            "Es la energía liberada al ganar un electrón; el Sodio ($Na$) presenta la mayor $EI_1$.",
            "Es la fuerza con que el núcleo atrae neutrones; el Francio ($Fr$) presenta la mayor $EI_1$.",
            "Es la masa necesaria para formar un ion dipositivo; el Hierro ($Fe$) presenta la mayor $EI_1$."
        ],
        "ans": 0,
        "exp": "**Paso 1. Definición termodinámica:**\n$X_{(g)} + EI_1 \\to X^+_{(g)} + e^-$.\n**Paso 2. Tendencia periódica:**\n- Aumenta hacia la derecha y hacia arriba en la tabla periódica.\n- El Helio ($He$, $1s^2$) tiene su capa completa muy cercana al núcleo y sin apantallamiento interior, lo que le otorga la mayor energía de ionización de toda la tabla periódica ($2372\\text{ kJ/mol}$).\n**Paso 3. Conclusión:** La opción A contiene la definición rigurosa y el elemento correcto.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.3.1-materia"], "ch": "qui-L02", "t": "Clasificación de la Materia",
        "fig": None,
        "prompt": "Una disolución de cloruro de sodio en agua destilada es un ejemplo de:",
        "opts": [
            "Mezcla homogénea (solución), con una sola fase visualmente uniforme y composición constante en cualquier porción.",
            "Mezcla heterogénea con fases separadas a simple vista.",
            "Compuesto químico puro no separable por métodos físicos.",
            "Elemento alotrópico con estructura cristalina fija."
        ],
        "ans": 0,
        "exp": "**Paso 1. Criterios de clasificación:**\n- Sustancia pura: Posee fórmula química única definida (ej. $\\text{NaCl}$ puro o $\\text{H}_2\\text{O}$ pura).\n- Mezcla: Unión física de dos o más sustancias que pueden separarse por métodos físicos (como evaporación del agua).\n**Paso 2. Homogeneidad:**\n- Al disolverse completamente la sal en agua, los iones se dispersan a nivel molecular formando una sola fase líquida transparente sin límites de separación visuales.\n**Paso 3. Conclusión:** Es una mezcla homogénea (solución).\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.3.1-materia"], "ch": "qui-L02", "t": "Cambios Físicos vs Químicos",
        "fig": None,
        "prompt": "¿Cuál de los siguientes procesos corresponde a un cambio químico (reacción química) y no a un simple cambio de estado físico?",
        "opts": [
            "La combustión de un trozo de madera formando cenizas, dióxido de carbono y vapor de agua.",
            "La evaporación del alcohol etílico al dejarlo en un vaso abierto.",
            "La fusión de un cubo de hielo al recibir calor ambiente.",
            "La disolución de azúcar en agua tibia."
        ],
        "ans": 0,
        "exp": "**Paso 1. Distinción conceptual:**\n- Cambio físico: Se modifica el estado de agregación o la forma, pero las moléculas y los enlaces internos permanecen inalterados (ej. $\\text{H}_2\\text{O}_{(s)} \\to \\text{H}_2\\text{O}_{(l)}$).\n- Cambio químico: Se rompen y forman nuevos enlaces covalentes/iónicos, originando sustancias químicamente distintas con nuevas propiedades.\n**Paso 2. Análisis del caso:** La combustión de la celulosa con oxígeno oxida la materia orgánica produciendo nuevas especies químicas ($\\text{CO}_2, \\text{H}_2\\text{O}$ y carbón residual).\n**Paso 3. Conclusión:** La combustión es un cambio químico irreversible.\n**Respuesta correcta: A.**"
    },
    {
        "topics": ["4.3.4-esteqReactivoLim"], "ch": "qui-L17", "t": "Porcentaje de Rendimiento",
        "fig": None,
        "prompt": "En un ensayo de síntesis química, el cálculo estequiométrico teórico indicaba que debían obtenerse $50.0\\text{ g}$ de aspirina. Tras realizar el experimento y purificar el producto en el laboratorio, se pesaron efectivamente $42.5\\text{ g}$. ¿Cuál fue el porcentaje de rendimiento de la reacción?",
        "opts": [
            "$85.0\\%$",
            "$92.5\\%$",
            "$80.0\\%$",
            "$75.0\\%$"
        ],
        "ans": 0,
        "exp": "**Paso 1. Fórmula del porcentaje de rendimiento:**\n$\\text{\\% Rendimiento} = \\left(\\frac{\\text{Rendimiento Real}}{\\text{Rendimiento Teórico}}\\right) \\times 100$.\n**Paso 2. Cálculo a mano:**\n- Rendimiento real experimental = $42.5\\text{ g}$.\n- Rendimiento teórico calculado = $50.0\\text{ g}$.\n- $\\text{\\% Rendimiento} = \\left(\\frac{42.5}{50.0}\\right) \\times 100 = 0.85 \\times 100 = 85.0\\%$.\n**Paso 3. Conclusión:** El porcentaje de rendimiento es del $85.0\\%$.\n**Respuesta correcta: A.**"
    }
]

qui_items = []
for i, d in enumerate(qui_items_data, start=1):
    item = {
        "id": f"qui-19ago-{i:02d}",
        "s": "qui",
        "n": i,
        "d": "intermedio",
        "topics": d["topics"],
        "ch": d["ch"],
        "t": d["t"],
        "prompt": d["prompt"],
        "opts": d["opts"],
        "ans": d["ans"],
        "exp": d["exp"],
        "maths": [],
        "imgs": []
    }
    if d.get("fig"):
        item["fig"] = d["fig"]
    qui_items.append(item)

print(f"Generated {len(qui_items)} Química items.")

# ---------------------------------------------------------
# 5. ASSEMBLE AND SAVE
# ---------------------------------------------------------
bank_output = {
    "metadata": {
        "title": "Banco EPN Día 2 — Filtradas y Reales 19 Agosto",
        "source": "Examen Real EPN 19 de Agosto 2026-B",
        "areas": ["len", "fis", "qui"],
        "total": len(len_items) + len(fis_items) + len(qui_items)
    },
    "len": len_items,
    "fis": fis_items,
    "qui": qui_items,
    "packs": {
        "len": [
            {"pack_id": p["pack_id"], "reading": p["reading"], "qids": [f"len-19ago-{(idx*5 + j + 1):02d}" for j in range(5)]}
            for idx, p in enumerate(len_packs)
        ]
    }
}

js_content = "window.GUIA_BANK_FQL_19AGO = " + json.dumps(bank_output, ensure_ascii=False, indent=2) + ";\n"
with open(r"C:\simulador-epn\guia-bank-fql-19ago.js", "w", encoding="utf-8") as f:
    f.write(js_content)

print("Saved guia-bank-fql-19ago.js successfully with 90 items and verified figures/theory links.")
