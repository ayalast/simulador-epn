import json

with open('items_to_review.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

errors = []

for item in items:
    id = item.get('id', 'unknown')
    if item.get('ans') != 0:
        errors.append(f'{id}: ans is not 0')
    
    exp = item.get('exp', '')
    if 'Paso 1' not in exp or 'Paso 2' not in exp or 'Paso 3' not in exp:
        errors.append(f'{id}: explanation does not have 3 steps')
    
    opts = item.get('opts', [])
    if len(opts) != 4:
        errors.append(f'{id}: does not have exactly 4 opts')
    
    ch = item.get('ch')
    if not ch:
        errors.append(f'{id}: ch is missing')

print(f'Total errors: {len(errors)}')
for e in errors:
    print(e)

