---
name: prototype
description: Generate a navigable, production-grade HTML prototype with Tailwind CSS, Lucide icons, Chart.js, dark mode, and realistic states (empty/loading/error). Zero build step — opens directly in any browser. Run /software-architect:analyze first if no fa-context.json exists.
argument-hint: "[en|es]"
allowed-tools: "Read, Write, Glob"
context: fork
effort: high
---

You are operating as the **ux-designer** agent. Read `agents/ux-designer.md` from the plugin directory for your full role definition.

## Your Mission

Generate a complete, navigable HTML prototype that brings the project's functional modules to life. The prototype must look like a real product shipped by a design-led team — not like a wireframe or an AI mock.

## Prerequisites

1. Look for `fa-context.json` in `docs/software-architect/` then `./`.
2. If not found: "No project context found. Run `/software-architect:analyze` first." Then stop.
3. Highly recommended: `docs/software-architect/deliverables/proposal/proposal.md` — map modules to screens. If missing, derive screens from `functional_requirements` in `fa-context.json`.

## Shared Assets (copy verbatim from the plugin templates)

**Do not regenerate these files.** Copy them from `templates/prototype/` as-is into the output's `assets/` folder. They are the canonical source of the design system:

| Source (in plugin) | Destination (in output) |
|---|---|
| `templates/prototype/tokens.css` | `{output_dir}/prototype/assets/tokens.css` |
| `templates/prototype/styles.css` | `{output_dir}/prototype/assets/styles.css` |
| `templates/prototype/app.js` | `{output_dir}/prototype/assets/app.js` |

Use `templates/prototype/page.template.html` as the shell every page extends. `index.html` sits at the root and references `assets/...` (no `../`); pages in `pages/` reference `../assets/...`.

## Design Rules (must follow)

- **Subtle radius**: cards `--r-lg` (14px), buttons/inputs `--r-md` (10px), pills `--r-xl`, avatars `rounded-full`.
- **Icons**: always Lucide via CDN. Never emojis as UI icons. Use `data-lucide="icon-name"` and call `lucide.createIcons()`.
- **Charts**: Chart.js via CDN in any dashboard with metrics. Always paint with brand tokens (`getComputedStyle(document.documentElement).getPropertyValue('--brand-500').trim()`).
- **Typography**: Inter 300–800 from Google Fonts CDN. Headings 600–800, body 400, labels 500 uppercase tracking.
- **Dark mode**: toggle in the navbar persists to `localStorage`. Every color comes from tokens — no `bg-white` hardcoded.
- **Microinteractions**: `transition-all duration-200` on every interactive element, `hover:-translate-y-0.5` on cards, visible focus rings (`focus:ring-2 focus:ring-brand-500 focus:ring-offset-2`).
- **States**: every list / table / dashboard screen must include visible examples of at least two of: empty state, skeleton loading, error state, success toast.
- **Responsive**: mobile first. Nav collapses to hamburger under 768px. Sidebars become drawers.
- **Accessibility**: semantic landmarks (`<header>`, `<nav>`, `<main>`, `<aside>`), labels on every input, `aria-current="page"` on active nav, contrast AA.
- **Realistic data**: pull names, numbers, dates, statuses directly from `fa-context.json`. Never "Lorem ipsum", never "John Doe" if the project is in Spanish.

## CDN stack (every page loads exactly these)

```html
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<script src="https://unpkg.com/lucide@latest"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<link rel="stylesheet" href="assets/tokens.css">
<link rel="stylesheet" href="assets/styles.css">
```

The Tailwind `tailwind.config` block (custom brand/ink palettes) is included inline in `templates/prototype/page.template.html` — copy the same block into every page you generate.

## Required Pages

### 1. `index.html` — Landing / Dashboard

Depends on the project:
- B2B SaaS / dashboards → metrics dashboard with 4 KPI cards + 1 line chart + 1 pie chart + recent-activity feed + CTA to primary action.
- E-commerce / marketplace → hero + featured items grid + categories.
- Internal tool → task inbox + sidebar filters.

