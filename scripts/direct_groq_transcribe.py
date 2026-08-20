import json
import glob
import time
import requests
from pathlib import Path

# Load keys
with open("/srv/lumina-notes/config.json", "r", encoding="utf-8") as f:
    cfg = json.load(f)

raw_keys = [k["key"] for k in cfg.get("groq_keys", []) if k.get("key")]
print(f"Loaded {len(raw_keys)} Groq API keys directly.")

chunks = sorted(glob.glob("/home/bryan/transcriptions/groq_chunks/*.mp3"))
print(f"Found {len(chunks)} chunks to transcribe.")

results = []
key_idx = 0

for i, chunk_path in enumerate(chunks):
    print(f"Processing chunk {i+1}/{len(chunks)}: {chunk_path}...")
    success = False
    for attempt in range(len(raw_keys)):
        api_key = raw_keys[(key_idx + attempt) % len(raw_keys)]
        headers = {"Authorization": f"Bearer {api_key}"}
        url = "https://api.groq.com/openai/v1/audio/transcriptions"
        try:
            with open(chunk_path, "rb") as audio_file:
                files = {"file": (Path(chunk_path).name, audio_file, "audio/mpeg")}
                data = {
                    "model": "whisper-large-v3",
                    "language": "es",
                    "response_format": "text",
                    "prompt": "Conversación sobre el examen de ingreso EPN del 19 de agosto, ejercicios de física, química y lenguaje."
                }
                r = requests.post(url, headers=headers, files=files, data=data, timeout=45)
            
            if r.status_code == 200:
                txt = r.text.strip()
                print(f"  ✓ Chunk {i+1} OK ({len(txt)} chars): {txt[:100]}...\n")
                results.append(f"=== CHUNK {i+1} ({Path(chunk_path).name}) ===\n{txt}")
                key_idx = (key_idx + attempt + 1) % len(raw_keys)
                success = True
                break
            else:
                print(f"  Key failed ({r.status_code}): {r.text[:120]}, trying next key...")
        except Exception as e:
            print(f"  Request error: {e}, trying next key...")
        time.sleep(0.5)

    if not success:
        print(f"  FAILED chunk {i+1} across all keys!")

out_file = "/home/bryan/transcriptions/VOICE_260819_GROQ_TRANSCRIPT.txt"
with open(out_file, "w", encoding="utf-8") as f:
    f.write("\n\n".join(results))

print(f"SUCCESS! Finished transcribing {len(results)} chunks to {out_file}")
