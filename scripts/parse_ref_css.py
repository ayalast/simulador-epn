with open('tmp_epnstudy/index-Bj6pPvbp.css', 'r', encoding='utf-8') as f:
    css = f.read()

print('CSS size:', len(css))

import re

# Find root variables
root_vars = re.findall(r'(--[a-zA-Z0-9_-]+:\s*[^;]+;)', css)
print('Root vars found:', len(root_vars))
for v in root_vars[:30]:
    print(' ', v)

# Find custom classes
custom_classes = re.findall(r'(\.[a-zA-Z0-9_-]+)\s*\{', css)
print('Custom classes sample:')
print(set(custom_classes[:40]))
