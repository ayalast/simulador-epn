/**
 * Genera guia-bank-filtro-rotativo.js
 * 310 ítems originales (10 intentos × 30), más difíciles que las 15 hojas,
 * álgebra de más + todos los temas del intensivo + circunferencia.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const ALL = [];

function gcd(a, b) {
  a = Math.abs(a); b = Math.abs(b);
  while (b) { const t = a % b; a = b; b = t; }
  return a || 1;
}
function Fr(n, d = 1) {
  if (d === 0) throw new Error('den 0');
  if (d < 0) { n = -n; d = -d; }
  const g = gcd(n, d);
  return { n: n / g, d: d / g };
}
function add(a, b) { return Fr(a.n * b.d + b.n * a.d, a.d * b.d); }
function sub(a, b) { return Fr(a.n * b.d - b.n * a.d, a.d * b.d); }
function mul(a, b) { return Fr(a.n * b.n, a.d * b.d); }
function divF(a, b) { return Fr(a.n * b.d, a.d * b.n); }
function powF(a, k) {
  if (k === 0) return Fr(1, 1);
  if (k < 0) return powF(Fr(a.d, a.n), -k);
  return Fr(a.n ** k, a.d ** k);
}
function texF(a) {
  if (a.d === 1) return String(a.n);
  if (a.n < 0) return `-\\dfrac{${-a.n}}{${a.d}}`;
  return `\\dfrac{${a.n}}{${a.d}}`;
}
function texIntPow(base, exp) {
  if (base < 0) return `(-${-base})^{${exp}}`;
  return `${base}^{${exp}}`;
}

function uniq(arr) {
  const s = new Set();
  const out = [];
  for (const x of arr) {
    if (x == null || x === '') continue;
    if (!s.has(x)) { s.add(x); out.push(x); }
  }
  return out;
}

function pack(correct, wrongs, fillers) {
  let opts = uniq([correct, ...wrongs]);
  for (const f of (fillers || [])) {
    if (opts.length >= 4) break;
    if (f !== correct && !opts.includes(f)) opts.push(f);
  }
  if (opts.length < 4) {
    for (let i = 2; opts.length < 4 && i < 40; i++) {
      const cand = `$${i}$`;
      if (!opts.includes(cand)) opts.push(cand);
    }
  }
  opts = opts.slice(0, 4);
  // shuffle but keep track of correct
  const order = [0, 1, 2, 3];
  for (let i = 3; i > 0; i--) {
    const j = (i * 17 + opts[0].length * 3 + ALL.length * 5) % (i + 1);
    const t = order[i]; order[i] = order[j]; order[j] = t;
  }
  const shuffled = order.map((i) => opts[i]);
  const ans = shuffled.indexOf(correct);
  if (ans < 0) throw new Error('correct lost: ' + correct + ' / ' + shuffled.join('|'));
  return { opts: shuffled, ans };
}

function push(o) {
  if (!o.prompt || !o.opts || o.opts.length !== 4) throw new Error('bad q ' + o.id);
  if (new Set(o.opts).size !== 4) throw new Error('dup opts ' + o.id + ' ' + o.opts.join(' | '));
  if (o.ans < 0 || o.ans > 3) throw new Error('ans ' + o.id);
  ALL.push({
    id: o.id,
    fam: o.fam,
    ch: o.ch,
    t: o.t,
    topics: o.topics,
    prompt: o.prompt,
    opts: o.opts,
    ans: o.ans,
    exp: o.exp,
    fig: o.fig || null,
    distractores: o.distractores || o.opts.filter((_, i) => i !== o.ans).map((op) => ({
      opt: op, error: 'No sigue el procedimiento de la explicación.'
    })),
    d: 'dificil'
  });
}

function ds(opts, ans, msgs) {
  const out = [];
  let k = 0;
  opts.forEach((op, i) => {
    if (i === ans) return;
    out.push({ opt: op, error: msgs[k] || 'No sigue el procedimiento de la explicación.' });
    k++;
  });
  return out;
}

let seq = 1;
function nid() { return 'fp-' + String(seq++).padStart(3, '0'); }

/* =====================================================================
   FAMILIAS
   ===================================================================== */

function genPowers() {
  // a^{p} - (-b^{q}) + c^{r}   and variants with (-b)^{q}
  const rows = [
    { kind: 'plain', a: 4, p: 2, b: 2, q: 4, c: 3, r: 3 },
    { kind: 'plain', a: 5, p: 2, b: 2, q: 5, c: 3, r: 2 },
    { kind: 'plain', a: 2, p: 6, b: 3, q: 2, c: 2, r: 4 },
    { kind: 'plain', a: 3, p: 3, b: 2, q: 4, c: 5, r: 2 },
    { kind: 'plain', a: 2, p: 7, b: 2, q: 3, c: 3, r: 3 },
    { kind: 'plain', a: 6, p: 2, b: 2, q: 5, c: 2, r: 3 },
    { kind: 'plain', a: 7, p: 2, b: 3, q: 2, c: 2, r: 5 },
    { kind: 'plain', a: 2, p: 8, b: 2, q: 4, c: 3, r: 3 },
    { kind: 'plain', a: 4, p: 3, b: 2, q: 5, c: 3, r: 2 },
    { kind: 'plain', a: 5, p: 3, b: 2, q: 4, c: 2, r: 3 },
    { kind: 'plain', a: 3, p: 4, b: 2, q: 5, c: 2, r: 3 },
    { kind: 'plain', a: 2, p: 9, b: 2, q: 6, c: 3, r: 2 },
    { kind: 'plain', a: 2, p: 5, b: 3, q: 3, c: 4, r: 2 },
    { kind: 'plain', a: 8, p: 2, b: 2, q: 3, c: 3, r: 3 },
    { kind: 'paren', a: 2, p: 4, b: 2, q: 4, c: 3, r: 2 }, // (-2)^4 - (-2^4) + 3^2
    { kind: 'paren', a: 3, p: 2, b: 3, q: 2, c: 2, r: 4 },
    { kind: 'paren', a: 2, p: 5, b: 2, q: 4, c: 5, r: 2 },
    { kind: 'mix', a: 3, p: 2, b: 2, q: 4, c: 2, r: 3 }, // 3^2*(-2)^0 wait use product
    { kind: 'plain', a: 9, p: 2, b: 2, q: 3, c: 2, r: 5 },
    { kind: 'plain', a: 2, p: 4, b: 5, q: 2, c: 3, r: 3 }
  ];
  rows.forEach((row) => {
    const A = row.a ** row.p;
    const Bpow = row.b ** row.q;           // b^q
    const negB = -Bpow;                    // -b^q
    const C = row.c ** row.r;
    let prompt, correctN, exp;
    if (row.kind === 'plain') {
      // a^p - (-b^q) + c^r = A - (negB) + C = A + Bpow + C
      correctN = A - negB + C;
      prompt = `Calcule $ ${row.a}^{${row.p}}-\\left(-${row.b}^{${row.q}}\\right)+${row.c}^{${row.r}} $.`;
      exp = `Paso 1: el imán del exponente no come el signo suelto, así que $-${row.b}^{${row.q}}=-(${Bpow})=${negB}$. Paso 2: el menos de afuera choca con ese resultado: $-\\left(${negB}\\right)=${Bpow}$. Paso 3: ${A}+${Bpow}+${C}=${correctN}. Si tratas $-${row.b}^{${row.q}}$ como $(-${row.b})^{${row.q}}$, ${row.q % 2 === 0 ? 'el signo se pierde (par) y restas en vez de sumar' : 'cambia el signo del término'}.`;
    } else if (row.kind === 'paren') {
      const paren = ((-row.a) ** row.p);
      correctN = paren - negB + C;
      prompt = `Calcule $ (-${row.a})^{${row.p}}-\\left(-${row.b}^{${row.q}}\\right)+${row.c}^{${row.r}} $.`;
      exp = `Paso 1: el signo sí entra al imán porque está dentro: $(-${row.a})^{${row.p}}=${paren}$. Paso 2: $-${row.b}^{${row.q}}=${negB}$, y menos ese número es $+${Bpow}$. Paso 3: ${paren}+${Bpow}+${C}=${correctN}.`;
    } else {
      //  a^p * 2 - (-b^q) + c^r
      correctN = A * 2 - negB + C;
      prompt = `Calcule $ 2\\cdot ${row.a}^{${row.p}}-\\left(-${row.b}^{${row.q}}\\right)+${row.c}^{${row.r}} $.`;
      exp = `Paso 1: ${row.a}^{${row.p}}=${A}, por $2$ da ${A * 2}. Paso 2: $-${row.b}^{${row.q}}=${negB}$, y menos eso suma ${Bpow}. Paso 3: ${A * 2}+${Bpow}+${C}=${correctN}.`;
    }
    const w1 = A + negB + C; // forgot double negative
    const w2 = A - Bpow + C; // treated as minus b^q
    const w3 = (row.kind === 'paren' ? A : ((-row.a) ** row.p)) - negB + C;
    const { opts, ans } = pack(`$${correctN}$`, [`$${w1}$`, `$${w2}$`, `$${w3}$`], [`$${correctN + 8}$`, `$${correctN - 16}$`, `$${A + C}$`]);
    push({
      id: nid(), fam: 'powers', ch: 'filtro-L01', t: 'Potencias y el imán del signo',
      topics: ['filtro-signos'], prompt, opts, ans, exp,
      distractores: ds(opts, ans, [
        'Te comiste el menos que está delante del paréntesis (doble negativo).',
        'Trataste $-b^{n}$ como si restaras $b^{n}$ y no como $-(b^{n})$.',
        'Confundiste $(-a)^{n}$ con $-a^{n}$ (el imán no come el signo suelto).'
      ])
    });
  });
}

function genProdPow() {
  const rows = [
    { bN: 1, bD: 2, e: [-3, -2, 0, 2, 3] },
    { bN: 1, bD: 3, e: [-2, -1, 0, 1, 2] },
    { bN: 2, bD: 3, e: [-2, 1, 0, 2, -1] },
    { bN: 3, bD: 4, e: [-1, -2, 0, 3, 0] },
    { bN: 2, bD: 5, e: [3, -1, -2, 0, 1] },
    { bN: 4, bD: 5, e: [-2, 2, 1, -1, 0] },
    { bN: 1, bD: 4, e: [-2, 3, -1, 0, 1] },
    { bN: 3, bD: 2, e: [-3, 1, 2, 0, -1] },
    { bN: 5, bD: 2, e: [-1, -1, 0, 2, 1] },
    { bN: 2, bD: 7, e: [2, -3, 1, 0, 1] }
  ];
  rows.forEach((row) => {
    const sum = row.e.reduce((s, x) => s + x, 0);
    const base = Fr(row.bN, row.bD);
    const val = powF(base, sum);
    const pieces = row.e.map((k) => `\\left(${texF(base)}\\right)^{${k}}`).join('\\cdot');
    const prompt = `Calcule $ ${pieces} $.`;
    const exp = `Paso 1: misma base, se suman exponentes: $${row.e.join('+')}=${sum}$. Paso 2: queda $\\left(${texF(base)}\\right)^{${sum}}$. Paso 3: eso vale $${texF(val)}$. El factor con exponente $0$ vale $1$ y no altera el producto.`;
    const wrongs = [
      texF(powF(base, row.e.reduce((s, x) => s + Math.abs(x), 0))),
      texF(powF(base, sum + 1)),
      texF(powF(base, -sum || 1)),
      '0',
      texF(base)
    ].map((s) => `$${s}$`);
    const { opts, ans } = pack(`$${texF(val)}$`, wrongs);
    push({
      id: nid(), fam: 'prod-pow', ch: 'filtro-L01', t: 'Producto de potencias (misma base)',
      topics: ['filtro-potencias'], prompt, opts, ans, exp,
      distractores: ds(opts, ans, [
        'Sumaste los exponentes en valor absoluto, sin respetar los negativos.',
        'Te equivocaste por $1$ al sumar (casi siempre olvidas el $0$).',
        'Invertiste el exponente final o dejaste la base cruda.'
      ])
    });
  });
}

function genFracComb() {
  const rows = [
    { a: [1, 4], b: [2, 3], c: [5, 3], d: [1, 4] },
    { a: [1, 3], b: [3, 4], c: [5, 6], d: [1, 2] },
    { a: [2, 5], b: [1, 2], c: [3, 4], d: [1, 5] },
    { a: [3, 8], b: [1, 2], c: [5, 4], d: [1, 8] },
    { a: [1, 6], b: [2, 3], c: [7, 6], d: [1, 3] },
    { a: [2, 7], b: [1, 2], c: [3, 2], d: [1, 7] },
    { a: [5, 6], b: [1, 3], c: [4, 3], d: [1, 2] },
    { a: [1, 5], b: [3, 4], c: [9, 10], d: [1, 4] },
    { a: [2, 9], b: [1, 3], c: [5, 6], d: [1, 9] },
    { a: [3, 5], b: [1, 4], c: [7, 10], d: [1, 2] },
    { a: [1, 8], b: [3, 4], c: [5, 8], d: [1, 2] },
    { a: [4, 9], b: [1, 6], c: [5, 9], d: [1, 3] },
    { a: [2, 3], b: [1, 6], c: [5, 4], d: [1, 12] },
    { a: [5, 12], b: [1, 3], c: [7, 6], d: [1, 4] },
    { a: [3, 7], b: [1, 2], c: [5, 7], d: [1, 4] },
    { a: [1, 2], b: [2, 5], c: [4, 5], d: [1, 4] },
    { a: [7, 8], b: [1, 4], c: [5, 8], d: [1, 2] },
    { a: [2, 5], b: [3, 10], c: [4, 5], d: [1, 2] },
    { a: [5, 9], b: [1, 2], c: [7, 6], d: [1, 9] },
    { a: [3, 4], b: [1, 5], c: [11, 10], d: [1, 2] }
  ];
  rows.forEach((row) => {
    const A = Fr(row.a[0], row.a[1]);
    const B = Fr(row.b[0], row.b[1]);
    const C = Fr(row.c[0], row.c[1]);
    const D = Fr(row.d[0], row.d[1]);
    const num = powF(add(A, B), 2);
    const den = add(C, D);
    const val = divF(num, den);
    const prompt = `Calcule $\\dfrac{\\left(${texF(A)}+${texF(B)}\\right)^{2}}{${texF(C)}+${texF(D)}}$.`;
    const exp = `Paso 1: arriba, ${texF(A)}+${texF(B)}=${texF(add(A, B))}, y al cuadrado ${texF(num)}. Paso 2: abajo, ${texF(C)}+${texF(D)}=${texF(den)}. Paso 3: el cociente es $${texF(val)}$. No sumes numeradores con denominadores ni te olvides de elevar al cuadrado todo el paréntesis.`;
    const noSq = divF(add(A, B), den);
    const flip = divF(den, num);
    const addOnly = add(add(A, B), den);
    const { opts, ans } = pack(`$${texF(val)}$`, [
      `$${texF(noSq)}$`, `$${texF(flip)}$`, `$${texF(addOnly)}$`
    ], [`$${texF(num)}$`, `$${texF(den)}$`]);
    push({
      id: nid(), fam: 'frac-comb', ch: 'filtro-L01', t: 'Fracción combinada al cuadrado',
      topics: ['filtro-fracciones'], prompt, opts, ans, exp,
      distractores: ds(opts, ans, [
        'Te olvidaste de elevar al cuadrado el paréntesis de arriba.',
        'Invertiste el cociente (pusiste el piso arriba).',
        'Sumaste arriba con abajo en vez de dividir.'
      ])
    });
  });
}

