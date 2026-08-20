import fs from 'fs';

const code = fs.readFileSync('tmp_epnstudy/index-L76k7MEE.js', 'utf8');

// Find where const $o= starts
const startIdx = code.indexOf('const $o=');
console.log('startIdx of $o:', startIdx);

// Let's find where the array ends
let bracketCount = 0;
let arrayStart = code.indexOf('[', startIdx);
let arrayEnd = -1;

for (let i = arrayStart; i < code.length; i++) {
  if (code[i] === '[') bracketCount++;
  else if (code[i] === ']') {
    bracketCount--;
    if (bracketCount === 0) {
      arrayEnd = i + 1;
      break;
    }
  }
}

console.log('arrayStart:', arrayStart, 'arrayEnd:', arrayEnd);
const topicsCode = 'global.TOPICS = ' + code.slice(arrayStart, arrayEnd) + ';';
eval(topicsCode);
console.log('Successfully evaluated TOPICS! Count:', global.TOPICS.length);

// Now let's find m7 (the quizzes)
const m7Start = code.indexOf('m7=[{id:"f1"');
const qStart = code.indexOf('[', m7Start);
bracketCount = 0;
let qEnd = -1;
for (let i = qStart; i < code.length; i++) {
  if (code[i] === '[') bracketCount++;
  else if (code[i] === ']') {
    bracketCount--;
    if (bracketCount === 0) {
      qEnd = i + 1;
      break;
    }
  }
}

const quizCode = 'global.QUIZZES = ' + code.slice(qStart, qEnd) + ';';
eval(quizCode);
console.log('Successfully evaluated QUIZZES! Count:', global.QUIZZES.length);

// Save structured JSON
fs.writeFileSync('tmp_epnstudy/ref_topics.json', JSON.stringify(global.TOPICS, null, 2));
fs.writeFileSync('tmp_epnstudy/ref_quizzes.json', JSON.stringify(global.QUIZZES, null, 2));
console.log('Saved ref_topics.json and ref_quizzes.json!');
