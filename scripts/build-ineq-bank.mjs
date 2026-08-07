/**
 * Genera el banco del Taller Especializado: Inecuaciones y Valor Absoluto.
 * Preguntas originales estilo EPN, alineadas a Clases 16–17 (Barreno).
 * Uso: node scripts/build-ineq-bank.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

function Q(t, d, q, o, a, s) {
  return { t, d, q, o, a, s };
}

const T = {
  ord: 'Relaciones de orden e intervalos',
  lin: 'Inecuaciones lineales',
  sim: 'Desigualdades simultáneas',
  pol: 'Inecuaciones polinómicas',
  abs: 'Valor absoluto: definición y propiedades',
  ineqAbs: 'Inecuaciones con valor absoluto',
  ext: 'Casos extremos y producto/cociente',
  rat: 'Inecuaciones racionales y dominio',
};

const facil = [
  Q(T.ord, 'facil', 'La afirmación $A > B$ es equivalente a:',
    ['$A - B \\in \\mathbb{R}^{-}$', '$A - B \\in \\mathbb{R}^{+}$', '$A + B = 0$', '$A = B$'],
    1, 'Por definición, $A > B$ si y solo si $A - B$ es un real positivo.'),

  Q(T.ord, 'facil', 'La desigualdad $x \\ge 3$ significa que:',
    ['$x$ es estrictamente mayor que $3$', '$x > 3$ o $x = 3$', '$x < 3$', '$x \\neq 3$'],
    1, 'El símbolo $\\ge$ une las relaciones «mayor que» e «igual a».'),

  Q(T.ord, 'facil', 'El intervalo abierto $]2, 5[$ corresponde al conjunto de $x$ tales que:',
    ['$2 \\le x \\le 5$', '$2 < x < 5$', '$x < 2$ o $x > 5$', '$x = 2$ o $x = 5$'],
    1, 'Los extremos abiertos no se incluyen: $]a,b[ = \\{x : a < x < b\\}$.'),

  Q(T.ord, 'facil', 'El intervalo cerrado $[0, 4]$ se escribe en notación de desigualdades como:',
    ['$0 < x < 4$', '$0 \\le x \\le 4$', '$x \\le 0$ o $x \\ge 4$', '$x > 0$ y $x < 4$'],
    1, 'Los corchetes indican extremos incluidos: $0 \\le x \\le 4$.'),

  Q(T.ord, 'facil', 'Al sumar $5$ a ambos lados de $x < 2$, se obtiene:',
    ['$x + 5 > 7$', '$x + 5 < 7$', '$x + 5 = 7$', '$x - 5 < 2$'],
    1, 'Sumar (o restar) el mismo número no cambia el sentido de la desigualdad.'),

  Q(T.ord, 'facil', 'Al multiplicar ambos lados de $x < 3$ por $-2$, el resultado correcto es:',
    ['$-2x < -6$', '$-2x > -6$', '$-2x = -6$', '$-2x < 6$'],
    1, 'Multiplicar o dividir por un número negativo invierte el sentido de la desigualdad.'),

  Q(T.lin, 'facil', 'La solución de $3x - 7 < 4$ es:',
    ['$x < \\dfrac{11}{3}$', '$x > \\dfrac{11}{3}$', '$x < \\dfrac{1}{3}$', '$x > -1$'],
    0, 'Se suma $7$: $3x < 11$. Al dividir por $3 > 0$ se mantiene el sentido: $x < \\frac{11}{3}$.'),

  Q(T.lin, 'facil', 'El conjunto solución de $2x + 5 \\ge 9$ es:',
    ['$x \\ge 2$', '$x \\le 2$', '$x > 7$', '$x \\ge 7$'],
    0, '$2x \\ge 4 \\Rightarrow x \\ge 2$. En notación de intervalo: $[2, +\\infty[$.'),

  Q(T.lin, 'facil', 'Al resolver $-x > 4$, se obtiene:',
    ['$x > -4$', '$x < -4$', '$x > 4$', '$x < 4$'],
    1, 'Dividir por $-1$ invierte el sentido: $x < -4$.'),

  Q(T.lin, 'facil', 'La inecuación $5x \\le 0$ tiene solución:',
    ['$x \\ge 0$', '$x \\le 0$', '$x = 0$ únicamente', 'conjunto vacío'],
    1, 'Dividiendo por $5 > 0$: $x \\le 0$.'),

  Q(T.sim, 'facil', 'La desigualdad simultánea $1 < x < 4$ es equivalente a:',
    ['$x > 1$ o $x < 4$', '$x > 1$ y $x < 4$', '$x \\le 1$ o $x \\ge 4$', '$x = 1$ y $x = 4$'],
    1, 'Una cadena $a < x < b$ es la conjunción $(x > a) \\land (x < b)$.'),

  Q(T.sim, 'facil', 'El conjunto solución de $2 < x < 5$ en notación de intervalo es:',
    ['$[2, 5]$', '$]2, 5[$', '$]2, 5]$', '$[2, 5[$'],
    1, 'Ambos extremos son estrictos → intervalo abierto $]2, 5[$.'),

  Q(T.abs, 'facil', 'El valor absoluto $|x|$ representa:',
    ['el opuesto de $x$', 'la distancia de $x$ al origen', 'el cuadrado de $x$', 'siempre un número negativo'],
    1, 'Geométricamente, $|x|$ es la distancia de $x$ al $0$ en la recta real.'),

  Q(T.abs, 'facil', 'Se cumple siempre que:',
    ['$|x| < 0$', '$|x| \\ge 0$', '$|x| = x$ para todo $x$', '$|x| = -x$ para todo $x$'],
    1, 'Por definición, el valor absoluto es no negativo: $|x| \\ge 0$.'),

  Q(T.abs, 'facil', 'La igualdad $|x| = 0$ se cumple si y solo si:',
    ['$x > 0$', '$x < 0$', '$x = 0$', '$x = \\pm 1$'],
    2, 'La distancia al origen es cero únicamente cuando el punto es el origen.'),

  Q(T.abs, 'facil', 'Para todo real $x$ se verifica:',
    ['$|x| = -|x|$', '$|x| = |-x|$', '$|x| + |-x| = 0$', '$|x| < |-x|$'],
    1, 'La distancia de $x$ y de $-x$ al origen es la misma.'),

  Q(T.abs, 'facil', 'El valor de $|-7|$ es:',
    ['$-7$', '$7$', '$0$', '$-1$'],
    1, 'Si $x < 0$, entonces $|x| = -x$. Aquí $|-7| = 7$.'),

  Q(T.abs, 'facil', 'La distancia entre los puntos $-3$ y $2$ en la recta es:',
    ['$1$', '$-5$', '$5$', '$6$'],
    2, '$d(A,B) = |A - B| = |-3 - 2| = |-5| = 5$.'),

  Q(T.ineqAbs, 'facil', 'Si $a > 0$, la desigualdad $|x| < a$ es equivalente a:',
    ['$x < -a$ o $x > a$', '$-a < x < a$', '$x \\le -a$', '$x > a$'],
    1, 'Distancia a $0$ menor que $a$ ↔ $x$ está en el intervalo abierto $(-a, a)$.'),

  Q(T.ineqAbs, 'facil', 'Si $a > 0$, la desigualdad $|x| > a$ es equivalente a:',
    ['$-a < x < a$', '$x < -a$ o $x > a$', '$-a \\le x \\le a$', '$x = \\pm a$'],
    1, 'Distancia a $0$ mayor que $a$ ↔ exterior del intervalo $[-a, a]$.'),

  Q(T.ineqAbs, 'facil', 'El conjunto solución de $|x| < 1$ es:',
    ['$]-1, 1[$', '$]-\\infty, -1[ \\cup ]1, +\\infty[$', '$[-1, 1]$', '$\\{1\\}$'],
    0, '$|x| < 1 \\iff -1 < x < 1 \\iff ]-1, 1[$.'),

  Q(T.ineqAbs, 'facil', 'El conjunto solución de $|x| > 4$ es:',
    ['$]-4, 4[$', '$]-\\infty, -4[ \\cup ]4, +\\infty[$', '$[-4, 4]$', '$\\varnothing$'],
    1, '$|x| > 4 \\iff x < -4$ o $x > 4$.'),

  Q(T.ineqAbs, 'facil', 'La ecuación $|x| = 3$ tiene soluciones:',
    ['$x = 3$', '$x = -3$', '$x = 3$ o $x = -3$', 'ninguna'],
    2, 'La distancia al origen es $3$ en $x = 3$ y en $x = -3$.'),

  Q(T.ineqAbs, 'facil', 'El conjunto solución de $|x| \\le 2$ es:',
    ['$]-2, 2[$', '$[-2, 2]$', '$]-\\infty, -2] \\cup [2, +\\infty[$', '$\\{0\\}$'],
    1, 'Con $\\le$ los extremos se cierran: $-2 \\le x \\le 2$.'),

  Q(T.abs, 'facil', 'La propiedad $\\sqrt{a^{2}}$ es igual a:',
    ['$a$', '$-a$', '$|a|$', '$a^{2}$'],
    2, 'La raíz cuadrada principal es no negativa, por lo que $\\sqrt{a^{2}} = |a|$.'),

  Q(T.lin, 'facil', 'La solución de $x + 3 > 0$ es:',
    ['$x > -3$', '$x < -3$', '$x > 3$', '$x < 3$'],
    0, 'Restar $3$: $x > -3$.'),

  Q(T.ord, 'facil', '¿Cuál de las siguientes es una desigualdad estricta?',
    ['$x \\ge 1$', '$x \\le 0$', '$x < 5$', '$x = 2$'],
    2, 'Estricta significa que no incluye la igualdad: $<$ o $>$.'),

  Q(T.abs, 'facil', 'El producto $|-2| \\cdot |3|$ es igual a:',
    ['$-6$', '$6$', '$1$', '$5$'],
    1, '$|-2| = 2$, $|3| = 3$, y $2 \\cdot 3 = 6$. También $|xy| = |x||y|$.'),

  Q(T.ineqAbs, 'facil', 'Si $|x| < 0$, el conjunto solución es:',
    ['$\\mathbb{R}$', '$\\{0\\}$', 'conjunto vacío $\\varnothing$', '$]-1, 1[$'],
    2, 'Como $|x| \\ge 0$ siempre, $|x| < 0$ es imposible.'),

  Q(T.ord, 'facil', 'La notación $x \\in [3, +\\infty[$ significa:',
    ['$x < 3$', '$x \\ge 3$', '$x > 3$', '$x \\le 3$'],
    1, '$[3, +\\infty[ = \\{x : x \\ge 3\\}$.'),
];

const medio = [
  Q(T.lin, 'medio', 'Al resolver $-2x + 1 \\le 7$, se obtiene:',
    ['$x \\ge -3$', '$x \\le -3$', '$x \\ge 3$', '$x \\le 3$'],
    0, '$-2x \\le 6$. Dividir por $-2$ invierte: $x \\ge -3$.'),

  Q(T.lin, 'medio', 'El conjunto solución de $4 - 3x > 10$ es:',
    ['$x < -2$', '$x > -2$', '$x < 2$', '$x > 2$'],
    0, '$-3x > 6 \\Rightarrow$ al dividir por $-3$: $x < -2$.'),

  Q(T.sim, 'medio', 'Al resolver la cadena $-7 \\le -2x + 1 < 19$, tras aislar $x$ se obtiene:',
    ['$-9 < x \\le 4$', '$-4 \\le x < 9$', '$-9 \\le x < 4$', '$4 < x \\le 9$'],
    0, 'Restar $1$: $-8 \\le -2x < 18$. Dividir por $-2$ (invertir ambos): $4 \\ge x > -9$, es decir $-9 < x \\le 4$.'),

  Q(T.sim, 'medio', 'La desigualdad $0 \\le 2x - 4 \\le 6$ equivale a:',
    ['$x \\in [2, 5]$', '$x \\in ]2, 5[$', '$x \\in [0, 6]$', '$x \\in [-1, 5]$'],
    0, 'Sumar $4$: $4 \\le 2x \\le 10$. Dividir por $2$: $2 \\le x \\le 5$.'),

  Q(T.ineqAbs, 'medio', 'La solución de $|x - 3| = 2$ es:',
    ['$x = 5$', '$x = 1$', '$x = 5$ o $x = 1$', '$x = 3$'],
    2, '$x - 3 = 2$ o $x - 3 = -2$ ⇒ $x = 5$ o $x = 1$.'),

  Q(T.ineqAbs, 'medio', 'El conjunto solución de $|x - 3| < 2$ es:',
    ['$]1, 5[$', '$]-\\infty, 1[ \\cup ]5, +\\infty[$', '$[1, 5]$', '$]1, 5]$'],
    0, '$-2 < x - 3 < 2 \\Rightarrow 1 < x < 5$.'),

  Q(T.ineqAbs, 'medio', 'El conjunto solución de $|x + 1| \\ge 3$ es:',
    ['$[-4, 2]$', '$]-\\infty, -4] \\cup [2, +\\infty[$', '$]-4, 2[$', '$\\{ -4, 2 \\}$'],
    1, '$x + 1 \\le -3$ o $x + 1 \\ge 3$ ⇒ $x \\le -4$ o $x \\ge 2$.'),

  Q(T.ineqAbs, 'medio', 'Para $|2x - 4| < 6$ (con $6 > 0$), se tiene:',
    ['$-1 < x < 5$', '$-5 < x < 1$', '$x < -1$ o $x > 5$', '$1 < x < 5$'],
    0, '$-6 < 2x - 4 < 6 \\Rightarrow -2 < 2x < 10 \\Rightarrow -1 < x < 5$.'),

  Q(T.ineqAbs, 'medio', 'La solución de $|3x + 6| > 9$ es:',
    ['$-5 < x < -1$', '$x < -5$ o $x > -1$', '$x < -1$ o $x > 5$', '$-1 < x < 5$'],
    1, '$3x + 6 < -9$ o $3x + 6 > 9$ ⇒ $x < -5$ o $x > -1$.'),

  Q(T.pol, 'medio', 'Para resolver $x^{2} - 9 < 0$ se factoriza $(x - 3)(x + 3) < 0$. El conjunto solución es:',
    ['$]-\\infty, -3[ \\cup ]3, +\\infty[$', '$]-3, 3[$', '$[-3, 3]$', '$\\mathbb{R}$'],
    1, 'El producto es negativo entre las raíces: $-3 < x < 3$.'),

  Q(T.pol, 'medio', 'El conjunto solución de $(x - 2)(x + 1) \\ge 0$ es:',
    ['$[-1, 2]$', '$]-\\infty, -1] \\cup [2, +\\infty[$', '$]-1, 2[$', '$\\{ -1, 2 \\}$'],
    1, 'Producto no negativo fuera de las raíces (incluyéndolas).'),

  Q(T.pol, 'medio', 'Al llevar $x^{2} \\le -2x + 15$ a forma estándar se obtiene:',
    ['$x^{2} + 2x - 15 \\le 0$', '$x^{2} + 2x - 15 \\ge 0$', '$x^{2} - 2x + 15 \\le 0$', '$x^{2} + 2x + 15 \\le 0$'],
    0, 'Pasar todo a un lado: $x^{2} + 2x - 15 \\le 0$, luego $(x + 5)(x - 3) \\le 0$.'),

  Q(T.abs, 'medio', 'La igualdad $|x - 2| = |2 - x|$ es:',
    ['verdadera solo si $x \\ge 2$', 'verdadera para todo $x$', 'nunca verdadera', 'verdadera solo si $x = 2$'],
    1, 'Siempre $|A| = |-A|$, y $2 - x = -(x - 2)$.'),

  Q(T.abs, 'medio', 'La desigualdad triangular afirma que:',
    ['$|x + y| \\ge |x| + |y|$', '$|x + y| \\le |x| + |y|$', '$|x + y| = |x| + |y|$ siempre', '$|x - y| > |x| + |y|$'],
    1, 'Siempre $|x + y| \\le |x| + |y|$.'),

  Q(T.abs, 'medio', 'Si $\\left|\\dfrac{x}{y}\\right|$ con $y \\neq 0$, entonces es igual a:',
    ['$\\dfrac{|x|}{|y|}$', '$\\dfrac{|x|}{y}$', '$\\dfrac{x}{|y|}$', '$|x| \\cdot |y|$'],
    0, 'Propiedad del cociente: $\\left|\\frac{x}{y}\\right| = \\frac{|x|}{|y|}$ ($y \\neq 0$).'),

  Q(T.ext, 'medio', 'La ecuación $|2x - 1| = 0$ tiene solución:',
    ['$x = 0$', '$x = \\dfrac{1}{2}$', '$x = -\\dfrac{1}{2}$', 'conjunto vacío'],
    1, '$|f| = 0 \\iff f = 0$: $2x - 1 = 0 \\Rightarrow x = \\frac{1}{2}$.'),

  Q(T.ext, 'medio', 'La inecuación $|x - 5| < 0$ tiene conjunto solución:',
    ['$\\{5\\}$', '$\\mathbb{R}$', '$\\varnothing$', '$]4, 6[$'],
    2, 'Ningún valor absoluto es negativo; el conjunto es vacío.'),

  Q(T.ext, 'medio', 'La inecuación $|x + 2| \\le 0$ se cumple si y solo si:',
    ['$x \\le -2$', '$x = -2$', '$x \\ge -2$', 'nunca'],
    1, '$|f| \\le 0$ fuerza $|f| = 0$, luego $x + 2 = 0$.'),

  Q(T.ineqAbs, 'medio', 'Si $|4x| = 8$, entonces:',
    ['$x = 2$', '$x = -2$', '$x = 2$ o $x = -2$', '$x = 8$'],
    2, '$|4x| = 4|x| = 8 \\Rightarrow |x| = 2 \\Rightarrow x = \\pm 2$.'),

  Q(T.lin, 'medio', 'El conjunto solución de $\\dfrac{x}{3} - 1 \\ge 2$ es:',
    ['$x \\ge 9$', '$x \\le 9$', '$x \\ge 3$', '$x \\ge 6$'],
    0, '$\\frac{x}{3} \\ge 3 \\Rightarrow x \\ge 9$.'),

  Q(T.sim, 'medio', 'La intersección de $x > -1$ y $x \\le 4$ es el intervalo:',
    ['$]-1, 4]$', '$[-1, 4[$', '$]-1, 4[$', '$[-1, 4]$'],
    0, 'Abierto en $-1$ y cerrado en $4$: $]-1, 4]$.'),

  Q(T.pol, 'medio', 'Las raíces de $x^{2} + 2x - 15 = 0$ son:',
    ['$x = 3$ y $x = 5$', '$x = -5$ y $x = 3$', '$x = -3$ y $x = 5$', '$x = -5$ y $x = -3$'],
    1, '$(x + 5)(x - 3) = 0$ ⇒ $x = -5$ o $x = 3$.'),

  Q(T.ineqAbs, 'medio', 'Interpretando $|x - 1| < 4$ como distancia, $x$ está a menos de $4$ unidades de:',
    ['$0$', '$1$', '$4$', '$-1$'],
    1, '$|x - c| < r$ describe el entorno abierto de centro $c$ y radio $r$.'),

  Q(T.abs, 'medio', 'Si $|x| = |y|$, entonces necesariamente:',
    ['$x = y$', '$x = -y$', '$x = y$ o $x = -y$', '$x > y$'],
    2, 'Misma distancia al origen implica $y = x$ o $y = -x$.'),

  Q(T.ord, 'medio', 'Al dividir la desigualdad $6 > -3x$ por $-3$, se obtiene:',
    ['$-2 > x$', '$-2 < x$', '$2 > x$', '$2 < x$'],
    1, 'Invertir el sentido: $-2 < x$, o bien $x > -2$.'),

  Q(T.ineqAbs, 'medio', 'El conjunto solución de $|x| \\ge 0$ es:',
    ['$\\varnothing$', '$\\{0\\}$', '$\\mathbb{R}$', '$]-\\infty, 0]$'],
    2, 'Todo real cumple $|x| \\ge 0$.'),

  Q(T.rat, 'medio', 'Al resolver una inecuación racional, el dominio exige que:',
    ['el numerador nunca sea cero', 'el denominador sea distinto de cero', 'ambas fracciones sean positivas', 'el grado del numerador sea mayor'],
    1, 'La expresión solo está definida donde el denominador no se anula.'),

  Q(T.ext, 'medio', 'El producto $|x| \\cdot |y|$ es igual a:',
    ['$|x + y|$', '$|xy|$', '$|x| + |y|$', '$x y$'],
    1, 'Propiedad: $|xy| = |x||y|$.'),

  Q(T.ineqAbs, 'medio', 'La solución de $|x + 4| = 0$ es:',
    ['$x = 4$', '$x = -4$', '$x = 0$', 'conjunto vacío'],
    1, '$x + 4 = 0 \\Rightarrow x = -4$.'),

  Q(T.lin, 'medio', 'Si $5 - x \\le 2x + 8$, entonces:',
    ['$x \\ge -1$', '$x \\le -1$', '$x \\ge 1$', '$x \\le 3$'],
    0, '$-x - 2x \\le 8 - 5 \\Rightarrow -3x \\le 3 \\Rightarrow x \\ge -1$.'),
];

const dificil = [
  Q(T.pol, 'dificil', 'El conjunto solución de $x^{2} + 2x - 15 \\le 0$ es:',
    ['$[-5, 3]$', '$]-\\infty, -5] \\cup [3, +\\infty[$', '$]-5, 3[$', '$[-3, 5]$'],
    0, '$(x + 5)(x - 3) \\le 0$ entre las raíces, incluidos extremos: $-5 \\le x \\le 3$.'),

  Q(T.pol, 'dificil', 'Para $x^{2} > 4$, el conjunto solución es:',
    ['$]-2, 2[$', '$]-\\infty, -2[ \\cup ]2, +\\infty[$', '$[-2, 2]$', '$\\mathbb{R}$'],
    1, '$x^{2} - 4 > 0 \\Rightarrow (x - 2)(x + 2) > 0$ fuera de $\\pm 2$.'),

  Q(T.ineqAbs, 'dificil', 'Al resolver $|3x - 6| \\ge 9$, se obtiene:',
    ['$x \\in [-1, 5]$', '$x \\in ]-\\infty, -1] \\cup [5, +\\infty[$', '$x \\in ]-1, 5[$', '$x \\in [1, 5]$'],
    1, '$3x - 6 \\le -9$ o $3x - 6 \\ge 9$ ⇒ $x \\le -1$ o $x \\ge 5$.'),

  Q(T.ineqAbs, 'dificil', 'La solución de $|2 - 5x| < 8$ es:',
    ['$-\\dfrac{6}{5} < x < 2$', '$-2 < x < \\dfrac{6}{5}$', '$x < -\\dfrac{6}{5}$ o $x > 2$', '$\\dfrac{6}{5} < x < 2$'],
    0, '$-8 < 2 - 5x < 8$. Restar $2$: $-10 < -5x < 6$. Dividir por $-5$ (invertir): $2 > x > -\\frac{6}{5}$.'),

  Q(T.sim, 'dificil', 'La solución de $-1 < 3 - 2x \\le 5$ es:',
    ['$-1 \\le x < 2$', '$-1 < x \\le 2$', '$1 \\le x < 2$', '$-2 < x \\le 1$'],
    0, 'Restar $3$: $-4 < -2x \\le 2$. Dividir por $-2$ (invertir): $2 > x \\ge -1$, es decir $-1 \\le x < 2$.'),

  Q(T.rat, 'dificil', 'Para $\\dfrac{x - 1}{x + 2} > 0$, los puntos críticos en la recta son $x = 1$ y $x = -2$. El conjunto solución es:',
    ['$]-2, 1[$', '$]-\\infty, -2[ \\cup ]1, +\\infty[$', '$[-2, 1]$', '$]-\\infty, -2] \\cup [1, +\\infty[$'],
    1, 'El cociente es positivo cuando numerador y denominador tienen el mismo signo; $x = -2$ está excluido del dominio.'),

  Q(T.rat, 'dificil', 'La inecuación $\\dfrac{1}{x} < 0$ se cumple cuando:',
    ['$x > 0$', '$x < 0$', '$x = 0$', 'para todo $x \\neq 0$'],
    1, 'Una fracción con numerador positivo es negativa si el denominador es negativo.'),

  Q(T.ext, 'dificil', 'La ecuación $|x - 1| + |x - 3| = 2$ se cumple para:',
    ['solo $x = 2$', 'todo $x \\in [1, 3]$', 'solo $x = 1$ y $x = 3$', 'ningún $x$'],
    1, 'Para $x$ entre $1$ y $3$, la suma de distancias a $1$ y a $3$ es exactamente $2$ (longitud del segmento).'),

  Q(T.ineqAbs, 'dificil', 'Si $|x| + |x - 2| < 2$, el conjunto solución es:',
    ['$]0, 2[$', '$\\varnothing$', '$[0, 2]$', '$\\mathbb{R}$'],
    1, 'La suma de distancias a $0$ y a $2$ es al menos $2$; es estrictamente menor que $2$ es imposible.'),

  Q(T.pol, 'dificil', 'El signo de $(x + 1)^{2}(x - 4)$ es no negativo cuando:',
    ['$x \\ge 4$', '$x \\le 4$', '$x \\in \\mathbb{R}$ excepto $x = -1$', '$x \\ge 4$ o $x = -1$'],
    3, '$(x + 1)^{2} \\ge 0$ siempre y vale $0$ en $x = -1$; el producto $\\ge 0$ si $x - 4 \\ge 0$ o si el cuadrado anula el producto.'),

  Q(T.abs, 'dificil', 'Desarrollar $|x|^{2}$ es equivalente a:',
    ['$x^{2}$', '$-x^{2}$', '$|x^{2}|$ solo si $x > 0$', '$2|x|$'],
    0, '$|x|^{2} = (|x|)^{2} = x^{2}$ para todo real $x$.'),

  Q(T.ineqAbs, 'dificil', 'La solución de $|4x + 8| = |2x - 2|$ se obtiene resolviendo:',
    ['solo $4x + 8 = 2x - 2$', '$4x + 8 = 2x - 2$ o $4x + 8 = -(2x - 2)$', 'solo $4x + 8 = -(2x - 2)$', '$x = 0$'],
    1, '$|A| = |B| \\iff A = B$ o $A = -B$.'),

  Q(T.ineqAbs, 'dificil', 'Resolviendo $|4x + 8| = |2x - 2|$, las soluciones son:',
    ['$x = -5$ y $x = -1$', '$x = -3$ y $x = 1$', '$x = -5$ y $x = 1$', '$x = -1$ únicamente'],
    0, 'Caso 1: $4x + 8 = 2x - 2 \\Rightarrow 2x = -10 \\Rightarrow x = -5$. Caso 2: $4x + 8 = -2x + 2 \\Rightarrow 6x = -6 \\Rightarrow x = -1$.'),

  Q(T.ext, 'dificil', 'Si $a = 0$, la desigualdad $|x| < a$ tiene solución:',
    ['$\\{0\\}$', '$\\varnothing$', '$\\mathbb{R}$', '$]-1, 1[$'],
    1, 'Con $a = 0$: $|x| < 0$ es vacío. (Si fuera $\\le 0$, solo $x = 0$.)'),

  Q(T.lin, 'dificil', 'La solución de $3(2 - x) > 2(x + 5)$ es:',
    ['$x < -\\dfrac{4}{5}$', '$x > -\\dfrac{4}{5}$', '$x < \\dfrac{4}{5}$', '$x > 4$'],
    0, '$6 - 3x > 2x + 10 \\Rightarrow -5x > 4 \\Rightarrow x < -\\frac{4}{5}$.'),

  Q(T.pol, 'dificil', 'Para $(2x - 1)(x + 3) > 0$, el conjunto solución es:',
    ['$]-3, \\tfrac{1}{2}[$', '$]-\\infty, -3[ \\cup ]\\tfrac{1}{2}, +\\infty[$', '$[-3, \\tfrac{1}{2}]$', '$]-\\infty, -3] \\cup [\\tfrac{1}{2}, +\\infty[$'],
    1, 'Producto positivo fuera de las raíces $x = -3$ y $x = \\frac{1}{2}$.'),

  Q(T.rat, 'dificil', 'Al estudiar $\\dfrac{x}{x - 3} \\ge 0$, el valor $x = 3$:',
    ['pertenece al conjunto solución', 'no pertenece porque anula el denominador', 'es la única solución', 'hace la expresión igual a $1$'],
    1, 'Aunque el numerador no cambia el signo en $x = 3$, la expresión no está definida allí.'),

  Q(T.ineqAbs, 'dificil', 'El conjunto $|x + 2| > |x - 5|$ describe los $x$ más cercanos a:',
    ['$-2$ que a $5$', '$5$ que a $-2$', 'equidistantes de $-2$ y $5$', 'ningún punto'],
    1, '$|x - a| > |x - b|$ significa que $x$ está más lejos de $a$ que de $b$, es decir más cerca de $b = 5$.'),

  Q(T.sim, 'dificil', 'La unión $x \\le -2$ o $x > 3$ en notación de intervalos es:',
    ['$[-2, 3]$', '$]-\\infty, -2] \\cup ]3, +\\infty[$', '$]-2, 3[$', '$]-\\infty, -2[ \\cup [3, +\\infty[$'],
    1, 'Unión de rayo cerrado por la izquierda y rayo abierto por la derecha.'),

  Q(T.abs, 'dificil', 'Si $|x| \\le |y|$, una interpretación correcta es:',
    ['$x$ está más lejos del origen que $y$', 'la distancia de $x$ al origen no supera la de $y$', '$x \\le y$ siempre', '$x^{2} > y^{2}$'],
    1, '$|x| \\le |y| \\iff$ distancia de $x$ a $0$ $\\le$ distancia de $y$ a $0$ $\\iff x^{2} \\le y^{2}$.'),

  Q(T.ext, 'dificil', 'La ecuación $|2x + 1| = -3$ tiene:',
    ['solución $x = -2$', 'solución $x = 1$', 'dos soluciones', 'ninguna solución'],
    3, 'Un valor absoluto nunca es negativo.'),

  Q(T.pol, 'dificil', 'Tras factorizar $x^{2} - 5x + 6 \\le 0$ como $(x - 2)(x - 3) \\le 0$, la solución es:',
    ['$[2, 3]$', '$]-\\infty, 2] \\cup [3, +\\infty[$', '$]2, 3[$', '$\\{2, 3\\}$'],
    0, 'Producto $\\le 0$ entre las raíces, incluidas.'),

  Q(T.ineqAbs, 'dificil', 'Para $|x| - 3 < 2$, primero se obtiene $|x| < 5$, luego:',
    ['$x \\in ]-5, 5[$', '$x \\in ]-\\infty, -5[ \\cup ]5, +\\infty[$', '$x \\in [-5, 5]$', '$x > 5$'],
    0, 'Aislar el valor absoluto (válido porque $5 > 0$) y aplicar la equivalencia interior.'),

  Q(T.rat, 'dificil', 'El dominio de $\\dfrac{2x + 1}{(x - 1)(x + 4)}$ excluye:',
    ['$x = -\\tfrac{1}{2}$', '$x = 1$ y $x = -4$', 'solo $x = 1$', 'ningún valor'],
    1, 'Ceros del denominador: $x = 1$ y $x = -4$.'),

  Q(T.ineqAbs, 'dificil', 'Al resolver $|1 - 2x| \\ge 5$, una forma correcta es:',
    ['$-5 \\le 1 - 2x \\le 5$', '$1 - 2x \\le -5$ o $1 - 2x \\ge 5$', '$-5 < 1 - 2x < 5$', '$1 - 2x = \\pm 5$ únicamente'],
    1, 'Para $|A| \\ge k$ ($k > 0$) se usa la forma exterior (disyunción).'),

  Q(T.lin, 'dificil', 'Si $ax + b < c$ y $a < 0$, al despejar $x$ el sentido de la desigualdad:',
    ['se conserva', 'se invierte', 'desaparece', 'solo se conserva si $b = 0$'],
    1, 'Dividir por coeficiente negativo invierte el sentido.'),

  Q(T.ext, 'dificil', 'La expresión $|x - 3| + |3 - x|$ simplifica a:',
    ['$0$', '$2|x - 3|$', '$|x|$', '$6$'],
    1, '$|3 - x| = |x - 3|$, luego la suma es $2|x - 3|$.'),

  Q(T.pol, 'dificil', 'Para $x(x - 2)(x + 1) < 0$, un método correcto es:',
    ['probar solo $x = 0$', 'tabla de signos en los intervalos determinados por $-1$, $0$ y $2$', 'sumar los factores', 'ignorar el factor $x$'],
    1, 'Los ceros ordenados dividen la recta; se estudia el signo del producto en cada intervalo abierto.'),

  Q(T.ineqAbs, 'dificil', 'El conjunto solución de $2 < |x| \\le 5$ es:',
    ['$[-5, -2[ \\cup ]2, 5]$', '$]-5, -2] \\cup [2, 5[$', '$[-5, -2] \\cup [2, 5]$', '$]-5, 5[$'],
    0, '$|x| \\le 5$ y $|x| > 2$: anillos $[-5, -2) \\cup (2, 5]$.'),
];

const experto = [
  Q(T.ineqAbs, 'experto', 'La solución de $|2x - 1| + |x + 3| \\ge 4$ incluye, entre otras, la región:',
    ['solo el punto $x = 0$', 'casi todos los reales excepto posiblemente un intervalo acotado donde la suma es menor', 'únicamente $x > 10$', 'el conjunto vacío'],
    1, 'La suma de distancias es una función convexa por tramos; $|A| + |B| \\ge 4$ falla solo donde esa suma es $< 4$ (si existe tal intervalo).'),

  Q(T.ext, 'experto', 'Para $|x^{2} - 1| < 3$, una equivalencia correcta es:',
    ['$-3 < x^{2} - 1 < 3$', '$x^{2} - 1 < 3$ únicamente', '$x^{2} - 1 > -3$ únicamente', '$|x| < 3$'],
    0, 'Con $3 > 0$: $-3 < x^{2} - 1 < 3$, luego $-2 < x^{2} < 4$. Como $x^{2} \\ge 0$, queda $x^{2} < 4$ y $x^{2} > -2$ (siempre): $|x| < 2$.'),

  Q(T.ineqAbs, 'experto', 'De $|x^{2} - 1| < 3$ se concluye finalmente:',
    ['$x \\in ]-2, 2[$', '$x \\in ]-\\infty, -2[ \\cup ]2, +\\infty[$', '$x \\in [-2, 2]$', '$x \\in ]-1, 1[$'],
    0, '$-2 < x^{2} < 4$. La parte $x^{2} > -2$ es automática; $x^{2} < 4 \\Rightarrow |x| < 2$.'),

  Q(T.rat, 'experto', 'La solución de $\\dfrac{x + 1}{x - 2} \\le 0$ es:',
    ['$[-1, 2[$', '$[-1, 2]$', '$]-\\infty, -1] \\cup ]2, +\\infty[$', '$]-1, 2[$'],
    0, 'Cociente $\\le 0$ entre las raíces del numerador y denominador, incluyendo $x = -1$ y excluyendo $x = 2$.'),

  Q(T.pol, 'experto', 'Para $x^{3} - x \\ge 0$, factorizando $x(x - 1)(x + 1) \\ge 0$, el conjunto solución es:',
    ['$[-1, 0] \\cup [1, +\\infty[$', '$]-\\infty, -1] \\cup [0, 1]$', '$[-1, 1]$', '$[0, +\\infty[$'],
    0, 'Tabla de signos con raíces $-1$, $0$, $1$: no negativo en $[-1, 0] \\cup [1, +\\infty[$.'),

  Q(T.ineqAbs, 'experto', 'Al resolver $|x - 1| \\cdot |x + 2| = 0$, se obtiene:',
    ['$x = 1$ o $x = -2$', 'solo $x = 1$', 'solo $x = -2$', 'ninguna solución'],
    0, 'Un producto de absolutos es cero si alguno es cero.'),

  Q(T.ineqAbs, 'experto', 'La inecuación $|x - 1| \\cdot |x + 2| > 0$ excluye exactamente:',
    ['el intervalo $[-2, 1]$', 'los puntos $x = 1$ y $x = -2$', 'todo $\\mathbb{R}$', 'ningún punto'],
    1, 'El producto es positivo en todos lados excepto donde algún factor se anula.'),

  Q(T.ext, 'experto', 'Si $|2x + 3| \\le |x - 1|$, al elevar al cuadrado (ambos lados $\\ge 0$) se obtiene una inecuación equivalente. Las soluciones forman:',
    ['un intervalo cerrado acotado', 'dos rayos disjuntos', 'un único punto', 'el vacío'],
    0, '$(2x + 3)^{2} \\le (x - 1)^{2}$ lleva a una desigualdad cuadrática cuya solución es un segmento (entre las raíces del correspondiente polinomio).'),

  Q(T.ineqAbs, 'experto', 'Resolviendo $|2x + 3| \\le |x - 1|$ por casos o por cuadrados, el conjunto solución es:',
    ['$[-4, -\\tfrac{2}{3}]$', '$[-\\tfrac{2}{3}, 4]$', '$]-\\infty, -4] \\cup [-\\tfrac{2}{3}, +\\infty[$', '$\\{ -1 \\}$'],
    0, '$(2x + 3)^{2} - (x - 1)^{2} \\le 0$ ⇒ diferencia de cuadrados: $(3x + 2)(x + 4) \\le 0$ ⇒ $x \\in [-4, -\\frac{2}{3}]$.'),

  Q(T.sim, 'experto', 'El sistema $x + y > 2$ y $x - y \\le 1$ en el plano describe:',
    ['un único punto', 'una región (semiespacios intersectados)', 'una circunferencia', 'el vacío siempre'],
    1, 'Cada desigualdad lineal define un semiplano; su intersección es una región poligonal no acotada.'),

  Q(T.rat, 'experto', 'Para $\\dfrac{x^{2} - 4}{x - 2} > 0$ con $x \\neq 2$, tras simplificar $(x + 2)$ cuando $x \\neq 2$, la solución es:',
    ['$x > -2$ y $x \\neq 2$', '$x > -2$', '$x < -2$', '$x > 2$'],
    0, 'Para $x \\neq 2$: $\\frac{(x - 2)(x + 2)}{x - 2} = x + 2$, luego $x + 2 > 0$ con $x \\neq 2$.'),

  Q(T.pol, 'experto', 'La inecuación $(x - 1)^{2} \\le 0$ tiene solución:',
    ['$\\mathbb{R}$', '$\\{1\\}$', '$]-\\infty, 1]$', '$\\varnothing$'],
    1, 'Un cuadrado es $\\le 0$ solo cuando es $0$: $x = 1$.'),

  Q(T.ineqAbs, 'experto', 'Sea $a < 0$. Entonces $|x| > a$ se cumple para:',
    ['ningún $x$', 'todo $x \\in \\mathbb{R}$', 'solo $x > a$', 'solo $x < a$'],
    1, 'Como $|x| \\ge 0 > a$, la desigualdad es verdadera para todo real.'),

  Q(T.ineqAbs, 'experto', 'Sea $a < 0$. Entonces $|x| < a$ se cumple para:',
    ['todo $x$', 'ningún $x$', 'solo $x = 0$', 'solo $x > 0$'],
    1, 'Un no negativo no puede ser estrictamente menor que un negativo.'),

  Q(T.ext, 'experto', 'La ecuación $|x| + |x - 1| + |x - 2| = 2$ tiene conjunto solución:',
    ['$\\{1\\}$', '$[0, 2]$', '$\\{0, 2\\}$', '$\\varnothing$'],
    0, 'La suma de distancias a $0$, $1$ y $2$ es mínima ($= 2$) en el segmento $[0, 2]$, pero igualar exactamente a $2$ fuerza el mínimo: solo en el «mediana» $x = 1$ para tres puntos colineales… En realidad para puntos $0,1,2$ el mínimo es $2$ en todo $[0,2]$. Corrección: mínimo $=2$ en todo $x \\in [0, 2]$. Revisar: d(0)+d(1)+d(2). Para $x \\in [0,2]$: $(x-0)+|x-1|+(2-x) = 2 + |x-1| \\ge 2$, igual a $2$ solo si $|x-1|=0$, es decir $x=1$.'),

  Q(T.ineqAbs, 'experto', 'Si $|3x - 6| = 2|x + 1|$, una solución es $x = 4$. La otra solución es:',
    ['$x = 0$', '$x = \\dfrac{4}{5}$', '$x = -\\dfrac{4}{5}$', '$x = 2$'],
    1, 'Casos: $3x - 6 = 2(x + 1)$ ⇒ $x = 8$… Mejor: $3x - 6 = 2(x + 1)$ ⇒ $x = 8$; $3x - 6 = -2(x + 1)$ ⇒ $5x = 4$ ⇒ $x = \\frac{4}{5}$. Verificación: en $x=4$: $|12-6|=6$, $2|5|=10$ — no. Recalcular: $3x-6=2x+2$ ⇒ $x=8$; $|24-6|=18$, $2|9|=18$ ok. Segunda: $3x-6=-2x-2$ ⇒ $5x=4$ ⇒ $x=\\frac{4}{5}$. Opciones deben incluir $8$ y $4/5$. Ajustar opciones.'),

  Q(T.pol, 'experto', 'Para $x^{4} - 5x^{2} + 4 \\le 0$, con $u = x^{2}$, se resuelve $u^{2} - 5u + 4 \\le 0$. Luego $u \\in [1, 4]$, por lo que:',
    ['$|x| \\in [1, 2]$', '$x \\in [-2, -1] \\cup [1, 2]$', '$x \\in [-2, 2]$', '$x^{2} \\le 1$'],
    1, '$1 \\le x^{2} \\le 4 \\Rightarrow |x| \\in [1, 2]$ ⇒ $x \\in [-2, -1] \\cup [1, 2]$.'),

  Q(T.rat, 'experto', 'Al resolver $\\dfrac{2x - 1}{x + 3} > 1$, primero se lleva a un solo cociente: $\\dfrac{2x - 1 - (x + 3)}{x + 3} > 0$, es decir:',
    ['$\\dfrac{x - 4}{x + 3} > 0$', '$\\dfrac{x + 4}{x + 3} > 0$', '$\\dfrac{x - 4}{x + 3} < 0$', '$\\dfrac{3x + 2}{x + 3} > 0$'],
    0, '$2x - 1 - x - 3 = x - 4$, luego $\\frac{x - 4}{x + 3} > 0$.'),

  Q(T.rat, 'experto', 'La solución de $\\dfrac{x - 4}{x + 3} > 0$ es:',
    ['$]-3, 4[$', '$]-\\infty, -3[ \\cup ]4, +\\infty[$', '$[-3, 4]$', '$]-\\infty, -3] \\cup [4, +\\infty[$'],
    1, 'Mismo signo fuera de $-3$ y $4$; se excluye $x = -3$.'),

  Q(T.abs, 'experto', 'La desigualdad $|x| + |y| \\ge |x + y|$ es:',
    ['siempre falsa', 'la desigualdad triangular (siempre verdadera)', 'verdadera solo si $xy > 0$', 'equivalente a $x = 0$'],
    1, 'Es exactamente la desigualdad triangular.'),

  Q(T.ineqAbs, 'experto', 'El conjunto $1 \\le |2x - 3| < 5$ equivale a la intersección de $|2x - 3| \\ge 1$ y $|2x - 3| < 5$. El resultado es:',
    ['$]-1, 1] \\cup [2, 4[$', '$]-1, 4[$', '$[1, 2]$', '$]-\\infty, -1] \\cup [4, +\\infty[$'],
    0, '$|2x-3|<5$ ⇒ $-1 < x < 4$. $|2x-3|\\ge 1$ ⇒ $x \\le 1$ o $x \\ge 2$. Intersección: $(-1, 1] \\cup [2, 4)$.'),

  Q(T.ext, 'experto', 'Si $|f(x)| = g(x)$ y $g(x) < 0$ en un intervalo, allí:',
    ['hay dos soluciones', 'hay una solución', 'no hay soluciones', 'todas las $x$ sirven'],
    2, 'El lado izquierdo es $\\ge 0$; no puede igualar un negativo.'),

  Q(T.pol, 'experto', 'Para $(x^{2} - 1)(x^{2} - 9) < 0$, con $u = x^{2}$, se necesita $1 < u < 9$, luego:',
    ['$x \\in ]-3, -1[ \\cup ]1, 3[$', '$x \\in ]-3, 3[$', '$x \\in ]-1, 1[$', '$|x| > 3$'],
    0, '$1 < x^{2} < 9$ ⇒ $|x| \\in (1, 3)$ ⇒ unión de dos intervalos.'),

  Q(T.ineqAbs, 'experto', 'Una estrategia segura en examen para $|ax + b| > c$ con $c > 0$ es:',
    ['escribir $-c < ax + b < c$', 'desdoblar: $ax + b < -c$ o $ax + b > c$', 'elevar al cuadrado sin condiciones', 'sustituir $c$ por $-c$'],
    1, 'Forma exterior: disyunción de dos inecuaciones lineales.'),

  Q(T.sim, 'experto', 'La cadena $a \\le f(x) \\le b$ con $a > b$ tiene solución:',
    ['siempre $\\mathbb{R}$', 'siempre vacía', 'solo si $f$ es constante', 'los ceros de $f$'],
    1, 'Ningún número puede ser $\\ge a$ y $\\le b$ si $a > b$.'),

  Q(T.rat, 'experto', 'Al multiplicar ambos lados de $\\dfrac{1}{x} < 2$ por $x$, el error típico es:',
    ['olvidar el dominio $x \\neq 0$', 'no considerar que $x$ puede ser negativo (y entonces invertir)', 'ambos errores anteriores', 'usar común denominador'],
    2, 'Hay que pasar a un solo lado $\\frac{1 - 2x}{x} < 0$ o estudiar casos $x > 0$ y $x < 0$.'),

  Q(T.ineqAbs, 'experto', 'El mínimo de $|x + 1| + |x - 4|$ se alcanza en:',
    ['$x = -1$', 'cualquier $x \\in [-1, 4]$', 'solo $x = 4$', '$x = \\tfrac{3}{2}$ únicamente'],
    1, 'Suma de distancias a $-1$ y $4$: mínimo constante e igual a $5$ en el segmento que los une.'),

  Q(T.ext, 'experto', 'La ecuación $|x - 2| = 2x - 1$ requiere la condición auxiliar:',
    ['$2x - 1 \\ge 0$', '$2x - 1 < 0$', '$x = 2$', 'ninguna'],
    0, 'El lado derecho debe ser $\\ge 0$ porque iguala un valor absoluto.'),

  Q(T.ineqAbs, 'experto', 'Con la condición $2x - 1 \\ge 0$, al resolver $|x - 2| = 2x - 1$ se obtiene la solución válida:',
    ['$x = 1$', '$x = \\dfrac{1}{3}$', '$x = 3$', '$x = \\dfrac{3}{2}$'],
    0, 'Casos: $x - 2 = 2x - 1$ ⇒ $x = -1$ (descartada por $x \\ge \\frac{1}{2}$); $-(x - 2) = 2x - 1$ ⇒ $-x + 2 = 2x - 1$ ⇒ $3 = 3x$ ⇒ $x = 1$, y $1 \\ge \\frac{1}{2}$ vale.'),
];

// Fix the two experto items that had draft notes in explanations / wrong options
experto[14] = Q(T.ext, 'experto',
  'La ecuación $|x| + |x - 1| + |x - 2| = 2$ tiene conjunto solución:',
  ['$\\{1\\}$', '$[0, 2]$', '$\\{0, 2\\}$', '$\\varnothing$'],
  0,
  'Para $x \\in [0, 2]$: $|x| + |x - 1| + |x - 2| = 2 + |x - 1| \\ge 2$, y vale $2$ solo si $x = 1$. Fuera de $[0, 2]$ la suma es $> 2$.');

experto[15] = Q(T.ineqAbs, 'experto',
  'Si $|3x - 6| = 2|x + 1|$, las soluciones son:',
  ['$x = 8$ y $x = \\dfrac{4}{5}$', '$x = 4$ y $x = 0$', '$x = 2$ y $x = -1$', '$x = 8$ únicamente'],
  0,
  'Caso $3x - 6 = 2(x + 1)$: $x = 8$. Caso $3x - 6 = -2(x + 1)$: $5x = 4$, $x = \\frac{4}{5}$. Ambas verifican.');

const bank = [...facil, ...medio, ...dificil, ...experto];

function validate(arr) {
  const by = {};
  const errs = [];
  arr.forEach((q, i) => {
    by[q.d] = (by[q.d] || 0) + 1;
    if (!q.t || !q.d || !q.q || !Array.isArray(q.o) || q.o.length !== 4) errs.push(`bad shape @${i}`);
    if (typeof q.a !== 'number' || q.a < 0 || q.a > 3) errs.push(`bad answer @${i}`);
    if (!q.s || q.s.length < 20) errs.push(`short solution @${i}`);
  });
  return { by, errs, total: arr.length };
}

const { by, errs, total } = validate(bank);
if (errs.length) {
  console.error('Validation errors:', errs.slice(0, 20));
  process.exit(1);
}
console.log('ineq bank:', total, by);

// Merge into bank.js
const bankPath = join(root, 'bank.js');
const code = readFileSync(bankPath, 'utf8');
const sandbox = { window: {} };
vm.runInNewContext(code, sandbox);
const BANK = sandbox.window.BANK;
BANK.ineq = bank;

// Rebuild: keep trig + ineq pretty; others compact like original mat line style
function prettyArr(arr) {
  return '[\n' + arr.map((q) => '  ' + JSON.stringify(q, null, 2).replace(/\n/g, '\n  ')).join(',\n') + '\n]';
}

const out =
  'window.BANK = {\n' +
  '  trig: ' + prettyArr(BANK.trig) + ',\n' +
  '  ineq: ' + prettyArr(BANK.ineq) + ',\n' +
  '"mat":' + JSON.stringify(BANK.mat) + ',\n' +
  '"fis":' + JSON.stringify(BANK.fis) + ',\n' +
  '"qui":' + JSON.stringify(BANK.qui) + ',\n' +
  '"len":' + JSON.stringify(BANK.len) + '\n' +
  '};\n';

writeFileSync(bankPath, out);
console.log('Wrote', bankPath, 'keys:', Object.keys(BANK).join(', '));
