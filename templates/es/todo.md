# Plan de Trabajo: {{project.name}}

**Fecha:** {{metadata.generated_at}}
**Tamaño del Equipo:** {{constraints.team_size}}
**Plazo:** {{constraints.timeline}}

---

## Fases del Proyecto

{{#each phases}}

### Fase {{phase.number}}: {{phase.name}}

**Objetivo:** {{phase.goal}}
**Duración:** {{phase.duration}}
**Definición de Hecho:** {{phase.definition_of_done}}

#### Hitos

{{#each phase.milestones}}
- **{{milestone.name}}** ({{milestone.date}}) — {{milestone.deliverable}}
{{/each}}

#### Tareas

| # | Tarea | Épica/Historia | Esfuerzo | Dependencias | Responsable |
|---|-------|---------------|----------|-------------|------------|
{{#each phase.tasks}}
| {{task.number}} | {{task.title}} | {{task.story_ref}} | {{task.effort}} | {{task.dependencies}} | {{task.assignee}} |
{{/each}}

{{/each}}

## Cronograma

```mermaid
{{gantt_chart}}
```

## Checklist para Comenzar

{{#each checklist}}
- [ ] {{item}}
{{/each}}
