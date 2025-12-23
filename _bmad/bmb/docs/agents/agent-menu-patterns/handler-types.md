# Handler Types

## 1. Action Handler (Prompts & Inline)

For simple and expert agents with self-contained logic.

**Reference to Prompt ID:**

```yaml
prompts:
  - id: analyze-code
    content: |
      <instructions>
      Analyze the provided code for patterns and issues.
      </instructions>

      <process>
      1. Identify code structure
      2. Check for anti-patterns
      3. Suggest improvements
      </process>

menu:
  - trigger: analyze
    action: '#analyze-code'
    description: 'Analyze code patterns'
```

**Inline Instruction:**

```yaml
menu:
  - trigger: quick-check
    action: 'Perform a quick syntax validation on the current file'
    description: 'Quick syntax check'
```

**When to Use:**

- Simple/Expert agents with self-contained operations
- `#id` for complex, multi-step prompts
- Inline text for simple, one-line instructions

## 2. Workflow Handler

For module agents orchestrating multi-step processes.

```yaml
menu:
  - trigger: create-prd
    workflow: '{project-root}/_bmad/bmm/workflows/prd/workflow.yaml'
    description: 'Create Product Requirements Document'

  - trigger: brainstorm
    workflow: '{project-root}/_bmad/core/workflows/brainstorming/workflow.yaml'
    description: 'Guided brainstorming session'

  # Placeholder for unimplemented workflows
  - trigger: future-feature
    workflow: 'todo'
    description: 'Coming soon'
```

**When to Use:**

- Module agents with workflow integration
- Multi-step document generation
- Complex interactive processes
- Use "todo" for planned but unimplemented features

## 3. Exec Handler

For executing tasks directly.

```yaml
menu:
  - trigger: validate
    exec: '{project-root}/_bmad/core/tasks/validate-workflow.xml'
    description: 'Validate document structure'

  - trigger: advanced-elicitation
    exec: '{project-root}/_bmad/core/tasks/advanced-elicitation.xml'
    description: 'Advanced elicitation techniques'
```

**When to Use:**

- Single-operation tasks
- Core system operations
- Utility functions

## 4. Template Handler

For document generation with templates.

```yaml
menu:
  - trigger: create-brief
    exec: '{project-root}/_bmad/core/tasks/create-doc.xml'
    tmpl: '{project-root}/_bmad/bmm/templates/brief.md'
    description: 'Create a Product Brief'
```

**When to Use:**

- Template-based document creation
- Combine `exec` with `tmpl` path
- Structured output generation

## 5. Data Handler

Universal attribute for supplementary information.

```yaml
menu:
  - trigger: team-standup
    exec: '{project-root}/_bmad/bmm/tasks/standup.xml'
    data: '{project-root}/_bmad/_config/agent-manifest.csv'
    description: 'Run team standup'

  - trigger: analyze-metrics
    action: 'Analyze these metrics and identify trends'
    data: '{project-root}/_data/metrics.json'
    description: 'Analyze performance metrics'
```

**When to Use:**

- Add to ANY handler type
- Reference data files (CSV, JSON, YAML)
- Provide context for operations
