# -*- coding: utf-8 -*-
"""Parse Notion export of advanced F/Q/L bank into structured JSON."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(r"C:\EPN-ESTUDIO\_temp-preguntas-ia\unpacked")
OUT = Path(r"C:\simulador-epn\scripts\_banco_avanzado_parsed.json")

FILES = {
    "fis": None,
    "qui": None,
    "len": None,
}

for p in ROOT.rglob("*.md"):
    name = p.name
    if name.startswith("Banco avanzado · Física"):
        FILES["fis"] = p
    elif name.startswith("Banco avanzado · Química"):
        FILES["qui"] = p
    elif name.startswith("Banco avanzado · Lenguaje"):
        FILES["len"] = p

ANS_MAP = {"A": 0, "B": 1, "C": 2, "D": 3, "E": 4}

FIS_TOPIC = {
    1: ("4.2.1-mru", "f4", "Gráficas de movimiento"),
    2: ("4.2.2-rozamiento", "f9", "Rozamiento y trabajo"),
    3: ("4.2.2-2daNewton", "f7", "Sistemas de cuerpos"),
    4: ("4.2.1-proyectiles", "f6", "Proyectiles"),
    5: ("4.2.2-grav", "f8", "Gravedad y órbitas"),
    6: ("4.2.2-circular", "f11", "Movimiento circular"),
    7: ("4.2.3-trabajo", "f13", "Trabajo y potencia"),
    8: ("4.2.3-energia", "f16", "Conservación de energía"),
    9: ("4.2.2-impulso", "f12", "Impulso y momento"),
    10: ("4.2.1-caida", "f5", "Caída libre"),
}
# fallbacks by keyword
FIS_KW = [
    (r"gr[aá]fic|v-t|velocidad.?tiempo|desplazamiento neto", ("4.2.1-mru", "f4", "Gráficas de movimiento")),
    (r"rozamiento|inclinad|cuerda|tensi[oó]n", ("4.2.2-rozamiento", "f9", "Rozamiento")),
    (r"dos bloques|contacto|sistema", ("4.2.2-2daNewton", "f7", "Segunda ley")),
    (r"proyectil|muro|alcance|oblicuo|avi[oó]n", ("4.2.1-proyectiles", "f6", "Proyectiles")),
    (r"sat[eé]lite|[oó]rbita|GM|gravedad", ("4.2.2-grav", "f8", "Gravitación")),
    (r"curva|centr[ií]pet|peralte|circular", ("4.2.2-circular", "f11", "Circular")),
    (r"trabajo|potencia|watt", ("4.2.3-trabajo", "f13", "Trabajo y potencia")),
    (r"energ[ií]a|rendimiento|resorte|mgh", ("4.2.3-energia", "f16", "Energía")),
    (r"impulso|cantidad de movimiento|momento lineal|colisi", ("4.2.2-impulso", "f12", "Impulso")),
    (r"ca[ií]da|lanzad[oa] hacia arriba|g=10", ("4.2.1-caida", "f5", "Caída libre")),
    (r"vector|argolla|resultante|noreste", ("4.2.1-vectores", "f2", "Vectores y fuerza neta")),
    (r"inercia|primera ley|reposo", ("4.2.1-1raNewton", "f1", "Primera ley")),
    (r"tercera ley|acci[oó]n.?reacci", ("4.2.2-3raNewton", "f10", "Tercera ley")),
]

QUI_KW = [
    (r"lewis|octeto|estructura", ("4.3.3-lewis", "q11", "Estructuras de Lewis")),
    (r"VSEPR|geometr[ií]a molecular|ángulo", ("4.3.3-geometria", "q12", "Geometría molecular")),
    (r"i[oó]nico|covalente|electronegativ", ("4.3.3-enlace", "q10", "Enlace químico")),
    (r"intermolecular|puente de hidr[oó]geno|London", ("4.3.3-fuerzas", "q13", "Fuerzas intermoleculares")),
    (r"limitante|estequiometr|rendimiento", ("4.3.4-esteq", "q17", "Estequiometría")),
    (r"emp[ií]ric|molecular|centesimal|porcentaje", ("4.3.4-empirica", "q15", "Fórmulas empírica y molecular")),
    (r"mol|avogadro|masa molar", ("4.3.4-mol", "q14", "Concepto de mol")),
    (r"reacci[oó]n|igualar|balance", ("4.3.4-reacciones", "q16", "Reacciones químicas")),
    (r"peri[oó]dic|radio at[oó]mico|ionizaci[oó]n", ("4.3.2-propiedades", "q7", "Propiedades periódicas")),
    (r"nomenclatura|[oó]xido|hidruro|ox[aá]cido", ("4.3.2-nomenclatura", "q8", "Nomenclatura")),
    (r"configuraci[oó]n|electr[oó]n|orbital|cu[aá]ntic", ("4.3.1-electronica", "q4", "Estructura electrónica")),
    (r"is[oó]topo|prot[oó]n|neutr[oó]n|n[uú]mero at[oó]mico", ("4.3.1-particulas", "q3", "Partículas fundamentales")),
    (r"mezcla|compuesto|f[ií]sico|qu[ií]mico", ("4.3.1-materia", "q2", "Clasificación de la materia")),
    (r"unidad|conversi[oó]n|densidad", ("4.3.1-unidades", "q1", "Unidades")),
]

LEN_KW = [
    (r"falacia|ad hominem|hombre de paja|generalizaci", ("4.4.3-argumentacion", "l8", "Argumentación y falacias")),
    (r"p[aá]rrafo|PEEL|conector|coherencia", ("4.4.3-parrafo", "l7", "Construcción del párrafo")),
    (r"coma|punto|puntuaci[oó]n|concordancia", ("4.4.3-puntuacion", "l9", "Puntuación y concordancia")),
    (r"cr[ií]tic|sesgo|fuente|prop[oó]sito", ("4.4.2-critica", "l6", "Lectura crítica")),
    (r"inferenc|idea principal|tesis|literal", ("4.4.2-lectura", "l5", "Análisis e interpretación")),
    (r"deducci[oó]n|inducci[oó]n|abducci[oó]n|razonamiento", ("4.4.2-logica", "l4", "Razonamiento lógico")),
    (r"hecho|opini[oó]n|juicio de valor", ("4.4.1-juicio", "l3", "Juicios de valor")),
    (r"premisa|validez|verdad|silogismo", ("4.4.1-razon", "l2", "Pensamiento lógico")),
    (r"comunicaci[oó]n|emisor|ruido|circuito", ("4.4.1-comunicacion", "l1", "Comunicación")),
]


def map_meta(subj: str, n: int, title: str, prompt: str):
    blob = (title + " " + prompt).lower()
    table = FIS_KW if subj == "fis" else QUI_KW if subj == "qui" else LEN_KW
    if subj == "fis" and n in FIS_TOPIC:
        return FIS_TOPIC[n]
    for rx, meta in table:
        if re.search(rx, blob, re.I):
            return meta
    if subj == "fis":
        return ("4.2.1-mru", "f4", title[:40] or "Física")
    if subj == "qui":
        return ("4.3.4-esteq", "q17", title[:40] or "Química")
    return ("4.4.2-lectura", "l5", title[:40] or "Lenguaje")


def split_questions(text: str):
    parts = re.split(r"(?=^### Pregunta \d+)", text, flags=re.M)
    out = []
    for part in parts:
        m = re.match(r"### Pregunta (\d+)\s*[·.]\s*(.+)", part)
        if not m:
            continue
        out.append((int(m.group(1)), m.group(2).strip(), part))
    return out


def parse_one(subj: str, n: int, title: str, block: str):
    nivel = ""
    nm = re.search(r"\*\*Nivel[^*]*\*\*", block)
    if nm:
        nivel = nm.group(0).strip("*").strip()

    enun = ""
    em = re.search(r"\*\*Enunciado\.\*\*\s*(.+?)(?=\n\s*-\s*\*\*[A-E]\.\*\*)", block, re.S)
    if em:
        enun = re.sub(r"\s+", " ", em.group(1)).strip()
        enun = enun.replace("`", "")

    opts = []
    for lab in "ABCDE":
        om = re.search(rf"-\s*\*\*{lab}\.\*\*\s*(.+)", block)
        if om:
            opts.append(om.group(1).strip().replace("`", ""))

    ans = None
    am = re.search(r"\*\*Respuesta correcta:\s*([A-E])\.\*\*", block)
    if am:
        ans = ANS_MAP[am.group(1)]

    exp = ""
    xm = re.search(
        r"\*\*Respuesta correcta:[^*]+\*\*\s*(.+?)(?=\n\s*\*\*Dónde repasar|\n### Pregunta|\Z)",
        block,
        re.S,
    )
    if xm:
        exp = xm.group(1)
        exp = re.sub(r"\n{2,}", "\n", exp).strip()
        exp = exp.replace("`", "")
        # turn markdown bullets into Paso lines
        lines = []
        for ln in exp.splitlines():
            ln = ln.strip()
            if not ln:
                continue
            ln = re.sub(r"^\*\*(.+?)\*\*\s*", r"\1 ", ln)
            ln = ln.replace("**", "")
            lines.append(ln)
        exp = " ".join(lines)
        if not exp.lower().startswith("paso"):
            exp = "Paso 1: " + exp

    img = None
    im = re.search(r"!\[[^\]]*\]\(([^)]+)\)", block)
    if im:
        img = Path(im.group(1).split("/")[-1].split("\\")[-1]).name
        img = re.sub(r"%[0-9A-Fa-f]{2}", "", img)

    topic, ch, tlabel = map_meta(subj, n, title, enun)
    return {
        "id": f"{subj}-avz-{n:02d}",
        "s": subj,
        "n": n,
        "d": "dificil" if "probable" in nivel.lower() else "experto",
        "topics": [topic],
        "ch": ch,
        "t": tlabel,
        "title": title,
        "nivel": nivel,
        "prompt": enun,
        "opts": opts,
        "ans": ans,
        "exp": exp,
        "img_src": img,
        "maths": [],
        "imgs": [],
    }


def main():
    bank = {}
    issues = []
    for subj, path in FILES.items():
        if not path:
            issues.append(f"missing file {subj}")
            continue
        text = path.read_text(encoding="utf-8")
        qs = []
        for n, title, block in split_questions(text):
            q = parse_one(subj, n, title, block)
            if not q["prompt"]:
                issues.append(f"{subj} Q{n}: no prompt")
            if len(q["opts"]) < 4:
                issues.append(f"{subj} Q{n}: {len(q['opts'])} opts")
            if q["ans"] is None:
                issues.append(f"{subj} Q{n}: no answer")
            if q["ans"] is not None and q["ans"] >= len(q["opts"]):
                issues.append(f"{subj} Q{n}: ans out of range")
            qs.append(q)
        bank[subj] = qs
        print(subj, len(qs), "imgs", sum(1 for q in qs if q["img_src"]))
    OUT.write_text(json.dumps({"bank": bank, "issues": issues}, ensure_ascii=False, indent=2), encoding="utf-8")
    print("ISSUES", len(issues))
    for i in issues[:40]:
        print(" ", i)


if __name__ == "__main__":
    main()