function reduceSqrt(n) {
  let c = 1, r = n;
  for (let i = 2; i * i <= r; i++) {
    while (r % (i * i) === 0) { c *= i; r /= i * i; }
  }
  return { c, r };
}
function texSqrtTerm(c, r) {
  if (c === 0) return '0';
  if (r === 1) return String(c);
  if (c === 1) return `\\sqrt{${r}}`;
  if (c === -1) return `-\\sqrt{${r}}`;
  return `${c}\\sqrt{${r}}`;
}
function texQuad(a, b, c) {
  let s = (a === 1 ? '' : a === -1 ? '-' : String(a)) + 'x^{2}';
  if (b) {
    const coef = Math.abs(b) === 1 ? '' : String(Math.abs(b));
    s += (b > 0 ? '+' : '-') + coef + 'x';
  }
  if (c) s += (c > 0 ? '+' : '') + String(c);
  return s + '=0';
}

function genRadicals() {
  const rows = [
    [72, 32, 8],
    [50, 18, 8],
    [48, 12, 3],
    [75, 12, 3],
    [98, 32, 8],
    [128, 18, 8],
    [200, 32, 8],
    [162, 50, 8],
    [288, 72, 18],
    [147, 48, 3],
    [80, 45, 5],
    [45, 20, 5],
    [27, 12, 48], // 3√3 + 2√3 - 4√3
    [300, 75, 12],
    [242, 32, 8],
    [180, 20, 45],
    [112, 28, 7],
    [63, 28, 7],
    [320, 80, 20],
    [108, 48, 12]
  ];
  rows.forEach((triple, idx) => {
    const terms = triple.map(reduceSqrt);
    const rad = terms[0].r;
    // force same rad by skipping if not
    if (!terms.every((t) => t.r === rad || t.r === 1)) {
      // still allow if we treat as signed combination of first rad
    }
    const signs = idx === 12 ? [1, 1, -1] : [1, -1, -1];
    let coef = 0;
    const parts = [];
    triple.forEach((n, i) => {
      const t = reduceSqrt(n);
      const s = signs[i];
      if (t.r !== rad) {
        // fallback: still emit √n as-is; only use if r matches
      }
      coef += s * t.c;
      parts.push((s < 0 ? '-' : (i === 0 ? '' : '+')) + `\\sqrt{${n}}`);
    });
    const okRad = terms.every((t) => t.r === rad);
    if (!okRad) return;
    const correct = texSqrtTerm(coef, rad);
    const prompt = `Simplifique $ ${parts.join('')} $.`;
    const exp = `Paso 1: saca cuadrados: ${triple.map((n, i) => `\\sqrt{${n}}=${texSqrtTerm(terms[i].c, terms[i].r)}`).join(', ')}. Paso 2: factor común $\\sqrt{${rad}}$. Paso 3: los coeficientes ${terms.map((t, i) => (signs[i] < 0 ? '-' : '+') + t.c).join(' ')} dan ${coef}, o sea $${correct}$. No restes dentro de la raíz.`;
    const joinInside = `\\sqrt{${Math.abs(triple[0] - triple[1] - triple[2])}}`;
    const sumCoef = texSqrtTerm(terms[0].c + terms[1].c + terms[2].c, rad);
    const onlyFirst = texSqrtTerm(terms[0].c, rad);
    const { opts, ans } = pack(`$${correct}$`, [
      `$${joinInside}$`, `$${sumCoef}$`, `$${onlyFirst}$`
    ], [`$0$`, `$\\sqrt{${triple[0]}}$`]);
    push({
      id: nid(), fam: 'radicals', ch: 'filtro-L02', t: 'Restar radicales reducidos',
      topics: ['filtro-radicales'], prompt, opts, ans, exp,
      distractores: ds(opts, ans, [
        'Restaste adentro de la raíz (√a−√b no es √(a−b)).',
        'Sumaste todos los coeficientes sin respetar los signos.',
        'Te quedaste solo con el primer término reducido.'
      ])
    });
  });
}

function genVietaSum() {
  const rows = [
    { a: 2, b: 4, c: 16 },
    { a: 3, b: 6, c: -24 },
    { a: 4, b: -8, c: 3 },
    { a: 5, b: 10, c: 15 },
    { a: 2, b: -6, c: 5 },
    { a: 6, b: 3, c: -3 },
    { a: 1, b: 7, c: 10 },
    { a: 2, b: 0, c: -18 },
    { a: 3, b: -9, c: 6 },
    { a: 4, b: 12, c: 9 },
    { a: 5, b: -5, c: -10 },
    { a: 2, b: 10, c: 8 },
    { a: 3, b: 0, c: 12 },
    { a: 7, b: 14, c: 7 },
    { a: 1, b: -11, c: 24 },
    { a: 2, b: 3, c: -2 },
    { a: 4, b: -4, c: -15 },
    { a: 6, b: -18, c: 12 },
    { a: 5, b: 0, c: -20 },
    { a: 8, b: 4, c: -4 }
  ];
  rows.forEach((row) => {
    const sum = Fr(-row.b, row.a);
    const disc = row.b * row.b - 4 * row.a * row.c;
    const prompt = `De la ecuación $${texQuad(row.a, row.b, row.c)}$, la suma de las raíces (en $\\mathbb{C}$) es:`;
    const exp = `Paso 1: Vieta no pide resolver. Suma $=\\dfrac{-b}{a}=\\dfrac{${-row.b}}{${row.a}}=${texF(sum)}$. Paso 2: el discriminante es $\\Delta=${disc}${disc < 0 ? ' < 0$ (raíces complejas), pero la suma sigue siendo $-b/a$' : '$. Puedes comprobar factorizando si quieres'}. Paso 3: no respondas $b$ ni $-b$ sin dividir entre $a$.`;
    const { opts, ans } = pack(`$${texF(sum)}$`, [
      `$${row.b}$`, `$${ -row.b }$`, `$${texF(Fr(row.c, row.a))}$`
    ], [`$${texF(Fr(-row.b, 1))}$`, `$0$`]);
    push({
      id: nid(), fam: 'vieta-sum', ch: 'filtro-L04', t: 'Vieta: suma de raíces',
      topics: ['filtro-vieta'], prompt, opts, ans, exp,
      distractores: ds(opts, ans, [
        'Te quedaste con el coeficiente $b$ sin el menos ni dividir.',
        'Pusiste $-b$ y no dividiste entre $a$.',
        'Eso es el producto $c/a$, no la suma.'
      ])
    });
  });
}

function genVietaDiff() {
  const rows = [
    { a: 1, b: -5, c: 6 },   // 3,2 → 1
    { a: 1, b: -7, c: 10 },  // 5,2 → 3
    { a: 2, b: -8, c: 6 },   // 3,1 → 2
    { a: 1, b: 1, c: -12 },  // 3,-4 → 7
    { a: 1, b: -9, c: 18 },  // 6,3 → 3
    { a: 3, b: -6, c: -9 },  // 3,-1 → 4
    { a: 1, b: -2, c: -15 }, // 5,-3 → 8
    { a: 2, b: -2, c: -12 }, // 3,-2 → 5
    { a: 1, b: 4, c: -21 },  // 3,-7 → 10
    { a: 4, b: -16, c: 12 }  // 3,1 → 2
  ];
  rows.forEach((row) => {
    const disc = row.b * row.b - 4 * row.a * row.c;
    if (disc < 0) return;
    const diff = Math.sqrt(disc) / Math.abs(row.a);
    if (Math.abs(diff - Math.round(diff * 1000) / 1000) > 1e-9) return;
    const val = Fr(Math.round(diff * 1000), 1000);
    // simplify better if integer
    const nice = Number.isInteger(diff) ? String(diff) : texF(Fr(Math.round(diff * 2), 2));
    const prompt = `Si $\\alpha>\\beta$ son raíces de $${texQuad(row.a, row.b, row.c)}$, entonces $\\alpha-\\beta$ vale:`;
    const exp = `Paso 1: $\\Delta=b^{2}-4ac=${disc}$. Paso 2: $\\alpha-\\beta=\\dfrac{\\sqrt{\\Delta}}{|a|}=\\dfrac{\\sqrt{${disc}}}{${Math.abs(row.a)}}=${nice}$. Paso 3: la suma sería $\\dfrac{${-row.b}}{${row.a}}$, no la restes a ojo.`;
    const { opts, ans } = pack(`$${nice}$`, [
      `$${texF(Fr(-row.b, row.a))}$`,
      `$${Math.sqrt(disc)}$`,
      `$${texF(Fr(row.c, row.a))}$`
    ], [`$0$`, `$${disc}$`]);
    push({
      id: nid(), fam: 'vieta-diff', ch: 'filtro-L04', t: 'Vieta: diferencia de raíces',
      topics: ['filtro-vieta'], prompt, opts, ans, exp,
      distractores: ds(opts, ans, [
        'Eso es la suma $-b/a$, no la diferencia.',
        'Te olvidaste de dividir $\\sqrt{\\Delta}$ entre $|a|$.',
        'Eso es el producto $c/a$.'
      ])
    });
  });
}

function lin(a, va, b, vb) {
  function piece(coef, v, first) {
    if (!coef) return first ? '0' : '';
    const abs = Math.abs(coef);
    const body = abs === 1 ? v : String(abs) + v;
    if (first) return coef < 0 ? '-' + body : body;
    return (coef < 0 ? '-' : '+') + body;
  }
  return piece(a, va, true) + piece(b, vb, false);
}
function genSystems() {
  const sols = [
    [2, 1], [3, 2], [4, -1], [5, 3], [-2, 4], [1, -3], [6, 2], [3, -2],
    [7, 1], [4, 5], [-3, -1], [8, -2], [2, 7], [5, -4], [9, 3], [1, 5],
    [6, -3], [0, 4], [3, 6], [-4, 2]
  ];
  sols.forEach(([x, y], i) => {
    const a1 = 1 + (i % 3);
    const b1 = 2 + (i % 2);
    const a2 = 2 + ((i + 1) % 3);
    const b2 = -1 - (i % 2);
    const c1 = a1 * x + b1 * y;
    const c2 = a2 * x + b2 * y;
    const ask = i % 4;
    let target, label;
    if (ask === 0) { target = x + y; label = 'x+y'; }
    else if (ask === 1) { target = x - y; label = 'x-y'; }
    else if (ask === 2) { target = 2 * x + y; label = '2x+y'; }
    else { target = x * y; label = 'xy'; }
    const prompt = `Del sistema $${lin(a1, 'x', b1, 'y')}=${c1}$, $\\; ${lin(a2, 'x', b2, 'y')}=${c2}$, el valor de $${label}$ es:`;
    const exp = `Paso 1: resuelve el $2\\times 2$. Una vía: multiplica para cancelar. Se obtiene $x=${x}$, $y=${y}$. Paso 2: $${label}=${target}$. Paso 3: comprueba: $${lin(a1, 'x', b1, 'y')}$ con $x=${x}$, $y=${y}$ da ${c1}; $${lin(a2, 'x', b2, 'y')}$ da ${c2}.`;
    const { opts, ans } = pack(`$${target}$`, [
      `$${x}$`, `$${y}$`, `$${x + y === target ? x - y : x + y}$`
    ], [`$${2 * x}$`, `$${c1}$`, `$0$`]);
    push({
      id: nid(), fam: 'systems', ch: 'filtro-L04', t: 'Sistema 2×2 (leer lo que piden)',
      topics: ['filtro-sistemas'], prompt, opts, ans, exp,
      distractores: ds(opts, ans, [
        'Marcaste solo $x$ y no lo que pedían.',
        'Marcaste solo $y$.',
        'Confundiste $x+y$ con $x-y$ (o al revés).'
      ])
    });
  });
}

