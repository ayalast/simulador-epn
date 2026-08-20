with open('tmp-prueba-epn-19ago/VOICE_260819_GROQ_TRANSCRIPT.txt', 'r', encoding='utf-8') as f:
    text = f.read()

print(f"Total transcript length: {len(text)} characters.")
print("\n--- EXTRACTING ALL RELEVANT DISCUSSION PARAGRAPHS ---\n")

import re
paragraphs = text.split("\n\n")
for i, p in enumerate(paragraphs):
    lower = p.lower()
    keywords = [
        'kilogramo', 'fuerza', 'velocidad', 'segundo', 'salta', 'metro',
        'piedra', 'planeta', 'química', 'oxígeno', 'electrón', 'reacción',
        'ch3', 'oh', 'bombeo', 'resorte', 'hooke', 'newton', 'energía',
        'bohr', 'rutherford', 'órbita', 'núcleo', 'nivel', 'ácido', 'balance'
    ]
    if any(k in lower for k in keywords):
        print(f"=== PARAGRAPH {i+1} ===")
        print(p.strip())
        print("-" * 60)
