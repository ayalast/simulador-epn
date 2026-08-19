# Cómo crear simuladores nuevos (EPN 2026-B)

Guía para un agente (o humano) que llegue después. El código vive en `C:\simulador-epn`. La app es un SPA estático: `index.html` + `app.js` + bancos JS. Producción: Cloudflare Pages `https://simulador-epn.pages.dev`.

Lee también `AGENTS.md` (anti-overfitting) antes de añadir un banco.

## 1. Familias que ya existen

Hay **dos mundos** en la barra: **Guía EPN** (`S.area === 'guia'`) y **Aula Barreno** (`S.area === 'aula'`). No los mezcles.

| Familia | Dónde se ve | Banco | Cómo se eligen las preguntas | ¿Pastillas Fácil/Intermedio/Difícil/Experto? |
|---|---|---|---|---|
| Aula Barreno | Home Aula → MAT/FIS/QUI/LEN/trig/ineq/mix | `bank.js` → `window.BANK` | `pickForSubject` + `levelPool` filtra `q.d === cfg.level` | **Sí.** Único sitio donde esas pastillas cambian el set. |
| Guía oficial (intermedio) | Home Guía → «Simuladores actuales» | `guia-bank-1000-intermedio.js` → `GUIA_BANK_1000` | `pickForGuia1000(..., 'todos')` | **No.** Banco fijo de nivel oficial. |
| Entrenamiento avanzado F/Q/L | Home Guía → «Nuevos · entrenamiento avanzado» | `guia-bank-fql-avanzado.js` → `GUIA_BANK_FQL_AVANZADO` | `pickForGuia1000(..., 'todos', GUIA_BANK_FQL_AVANZADO, 'fis-avz')` | **No.** Toma el banco avanzado entero. |
| Día 2 formato real | Home Guía → card «Día 2 · formato real» | `guia-bank-fql-dia2.js` → `GUIA_BANK_FQL_DIA2` | `pickDia2Packs` (textos/casos enteros) + `pickForGuia1000` química `strictUnseen` | **No.** El set lo elige el formato oficial. |
| 30 simuladores MAT | Home Guía, pestañas Intermedio / Difícil / Experto | `guia-bank-mat-1500.js` + `simuladores-programados.js` | Lista fija `question_ids` por `sim_id` | **No en la ficha.** El nivel es la pestaña + el `sim.nivel`. |
| Intensivo filtro | Home Guía, bloque filtro | `guia-bank-filtro-rotativo.js` + `simuladores-filtro.js` | `pickRotatingFiltroBank` (slots por familia) | **No.** |
| Examen 69P | Home Guía → botón «Iniciar examen 69P» | `guia-bank-69.js` | Orden fijo del examen oficial | **No.** |

Cursos guía muestreados (no programados):

- Oficiales: `guia_mat30`, `guia_fql120`, `guia_fis`, `guia_qui`, `guia_len` — array `GUIA_COURSES_OFICIAL`.
- Avanzados: `guia_fis_avz`, `guia_qui_avz`, `guia_len_avz`, `guia_fql_avz` (corto 15+15+15), `guia_fql_dia2` (Día 2 real 20+20+20 en bloques) — array `GUIA_COURSES_AVZ`.
- Unión: `GUIA_COURSES`.

La regla de UI está centralizada:

```js
courseUsesDifficultySelector(k)   // true solo para mat/trig/ineq/fis/qui/len/mix
contextUsesDifficultySelector()   // pastillas del modal Configuración
```

Si un simulador **no** filtra de verdad por `cfg.level`, **no** pongas las pastillas. Si más adelante un banco nuevo sí tiene niveles reales y el picker los usa, añade la clave a `AULA_LEVEL_COURSES` **o** crea un flag explícito en el curso; no copies pastillas “de adorno”.

Claves de nivel:

- Aula (`BANK`): `facil` | `medio` | `dificil` | `experto` (`LEVELS`; la pastilla “Intermedio” es `medio`).
- Guía 1000 / avanzado / 30 MAT: `intermedio` | `dificil` | `experto`.
- No mezclar `medio` con `intermedio`.

## 2. Archivos que siempre tocas

| Archivo | Para qué |
|---|---|
| `app.js` | `COURSES`, `GUIA_COURSES_*`, `CKEYS`, `defaultGuiaCfg`, `countFor`/`minutesFor`, `buildGuia1000Attempt` o `buildProgrammedSimAttempt`, cards en `viewGuiaHome`, `lookupFig` si hay figuras nuevas |
| `index.html` | `<script src="...">` del banco y de `js/fig-*.js` |
| `scripts/sync-public.mjs` | Lista `files` + carpeta `js/` |
| Banco `guia-bank-*.js` | `window.NOMBRE = { mat/fis/qui/len: [...] }` |
| `js/fig-*.js` | `window.FIG_*[nombre] = function(){ return svg; }` |
| `docs/CREAR-SIMULADORES.md` | Actualiza esta tabla si nace una familia nueva |

