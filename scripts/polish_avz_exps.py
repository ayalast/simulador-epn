# -*- coding: utf-8 -*-
"""Normalize resolutions so review shows numbered steps + boxed answer."""
from __future__ import annotations

import json
import re
from pathlib import Path

SRC = Path(r"C:\simulador-epn\guia-bank-fql-avanzado.js")


def polish(exp: str, letter: str, opt: str) -> str:
    e = exp.strip()
    e = re.sub(r"Paso\s+(\d+)\s*[—:\-]\s*", r"**Paso \1.** ", e)
    e = re.sub(r"\*\*Paso\s+(\d+)\s*[—:\-]\s*", r"**Paso \1.** ", e)
    e = re.sub(r"\s+", " ", e).strip()
    if not e.startswith("**Paso"):
        e = "**Paso 1.** " + e
    # keep a closing line
    ans = f"**Respuesta correcta: {letter}. {opt}**"
    if "Respuesta correcta" not in e:
        e = e.rstrip(".") + ". " + ans
    else:
        # still append a clean boxed line
        e = re.sub(r"\s*Conclusi[oó]n:.*$", "", e)
        e = e.rstrip(". ") + ". " + ans
    return e


def main():
    raw = SRC.read_text(encoding="utf-8")
    prefix = raw[: raw.find("{")]
    obj = json.loads(raw[raw.find("{") : raw.rfind("}") + 1])
    n = 0
    for subj in ("fis", "qui", "len"):
        for q in obj[subj]:
            letter = chr(65 + q["ans"])
            q["exp"] = polish(q["exp"], letter, q["opts"][q["ans"]])
            n += 1
    SRC.write_text(
        prefix + json.dumps(obj, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8",
    )
    print("polished", n, "explanations")


if __name__ == "__main__":
    main()
