# -*- coding: utf-8 -*-
"""Build guia-theory.js from index.html theorysrc + gap enhancements."""
import re
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
html = (ROOT / "index.html").read_text(encoding="utf-8")
raw = re.search(
    r'<script type="text/plain" id="theorysrc">(.*?)</script>', html, re.S
).group(1)
parts = re.split(r"^@@CHAPTER ", raw, flags=re.M)[1:]
chapters = {}
order = []
for p in parts:
    head, _, body = p.partition("\n")
    bits = head.split("|")
    s, id_, ic, t = bits[0], bits[1], bits[2], bits[3]
    if s in ("trig", "ineq"):
        continue
    chapters[id_] = {"s": s, "id": id_, "ic": ic, "t": t, "body": body.rstrip() + "\n"}
    order.append(id_)

F1_EXTRA = r"""
---

## 14. Proyectiles y satélites: el mismo principio

Un **proyectil** cerca de la Tierra (sin aire) tiene $\vec{a}=-g\,\vec{j}$ constante. Un **satélite** en órbita también es un proyectil: su trayectoria curva "cae" a la misma tasa a la que se curva la Tierra debajo de él.

Cinemática del proyectil (origen en el lanzamiento, $\vec{v}_0=v_0\cos\theta\,\vec{i}+v_0\sin\theta\,\vec{j}$):
$$x=(v_0\cos\theta)t,\quad y=(v_0\sin\theta)t-\tfrac12 gt^2$$
Alcance en suelo horizontal: $R=v_0^2\sin 2\theta/g$. Altura máxima: $H=v_0^2\sin^2\theta/(2g)$.

> **Cuidado:** "sentido" **no** es propiedad del vector en el lenguaje del curso. Un vector tiene **módulo** y **dirección** (y se representa con $\vec{A}=|\vec{A}|\,\vec{\mu}_A$).
"""

F2_EXTRA = r"""
---

## 14. Resistencia del aire (profundidad para el examen)

La **resistencia del aire** (o fuerza de arrastre) se opone siempre a la velocidad relativa del cuerpo respecto al fluido. No es lo mismo que el rozamiento seco entre sólidos.

### Modelo lineal (bajas velocidades)
$$\vec{F}_r = -b\,\vec{v}$$
La magnitud crece con la rapidez; la dirección es **opuesta** a $\vec{v}$.

### Modelo cuadrático (caída con aire a velocidades típicas)
$$F_r = \tfrac12\,C_d\,\rho\,A\,v^2$$
donde $C_d$ es el coeficiente de arrastre, $\rho$ la densidad del aire y $A$ el área frontal.

### Caída libre con resistencia: velocidad terminal
En vertical, hacia abajo: $mg - F_r = ma$. Cuando $F_r = mg$, la aceleración se anula y aparece la **velocidad terminal** $v_t$:
- Modelo lineal: $v_t = mg/b$.
- Modelo cuadrático: $v_t = \sqrt{2mg/(C_d\rho A)}$.

> **Idea clave (Barreno):** en el D.C.L. la resistencia **siempre** apunta contra $\vec{v}$. Si el cuerpo sube, $\vec{F}_r$ apunta hacia abajo; si baja, hacia arriba. No confundir con el peso.

### Ejemplo de pizarra
Un paracaidista de masa $m=80\,\mathrm{kg}$ alcanza $v_t=5\,\mathrm{m/s}$ con el modelo lineal. Entonces $b = mg/v_t = 800/5 = 160\,\mathrm{N\cdot s/m}$ (con $g=10$).

---

## 15. Dinámica del MCU: $F_c = mv^2/R$

En **movimiento circular uniforme** la rapidez $v$ es constante, pero $\vec{v}$ cambia de dirección. Eso exige una aceleración centrípeta:
$$\vec{a}_c = \frac{v^2}{R}\,\vec{\mu}_c \qquad |\vec{a}_c|=\frac{v^2}{R}=\omega^2 R$$
dirigida al **centro** de la circunferencia.

La **fuerza neta** hacia el centro (fuerza centrípeta) es:
$$\sum F_c = m\frac{v^2}{R}$$
**Importante:** "fuerza centrípeta" no es un tipo nuevo de fuerza; es el **nombre del resultado** $\sum\vec{F}$ hacia el centro. Puede ser tensión, gravitación, normal, rozamiento o una combinación.

### Ejemplo de pizarra
Un auto de masa $m$ toma una curva de radio $R$ a rapidez $v$ sobre piso horizontal. El rozamiento estático suministra la centrípeta:
$$f_s = m\frac{v^2}{R} \le \mu_s N = \mu_s mg \implies v_{\max}=\sqrt{\mu_s g R}.$$

> **Error frecuente:** decir que en MCU "no hay aceleración" porque $v$ es constante. Hay aceleración centrípeta; lo que es cero es la componente **tangencial**.

---

## 16. Satélites en órbita circular (dinámica)

Para un satélite en órbita circular de radio $r$ (desde el centro de la Tierra), la gravitación **es** la fuerza centrípeta:
$$G\frac{Mm}{r^2} = m\frac{v^2}{r} \implies v=\sqrt{\frac{GM}{r}}$$
Periodo: $T=2\pi r/v = 2\pi\sqrt{r^3/(GM)}$ (3.ª ley de Kepler para órbitas circulares).

La "ingravidez" a bordo no significa $g=0$: el satélite y la cabina **caen juntos** con la misma aceleración $GM/r^2$.

> **Truco de examen:** si dan altura $h$ sobre la superficie, el radio orbital es $r=R_T+h$, no $h$.
"""

