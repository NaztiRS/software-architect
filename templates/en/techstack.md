# Tech Stack Analysis: {{project.name}}

**Date:** {{metadata.generated_at}}
**Mode:** {{mode}}

---

## Summary

{{summary}}

{{#each layers}}

## {{layer.name}}

{{layer.description}}

### Candidates

{{#each layer.candidates}}
#### {{candidate.name}}

{{candidate.description}}

**Pros:** {{candidate.pros}}
**Cons:** {{candidate.cons}}

{{/each}}

### Scoring Comparison

| Criteria | Weight | {{#each layer.candidates}}{{candidate.name}} | {{/each}}
|----------|--------|{{#each layer.candidates}}------|{{/each}}
| Scalability | 25% | {{#each layer.candidates}}{{candidate.scalability_score}} | {{/each}}
| Learning Curve | 15% | {{#each layer.candidates}}{{candidate.learning_score}} | {{/each}}
| Community/Support | 15% | {{#each layer.candidates}}{{candidate.community_score}} | {{/each}}
| Cost | 20% | {{#each layer.candidates}}{{candidate.cost_score}} | {{/each}}
| Fit with Requirements | 25% | {{#each layer.candidates}}{{candidate.fit_score}} | {{/each}}
| **Weighted Total** | **100%** | {{#each layer.candidates}}**{{candidate.total}}** | {{/each}}

### Recommendation

{{layer.recommendation}}

{{/each}}

## Final Architecture Diagram

```mermaid
{{architecture_diagram}}
```

## Stack Summary

| Layer | Choice | Rationale |
|-------|--------|-----------|
{{stack_summary_table}}
