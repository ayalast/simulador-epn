import sys
import os
import json
import time
import subprocess
from pathlib import Path

sys.path.insert(0, "/srv/lumina-notes/app")
import keypool
import stt

print("Loading Lumina Groq keys from /srv/lumina-notes/config.json...")
with open("/srv/lumina-notes/config.json", "r", encoding="utf-8") as f:
    cfg = json.load(f)

keys = cfg.get("groq_keys", [])
print(f"Loaded {len(keys)} Groq API keys.")

state_path = Path("/home/bryan/transcriptions/key_state.json")
pool = keypool.KeyPool(keys, state_path)

audio_path = Path("/home/bryan/transcriptions/voice_long.opus")
print(f"Audio file: {audio_path}, size: {audio_path.stat().st_size / (1024*1024):.2f} MB")

# Clean old chunks
chunk_dir = Path("/home/bryan/transcriptions/groq_chunks")
if chunk_dir.exists():
    for f in chunk_dir.glob("*"):
        f.unlink()
chunk_dir.mkdir(parents=True, exist_ok=True)

cmd_dur = ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", str(audio_path)]
duration = float(subprocess.check_output(cmd_dur).decode().strip())
print(f"Total duration: {duration:.1f}s ({duration/60:.1f} minutes)")

chunk_sec = 240.0  # 4 minutes per chunk = ~15 chunks total
overlap_sec = 2.0
chunks = []
start = 0.0
idx = 0
while start < duration - 2.0:
    out_chunk = chunk_dir / f"chunk_{idx:04d}.mp3"
    length = min(chunk_sec, duration - start)
    cmd = [
        "ffmpeg", "-y", "-ss", str(start), "-i", str(audio_path),
        "-t", str(length), "-c:a", "libmp3lame", "-b:a", "48k", "-ar", "16000", str(out_chunk)
    ]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
    if out_chunk.exists() and out_chunk.stat().st_size > 4000:
        chunks.append((out_chunk, start, length))
    start += (chunk_sec - overlap_sec)
    idx += 1

print(f"Created {len(chunks)} valid MP3 chunks. Transcribing in parallel with Groq Whisper Large-v3...")

results = []
t0 = time.time()

for idx, (c_path, c_start, c_len) in enumerate(chunks):
    print(f"  Transcribing chunk {idx+1}/{len(chunks)} ({c_start/60:.1f}m - {(c_start+c_len)/60:.1f}m, {c_path.stat().st_size/1024:.1f} KB)...")
    with open(c_path, "rb") as f:
        audio_bytes = f.read()
    try:
        res = stt.transcribe_window(
            audio_bytes,
            c_path.name,
            pool,
            base_url="https://api.groq.com/openai/v1",
            model="whisper-large-v3",
            language="es",
            prompt="Conversación sobre examen de admisión EPN 19 de agosto, física, química, lenguaje, problemas y ejercicios.",
            timeout=60,
            response_format="text"
        )
        txt = res.get("text", "").strip()
        print(f"    -> [{c_start/60:.1f}m]: {txt[:140]}...\n")
        results.append(f"=== [{c_start/60:.1f}m - {(c_start+c_len)/60:.1f}m] ===\n{txt}")
    except Exception as e:
        print(f"    Error on chunk {idx}: {e}")
        # Try next available key directly
        time.sleep(1)

full_transcript = "\n\n".join(results)
out_file = Path("/home/bryan/transcriptions/VOICE_260819_GROQ_TRANSCRIPT.txt")
with open(out_file, "w", encoding="utf-8") as f:
    f.write(full_transcript)

print(f"ALL DONE in {time.time()-t0:.1f}s! Saved to {out_file}")
