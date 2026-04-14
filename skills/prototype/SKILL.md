---
name: prototype
description: Generate a navigable HTML prototype with Tailwind CSS that reflects the user stories. Zero dependencies — opens directly in any browser. Run /architect:analyze first if no fa-context.json exists.
argument-hint: "[en|es]"
allowed-tools: "Read Write Glob"
context: fork
effort: high
---

You are operating as the **ux-designer** agent. Read `agents/ux-designer.md` from the plugin directory for your full role definition.

## Your Mission

Generate a complete, navigable HTML prototype that brings the project's user stories to life.

## Prerequisites

1. Look for `fa-context.json`. Check: `docs/architect/fa-context.json`, then `fa-context.json` in root.
2. If not found: "No project context found. Run `/architect:analyze` first." Then stop.
3. Also look for `docs/architect/deliverables/stories/stories.md` — this is highly recommended for mapping stories to screens. If not found, derive screens from functional requirements in fa-context.json.

## Design System

Before generating pages, establish a consistent design system based on the project's domain:

### Color System (Blue-dominant)

The prototype MUST use a blue-dominant color palette. This is non-negotiable:

- **Navigation bar:** `bg-[#1B365D]` (navy) with white text
- **Primary buttons:** `bg-[#1B365D] hover:bg-[#2c5282]` with white text
- **Section headers:** navy gradient or solid navy background
- **Cards:** white background with `border border-gray-200`
- **Accent elements:** `text-[#2563eb]` (bright blue) for links and interactive elements
- **Backgrounds:** `bg-gray-50` for page, `bg-white` for cards
- **Text:** `text-gray-900` for headings, `text-gray-600` for body

### Design Rules

- **NO border-radius anywhere** — sharp, clean rectangles only. This gives a corporate, professional look.
- **Inter font** — load via `<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">` and set `font-family: 'Inter', sans-serif` on body
- **The prototype must look beautiful** — not just functional. Every screen should look like a real product, not a wireframe.
- **Generous spacing** — use `p-6`, `m-4`, `gap-4` liberally
- **Consistent shadow** — subtle `shadow-sm` on cards if needed (but sharp, not rounded)
- **Stats/metrics** as big numbers in cards when relevant
- **Tables** with navy header row (`bg-[#1B365D] text-white`) and alternating rows
- **Navigation** must be prominent, fixed at top, navy background, with clear active state

### Typography
- Headings: `font-bold` with appropriate sizes, `text-[#1B365D]`
- Body: `text-base text-gray-600`
- Labels: `text-xs uppercase tracking-wider text-gray-400`

## Generation Process

### Step 1: Map Stories to Screens

For each epic in stories.md (or functional requirement group):
1. Identify which screens are needed
2. Map user flows to page sequences
3. List interactive elements per screen

Example mapping:
| Epic | Screens | Key Interactions |
|------|---------|-----------------|
| Authentication | login.html, register.html | Form submission, OAuth buttons |
| Dashboard | dashboard.html | Data display, navigation |
| Task Management | tasks.html, task-detail.html | CRUD operations, drag-and-drop |

### Step 2: Create Shared Assets

**`assets/styles.css`:**
```css
/* Custom styles beyond Tailwind */
/* Navigation active state */
.nav-active { @apply border-b-2 border-blue-500 text-blue-600; }
/* Transition effects */
.transition-all { transition: all 0.2s ease-in-out; }
/* Responsive sidebar */
@media (max-width: 768px) {
  .sidebar { display: none; }
  .sidebar.open { display: block; }
}
```

**`assets/app.js`:**
```javascript
// Navigation highlighting
document.addEventListener('DOMContentLoaded', function() {
  const currentPage = window.location.pathname.split('/').pop();
  document.querySelectorAll('nav a').forEach(link => {
    if (link.getAttribute('href').includes(currentPage)) {
      link.classList.add('nav-active');
    }
  });
});

// Mobile menu toggle
function toggleMenu() {
  document.querySelector('.sidebar')?.classList.toggle('open');
}

// Tab switching
function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
  document.querySelectorAll('.tab-button').forEach(el => el.classList.remove('border-blue-500', 'text-blue-600'));
  document.getElementById(tabId)?.classList.remove('hidden');
  event.target.classList.add('border-blue-500', 'text-blue-600');
}
```

### Step 3: Create index.html (Entry Point)

This is the landing page / dashboard. It must:
- Show a project overview consistent with `project.description`
- Have navigation to all other pages
- Display summary data relevant to the project domain
- Include Tailwind CSS via CDN

HTML template for every page:
```html
<!DOCTYPE html>
<html lang="{{output_config.language}}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{project.name}} — [Page Title]</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="assets/styles.css">
</head>
<body class="bg-gray-50 min-h-screen">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex items-center space-x-8">
                    <span class="text-xl font-bold text-gray-900">{{project.name}}</span>
                    <a href="../index.html" class="text-gray-600 hover:text-gray-900">Dashboard</a>
                    <!-- More nav links based on epics -->
                </div>
                <div class="flex items-center">
                    <span class="text-sm text-gray-500">{{sample_user_name}}</span>
                </div>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Page-specific content -->
    </main>

    <script src="assets/app.js"></script>
</body>
</html>
```

### Step 4: Create Individual Pages

For each screen identified in Step 1:
1. Create the HTML file in `pages/`
2. Use the shared navigation component
3. Include realistic sample data derived from fa-context.json
4. Make all links and navigation work (relative paths)
5. Include appropriate interactive elements (forms, buttons, modals)

### Step 5: Create README.md for Prototype

```markdown
# {{project.name}} — Prototype

## How to View

Open `index.html` in any modern browser. No server required.

## Pages

| Page | Description | Related Stories |
|------|------------|----------------|
| index.html | Main dashboard | — |
| pages/login.html | Login screen | US-0101 |
| ... | ... | ... |

## Design Notes

- Built with Tailwind CSS (loaded via CDN)
- Fully responsive (desktop, tablet, mobile)
- All navigation is functional
- Sample data is for demonstration purposes
```

## Output Structure

```
{output_config.output_dir}/prototype/
├── index.html
├── pages/
│   ├── [page-per-epic-or-flow].html
│   └── ...
├── assets/
│   ├── styles.css
│   └── app.js
└── README.md
```

## Important Rules

- Every page MUST include the Tailwind CDN script tag
- Every page MUST include the shared navigation bar
- All links between pages MUST use correct relative paths
- Sample data MUST be coherent with the project context — use project-appropriate names, terms, and numbers
- UI text and labels MUST be in `output_config.language` (en or es)
- The prototype is a FIRST-CLASS DELIVERABLE — put the same care into it as the documentation

## Output

1. Write all files to `{output_config.output_dir}/prototype/` (default: `docs/architect/prototype/`)
2. Create all directories as needed
3. Present a summary: "Prototype generated at `path`. [X] pages created. Open `index.html` in your browser to navigate."
