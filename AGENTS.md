# AGENTS.md — Directivas Permanentes del Proyecto EPN 2026-B

## Principo Fundamental: Anti-Overfitting y Generalización Conceptual

> **Mandato del Proyecto**: Todo módulo, cuestionario, simulador o taller especializado (existente o que se construya en el futuro) debe implementar controles estrictos para **evitar el Overfitting** (memorización repetitiva de preguntas estáticas) y **priorizar la Generalización Conceptual** en la mente del estudiante.

### Reglas Técnicas Obligatorias:

1. **Filtro Real de Dificultad y Expansión Dinámica de Banco**:
   - Cambiar la dificultad (`fácil`, `intermedio`, `difícil`, `experto`, `mezclado`) debe alterar efectivamente el conjunto de preguntas presentado.
   - Si un nivel de dificultad específico se agota o tiene menos preguntas que las solicitadas por el intento, el algoritmo **NO debe repetir inmediatamente las mismas preguntas**. En su lugar, debe realizar una expansión dinámica priorizando preguntas no vistas de niveles adyacentes.

2. **Aleatorización de Preguntas y Opciones**:
   - Las opciones de respuesta (`shuffleOptions`) y el orden de presentación de preguntas (`shuffleQuestions`) deben barajarse dinámicamente en cada intento para evitar el aprendizaje por posición ($A, B, C, D$).

3. **Registro Transparente de Preguntas Vistas**:
   - El historial de preguntas vistas (`SEENSET` y `SEEN`) debe mantenerse actualizado por materia y dificultad para garantizar que el estudiante consuma todo el espectro del banco antes de reiniciar un ciclo.

4. **Nuevos Módulos y Cuestionarios**:
   - Cualquier nuevo test o taller que se añada a la aplicación en el futuro DEBE cumplir con esta arquitectura anti-overfitting de forma nativa.
