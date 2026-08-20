with open('tmp_epnstudy/index-L76k7MEE.js', 'r', encoding='utf-8') as f:
    code = f.read()

import re

# Find sections / chapters / tabs
sections = re.findall(r'(\{[^{}]*id:\s*"[^"]+"[^{}]*title:\s*"[^"]+"[^{}]*\})', code)
print('Sections found:', len(sections))

# Let's search for the main navigation tabs
tabs = re.findall(r'(\{[^{}]*id:\s*"[^"]+"[^{}]*name:\s*"[^"]+"[^{}]*\})', code)
print('Tabs found:', len(tabs))

# Let's search for "Física", "Química", "Lenguaje", "Fórmulas", "Simulador", "Flashcards"
# Find all text content blocks
blocks = re.findall(r'\"([A-ZÁÉÍÓÚ][^\"]{25,120})\"', code)
print('Sample text blocks:', len(blocks))
for b in blocks[:20]:
    print('•', b)