F3_EXTRA = r"""
---

## 12. Trabajo y energía con notación de curso (repaso de pizarra)

### Trabajo de una fuerza constante
$$W = \vec{F}\cdot\Delta\vec{r} = |\vec{F}|\,|\Delta\vec{r}|\,\cos\theta$$
- Si $\theta=90^\circ$, $W=0$ (tensión en péndulo en arco; normal en superficie horizontal).
- Si $\theta>90^\circ$, $W<0$ (rozamiento que frena).

### Teorema trabajo–energía cinética
$$W_{\mathrm{neto}} = \Delta E_c = E_{c,f}-E_{c,i},\qquad E_c=\tfrac12 mv^2$$

### Energía potencial (fuerzas conservativas)
Para la gravedad cerca de la Tierra (eje $y$ hacia arriba):
$$E_p = mgy \quad\Rightarrow\quad W_g = -\Delta E_p$$
Fuerza conservativa $\Leftrightarrow$ el trabajo **no** depende del camino, solo de los extremos. En un camino cerrado, $W_{\mathrm{cons}}=0$.

### Conservación de la energía mecánica
Si solo actúan fuerzas conservativas (o el trabajo de las no conservativas es cero):
$$E_m = E_c + E_p = \mathrm{constante}$$
Si hay rozamiento u otras no conservativas:
$$E_{m,i} + W_{\mathrm{nc}} = E_{m,f}$$

### Ejemplo integrado (estilo Barreno)
Bloque $m=2\,\mathrm{kg}$ se suelta desde $h=5\,\mathrm{m}$ en un tobogán liso. En el suelo:
$$mgy_i = \tfrac12 mv_f^2 \implies v_f=\sqrt{2gh}=\sqrt{100}=10\,\mathrm{m/s}\ (g=10).$$
Si el tobogán es rugoso y llega con $v_f=8\,\mathrm{m/s}$:
$$W_{\mathrm{nc}} = E_{m,f}-E_{m,i} = \tfrac12 m(64)-m(50) = 64-100=-36\,\mathrm{J}.$$

### Fuentes de energía (clasificación útil en ítems)
- **Mecánica:** cinética + potencial (gravitatoria, elástica $E_p=\tfrac12 kx^2$).
- **Térmica / interna:** asociada a rozamiento y deformaciones irreversibles.
- **Química, eléctrica, nuclear, radiante:** aparecen en ítems de transformación; en mecánica el puente suele ser $W$ o calor disipado.

> **Regla de oro:** primero decide el sistema y qué fuerzas son internas/conservativas; después escribe $E_m$ o $W_{\mathrm{neto}}=\Delta E_c$.
"""

