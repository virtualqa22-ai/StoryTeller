# Common Mistakes

## Duplicate Triggers

```yaml
# BAD - compiler will fail
- trigger: analyze
  action: '#first'
  description: 'First analysis'

- trigger: analyze
  action: '#second'
  description: 'Second analysis'
```

## Including Auto-Injected Items

```yaml
# BAD - these are auto-injected
menu:
  - trigger: help
    description: 'Show help'

  - trigger: exit
    description: 'Exit agent'
```

## Missing Prompt Reference

```yaml
# BAD - prompt id doesn't exist
menu:
  - trigger: analyze
    action: '#nonexistent-prompt'
    description: 'Analysis'
```

## Hardcoded Paths

```yaml
# BAD - not portable
menu:
  - trigger: run
    workflow: '/absolute/path/to/workflow.yaml'
    description: 'Run workflow'
```
