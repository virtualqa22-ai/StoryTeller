# Path Variables

## Always Use Variables

```yaml
# GOOD - Portable paths
workflow: "{project-root}/_bmad/bmm/workflows/prd/workflow.yaml"
exec: "{project-root}/_bmad/core/tasks/validate.xml"
data: "{project-root}/_data/metrics.csv"

# BAD - Hardcoded paths
workflow: "/Users/john/project/_bmad/bmm/workflows/prd/workflow.yaml"
exec: "../../../core/tasks/validate.xml"
```

## Available Variables

- `{project-root}` - Project root directory
- `_bmad` - BMAD installation folder
- `{output_folder}` - Document output location
- `{user_name}` - User's name from config
- `{communication_language}` - Language preference
