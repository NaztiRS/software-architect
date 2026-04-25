# Technical Proposal: {{project.name}}

**Date:** {{metadata.generated_at}}
**Domain:** {{project.domain}}
**Scale:** {{project.scale}}
**Version:** 1.0

---

<!--
  Structure source of truth: templates/style-reference.md
  Sections must follow that order and tone exactly.
  The HTML blocks for §3 (Executive Summary) and §13 (Risk Register) are detected
  by bin/build-report-html.js and bin/generate-docx.js — emit them verbatim.
-->

## 1. Cover Page

## 2. Index

## 3. Executive Summary

<!-- Emit the <div class="exec-summary"> block from style-reference §3 -->

## 4. Target Market & Ideal Client

## 5. Understanding the Need

## 6. Project Objectives

## 7. Functional Scope

### 7.1 In Scope

### 7.2 Out of Scope

### 7.3 Preconditions

### 7.4 Assumptions

## 8. Detailed Functional Proposal

<!-- One MODULE N block per functional area, with Objective / Trigger / Flow / Development Tasks -->

## 9. Implementation Timeline

<!-- Total Estimated Duration, Methodology, then one MILESTONE N block per sprint -->

## 10. Technical Architecture

```mermaid
{{architecture_diagram}}
```

<!-- Technology Stack table, Planned Integrations, Infrastructure & Environments -->

## 11. Proposed Team

## 12. Budget

## 13. Risk Register

<!-- Emit the <div class="risk-register"> block from style-reference §13 -->

## 14. Support Service

## 15. Gantt Timeline

```mermaid
{{timeline_gantt}}
```
