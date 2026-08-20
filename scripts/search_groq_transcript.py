with open(r'C:\simulador-epn\tmp-prueba-epn-19ago\VOICE_260819_GROQ_TRANSCRIPT.txt', 'r', encoding='utf-8') as f:
    text = f.read()

print("Transcript total length:", len(text))

# Let's search for keywords in the transcript: oxígeno, electrones, estequiométrica, reacción, química, física, péndulo, salto, etc.
keywords = ['oxígeno', 'oxigeno', 'electrón', 'electron', 'ganar', 'perder', 'redox', 'reactivo', 'magnesio', 'mgo', 'amoníaco', 'amoniaco', 'fecl', 'salto', 'bloque', 'péndulo', 'arco', 'rampa', 'tesis', 'falacia']

for kw in keywords:
    count = text.lower().count(kw)
    print(f"Keyword '{kw}': {count} occurrences")

# Find occurrences of oxígeno / oxigeno
lines = text.split('\n')
for i, line in enumerate(lines):
    if any(k in line.lower() for k in ['oxíg', 'oxig', 'electr']):
        print(f"\n--- Line {i+1} ---")
        print(line[:300])
