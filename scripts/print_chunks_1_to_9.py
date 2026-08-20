with open('tmp-prueba-epn-19ago/VOICE_260819_GROQ_TRANSCRIPT.txt', 'r', encoding='utf-8') as f:
    text = f.read()

chunks = text.split("=== [")
for i in range(1, min(10, len(chunks))):
    print(f"**************** CHUNK {i} ****************")
    print("=== [" + chunks[i].strip())
    print("\n")