Rutas de hash (ya cableadas si el id está en `GUIA_COURSES` o es un `sim_id` programado):

- Curso guía: `#guia/simulador/<courseKey>`
- Intento / resumen / revisión: `.../intento` `.../resumen` `.../revision`
- 30 MAT / filtro: igual, con `sim_id` (`mat-int-sim-01`, `filtro-01`, …)

## 3. Forma de una pregunta (bancos guía)

```js
{
  id: 'qui-avz-12',          // único en toda la app
  s: 'qui',                  // mat | fis | qui | len
  n: 12,
  d: 'experto',              // etiqueta; el picker avanzado/oficial ignora el filtro
  topics: ['4.3.3-lewis'],   // primer topic = eje de cobertura
  ch: 'q3',                  // capítulo de teoría (botón en revisión)
  t: 'Lewis',                // etiqueta corta
  prompt: '...',             // LaTeX solo dentro de $...$
  opts: ['A','B','C','D'],   // 4 o 5
  ans: 2,                    // índice 0-based
  exp: '**Paso 1.** ... **Paso 2.** ... **Respuesta correcta: C. ...**',
  maths: [],
  imgs: [],
  fig: 'avz-qui-35'          // opcional; nombre en el registro FIG_*
}
```

Al armar el intento, `buildGuia1000Attempt` copia `fig` → `src.figName`. `serializeAttempt` / `deserializeAttempt` **deben** persistir `figName` o las figuras desaparecen al recargar.

`pickForGuia1000(subject, want, notes, forcedLevel, bankSrc, seenKey)`:

- `forcedLevel`: en oficiales y avanzados pasa `'todos'` (no filtrar por `cfg.level` del Aula).
- `bankSrc`: omite = `GUIA_BANK_1000`; avanzado = `window.GUIA_BANK_FQL_AVANZADO`.
- `seenKey`: `SEEN1000` / `SEEN1000SET`. Avanzado usa `fis-avz`, `qui-avz`, `len-avz` para no mezclar con el oficial.

Anti-overfitting (obligatorio, ver `AGENTS.md`):

1. No repetir `id` ni `prompt` en el mismo intento.
2. Priorizar no vistas (`SEEN1000SET`) hasta agotar el banco; luego reciclar.
3. Cobertura máxima por `topics[0]`.
4. `shuffleOptions` y `shuffleQuestions` respetan `cfg`.
5. No enseñar pastillas de dificultad si el picker no las usa.

## 4. Receta A — otro simulador sobre un banco guía ya existente

Ejemplo: un “QUI 10 minutos” que usa el banco oficial.

1. Elige `courseKey` estable (`guia_qui_rapido`).
2. Añádelo a `GUIA_COURSES_OFICIAL` o `GUIA_COURSES_AVZ` según el banco.
3. Entrada en `COURSES` (`name`, `short`, `full`, `desc`, `color`, `icon`; `nuevo:true` si es avanzado).
4. Inclúyelo en `CKEYS`.
5. `defaultGuiaCfg`, `countFor`, `minutesFor`.
6. Rama en `buildGuia1000Attempt` (`pickForGuia1000` con `'todos'` y el banco correcto).
7. Card en `viewGuiaHome` (sección **actuales** vs **nuevos**; no mezclar).
8. Si hay figuras, `lookupFig` ya recorre `FIG_FILTRO`, `FIG_FIS`, `FIG_QUI`, `FIG_LEN`, `FIG_AVZ`.
9. Deploy (sección 8).

## 5. Receta B — banco nuevo (el caso avanzado F/Q/L)

Patrón ya usado: `guia-bank-fql-avanzado.js` + `js/fig-fql-avanzado.js`.

1. Fuente (markdown, Notion, ZIP) → parser en `scripts/` (ver `parse_banco_avanzado.py`, `emit_banco_avanzado.py`).
2. Emite `guia-bank-<nombre>.js` con `window.GUIA_BANK_<NOMBRE>`.
3. Figuras: SVG a mano en `js/fig-<nombre>.js` (`window.FIG_XYZ`). Nada de PNG inventados si el enunciado pide esquema; redibuja.
4. `<script>` en `index.html` **antes** de `app.js`.
5. Añade el archivo a `scripts/sync-public.mjs`.
6. `lookupFig`: mete `window.FIG_XYZ` en el array de registros.
7. Receta A para cada curso que consuma el banco.
8. `seenKey` propio (`xxx-avz`) para no ensuciar `SEEN1000.fis` del oficial.
9. Resuelve a mano cada ítem. `exp` con `**Paso N.**` (la revisión parte por ese patrón).
10. En home: bloque **aparte** del oficial. Texto claro: no sustituye al de 69 / intermedio.

No metas Física/Química/Lenguaje avanzados dentro de `GUIA_BANK_1000`. Ese archivo es el banco intermedio oficial.

