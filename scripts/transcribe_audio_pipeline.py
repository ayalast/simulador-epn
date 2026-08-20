import os
import subprocess
import time

audio_source = r"C:\Users\ASUS ROG\Downloads\Voice 260819_160205.m4a"
compressed_audio = r"C:\Users\ASUS ROG\Downloads\voice_compressed.opus"

print("1. Converting/compressing audio to 16kHz mono OPUS for fast VPS transfer...")
# 16kHz mono opus at 24k bitrate is crystal clear for speech recognition and ~10MB for 1 hour!
cmd_ffmpeg = [
    "ffmpeg", "-y", "-i", audio_source,
    "-ac", "1", "-ar", "16000",
    "-c:a", "libopus", "-b:a", "24k",
    compressed_audio
]
subprocess.run(cmd_ffmpeg, check=True)
size_mb = os.path.getsize(compressed_audio) / (1024 * 1024)
print(f"Compressed audio size: {size_mb:.2f} MB")

print("2. Copying compressed audio to VPS (/home/bryan/transcriptions/voice_long.opus)...")
subprocess.run(["scp", compressed_audio, "vps:/home/bryan/transcriptions/voice_long.opus"], check=True)

print("3. Creating remote transcription script on VPS...")
remote_py = """import os, time, whisper
print("Loading Whisper model (small)...")
t0 = time.time()
model = whisper.load_model('small')
print(f"Model loaded in {time.time()-t0:.1f}s. Transcribing voice_long.opus...")
t1 = time.time()
res = model.transcribe('/home/bryan/transcriptions/voice_long.opus', language='es', fp16=False, verbose=True)
print(f"Transcription finished in {time.time()-t1:.1f}s.")
with open('/home/bryan/transcriptions/voice_long_transcript.txt', 'w', encoding='utf-8') as f:
    f.write(res['text'])
print("Saved /home/bryan/transcriptions/voice_long_transcript.txt successfully!")
"""

with open("scripts/remote_transcribe.py", "w", encoding="utf-8") as f:
    f.write(remote_py)

subprocess.run(["scp", "scripts/remote_transcribe.py", "vps:/home/bryan/transcriptions/remote_transcribe.py"], check=True)

print("4. Starting transcription on VPS in background...")
subprocess.run(["ssh", "vps", "nohup python3 -u /home/bryan/transcriptions/remote_transcribe.py > /home/bryan/transcriptions/remote_transcribe.log 2>&1 &"], check=True)

print("Transcription launched on VPS! You can monitor /home/bryan/transcriptions/remote_transcribe.log.")
