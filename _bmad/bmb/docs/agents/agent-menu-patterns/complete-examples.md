# Complete Examples

## Simple Agent Menu

```yaml
prompts:
  - id: format-code
    content: |
      <instructions>
      Format the provided code according to style guidelines.
      </instructions>

      Apply:
      - Consistent indentation
      - Proper spacing
      - Clear naming conventions

menu:
  - trigger: format
    action: '#format-code'
    description: 'Format code to style guidelines'

  - trigger: lint
    action: 'Check code for common issues and anti-patterns'
    description: 'Lint code for issues'

  - trigger: suggest
    action: 'Suggest improvements for code readability'
    description: 'Suggest improvements'
```

## Expert Agent Menu

```yaml
critical_actions:
  - 'Load ./memories.md'
  - 'Follow ./instructions.md'
  - 'ONLY access ./'

prompts:
  - id: reflect
    content: |
      Guide {{user_name}} through reflection on recent entries.
      Reference patterns from memories.md naturally.

menu:
  - trigger: write
    action: '#reflect'
    description: 'Write journal entry'

  - trigger: save
    action: 'Update ./memories.md with session insights'
    description: "Save today's session"

  - trigger: patterns
    action: 'Analyze recent entries for recurring themes'
    description: 'View patterns'
```

## Module Agent Menu

```yaml
menu:
  - trigger: workflow-init
    workflow: '{project-root}/_bmad/bmm/workflows/workflow-status/init/workflow.yaml'
    description: 'Initialize workflow path (START HERE)'

  - trigger: brainstorm
    workflow: '{project-root}/_bmad/bmm/workflows/1-analysis/brainstorm/workflow.yaml'
    description: 'Guided brainstorming'

  - trigger: prd
    workflow: '{project-root}/_bmad/bmm/workflows/2-planning/prd/workflow.yaml'
    description: 'Create PRD'

  - trigger: architecture
    workflow: '{project-root}/_bmad/bmm/workflows/2-planning/architecture/workflow.yaml'
    description: 'Design architecture'

  - trigger: party-mode
    workflow: '{project-root}/_bmad/core/workflows/party-mode/workflow.yaml'
    description: 'Multi-agent discussion'
```
