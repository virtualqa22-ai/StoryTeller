# Pattern Compliance Checklist

Before submitting code, AI agents must verify:

- ✅ All names follow convention (Rust snake_case, TS camelCase, SQL snake_case)
- ✅ All commands are thin wrappers (business logic in services)
- ✅ All errors use Result<T, AppError>, no String errors
- ✅ All events use domain:action naming
- ✅ All state updates are immutable
- ✅ All async is I/O only, pure logic is sync
- ✅ All operations have specific loading states
- ✅ All validations have 3 layers (frontend, types, business)
- ✅ No anti-patterns (unwrap, string types, god objects, etc.)
- ✅ Tests cover happy path + error paths

**Pattern violations will cause:**
- Agent conflicts (different naming breaks integration)
- Type mismatches (camelCase vs snake_case)
- Runtime errors (missing validation, unhandled errors)
- Poor UX (no loading states, generic errors)
- Maintenance issues (circular deps, god objects)

**These patterns are MANDATORY for all StoryTeller implementation.**
