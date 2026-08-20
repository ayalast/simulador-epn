with open(r'C:\simulador-epn\tmp-prueba-epn-19ago\INFORME-PRUEBA-19AGO.md', 'r', encoding='utf-8') as f:
    text = f.read()

print("Length of INFORME-PRUEBA-19AGO.md:", len(text))
print(text[:2000])
