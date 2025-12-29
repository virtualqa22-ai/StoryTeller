# Security Considerations

## Content Security Policy

Current CSP: `null` (permissive, development-friendly)

**Production CSP Example:**
```json
{
  "app": {
    "security": {
      "csp": "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'"
    }
  }
}
```

## File Associations

StoryTeller registers `.storyteller` file extension:
- **MIME Type:** `application/x-storyteller`
- **Double-click** opens file in StoryTeller
- Configured in `tauri.conf.json` → `bundle.fileAssociations`

---
