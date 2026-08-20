import json

with open('guia-bank-fql-19ago.js', 'r', encoding='utf-8') as f:
    text = f.read()

json_text = text.replace('window.GUIA_BANK_FQL_19AGO = ', '').rstrip(';\n ')
bank = json.loads(json_text)
fis_items = bank['fis']

attempt1 = fis_items[:20]
attempt2 = fis_items[20:]

def classify_attempt(name, items):
    print("="*70)
    print(f"--- CLASIFICACIÓN DETALLADA: {name} ---")
    print("="*70)
    
    conceptuales = []
    calculos = []
    
    for i, q in enumerate(items):
        qid = q.get('id', '')
        title = q.get('t', '')
        prompt = q.get('prompt', '')
        opts = q.get('opts', [])
        
        # Check if the options are purely conceptual qualitative statements or numerical values
        opts_are_numerical = sum(1 for o in opts if any(char.isdigit() for char in o)) >= 3
        
        category = "CÁLCULO NUMÉRICO" if opts_are_numerical else "TEORÍA / CONCEPTUAL"
        
        if opts_are_numerical:
            calculos.append((i+21, qid, title, prompt, opts))
        else:
            conceptuales.append((i+21, qid, title, prompt, opts))
            
        print(f"P.{i+21} [{category}] - {title}")
        print(f"     Enunciado: {prompt[:95]}...")
        print(f"     Opciones: {opts[0][:60]} ...\n")
        
    print(f"RESUMEN ESTADÍSTICO PARA {name}:")
    print(f"  • Total preguntas de Física: {len(items)}")
    print(f"  • Preguntas Conceptuales / Teóricas: {len(conceptuales)} ({len(conceptuales)/len(items)*100:.1f}%)")
    print(f"  • Preguntas de Cálculo Numérico: {len(calculos)} ({len(calculos)/len(items)*100:.1f}%)")
    print("="*70 + "\n")
    return conceptuales, calculos

c1, cal1 = classify_attempt("INTENTO 1 (Preguntas 21 a 40)", attempt1)
c2, cal2 = classify_attempt("INTENTO 2 (Preguntas 21 a 40)", attempt2)
