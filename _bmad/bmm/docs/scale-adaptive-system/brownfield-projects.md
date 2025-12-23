# Brownfield Projects

## Critical First Step

For ALL brownfield projects: Run `document-project` BEFORE planning workflows.

## Why document-project is Critical

**Quick Flow** uses it for:

- Auto-detecting existing patterns
- Understanding codebase structure
- Confirming conventions

**BMad Method** uses it for:

- Architecture inputs (existing structure)
- Integration design
- Pattern consistency

**Enterprise Method** uses it for:

- Security analysis
- Integration architecture
- Risk assessment

## Brownfield Workflow Pattern

```mermaid
flowchart TD
    START([Brownfield Project])
    CHECK{Has docs/<br/>index.md?}

    START --> CHECK
    CHECK -->|No| DOC[document-project workflow<br/>10-30 min]
    CHECK -->|Yes| TRACK[Choose Track]

    DOC --> TRACK
    TRACK -->|Quick| QF[Tech-Spec]
    TRACK -->|Method| M[PRD + Arch]
    TRACK -->|Enterprise| E[PRD + Arch + Sec/Ops]

    style DOC fill:#ffb,stroke:#333,stroke-width:2px,color:#000
    style TRACK fill:#bfb,stroke:#333,stroke-width:2px,color:#000
```

---
