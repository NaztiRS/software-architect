# Análisis de Tech Stack: {{project.name}}

**Fecha:** {{metadata.generated_at}}
**Modo:** {{mode}}

---

## Resumen

{{summary}}

{{#each layers}}

## {{layer.name}}

{{layer.description}}

### Candidatos

{{#each layer.candidates}}
#### {{candidate.name}}

{{candidate.description}}

**Ventajas:** {{candidate.pros}}
**Desventajas:** {{candidate.cons}}

{{/each}}

### Comparación de Puntuación

| Criterio | Peso | {{#each layer.candidates}}{{candidate.name}} | {{/each}}
|----------|------|{{#each layer.candidates}}------|{{/each}}
| Escalabilidad | 25% | {{#each layer.candidates}}{{candidate.scalability_score}} | {{/each}}
| Curva de Aprendizaje | 15% | {{#each layer.candidates}}{{candidate.learning_score}} | {{/each}}
| Comunidad/Soporte | 15% | {{#each layer.candidates}}{{candidate.community_score}} | {{/each}}
| Costo | 20% | {{#each layer.candidates}}{{candidate.cost_score}} | {{/each}}
| Ajuste a Requisitos | 25% | {{#each layer.candidates}}{{candidate.fit_score}} | {{/each}}
| **Total Ponderado** | **100%** | {{#each layer.candidates}}**{{candidate.total}}** | {{/each}}

### Recomendación

{{layer.recommendation}}

{{/each}}

## Diagrama de Arquitectura Final

```mermaid
{{architecture_diagram}}
```

## Resumen del Stack

| Capa | Elección | Justificación |
|------|---------|--------------|
{{stack_summary_table}}
