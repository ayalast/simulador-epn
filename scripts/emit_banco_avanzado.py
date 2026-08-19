# -*- coding: utf-8 -*-
"""Emit guia-bank-fql-avanzado.js from parsed JSON."""
from __future__ import annotations

import json
import re
from pathlib import Path

SRC = Path(r"C:\simulador-epn\scripts\_banco_avanzado_parsed.json")
OUT = Path(r"C:\simulador-epn\guia-bank-fql-avanzado.js")

IMG_TO_FIG = {
    "phys_vectors_q35.png": "avz-fis-35",
    "phys_q36.png": "avz-fis-36",
    "phys_q37.png": "avz-fis-37",
    "phys_q38.png": "avz-fis-38",
    "phys_q39.png": "avz-fis-39",
    "phys_q40.png": "avz-fis-40",
    "phys_q41.png": "avz-fis-41",
    "phys_q42.png": "avz-fis-42",
    "phys_q43.png": "avz-fis-43",
    "phys_q44.png": "avz-fis-44",
    "chem_q35.png": "avz-qui-35",
    "chem_q36.png": "avz-qui-36",
    "chem_q37.png": "avz-qui-37",
    "chem_q38.png": "avz-qui-38",
    "chem_q39.png": "avz-qui-39",
    "lang_q35.png": "avz-len-35",
    "lang_q36.png": "avz-len-36",
    "lang_q37.png": "avz-len-37",
    "lang_q38.png": "avz-len-38",
    "lang_q39.png": "avz-len-39",
}


def clean_prompt(s: str) -> str:
    s = re.sub(r"!\[[^\]]*\]\([^)]+\)", " ", s)
    s = re.sub(r"\s*Q\d+\s*·[^.]{0,80}", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s


def clean_opt(s: str) -> str:
    s = s.strip()
    s = s.replace("`", "")
    return s


def clean_exp(s: str) -> str:
    s = re.sub(r"\s+", " ", s).strip()
    return s


def main():
    data = json.loads(SRC.read_text(encoding="utf-8"))
    out = {"fis": [], "qui": [], "len": []}
    for subj in out:
        for q in data["bank"][subj]:
            fig = IMG_TO_FIG.get(q.get("img_src") or "")
            item = {
                "id": q["id"],
                "s": q["s"],
                "n": q["n"],
                "d": q["d"],
                "topics": q["topics"],
                "ch": q["ch"],
                "t": q["t"],
                "prompt": clean_prompt(q["prompt"]),
                "opts": [clean_opt(o) for o in q["opts"]],
                "ans": q["ans"],
                "exp": clean_exp(q["exp"]),
                "maths": [],
                "imgs": [],
            }
            if fig:
                item["fig"] = fig
            out[subj].append(item)
    js = (
        "/* Banco avanzado F/Q/L — 132 preguntas originales, nivel por encima del simulador oficial 69P.\n"
        "   No sustituye a guia-bank-1000-intermedio.js. Usado solo por los simuladores *_avz. */\n"
        "window.GUIA_BANK_FQL_AVANZADO = "
        + json.dumps(out, ensure_ascii=False, indent=2)
        + ";\n"
    )
    OUT.write_text(js, encoding="utf-8")
    print("wrote", OUT, "fis", len(out["fis"]), "qui", len(out["qui"]), "len", len(out["len"]))
    print("with fig", sum(1 for s in out.values() for q in s if q.get("fig")))


if __name__ == "__main__":
    main()
