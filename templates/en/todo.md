# Work Plan: {{project.name}}

**Date:** {{metadata.generated_at}}
**Team Size:** {{constraints.team_size}}
**Timeline:** {{constraints.timeline}}

---

## Project Phases

{{#each phases}}

### Phase {{phase.number}}: {{phase.name}}

**Goal:** {{phase.goal}}
**Duration:** {{phase.duration}}
**Definition of Done:** {{phase.definition_of_done}}

#### Milestones

{{#each phase.milestones}}
- **{{milestone.name}}** ({{milestone.date}}) — {{milestone.deliverable}}
{{/each}}

#### Tasks

| # | Task | Epic/Story | Effort | Dependencies | Assignee |
|---|------|-----------|--------|-------------|----------|
{{#each phase.tasks}}
| {{task.number}} | {{task.title}} | {{task.story_ref}} | {{task.effort}} | {{task.dependencies}} | {{task.assignee}} |
{{/each}}

{{/each}}

## Timeline

```mermaid
{{gantt_chart}}
```

## Getting Started Checklist

{{#each checklist}}
- [ ] {{item}}
{{/each}}
