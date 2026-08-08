#!/usr/bin/env python3
"""Extract Lehmann PDF pages with most drawings (figures) and save crops.
Saves to public/assets/lehmann/ and references/lehmann/
"""
import fitz  # PyMuPDF
import os, pathlib

pdf_path = pathlib.Path("GEOMETRIA_ANALITICA_LEHMANN.pdf")
if not pdf_path.exists():
    # try root with space path
    pdf_path = pathlib.Path(r"C:\simulador-epn\GEOMETRIA_ANALITICA_LEHMANN.pdf")
doc = fitz.open(pdf_path)
print(f"PDF: {pdf_path} pages={len(doc)}")

# Score pages by drawing count + image count + text containing 'Figura' / 'Fig.'
candidates = []
for i, page in enumerate(doc):
    drawings = len(page.get_drawings())
    images = len(page.get_images(full=True))
    text = page.get_text()
    fig_kw = text.lower().count("figura") + text.lower().count("fig.")
    # also count geometric keywords
    geom_kw = sum(text.lower().count(k) for k in ["recta","circunferencia","parábola","elipse","distancia","pendiente","coordenadas","ecuación","gráfica"])
    score = drawings*2 + images*5 + fig_kw*10 + min(geom_kw,20)
    candidates.append((score, drawings, images, fig_kw, i))

candidates.sort(reverse=True)
top = candidates[:40]
print("Top 40 pages by score:")
for score, d, im, fk, i in top:
    print(f"  p{i+1:3d} score={score:3d} drawings={d:3d} images={im} figkw={fk}")

# Save crops for top 20 most promising pages
out_dir = pathlib.Path("public/assets/lehmann")
out_dir.mkdir(parents=True, exist_ok=True)
ref_dir = pathlib.Path("references/lehmann")
ref_dir.mkdir(parents=True, exist_ok=True)

# Also save a manifest
manifest = []

# For each top page, render at 150 dpi and save full page + auto-crop central figure area
# Heuristic: crop to central 75% and then trim white borders
for score, d, im, fk, i in top[:20]:
    page = doc[i]
    # render at 200 dpi for quality
    pix = page.get_pixmap(dpi=150)
    # Save full page thumbnail
    full_path = out_dir / f"lehmann-p{i+1:03d}-full.png"
    pix.save(str(full_path))
    # Try to find figure bbox: union of drawings bbox
    drawings = page.get_drawings()
    if drawings:
        # union bbox
        x0 = min(d['rect'].x0 for d in drawings)
        y0 = min(d['rect'].y0 for d in drawings)
        x1 = max(d['rect'].x1 for d in drawings)
        y1 = max(d['rect'].y1 for d in drawings)
        # expand a bit
        pad = 8
        x0 = max(0, x0-pad); y0 = max(0, y0-pad); x1 = min(page.rect.x1, x1+pad); y1 = min(page.rect.y1, y1+pad)
        # if bbox is too large (covers >80% page) skip crop, use full
        area_ratio = (x1-x0)*(y1-y0) / (page.rect.x1*page.rect.y1)
        if 0.05 < area_ratio < 0.85:
            clip = fitz.Rect(x0,y0,x1,y1)
            pix2 = page.get_pixmap(dpi=200, clip=clip)
            crop_path = out_dir / f"lehmann-p{i+1:03d}-crop.png"
            pix2.save(str(crop_path))
            print(f" p{i+1}: crop {clip} area_ratio {area_ratio:.2f} -> {crop_path.name} {pix2.w}x{pix2.h}")
            manifest.append({"page": i+1, "score": score, "drawings": d, "full": str(full_path), "crop": str(crop_path), "bbox": [x0,y0,x1,y1], "area_ratio": area_ratio})
            continue
    # fallback: save central 60% crop for geometry pages
    # crop central region where figures likely sit
    cx0 = page.rect.x0 + page.rect.width*0.12
    cx1 = page.rect.x1 - page.rect.width*0.12
    cy0 = page.rect.y0 + page.rect.height*0.18
    cy1 = page.rect.y1 - page.rect.height*0.15
    clip = fitz.Rect(cx0,cy0,cx1,cy1)
    pix2 = page.get_pixmap(dpi=200, clip=clip)
    crop_path = out_dir / f"lehmann-p{i+1:03d}-crop.png"
    pix2.save(str(crop_path))
    print(f" p{i+1}: central crop fallback -> {crop_path.name}")
    manifest.append({"page": i+1, "score": score, "drawings": d, "full": str(full_path), "crop": str(crop_path), "bbox": [cx0,cy0,cx1,cy1], "area_ratio": 0.6})

import json
with open(out_dir / "manifest.json","w",encoding="utf-8") as f:
    json.dump(manifest,f,indent=2,ensure_ascii=False)
with open(ref_dir / "manifest.json","w",encoding="utf-8") as f:
    json.dump(manifest,f,indent=2,ensure_ascii=False)
print(f"Done. Saved {len(manifest)} crops to {out_dir}")
# also print top pages text snippets for manual inspection
for m in manifest[:5]:
    pg = doc[m["page"]-1]
    txt = pg.get_text()[:600].replace("\n"," | ")
    print(f"Page {m['page']} text: {txt[:500]}")