function genFactor() {
  const items = [
    {
      prompt: 'El desarrollo de $-x(x-2)^{2}$ es:',
      correct: '$-x^{3}+4x^{2}-4x$',
      wrongs: ['$-x^{3}-4x^{2}-4x$', '$(-x^{2}+2x)^{2}$', '$-x^{3}+2x^{2}-4x$'],
      exp: 'Paso 1: abre la caja $(x-2)^{2}=x^{2}-4x+4$. Paso 2: multiplica por $-x$: $-x^{3}+4x^{2}-4x$. Paso 3: el menos de afuera pinta los tres términos. Elevar también el $-x$ es la trampa.'
    },
    {
      prompt: 'El desarrollo de $-x(x+3)^{2}$ es:',
      correct: '$-x^{3}-6x^{2}-9x$',
      wrongs: ['$-x^{3}+6x^{2}-9x$', '$-x^{3}-6x^{2}+9x$', '$(-x^{2}-3x)^{2}$'],
      exp: 'Paso 1: $(x+3)^{2}=x^{2}+6x+9$. Paso 2: $-x(x^{2}+6x+9)=-x^{3}-6x^{2}-9x$. Paso 3: un $+$ en el paréntesis no se salva del menos de afuera.'
    },
    {
      prompt: 'El desarrollo de $2x(x-1)^{2}$ es:',
      correct: '$2x^{3}-4x^{2}+2x$',
      wrongs: ['$2x^{3}-2x^{2}+2x$', '$2x^{3}+4x^{2}+2x$', '$2x^{2}(x-1)$'],
      exp: 'Paso 1: $(x-1)^{2}=x^{2}-2x+1$. Paso 2: $2x(x^{2}-2x+1)=2x^{3}-4x^{2}+2x$. Paso 3: el $2$ y la $x$ de afuera multiplican cada término.'
    },
    {
      prompt: 'La factorización completa de $3x^{3}-12x$ es:',
      correct: '$3x(x-2)(x+2)$',
      wrongs: ['$3x(x^{2}-12)$', '$3x(x-4)(x+1)$', '$x(3x^{2}-12x)$'],
      exp: 'Paso 1: factor común $3x$: $3x(x^{2}-4)$. Paso 2: diferencia de cuadrados $x^{2}-4=(x-2)(x+2)$. Paso 3: $3x(x-2)(x+2)$.'
    },
    {
      prompt: '$(3x-4)(3x+4)$ es igual a:',
      correct: '$9x^{2}-16$',
      wrongs: ['$9x^{2}+16$', '$9x^{2}-12x-16$', '$6x^{2}-16$'],
      exp: 'Paso 1: notable $(a-b)(a+b)=a^{2}-b^{2}$ con $a=3x$, $b=4$. Paso 2: $9x^{2}-16$. Paso 3: no hay término del medio.'
    },
    {
      prompt: '$(2x+5)^{2}$ es igual a:',
      correct: '$4x^{2}+20x+25$',
      wrongs: ['$4x^{2}+25$', '$4x^{2}+10x+25$', '$4x^{2}+20x-25$'],
      exp: 'Paso 1: $(a+b)^{2}=a^{2}+2ab+b^{2}$. Paso 2: $4x^{2}+2\\cdot 2x\\cdot 5+25=4x^{2}+20x+25$. Paso 3: el término del medio es el doble del producto, no $10x$.'
    },
    {
      prompt: 'La factorización de $x^{3}-8$ es:',
      correct: '$(x-2)(x^{2}+2x+4)$',
      wrongs: ['$(x-2)^{3}$', '$(x-2)(x^{2}-2x+4)$', '$(x-8)(x^{2}+1)$'],
      exp: 'Paso 1: diferencia de cubos $a^{3}-b^{3}=(a-b)(a^{2}+ab+b^{2})$ con $a=x$, $b=2$. Paso 2: $(x-2)(x^{2}+2x+4)$. Paso 3: el medio del trinomio es $+ab$, no $-ab$.'
    },
    {
      prompt: 'Factor común completo de $4x^{3}y-8x^{2}y^{2}$:',
      correct: '$4x^{2}y(x-2y)$',
      wrongs: ['$4xy(x^{2}-2xy)$', '$4x^{2}(y-2y^{2})$', '$4x^{2}y(x-2xy)$'],
      exp: 'Paso 1: el común es $4x^{2}y$. Paso 2: $4x^{2}y\\cdot x=4x^{3}y$ y $4x^{2}y\\cdot(-2y)=-8x^{2}y^{2}$. Paso 3: queda $4x^{2}y(x-2y)$.'
    },
    {
      prompt: '$-2x(x+1)^{2}$ desarrollado es:',
      correct: '$-2x^{3}-4x^{2}-2x$',
      wrongs: ['$-2x^{3}+4x^{2}-2x$', '$-2x^{3}-2x^{2}-2x$', '$2x^{3}+4x^{2}+2x$'],
      exp: 'Paso 1: $(x+1)^{2}=x^{2}+2x+1$. Paso 2: $-2x(x^{2}+2x+1)=-2x^{3}-4x^{2}-2x$. Paso 3: el $-2$ pinta todo.'
    },
    {
      prompt: '$x^{2}-10x+25$ factoriza como:',
      correct: '$(x-5)^{2}$',
      wrongs: ['$(x-25)(x+1)$', '$(x+5)^{2}$', '$(x-5)(x+5)$'],
      exp: 'Paso 1: es cuadrado perfecto $a^{2}-2ab+b^{2}$ con $a=x$, $b=5$. Paso 2: $(x-5)^{2}$. Paso 3: $(x+5)^{2}$ tendría $+10x$. $(x-5)(x+5)$ es diferencia de cuadrados, sin término del medio.'
    }
  ];
  items.forEach((it) => {
    const { opts, ans } = pack(it.correct, it.wrongs);
    push({
      id: nid(), fam: 'factor', ch: 'filtro-L03', t: 'Notables y factorización',
      topics: ['filtro-notables'], prompt: it.prompt, opts, ans, exp: it.exp,
      distractores: ds(opts, ans, [
        'Abriste mal el notable (signo del término del medio).',
        'Elevaste también el factor de afuera, o te comiste un término.',
        'Usaste otro notable (diferencia de cuadrados vs cuadrado de binomio).'
      ])
    });
  });
}

function genIneq() {
  const items = [
    {
      prompt: 'Si $x<0$, la expresión $-x(x-2)$ es:',
      correct: 'siempre negativa',
      wrongs: ['siempre positiva', 'cero', 'a veces positiva y a veces negativa'],
      exp: 'Paso 1: $x<0$ ⇒ $-x>0$. Paso 2: $x-2< -2<0$. Paso 3: $(+)\\cdot(-)$ es negativo. Nunca es cero porque $x=0$ y $x=2$ están fuera de $x<0$.'
    },
    {
      prompt: 'Si $x>2$, la expresión $-x(x-2)$ es:',
      correct: 'siempre negativa',
      wrongs: ['siempre positiva', 'cero', 'positiva porque $x$ es grande'],
      exp: 'Paso 1: $x>2>0$ ⇒ $-x<0$. Paso 2: $x-2>0$. Paso 3: $(- )\\cdot(+)$ es negativo.'
    },
    {
      prompt: 'Si $0<x<2$, la expresión $-x(x-2)$ es:',
      correct: 'siempre positiva',
      wrongs: ['siempre negativa', 'cero', 'no se puede saber'],
      exp: 'Paso 1: $x>0$ ⇒ $-x<0$. Paso 2: $x-2<0$. Paso 3: $(- )\\cdot(-)$ es positivo. Los ceros $x=0$ y $x=2$ no entran en el abierto.'
    },
    {
      prompt: 'La inecuación $5-3x\\ge 11$ equivale a:',
      correct: '$x\\le -2$',
      wrongs: ['$x\\ge -2$', '$x\\le 2$', '$x\\ge 2$'],
      exp: 'Paso 1: $-3x\\ge 6$. Paso 2: divides por $-3$ y volteas: $x\\le -2$. Paso 3: si no volteas, marcas $x\\ge -2$ y pierdes el punto.'
    },
    {
      prompt: 'La inecuación $-4x+1<9$ equivale a:',
      correct: '$x> -2$',
      wrongs: ['$x< -2$', '$x>2$', '$x<2$'],
      exp: 'Paso 1: $-4x<8$. Paso 2: divide por $-4$ y voltea: $x> -2$. Paso 3: el $1$ se resta primero, no se divide.'
    },
    {
      prompt: '$|x-3|=5$ tiene soluciones:',
      correct: '$x=8$ y $x=-2$',
      wrongs: ['solo $x=8$', '$x=2$ y $x=-8$', '$x=15$ y $x=-15$'],
      exp: 'Paso 1: dos puertas, $x-3=5$ o $x-3=-5$. Paso 2: $x=8$ o $x=-2$. Paso 3: no es $|x|=2$ ni $|x|=15$.'
    },
    {
      prompt: '$|2x+1|<5$ equivale a:',
      correct: '$-3<x<2$',
      wrongs: ['$x<2$', '$x>-3$', '$x<-3$ o $x>2$'],
      exp: 'Paso 1: $-5<2x+1<5$. Paso 2: $-6<2x<4$. Paso 3: $-3<x<2$. La unión $x<-3$ o $x>2$ sería para $|\\,|>5$.'
    },
    {
      prompt: '$|x+4|\\ge 2$ equivale a:',
      correct: '$x\\le -6$ o $x\\ge -2$',
      wrongs: ['$-6\\le x\\le -2$', '$x\\ge -2$', '$x\\le 2$'],
      exp: 'Paso 1: $|A|\\ge k$ es afuera: $A\\le -k$ o $A\\ge k$. Paso 2: $x+4\\le -2$ o $x+4\\ge 2$. Paso 3: $x\\le -6$ o $x\\ge -2$. El intervalo cerrado del medio es la desigualdad contraria.'
    },
    {
      prompt: 'Si $x<-1$, el signo de $(x+1)(x-4)$ es:',
      correct: 'positivo',
      wrongs: ['negativo', 'cero', 'no se puede saber'],
      exp: 'Paso 1: $x+1<0$ y $x-4<0$. Paso 2: $(- )\\cdot(-)$ es positivo. Paso 3: el cero $x=-1$ no entra.'
    },
    {
      prompt: 'Si $x>4$, el signo de $-x(x+1)(x-4)$ es:',
      correct: 'negativo',
      wrongs: ['positivo', 'cero', 'depende de $x$'],
      exp: 'Paso 1: $x>4$ ⇒ $-x<0$, $x+1>0$, $x-4>0$. Paso 2: $(- )\\cdot(+)\\cdot(+)$ es negativo. Paso 3: tres factores, cuenta los menos.'
    },
    {
      prompt: '$3x-2>5x+6$ equivale a:',
      correct: '$x< -4$',
      wrongs: ['$x> -4$', '$x<4$', '$x>4$'],
      exp: 'Paso 1: $3x-5x>6+2$ ⇒ $-2x>8$. Paso 2: voltea: $x< -4$. Paso 3: pasar $5x$ cambia el signo de ese término, no de toda la desigualdad todavía.'
    },
    {
      prompt: '$|x|=0$ tiene:',
      correct: 'una solución',
      wrongs: ['ninguna', 'dos soluciones', 'infinitas'],
      exp: 'Paso 1: distancia a $0$ igual a $0$. Paso 2: solo $x=0$. Paso 3: las dos puertas caen en el mismo punto.'
    },
    {
      prompt: 'La solución de $|x+1|=|x-5|$ es:',
      correct: '$x=2$',
      wrongs: ['$x=3$', '$x=-1$ y $x=5$', 'ninguna'],
      exp: 'Paso 1: equidistante de $-1$ y de $5$. Paso 2: el punto medio es $x=2$. Paso 3: no son los ceros de cada valor absoluto.'
    },
    {
      prompt: 'Si $x<0$, $-x^{2}$ es:',
      correct: 'siempre negativo (salvo $x=0$, que no entra)',
      wrongs: ['positivo, porque hay un menos y $x$ es negativo', 'cero', 'positivo si $|x|>1$'],
      exp: 'Paso 1: $x^{2}$ siempre $\\ge 0$. Paso 2: el menos de afuera lo pinta: $-x^{2}\\le 0$. Paso 3: con $x\\neq 0$ es estrictamente negativo. El imán: $-x^{2}=-(x^{2})$, no $(-x)^{2}$.'
    },
    {
      prompt: '$2-5x\\le -8$ equivale a:',
      correct: '$x\\ge 2$',
      wrongs: ['$x\\le 2$', '$x\\ge -2$', '$x\\le -2$'],
      exp: 'Paso 1: $-5x\\le -10$. Paso 2: divide por $-5$ y voltea: $x\\ge 2$. Paso 3: dos menos (el del $-5$ y el del $-10$) no se “cancelan” antes de voltear.'
    },
    {
      prompt: 'El conjunto $|x-1|>3$ es:',
      correct: '$x< -2$ o $x>4$',
      wrongs: ['$-2<x<4$', '$x>4$', '$x< -2$'],
      exp: 'Paso 1: afuera de la banda: $x-1< -3$ o $x-1>3$. Paso 2: $x< -2$ o $x>4$. Paso 3: el intervalo abierto del medio es $|x-1|<3$.'
    },
    {
      prompt: 'Si $x\\in (1,3)$, el signo de $(x-1)(x-3)$ es:',
      correct: 'negativo',
      wrongs: ['positivo', 'cero', 'positivo a la izquierda de $2$'],
      exp: 'Paso 1: $x-1>0$ y $x-3<0$ dentro de $(1,3)$. Paso 2: $(+)\\cdot(-)$ es negativo. Paso 3: los ceros no entran en el abierto.'
    },
    {
      prompt: 'La inecuación $\\dfrac{x-2}{x+1}\\ge 0$ se cumple en:',
      correct: '$(-\\infty,-1)\\cup[2,+\\infty)$',
      wrongs: ['$x\\ge 2$', '$(-\\infty,-1]\\cup[2,+\\infty)$', '$[-1,2]$'],
      exp: 'Paso 1: ceros en $x=2$ (entra, $\\ge$) y hoyo en $x=-1$ (nunca entra). Paso 2: signo $+$ en $(-\\infty,-1)$ y en $(2,+\\infty)$. Paso 3: $x=-1$ está prohibido aunque “parezca” frontera.'
    },
    {
      prompt: 'Si $x>0$, $\\dfrac{-x}{x+2}$ es:',
      correct: 'siempre negativo',
      wrongs: ['siempre positivo', 'positivo si $x>2$', 'cero'],
      exp: 'Paso 1: numerador $-x<0$. Paso 2: denominador $x+2>2>0$. Paso 3: negativo sobre positivo es negativo.'
    },
    {
      prompt: '$|3-x|=4$ tiene soluciones:',
      correct: '$x=-1$ y $x=7$',
      wrongs: ['$x=1$ y $x=-7$', 'solo $x=7$', '$x=4$ y $x=-4$'],
      exp: 'Paso 1: $3-x=4$ o $3-x=-4$. Paso 2: $-x=1\\Rightarrow x=-1$; $-x=-7\\Rightarrow x=7$. Paso 3: $|3-x|=|x-3|$, mismas puertas que $|x-3|=4$.'
    }
  ];
  items.forEach((it) => {
    const { opts, ans } = pack(it.correct, it.wrongs);
    push({
      id: nid(), fam: 'ineq', ch: 'filtro-L05', t: 'Inecuaciones y valor absoluto',
      topics: ['filtro-ineq'], prompt: it.prompt, opts, ans, exp: it.exp,
      distractores: ds(opts, ans, [
        'No volteaste al dividir por un negativo, o invertiste el intervalo.',
        'Confundiste las dos puertas del valor absoluto con una sola.',
        'Incluiste un cero o un hoyo que la desigualdad no admite.'
      ])
    });
  });
}

