# Enforcement Guidelines

## All AI Agents MUST:

1. **Follow Naming Conventions:**
   - Rust: snake_case functions, PascalCase types
   - TypeScript: camelCase functions, PascalCase classes
   - SQL: snake_case tables/columns
   - Tauri: snake_case commands, domain:action events

2. **Follow Structure Patterns:**
   - Domain-based Rust modules
   - Feature-based Svelte components
   - Co-located unit tests
   - Thin command wrappers

3. **Use Type Safety:**
   - Enums for constrained values (EntityType, Provider)
   - Result<T, AppError> for all Tauri commands
   - Typed event payloads
   - No `any` types in TypeScript

4. **Implement Validation Layers:**
   - Frontend: UX validation
   - Backend: Type validation
   - Business: Domain rules
   - Never trust frontend alone

5. **Handle Errors Properly:**
   - Use Result in Rust, never panic
   - Structured AppError with code/message/details
   - User-friendly messages, technical details logged
   - All error paths tested

6. **Provide User Feedback:**
   - Loading states for operations >1s
   - Progress bars when progress available
   - Optimistic UI for create/update/delete
   - Toast for errors, Modal for confirmations

7. **Maintain Immutability:**
   - Never mutate arrays/objects directly
   - Create new instances for updates
   - Enables clean rollback and undo

8. **Respect Async Boundaries:**
   - async for I/O only
   - Pure logic stays synchronous
   - No blocking calls in async context

## Pattern Enforcement Methods

**Compile-Time Enforcement:**
- Rust type system (enums, Result types)
- TypeScript strict mode
- ESLint rules for naming conventions
- Clippy for Rust patterns

**Test-Time Enforcement:**
- Unit tests verify error handling
- Integration tests verify IPC contracts
- E2E tests verify UX patterns
- Performance tests verify loading states

**Code Review Enforcement:**
- Check for anti-patterns
- Verify pattern compliance
- Ensure test coverage

**Automated Checks:**
- ESLint + Prettier for TypeScript/Svelte
- Clippy + rustfmt for Rust
- SQL lint for migration files
