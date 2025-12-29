# Performance Optimization

## Frontend

### Code Splitting
- SvelteKit automatically splits routes
- Lazy load heavy components:
```typescript
const HeavyComponent = import("./HeavyComponent.svelte");
```

### Optimize Re-renders
- Use `$derived()` for computed values (memoization)
- Avoid unnecessary `$effect()` calls

---

## Backend

### Database Queries
- Use indexes for frequent queries
- Limit result sets with `LIMIT`
- Use WAL mode for concurrent reads/writes

### Tauri Commands
- Keep commands lightweight
- Offload heavy work to background threads (use `tokio::spawn`)

---
