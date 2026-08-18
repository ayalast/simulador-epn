# QA de teoría Guía EPN FIS/QUI/LEN

Fecha: 2026-08-18  
Repositorio: `C:\simulador-epn`  
Rama: `feat/guia-teoria-fql-notion`  
Fuente: `C:\simulador-epn\tmp-teoria-notion\export\Examen de admisión EPN 2026-B\`

## Resultado de inventario

| Área | Capítulos verificados |
|---|---:|
| Filtro | 11 |
| Matemática | 14 |
| Física nueva | 16 |
| Química nueva | 17 |
| Lenguaje nuevo | 9 |
| General | 1 |
| Total cargado | 68 |
| Lecciones nuevas recorridas en navegador | 42 |

Los IDs nuevos generados son `fis-L01`…`fis-L16`, `qui-L01`…`qui-L17` y `len-L01`…`len-L09`. Los IDs son únicos y cada lección nueva tiene cuerpo, headings, código y marcador de figura.

## Checks de máquina

Se ejecutó `node --check` sobre `app.js`, `guia-theory-fis.js`, `guia-theory-qui.js`, `guia-theory-len.js`, `js/fig-fis.js`, `js/fig-qui.js` y `js/fig-len.js`; todos pasaron. El inventario por VM confirmó los conteos, 68 IDs únicos, cuerpos no vacíos, headings suficientes y ausencia de `app.notion.com`, `Falta FIG`, Mermaid crudo, `\\bigl` y `\\O` en los capítulos cargados. `git diff --check` también pasó.

## QA de navegador

Se recorrieron las 42 rutas nuevas en Chromium con servidor estático desde la raíz del repositorio en `http://127.0.0.1:8080/`. Se verificaron el hub de Guía en desktop y móvil, una lección Física en desktop y móvil, una lección Química, una lección Lenguaje, carga directa de rutas, render de `.theory`, cuerpos con contenido, ausencia de `Falta FIG`, navegación de todas las lecciones y modo Aula separado. El resultado final fue: 42 capítulos, cero errores de consola y cero respuestas 404.

Las capturas se guardaron en `capturas_teoria/` con los nombres `qa_fql_hub_desktop.png`, `qa_fql_hub_mobile.png`, `qa_fql_fis-L01_desktop.png`, `qa_fql_fis-L01_mobile.png`, `qa_fql_qui-L01_desktop.png` y `qa_fql_len-L01_desktop.png`, además de la captura de `len-L09`.

## Correcciones realizadas

Se añadieron los catálogos `js/fig-fis.js`, `js/fig-qui.js` y `js/fig-len.js`, los archivos de teoría `guia-theory-fis.js`, `guia-theory-qui.js` y `guia-theory-len.js`, sus referencias en `index.html` y su sincronización en `scripts/sync-public.mjs`. Se incorporó `lookupFig(name)` con búsqueda en los catálogos Filtro/Física/Química/Lenguaje. Se añadió soporte para enlaces Markdown HTTP en el parser inline y se convirtieron los bloques `<aside>` y enlaces de Notion durante la generación.

El servidor estático no ofrece `/api/sync`; para evitar un 404 durante QA local se protegieron `cloudSync`, `pushCloudState` y el beacon de cierre cuando el host es `127.0.0.1` o `localhost`. También se definió un favicon inline para evitar la solicitud automática a `favicon.ico`.

## Alcance no realizado por instrucción

No se implementó Matemática desde Notion porque la fuente está vacía a propósito. No se modificaron los cuerpos antiguos de Filtro, Matemática ni Estrategia. No se volvió a subir el PDF oficial. No se implementó banco avanzado ni cuerpos MAT nuevos. No se ejecutó `git push`, ningún deploy, `wrangler deploy`, `npm run deploy` ni `npm run deploy:preview`.

## Observación de revisión pedagógica

La exportación Notion disponible contiene Markdown y no contiene imágenes binarias adjuntas para FIS/QUI/LEN. Por esa razón, los catálogos nuevos incluyen SVG de apoyo generados a partir del título de cada lección; deberán recibir una revisión pedagógica específica si se dispone posteriormente de los diagramas originales o de especificaciones visuales más detalladas. No se alteró el texto fuente para inventar conceptos adicionales.