## 5b. Día 2 formato real (`guia_fql_dia2`)

Copia el simulador oficial de 69 y la guía 2026-B (120 min para F+Q+L):

- Lenguaje: campo `reading` + varias preguntas del mismo `pack`. El picker toma el pack entero.
- Física: mismo caso en `reading` y 2–4 preguntas por pack.
- Química: ítems sueltos (`pickForGuia1000` + `strictUnseen`).
- Orden del intento: **LEN → FIS → QUI** (no se baraja). Navegación secuencial.
- Vistos: `SEEN1000` en `len-d2`, `fis-d2`, `qui-d2`. IDs distintos del banco `*-avz` para no chocar con el combinado corto de 45.
- El picker es `fillDia2Subject`: primero packs inéditos, luego ítems sueltos inéditos, luego recicla. **Siempre** 20 por materia si el banco tiene ≥20. No recortar por enunciado repetido (`«La idea principal es:»` en textos distintos no es la misma pregunta).
- Smoke: `node scripts/smoke-dia2-picker.mjs`.
- Banco: `guia-bank-fql-dia2.js` → `window.GUIA_BANK_FQL_DIA2`. Packs en `packs.len` / `packs.fis`.
- Para añadir un texto nuevo: crea 3–6 preguntas con el mismo `reading` y un `pack` nuevo, y súbelo a `packs.len`.

## 6. Receta C — un simulador más de los 30 MAT

No uses pastillas. El nivel es el `sim_id`.

1. Preguntas nuevas en `guia-bank-mat-1500.js` (`id` tipo `mat-int-0xxx` / `mat-dif-` / `mat-exp-`).
2. Objeto en `simuladores-programados.js` → `SIMULADORES_PROGRAMADOS.simuladores`:

```js
{
  sim_id: 'mat-dif-sim-11',
  simulador: 11,
  nivel: 'dificil',          // pestaña que lo muestra
  nombre: '...',
  descripcion: '...',
  duracion_min: 45,
  total_preguntas: 30,
  question_ids: ['mat-dif-0xxx', ...]
}
```

3. `registerProgrammedSimsInCourses` lo registra solo. La ficha es `viewProgrammedSimPreview`; el start es `data-act="start-prog-sim"`.
4. Actualiza `meta.total_simuladores` si cambia el recuento.

Filtro rotativo: `simuladores-filtro.js` con `rotatePool: true` y `slots: [{fam, n}]`. Familias en `guia-bank-filtro-rotativo.js` (`q.fam`).

## 7. Receta D — curso del Aula Barreno

Solo aquí las pastillas son válidas.

1. Preguntas en `bank.js` (`window.BANK.<clave>`), `q.d` ∈ `facil|medio|dificil|experto`.
2. `COURSES`, `CKEYS`, `SUBJ` si es materia.
3. `AULA_LEVEL_COURSES` debe incluir la clave (si no, no aparecen pastillas).
4. `pickForSubject` / `levelPool` ya filtran.

## 8. Publicar

El sitio que ve Bryan es la **Production** de Pages, rama **`main`**. Un deploy a `production` o `preview` no actualiza `simulador-epn.pages.dev`.

```bash
cd C:\simulador-epn
node scripts/sync-public.mjs
npx wrangler pages deploy public --project-name=simulador-epn --branch=main --commit-dirty=true
```

`npm run deploy` corre smokes primero; si `smoke-math-prose.mjs` u otro falla por un error viejo, despliega con wrangler como arriba y avisa.

Tras el deploy: hard refresh (Ctrl+F5). Si “no veo lo nuevo”, casi siempre es caché o deploy a la rama equivocada.

## 9. Verificación mínima antes de dar por cerrado

- Home Guía: el curso nuevo está en la sección correcta (oficial vs nuevo).
- Ficha del curso: pastillas de dificultad **solo** si `courseUsesDifficultySelector` es true.
- Configuración abierta desde Guía: **sin** esas pastillas.
- Un intento de punta a punta: opciones, figura (`src.figName`), explicación por pasos, F5 no pierde la figura.
- Aula MAT: las pastillas siguen cambiando el banco (`facil` ≠ `experto`).
- 30 MAT: las tres pestañas siguen listando 10 simulacros cada una.

## 10. Qué no hacer

- No reutilizar `GUIA_BANK_1000` para material más difícil que el oficial.
- No mostrar pastillas bloqueadas con candado “próximamente”. Si no filtran, no existen.
- No filtrar un curso guía con `cfg.level` del Aula (queda `forcedLevel: 'todos'`).
- No desplegar a otra rama que no sea `main` si el usuario debe verlo en `simulador-epn.pages.dev`.
- No hay más PCs que laptop, escritorio `bryan` (`ssh pc2` / `ssh pc2-radmin`) y VPS Oracle (`ssh vps`).