M4_EXTRA = r"""
---

## 14. Rectas y circunferencias en el plano (módulo 4.1.4 — cierre)

### Recta: formas que debes reconocer al instante
- **Punto-pendiente:** $y-y_1=m(x-x_1)$.
- **Pendiente-intercepto:** $y=mx+b$.
- **General:** $Ax+By+C=0$ con $m=-A/B$ si $B\neq 0$.
- **Dos puntos:** $m=(y_2-y_1)/(x_2-x_1)$.

Pendientes:
- Paralelas: $m_1=m_2$.
- Perpendiculares: $m_1 m_2=-1$ (si ninguna es vertical).

Distancia de $P(x_0,y_0)$ a $Ax+By+C=0$:
$$d=\frac{|Ax_0+By_0+C|}{\sqrt{A^2+B^2}}$$

### Circunferencia
Centro $C(h,k)$ y radio $r$:
$$(x-h)^2+(y-k)^2=r^2$$
Forma general: $x^2+y^2+Dx+Ey+F=0$ (completar cuadrados).

### Ejemplo de pizarra
Recta por $A(1,2)$ y $B(3,-2)$: $m=(-2-2)/(3-1)=-2$, luego $y-2=-2(x-1)\Rightarrow y=-2x+4$.
Circunferencia con diámetro $AB$: centro punto medio $M(2,0)$, $r=\sqrt{(1)^2+(2)^2}=\sqrt5$, ecuación $(x-2)^2+y^2=5$.

> **Truco EPN:** si piden lugar geométrico de puntos equidistantes, piensa mediatriz (recta) o definición de circunferencia.
"""

L3_EXTRA = r"""
---

## 13. Argumentación lógica e identificación de falacias (4.4.3)

Un **argumento** tiene: premisas + conclusión. Es **válido** si la conclusión se sigue de las premisas; es **sólido** si además las premisas son verdaderas.

### Estructura mínima que debes reconocer
1. Identifica la **tesis** (conclusión).
2. Lista las **razones** (premisas).
3. Pregunta: ¿las premisas sostienen la tesis, o hay un salto?

### Falacias formales (esquema lógico roto)
| Nombre | Esquema incorrecto |
|---|---|
| Afirmar el consecuente | $p\to q$; $q$; luego $p$ |
| Negar el antecedente | $p\to q$; $\neg p$; luego $\neg q$ |

### Falacias informales frecuentes en el examen
- **Ad hominem:** atacar a la persona, no al argumento.
- **Hombre de paja:** distorsionar la tesis ajena para refutarla más fácil.
- **Falsa causa (post hoc):** después de $A$ ocurrió $B$, luego $A$ causó $B$.
- **Generalización apresurada:** concluir una regla universal desde pocos casos.
- **Falsos dilemas:** o $A$ o $B$ cuando existen más opciones.
- **Apelación a la autoridad / a la popularidad:** lo dice X / lo cree la mayoría como única prueba.
- **Pendiente resbaladiza:** cadena de consecuencias extremas sin justificación.

### Ejemplo breve
"El candidato miente porque viste mal" → **ad hominem**.
"Si estudias, apruebas; aprobaste; luego estudiaste" → **afirmar el consecuente** (pudiste aprobar por suerte).

---

## 14. Puntuación y concordancia (profundización)

### Puntuación operativa
- **Punto:** cierra idea completa.
- **Coma:** enumera, aclara, separa vocativos e incisos; **no** une oraciones independientes sin nexo (coma splice).
- **Punto y coma:** relaciona oraciones cercanas o separa ítems ya con comas.
- **Dos puntos:** anuncian explicación, cita o enumeración anunciada.
- **Comillas / rayas:** voz ajena o inciso enfático.

### Concordancia
- **Sujeto–verbo:** el verbo concuerda con el núcleo del sujeto (*La cantidad de errores **es***…, no *son*).
- **Sustantivo–adjetivo:** género y número (*problemas difíciles*).
- **Colectivos:** *la mayoría de los estudiantes **aprueba/aprueban*** (ambas aceptables según foco; sé consistente).
- **Pronombres relativos:** *quienes/que* deben enlazar con el antecedente correcto.

> **Checklist EPN:** ¿hay una sola idea principal por párrafo? ¿Las comas separan aclaraciones y no rompen sujeto–verbo? ¿La conclusión del argumento está explícita?
"""

Q1_EXTRA = r"""
---

## 9. Configuración electrónica completa (hueco de video duplicado — contenido propio)

Aunque el video de "configuración electrónica" en clases llegó duplicado, el examen **sí** evalúa el tema. Procedimiento:

1. Conoce $Z$ (número atómico) = electrones del átomo neutro.
2. Llena orbitales por **Aufbau** (energía creciente):
$$1s\to 2s\to 2p\to 3s\to 3p\to 4s\to 3d\to 4p\to 5s\to 4d\to\ldots$$
3. **Pauli:** máx. 2 $e^-$ por orbital, espines opuestos.
4. **Hund:** en subniveles degenerados ($p,d,f$), ocupa el máximo de orbitales con espines paralelos antes de aparear.
5. Notación: $1s^2 2s^2 2p^6\ldots$ o condensada $[\mathrm{Ne}]\,3s^2 3p^4$.

### Iones
- Cationes: quita electrones del **nivel $n$ más alto** primero (en metales de transición, a menudo los $s$ antes que los $d$).
- Aniones: agrega electrones siguiendo Aufbau.

### Ejemplo de pizarra
$\mathrm{Fe}$ ($Z=26$): $[\mathrm{Ar}]\,4s^2 3d^6$.
$\mathrm{Fe^{2+}}$: $[\mathrm{Ar}]\,3d^6$ (salen los $4s$).
$\mathrm{O^{2-}}$ ($Z=8$, +2 $e^-$): $1s^2 2s^2 2p^6$ (isoelectrónico con $\mathrm{Ne}$).

> **Truco:** excepciones clásicas $\mathrm{Cr}$ y $\mathrm{Cu}$ ($4s^1 3d^5$ / $4s^1 3d^{10}$) por estabilidad de subnivel medio o lleno.
"""