function genDomain() {
  const items = [
    {
      prompt: '$\\dfrac{x^{2}+1}{x^{2}-9}$ no está definida cuando:',
      correct: '$x=3$ o $x=-3$',
      wrongs: ['$x=9$', '$x=0$', '$x=1$'],
      exp: 'Paso 1: el piso $x^{2}-9=0$. Paso 2: $x=\\pm 3$. Paso 3: el $+1$ de arriba no tapa el hoyo. $x=9$ es leer el $9$ como si fuera la raíz.'
    },
    {
      prompt: '$\\dfrac{x+2}{x^{2}-x-6}$ se rompe en:',
      correct: '$x=3$ y $x=-2$',
      wrongs: ['solo $x=3$', 'solo $x=-2$', '$x=6$'],
      exp: 'Paso 1: $x^{2}-x-6=(x-3)(x+2)=0$. Paso 2: hoyos en $x=3$ y $x=-2$. Paso 3: aunque $x+2$ se cancele, el dominio original sigue sin $x=-2$.'
    },
    {
      prompt: '$\\sqrt{2x-8}$ está definida en $\\mathbb{R}$ si:',
      correct: '$x\\ge 4$',
      wrongs: ['$x\\ge 8$', '$x\\ge 2$', '$x>0$'],
      exp: 'Paso 1: adentro $\\ge 0$: $2x-8\\ge 0$. Paso 2: $x\\ge 4$. Paso 3: no pidas $x\\ge 8$ (eso sería $\\sqrt{x-8}$).'
    },
    {
      prompt: '$\\dfrac{1}{\\operatorname{sen} x}$ no existe cuando:',
      correct: '$x=0^{\\circ}+180^{\\circ}k$',
      wrongs: ['$x=90^{\\circ}$', '$x=45^{\\circ}$', 'nunca se rompe'],
      exp: 'Paso 1: $\\operatorname{sen} x=0$. Paso 2: en $0^{\\circ}$, $180^{\\circ}$, $360^{\\circ}$,… Paso 3: en $90^{\\circ}$ el seno es $1$, ahí sí existe y vale $1$.'
    },
    {
      prompt: '$\\tan x$ no existe en:',
      correct: '$90^{\\circ}$ (y $90^{\\circ}+180^{\\circ}k$)',
      wrongs: ['$0^{\\circ}$', '$45^{\\circ}$', '$180^{\\circ}$'],
      exp: 'Paso 1: $\\tan=\\dfrac{\\operatorname{sen}}{\\cos}$, se rompe si $\\cos=0$. Paso 2: $\\cos 90^{\\circ}=0$. Paso 3: en $180^{\\circ}$ el coseno es $-1$, la tangente vale $0$.'
    },
    {
      prompt: 'El dominio de $\\dfrac{x}{x^{2}+4}$ es:',
      correct: 'todos los reales',
      wrongs: ['$x\\neq 2$', '$x\\neq \\pm 2$', '$x\\neq 0$'],
      exp: 'Paso 1: $x^{2}+4=0$ ⇒ $x^{2}=-4$, imposible en $\\mathbb{R}$. Paso 2: no hay hoyo. Paso 3: $x=0$ anula el numerador, no el piso: la función vale $0$, existe.'
    },
    {
      prompt: '$\\dfrac{3}{(x-1)(x+5)}$ no existe si:',
      correct: '$x=1$ o $x=-5$',
      wrongs: ['$x=-1$ o $x=5$', '$x=3$', '$x=0$'],
      exp: 'Paso 1: cada factor del piso $=0$. Paso 2: $x=1$ y $x=-5$. Paso 3: no cambies los signos de las raíces.'
    },
    {
      prompt: 'Si $\\operatorname{sen}\\theta=\\dfrac{5}{4}$, en reales:',
      correct: 'es imposible',
      wrongs: ['$\\cos\\theta=\\dfrac{3}{4}$', '$\\cos\\theta=\\pm\\dfrac{3}{4}$', '$\\theta=90^{\\circ}$'],
      exp: 'Paso 1: $|\\operatorname{sen}\\theta|\\le 1$. Paso 2: $\\dfrac{5}{4}>1$. Paso 3: no hay $\\theta$ real. Inventar un coseno con Pitágoras es fingir que el seno era $\\dfrac{3}{5}$ o $\\dfrac{4}{5}$.'
    },
    {
      prompt: 'El dominio de $\\sqrt{9-x^{2}}$ es:',
      correct: '$-3\\le x\\le 3$',
      wrongs: ['$x\\ge 3$', '$x\\le 9$', 'todos los reales'],
      exp: 'Paso 1: $9-x^{2}\\ge 0$ ⇒ $x^{2}\\le 9$. Paso 2: $-3\\le x\\le 3$. Paso 3: es el diametro del semicírculo, no $x\\ge 3$.'
    },
    {
      prompt: '$\\dfrac{x^{2}-1}{x-1}$ vista como función original no está definida en:',
      correct: '$x=1$',
      wrongs: ['$x=-1$', '$x=0$', 'está definida en todos lados porque se simplifica'],
      exp: 'Paso 1: el piso original es $x-1$. Paso 2: hoyo en $x=1$. Paso 3: después de cancelar queda $x+1$ con un hueco: $f(1)$ no existía. El $-1$ anula el numerador, no el dominio.'
    }
  ];
  items.forEach((it) => {
    const { opts, ans } = pack(it.correct, it.wrongs);
    push({
      id: nid(), fam: 'domain', ch: 'filtro-L02', t: 'Dominio y hoyos',
      topics: ['filtro-dominio'], prompt: it.prompt, opts, ans, exp: it.exp,
      distractores: ds(opts, ans, [
        'Leíste el número que se ve (el $9$, el $4$) como si fuera la raíz.',
        'Cancelaste un factor y borraste el hoyo del dominio original.',
        'Confundiste un cero del numerador con un hoyo.'
      ])
    });
  });
}

function genCongruence() {
  const items = [
    {
      prompt: 'Si $\\triangle ACB \\cong \\triangle DFE$, el ángulo $\\angle B$ corresponde a:',
      correct: '$\\angle E$',
      wrongs: ['$\\angle D$', '$\\angle F$', '$\\angle A$'],
      exp: 'Paso 1: el nombre es la lista: $A\\leftrightarrow D$, $C\\leftrightarrow F$, $B\\leftrightarrow E$. Paso 2: $B$ es la tercera letra y viaja con $E$. Paso 3: no mires “el de abajo a la izquierda” del dibujo.',
      fig: { type: 'filtro', name: 'cong-acb-dfe' }
    },
    {
      prompt: 'Si $\\triangle ACB \\cong \\triangle DFE$, el lado $CB$ corresponde a:',
      correct: '$FE$',
      wrongs: ['$DF$', '$DE$', '$ED$'],
      exp: 'Paso 1: $C\\leftrightarrow F$ y $B\\leftrightarrow E$. Paso 2: $CB\\leftrightarrow FE$. Paso 3: $DE$ es $AB$; $DF$ es $AC$.'
    },
    {
      prompt: 'Si $\\triangle PQR \\cong \\triangle XYZ$, $\\angle Q$ corresponde a:',
      correct: '$\\angle Y$',
      wrongs: ['$\\angle X$', '$\\angle Z$', '$\\angle P$'],
      exp: 'Paso 1: segunda letra con segunda: $Q\\leftrightarrow Y$. Paso 2: no es $X$ (eso es $P$) ni $Z$ (eso es $R$). Paso 3: el orden del nombre manda.'
    },
    {
      prompt: 'Si $\\triangle ABC \\cong \\triangle CBA$, se puede afirmar que el triángulo es:',
      correct: 'isósceles con $AB=CB$ (y más simetrías posibles)',
      wrongs: ['necesariamente equilátero', 'necesariamente rectángulo', 'imposible'],
      exp: 'Paso 1: $A\\leftrightarrow C$, $B\\leftrightarrow B$, $C\\leftrightarrow A$. Paso 2: $AB\\leftrightarrow CB$, luego $AB=CB$. Paso 3: isósceles en $B$. Equilátero solo si además $AC=AB$.'
    },
    {
      prompt: '¿Cuál criterio SÍ demuestra congruencia?',
      correct: 'LAL (ángulo incluido)',
      wrongs: ['LLA (ángulo no incluido)', 'AAA', 'dos lados cualesquiera'],
      exp: 'Paso 1: LAL, LLL y ALA sí. Paso 2: LLA es el caso ambiguo. Paso 3: AAA es semejanza, no copia.',
      fig: { type: 'filtro', name: 'cong-rules' }
    },
    {
      prompt: '¿Cuál NO demuestra congruencia?',
      correct: 'LLA',
      wrongs: ['LLL', 'LAL', 'ALA'],
      exp: 'Paso 1: LLA (SSA) puede armar dos triángulos distintos. Paso 2: LLL, LAL y ALA sí copian. Paso 3: si el examen pregunta “cuál no”, casi siempre es LLA.'
    },
    {
      prompt: 'AAA garantiza:',
      correct: 'semejanza, no congruencia',
      wrongs: ['congruencia', 'que los lados son iguales', 'nada'],
      exp: 'Paso 1: mismos ángulos ⇒ misma forma. Paso 2: el tamaño queda libre (fotocopia agrandada). Paso 3: para copia hace falta al menos un lado.'
    },
    {
      prompt: 'Si $\\triangle ABC \\sim \\triangle DEF$ (no congruentes) y $AB=6$, $DE=9$, $BC=8$, entonces $EF$ vale:',
      correct: '$12$',
      wrongs: ['$8$', '$11$', '$4$'],
      exp: 'Paso 1: razón $\\dfrac{9}{6}=\\dfrac{3}{2}$. Paso 2: $EF=8\\cdot\\dfrac{3}{2}=12$. Paso 3: $BC$ viaja con $EF$ (2.ª–3.ª letras).'
    },
    {
      prompt: 'Dos triángulos con lados $5,7,9$ y $5,7,8$ son:',
      correct: 'ni congruentes ni (por LLL) iguales',
      wrongs: ['congruentes por LLL', 'congruentes por LAL', 'semejantes sí o sí'],
      exp: 'Paso 1: LLL exige los tres lados iguales. Paso 2: $9\\neq 8$. Paso 3: las razones $5/5$, $7/7$, $9/8$ no coinciden: tampoco semejanza.'
    },
    {
      prompt: 'En $\\triangle ABC \\cong \\triangle DEF$, si $AC=17$ y $AC$ mira a $\\angle B$, entonces el lado que mira a $\\angle E$ mide:',
      correct: '$17$',
      wrongs: ['no se puede saber', '$8{,}5$', 'el que mira a $\\angle D$'],
      exp: 'Paso 1: $B\\leftrightarrow E$. Paso 2: lo que mira a $B$ mira a $E$. Paso 3: ese lado es $17$.',
      fig: { type: 'filtro', name: 'opp-same' }
    },
    {
      prompt: 'LAL exige que el ángulo esté:',
      correct: 'incluido (entre los dos lados)',
      wrongs: ['enfrente de uno de los lados', 'en cualquier vértice', 'siempre en $A$'],
      exp: 'Paso 1: LAL = lado-ángulo-lado, el ángulo del medio. Paso 2: si el ángulo no está entre esos lados, es LLA (ambiguo). Paso 3: el nombre del vértice no importa, importa la posición.'
    },
    {
      prompt: 'Si $\\triangle MNP \\cong \\triangle PMN$, entonces:',
      correct: '$MN=PM$, $NP=MN$ y $PM=NP$ (equilátero)',
      wrongs: ['solo isósceles', 'rectángulo', 'imposible'],
      exp: 'Paso 1: $M\\leftrightarrow P$, $N\\leftrightarrow M$, $P\\leftrightarrow N$. Paso 2: $MN=PM$, $NP=MN$, $PM=NP$. Paso 3: los tres lados iguales: equilátero.'
    },
    {
      prompt: 'Un criterio válido de semejanza (no de congruencia) es:',
      correct: 'AA',
      wrongs: ['LLL de copias iguales', 'LAL de copias iguales', 'HC'],
      exp: 'Paso 1: dos ángulos iguales bastan para $\\sim$ (el tercero cae solo). Paso 2: LLL/LAL/HC con medidas iguales dan $\\cong$. Paso 3: no uses AAA como si fueran copias.'
    },
    {
      prompt: 'Si $\\triangle ABC \\cong \\triangle ACB$, el triángulo es:',
      correct: 'isósceles con $AB=AC$',
      wrongs: ['equilátero siempre', 'escaleno', 'rectángulo en $A$'],
      exp: 'Paso 1: $B\\leftrightarrow C$ y $C\\leftrightarrow B$. Paso 2: $AB\\leftrightarrow AC$. Paso 3: $AB=AC$, isósceles en $A$. Equilátero solo si también $BC=AB$.'
    },
    {
      prompt: 'AAL (dos ángulos y un lado no incluido):',
      correct: 'sí da congruencia, porque el tercer ángulo queda fijo y se vuelve ALA',
      wrongs: ['es inválido, como LLA', 'solo da semejanza', 'hace falta Pitágoras'],
      exp: 'Paso 1: dos ángulos ⇒ el tercero es $180$ menos la suma. Paso 2: ya tienes ALA. Paso 3: no es un cuarto caso que debas memorizar aparte; LLA sigue siendo el peligroso.'
    },
    {
      prompt: 'HC (hipotenusa y cateto) sirve solo si:',
      correct: 'hay un ángulo de $90^{\\circ}$',
      wrongs: ['el triángulo es acutángulo', 'siempre, en cualquier triángulo', 'solo en equiláteros'],
      exp: 'Paso 1: H y C hablan de hipotenusa. Paso 2: eso exige $90^{\\circ}$. Paso 3: si no ves el recto, no invoques HC.'
    },
    {
      prompt: 'Si $\\triangle ABC \\sim \\triangle DEF$ con razón $2:5$ y el perímetro de $ABC$ es $14$, el de $DEF$ es:',
      correct: '$35$',
      wrongs: ['$28$', '$19$', '$7$'],
      exp: 'Paso 1: los perímetros van en la misma razón que los lados. Paso 2: $14\\cdot\\dfrac{5}{2}=35$. Paso 3: no sumes $2+5$ al perímetro.'
    },
    {
      prompt: '$\\triangle ABC$ tiene $AB=c$, $BC=a$, $CA=b$. Si $\\triangle ABC \\cong \\triangle BCA$, entonces:',
      correct: '$a=b=c$ (equilátero)',
      wrongs: ['solo $a=b$', 'solo rectángulo', 'nada se puede decir'],
      exp: 'Paso 1: $A\\leftrightarrow B$, $B\\leftrightarrow C$, $C\\leftrightarrow A$. Paso 2: $AB=BC$, $BC=CA$, $CA=AB$. Paso 3: los tres iguales.'
    },
    {
      prompt: 'Dos triángulos rectángulos con un agudo de $37^{\\circ}$ cada uno son:',
      correct: 'semejantes (AA)',
      wrongs: ['congruentes siempre', 'nada en común', 'solo isósceles'],
      exp: 'Paso 1: $90^{\\circ}$ común y $37^{\\circ}$ común. Paso 2: AA ⇒ $\\sim$. Paso 3: sin un lado igual, no hay $\\cong$.'
    },
    {
      prompt: 'Si $\\angle A \\cong \\angle D$, $\\angle B \\cong \\angle E$ y $AB=DE$, los triángulos $ABC$ y $DEF$ son:',
      correct: 'congruentes por ALA (el lado $AB$ está entre $A$ y $B$)',
      wrongs: ['solo semejantes', 'congruentes por LAL', 'insuficiente'],
      exp: 'Paso 1: ángulos $A,B$ y el lado que los une $AB$. Paso 2: eso es ALA. Paso 3: LAL sería dos lados y el ángulo del medio.'
    }
  ];
  items.forEach((it) => {
    const { opts, ans } = pack(it.correct, it.wrongs);
    push({
      id: nid(), fam: 'congruence', ch: 'filtro-L07', t: 'Correspondencia y criterios',
      topics: ['filtro-congruencia'], prompt: it.prompt, opts, ans, exp: it.exp,
      fig: it.fig || null,
      distractores: ds(opts, ans, [
        'Emparejaste por la posición en el dibujo, no por el orden de las letras.',
        'Usaste un criterio que no copia (LLA o AAA).',
        'Confundiste semejanza con congruencia.'
      ])
    });
  });
}