Pick from proposal.md modules. The dashboard must feel populated, not empty.

### 2. One page per functional module

For each functional module in proposal.md, generate at least one page covering its main flow. Include CRUD operations if the module requires them.

### 3. `design-system.html` — Component Library

A single page showcasing the prototype's building blocks — lets stakeholders see the design decisions in isolation:
- Color palette (brand, neutrals, semantic)
- Typography scale
- Buttons (primary / secondary / ghost / destructive / icon-only) in all states
- Inputs (text / select / textarea / checkbox / radio / toggle) with valid / invalid states
- Badges (status / priority / count)
- Cards, stat cards, empty state, alert / toast, modal, drawer, tabs
- Icons grid (shows which Lucide icons are used)

This page makes the prototype look deliberately designed.

## Generation Process

### Step 1 — Plan the screens

From `proposal.md` modules, map each module to 1–2 screens. Write a table inline:

| Module | Screens | Key Interactions | States shown |
|--------|---------|------------------|--------------|
| Authentication | login.html, register.html | Form validation, error, success | invalid email, wrong password, loading |
| ... | ... | ... | ... |

### Step 2 — Copy shared assets

Read `templates/prototype/tokens.css`, `templates/prototype/styles.css` and `templates/prototype/app.js` from the plugin and write them verbatim under `{output_dir}/prototype/assets/`. Do not modify them.

### Step 3 — Build `index.html`

Dashboard / landing with 4 KPIs + 1 line chart + 1 donut + recent activity. Use Chart.js with brand colors (`--brand-800`, `--brand-500`, `--brand-400`). Populate data derived from the project context.

### Step 4 — Build `pages/*.html`

One HTML per screen identified in Step 1, all extending `templates/prototype/page.template.html`. Every page:
- Is fully clickable (all nav links point somewhere real)
- Shows realistic data
- Includes at least one state variant (empty / loading / error) where relevant
- Works in dark mode

### Step 5 — Build `pages/design-system.html`

The component library page. Showcases tokens, typography, buttons, inputs, badges, cards, stat cards, empty state, toast, modal skeleton.

### Step 6 — README

```markdown
# {{project.name}} — Prototype

## View
Open `index.html` in any modern browser. No build step.

## Pages
| Page | Related Module |
|------|----------------|
| index.html | Dashboard summary |
| pages/design-system.html | Component library — design reference |
| pages/{module}.html | ... |

## Tech
- Tailwind CSS (CDN) with custom brand config
- Lucide Icons
- Chart.js
- CSS custom properties for theming (dark mode toggle persisted to localStorage)
- Zero build step
```

## Output structure

```
{output_dir}/prototype/
├── index.html
├── pages/
│   ├── design-system.html
│   └── [one-per-module].html
├── assets/
│   ├── tokens.css
│   ├── styles.css
│   └── app.js
└── README.md
```

## Hard Rules

- **Never use emoji as UI icons.** Always Lucide.
- **Never hardcode colors in markup.** Always reference tokens or Tailwind config.
- **Every dashboard must have at least one chart.** No empty dashboards.
- **Every list/table must have an empty state** reachable via a filter or query string (`?state=empty`).
- **All links work.** If a link has no target, remove it — don't leave `href="#"` sprinkled around.
- **Dark mode is not optional.** Every page must render correctly in both themes.
- **UI text in `output_config.language`.** Technical terms stay in English.
- **Never modify the shared assets** (`tokens.css`, `styles.css`, `app.js`). They're copied verbatim from the plugin.

## Output

Write all files to `{output_dir}/prototype/` (default `docs/software-architect/prototype/`). Present a summary:

> "Prototype generated at `path`. **{X}** pages created including the design system reference. Toggle theme with the sun/moon icon. Open `index.html` in your browser."
