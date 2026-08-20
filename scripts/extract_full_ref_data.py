with open('tmp_epnstudy/index-L76k7MEE.js', 'r', encoding='utf-8') as f:
    code = f.read()

# Let's extract the array definitions for topics and quizzes
import re
import json

# Find the array of cards
# It starts with const $o=[{id:"movimiento" or similar
card_match = re.search(r'(\[\{id:\"movimiento\"[^\;]+\])', code)
if card_match:
    cards_raw = card_match.group(1)
    print("Found cards array raw length:", len(cards_raw))
    with open('tmp_epnstudy/extracted_cards_raw.js', 'w', encoding='utf-8') as out:
        out.write("const TOPICS = " + cards_raw + ";\n")
else:
    print("Cards array not directly matched by regex, searching substring...")
    start = code.find('[{id:"movimiento"')
    end = code.find('}];', start) + 2
    if start != -1 and end != -1:
        cards_raw = code[start:end]
        print(f"Found cards substring: {len(cards_raw)} chars")
        with open('tmp_epnstudy/extracted_cards_raw.js', 'w', encoding='utf-8') as out:
            out.write("const TOPICS = " + cards_raw + ";\n")

# Find the quizzes array
start_q = code.find('[{id:"f1"')
end_q = code.find('}];', start_q) + 2
if start_q != -1 and end_q != -1:
    quiz_raw = code[start_q:end_q]
    print(f"Found quiz substring: {len(quiz_raw)} chars")
    with open('tmp_epnstudy/extracted_quiz_raw.js', 'w', encoding='utf-8') as out:
        out.write("const QUIZZES = " + quiz_raw + ";\n")

print("Data extraction finished!")
