import time, whisper

print("Loading Whisper 'base' model for high-speed complete transcript...")
t0 = time.time()
model = whisper.load_model('base')
print(f"Base model loaded in {time.time()-t0:.1f}s. Transcribing...")
t1 = time.time()
res = model.transcribe('/home/bryan/transcriptions/voice_long.opus', language='es', fp16=False)
print(f"Transcription complete in {time.time()-t1:.1f}s.")

with open('/home/bryan/transcriptions/voice_base_transcript.txt', 'w', encoding='utf-8') as f:
    f.write(res['text'])

print("SUCCESS: Saved /home/bryan/transcriptions/voice_base_transcript.txt!")
