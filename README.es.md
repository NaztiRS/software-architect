<p align="center">
  <img src="assets/readme-top.png" alt="Banner animado de Software Architect" width="100%">
</p>

# Software Architect

Plugin de Claude Code para **Análisis Funcional y generación de Propuestas Técnicas** para proyectos de software.

Transforma requisitos de software en documentación profesional y prototipos navegables — en minutos, no en días.

## Qué genera

| Entregable | Audiencia | Descripción |
|------------|-----------|-------------|
| **Propuesta Técnica** | Cliente / Dirección | Arquitectura, riesgos, cronograma, módulos funcionales |
| **Prototipo HTML** | Todos | Pantallas navegables y responsive con Tailwind CSS — sin dependencias |
| **Esquema de Referencia** | Ingeniería | Diagrama ER + DDL SQL de referencia inferido a partir de la propuesta |

Cada entregable se exporta en **3 formatos**: `.md`, `.docx`, `.pdf`

## Instalación

Dentro de Claude Code, añade el marketplace e instala el plugin:

```
/plugin marketplace add NaztiRS/software-architect
/plugin install software-architect
```

### Requisitos

- **Node.js** (para generar PDF / DOCX / diagramas)
- **Google Chrome** (usado por puppeteer y mermaid-cli)

En el primer uso, el plugin ejecuta `npm install` dentro de su propio directorio para instalar `puppeteer`, `docx` y `@mermaid-js/mermaid-cli` — **localmente**, nunca globalmente. Al final puedes conservarlos o eliminarlos con un solo comando.

## Inicio rápido

```
/software-architect:deliver
```

Corre el pipeline completo. O arranca desde un documento:

```
/software-architect:deliver docs/requisitos.pdf
```

## Comandos

| Comando | Descripción |
|---------|-------------|
| `/software-architect:deliver` | Pipeline completo — genera todo |
| `/software-architect:analyze` | Extrae requisitos de un documento o Q&A interactivo |
| `/software-architect:proposal` | Genera la propuesta técnica |
| `/software-architect:prototype` | Prototipo HTML navegable |
| `/software-architect:schema` | Modelo de datos inferido — diagrama ER + SQL de referencia |
| `/software-architect:diagrams` | Renderiza diagramas Mermaid como SVG/PNG |
| `/software-architect:render` | Exporta entregables como PDF/DOCX |
| `/software-architect:export` | Genera README índice de entregables |
| `/software-architect:validate` | Chequeo estático de consistencia entre entregables |

### Opciones

```
/software-architect:deliver docs/requisitos.pdf   # Iniciar desde un documento
/software-architect:deliver --no-review           # Sin checkpoints de revisión
/software-architect:deliver --lang es             # Salida en español
```

## Cómo funciona el pipeline

El pipeline completo (`/software-architect:deliver`) orquesta todo el proceso en 6 pasos:

### Paso 0: Preflight Check

Antes de comenzar, el plugin verifica tu entorno:

- **Node.js + npm** — necesario para las herramientas de renderizado
- **Google Chrome** — necesario para renderizar diagramas (mmdc) y generar PDFs (puppeteer)
- **Paquetes npm** (mmdc, puppeteer, docx) — se instalan automáticamente si faltan

Si faltan herramientas, el plugin las instala e informa qué instaló. Al final, decides si conservarlas o eliminarlas.

### Paso 1: Analyze

El plugin te hace la primera pregunta:

> *"¿Tienes documentación existente?"*
> - **A)** Sí — proporciona la ruta al archivo (MD, TXT, PDF)
> - **B)** No — empezamos desde cero con preguntas interactivas
> - **C)** Documento parcial — lo analizo y pregunto lo que falta

Si proporcionas un documento, el agente **solution-architect** extrae todos los requisitos automáticamente. Calcula un score de completitud — si supera el 85%, solo pide confirmación. Si no, hace preguntas dirigidas sobre lo que falta, una a la vez.

Si no hay documento, te guía con un cuestionario estructurado: nombre del proyecto, tipo, dominio, escala, usuarios, roles, funcionalidades, restricciones, integraciones y preferencias de salida.

El resultado es un archivo `fa-context.json` — una representación estructurada de todo el contexto del proyecto que consumen los demás skills.

### Paso 2: Proposal

