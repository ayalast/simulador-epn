import time, whisper

print("Loading Whisper 'tiny' model...")
t0 = time.time()
model = whisper.load_model('tiny')
print(f"Loaded in {time.time()-t0:.1f}s. Transcribing voice_long.opus...")
t1 = time.time()
res = model.transcribe('/home/bryan/transcriptions/voice_long.opus', language='es', fp16=False)
print(f"DONE in {time.time()-t1:.1f}s!")

with open('/home/bryan/transcriptions/voice_tiny_transcript.txt', 'w', encoding='utf-8') as f:
    f.write(res['text'])
print("Saved /home/bryan/transcriptions/voice_tiny_transcript.txt successfully!")
