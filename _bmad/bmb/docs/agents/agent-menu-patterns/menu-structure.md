# Menu Structure

Agents define menus in YAML, with triggers auto-prefixed with `*` during compilation:

```yaml
menu:
  - trigger: action-name
    [handler]: [value]
    description: 'What this command does'
```

**Note:** `*help` and `*exit` are auto-injected by the compiler - DO NOT include them.