Q2_EXTRA = r"""
---

## 8. Peróxidos (nomenclatura — hueco de video duplicado)

Los **peróxidos** contienen el ion $\mathrm{O_2^{2-}}$ (enlace $\mathrm{O–O}$). El número de oxidación del oxígeno es **$-1$** (no $-2$).

### Fórmula general
Metal + grupo peróxido: $\mathrm{M_2O_2}$ (metales alcalinos) o $\mathrm{MO_2}$ (alcalinotérreos), según carga.

Ejemplos:
| Fórmula | Nombre tradicional / Stock |
|---|---|
| $\mathrm{H_2O_2}$ | peróxido de hidrógeno (agua oxigenada) |
| $\mathrm{Na_2O_2}$ | peróxido de sodio |
| $\mathrm{BaO_2}$ | peróxido de bario |
| $\mathrm{CaO_2}$ | peróxido de calcio |

### Cómo distinguir de óxidos
- Óxido normal: O con N.O. $-2$ ($\mathrm{Na_2O}$, $\mathrm{BaO}$).
- Peróxido: O con N.O. $-1$ y hay $\mathrm{O_2^{2-}}$.
- Superóxido (menos frecuente en el temario básico): $\mathrm{O_2^{-}}$, N.O. del O $=-\tfrac12$ ($\mathrm{KO_2}$).

### Ejemplo rápido
En $\mathrm{Na_2O_2}$: Na es $+1$ cada uno (+2 total) ⇒ cada O aporta $-1$ ⇒ peróxido, no óxido.

> **Error frecuente:** llamar "peróxido" a cualquier compuesto con mucho oxígeno. Mira el ion y el N.O. del oxígeno.
"""

extras = {
    "f1": F1_EXTRA,
    "f2": F2_EXTRA,
    "f3": F3_EXTRA,
    "m4": M4_EXTRA,
    "l3": L3_EXTRA,
    "q1": Q1_EXTRA,
    "q2": Q2_EXTRA,
}

for sid, extra in extras.items():
    needle = extra.strip().splitlines()[0][:40]
    if needle not in chapters[sid]["body"]:
        chapters[sid]["body"] = chapters[sid]["body"].rstrip() + "

" + extra.strip() + "
"

chunks = []
for sid in order:
    ch = chapters[sid]
    header = f"@@CHAPTER {ch['s']}|{ch['id']}|{ch['ic']}|{ch['t']}\n"
    chunks.append(header + ch["body"].rstrip() + "\n")

full = "\n".join(chunks)
js = (
    "/* Guía oficial EPN 2026-B — teoría Aprender (área paralela). No modifica THEORY del aula. */\n"
    "window.GUIA_THEORY_RAW = "
    + json.dumps(full, ensure_ascii=False)
    + ";\n"
    + """
(function(){
  var raw = window.GUIA_THEORY_RAW || '';
  var out = [], cur = null;
  String(raw).split('\\n').forEach(function(line){
    var m = /^@@CHAPTER (.+)$/.exec(line);
    if(m){ var p = m[1].split('|'); cur = {s:p[0], id:p[1], ic:p[2], t:p[3], body:''}; out.push(cur); }
    else if(cur){ cur.body += line + '\\n'; }
  });
  out.forEach(function(c){ c.body = c.body.replace(/\\s+$/,''); });
  window.GUIA_THEORY = out;
})();
"""
)
out_path = ROOT / "guia-theory.js"
out_path.write_text(js, encoding="utf-8")
print("Wrote", out_path, "bytes", out_path.stat().st_size)
print("Chapters:", [(chapters[i]["id"], chapters[i]["t"], len(chapters[i]["body"])) for i in order])
