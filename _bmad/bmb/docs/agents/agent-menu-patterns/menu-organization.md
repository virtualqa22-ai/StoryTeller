# Menu Organization

## Recommended Order

```yaml
menu:
  # Note: *help auto-injected first by compiler

  # 1. Primary workflows (main value)
  - trigger: workflow-init
    workflow: '...'
    description: 'Start here - initialize workflow'

  - trigger: create-prd
    workflow: '...'
    description: 'Create PRD'

  # 2. Secondary operations
  - trigger: validate
    exec: '...'
    description: 'Validate document'

  # 3. Utilities
  - trigger: party-mode
    workflow: '...'
    description: 'Multi-agent discussion'

  # Note: *exit auto-injected last by compiler
```

## Grouping by Phase

```yaml
menu:
  # Analysis Phase
  - trigger: brainstorm
    workflow: '{project-root}/_bmad/bmm/workflows/1-analysis/brainstorm/workflow.yaml'
    description: 'Brainstorm ideas'

  - trigger: research
    workflow: '{project-root}/_bmad/bmm/workflows/1-analysis/research/workflow.yaml'
    description: 'Conduct research'

  # Planning Phase
  - trigger: prd
    workflow: '{project-root}/_bmad/bmm/workflows/2-planning/prd/workflow.yaml'
    description: 'Create PRD'

  - trigger: architecture
    workflow: '{project-root}/_bmad/bmm/workflows/2-planning/architecture/workflow.yaml'
    description: 'Design architecture'
```