function genSimilarity() {
  // Right triangle, altitude to hypotenuse: geometric mean
  // legs p,q hyp r; altitude h = pq/r; segments p^2/r and q^2/r
  const triples = [
    [3, 4, 5],
    [5, 12, 13],
    [8, 15, 17],
    [7, 24, 25],
    [20, 21, 29],
    [9, 12, 15],
    [6, 8, 10],
    [12, 16, 20],
    [9, 40, 41],
    [11, 60, 61]
  ];
  triples.forEach(([p, q, r], i) => {
    const h2 = p * p * q * q; // h = pq/r so h^2 = p^2 q^2 / r^2
    const htex = `\\dfrac{${p * q}}{${r}}`;
    const segP = `\\dfrac{${p * p}}{${r}}`;
    const ask = i % 3;
    let prompt, correct, exp, wrongs;
    if (ask === 0) {
      prompt = `En un triángulo rectángulo de catetos $${p}$ y $${q}$ e hipotenusa $${r}$, la altura sobre la hipotenusa mide:`;
      correct = `$${htex}$`;
      wrongs = [`$${p}$`, `$${texF(Fr(p + q, 2))}$`, `$\\dfrac{${r}}{2}$`];
      exp = `Paso 1: área de dos modos: $\\dfrac{${p}\\cdot${q}}{2}=\\dfrac{${r}\\cdot h}{2}$. Paso 2: $h=\\dfrac{${p * q}}{${r}}$. Paso 3: también $h^{2}=$ producto de los dos segmentos de la hipotenusa.`;
    } else if (ask === 1) {
      prompt = `Rectángulo en $C$, catetos $AC=${p}$, $BC=${q}$, hipotenusa $AB=${r}$. El segmento de la hipotenusa adyacente a $A$ (proyección de $AC$) mide:`;
      correct = `$${segP}$`;
      wrongs = [`$${htex}$`, `$\\dfrac{${q * q}}{${r}}$`, `$${p}$`];
      exp = `Paso 1: $\\triangle AC\\text{-hip} \\sim \\triangle ABC$. Paso 2: $\\dfrac{AC}{AB}=\\dfrac{AD}{AC}$ ⇒ $AC^{2}=AD\\cdot AB$. Paso 3: $AD=\\dfrac{${p}^{2}}{${r}}=\\dfrac{${p * p}}{${r}}$.`;
    } else {
      prompt = `En el triángulo rectángulo de catetos $${p}$, $${q}$ e hipotenusa $${r}$, los tres triángulos que arma la altura sobre la hipotenusa son:`;
      correct: correct = 'semejantes entre sí (y al grande)';
      wrongs = ['solo congruentes', 'nada que ver', 'equiláteros'];
      exp = `Paso 1: cada triángulo chico comparte un agudo con el grande. Paso 2: AA ⇒ los tres $\\sim$. Paso 3: no son copias (salvo isósceles $45$-$45$-$90$).`;
    }
    const { opts, ans } = pack(correct, wrongs);
    push({
      id: nid(), fam: 'similarity', ch: 'filtro-L07', t: 'Semejanza y altura a la hipotenusa',
      topics: ['filtro-semejanza'], prompt, opts, ans, exp,
      fig: { type: 'filtro', name: 'alt-hyp' },
      distractores: ds(opts, ans, [
        'Usaste un cateto o la mitad de la hipotenusa en vez de la media geométrica.',
        'Confundiste la altura con la proyección de un cateto.',
        'Llamaste congruencia a lo que solo es semejanza.'
      ])
    });
  });
}

function genParallels() {
  const items = [
    {
      prompt: 'Dos rectas paralelas cortadas por una transversal. $\\alpha$ es el ángulo exterior superior derecho y $\\beta$ el exterior inferior izquierdo. Se puede afirmar que:',
      correct: '$\\alpha=\\beta$ (alternos externos)',
      wrongs: ['$\\alpha+\\beta=180^{\\circ}$', '$\\alpha=2\\beta$', '$\\alpha+\\beta=90^{\\circ}$'],
      exp: 'Paso 1: alternos externos están en lados distintos de la transversal y fuera de la franja. Paso 2: con paralelas, son iguales. Paso 3: quienes suman $180^{\\circ}$ son los colaterales internos.',
      fig: { type: 'filtro', name: 'par-alpha-beta' }
    },
    {
      prompt: 'Entre paralelas, dos colaterales internos de $3x+10$ y $2x+20$ (grados) dan $x$ igual a:',
      correct: '$30$',
      wrongs: ['$10$', '$18$', '$40$'],
      exp: 'Paso 1: colaterales internos suman $180^{\\circ}$. Paso 2: $5x+30=180$. Paso 3: $5x=150$, $x=30$. Si los igualas, estás pensando en correspondientes.'
    },
    {
      prompt: 'Correspondientes entre paralelas miden $4x-5$ y $3x+15$. Entonces $x$ vale:',
      correct: '$20$',
      wrongs: ['$10$', '$36$', '$5$'],
      exp: 'Paso 1: correspondientes son iguales. Paso 2: $4x-5=3x+15$. Paso 3: $x=20$. Si sumas $180$, los trataste como colaterales.'
    },
    {
      prompt: 'Un par de opuestos por el vértice mide $2x+7$ y $5x-20$. $x$ vale:',
      correct: '$9$',
      wrongs: ['$27$', '$13$', '$4$'],
      exp: 'Paso 1: opuestos por el vértice son iguales (no hace falta paralelas). Paso 2: $2x+7=5x-20$. Paso 3: $27=3x$, $x=9$.'
    },
    {
      prompt: 'El exterior de un triángulo, alargando un lado, mide:',
      correct: 'la suma de los dos interiores que no lo tocan',
      wrongs: ['$180^{\\circ}$ menos el ángulo vecino solamente', 'siempre $90^{\\circ}$', 'el triple del menor'],
      exp: 'Paso 1: interiores suman $180$. Paso 2: el llano en el vértice también. Paso 3: el exterior $= $ los dos lejanos. Atajo: no hace falta hallar el tercero.',
      fig: { type: 'filtro', name: 'exterior-angle' }
    },
    {
      prompt: 'Interiores de un triángulo $2x$, $3x$ y $4x$. El mayor mide:',
      correct: '$80^{\\circ}$',
      wrongs: ['$90^{\\circ}$', '$40^{\\circ}$', '$120^{\\circ}$'],
      exp: 'Paso 1: $9x=180$, $x=20$. Paso 2: el mayor es $4x=80^{\\circ}$. Paso 3: no es rectángulo.'
    },
    {
      prompt: 'Un ángulo interior de $70^{\\circ}$ y otro de $45^{\\circ}$. El exterior en el tercer vértice mide:',
      correct: '$115^{\\circ}$',
      wrongs: ['$110^{\\circ}$', '$65^{\\circ}$', '$25^{\\circ}$'],
      exp: 'Paso 1: atajo, exterior $=$ los dos lejanos $70+45=115$. Paso 2: el interior del tercer vértice sería $65$, y $180-65=115$. Paso 3: $110$ es un $180-70$ a medias.'
    },
    {
      prompt: 'Si $AB\\parallel CD$ y una transversal forma $65^{\\circ}$ con $AB$, el correspondiente en $CD$ mide:',
      correct: '$65^{\\circ}$',
      wrongs: ['$115^{\\circ}$', '$25^{\\circ}$', '$90^{\\circ}$'],
      exp: 'Paso 1: correspondientes iguales. Paso 2: $65^{\\circ}$. Paso 3: $115$ sería el colateral ($180-65$).',
      fig: { type: 'filtro', name: 'right-angles-perp' }
    },
    {
      prompt: 'Tres exteriores de un triángulo (uno por vértice) suman:',
      correct: '$360^{\\circ}$',
      wrongs: ['$180^{\\circ}$', '$270^{\\circ}$', '$90^{\\circ}$'],
      exp: 'Paso 1: cada exterior $= $ suma de los dos interiores lejanos. Paso 2: al sumar los tres, cada interior aparece dos veces: $2\\cdot 180=360$. Paso 3: no suman $180$.'
    },
    {
      prompt: 'El lado más largo de un triángulo queda frente a:',
      correct: 'el ángulo más grande',
      wrongs: ['el ángulo más chico', 'siempre al $90^{\\circ}$', 'un ángulo de $60^{\\circ}$'],
      exp: 'Paso 1: ángulo grande $\\leftrightarrow$ lado de enfrente grande. Paso 2: solo si hay $90^{\\circ}$ el lado más largo es la hipotenusa. Paso 3: en un acutángulo no hay hipotenusa.',
      fig: { type: 'filtro', name: 'bigger-side' }
    }
  ];
  items.forEach((it) => {
    const { opts, ans } = pack(it.correct, it.wrongs);
    push({
      id: nid(), fam: 'parallels', ch: 'filtro-L06', t: 'Paralelas, exteriores y lados',
      topics: ['filtro-angulos'], prompt: it.prompt, opts, ans, exp: it.exp,
      fig: it.fig || null,
      distractores: ds(opts, ans, [
        'Confundiste correspondientes (iguales) con colaterales (suman $180^{\\circ}$).',
        'Tomaste el exterior como $180$ menos un solo vecino.',
        'Invertiste “ángulo grande mira lado grande”.'
      ])
    });
  });
}

function genThales() {
  const rows = [
    { a: 2, A: 8, b: 3 },
    { a: 3, A: 12, b: 5 },
    { a: 4, A: 10, b: 6 },
    { a: 5, A: 15, b: 4 },
    { a: 2, A: 6, b: 5 },
    { a: 6, A: 9, b: 8 },
    { a: 3, A: 9, b: 7 },
    { a: 4, A: 14, b: 6 },
    { a: 5, A: 8, b: 10 },
    { a: 2, A: 5, b: 8 }
  ];
  rows.forEach((row) => {
    // OA' = a, OA = A, OB' = b, find OB or the long piece
    const OB = Fr(row.b * row.A, row.a);
    const long = sub(OB, Fr(row.b, 1));
    const prompt = `Un rayo desde $O$ corta dos paralelas: el tramo corto mide $${row.a}$ y el total hasta la segunda es $${row.A}$. Otro rayo tiene tramo corto $${row.b}$. El tramo largo de ese segundo rayo mide:`;
    const exp = `Paso 1: Tales $\\dfrac{OA'}{OA}=\\dfrac{OB'}{OB}$ ⇒ $\\dfrac{${row.a}}{${row.A}}=\\dfrac{${row.b}}{OB}$. Paso 2: $OB=\\dfrac{${row.b}\\cdot${row.A}}{${row.a}}=${texF(OB)}$. Paso 3: el tramo largo es $OB-${row.b}=${texF(long)}$. No restes los cortos a ciegas.`;
    const { opts, ans } = pack(`$${texF(long)}$`, [
      `$${texF(OB)}$`,
      `$${row.b + (row.A - row.a)}$`,
      `$${texF(Fr(row.b * row.a, row.A))}$`
    ], [`$${row.A - row.a}$`, `$${row.b}$`]);
    push({
      id: nid(), fam: 'thales', ch: 'filtro-L06', t: 'Tales numérico',
      topics: ['filtro-tales'], prompt, opts, ans, exp,
      fig: { type: 'filtro', name: 'thales' },
      distractores: ds(opts, ans, [
        'Eso es el total OB, no el tramo largo OB menos el corto.',
        'Sumaste la diferencia del primer rayo al corto del segundo (no es Tales).',
        'Invertiste la proporción.'
      ])
    });
  });
}

function genCosines() {
  const rows = [
    { a: 5, b: 7, c: 7 },
    { a: 6, b: 8, c: 8 },
    { a: 4, b: 6, c: 7 },
    { a: 5, b: 5, c: 6 },
    { a: 7, b: 9, c: 10 },
    { a: 8, b: 8, c: 6 },
    { a: 3, b: 5, c: 6 },
    { a: 9, b: 10, c: 13 },
    { a: 5, b: 9, c: 9 },
    { a: 6, b: 7, c: 9 }
  ];
  rows.forEach((row, i) => {
    const num = row.b * row.b + row.c * row.c - row.a * row.a;
    const den = 2 * row.b * row.c;
    const cosA = Fr(num, den);
    if (i % 2 === 0) {
      const prompt = `En un triángulo con $a=${row.a}$, $b=${row.b}$, $c=${row.c}$, $\\cos A$ vale:`;
      const exp = `Paso 1: $\\cos A=\\dfrac{b^{2}+c^{2}-a^{2}}{2bc}$. Paso 2: numerador ${row.b}^{2}+${row.c}^{2}-${row.a}^{2}=${num}. Paso 3: denominador $2\\cdot${row.b}\\cdot${row.c}=${den}$. Queda $${texF(cosA)}$. El lado que se resta es el de enfrente de $A$.`;
      const flip = Fr(row.a * row.a + row.b * row.b - row.c * row.c, 2 * row.a * row.b);
      const plus = Fr(row.b * row.b + row.c * row.c + row.a * row.a, den);
      const { opts, ans } = pack(`$${texF(cosA)}$`, [
        `$${texF(flip)}$`, `$${texF(plus)}$`, `$${texF(Fr(num, row.b * row.c))}$`
      ]);
      push({
        id: nid(), fam: 'cosines', ch: 'filtro-L08', t: 'Ley de cosenos (valor)',
        topics: ['filtro-cosenos'], prompt, opts, ans, exp,
        fig: { type: 'filtro', name: 'law-cosines' },
        distractores: ds(opts, ans, [
          'Restaste otro lado (el de enfrente de $C$ o $B$).',
          'Escribiste $+a^{2}$ en vez de $-a^{2}$.',
          'Te olvidaste del $2$ del denominador.'
        ])
      });
    } else {
      const prompt = `Con lados $a=${row.a}$, $b=${row.b}$, $c=${row.c}$, la forma correcta de $\\cos A$ es:`;
      const correct = `$\\dfrac{b^{2}+c^{2}-a^{2}}{2bc}$`;
      const wrongs = [
        `$\\dfrac{a^{2}+b^{2}-c^{2}}{2ab}$`,
        `$\\dfrac{b^{2}+c^{2}+a^{2}}{2bc}$`,
        `$\\dfrac{a}{b+c}$`
      ];
      const exp = `Paso 1: el lado que se resta es el opuesto al ángulo. Paso 2: opuesto a $A$ es $a$. Paso 3: denominador $2bc$ (los otros dos). La opción con $+a^{2}$ cambia el signo de cosenos.`;
      const { opts, ans } = pack(correct, wrongs);
      push({
        id: nid(), fam: 'cosines', ch: 'filtro-L08', t: 'Ley de cosenos (forma)',
        topics: ['filtro-cosenos'], prompt, opts, ans, exp,
        fig: { type: 'filtro', name: 'law-cosines' },
        distractores: ds(opts, ans, [
          'Esa es la forma de $\\cos C$, no de $\\cos A$.',
          'El signo del $a^{2}$ es menos, no más.',
          'Eso no es la ley de cosenos.'
        ])
      });
    }
  });
}

