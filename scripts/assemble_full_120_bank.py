import json
import ast
import prep_fis_qui_31_40
import prep_packs_7_8

# Load packs 1-6
with open('scripts/build_fql_19ago_bank.py', 'r', encoding='utf-8') as f:
    orig = f.read()

# Load pack 7-8
ns_p = {}
exec(prep_packs_7_8.pack7_code, ns_p) if False else None
extra_packs = ast.literal_eval('[' + prep_packs_7_8.pack7_code + ']')

# Let's read the first 6 packs directly from a clean module or file
with open('scripts/prep_packs_7_8.py', 'r', encoding='utf-8') as f:
    pass

# We have all data
# Let's create build_fql_19ago_bank.py cleanly using json.dumps for the JS export directly
with open('scripts/build_fql_19ago_bank.py', 'r', encoding='utf-8') as f:
    code = f.read()

# Replace null with None if any in python code
code_fixed = code.replace('"fig": null', '"fig": None').replace(': false', ': False').replace(': true', ': True')
with open('scripts/build_fql_19ago_bank.py', 'w', encoding='utf-8') as f:
    f.write(code_fixed)

print("Fixed build_fql_19ago_bank.py syntax.")
