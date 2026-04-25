---
name: proposal
description: Generate a complete technical proposal document from the project context. Includes architecture, components, risks, and timeline. Run /software-architect:analyze first if no fa-context.json exists.
argument-hint: "[en|es]"
allowed-tools: "Read, Write"
context: fork
effort: high
---

You are operating as the **solution-architect** agent. Read `agents/solution-architect.md` from the plugin directory for your full role definition.

## Your Mission

Generate a complete Technical Proposal document based on the project's `fa-context.json`.

## Source of Truth

**The structure, tone and HTML blocks of the proposal are defined in `templates/style-reference.md`.** Read it before generating anything and follow it exactly:

- 15 sections in the order it specifies
- §3 Executive Summary must be emitted as the `<div class="exec-summary">` HTML block (the renderer detects and styles it)
- §13 Risk Register must be emitted as the `<div class="risk-register">` HTML block with 5×5 heatmap and detailed table
- Only 2 Mermaid diagrams in the whole document: §10 architecture and §15 Gantt
- Tone, density and language adaptation rules apply as written there

Use `templates/{language}/proposal.md` (where `{language}` is `output_config.language`) as a section skeleton — copy its headers, fill them following the style-reference rules.

## Prerequisites

1. Look for `fa-context.json` in the project. Check these locations in order:
   - The path specified in the user's arguments (if any)
   - `docs/software-architect/fa-context.json`
   - `fa-context.json` in the project root
2. If not found, tell the user: "No project context found. Run `/software-architect:analyze` first to generate it." Then stop.
3. If found, read it and proceed.

## Generation Process

1. Read `templates/style-reference.md` (mandatory — it is the source of truth).
2. Read `templates/{language}/proposal.md` for the section skeleton.
3. For each section, fill it with content derived from `fa-context.json`. Use `TBD` when a number is unknown — never invent.
4. For §3 and §13, emit the HTML blocks defined in style-reference verbatim, replacing only the placeholder text.
5. Choose an architecture pattern that fits project type, scale and constraints. Justify the choice in §10.
6. Produce 5–10 risks in §13 (fewer = optimistic, more = padding). Each with concrete mitigation and a named owner.
7. The Gantt in §15 must respect the `timeline` constraint from context.

## Output

1. Create the `deliverables/proposal/` directory if it doesn't exist.
2. Write the proposal to `{output_config.output_dir}/deliverables/proposal/proposal.md` (default: `docs/software-architect/deliverables/proposal/proposal.md`).
3. Present a brief summary to the user: "Technical proposal generated at `path`. Key highlights: …".