function genSinesPit() {
  const items = [
    { prompt: 'Un triángulo de lados $9$, $12$, $15$ es:', correct: 'rectángulo', wrongs: ['acutángulo', 'obtusángulo', 'imposible'], exp: 'Paso 1: $9^{2}+12^{2}=81+144=225=15^{2}$. Paso 2: Pitágoras se cumple. Paso 3: es el $3$-$4$-$5$ multiplicado por $3$.' },
    { prompt: 'Lados $6$, $8$, $11$. El triángulo es:', correct: 'obtusángulo', wrongs: ['rectángulo', 'acutángulo', 'imposible'], exp: 'Paso 1: $6^{2}+8^{2}=36+64=100$, $11^{2}=121>100$. Paso 2: $c^{2}>a^{2}+b^{2}$ ⇒ obtuso. Paso 3: si fuera $10$ sería rectángulo ($6$-$8$-$10$).' },
    { prompt: 'Lados $5$, $7$, $8$. El triángulo es:', correct: 'acutángulo', wrongs: ['rectángulo', 'obtusángulo', 'imposible'], exp: 'Paso 1: $5^{2}+7^{2}=25+49=74$, $8^{2}=64<74$. Paso 2: también $5^{2}+8^{2}>7^{2}$ y $7^{2}+8^{2}>5^{2}$. Paso 3: los tres $c^{2}<a^{2}+b^{2}$ ⇒ acutángulo.' },
    { prompt: 'En un $30^{\\circ}$-$60^{\\circ}$-$90^{\\circ}$ la hipotenusa es $14$. El lado frente al $30^{\\circ}$ mide:', correct: '$7$', wrongs: ['$7\\sqrt{3}$', '$14\\sqrt{3}$', '$28$'], exp: 'Paso 1: frente al $30^{\\circ}$ va la mitad de la hipotenusa. Paso 2: $7$. Paso 3: $7\\sqrt{3}$ es el frente al $60^{\\circ}$.' },
    { prompt: 'En un $45^{\\circ}$-$45^{\\circ}$-$90^{\\circ}$ un cateto mide $5$. La hipotenusa es:', correct: '$5\\sqrt{2}$', wrongs: ['$5\\sqrt{3}$', '$10$', '$\\dfrac{5}{\\sqrt{2}}$ visto como $5$'], exp: 'Paso 1: plantilla $a$, $a$, $a\\sqrt{2}$. Paso 2: hipotenusa $5\\sqrt{2}$. Paso 3: $5\\sqrt{3}$ es de la plantilla $30$-$60$-$90$.' },
    { prompt: 'Ley de senos: si $A=30^{\\circ}$, $a=7$, $B=45^{\\circ}$, entonces $b$ vale:', correct: '$7\\sqrt{2}$', wrongs: ['$7\\sqrt{3}$', '$\\dfrac{7}{\\sqrt{2}}$', '$14$'], exp: 'Paso 1: $\\dfrac{a}{\\operatorname{sen} A}=\\dfrac{b}{\\operatorname{sen} B}$. Paso 2: $\\dfrac{7}{\\operatorname{sen} 30^{\\circ}}=\\dfrac{b}{\\operatorname{sen} 45^{\\circ}}$. Paso 3: $\\operatorname{sen} 30^{\\circ}=\\dfrac{1}{2}$, $\\operatorname{sen} 45^{\\circ}=\\dfrac{\\sqrt{2}}{2}$, luego $b=7\\sqrt{2}$.' },
    { prompt: 'Un triángulo rectángulo tiene catetos $5$ y $12$. El seno del ángulo opuesto al $5$ es:', correct: '$\\dfrac{5}{13}$', wrongs: ['$\\dfrac{12}{13}$', '$\\dfrac{5}{12}$', '$\\dfrac{12}{5}$'], exp: 'Paso 1: hipotenusa $13$. Paso 2: $\\operatorname{sen}=\\dfrac{\\text{opuesto}}{\\text{hipotenusa}}=\\dfrac{5}{13}$. Paso 3: $\\dfrac{12}{13}$ es el coseno de ese ángulo (o el seno del otro).' },
    { prompt: 'Lados $4$, $6$, $11$:', correct: 'no forman triángulo', wrongs: ['rectángulo', 'obtusángulo', 'acutángulo'], exp: 'Paso 1: desigualdad triangular: $4+6=10<11$. Paso 2: no cierra. Paso 3: ni siquiera llegas a Pitágoras.' },
    { prompt: 'En $30^{\\circ}$-$60^{\\circ}$-$90^{\\circ}$, frente al $60^{\\circ}$ va:', correct: '$a\\sqrt{3}$ si el lado corto es $a$', wrongs: ['$a$', '$2a$', '$a\\sqrt{2}$'], exp: 'Paso 1: corto (frente $30^{\\circ}$) $=a$, hipotenusa $=2a$, frente $60^{\\circ}$ $=a\\sqrt{3}$. Paso 2: no pongas $\\sqrt{3}$ frente al $30^{\\circ}$. Paso 3: $\\sqrt{2}$ es de $45$-$45$-$90$.' },
    { prompt: 'Si conoces $a$, $A$ y $B$, para hallar $b$ usas:', correct: 'ley de senos', wrongs: ['solo Pitágoras', 'solo cosenos', 'Tales'], exp: 'Paso 1: ya tienes un par ángulo + lado opuesto ($a$ con $A$). Paso 2: $\\dfrac{a}{\\operatorname{sen} A}=\\dfrac{b}{\\operatorname{sen} B}$. Paso 3: cosenos pide dos lados y el ángulo incluido, o los tres lados.' }
  ];
  items.forEach((it) => {
    const { opts, ans } = pack(it.correct, it.wrongs);
    push({
      id: nid(), fam: 'sines-pit', ch: 'filtro-L08', t: 'Pitágoras, notables y senos',
      topics: ['filtro-pitagoras'], prompt: it.prompt, opts, ans, exp: it.exp,
      distractores: ds(opts, ans, [
        'Aplicaste la plantilla del notable equivocado ($30$ vs $45$).',
        'Confundiste seno con coseno o con tangente.',
        'Usaste Pitágoras o cosenos cuando el par ángulo+opuesto pedía senos.'
      ])
    });
  });
}

function genTrigId() {
  const items = [
    {
      prompt: 'Si $\\operatorname{sen}\\theta=\\dfrac{3}{2}$, entonces $\\cos\\theta$ (en reales) es:',
      correct: 'imposible: no existe tal $\\theta$',
      wrongs: ['$\\dfrac{\\sqrt{5}}{2}$', '$\\pm\\dfrac{1}{2}$', '$0$'],
      exp: 'Paso 1: $|\\operatorname{sen}\\theta|\\le 1$. Paso 2: $\\dfrac{3}{2}>1$. Paso 3: no hay coseno que inventar. La hoja que escribe $\\operatorname{sen}=3/2$ es una trampa, no un $3$-$4$-$5$.'
    },
    {
      prompt: 'Si $\\operatorname{sen}\\theta=\\dfrac{3}{5}$ y $\\theta$ es agudo, $\\cos\\theta$ vale:',
      correct: '$\\dfrac{4}{5}$',
      wrongs: ['$\\dfrac{3}{4}$', '$\\dfrac{5}{3}$', '$-\\dfrac{4}{5}$'],
      exp: 'Paso 1: $\\operatorname{sen}^{2}+\\cos^{2}=1$ ⇒ $\\cos^{2}=1-\\dfrac{9}{25}=\\dfrac{16}{25}$. Paso 2: agudo ⇒ $\\cos>0$, $\\dfrac{4}{5}$. Paso 3: $-4/5$ sería el obtuso. $3/4$ es la tangente.'
    },
    {
      prompt: 'Si $\\operatorname{sen}\\theta=\\dfrac{5}{13}$ y $\\theta$ es obtuso, $\\cos\\theta$ vale:',
      correct: '$-\\dfrac{12}{13}$',
      wrongs: ['$\\dfrac{12}{13}$', '$\\dfrac{5}{12}$', '$\\dfrac{13}{5}$'],
      exp: 'Paso 1: $\\cos^{2}=1-\\dfrac{25}{169}=\\dfrac{144}{169}$. Paso 2: obtuso ⇒ $\\cos<0$, $-\\dfrac{12}{13}$. Paso 3: el signo lo pone el cuadrante, no Pitágoras.'
    },
    {
      prompt: 'Simplifique $\\cot^{2}\\theta\\cdot\\operatorname{sen}^{2}\\theta$ (donde existe):',
      correct: '$\\cos^{2}\\theta$',
      wrongs: ['$1$', '$\\operatorname{sen}^{2}\\theta$', '$\\csc^{2}\\theta$'],
      exp: 'Paso 1: $\\cot=\\dfrac{\\cos}{\\operatorname{sen}}$. Paso 2: $\\dfrac{\\cos^{2}}{\\operatorname{sen}^{2}}\\cdot\\operatorname{sen}^{2}=\\cos^{2}$. Paso 3: se cancelan los senos (si $\\operatorname{sen}\\neq 0$).'
    },
    {
      prompt: 'Simplifique $\\tan\\theta\\cdot\\cos\\theta$ (donde existe):',
      correct: '$\\operatorname{sen}\\theta$',
      wrongs: ['$1$', '$\\tan\\theta$', '$\\sec\\theta$'],
      exp: 'Paso 1: $\\tan=\\dfrac{\\operatorname{sen}}{\\cos}$. Paso 2: $\\dfrac{\\operatorname{sen}}{\\cos}\\cdot\\cos=\\operatorname{sen}$. Paso 3: el $\\cos$ se cancela si $\\cos\\neq 0$.'
    },
    {
      prompt: '$\\cot^{2}\\theta\\cdot\\csc^{2}\\theta$ es equivalente a:',
      correct: '$\\dfrac{\\cos^{2}\\theta}{\\operatorname{sen}^{4}\\theta}$',
      wrongs: ['$1$', '$\\operatorname{sen}^{2}\\theta\\cos^{2}\\theta$', '$\\dfrac{\\operatorname{sen}^{2}\\theta}{\\cos^{2}\\theta}$'],
      exp: 'Paso 1: $\\cot^{2}=\\dfrac{\\cos^{2}}{\\operatorname{sen}^{2}}$, $\\csc^{2}=\\dfrac{1}{\\operatorname{sen}^{2}}$. Paso 2: producto $\\dfrac{\\cos^{2}}{\\operatorname{sen}^{4}}$. Paso 3: no es $1$ (eso sería $\\operatorname{sen}\\cdot\\csc$).'
    },
    {
      prompt: '$1+\\tan^{2}\\theta$ es idénticamente:',
      correct: '$\\sec^{2}\\theta$',
      wrongs: ['$\\csc^{2}\\theta$', '$1$', '$\\operatorname{sen}^{2}\\theta$'],
      exp: 'Paso 1: divide $\\operatorname{sen}^{2}+\\cos^{2}=1$ entre $\\cos^{2}$. Paso 2: $\\tan^{2}+1=\\sec^{2}$. Paso 3: $1+\\cot^{2}=\\csc^{2}$ es la hermana, no esta.'
    },
    {
      prompt: '$\\operatorname{sen}^{2}x+\\cos^{2}x$ vale:',
      correct: '$1$',
      wrongs: ['$0$', '$2$', '$x$'],
      exp: 'Paso 1: identidad madre, Pitágoras en el círculo de radio $1$. Paso 2: siempre $1$ (donde seno y coseno existen, o sea siempre). Paso 3: no vale $0$ ni $2$.'
    },
    {
      prompt: '$\\csc\\theta\\cdot\\operatorname{sen}\\theta$ (donde existe) es:',
      correct: '$1$',
      wrongs: ['$0$', '$\\cos\\theta$', '$\\tan\\theta$'],
      exp: 'Paso 1: $\\csc=\\dfrac{1}{\\operatorname{sen}}$. Paso 2: producto $1$. Paso 3: se rompe si $\\operatorname{sen}=0$.'
    },
    {
      prompt: '$\\dfrac{1-\\cos^{2}\\theta}{\\operatorname{sen}\\theta}$ (donde existe) se simplifica a:',
      correct: '$\\operatorname{sen}\\theta$',
      wrongs: ['$\\cos\\theta$', '$1$', '$\\tan\\theta$'],
      exp: 'Paso 1: $1-\\cos^{2}=\\operatorname{sen}^{2}$. Paso 2: $\\dfrac{\\operatorname{sen}^{2}}{\\operatorname{sen}}=\\operatorname{sen}$. Paso 3: no dejes $\\operatorname{sen}^{2}$ sin cancelar.'
    },
    {
      prompt: '$\\cos 0^{\\circ}$ vale:',
      correct: '$1$',
      wrongs: ['$0$', '$\\dfrac{1}{2}$', 'no existe'],
      exp: 'Paso 1: en el círculo, $0^{\\circ}$ es el punto $(1,0)$. Paso 2: coseno $=x=1$, seno $=0$. Paso 3: quien no existe es $\\tan 90^{\\circ}$.'
    },
    {
      prompt: '$\\tan 45^{\\circ}$ vale:',
      correct: '$1$',
      wrongs: ['$0$', '$\\sqrt{3}$', 'no existe'],
      exp: 'Paso 1: en $45^{\\circ}$ opuesto $=$ adyacente. Paso 2: el cociente es $1$. Paso 3: $\\sqrt{3}$ es $\\tan 60^{\\circ}$.'
    },
    {
      prompt: '$\\operatorname{sen} 30^{\\circ}$ vale:',
      correct: '$\\dfrac{1}{2}$',
      wrongs: ['$\\dfrac{\\sqrt{3}}{2}$', '$\\dfrac{\\sqrt{2}}{2}$', '$1$'],
      exp: 'Paso 1: senos suben $0,\\,\\dfrac{1}{2},\\,\\dfrac{\\sqrt{2}}{2},\\,\\dfrac{\\sqrt{3}}{2},\\,1$. Paso 2: $30^{\\circ}$ es el segundo. Paso 3: $\\dfrac{\\sqrt{3}}{2}$ es $\\operatorname{sen} 60^{\\circ}$ (o $\\cos 30^{\\circ}$).'
    },
    {
      prompt: '$\\cos 60^{\\circ}$ vale:',
      correct: '$\\dfrac{1}{2}$',
      wrongs: ['$\\dfrac{\\sqrt{3}}{2}$', '$0$', '$1$'],
      exp: 'Paso 1: cosenos son la lista de senos al revés. Paso 2: $\\cos 60^{\\circ}=\\operatorname{sen} 30^{\\circ}=\\dfrac{1}{2}$. Paso 3: $\\dfrac{\\sqrt{3}}{2}$ es $\\cos 30^{\\circ}$.'
    },
    {
      prompt: '$\\tan 60^{\\circ}$ vale:',
      correct: '$\\sqrt{3}$',
      wrongs: ['$\\dfrac{1}{\\sqrt{3}}$', '$1$', 'no existe'],
      exp: 'Paso 1: $\\tan 60^{\\circ}=\\dfrac{\\operatorname{sen} 60^{\\circ}}{\\cos 60^{\\circ}}=\\dfrac{\\sqrt{3}/2}{1/2}=\\sqrt{3}$. Paso 2: $\\dfrac{1}{\\sqrt{3}}$ es $\\tan 30^{\\circ}$. Paso 3: $1$ es $45^{\\circ}$.'
    },
    {
      prompt: '$1+\\cot^{2}\\theta$ es:',
      correct: '$\\csc^{2}\\theta$',
      wrongs: ['$\\sec^{2}\\theta$', '$1$', '$\\tan^{2}\\theta$'],
      exp: 'Paso 1: divide la identidad madre entre $\\operatorname{sen}^{2}$. Paso 2: $\\cot^{2}+1=\\csc^{2}$. Paso 3: no la confundas con $1+\\tan^{2}=\\sec^{2}$.'
    },
    {
      prompt: 'Simplifique $\\sec\\theta\\cdot\\cos\\theta$ (donde existe):',
      correct: '$1$',
      wrongs: ['$0$', '$\\tan\\theta$', '$\\cos^{2}\\theta$'],
      exp: 'Paso 1: $\\sec=\\dfrac{1}{\\cos}$. Paso 2: producto $1$. Paso 3: se rompe en $90^{\\circ}$.'
    },
    {
      prompt: 'Si $\\tan\\theta=\\dfrac{3}{4}$ y $\\theta$ es agudo, $\\operatorname{sen}\\theta$ vale:',
      correct: '$\\dfrac{3}{5}$',
      wrongs: ['$\\dfrac{4}{5}$', '$\\dfrac{3}{4}$', '$\\dfrac{5}{3}$'],
      exp: 'Paso 1: un triángulo $3$-$4$-$5$: opuesto $3$, adyacente $4$, hipotenusa $5$. Paso 2: $\\operatorname{sen}=\\dfrac{3}{5}$. Paso 3: $\\dfrac{4}{5}$ es el coseno.'
    },
    {
      prompt: '$\\operatorname{sen} 90^{\\circ}$ vale:',
      correct: '$1$',
      wrongs: ['$0$', 'no existe', '$\\dfrac{\\sqrt{2}}{2}$'],
      exp: 'Paso 1: punto $(0,1)$ del círculo. Paso 2: seno $=1$. Paso 3: quien no existe es la tangente en $90^{\\circ}$.'
    },
    {
      prompt: 'Simplifique $\\dfrac{\\operatorname{sen}\\theta}{\\cos\\theta}\\cdot\\cos\\theta\\cdot\\csc\\theta$ (donde existe):',
      correct: '$1$',
      wrongs: ['$\\operatorname{sen}\\theta$', '$\\tan\\theta$', '$0$'],
      exp: 'Paso 1: $\\dfrac{\\operatorname{sen}}{\\cos}\\cdot\\cos=\\operatorname{sen}$. Paso 2: $\\operatorname{sen}\\cdot\\csc=1$. Paso 3: todo se cancela a $1$.'
    }
  ];
  items.forEach((it) => {
    const { opts, ans } = pack(it.correct, it.wrongs);
    push({
      id: nid(), fam: 'trig-id', ch: 'filtro-L09', t: 'Identidades y valores notables',
      topics: ['filtro-ident'], prompt: it.prompt, opts, ans, exp: it.exp,
      distractores: ds(opts, ans, [
        'No pasaste todo a seno y coseno, o no cancelaste.',
        'Usaste el valor notable del ángulo espejo ($30$ por $60$).',
        'Inventaste un coseno para un seno imposible ($>1$).'
      ])
    });
  });
}

