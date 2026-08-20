import os, time, whisper
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
