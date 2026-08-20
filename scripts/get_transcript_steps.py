import json

with open(r'C:\Users\ASUS ROG\.gemini\antigravity\brain\48adcbfd-54e1-4cc0-a969-13d695e1b060\.system_generated\logs\transcript_full.jsonl', 'r', encoding='utf-8') as f:
    for line in f:
        obj = json.loads(line)
        si = obj.get('step_index')
        if si in range(35, 48):
            print(f"STEP {si}:")
            tc = obj.get('tool_calls')
            if tc:
                for call in tc:
                    print("  Tool:", call.get('name'))
                    print("  Args:", call.get('args'))