function genSoh() {
  const items = [
    { prompt: 'En un triángulo rectángulo, el ángulo $\\theta$ mira al $8$ y la hipotenusa es $17$. $\\operatorname{sen}\\theta$ es:', correct: '$\\dfrac{8}{17}$', wrongs: ['$\\dfrac{15}{17}$', '$\\dfrac{8}{15}$', '$\\dfrac{17}{8}$'], exp: 'Paso 1: $\\operatorname{sen}=\\dfrac{\\text{opuesto}}{\\text{hipotenusa}}$. Paso 2: $\\dfrac{8}{17}$. Paso 3: el otro cateto es $15$ (terna $8$-$15$-$17$): eso entra en cos o tan, no aquí.' },
    { prompt: 'Mismo triángulo ($8$, $15$, $17$), $\\tan\\theta$ si $\\theta$ mira al $8$:', correct: '$\\dfrac{8}{15}$', wrongs: ['$\\dfrac{8}{17}$', '$\\dfrac{15}{8}$', '$\\dfrac{15}{17}$'], exp: 'Paso 1: $\\tan=\\dfrac{\\text{opuesto}}{\\text{adyacente}}=\\dfrac{8}{15}$. Paso 2: no uses la hipotenusa en la tangente. Paso 3: $\\dfrac{15}{8}$ es $\\cot\\theta$.' },
    { prompt: 'Catetos $7$ y $24$, hipotenusa $25$. $\\cos$ del ángulo que mira al $7$:', correct: '$\\dfrac{24}{25}$', wrongs: ['$\\dfrac{7}{25}$', '$\\dfrac{7}{24}$', '$\\dfrac{24}{7}$'], exp: 'Paso 1: ese ángulo tiene adyacente $24$ e hipotenusa $25$. Paso 2: $\\cos=\\dfrac{24}{25}$. Paso 3: $\\dfrac{7}{25}$ es el seno.' },
    { prompt: 'Si $\\operatorname{sen}\\theta=\\dfrac{20}{29}$ (agudo), $\\tan\\theta$ es:', correct: '$\\dfrac{20}{21}$', wrongs: ['$\\dfrac{21}{29}$', '$\\dfrac{20}{29}$', '$\\dfrac{29}{20}$'], exp: 'Paso 1: terna $20$-$21$-$29$. Paso 2: adyacente $21$. Paso 3: $\\tan=\\dfrac{20}{21}$.' },
    { prompt: 'En un triángulo rectángulo, un ángulo tiene adyacente $9$ e hipotenusa $15$. $\\operatorname{sen}$ de ese ángulo:', correct: '$\\dfrac{4}{5}$', wrongs: ['$\\dfrac{3}{5}$', '$\\dfrac{9}{15}$', '$\\dfrac{12}{9}$'], exp: 'Paso 1: opuesto $=\\sqrt{15^{2}-9^{2}}=\\sqrt{225-81}=12$. Paso 2: $\\operatorname{sen}=\\dfrac{12}{15}=\\dfrac{4}{5}$. Paso 3: $\\dfrac{9}{15}=\\dfrac{3}{5}$ es el coseno.' },
    { prompt: 'SOH-CAH-TOA: $\\cos\\theta$ es:', correct: '$\\dfrac{\\text{adyacente}}{\\text{hipotenusa}}$', wrongs: ['$\\dfrac{\\text{opuesto}}{\\text{hipotenusa}}$', '$\\dfrac{\\text{opuesto}}{\\text{adyacente}}$', '$\\dfrac{\\text{hipotenusa}}{\\text{adyacente}}$'], exp: 'Paso 1: CAH = Cos = Adyacente / Hipotenusa. Paso 2: seno usa el opuesto. Paso 3: tangente no usa hipotenusa.', fig: { type: 'filtro', name: 'sohcahtoa' } },
    { prompt: 'Si $\\tan\\theta=\\dfrac{5}{12}$ (agudo), la hipotenusa en un triángulo reducido es:', correct: '$13$', wrongs: ['$17$', '$7$', '$10$'], exp: 'Paso 1: opuesto $5$, adyacente $12$. Paso 2: $5^{2}+12^{2}=25+144=169=13^{2}$. Paso 3: $13$, no $17$ (esa es $8$-$15$-$17$).' },
    { prompt: 'El recíproco de $\\operatorname{sen}\\theta$ es:', correct: '$\\csc\\theta$', wrongs: ['$\\sec\\theta$', '$\\cot\\theta$', '$\\cos\\theta$'], exp: 'Paso 1: $\\csc=\\dfrac{1}{\\operatorname{sen}}$. Paso 2: $\\sec=1/\\cos$, $\\cot=1/\\tan$. Paso 3: no mezcles las parejas.' },
    { prompt: 'En un triángulo rectángulo, $\\theta$ y $90^{\\circ}-\\theta$ cumplen:', correct: '$\\operatorname{sen}\\theta=\\cos(90^{\\circ}-\\theta)$', wrongs: ['$\\operatorname{sen}\\theta=\\operatorname{sen}(90^{\\circ}-\\theta)$', '$\\tan\\theta=\\tan(90^{\\circ}-\\theta)$', '$\\cos\\theta=\\cos(90^{\\circ}-\\theta)$'], exp: 'Paso 1: el opuesto de uno es el adyacente del complemento. Paso 2: $\\operatorname{sen}\\theta=\\cos(90^{\\circ}-\\theta)$. Paso 3: las tangentes son recíprocas, no iguales.' },
    { prompt: 'Si la hipotenusa es $10$ y $\\operatorname{sen}\\theta=\\dfrac{3}{5}$, el opuesto a $\\theta$ mide:', correct: '$6$', wrongs: ['$8$', '$5$', '$3$'], exp: 'Paso 1: $\\operatorname{sen}=\\dfrac{\\text{opp}}{10}=\\dfrac{3}{5}$. Paso 2: opp $=6$. Paso 3: el adyacente sería $8$ (terna $6$-$8$-$10$).' }
  ];
  items.forEach((it) => {
    const { opts, ans } = pack(it.correct, it.wrongs);
    push({
      id: nid(), fam: 'soh', ch: 'filtro-L09', t: 'SOH-CAH-TOA',
      topics: ['filtro-razones'], prompt: it.prompt, opts, ans, exp: it.exp,
      fig: it.fig || { type: 'filtro', name: 'sohcahtoa' },
      distractores: ds(opts, ans, [
        'Intercambiaste opuesto y adyacente.',
        'Pusiste la hipotenusa en la tangente (o al revés).',
        'Usaste el recíproco equivocado (sec por csc).'
      ])
    });
  });
}

