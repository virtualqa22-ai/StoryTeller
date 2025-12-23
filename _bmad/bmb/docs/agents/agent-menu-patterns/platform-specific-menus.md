# Platform-Specific Menus

Control visibility based on deployment target:

```yaml
menu:
  - trigger: git-flow
    exec: '{project-root}/_bmad/bmm/tasks/git-flow.xml'
    description: 'Git workflow operations'
    ide-only: true # Only in IDE environments

  - trigger: advanced-elicitation
    exec: '{project-root}/_bmad/core/tasks/advanced-elicitation.xml'
    description: 'Advanced elicitation'
    web-only: true # Only in web bundles
```
