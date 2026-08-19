# -*- coding: utf-8 -*-
from __future__ import annotations
import json
import re
from pathlib import Path

SRC = Path(r"C:\simulador-epn\guia-bank-fql-avanzado.js")


def split_one(exp: str) -> str:
    steps = re.findall(r"\*\*Paso \d+\.\*\*", exp)
    if len(steps) >= 2:
        return exp
    body = re.sub(r"^\*\*Paso 1\.\*\*\s*", "", exp)
    # keep answer line
    m = re.search(r"(\*\*Respuesta correcta:[^*]+\*\*)\s*$", body)
    ans = m.group(1) if m else ""
    if m:
        body = body[: m.start()].strip()
    # split on sentence-ish boundaries but keep formulas
    parts = re.split(r"(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚ¿ElLaDeEnSiCoPoTrToSu])", body)
    parts = [p.strip() for p in parts if p.strip() and p.strip() != "."]
    if len(parts) < 2:
        return exp
    out = []
    for i, p in enumerate(parts, 1):
        if p.lower().startswith("respuesta correcta"):
            continue
        out.append(f"**Paso {i}.** {p}")
    if ans:
        out.append(ans)
    return " ".join(out)


def main():
    raw = SRC.read_text(encoding="utf-8")
    prefix = raw[: raw.find("{")]
    obj = json.loads(raw[raw.find("{") : raw.rfind("}") + 1])
    changed = 0
    for s in obj:
        for q in obj[s]:
            neu = split_one(q["exp"])
            if neu != q["exp"]:
                q["exp"] = neu
                changed += 1
    SRC.write_text(prefix + json.dumps(obj, ensure_ascii=False, indent=2) + ";\n", encoding="utf-8")
    print("split", changed)


if __name__ == "__main__":
    main()