function genCircle() {
  const items = [];

  function addCircle(o) { items.push(o); }

  // 1-8 center-radius
  const crs = [
    { h: 3, k: -2, r2: 25 },
    { h: -1, k: 4, r2: 7 },
    { h: 0, k: 5, r2: 16 },
    { h: -4, k: -3, r2: 9 },
    { h: 2, k: 0, r2: 18 },
    { h: 5, k: 1, r2: 4 },
    { h: -6, k: 2, r2: 36 },
    { h: 1, k: -7, r2: 13 }
  ];
  crs.forEach((c) => {
    const eq = `(x${c.h >= 0 ? '-' : '+'}${Math.abs(c.h)})^{2}+(y${c.k >= 0 ? '-' : '+'}${Math.abs(c.k)})^{2}=${c.r2}`;
    const wr1 = `(x${c.h >= 0 ? '+' : '-'}${Math.abs(c.h)})^{2}+(y${c.k >= 0 ? '+' : '-'}${Math.abs(c.k)})^{2}=${c.r2}`;
    const wr2 = `(x${c.h >= 0 ? '-' : '+'}${Math.abs(c.h)})^{2}+(y${c.k >= 0 ? '-' : '+'}${Math.abs(c.k)})^{2}=${Math.round(Math.sqrt(c.r2))}`;
    const wr3 = `x^{2}+y^{2}=${c.r2}`;
    addCircle({
      prompt: `La ecuación de la circunferencia de centro $(${c.h},${c.k})$ y radio $${texF(Fr(c.r2, 1)).includes('dfrac') ? '\\sqrt{' + c.r2 + '}' : (Number.isInteger(Math.sqrt(c.r2)) ? String(Math.sqrt(c.r2)) : '\\sqrt{' + c.r2 + '}')}$ es:`,
      correct: `$${eq}$`,
      wrongs: [`$${wr1}$`, `$${wr2}$`, `$${wr3}$`],
      exp: `Paso 1: canónica $(x-h)^{2}+(y-k)^{2}=r^{2}$ con $h=${c.h}$, $k=${c.k}$. Paso 2: $(x-${c.h})^{2}$ se escribe ${c.h >= 0 ? `$(x-${c.h})^{2}$` : `$(x+${-c.h})^{2}$`}; análogo en $y$. Paso 3: a la derecha va $r^{2}=${c.r2}$, no $r$.`,
      fig: { type: 'filtro', name: 'circle-canon' }
    });
  });

  // 9-16 complete the square / read center or radius
  const gens = [
    { D: -6, E: 4, F: -12 },
    { D: 8, E: -2, F: -8 },
    { D: -4, E: 6, F: -3 },
    { D: 2, E: 8, F: -8 },
    { D: -10, E: -4, F: 13 },
    { D: 6, E: -10, F: 18 },
    { D: -8, E: 0, F: -9 },
    { D: 0, E: 12, F: -4 }
  ];
  gens.forEach((g, i) => {
    const h = -g.D / 2;
    const k = -g.E / 2;
    const r2 = h * h + k * k - g.F;
    const r = Math.sqrt(r2);
    const rTex = Number.isInteger(r) ? String(r) : `\\sqrt{${r2}}`;
    let general = 'x^{2}+y^{2}';
    if (g.D) general += (g.D > 0 ? '+' : '') + g.D + 'x';
    if (g.E) general += (g.E > 0 ? '+' : '') + g.E + 'y';
    if (g.F) general += (g.F > 0 ? '+' : '') + g.F;
    general += '=0';
    if (i % 2 === 0) {
      addCircle({
        prompt: `Al pasar $${general}$ a canónica, el centro es:`,
        correct: `$(${h},${k})$`,
        wrongs: [`$(${-h},${-k})$`, `$(${g.D},${g.E})$`, `$(${h},${-k})$`],
        exp: `Paso 1: centro $\\left(-\\dfrac{D}{2},-\\dfrac{E}{2}\\right)=\\left(-\\dfrac{${g.D}}{2},-\\dfrac{${g.E}}{2}\\right)=(${h},${k})$. Paso 2: completar cuadrados da lo mismo. Paso 3: no uses $(D,E)$ ni olvides los menos.`,
        fig: { type: 'filtro', name: 'circle-general' }
      });
    } else {
      addCircle({
        prompt: `El radio de $${general}$ es:`,
        correct: `$${rTex}$`,
        wrongs: [`$${String(Math.abs(h))}$`, `$${String(Math.abs(g.F))}$`, `$\\sqrt{${Math.abs(g.F)}}$`],
        exp: `Paso 1: $r^{2}=\\left(\\dfrac{D}{2}\\right)^{2}+\\left(\\dfrac{E}{2}\\right)^{2}-F=${h * h}+${k * k}-(${g.F})=${r2}$. Paso 2: $r=${rTex}$. Paso 3: el radio no es $|h|$ ni $|F|$.`
      });
    }
  });

  // 17-22 diameter / point / tangent
  addCircle({
    prompt: 'Los extremos de un diámetro son $A(-2,1)$ y $B(4,5)$. La ecuación de la circunferencia es:',
    correct: '$(x-1)^{2}+(y-3)^{2}=13$',
    wrongs: ['$(x+1)^{2}+(y-3)^{2}=13$', '$(x-1)^{2}+(y-3)^{2}=\\sqrt{13}$', '$(x-4)^{2}+(y-5)^{2}=13$'],
    exp: 'Paso 1: centro = punto medio $\\left(\\dfrac{-2+4}{2},\\dfrac{1+5}{2}\\right)=(1,3)$. Paso 2: $r^{2}=(4-1)^{2}+(5-3)^{2}=9+4=13$. Paso 3: $(x-1)^{2}+(y-3)^{2}=13$. A la derecha va $r^{2}$, no $r$.'
  });
  addCircle({
    prompt: 'Diámetro de $A(0,-4)$ a $B(6,2)$. El centro es:',
    correct: '$(3,-1)$',
    wrongs: ['$(6,-4)$', '$(3,3)$', '$(0,2)$'],
    exp: 'Paso 1: medio $\\left(\\dfrac{0+6}{2},\\dfrac{-4+2}{2}\\right)=(3,-1)$. Paso 2: no uses un extremo como centro. Paso 3: $r^{2}=(6-3)^{2}+(2+1)^{2}=9+9=18$.'
  });
  addCircle({
    prompt: '¿El punto $(1,2)$ está en $(x-1)^{2}+(y+3)^{2}=25$?',
    correct: 'sí, porque $0^{2}+5^{2}=25$',
    wrongs: ['no, porque $1+2\\neq 25$', 'sí, porque el centro es $(1,2)$', 'no, el radio es $5$ y el punto está a $3$'],
    exp: 'Paso 1: sustituye $x=1$, $y=2$: $(0)^{2}+(5)^{2}=25$. Paso 2: cumple. Paso 3: el centro es $(1,-3)$, no $(1,2)$. La distancia es $5$, igual al radio.'
  });
  addCircle({
    prompt: 'Circunferencia de centro $(2,5)$ tangente al eje $X$. Su radio es:',
    correct: '$5$',
    wrongs: ['$2$', '$\\sqrt{29}$', '$7$'],
    exp: 'Paso 1: tangente al eje $X$ ⇒ la distancia vertical al eje es el radio. Paso 2: $|k|=|5|=5$. Paso 3: no uses $|h|=2$ (eso sería tangente al eje $Y$).'
  });
  addCircle({
    prompt: 'Circunferencia de centro $(4,-1)$ tangente al eje $Y$. Una ecuación posible es:',
    correct: '$(x-4)^{2}+(y+1)^{2}=16$',
    wrongs: ['$(x-4)^{2}+(y+1)^{2}=1$', '$(x+4)^{2}+(y-1)^{2}=16$', '$(x-4)^{2}+(y+1)^{2}=4$'],
    exp: 'Paso 1: tangente al eje $Y$ ⇒ $r=|h|=4$, $r^{2}=16$. Paso 2: centro $(4,-1)$ ⇒ $(x-4)^{2}+(y+1)^{2}=16$. Paso 3: $r=1$ sería $|k|$.'
  });
  addCircle({
    prompt: 'En el primer cuadrante, tangente a ambos ejes y radio $3$. Su ecuación es:',
    correct: '$(x-3)^{2}+(y-3)^{2}=9$',
    wrongs: ['$(x+3)^{2}+(y+3)^{2}=9$', '$(x-3)^{2}+(y-3)^{2}=3$', '$x^{2}+y^{2}=9$'],
    exp: 'Paso 1: tangente a ambos ejes en el primer cuadrante ⇒ centro $(r,r)=(3,3)$. Paso 2: $r^{2}=9$. Paso 3: $(x+3)^{2}+(y+3)^{2}$ vive en el tercer cuadrante.'
  });

  // 23-26 line distance / harder
  addCircle({
    prompt: 'Centro $(2,-1)$ y tangente a la recta $x+y-5=0$. El radio es:',
    correct: '$2\\sqrt{2}$',
    wrongs: ['$4$', '$\\dfrac{4}{\\sqrt{2}}$ visto como $2$', '$6$'],
    exp: 'Paso 1: distancia centro-recta $d=\\dfrac{|2+(-1)-5|}{\\sqrt{1^{2}+1^{2}}}=\\dfrac{4}{\\sqrt{2}}=2\\sqrt{2}$. Paso 2: tangente ⇒ $r=d$. Paso 3: no dejes $\\dfrac{4}{\\sqrt{2}}$ sin simplificar, y no uses $|2-1-5|$ con otro denominador.'
  });
  addCircle({
    prompt: 'Centro $(-3,4)$ y tangente a $3x-4y+8=0$. El radio es:',
    correct: '$\\dfrac{11}{5}$',
    wrongs: ['$11$', '$5$', '$\\dfrac{5}{11}$'],
    exp: 'Paso 1: $d=\\dfrac{|-9-16+8|}{\\sqrt{9+16}}=\\dfrac{17}{5}$… espera: $|-3\\cdot 3-4\\cdot 4+8|=|-9-16+8|=|-17|=17$, $d=\\dfrac{17}{5}$.'
  });
  // Fix the last one - I made an error in the "correct" vs exp. Let me recalculate:
  // d = |-9 -16 + 8| / 5 = |-17|/5 = 17/5
  // I'll fix this item:
  items[items.length - 1] = {
    prompt: 'Centro $(-3,4)$ y tangente a $3x-4y+8=0$. El radio es:',
    correct: '$\\dfrac{17}{5}$',
    wrongs: ['$11$', '$5$', '$\\dfrac{7}{5}$'],
    exp: 'Paso 1: $d=\\dfrac{|3(-3)-4(4)+8|}{\\sqrt{9+16}}=\\dfrac{|-9-16+8|}{5}=\\dfrac{17}{5}$. Paso 2: tangente ⇒ $r=d=\\dfrac{17}{5}$. Paso 3: el $5$ es $\\sqrt{3^{2}+4^{2}}$, no se tira.'
  };

  addCircle({
    prompt: 'La circunferencia $x^{2}+y^{2}-4x+2y-20=0$ y la recta $x=3$: ¿cuántos puntos en común?',
    correct: 'dos (cuerda)',
    wrongs: ['uno (tangente)', 'ninguno', 'infinitos'],
    exp: 'Paso 1: centro $(2,-1)$, $r^{2}=4+1+20=25$, $r=5$. Paso 2: distancia del centro a $x=3$ es $|3-2|=1<5$. Paso 3: $d<r$ ⇒ dos cortes.'
  });
  addCircle({
    prompt: 'Misma circunferencia (centro $(2,-1)$, $r=5$) y la recta $y=4$. Puntos en común:',
    correct: 'uno (tangente)',
    wrongs: ['dos', 'ninguno', 'el centro'],
    exp: 'Paso 1: distancia de $(2,-1)$ a $y=4$ es $|4-(-1)|=5$. Paso 2: $d=r$ ⇒ tangente, un punto. Paso 3: el punto es $(2,4)$.'
  });

  // 27-30 more
  addCircle({
    prompt: 'Una circunferencia pasa por el origen y tiene centro $(3,4)$. Su ecuación es:',
    correct: '$(x-3)^{2}+(y-4)^{2}=25$',
    wrongs: ['$(x-3)^{2}+(y-4)^{2}=7$', '$x^{2}+y^{2}=25$', '$(x+3)^{2}+(y+4)^{2}=25$'],
    exp: 'Paso 1: el radio es la distancia del centro al origen: $\\sqrt{9+16}=5$, $r^{2}=25$. Paso 2: $(x-3)^{2}+(y-4)^{2}=25$. Paso 3: $x^{2}+y^{2}=25$ estaría centrada en el origen.'
  });
  addCircle({
    prompt: 'De $x^{2}+y^{2}+Dx+Ey+F=0$, $r^{2}$ vale:',
    correct: '$\\left(\\dfrac{D}{2}\\right)^{2}+\\left(\\dfrac{E}{2}\\right)^{2}-F$',
    wrongs: ['$D^{2}+E^{2}-F$', '$F$', '$-F$'],
    exp: 'Paso 1: completar cuadrados. Paso 2: $r^{2}=(D/2)^{2}+(E/2)^{2}-F$. Paso 3: si eso sale negativo, no es circunferencia real.'
  });
  addCircle({
    prompt: '$x^{2}+y^{2}+2x+2y+3=0$ representa:',
    correct: 'ningún punto real ($r^{2}<0$)',
    wrongs: ['circunferencia de radio $1$', 'el punto $(-1,-1)$', 'la recta $x+y+3=0$'],
    exp: 'Paso 1: $(x+1)^{2}+(y+1)^{2}+3-1-1=0$ ⇒ $(x+1)^{2}+(y+1)^{2}=-1$. Paso 2: $r^{2}=-1<0$. Paso 3: conjunto vacío en el plano real.'
  });
  addCircle({
    prompt: 'Centro en el eje $X$, radio $5$, pasa por $(0,4)$. Una ecuación posible es:',
    correct: '$(x-3)^{2}+y^{2}=25$',
    wrongs: ['$x^{2}+(y-3)^{2}=25$', '$(x-5)^{2}+y^{2}=16$', '$(x-4)^{2}+y^{2}=25$'],
    exp: 'Paso 1: centro $(h,0)$, $r=5$, pasa por $(0,4)$: $(0-h)^{2}+16=25$. Paso 2: $h^{2}=9$, $h=\\pm 3$. Paso 3: $(x-3)^{2}+y^{2}=25$ (o $(x+3)^{2}+y^{2}=25$). $(x-4)$ no cumple $h^{2}=9$.'
  });

  items.forEach((it) => {
    const { opts, ans } = pack(it.correct, it.wrongs);
    push({
      id: nid(), fam: 'circle', ch: 'filtro-L10', t: 'Circunferencia',
      topics: ['filtro-circ'], prompt: it.prompt, opts, ans, exp: it.exp,
      fig: it.fig || { type: 'filtro', name: 'circle-canon' },
      distractores: ds(opts, ans, [
        'Cambiaste el signo del centro $(x+h)$ en vez de $(x-h)$.',
        'Pusiste $r$ a la derecha en vez de $r^{2}$, o usaste $|h|$ por $|k|$.',
        'No completaste el cuadrado / no usaste $r^{2}=(D/2)^{2}+(E/2)^{2}-F$.'
      ])
    });
  });
}

function genSlope() {
  const rows = [
    [[0, 0], [2, -4]],
    [[1, 2], [4, 8]],
    [[-3, 5], [1, -3]],
    [[2, 7], [2, -1]], // vertical
    [[-4, 3], [5, 3]], // horizontal
    [[0, 5], [10, 0]],
    [[3, -2], [7, 6]],
    [[-1, -1], [3, 5]],
    [[6, 4], [2, 12]],
    [[-5, 0], [0, 10]]
  ];
  rows.forEach(([[x1, y1], [x2, y2]]) => {
    if (x2 === x1) {
      const prompt = `La pendiente entre $(${x1},${y1})$ y $(${x2},${y2})$ es:`;
      const { opts, ans } = pack('no existe (recta vertical)', ['$0$', '$1$', '$\\infty$ como número $0$']);
      push({
        id: nid(), fam: 'slope', ch: 'filtro-L10', t: 'Pendiente',
        topics: ['filtro-pendiente'], prompt, opts, ans,
        exp: `Paso 1: $m=\\dfrac{y_{2}-y_{1}}{x_{2}-x_{1}}$ y $x_{2}-x_{1}=0$. Paso 2: división por cero. Paso 3: recta vertical, no hay pendiente. $0$ sería la horizontal.`,
        fig: { type: 'filtro', name: 'slope' },
        distractores: ds(opts, ans, [
          'Marcaste $0$ (eso es la horizontal).',
          'Inventaste $1$.',
          'Escribiste infinito como si fuera un número usable en $y=mx+b$.'
        ])
      });
      return;
    }
    const m = Fr(y2 - y1, x2 - x1);
    const prompt = `La pendiente entre $(${x1},${y1})$ y $(${x2},${y2})$ es:`;
    const exp = `Paso 1: $m=\\dfrac{y_{2}-y_{1}}{x_{2}-x_{1}}=\\dfrac{${y2}-${y1}}{${x2}-${x1}}=\\dfrac{${y2 - y1}}{${x2 - x1}}=${texF(m)}$. Paso 2: el mismo orden arriba y abajo. Paso 3: ${y2 === y1 ? 'horizontal ⇒ $0$.' : (m.n < 0 ? 'baja: signo menos.' : 'sube: positiva.')}`;
    const flip = (y2 === y1) ? Fr(x2 - x1, 1) : Fr(x2 - x1, y2 - y1);
    const neg = Fr(y1 - y2, x2 - x1);
    const { opts, ans } = pack(`$${texF(m)}$`, [
      `$${texF(flip)}$`, `$${texF(neg)}$`, (y2 === y1 ? 'no existe' : '$0$')
    ], [`$1$`, `$${y2 - y1}$`, 'recta vertical']);
    push({
      id: nid(), fam: 'slope', ch: 'filtro-L10', t: 'Pendiente',
      topics: ['filtro-pendiente'], prompt, opts, ans, exp,
      fig: { type: 'filtro', name: 'slope' },
      distractores: ds(opts, ans, [
        'Invertiste $\\Delta y$ y $\\Delta x$.',
        'Cambiaste el orden solo en un coordenada (sale el signo al revés).',
        'Marcaste $0$ como si fuera horizontal.'
      ])
    });
  });
}

/* run all */
genPowers();
genProdPow();
genFracComb();
genRadicals();
genVietaSum();
genVietaDiff();
genSystems();
genFactor();
genIneq();
genDomain();
genCongruence();
genSimilarity();
genParallels();
genThales();
genCosines();
genSinesPit();
genTrigId();
genSoh();
genCircle();
genSlope();

/* counts */
const byFam = {};
ALL.forEach((q) => { byFam[q.fam] = (byFam[q.fam] || 0) + 1; });
console.log('Total', ALL.length);
console.log(byFam);

const prompts = new Set();
for (const q of ALL) {
  if (prompts.has(q.prompt)) throw new Error('dup prompt ' + q.id);
  prompts.add(q.prompt);
  if (q.opts.length !== 4) throw new Error('opts ' + q.id);
  if (new Set(q.opts).size !== 4) throw new Error('dup opt ' + q.id + ' ' + JSON.stringify(q.opts));
}

const header = `/* Banco rotativo del intensivo (fp-*). Se concatena al banco filtro. */\n(function () {\n  function Q(o) {\n    return {\n      id: o.id, s: "mat", n: o.n || 0, d: o.d || "dificil",\n      fam: o.fam || "", topics: o.topics || [], ch: o.ch, t: o.t,\n      prompt: o.prompt, opts: o.opts, ans: o.ans, exp: o.exp,\n      maths: o.maths || [], imgs: o.imgs || [], fig: o.fig || null,\n      distractores: o.distractores || [],\n      theory: o.theory || { lesson_id: o.ch, concept_title: o.t, anchor: "h-la-regla-solo-esto" }\n    };\n  }\n  function th(id, title, anchor) {\n    return { lesson_id: id, lesson_title: title, concept_title: title, anchor: anchor || "h-la-regla-solo-esto" };\n  }\n  var ALL = [];\n`;

const lines = ALL.map((q, i) => {
  const obj = {
    id: q.id,
    n: i + 1,
    fam: q.fam,
    ch: q.ch,
    t: q.t,
    topics: q.topics,
    prompt: q.prompt,
    opts: q.opts,
    ans: q.ans,
    exp: q.exp,
    fig: q.fig,
    distractores: q.distractores,
    d: q.d,
    theory: { lesson_id: q.ch, lesson_title: q.t, concept_title: q.t, anchor: 'h-la-regla-solo-esto' }
  };
  return '  ALL.push(Q(' + JSON.stringify(obj) + '));';
}).join('\n');

const footer = `\n  var base = (window.GUIA_BANK_FILTRO && window.GUIA_BANK_FILTRO.mat) || [];\n  window.GUIA_BANK_FILTRO = { mat: base.concat(ALL) };\n  window.GUIA_BANK_FILTRO_ROT = {\n    mat: ALL,\n    total: ALL.length,\n    byFam: ALL.reduce(function (m, q) { m[q.fam] = (m[q.fam] || 0) + 1; return m; }, {})\n  };\n})();\n`;

const out = header + lines + footer;
const dest = path.join(root, 'guia-bank-filtro-rotativo.js');
fs.writeFileSync(dest, out, 'utf8');
console.log('Wrote', dest, out.length, 'bytes');