El agente **solution-architect** genera la **Propuesta Técnica** — con estructura profesional: contexto de mercado, problema, objetivos, alcance funcional (dentro/fuera), módulos detallados (Objetivo → Trigger → Flujo → Tareas), hitos con criterios UAT, arquitectura con tabla de stack, equipo y presupuesto.

Un checkpoint de revisión te permite ajustar antes de continuar.

### Paso 3: Prototype

- **ux-designer** genera el **Prototipo HTML** — mapea módulos funcionales a pantallas, crea un prototipo navegable con Tailwind CSS (vía CDN). Cada página tiene navegación funcional, datos de ejemplo realistas, diseño responsive y estilo consistente. Sin dependencias — abre `index.html` en cualquier browser.

Un checkpoint de revisión te permite ajustar antes de continuar.

### Paso 4: Esquema de Referencia

El agente **solution-architect** infiere las entidades del dominio y sus relaciones a partir de los módulos de la propuesta, y emite un diagrama ER en Mermaid junto a un DDL ejecutable de PostgreSQL (`schema.sql`) con claves primarias, foráneas, índices y una sección "Open questions" para que el equipo revise.

### Paso 5: Export + Diagrams + Render

Tres operaciones en secuencia:

1. **Export** crea un README índice organizando todos los entregables por audiencia
2. **Diagrams** extrae los 2 diagramas Mermaid de la propuesta (arquitectura + timeline) y los renderiza como SVG/PNG usando mmdc o la API mermaid.ink
3. **Render** convierte cada markdown en DOCX profesional (usando el paquete `docx` de npm para formato Word nativo con estilos corporativos) y PDF (usando puppeteer con Chrome headless)

### Paso 6: Cleanup

Si el plugin instaló herramientas npm durante el preflight, pregunta:

> *"¿Conservar las herramientas de renderizado o desinstalarlas?"*

Elige conservarlas para futuras ejecuciones o eliminarlas para un sistema limpio.

## Diagrama del pipeline

```
Preflight (Node.js? Chrome? Instalar herramientas)
       |
   analyze → fa-context.json
       |
      proposal
       |
      prototype
       |
      schema (diagrama ER + SQL de referencia)
       |
   export + diagrams + render
       |
   validate (puerta de consistencia)
       |
   cleanup (conservar o eliminar herramientas?)
```

## Estructura de salida

```
docs/software-architect/
├── README.md
├── diagrams/
│   ├── architecture-overview.svg
│   └── proposal-timeline.svg
├── schema/
│   ├── er-diagram.mmd
│   ├── er-diagram.svg
│   ├── er-diagram.png
│   ├── schema.sql
│   └── README.md
├── prototype/
│   ├── index.html
│   ├── pages/
│   └── assets/
└── deliverables/
    ├── proposal/
    │   ├── proposal.md
    │   ├── proposal.docx
    │   └── proposal.pdf
```

## Agentes especializados

El plugin usa 3 agentes especializados, cada uno con expertise de dominio definido en sus archivos de rol:

| Agente | Rol | Skills | Qué hace |
|--------|-----|--------|----------|
| `business-analyst` | Experto en requisitos | analyze | Extrae requisitos funcionales y no funcionales de documentos o Q&A interactivo. Detecta gaps e inconsistencias. Prioriza con MoSCoW. |
| `solution-architect` | Experto en arquitectura | proposal, schema | Diseña arquitecturas escalables. Produce diagramas Mermaid. Infiere modelos de datos de referencia. Justifica cada decisión técnica con trade-offs. |
| `ux-designer` | Experto en prototipado | prototype | Mapea módulos funcionales a pantallas. Crea prototipos HTML navegables con Tailwind CSS. Usa datos realistas del contexto del proyecto. Asegura diseño responsive y estilo consistente en todas las páginas. |

Los agentes escriben en el idioma elegido por el usuario (inglés o español). Los términos técnicos siempre permanecen en inglés.

## Requisitos

- [Claude Code](https://claude.ai/code) CLI o app de escritorio
- Node.js + npm
- Google Chrome

Los siguientes paquetes npm se instalan automáticamente (y opcionalmente se eliminan al terminar):
- `@mermaid-js/mermaid-cli` — renderizado de diagramas
- `puppeteer` — generación de PDF
- `docx` — generación de DOCX

## Idiomas de salida

- Inglés (`en`)
- Español (`es`)

## Licencia

MIT — ver [LICENSE](LICENSE)
